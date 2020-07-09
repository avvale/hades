import { ApiProperty } from '@nestjs/swagger';

export class ActionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f61efb8a-207b-4376-bb49-81097dab62ef',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'a4ab133d-6481-43dc-a678-2f2fb61ec42c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'CMS',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'sectionId [input here api field description]',
        example     : '20975c4a-e020-456e-bed7-d00bb4ba058d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    sectionId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" },
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-09 05:09:20',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-09 00:55:38',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-09 11:22:06',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
