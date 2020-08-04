import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindChannelDetailService } from './find-channel-detail.service';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { MockChannelDetailRepository } from './../../infrastructure/mock/mock-channel-detail.repository';

describe('FindChannelDetailService', () => 
{
    let service: FindChannelDetailService;
    let repository: IChannelDetailRepository;
    let mockRepository: MockChannelDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindChannelDetailService,
                MockChannelDetailRepository,
                { 
                    provide: IChannelDetailRepository,
                    useValue: {
                        find: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindChannelDetailService);
        repository      = module.get(IChannelDetailRepository);
        mockRepository  = module.get(MockChannelDetailRepository);
    });

    describe('main', () => 
    {
        test('FindChannelDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find channelDetail', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main([])).toBe(mockRepository.collectionSource[0]);
        });
    });
});