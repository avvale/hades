import { ApiProperty } from '@nestjs/swagger';

export class ActionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ee7fd538-50e8-4cc3-b7ac-5fe18e396ee0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'b21327e5-d59d-4392-8109-3415bf7f4f80'
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'ZAP',
        enum        : ['CMS','ZAP','TCI','MULESOFT']
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'sectionId [input here api field description]',
        example     : '02ebdb92-d2a2-4f32-92a8-1ee141200665'
    })
    sectionId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 18:01:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 16:55:10'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 12:21:22'
    })
    deletedAt: string;
    
    
}
