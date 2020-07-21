import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateTagResolver } from './update-tag.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { NfcUpdateTagInput } from './../../../../graphql';

describe('UpdateTagResolver', () => 
{
    let resolver: UpdateTagResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateTagResolver,
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

        resolver  = module.get<UpdateTagResolver>(UpdateTagResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateTagResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateTagResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tag created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tags[0])));
            expect(await resolver.main(<NfcUpdateTagInput>tags[0])).toBe(tags[0]);
        });
    });
});