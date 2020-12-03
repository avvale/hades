import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdatePartnerDto } from './../dto/update-partner.dto';
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
import { UpdatePartnerCommand } from '@hades/origen/partner/application/update/update-partner.command';
import { FindPartnerByIdQuery } from '@hades/origen/partner/application/find/find-partner-by-id.query';

@ApiTags('[origen] partner')
@Controller('origen/partner')
@Permissions('origen.partner.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenUpdatePartnerController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update partner' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: PartnerDto})
    async main(
        @Body() payload: UpdatePartnerDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdatePartnerCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindPartnerByIdQuery(payload.id, constraint, { timezone }));
    }
}