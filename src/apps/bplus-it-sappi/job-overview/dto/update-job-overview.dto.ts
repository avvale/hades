import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobOverviewDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a89cd7f7-6d71-4275-81bf-b7372ac67357'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b6372430-2806-4225-9c30-275012460f21'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '476318f0-9577-4fa9-bfd7-9f5133c6dc8d'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-06-30 17:11:07'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-06-30 04:23:07'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-06-30 15:38:20'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 9517303305
    })
    cancelled: number;
    
    @ApiProperty({
        type        : Number,
        description : 'completed [input here api field description]',
        example     : 7979666159
    })
    completed: number;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 8254563259
    })
    error: number;
    
}
