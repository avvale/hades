import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '283f08e3-f20b-4154-8d0f-8ac1098899c3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'm43146n2mbb1cpvw5mq1uovxjp2h6431ztmc0fqsghho5m9m37'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'e719f8c5-a728-4983-a4db-90440554b4ab'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'v8xjz0ni0n4pn8iomzc5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'qkh0dze00it98dxu28yx31j3d9f3yhyfzfp1swc7'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ys00hfxjfp100a5qy8nbgf7chu9u1108we7ps48c56pdagl0u1llglc2yf7vzsdopth7ap9nwhiglf3c4yd5j35g55wp1ain6nejjgg28sbpmffkkpplk9e4pgao4ykpqakh2t0iwfg9hbjhsk65q9al7mtu5e82'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'vnmzmgkbkapxt54zxvj0cleej15ke1f69rcxe6vwylwiz4u5qojk9k8my4y50fj21h4oc4nero31t3m1wchvn1vsilfv137v4b693bot4exlogfzcrqkgnbcrd8o3nobw0z8du29d5h9ek3g8hc3gdycofd9vy5f'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'injw2ffk62rfdflkw9fxow2dwb9yczrfqwtpji90juk35lipr6eod1ekherd1qp6f8jmsdther85trpqjfm6am45wcn7avn22tp818dn6agab9nt5v4dbwyvvb9aiwx7rz8ddvfevldztmgjdf94pw76mvpdntt1'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'j89hephvrbpfruxt4nyw1n98qqe1bsx1ipt64e90'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '5mb76uq5bzpxkkfeoi4lxtp26mqwexd53tpbdjjhs2pofpqqft6rox39zcw1insrruxmcas4yfp88fizzsjtcj6qdcdzw373v6h71cgr122xivxsslb1y9kjx9r5m7e235poo0ym2l92erj5hc666ofl7tnjtpga'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ba2pmxpwep6w0cgoagdw9ccb47237wfehv5wkyts89kdbhr7ba6tyevsscqdctqrhsxrfwz0kmjtjen81w68jmgls8tv3stf3aiem6wyuxtkkx0twdcexmxmm0xzx8jh78rdzhrnyjn5q989w3lf2ujed0trreij'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '6w707cimx2uckgb6f8v600a4zrmnjpcdvofw23bco9of6bymokip2urg9ntl30aqobhvszjdvrodt6b6wi0vitjk8gj37oe43x75tbmf4n9xafyyvpnj9ik3bfr5ax9kja9706mf0iug4v9vlsva4aj6on1vtgeo'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'tub9ezndwnoomot7fieheeludl6y2xythio1fw13yvpcfcmxzjwbel75ajb9qztapjxof9pihrnxnfeos7p2nsxw0p8z6d87rbgtoofp85z2gb68xumg5nboegqv3nzeiar12c9mq58rdea1dvoi53hpy1o95y5c'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'a78rg0mvvxtnwkciayr6'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '94fgomivkihdq2aq75u6upxc980fhxrlxro8eshb18787na59uqnzj7wgsudrpjt6fs5ix0ih62ppcpiyo48x7y7u3reyzlbp69ypkswbsmraa8o00rlmy412599tqmekfwyjvku5jkh9p46o0p9twbe7s37tstfuoguyvtk27k1qm3jw0e0qb6d7g2lo6u4lnpjmha18xo77m4qb7hxku7xjl3ks0hk27upj7i0nhj96j6s3ybdoe3u5iz4wt5'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ezndc8ur9132ywu062sxmei9at44eelmhtbsbudksusn880zul5m0ain7lyykgk998dq2oelj7h33wczhz1ucr8xrr8bsytdasnc5t4ktsw0uabfdsgequlegamezx3ehhxgqptymu58vc9v9mxbsgkydalpsjmjcnk6ygdrztra0pvajonrh7qg4ue9t93s7icu3j47an7ozt18aobxj0ccvjhlnjz5xddwyk9r7q3gmz0ga5oxklpel95kdufyrl7cdsetphorzk3qw551dud2lpst1znsfg2f40v5m9fix77spquqh773pm9es67a'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'z6nez65pf6pi1vil90f6urz4c63piiurnl58m7tjpe6ar2r4qwkttfjmprx5brr9xerml4mk29hhvo591ajnhasrwlzoi3zhqfsenhnscf9eqmgc7e8t3nyqovkgv6ihrumj6mos4s5spsg4dtqdz4vbpe18qgj6ro4jnnk974jkfos77ialyn9g3ijrrysw9iy0akcn9t4zjhc3jjnkvoup4o0j3hk238alh16yc3hlskn0es8pqbenur12wcszszprdv8v0woxiclni85zrw2sbnqukd3o4544jdgfb7uax0ihrjfxmsan69advelo'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'nve85ikkcy8fxvbowaysz03p7zyopvkf9wo9v49zv6zzfab078vz2omccu8213ge8spwm7qywuwnn2lrcsw00oujfsre2ncw7xei9ekhkcoack8eezh134zi94r1cashfbducy72m4l7srg1dq7nh7jztri7fogeql60asndr7xt60a8utxelzq1qmp484kdgeamv94qbbfyqlmmr318p1teivx2k9b64vusorxwv4fmvckciexo8q655g3rmvgo18tjiku5mwu5rbvgbjostk9gjxlpuz16kh82npqwjpee1f5vmhvkjyc3gtwqx6ve221xuvdgc80w907kf38kvnvh4x9daks39x08gxebqw8yy293um3n5h99ydiusfcl9izizrb9zwjz69du79e9386nwpoopsre3lkm0wwgbk5dkbugheuaad1whpjo1qhwsmceh27h4us61to0fnjy7zcxi54nmlv3cixfdeml7cxhk25m47h31qa7nige45ey3tay2ugdvdzw67u3jyqbmsb99sipk73uvl8ieqz9gkw52tsj28kscj1s7fyr61hr5xlsqyck286lf8hn7sz4zer1501gp81abhmelmj7gbuggjzp6fxvwxy189pkyrndjmaurs6at5ygab6koo771rzxovfywifmsqythu8ab5423qgfdk8a57006e53ljo8to71ypcampexd9s2rgtsd8gp2kjag9nlbwjeyujuajuun0y1rzrzmjmqvqx5qlinalcu6iz6b5ive10qwlrjsv38txa9fk52xhvl0wdmhl4mn6er18kucs2rypsr8rah9ywjvfal6ripwz6jedo81ibqeqen02mfvvqsqumcz72iz85c5ntxicncux63zjaaukv9136li98v17t4jh7jyuyha13voatvnvgapisgnene86ujcsdmxrola7vsip4wosqchu71jt9b0pzcf06xzafgcq7zb13bx5q8i7kmhkt7odtpgilac4x6b6hy3xco2oryb8i242s3rw5u421ta7i2qukw1jb03jon5ladnq6oszyt5auhd2b4cb9iccsyuu3qp7ap0sfj7bta6jam76ov1qivys4msqk5kdi52xb8ti4v9zw6bufxe5ono8dcwq7woi9m4qzasxjor19ok65nntrmm2a48fc7osvnjshh3ehu1bcsgjbdnattjt2d7trm8bkxr825m6dgwnunvtln9105c3dx00i9axpafv76gvl4r57qwxhpizxe6yrbkva4g7exzasqxbb3ozc7lmubwzajp5ajc0c5m71hzyuslxpd7at3cgdaz9fpty99dsqwsj52tfmlvx7n314qhgjctynhuqx2hedh6byqpwviqqcag4ub1zak48uqq0syagsr2qv9zyvtw3f3vflgqejou4xy09e6hh7fh5c1nf9densyaqg97xsrpnqfn9k3u81tamzbst20xqntpu0bgd2echh7ylrjzcp7a36sku7h9959xwqs78tnnuzs4dop4nx4r4cx0vn2a909h1qolk4whjcwnorbcu3o25uke1yvzohuoc53sqfgikhtskekzne00w2mkqg2meigu4ilvoxhntrgefp0a40qglyomkwsov087nkis3nbg2p314bnty03hlc87yvc8y1ul1fw86vtn0rsisihbh38ugv8wudsdjpv033edy5pribkrbd7u2e03ufw1904ct27s43xcbdxkexu1b8lzke0ztgmhykfh3i4bnnjkzwca2v7oruji1kcffezzpe6vmw2hepkzx0qzhdkxoovlk3ojgecoebfacq8sjf5bozpav1bnawh160hnv7f65rf8v05mhlpgvs5v84p9w3rv5ohpw5jbjqzs0maupg0098pa7wjw62nhiidyif3zjbqisflj9q4od8j1ph79znlsjtryt79hyz2p59899vkxn5egjdr5w76jwklc5vpstfv9cxgvzuf4j2rhooa5nuo3cl1huz9xppr39fnwagxsli0snmu3w37'
    })
    parameterValue: string;
    
    
}
