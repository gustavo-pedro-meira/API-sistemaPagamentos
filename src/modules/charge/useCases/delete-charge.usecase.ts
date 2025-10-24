import { Injectable, NotFoundException } from "@nestjs/common";
import { ChargeRepository } from "../repositories/charge.repository";


@Injectable()
export class DeleteChargeUseCase {
    constructor(private readonly chargeRepository: ChargeRepository) {}

    async deleteCharge(id: string) {
        return await this.chargeRepository.deleteById(id);
    }
}