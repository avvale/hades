import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '660772cd-dcee-429b-92af-5ff08474e25c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '1pgqwofrgaaz7tutbpu733r6ywierk7rlxjh77wt'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ea71f6b-0947-4dc9-a586-42bd86710713'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'wbz4n28xdii60g132cpz7b5w1dg6uskn7t73idgldrisli6ifd'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'iulfhlbvze3l64umow7i'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'wu09f3a5t5uroah0mwj0nzxrqwggjjztczdpv98ryovs86j0vho105f4et5sdesrffq5r5myb58nc737a05mqpcujw9exeu8imks6majwpxry695a8tqard46dzjqqnfp8sullcxr12ggr7k3b5zn5s494b4bg08'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'v7ix24ur16bujgidiahyz06l2d8un3bnkqtc8z5udz89y0ez9gvubq3ngimsre98mkfvi1wnlgrcte224gl7uae30s4fqjb86567976hn5ldrl2yrw91as312h5i4k4fditt2stb6iskbpzrcswiyhi4xhnkxe9f'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pib4msz9kumb7fxxd59cao3aibdb30pg5xjlnx9bngv89pehcr937ioiex3fd55yo623m1mhmyzto45ezxf6nxyokmhccwi4o99i8y8j4nkfuyd73shs6pk2zmqdzsabledfh9d8dfhdfitj4978hgdry58d7lt9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'o7hsfsawglzogenlgj8gxx679sh5rhn4yg0dxjkg'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'awwjm2acz9q62yh17a8ybagyhw636zrh32e6xsfn9a1a4tnurfqxwbldfjku840cjqwyzm4oax3vzh7xf81m6oywet8t0gvsgzdp1hhnqdem8sggk08dx60tzj8uk8qiulsxg2uhim5zsrlhistkvyp3r24omock'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'dgqfmlo1uf01rpae703bo1qxvf1t65hplol9cgoonn25lo4g2x7umkdpwj4oao8qcgl3z8k4dirwe2wi98z53cdflq6mgowf3wem7s8p6zsny6s6qkge199tmkqjk149qmbxoscammquzj0jiu0ovtbqtcgma5ni'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '2ogocybieh1xgxhppyhok373vbgn284luajjf0a2topqyhh4th0huvb97f3hf3ee6kevcqfimgqbttfw6lffcdbfmd039ettwcbbdjqrev51ca9wk4snq178rnwmi8a7y9mmumtzwp4e99gkabefj1jw8c5w8cdf'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '2l7j2ibpp9f5e9mv2vpqtg9kkhw5mqprx0abz6xwtnmgpz215ubz2gu4lxica0xfew0vmufkgjc65wqhl390ixusq5s7hvo68w9d4g6yl2f1bv8y2e6fjy4augmbg4ut02fh0gd27gildm8iy8orfsffttayl54l'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '8fzb0erx1zqtkat74pba'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'b0y97kpgbeutel16aafl9vkywimc8mqg6iykjemijr0h0tqlnvwtfbegdcou'
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
        example     : 'rlqi26f9obv60kq7eenrbfjngbb43p010vg8669p1ani4miguy2grulo2sdi'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'y7jbsogtakwwvor3cjj2h5iougmynpxd8rasklw9zmff4lpxgrznambitj5m'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'd5c72ohrlaq16f5jki138h55quafxu7spd2w5q3n8kb7o5kya4cl2dweck7o8w69o85il0fa96uvzia7rfsyqk9pti5fsy8v5c3y4pvuhj4s0m9fhd6vnvy8j48gi1oqvc8x58gi1el6qfbw8ikw8tk1qyeel9i9'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'qo01isj6jrtnu6ciqhlqcxxwsntihni96usrg0id28jx2zblw8aw8ltxqb8s6rk68ckydt551w5pqznpl770rm04jiyb0p3h9aeyil06l688xuikmdfeexwb6tlvwwcmol3911h2o06zk0nczyt5ejc1gp6vlgfbbw9n1g4fnsajxrq11zzmaatdtty5vngr74vgaybj00rwtj0xfa4v34ibgnm97t349h4x7ggivo1o13uciyc5yjtnntlo50rn74dedxebpithp5utst2ef9f3vzev92ef6v52bukqcv7blkhdsvw5pu8iteugp3na'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ah75gunu4wqciljgel9n48dm2aecf3r5y4x8abc3xkpn7nb0r1xrc7tcebvz'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'ztuk9zngp99deyt2na97966kvbw1c1tl7t9bsgl3nbvc1yjjjbncukmv541hwo3dthz8b3j3psmf7mk7clxmcw7f2o5mupzizpfu8r8f5wz3mz3azn7jlvujr7ua9tforv2b4eklu6zk1zsom3f9taq7vpkj81v9'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6610502989
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'md674krzcj2eg84mw6fxwcyb6ybew9uxp11yqnd3l0gwbairivhtzua21a08nd28nfqossc2ak777zipc0xnq70k5ow70yjcjjq94bg5cc44max95adejlfrlmtyuic24g3l102mjba1him5qx1gtyc9lt1q6s21grls8efynrhb8thyziz1c4s3w4i3qloj5hs44cix6x8rjfarpaivlxjhmnke952wj5ptbo3c60b5utql72558pqjnxh1femn61ff78ypsok2vgzstffmwdq8z3zg42l1ao1ahuxuievzi07gbs3xitlu9qkgmbx3rvf2828z3cqvq6c3hmn6jgwrg91k29t2y53jurqr8tn38lduiubga2ffmtso43kbbx1izpy8hsilz3bn1d42ric4ehq1ej9md246g53ajsmj0a8q8mrxk94qwiysbji2nr0a3pqy6t6mcik5cqfdcip1jue5uqomtwyn7g8kag1mannwslnpjapnyrpofdycafgxn84p93j5hgqs0136aiwlhtc6c1p6ryaxa3tjw61bi60i9qoze4bnm8m3z5k5llq9t5xikppyh6d9e63kx8o4zblhesl02mj2o7ccfe7irkansbywin2tem8vsyi11zlc1xhmg7r6c56c6izp3y6otqkw2cc6nfhyj96qquy2k6qtoabqyz823putc6b5y4jy8t9oqa2fgep5re2iep977jxke9u15ferf233z3etxsez80ml0svl4mhsyb4ceb40ym4trdopofrma1ejoagr5vlw5hme1j0gh4w6lfo8s8mka9p5o56bnjba7zembjx9rslh1prpkxolrac0k0r6904dq01hhjmgnit14ddp3w6iz8bs1jjowzhhnu97kb2li500txn7blk8z2a04f5l0sp5j6xhfej1v5cwf116rxjnhq3kgu2wtocrhxtrs16z1xl9ubj4jahtrwa7itti5sjeitzh561ru5b6k6jvexq7kfkq1a9s809jcg7c'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 's05xu1br3jqlw3xrtbmdmnq610yrhm4cw4x72g983rtn4mv4lct2pvp8xhoqthrwdzo4dllvdcegh14t36jjuqj1w6pu36wu14sblf6tjnv8aoqgim98mst9k7r46n8jx640aufdpqwhojf2vre96sa06cw3amiose9frknowst02mayfz2vrbo5ia2y70eucb31o7s3vi7tzpcyg657fdi9aokt2b5iqb3fjr4q13zgcj0a9zysynued26dz7iot51hekb8wanp5h6ynbss10b3wxotf0ay628bsynyyv08qxe174ax525uf19i4c4pgvjujnbgu0iojre8qzhbvbg43lfe1p7jqs30i4lidpca865r0m80aj6dpd1c50thc02yjg13fzpob9b3atj5kfq768d32yr797n472j88udsc6oqggmairo4hp8y6w3pxdxa9yykfj4f4hwwukunt3qcmyygsc44t5uxbh792k5pa2cno7prtkg3759hut6kc0wgas31qx12zxk3c3gk3k3tjbnsbhakk88xqtn6wqpp8nja3ldiofd065ci2sado6dg4v8nt8p5nwoxp1tmwycldij9viurt5vvy8rxmyo25bsatvwv7pju8ce7ty790mjoy0v7sykf568czxcvp1nyhl4vq254nqhrb4pwqp37ixe1puk9fzfn4611qtv3ypii9f8epkni73gzq1qj0qkxsoir8v6m3fk24q4dtyin9ekzswwfs99jk6xkuwpcuq3iuwh8bj6q0fi4n76s4x0x4etyyioh67r94ahuxif35kme22czy6qz1af83o8pbjn0fq57m52ct8c07s0uihcmvzinno5ougk61nxsdpgiura7rxcy8vffyhxozd0gb8unz8ys75a4k4fj2uvw5dr63q9eiqzwg8mrj7zeh0r4wyhej98l0hnh07gcamz8vck0mazkoighrrfi3e2r2uw5w2senxmetlebi9j5hnntyj5cpceak04wleqediyu'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'g4lkgn6q02kcol0xv61chpdmd4hwzdtxecwqmsclagtgbc7mky4j2nk3qepv'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 6602588945
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'h29ji5m589vcge091djdir3x2dbg1ac0dfz3gvo56nw7mpyh2sdncd2bj047j64j59aybdxvbvq1tzgvbx3ypzsmzdlwbhsw2hfx57jdgv9zrd2h4e22g5o5azqiq5kqpad30nbutqw8o3aoqmypowjb9q0bfgig'
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
        example     : 'c2io4ib95gq92pbh8gystyt4al4hlssvl9yqiwsdqolte4ur6xii9hypdd9hto9zaed0zh65r6c1fz5yrp7jg4qz7rovy3toupbrliay4ley86qriy3mdo4ektg5mk69vcmp6gkz39yipkpgl50yh3almet4d7q5'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'fvihxe7bfkx6ddtrm4eh'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'cge01k3vzoiezhajhcja'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-31 02:06:44'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-31 10:29:33'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-30 21:52:30'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-31 00:51:20'
    })
    deletedAt: string;
    
    
}
