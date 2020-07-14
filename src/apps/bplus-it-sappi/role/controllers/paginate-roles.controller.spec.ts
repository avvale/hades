import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateRolesController } from './paginate-roles.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/bplus-it-sappi/role/infrastructure/seeds/role.seed';

describe('PaginateRolesController', () => 
{
    let controller: PaginateRolesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateRolesController
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

        controller  = module.get<PaginateRolesController>(PaginateRolesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateRolesController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateRolesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a roles', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await controller.main([], [])).toBe(roles);
        });
    });
});