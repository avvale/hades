import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelsResolver } from './create-channels.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed';
import { BplusItSappiCreateChannelInput } from './../../../../../src/graphql';

describe('CreateChannelsResolver', () => 
{
    let resolver: CreateChannelsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelsResolver,
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

        resolver    = module.get<CreateChannelsResolver>(CreateChannelsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateChannelsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateChannelsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channels created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateChannelInput[]>channels)).toBe(true);
        });
    });
});