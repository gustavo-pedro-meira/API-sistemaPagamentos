import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer.repository";


@Injectable()
export class FindProfileCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async findProfileCustomer (sub: string) {
        return await this.customerRepository.findBySub(sub);
    }
}