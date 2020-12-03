import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenCreatePartnerController } from './origen-create-partner.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenCreatePartnerController', () => 
{
    let controller: OrigenCreatePartnerController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OrigenCreatePartnerController
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

        controller  = module.get<OrigenCreatePartnerController>(OrigenCreatePartnerController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OrigenCreatePartnerController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an partner created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners[0])));
            expect(await controller.main(partners[0])).toBe(partners[0]);
        });
    });
});