import { Controller, Post } from "@nestjs/common";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { CreatedCustomerDto } from "./dto/created-customer.dto";


@Controller("customers")
export class CustomerController {
    constructor(
        private readonly createdCustomerUseCase: CreatedCustomerUseCase,
    ) {}

    @Post()
    createdCustomer(createdCustomerDto: CreatedCustomerDto) {
        return this.createdCustomerUseCase.saveCustomer(createdCustomerDto);
    }
}