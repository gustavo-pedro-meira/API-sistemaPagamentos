import { CreatedChargeUseCase } from "../useCases/created-charge.usecase";
import { DeleteChargeUseCase } from "../useCases/delete-charge.usecase";
import { FindAllChargeUseCase } from "../useCases/findAll-charge.usecase";
import { FindOneChargeUseCase } from "../useCases/findOne-charge.usecase";
import { UpdatedChargeUseCase } from "../useCases/updated-charge.usecase";
import { ChargeController } from "../charge.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { CreatedChargeDto } from "../dto/created-charge.dto";


const mockCharge: any = {
    id: "uuid-charge-123",
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
            execute: jest.fn(),
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

        createdChargeUseCase = mockCreatedChargeUseCase;
        deleteChargeUseCase = mockDeleteChargeUseCase;

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
        jest.clearAllMocks();
    })

    describe("Find one charges", () => {
        it("Find one charge exist", async () => {
            const idTest = "uuid-charge-123";
            const resultado = await mockChargeController.oneCharge(idTest);
            expect(resultado?.id).toBe(idTest);
        })
    })

    describe("Find all charges", () => {
        it("Find all charges", async () => {
            const resultado = await mockChargeController.allCharge();
            expect(resultado).toEqual([mockCharge]);
            expect(resultado?.length).toBe(1);
        })
    })

    describe("Created charge", () => {
        it("Created new charge", async () => {
            const mockPixCharge: CreatedChargeDto = {
                value: 70.00,
                coin: "Dollar",
                status: "PENDING",
                paymentMethod: "PIX",
                pixCopyCole: "codigo-pix-321",
                boletoCode: null,
                cardInstallments: null,
                customerId: "uuid-customer-321",
            }
            const expectedResult = {
                id: "fake-id-abc",
                createdAt: new Date(),
                ...mockPixCharge,
            };

            (createdChargeUseCase.execute as jest.Mock).mockResolvedValue(expectedResult);
            const resultado = await mockChargeController.createdCharge(mockPixCharge);
            expect((resultado)?.coin).toEqual("Dollar");
            expect((resultado)?.value).toEqual(70.00);
        })
    })

    describe("Deleted charge", () => {
        it("Deleted charge exist", async () => {
            const idTest = "uuid-charge-123";
            (deleteChargeUseCase.execute as jest.Mock).mockResolvedValue(idTest);

            const resultado = await mockChargeController.deleteCharge(idTest);
            expect(resultado?.id).toBe(undefined);
            expect(deleteChargeUseCase.execute).toHaveBeenCalledWith(idTest);
        })
    })
})