import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { CreatedCustomerDto } from "./dto/created-customer.dto";
import { FindAllCustomerUseCase } from "./useCases/findAll-customer.usecase";
import { FindOneCustomerUseCase } from "./useCases/findOne-customer.usecase";


@Controller("customers")
export class CustomerController {
    constructor(
        private readonly createdCustomerUseCase: CreatedCustomerUseCase,
        private readonly findAllCustomerUseCase: FindAllCustomerUseCase,
        private readonly findOneCustomerUseCase: FindOneCustomerUseCase,
    ) {}

    @Post()
    createdCustomer(@Body() createdCustomerDto: CreatedCustomerDto) {
        return this.createdCustomerUseCase.saveCustomer(createdCustomerDto);
    }

    @Get()
    allCustomer(){
        return this.findAllCustomerUseCase.findAllCustomer();
    }

    @Get(":id")
    oneCustomer(@Param("id") id: string) {
        return this.findOneCustomerUseCase.findOneCustomer(id);
    }
}