import { createZodDto } from "nestjs-zod";
import { UpdatedChargeSchema } from "../schemas/updated-charge.schema";


export class UpdatedChargeDto extends createZodDto(UpdatedChargeSchema) {}