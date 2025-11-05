import { Test, TestingModule } from "@nestjs/testing";
import { GetTestCustomerUseCase } from "../useCases/getTest-customer.usecase"
import { FindOneCustomerUseCase } from "../useCases/findOne-customer.usecase";
import { CustomerRepository } from "../repositories/customer.repository";
import { FindAllCustomerUseCase } from "../useCases/findAll-customer.usecase";
import { CreatedCustomerUseCase } from "../useCases/created-customer.usecase";
import { CreateCustomerProfileDto } from "../dto/created-customer.dto";
import { DeleteCustomerUseCase } from "../useCases/delete-customer.usecase";
import e from "express";

const mockCustomer: any = {
    id: "uuid-fake-123",
    sub: "uuid-sube-123",
    name: "Gustavo Pedro Meira",
    email: "gustavo16pedro@gmail.com",
    cpf: "10625524328",
}

describe("CustomerService", () => {
    let findOneCustomerUseCase: FindOneCustomerUseCase;
    let findAllCustomerUseCase: FindAllCustomerUseCase;
    let createdCustomerUseCase: CreatedCustomerUseCase;
    let deleteCustomerUseCase: DeleteCustomerUseCase;
    let mockCustomerRepository: CustomerRepository;

    beforeEach(async () => {
        const mockRepositoryProvider = {
            provide: CustomerRepository,
            useValue: {
                findOne: jest.fn(),
                findAll: jest.fn().mockResolvedValue([mockCustomer]),
                create: jest.fn(),
                deleteById: jest.fn(),
            }
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindOneCustomerUseCase,
                FindAllCustomerUseCase,
                CreatedCustomerUseCase,
                DeleteCustomerUseCase,
                mockRepositoryProvider,
            ],
        }).compile();

        findOneCustomerUseCase = module.get<FindOneCustomerUseCase>(FindOneCustomerUseCase);
        findAllCustomerUseCase = module.get<FindAllCustomerUseCase>(FindAllCustomerUseCase);
        createdCustomerUseCase = module.get<CreatedCustomerUseCase>(CreatedCustomerUseCase);
        deleteCustomerUseCase = module.get<DeleteCustomerUseCase>(DeleteCustomerUseCase);
        mockCustomerRepository = module.get<CustomerRepository>(CustomerRepository);
    })

    describe("Find one Customers", () => {
        it("Find one customer exist", async () => {
            const idTest = "uuid-fake-123";
            (mockCustomerRepository.findOne as jest.Mock).mockResolvedValue(mockCustomer);
            const resultado = await findOneCustomerUseCase.execute(idTest);
            expect(resultado?.id).toBe(idTest);
        })

        it("Find one customer not found", async () => {
            const idFalse = "uuid-customer-123";
            (mockCustomerRepository.findOne as jest.Mock).mockResolvedValue(null);
            await expect(findOneCustomerUseCase.execute(idFalse)).rejects.toThrow("Customer not found.");
        })
    } )

    describe("Find all customers", () => {
        it("Find all customers", async () => {
            const resultado = await findAllCustomerUseCase.execute();
            expect(resultado).toEqual([mockCustomer]);
        })
    })

    describe("Created customers", () => {
        it("Created new customer", async () => {
            const gustavoCustomer: CreateCustomerProfileDto = {
                name: 'Gustavo',
                cpf: "10625524327",
                email: "gustavo16pedro@gmail.com",
                sub: "uuid-fake-123",
            }
            const expectedResult = {
                id: "uuid-fake-123",
                createdAt: new Date(),
                ...gustavoCustomer,
            };

            (mockCustomerRepository.create as jest.Mock).mockResolvedValue(expectedResult);
            const resultado = await createdCustomerUseCase.execute(gustavoCustomer);
            expect((resultado as any)?.cpf).toEqual("10625524327");
        })
    })

    describe("Deleted customers", () => {
        it("Deleted customer exist", async () => {
            const idTest = "uuid-fake-123";
            (mockCustomerRepository.deleteById as jest.Mock).mockResolvedValue(mockCustomer);
            const resultado = await deleteCustomerUseCase.execute(idTest);
            expect(resultado).toEqual(mockCustomer);
            expect(mockCustomerRepository.deleteById).toHaveBeenCalledWith(idTest);
        })

        it("Deleted customer not found", async () => {
            const idFalse = "uuid-customer-123";
            (mockCustomerRepository.deleteById as jest.Mock).mockResolvedValue(null);
            await expect(deleteCustomerUseCase.execute(idFalse)).rejects.toThrow("Customer not found.");
        })
    })
})