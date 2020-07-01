import { ApiProperty } from '@nestjs/swagger';

export class CreateJobOverviewDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '12cfb3d8-1744-48a4-8c20-41531951c859'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '597160ba-c687-459d-a15f-3d6dd301ef7d'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '80071d86-7b68-4abd-8b02-64d34fbb85ba'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6au5vepa6quz34unfi74'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'baffc5c2-b238-45f5-bc93-c6bf86643bb0'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-01 13:53:49'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-01 15:56:27'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-01 00:21:57'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 3609315556
    })
    cancelled: number;
    
    @ApiProperty({
        type        : Number,
        description : 'completed [input here api field description]',
        example     : 1072630951
    })
    completed: number;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 1100766101
    })
    error: number;
    
}
