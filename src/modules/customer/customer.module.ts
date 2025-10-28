import { Module } from "@nestjs/common";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { CustomerRepository } from "./repositories/customer.repository";
import { CustomerPrismaRepository } from "./repositories/prisma/customer.prisma.repository";
import { CustomerController } from "./customer.controller";
import { FindAllCustomerUseCase } from "./useCases/findAll-customer.usecase";
import { FindOneCustomerUseCase } from "./useCases/findOne-customer.usecase";
import { DeleteCustomerUseCase } from "./useCases/delete-customer.usecase";
import { FindProfileCustomerUseCase } from "./useCases/find-profile.customer.usecase";


@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CreatedCustomerUseCase,
    FindAllCustomerUseCase,
    FindOneCustomerUseCase,
    DeleteCustomerUseCase,
    FindProfileCustomerUseCase,
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: CustomerPrismaRepository,
    },
  ],
}) 
export class CustomerModule {}