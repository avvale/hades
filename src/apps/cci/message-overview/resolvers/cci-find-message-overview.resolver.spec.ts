import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindMessageOverviewResolver } from './cci-find-message-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';

describe('CciFindMessageOverviewResolver', () => 
{
    let resolver: CciFindMessageOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindMessageOverviewResolver,
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

        resolver    = module.get<CciFindMessageOverviewResolver>(CciFindMessageOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindMessageOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciFindMessageOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a messageOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await resolver.main()).toBe(messagesOverview[0]);
        });
    });
});