import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ea11ad2c-6782-4afd-8f84-a7832524f60a'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '0d163932bdwx7seav9giij5by135vsm76sxq24277z3p8w7jabnn6h5aicis7uorgd7tfac82jf2li6fucu5jgyzqu4rsxpnd6poq41pcpcp61qftslusf8h3nmcg78vx6b6zpow8tol33cvcxf0ajv6qif3osjqi0o70zvzbvzzd2eqh51d44ivz9cp3cvil7i228ig1cpaccam85mrgepeda6npa5s66b7lpn6ck893bkso9jz4irhfn3or4f'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'kt30vrpq9o70umc4rzvn'
    })
    root: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 318762
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
}
