import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateContactResolver } from './cci-update-contact.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';
import { CciUpdateContactInput } from './../../../../graphql';

describe('CciUpdateContactResolver', () =>
{
    let resolver: CciUpdateContactResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateContactResolver,
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

        resolver    = module.get<CciUpdateContactResolver>(CciUpdateContactResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateContactResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciUpdateContactResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a contact created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts[0])));
            expect(await resolver.main(<CciUpdateContactInput>contacts[0])).toBe(contacts[0]);
        });
    });
});