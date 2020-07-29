import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '82de173d-4131-41ea-b965-15c2ed26f75c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '4f6e89b9-a871-4aa3-bfd6-427dc76c3499'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5u2r3je5893qt3ef7qgehv8a54dtplpq38p4w6z6x97oxzvg01a5p1w5uaz1utfsyshw2nzvjf40ejjuuxq35dn3d4im1nvf30dbxd5cppukylugzalr14mok5ji2vw0wocf7q7lh39rk0v22ej80s0hdq4gh6k8sl5dlkryz52s8ms7trup5uthfuyvnlvgrk9iruf1xkd76jkua2xxucub9405xzvxmz5f4jji1mtfkjwyb7vzn0m1t6w07cl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
}
