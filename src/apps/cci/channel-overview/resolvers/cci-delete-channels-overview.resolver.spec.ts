import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteChannelsOverviewResolver } from './cci-delete-channels-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';

describe('CciDeleteChannelsOverviewResolver', () =>
{
    let resolver: CciDeleteChannelsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciDeleteChannelsOverviewResolver,
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

        resolver    = module.get<CciDeleteChannelsOverviewResolver>(CciDeleteChannelsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciDeleteChannelsOverviewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciDeleteChannelsOverviewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channelsOverview deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview)));
            expect(await resolver.main()).toBe(channelsOverview);
        });
    });
});