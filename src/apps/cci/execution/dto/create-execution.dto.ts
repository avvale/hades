import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '',
    })
    tenantId: string;

    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '',
    })
    tenantCode: string;

    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '',
    })
    systemId: string;

    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '',
    })
    systemName: string;

    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '',
    })
    version: string;

    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : '',
    })
    type: string;

    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '',
    })
    executedAt: string;

    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '',
    })
    monitoringStartAt: string;

    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '',
    })
    monitoringEndAt: string;

}