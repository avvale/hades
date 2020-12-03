import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenCreatePartnersResolver } from './origen-create-partners.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { OrigenCreatePartnerInput } from './../../../../graphql';

describe('OrigenCreatePartnersResolver', () => 
{
    let resolver: OrigenCreatePartnersResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrigenCreatePartnersResolver,
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

        resolver    = module.get<OrigenCreatePartnersResolver>(OrigenCreatePartnersResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OrigenCreatePartnersResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OrigenCreatePartnersResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an partners created', async () => 
        {
            expect(await resolver.main(<OrigenCreatePartnerInput[]>partners)).toBe(true);
        });
    });
});