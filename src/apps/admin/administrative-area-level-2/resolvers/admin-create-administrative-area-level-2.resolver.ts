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
import { CreateAdministrativeAreaLevel2Command } from '@hades/admin/administrative-area-level-2/application/create/create-administrative-area-level-2.command';
import { FindAdministrativeAreaLevel2ByIdQuery } from '@hades/admin/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { AdminCreateAdministrativeAreaLevel2Input } from './../../../../graphql';

@Resolver()
@Permissions('admin.administrativeAreaLevel2.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAdministrativeAreaLevel2Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateAdministrativeAreaLevel2')
    async main(
        @Args('payload') payload: AdminCreateAdministrativeAreaLevel2Input,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel2Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, {}, { timezone }));
    }
}