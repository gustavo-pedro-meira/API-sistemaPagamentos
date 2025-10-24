import { ChargePaymentMethod, ChargeStatus } from "generated/prisma";
import z from "zod";


export const UpdatedChargeSchema = z.object({
    value: z.number({
        error: (issue) =>
            issue.input === undefined
                ? "Value cannot be invalid."
                : "Must be a number."
    })
    .positive("'The price must be greater than zero.'")
    .multipleOf(0.01, { message: "The price must have at most 2 decimal places." })
    .optional(),

    coin: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Coin cannot be invalid."
                : "Must be a string."
    })
    .optional(),

    status: z.nativeEnum(ChargeStatus).optional(),

    paymentMethod: z.nativeEnum(ChargePaymentMethod).optional(),

    customerId: z.string().uuid({
        message: "Customer ID must be a valid UUID."
    })
    .optional(),

    boletoCode: z.coerce.string().nullable().optional(),

    pixCopyCole: z.string().nullable().optional(),

    cardInstallments: z.number().positive().nullable().optional(),
})