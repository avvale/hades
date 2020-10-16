import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7dc7a3cd-d918-45f4-a418-f2c48606d352'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ui1qn24uhaqgnxqu7r4v6k16leek1qdp4p6z7u0gn0qzjg3immvwh8pl5o6sr5x4x3rnuups0p1agb3aknvj8sxoe7casjdt51lk0n2nfs980myfowluqjc6eigdrjz3ab2vo7c5mh6dddwm4omm1akjdt7df7zrp9scl9ao1cp5u2lj1bllhjc3ke9hf5p9mixkeqervsf7f99mtxo5bjcp89pvf92nm1ev6djh03k49hmf83x1sg0mr6rl0hz'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '89t194zi5zs0xtdlcogwcbkw7cjvpb'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 210483
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-16 15:25:10'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-15 22:16:58'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 08:59:07'
    })
    deletedAt: string;
    
    
}
