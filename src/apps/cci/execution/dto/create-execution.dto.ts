import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionDto
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
        description : 'version [input here api field description]',
    })
    version: string;

    @ApiProperty({
        type        : String,
        enum        : ['SUMMARY','DETAIL'],
        description : 'type [input here api field description]',
    })
    type: string;

    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
    })
    executedAt: string;

    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
    })
    monitoringStartAt: string;

    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
    })
    monitoringEndAt: string;

}