import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindPermissionResolver } from './find-permission.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';

describe('FindPermissionResolver', () => 
{
    let resolver: FindPermissionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindPermissionResolver,
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

        resolver    = module.get<FindPermissionResolver>(FindPermissionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindPermissionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindPermissionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a permission', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main([])).toBe(permissions[0]);
        });
    });
});