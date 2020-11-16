import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';
import { UpdateTenantService } from './update-tenant.service';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from './../../domain/value-objects';
import { ITenantRepository } from './../../domain/tenant.repository';
import { MockTenantRepository } from './../../infrastructure/mock/mock-tenant.repository';

describe('UpdateTenantService', () =>
{
    let service: UpdateTenantService;
    let repository: ITenantRepository;
    let mockRepository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateTenantService,
                MockTenantRepository,
                {
                    provide: ITenantRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateTenantService);
        repository      = module.get(ITenantRepository);
        mockRepository  = module.get(MockTenantRepository);
    });

    describe('main', () =>
    {
        test('UpdateTenantService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a tenant and emit event', async () =>
        {
            expect(await service.main(
                new TenantId(tenants[0].id),
                new TenantName(tenants[0].name),
                new TenantCode(tenants[0].code),
                new TenantLogo(tenants[0].logo),
                new TenantIsActive(tenants[0].isActive),
                new TenantData(tenants[0].data),
                new TenantAccountIds(tenants[0].accountIds),
            )).toBe(undefined);
        });
    });
});