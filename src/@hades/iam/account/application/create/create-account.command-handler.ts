import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { CreateAccountService } from './create-account.service';
import { 
    AccountId,
    AccountType,
    AccountName,
    AccountIsActive,
    AccountClientId,
    AccountApplicationCodes,
    AccountPermissions,
    AccountData,
    AccountRoleIds,
    AccountTenantIds
    
} from './../../domain/value-objects';

@CommandHandler(CreateAccountCommand)
export class CreateAccountCommandHandler implements ICommandHandler<CreateAccountCommand>
{
    constructor(
        private readonly createAccountService: CreateAccountService
    ) { }

    async execute(command: CreateAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccountService.main(
            new AccountId(command.id),
            new AccountType(command.type),
            new AccountName(command.name),
            new AccountIsActive(command.isActive),
            new AccountClientId(command.clientId),
            new AccountApplicationCodes(command.applicationCodes),
            new AccountPermissions(command.permissions),
            new AccountData(command.data),
            new AccountRoleIds(command.roleIds),
            new AccountTenantIds(command.tenantIds),
            
        );
    }
}