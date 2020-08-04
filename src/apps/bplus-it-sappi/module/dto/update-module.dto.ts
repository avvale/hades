import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1787f2da-553b-478a-a053-4391096a0367'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '1d852gyyyfykfdies7h6k1euh21u3gchg73qvf43knox56d6rj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1abcd568-4333-415c-b2d2-66cab2e5f8b2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'siytu6md9jdkcemsjm5p'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '084234c9-60f8-4fbb-8be1-73fbae827d7b'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 't6aq3eciay8934e1g6flp347oprlw7czcvoxt6ynfd91miqeajzwmmfl1gilxkmi31q0gzn6fbcd1j4atakeob0mb2bgcrd8i9bygvaa8err4bmt4s3o80phpgre2pdy8pfp7cmn59ermsmvfhie7df6rlnjnybm'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '2frdy4h5xh11stczfzpykl3wrarcexc2a43ojrvou9pmrie15hqjo6s5pw782hf0zk9gcdqd1upu08ljrtdrepc17q7mlfhfyo4p1cheqr5wasl33fi9q1xft1f467siqlushpvgcnehv37mmuncohzf7dgsj9zk'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'n292u2qfor89x76bqmnsjessepll5znpmxb6313er25ouwba1ewp8hdprka5vzvsuic0uhdwmn6t4dx7gwyjzm3cxr0u9v311ske8i7hhuut5vp1sgxbrc0u1gpm5p1e5xskk9in8yatxb125sgk1mr6t0kjxw8s'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '7s5r52kdobgeaq4gnrviqb8bwhbi4vzzctchusdt'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'v0tm8llo31ijq3rl1cbkbqg4thqbdi5svjw70xjjl9n1a6j7cr2q42ds8visqp0uuc89rlh57vi7u0wgies6pvcxt0eqtkkbi96s0npkwfo65rxc0aha8aeom43diiidrozdmpmp6uxcrel6ta92vqg1iky1o9ni'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '1fdwr23sdcbfz76g1e6j92ei390s54bg1zuadpz1ssng89z6nkd8fphlax7axbwefam1nvxjbz0gc3vo9denu82bb9dm3382bjy05i08eay8zc2ehcbynmdox9o9zbowi7fyaknulh5db3osbn4unfoxzhi81tft'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'y2g2gkssfcjn3wdpxb99ome6bttfy0umpeth8fgqnwhy2l0jkd8tlqjivwywde6hq3jxe5r91xyyo9g5l144j226oo23dut0ez7brcriabdihqemx2fmgpra1n2w9b192bu9883dbaeb97plfz0dz8w3ztuqwmvv'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'elo6uqlvniy006zeyarlh24g20s5qhirnhtzaqggiadeyahh1wwcgxhe5pcs3dc8v04atfejfeqknn8uw00wx5mbxdpqj1sa38ffpwnfn2mg0hqhbps6ivxa89ju1djoewi3c5c1hd4xxobldx6d090obiegk258'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'zg159phyr953bm5nk8ed'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'zmxoh7z0tunkf5c3amu2xtib5fnyiwrns3zqgq7ile2k8q8u7yhoudwotke51l44tankz67qrd13enb7qk06b574cscnibjv2wy7st4e489i34haw9b9tjrilqmsbaqyj0zcyrrx02ofgkdqbf77nmsv6jjkrg7b7pzqzmsd0cea6n10sf0n8yhaopjrdixzkk60ehqs02huev538ucy1fl4ia7fz38gsmi5z2yyz96qa2h0gs1eupdq0png9mt'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'n5f0l87v6omtawx68862tfusgqtn4tl9w22awamiudqsweoais3u4ga8bew8i114v7jndoaz7ls98jy99do7805a95snu6uk9fy48de7vbmk8c6kbzsagb1zs6myxkreo1v8v6evdab1h8ubjt012xvkyzmjnkr6499pmh2c9j2byxspbus40lhx0smxt9z7iq8ilq5y069qfyvv173i09mfry8w9l4rizastp3g21e3sqv833o721gym1lkwrrpp6etng0usqpsrfuyofxubeav9bz3pobfqwczge4agtlfd2xfepu60z8umh7svp9l'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'jr7rhrezrf18ui54mf6wisihrrszoor57wyx5f9fbog8lgns8twxiv0ja717dtndg67u7e1bjmojocjailu1ghkypmmn4zrt1mf8muat63i2h1p43212162s9o3ppfv5a5huzfn0w3n6dbt3ytn51re1spgl6x37icurhds7nuu7b3ao601pdjtiypbii7yw06v8ks1v3rgfxm1bjbj33mlb7l9nbplur1033qu0v0idcraw6b3g9pj6imwxcbg78d4mwq9was34nzkeffnfqyth12rlxpv8ywx7ndwgoutmfv1cg86lfoi8m98lgp6k'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'mbx15yu5cy4493lw6ie4t4fau9znr0lbfzaej76bdxz2vgnfxi4fjo2roy2hxqjauqsi5al6eohttcawv4c4hp2sl7wjqp9z3cv3itgz9o23d9hh01mfd06i7rxh753175ewz1bk4qe6ncevvijw3n065j38grjnx3o6r15xl6nl8uj8ypmrxlz0btuxnbty896k0pjwdzxnanydahgs5rqjtum57u3nlojhr85zgkgw0kuvtnck9rgls86d0ejh4mvhsjyq44li9lv8onf52yg1u6kkynivujszdpx8qlxq1oey5i07qx0z4sxcy3nn9u4b5ixscks78bskql222ka92mpwe24a4mr3y2c45tn0t8n766xdmao6410kpftpnhwbl8f0udmfwoajdr067der1tc3c7d18ak18e0b07cmci4uun5s0i3wvgtm0pmqj1jgwck93ozx34dhoqxm325avjp9jdsqntmr79yfu5p4a944gsquzmwsnlnsgotcyybyokqorr4t8lbm94jrlgy83mp9iju6agts63b5wr7kklt0m1lspdtvioo4p0f2e29h4foby4ufcm1pxiyb88pcc47z18fuohiqjz52ut1t4wwsmlwd1pih2jlw8r5ae97yq6fdnfrl1pvp6b898e3siev6690fog6yhho4objtnqw5lmty5f90uvv9eujhssxy3a3eprwdj6ocghxnqc0cink8eexkel2o3b9ois74v88uylexror77717rwtiex2h2qgsapwwgaym9hda6z76nu06r3ewpx9btscy39l58rmefercme6o0uv7lasqclh2t6r8w6ww82wthctv3n6q8mm2j4ypsk5oso1aek3fs7ena6b27ix2kxyabu82s995yj2vwumbagozko861fnqdjlzv381u63wr91x2unl3tc5ej15g3x2dr8lkivuutvo7z0jfdo3y3yk27x8qxv719v0aqx4vulcq2igj2ijscie8acgzrqskegib186'
    })
    parameterValue: string;
    
    
}
