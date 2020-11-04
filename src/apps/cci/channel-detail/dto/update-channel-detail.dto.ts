import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
    })
    tenantId: string;

    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
    })
    tenantCode: string;

    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
    })
    systemId: string;

    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
    })
    systemName: string;

    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
    })
    executionId: string;

    @ApiProperty({
        type        : String,
        enum        : ['SUMMARY','DETAIL'],
        description : 'executionType [input here api field description]',
    })
    executionType: string;

    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
    })
    executionExecutedAt: string;

    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
    })
    executionMonitoringStartAt: string;

    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
    })
    executionMonitoringEndAt: string;

    @ApiProperty({
        type        : String,
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED'],
        description : 'status [input here api field description]',
    })
    status: string;

    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
    })
    channelHash: string;

    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
    })
    channelSapId: string;

    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
    })
    channelParty: string;

    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
    })
    channelComponent: string;

    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
    })
    channelName: string;

    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
    })
    detail: string;

}