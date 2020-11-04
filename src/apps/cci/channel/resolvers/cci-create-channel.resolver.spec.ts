import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateChannelResolver } from './cci-create-channel.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { CciCreateChannelInput } from './../../../../graphql';

describe('CciCreateChannelResolver', () =>
{
    let resolver: CciCreateChannelResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateChannelResolver,
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

        resolver    = module.get<CciCreateChannelResolver>(CciCreateChannelResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateChannelResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateChannelResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an channel created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels[0])));
            expect(await resolver.main(<CciCreateChannelInput>channels[0])).toBe(channels[0]);
        });
    });
});