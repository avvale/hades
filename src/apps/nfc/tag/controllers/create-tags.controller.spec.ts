import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateTagsController } from './create-tags.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';

describe('CreateTagsController', () => 
{
    let controller: CreateTagsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateTagsController
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

        controller  = module.get<CreateTagsController>(CreateTagsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CreateTagsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an tags created', async () => 
        {
            expect(await controller.main(tags)).toBe(undefined);
        });
    });
});