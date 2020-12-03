import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminPaginateAdministrativeAreasLevel2Controller } from './admin-paginate-administrative-areas-level-2.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('AdminPaginateAdministrativeAreasLevel2Controller', () => 
{
    let controller: AdminPaginateAdministrativeAreasLevel2Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminPaginateAdministrativeAreasLevel2Controller
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

        controller  = module.get<AdminPaginateAdministrativeAreasLevel2Controller>(AdminPaginateAdministrativeAreasLevel2Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminPaginateAdministrativeAreasLevel2Controller should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel2', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2)));
            expect(await controller.main()).toBe(administrativeAreasLevel2);
        });
    });
});