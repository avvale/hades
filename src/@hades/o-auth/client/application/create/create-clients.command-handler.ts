import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientsCommand } from './create-clients.command';
import { CreateClientsService } from './create-clients.service';
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

@CommandHandler(CreateClientsCommand)
export class CreateClientsCommandHandler implements ICommandHandler<CreateClientsCommand>
{
    constructor(
        private readonly createClientsService: CreateClientsService
    ) { }

    async execute(command: CreateClientsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createClientsService.main(
            command.clients
                .map(client => { 
                    return {
                        id: new ClientId(client.id),
                        grantType: new ClientGrantType(client.grantType),
                        name: new ClientName(client.name),
                        secret: new ClientSecret(client.secret),
                        authUrl: new ClientAuthUrl(client.authUrl),
                        redirect: new ClientRedirect(client.redirect),
                        expiredAccessToken: new ClientExpiredAccessToken(client.expiredAccessToken),
                        expiredRefreshToken: new ClientExpiredRefreshToken(client.expiredRefreshToken),
                        isActive: new ClientIsActive(client.isActive),
                        isMaster: new ClientIsMaster(client.isMaster),
                        applicationIds: new ClientApplicationIds(client.applicationIds),
                        
                    }
                })
        );
    }
}