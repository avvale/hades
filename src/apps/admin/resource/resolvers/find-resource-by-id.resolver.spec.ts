import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindResourceByIdResolver } from './find-resource-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';

describe('FindResourceByIdResolver', () => 
{
    let resolver: FindResourceByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindResourceByIdResolver,
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

        resolver    = module.get<FindResourceByIdResolver>(FindResourceByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindResourceByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindResourceByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an resource by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources[0])));
            expect(await resolver.main(resources[0].id)).toBe(resources[0]);
        });
    });
});