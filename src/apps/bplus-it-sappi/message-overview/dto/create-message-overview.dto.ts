import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageOverviewDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '857b4225-b827-4044-8f58-f1881a248932'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'b6edecd4-33d0-43a4-8e61-afb0efaa456f'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '3fef01a2-5194-4339-ba78-4ab6deeb348c'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'wa4je123aizx1rqqo7z5'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '30130d03-fc77-4e8e-ad7f-a3da85d0f950'
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
            example     : '2020-07-21 17:25:08'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 15:15:57'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 10:38:08'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'numberMax [input here api field description]',
            example     : 3713571317
        })
        numberMax: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'numberDays [input here api field description]',
            example     : 5244654299
        })
        numberDays: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'success [input here api field description]',
            example     : 3518877984
        })
        success: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'cancelled [input here api field description]',
            example     : 4067538817
        })
        cancelled: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'delivering [input here api field description]',
            example     : 5360445121
        })
        delivering: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 8961597570
        })
        error: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'holding [input here api field description]',
            example     : 7821299940
        })
        holding: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'toBeDelivered [input here api field description]',
            example     : 5867777702
        })
        toBeDelivered: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'waiting [input here api field description]',
            example     : 1954024544
        })
        waiting: number;
    
    
}
