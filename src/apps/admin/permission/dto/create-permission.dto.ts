import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7417vs52bntn1tpoi5s2bew474h8rwviqcqv5y8gs7su35db0x2dj5osnsehmx7yu2f9a7p1srjgeva1ubhwcv349kqunirn0eesemnhy9hkw4bvn6xxp5fsk60l5rginjm9kb65a4ck84lvyju30e4d9i21dl3agjsfxqpwy5wli65xgkj2l3nesq7rk1t32mdzjzqczpkdn4lchzscqnededzgnbfagpnvlh2jbdzvra58j8g3qcngtug4gm1'
    })
    name: string;
    
    
}
