import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '38bc8e47-c671-4c77-8325-263f03539693'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8a7df3b-0b16-46ee-8cab-050e956872dd'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '805a24f5-0985-473e-87f7-e3a1514d95d7'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6qlxmgnth949fwniv6pz'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '1fc6aa30-5ce5-40d9-8027-2a21a8c741ba'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'uhbkyu55687tf0lbetyt0mxbmiyytzyhxhtr5q2nokcdys56b6emescb7hedl2o43lxhk4ssvpbevqo1x4qtc9ruu91ldhi3pjc4awubdlkp9pe3ayyjdblm171vt60bdf0vmvn2b1bb83susqs3jutmok1vzdih'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'gmbe18b305ttenkw3bdw967gj2j38g6yw6aglbcmkcyfra6e34anpr6wr4le17j85qv64tpqig33h9qar6fgx321ynms02wkjcijsz55v8zftood9p7pcleu3ptcbed6z2vstqh9tb7osvmu47z17p07kfjp433x'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'icoacp9skmbbzizpx1unw4r3zzvt1734an819od31p0tt30etdefwol53jr3mcxha0ks2hf6tjycm6thkg1p6rt45d6gta8op9xh8g2fveta6mqbd7o1nnzx2nf3jmye1txoga0xoqqwr23b7gy0py4s1h1d10yp'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'mmdq4mfu2bl2l5r611pjkcvuf373o85kobnvhj53d3hktynh2iu47b86ca9tw4nwdngmuj8r6h0f5j76zn1o4v60ihtzr7y0l6jhnmxxqfyznkw2x4yhid5vfqf15hy1e042vzqvmdn6h9dpou20rff6gqsayvro'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'v9zsxm1iujt3vvrfjgyfcel7xx7bzpywogfup2yg4f7z08skbhxkwx7ad0p09oa76x0y8w896ew325wk5d58uan60yr28vqyp5xzp85tvc7zjfei25wea93an9nmva73ms3rtaxnequuhll3nx0nlkf15oku3lqu'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ah9ww837afr7ah40ip8axmqucou9hidiei7tzovh0u193ej4626y0vm31czj0yipt2cbn7zjyjxkcq25dni4rwskdhk1zmtu0as4o9alldfj39xns03ep7rughreb7744n963ouyppbq5lidkc3tulibii31ncm6'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'wapip0oz2z6k6k4i0e4czzgg0u0i1acrtx02n0he6lpxcibkoxjhfc01wf91c8iw130zneaz534mvnf97276db82qz4j2o40v488hpsq6iwqidky3zgg36g2lh3dxqddqa5br7jnbuxggvlnkdzhmcj0fo70kd4t'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'krldhg66cfioshzc346dk4d40nkff7omzf5kpc2nkp3wwoe408ylyoou68u3b0uh9b4mtelz488pigptpwsc51i9dbmrrafhswfd4rgvlj85iert1jb4y5r5sdqhj318hnq0xjll2ntlnbtvvxn3406ec9kfsuiyoslm1urzbd7p52im4mzcw1kbxbodptwunq2ccmcw5ghu042ofu0bd4lzvqz73ivkcxw4h3u6rgr7a8t8m37bl78cskb80pn'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 's4lxozm0mtpc9j22g2hnbjomm4orsk4hvunnongiw92071kgv1y440lrndsre2g2e5iw4psw6lrjei4t7jzu44pwzqv7m8wrey0k292h8s19jlwh06huxfo4qb2j8o70ilgcb5bpcabsp6n0vr44yrcfn1yc9bge7o3ytziw0qo205ssbvmsw99bi6kjcwfq12z8uww2hvvsqrm13xakhn61ggyuc0zwpkakr2hz17nurdzl6emplegsrs161zmcdr9saz6g1blzndwh65hreivotvlt9hnf3j81kw6av3iyfr1iu7b27xucruxs14s7'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'i0f5g0swcw584sc97s7zzzbcd7sotf56ldukwacwwusbkpj3kzniumqjhcf4z210w1knku663tjwkra6hc3s5wkuex9bqq90y06ec2yygofi5cyqs7an07x8jqqjfq4ynkd8appopo9435vhyvwnzds2vu4xxzaeqq1qompi1579o5rvm3f0fu94n4l5l9s3otduel85sc8q2uk9xj8j6v1b4ks7h70av6wlfir34yjwr5tdkk4xpmc9g2xdw1uerx06u05cxok79esytg4rixuone7dwd14dbjgiv9xdw4q5mmy0fj00ikcqh12f9cg'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '9xg7ur5kefprgo5to2adsimvl7p9lpb2vm463jtdwr0sta213biaowofmgbdi5zhikd14f0lg5g0lq3ls70yrbec36s8gpqfu5abs0gofznaufyjgwle3b10y407t40w77ejr7n2z3fko1mbqii4krnmjvd8llzk6atsc0irvj5vppmaz98orxbtc5dra3318g3ew6md3a61kvx0uvk1xlklvvvsty1jdu9ftkxowtnaetjbifrtz1y9hntnenhd65ltxhdhguky2wwoz0rbdx4s31eb6ax1eck27tq7btu0t4dj05yifftsnqnvgmtui9k08k7uvp7lky4l31uwi9yi589pzulqwbuvjwvfzbils0kjwg0nbcrroni5j2l9vfg0yr4gpl7g13ntx3pbtprvfnd8zz77acziuir84mc62x045zd6br8beapgffbopv5p3sncdr3rtwnxd7huk4y12rc0gadw5a2tk4bg5ivdrxuk1yuga31ix8oufaqfbv4wpvnix3ty72tqgp2gil3gfuiwegkjnh5nmy2gb2qkk34dy9p8c8g5dfzcdnvg381c774jx2gzseja94r9xewmqqygowvmldjf3hmp7an4ou4jso45qtg9oc03ketauuxwlezqd9ev857j5nvb9ire1z68q7xj5m1y23u40oy4bknz8warzptdh9jszcuz4ac9bzxnl2vl81v4ozy7nx40vcnje6qphohd889esdm39u1uk6qzorls4ihu7icma7woybtqmjtv9yub5ucrfl99g5jtt2c77rivry0awxvrfkvq2cj6p8ch8gvs5iofcxyugbufr1dpk7uoqzm18b6nlnzy0jf5z1i12ygdeal77vb65rzqn65ns6t5vfl5z8fi4x56wp1proo1d5acqt0w9mkvbuki5ilzm1i8k7hvfkxjk7e6wa2ol7cxuel3eyo7in1a43wid6kmagwtzx0h7ndo9z7nupbbw87q0htf5b9piw7k78q2uyb8q1q'
    })
    parameterValue: string;
    
}
