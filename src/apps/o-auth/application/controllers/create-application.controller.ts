import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateApplicationDto } from './../dto/create-application.dto';
import { ApplicationDto } from './../dto/application.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';
import { CreateApplicationCommand } from '@hades/o-auth/application/application/create/create-application.command';

@ApiTags('[o-auth] application')
@Controller('o-auth/application')
export class CreateApplicationController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
    async main(@Body() payload: CreateApplicationDto)
    {
        await this.commandBus.dispatch(new CreateApplicationCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.secret,
            payload.isMaster,
            
        ));

        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id));
    }
}