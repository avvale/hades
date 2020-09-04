import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
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
        example     : 'v8l768idxy7fz07l3t8e07ho8307qrbbma6l1tq5prcpumemhx'
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
        example     : 'yw4x5uogud52mfexvigi'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '0eiht7toscch1adekvpic39qawfbmknwa4uuwhd6'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'amn61lmm342yaern8yd3gefufb91uvd9agbuuedll8of11lpwtyx5tu3rp6cor8qh9pg7pewee3enci2r074alz2eip2rbx92pgrhx5dgqak6sb14tez94sc1a7xqxfbt1hapwn8v65cvxx1yc0lmrrgujxulqhp'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'r2nijttfm0s26j8g9f52ym3hkx57no4sgngp5oavkhqkpojgy5dib00jzltv0qrzwhk9b4chs4580kvr1kew8sy3eq15s0kto6mcnlq2ftvcfjp3am229le5qxwbe7d9p8xj1166qa5aeb6skn0knkyh7f7bg0c9'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '5nf51gqhwfg5xkzyigip5fcblrgo7xz0nnfvniqau754bpe3ffleqsu5hhqvnq68gie91hdhox3ean5nvw9iv1foqzmhcrk52zx5oiyya7fwxyili8ootqzpkyajgwpz4n5obw7hbxaqyccfyx0lw4sthrijnma1'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '3he4c7832c9x9km32wonph9zr227a5asehwd58rz'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'z2zn5k5x82brbds2np22ev5rijsw5xedxjaqiq3zxodnin9a8tjhklp52nr2le0sg50yegcpe5op4wsgziultnmg7ca0v77lfv7entvg8w5td3zf61wbgspdozoq9f0mck6x444l75l1tz1qjypm55z3krr9t735'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 't0be9vjavpwjs9myvynkyu50zk0qcrjawcyqiff8zldxqyklqth7fim6yenmikemub7spyp0w42edj1drluc8mhp91kzr19x6lhhx09dbj5mi1fr9b9qfb5h2hcxfgr88whyuvb2oxh1vwxjwrckmooeilhflwmc'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'qbeiexsiw18r1gnkqp5wyrzsi1n9chdm3t44z3i0caqjkwk5o2yi1wjkqy7tab2hi8thxwmuhfkajlkt72l1zwj7ny7jk1ux7eoe3vxtx1fa88xomsezy0d0pfk21qof9k750f0noifc0q16rkr7mhtu2u5r0ve6'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'oum1d15163ayht2d6hb2dnjgwd1hnirqsqxau9rwtfo62qzhs8ma3cujt4jotwkx0pfcbengrb989l35l30n3ahtt2ump9pleaamzqs2pwp3vyqnvy16crvc32jio50wf5epswzy2thaz8069yru8cdfj8njuuk3'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ifts4b9ca8ygnoycqzhc'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'mw9aj31si95v8jw62chy2nkcqsbjhvqa1c28ssbdzuo6k72d1h1x4um1u5sq0syeazil80cr75tk7xaxf5uy7r71jwfh9cmf9xrduttj56lbe0u6ts7scnafv0lhw31rlol0513y4avnys1p29qt69dkgi1p4ue440idi1eryt46ktw8je4xouoillrooeb2g9e5m7lk0hcyo7ukzgqlmj9eec4mk5r0y2jd4vspc5xre2v8uxgjq1igr312hbp'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'w8s158l98m0nu5em67adqjag8e78ik82cn69gft2ttyzf062au99gzzm7bfmwz9zdmk5o5nhrpxtgob6fbgd18qywkm371vikgf1t4bjh8p3mhmrr5p6x3wbigydy863o1pjvqx6fjhvgu4d9m6xtsorupp9xd63qnbgkqzv0es20tfhl8dxm9g1fcnbw046t4iuo01uo3ra8eq4wuqyp8vs3k6nunu4tivwazjcst72hbj923f9q72ay626ekvzzw030itiii7s0jm7a265ttfsmfctic56q24fl7elfni77im45004n8bsvduq71hx'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'bp6f6c2z95t6wrj6tct07w0z1g6k6g6mvm1dgp275i9ovl0401hrquudwd69h7ta8ox6t023kexx7rdvwrb966ymw3owjd5wv2qqintimlyjcz8da6qjcth1fjbxo7kbexjrruawyst25top3qfpqo8r1p3qyxjcz0npb4vh1seb0uxtaig0cjw1qf4burkj4sx8qybwxf9qd6lw6jp6xcgzcqwa49e6tkwfgxvxm9878748smesb76lj2g7m1ape4oyjoxpuzp9qoy3tvtuk79d7jfbmacvgr5dkmnydwzg2un0sqsi8db9bz21f2hl'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '1opv91qi12t52qqopie9eng24l15hn333p5fnmspu4uqyw9ozuo1gn6ygm1qxbptvp51jg87phr05cqha1bawazbiklud3qs7l6i6ahhjj6gxg56196znjlpt3pk1cnrx3geltkboue64t0g5qbz4q17l7zr97ehyotihw3yoo2wt7h1xw46n94f2wqkjf1o7h93ievtxwqejoxe9fq8a89w3jg9lsmttrlfwaswj0ipv7ad5qgoctbb2itav6xko3iqx6l03wmkjl5mlsll9374u7q598kbcibpjy3l6p2huthc24wacxmoshmw5uqschmc6ya5i19ttprgjilci3nmb9yrtp0fscx3afmf1xlyft6wqwyc12884cnsevbv27r661j4okhwm2e1u73lx2x4dwersag2s6we8xra9ze2j9j59wh9pxq7lu5urymm4nxzrsqy2ilet5v06ha7r2xj689odnikjez6w7v2x1r8cwesaspnnyjdvuyyezanm653hm2cimw68a2qu41mg06sww1wcrco2u4t848fjrfn195g1c7n1ygp70j0ldn8g9tdw7etjg30sp8tbmpfu0zz43tlk03x338ic31yczqmnrn8hg5q6af08ldjr7j6i0xd1fzalm2esic0ij3jth6yghb7bjaz5bfujyrdw8q72tij0afiw8jk5nmzppj92vn7ycqdo1dji55i9f8etj1at86b6mnogiecn1ltwte2jo0syqvbtcoit2wcqlpiwqb7s1f5oipdssszy6dglwew6t1io5h9o8f2dretgdnx5qfaog1hwkxho2wthsebrlht62q2ncgmne2upwq9pvellrxnjy52kmz00th0x0ntdee3p4txpz7084g6wgf4jqq69a55p95iaya7t1mrnusshb1d35qm9ina2ookh6oh310in71sjda6orajvlr7vzfhsr278c8s8jdvmr8da3yba8iwxeaavaooi7qk9ejmo8ugx6k1haf9ta641k1q9s5k22qgxlhgoo8ra9snfd0wqkshy1scnre8yv4oy7qc3y36lwii3bqm2gt2cprjf1pr166i0496iq5vj3tayti7zkqibk2lzxbohddrv57yig0pu9otgy45xtfp07oatu2ob9ji99dfnaiy6q541w35c5v8r7l9ohv7g1nw37n7imm76sa10tdeph54zxgydrt88ifdqdulwsj26q937eyvn9v5b6idj4s78isvawjtpoliiefu1q892mf7lsznthz84iuu5apt56oyfjlf6isuut509aqmf43j6gfsy61hpdp72ev4el52slu63nx1q2g6wicit37oaznwv80z3csh9xfljk6osiy1uhijh2qbqicie9egric3han647kjuwledbx8s0f3x150482s20au0krwxfceukhy4tiuyju8vgdgq5icchgbriv0g38yuj41zdxfowi52p91vi7ur19n7lspi05x77nll7atrtd424qe5fo5bl7q66qd5e9vo7gswyi4xnc75y3vkpd66jg0r08b43754rbnc8mvand3wy6avuadd4d4pzj7sozmdzootkq73ut1kdnmqzhj52679e44m4q9gwdmn8zzaca6x72swqzmxqnvpdcr61e3w29yjngbxzpp3jwwwzsg0x591ccc7jlgtrkto6te1pdkygvmsqsftzexj17i4k9hhadxxtvbs8w6tc03yrumme2l5yy75n1zoya3sn9ol8986jb19ypb50rgsr5wij8y61e1xgzbu3etvplkudx686gek05ubztwzh9gfx52zcezdq1goc823we35oaxvxao16aw2r2mxtd9a0kwpk1ygln19xifb6zqh8lcqqgjwklq4q1ebfrspyxodq9ziz6ha42r3d5gndbr03gk7x94x25g8g2d83xr47wjxtygxtp2xt6de4ngae4lwerxarq093hzt3fom809oelv5cfjcnsgk09tawereemu28ew0na0g5iybe27yf8vqjwxaagx'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-04 05:46:32'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-04 05:40:59'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-03 18:27:40'
    })
    deletedAt: string;
    
    
}
