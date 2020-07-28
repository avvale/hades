import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b3dc3df4-87df-4d86-865e-7f685a93814e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '85e435d1-fd09-4add-8ff0-3f474bd43568'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'x7u954j1h9eo819uqq9uy1jjnc5v258q9z6ak68a50ywx39jgd'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c06bb8b3-38e9-4c8f-a614-9a525eca3187'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5mw4ydasa12833dqd33b'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '2547a432-7b81-4764-a0bc-72e0944a1c72'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-27 12:52:40'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 03:42:05'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 08:02:22'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ibh7wjpgth19uwafja4rls8aaupgv5rq2ar5e6l8g9rerpqrj5el34udt8isjkszgjuh401c7jdxoi6h8nrgn4e5zdtls9lnehl1vo5zjtqa43n3kck8r2v7gor1f9zgw917vlr5gdktzipc04c5vfoz00r8e48qq3oow6dm1e7spmuf98y58vpf0l0mh3mwxlz8iwfdna8skovseesm37cx2vlwzlw8k4fn6d3qyzky8bohzn2jz9gd057fxtm'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 8939122041
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'y0w8yn7mydidlivojqdfwj519wxyxznekmwnnj5le0v80vr9cyil0gr556q8xa947jon2fbtkmjngmj7yjfn6qra1a39j3aiuwarnputzf05cs8v8gqjefkf73lyvxkt0tyvesmif6xc7e3ifsa1cf0f0kd584rv'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'wvyflow2o0uxowqddn0qgdy2wtd3jw97t8y3lbted9fdse06bfon19p8b5zptsdf3ffnymqh5g415d8kpzxfn972gokbkj11mhsbb7lgaxw7kszhdwfk2pkxtvn60aujdqeafgvp3d36qy1kgbbxms04qesq9rn4su9nu7p2dbatcodddbyg875mnm9ks0tzpw9yxc3o8z3wx82bn62hr1ik77aevy0fpu4fzgx1shcd2hofdghu0hejm8cyd1j'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 07:14:21'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-28 00:53:12'
    })
    endAt: string;
    
    
}
