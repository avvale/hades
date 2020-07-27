import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';
import { UpdateSystemService } from './update-system.service';
import { 
    SystemId, 
    SystemTenantId, 
    SystemTenantCode, 
    SystemVersion, 
    SystemName, 
    SystemEnvironment, 
    SystemIsActive, 
    SystemCancelledAt, 
    SystemCreatedAt, 
    SystemUpdatedAt, 
    SystemDeletedAt
    
} from './../../domain/value-objects';
import { ISystemRepository } from './../../domain/system.repository';
import { MockSystemRepository } from './../../infrastructure/mock/mock-system.repository';

describe('UpdateSystemService', () => 
{
    let service: UpdateSystemService;
    let repository: ISystemRepository;
    let mockRepository: MockSystemRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateSystemService,
                MockSystemRepository,
                { 
                    provide: ISystemRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateSystemService);
        repository      = module.get(ISystemRepository);
        mockRepository  = module.get(MockSystemRepository);
    });

    describe('main', () => 
    {
        test('UpdateSystemService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a system and emit event', async () => 
        {
            expect(await service.main(
                new SystemId(systems[0].id),
                new SystemTenantId(systems[0].tenantId),
                new SystemTenantCode(systems[0].tenantCode),
                new SystemVersion(systems[0].version),
                new SystemName(systems[0].name),
                new SystemEnvironment(systems[0].environment),
                new SystemIsActive(systems[0].isActive),
                new SystemCancelledAt(systems[0].cancelledAt),
                
            )).toBe(undefined);
        });
    });
});