import axios from "axios";

export const getCabins = async () => {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/cabins?page=1&pageSize=20&sortBy=createdAt&sort=asc`;

  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
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
  const access_token = localStorage.getItem("access_token");

  // NOTE: if id is not available, create cabin, otherwise update cabin
  if (!id) {
    if (typeof newCabin.image !== "string") {
      try {
        const formData = new FormData();
        formData.append("file", newCabin.image);

        const response = await axios({
          method: "POST",
          url: fileUploadUrl,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        });

        imageUrl = response.data;
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const response = await axios({
        method: "POST",
        url,
        data: {
          ...newCabin,
          image: typeof newCabin.image === "string" ? newCabin.image : imageUrl,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
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

  const access_token = localStorage.getItem("access_token");

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
          Authorization: `Bearer ${access_token}`,
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
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCabin = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/cabins/${id}`;
  const access_token = localStorage.getItem("access_token");

  const response = await axios({
    method: "DELETE",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response;
};
