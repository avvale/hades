import { Resolver, Args, Mutation } from '@nestjs/graphql';

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
import { UpdateExecutionCommand } from '@hades/cci/execution/application/update/update-execution.command';
import { FindExecutionByIdQuery } from '@hades/cci/execution/application/find/find-execution-by-id.query';
import { CciUpdateExecutionInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.execution.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateExecutionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateExecution')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('payload') payload: CciUpdateExecutionInput, @Args('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateExecutionCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.version,
            payload.type,
            payload.executedAt,
            payload.monitoringStartAt,
            payload.monitoringEndAt,
            constraint,
        ));
        
        return await this.queryBus.ask(new FindExecutionByIdQuery(payload.id, constraint));
    }
}