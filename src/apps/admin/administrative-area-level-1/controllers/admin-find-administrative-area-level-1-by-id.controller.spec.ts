import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminFindAdministrativeAreaLevel1ByIdController } from './admin-find-administrative-area-level-1-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('AdminFindAdministrativeAreaLevel1ByIdController', () =>
{
    let controller: AdminFindAdministrativeAreaLevel1ByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminFindAdministrativeAreaLevel1ByIdController
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

        controller  = module.get<AdminFindAdministrativeAreaLevel1ByIdController>(AdminFindAdministrativeAreaLevel1ByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminFindAdministrativeAreaLevel1ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main(administrativeAreasLevel1[0].id)).toBe(administrativeAreasLevel1[0]);
        });
    });
});