import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1852c4c5-065d-4339-87ec-ac0250ed36cf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6e4bce49-333b-4441-b565-3adc6914baaf'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0kyoy8wsfqezesscngj96dt87vhbv58jq5j7jl0dpa06cuj44v'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'c1cx2txltv3qkof5sfeq1hpt3a4s5fuyko5yf3naptzpteh1e2unzqrujs3zcaujoqgl6unmmc89iaxg6gp5agciqb2gnq9mn41gtp4fd3efh35hw4knr1vd596n2w0zf55phn4ffl14c5dtgn98e0alpjque4wgm9drw4xgri0dymh1002p366endtgulcnxc0ibb5vk43k26gx7v6j3c0mmnw718u0nvrik5frtxvqd39no2dam037mcknfvh'
    })
    name: string;
    
    
}
