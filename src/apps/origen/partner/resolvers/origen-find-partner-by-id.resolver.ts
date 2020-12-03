import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPartnerByIdQuery } from '@hades/origen/partner/application/find/find-partner-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { OrigenPartner } from './../../../../graphql';

@Resolver()
@Permissions('origen.partner.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenFindPartnerByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('origenFindPartnerById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OrigenPartner>
    {
        return await this.queryBus.ask(new FindPartnerByIdQuery(id, constraint, { timezone }));
    }
}