import axios from "axios";

export const getCabins = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:5000/cabins?page=1&pageSize=20&sortBy=createdAt&sort=asc`,
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
