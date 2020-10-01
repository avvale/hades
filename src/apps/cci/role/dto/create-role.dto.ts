import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
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
        example     : 'ul0mj094i08bcxttzji4blzxavn5yvphukowfh8umknk8v1pyx'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yqhsuk8eb5jxgdbpbj7p8ysxengqu1qg2jfg88kk83q3v6mkzqdv045ep0sbvei0ruqiiwuzc2vx2txnhywabgg4erfuidb3psrtf7robk15852c3lvre5badnkw41ooyt3wky261raay7ckxng684fr8rp48rpl061yccab9bj3v9qv39a5bg4683bqm47ay0r8189z1tp62lvvi56ed7li1dgrf51pnojpsl2112dmtg4kdhuw6lg7v43ak1m'
    })
    name: string;
    
    
}
