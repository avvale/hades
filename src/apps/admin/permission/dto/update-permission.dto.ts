import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '5524b000-a998-4723-b0d4-88bb5a6c5afe'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : 'c2fef42e-87b4-43e4-a824-f4540d012912'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '17uv55a190vgvb9ee1e11c4b74t6wujm4gwclj89y89jqlf6orwgbcoyeuqlkpjsvlmf6zj4vxth6dfe7busrofo9nl9bri7b8ba5ukpbyr24w168gkti7fosahqfxp7tiz5iwpzlcrgthfevhwpglneiualg0n8u34yf8t7p11n7vzq2ozjzixf00nnure18bul74rqjh8m9moibqibk71earyu00ic6oke4kjf7puqqjp9ln1yxb8l8dcqxfz'
        })
        name: string;
    
    
}
