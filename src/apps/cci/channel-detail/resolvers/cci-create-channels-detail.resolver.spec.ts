import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateChannelsDetailResolver } from './cci-create-channels-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';
import { CciCreateChannelDetailInput } from './../../../../graphql';

describe('CciCreateChannelsDetailResolver', () =>
{
    let resolver: CciCreateChannelsDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateChannelsDetailResolver,
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

        resolver    = module.get<CciCreateChannelsDetailResolver>(CciCreateChannelsDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateChannelsDetailResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateChannelsDetailResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channelsDetail created', async () =>
        {
            expect(await resolver.main(<CciCreateChannelDetailInput[]>channelsDetail)).toBe(true);
        });
    });
});