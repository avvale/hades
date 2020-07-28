import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9dyq1asoane7tjguul6pse10poqaf4dv0kdg2xw1u8h3vm8h3v'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '50db5d90-c493-4048-b1fd-b1bde7661c2a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'vtvhwnilpxbxwbbm9tq4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '59b725bd-7211-4e2d-a647-4124093e3fa7'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '90m4n6q5nz9mvqx0o1wjleq94a5qo2xv5vw3uxpfaznsl2b711bf1fgkuyjl6qxt6k5jw5hxco9zqoeak6hzvj1i0hid37sp9ckrezxf7q8l43sqzbu3flwzvxq3hczjiko7b8at210j8s36xjg60tcev63rmc23'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'qscfago4884x7rt9ck82wtdalytdqg4w16snd8zrridww9208zgtd05l892agf7my74av5ir1m5593l4emc21se9kca9yos4i67xscgltwbe9h61utn28xhiesknbcezo478efgbns6gwnbxzasjrkizj60mn2z1'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ljlndispe4h3hj1q38zfzbvgi6qpwk4r1qee00ubctjffefj08njw0y6qswez15xjqpj2zyw6vk1vdqmapen03r6uc6qm6xvv577xj6kojkqrucn3xs1zd42y8rfohvbh7lglq9muvu16x2pc20x62wv02wuc68m'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '3c16aeb8-a80b-4ed3-83d0-898972931676'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '724l2s54xn8j8azbdfv384bh1vm0gp6775431r2x0i36v2u4j2zpyfm9xrk0ynfblqklw6ooxrngl3x4fifqqn6q8b9b3nrwiszk77zv1938r8xgfovfcbkrdjdfp2ey9uwo9cwleye11ioov6u5fzwom8k38t42'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '5yzpj9irpyyhqsgamov2odmuw4r1i19vcvvbfejq0p29y0th1yi2z0khe1vd9gienciorzomdlolp7wi7xh1wzksvzdywv9ve39rt0aoamo77yq6z8dg4kpjrjywvb777evrj2214jejd4cq6jm4rwudculqitop'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'oc37ejiupo4bon8vr24ujyjya0zx2v0uzd3juaex1rmv61yyqkg51m490n4v97li34x3exrcvx0a0a6r85s8w1jqeddzdtuphesgnmqjzvxh158l7v6toytrbp2n2wn79qs53co1hkm0d2wlvdnm1q12dted9egr'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'c23urgaptjazrw3bbnrt63z4c2iyzbn35xrsamo2uvwsm3hxjrd9xumv0eto7q2uh7bj6f71x6s9lkwp0kp6owhj8mtu0scqvmy3vkr69dnqokev7rekjfxmr12qhbgkuq2hpttjweoio4gzn22x5hzofszxe5o6'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ki98ew6rztfw60xwzj1i'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'kb5f1yfxm1fppe5v0lui4k5d3zij0xoydc1nvv1wjn8iui35va3s2ktkgk331y3xwt54j0hui9gj7z6dmmevmmokr9rvel7qb61nm08q3175m7qzfmawptnllo83cl3jfrwrgwrxw4yt5tes2rg58d76itm4oik8uvnbs9iykuqfs0nri4up150kmbsg50ci37p8bmnd0a4jehetzavctfvimngu6lbwydbt93e6r88kzojz8e1b7w945tddgur'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hop60rocqdl6zrwhn3nnnwliqzckdtxaeod6im5izhspq38uv0972wdf4wzy5auu15y72a9u67rsnunjnqalc13h2vosjirbbz5zzv19tea7as6ij0jac6df6z4ajto835h649cz9y5hudw7a1fmv4zwnho8je5eu66rkvqysti0krupxr2anssnzui7yrvldfgtdphttl2ojjub08lz6y5dslcuwzea9q8kalatouuh7ai167uybhb4dj9e1ede5b7wsotem0k2wrwim7d5px2je4oyd8fihd9q8mxdzg2oki8mvpiovr3kugui38or'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'nrmxa1wwfp2kpelitk9ndvk44tnt0y6d83axk4l2pnq7rc4rsvyt659fp2y6ci09ee87afnjiodh8hx7ovhv11txhjzj87j40go9kpwx663zjpzfzs7awh56xm9zek79xzrmqmw7gov7cf3885yw3t1hdo0ekekdsdd1di4ni04zveqvfeqzwm2vv8v8dlpy81di92lfp7bvl0jjt34lybkd9a6fc1ggbsaaid906mjbii2xsm9ibvodx1mrx41vjmw9beo0pji8fenpsng7o7guam3833mbnz4e0jjkgmkdws6sbog87ajn4dtvdcf9'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'lvjwbwy0pps62k4vewttbaavn3oy6fmyek0yudbrhfzwozxelr6u4bekrtvem6rj2rq9ert9oki0ummqk01d5bytn62qfnzjm0vmt5p8l4hof3tlrf8ygwd1loymn6333wp1gk66txzffjg4fw28lt3qy4mg43156nyhazbg44tm9l413o5nkhncyduedf7uz4es9l65ayf3f2zu0uuf21irkxuthryn48qbwvh7dpoohwv7hg5q6cfqkmx1nrnkgau688maop5y2v6w8mmgcvm1csvfxqjugfpbnk9xj9ahhw5k7p4cm1g0kiw1se75eqmwhblfs8c8knz8wjnyillaewkagfhnrl61ufojl22wq6po8apwe5ix9qemsyv7j4xvf8v4c5lsl9kr5g6k6jp0f9ulc99olt400w79c8aezhf4k9jww0x0dmft7n4u3bjybuvi05d06v7ejkk6m75xmqyi353boqb1udtly728f1j7579odhar7a5y1ytrhnsa9lgw7pcdo8g4p7j0vf0vojfd637bubxgbfa5k6p669hvgasv5gkyer9wzq2aevcp8tkrt4451tyd65n0v3nm9o9jf9mqpxog2pugeklvvgf0qhm4s4ekqol76gf7tndwpv7liezcfdivcdofem3dee1lr54kq28kxb2el80phtv2tcgpdyh3zuhza2nxsdo1mgo7qk23nm6c9zhe42n4ibpkiwd9x9hemt1ruyk0hh8o2pp7v4wgcgbbhvjyqrc2kf2etglx3jk6vlrlrv2ey4hv7g03u5qo7tdmb0bgxbazeu943fy6nowycqdiphyz8g9vy9xq7fx4m4kylkv3vtizuz4aovsqprbiq62kq8cch89jc0uh78ky00k376100akipm0jxn593lz9ogh4djw89qy52ccti1d53fg4lp8lzcfpjcobfxcbigik5h0aqo8mexb99marcdhr9ma8x21klv6npmgbgo0nb6eda6woya9gejohxvsmcibs'
    })
    parameterValue: string;
    
    
}
