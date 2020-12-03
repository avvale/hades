import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PartnerDto } from './../dto/partner.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginatePartnersQuery } from '@hades/origen/partner/application/paginate/paginate-partners.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[origen] partner')
@Controller('origen/partners/paginate')
@Permissions('origen.partner.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenPaginatePartnersController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate partners' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new PaginatePartnersQuery(queryStatement, constraint, { timezone }));
    }
}