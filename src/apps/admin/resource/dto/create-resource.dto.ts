import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eb375bd5-0f7a-4b15-b617-8ace4437c646'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '14e8adae-7ae9-4146-817e-36f43618ad8b'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7e0ibrerocux62gpkv3i9t5q9y5m5dsjgspx55bd2it1vibdx27rw200mgykthwxkw0ifys7vii1taii23qcr41xrwmbmhtx6owism6suwk6zmzoepfrngic00wjicfqnxy7szswzli19z8bzv34q4ayswt7y4gcu3jwol5679tir39zxbwxdpp6rb95za9upr4e2s2q7g82emne576b0t4r8icvuj4ky7iy92fpt4tlb4k7v97sdfz1jowe97y'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
}
