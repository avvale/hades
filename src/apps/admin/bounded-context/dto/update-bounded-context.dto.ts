import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'ba915zzcl0nkyyywplh4h9vgm5gj1ydfay80ei2as1vo8zc8n0rnp0cc5krqpcygpuh20hpwwnpnspx7ufvaws1y962y18nzjyzz6oq6yzbrwf6ixy3nul67zwc66u3whuvpj87nqstgqup0f4j4dabw47pav76xosf5nx3i81ujxy54e00ixv5kuw8s4qdqi17fcyqqxsdadnl3w0ahe6lsmvvtfixk10z7hfngip737335is4s4syef4jy3l5'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : 'wxb3rynarlu6hdgyjl5d'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 364485
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
}
