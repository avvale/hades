import { ApiProperty } from '@nestjs/swagger';

export class SummaryDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9a8c9eba-8693-4291-a6ca-290ed515da45',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : '2a71fa2b-9564-4990-b3fd-502329dcafd1',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c44947ed-9e4b-4896-99f4-b2d2466a0878',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessAt [input here api field description]',
        example     : '2020-07-09 06:47:05',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    accessAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 6934302108,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-08 20:20:54',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-09 12:03:48',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-09 05:52:23',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
