import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateMessageDetailDto } from './../dto/update-message-detail.dto';
import { MessageDetailDto } from './../dto/message-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateMessageDetailCommand } from '@hades/cci/message-detail/application/update/update-message-detail.command';
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';

@ApiTags('[cci] message-detail')
@Controller('cci/message-detail')
export class UpdateMessageDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update message-detail' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: MessageDetailDto})
    async main(@Body() payload: UpdateMessageDetailDto)
    {
        await this.commandBus.dispatch(new UpdateMessageDetailCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.scenario,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.status,
            payload.refMessageId,
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
            payload.numberMax,
            payload.numberDays,
            
        ));

        return await this.queryBus.ask(new FindMessageDetailByIdQuery(payload.id));
    }
}