import { Injectable } from "@nestjs/common";
import { ChargeCreatedDto, CreatedChargeDto } from "../dto/created-charge.dto";
import { UpdatedChargeDto } from "../dto/updated-charge.dto";


@Injectable()
export abstract class ChargeRepository {
    abstract findAll(): Promise<ChargeCreatedDto[] | null>;
    abstract findOne(id: string): Promise<ChargeCreatedDto | null>;
    abstract deleteById(id: string): Promise<ChargeCreatedDto | null>;
    abstract create(createdChargeDto: CreatedChargeDto): Promise<ChargeCreatedDto | null>;
    abstract updatedById(id: string, updatedChargeDto: UpdatedChargeDto): Promise<ChargeCreatedDto | null>;
}