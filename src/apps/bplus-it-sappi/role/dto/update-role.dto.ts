import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6f22b4b1-1899-4f82-8717-fafe9a72032b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'je0asydcsydwom3nrin6oh0delsbtr6cp6a1xhkayy4ur5l6v2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'f62pw6vf4y2d7p9l2jgx4l01062x6ffznjyv2hckfd18dho1kp2404a1illl003eoxaldzzcn58uglsoc7kd4x8uw4mx6aktatjb4552oo6cyie70367rcxgvilspce01pzo3jbmhhifanypa178jwi3w4qdu6xm8yovjbzrollx7ykdper47hy4e34ktntgx795lmgqrspfpnn4394gty2sdy8devyvgxiewvqrj23mgg6g410epe5zgv0j60b'
    })
    name: string;
    
    
}
