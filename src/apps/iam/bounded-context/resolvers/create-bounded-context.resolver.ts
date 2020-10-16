import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateBoundedContextCommand } from '@hades/iam/bounded-context/application/create/create-bounded-context.command';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { IamCreateBoundedContextInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.create')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class CreateBoundedContextResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateBoundedContext')
    async main(@Args('payload') payload: IamCreateBoundedContextInput)
    {
        await this.commandBus.dispatch(new CreateBoundedContextCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
        ));
        
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id));
    }
}