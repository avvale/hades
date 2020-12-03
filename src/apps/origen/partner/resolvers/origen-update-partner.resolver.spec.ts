import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenUpdatePartnerResolver } from './origen-update-partner.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { OrigenUpdatePartnerInput } from './../../../../graphql';

describe('OrigenUpdatePartnerResolver', () => 
{
    let resolver: OrigenUpdatePartnerResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrigenUpdatePartnerResolver,
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

        resolver  = module.get<OrigenUpdatePartnerResolver>(OrigenUpdatePartnerResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OrigenUpdatePartnerResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OrigenUpdatePartnerResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a partner created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners[0])));
            expect(await resolver.main(<OrigenUpdatePartnerInput>partners[0])).toBe(partners[0]);
        });
    });
});