import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPartnerQuery } from '@hades/origen/partner/application/find/find-partner.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { OrigenPartner } from './../../../../graphql';

@Resolver()
@Permissions('origen.partner.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenFindPartnerResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('origenFindPartner')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OrigenPartner>
    {
        return await this.queryBus.ask(new FindPartnerQuery(queryStatement, constraint, { timezone }));
    }
}