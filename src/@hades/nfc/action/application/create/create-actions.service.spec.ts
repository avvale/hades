import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateActionsService } from './create-actions.service';
import { IActionRepository } from './../../domain/action.repository';
import { MockActionRepository } from './../../infrastructure/mock/mock-action.repository';

describe('CreateActionsService', () => 
{
    let service: CreateActionsService;
    let repository: IActionRepository;
    let mockRepository: MockActionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateActionsService,
                MockActionRepository,
                { 
                    provide: IActionRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateActionsService);
        repository      = module.get(IActionRepository);
        mockRepository  = module.get(MockActionRepository);
    });

    describe('main', () => 
    {
        test('CreateActionsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create actions and emit event', async () => 
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});