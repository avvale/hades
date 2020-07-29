import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5xlz06pj4symhir7tqi051muud9pg1rcef3o3bivu63gspkmtwtg8ixxa243reuy0r7wb6tr9ia83hp9fa7zytwmz1vczbprnyjn9n78tui0f2mzdjydwwre9y1rkkkfxt6pr9z0d8y5zvwk8kdoouyse14f1xd58al1ik8pxialbmh8tmbg7w227m2pyh1nfzr5lx7mi9o9hk7dpj2c49jwmje30ivwvmreyascnqdh2sbqxzi0n5vrcivmwnb'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '9hvyq3923m3ff85u716a'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 112362
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
