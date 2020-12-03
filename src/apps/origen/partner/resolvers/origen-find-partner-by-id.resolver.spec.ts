import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenFindPartnerByIdResolver } from './origen-find-partner-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenFindPartnerByIdResolver', () => 
{
    let resolver: OrigenFindPartnerByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrigenFindPartnerByIdResolver,
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

        resolver    = module.get<OrigenFindPartnerByIdResolver>(OrigenFindPartnerByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OrigenFindPartnerByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OrigenFindPartnerByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an partner by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners[0])));
            expect(await resolver.main(partners[0].id)).toBe(partners[0]);
        });
    });
});