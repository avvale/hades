import { ApiProperty } from '@nestjs/swagger';

export class CreateActionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f61efb8a-207b-4376-bb49-81097dab62ef'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'a4ab133d-6481-43dc-a678-2f2fb61ec42c'
    })
    tagId: string;
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'MULESOFT'
    })
    type: string;
    
    @ApiProperty({
        type        : String,
        description : 'sectionId [input here api field description]',
        example     : '20975c4a-e020-456e-bed7-d00bb4ba058d'
    })
    sectionId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
