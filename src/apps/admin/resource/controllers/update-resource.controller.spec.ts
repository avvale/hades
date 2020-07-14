import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateResourceController } from './update-resource.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';

describe('UpdateResourceController', () => 
{
    let controller: UpdateResourceController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateResourceController
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

        controller  = module.get<UpdateResourceController>(UpdateResourceController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateResourceController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateResourceController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a resource created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources[0])));
            expect(await controller.main(resources[0])).toBe(resources[0]);
        });
    });
});