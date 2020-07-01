import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteLangByIdController } from './delete-lang-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed'

describe('DeleteLangByIdController', () => 
{
    let controller: DeleteLangByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteLangByIdController
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

        controller  = module.get<DeleteLangByIdController>(DeleteLangByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteLangByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteLangByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an lang deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await controller.main(langs[0].id)).toBe(langs[0]);
        });
    });
});