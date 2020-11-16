import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteRolesResolver } from './iam-delete-roles.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';

describe('IamDeleteRolesResolver', () => 
{
    let resolver: IamDeleteRolesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteRolesResolver,
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

        resolver    = module.get<IamDeleteRolesResolver>(IamDeleteRolesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamDeleteRolesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('IamDeleteRolesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an roles deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await resolver.main()).toBe(roles);
        });
    });
});