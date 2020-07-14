import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginatePermissionsResolver } from './paginate-permissions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';

describe('PaginatePermissionsResolver', () => 
{
    let resolver: PaginatePermissionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginatePermissionsResolver,
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

        resolver    = module.get<PaginatePermissionsResolver>(PaginatePermissionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginatePermissionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginatePermissionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a permissions', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions)));
            expect(await resolver.main([], [])).toBe(permissions);
        });
    });
});