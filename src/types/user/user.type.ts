import { Gender, UserRole } from "@/redux/slices/user/user.slice";

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

export interface UserStateType {
  id: string;
  role: UserRole | string;
  first_name: string;
  last_name: string;
  gender: Gender | string;
  user_dob: Date | string;
  user_mobile_no: string;
  user_email: string;
  user_photo: string;
  is_email_verified: boolean;
  is_mobile_verified: boolean;
}
