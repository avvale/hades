import { ApiProperty } from '@nestjs/swagger';

export class ExecutionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'SUMMARY',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '2020-07-16 06:42:04',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    monitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-07-15 21:44:57',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    monitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '2020-07-15 19:53:06',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 16:57:27',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-15 21:28:48',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 16:31:46',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
