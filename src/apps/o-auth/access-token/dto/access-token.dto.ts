import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '68b8a401-923b-43c9-be91-63c250376975'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Non facere fugit. Labore aut mollitia ut. Perspiciatis est similique sed. Officiis nesciunt non dolorum. Sit quis qui. Quibusdam maiores nostrum occaecati eligendi.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'v1s1hxsxq325xjgs4dd29g44egco41x42mewa7kin543irchx7ruygbsu6cai6iqwaec4x1x0t033wo32xudcc4xfa4dfxhkzm26mna483zjh7q64dv85mrnhey06ff948814p0efoc92kgflfjz4hanb0gbfvgyfguo5s9u2akf8v61xm0irdhju15x6ssyfpf2ik37ltxeceeao10ddayfmrlprerwn5g7ut6p45btewjhsr974d0dk4k7ytw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-19 09:47:48'
    })
    expiresAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-19 07:33:37'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-19 23:39:25'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-19 10:10:09'
    })
    deletedAt: string;
    
    
}
