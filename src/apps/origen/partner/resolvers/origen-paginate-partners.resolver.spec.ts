import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenPaginatePartnersResolver } from './origen-paginate-partners.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenPaginatePartnersResolver', () => 
{
    let resolver: OrigenPaginatePartnersResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrigenPaginatePartnersResolver,
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

        resolver    = module.get<OrigenPaginatePartnersResolver>(OrigenPaginatePartnersResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OrigenPaginatePartnersResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OrigenPaginatePartnersResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a partners', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners)));
            expect(await resolver.main()).toBe(partners);
        });
    });
});