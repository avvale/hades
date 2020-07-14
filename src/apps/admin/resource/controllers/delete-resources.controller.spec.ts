import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteResourcesController } from './delete-resources.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';

describe('DeleteResourcesController', () => 
{
    let controller: DeleteResourcesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteResourcesController
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

        controller  = module.get<DeleteResourcesController>(DeleteResourcesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteResourcesController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteResourcesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an resources deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources)));
            expect(await controller.main([])).toBe(resources);
        });
    });
});