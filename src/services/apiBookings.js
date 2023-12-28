import axios from "axios";
import { PAGE_SIZE } from "../utils/constants";

export const getBookings = async ({
  filter,
  sortBy = { field: "createdAt", direction: "desc" },
  page = 1,
}) => {
  // http://localhost:5000/bookings?page=1&pageSize=20&sortBy=createdAt&sort=desc&status=CHECKED_OUT

  let url = `${
    import.meta.env.VITE_BASE_URL
  }/bookings?page=${page}&pageSize=${PAGE_SIZE}&sortBy=${sortBy.field}&sort=${
    sortBy.direction
  }`;

  filter.forEach((item) => {
    const temp = `&${item.field}=${item.value}`;
    url = url + temp;
  });

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

export async function getBooking(id) {
  const url = `${import.meta.env.VITE_BASE_URL}/bookings/${id}`;

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
}

// // Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// export async function getBookingsAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("created_at, totalPrice, extrasPrice")
//     .gte("created_at", date)
//     .lte("created_at", getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Returns all STAYS that are were created after the given date
// export async function getStaysAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     // .select('*')
//     .select("*, guests(fullName)")
//     .gte("startDate", date)
//     .lte("startDate", getToday());

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
//   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
//   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
//   return data;
// }

export async function updateBooking(id, obj) {
  const url = `${import.meta.env.VITE_BASE_URL}/bookings/${id}`;

  try {
    const response = await axios({
      method: "PATCH",
      url,
      data: obj,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBookingApi(id) {
  const url = `${import.meta.env.VITE_BASE_URL}/bookings/${id}`;

  try {
    const response = await axios({
      method: "DELETE",
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
}

// export async function deleteBooking(id) {
//   // REMEMBER RLS POLICIES
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
