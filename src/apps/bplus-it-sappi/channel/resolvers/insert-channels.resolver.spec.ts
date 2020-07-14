import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertChannelsResolver } from './insert-channels.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed'
import { BplusItSappiCreateChannelInput } from './../../../../../src/graphql';

describe('InsertChannelsResolver', () => 
{
    let resolver: InsertChannelsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertChannelsResolver,
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

        resolver    = module.get<InsertChannelsResolver>(InsertChannelsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertChannelsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertChannelsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an channels created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateChannelInput[]>channels)).toBe(true);
        });
    });
});