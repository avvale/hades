import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindTagByIdController } from './find-tag-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed'

describe('FindTagByIdController', () => 
{
    let controller: FindTagByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindTagByIdController
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

        controller  = module.get<FindTagByIdController>(FindTagByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindTagByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindTagByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an tag by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tags[0])));
            expect(await controller.main(tags[0].id)).toBe(tags[0]);
        });
    });
});