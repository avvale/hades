import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertContactsResolver } from './insert-contacts.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { BplusItSappiCreateContactInput } from './../../../../../src/graphql';

describe('InsertContactsResolver', () => 
{
    let resolver: InsertContactsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertContactsResolver,
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

        resolver    = module.get<InsertContactsResolver>(InsertContactsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertContactsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertContactsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an contacts created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateContactInput[]>contacts)).toBe(true);
        });
    });
});