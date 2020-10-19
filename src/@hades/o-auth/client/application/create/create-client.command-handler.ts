import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from './create-client.command';
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

@CommandHandler(CreateClientCommand)
export class CreateClientCommandHandler implements ICommandHandler<CreateClientCommand>
{
    constructor(
        private readonly createClientService: CreateClientService
    ) { }

    async execute(command: CreateClientCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createClientService.main(
            new ClientId(command.id),
            new ClientGrantType(command.grantType),
            new ClientName(command.name),
            new ClientSecret(command.secret),
            new ClientAuthUrl(command.authUrl),
            new ClientRedirect(command.redirect),
            new ClientExpiredAccessToken(command.expiredAccessToken),
            new ClientExpiredRefreshToken(command.expiredRefreshToken),
            new ClientIsActive(command.isActive),
            new ClientIsMaster(command.isMaster),
            new ClientApplicationIds(command.applicationIds),
        );
    }
}