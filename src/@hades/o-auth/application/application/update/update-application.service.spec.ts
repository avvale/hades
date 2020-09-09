import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { UpdateApplicationService } from './update-application.service';
import { 
    ApplicationId, 
    ApplicationCode, 
    ApplicationSecret, 
    ApplicationName, 
    ApplicationCreatedAt, 
    ApplicationUpdatedAt, 
    ApplicationDeletedAt
    
} from './../../domain/value-objects';
import { IApplicationRepository } from './../../domain/application.repository';
import { MockApplicationRepository } from './../../infrastructure/mock/mock-application.repository';

describe('UpdateApplicationService', () => 
{
    let service: UpdateApplicationService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateApplicationService,
                MockApplicationRepository,
                { 
                    provide: IApplicationRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateApplicationService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () => 
    {
        test('UpdateApplicationService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a application and emit event', async () => 
        {
            expect(await service.main(
                new ApplicationId(applications[0].id),
                new ApplicationCode(applications[0].code),
                new ApplicationSecret(applications[0].secret),
                new ApplicationName(applications[0].name),
                
            )).toBe(undefined);
        });
    });
});