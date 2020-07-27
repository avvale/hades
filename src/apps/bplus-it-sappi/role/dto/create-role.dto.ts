import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
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
        example     : 'v92b8p2fmbum9fty6mwjrvtqyibe7mr283h2s7f0szyrozlw05'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6irpys9ycq7h087k8c5lncgp77az5i39ybzt1qf15mcdztv56uheobql42xhiqdu9h6gk632mmlwy8emzp07r906aiukhvanbd0tyzukxt48kwq2zxtr7k1pobgvoqa7g4awgujd0vwsqq1m8xemqu4tu59dg8nw8jvpr9kwucnydy83o3huxa7k81n3vvl6eitbkbmffoll5mb89vzs7c83z3kmyb4ihmku4veewtl2m06pbncdirl9a8v7b4z'
    })
    name: string;
    
    
}
