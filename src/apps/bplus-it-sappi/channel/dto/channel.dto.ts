import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '82lzqsakc4un4600yb8qmgc4p9ss63hi0td5un6mfggn8x0zcy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7d54241d-8a03-4ada-8649-22a0a15c8839'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4tpc0yw1ukqm35w4a6fv'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'qxrj44s4z0sgjglr47fiqicl55q2e3y3nqu3zurq2hr4xtra5h2wz5vk4824aore54is3z7qbwghsjqjnxxtxatw53u7ht6i7f16whqkw26z4finhxpghw9z3tw66297tlqykcjpn0y44njlb6dyjw1zl9l6e0v8'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '6ub4m83njutmvx7634i01hkob2sd0qls6lk9mhgevfga841mf2mlhpocptrzh8xl6jt7jwpjz2dt6h0mdw19lq2tc5swsmxd6be49gxq9p8r05i85kvvprspduj63hsf5zb3u2k6o88ljivs5gyl0mjtprl7448s'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fglxlfxdhc18587c561oujlyxqehs1ozkmng7vf2kphw2qaldugm25iquulb3sq8mmgv3rk8vvuk6txq43fytkr3w92elw9n6z4sb1emet3oqv4x0o30vrkhum6p44jtfvuz8nyjep443djcldjcuiyvq7qwsbmz'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '9020h9jx1t28z7frfxnoalyymlo1841dxju81h5a33v7ue5jd9ar1wlueqv2skec9adgxzkcdxixrwa9x2mgoeqoc7niefpu1w8aqktrg4fo9f599rf0vqtus5hey20ryrb6ucjtqm3o5b7gffzrwnsfefivvkxh'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'fqbbbvk7g2fo31jvgvo0aw945phxofi4dk0s109n56usco3rttv7a20vp1omx4h0zu62uo7rr9q0ze8bxjqpd8tta0nlkjwjzet2f90cvlmq0nbwgc1vppfxq6vncgu0cinowjqfhmawr14tz9pyi6rb5snw3z14'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'pr241lr7lur94a6ah6e9232mp6sjj755wpczavtwqriqs0rskn6o54g73ayoex8eo3asnxlosgr76fv18xffswk81urlun2q6yxrfp3odzexq688t4rbji91ea4v8tfhm3ezr4ldynqzeu6vgalazjx0eg5iu86n'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '7hi5xjcizalcai844fijoa370x737v8ae8kfliw4dxj0aard4d2j7tzcs0wdfwv9g6vws1b1jbs3tkr8ixef12vq4egkptdykxfremr0uymd1cxerwpvs98w0jxojid2c7yewjj3qk75l6tjh3dpsjas7s26j979'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'yeff0oa5h4wwkidhb09s'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'sgec0diyr01zfzbnxh11xlcrxzl601537o3jmcykz44onm22r964q9god6mm'
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
        example     : 'cwqs2jppepxs9liqr53tl5xchzsht4xtcyka11a9vd1atpmhrjc9s5zc38tc'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'goxgv8ztmgotkcppywna6myknu256tuqxd7qj5burtr93s3cgut8hpxoi7l7'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'szlsh7qd1galjrz3mhhhh57y2it7fnkec4i333jae74xhxt6acfqjvkqjj7c5j1vhzw3uuzrwnwqixmj7u1j0l4bu7omskhg0k3p2wkfu3wk66hdyshqb49hn71ljj3rujpnkq8hj66l7xyer212uz0owus3xyq0'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'ow2bgxa5xlo3rv56giviafbukpdnvkcc77g9lt9jou5d0k9t83ggp4cr03j7ti8e0wbi9c38skalq1v7yx0ibsfv9cji3ct8nytt0nh2bi7wyn29zqvxisb15wb7wb1io5b4kt48t8aqbnrry3xusg4c47x6yw4tpuz5ec16t6lmr5b1eavktozifezeowgti6p1qmfs7y8yllauju5tkw82f1kx3urtapbal0hdvxepnqjzojr0s7516mxfpynwaczgtv3sikngdgwolczxnvhk434609vb78bcv57ws1452qiqnxtevw7ut26cj5tc'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ecc3614n1bithj4sutvh9snlfotfl08a9iqzzaentv0l1gki3d66oht6dbfe'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'kzanp235i4w30r5p9aso6n9b2ikx23jj9p5p4pfgzejmp5kgng4qupab0rtqit9dyrkgsti9dua8xy592n4dom0ifuys354hkjdn05sbwvitfzxb0pw8bkfpxt0y0rsla2eij4479wgpjkubxxan4wy3a8wn1tg2'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6401761596
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'ei7rfhkoxqesdb67zrgp19xkl45vc0ffji3tqd6na75k27mkrzr5gg1bq57wh1spkpwpox5dj7qq8yvhkxxcpw6oxjew4s4r13fihepnd2053m5x0gv6xl8hm5b4cipevedejocjuo5ijvnjhtue4eny6gw4cfgvhwr29eslrvn5xbj029oirz5zekzet7mhfa0j9uiajm3fxjrjclqiicwt3xw9l1v05qqperpks4rtuknm6siill93aidpau200t3tkcbzghq7fsg07xbd53r4ndoz4u0wi2c62155p37ph0wre6m737md1euvvilsund05e3415hxeje0pg97flleinmiop47zu429supv9mchcugiidrhpo15b4d7lhke2dr0fbdfq23vmj8pntqf21sha7zfq2kw4rx2lubt9gxkk2thq2cjwhns9q3tvu6x9iyij7c3pzbgw6m9ds5fb9a15252zxdkdi2iua61hvk8rxyoe7skfefzg2tztohv0j67evqh62k7zc23v6cqq8j0fnkzncvi3uwccdjhjl6b5rj9pucbe3uv1cmessh40p145l8h3cxg6js5tqfwcxdtxctsfnstb8luoprix67x4x5sil50hjdcuyeml0xj29lxzw94rtcu1qgbyb51gtgihbap61cv8v5iv4ibbe7jok9yh6l76yvhfhhj0nh96mp90yvwmjea64umr3t3qnq21jzxnsnrw90tzxo5cvd1mz2opwrciyo1lasalyfzxam857yz3m7iqcc6u5nxxh8oo6esxtkun66dyiv3m5takqnp8iqyhys2j5ay2pruv6knxndfd1pa3sby3ixw2pkv6d00nhphdj4t6zxbeoqu7doagfzsujnp4lae2gz36fvc3xv3hn8ud66c2x26vj3xq2j7ckwipq6be9i4i4y17vplsrwmu93xbgylbtq9z8kagi4c15tyx48sl7tyw6gv9otxo18bwwl2ngyeb4iilu9xh8jrxg86lmacd1z'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '1x3rspw3sfh2o4yf06h9icdrlihu9rr2l9sav084kj76gykm9xtm90sc6ekyigdvuqgtg115flfh5mffuxqos3jfk4k4t290il17b05fs9ud1lg0g406dskk7a9h55y9cmcty32snzrzvilpjg7qqsudf4otv61rqimtwo3k92299fvr4dmn0xo3qfhmicqbtpll06sow2lin3o4t3e0y8z4aj1x7fspvrgajq6910bfhp490fcw7512f5s62mg0hmfuu7b7tlks11u6ya23f1e8ajf6oa1jreuo3c6o6qhoxqfkwa0i9wtjcixcdpolpuhz0ggieevlrf5ri5z1p4y09utmbmopvur4go29ihz4739zgtme0oai8r9a2pwj89zpdc3s17piyhgpuw4fh24a66lkiy7a48sq1ecndr54qlsv7f3ix4aufd92uxk5e9ingvry262debbs0je3s9ti6pjfm7bpnq2ttuyz0r4adbrnf6ng5y206z2ej6tbbxemx2tg4qwhur23sp26z71jgqdwsc44poni0rjc9pkvfdqdmnizlbf4iz2qgeg8ljvyoimy9ojbxm9oz2u895v91k0vg6e3qx8278vtiuem1uuzi4s1fql6v39l32yv6fii5d8t3ca5cp0bon5atvxheke9umyxd762i89uz03n8lvb29oj9som9xlegyyz7votuuv3zdsnyk0zvqxyd6s1rf503df8g736jm26f0ff9vn6h5b5dmvlqv5bixslf05e107smoo6c77bw7va2duscyttfxzq6cd4jpgoiltjrl3u8ltb4sxn2bx7mlozfytsftg6y6v3fblhawx41856x0b6ql1y05lwi4kxxkxtnj3xf1y0x7i41rwg03u3q4n92x4u3bk4djlpu68hjvklfhsykvpbg3cvzydvlozszaqq8dzuj9uqkr2g9m261xddg8naohkknr9nkcsyriozeh4ol7btzsum3d2rln016m46me8yt2u9vtnegm3m'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'i4lrqqfyiorhtpmywp9qdcyck18iac88k3z4o0m7z89ny401dfdswmgag2ww'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7218727162
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'ob50eeelurt2uasne3b0sffdbt6nk8povxzrxqpbxoti8w5lsqvpre03c2og6amnap2k2ikf8ku7g1x9fabne1olfvft8ihkrw64ylt7zg5jmo7k898d6645dmuuyj82pi55pg58mambuc1q7rdw3btpy4floz76'
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
        example     : 'j4v9k8ixltuwwbd5tsiq0zofmzr3s4l0h035bh1kfw4b1tc0trbclf7dwrh5x65qufjfycatct9mpcai8exu7eyc7akl1fp3esqjgdvt50rczwkutnd3zv5j557putaukaq91xsvq8ie3i7p87fh06gif3lt6dd3'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'ds55qkbwgduha3coq9mz'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '5ngt0osqcu61ca2xwyrm'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 23:00:14'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 14:01:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 05:08:27'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 21:47:07'
    })
    deletedAt: string;
    
    
}
