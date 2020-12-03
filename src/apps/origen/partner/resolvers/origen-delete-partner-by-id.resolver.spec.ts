import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenDeletePartnerByIdResolver } from './origen-delete-partner-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenDeletePartnerByIdResolver', () => 
{
    let resolver: OrigenDeletePartnerByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrigenDeletePartnerByIdResolver,
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

        resolver    = module.get<OrigenDeletePartnerByIdResolver>(OrigenDeletePartnerByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OrigenDeletePartnerByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OrigenDeletePartnerByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an partner deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners[0])));
            expect(await resolver.main(partners[0].id)).toBe(partners[0]);
        });
    });
});