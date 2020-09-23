import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAccessTokenResolver } from './update-access-token.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { OAuthUpdateAccessTokenInput } from './../../../../graphql';

describe('UpdateAccessTokenResolver', () => 
{
    let resolver: UpdateAccessTokenResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAccessTokenResolver,
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

        resolver  = module.get<UpdateAccessTokenResolver>(UpdateAccessTokenResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateAccessTokenResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateAccessTokenResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accessToken created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(<OAuthUpdateAccessTokenInput>accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});