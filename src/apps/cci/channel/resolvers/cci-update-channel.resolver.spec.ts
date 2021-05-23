import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateChannelResolver } from './cci-update-channel.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { CciUpdateChannelInput } from './../../../../graphql';

describe('CciUpdateChannelResolver', () =>
{
    let resolver: CciUpdateChannelResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateChannelResolver,
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

        resolver    = module.get<CciUpdateChannelResolver>(CciUpdateChannelResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateChannelResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciUpdateChannelResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a channel created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels[0])));
            expect(await resolver.main(<CciUpdateChannelInput>channels[0])).toBe(channels[0]);
        });
    });
});