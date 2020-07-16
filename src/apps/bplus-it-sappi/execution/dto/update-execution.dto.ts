import { ApiProperty } from '@nestjs/swagger';

export class UpdateExecutionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4ff1b6ae-238b-4b34-a9a8-556c96f538c2'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8b8e19bb-7c44-42b2-bf69-2394ef167e2f'
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
        example     : '2020-07-15 19:18:42'
    })
    monitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-07-16 12:22:58'
    })
    monitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '2020-07-16 06:46:23'
    })
    executedAt: string;
    
}
