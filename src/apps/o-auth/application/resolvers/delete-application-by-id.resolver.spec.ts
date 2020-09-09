import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteApplicationByIdResolver } from './delete-application-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('DeleteApplicationByIdResolver', () => 
{
    let resolver: DeleteApplicationByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteApplicationByIdResolver,
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

        resolver    = module.get<DeleteApplicationByIdResolver>(DeleteApplicationByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('DeleteApplicationByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('DeleteApplicationByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(applications[0].id)).toBe(applications[0]);
        });
    });
});