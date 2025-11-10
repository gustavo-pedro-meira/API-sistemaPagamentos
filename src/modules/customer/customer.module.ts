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
import { APP_GUARD } from "@nestjs/core";
import { CustomerCreateGuardKeyCloack } from "./guards/customer-create.guard";
import { GetTestCustomerUseCase } from "./useCases/getTest-customer.usecase";
import { UploadFileCustomerUseCase } from "./useCases/upload-file-customer.usecase";


@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CreatedCustomerUseCase,
    FindAllCustomerUseCase,
    FindOneCustomerUseCase,
    DeleteCustomerUseCase,
    FindProfileCustomerUseCase,
    UploadFileCustomerUseCase,
    // GetTestCustomerUseCase,
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: CustomerPrismaRepository,
    },
    {
      provide: APP_GUARD,
      useClass: CustomerCreateGuardKeyCloack,
    }
  ],
}) 
export class CustomerModule {}