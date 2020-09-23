import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { UpdateRefreshTokenService } from './update-refresh-token.service';
import { 
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt
    
} from './../../domain/value-objects';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { MockRefreshTokenRepository } from './../../infrastructure/mock/mock-refresh-token.repository';

describe('UpdateRefreshTokenService', () => 
{
    let service: UpdateRefreshTokenService;
    let repository: IRefreshTokenRepository;
    let mockRepository: MockRefreshTokenRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateRefreshTokenService,
                MockRefreshTokenRepository,
                { 
                    provide: IRefreshTokenRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateRefreshTokenService);
        repository      = module.get(IRefreshTokenRepository);
        mockRepository  = module.get(MockRefreshTokenRepository);
    });

    describe('main', () => 
    {
        test('UpdateRefreshTokenService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a refreshToken and emit event', async () => 
        {
            expect(await service.main(
                new RefreshTokenId(refreshTokens[0].id),
                new RefreshTokenAccessTokenId(refreshTokens[0].accessTokenId),
                new RefreshTokenToken(refreshTokens[0].token),
                new RefreshTokenIsRevoked(refreshTokens[0].isRevoked),
                new RefreshTokenExpiresAt(refreshTokens[0].expiresAt),
                
            )).toBe(undefined);
        });
    });
});