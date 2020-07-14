import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertChannelsOverviewResolver } from './insert-channels-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed'
import { BplusItSappiCreateChannelOverviewInput } from './../../../../../src/graphql';

describe('InsertChannelsOverviewResolver', () => 
{
    let resolver: InsertChannelsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertChannelsOverviewResolver,
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

        resolver    = module.get<InsertChannelsOverviewResolver>(InsertChannelsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertChannelsOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertChannelsOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an channelsOverview created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateChannelOverviewInput[]>channelsOverview)).toBe(true);
        });
    });
});