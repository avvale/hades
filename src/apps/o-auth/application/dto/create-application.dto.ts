import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'r0v076k9ut6xf5grwcxa'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'tutt3fkamz7nu9n5esvnnnop4vydtfs2afg6gogl054ke74e3ykcvekde6o3qeurkvo7oswkjldymc3pkqlxb2bdu4'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ladqvsyuasz1cqlgp0q7ri8s128qe0l0kty3e22045pje0eyog3v2xa9pk5vckhr2udcb4efch0ybb1zizz5jo6l3uvomvvfzkdiywfqc6siod3j4xkm1102kkxc3n5w97jmk6ub2lpbe7nwewy8r2vw5mckyzxsjn47ljoerzqctcnfcvau9uo5ondjio2z4b6kwrurjep4dtrk0198gl5pyavq0ur7jlfq5wurv6mz697n587iuub3wsltcto'
    })
    name: string;
    
    
}
