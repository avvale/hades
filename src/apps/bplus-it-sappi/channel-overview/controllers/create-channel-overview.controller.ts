import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateChannelOverviewDto } from './../dto/create-channel-overview.dto';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelOverviewByIdQuery } from '@hades/bplus-it-sappi/channel-overview/application/find/find-channel-overview-by-id.query';
import { CreateChannelOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/create/create-channel-overview.command';

@ApiTags('[bplus-it-sappi] channel-overview')
@Controller('bplus-it-sappi/channel-overview')
export class CreateChannelOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channel-overview' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ChannelOverviewDto })
    async main(@Body() payload: CreateChannelOverviewDto)
    {
        await this.commandBus.dispatch(new CreateChannelOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.error,
            payload.inactive,
            payload.successful,
            payload.stopped,
            payload.unknown,
            payload.unregistered,
            
        ));

        return await this.queryBus.ask(new FindChannelOverviewByIdQuery(payload.id));
    }
}