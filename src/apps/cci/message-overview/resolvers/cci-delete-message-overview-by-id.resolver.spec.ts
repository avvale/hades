import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteMessageOverviewByIdResolver } from './cci-delete-message-overview-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';

describe('CciDeleteMessageOverviewByIdResolver', () =>
{
    let resolver: CciDeleteMessageOverviewByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciDeleteMessageOverviewByIdResolver,
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

        resolver    = module.get<CciDeleteMessageOverviewByIdResolver>(CciDeleteMessageOverviewByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciDeleteMessageOverviewByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciDeleteMessageOverviewByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messageOverview deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await resolver.main(messagesOverview[0].id)).toBe(messagesOverview[0]);
        });
    });
});