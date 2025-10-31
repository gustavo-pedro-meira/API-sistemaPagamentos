import { Injectable, NotFoundException } from "@nestjs/common";
import { ChargeRepository } from "../repositories/charge.repository";


@Injectable()
export class FindOneChargeUseCase {
    constructor(private readonly chargeRepository: ChargeRepository) {}

    async execute(id: string) {
        return await this.chargeRepository.findOne(id);
    }
}