import http from "./httpService";

export const sendUserProfile = async ({
    phone_number,
    data,
  }: {
    phone_number: string;
    data: {
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      role: string;
    };
  }) => {
    const response = await http.patch(`user/customer/${phone_number}/`, data);
    return response.data;
  };
  