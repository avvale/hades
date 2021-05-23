import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateContactsResolver } from './cci-create-contacts.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';
import { CciCreateContactInput } from './../../../../graphql';

describe('CciCreateContactsResolver', () =>
{
    let resolver: CciCreateContactsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateContactsResolver,
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

        resolver    = module.get<CciCreateContactsResolver>(CciCreateContactsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateContactsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateContactsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an contacts created', async () =>
        {
            expect(await resolver.main(<CciCreateContactInput[]>contacts)).toBe(true);
        });
    });
});