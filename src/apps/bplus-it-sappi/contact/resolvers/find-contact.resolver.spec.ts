import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindContactResolver } from './find-contact.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';

describe('FindContactResolver', () => 
{
    let resolver: FindContactResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindContactResolver,
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

        resolver    = module.get<FindContactResolver>(FindContactResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindContactResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindContactResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a contact', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(contacts[0])));
            expect(await resolver.main([])).toBe(contacts[0]);
        });
    });
});