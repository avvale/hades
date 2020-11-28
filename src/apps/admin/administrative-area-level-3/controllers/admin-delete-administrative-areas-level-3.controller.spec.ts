import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAdministrativeAreasLevel3Controller } from './admin-delete-administrative-areas-level-3.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('AdminDeleteAdministrativeAreasLevel3Controller', () => 
{
    let controller: AdminDeleteAdministrativeAreasLevel3Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminDeleteAdministrativeAreasLevel3Controller
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

        controller  = module.get<AdminDeleteAdministrativeAreasLevel3Controller>(AdminDeleteAdministrativeAreasLevel3Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminDeleteAdministrativeAreasLevel3Controller should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3)));
            expect(await controller.main()).toBe(administrativeAreasLevel3);
        });
    });
});