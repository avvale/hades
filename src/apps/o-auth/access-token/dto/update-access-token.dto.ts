import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Rerum ab odio non est nisi. Qui dolores perferendis accusamus ab excepturi ipsum. Quam iusto ut commodi et corporis qui eligendi impedit rerum. Consequatur iste neque. Repudiandae doloribus distinctio molestiae sunt ut sapiente. Labore omnis reprehenderit hic nemo deleniti similique.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ex94dctfqj9xrdxcd5n20cx0ux786z2gdcwozsvzyw4fszdvjibeaa1jxrwglzrhquxbqcb9mz9qynmujxxdjf1cfy1ubieyvpqje0d58yoh4y0096rw0h60rrvz9wpmixjr2mhob1k3dgoi06wjgwxmg2ejfvz31j764gn2hlbyjpzutct0zs4oa6ld8ev1dxtsih33y17ip7r3vaw2fa50imaac7b3cfeto8dbuff87u73nly0begvkpsnesk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-20 01:40:48'
    })
    expiresAt: string;
    
    
}
