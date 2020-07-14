import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTagsController } from './delete-tags.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';

describe('DeleteTagsController', () => 
{
    let controller: DeleteTagsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteTagsController
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

        controller  = module.get<DeleteTagsController>(DeleteTagsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteTagsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteTagsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an tags deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tags)));
            expect(await controller.main([])).toBe(tags);
        });
    });
});