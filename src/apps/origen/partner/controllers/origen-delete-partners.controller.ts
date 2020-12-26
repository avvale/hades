import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { PartnerDto } from './../dto/partner.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetPartnersQuery } from '@hades/origen/partner/application/get/get-partners.query';
import { DeletePartnersCommand } from '@hades/origen/partner/application/delete/delete-partners.command';

@ApiTags('[origen] partner')
@Controller('origen/partners')
@Permissions('origen.partner.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenDeletePartnersController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete partners in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [PartnerDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const partners = await this.queryBus.ask(new GetPartnersQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePartnersCommand(queryStatement, constraint, { timezone }));

        return partners;
    }
}