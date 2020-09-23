import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateBoundedContextDto } from './../dto/create-bounded-context.dto';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { CreateBoundedContextCommand } from '@hades/iam/bounded-context/application/create/create-bounded-context.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
export class CreateBoundedContextController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create bounded-context' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: BoundedContextDto })
    async main(@Body() payload: CreateBoundedContextDto)
    {
        await this.commandBus.dispatch(new CreateBoundedContextCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            
        ));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id));
    }
}