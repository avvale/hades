import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteRoleByIdController } from './cci-delete-role-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/cci/role/infrastructure/seeds/role.seed';

describe('CciDeleteRoleByIdController', () => 
{
    let controller: CciDeleteRoleByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciDeleteRoleByIdController
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

        controller  = module.get<CciDeleteRoleByIdController>(CciDeleteRoleByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciDeleteRoleByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an role deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0].id)).toBe(roles[0]);
        });
    });
});