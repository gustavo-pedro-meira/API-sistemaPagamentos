import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repository";


@Injectable()
export class FindAllCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async findAllCustomer() {
        return await this.customerRepository.findAll();
    }
}