import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'ef62f526-feac-4e8c-a9c9-9ed906bb3891'
    })
    boundedContextId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pfm6bt8edklivj06ap436wjmxyj87hed3j9e673a89x2rxlxwqvbdg8o4scsly603aqtgjntasj151j6c7nvlqfpkg28z3xl3yebtkyo778u28s9l3o5erx52eprnv04plya1xgwqsmj8afzg1ud0tx7b4y894trab1az8raq89jk7mt46x6npqy7ipr7z8ghka0qz85pwqlabuk9fa0y9dp95b4y551j63bq86hk1iz4j0pav3q0hfm52uoxqk'
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
        example     : false
    })
    hasAttachments: boolean;
    
}
