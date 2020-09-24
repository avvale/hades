import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountsCommand } from './create-accounts.command';
import { CreateAccountsService } from './create-accounts.service';
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

@CommandHandler(CreateAccountsCommand)
export class CreateAccountsCommandHandler implements ICommandHandler<CreateAccountsCommand>
{
    constructor(
        private readonly createAccountsService: CreateAccountsService
    ) { }

    async execute(command: CreateAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccountsService.main(
            command.accounts
                .map(account => { 
                    return {
                        id: new AccountId(account.id),
                        type: new AccountType(account.type),
                        name: new AccountName(account.name),
                        isActive: new AccountIsActive(account.isActive),
                        clientId: new AccountClientId(account.clientId),
                        applicationCodes: new AccountApplicationCodes(account.applicationCodes),
                        permissions: new AccountPermissions(account.permissions),
                        data: new AccountData(account.data),
                        roleIds: new AccountRoleIds(account.roleIds),
                        tenantIds: new AccountTenantIds(account.tenantIds),
                        
                    }
                })
        );
    }
}