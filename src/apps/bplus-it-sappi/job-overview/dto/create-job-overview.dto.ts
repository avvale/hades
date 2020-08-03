import { ApiProperty } from '@nestjs/swagger';

export class CreateJobOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cef152b6-5cb4-4bde-8e87-db647bdef79d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'h9peokz1jh150z122ty79bacgdju1nrb29uyfqws1q3q9vbno4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '47242f1e-225b-4775-a350-6e0d7e43db0c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8fzqj9eznf2by8p6i0ii'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-08-02 19:13:55'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-02 22:15:09'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 02:57:24'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 5762256351
    })
    cancelled: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'completed [input here api field description]',
        example     : 3933327073
    })
    completed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 4825496017
    })
    error: number;
    
    
}
