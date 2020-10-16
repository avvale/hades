import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b30c4db4-532f-4c64-9261-0c5eadedd580'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294'
    })
    accessTokenId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Dolor omnis amet molestiae soluta. Fugiat at ullam dolorem corrupti ipsum harum. Aut et voluptas sed ducimus id sunt. Porro veniam explicabo error inventore natus occaecati dolorem itaque doloremque. Culpa iure quos quia vel.'
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
        example     : '2020-10-16 13:35:59'
    })
    expiresAt: string;
    
    
}
