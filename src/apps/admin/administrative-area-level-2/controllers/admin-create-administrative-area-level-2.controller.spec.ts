import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateAdministrativeAreaLevel2Controller } from './admin-create-administrative-area-level-2.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('AdminCreateAdministrativeAreaLevel2Controller', () => 
{
    let controller: AdminCreateAdministrativeAreaLevel2Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminCreateAdministrativeAreaLevel2Controller
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

        controller  = module.get<AdminCreateAdministrativeAreaLevel2Controller>(AdminCreateAdministrativeAreaLevel2Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminCreateAdministrativeAreaLevel2Controller should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await controller.main(administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});