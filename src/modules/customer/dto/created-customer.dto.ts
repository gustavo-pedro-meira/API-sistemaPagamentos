import { createZodDto } from "nestjs-zod";
import { CreateCustomerProfileSchema } from "../schemas/created-customer.schema";
import { IsDate, IsString } from "class-validator";


export class CreateCustomerProfileDto extends createZodDto(CreateCustomerProfileSchema) {}

export class CustomerProfileDto {
    @IsString()
    id: string;

    @IsDate()
    createdAt: Date;
}