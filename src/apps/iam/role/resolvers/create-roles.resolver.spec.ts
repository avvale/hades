import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateRolesResolver } from './create-roles.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';
import { IamCreateRoleInput } from './../../../../graphql';

describe('CreateRolesResolver', () => 
{
    let resolver: CreateRolesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRolesResolver,
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

        resolver    = module.get<CreateRolesResolver>(CreateRolesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateRolesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateRolesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an roles created', async () => 
        {
            expect(await resolver.main(<IamCreateRoleInput[]>roles)).toBe(true);
        });
    });
});