import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateApplicationDto } from './../dto/update-application.dto';
import { ApplicationDto } from './../dto/application.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateApplicationCommand } from '@hades/o-auth/application/application/update/update-application.command';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';

@ApiTags('[o-auth] application')
@Controller('o-auth/application')
export class UpdateApplicationController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ApplicationDto})
    async main(@Body() payload: UpdateApplicationDto)
    {
        await this.commandBus.dispatch(new UpdateApplicationCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.secret,
            payload.isMaster,
            payload.clientIds,
            
        ));

        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id));
    }
}