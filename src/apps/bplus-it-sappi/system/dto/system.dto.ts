import { ApiProperty } from '@nestjs/swagger';

export class SystemDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '585253e3-dd6a-496d-a067-168ee65c3167',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd24ee6a8-6252-4bf7-aae0-c54258e58abf',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'r',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '3',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 'a',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    environment: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'r',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'cancelledAt [input here api field description]',
        example     : '2020-07-16 08:31:51',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    cancelledAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 16:53:55',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 10:05:28',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 18:40:57',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
