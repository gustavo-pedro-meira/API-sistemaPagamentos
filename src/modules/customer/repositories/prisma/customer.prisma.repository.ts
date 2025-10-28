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

    // --- NOVO MÉTODO ESSENCIAL ---
    /**
     * Encontra um perfil de cliente pelo ID do Keycloak ('sub')
     */
    async findBySub(sub: string): Promise<CustomerProfileDto | null> { // Mude o tipo de retorno
        const customerProfile = await this.prismaService.customer.findUnique({
            where: { sub: sub }, // Busca pelo campo 'sub'
            include: { charges: true }
        });
        // Não lançamos NotFoundException aqui intencionalmente
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

    // --- MÉTODO 'CREATE' MODIFICADO ---
    // Recebe um DTO com dados do perfil, incluindo o 'sub' do Keycloak
    async create(createProfileDto: CreateCustomerProfileDto): Promise<CustomerProfileDto | null> {
        // Salve os dados do perfil, incluindo o 'sub'
        return await this.prismaService.customer.create({
            data: { ...createProfileDto } // Nova linha - O DTO já deve conter 'sub'
        });
    }
}