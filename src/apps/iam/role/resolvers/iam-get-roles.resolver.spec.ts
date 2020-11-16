import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetRolesResolver } from './iam-get-roles.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';

describe('IamGetRolesResolver', () => 
{
    let resolver:   IamGetRolesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetRolesResolver,
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

        resolver    = module.get<IamGetRolesResolver>(IamGetRolesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamGetRolesResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('IamGetRolesResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a roles', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await resolver.main()).toBe(roles);
        });
    });
});