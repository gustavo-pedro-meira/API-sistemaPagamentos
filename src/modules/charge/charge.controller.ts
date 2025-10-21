import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreatedChargeUseCase } from "./useCases/created-charge.usecase";
import { CreatedChargeDto } from "./dto/created-charge.dto";
import { FindAllChargeUseCase } from "./useCases/findAll-charge.usecase";
import { FindOneChargeUseCase } from "./useCases/findOne-charge.usecase";
import { DeleteChargeUseCase } from "./useCases/delete-charge.usecase";


@Controller("charges")
export class ChargeController {
    constructor(
        private readonly createdChargeUseCase: CreatedChargeUseCase,
        private readonly findAllChargeUseCase: FindAllChargeUseCase,
        private readonly findOneChargeUseCase: FindOneChargeUseCase,
        private readonly deleteChargeUseCase: DeleteChargeUseCase,
    ) {}

    @Post()
    createdCharge(@Body() createdChargeDto: CreatedChargeDto) {
        return this.createdChargeUseCase.saveCharge(createdChargeDto);
    }

    @Get()
    allCharge() {
        return this.findAllChargeUseCase.findAllCharge();
    }

    @Get(":id")
    oneCharge(@Param("id") id: string) {
        return this.findOneChargeUseCase.findOneCharge(id);
    }

    @Delete(":id")
    deleteCharge(@Param("id") id:string) {
        return this.deleteChargeUseCase.deleteCharge(id);
    }
}