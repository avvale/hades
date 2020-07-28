import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ee2ec066-2095-43b3-a52e-ee27e875b631'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0z94fy0683jpd637fj1nqija08k39ctpo1o0mkcj72t27i40gq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pv1hiaitu1e5pculg99d'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '0873e815-76bb-49bb-baba-2af0e6b0530a'
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
        example     : '2020-07-27 23:36:08'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 07:36:19'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 17:19:55'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 1947525967
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 6466313681
    })
    numberDays: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 5924413499
    })
    success: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 6175324994
    })
    cancelled: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 7868077129
    })
    delivering: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 4689253209
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 6673001931
    })
    holding: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 1152270941
    })
    toBeDelivered: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 1013353802
    })
    waiting: number;
    
    
}
