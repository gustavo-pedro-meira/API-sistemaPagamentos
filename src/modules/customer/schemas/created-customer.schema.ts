import { issue } from "node_modules/zod/v4/core/util.cjs";
import z from "zod";

export const CreatedCustomerSchema = z.object({
    email: z.email("Invalid email format.")
    .nonempty("Email Cannot be invalid."),

    password: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Password cannot be invalid.'
                : 'Must be a string.'
    })
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine(value => !value.includes(' '), { message: "Password cannot contain spaces." })
    .refine(value => /[#$%&*@!?\-"]/.test(value), { message: "Password must contain special characters." })
    .refine(value => /\d/.test(value), { message: "Password must contain numbers." })
    .refine(value => /[A-Z]/.test(value), { message: "Password must contain uppercase letters." })
    .refine(value => /[a-z]/.test(value), { message: "Password must contain lowercase letters." })
    .trim(),

    name: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Name cannot be invalid."
                : "Must be a string."
    }),

    cpf: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "CPF cannot be invalid."
                : "Must be a string."
    })
    .min(11)
    .max(11),

    phone: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Phone cannot be invalid."
                : "Must be a string."
    })
})