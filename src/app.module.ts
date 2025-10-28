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
      authServerUrl: "http://localhost:8080",
      realm: "minha-api-pagamentos",
      clientId: "api-pagamentos-client",
      secret: "RmHKC5mlEZo12567MnGeHVGX97tK91G9",
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
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
