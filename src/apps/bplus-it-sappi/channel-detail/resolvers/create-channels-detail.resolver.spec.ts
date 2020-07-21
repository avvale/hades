import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelsDetailResolver } from './create-channels-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { BplusItSappiCreateChannelDetailInput } from './../../../../../src/graphql';

describe('CreateChannelsDetailResolver', () => 
{
    let resolver: CreateChannelsDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelsDetailResolver,
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

        resolver    = module.get<CreateChannelsDetailResolver>(CreateChannelsDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateChannelsDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateChannelsDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channelsDetail created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateChannelDetailInput[]>channelsDetail)).toBe(true);
        });
    });
});