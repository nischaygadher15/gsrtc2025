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
  userPass: z
    .string("Password is required.")
    .regex(/\d/g, "Password must have 1 digit")
    .regex(/[a-z]/g, "Password must have 1 small alphabet")
    .regex(/[A-Z]/g, "Password must have 1 capital alphabet")
    .regex(
      /[~`!@#$%\^&\*\(\)_\-+=\{\}\[\]:;"'<,>\.\?\/\|\\]/g,
      "Password must have 1 special character"
    )
    .refine(
      (val) => val.length >= 6,
      "Password must have at least 6 characters"
    ),
});

export type LoginByEmailSchemaType = z.infer<typeof LoginByEmailSchema>;
