export interface EmailLoginPayloadType {
  userEmail: string;
  userPass: string;
  deviceId: string;
  deviceIp: string | null;
  deviceLat: number | null;
  deviceLong: number | null;
}

export interface ForgotPasswordPayload {
  userEmail: string;
  deviceIp: string | null;
  deviceLat: number | null;
  deviceLong: number | null;
}
