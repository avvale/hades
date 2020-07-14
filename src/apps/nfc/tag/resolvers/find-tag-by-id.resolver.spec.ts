import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindTagByIdResolver } from './find-tag-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';

describe('FindTagByIdResolver', () => 
{
    let resolver: FindTagByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindTagByIdResolver,
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

        resolver    = module.get<FindTagByIdResolver>(FindTagByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindTagByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindTagByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an tag by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tags[0])));
            expect(await resolver.main(tags[0].id)).toBe(tags[0]);
        });
    });
});