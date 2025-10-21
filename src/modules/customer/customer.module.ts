import { Module } from "@nestjs/common";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { CustomerRepository } from "./repositories/customer.repository";
import { CustomerPrismaRepository } from "./repositories/prisma/customer.prisma.repository";
import { CustomerController } from "./customer.controller";


@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CreatedCustomerUseCase,
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: CustomerPrismaRepository,
    },
  ],
}) 
export class CustomerModule {}