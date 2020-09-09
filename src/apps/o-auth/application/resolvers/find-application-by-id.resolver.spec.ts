import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindApplicationByIdResolver } from './find-application-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('FindApplicationByIdResolver', () => 
{
    let resolver: FindApplicationByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindApplicationByIdResolver,
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

        resolver    = module.get<FindApplicationByIdResolver>(FindApplicationByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('FindApplicationByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('FindApplicationByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(applications[0].id)).toBe(applications[0]);
        });
    });
});