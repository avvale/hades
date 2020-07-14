import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateSystemDto } from './../dto/create-system.dto';
import { SystemDto } from './../dto/system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindSystemByIdQuery } from '@hades/bplus-it-sappi/system/application/find/find-system-by-id.query';
import { CreateSystemCommand } from '@hades/bplus-it-sappi/system/application/create/create-system.command';

@ApiTags('[bplus-it-sappi] system')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: SystemDto})
@Controller('bplus-it-sappi/system')
export class CreateSystemController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create system' })
    async main(@Body() payload: CreateSystemDto)
    {
        await this.commandBus.dispatch(new CreateSystemCommand(
            payload.id,
            payload.tenantId,
            payload.name,
            payload.tenantCode,
            payload.environment,
            payload.version,
            payload.isActive,
            payload.cancelledAt,
            
        ));

        return await this.queryBus.ask(new FindSystemByIdQuery(payload.id));
    }
}