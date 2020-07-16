import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelOverviewDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '22fe1091-7078-4c95-b84b-94402647016b'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f2885c4d-07d4-4da9-b984-dbe901ad0713'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'an9atktb17stprckuz20'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb'
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
        example     : '2020-07-15 21:34:21'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 14:39:14'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 00:55:10'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 6782067537
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'inactive [input here api field description]',
        example     : 9494350041
    })
    inactive: number;
    
    @ApiProperty({
        type        : Number,
        description : 'successful [input here api field description]',
        example     : 2244571228
    })
    successful: number;
    
    @ApiProperty({
        type        : Number,
        description : 'stopped [input here api field description]',
        example     : 1303119501
    })
    stopped: number;
    
    @ApiProperty({
        type        : Number,
        description : 'unknown [input here api field description]',
        example     : 9381686204
    })
    unknown: number;
    
    @ApiProperty({
        type        : Number,
        description : 'unregistered [input here api field description]',
        example     : 1790314967
    })
    unregistered: number;
    
}
