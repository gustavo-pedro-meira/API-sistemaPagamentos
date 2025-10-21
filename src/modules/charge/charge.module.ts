import { Module } from "@nestjs/common";
import { ChargeController } from "./charge.controller";
import { PrismaService } from "src/infra/database/prisma.service";
import { ChargeRepository } from "./repositories/charge.repository";
import { ChargePrismaRepository } from "./repositories/prisma/charge.prisma.repository";
import { CreatedChargeUseCase } from "./useCases/created-charge.usecase";


@Module({
    imports: [],
    controllers: [ChargeController],
    providers: [
        CreatedChargeUseCase,
        PrismaService,
        {
            provide: ChargeRepository,
            useClass: ChargePrismaRepository,
        }
    ],
})

export class ChargeModule {}