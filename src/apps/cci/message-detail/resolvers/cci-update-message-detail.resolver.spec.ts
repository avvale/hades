import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateMessageDetailResolver } from './cci-update-message-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';
import { CciUpdateMessageDetailInput } from './../../../../graphql';

describe('CciUpdateMessageDetailResolver', () => 
{
    let resolver: CciUpdateMessageDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateMessageDetailResolver,
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

        resolver  = module.get<CciUpdateMessageDetailResolver>(CciUpdateMessageDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateMessageDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciUpdateMessageDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a messageDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail[0])));
            expect(await resolver.main(<CciUpdateMessageDetailInput>messagesDetail[0])).toBe(messagesDetail[0]);
        });
    });
});