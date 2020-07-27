import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '911e426a-e32e-49d5-a827-7fcf0ba40100'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5a020b84-7fe0-46ad-8f4f-364dca1fad6d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5j1cw6svcl3yvs1wj47v7vtovmn8rm3qv3k3611wf97guvl3c1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mvc22kypnxfsg51r3zwra6xg1vw0wbvigvzk0l11ear1btawdwrfx43s09mlx2yb2yhs0r7ldckkchea2cm3q1lf1ogzg1t48ruf27gt4kn2o74iss40drigx0d13w7t23289emhj686516wtzu6orb4qzd5ivssdoe9hz2bjfqt1cbpjqdtfa6d86ad3fy7ckqmnfuzbzrvv4k8p6v9k9kiwxl9t87dwznxdsja82inp4uikl8mvbfc5mw4ns0'
    })
    name: string;
    
    
}
