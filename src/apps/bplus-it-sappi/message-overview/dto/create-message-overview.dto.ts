import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4b9751eb-76c3-400d-b329-d5d666b686c1'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ec544f78-ff3d-46ab-b4e4-ed2d4ebc1312'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'aazyenqujs7xubvy4zy81s7o51uem5h6ix2ekbn9xfq9x0f8dh'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9dae9920-e24c-4409-ae76-758f18f2a232'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'unz1fxmexj0xtzpqxnjf'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '75ea7065-f3a1-49f5-b4be-6ab9903268a9'
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
        example     : '2020-07-29 02:40:05'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 23:26:18'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 21:07:44'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 7863258206
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 6551415761
    })
    numberDays: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 3003122400
    })
    success: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 6600731617
    })
    cancelled: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 6705082203
    })
    delivering: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 4042102906
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 5797085211
    })
    holding: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 4377316082
    })
    toBeDelivered: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 4929188939
    })
    waiting: number;
    
    
}
