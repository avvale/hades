import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '683f4d32-cd49-4dea-bd4a-093cad48e11b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : '1a6225ad-8326-4229-9682-6db7f2205498'
    })
    accessTokenId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Facilis amet et sit error dolore sapiente odio ipsum assumenda. Autem eaque earum nam. Accusantium at porro odit ipsam doloremque voluptas vitae molestiae nam. Perspiciatis in est neque nisi ad.'
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
        example     : '2020-09-21 01:58:13'
    })
    expiresAt: string;
    
    
}
