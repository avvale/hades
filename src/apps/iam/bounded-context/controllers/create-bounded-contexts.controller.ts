import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';
import { CreateBoundedContextDto } from './../dto/create-bounded-context.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts')
@UseGuards(AuthGuard('jwt'))
export class CreateBoundedContextsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create bounded-contexts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [BoundedContextDto] })
    @ApiBody({ type: [CreateBoundedContextDto] })
    async main(@Body() payload: CreateBoundedContextDto[])
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload));
    }
}