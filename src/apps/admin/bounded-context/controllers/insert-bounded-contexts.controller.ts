import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';
import { CreateBoundedContextDto } from './../dto/create-bounded-context.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertBoundedContextsCommand } from '@hades/admin/bounded-context/application/insert/insert-bounded-contexts.command';

@ApiTags('[admin] bounded-context')
@Controller('admin/bounded-contexts')
export class InsertBoundedContextsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert bounded-contexts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [BoundedContextDto] })
    @ApiBody({ type: [CreateBoundedContextDto] })
    async main(@Body() payload: CreateBoundedContextDto[])
    {
        await this.commandBus.dispatch(new InsertBoundedContextsCommand(payload));
    }
}