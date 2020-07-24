import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'c89c5b9b-9b31-4747-b556-b994fc310fab'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'uziq7ywmmj145qzpy29820mgzi80lh93ipd65vl9k1tlkysq63lgmql1evgpy1s77sttcqzsxhyrpernusah92fid7rsx23af8xb80buk56remkgqbgkfjq6tdgimlypfxmdlp11oawua351131kwfrqxx17ddqz16497jqlqqdrwj64wu80bdmus4pqa5e5oi2eopcg873l17veyx5hdlzsv3ctjwa533153kczc62hwddu7xqox9cakc8opyx'
    })
    name: string;
    
    
}
