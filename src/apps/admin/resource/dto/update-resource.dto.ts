import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
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
        example     : 'dh74pmxgchcyu7ctgw36ze2tb4bc25al5rh7qk3xgsivldsjgqwq1ncann4rovrkcz2no30bmfxjc6qystw7crjtu01a20vxpgydh2ytu85kvabrrg7qz5u5u0du2a50njlegre9oi54w4nf8o3phly48qvwz11jq0g4nqupoeesh2fc5beznsw4vukhjif7gkz4jg01b1paiw5o3gg81fpqh5p64nack4x3lekeeinjyi4dnax4yffqwdn4bx5'
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
    
    
}
