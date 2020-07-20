import { ApiProperty } from '@nestjs/swagger';
import { CreateExecutionSnapshotDto } from './create-execution-snapshot.dto';
import { CreateSystemSnapshotDto } from './create-system-snapshot.dto';
import { CreateTenantSnapshotDto } from './create-tenant-snapshot.dto';
import { CreateMessageOverviewSnapshotDto } from './create-message-overview-snapshot.dto';
import { CreateChannelOverviewSnapshotDto } from './create-channel-overview-snapshot.dto';

export class CreateSnapshotDto 
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
    channelOverview:CreateChannelOverviewSnapshotDto;
}
