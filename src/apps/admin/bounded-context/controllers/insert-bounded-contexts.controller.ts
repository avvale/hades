import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateBoundedContextDto } from './../dto/create-bounded-context.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertBoundedContextsCommand } from '@hades/admin/bounded-context/application/insert/insert-bounded-contexts.command';

@ApiTags('[admin] bounded-context')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('admin/bounded-contexts')
export class InsertBoundedContextsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert bounded-contexts in batch' })
    @ApiBody({ 
        type: [CreateBoundedContextDto]
    })
    async main(@Body() payload: CreateBoundedContextDto[])
    {
        await this.commandBus.dispatch(new InsertBoundedContextsCommand(payload));
    }
}