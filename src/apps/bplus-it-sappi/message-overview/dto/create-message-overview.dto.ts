import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageOverviewDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bb588cca-e74a-4f2b-931f-2ef29ba22388'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89d17be9-5aa4-4294-9c4a-90bdfd97fb79'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'e66ba1b2-2152-4b5d-a44e-a6d81a519524'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'u7xbaa3os7u8iqjmz79u'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '9f6a4a47-76c5-45d7-804d-93df9fb23010'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-17 04:35:36'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-17 04:44:13'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 22:20:50'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 7013159521
    })
    numberMax: number;
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 1914448402
    })
    numberDays: number;
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 6480641544
    })
    success: number;
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 6199491218
    })
    cancelled: number;
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 9354324587
    })
    delivering: number;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 6082074689
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 5225680849
    })
    holding: number;
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 6541725411
    })
    toBeDelivered: number;
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 1610654187
    })
    waiting: number;
    
}
