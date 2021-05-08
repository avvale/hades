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
import { CreateResourceCommand } from '@hades/admin/resource/application/create/create-resource.command';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { AdminCreateResourceInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.resource.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateResourceResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateResource')
    async main(
        @Args('payload') payload: AdminCreateResourceInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateResourceCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindResourceByIdQuery(payload.id, {}, { timezone }));
    }
}