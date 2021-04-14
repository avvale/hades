import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminUpdateAdministrativeAreaLevel1Controller } from './admin-update-administrative-area-level-1.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel1 } from '@hades/admin/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('AdminUpdateAdministrativeAreaLevel1Controller', () =>
{
    let controller: AdminUpdateAdministrativeAreaLevel1Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminUpdateAdministrativeAreaLevel1Controller
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

        controller  = module.get<AdminUpdateAdministrativeAreaLevel1Controller>(AdminUpdateAdministrativeAreaLevel1Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminUpdateAdministrativeAreaLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel1 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main(administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});