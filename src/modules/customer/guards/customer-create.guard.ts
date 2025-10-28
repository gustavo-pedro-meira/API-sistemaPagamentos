import { CanActivate, ConflictException, ExecutionContext, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Observable } from "rxjs";
import { FindProfileCustomerUseCase } from "../useCases/find-profile.customer.usecase";
import { CreatedCustomerUseCase } from "../useCases/created-customer.usecase";
import { Reflector } from "@nestjs/core";
import { CreateCustomerProfileDto } from "../dto/created-customer.dto";

const PUBLIC_RESOURCE = 'PUBLIC_RESOURCE';

@Injectable()
export class CustomerCreateGuardKeyCloack implements CanActivate {
    constructor(
        private readonly findProfileCustomerUseCase: FindProfileCustomerUseCase,
        private readonly createdCustomerUseCase: CreatedCustomerUseCase,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>(
            PUBLIC_RESOURCE,
            context.getHandler(),
        );
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const keycloakUser = request.user;

        if (!keycloakUser || !keycloakUser.sub) {
            console.warn('ProfileSyncGuard: User or sub not found in request. Skipping profile sync.');
            return true;
        }

        const keycloakSub = keycloakUser.sub;
        const keycloakEmail = keycloakUser.email;
        const keycloakName = keycloakUser.name;
        const keycloakCpf= keycloakSub.cpf;

        try {
            let profile = await this.findProfileCustomerUseCase.findProfileCustomer(keycloakSub);

            if (!profile) {
                console.log(`ProfileSyncGuard: Profile for sub ${keycloakSub} not found. Creating...`);
                const newProfileData: CreateCustomerProfileDto = {
                    sub: keycloakSub,
                    email: keycloakEmail,
                    name: keycloakName,
                    cpf: keycloakCpf,
                };

                profile = await this.createdCustomerUseCase.saveCustomer(newProfileData);
                if (!profile) {
                     console.error(`ProfileSyncGuard: Failed to create profile for sub ${keycloakSub} after Keycloak login.`);
                     throw new InternalServerErrorException('Failed to create customer profile.');
                }
                 console.log(`ProfileSyncGuard: Profile created for sub ${keycloakSub}`);
            }
        } catch (error) {
             if (error instanceof ConflictException) {
                  console.error(`ProfileSyncGuard: Conflict creating profile for sub ${keycloakSub}: ${error.message}`);
                  throw new ConflictException(`Could not create profile: ${error.message}`);
             }
             console.error(`ProfileSyncGuard: Error syncing profile for sub ${keycloakSub}:`, error);
             throw new InternalServerErrorException('Error syncing customer profile.');
        }

        return true;
    }

}