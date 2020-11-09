import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateApplicationsController } from './o-auth-create-applications.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthCreateApplicationsController', () => 
{
    let controller: OAuthCreateApplicationsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthCreateApplicationsController
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

        controller  = module.get<OAuthCreateApplicationsController>(OAuthCreateApplicationsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OAuthCreateApplicationsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an applications created', async () => 
        {
            expect(await controller.main(applications)).toBe(undefined);
        });
    });
});