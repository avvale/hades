import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';
import { CreateAdministrativeAreaLevel3Dto } from './../dto/create-administrative-area-level-3.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAdministrativeAreasLevel3Command } from '@hades/admin/administrative-area-level-3/application/create/create-administrative-areas-level-3.command';

@ApiTags('[admin] administrative-area-level-3')
@Controller('admin/administrative-areas-level-3')
@Permissions('admin.administrativeAreaLevel3.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-3 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AdministrativeAreaLevel3Dto] })
    @ApiBody({ type: [CreateAdministrativeAreaLevel3Dto] })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel3Dto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel3Command(payload, { timezone }));
    }
}