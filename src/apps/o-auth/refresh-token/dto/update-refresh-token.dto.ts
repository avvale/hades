import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto 
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
        example     : 'Et ea ut quos amet animi quia molestiae iste. Quibusdam est alias. Nihil officia sed et sunt natus. Ut qui hic accusantium autem aut ut voluptatem neque. Soluta repudiandae sed libero enim.'
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
        example     : '2020-10-16 16:50:53'
    })
    expiresAt: string;
    
    
}
