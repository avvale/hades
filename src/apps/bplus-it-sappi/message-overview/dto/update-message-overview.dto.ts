import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageOverviewDto 
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
            example     : '4idv7o5deoi09f8f1msm'
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
            example     : 'DETAIL',
            enum        : ['SUMMARY','DETAIL']
        })
        executionType: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'executionExecutedAt [input here api field description]',
            example     : '2020-07-21 06:04:04'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 14:27:55'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 03:02:42'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'numberMax [input here api field description]',
            example     : 4736877520
        })
        numberMax: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'numberDays [input here api field description]',
            example     : 9031029658
        })
        numberDays: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'success [input here api field description]',
            example     : 5550074760
        })
        success: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'cancelled [input here api field description]',
            example     : 6117634367
        })
        cancelled: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'delivering [input here api field description]',
            example     : 5703147917
        })
        delivering: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 8987438165
        })
        error: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'holding [input here api field description]',
            example     : 4154433634
        })
        holding: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'toBeDelivered [input here api field description]',
            example     : 9040643967
        })
        toBeDelivered: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'waiting [input here api field description]',
            example     : 2545784510
        })
        waiting: number;
    
    
}
