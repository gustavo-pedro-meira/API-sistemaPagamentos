import { Body, ConflictException, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Req } from "@nestjs/common";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { CreateCustomerProfileDto, CustomerProfileDto } from "./dto/created-customer.dto";
import { FindAllCustomerUseCase } from "./useCases/findAll-customer.usecase";
import { FindOneCustomerUseCase } from "./useCases/findOne-customer.usecase";
import { DeleteCustomerUseCase } from "./useCases/delete-customer.usecase";
import { Public } from "nest-keycloak-connect";
import { FindProfileCustomerUseCase } from "./useCases/find-profile.customer.usecase";


@Controller("customers")
export class CustomerController {
    constructor(
        private readonly createdCustomerUseCase: CreatedCustomerUseCase,
        private readonly findAllCustomerUseCase: FindAllCustomerUseCase,
        private readonly findOneCustomerUseCase: FindOneCustomerUseCase,
        private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
        private readonly findProfileCustomerUseCase: FindProfileCustomerUseCase,
    ) {}

    @Post()
    createdCustomer(@Body() createdCustomerDto: CreateCustomerProfileDto) {
        return this.createdCustomerUseCase.saveCustomer(createdCustomerDto);
    }

    @Get()
    @Public()
    allCustomer(){
        return this.findAllCustomerUseCase.findAllCustomer();
    }

    @Get(":id")
    oneCustomer(@Param("id") id: string) {
        return this.findOneCustomerUseCase.findOneCustomer(id);
    }

    @Delete(":id")
    deleteCustomer(@Param("id") id: string) {
        return this.deleteCustomerUseCase.deleteCustomer(id);
    }

    @Get("profile/me") 
    async getCustomerProfile(@Req() req): Promise<CustomerProfileDto> { // Use o DTO de perfil como retorno
        const keycloakUser = req.user; 
        if (!keycloakUser || !keycloakUser.sub) {
            throw new NotFoundException("User sub not found in token.");
        }
        const keycloakSub = keycloakUser.sub;

        let profile = await this.findProfileCustomerUseCase.findProfileCustomer(keycloakSub);

        // Se o perfil NÃO existe, CRIA um
        if (!profile) {
            console.log(`Profile for sub ${keycloakSub} not found. Creating...`);
            // Você pode precisar de mais dados (CPF, telefone) que não estão no token.
            // Esses campos teriam que ser preenchidos depois (ex: em uma tela de "Complete seu perfil").
            // Por enquanto, podemos criá-los como null ou com valores padrão, se o schema permitir.

            const newProfileData: CreateCustomerProfileDto = {
                sub: keycloakSub,
            };

            try {
                 // Verifica se CPF já existe antes de tentar criar (se CPF for obrigatório e único)
                 // A lógica de verificação de CPF já está no repository.create
                 profile = await this.createdCustomerUseCase.saveCustomer(newProfileData);
                 if (!profile) {
                     // Isso não deveria acontecer se o create não lançar erro, mas por segurança
                     throw new InternalServerErrorException('Failed to create customer profile after Keycloak login.');
                 }
                 console.log(`Profile created for sub ${keycloakSub}`);
            } catch (error) {
                 // Trata caso o CPF (ou outro campo único) já exista vindo de outro usuário Keycloak
                 if (error instanceof ConflictException) {
                      console.error(`Conflict creating profile for sub ${keycloakSub}: ${error.message}`);
                      // Decida como lidar: talvez logar e retornar erro, ou tentar atualizar dados existentes?
                      throw new ConflictException(`Could not create profile: ${error.message}`);
                 }
                 console.error(`Error creating profile for sub ${keycloakSub}:`, error);
                 throw new InternalServerErrorException('Error creating customer profile.');
            }
        }

        // Retorna o perfil (existente ou recém-criado)
        return profile;
    }
}