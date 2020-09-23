import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8559b4e4-2415-4bfa-81db-93fcfe1301ab'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : '3d8b9362-6236-43e7-951a-f7942a6b78a5'
    })
    accessTokenId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Voluptate quam similique id laboriosam odio. Occaecati ipsa totam. Nam quibusdam voluptatum. Voluptatem non repudiandae et nisi autem porro tempore.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiresAt [input here api field description]',
        example     : 7733473835
    })
    expiresAt: number;
    
    
}
