import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateApplicationController } from './update-application.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('UpdateApplicationController', () => 
{
    let controller: UpdateApplicationController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateApplicationController
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

        controller  = module.get<UpdateApplicationController>(UpdateApplicationController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('UpdateApplicationController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a application created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0])).toBe(applications[0]);
        });
    });
});