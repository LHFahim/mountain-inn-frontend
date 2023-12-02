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

export const createCabin = async (newCabin) => {
  const url = `${import.meta.env.VITE_BASE_URL}/cabins`;
  const fileUploadUrl = `${import.meta.env.VITE_BASE_URL}/cabins/upload/image`;

  let imageUrl;

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

  console.log("🚀 response", response);
  return response;
};
