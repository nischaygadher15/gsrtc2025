export interface UserDataType {
  user_id: string;
  first_name: string;
  last_name: string | null;
  user_email: string;
  user_dob: Date | null;
  gender: string | null;
  user_mobile_no: string | null;
  user_photo: string | null;
  user_pass: string | undefined;
}
