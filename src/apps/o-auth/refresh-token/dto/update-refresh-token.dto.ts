import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f7c89e63-d17f-4ecd-a624-5631fafb66cf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : '3c444d6b-1e50-44c3-a691-1b98c728aec2'
    })
    accessTokenId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Ea natus doloremque qui voluptate autem at quibusdam officia. Placeat omnis rem aperiam et eius qui odio sint. Impedit et ratione ad sed officiis minus nihil.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiresAt [input here api field description]',
        example     : 7848930626
    })
    expiresAt: number;
    
    
}
