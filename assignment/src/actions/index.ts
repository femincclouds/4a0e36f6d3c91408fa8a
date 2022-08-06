import axios from "axios";

export const httpCheck = async (
  regNo: string,
  price: number
): Promise<boolean> => {
  const body = {
    "car-registration": regNo,
    charge: price,
  };

  try {
    const data = await axios.post("https://httpstat.us/200", body);
    if (data.data?.code === 200) {
      return true;
    }
  } catch (e) {}
  return false;
};
