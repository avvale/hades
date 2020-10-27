import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { CreateAccountService } from './create-account.service';
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

@CommandHandler(CreateAccountCommand)
export class CreateAccountCommandHandler implements ICommandHandler<CreateAccountCommand>
{
    constructor(
        private readonly createAccountService: CreateAccountService,
    ) {}

    async execute(command: CreateAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccountService.main(
            new AccountId(command.id),
            new AccountType(command.type),
            new AccountEmail(command.email),
            new AccountIsActive(command.isActive),
            new AccountClientId(command.clientId),
            new AccountDApplicationCodes(command.dApplicationCodes),
            new AccountDPermissions(command.dPermissions, {default: {}}),
            new AccountDTenants(command.tenantIds, {default: []}),
            new AccountData(command.data),
            new AccountRoleIds(command.roleIds),
            new AccountTenantIds(command.tenantIds),
        );
    }
}