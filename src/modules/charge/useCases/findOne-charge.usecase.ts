import { Injectable, NotFoundException } from "@nestjs/common";
import { ChargeRepository } from "../repositories/charge.repository";


@Injectable()
export class FindOneChargeUseCase {
    constructor(private readonly chargeRepository: ChargeRepository) {}

    async findOneCharge(id: string) {
        const chargeExist = await this.chargeRepository.findOne(id);
        if (!chargeExist) {
            throw new NotFoundException("Charge not found.")
        }
        
        return await this.chargeRepository.findOne(id);
    }
}