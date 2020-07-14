import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteDataLakesResolver } from './delete-data-lakes.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed'

describe('DeleteDataLakesResolver', () => 
{
    let resolver: DeleteDataLakesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteDataLakesResolver,
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

        resolver    = module.get<DeleteDataLakesResolver>(DeleteDataLakesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteDataLakesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteDataLakesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an dataLakes deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes)));
            expect(await resolver.main([])).toBe(dataLakes);
        });
    });
});