import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelByIdResolver } from './delete-channel-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed';

describe('DeleteChannelByIdResolver', () => 
{
    let resolver: DeleteChannelByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteChannelByIdResolver,
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

        resolver    = module.get<DeleteChannelByIdResolver>(DeleteChannelByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteChannelByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteChannelByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an channel deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channels[0])));
            expect(await resolver.main(channels[0].id)).toBe(channels[0]);
        });
    });
});