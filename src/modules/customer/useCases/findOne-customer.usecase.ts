import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repository";


@Injectable()
export class FindOneCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async findOneCustomer(id: string) {
        return await this.customerRepository.findOne(id);
    }
}