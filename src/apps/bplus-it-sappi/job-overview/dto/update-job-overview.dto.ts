import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobOverviewDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '72b6e611-4d0f-4f33-bcf4-b24f4c0dde72'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'c640fc09-a678-427c-94b7-34536b9fcc5c'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'eeb53bd7-bb7a-49e5-a1c8-1135415ee41d'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'r5orlduq5exi6pkzrupr'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : 'be7394d7-f01d-4eff-926b-ea7c6c6ebf04'
        })
        executionId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionType [input here api field description]',
            example     : 'DETAIL',
            enum        : ['SUMMARY','DETAIL']
        })
        executionType: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'executionExecutedAt [input here api field description]',
            example     : '2020-07-21 05:13:24'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 07:21:45'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 15:02:14'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'cancelled [input here api field description]',
            example     : 5353001650
        })
        cancelled: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'completed [input here api field description]',
            example     : 7567755365
        })
        completed: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 6803756775
        })
        error: number;
    
    
}
