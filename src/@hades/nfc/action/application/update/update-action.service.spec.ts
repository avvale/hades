import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { UpdateActionService } from './update-action.service';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData, 
    ActionCreatedAt, 
    ActionUpdatedAt, 
    ActionDeletedAt
    
} from './../../domain/value-objects';
import { IActionRepository } from './../../domain/action.repository';
import { MockActionRepository } from './../../infrastructure/mock/mock-action.repository';

describe('UpdateActionService', () => 
{
    let service: UpdateActionService;
    let repository: IActionRepository;
    let mockRepository: MockActionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateActionService,
                MockActionRepository,
                { 
                    provide: IActionRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateActionService);
        repository      = module.get(IActionRepository);
        mockRepository  = module.get(MockActionRepository);
    });

    describe('main', () => 
    {
        test('UpdateActionService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a action and emit event', async () => 
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