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
import { CreatePartnersCommand } from '@hades/origen/partner/application/create/create-partners.command';
import { OrigenCreatePartnerInput } from './../../../../graphql';

@Resolver()
@Permissions('origen.partner.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenCreatePartnersResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('origenCreatePartners')
    async main(
        @Args('payload') payload: OrigenCreatePartnerInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreatePartnersCommand(payload, { timezone }));
        return true;
    }
}