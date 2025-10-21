import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repository";


@Injectable()
export class DeleteCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async deleteCustomer(id: string) {
        return await this.customerRepository.deleteById(id);
    }
}