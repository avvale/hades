import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
import { IAccountRepository } from './../../domain/account.repository';
import { IamAccount } from './../../domain/account.aggregate';

@Injectable()
export class CreateAccountService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository,
    ) {}

    public async main(
        payload: {
            id: AccountId,
            type: AccountType,
            email: AccountEmail,
            isActive: AccountIsActive,
            clientId: AccountClientId,
            dApplicationCodes: AccountDApplicationCodes,
            dPermissions: AccountDPermissions,
            dTenants: AccountDTenants,
            data: AccountData,
            roleIds: AccountRoleIds,
            tenantIds: AccountTenantIds,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const account = IamAccount.register(
            payload.id,
            payload.type,
            payload.email,
            payload.isActive,
            payload.clientId,
            payload.dApplicationCodes,
            payload.dPermissions,
            payload.dTenants,
            payload.data,
            payload.roleIds,
            payload.tenantIds,
            new AccountCreatedAt({currentTimestamp: true}),
            new AccountUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(account);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(
            account
        );

        accountRegister.created(account); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}