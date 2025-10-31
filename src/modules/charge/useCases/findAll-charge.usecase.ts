import { Injectable } from "@nestjs/common";
import { ChargeRepository } from "../repositories/charge.repository";


@Injectable()
export class FindAllChargeUseCase {
    constructor(private readonly chargeRepository: ChargeRepository) {}

    async execute() {
        return await this.chargeRepository.findAll();
    }
}