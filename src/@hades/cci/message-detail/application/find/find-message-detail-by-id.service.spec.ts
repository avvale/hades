import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';
import { FindMessageDetailByIdService } from './find-message-detail-by-id.service';
import { MessageDetailId } from './../../domain/value-objects';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { MockMessageDetailRepository } from './../../infrastructure/mock/mock-message-detail.repository';

describe('FindMessageDetailByIdService', () => 
{
    let service: FindMessageDetailByIdService;
    let repository: IMessageDetailRepository;
    let mockRepository: MockMessageDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindMessageDetailByIdService,
                MockMessageDetailRepository,
                { 
                    provide: IMessageDetailRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindMessageDetailByIdService);
        repository      = module.get(IMessageDetailRepository);
        mockRepository  = module.get(MockMessageDetailRepository);
    });

    describe('main', () => 
    {
        test('FindMessageDetailByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find messageDetail by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new MessageDetailId(messagesDetail[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});