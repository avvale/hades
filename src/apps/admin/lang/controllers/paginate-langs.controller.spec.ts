import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateLangsController } from './paginate-langs.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed'

describe('PaginateLangsController', () => 
{
    let controller: PaginateLangsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateLangsController
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

        controller  = module.get<PaginateLangsController>(PaginateLangsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateLangsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateLangsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a langs', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs)));
            expect(await controller.main([], [])).toBe(langs);
        });
    });
});