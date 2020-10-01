import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';
import { UpdateClientService } from './update-client.service';
import { 
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsRevoked,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt
    
} from './../../domain/value-objects';
import { IClientRepository } from './../../domain/client.repository';
import { MockClientRepository } from './../../infrastructure/mock/mock-client.repository';

describe('UpdateClientService', () => 
{
    let service: UpdateClientService;
    let repository: IClientRepository;
    let mockRepository: MockClientRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateClientService,
                MockClientRepository,
                { 
                    provide: IClientRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateClientService);
        repository      = module.get(IClientRepository);
        mockRepository  = module.get(MockClientRepository);
    });

    describe('main', () => 
    {
        test('UpdateClientService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a client and emit event', async () => 
        {
            expect(await service.main(
                new ClientId(clients[0].id),
                new ClientGrantType(clients[0].grantType),
                new ClientName(clients[0].name),
                new ClientSecret(clients[0].secret),
                new ClientAuthUrl(clients[0].authUrl),
                new ClientRedirect(clients[0].redirect),
                new ClientExpiredAccessToken(clients[0].expiredAccessToken),
                new ClientExpiredRefreshToken(clients[0].expiredRefreshToken),
                new ClientIsRevoked(clients[0].isRevoked),
                new ClientIsMaster(clients[0].isMaster),
                new ClientApplicationIds(clients[0].applicationIds),
                
            )).toBe(undefined);
        });
    });
});