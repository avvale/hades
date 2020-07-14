import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelOverviewResolver } from './create-channel-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed'
import { BplusItSappiCreateChannelOverviewInput } from './../../../../../src/graphql';

describe('CreateChannelOverviewResolver', () => 
{
    let resolver: CreateChannelOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelOverviewResolver,
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

        resolver    = module.get<CreateChannelOverviewResolver>(CreateChannelOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateChannelOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateChannelOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an channelOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview[0])));
            expect(await resolver.main(<BplusItSappiCreateChannelOverviewInput>channelsOverview[0])).toBe(channelsOverview[0]);
        });
    });
});