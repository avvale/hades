import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateChannelOverviewResolver } from './update-channel-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed'
import { BplusItSappiUpdateChannelOverviewInput } from './../../../../../src/graphql';

describe('UpdateChannelOverviewResolver', () => 
{
    let resolver: UpdateChannelOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateChannelOverviewResolver,
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

        resolver  = module.get<UpdateChannelOverviewResolver>(UpdateChannelOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateChannelOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateChannelOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a channelOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview[0])));
            expect(await resolver.main(<BplusItSappiUpdateChannelOverviewInput>channelsOverview[0])).toBe(channelsOverview[0]);
        });
    });
});