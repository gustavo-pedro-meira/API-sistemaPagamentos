import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../customer.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { CustomerCreatedDto, CreatedCustomerDto } from "../../dto/created-customer.dto";
import { hash } from "bcrypt";


@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<CustomerCreatedDto[] | null> {
        return await this.prismaService.customer.findMany();
    }

    async findOne(id: string): Promise<CustomerCreatedDto | null> {
        return await this.prismaService.customer.findUnique({
            where: { id }
        });
    }
    async deleteById(id: string): Promise<CustomerCreatedDto | null> {
        return await this.prismaService.customer.delete({
            where: { id }
        })
    }
    async create(createdCustomerDto: CreatedCustomerDto): Promise<CustomerCreatedDto | null> {
        const passwordHashed = await hash(createdCustomerDto.password, 10);
        return await this.prismaService.customer.create({
            data: { ...createdCustomerDto, password: passwordHashed }
        })
    }
}