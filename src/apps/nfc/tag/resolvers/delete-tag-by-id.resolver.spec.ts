import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTagByIdResolver } from './delete-tag-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed'

describe('DeleteTagByIdResolver', () => 
{
    let resolver: DeleteTagByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteTagByIdResolver,
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

        resolver    = module.get<DeleteTagByIdResolver>(DeleteTagByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteTagByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteTagByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an tag deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tags[0])));
            expect(await resolver.main(tags[0].id)).toBe(tags[0]);
        });
    });
});