import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteApplicationsCommand } from '@hades/o-auth/application/application/delete/delete-applications.command';
import { GetApplicationsQuery } from '@hades/o-auth/application/application/get/get-applications.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('oAuth.application.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteApplicationsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteApplications')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, )
    {
        const applications = await this.queryBus.ask(new GetApplicationsQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteApplicationsCommand(queryStatement, constraint));

        return applications;
    }
}