import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSystemByIdController } from './find-system-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';

describe('FindSystemByIdController', () => 
{
    let controller: FindSystemByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindSystemByIdController
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

        controller  = module.get<FindSystemByIdController>(FindSystemByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindSystemByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindSystemByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an system by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await controller.main(systems[0].id)).toBe(systems[0]);
        });
    });
});