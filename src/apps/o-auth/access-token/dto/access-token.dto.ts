import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '627a36ef-faf1-4221-9c39-940293e6ab79'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Voluptates voluptatibus temporibus. Nihil sequi eaque sed. Et quaerat quo neque neque laudantium fugiat sapiente. Qui aperiam et cum occaecati eum nemo labore. Odio adipisci rerum dicta. Facere quia non neque doloremque enim autem quo.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'iwrezohixt46r6vr8vj9b7nysdme6spvxu1cfjfi95yxb99fbekgko31nqnjo1cqzfiuotj4g9cir58idof0so79wkuhafddd6nhwcc2bfanho84hlta56aynddsju5rwayapqy0hdrbw288egjer64wmema71gzq6c1ojkhj8wgzp1k2uzuky6q97eqe9c1ttdfl399374klnot3tdcek0w55vu5k6s4ktvuw373cc2hz9r37csc1tkn6fkebx'
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
        example     : '2020-09-19 21:43:23'
    })
    expiresAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 05:58:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 06:55:02'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-19 19:20:27'
    })
    deletedAt: string;
    
    
}
