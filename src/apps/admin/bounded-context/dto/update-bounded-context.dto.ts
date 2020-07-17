import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ea11ad2c-6782-4afd-8f84-a7832524f60a'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3wgzjvrft45xftxmomlti3jjxm5gzo35cfkpjxe74qmwc7wr0x1lgnn4f1lw9de4tphzucsz9qv5nt6ce77u0fia698a8ojeqx7pqp3j9iwuvduzyv3jktqwp8kp9xaqdgu43m26f33mg872kkjl4x2cavzye7apxmd5vndgtx9tkdv9bigb00gz3k1ywvers9fm4ibyljln3j1kbbhk2muu2jzj4jyx48237y2axfcldxtpy0n3iu9ujsio925'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'zpzku9tpxp25702byaio'
    })
    root: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 192144
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
}
