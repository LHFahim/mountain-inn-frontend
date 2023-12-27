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
