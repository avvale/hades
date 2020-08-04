import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1787f2da-553b-478a-a053-4391096a0367'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'zv2a5ml9n59e2kruluedbxpbz8stoeqfzcu0p6z7lw22blxn6j'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1abcd568-4333-415c-b2d2-66cab2e5f8b2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'q7vmkxp1o81avdt3d34v'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '084234c9-60f8-4fbb-8be1-73fbae827d7b'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'f4egzxf2e8purf0pts0doe7r6cp8yekz8tpiblwxq3i9cw8wx9phwkj3r8eoecr0fn6vak0ednv73cjev82dlqrcz0mhpaznz2818jjholg1felvma5016vgeu8tvk59vkp8a2i7bnc6avwv0ye93vyxhi09x78v'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'bw782ktbcisu15zms090emsxzem92cbkyz82erpocvi63kp27kbbyqdv9d7to93qpovpee4vt32e28tqjf6qw9ab905dh9243eumnkvfi7l02hu1ihpfvj9ugo1fk77udlltfuxq1syqql250ujoc4bqinb9hwtp'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'johba5cbemigrudy26vlsxpqze4ccf5ekj24e62cje2ep96yqh6jqwtwe5567u6qtrczo9vtvdxu8qgi90htmbfyz3tdcsxdutwcefi4e3y4k4wxcngnv64059jz69fpzh11s4ju7yxb8u6vkd2haii4jvr0yf61'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '94apt7t8ihfqfo2yoxmgit1vvrker74qfrb96ymm'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'xslpx0wsc87slp7lvt7i4wp826a4tmpy3l1il6r7ta8djbnt2tfg6cuczzk5sv6stxzwye3dfywpdor8cihlbvipgocvejhogmbn05zty1bqifw11puy5ng593s40w7il8fbmm2li0638azhxsrugjey478omxf0'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'k5fqgxi2jtcj8p5qq05rgaocwmtbo15pywz6ddwqh10ejs2xo8jveakoyz7mnnc7c562s4hnlq5ts7bwsg8q77j1i2fqkhepmul7rb6ueyf0wct99xdkqcwcdwmrfjcm5y2bp36a7y3qw0uwb8u1x9mlqc5zzdbm'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'u8yjpskm7zozb0zvd2gy92b8bhg2attzl3hkrebs9gclfjkvptjuo5xxizmzsfvfpvwmgtwki3bzfx6i4tbfdvlk857tim1nhrduscg6xcnrb9sf6svmvmgurxv1b46fq1z8ipndxsgic5qx5en9pko2jvlauw0s'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'renwyo3e58o1zgen66zgp12kle222mxvwpwwwc8v4rwbk9ulkpat4t5sw71q0rpo0ge8a2pi035tmyzpfy6onff2cxiieruuglgy1slk7dw2s47k16us28zgufoip2712kme7kjhf9ablpvn9p80wb1lt4q9krd1'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'm5f106xyzp33cwpb4cnw'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'w1auz41rf26ozfs7qp9anro4jxwt76pymdh9vy6stln96y0lugvq5ojj5m19n0aouu2ws5d0qobrxd0z1lriyk7dp0al3mbq8zxnooa7ye96b4ojkep1iy8em8pz7h0s7v8x3fnoy368cm4raf9vn41cyrolpff9gf824gzxlbq24pa861pdsg45u16acblgbu1csatr46jlvdwbbzkrn82d4g3ctnawfivzvpin4duy0g1px2o7tbekk5rru8q'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '9yvyznp1riwo7aqqg8li2y6z98k40nl1efpcor32qc9jutdbg87nk4o08nhymmrhyz4qsv8bc92ethtdi9t2v9tm2znis0sozrzt5dg9i74s217gpwnm541uje6jdxs8odd76xwtha5px4179h5xeg55vda1f4uiveiexexgbqfke0k2fkh6hei9udm09p0swu2qtf5c1hoi5epswu41gyk5pg0zzvulbmtuy0ldushfsh2ay8a584hiw3lyk2ocqkqks688m2be3drq9hadywxa6pkkthba62s8hcdufd0m8tvj08wseegadbnhl4i2'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'v3b0enogu1jz5e55de4s5i7zqrfefjovljbrl8kyl5afi1q3ie8oisyrsoht3yot43mm4khj3c06tfhv3gweadrafyvrgom1cmykvxr422fip339x7p8ftk96wo91kx2rpgh00ppr9z8otmwk4f7d8r2cry55e9r8q3ee0kf2t2kk5zuazjkis37s0dqzx2imrsxjbsdfqnpfrx694yl75g131hpebyvtz09qurp0tlcwpxxx31iysyskutuw2ver3xbcnkhnxro5lhwm93uec87xvcu2sdv1afvls1csmoeuvxucbrf7lfikmc4clcd'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'xclbjzynwcx36kg98ntrxvyxgy713a9bsmp6dmmi6occdrke092wtnuriq8f9hocq56761p5qcnan20j9g8hji3lekd3u7vm0aztewttnhvw2adzxq9yowppytetkn5gbkjzvcdt5emjuya0ov5ls93ltcb02yweo992nuqrieo5io9vq7f4hfoanyletwdp1tp8fht9wayb9zszs368008pq5z95f2z1xmv72dlcksbp31n8np81a5l9zlo1a6kkpcexxr91k3805bhlprgpkkz8rljbhh9c48x4it0bqvuklj0w2rtjax9cfo92z0fqiu2u52h93d8utlsjsjtcxtet8bov66483how380nftl48i0zd27m5esak662ndpmd8m3ep6ro4fwobg711du3sns32v9ads0c8gvzf4on0dstydpa4hgvlwz71oiueihzt5u1e0tyx91259n7p843b283c2st13myb0cizniebl6gugoa56ctblbiww1pdvtzo5jmep9lervwweak7olvv7ipqsw3bxixzssoctnt9gc803c3a5a4bup929v6q9yjt0izt24wjhra7q8te2c7jo1dmpvkwisukjjlqblovhmqzp0jmozyqhrft7hqwd2hlkrsit0ahzcofp5bz72hioaevsxc1gmgsy3xbujuegs4s73u30g1tg75uwaoscwqzlkpr33zvt4801p8r635d52ab9xbzt9q1ss8nju06zpmtb86u9zolxdwzd0x6ae87c38hy24dxtrlqq7w6xp3q7c52krjsshsospptkmhgna84ygilhk5prqway1snim44jgezsqfasax6cnvrt29n88udghcnpieor0gvjaziezktzij1ahs271fllih2frxiqxclybhshyw6ki3orsiadgdq5gn3ut0lm9v0udtidzbodzksfp9uuwpaehtq7khtl88jrx72kndhj0100phx3e0visb7dno244rl6ng5z1c7m3sy9pao5ek0rvtm'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 22:54:16'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 02:12:23'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 12:19:47'
    })
    deletedAt: string;
    
    
}
