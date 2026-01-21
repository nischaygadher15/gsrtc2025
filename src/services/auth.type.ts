export interface UserLoginOTP {
  otp: string;
  otp_id: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}
