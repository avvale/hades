import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7fbe1406-aad1-497b-9a01-8772d5cae7f0'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '319c94c0-674a-40a6-a4f7-c29429b3a81a'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b6abd9f6-242b-4091-88cd-5afa01120cb0'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'SUMMARY'
    })
    type: string;
    
    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '2020-07-17 10:51:32'
    })
    monitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-07-17 06:08:00'
    })
    monitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '2020-07-17 02:11:04'
    })
    executedAt: string;
    
}
