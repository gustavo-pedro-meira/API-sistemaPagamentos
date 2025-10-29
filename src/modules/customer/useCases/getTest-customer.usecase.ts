import { Injectable } from "@nestjs/common";


@Injectable()
export class GetTestCustomerUseCase {
    async execute(): Promise<string> {
        return "Olá Testes";
    }
}