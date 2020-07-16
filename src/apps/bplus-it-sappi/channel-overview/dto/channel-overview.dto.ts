import { ApiProperty } from '@nestjs/swagger';

export class ChannelOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '22fe1091-7078-4c95-b84b-94402647016b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'sdna1lg50yeq6jcits37',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 07:54:19',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 03:32:15',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 17:00:15',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 4794281978,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'inactive [input here api field description]',
        example     : 5520007567,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    inactive: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'successful [input here api field description]',
        example     : 2631574622,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    successful: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'stopped [input here api field description]',
        example     : 5395618969,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    stopped: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'unknown [input here api field description]',
        example     : 1517496144,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    unknown: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'unregistered [input here api field description]',
        example     : 9285050314,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    unregistered: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 16:05:56',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 04:42:04',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-15 21:39:55',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
