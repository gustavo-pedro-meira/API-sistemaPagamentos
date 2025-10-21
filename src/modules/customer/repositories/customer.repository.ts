import { Injectable } from "@nestjs/common";
import { CreatedCustomerDto, CustomerCreatedDto } from "../dto/created-customer.dto";


@Injectable()
export abstract class CustomerRepository {
    abstract findAll(): Promise<CustomerCreatedDto[] | null>;
    abstract findOne(id: string): Promise<CustomerCreatedDto | null>;
    abstract deleteById(id: string): Promise<CustomerCreatedDto | null>;
    abstract create(createdCustomerDto: CreatedCustomerDto): Promise<CustomerCreatedDto | null>;
}