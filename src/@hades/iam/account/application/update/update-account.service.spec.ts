import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { UpdateAccountService } from './update-account.service';
import { 
    AccountId,
    AccountType,
    AccountName,
    AccountIsActive,
    AccountClientId,
    AccountApplicationCodes,
    AccountPermissions,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt
    
} from './../../domain/value-objects';
import { IAccountRepository } from './../../domain/account.repository';
import { MockAccountRepository } from './../../infrastructure/mock/mock-account.repository';

describe('UpdateAccountService', () => 
{
    let service: UpdateAccountService;
    let repository: IAccountRepository;
    let mockRepository: MockAccountRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAccountService,
                MockAccountRepository,
                { 
                    provide: IAccountRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateAccountService);
        repository      = module.get(IAccountRepository);
        mockRepository  = module.get(MockAccountRepository);
    });

    describe('main', () => 
    {
        test('UpdateAccountService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a account and emit event', async () => 
        {
            expect(await service.main(
                new AccountId(accounts[0].id),
                new AccountType(accounts[0].type),
                new AccountName(accounts[0].name),
                new AccountIsActive(accounts[0].isActive),
                new AccountClientId(accounts[0].clientId),
                new AccountApplicationCodes(accounts[0].applicationCodes),
                new AccountPermissions(accounts[0].permissions),
                new AccountData(accounts[0].data),
                new AccountRoleIds(accounts[0].roleIds),
                new AccountTenantIds(accounts[0].tenantIds),
                
            )).toBe(undefined);
        });
    });
});