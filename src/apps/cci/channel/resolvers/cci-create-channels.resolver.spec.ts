import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateChannelsResolver } from './cci-create-channels.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { CciCreateChannelInput } from './../../../../graphql';

describe('CciCreateChannelsResolver', () =>
{
    let resolver: CciCreateChannelsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateChannelsResolver,
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

        resolver    = module.get<CciCreateChannelsResolver>(CciCreateChannelsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateChannelsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateChannelsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channels created', async () =>
        {
            expect(await resolver.main(<CciCreateChannelInput[]>channels)).toBe(true);
        });
    });
});