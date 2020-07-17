import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ResourceDto } from './../dto/resource.dto';
import { CreateResourceDto } from './../dto/create-resource.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertResourcesCommand } from '@hades/admin/resource/application/insert/insert-resources.command';

@ApiTags('[admin] resource')
@Controller('admin/resources')
export class InsertResourcesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert resources in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ResourceDto] })
    @ApiBody({ type: [CreateResourceDto] })
    async main(@Body() payload: CreateResourceDto[])
    {
        await this.commandBus.dispatch(new InsertResourcesCommand(payload));
    }
}