import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '5u8987bsvshz8qzx0kg5zysq4u8z7876c6ht99cy'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e80df54a-9ff6-4112-9094-2d34ab64415d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jj0zfph1yknm3lqigocwjnfwlq3c7xfgdmoonhzkt5m9072tdj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7elzoosuuxm2teagfdsh'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 's9dce32ueus5dvn3sd5z7aw3614jvifaa7nn93ab4vzwwkxk70g2njxc2mvjjrwbjuox3c6bb0b77fppds5dtewgt7uobjjf9hacsq5xgiduduhm56akvv5kyewj0ts9s7aw7rc8853rvszpifmeptzmpyunq21a'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'uofj6gnj77ieutkp3o4sag3yynzzz6g2bzekvjrjp7tjyz51ss9omfy2itvabm7flqh62wegrdbip8xi99ban8b4ezxjay1j2yodqftsjxnr3iiz6ixfi435rj775cdyan567lxu8qwu3aaer1ugwurxr9kmy6ns'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'x38yr6gzlqyq5zmpq4kybd0t1g07mcnnw7madj5e2n5lds22ourp8n0xmct6by73xrvungdgcrdmg0jqvb75gdzdpgy6tpmbittz4y09r3tvzaa89uxoolrieb1f4a7wx8zg14m1hpvid91ubzcytu5fduh010s7'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '81f10235-4988-46f4-a5f0-8dac59da6d6d'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'iqkc2ts0195e99qu5g68gvg19ot10412evhn12w389u2jrw4g0tyn7so30ris2dz6r1ag5vk5zzf7gal2py8pecluhreqmwp3jm7cxxk5dmyf17e6whudw4r5w2pczfarewb8el99zc2bkyv6d6x2tcczvuh14yq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'i20ptpc594xe08vtyot195q3876q3dpcc490o2a7qt20bi43h397f0ypgsunt8g65aozcghpn4ig9z8jfqirkuqjv44pqwmyvqzdm8rjc2x9alyjrhjcjepuxkn1gvgtxkh28b9qifztk3zi5e57zevlp5hjeiv0'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'dfp7umm6cql7g2brfzkarub1p7gjowkhlew1wphrcwvl6058gm7jca6b4ky60khhpb24oeoi2h2edne89hayv5bk6kwlqg4ih90qe6f7tm5nsqifo4b6z4q2imhaeutfq9a5u2jk2cm90n6bt7xlhi6dszr1tkfn'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'dortl61i6fee0kychjct417c2isvtescww7aep1bzb89pnra7ang3p47kmdksgo60h090rq4mc9b3xu7urv44n5hqni5c7n38ho0vin4v0kparz7sxm1wypi0cn32c4s3vg71ro3izujr1tru8dccu58t75a48e1'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'x9ny4auth4f12r11o8x5'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'xf49ke5cvwrbna9d7nzrrwbjjx9l0p31z18yqksq3ov9eagvilqjzvpvrrhw'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : '7z0zp6r8jhwyk8cg8hx1gtccmpfvnwjqs4lc9cjwrmjjyul0zqow4lj30l60'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'fn4sg28y1gbf4svs1l4zq8ahc3o3pcz2rtfhad6irgdzz7lbq22i8ia72uje'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'qamp8egztmg7t4ohboqjcrhup5xtp5p092yyxv9nr8wmppzarrfahbx10thsrxnxuaiaranhh8d5k3ng7ln16coqd1cs8zapbx93ppx6pb72p6yxmp7413te035bnukglkq2fnksfyaygz1v118tmko2oqzijsjk'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'svkt90mlmtfdwieiicnu574p4837t3oivbm5pgqv14yviwbfruxqum3r9vck4cialgy9m4s23cauys9ivv3emen0pb4elh1vs3gc5e77qikkdns70sy05ne1zir6t85537eb3qkwt6hffloia5d2jqokpluqu85v2g4qpej2d1g564or2qx1yyuetjdla571jfdj6x0bl326l676ylfs8rq2lku35b2ev6lxq6hqnyzurxg2ec8c5hkz9jf17f1j2hdw6ftca89twytbx402y3gpqnfplj3scakr74yrcd22f93a7cv73v0bpq9kl88t'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '2n0gdtue0zfqxji1oiog1pjsdnucbghs5xswu8iahps94hdh2pyw3xwo8tqc'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'lbptg7gnpo5n0ki108x5w4qpnpwzxpz8w6nmmiyzfikn5padp17g17vxsj26dv40eobdkbbvwevt8b36l3bqw3mws1cl5tllpuvb5ka024augswqirhjq5re7ocyctlf9js49a0px41o1oost0znppphxykdko7y'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5750607652
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '1ti7fw1t17b1jpsf4uq66p42zbnt6su2oaubx11noy0yd1gsczar3a7qoaam7211z0bk3ow7deorj32fphn8zfwz3hbjdavu6umu9yx1168afw1sh7dyd2ptvpfna3phwpbq92pee3gk97xme55rmjfeoqhtlvakc90h7ylaebajbjrrghrrba2db1kmrfi59xigjeqaccg4bgqqwcn8ynmc7jy8rn3lgkp89p8v622osz3w6hap6wz0vyhhwv5azgjfzu7x6yaljcv9f4f064ehfrokc9dssu3v09w2j5ozxtmovlrmjb4ogxc9ip3rtb7pa1zghtmb0b0qxxqpjsagbyj6ke4wz4n37gvydwiafu0tfokb8jb0atsx69wqm1bnqho2fz6daiosftcg3ou4ho7kbnvasriviod3oafw9wwtj03md16b270qddutdfnpmccc3xuwddgqhvb0nphclxozkk31acerxxwuhr16311o4c7orohn6dinsvzawncmdr5886h3qfzkwczumso29x4e1gz64reqji0dj4500w03b48ge4t4sv6ck1wek88h14ffpghy23bv2ktkz0im8wck7ejydizieu6d3yas5sxnvq0v1x4pja3pivonqzaipwz374r6if81t037ucd8fjflrrqeel6cpiayjigwogtxzi936c939l9sjqvprs8f3eqjbin7o4yv1r8st4bi8q79dmzb6niaq32k812jp299dxdj0dzroe28e4hftl8ebmgzzpft0hv3t1attdm4lq3uero3fta98a2blrze0mjaugs3xhzjmwtab00368qo67273fydg49oh2lmxg4ntj52zq432n5jvr9tnqurbbck8dgl739kdihclze7j9o3lo6ext8lcyks7nb6po69z3brp4tb2o0tq0j4ximzd5ipe6svutl1ou1s0qbmg54ayaxqe4omap853zfme8q6oew3i6s01w0tuf74svs7ur3iyqjnyh4hs0f3xlof'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'qhbd354dby59mni64h79rxtymlhm8hx4mfhmx7zwqayprc1m86nom4f72n0ch2qmzdnogmbxwrke82vv4xnms7b66smdynfmetmrmw1xkfx7qadt477wk1eueu1zuq3s9tn6ppvt60j72s3cnfqomj45rl85l61gdkbwugtth7nl7otq4d4o5fibweoe5qhjrlnum94pghk5lb3276h9mym408x91tujbcl72x3rjv6tkvxgq8grqyqmxk1rs045rrv3dgxlesowzrjmnv8fny9pjpu8q16x4h4ie3p5xayvyp0zgcgghzinieixpmiy724bl05neft1vv5wubn7katurnmahrb3br6jqlt4f4c221d2ij5gp8co6n845ro9q01sld9dd9yemuu0wous3ack236zfww3kzt0j8e091coi2z08d1ugm6rlfz2kayxlb72u1luri30q4g4pcnoqo74wu60yzhyou0hrnckdp14167gyp97i70i2y734746y2z6zdxwit83u7ux7stqnlm5bltriyze1opfvl16p33myodg070ts1cbag7vxd520d9yn4qb55g1htqy6ndo0fz2lbzjf7md7bt1gzncjnsdu8so9nukkg93g4bov4m5f7xs9baz3472s9xemxb4tmhkk5puiq5n0kzfxflav5elnw9hb4ldugjum2ulmladslocf1bed2t7pzee3x0pwb7i7qt6k8i0eq2j9by9zhiom30jcfrv3asurm6m84ffkr1ono8ayw567258jbrcndo4z7nqvp051p6s1fnbnpw91ptmduwdfsgoz5l3eykauir6wx7pkylwysbge45b6x449m3qc5twwfl27kt4ovjrucgrb95b10mx361b8dqxj4xlje2t5zab609ow1afs09ory5uj3q4309mi6fzvjkyrg796bdeveq1a5d9e8pvkbdnyng018x7ge3ij5u85ez4azayllfg8kpgoy2v0gx96rkflhjknoz74ii9p8aj'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'svobmub41bikzaj0n9ybimiconcujd1k8szx115r7eehqwcaq0a2g0tv8wrj'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 1084930110
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'x9fr1locyorkh7mpvnix7s4icsijlkkzxxwcd9u4afdm297dw05ykc03v4yg5fmf289706y6uqu5r4ayz654lhqp50nu0hv8z832dzn1a7dxvqeg82w5alvseotf703gl9c9a88f8hepl9rvei0338l543q3rixr'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'jnmeoql06jcgagf6ffua86bqe2k08rwe23tka58sd4hzodthopqtjhd8lyn3vcgmk88w5onabg2lcc2db22a1jx6nnhr9ro33iukrl2kl95uvblwzqb5o1xvw6r5wbejn6tuct68sa5n348pfgi3w49pwiws2etv'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '3n94lx8cw0bsf3t5mqbj'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 't3pe07a8ehrjhge3318g'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 16:52:46'
    })
    lastChangedAt: string;
    
    
}
