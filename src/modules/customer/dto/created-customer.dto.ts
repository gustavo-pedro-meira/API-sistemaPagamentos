import { createZodDto } from "nestjs-zod";
import { CreatedCustomerSchema } from "../schemas/created-customer.schema";
import { IsDate, IsString } from "class-validator";


export class CreatedCustomerDto extends createZodDto(CreatedCustomerSchema) {}

export class CustomerCreatedDto {
    @IsString()
    id: string;

    @IsDate()
    createdAt: Date;
}