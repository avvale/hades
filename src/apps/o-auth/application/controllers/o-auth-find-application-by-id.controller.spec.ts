import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindApplicationByIdController } from './o-auth-find-application-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthFindApplicationByIdController', () =>
{
    let controller: OAuthFindApplicationByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthFindApplicationByIdController
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

        controller  = module.get<OAuthFindApplicationByIdController>(OAuthFindApplicationByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0].id)).toBe(applications[0]);
        });
    });
});