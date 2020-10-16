import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5e094583-3e92-4ef7-9513-cfbc7bc989d8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xjogrox2njb6iccjqpiqiz9hiuv2ycrgzim01k1gbaqs8pv3dbz7epzugmnye6n0xu1bg7df9su64zfwtyp9jhg9xmn2po5siousg8e0d4dpie1uc60cfee335g33aihn740i05eoo8g3nksk2za5byz4sns806kv0tg3f12zvyvaek119r6zvd70upbn2eol9gziqvbdhh4jgwqupflg61q24jpwrdn24a4djd1xs4fshfglypqno41dw6j0dk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'qjofpwvgdgf9w7zftgtmpnaay2g2byuj2n23um9q096iiqoi8q'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'mpe4sqhdg1j9cfs7nf59jlpz5z3lrp58wq6vij5bepe3njzrwkf46zrwqpqzee3bab4mf8uct3dd72mzcvxmg1otmx'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'clientIds [input here api field description]',
        example     : '',
    })
    clientIds: string[];
    
    
}
