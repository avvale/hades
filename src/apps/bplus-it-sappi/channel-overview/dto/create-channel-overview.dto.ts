import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelOverviewDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd2e57786-cab5-4cd7-93d5-ab389176327f'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6bfac8e7-9f23-4787-a11d-4e149ae53ef3'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lz20qpj5t4s07wgrxv0s'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '599b5f70-345c-46d3-9938-f9f3810380c4'
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
        example     : '2020-07-01 09:11:25'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-01 10:54:23'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-01 01:12:35'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 6548312607
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'inactive [input here api field description]',
        example     : 7760159685
    })
    inactive: number;
    
    @ApiProperty({
        type        : Number,
        description : 'successful [input here api field description]',
        example     : 9887573179
    })
    successful: number;
    
    @ApiProperty({
        type        : Number,
        description : 'stopped [input here api field description]',
        example     : 9021969339
    })
    stopped: number;
    
    @ApiProperty({
        type        : Number,
        description : 'unknown [input here api field description]',
        example     : 5896340959
    })
    unknown: number;
    
    @ApiProperty({
        type        : Number,
        description : 'unregistered [input here api field description]',
        example     : 1956890318
    })
    unregistered: number;
    
}
