import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionDto 
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
        example     : 'DETAIL'
    })
    type: string;
    
    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '2020-07-16 07:19:17'
    })
    monitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-07-16 14:16:29'
    })
    monitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '2020-07-16 01:40:40'
    })
    executedAt: string;
    
}
