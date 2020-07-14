import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateModuleResolver } from './create-module.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed'
import { BplusItSappiCreateModuleInput } from './../../../../../src/graphql';

describe('CreateModuleResolver', () => 
{
    let resolver: CreateModuleResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateModuleResolver,
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

        resolver    = module.get<CreateModuleResolver>(CreateModuleResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateModuleResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateModuleResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an module created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules[0])));
            expect(await resolver.main(<BplusItSappiCreateModuleInput>modules[0])).toBe(modules[0]);
        });
    });
});