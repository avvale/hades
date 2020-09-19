import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
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
        example     : 'Quaerat delectus sit corporis excepturi voluptatem nesciunt similique. Tenetur qui quasi tempore et architecto voluptatibus consequatur. Impedit ab non non iure perspiciatis perspiciatis velit sunt. Nam vero quibusdam eos aliquam reiciendis quo quia nesciunt. Ea eius consequatur veniam qui et nostrum.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'w1psmg9g9mj1ed8i8q7rr422zmvignzbzkjcai3z7y71fuh5bprxe7emtsdn4h2oyrj8hiawbasqy1s798jgd94oym25scpo54ej4x810gzmqnwtz50pnloxc2kqw3lpt7ygxly5fvzky4u83qcs633tu4wir8ytuydk41hmuud97xqbblwwbzu1wiqt5oi90aralw15bt8tx33giclqy7n4vk245ctdc3riznih714kl568fcr4zzcmd68z1l6'
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
        example     : '2020-09-19 20:23:52'
    })
    expiresAt: string;
    
    
}
