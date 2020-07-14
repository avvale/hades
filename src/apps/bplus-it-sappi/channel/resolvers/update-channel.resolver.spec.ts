import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateChannelResolver } from './update-channel.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed'
import { BplusItSappiUpdateChannelInput } from './../../../../../src/graphql';

describe('UpdateChannelResolver', () => 
{
    let resolver: UpdateChannelResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateChannelResolver,
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

        resolver  = module.get<UpdateChannelResolver>(UpdateChannelResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateChannelResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateChannelResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a channel created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels[0])));
            expect(await resolver.main(<BplusItSappiUpdateChannelInput>channels[0])).toBe(channels[0]);
        });
    });
});