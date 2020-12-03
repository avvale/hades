import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenUpdatePartnerController } from './origen-update-partner.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenUpdatePartnerController', () => 
{
    let controller: OrigenUpdatePartnerController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OrigenUpdatePartnerController
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

        controller  = module.get<OrigenUpdatePartnerController>(OrigenUpdatePartnerController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OrigenUpdatePartnerController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a partner created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners[0])));
            expect(await controller.main(partners[0])).toBe(partners[0]);
        });
    });
});