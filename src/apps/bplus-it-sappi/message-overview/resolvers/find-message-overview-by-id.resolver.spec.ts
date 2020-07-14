import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindMessageOverviewByIdResolver } from './find-message-overview-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';

describe('FindMessageOverviewByIdResolver', () => 
{
    let resolver: FindMessageOverviewByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindMessageOverviewByIdResolver,
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

        resolver    = module.get<FindMessageOverviewByIdResolver>(FindMessageOverviewByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindMessageOverviewByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindMessageOverviewByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an messageOverview by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await resolver.main(messagesOverview[0].id)).toBe(messagesOverview[0]);
        });
    });
});