import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreatePartnerDto } from './../dto/create-partner.dto';
import { PartnerDto } from './../dto/partner.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPartnerByIdQuery } from '@hades/origen/partner/application/find/find-partner-by-id.query';
import { CreatePartnerCommand } from '@hades/origen/partner/application/create/create-partner.command';

@ApiTags('[origen] partner')
@Controller('origen/partner')
@Permissions('origen.partner.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenCreatePartnerController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create partner' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: PartnerDto })
    async main(
        @Body() payload: CreatePartnerDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreatePartnerCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindPartnerByIdQuery(payload.id, {}, { timezone }));
    }
}