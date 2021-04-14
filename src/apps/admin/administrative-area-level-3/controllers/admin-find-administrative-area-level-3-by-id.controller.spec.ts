import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAdministrativeAreaLevel3ByIdController } from './admin-find-administrative-area-level-3-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel3 } from '@hades/admin/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('AdminFindAdministrativeAreaLevel3ByIdController', () =>
{
    let controller: AdminFindAdministrativeAreaLevel3ByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminFindAdministrativeAreaLevel3ByIdController
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

        controller  = module.get<AdminFindAdministrativeAreaLevel3ByIdController>(AdminFindAdministrativeAreaLevel3ByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminFindAdministrativeAreaLevel3ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await controller.main(administrativeAreasLevel3[0].id)).toBe(administrativeAreasLevel3[0]);
        });
    });
});