import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { CreateApplicationService } from './create-application.service';
import { 
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster
    
} from './../../domain/value-objects';
import { IApplicationRepository } from './../../domain/application.repository';
import { MockApplicationRepository } from './../../infrastructure/mock/mock-application.repository';

describe('CreateApplicationService', () => 
{
    let service: CreateApplicationService;
    let repository: IApplicationRepository;
    let mockRepository: MockApplicationRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateApplicationService,
                MockApplicationRepository,
                { 
                    provide: IApplicationRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateApplicationService);
        repository      = module.get(IApplicationRepository);
        mockRepository  = module.get(MockApplicationRepository);
    });

    describe('main', () => 
    {
        test('CreateApplicationService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a application and emit event', async () => 
        {
            expect(await service.main(
                new ApplicationId(applications[0].id),
                new ApplicationName(applications[0].name),
                new ApplicationCode(applications[0].code),
                new ApplicationSecret(applications[0].secret),
                new ApplicationIsMaster(applications[0].isMaster),
                
            )).toBe(undefined);
        });
    });
});