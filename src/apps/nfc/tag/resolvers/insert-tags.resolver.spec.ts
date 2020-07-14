import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertTagsResolver } from './insert-tags.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';

describe('InsertTagsResolver', () => 
{
    let resolver: InsertTagsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertTagsResolver,
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

        resolver    = module.get<InsertTagsResolver>(InsertTagsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertTagsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertTagsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an tags created', async () => 
        {
            expect(await resolver.main(tags)).toBe(true);
        });
    });
});