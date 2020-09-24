import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from './../../../o-auth/client/dto/client.dto';    

export class ApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '09ec177d-3de6-47fb-998b-2b9e097d2cc5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 't90f5vdvx88w4ye95ljkwept8hkrauzvh44azgmkqtroxjpm1xmp3iyjih4q6ppi803lsob45rulmqqmf5x27e8vrkfc90q1j7bdbspwh0wuzscbb54sejattajs0xa2ni52tl8a0yf00m1p6t08uqsbpb9hh6itjtb38ibqjr4ek92gfqysbsugbpnrrq02vnpnlligki3k3453wrqeocoakxa1x7caq3lpmuleislc4itrlqhnbl6pzs960tn'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : '5akgmcgadp3trkcipb266e57tgt56h178qksfkzezjq3f6pq7a'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '749a43jmnumknag17kpdlva9zqkyfp99uo9jtrcy9qzqyp9hynuwbpwr8pid5vqwuo6hav00dp0lw4z4ipagz65b06'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
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
        example     : '2020-09-23 22:40:14'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-24 03:11:10'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-23 13:52:59'
    })
    deletedAt: string;
    
    
}
