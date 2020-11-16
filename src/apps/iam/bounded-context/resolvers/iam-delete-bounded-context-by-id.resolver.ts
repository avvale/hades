import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '@hades/iam/bounded-context/application/delete/delete-bounded-context-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('iam.boundedContext.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteBoundedContextByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteBoundedContextById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(id, constraint, { timezone }));

        return boundedContext;
    }
}