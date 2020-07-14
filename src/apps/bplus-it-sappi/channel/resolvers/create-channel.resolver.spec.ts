import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelResolver } from './create-channel.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed';
import { BplusItSappiCreateChannelInput } from './../../../../../src/graphql';

describe('CreateChannelResolver', () => 
{
    let resolver: CreateChannelResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelResolver,
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

        resolver    = module.get<CreateChannelResolver>(CreateChannelResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateChannelResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateChannelResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an channel created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels[0])));
            expect(await resolver.main(<BplusItSappiCreateChannelInput>channels[0])).toBe(channels[0]);
        });
    });
});