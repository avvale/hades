import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelsOverviewResolver } from './create-channels-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';
import { BplusItSappiCreateChannelOverviewInput } from './../../../../../src/graphql';

describe('CreateChannelsOverviewResolver', () => 
{
    let resolver: CreateChannelsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelsOverviewResolver,
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

        resolver    = module.get<CreateChannelsOverviewResolver>(CreateChannelsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateChannelsOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateChannelsOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channelsOverview created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateChannelOverviewInput[]>channelsOverview)).toBe(true);
        });
    });
});