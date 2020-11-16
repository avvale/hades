import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeletePermissionByIdResolver } from './iam-delete-permission-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';

describe('IamDeletePermissionByIdResolver', () => 
{
    let resolver: IamDeletePermissionByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeletePermissionByIdResolver,
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

        resolver    = module.get<IamDeletePermissionByIdResolver>(IamDeletePermissionByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamDeletePermissionByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('IamDeletePermissionByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permission deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(permissions[0].id)).toBe(permissions[0]);
        });
    });
});