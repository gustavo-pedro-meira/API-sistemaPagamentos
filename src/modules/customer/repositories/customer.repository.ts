import { Injectable } from "@nestjs/common";
import { CreateCustomerProfileDto, CustomerProfileDto } from "../dto/created-customer.dto";


@Injectable()
export abstract class CustomerRepository {
    abstract findAll(): Promise<CustomerProfileDto[] | null>;
    abstract findOne(id: string): Promise<CustomerProfileDto | null>;
    abstract deleteById(id: string): Promise<CustomerProfileDto | null>;
    abstract create(createdCustomerDto: CreateCustomerProfileDto): Promise<CustomerProfileDto | null>;
    abstract findBySub(sub: string): Promise<CustomerProfileDto | null>;
}