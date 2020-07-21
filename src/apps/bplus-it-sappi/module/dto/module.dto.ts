import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bac4e3ad-e299-467e-b9f8-81453a5badc2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c87deb8b-4968-4e99-82e5-8b88b24983be'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'e4ib7ewjeuzt2yvkaoev'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '441e74fd-7959-4f83-b022-82ce46141f3b'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'r32g5ujhl33b80klau4fx68e39xx0tsdtb3oyr5ts3maplknuzv1hlomhr88wd5dq06yukalnvurx0as52j5x9kq4pwdiscbpnbs9ir5dve90832tg0okukka3sr8i31iwtfswhcfphwg71ykntl8twjebybpod9'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'a624ti367pwymy5qcejc9dhdrrgs19ew0b881mrr6gx7lh8u4vd2r6k9mhyyk7lzc39e68d3xddss6nzg4el8nvk6drxjvbrjz5ku6594m2t9ng4e4bki34goe0w2a6ve1ylrqwqmm8ytcrz1lbcgibar55yn6o5'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ma4urh5ss55epkbdn9iht212cnwcvzw31daad5xds615h001nr3llgrri6folpocowrwyuqrhvu30j22nf9znqric3khohyiwe2uopuvhuuk0omevlx49cxrkki2yyy4bvv0frsf43b3zq5wg9oxf97minsdwlnd'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'm9it7mx3k2yhjhb65x8p2qfwz8djtr43llhzot55bx05ypamypggaw4zu51el3u0qzdqzeqj16zeml9ti9kiwx8wc7y77w0re8x30rc5o75fpow1oqtdyf1kxqw9dx5tbglcyk9nra0zfhs13q8q4bork6gnh97x'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '8yzjldft6tqqjiqgyye4pl23i3zrowt0atl5pblh4uwfwcs6p6n3m05r1lutb8dfa3jbofujqvq08lfseuz45kwcq4738dbbqhqezx97di7yavlv5sgrb3zo44heocmrq3ctb42stm6ducyuquuhcxzsl8u2hfzc'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'jidd9qjhzzm0uuemseqcrjfa0dqztgtzjuagh765zrxbqplz86sntwjandub8lawt47exqx7afktwh6s8hr6p8qroyj8t8lftuh2oef3slwhmlnn6elhtydymq97mo9hpdjdb6av4e7bfvmbjvy2dmqc8zf0i9sh'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '3d6csug585cg88xv831peyswg29qmf6ebdreyjp5h0xdzy2o8k58eacrdkpvxyh954tts4l6mjfg1c7i39mtkdmk9ymn6rb3ijh8n4ero9ivzrq8uvr8hrxi4yd3bd5hvjzqxj0ji0xieq4y4trmsgt2i9oe44t3'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'ro17nftyrtgutbur1pp2wjvajdfj849eq2xr60vzzc051pg2x7flzfmlasp99crphsn9qu4r6ll01gpqs417lepu7ath86ozf8tlkmxnqv5iyzf7zq7xe5q6b5803ruoukredh8bqxrvhqgmvtcargilye4m960hr5oey4cyx170vftjngobmz45buorfu217jge5a6gb07szuvoag9g7nkgzw2plon9j7jmffuu7q1r6ujrjq54kf5mslq2u5f'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7g7re8bcnic26bj0q0mu8veckph8wdbw5gko6q5wqbo8nlmsz1g8r3dwv3foii6xxrc9e425zebvj97i82k5vx2wfojpnrpbl4qdh9ziboyic06y6ez6l96ffm40imsoma39av4430kkp4mtlhcavqi5cz2f065g4knnwd0oo3xa4iinty7yix3jlboohtovwox69uosodq9iugagbahtn60ssj14q5ios1lv0algm4o8vl533np8q9hbxstldjys4vkgqh8ezs2da0evxqeizg74kmfx33agraek0tgz29cs5vad0fcl9bu33wm3jab'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '22gqnnnawdojiswqwaln1w1emz0e7udsxa3awvg5yh4bl0i53s3odngcq218wynvg18civ9vu5el09uzdna51e707x1xtgkxp610uiggg66wdwqkb7ynv1lyjaxj72xqx6igf444ooy1lzo9f90pts44oo6mge3sguqqej1cge7o1a4lgsnj2002yu00zvrn5wbr3vvu6pvkq6zp4oemep1rbdt78ilzyixktfrxtf5ovp7s1znmccpxctomn8tlcpygipm9n8h7iijet49cljo6a9z8w1ya9ub9puj1o1vz7wp348g39qcd0y4z1lmw'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '60qwdnjscwv8ej1xp7b989mn0gixc1a634hf23oocjoozmycog28ejl3hvl0pj7mrlvhyu91gb7uxv753dp0gxa6d6gd3c82p3ydupek6mplpdzaa483i31ii4pym1upk1vzh37wfrcgsougl5m8vuekczl2mccc8jpnb51e8xpp4cs6qg318yf0sdyzyekrgzgtzsue18vpn2l7ftqe51dhzzp0ww1izgcylzqch1bonw1eau3p1ug4n5fc816v9bxffy5z9w37wwurnxv6um82254felbyq261ciuy2wzdbvgli5sotyzqz421nf7yntyph830kfbt6ggvqng54gtlag1ej8dl77lolqw7eyl5pwj2t9c1huc4a5pq64no1e8m9ifbxwm7l57e32cvdvnuour4slw3gltbb9fu7qgr8mab2vlaiuwew6dp4fg79atcksibymd6vn7ckirjgcqaz9ygqsakeawyscey5u2tqa8t9p0040ezphhg9k7bzezhvvaip1hivvd5bzd4f7079wip2a6jzzf2racacx6dzw25uor9pye1m7pzhe3n975e1yq9m2zmxid9xgyg3420aq9yfmvv12ju3zjhymjrv4dq4nldpa1q8flm45yio74oie91rrxu9gohm6iql1cckyzw6u3ih02teltt9a1ueqqgqsw13jyqzqfl383ngl1pof5dglbwrtqalzawbwlk3s33ptgjb8zvhvm26a2594jlrjm6i7e30pzfwd72tjjot1qzlcst0vxfetzmojdp3kstrs9l8rwrzluce3h6jqkab9rlua0ez5e76gtugw0n3ahfbr7pi6f7ea87akly26uj71a23wowc9dmo3pt3gqxvvqhtokjaevkvt294u10j0i5a0mcv2lx7rvhmo7a8czjelxscygls15s7gawaubrc1sovjr3z3j69cr4igtej38hvawpdedeg8hy34gfgg61qiyzdyyxv3vcilmedmav6b3x0drvrw9sl2fe'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-22 00:02:51'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 08:32:41'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-22 00:44:11'
    })
    deletedAt: string;
    
    
}
