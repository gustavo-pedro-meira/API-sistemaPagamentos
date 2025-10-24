import { Injectable, NotFoundException } from "@nestjs/common";
import { ChargeRepository } from "../charge.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { ChargeCreatedDto, CreatedChargeDto } from "../../dto/created-charge.dto";
import { UpdatedChargeDto } from "../../dto/updated-charge.dto";


@Injectable()
export class ChargePrismaRepository implements ChargeRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<ChargeCreatedDto[] | null> {
        return await this.prismaService.charge.findMany({
            include: { customer: true }
        });
    }

    async findOne(id: string): Promise<ChargeCreatedDto | null> {
        const chargeExist = await this.prismaService.charge.findUnique({
            where: { id }
        })
        if (!chargeExist) {
            throw new NotFoundException("Charge not found.")
        }

        return await this.prismaService.charge.findUnique({
            where: { id },
            include: { customer: true }
        })
    }

    async deleteById(id: string): Promise<ChargeCreatedDto | null> {
        const chargeExist = await this.prismaService.charge.findUnique({
            where: { id }
        });
        if (!chargeExist) {
            throw new NotFoundException("Charge not found.")
        }

        return await this.prismaService.charge.delete({
            where: { id },
            include: { customer: true }
        })
    }

    async create(createdChargeDto: CreatedChargeDto): Promise<ChargeCreatedDto | null> {
        return await this.prismaService.charge.create({
            data: { ...createdChargeDto }
        })
    }

    async updatedById(id: string, updatedChargeDto: UpdatedChargeDto): Promise<ChargeCreatedDto | null> {
        const chargeExist = await this.prismaService.charge.findUnique({
            where: { id }
        })
        if (!chargeExist) {
            throw new NotFoundException("Charge not found.");
        }
        
        return await this.prismaService.charge.update({
            where: { id },
            data: { ...updatedChargeDto },
            include: { customer: true }
        })
    }
}