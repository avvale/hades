import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateMessageDetailDto } from './../dto/create-message-detail.dto';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageDetailByIdQuery } from '@hades/bplus-it-sappi/message-detail/application/find/find-message-detail-by-id.query';
import { CreateMessageDetailCommand } from '@hades/bplus-it-sappi/message-detail/application/create/create-message-detail.command';

@ApiTags('[bplus-it-sappi] message-detail')
@Controller('bplus-it-sappi/message-detail')
export class CreateMessageDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create message-detail' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: MessageDetailDto })
    async main(@Body() payload: CreateMessageDetailDto)
    {
        await this.commandBus.dispatch(new CreateMessageDetailCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.scenario,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.flowId,
            payload.flowParty,
            payload.flowComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.status,
            payload.detail,
            payload.example,
            payload.startTimeAt,
            payload.direction,
            payload.errorCategory,
            payload.errorCode,
            payload.errorLabel,
            payload.node,
            payload.protocol,
            payload.qualityOfService,
            payload.receiverParty,
            payload.receiverComponent,
            payload.receiverInterface,
            payload.receiverInterfaceNamespace,
            payload.retries,
            payload.size,
            payload.timesFailed,
            
        ));

        return await this.queryBus.ask(new FindMessageDetailByIdQuery(payload.id));
    }
}