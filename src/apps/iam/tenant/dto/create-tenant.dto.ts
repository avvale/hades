import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bf7b0cb5-9279-4dfe-a957-989935830dc8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hkdnvf9e1o7cuaoyubu2h6u60vbcojrxv5phgvpk0b7nif8lu93727url3j7zjd7e97k4ppn093gwczv2xejm6addywh4spcu9fuk736andmsop17vlxzwb4dk626wmcrkw2mq89tzpbm596lhgae19ubttl22mqt4num5tpx6oycwjq4debiuo6eta8sqcu2mircu6gjyx9nfp1vdw9s87oaz1biqx39ixctqhjuyvyrxcpucvkmqsnbq8dc7b'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'ugz62zxy267yy91jlbtmyxa1jozv7h0570d09d5rnihlls3gk9'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'wp268jk2h20kyke1kn2zki5f8vuahv9ws2m8bng2selsew0923jk6b4wfmmowvfnja0bau5zxgkzg45vf9uh154r9dofxa8abob8nvyegv5s592cilzce8855jmglsglpeeqdwpmsyuo1lh0dfwhs26w7drxe5pggrp3k9cp7tlzd349kfzyuk4kxymduombv20mgy2w2e9r4ba74dgfrnnqkfw1w9u3i8pr6l7fq59k1tug127g5gpmarbgm75'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accountIds: string[];
    
    
}
