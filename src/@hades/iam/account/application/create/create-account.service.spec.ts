import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { CreateAccountService } from './create-account.service';
import {
    AccountId,
    AccountType,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from './../../domain/value-objects';
import { IAccountRepository } from './../../domain/account.repository';
import { MockAccountRepository } from './../../infrastructure/mock/mock-account.repository';

describe('CreateAccountService', () =>

{
    let service: CreateAccountService;
    let repository: IAccountRepository;
    let mockRepository: MockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateAccountService,
                MockAccountRepository,
                {
                    provide: IAccountRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateAccountService);
        repository      = module.get(IAccountRepository);
        mockRepository  = module.get(MockAccountRepository);
    });

    describe('main', () =>
    {
        test('CreateAccountService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a account and emit event', async () =>
        {
            expect(await service.main(
                new AccountId(accounts[0].id),
                new AccountType(accounts[0].type),
                new AccountEmail(accounts[0].email),
                new AccountIsActive(accounts[0].isActive),
                new AccountClientId(accounts[0].clientId),
                new AccountDApplicationCodes(accounts[0].dApplicationCodes),
                new AccountDPermissions(accounts[0].dPermissions),
                new AccountDTenants(accounts[0].dTenants),
                new AccountData(accounts[0].data),
                new AccountRoleIds(accounts[0].roleIds),
                new AccountTenantIds(accounts[0].tenantIds),
                
            )).toBe(undefined);
        });
    });
});