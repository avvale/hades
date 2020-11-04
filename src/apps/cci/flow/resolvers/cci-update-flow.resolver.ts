import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateFlowCommand } from '@hades/cci/flow/application/update/update-flow.command';
import { FindFlowByIdQuery } from '@hades/cci/flow/application/find/find-flow-by-id.query';
import { CciUpdateFlowInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.flow.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciUpdateFlowResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciUpdateFlow')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciUpdateFlowInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateFlowCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindFlowByIdQuery(payload.id, constraint, { timezone }));
    }
}