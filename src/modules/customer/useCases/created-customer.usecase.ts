import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repository";
import { CreateCustomerProfileDto } from "../dto/created-customer.dto";


@Injectable()
export class CreatedCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async saveCustomer(createdCustomerDto: CreateCustomerProfileDto) {
        return await this.customerRepository.create(createdCustomerDto);
    }
}