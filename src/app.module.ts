import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { PrismaService } from './infra/database/prisma.service';

@Module({
  imports: [
    CustomerModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
