import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccountCommand } from './update-account.command';
import { UpdateAccountService } from './update-account.service';
import {
    AccountId,
    AccountType,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountCommandHandler implements ICommandHandler<UpdateAccountCommand>
{
    constructor(
        private readonly updateAccountService: UpdateAccountService
    ) {}

    async execute(command: UpdateAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccountService.main(
            new AccountId(command.id),
            new AccountType(command.type, { undefinable: true }),
            new AccountEmail(command.email, { undefinable: true }),
            new AccountIsActive(command.isActive, { undefinable: true }),
            new AccountClientId(command.clientId, { undefinable: true }),
            new AccountDApplicationCodes(command.dApplicationCodes, { undefinable: true }),
            new AccountDPermissions(command.dPermissions, { undefinable: true }),
            new AccountDTenants(command.tenantIds, { undefinable: true }),
            new AccountData(command.data),
            new AccountRoleIds(command.roleIds),
            new AccountTenantIds(command.tenantIds),
            
        )
    }
}