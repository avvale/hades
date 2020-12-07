import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAdministrativeAreaLevel2Dto } from './../dto/create-administrative-area-level-2.dto';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAdministrativeAreaLevel2ByIdQuery } from '@hades/admin/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { CreateAdministrativeAreaLevel2Command } from '@hades/admin/administrative-area-level-2/application/create/create-administrative-area-level-2.command';

@ApiTags('[admin] administrative-area-level-2')
@Controller('admin/administrative-area-level-2')
@Permissions('admin.administrativeAreaLevel2.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAdministrativeAreaLevel2Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-area-level-2' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel2Dto })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel2Dto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel2Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, {}, { timezone }));
    }
}