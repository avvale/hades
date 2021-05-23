import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindContactByIdResolver } from './cci-find-contact-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';

describe('CciFindContactByIdResolver', () =>
{
    let resolver: CciFindContactByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindContactByIdResolver,
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

        resolver    = module.get<CciFindContactByIdResolver>(CciFindContactByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindContactByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciFindContactByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an contact by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts[0])));
            expect(await resolver.main(contacts[0].id)).toBe(contacts[0]);
        });
    });
});