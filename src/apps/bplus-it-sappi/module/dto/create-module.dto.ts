import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ec9d7cef-6b13-4354-a789-de58439230f1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'aojeo95mhiatcrbuyeu1ocr539imv4y7tp9f52rmcp5ejl0f2h'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a0f79650-b44e-4018-aed6-c2105c2f0d08'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zmft09jmfa7maxj5093a'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '4d67v85379n0r4935qwd6xhm5fofh7bbspubbesnyobmgylmbypdfrb69lhq6kzl9c3c5uhqg5fjgi85dabk2gtqa05b0ibztaj6jylb0meupd0p1msawlg0h6foxdlmm7jsx254kpowq5jbylgnybiaw535xxcn'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'xfq67dtdjs9eb7536abo2ibfb8frdhwj23aowuqgjkej66h8f37owap307cf484vdjf98rkofqfaoths52exw3v4883m6u5tg9y7wk5dwtj4vffekxusjt3ik7jz6w2l8yea6l0ya624nj6ls4wwsk8n97ex5pn4'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'barnpm0lov56cw3ag49gjgwr1imzx2fpy6koyikkkptdvkw8i13zwigp78z00reic1g6t5yaet30zxlwwopc4ngeqwj123bjqv5u2exgb384men2jddn79xgnf79bjk10cw0id9iennp4g9ja5o82h57c0zu1kxe'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'c10bc3f2-cd95-499d-a95d-188526a6815c'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '8t32riqp40at5jm9bzodn4bjcbrv0ak47hfs4obh4kdla0jqm6jjomu1jlu75bztl7nm71jstco6r6z8x2gu0mb41vgz2czbltwvrpskwg888inv0wiq47nzk92eb87nu59hln59x6ru5ay51w1hx19i3agcpcvq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'vcqgkp49ivzlpttx4s4ocsiu767470pzehg9brjr192ri1ghddk4rqkr2xkw5mfcgvlv9g2hfo80nd09zar229j2vmc0glbtjeo7dr9lhlhv2jibykcrjuuc1f5j5lah9kaof5x5nxh2lhqcojfawmlmzpcwo3q9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 't0xdb75cvgxu4porn11docb8h6jfr1xw9ychpx3i0mow57i8loq17cbjxe2a6qvbtc2a684mq1ek83lvwropuavl5oo9nejqr9wgx0yfas2ifhxqe0k2ig7alft4xbvtg753i3iqdmf56a97ohq6o5pynucetvpz'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'm7zlah5rdcgtuuj2ntssncvclhpx2zmxmkqlmvk61nalhxw9tduj7s2zgiefu55w07ky3vylzwcwuobs802e38ebf4dmlcj88fhc6ln4xev6fr4tdi7vo5cngvn5r6fhz80acdy1dgy1mcd43n0nwgbxszz6g52r'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'd9wbn5uqre0r377sm74h2fktdjx8ctikpp56q0sblb22s627576oiccxe47jvdsue8n8jxiuvhntuh3b9s1dm4qw6vwe5k9zp446dowfe95vr8w6yc3cjfu75y52z0s5h0j1k6tvpf8t45u295rq7wtg2p6p6q5qkl30utpv98w00gf3gpeudaqtavlb98fp0y6uykfcmkj5hsn1abxza437trsgq01e6zsizhduhbz2j0xwd7gkjfnozxwjxfg'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ogdwxjn8q14xs5dg4rd3zlejalcvbgs3iwq18nzc5kdvh3s8vli40fpsv5f5fjhb3l375xjv4y2rjy6a7q9qtbnbx8m7wid1v1m5ibbq8jprc31ozzkfpm8nbp6davrrgzg5kt9xja5x9hd8gt9ukky7j1c1p9jv9n6zullwezx5fih8m9d09cznwc8v59cxuusdjd19mrhoir66bk5vz5rt7xgju29fp37cx3epa9lonfx7vbj8p4feozw7472m2wsmzr35zwvgdef0ufonn47b5yyqnv6xodj4iacd3tknik7u135u4v1xq2bhdx6h'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'skq6ddyxcrf1nuzentjps32dhhnaprpemcypmpblbxy475yr8w31li5g094db80cbmo9h9rw1jqrd9s22riqnbozr4ep671176j0dvzic9emxkelrgsfs6hgpj98kjnlujtgueq6v5zeque00bnd7gf9223krm2l9v120efo0awc5qd54ab0o33wya6o81vp55fkv7m0iusvjjsse98b0ymi8h6zpyajoj7galb3pxoyu778kg0afjuqqjhj2fljfn9rzd0s9h8fra8fryz87xwru78nh8h2xwddn59czrfpjm3ixb33vxlfdfe0fn8c'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'qzvaggd20ccj8nymw4itndtu4bf4z213nezoofcq21dxcymkgc7ih5cjad9j1j9txednemzjk0rmmtydcv49yuf6rbf3y5ywf7brknryxod3umj4vif8kok5ubv2jqznvrow3aki23hgtnehyboiwmbhefxs807uzx5gqm5nvsshanlby04znikeuomanbe5ya7odwez76cz96gfiqwzrws03nn453srh2lbmsl97b7u27faa3asfcjga9du5a0c95543rw61vyokf56k13xnwho98x3jjalh85mqflwiw1nl202cfdkw6375p747j7fgbwfhbm2ztc1lz7brucfwkfutgfbpn482uok4mdte5gghs878rfb696bfzaxjxguhp87hgw4w5yucufl3wgkjv872jtrdwsk5vk5pwt3aq6814ek5w2bgpdo56eg3m6ew4vze8w59zrzokg31mhneicm1gh6qxg31q9qmzekdh44nvr3qf5i0189z2o6qim2q3cm78em7jo8ylk3w1484b54ifyqepef6qcnrxfd85y92jl4eez4dwr6q0yn4k1a97gdnx3nxuihevgsp36czfmnv3dm9nzyyrhimte8vk7oi9iobll42xvwlgfr4aw9i4budngrjyu4jghr8pr3c4xhocd12nsg3c6aqckgbtw5wwesbk4q94uekhm61b9eay9xiy926j9h5sb38lsxttctn78l6ced7bzie836fujh191h1oy1w3jzia2j6fkmif10sqxjqs4xpux0vshn7lqgngrkuigq6q28x7sms1zvew7rt13eelxc50dc89oqxvruksbh0zvqf8stm9ejvn7ypvbt46yvtw5f1uxqqsiw2k2guoe88ak9p7f96os6atayvu8n6sxd0xsz44aegxix92iwm5zv8c346cqrmk63vlfaamfnytkfb053ijh4jt5nqu65zrh7l3ewweqdsjvte3k8enhoisomo3bg83eyy9djq9hjrs117abxvxu2'
    })
    parameterValue: string;
    
    
}
