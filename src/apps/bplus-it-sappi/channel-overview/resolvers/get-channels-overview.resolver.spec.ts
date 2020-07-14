import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetChannelsOverviewResolver } from './get-channels-overview.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';

describe('GetChannelsOverviewResolver', () => 
{
    let resolver:   GetChannelsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetChannelsOverviewResolver,
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

        resolver    = module.get<GetChannelsOverviewResolver>(GetChannelsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('GetChannelsOverviewResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        it('GetChannelsOverviewResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        it('should return a channelsOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(channelsOverview)));
            expect(await resolver.main([])).toBe(channelsOverview);
        });
    });
});