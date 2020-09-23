import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fccc7357-a0b1-4e74-8890-825947f99c5d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '4e0fe39a-79bc-4ee9-a008-2120c9c4d2d1'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Pariatur et nihil esse quisquam eius. Voluptatem et perspiciatis esse sint nisi magnam beatae. Natus quidem necessitatibus recusandae voluptas tenetur perferendis voluptatem. Qui accusantium cum qui ratione aliquid.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'sgegy8ni0slpjah4xp9qmutaukb8s8b4v5dmevbrpvazrmsw48fg1q7sbqx5tf5zhg4szgllqq566i031uks3aamk40wd5igt9vgig3u4qw80mtmw1jk9qhxulaopstwzblqyrbllq8jg2l8t45r3vw3b1alrg20mggpvt0w9mwsxaoq7ndvekomcqejvx049qo1yey8et9qiebi9p6eeriiz0zr7p7b0eriwhu05n2cvgcuql21i79wp20c0nc'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiresAt [input here api field description]',
        example     : 8160420525
    })
    expiresAt: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-21 12:56:47'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-21 23:36:35'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-21 11:01:41'
    })
    deletedAt: string;
    
    
}
