import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindMessageDetailService } from './find-message-detail.service';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { MockMessageDetailRepository } from './../../infrastructure/mock/mock-message-detail.repository';

describe('FindMessageDetailService', () => 
{
    let service: FindMessageDetailService;
    let repository: IMessageDetailRepository;
    let mockRepository: MockMessageDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindMessageDetailService,
                MockMessageDetailRepository,
                { 
                    provide: IMessageDetailRepository,
                    useValue: {
                        find: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindMessageDetailService);
        repository      = module.get(IMessageDetailRepository);
        mockRepository  = module.get(MockMessageDetailRepository);
    });

    describe('main', () => 
    {
        test('FindMessageDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find messageDetail', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main([])).toBe(mockRepository.collectionSource[0]);
        });
    });
});