import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateRoleResolver } from './update-role.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/bplus-it-sappi/role/infrastructure/seeds/role.seed'
import { BplusItSappiUpdateRoleInput } from './../../../../../src/graphql';

describe('UpdateRoleResolver', () => 
{
    let resolver: UpdateRoleResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRoleResolver,
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

        resolver  = module.get<UpdateRoleResolver>(UpdateRoleResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateRoleResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateRoleResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a role created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(<BplusItSappiUpdateRoleInput>roles[0])).toBe(roles[0]);
        });
    });
});