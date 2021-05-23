import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateModulesController } from './cci-create-modules.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';

describe('CciCreateModulesController', () =>
{
    let controller: CciCreateModulesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateModulesController
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

        controller  = module.get<CciCreateModulesController>(CciCreateModulesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciCreateModulesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an modules created', async () =>
        {
            expect(await controller.main(modules)).toBe(undefined);
        });
    });
});