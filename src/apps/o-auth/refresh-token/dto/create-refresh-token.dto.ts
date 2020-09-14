import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3795df05-dcf1-4ab3-a3a8-02049c431235'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : '13a96aea-93c4-492b-989f-0a1632200516'
    })
    accessTokenId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Commodi aut iure provident maiores. Deleniti et natus quos occaecati deserunt quae. Explicabo eum voluptas doloribus. Corporis et vitae cumque ipsam adipisci eum. Quos in error commodi eum aliquam ut quas. Voluptatibus aut error ut.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-14 16:54:24'
    })
    expiresAt: string;
    
    
}
