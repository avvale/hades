import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageOverviewDto 
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
        example     : 'l3t0mqzgtojiqideapdu'
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
        example     : '2020-07-17 16:09:46'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-17 06:50:13'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 18:16:33'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 8587954202
    })
    numberMax: number;
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 4771294963
    })
    numberDays: number;
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 1507392083
    })
    success: number;
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 3331054375
    })
    cancelled: number;
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 5881566523
    })
    delivering: number;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 9677288674
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 4223320173
    })
    holding: number;
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 7371926647
    })
    toBeDelivered: number;
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 9651731355
    })
    waiting: number;
    
}
