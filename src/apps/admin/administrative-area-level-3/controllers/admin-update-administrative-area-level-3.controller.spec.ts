import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAdministrativeAreaLevel3Controller } from './admin-update-administrative-area-level-3.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('AdminUpdateAdministrativeAreaLevel3Controller', () =>
{
    let controller: AdminUpdateAdministrativeAreaLevel3Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminUpdateAdministrativeAreaLevel3Controller
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

        controller  = module.get<AdminUpdateAdministrativeAreaLevel3Controller>(AdminUpdateAdministrativeAreaLevel3Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminUpdateAdministrativeAreaLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel3 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await controller.main(administrativeAreasLevel3[0])).toBe(administrativeAreasLevel3[0]);
        });
    });
});