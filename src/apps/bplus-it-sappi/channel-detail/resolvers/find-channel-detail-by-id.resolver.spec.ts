import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindChannelDetailByIdResolver } from './find-channel-detail-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';

describe('FindChannelDetailByIdResolver', () => 
{
    let resolver: FindChannelDetailByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindChannelDetailByIdResolver,
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

        resolver    = module.get<FindChannelDetailByIdResolver>(FindChannelDetailByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindChannelDetailByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindChannelDetailByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an channelDetail by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsDetail[0])));
            expect(await resolver.main(channelsDetail[0].id)).toBe(channelsDetail[0]);
        });
    });
});