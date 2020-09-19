import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto 
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
        example     : 'Et reprehenderit iure corrupti qui beatae beatae. Tempora quia at eos qui cum maxime. Magnam illum est assumenda consectetur et voluptates non laboriosam ducimus.'
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
        example     : '2020-09-19 04:18:39'
    })
    expiresAt: string;
    
    
}
