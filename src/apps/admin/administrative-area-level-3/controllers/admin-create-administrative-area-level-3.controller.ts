import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAdministrativeAreaLevel3Dto } from './../dto/create-administrative-area-level-3.dto';
import { AdministrativeAreaLevel3Dto } from './../dto/administrative-area-level-3.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAdministrativeAreaLevel3ByIdQuery } from '@hades/admin/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { CreateAdministrativeAreaLevel3Command } from '@hades/admin/administrative-area-level-3/application/create/create-administrative-area-level-3.command';

@ApiTags('[admin] administrative-area-level-3')
@Controller('admin/administrative-area-level-3')
@Permissions('admin.administrativeAreaLevel3.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAdministrativeAreaLevel3Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-area-level-3' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AdministrativeAreaLevel3Dto })
    async main(
        @Body() payload: CreateAdministrativeAreaLevel3Dto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel3Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(payload.id, {}, { timezone }));
    }
}