import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';
import { DeleteChannelOverviewByIdService } from './delete-channel-overview-by-id.service';
import { ChannelOverviewId } from './../../domain/value-objects';
import { IChannelOverviewRepository } from '../../domain/channel-overview.repository';
import { MockChannelOverviewRepository } from '../../infrastructure/mock/mock-channel-overview.repository';

describe('DeleteChannelOverviewByIdService', () => 
{
    let service: DeleteChannelOverviewByIdService;
    let repository: IChannelOverviewRepository;
    let mockRepository: MockChannelOverviewRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteChannelOverviewByIdService,
                MockChannelOverviewRepository,
                { 
                    provide: IChannelOverviewRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteChannelOverviewByIdService);
        repository      = module.get(IChannelOverviewRepository);
        mockRepository  = module.get(MockChannelOverviewRepository);
    });

    describe('main', () => 
    {
        it('DeleteChannelOverviewByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete channelOverview and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ChannelOverviewId(channelsOverview[0].id)
            )).toBe(undefined);
        });
    });
});