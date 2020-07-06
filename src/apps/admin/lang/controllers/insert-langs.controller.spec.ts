import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertLangsController } from './insert-langs.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed'

describe('InsertLangsController', () => 
{
    let controller: InsertLangsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertLangsController
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

        controller  = module.get<InsertLangsController>(InsertLangsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertLangsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertLangsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an lang created', async () => 
        {
            expect(await controller.main(langs)).toBe(undefined);
        });
    });
});