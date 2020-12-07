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
import { CreateAdministrativeAreaLevel1Command } from '@hades/admin/administrative-area-level-1/application/create/create-administrative-area-level-1.command';
import { FindAdministrativeAreaLevel1ByIdQuery } from '@hades/admin/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { AdminCreateAdministrativeAreaLevel1Input } from './../../../../graphql';

@Resolver()
@Permissions('admin.administrativeAreaLevel1.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAdministrativeAreaLevel1Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateAdministrativeAreaLevel1')
    async main(
        @Args('payload') payload: AdminCreateAdministrativeAreaLevel1Input,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel1Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, {}, { timezone }));
    }
}