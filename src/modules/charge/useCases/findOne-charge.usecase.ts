import { Injectable } from "@nestjs/common";
import { ChargeRepository } from "../repositories/charge.repository";


@Injectable()
export class FindOneChargeUseCase {
    constructor(private readonly chargeRepository: ChargeRepository) {}

    async findOneCharge(id: string) {
        return await this.chargeRepository.findOne(id);
    }
}