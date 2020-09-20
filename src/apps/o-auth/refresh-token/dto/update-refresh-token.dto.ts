import { ApiProperty } from '@nestjs/swagger';

export class UpdateRefreshTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b160900a-ca08-478c-a564-7425049b2ffc'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : '9b230849-92aa-4f0d-8137-c4cb9e78216b'
    })
    accessTokenId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Molestiae cupiditate veniam tempora enim porro. Earum optio occaecati. Quia libero omnis optio sunt numquam esse. Ab molestiae vitae necessitatibus nihil totam deleniti placeat aut.'
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
        example     : '2020-09-20 05:33:26'
    })
    expiresAt: string;
    
    
}
