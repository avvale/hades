import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateModuleResolver } from './update-module.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';
import { BplusItSappiUpdateModuleInput } from './../../../../../src/graphql';

describe('UpdateModuleResolver', () => 
{
    let resolver: UpdateModuleResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateModuleResolver,
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

        resolver  = module.get<UpdateModuleResolver>(UpdateModuleResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateModuleResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateModuleResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a module created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules[0])));
            expect(await resolver.main(<BplusItSappiUpdateModuleInput>modules[0])).toBe(modules[0]);
        });
    });
});