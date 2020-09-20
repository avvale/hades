import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a744b29b-0483-4a8d-ad34-f34bf2ebe040'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : 'b8d3db3a-2583-4735-b934-145d0d19bc5b'
    })
    accessTokenId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Natus quae dicta aut qui. Non possimus minus. Minima maxime et qui. Accusamus eos voluptatibus voluptatem cupiditate culpa soluta accusantium ea. Sint eos tenetur et voluptatem necessitatibus tempore voluptatem.'
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
        example     : '2020-09-20 16:02:42'
    })
    expiresAt: string;
    
    
}
