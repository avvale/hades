import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteRoleByIdResolver } from './delete-role-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/bplus-it-sappi/role/infrastructure/seeds/role.seed'

describe('DeleteRoleByIdResolver', () => 
{
    let resolver: DeleteRoleByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteRoleByIdResolver,
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

        resolver    = module.get<DeleteRoleByIdResolver>(DeleteRoleByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteRoleByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteRoleByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an role deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(roles[0].id)).toBe(roles[0]);
        });
    });
});