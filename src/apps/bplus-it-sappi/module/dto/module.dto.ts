import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
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
        example     : '1lxfs8ou5a7p0qnxoio4wazzyodfly0zc9zlbmx0wjt54trhq7'
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
        example     : '274qiuujv6qvsd1b0ne3'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '9a4x74k3di60l183evzd7x19nqivrz0myv02bqve'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'g7frlzg42jf178eoeyxzs71l9pvuket5rfa1xqh1kwfn1goffdvhngjgulys2tz3lcjzdhe37ayvgt90jsx7vdgkdibhjgzhpzy33mis3oyaft1g88srk21s1r9jy1iugg81mf4945c4k3gxv54sezrof6mi2ohe'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'krqmr805yfcwbdi7htgh4dphmirociqymkh2qr7kd84sai3int4md8fehioo9wd54whhqfwi21ca636lurzh5ik0b3opafoslj37d0efxg4w13tccu55dj2sea77utiffmibs1d20krabdxmufd8gcp9wetocqfo'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '6llb45oig1ktmwaloopqrklfhyb9e5hb6681tr2yg1a7wepo75ze083xavay3414k5zn88ax8353q02xamb4zeiaahrp0724vanbv0ns9aqkx05uyav8bzoxhtvniw4pxz4tpfu834rroy514akfn2alp4o8be5a'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '5f157v7qanemv2y847li7j07m9cjr2smcst3q413'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'qgb2nlxoiukvlkwmlcb3s9xdoeasrr2atoyupu9y9yv71achkab1v0u5nxtexlk85r9k4n1z22hr4safrx6lc95q07zeob1fjrq3ptjhdetytxtuki06lb8nh8k4jcqz1e6dol4jkkpmp72ujs3x41pdon7impct'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'br47redxmsocvxkhkeejfuvpdl4921buaotjht7qw7pl2o2symh51b6ac4lcpg9fd085gyou8hqu46wgrdc75x4ksvk4ldn89csc9hy4tpaj3oghjatjctta0gl9jqz07zrm8jchje0qz5eo218b2ytwk17refs7'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'xznvn82lcxr6l1y02vzqwkbqjte92a8hko2klizkwkm9qztkx3ny0e4kq6mapmt4vra7xkkewlsh0ninf5bakzvlkju8wanslj3fcdk31shomr8ii0uxitg9tulchgy7dvkvhi19vo4uzqzeclc447hyfwo248td'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '4qqfeeekeiynizy783siq4izc447iwc979oera14r7syj1jmmyjmdlc5dbsl22vsmbtbjdu2oo0ri8x59xdgukdb9a8t4mgurcwc5mwy7tnybyl6w5cin55d38ysr5tn1b3frucpjvelmmscqejgs0walpu740pq'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'vjfomcznc2l86clcglxg'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'sf365sjc4bjo19g7t5szqtljuvo7j6yhxugu7rdhxcd4pjpp9jps3use5b9cwp3ykedf8iczfir6495l1ezalu2gobsbnv2fn9sjpc5bkvs6vgpppnp71w9acvnpsumg4u9skpwzrmm51pxfrumrg07zt4ximeu9wnt32r8flgl0h0trpw5jwnlhptga90xqxnj93zuoqu8lw5782z8h59f7l73uf9f4dbddxpsl1vdv4dh1ttgmuh0pbv2o9dj'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vux65nyo9o0ypq5z514w7sj7928h6jj572wfaheehlf1og0d5sqbo9cttpf1h3dpmdanlh007chibbqv4wwpiudfqq4nwgxx30qzyfyh75dw26q9mp6ths83p3z5zccsr5lq2i0800tkb41av05jan1cakahtrxlbgq0dtc2gbnmamvxt7zmz5c8uucq7y0jyb1ozsgadqi9einc53sfdpr79bn2neq2hf91c8onnmcyp8plc1421a88rqa30zndsgv1acblw38b91skzxz2ysxm4kturiowq70dj0zs1x96c6r67s2imm1udstc91qi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'lj8li8xjb9gvn8ailwguxh5be525il0kner1ycnh14oehxyzmda7i7zahtcsn7j930cq876e5me9jz4r7vm7tlo2cvyw3yxhzmq1dsq27ba8hdo5wu2mlbnvp0vkna90d6jz5s2pw3fmq7xf9ddeq0qijbdld4oreve499m1hphwkrb5aa1eow7psvr7f3zsnrhpzarisqkx96tduukc6sz0r2ix341pibamsj0wc8mdscjc2dlpofxgg3sqlq3nblc832p6sxn990bw7oyjsoaop0ckmxg99nb8ys8cmzb1be10xf67px60scdpq6gg'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '3hr4shzs7cnsyu6ldhnz4t2u50fi1qf1zxoyq12h4bdqft5yqdbeh5dtkyvjxeksm7g46khw9rv7vnbuc9lii1oggztx80xgby80i30lq7a14bmwgpydh3f1aohnqss9gwbfb4ionxbe9rfouht4s3e6tlxht6cotrs06kutqh8ispjk8ldsf807fvb7i8ka53n78o0765zsbqr0o035iapc6u6mo8yxar1r0kgqmcjdog5h8lddd16hfhwm6ided58hugorh9z8gwaz7f5vabz3dks9f37xl2q2q7n7d6antvexv8zmc4q66tok5jxs4thypge6pdoagks7ufevl2h4vf3nahpdcs8gfhrc5gg3uyrm6cnpwypuq6nshy1axz228o1rca9b8ecgj5k0xcysy4sfuper7yrx6atc1qtvpwbr3b3bwi2deb7yokmohx4kae82h2t0uqvd6m9t8267mmvccjvq12b92e9nwgc9hrnjyw8g2amsxsbe952pufp73rckkqhg46ochbcmwt1clfe8la7bghah6tl4xjownvcx9ho1vc6eafqma4mm5ydbp955ry8fdyn1l1ckz1of9siepc7umtw6ar4j7fsfxx7tojsbf516btj7zxhzmljofeqtl9pmvxs8koy1fdlsuclk4uuiclx47rwyii6195ya1mmrdaxw96qj0zgq08bndiftp17nzytv5muy0ntq8f0sy669ei8msrlgfkjg6fsksjo2j5upq54g9xdp46xvmttljn4bwmbjv966u4ybuq09ovuz6me3o2saupb3168oulrwt4tl7azt9edgw38t7ffby1k7ubcdryz5jk5g0ikrrer98ghm6psut369nryzj1ys4exwq3rmzmiyj233t8vct4q6whldqyec85keyg52ceszemzxvpi4v5818jscnwk9yxh0ms5qntngc67tdpdaeybekob8kvisefn02rr2uo8qp0ux6va8q1stiplhdgkkk95sau8kqnsm'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-05 01:56:21'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 18:34:05'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-05 05:26:56'
    })
    deletedAt: string;
    
    
}
