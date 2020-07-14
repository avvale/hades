import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateLangController } from './update-lang.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';

describe('UpdateLangController', () => 
{
    let controller: UpdateLangController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateLangController
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

        controller  = module.get<UpdateLangController>(UpdateLangController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateLangController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateLangController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an lang created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await controller.main(langs[0])).toBe(langs[0]);
        });
    });
});