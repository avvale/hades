import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '86104897-a469-49b0-bb4e-ef815dabf689'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'c06d84b1-8c3d-4989-908a-8f1ef53f1521'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '74c4b385-c908-49c4-8490-79460d8816ca'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : '4osiwr3q4hq84abd47ke4fjk69m24stiuix763lnx5v7k07kupybfk5gzr7k68n03k58lfqs8rljrus87de3wgsg4rvbbevkjzy78tln1sjnz108l2610qvwdwuagqv76rwxr6gmgkaaic481twkxqnpghn5acm0'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : '1sss6qf46apqjvafar6lzmxcn5a2xxc8t24uy8hcjmmm38wzxz4xokl1betksgr6h9a4i6w3jy0mqz6wag0pkamgirck44tkv6kovvtdbekvtxwy0u8rywzuziho0s0ll2oe4vg6odjud37o4hjlqspfwpi2f7gu'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'fh3y0xwola4s1pru792immi3rsijo3hzfjlzbnix4tc02kaazacpznvnsbh9a7blfs3ayo5urabnjwtgeg4643y83rp6mkvdykr3o40rxx1gjadvz59ifkhs7xpjsvk3odzwu6nshcq249le33dosajy7uehqbwj'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : 'awboe1n68q76dnzuj5jmzbam7mz9lrdpesxgp9x5zpzty6hcwbknnhat6otg36fpd257z166cx7xzkoe8x7fpm4z2e8b69w7ahtn52hgfihogdve9sggisa2hrbddwheyoxz9xzqdbf00hm7fvsnbb5o28x8yl16'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'i50gv9ink1iz7c9z3iuyqk1y2jgxtgl5depfnoip6jbjqzxg5v1o49hcy1nfkyvus56bfd9f6od38s8qaajin6od6881x07cqrznhcg6ntnvrpjw3e1qtboxdp3c4v2dh0ximss1j83cmm96ybekzxx87vum9g5e'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'eur1lly4027acf6rwedc1vxdj6r84o8heaqidggpg9fxj7xg7o52tu80nrctr8qdw81ar8j3fm1gsv02zsi5cic1yabffrm39i76yvb9228c2jn1ccudramdmt7o8w8rwtztc6oj4zktvhj6y711tsuyvvvhctgl'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'odd53jlf2fsln2fpczcomw3nwno0gkf7k0x032o8jfagcilui7zz6mk3e19asi4vqq2a01a5jw041mlz7jupvc8cep2r7gdjc9jpgvrykqkueq4bjega6pm4ydcouq2x1xi7opnfvinzt0fv6e2so4g8brlz6a1a'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterType [input here api field description]',
            example     : 'ovs0wim50w2yd2rnttbkoqbs0kkxqet0tq1z16yuv1aow8bw4oq1dci5eg3d'
        })
        adapterType: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'direction [input here api field description]',
            example     : 'SENDER',
            enum        : ['SENDER','RECEIVER']
        })
        direction: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'transportProtocol [input here api field description]',
            example     : 'o0omavap4v0vhvzqvuxafufntllzxu8v3ijz9aozjy07gan9fkjufp67icu8'
        })
        transportProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'messageProtocol [input here api field description]',
            example     : 'p5pfehdc90hgk049qkp1ijnzjim43uisnnktefzg1rk4b2bnoohw8xigzjed'
        })
        messageProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterEngineName [input here api field description]',
            example     : 'si4i2tbc8bcbm5ojrhk6mk8z0asibf5lm0apj8cjoicg716t13d5thiqgf56nt6ztendpjbdgll4z0ka5atuwnylevh5c1bgeacytwv5nlwbseytflp5fo6m9l346di165g8kmghfqq69za6slgxz8a05gb1tp2b'
        })
        adapterEngineName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'url [input here api field description]',
            example     : 'orb4x3uqojxv7rkmdqunn3qkbwtdxh1br5ok76k7dzo41akpo8cub19myy2s01epor2xc15l213nn09t186ov9xgg0dtci38380hv8ecogx5qt25xwgtn8gqg8jx4y9kwvlfae7ofg7xbz2jqpatiuh9d4f2acblgnt0g9nap6uu2fyqv70t40lktkcmdh1furtkgwws8emvwn56h1fr3lh168esrahbfwcfscif1wpv63igxm5a1syvgutvars2hgrs35fxh0ohvetirnw36xdq3mzp50z8tgbxeqc4xbjd65tbnlke4fh96cxjruy7'
        })
        url: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'username [input here api field description]',
            example     : 'xj56y0ppg1vnbgs380r082hoqr18e0e3z6b92uydh60o02ywi0bcxn1uqydg'
        })
        username: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'remoteHost [input here api field description]',
            example     : 'cus9y5jy8r5y69onevg0xa3jh7000u79650gusbauyp7u2dxcqmxcvf4vi41va3q4lfai59cf46qz1tueddw3j64wq4rcqqlk11wgaj1cqirc3leibifmwhx0auuqud800nx6b0x4n7ycy5e3swkqlknd81zzvqz'
        })
        remoteHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'remotePort [input here api field description]',
            example     : 3906538119
        })
        remotePort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'directory [input here api field description]',
            example     : 'umk1zcyg1jnq500qlrpeis1qmskpak1sbwldgvqo0enfgd0p9z4q4k8lmksmwbyl514rj2bw6p1z9n1v20272ajy7l5zw45zaqmreie8fzpw0ncxf51y4uawjo3g31ibdaklnky75w3hb341b5ogkdjmcjo9ndk9idsn9juzxm62hprelk5qtionjx2j91bnmt0row1roe7k2yphh7995k78z22b5treqn2a6mhu95o62v8yx1su028wvgg3t6fj8xrzhkt8vuz4p4xdr8ww5df3jggbmo6w5x571d2s71x46npebp2mews2165twt6bs0a1jr3c4uy6t0b04rg548qj29m4jcmocin2p6xmu963ttwsmo4wweukw7tab7yv5dx5xhf0gb12zbbldk14u09xmzfq6dze8e90j2uqyqcrxn1q66yfh9ydjupw9jmpo0f5zlctm1rcl7q7bb1nkrghqcwn1vtkfypigfa1a4pl6y29bvsj8ga0zwrfgax887bagsnsld3da6g9nrlbwjadibwkeikrkvzdh772mouznrqbbz5n47orump2hdjx1eal8e633rvy8p90ib0r4lh3rr675uwj8g2oq0iv4uoc5rij15q9w6cxboyg2tr4xflzmct2pakm055v5j5rzehvrwsl9p40f35czkkjt01djka130lg1hzno392aqhdc9gkf335wbooeq6feo0u5v1ewd6trdz8vgtccjkwxoo19hgmddsj63zcj59p58wcn7wk9az0fmd00trdh1ab5kr5i1epma07ap1wort15yyfc4s2wdmi7g6bh2seupqufgsj89v9wl5xmn10q4m257i9uvrp0gfpkn7ysddd0e1fqx9z1jq1m03tjjv6oxd3b0zmnldjb8z1cxywbkha6eh9uf9exozvpkkuv8ko9ad29u8nv5xaozrt4rvtjze4s3e5pa4wweaz6yyajpt27p5o95t9f95s807pbfk2nzdxtdr8h5u94a14615lzpue'
        })
        directory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'fileSchema [input here api field description]',
            example     : 'wropr223fjp8idaet4j262tgcd2fnfrj1lv7vpok79422bvzjw8pgx2xxp8724m9v1paiin6zwdw4p1psho27mghjz4z2w7h2kcxrnkiqidu7ddayk0750m0ipr1ra231omvrlx7u1kzkyyt6uh7f1kucn7tk7rwfk1ggydodu5vgnz2a3e7yaiap41lyq8ggvqvefshn8byz45bob57r65yo12hwset9qrkn67eiqa5e7c3amb6a6l4zg5nfjzlll6lx8zh9qah8aulwx9nqq29v78ggu3cgvbto0oia4u2hksftn0blyzxueaq0ys52op6v4r5cv88tq39hukxdhixt8zjkxzc399qi6x6ggawhzu4f9czd634vo390fflmhu70l765uw4tm3f7qsdjj1yo3nldbfrqbhg8bnfmis7km0hdvrqp7hso3ud941qqx3w10lbsffuukjs2ji46r0km5bfm4yuks3v0qtme2hhlgorqi2qnz7p1cx3vd0n3g2mkhzrcgijt7a7s2mzhcnsbrje19rf7eafxdhwjjp4co8s3oy6ynsg0nlgvj58gvs97ns7nsxwm4ic6gpt8pdtf4cdxq9os7sxso9gh5pr2lr1hojo6tjalop2jk7xj4tfepwkzxzi230p9si19ha6jzukh8qodc5u5rf05ysjz2xs9j79i4syfge7q8yu7737mfmrnske3u3ic1111s5lo951o1270kumeqn7sglr1cw46zu4wuum85uyqh04kmfv88nyz3v1gv06kfech7x4lccbrvdg5zj5dn08e27e2h89ipc1t468p7zpchds44gnxeo56sa0l9mhugpqmagd526ft027osiqznicaa7yvv7q4797bivkw0ywxjrfv5ctxfr9e2d28cp4ot7reugvfhcwcrbkme3b3o6pow4zyzqll4f0io39pi86aaso1pfehsdflx7siur27xv84gizhx7iffw5bgxbd2np41rl0oioihlosc1o21qxev9t'
        })
        fileSchema: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'proxyHost [input here api field description]',
            example     : 'eiexvjjk4evn3r7vp7jimr0f4bhq8hddd82ia4s9wifkuvd4lvdhb1kdxqhk'
        })
        proxyHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'proxyPort [input here api field description]',
            example     : 1387489047
        })
        proxyPort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'destination [input here api field description]',
            example     : 'wztrodkdi8cnhpghufrpd80q5j06t3o81wyryyvnrzk06jib4bqxgjqyxbe418ykgoettfesfqfqbv7cp4lqclnlmwszzldl8jlgxv7ghjk66j5ca8mxoxemnx7zpypxblyjcgltxvsn198mpc9r7m9yu8sqhvu9'
        })
        destination: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterStatus [input here api field description]',
            example     : 'ACTIVE',
            enum        : ['ACTIVE','INACTIVE']
        })
        adapterStatus: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'softwareComponentName [input here api field description]',
            example     : 'uzxn2btzxzpnjaj9xr5cm0569i3phsvaaqh6lgzxjh9l72vmw5f2c114k3c1pzlsh9l7uxjdvantr0d4ngz4eurcc1hwm1jkpmw3snh5ojjmd98q7yz6tjtc692aq5xymvm1ilwccojymzu03gjn0ni7wevm8829'
        })
        softwareComponentName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccountName [input here api field description]',
            example     : 'cg9lc7m8qgw5htm8gse9'
        })
        responsibleUserAccountName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : 'kxvina0zllyhfy0pr9un'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-21 03:35:14'
        })
        lastChangedAt: string;
    
    
}
