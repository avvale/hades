import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a203ddf0-7444-4946-be41-956f42c795fe'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'uz7hp4bb4j2u39mduckneebvvx10eqbc6jy7ipnaywffqq920p'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'dtraq9prtwj0ouizvjuh'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'd544dd36-987e-4558-9696-fadb54dabb33'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '1chwyzz4pidnj7cr9mqrga8w78t3w6cl9ztsikvy72v4uttx7a97mec3h2ye6q8zn526v62adohupjdw2zfsafds37r6mhki1ks1y5c50fp7einwfw27hx59bx1vcn3lhpkbvy40rlt6ijsmhtwaqpyflm8oz6jd'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'r2bmxzu5tkto8o5vqfasviicdzs6pl7glr1ahzpftmcies4qjfssns9th4926dd3u52ncaxdzbznh85bfdeu4pl069fk2a4y51ybrvqxewo9vduv52p0ej967vqddt5mbxf1v71w6n5a2vbiy90pbflfnej9tiwe'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'dbouuiqjml5sxmomfpggf06bywj3p0lqmi8902sxz796igwd4ngt2x6icsa0dqsn4aa6attwgdl5yold45zma5j4bvjfj28n25va2ma7n5ksf3g8oban1xz4ws8mipzpk1fhm4zzcz2p9b2j2dti52nd1oxgzfxx'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'f2b49f33-e8c0-4475-ac7b-ac53454b523b'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'r1njqmjzri0ymo2bcdolooxctqtw96dli2uimd77p6bh89caozfa8uqlwveji13p6u1xbbbcoly5jvy616yt9ksalo9di0vravtjtxolu1i1ta1rpf2gvqz3mmuan0nit1fkyzktv0uz8kcpr2fglln69mi8svio'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'wn13twz8jf3idueitrldyprwgk57ugoipoui3qc8dkhdy123pslb0p48nlf11c7q2744w5npjjsa1g1ucw6ecbe4zym9pohqe8fhinx3z011n5asedkui2zf3trve6n63sayvzir2mcp05ufhg3ejxdxybih5ud9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ot98fsbzho6m4kuylr2x5dbgi44tx2hj79mbo6laypxvjx3uod7o9dn0yhv9sgdcj1qtxs6aktw2hr4nt31iare8i6r9xcauhjtnp48jrmn72xq0yyr0t2t4dapjzajgcqs05ehvcmr0mlao22cz780kcy1q2rbp'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '5mi8ahtg5rzu3k9ltw18gu6pkpiiihv9irg6h2y3j3ssxqeo9i0ks972hm7v2tmxwidkgu05cmii5dcw336opy8mb2v5b9su4knu4gkmol0qb9runtunu8atqdsa6f0vsjf3ckrgwd4ipu7nuzc3ywoyfxj6q3h0'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'c76ft0ckzesxg35p6aes'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'qawzwamw7yx7vxcbpqn73906g4cbe634dkf0lu6ysocgqaizdxu4tphuyvv8gb98a8d26e5m1c0ti4chnaoyg2udjnc0t9xp8yhnf31mt7tpz4ruchotmo2iuyq1rja9f77q3pgqxh9b7d2siemssffwa1gv7wa8vest3mhl2m4hp0cmltqvn9axzx5vbv4tpn74yqkqhkzexl48t6diqhciqmi9dejewxelft46gjf4icyfqfnnuf91gv30hpl'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'm1an4l8m2xt10finrpawgfshysrq9ouhdkn9wibg5xcsynewkuhe6jt2czl3njt27bpwrqkme4kch22wb2ok5impn6kjpfxqmoiro7zhgu27mkmwyl505qujrxjatqoe002qsokkp01h1l1dy0k9xn0wi0u7h301pmecbi686ulpsbd57kdx0fn40t4lqzr55u1m95bagywxddapfz9co90vansdlenxv6kdh9mewmkimy952do4abbvzz3lj14tcxt7yiybgtn9rsmbbwdsw4cz7waxzbklpnnuklz484ng0z7l314xda5p8np67eao'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '7mlnrf9ycchhcq9uyvligi105wyxe7r1svljyo980cnpwx86cktyfr7ade8shnok3lvcdgfvwuwnbstqkjdeobts2wxr9gwbybtub2nzbwl926geh3e7fp73moe05fi793ta380k2h24o7ejgpstae5yali2z5i03jjar4mf4ro0tjqd7apokgy81usd2le8aczv4uk4eiigxaic54owbyb5juqr95sie1ewkqikcefe8otoarv1kztgzwg89t876nr4seanv9gx137d5ttogntrvrb7cawjkqljavm31chiztjiyw1195msmsiqepy8'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'v01ag2fti1ssdyc7yd9y6n4ogl21wsa2usbidvy80nowmivu0ymmrmmzuconbwsbcp831xemoevn4jh871je3i9f286z2oq2ed798y4v2x7a0jdhtfl8m2q1bu8gcinoxln9rubu6va8sfl36h4m9yz1hmlt9ej6u9obmkcfwvwrz86u8p3si0mcx5yaicjf4a5xhscjia921zqjrckia5bmgrc6cy72gblbxp8a1ihq2ygwvbmidgwyv2ep578tjv5qmhya7qnj8vbjzzaa77vtqqia8bqnvuo52ou5j04qrrf464u4naol7v8gtd84c7vs76gh85dxld6ea46bl0anm5r9u7l4slmt9wbmx46wvmsfyj3ncys9qjmddgwpg5cy0yv6triueyg40mkreivllz71qx6kwhxtojptuhyjo529456mjze1pmk0ha7cbusm1y62ox7hsh1295fsev52zl8si0ucp56nl5petzg5am0ig8lw8rkro065feb0n6idnblo3uvi6hwqez09nfestcc73r3vn1stvmmjb3bpf6ahjs6pu21jwx27hegz17xtlrs7tka4mpa1v7xdgcs2rkq1m9ql37yqmw7kk4hhrm65wikdr1uwjrgoyibiycsyx7f1dn96izkmz8pf13wgrrylsuak35wfyz8kcup6yibvbjbk28oguyf4l6at6owtr7ckqp8zultgodx8nxph2v3dr35qgracu29atzqrskshinih8toaibc1bn9yq3qprqcfpcyrb0cq0he6tqn7d5yl2wlmm9tc3f8mdv8l00oy51evtb3d911er881hw6dqa6zx53pghrf4ghu17q5mk1iv7cxj6k7wgt40ag9tbkqvjy9g179xcf19ayq7tdhvhys1t64du5jlr0bqnesetfktgpkw02amh9ovy0xfkfocnaze6zzn89y3vrq7kgkywd3vhzc5ylj310j413ycfq17b6yn4igajqrb6d0dcub33cbh29b38l5oyrg'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 03:50:08'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 03:43:40'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 06:43:52'
    })
    deletedAt: string;
    
    
}
