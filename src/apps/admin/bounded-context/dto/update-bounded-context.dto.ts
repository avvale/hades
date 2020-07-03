import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '927455c7-af1c-4132-98d5-bc91f9286763'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'necpkayuwq1urq5omlkiuuksjij009wsnlehte9myccqyd1bjkt95e4zehwk1woafwi3unrf83hgf2qqdpv9n9rrvfevy83yeqabdbobybgl702zv3ngjimx7iyxlptgz30ax6k74nmpugsqfv3ao5bufddag3mpdxcrah4v9sr6d7xpmvbaal1rew9hgfjrvgu2btqj1oqn9u0edj4hcecc14ne8w3hfksczbpl7ygc1e6rlzzcc103vath3zz'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '0eyjqtt4w8x3l4qll85h'
    })
    root: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 326993
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
}
