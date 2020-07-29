import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { DeleteActionByIdService } from './delete-action-by-id.service';
import { ActionId } from './../../domain/value-objects';
import { IActionRepository } from './../../domain/action.repository';
import { MockActionRepository } from './../../infrastructure/mock/mock-action.repository';

describe('DeleteActionByIdService', () => 
{
    let service: DeleteActionByIdService;
    let repository: IActionRepository;
    let mockRepository: MockActionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteActionByIdService,
                MockActionRepository,
                { 
                    provide: IActionRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteActionByIdService);
        repository      = module.get(IActionRepository);
        mockRepository  = module.get(MockActionRepository);
    });

    describe('main', () => 
    {
        test('DeleteActionByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete action and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ActionId(actions[0].id)
            )).toBe(undefined);
        });
    });
});