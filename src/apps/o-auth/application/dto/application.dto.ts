import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto 
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
        example     : '3aototxjcb7clgcm7wud'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'yt9sf54v5c2loolc0g6xigh7fvtin90aheugvi0ra7cr8m442v9236r9uo530gkmw4wogr8pqhmtwywlk1uraa7th9'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'o86aernmuy5lyz79vho54ejp289g94xskwt2fnnlmonrk7lj6pagtbfuuq7utcy7zh67jh558ys4ob2mclgy5ysehczu8nymvhht0rn3xkekmw3wp8ourt80sfrwtzh4z6nbtu54pwrkw7b14ne0goe80ebc2ripqhj89zkg3krhugnld7jx1mrnk2wrbxd3cn2x00ipy4yvqj4i94dsnmhxkfaqb3kvc7od23zagpsxwcj7g3cpaw02qmwnxav'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-08 21:14:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-08 21:24:38'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-09 03:53:55'
    })
    deletedAt: string;
    
    
}
