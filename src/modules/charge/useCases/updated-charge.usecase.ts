import { Injectable, NotFoundException } from "@nestjs/common";
import { ChargeRepository } from "../repositories/charge.repository";
import { UpdatedChargeDto } from "../dto/updated-charge.dto";


@Injectable()
export class UpdatedChargeUseCase {
    constructor(private readonly chargeRepository: ChargeRepository) {}

    async updatedCharge(id: string, updatedChargeDto: UpdatedChargeDto) {
        const chargeExist = await this.chargeRepository.findOne(id);
        if (!chargeExist) {
            throw new NotFoundException("Charge not found.")
        }

        return await this.chargeRepository.updatedById(id, updatedChargeDto);
    }
}