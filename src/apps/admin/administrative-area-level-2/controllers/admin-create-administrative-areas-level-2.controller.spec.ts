import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAdministrativeAreasLevel2Controller } from './admin-create-administrative-areas-level-2.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('AdminCreateAdministrativeAreasLevel2Controller', () =>
{
    let controller: AdminCreateAdministrativeAreasLevel2Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminCreateAdministrativeAreasLevel2Controller
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

        controller  = module.get<AdminCreateAdministrativeAreasLevel2Controller>(AdminCreateAdministrativeAreasLevel2Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminCreateAdministrativeAreasLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 created', async () =>
        {
            expect(await controller.main(administrativeAreasLevel2)).toBe(undefined);
        });
    });
});