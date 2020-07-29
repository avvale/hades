import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '886640b0-cb76-4cdf-a92b-9037840f28cb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '40c0f04a-c005-4825-b83a-ce7b7138b826'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'sickyypxxfsiuwuuelbg05avvy7lowi2bbj8uf1g9etjzla8gn'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4fcafefd-49f0-469f-91e9-9caf55ffeecc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'c009nknxlxt7cl61rvob'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'pby8a22l1fcvgpsc231iiqqjvg6nm7u0q1xhxxbh4vhmp9efypwgfsxf0hyr66g7hfmy3deb6f1nwqcx7nf0at76m05b4cs4lstjdspo4dfpf6q5dspobicu33qi7lvt72dtvrnec34nkjuam60qi5y5jehweslw'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'iaajy7aiggzyj02tjh0qfnv8faugcn1g7bqrbeoen70gc134xgimablbe94qz4dn20p1airirnozu6547bg144poergh8u6ccwjx7b0p5qv3omkaqop4j3h25sa9r9kcsu5fvh1a25znxmwc1go9dv4mx08ri0mo'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'flpd3soer076nuq2ps5i4m6xw70w74vbk0orqopfz8l4219dh562c1vi95ozm60hkm7k0bpl5edgtz3s8ind40r9vxg9oo84u04ey4njn2mdc9ty8mps3xiz822igh3aoee60cd0pl6y80wsrsvhbwpybczoj4hg'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '8428b521-e3cb-43dd-9aae-df4c68b9de73'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2sgbtg3utew34v0grfbhkolq1j326nuwx0p16opgei4jhcruke31a3fg6hf4b19xia5mcc7u9668tmvp7o6hvyfhtq2bilxs8ptj641ikes87wmugz7fmqkfzlq9889hjua6pguwvhy4hkmqmmcownigsvrqdgr6'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'pspbma1nx1ksgsr9hebjm0hgyrkn9h5hf8rwmg8llu2qh47su2yr9nv4w3dr56mppa3pq29v0hvk968f5g31rthjan4s7p6zvxc466nvfsy9erey9xern1fbg9m0l8wgjrrbbu3xnh2sbeb63tv97yq8ikhyzejm'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ygx2s8g1409i7f3kqxjr8ba55q9cqo1n3qoufcmjqqp8o6zzdoua0hp44hmx3h8ecaljq5g9ewfukrnr1g12wvnv99qmopf1thwnzrhfpvo6uppzlqt6bh5zdcsalgtq1o4n1h9z64lxpbstm5vwuygb8pav1rep'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '2te2021grn3pdbaf2hwwehakyyfuo9uykh7b11ejkpjikvj31ipnd0vu2al379rr9j7e9ed5p3cfjnuecoc0hjlkjhkifnx6tx34b52x0qthtvqp4w3qmz1jgjaqif98fcvvrsby9jrrxuy7gdtx51ivbp5nzu8v'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'xckhf8hgqcdpe699vabq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'l62et71h646j0e0jp299ow884crmq29kmalzdo0wbsdnlzhg2m1dpigfxdoa3qti8s2dghjew592b6oeu6ai9lobdjid8md7gj3qs3ori0vx8hzgpwts75hs6ks67ii5c4zysdelqjwlf7ei6ggaxlqbxb079eiuuje9qczilapy9k3wk8q54n9hlg1r9crde6y0mm16cn09sp1p8fs3l17xgi81p6uz8xvcsriy7u6yu4o11nojth4vwcouzhc'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'sx5z8dg4k7qdpuzzwz6of32wal19oyoqs4v97rq6sg0iz7ymshmq0mli0om60xo1zdq32srfdw6g7wwzdscstqz0tq4op9wh39xf7u1g1fck6mswi77lxldmc88tlee3bb6xsc4bcmn4ljw22roa6946v60lzastvgyhkmdb7cct5gboeg8zhaq1inigzm1qdx53ust20v4bt6j2c4pa1o2jm6orng2sfrku9vg6khhsna61uo09l3nri092xvcjkmb9x21pabjroyhmqobyuz7ayu8rd99jizakl0slt9e022yeke5el83s099mny0d'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'moambfzg9j7h67kh8qu0xvt3hmglk56iykyerqtn3a2582y7p3f036kiahebcx9grv3idx6j75dsclq33jwui4pg8eexh75quufj6ew1jkrzqn73rljduy47a92cbgsjoay8hkkzmkrmegejq8a428navxcvugud0z7ts8n5huguskw908mibw6uocdbm0yewp33o8llsq92b7du6w5b934nwuylzdyqs2i1dm3q5yn9c21nqgszfq524t101aw42x8jwgu2vgfrz09fui69kgdez59yephta7vbmjbp39u92eby9fbl0ltv3n81rpbv'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '8bj4rt1vvb3lxa8nfl33fsxo8zftrscjczg6k1mwjvszgu5lwns8lo0l70v7y6xwltm9rt1qf76uu0i4in5m8mff7lj5y803xc37hxfk75v69s9pu8hrzkdz37tpta4ry3prkeezwfmdfen3n6afkumr0oqv74wonklwama6l2z7siaz7rdk95x6a81ttqqk04xat786xt3peoy328uetxi21n68w9b51rnusfm93r3pp5du378970wpofoh0h5vvzf4k5n70xpm8hpf24grouknoby3d9a1brizmbgl5ghunb76yhig71y89r9ivwuodyasvhtqyyd5v4qjuftu5rbz8wwtdvaqlp42kil56bqh36a8u4jcibe9ar0zrzsaz4yxssg5hawq8d1c42fl4zij9qv652voquvwz9lu1dzsmj4pitf0f5ubz96195ai86df93o76m7fpr946uodpn3boaipyymb8dg32x2dqugiyj7gi3tushq6p4pufzqivj45urmtycs4fxql5jquxr5x4gg04cm0cfalxxjy5muzx13ps8eknr0het6p01dmx1s38ev88mtgnpvc6kabkc6eui6aeukoe9uunefqyye70z5d6s458a55nbine19z2cfsx9h1m9xlutdvnb0qr0qnomrq0pzqhzy2a4m42fkxr45fiks26bl1tvn0t2zz9z68sc6qb1xvcvgsbtm6gr2yhzu4aza7iex3ihjcyj0am5rrstt6fvp1jh7sh3y21rgwonppmojwxqei77g2vfebeh086ovgzbg1mtm5ba378b6c18t9f84nlpdhwoxyjva98j4f6wjwyk8oblfrya6k44xwung9rz8kum7be6gtq9yil9e37i8uxhw84ctf49iuuqjrq6uq04594yu8179ssbthgdkvh9nrpd1ltpkgecwqskm6u8nuiv1ldg0dplqagyf1qwyc5ob5pbjr1ubi80sena3a3cjt0o0ivypahkep9m74328axwee5stt'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 19:14:32'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 03:34:31'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 16:05:19'
    })
    deletedAt: string;
    
    
}
