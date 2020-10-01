import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelOverviewByIdResolver } from './delete-channel-overview-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';

describe('DeleteChannelOverviewByIdResolver', () => 
{
    let resolver: DeleteChannelOverviewByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteChannelOverviewByIdResolver,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        resolver    = module.get<DeleteChannelOverviewByIdResolver>(DeleteChannelOverviewByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('DeleteChannelOverviewByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('DeleteChannelOverviewByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channelOverview deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview[0])));
            expect(await resolver.main(channelsOverview[0].id)).toBe(channelsOverview[0]);
        });
    });
});