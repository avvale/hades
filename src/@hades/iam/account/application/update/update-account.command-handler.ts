import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccountCommand } from './update-account.command';
import { UpdateAccountService } from './update-account.service';
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

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountCommandHandler implements ICommandHandler<UpdateAccountCommand>
{
    constructor(
        private readonly updateAccountService: UpdateAccountService
    ) { }

    async execute(command: UpdateAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccountService.main(
            new AccountId(command.id),
            new AccountType(command.type, { undefinable: true }),
            new AccountName(command.name, { undefinable: true }),
            new AccountIsActive(command.isActive, { undefinable: true }),
            new AccountClientId(command.clientId, { undefinable: true }),
            new AccountApplicationCodes(command.applicationCodes, { undefinable: true }),
            new AccountPermissions(command.permissions, { undefinable: true }),
            new AccountData(command.data),
            new AccountRoleIds(command.roleIds),
            new AccountTenantIds(command.tenantIds),
            
        )
    }
}