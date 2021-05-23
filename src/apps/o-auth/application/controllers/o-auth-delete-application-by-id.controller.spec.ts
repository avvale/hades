import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationByIdController } from './o-auth-delete-application-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthDeleteApplicationByIdController', () =>
{
    let controller: OAuthDeleteApplicationByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthDeleteApplicationByIdController
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

        controller  = module.get<OAuthDeleteApplicationByIdController>(OAuthDeleteApplicationByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0].id)).toBe(applications[0]);
        });
    });
});