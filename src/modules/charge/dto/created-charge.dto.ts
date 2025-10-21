import { createZodDto } from "nestjs-zod";
import { CreatedChargeSchema } from "../schemas/created-charge.schema";
import { IsDate, IsString } from "class-validator";


export class CreatedChargeDto extends createZodDto(CreatedChargeSchema) {}

export class ChargeCreatedDto extends CreatedChargeDto {
    @IsString()
    id: string;

    @IsDate()
    createdAt: Date;
}