import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateTagResolver } from './create-tag.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';

describe('CreateTagResolver', () => 
{
    let resolver: CreateTagResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTagResolver,
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

        resolver    = module.get<CreateTagResolver>(CreateTagResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateTagResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateTagResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an tag created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tags[0])));
            expect(await resolver.main(tags[0])).toBe(tags[0]);
        });
    });
});