import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ue2obnpl6z25osesz312w0cvzai3drs372yf5b1i9x31h4nukzc9bydtvbeznm5xz0bq58kqzmopxzfsyk4nhjfagi60se3qx1cd5egaeorputsuep4nz7y9mowa6bmvp4lse4epgnozjahhdfboan63k0mqm1b8b7p7jy21wlz0iue3j80ogtiz16352zhoxjml35t0eayhhedoflwfpk23q4a551h9h61c15xhkwtgu8f1mjcckox6y60rpke'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'dry0liv8wsaq4vfmxvklskbh2q834lvceygfw4057k70bozp30'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'mpx6et2o4sts3xwckk00hk8r4ibhzju28p5iru5bxi0y6jlwerfs1nyln6l6jkcp3xoqgli20pbysrupe172l7ckns'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
