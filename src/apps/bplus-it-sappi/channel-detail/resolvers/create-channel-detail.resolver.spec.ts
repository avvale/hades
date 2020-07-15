import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelDetailResolver } from './create-channel-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { BplusItSappiCreateChannelDetailInput } from './../../../../../src/graphql';

describe('CreateChannelDetailResolver', () => 
{
    let resolver: CreateChannelDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelDetailResolver,
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

        resolver    = module.get<CreateChannelDetailResolver>(CreateChannelDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateChannelDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateChannelDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an channelDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsDetail[0])));
            expect(await resolver.main(<BplusItSappiCreateChannelDetailInput>channelsDetail[0])).toBe(channelsDetail[0]);
        });
    });
});