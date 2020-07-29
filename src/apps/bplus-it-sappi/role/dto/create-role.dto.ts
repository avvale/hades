import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4714a3fa-28f3-4057-a74b-e64cf9a9df55'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd83bbfe5-040c-465a-91b1-e0fd147d68f2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '2omixvtld4fxk29ru5ux9vpvcxsa79jahsqy0agd5y51b0yi10'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'akt7vt158dub4vq8x94v0x1ygn6c9nbhi4un4c00yftjdsoz69snkp2krlfiw3whfc0svj4hodfoqxwrl7jdcn378se1x3lhbne405hizw9hbixghb9a9727uixxvmjw9v68rnm5exe4jbhxdytv3mvjxtj6f42fyg273qp4rvcpjw7fd648f05q3419qw37z7rp4w5lkqn88vk8mm8wfu3r0dvdrm468r0t44u7udif491nma9a6bcrvlxz875'
    })
    name: string;
    
    
}
