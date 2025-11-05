import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repository";


@Injectable()
export class DeleteCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(id: string) {
        const customerExist = await this.customerRepository.deleteById(id);
        if (!customerExist) {
            throw new NotFoundException("Customer not found.");
        }
        return customerExist;
    }
}