import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteDataLakesResolver } from './cci-delete-data-lakes.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';

describe('CciDeleteDataLakesResolver', () =>
{
    let resolver: CciDeleteDataLakesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciDeleteDataLakesResolver,
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

        resolver    = module.get<CciDeleteDataLakesResolver>(CciDeleteDataLakesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciDeleteDataLakesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciDeleteDataLakesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an dataLakes deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes)));
            expect(await resolver.main()).toBe(dataLakes);
        });
    });
});