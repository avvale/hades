import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageOverviewDto 
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
            example     : 'maune8oydlc3xeqjzskt'
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
            example     : 'DETAIL',
            enum        : ['SUMMARY','DETAIL']
        })
        executionType: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'executionExecutedAt [input here api field description]',
            example     : '2020-07-21 14:31:14'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-22 00:24:42'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 03:52:31'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'numberMax [input here api field description]',
            example     : 6469175345
        })
        numberMax: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'numberDays [input here api field description]',
            example     : 6490406327
        })
        numberDays: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'success [input here api field description]',
            example     : 7088418840
        })
        success: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'cancelled [input here api field description]',
            example     : 9766913657
        })
        cancelled: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'delivering [input here api field description]',
            example     : 7219466452
        })
        delivering: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 7519386823
        })
        error: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'holding [input here api field description]',
            example     : 5908267089
        })
        holding: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'toBeDelivered [input here api field description]',
            example     : 1634360808
        })
        toBeDelivered: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'waiting [input here api field description]',
            example     : 4989440344
        })
        waiting: number;
    
    
}
