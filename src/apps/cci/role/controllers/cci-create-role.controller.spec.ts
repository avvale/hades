import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateRoleController } from './cci-create-role.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/cci/role/infrastructure/seeds/role.seed';

describe('CciCreateRoleController', () => 
{
    let controller: CciCreateRoleController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateRoleController
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

        controller  = module.get<CciCreateRoleController>(CciCreateRoleController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciCreateRoleController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an role created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(roles[0])).toBe(roles[0]);
        });
    });
});