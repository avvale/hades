import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';
import { CreateApplicationDto } from './../dto/create-application.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateApplicationsCommand } from '@hades/o-auth/application/application/create/create-applications.command';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications')
export class CreateApplicationsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create applications in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ApplicationDto] })
    @ApiBody({ type: [CreateApplicationDto] })
    async main(@Body() payload: CreateApplicationDto[])
    {
        await this.commandBus.dispatch(new CreateApplicationsCommand(payload));
    }
}