import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e57c96ab-d835-46a5-8e04-ec1206e434bd'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '281b89e2-ab8b-46a5-ba0f-164f318e3cf1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'w3aam07vrt5jpmo6tdklq6b0a2z1tmi7vcrm2w356n9e8nn1bq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '38d0528b-0ed5-4887-bd06-6e6463bbbf61'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gvm5iaqzzftkw8rd2evp'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'dfb6tol7hs32ovxmx3r8yvvic5b04lg2pkqhc7o1btlj54gudwpffx53g8vu'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'cefcaa5d-dd61-4a06-b105-ba3efec7a674'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-08-04 15:51:20'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-05 05:00:29'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 22:27:14'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'qb5wkeonwbb93w5x6gvh9k9f0fzsqir7bddizb7q'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'nu5kzaaicvccyd0rab34wjolywo464dux9wk0zv1b4al723x2x0sanrhgpf3kxjr5k1gpeh3phy7soox2i0zyuqgbwonkkd1tu5dlm9ks068gfdw04skb5o261t4mimm11nmh5zoqp3yd9bwq1634t561vhpaevm'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'hdfdbgedp0u2m3zm2i9thnu28gh4l0ze76p464lqd8v5jznej9k9leeidtg5av42ymc8sw2my1sc1soinpi2rp47etaqq2urc3plwtzhuhsx9394pv8tn9rdeawfzhyug58xh2vpr5gjo0l3fzz3y3rji9k1qnaw'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '84fgp2467ybr9el4sq4fyrexszh60tgs3qr9hryx72oi2bs0csdm76j5xv89igmf8brey1ibtd4y3wejzcs7k7bwgvkbowp19pvfqry44ek8q7vr2mjbus36595wiydhbhkury10yb39kl3sw94rj4k0xvvebgry'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'cfpqha3p0hlzkcd7wz5go250uak2ridwx5dlggmspepxs1edz8m7rfxzdv3ppa1hrph7w7bxjocfaaqksukh03wg21zx1va2iz2fpvg1thaujlv48ie5dwddwrk953yodn4w0no6trrqgafkxdvt9ck3j7d9qu4d'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Neque error deserunt sint ut ea omnis dolor et doloribus. Voluptatem dolores illum atque dolor aliquid aut qui blanditiis. Inventore maiores blanditiis quis dolorem blanditiis delectus ut.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'k2c56zu31qfrffzt575u29h9e9ggl39ebtss0sx4dapl5ornkqdqrh5uc0v1fveeuzrymuhd34q40vbqsj8cg84aupa3aqiq5o7738umw0elx2pgbyb897o2p5q1kzv6hamxmhixiicfjuz4kxp077ud8hjo29eb'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-04 18:58:41'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'INBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : '7doipgtzs4osw4mvww5d5fkgg0qv0itv889zve260yz8wthenepd4f0m0550xfy91xybc16c4dml75ax73u3zw0vy6h2z0w8osksi4rgucw6f56xuwvoyj4w7a77h6i4kmd39a304eifnup6efjt4mu2avwq3mv1'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'sxirqw3cnzgzi682tq8sohqvkh4lcn8994ueg15mpsfeb5mpcb'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 728859
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7610552135
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'rrsrz1dos9494ey33bq1'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'rzfna5r7cjk8823ajjg6'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'bx9ige8war8wi1fj75mgf4s0f1rfcxdy904qjr4e5fwb9vxbakmqh6ogik7o7opzwe1pyaqnr3kiavwf1gfdli59drxxwghhkt7l23ou708796lwwptjnjz423sf75t0h78nxh7waujq56wsz97onwmqdw5ze2o3'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'wbpm5oy9maao8iqe5ttzmp70jfbhw3w4xz6f685yuv73kpjsfm3r5dyv3iqhaeu4vfjusmmflz2j6fyuqjgneypjdnls0ludlang3v9l6ysu0lw7s05yv3m47nq5bg7q9l3oli0ylbjv3zv0o77qr07a1djv4gh9'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'eftcovl1glctg5fuerld58ngiqj5k02ovwp8crieo7hzj3rr49hr9kvtm5nxxyneflhsr5c58n62xsgpcpy32llearu95d28nx8scb6lzif39qewc6oazyl9ekur5c6dl177a7w6duxx4rbl1kchfo1kczt4tawk'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'udsm1rao5y6fe05f1wq8gj0icxabtvbbfwkvtdln2czxqoofl2olq91kuk3w0k7p4k6w3z5splq3m67hgb43m4guxwbcpkjjiay71xbig1mm0pdo145msa9zyl84biuhwucym6f28ilcwtwxftvjgil94d6ygovn'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5675659520
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7577608542
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 3864695178
    })
    timesFailed: number;
    
    
}
