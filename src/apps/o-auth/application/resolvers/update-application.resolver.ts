import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateApplicationCommand } from '@hades/o-auth/application/application/update/update-application.command';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';
import { OAuthUpdateApplicationInput } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.application.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateApplicationResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthUpdateApplication')
    async main(@Args('payload') payload: OAuthUpdateApplicationInput, @Args('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateApplicationCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.secret,
            payload.isMaster,
            payload.clientIds,
            constraint,
        ));
        
        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id, constraint));
    }
}