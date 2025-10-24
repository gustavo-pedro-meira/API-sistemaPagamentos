import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { PrismaService } from './infra/database/prisma.service';
import { ChargeModule } from './modules/charge/charge.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CustomerModule,
    ChargeModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
