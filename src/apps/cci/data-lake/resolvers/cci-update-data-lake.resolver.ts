import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantConstraint } from '@hades/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateDataLakeCommand } from '@hades/cci/data-lake/application/update/update-data-lake.command';
import { FindDataLakeByIdQuery } from '@hades/cci/data-lake/application/find/find-data-lake-by-id.query';
import { CciUpdateDataLakeInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.dataLake.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciUpdateDataLakeResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciUpdateDataLake')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciUpdateDataLakeInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateDataLakeCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindDataLakeByIdQuery(payload.id, constraint, { timezone }));
    }
}