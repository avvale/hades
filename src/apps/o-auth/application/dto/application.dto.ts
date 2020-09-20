import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto 
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
        example     : '2cq4utxdf91jxdxndpacg0b4k74zg7xrob1adbbrx7gfd4nprv8gwkmrv9uk95chff4dyyszx5sselavwati64szxblvcxos5a3h7gefw778tx7szlfa8m5y7yzgcasev104hxe9mn5sqr3wl8oevomjqet2cs3r4lmpj9ufulnv3eb5e757dqff35s6du6j44plx2438oc9kn26e4l9ch8h85plcbk5rlliu46z1pruemgkzb1czak1ffk2bwv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'xjimgbi92nlfwjonzy1dg13rkgdzkumef9ltg0s5voz9g4a9mf'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '1srfun9ltwo8gowsqjkyyax0pqj3qx7f78geyklj1gytkn25gckogjw5qiuxj8o98r1r3xpqfmq4f8nrn33khbea7m'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 05:09:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 05:22:09'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-19 16:33:29'
    })
    deletedAt: string;
    
    
}
