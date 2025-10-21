import { Module } from "@nestjs/common";
import { ChargeController } from "./charge.controller";
import { PrismaService } from "src/infra/database/prisma.service";
import { ChargeRepository } from "./repositories/charge.repository";
import { ChargePrismaRepository } from "./repositories/prisma/charge.prisma.repository";


@Module({
    imports: [],
    controllers: [ChargeController],
    providers: [
        PrismaService,
        {
            provide: ChargeRepository,
            useClass: ChargePrismaRepository,
        }
    ],
})

export class ChargeModule {}