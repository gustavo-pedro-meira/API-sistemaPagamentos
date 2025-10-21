import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { PrismaService } from './infra/database/prisma.service';
import { ChargeModule } from './modules/charge/charge.module';

@Module({
  imports: [
    CustomerModule,
    ChargeModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
