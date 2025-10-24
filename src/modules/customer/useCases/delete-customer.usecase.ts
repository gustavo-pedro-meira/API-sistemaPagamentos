import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repository";


@Injectable()
export class DeleteCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async deleteCustomer(id: string) {
        const customerExist = await this.customerRepository.findOne(id);
        if (!customerExist) {
            throw new NotFoundException("Customer not found.")
        }
        
        return await this.customerRepository.deleteById(id);
    }
}