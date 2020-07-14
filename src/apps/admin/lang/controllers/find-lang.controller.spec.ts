import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindLangController } from './find-lang.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';

describe('FindLangController', () => 
{
    let controller: FindLangController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindLangController
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

        controller  = module.get<FindLangController>(FindLangController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindLangController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindLangController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a lang', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await controller.main([])).toBe(langs[0]);
        });
    });
});