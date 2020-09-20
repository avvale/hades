import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDto 
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
        example     : 'Enim quaerat similique aperiam omnis ab tempora quos animi nam. Corrupti quo nihil facere sit quos ab. Ipsum accusamus dolores. Ut molestias qui sunt autem soluta ipsa necessitatibus.'
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
        example     : '2020-09-19 22:58:54'
    })
    expiresAt: string;
    
    
}
