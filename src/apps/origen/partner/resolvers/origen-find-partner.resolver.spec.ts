import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OrigenFindPartnerResolver } from './origen-find-partner.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';

describe('OrigenFindPartnerResolver', () => 
{
    let resolver: OrigenFindPartnerResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrigenFindPartnerResolver,
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

        resolver    = module.get<OrigenFindPartnerResolver>(OrigenFindPartnerResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OrigenFindPartnerResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OrigenFindPartnerResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a partner', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(partners[0])));
            expect(await resolver.main()).toBe(partners[0]);
        });
    });
});