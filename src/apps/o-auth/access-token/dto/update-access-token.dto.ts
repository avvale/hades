import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'aca2f62d-123c-4830-a6b8-828c4d95b661'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : 'b2cd938f-6b5a-401e-97cb-e78355e4b54c'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Fugit quas porro totam ab officia sunt omnis dolorem officia. Doloribus veniam ducimus natus pariatur eum repellat deleniti minima qui. Est qui minima ut quod labore.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'iw32ckqz2ams6v1aduw5zle6b7irmjyaxiqpmn6v29brofmggk3mktnul6v495ltsp4k3wzt7ljrer6ojvip2b01omwz3jncknvugplqfrc8ym3yc1tv33u28123yb3nkwbmojrqmdgfrwu0sl6y8wijs46ufv7j8j2g6tonf6jja7x0oqa3vskydefltcg86zi832b5luc4kj1y6xhmy71kt1be2hxao3wch13a44sjgmqrqj7hy5bhqombq4u'
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
        example     : '2020-09-21 00:25:37'
    })
    expiresAt: string;
    
    
}
