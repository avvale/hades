import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PartnerDto } from './../dto/partner.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindPartnerByIdQuery } from '@hades/origen/partner/application/find/find-partner-by-id.query';

@ApiTags('[origen] partner')
@Controller('origen/partner')
@Permissions('origen.partner.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenFindPartnerByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find partner by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: PartnerDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindPartnerByIdQuery(id, constraint, { timezone }));
    }
}