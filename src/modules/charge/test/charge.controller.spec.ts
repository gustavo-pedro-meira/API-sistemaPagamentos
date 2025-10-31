import { CreatedChargeUseCase } from "../useCases/created-charge.usecase";
import { DeleteChargeUseCase } from "../useCases/delete-charge.usecase";
import { FindAllChargeUseCase } from "../useCases/findAll-charge.usecase";
import { FindOneChargeUseCase } from "../useCases/findOne-charge.usecase";
import { UpdatedChargeUseCase } from "../useCases/updated-charge.usecase";
import { ChargeController } from "../charge.controller";
import { Test, TestingModule } from "@nestjs/testing";


const mockCharge: any = {
    id: "uuid-fake-123",
    createdAt: new Date(),
    value: 100.50,
    coin: "Euro",
    status: "PENDING",
    paymentMethod: "PIX",
    pixCopyCole: "codigo-pix-123",
    boletoCode: null,
    cardInstallments: null,
    customerId: "uuid-customer-123",
}

describe("ChargeService", () => {
    let mockChargeController: ChargeController;
    let createdChargeUseCase: { execute: jest.Mock };
    let deleteChargeUseCase: { execute: jest.Mock };
    let findAllChargeUseCase: { execute: jest.Mock };
    let findOneChargeUseCase: { execute: jest.Mock };
    let updatedChargeUseCase: { execute: jest.Mock };

    beforeEach(async () => {
        const mockCreatedChargeUseCase = {
            execute: jest.fn().mockReturnValue(mockCharge), 
        }
        const mockDeleteChargeUseCase = {
            execute: jest.fn().mockReturnValue(mockCharge),
        }
        const mockFindAllChargeUseCase = {
            execute: jest.fn().mockReturnValue([mockCharge]),
        }
        const mockFindOneChargeUseCase = {
            execute: jest.fn().mockReturnValue(mockCharge),
        } 
        const mockUpdatedChargeUseCase = {
            execute: jest.fn().mockReturnValue(mockCharge),
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChargeController],
            providers: [
                {
                    provide: CreatedChargeUseCase,
                    useValue: mockCreatedChargeUseCase,
                },
                {
                    provide: DeleteChargeUseCase,
                    useValue: mockDeleteChargeUseCase,
                },
                {
                    provide: FindAllChargeUseCase,
                    useValue: mockFindAllChargeUseCase,
                },
                {
                    provide: FindOneChargeUseCase,
                    useValue: mockFindOneChargeUseCase,
                },
                {
                    provide: UpdatedChargeUseCase,
                    useValue: mockUpdatedChargeUseCase,
                },
            ]
        }).compile();

        mockChargeController = module.get<ChargeController>(ChargeController);
    })
})