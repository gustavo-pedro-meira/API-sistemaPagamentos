import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "../customer.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { CustomerCreatedDto, CreatedCustomerDto } from "../../dto/created-customer.dto";
import { hash } from "bcrypt";


@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<CustomerCreatedDto[] | null> {
        return await this.prismaService.customer.findMany({
            include: { charges: true }
        });
    }

    async findOne(id: string): Promise<CustomerCreatedDto | null> {
        const customerExist = await this.prismaService.customer.findUnique({
            where: { id }
        })
        if(!customerExist) {
            throw new NotFoundException("Customer not found.")
        }

        return await this.prismaService.customer.findUnique({
            where: { id },
            include: { charges: true }
        });
    }
    async deleteById(id: string): Promise<CustomerCreatedDto | null> {
        const customerExist = await this.prismaService.customer.findUnique({
            where: { id }
        })
        if(!customerExist) {
            throw new NotFoundException("Customer not found.")
        }

        return await this.prismaService.customer.delete({
            where: { id }, 
            include: { charges: true }
        })
    }

    async create(createdCustomerDto: CreatedCustomerDto): Promise<CustomerCreatedDto | null> {
        const verifyCustomerEmailExist = await this.prismaService.customer.findFirst({
            where: { email: createdCustomerDto.email }
        });
        if(verifyCustomerEmailExist) {
            throw new ConflictException("Email is already in use.")
        }

        const verifyCustomerCPFExist = await this.prismaService.customer.findFirst({
            where: { cpf: createdCustomerDto.cpf }
        });
        if(verifyCustomerCPFExist) {
            throw new ConflictException("CPF is already in use.")
        }

        const passwordHashed = await hash(createdCustomerDto.password, 10);
        
        return await this.prismaService.customer.create({
            data: { ...createdCustomerDto, password: passwordHashed }
        })
    }
}