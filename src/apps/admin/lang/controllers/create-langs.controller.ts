import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LangDto } from './../dto/lang.dto';
import { CreateLangDto } from './../dto/create-lang.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';

@ApiTags('[admin] lang')
@Controller('admin/langs')
@Permissions('admin.lang.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateLangsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create langs in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [LangDto] })
    @ApiBody({ type: [CreateLangDto] })
    async main(@Body() payload: CreateLangDto[], )
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload));
    }
}