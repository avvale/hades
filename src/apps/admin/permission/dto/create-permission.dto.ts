import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '5524b000-a998-4723-b0d4-88bb5a6c5afe'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : 'c2fef42e-87b4-43e4-a824-f4540d012912'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'p6enzjdfz2ygyy97stsp8a63xvg3nyovi1br0di1tt3kvvwxfewk4zbkgk4v8z66v8pevx64d9abskpw2ljy1b8vv9relvn0tt4xuvjtmotvkt8v7z26tyjwhgpm5uqxn0atqi9jeftid0ci7dxmkszz32501eo3m0j2m2t08n2cd56l01orl70net5jm0gs3ufn2slutepnv7zkn38xqo70yidr0e0my1cnlk8hlfdsu1mqly82slv3wplozai'
        })
        name: string;
    
    
}
