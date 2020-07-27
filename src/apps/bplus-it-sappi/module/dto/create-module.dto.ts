import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8c122653-36d1-436b-8270-cb3e5bff6f19'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'bcc034c8-1665-4250-bed4-f9613a1cd2d3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gou3r11c8kqgge5bvm09ek9lujb32o9dgfll14smdumxap9rfm'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '0hp25o214cd1m2kh601z'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '948e1709-2ab6-405a-acf9-6a1f1fd943c3'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'kd5qc43rbogygi7bqafb'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e62e7fa6-e398-43e2-8be6-6b576b589dd1'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'u2equpzueqjdjqn19c6c4omqs1e5esdawk7xve9qah7kh91z48jqrx4fz8xkqifhupwrny8hkhr7qehhstcpbql2ohrexdrsrzko2xu2cjo4svkjs25m7ap9n8zbk8jo3e9tg8yip6e8j2hmzjxn3ferj41vhvqu'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '01urj5ru5pdl0bx3ujmajmjwrfwkc5jhfsd3056cilqppxadg2ca5syn9aiq3151unku9jt5m3ljteryqhqpvfeke4ichist85m0he2wszcexv4zk4y2d3ckc9356rzabs6b56e0z1nw0l39c19tmqrw43e58lb0'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'iwa3me201ntkovfq003ebdzj8hbwmrbzbikhb6tiqy8ol06nqhzw55i6uny4gyu2r8ziklu3120l5o6qhmyr1323d4llyisa9355nn6x9uwhbeloxke7movmnwxal7k2bd2785efkkcfrsotr0h0r0iyk6hnsd98'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '29d414aa-c091-481c-ba72-a0bf9ceb23b8'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'd3vtviz8is4pofmw55gjflkmn2dusap0x988tzam24lv5hhur8gnv64j2aqrrnr2qb6e8z3dd25h6z0jf5i29eq3bnzaef6i04w3ss454h1nwym80njrvgebo5his2p8snjhfngxg629eq88w0y21ur7sznxqj71'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'wt77gnpv7111dde27v8k3jw10wa21knxphfxb78hyh5xiktksrnue91fvx29xw4l01m1opt3s625fm6p7j0wop6erxed628oend30p4bhcpv7ayycr6j6zu827qrnkjot8v8i4vqbe0jat5d9etc2fkmgw67ppn0'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '1ub2onuw0hk7evzvqm0j4m0e6eulwaajl014log1vmd3liwj8cokqzfe7m1snhvskx0nl2gxun02ffttb25d8filbef9i9lsvlpg9hikjg3z2p7hzmpnnny8ex24f6kgqt0k13jqv5gc07z2dpxydjvqx0nauul6'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'js6f56wo7mvei3peauxslcbpbqlnavjf8eg8owo3s31vsalc11qsjhnd023kuq8r1jtkoghhh3vv7qz8la8qk9qs4a6hghazn1ih69b038frlolqbxundtizne6sk32rd3lnayqyyzq1z9mh4pgrcm7b5vrohild'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'eycbodym120c93337gsz2emjc6aq6cv56op3h76h3nyr7t9beaeevawfktgieq0d8e6xprndp5p21guy0zzf02hi7qlsayngftxi6vtawuab471xkanyl3r949eapmwufpnt0amv6j3is94md4r7ulrvvtgaykshjvpmkkd9r4s8ikw9ng0zcsald3jo3harv9e1g9f5tb30oyw7ukou6jyn3tmvnhqm5bm6bid1w0m5e5vhvlslpsqhnslrkex'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8jvo23kgdfj7y35784w67zn1dj1xe17mjll3365d5yjay1vne52h9o0yeh5vss1bd5whbxa902a23rvoay7xa0mwdbaqrgt82abpcg5vt53jsqtplo3ix44doo3expgu7g6uc34us7510ekbgh2ynbmzjpkwa4uw91sly9nkqfg381jxjicr4379ay0uftm7l5js0a9fkpna6plqcyuz5xjvcxmjn1ise77zghke2uto30h86y0i83frnts9p6ptxawiuap7dlfce6nqtxayztuw99rfnsmyjvulzsgyer3jt8twj9bmz7ym8z0fpkq3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'zfv4wxrathnnec7kk1ri8fr1ad8jzeew6e1ro3d1fxiw35u1lgnh785f81sevgoa06jjqtjrmlc1c4q0ptvhqv90a8aq3q3a13lr34slk57rp6g8fvojryywhvvyttx716hajid2i5g8dbeo2g0yd417aayk3dfdyff4i513j1n7j6oz6ibtc8no2zgc2dl5rrbo0t9r6tate8cnyeou7eot7tcie2xsbb5nuo8nagqal7cci47b5ferhm0iyitmj1xm61i0gewtfs58tbzgt31gkrh38asqv94dpgm1atwjqhz2en5pis2ohemql8oz'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'fn85vn1bv61cph6347jctell99dp3i83ybco7i0jvc4bo11m4wjhdis2ccyifgprvi2nvh3iz56o0zhnm5ldr5u7k3nt40z4xi232vvtamnyca8vj94gzd091k7vh3j06dvrzi31wceu4tokcy66gwzkjqpjsmq9xkwnlvg3ahch44nzj8hs46zs2mkfg6esv0r7r408jocg00wl7yhd22ss4su7veluqa1cefaavzo7nakg92xw1bc545rwxqp8gpa3xt47glx89xzrtywgns911jer9olsygaj7zt0e3vn517xkbj40zlmaqc643widjwic40apdcx676b9i1omaekqbk7xqjpzo9geey763isbuvr6cczw6pruc1keydqe3xnipvq6xghuoobe32ab0tu2pjqq4o8es1qfhjeumg2y8oit7m0w610uu6ds63jkuibxoojhhqn7lys5vubvhmdv76akoych1o0dq7u41u3upznxw9pd7da13qcvdspdeh4974juug135ussogmts9lwo1ksby1fyzte2u8yb0vdb0hf7q2vfjqxmgrawjrd52tdgoo3cn2by9ujrvfg8ivej05ylqxfvzsot9zywptlldymat3qve87rgrb62kj9y2shkazd8timw81l4kl91zsftsr2weksgcsbhvoothx4ly5689mqecuhy00mwg8b4z04pkuyogua8pahurw6u6c441xesbd4w5voi6bqx3rc24qp3wwv9y8kwmlzwch0yt72mqd137bn72qdbmlshwkc5qf8mwiq1krc3t2gl91l2yl7jetzg1qyh48kyiv1srsrzfawiandkivtinf73nkyobh0vy3liwx5igtg9aq5afu9z2t089wyli2e4lzxz10gki55sa0o2w55w1x3yv6hdhbnegh914ziv5c7feog0xzf3g0a2bst1yd5qismb0981x5rp3v073g01p26gsms8l8t8b3wwc87o8hotvbupen7oq7jwbrvx4njye'
    })
    parameterValue: string;
    
    
}
