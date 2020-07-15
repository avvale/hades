import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertChannelsDetailResolver } from './insert-channels-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { BplusItSappiCreateChannelDetailInput } from './../../../../../src/graphql';

describe('InsertChannelsDetailResolver', () => 
{
    let resolver: InsertChannelsDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertChannelsDetailResolver,
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

        resolver    = module.get<InsertChannelsDetailResolver>(InsertChannelsDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertChannelsDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertChannelsDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an channelsDetail created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateChannelDetailInput[]>channelsDetail)).toBe(true);
        });
    });
});