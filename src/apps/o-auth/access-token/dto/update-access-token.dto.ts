import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '627a36ef-faf1-4221-9c39-940293e6ab79'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Cum autem eligendi corrupti quaerat in eveniet sint. Sed ducimus voluptatem vitae odio similique sunt est et illo. Veritatis at consectetur accusamus ipsum a et laboriosam.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '28rtvuttozil1wadpgvfvqshs5zrulbl1jadqu0j9d1c3dvyqpuxpipj7b8nddpw9ij6n5v5fui5exlrscd9uf1d92xefmfyqxsumrxa5mbq8exmu4gfhvlezxg5h03auxwbii1l5ovcl5dy3y421uhmxwj0r0mbi6b0ocq1we79bocc0tnsa4s50czgahbo5l2puub68hdrsci8ll7pynn5v1ophczvx9qz48n6v6dvifhr3kg0dbyphkwpsxo'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-20 04:55:45'
    })
    expiresAt: string;
    
    
}
