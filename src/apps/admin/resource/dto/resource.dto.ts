import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
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
        example     : 'or8x8tkwcvggy6exbzhot8i92qvr6wib8xhly5o3qa5gv0iws9s1bawt5md07bklrt3h4cnhi71utadi2jv1c0cgeyb3ochtbtd1grnmvte8r4iwmwy8qtut5b1jfzpzo82jhtlbp5a8cqyom6a4bl7bf2x97urnr3dxy24cmdi855zvofsel74bevqc4cgutaotqce6d8dix773urvozit5el66zes43vgzzrgj5guunlqiy30bpbpssnz9tv7'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 00:00:11'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 02:16:25'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 13:47:19'
    })
    deletedAt: string;
    
    
}
