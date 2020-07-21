import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateTagsResolver } from './create-tags.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { NfcCreateTagInput } from './../../../../graphql';

describe('CreateTagsResolver', () => 
{
    let resolver: CreateTagsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTagsResolver,
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

        resolver    = module.get<CreateTagsResolver>(CreateTagsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateTagsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateTagsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tags created', async () => 
        {
            expect(await resolver.main(<NfcCreateTagInput[]>tags)).toBe(true);
        });
    });
});