import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { PrismaService } from './infra/database/prisma.service';
import { ChargeModule } from './modules/charge/charge.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthGuard, KeycloakConnectModule, PolicyEnforcementMode, ResourceGuard, RoleGuard, TokenValidation } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { CustomerCreateGuardKeyCloack } from './modules/customer/guards/customer-create.guard';

@Module({
  imports: [
    CustomerModule,
    ChargeModule,
    ScheduleModule.forRoot(),
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_AUTH_URL || 'http://localhost:8080',
      realm: "minha-api-pagamentos",
      clientId: "minha-api-pagamentos",
      secret: "8MsVeCdkKqtJ5Iq54riOM2OtITL2dift",
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
    })
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
