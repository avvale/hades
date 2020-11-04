import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateChannelOverviewResolver } from './cci-update-channel-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';
import { CciUpdateChannelOverviewInput } from './../../../../graphql';

describe('CciUpdateChannelOverviewResolver', () => 
{
    let resolver: CciUpdateChannelOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateChannelOverviewResolver,
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

        resolver  = module.get<CciUpdateChannelOverviewResolver>(CciUpdateChannelOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateChannelOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciUpdateChannelOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a channelOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview[0])));
            expect(await resolver.main(<CciUpdateChannelOverviewInput>channelsOverview[0])).toBe(channelsOverview[0]);
        });
    });
});