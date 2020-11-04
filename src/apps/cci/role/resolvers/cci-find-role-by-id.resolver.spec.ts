import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindRoleByIdResolver } from './cci-find-role-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/cci/role/infrastructure/seeds/role.seed';

describe('CciFindRoleByIdResolver', () => 
{
    let resolver: CciFindRoleByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindRoleByIdResolver,
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

        resolver    = module.get<CciFindRoleByIdResolver>(CciFindRoleByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindRoleByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciFindRoleByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an role by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(roles[0].id)).toBe(roles[0]);
        });
    });
});