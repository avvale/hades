import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteBoundedContextByIdController } from './delete-bounded-context-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('DeleteBoundedContextByIdController', () => 
{
    let controller: DeleteBoundedContextByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteBoundedContextByIdController
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

        controller  = module.get<DeleteBoundedContextByIdController>(DeleteBoundedContextByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteBoundedContextByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteBoundedContextByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an boundedContext deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await controller.main(boundedContexts[0].id)).toBe(boundedContexts[0]);
        });
    });
});