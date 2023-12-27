import axios from "axios";

export const loginApi = async ({ email, password }) => {
  const url = `${import.meta.env.VITE_BASE_URL}/auth/login/email`;

  try {
    const response = await axios({
      method: "POST",
      url,
      data: { email, password },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getMyProfile = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}/profile`;
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
    console.error(error.message);
  }
};
