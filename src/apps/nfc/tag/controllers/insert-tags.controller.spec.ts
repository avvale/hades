import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertTagsController } from './insert-tags.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed'

describe('InsertTagsController', () => 
{
    let controller: InsertTagsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertTagsController
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

        controller  = module.get<InsertTagsController>(InsertTagsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertTagsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertTagsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an tags created', async () => 
        {
            expect(await controller.main(tags)).toBe(undefined);
        });
    });
});