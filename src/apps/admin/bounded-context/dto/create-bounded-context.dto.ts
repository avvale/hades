import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a8355191-017b-41b4-aa48-e167d3051c1d'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '2nlrtf815o8mhxcoweyr5th4uhf1k2eatlj4e5981x5tyyshjxol4v5m20u5x52cyli22auxlm2qar2k58x3flmoz4xmu3oo56eaypsnbo4yo2roycfumhek148pexrtwvfzmlp73snrxbzdjacjjxlh3r8eofjrpkjntbv38lk9u0tdk0lt4pzqtkbdw5h1sl5u7bm1sy7gtuvdmq7mb5rzzy3iydyfkya3dggnotxv9jb6ppfa8g0rj79kket'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : 'ih51po0xl2wabbs40eq9'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 990311
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : true
        })
        isActive: boolean;
    
    
}
