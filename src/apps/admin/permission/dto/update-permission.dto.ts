import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
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
        example     : 'lco7wgu9ukyijyoh608h0r1xaz1wyjtnzw7lsqx1qis7sgur7if51oo6x5btqwl8vi3gwvmbu2zhuuq76vkd5sxblix1vb3zlbpzpneziasxc0i3nlsdhy5wcer3idbbe4n0gjnm9hgwt0vecune3al5p5l0x7rxz4admrahv8gl8vn8gzd7dyub1hryu6i07lw9v24429yd8t958k87gxf2wv1at5i9vqr0v17nr1wg9njhezexeipv527uh4b'
    })
    name: string;
    
    
}
