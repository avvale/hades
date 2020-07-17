import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelOverviewDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bfaac914-73ac-45fc-9c74-2b64d6df0ffc'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a7051b5c-5600-4eb2-88a5-db0d04762c01'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1340cec3-fbca-4131-8fba-c1a2a7fb826c'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'rye6rullx6o73hot7alj'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '816dc44c-9607-4cdf-a859-465710286163'
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
        example     : '2020-07-17 13:31:30'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-17 07:29:23'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-17 12:00:30'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 2030240320
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'inactive [input here api field description]',
        example     : 3778055146
    })
    inactive: number;
    
    @ApiProperty({
        type        : Number,
        description : 'successful [input here api field description]',
        example     : 9813857548
    })
    successful: number;
    
    @ApiProperty({
        type        : Number,
        description : 'stopped [input here api field description]',
        example     : 8676241270
    })
    stopped: number;
    
    @ApiProperty({
        type        : Number,
        description : 'unknown [input here api field description]',
        example     : 9239258781
    })
    unknown: number;
    
    @ApiProperty({
        type        : Number,
        description : 'unregistered [input here api field description]',
        example     : 6010607854
    })
    unregistered: number;
    
}
