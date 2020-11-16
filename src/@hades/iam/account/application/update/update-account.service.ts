import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
export class UpdateAccountService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository,
    ) {}

    public async main(
        payload: {
            id: AccountId,
            type?: AccountType,
            email?: AccountEmail,
            isActive?: AccountIsActive,
            clientId?: AccountClientId,
            dApplicationCodes?: AccountDApplicationCodes,
            dPermissions?: AccountDPermissions,
            dTenants?: AccountDTenants,
            data?: AccountData,
            roleIds?: AccountRoleIds,
            tenantIds?: AccountTenantIds,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
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
            null,
            new AccountUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(account, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(
            account
        );

        accountRegister.updated(account); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}