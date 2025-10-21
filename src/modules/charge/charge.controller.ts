import { Body, Controller, Post } from "@nestjs/common";
import { CreatedChargeUseCase } from "./useCases/created-charge.usecase";
import { CreatedChargeDto } from "./dto/created-charge.dto";


@Controller("charges")
export class ChargeController {
    constructor(
        private readonly createdChargeUseCase: CreatedChargeUseCase
    ) {}

    @Post()
    createdCharge(@Body() createdChargeDto: CreatedChargeDto) {
        return this.createdChargeUseCase.saveCharge(createdChargeDto);
    }
}