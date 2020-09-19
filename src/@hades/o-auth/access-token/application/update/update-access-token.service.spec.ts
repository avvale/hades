import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { UpdateAccessTokenService } from './update-access-token.service';
import { 
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt
    
} from './../../domain/value-objects';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { MockAccessTokenRepository } from './../../infrastructure/mock/mock-access-token.repository';

describe('UpdateAccessTokenService', () => 
{
    let service: UpdateAccessTokenService;
    let repository: IAccessTokenRepository;
    let mockRepository: MockAccessTokenRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAccessTokenService,
                MockAccessTokenRepository,
                { 
                    provide: IAccessTokenRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateAccessTokenService);
        repository      = module.get(IAccessTokenRepository);
        mockRepository  = module.get(MockAccessTokenRepository);
    });

    describe('main', () => 
    {
        test('UpdateAccessTokenService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a accessToken and emit event', async () => 
        {
            expect(await service.main(
                new AccessTokenId(accessTokens[0].id),
                new AccessTokenClientId(accessTokens[0].clientId),
                new AccessTokenToken(accessTokens[0].token),
                new AccessTokenName(accessTokens[0].name),
                new AccessTokenIsRevoked(accessTokens[0].isRevoked),
                new AccessTokenExpiresAt(accessTokens[0].expiresAt),
                
            )).toBe(undefined);
        });
    });
});