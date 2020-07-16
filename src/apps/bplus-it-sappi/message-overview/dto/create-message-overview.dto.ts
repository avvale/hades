import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageOverviewDto 
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
        example     : 'ho9we9v2i06wrvheh4jq'
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
        example     : '2020-07-16 05:04:30'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 00:23:57'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 14:40:49'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 8103582304
    })
    numberMax: number;
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 6988620282
    })
    numberDays: number;
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 4567717812
    })
    success: number;
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 5155767143
    })
    cancelled: number;
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 3243290372
    })
    delivering: number;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 3306413327
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 6843683553
    })
    holding: number;
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 2507551457
    })
    toBeDelivered: number;
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 8569227483
    })
    waiting: number;
    
}
