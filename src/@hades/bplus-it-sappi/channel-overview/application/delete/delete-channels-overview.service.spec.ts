import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteChannelsOverviewService } from './delete-channels-overview.service';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { MockChannelOverviewRepository } from './../../infrastructure/mock/mock-channel-overview.repository';

describe('DeleteChannelsOverviewService', () => 
{
    let service: DeleteChannelsOverviewService;
    let repository: IChannelOverviewRepository;
    let mockRepository: MockChannelOverviewRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteChannelsOverviewService,
                MockChannelOverviewRepository,
                { 
                    provide: IChannelOverviewRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteChannelsOverviewService);
        repository      = module.get(IChannelOverviewRepository);
        mockRepository  = module.get(MockChannelOverviewRepository);
    });

    describe('main', () => 
    {
        test('DeleteChannelsOverviewService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete channelOverview and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});