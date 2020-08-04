import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateContactsResolver } from './create-contacts.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { BplusItSappiCreateContactInput } from './../../../../graphql';

describe('CreateContactsResolver', () => 
{
    let resolver: CreateContactsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateContactsResolver,
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

        resolver    = module.get<CreateContactsResolver>(CreateContactsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateContactsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateContactsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an contacts created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateContactInput[]>contacts)).toBe(true);
        });
    });
});