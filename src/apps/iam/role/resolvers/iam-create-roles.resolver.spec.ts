import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateRolesResolver } from './iam-create-roles.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';
import { IamCreateRoleInput } from './../../../../graphql';

describe('IamCreateRolesResolver', () =>
{
    let resolver: IamCreateRolesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateRolesResolver,
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

        resolver    = module.get<IamCreateRolesResolver>(IamCreateRolesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateRolesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateRolesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an roles created', async () =>
        {
            expect(await resolver.main(<IamCreateRoleInput[]>roles)).toBe(true);
        });
    });
});