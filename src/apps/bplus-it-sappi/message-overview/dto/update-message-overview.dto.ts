import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '80b21a44-24ca-46aa-9f53-b7ebfbd59de3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '346ca728-9a20-4eb0-a061-03298256aab4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6tfchalah68l9aq7za0atr3r838aj4oiyjb4lzooyade8yx7wq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2591ba4d-ad3a-437a-b543-34e7e4337f36'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ejkbefq5iahlq9pjmqg7'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '86798d05-55d6-42e5-8556-84f5d7edc151'
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
        example     : '2020-08-04 06:03:10'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 16:39:58'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 15:20:36'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 7079464113
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 2128184098
    })
    numberDays: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 6206606611
    })
    success: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 1401515689
    })
    cancelled: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 4062514906
    })
    delivering: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 2186048677
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 1281911427
    })
    holding: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 2682054069
    })
    toBeDelivered: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 6849283642
    })
    waiting: number;
    
    
}
