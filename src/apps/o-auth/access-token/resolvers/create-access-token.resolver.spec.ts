import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAccessTokenResolver } from './create-access-token.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { OAuthCreateAccessTokenInput } from './../../../../graphql';

describe('CreateAccessTokenResolver', () => 
{
    let resolver: CreateAccessTokenResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccessTokenResolver,
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

        resolver    = module.get<CreateAccessTokenResolver>(CreateAccessTokenResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateAccessTokenResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateAccessTokenResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessToken created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(<OAuthCreateAccessTokenInput>accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});