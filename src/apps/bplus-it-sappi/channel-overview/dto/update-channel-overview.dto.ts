import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelOverviewDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'd52a7f7c-8be8-4fae-93a5-4d939ec53e8f'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '96060f6f-f09a-427a-8114-2e696696decd'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '6a93db02-d7e7-4d16-90dc-fcff0b205949'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'karx6n8xz9h44wio31oe'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : 'ac0e7279-193f-47b7-8223-591dee3950b1'
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
            example     : '2020-07-21 03:34:35'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 12:51:02'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 18:01:23'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 7381302931
        })
        error: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'inactive [input here api field description]',
            example     : 2035229081
        })
        inactive: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'successful [input here api field description]',
            example     : 4578651334
        })
        successful: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'stopped [input here api field description]',
            example     : 9402198467
        })
        stopped: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'unknown [input here api field description]',
            example     : 1893221276
        })
        unknown: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'unregistered [input here api field description]',
            example     : 4993948186
        })
        unregistered: number;
    
    
}
