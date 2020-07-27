import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eefb8178-ba66-429a-a32a-c30a1c1fea44'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '83bc9cd1-f4f5-471b-ad36-614e22528735'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kwfv7uxb59n8cuhs85ymco3ieoa3xvg32dynuy0c3l9p43kwc5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'f1qb6c3yb3fezacwonupqxv3p2n04z5gf6behgrpulmotp67cyutasea4qbyci6gp6000ic79n25qt9ay6znq9xaup4hbvatlwt7e2j736clthmi96udgnnzyg9b76eh9uc9ntkjb65j12rpzyvx5nb51ffs2jwrp9msw16ux555ov0smun7zviu4fr6q0eihyvd2wpjp1t3v36e5vjeas6frz4mi7o0wjdpdi1t9jh888rzfkyy45e6e7q1u91'
    })
    name: string;
    
    
}
