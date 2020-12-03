import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenGetPartnersController } from './origen-get-partners.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenGetPartnersController', () => 
{
    let controller: OrigenGetPartnersController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OrigenGetPartnersController
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

        controller  = module.get<OrigenGetPartnersController>(OrigenGetPartnersController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OrigenGetPartnersController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a partners', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners)));
            expect(await controller.main()).toBe(partners);
        });
    });
});