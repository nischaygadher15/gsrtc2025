export interface EmailLoginPayloadType {
  userEmail: string;
  userPass: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}

export interface MobileLoginPayload {
  userMobileNo: string;
  device_ip: string | null;
  device_lat: number | null;
  device_long: number | null;
}

export interface EmailSignupPayload {
  firstName: string;
  lastName: string;
  userDob: Date;
  userMobileNo: string;
  userEmail: string;
  userPass: string;
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
