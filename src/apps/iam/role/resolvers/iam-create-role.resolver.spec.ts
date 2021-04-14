import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateRoleResolver } from './iam-create-role.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';
import { IamCreateRoleInput } from './../../../../graphql';

describe('IamCreateRoleResolver', () =>
{
    let resolver: IamCreateRoleResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateRoleResolver,
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

        resolver    = module.get<IamCreateRoleResolver>(IamCreateRoleResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateRoleResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateRoleResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an role created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(<IamCreateRoleInput>roles[0])).toBe(roles[0]);
        });
    });
});