import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
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
        example     : '122hk6mn9qaqk15r8sagdespkzjdblmmkvavv3lt489vaqz294j513ntkd28vi730wa3z4q4u5kloj6irajaqcu2r270ggsnth54v07lcl7n03t8xmmlgwhptveln8ni1gwmiq4vlzbk5xgqzjjorfbomtz49jk4fug9z7gtjy82dulsryhovl6u361zkbf1fcezgiih5larj1b76enecirnotf1pgqhjuifi2gt8cixo4e91dcejkwrut9xg1u'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'js72qrthpgojodc8eeierghrol5jal4bran2wpmcbds5565h7b'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'bctwxbiaopj06p2wd0tvwhy0oroqj76sltgry64eumd3lz8pi8kvp62md93wmfwo1szl43u1on67xw2bs7pcqesrh7'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'clientIds [input here api field description]',
        example     : '',
    })
    clientIds: string[];
    
    
}
