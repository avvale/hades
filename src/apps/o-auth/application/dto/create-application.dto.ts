import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3jdxeczd2zyqkjcp1c8efdmm9znc3l7q1gole8m8khwyz6nd6129ys0v5q3g74hc9g23z73altwpo0r5j7vgom5wsl5prfc25ea65u09wzvfjiasmpx6j42xkmoa9um1svwtigjln9az1bh0oc7r4cngqyumjh00xhhucghdaow61upqh8wxib6i23o1s6zxwh1if9v5mlihcrdn9kgg0yqmqzk35f6s4l26g5emaiqm94h3p1xg62eh6nyfkzt'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : '422nsdgl36o7ki13jnf1l1irzjdybj546yk4y4qspwlotyio6w'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'ohwehcbp88gyson14b78umk8eg55le03e4pjc1kjvp788flahkp77z9icjuj085cpyqplairviowoh152d3e6h06ht'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
