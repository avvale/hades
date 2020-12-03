import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenCreatePartnersController } from './origen-create-partners.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenCreatePartnersController', () => 
{
    let controller: OrigenCreatePartnersController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OrigenCreatePartnersController
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

        controller  = module.get<OrigenCreatePartnersController>(OrigenCreatePartnersController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OrigenCreatePartnersController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an partners created', async () => 
        {
            expect(await controller.main(partners)).toBe(undefined);
        });
    });
});