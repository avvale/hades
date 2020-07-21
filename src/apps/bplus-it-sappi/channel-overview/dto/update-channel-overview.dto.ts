import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelOverviewDto 
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
            example     : 'wz9ogqv3enk6aswij854'
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
            example     : '2020-07-21 11:31:58'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 16:14:59'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 12:38:53'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 5357298870
        })
        error: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'inactive [input here api field description]',
            example     : 2541336262
        })
        inactive: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'successful [input here api field description]',
            example     : 3313483670
        })
        successful: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'stopped [input here api field description]',
            example     : 9853231206
        })
        stopped: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'unknown [input here api field description]',
            example     : 4683271457
        })
        unknown: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'unregistered [input here api field description]',
            example     : 6543746294
        })
        unregistered: number;
    
    
}
