// ignored file
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accessTokensToCreate } from '@hades/o-auth/access-token/infrastructure/seeds/access-token-to-create.seed';
import { CreateAccessTokenService } from './create-access-token.service';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenName,
    AccessTokenExpiredAccessToken,
} from './../../domain/value-objects';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { MockAccessTokenRepository } from './../../infrastructure/mock/mock-access-token.repository';

describe('CreateAccessTokenService', () =>
{
    let service: CreateAccessTokenService;
    let repository: IAccessTokenRepository;
    let mockRepository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                MockAccessTokenRepository,
                {
                    provide: IAccessTokenRepository,
                    useValue: {
                        create: (item) => {}
                    }
                },
                {
                    provide: CreateAccessTokenService,
                    useValue: {
                        main: () => {},
                    }
                },
            ]
        }).compile();

        service         = module.get(CreateAccessTokenService);
        repository      = module.get(IAccessTokenRepository);
        mockRepository  = module.get(MockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('CreateAccessTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a accessToken and emit event', async () =>
        {
            expect(await service.main(
                {
                    id                  : new AccessTokenId(accessTokensToCreate[0].id),
                    clientId            : new AccessTokenClientId(accessTokensToCreate[0].clientId),
                    accountId           : new AccessTokenAccountId(accessTokensToCreate[0].accountId),
                    name                : new AccessTokenName(accessTokensToCreate[0].name),
                    expiredAccessToken  : new AccessTokenExpiredAccessToken(accessTokensToCreate[0].expiredAccessToken),
                }
            )).toBe(undefined);
        });
    });
});