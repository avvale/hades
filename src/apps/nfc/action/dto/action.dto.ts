import { ApiProperty } from '@nestjs/swagger';

export class ActionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c8c8ffb7-a2f6-40e5-9510-780dcefd036e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : '2ff08fc5-1866-4a56-9d0d-39383d9c4e38'
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'MULESOFT',
        enum        : ['CMS','ZAP','TCI','MULESOFT']
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'sectionId [input here api field description]',
        example     : '5a75015f-af05-4611-b047-7bd15e670544'
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
        example     : '2020-08-03 17:41:50'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 15:29:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 13:58:54'
    })
    deletedAt: string;
    
    
}
