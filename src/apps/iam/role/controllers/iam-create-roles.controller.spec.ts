import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateRolesController } from './iam-create-roles.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { rolesToCreate } from '@hades/iam/role/infrastructure/seeds/roles-to-create.seed';

describe('IamCreateRolesController', () =>
{
    let controller: IamCreateRolesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateRolesController
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

        controller  = module.get<IamCreateRolesController>(IamCreateRolesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an roles created', async () =>
        {
            expect(await controller.main(rolesToCreate)).toBe(undefined);
        });
    });
});