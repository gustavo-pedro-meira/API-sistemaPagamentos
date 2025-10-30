import { Body, ConflictException, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Req } from "@nestjs/common";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { CreateCustomerProfileDto, CustomerProfileDto } from "./dto/created-customer.dto";
import { FindAllCustomerUseCase } from "./useCases/findAll-customer.usecase";
import { FindOneCustomerUseCase } from "./useCases/findOne-customer.usecase";
import { DeleteCustomerUseCase } from "./useCases/delete-customer.usecase";
import { Public } from "nest-keycloak-connect";
import { GetTestCustomerUseCase } from "./useCases/getTest-customer.usecase";


@Controller("customers")
export class CustomerController {
    constructor(
        private readonly createdCustomerUseCase: CreatedCustomerUseCase,
        private readonly findAllCustomerUseCase: FindAllCustomerUseCase,
        private readonly findOneCustomerUseCase: FindOneCustomerUseCase,
        private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    ) {}

    @Post()
    createdCustomer(@Body() createdCustomerDto: CreateCustomerProfileDto) {
        return this.createdCustomerUseCase.execute(createdCustomerDto);
    }

    @Get()
    @Public()
    allCustomer(){
        return this.findAllCustomerUseCase.execute();
    }

    @Get(":id")
    oneCustomer(@Param("id") id: string) {
        return this.findOneCustomerUseCase.execute(id);
    }

    @Delete(":id")
    deleteCustomer(@Param("id") id: string) {
        return this.deleteCustomerUseCase.execute(id);
    }
}