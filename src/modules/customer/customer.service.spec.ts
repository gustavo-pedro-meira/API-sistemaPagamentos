import { Test, TestingModule } from "@nestjs/testing";
import { GetTestCustomerUseCase } from "./useCases/getTest-customer.usecase"
import { FindOneCustomerUseCase } from "./useCases/findOne-customer.usecase";
import { CustomerRepository } from "./repositories/customer.repository";
import { FindAllCustomerUseCase } from "./useCases/findAll-customer.usecase";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { CreateCustomerProfileDto } from "./dto/created-customer.dto";
import { DeleteCustomerUseCase } from "./useCases/delete-customer.usecase";

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
                findOne: jest.fn().mockResolvedValue(mockCustomer),
                findAll: jest.fn().mockResolvedValue([mockCustomer]),
                create: jest.fn().mockResolvedValue(mockCustomer),
                deleteById: jest.fn().mockResolvedValue(mockCustomer),
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

    it("findOneCustomer()", async () => {
        const idTest = "uuid-fake-123";
        const resultado = await findOneCustomerUseCase.execute(idTest);
        expect(resultado?.id).toBe(idTest);
    })

    it("findAllCustomer()", async () => {
        const resultado = await findAllCustomerUseCase.execute();
        expect(resultado).toEqual([mockCustomer]);
    })

    it("createdCustomer()", async () => {
        const gustavoCustomer: CreateCustomerProfileDto = {
            name: 'Gustavo',
            cpf: "10625524328",
            email: "gustavo16pedro@gmail.com",
            sub: "uuid-fake-123",
        }
        const resultado = await createdCustomerUseCase.execute(gustavoCustomer);
        expect((resultado as any)?.cpf).toEqual("10625524328");
    })

    it("deletedCustomer()", async () => {
        const idTest = "uuid-fake-123";
        const resultado = await deleteCustomerUseCase.execute(idTest);
        expect(resultado?.id).toBe(idTest);
    })
})