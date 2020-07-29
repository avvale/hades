import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '627c5997-66bf-4e3d-80f6-7a26763a2ebf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '17b0817f-fbe8-41e3-a7d2-061e71833fb3'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6ab6mlqcx2km0it3yt2ru8yngawviwse5faglzczizmptqyxqz7scia3cyub7go3ac0zpxz5zrjtlpj4c5tatnrh8bx6ev7rkpw5d9vkbql03ty1x4wk3lkomyi6hputv2hk0xl4xbxsmnd21vr8qrp9u2jq8uc2yhusge8v5c5gamc5fnfi9nk8568irjz9l7jwtk251bqrdfho8t0pvii9q9xfcogpnsnl96e9hcvsg5e8b2e3kgc5nr1txgq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 16:48:17'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 16:20:23'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 01:26:31'
    })
    deletedAt: string;
    
    
}
