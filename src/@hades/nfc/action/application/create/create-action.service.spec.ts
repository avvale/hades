import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { CreateActionService } from './create-action.service';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData
    
} from './../../domain/value-objects';
import { IActionRepository } from './../../domain/action.repository';
import { MockActionRepository } from './../../infrastructure/mock/mock-action.repository';

describe('CreateActionService', () => 
{
    let service: CreateActionService;
    let repository: IActionRepository;
    let mockRepository: MockActionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateActionService,
                MockActionRepository,
                { 
                    provide: IActionRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateActionService);
        repository      = module.get(IActionRepository);
        mockRepository  = module.get(MockActionRepository);
    });

    describe('main', () => 
    {
        test('CreateActionService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a action and emit event', async () => 
        {
            expect(await service.main(
                new ActionId(actions[0].id),
                new ActionTagId(actions[0].tagId),
                new ActionType(actions[0].type),
                new ActionSectionId(actions[0].sectionId),
                new ActionData(actions[0].data),
                
            )).toBe(undefined);
        });
    });
});