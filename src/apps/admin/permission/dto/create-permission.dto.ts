import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'ef1363e9-19a6-4d9b-8197-64c4357f1038'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : '57bf6214-4089-48bc-a72b-a84cd60d6b71'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '8opsezx9s567jfhin5312vqciyho8zhci8064nls8mph1b6awbicram75tux2warqv3jabx5fkxt22a1157gsi2ljl43d0cngp89b7vm94ihqdl2s5kabhmdxh37lsq7t9rttkm3y056uzgh25tf5zqa6wj2ak73te53cv37enngv74vmysfsvttdumfwvxswwxwqqlvryphj3b9ff36qfp5pbxzgk8m6wxhjm4hgyfd5kdords4i9mok0odz3x'
        })
        name: string;
    
    
}
