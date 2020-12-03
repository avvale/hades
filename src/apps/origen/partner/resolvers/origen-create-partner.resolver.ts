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
import { CreatePartnerCommand } from '@hades/origen/partner/application/create/create-partner.command';
import { FindPartnerByIdQuery } from '@hades/origen/partner/application/find/find-partner-by-id.query';
import { OrigenCreatePartnerInput } from './../../../../graphql';

@Resolver()
@Permissions('origen.partner.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenCreatePartnerResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('origenCreatePartner')
    async main(
        @Args('payload') payload: OrigenCreatePartnerInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreatePartnerCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindPartnerByIdQuery(payload.id, {}, { timezone }));
    }
}