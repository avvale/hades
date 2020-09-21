import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClientCommand } from './update-client.command';
import { UpdateClientService } from './update-client.service';
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

@CommandHandler(UpdateClientCommand)
export class UpdateClientCommandHandler implements ICommandHandler<UpdateClientCommand>
{
    constructor(
        private readonly updateClientService: UpdateClientService
    ) { }

    async execute(command: UpdateClientCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateClientService.main(
            new ClientId(command.id),
            new ClientGrantType(command.grantType, { undefinable: true }),
            new ClientName(command.name, { undefinable: true }),
            new ClientSecret(command.secret, { undefinable: true }),
            new ClientAuthUrl(command.authUrl),
            new ClientRedirect(command.redirect),
            new ClientApplicationCodes(command.applicationCodes, { undefinable: true }),
            new ClientExpiredAccessToken(command.expiredAccessToken),
            new ClientExpiredRefreshToken(command.expiredRefreshToken),
            new ClientIsRevoked(command.isRevoked, { undefinable: true }),
            new ClientIsMaster(command.isMaster, { undefinable: true }),
            new ClientApplicationIds(command.applicationIds),
            
        )
    }
}