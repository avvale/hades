import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a519ff03-db35-49ee-9162-bb4398fa8e45'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'y3e93x205a88l7ipelivf92h0fc585va0206fr0pms396l3m5y36xwupsoil1rp41r8cqq0ony2byvt3h1ngvld53pv1yzxyzsxk6bi6n98mbo1cwpovbb78rrrxv1lbu1kmne4xnlrkn3rakbpxrdb5nnv08xo9q5fdz33bo2adg6v35hr3sk37e9b56d16cr19o0jejlddan85q4mpwhc9rmfv8k6uy8odu4bxd03d8b6po6n6enr17st45l5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'll7ltpdtq3yc8wn831jcaemh24r4zw8clg76wsyfkcmq7nlu71'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'rhb6rvd2suh23m08tnrnva9j6wa41x82zif9c1q4jv7jvsxsrnrtzktfcc8dhpg00iewrk2px10fxyvivyhmvvzwpp'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-14 05:05:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-14 13:45:52'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-14 10:22:30'
    })
    deletedAt: string;
    
    
}
