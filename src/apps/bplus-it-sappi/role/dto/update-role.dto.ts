import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '36b92846-24ba-40e2-9cf1-19c0a571f5bd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'mi5th6cdezd5dcumendvdo3u94kfqum4euqloaxme2vw838mb6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'e9wm3z9w68z836hhikjhlsq0zf7g1js63ns4f6fhdokfwlc601kq7m6rjerq2pzl4spm3ljo8p1dxvmumlws2b08hj6hhdlaqp5eqpg157akvzzh9va8utnktf0b4dhwu4l5feuabtcip9bj579wirsjcvl2krj8xkoh377stkneaqlkdbdhkdajph2ilcgxyfg21vq5dsh3512hujonyn25nt9jsghkdtieu08bkxllubbhip917y1w9jpk0qz'
    })
    name: string;
    
    
}
