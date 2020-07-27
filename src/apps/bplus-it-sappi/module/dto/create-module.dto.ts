import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ughlert989f6bhsnwlf5ptn32x2v0m2v1pol0m2vokhmbu9t6o'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '64f1392b-8c73-4389-a675-00b624624448'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'vp3dsbcgb689s8m0qra7'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e13ed62d-5fe3-4d96-b263-eea94907ba86'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'f1i5yr1m8qruu89jxpi7avqf1txekylmrd4p6wn18cml97uc2cxpaoy14trlzb3nyr1l3yqfi0fkmipskjwrbizhr2ohwd3kyeyg6az4t4aegkiomnrxd0s87o6rrx0jgpms3z9o40017nz7403tyvwi3g03xqka'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'l1fsvmu5yw15zy8d26tjcn42tezmzwdgivgaw5rj8pcb38hjmdqij4fwk9bfb06z6tlv4xwxy5tsrwwyyazr7z40nzh6gfvlufy5kjmhji9pfvoqdem7ig4s6g404tcb40nymztz24cmenx56aqi6s5zdok4v3ax'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'jtexskwhlxeznqe9i4npq52oph8z2jc8ejwizzps0eyy69lydtf2mkzd9vqms3bx5vzqwowvpzukla7fuvg3usdvjisk3lq653nnhw73om1d078l1brlaae2wccc5nl1vecjxvu6h3tqr6grne1bkxwoyg3hm1zk'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '7f69f1d4-0667-47b2-ac20-0fadbdabb42e'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '7pnzkkfop372gypguhdf2havzie4mi4s8svr9uo090tb2byq7g3ozacn4uncouvrr7cz0isxb7pcwi5wehh9m02wp402bfwqkygn6ofe5hfmnvilog2a0tfspjtqy10elfs08511ksco0e6krgew4w63opk5b0f8'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'k0ds03yedfnt8iwhkt1d9ctyckwimn6if4o28nl34ugu6qc0gkiw717rf43navkzyt47hlwjfvui1fxi28i3evpsm4ksxl9ora7co5fhqpcws7d3i6ly5hqg98u8wpnxeb4xwjhwsj0skvys379pqbi42oe8mr9h'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'oz5p98rg9lfuyrb20txmjih4fohf9l8fwhedqqt1vykve14hko6b68n6jltwxlwjwzaxsg1biou1rluvkx8zcmgphwa8oejhwfzt0y3by6jujbd1u1kef5oonhfhhhs5qkm5cyzmjzfro8sqc7p0pzd96fqy4lwz'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '20pf8x2wmjq7eeu02yr5ucs1yoh7iifc34pk2ja9b1p9tjlpxfdrvum88kjij4m1m9l0r7c6ibxu801ghz2fl7akfj49f1s5a86zt1yqxzu9wf9j4jsyo5lecu3uj9116e1k3cawijmclj0jt55xae7pglf3fe7p'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'mq8bbqymbjjtvd4117oe'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'abmreeozgkxzrovplvmlcvk3wvnuu08h66hj9qr5d1mdigtamsa5ylyx1h9efrtqupkiqxmzx66d56uwz2z59jdj2okf046osb25ml4te0ap04j8z13y2cfhft4eplz6zbwvto5e1bsrqbgv7z1upwn8i0ezn2ynj5m1nf7dmo31jfnzr14yhg3mh4ok7vvpq0m08bu5rezb7mq0fpgseasuzggax0ceb5qhctj9m52d9s135pz7tp4r4f19v94'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4fn0djeuer286zu2x4xcv48coun2g0jdssw4cvluhvjn4h7n659m8td8gtc4056r3zotdmchfrl29isneyza4jtdozwudzywx5htw7osn8pxor80nrh449q6fc9e12ln3e8ar65524ezx4ugsajjrhyzwo3c18b5xjk9frbpfvsv0r33kkuwpsxuuxk5t91ll8itzjloc836x88y41b9q4k9hnhyllsi4tht5y8s0jt3f6a8g23z4jewbvvsahm9p32dqna5gsya55ny34e6kmvq6qxast6ef8hy1aard7i3nil7rbzjtus2acljgbv8'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'n0jnb2mlplk8nt4or1zxy4arxc1lyrxum0csl8d8mi2vmeuzdmljw3n9eo35ktuikuk55eycdjgcwqidetblg0c4vyfwxcgdrftc58c0ojxctxnsnteoajh1ye4ppro4fxfcqgyiuhkp2hpkl5urrx19oqwob87cpx1bo3lhs6y0dok9rcj3pj66ryv2tns7zyvwhqs7798pips5415br5ealr50ge3ax0op0b3p4hfe3txlor24dcmsf8xotg5scu5aqvflj8s4rmn3dw5vqpnezs7pgledmko1s7hirf2w35x1igkrhyep6gx2hv59'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '1v42h6j63mbomhpn1r1uwld57l94u5odtl6auno1bgitw0ss0k1gaaphlderdi55d380mu79zrf3sptj7a7084b3xhs5ygdxchq4pfq9obsgpev2kp6lh2om7ehpj1px6ofh4rffj3vzs2rovke3res1my7p59nk0i2z4i3pyk365nuqt0y3o07qqztc4ijcbbajjyqw5abiq29gr6pvrscmdohlpruekgj11wwvzqhzin1jwir1texxkkordlptx74ub207hqct2kdisr04mrd562pbuypjml66tj0calryqxjhxsv5yakc957tw7jrj8g6x7zrtfiomdtgv06iww0yvuwsoz5ztnd9ienysq13siurpsj4z4f8xsqcra79i9z9e7dp7g5r28nu559w600qambm3r0a0ma994vm81t9tu79zpioho3y77vp4f6mzqyfayc03rkwi4us5qxtpnmb49rfwqmpa9tqj34741bawug5v7q1r4gzm4mfgn24fz1skv7ldp4wh9wp4r5l5q6io2ror5tesx3s8zwyxw5c7erupkk368nh367v9ejnyhg5r3efaec9mtza7zl89zt045q2dr20172qggx2emdcywnbo3njafjjo5uhgyzvc35dgu704irs6x09mzy8co1fg5gohuuv7d339xgh9ih5zjaqhc64pii0k4fft7ruqkxqgrx11pyhtmac7slu5j69jv83inxecj2fmsxpxdy5qh9b8qwakjp8jpxh0nk0o7ndb92n4j3bksvjmxkfnhvdxfjebhesddiouzsy3lw56gcipy1rzdddqto3j8i3mj9e4a5l0g8kmy5sl4d5tfwrcy736cjimaydl1wclo74avzevf953mxnb67ptiq5js97pz9b49yb42e12mq4bzpyho3woafejxnnrmq6dupi1ibp3rfdan11rekb0sh7dwl0sbnl80ebt52bqb3raer3ywp2ag5t4tlob5cb5j5l04huwl767ledutcr4s2p'
    })
    parameterValue: string;
    
    
}
