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

// Sign up schema
const MAX_AGE_DATE = new Date();
MAX_AGE_DATE.setFullYear(MAX_AGE_DATE.getFullYear() - 14);

export const SignUpSchema = z.object({
  firstName: z
    .string("First name is required.")
    .trim()
    .min(3, "First name mst have minimum 3 characters")
    .max(20, "First name mst have maximum 20 characters")
    .refine(
      (value) => /^[a-zA-Z]+$/.test(value),
      "First name must have characters only"
    ),
  lastName: z
    .string("Last name is required.")
    .trim()
    .min(3, "Last name mst have minimum 3 characters")
    .max(20, "Last name mst have maximum 20 characters")
    .refine(
      (value) => /^[a-zA-Z]+$/.test(value),
      "Last name must have characters only"
    ),
  userDob: z
    .date("Date of birth is required")
    .max(MAX_AGE_DATE, "User must be 14 years old."),
  userMobileNo: z
    .string("Mobile no. is required.")
    .refine(
      (value) => /^[6-9]\d{9}$/.test(value),
      "Invalid indian mobile number."
    ),
  userEmail: z.string("Email is required.").email("Invalid email format"),
  userPass: z
    .string("Password is required.")
    .min(8, "Password must have minimum strength of 8 characters")
    .refine((value) => /\d/.test(value), "Password must have 1 digit")
    .refine(
      (value) => /[a-z]/.test(value),
      "Password must have 1 small alphabet"
    )
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must have 1 capital alphabet"
    )
    .refine(
      (value) => /[~`!@#$%\^&*\(\)_\-+=\{\}\[\]\|\:;\"\'<,>\.?\/]/.test(value),
      "Password must have 1 special character"
    ),
});

export type SignUpSchemaSchemaType = z.infer<typeof SignUpSchema>;
