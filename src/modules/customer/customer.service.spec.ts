import { Test, TestingModule } from "@nestjs/testing";
import { GetTestCustomerUseCase } from "./useCases/getTest-customer.usecase"
import { FindOneCustomerUseCase } from "./useCases/findOne-customer.usecase";
import { CustomerRepository } from "./repositories/customer.repository";
import { FindAllCustomerUseCase } from "./useCases/findAll-customer.usecase";


describe("CustomerService", () => {
    let getTestCustomerUseCase: GetTestCustomerUseCase;
    let findOneCustomerUseCase: FindOneCustomerUseCase;
    let findAllCustomerUseCase:FindAllCustomerUseCase;
    let mockCustomerRepository: CustomerRepository;

    const mockCustomer: any = {
        id: "uuid-fake-123",
        sub: "uuid-sube-123",
        name: "Gustavo Pedro Meira",
        email: "gustavo16pedro@gmail.com",
        cpf: "10625524328",
    }

    beforeEach(async () => {
        const mockRepositoryProvider = {
            provide: CustomerRepository,
            useValue: {
                findOne: jest.fn().mockResolvedValue(mockCustomer),
                findAll:jest.fn().mockResolvedValue([mockCustomer]),
            }
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetTestCustomerUseCase,
                FindOneCustomerUseCase,
                FindAllCustomerUseCase,
                mockRepositoryProvider,
            ],
        }).compile();

        getTestCustomerUseCase = module.get<GetTestCustomerUseCase>(GetTestCustomerUseCase);
        findOneCustomerUseCase = module.get<FindOneCustomerUseCase>(FindOneCustomerUseCase);
        findAllCustomerUseCase = module.get<FindAllCustomerUseCase>(FindAllCustomerUseCase);
        mockCustomerRepository = module.get<CustomerRepository>(CustomerRepository);
    })

    it("getHello()", async () => {
        const resultado = await getTestCustomerUseCase.execute();
        expect(resultado).toBe("Olá Testes");
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
})