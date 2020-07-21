import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelOverviewDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '423d8a3e-2701-4236-ad44-c3167fcb5691'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '7373cee6-d316-4085-8f27-ab48d3e74d6d'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'db96dfe9-46bd-412e-af3b-dde8988d644c'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : '3c0iztr67m661o2j4ktx'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : 'ac24879f-862f-4b27-af72-47ce34cfe605'
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
            example     : '2020-07-21 23:33:39'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 07:10:22'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 21:51:26'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 8440549320
        })
        error: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'inactive [input here api field description]',
            example     : 2192197566
        })
        inactive: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'successful [input here api field description]',
            example     : 2751614198
        })
        successful: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'stopped [input here api field description]',
            example     : 5138627477
        })
        stopped: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'unknown [input here api field description]',
            example     : 1604510188
        })
        unknown: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'unregistered [input here api field description]',
            example     : 5084830810
        })
        unregistered: number;
    
    
}
