import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';
import { CreateSystemService } from './create-system.service';
import { 
    SystemId, 
    SystemTenantId, 
    SystemTenantCode, 
    SystemVersion, 
    SystemName, 
    SystemEnvironment, 
    SystemIsActive, 
    SystemCancelledAt
    
} from './../../domain/value-objects';
import { ISystemRepository } from './../../domain/system.repository';
import { MockSystemRepository } from './../../infrastructure/mock/mock-system.repository';

describe('CreateSystemService', () => 
{
    let service: CreateSystemService;
    let repository: ISystemRepository;
    let mockRepository: MockSystemRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateSystemService,
                MockSystemRepository,
                { 
                    provide: ISystemRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateSystemService);
        repository      = module.get(ISystemRepository);
        mockRepository  = module.get(MockSystemRepository);
    });

    describe('main', () => 
    {
        test('CreateSystemService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a system and emit event', async () => 
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