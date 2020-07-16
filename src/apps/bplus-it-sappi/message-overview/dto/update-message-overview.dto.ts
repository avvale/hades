import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageOverviewDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ff252981-b0a8-41f8-b442-a157a8b14a57'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'sioo5vmkgdt8uzb3xey9'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '04ca9210-8f45-4142-b0ea-ee390fdd1b1e'
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
        example     : '2020-07-16 03:32:34'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 15:10:08'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 19:34:58'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 2649679867
    })
    numberMax: number;
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 2962864741
    })
    numberDays: number;
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 3126284874
    })
    success: number;
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 3801206039
    })
    cancelled: number;
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 5029543762
    })
    delivering: number;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 7514481146
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 1563125339
    })
    holding: number;
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 7346318012
    })
    toBeDelivered: number;
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 4953829108
    })
    waiting: number;
    
}
