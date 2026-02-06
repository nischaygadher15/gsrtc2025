import { UserDataType } from "../user/user.type";

export interface EmailLoginPayloadType {
  userEmail: string;
  userPass: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}

export interface EmailLoginResponse {
  message: string;
  session_id: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  access_token: string;
  access_token_expires_at: string;
  user: UserDataType;
}

export interface MobileLoginResponse {
  status?: number;
  message: string;
  otp_id: string;
  users: any[];
}

export interface EmailSignupPayload {
  first_name: string;
  last_name: string;
  user_dob: Date;
  gender: string;
  user_mobile_no: string;
  user_email: string;
  user_pass: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}

export interface GoogleSignupPayload {
  code: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}

export interface ForgotPasswordPayload {
  userEmail: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}

export interface ResetPasswordPayload {
  userPass: string;
  resetCode: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}

export interface UserLoginOTP {
  otp: string;
  otp_id: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}

export interface MobileLoginPayloadType {
  user_id?: string;
  user_mobile_no?: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}
