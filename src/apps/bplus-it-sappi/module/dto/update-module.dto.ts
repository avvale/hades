import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
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
        example     : 'l2doxdaesc2myi0yrptodr08x8zr5kbs01hf2vxbc6f130yjfz'
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
        example     : '7t375566sow5yje2woak'
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
        example     : 'k5evw9obp54o2gnfeud5adqux06r81zdciwpkn8k28h06j3774ykbtqsspbh9a6cinpu4xulxsmzdw1yrj76fpaucfpb4j58pku3lomrva59xhm9ssv7crnc1gtw7pola8szcbhsd6b2lnfhaf37e78qpyunnyp2'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'afhb371nhqjni4laj2lpvmfqvd8tuwuo4g52flck150x36i1k5951p67ogolf4bnyvwvwdjzm2f35luzopnegdob7pck1embof80w2grgstom5ls7v3b2ewd9gf45ll1movyl38y569th8rlmu8966tlhxs6w62c'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '3qoao4kshx3e2ze7zuc8zlst91evmdq7d8pjiypw5cmzh5b1i416jggg4az456ptviikmrkvlm5u5tb5ump1x13t0ayag8r7r4h1nh9uxcdrc3u79e6yfsuxxaz9uw6y7yns4pa04pbyqin1wm4jn8wt6byn92dr'
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
        example     : 'rmcldsw3704hf80sim8ey6wavwcilgh5qob8s7mrktbd522trmyo9lap6dr9cgoew4ob7hwb59dlg6k4bf63io5qaytc4r6d2lpfskii5tcdj2sa73o3vas6l27fg7m4a19brc0qb4fsm6xlovzsaims8n0879ev'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'tgi2j4v3t298lglm1wal1xfsvek8sr9y97mltu0dk3xmeop8l9zy3caznuck6k5ug91dwi9xxeuxwvyoa375i7uew15afqlukmqj1jy6zd6qbvwsm94ijvhfdfnis57w700v3y7vx9sl8fni9ebi56euwt71qrfp'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'um2a7dju78tneltpvv158876m8ixq8rxk7i5tpjohj2qn2opie5j7zkqfbjbxyvhluqcv9hck93p7k4idtdh7obwbugy6k1b8lvzjrwa4x75uxyax3gevfcj1r4rouiaztdkr7ab3258kzef01ilhhz794iqqbe5'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ltgs72z7sydso1r25s8fq0e67k90enaf0nqo16ipohmv4xvgjqtg1xxko0ub8p6rmjcfjni7l2qp1nurh7fpm0jjcvs1d6hqaa1khl1x52tsv9g9ti1k8vabmw2us0797r3ihekgyx33eqk4f5ks11pbr9arur2b'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '1k22dxu60lhqwdma9xwh'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '7zaoixlgt0iq69rn6h8horttsd533dac6cvmc4tfchalb4s8re6t1csw95z7wnev0na7yrl03s2zan37a4t8z2ntdkj64pgdftjf4x4ga24vr3rnfdf4culu7gakscy3fg2i7oi6jzar1utdbpx0ieqzgo4uojsp1jjjyk3vsaaagcbovspk4eyjkxrunfkyjhv9kh3bvyvbqjhyyzbl64r4k3yw46pavt468zna0iukdx2djd12jimpvthmm0d'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yhp5mb6f3yl993ku07qevqd73p0pfwwnswfudixgkr2cggmj4o156uhykuw18pnv657vx1ple1bqi5qjwwsi917codbavrlijq2fybtvls5xxd2w9di21l3hemgft3c2d3fmo8di2aizn5y0siexgrfkmzdzxhzafpkzcp7uiif536d56li6d9dk9ysos8rqiszo928dzl8vr69vzjet3jergr64o7gd89sgibhg5pvr2qmlwyc20r8l3ylud5b41pou4fpsszotlml7so0xevhh0oglm2eg9fzbcdxncavei90qhrng6ys2sfnbawnj'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'bthp2tuiycjttvv83bwxpt6j3po5pz3r6z5f3jxdumf25r3sqnqvfj1g7yt5xxvlw8i42osz4m4a9fqdyvnqfjmf9dvbk8x5m0vozk0djgbny7iq7m5kb3tldyr4p316nkn4xtwlejsq6qcxk3dw9x45e9clthd7xvo2a5zl06invpzcmpe0frsf8v4j2hcemspih376734es8i8kc1vt0f4fnzr1of5pdz6yan8xnz7j4zuwtzk9uu1bdrbl6ffy2xbhuk5qj0xfcjul74d5lsmyzki6yxgsjg6ducp1o4sjct1wwyohpk5bldvo30x'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'znf4hw34feczhsx589yq3x13qadelabucnp0v367yo29tqp1monljb04ywtden1grqr5g55fluf4r0cuw1xi86h6rflzdcnh1xmeox70bk8u64vm0wkzk4bldur7vf33ur9f5wtpxbzkglhvujq7ry3sgvr8l2jz4mn138q6eu6sldm030a5vzyd96f9mcsd7zas5vjljxrdr786zdttycovo0sgo1rv49l3yxei0e4mtmm7n31pbxhu0781i3vygjjqoafn80uol45cgjyydmlwisflau89iwnhvxng6by22m6c2c5y4onsgejw0eh50ed1uf038f05zmj8tapgyctbns3bm5yo15sij0ct1z01kjpci0lei9hdlk728hdgsuusvz36slbsx14hb2wnwqokeo5acc0fljvhbivqce89dozpv7pojm9jrdzdihuvn1vovec1k66zmzuxrxzpfqxmrwm5416x52mti8hfsnndva4q9ch6cyskcnitvubh34r30cvrvd06u23s1bjhj9mtm5e3zxtf2gkub6yob7bvo0swlwxtsmydo1sjcnxwvf3hxyicbg0yn796h1ndyjid8by3nnknh3x57wc8nzwkzydr86mgrni7rbk2hirpon4cnzmdnat0pcfzqhlgwl384zqrqr1mvqm4ggql20bq5f1vhbvzn9x3snix9ubxir5305tx64k0esi7cedl69yi42w92664up3e407qnjr5t62b44jhj7hdcqsibo8o5sby6k675vac51srhne9tiriujlra3yfjgmgwa72jfceigwnqdhks4gmqf9t4d50r5fantnyfq6ii7jwm6x91zsyffb84sxqit45vjyfjvpukun2fzhbfdmc4pxkhrqowfuu24ye8dc3dl77yc81gx0a74gjvla12yf95tmuvudfv4rwi9bgq1ndbxg71rcypnwn26mb0wr8aggha2vnva2lmxg61l55bbhwujv7znw9lb35y2vn9vojahfh8cxh'
    })
    parameterValue: string;
    
    
}
