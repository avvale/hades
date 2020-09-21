import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto 
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
        example     : 'Omnis nemo ut magni. Rerum impedit laborum similique rerum facilis. Id delectus voluptates. Accusantium a voluptas veniam hic nulla corporis similique odio. Sunt corrupti soluta sed quos aspernatur voluptates nam voluptas qui. Omnis explicabo aliquam maxime laboriosam illum ut ratione tempore.'
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
        example     : '2020-09-21 05:56:41'
    })
    expiresAt: string;
    
    
}
