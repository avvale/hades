import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '868748f0-5009-43ad-b304-a067b09d79bc'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '315fecba-e580-4736-993a-142d44ac0206'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9ovbe9a37nzgydk32gpbmnm7ixvscxa3geww52ks46l5drc126'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'jlyidop3b56aaw2ydghxfrvnb0c0bhmpibx91wx7wxh8yjt3b1aaix4kafvk7fdswzwn4pu27j5ejmzqgxcc8sj1uubbs0foa1auhaj9sbhpi314wssg0gktnc9bth82ulgmwtfnb3uz133ub7wy1vvf7jjer8g1oyc3i40lsxyvow8nbzc7ou4dasd4tor73e5m1psr3he65fqx7kzhdev7m3kmtavf595wyxhklaujwv3zi4f4bpp2b9slu8w'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 05:24:52'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 16:41:19'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 13:53:26'
    })
    deletedAt: string;
    
    
}
