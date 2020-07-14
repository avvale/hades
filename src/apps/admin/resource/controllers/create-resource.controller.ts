import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateResourceDto } from './../dto/create-resource.dto';
import { ResourceDto } from './../dto/resource.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { CreateResourceCommand } from '@hades/admin/resource/application/create/create-resource.command';

@ApiTags('[admin] resource')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: ResourceDto})
@Controller('admin/resource')
export class CreateResourceController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create resource' })
    async main(@Body() payload: CreateResourceDto)
    {
        await this.commandBus.dispatch(new CreateResourceCommand(
            payload.id,
            payload.boundedContextId,
            payload.name,
            payload.hasCustomFields,
            payload.hasAttachments,
            
        ));

        return await this.queryBus.ask(new FindResourceByIdQuery(payload.id));
    }
}