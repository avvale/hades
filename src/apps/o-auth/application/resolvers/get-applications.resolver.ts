import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetApplicationsQuery } from '@hades/o-auth/application/application/get/get-applications.query';
import { OAuthApplication } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class GetApplicationsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthGetApplications')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<OAuthApplication[]>
    {
        return await this.queryBus.ask(new GetApplicationsQuery(queryStatement, constraint));
    }
}