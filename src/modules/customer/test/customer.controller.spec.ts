import { Test, TestingModule } from "@nestjs/testing";
import { CustomerController } from "../customer.controller"
import { GetTestCustomerUseCase } from "../useCases/getTest-customer.usecase";
import { CreatedCustomerUseCase } from "../useCases/created-customer.usecase";
import { FindOneCustomerUseCase } from "../useCases/findOne-customer.usecase";
import { FindAllCustomerUseCase } from "../useCases/findAll-customer.usecase";
import { DeleteCustomerUseCase } from "../useCases/delete-customer.usecase";
import { FindProfileCustomerUseCase } from "../useCases/find-profile.customer.usecase";
import { CustomerRepository } from "../repositories/customer.repository";
import { CreateCustomerProfileDto } from "../dto/created-customer.dto";
import { Customer } from "generated/prisma";

const mockCustomer: any = {
    id: "uuid-fake-123",
    sub: "uuid-sube-123",
    name: "Gustavo Pedro Meira",
    email: "gustavo16pedro@gmail.com",
    cpf: "10625524328",
}

describe("Controller Customer", () => {
    let customerController: CustomerController;
    let findOneCustomerUseCase: { execute: jest.Mock };
    let findAllCustomerUseCase: { execute: jest.Mock };
    let createdCustomerUseCase: { execute: jest.Mock };
    let deleteCustomerUseCase: { execute: jest.Mock };

    beforeEach(async () => {
        const mockFindAllCustomerUseCase = {
            execute: jest.fn().mockReturnValue([mockCustomer]),
        }
        const mockFindOneCustomerUseCase = {
            execute: jest.fn(),
        }
        const mockCreatedCustomerUseCase = {
            execute: jest.fn(),
        }
        const mockDeleteCustomerUseCase = {
            execute: jest.fn(),
        }

        createdCustomerUseCase = mockCreatedCustomerUseCase;
        deleteCustomerUseCase = mockDeleteCustomerUseCase;
        findOneCustomerUseCase = mockFindOneCustomerUseCase;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomerController],
            providers: [
                {
                    provide: FindAllCustomerUseCase,
                    useValue: mockFindAllCustomerUseCase,
                },
                {
                    provide: CreatedCustomerUseCase,
                    useValue: mockCreatedCustomerUseCase,
                },
                {
                    provide: FindOneCustomerUseCase,
                    useValue: mockFindOneCustomerUseCase,
                },
                {
                    provide: CreatedCustomerUseCase,
                    useValue: mockCreatedCustomerUseCase,
                },
                {
                    provide: DeleteCustomerUseCase,
                    useValue: mockDeleteCustomerUseCase,
                }
            ],
        }).compile();

        customerController = module.get<CustomerController>(CustomerController);
    })

    describe("Find all customers", () => {
        it("Find all customers", async () => {
            const resultado = await customerController.allCustomer();
            expect(resultado).toEqual([mockCustomer]);
        })
    })

    describe("Find one customers", () => {
        it("Find one customer exist", async () => {
            const idTest = "uuid-fake-123";
            (findOneCustomerUseCase.execute as jest.Mock).mockResolvedValue(mockCustomer);
            const resultado = await customerController.oneCustomer(idTest);
            expect(resultado?.id).toBe("uuid-fake-123");
        })
    })

    describe("Created customers", () => {
        it("Created new customer", async () => {
            const gustavoCustomer: CreateCustomerProfileDto = {
                name: 'Gustavo',
                cpf: "10625524322",
                email: "gustavo16pedro@gmail.com",
                sub: "uuid-fake-123",
            }
            const expectResult = {
                id: "fake-id-123",
                createdAt: new Date(),
                ...gustavoCustomer,
            };

            (createdCustomerUseCase.execute as jest.Mock).mockResolvedValue(expectResult);
            const resultado = await customerController.createdCustomer(gustavoCustomer);
            expect((resultado as any)?.cpf).toEqual("10625524322");
        })
    })

    describe("Deleted customers", () => {
        it ("Deleted customer exist", async () => {
            const idTest = "uuid-fake-123";
            (deleteCustomerUseCase.execute as jest.Mock).mockResolvedValue(idTest);

            const resultado = await customerController.deleteCustomer(idTest);
            expect(resultado?.id).toBe(undefined);
            expect(deleteCustomerUseCase.execute).toHaveBeenCalledWith(idTest);
        })
    })
})