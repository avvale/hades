import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'z9yz0f3xmscrkbflukv25nzx3hhh9u3zifnor9aeiesf1qgc1rktldyufjlw5tqv2ctzo8xe4f0lji47nr6rm1uay885oo3j79v6phwr00hbm2j9y1g18j68kg18t8scm0yjumb4g8axc1a2bv13p61z70nnw5zg49vucltpvj62gu04y5phpl3thg7g5slc63ip3yx2s4uf87ufemujnc4m8bsm1ye2xm1eajex0yynkjgamcxymwwrqxc5q1o'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : '1hyc7thhr72tf53il9rc5dahkwvjetzoedxyoz2qsc70kungqq'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'r436whma7tgro6bjwgzkl5n0z63vbw59d6c1tq0s9xb2wmcy7bo3vxqduq1uyiporknnmlflnyjinh85v0s6zkis24'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
