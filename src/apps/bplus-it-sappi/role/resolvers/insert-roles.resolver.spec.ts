import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertRolesResolver } from './insert-roles.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/bplus-it-sappi/role/infrastructure/seeds/role.seed';
import { BplusItSappiCreateRoleInput } from './../../../../../src/graphql';

describe('InsertRolesResolver', () => 
{
    let resolver: InsertRolesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertRolesResolver,
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

        resolver    = module.get<InsertRolesResolver>(InsertRolesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertRolesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertRolesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an roles created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateRoleInput[]>roles)).toBe(true);
        });
    });
});