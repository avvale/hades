import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciPaginateRolesResolver } from './cci-paginate-roles.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/cci/role/infrastructure/seeds/role.seed';

describe('CciPaginateRolesResolver', () => 
{
    let resolver: CciPaginateRolesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciPaginateRolesResolver,
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

        resolver    = module.get<CciPaginateRolesResolver>(CciPaginateRolesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciPaginateRolesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciPaginateRolesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a roles', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await resolver.main()).toBe(roles);
        });
    });
});