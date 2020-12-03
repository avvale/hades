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
import { FindPartnerByIdQuery } from '@hades/origen/partner/application/find/find-partner-by-id.query';
import { DeletePartnerByIdCommand } from '@hades/origen/partner/application/delete/delete-partner-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('origen.partner.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenDeletePartnerByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('origenDeletePartnerById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const partner = await this.queryBus.ask(new FindPartnerByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePartnerByIdCommand(id, constraint, { timezone }));

        return partner;
    }
}