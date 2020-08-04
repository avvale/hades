import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9343c62a-8471-4c7f-b50a-684143360b12'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '0fnfg712kyeksrxpr3u2eef7b6j8wseqh3c90jpw'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ee1eab2b-897b-4450-9475-b9702c3d35c5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '7arc427b019vko2h80797ldz8b3y0xy6z0j335hgppavxwgp0d'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ed4acf7c-f224-4408-bfe4-408375cfd2fa'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '393ai8jdaow2qzuthawg'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '6dxxpbk75zelicd5yb4vy0u0p0vzu3rxkljochd3y89c7je1ycdjh8byz3bgjv18uzro09cs09v5rt5jg3x81yp053i358zucf69ebqoz1mmonk03qv8zb0ieb7toedlxvrefvj1dhy381i7d3x1afs4wjw5ykgr'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'pdlqum6kc7t8ymgu19x7r4jok9ai6pentohk9fm5c0fgimok76xl0bj3piftov6b9xrdcwh4zxuq4pmmcrbnl6g0hcar1an823jop40040v23ijjea1fqupmin50pn5cgm3l1pnld7j4j95swmvr73tn21n012zi'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'o2r5i1bm47zsi8q1oqmgo0i38q3l5ov9gv6hw5gz4s0o19vp9kn0atzcui02n9bvr41f9o08p6smpqqdgb8schojkc44f7yjheq0d39ujmf3u0v81cuc77h7qpqlavxn3h383uoj2u3qxlclxjj40ae88vna09kl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'vj9fxflx9cxjr8bs7h64nf423my31efp799keeka'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'uzezkc4mx7jhi35ws5zjb5qhvmy4hfbszx0w8keew5ob5ywk2bfl12m45l4ldxdcvnzdcpehvar4fpxjci5p5i32uskbscx17ec7u8sybpevnl2ti2tpys7xeisw7bpche5rcib9sf1buxeymnhzz9y4ibhkczuu'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'hc5jlivw2lxaz5e9zerfnqb36ajxhyt5wszqn10273rv6gmenrinu9fmnbk2g15754upg58te0abaww7pf95zl3g1jcl5cry06nz8h362pjqjt98x5iltmjkl7dl4eeu6jkt623k8lzrwg8nchc2bdvpw00277n5'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'vugfao2oxef80jqp6q5eanp4309lpssojh5ipiygwhkqh5m43gvtgjv03cn98od4fuhcms6eunuzb4v2h5s50c2z000t37fo9pumu0todrt32y92p87rwrjrzsfsbprnxlddkdjqg9pqvotmhtvdwfts7trn3obp'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'xcmvi2pe7ml1iopac7sixdt7tcw7q46i6t173poomkjsqxapld0muxnvtrk2u1uh61156n8nlv5yaqwkwo19lx79wu250nfsx7phfs0lqdxkg5t0xfs24ygt6b6k2xvxehfh87uwlozz0jbnjtviqiilvk91ttyn'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ysi74ep1rr93qtsy0fll'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '54d7m571rlx6rhsybcmczdgy572hubl0yc2lr5g5wjtr2orxwhtg1d836bum'
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
        example     : 'x4rlq7gztkm0maljtfmo8573rsiuqd7ro80eqrk3e0q8yjqn2sxqnld3hqq8'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'icd3slaz7ncxvjksaeau9lmgs46y630cyun0uekz0r0acm6f0l947rn4tw7v'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'azd3iu6q8l02ymn6h50b6980dnjckqb9pk0k6u8vw2rwxicif098capys5wsfvzbr7qydtt9dhhbz19jrp60sk353xqzfmyba3a8qz0e2tm5na7pfop7d83xvamfehhv4za0239j4ucmw0rki6ta6xexbvi2ycpd'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'jc8kch004ndgn26lxok4akqsho8egs2uu6kq93domljwrqxu3nuu17tv7zwcoth58v8mnf8mmhxu0xp0v9m0xpmcwek8t7im4an53lp0q2tue48cw6byu7fjbp4qf4aklzmkvvktez3gwp4cxi1s5gn63ggm0it8p816xt85c57rgx8uplbks50918k2mv5yo1lxj4kbkqyl8u6rxujrxippa3wthirj69vl4jovgv0bf3685bhpd4zf3tcxsf7srd60acs6oa5465xa1b77zp46i60rjt7dqarh5o3hbwsnvz5e8xitnvi7juchj2i7'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'btxhrhg5afd8sfdc2g2sae166uvdglrdwstrjr72ur0f46nb1v7gzuk35hrh'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'ldl8nydfswcxva89gs5jmri4yj7djb9nsc6xf9wtkuxxtrhb2t3z4dgsiyh3fqchtgc81qtpwui89bfhx9jkvglrhmw4js0wv3rzpdje0t6pbluhjtmuvg78k9610z8nk0r8ltwsli03rgazz7i4ts73jguktpc1'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1142821494
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 's1fno6bbekf84qy0a111xmf3rpe6wwby7ob8we5vsxevznf1tsod4zj76brbldslptj6gd07eblyg8c5f1yufeownzb48osea4djf9aa8fx7xd8s9oldiyf5mxeiuemrhbl8xwmhpm6b4fe2ymqk50qvgixey4nvz3mm6gr3idln8bxf4j3llcu7xazc2zj4u8tcechsajtx0uky13r2gi2kvmeybbd0xqoatwqmp4jipuutoev7sxko0bmxe0tyy68h3bj9e8131opx36b5e3qve8ij58kdvaz88xe00ifwda11lvvoj1tk5866yeumdx304jund46dilonv82dwddz8no0rtfbv9jdfbe7habgkg9yyeso70755fyw7rjxpb9nf1im3wcofmpl7qvz0c75609i2u63ozunj7lpiyfzu3crvtpp0gcfghb0kmaw45advnb6fcaxhcd94nut78pvyiqyjd7sm40mm43t28ifswclg3tyo40y1c331vwen55nahoajheqi0hc2uqfyp4ddashoserwrd55m3ytdgipokimuppvzkm3014zif40kc1whspr0408a2kewjo2tkgospvabm7g1k4m4iquwz6ix896usy8e7m9ran0d0d10bplx50pq0yuc0dbmw5r4bib9njfiw0fwdafweq3jo4u2o3c09drot7tzmk19tualz9rg7pmixh015bmo9hoge1uh6c0ahiqprloeyo7onwt27x2exhzdgmxz4kmus4iez43tx8arybz17radddidu0aci88ge70lj3ot9nq9lzxb4xehl42ccxb0ex6bxlxoosg25jgangt62ilfsevy4d3a2riie7diz4e94i1btcppk5vz56pxaupnv1ppv3fmp7rp8dg80oprp3tt4082cz1c0066ejbend4987railx77a8qwtfbl8lifn7re8m3s3nlhnnsj17z3rnflf6b1ls42l5pf6g6wlxx59rnio1loz1hhckwr0hitgwztw'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'dtsqn07g6z5jaxossadqc7fzgfbcwcv04mh6l3cmpgn4w9g87n9addpb5czkfikm0idenri9ezhbtcv54flyka7fvw7vu7q9vj29ir8jqamns20mg046keg5ic52phag8p0z8tgv5jrew93iyuna3xgdecol3zb7s91utulv8umvl2plojlj9f8x89y8rxwd0p4plwryg0frkq358zoc096y43phz8oy3jt8byn8w0j0gfwntq9ukh5ihjimcww1dcqipj5bdiaqqrjoobwc46dvhe3dtocmkixoj2wf0g13gffb8aykm84j8rcjqctj3abh9b19mu4r2izuli20mfl3cm6o76qao6gx44xpjg6qc7c4nhj96ekpvxpmchyyel6rvhcj8nn7ec80zka9mskskczypg8hqr8mlhdez31nld9qsjilxpi7b2r8nvobsju3vvl0lue1llm9hm9r33noek4cqepo64iqrmqfiumfhqxslcpppa31r1w1c4mhnud92b22h4am1alo1pmc738dk178mptwu4ck4yqvzb8tk5r51xz110i8sz370st69rwugfx5j016ylqjirjnp1lm5hu1e9en3h6xfcwgrg9ll0xxt5nyf29m3h259umi3nzcwvlbgvvdgtn9dj7l0qpezbe1gvbtfu8xx7po81xaoap9qk37crdoilnbmypdfmakn285q5rmts7282txiqx0h9av53771dnf1f394a726tu2f9tvjaqesmm36hm4cc1b3asm9apc6yw0fuqsgselbfltl3l63x1eod0yzeipvlka7zafr0dbsnf11q1es8mckgzcg6gp5knrsvdaem4x3mvfn1hml0jn6lh8tnlowjxd5okr6b7jmg94jmifmu428u8tf1pmqvracyj5qz9xc2rfuvymjp2dr493qo9hynia1vgla1o5zh7wrmp3lb8vknf7ie3d682evq7vitbalwq6lwlqpxg21zr7ikaa76p074chjbbsv4dvimhc'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'pte2h3haqwrhk7om1hez2b29ha01onod9mvaic602h8xa8gm8px0czf1vkur'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 2139707786
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'yd3f5gdu9wjkdme38weun5k8f7j4zs0trhirhi1m722lj450emc4cbelvbdddb4h0otjj4hebu7tuozr28u8omp5je5nflhk0qlj2x6xkuzrkhyzue4wfp2i2k09mrw7w33r7v8i2ubkojklej76ko9a3c6r1h3z'
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
        example     : 'yo4lo0x7pbzvzb0zomn7mh4wuc3rc7bmo42ykp65oafbniqirwpsdyuigjq2dc5xrdtsn4el2pgibfib86qdy222oo79iiesqpnqzz3xijb09fewn6165lcdpgm5yqe3q646b7uf5on2e1ctgd67nia6uf4nzkga'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'oaseu326s5h9nfob8765'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '95u5bld13n5iow69aqtn'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 09:36:02'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 14:13:32'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 15:02:20'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 17:25:09'
    })
    deletedAt: string;
    
    
}
