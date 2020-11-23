import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminDeleteAdministrativeAreasLevel1Controller } from './admin-delete-administrative-areas-level-1.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('AdminDeleteAdministrativeAreasLevel1Controller', () => 
{
    let controller: AdminDeleteAdministrativeAreasLevel1Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminDeleteAdministrativeAreasLevel1Controller
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

        controller  = module.get<AdminDeleteAdministrativeAreasLevel1Controller>(AdminDeleteAdministrativeAreasLevel1Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminDeleteAdministrativeAreasLevel1Controller should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1)));
            expect(await controller.main()).toBe(administrativeAreasLevel1);
        });
    });
});