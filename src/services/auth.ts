import { AxiosError, AxiosResponse } from "axios";
import http from "./httpService";

export interface SendOtpResponse {
  message: string;
}

export const sendOtp = async (
  phone: string
): Promise<{
  response?: AxiosResponse<SendOtpResponse>;
  error?: AxiosError;
}> => {
  const response = await http.get(`authentication/otp/send-code/${phone}/`);

  return { response };
};

//chec otp type
export type CheckOtpResponse = {
  is_signup: boolean;
};

export const checkOtp = async (
  phone: string,
  otp: string
): Promise<{
  response?: AxiosResponse<CheckOtpResponse>;
  error?: AxiosError;
}> => {
  try {
    const response = await http.post(
      `authentication/otp/verify-code/${phone}/`,

      {
        code: otp,
      }
    );
    return { response };
  } catch (error) {
    return { error };
  }
};

interface UserProfileResponse {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_signup: boolean;
  phone_number: string;
  role: "customer" | "admin";
}

export const getUserProfile = async (): Promise<{
  response?: AxiosResponse<UserProfileResponse[]>;
}> => {
  const response = await http.get("user/customer/");
  return { response };
};
