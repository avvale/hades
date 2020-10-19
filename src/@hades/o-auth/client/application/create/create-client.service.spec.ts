import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';
import { CreateClientService } from './create-client.service';
import { 
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds
    
} from './../../domain/value-objects';
import { IClientRepository } from './../../domain/client.repository';
import { MockClientRepository } from './../../infrastructure/mock/mock-client.repository';

describe('CreateClientService', () => 
{
    let service: CreateClientService;
    let repository: IClientRepository;
    let mockRepository: MockClientRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateClientService,
                MockClientRepository,
                { 
                    provide: IClientRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateClientService);
        repository      = module.get(IClientRepository);
        mockRepository  = module.get(MockClientRepository);
    });

    describe('main', () => 
    {
        test('CreateClientService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a client and emit event', async () => 
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
                new ClientIsActive(clients[0].isActive),
                new ClientIsMaster(clients[0].isMaster),
                new ClientApplicationIds(clients[0].applicationIds),
                
            )).toBe(undefined);
        });
    });
});