import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateRolesResolver } from './cci-create-roles.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/cci/role/infrastructure/seeds/role.seed';
import { CciCreateRoleInput } from './../../../../graphql';

describe('CciCreateRolesResolver', () => 
{
    let resolver: CciCreateRolesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateRolesResolver,
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

        resolver    = module.get<CciCreateRolesResolver>(CciCreateRolesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateRolesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateRolesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an roles created', async () => 
        {
            expect(await resolver.main(<CciCreateRoleInput[]>roles)).toBe(true);
        });
    });
});