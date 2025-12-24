import * as z from "zod";

// Login by mobile no. schema

export const LoginByMobileSchema = z.object({
  userMobileNo: z
    .string("Mobile no. is required.")
    .regex(/^[6-9]\d{9}$/, "Invalid Indian Mobile no!"),
});

export type LoginByMobileSchemaType = z.infer<typeof LoginByMobileSchema>;

// OTP verification schema

export const OtpVerificationSchema = z.object({
  userLoginOTP: z
    .string("OTP no. is required.")
    .regex(/^\d{6}$/, "OTP must have 6 digits only"),
});

export type OtpVerificationSchemaType = z.infer<typeof OtpVerificationSchema>;

// Login by email schema

export const LoginByEmailSchema = z.object({
  userEmail: z.string("Email is required.").email("Invalid format"),
  userPass: z.string("Password is required."),
});

export type LoginByEmailSchemaType = z.infer<typeof LoginByEmailSchema>;
