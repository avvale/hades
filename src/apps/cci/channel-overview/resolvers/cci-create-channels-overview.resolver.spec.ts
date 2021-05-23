import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateChannelsOverviewResolver } from './cci-create-channels-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';
import { CciCreateChannelOverviewInput } from './../../../../graphql';

describe('CciCreateChannelsOverviewResolver', () =>
{
    let resolver: CciCreateChannelsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateChannelsOverviewResolver,
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

        resolver    = module.get<CciCreateChannelsOverviewResolver>(CciCreateChannelsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateChannelsOverviewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateChannelsOverviewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channelsOverview created', async () =>
        {
            expect(await resolver.main(<CciCreateChannelOverviewInput[]>channelsOverview)).toBe(true);
        });
    });
});