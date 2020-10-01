import { ApiProperty } from '@nestjs/swagger';
import { CreateExecutionSnapshotObjectDto } from './create-execution-snapshot-object.dto';
import { CreateSystemSnapshotObjectDto } from './create-system-snapshot-object.dto';
import { CreateTenantSnapshotObjectDto } from './create-tenant-snapshot-object.dto';
import { CreateMessageOverviewSnapshotObjectDto } from './create-message-overview-snapshot-object.dto';
import { CreateChannelOverviewSnapshotObjectDto } from './create-channel-overview-snapshot-object.dto';
import { CreateJobOverviewSnapshotObjectDto } from './create-job-overview-snapshot-object.dto';
import { CreateMessageDetailSnapshotObjectDto } from './create-message-detail-snapshot-object.dto';
import { CreateChannelDetailSnapshotObjectDto } from './create-channel-detail-snapshot-object.dto';
import { CreateJobDetailSnapshotObjectDto } from './create-job-detail-snapshot-object.dto';

export class CreateSnapshotDto 
{   
    @ApiProperty({
        type        : CreateTenantSnapshotObjectDto,
        description : 'tenant object',
        example     : { 
            "code": "TECHEDGE"
        }
    })
    tenant: CreateTenantSnapshotObjectDto;

    @ApiProperty({
        type        : CreateSystemSnapshotObjectDto,
        description : 'system object',
        example     : { 
            "name": "PIJ"
        }
    })
    system: CreateSystemSnapshotObjectDto;

    @ApiProperty({
        type        : CreateExecutionSnapshotObjectDto,
        description : 'execution object',
        example     : { 
            "version": "1.0.0",
            "type": "SUMMARY",
            "monitoringStartAt": "2020-07-17 10:51:32",
            "monitoringEndAt": "'2020-07-17 06:08:00",
            "executedAt": "2020-07-17 02:11:04"
        }
    })
    execution: CreateExecutionSnapshotObjectDto;

    @ApiProperty({
        type        : CreateMessageOverviewSnapshotObjectDto,
        description : 'message overview object',
        example     : { 
            "numberMax": 9999,
            "numberDays": 10,
            "success": 57,
            "cancelled": 0,
            "delivering": 0,
            "error": 16,
            "holding": 0,
            "toBeDelivered": 1,
            "waiting": 0,
        }
    })
    messageOverview: CreateMessageOverviewSnapshotObjectDto;

    @ApiProperty({
        type        : CreateChannelOverviewSnapshotObjectDto,
        description : 'channel overview object',
        example     : { 
            "error": 5,
            "inactive": 6,
            "successful": 448,
            "stopped": 0,
            "unknown": 0,
            "unregistered": 0,
        }
    })
    channelOverview: CreateChannelOverviewSnapshotObjectDto;

    @ApiProperty({
        type        : CreateJobOverviewSnapshotObjectDto,
        description : 'job overview object',
        example     : { 
            "cancelled": 0,
            "completed": 999,
            "error": 0,
        }
    })
    jobOverview: CreateJobOverviewSnapshotObjectDto;

    @ApiProperty({
        type        : [CreateMessageDetailSnapshotObjectDto],
        description : 'message details object',
        example     : [{
            scenario: 'dir://ICO/9dc25e232809330dacae8c438ee9c3da',
            flowParty: '',
            flowReceiverParty: '',
            flowComponent: 'BC_SII_BROKER',
            flowReceiverComponent: 'BC_SII_BROKER',
            flowInterfaceName: 'SI_IA_ProcesarLote',
            flowInterfaceNamespace: 'urn:techedgegroup.com:sii:lotes',
            status: 'ERROR',
            refMessageId: 'f158a1a4-d53a-43ab-8790-9debfdf72370',
            detail: 'aG9sYSBtdW5kbw==',
            example: '1c9e4c0a-9e66-11ea-cf75-0000001ba2ce',
            startTimeAt: '2020-07-21 12:23:13',
            direction: 'OUTBOUND',
            errorCategory: 'XI_J2EE_ADAPTER_SOAP',
            errorCode: 'SOAP_ADAPTER_PROCESSING_ERROR',
            errorLabel: 2003,
            node: 8071536873,
            protocol: '6810i98gcpgr0edip3a1',
            qualityOfService: 'EO',
            receiverParty: '',
            receiverComponent: 'BC_SII_DASHBOARD',
            receiverInterface: 'SI_IA_ProcesarLote',
            receiverInterfaceNamespace: 'urn:techedgegroup.com:sii:lotes',
            retries: 3,
            size: 4502,
            timesFailed: 4
        }]
    })
    messagesDetail: CreateMessageDetailSnapshotObjectDto[];

    @ApiProperty({
        type        : [CreateChannelDetailSnapshotObjectDto],
        description : 'channel details object',
        example     : [{ 
            status: 'ERROR',
            channelSapId: '045A58RT',
            channelName: 'CC_S_REST',
            channelComponent: 'BC_REST_CV',
            channelParty: '',
            detail: 'aG9sYSBtdW5kbw=='
        }]
    })
    channelsDetail: CreateChannelDetailSnapshotObjectDto[];

    @ApiProperty({
        type        : [CreateJobDetailSnapshotObjectDto],
        description : 'job details object',
        example     : [{ 
            status: 'ERROR',
            name: 'BPMMailReaderJob',
            returnCode: 2029462869,
            node: 'Server 00 00_18111',
            user: '',
            startAt: '2020-07-17 02:11:04',
            endAt: '2020-07-17 02:11:04'
        }]
    })
    jobsDetail: CreateJobDetailSnapshotObjectDto[];
}
