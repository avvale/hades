import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateMessageDetailResolver } from './cci-create-message-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';
import { CciCreateMessageDetailInput } from './../../../../graphql';

describe('CciCreateMessageDetailResolver', () =>
{
    let resolver: CciCreateMessageDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateMessageDetailResolver,
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

        resolver    = module.get<CciCreateMessageDetailResolver>(CciCreateMessageDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateMessageDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateMessageDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messageDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail[0])));
            expect(await resolver.main(<CciCreateMessageDetailInput>messagesDetail[0])).toBe(messagesDetail[0]);
        });
    });
});