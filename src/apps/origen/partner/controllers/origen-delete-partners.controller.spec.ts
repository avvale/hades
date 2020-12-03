import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenDeletePartnersController } from './origen-delete-partners.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenDeletePartnersController', () => 
{
    let controller: OrigenDeletePartnersController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OrigenDeletePartnersController
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

        controller  = module.get<OrigenDeletePartnersController>(OrigenDeletePartnersController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OrigenDeletePartnersController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an partners deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners)));
            expect(await controller.main()).toBe(partners);
        });
    });
});