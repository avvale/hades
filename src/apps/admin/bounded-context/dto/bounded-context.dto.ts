import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '52q0pf8x13ty9uuo0zzvgt60x15hbubxrsbvao668djvw4z70xmdzdf5l1sskowcnwnjx0y5jpazvuys12hywry9bntu4i4lfeaznxp0u43xwenv9tfk5w84g9syrhm7wnz9jzqc2age5yxxnzlov51et1hwcyg3ijx64r8otrdisb52blyq14lstfue4fnly4nflsov82te85acrbji4ztx64f8g011fc66tlettuckiomvvpcz9d8i6u7nvfn'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'ks0unn81syebi4bj5f64'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 483561
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 22:47:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 22:17:49'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 05:21:23'
    })
    deletedAt: string;
    
    
}
