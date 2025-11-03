import { create } from "domain";
import { ChargeRepository } from "../repositories/charge.repository";
import { CreatedChargeUseCase } from "../useCases/created-charge.usecase";
import { DeleteChargeUseCase } from "../useCases/delete-charge.usecase";
import { FindAllChargeUseCase } from "../useCases/findAll-charge.usecase"
import { FindOneChargeUseCase } from "../useCases/findOne-charge.usecase";
import { UpdatedChargeUseCase } from "../useCases/updated-charge.usecase";
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

describe("ChargeServices", () => {
    let mockFindAllChargeUseCase: FindAllChargeUseCase;
    let mockFindOneChargeUseCase: FindOneChargeUseCase;
    let mockDeleteChargeUseCase: DeleteChargeUseCase;
    let mockCreatedChargeUseCase: CreatedChargeUseCase;
    let mockUpdatedChargeUseCase: UpdatedChargeUseCase;
    let mockChargeRepository: ChargeRepository;

    beforeEach(async () => {
        const mockRepositoryProvider =  {
            provide: ChargeRepository,
            useValue: {
                create: jest.fn(),
                findAll: jest.fn().mockResolvedValue([mockCharge]),
                findOne: jest.fn().mockResolvedValue(mockCharge),
                deleteById: jest.fn().mockResolvedValue(mockCharge),
                updatedById: jest.fn().mockResolvedValue(mockCharge),
            }
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindOneChargeUseCase,
                FindAllChargeUseCase,
                CreatedChargeUseCase,
                DeleteChargeUseCase,
                UpdatedChargeUseCase,
                mockRepositoryProvider,
            ]
        }).compile();

        mockFindAllChargeUseCase = module.get<FindAllChargeUseCase>(FindAllChargeUseCase);
        mockFindOneChargeUseCase = module.get<FindOneChargeUseCase>(FindOneChargeUseCase);
        mockCreatedChargeUseCase = module.get<CreatedChargeUseCase>(CreatedChargeUseCase);
        mockDeleteChargeUseCase = module.get<DeleteChargeUseCase>(DeleteChargeUseCase);
        mockUpdatedChargeUseCase = module.get<UpdatedChargeUseCase>(UpdatedChargeUseCase);
        mockChargeRepository = module.get<ChargeRepository>(ChargeRepository)
    })

    it("FindAll()", async () => {
        const resultado = await mockFindAllChargeUseCase.execute();
        expect(resultado?.length).toBe(1);
        expect(mockChargeRepository.findAll).toHaveBeenCalled();
    })

    it("FindOne()", async () => {
        const idTest = "uuid-charge-123";
        const resultado = await mockFindOneChargeUseCase.execute(idTest);
        expect(resultado?.id).toBe(idTest);
        expect(mockChargeRepository.findOne).toHaveBeenCalledWith(idTest);
    })

    it("CreatedCharge()", async () => {
        const mockChargeBoleto: CreatedChargeDto = {
            value: 200.00,
            coin: "Dollar",
            paymentMethod: "BOLETO",
            status: "PENDING",
            pixCopyCole: null,
            boletoCode: "code-boleto-123",
            cardInstallments: null,
            customerId: "uuid-customer-123",
        }
        const expectedResult = {
            id: "fake-uuid-123",
            createdAt: new Date(),
            ...mockChargeBoleto
        };

        (mockChargeRepository.create as jest.Mock).mockResolvedValue(expectedResult);
        const resultado = await mockCreatedChargeUseCase.execute(mockChargeBoleto);
        expect(resultado).toEqual(expectedResult);
        expect(resultado?.coin).toBe("Dollar")
    })

    it("DeletedCharge()", async () => {
        const idTest = "uuid-charge-123";
        const resultado = await mockDeleteChargeUseCase.execute(idTest);
        expect(resultado).toEqual(mockCharge);
        expect(mockChargeRepository.deleteById).toHaveBeenCalledWith(idTest);
    })
})