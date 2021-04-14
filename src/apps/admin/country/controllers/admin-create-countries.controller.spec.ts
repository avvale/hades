import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateCountriesController } from './admin-create-countries.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';

describe('AdminCreateCountriesController', () =>
{
    let controller: AdminCreateCountriesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminCreateCountriesController
            ],
            providers: [
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

        controller  = module.get<AdminCreateCountriesController>(AdminCreateCountriesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminCreateCountriesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an countries created', async () =>
        {
            expect(await controller.main(countries)).toBe(undefined);
        });
    });
});