import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "../customer.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateCustomerProfileDto, CustomerProfileDto } from "../../dto/created-customer.dto";

@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<CustomerProfileDto[] | null> { 
        return await this.prismaService.customer.findMany({
            include: { charges: true }
        });
    }

    async findOne(id: string): Promise<CustomerProfileDto | null> { 
        const customerExist = await this.prismaService.customer.findUnique({
            where: { id }
        });
        if(!customerExist) {
            throw new NotFoundException("Customer not found.");
        }

        return await this.prismaService.customer.findUnique({
             where: { id },
             include: { charges: true }
        });
    }

    async findBySub(sub: string): Promise<CustomerProfileDto | null> {
        const customerProfile = await this.prismaService.customer.findUnique({
            where: { sub: sub },
            include: { charges: true }
        });
        return customerProfile;
    }

    async deleteById(id: string): Promise<CustomerProfileDto | null> {
        const customerExist = await this.prismaService.customer.findUnique({
            where: { id }
        });
        if(!customerExist) {
            throw new NotFoundException("Customer not found.");
        }

        return await this.prismaService.customer.delete({
            where: { id }, 
            include: { charges: true }
        });
    }

    async create(createProfileDto: CreateCustomerProfileDto): Promise<CustomerProfileDto | null> {
        return await this.prismaService.customer.create({
            data: { ...createProfileDto }
        });
    }
}