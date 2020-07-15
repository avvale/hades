import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateChannelDetailResolver } from './update-channel-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { BplusItSappiUpdateChannelDetailInput } from './../../../../../src/graphql';

describe('UpdateChannelDetailResolver', () => 
{
    let resolver: UpdateChannelDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateChannelDetailResolver,
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

        resolver  = module.get<UpdateChannelDetailResolver>(UpdateChannelDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateChannelDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateChannelDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a channelDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsDetail[0])));
            expect(await resolver.main(<BplusItSappiUpdateChannelDetailInput>channelsDetail[0])).toBe(channelsDetail[0]);
        });
    });
});