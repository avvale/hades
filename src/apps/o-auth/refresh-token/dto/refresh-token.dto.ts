import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fa882740-a5d9-439d-a307-836b703a53cb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : '32dbc1e8-5603-41b3-b61a-0c15a65f827d'
    })
    accessTokenId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Consequatur aspernatur cumque error et aut voluptatum non commodi aliquam. Eligendi necessitatibus et consequuntur vel. Enim perspiciatis molestiae et hic mollitia. In cupiditate velit totam modi qui asperiores dolorem doloribus. Eum sapiente vero inventore magni laborum.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-19 02:18:27'
    })
    expiresAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-19 02:31:03'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-19 22:03:28'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-19 14:15:59'
    })
    deletedAt: string;
    
    
}
