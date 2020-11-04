import { ApiProperty } from '@nestjs/swagger';

export class CreateJobOverviewDto
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
        type        : Number,
        description : 'cancelled [input here api field description]',
    })
    cancelled: number;

    @ApiProperty({
        type        : Number,
        description : 'completed [input here api field description]',
    })
    completed: number;

    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
    })
    error: number;

}