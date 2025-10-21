import { Injectable } from "@nestjs/common";
import { ChargeRepository } from "../repositories/charge.repository";
import { CreatedChargeDto } from "../dto/created-charge.dto";


@Injectable()
export class CreatedChargeUseCase {
    constructor(private readonly chargeRepository: ChargeRepository) {}

    async saveCharge(createdChargeDto: CreatedChargeDto)  {
        return await this.chargeRepository.create(createdChargeDto);
    }
}