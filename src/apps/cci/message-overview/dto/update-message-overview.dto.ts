import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eec03da5-a062-4920-969e-fd56ec436bac'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7ba4047a-ef07-476a-95a9-9456edc3771f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '1s01z8q6ixi7br8t68nvahoia2ugy0ct0edvpje1juixiyot18'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '70fffef8-1721-4cf6-b9c7-cc090a2d6fca'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'yyf916kzd9zr9kzgy6ao'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '2f6ad9c5-9a84-465b-ba6c-e7acc01c8ab4'
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
        example     : '2020-09-19 19:07:15'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-19 22:00:52'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-19 20:35:23'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 7627366029
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 3318537708
    })
    numberDays: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 4580799027
    })
    success: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 8841760972
    })
    cancelled: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 2797087054
    })
    delivering: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 6008302624
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 8312726836
    })
    holding: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 4731280188
    })
    toBeDelivered: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 6259989104
    })
    waiting: number;
    
    
}
