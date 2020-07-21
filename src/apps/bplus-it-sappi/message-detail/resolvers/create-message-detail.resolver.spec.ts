import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateMessageDetailResolver } from './create-message-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';
import { BplusItSappiCreateMessageDetailInput } from './../../../../graphql';

describe('CreateMessageDetailResolver', () => 
{
    let resolver: CreateMessageDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateMessageDetailResolver,
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

        resolver    = module.get<CreateMessageDetailResolver>(CreateMessageDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateMessageDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateMessageDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messageDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail[0])));
            expect(await resolver.main(<BplusItSappiCreateMessageDetailInput>messagesDetail[0])).toBe(messagesDetail[0]);
        });
    });
});