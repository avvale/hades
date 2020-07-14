import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateLangResolver } from './update-lang.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';

describe('UpdateLangResolver', () => 
{
    let resolver: UpdateLangResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateLangResolver,
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

        resolver    = module.get<UpdateLangResolver>(UpdateLangResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateLangResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateLangResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an lang created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(langs[0])).toBe(langs[0]);
        });
    });
});