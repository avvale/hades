import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateLangController } from './create-lang.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed'

describe('CreateLangController', () => 
{
    let controller: CreateLangController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateLangController
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

        controller  = module.get<CreateLangController>(CreateLangController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateLangController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateLangController should be defined', () => 
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