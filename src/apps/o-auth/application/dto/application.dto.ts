import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from './../../../o-auth/client/dto/client.dto';    

export class ApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6fc34f16-c1db-45ef-b887-8beeda142bee'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vxh0dfnfuvgrvjrsax4g3m1k38nduynn6irawrr1gmpegy4ekiks8lze02rey6y7n4lji4ahh9ss92cwvtg4lkwow9nyefmi2afy4athoalhy98o0gul849re203lirfefq64zrfctnak7s5tdgtihd2sgufay8jmwf80kf3lrqi0qag7gttwiaf9p35c8vxwo497m19eai22mg7z3ijk5hrmnkqi2b9cw5l404f52nqszm6rxcqtcnlpcfeq4z'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'pcul53jhwsq3xqzykpaq4xgu4dp4oif4sj4tgub4lqsj2b18on'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'k0yjus1h343tm56mrs5sgwvp19w65lnv5kxyhpwsrmmhsc8zvgap20kgn8iqx9l06a5aj1orpxy39v25cown6iogqa'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [ClientDto],
        description : 'clientIds [input here api field description]',
        example     : '',
    })
    clients: ClientDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-21 23:29:14'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-21 08:38:34'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-21 16:53:32'
    })
    deletedAt: string;
    
    
}
