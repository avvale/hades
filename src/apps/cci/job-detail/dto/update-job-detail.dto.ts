import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto
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
        enum        : ['CANCELLED','COMPLETED','ERROR'],
        description : 'status [input here api field description]',
    })
    status: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
    })
    returnCode: number;

    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
    })
    node: string;

    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
    })
    user: string;

    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
    })
    startAt: string;

    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
    })
    endAt: string;

}