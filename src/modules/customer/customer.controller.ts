import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { CreatedCustomerDto } from "./dto/created-customer.dto";
import { FindAllCustomerUseCase } from "./useCases/findAll-customer.usecase";
import { FindOneCustomerUseCase } from "./useCases/findOne-customer.usecase";
import { DeleteCustomerUseCase } from "./useCases/delete-customer.usecase";
import { Public } from "nest-keycloak-connect";


@Controller("customers")
export class CustomerController {
    constructor(
        private readonly createdCustomerUseCase: CreatedCustomerUseCase,
        private readonly findAllCustomerUseCase: FindAllCustomerUseCase,
        private readonly findOneCustomerUseCase: FindOneCustomerUseCase,
        private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    ) {}

    @Post()
    createdCustomer(@Body() createdCustomerDto: CreatedCustomerDto) {
        return this.createdCustomerUseCase.saveCustomer(createdCustomerDto);
    }

    @Get()
    @Public()
    allCustomer(){
        return this.findAllCustomerUseCase.findAllCustomer();
    }

    @Get(":id")
    oneCustomer(@Param("id") id: string) {
        return this.findOneCustomerUseCase.findOneCustomer(id);
    }

    @Delete(":id")
    deleteCustomer(@Param("id") id: string) {
        return this.deleteCustomerUseCase.deleteCustomer(id);
    }
}