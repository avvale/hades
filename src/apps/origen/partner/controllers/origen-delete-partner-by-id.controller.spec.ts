import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenDeletePartnerByIdController } from './origen-delete-partner-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenDeletePartnerByIdController', () => 
{
    let controller: OrigenDeletePartnerByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OrigenDeletePartnerByIdController
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

        controller  = module.get<OrigenDeletePartnerByIdController>(OrigenDeletePartnerByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OrigenDeletePartnerByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an partner deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners[0])));
            expect(await controller.main(partners[0].id)).toBe(partners[0]);
        });
    });
});