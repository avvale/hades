import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciPaginateChannelsOverviewResolver } from './cci-paginate-channels-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';

describe('CciPaginateChannelsOverviewResolver', () =>
{
    let resolver: CciPaginateChannelsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciPaginateChannelsOverviewResolver,
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

        resolver    = module.get<CciPaginateChannelsOverviewResolver>(CciPaginateChannelsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciPaginateChannelsOverviewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciPaginateChannelsOverviewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a channelsOverview', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview)));
            expect(await resolver.main()).toBe(channelsOverview);
        });
    });
});