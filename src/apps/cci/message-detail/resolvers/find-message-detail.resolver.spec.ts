import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindMessageDetailResolver } from './find-message-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';

describe('FindMessageDetailResolver', () => 
{
    let resolver: FindMessageDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindMessageDetailResolver,
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

        resolver    = module.get<FindMessageDetailResolver>(FindMessageDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('FindMessageDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('FindMessageDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a messageDetail', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail[0])));
            expect(await resolver.main()).toBe(messagesDetail[0]);
        });
    });
});