import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageOverviewDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '4748233b-58ad-403c-af15-a50883004ad7'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'b134d494-8c2f-4a8a-b09b-5eb46bb7bf35'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '6c312827-8454-4b70-a629-29d8ee54e684'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : '0021ouw1040q3t0mlanu'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '0b59269a-5fbf-4f9c-ae41-985a5712b85b'
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
            example     : '2020-07-21 10:54:56'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 08:47:38'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 16:22:30'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'numberMax [input here api field description]',
            example     : 9648829950
        })
        numberMax: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'numberDays [input here api field description]',
            example     : 8628027952
        })
        numberDays: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'success [input here api field description]',
            example     : 1909107081
        })
        success: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'cancelled [input here api field description]',
            example     : 6552235276
        })
        cancelled: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'delivering [input here api field description]',
            example     : 6020062135
        })
        delivering: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 5879516054
        })
        error: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'holding [input here api field description]',
            example     : 7497611360
        })
        holding: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'toBeDelivered [input here api field description]',
            example     : 2493507725
        })
        toBeDelivered: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'waiting [input here api field description]',
            example     : 6872900710
        })
        waiting: number;
    
    
}
