import * as z from "zod";

export const LoginByMobileSchema = z.object({
  userMobileNo: z
    .string("Mobile no. is required.")
    .regex(/^\d+$/, "Mobile no. must have digits only!")
    .refine((val) => val.length == 10, "Mobile no. mst have 10 digits only"),
});

export type LoginByMobileSchemaType = z.infer<typeof LoginByMobileSchema>;

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
