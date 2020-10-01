import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '53271467-a2bf-4b82-a296-ab4602e7e26e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '4cbf7124-b70e-45df-88d7-d9ed03f0d49d'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '7fd135bc-bb81-425c-89fa-9ad9faa83cef'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Necessitatibus pariatur excepturi eligendi aut eum numquam quos qui. Delectus quo sint laudantium. Velit sit rerum quis harum fuga id.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '22xd84fzwmk0tks1rnvaewpjxxrpajsozuumz8wh7vyevvgw0tv1i8q5lhbc365gqt8khxeu95lcodupf79e97pj7ig65rxsz7js7j7pile4mwiwu1ay55rjrj6xweh5phrlb8df6j6lp46oky80mv4czh04lakbt0ismuz97zmr7xmovetvvvxavn8lngqpe92180w0bghwhpoq4vi5iltsl90uikoiyqsez9c3e3k2d3iugwysic4ulsouosv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-26 12:28:10'
    })
    expiresAt: string;
    
    
}
