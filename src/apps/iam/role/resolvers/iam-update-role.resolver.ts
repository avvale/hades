// ignored file
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateRoleCommand } from '@hades/iam/role/application/update/update-role.command';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';
import { IamUpdateRoleInput } from './../../../../graphql';

// custom
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { IamRoleModel } from '@hades/iam/role/infrastructure/sequelize/sequelize-role.model';
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { PermissionResponse } from '@hades/iam/permission/domain/permission.response';
import { GetPermissionsQuery } from '@hades/iam/permission/application/get/get-permissions.query';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { IamUtils } from '@hades/iam/shared/domain/lib/iam-utils';

@Resolver()
@Permissions('iam.role.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamUpdateRole')
    async main(
        @Args('payload') payload: IamUpdateRoleInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        // get all accounts
        const accounts: AccountResponse[] = await this.queryBus.ask(new GetAccountsQuery({
            include: {
                model: IamRoleModel,
                as: 'roles',
                where: {
                    id: payload.id
                }
            }
        }, constraint, { timezone }));

        // get permissions assigned to this role
        const permissions: PermissionResponse[] = await this.queryBus.ask(new GetPermissionsQuery({
            where: {
                id: payload.permissionIds
            }
        }, constraint, { timezone }));

        // iterate each account
        for (const account of accounts)
        {
            // TODO gestionar el proceso de actualizacion en una cola
            const accountPermissions = IamUtils.updateAccountPermissions(payload.id, permissions, account, true);

            await this.commandBus.dispatch(new UpdateAccountCommand({
                id: account.id,
                type: undefined,
                email: undefined,
                isActive: undefined,
                clientId: undefined,
                dApplicationCodes: undefined,
                dPermissions: accountPermissions,
            }, constraint, { timezone }));
        }

        await this.commandBus.dispatch(new UpdateRoleCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, constraint, { timezone }));
    }
}