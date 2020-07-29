import { ApiProperty } from '@nestjs/swagger';
/* import { CreateExecutionSnapshotDto } from './create-execution-snapshot.dto';
import { CreateSystemSnapshotDto } from './create-system-snapshot.dto';
import { CreateTenantSnapshotDto } from './create-tenant-snapshot.dto';
import { CreateMessageOverviewSnapshotDto } from './create-message-overview-snapshot.dto';
import { CreateChannelOverviewSnapshotDto } from './create-channel-overview-snapshot.dto';
import { CreateJobOverviewSnapshotDto } from './create-job-overview-snapshot.dto';
import { CreateMessageDetailSnapshotDto } from './create-message-detail-snapshot.dto';
import { CreateChannelDetailSnapshotDto } from './create-channel-detail-snapshot.dto';
import { CreateJobDetailSnapshotDto } from './create-job-detail-snapshot.dto';
 */
/* export class CreateCatalogFlowDto 
{   
    @ApiProperty({
        type        : CreateTenantSnapshotDto,
        description : 'tenant object',
        example     : { 
            "code": "TECHEDGE"
        }
    })
    tenant: CreateTenantSnapshotDto;

    @ApiProperty({
        type        : CreateSystemSnapshotDto,
        description : 'system object',
        example     : { 
            "name": "PIJ"
        }
    })
    system: CreateSystemSnapshotDto;

    @ApiProperty({
        type        : CreateExecutionSnapshotDto,
        description : 'execution object',
        example     : { 
            "version": "1.0.0",
            "type": "SUMMARY",
            "monitoringStartAt": "2020-07-17 10:51:32",
            "monitoringEndAt": "'2020-07-17 06:08:00",
            "executedAt": "2020-07-17 02:11:04"
        }
    })
    execution: CreateExecutionSnapshotDto;

    @ApiProperty({
        type        : CreateMessageOverviewSnapshotDto,
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
    messageOverview: CreateMessageOverviewSnapshotDto;

    @ApiProperty({
        type        : CreateChannelOverviewSnapshotDto,
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
    channelOverview: CreateChannelOverviewSnapshotDto;

    @ApiProperty({
        type        : CreateJobOverviewSnapshotDto,
        description : 'job overview object',
        example     : { 
            "cancelled": 0,
            "completed": 999,
            "error": 0,
        }
    })
    jobOverview: CreateJobOverviewSnapshotDto;

    @ApiProperty({
        type        : [CreateMessageDetailSnapshotDto],
        description : 'message details object',
        example     : [{ 
            flowParty: '',
            flowComponent: 'BC_SII_BROKER',
            flowInterfaceName: 'SI_IA_ProcesarLote',
            flowInterfaceNamespace: 'urn:techedgegroup.com:sii:lotes',
            status: 'ERROR',
            startTimeAt: '2020-07-21 12:23:13',
            scenario: 'dir://ICO/9dc25e232809330dacae8c438ee9c3da',
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
            timesFailed: 4,
            example: '1c9e4c0a-9e66-11ea-cf75-0000001ba2ce',
            detail: 'aG9sYSBtdW5kbw=='
        }]
    })
    messagesDetail: CreateMessageDetailSnapshotDto[];

    @ApiProperty({
        type        : [CreateChannelDetailSnapshotDto],
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
    channelsDetail: CreateChannelDetailSnapshotDto[];

    @ApiProperty({
        type        : [CreateJobDetailSnapshotDto],
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
    jobsDetail: CreateJobDetailSnapshotDto[];
} */
