import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '1b503db2-81ee-4471-9ade-b9e1fd85a745'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'uk7881m9x5syf9avqlui8vur151umc0nng09fjzmnusmkc5x7juwv2ywuj6odfsw80e7m49w7i5i01ndkf5013l9v6batmahv1ky8hu3haslr9a10wn7nezsng4j55qajluqgf1slmfvf6l8qne0391i69smmz7s6di4yo7so6rreis0g406snm64lyzlkfsi1auw4ksxcteqdjmj0b8iaejkivuo0ypaltaljskc0dve6n7u3k513a5i3bm68z'
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
        example     : false
    })
    hasAttachments: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 00:01:23'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 14:59:30'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 09:34:29'
    })
    deletedAt: string;
    
    
}
