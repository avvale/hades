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
    ClientApplicationCodes,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsRevoked,
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
                        applicationCodes: new ClientApplicationCodes(client.applicationCodes),
                        expiredAccessToken: new ClientExpiredAccessToken(client.expiredAccessToken),
                        expiredRefreshToken: new ClientExpiredRefreshToken(client.expiredRefreshToken),
                        isRevoked: new ClientIsRevoked(client.isRevoked),
                        isMaster: new ClientIsMaster(client.isMaster),
                        applicationIds: new ClientApplicationIds(client.applicationIds),
                        
                    }
                })
        );
    }
}