import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd'
    })
    boundedContextId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fdf2e945k1u85yjz7rs3dmqnuzh4swh283onf91cs26i39i36ciyenelplns0iu9k1ddvp9b5ecs2jgpllhh43x18365f7jdkpd0bcbs1e7twrkaulpdbc9og1kqci1ofcpo43e3k7ypfsvuh2nsfnhdgjkimo2xb5k57tdakop47825sabb62i71p02u5arqbg9rq6qzj19epib43rnyb9ee8xm9txxkzi9noipggc39u0v5833wyeaqakijzd'
    })
    name: string;
    
}
