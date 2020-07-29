import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteActionsService } from './delete-actions.service';
import { IActionRepository } from './../../domain/action.repository';
import { MockActionRepository } from './../../infrastructure/mock/mock-action.repository';

describe('DeleteActionsService', () => 
{
    let service: DeleteActionsService;
    let repository: IActionRepository;
    let mockRepository: MockActionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteActionsService,
                MockActionRepository,
                { 
                    provide: IActionRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteActionsService);
        repository      = module.get(IActionRepository);
        mockRepository  = module.get(MockActionRepository);
    });

    describe('main', () => 
    {
        test('DeleteActionsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete action and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});