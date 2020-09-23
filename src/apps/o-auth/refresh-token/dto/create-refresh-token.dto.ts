import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDto 
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
        example     : 'Quisquam numquam nihil excepturi suscipit sit aut. Ut ab id inventore ut voluptatum. Sunt et occaecati officiis qui expedita. Est eos voluptas. Cum et aliquid et rem quae sunt placeat dolorem. Qui debitis veniam dolor.'
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
        example     : 3784927276
    })
    expiresAt: number;
    
    
}
