import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '29e4040d-242f-42f8-a1af-31d6f5b953c9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'tm7u9o9gsru9lf4a3fjcdcbblfp3s8ivwc3ijq04oyloq5mcbh'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd53c4c82-89d5-4a72-a011-5b34937c3ff7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8x9iidn44e4digb7pfna'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '01b5b256-9e4a-4b87-8258-0e53295fa86e'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'dc167wt5qqkj5bh6madcwgv81u35hlbyjfprazlehb81moyeluedgivt3h4n3gbnukgbtwkc0246t63er1h879vwwxs4vupe1ogxd6xd74okv05r4j2b6x02xkxxmdh1l4hjzpwzqlnyeplil5u5yn1y80r7aknb'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '0kroturiqh0w9vt526jk1o0x7hjfg9y3p5t21ljylpxdugj49t6hg8jruxs17owwfu9k8sp3hz8mz90rsoc7du3vtcryzjdczg3jto9q6meylz1y4b4o3ng9i55v1k2ciwaa2j2b144it9625ll1apo2qv5jnv2n'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'b97tud39dizx7vrhkdwyw5axl6jt1019hs2tieqz53z91b6sxmb9dg66wh745bqjjrgdbtbtpiv5ytau6jvh9jmvu2vos3trfkk3g8z0vcsjfkecfb8nql0guc61km0xppk80cxayd1gcmludo9uziq9bx7gt691'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'be2c7a0f-d401-4456-81fc-4198c6661f75'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'divlqo5h8r1iq1iu4c2bw7raandjbkhcvz48p4bnz28qj8fae4rbafupyqatdxvy3332ybm9pn3icsw7csdgvfqndb0ggxip6g96tx0b3a67m0hxjw3fc5eaq74fssi01iqjpyc40nob9x32lkqudb13796wltua'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '3mbh92mtosv6gwxxtr3li7thv522b1fv1p5xuvacsd8o65a3s6xxlmavybkdxxuayq88ay640tn0c4a7uex0t78eo8xuzjtcg419j1i9vp3zvwj3v2ap66x41ubrcjxkdgsywtcjw9ttxulez10rn5lg7fbirlmn'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3q9jj71y755fw5ho0y2nljr20ggl06vksgzlwdrcelpbr2x96auskspubnvowqohq9uurf3qhca99z0v293q4291r2rg6m9fb1qx1bfczc024uche9dl3qn26sqvdm0z957m9euet1yd7hrj5jujcvf585zv218j'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'b40yqovo4dpx3b7aj02wixhe49qmmgc8eyiltyjbq5zmdqhl9t6sd6t5ml79y7vz85eya6flczfcuwvnctyvph652bcgwwlciutktw846r8d0g3pzn6wte8htvc5ffbvsb5absvkulrp73l3uztvn05vf6gkja26'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'r404eyupifemu1taemws'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'j0uoaanpq5n33mtu0zwn6dacrg4bl0b5uen5hb8s3aa2pr83p222i8edeggp0wkxk08ki33xdla9fdfaw1uynm5w26octorix2kozduqk5tl0ll219j3pbbqnepw0p75g0tj6f5fpr3ttdhrf7a3ke21rtxqy0uzt4o8dwytxw22vhknaqj96qn61ozyd2ggkqiitldv1qy7vkta7oh27qgn134kbx907qga6bbheujrcs59vdn856dcsxb0ndj'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'uszn2ei6zz77cwaae6tjvydyjt24mtyxl8tw63s10k2l7ubj2tx55v9qlab4qzl82dfv27j0e6x41sribv0lykkd9f86dwqveu5h5b41l3ezoii6giy92dzr5zff9h8j4r6y675w2zykkd0gxqq1nngjmny63nch1wzyzrdjtoscez7a72qb6m7f3k3hgjqbbp3b3ilgf2xcuom1u8h4o4bymzb8mjp5gfpgp3ypkpvl0annghms4n7nnkmleittmxo26x54nsqqoj9ukkmqac7uucd9s3138op9zvg78gyrna0ezpwilkjgptewtt7b'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'fz9hqmyc72sgxut3g8eut3knbxqd6bqunlsqoxpd5mbkdqyvcb8xybvld0hmml9u9voal3j764lyjhazffv41h9ave1291w41klxpenln4yr1zgze8xpwtb01z54f3w2h4xysy3bk45acjgdmvszajp10g414jn41ff6yqnorw7dmck82lta1hszzqisfx3sbvrkxzgyr4z2wmnvntd5mkcxatftfg06td9cuhgqjrs7x6vcmyjkbj12d3gmlqqgjgaj574ui0zsr7qtsklo4vdv4120trpfc1012cktndcjspan5a02bg72ml0640ly'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'j5zd0b7ijaks2jxnru1hl0w6338e7slaaochz9dl8adomg6kk88u9te626lbsm15sz1dhcp1kq9umruc2cgu0vmfzpw6e2wq15bc1vmqr3otcwda02aawpl3hk5c0cri47jdenedwxaplfwpt1zhnhkkxnpcdyhrogwgj7msqookwlnniif9gk339jat1hwyzd0s66zjve8l5b981bt8g6n4mlg7wpfg5bkfzgsftbcfdtxkzp2pki6wn751fi40om6hbuol4qm9srsy01992sfci7r22nfkha9hde57zyfgh5778t9a5zh7i5nvdek6tvwp7m847a9loxon7jobea51zwgr7wcdxavnx5dmmd3ebnhgvlor78f4m807zzl5gw3nker30soajym70tbp2r7qljm101ahtpagghyi2cnm0l0nwbbcuhvkxqp2xje4ilpi6f7htijh40lvslfxzsx7s9evnnfe2itp2jjq0t109ompedpq2rtt770o7mm02zo9ork1uoq4zacnrh179o5fql0sjt2qynwvlc06yxu9z0beyh6vfu3rjetlzxz0ea0drggrsucevnhyivg764b0kwzdt8lsslw51g84tgez41rd0ydttexh38sd6ynxcp3enkp1h8zxvs2bzwb6coppxvp02yv61e23sx42r3zbk1g8uc54vdz3ibxrmarmn3ze1qyx1etyxwy8797y1nrfarvwrl79nnsfxtekgzyq4o450nq15r6bmpqca0crc1eepw1gqtevpf02wip9um4wgv9t41pg6caoqlecd9o5qzqlabev9e8gt9tlwu5zjvcsqcanr6xp4e21wnhqtop0ay083avpkfh6r8doxrn089vgjhtt3jvhl5ip7o48glvz0pv45663huucgcwcsh9nn5ygxig7hk2bgwl5tq10c03dk2ckh43f5t25u5sw8mzyvei47e19phzk2f6phh8lofzhkmmfpk5dbrgin55l3t569rxot2ybc5n8mp9c'
    })
    parameterValue: string;
    
    
}
