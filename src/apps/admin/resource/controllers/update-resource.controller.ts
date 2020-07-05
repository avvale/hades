import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateResourceDto } from './../dto/update-resource.dto';
import { ResourceDto } from './../dto/resource.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateResourceCommand } from '@hades/admin/resource/application/update/update-resource.command';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';

@ApiTags('[admin] resource')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: ResourceDto})
@Controller('admin/resource')
export class UpdateResourceController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update resource' })
    async main(@Body() payload: UpdateResourceDto)
    {
        await this.commandBus.dispatch(new UpdateResourceCommand(
            payload.id,
            payload.boundedContextId,
            payload.name,
            payload.hasCustomFields,
            payload.hasAttachments,
            
        ));

        return await this.queryBus.ask(new FindResourceByIdQuery(payload.id));
    }
}