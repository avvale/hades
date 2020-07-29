import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '1b503db2-81ee-4471-9ade-b9e1fd85a745'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xanhdkwu5602ogua4talgf1oqpea73dwg5dsu7lexa8f13r017xusm1mid4814udkfkagwdq1yk202xc34myxy934dz0oyg2o77fultztd1jo3ifb88qlbk4ngeq9pekyt0pnn4e9vuuyevj26qmzutmhkyjfqhwo5o49doszcen91ggic8e46gle4pv41kgi65t0yxxc2mqmsiymek08l3cq9o04k2crgjwdm9eslnabro0p60d6s6mdfufrfc'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
}
