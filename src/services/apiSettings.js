import axios from "axios";

export async function getSettings() {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/settings?page=1&pageSize=20&sortBy=createdAt&sort=desc`;

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
}

export const updateSettingsApi = async (id, settingsData) => {
  const updateUrl = `${import.meta.env.VITE_BASE_URL}/settings/${id}`;

  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios({
      method: "PATCH",
      url: updateUrl,
      data: { ...settingsData },
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

// We expect a newSetting object that looks like {setting: newValue}
// export async function updateSetting(newSetting) {
//   const { data, error } = await supabase
//     .from("settings")
//     .update(newSetting)
//     // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
//     .eq("id", 1)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Settings could not be updated");
//   }
//   return data;
// }
