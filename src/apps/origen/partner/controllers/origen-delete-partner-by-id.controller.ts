import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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
import { FindPartnerByIdQuery } from '@hades/origen/partner/application/find/find-partner-by-id.query';
import { DeletePartnerByIdCommand } from '@hades/origen/partner/application/delete/delete-partner-by-id.command';

@ApiTags('[origen] partner')
@Controller('origen/partner')
@Permissions('origen.partner.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenDeletePartnerByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete partner by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: PartnerDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const partner = await this.queryBus.ask(new FindPartnerByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePartnerByIdCommand(id, constraint, { timezone }));

        return partner;
    }
}