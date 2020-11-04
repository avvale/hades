import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateMessageOverviewResolver } from './cci-create-message-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { CciCreateMessageOverviewInput } from './../../../../graphql';

describe('CciCreateMessageOverviewResolver', () =>
{
    let resolver: CciCreateMessageOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateMessageOverviewResolver,
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

        resolver    = module.get<CciCreateMessageOverviewResolver>(CciCreateMessageOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateMessageOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateMessageOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messageOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await resolver.main(<CciCreateMessageOverviewInput>messagesOverview[0])).toBe(messagesOverview[0]);
        });
    });
});