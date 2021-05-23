import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';
import { CreateLangDto } from './../dto/create-lang.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';

@ApiTags('[admin] lang')
@Controller('admin/langs')
@Permissions('admin.lang.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateLangsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create langs in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [LangDto] })
    @ApiBody({ type: [CreateLangDto] })
    async main(
        @Body() payload: CreateLangDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload, { timezone }));
    }
}