import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Consequatur aut earum doloremque et vero. Incidunt voluptatem cumque sit doloremque fuga. Dolor et nisi esse voluptas veniam libero dolorum provident. Dolor non architecto commodi officiis aut hic. Id sint atque est.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8aacnkg6iyzged5rmha6yko9iq39z9cj48y4cdcvmfx2c1j8ges9a7vw81tyxaovto74qvj1sijo7yd5hjs7vqqbttbnzk2mv65im986tzwourpkj1li38bjyldxq74lnmi1rvbk0em8thwjp8f1nnlhdknu6lzxr8zfrxj8tek7bvbvi8796r81ks7tntr8li9ihzlip92n9dyl9x8j9sxvbcav2vq9vks67fdgry80mopsarit7lhmxuhed1k'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-14 11:04:12'
    })
    expiresAt: string;
    
    
}
