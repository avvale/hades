import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTagByIdController } from './delete-tag-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';

describe('DeleteTagByIdController', () => 
{
    let controller: DeleteTagByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteTagByIdController
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

        controller  = module.get<DeleteTagByIdController>(DeleteTagByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteTagByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteTagByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an tag deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tags[0])));
            expect(await controller.main(tags[0].id)).toBe(tags[0]);
        });
    });
});