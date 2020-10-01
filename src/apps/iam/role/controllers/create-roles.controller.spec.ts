import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateRolesController } from './create-roles.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';

describe('CreateRolesController', () => 
{
    let controller: CreateRolesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateRolesController
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

        controller  = module.get<CreateRolesController>(CreateRolesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CreateRolesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an roles created', async () => 
        {
            expect(await controller.main(roles)).toBe(undefined);
        });
    });
});