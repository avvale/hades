import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b4913af8-c04a-4c42-89b8-97f452264102'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '44942e49-7ed7-4dff-9234-3923a5ea0fd4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'odbf9k0n44bsjkbmbty7vr24mfnbfcbchj0cw5wf9nkj51ob39'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lnhkbq0cxcrv7v2aewxl'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'c80qs55xg8lm3q5onrd0am2gnx67h4jwdfn71yef'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '9nszzg0ozvx53gm601dffrfaye4bydz5aog3pz54cg4bqmj85o4rrxg04p49vm523vx7eh25ykgxf8kcx3mdtuh9qzcdje96dljga5kamn9ot80vhwsspjr7ka13hybgmlowtujxbbm89clqrymt13rai0m2zsln'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 't0k59tueht5hocesl1n5gbfdktzl0dngn56h2xzxzfa7ok6wnf9x23hsamj5arwurwr3k8h6j845e45idtfefw7e5gxyxgpdgcyyde9w86mb1f64vbb7ext33cqczb0r3cqto79495blafrrbgothji9dohc52ix'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'hso1h2m6sc30dz9aoxprhqaarjn7dky3tuilo8fr68rk8r3uam4477rt5u9s9zqfojk6oycy9foof3wlbfmtaw37sei2gnv93xekqk4wy1fejqgggnum1jbcnn386xwnlp0cllat41w0p518ptm74czoa8fz9ir9'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'r2vxgtzfr21qzvpmc7neg7v72stycagjicpdzeha'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'j6s4u9mr4vk0wmfsocz20y9snbidvzfddp9zvmofur1o8p40p0ymjg2oc022k5kc63dmcysfsnsupyd9hpk1vgwu7vpdhdm8r1pn6qbwzkfh3tpltj3kyit82nw62b8bturyobs8g16fb382dq7l0rtvuqnagbfn'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '9fl6aqgk5g957sndk50zf7szqaensics3nkv7bax7hekeh694ilb4mgfkaejqildj898fae2f2j72sy3kde79y4ybegu4zr60irdgxp5u7p69gpds1yo9favv8vlwrqybkcwlqcp09tfjljw89vo6e12ysep83sb'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '2kmbwb41zvvsxzz48h5aub4kzzqw0egk0uzlbro25xfnvfu77jib2jw5hk1odx8onqbl18ozums38cf5fy8w5jrgpg54h7x4e5hgnuuv7gfwbr87bd6jvkv30ex90nr7jfwrr8fhlc1bf72trjmph5rm5301ra2h'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '7d8pjphhzod42y3fyw9egdvz38bioard64h9k6imvwq7u92jre1v1qtrqm25b16rz9c3kancf5q62f0ziej8lif1kmi9n13gn4cl5h6pz9cp0n0l5js4txsbb13d6si8bgxondsdw3c9hba89zri7bgmih4kpipt'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '20k2dyb95ji5ai4y8eibzaucvoj7c4cewyv2a0dm8p95z1jhw4pk5die4x5x3vwg1atiflftdm7dlpv3c0i4wwewrky2pcpjvp4gjn8pb67zt0vsokhc9itktpt3q5f4fzncm1g7n5heg3fq12e25gg0t4wujqja'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ryuu9vz6qpfwf2ah8x70a9xcahrgiqwkcq6ce2xcodilmh5p5fro77bmbxeisokw8rnpqygxigrbm2lsbuejpmdzypdik7giu9rb0cxsaet566muccxtyd1mr4l11yrapxv7qfr61i32lmioxviekcln0p36t9v5'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'jhqj9x3m2snq4gcfhics'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '3sjlrw4ssupfqn3rdkauyv8yw3i083bb4u9el0iv2q8ap1j4jarlrtu5g6v6z9cy8zsu23t6mu0xgawb8192k13wr2ptgf05ope9y80u219yq8kufh0bpljgq7ofp53io32800tdpxlbbv5biw0r3cvhretqwcuwk59qds1csjbklc8rk5rg9o47xybwuanrhhsj9jvgu1yasu3unlbantvofpj289jefronbmsgzi156f3j4pxrbj5ppftpjo9'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'rcmo55eya9c91giu1wdv7ufxm4cet5lnbkosfksgoinyf31f8jwqnmtui82zhkwh7k6y4rqdzwjke4t2wahst7ncwf6ouhaqn28jzqw7yoz0rcyz5oeedgcy8ajtm6t2h4d1siddyuowzote2112b14a7uv955e5tr29f1r1lqlcladaqljm9ezubs3gcj9f7lt5yvh4p4w89w9xkblo1ym25ylglmgdaiopo9mck2tfeckh04zov1bho2sk92n5jg0twf7nwzjrhc2zrsdrldgb4dulbv88jl3vkk6lmgzqua2ul0joekx7r6sxzlei'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '7347g48v7hoowjbvtz0qtqce4p2785a1dj37vndcph2m454g2wg0r9k7f73ij92bip7wtt286zdxedh4pn3mmgpj9qa2i80uix6l1bin05l8l6o3fsc0yf6bhn26cxu1og4v269mibyt1krq50wy1f6hmejicj6zux8l61ot777gp6p1q5ay78or3vudo5u306k4wm7ksv0jl9cf0z0it57uza2nxy8hultq71i4jukpboduxs4qqvydg5nx2l1wp7f53btmqgh9qlhn62ny0pegq8nqdgb1sk5066ydo5u10yvlk8rm1k40rbfdfgqq'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'ovaxci12dn86fx20gwx97tupt8bdf99vduu385whnr5bonhftli8mv4e4wt9rh8ynid777675rkdmw9uhuz8wzloje188wnz918o24uccz1c0mw4hzhur4nuf0ul4w0cja4yyouraqq3a5kctpfp3yilsmol1z9bb821dljnp4oe0465xteox88x38rt8v4j8n1fbljz8e5ylupwo75blubv5bzyl0skic36q918e5jjevdxmqu0y4pt5h99yg2c5l3o2osply6ncdzdq5f6gea3lkve78ugyyxxbflj7rlqapnjaiw24oxfu9i02uaietpjkze3ba02nw50khl704dwffhoou9bgbckdraolbakughvw6ushzvodgbqe0cuqr3bpdgu0tfgv5c678sptgpw1ie994de19fcmf4ndb4beqqp61nbnxviehvpge0eu21cwduncsw57172sjdvkvuia854w56tb7wby625ifqzxa1mwy6i2o8ks6zfkb9x54crovhub6orxrpyil5yiovpkugi3ytrqw8wych2gch1ot94td6w85rw8qyzhqeot0uult22k0888y0esirpr6m36y11lxl1hnp4d2sria3beg7ff4t518mgnveafvxrvri7827a4u2g0r1gzyzrfzklioq3fe092dopr0xnv6ui2vzk5amdavuef9t3thl7p2ze6kusqecape6fxszecdrsxdh2ycpiu8q66citoz51g6kc5pqfen605pr343cy9q9ikraznx0cx0gjufig9ib77zpr8ueqrsz00218injv6dqv2pd2ugqo32s0n2i821st9bhhyydo1j6r8fo816mqv7wdh7sjnp46mxi0ojutbzb89f0lp50krvnr0elg7l7uv2yhwinmi5197qbtveqgjuhm93fsh30uc0kbp3ji6p5pgty2204gc17rwu9tvqgkrpckvwovo2p510nx5ccdzwb8ccmvt8fjatkry3c9q83dxgiub3pi5ft1xjf7gh3pad3hdh4ybcqcwcidaxnauclvja4d1gz2tugvxjet2y8br3ij9qvpxo0jr5brz21cu2sk8i1x5jg6binjj44veets2anzhzspzbl068bg5xn6ed083ofoqdcskcroopivtytsqc5bdz5gjbzyed3oe3ut060zlmx44aqywi228pup4vg2iasiorvgqv4g0t0pns1hkkkcwr0uyyzij5kj47fyrutuwxk4b98x8w3g9sfr3ju7m0oi8tn018fg0hz5p0ima1vjz6gn315klvwy5lmh5mbifbxdh2w8yd2uoyzy9mbwh8nhrgw6m6wvs1nh8nvn1p8npfnkxp7acg96wifx1oj2xj3g3hesuq2ed5aj06d9pxtf38jlxhhy6vpgnk0zsg6qmk0p8zah8xjtq5hfjqco9507fo23mloyuni9jd8dqmsyofgodpnhptqc4frs9m2s42wkyiob4eim3olniuc2usii61g9a32e04mxedf2886sulike7onm01yyzotlyy27eys612diyeyq13tpo7pijp7niffwgkmy2kw5amd84pak3mjs5y7a6qpyp19iz82daecaizi1qywpli5m39umlzskvq9gmqfsm9yo7a4j7tolcjx2wsk0tm29m6w6cgh0suikc1ojnovcvtyxdtapca0oxsxd13ea1bxixcm9tabcvi7ccavhsnbufcsaytps2b5tyglvfut41lung17gm7qo3hub0jv54e9f10u2pje6cgj8vbtz0lui0220iesyojkh1dxpr9ujxiw72xgzx14l4l5ima3yr21b1p26f0jc5oehuvp9r2x2yqh2y512pqu4opn8eg5lsbxsa0dsiqnwk6fdjup86tuinzbni2r61yvawpencq3xkify2b4emj02tg37at7w8ut38wdm6im0i2v44lx6pi0ll7ffya1qfclgh2a3g6hu74dbmvpt7jydy4byfjp91e0qymtaclfl1fa3raciwsyn1d59jx7rt0s0yv2'
    })
    parameterValue: string;
    
    
}
