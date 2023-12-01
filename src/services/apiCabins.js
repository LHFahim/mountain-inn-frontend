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
