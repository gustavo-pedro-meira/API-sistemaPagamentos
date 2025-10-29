import { Test, TestingModule } from "@nestjs/testing";
import { CustomerController } from "./customer.controller"
import { GetTestCustomerUseCase } from "./useCases/getTest-customer.usecase";
import { CreatedCustomerUseCase } from "./useCases/created-customer.usecase";
import { FindOneCustomerUseCase } from "./useCases/findOne-customer.usecase";
import { FindAllCustomerUseCase } from "./useCases/findAll-customer.usecase";
import { DeleteCustomerUseCase } from "./useCases/delete-customer.usecase";
import { FindProfileCustomerUseCase } from "./useCases/find-profile.customer.usecase";
import { CustomerRepository } from "./repositories/customer.repository";


describe("CustomerController", () => {
    let customerController: CustomerController;
    let getTestCustomerUseCase: GetTestCustomerUseCase;

    const mockGetTestCustomerUseCase = {
        execute: jest.fn(() => "Hello Falso"),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomerController],
            providers: [
                CreatedCustomerUseCase,
                FindOneCustomerUseCase,
                FindAllCustomerUseCase,
                DeleteCustomerUseCase,
                FindProfileCustomerUseCase,
                {
                    provide: CustomerRepository,
                    useValue: {},
                },
                {
                    provide: GetTestCustomerUseCase,
                    useValue: mockGetTestCustomerUseCase,
                },
            ],
        }).compile();

        customerController = module.get<CustomerController>(CustomerController);
        getTestCustomerUseCase = module.get<GetTestCustomerUseCase>(GetTestCustomerUseCase);

    })

    it("getHello()", () => {
        const resultado = customerController.getTest();
        expect(resultado).toBe("Hello Falso");
        expect(getTestCustomerUseCase.execute).toHaveBeenCalled();
    })
})