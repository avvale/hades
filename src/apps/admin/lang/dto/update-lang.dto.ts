import { ApiProperty } from '@nestjs/swagger';

export class UpdateLangDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '86d2d929-7ca5-4849-b278-f17a0aca744e'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '612hd1ds724ool4twh72sz0mw2amuzfsoqktq9oq1h03bzw5uwta5qqwzm4qrannjevsn1p3i50vh6fsm1aq6ieqvsy3au4g3t5ng2mpv6yf8d9oabnxcp451bx7n7a2e09irx69nltwhimmbexra6459nil7mnnp3qmplwnazod2coriddqre92dpjtql4rzibbk3nvp8svlcoo0eor6sadqiciez94gsubifpkmk0s4rmv89lekjc4ghoouof'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'image [input here api field description]',
        example     : '0d9hpapietpzg6qosun3kyn7jbquw4k5it89vjlbsi4vehyo6u084kgdzvo9hcjawgnbsv26zu8498neta99rwxokr5z1s5r1samcc2nhzsofprn522h0pq4inhy010xrfacfu4w2q20rm703tif6qrgjvdc0mp4hpg6z8whkpsouioukhiqtsvvxw344i4emj4j8nueou9p9xhk5fy750piw68plwconojc8kazipas73xhkale4c5tudxnzjz'
    })
    image: string;
    
    @ApiProperty({
        type        : String,
        description : 'iso6392 [input here api field description]',
        example     : 'ze'
    })
    iso6392: string;
    
    @ApiProperty({
        type        : String,
        description : 'iso6393 [input here api field description]',
        example     : 'aav'
    })
    iso6393: string;
    
    @ApiProperty({
        type        : String,
        description : 'ietf [input here api field description]',
        example     : '1corm'
    })
    ietf: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 511091
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
}
