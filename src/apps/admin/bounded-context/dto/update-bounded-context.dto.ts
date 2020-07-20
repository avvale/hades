import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'yhghbtf77ibhp6ky43vgvu2bwyimjnm4ezfsdcoicloze5oj0ujfc4vmfwrzmoxvi3ml6b3u331ulq8qi2cmt6ls0r87ovyb5zcntvqo202dt9ni6iyk7tni424zb1gtus6tll21cww926lid9koua18z3ej43r9nlru6yb7qxco9igdpizc6ajswm3bh6haubcpki1scdoam3mus20rnd8068mepu1xl1kx7sqxmkrkqw56loazzy6amrvxwbi'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : 'jg0yr3w36q1fv73taymm'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 226036
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
}
