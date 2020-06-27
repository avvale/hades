import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8a664f6f-0057-49e3-9845-980e6a5efc20'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0ad17690-1a22-42b8-8520-7130398cbb46'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f'
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
        example     : '2020-06-27 05:25:20'
    })
    monitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-06-27 15:06:51'
    })
    monitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '2020-06-27 16:05:48'
    })
    executedAt: string;
    
}
