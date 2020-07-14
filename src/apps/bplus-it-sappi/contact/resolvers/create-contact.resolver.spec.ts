import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateContactResolver } from './create-contact.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { BplusItSappiCreateContactInput } from './../../../../../src/graphql';

describe('CreateContactResolver', () => 
{
    let resolver: CreateContactResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateContactResolver,
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

        resolver    = module.get<CreateContactResolver>(CreateContactResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateContactResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateContactResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an contact created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts[0])));
            expect(await resolver.main(<BplusItSappiCreateContactInput>contacts[0])).toBe(contacts[0]);
        });
    });
});