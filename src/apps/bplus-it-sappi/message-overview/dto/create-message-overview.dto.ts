import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '15225072-4e52-48a1-9ce6-0b83a791f2ac'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'eaa8d916-2def-4953-aae4-a1607af92731'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'j4vvicch3ur1qcr1mlqhnx3l4uu8rt327qnpstq9vmuqtti0sn'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bc0dd0c1-f72c-49aa-8953-b03318252802'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '71xip1eqg3pcg3p0myfw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'a28d2fac-fea7-48c8-86b1-50f8724bb6a4'
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
        example     : '2020-07-30 18:02:47'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-30 16:38:43'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-31 01:57:20'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 3625848580
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 5475450513
    })
    numberDays: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 6641923219
    })
    success: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 5756862653
    })
    cancelled: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 2984920632
    })
    delivering: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 6762883903
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 2909803284
    })
    holding: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 7035723707
    })
    toBeDelivered: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 5150282775
    })
    waiting: number;
    
    
}
