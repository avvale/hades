import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '40d09675-d86b-4634-a169-6156e4250d5f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'b5zoth2susukh93er6tvlj0harjz0qlzgqvb11953jwpkevwkg4xrv1pdrf2zudwbxyuialcm5n59ys83blxo6s8jhaitzbcve0t0g5e767f03k2im9ljvb04p17ijrjj6l9n1fkn6hpn6t1e7t2vz9svgeqky1005f7ll90b4ww8h9q0yuclgpld2athrp4qksxyfoihi983r5m9wengvuda6cfou1y42ie00cgmr18o5itq3vsg4igo7pohcu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
}
