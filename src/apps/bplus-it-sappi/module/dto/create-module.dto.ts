import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cb486ed4-d34f-4b25-8484-0700d59b6920'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '073722f7-29a0-4dce-ad10-e141169c73c7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'z1ne4q4n84tas7o94s6ty9fgqw1tyayzrgw22m2jvzfssjxutq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8a758dd6-1098-4b46-8fa2-1e4b6a646e36'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0nj1zbzycqmrjnvhc2ib'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'b6r6f1zx8kw2j7o1li3pcumulckqzd466ieqc1mu'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '5tyzorgpf9y0zxyl40n2z4qcb18yxng2tv9bpvsnoupr9aqq7677bcgzypu9mdnnuc1vhhqldgyrzzq7tqra3ymrhwpwruybdtoyeh7a4hsbgrplwpvpqj2hmzqjtthjrjqwb09wujry1aq9v1f81bxz7vl54i14'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '0f82p7rb5dy7xkwalhhj2cqp4k3pmi0gzf8fqmcajpabhpkel80ak7ugwhbnqnw7r1yo2qnc0tofnmovdbujw8ltaawadn17zt0bk4ajxkg8pg0ux0k02nmebshh0l90a3xsxgh0w0tg3ab0v5dw5xtcxgto7mej'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'y6ao2kxiwp3u7wava61hqr1gtxprms2nir60e1j69hjjc12xal8v6rztnbfivj7ii4qzg2abkcjhf67g8nsb28dkratzsr0y8exwdmsn732cnxtvgi1ueonpm0x6avqzvtv1b9kogubdutxac4a55g5eohbgurgk'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'bdfc6o5tw2qwvp7frjc5dt5jjkhstgkb7wyiakrp'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'xt1gf6sdo2zlqp6ocyjf5uhks41grbduk2fwxe4niai8o5lpinemk55pflz8nqhyrbxlpk5r19fqq3x1i47p14v96hgdoboaq8y27und609sx9w0qv33frnj5o07mg24ktrccz8de48fr2kll2ekev7jq7p1emqh'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7paqqop6klowh2iy8aplnor60ln7cxpsi94amaytbzncx182nk3pw0adj8ynjnurrguwdipe23sqdks0af20p871fcbktwrb2maz79edc42niqaji95pzxal2mfdpttt18tg7f23m6dfegqdaz22ov0eji694zks'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'zev3bl2qbgqi7j1q2ubgdzw1tqbh70riuckrbv4918cxacxqhxquydxlevp1cs0uaqumtabjteok6ehyrfz22adz2synpoiob8gewmygx8q1zgvi89u4g8xzjjfip9bpmszo0ruouv27jyj5yqfeev6a7lq9hzxj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'gq7enm9rboywr412ygqggboekmkampgotvju62l8tcyuv6740enxqk7w3cb7isxrzw8sqxi8v8x5pxv03tjkpvl0e1fdtly6cchtsv4tb81m04ee2r33ed6oegv3fnrzdc4kcss6hl3m8wxq9rmtlwb6ggyht4mf'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'q807008djbhkkfo5qb1d'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '56puhookyuo8pfs7tidejykn7afjvzngqcrvhy79hfihhityb3klmp3ph1p26491nrs5hy5cfwoi8n89awfr8arz5y30cbg0evp88xh3ygsmkfq1gwdkvm0hktuhp571tygzvm05176734kqziic8e22ndiik821zsbe53nvut454xt225xa1jw1bfdwcad9k0oxlico9dg2kps1ouuep8ouafnh6dr36k11805a51h551gr5saesj0ve647cfu'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6jwo40qst9563i0uk25ssjqfec9h0e04xt6oknlp1bb3auvwebjyxttgv5xgnnqxi4miffo8rg2tdyaeq4v5alyblhtcr2l6avobv1o1csr3mj9fj51ougjw9a0htorucdj1mzz39v5zn5fpgwwdn0l36x2wgnz5gt8t2slkxgxzx4pgdkkw8qxcq6as71wnxx0z7zucofgnrniqn9mqmtm0h1wricv9a33xwt08ahqui799frsye8ab0n7wtgf4gzcwj3v8mxbz41xi7fpjc3wu6lfp2w6effa4uho9x1dvfavy2xkmzp1psezeahiw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'r70noqofinztiuwz4twofw9s6wfv5jkvwmiajzz6mxs48ifoxx8a7z24z72rq0pnoc2o9s2mj47zhohfxjzs6m5xgsezznj6aenl1x6z315w2flbni17wmh805cnxdg3gwzkthunjvofqicthfmdv6rtzxe1hvjcek7c4xdn0vu1t3lcbv3pixwqyx3f2s9g1st98kgrswxde1gn1kdpt78vsmj3xayvpxh8sae1p5w2c118q8aes1pkfu1fi5zqq0e02g3knbhbo6ifoyi8419ep2r6cjn9tk8ee1i4mn3ds91xvw7if8ka53035nt3'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'i2q8h9cciauod23ryr8cg1k01j0lmy678mabzpvxohif24ad91px43dxq3axqgkwo9xdgqt114maejtkbx4wi2pexz6v7ojn4sezltokaj8pnwbur2w037vy097r5kbk32yo9qau2dd6xh7kwxhw0gt0xn3cigf50vi5uxci6337jbyhu34dqtlzs8p66jc9n71h87cnk1i9z3nflak10rxa7tlga96jf96rnd2nsimrmp3e2iaj8r8edqz236edgxkksh9yjutlszpar0yjt11pax533dsxuk6jkdwfidmioe7l24x12ul9lbl6nrj2w5lm2c8p7vyynuwpdzgxh18d1k6b7mh34ojxch95mrutivz7wyf3c64873gatyvcz81oqh7pqehb58bfd1hiqpwhgnqc9qjlu2syy38b6v3ctevbl0njwjiv5mor56lapjxj53obkt967vlxad2aze193a4nv0ffmii2ko6g6af5iuut2rb12itxoqj3vyekkrlar7p1d0mq81o3h4bzvfxcag1e67o5xfmqnqkm4mk3vz3twshrf4zibus70l4p2hgwtw2oy5wn1wz7lz918gkp41zvup3shvpctr57ktjc05jb75os8wymp4wweu37ohzp70pkgmaj1fld3zza57kk0pg1w1poh2etdtnwzs7wa00seonb55wwfqt3dnqftz7pkt8nyn7yjdsvjfsqdnmtyh1g6waidihurmefc8p00ajoi830my09e0zm323pgex75liyey3k5ydl08ciwrny9rg50o8yi3q3ft61e57iukmzx1rulq3a1pc3hbzhm9cx53a5kjk7jc30r5lq3b670rt6vm3ebkrgdjziljon9hrcj7ztjg1jxeijpmatpvtknlao5c0tqicex8ehj5ssa028v066binbm0crn9un82a6wnhwc0u0yvdail1y4brakh5d7rbghuoj382idofit55g9d7r0pnv3lxcc28tcc0r1jbg9w11x5bohav2'
    })
    parameterValue: string;
    
    
}
