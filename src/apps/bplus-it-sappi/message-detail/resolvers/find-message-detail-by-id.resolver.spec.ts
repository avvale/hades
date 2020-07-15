import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindMessageDetailByIdResolver } from './find-message-detail-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';

describe('FindMessageDetailByIdResolver', () => 
{
    let resolver: FindMessageDetailByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindMessageDetailByIdResolver,
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

        resolver    = module.get<FindMessageDetailByIdResolver>(FindMessageDetailByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindMessageDetailByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindMessageDetailByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an messageDetail by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail[0])));
            expect(await resolver.main(messagesDetail[0].id)).toBe(messagesDetail[0]);
        });
    });
});