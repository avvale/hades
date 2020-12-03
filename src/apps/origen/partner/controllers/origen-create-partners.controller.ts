import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { PartnerDto } from './../dto/partner.dto';
import { CreatePartnerDto } from './../dto/create-partner.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreatePartnersCommand } from '@hades/origen/partner/application/create/create-partners.command';

@ApiTags('[origen] partner')
@Controller('origen/partners')
@Permissions('origen.partner.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OrigenCreatePartnersController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create partners in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [PartnerDto] })
    @ApiBody({ type: [CreatePartnerDto] })
    async main(
        @Body() payload: CreatePartnerDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreatePartnersCommand(payload, { timezone }));
    }
}