import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateMessageOverviewResolver } from './update-message-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';
import { BplusItSappiUpdateMessageOverviewInput } from './../../../../graphql';

describe('UpdateMessageOverviewResolver', () => 
{
    let resolver: UpdateMessageOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateMessageOverviewResolver,
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

        resolver  = module.get<UpdateMessageOverviewResolver>(UpdateMessageOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateMessageOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateMessageOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a messageOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await resolver.main(<BplusItSappiUpdateMessageOverviewInput>messagesOverview[0])).toBe(messagesOverview[0]);
        });
    });
});