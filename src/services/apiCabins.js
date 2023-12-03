import axios from "axios";

export const getCabins = async () => {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/cabins?page=1&pageSize=20&sortBy=createdAt&sort=asc`;

  try {
    const response = await axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createOrEditCabin = async (newCabin, id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/cabins`;
  const fileUploadUrl = `${import.meta.env.VITE_BASE_URL}/cabins/upload/image`;

  let imageUrl;

  // NOTE: if id is not available, create cabin, otherwise update cabin
  if (!id) {
    try {
      const formData = new FormData();
      formData.append("file", newCabin.image);

      const response = await axios({
        method: "POST",
        url: fileUploadUrl,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });

      imageUrl = response.data;
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios({
        method: "POST",
        url,
        data: { ...newCabin, image: imageUrl },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    updateCabin(id, fileUploadUrl, newCabin);
  }
};

export const updateCabin = async (id, fileUploadUrl, data) => {
  const updateUrl = `${import.meta.env.VITE_BASE_URL}/cabins/${id}`;
  let imageUrl = undefined;

  if (typeof data.image !== "string") {
    try {
      const formData = new FormData();
      formData.append("file", data.image);

      const response = await axios({
        method: "POST",
        url: fileUploadUrl,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });

      imageUrl = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const response = await axios({
      method: "PATCH",
      url: updateUrl,
      data: { ...data, image: imageUrl ? imageUrl : data.image },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCabin = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/cabins/${id}`;
  const response = await axios({
    method: "DELETE",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });

  return response;
};
