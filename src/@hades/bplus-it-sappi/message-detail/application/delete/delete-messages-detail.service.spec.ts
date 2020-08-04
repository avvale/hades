import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteMessagesDetailService } from './delete-messages-detail.service';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { MockMessageDetailRepository } from './../../infrastructure/mock/mock-message-detail.repository';

describe('DeleteMessagesDetailService', () => 
{
    let service: DeleteMessagesDetailService;
    let repository: IMessageDetailRepository;
    let mockRepository: MockMessageDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteMessagesDetailService,
                MockMessageDetailRepository,
                { 
                    provide: IMessageDetailRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteMessagesDetailService);
        repository      = module.get(IMessageDetailRepository);
        mockRepository  = module.get(MockMessageDetailRepository);
    });

    describe('main', () => 
    {
        test('DeleteMessagesDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete messageDetail and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});