import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateChannelOverviewResolver } from './cci-create-channel-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';
import { CciCreateChannelOverviewInput } from './../../../../graphql';

describe('CciCreateChannelOverviewResolver', () =>
{
    let resolver: CciCreateChannelOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateChannelOverviewResolver,
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

        resolver    = module.get<CciCreateChannelOverviewResolver>(CciCreateChannelOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateChannelOverviewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateChannelOverviewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channelOverview created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview[0])));
            expect(await resolver.main(<CciCreateChannelOverviewInput>channelsOverview[0])).toBe(channelsOverview[0]);
        });
    });
});