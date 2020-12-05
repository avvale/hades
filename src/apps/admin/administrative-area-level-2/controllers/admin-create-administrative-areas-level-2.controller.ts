import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';
import { CreateAdministrativeAreaLevel2Dto } from './../dto/create-administrative-area-level-2.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAdministrativeAreasLevel2Command } from '@hades/admin/administrative-area-level-2/application/create/create-administrative-areas-level-2.command';

@ApiTags('[admin] administrative-area-level-2')
@Controller('admin/administrative-areas-level-2')
@Permissions('admin.administrativeAreaLevel2.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-2 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AdministrativeAreaLevel2Dto] })
    @ApiBody({ type: [CreateAdministrativeAreaLevel2Dto] })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel2Dto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel2Command(payload, { timezone }));
    }
}