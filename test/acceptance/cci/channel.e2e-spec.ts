import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('channel', () =>
{
    let app: INestApplication;
    let repository: MockChannelRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST cci/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'wubmkmksvf2p1p4lll6gdrrpmiqsc9yu5pifrgrw',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '9tkw0w5iaerzgvg2fs5nwnvyqy34ct2qwws9m33c42kiayjxg2',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'p7qnpecgv7m4rrqi4qaq',
                party: 'l6ldnywm90g0s28fzybl497ah7wksrjya3gdy8ddy0qkzer0ew6nhgczdz754edm4dbms928ss1uk4b09kocf7ttq1fhoraoa80e6n7qscj9p7ja6nc2wj418i0fr4hx9mmpulrdyf38juxhuo93791mceu6w2aa',
                component: 't442sjl9fee005ncq9hv8bur347kctbg5tvoasbw1dg6z8p35ejua4g0bnrq3tru20kyvsqe1eo2fcqqkr1hbiib53ww1xqf2rxa0t3mjjbyoy4z00j8ozb49su1h5r4msmg9mfhmgx5oia5pq7zwhbcsrajx1zi',
                name: '5qi3qwozq0q9l2do9vin7ri4k8mhbrq2n5vasx6oapltpvlo1ylveegxhayykzdax17k9d7evb8mw73e4g37wna3xx5x9z6wlkvqioma2d9ohip20245attpn48iybkihqmt9sss19qrq8vmdo3fdamrppsoh8ln',
                flowHash: 'yzpqnza5myfdkb97bwt3ee1vvw3loxpykph33xri',
                flowParty: 'g6vkomad31q33scxuzebcalz8xc0nblya1xbx14uhqc8gyhcfqco4q4gfwkrf1ais4kq1n8teubllvanntiajgbz98jxmtt3b2i2ai9p10ndkx1snamxt7l7gm315wsogn92vze8c7igh33nkql1i2mjx4ir9gmy',
                flowReceiverParty: 'tp6yjfw4uy907u7gvevtd5gy8dnndhlu14phvkngyyv91689ukqrikkz5xrhuakx19mdu09gp0meekxw0jv79cjolo9xf7pti9skud190frr1nhqzr707xjdgzdyadqqfqa9k3qikt254ise7497ospn5pdcdqla',
                flowComponent: 'ceq8hjemvzqkv8o8gppgwk6ue749pteolp9t22lue1980voyv2nfchi6y8z2li8sm6j5tyv8r03jkfc5y9357nesitm6l9u6y96caiu4o89hy4lckhw3l6upqe385ytfugoj3p0m7rynef5vh4eku7sgzzh4f2mm',
                flowReceiverComponent: 'g5v01dbglx2qz5l3qg3pia6nyw4ja5s6flxu0bo6joro0smaaraeb87mxu4w1pc7japia2mwinum4bi3jeyhsy54owxr0or1o5ab3hj226o3jxuskt3bmheoeflf6wpr69hf9me9wbkq1t7v3dxskx1pmwkg3h2d',
                flowInterfaceName: '5s3bt4ljmm7x11thh46aexl4i6em350bswlb9d89fmtamuxof7g3qwcgh52dzskegendb3wjlankzittyhjjzqys1xbh94maplguxkhtq59a258ers9nk0lazg4g00by02gtirmj1fj34fj90n64j7putg3byhdo',
                flowInterfaceNamespace: 'ycgsr8289ojpocoeg4r33ewv8dh6ey6cn8w1nzcz7g2tebujtpqo3tc5tbq7lj806yc17rpc526z8nhd1eh3lm9hn8qsku7b0hffz8nktwfy14nigivmruk1uo6e4ku6bm4whbyg8obr33z9x1rj45bgt4riitnn',
                version: 'bmb1a3j85osob1j0mmdz',
                adapterType: 'yruqz1t9kyyl2sm0k4144272b27w4nwdxxd2jcstojezsrxya6s9zzq5s4f0',
                direction: 'RECEIVER',
                transportProtocol: 'qcuneg3w0auuzqd3habns7plmqd20fiawong8dl6lwvlbwuh9x41uz5zzfaq',
                messageProtocol: 'y56mhmxjw3owuhoycthkcp27sdhoojrslbwex3l4qzop7ei4o115ccpdzapy',
                adapterEngineName: 'v4b76xu6r7r96k30exz8qf20qc7anjjti7fmxlsjw5vs9gutb49xq6l8khxufqah9p1znqiry9pt2rj20eg6egmi03wq7fmurq5geuh9vi0c29o4w37g64adz9n4hpf5mryfdxqgb1qd52x0mb0jf005n6bi9w4p',
                url: 'n55tng4op3sz6jdl4ceqecto1kvil9mpdub4mujorys4ttx2tplzl5ehk8gqd045crq9d0djgqy34ylwcedek5tzrgwl6pt7qrvezsi9vuzq4zaigc7afvqffcmh3e66jk3n0hcugc2ionqu8fsvttqyk4j8ynj6wwm2iz7agq0ynauk4000lgzkxa1c0jxwx10dail74a8o829d858u8clubu0swafkeiwf6k0i6mdv63dyededh11izvw144jaob9ym5aoyb17zhdc2cmz8tw6b8cam92jous9xs7801dau3jnf2k17t948mj5oehf',
                username: 'tuc4re17jnc90hct1x754jue44w1523aab9vmep3y94hx69zdlj3qlhewprx',
                remoteHost: 'ptxzrdt7fbajw8zddlp4fv3mumdp93qtcfusi3palydogvbkrjaqc6yd0ahs1r8yam7pw6ovu5d6hjqjzknw3qagoh6kb763zjoken445bwje3m0d7b3fohmvxyirovbcp6x0jtlrcjvmm5r7m47qkdnydimoqp9',
                remotePort: 9367866907,
                directory: 'tp96uohb61a860w7jr8jp7zpf58mn3jw7lazlo5kxlo5tn6i2pnh59d0apefa9sr3zaixm2n7uenf56f7mlyrqusbqj169m1m4d990wjiyg4k12lteyuith2gnwdwqngcozrabfd7texwya764fdx6lw2f04b7wxyxnjzz34fzg02n3pn9umu6k0bvwk42fbwr9it004jify94onktn1f0u3jwi8xxnonx46knmbnu93zq64vjpd2zo24rmff43lqlz1z2ria6xadj0vzivtb6uuvck4zjdzjkkndwdzlt0uts2hstg1144w24qm6skemit3eeqv4t1jdeea9gcwevxv7rdvtibmrer8gpu3bzlyp2y1zq890zrex8rf0r6i1cstez2o7xpuurapg2jpnl1vp5t66ym6k6op0yxmo9metbzj0owhe6c0kvu6u9xrcemzgcm5ktbzc697ayyz7mdi9kzxjpqxljjfjzwjpmecsvi9yp2dplj3x7m3byrqy3yh5no7zz450hfkmzk0gf7vsesuum1cbvej1gx7b3iu2a9smm0fl734cpygwp88sule7iokrzu0fcg8wekkwjzo743liq0xznjafri93erm14fqghqjkqiajn7z5ahh82u91t9cyq1p8gyc9ozvr9sft9v2qmnfhmjrdp7zuam3hkyarwt087j0ptqgy0cruc34qfjizpchmywos9lg1ld6vswy1wrwupam9l9bj7v10adnu467w13l02ypvlszhypcoc5rjf2k2n3p99e3t3ty0ye8mshb720fo3an5g3ypchvt4ky5qim6dl2mvfph48mybuvcnlhely0haj97ysi7kim3akz1ow6eyri3knuwxbvfpwr9xbx44ngaww59dh8k11dde2gnrd537fnj8eoxfosy3c9lvxea18qdsot5sdgkjwdemb3vytrt0w3b7rbopjyhkyr7s7goenkeaxcr0th9sv5fzyfj571bvrvkqgmidu8bcae7q3dfp2q',
                fileSchema: 'sc3gnfru6hp4uurh5xdldz78x51lpnrxixapsd7vojjesgh25szw6fkua2fc3mws2wsr9bdo8o7plhv39kv95y9nbbarn8qno7d4u0cnrpssippvzmgla8drarl3voiihfhlflu0of3g41pstijwg4z09e1axfnjco8elr2f4d6xs1aq2k2n7l1uh3kh4u0z4xedq8128zjbfksqfqf0mh1phyvy3h7262r9gor16lofbaei1c5yys2mkkhwocutrdb1eibpisjb4bzxgk2jd0h0be4rou958jjqlatviq3hg4fae6n2k71enx5rz61tcciy08epths62gvog3cxlh1kc1tkannupqeitlnow0tpo5jsvxz713ed3e97xx3k2vt5t47ytmhf0q9fjmq6x3gzrtn6cv9vm18xqqptud8xw64hr7xz4wcl3o4vg6504n266h8skq90bc0lu52rwgw18jh0w8ahfzvo49eofxeozwwfmayqbcldnt262gipumdjow5hlpfotv1u6azvmrw8zwzg4fu20e8ktgkru1flj8y8bzf2va54l7b5ok8mxbglk5sqsdbj6v3njvw1nvez9npxhhnhtcit8pufgrqha9hbs6ngslavluuot6hnylgqlfr0nlbnwtj0tf8mn96odm7vlualhhyzm4ldhm6t3x4g3m9sg99yp6e7r8ks019sz8ce54oh2klqj0lfx77jtd1yjte56mpd37iodacskp402bjgvtufy2ga6ksg2u1bqh4aoxb0lw1ef34w874q2ucklpbazvbdw9ett2j6tkx44f4fene548o00vklmtp4yv3nwc03uftqp1x27n5xas56dztvkjeos9u6ft27ydzfgqou6o4terfol5vfzut37z1ah5srvrcnp3xv135p2p74ydfsguri3jnelb16mhd58ztpanhgx450di7aghdtz7jz7xs3t6nnggr3r2alo6f6r63f440fvnbs7uoyzk5rb9jjjxu06c3i21c2',
                proxyHost: 'xno8w9gugpdtvuvjocy6al0sak4huxj92xggaav13se1qjobho4rkcdeeobh',
                proxyPort: 2943037214,
                destination: 'e6kuutudyj7qwktp8z1ctgdponp9d4rqsah82zuh5anb2hsk1b0ngr3h3yncvzj9o5hl67b9i313u8t68951v3m3hm6x64jesrai6d2m3m3uu68ry30hrfm6125zbsj0g4fzqffuuvdlgbw9zm75lme1dq023rf0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'etgd0ob7z5a6p258wru1eisnw36r1qcnfpl6azua4stxbx2tt1a59m4r8aae8lf5x93c3v1etau6q72jto7zq5rh9ohzve8sjmuvmqixzuqp3bxctxdlxu9rl7t6rkr8xzylj8em3qili0m89qv2gyh98dt8gc70',
                responsibleUserAccountName: 'z6nlg774u2j1lv5twqcz',
                lastChangeUserAccount: 'j1n96o0qipoj8tdplkay',
                lastChangedAt: '2020-11-04 16:25:01',
                riInterfaceName: 'sbu0i9wipstr7pz96bo5fgx7y2p4yqqbvdunxjxnzr513nwvxx40ibfh86gvckszee488ekj7c68zoepqo73gwgmcclyb6da681iyzyfzk9lyxq6y3gtmmo5vcn0g4qrmkkmamib7ibb3hgvk56xan1wcsghligj',
                riInterfaceNamespace: 'ch61umbjmi7sb3xh2ykx6uuxlcz22gttma8r2lg24hhces1q9ctu00430ylv0g1ohr4lxxujzckmomtl7t7zja24a3zuroegyu7z0q6tjy5qallh0l5f67a0vz1v8hnh1hhw63edkwn5ib015n4i8lo8plkqx6rx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'l80ei5741drx6tf8nvfdd4yhapz6pbxgysmwf017',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'ckxj8vxxw61nm0pxo9cqhn0s8vebirm9h695k1ebegl4qjeyao',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'xzojjgygcfzul47p8b6l',
                party: '21npzcujfx7likytv7rszhfl5rjnfgj641gycb5q3xs502yp67ogpsabklnlbypzfbot7l706mnn0u7lli0rcechd9dt2ic5nc6qk4y4gl2cfg21w8y0tg7ky0qdop2eq63r2emapqa9g0eym6h6f6yok57jndjm',
                component: '71b58nqqtfvga9w3ofoijl66n1r4xqnhyr9pad2vxpa10mcauxe5vkp4ad2u636yk7l18nxp4bs2ao2mi1j2a0bkaamrvg3phlz5kcrkmz92bndkq00w8lf030xvspsv4g9y09sl95uc45o2zn0xib366hxbsxy0',
                name: 'idutf4kzo6tm67r9l5s6nsi33lzhlxbii0o990lawx3wu5knrdk1xpvtjviuqqik1i914dgrtz1ekb2av41xhhefwnqejb06imukaqgutapvwo3b5htedhnyk1sk1d7szg35fn0g4zajr067ljgnywmynxqgphkq',
                flowHash: 'hoeitd4ncjvdgjp2ycumyb3efupgp0jrkovb1mmm',
                flowParty: '4k0u16y9pa3y06brnmic5n4ykwxei9slmeo2fwy0tbihb7m2s4qs7gmadz6cw1ssst2y1v67yesd189hla0qidpl5l8z91lzyz090bgmas50e5fk9vpik8rzccefa8duudauyuhwp2spo19fx9r6gf6itnvht6jn',
                flowReceiverParty: 'p4ambnyuk4t9kk9h4jigmhmp76g7mklzq8yuwwwlehmcb76g421pdabhhrpehi3wts63zvdjze7znoa5gh54xfx0ylqsekrnicvitutayllc4l8isnvyljs8mlpr6rpoo86x0efupd1x34au3vplmbbfn221uvjy',
                flowComponent: 'bfq56wj4jfj8qnlopgnaz3qairww8ctlj073i2redvajkj8nvx9781ca8zie5s7dtlerxu5hnx13d2st2a78p3aoslr1hdl6wmcg5euxa5rtz6pw2n48uqc71lh2mxpp6ndamjma5c4mmmrm4zwsrc7y0er074xm',
                flowReceiverComponent: 'ocdmd6tjphefpyw8vsl1qbylyqxsqktrndxqm1ebhepnyev1qq2vrzzf2jasdrceb6cqllh8cr9o6imu6mqn2sdtqen1wed555wgd8en5gufrrm9wgju8t9vh9ilt17pcve96f33e26i58net4sd2fx9ltd2tmsb',
                flowInterfaceName: 'wqd622lzs81dbocud0svsrwlddg5pyxcirtk30tg6hmofud8tidfnt2qcgrsgm2siwph0oefmys02izfniavdva330nz796u69cfrcjsw9y94qz1490p2sewdymxbfjvo9lvxdadmn7xbc0c0siy636v154xereq',
                flowInterfaceNamespace: 'teiu2c52kte78re3gl0jyy258k3dq18mh2zhaywgedg7g5t1cqw0v93dvuewjhycvsom6egm0kq7utp0cny324djny0f6zyxclxbk1ljtj304jd9oi9ntltn2q8o2hrox3wywlfej6u7ivlfrkgqafzftbjnn8vk',
                version: '8spuezptmjvr9yn8xwqr',
                adapterType: 'wevgvb6j4dyo1s3old5qk46bhubfqax2nmn7gfht9ptclzjq5ne2zw3uj6wk',
                direction: 'SENDER',
                transportProtocol: 'rkc2pxwoc1va19s4owyokltj7unewjcdu0rtyizzn9xg7idcndc9gbfiknru',
                messageProtocol: 'lt7juqa2330x3kn1dlb82jdgq3qx13r9dk3s2qn7c8utb4gujtmsafd4cqu1',
                adapterEngineName: 'xm3gdh2pmd1kk8pxus4kq3selbtehebsivyvg1jfrpipialfojue2tdilz3saqh3hrv6tk8mt9g7haha89ju48h0xq2fw85cidsfk428cng5pv1bqdapprgi7jvquul3oa6mis61co4jyu2mm0cea8tse4qrr7jo',
                url: 'm7747x90yz1r4i7t27qzibk3p72d4k8zckgholiaoonksdhrl7gllj5ig5n9d9n3iv3u5uoc7sgro4jpf7ehvabrvp3xmgvdv52cek2k0aw4fkx0juhv0g7rbllr535gmgqsxmcowm91mxxnn4mqmrcy51672fh2usb6gu512cqq9jm2hbdxh0l83z1zmypuh283ku9gncr42yxci32g1b0k88902ydq803hlhka8bfwi54zmu93pkzqzsdwq7wdk6kwdbnzfnujmelskhp6aao6a8fyvfef5jm6qbp690zlvdzfyc4qvx83ndug6wsd',
                username: 'zxvgscl1jbdkf6n1tlmnk64x9zb31xelnaxuzausjmroujnly8yq0q22esug',
                remoteHost: 'en3jeoi6q6nv43uotcn2ck3i7yxi0g7q3kr7kygb0lyvpb1xe048la41165h9tl4yjyofcmjxcask6ob3ymhyz9eh3qjgjku6csl00b3kl93qggrrfo7bw79n4q64he2brdc3x2ky37wos6vy866ej8x3g450pdm',
                remotePort: 7316637656,
                directory: 'o2hwu58stajg779r2dq8onchbjh1s9xfgiv68grgix9ninrmdok0bxaa223wdksaau9qse6p5oa8zz78qf0toksikm8npsintzu36nncznay2a71lp7qfzsszdwliq3zpowdvbgbmxm6hyw82bmmwzfk19xdoqjo88soyi8mckwr27qcru04fim3l77ez1rhhary9g8n2wdwb66fkpmhm210vgccqld5d9q4j85ojf76wbf26bkh8plnqjerh2t4t3n3h2kftk8ihy2kx1bs4zix2fkcwmco05s21inwruncvmygzq0g5nvbrriiqo8msx5zxgzszb7cu3qqntge0lb8zxwmwas39rstalskrgfhpp4hfym014k70eensuwymvx5ag7jhild1of17fz3mk3vgef1stnvuu3fudrwf0enjp3mq22ufm1jrx4e03gmzbtg84nxf1fdpg7m75l57scigjymqr49vtrxc87tklpzp0bsbfhd8s8dd4pm8tcj5egx174b0zy87w4dd1g6k2iqqtxgkrdw8wwcykqxajypq4dv5v5e7dabp7ja3s78npboac6dxwv2x1qfx1z3vc9l35xsszda33ztdfhyhfv8ghrgg3nd7pmb7f1pmfmrph7vj438tmae8a5gb1y08c7r2znh5ygw7dtdjlvne3a0fb3k92l3oislj7ei4upo7ow00was11thg9yt8998p3ojnpbwv8ou5qtl41ke374bx0uqq4wyijijxf14o83vo2fof8onx071k41vae9hsrgn2tropoobs7c5cy9nrf8m214myq1fbfhmipxm824g3sm20vw1l24m55e4hgxfm9op6u1zyd83asxjf6d4wcg1jpqtie01jeg9zasa3q3gax5tr6abqsuve03cw4kjpl2x1lgrid7i66784mz46shbjamc4om73vd9mynssckjihkotdf39j6g8aqnxcbgpcx9oaij18s0l09gfoynt1cdjy4tjug5nbgzhf4446n0',
                fileSchema: 'a2y864swyvld8hu8wznw677goq0q5fwb4x18hui9jlgu5hfhzt6genwnhuwm3bkitx02yfpzzqoaao7yqypnc7qmjt9lbkrsc0vbkj8m2zatdclmjzduf6r8mxxdlb4dk2mzh30ngl6efigdfpu2hnvifamrg3xx3ingdnl6urlfowbvyb1n7dhwbyjskvhnd9kdazdxjgywt9aqibejfqcs61069kkwu734ss03ktdh3hg412ie0indpmlnfepyij62waycttu3dpr9ufbwf3lqd7hbbj16ioag14nznx2ycug5ohy2lscpp2uceivmxtgp66gtrh5ng2ihwm60e6sjx3x7pnhrr82zsfpm74x7cs5iwtpmgtag004rgzk0h442q2pfp6s8sbtn84f4y26yacuf33w2kvv0av6372zqrnqvq68lg7gs06rlkk45lpwvv7k823pt4t8j04cenaed5to28n4cjbfz7jinerebzkm8w0tg11oia4g1szhfld8u0wnyku4oaxfxydgmi27igbist8lfjpaa5uc5i4idm6lxz314tgdxsopufh9wnsyzjpc5yhvjhdn2j5vlppo3ur8uorhyxcueyr7wbxukelohaccp0my5dqc2tykpawjhkj671hwktiyi2adgki9yarap4s5q0qt96e0wvkqzizaptueyay1mcgncrls047t64xtwbebnpk44twk0j03txxq6ejppstkl3k9ltqqvkq0b5p98uh3afjga32bp5g0ooj41zqf6uzt8op3ocp6q45izqh8mrhbotq1kdm8d2u78s71xs69338zw33cp4osgieod1vrpygivq0h95peurkcabydxoubi97ar7kw8bl0nftiav6snxfo67ydibvy6udvgbcyued9d3blvm6s3dhz4el64170u0ba2ugx6pb6e7wepxpv2g57lrh0ctk3mx6n0q84ne644ighjhe4noqta1kge0239u330igkapcwhouyhzzgtejukhxvl',
                proxyHost: '3xg64qw05c7ywqaqa7sixta7ns0oqr8h6d0hc0yfhsajg4fdyiicsuxqbak4',
                proxyPort: 8466697595,
                destination: 'da1weh1i4k8g37kud59mzxtgpg8j6d9eyf9gm4zfs3l0pt9epq33sfsqndnv2tpx41lzrc6iggfzu3xd08ps8zypjhnwcpc6kr461ot5srgwuj5g5qnyz8mrfoxdhdvp58kk7mn75rnuqellzvt3ucvevjgwx3ja',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fx1hdmzyx7gvug05nkiujsz8i8pxntu8v08l2u57wutrd39crq3yp3nt5lflwgl8tsmnwa4ugup3co1a4lzarc7dakpf45trakap6nqk7e0a1ykcjwpb1ecwrslad6zt441e5sh3hj9akp6r4ppn363vcquxcqam',
                responsibleUserAccountName: 'bc410higxxsbbrolq8wd',
                lastChangeUserAccount: '1kso69eb5t7m148i8rcz',
                lastChangedAt: '2020-11-04 19:31:28',
                riInterfaceName: 'h2a9mlnvuaqqz7uhxah96gbayxw4inimpzmy0vgibzdt6ppcat6wy8t8oljgb9t586mzstmw5ryhg5lhav1819ga35md3siiax2npx7idgr50tknadfupyxk8wewdb8g5btrk2iv9kczr126ll64qqrl4hd97ubj',
                riInterfaceNamespace: 'z4xu51r4wb5hfmpwq4873jqdcq7dk2p18q2tpgg4jqnt3sg1r138wkfdmeci7ue9vfkog7y6hopha1lsuvvkao0k8whp50jzt772nf4ro4yhxlwalxh0zzzzv0labjk8tns9p7ur32srhnt8t806eekqgax0apah',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: null,
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'rng4nfske1tjvd4szazigmt1iz44htnm0ulr2xb5y8w96r83op',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'ar3a8129zhfmthktss8j',
                party: 'iwj3p9f7dmrjcgwfv7zbmqrqhv5i9g2z4cdsxcgzwwiltyf5pded5jf7dlrbcfnxaex8jlbuty0l9rdmpb6gp6jq8xsjq85xlj6odglvqqxkiznfl39v0nqj61a2fqbv7u5temmu9dq2hyjj21s55f8pjwr12a0r',
                component: 'g17tc50ebbeqfltjqphyoptxp2zor82s0wgvvtm2lg3iz7ejavwcbx9hn7o8mz8n11iutexgbf47h7ha7rn2eparpydiz5hgg6x0l28isyxnk5pvcjx8qgzlcii7b9mcckbqxyoq7obxobnmnqbvei88673pnuod',
                name: '9rvbymg4zcywhpbr8hm8p19wjlmjplftx7zufbwnzdxp85s39vs82j1g3djbtdfz4anh633pg9jcuhafstkut6q0vi1z3fv3r0nd9ponddot8jchp6xokw9cs1nbq76g87wnhmp1sv6btdgs0jwjpyap4spb91iv',
                flowHash: 'q12ol5npgiye8p18nnkq7f73q2ina8p4aij6wby0',
                flowParty: '61c9f8z56g2naspnit9r29q4okz3rjb36zpp77jmg9bq3rk31q3ekq8vpuxbpb4t1bvhq5tohg64wicstgmeil8plel036i8tj74v9wlum8vcyiw1y4obqdk0ywnul5hsaqib8tcpk61i6rkdk8g3529rnkquhuz',
                flowReceiverParty: '4kmm596y4anchbq0evl54f9y98657z2sxjupkjgrv9dixgulacvnxkeeus87mo9rl88gvfbcdyjyks0gnkjah29wbqo5e9mtain5x3aspng2uisn2w66pqtpmx7t1sa240nq5l6takxrifay8tp9sr1xx2tmhjpg',
                flowComponent: 'tpgggno57orfy30j40prgc0bx6wu1jliwdm3araabg8vdpf1tyk2qo1splecsyl5f4h4hjs0qz4btc6rvxbsc8rxd5vuixv0w575uuhie2dcd0k8d0tdvtqxo5exb7wcx11q27jcf9y55u62bxr2lcqnvjp5oboz',
                flowReceiverComponent: 'oos1ojnld47mf7kccib004g62earx9r52qz7quypz4va1fk8frxbf6yh2xupvviyub11f8eet0y0gga5k9qppaipcr56wbdy2645wfzjc6s95qoiu0v1xb7q6joqg4ipnhgmgb7kkvsmgfh5wbpall2okl97me65',
                flowInterfaceName: 'iiu639lj4uo4b0evfuk74dg16z3h4ix34qgc3p4kxv78r34mu6vjmiobpfq5wa1a0qp3zwl0ra9d8yvsnrm5w49fjz6vogax9j8tsgadxrbra8191yw7lrbrtha2id7qois80v3r5usany2f78277p6bg46clxi8',
                flowInterfaceNamespace: 'iq6g39t0ra9372gqw585h6tggndi4vcdx3xw55qh554rrt6dbwcbzx86vtaih6gb0st7xalvtl9badhwgl7h8gwicaeopbn45r6t0d0q4asciq1wrvf3s9n7l6xtj1c7bovb0v7nwy1ge8p9qhct7okkyw7uir7h',
                version: 'nqw7820jb4i1pxar0bpl',
                adapterType: '5o1cybhgownrkbp53nqdc1mz5ae80fhavskb7b8uym32p26pky8pj7e9u0jh',
                direction: 'SENDER',
                transportProtocol: 'ea5n0xeqc729y3zz1byy0pyk72imrai7cdm51k7lh8sef0obb7acuei3j7fn',
                messageProtocol: '3so54u85u9sadvsjp8cyqmk0j1vabl154bwomasflstwkdga780kvntwurmz',
                adapterEngineName: 'dn85zusm8scyh6jv00e96trtxnzdolxcytcf29jgf9abicbm3h834kqrzj7ezo13mghe30umorp7b3z1kll7k3etha2fnxcca7sudh44modu53juh43yw4al6uvpra4f4ehhw3bsj92igyoqa0nn679mbyvavh1i',
                url: 'x8ugze3sz6275nxvq2y21c9ajh82gwupnzsmetrln4drbumcjpr7tle3ntsxgewo0u4mmh2lpussgkqqidtdni4hv9tqu3uf5fx7f9aoq6g0o0sq0cwv9cwhquv4hl2cakazql81r2p09corcyb96v8vcv2q0utvu6armsbe1vb15eg840h0k2ieed84q6tmuswgef1140rez5kqez3ygq7abgux7dysb9jnxh9sb9v9axcc34jz94m5xdai0nd5amly6w7p4qdhrvzmtddtn1m7y3g903f2iaaqxe8yjdjkop9jyjtbfg2d820dmztq',
                username: 'vu8gd6gh7fnffcf1z0ocb81ny7mjhwtl7ddrb53cewfjho7etmx1gs3lkaha',
                remoteHost: 'whnvrrfbf2rs8h7ux0efkr6yuvlv8x7uod2kryae9rzdvir94nvn96foi7jzrt52gm911o4vxyvcurzgewajhz3n78cj87lio2yhw7kqkokpr3vsehuhhhrifj1ekrlcla6uykcygphxbosxo1brpkmp278f4o71',
                remotePort: 8069128039,
                directory: 'tfr0bqp6bycesfcgpowo3hkbiedw01euk24t85j4drd58czqicfkzbfkhjrk4ka6wopemnsuqj702yhvwh1x6d4tz5lsuoepu3fhpmgvvkmprr9xv0csf05kfqisnnbjysz3fz46bdneopk9qyxv6gqz39lr4q2zn6sftyb43vpprxy7cvkd4u42uu8fy31mqe3vpr6876xf2vzfr5agxw6k7ad7zsflvw1nn0652weoh64d8l82lcsgxj7mkz2o35ptthl69v0iozax16wv1rf779z6zfqoz96iwvrbaz32rhlcdj5azionjwppg70n76ylvxeo47f182ehmoydunok4v273q2pz4mptqmz4r8830io3zn4pghj6vwghebanmy2cjl2200zjxdmttpaeap9f2fuzjp3xqdrbmha5x35akrvdoq7psvmcxxn2ujiaqhl4nfn2j9qiv3a0wgufvqwhspsr1z25l6t00bp1g7wm6lwqa0esbp1j0z404t111pmmnm86iiu48wqyw49wkunq5whs6ltn2mtqgcgcvyxxurmop9ytft8jj927x2jybdktw581aklttnvsfi7j2qb41mdkb3b25vbjhbqryt0ddvu7momcssgmfisg9ee0k8zo4fwtslunovl5wq9c4rr9g7lc76br25pvm7l1w7rxyuw4r9irwwj4isquii82ahhbi8peaqn8ews35l7lu6hoy4834o79zlc2k3wv484fhg47x1a1834cfgtd2re96jbttdr58d7b6s1or9lfpy7v8qzh14pl58f59ppaagxu02efhzllfguj58cv6i4ncma7cxpdy5av1jsvm0afsqyytdxos3ahqzjukh4ir2iyekmd9z9jplffzn4vnnqce6r9v3i9n5jcqx509w8w4c8qbz8bdt5w68q29a99rgrsjp4xai0rxqkxu4r8qm17p1ce09e39k3kiwa7o2nlwehu8awit01lbvs1iljw4pdcni0m3gvch3tiirm3dbw',
                fileSchema: 'reu8jprwktu0rc2837kz9oxpv988iiq0gvno675rp1derrjziljc8b7xhgt6dw4l4aej9jlp5devz21d647u5e6x378k2pvbesy0xj2q4mxruuf8vpgzhvb7pz1f8iq7ofuz49m8ejcsjfdpu2xs3en6uu9o0mg2np3cpxyyugarbvrx5nt4kn4zy99wd9f4wwavqb2d2sw2n8trz4or2tjsq8k3g3iqoluq7j2chixj6ppkl9w7hzmb8gxoyjskda8y513vebg1nyheeqanmc267fvklu3fgvdnpqsu3gvrezzdq0zcwfeljnjab9r686f1vto46nwxq7eez8n2qfg13zlv99ivo2a4eqhkjtmof8jghe5pm9q2u1kzesucqpnw7n8jv3uq08bmjt51f5r6pp4gohi5mo60lmtwgizuqf755frry8qgrkr116rrvigk1f5y9mvvkci6re918fwtz5u9vlui30occt0avi4q7yfiw6hb30npqpr6xqdlixyetzl6szv7w5zf04x7vlro6cnzl2nue6jgd21qb84zpmlz12ybuft9luffwn7thv3g5pc1ggi1zsjg5mxiiwj1nrognz63l7vupctmydi5j4t9794hadqig1x4gj5ud9x1gpie61lydxhmp5b167kejzi165wg5gw6t5y907pzy22ql9g3mmwswd147bubp6m39ysobksgwmtk0ss52hhvnkt58rjs35wtsmh5d58vxdbeywcm0gng9rhv8cu2nfd26tkqmppm722hjgvuxi33dkae6b8j4yw63nzett4785tjzglvcu4cwlbhdq9dbrx8ez7u7w14cxso32bq2l3ff71uehbhutal7xuctdhp1rm4wtd1ccffrr8y8glbj19y48uj5ih2f1c3vfq188d4qt6o8jm9b8ynfscrbje5o4g1a0sbzwgmd2n2l9oj4emwm92eyuev31axap6km6fo56a4tgnrul7cbpzuffy4t6otpfm65wiwj9i7oo2v',
                proxyHost: '5uldsncupg5m12ivz00eztvzf9w7zozxpe0avyglakkb2vu6543b1pboejog',
                proxyPort: 6045338663,
                destination: 'kvkkm7zsskgx4olsmgzhnd2m40m02xdid7sk0md6w40d5ezaa129br05kbgbq245j0refcr6tld7ij4abx625zv3xyvtdbgcjw38jdrnomsjxa5gn5a6n8b9rziug3axkzafqxp900365i6ytw77s9fy5di2lh81',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fhydeo2diovmtome69kg31xzur2bil1ohfhtue0gd1y260dfudpo1utiig6417nza3kkqxe5ftus2ur2ho9nqavs63s2hs7php134kuoxqzqx2rt9xkzsdklwasv5y14z685zfbh7iurvv4xhwfdosxnjg0digmi',
                responsibleUserAccountName: 'lkjnp7w8gpbv7rosb6jy',
                lastChangeUserAccount: 'd165emx05is9rmhjjoh3',
                lastChangedAt: '2020-11-04 02:05:28',
                riInterfaceName: 'uy8tcnzki3rezbqr7u3wj4e4ddixeugv2xo1tlqwtr4e843lae2rabc66mzcvbh1ckf366m6u84ukpv8yblrctnevfz5s11rzrot7hhq6lwjb8pimiwvage7lesnhis1n29k1a7kgf2hh17b79wtp7xumogw6wmt',
                riInterfaceNamespace: '483flyozbsqxw2yt6eceedduq5pkvv1hkgsiyca0zcwum8h0llcyc0q66yuhxzgnxmlznox0bojqlm82u804zscvpfj3z7cnej9s03k6a8og4kfz3d3s5iwq9mvxdkvyxsrwmuw6ygrqimsk43zv6qta40wufvzm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'p0umngurx7l05hnakkvtu0p0wi3m8vcxb3jmdvpyzfy26243sx',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '3pzxsvkjp9t2apefybyw',
                party: '52hswivgbfilj40bpog84ydl6eqlz0hypn4mlr3wgz7olcvbem7gr8tx1vahc6wu5r8rkyorm7scnmgrrpmou7j5j51t37r0l2rhd9htjuxqmfboukr6twyymyune14q42vz3442rs9swchxom8ijl97ak69yl1d',
                component: 'xqmemjrg3eia6d44oznumi446u9ceptoh340kpu4gegwzhn68a7cpor4luod4atjoblhg9sp6tb0zmftozar2v3bq77xuoghjqofriqzso0oq7xv6x0k0tcu98lpvvztmnnb7xp7jkb5a2xf4hsooojz67mp8o8u',
                name: 'qutgnpg5umau2ugrxrew9ib4cjqx23jtzohfdt28yid8v9hclvtom8riopgkd1evsgm8ng2abgrfd7ksht4puktn1nb2fs1abpkmoa9hnus086unbbdms2qosbsgd0r1hju7vt4nusew9gvowprdvas9v8jqof2z',
                flowHash: '425wcf83vjnano1fd0i4sd89rii5kxvd599fk4o4',
                flowParty: '6ovefzcxniwfxcc5s36q7icivfqxez9jkdj1awo9rpj9qrnvg080kzzy63ayzgz3si4a8njt5dr1etjb4lkpn0kts0xsr9twfvj81smn5hgzxjrpdzq4zbbtbnxkttq5381s95mj98phjplgqfg1ewwqtzdbmo3a',
                flowReceiverParty: '6kkxw2glqizbtjvdu88ddjie0m6xscvadi6jcvuddpf41esg1qbaaqmolgvxbvdzhqn8yf9jydjaajpafs5f83xifrswyiyred3fib4x2ia5u9qu1vo3eptn8r6j9lz2x50j6afxmgs8xxxhkqfv7bvs035dqn4x',
                flowComponent: 'fd8yrnuscawcc9qc517ozmghmmx699kkysdwqivfpu8wukp3dqn9dp8jnu32rbr8l9vlud2vrvu1y2mf15m2ocw6pl7i6kluzdnb6qvgfu8ppm7kb7m6soxgxqn31hnx1wuhm35q38emb7s0tecoergo495j0h5s',
                flowReceiverComponent: '55e422q6ta4isya064qb9pgy31oxrz0s1njbf85llgtfriyixrpidkowzwiabyn5lvwxixpxtkrsz6nq7gr2p2iupwyqc1l1jhawhb81plnlq77a8bsf3a39glb471f6tf2b3twghlv7oqiq6kl9qfcnnj000ggl',
                flowInterfaceName: 'qm2ytkkynw86xxxf6v5yc1hw9oxbywg97zxp62c7c7n0ku2m7cbyxwtxbjd3hd552b8ukwdxoyvpx8byef0k0nujgvn30qo796zzvbvr9ejus5h3xxs5isep8ragh4xwkz44laps3lqim8sbm4k3dolfxowjo34e',
                flowInterfaceNamespace: 'vwwd35ptsy68jjs22n0tgzjtjnf5syg4wxn5h58ohlc3oie260hhx735m454y4jyjng6ftj1gafbouwhrbw3va49ua7lalf8pggbh8hybkvku4x5f5rvas9zraf6fy7pyip1c2b12mhkrgni3c2nrreohdcmmnc1',
                version: 'kaumm8vr31f1v970fn5s',
                adapterType: '9h6oo5bsvhrpee6jze3cur43gl4tnnamzrnezrzkm7s5tl8sgu9lhiu90u2o',
                direction: 'RECEIVER',
                transportProtocol: 'rfhh48hp7692u8m8jjj1pzct042b188e3vgujd8hfq8bemt6d8iu1l6gmcc6',
                messageProtocol: 'od3f3up3i06zx2jnho3rhgmbk92s5oqq7tal057pk2dipv23o2zct2n7owdo',
                adapterEngineName: 'vfygk1aeikuxds4j645oe27qceafb3k2xwmqonxis4vhxxhwlqopfiousc0y4uw7yyfe8wwcvf3b3h0ux8mclhzo9xzxsf05bi9osa5g6vac3osj9fpthl5iqywif45orkgg4ylot7two2owinjatcoaub383rpe',
                url: 'rp7zlogc8tsbd4epwkh1pxxnxpu56ljzwfw73lqfj9c0suovzt6jahlawuoa0q3vtx5gviosff5ew9tmnzzzgsbod9ugkxljr1os80ncw6oqf383ltmeisjicuv862q95a5d1rrvnovv9po82kruiknx762nnkoawemdp9lj3z1ktbf6b4gqsiit4w7e8s4b5hrdjs9pnjygj8jomw92aju7x4nyo4plyv9tdsndyhtgvhfw5n74foy8eoa5d64x3bvlh6bee7nyd1v52pynv0pq00yxdiiw1wid9kg1e8i0ak73697eesasxkfj8l2b',
                username: 'kwvrlx0y0kt4oag6o9s4soj3jt8b59rj7xezamdb7gcvampyf9mjmfsaxemn',
                remoteHost: '54igdzpbz364j94mlilg1183b91r7j4z8optxv0oxtdcqexln7g7hv1zuxog10r949ithqlq3cbsew421mfm2w15ry7l61vqtql59zrg2jo6xg4xr3yonb9upeq55epall8i5gpf3mc6ztjx9emm4kwandsaejtv',
                remotePort: 2595335316,
                directory: 'nnlw88a2cks31d0ge2xx4l680d2vvpoo4ynm5ak59t3ucpitslyl9gp9qjhih68jahkrr2h6cck5xbzk9bb86f08lz069ttj97rj3kkfd5su4y1921i1p5os9jvx5zn9t4juvsvobk5ykrqyuxsz1j4fmhf46eo1t9e7t8nhmr9m2vfom35br7n9wzvnm61izz3au07poxc1ntht1a8ihltw9c2w1nscz236jwxe53ycq2vrt6ynx3n3fyw3bfjdo465ol2m4t7gv69n6q6gvafbfpn25cow2rwdoowr2wu7y38zjijthw9ub6a32jz3s0724l49pbwk3swnfwkriirux0ktgeavi5pnxmc75dulfdy7bq57xye1hf7ugkd9g9h2opksr5nmjxpzj36go0d9v1n8r5x8a8yelz43ser2rff171l9qglvic5kt4zdgimgj1sbupzaqqt939ey6vr53i7c8xck6m1a4wxwfhfle84ztx9mxv4zkcxztbc1w7b5d9h7wcwhaf5ewtwv4l8qteh7ghterycpyrj8x69qd6dge2x9i658edxikv1xl2ff7g6ka899fpc18d3ww2y4qclzvp7ghaoe1h2aroqhautwk613ppjghckxh4tgdvjadxqixpbvk0ms9wdig0usklh7e1huling76k5zqnulljnjpmont8aboi7l59iur4x2jvokp56epv6aer6guk280nuvrpscrz2ktqmb7whuajv2voy5pjyz94qqv6d7sx81tcb4pkl3jwtn6t7r57v1823sk8wbl5ukbtl6d75cndgxvcd1lx3teijgoqwsuvj6b1a9een2tqxojg4vfvbsqkycigmt7548tt0bero5iwl45nodlv0l8n65ctz6pd5n349zf218n3p9311a1qwaowv6pffa2vbh9tx3klry679q4anmg7hykrv2jqaqmfjexvmf7ilo1yl97i67mmw9v2kykr71fdq654lh8ixdlgwk2kq2ju2fw299sb6',
                fileSchema: '89rrrr2ew8mq9fgcoy4kkofqnkmtui83palbnw6asfvgl7bskjbj46px72cjv8e29s1vwslq5bix9pe60tpjphu08p8arsq4vbibmdvfuaqr8e6ve54bkir0i6iv3nv9b57v75u975lm46601q50ochj8jr6dmkkoo7lfe7yeovniqf85mduu6zw8b2kngs0wkdtxcifz70rscm9hcgvvepqzv7oisgrbqi80jro9br7ndz15aszkm51vet8hq3n4swoolmmojkthpc96h8dp4lidbz2g5s1zst1yjslrbk61n6ptj438x2gb93weet0kjfuoai9wljwldu7y3gfgikco9b6nqhxqkqp8jhs646ff9yv0hzimytwyk8jpdy7m0h0csvx461wp5fmkhqr25m99m3lh4fk6cuptwodp6e6y59jevhh2livde49r3hiv175u99jyc10x8l2mq6jsotqyf5z8lb1lqyuy9pwcjjvk8b3xswmfoiqiumvv5co3sicefpa2i1xzgwpld2xut0coafux7b3o8wcibs3qy2b0xapoix9aw9lbt8hi6frin3uppofwx2c6atnv165esn0vn8f93r15f3pyou99ehj3j7ilqemvzp4aww60vl4uveetgn2l4wbf164xfacudeqqjeedjk0ve6lhhhx7hcrx0p4tajxmb2eywxxzq9tgpnzvu18r3e91qco5ibtxpvuugyepo0pv0bexa6kiesuh9fu4viqvxp0f8pufp19vadb525ff5qagpeeprzo27t0m1cjcavk85cucnn9gsmew4d98b7adre81bgwzm0xsig54rwkmmipylacrgpxzz173pceyud6jou6bw8m74pjfa3tn22gpxnqwb0ywj43qt1s0t2xjr1oo5ucaj2b4ja33ok7vh7syawetlkfze89cm2550q50y9i8yfnnvna59nkzgseyuzomreip3zj5w1vj6vkmw1dn6s20soasr8fspkkpgxr3c5sqhrr7prb',
                proxyHost: 'wiv358enazh1uti8v9azw20tj41o3ukwk17ddrviwyormzlr7mteplccxymh',
                proxyPort: 5631565996,
                destination: '1xg67k8fyrru4k8ust5m0it9u1d2kredlygjziwjcfovli0k6h98jrn5guapipxwsv91zspz49ld0etjznumk6prz6e74oss3alaq3qr5a88kts620hux0rxrb6r14fazig1ub4a83cpaaegcp3jrdi2p1bo0arz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ikrfl53e5x3405sn1whnairllp95unpbn2s7siyjnl56gf8mzpom9qvqus1zng9uw3uk3pwxhmetr7hb4zjwu5wop1tcad6cgruun6lql56u60knb91kqy11dwo0vcujuf822comi4furasda08320m63u8ko7wy',
                responsibleUserAccountName: 'v625b10fz9zstamk9283',
                lastChangeUserAccount: '7u5zjwi938jnn8nyqvnx',
                lastChangedAt: '2020-11-04 05:48:42',
                riInterfaceName: 'p2bui4jwurupzw1xanfw3rqynjs0zbhzaq5vdnqiigxj34uw4fefo0th3ym421ug1az4use3i89hjud0nujwonmzfzxrr8htjjs9u2lvrzsdtx7hn2a764t0c24wqkpz68plghpqhrczena6jfxya1qbvejrnil6',
                riInterfaceNamespace: '9iozzsevowxzgy9ox64z81zapq5vxoo66iq4czrxkgkcfng65memnr1sxx82d7549f8860cx33yx6ljulosyg7ki7j951l6p457lg7ti9cf0z5hc8no1g8zue6zutltvm9nrwdti0vka66fp8pxfxcqglmegf7ff',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'bk4oei8se97g6rtpz49b3d1ecy1rrcc8mfy3l0kz',
                tenantId: null,
                tenantCode: 'qbtdx6omj605n0tvbv0iydkx3wog64on1er5w12fi2djdilp09',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '2rj5qgxmn98xygq7uf3x',
                party: 'lwwxtfniago25e9ppjmbzpwilx1x8tyoykgwoe1iv3fxx9pjjij2859w7c14cyo7izj1e3zo4oq4cplpv0srsmwtsf8fqy555q397a8k21zt154qheplsbwjmdqntg9iqu9wd8w3joy6zbmy30jzo34nl8xkhvwk',
                component: 'wj2epuaij40rpw008m1n3vlli999dtxztjte7wixmp1i1n0zzzuh2s7l0mvmynwwlkg75d8vt6pb2l51j0od2w6d67pdh1fo645xypqsn0l06up5m6n4eckh1jb2yzna9yqat9oh7jm9fykhbug0xwa00hjoa7z2',
                name: 'bnp2or6vin4sjkk1ftuxf2psg736epx2h1qvi4ty6g9jdt6mmn3k5mghsqiz4wc6r967qb7o5idcl2cp7p9x8b5a16hgjyvw24ft4jogylrjo5u8zbic9b9svhwal13cmbjbonoa40js3t7my86i1p795tur5nbl',
                flowHash: '1xozchiumqr8hviz4digmqb0q0l15xnysghp0ifo',
                flowParty: '21lnjj308d0lzio68spgzg7indo9sp7jwcyx1h8t56jumijlhqxdafy8dm8j8uqq3a701d317yasmiz6omk6gcb34yvc4k0tveckfr0wk20xl6r1zx1e2nvptwcdexo8xhza7g1n1poi0cufia5t90y6fjm2fncy',
                flowReceiverParty: 'gn2st93u10qigp4kajfhej4s7x4qzq5ap33un2msrwr6iqldboeozx6mb9kda7r733mr4taxe6bom0py5chwo6hx6w0z144iethlokrsneupkfj8flub2d56zkt518mqtgscw1k0y9s6e2nbx3du8w2ezlam432u',
                flowComponent: 'lyxacdps8iz2lpvy8bi7b1f19eo2xqnaf0jg7fpxagc7ffkhh6polcfp93tnuqongqx2vh5ilcqrgj4iwee10pehkfsukzv5opv36z8kry9ms9xa6jb6qrsk3cku6aujvdfg6lpj2454dydlb8ikfkpfw1falsmu',
                flowReceiverComponent: 'mt6cvv1iuhb9fq5vqd45w9lcwsezbce8efpi1rm8rv0e2nu82v4km6ar15i4x2tpq9piuednj0i5do87tf3q63a497fzrfb1fh54g51p11427cqnjz3qe7xqcgygcj9rbryhvyo8throqt8ky3153xm32hf9rpk5',
                flowInterfaceName: '0hpvxtd8hlvos2p3e7qz5qm7vktpvllu4qas24jqqyutud5hbv6qpwcae2vv6eu11tttolz1n42e178dskqpdzydidk666wie71s6jxsvpvtbmec0tv6qzpyy22tjquae7t6yuwu3l029b56ebjuakagvb1bb8c7',
                flowInterfaceNamespace: '39c7y2v0txahv0v0o3j3xlv32itxoetu68tck191zdxg4vse50pdkk1lq0zdrly5yhnxtzvtk1fd8w4dqaicy0ydscj00xrq16mcfxmxvo60ozv9s506j20dkt5g5t5ho17zxik18idow58n6epqt8qd2hrsyf4f',
                version: 'nciaku09l9hffjc3lsqv',
                adapterType: 'emsyeq7wnyypc7d2uds0cytgc6k2n0tj000k59f63swdzotaxwb9ur1j5rig',
                direction: 'RECEIVER',
                transportProtocol: 'ys1462nlle8yq63avqlw3ey2wj0pnjdxk6r8xn3ptplmky4o1covdzxzc73y',
                messageProtocol: 'sdaesdc1ih3volabz8cy4wn8ubdxt9xcu44vpijbz50kvfqpvefjbzw1p2tt',
                adapterEngineName: 'jhscug57y19pun2mxpgvmdgls0jowpqitwgya02sxjwn8z5jvdxwd081777im8agrx92sc2dwdhkz8dbt7tc892laiui942tgl7yvmo32gqitvp62g4p7swwp1golbafb9eh9dqseraf1769kjjvihjkst55py2f',
                url: '5yayleon912y5zwiqpkfqsk5iv9vweuvknu4pjm3t33xaums9ak70erub7q66rlbbhqgytpefgk6v3v2uprtl5db77oxvhz4vbibxfdnana7ucq3b2blf96r17vy0b2msnf1nglctescizsgjs3fco1b00pgltbqwjpgnwkt79v5bfxv9mzgqqd0yjyu1vxm2z67mqy4ic4g074nmt4vqxglo0juc428mb44n1bftdhr652ak82k6u7sqajgcuh75pel2qy1c576he4fjtyduuxew4s45g13qohpjq0bsxkquaaly8coo2u9iqtvkklz',
                username: '36fdp4bq7gtlwrlb2znne65w0av90rhbkm1gfhrsnvvc28ct2px12gcrq2u6',
                remoteHost: '6dcn6xhc9jetteasb7us4hq02vxsbpyk31c5sf5ubr08yfrqi32asax6h6c52vhrye22wwiahghinh39csze499vdfalewtapc7w2gtwuebkkamhz15wpao04g05n1ty87vuqllqa8u6qlyowwjdt4h63rru4bxp',
                remotePort: 3948402125,
                directory: 'phzfb6g7dz6ykgg8200uvha3wb2hq9f8dk45uo8a27ax5ohd22ol6w2cszg7batif8ud7rl8wkuancwwp7xg8tr9exobv2wee3hkvwp1wz1fodirrg9cy6w4rillmw9dp2462sg0vh2rlw9q3q9hq87btdc8hnr4eu5768ou43nyuq7gi2x66ch7gue60hgchck6xai5454pmwf1kt42okadss1m3g8f86qok6r6o7seg9vqepvqxfvk851q8mjxqdjv7p2lq9khxucoo85bmoy1zekk2iwzoyuj6303y830u1qspynaep6djor10sldm56ou551omvklbdtgdnl8comuvn3o4fgw7zglvdky6ofinpatftyuxoagfmyu0f36x665h9bdhhjsbmxqg7sh4dtoibhg227913z44m8oiigi15gvq4z72njadsl6nkubn84r7q892he5nju5r3vn22lemoydqi8vg8qky6qkgg0s2gmojf0buam5r1oermt6rfjl59h2e7g3jrs5zfvsb6sqj4o2gly0bdit6bkr6tx6ydejaivgsaaoucgp1yaceex0i7dcebk7arklfqa0w1fqsvoq5i9w7b46t1d5k06c6ebrovttkqvzv9yo7b16jzynh2adz5r0ysd3g5j0mtsbhadgfazoece9s2bl2f895t6lu2tdqjpy5oxlrwu890l5v6q4jxzk3e8mo0sy4b9fgra7pshuiyxchgb4g0ess8wot8uke18vgzwz1nd0fa8xqriekwxhx57zlxrkz15l435tblsgcbjee8ift3ngek2z8w0vywpq8t9t31wu3j8upj03ba63qt5ug1l494gj230jgrqghy3lsnlv157yczmd5r3n8yfes7pfcu5mukm5h858b1rey0oohdafld8adhbizg21wqkye2gjp19w2fr7vsj8vy6ewjb2yqnqx92xv9tlr2g2pogdtpe06n99kdl1ttjo40nwh024qlhpm1v9apfls14rgn897u5',
                fileSchema: '2qws9t6q7oxx675uge6kyp2b9chypp27dyuxfoiler4f7ywf7sod52xffg5z5zn9ajsq0bvxc7m66fa2zy8nz3hbaw4cliyxd29qa4o9xd8yl5wdprdypil0h3akvupxkhilymf3chrk0p4wqy9dx0lg15yse26davbazsqxax0s1hswagineq2ttx6rynaby9ze3gt5i0mdlz645mzau5hxzh8llyz06a81mp2xf1kgbr8er6c1tksgt5b6cnasgu2dwi3zefcyn3zg4yfm4z1vxmg9nnd82asb6jdde8e1vzisujza16cl5ra85lwys32rcjxm7nif4u0zlpn6zx7cqvphzhrmcs7hradgq32185lrkurayqsy3l6v9zjlwm7m1tn9y7r2gn2n9etho5ohgdouhmbr0zgzihzlgcb9t9earbkq3x8023ej0jg6nn0ytkevmfl5gk1myf436de32d1304krang4lepgueqbvv8e1ornziwoxwy83rzywisne50tnfvdffs2w42el2zs3ozj6899f4am0m3v60ikco8q9d3p4oklitq6f04igbvrf2mzf4w7ll2silrpecierrigl8rm01dlw63fpr4yyt6fwem7fhk3w78ouduaywzrav01r2jjo8cnd00j8d5e7epdqzr1n3qubri4w5fbqo0u7ogxqdakpqcz1iige450m9ljwjevptmvckd0nlhcgvnc76tk7nudcso3ctvmki7kl656fbv3g87da2hlol12xjikfpqpt8gimm41ftav8x0kwvfgsxatb5q9gjikywvnt7cdercierff8idyf4b5iu3zjtq8d1n0d4biu4v4zt0pksrhar5klxgte3hwpf6oaz0m01qoltdzb0ga8vzyeyrkgic93o17zwwuo5r2kcpq8rpf3cagkya7yyelwlcaagbmkd46s870xhonmwsp8aniw43a1jq9m0xg6dqhgirbqo6xldsfbkh52chqk8sl9jg2i3gbsj0c0pl4',
                proxyHost: 'cf2sgmwuynv5q9071759chbiq31o6s8n233o4gkqrrdd4vj88ert9sir602o',
                proxyPort: 2099739280,
                destination: 'wfa3ivrwcbs9251k69y0408e96r5oay1hcp71hos4ljzcxcjpbnjy4o2dm8hwj0ra2arilrys9jer1een8h3tmaxss59f2ufoq2c1v8wp8j89tvn3m8vdygelsy9vvz4ax27z5thmdgh0o2za7th8v5qh8hamfgl',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '31flguk3l99evb3qjrcac3309grd9s838iytp04hsuxm8fksjb3g7yzlux0j78qdxy2b43c0u5fquhoab9kiqj5merjkj8fwetdxb86er654cf2lrgd0ki5grpzowuvif6n7kz8gmuv02lou0zqjv2kf01bqjnze',
                responsibleUserAccountName: 'husdq13nhkmxlzvmsenh',
                lastChangeUserAccount: 'u8zi28nh2xhnxaj13g4n',
                lastChangedAt: '2020-11-03 23:32:49',
                riInterfaceName: '3vh1ydxmfhby7i6oygdctb0iet3re4diagkyvb9x9vbls64stnc4xorxapuu6zt86dl0vxeds68yu3lae7cxii32qp9a9cmm676me2nhdvsc8a2nf4fzbrkkakqpxg8r1gs1ttu24rl0e2p2onyak1s8n4c0dems',
                riInterfaceNamespace: 'pq1p8hxs5m611u1793tpo6e1cl1qgmo43krezovhbt6t6u6zb7i45wvcytuh1efs1jzfoswtqxy998fpbuq3guujkgqqtn6yot863hcchlk5lgv878g38gfl7xznl17rtvbwf21ltmdprs3iehdsln0nnhmom4iy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'bf1kuq5bpizwnlfddfilxipm9glei51bsijpczb2',
                
                tenantCode: 'zqjvj70k0be8q5zn3lp91z5e9tketl1s3j2yxs1oj4gteg6tl3',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'vn9km81drkt1fka0evz5',
                party: 'gl6czxfu187f0z25zjbyxxm3hbgitcmbq6vk3eaihooggmcsdlampte8vm8fd1y8qn6z9fxi7dkr3eii5c7jpcpdy9mxcdffhcg954j6tbhrbyghfeugg2k3hokiu3rdcea87wtccb3ski96tnpafecn3odlgstv',
                component: 'i0d0x5bno6ihz55wgh7qocbmk2t77rirydoofcex2lsy3y4ot7b2o0nyw2ry0exlnfn6tahekj8k3234xhoyrpx9ywxbvij9hfxp0oaw8yux02hfi04nr5u3pgaqrkavzxqncynasmbnk0o4leb84402t79256y5',
                name: '7wuyrud96o9v8xk0munvphj36w2bgrww5usqgv787j3ac0aff3pn1p3leiggchub9z4sh8fso80t0891596vvi6b66qpyfy051ymbc473kda17k0fcbbzrygwe4jrezsu778l7j5b9i5tkmjk8oyn6xuwxvg3m7s',
                flowHash: '66c5gbir5sw67gl9uciut1hqqopjylv53tcryrhu',
                flowParty: '6ij693dd8w0rcqkpdydnotnm4mqfxbxrpfz6zu30wwqgjdqkqe3go7f6ahjjvixx07wr3lgiy6jgqi3lzzr2l5tewzfzsxyjzu8l0fo87xxlb8vv8xk8g9wtk029mao8iyu9bnesafjn5sceqlhtduio3gcfu5sk',
                flowReceiverParty: 'nscf2f2fjbq7f45w29teby0xx0kod3g5a9r9499x3az5olc29mdhqivs5vm8iwrdwas6ytcb0v5lw3u67y3f6h4epy5gqvw4zsytibkq07d12agooyn65rj8e0f3zqvx26h5jp0o5kbp32boek8hulb1n11mxtlv',
                flowComponent: 'cco3qv709zrj7ahl3hftxfk2jy9ufcb8f9g5m47e9fqj9i7wwf0uh1r3tjo87tvct62whw6ow8btf20bpfrrjclukrjzdrgy6jju0h44apte3x75cdmpl2fdcdmg7005877pjkieugppzcyrvmadxg11rx9959eg',
                flowReceiverComponent: 's2tnrhuocg1prsl32xpwxpwsp3ejj8tcbm1lu9lebufwtwxdnuc9apahqb8lz6mh2epoc95spolnoqp7k0rk8wm3zdx87vv39aopc5jxojf3p7aadhkwgtpfc3hxlbdrfxa4pr4kilooith1mjclujas8j4ucis2',
                flowInterfaceName: '35h82lr6yue5x8qso0irf03je3fsy425y2ogj0ea4vtj98fyslxvzlwbwuoh5dbvph8eb67ckfwlarkjbbdn34cmch15hoyutdbqwrs2y4td3ozvlu3sbhjxomszuxes9r15zdts6hjwq7d4dceszhpty77oxuv6',
                flowInterfaceNamespace: 'uv90ua2qd4x9juwnforbsu50ujxwgprxotaf2e9dnmhgg574h76d3kqxuk6hsphxo813n1yn1blnc97eip984y8bmirwugyrhv9dfn7r0eni63w5rggp3zl88xgco44oxv0hm6b6x8a9ynw391ajau2fhqgzpvmq',
                version: 'e6bi58bjubys7avvouiq',
                adapterType: 'eeoea8smshqi1gizcot6ku9gg0crs0358e9ymvj5xa71b9tf63tu69fuk2it',
                direction: 'RECEIVER',
                transportProtocol: 'cugkmzm5os1oyiw8su3dca5owv8jfhvxz7gsdqwt32u744n8742c3su0zrur',
                messageProtocol: 'ml0jgqk03nce7639rho1i9bf19dsrthauip9vczv4i2tevwrh48wg5i07wme',
                adapterEngineName: 'e6wuq9cdqorplb9q40nstq5kf2zmdxb8bbbr2ejmluask2q1my3nsb6ad41ej9ckfovswmu3cbqzgczueet0tdld9y25bcjmlzuqu9g0mh4koanemf36vmyfuk8qqosh0kxnv2bpmesojrsizg08jt6y9h6nrekn',
                url: 'g1ltdsud7ty0rft1yenqnt3kzh7zxmy0r68r0cub943rk6tk4yjee8pqvdgukf4jgupcf8smf86lgahoe8m3gw5sxb0fu0tent1d5cjknhrog1czzk042kkf77d1hn64qu6ljd45dqwi0wl96zweefyq42axs0265k5ofux6tmum1hq0ci7p8l5ctl06ewf5gh74217cjbb645wztx4o3o4zkqcuvg44py6h3rdumh1pnzyjjn7yji7u20jfz3qyscztxuzsti1le8mefs6rpt95eu32mhk4fnsvdund4gucqfps7hdomiz3pzofnglq',
                username: 'ghjxuvh61tlcno2f9kw9f10hrrg63fn53pag2jq5asgu2o0d0638ios2rs05',
                remoteHost: '4gcwrc7mkem5cgkaa0g1d57uu7e5x9z5bci5idpw0vv3tehaeggqo53zjv0fw86wn1nlds6xtotd2r3y4exfaduqmhi2zai0557oowzlb9ptr3j6j6fmfuewi486jmp466503d60mzbrx5jkqxqwp0g74gzy8yvv',
                remotePort: 4761749971,
                directory: 'k3b9l0t31x3m1l5grgpyhupfh1kehahvhraregrk4n08jkqackgbxxvaxjh1c9f103j6nodyblbn3k7a3efr81nkdtz52iqbxq7ldf9fs71htlexkp7m67x6lm5aytsnmpnts998twb6fc2ihpmjdfyzqc7frmbc1s21bizhdwhhtx4a6mbum7sk2faddol1edwiymqp665hu3czmsosy3lsbad3pw8h49o253jh0cnok1ywfntxzxohecacvhpuljd24wbmjlnpzqcop0ynpi1t3ebf7hr292fs9rjtlqq412qe81rumu1gkunk74jixbqy3dnfsb8w10fboqx44mylltwf39m6z4zulmipeun55cdcx2vxxcjn5n7eauazwjhxers96yn7d5w9in3wc3v1rrjuyrco94i61uv66nxhw6y60ywcisq3c7lfxl2gdykblovq927sqw3bh2801ucip3n77nj8plv5crvk43fz7c6pqyb3spnvj3w6n6l6kiudzakfe9wp0mc1glrioe9046x085a22yecyvkr4ps6wcaxiruahccmay4m65b9prhpldu06oeg3dsv2oeryipipcmh0tz8b1nqbzaxys5slrxx5316kuzahhut905n231k8680ko51x5rthnug26imngcqi7pkmho3xqb62ob5d7atsk5c9flcwkhdgxkfc1ypm43nhjagggefu0y7fm5ghnjjul68bjd1jpjk59966i68eej2wj76jn7ct9hkzms6fjba0y2dfw1ygqmko7nw2xizpf7xh28u3i0er61tzhys7ggl3e61l1j12k6t85nz9ej3brh1owrzy4gh33xht3idm4214zlrgac6c77puxjxz4bple9fi1n5qdg9ir0qf4h25yzzbnl22xtwememj6acca7x1r8aqihxo6akeia0ruj0aao3ed0jvwmzwxvn5e9a9i9favd7pvaswjwuij9oqdranilejaxwuz4qfvurhj1mp7hloznws5pz',
                fileSchema: 'ljvrxmpp311bsgdrs9fuejnbch6bd9n4f1yecaqtshbed0h32tvuwcjcguit3d7huafvkj42fp5nmzaibs5q6mpi1s0om6s3luzj88cmwwn1k2o6cnzpv0m94s6m8b8ktlza6a277xxddi05k00xzp4841ikxm2fcc4dawnudr1a0x2a4cbdk593a6y663vvf41kkp8urgq1cl2sfeusrlhrin6xsw0mlzcmserytnbumeok9dst80y6aemwgnfelxe1buzkc3uhvogkq01hhcuzdidlcwb75cz1vr5ffijmnv9pf1juphfca7gixap83ae0w59v8bwtwlmtaa0n3zp2cxdx2zumzjegi03u2cxyiitjevuj5emkb9cju32qbr66v50a5nmr9837irs0lvn8sr4wqiyc9d1oppyzehipcachibvmjx7cswiafc60ygqdu36ndsc1sfmvd1mofk3zwe1v8qjowcuzqlib7r2c8njvkqxwkounlxf8tdrsdic0bl5umkpzf1tmvpt8rabpzdl8moptz87tmxdy9or7bcnzaush33tym8wxehjjje3ibotl3m7nm7w4sxiv7xde1xx3jvzx4ba6lxcgnrcxasmwk1fx10wrxw05uqygfdg0q5hhdx2jx6aroiwb6byrcfpb9xtzflbttgtub5a4mxqvufb42yvz2jmdqtza44nopc7dv7jnk2pq3jawjxi0o77x0g61lntxkxe6uzp8y4mq3j0k02m42b2ttpl37dxq8cvtoh7pckxs06ss4ehct0vkd8xlmw7m0v3dxrakzlzwauh63wyrfnaf3vwyzqgfbf0e5dkmcyw5milc6s29zyfg0w5oh5swd32snb2304sycfw90w9kp27kuwdi8gg0biz43go2g7sp3iqj10wg0sax4kjp083kynsh1y75mli7qobpwa6iob37uk28zeiy84p83ylvbs50x8vx8a7u1v1tw4jkl8iw45g8qvjpjv5wlcug2un0xj87zg29',
                proxyHost: 'oejeqj67x8kv30nwafgnpxa1bta1pi7yailoawcr54twudzsqf9uxf2jdut1',
                proxyPort: 1483490596,
                destination: '8plx0qanjye85zn99p5zqd9s4bsr2cuc1ch28l0no0pk85b7c6dxnb4vs9htsj9fk5qir6v8xzg5arsrzyi0vwy73repwlmudq2n2rh99d807kxrgdjxvq6atwnozvuxa1pchc9rl2rovvlrvqvofwm4xs5z0jmn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9hzwl8d9c5tbyzu65d8dpo2bgvsd4fx9qdudloa02gcpnih401wayau8oomixiqmred3eui7zcbrjguatlupyhnn1rluoqdq5ary4uennpxya56eb20o52pcg78yzht73vyr9qdcie8d5itdlwrd6tjqay7tvad7',
                responsibleUserAccountName: 'sgnc8wc9wjdtbk4yzms3',
                lastChangeUserAccount: 'ebijy35x5f604a2tgbbm',
                lastChangedAt: '2020-11-04 21:39:02',
                riInterfaceName: '6mq45ulhfop9asq2ar3mqxo61hcnzipxkkkubww3s61lvgvyhil7d6mhgui0notokwxds0gqbqwbl4bvjbz2yu8qubebn1d6wsfnf67rhcc3imhnjfut833yjajfgc9rvqj6u0x87v07hqk5xoatfuw29rb0f6jx',
                riInterfaceNamespace: '5rg2uwnzlwwpbk6q8afo834tsefdj9wmzkp07e9g8kbykofaxn9hxxewoboht1lws4nao4g83s4sojme1xq3hxdgmhjmhrqyeasocsqf35ryzv6cek2sdoqdmxg4p9qg7i4hoimlko32tokukfbpld91drpv55y0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '2v1bfi6tso1x0uw0kgsoe3r4hgak16d24d8ply2c',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: null,
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '03toxatnu842s96qguu1',
                party: 'vrnhb5m9g2hb1xgdcw796izex518bysfkwdvqf8qe4wy6etlqbda9j8icjs47bnb38iudi2xs7io4mh3apix17ams513ncjocvc8fb3stlaiym0zmhgm6f6et3w8v36lu9jzkgne3mo2hs0bkts5fdy11dxpz0cn',
                component: 'r07lns7yq93uezjjcnbnea1xk4zqkl9j768v2r7mrkzwha3oxp3x1jfoagjzk7xoouca6w6fp46ilcvwqin4ty9304amah90bh0dasrtdzm08rozcsjse8epytstkbsxgf1i5ommmnj187lvykl07jd0hmyv2jb9',
                name: 'frs0x73qpz97ay7swan8rgrfzlgly3p9sz80yr1kxgx57u8bsvhlcw57d023d02idano450qk2hh18lx7ekieey9jvtblyk8ub6b7pqro7s89c03ri81fpmpdy0vuesmfpwyi4rttis6e0c53ecieyqytn8j9plq',
                flowHash: '0lq8zrnmx4dqcp45pzvjc653mstda0mf505q20ev',
                flowParty: 'drum06rneeaqw93l50mpmbsjz68eezc44k5pfytf8r0v1rexipfgj7lh94g3ze4jvvcvijxc86eyxca8issgund0fii2l187401zzf70v78o767xqv6ranxidiv30bxvzk67xhh10w54xbtww9do8od7afz6pwbq',
                flowReceiverParty: 'x8xkuljk253pka265c23l2f6ljsa4ab6vh8hwb9h1dnpb2vs2nl08yctzb4knyb0skljok9qq6f8w9zy7b64dkl0455cxbt4hyyj5l7g143h8bc52g7dqbrgd3sii8j0oft9ejvk22zxojbfkqbspse1kncr4pj3',
                flowComponent: '1ag7dlqn4eta5u149nkfx2xt8ha9n31wxdln2petjhczun2vjbmu3ydfh8glz3gii27af69hrlmq59oh8qoird9p62usstsjhp0luykt07ogk0jwsqud4t9xm6kp5uuksrcq90mzoet4z4yy1qw4rt2sisc31fyx',
                flowReceiverComponent: '59jkx3qpbixxg19xcew6edcm1zxgpjme16bcugzam3wx81i2hf9e2oxhwigeojtbfv2hqgzlvmx3ewqd2of3d3vtvs2kf9fngktziyefa5jlicp3e0q2wixf5r52rto6eb78fpce6hxe1s1bmii475exrlr0q2vx',
                flowInterfaceName: 'ljyn0r4iobtg4zcuf4kv2jocft0evbin9m7vfur3f0yzqfxqmfhuurpb6x3ucwdn1fydasz5awrq2980v5o3tjlzixr7cmvlkym7v7f0np873lxx9unzumgkc68ymgx2deu0w4hezao03dx3wz3qgo5qknezjgr6',
                flowInterfaceNamespace: 'uslzrf1m2119wep2w8k97lcf43cntrheug4fwbxk2f9xxg13gzc6gnv8hzcwu1rqak6dbndzukfs6h1pf38tzarlf2eo3k6jyu26ywtmgxk9sjwccx25ogjmjl757o1xki7fe9wo4sw4sehzgknxqomh6xsw3zvr',
                version: '8dkhs3y9by3rmpkawnxc',
                adapterType: 'x1fkvrsv9un3s5r3779nm6yt1gegxmd6777k71n7303b4baker8btxjqrtx9',
                direction: 'SENDER',
                transportProtocol: '7rnkcys4i1i86jskr7dbj86yam0qto2ymvbc7leluh12p187m8uy7udq7r62',
                messageProtocol: 'zi5woph5xi6xs5oked5s7leu4miyv564io57cwlxwsad1etncvd8319ic99a',
                adapterEngineName: 'x3u234yeknddjvlfzecujo4w5wgpgvtv2f38fydq8rrc9tdhgzn5d1pnlp1014471ahskny62u49vm7fomzrpzsx226hbh4kkuroogmkcqe14r3wy1veudgf9vdtfr0i3wa1t9wqa9psad5s9d0w431jcun21pir',
                url: 'ffr7d8qqatbpxegnb8dj4sbihdtynivkr9mwzg0i8jfapndq5cvdguhe2vs3bp85ml9w37h1u7hrsgplvtvsa29jg9nulv4kyy7ouz3wy1i9bginlyibrshntruzl6fvst3onqwiwyzd805xpduof2dftlbbzaovy965iepvyi8bvoxhkl785xx5h5iwvdk8w3qjgsel3kf3d2gpebee76zl6uo8actsoozs1vxvs40azopddl3hlm6wg4luncdg596dhpyrr2qq21ssfparkd108dg9mfdjhssg93ilt0e0sznvfa07g5iloa4jhhdv',
                username: 'zwlqmibh9396cndqrjt9ui0fz51z4qya2etg27z3ax5a7btxgtf8reg7x76l',
                remoteHost: 'kedj92awsyr7pf8ee5415hb04rwpi5v38f97m628yz42vh92jwx7fkid8sqd702ooyk7b7nms7ja3fyrnctc93dpj4onx3frhjigucwwcd0p4sb2k6qel0yftdks6ddmvuj9ibzwh8w85i4dgdk1jpl8d1vetjzc',
                remotePort: 4253517880,
                directory: 'zmrrd65sdwcc4zhmghm71jmqukw3z6i6prw3pnrzrm9yvi845bie0q93fa9tu156fteungwioq74culyugy59kvr4e07j566mowcsc0pw54nnm8f75evq7x72i5u11vuyq9l0v9usdj35jv41gj95l6octoftbhk3bhp5lbzmu29gwwsxqjocv0aocv40z3tm12n0ur3qph9rri5wekkv0s7smy05mtytgs47csdjqerw6naqtb14nxv85fcffx2djsax1l6vx7sm285g15h3bd7rqhvwctgqm06o9jvryogdhnj4as4jr0cqtfdnmgdgwrrsgr1ut38smpv7o2uchk2rbg3sh7dw9ufkk9bpqs5ho1jvmzr4f32crq3mksj514l4udyposaz7ks7z4jfssq808axm2duy3hcip85bndoeq504a3y1xb4mr2jffi5jqjiecs3mifod4gz2xmpy0t24k1beahgbc5rh5ll7ilhozv9k7t5dqekadp9fmhot5k1ruzdsmrr5ghcmbupj1rg66mo54jnt65pg268meea3dybpkv0l6ji4v35dhsb6wfjev9lec1q00en3zn7a5r054f2ewax6orgukpgnbjauqr5q7bnerq71srtky4lggs83qh1mhs5ss70wd7wwcrcsf30iaaoyb7ugiss3eek7a1ky78vsc93ixn0vm0g5s2gwiesr1a9v9loeydtrdp7grpclyyegf2d2irvmroyh5ot2sz5o61z3vfbabfpmow0ejo8ld5vyx7f0wwsjp6wzgof1ob050yp1vmyo5d74625a7e51wmn7imsepkgkio3gv6grjt1fechkyinst4mwhootmecroaq37zbsbwxhg2cza1mri5xv4ip3n2q9v38d7g7gtqvzgaxsu886uo065uhosv6lr2k2nz6njnxponwv2f1p76ds7zagvcrmizd2w3xxm9dr0ikewsj1ng7045eswej1xfrfu7w2kp80d9p581xonru0v9avo9',
                fileSchema: '82c185otmhyzzd5m8029js4liupvzkatybsdjp0pfpivafbt5eckitcvdkj4pfl83v48y6t8gw2nmuea54jun5fo8uoq8s2mw95t99xg0fm3qk5y134f919571l9ymczssvo94c6uq8leweuccvtv5qxkccc74dpngperxrqj75wu4daas8i2p0j00c0c7gorj3ntwh2zh7fs8czz4cja4knbragaj71gnvexa2sa71sivyk36n3zejik72cp4mhecwc6jevabtfs405wudaw007ax4ltiuudheib7ouqgxdukwn6y1cica2bjpovxou952izw3ml22ehiwjoh45q0ai7wd7y0npflxxuxa2s8ltsi01p6eqtihigw9kl6r9tsx055qz88wu3rhmop4y6x2rhlpn7su6lrnjgur33ncneg3pjva9j5if9bnq4b2xrqh83i6v8ertsjebar6o0s3go2c63463ua63lgcokxj62g0o0z90yvdagpuzlp7jmmf8duyk0k138x16232a1ty7cm6zm12io9rcela7gsmsqj0rsosp63ffvrr8xxjrgzjj8henkpoo0wb6r2ad7cg6894xye1jpczsw1i5ijt5dt6b9gdyii1cffwp54z1gd91gotupmvwm77bbxw5b1updlqxljynm9sawpe08nemk3auu52u9ytm8xpa6vnzghlkssdd436nd51m5jd13jyunzn47xt3hdtqylv4n1mxt5ukae1uuejsx731katkbgsia51jcvxnnsk61a3nnldm1h33ouybv4w82srhq01wxegxcbo1hh6ehjkpulm29ms4da0doz05t3oj8zbyqkkdlp3b11jlygnei2ejz10lgkvn0pp2grreahiaq4250ghhb40vamp4596ls8j7fdrea3z82qdvsx2bjixdrr5u3kavd5gb4hp5ijsw8o5sbitwxvb27ye33tdy5bnbtk1pe1hpf4i4omh5mai5eovk51aiuw3bsf1hfszo9gq5',
                proxyHost: '1ycm1r01xs2894nostlfhw42vnwog9fdlpmxvhr6ac021s4mx8yys6xxvq11',
                proxyPort: 4074482607,
                destination: 'ioz4w32hu5zfo4fi839t7l4z7vutje0xo369h4gix38md81mzh1ehn0g6krbc32jsoipeofzoc9k45gfnmb7r1oc4y8rcp2loq05u6d4spj3survlpy5hrycoi7ane1csjv0k8mlkq167tw1g695pcwl394ojvt3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'op66k5991gx4xp3lzj2kd83210my9loxaofd82x0gc903lwzsoi1odap1dwy3ydzhsnww01xa6f4tt8waannbn9tzo9ekesw34tgbcbncqctlb3k79wgvtkvperzbci9ifiab348mlr9ohkt0n1f2pu5m0vs9a7h',
                responsibleUserAccountName: '6hjitjt3p8gz6a1gukn6',
                lastChangeUserAccount: '73t232nd8hehkjn1dk29',
                lastChangedAt: '2020-11-04 22:44:28',
                riInterfaceName: 'pwc6rx8xik5qvz1087sgkf36jaxsog5blno8rygmy2h9cdxieozy3qwkyyqqnznqbu5eb08lmvve605casw45munc4t3qeia43wpy2550zd3l43h76bmycpl99a0g3a4xq8poxmf4kro06g3fwqm64yo5ez83xjw',
                riInterfaceNamespace: 'w8fhirstdlyappq8drb4q7bidh10axyocq3ftjcw45d79jdd7oxul46hqgi7agv2n137237sc9yidu4uvm7uahetsrrmlnutfvo4w45zww71q3w0393511jidllag7bxwdobxotn6izezrblyi4czhdktmcz10ur',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'krauwoa0i6223plq80fwivhsr0t6o12v80k7jyt6',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'fiupyp70l16uc6rgvrva',
                party: '9e4fy5oyq63twnjdp6ppo503hxidy2l7trcgm5czw5r9lrdksjp30g4xgipcvvljlprxqaf6h05fzmz7jn6zwjdiu26ter7nl129tpqj6thaao1v46rl8gw0640zknwrj03qg59zdn2c4obylwx2nl4yl29qb37w',
                component: '8yti980gxlwgq4yzf2ae1l02toiv9hue0xkk6qbbdanw597uu0xgt287zam0ob5icew4v8ygz0i7i5i8v2ojz8fo536kl7lysbkpmulw7qd7ojgt5oa5tehlwr0nf5lejb0nj5b43yb3mik2v3durm1gbbiutbzv',
                name: 'pokssn0688fwbbex58b07oe4i584kby3ucv956246tuyij45zvdagchtdxgvtfipi904cunje9g4rj60kbxr8f4agbmcu3vbrztplgr43pd9s9wzjnlep3cng7phc18s46einrnh4ujnj5g99y7tnh17fu308n0m',
                flowHash: 'vtsjrcaymsx4jjkdgfu3l94f07zw7wczbe1l2gwx',
                flowParty: '9ciyk2dlbm6ok7d7ywhmqjgtirpul1nx5de4a0meld5efi7glzmk4cdjn0v20t1p1folauap565rwvjpjsbaxz23mfofsfm8v21zfd6knbg79xq1pjhx6uayyt6uc0xnjfielrew0jd778xj0pshn10csura3wwi',
                flowReceiverParty: 'rtfy8cbtb7alzspbqpg701zo66c5zrg91833z7ts6da51akd62weby53ss4ew9t2ku5dvr2sns3rd4d8dsrwxaalkgm5fiym55awmaqmys0xame6pfrkdfulrjt3bxyqf1sbbicx9drejh414rl150jeprafw7se',
                flowComponent: 'd2evfowdwzz9gyy9l4jfb6jlim3uuql8mwnjgdbznbzny76cn8bn576h1jk45q434s55m12ckvbbxz3a9nuphwpy5wlj9tbf9pu4jld8fgja81x2wuf26vwg19pi6xkcfp76cihj7db6khy51z9l0lrjwo5xpj7h',
                flowReceiverComponent: 'u6z1kt1oyu4ea64bpqxo79ttefc7hhocceqywurzcdur0jdain3ms2rzntopjv56d0damvuz5wsqfm2gbjh41x4sj6obuezobgirr8rvomysm222p4hjilzs0z1kvhi57s3vexkw3yd6e69hn6xmshn4bdeg99c6',
                flowInterfaceName: '8z8rvfbl3t23bci8efrhh9k7ffeaqphixh4v4k1nj0p4mmkgi7qc786zo1pzj2min6ekg7s4jvy8nkl6gzqtyl4haxqv5tezj4adrwc75saf51hetycu8gq06rzddw8bnw07js6qvv03hqc88kl6nn2n0sy83mpv',
                flowInterfaceNamespace: 'rr7d6yilnfhb3wl8ti7lxmv65qx317hnpnv5n1bavml98rqic4j9dhl8ar1ex9er5wpbw3wvk3nqzbugtnszqzj3nrnibkojcyx6yjjlnibv7ap8lmypmwgycjnp0sek8gsu0sr2kby83mkmo8dcf7kvd592uish',
                version: 'pf1k2cwknxx5h5y22xgz',
                adapterType: 'ki6517iq1rzeku30exgd20wp32otcbb73z9vvigf0ot4l83wflcy4jowzrx1',
                direction: 'SENDER',
                transportProtocol: 'v9cif0h7eqr6ylo4i1q80md63so44ii7t1vei1yg39yv3r2wt72e361rhafo',
                messageProtocol: 'ebti36qrner6fu44zybjjeg6k876rqce7ggjx14bwxa76prv49tuspqccpci',
                adapterEngineName: 'zf5ta6tyjv6xrsirzdvpq7gyfdz7zumv4vfu319ukmdpg9jfhi9pe1ar6etf1l1qog78yp8a5ad7nabqwb4g44bgt6qk07p2o0cfg5bzcfa7rw8w4dkri5ouco5bgm6rb49iseuzutjna5fmgysw6o0bq04yu3jh',
                url: '583pdkdsuz3jmsst7a9icfgc3sqkrndummg1ps03u3vcigiza5bek2nu8mhwwmt7k1jp9ity7qfuk5g3gm3bmoo92clw2n24xdgxj3ctqixqkxpp81dyiag25xvkzk5mx9y536nc9xhulntizd62vi6x7c8qe35lzdevhtt2ssk5uy6ejvf2okif00i6l3l9f59qw3ox9uyish9soiedmbfxmj9hwe7l327awtz5qqoyqgryhhew2e9jtls81wihf4fhv29081expmxjg58hue1p3sgangydbda18s1feg849a4m57es4t5uea0my2tw',
                username: 'dm0gm4mcb7ts0g79crv5ecg9679i8lcmdmaxek25kptms7395q59jk7881u0',
                remoteHost: '29cocbzzl2ufeuuh0aqmjaaaepyeogs1459ol3q78dzvwcsahd3mxnr9zygp3wd9gzvq0nbvmfkwsf6teygvhrdz3plidj1j00p71ethn9eb4v9z0d3bmyc93bugd4mewnmieedpmi5pxo3uzvan9j9bj3pq9e2f',
                remotePort: 6401679513,
                directory: 'aofiqp63s97snbfu9pmky7pkzrd7ll7gs2a95wg9ip9tg6yqnmzi2mr5tqbyvpn3do4f31v81ufhyimvxc44umwy84o5x8y2psgavoa07poh6k7n0x8xsxugds8qbeo41seeia2iahb5z3joyjj6p03ny1cdlum3gww6t0squ83q69jvahiogyc95u66fvsdrqgzvlc9eafzpv4j6fvkmhq45d4yq1n3iy89d16u6uo2g3g0c8oqobxqut3ouq3w4g60q8u1qx2o8h46dgz2uec9sf9dz64a6lf8bdhus43v4lg1npvo5z77lz8snhxtr9hois8i9olrfgpazz5plf0hjabjc1fmxk4vyhctzu9ij52eefkr3xgcanhaafc6i0j1d8xyw3g3gd7q9tur9ddcwbh00kqscbwwzall7qsqts0syt9aoacooo74nzq4g9yy7whcg0md282zyyu9qv9j8zkfp34mvhr3jfmqf6bxfwpki3hmn3gzureppfxsbtwpgzsovkh1k5ip130l5pjkvbmez4pprxqahv33ci92khanke6a5fbg40a4t8wlox098niiprfzbkb6ljnbzllffningd0bedgm784n2emghdhui8wxcn4dkiju75m4ko4fcvkd2rb65okr9lk5qe6w4v848tmgqqp44427wn8lufeutfh5vbv2fw7t9pks6knxbdssjx8z0l3rpnae9ktisgpjcpzcecm3pmgw6spa9c81dbzrezk2upyi88kuxix4ksfku7zzmw5w5bsbl1txkc247u4502qt0b5t0kwvz3ehl134v5zev9pru5ibynoor6xtq8z0w5svt8euif68srq80nlkiw75qwij15l65vrhb6o9uzq8gbv59s6kbu6cot74efxv9255xxoz1mnjsuck5hfhr68y1rc4ljk30wf85otieomr1cuz6db1fhmyiiwf5e64c4i6lrnogiqzopdxny3cdhdojuk46ota67lw3v62oqecyoh2wmw8',
                fileSchema: 'quoy0ptym53fq3vusgqbv56516gg5bjt5ujbov51f4vmp4i006nc7h6v4vjhpu75u6lo1u4kb5qrl5q66ri8g1at51a6b60mqr6hs7f3mrgo016vezhqr6vgyv31dagzata7rr6m2bd6kokjzsngzc9m2zizloyi96qxndskjxfjtejpl80qca8th3qgoafvzqb5wz7qozlygcpxf91lqt1tl048ayoza6i5k54x1oaylqt1ie7uts322q0ilq9fb5j7gt1y3plm21jr3ehzdowovz5lq3866etvma91fowtamlk38p9cp5mnn6nkau6noa0gdfwhe44mlpxqoih86hkbupf8ipnld4x2e66hxo5m2lo184vft65pt6zy8hmb5sx3md73shusmludg6mmmb19mg0u5npehhwpkk7gknql11sdtv8ar2jyekbwk58cijywv8aiuy3ynq966sb2k89lgnuxulqvne4untn8mv5w72t3y0p5cp9wba8x6u2nnycl7rcsq437nr7dx2bdwbof48e301li4ntc2abuwn1gq3ekgchlewkvpyovhbc7pl4a937hwanfg5xker8ubowepshjalc6jwknh68w14pf3hs37ku0fq4u5ffntm4c0k2gv5tpybbot05bzs07a7ajk4fl2m2wnyokc9ohl8ferkn8qy4zs5yja0474zqd65rx390grhqxubwj2v6him3qqveaw7r12rjgwjsb90d341d0kx1ucyo019zh500hjh32vbll7pbl4tnzw1g3j7z5imabelbhev2e7lqigvaakwos4pkflai5fjrezdywdzje0jq5q1ox26ttzz0urqisu2v4fax7tencg5q8le90gij574ehfbrmhfkqjonbscwmi3q8qtd70l24i2gewjh248buot0fjtbqf85u14c8g850p140gk3uu8kx4i2ffxqrmfv1o4gsd7pznccil9tckc9paa9ixdf9cis39qlhp57edtzh5866icyb9on',
                proxyHost: 'eysbshm2108qll13852fkx88qztwrtvpxzye1pb1dcyhpurfnsn75ds9xrer',
                proxyPort: 4020528173,
                destination: 'o99p0sql9tkcm0ewwm0tswz37f4hmq4y0j9xrdze9x9vrq1ayfr0jgei8cd0ssjcf16ggnm2bm1k3l6t1gmx26jxdhzxdq7tmohohxc2s6i57g7k4s3r7zcwkpcndxqvgle9ui03yvk2eij1gf32ou66su8zz6k8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7irpvlyokarr0l7s248hgu1flh3mfki8yiv2x5xdyvrbw8dzky1n3s6j7yhw6z7e9ehkzxrakitqrrfgiwnyvj4x8gn66sfzlvm5h3nosvyc731lhs2a4omme4e88qelu75p893hvpzzkdis4gllfwm009f5275q',
                responsibleUserAccountName: 't6g0brzchd9mbectxxft',
                lastChangeUserAccount: 'mgl5tjtpeakoks9z4df9',
                lastChangedAt: '2020-11-04 07:33:34',
                riInterfaceName: '0xww1g971w91prw7psig1qlu449haz5codnivx9z1l2rhktq6g45n8g37sm9ysk6e69apruu9245pebmaay9o7p8mx656gsccianvo18f9k7ppvj6mo7chyrjttlgznt2s7w01jl0rfbf9ics7evhh3opdpioz01',
                riInterfaceNamespace: '2983qwo3lnz5a3n8v1gic3hjnt4j5kzi9hs6dw2lz3pzuct6me00c1t2sd2u6nakishy2t37uum8dg2s75w2ftw8f3704bi9mf037yyscgje9bjddvd6ab8i2pho0trvnsolwb1y9g2m3uoba7m4s29xcfy0i7bt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'zzbozqh8r2gyzn4frxxa0et3gxkag4t4j1f5cxkk',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'uswqtijpes0tpl5ct1yv01qekig7nk1vgs45ognfg8qten94wp',
                systemId: null,
                systemName: 'jweaazzz4zmomhettpjt',
                party: 'mnrw7lk2tnkq6lfe4fza4hfbj7aehbcwmchcnw5sl8dgyjzhf90t5xxm8dqgepcnmhqb9jr5iyh417pbnxnplo66vokjr8fowhma0ctqf7or82gmnyubee5v7ztfiot5q90ml3elqdk809sqahhjcw0p1xoebltl',
                component: '1r94i8fzwzfg7rs7v73lc9cmrjf09vx9cftco5998o0tu2x65tkn9kyy1n9990kre2phliygvdzubzsqr3h2swr3vsyntpw7osbf2e1wlxuluwoongk7ihvy5sr48tpwdby4tup3agzfc73rr7i33i83phtxd9np',
                name: '90cunsy9tza0g3r562bs216m6ljm33gvy87vvij33sc7cxa9185bwe6igtpd1pr01q3lwhg4ytept90l4uwzvfx3v1jxp5x50en6exc1vvh4uuu1bm3y1bdln4l9cdf3wmkzf902ojxrtpc1bpi2z66lqhzb4123',
                flowHash: 'tq4idoqj9a5p9sadv8sz2x3xije21oi7nfwte989',
                flowParty: 'y4ad1nm80ik7p9a8kam3yrcmzuwxc0nkvbr7gnarl19qa03cn1oogr5gj0yg0nztbphx1zhgd53yaqu66y6ct3ky19nvi2406i5fwxuervfi540j3u4z0sflm8pxep1uv142yr7h4ou1g668gmrlttzp1h3oyh1e',
                flowReceiverParty: '3rdofxqdke3c3krrpdtjvswu8gq50cp3xa5fpfdqi3eom9wqtdmq1ex2o0t5dhjkoz81ji7knm40cw3eic4zfdmghmjm7d19dgtys8apgi8xrj1v6p7w6ox044wc8th5tn5ilnf87ef2z99o99jpi2s3l75mdz1v',
                flowComponent: 'inyspj1vndzyhblqy5gzyygom8xq8kfbmr6e1vhoht1stdml97x4x08rqxnw7uelig0f6avacwvvzrudarj7e1flmawmfpsgumrm5svoo89kra9zkkmqa3i2ak8tupvq29mb3hc2z1llsuwnbtobr6uf71xsr623',
                flowReceiverComponent: 'xn90cz4ka0zkzeo2sqoxos0qd8ucyira13edoxnnjlqi67f0o6c66kcl1m1sfb74fl7s73gli5thqw77aly4ppkaxp9kxq0hs6hyiigkamhyxxmjswrexi35eff5m5742ho2af3kk8x3uwejpydupjeuweg32dk6',
                flowInterfaceName: 'xswv62aqadai735h0hc8cz9m7zzcq23v12wo2h98r5v19rl2gj4d4xr6feeba034vd5prix00s2tmqcjuo50m3wrsi4kgxnk6mraehhb5u3gw73ff0d6wejpoojh5mhzpftphhkzdab1emmteety4bktg57q1jci',
                flowInterfaceNamespace: 'mz0pvgw1apte17rkg1znxm0pyn3tx0f9qvl9ldc5itmvpxw902erxtv1a9vide126bler9070ylk9dbozv5fnzgtpaflupgu23lvx1h5hyvangd6pv1o7gfokt1l64lrc1z8f7jq5zprtyo22pv5vq646ze1ba6h',
                version: 'q3q4a7ftr3t8h19riwyw',
                adapterType: 'j5c9cxl5609a5ds8q3a2dg3sdlh936hpypmr0jihds9975t2g0dl2g0ytj44',
                direction: 'RECEIVER',
                transportProtocol: 'ckoi73mn1wysm6zs3c6olkr37fwhrt8u47wzegt6tdeq86gliprshauumyzt',
                messageProtocol: 'dg8skjlqag15slsnhfebq78yasu648xb260dift4hf13tjo2wprx03mupbh9',
                adapterEngineName: '4inn8usb3av93ke221qveosm7lokfpdzfg6adn357uv74zpomd731b40lyudp9phkkp8wwvai8giz84d0yi3h64nakmolqchemckzk4y6tnlfi6l19o83fhoeyz1vu85ado3oswnk08c6eio4z71m9q6jr6fcnp6',
                url: 'ib0q544jlmg8q7edhja6ot6f82nnys49j3yf5bc05qv7vvvgapymz404z7lpv3svwauccnkvnkykuhumf12y2fu23wft4dvyl6lz73k8t14f0w4ftxoqf2y3u3b3kfjbyy2jodpyjlv2y5jhu7fdalers0tbtl2ds31fr3t57nvbaqb19z3g2vyc606kwuezbga1vgrcber9ajttm97x1trk3apby7gt25a2hehsuhldfp9t6tuwlw2vjez4l92ij2huuibz5nwplbpyxpo69nc8apq22wj71bo70i3nimayfi7s30yxjtnrtfvkhuh6',
                username: 'wubutvj87oft6aslboynmdjiyhrnjr0prsesdgwy0khhd14rj9hsw10ke8ej',
                remoteHost: 'd2ygw10cmmqrpq7zsvvmbpk3lfr06tty5k04t6rzymmpr6zzvo79cok83tbun90ekybgtie4r09x3b3k7bbnl012kag1r18lf52p3do8xox0pa9ci2j6pqxw3q9qftxkicihlmzf2ooymenk64fvx457z68y7zo3',
                remotePort: 6505803845,
                directory: 'm7y2bkv4d46x9960uvfxhhfuf9tiu23cq2tt2qd1svk0ksxcgbah4rhxc1wkmwtfvh84ll8xm7cyu4wl4ssiem2iynqyjkvjkf7hzw4irvy26tbhyqwdfazrb811qaapl318s0eo4hn8a67ix40d5rql6xl7xsnk7rv1jai5t2vkhvn2082j6d4idb8o1357xpqtva9csa5r15ezahuayvdg47tn8nthfdl3hzl3hw4qimo88fx7tlqi58x0aqh87t8u2cswp6myilt7b5uce0fqcrd8scxsuhjhwjnf96uhs8yod5gftdswwzw0wof2tnk0vfv4n3dciot2lgsj7018schol5vt70w23pic6con86ncjvfadz9r6ghb1ov9s39k2zy3mh4jrpo598jkoklmmr1s6ao2p2shwfukweud6qgg31744hh4pvb3ohjoya0xxaw709unu56jouxmr851k6joqc11pt7arnccm61n6axds7zg57lzlylpfmbqd4qati6z1i44nquxr4wvbx96nl48chx1wj3h4m4egfuape2bbcjk977d6lnh9unmbrtqd7bghgjr9fsvjaw258r64f3qva45ko1tbzgsmx9xqo3lemukh89w5c5uk7siqw2qduk35n9h113ra1j3rnjts5ax7q3zlem9c8a43472j2xzmmbhbzv0a76hj6fjh1qlvcmi578naqzv07zqeqeol7fn4d9sfum817o1gih2uzwhj9m26sij7ukijqe5tfne6o9eanl98klgcpnnj64dlistkzowcdp6y3w51yidqixg3p11h2kbmls9j1p4oiq01y6bvxaficcccm03g1lwzvainiaxlzvihgfw51k9eq8b01pn0nklxoss6yo0ljraufjy2g5xk549xgg2e6b0owm1qgqasdd9xfg1x9ld4w6ay105tw4gz3qfczxhw8i5subtih8p2z8cnevp0qafkw2lh4jdns3dwbxiepsf4q3e16lgnru53obhiig1',
                fileSchema: '3oe4hd43z1e77ase6vlmf6x6t00oxkdkpqhphbh1qxgunbe7gsx7h9unxxym2h42x14j92gsxpy4u7z8wxr2rs3igrga3xc8yv9emfc94h5b1y8ha0hxwhafw51weup2y31fgoajhh990noeupe254ih9z6eczoi76dab5s3ebxrrrd7y6dtr0gr6pln3shsdbp4tgqvz2m0s43xcaa7o4o1ava878egd4krqredvrlk9kpmzaxp1yd4uoqa834oblykbxfdwj2lod4lyjv0b2zzap0yw4uqpkla17arb37tinwebs9bihor0xu7tap97koj3wrh7gp1hq47rsv0z48f77k4qst5xgil1lzvt7ug6oeakkj5od0fzy7w4og1gntq2vrizx4ewqqag1szejt0srrcbz6t8mvb0cih7po6fkxp8roalvrv0qpoqxyq5x0kvszzggico5dv9g7jy2x6fsigdgjkemlfp6egcqgg5r8flfiaueejkom4s22rpk0h6b09eiukvxrgqdcskhhaya08abm5anped5jbi4vlbfmh6u8u346f8blyn4cho3gfd4smuny4hsbjsfi4thp5y5ailjusuzroo1tlhsth1fxqrcssk9jy3ul0xapm70sguimr3djn5gxcdiy8xkcaezum3w6puu1dauzzihu3ml4mq7w3gfiwftuzxkta9rd999ox6d4hzq8s47qunmbroqzyxcri9clpoqt4zw38y7k2vmjdxl0lq22opvvewv73e9x4zufnxdb78mitlai6deb0m55ji25sq8hoym3k5g21gby2vzuk8v9jz3xtlhdk4a4kebwiz32u0zlyrr9q6l50khysr6vsqubjpzb1vcegcvkqhb0a10w9rubranifhvxws7t2mz8hxwwtu6uonvmqwoejbkbg75uay7sx95ksuude1ms9f1a1po4e2ypf4acxc9gg18spxa7m4udpqkd9irif34g608x76n5sl55u6rkgdborgmchdmfv',
                proxyHost: '85v6hecdb3lo2x0hrt7xttawc1s4xo74xpholtz1381q9fkl5uu6k4kq5egk',
                proxyPort: 6462708324,
                destination: '868z3v8bpc0rqscuyusdo6wk262kk8crrobcvuz8pvqv4rzy3jgjt28bxx1t06s5xeggobxzuph34sa6to88fw2tef6arql70tlyhu5igfa3ipc4x11y0ne9ixto0j8nqve0oabxokg4ypbsavtl1jcb5oqpfk49',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xlgq9kuqrmv3eqcky7hvg6jucb7cygzc067gudhcmxuwatzbqj0zwc8yk4a1blwvqymvtkzeif7scdkje19bj333la0zlhp3ewfumwp64rtc1v98ykqxbuawmmxys5xjyyax41zke2l12543dvygzcjcw1upefpt',
                responsibleUserAccountName: 'v09q9vtafbfc7w76lmfb',
                lastChangeUserAccount: 'ourp6l6txipof2fufg4t',
                lastChangedAt: '2020-11-04 10:21:47',
                riInterfaceName: 'rlgykd1ym54r23ie6u3f3ghnk2ow5g40ytpl7y5fvil4gmhmou2h87zl1yui43t2rypg0gk7kd52920v2oblegwdlailud9coh4mayr6y210zhsjifbson7h30ey30dn00xskeur9nawt12e6pkdai1p3rs0mv22',
                riInterfaceNamespace: 'xvqbilbim5ehhx3bl1hje70ve4bv7ntv4zq5ku8y4o5n12hj71iqs7ae9hz619taavsj1f6tdcdrdzlb6zfaaj6e5odoc6xwtc0xsjkggv3qugajhasq9id0xw59asy6l72cskgzmpoo4msettyeb3lxt6t5baqj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '3j57b2yoqs9u3hv8ukbs6mb81wl1srlk8kecn8cx',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '6ky8kgmldv6acwi9rff7e1tptfr9zk9f1qnlkuf8xjissb66pf',
                
                systemName: '1dt5anlt2v2agg7z3gvs',
                party: 'c5akt8jftaebqusk8d24yncishk0au6eu8cft5v51ot22kkraey8qezuhw1961o3b6fxtgrzeua8umgrwuxqpux4c4hmn76irj3qt27ge2fe3xulnsd1yeb987mxqlngcefw3rr2f4jflox5pfsg285kud8s0xpj',
                component: 'nfszsw0qitnah4n1r5i4106z3j7th9wyt5fl18uocacj7t0ubju9jmsrw6v44r1mqjeczyifxz7auap65md7zzgnhivl6kksq0m3nlnqtehui3fm59i015f5943o6otswv6u5new6x1rqe42v3i5ie5e73a0rol9',
                name: '1lbqz6h7nnb9c2hq3h3xgxckri7e1brvo19as5uyk6q7mn0rqb0yocahqpl3embp2k5a7y2j0xvwjftvpiudbhlvkmitnusy5ftb28dv2wvj9h7ih884d001k0qr9l68debyhdwgjj8vvowwytn967ivkkl05r0e',
                flowHash: 'syphroevlka1bblsozna5xs5fa30q3ys6m47q2mb',
                flowParty: 'xq9y4ml0v6vx39bfqnqnylvvkefy15ij1pervprcracmgax8xi37prdpvaoyn267aegfba9pxopbeyxnwm747maip274jfo0q922vthesuvhjt7z7jg0ht7iwrqozqox9d01lsi7lhg2rq59fdbzbqtndhuj3bo8',
                flowReceiverParty: '7tebckx86k3b28d1057813wt0qh4cl6rau3e2vx4aprvs29bivv1sxz2q1kaotc25pl4gz3rv9zkzn9yu1a4kmr3cnhhq5kvfd2vg36ydpelix6vxzx1hl76cnpg9m2r298xfl3wrorsc1oe0lrxp6c0vccl66vq',
                flowComponent: 'cpuic4i0rc3m3r8z8ulzqn2dlpwhqz2u9h4lwmdsusy8iclqi615bdsqviaip6ww1g2zs8uehbycixkxn9i7s4acnoglojj9w5qwwpab40vat4mbzk57vb61jieo2gzjfw9aukgm05aj2n3hmaztrdssuwkdoebw',
                flowReceiverComponent: '0ma1vjbzr4q7pqeiftd5s3c746evauw8n5rmru16ykah7cpiqb2duvq520kpoka5vdurewm0sa1161rxe8viohf3xnchjnn1z15god0cx230ma2t8tkoium4bhza8hd00t904asips3ipdm4m8vve090tj69hfpk',
                flowInterfaceName: 'z68e483oe5dvxd3zvtmorqshfd8qrkpg2locmnszi5rnybh1rfk3cb23g3totnbkz9e8mpg3kgjvmxf6j24w3dg0i3dtuibjo3l68eqwhqe6u7u5i4u0vifoxoog6ptasvaqssu0oht2lnsvt5gv4pg9h9aso91x',
                flowInterfaceNamespace: 'jaxmuj99hcj44djyii7ajx7czc2rqvpwurq09w9oz1ugjf7h9i4crg79yydlg9ppqjggjdvbbwsz8vlwy38e5mwiyzeaishm5z9br87m9tbjs9wrbxgict36ov8dyeeih2mempv4d1qktvpiyeklsy69l18wrnvd',
                version: 'lxm7hyjkwzt3cil7agns',
                adapterType: '2xeyjxs4yl7k7tf2dyqeh1cyvdesiwoqcrj78u900qzrukg58jlxw0zy64xn',
                direction: 'SENDER',
                transportProtocol: '6g9ki199vzaspybamk1ii8dpntq4y15lzsgj3dd1ki5troqmg3yvr4hob8kk',
                messageProtocol: 'a7tmweghzhilmwaaqdigg0nc0uxt6xsra2k5jy25ugu5eikvciliz1768lid',
                adapterEngineName: 'f97sqqe5p95f2ma8arord7uevmq6ql84vip44pgv0jblgpios78s5vlp2kb80n2gw531m9ubtjiyefhu6uazn6lhfeihbycc6okyme0rz220ib0fihxiueo24enoxbvuetz4lg5apd5rbkve2vi9hmqsky4ka5p4',
                url: 'luj0tvquvbqybbpxjgyw64sttw46xfys0cxkjqyjmbqhii8brcvrrqzw3oq94tfnh2eu27u0fuyr6ambdj2z60z0rhzxrgo7vc03lj1q1u47pqq6lehxyjwodrft89hdyfjb6pqkbbtjwlncakeq6f4mmbkn8wyzzptfp1q8pkl7lmmcu4pb4900cb9rg5es5ngusvgoasfigz8suv39ewot7rppxpwhbl23end7gkytksdflqassbk43rc2ius5762dx20dved9ogwk0eu1gsx31mfphv2jn3gn6662x0n7vxllsgwhxqwdzobtoarc',
                username: '07enn060t9wljjjh6lovwyxetd9zh056qy0klmah2pw48nm75m7sbhhdzb3u',
                remoteHost: 'uvjnevmsrcww2m88rhl6b148lc31p1aakpy4c31k2ldoshbtz1vfdcx393llq1wm4za4usrg2ze74bna64h5akcktj8khr6hnlo4fmvd5eyxklc4vgcc51udyennl2zdfod7d4h3vz7ns4we51yhivd1uuf5rih5',
                remotePort: 6104834244,
                directory: '3nriufk2q4qagwc5ddwhyfylwrc54wggc6ii5htmpl11znqxaxw9e5rhnvksksddx08whex9pla110uathd9hc67z39vcqrlem7ugezf6474lydsbin2nyxqyu1u3k4bwrca00xksq0vlt1ppwis8p24qa366q0ur4gj8l8rmownid7835alc9isekji0leuyya0zcdnumy270palut4iria2d6soofhzmv7u7fnw3qak30zxqz5ngdr4q259psec5iioh1dytbj5vjft2of3y8fa2l5v2c4p9tphjfmkew2rapwn7zuj2zzce49a18dx822hgx85a4bx6i84r4vkfk6g4fzj3lxp7o90s74cozqb5af799epogccusvqnttjfw9l5whafbvb9lu1w1ffwhzdueo2fe6qn5gtrl2le7icii6ljmm40ofeuczfm486szto7iljav1s455hccvguu8elwzqnoy3n3fxa7ll1gp7o6h8qcghu2gr9stz3osidm2fgpk5sz1d2ia2eiqea7zicmrgq6s8ar1tvhv6m0fkf8t30ahpc7hgty6gpwb1wqsm0igt6aze0drc04vb55fykvmy4zav9l0g6kmo9rws8tqpvdw8y3wv9pxb1rp3lnwf73f7gk7nm30gjpkwh5jbrd5qe22bwuofv11grbpwcyibobtg9iadyi9j1jr9dbykxldjfxurryulh7npiw5zwrjvi6djqvo5nj3mgtyz09g5gajaab6bxsgxjl0only1rrnnb11o0itq6wm0rs6605cfpmja8ulfcrgrk8rac100sapty0l79gwdabcsk86y1ou6tiyb1p4wdt251kj4l7r2debgdgi2mkd0rrdjl7d8s55pwdb41lmy6hzk38xep3h2wvbmfziwlicj42u1y4ekmoxbynvvoqssg3wt8eef0yieqmzuryqk4faw8r74do1lqoozxceu4i3ut17ktactc51ctw9tzsv9zy0gmnph0zohclzg72a31xd',
                fileSchema: 'a6mf3qtx43fsr0zovv6988ch1b0w820nd0eq0v6bj68ohsxfxplkcrgpuxtd2ycee5z0gnjc7rts4tyfzxlca9kib8h3ujbp7ygog1thk1gckxulvcxm5hmgf50fdfu2vke2mk3jxtw8yyq4noet5iuahk41xtayejm7v13miin8jmyr3vqfo1cl90ee9q4sf2iyloqpgfcqu28082m54k3j19wex4i6j813ntcg19ekjhhn83etg78xltujzf290xvtyjd4cy93dlb6i0qonbva74i99nplctd0sosd2nd45xwxon0lswm0gp1q00j2l9c4e8wyct7i5g1apxycl1oe8ezhf4bn4ygd90buvmgpdrpyjg8ru31slav7g73jb88uxk2dpay9wvzbk67fnr9hyjoy18k9s5iewlvg4qdm9nysuojll9k9e0u0toedog2xcj8r3ohe0cat00c9nrkq2fu1b6w3uiomtmy23owgyfljcjbrtrdk3w8xh2kokgcntdt9conkevf5zywza8pbtnrglkqbugkticz30ydladers44z6jem5tmn265y4y2nuaumre1yj4p7mf3mnhp9vwbyyp2vwt5czci6dp3x4equuxvp2lnljpc8hem2gkaqtfp3izoc21s1t9jlyuu0pp8mz89k9gmnhpptu3cykcwn8fyjrqxb6mul0bsvc4rtqyfxwk3rm458r93x3np81fefkydang5r9qez3nmpkl20ckp35iqma2ynnhc26mab905ya14o61jqxwvstggutwh0z397bnbkyqfox0oa4svz240eotfw2vm5fgpkarcbgt2og48w93zs12pdsga542f8eldg45qcpwjx5sn06oklidq0y9a2fq2k35eiklr70014s74qmwobz221t88vpek28bwcowcgcmddqo09z9en6vf20etywz7bbp2oyo1ww011e0ye3i5pefkp2v6r5c4d35fccyz4u3cm17dn086sn74mg9cgbcxigjff',
                proxyHost: 'm37y3rqjgdqwkg5kkqa7jzytczvgre8lqsqd4sjpcqjif9ml7wn0fg91vopa',
                proxyPort: 8537260329,
                destination: 'jlhot00xigix1zdb30ogzvs1xop10lti35qortt0jk1dgm6vkomqo3n9akfue540epss0wwtv0trwosn4ftyby98cajnkmn9y47irdzi1rp1wdnfievia0gir8hzo15nynauy2fg6qqm430onnkr08o0b6r8j23p',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vimvyc60fpzughsw1wg4h4xrkkk2w9omwy3vvk5p9341pwlujphfxaaxea8gprkafmfk139van9iexbw2eun9hf5d9zoyruxomuo6a5vyvh2smw8xk4uyv69mwkz7ptoaxu0706p1m6l5pucry2xtbza43mtb30d',
                responsibleUserAccountName: '78qnx7ip2mxmr3cdg6wy',
                lastChangeUserAccount: 'besk5awnilc5npnxcp3v',
                lastChangedAt: '2020-11-04 07:42:20',
                riInterfaceName: 'qyrrkjt5mwxi6iiw3npiums0638pwvx5qj1q4pe62jeej0b0u3826zj36shcgbzrckt114y5t8wb447y3yfhbug8ajslrtbcfd4apibd2rybtbnqkg5zx7iu99by9zhbgnksh2m0uq8764feqfoaodrc4jb3rlyc',
                riInterfaceNamespace: 'mrii85fmv9fn0ln1ks5xkt3atncuxc04f4ivqcbic08lusoit0a2wpto016f2kt4z1fud6hu6l889nb38xo7a03uz4pm5okyns4vr8ga130szuz3k64pa7ed4aqciytl4qveoj9s1gy38e22gnxz27643ghrjrr4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'yjk8lckhjkmgagyv28202zh5hqfpztqxqw17n8mn',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '7y47vkfahxeqhjcmbvmfgiblcy11w6x6ptsjfno7f3vtnsnr1i',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: null,
                party: '84jujfqslf60vi6cdd1pbv2azwskge5gqrt4qozn0na6vcno4xm82shuf4iu76h7shlbxnrmpl1m96kbws96py4jjvp0s48cmzdgq02ajdpihyiei4vn8xwf55tdmw569ktgzwtfawkm4xc2onwkgr2g2t4qxgae',
                component: '12qz3sup65p9qdt6wjcf288cw78s82ans7fqwpm0asu848hvw3fsd1lurbfo0pfe9vfdckmi8ekelcwgd6xs792w0j50rti8zy5t4i0mofo9sh6s1pnvn731qlb5qoy325ezmk7igo7hovn34zz05d1cpvn9qxmi',
                name: 'rko1konwb3ui3anufr1eb4jbvzpnbbop7biwireysr1cql1qy61f2fslro2er8m34uxodsggokk2uucft27fls8scyooj95t1cgqbtwjp343puy35zngjkuvy6paxbindz8dnabi3ow0kt5yupg9xyyyc9j12isw',
                flowHash: 'kibwcvms77wrc3154f6y7ih9zwsrq6gkg4hisl9n',
                flowParty: 'ckei6e3v5v84mhx4smlzm53h23nz9tdh91uf1oqzr5cco7tlj3k5gee6wyx0h39zltxlicfcx5rcmkantgjszncy77z6370vnoevcbg8aobofsorejzokk7qyzxk6q56lab0cgkfxjpz99agsb7acsa04sr2770j',
                flowReceiverParty: 'iapmrwd42phddmxhjjm83kz4jote67cnh7f38kjbmsgcg2q6hu37n4ay7bkyy57nta2gmuyfmrltg2g902y42uqswpvnjflt980hwm3c5dckn6eiwtp73zut9w4hzflxkx8n3sez65wbpmh6ct454tju47kdknml',
                flowComponent: 'ishxupbqtd6leg716l33dsjwfghvs1vwacyu8epw0tyf7zm1z0ulfu9mdfjly7oq0z8uh1enqgtkb5z22dp7r1qymd4bvjgf81d0ct3lir9m5y9askm6nwqmpw4py0u857iq2jg3mr8ajn2ow9n7rsb5185ahuji',
                flowReceiverComponent: 'p2q3l0afzn8g1fdyo7flsnadaijragnifykxze0a6x5l0e84bllwx10xcatanxuhggfbn8xodh7z3ja6cv0txqbakeutty0wjmk1xupeuyofbhdjeynigjef9p1fp8hkm8i2dxb0vezukn5wui0dqnu9bm6fipta',
                flowInterfaceName: '2hgsokzxdbqun0zma0ps1oq52oyr367lv9lvrehkigu509li9o2jfpxifz1q23cngm9qz7i5sgp2cm3kyfeqonew9n5eza73v6qe5aliy05uqpynfsqkoclzol31f4w14kse29cj4p2be4ovttwu0hrym0dp74kx',
                flowInterfaceNamespace: 'yuc2mxjqss071cd4hcuo37f00vxcsnmx9lcb7wihxwhj180mpimhkqrnzuyr16bmlaip0c5ilco94oez2a9hrlp1dv92b5y4eiwv4jeraushrir0mxm5ya3qmlodbg55dergpzwxpyvlr1aaxf54n80y6luvwqzw',
                version: 'ydbxx42qyl51wslhaqu8',
                adapterType: '4cfhbc7t8g5blzulmcbbpymzt6fz6wvy4w1au9ruolkkjjre8e9vn29qu9zs',
                direction: 'RECEIVER',
                transportProtocol: 'n35e5olegvoqzisep5zdgrtfk210wxameyg3vr8y0p271bed1u7n7742znai',
                messageProtocol: 'mn6lx3fcejttdl6y8uufuprjirqkgtk6zpauzy9vhlap2jl1cgr8bewza8hs',
                adapterEngineName: 'pk69fu5pg2sdql13vgk90uuy9hmqrfkaxlrx8025b30qz3gbdno4jmlrtdo7ukyucxkjyqaoblnk841fnrlenmcokg4wzdlmjyyoczxwuxr5bho1hqoaar2dg2vem2lw7q2c01qbhessytozvs49vuj8xzg3glqv',
                url: 'rz4n67wuc4ittmcnr5p1tj0tsvqeh9s9lrkvp4dfb7b8wgentv5227wb5hcb9d44snuppqg1ou1i10rrum3ldh62zos4ob8fctz60d18hlihaeve65dwr57081s6rtcd55frhsiedv1yudvgealva45ru0x9wosxvk7c8e0ykrt1h5iy21mbzeezaeqwkyaqqn7ongnnzvyv1gh6fn9we7a0g2643uwi3yi7ihz68q84tgwng2esu2sorlnj0tg3q0yhaiitko992lug7b8eje8eass6besfeoom0zs8xf9xzmy22oxp0lo6p8egrpwv',
                username: 'o1s2uwig8xcsj2mx9xb0qjga0oq1j0nh8u5n4f48wig1dwkwz9cowcjkypbm',
                remoteHost: '66qwauhlhw9us8kijnkvji13ehu1ckqqs99dyu0j02w6xp18iea9xr4ueb65fcx1kn1vsx4dieorr7uo211vuk3qoo5lc00pplsn06w4uz4mtqzanj8x50fztejlgtz76hbbbnepqno7x5y1rfsgd75xkalskqly',
                remotePort: 3158615208,
                directory: 'eth74s1woqe3467nx05j2vpy3x09vt4j5nuuvx2vdhv2472hthvglnnh8yld8cgl2nxvj82sgv25tjrwd6ka2vej4xfae1bpbs1775gmc1o9b4b58h08q8ix7w0pmil5vwzkyi1omh4wjcoyakq0kmjk8436juwrj6yeqlvxl7titwv97lwbrk140ka5tj598lmnhuue04nlnssxb5atyw63m9go4qdd10atg2zg5rj1lszr4lfm9tq1eevg6ni566d1xsjvf3s1095e97f5fn4c1w8eu2t9dnclhkzd66ademljiy2omsio97hy8tqsu109z8n51z13ty5mwje8scpyrl9emwm9d1nz7wat3mrrkmcew4nmuwafiu75owb757epoyyfujayn6he0epa88sw0x5xxlu586t5584rg217ndlxxuzw1pugcds0al72n1u9h2tv3dtymufl6zs1butet3k36733qupw3utzm4j5andhbhkxmc0wvq5mh818gpmvdxcqc0j1hymmw93eywmzop2k4sc53tnqh4hw2k8esdur4liezl0oa154lspki7p5rezzovimhhgm62xcndyxnfdpwxiyfb0cqxo57kh30iky0lvzuisy0q8q4su1nd2x2hhe6ywznp01gzgauvza64nz3ys0u4anc6q5bduvudjico5fdohu3d7qmjtbwa9msxqu2gr4smt6akdgkan4yqfni1o9vl0pl7lzaobn0chan8sk1261ndhzomn53p502tf4raabu3i0sot069fmr84v2p1p92d0wh7j1fzjazrwz8k11c14o76uvluar5ksnwfu8ke5cwomw7jprvgoda8lckzr945lvxuvxwel9z1z9g7ykysp2o7v5j3xummrayu77fm9xcyhzlj57c4xwd0ru8gu05wnnnn6st3aa2xm26qsc70d29dz0j0kgh2925c3n36riokzcx60tknmlkc0dpq92yv2s7ia4oqyvbcepdwb6dz53nsy5ui1',
                fileSchema: '9ius8ghg9f67etz8v4czx96bq3fggugjoyso4ednsqul1ikv1y4sdso7dpaz3983de2lw7k327k4g73jjt0ncmwalblthte19m0k7hf09gfsilgw951t5yff52t4bhfki6i2ts5qeb13o6e52lrcrkkbl2pzulddbjbp6oontf82hhjmepnws3j5omcroagg0ubz4sfylvnz9vnq6hxx7lkiq5bzuk7wtvl55f4yj3dqwoq3tbcq4ffib2gigik6jop4d3n2wk0kvk31qg0q4v069v9fjhe0qhqyh38ho6hjsuerm19ggwcy9a6rh0na8cnrsb6j8r45uqdbiw5b4i10agnkd0ggb1ntrwbpkaj9ezfaz8h9jb6ysz82bkj7jeaovpa38igq05qypz7k38qec8g0yr5ivlmxhhwotns9z7udqo9swrhewyo548ull5nawwxbdwbkvppgjx9ub4hyfdrjgbgo49r0u4o6uq37nczh6axmhggukjdkrj23tzxio8n6c0lz8gs0rof76aqvhgj7zzbpg08jv9tax2qi60rb1ljmsfwektyturcg7pomswpscmm42hxpt5glxsxnb9cmf8a703cdbp9dma6i61xj7lfa5q42f5m1s5pu7rmzarro384qgkqx9bxj3ntwbhkdwtng6o78n1ss7k2owgdy9cs47fzkvbp22e1d621a90rge260hzgatihhiywtfih4mzapklxnce7r1sfwpwq4vi92zfpijg0ky5ccgduobnctoa4wkz9i7m3mh93p2tfwe47f9muh78x9ti1xsi6i7vfi2ck8bwpqi3q519tgwkseuzwz8yutukeoe24fh2l7l4si60l2v470rkozc85kr5p8utaj963fubgrez1uiz7tf4myy2mjy3dg7jp3f7sddoz4rwowuujxl1aoflduukb56w2ui8dk51x2gkyafkdv34kqr5xn802juyc58z4k68fm2z3ov2qf3c8sm4tk1j2en0xz3odohrn7',
                proxyHost: 'rrx4vvxa04zrriv6tjdyu7f3zu0ztwkkgpri3afvp0yknis9us2almhc7iw0',
                proxyPort: 6082775561,
                destination: 'mfu2vng6i3j9887nnw8guxtp55u0cgu496yy5n08vquy84b9i6uvkgjhkkscofe4rj4dl46oqetjof17w2a61o547ztgi6y5aiivwxev29u4zd9aqt9psb86mibjc1nojv8nx03ste9eos6ahcn8q2jc61fp828m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'chyyv5454s6603w8uy705rw5e36g81lewhh6l2sm28wffrxcc53d2rg9xvy6dppwfjo09atv9sggvhii32fkt9wf50qxv943m85k1c9ti1omfkomsj42n8gi9eggr6q1f3dikd69bqtgwc0fmxzosvb5rwk672nn',
                responsibleUserAccountName: '6rpl60tfv2e4yybll794',
                lastChangeUserAccount: 'hw5527c2f7833wiadq89',
                lastChangedAt: '2020-11-04 20:44:55',
                riInterfaceName: 'k8hzdksxgm4pkakkfp1mx9psj499j7zjwmhszmon5obpibj8kgc53lwfabpv9l5jp44qh7b7o35sukhp2tf8kdgztqyh8o4usq4q4nlr0fnl9ls2juw01cyymoit9u4lvjnop6de0b1sv5ep5kst4sfsb9zlxuar',
                riInterfaceNamespace: 'pgu6a8r4aorbx0crhwcitsj8nf6rbcwv9kmwrm1olnvj42294idu6z3jdq3lxuqft27tqe5d5nt2rbhdkntphqown5ki1nai67nez85f9qgn2j9ez1647yj573c4njq2wcyay5mko610n0bd7pmiis83nvv8e1h9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'k5hwntxlj3ymhzs7cwwifeb9u1l84i4n475z62a3',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '6biiptjpoj6xcxpyalod3cu4eg9yztunwjr7bleu7jdh7ulubg',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                
                party: 'yrpcz9t942axhq1u9u9w7o36iwr64dvzbv3dw03isolbu3piay18e3scazvs1uhqvewvf99pqih2v70g5367yfoy82673ebz88zu6t7velr6y2wkrbords4eoa0dkb3dj2xvxii0tp8gd6jf6ux36zk71bszdei8',
                component: '4zsn2fvrane2smpjzbkqqtjhe44sbh3uciw8g14nyy28oynir9n538brwaj0gr96yhg38zothyggdap42kwud1ntdg1kc25fs298lnw6xvn0lbggl8m7kv1krqy81i4lz17jw55yyolwn7yt0d8opb6vq2ns1ee7',
                name: 'eyfv5unf1bdpct5nstzidbdo2m1fsuphhwo44uvq20yghfvv5mph3vowpwdceuo5rj4weqsisb3w3x64r7beskqo3xjao4oc4dkkbiijixfpndipi2d5x3p1rbvaf16unukbkfrpqk6l5cv47q8kt9smjw3l4pwd',
                flowHash: 'olkeb7gogx8t0ijxnbp9kqnvitcpdwbhtswiz3n3',
                flowParty: 'n31bbzqzh4e4w2iicx9oumfengpqrxyqddwl7imkmj7591ersv1or826z3ztxv4w0iexixgtt60bjjt4r0uytulbk5rlobv4ak798f59ync2vkwrbti6ec8c1ucn7kzu8kqy4qnfjvjljmf97h15g81og5nlh9ri',
                flowReceiverParty: 'w22na7z6rn2clacz98d3m0e4glg46vq4gy83ryz3jyn1ulkw99zrm9qil63qtpgb8ywepllzsb7hzin62gbxkuw2apm5oil5q1xd6ijbvmvhzgaxku9kjptvt4mmot9xomx9jjdfaztjx0dh7rm1gffhjgsv5du0',
                flowComponent: 'sugex3skat2l7u1bbjrhci0fcg3dwmfj3qbtz2ykkcxorr23msvycoipw0hoz57lcnjcg7m8lrgy11c0q1f6twrva60i8b17yojqn3evjfn3f654204n6dvlj31v3wgut97f14i4eta7n885yasvyrt88wbd9q3l',
                flowReceiverComponent: 'hp2q7g1lkw53cpvehueioaosx40q08pirgegeoi7yfogbi6r4lp8f5v0v677ygkbwbmc0kx7ouxiilspqzvt7qbo20kg69nlbfwcrjgty7on4h8f78r7fczegfef1c4zmg7ee10d83za4gmr19nkl3r5g5xjrfh2',
                flowInterfaceName: 'g4xx3ez7vcc6amh2tt9n2ju347253v6ecf654ne6aft6sw5thri4hv2em4yhc23o6sye6b3fhnpcr3j58krt2j545cwghgkddg4e0hq6jqqegwm3ef70kjqrlee4b0u8usdole3l709n05zg3q6rnm5sf2orwjt5',
                flowInterfaceNamespace: 'y3ait2d8ad35pcy10m5kbc3ts582wzaczlbvvslch1s3zhb9rplrpahn6bdld5kg1zmdsux6jqvp9ti70c2fjg7bxw6vpxn1kffror940xar60ox9n25ewb9z1x4lyhxfwpjnqmm3ra6a3zpqlw5zlnefj9qjh3h',
                version: 'rmiawntg6h7vdask6ion',
                adapterType: 'ghqn8kaaowmy5pfy9hrxtt20izviot6rwo0d5nu0uo68xctghay1idyacksf',
                direction: 'RECEIVER',
                transportProtocol: '4zujz7chhr44sjha0vpopswzjrg36umi4muokax3x61gy1s5iwx3c8lmwkze',
                messageProtocol: 'fx2p1rm26ft6lndmz1nhj63r651w880ao7jiyrmgc0n4buz1bi7kumkatp5k',
                adapterEngineName: '1448lbl7s1zh9nje1si69ak77prgxwfubqxrshj80ms9agbp36xj2v8pv8t2sufubrwohhd9ez20uyftamvszipkfz5ee9fraulb7pekp2dfrniffmf9cexm9yb3rygvzy6ueza2t1170usuwkh2rm7w65rxgf9h',
                url: '78fq7hdm47nfdx4q5yu07rvxpkkxjav0lbj88p2iqyxprq2ffumihmh1syk0tkx8i04lyuv097h5jcy8fkthwgcmxryd5wjlt0ozltwwu566lhgtban67rvgqvd77xt3hp86sgvv0bni37cpnnvi3dcksky9ycfejhrtygr1w20h7624kj6u0k7xt9ycst3s9u5xfcn2daqn8k6egaxaozvt9weaq01vatttvkp69bmafvvu5s49r4d5upbd9hcdjf2c6aryv9uxbbjg9njbrey9y2fqv5ozshqemggsffn9127522z7wd80s05jgl7e',
                username: 'afp67ym5f1fhb0eb5vzk1qhjyy126zjxaac8rw3g8kwbjz7ja17q2kgfizzb',
                remoteHost: 'ob2ie004d5ztepyxmegn3znh8zwdeays0eadb3w7bn5dhm5ds3oi3y2z3frrbf0w7tn9011cq8st9j8paycx42z915q5tq4mdi1ffj689v91xbj3s9wwejdymfyivpqghftr9ccebb7w9yjabwng540szrabaxo5',
                remotePort: 6511632206,
                directory: '8vpsp30iu0rijzczz83lf27twuwezjof5g71hw8gkwa0yhqin13zj4wjz1fx7qt7azn40zlrkp418lb1a4p7rjkky8153ju7d7wkxoozu1jv9cywedbzd0ghjps9xm72t93wr9rs5lh6l9x66j1kojh5ahxcr4zxrpc3q1k3pg3zn3xgawle7106mh2g7kkwc8t8e88pw2jw9txi0bgh5o1sksfo5pze2jcf2o71v3g8yqy9z4pg7r2kmxqpb0vsxkdpv3dpge893yj2vqpqcd7t1xv3aynzzr5rw0jgd1yb8el9hxgj27u5azz1zmls3v9gg6cf9f107g3c2bl2wcq72hvchvn8ovbpvrln1x59qou0s0ydr0oijroqaoal8kdkqwetukjanqu816wrnonr0oh5co8d9boayvd8oy79wp2ols02yoev1zx9r3c3ur5xclnofclantzt2xehuthic0bswromrfo59swyij3qetmdp71gi1t29js3hjb23slicu826772bbuuxgpltftsgzh36qv74gg86muy1y2utkn8cq5kpqwrok3zhfvq1drusu4f7jofwargpgo0wwvkzg568xz7r5f3s8ls2g4ctdr6m8km3ynyo5kypmcy0ryvb11enyoqsjvnrqn6uc8f73pslvfd4r7rkjotjf4vx7j2bk7x9tk4ie7kafmach4j7sz092wonvxjhvsber47n5npmtrcn2b3jni7bk0hhg2b5giw61n1gywvwctuvkrllk3zxre2d5r0868ra31me4e333gn06w6h1lme78a34wm6i3enbps7lt36ov1477q9i6y5vf72nixt0hdrpafuweltd1mlci2y6o9r3f8dfu6kiugxpg1u3jd5b7ryw8xy1a49fp06x5yne5tp3u6dtw88kd9enonmcefesx1jzth5i21prpcdn4ywzg439p7uoydq91kodz0dpaveyf4r0hw77gkw6ag7rkslls8sgc5oojcp06x0df1ipap',
                fileSchema: 'cxflz9uh2c8en8z7l0dryoqf3b2pnda0lkqvwkak9678xa19kkfai9zlxoolcijiafjez308umgw8hyhwgvuwapi31h3rcr07se8m17h48dgafnwjtcy0t6q2kr4mur4ckfvrsevj061khbff8ee6ihvkp6ai35m0t3hm20en83s8f4lpsocown4aw23wzk1icl11tz6ie252hro3f2vx8zkx5t1fgs2gvdog8du3n0d52xn8bz6ged1na6f2v9r4bzu1fwkgjj1j13imjkzksj0t2emz6kc0m51q1lwi9yysm15g7bwkn0nfb9s8690u9boypyyro5k30zh3r8f8ka4whrwyxu57rnb7zm9hgvsfntaxor39gaibbubrc7k1kkv4lcex39vxt68rcbcz57v6uekwgscxfw0d71v4anmlxukfl0migrsw21hw4wiko3zlemewmjx00scogp4fnit67f78db4nlkzpcc8yjym7imp1bb193ievfnuls8kc13sv446dpqpyss3c8aums62pkqhidcg3iwcgn01hlf2iujsxbn1tjob3keidg9x7ntzd511nt2iymlpr5u8d6dbxohdsfb0biduh4la8bhv5hv4fjj1i0id2savgc1url07yexohx311cgjqm5a3s2ffqbbn3yaqnvtxhxp7sahl3zyzyju8338hx9mq1h32157hxdzuq7ic69zq4comqpazy7g7lnn49znd7jx87mxquaab7xthfilnb85v1npigyj76ldm59b4jjgnx7m27yjgfuvb6obyvbnb8hewahwzlyrk86a1ga3zrbuycxx1k1yxqq1a0jvg3f2b3x29hhfvgobamhaabhzs654rylya7llya6v4oj9edo7xoa0s2xaih79r4cbqljvnoxm8atxicbzb230bmwfdyfq6tjz8jpnwpyplzghzpaw3ye0pctap1ptvafhp3cks8q5l03qwr88tnoiq628hady2bd0b5xijhl7bmb915rjr9f4',
                proxyHost: 'kd0q3g8lldjrka6r1vyqehs2rd3c767na5c1cpi4lqkqhioitsf2hmdj5qvf',
                proxyPort: 8559722305,
                destination: 'g2firoxgfxufwz0drav3kgz2fe34brmh3vr9o7wwndwfff90zliu94761gmx5wy73swlw1c47udq7oimm1y5wftsmvenmuknai35rkr79fsgg0vwny7fpnqc52pv7ocsbqzhxho17hrq8fy1mu08vvwnvx3ccr7c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vxa1ec81mqapregxhxx6eql6uyjkuht6r3mupadm63jdey6ouo1nnb0k2edbiawsc49k5pocqd8euj63vq4rz9l42n8sqack3jm6d3llka1et1buyc93m5w6cgbqawedxcm451spd36p1ua34pa15k6q76lei7iw',
                responsibleUserAccountName: 'jv20zt8f86qzqw2jjf5h',
                lastChangeUserAccount: 'k3rt1uk2aqn9q59ly20s',
                lastChangedAt: '2020-11-04 13:16:31',
                riInterfaceName: 'u53jcuc7v5k0ikpznfranhch7xd3h55gihkbfpyefiakywna57nusrurdfg8arptlfmtd8t0tcgurhco8c5dcad20daf69mneop2i9urlgcuxsmowxfo4nnsufw4v2oswu92y0dq2ckvlbsamm3tjhj0nen6sg1o',
                riInterfaceNamespace: 'h8qtlcspcjqdgvncygebok3d84vcvcc0gv5lyre17u673ski2m1yiaeewv5ms22vm4lr831k86gepbvjfontxrd0kigb06xfkpjxhtc6mhg84lwfs6mj2xomnksjtmu6d28xv84njpvn1w3a27gzsn0ctzf303x3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'cn81t87nj2tup7syw01gawmemerhjt2zof64jxzp',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'r2xmv4h7vejo9pvmggzscvz28eypqi7pz89ef0my17td6hkogr',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '9d9oa4y8nc4z4kskjx7o',
                party: 'mbhseze8ghg6ukkv5ctud6q81es27wmrb0kl0h82up8jolwea4qjbtkpssldr95wpb89tmvw1whx1i2568bg7e8zgp1xw1rchtz3vwj2kb49g6zmsm8cj15roen62lcc1tl3ec7d5zdu7aa9qrz5ez9os8vzfhez',
                component: null,
                name: 'h7w40y42jyx98h9z2g3s78kxtvab7z5dt8fx3egs5zsfo7l581c9kvr84y4rrm0nsqb4c6dhek4samdzkrodbetg8c2kzvmcke6co4ifix1y6vdk4r8chm3y3vnsjpwhy5g2xesm9m43y8fbyqvjsnu9tkotzdlp',
                flowHash: '81a4cz89ve5l9mk6iwlowkx6rjdp7yzdh7ue0qh0',
                flowParty: 'lytj6vxnr8w8qtclmme06az8fzlx5yhfwolvfc99vzweep1hmlbba11k3yp8cc4oq9yabrqvvgtgom6r373wjlhqtv6pbep76j5quvtvb0alfcok77tgdk0244ywoi99e13gq8rroh8eaxqmf6wwqe306sy5zpqk',
                flowReceiverParty: '3jtedjwceb9m3cv2y68jjww1p5ivbq7h5cjqtemy6zqjde0jnx0pfgtjrjmfmyib2n305xw7nufvtkasc5ksyp1ydis1bc481k73sjsfqy6692nh08xswbzfj8x227o77r1hlo6ibamwd0ns0foyep16rpr7nt7b',
                flowComponent: 'jpvqb1fz2chnup52nxluqkhms7obj5j7h6tozlsarurwvduixkshbd8tbcl837ig0p32eedmpjms4x7lj916yv3luv9y7t8qx97mrez4iybz3pigily4iiarn2oihemnsqv4fsp26dt65c6nn9gqeweux9xlliqf',
                flowReceiverComponent: 'l4zo7lqa7f7r7fwyu66puppk4u0gpl7p2wwebgf6be6xfvd6ko3eswjw1ncupaou5e3asbm2pbubj0zpjlqzg6lcmue8n208ph811hjf2z73vetqpo4tnq3lf1ty55mwjw46esvf98claz5jo5ltdtrh4fijl8au',
                flowInterfaceName: 'pmqpetrauh4pkz8g0wb43nigquungk8khzk84825023mmujwtosxv9q3fq52umgrz3kjdocgt5fv11m7fum2g0dv7rlhdr5dsb06tcrrqeldzwfaqk1c3y3gmmhw5awmd6unbb5cwdaxeierifs0i08491ncvssm',
                flowInterfaceNamespace: 'c36tozewmhtxhfoutd1d97zh6p58iwvmhhx26fwjfwkw5zr3lpskn0bl3kmgftrukiwc0ebqoyg673rbz37tnak55ubaykv8r5f8i9f7kn5eynzr1ajzcbxgs128wyo6gs6x6jh9pav5wgvturwmqta80d1n0qkj',
                version: 'ia4ifxdbkxd3soo2mh24',
                adapterType: 'x0atq5ieynmxciqcnjt4ebs6hg8o7a8ykiq7kn6lg2egdsrhdlzecxhxpzlq',
                direction: 'RECEIVER',
                transportProtocol: 'wupre3li2wqbvg7lwlih1l64umwoxh88a3ccrtw8gdfqj0jspzqtdlv4pkwo',
                messageProtocol: 'oa5taztuvi8u49w6ssbi94ps31rno0qtlsvpdlulentqm5yy1q5uyjyaysxo',
                adapterEngineName: '5djwhzxytqs9clg4tn4j9iqjzgyglerjqidwe3uuwwp5xp0pz3dwsyc33mlulhyrrpelz6ym8cit3fg12o0r1jnv9erdxrju3im9bvm30ws7ytv58gin49vd0byhhxd7tnvzajugpo6denydbmwansfz8kh9vv5j',
                url: 's2t859pq8xe65q9uw7bfod2zj7eoekbdqaluq4t7q49n8nc1lk64hxvuco41di833bi1i6h4lmua6kj7kfsfxq87hit312q6d201sx82b66l50n1t7tjuqikoh2xbywrsoc3dccxaw25qe5fb3t5owv2a2akqi5j6kacp6ldkdzj42h1rvxlhm1rn5zeq5gf9rriymuwv6qroig149rla962kvs3nn7brt8wgkbc8xnoyy0i6id01hnuufzcoheh7xfddgh4qmy5olrbs484xq554j7tuigq1u54vxbucfe0quvkdww13d5kjv376jy4',
                username: '74yqhqw2pixqjluaa42prjsszo6z3b3nf4dwbgy8g5l2afqmyciykocvzwz7',
                remoteHost: 'schnm5mvgs6wouttup8ejir4t0hgvb8w2uluakfhiagwq8ja7oq97k40mjaxf55kezn5spsk8ur52wb06k0hb97mkg3n6tw1im6347wtrtjy46vaybvs7jj5nt1bk9n1rgz7mzrs9htbot8ap4g3mo84y0458hfb',
                remotePort: 3976755984,
                directory: 'jkb2glba5tcuwksmg9586s7znknrwrxjud7tl4tjg8qwwmro4xc9hzyfucg7d1o1go3yl4ggqa87zozy7lt06zfi4n2db3wu9a8pl0w391pysdtptiq1km5szjz859nf8s8cvp1ywefyve0lfcjmxtszqg3n006l6vgk34tlo93a05ch6557cr43hus5mgr7uyr23bld4z2pu9c0a064dcsi91577q1doxrg1cevxv0ka2pnbpm1xa0dptk924zf4fyw27wcqrpn2mymvgkp9xmm1r4hixj138dnvsvka61521daf4kqzp6fy4r1cdodjt8dpcw5qulz4ra6w54hzfm3roujzx75jozquryebh0cywjspcxjog0kku0nqau2urw6indpqtyx866l7mno2zo0yyk6o2x6i3nebntyeohaykhbtbyzteaovkm0ooclousjtikbxao7jwmw9al282g18gwlwbb2044hwxjcr4s690cdw2i7auc4t6fkb5oq9qvd4g8qhu15spr2v9xsflt0qeupkelv56kj95yez7oqsmvsqhu92lx3ym5urkx6mezvuf8nv60tjapu4c7o8z7ftufl1y4w0pr8v9nkrw2bjloqgezd0hmx1stdhbfm46uthdcaycmurt9na66gr8irwwtoqmxcxhz0ltad0y9btr3ujfmezkp5i6jfgpgj2l1lqayye4c77s36d8m0pzwdxurar1s83nahszphcozv5d8gvdaf7wes998wr36zen9mfpjmj4j669c3b2k5bex9w6yj686rzal86edr8xpr52waesr3cuxior3o2mf0aweytkdu4l8gfhunkxbsc9xx2wes7i1s1pdzmyia4uaxrmei5806nhbzb30xzsau0za5kf4b5pyof1omndt27l5gd3cmfzhlqzrtck1s4lmhcr1zfoiusun01nrrjsp467lot3kjme2fqx51l9nc01re917htw22em5fr64yer7n6jwzfw820gln4od9hzsx',
                fileSchema: 't11mk8qsplritaoin7if1lambvpbl5u6jxahkgrh1gcm6ek1pjwqttc8692t5hvtzdojlo9k4z3von74au4a5ckqnskxuaxdnwix2rjr04kc3giib5jylns1gif3lpvsxj2tan59s6kesg0h7grzrt64fyneh5pybvlmwfb4kleredck3r156fwni1r7t4gf6njbk5kx47107h5rbdufv8q7lw0py3fuu2kvbaxtcbi2dp58erizwiira65tnkkzvmvv2hzy70eqmg83eoza6mvgh45u7dhh8wjcl06juex6ly9c3baxx7bl5ru8m8dzgzm5lzyb0tqbhcmk69klgftsbypf8swz6zp9gulyu0wegv7pnwj42nsrddjn1fuw5wnolnfygqxj418rdzm05zanvv0rp94b7dswnde1uyqdhx9ogzbfq2si6lx2zaour8x3c2ehoicajjtdqci0i6k3r03ykthxghrbr90vb3xlnvkqc8ewdy65j0i2w5g2ais23u62aftl3jj1izp1nn0n60nykfx9pu2n1cup8td172n289ibjma8rmc50edxacho6plpkwl1xpt1qfigtwtstgrfbocf5s1idbsm0g4zfebzxscb3oyv6t8ucvs83c59o8n1p29o1twof9ohu35w8psx7tpw5oh1xdoh6dkkpez8pahjqz5ibc34zsf6qnw0a9yrhkczsn54ko708e71b7c71o5wakzae2sgkgn9bqdr77j9enqt48vh9962amn68o8umanvkwa6dxfknlskl73m87w34xgvnosu08r6me5qcwjnqdlj0w9d9jr618wuuudabhuexhuxo7v9gsd6yorhg551h591srbro6bbern73nvh3oj2y3j19sb79qjir201ke44r1mgijh0censliuhbhdsynvq5pdmay5hfi8onaiuzljg8br8vkhx0m164inhe7dh9ypbv65z9di1sos9es7alvi886ojpyi4brx3lrdrpuj9x1buzwgf',
                proxyHost: 'njbijwpkaxzhyyf8tjmm2b0avydwmp2qs8jk7qgz46fnaqm6fj3daw0lbpmi',
                proxyPort: 3369149363,
                destination: 'kkwhf8ies6n6ck1dasf9rjdiqpqhuxww1mybye9r1u899axvj5ln8k7k7zwnlqwqw99xkw5jfadmwkv484z7blee43iq9oe5qldv0hj646wv1ldszcsv1jzr3g57pgx2vgzs1wq7d8xein9w249x7d7xstkwqp59',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4oo58iz1i0flu1ispmfq8f2alx0hqixnh6mt56jk2a1liqpdhgauuxzwbjcnulrwzx1r90pwff9hccdephj9rnh7xtwg4c7ji9u7f7e4lcjdia0zppfii0bs672qfthkftn5calkngmjwyxqytaymhr0gp7837b1',
                responsibleUserAccountName: 't0r5oqycbcahxnowyjpj',
                lastChangeUserAccount: 'kwuw3db842ninemuoexb',
                lastChangedAt: '2020-11-04 17:24:41',
                riInterfaceName: 't8677f618ndxo7dazs9v3wu1dxbdkhdh1vyqogb3s9yiz42f32ur2tze51wjaybhcolfuk1p1k6z5c6ariz6rojd6cvy3ucs31qdxflkz22c7hkqtk7bqasekf3g19pebfuxo22dr3367gbgsc7sh4zyvjej0bfe',
                riInterfaceNamespace: 'edonjdaevv9ze5ry5fzkwutuosifbwpmw45yb0upywqk7b1ys5nj0u79c3gjyhig1kd1ftnbjp85akeiohtu56f9o3l4x3ikxy1zhnf4x8fiph0wa2zqkfz08lrhpkyggi62se7w1dsuuzwtq72ia357t906igln',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '3v13f36aufnpnjah34o0xs9km3onhqj9xuay1q21',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'mt5lu1gknz73lf7fdf4sz4cln5w5qlcon8eytix0z1iey0v5h5',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'c81fh2meiq9k50dsfwya',
                party: '43p2zrg41jqy2a4yd6ur5d5el263yoqc346gcz6p5ox8cwyfc045ssg8bieigr3v8um3x6ffdtm5rp4pyl9r8rqt2c1gnp3teqzue2pwm3gg3lwn2unykb53fyaikadpcc8a9cgd3gkiotydnfl79397kfwurgbs',
                
                name: '61dwup4kx95u04cn5vgjtgk4k80qdd1yo66qjr6gs2qofdoubiskl0a4qtmvfk8gy9cg76utns16j45cb3i30hvmaotoge3m88nnyeiflbmo4v4jk64rxkqnl4wrk4hxgbcftc8s4s4t0qme0e9kdvxhf00ejhw3',
                flowHash: 'topjne5ruzl7qmjwqhw8bkyybzsu6d7zfxpomhe3',
                flowParty: 'kuoob2p17e7xhyaz882ppv0wk28n9wov7eu9szi64xec6elt4oa5q9rlwj82rr3aaplhs4b84icef9w13b1w1qqhidqfu10tz1dxfv0vthz05b2vq5y35qv4c1z1w1qtpy6xqg8ln5o4xyk3bvukedjb9dahsg9u',
                flowReceiverParty: 't4eaxsh97fif7p3g68ain30j50sbqd8j7fa4j5ll2gjrtkdaf2eutg1x6raunebbth500j8vbnxnx16n6evlymajib1tc0nufoly3jsoq21nqb88fml4j6sdendxu5xbhfjcnr4wb5rd4lf1a86ysog01kxbbopj',
                flowComponent: 'sbitwwb7pmmg9mfc8oexgdddt0mi1jisbjqvd24nfw17aigcy2sgpeb1k11jiwzc8pvbsxc1u734etwxz0a971q8qswyrmd584oumy17z37hp7s8f3z0o8pkfy4j48h60o0yxpgo4kteflv8lbutvflcvmayhb09',
                flowReceiverComponent: '9toromzygmb0smxakm0l1cysn26sfjfixes2bvtbip2bbetf50lj04iqdub77wc0eurbvqe12jmwsf4q5jbjawg3aloo66evpkaucxwdhgt7oxld3gxgv4nxrfi2ypiiqwjana2d1c4ir60u4fellvvy2fqsxzz9',
                flowInterfaceName: 's1vl8qwu51rbhauetu6pny285a7iuns244lv5qrrqvc4mor6d4zn0pq4ysehtduoq5h38hl62ttoluez96p7zqv672aflbxagbxpnwku38miifagunxrshs0q9cem7w1w514wxcqvu2d8psoe6yfsu1n8vhsoq7e',
                flowInterfaceNamespace: '8go0e5jwxd1z9xwbful3otblblhzz143r8xfqeqfkgdd8kmxm0yum4xety6o0cu21l3f358r2gwuqzw6vaq450y5j7xzydkmhxyeal09j4tgxxj71pxk2vzswonzqrqyhpg5uzf78c9vmubc3w56h3k53ls8a9eb',
                version: 'j7gdn7i2uhnhihwgjlpm',
                adapterType: 'j7vb7lyynhxcl9hy7v7vgmxrnww8p4q7n00ftf9a432rc7n17ptxuw2t5foj',
                direction: 'SENDER',
                transportProtocol: 'md9ye2xf86v7mc9gxpxnnmx6m9xkim48tjm7ugkte3g6mejh1n4sthwxg2bk',
                messageProtocol: 'v9g8pq12abp1gvr4ntnlwfuzorl6yg3lr0b07hl6oc2txgoulonrjbj9fey3',
                adapterEngineName: '87ugoydspqa9y3hqp6udy6aq6ugbr75l122shibnxsn0051qfjnzjw322nqiguxuw78fkoly2m987icrxvst1h66dkanqijlnf1pq85ka99mfhufj44vl36jvyb4esvwra7j77924a0wc31a7haxodftov4fycnp',
                url: 'lhd85yau7llxakmonf90695s2q8ylszwyypo84anmbu4uie9ggpjcypyujchsuwrw6g2p68ls0fr54afgstsrgp9i5x98yk0vpdyhua33xnw15slgebwgi8k5qi398d4m314roweje39s6dch3cy0v9e14bu8oadp9sfi7wvuaait9g6wthxff7dxayl3lzenik8ao9rg6cgpjobalp2s8ueod46is7pek3rjgq86vbjrekam3y13c7id8dq8ldbot8tlo2fqjfbo2gurm0uu722a06qbmjgpbv0h81svikgqqkakqj5m587mma6pqi6',
                username: 'ppg5ik8fven01y5gvf4813bbtdx56lzgn8lejgxwvz1yapu85aor250qbou4',
                remoteHost: 'mhbm315x2mq1ovxrlks8ngn76nd0g406ltjt66uqa99oz26xsnkx5bumqsegfvdb2z5g2cnvig8ds6v77epxsj40ibbhw58k7qz7dxv8ckh5mnaz7pp1rqkrbdqte30i7sxz8ynn9olztw2p4angw72lrddpb9n4',
                remotePort: 6705189747,
                directory: 'j78df03g4cbc38ioyatzcbnecmf89s5zqcuoamqwlk6o1p00p55iapdbjil2l7geiolwjuy5h3zpbsutu3ya6maga1rzzymps031hxbcjpsluyp8x4wseamulndrvr13syuzbkpfqk9rleghx9pt55zdfxh54rdtx47xvyeadgcyoqnk6a9d30qrh8bpjlzv12goe9uypf4tn9k3706ouk2bc0h6jsp3umegzww5gvbmsx90kh3niz1urxuv1v7logrho6lhv0vgaqpznfhfo74656la5o8e46tm83l21qj6kswq86v2d33algcgcyt7lsyu6gphjkd6j5xwgoo1mvmjawhu283hhkgznybjizro98ljsaklkzxjus06okl3p8ozz7g1k6ram2r0znh6is0fq1yxyrwju8h8flkcvatme4h76w3qulm90jbgfaw5nlzc1mjc4h7h3osfuhfhvxy0gyl7slafw47o4zo1bhjtw4rjszbjoj091hjz6eomf5kzi73m464dv9b1rv0cty650tz5w3h9pj2w1smw639g639iwg4xh4ex91xm9e3xk9txctbxob2298glpbf8q0zxgh2ge7nknvmxx2qslmsxkb4h30dat6tf0hh0t5nuzu2c2cesnjgyl65uzk44fy4cbsomvxs0je9ywd3qvop9g3t4tgd0z1145szjscc944etkgd6mdubhcg9dgm8vfsuaa8aynihlvqwplkhjy2vui54lr36mn9qar06rnmfqteh9gcmobgbc2saqx452gqhu0ladoplb2w03acjwrrqo8v43ub2ry34zg9tct5k7j4fcgd6k5z6ufa03ex3w3y2zy8tye9cc0kvsmdih6hxkmca0ufv9cfmffyk4hhz0gfr2b2tw3d1vj5vmxiomtkfmq4xvr71usem7w312tnbdioaltf91i7zh8bp0h4c4z6702aqnbch7mjgqwyi6i7ve8o3ksbstoj3p1fl9p28xehvbqcwf8l3tt0lyw0m',
                fileSchema: 'ywe01icj3mbrhm56lho5cos7pnls5d3u2q2ry2bij2uj97ck59r5kxnwl59wodif6yb5vrukvxl3jfnvg7zaxv3doo56xif765bd8z5xjn7pgzghhlh9j8yltxuhj3ggundtn7iexbfzej3fm98ejy04c2iihxfsikikyyuin2qjf2jzlxs1nkuxe6u4kq0aqhn2wjdk74pzb3nmqeodmqlkmlw86jwuuy2vop01oz7ot0fzd8cusxoirdze38diregrq40o5fjua0ldr2jsesuwgsts7lw35als1rf289zjzgal8n2vxb39cav7fxeoui482wzfixo5ydy4iqtgyfaane2l78fskfcosozxn7r3ax7flprxayeoulc7vidt6zd8lryt7a7pgpka5kqplea7u4c723qhjz510jaxt0xrsumlchpz9ns8ukqquqrkf5hbehhnmlyetlv8yoofa3n8o0c4yg1d8yth0jvzm8hlv392v751w5rsb2z7n8s4nzomj0lmyp9daqjld721cljwio9at93z7owim2kk0jvdudoycyrf8o587np3lgzr834d1b30zferq30s85qjqt9krnw6cz67g7msfx58yuscinptmaxwuy03rpy2ibn2eh9b735dqdxu4iiotv4m88nugkkrw02rdbpjj76u5vz6bauxygbm0536vzffi3yklgh4g563eyxy6uwactz4aanu49w515q5ni03fmfxacq6o153bvg9yk853lqhbx8wjvrmd3vsckhy39llqgwskfpgvcipmjzccl7pbwz0fwb8wxi9cp0b2lvxjxlawrm1zq381nsenj8xpwdcryb8z5ifhfxfyiosd0i686v7bfm99rlka5ueii5g2wm8q0tp9k8b2b03nsp5s6yvr86ib7f4qb4igkiowhztf7ckd4131677ar8zxue025nk3qccyeuccnrbt0jy9ezf2l14j4zx5o92bx1r7dyol040vt2mxtaa3bwks7wt3bk62izu',
                proxyHost: 'xdgbkvb1nkd2nsukohhecp7vguvnsiznsgk17n7mknvyizvr6hj0ijjc0pre',
                proxyPort: 3378054278,
                destination: '6sd7evmcuhz48dvm7cdl80lz7yjowpm2gb2kyylytvfq89i0mgckk1b4g8aje7vmdvd00kr2ozscdfvw04f144ef4iuh208nx603d8gmhceqx89261zsw0qerccyp5i7u40lnq1qztljx4371p9590ikeaxhjy9f',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cisy790d8128r4dx45bt4xvhd7edlf704fbo7o8c59c1ojhw6c0e2j6slk72i005crwiey4nxot7t6glgeyokkzeupuaiuo27vd0c58z8945bb8nd87h9x5y7s6hdg7mmq9aibs72bvg1zcqjw97ksh1cly69qfk',
                responsibleUserAccountName: 'orqspoy59vq09prp9xm9',
                lastChangeUserAccount: 'u9rgz8hq93x3xr3kzrcm',
                lastChangedAt: '2020-11-04 19:47:38',
                riInterfaceName: 'xsv1me1kszjlewmjfggme2lpa6stgq6cy0zutvnnaniw0n6xp3tbu5taupvsefrcihxo86pbty1d6f05ki98ev15zytnfcqdgtsaph6qw1alc59osswl22rc7nwati64h6i1tme2sjoqg9ybwl7r0c35b2tbyrvc',
                riInterfaceNamespace: 'wg5l8zd3sqgw77ekguzo9borc617nw8ilzkay3e43em3c3if4bhinn4h7z64g98mg6k5bagkrkikjbkoc1n6o3hu0wmtwjlyrrq7hod4km1kerimxcqtseuwhnpk2tl74oey5y8wrrk9jknpezlmkct2dwlycqfy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'rzawseeoevmwyvy8y66m59r5x1k7eh0oqwkqlf47',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '4w36qw74hworbjdzmzeaeyorfvfzr97javyemynsm03f3505fy',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '60tvebh0uol8pgvz9yft',
                party: 'yfxxi3k9yhhtgo8v7mpypiq2193t12j5l5fxsyq6kws1mtmjdggtmnwal0hb827eyhgrp5xmo3aa82jdbq7faln7n2avk0dve671erthq6mxa0d13o6tigoyg305yjzetbsfa7br6qztyju324298zb9evx3bpxh',
                component: 'zb2c0xbion288jsjg96t08b7a4m215xhwa16syrzevzslthhx3vplpgo94mrl922qnmgmbmyplfbhr3otnzj3yo3brir2x432f08lg5ba6t27aafktkohkrr3hpv83221m6jczcr32v6ut7ej3ya2s3hvt2tbrmr',
                name: null,
                flowHash: '7piac8m8qfmo33q1tfx228pwzavf56fn3ua56fsx',
                flowParty: 'pp0xnkofcr0di169tt0fraambvlnas0mpcuxdhl7jqznbcfi7muyk2atb0adizph79kr72w9s39klq46lmd428izfh9191q2rwdmdo926hhjjxz5vqgasom3787crfrwdzaanabvfc5ki4geh7b138urb9qvx9qd',
                flowReceiverParty: 'fpac496ipeyt8rj0bq4adxa3h5rvvv056lh9fp88tvgav9apg9qltutenee8u5ie0cu5r09pbdht1tnoeaet78nw3rlolbh6671s087cnfx17m7zlvwma0lhetyn736u1vxsgrngqy5vmavqccrpvq1f09fs6j3u',
                flowComponent: 'g0kucrridx7ggzjzlelsfaoxoxkokvdhsr7tlxl5a3q7iafw00x9z54fuw3doovgv42opd7kjbujxso1qbo52wgmni0mk8dbc95vtzr89d39owzrwgk4rm421nho4o665uyyi9qze5gs6ufmgjwj91yj4o10voxr',
                flowReceiverComponent: 'sg86sf7l0hjxk3s93ky28jc2vcj017w7ic96fc81b63yosuvxkhfdrp9cuiqqdbjifj4b52mr8b2b38e4m69j6bbby86ocnvv9x8sdkyxenac84a2r0571v3y30y9cb84fl8opt5csabgz9ifvcb6up3ueu3s399',
                flowInterfaceName: 'l7785gj0dcx9phlcxpng0uvfjjtt4ozd8x57iumtgyvshvvzd9m9ivye896cy99i5wsqqvr7tz4su2xwglx5der177elmk83to3agpwqi5z9qdu31ebmgfsqcaps3o0h0w48rspco7t4b27jp4g01bocfwn48shh',
                flowInterfaceNamespace: 'to8mld86m5pvwnz78d0ik3bqlqhm0xbbi8ts76lsz804wfrsu6hsaukdq05wdh6athjzvejzwqxtmcx73wwiymxh4yc64d7d0zkrgi06nykbnc151jbdfgq3hs34rm4bw1vmmpbr6lazdd7sk3n00rj6yfjpuads',
                version: '6wevyl61o1z7p8vulfam',
                adapterType: 'au6h3ijeo8pckoebyvuys6die1yrvghh3xs2149vf9v0kweryelr01eg7zhb',
                direction: 'SENDER',
                transportProtocol: 'rbsbssxjr6y0lpoghjo8ltkc92bet1q9hw1ll9awvkg4ijhrqtnr3s3mgore',
                messageProtocol: 'ci2hua5vt4teznpr1cn338705kiyx60d3g43h6rdgysoq3ls3i8n1cd7xzy4',
                adapterEngineName: 'yon6lmdax4hcpaxdru9qvol6e4ef6h6fpzzpn8yq5vqtq5zuo3knr26en7e9d5pgqxy438dwh8kgd8i2vrzwobczblid7tbs1wl4l0yahj7qnod0sb927ha7r1xsqh6tpduz2zp9qx9rnav7i5780nxz6ciyqdsf',
                url: '207nuhqgq8tphfw8zsqpwkjmmcfxghj7aehoiw9506ld7oxu864hor57bp0p4lrs8f5px3x19dq08sypfpc8fytj68al8j4uokvhp1x9pz8mzjzkv0rtjui7z4qeejae1qslvc8naabjr8ilewgq44ktwzndmmup5dp8w625cd4ixv4fgjcl3bej551tpg3jzv354mtds082zr8cr1mjqwp2tn1kaxsbd9yn99pymxapx97u020dvmboxy66rqox5h9zphb7e83wefapbh24vfob9vkbapmktlpidc5e92xisjif5lqhz8rkio5y5syk',
                username: 'boydqncsrmoron02a4s435uzu45rf5c6fg4oewtojjc46h3kk8zu6awdmykv',
                remoteHost: 'hc99kvlridn24sbj9qqv0b4zsm3exguo7llzuzjy08aem1u4sglw87txv7oyqts5fwnd88dhpiguxnl91odda3pp29ztte2pqvvbwm275uysa5820v6aoprm5sewqsfnoqrcuc2yhvb4pqh3b62ne23kmqhkt1um',
                remotePort: 3339419047,
                directory: 'j2eaz9bi7fcjft8c6ivua0eq75prpstx52gbaxiib9ff0w2v5nauarmcsygehjhmamfzugf6cr4j2454yni7zmxr4foopw4mxn5nf406tyzjms91cr6dcnfx72998855zay2vs4vb9ipbc1g4ua5ishvofgozgnvpdoxqzq65iokf2yyel0twme697h8ssog5demhivlqzkkqnsgp8l8ysxsp7gjvxnb2b0a6mp5h1bp10say4mj9o1eldc56tbluk29vi2dn98j55lcoc9k4ia4yuzzor575g1hy2uaavol4srydcc8yv0qlj8fszuy8mk13m5ggkd3g4u42r08nuwhbk4ccrcauo04zw8nrqsym0vf3aocm0ay6xhhxmdez1t0vrmyj4hwjs8pe6eh1b944wiyb6l9tuo55wlkklx9nfo0qanmoabo8lmp1y9gavtzvs5wkdcmj9nhg42jks1aungj99vb1802p3x263tfwxusdrri1hc8vr98zw1gzn8c0264bnjrqlg9su6zp3sg2gemy8h0tdk4cwimif6rtx1htwrkwa4qajkz3w326a4qfoa78fdt6bpjraky8dx6xdtkfj2imcctsz058z3v9ojn04dosi383avbauta7s2wfq0iv0kz2mhjfo6c9o9lgniq8ziwefsh1xtaom8677wzrt617ksfl6ee4tsr6pvlbg9ezald8h2u4eldvvrn9qqsi5vkzwu355wm76o6xk2h2z840egrpd9pu4kilqry7wi7xnu05rvpa7j0jh8wnrrd2z6qhu0qjrk02a04vu1198wkypw944b8tvshr2buv8fag5j0yhy9whnbg7vtqtndohhi664fuhjtvowk417uud3i11agww0ll10weoavaqfqtcm55qj7ul1xuugegsl792r5clgcc6gs17g0iwqjf8v600pz1yv2vjb7pr32efqwgr9lp5p9mkfacii1a6sgc06oycatewzwi3j56110azos8l3xlpvput7d',
                fileSchema: 'zcrwcsu403unzh6jrin0ffy0cqow69l6f9d2b417ei16tvns12kvem613214adwi79e10n6hafsaxnr573qhjbp47ovx6w30rbp5m2pzkcp1dfsxmbesdhz5vrbtzwlf7flqfxxhx1nfmfhxop3m1t2e0tjg9jktr2w959yij7c3su7vcvzqa0pf6eaefopcn5zlk9gnc51cbjv7y6gwir14mcsm3vyh6ckq1tt2dnxpojvuqkw4vbx1arpveu848po34oply4n1lgw1y8urzu3qedv2vs5jrzrqw60bf6wb99fsqfdbcikqkuc8eers554txuah9d78ih98ehkfacrstgm6krmkmhpz23ax840aaol1715nb1rp5h0t78dzx096shkqtgngn0i295m9ncy9ombl5pnnkwnilux1ozsch9skevxtcllb5qm5xwr1yca08nrpu0u8aeft4se4rhdh8md82wrgio271c7ul71ug0f6x3903nkv28wayzvy7ve5kabd4dincrrjuojxh7z6pnc0pgt5c7go7ezy7bojrqtgke7jbh8z95da5lptcxdfj8u3krebjyfzkuckagpkkibhdq4elpylhh8di3b6u0fzkwpqw835regazmbll07o7gztasn6whikbfuj1bj4ptzajd4bha51rn1v1vjua6qkrrnq7xmq08wyqzobfmpk3vbzw66vhxs0ovflj1vh89l8k94rhd7lchli04u6t6ggd0s6yvixobla59jbr6hybdg7cj0b2mgwfrkc6x72pnrfsqqt249al6peex227petwp9gxhb0u2ezm90b25m9pnazsdah5o1eq0fgxod9uaw8o7c8d5hjngqfgn096ky8ifh74fx0st0n9hnz1k44cqx4b8shhqx0j77owzq68l9avwi4r223dr9i8kmf93djw4wavc1mno3bfm10bfdu3xflcsn3cib66iqf6zz9knjtxq4adgub0dp68ipnlmnvgamxc8zirpqgyi7r',
                proxyHost: '3tiiq0ioibkmk8qluoa87gklcxzplb3tqpfslsuls91noom8dzw9whll534p',
                proxyPort: 5146514577,
                destination: 'j5tn4drx5m9ksfxxwazod2jm0fbtasccc9ohqmhdxivbxuos1jvq80x6ou6q4wc62niqya690tg9w1l290gf0s5w960fmhfpwg2l3lpi0hulod9cokr8dfoka8982ctqm0ww2lccwgtgv26qr0mdh9os2g1df8c5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tq2fe293vvocgrqkvdijbcmkh9j5fsclrmeybr5gainiz73sisv188f8p1qb0ibwpal7m9wigwfi8hcbuzsna2xq4ibf6q2mic4gydefur4u9yfhz6qm4gyla2oioesmonpbs4kyktrpa2jerbkovmc9legt2sbb',
                responsibleUserAccountName: 'wweall90i26i6z4vozb2',
                lastChangeUserAccount: 'mqwdi8adq8jdj8vgkwej',
                lastChangedAt: '2020-11-04 09:00:41',
                riInterfaceName: 'mwjjxhjr2vdpijmu3mzqxad2rli5kh7aesjzkexdeumzooafbneeph42xz84d10vf66dtd7ymur628q38ofkr5l094o0wfpwzunt34rli8z55wu4y6ufac1j19g5tysu7o22i9nb7dhpxwsioeic7l72uvcki4ak',
                riInterfaceNamespace: '9f641d690gprgmy08ho7s8t80p0tqe24ovt0p4st99sku5a6ui5in7zf1329a3lfwwfem16dok75o8n8uvq6suh3izj3js8qfo9wv1s6ax6q32l3vkky9s0gzu0q6d5yypkkn6rt4sexee009qs67dq53la1lo7r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '076d96bck1ylejhsf9wz3frcoozpfopwc0pi7om4',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'mavv6ptext2i0jkx8k0oim479sdswe064y8x85dsb2e6iortv4',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'dts471ijb3s3wqi4hxyl',
                party: 't1ggj8fkvsn7eisacuq1hmp7ipibi27c6cki5ap3rasrb1cn8vbw9tp6k09y1kcs7urxpnykxi5k4few3tehnjhygmup43bk8acywfr0yri4a5cgeb90z7jn3vv652xwe0zp2hqgdimrmk43ghuad4p2gfggcs8a',
                component: 'q8o2a4mnoywz71y3ksr5yincpl6aj0o8x83pwhij7rjlukh9ti0wyn9kpkr56x87yjndwf1xmllfw5auphg8jnvaqlfra01tx6qzp2vyalskqujci0ln2n6zhokp2jxmcm2sriw9voduggsabrh85qet7nnu6ajc',
                
                flowHash: 'c2udzv4sehri71p0fkpxys7b7ifaknxqmic6v8m1',
                flowParty: 'dcaljh5ryufr23nq7oanjx5ig96gsv5qti45f26v4dhvx73jiit221j2vdnfb0o4to0pjc4d21bibnl6us44p8fnhei8gxoagve4v8cgynd5slsy5yw4qc2zin7qgz1swwqna4b9ne7f2lr6979l8vl6tk9vb11y',
                flowReceiverParty: '674s1p176fl3i82wpnzoyofne7an4k9izg1naksw2ilda4a30bqv2c2barjwhsxbwq2ewkghoqp0mffvnynm0661y58dm5imdkvvn600dar6n4fv66gokv4lwkmexctrm293gkuaqlkh5bfm13ou4rybt95x067b',
                flowComponent: 'crhnb9tt17fmbevt9m5ysusowgqr0v6n97metpiubbwjp7vfxutpllgevw4j5ihlerxxp5f68v2qqkbq57xmpsl28dd79dnrddnij0cw3sepgcj5tzhyk1aq1921si6mxpb5762k12vfie3l9hkhy5mm7o2627j6',
                flowReceiverComponent: 'nnaqw4dl0a6uctnioshz2l29bdmsowntn8ck9cy0u1xd9v5igy71ck0ahyl3e6f87z6rggyi31ajbww9gtdinkonsyk0psg7unvlklwkijxa1mvg6poda1v7a0b6qy7ywgb8kkw8rbdmn3bmxidoqc3jlfuycqgh',
                flowInterfaceName: 'lcmehf9wwps46jzl6pn55f3a6rfaa2jd0skdai9jieim22tqzmozhp0zczeqcpr2nf4sq99v3hct5v8gk3rjjzuubcqimi69j7g4rr6x570hsjb923yvcrqt05v4tdzhsh5kmadw5s9iwyvsot9yhto97itjjzyj',
                flowInterfaceNamespace: 'kmxb07su2u9fm3jnfvr5cb4y71cp3xf38u7deanxyt0ua7e9uy27gvu743cs66zlm5yhh9m2e8wmm6oj0n366omn7ec0m0nurj2p4ue8b42e4pxr85nczmsaw85nijgmv9x06fxwelsa4lm3s08okqnne6tvpazh',
                version: 'jtde371gauchs1qf5euv',
                adapterType: 'yqa11f4q30r9zvp6rm1237a8ut7x73c9btpcss4quznjgvdefnsv0pxye48h',
                direction: 'SENDER',
                transportProtocol: 'oe1t2fkjq0lqzdoc414t160wxd1yd6a785fvr66xe4uyb1okpuj3ox2cnd1s',
                messageProtocol: '7f8al0vrwnn3jia3epundjpnw0vtg1qmb3kzlfjkthiowvzrn0qbwvnvlltm',
                adapterEngineName: 's1e51xqcwv7b1e0vdrnp2ecu3yz7idgpoeiqhhgew6wxjvoobqpof3kkdem48ix3rx8grqh3zsst5ajn1flounb4n8ff5wr63gxoaq6shlndx51hhx2mpwmtazopecjwp6m3z7ewfaw2128pwx6blixmrbi8n99f',
                url: 'y4hd30w4jsk8nspfj1t3dt0q45v8lqo9l4qqcl694br0an04ptnvwyictok0tvnvylqx4lrn1ukr9xippp6udwxwjg6uvu4xl8ngedirr5mg9vxvwe3dox2x3ipfgm95p1ajsgo92o2ahif85c7vrav85b8t1ztgvd3slphspxfccj8y1dh5x671uat2kw82n2m63bkzwbdzfabigxa0ucckqy8cy4biehnh9zyasbbsaqmnhod2985ye9iv4sdj1htqq9vsv1oj5br1q245bs8n98l3g56ed1as5yu4hu03i169g5vw8nk0dlni9kc0',
                username: '75vl56muibqju1ay99z7l4gjpiczu1m1qshz71mu6irxqdl1syugj60vhncq',
                remoteHost: 'elmz4esmumlpluxngv5dpphzlllngy7q04sj2tq0uypqjgkxqks8ia98i7io4axb4z8t25t9v3j85imvcsnbkcpd2fkttu3bm8xtwtbu9bu7sj0ikbaqjz54qo2jsyhvxorhorx0dyi7z944qkoau5fdjs7a0i24',
                remotePort: 8961476364,
                directory: 'qhebet0bkhyt8an87wagf09v0b49w1vu0es5r74l5u6kgp5js0amoprnv6xzpxc55d37om54ulgeihs9z0c5hmm6kj2nfoflke9u51d8ol1rudftngg1twbcp0jvl21n1uwgdybl1chz2pqt7tvqe6l1bhdmkv566877gf8zx1fcpbtgqffg9um3lbksqg9wulkkaytq5fc51f22afb43hpljw1b16e0fyeg6nl03t45vf4o3ompynpddidu9fyxre2vo9gj6nxudn6ta0sjosf3idu62myj685tqy0w0et1yfc5bhnk3yq9ef8if1wnrzlwzdhj7rzll4slt749vikzxllana50k4o6pt4hgrt8b8taylso6jstbc53kmu5b4aq1yxfm6yhabhdt0rnmni9jqhue46betbuasz4kv6zoa1jwzz9nvjfly4o5onm1lgdd9jcn03leqliazl3p5fcwziwxdn47j6x2ff256m7uv35lmtzgqetnib3fth9mf57t5l3mybiqnwpq9xvgmd8ugjic84co0gffdgtoyfa1shn0sbumxbm2jr55kanyzbhv9gip1pekjc4iarmhxm2fhr0x35h25sqxrptdh7townpzg8ruiwviparvoa4rvu44kayvm05ehq8r5g8ddumgmhvlp5snqaphskf6vqoms4k6v7nqewch8l0ei7rt8j007s1qid5927fb6313wt6wu6qi832v6h64ifz156a4wh602hksdmb8n0atz42pxz3tv2mahql7vf9ywfz998zb7ywodgbkiamw4f2ktpj186njmhqrucij1wp8nesc8kstufnh44o1o57jfdycw4ycmn4bq91r17305izztx7remgpvr7qwayqg5tfo69mz8f86uk9biejebygs2vxle3sfjkhvafoizke897b9zn92hkt1auacl9dr16fvrkdulye0qo8aun248gugilxrts8mxjp6eg4azw99spic83akbpw6wauae45fvold3f',
                fileSchema: '0lme6rljh4nfqlxyva4r7deiggj0zs5k58lde3vwa41nvnnmkpuva97ch3x1ipnwhvrbraipbk0mfgfm4f4clnmz233bpzc0dillvidcylf0soagxioydt1vjr5yrwne3arub9d1q8m4y9o1l0yfjkm9ic8zq516ddu1ws2olagb9eycqp2nh9zlhpmmw5gezwp56vtr52vd2b4j2t7y8cmolhjfoxcbeqft3e8esjdm42l0qg8zkewv114iee7of52l597onofrkjj8gjqznob5dzytcj8kjneounmv6nyydk9wy90xcgimp83eghtyi615xj5zfxmwhc038r8hufdfz5qie0w8b2b87a48umqwwho7a0zuz1n27eaf0lkx9x911ielhuestqex90vzsnygpswrnsuucgmfrnuatvc6qbkkoalugo6xi5j7vyhwb5lj891mmb78lxakiex286l62t7kzzdm929l1zgoehq2rm5j6c440xmnl9jehmyvu07hif6657uchj8rh18ldkfj1lsjty698azr5n5rw2k1awchvfplth94ju0390i1se77zu6f0dc1de24mghg5olbxredmfajo3ypucqll0fjufdsshjz5q1mt26vx0320d3vnt4sqpir66wepafkiec80sl7wp20yxowyxkcqj4iokmh5nshmyi8oakmybmmw4e6in12xg11a1l0xbkn2dcptbn0gij19tcbyd5ijaa0gbr4dmn607kgitvlimp0wdljnkcz4yg60vk8jtm7asqpxx739zzr9hj1aff2hlj1ewqtj0hpqzrtjk424k1d8gye44k9dp5lidzn5370plnvc5iuzdaoe01lys0sy9lq8neu5a5vbkpd5au7fyozbgrmiw78skmjndk09sk6rz379r7yp00n7u5p50vap127t9lud6k9jf1cllrse4oqb48mzizlob0815wsyd9og12z5uomff37gw379w98vaikv7c682y7olsvsxk7kx50',
                proxyHost: 'odd8db3d3anpte1o9twwylxh9ew10alknfrcnqqjqv57vqebjaisk8wpb7qh',
                proxyPort: 3067101135,
                destination: 'a4xhb0cfabsewx3blsyj1jycgfrlwy99uyw84o1v42w3f214cgsdxfq4574xjoeitk4zn4x1415rtxfhxnpywdqi83tip94z60dp2nzysvymbd9mvfb0kjqbprz295dnf3cjgw5eruupcacxoqktdp5hjuggur1z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xd8mtc2hs25i7iux7j8qwbgx79uwirm1j0lusuyosx82isfqrtttyza5y6oy6m9w221da05vvhd06i4rkslraqdf09sg0w24u5gi6r6pvcirwv2ma41ew1b2cr7pxlv46u0mevm0h7own2ake5e5zl050ftol8w7',
                responsibleUserAccountName: 'low0lcz3wr93npqqo0jz',
                lastChangeUserAccount: 'nes45nsfm9myurwv5rr0',
                lastChangedAt: '2020-11-04 02:18:24',
                riInterfaceName: 'ngdl1utg2caehcavujxvzw8n2v57vc95vybahlnh4uae50x2sd8lfpn140cxk4cx0ob3iic396qt8rswhmm8nbxbnzhntl5rzlghzclcrexcu63g4sobgt7zk8pp8akn34bgv6gsox6kxdnhfgaxvs1r82pxw1vp',
                riInterfaceNamespace: 'zudcvkgh5k46kqwz36jgxqeyu45dtq25e6ahrevc5tcov5y5vuaxtdosq0s7gmh2t335f8q72d4yeu6o8g1lk00tx8wlqn05xh4a2bllghowuzipkyxqsdhszroejboxwdmk1rheqga2iubpkbyp13kb6lg5vsu3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'uhxq9kaszr2ntctselfncoy3ou3zsufth00ga',
                hash: 'u1dpjw3mke6ryjxgc8oa7a27b3rbaunxk194sq3o',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'eoiskb6lntshpgxsj9977lzno1d3f3jf5r7zzxq0d6c664xcqx',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'uulfdl6aiq0xb213aweg',
                party: 'xonclc5i7j29put4pmhfo45oudnjd85mqymsteipv8emp8tu6rq582hqziotpsk4cl0rozdxl7nl951s5hjujj76mgp37zwcty692vmt53leekm2688k4etsrck3m17oj2xt25vgk7c621c8tz60ivgsh4j53c94',
                component: '8ej6toojs8e6f9k4j7h8af9d68rism4vbmv7zfy38ew4gu4kcxwnrbwjihil1t7ex8i9kkz5eyz35fcbg4mmlvlnns4ukrcoj4thbm92vahws0yqtob2lerhjjr2pyp3yfbxaburjng16dtt099dc48ur0i7y0ie',
                name: '1yyep6u6ovsy00efqnblu64uzyxoiv0u4g89spy569vxp19752n0m0myvedn0y3lbt6ox2fy6lh3p78jmvq7c0i6qosdgv5660v9ta8tyc7s3y7jvaju7t3hl4r5dsfptin5gsttvmlbqvtoh14ige7j7vq4n1yk',
                flowHash: '5p6qkee9cg089dkrcrg0naw3lmzhldu2ck3gz61g',
                flowParty: 'mbopsv4dtl5kxgrjj5qfb900titfyg7aeef4uok4qzmw7exzi8c6dkjv4vpjgmmq9obo5d7ydx7wpape33mhdwnizfgpjzxpyzp4v0ryfjf8qoa6t7ajff3fskjjzhsgxxrwgas8ynhwfp8ji2pe4ew4kta2f179',
                flowReceiverParty: 'lfcgq11zbrzbphzqenox9hej4932f6mjtviiwsuztcilmhcyxg7chj2866vsohnqaz2dremej2w8z4kvr4pl8j3mcxl1587u3ieyqorycgqy8cu4kkeaemmqqojwwj6mcyn2q7b85r67pj0uh1sbkfcn0q9hsul8',
                flowComponent: 'xpdivcgx7ovuwui3s81srwfvzt94d0kjqurxdt4zp8isn90lye82pue2gy2tofmzdpbgne51og6fq2s3rm7g12lts8fmlg31vxkg8x3keme2nh51age33plyfra2s9jpoe85deu6ywsp1mlvpnlgqoxj4ddiww6m',
                flowReceiverComponent: 'uksx50pckjpmuede22rloz7r1jb7kadm89dqpfpxn8vj2c1zbaflb3lq063z6j9smrd9e5pssm1ys47tfec3bukn4dbt0z3ptpw4o45exublzsg50be4xy69pstvxh56fas2urtaj31rjvn4jdxelk6y078zimv3',
                flowInterfaceName: 'j3zelpdjig58tu2rnafyedev6ifabzf7tgivydkpsuxm5jwrftz9iaupxilflinllppm6ymxzle6mn8r7dh2khhzay52nvic84jmsubv9necglyok47p4vfkiokt3gj82qp6wmekldxyhroi6tbeqh93orfwimq8',
                flowInterfaceNamespace: 'yh8azyj5pjbpu1z2ck3akp5tzs9b6t7g439msxuj1nqlcyfdcpvx8n0s5rcful67z5qye4xv2g3tu4j2qxtrob4tj5dx2upyhelih45c9geim5cpuz9rj7cixnulxz4f1hgcxjh3kwx9kumohpnemxcwuc57jm18',
                version: 'e5dfuzehpmp5siri09j0',
                adapterType: '63d5dnl045n3ahsb4pqel8l9jzjcotun2yxkht29qtinrvfz5qkigze11f4r',
                direction: 'SENDER',
                transportProtocol: 'woi9s3zzp1ozbrk6yfc6f2d3lgta27zmscou3oze8qadl7illg5og44w36kp',
                messageProtocol: 'xqny9fg3dsnnpq8vnduhjjph044me36wvfapwoblu7gatyioxhjinlk5lllc',
                adapterEngineName: '1ce3m8jk181ycytpkfzlgxa85a3rg9yt9zisa50ojap1zvjg7r7bm2tspmgpszwv3ha5agtlm2ml00hp2f0sfeszx2fz3zbdilpzlcm6g2watm520gzgckl7u0lmklnms762ggpbys8vf8waxf2at0n07cdt3m3b',
                url: '7hde80ag8w4x2ul7hoz7q6ddu82vj47ua1cwpbxbft6fpw5f360pj9x2kcenm2odky6ma2ufzhdjw0b84kntxy2m574t4lqu0khm6rov7t6bliknt19tmawhk45fdgr29kw2zcg81mjwnz3vu61ccey91ml42okvplbzeqgkvk6ukdkql5n5wn5xe0wzvg8v88aign0s12gkx194v233z3a18izoo2i9la93q99bdq66lbi9zx5z230iv1k5z814whpsfzpz2mkprcug78nu4bpfctxslbl06e94yyco4l3a9aofi44zlfiond0okcon',
                username: '2nueldw2hqyophpq6uojhhyl8oh3u8tlfe6nu5pc96ku0cwydd0qjohpz2af',
                remoteHost: 'e5ch6nae0ujdhh12fskxplreu7iqfe60ko6as8o0vkwbciudf6ssldq7df67ja2vqg2teyfy9d5fxlcv6cw0iipysib0amliya21lfi780yt0zd84adebyjl64zv56cuw4k6p9vnzszvfn9gcz62jffxlnrd3g9n',
                remotePort: 4425564226,
                directory: 'l9pc1contck1uvzx7c1vm1xb9e50fmq0orntk7d93tpwgjfn4tmyxqm6rrnr5ius0zqr1l511htlfm02i0f8crekft3as23anjnfigkfyyjw90ircqhvjkupb03andqqen1mrdoj5mklwekia5zw7gjgn8b7938w5o25tmepyoz1tk47nr0qx9nq9e28p4om10ng5tnwd7375gmazyzlvvpvj77rh212z8wsjjgw42nhh3vdszn3vn6v16qz7o88u5i8h742vixckicvwmqbclnxiirbcd44qws7bg0s5gb12vihzzrp0ualwdc2nterntqvk20p8phr6ou496q7kdkg42pjj89l4wuqinmma9601306jk53xy6qkxdct88wtjp6axipuhr40ll8xkoco0t0c275afejk0jmk8e37stio4osj2pv87vi5ztke6b80lhsgu0vuadze4e4aix06pryylurigi4ynxgseutc0rlytpav5zuzsejytto1wm2vw0piqhplway8c8vjcft2bjnhcmuge40a6tnffk36lqa0ed98rwrdjkvtguyagvh3xzl3v75vla7f9bl8gjlxxhswd79bop0ism0y0vencopilnwg96bolqpcyynr1rcb5oww9nvj8sp8vb9ou2d3iqpfn6wpdw4bniag91izdnkse8birc3wqdxcerpnmw225ez4pdhgj67cjdng0i9qzmlx6un2gn581ot5qw7a7giaq2q11lx2pgpjiaz8z9au6o8wygg02u9jtsg1m55xhsfmybczzru6jae0vtw7aav55sng6of63wr2hia4319kufcuclgq1vry5lgsh3kuby5hjkkclszd1fzgigh4gbk5pdv8c2xalwvmri4yw6k5jws56xdk0wky6gitgndjms31o4fz1oqlq6r2odmtcsxdlr9unqixu0b3a8x0gcbrpnpl0oz262mscwyonge0quba0o9cv9a0oxfskpmvbglcluxsaj5x8mgcumnjerb',
                fileSchema: 'u8khj8qfmk6acpulviyucs94z8szqlbumry22tp63usti0zdzpvb82y2qofo870fr8ailtec93dluzouvs4amtcmmfug7adxw32vn9zpvylhs98g6bycttx8g1vko7bv4f011wzic60c7u5mx95wbjr3yuaddakzbmq8y94se0nfwbk1poq6o2np59eh55g7opb6a051riv7zatgc1tp794eii1xsme1vptnnnfpgeu4pp69pps1cplme7f9fsaa2og05c3zuzgxyvqjrow0b0tgve709t8dc7x4cjo8u7y8lm60jt7ab38sfjeohpi36pbvl7lergkv5jvnzp4szimrlvnsd4l9jrza08mszj9jmvt1nwzlhfbvjexrg0tedxl3jlyal9xxsz4xxqn1s4pi1yosymvap42fdxyzqxcnh1r53uo8ljbg3slhg5ylro9cdp1s1pj40fg6vxtvvx4797fvwgn1vhw0tpl2cieb87dfeh9drvi8tkx10mf78vuwe0qvyrh0o5ojd827c623lkto9celqsn9l484yvhh9psqbtjj7p5f2mnazwqdjogi4w9jleocp36zrszvwfr29azr9ejve727pmsogqr6ics2p8rh9gd0sr77r27zdnd0uyqeqbrybslcwxyar58t1j2fk3ypvzrlw2tof8puhwss5gubfvg53pby9akrbxkkhyt6yanjcstusoqnokh6mojtecnammreh3wupctxpalwwlznt69vobqa0a47t5qadsd0mxajqn7xmzuk1cluund8kysl10011acuwgnbhytmp4n7jzn50wjo4od21nzmdvfimlucjvio7rvz2ryipb6v2j766hadpnqcruv75mgwshftch5tza8yg18z4716u6vw26lt5fj334uj2u213xoc61p2gua6d7xgn2xac57o5cdgmzibhn7qvp7w40ran13vah69fvqjuv19cr4h7uazpo8gx1atn6908o4rb67hs46uxx7iaqssutb5',
                proxyHost: 'rz45cq78n591b5eg3ky0lkpii7b5wbtptacwtviza97ifq136mcsvirqncv1',
                proxyPort: 5203333160,
                destination: 'sivlutpizo224rfoszs4gj9ef56z9qloildpq4sax3j0zxesa5z3exidgbei2le1g9zow22eklgvmr8jb8tzp9jelrbhyt2jhxtvpmpn76ri4as6ef0i5eau2ggjtyozsvvqhfut5rr54u1adcyr0ngqrhpvo7rj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zuuckntttaxu2i0p5yhnxd6yumx3yulk8fwtkphyzfoq6m78wtm8oayeg8oxj60yd8dsnb3fkzd3s2bisivca4ihuhzpyzlzo66ph72b6azemd13fsg5f2vwp5q5jtq5zz2jnonj9pj0lej2itdg3lyn3b8eqbdy',
                responsibleUserAccountName: 'h9iwjcordrun43t3sw55',
                lastChangeUserAccount: 'rt02nzb6nzvl3h49ajqo',
                lastChangedAt: '2020-11-04 10:05:44',
                riInterfaceName: '1lhv4om1wsfkit205wk3n8g4u2jqvlecgflln043eol63w4n0fdho3mian6dhqna0q3bv1sjpwqw3jsuyelhfeeo8sn2qy1pdfkyvb727p8fxxiq6yfled8p4wb3oj3n1pm3h5yt9cbdmb2nk7r9sisfpqm3g8bd',
                riInterfaceNamespace: 'mxqepserfxcmx41hf0l5s9rknzi38wefeedtgu50o7hankkoljyhnii8bsgnj19vmqybx0a6ubyhog1evtm9ozqpfya9dp60eplqnhex082shgduk9hqj6u8tw3vgaqy4p81pz4t8ukjui9pxlyysgddz7skqsi2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'zi3o4zi78h98fvyidaas4ygvr273955o0xrn5ccfq',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '5r8yrmk6gdke2avwdanrblqooo8cpwqri0ohdujxiudbn9obyv',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '8akhrt3568qjlb6jlpu1',
                party: '88jo2uq2tiettdqxj0r7b1dc1ai6ptof3n2uag1qh1ibjivtum99h2t3qgf9l8lwue7x5e93pqslf3bnkt87vkcon6dqjfaj9ndh0udjbzog2v5bfhf3vgen6l72w8pyfdzecvmgotdr2zhz3rmfbstvt2f0t9wo',
                component: 'kuctmkcq9gl2rp9rsor3tb0ijopbipafh7b9a9irr3haxg0rpltx9cyyto8t1icqy46c1klg5j3jachfrnoj1heb0tqtomsqpc81e4e6x4rpyzweo1nvb48cbp6vrqp15y5bhypqs7g06qf0m6lxe5smu8yp81o2',
                name: 'ellvzkex6bwnzz0bmolak61e7iysc8z4qgdya7f8ix6ss2s30dl8yc4hfjhqzdq8veo8difacujn6go3ehprf0enx7u2lxhw8qwqijx93q6aesev26co6kcdsy8qzmete6vepw152m4ymc8bq79didzy5s83lsga',
                flowHash: 'venbgguqj165fd6mu4d0xkz50gv300zvp3e4p7f0',
                flowParty: '5cclivdt8yn0ka34f16lpmrwzzttxfser02kns942vdvwzaekvnzx6hcu3zr9gdydda9ldx8gngdeyom4d5ncv938pai726ifvp8qkuvzttg28vhbndm0rklwm68i9w9qn5uscqr40nvajzuwxoliw8cvappb5kd',
                flowReceiverParty: 'ybqqpu5s56yxihqix555msia2o95vcghnxdct8e367mi84qqyjgoahk8icmp56r9suui7qrin1fk6q2dxb2ffn1hk28au2liwk1gkmegv16glxo42arpztcnz41j2w9iomai20csu0ufs8rlx9vonuzawmn1yday',
                flowComponent: 'jl43e1kgi4mlbrwbkwmdv5ufnp4dok98ygi4jbwvn6sndfhk5o3uapo4bueyn4xxhny0bqd83xibtpg2hhfsteaivyosnelvkphuejmit8uv6olpmkfb65ryrx0bxlfdbdfkptpvi5fkqlev3rey6l5lyxiwpck8',
                flowReceiverComponent: 'nnc7a9ja2cuok9bflmo39y30kp0zza46kxhav5xe9div5ug7uzrnqeq7sk35prxepnutik2gnrog5ih2nlfn8htt4z3l3h1b56b773ij5ykwwnch5vfjk8ttc9asry7whe8vxovwxq41okx7xzm4wb533aktg1wk',
                flowInterfaceName: 'yz27pn3pi21d2nvc1o34gy9oo962lt6tlylqtml5v30cwboeduxa3iakfeoubtnvstptaswrq6xck34co5kh186qefnda034yuqobszcyhgbqcdwz0zjf21k4so5l4p0df17a8l8enifqndnhdlyvd7krkaenq5q',
                flowInterfaceNamespace: 'x0tr7uz8bi7npc1u6agfncy7jrqmmsjvxjft694t02xyx6dglied9tyk8bfo3or404xs2armew71nhd5xbfme4xsgqb1lknh6mjw5wf74j5nr7t4rv0mhvo64ge0q45vj9p2p1hpcuodgnwus7zcvmm8nj35xjuj',
                version: '3gb269k5uupyr8zz9z0t',
                adapterType: '2tfhf2ciq78eem58wcqsa67f4tkm3qt7kq60hbzmrjgsbtoxww8vy7hh87mk',
                direction: 'RECEIVER',
                transportProtocol: 'b6kcd4nti2nl5fpd45axsopcm1j2jc8gv68z4z3kasqr03z7fwx4z49o7qcn',
                messageProtocol: 'xj1vxcjwe8io682q0btvg8tnuikd4yho2y8zotfw4nh5smmbbgqc217lnls3',
                adapterEngineName: 'sean6q6lezkt0v5i6uer0ch5pd7yacc8rm97rbndi1in3wgab5vf6mnczs2azm569us5lemgl51hr2rvv3gpda3o9b22y772fpji0czk0a0m4btk162jkkykq4gs2xfdxfwrlsd5x91myynvlqd8ylysehgrffwo',
                url: '4fbnv01ntdcfkks8q0x9bf8zk8m0rd0wh0cv5wk4g2nmmo16qjwiw87bvvslakxp7byu3ps2vlcexy5n5w1xm4al02c8q9uvcfddptn9t292im48g3jkogedlhzew83bu6yebnel9o0te1kae50jznz34fa7t49kud4z5k4arb3jqwulfrmgzsrknqodhfa1wxqpi9mol3kpz6gvbmtncsdvhbj390gh5lx95587lhthd8p2zxymjnchw2qw5bgf7k9towg6k6idht4g3ja99pzujfvrbgof8cj32ic9f328j5jl00ojp6yyjdi3c77c',
                username: 'h1rjfbgwdt6ukjgi8xyba8zsp7q0ysgv9ixwv48wgho69ls7x0uknu0qf9a7',
                remoteHost: '5c40ocrfvut88srnadca335fis90w0bz3x7cvicza3bd1v80qqqk0ez7i1yc0e9fr7g84db94ocfemoaeaghkw4zsa1sj4iltjoi20kfdzesn2kho5frytwy7loxoxk2ntoa3yw4n7lff1zvddqtqco4i48581m4',
                remotePort: 2742673340,
                directory: 'g6ycc08ag8mmue4iaa6lacsdr9baeiyj2y94fgz7wp88ieeogyeq2nlmshu36subo3h7tz4g18sh512jan5hehx1e8d6aowveyzdtvoh92jl9jsylu5rwrdi1d7t8f393mpmhhjp7bga16w8phwvl5xsjv0pte3cmydjrw10o8phr5aqvhajg741mtneacv4x8mv7flbmp14jbuxe1iw51pa0fbmdds3zjl33b0fr2wp0f7sfkca40rmytivq5a6owiujk2fzr8iopmdj6ubk6klb19q0mokshb2vnuy9g4aexj0434ncx5mag9rjqkhystgads526ms5l5b7txb30lr1b8w4lg6hp53s61zdmt1dpor6zhvlb8n8jt7r4xcuxbfszd2jf5qxy13o7aiu20o7rc3rjzbgbu54qgzbhpv3refzkrianm6i7nkmeixlk2q2m1qakfuorzxq9vqn2tcasvh1jgx0ef37jd4x2prdrkhw6u0warj9mxslu4y11r72o6v7p33qol5cxahqbpuh5dqehadkxhnbo6ywogapa8pvqdmyjype8m46okobulfcoza4tp35l7jjxk3q1ql2j9gu0mg1m4mn3uru4shg2ecr9vrk61d3t04ev7k7ul3jmb9nuy5hqhdk0ba7i34s00gkq1kgel97fsiwkscqbf7vxlo6zwney8hkjz3xj945x8wr98ttr80txa7qjxoeds7z9hcyqvkdcnihziyml4c3s64gguif4f3e0dqfh52gd62pnc6lrz81av8nz7nykmkuw51wsaa0dgr832edpt5k6oukz8245bo8bqph76zpipjh9tk7to236dxmbefcgecu3l1cgf2fizq33f73gwluuvtlkims86z6iq1rpax4nxonbekxf4t14dph91vgb11skqb1pfhj3yci9dk5kx4lnw3mkha1oh1jremaguaq73zimvda48qbc3km0kibs0d2koqbtk1o7kcygnlhxmchh0u69nh67pk7dxa',
                fileSchema: '1r2rk8c96dvdm702yun77vqtbd43jl6uv2fllnr60qm5xvf7996r2wxx2n0nuw8zuhg7htmdj5sl0581qcbirjbg0dx7gxegk2rc93be0aor7xetae9yciiga718mb7huw15ysho1jb959471egeb91f0r2ermtsdyhyzdqgt2bel8flirzyfj32cf0dpcmcqu3lgtx5jqizpr90tq3ze3w3s80ecxcmczw37rdehcnf4qfeunvhvkf6kmz9wtahbsj37bdbvv4eyfv9pvftk09jr8vea7rho7rbfmiyjv8pi0v5teiybaqky4jf33a6uavdi0n19153x1olxsg0qhl5lypgg3aef4opnj58plf766rz8h6arpintoghct304svqr9d40csoe3d4ysvtms9qy8qfbyybogjfv7s94b74ezf9vaozh8210ixc3iz0z24fur0ia4xp45sc39lsya22avwbjmezjjlyr9s5sbqr9lxu9r8gfyznyqnl1cw8lxyczumvubbor0v3bgl227a8y50ptfk85zdo7cnfu8dhg3d4k9ki0c5khtjui7l5fy8xrccrepj32qgkldnbe9yl6f15afj32la36mnlt9ozyn9d7samzptnlqj3sx8gfk6w0bw3livtq53ii0moxmf0ycopj8pn67cooy5prno9uoyabf4sdznfvsey9teinpmsx9wr569qmmm0i0qbdu5g4malb8r2yugqyrl6dfc6frtlq0ofnnkhwqlkdittpb6fwhaotgz8wlhlo3ptderxdn44cciszfro1fhexd8cic3petolfxlr0ymeoj1gcpz0n8p6cz0i5xpau3lis9qvanq75jp3zhcbmce17ke8e9ig7ph2uwx9z9gbi5vxo8deu7nw9itzovjavyo07xl6cxzixb7o45t6godej3ld6r6z0ad7iatrh5y6jhcta3dwux83vz3lwpg15ho5cjk57fiblei7e4ktsef747tf0fm7s037x3nz7vkpqzgl',
                proxyHost: 'ccbqqilcbwrowzhntilryvlcy3plzhhhlt4p93hdth9ttgoxqy4wqz6fok8s',
                proxyPort: 2611311882,
                destination: 'twe8kvbcnrdve0h3vb3v2sl855tmoahi0nt6ycht8qqko434onc21tuwe6fwjuuoy3qgv7yiohy9must4y4hqabrdfl1gxob7g8xulok6o2w01nv0iwji4ljqbu8rpsbhnruz7ylnvdt793ghpayxdktvpkhd66n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'aqm3gvsxqfwo1sk0ma8h4w530j6powhzsoe4hhbsjopxyja1246b4z5tzahercvg9c0qel8jw6ceqdsmub7lirn51b0sy5zeiw324461pipxxjefas8qi7oxu9pomtzpz93744dj3kbb6e1ifwnwyrghlsf4zrmv',
                responsibleUserAccountName: 'x0zsoj4plmmc93jk3y9o',
                lastChangeUserAccount: '68z78cb1gg5d11bjqgyy',
                lastChangedAt: '2020-11-04 04:22:10',
                riInterfaceName: 'uu897um57yjq52gybkiwesjcbs1bm4j5r2xi87m78bgk8xir1zy19le2x90wxcx43zuctb5j7wcbmtp1nkcppm2p0pgjfw8o3su9c8iftza2mtlsa4b802g2fdc8xt7e7naie27xyk7pdx63222yli5g4qptly2q',
                riInterfaceNamespace: 'tn2xo8veupr3gvv3xqzbnw45zjm3tqliymfwsci3rxzrvytmx28i9xhdi1wketxzkgwuk4xe6fz4dcri5pvvtlikgji1qo525vuhtgakyz9nd68zqqc41z9ktqy1z3yronnqtar0uefms951qd8eq20nv1jpuojo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'otd0dz7tmdi612me5lw1ty4a0sw6a0ilth1i8i4f',
                tenantId: '8jiyn19w8in8i9wrgk15uw2wlqxsbokiiski1',
                tenantCode: 'yozchxnazbg7ryyxi4pbhl95ckowo7wzk5zqlmurya2oreskx6',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'wpz5f0ah8u8zu8uehs0h',
                party: 'sznx82ashgmtokj29lpuzhej4a1st9mclumycjukkmkzh52l0bsjz5aofrpt57pec4bes8vr5a4878gass2b5fnwwq5icjqsr97a10hddx61mh9084umxgn544pe0bl7p1yadorb2jclskwie4a51nwyejv8fl9x',
                component: 'gjuqqyw3heenv07g62wwz8z0o5p5wt49pllg8amtinrrmlou2x6jtj8k47s132fa1ht9g0dru3kd8owvizny8j1gryrhg9tg9k14gbpt4dxk93051jqnc2a7jw9rehmk79b4u1snyg5hdn9h26o1a3jzgyexhg82',
                name: 'xkrxzy2tg56x0vezf7k7uejwx0vtdevq1h6s2hvyrpgn8ico3t9d3bgspkbpuwrp4lq72pzu4e56h20ngvj69mskf0bnsyaemvog3ctl58g1b3nwm9d8z5w4qm1fdhclrmq9c17gqehugrtrahtys1lvbnaw7ueo',
                flowHash: 'fzhqaf1dzuqmsn153s8qdgsgnk71zfgy74e6f531',
                flowParty: 'hao7p9e6zuuuydiofv152muts0n568onmcwp7nov8qxouolt9tqbyg3zlgszqvu0hhqd04cqets81q38sd96dabohlajcoui2os916hsg2a2c4bo3ilhvofm6zxkpp7xtd8oazr8yuuc2l3nqsvwqipn0thj3d3d',
                flowReceiverParty: 'xvsqaj9c98kmulpu3twua6o43nax9skkkkvbxndoijix3svz0u7zabn8i6x1vz3hapis4388k6ncgt3bykk9o2gfo3l38i2h7q3m6ldkfhvpd80se4zoqznpj843ggu9ppmwoopu3n3fo63yyw4iwzzojdkbwcbp',
                flowComponent: '7ffzyi4yxxss7uvg93qvvkt3go590m2d835ia6fvt15kjvg5q994ppl0zqwsrcw534zep6mdt9k7e8i4lzqe8v1rv27l90um7cpzrm7e9fzp7iwi538f9wbyax5f9zbb5tqalxqri3f1wv8vuz1zlaju2oqco2x6',
                flowReceiverComponent: 'okys7vxv4hi1t49mkvw8bckghihqvjux07z0o81js2s6pio8b3n6zyfek1x3huketvsyczan6wazp3592gszksd30w2r6bggrcz4tojmkxi3yuqntt1etfi1le3lwz9ny5lsmvnn4kf7wwdvwzpa8takxakclw8m',
                flowInterfaceName: 'acfzms52101fq5u5lkoezq8z7qkkfjrrd4w18ksh2kgzmo4g6cvilxcn9rj2a40kcgpwjdos1xaofce7gax5tah7ye1uf2utshmxsjcgrfg7ubxv10atxpvjo55il19rqsw3kgd0aotxcceg1iu76mtgz9id9b73',
                flowInterfaceNamespace: '472t3ap77euglimtyvj9w9m1run8b57fjeeodcmbd6irtr1obk58rsnxfrbo8zxp5191vkqbt54sutrlpzpci9ie9pm533u3yztyyjufl1q2tb0sb59xjx21lge4ujde9xamfgcc7o8wyn93927q7cn5tqra6fmd',
                version: '5kbau7tsnrtnfck9s9lo',
                adapterType: 'fxga5o3qo5riuhz21zugbz6lg6hv1fp9024dmjlgfqqecwqi1hxpiyme0i4q',
                direction: 'SENDER',
                transportProtocol: 'axjfc7eelbzxadz0wt4p8oszylhvywvan3beqa1yt6y8d48lshflm881bwmz',
                messageProtocol: 'pnn80upcyu0bgtrtp8go5j1a6ath3ol68v6pfz904qwus1g53zj5h9r6bmn4',
                adapterEngineName: 'w5os4do3qusw56w77pb8s52bhzr6w5rwdyb17ikf90wtfe7ouwr5oog6rzzech9bpikhzt069qe06ciq7g5p0mstcea0fgz8j3whst24s4l5mjvdowd01lps7ahean2gxlsn9dypqk9zbilv6sxh7x2zxjog2t7h',
                url: '949t0kyakfws37m8wtpwh0ciuypkritj4nxaq0wm9lx1u5fslw3z4rtsalhbt0zru2y8tbg6r1hmg4bgwpl2g9wq844vr4kj7vnb05hd5mq0tlzjemtrtfelhbm2j5ovfyu2avscpcvckvm94tr2071qxxep6qjku73i4ivn6bd3lruzcjaa41npd2bs08047mo1cyi6bsg1pmq5ou2zf7ks4y23ce0f9k2s7lhdaij3gejindsbrnsep07gs6mof080wj6rbvp4rvi61yurao8mixwfdn4sfpcehnfkgbarc7b7nv4n8b0y8rnwdqv1',
                username: 'lh33ab2pngt955saq5zh7goq3xktm6otsl1fez8iid9u0sdx2gx0f2xlg0o3',
                remoteHost: 'rnd66r515ciilcvnnqouhfl8i8uknef8hlob4jj8hikqncoye089jt6ifnqoqsj3hmj86gj81n6f05bzzdnkex1hcnimg9bvu09ttwhza1gi75341pa2k0oc4ihfhyc3zlqlicgyh71qhr10z2hfjfpfbbzdqykw',
                remotePort: 6028054731,
                directory: 'lz2jjf0k9qlizi55qqd6jgyc86eugz8ih1015llvlm6g2x90opoaxvxy8r0om8g2qzufzkemzdjbe3byptcrl1cot8grp4q1oblqs3fdxz50pdts820ufsu2vn7xc18a1cjop2ut251qr4xmmiduz3oiy3cgdn8zhen3qurdgd6lkg6sndcwoiklg2b7dmmwhg4hmzl65gh2ql9uzufqfxt2nflli5c2p7qx844k6s1gurveabj5nxwfxzfab6qovvidgpi3diwnf6fzg1vlran4uqexpzzq5ir9gzpw170i6j9vo4k2im2m4hv3y4yoaxe92am8he314ir65ew2ga1fnym8jxzko9jt7tviviq7skg8xt18066szyngldmx6wskuu273fzuqahwzco7v7g9a2n74bpf901voachsj3sfnjlfdl77187fjf3ropu8p38ons6z1d8lyvuqwpjr66gaz7svc0nnov3p5ga8uqobnqcktajxwurlcwpqwkmz8g3i22raa9dihlc6kj107fktjsevwzrg9svy604h65me5n2e3jhh6doz542gx0su2zbkc65ndmr72lk2c1jyp5aqp9zxiubl23ndkmqdkrjkzlu95o89e8wak7ggddx7z8zs7kgzbmcqhwl1tk2y5h2q6dqh17myx5qi9jdxuwmk6zbl6y7qdbkr5x5w8odw2c79kkl28ajnpkab9yyle4mj8pc194lg1vnr3sae4iofq6epj0qmwwhpbhlsd90o34nif3rzdhcuq1na5j71x0fh6ur7qq3apf27w1v025uldrfoce14pd8qsu0wc9sngc9h9f75smzkkejvma9nyknouhgn5dh6c7pzyq8zsqhbboobfadgn3nz13hp7nu19yic570y40mbr4an0u6hpgiduj4rwb0h3m6lcku97vdd40kwa8t754grho4e45hfhgqx01ihuf8uwau8wps6mvds2ub2km9wiba709k6x8jsbdmvpx83oloo0iixc31',
                fileSchema: 'z0vetiwlejuou2689ab3fy5yz5gypppp9sznxjw3wtz9bdmwx1h99lpfxqmg8nuargokdvw0h00h96jacwrfn62suk565aftggb3qmi1btbegskty2zkhdtqezxafxz8rfoe65hxxhw3m8d83xa5uuzl47cas3ks2hbhlprl4wgpa7d7o0vdpvzlrjj1pr2fuifc1r2xa1z6emc3emda80r81iqhb7qlqg2dcql4lezht7l3iq6ydzalmwbph4gxmjpgbxahrcn3ic82tqbx85zh6gn94tzkp08zn8ogj1a6lr60g4844knduoq9vs15oyct7xwm4rsk0fuq4dh16rltaoa9yxpzfby8axplt7vzd84qxnloh5txqc45ub9o0vx9szjktjbmfha20rhz9u6dna6s9u69t7oar8fvdkzol1z6696s54n6nc4zdx757z04nr6e8vvw227kxz5slxwmih2nuiav84g1rkve8jbh7ygs66gkyyqxtf79iciywh7o5deh0lhedwnfl3mws6ikabchzrdnxxqi5hvnxkh3g1ct9y9c0azrxy5uu2cp0b7tfqcs9ljsvgqz1sgpsybvknztxsr0ypqbl35ia3kegfrjm5fu6fesur4vbqbtue8i0hppldk6pxwf385pnf4ckm0dhr76cdo7huq0q408gjs26cz7xa61xjyx8k1dhrf0g68m3ltqua3wpissx5pyfnqcny04uk9k8nd0la27vaiod4ym0ky6hm1sanmixobpuf2gnixz6wc11scnshdh5pxdxiocb4hh5sfk5e2139is0d7lhjxpvnf0rqrq1yfmf73mkd2a0ebz3qp7iws0utx6k2o223ubckluor15t2wzemkjv5j9a54d6wd52txbh67i637fzmipm71i4aqdqnw9en4hl2uoknyfbhpctseui7gzvk02divwq2xs3780t0uipofkqqsp59ctsteaug2wgh5pxto2avg618k5pzyhte2h4elxhavucm8t',
                proxyHost: '8nqhkswilwx37yyye7az6sgtca7virwsrk0u7lb1zexxteciur939f2qi5z1',
                proxyPort: 2153486048,
                destination: '5yudh5h5acr0hgc40b6ct04uojxmrasrk9b1ucxl1j5v3wprr7jeo303apqbc6b11tle933lodjg2zybsheo72u7hus2dflsz1gl8s4sv48i717dm6pdnjcjz9dq63kye6gca9iwjg50ty26pd0zfjbxkhwnkp5n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jkw9y3mne9nvow0e6arrajbg4n9dkk39adgj31v6bmoiy8ka8cpq42snoufkjz7rlu05ejratekfe42vbvipjsvg9ohjjv8118xnibax8f1tydkdcftu7kxu683r8bb7gan80vagkle0hpr4bv0q9ucletbdavkg',
                responsibleUserAccountName: 'tr7nokfs99nweexf6wkp',
                lastChangeUserAccount: 'xxrqt68bruts4o4azsjp',
                lastChangedAt: '2020-11-04 17:04:31',
                riInterfaceName: 'teu7558x6hey47hxpq1ni26d9n3dz8zcoyed3gdbxvi787y230rr91la8y36gnd9qlpebi1txz5aq77n0ts71w0jk543is4sybc3469mc78n289il26m3cpmrkca8vnk2ndkpgqeh9lb5f0rvwpvlf64tb6n2s2e',
                riInterfaceNamespace: '974a4de3mf2ep24qr4hvsw2yos9i340o38r66ipsc8att74xrzv6cnipg0czvjrfil2tuhfp8axq2i2gi5slupzn5wmc6kyd5yuu4e8kksu2jmkhfz2g22oorab0rk9bfzbleltsjb745q4r9rprfak448oj020x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'hhd1dmyshpo9hwxxo0zx8jj6pd8jkb8qqrjwbik4',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'bydii4nkv0keb5ws5j614c2wuz1zj7nktkj7mhmc7ugvz1podt',
                systemId: '6z3akuk4vhtrrl66xi022u7c7euwh09a7tizs',
                systemName: '0wnm3glt24bfqq1htcmw',
                party: '9gp6ruo38zvjb14q97g2i8ro9jku7clniax4sq6uka73j6t1wjyvry7ghoheinqy4b6qqa1mkrktv0e375049dj15ume3fe5x45x041dr64qncarjmoqar5vz4rfizpj09xwxewz1uy401vtz59cm6g69bq7wsr1',
                component: 'ld0vmpnwtjam9rkvnu0j1jo0g8prugu1g19n1mg8dbvzqms2mrjtzhilwokjgtvf9stwv84exz34yvtuk2qbpepg70r101r1m6oi8j5yv0x9km4hxujkqasdll4zlljt7k0mo6bjyzabcw4a705xnul49iuvg704',
                name: 'cz6cdbmpfasnp8mxw23uzsw77b0ozdl8jzlayq6l3auuystqsmtrwpqbiu5g1byukdtnpxxgxavp3arpeu6rqn188lbn6a7hd1q34ujriz349d1bboan2zsyydspgo51i9g9mejykapvdcawpsoe8pfthu6qcxy2',
                flowHash: '8bz3n9sizts9cc7jpxw5m9vkly8f1nduary8zbup',
                flowParty: '8y67fz4rtpijjd9fch5zixwip9w61srf3j5o1dl97soalw5koumu7uo9tchnzcw2gu85lutzn10k3omespfucntzv6uqp2vrs877zhz7pf0jlhtr8n52gm7t6cij3zufmkcbzg0gox743tnvb4glnk8dci3jgqbf',
                flowReceiverParty: '5k9m6yisy9gh2evim1f46sq70spkmdwabsckbxmf7qsefo2rsxup9kr4blo99mcu950rxnjvsei2gvyflp33p9nj3xan4g292pr5uq4x3czf525yt22czmgvho36pot3qv3az8o8a2h30vos9f7i80bhuzogb6qy',
                flowComponent: 'vw2x55x6bpmd43c1t3b6dsa0d85sreyionnb0bjhrmq605fg6swkx15dcmhfx00syre4zyd1srgjiclc3cggut86gxjn92n3ef2bo0hc8r6kz609deele7cbw7gcx6k0lmiiicigo412a5lit4w1w2t3t0o39zdu',
                flowReceiverComponent: 'z8tdvysk8fq8x291lliw3tr6ctywb96uhlofjnt6j4wgpiav54cx1cube54091mxgn7xzrwm77cccbtttelupv1ze0omouth1xy5voibc95cu3ze9bthgtru0ur6qd1kiutx9jp50y5zlpim0a0psrrade5j917w',
                flowInterfaceName: 'x22flhayyvceud3nbzbh04bq5pvdfngjnmkpuga5hshmgsgiyla180ddinvfopvxfcvmmp7uhzfa7xrec24jzrbds7w3p0bydgqkjcti1vhnxorv3kpro19pyzsuwpy306ycrncjdzlbaa2y727orvgns1mpxfgy',
                flowInterfaceNamespace: 'c000e5sr8oldk34j4r3kwpfk4uuntnbctrymodlndbocr7d93ar3f0i26znnme0ybc37p63dvhbj9sdkvog37ety6rph6d2ztd6piziwvqkhyejtt1lbv1awc5bzxty5vue877sa8d0ozmxtsaag3oaa4os29a8j',
                version: 'bel5pzb1b8q01om3csmr',
                adapterType: 'xrqiwwy2ryc6np6uw6q9jhomk383g5vzgk06uip3l7scfyl4evt1vl540v6j',
                direction: 'RECEIVER',
                transportProtocol: 'vwgde7o21v7306190bs1p3unn85cb6jzpyyg1bs0tctz4toha52e37whi67d',
                messageProtocol: '39a3xg7ze3rfsd3oe712a4y1e4wdioc5xuec1m6685utqs9od2hhqraf5p14',
                adapterEngineName: 'ir6ovxz8b5qrxgmvib6cx1bwn7rxthxyhnosaeue7yk1fnzhho04lv81sq3ovfef8ntrz0axfo7ryah5ithuma2ci1lfgnhn9uyes4fztsemcgbckn29xcoi8bef6swo3vhzk4rymcjnqrd47lkyvnviwvg1ttkn',
                url: 'x3gmkvfa5peuvudd3f3rtt5w60bt3f1pybt1tlv9gnpm070q25rs4ztbfiwomlojar3u8cg8zutbmw39ij37c3pwcxlpa0p0ig1y9igz8nhof4fha051x5dcivgbr2kgpnk6goze0b2zt0vg2s5n46cxgphpik5tpnfpj0l46k0ruyh8zfe5x4b7vzllr6zhladf4kbck9t66ven2l119ek51g3wkx0pbnxagj3n4545gwt1l01q5ic5m5m2ckyfih816d5v76j7fri8bw12me79syrh14773ndgd36sbvk2c4mnnkh3bg876wan3r0y',
                username: 'dxcp776825kl2meri6d097iurkyk8qruu64hfj1pddh1l28t0t7z8duqba99',
                remoteHost: '9tucannhpa2svrwu9pm0862ba6m3le091a2jfg30utgak89gcp1c47iudw04jlicn7wp7b8jq3g2duh1cvh6rlnu03q4v8hiebg1hj4ata3wjvb5ktwe3flk0d3itfov3sb0mmwal96qjatpzgmvq32og8ltkshn',
                remotePort: 7954883498,
                directory: 'u1ld6trbbeimy4s04phz0dg1t3b3j4emdwo452j8juer1r4z23xt10zl7e7pqjwy6zbx2q23ar9ysmmf359q47azir6is2svtv81br2ty9i4vivgrkjkmd6rgn570tvztyj06pud3fnfd6zl0icxd0hqk0kw8folyllzxdhyx5vcz5cb031i1ztfg73vg0ubkb80aamlmqozwuld1fnkvpi46sys0ae2bjquoxp9p3fg1kxnounjea3ohwmdjik0ipnn3upk3kw2suk3kxtnl2hdm5pf25j447vq7p9rxwxkf3f15lctbyuygsl8mmqcbei3m1qh7eodhco89ui0usgtlcnr0q4qxtukm2v2wy9y759nvyzy1id3od1awwzz3ryjex8pdb07lul0amsfl00dsaz1arby64lkvvbebvyqfjl5igkcudzzrn5mtfc73e5wti2p37nzn6k2dys6wrfkof2tnm55zybqjihdw1wbtpf75y4b7guwztnwridjwjtha90ck4a0lwxiat340v70l9gcx8z2txfpb3jwiesbk306uf5gtwjkeexpbg9qc0gwo85jbt3t27b9hllcd0m3yz5y8z270t62tgkpun88gpzd35r99l3fp1jjdpgflgo0jtzvmqrzk59lcff9oo8dx03qfma14wkyepfzqb31xx04w2drsia5bmzakici39xpzewwm2l24kzjufgiebpfanjtmps81yal16lxokhfoliq1xz7ikoaea47slffv3zyddd3n66ml2ntqcevuly9tab1056ki119ywt3b5lo5aug6kt06xnpjggyappcri3rw7qdk8xris54pi7uy5xzr2d301cpfcsyrrzofswwxshysdaduycxf6ez8yfszwmdjvw0gxshkqwkqt00qi6zlefe14dna9adqnowvzdt6talieep2f5a19n3biiv502s32ynnl5tvj13warspq11xpdzz0ge5qx8cc9v9ycbqerjyvua83yeap6hdmlw',
                fileSchema: '11jcrbxg5gg953zlt9xmpgz6z3n12dw6apm57pyq20sswjcd333h6taspssh1s0rwyz54rrdrppg3cczn91qciyyk9qxqbvq8ikxnfmqt47jms2ov5e54jyhmclw2f8raz8cew3aktb8vxeghwruerg3dffividg8w4o83t0nmpuvj8uwjl5uf5c1xhudb9290a7lw2kxs55maf5wo1u0393wwfbfurvuxvfxltw8pismxply2ilaeozkd4forfd9ev7km9kq7ocnj12hdbal4y7oii59epfwlkk9axbsirot084ov5ivf4s1pdstuinztowf8yy7lezj9y2hlxamdia5mbde93dtroafxi62pd8qtcxl1iqn86nq7m54p324h1wn5azzhqfo10bafepoyu6jzefrhraz6an1rjkwe67xcl6xgbjh434nmk4zo29ld6p1cce88uyyzwv88synu18nvl09vttu496lwl95qcs9ytxaq5d5oflk5maqy06qe88sfhnejgv258w9luh4hc2dfu78zn3takc8n2w2y8ayvzvty2wa6l8hybhnezt9x9314n2g68qgtgdu7m4w9xx5a7b1hraiheatmpst3wlzygmw4kp2q2zpzyd4itgd9wif4lh3dbzhnjdce0nz0behzqfbb9r2ob0zghpjec8zr8kiwp4jlcqn74iwbn3p6j880kle3m432yf2c9ojayzyrkp66dbr28ex19t6ci8bs7b9q3n0n7azad7yhfe437t4osjfd3sr528moc1dwcpi1t5gj5bopds728uzfu5siq4lc596tlaxxhosf2687ibxfu3173dcai4lm9kx8j7waggcfwor80jiye7i7i2mdhdjjm5gox041rldutcpqkhrpsl4vacp37uuxon15tlfj7yzsv4zebcwtkhczc603ztns7ogo4x3lkhc59cm68nj1dcpzimcvi022sk5rvwz4l6cjfafgcli2n6fpbckn9ng1fysjyxixxslnih',
                proxyHost: '00y598lmp8oz08y7ogfb832i30eal6sbgk3d8ydpscrt90gcqnb2vq4lgab2',
                proxyPort: 6224238808,
                destination: '1m15n900ihzn6pjg2hhld2f26i0zwzo5px2v6xkbiy3n5c667kgpvsj3ozs41lop8qv05hnnqv5wfo9n59oq2zjnc5qr7jwuyurl3xc5w063al78m5acxzrl1h77fg2x4d2l1hm4cr1desuijzjohbozo9z81po8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uc2grmzpjdikqxm7htqjdbhu603kyzfq42xvh839yr8wf8ttwelhmhg2lryjijtw1efzyjv9c82h4g1rgsl7qvhqlfd96xfjkb1ar6vvz5buc563dwfndgb4g3ropwidra9mxvaex67qk3twznrr660n00pzt8ta',
                responsibleUserAccountName: 'njd8522cywu4u5vmyhpf',
                lastChangeUserAccount: 'yik4y1hff4umkgak280u',
                lastChangedAt: '2020-11-04 03:10:14',
                riInterfaceName: 'aczmwzjsmowzl1i8ibxq5ibynylak40gk1mm4of8ln2of56syw1js42p9ud6hyae0uaz6rd5pp1meqhthfn6odil072fhs8n5de4c1p5z85bb7ymtkg69ft0zgrcqygmmj7x9bs3p8993igf58ynb7cu7agplgtz',
                riInterfaceNamespace: '335s4fvvw5gn9v8fxod6pmk8kk5kqo4trbp9qrzx7ldx1ve2alik3ad7x1u6570ti3a1hczyws5e0gx6mukiv6wvv2lh1lrnduzli335tbjjvaszdir1azow5eyni9j9kj2cydfl4peng0b6we3lvr2gtemh2f3x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'gy3wy0uz2goutjsymbwmb5bgnqmvkjd52duhkvzs',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'wvpe189ejm2bndg3s9fzz1pfzjoil1oxy8gl6yu55qu8hen7gk',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '843t3vb103rvssepa5tf',
                party: '6ype229ez38x9eu6osmdxn817f8vannb0zggtex072g8rruxe6mzyg62qbzu6ifshi49folbto55qpxijiaut4kqojythan2ugw56jexuti3aptlw83zmbwpteekv8xupf34a9v9005pxq77d9vvqn44nvojc5z1',
                component: 'v7iyqjrjihy4ndogjxdm3ndqkhh3petqtir844mdebb9huum4yuebd2q4x72eb41jz2hfrbey4nmk11wx8f35o4sksbd1ckv9mq910u7h83kb38gsfmigzfyankito2qkmn9je4ihdpu118dt3837si9b7h4wh27',
                name: 'hbs0uegxi98upfg7dil0a1mk9z534yw8kcu26xh9rdk7gaii66xcxa23i19a410scizu211073zluqi9gmc174daxoxkwqqxen81dcq27ys2ust4j1js0048gr23q1f8youx2u8y188rs7of5a5kv17lj6yegboa',
                flowHash: 'ahhilibhv91d6ehlhem71dziscbywq91psiorkmrq',
                flowParty: '117rgcuy0w02oc3pibm3skqdv7qdcg1ov1plr48zab9niru5q2573giix2ixvw05ywkjhy95jeamokyghr00kix60uuhiy3w59iujac5w9yhnkhafo92rvo98vzwa8s744s4bqtch8y1owulnrpse5l24a08twea',
                flowReceiverParty: 'ksr907qtgbsigp24qs4leyo6y3oogov0phxxtz4fy0azrrhcgof3mb2gqcscof6acg1x61wno9dc9v9p30sui6jd8gspzfmc40ecth9ev8jzwesssgwe85duk2hhk5wiidze70zo7e0s24c4ouln9bmytiqwzvuh',
                flowComponent: 'zdgys86ou22a1twhbnufcezz3z1smn9kysrw0624rl2bj53pcnc2miomzfdprlhtfnvrf9en19zmdwb79r9isidrgni7q9u0wrteea7akjhmddao2562wuaatohvcav5bzvohke4ju4qe2l9vg3r1iqc3ssuc4fw',
                flowReceiverComponent: 'kx5948np159r7sptl4zzzstb0wtwu7dlgf03p33iwtylhtvr0jzpvkuhnhkplqydtxj2ophf7nvf5r8r6atx3hrz9tp40jo1kl45p7usr6gu6mw2rfabo0op8emtjwz4m9i18iiym7opmh9zeickj05ex2cvd91v',
                flowInterfaceName: '5bjczoxcn03t81kz2c9evxcit0g0womp8ybeom8kts2q1jqxzv24mh1tcuvtif29w32jje1ovil847oilb28ptp7ijh389dp3oii04dle18g1uw8s005yl94mtjnxrj5xmmrzxitb6os7d6taob2l9o674nm6uu4',
                flowInterfaceNamespace: 'tgf56brfjts250o528ijkxo2wpaokixs7wfx06iwkce3von6g3uqonhh8bq3sf2thlta4qbnaase0ch4egqfzggopkavtohov8jg4vgguywppzjqhmxsptet9thw0n29fm98kpvtdncd44lr6a6ic44134tta3e4',
                version: '3ghsr4a31qap1adeabr8',
                adapterType: 'hkdvrhh1gorkd8s7vhjvl7ymmh74ix4wcno3wctdddp1pdhqgbuvbzb4ej6s',
                direction: 'RECEIVER',
                transportProtocol: 'vjds8cpfskl05rz1prpozyk4pqwnq4j7n7p3og9dxwr6j2s643sm4a5r8tlj',
                messageProtocol: 'wnor6pr7bhbzx8w9utzbgo7rs7jdbx4lt8sman1ar2ig2yhrqn8w1v7odlvl',
                adapterEngineName: 'yboq0a01jankjrnw5tsjsfgkbjt5nwhzedrd8q79hp9oqtbn2blkvx3koqgmeki3jxpt3xu2pgozqtik9f10lt6lokdjqx13fkdwa3k1pcppxqt2drktdgbf5jenl94nxh0ahnvcacuq5eklrfh1fevrqzjz6vz1',
                url: 'gledluigos29362tkqxj3jxpqjxkurwfhyua1badcdtnkbufoju4fgm0w8rqm8e1bk2nzgysyg727q8pl4ncd2b8b2f4qvbje6ns9n07i4y5d8s2mny93i6akv9x1d99zmfl6p9g080f0dk2n5o5qey47wuzof081s2zjcueoivl0fqe7cdk0g7ybiaf5x0nstq8p23d4ge06wohd0cakmdvqufl8xbn40rc7g86aedafx6f67qludjlrbkx7tjo2rox0q30eje03gdf7gx3zsfiwnn99z6iki5gbzm0sqliifpio5qnvgb966r5muqd',
                username: '8yylh9xpjhqohm9s6o0yhysg0010bu015vc671ihy07w2c9oooe6thlojq6e',
                remoteHost: 'eano0vcr70g3oedgn1pqavhrns36bgehgfsew7qk19b9916f0qtwfp3iuhs9eo567twokzks7bioj5dlva9cxnz6mqht4ugu3ieln08nlyjij8jm29aiqyte75x9h2hluzbh8i5qngc8by00xmfp4z7tvzkuzwvm',
                remotePort: 3203397132,
                directory: 'clursjyhmlarppowdtc0zql3z0j9qtem0tmyqe05jzhjribeajpbd85jpjivpfj3xz8t4ljeybjdlk31w81aq842ixa9hy5bazsc3d58fc6j1q7o7hkbsbin8pq48hnxii5rs390iu5hcfzx5gpfq2s1jzgfbppn8x3wqsz6261sosm7ru80eyf1mm2pys7mxr2wf6lpqeqo10iibibrtr73kx3fva68vdj836uwaw8g7s3y9aowe93wpf0v84gs28hnst8fxmvt3r2en4fqv31d9pe1ncld5dzy9mg3f7n3l58bb4apu1tkgy2lh0yphdxmximq6un2ltsmn9bkmquicly9nv0rxk5l1ojpzqwue8s015tv2wsdsz3kj9lnfnik4pzeyf57546uqhba1pbgbryvfpxfqslrst894xxsbwmy7aciddrbvsvffyyv4lvmb74fgw8yknwrksqhcjpzg7v0l9qj2i1isz5anip54govuo5q3z9vqbpqy7dzaum9hsua68jd71q3gau54re6jff3q2g0t4pss4298qfvp827rltkmovugew120i4v8hm2h7uormll7xinaln87r2tub8515ruf40rn8mmhvzfbou6gyyvgihrpmhtllhgr8vzm3hv5uucjnp36rvg4s0rr6ttont131j7em6ssl3wg3notynw4rcvw7upizth3us5vsbekad6d7bu1ocp2lvsy2qt0rr6m2uh9fxrzjf8cztfmse1bnqlr6teg39gz4paiu7jiqtl2hpn1sxa7pwig2mmhl1uf5wu84p4yp96nv1o1i5sdfvphluyf82zwdnsaar0qnngpxo2ej651er1l512kbsgaj101olhml4zyt6nv3xuqz19mncpig4hia6yg716znl0ilf4zlczcswciq461fyf4srv9o3kcxi3uaek0mdtp96q73lavivm6pzkq6snzndw9kj4poam6siem75poc0lt2gd3ggvjudgawlcqy9uubaw5mxj1wz',
                fileSchema: 'gn6js3lbe8qmq7nx76jxgoahp2lqny73joplqqecaptklqz79bgf5r5vyc0vrnociyckf473cawvgbrew0ly4nqw05vs99vncni0fctiiov97solcmpe8a8tcnsjxjji89cmww91hlz4cgouce5acdrhvrmitc76fnja6yg4o49ua389j1sv1foxakctne9fa74n3itfl6xq7iillxtvt00vccfkae16yok4dv0f9fm89mawm18j931sto7nk1u1dx5rzhylohjkg3fcmu663b73j9k1cf5bezcgi1xwyooj37tpvykxud0o9vktxbhjz6y1gpxhwwn817w5vo0h5iljnpuadlf0dsbaw7o9e2ysfhe4qgn0pta3kg9bsady8f3yu1kjhekxxynwojn5msbuha4zwxcge2ko0mskje5wytwp8zz23hp6bh4rjy1zma1a2hokh2tu3n767m226jwrgxjfygzvo17sl9p8hq4qilsabqj93ie3bpiu5ut8xqqp5aesh4bymqpsy66yiu99nbkmjrw3estcus030vpdixc536u2nj4i76win1nii4nuvnyfwcceh58oy3pd292zfe8fc4xttcjpmr3k1s1upi42oju1lhiutqjmxeaxeruwxd6b361i2yl2hs46f1vv3293t12lhspev3hep5s4olv8ln939suurgb4td94x17ogt2s420dj55pd4c6vd4xwysfbfx7hlk2709tkywcj0rkfj9j210zc1dpsqh80xc9clylkqf0630owv1l1dq388gq83gw1qkvve2uzp0bkqtka9ijoqd8qnlpqdn4wuvognu6jqv8sgesgebu0a47ek6x0f4x8b1pjkb50wxc5wur165wg2hia9ffqvocdekj2vdq8n63jdvmixfbtjdt87os5h1ca5s15clh6s7gc74c31zrj7zrig03jjn6b98b9zku2yaml653abvm2bb2k2h0tkr7pwlvu1rily5saibv6bi85q8sbxe6d2dj',
                proxyHost: 'fsdemsc3ubk1x5svyxlqx22nyja1fcu5avuri9011agm04eny4ypzk0xjh9e',
                proxyPort: 2551278523,
                destination: '47t2haqdqcm1dhdc3wzud5qlob8480il7ien5ngqz2y1wzlu3exauap3tdsas9tcxc63m0vamg0vigbe0l2e6a8xxkl5b9t5fo7eaqz7nqok6tpmke17kq6of989bnh0ihwbckhr2n7fr875di34egpbdmiywhbz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sx8ppsg058gpgwdwc36amx1kdh8h4pynr6yudlz2e83v6lrawrflp7y7ao5jogj1a9updmrmvn5r7y4d2n0ks511c9sm0w5c2eh4wo6yrffusq3419vftqxu78h1mbdxvs9mzjedlmusse8r3za4i41qgb7fwfyp',
                responsibleUserAccountName: 'hy26s6pkrwp1gvdqxgw8',
                lastChangeUserAccount: 'j5zxjgaavmbbvfzu19dh',
                lastChangedAt: '2020-11-04 17:27:12',
                riInterfaceName: '5zb38aimxvbttvta0aqnixwsbk87qktyjkj0oice60ll2wojlbltwp3sucw1esq03u8rulizfvnkx4e4ewgs5astli3jy6macxwjc5pzahlapveakqwqqln3k36sch8w0gyaqiwh7nb07ni9xikepww0g5cgr83r',
                riInterfaceNamespace: '1yxs1agql5ytqwxx3axsuasegbb06yt6khls4h77tbtyljc4d26sjfbgx7a6pjzart00wwz4erj5bm7vbq3tqzxg7jmtjjcwz19a14y7wpgkvia4ycmtklaskqultx150dradddg9m5p3gvkkagsn25w7iaexdgu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'cbcehmrx2qy3jx2t4lofcjr9tqc9lfxvpu8j3ua3',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'h34eag16y4wsddimegu4nkgcaqfq7xhyt64yobs0clv7z7fjfq9',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'ny9k4jhmmf1zopdugkfm',
                party: '2djnkfcp1nzhp4hmwbimoyn8wg5iengdexh7u0ggs2ck8rhpu3467l8wx4448cze4zobkwcypfm5nqi60mea7fn518as311h9uiwnyq1cwme6zphl14a7025d8d75iazmyjbwjfuzo5poa6rcjh8hty4qn9salct',
                component: '8d5pudc3i3va4akgrmd1okagoa0weiepvfepees68q1t4z4v9rimjghn35a2q8h2utkgzoqs7gipk83hlksqnpmpwpqw27zt3race18ik9m6pkjz0trsnuezkogx6x4msq2hxfau9wdjiflocqerf5g4i5pwv9sx',
                name: '5dlogz6vu8922zzrwhq532ypgvwjxzsp8bnkoejr0sktooarxwp20e2mypedfynb11qb1vmt5ag4oh85bafauq8gu37emr08l7xv5np58hp5qauboro93mwzjlwtn15giaa4j6jxw3fvkbtlmjhoslhshezs8kwt',
                flowHash: '2pcq8c8pyq9kse4gymszq4bbm7hxpa4er0jcdxkz',
                flowParty: 'inxplkg9brhjoma495lb774cuzjfl3w5wc4xqq0rs01rhvtfs2wx6yfukchvu7duty7hzqt7ncvn7omplkhey0z24zyfoclh5kndubst8lfimzr0oyc96g2oprx76rvt4k3ge6775xnye0i9yp4ek64yyfepdr1c',
                flowReceiverParty: 'bh5v7qcq6pjsz8hu9odj7zv3vimbodlzrkeov371ebp476fwpexl4g82skzx61kb5srvmb6c4zqjfndxr9nx6u51o1glpvp9ypvn7xui4hb6yzpq8wgcy6jcm177vy86xxdok03kjubwn593n5pvmju6t6zqt6h1',
                flowComponent: '94q5zd7ahsh6x56rq5dfj4kr6d4kwd4opwx48stxcuqifu8ppdf67nbevftmu7l1a6kr3e13oacdxc7agvd91ius7t1itx6yna1yb9e7h6xvdc9nx1f6am218lgahjhmaaw4xl1tu422j5db23k95wm91196khxt',
                flowReceiverComponent: '74slejwnpaahakjps3c659s5ztzc55mbb7quqgibg88zszpghfuuohzwxnv1m9rrgogy47szlwjt7ljruem9gdwewmfy42l9bmficiqqrt26a29gujgfv8blweihe0ar8htluu09pn6nfui2x9q5h3k2fll5v7tk',
                flowInterfaceName: 'svpuy1fd6wg92s5v4jw73n0wabcn12pptzh0zzg9dn6c9b2bwlgec85gviuzads8co2t7sxs5z6t01c2q2g1uhuljuc0ra7dhozxe81vo411tdtgqiqaiujlqevhrp0s99twiydda7uhus53v3pp5v30mz6fxfvz',
                flowInterfaceNamespace: '8r971v93qtkng9sjw53l9hpfjbz6i5mwfjpk369ewx3fta7s26o0cmp0p06urjpg0j9xvosg6gffr718lpf7le9fwteab154x1u0hwygni6m47hr9luj0y3uiidxmd3vk7qvhr00b77hmhlhbzso9lvd2324qkpn',
                version: 'svzmfmpc6l5h6epw78dq',
                adapterType: 'as9yhl1mrtj8f1pmri70dwywg1pcv3ioqwkvqm9v932emo875i49kzv0wtwc',
                direction: 'RECEIVER',
                transportProtocol: 'bh0sujxrkttz0qci6436we4l3ik8rvbghgdb7skeyy9p8zlsq5fytl1v6yey',
                messageProtocol: 'x56m4fsn9ha8dxmfvh7qdervotak13r8njy1ia9iwuse7rreqj4zh5rj00hx',
                adapterEngineName: 'hfzawx4t41l2v2y4sbw7kbig6hggf2k6qeh7hpgjgjl4ru6pdtfl8os8gpub8prdjcc7tnfq1ld1dz22rubcmmc71x6krsgrw88tflzbyunhktsh2qxz93djqq8n2cf89vjkz9p2vy0iplr78g67yfgibn906wxu',
                url: '5jiiyv84k8hbaewx5lnu5krj3n6ghyupbbmd40qc7z6yircg9vewpb8dafy7mdd7qdj0ijr7djs6oc6mkmqfrahs52j1hpx6ml2kg9twxbjyl3qxyx8qru1uajxw3dkp40tbp8u0rxn9sxllq2bku7zpvjpjsdzmixj35npfo9qm3v50qp0w5p9zbdsnh1h9xotdskspikpeun6q4h37n9spftp9k8swdqkgrheiag3yqwn8s7ok8ro9zd9t1hov7ep45b2cbjkn4yiq8grwekjmsj9fpb2xtharnbz3t48b6uo50xdtg4nkkxf78eo2',
                username: 'fjlkmggvphz3yha6jdq8w13gz4f645w1qcn0zwk66ksyrvnm5nvpyc0nxzvp',
                remoteHost: 'uvn7czeuw5iykm5vwkzgr7i0mlz61cy5i1ime277qofrmih21be0cpdylp87t46d39hwy4hizca0x4yjr8czqaxhbpwlhimxforuat5l6dwknl1wqifkck7jkjsnlpny2wvq0ym2zw3r203p4mot8ujyoqw9hxuo',
                remotePort: 3215652714,
                directory: 'did5ufa5ui7zrrtlkf8dir902hszdqvzhj2jjdnbsego8fg1vfvg9q84hv6uqnsuvlm9clb6sxb6zcht2g90jzrvjdfcc748rryntofvema7uw20ncsf68ivonvz8lj3amkl6mlpsp0fn1ws67nc030hc8n2mha9gblz5rlu3v7fd34atd3seljq06ou0bh537wg076geupaotnecz58lm9j46py3zv8j7j2dxrm66db1pkidy21ztshiillm9kmmjt3uvqfk5ikvdfufrydcnrtqwccv3anrfgd7zkl07klq7zc8tuygz1tna9463hfew9hioigy4203mbup5jmr6hwr6q8hpxo45p1lg6iha1i1w4zrviztqppdumw8jvmpe57f8y9fvz9nzopqtv10cgndmpzvy5cb935vy8tdj0hqnulhirxv98rj9ezctgjn2gvmfjrpgqqi1zej7gwhraohv1jsljm47cb0qe35hy3527ncxtvimq94tsukkx69aacn0bkpyd6vn27wy440b9kztejqeg09bo5nvkw2n7b5bg1t8ai8wearn2tt3um7savn8jhi8wep5kh9w0gmpjbud9iq0mj0j3mc9tkymbtmoypb6theyi0lmfex9trg5439rbv5za7pwiwshijxubh5r52ucvjpy4dniheu3xfyisbfh1iqbm1hpvn8025622n0q88znmmpabvoojxk5w5d1n90rh6agx53wh0ot2sfm1nxffsef7vpylvafcczhzgr39m2fra8bslo087nu7mezbg54i5rikjfkftiv5e0xcwxjfgl9xez0m84l1mo5hxvl602k93juwk7ijrmlm3pv1j0rej1m2g722jgtb05y2kf2ev54mshuanxkpb23zqvxpyygnuyj9ammhmmkj39y2ryqq5a6evo5h3cr691u28l3wkbvv5s75e1y1b8jottj5gfmogxhy97la50u0gmmuforuuj5bnnpyv8igzz9bsnchobht2y93crm3j',
                fileSchema: 'n9fdqs4hcsz0exnisv83y8nrapriopauy2xwhdn6l18iyd5jztdubx1gy9ne1aibtldme2v3qmce5nwo8hgm471fl28za9dja1f12trbejhf1jlh3cve8j0i1mmflgvt2iauyvacm5yq9wx988f3ra8b6xjz279p75pod0aho1ingfkrso8xcuhe3kbc9oobffgk55190llf3g1b3m67w2yg4vb4o700eyrj54fzt7xgu97giss6idcc5mjr0zswhiz2c07ycczue52xuk7w68ximhuoef3448ia06c3uovarfw58adcgt6gloa6byumdcpneet5e05n1e430f33d1i2ogtdblnzethodml6dvsbcagsgofjmtw7mevtu8ztzb95m4ndck42aaspbcj87w7ld55f5y4rw7g9m3c4yhjdciqjqeoft5ob5smnafvmpyzgk3shpd636fm3qo12rwdby0uc9j1gw3qpicz34fj5117t95c0lykc8sz0y6lpdzvulcwh29dnosjvsl8v04996asaivgn10yu8shgtzvnsw4ir8ijvvposyeoonz16e0533i9nafl79czklzxeyzlj70fiu8s322l2uflotqc85yvjuyt1cp720i6ejclocy4bm9wthrl6nk5z28ffato8eovyujjxpex4d52wryus87oujmpyk007nctknomcp4rbnc1h8qigaapntp36rspfqziy11xlrwro8i6o1zw35714vlls1hg6awhictstoir85kdbow7zek8nahbxelkfde53t2nml61y129oglvpl4uemdjiydk117idighm41scx7b39qb6h9ehm67b5i75vw5ss7qrgb4db80f8fkgjlocmy537t801x3lj59o3n76zmuoltp3723o8cuuktccqohxka5glq4uxlo3klck2fg7zzk0sp0rnee5gnr1ftfiyjlm8aogaf9e3ejm4v1ui4osl9r8tfvlibgjy6casnyyroyrz9cxh682aon',
                proxyHost: 'nt8vyqxye6a34i9zo20atrfgk862vzga9aek5ry6galymtydttgnje1zvlrx',
                proxyPort: 3127213333,
                destination: 'xtdici21jmo9bhcomrdwpx6bjzn2egqcbyoszox00a5koqmwwwbrucv1i3kd70fx1xfpletrd0zecodeeegvxa7jdea3prqiwarw5hrgqeb8gmzm7oebw4dcrfsr8w283hb7prf6rz78c68g8ol7yk8sy3oic6cy',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c4q8bxqacf4xc3464b7cygktotcr2nt8tdhm5edsgno57ene1uqilo9333lof47t6u370z2au3ixcihpffd6eca2dxi22wib8ph85jlj6sa7z9xst4h1xtb076um6hwiug3frzji9ww0hjbxdhu8d89rkeazhybu',
                responsibleUserAccountName: 'dmozqyum544ep6r0bn98',
                lastChangeUserAccount: 'tnamadllzt3vgsbywj5q',
                lastChangedAt: '2020-11-04 10:27:36',
                riInterfaceName: 'jl01wise5gp7lgj561tukxhmwwc7hpkrrx26jzxzqe2q7o64nb6fsz7gyx89r37egp1iu3nx0tz2rm7y3w0wqxh4glc81z5i6uy3yuek4c1n5bokwfyga40xm68288hc3wi63k78wqir7e4hl6amufxpmgmihawm',
                riInterfaceNamespace: '7e99hzmom2c1iacr7ct70l3xw883qnzr2h3ccyb7wfbg03mr5y4c0te2oef5u0d3xya2pw6imyebd39ia1ljd1o006dpdpvceil9s28e79qlpaad5v394rwlxjgythzqoc2p41wg20krbrij555jemdd3378aqdr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'hzcwy2ewqadk5uvtkj4ye2tmmqx1ir7orrcftoaw',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '6v2h8k4rldrzipf8nkdtzxrokakuqj3hsmfj28uh6ls8y41gvg',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '3wzgwtaxrqigwdroqqp77',
                party: 'zbg4yggjvlgqn332we80fdrlrjzq5rxbmxcm0hafbt5dthjbt035vyrtpa3am1byxw9k4e9wi8cow6w89gzeaybvljgrq39pporsy33b482z3nz1ehp17k7fj65ykolaqysslulvn3h596ceezuxx4diw7l1379i',
                component: 'rq1k875jxjfiwc17clx1mec8l7pfqg1t0f3gdi3q9edgd5kqiwq4inizpy52boll3712on0017jr4i0pz42h3yj1ctzrucvq6wen2y3yyuxp5qitcj5t3klkzflds427kjvu1sof2etrj6zp61hd778qn60oh9sk',
                name: '9ul7248y3e9svs85wdc7xk9wriyj9gzjt3symvnewruobwic2b80u8vgjsfocn557dr2tb0erivw2xen2jyjc77czfqfnv3h30z4vbxcrv3aok7y31jn2tiqrfhy6s6nodmeyd7n3ku68nml9sxi6o3ucfpjhylh',
                flowHash: 'qi92oiimi9qqbq4m7woqt7oez0ueqjj80vuhbjr2',
                flowParty: 'dizwz3qoxdgl068iasnmktdh4srsr0lnolcavat8mp4ye95hoq5oi44ecvkoy8rjnlng54nb3hwdq2t9xkbrg2endrttd5lrxmunu7xc1l0pgp5ps0jrw6w8qs7h6mlmv6dfy7o2g4jtl74znb17jq1st3jfx60o',
                flowReceiverParty: '936yw4la5xxr9maxaua3krlapa6h0txbqavcafvaykug5qm0w64gvyu7s7m69vjnz5nem8ou2hwvmnmeuvbqcnvavbpu9fx1y4f5lcl1n571ety9is93yv4a524hkgqc7hp4yhexvfgw88okk5us3ulkpy63nxgs',
                flowComponent: '4cx40almyv0k14t7xidaqpyy1y2rbva75rp8vpvh45dcepbwry9zla9cpncvxgl5llqn93edclohx6xtq0awfk3sce1tnv6jk0d8cbjas3gl24mmkw0wa8qyrit55trf8hthvnmvfxu0q9va8v7b5nuauu6b3izh',
                flowReceiverComponent: '7vrldnx5ofonpu37bycwz2tbmgkfxtq9wgqg73ifoa3p7bczdln4m6gtg66yrykndn9x1lxcbag5ojmygykh3l3r8321pm34ur57pfquwbut5ffrx4htaw72900haj23knnf9mvkj9aar2ees126b6xiveln8h6u',
                flowInterfaceName: 'el5bd1hl0wo47sscenrna627r7kn9rl6g8y6r4f4tz2khkdlxobpqjjr63o9j6w4s4qs45t9r1euu865nkvnqw3dbpp5h6zymnytlp337k2eqrt6dzn5ddujmp7mkan8j19jrdm45gzmbqdjtnfc1102tq01e8ln',
                flowInterfaceNamespace: 'oz6rci2isfrn2oaxafaq2ns5e9oieqk5aidqzsrtpokhczdg8rl1dhhz4sdxtp9i95qff19249xbs376cdotj6ws5uz396000njrczy0oig1nj2g9cpughtiqo63om1pmmtwrkgm8pkot50ihthfok4dhuoc63uj',
                version: 'unazknod9e3zjogz201p',
                adapterType: 'o3c7qn3ex6j3a8lj6vfsjscrg326ob7g5g7uqzt01ms1pvphujo0aoriuynq',
                direction: 'RECEIVER',
                transportProtocol: 'qbn8yzh6u90g55avqgo2ydl6bljfqjuk7uno6bhu92rhm230njr00w2r9qdh',
                messageProtocol: 'jkmae6ecz7903wkuzeqoszg816e6609mvw2djwduycadbtrmzo98a2wbudjd',
                adapterEngineName: 'l3kas2gmgcjg2w3yfypxokg7i66fvyx516thxgc49e8qt3ao7hukgpwsexw9ecz9scelhtohleqmtfl20n5d8xzb74lgq5ki6z9yfp18ilo7ktycq2rmda4z803ja6sg22gll468ztyo3zmufsf6srpunvkztfxp',
                url: 'c0sfwq9h3q3da48ahe7kf1texz6b2f3hkxlikhr2189crac3r1bi7ggk92u8srfq0pyi7g7l53sx6mmvrw5jyakplekzsbx7e1kgncukl9lzgbf1afi0nk78upd32bhowo7105r8qd6cwhc3jh7kp03ze73bad0zh4ycx1phaqpky8secsorvzo4oaffygcczr9vr3reab8aepusjzbwtyoccvdzqtktn8liun2u3qu1ydqrxje9dpc5rm8hlqygkok2efi8nga1iogqi7r39r4kj8o51jgn2x9mitgyt2kafkdgu43begf2mxeedn5v',
                username: 'k5nkbwjc0myx7n2mqemls3dtj1w1q26r1uae9hbnpjh6zrwi9bjf7pta0czy',
                remoteHost: '3fwqrwje79z2yxl2p4rfr3dsea8p9d4psshhpskiox59ok409rq1q0ngh5b1u2azu04bwkzdgmghs6j45yz7ltq3xwxnyg02xdaxv5yfhl8mq5cop26ua1gd9qvaatsij6t90nd8k8ufotpwo9mcurlo7vsisshn',
                remotePort: 2594606727,
                directory: 'hhi9z6hou1ndk503ia3kmd4wjjlbepdzqf2sjjphdrfgsjb3ys3rgvtcf9a7yxnzscx3cz43dm9h1it55s9mjojvzd35uotp9o4n2phk0gtckz3zktqpjgc4ftun9yuowcxz77a8tz8at7tog8goaqtgs4xu6zjovzdnke5s4d2itdgxywzqbifioxo4oqrq695chdvmkifsbofiqm3cn53ga4yq77d3pcvfsbg9yoezdeohrevw419d6zplxxq2e70uf95n5hcuuve7jq40gv8p0en66rvvhcztcxpe57v73eczvlkqh7rdlrckvqom8cm7b006zptuelurzk4zozyc4hm6amk21e7yljj1h6uzfgfc76couhrjyi8wylit1uu3pk2mo1s2b8ij0t70hxzs758nq1qyww62oi5te3nz3rsf3szpbc0ib0gyo0n30e3te2vh3k7sxcu7ywo5qpneqyc8u8uzl3itg3yiukl0kzkrk7lvpawgj2lz9h1hh73pimeo4gu5j650of4vile09dy28flkbqlqh2kjex718r538xf7hys3aq9pfojx4a5d4yavhlkdykhwq5hxklk39ut0r1pzq2er2x07uv4ekrjetozvaz56l8rg5hy2xwc0eutm2mdq484sw4gi5fms1e2wl5ksurh18cj9osas4rfykaxxcglpkf6v3s1emk8rx2ihupcmdm5rz5ps8byadv6yu89bxrsjb12oyzb2gks7qe7w9ri762rj6q6i3w507wmethxakr0cqdyzunlusktxumxmf4heuva9jih4d293vbtcdzkuoomw9n2ghjvo43zpge4i0fjlcnyhfe33own62ye608nbaiiuv0hafe2l7jhi9tanuwwydjomcwsqnbym61demxmiczm8e1lz1osizko509y0ultxu8dj0x3j9xspuhdewykb9wznv1yxp0a7joomvb6hj77z7deebg5zgggsc1lq639ejjimdgqy0sdxbw6vt6o2tnks',
                fileSchema: 'bh39tbn5sfwu1192643ee8yh1o4ipxxvtmzmc745xqcl9rabbpldq4pd4ptlrhddkwno156gg3cjowwqqcx76jmpks58lute9zmp2qxwx2o63k9u78f76rj6a0rg2urgqrr7g8c59u2vam2o4x56dgy4yv07bcbruc277mpw8udtqahtinhegn4lg6akum2u398lo34yxt40if7fx3d46f4bfuk9r3kejzm5i0y8or32pa0d16289z5dpkw7jf0unem0yz5lrkspc410iza5fw00573bvvy7e3rjry8lkt1g9e8tcxgsidcmcvvm0jcxbjbuccoiyt9lnud3jrukzjx10xhx5te85k4izp6ae9m10gckfp9ugzsy2n9eb3pygopl8bkkdgts0vbh6yn22fstjesfkg3g7qx6izoaaf9c85cqbyur0qg4v76ljxqmpvtnvqnt08cvvs4qls3lcybu7jkni7c3ro7wl9cs9uyjf02w6gsoygrd5woqs16yuughwz6jysjpnq56801r8jl4xjojkbfx6fk4ranb27p1u2ym3gielk6jmmmype64bn92p9q5qp5vntxsmyjkpq7lphp0pdlja3183pxkh4jupkdiugdegqmlsikn80hskyvs9bec65qtkv1g1kh55yxkuhhxvx5yrd55p45btilbscmestukgit7k7tg7egxol6wyiil5gylx9yvrtsvbwt17bv2fie38q54jjmk1ranf1ovnlfqv7hg4kwz4t63aucrdmh482kdune7fyn84a7megslc0anh60iutwlyex3j7bszb8v424odrwadplpbjrh2hr7mxfpk8r19hs7g9yvq3qgrohnh7pscj2j4azeyf01z816rum0sijgnik16ctfrrktsp8wvq9tgjp6qprtrff1hklydwos879v4lnme840kj3k1i7fobrk0cww5r0wqkfv045t3ifkymrqqyg75wtyqznbhzhwyzbvcna8o9yyp4onbw61nvvck9dk',
                proxyHost: '6sijcsb07gpbwvtrnmbgk8x5svjyhdb0eitnvscmenijtyn0k87k5m4zx3rw',
                proxyPort: 5499100568,
                destination: 'zc6in2kpov4zpf1onfe1opdpzyq3llvogzgjjeleteaqxldazm2qifdfbkpr5rwcn6bk9nvwl6a1w4euklvruzuvtqjzmvqyoauyxk9uja4psma8amyz3wn5qdvvdgsp3i6uxufrp1cp0u709c5quygy9f5jlwfo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nxpzdcr391nooz9es3bwo20sx9arlcepckz9erilsu2tgth26x44k88x849qdv6dui6wjxugky5d5og01oqw5w392lycl68silqa25pclae673ezoo7gi2vsnuwimkndy1w2of6m129s2u2kwa2oqz0cv064zz3c',
                responsibleUserAccountName: '2xz3p2cx4avbngvwit58',
                lastChangeUserAccount: '27h9m2yqmo1se3ostghc',
                lastChangedAt: '2020-11-04 13:46:22',
                riInterfaceName: 'untpz917re25dpr250e5bhzx1ue356ifrjh6c9msd1ja23o6ke6ifuasufoqxm7aya8b9ae7rio4m8w7a2hh9swt1rp0i5sr2j37xvqdqdjsl0edvb1h9cmuwt8244dolfp8106gut0ko163o9rwdfhls88yomx3',
                riInterfaceNamespace: 'j2h6p6914zoa183ixoe69conxmaw4d52df81tvlv804nw04vnyd1vhcvqw7b49b90h96ng03ds5dzuynxp4ha0llu4kst68rpazffouia8n629cp524c79qnojr986wjro3mhotgnh9dfvxy2455661ndsrculid',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '8s22yc6t89dbiyif96ztembzqfhkv5wdjp4h833l',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'htoan45qsqhmmvjqav817apsx23voh40bh99s38s6p5giy9vqe',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '3g8g6mjdz4g9pjb8f2dm',
                party: 'rhctx3shxzta7mfa99dr39zq9wt1gfsedur9ggc8vy7tlu5bh3iw8h9uk3yb5kr4c0w5i1vudiotav6sadbrxiod842ul0b8ogyspdzx707lyebn1pbf69iacngwj7x9b8qpkqng1xpn0c8cin30niu9zm43p286v',
                component: 'c6c499mdwn7etpzcbyfcbjxtso9gj65jumgwy5cyrsqnasjaihzbyge3lm8jom0yaknx573y8twmy8dl77k95sfjxoij4o94kyw18rgbcsnltrqmzl84t20r6g5b0sj7bwxw2m5ow1z76o21psge8wtq8cxpyhfx',
                name: 'n26pm2avjg6rqvqpwm4hmnufo6a3utjc2vhohauqgbkn9nr81ul2l4i8xsdqv7n03jm0mvs468rycsr6491oijmk6x3d21786ez6tk0ij2v3psqt3b9j3ltnnevb8n9ecnsvsri31vghf2syvpgmei9go93oanil',
                flowHash: '8ni42n6vfvii7qmocndulktoqcgi67syloncd8h6',
                flowParty: '7991fn0ccd3wtw5sn5euxoa96l7uq1otebg1t9mf821uisxwit1sip1euc50q3j75nc32mwrdb4avsisinpgril9nx4cnbwndqzvx7rclf0pwnri8wy59rjwcwr8henjjm1u79r1sdmuf5ec8cwx9pq8fsl8j8y4',
                flowReceiverParty: 's9oq8y5ojprr8570556cbi5thatl0mi9rkeblnr3brke10zgvcgqxaw2ud85m7x44hc479eo9nfkcw3k9qx9fzu2n0et13dnegb27lu7hvejp1qhsoq8mypiyy28hplrk0vyhqzrdq137m2r8iodew6dotp4th9t',
                flowComponent: '42x85d3e4vaa4a5kdqilnwlrqdqzzde24s5jzp0oquk034gyvkjinp2hnnvkdbt157osgvhm0gtup19wx87hif6sgqbetibhy12vgpxlfjuz5v4ydxol8snygtz4tetas8vpfuyn8c8yf4bbaly8ssi3tsf8yyh1',
                flowReceiverComponent: '56xqw7qgquda9s5vn4f9xt2l4rq2c9p4yc02y5x1oy1w3g98lxmmscsmxx2786t0woxhyj70mfj5yht5wpkqdupyyx8awunown09nx17np2per3b6ooimzjg5mwqa4xukcy6efa7flhy0mulcj77jm08kponvixg',
                flowInterfaceName: 'lta2kxm0qzklh645xtlcz5vc2evpym85wj8evepwl42rmkirlr3r5owi5ajh0w4ot5jkumxoka9ua9fape8xegpzykmhe9odtblv3jwjm1roum8zcs27erk8t77ppls7hg6dsam973oe4akc429letixt3j8fg4y',
                flowInterfaceNamespace: 'l188dv4ciztaokqrd63a949bjrcsnwfy3nn1y5qoj0k70z0d25io1taupemh7ato24a17vgb5i50i9fyitv2hxwzwta9a8yegsc4aihwpeawzj925j6m5m04pm7hnau067jbvnzhgffl763a9gqonseu1dqy2ug6',
                version: 'q9215c3fa3lcfkwgj7mh',
                adapterType: '51c876979sv0i67d1rtgt4psl2zu8p0e4f5sm220kii0g8y9mm441313hnls',
                direction: 'RECEIVER',
                transportProtocol: 'iibn6cv0b3qvroei0vh2bbpjl47rs5vj77a6xld3dpu6y778ircegli9b9a6',
                messageProtocol: 'h4itkuvgd05k5x1pn7uxjywnrsh2g2ilocxbvqo16jg2kwfi6kzlpa7eibq5',
                adapterEngineName: '168825d4fqka19ylwj102xinvogfa22trk1wa42srn2deinr24tq325f0fias0ogvb3z121wu9ov8x3xbz1vcync0z3df0g4elig9xijjlkuzr4d3j4eyhc9uxjc0qhe3riohtdm1na848099xqfqmokbh4phcod',
                url: 'ooa6r5dt4xemti51t0pgla47fcpj9awh0jz3k5o4l8on4l9g8lq6m0qv2o6d2yeyeatziyv7czs29oipm4511oaeobm6q9cx8vditpw8nmo14z54sqreesv5ip9v9pv7e1lojlsngtunwvtgexfvoa2rs7iy6phclf5w5kzs7iieh4r8tzkamu3uyt26ltbn5viyezd7wq9hsp60ejbn6yvit4hwhzqa31haenekiny0mba7vuj8kft13aescn1yed89d52uh3hptn8868whfb4wcfdxdg43vd9pj1svqnxkiqjb0cj69nadiah5n6ox',
                username: 'y26bxmbrikbnkl0aytoqcto89a3x6j88daim8i4bag836kp0cjjda9y1x3pa',
                remoteHost: 'mnjpcxfhjkjpg05xf9xjlb38ztm30f1flshck55l97mp020m30p3u9477kitvp2wkkyaimz1dg6xzdojposztybb8atd99kv4p34iajrww0gg0m1kheke4r0mawx4p5b3tm8ccv9fvoeljodnx1jir4n1zc3ku7f',
                remotePort: 3133933119,
                directory: 'r8p3b3dn889wwtpbbzvl89v9pp0p6kxn9ro3dvqvo5gvy22cvxg9utirvztl83ws2o2ofreesbidzyw71v15lzlsjob0pyozinej4mk54btguv3ogoxdkhx8c34zhimeqy3o8wa0vsc0z0ys68yggl38ysm2mgi9ugcge237ute0daouy9qozuleexau65rsjgpkv1nvbueu8rldz47go50dgod9fmtjgb4afod9rz3q5tw35qjn0krit08bz2b1vi6bzfgow9r27391sw9pat7zxfd4y1q31l4a6a7zp40q1rvzu3a031jlm39xmzmyfx1ow5dlliyqkvjh29wchrwkbrzmbcp727656b649yc7vqqqes0u1hmjij8an1jzqct754p6h1g45vtopuyw6xxaj5os5icurusdzn24dm2sda5zpre6xpm3n6yz85zwi23fe1urx69q4o2v7y6hji0e0xdc4b3qqbyjrrunqqx1la4s7kb0j56t3sjpw8c2vzbsilq345nsofve8lz31o0z5sbu7urmtudj97ukzapb3otcils56rkmkxorebmy0t2upi0hs4unp3fpk5afrr5c02cm6kpxxb8vthxxu5kkbexsbs2olgmisblasdgegxzmhs6ww84z9937dbrp95e6jogakuimsmnayjfb10bsu85y045ypi6gozu0g6h2pml3tnxtkj2d2c1jrp2f31519yy30yda5wyj3rc23sjhe4ywlo1utiy486ns55mjp4t507moqtu336vgdixo6cnorg1swcykbrtkugtj85ojq3g6lyn3sujgzyr4e1524n211rjtv6xi7nbxf5cdgotiuz4r2tntq1io2csu2mdxzetbiamv0n15r0qreos2fch4eifp7ynnpurdglp326ientu3k48fst79z0eu5oufq96pg51nb0d96cihq99fmmky6jwkmo0cb2pb0jrbwramugeq3065peczlujmdpfjihfa3a92d7n5c934vdke',
                fileSchema: 'asrqcfyp61w08kte65ud2hfle0oz5nb3hvcd5s0plta4ei57yldr8gi2gstzmxsc8061p6pkbvscjben66g0m6j8xgs7w7pukclj0nxbqihnx36zrncxfrxne9yfy1e382tmrut848853c2yf9dl8n08ji5neoihf10zgr2dn5bc4mxt7coup91tplnwxmhyr63nqgoxnart328msguceswfmkz1wzuocofsjka4hm95klgytb0bf8gdcx7sbu0712jgq0236oj0iruxpps3nmvhu6qid928570bjbsgkwijejtvm3tw5g4fkij2jtmlquew7onl08frae23vbyjghfu6dv53rz5lok14qq3mk3zf4r091muh8nu9avx5pjcwq5kdwn0f3xy4c6hn7xp4o5vyizk66decx9xz900mm78onks2f8sw02mtmu47yjg9f8njsgt6sw11bv00ybybdspsiiiqggxa7g0s9mv0rfdwukj5ldj94qmmkih45iuzs88l8ovv8i2vz5wsugx6mjtuj33tt588qteu8gv7retm0booabubmdn2aay12g4p74f8yj4cjukkwio3ucu40yn64t22wkie6ox5f9nxbr2q8ngqauo6rslgnfbf8ibdos560wfb67kfynn1v9klq86q6g8liamuskkwn9h25h2v2x017lmycmmws5yg68pdd6a95oy98dfkbsblilvs4yz0gphv6x9l7ld78lnoojj22ibvl301230ypwwxk282fta922uxituc55e7585aaph982zt2o2rg1tjebtw4ru93ogrcpivjv9u1o6h5fw871euekuy0m3by5wpthx5l6ll3g2qaypt5t7w3upn5r82zq6wosfj8l9q4aubvewua2tf7yr6pvoe9ihdaizcm8br12tbc0c5slugtjrqktnpnjgvnca7rgnc7l9ub68s3i1kb0xeal6m1n5qkvtwohe4t6o6e1rptvd6nqgaorfwi3453saruy7z6i9yq16',
                proxyHost: 'xcob0hayl51tlge6iqeqj8rlwrlnl7mcfgs2anh9v00payv2mx6dzwh0qd0e',
                proxyPort: 2748047644,
                destination: 'oaselb3ycz7uapy992x93wrhil4k1e545y2kk59fkn4xru1558m5d1dm0vsjfnrcsb5ipkzakk0h77hv6b7ugknz297okydturzfd6abgl1aqfrz0xewtzzm5vvv88nafffo5djpwkog2t4ho7br8b90iaq594og',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'o6f9imtwdyglrybybdwh3qlkm40bpr1g6sija8bsc3wx8x9hzl29on1vq7dq8usumj2uks6o3qnte4v0tf02c5fvl5vl4u20hzz55a5ofdg1koa967jmmmchlkujg0mlrm3mrm4ksu5hkt9b0kugtu6wspnz2u9t',
                responsibleUserAccountName: 'o0nali3ajp9gqh6cpmpj',
                lastChangeUserAccount: 'r0rq9mzyl2kkecjnzk2r',
                lastChangedAt: '2020-11-04 07:54:04',
                riInterfaceName: 'rd2ybtp2xmk6s92ranc621yb19nuhpo2t3vtsi6cg6km5an3lzblhzqke89q1fxlgrd6x0v7z82kk3y4g479z7s2szk8axdsvyz3vb3cbq018ttk5u5gsen4cju7fkb3r6yvzq5lp18rt2m49n3km3aos5wvfn5t',
                riInterfaceNamespace: '4irxyov3p0l8m8e2748c40cgcrdnzjmbih4udm5bwv1nhdfhr5pjhli8oxw5z7bjc3jo6owhgxc8dil2fywg0c2316yq9boe21bzjz08httawuh7clw2bknzucjqdfjwsw7rd1bkwq7cgybsdvpx5ahfcg1hz7r5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '7trayzrx46f89pyj683nlgjqg9mpu7z8efs8k0i4',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'krjmu23b5k0rqgl43ftauzpzgib2f4rvrx33h08x6r6hxwb1xy',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'lg5f4ojgl86kj13lupsa',
                party: 'ffb99as9ujzi41wr1x6jj0rojptahv3a694k1sf5okadia2qfj9cyc6lyw8jwihhwjic7553ymt2fgv5mj5ashgi1bku0zdmsrc8g0ekefsapj6yztyhdybrwdh5tvapy6lxh1u1j2bl2l8xllxpa218l39cp2ak',
                component: '3t76q5f25rouh8mbj0wgzm30nmoceaw7uu0or2u3hib7avhr5cmlqc4jy829xky2lwhhi2rsznylsym99es9khswhspgu5uk8c2afxpgjq7p0jnhxitk3lrazrs7lr5x7by1kjq4jnol751zctavjzv9bjeuy5qij',
                name: 'stqvu772jlc6qz08xfhezelia9hkol8ttl1wmobmpvfww7ksql824h18wxzzhk81dnce08fqrrke1bjuinrny8clw2pjptlbefm6xwt66tmzy2hzhetx8ettxbb8ljlo79xym73fo3eqy2zxu8afqr4fwy9514kh',
                flowHash: 'r574qvjlsi8y0w37ui0e72pqoinb69m8798o4ehr',
                flowParty: '9lgleku3kxjbk2j67jxo3xjuw121wleuessrg7i3mlgsbmkgqzocsuiakrlz3nfe92vpfmvsblwcc5rkvi24mao0bx728xelfp7u2uzjemwdq7mo9kbm8qe1hycyg06oiar47ojrhwe6xtn7n9sgylvj87ymx9px',
                flowReceiverParty: 'u78mf1878loehinglhm2zxohg5t904d2pyj0gs59cz0gbw7h4fmvvrsfejppt3modu9zpslcbyxbqszp2k18hdw32b8s1qnfoughs2psryjox8ljjsu3csmrhr28buu6bqllouqk9gldk11knpcq7skxhrphoreb',
                flowComponent: 'yowt9cl5urfkdweopf35ve0tbdg11x62na98bouqealg48yws3dmkxo8o46ztw83t5wp2y4olq8rvazqm7b9akuohkut0ar88cwquk4jum56qd8gq4i5lh3fas3tsfl5rqwmi1eyn1frmfm3jd7t4j8py8yeu4ns',
                flowReceiverComponent: 'sn1br1ny0471t7teu9w0krdj00mwns0u7da9dmx6n3vii83ult59gkcti09zghvycsq5kd5438axqdq5xrfwsfjv1ruvtqiujvia8zyfvzi4mi77a0yqwfkd9zvqwc43tiwyqh9s3k4ajr4r5jva2kgdfegoqh1h',
                flowInterfaceName: '1wmerzqrkptxqkqyf9b5esb0gvs8zynv31b5glj02t596nsx50sadderjk9ckw9niqxylcgoo94xs2u100le6n6n8yl90ud6iaz39k1l9akm6pd4o80mpetxg6jfvg0jzr2kjqyn5cau9xgvpmwv5hu9y3uc6ccf',
                flowInterfaceNamespace: 'qcazxys692y9b27kg52b891kdwled4rrc0skusvzu4y2kwgvd16b2kd0fa6w39zkfbjdlqbfy3diju6rd2q30a9im6ag4p6dg736zoptif65w8lysx6ywoiymgb0b9ml5bg0jtcdvbe45yd563ldsqlkrbx7jtun',
                version: 'ewmj313otppi647byzbl',
                adapterType: 'ep7o4tsn9m8dm8is8c0fg4ngshs5beb0wsdc9g1i4vo0g8iaq8ja5bzmcn9f',
                direction: 'RECEIVER',
                transportProtocol: 'xb2uyzm65wlkstod0u15yi05zvnmqyoz9l2e35bexqrl37cx85828bvg4oye',
                messageProtocol: '47qrb7zd0pwyudhan8fph9aocc9ef1ko9s6rcgnhblc54jl3h2ixoeud8t3t',
                adapterEngineName: '3hqxkffc0cipsxtzimhiwh2bsfi8vk111otc7bbewo8typoovjfy5ok7kr3rbv84h52436unbx1rxwct617sw2r5tld10b58d8sl4pl55d6nzdr589hb5nvqp92bo3h3eatpbgi085t61q4w7araxjfu9sm1qjqu',
                url: 'h1i40gwe10vhn8qoiut73qnpzjvy7hbnqkwjiwyfm1ck91svvozioz4zbm1jeqfrhbye3t9djagr2tjs93x9ywxvftsf2z4shclpyst40qc61zui8kdgjsmx96vyn4vee76zr8inffbk2doaddkycdoqqtlzzpt7g1tp4qu3q2cq1qlg6ndtqt6jddy1tfvxv5rg69wmn75q7sgw5xoxyf6y0ykwrkrei0h5dasb1l8xvep5756bvdkajiibyyogdp82au6mrwelsk42g3j3fzowczfz6gnujl53j3t3hx1dfsj824cwchm2dmp6lb9a',
                username: 'ux6r2dvx6sdcs5xlo1adpz5hasbks5bycsamlwmsohdkbjprjg4ymeqfv5eb',
                remoteHost: 'ojnjcnlhy1ccgkjs8wf5b97ia5wuqd4i0d78ggrexcumrsf4ilqeovqmff0zex3uj1wcrkc15bndec4l0he331krid7p4s89ijgkz1d8t52cm3706u7xmqmz1nkz37fdwm8box1osw1mosp2gccu46yvuf3b3755',
                remotePort: 1211929445,
                directory: 'b4a9blsi25wgzn7li97btuatnldduiustgbybenhm4bn8m7ev32v5g4fpco70wig6340iv0hp6vecv8tijdbxs9o1jrytjh31dvobeighr2m2hypke1582xbt0frlrswmnvaptg1qxvcx5bujhruowusjep3t0ywcfyq8zbkm4xrtplu7mn6h09tn8emhg2bq43e8r0lrsey6xgl4v84184uxut5esw50u082ku9qk6rhtstr2yb402ui63y26z4f7yfpuh0ownenbejgimtter56fpx5qb9qxq36vnw7gq7qg27r6v4uqtas7wnbuyg2vhqkj5g8jzwvtweioqnrrlmbxrp8qmzasu7xrroh5ploksoza7semr60b3vpwd9vj0gy3rk4wzp9b2buizi24efq7pxy97hbbfmaf07q8v5h21uxz5f5gvwff324cxu1uos1dt3qdfy05puxen14b2op4fqr0wn8kx148tpv4dhestqs8a4vbd2ow9i586h8oae3ed1rcn431212cag880bsio5vkmwqnrcyp6ic9rym1gu4sj6ba22vyjmjtxred5ixblzuvmegfp34veg80f2el6hvlbr8tf4x0a3l4x3qut170pzl6i8jheipz42er48zkdfwq3j3np42gr4l4aynlnqpkdjrq3epab5o3owofwc30ymx309av5ev8sjlqvxtm2afxobri2vk8v1qisf6u4o0mp8nmamnvsc89dqdn2qh7x5b37nzmlpk49nx42ysyp8wf0ogtklf50884uhg50lpg6e1bi48sv8jwlugftkw0nvgzemqaxwdq1ffu2i3b3pd9t5r3fiod0xjgbt5gvb9f0navp32pafd2ro05wuq8szpivjhisrbp2awb4gz4u56xynyj3tf2y2uggtrxvu22tufgrp8tn96fozy5asq5nietlcpb7vqgrb9htkhhj5amqpxue5tic0iz3gi9notskiyhfb59ydqopn85qw41vo73sstf75lb08',
                fileSchema: 'n4krdi7fsvij9miyknbj3qahpgmicwz27kv9t9wjtcqdierhw5v4cbn2nnzagwmhxc6q8oxmnzgs7lp5rn0yq29vpeoa2k903egk8lwqgacwt6gubjm1eps8iwr5f92grms4f7g23p04eqaoeqlgyf3vq7wcacib27xjfrvzdl6jun190gxpx3p2fe5230le7zchpnmo9h1c82rlvkdz62eb12c7cmfeujsv90hbhkenh0i9a90u3g5rpud8x6bjhiqiqdhw3glyhhsyrkav20xoik7dnr5bogouxl3aczvj8084xb5ppjhxwqq0lu0ht0y3igzi9gvu3ab6baz5pcyhzxfjtxpkrvxo2k16lpvyekvpg3ygv74dscsuaf8jijhoejc72nsd07rzv9hbpj8h4jxsgwgsxuul71r9spfj5jthxy1tjgbpyvha8b2hkhcg9nze286iffdi96jp8kj2d97gmqcl1pwac7k6l55nmf6wbytlrqg7w9sc0i2uizvd1ro6xcn1vz4lf9v88hiift5gohbun4ii97604kjk6q7dr9zudtjkmhryx22xiqhhhsu2ksld20vbyju7qvqxxvo0z7v1kz767ttmcms1s0gp4b63frs0t1xnw8sq4mkhhzu43gvx5pi4qxujymsk8t8kb5sqexgxtxrusry568b3qkb17ba0xiac1u6mm655x6oh0o64yxi7eptrhi1l6q2t6agd8vhn34z0q4rrn2e10sjt4aobsddgfpjs1wj3u8ulricp642c0ufra47n2fmw3ozl3nxttgkh3x1qedynwsu21ndejjz1pmfr73d9u2ayqunmc0q45pj88ds95m3tcn9nu699ev0x0d6gmolbt8u2r3oaapnnkpp11a80xur5q0lrjdy74w5qg0zhhzwka7fc6sbblp9zzppt5foj1em9lhw0f5d8xej7x4ru4opb9ja9uya9hyv7m68zvizuil6nsdln3ffx17tkme01x2mob7ai4byf2qan',
                proxyHost: 'aidtg97ysel060eicumhrxqutvovfecj0pfxhqwe15p80ttxmva1wukmmq33',
                proxyPort: 9788198454,
                destination: 'a3pouyf8tkar6d2vt594yqvw08bi91tg4ev57j22vcoq3nmd1zwh2bw3aofx7hteeltf69kh6wor8rnkh2xz4dl8vniolp6r0em5kz5vhdj2t9ubvvoz96rblht3spj6q2mrnnigosaja684y87wwh5vejxr3ss1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2dlomwa9mn0xlgkqgxjgw4j2yto2ezdduu0j3b9upt9eyq3bgsmf732k3dbtijtdxm93y0rq6rwh3rcm8xsnvryylxjm8mjohjqi6vz7tvsiy4ghokvie4b36p1hyn7qqw5j2kj41czxv5mrj9gdp1xkjqld17f8',
                responsibleUserAccountName: 'h0jv3ruvtd5hb4nyswai',
                lastChangeUserAccount: '4xfd2nqk9t4tom347iks',
                lastChangedAt: '2020-11-04 16:24:43',
                riInterfaceName: 'lqn5yix6jrm0ug2ilv1fkht3ylfzg1suxsdda6umc7lbkjodi656k5efr0i0yrp9ckcv0cr9wx53arekh6nueu3849gxjkvwt9qcd6j0s5ifkmy8ik7yrupcm5wr3icxgycoybqt5rp7c4jwnsjmj28r43iv9r5k',
                riInterfaceNamespace: 'twpoya5220cxpx6a3xa0ryra5rzgxa1frb97l2y1tvsqvl9cycs3rj825m71ycdq1vhqi8qiupbea2tdksy94il97i1dcqy5tck2wy9iowd3yzdwh720nlt3zhg9988tda2mctl6cv27do5zu2699rmnl3l6givv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '3lo7jt9iff5e2fbyh66ubhqmk8vizsbpkhb9p6yl',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'c4vkua51cbazzwvnp58tqdru6ozzx46pklfo83blqnzg55223c',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '1udmvyj2wdj6mteelzkx',
                party: 'imsrxlzxzp36mc9rtzsi22f0ynrntxuxqhy30i7w1j0s4hu94d5q4x6q36cnm1hcpcyathww4gp3wsix99vbhc0jum71plqopt1xg43b66vy642ej1yt7ffucepzrdciuhararirrxgy2rr9lw478j081mfmqq7p',
                component: 'wor525jgpayyy2or1w0olpd0el0z2gzsj8osqyjyuvk65kddbawmj03ylc5r6ltsjzeyeocule435m95jyd7nmvh2mphpwf90jm3ldtkuc8mlvizqxlw68j1sqmqytvd6clcq0qouyetrplyvl4owp95ulcge60v',
                name: 'ctsv7i7ql6wgssxzudm5hpks3jfdjvn5no6juyttp4ko231eeq22gw1doz0wgufrf7tg1is2y2umawc6dr2ealjsbvexzlas8upye2e1kuakxmagpx3vnrvugpiw1afzkwqmp5lc2ltegx7mxrq710g7ba1l1drqp',
                flowHash: 'gzgemyc9m8dj7stpzvafe895atyz6bcc2bhcuqm2',
                flowParty: 'g5z7dl5e4p3j44hpvbxggb75o7boojqn2jc582ww1nwiuxhwrbetw7dsko8phn57dijcro3fgcs6im2v0dprlme2pqljurtgng0i15ynrqfw6w9vvqxuoyrp1gkzkflahxv41rdlksjulf9xfnr45gvwtg90jbmh',
                flowReceiverParty: 'tak8zp9jgsx2a23efmy332e7g0dw8y1cc8lxi4s5hcz0dpyfwnq0ulwnn1vf4lk29jy6xmj7nvgbbehoo76w5nlbdl7z6yt5c8r8w8oskjhke852tiuudaos9d9sstndsd7ee6f575tohbbl57e4bi9ggy3tdfs8',
                flowComponent: 'asqn2dv1b8h71vc17w04ratmwhvg5kwr8r7661zy12h3iu3hzh713h2587iyly0jh1xzymn00mbto3dwdk3mr72qnvwo6o22vngiu8ihobqjqfpe7r5u48pvixhbq44uo17mwocn0j4mnka353prgtzlubx6qbgg',
                flowReceiverComponent: '2vwm13ljaorodiyjycjos3whmgk0p8g7q6jwkoysewueks64rc3cb2scvvsmfjgfx8eby85lmbc2uyklohjut7cgsrsbpvbo10drq9rz84olfyjadxmwgm7ip318375ye6ktcuq2nd3th1rlcb86xqfcxgp6dqw1',
                flowInterfaceName: 'am9judqgo5k64nv139pm9kihqvaj5abxe7ov8kr8l47qzaqdt45f7504ucp1bgy26354k2xwvl9twfktm9fnon8czuzowmqzetcwalz0qs9qxz5twtdxj91rums3aiwgiu1ssx3an5kv512he7epbszn15od3yij',
                flowInterfaceNamespace: 'k682d9mkceuf4ujd0xpt8c74lvavm3e5cnbo6vkx3yhpz64ujih3ejnouc18hvnb9jcre1etlul9ex8u9ulq9sdc00mv9eppa9tgqv9zn4u2353ka508w14tfw8tww24cnw6hh4kor77jkumw10szulbfi5bfdcq',
                version: '4eyovshyvf69mhz1nicb',
                adapterType: 'bc26fs9vpl6109igcljga77phhhdm4z0085s820ceee64qr86q4rjtwstpq5',
                direction: 'SENDER',
                transportProtocol: '8nmya9fs43ri7zvwts5i3lua0rjsp1w4gncjtxosv0fd06sgrc4opjzafld4',
                messageProtocol: '3f38z165b9rqasi2e0v0xqr8ihbcf1nurnqf9cmbj07qrs9s2gnvegbzp52y',
                adapterEngineName: 'to2tw1plhwgl4o8js91moh13hin4ekbbjd1zyqzefv0eurp0045duwyfxu9lesekiatlh4l8xkw96hidae06baq1kl78jgmvpxir5y43rx5ofvcvkqk8phlvn3zh7gl6f4e3h79z009k3epmsidpywzsfvlh5rpi',
                url: 'qkw7b3qq3z405u73a177a3m661qual7tweanxc3nd9gawzjh3t5ic90pjnk7gmezuhgbfgzrbhgh50whtgbijvq7t83iqxgadvtsz9abg6zelntst2e07dkpg2o8jnyy5w38zcw0ks2vwkk0yrwaxp741nujuva0xvgmino9oxdryb1rwqgenzi35ldbc0yxkxmks77t4lawxx16v603sg538xudshkwxttxjfkg6jgoiq03k240n1ie0hpqiyn74b350v6iyva44b7w26cza5is7yrr0df9wlzu40ze9mj61pzauz1euhibi5ccv997',
                username: 'ju0w0vbl9pu99ia1mo26u8x0f1upsbv3k5mlpbguscofmwhgxe20pg1kg7rt',
                remoteHost: 'uj6no2wu85pd7kdb7pta3vu335uez7in0abfue4nh5d1vk9dgqzmocz1zexeiv23rvn83qkbyqgciwv3tu3v1g59jf0sok9e30319n195fsokhjco7o1r9hc6sq2g0art8fdcvetfymuc5y4s6ygo2jdt01jifdo',
                remotePort: 6786036582,
                directory: 'vfbw6tg4dleeq41l2etg2yh9bhty0u5y29zmkyy6bxyuvwihq4vdaoo0syg3fguy6jjvzi8u4pmyrn56ye2dxc23dylo2aqaj9x996yx4bvhd3rsfzk3fqso1lnudke6ludy1fjc3zk0bdx6c0lavo3rmr0tkwqmxx07jz0muq3ba2c34pm2a4w9baz4brgszvk51i7kfw9l3yjg668ywdjjvo3kw0jsni20611apdw8ffpdsy3tclkjr3vtcjn3q4mamop8x57svf0851qea5chcq5jiku4i611pozwx1hm9dmcbi5fe72yol7rgb3j3stt6u9khsqp524t4tafq4bul2nlung48sfuasley1u7gl97d7qj7h0fqhoyc0ovcnclhtfo67jiagec6p87k514pzcw19n0mlmjgo094isumq502jfisffym6mglhbestugmzk2spnn4fr88blagxfmqnrgyt0p6a562e25smmrhc94ytmcsuwgkbfu6pmv3osnkdxwkio2eo1wij1w4oef3h9yqdl5yegozcele5hcxi2hmle9p1cj8zkra40u3p1yglppmuwhalpostnohx23p5qx47dti9ws3r8irnv3ckqt80ox8ezeg1abq23fy4j67bvdzqmelsrgxdf9a267biuk8h8qkekkhz2nx0n81a8gf4wu9vu70gou9l7nk2q17w8le6e4mo95x67rqjkt82tpwm69r7ahzls7xjz9nohvd1xsmm0dg2pj2qw72ib5ygbiho32f5af58dsxelxzuxzhg1cjbl15vrnc3z8vq3cybxg5bhn1yemiavsw2mwtvhq7ii2dgevojjlpqbw3btrm208mgzeuwiwx2bvhyoval0jgp7dvbgogsp2a82ya0cam9tthictdj67m113gsjv8lbitngjpu68mx48kk9zt0nmrf1vb1meomtto7rkwtdw48mt39tlrv30a89372jf3n829chu9b8j94ur75y5a8td6bmb6pak8h6s',
                fileSchema: 'dmahva0ms704l4htb1w3l7wjgu7s4q3fvpltz979u4kf4xjg5pbjkkh11v1xaohwyvpjws3a1knx6li6shqsn14o8f1g8m010ihemutifm2xzt5x74w2r0h3jw0eigwhkrn33kmbqvcm01x07vpysnwl23qafvz1hogaufhgreu6bygfpnoigrz84aw3glic3g6zi0m37xed3uh99fzswjumxso948rq8wjfxi5umdjd542p3vuukjgz0v55hd7v8milcf04gcuk1g1c3xqx2s37qpgd8hfp4crwlkrs9cj8dm2pjw8u6m43z8wxqr5w3qwmu5650bst7cel9itvoa1nppnf7v8wau6rs9d7e9901x87ta7mz98bj1f0tvldx8xe772zovqn2okjhiyv84bmwmkek06dwb2w5flzgokvs582lyavc0ktrkf0swstje9n6e30ult7mcv0f4m0uwqrh3mzio3lhjwukc7amxwvn32ri5giegvgwf4xgq981o528fpmsng0q7uvdrp3uw1nm2xijb6lcch27dhse3os22bpefobj73fznubdcpsfddtmxcprcr3mgcvasqdyq7rrpwcs8dpnb3yyljvrmswypexugcx1hl4g5hu9uki6qcizu1v9h9xxiyjjz9j02doi1tldrj8mjnyzzeami43qaiwa8nnlin0gzfikyybdrkg6o5g61ft10wthzpvsj3w7aovtj7thtw9sgrdmi7z4ulsnuc0s6phd4dcjzhy1fw3eozcxgmf2rp4pxx99lut97uoq7ikqfdy7sbs0b75xfqq02qzut4mg85oommkga91y5il3a32ulluawcgggmda34i7sf23el1y8e298t7311sa3oui0pbqiy1cra3qafqcfh024a76x1abmvgt20y70eezodjfjsjaoj2zi69qwlb73t7guem6k15v4iyl7qrz7b01kzcpda2bs1h46uvmxj6v3kfp8gtu0sqq0kdpycsh5vardr6z1ps0lee',
                proxyHost: '5bwmuh9tij00id692p6yw24gcnve7k2yv2s0m0yi2w8eexhxuj7psmglcnje',
                proxyPort: 9771484325,
                destination: 'yux0e5imip2jjt838jcdb44b55i2psuej1l4rb4n5p6vk7dhkhs3d4qs7ebyhym29vgyiqedk6fjo28sch86v9rq38cevrrly4nyqx82mxc0r0ueotckoudvpxco82u7fzpxnz3e5u63qy1my9eqpf62epf6123h',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pfcc530al0sp4bz1ewzn5b7etepkbpg4oe24sjic0evekt436tj1rgr7215kn4n28cwvau16yaejlenxdgqcpma4j3ssdhe80xj6if0pxjgw41kbrqqmzripptxaw6odr2wfnnlnjpotnvjzca7aftzufcvd8neo',
                responsibleUserAccountName: 's19uw6ne0a6medolmk8k',
                lastChangeUserAccount: '5byhojaapgud15el7uic',
                lastChangedAt: '2020-11-04 01:09:43',
                riInterfaceName: '3v7q5b3wkntanqlvnwq4d85m27ag8ihre1uor7xpxkirxv11t57xb7h9ilg83zpibyn21smy7xo0mq0rlwg23hwps6tporzncg9il7q2ucs7qq1q5ygcesokzf6m6qar99vftu6vp6ufkhskmps2e0y5ikdv49f4',
                riInterfaceNamespace: 'tw1ryvnv0dxnueoul1ghj8m1uyqi8yacyp9xydb2sggy3tdw19mq3rf9achhmlqo1hs2iqkhjhy678469uvydp4lhl8ugkldor9xra6bg2ebp9ojk0a12y7reh3qt9jy4z0ywubofe9ygpj1sbr6c3gfx1ogr2my',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '3x5nvjjth8qrfvgdl191rqalo04vamd6x2bncq8p',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'qg4g6f9fuaikogatusdkype9hepqgydbttk1bpjhi2pizvm1ad',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'xcxpwhzauu9q65omkl5c',
                party: '6f74kjxceg13nxat7bcadkzjmsaw0od43oswxzsk05evqx0wkedwlbr9os684xzf42rnv04lfo1doe4hl6f8y6600rlngrzn0zdvv7nafa46thyrhjnabh2muok29ono69rp7oee7isgin5078oes08eayyt72ha',
                component: 'p3faxpyt3h35luzhnzvp0jo62c3hkwjdc2mxawg10acsboz93uz22ag60qun0fj7kqo8tqmacycs4jsu2479n9gcc2ea0cx39cjkgw75gs6hbb7ru99ho14vaiui1hv0vd9f5syu1q934okdaa1pwfgt30qf329f',
                name: 'a3fhq4uz0nl4gw6it01czfky00kgjbvp1jozpm6hlvyr24xoppqzd56piwx9uz2zxk5icuvzv4v12yp82ivj338idpotxb2kdzhqxdjp4bsulqff8ybe8rvzi5kv3hkbwg0gl671slp94mdbrhj9ys0d7dickb2r',
                flowHash: 'fpl0c5ka1hl44w24hyminuypr1mlxk228az58o5u',
                flowParty: 'ctoyoz8cegep1z2khrduvbqimpc13owpgsej8wyo3y76sv0dgwqsi19lb7us6rfi6nhyvym56uqitcict7h9dkikq42g3gjc882upky8d0njiyuilnafwj67elhn1io1slrizz7n7swzkevn2wyu7y9j2vf17uxrq',
                flowReceiverParty: 'h3y4t9xwegb8m621jpws52g2elea1udwbjsdx05s4wevjpvlj71aof1gv205hictuuxr229cx33jssea8s0ixvg8eog3jcvkpu0mkq8yrzbhij9icqoyjm3hn2odxqaaroqvb58by0h3ivfy8o5hihhgp2ak2z9l',
                flowComponent: 's7kc0as3yo0motcv99iw8l9yh5ijtnih3r37urtvxa90d0zgmnbdyxx6b30cge7rd1td22z2q53ohf5x8mg7b17y0hv0dz6ba2nk3xjtjdjsg8z6bz4kq61e0fzp88kw5eu1tslnbg6le3zbc4dphd3r2wsd4zk1',
                flowReceiverComponent: 'kff3kvjx6caodx8wmaczm10josmpysoo0lg9r1z5glhdnj1atmxqipxx0ismf4i609ib4ie0bk3cws6i9s699i3iri279ajk77hipqof8cqf0q2c9pteaew1xvcvrxo6u0xjsxhcqzd6adyr8wkroqab6p3muo6f',
                flowInterfaceName: '5g8y9bbx4czsstm9bbda1xu1e4vn0lulzx3k6vcpgswiai1tx3z0t2zg5cki2pedxgznsibjrst7u97k98dw22t3chrrnw74dxmvb3afx1wiytv1t9dn4cbfvs2m2id5qpa9hpdz16ztuadrsma8kk3xwqtk5kp9',
                flowInterfaceNamespace: 'a9c5r8oo9hnj43v9kffwbb77v2xkrxy1agw1msm09qjlmqjhenfa1lb3d3u1yw3be63f6edlkag9vslp7ftkqsia5bfm3ex9rd9mhctuzx0b5e9ax2x5mc4vhpxs53bc2erqa2lrqp47i9bltlbtn4j0lb3wq79p',
                version: 'enkqm19ee7ps4xc9q0p1',
                adapterType: 'o118ubq7yy457pygcqrt6wxta7x85pv026org76jodqudagj42f56stzbko6',
                direction: 'SENDER',
                transportProtocol: '6ji1flxhozp9ra3lify4zsvvn2xq2n6sjdd16qudtj40rhgjssi6oryagou3',
                messageProtocol: 'zhfssdkc1c1t10c3u67qkjvntpynwtppba252o2rzv0032r55406mrvkxmqx',
                adapterEngineName: 'fu43tkabxb0zelfw8yt4qi0smytwcrn23j7om15dbw1at8tpy26nqiem4owtxqnm29ump0aqiru0jk5sqbv8pcs5pvx10uwxqp0865i3mrrmjmje9yvs95qc0su4i4wdbqpe1f4brr41dyoliz0ml50swpnmp5rk',
                url: '4ewcggr5v02p3mz1coskawe863l1yb2yxpn2fedi9y6378baottfi4d0bcn7xn91dxchfhd010kpi7g3nzi962kk0qktet6b73jsakkoifk8hv3kaed6n9mvwm99q5rg9gmww1ju5n9zrmv3yy6jfc2nptotnrke8d18z7sou69e83qudzwyeippr9fqmm0dnxgfbhc0w3n6nmn73dhi5hsijnxoh87b3calsfzw85tfvukxxy0m7mivssltdwt8mj85i35vhnrti045i9bsfvqqo4fceolphnhp8lryrw9j286ittisuqrsy04r2vj8',
                username: 'ylez8z6wzfhx72n0vq4wuxwdmxcbh57t7xz9a3ltdjgrb1cnlcxp9dlh8m9m',
                remoteHost: 'h5wp328grk8sb71kee7zzumbinp2sfcjjj2tsqk43jf4a6sne9w71lqno87157c15t8zh28dyarpvr7dn9ql1aocm716qrf5h67jaluhsidg67uwo6h2i1dqevgjn96b3avvap8x853kmz8lpdjir7zima5r0thk',
                remotePort: 5055115090,
                directory: '62su0bcqg4da4vdqnisckvrgmmj1g1xbaf2yinf0kl72dovf4aony17qad6z08vduf4zzarbu9rskcspfs8it9zt8ps2zyyl7utdai8cwjjdp6fbyt2u9rsoi4ck5g0gdrc6w6jzx7cwhd45segvgu8g0c71zt0o76d5vxe95iiv3ykprvygpg2ymxu1lfwvbh5oumrpha7lira0ovfe3ruppkgg9guckx3srnlov0o0a2yqvfq0s6wktam6toalph3c2upy7zru2q0jryrimajcl8xgr25ams7b1djmsuciv7j3jmbokitrqq0iayhmxy5szk50qguktu0gvv5cbrfzfdcpacsrmf32u3nqy16r1qd0cffk0ng4ytkbwz680i6ggijfda66w3g17a190wewde08353nvmsav648b26es5qc6od66r3pm2dtvvhdfifqf592hj9usqm4jyd9v7pn696ro3b4syl0cj37svlmy4mbtz7wi7wx8rjm5r0fdox5vutcobgyne6sl29uj8cqtdpe25pg2pppug1fa19bbmnr5vyarlgz3iyytgkkpjuvjbhn2azbwvsztzumozrtbg03cguj1us3xgr3tppizmqgk32uyd8u83gv43fnta4kxdnkjuaa1vqe99tko9st64vbuhykce15mmitwskyiijmrys47zy2sor8bechi95fpoij6f4kpzxgbcheg1pwmor6kirvllvlnaebajy67ed39r5synnv1ghhu8ifyzu8r9w1nhlkng53kl0s85rebfk2g605pbdpx7g3knevmro6ctih1i16bpz3xf23pajta2g6wan4kb06a7uhy76hyo35qd37bmzdg1s10x6j2qx5z99swphod2k4o14qi3bwxhk6v7wq0fn4fxt01f8qficzlpvytfhrgbb69xoa6uvhdahvtivsgp3436kliiz3yd7g7a8hgrt2uv0k2hjec44rlxh105ahw81asqj94nltssud9zoevwyfdjic',
                fileSchema: 's1x3tvps8mrk3a34v6dciw9x2m8gbu7iztmfv948tegb7at9pds8m55uqi2v0s8s40xzshtsd10jk6ixyxmg6ohj1awnyrns5p95s9uvydrmzy8bht89n2cftv0fblxdkorx2fd0sra4rhj782ehzipkozcckgta04r6vvipp4z3i43rlpi9qhp7gchegic8th20swrkmb33s5nok5cwdacvtl8juhspw592khtf9538hkxallbe6r421buydgkum7ejc3ur3xy52pyrh2bo04vopmkg92jf5v848rwd8mjupuanyffagl7wlsxyiel5raltx4smvajww8rq9ie18uau6hm0hxn37xsu0m3qh6vosvbv6li6cd99j8qpnuzpplsylhdrpcp2svmsr5b6fi9g2bc7ps4twcc7jbt91sh1zorpbh3in1nmhi3atop57jo90l36rhcgn66y2prjr6hae9zqnl3mv8la7p8dlf0l514dd32d0549sk158n1w787ev8bq0211oi1fb6xau0rkg0ngqw82pnc038hakdzb4ay8oaz8ifkh8k8gshebpybmjaa46f5qsg1iorkwjzx1ffyxulsucpezqjk8xdancfgjzxnsy3do9ef34po4znu3um7rozsqirso96xh7uhjv8qxupbjpy63czhsb29ckt37vpx6hypw4gzkghg9viz3vvdwrsavevno1rxen9u1p52hhrmvv8l3zsva6sybpknnlqcscw4m78gisbst7v1unar6wpm8wzw7eutb6d1wdwe2yh7l4pp0665c74yys8rn48udswjqfebqowip7skwmo7fvnhz3hvgi8xtxp92zpcti6ujfvhjsd3fru4ulokntz0wdocqxdigs0wmc5dyrl43k61pcfn9bu0us8phibksicdjh4024habwx4tc9guo2uq5aoa257ef2zupt27ytabwtb08t7184b3697yfrlqm88397u1cne1xh1fuxjuhanj4b6g1js3ytpc',
                proxyHost: '8q08gyaco2vt4ustn6v76ft835ahg5qbp15l7yyz681iy8k6v93y4flqpd57',
                proxyPort: 2406288849,
                destination: 'szykfb0b15vsitve05kj32v2sp4n07fwh74pfeix3f8rxms9q205lu4yu8600s4q10o5rjxxn1v572x2nbb5jpc3brfy80rhuwy01oaqs9zv33e77909jl4z4vykwae572ursou66xnfxg8ga9bm2hf1uifkw373',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'huqaeosqz7nvw62d2qbnfj0btise3os96qlmvv9tiiaf1jte4y7glgqlhnifq1ba5f4j53cv6fi5lqkgr308yog2qqu2us3jr4g33nphn88pu2qu45ag2vifhzboxiydz7994siqea3ujlhv2mub1nxu4nv59es0',
                responsibleUserAccountName: '0mjyr5ak2cays3l5xzhn',
                lastChangeUserAccount: '3m1ejlg7xjxkkjfq5cuo',
                lastChangedAt: '2020-11-04 17:15:24',
                riInterfaceName: '8rvlildl6b7bduonm6mj2oowyo766995w42pgnada90j5a9dgszkiifbnj6wd2udvlpce3d4vfy2nwb54kc2w73uxavj9vrlbsd5gaxoe5t16juccylooxlht1pjs0svkk9ua8s0txdg3l4zt6nu7253qooeoule',
                riInterfaceNamespace: 'suvnkdzcsg1t0pxgstqci1f8x5pso6x4zzy9995sloalw7ilfdpwlxtb05fes3zkal37xfgnankbl45if61641fnojsg5fo2oama6jm8ixa7w8w5fgleennhotfr9wuv2kne80mmuveqq0wavxgygel4k23375uo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '6p9farzg289myy7w3nvmkyvttiq3i29gifdswgd7',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'zygy9ytvq1ptx1li6wfj5irs3sletgwh7eeweq42os0yonwbht',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '6rg9opqaz52f0g2l42c9',
                party: 'y5nm9rqofcpohows32zmir30aroxzmhfjv348btyqmt8uhfksh8whx0c0lrcof8t3d4whb3sg55i2nebwtmeup2yp5yc2kfy6yo6tc1e42pqjlviz4fw1wvssrjc2gxdrqfbr59wv3c97st1u725xvmhknrtmmuz',
                component: 'o6h08thogyww4hdwob152za5kqb39e1h5zu5s6owk57qjg8uxfyp52l3gbqlfqspqgtowej02i97c3wok9890nashmuehkv9ktq8gahjlk4a1pkvsqcwdhynnudiwdr0n04r3bk0fnliudbzgwa0po8wwixj75l5',
                name: 'cpxfp3l0eyhvm5xnwl63kui9bxr2nqbxjxn7acus422dz84mk2c2z0tsnzc6m0sdqzp7qzbr6qxmpx8v3lrvkb5juumhg2nctd9k2ad3ppxciuayiwoii9z5c162f5w8sez61al3gyhqeoazxag1ucw0cv7d2oy0',
                flowHash: '6xh0b7z2dqkhwuoa7388j40u4xkhyqqbh0lrgtyg',
                flowParty: '3qwzih31gytpz58dg962kj8x3cvlmi5mlsartp85eqtwunkal7wxokslgn4001icbs42f7p7c9gf35qji4qbi4c48hagkuvfng6d09ut1awocgnu4hhcsawn5mssucvaoq5ebryr93piillnu84pumqimhsbaa8n',
                flowReceiverParty: 'pi0az3d80qri6xka4x086fer5e1xutauhn2e1tiasf83e7fbxoefcfvk68q60dmbe06v29dpvjkifeb4ik1v6mskrdudpklsxm43g344tpxhxplxt8iwv43ogf5wormlo0uhkzhxvhxriaf3xvw6sl8pd0oatdb56',
                flowComponent: '41nan7ct0e53fm3ps0h2j1trmkpd8601ameo7d16gktqldy7e0qgsxnhc1w99giulnndrzz6x83l2b2ux8db0gg7ywrxnixp8d6fyaxdznnzdthomi0lulyjux3hezi805wp0nkloz5lyobryxzuhk6at7p5cr4j',
                flowReceiverComponent: 'movt0qxa87lj90q6vjc9736vecx8pee9pkv2uorl87omoaowcyiyx7zuov8sd07t6gxxeq1881vmywcax7ty062qoes0zm6uvcpmumh3ld971ppxrc3vc70hufov7py4jqb6dzci1tn54vdpoi22v35ovl99ybfw',
                flowInterfaceName: '1zaikv3y319t1pg5fqnjaqd3p43i3tkwjz2fl02xgthx422vlhv85cafcv644djfa7ym07041bf4za8i7s4ifvynu7op1k9obleu4ewttcy4hsxsb5q1snjlb7pg2513hf65grch47ea22pd6ikdze8he6fqrnv0',
                flowInterfaceNamespace: 'ff7hkdhs14qdmx23coqsax7y1m3qc4uh6jn7m4vp7h6p4wx66i566ld4l3ys878xu0x9rn1q738cditltyicm7h1uf0msnr7ume2ocof4blxp51kvehpfg816dtz5i7jdpk69jty0apnq9zrvnim20by0gqct54r',
                version: 'dglhl1l1duydikbl06vz',
                adapterType: '9w35hkc0caoz1riuhc1rgde9577zenput7nhi6jpng0v8zldepubobpe4l6o',
                direction: 'RECEIVER',
                transportProtocol: 'yp7xme2mr5zcoxbnoa7auiqs45mxe43969lj9zqc3h8mjaa45odrvkhjgvzc',
                messageProtocol: 'svpbh812t0fbz45t0mbzt78hsnvbs6m1wome62o1w761qsrdoeh2smst825y',
                adapterEngineName: 'gd75381pqrwjfxbu3yqzexz1tc8kx2xe48yvbx2rhmyz1k0xr2y2g4vjtvoe8qe39tkxgeskefpu0zoampa5vq8u3wp4izunov5ky6filuj2kw8dbmklbdb9kum555iwuc1eefcd4bxqmy6uz48qcvgkiasoo31v',
                url: 'n3utalori7hp1bjsojstwozgxajqy03ezb0r0mdjua1aiqaf0rypupiy46yj6psfayv2c6ojn75ugursqzt3sveuwh0gdkx9bk0vc6ecy5ogjuxn3adsunlem3nd93m2t85ojvtwn726bz69cw7vqiuga7m14aletr856i8ixd5dw69zt0k5wddisghgla0f231n70nebqv8z9z12tv6fjfz25p3u89qwgqf8hc079ielf3acr4k365c7hndx7hlipu5h621x78t139t5pj426bub7zwa8xewe73ak09dwr88eszt0twc5ugu70fwfis',
                username: '9uskrawgnk23u4a760me8agdmb3f5uwe1w3ucbi27mxsm0a20r11mjktc2al',
                remoteHost: '9fw6wkypjkwtegxaqbklmqils36sf6fd00g1qdshvsu9hdatvs9q3ovth4jas1bz6sfhs5vaxk092zp0li1hb9mdfo04g5rioc1nejy5hriebqhp59r40xt78n53xgtec6uc04f2n9f7o8tnasgeoy2fzpc0pnq7',
                remotePort: 2614130049,
                directory: '6kawvczsnnd0ki0b9eh2e8ip5qn4971w61mck5e0seodik10lngnx4m6anehlc2ijp5crdl2tuwl6jbaiw6k03vlpotegndt0vxugmppmpr458nv3hpo3jvwdn0p4zzjuz3r9kercjkvs5ws8ojzgops4nuexwqv3ja6clfolgktzbw7hl79kgiephf2hotx4aku98b5em94v4b2rw9ezpk8pqz1dg9xarnhc9zelivxjce292hepfcglmtf9zskdwxnyvqxyx6j2753ktwpsdigtq369bzd3ynput5p9yp3fknoigi06pl20qa12qnvvzgr3galenykwikh8nhhrarklyieec1kqaux6d0d6z9fj2fjx5tded3yx3qe8kmwhxyggx0oir9y0khtgef7zxhow7ky1yd1vai6wfxva42zigou1qxg431mj6rteui8uc8ks1nxko5wb5s5k92u1x5bxxhiidehmkahu9w8l4zq8fdn575mo5fm5ngr4zx70s93jcwh73xx5e5ln33djlwx6cbwh0fukiupp8reykq62ok4gjet2dk0arwi6bvx5sw0ghtcoysesq608uptkdet9wzfj2s5pxofjes0gclj7o2li7q6h9qkhj3a3sukmxwxocy4xsom22i23q0eexb6pgsh1og0ueg2z0ohpa69xni19l0p8lrjab9amtifduxpf4vfzv8u4yq92qcbqlrpsoepx56263smkgz9rw52ntzrfc155svger2he3evfyeuo2jaiyntq2r63j57568wpnofdl2yl6dizgj3xawrvzhee8oo4tj244xq6k9zbawtz9bk835srk7t3kcgkxmqrq0pfmxolmp54zd3xiy8k893vyrrewc3m3rb9lx9j2c2b9kjqywtrqaexqzh59veeo2f0obgwm5fgxkxnkqqx20no90z2b6p9whbdyqxvasamdddk69b8npv4jhldjxlp543mmpbzflhbvm7634fow9aagy39kdamqab577q',
                fileSchema: 'p3mxthxw07lclg0v7hxgn1gjn174o6aknll8qbubr20use3rnq2d7nogkvyc31byg6san4npxptlwsblkungap51dy7fndc4bt8tiok44b42il738q7x98fgvl28jlo2kfi2nqu2pvo01lof61d4z2xi3jbk9f9eulxrcjhqq2av5gjg99aqwgxbd44uafmd0v5oau1igas9vhvmbv5zsc1qyd0mv4174d0ogo5kt78wreba95qpgqgb5hn7u8wcvz6cfhgampcygr5oxd3a2awesyciskgvef6c6xnrthxw7d5l35ghcg6pdyqp44dw7gxfxre3j62ehf0ass75czvtujzw64pimjof29gpznqvhh9pvpdg0kkrphdse30vz59v0xdwtpn34ki05acv5crl8b0ijabpm884snsoji2311x4w0n004s09jshfzl600y2zgoh5jyp3s54o6h5uoi63qtit8vh5bltbfzxo3kmbobbv84hz55pltd1zq4uhsngrq9dmv26vcet0pb7j7x7nuuz0qnz4e2yrj5gb0zlgwhz0pvzre9thzebxgxheh348xbc30oggsb8nvws3lhvhpj5dqymoyzlqc8iw871jtz17zswbn2w1yfy79s8or367go8o57crdil9vc5qj3t4lrz487i5uum4gowbceet6dk3rz35fk36hkx4tolfczw9itmb3ykdtvm49c2dovubm2xwel0q15q58ob0qp4zj7dawl4n82np5ck9c0okd4kiukhf9etqco44f8uth7zwvlnvc8ur6h1awc5v7gil7unvvw7evexkfk4mxl6h3srp0roojvriiv8qqjmhvzzkq1e6i1kqq940u8jq2dzv47eng35jx8r81b8jn7ikgd02u4r1ysd4e6456ive8v91zhqabkhr1j5mvhxo4vyqsyvaa9gcueyqm70hec9loledx5vuhcqvlfhre19x31gm07npn8j0i26qx02qd0oaarmv6rtee5kv2s198x1',
                proxyHost: '79v2bgnpanoh1d3x4vxzwjxp7wm0gm99bv5nopqah2e5ugr4ok6kkw1bzoai',
                proxyPort: 5080530182,
                destination: 'fiybu6d5ptubcbnampn63tin59viv29zj8bu4u8hxvo20s4za115z0jdg2kvfas2ktzr9f1jn8zzojwc1rsfn9dlyriui30tk51a24nm45f752zhj5k6nm6agsta35wpevbzvs8rvbrnrujbcz4cslybkej6fkc5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4e8rtx99vjm53p6s5cig6io0rh3jztualbil5ykxxmwgsmr4vl1ddxcnoz11si6dgm494fgca5fppd6yudt2tjhdh3g5dgu5j4bzj9asvp5f8guv4iw6gdoe9bu8qqp4n1whsbdew0g924jxvdngbkjpslncxfrf',
                responsibleUserAccountName: 'phgjd1tiq9fyk7rhh11h',
                lastChangeUserAccount: 'wrzce5sozjw9tfse46ww',
                lastChangedAt: '2020-11-03 23:33:10',
                riInterfaceName: 'zj3sxzw81mryxs9z3yp4r3li9wplss7yhw73znxy4xajlpz8xk04gj5zrangl7wh9cvzuy3iivxfq5018vz748z30l19r90vabbelmnqqsixhrq7l45xe6r7w57f8hbm7weh7irasee7tag3ak8u2vaa40zmx339',
                riInterfaceNamespace: 'kdfso64wqyisb5p1zsfm2qps1gmoq3escpm21x7gzgtrhrl678oc7yf1rj2uzxy687esqz4yq2298iahqb1vlgo5ust1lwgbimrs6g63k3o68f1u6nrebnkt9w5rgyfi37xd986fckidr5vues48qrrro2obw0nm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'mwjs565inkp2ck55eaycdvcuqjwnxviea29yfhi6',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '05urkzgi863zvwjoux6qqejaw9n9lv50vgdzdnkurcyda4exmj',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'mngxzmrvqcss0ixs7pw2',
                party: 'lffid9t7jahvdaif12gd5dv8oldac2w9okfe90nq1i9hs39ixhdgmsg7j9rfhqrv9su0l0ooiiv2r3poqizrjnixqda3d4eew922bwji6v7cdjh9j2dpzr4l3dimnq14z3ihsart7qkss76ecj13exsdorsu5mwa',
                component: 'm5ihv12jmz3j8qapi4vzl7hpz5q0fg16hkqume0k2gkxcbdfb6a5ldf3n2yvq8e12es7te8o70vbgr8abfot2y6i5s35pcrwywxjps7326tqp23smxrvgrsx6qzwdqrt9nikswd9096apoolxcq1xqdnhb9f8n78',
                name: 'lpv4ul434l8b20q3vg0rljqkwti6ab5nrmgskcw5cxhi7o6j7hbcyzm8msxu6uvjxhu7e66istwj4085810nyhuhgwu7pbamwfqsgegrbtepenafkaw9086dpl2chls61c8kp50oodfbytc3mutirllbv6r1h3m9',
                flowHash: 'wf2a35hiu9usw69w13l4idat02i2zc0rqg2a6049',
                flowParty: 'ncmr7fuv9ltz1fbg4te6wrxf7jflwq2f8bc8kll51pykx73c7ie8e388g2ojsmv7yd516ej78widf69kkgejskowtp22y6qz0ri9ecqydl94vv22yrfoo9uqskk3s636o0ksbni6csilv8inr70no8s1mc9a4ldu',
                flowReceiverParty: 'fzp1z6akfm1j6ed3fxnqzck2notwsopm7pl25ubunqb49tbmvaad5gdergd09l8bgopksraon49yzl5dvbychjablaathcxnycrecwz6wfo1g7szwwjmc5y637d0n8rg9utg7zsfw8a473urhsv922c056scv06u',
                flowComponent: 'lj643zxizp47qg6nmcut831ioxbshd8kvzu4e2gwfrwo1y68q2z6spg8jjxzmj4l96uzxcdke5xl5evwb2s9q60gu7ke26sxuzzy4n5il449ymt75jsrwjp2b1zanei01h50nfj57gx4fygn9khxzs6xl5d9xkb6y',
                flowReceiverComponent: 's2e92zabwa57sdt2v8jfzz1z5pmmnkie0edg2t62bohcmpnqd79g8t6de8btnbfdfkpopdsgpzmkokao2gc2s0sargyvkymf8wrwvjzv4b16rga4tk7jv23ppi8fpxqbsv6jdit1iwvgnsqqdqdv206z8carebsw',
                flowInterfaceName: '06h9ze1ht1fu33uirhlo6wyagvk1yh5tgl9c3r7qy8iu9lxatu6o6iazkxrt3c4ooi9x412nfyflnguotx2q5tw46qfapuqgj3j18kelq96xdwp7h4co8l4hp44tmrrd7bsxbt1aooga1xjj8c83em89d0wv1kjx',
                flowInterfaceNamespace: '8wewtbgphz6926nm4e83y4uqn6jcolo6g32y1oy7s6xkr4eevomuwmd2yevfqybm8ef8tclftq65ugkf8raf8cdwvik5z8ly5bdo27ge86djn106covjq5hf24nxvaejjheovjv415detwgrpxyyaxgbolezvd47',
                version: '9au83fq3we4jxnz7zvg1',
                adapterType: 'dgfvjrn056i972anclesgg27si1dictljeobkg9qsehv1mza4cpyt8g37r8m',
                direction: 'SENDER',
                transportProtocol: '1nwgij2rpi972kpt54pg05oedoi0z2jnp99hy4qknrzb9iyikywo631vcy64',
                messageProtocol: 'fmb41y9hfw7bcozx750x8crdr5emy0poqodc8dc446y8p001hgcaibdkl8j6',
                adapterEngineName: 'xnwhwgblyyevjqxtod15c2on501fval2z45r899x1yu88fmctsqsgbbd7hhliw04e32eeakj06l3qvrcx5exvvo7peulrsoj70lkqibmsjqy71b53z80xpeysyze4e4qvmpj3ark6koiwgrkvciz73iw6a8iw3zs',
                url: '6r4k4ls3pnea11e5zndzhj69fzpgip3oy6n0vyfvdc1teebf2ito06b7e3r6tf5v7s73k0ylrme386pu3scbnk0jave7pmfn2noqij0oq4t6yotm1dm70i80vtpypjyhkay07et5lbrjegza9o5vs4ljs98h5g18aiqjbis3ft0qet38tifj5rzr97e9btisnr5undi3wolk6t5xukayjty59v7263kqmwvtu5ui4eaw04cwy8bac1vjgm40ucshy2vho3ygu3kxkyj5houvkbkele1rahwh775va13kgsjwsxoptut7ln3bl9wzz998',
                username: 'ufr9g05knp226jbtb9vb2dim6s27u3c3diwh3nr8ldyxoorn0b62l4vtrnf4',
                remoteHost: 'qjos740nsn7cj217avnt8sn55fybouh11wkbyrmwf576sybft7z0anpecuclcwghtc0hbuysmvibb3ypw6wcnxgunqxz5t4x0bdbda03y6y73rzasstuf01vuvlfpkpet7nrdgp5znqmhs3r01u9mrswk66rzrw9',
                remotePort: 1413040378,
                directory: 'fgky8xnizic3e99opwmjq27snsqbo8wz8l1npwbpx6an3clu9i3jf5cl3q8ai9ijrlzuho8ins4553n4gp4cl85g5rw31wernl3curb6222sabo74drtrk0iddfhqkaopfaumzrgwqem9x0dxopidz6d0i8ea5hzla2pnyl2ll86kwrt1zqbzzs9b5myprpctbyl7quk0fjwomkjufz13mg3jx6p5o66692bexo17chzmm6dbj76sd4935ymgx2y2l4089sx1hwwdyqqqi7k4toyt9nryseasanh7qy1rh97fkcisa9jr8owkrd00c2yrtu8wivrrrl8vk3jsg79a530hywprzddej29j63twspycd9dfw3tayjl221mfyypnwmjlfv70h9ls1fc7f1sl8i8kb9rx63khygo706ty53361slklzldytcbo1v1x0ivyw2dcphnivg47ubs353ynunx844auq1j3udq5efcxw5hfm9m1wnlkthalr6ea1zmpprq86h68e5s6lnmosxzaho9jig7pnqlumt0y75iw4lckal95pjxz2ge1b9l0qo56791t7je0reqbt4p95yb0go15u9twysa5tjrf232p1nda4s28o14tfzl8soedpfg5rlhx0icze2j67ugqjrbsp7cicjpt11sjnsc17ll4lmmnbrcs3suo9nsmqeaz4m3ekigy7iem0035xkbjka1xb3mrstxzdk5g2bk3ejyyk6pfhm6zduckxbnzmqfad2n135rimksskb3gpueg6ca0uhofhlam4nwph739pgox8vw0rl65k1bup1iq5ova7fyob02tt9ggizxj0rnv08tzvpw8ludarz7gywuvu68v8pb7v8oqdzzjo0iisqq4dd1aqbehfi3c4pkmkjaoe42jiv94fbalmq6gv1pm9scyx6wosvba3eeg722r70z3oak6yd5zf9gm12zryd1h93241wqfda1bcm3p7wruk86ccj7qzw5f3w098ix7f2alht',
                fileSchema: '1va0mn9qj6ucdwtgfgq588job64i5wprvp4fy943d90nvkufwy0lce6rp4b0f3j1ikfcd5cinkeu80s9gmrl1ysdhy51muwidaba5kyao0vornckqo7c6n41i6l4c4r5bvs5zwjgxuq0ugng5a2mh88qezcda3g0aqa3g9sew8g1d1w5otuuhjb9r3j4xuwigxci971w0nyg23cbtkevcq0fvwuvpzqsrq96as3w7aym7v9wvto69o0pya09c885axoe7qutz7ulqmer5s26a7s8dlijyk9bcusoijsw1u4dhdx7433eha4prhgf3fm4t94q96s4szevwvp5jjjdru975z6a7mnpiezgsyv63kvtire1nzk98oq28pioad5ql6k2allaa7iw4lukhxkyuzcjqg54tm7ydsdu5zpnsyez9prokkoljuguuacms1reqzx6p1nkz1w1800st41g276g37eziptmfa4c79loksn2knfjlo62yufil8aueh6756jvbsgtdwg46j9sk78wnwiugnjzl43c47ywg1cpd7qm5meaxo05nt1267bti4cfhy9he3jxzur9gwohnptm4p3wphhdslo9d1su10mxwjo3qfbv4pa3g6owgefagz42zuexze5huofjt124szjfsorn0xd0tldr6aur1kkug11wajt1jvfj6q3vumgc5xjvkyjuwtictak6fephcf2i7ww2q3qak0ufgc0vk81uqb52i82tju3xpxljsgwbbp6t77sd1haunp9rqd5gh02vq4sa5erlj8zjelxrnc8si6sfwpayfw4u4szba3z8mabuotu8jympi5qpugypsnnaaspct05542pe7v64jzcsu1hxm8ivg5aorayl7x7abllor6w0f42whryjwv88eliqctc1ayyidmww3xlckehv5dy5l4ve13mhpmfih58uoaabrunn2q9pszceaj05alxwxgvdqhicnixgq3vr1ef5uh7vfw2kadm7dz9jih19zlsu',
                proxyHost: '1qzqjwoq1wuqjfo9c8yeb2gmnehx6n6ahoiqzl4zbz7346x4d7inrkpl3fzc',
                proxyPort: 9828813262,
                destination: 'dz7qnt4z7wupejeh0hsnjvpyiewocg2dq42h5wivtc0oiy5w1km5olsmtut1ii5t4epezt3ayi65iul4q9xykwz5ua24x3spglclg46ajht3ll5bfh2kt0e4ae15mkmxpn3js5pjvpha1rcmsw3midpvl7o48dwt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'flmsuo6dk3wehk2cllj56q4is58ayt7v8rrevergqzgh9de18ludm7cjxi7p94ekjirw65z9gqn4j7rflvhi2b70bn54xcy7vtsam10jbq8n9me3cawubr72w6oe4r7c5aquo69f78bjh1vitshc0tvbpxgir9vf',
                responsibleUserAccountName: 'gn7uodmz4zyfa6u2mzfm',
                lastChangeUserAccount: 'lk6qijyai07ovcuszmdp',
                lastChangedAt: '2020-11-04 20:15:26',
                riInterfaceName: 'kwy61wz44rm9uyusj28qbqmjmni02pw4xqgapj4mnkfrt8hdqkp7ocuv1sf6syll0kgj5yf5g33a4gtgp69mwfh9osfnfscok9i9uese56f7jwevvhgafhi3uzm0k19zrq6ok50s328bw90367ozkiwxeipdjyn7',
                riInterfaceNamespace: 'qnwa2260x0nuvhiya0cfje11tabdmn6ocrs490vmxxj9izr0grhkx447n3vtnnqy2dunp4yn8toko4nbubncrtzrkrf87ldn1g06zjnm6dvfybdqpoyojmxehjzp18mjs06w9p897shpaguzrycmbz831t7fuxrb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'rf24avada1y9tsb4h8ftg0e4xx2beoyd2pa7j46h',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'qhtr42hjumuzs5jqhbr98qzbi2bkpd9r6xmvjkz3xo72letyxj',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'ynzn0gg5e2gxiciey53y',
                party: 't51i0jzo1cgx38hslhcei9gkigcfdp06rhz5l0po6954xjqxjcnhloqvgg65uxbtsa9rf7aqhh11y0upawtgtjdm63e892tqcdxrygsghmkpmkk1c2nerisdxpwpxb65h02lzdjxv7ozz1gbzsf6xcqem3k0ehkj',
                component: 'csdwm17z8urkekq76igqixxkzwq9egxpqtu5ho6ndhx67t5x6in7y33z2n0u3od7iqusfh4fhzb57pq4gal5tsbi6p2upbuzxcb2lpk520aexawzvyy0jhw3otc0pf48whvj9jcmhtd91fnj3hucd8as4qiffpyd',
                name: 'omraeza3yv4e19b2yec8pxdoftbn5ms41s6kf8bdusmn07nxla2en1bfmp6h73p2p0al8vzgn34xygw7g371bobrbuwp1uuu9ztv2iw858rjw44dnebbpsultsl15ermr4r7lvk34zx5o4t6d1wnkjpcjirih48l',
                flowHash: 'oamw308b0zmgahsgsl721h1q85b4a2xenhcrabex',
                flowParty: 'zrb92rvqu9n4pamk59eh7iktqg7r4d04mvmmo8vfqtmggousy04v3zjycmt1udnl0egj38dmx4rqdcpx54q4ykdq0kdfm9v3pz1vrvit1esl3xbp2lqxeqge194ucbo4dvj772rwc7q6819eql79zsqode9xbjlh',
                flowReceiverParty: '7g3scvpdczorjbhkctaktrbyz0idbg8wji41h493swzjsy8cb83t9kkmncawiqm3zethxqj18pjkc6oevlaqked0kms9kmu2tos8cqag7i41420fhu5pw4fke6156u3yabb3qh7q9lhcmy1m2x0yvvisoqrqal0t',
                flowComponent: 'xzn6k35ekwydj8lojsoo31axzj605pqpkvjvd6mf8sbdyr9ud1v9xfuds48s3hh460ja3lbb2fn8tn4lvwgb06tnr02u8gmu9q87c7zzjkddp2lcbjujqh366kuqaof2ynytsq5d20ixnsb6t0wkvfzjan91j2xf',
                flowReceiverComponent: '2ar8ykr1rub4y0hku3jcgpghd2wtjqo4uc3ji1gsp2xgxy0o8kyp2k05373xgiy5zs0ffpde64keovfwik6dio19rv5zfatjyau8zyunew1cw1ydplvmt16eefqv6df1ir2yiupc7dhvja0xb88xvd92bux2fvu5j',
                flowInterfaceName: '406ehbd6y6blddowklmrf90ibvjq4nb2th2wtauooo2lvadghb2gtum9572880qb9s53axujvr2xstvygpxy7p2shb4zpyk5h95caiar8mc2jf3m2u7e9803f69lfbclzd3z49guk7ljk9ary89axl4fddjjxy42',
                flowInterfaceNamespace: 'iicmg16mjsd617tvmrdlvz9f59qa1uq1832vs3qvkddu75bih5u5atj3vw9xigk9unb9unsluv65127c94j89g5rc3zpl0nxezj6fjev9b2g8lk45zn59az0qb39hl0ma1n34u3rmz433xkokem4mvta0msuftxx',
                version: 'fps7r66bapmso1fzsfni',
                adapterType: 'xzd344jnv4hwikbj09hxbgnmh9ktocnmzrjsl8t7444qu4r8mhq71k3t5xji',
                direction: 'SENDER',
                transportProtocol: 'g88iba63gym9n9yfd6elbb4t3kiwozx3lthedmmitmebgw6gqkh8yc22onls',
                messageProtocol: '5idy01dg3noqsfwod3999k0izi4qesuu6ekql5ecxvx6q0f706u2e10b7t49',
                adapterEngineName: '35vj6t9x562w56xjm1fmo2qj9eha7rcx02v4kmfjxlj0c47v161onb5eto30tc93wndhkvoc9pn6065p01cuscxgnqa26kdad50irm653hzx824vrxd3n32j7665zlb95casn7g6v0vldkgeed7wzemi7wzvko70',
                url: 'zla15k1iq0w268wgh94eiy4dltzpazizqbwvth35c1ajmjlmfx7g3j6n6ie9wq17g5w6ydz1dxq0t1tp0e10inh72kk94jav7l7m61nc8r4t31vqod8mq88mfoasp9mryk5nsfsz1ugrm79ryazjqjwp5m92ua0w4kwxa08agysbbjdhtivx7uq6rwfpg87ds1cudaxolam97cnmhfwa9w7fgwlyiloot87gndygfhjpg2dham1ndtbb1r2auqwyk2c68g6ny71wio2k2spv8ypk6am57hr3cvhkd5xvt16sufhms15zuknzn2uld16v',
                username: 'w9i34nleeloru072umjmc17dcrggj6cy7xpdnbjq6zcz66ioo28g6e9ga3u6',
                remoteHost: '4z37lhyrsa9a15hxuz3klgrxmazt8xo7tp8syo917olz2t0a219n36wdqa7ezqous5na3ihq4v9e964zla57wr2qesqeeacseq2s8aqgerckhw4eyckxehnakrlcntzpg6w5zukikd2wfa5nc55ydeerc9y8l4f9',
                remotePort: 7996928036,
                directory: '4zfumkbqa2i0e80lxj0lcycqw69hq5w84x3r7wren58a8ak5s7kevihe1r5fg7y5x0jusylshjgiu84bwl7vt3nii78hl44gj54o3uoecd1qen1662fbq9h2uxbtcbadtf4refzlsh9kg4yz5pawf3eqi9if3pqd8oi48eslkhtwih4s3dffde7kaqp3gw8p8fsjq4kejqmv4ff0m93gi0ed26pftzt2wqpo01endk9htz3sbnpfpqgd4jjnyf7iws55x4nve5v74ljgagwq1ab55hot04kue558a4vw48cwh1qeqjf2x00kf3cdwjccjuqw3z2q1c88i5xp6fjjrfqaspud8h9ogdgsnu3m8b0guhobr4enpkeirdi86svzg6jvcxt6gy1gdo7wmolhzqjr1jiuv8wx731j6jnkb3nu9fag5ka6s9dfza9yt5xr23uryxds6x11tc163ox7fflzxjrlki9k0z4en2peufm4zpbqyor3r1k4xi63lfvs0nsb4iupxs3ps5ofu2k8pyhk7bnl6wbtm8eskzwpuh7dljpsjlhmo00y07gq2alu81e1p0yk02d85afzw9reopxh6aezai7bdomcgltmx8duvxucctcfzhnlhw1qqhlnfjzhsw14aaqu64fhlep6o52rpboip5d08fx5o8r32ny9wtr1ptoo7ym9oek6z5ak0o6r5u4a2227dgd28iui3qzymmtoen67ymt61ybw9ww3dj2l6oh0evm02h66d5pjdrj0wggg5kcmqh5zudobjnad7ggruzk2d41x481rekz12a0sem8xwsskd3zuvx3v9ieu66hq05c4g0f8xr4ylmhg1a3mxg0z0jl3ix6juptpbl0n8s3ylyy91qfhs75ymeiy9um4hosy3n8gjx9ncsi4yhvx8tq86tw3vs89yfj0ymsqoxhrakrjtxkma9o3qv91efcryb47dksbh6p0o6ilx8dr0uva811ctybe440i066yunc48v40p4edm30p',
                fileSchema: 'gvswtjbvkvy4q6psqoql4tza7qunoykb8d3mmpfy9lja1kl3472b5dsxz1q4vyvrpyi633iianvd576n84ab2ainuokji3e7l9m7rut6hlkkeppssx3neglq14515inj3w8dv97odok8evs8ipr9htn6vwdqwo1fbfbhyk7xd4e1ena29xj7lehvcvto38v9rmem7u31sskwm4470xysj22z0hyfxqvpfnag4efgavanpt5ijdrtpsempm28nsmdgg7q2fxcmrkabd4hefbk5j6ezafuvvw8d1a33rqyscg35nwirgy5n3dvkcdf9g5uym4r7fho4kfrzf7p6beyu91klmqlasewoepwis05s7qq75z9dlfr8ymh5j3zbea3gm730tel0hgwfdj7bqcq1jw8my8urmkav9dp9617rmyhtdlmt11nwpmgxfrzfw123964fpuj6rxm0s6yflo3ln4ltkscbt84al6pdd2weffrif8jdok4qj45n0sa3j0ra9ihhdkva9bupm07oire6cmtah1267wezovkfulwgjt49gey893qbvldi4gf410gms8ssl6h18cysdtp4l01b5qkwr13kz1dc1l5wud7f0mcdxjdtaylsy3ar44g27r40vxiipj308o56rqe1wtcd3un8e8bg222ijxmd97371ty4q6hfsnrw9xnj3jwbpejk1zend1o9iz52cbzkc7f6civnhbsoy0jqg5mpgy31iol4zb4reopow6nekv4nt459a1vepm8qbu0100rfhsckb4fsk29m7yssdrkbyqnitckinb550aswdgvdo43yhl29f60539tplvn140bgvfacr4janr7uu5dkp8pp20iuiafaj7xvunmxwli2clctrbf1cyw7i88luoipv60aru7w8j7ls2gnzv8fd7fj777tz3nvw9tt7eq8npou4525ecw5nimcx0bbp70vmshhx67pzv40t2x9dmxqbd0b8tbtdkda5v8ywhh2otss8nhg8gp',
                proxyHost: '6ffny8aid5fvk5zcg5n96npzdfysq38sqp9hnsbanl8hfuyfxoiz4yzfeee9',
                proxyPort: 8744904700,
                destination: 'xfzmazz182aavc4jpkmto0u9ftip8paw4i0wqor59wh2ux0soqif8pjxw4c9so6xzxiwjkfqhl022bxrfktnjc6bseutau81tdjwyxgcrzxsynxofwx1tkpuppllf0denajx9x08cw9lhtdf2p4yompta7fivf21',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6sa74airva7i3cpmwht0e4amxn3xerenkxshv7la72r4cja4bz0lx1y0mvooda8nf19l6vfowg9kbacosn3sk0guqfjuxdmrmm8gifngx4jtyvry94mx1reccv53w8iv2363mnv3otih8hivvmcyxmkcxe0lpl3c',
                responsibleUserAccountName: 'gu85g15rn6cppu2olyk2',
                lastChangeUserAccount: 'uc35fnc2tt84m47t2fha',
                lastChangedAt: '2020-11-04 05:45:47',
                riInterfaceName: 'qrljib9ngomf8ph0e02qoeyrqhah4mji129rc0xrtwsu1nrlzsbfvdmz7sow8c37l480gpqv42mdsppqb8xdqgk2cjirj0emylzsap5qgueuhcyafs3512rhsagbxvu0nqwm19q9c89zdd38bqth6wyzkhe9drb5',
                riInterfaceNamespace: 'ocvbzs0lqx3rbxwwbr7vjpdoxbtnlxr0u9vzy648375hakup5w20uivyx3h5qmuwzulyjeq9etn2ijfmpnk6ax6xdg7f1ujcax0ixfroi28wvtnq50ezlswa8mxzo9tbwx4t61jdy95y129r9m2h9udhffoi184a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'vovm4pj80o25djsme7vdoccw4ljg543dk1i2djrg',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '69mrpf73nrum4rdyc3k4n91tmtt9gmhd6wkj2zwmpc1bxbj4kp',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'mfouv1jvth5tbdu3x4bl',
                party: 'pgsk370ed04neivtgqxrb658ne2jk29ozxcyza022qmfqbwrlgxb4e3y2nfya421aurhfhgtr3sgtpsg31n9rz45jnbtm4vbqp2dk9hih1ki4dczoeys4wz91tk2uovcctgu9t35z7oljqhxat2we1xl6ldk6y4c',
                component: 'nmdcn6zu83gf7q3utuxl2xsxyas24gdjo3dokfk4prjvaizbqfe1lkdsjdr5044v2ygoyebxkusfb3bcp6zbdfodwt0mg5kqkvxe6xwbz2kwj6vjrp1160lgn8bog6l3jmcbh8o7058sddwxu043rwpbuvszt1cp',
                name: 's1elbgyojpsznurafs3luvmxurhe8mr18baguu0w2fvn7sbcg2hzrpun9p3h2tfkf1cuzmbilpr1thzeqsc5ytibtu8zudngr2xou3bzwtbqjdgyk9rlr4wn8olh9ciav5zso351grnlkvq42t71d242kuvg4wlt',
                flowHash: 'x4r0p2mshzopa1yfzskp5msod22ee7l72vwngdh9',
                flowParty: '0bhmhpcxygn71ihcg6hlbii1gklyuelp82ts4z42c2wj4oathwzacsets04a4b9w4rnutw8h8138gz261lnso2oplkl9q4wm9mnqv930hwa4rd1d355fvebhbr5coh5j1x9zi1vxkyzh2dyg74enn8ai6d2mixo9',
                flowReceiverParty: 'x9to7g7vpe0bu1lz0ldypk2upb5t08dl29gczh1ie1fuyi89noeg8mc6wjkf1jjuqz6ejgqo27n0f0a1dxksvjnq51bkl4hnrw163utbew49qk9i4dckv4grl2u5d3h92fv5di72e62z30kzpsvfc6sjyziejwa5',
                flowComponent: 'atkvxyp8e3b2y9e6q2f2htxs4yoh90onf7iknl8adyb6ky6hql3ws52xb1a3sneml2lamwubzmdnnh7lwihpibxoqgp83tumvn7buohbfkak4grcron2nn1wsrx18lmgn2k5vi0m9z1gl538ni1xu3bhzjkltcui',
                flowReceiverComponent: '20ld15pker9kn1b74ck7upjgx08bb5uretqycpjecr7yk621uk017urgzxbane0p7xhrivswf4mlhwohd5a04r6wnf0ge6jt88r5bocwy8cdpfeq2p5u64f93thfeqlc82cnx170tpfmvejejpde8ahg25vxva9g',
                flowInterfaceName: 'rm7az28xkw0rcciegdslhcgpvt1goivaaaxtqrk5ahwirkiml0slaukx1az5f81f4gesstfaez4ui6vh4fd9yzmmhymsxyl4y8bhxm8fkgl2er7sfiapxvo54uh8kdslbvwpskcrvy6ysk4mbc2tygnmzczdafply',
                flowInterfaceNamespace: 'e5pmt0dvfoeyvzji1kssvolitwtmkk5pf9sziuobpbxjnhtkfk4cs2sh6nyduq0wbylrjr2bfbwp8wgp43h1qg3qaorbidqgri60cc7h0yk759m2enpktbsy7gkek3z4dh2u95c77bqol6q9jzwdz3vt7wz6kwou',
                version: 'bpanjpjf36ba7hlzncu4',
                adapterType: 'pifhgpc9fwgit2iu6infxs72n8qc3u2wumcd0cv3ujlv0vbv3s7gcgr0k2u0',
                direction: 'RECEIVER',
                transportProtocol: 'yc83z2kv4c0r5e3h975vyg3vlpp6y78oxxjgnl22u98mlgvp3iujnz3li9ph',
                messageProtocol: '16adhemdkpmy5xmv1lk70ybo02rxx5nrivt4wz2or5efjn7qearpuf43q34e',
                adapterEngineName: 'iwmr3kqvupag6qwcb4rk4h6yvf2gtt0ucwf2e19liz7vwluh3bdo2jcqrwh7ncpkmvjdmhc7406v3kd3c3kfua3p51i235lqy2u5hn9suehjrryi6c50qstgsjxjxth803pi9wz26ryz1sc0i3ygf8kz5oc7ni56',
                url: 'd74jh3t2ku8bks5b1vmgfpoklfkpbs6fy287uohouywytfvazqtg7lk3tjg8ks48nk5bpa6zw5ti95zt4k2xcb4y6dcx9mdjnrbscdbutbl5tq36r2c839mvfpwtoykh2xlm6s7thhstdnsnew2gqy88d0gcdrhlvnikpl81lfsqv9a17fv2j66ohenvcn02mxj629qa9bw9gyhwh138jtwxsi7wyqlpk8hkwojy7keqfpbf9crctk4serfd68jvghe29zmsbhao9jykp0ej6pw0ijh0gk6ner902tpd93w8ldnkdtin9e6yyt4fgq70',
                username: '1roypyun2uepx4k10rk0vrs5h47du30v0m6n7el5yexk9ggl8ib3d3pwusqp',
                remoteHost: 'jckhms6nxazn7ggdomgez0ythzgprgrd3855nt89ng5vd21w5qwda4nicc4na4puv1y6z5pcm2q2sfj6jbuhv5nkbyyimmnpwl4afu78m0ewd5qzd3on6wopi2znstljhbbuo0n2v6pd200ipv6yg5fuquh8y8yx',
                remotePort: 4930526535,
                directory: 'cv70p80elza3pn30jweodghow5v8w2jwgdk7mymnejy2agm0f7aui2puq00c9lssccdpaf1uqsxtdjxa3iykih2bjrftufqsurqah2ywc2cer921mgsmu7mqn9hm78pl0xrxheu6irmeocwtss6nvyhhmzi4l2l1jcm8lf2vd16bn1xu3lrc84qe02la2x0ftocfo956bqft23j4abvyftvjh53hg5527zy1htnsakn8klujli5vls86k2z9aowf9f1iwem6reaxag3bp1zt1kf369otk9dgjmdlgm6iha75ceb5rn04l02tnl2ygs2ahlcphr504x9n0krytxbg9mbqyxhskvlvv7i44dr77p1soq3aubdtvova488hoi549lv8pqq5wpeb7kjdzlzk7jofsrkl80xy07xxlhff82k0reuubkly5mp9ltq8eiwi7kv2hd25st09ehwoyw6ourcplrjbq1424mng92b0mdqqx4xagn7e35yulyd065fgjegssgi2o5l7x3eqsqlpk1qasbzfdais57g9cnf750x5yd9jpgfdkyod6in6sy5wgpsxuaqgvs9z7agdof9b3pxetgnhv0yjaci0a9iwk3rhjxyhah8uytbdfoasxijrbrvc2gsoqolrwwzfy8pw5rvzltu57kh57wx44tu1tdmyjy55dw0n5iy92soac2sr65ngw7crx40fw8a80u8drblpotjigax177qm6kt732fmf2but83yu6qbnn52eknumy9d004qdrcpbqo1koxam7j7bwurxog7kvwtkhk0jvlplzklalk9fb9o3txwemdm8pk3x3xtod0tp012xmbhxatn2dj2gw3ptpvu6sihlp4hcbd9u41av7enopof670vmc38hfon55ry4mhc20jz0ak2i7jshcj2bf5x12q2t6mwjexz7jpj25hpf88vfrwpnbcrt9jo11u9zfunv1r4tl7l06mxj5qgxdwfiat0fcemriovva8l7uqxnioiqrk7',
                fileSchema: 'etuxk5s3yx80nc93bgeoh770pwj82d9tb2iis6h9cajelr811ghc2zj57ydzmjbkambe7h6lrk3xsis2fntlwkb4272gj2uv6sgykkob3snjuwk1xli80zxainfwhl64tj2chbptcm6zt9eo4qwu2t3pm539ho7h79qki5tb5f048q726h1jxbp0vtfkuqsk8qh8o8e5pmsmfs7fdq1qi38oo0gc1jre0t6dhabn32trfbskvqyzoiwz9vo90jqc11stb4c4jlsfo5kk25fadb02bgcay8x7dm99rypb27cp7abyg5n0f2b4s2g3yttc9az7dmte98l48bswqfkexukq0nqfptzd8hd8t32boafs1dydsw9tj4a1mb3icu8x2s3q51424eo6l8v48dmp4tgdwxb2znmpu7k1o8ncaw9stuqp0qwg37qj4zwmm1avxjobium5ff58dtvtojxuqjvve4g1g2heljqb5aj6w4227oq6j8ds9ha7fnpm1edms0z44g3m263kv8jgaphtkz30jixsbhpazsc02s6u08578tsnayob8g1lvajqqqorlh4k7xen212hj03vvtjfv0gxwoktzepcj4hmq87r4qaz6ehfsv1lhhwtcfih3dik74d2n93xfsjjb5m8ba0usioqs5rebryc2st32iryyiafw7r8w1w97qsvd60nh55lovs45roo73h1euwf0w8urpf7hdjnugdf5blne67t5btkbm8mqc1atvr72dzqg1b8igga6sxu39ykem2pcf1v44zfv2ef8ka2lhm5qgl6a8uve8bhkanaswgtqws3wsyzyzuz4twlz0ilhsltyhbhen631dq5t0p2eemzwbeqjkkaryoujl0ta3j6k9q5fc4jl7lm0g2odbp9gnnn4hem24jfvntoet7elgjpv6wpvu2cd3ndjo577awwsn3ccv3g8x2fmt4960630tdien358t4quj8waz2ts5aiaentw7lmij9ejtqebg1ur1bjxd9s',
                proxyHost: 'g0k00jgc6vhjjgjna2w4fy7xvzdzcr0asf7nljem0fq2qygcwt3j9bpbfo24',
                proxyPort: 9725137342,
                destination: 'ga2gzx10gu9v1umr0lwj6skpekc31ml5s0x707fct88hpcdtdnoeeou4ndims6y9ah2rjx32g776mcrtmn12ew9bzphm0mxskwb8lfot0s6y3u9bhoxvvb79uk30tod2y0y2kqz8w4bz09piphsm11c83udv4bms',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zxljl8dxpyvcp92uwrpmtansh8oh1ff3mhtbpckd5rhore96ge4m7hb324a5fxiw1etamdbkj061cwawlss0fuw7wvu609p5dhxh9mbyqhvfy5kl9i23onr26ic9ie3frky3vb0umysoisbf9k0d44xn3l6eo3ea',
                responsibleUserAccountName: 'kdhxcd6dfnknv97b7z0s',
                lastChangeUserAccount: 'lenxdsm13qm5zm7srl8b',
                lastChangedAt: '2020-11-04 13:52:47',
                riInterfaceName: '7x54vro3r5zyqvbo98iroqb2rqxi3d4y8yat2qwxvwtfak5drdbix06ermjgi92f9vb6gmfrefmhtf906syzbya9nxd0690l6m6n2uou27pjmrlkgoxavjynyjp2heia3q3ckf5istizeifrbddg103cyb10u9ek',
                riInterfaceNamespace: '6c6udq5lpig26t02lvk8h41vy5b20z4k345axjwzldj3iv0vapus1it0b5mwe09rbprzf3a3t4b0ksrill7yq80zg7xv7qybz78yiuy240muvly2r68texqk8a5iwktyovbnz6f22quzxqkyrcp975xil6yigo52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '47bqteop2maisgqjkxr56cqdf3vl36q7mmfsqubs',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'g9rqw3cmgb5ugphn9v94e53khk8qaaqfaxddk29jhu23w4kyqh',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'zcnwktm2r2a3hqeronlp',
                party: '40yj3qf1pxe3q4fq1xu8u1e4az1y0iosguk7dra9kwitajns00l4zti24c2zfls3wu57hkyfs0f4bfmjkul9d1j4zdpv587pn3pi6x0zd0w893zvncua0b84wptpdscu2dxltfxqh859yg5zekts8hosl4dsg41m',
                component: 'rst73y4sbxgevg7ai0jhgiz68p5yqt1d3bjjtx93dgqqt3oes97u4lf6c2yjfrblqmzno5465p54z5gdotqeioyihngb5gwwwflmjccfc37lm4mmrlywdfrasy1s5gm1gjq61f74ojxek57vgenjfmzfchi9ztlp',
                name: '9ey7b4pcachv4suvueo3koslgbu6h2re82t1mxg2kjqyb9low0mzak4dizjozu23tubjruybhca6i1pttxcflhs8kme9yc529yjl9c65shb6pddmufvkw7509urf6exlo69b23fqv4a5a9hcmbs2t8zj9k5rrkah',
                flowHash: 'k3e27zkbvqtggdpj6u9i3w6257ppgiwpnsii60a3',
                flowParty: 'rihxd9zx2tihlih5rpfii0277htpbjwv2f1tt429u5rxuuwmyxiflqirqex9cvnmuq90xns0r65wgs2i85zuml958byd07u5bbdr43z1y70pg3yi1k93je1fnbfnbx614hp6j3692mbdhal4lku9lka3ih4ztmc0',
                flowReceiverParty: '841kgufaetrjyfzrnmvcflu7aegmhzgmzq08jn11skwat6j3gl9qo48okxuzeou4xvhqvgkd4ykbm2wnbs424cnog81jwdpi81m59ic6sqgzid23x5jjda8b5lmpyw9r32z9xzjnmteag48j87wtv1a7pfiteuqh',
                flowComponent: 'exb42cw90g8l2nnj9y07a7qnarzengtgxehd3eipg8vg7xbcpu9tjcci3if9gq3mfleuttb7y2cefr5f0ncj6eecwjpof6vkx4ljo2cdpf6j0xpyr237arcdjyeg9cwdqbdzt5uy822n09di7sg0mxtix2zm240r',
                flowReceiverComponent: 'upcqsgmupvgiuwnu2a55ainz4jybp6csyuzfz824g0pnhyqrt8nzs6hv0tmk6ivt5ck78tbr24814m40eqk4nild1p0l5ylwn8ifjlr3utocb0hld025kqhvyfo3iui24nfbzdt1llhw7lm63pbe0rgk7cp7j23j',
                flowInterfaceName: 'vwn2vg9enfuc8970usqjnc0w31qz93z1s50wp5aarpibiag1y7o0ux1pgyoc2wgdu7g2epio3mmbyyhr3adgs048m0340dgbynf3gdrpb0cszdes5dysqa0mvts1tx942whgu4j953hqvpj901w83weyjmg8vvlr',
                flowInterfaceNamespace: 'l8i17vn15eduwoq3xcd430l3pydvryhd2rlqm4etw5sdagp4b2lnucs1evwidkau72qnh96w6m96ui7mxqq76mxsbd1dhhggx4kjot4dd8omfwgi984sc14phd4y9cm6obbnj0h0a74bvgge7b2kshvucuig8lpis',
                version: 'xl55lk1d6i45j99hq2kn',
                adapterType: '2cuqx7bycrtyyueamfx6jcb5j79mqlyuk6fbwiv2jeik2z36qiqw96xral6y',
                direction: 'RECEIVER',
                transportProtocol: 'gb5qr5wuffvx9knht1plmrdfqpoy06ufxepx7r7krtzdk926iq6h0xuhj9gz',
                messageProtocol: '7wt3h4amt2crk3z66jbj2riy37p8l7h254l622tjsyxsn1ofnsv481qsciqf',
                adapterEngineName: '55bdcfy2rblitr9mors4c3uz9gqbs4bc1jkj4lfsainq48k3ag77e5koxxu07yo2s3fd18qkm1x99ee7cxyu9lver3kr5kyjrg9w9nsxrzq0oxpen2vdi3o86ixcmjn8zgakdzgzo36klj4rx6pko6tmtm8g1lgr',
                url: 'qt0ck7sphw8zajx8bopy9jdl849qg9dah463zx6daazv2xhffw42gg6ryavtiwhdkcqybntftu391a1vqa1ch818bcuubgsjufrxi8lv2omjzlffy5drq75qk0bk9gafwfi0a8710nnp9r3glbgdr7986jopq0u57a0wrtlmuua7jryzl6fnfjsm25rxj7z05bficavdty3kdlnj54a7urgdse2ng0xc4z8fo4hnxsp8deplaesdgti1fmbtkuil482wa4iy219xd3wobv2dp3lc0py6mr25sp49pdut8nxb52swjreakssedye5h7pe',
                username: '9rljjzhxpwqunxz4mubht1nd22tejmnpbi89v5cboaab76x7i52appv32evt',
                remoteHost: 'ew56j233bqlfepp6blefcn508o7mnmugxb4rzdcx0anlv2b2f6gjzsn3atqywwu0pc0x2n4bsoqufn0pn9nh1u1phcvhmbvybtg7mivt7f9fdnzjgqq4ilwlp2rsx9z1xgd3cr435itgeht0zdp0amkd0xwa19w7',
                remotePort: 6669593826,
                directory: '5ess6ij8yn0ugchderieae2dnforzkm55eujlzmmzejrtch37bz9xqy61t5479p9caio8d0dz543yjq63txt7nd8grfaup4cwzm1e3jd3qhppk0ee8bxb2g3kruty2wa24wybfil4igcbbswowb58tpspl6ye19s6e8myu9iu4i25kjmdxdrgbskvii6v4oxgz5bjb2pvygvs68i2mol2hnr82kygrhmw12p6knta2upy0smf6o3bnr88n1opy58f3ilnwhqtfiuk949w7zskgcxvkeyoijsy7r3bmac26l1tht874fqv47ql9a3ozvhmhmmtz5b9o71gqwg5u5qmu3g8g9vvfaqba79p9o543x5umkhbqj7pbkjl82ilt1hdl8ea3lty14wp5aijqjkt6fzoe4t37ml811zfv8lmhjabn2f4hsk0dvcg7i7yiadd8m3qkzx1ifo3tjupd3h1pzyxf39y7j8z58quk37zhs966m7s2pow6rkm5wb0dz495ad6i1av7v4lsc7rmyl90ikzvkjwsv3sp5dcvjib8utoa4cul9pr2cvvt7xr4mo8rfvfeiiwmej1j7fl4av5xpgal7q39lg038zp9ljrqm7dajx32ea4057aolf2bklqp2a46w5447vcryrtqv7mtxrjjldxtm4jbfhicuc33h1m9zpqtbdpszr1c04h1gtmufa34r2unvjy2sg41rfglq9peuv23ipul1ohezw1t5tmcuuhtb6p4ukzmd4mpsev2dku64bc4au5f5f5klp5lhl3bj2bz7i77j20mye7iapgpkc77dc0rn5wmvq31214v2ed8stnvf7ij1y8gdoc6dzdnxi47daxo82t4eigkdv92p49w8nszr6izz0uj94gjqfx48lwlssgokza9h9iznphtiuzgym60m03ftd07wmirz49lrki2k7pw9u1prc505hejkc2lxvrgwqy1dymo7925gbg9vpqtu2wnx4zme9w1p6ziby3ivcmk0dnwgx',
                fileSchema: '6jf02dxx5xpbu0uqhpou0fspachjkb9xs98utjkx781mvbqhm0r65zcpdfq6ls4no5byscjc1paop9kbmr8w40h8039ceilwz57asntk8b3d7zuxp4gqaemakta0eaxq37aja39yuwr9n5v71gt7kcrm93ymsebi2dmc3o4802t158mhxylt1dzxh1dwcpmsl07pofuhbmliuhw7dce976ucm9gsuxhuawjlevpp8jeitgcv5tcck5g4be03a0ok5hi2smjy64e4tuo8ba4093ngr161z90t2ucv5jdq4lk7wky0jkzhm1matfmel8beexjwtc3tpg3lgb4bb2zze8t83op6ebvoknlrnw2k5u3uma2ucn5dnoswbs683r8xi9g5hx0n69tew710knwyruuvaysp7isgykq4nwmb7vaddr3pnw3u0shlgpux2e5utpjxftt6nnwln7fv8nopkfbawn4m36a8rfqd3r4nrdagdaec0lpch9kbk1ggc6m9sussvtgvhxrczierxdzwxdlnib6soen3x9b46rtm8nl01qmor9e41xkgm4er52ul37sz899uhls2h2zl1jmd3raumamxvdoo9pijiqvilb21gc0imnpn3i5j0p8mi1rhn65gq3nrszk0xd2uzhsuet6i2o69yga4aopgcjbfg1tccxrskd39a1v922xgy4jd6726tnq46pihx9aae24eiotd6mkmp0z8ily4yhti0lzi30xdcie2hgl5a8shs1opgznav3w1rm8s0obwbtz81766irbuln157azzi7url8k9gvf5up3ci4iyu6x4gqlydnevdjenltgnrns9s3cd5aqg0o53bl7q33pklo91xphdq7y0ew8witqs25vjfo2qf44iulmw8bwifpuopcux922a2w7rtn3h109oficek00cjcmahs28vf0nfxqh5o4gbaapxp0fosjpmfkt1oynl6v2j90vhtjxndo35nj1aple26y9bxiu8ts26srek0ul',
                proxyHost: 'ta4thn34z0ovr8ese50a3q7bp0gffy2809ewq0o7dxzt6mrvzps7uhfvg5v8',
                proxyPort: 8096269391,
                destination: 'skdcce06m39csd2hgrac0fwt85eqzldtmu7mowbwdnhau3c3dlsxwe1delg1nah2xs13h7vfnjulozk7sjnin6cqrmfes2l9ap5wn6uvd0ce9q4fgi0on74qzdcaspl95j4d884numrddynbk2q23nvv602m8c36',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '459mwt0jh6oihreoq4s2hiven8subkflxrrzisq5jquclislrgcjjx77mb13hzxdufw4c40jhyycjkk8t1nvtbu1lecl5ki93emeudewww6hwdq2c2z5cha5utpzxzii6bu7vsn2qfbxfavezic1x6iyjk2x293m',
                responsibleUserAccountName: '5i4ud6n2hrd3dlz0v5h3',
                lastChangeUserAccount: 'vnl83061cz2hywbyemnh',
                lastChangedAt: '2020-11-04 04:09:48',
                riInterfaceName: 'mjruyjze7u0q452128egokbrv4qa9scqn5br4kj423y4j4gnkv9fi7fvqi8zrt6fzdnqrglcxu79ozw7eyzmu0iw374p9ou3tgked51bu97brxjby72ftm0irgv84k4l8a3rh31n5pjjauh2bj7vpw5icdb4xlf8',
                riInterfaceNamespace: 'nwesv8p776ypslk59ces5sxgbgb93rs8myz3uk6pchxz2p5nq3f3kbv3qdwlu2szj16ganeet88vns9iti4whsjz53g3m3ogwlj4zwxb2tob47h6yjo1takjfc4itjote57d02yl0mrsa2l2ze8x2esb6y5yitua',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'mzk7j1jp89l50wbwtg4csy4n13ktsmz1jywsyewu',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '51tsa9zaow2hhfyw1tkle28f4om7d2u72rczdlltzbbdwl0ul4',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'f4fs7nj8zsb09u152ft5',
                party: '8ews4bieo8y36793o47tomxjlxbhv0o93ermevzcr2oji1i73m0zsonbzkuqex3z9jxck9q5kv5i9hbccythaf68rirub87g05r02cptj2wbw4xc67c32ay8594yo75no0ojtg3h9zf8mzpoa5yhy6e1e2nm7dcs',
                component: 'o1yawdlsl439il0c5xtnnjqzqa3rur850gugms4d4ogi2fr3c4su5g05cvzcmczb2ftgx38weo00bqh1hjkf52tcjjwln0ufy3cuugrbxzgmvzn6rrg94mu0fch4mcuh5so60dldrv0p48zhd8nz6rlz6y8xtqkj',
                name: 'ct5nnxxtvnsyur047ovda1fvn0rtmyn0pc6nbsnjvzorte77h9d00esrvy0lsw4sk9vikt305vu58ztoztvxvozhhu9b1wv1xhn15hd1nrbgutq72t7j6dlqrgcf4y8anxxq0hw7b3b3nkq56opk2fbbiq87krfi',
                flowHash: 'tcr2czy7n16mib16ch9jnkmw09wwhr7u52zhnobm',
                flowParty: '6pcpzrydl6nhoas15e8pyu3euupre677n3kfwar80um6xw4kuitlabd7vf9u8ahs9bverdktu87a4ne39ptz9s2a0vpk131sbifww864ifxz8r6746adkgst4uh1lgvfgy4zf15d1maz89csioktv4bkwwh4kgx1',
                flowReceiverParty: '28ew06rct091wn3yzez5nfkyctrejgyut644h00ydv9j4kw803qhqiejv8h8f2f74w8fhxfogrf6r7klktrz8gc8vyl1njgwu40npn10of8y63vfq5yx8tpp1iz1dp4ue23fonjco6z4ljjnxyak8cldkugwo79m',
                flowComponent: 'ywlahdvrl3blqypuhrbio82dsotdvl91psocjt33i3ev1yvj968dui2m2oph4mhfau747qqq5uf3vge7tj1movdew5y058hcufuupleecb87klqxehyadtt9ayozw6l0t8p9sgnnbm0fb9rbqcal5l03pg3fsrvr',
                flowReceiverComponent: 'yfrpg3n8jt0s18i4bjmvjzkv30z2sxxxoc05eay8km4fv3cfctll1fp3nu3ttnyquvx9y8mzbuz92xwfbq9tkua4s11vflbm4udav45s14iwsygzv79umbrf6mc2socyyndftdavhtni08ykrnv7tfzmh93kmfb6',
                flowInterfaceName: 'xj4bplwogft7mwr6e0k7zxlvqq9d93scyymoyrtgiufkuomn8xmy24i6go8wzjg31c0nwur599lmtmhg08vh89nrkliq9oaosqkf4ybbp9mlahaz1bdntuc3a2j4etbdknpm2cffme6qujkccbetsk1kce4kv3yj',
                flowInterfaceNamespace: 'i4pucv3ug513hio60y41hleq187eui2r2decictjku3d98s8p2r4o034fvu2k98di5no9svk3k8ucqvcobvgjq4muwfgw58lklcbk1sjyz01tzwqj1cjc92vmub6ny0y9fhrlcxk1aiby1t0fzeu98w5s1uxh71s',
                version: 's6al85tax94014iaoft98',
                adapterType: 'nxkcwx2a3aa14kjdm0njgdvhrey9vo6ixu1lhhfh1lbueqk4173ttzq1sfc0',
                direction: 'RECEIVER',
                transportProtocol: '5x7gelkkm3uoge6dzlavrq3vfstqvmclg5a0fjpvb5bm7u1rlo6qseln5jfd',
                messageProtocol: 'tcs8ni1knuq3y5nvz2p3akic87b4fvyucwfibzxv8wnd9poyu2qmk17jjfxe',
                adapterEngineName: '9j4d8e43bxk7ryxm9jkk9u8rkye070psqhtjs02ibnq60hbhaijmb3zmjbybjzcpsgmxq8dmv1biocclrbo4up2dsp6zq0b2omy69oy8k2dhikczoneucawc6ouzr91i9cqfvvwugdcxi25gv644vtm1fg8rwj5z',
                url: 'xhgtkrg0humkati88wm77ffcfow9bf2au8lnk6gjqe5q06abjduojnsb59w63hhqy022hhd5310evv5i8p16o4ais1d66h2xxqo7hys21tb4jxwqab8ps9ua288orzj5q18wveonfctkazyzbfz1oavoxanbek3bj0z2j4zfrf8i6yi1jaqardfk782263o9l63h1gfplef8p7j4gtq31ioeveokaiimdg091j5sewsjr9s473d0zegcubc7lf26us6ympv8x4wujjhzdszwn1umv5u1w14d1agin18er1a0wl0vt3dtvg34gyyvqngg',
                username: 'cy4e5t8g1tp14b6tehx0wq71x7grwec0oetgsfr05vtn187zyitqnd5kf624',
                remoteHost: 'i4hn4uwufx3h6w44olrwdauljhsv41bl7lye03j9fqmbuzm6rc7jnee76le520uxctoau2deog41byr8nillhioi9bjzxkinsljsmk9fzkr0tmw9acxolk4vg7vsf8u90upa5gp4029t53dy9alt25vct81vbeqg',
                remotePort: 9198519745,
                directory: 'bp3ogqgcdkmyuuhp705yzxvyjkxnmal8u4myq72n109shlhas3gldpttid9p44t1ul8zeo8814jsfqtj4e421yq98q8h49wsfcg8tcjm9zi3a5587ys7jhd9odr15ol7op2gpvzhbxzw15k404mw963t69h66z47wj5xw1o6eo4ipsn7wye63j5vk70qhxhuns333om385ud4t0qy40t1uwamsx99bxzll0iq3hizf1ut4e68euxjo9rb8g5utav5jjwv2y3q6lsm6al37mcdpzo752v5blxzwr05wkpsfimkulajw0igvc6jm4pgp5fsuvx9l7xowjyilybtt19du0aiflz4kuqcaln5xqxjqrinc9sryvq1byobc2osih49eijkonvwnklo75nsl2gdomqju976itfmrn6r193xew8er2ij2lr0j1l3mry46iuaopvptftoxfrm2ah2tuq3h0vukxm6rlc157y06dhyk19wu7oh570rap2rcdl68p9murizu22splo9ytq8z7tnmcg5bmbevvfxxq37f8awp9ytlnkearf3x3y4t92dr3sat5dmumk3xlpb22doxwo9dhc9mg0eyif8v079luxbdjav7n3trjvbyy34gysd0doiggwr8z0cfhibm728hco1oi1qfq78t8p1zugujwxj7rvvn81usxm9rgcpmj0gjugk7i51mze793ziszpzhxwewthh8yopv8fjnbmvbap35nzrvg6psgw3a9g0v26rpqj8tom75yfk0jmcwp0abq7k7nsaxbfqu9xg6mllnddirn69xt4t1mfj19ex7anhu3tvkzl2yug5snyq5exbkusa44zre6cggrbewjz6idcubeypgs02879yu61xepzj4zy1mn9pms1cmxz6ifadgn6dhl6w5eaktu9px8imxo8d6i6xd2qcldum38uz44ve3rlghhhjnx1yp77jecmq4gan7gohdal5hc1xikkbb613fkeuoa4upa2wx3dnakh3kpg',
                fileSchema: 'd9cg3ypejvdczmfauydsws896rlxhbzispxhffo8aqhsw9d1nfreuc5bat527vjplydernqygbfpz3azafor287bp7aeophffgmi0uqxf9kvmivy3x6vprj1n1havy1wwpzk6c1vzuxhoujmgqbgaub23hf1pa6cr9w9e3lldjm4lqlvdiukbli2n33w8kbemiug99kja7yws0b3qkuwo5h1rxserpuk47e1r3jjsqzei8d9jt0osg6wlkd72fks9yba5lkaryneq8f7axh6sinubficg63du282sknkwvbnx6j7q9ztaa9a17tn3hqaksqs9oqyc7xo9m5q9k48ina4hwmh25675h6nsz53et8l8f7u7db76qgdc1cby6phx0odkwyvblerdwgqqe2ecgxoi024ps0qgbd8yk4jjetqy7kob0kqyfixo8pi8kh6g45pqk0pr0mn4ided6tr8lgayqtzmls1rccchbz83thlx71hf1kokok77xoqceb1j56ipnar6d1zwb5k359pxo9avlh9xmpawx6sueb93z0bxi9dm2bwy5d5c0f7bpgz8sbb6n03w6vu6dedy9s74ekdyiuhjy3ureanebgh0csntj4etyov5od9o372q89h96nginw2u8umae355np1o9cvlh5qw0a20roodrh1aku254wq2b3ewal20lsv0b29f45eubfkrde5x8qxlt8kkiefdnruhhcbxflxk9id67qblbeybi2l5gel68htru2lpx2mqs4ib2fg0krtiauzd0njl7f0vec1tgki0pkx8clk28283mx01ukzzj34sffyy8nbljysmbe7j9o3carvnygcfcfpviqntqiyd80d3439vbktt53m1yqj33steeem51aayjkwrulrkqgqtln9iidok4pfrpw1xa5ksbybt72n0288o38m46mqtl4mpgf9i2qwyp4w6dskz92lk7wmvdv2qi2gungwr1095hj5x3gu2gvj19gh177c6kcvegd9',
                proxyHost: 'aw2zcwgk82ik81xzw52u1em1umx0ogiij41s068dged37do01hkrzpnkhb18',
                proxyPort: 1686394009,
                destination: 'gayzoaf07qh0htvxw5720gymx789ldquactbotggsh6v82raoxamjdonpxng52ozkilvtrdeift70nsu9gt3ci0hyf36ystbmd5dvxvl5ue8uiidk8c5g439wt2tjtnki7t6mrcdt1tvna6bxreztwoyjnb9vmzm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kt07jlmejj91w3er8chm8dlxvbbp8i00ht7n3fr9ltvqd6f0ay5bi8cdb46zrdmjx3j8vjkyhk0deooqkaefsfr1apbkrdnyih1dr8nnajg1i0sw16at9g1k52ppn23f936un53zl5uupl0jf9s84kaq5tgw5210',
                responsibleUserAccountName: 'yfnbvvla1jy47g3k947h',
                lastChangeUserAccount: 'mvmq0oa473u7mpk32sk3',
                lastChangedAt: '2020-11-04 10:39:50',
                riInterfaceName: '6vtu8hndjequg9uudrjiokpgqocnnyubupcne6ssihq9z811tm75irk4ih019f3scuskk8gxnjy8au8hi2cg19rgs0dfkmob90tvgomri496m5b9bcieh9sbarxbfk5p8ofomlfbfgb4gjjz59566scx7qq5ekau',
                riInterfaceNamespace: '5823d1ef243rnx07tsiudyrjzsx86cfyp8kcbpdj7xh2iq441ymkc9bqrx4zm6gvmox87768rvhostx0z9ohj92kn3dh6f1nkwzhqqftg1s6izb1jx6p6qmhduc6wp3u36vdc1q7uzg5w71hgxxy4vrkzhy99oe5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'ogbvdz5zxkz609nalklat4ewyt3n1hugad2jjfn2',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'lmcpnmc0w73ya4h0f1hfywsgtlm15xvrjz1epj0jswdnz3o3zp',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'z2smit4ukb66xpgyblz9',
                party: 'zch6o1g8xec1b72oyt328t87qpl6zvnimbkujhbpfr7xccvkk9i4bspqhv8uibul2znbv27pfdgl23nohemvnd1rpkcu0hdszp4i5qau9dgpss7bfcdkk11d1kizpe43shpnzhw5t0kt01wmd1r4h13ogwn5evkk',
                component: 'ho83wbhrvmjlemy4srqcx7ikgo7x7vgae6alhjvfzavwklkkb7nqi78wi3fcb2ad1s0tzthllw69dgqw1knkzjvv3zjxy824yqu7wlmuvwdpr92aefj0qwui742cdo80g64zyl5dioae3eb796yy0dxkhb6ybj78',
                name: 'vhxh44zsoze1r6v26a0x5ifyxanx60pntctreo3ih5lwoknzfujf47nk5sspk51g3k23zbzpky442a290rzirudx2zxtinmvkqrli7p3nax5538rohf3t280ntfweywsite0a8vtjdts1ma2keua7kf8xkzq20pw',
                flowHash: 'hkg6211pcjzql7w0ghi76q4tt4p6kvf6xlh8sz2f',
                flowParty: 'cowvl3j2doj2dxqy73k0bpr16b4j1aqk9zkyqrt8fep3rvkit7lachd7rdlsv525df694cwn7377ijyn6knj19y8yuwbiplyokiib38g4bf2r592z9e1m3qv7kjj1rjogazj9t79nlsx2x6ehb2cxj5qi6h05r7w',
                flowReceiverParty: 'sb5zykjbqr20t2isqf2l2oifm4y3xy55r2i7xosgwqw9hnc3iqx5ausp0oe9axih10zmimy00m11h8xmmzedsm7688m2c5g7ex67gfbkn8j7ucva4sc0gu1r8xkmmt61s5oye79fdfztln171i48iar2kiyzigu5',
                flowComponent: 'm2rtxipjfgzwug57z77r11d0c8cdfd321a6sxbs6v9b2pk2cd5y6u3e0zpcfzzsrn063wrwglm3wplz8krklnad9yy3yt03skxj3ax16fzkqb263w062besavniep80l4n87iw9q8dtkxawlofp7xcjee2p4nh2k',
                flowReceiverComponent: '9ba7692gf5i99ycnhffrmrjjjq7pxprsy86nbpx8sgdjqipbzg1i56g9iblimnlbziihz0oejrm09ot60rixq362ay0g4v0pr1hrp49zpwfwe9j877k44sa0o102oqfx64jqtn7t9ba4k4bo3c4r2z05go063cr5',
                flowInterfaceName: 'c0fegcpyhcjpxov1gkq85nqjhelaonfttjgbtdi5ha3b4gc33aw3dmcd0mfea6w6ty2yxaq5etmt9t9evjy3n02hzjgaleq8nvqvhmw3x8lggqbtq15253qxemmf6hkh54ncrrygu93eipn9eynkk881hl9t5a9h',
                flowInterfaceNamespace: '3dejr58ui6xmea4k7d3q0n6vxaa0lvougakt6hosyz0md6aa535a8x1rv2hnvd4pc2r8apqbtzv9982jc3ydqguc9n9o547v2zh4aapk69b1dxsuiok4hs3skvddkrt1m5zqihn4360zfxr3guo4dyulht0veqs1',
                version: '66zgskp0sy309o7ap4wi',
                adapterType: 'blqen7kt5zdkn97cpqc1e1s2lst4sl5rv2bb4ihemcd45e52wsxhgtphnik3k',
                direction: 'RECEIVER',
                transportProtocol: 'llaoq1mte5k29j83hjbzm7o39ezo8177zkbbuzbaco1rg3p2n45u6akftn0q',
                messageProtocol: '17h8humu75ijolql10pwv9sdjl77xkttnvv750fbrpcbex2yob7wmeq3jsk1',
                adapterEngineName: '7yxus9ah66xa9tghrw072kordftg9rr4yxz0mc7ozfcc0mobj0oyzmz49igu9octwawjhpnol3y6wzd8v0kez46l65ualq4jkqcxtc9ylqtdrm1dqvdgk9prfgx6vkk98qw7ceopyk7ip0m96j8xiqnia9s8cw2n',
                url: 'qpr37jr4tlk2f9rny3p6u2rsxwgbs8fdtv5xxlzbsl1rr6ssxlyeofj7tbmnx2w9h5h5hwntiq56bf7fnvs5bt848e962258amfwrrov1ovk64lpp6n19ag9xt5klug5aluv6zh53doz11cf9ft0x4mryfp7gti61xia3fg5pvsz91yjhq2rg749tp7nj2bquv4aek47kivs4omhovst9hmw2o6ku2dddmoe84g416p7pe4ergdsfnmglejpomvx0xzofb95195qjmwjlji4e7qyrhs61ggp4hy8s2ckfja9wun6h4ki74djyofg91u2',
                username: 'ul6qoudrbmsyxdt3f6q0wo34ubrjl8h88h7wd4t8n5adht3vejgavacsmrkv',
                remoteHost: 'c9g1naeg17k2mprxrok8e32jyf75a8m8wo6upsf8gcstbbwqwu6r7ksw3pandr9oip955w5q4n2mywdubeaxlgk403j49qgg5jgk9ksudfsndpsyjih3wzdkt55fceu33didncet4oq2u09ua7pwteom7ad6jtxw',
                remotePort: 4743451237,
                directory: '8hoxd38lwqdkdwijh4290v8yeuhy6xq4bpp5ncypmftpbl74bmht3l3nziti1uplzmnnvzvyseuyjnluotvbw414uly1p01dy19e8umg8hkd33un5hr3ws9nijyi6bpbj5xj4em99sl7b3lopthb0flnoivmmakuq8fa4gkllnfkqkxkxmckt8ea7xunidyqntgxlkxcya5k5kgxqrlqjgpm41bucscwahlpe565ydyhxfzn2d2pobqmsviqgwk0rowoob16x8d1kv0t3rkbpfjzpe95e0z20cosnpucm2vf8a7kvqyblzmyh1w0rddm2pbjet8jb25u1t29y5lvvmq6di5jspswuws030gbsbckb076m52wgc26fq7e34vrtrem4vjdk25gp1m1jyswpj24t3wny7kv7np9995caisl6s99zcr9uijfp51kw4o0hru5lgr04wpk6azkj3pwaqm7yy8qvbe9tih9ly8kh1som3a11esjz56h7bb3ym3k5ix47o1tmsjjuk9qw99mc30ktqldpegoega9450yu116rjrlhgimqaoutqwjbwijeejyf6coubnjyejd3mjagb6d8z8xoac0deh4psf2m2t903xqyub9p1jhjlelhgcq4j9fwexj6buyznd0xxrdpsp51ajsl6tq38bocm7aed134rcuaqsqmhuey4qgys18t1ptzipfrhaecyr0yoseapdw48grl7c0enh72ibl79faqguhzeenizqqqgitnotvlj9dpasjha8daiub7enn8o0rhsfymnt47m2c0euage2jd873p4m9bkn77puvyh4al82imakk5eca1j0le3y52bkjdkvyb0rv7486uunyn2s0a0mgulxsa0uhzr8v6alcm6nf6lv6sjrbk2hr81ahwfd9n20fzobfm2174vt5j78ouib8nxmvu7pvpgnvtxt49c7h125mxezy66go1xxfqc4xq87jva19vjbl4qg61pge3ut0g8q3y1x3vfdrfe9x',
                fileSchema: 's8v4s45lmuhzonua0vzl86hrhmiasfcwftgc0vngdgwf0l09ame88yskaxsywqptlrha2qciyug6czhjdj79of6z9qnevgu5uwey8yrjncz9x5n2xkeel794rt9vc3ybpxbtz7j9zlulo3oopjd496k3dxsdt81ccmxooo9klik05irjkaid3sso9p4bmxuyu3nwfxp4os035gzkf3773e5febcgj8b4drnlly5etx10cv3cvi9fpxlj9tvmz8gdigqouajvo2yb4ulyxys81o9i8jd7p46zl42xs95sdw1em4wt33pghhcrriyck9jnvhi06tu2uy1ij11quz3cqaj7houa7rctq8pa7yu2tq8dsay1sk1faa8fj8skex06sszvvm5b1w60leiwovl8yak79tkeuk1hfzgkrqgaotp11o4lq41k2r83da0l9l0uou3so55sshjqbdky8o3zqhaet45mtnk0fsybj3xlvzu35hwvqq3h23a9e4w700vd64cao2qod00a5bzx2ub8s2r6xj1lt737tmovmtttso03tjkzk4f0e56prmifd3w3pgii895kpy8rde7r6991vfwyz5c9rcbwid19du2b0uuaiye8klxxxu309h4j85tqjul27atscpj5t32k9y4xjvc6xoxhi2g40liwrkitctqorwiugnpt11tsklu3nek2b90l2kcbd3yngao6wsa52n74c27d7j9pnjqgwys72b84wiu4ie0rn96to8f3gcj8p1m8cdicavvkcto4rpgmemps80p0cr3iruuiigiku16s0bmm5mwl7y6dbeqvi1l0601gbygboi2zfaxfnyx4wveytv85pi4tvur1iwst6kya7k6yx1gqs5tjcnmdc4i9p4wzxznfbksu8cmwkhbvnc4c9hhh7d14k8u7ty6wen1yf3ujtmh03z1mg4uwzcexp11q7juou0mwstr3e9u9j3nwl76z0xec5x6p8vbnlbsiwbel6g1azycscy7xdkos',
                proxyHost: 'ifh74jz3c3e2sdbcbq57hqlwgs7bx00xchgzx2xudvyoke5wpfxufnzs19h7',
                proxyPort: 8562207278,
                destination: '28fi1orutsnyvninbnoq7wljxbx4lz61o76iiajxve4ehwg93lqlrpy4szzb405hvjyhtfvi5dl67lxmd6v7i5sr62kav5nsiw43upjh9yr1j0f3c9t2xoq04fq5xzbnfantl93quk4fjtzhkdzviuz5d1gpu9t3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xfiuxnbc66h0tsnvz73qik7rkcn1yuw5o03jtrvbxa0pix7c40yg7ej8ruzbzy4e84w82jb230xxoffkcfu1lt2wio1rdx5q8m38t55i54p8cq41amtyba5uknh4ro969ogrvsf0kwdfm09z8m4bj38morvbe1od',
                responsibleUserAccountName: 'qlwjqrrw3pvxtq7gbxap',
                lastChangeUserAccount: 'luvi0xskejdeq4vwakhz',
                lastChangedAt: '2020-11-04 10:58:57',
                riInterfaceName: 'wrpmmirxolx3yz3fmsr5doq2fesshctqy2d0nkfxedb23y37ov7q3nqxdnanj5pbyrmenwmo6sgofxdmarq2bdp1zfswwt0ogbuldtuc1mqiqu2g9wj1h68hdso896qw6wfmsv5dxtoa36uqklzqbenk2l7gxlue',
                riInterfaceNamespace: '78bp0pl20p1gm4n9y4nb00559hkz05595bagpav7ieyqjpthfi6jf8v1esqpn1cv7vjslrv9mo791l8dw25zudns093gj2c6v6x279psitdw5ywg4zgzgbn8epp97jvrxxnblgdgyv2o1tkhnqeauzuchcvk5rr0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'rljoslk8ywxxasg9b9924xd5sdl261lghw4fupj0',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '25zxog08zxm1jte5iyk26yy1n9o9ck7dagskcti2ijzmlczok7',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'x4tafa06zr4bn1ir6c8s',
                party: 'tgk1axuwf8vpns815yjv1goopqq6u0ey6hul5prag3t63pfh9b7bjemojj6x0fh2f59qe3qmefo1kl8ffoihnlo3lu2a23n9pltm6zjxtr5sw3hpls0hkde3z598993imxzebef7mnww9nklmq03149pr0nve947',
                component: 'lqrtkbvllo7r59a9fx4juzf8fj12w9jr1c22hu7wvu8dq3aew660n8znh0daz1edyty4ugtxtks3w96iugzxzchivzg9znzyn0sxkn4fz3hpr3v3rzrb6q71p8w28npkr2lrw3q76gkg03s5l8ucp3cz2a0aaf8b',
                name: '4bes3yww4n7yv4ase184cr2c3vnuf1m8kuotytapiayn8nq14vhijvhxs69jsiw2x1rtg8dk7xiug0gghs232d1tykx4cax6lylc66z6nwy4fb2tz9a4dbrrskwpkb6n5ly6gufswscj419cm2ghh646mswqr3p1',
                flowHash: '8czvossgyxfwfm5at4sm22g1g4is60mfeca247h0',
                flowParty: 'e6yt9xztmqigpa5bmm6kfx120zwh0omh43g5m7sab47x9me0swq5dz070w1cfwf1lprlqch7gvmfj2ixsxlsbn0kszzzzrq485p045o10f59guzx4fqw1zj1m6lb40zfpz16rxdctt1o3t81ok8bjxjhikpgb91h',
                flowReceiverParty: 'irtwqxaftjs7np5l4q279f0mpck5fv53o46uzacrpug24vj5c9f94k133ny3vk4si4l71qkycbgh36bxmjmxelcish7rmqrju4nve93kct2qbbut8e6iyzrzg40ubgt88448afqutm3mm8uzcmrlrht8lj2wjs3c',
                flowComponent: 'wddg32xnr363pjf5kukpxy6tkyugh1wcdk9qkmb8uzhw80ot59l4qph7cwsn67n0lbjg4u0ci9kuhwvnkg1ygtxofn3rtnvnznb7izlk1fcw028vzumclf85irm5d0f8wd7450esv14twcbiq9s6ri3vc5d0vgol',
                flowReceiverComponent: 'adb2kcdvwextbn11b0exlovtzj57tbj0uymbkkawm68nwwvz0copjx4u3rb9h8gt97arvbv70th5k2p5sejn21hvoei2vaqcns05wduqo6jm4jw2htb492kr2wv9mawc81keg9092zosmlnkijzuy3hcvcczbmfd',
                flowInterfaceName: 'vnc9xx7x9a0x2jmawm3869uarm964fy2y8npk0woi5t169vugqagf0ldi1blumf0zgds9dbkn5zx4jd62bdoi8cdtr0bzisvhrhf4755byv3evai97j12sog0pwn4i5034wsom9c3vd17dl2irydfuvdi1hznzeq',
                flowInterfaceNamespace: 'vdjppy1fngt8b7bd09chlnmmzdmak2e8p7qiu9hhy6ql6z6d1q2tnvt4t9v1th5rif3nyqqk6vkm20aadcejbq97yibvod49hp6fssp5wf3kuozqskqbsq9mes6mgliu8xbapto6x9qa7ydtbac0y0a3tveuz5jc',
                version: '712s48565umj7pybdpbx',
                adapterType: 'oj08a6x4k164b5eb149ft9m3fpbsevgfdhtj26wixkmh6ye0nbui7oebopn4',
                direction: 'RECEIVER',
                transportProtocol: 'pf9tdb131pbv7cnjlfz9ayle442fr2kt1t9ocuakpm13pqvosysew4fcloald',
                messageProtocol: 'dimioge5igks61u5jqv4tu5gvkzva2836vric1jcxepkvmhlis1sfjlvclq2',
                adapterEngineName: '7pklya2ms2b5wazxmy4j4uozgwnjl0jnm3usxk4x0ip6figwy865pkli98f1cmjc5ikro3k8lx26zvu9b2j39dhccq99g63m6r9zft0qj9baghrrup37g14vgstnya27agiwa55cgkqxjaizpc5nmwu9gop81p0z',
                url: 'vin7da5u7blea62z4f9dn0k43cuenvamx6u17rzet9nigc61jxtm5iglx3zq59p7sdure3i9vcyssmwqzg0osv5ozppd9xsr7fb9ytf8zeqcxzvws9v48o704pzikb2z034sbkp6o74xqjkzv3zh95iaz6qah5qkfs6toftft7dhas35wt86n9p39m2sb2igcmlyv9av00ih26vo7txju0wl989i9y3b43ey90pdccn0xwvuxg9pclkvne101cjhuub3m43fb38tl1253mey3srodz38av2rpukd0vguwovhu2mdfkhij4ybgrwi9c1s',
                username: 'ijg82yudoyo2uj5pwxl361bbnnhopxezujxj6fhs82nshyaxq8haurfbykte',
                remoteHost: '53d2ygh8hxdedlt8rsdql9vuxycem1uiclglksykb6pb5enpuvifxcsib29goxnhacbkuss6bhze8c2kqribu294amr9ddgssv59mo7bju3q6y6gkshyy0aueecn4d3z1e4wcck9nh9g286n69norhaf6blfxggt',
                remotePort: 6006314373,
                directory: '5rihpu0b1j7zyctocabjeeieeer8fki15my9cqqisprc2ikfpaiokyi5jg9zqanrxdkfmmfi2ggp5bvnzgywg2age4y74ozmm51j022moqwzxjeurvfcx6cz89f71hwrldzb3vhtpo5qd7adz38gsalfnzow6hjsxggz4nke5i1hj5gb3fqu6ejfj47cszd3sd22qumqohoddtwj7hsj4q9xnzw80ep0gv8ku17wrifw9p4enxd88qv0drei1vkz71dfo0wo6vyeabqhv77fd781t4secgjhdvdv16gkmba63ttfo5u17iqgwotfngwhgrrvxylrntxzeyw67dnerj0ubf0eiw276ehnb9qxe9yyi1u701e1p7gsg8ih8ha0stxhf9l9i9ymdb9hjh90dw2gi9jog40recxvp24luyl1ghjt2p4m5ebf9xnpnivfl04qdwz852qj2zrfi8uw7z17ie7c74wmbvg9960m244a7hpclvd53sjdm1og54jtbr03ajjmikb21oruh1wljo2mjnx2vuqst4lyq8cagp4ayuysl24gfzomk5o7g9qcwl9j21sa8plwtywaz4kko9023quequi8fr7f1obdpuadqk8lplem8heh95py969dh31hep9vij4lpt7dejlljy8ngr4ip8h3q67cpbhlyf4ua6d7irwiwhknoxpb6emhwn7c5d0yxuhfrpeb2hiryc33mqodmxkd19b1u0npkfm0kim6fr0h4mnnoub93qshkz0qfkmg6jeofmm2sowz01oy3xm0lk1ulns3dhd9g78nkstgauqa0byqrlpbgxcs2l55sq35c1zaue9z7uoldsqitqj831ucp1vlgcsoceh7lvev17io8uartrdkulrby53uqs0hafgrf2nlukewcg4y5tviwtyqnrv3kyu3aejov9k8f4k14ahp8ilyi4fohrcd5o5hgk49975v64bfermo3j07b80q25vz0qp0b2xr708f3f5k6mcffv9qa7q6',
                fileSchema: '9bymner4nrf9mib65zz0kuuhhz75jntzptoykx9kxkl3h84dxf2j80faljn6bb85gdma36ee43o9a5toe7l7rom4mfw3lu930orjdypmnaqngw73qq82jkw97w2wjxtwla22ukfbjy3edo9886qvsjzptslch2hs70q7bzdbx1oys2r1lj3rqp4l6zzgafdxpwqn24e6kz2o959mlxbr83316lioshoihuxscg7pr73gtnamwofipe7snduu407wa7y52z0soig4kccgs6ldbxvqozo1m6toqjvbixna5dxbxlxy5bfmye5zfl85vdxdridwihe20eu01gkb8o46tei8s9hpuo0in2uiauqo8zgtuc6fq8rxvgbuzyr2g3x82mbml8iavl81gbxqnd90abe9glygc2g4m61ynn0fzoh2d5d6k9l4gx91vzkeeyt7d4pqi1rvdmcsftfvknzykgdvxw9x8xj7e35jcunt8hc2uyflobtqtzig62t9m7zzptfupusdkpum0g2nxfcidid0eqc9zgffshxpvs67q8130pueaivwezqh8kns6otz3ulanwbjyngk98jbm8s9p8ikqo1xfw7plvwtiqvu3lqem6r723g8jbhpf75k5oqgcskd7fdgdsiny9hqbe1do1c2eyutu5zudtn4bl0rzc4pxj18i4tq8zavofrfzsrdfhuaegx6le5xsw70wei2rbkb7gwbegsi5u0bef6uajn36wmsk5h5t3suu66eidj24edwrp7rqhwzsvmau8xhh823cfy4jvinxhnvnj9pdxp1daxxin7mj37s7h47hu9gb9f2948c8yiqxy8fvld8qf6hyyo4t9uaket3g5flxkqlzd8tywiakdea269gvk1sd3xmd7t0senm2avdwp74ighqzu86fmd71u5yfgtipx4ewzfv9xmip4zw6kt71xqrogzxyv8mql2n4ckcym0m8n74uzva6wjfzw9vgmjlnfbkuhxhhgulopsz736a84lc',
                proxyHost: '4d79151efy0e6skovq7d1uzlzuhwih1z0otl02pk5vxm0oo9q0de1995svy3',
                proxyPort: 4949003325,
                destination: '09exikyw1u94iz5fjzxaf1i494o0rl410dpk7um3hsmcqalcvxrp2rhk10dsyil31ow2h26cna0d6dpuxbf0lpnvipfvrjvljq8v37dxi7d7jd8s86tc42j7j1p54ubx18xeralyxpkfn5o5hoph22vkyso1boqa',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ffrvjv2abmrpnea7ggy8linhapba8rguww226ep7la2qpdl79e41l41nbjqyyvczga1g6eq90fkdwaaplo5wqvjmx3g6czc4olmrmbeajw8s9thyypagajg2ut43e8u4wny3x8mqurc239mfckilyrbezpke4pu5',
                responsibleUserAccountName: 'vndhtxc26jyhu2e7u23o',
                lastChangeUserAccount: 'th671zmtfcyug652k4nf',
                lastChangedAt: '2020-11-04 20:38:11',
                riInterfaceName: 'jlfovjlmrw1suxhzdgzrtvubt60xl43pnz2uamgkibese498rxkihstk1yydsaqtz6bv1fc4kl7cf5b0csxlvh4fluih98juk9kj0sr0zgjocqn7u5k3avw7h6j2woyd6m7h9oyu9va167ktopgbtqe5y6le0pkz',
                riInterfaceNamespace: '5zj0mhika6kg07d7fj9yjmxavn9px311s9u6jmm9ayr39j3uy8fvwkhdg4ep3n7yr2m3j60v5voz762neuw0hui5wjawv52nrfq0mw9yrhf3w5ej439i7d258iun0k9gtr2phpl7mr2wugrz6fkf2xzcrh5bs3tg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'y53bznsy4u3mvykx14wxf94wr0iqbx6qkeu06qng',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'o2z289s405gciydiq1vxwu263t3d8wqkijg6xinbmvfdu6apb8',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 't75exlkr0ldlp4j6nh6u',
                party: 's87bqe7d6xxlx7vj2m8ryrc998bbs1m63xtkq88osmxl67y39vwmzr6ra0gxngrkh8fltbzu4tjbctenuf5u0wsmwd8hr8c7emt5d4bj0u0f7kpmc87utuqjxmwovpdh45yz88p241aw0662jo3nr8yffmodb4v4',
                component: '1zzuyk3qib5mfwh8r032bu29jcgv86whzmczrls7688p11vp2zm15c3vznivlbb4dtfoehosyqcwd451g6k4a6s10ytklsjqdre2ktliw8urypx2chtw0k72o7o4xm0uokezjp980ywb24b1wr7upa28w7b231ko',
                name: 'sun2if222p2ssnmaf604ndhwjnmpoaelz57r79tfec9oh26vawm8zjcbdvnthejspjqaqn97d819hseec8wa5dsdzp1nhsa706hbr0h3ny5vc8b90v4xihl71xjxjou1fvc8v64qga2i13uxi3jz9pv2dz11vx4j',
                flowHash: '3uuutj6b1lgwai77pgmer8x85kypyhceny9rt6dv',
                flowParty: 'j890csofpg0y0acv6o6k3xie9z6wbk3m30yovpl57u7658q607q7zj9l0vnwa2x3piil4k8st1bym90nyc3kjttfohc6o1c79wd5v8c5y3pa5g8w9ghuwf8hgasku8ps5p58vndfhkt6nridglicoiyol2rkdxf3',
                flowReceiverParty: '4ec7usteqriovcm4e95yvjydvf78chcdfdh9minn801kygurspmuc11ibtthzevbckn8wc7hs9v2z04tunf4xowj169pveeqp0xo5gbcvm0hqwjku890tj7mq2lhjtq127ts5gvt3d4rmkyi2wgp8r46dwai8upt',
                flowComponent: 'x25qp84w1fnn6r8huhedrxkr5jzyhdtjt5yuxr7903qlifgj2ozl6s0bmgfn8e7st3nyrhfo5f5mm9b1qnwhheyxlcbuu9avttfi3kod35459dukw88b0redflrvm32nte9imm9305p8k96htrfe956vhszrm3u2',
                flowReceiverComponent: '7oyj9vkokglplugmt7e7flpz923ku52dq5hyl5yfsicrx8c7onag00k4rxetx1yjz5bpnsqc186lky1t64jclyhunvgs3zzlgp6llkw0lh6eqag9lwr1qivqgglzfu2e97f2jtusanii4ctztwz9x0brdctezsj9',
                flowInterfaceName: 'xhsssfl6hztnckse0o1a3l85r1f7mf6jswxb1vqbyqkfb7uz950qt72nlumeuoa71lk0qzppljx4tlvwtkx6135dsl7fx47sofjr84iuswkprr989moi2dw31wujxmyrt2q6v5o1es1kqnpd36zarpf3ev2t1ur4',
                flowInterfaceNamespace: 'xw263di0o9cxacp5ovzbql63y3x2qvp61uww8d6jitugf1b2wkjiby448uja4s3o6sqaq7nff6f2qqsin0egc075bkbsm24o42evcdvlc5wdckkad69ekkz04e9qyizx8wpaxs3xxmwstyvqdtemk2qq9jnidn4g',
                version: 'y4udfmpflrki402t144l',
                adapterType: '2qi2818hsibrihkhd4j18g4x1qpanj4ev52cctqdy47ks8iyu47nrf37cy48',
                direction: 'RECEIVER',
                transportProtocol: 'we375dm70cy9pat9t8hsu9t2b73h04xmqn5v1j5k0zya1k6jaihdj85btw59',
                messageProtocol: '5h0xaschd1j6ehxlgj8f24s3orr6d0luj1je3qay35w7ecvcrioddnpelxv9b',
                adapterEngineName: 'cmv2b0kf26ggu0cy8vyu9qvxvwt68n95b5525oes3jvsxn79o4iw0xo8znenxnrnz2ux5trye4io2y2iz89tnf1yshcap0jzddi81hc1x0z1j89at91hhox6rlu31982fkntdb8c2wbl5uw79v2y92shmlx7jeyu',
                url: 'puuwsw6pm7oafzev5vz9kwwwe96janebzzz82d1mnitu3zxzrz9kc82bun25f0t8wvtckjhwahv071h6rkmsv64nwrr94uq3wqo24ssqfvkz03pe4kkp3dtq1yf0h66lbw56x6qqm3ddzppj781y9lc71timb37nj88yw2aruszz4jxjxotmvto21jt787lhctq13dxek31qvno3n07ffbnzbivpyzhsi2x75pjxzj1z93alqwjvzpd5ph2aegz4ogc2jfnwknagozjhydbax1yu431te5p0jk6nejxnf3v97g3oo6hjiru8kkjmakop',
                username: 'xd3bbu68sppavt4wjee7xf21jeqcxnewoxa978w8hntoy9rwum99uq5jjwjk',
                remoteHost: 'c3w9y9g1bx1rze2jeezwplxcibodr3aa6o7adyjy2bgtp1ovekmm8own9brjzzyaqvt6cardotkzl9j66aftpdxhz3rdepp7r5skqwpw2e5n0eyquwfxeqa8fgh24fnnha9btja19xxco4bz3haevxkpv0nzlbz6',
                remotePort: 5256242330,
                directory: 'xzr1lo1hfa00uq8tyki7zmxzedr57vvcfgm83zcmgq8tudzpti0hoxq64qf7b99mr4lepd6c5i8bjskdxkxx20ebt9p7fg8ebjvyh93d0a567kzsmln1n2g630otigx26lr1e1foosai0wtegc9kt60ikswrzbiaitcnl852g870baoawmx48801xznglq3psso8w5h2xebh1qif9h3hwwv93pwu2izjteabs64vqcbnmoqt5jpv3n2tgxn8dlemo71ri4bm0q1ohuddepeounxybjdz90cu9dbhw18pzi6zjcp301rpiihoxbo3ec1xztanbj4gf058zrywvbvab46csiqdbp6h3xywcukipqy9xcza5tixy8ptwn5d1000ed5robfw6mp84f41o19qysajv4wj1hubqm55suaotiq503ks7un75wd2e0l4d9qeejpvoyx0nfsfj22tfaosr3t4e847sql9r8peuciyz1gdjoo143mqt8ui3mxg06nj5odf3cbet1c7r3j8io1zhg2xp7wcfdkz2shghmnmvxqjqrj9b70kpfwzjrmpak7bitdm75z557gzytygtz209d7ay9dx914q50wn53vbg8divqva3qfeldk32hrg17dsn77nam3x5nvqiwecfdm1loqi1pphmlbnl506j445svj35tvm9fsoe3mmgx8il4dlphsed2781p0txp4uykgd2r3y5qvbzsuy6n3heo6eabs48hbs3nfiot3y1a6dk93bubjxfsqh5c0uz368pelvjmkhgvabxkx0st893lkdk7kep5bb0k6i6aw1un32hdsri1yhi3zun16809a62b60ire6fv6wrudqhwy5fy3i56c7hkoet2mpufwqyci6j5g3twdgtzc14c7555so2d1b1t0x30541swvtyft2i40y2zclbdsztivjxr3eygwze0ggg71n9ds9m2y066uod5apskh05pcv8tkw6iaqvzres6x0ixaniow4v3gcvr4987y',
                fileSchema: 'znxlzqet3q3k3blmd0bkut0nnilv56iy0sof4lwh6qzv00k5x92cqoxnq0oe8864q29b5zzi7yjjph0nzpz5h44qg06bvmq3zgyv19hce4wcwrej3z3uw1csjqhk0r2fju9klg65kb7wa2zz8m1jwlrn78tb64powm6sesbr8mde9zme57qsvutd7z5uv9xqpy7snemjxcbu9uimwlqp33a28888az7g72aixar5o0j39y2ne7avdlndsx8tjw0pm710pofrqu1v11xkz11574gxhwa0844wrsy89mh9jcuxuktom1q0309pmbao00gdmyl4tuq7js4ufdyfzra1paagnfc4ynf5fkswjelalp6c735t2qkjvx2axhabxf4k1drk1vad2kzognjoyt8rfyzo16owszcs61327jve8aghzq2mqwxlk2ygiz8cpze0ti7xk61tgmz6n1acgaw5eobu9om8bqoxj08471apsrb45uhmn85sfevx8cwxs9hvaf92nkgccodpwqpdzzgy9fn09q5ljoicda124hbp8y523bv52fsscammv8hu4jbm6sxylyec240652stqowuvkn2lbq82s3pj50othicxaro6xlby1gj1545g0fuwcx4vmebv5q43n2r5d4femsuoh62a4jle0m67lchltmutgev7ppfkqnntvi3mxzd55cy47rt3kd985xhy5291stczb95x1kz60unltfaxcfav828vmg4lbwngl74guva3vmig9fb5fy4crgvjeddenp1nsjn0sur4a7eoycwq00yfyvv0rzz02ayprmeamkkdwuawrbraveh5ddehghhermoqjiki8qpy1qul3s9xgy6hsggkt19z1xgbio62ujda0ke5mzn27ih99159jnfr4naw6fm3zuc96ki039aet6lv9yrttc3p43aqn5zd3e62fswfh591gnd80o8zy620nvcrxwris8jyysym9fmuly5ziw9ui8y5y5henjx156r6vud',
                proxyHost: 'f19ae5wl7jz8av46hm4i491zmg1o67m5wmsbg58qdfzlvhekq1v102h1ksws',
                proxyPort: 1349961244,
                destination: 'tdbiim4r4f89ijl4tx4x6c8psf79ininf05cgkz8i5fiyqq3fd0z8iw9q31yeadp7x6g9sjpq07dpwudtrro3jx9r87ppckvcyd6q2wc5po85dta6druu0mrj65xxscfz05n4w6i0wwhcfzjgo007h3ykdrlomgc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hw3pde9r5m5ghytz6xqwe50kr0uj992knyt9oyv7lh70hu76tucpkbb59xo413hc6r6nejnl2xflwo1tjmroz41wji62stjtgjdnfbto7cxune1mi7pfl3ukit42cbi6lqmxi4h89xiiv4xhlor5zw1edkf7lopg',
                responsibleUserAccountName: 'wo5pv312wo2tix5cspq5',
                lastChangeUserAccount: '7sdvtv20op9b0bi3ywrt',
                lastChangedAt: '2020-11-04 15:53:37',
                riInterfaceName: '3tfc14ndllc44fnxy43x0houkogrff1z56od0ftwmvyl0ukpobwqs43xic890ryibsywug2zsoi515ejs63yilyai1sc080f9w7hvz341443hu6p5me35vh9ryyxnl20cjk1n8vgwfvjrhhaxy019o5zuri5ikyk',
                riInterfaceNamespace: '6x8m8dpmm53jf9vgbi5ihaeuu7fdwzsyng7qwfg70781932t2mz38jbz06kk41dpmjqlzjkvrh1q2iomabkmw34ipxeogui3gtemvts32z25dos7s0bhewovha2fcv571zgbbo80jpib9svinbaa1maezead0nsg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'tx10b40g7pcjwatvkeaveil769gygfz55btvg19k',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'uytg54ynij7kmidqkbnwhl133cs8d98vqskik6vahbqqcexds1',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'lv0b2v5cl2wzgoclkzvm',
                party: 'q8ncf7zew2cuqhjpllxlj4lvonzgl390ydb0k2psstqkf1imqty0of2dlb4tyyeoeidsz332r6j0swzrb9r91j3rb73l009o3o6bd95e7bv9t1acyqyr5g9nttf4nqhd83lhihozzponmo4zc6hnnpq5c41gt2z4',
                component: 'kodlv8edbn9vgl4tp95fn6nxt52l03en02prs4q2i5g2en93tm9jprrjhwtqbr8urjq9n1v2xfbqyc3dhr8q339hizuaq1f79fngl524te7frlk6vn9tkvrkurnc991jn3mjlnldh59sn1t177405bnn8jk2k78c',
                name: 'f2q7r67p97sh7lq1wj1fc6hlvv714qeq7ph7cxt0yltzvl54vgc6idmbrn9chyl7k97hy5sx3hvvibbatfci3830g4xqv4neld2248pak34vqljxibxlbvstefh9eee4qsp819hb8q5kr17kauz1jry56w2q8eb4',
                flowHash: 'jpe07g12x6gakgobu3rj7vh21q5723oklqeggagb',
                flowParty: 'm158xyk2drdbpr0udn5au1e559r1bq56qn5f95kx40s7kne14klqsmpvkm6k9pqvly4mojt26nryq9v0op8cyrrr212om2pntupuuifupzba4iiaqbmcm1tvcmqowwl7gw87vsbepfa6n88wd90upxbhcw2v5j84',
                flowReceiverParty: 'qf31229v4zf8ec0qrh0zig1fc8rnxc3fp4h5aufsmnxv633el0n0o8hviqii0mewsawnj2oe2nbe9uih6ah9gpq4sa7gaz5eanmoqummnxz653se768mv5lnbib0vj7xomnl4ezo189v3b7r1jwimp3xeemg0x0w',
                flowComponent: 'ghgcyen9h1e7ehagy46al4fxgch1jamul4v1iojhw07jvio3n11mui1i5ghsswv3tufj306xbih5k0gckj2f4ueoyno1wjxtwkp765oqbz4h0wbvn011gluukjiu8hc2su7qqzdvwat0k8fvpsisbd7k5dstz18i',
                flowReceiverComponent: '02bjl0cwxrtifobxklq5rn4nbxy2d1jk88to1jwplc5suez52yal7fk1z1uymce0fxx3dmcvus977pxmqm1asgq1r29bap7deg8tvcszi4fzux90ts5ltztjjxssqy2h9hem3phz70s4lkiq9mpgt178ob5867st',
                flowInterfaceName: '1dbnbldeym14qe4qxnuncbewkw5a8qmnusvuq7hpwnzkb6qoojc3fwu515po5aoh670f8hy80p776fzcctq2c0on2mzfbb99yaocj7dmr9rchjfx9pkwjc6q71kjmu094aygmm86d3yhb6t56w1j0umhz340lkp4',
                flowInterfaceNamespace: 'ezky17co395xhd9uzgcwycm90nc8k36pavgqsubhadiqps3sgz9weojhtx6hylgipwr94bo4d19gv2o1alyosym5xk09g95i53o3mpvd70xfi7b3itwfx1mimsq21rqawuaygydzvwzt756qb2pikej2kt0d69vu',
                version: '1eeuhh3twcpo3i86e6i0',
                adapterType: '2bl5ywth96yo0jxoz19ahu3wjhzn7yx1447j0cxewrawy34urfij5vnjbss1',
                direction: 'RECEIVER',
                transportProtocol: 'agd2vz1n7vlq5ouxxurymweyaxadd7yhmy330nhivo4o4xiknkp7z7uw6c9m',
                messageProtocol: '7d0c8mieprh4k0iz2m7y1wm60ac2bwh4y5gw42w2z1dv9eeum00d3ydq0ku3',
                adapterEngineName: '7txkexe363qgeto7vgktylbtrtmw5iuitb4zai3s1gttv2im2ybtw5tr3ja168jjpm4q6jfn202f197b3exazg69rnbrn6f8udx1e4f2kgdln7kvj7bkop23njj54nlkgqyjglt98gz5h2kbbg2055xe7szcbova7',
                url: 'mac95sfzbfacfq8me04qyjvwtaehrsoxptb6vy95z5ylvbjh1h5o8wmn8ixhajfx0jtn7c38uq8z03zbkz1tk54509hei3tt9xb0csadlyhokzu2a5ep3iglg4ai9vnegpnhvd76q4pp5spqxjkw2lusw2tr8zkp6ogdiam840ytr3uco5qz2sns88b8u64grza40l2zfuka3acngfgtixyma4v6qceu52rplb46b4ptfoedqfkxtn5nhp0g2uclcyu6iqzey51uz9j8w2irn5t3wq0fcnlr7olms5jc4d9gfu33ik35qot231cdmnuk',
                username: '9kudpmw6kyvfgd6wich7sglkdznuk4pub9xjqpacbiagqln6nmkvvbr8miaj',
                remoteHost: 'z780ejrg6royk8zmtyn9e9fww2ns14cfs2untllbupqz6qkcii7nvallqermturjmtir9wmlripswmn7mggk175dux8uyzwqq5hqchqjyvyjp3zpnchlhfzo0xbbaodf5e2dzy14l0or01c07r08znoqr0g4f5w1',
                remotePort: 8294724782,
                directory: 'd0ga407a14hdu5e31q3ocrk2butad44mnshdf0ctre4fz9el7ll91yggnujexbdhiq5eb3bpbzl8zc950ujyb65ra2o11qv1rl0umqwvietkofsjf042aby73ppmazhzgabssbux9kd7lkz5xsgpsuzyc4da22njlffs80s2ubxqzxttw5xa8fqii5ezbx1kmb8lijx5q47gsltu6h19k1jn6lueo9so5jqn2uix6a24gq43pqcd12ebqdople7vkii8u8xspb7cfo05otdm6h68y3zvcgz2xvp49wzrsvxpikp4le23w634f9g4xzczxc8r6yzptldvemkgu1fosuyg3lca2jhl5c8h0g3maozh89mwgkvkb73disfhsoy57jzcwtsx8rwsumudycm1klau6k2ffesyohrkyek4gvqyg7uqf5806bedzqdtmamwqn25uuylttvhankoi8ckzes9qzjhb32fetvbi1mik2gh3ssb4b9t2wkfkz8d6slco6sxd547obgg6cmvhutwyx84g4pmic1pu8592x70znsqwriyu3vb4c3e297bdl3t0wzqf657gril68x5dpzzv1ftf7zoxbi3ejgk9p1arx3ucqgh17vnqgjkbuuv7t2wm3hgsrsm0ij3p7f0174r7c1tur8zi4fihp2hovg2ip5k6j73g0ppawhohxdrcaejk9g5bdnhhi1ids7xdlc1dqtyre2a4069ho00p7ftc9vftzartp2yc5zm85weu6rcmhql3th74gy0wl3uamtnmyppf3a0jwxu6z7rn6yan6otd5st0b4b4x2vzono643hooxqojdtq9bfl3daf0fytokr3nlk0e4z4zk2sas7x36ip3l3h6xqkkcu2pirg5587xt2kqgamuii0zpsm3vy48jmbgvl6be6iwh33i5u81u6z4w2ix7pk4xzvan16s3rjamk2lj5tv26tiybp1m088ogsjbj555siw2phb54s4bu5w65jvife5q0wyfi8od2',
                fileSchema: 'j6pdaajr00pdir8lycrdc9wcqso8jtsuk63lvttn1r78ghenwpfq1mb0xysmnhjiahws2y57conj72mpa4lkzjvi529qneq34fydlj4b6vdycuaf5vb4gqoqwy5qo7ek7jt27f1w2vo55ybgk19cigplnectyx39l0rofyo4s3gola9wq6llmas1a8vvu5zy95njvtdswuky8ky45lt9c9yhh45fn6nc3dzf0skkboblrref48m0g2j4o5xf6rje4giisxqwfzqk7smqyyezhne0niwvfvf72m6klzfzp7f3wjij27t27pq737rslu2g98das2qshop3gjnvnkxp34a9d7mcivo7bxc15ewcjxgzbage509ftedli19qj9khj1ihiiidjp9oc9jpql9kz8yree6n3f8bh002tdc6uxp3qsn5h6chkovimjn2j41671yht2swfhdtmhsmkzl5d6bzbphu6r5mli2nlilbcsc8eiprypfie4dg48w047j85w8s67t1wsw5j0003stpviuhbpyl3enjq0cig3iw58jubntt7k7sm12wl8fzgs5qcjks98v3yqwu2umggmuhtkl5n069yy8l557kgjdkf905pxu3j0cbhcaxexzdt4gyg5dm8cxfvmaldhj408m22plrgvtpnva9gin9lxbejs08o806977ies1ahjj81ycn09f3cxtn7h7dnu9y0xeads805zpm8qpkirnzfs8whpey0hmkyzro1kebjd0i83f93mn1sz9zynwezeyqrg8a3bn7bd2201tyss6imuhy9ey3c8v9if8j1u5exns6prnspe95tuuh6pafew3uff4lihqi4nrh2b42jng2bvbjfmp7s0mo9etb6qkyas7lfkak3j0x6wv1pewa1r0zu9aym12bus96veis6ozwx02l802f9zn1jac8fctjl573u02b39xzg97l456i4zm7yhc692ut3ya3muoqgjn78006sn9jtnidzkgsh93ltlv18r97',
                proxyHost: '449w7hf38ee5fw66g7h9o903mhg1ub4kuyd6fsy8h109fghfgxb84tgb0rc9',
                proxyPort: 3166626159,
                destination: 'k6qiiq0bm0azc7s84op39dm5yvyqmlt48z936a6eo2x4kxwc5o1rzix14sor6n1eoewkhdyczum88iyhtzxyxxota9f7hy0b25tacucqe39gxaecd6qhcbe1husdgs0psspm1px0t1qc6tpjlthc3imajbe81g2p',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '736j2bq9028rvwzgtgospre39ruq8g5m3hzo8lvkpk05c0c48zf8kxgt37udkkxvb0d0yytf2a2sm1higippuga82u2frmtjv9hrihr87u7eabbexpemw0qcva494tuz6we2ihbxbsgurcxcno4m1p9brzk801li',
                responsibleUserAccountName: 'cmxybu9f5wulmp6yfzhr',
                lastChangeUserAccount: '94gt57yfwgunmpci8i7c',
                lastChangedAt: '2020-11-04 00:00:36',
                riInterfaceName: 'dlh7ywqfncrsvmbjw6pi7wuwyzwj4cub1u45ey6omquc3d0aecuxiq4og646lcc9jfkodareehcvjp2l39o9tumix3hp3gvngbeznchjjgu3w86f461sxgd8kimohzmueor0mjkp2z9rf5j04h8b4acz25nkdmv7',
                riInterfaceNamespace: '56k5qedwen14h0uabi2cv3738d4g8d99j3cv4lpfvz4rqsb0q1ll0gp2nv8rqologgkpbjpohnptl0it17nnr9gnf5xu8e0c6iq8og656tutemoci3uq53xsmqii4pd1wga4z2veg2rdln3d9j89rm1g9o8in0ep',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '96ehchfq5rv92r0uvaoggabmkepqnrdyorlcx7uz',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '28rqjjchy2f8qj7ngj1eul82sr4zwbh5b9vm2t4scd3zi7qrd0',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'p67bn099ky7fh5va6lh7',
                party: 'q4pq3mudbvshnr1gzue6icrr9tlxur5iag2glllv90psbdcbts0rioausfamxboer5n44l11znh4op2tn221cwcubfoo7k34vrk8fmuc1rp7m1epylu7hg41o3npkz1hm2vcfnoo53ufhuxru8oc3hdjawbli12b',
                component: 'stv268ttzyg8dvla42lqsxhxtvnpt3oh7urwgvt2mjzq8gj9yo28o1n170wqhzl8j0vfhsp1p19n68dwdjzqh63wh56u8wwp2gpn98zm44b99uur8bz4pftby7tsswhpndlq9c2q2b6g3zd5hr7felplbu697z0u',
                name: 'bn293mkknp9czywr5t4grvh13k4bizgcejm8vpnnv0smket9etcxfjcua1t11tgaxvbf3lczbnlyvnr25eun9w3i32o7id0ltjntejp7rsblc0wuklqewdxqktuy70t7ki0o20zf7vln5whcwqjs8ffxk2ltbj34',
                flowHash: 'dmc3ap1bfeyvzly21mwtow0nh0zpnw0dj1v582br',
                flowParty: 'e1gg9t7jzbu5mz0uzh8ftfrf7ehfrfc61xso0834ulreo1szle5z7bhirl2lrrzod9foj7ii490bxgmbmbgusabmi6j4zqlw1y9qfj3ynsxiczupb8e78x0ql63ybg76tjgehg4iebcgnd2arca7krnjeq3518g9',
                flowReceiverParty: '88a7do2xniq322yc6j02lb9jvyi14j2yip9vulj77axh2wau89v7zmbyoh0dxf77umvnfaw5175et9aeojcojix3ijcr2dk6gkhx4tflnhzfbl669n9hnpbe0pgg8iudk22k0gs59kolga85vtfzolkd7gq1ni3q',
                flowComponent: 'cqemsvkeesmjcbx91olgjys9ne16f6z91a157viuh3dzj1s16l04y6958bx6kymcomqupx8rzjwv5kn4xku5yw3qcem39grx1fth5kykozp6de1kqdx703ybdt9gsjcx5e7or4ta7w5uqm9en3pjb4ehhiyvoc3z',
                flowReceiverComponent: 'racxrf5cfa1xpebzml2dje0f3r1uqzbc0pa06ag5tkdn6pvkw9miqc6qww6qx92ioftmen5rv1usjcsdyk9ru5pm401equhh41qfwchr2biyhh5iibteef4i3l0ofn5z5cpe0phkqy0a0xyaebxm828aumfjynlr',
                flowInterfaceName: 'ub30lnwpulfdl6olynok2wl1s8f3po0f1o1826cca1d0qv3qepnr1gat7yq6cps7gbngfhq9jw05pk7m8tk2t7vkm4fn7v5xyo8o4qbdphw6ax3mhvetf4xuy0bfhdkd68mvh666z3w0j1iy94mfv67wpmrxh80w',
                flowInterfaceNamespace: 'r4oltax74e0bezwqhmbb8mf34cdyqqosqlj7qpzyrwhqt3adu4357kbbipgqi9dl4slxf3209hvs2lu6jgy2mmxd715w6yriq0hl326z1jrxo5inh80mxrtigrtq2a1b3n4uc9s1ruiyj2438twvlvtc7sbkgkih',
                version: 'knksd7paakzmfstdoew4',
                adapterType: 'jec2silu6ogmenbloj4tdu6mktwprcep5gtr7wljeu8j85ns4pkiozuicr05',
                direction: 'RECEIVER',
                transportProtocol: 'ybstrxodfkvnla1paxq2fi0sldm06cxk4wmv9exx2k2hjoxflxot7tdnir05',
                messageProtocol: 'fr7fe1nqz9zyrg0vqb9u9f8th6o6c7ytd7bq76wx8wj6vos5swkvtmc0dc8l',
                adapterEngineName: 'yyc223tl150alphyeu59k0upe84omqb9v6jyknzh2bnqm8lzm31jzxuzyk5sq7apy5ir1z3du56tizguibn97yct2umspzm999q5o80ijkjjqtg969pe6vqv4fvufzp5qtodand2859z4vck8wt82s0i5lsppzsi',
                url: '0poxdgivshstg16k087fg5waullpdydeaju7z5wrtpmoos7qd78klabvq2vaaqcpu0clxix4z3n5pa19av0omj01umwqiu6el3nx8km6rv67pph20im7hxwx48cck90cq37qf8n25vk1ozwy6x54mqv9g29inl8z7in5jr9z3vl9djnt4wmrshhwqofpljzm8uhbt1iem0ikw28dd7hkokxozbsud49g8y3vth7nirzel65s28uwtd5o3adwsd8ioj4tsd0d2i616mwm4i9dkw99s6tf5q6avprhljus85crm7m75q5i0tin7ajkqbmkn',
                username: 'gdx8l9xglawj7mosf8f3ng1a6utcecmwknaurr4jsfxfl9wf22ss4gqcxhno',
                remoteHost: '445vdexfxv1lvhsxdelmghcil6ja2j6zkerau0tn2necl72xgdqwgbx0o7vovvt473doi7wcc2hr4xoo9eyndgkhx2iccr1e6tmw5guafviz48ijisk945u5187vnbs7vf1go3itijl1ugemiqecemszzqtq882q',
                remotePort: 2711124612,
                directory: 'vjxrcd2j1s1b8d5tist7zcm49ogrc167ljxv93g7zbifsqonf4dcpvtut4z06pfoxwh43o23wue6x2w7unpbqfcbkz0pxb8itopdde9nzwprwh717aiat8y75ijvsxfcyz8n3f64kt8g33f0hajxort4gfow978l2y2egznhicusr4i1h7stes0mc8kkw5mu4oa8i8doegrvtp3qt032n4tiy6dp9vc9x9955di6nfxd1y20ac0tvodd6op5kf3wf1iacwhom65pyuzcnh2vkakmy5qr3pm5nvkuduyrq68m5wrfeff9cxejsw5fw9qupiji43no8hf5zr2c82f377c3b90001f8drg6jez1a17oebxeq26vajr6l1x7o2du2gqekrfazr3e75fosjgzc4jva2o1rpim25rc2gdmt93zsc5wqmwdvjjnofj1oihbivgjzsdp5o2bj7lgzt0l6evatummrfevg897egpte7foxy7q063659oblkepbcwfkg0sgt7ad9zubj3ztc3w1zkyl08yypjveaeuz0a4g3mxli0lk5j06e03b9bed5cv7osgbrkxaazprv4bex0gg43d44juwdohmpn4ir4mor309j5bturr1cjgpui23tp0s6zwtf07px70m7cz0xcq0wsgtvlomwadsn5odrtr3ih5o6g9xdueri64xkpqzzt3uaztewtla18yqndk49990rk2pp1yjf81pkh57w3n2hgfz48lqhv501lgnxir2lp9p25f5kc4f6dqz217ld0e2vl1olp9ix82z66ber3sd2pd0frumaklfk6nd9bq8ob3ba7528k69251zjh12qmthizn9s7nynkz3cq88aq1r8hok9tof9zfov4dfsht77e9o2qyfp83j1rqeqdmvoea0eahhwy5c7vc0yw4ujzfe52ekzx8esvz25tvid07339x6xnxwlg8qsvd10sosmdfru980t9rkxj7dkucc2zuqxdbg9181aex0j5znql3en9f',
                fileSchema: 'xvee409nk5jy7vsfwr45wdzmvqxdtzxr04sds5xfqrn5b9faemrvcnbdqh3ngo9gpksqnzxniqubyiclfexgxzm8frwpvrvyrkp1bfm6f5vihyjp8wu6t66wyjiof6lgsx5sps3c549urg9qxp7gd7456ey9gzvpklcbup4jiuhi152qdenv24nxut8fy1bntph0byi6lna0fvikmolxlxas1eoru85w7oe0v9ttrfz3k3h7c5sdmb7f7r0sj32frd52i6h6t4kypu6i0lws8vxya01o3fialvvdmufizx1jtafbh3twrsrebz6zzzhmfrfk93tm22rib4c98sqw700rnet90cecvh7u4lyj12vxadqwrml388zgijno62ofwca6yd661ytw21nd9jxl432xa3g35ilkjkiqo1c5ekazx5fhau1ysar27uqehzoxyjmae6iilbkrzej1zn6ufu6a13gn49pqkfl54inidvc4mjgx2mmmxuktubyrak6xeh5bbtpfo5r22opsd1xs47z54pdveplaohb5s5fdfdi8n79021uvvnsxwh9xrqttfgdv0l2lzzj26gbdyduooy8v0inliwsk1cz9ph4s6qvq24z1mi9tmi0dm71j079gykv53faz537d2hsbbo2mfovsyel5ktb0b4xaawl2papmxjuj4yv4goxy3xvzsqedw9z1m2g0jwf5g6imrrd3yt1gqn7h7z4f8ios4rlfxs0e3u6ams3eg3tl2hyhz5b9vk112j70hoexsnroxpo50add50v3wujtyrmvhw8s5r9zq3w8cpjautv3coyct50u5alpwi2zv7hl4rdaa9f4c718l9924ltj3wboxtroyx8f0hubte809ym0moh7bnk1crkxqrt8rfs5f149hl7j28x9c1qyycalfaevvdzns5y5mupfadlci9ikd36zey2kpxinqj3mie4o6yh8wdqv9vjs53733c6nagm21lzwmqqmwv1llqaj0qefpkni2ses',
                proxyHost: '99ooh23z14gfwnhcl732vjpmn53lhvn12vffqscgp3kb91851xtj8tb5vdjw',
                proxyPort: 9192909941,
                destination: 'dknsze5gar9eaysaf4lkdky47wsufnr8vbeyu1a41bgp3avycuczmzvuyin2fexzq1neif15zgqbmtxb4xqai8ssxssjbv05avnhim6mvf40b402n9k6t46xm4ncanfqrhprl0t3byz1cmcqh7khcekalwvafb89',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'u13en27rxvwz7ayonqjb8jwdv7jio8sjtmvw9qz4mvvm6te0d8b2s9ilgzqe8t7y1f8fjh59l8h7bmziowv4pns9n7n6c9pi52x2em2xruugrdjsiss40lnjly7iw1hlwc8ofoaqsvyvovwc0vi2f2a9xk7ppbr7',
                responsibleUserAccountName: '6s071rf44ubsnwfkryja',
                lastChangeUserAccount: 'l6jqnrk6bs2u78q3jldw',
                lastChangedAt: '2020-11-04 02:26:22',
                riInterfaceName: 'ubt34a3s2e2j5dtnw7p699pgcbopulrwjyxdkgx237pt6ul19uyo4rtqmjgcvrt4crw64br3b1lvj50cfee9edjufperqijrrrl94m8ebyjcgdoyo65urc65nrju2sepfn0ooz78fd4m30hyev1764515kk05wal',
                riInterfaceNamespace: 'ixl7f4eloubojprjlxrf3o9pgb5hytq0xkmvzl821yrf1mmpbigcbezz0ejcq6oh2zdg6qor1cidx6mkv0fkcutl9de4a63x1o391alvbifrvzhaqravdson3cm9x5xs5p3ul1h3a6wemypjhqkfxc7ilawme6ex',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'zu2oixp2hpyqgmqkerpgj116qk8mtb4pjg5oxe0y',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'n06extj6z9zgtvjda0txfpg2ukyyj5hse2nomga7xkozh63o8x',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'ecntsa9ilrqxnx71a4q4',
                party: 'niaw01p0acjmf1l7x27a0xc2d93mis0wuk6f97b6u9xz8tavlt6qcxsda21yua7gwy92g95x00b9xvg9hpi4qezfori5l6mfr0g0gixzrbe953pucigit15skpik4vd90soir3ii04ltadgom4ezpsmmyimrkk2t',
                component: 'udezy08f2psuw7bqx98dpglt72srioe15t2dxvl2ze9qwx2nnzo74xb522h15yw4zinhdwcpxq98olk579v8o91peacix0ng6idfnmbk9kfrs7d8t1bt71e57sxd1nzodtx0hmq8iomq6au2fu6di4ht8j4yq66a',
                name: 'ycjw6k73qup3zp8pt7n80iodxh0s94ibg8whxz9kqku2fiowv03o3xj44jwmu3vtxhjjbm3oy70jtr5rpl9v7z3ea85oujrvv0dozjv4fl6xkp8ohxm96xw3fnwbsw9wenh134gxbwfgttfac3rowjuax4uhyxbm',
                flowHash: '830jrxfmllfj3qwibhh6pezun6r122jknhycx4of',
                flowParty: '8lo5wvriuzmuv586vihk5j5csby0hhnbdnvskmlkepjhehepgbg03d5sy5qwdb0yv7xx3f8ywemc2n8ywm02cklrl7uki9b8vnnjoql81mbyh58gj354d75dyyvafj2pcgbhtg3j02me2sxuw57kl1wz65doznzn',
                flowReceiverParty: 'ptt3iqbkcst337ho0ljgds14akzcqps3jsky3ua9b8wlww31q1zx4ccnwit5c7krlnatgfryhk2mfi0qzkdnd6xku8xg5j4sxcyw8mpueoz17liktwewru8dqc1wfbstwos681uen8xhtfg7z9lzeavjkgi5ebai',
                flowComponent: '6jgdquofez1qdgm75fop2v5yvfhjne8eqd2im08874fv0y8usvs7hwpo9d282d9fm7aj1obucyd9lh67awb8ciogbn2e9ytj8ybuzx64q0m5fucc075qaet2v945kyed45jv0j4kamxp08yp3c2qwiuy80872d7r',
                flowReceiverComponent: 'osqkngo18eu4jxd8typ8lvejnl8ainj5p1qui6em9vkndx7wuq3732f5pvqtu6bi2063z8hnd1vvgm25uxfq6llogp7aytgidrwsutln46ta67sp6y7z1ik72spxxpizlt87mmatyv3wklrdbiuwfkxoe77hl10t',
                flowInterfaceName: 'xmvqlu4ap7uh5pq7ahjsg5mmb16dw8u2yfcptfzi1qaqrbzirpsu5bty5oglevzd6xjr72ba1tsfw7plzk72zjc09nnph38p7kgs9wmbc318yzv1ydov8bujucrbpzyf5wc60fvcilmqwxh824qjt6y9rn77wkzy',
                flowInterfaceNamespace: 'yxithx9maxxpkf0b5xp2q3fx200jq6bvsl13v4p5rolnpv2z8wh4h8qrfleh3rulrba6g8ec8m8tkkccsw7pselqwlfv3mlf8fyjepys8d7efrvvrnj5024t5i69kuqlqg5y3zhoe822mmewh0u0ldsx551cl2f9',
                version: '5nq7w2ql6sy2yxhwg892',
                adapterType: '732n2347ba9dwvxjohzgck88jeux48gel6ipf7z61c5hwx5f34ydjb02krd7',
                direction: 'SENDER',
                transportProtocol: 'mjoemmoz5aki53mw8rxmuaf0nvxnh5nef0eijwi1ogostjcvvrslodbnvz3i',
                messageProtocol: 'hl0c7pt6j6kxgp1g4f35p6y0ge8eo137uw0xmc9g3w7k42ux80975ebe8wua',
                adapterEngineName: 'cz1a1p7xqhe6dymm38wk57g0j81bl1yyupds8xrp0id7t8h404qmw5475ml6iq7aebkxw26py1nribxm8ppfxuvwf19e9psq49ml8oanl1qpchwrrxzj09mxepl1q3mgtkoiaw3i6esop86wcxubdgq52qdlli1y',
                url: 'sbj6u0d1pmp1zyw55qgf1nriph5mozopnx9i5qlp4zccvbz3eix7wvb5rfxzp2kn2qon7s3v5bwcdiquyoiv78w2m5w6n3edqk7qx7jnyqkl4wlb9detrf2g3sv9taxqc6wcx8zpint3p5pdihj7gf2nka8k2vrkjpbktn2jyuzczuvy0fzf4uqvg1nwhvk4nkhltunhut0ani1qycjby0p0op72t06a2rwk9rg305x09g9j1kiduujvm8zundsdyai5aeqsdflhukx1741pbcaqi3615m42pt01dje78nn9bj98zjzpn4m2v8o8hntc',
                username: 'v9ug5ez0bbaszrra8svg7rf8mfzngi5msrr8sfjsukjb2rza2uyq9ehbjo4um',
                remoteHost: '6r5w7ywsmnweo5ndqj8zaybvjmf9ztvuy2ihdqc3s6ams4hp6nkc2t2nbtwshzgkvg83bhe90rt3kdzdetuobwf8etwjlxtj6275wr0hrm3bsh1n1j84u8ymq2o7gxkoz8vu4z8738bpyzkqx5npg4jo1w58783n',
                remotePort: 6658798532,
                directory: 'lusfs0jjz1euqj6c8macy7vlbregz25vavbeoxuktxj9nkz544kac9baq1pxd6jvup79xzre841ckdcux8zecpztv7igsqsg2oolo4v2f3c5yxaizd9vo7z2exuv4xsrabbuwrhzzbamtam9fpk2dnx1xu2qbs4ijwkfvf6jzxsr98kpai3b3nydd4gsmi33yf2jzvnnjqke78gnoi1batn26gmofz6n64gajyaw47njn7ipfb47wfcdcy2vifa1qeoxypia7nw8cc7rogb2k6lf9qlvohojoeb2lbd6hodszug0zwax1533hvoh3o68sag7uwpcpm2meesa1klgcufrl2vdkon3qlu7v7l89oonkvwiovv0oeaj9moer55npgqr0bzv67huyp7vt2o9s591n7lqzm7espdxn2t3gjrwzl7nj27s17mp0m5oh3yqoo8i64jq82vrmnclqxmsks055f3f5un825gd8sz8m1gi67sjtf0jbqprvmswzsyecssyfrok021g36qalrrvpbgl1h3ahu8wy1xr8d5xu5f4c2v3ekghx4e7wihxz986irx7v054ixjb94fyd2361jhbp5343exdczgk4zn6h5zd545exkaobj2sl9u1i3x9nxyki8yitdimfocwfvw4nw0fz7c9ad7kfz5r79eaesa1iqxnvx7uz9z8j385stfb7et4kylqus8rq4bn4rotaezw2h6vroc242ks81h1l8hx2do4ontj46wgejl7thw88kluwjjcgcndp7b31qw2u1daaexcl7ctjnnr0j6l52yu39dl4al1bmyznn0wvgaf8totg5ry9q2cfu9uigjo9mxtdpssctbduphgqlymau8mjhjx2alab38xikjeesdlnon1oxaerics4wv3gzoiomitzgzw7c3bmutjg7vx5a59j95ni2414xpvaf6vhvpuv5hn4nphbdyy3j8kvs79dgmcxdg4srsmy3palldwf1jo1e94ss3v2ikdlqxojmcl',
                fileSchema: '5ecs3ebitn05ir3f16or1ewhydghs56jucebx6ker7z7ybq2ovuapqd2zr76sx5oh6updcqguck32r5u7e7c6kg25moa05ayidwjubsydswjrpzxmqdq76wqa065i901f5zf2yqcfsqdoy229yfnozwucjjdkdl70cmvz2sfi5gz96styghemk56r5o8ojx40gdnk8duxtqfwon2detby0ww6dc7dy7xvirhbgh99yz0e1fu7pmmxv714v4eopjrtr4j9bwsq9mx1hy32thbidf2sb3uyi59mu2u1nh7dcsu6qsjx0szzmii2elq7uyhi6f2y164j61t4ryxgtd5nh3z4d7bkhanp5d2j8nh6cbwydvfjx4psrkttpih9dyjcs52axhr98swcv4tvthzhq3ilsm6yn748cgrpacqr1ko88izjxz3lfg3af5e13emzbsj80p7xl7fgyg4dmbbs9btwmqwvwz67kknp6olatruvvj9jxr89qs2kt72vhub2j370qpt6c3x3p0huqclr4750r9sbc8raf7ll091vrm35mvo3a1m3dspqsochhajqulpanqv1wh5fc31qiqhk2usndnr4a66ege96dv0xaaj71dseu0hsunfvgfc8gkxbkehkunbg7pta2bfsgsyh8gdem2thce3abnffksgnwy0kszfxpbpsflryub78b2abuiipw202y1o9z4yikjo75g1qubnds2m6qgozjj5xx7kg4rwe6zv4afetx5qqzshfpyhgyubu0ni9q94mi368y4mi20lqk0si2fk66s88fq2ua2zti8jy440f9c2qfijsvouq6xaf7q04qkwk2g9y964dteotoubvb9q641qwx1jlulwbjj5ji3j2gnsv7gid6ah8sqg2yli0sp9wlythh3drf1z1d1fngye8dnsjxvmaq6tf17snpzoegmmkllyruek1tieebpa60c6z63hg0rmcbr81vlc52orsc6ex8gqxru7r5vttu31zjbh7bgp',
                proxyHost: 'te4iaiy6f29w6shg5v12wd63rx20ea0ng3i2d4jx7yej4sv3hglqxdj3qie9',
                proxyPort: 5384219481,
                destination: 'xkxbcne72i8vkwxyhhr4km90y6rwd2dtv5c4c9netlgcsfx0lznb135sitna24s8u08nxw8qxty8jzs9b0yb3su98u9iwncunw3sil1iiyq6v287podnj22q97ev1bfqw4vnbli4wyv484eb7nj6vmkck2gs5s87',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r3b3yxl2ml9z4tb3hxxfxbpr7tzwfln0e5qr58ujsps6bqc1z9jbdi9x83ll5xsi593d3uddinf6spl8etd752tvdiijqpma9f6ad5qc254muzx3lbybuqzy1aj9ce6wkc2spiyosz5jvi9tw3q5kgcw3v0cq1l1',
                responsibleUserAccountName: 'sx8sitntss15gpesynaa',
                lastChangeUserAccount: 'gejhquce5qlalxw8jhwk',
                lastChangedAt: '2020-11-04 05:43:35',
                riInterfaceName: 'sya2ak8yqce476f9alj5yo2iahmidkuhn26908py1ha2vzw8glbckqca581o6ugsj9lwgdg972gp89ihz0789c17mkn5rhw44ett5g8w4f3k1ymnbxss34cz63m6rdsgjh5p59s4trlzbnicqam79bh0dct31tsk',
                riInterfaceNamespace: 'xye6qg0g823cbdebpm7udpbgz5yqoyeiezou9xfnwi8uh16k9xsc1refgwvfihyk1m944f8rvp1jhmv3wwjns0zh6b4ubhf90o0tgs5s91lkyjedcv1exvj2cxtyzpbzb8xpovnnc14rujn2lval0tqtkg0pk10n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'ja8s7x5yz7tm9zqo72znmrx6xicfensj6pjhv1nc',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '22d25igufl05936lixskl5lvpvh7zdknzyhodz92fgjkdlg7m7',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'm4trq5bhfa4dmyzkmmfr',
                party: '3rtcdl3de7gkaw5na7t2hps2h93f15vr7minknvqm30uhr9vw0fbc9jzrs8motb1med0f3pfvayj3zkg7bgmsh88xl9x4h7odc45l4e89mc9duf0w3kwjyav8m65rwvdopv6c7hlk1j8yijtanqfkqhs0qeaysr0',
                component: 'lwgpd7w0gp0s1l4cu4eomtoa5mdzoegg07oz57t5cjq3suvq2npvdn828yhi4cvuim58fy0hykjih254c3oflu96dw0ml5pi76lhf7qwihnida4a17rz6jd282go9i62an9g9cjvk71zkveyk9ev1z2c6wpfbg0y',
                name: '82ox3115q24oae4vsibimrp0fxwbii6zbui7i8m6z6wdkimjnh5ipoebk3qsbnr8jes0wfo2qnctgzca4pe27xgv5rywfdusbjzw1yq8b1yzhh8sjm6kn62oqkigcbpnketymp288wposj8x708gioshl1aydqyd',
                flowHash: 'ha9qdtoi4on3psi8l04j90nzooy2oi5t498awbcj',
                flowParty: '1wd9bcgxmq6mfz5vbqhdr8szrq47n9cj9qhk6af2fka4i7pukn2cu2ufsk44miasnl3xwc8t8fjbf9mmqssv27h478anx6w7debifji2s950u0qs1hg1w2a85sgqs2dsluzo20n0hwj65pvw1hmivtxj83djk3c5',
                flowReceiverParty: 'yqsuy9hv6f2ckotzqlp8dckvdq8vqa46a7rbigf2xa3pc9szok6gywgxbr2knfm1bamogzubeiui9acbiq0chd9x0qafntx92b8g8zx8twqpquwxkgwun5kw0qhdr9hk7gj41ta7c7y9b8zcynwcgegmi0xfdbea',
                flowComponent: 'b1bqxpnfpmfjeqfz21ztzrceh3pwtejmjvn9hmv8napanixioz7xx1eijrgx4ek6d5m64deu25m9qbi4j7464sx65hy53zankq60pgm0wl3mpsnw699m7qkaeefmlb445cq7qrwcxysfuhmarlrqtizk9zf6w9nm',
                flowReceiverComponent: '7bnh4othav3bceqyrjkelqiudndaaye8xea0w3aqvq8nbmm887l7yhaotufiovpyrjaeav1apycef1tlhjd1xwga0bstkqwuwgwkpyhrcz40ktx3q7icwz20urnvotfx44gbae7ighqx3l410hvalvpqfioifuwv',
                flowInterfaceName: 'o16294j927wzcjgle2bualuju5hnihy0y4jpvvg060f83zzheupf8nfogkrodps2k0cq6379jxsy49q845sjp9amhov6qk4j68gw6bc5o80k29r6596l1lu4hucmr2bvjklnp3smdilwkxikzr7fms9s1gn8zxdh',
                flowInterfaceNamespace: 'noebs6xsg584tdtzbelc26i2vqx2efwiwfbs5dlncqlwqw4aucuq1z8omgxnti81b0f0k2p0h2zjvcwl88hjmxemyltgzqtvdy4vcefb7dy0hzy2su516gnmq8lhro5hvr0u0ic4uv1phcrdutqnanid0s32jtwf',
                version: 'fm8z1y7s853f5q84jfqq',
                adapterType: 'j7e57kjf41wd9iritdofphtrdalcu11z70na0vmt767hor2e3a92lfx2c9wm',
                direction: 'RECEIVER',
                transportProtocol: '7wah31fh6cp5iwdmk9zkyq3vrm9j9vas0mbas57mjc3hp7yvgw7bz4r0u01m',
                messageProtocol: 'btvflehkekbqf1ovny4pr07pegs4b628t2oxk4ueueu6vz95nd9g6puai8sd',
                adapterEngineName: 'aonobpntuy3fd8pzd9nox47q47biwvpi2o79ovskmh0q8dgabqtv1dzx6c7eb8ydk4h2iru8ybg455l664pqdfpak3ncloku8k2klht7z8csgfc9bg3873khn1p4spdzv3yvfse7grx514lexzipeqepsev6uxup',
                url: '84ef54y46n0s4s291hb4vg93v2spnymrurr07r23zj47pdz1iomp8vm3pj0k935scwev5cspjn46hg0h6crpbfl0oijol8cgshgdsa5ncsuq2z5qyd4epgcttwx2fhe1wx8nynk7pyxv4zy0gedgohqc7fzp4ccgrof0hqlfajtihpsb167quvpcwdwovh3zh3z8yhssdahid4uvtjhy7jd3nho624egy7vn6j7y5mi1tktmznweyy4r5e5apwjcx20axwer2j98kl8cfm2m7zfpmckb83k86gxgsg86hcdcz9d8jp4sproa4xmk63at',
                username: '6aif8iy3z8mfyp8ganskfcrghe2eixtfytofl2cfro4efq3yqojta9qnb4rp',
                remoteHost: 'scbiehip3r1htahrevz8wogt0gh3g8cfs9e1j24c16vary5skbykvi5lx5dkvbl2xzdsj2ei44pj1r33bokqmf9uw3x96dhxn5pfc66omrw5j7662vbd7y7i5hohhb1angu7ub1wfe5czdgtwoiefj21cgibaxehp',
                remotePort: 6213807439,
                directory: 'ss6jcbtfnhtyi8jjfodi66870rv1n1ssxh9kxjo6ztueat1ngvx5vq08w9ey4epdh4rkpb1446032k5reccm31atd48i3nn0xmwjsg2849ji0d7j9z6tsjeolwhvso1bw7qreu1ig8ot8wv0w55ks9xxzqnfdwni464ut5rmc3ydn3octednpif1wn60d6ae86x3mdrv5kmo29mcfz2fd4tcgq5icyv1csar8ekvl6375a193bzpjknr6e9qym6d8h1rlghtuke2v3cbwwgm6a8ixnmeazqnerfbjiasyujr1mdxziwvrjp5ss2152ep9hevr1t5b7shh08t4igyhnatpqmtuq41o5jxcispscc9b0abdhp8nk127pubvxv0yizo5et8cz7bgk8yhslubdo5jdymtjsdqniwxoqw3h6juox5bqd1rbrqsqjfbt9gpckgo5603s29s1auuefacsyix5c6ioc8s81ffrjzjtvgdstptj9bzpc1hymhz9znqqs3ylxcnncol70m6bg7qh2i380doai9lodeksvnn5a9c1jfjy6e3811mi5fe3p59sou6ee16e4upf2pnajp1rb10qakr4ke2jyhuqzgona4nby2ie0ehz5ph50v27gwtqf9zz5v2emae1v2zdhf9kf998qn82amr20bvp2z91jd2qm7wier6ryge3cbbusy29z51npbwgzt1f15i7mzuk9cqxtfwowx0sz9x41rtcnj6u1xjwqj7nxlusnuyk10lrztij2ws13vb7zlioolg52hix8vxc461yxf2fz1zjz1jeld4whtyfo91pjed9q604in55sl2jm2lrsdt828bqrp9hk7xwvoj8nf57lq25k772i8f0q3krclaxuiod7i0agi3elitvl1gybb5aa62gk49nx4asi9zn3s12qn9w5nnn16250254v0rhxtbtyebiqea4h1q8amzk1lel7a8l8dyy96ljfnvt04eo6ghg9c1jwfe2z3c2f5ds0q1uz0',
                fileSchema: 'e29zdlc9ryr7ersfgjaxwavpaeltlhz3gwvkyds9u3g1d1dy3ml075br3yqms8wyp9bpb8m5hsm5is4sq3okzt1ia8tn6fb3xj1776npmfv1bf2yfcry4nav1ey54yf42794ui9uhzkvpg99q8r9wrd68tz5ko08po5vajlqsh6osa1623ul1tfde06ch563r9v3eawenoudxhbx980ahet7ff1p7dh4g0ms0plbkvk492ciu4nsqjs1am8denq00712gtxj899lnjrydes3hyrk9zu9rgymgq4oa96ettye6mkqk60w60js60ccthsxz2y8iqblzfe31l3ej66qwlfckyp35kwxfvwybxdu4qi3u74hgrizi6kagqkrsk7czp8rw078qia0u3a2s7gwngdkjpeskf9j7g0dq7m3358te0ywfb6tpyiic2yu1kh597up77patuue1l5j6yvs737j95lqlzvtbtak732pfjv91wbzh15yytxw5cbu2w2kxysquboywt2f11rkq37tei7vsr769qroh6xm6loi2izd36vc8m80dari0fwuov0khzckdniy6y02g1dc1gczwo789q9u35uwqcscuvjfkzja0iu1d560gahbfpcjcq8ef20jfg9o1m1uu9rvpv9vdq2ril81fjv3xxo99t3by00vd3h64eyy82d6i4nxhzqamx7u6esvugtgh79e49n650vnaf6unzb2zyx0wm6i4y406a3wbbi5429yxxsn50sc9m21mwt241lz6gow0dnodz105skn12kcq9wlpycak3vbqd9heeqiysw9cs75p1jihikhkidgduahmk7ggp0dt8js72myszdi38imxlvrgowtsvvmsmn1v0je5vgt369dlqpzk42h5omqn3jcn0qz8rald5vney96ie3xvv1jdybl6dcvw6vdkvxzlo9ebx11jr5nolrogeiv409rub4a2f4i91y4vpd5yoktv5twy8svhm4e2h9b7rcrk5t0ucgh',
                proxyHost: 'uxj0f9qunp6jh4obcwqpv3ee4ybwnfqbry3m41nnj6144brvacz40x536lr6',
                proxyPort: 1183173941,
                destination: '3u5lf0kkf34x46jx48q566l823xyu1gonm5gvq1fop6zg1jfgu13g35uk0l56i1qm7dhbx2dk7ywyndplvvfnmoyclks5nzkypicrym4z5eqaxdzt8c7iwsi8h3eh9bnxwoxx193j29l3p2qwdnqf1rbqqbb0yg8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'oksw0g2zknb6pni4pm3us1lpkyeiuvx7emziu4c3uaus946gd2szfx43kr5rqutezgbjn55tvebsmviefr95i1pmgd7d88s1kdqwyrnt71w67fzn8nog5v7b58tavo8quodmilm85d4vow4mle8uqaf28yohiqtw',
                responsibleUserAccountName: 'gjmuh4208qgh16s6nsst',
                lastChangeUserAccount: 'zz51xoqrczcv8edneetf',
                lastChangedAt: '2020-11-04 21:56:34',
                riInterfaceName: 'tk4vetxj2bpiza61si7s7aq7lsy0zzsj9r8rirjwefeng38qdn4fo59bikcu31r33x0zi439myiiqihnrish2a615sm1quvuk41pqbidum75h7qldmltbtgexegb97vqi1mfw9l3yt0fd6eyumhu6dkm6fibr2mu',
                riInterfaceNamespace: 'kmp25h6acrv3fmf5dntdeynlzt2mfndsav5o61w3o85q2z26e1l4nj22vz15hlrizam4285wwq839yd0u6mldqygw5go0llctlb1tlv67hhl1drypk4oec4icbpdkw4ymfvwa4jinldr521xiiexegmko9ic67zg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'abz1kdvdi8h41bekw7f9x992450t65gnxnfdhfxx',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'equxao4s97zoniml7v6j1dlfgnjrxmjm4fdhagnhd2izfopaws',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'e5ged1qmqx1t8b6tw234',
                party: '7u1uy6whhw6cba3cm66aqqnhd58xddc6jvgta8omj8wf2xttfqdeobu4dh70szqt0qkz9tnkzkc83a8gh3gae6wyl4nd35bctanhlqhi3uy6981n614px217vdb9bq1pgvdsmvvp6jj3ndz2gx9ftgd6f36k8qfq',
                component: 'ifaluaor9scyfvdpp1hm1wcrr2ib1g7muw1xix0wu4pqxu62ticgzp2bzeld4mxzxhzdvk4r3ouapozh077nftr03nfhbgvotxj27pma6dewqn6n7hdss8d13rna38k8g5qrczt0slblp1tkeo1dtqa0qk0ges0m',
                name: '44vbpzlv5zjge86b2beg9jrb7dmw7rjgfmu9x321ibpykm4f08tmh61dw7mvo93tn3yxva0bv1um6ay0hk4jliduh9uddha44jlkp37n8de23w2zyxs8vlo117pg8gn3x7766wp9gtmti1z0p5trce99of9h7n3a',
                flowHash: 'f4otjwtea57cbj2gw1e35dssm6ezjpjgi4hf4ye0',
                flowParty: '1d2xdx1u03daw0qcx1vv667t673d381zwa83hspqettwri4vhljgdyh446ycoqf5th0qs2m20ggawgj0343rhh3bo23vb8nqm5nr8yd2to85u4twjn2zi5kckmyp1gqkgfaoufr9kbdc4z2xfnh6g5n7lc8w2dpv',
                flowReceiverParty: 'dhxupailokrot2t9m4m9gi742t8klxqod3194sr2d9i57t90hq0xdaef1epj9u6be4esllln215nk9yh9vudusfa8ydugh46b1ttfgyremjxhutlmlcynthyjrla9koczquh6bxtw7ui27pn8p1zhb06dvi8o8ab',
                flowComponent: 'jua499485kdt7lps4x5va5rk5l72tr0hzlbpl3hx4rzi460rav5j7cfq6qvcqvy9eus3w7om55dbkh328si5m605pzy3r06wr8uftao3ipjymi6o527zpp7tyd4y8hfx5zzx0dphb7fiu4y60xx5dx2f0xxgad0m',
                flowReceiverComponent: 'htqfrqblssx6vaxswgtpx8elpfns7ch229e9cubwtfbvpt6pc9k7fuxeot7ljjf1ryvmky6fhxogw3stsqaa0aiu6vn58znb58q5cavm67iw2ktdoc9lp6381cy9hzuly1nttes92o36gdqxh0tl8svkcfkluufk',
                flowInterfaceName: '94ixwd1tbmtytq6v1uabk2xjn21nu65umpc6bk9y7e0i2sujzr2w8sqt8t7ilnef97kaqoxb8m5epdxfgsaimv5jk9gy8v19yny10prttv324ku5icrrfkzpvkd7aupf57t1debx8xkgh0bncjeqxpf4xa4v3yic',
                flowInterfaceNamespace: 'a2unjbwa1lnq5i9vvql095kpc3e3wbzheibu4b0cmzv1yeq4a7yd20x9a9ga6rr1fjsl9qbwtqp7qdedji7t3i2yytirl4lt28a47fkgnmrnvhlkso7v920zotln3kwlzg8rxq53yiymx0xm2k913m9l6nirqdcd',
                version: 'olvx22w8b8iviqyj7pq4',
                adapterType: 'p1spl8tv165g0u9hh0bleiwj4dt3i21uja7kiewo9y06c3ui0adimaqt55l7',
                direction: 'SENDER',
                transportProtocol: '2jiwdtshs01punwfjkbnst5ngx86avqk885dqfj2as6bab307uzd3rbj4vv9',
                messageProtocol: 'au33b7bvcymx8rnxj2i1s3a65q0owc7xmeaudz9hjc09qaz5ylqvbctwkzqs',
                adapterEngineName: 'gpjdco41fb3caqpiyx6gryzyjji9uay0wgaomf2p4pj17jmqz757dnsq3rg9ws1u4yh519ulrhy3yyxbtde2m5fgsl06fshs062rslcgofm970q4f76qinu799i00srsi6ctvqi0fst1kpab1gufy1wga4j6jt6o',
                url: 'ro0j38v8xu5o0r4uer189kmv4dim5omtk8t4vlhbrdjm14iu8y7lakpjaxt3cnz116uovrgurwh7vmabqykjv0sa1i2st1peqwpn39om2iwqf5a9ob4x9nmag9321xugcikvqimuasiwdh23n8dbab4tki7p0rxyt0okrvwwic8wgi1knencua20472ab7ntab39zqe2j5xka40gu9frjm2we096r3qsnr6tf3acmboq5ntnugc5usl0qaf8xq82xdk2r5pnxozjf98qwuu26cirs4eyexrpdhptplwxuyy3j6f9hfptqi5x6i3uf7wh',
                username: '9dv4dxip0vxvi15hhradpzonmqfi9l6ljbsy82ccu0buklza9sethhq3kaxs',
                remoteHost: 'aciktecjpt1l4i39ggzfe4zvygk5my4hjitfqdd66nxdnf3sojaa0jc9fxs65csnw66uh9z5h4nisjyiqv3vj479jp75v1ftb08hn2m9sfz608vu1ynp348tockqg3gfzmtvzts73zi21i5fbde1sqm420d6owaf',
                remotePort: 65225116707,
                directory: '0c7kwkkhpx0jhj6rfbgbp8f5e9l0hxry4a4gklmycxnxo45npafqwpmani2hsmyochzpsh65jjlgwidvf6ef5bfv7jzq7bsx83n7mwgf5te1mizy3po78sk57ddha9ra9ax1f6dlrm9ay3sl6he3nbt7i1spf38czrnm1710q22403q7jc8a1aobupuv6d0eowgb1isrbrf3lzx1j9o0djnvgfztzpbsltd1rlq17t6s97rfu69w01cmifdd0iiiwum54kz2lvkz16exv2pm3xzdtepge39byssw74gz011tk0i5dbz15jp9pjjxgtc82s4n3se96qh4jmuwn5o352wwkptigwp0obpla8jvh5bne1o2a2kvz3lwgshddb0v98m22fxrm4p6zxg5go5gldl7jje0jekwpnawq126940pqgg388vbkcmzapnz569k8pf9mwd6y0hz0xgkbszf3yhiy3zsz0qc8oj6jxpsu6ygzu6k5cs5h7t4ub2qgtwcpfi6djeylhs255jx99sj1hta4t7rxfivbynz6cv6448i900vfmji8psum1tydrwcewa7stz4v5jbtb9zcm41y1mbvwhhl4v1t27fsyutwd927ysvbd72ql9gz0j9puv666m8f4h3eet37vt3ia4tv831ztzr8g0lzx1ww58pzdi2l9qdpegl4mw3rn5y1eyfmm9yvkfhpf4pk7ds6nqw1talv5hyuwqkj8d3z0w4acfb3cypzgzl8pl52mog48txv5hz0b5otg26yrkt7mqtzfsdylk5tp109rmpcrrleog7o54gbjxthj48wtilfjap0bw1nejpgngo0g93r1d8z33b6vinuf2aarze6nxqn2l20odv4i4xqs5ewh76lp7aj9qkqirfalsi12mj8y04lz20bgktboieizs9ljr6mrev5obm00khlr3a6mz9jyeymizg4o1yv8ekdp6h0zdn9oi5jr6bt55onsyjjr3h4zli0j89wfs8ua4zy8hry74e',
                fileSchema: '73tnnoob8s7sh49epacdpwm85ne6xpyjssfdv1cm23821e8i2026sa6ncarbdpsq3jiem4980rt53b1539arm807cw04ol2jt5tz8v4ze2r2hbet9t7e6ghkkizmkfs777cdr5knsk87gr4kbn1xvdz9rxq5uwk6tzqyt7b6w31gmp07jyqx4k6h13rw3yoy1mfwrbvfuyno2gc19ipnrgyuj7s1719c5hbedo0x5ry5mbnccpiep34sdbxaa9n9cyp7acsxsxuqx503vl90zqwphm0263ol101qfwdl00c388i9b8mb60lznm8pl449qeve1am6fxr19ijb40htkyb8xbd4yxye38u12jprq82pytjmtsvj9wiss8kejczkt56cfaw3ate1senek1w5wvamkafimhgmy1ih5elbk55uqxnm8w259s6gz336idn5zlaizvi4dqh48hy5fsam1tni05t86ms8ngjgcv989vrl57l4plilyo0vqlptueq46j6aeq5kdc6mlfakjtuk540p5omdtnlt184hhec0ac0wnuua0oiyy1nmw380tt2i1qi4vw95kv6eu5m8x8cibjilannogkqpca4g70uu6sj56qa5i6ilpyuhntcafuboe2klt4o6a00eumipv18uzjee0jz9csskn6i9am9ax3zrd2zvjzj4bdy2k0swtgvdq3ir9q1mvd0xmqbd93d47th8wh7mydcurlpmoimd0x0vvha6xzinsqovylkdeur42ee3uyipe4s9os0wr3jcfrivud1ch1r7lhr2j85hwg91z9ft34ucwj5s79tzugcirkzymul8uk464jixs1uu8smsdd9ow98uw5vxrfan80khid9un54lasr6ozns6uc84rxcozrj0c47qod9ur8ivykbv3al1dz1zj1kkeyjqiktv000mmyg8cj60ayd8tn87ya1sdc2ktnt1gckmnxvulu78qzxuxptdhy621n70kfk4awt4vfeqyb4k7ia7v9f',
                proxyHost: 'ev2stsdlbb6zskls5zk0jvp1n1bgdxeyv3z2jgn2qpzcyk1xki1jfrh3b72u',
                proxyPort: 8264126172,
                destination: 'bzk7dq3pkd92jhubzjkz1uh4kgo3ng37nhau0lp1aaoig75fl64qh99hia28c5jqx10o5ceadb3eal8t98jmumzy4k2jv9w59fv1cw99wa1cmnmcha37543ni7wlvwj572psoojsqtxim1yqo8plzlc97oajmgac',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uweuya05u36iaoy6e0kaale8s0idkzpos04rb72feij9jgqgf44y15p54abs5hjxf28qzesxzxu9ij07pbj7sqozdiulsxtnf5bkjz4phmthjcqiiw2sc9x8v2gb3m1dac9mmprrs70kf6d509zj5jgx4pzlf25o',
                responsibleUserAccountName: 'mqnwcc0d8js5mz0aza1c',
                lastChangeUserAccount: '0lpntks91df395ngyco8',
                lastChangedAt: '2020-11-04 04:05:26',
                riInterfaceName: 'odqzrm8km9op89afr9u3xt9us72c9fxczuoxmjq9gcv6ucpnsev2cmtjlz4516vzb7koji7e5rmxe6c3gixo97wmgrcdlsryxli9rpxq80fekr8lvulei2bkds0lgbte7v0f8vxo31h72mzuwpjays46jrk2of6q',
                riInterfaceNamespace: 'zh17bt2dyodcwkynwz9p4w280egjp61g5sz6az7aqismbhpauwcbfnmudrsvr8bea4mrbtuyq92i8s311g41fa19uc61csjuess8pydb5imbyp33k9ocjqbavtidh22obultimoqsj4sozrgi4huneaxi54g8kg9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'k1rqjhnh4xy5vv01cl4kjfzrbq6ycgw4s3b093ez',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '77j9ifuc89i89fbgl7lhg8vieuuiggji6w5s45om0ygvtra0xk',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'gdu7g2aiphjh7h6bolpo',
                party: 'b5ii3ntpcesenhx3o0f9mdllydkz2wvv3jgivv1dt8p8a43rt9e0peifauumwtao9a139t3ayy9zwcwok6kzw6sphgbslj6sli43yq71kngvwy01uuij9wxyjc8sjaco1w1lcistrprjedese70rpe46tib2tvzd',
                component: '1tk90pigwpystuc7pdctbz1vb1xjvr1vl9gvhht6i5noh6narxlnhgendxy6vk49zdj9itp62oaodydn59z6jn8f1pbchwl2ov4wmlwbvx16wenblap5jfaoftiu75bosc3r0k47v3vsyeoymr1rslredd7pm7wv',
                name: 'ellugvhbtjbk3dq3k9f903eh00g3wj93k6oluc67ya4jr33pnd0ibyss2nt73l4qkawj9kpxyds66kywblveycz0dlgdnqkrmes3so1pldjkrkdwdpwgnd7l4mc5zml1th9gmhnut1x06xpuysrdxih7zx598a5c',
                flowHash: 'spyyanw84voa2y3iq3wnxcvausga3aiitvhev2vb',
                flowParty: 'g57g6bhejuovqr19jlr1q4ncafofd4w8wo510g5dh9vzv3afghskafj1bn0fuuyjku2jwzgdrcz1hy7yjkyqepgmr27qks0o50tcn9q7uv46prlf972ciuwsr4ypj4gio838gwt0bj3o8tbxdp9luu8dckhzo7zi',
                flowReceiverParty: '3yzfpr46znd8a3fzh96ujwbuvngmyio3czl8354ras1eiijgcr514t6d2sdvqkjhvvjl8mlumxc4fto0rzvuoaa4l1gfv8a6inft1zdnd1gui4p6lw620xicfxgkhqtyzmauxhh5g4fbkskyuh4wyi04ioyjyyw3',
                flowComponent: 'umdplqtgto0k34mhehjxcro7ezheqds6tqpfzpu4ke0yu31mqnrezii4xm6j1qudqnxubu19jzm7ryvk3yb7nkyvx5ae7pbo29ftquyvtxdenfs870ztg2qt5tn9dvy2kmvkmr9cjzefb6zxgkp6lsly2zcgsb20',
                flowReceiverComponent: '8s5lbtqop3r6acvmy3tfk4cjn0mixxaxyf4i0w4lslbkvbzluuyllpbh6k2nd73mt0k65on9vftbt47th0xx7da7gi36t886ik4z3iuajnulps2lyxu63olsq19uqrq2znolyzuufl2xtvk5oetf920wzkyci0ws',
                flowInterfaceName: 'vpigt07h3j3sf1l29qlc8tvvo7ju51mi81nop0bgx965nslq3651ewqsevmug5ft2c1krgsydexgw819toqk5dxnsjlhxfczqinu4lhjzunm5gibfxakxb8m5v2249e03a4tq6l8vivokhdi18d13v5cr1rtzj9w',
                flowInterfaceNamespace: 'q5yr46cjn6eixgmeccmte36d3xr4efedzq80qxk5crkm66u8tpfc97m8uczq82bkhs2c572g0023w58h3v1bhg6vem2gmawx9670zbv30e03q7qik4mdwojs3lnlaosbnl4kf4896ezrj3zidz8r7b138mol4yza',
                version: '6atahlulqx8sdngw1uh1',
                adapterType: 'pt2mf9bvne7yt56twiyr8dpqm53kxcehdfa4rp1h72nf5g6kapp3r792kosd',
                direction: 'SENDER',
                transportProtocol: 'mkb8zsnern8ycdlmm0x8cn42qdn0ixtxc5wg0r7o3lt9yrnl723e47aqosm8',
                messageProtocol: 'doabwczxd30bnkf8z91kfpcxhj23k2mggasoa3gbajypghp1wh1zvfg808ne',
                adapterEngineName: 'fj0kizzsjexl2nups4pp3e0exo8frbdzajhxp1nhrhcixjag145fnoht0jak0ysaagyn1a6hy4j6a55bp546d2itjrtgpwwu6t458raslu2h9stf33o2vnfmkm2kuh6s7qqoak348oyabv8n2jw6b9by72xcdeu5',
                url: 'm9bgxj90glh3zt82rcup1cy2vie9swdjojc5dh7wvpcylzvikoaary668hhbt609zvocd9jaycv04jofzgxdybi2g4kq7gnt03fhsl72mn4aa04f7uuv2f3lot9qlnrepk7oal2o24fr9xcz1af9is0km5ewbicn5mwrvuuszvls0019dir3ja59i9r4mmckfcvv5nmhpgjd7mxt60i6760v18948imkv36msjx63pnsix00jy3cr5d2mb9lj1phorj6t1msc3lg08n9ehyxfdql9icc3izmwfoed3s21xyvo49znkibey9kalj8gdl4',
                username: 'm6s6no0v0nw0j1kmik64h4tthaeqbh62p9u76y31q9cd3pdxtyycvi620qcf',
                remoteHost: 'hrmsog3m7kz590d672c7666i1hxso7ov66pq31ofsogp3kmlh1mb1wmhxsrl02nt11cly4xuyu04j4sslta7yh6wqv3trt2l4yy8liieh3dnzyik60fy6cfb48f9l7nsug0you9bqy7dtu45ibhzjf9vvbpcasi4',
                remotePort: 9299665837,
                directory: 'kjtpwst8xv418qgyvqhn6vb10kem33z69a51zwqivcrmz5do53w8i0yhkssctrc3h7bt29pl06o4yg1az2h3c87x9ns5elz1h0iv6kvpueo7xoese7c6tiwaj5naatgy0tgfikdv1mogq5dmo9fxu11q90zv4xlty6q7hwz818ds8ejct90mlewglhl3tw9zdnrd0hrqsh3wt1grxiqke4hux5bjt7sekp6yy0huyoops3e59187elx6znqnhb7m42bg9ykt69oq9sq579y5rmacelmkhkyd3swcp260yi5ak5k0rmv36sdppb5y25h0w5frkxifa7pwwe4vpco0paicrjljkrql8h9fhuipt6eendtk61bbjmx0zhyxr56fpk64xhp6t8uobwx8smwykpek7h5ejc54ysmx03gxq5okleai87o9al2s4s5o9atsbocnkgnv5lzo0gwmzxqld2fb4mt0wvy8atk6nhp8hewpg8c7785ho00nzossjpbe0s3497mj36iagcwl63s8jsk31g70oqq3qbxgki2sfurahkmtuvaclunc4hl17s19648jz6p3l147nimoknb30phvpb9utzzuy4nzshc73cniqpfnr6ofxn7pjouqwoa4exgk4ly2adxxhul9binqa5cw8smcc14az5wwnh1xyce8pl6i9q3sxo5ilmthxoql1a7k1iuqq8wpjy680kycckyxnibvwdls5vm1xom0muqzi8oe40mmg0201q421gcgm5w5z684gzl8ag5jqmcjicig7k88v7hq9mrk9jxjmapgpwjv5h8z4wso4werqw4ufr8s67imebe5tl0c1hqgi0z0cnin6dfctmj7uc192ihiiujoo3te1raatrxc24aexmg0kc8nub5b545q2t2537xauw192jttjnpiahhll6dw1tmqefurtlwuc2tarvx0xi8n6xphsu2soztwb9tj4darneih8m29j61zij6fafi9s2rkq0u1d3o64pwxiqjaa',
                fileSchema: 'kmhi6w9c19v1f828pus8iv3s6krmyzwjvuf7bc9r6f9k98vaywlvewnrmuqgkkp2lg866tmrhxa20favb9y1kv2tggch20b6skyf4ji2urjayrk6aswpgxoy3f85pbb7d6nu5annb5bcfmsf62dqjn6x3x73i84lcjstzo8pmtt7bup6yugt3nfhbruyd3myx12mz41d5prchdri6jaxdzw3y0jh2gk6zfo5clipkk341g6r95yjh2lkkpwlw9lw5talr40apys26u4e4seacd6aaetxoincpty7xrwphkxscos3muxvg524zw30posxetnxw8t6gsm2g4valwzwd801auziikbmr2efi0v50drg2i8nkbwvb9pjdioww9w5tx85943mya03u6facnzgv91zae1g1tsryipk54cpxtltwoeccpz2ihyk1m1t69e4yvmgwfka5grn96iumclgfk4xclc6xvzbm754wudv4eb98ddfwa5kvdivfmkws1bzeyl7bcu0gv5vo4dj8u5gzypki1kffjnwndrtrfke45y9mh260fqq8b1m8gaz4ezawa4g9ojq2ah88tjuwy32tv7nfe1pnxpliut0bwnmyswxj4p5tuwv7uotmunrfuzs8wum6c15tnxpg99tzdy030kxunl8hb3gxods665dazzd516yqyyldzi6irg4v7o32m204d9brx977fwojvx331nu8rgmtar7kq9nljoaahrt5yntpz9p06y3qfz43turnxov5770hisulonaj6v64fof5ex4caev9yas1vqd774wik7wdajkc296j7s5p1zk8s4fh6xu6rh7e6fp5d5hwsgy14d35kz36y1dwnqo9cvur2s5etmhvjbmztfcstxpepkjut6dk7a92yhrkwea9yx2rl8fxccgd5strmj4l2d5idkq5di98bmdmh7hi79fvaq0mr4a818m7kr0i6dienwbldqx4a7phubjxh8e2ukef77t95xdjtgiwyo80u8t',
                proxyHost: '2b41sndh5ev4e95qsrpy380befhq1ygqm1zwjgk8mllgfksql6qwjnvc4yxq',
                proxyPort: 9349173431,
                destination: 'dndpukohgn2xea7ktb5vl3yaciwlc1uc7i2ey7dja69gjgtdmiuar9gcyiel2nb7okjovurtupf0s6qtqvw97qmv26u1004ny5urf3adxm63f3hcmhzb13iydodxf02mjxr50eqchs806fd5kb5tiintgenqh0kg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '45jej7j9s3a5uychrgawqx5q6a4xt5d6qoh4zi5dld8ehb9dy550oax5u78nprt0eamk58z90abxpl3ehiw8ffneqj1t9ahaih4w56povbe4kqjnq4optgdwqkhvhry39euju8tcamwuakfrrptf5d09foex4iyv',
                responsibleUserAccountName: 's6jqyuzvkqbqvopte4ae',
                lastChangeUserAccount: 'xywmsxekphftetxmlbxg',
                lastChangedAt: '2020-11-04 08:18:38',
                riInterfaceName: 'ys08ver5yivx9znjc4zt5nt31dz72gmhnd11xibz47rnfcjt47hm7pq4qgarbi9ishuji8vwptfgkynlwa0453wxwzx570ws5h06enwl5yqhx3ghlns7s4y25ofw0iz24modgy8apb5zc8rhwec2ejcn4hocyq54',
                riInterfaceNamespace: 'u93sltbv1008fpz46azz4r9v0gv32w0d7ce1ywv3zhzztpppa1uyjpyg9omho21lxysx3wph7e9fyfy0um3juk5s59jl5musht098v7wonqu5nmzhzj1fkz5grwgy99r8p9cl71pok3pry8nn14getekt90j7h8v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '5al9wxcpav7k82t75ycrkd29cxj18uojxefvsebs',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '8oizmw6uaix0pg20tu2781f9ejd93ketmt0jy91b0iz16i4mj0',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'cgkle6qego22j24u9vk3',
                party: 'spyvsk67st4o9x2ok3k305o998o904b403xo4smtoe4zbg9wp95ii2h0qr390jvod3ag7b8ctduunxd4uahvs9wni9fan3eqs8ekdxd20v2c1lq8gzslyf91wwvghksv54d0aibnvmvgzrbrusjlgb4ne4c7sxdl',
                component: 'vzlr9c33idgqyl46jj6fo6z2yfn0r9kohp3igxjdmklcwy6nemsr4f7clh7yav3508cnej0yub45djhv0acbzaajfsg5v3jmqc1fg6p7gq2nwy6wndstu4oa64pbidodo7y4d8c7t3w77zuya1bl4lu3vurxv093',
                name: 'cm7iswa0o8yszfjhemlpk040evzqfjz4808l8y5cq7qi99yasmnugd63unp9bv59rym6utzcxpoz28s9hnohohlvkaucqasjqdcit7wg2ctuquy2r7ygbguv6o2fzgwac5k3y43l87r1xuxh77imd3byhrpad6t0',
                flowHash: 'y6dx7ylbtodndgbjoi42vzf0t9gjl7tkd3jqr95t',
                flowParty: '8q6ly9xq4h07qq9bs4neoo9ko7oj0ac5fdgpptxr4b6db47vrem8pe96v2x5tw5t9qok86myw6v83fsuukrfmpt7tpnodg7azrp5ll7qq8ya188qw3qdjps68ym392ojm6yul0p226zfxjx2y031av15w3ae8itk',
                flowReceiverParty: '2nvyx5v7projig8tkrkwxyorephide1hjjrwtpwx206zk636idl62774obcawn6eustb2s2iiqw5xz0483haui5bii0b6j5u5kkquop1pmpyultt637yt3fk1rbrtxu2dka182g8i6i3qyktfs1vhgu0hcdui8ms',
                flowComponent: '5m1mydgfeu7rx49f5nqctjhl2w8lt0grcue4ep2xhxsgdxbigsm0u2d4vamir4d29uyazzpgle3owqb19juy2ds1zuiyqz3q78i8nyo8l9nkxgs9eu4g9wpcaz7ktyjge9zet4iio92ub8hgvh1mgzoa1uev0r56',
                flowReceiverComponent: 'v7evhurau04n0tdrl5luv7jnuh1w0njospk1nqbljzj5tad17ozj8q62zvzqmwrksjlgmxnhixgk4627btgmybkl9673thgomc89gltyjr1dysoq4r7srdz3nzon5xl08e3lc86qptwwymex4l0juddvlpzf3id1',
                flowInterfaceName: 'pkxt08ra8d23l6mdrjbr4udugbiqdl7jmr850bmog3ssf55b8kqawd3izgj5u93yg91463faqoavjt1nny62x25fv7btod4fi0wzp5v8shb8h7y7t5agyyi0n5afftp4x96j8xpq1pv8i6gj4xnwelfvlqi10p39',
                flowInterfaceNamespace: '21arg9bdmjiyw9icu3mclqu5pgxrq47lbnqgulecmq1axa9a71soq7wahicm67ltnhprf6a4huxut00kghcbcg89nmmo8vp9wj75neopl8scrvcy1ohadjo6u773kgxhltj126cblkbcwiq02gwrpvk6yp4223k4',
                version: 'fmjvwe023xvzdqgfewqy',
                adapterType: 'dl0ccgjr74hbjoof71l5qdkkmpphpxop6d8cas04zficiqiwizfw3lvsp5jr',
                direction: 'RECEIVER',
                transportProtocol: '8mzqwf0vst9vtrt2h18ye6r5whgozpu05ln4tjnx2w7g6dts9r0o1gmay9ck',
                messageProtocol: '95ghvopqm4pnam78vfwnd6edm5nh85c9vj2j2nyg4ftjz0jtq1g4lp3h2c2q',
                adapterEngineName: 'x8za33qekk3aizlsugzeaki0vffruib727lbmcjv4q30mclvjk7v8npc5oy43eq8aboq3og90ipa6braaq5u920gqe3p4dqmyex1umhn9ckly801t96qgppsnokbw9jsbrdmbk8s8hcf3wjc2b61tlhj4jy5j0nr',
                url: 'i6kiphsdv8tui5gjyuzlo90jf3d5tblu0r9oe3l7osl31moovhz01d3kmw37z1qsvxf926tdec7zaqmb1tyobkwoio0lc5f4liz1lj9u67d2d43ycy9rafjqhfguun5jaa8b61pxazc6xjl4i45xjwgpso6ssygk5gf8kylg0a1488kcfue8f6sazkq71f9mu09mfnglskf1ncmlf9eukmh1cr7xxaw5blfxttvk7a9d8y31ip4lz2zl7d1yxopxp3btx1hh8svzoia42lj24x0qg4ilh5skapnja9x5qdx8ohkyu0axomjarvlabo7c',
                username: 'fj7tjhe1c46odog8vsvuza3p8fqbcclmd6fukkzstb6gpldt95ta4gm7w54h',
                remoteHost: 'ufhqhrdi6v42k48ol8vvdy7sqsj17ucdo85koipgeustshi18rqrkpab4wybg7az79glf3q2hqoxfjsbfjqjhbglo1c0u2ky4uvv352m9ythxrq7lk6r3u85vl12j8lk9z9kncq7vdtzomu8b2xrnpqzwl61zjcw',
                remotePort: 1986424729,
                directory: 'cnx7p4yam0vcr9vdwg5c06lb944b0c0895v0crvn3y9zxmrc3smqb5oqouy5s9fzrindj2hcpnq07rg8m84b4vcgtrcuofxnawpooh9owj9qmmrm5tq4wfc1gy0wv9tioziz8cpaoz1aqzrarnrdt7ynmebdqmrrn8ukh3x6twz9r407j20f9bphohxkw9di4d902z7jzgbppx9fiulxf5p3selephem3auq64dk8cfsaf3c99cu9f2qogfcokcfq1kzfkvik17njmt2nbdf6nmr8cntlqdyp5kjy5h993hystk9jcr3q7n35cjqf6kvydfh0izr5a7nrk3dumfds0z8h0bnwo5kbdpmv1nhgswqyeztwmbep409t4ai4d794hvxg15t77ljyci9y0dejxsdxzzzejjm35grvkekwwt9ck0ahgm1kbx70dybj766icmq50nbod2ag4i8t4o1ve5p83bw2wn04pryhtyqaoaw49lcmznxb44r2n9atfjd687e770fwkz9y8j18jj25zwjvod3h87u7c06njf5punydb5ed3ze6o3rbssmuvvxje8rc7laascx42wacxm8ggeu18tnu4eizqijd13rzkvkyicr3k9h5a983vjzescmc9ar01xlv71jk8bxam1o6xqpyezysshxelv7o7mz318k542n1qgy0rllnnwwgdepqxrdd01vjnhjaiz84xwgjv5d84qjua88z6yqjpzryt4mfcsdhxctpb975yu4dj939g1n69zovuebruftv9pndjpmakf93mm032ybxdgnk3r29647e490qif6p82hzp3nb5df557myhl9sgcgn125n89gr2qkk5er2k3uvu1fgbsa5vvwirusexg3pg36d0th8p3k1iieavkgou9l9qtgvdgfjrbqbowiw6rj2falb15urawa44s19q8ez1o3iobzx6ynkyq070d3pwt9ajpk7tvwpfunas5wuiaqrcnfr8oncmmgk8inzowdtwr9rc9x',
                fileSchema: 'r3oht32duusqdc77w67zixy5sf4subwwzkxx5nl6e8rjc7nj7l7sje3e1qscx8ey1igzrbzgvaldvbv2lw92cxv4jn4f4ypnxpcfuyd9ad6o6vhfkwymq54a7wf9npmjcjv0tmv78igf9vwog3c9x9i0fh28bn5ixcp2t6opfnze0k4tuyz03xww5aslmzav0l7ggrr86xfus0posigtn7yuuevrip48uscbwy51hrr61k4zr7t0pkak1md68g3zw54etntjquftkkrthq30hylxedejutlsw28lrfqiyv24w72suo558rhsfswnnxox6vjkslkd1t98r18yp5p1tnk0f46bbfnxzmgcreutvc19ejyi0t2r1eeo9fmu0uw9nx9wwey997ssrz3z5n8m4c9k5rc9l4vcoszgd1ctqspxcjptnuwuusr8gs8vf0aliyszprrtmv1nywf2nawbas0qyxxjlmze4uz1xdd2tqjtv22l09p3ig84kx1y4e6zrqumkapg73atdwz1olaw2cf05pbu2ady6vdvpftjesjonav09kddw89asijx3mznfge2f5ig8ls00zozvldnkaomu10jbixeybz3dfbfvhuew1t6y98xseqyytyfqemz188wcgjnmzmbncc8w1yus2z8705dna0bqfkbisy8f1o5hfihw9q2n9qn77rkypt5nindix075o4qpzik36an5w240pi8018zi25zb8iq56ydhvpnfz55i4snetsivf2lh4qmans19ood5bx0p31m449wryymh1j8pq6oixhma911w5h1sgx4dyelwycwr4him5wei2fzyxr75xbl7zxcqbegzfm92d1jt3dkazac4d9cqucsmpwk1ej9c7k0vjoz3sju31vrdnadyo77pd51zgld1wa4jmsjbncjye33r1sx18awmb5bstia1u5e09e1v7gzsjysd2oqcxna65ztmeo6xsk2bkq8eay5rfb2a1eata1zsfftizfp7hu6wcin1',
                proxyHost: 'kv3mezfev5a1qs99ztpirui0skx0t2mfoje04lu5gpd7603de5lgvpfuxobw',
                proxyPort: 9779688096,
                destination: 'pbtlcw0osz8ynmbieiu94b6f7e5sfa0x4khm6m4arh9b9bvbw03hi7fcw8bbs3io2nuvozb23pekm2felzpimdmv9eg13fp2bv1ai0wxlrvli28eijpzw7nvb9bed1layvprehv1ovg5u0bjjhme4f0q61la9ur7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '73fg5wmsllersv1zd8xdn8yvmk4av4jk2g11q7pylozodjvjrt34mdk0h4pv9njv4zzadyl1m4f9ygq2rbsbwhhatpfhg9c2z42r2b87mna2t4r2fow9uu4sycv9bybleka93ftcioi5bofdkvktaoduxos8vma8',
                responsibleUserAccountName: '9hzzo0teeo9hfhjaakrh',
                lastChangeUserAccount: '50bdx5e76g49gu7dgsr3',
                lastChangedAt: '2020-11-04 06:21:56',
                riInterfaceName: 'ctc8i6w922y9xacfg4zn98aii8p808ano230296xtfwek56p7eejhdp2nrb2fygqw7cy1dg6e16cl5bfi1hble1zaze7iqdb4j4h0b21srl6516hrzrmsruzijxpuls12et8fc059lx1vaso0bmio8ettlgom053',
                riInterfaceNamespace: 'lrjs0cgnyaqcefdwr8kpx32dgl9a4zzhwqmgws6pgat7ya6qkpzgtelvj24w4vglcs8pz6ubd1ipua3l8dq9pwksjo21ioub6ra6wqsxymh2qegsyx7dh30zlcn6187exnm2rhuyg9edtfiq2a012t60d8dd5ng6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'rurgxtt4cj9x9uylm7wpm68do9goat0pl0r740yd',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'xch9mnl2xx046k1yf0md4op4vbo1ecft5wpd1rmsv850ojq3fg',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '8d1rajs8ixv5joyiu6sk',
                party: '9wkgfb65k634jfj44murtxq9kuec5i3wuosflh65aj0dm4p9qikj9qmre8y55qq8j6u7yv00esyzax1h65yg31t42vnh4bvkj55ghwo81hm37o7nj47n2kok9r0ccjk40x19zc0pdy93swa944vvb94q9eyjytgd',
                component: 'a541uf34t4publz10g89ppfv8vtq6qhvbsem7gzdlbbtfohvf3ohbyas6hzf9kls531tdijclpjxg6mqp0n4ps23cukklatc3qam2m75za0n7defg770louz9wunjr72kbztej1xexaacanxfwzqme0dcisdzwkv',
                name: 'nq2qrljlo7dtck77alm4pbr985lyuw43frz56dw9sx914r63vvzalcpbjttuo32rhdpdc4rh7c06ti2mlz5oxag6pe69zyvmhdyouygtry0z3v180amifoaw6ob9pfavl8n5ylmsvjw8gxfqpgg01lqaonhydibr',
                flowHash: 'reratywe7lxu3pl85dq16qj29rz0howp7nlr4xle',
                flowParty: 'a8u1c54otrcm8k1w71nf5qi9lo5swhije0nmh7k2t29mpvjl5ko9b4yeaziatzs9iqepgx8fmfk3owcehacl2azggxs29yxtd3x3kka90ryz7g6avddfc2cvkoc1z1cw5k8bf3zsioo6irikup7sfjihyruqza8p',
                flowReceiverParty: '8zbgcngt7ijcvzpju4upvl50f07mwl4jverger368pdavv7p4dbgyukjpet7dsueewwdka049luxufg9jvi7azzwey9mnbr0qmu7rdw6fkykd5905xgc4bjq5eh3xhfxc121tvryxxotuy0c2h4wexyocoo00zdo',
                flowComponent: 'su2i7uwzy60577lnmdpi57415p8owsp2fezeebpkglw289ro0m4t31yi3j0ap5pr5evehm3h2kiyr8426bnsbmojegz7ff40ebk1t7ifuytj25gu474510wye4t3y0ls61jn8tt0nzce408ptbucwxizojoixxu9',
                flowReceiverComponent: 'c029b2lwd2xe6kkcdvos8vetux8tfp6v55foz5qg148tz10ae2x0itcxi4ahzkenea1qscetc1khd6pcj0ffz2xx8probgp0vo2f1o3yaiyoyjhufrqv8r6abyy0ne69h828xkrqsnp7u911rbvm7cc2uml5fsm7',
                flowInterfaceName: 'llnbutt9y6doszfhe3xp0jvrfn8m919vi0vi41p8zyv8dvhj3fu3e6199fyyk77yh2a055m8uctimoy5qaixkdq6phwjq7zu9c8swb8hkr3xjkgmms4qm92xnkvhwswfdr5aolzvdqb1zwwubpf6qsyk8aubpasm',
                flowInterfaceNamespace: 'qfdijl6ean85myzratvvh6puxgutaaa9kpm5muv8j12w5bv0oi2pzm3soikx4cj4887wba831stx2bp26noc4o5cv5zp152631lgavkgc6u8sqbgeyi2o4e1wd38stxwv7iisl5fwf0txd6p85q125sf3pxz9ymd',
                version: '6w26ferditdmhx2yrry5',
                adapterType: 'x8yqpnd1lzt5mwptujhptm8f7xxqyif7h3v9hpbs4q7x9ms21ivey1910sdv',
                direction: 'RECEIVER',
                transportProtocol: 'mb1l0crdalvwr93nhmllawpwusq10qnrnbr22wl20c0lcowzpsmgeekhn4yt',
                messageProtocol: 'e9zar5tqre3a0h65xtzjvmgfjnc2mr417o3xwrbjkxexptpixs3dz1547vet',
                adapterEngineName: 'nni9ofegsu7ti7mpfvzxkjvsfbzh01w9nvewvdnmmow8pikafm4yyd19rgjlwustltrx1mtqptx6w3j8wwfeagujxovapnk4pqs5l8i6gzeerhyl89halg0f1bkpzrhlvlbwfq30wnlxg6617yburo4fhdjvv45x',
                url: 'nrswu49rxbi8n251n8ldu9cwz116f89v0dtltj572luyzgg5im3hyt1z9g8bf4zinojdersqxbg6i61cifmch2mt7ynxfrpta0vzubt1ybxqi3dtz7t10vkh37v3cv1offmq936e0qgzqig32cmsdi8ty8p6yi7w1vhs0agh6th7isk4zcgxymoj5batyzwnu1080ytxxjaxjt2ryx53bt7y7kg51cp99i2cvsb403l2rybeven9nsjmw1v6quyqux8iqit6ezauu869ld3y44dhhwpx4qfd1q3jtg4ro51r5xux4dndecvt6av7i1mx',
                username: 'iy9pqqfbpa2rye14sz3ykmmkuqfahnkhn373m1xyr3j5ahx3yaxagzjo4atb',
                remoteHost: 'oekits5ehcq24b5cm65hx0yaj8h1cwuv23glan8zngwmdhdmdu7e590n20fy8xa3x4dkamz4dx0tl9zx0p2t5rp3gn4rhbkmlg8vw4erpglru2y2jw1ui9ofcm4m90s8crewdqrhxctgi6bxrdcs22t3czdvxye8',
                remotePort: 7977758555,
                directory: '6md3zuuyo3ca1y6i7q7917kknkm0zxqlm32xl0vw2d6livfjzckc8l1wfwo3fvdpq0tmdewm84nxk7bff8h6mka3yqu05q7wgkajvxpjcjhlehqm8g22ukitsh7fuq6t0rzt1bnawxv78jrjz44yus78fw8u59jai4gt25akkt1ydrqbjba07crjl34ldlrwo46s7y3q6zfxj7eljaeb0zcqof2xqrx6v243ij25puqy3p8ug7n41p48vtv53xp39oyzmsolme695i9gpyuc0oyc2e90oigvwdbomz0wwjlnuq4r9v1zi4a6lx6e24ttzz96a6zrslyow7e0y0pwtuk4grxmb3lsuymtdu0dbwzjltd6y84y286oc4v600zywqvhmn71tb1yo5dzbfrzmhxoc399sezv6fukk12dzhtxxgyultr9ps9yccpnlyn6juur9psttxrqg8rm9quxp8ua0gul1ucmdculy20cbyy6sy25prze9duuomqm864d7pac4qckgxj1a3eia2ave6nb9ksogub0oh033j84tsxujy922qnpmulzddybnaxuueeo1ot9r7v1zdh9pla5e0pj9rwaoxryraby05cvcwlj0kcsawn1tjh4uhah8vhp1vqi1jlnr7gv0sgd0wvg86eti6dmrqfutahiz39zfjxs09l2rz2gm3aam5xyhig4v98izx2nh3yagshee840e6khu19r4x1e7zk6ljg85ato7nnf0n2fqhivggzg8jb0igpuj9nsk8j4muuqqee9ziqii2dndgnm5uvcgxg25z2t05kh2un5bjm67goyhrkmq974pyfcqgibyp5w0pu48juxjuhi6gkglqzx9syslbah0wie9qrao3ih7btatsop3j8bwt3sc6aa5lpkm02m2xx2s6a9qq85m7ovrmmbt9lylwurjxu1cxc69hwa0cnsz4b9ai5b7ba9pwuweuvzt90p82jy5vcvva7veyi27lil7itv4omhblyal16ixwvk',
                fileSchema: '853b4yzlyp1nzeh8jg5iir81f50jsgd24hcmm4qc5y2tauf2ae26oxps5pzkh6um08fbq5uqfu9zztmwkidjrbq9lm9guat7vfq03wmfg20q4x6iikfxw6dgak1te6nvnlsl8w21zkgapidicfmlvzimfm22ctexl1iigmqw3q26p7a7qq4qoy4mqrkra0dlskx7vmqoxr1994lnug1a350cnqiji6s3gqj1yzqnbe9khhnbrmwb2gx04tadwxzdi0u7zzw14bjaql2rtoss7pgdjw5s3y0vyj8h6gxts4s01pv5g8bvo4s17rurwvxkr78r7h5jip2845g25twacle5wlzfnc4wcaxh7dnvkk2ursqpr1lgxlc5kdgy7hnowl5rv1yohjso4rylo4vpgy1t46gyzchqwk0p4ig8k4pwppkf2bey15ttcuxb3pqwtfb5zjs26juva2irls7v2o4uduax5vs74db8bcgtcu162hflause72svfddsoi83sh38ze5yjxbqoxunt16zclqor1ty660206mrm0m6uisbacgar5ode4s86lbp3mwtq8xwm1yen3kasxhpm1yufs598omzv3qevudxq4fevcjt8awwuw9ygyibebkqhpi5eh1i1bbc70fgpwcrkyhpthzjc5r2ckdptgi28d0zeg4bafb5uvr8fyoj1u1g68onhkqvufybkwuajmvv77ddafh50t7lezc4bpr4qdpje8bw0m9kxkjn1dbz2mdtzw90lbr0j6ueywdmmhmevl7awt9unck4loq02ywi89fzy34dwdgn7msvdazs40sggaqflf12ltokgctu4um9yvd2khfm3kg763xgcgfjhoentql57gomovv4lla6o2k1r47xjis0pydzj9fje06i3hpfu1p2vteu2l4wmsjm2dmiml8c3rtg05jyx0s0zbvgwd7wo32oqoqewufxf0hn5oyxh7njpie4pj7lxeubuf7riv3dk6wxm37vrmz7xtun0yv6',
                proxyHost: '78c0krtnqwt4wfprl5roo8uxxsis03ujfi9il9m2ii1y2bkgeeszpzymcp4zp',
                proxyPort: 2609001296,
                destination: 'dejvuma09jf0aiwp8j4yuydrkw7byua0bt64ytbjcidmz6314fc1rg47rli72s6tjn5sbzu3lvat1qxanwmz5c3mb4z1vjp576sesk3eetjx891nc7qtgm03o3aru8k45jmjbbe2w9yq3vhydano3qk7iae19vrt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tn3lxyfeo7w8xvd0eh1nld5qktr2akcnpm3dyytgglu7xjthe588ab7xsjug71by2185o2ziiyrps7un23qu2u63fjwh7ykpsgh3kk33ads2n6fyl90wm91tei0kt5p87m57jbamy53nc4kx5oaps0qqx458ohd0',
                responsibleUserAccountName: 's0vgmj9ayujg742tdfur',
                lastChangeUserAccount: 'zg8rojp5uj0x9dv3da77',
                lastChangedAt: '2020-11-04 02:49:17',
                riInterfaceName: 'wcr2x5dnq8nkzd6l9t2wti8q0fzi5o0z3gmfptc51ozz0esfuwg0vzaa3if59erfhkflqi0if18x1pmfvrxfz90uvnz9v706zvhcm8xcvn5i1fhcprstiwlgr7vy2wndnz2e8b7ekebqhfzp6aenfsomguu6dyz7',
                riInterfaceNamespace: '78l357y4nulz6s2651jyy2wfgg23c4joevojep2glmhu9u2y35p5wpff1armwvkbpn614kf7pd1put94ardz0n7t7a1uzqq0uugk8a57wiy3qtoyjc8y8bg2d9fjgcrnb2ywvazromxar6gplgl24exayae42ct3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '22boxbr8jhux04ckbyxzgfewam6ht370qyh2sozj',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '1x2tlz8hd4al6iips54y085rbtsoy14lwm1auoowdpy6iifhg2',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'qby8zv9rpxdblrvca5go',
                party: 'ua7rfh5a6m6gjjsdvjhy98rlklixr9ts0h7dbu7o48g2xow6ml1akhp3fmxll25ifurjnr14rw84etxq5cyyq3g27kcqley0jl2nl7yk9qrpi2jpcz2ropjtyi9h1tbxd7logp0wr686cbyo7ps1kwx82nkbn0pu',
                component: '7j5n1vw7n6584mrncb1tmmb6mgh534ju2bvof8mi86xdj3mwlp8f1haxgt19x8h546dtof0tnm0t34axpoducqduxy7rjy5v5gncwnedbevm3bwhw8manq1go5572xu9vm66g48a6pxqfsou15dgzdxfjsh4e4ej',
                name: 'p4k7qyorni8zn4eo7lsf1bjeu8i6wwj50d6v7p9dqishzacws3kfrqgd1rn2kkpijit3n3kzr90inhnuh21lhka6vk4a8yyszsuz92d1d5oao8aekvjmhmfr3wacz7d3qoqxwls7ondm938n6o8fvdoiiv8uc4gk',
                flowHash: 'xewikok1dr5w2mayd0gxqmh773m3t8dqa8gn7dew',
                flowParty: '8w6lo3b3sqawda4z8jr4pzvn6mz80vb0wm9k2opyzptwel3nul9upxiwr48xtiwsyj1lp0sgwf2szxt9soavqu0vyota0fl64944lm5o456c89lzjqfe5e9wll82w2b0jz7a3i430q3iadhlkndu0ibs3tv5uhai',
                flowReceiverParty: 'hcmpfqxreilq00mvho0borp1x6fba2cnk5le12nwlz5li0fzjzf8xhkt66fiou5tqfnkkuv28ulwwfa8lxtp446il2ndzw6d9v9oe5fkntp6mp5vydz8va00cqzubm46pjre32lx18a78egbredlk27bd1g1t8gb',
                flowComponent: 'gyzjqyg8qv245va1t8l323rsq7empr6d99v121we6owrd97hn4k36k71dk2uz2brpiiswfthmbe83znlanpvb7savilragg2cj4lidsn2g86aqszjukd7wv3hw80t55k0k6y4p3xgsxosgj1hqe3m9mdhgthfvts',
                flowReceiverComponent: '5lbo3961k9vnb96601o75owkbccgqirb6pth8tsvvvyaprpz3v1hxe8ll13g7bk0upl3hrpq8q0kiqnmy40of2xixe6syh33ib21uvdcf2cmb8lcxxiyatyozkv5ddb1rk6rs8tco9xc4vj7p4hct7ty17lacgpy',
                flowInterfaceName: 'hmdojzoczo9whjn1rumubxhmvyh8z73idax14xs5kqhcylrtxodj0frl8h7efeb4n0qwgiw2dsi06mjk0bq49h4xce4s09o3gfln67hxteccf36v8zo0e7ilz8v7fwh27knrrd3blr5zy0huohfzeg4z6anceb7v',
                flowInterfaceNamespace: 'b18wxrzw162vmtj9lcoq5xukf9dpvm0nsftxwuhv1wtr165mpq99bp4ossftbpkdm27euya6cuws9v7fi1gux4nm54h68r1ea02lyxzlmty6e19ma2k8l04635fw06vrbiu83dn5em1dmxzjqx92m1p5hs8bq2bw',
                version: 'gr67ah8giqrmoleamp3b',
                adapterType: 'lvqta66rd7b9nlyb6knj08vfo3mv9abvx01odn4gyjv3rfrpdzcup2xl38t1',
                direction: 'SENDER',
                transportProtocol: 'cikpj39744m7tsq7yninl3tkeuvqupg6focjieca2vgtcwbggmaqfmdikn6l',
                messageProtocol: 'i74nxneth0efh3674tp58w8fo3fi52kc4aki7yep70b7l84vliiktruvb044',
                adapterEngineName: 'bb9q1ns3bwycpzexozlwzzowiu5zhb4xl5r1d47h2crxccj8dyxtupb6fhe5gliha4nfmuv3t8csjzjhpf5oxgnd3l4mps905lfyd545uzt1k748ebvk7xxrvasqbmguxyp6cppxwhqdg38fl5zkbl20caiz7qsr',
                url: 'g5t3x3xy64fggct2szs392plfsklh1c2p4e5gw039d00ewpvg2qscwu0v1j8lxinacix6uubovsqr8yi9g7u7vm1dupojcgz7a1ata77wpthf752xi7aqgrnxr6of7a6bvmvuqmlu35qo70gpwepwa1y9fmy3gakvsyhyylnt4waok2uahtlszztv3fwna0f2gqzn8q7wllf7wncpscx1un8mmo2to55k8svwls492hm7rtzonkzuuv0v2wni94y21ruauowise84hh9qsowzn8nxwdkueuif3190l3ltr8n73glu00ljxwzyfdvuie6',
                username: 'ajs9lg2hjji87y7xibg8u9g7i1p2xox3zrieqj909v8nntmnkz4wxi4xvyss',
                remoteHost: '00je0zxdgravs7pss6ogipssssld01uq1fc5p8jiurhamrzd4aaay7hfxgsanf0cqobiuduc5smor3d169alilxpcgi54scyv5f0cndlxa5voumcjmjeyjd9ivzj2hwnd294yxtko79t9ozlos1pzevfzs0qa901',
                remotePort: 3327165476,
                directory: 'm9uyaue40i05uar8nyxoonawa3k6clckgaz7ocmcp2n2d6aqjvfxoc0x9thdohxvujglkf2cul0eaby9dajuklht31xbqknpiw7dy05y5xo0ttjp9iy7fvf5z1ivihg730xexefh3w8etzopm91gzg04qauzl2hrpv7ak31xwzvpf4gymd067bxmw5qjcpfqzg036hr75jglm6q7bzvl0uphv6xppno8p6ywz5z31d96cyjmb6cmhwnndbyx2xibwcmqcmb6dlqnxi2m1bhpxu0hj45604qckoh5en2yuob6d6v1ietzcwqqms3ojn9bjzr3lsu0ftg5bhowfdkn8shma46revn8ezmhf5hk0liwuzhaysgtcw5icnnovzapp0hwb14u6hzdwxvk3kr2i8myxf259z6ped3yh2q5preb2ep64roxniey51js83a8on7q2oy6lmws8u9bx9gf5llnaeupxw6axrwjtkc989cvu8g1uzifehte4dj97cg0cnm15cz4012guh5dhrb1hjw1ewczzju2y0hdyji9jttihptfgujfpfscmhadog1rt0tgki7n4oasre9r8ftk5lmqeur8z9ah62oteps9gdkotg1mkhwpotr8895u1r9a4szz7rs2kuvxkli7ezhkmga8z4fnm21kyyzwlya4zvygh6zlo9a6id0jsqcw8uzthgs7umbfljir79hdlspadqfzhotl6nmm87m8huihdauga6vm5hzp6u0weeufwwei9y4hei13u378wrha3u62u3te8lep78lxxi9aowvsvtkg55mbd0kie9qljcughqf4f4vf2n42hvkteh3jsq4u2dg09j4m273k1m9c4r6cbcrgfil7favw50gm5m0b2oyl3ugebtv2xn6uq7mt5d0dghwwl3rlg324tyb2fkgz8x2prz5uyi2jukoc64l7vngzcxi76zcd1guf8pskpt5e5p9qm4df4h8yjw7hbbiqdg3mhtmi9ssj5trnsiiqsf2o',
                fileSchema: '0q68wornxcfvvuq3t77l7z45c3jjlx14yyfbd03drvb4wkobzpfngwzqlgeew69bnziw6tw9sd279ctf2cqvkittjcculdvt4g9w364i8xkd6xvqdivtto3m9vbg79cj4lxdhsi7dx1u2e2czc249dr6jsv1ynp9dv1n2ufa9b56lvavih4i87wdke7cw3rrnhnm25qsiz7urk8p57kh43qu7fzjpun3t9xso4efzt3rxu000lzko80vla940epw3rr9cx6tfgdikp67n3hk5221yo98pjf4p024i48cnm5e5bjyqyea0fvqnos392j813hpcwedoupfmwpsli4tstw4o62my20l0yw4h82xolf99dl3uheecn8mz7eno3eyokjmsfes0mm2254gt3xbsm6sn3o7b2nwewffz35d1fbt0rdzluc0p52kv2rejr3wvjxo5vx3bn36q8dj222wuy71qm2fekffpneq9hk33ilmcxza4kuupr284bib5pyfpn6dvv01hl3ei10wr9ukhawr6uxxqtctoxa0f9zgloqllpxc5n8ifk3k5ulikz18kvt14msilf1rv8yhaoi0rigixifismof7itjullugzueqpoilafeyy9ay4jnsilwylnxxbpmnmu4zyfwfhlq4voqpj6x9yla5m4mw979l6dmqf3uhdbtmjp5us4csuk5a8kbnk66kvrnfx4g9oxt8sjjnlnnlbpvh9ip76uyaxont1divuaqg54rmwujf0noycbh3agp3idg0uvn091o3zor3z70sedvwy6mr33wq1ew35c3z1esiykv402qfcj9zvf3z6w99bgxnbqrdn9ndl4p5azy8uib95w4shm5b84iax2k7dw6sanqdccu0tl268k64z4fmazgxilzugpu3llmkxgiwja4ubesatfe143f3fccj8sc69addvvbtdsu9375h67auyj083972i7ofmflun3qmowujm6n3fhfgpw7ry5qowa2w3p6tcx45quc',
                proxyHost: '6o9qq6xzw2brwmsl2fqqrrs58bpa7ciz6gvm6djt31unalws3f4g7zttdylp',
                proxyPort: 13120515983,
                destination: '9brv90nj31k5f4ibduk00kjjtkrlmn01a4a1vlbpqp380qmggo6vja8pkc0w97r5rwhvjhtconpw6qj56vnbfiau47d4sy2k4rlyluayuphq9gpsxefscmqmfjajencxlqmpqinms9m6xd4bc9hp79m59p0n7whp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'socsgw2alxkp1pu5nvpemcb98v0t5uvzky8nq2lm649hfwl7afzueqrfgvoqadbjam1hr07be7suyauvdykf2cviptkpvviebvc5hs14aoieupuzupfa6gzui9zv3vxchmv1bshpf5xunqqs7w7fx5nq6tr3y4ls',
                responsibleUserAccountName: 'ooukn7j7ddh16j9y7vnz',
                lastChangeUserAccount: '5wpthcodwtg7l9urjq56',
                lastChangedAt: '2020-11-04 13:22:33',
                riInterfaceName: 'pa6szu1766h2yksfxurtyk4c4sfc0krt56cg0frgue7wq7fri5r3mbm6hn1q6ngnkjf6buv1h95tsjo42z18z8pela62082kmu4z136b6yrqi7lf7hrlvh5aawx86w4t0mrwmx7julq6rxp5gzq2atgk624tv0qv',
                riInterfaceNamespace: 'f14motgyexhtun6f26lcbpmxegcwz60m8fc1n0kra65eanse8x3sm96fdvxjlfaaijz1fmam19sn090x5o5zz60jeycyfrdfp7aoy9q4pkmf437g32v82wt6ze7kx76qbqnm6fpcqyostvelq9jjiypi5qknjxqf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'kgprtahf2v4nlnnczierqh09ulnv1ytqyp24w9u0',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'ls782rikame5acigedcxkcu9cyz002kml3m3lbfovusac1liyr',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '2d6stebvxmfgbrek8lku',
                party: 'te3eyck35qkg6a7y59sat73itpyfurh8m1427mw0gsgyjzfh03kkba89z5pdn6zy7fpwez8yvxyx99kh0xnlrgb6gz92ynxlga5zzncglxx0yogql0ep9nwpu5oa48u5nxe4r4nhpc0w2zl8gpu2hgjk6oczf6k7',
                component: 'gycmr0uz6q4j21hznl2todpohpayuk3yc56n20174jjmc3ur802dlf7ps488uvrfnaj647xd7nzlmjdzy600sqj1glqwpmv7ti9nlc8ij95i0enbevyigq3csqdms3wnl083h5zqtl2qbrugryh4eq7wmdja77vk',
                name: 'yjesypk9m8k3kgte1l1yiu3rbzvf633l7pj1lj6bt07uiely3cxjqhbupg6ee5ftj00obfvxkn8rtdir8m1wzgxhjy4x523rhql8xeqrvk0g4qja8oi8122oclcjlpttzgd2b4cou2x14zs2p76knft3jaiyzwg8',
                flowHash: '68pd58n5t7na5vbicmzuolyyq6y5pegn1beffjat',
                flowParty: '7o62e5gl6nswj6eg6xebzl4tml9b9hussoja0nuepcum59vr0htm7lczhej0n52e1zy1g2e2binod1qxn2hnzt0a5ryjaw16mbgabex62u8w0ufsn39ygz8rsxqxxiha9i5l93lwceomiviv7iihgjvzyapmje96',
                flowReceiverParty: 'xv75rsdwdyzc3wd0m4enal4c44jycpxw5jytiaddpqf3ex8eekrqtimesrdcx4djpa7y0tm1lxs47y14e394xk4sj30n1ki8ceynnt5tbclhgga2vz1yttcida4hklc3o207642z4r8i6ynslhbu82dzqk2yavsu',
                flowComponent: '0kn0fu2pjndi3ixq3scsu7wlv2ihpp4u18vj8qtlqorbsxm34o3f63x3fueahwp63ov6rddrwnedn7bg8rd0i7zxavpdkpgqdrleu8lkcsdbu9kdw3oykyhcr0wzq0cxd2oe1noeyx9o1he1gefacq41k1mjdouf',
                flowReceiverComponent: '9kdrnxse4wpjupipwza4htuxskrur22jvvkepzb5tbpstfmlwnj4rnub16vycaunjeoncra8j7aoyq423a2etobazktxu0nvdo270xogakfj4wrr9qkecsi334g2szxpfyalt0zga8v383it9bbv4qopn3q0ckhe',
                flowInterfaceName: '9c6yhlok48aw74d2xtb4esvdx81dcns745ieng0tyc7p1ir67xkuafx3jrsit85eqscey2xkmnm5wpmdgq8a21b1so9y6xdw4jrwkoecj9xs9elrmr7kxxflgbym21jlalvtk1qq0w92iz4i33gk70rhf1oj1n30',
                flowInterfaceNamespace: 'ygj4qlxb2loumao1cn8ibsbs47y8ywubl3pzovhbv0w7nwqda3hnuhmg6pg88mtvnagveee9ig5fkwwzq9wr5usmp1x7sb9orerrk4706g7nh64zhr2xp9q08nqwt6o7ixokwty8p9zdl7yml1fwckvonz97e4e0',
                version: 'r47r0c29g6yrtm9lgq8v',
                adapterType: '1h5we852srvwmzpxoqdn4kwritlx08m6xi4wha2m559a526t6ixzat604foj',
                direction: 'RECEIVER',
                transportProtocol: '0xlwa47319nvvx18cbt7abg4evkpmauaxqweplok6ycscstbs1hd9q99uxx4',
                messageProtocol: 'cktz0ejzwquas1pgtvc4wswpjrf7zf0cx115m6gf94lufjlb2e2qwi4t3ikd',
                adapterEngineName: 'slljntffa7nsed8z146uq70v127s1rtqj58b8omwtgh5cszh5q5lum62l5ukl5siydzd3to75z9m8k8l0rbc928h6y6mvqxl7drfkjqbzhykh4ossergb3g01quzicpzi2umc8uibnw8d07xpwfc83irx8xg37pi',
                url: 'u5yt6tsns2742cg533e2t71i5mpd7yiz4y7tli0dsbtrmdur1rj0ubug8bpj5cljqpztbsdg0q981sbfo3wdmur3zo7hwfcejjihvuur48yri5wqoxvavl0isb9jhfkswimu3ieq5om4c0b0n8kn1ollpelf10opu9o0i4a44bczbxvw750xfu8clk1ov3h0htg2el0gj1x464vlhjupxzftda7modr0j4h950nmc9prfoll9rwgrokgulnac3zlo8ucvcazmkr9emqfx0w7jygs03w5yqkipmrwq9s0nthmf6030w01dghudhhg4fmh',
                username: 'rtu8zvdtxg6eszik9px29h063rwv1ou1g1wunfc2ao8xyz1ulx90v7z82kxw',
                remoteHost: 'q1lc1s9ahwevphp0hc5zfzpaev0njzmt2j0mf3qn11lfoakln4tsveowadzhn8xmcjrpdcuoxdwax220we4h1o5dv7nnkmm46wrufl170ekm4yrbvn7nsjw7n626dt443lr9accm9i6xnr4em1s6b044q4jc5ig8',
                remotePort: 7852305198,
                directory: 'dyc5ml77d8obw2uoynoaa1edbt052snnjcpwatlfkb7hixzfyyuctnnp2rai9vh1ug5tbmxkfp3jfgipsdcro6dcjzlsnw7hh5plxpdfk69zi138dkcnwo0ekt5yn503zytxc7kywnrv1aferrjhtt75i1ark02otqhvm7u19nvouog5j17e7i3yo5xttyc8cbuq4snixx66sb1k13gz72t9lf8j9i0ab8vqvbrusajfnh7kyzlya20jfd2p7zbvjw780fgaul4dfongyahmk0yuntilqm1eos06noywpkpteng5e75lalqo5le47rg6q1sqmxp1fehdacldrj1ov94iyrlkjd5rz9j289fg6w3cmph08hdia264in604pk3k718ckyx14y6ici8qp5fkzew6bp0c72yycge9f86mt5g22l2xuqa1g0t3oa5yv6pf8ys348mwf3hgbd0soba9oqgwxikffkt6h74iw2irekdvkzafz212zk51wown6abl97bflhsbvm9ckc73hnpcoklc32fvemvgv7zd35ub5xyvxa0ug0pfo9ryv1vwclkk2m6csymym6r2eteajqp04injwe3mwk6bbz1xvjxutw61bwuw0z613uq8sg1rvk53zzhcdlotxkl2f4pbd9dnx3die6o0f15wkad0v1gc58m89hgaftowrx1omb958xabtypn1jn2i2lhc1k1r6a5tie3axa7xava4e5cq3qd0b5bcm90edawsimxjvsb158yedgh6bz0z5p5k4fs2hlrlyfu6018fywpju027btcxd0cwbjvrll2ub0ofirntqzlwbmb6p3re76i72rb3axqyaflyxqrjt0hv1aywvdgy5hcqymy4r8j0y7kq3712tchrzcwx32bvn12t7n5ih7wqsufyqrbd9u0r519b72cnl7vbgzgyirgquo0vpwz53mj8n9pu68qtbr4dv6iwsx6o92apaiz72ay35nxqlnfj42fi1occp7d0hlxirh3nxv',
                fileSchema: '6eubcytxpwpblipe3376sg5mtpxn9bgeyq67bele73gce54mcxlh0u6ypz5vulzm7blad7ul98z5ohrq8kojev49rl0zfnnlwmxdbjtrm4fjxc0d5wjw84izxfx5sznntutj0s16h2fgw8cbaasn2xmyfj4ntehsmumz8t2a1qvghgi2mu7i0iz1rerbrxdztj96j6vwbvddvy93dxafefgrh0tmkku39ha9kk7vh35cog1c3h27ca6srh7u8n87b5vijn2ivbzh675j53dusiwnqz1asloowszsktdp4v08asnexvy2o4mr9l7yfbm4sbdufm1rio4c930qoxlvihd07b0mwsd61auiyt7y9qiogsb7dydkacuyuq1vfir5fkivah32emi4gxvqwhui3juev6yge032vifjsdgyyk2u1niicgo2y22c9dk61n24xnsfww9861xbbdobfhmkpfxhiqzrsjasfxweu6xt6i9cytihtlen19emfdqivpbd0ivzjzb8hx9iflv9d47grzrx8axvv1dpz028clalqv24e9z6n6z08ubze7mpmj3k351s8hrsuyhyta73ao4tpr4yw15bh7mkwpx0gkoq96e87r3283iqa4pmu17zegf9na1eo9awuta1vlmjhxu1lowifvzq29z1iwidc5uqlk5uecfr4drsbbu7o8ztl7mucs95ub14m8gvt4pojhe628ldq6moodve0wb77modf4n37jjdndlovtenvmvu5ux11r66f8aecgoi2oacppxtzpuxs0kvddaihi3nxq1h1vhga5cf1c62k2z2qr7lpdxk1f5s7aviwbnww29mjvnx60me746n8nu8kubqxx1e25syixo7p9tt3q0wdeniv9w31mzh3pe6ya1qvkuo9hohwzywcpdu3lccz1tm6xtugi9g5zbb7ha42qs7h57o6rgibtihqkwk9u7lbo66i9x1zd0glrn09g59niornwmxtyd83unolud4v55p8ip73c2q',
                proxyHost: 'r2chgw11g0c734xtz8vg5kd7e3171f5px8520cwiodzhib3421576mp7lcfa',
                proxyPort: 8460742833,
                destination: 'x9a6ft6jsd7nn7lj5suy19u50k8qhutdoc7rn3sq2eiqtxwuz828hcf29ipvajwb29zrm2j3lg6nqww53fyl1u964viko2ik0h0916rzmxo7xsgnu7nbnf216bjbwquiqmob5j2vcergv18akmhkz9mgww4cdy3ft',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cgyk349gkmnwj5rpvu11i35gib25rjqpoexkpta9uhk9nrxjszqlnx4pqp6jnynqkw3anv3gu5nwqy9nj74ygeslfdnpoenpb3fnqj98vsm2k349nxetd8e4mc00s5186csgf8zk2r0qw2thi16dv1778if1dt6m',
                responsibleUserAccountName: 's8vlpgqa2r26kpxl1ylh',
                lastChangeUserAccount: 'gvpe3mh4r5uukbjd3wek',
                lastChangedAt: '2020-11-04 00:34:03',
                riInterfaceName: '5wxmbn97ba5qdzkievexb78ly3fkg8qcb02ajdltao8v3shph4m0nuz55bumb8pbmu3d1whyrc4wck8c0gov5gllorktj3ix3wi9u7dilqzwm83mbltzqxpwjj612zx37dpfuwfm3r95viczqjgna48kzv2h1mt0',
                riInterfaceNamespace: '5hz21ztrj4t3bexzk9zh8a7kkts926m9g8tmsurk9cs3yt47huot97px6cel5byfvg1qx5nyijuqxb2gwhpuhd1dn4zj03xx9cvxd9ry2gue4whbwaz8hj5widsf35otwdm6m3aap4v4m3y7cldwc2m8uplhuc3g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'p99itaol8niid4nzq7jkyt1ujxwyegrj0degl8r3',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'uda6x6pc1wtelplt42saxphgw69c60qnjy6dg1z007amzgzxqo',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'tcj8h4gvb4s322fd9kly',
                party: 'urfsv6qh9o3t7huxuru2ctugi1lrrgyluqb9pszyu3scmm4fhyssq3744muo482itdrpu03encincpumwynytnn51hg16avgcwqjms2qaocnfkya6zx8yo9lhlq1pxncziya1h2lyhf608w2b5wft802reg9r2k5',
                component: '0mjvgttkt2behlxjvo8ffxuexxwu6qc8opj3g1fl1defh30v5tb8i2ir22y22t6gh1s5rg1inwcze5rpqems0n0ozz8iojavyqneehc1t8lgxvmah40p08bs7a73ijrv2bmyzspggrdok69ta6oe6kv5kq4i7rqt',
                name: 'vzppnv24z65sglc5j0gc0alrifsa0w0d43a7gep3454i0mc1ddqsas5h51jxvxhndsvykcp8wkn0lveeb3h0dgc6qe35tl9bf9ntgiray0jznz7yshz9gzk75fkhp4fl11ffhy8bwkq0whwtf0ikcqt9ysquowc2',
                flowHash: 'gk2oevk60qg85pqm1d0xxr6zwwcakbnxvugcy6u5',
                flowParty: 'hvdo4twk0usb81l4dj8irpy5fynfz2fcsexkep6dz7mr2p7ldxfusv2ofmkedrk1g1ivczim7qds54azsvv5gi24h15yk4pjz6lzqhwzoa3n66ixo9yd1j0nnno8x8koyltxr3a1dlhgsbrj796fxzrwldi1odos',
                flowReceiverParty: 'e5gl1x144g3lr95m00ot6ukfzxh0x43i6cl3jv27cbv8gkwcrthqdm60wj5od4lza3f00dbx4bix0olvrdqp4qx8z7x0qf6l15tg6kjue6oxxpuirnok73xbsbdoq71gylblwfzecffumlr0hhjnqflb28g1yux4',
                flowComponent: '40westozak5l318o7ke8a6s67g8vakz4ocwbl4bkrota6u6nzb14jypl3ohu2i12quzgpisf42ebcs8mlp8nky26l8mofjldjca0n8qdooahvvtst78t65b1dsa9yq1lw8sb0efatexanzb8usbl46pfoqza9psc',
                flowReceiverComponent: '0yxhx0g9m3voui9jkdskly0a4guvc1ga1fdkx35rxfv6zlei4nn2mn4xdoda1ebevnnumjxpl3ur5ydjnmogbzzrq0n6hp0vowdpk38qw0l7c69o2dbdtrutk3gbnc5tjw1elrn76ms0cj64jmh8kv9jy3nrkupg',
                flowInterfaceName: 'u8gitmejtnqbvgb1x4xgvs3amcw6fcw0tcn45ebuddw6zmsheo208fv2qcuqpsv2kv0yhv5ydf49ap2845tahfnantjwjsla4adcdbqcbbj6na544lzez786hiq582fctzixijg4v13a0w388sxjrn3dr8mnkzl1',
                flowInterfaceNamespace: '2iff0qrm7l4f71uat7j4ghqn810odvbxjd1obp0z1hznbfdb7n4r2g6y9vaxnua34hd3qjg9borztk32o799f481ugte6zjo9h92wiu6si9m4kmli9agx2ysmeq37j88ugi1e9x9pb9a40betmwx4mzm8nnv1am8',
                version: '64li9cnqbdfbdd3ho1m2',
                adapterType: 'b6y0fctt2948dm2ka2hfjcy0t63ptlgtzdscm5no2uk1g61dh604oh5vwwan',
                direction: 'RECEIVER',
                transportProtocol: 'twwnxfrmgzj5qm08k40z9ffv39zeef6f5lrt8w367uam8yicesey6g5qdthb',
                messageProtocol: 'c9t0dyj3yo8af1vllvfymesauwoxlt4drf2l10gbxs4nneup7bgzejbvedct',
                adapterEngineName: 'hcfvhxgpjbesctrfr3j0papysy75ludnqb0lky0lg53zu4vfk7me1sy2vrwvdnic5uq01dl1erxgsyhn2687kee8r6gfyaqz0ig158fcyohvnbagqrlrcmomrzlm5ylr4ov4cckayz8u3o6e1ksc1bhmr11qxu6b',
                url: 's8lrv0srcidbah8p2k9chhh24vc5oz6vc42ca7fjgo32g3c992qon9fyb22r8ym6p4oxy3edjn20arzya8zv0caly3q42i5jq36aupbpl6gg3g4o1q6kllx663t2cwilhpbvpytyo13ej51o5hxbc8bkc1xk5qsa5fxt5uax4bfqvbkr2skwc0q3zryjf4eyzv9isno7kyhxyz4prf08izte28gj4j384gdc8fvyqdgz5gc9oa7ywv6glls9yal3ug78s0dpirxs824yoef1jduwwtk5smsiopricppbtf5ebtj7chsb21yom7sob4m2',
                username: 'th6ta6wcy66jz8zfuueyvhrighx3nveyk2y9f1c76nt03peontcfe3micvkt',
                remoteHost: '9q9kxhtnw8lrkgu8nhds5zye8mdsit1w7uv0kwuymh4hd6kyu7jrblf3rluxf0prlvwll6ugb3oqqy6c0nppm2x0l1owec5bjksn4z01wi57ip3q63f3jrlw424bx773jlkeah9fsc2hfmvus99avhqj5dmwnw6y',
                remotePort: 6102034633,
                directory: '49sdk6kxg4caow3oxkguai6760cjzf4vmfhdoyuqpqs64vy1b5q7i9dy7am8e06og15u4eibl337kcyuvd3ya8tqgwdi0x2m5xytu6n6t4gm9bth06vt6b3n16r0z4upgh70kgs380h94599plhq81ft9q0by2x844apmps4393lezr2ja1rkq9634z5di8h4kboyfobrpxiczc3ti56i0srwfaeq29w3as9qb5da5ulfhfq37i4pgoc6ip7a7a1moqtp0kevn5f31isbf3kr1h7fbhlzmdbza7ylw9eg4htjngc5vzv5ur6hyskuswmckrhk6oqbj8hng3mmg83zi0rec92dolv575ijkjqrcgghnpg8m83h7b0mx6vt0lbd3boacu6sqnrrf7p5vasmp33g4dx3p346putp2m3l6qbu23ub7owta0suzvbflq1ohvvtzr82lskeq5jao3itm2l1db1mphowwe6vzuod5tlptsyhbae2eprnl8cabvsj0xdx1jm9nesa9a7t42jml0sprdwtz28mxmocsik37ebuilazhuh893vi3gqoy8gqxkj80om901fsq5rxhfawwpn6ual1errd7kannbid8qpi9cpjpn36oj8i5535dun1dgq23eagjkopchkup3jxbzzf4b8kgsksmwwjw1xpzm6euq55lstgtdtawf802jtq11gsozkaawr3hvlhoyns7czqn83ud3skftxaaioc89k6tdgkfb5ra79h893hkihb699sesj9ucoaxappwnw2l760yie4k15qnogwksdlc7zcwl3bui10ulusjnexb1bhyysf7312m0lh3n8rdhebaiz9awi5kz7rcd7e2jmuzordfri7oewvvhfn2wsr4pa48yw1zhice5hx86y7lj0mcqf8vxt0ntetbgbj4km5ziyirjzlt3kary5vqqw3tt5aqg4xuld2u7gvg5hpjnbkc4r6bzft375kb229kfbsssuw5szub7q0dz8wxzvssz4',
                fileSchema: 'pwhrc2xtzjlmvhorfvg5mwgbbxddfpvtrc3ci6yzgv82hnirhd7nspxlazev9m5rtjo5xad01lmm7em4pqpj920rfgcjvfdcvanwzyins796bvjhpoiljx4k02to8zldo768zcx55ngyicl8u5jccgrv798er9pr9vzi27qrgpgvv6a4faco3k4u1x82696oh2924fsmhtsxn6n9ouz9ry9fobodhxm7rscggvuuwr8b4qkvnrr7w9clyxh4co851azj3w3lzasi7c778doefiqo2zoo2iqdgn65egsd7j3lzx95w10m0f77g9g83m36j8v0z4r1qrr23sp86nqbnr423g046cw8uh8hy1lhps12umw0kadgubsdx6jcqcky3jsdg6ejy62qx1g7xslu77w3armxx2o00otme60v23qyezrafau13j93japhbtk8jd3omcgic45v9wa1yy8jw2ueho5lzna12iwcp77r7i8o0glttewzhzaxom556w2jj7i0mjie10ojbapyegsnu6sosd1qfs3r2ygrqxu0b6z5p98xpj662d5irg8sk8k0sevzn1mhgj7p3iagacundx2o2c17ag3xuliro5ui7hk2ghh5hvv5fm3h6kcxm0k3wmspwrjtv8khhse2qq67nfsyljzii794jreiiu60zbyh4c8ld4z1hkznspy7w5q9es05opcrjnb3i6u18do78lg37s7wsu4ix9t6hjr8kl70fvk9xq257nsklzlgjh27cpouyhb9637374l6ey41e0bs0v12rz1dr2y5fw8esn55rqqg4223e6gn7wyf07c33wjld66mjoi5qi0f0ou1tewy9fp1gsh98zhkrbvc17x60topz66pzwp1ynk6w710b150jrm90iy26p1gp9s5caf12gtef2k93ym0dcbm71cq0p3bb5apltwsfpjhaeylqlzyj0joc03hqy26brbb31c9ngzf7dnmtgfilh80z3u1c3dvaohbfphsj1qsl93u',
                proxyHost: '14jmsp25pitztw11c2advar2wmm12c6fpkc7tfbnzuwgaquz4ii5jkv6vvbu',
                proxyPort: 9254282123,
                destination: 'v8djne35jnbtmqaqukxbqfa2n6dou39ya751xytn73ice5o1s579ns14563xwqe7r78yc9o8kijk8c01b21q6q82piiqdz5rmsy5bqpcefc2xvjp92yxmadg8thqv1kttb79v9ew9a01lbdn63faczvci0nmt73r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'i0pc4exus3r85zhrtog6bqwkvpzcntiipsbbduy7dasirne7j18wpye1caqa6w9t7jrzc2cg69wu3pezamx3blw6pfu6x7wd5v7r3lwau7zyqthzmjzzkrrigheeamnr0njqu2am7fda7md78sftsrceu7h6dwfhv',
                responsibleUserAccountName: '4n2hea3l1mikzhyleccx',
                lastChangeUserAccount: 'xx4v0vk3ut0cpayz4oo9',
                lastChangedAt: '2020-11-04 00:27:04',
                riInterfaceName: '5d9cc3a7b8v14pqcjgisv7msuf97yxvow13tce9tguqex0lw359ivc1jvx84y7yjv3ruy05ia5g9pl4j9fqp2r8csduoxnn3fr65w6lpe7bwyiyuij6uu3ih605tnits639uq01qvup91vqjt7rqurq4qnm9fia5',
                riInterfaceNamespace: 'usauhac2bq9lrind3uuo13dh5piegj833yh8xkkm2sie9vxx35hdsx4hklfugfaxkzmklieq0zx6hbmzid165sthcmrvu6b32d2oy9keumebxy0skjn05ue5oof0u553u9g7bgjh2l1i8c80kj6x9zm9w8z9jii1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '31fg9up5ky796q7x1s3gdl7635pjkp2b49co7b7l',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'k9o4o68b0k92xax1fxgeev2luytla1w7fin5ri53kvyvi41si9',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'h7a67745zwunwgjf2ozh',
                party: 'mwz9nefuy6hyfyvpm5hm9253isgv6lli32kc09idqkc9hswn2fhqd0ihyiag60yprdaftfpwerdcan5l9p61olljpfy062hrav6cildbbg16w05awic8tgxxppd305tin5lc9859acvnm8wp5m44u6b2rgast3ok',
                component: 'xl0rmdimflo7v5a89mqqcotq0o9xcl12sl6kx5fbu94xgprcpqpk5zxknj4xp7dcrql9h3yhqj2g46rs1g27z7rfjcvo1tvfm4g3kimpwtdmrr8t11894pydcmx4dmfyy204ao79kwzsjakx24bbllgl035upowc',
                name: 'ckuqxu7gyps6tukbad1xt1jkr2odoj3mvcr16ivk14uihzivek4uewo8rj2slcmbvev2cvsj810srm4umcexp5i2j29in0ke518re6s246xajowa9oab3ze8cofw52pjpnc015jepj9gt0qcrqfeif5exkmh2knj',
                flowHash: 'dnlpkraxq48wa1p7mdlah34mxp11rbn4p8g26aas',
                flowParty: 'c9u34l0ewb2sn8bjy2mlwsd6f25dvb7k8z6jpxsn7lxpiblcpewi0kg44rizuzgk02dxwgeh2tj4vqi58n0j1uh5ocx6v4t09n7ledc97rhxinshhq56ncogz1tfdwwmyl8ochoxtu73wiunnvripdqmvht0of3p',
                flowReceiverParty: 'wy3ctwls63kvkv0s488x6604fokp9ryqunsikv3nddiz7h8nc26tztyi9kp94tr63huttw1ujbkhkgx63nnnwk5e8piqtmtbzsv3ihzg1cy32f8zn0rk2ya6aswbomixocepjknk0fzx36tk0okk4f8q1qsyifk1',
                flowComponent: 'fu2ah62lzin63pzewarqvsypp2c3vmbb2gs1r5tx6yj83xpuv4y25pw26a7svgo234hstzauxpwu66dkailcjo5y5cq0y6ohpkzw93jgkyna202h3zfc0mw7k8n95o67akvzt83yux876nhgd644wz13mrfj5i8a',
                flowReceiverComponent: '0x53huf1rs9e2a9u2pjy7fn2oxko8feukznr4r5cisghulval2vx5kxqrg7qvwopg53lbdxggt97g6jjdcrfyrhvy1rtshr724leypjshif96y4iejwq8d21b00pfy4p0vgf9ce3xbm6ab1jxdmrgklpdrqvpbx5',
                flowInterfaceName: 'h2t2y6nrax7ctok1uky5c349ef7io999al1ym10k7cv8zbl4vck190se6bl927p0hynirv0fk0krmnqe2izknz0o50a7oyupbf13dvw3tfzjiykdwagb4jljzmvz7mpqeoqa226yo1lufnxw1meew73sbrk2uqk8',
                flowInterfaceNamespace: 'qsuiwtiljwmrutelbb2atzhvflfcik98g7jk9rynahh6limvn3wj0wrukbx4atil5hlfgukvxs9ttkxfkpo3en7l54o5c6xjcfcqyfptyvokbcfexg87yaw54zg4totiyia9lm4glztkv2o2vd57rxtiq7ucl00v',
                version: 'ak1c85ruia90onxbpzo8',
                adapterType: 'e2s0kxd3txaqttorr7i6z7gd7qp6smrlesknew6s5er93r34cfbh9p0dzk3c',
                direction: 'SENDER',
                transportProtocol: 'ubwgmi3szo0ap0rm2ehfdy81csvx26rdd56jkiwmsyg8d1kowuhxh9e8rrfh',
                messageProtocol: 'j8bis1i42oijlypr6lasa45yd3uvilxq5in4nmpre1rcccn2e8ub107w1xdo',
                adapterEngineName: '79i6thspsghl8oxvrurei22xniumahmjsqtrlhydl3o0cgymeu886d23sxrrto22tk7rxpbskwknppeg59evicatcrh5exaouo8drvktaqj9wfgxjqq8n37oh1ykmw7t7p9abm1aqrktyc1j943wrh7rolyp6d3d',
                url: 'z3o8s1ek5c86zcb24jhcofcwmde975q6xwr1jdc0uvtyzge9v7rcy5rjuuzxpv3qxw61avg9vrc0zb2pdndd9ur0gakvowqsms14mw4ixrqeu2my94a0uy0a7by8rm1xd9bo5fnzuzxaep9qrt54n0ndoeo5ragn2b9rc4f5er3uwpzw65v0gipwvsgl0x99neckufhksnpzgzq1om40bcmuzebgcuw08u2fzvuswm3d4eqqvbw4qwpnhjtnpr4zn6y556vmgsyks5mgv6xc4fgnftla19b2vovpxwwfeiikq61snr78pblqpstevon4',
                username: '40wfarhimbvz6l0n082zhljbucsq4mewhary94a3z8u9of2cx104ygqhw8iv',
                remoteHost: 'ia7htlj06i4tlh9dbn098lemn67qayxhlgcukk5gnci5u50yz3pvaf0ibtqs7vvoa2efwnhg7q4c7wmts7r5px92v8a78xc6c9lt1s3vjarr8fc18apg5g8imexkeehyo7n7221cc1m0n161qyx470ygllpr04n2',
                remotePort: 9081441624,
                directory: '7xob6yphc1958hcjno5cd1f1zlpml17qnpouyr4so5qh0z53m4p38m0imuzio5j20dj5vqz4n2kaaemykkww6qoawmx2uco3yno7r2hm23yymp5majqoxsi1aoe69uew8wstesqoc5dcv4xsdt1qmn7vogbf7zb7rhf25hz2nrb0ph1c7gveka0pfzafz22g16zor77tuqiqbpagzsq5dlt4lrkw9ehzhd2smc54gb1xrxesboe44fjr0hg53j4k0ivg5m6m7kq7poz2bw1tiqz7w2d09k0onrhddlmup88vlvn35iods63viflh0gmvrzyi878m9jxhnej321urrunxv95tn0nrrv7d2sd37y62furs3gn8yibbhn0zzgcu9fbpgms08tu3555amt2niuvs9tixwn2epbt13jd4krfyzwyccvhagh49048d7f55fid21w8rigjf5bysnkmhdvl9v08qnztblt2sbxs6ypqsa45zlscxs5yk4r6nbe8tqxoj50scgr0pz1s6bbul9olu3hb7oi0i1kab6tug1xw5uvtneibnioeflwx8c1xv6igdntiizt4kk9ub5bs8jzs9by1bcgcgw5q4j3ewc5b25xrghursa22oegmfh4p936y4elhwttxzcl1a598y6i22ufv7qifazwl6udnqsh0r7inlt1lotqfhf7jf7bv1m9dxibii42rwwk325lgqemmuzopiikpbi34ch4uayf1rpv1jdg9va48rnuw8u5i3045dorsuuamgvhsst3nvkuvd91ocjdc1wl3f6kni0e0wzhsenct780jtbu6cr14zmxixki03jovl05ntbtf8u9728iut94tivzgoq4u76fzyn9uxib1ltyuftocyx3sowr51705kvjkt68fv5pnwhugrbq307er9lvvty147jkn68p0i0rh0o0c3xilvjkn26o2c9xm2yh4rnyqzdhij2upf02741ylhu2ueg6u3y00ur9uzmuy0adk1b76xveo3',
                fileSchema: 'xw2791f6hhm4zsdpzy3j1mxk42xl8bs4393398vs79wjnehrpd8ezjc2on2uurw724mz9tuc1bwzs20p88e0mh5o7vevf4otgvwkxvd9nvna2xbijskbebeduyl8aij0quoxasbxj0i3ypwvjhzld4rt1ssqhu7lwoe6kygu64317ktq951wrvvlmq6j1pt7d80rpehj6jpkxp3sjflndh2ez8wwkxha2tge21nnefptkt7uudib3i2k9rv9befu8q4v2o12ko1dco0ocgyi8njz26psklgme0gzcvtyccp9hhyvmucknvzpfl3zv32k9f6g0e8o30vqshfbp4b8g5p3rx5s6ujtoqe99g0j6aq3lmyusj9fhj6lq7lwfhnwpjq777nzoakhworo9ia2eb1ynepwjhgv8c70x7qjofnbhvsa1hla6g8ts78fhonxo3qexp7w4wd3rs393k22dwzv2q8c7odhndioz8m3ec11dqjcm7bav874p9lvhmtvt3vtnc9blv3xam53zv3fgi5aoqybj3yluccv5l1314dc5joa0remougolzr2edlkwuwqp4bmsmcrzkr2ixhqjolhn6jgvr1wrmcrhlmuex93fxannphp4riiihsulwd82jsh60gsnagj6uz1hz2s64xdlbm2v5y7qa9bfkvo4oyv8bwha9xr9v307k56omwha2moalwnv5hcf47hgde2f725y09n2y91rzvqp9j0afgr5w74xhut0mbrtiorqwhsqmozrgav4db1bqwebr4xejdqytxgi03s23orhb1pjn3f23l2d3ch4ngkymachlhigkddbj6vexkclsd7ss56eos4r2kxiv2tpeinxb5wql3of0o7rfx39mced2fetll5e8ptwtu2itqjqcdtlh3z3af10s4hu7vgh70ztr214p7msoeyvges5q1u7136xap5vgdelqkdv4sr4qb7kduo96i6afts7rdo7p6j5fzkg4tt1odvm6joq0rk1tpj7cjn',
                proxyHost: 'ceoa8a814obvtrzsulh3jl9xpa2nbpf8j5vtv6cmlyn5blfz1st55tp3e7zc',
                proxyPort: 9205517147,
                destination: 'klpwzr598u7e4u0r0n2tmw33beey57evzh6keoe7bu2tvbuwh6zb0e3zkh9gdc3l3uo9n07vhw45f79xswak79jwt9rxm36k0jdts9ru6jo2uxmeyusb3xi4z1vqgkl2gw3azwrsu4mypeld52lnx4xxg441gs07',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4b2jrweqglwy8h3uj7vu52x46a12nkuvz6jyz3xetisugizhals4i3xysqgx3ccql3k1gac6j15ka71jfb886s8pl5oha4cvl9mugi4xoim2khnp3635rtfxu4lgn3ccc3pxzflfd1x4uma0ywqofpm255en28f5',
                responsibleUserAccountName: '4dh9mcesogtb526a34l3e',
                lastChangeUserAccount: 'vv2amvqbgejsq5obio21',
                lastChangedAt: '2020-11-04 20:50:11',
                riInterfaceName: 'onvgnp69f3k0wfidbcwrolqlr6mkw10zejqpmbi4mscozaf4l2tu5mgdx685klfu7seea832rskplmudyyxkhmezbbrvqxkx1gku57sh66vha79w7epqi91ho5iivis4e3w504s7ju02wsax4dqfu4t4h6rpnvy7',
                riInterfaceNamespace: 'fr1xemq86hx6gb1d4nobkhndxnoui21m3yx643ekjqxq0ujikem66qacp5chiy3djci7tnkf64zgwroswgnqgo1e34abwj3ljf399o3gekqg9tlwkvbghxn26yjd39ihq0fq4zx0j98t3s3vv84u9u1eltc6e756',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '915eir14sb28ye30n74ka6l597eh07snjfmvu0qs',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'b2q6tm6j0afbkobmq20y43i5rh64h9w7ljs0hoqd57wdj7b1tn',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '9d4c2s76wja7ey7l7ooj',
                party: 'vl0v0q68awm2xjxh2x0qhu7grscgrfcbakk2vsmc7jh0hy6090z973f04ru943cvtpu0xoukg3qasm9t37nj1r1cy0bnjy6dvvf315thl5mmvlo5nfmtnr6p9vew66c6vrrd5r8odhipk4wp8cad6u320p273qcy',
                component: '6kjdpzuy8lcn7vmxgq7srmjbevo78pz7z7n146deg39qx72g85p8q37l6st5k11psnqze1aa0gznpbao861uabx8yksk76i3948bz4vjqli7h81pakktc5yea34z9mgoykozj8pyi4cog2wmdg1gib5x4mtauiz7',
                name: '11z8qzahqwz61z690rx9bzilzgym27is7lhy0qd2o609ypqj86lssf27349ajqefr97zsdj8vsfj8rxtmmjezhsydsn8jdfzw4cko15t8nrc7q0etcdebdat8hdafqcln6ux8dpr5m20pfole898ndwhp2hqy983',
                flowHash: '9g04ogy4ovew3x1cthv02oaxsv5r9fq8951ysnjj',
                flowParty: 'b6mkn3843maxhvp5tncjzurwpmbjdb4xdtdtrdyjig1c4xgzqzgisjnb6ny5l84jl7mnacbcj9sfy3gan8mkccszvrbhceipg59acwp6frmd69g1ifub1z1335s297p1ujcwyahr1hl6c9my43ce95gru6tr9g3d',
                flowReceiverParty: '0pqm494smdxqwpcuzfjqqb43ytts9sqheb6xu607x4yti1npubc5stof5xf78hw78y4yi6wdxjadz3vjsh27mn94n5riuf7svxsmhrvip2mcwhhfg0rsnl3s126zrpaplumd3dvpmqjw02la1mdh4p56ik1ma4ox',
                flowComponent: '8ltfkybqoot33doeeqfl0sfqtevmwabj4jpm4k89qanrqycl3x4wewks8lz9g7w31iml6qul359nk1wi31o5pcgh2c8cnoep0hkxxd6fkh3yf3ov9htnb8cecvij9u7spjui5yn3oe04ybmp5k5yz7lwgmpog9o7',
                flowReceiverComponent: 'bfjua9wao27cyb2oz3haqitubk1x0z93t4xmg00ciey6e2nme60ypp5c17lj4a9p9j3ns9x8emkjqu282quw0ncarprf72drkxx6baoxte1dvatleig30a1obkptik62muh7mzvyrmyoks3qgcr9vccxjk4i83xd',
                flowInterfaceName: 'xs5bjhrb9ptx9oq9gbw0b7p1ym3v39ge623265ql5tz3q5zoxbi8yt4z38ouz1c59wqdr1odoqpdpijtwguoyhyoqft2uzbv2lxz03f8rjvzxdqfwfvyh23pjsu0qq0fl675ksrxtgsvtb3tf4wapqarvjjzcy5i',
                flowInterfaceNamespace: 'hhl6vchmkz1ivdkg43z0rimr8i8jnwo09dg59kyw9qm9lwr4i2m2f8hwz8w1xaihmwhxcqdgm0zq70edwztqhzguicuh1im3i4p4buqnxi8cun8se45u9758m2ljikmqqev7hjl4gg5holui7ayb9yt5m4lczb26',
                version: 'mdhe08axsh4dpmnjwgxg',
                adapterType: 'obxt1pwvu7fkvvzwrp853vpwioy6yti4uqbdgn3a5r2ur0ogpbv731xm2dfk',
                direction: 'SENDER',
                transportProtocol: '07tcxmrw1ww4sy0ab3zuhga73lki5n4yk3yllgbazx275tvanr80weq7qomw',
                messageProtocol: '6vbxtqvmalcokmypw07qjjln4n0582s1e42wc9kv3b93yxrqsbvdy21234yd',
                adapterEngineName: 'ch2u6ylwwvzbtkfs9m33nrsiw7wzj62kvw46u8a5bf5nhbpxwbfzwlbbiofjnolepm44r19a3b7z0lzzvcou9uw0dbodelb0rsve6lfbcroe8352vca5u1pns1p7wpgxw2pmdoejyubgipzjhbjkg8hx6584vd5d',
                url: 'paau9m9aij37gl8zjoce4dj8qx3q314ndq428jeyhb401jr8f6jc9ahw6b0g8w8sw6x5gq7wz0xdsf8jesryere71gtdnf12nedohlluxsd5087w1m3lcx08nlcsnmbxvtnr1gceeiie04r88bkvklxt8lheibeurd39uq1fuoo2e8571bueun769l1drecgcseya6avq60lunognfxn1dzlv5lhtv1ayj3smo18e558onm2p83hhguemqldalm3nk84mk3v7igquin7y1w39bvazo54nh27lhen423vomm6dzxar03j7qro6014gn15',
                username: 'sqni4soy977cnmx38d430y3x13ktnnogqpi4ks9k0p2d06ehx9nd8gays7e5',
                remoteHost: 'x5myh9kxrnfba59c2124c6r94en4tsbuhow58d9xrxszp5vb0nwvocimyxvwq903dqrbjpnqtiy68r92c8ri5c5ycxq1aw0f8kmnn5dsc2l2ndb58gdl9t2vsvgqbabt05vwg43nkt1ho3scb5wmlrm7ht2r1r7h',
                remotePort: 2025369041,
                directory: 'qndaempsvmme61aadlh3whqbwqknwgoyt7bfxegugo3oxeovs5j3kh8ab4jtqftad3nrcj1z1df9zixz6igi3z8hhk1lirssnjm54kdsizqvckk8r1u8vkko6jakifgihvpgfifq4dvw1sh3cflwcada7membhedooyoiu6sivv1j9mom41y4e5hfipawor6wjavj395kkdjqgzbmgzbhco54wihornnijhp7h1mqkg1ritbpdk7tlpymwe0lydmonq5kx9nvx3csk91qup10s69pkjqmy7d885s9b8xz3496w6r1t1hiq6cc6gba5enmk8a0nwjny7ah9xkhos7an2pxw7q09qdwl03h3elq01a6ydqq2vev76k79tkx8bq7v3oqsf5dnv60oxa8qn9wqnv6et7y9h39k2rzcsqmswja0umaew1ykafiypb5urz4anjrz1f2qr74w8jfnc40isztlfybf69l77ymgso1blcd5a6louwgxshlittcm0l3p5oepe75o1jemymobfoeu1ovxn8b90mdsi02xa94qlbx4it40jqau7y1ios3hacahex1r7kluqwgyy40zl965vgwpb9e029guczl1c9emcxz719md795s9536rgq18d5a2jtt99rmlzhitysfrd3n6msbrhwq78p24ibzalniw6yzsjiakxn4iefh6v99sl6ssirsrvik0014yjqn91jkjjy7omg4ub06x3mrij8dxp4w19zkek88x0mz4ae7hzjbdjmfijzi75odb9xjybp4va789ctt2x6s20pebem0t0gdt39cb09u6lckah7apsshitg6oob7rjgfxy68ar98h21jbi8ogyjs7fkvv78sg4nv7rukljg2ck67ahtegch9a7u9kikoyjsmqas511pf4krz79v02d97syt1zultcfai7nkvoyib0ci4o1mfhodohkfbkq66xz9tgselx36mm5aza5rh2z16c4n3mr7pl0yaycm5xqudnf6nbryrsj',
                fileSchema: 'ciboish9sdqdh13on1cmdpg00p3ezb1czlywtyf6exrebzn88flfmakw2jjphu895vx1nejd0bec3bz3wavjd7mw0rzhm4r1jzg511lsh4h9yny87kh7xgrbpzatudghpndr3kgpyvh1zaq9bzihk19jcogvsox91k0y2faqbapgq9kh3sh8taeo001g7pad40emqdzuse63f5fmboti13np3hiom1sxxntt9kt9kz3d791lia4gpvciuf78hlzvhg9bs4ntt02du2l8dos1pgpz6mezdlp5f5omkkcb53891d6a5sxgtsdy3km8vv0flwn5n402vd82ibjwhi4lukm8ljygphnoq1v5m892cxsrd9h1qd3dode3mvacwgcehrwsyswsxppbznzj2ufojj3zqbp5tfofdb1mqkfosfdvwhq7zqmndm981mc2lmiq5g0et3hmndnklfp80mtolo44ufv0yjgczf61wmzf64pv3lpgp4uswk4env7v5xghzxcoqkjd8jfpv377rdi1z31ka11mbfx1lvsb700g2hmkoxou2b791v6i4qx35u2pmek0c7t0m1eovtm1v4e2djsj8biugaq491qpa9ek2dxjk7oghfbboqskul2fways7596epxlodb2ayy93eynm8luugo1q45q4f2j2bdz6evgzceripluqyzxor6ufail38am4fjyzxxy3qe2x606ztsj712vb647eloxco9d819rbyodf59qhnfwpa7z2zb7rekkrdxa7l0fqqyshjixrl48kybxvknuq36hgc7hgvqpr1i6jq16jaoh51urc47oz5nk0fpuhcmep5lv595zjsfgvcjx7qseuc9whvwfivwdzp7tpzvhygtlcrmxhv63ug0sabnxr50onin5xsdp2v16m7oeqjfls0az7hgc7vzjf1t5lveli1v9g1ht0b8hlfbu6jnuzmu6g5dso6bfmx2v2blj8b4p8mgl4xa3i9tnm8ng332k99f0qcywmkcd',
                proxyHost: '0dljo5a0et9b2vswpqp4sv6uxg6phhkdaoun3fu4n3ca3y5z8rvdyuygrhgz',
                proxyPort: 7669779958,
                destination: 'ljkc2cxluno3gnpku3uzu5zx0841bddah3tj0guo5y72f3sux06nc5lrkniogwaf35uyu7lypbbqoxiy9bxporq4ools7de7v4fvmytebo71rdhz87ob04jwjh6zb149dh9ho956xf6qqlkaw1hx5treln3qcbkn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'snyqzinss918i8gmv6otquuz1l4lxkc3qwthnkzm5gyu67ykfsye8sf83gt7rrkg1rbmrs99zga0i1x6dv7p44uwnkqibrco57xfm4mza9n3jayy0po6v7jf8cz7tmqyvk56fib9ypdf670x7itpxvo72qjdqvkf',
                responsibleUserAccountName: 'xzs8gh0y3otxzj634b61',
                lastChangeUserAccount: 'lrysdef5811cca7nau437',
                lastChangedAt: '2020-11-04 18:51:16',
                riInterfaceName: 'vza4jto729s47atsjbf6n1tjrfde7yy4eytgutbsyl3yz6i0mp7dt7hqx6esw9gqn4ohmec1k2ge8zui1lmmivm70kxy4hfnyozu1qbatxek6gz7b1knv9ipzpd58upzj6qzxqupmuexs6bin8iwgvc0anafwtzs',
                riInterfaceNamespace: 'xtl77wrx9zefjrx2z01mi11nregautzskfc7edw0zhirpk5p3nollgt81nkv11uqgs9ghna1qc5kd5g1hexfja6w8nf4yspk9ia8tgmj616wirvg0f2nvbet7e9s6e4aisb9xhft4z47allxye6wavh7cxzn22s3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '4bhq08ed3fb5cwni287nqfgpcyj0gpeo8dxkhh4i',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'cgkytjcrea8u02133qo8zb552atbqschuvadmzf8ugwcdrrrqy',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'i905iycfxpxn3ppbls9r',
                party: 'ofvt45cksndywkgyazsjch2fhrbc2aw5v6rpwlyh76omv28yen3juqfq5tgdnjymegr3zv3isto3b0suq2xpkd0xvjxzlmxijr26k2oq20j8tdjhgdjesyqmbic0h2xiycu1mqs93y3sxizcem7tllcw87h759vu',
                component: '6nkq24cue960sw7j70zzomrsl3grztxfv3xbki5lw7ugofiv2uabk8vssctvhd4m20tf72608dbc05ikta8b1bmwwcpmxi0jl2kib463munuxawwvwdy3kf4ho09feuxuzbwklkbgeiw2fmc8bh1jzz2wcj1nmyt',
                name: 'e8mk06ry3ivsh3vla2wqwczt5216l6d0jm55twk13v7g11hpk66fl6gjwurqixjyuivljv4cuardawrxnto9fzq3u1rqyhq3sckrqkqidrcxff1yupm0ncpl5qg6ibqwfoam0boi4q09x3uszrz11rdouyugsosi',
                flowHash: '75psceqbon4czwak54dltqt6flcxrryiuvob1i41',
                flowParty: 'wfqtryo5b02dhpk2ll8xgg357n48tbso57m00vfb6b4hgnwx78m4cs1ol5d5l69pwldnfgt21rsbx13zqtrna5ckbed3mek54n6s83w9tu0fh44hyaf1904au1f6sgnf8897cmb9xvkev2q8y0kzi1cqh8j7kb33',
                flowReceiverParty: 'my16igtanvwc3rh4w9b80w75q7u8x6fhmwx3x3jv7ocav73qo21ofbux72osinooi4edzhzeh10sowqg6wqhmfudw0ojy2fzskh36tdepy564csq1we2a4qfp1xuj08hmqm25yumj84qkw7t391etk4y3za5ajff',
                flowComponent: 'd8zslep8ts4zpzk2jyv10h6pnuf743nv6wh5tts6yrh8vog7tx8d4mialnum6sjn6k5gcqmxjfvs4at8n3jfr3slv6e680fke67k17mnkd3p125pxtpkrwmfdzpz27sdpt1ja9a8fa7m77yh5ywk1rbplas51c88',
                flowReceiverComponent: 'hlpzphkjl0ewlt6rwyjzv7nr87i0xteyd5tuilbxpaji1p8asojxvc45416wjrgc07xbgqngqhtzjec0pxsc2y5mqoh6773q60wai1dz3ve5teqlqk694961soq9d5hqoyissf5tdhe0w8r1u4c0wk63ijk962on',
                flowInterfaceName: 'k7xvc9rnndh3cqovm4z9kntrt420d5zkb2vgoi7pot9hmjg6nq0qs53f8ueef2l4nvxbjsttchcjtqp0c7j4q6fsmw1uvs0rffa3ew1q74x0emzqs7injic8jovh93oe3ec2dogkftod7z94u71dfkzt97wuplra',
                flowInterfaceNamespace: '8wr9zsyy4oc9ncim0ww4n8jpiem0m3mgth0movgcmn7ogfnqar801efa51i8phpzign0k2l2cmo6xl524kretu364p2ky97qutak3fv4wb4jm68i3eym9hsl4213z8gmoj3yf1qfb8q7isd0dlje7oaor6gw371i',
                version: 'chdgykgnv6toehwu0hbe',
                adapterType: 'q89x7l4htup4rvgonyrpwp1xxl6yi7n5bsd1w3w76fv1grstz3dkq98juuh7',
                direction: 'RECEIVER',
                transportProtocol: 'wvzs8yhf99ocmvrw5y29p1tuu6irpmg8cha9vnvgdnt9lay03daupzkw92ic',
                messageProtocol: 'ru50rc33u7b81s8afebc44fb4u701zhjts6gj63uuljddmquwdz4h1w7ger0',
                adapterEngineName: 'dxjexlbbf0hgecl7szqjfctq78o2fyodnrp6gm32qfiq737t9axfuddgkobhzsu3upyft0ihi5bj8v9yovavq0bjfayimcehnerlh8xqy0oxqv21x13x194h60h2s8y2jimbgjx01aq53b0nagrj3o7kaefctjc0',
                url: '0fpinrxoaz4svp8obpkyfgc0kgn8pezmufnesw9mudd8w0fkvk2v8z58fa127jvdvvwc09tczjqsyyed9w4bjun43ua76bk8s0rm3e9dkk864l7ipoylyjoijmvu8ym7ltqvjy98idleb325vc016dsxjh035nomp75u1rt8kw0zrare1pu09uuxct90p5lp6iid0vvyncpx6yzvmfede9g9b1mwqxtcwf42hlfqck6yfd6xx7t88pkvljcweoa4fx8bicz39cfrv2pnne0odthkotjhd9rytp7pi4ap6klwm8kkl8iwhswjptxh93js',
                username: '45krfbapi0qxm3xeu6jwjp06o5jlbi975jpaivum8ll6fmeo4unsxy5qwzab',
                remoteHost: 'wamh2qelwtmthprdk6fu0er1qj1wi06j41mnfe3knm82d2jcwvckz4gr2sj0u4f7x2xniktmruog25y79tsvolvfkk2pk8463pna9t6eucwpqyq8qdmr7kcidkcobmniluuh633m6vsxfx5drwt1sjqm32g8rf9d',
                remotePort: 1190496823,
                directory: 'u1jascasclr72ll8pr0s7qt3ejfrnwrd779jlw6xab39vtoy3eb9tek9pitvp5li3jbbivz9oqg2xjz438jn25ly1hq20dppfyd7ymjz66sw1d9mvic0if13757t898h3dhwihfqg98ynkrx2ex2yptvp7en6drznxolm72na8uebfbpfp5hynf27f3t1esiyifuum6gjgmx2bkse12n0f9ifhbubw0art89uzdnagflx7nxmhdid40scehe8ip3o8us66v7thk16bwaws6p9p9x923gsue8i8f642f6kjluuxi2xoepjrdsbcqodezo41eah0zidy7dbactfjdy8v8fic6hhy012rppg2icziult9inz34jauubnozy9zwqj3yvuitx5029s5yxggexuv4uo9zk52r7jq1jnwnczufau3f4orube7ss0bm7mlrkbq9slam1ut7bp288985j46wg3afi9wwmbw09gq9638a1dxbty8hlv72bwe5inwcf8zpk8oupcohd5qhmmu2ay3q0umlem42yx1t5yecffp0c11ifcccs4f5hfijj52g6sqrr26dudv3t6wpozzy0ac7o9ldxfuwk7as78qp738nv4uxm9ps5x2tpv40vpp1s8b7mcdo1ro8ao6chk1td9ss9aqc6e3w0qxlgcb2zwnbi5tzwohrt3v08tbuukygunqx3idwbe71h4d2fmg0auryfiydl4h153bb2dszejh49c8t2wc6wg3lw1ltcvb23ncmv3iez839i6lpte3y0wmkg2b7j9w58pyd3ltr4ibzx3eg5duphy6ypm4w8elqmcm36n14gqd1kqh785d58ey1kcusbrg9abh2clw3sbxlzq5vzpkoo320f16niw67f7yizegebvr5aa4soewfgocvnt6zohc5dywrza232dxotahs2e2i8ntl58goza9ci2w8wvxcpjbgwyymkkfgv8c1q53oh2b7ehcrd5po6b54gt8owkt4mzracuvsnbb1x',
                fileSchema: '1c2wnxbqx2ju3ag1eccf9sq7eq4vias7m438omqhsbryigd1s29usp21y6u1ihce9xm08eh2kgrql4uso1wl30pdny5mmutpuc9vkbl8qv2xfzjbcqgs6872vzjg7kzghx1a0wltw8zl815hezhxp3n6cr5wm86mntv4wq72584gw4xnav17uubii5mlh3c0ij75ltmshgbmp0eoa7obcncs07gle6sdah4cu0mb3fcpnski9itvda6zm1x4zqnvj25lmduz6z9j1mleik5vz545qj11r5097zqkxuap2voqwrfa9f23rfgaj3meuevoygzc3s9855py197erotaho3u8cd3xfj3ddpe3wnmrslpzlljymnv3pc1dhm4pq3fsr2t6emzqvwicggslaz5yrhuk2ez94xc558vxzqthwyboxon2mxs9nxacie55wbt7fwd5p17hdng2jf9xb5xxbftdt39s2ry6ehtmpsod4atxqhtiuazphmy9g1xacqqkjryukmmjcx2um93w7tb89dxdwfq0sc2vqcczhw8a2z9y0u0d041e3z0szj9cx298btjxnrzv7el2lrkl1jt7b8scywp51h4xm79y7k0vrysf2xys6lqtly54wbtzr2oxkctz10rcbejaykdba97e4mwfn99g0qbvucm9pcsxa3d79pkxi50hzilb6mbbokor6znzzd5jhqo4m5a4fy4lwojq10rgt872u64g5tzxjzcwnn6mg3qeoov6q0e5mzupux1mgizuxgmvx69mr26rkjx418pzgkq4mutz98rhpn4dgm3igaz749vij3v6tldo27y2yc1fant3pcd4bamu4te30kuz8tg34zvua26v8gkxkmequ6z58h7v818tnimrj3dj1rpor91wy43ylxckw38p408gjhz1ygnoc4wznmnk7a3b6h8vj688mfrjp3rxm05k0d2t27qwvnqkykynzeectfpip9h4du6fq48ydqemvkymezjhfviyz9nbdx0',
                proxyHost: 'usnsyrie0gd0tchqey8eqhd3uj9ccktteb6z13u4ejnqchse6pimf7hg6lmf',
                proxyPort: 9805770388,
                destination: 'y2vvawqrzeeqg1rejfur7kjst2q8gxvooypfzqaw8aq8kikum3gum12vns7jqpricnu2tkx0x36joeblhopvjxlbdexg4me1tzpc7iob9zjgtkobqe2jx8k2yylzek824agfhsbknkkihux0jt2vnhbqs523qwmn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xlvhddw9e4tuqxj59qctk69ob3dlyvk52jqtgy3jinmvfsow0ip93w15nkdiwen4bfuk6zby2atx8903e872ej4dirubaxrvc1hrm97lrz9578mhoyz5pmjjf1ypy8qp1qeof5uk12tsrch35uh9mpoldg9qw77s',
                responsibleUserAccountName: 'gcvipcwdzxce8z4vmvjz',
                lastChangeUserAccount: '5kq29wwkyce269rukh1w',
                lastChangedAt: '2020-11-04 17:20:37',
                riInterfaceName: 'o5nk21m670pifozbmxx3v64xn0e7i446hxu8h69cgh6dh0nzzd16ziinq2bhvi7kamwhhpg36p9pyswk1oz3jsbiaynslwd07k5w8165unr4r5a4z7nw32dzs7kash6nwjvzns7s24m2ql8ewzv9f2mggq2j5bosv',
                riInterfaceNamespace: 'gh8idrgi395ihvcin0dprxkw3iqal4r3o7lnfbpz40x2zs7gnw0uip9r7jzzzsr3ho3xmisx2ehw7tms0eev38i1tlxmrfetjtlql2njrke4oqwc4e8f182hqqpfs5h77hnxyr9xefmejl19qlhseqkwm1fr6lf7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'l7dny06t6n7sbsg9lbvx7hfgeex6u9qax63isyos',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'bm88lwhf7nxuhn8xkkn84m8k3quijv08sa57v4j5ff7evhiwm6',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'gllisqzoy0550uqpmwz5',
                party: '4ewv2hmjftefja0krh5toe6cx1kgift5qpfwxxz00y7hbzyqwvog4qhsc8ipnxgo0ok7upcuvlgtny8t9xxn12bhx16u8lflquty84abvfak84r7bemqazc08d9dqqeiwssm9x98yd3qbls3bstiwah89lpfkwmv',
                component: 'v9ivtjhg9ip9x90sbwbu3023efdxs9jk1s25wizj7sxw8e83vi4ckie80233wnfvmvtft6fsrvneblvdex2r4pi22o05m087ijx3mv7z8y3zmjprogsq94024tzi8e702gpvfngr3wm99njjler6dwousrjdqqsw',
                name: 'af6b21x0dacjtmrauxpvxc7o420ld52africas3kpiek6gp0xz76d0ta4phdinyh9hfyumorunwon4jtsawilglqd8lp41lkzxkonrwhh0fnd7sxilutm5xkwrcv1jq8qstwmdf2fvh0vb8sgx39n3sogimjmyn2',
                flowHash: 'fcq4q4ml8ehyuuxcv5rwv5mpoyhfbgo06g1p35o1',
                flowParty: 'qgqc81i5k5bx2stwod95svab2zcg4ini8qi449elwxl7sq8rpg10k62ywgfxa0hui61kilih83h22abv4bjwd2z6elt6m8q19h5yjlsgybt31azacq0x09wdhw67pywvzbpgf3xe0e3mqd72w1m5yalvvg9h3q7g',
                flowReceiverParty: 'h44s66m1qfo23u2cdrr4myn1nuvu0wi6qtjrmw81723pkuo3ui2nocr64gs06uhimyimbwgtcjcexia5u9p9i67x94niu8jynf30p583l1qnl839hdqif6kn6766u3indqmnu0yxsurmbpo2l62shbwg1cmdxfs6',
                flowComponent: 'vy7d2hent2mjq50lc534n9m5etdjk0w7x9u2ecxkbu043c2c99n4yyyf4172va6xb404l009h9iuvdnmv0nzkdxphskwrznyzudvdbjvirnf16pujae0m5eb1tirgkdqo96qvlo5kfrorblngcvkppm91063d9p7',
                flowReceiverComponent: 's7dmr18yky555av18rruek7e3ytaryxxknzk397qdr2f9icfarci8hw7sum5gvctbsoq8trr1c4eknmln81m47o5rn953tv67frk28ou53x0ysf0s9dlxmpy5emi0xl6ogrggv1onvxm8z47hq3lm38jy1f93t5v',
                flowInterfaceName: '01ho2vqjdzuqxnc3izvxzg7evffvrg1ji0py8hezfj3nwgwx867e0s76j7na2vh4ts61f33nyiiy0j7vu3c0rw2br2hl0v4yoatdn6ng4wkt09g5mirscqljow6otm2z4ila6ueobtiqmge1n4p0ptmmm4qbtl6y',
                flowInterfaceNamespace: '4adf7wio6xh8kf8og3wic4cdr1d8ais71e3yd3tocdwdh88fe21e5zrtmzdj9iljmrvlmpkuv44eqht0aso2waq6b6hwzl8z6nlkuxef6ur8xvk30la5i2i1mu7j41tq8zx0lj5tou8rvtbirucsybjx0auin699',
                version: 'yyzy695u3rqqool4szay',
                adapterType: 'b9mn7qr22n8xecupr313r5pv5xqesxc7s4w5f4hm3t847mnjgh3phjggvu2a',
                direction: 'SENDER',
                transportProtocol: 'u99kd176eyxmqv0ozqgx2q7bxu0t5qtjunubxiqwg8luxsckk5kmlvy63119',
                messageProtocol: 'xjxytm7ug57asrx6pqfumaqrs3lz33d2xst7u3y8zwu8bucaf6c6lbbvj2ri',
                adapterEngineName: 'inafw2z7v696qsbsil5f77y5f46yykbnbs0lv4s0y6rjz0tek6y4eau3fihh5p4tr0fyvbaxsyr7vm7pzxfvxwaca6cw2mauuy5xh8q0s8l83uzj8ybh54lbiindv54bb5h9ldaq1awpifmlwbzz683v78epuy5z',
                url: 'mmpmj06bgnb1kbq3jbi7vyhn25vr4rskky8b1sdylp8iowg25kto138cfduolmqo2coypffeidulloq0b4nu3eevfncg2m1gfb522f8kld9l5cs2noqvk8k3gifb3cc4hygzo8v6jepwur8zsxa6v36tmznsfwi46ws95tu8g5vd9qlaecoifrnaeukvk2ycyw371d2p8fw4gw4rm8h83qp955ii3xp8seifwhdavwpo3o4vl4109ulugposv6m4ecinjpaywq62876ocjenp3mlk5nn8eotjeb6cqm5g9d4wo0mqe5u0095vol87xxb',
                username: '5uogl6elaj7j7cnnspu94g24b1r5szlii4mdrqqa48nt66tpndexxmiwd242',
                remoteHost: 'hlmrii9tda729vujz4v3j208k9pwef19dwoif76dyfadsqmcm27onakk711jkee67tbz5i72ubxi7e3yfejkfp2jnihfq1yelevoopa19ql9nwjpm6i81jir7kevofehwhocwphvbhr1vyeg5rnncjdtkslw3nfs',
                remotePort: 7310960002,
                directory: 'xd5nab11bmov0v8xhh0g0x56rn3zponu9j98tt3mrnm2mhtsqjtugzd647qr4j5h7vqg3bxryfawidmr2s0i4hw949jg2hvy7btm06898k5y75gaydj3ox5z4ofeu7ekbx0qv8s5axl91q5z7itbj6ivduajbs36uf0zuvb5j730tkmalf4kkiholosed6vyt5ngt587v2m8fk6o1n8k944diowqujij43yzv8hfacnokrze4olaz72ngxnwkhd98gg2klv1u7316hkf0kztkt1ygajnua5h9jze3miq8hnpqaycjww1on876lk9761szkir56apimf5cowal4edzeavzyeornjez6vt1evgrk0d4amxxe8ur411yqam389fa6ag0vlmuz4d5pk3uyxctrpif4wrk5hek2bj318s5kzditw9qjj5kirjqjobuhsurvvusokekebx615kd1hrlotl23rtj7hujy6ax8htj05b9ar6x4wd380xw2ne146qplv7dbczvisftfwep4t5vwp2t97n5uwy930ritozx79bwt5kpagrynxcp82pwi98mh9aj77v4ac79o2k1k24l3nl30kgg3qelsmqga0e71hgjpe6o77dhn1shb3nmgbscgf1pd2ipn8n91s5j17ubvnnmtgum1cddcshe934w7b0ocb4cf67zfhudt59oi3tzllnl33w6cvs2ovq1jrb28tky0tqghjl9ialucip1asxjxd787xzmstjk022qvedc9hd298ka0kk0elqw8po9xywbopkaofnhffaasj5nzjuv0jjt2tzf541gmybqfs7bfhq248pidcxqigp2yxfhqsqbi6xo8kyemm4iqr1xowckdz1118htya7tqafskm5t7ouo2e9w1tlizwbwhdbywqpou5swfqfpx1krnmtlb4wuxoc4zxtewpvmwf7qzt5bhed3i6sotc7grdud74880em00sojoib4y1tbf3h4sa1einiuos1mkxu9i7e9aeb',
                fileSchema: 'o95of8p9wnrducfxyd1qj7nnjv4c0ynxqvtzr6ywkxmt1vpifa0zqfufk4g88or9swnb3gzd84w7pczlmiilsn0g6694jx79rsfgiajuia00iyikkytf9mj438m3zftj78879db14x4hgyvbyr3x1m5np96y4mzl73z730a6ym8lmrv4blked5fcmh1kbpclsqfq2tzy5jzvnjw241wsxof1utjmqsq02hzbyif2atpoli275jaipvo17n11qd63cldkusmk0eaosccwb36uszkn2uqiz3l92jwjxkzcfg93m93t8xd6g75pl2xi9jpc3j0w4499fzbro5q9a3k7bzvt3cc4t0rwen57wlqb0h2oylnqmusoo1cnc3rjtbzcl2gow34qbjdxafqyy96ldlu629wbuyvzq4m8iq8zcaatovowekk9wvjkb8exex2n6in6cqz47s0t1ub4395ymnmsc5pzu3lelmb04t90cazamnruw800vtyjf37x2xptxe64fzikbev8rqjl0d990lfmcn2z0ssvcyupvrjoo68asnn9i50x5lwhcxcb3jc4rxd5c6bvoyh2qelxyxixi8j8ohcfmskpxq4sq93ln3z1ezsuk8yb9pw2a1jhpratgoqp09mwgig8ox9ptv0erqk9fvifpsk7q7jjvmkocbvnn2rexva9i9id1ojetqzv21al63dcagfxyp3i9o6rhexi4s5dnanty81ow6v9q1kyfyluegu2hleu3lbne1dfclcvtozo2cno8r9r5o0bayrjdvk9oqch2e8l68qa0mvk10h84uclj1pqs1sz8zxiz8wjw2lis0lytskro2vpp3wf90ez7gq8q4d25nxsj2a3babbz5aedl5wiwn5bzw5onqbyg7d1kj7w0ifhg0ht9pxng8xor3xpltteflq6p8aelvgzetvt89ghgac4bil6u6u2b5ad2rkzdcsndy2v749yrcbb2007waadcsw3uorkv1360wvhsy1pslkkfn2',
                proxyHost: 'q1prx0gq314dyfdmffwc68fzw1uplhqbayi1jt9ps7nawngw1ikkjwzxeu6b',
                proxyPort: 1926615420,
                destination: '8koy7x0lulqem3wu0t76kia0p3actovupayjm35lut3nugmn21i19wa9ll2k6dxr3c27s33dnibzu0j0bdcx5xpydz2izsxwpmpfx3xise8lixbyfbwudp5r2r587rq4kpdjrz7il5fvokuduu8v3ngcgfmbudus',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wkqog8z5jpov7vwy5hkliych40vx2r6sbhmi4dzve380q06wxcdfay9m3r081hya97j5wcpqwtdjw9uzli2s9q0gcshjf3cuynezr189j0f4gafis1l3tgerlrrr80l486wducvi7ryo2r4mjebvk26ylzcosrs8',
                responsibleUserAccountName: 'p9aq64mwbck8y3bnfgtq',
                lastChangeUserAccount: 'bf3okrz5wuylgf3y3t8n',
                lastChangedAt: '2020-11-04 17:56:42',
                riInterfaceName: '1jlytvo4jhiubz7y9i47aw9643c75eujv3e395nkuyg8qr4woo0zv813tsgmoairus03l2msy1r160iyuaih67s7l4h8mpyfatu30g16hw704kmdan6y6s4lye81zcvm3oc0rcmzt4zaiprj4uhbf0ibdepxxk5y',
                riInterfaceNamespace: '7b0fcpfisuq2of0qr4iysu5c6j8rql9zu8l75uswpha4bquiasv2tbjij1gsxlzfl7xccbpaix3cb9640bojpmheduhj30kb532mdoa8n6brdc3naebeutelezlxpyyd4feamxdggrl9nxf3anzaydzt5twg8yct3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    

    

    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'b3seme3pla8risv8m6r4uvrkwiq2wk8l1spkdqb6',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'snxk26kpfkyulwf5sgfpgwr47neyitvwlezoktxshrbkloce20',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'i3x212ebfd6vftu61nji',
                party: 'j4821hecmfvxg2dpluihyxtif6es98gxhsg40mzxzz7fnzbw0klglgqsccs4t44giyeyqk93xxpvcivt3hn8soi5z5tq6fxrmedydcnfkecns3yboc71na4diu326pak8d2p6tnpjnzpsdnam7ekn7yaxa3ldqqi',
                component: '408mgk2p4up4wvj2yjq5ea0b0vbhgixtfh9muepe7kh322ciux1ziyt862yhicacgyf0nqy9qjz1xquem5z9g3t3yjgnvse15xcz4glkxp6x39bcjxbbd17afq5na6ji7n40525a9s3i8gjlgi5c4zgak3fgyqb2',
                name: 'a0bm5nblzbj8h94c5cxaxfmr8jwcaqf8i1s8cm4cv70qsgbunjcs6tlhunuzilqtrjh6r1xc43lx1znk7hum6xzo6zh41j187fjs0xkcq6jbfzkvk3xya00qyvfvsnusmigmbwns82q4l8c3xus0hi0d3f31ejte',
                flowHash: 'geegj76416kytw9io0qhd395crzt2mpd35hi68iy',
                flowParty: 'o54rvm0nnq7gzj2asycehr2oy01fspjohmum2gwjkh9ymjw01z3cccj3u32zlxn7djfamczf6wkdrf1pf3pwe6lb9orfxh4l4cet6x5b37yhevkubukr7vsu8tcu6sqglgq2c4sj7r7ajewdb2vg3nmfqiwrynsj',
                flowReceiverParty: 'e1w3tkz4v2yszueqoen1blyehy2t2fbtvft2s1680zfj5mjb2kspjcgc8traazpz243kciyv2q0uvn4i8ryhrig30k01qzqjr9a4vz4rzif9f4znbq81zbyh7hf35v0676r8t607sgk8637isydi0w93qampx8rh',
                flowComponent: 'jlx2bbsje4hroxj69695hln5yh7zpt3sid3lyqvcntiw0zi4feu5orm1oh0bcq0odh2myjhaxcowx2q6ugsvyitrw8xnple8r1m7ietddmsdwhbsh7n72k9ev2skmlil96vt3f6k23uyc0z95yt8dh0eqqkx028s',
                flowReceiverComponent: 'q710bwd2yzhkc1yvky9opwvckyk6sh08o3mqn036flclq1lw6w4q2eqx7jwfyoki52ffhepzkuqli4mjjrfhqw0lyoewwy75m1t40lm2xyy4u964atjxhfm6kkl54jkqkw8kpvohicq04ka2qav8uc9itw13zjtk',
                flowInterfaceName: 'lth0zjtm0cgfsyufhkc1u8ffwf2am8sr6e2lv22dqofllz0acx8cbovf06lz5pmmiffv4ysvcb5brov53omtp1ak5ayjs94aub1bvsp890gwtawr5nz0rbac5obak7svq5n7u56kx52cqsfoshwdcsaqbqd5hp49',
                flowInterfaceNamespace: '57h8priml4afdopehokho4xce6s22t53yo2cji5u5hy248tahwoquwvfarhkcfuk9dymj79x4bbk22dplbzjbc5qvxne7b80b61a8gh2tbmlz1776186w46q9lal6lx08ttzloihwl0xns35nl6qtcwpf30qkey6',
                version: '0uxs6rweyf4z98b1e5qm',
                adapterType: 'v647z8jts56rqpjxtn6l8vyn4izxsk85v8bo9kqmogigjxvjv63r9nqz5ydo',
                direction: 'SENDER',
                transportProtocol: '3x2n90gmus0z1407pqv84i1ch73x9u4tyhj4b6jwfoes5becl9805njpuccn',
                messageProtocol: '6a94jxwam3gu3f58vrxhpwmonbwo9wgxylucqkrwjnhlgpnq4cq9kxlq4cg4',
                adapterEngineName: 'yzsf4el5kmc9e9pjbaaz81oh5ot910to7stuis48ac5si7r0p5awo22td8q78r6cvvqsnxbiunnkfv4b85uyp8j2ggcu11r5pg0gifbplmn1rwddociybqdmz6w2o7y3koj3os6qr9aemtx7sdky49oachaafcet',
                url: 'etetnsmw0r8cxlzm6fk7f4dhgjegvemwhe6qgdwnra50x6qpi00p8z4ue46pknw8ihnjiokla071f74jkt9qvr066qv5n2g2aa633rmfegjqt9d240ht32qtuejgzr1a5z92i9de04hpwg5a7qu3o5cwf6io0runw4uqp6kn32opnwsgmzv3hstesbylgwpbne0wzsi5fuva0rpbtg6oaxp2l07gaz57ubueloo2x60x3azkw5ydwpx6hzli6w4wjhbvu6oabzxk4hfhxlky45h6t03gw1dkucrfstpp0l2zlmq2mxpfikqnapjj4see',
                username: '1379advtxrl91uivgqgimuxiz61cn2x2o2v59g6rhm7c8i65ehmlode9west',
                remoteHost: 'brmzlj8yhh46ukuehwt4kn49yi1cqzlp88pcprxwp9ssad1aysbf1dsk7zos0zryiinsw26olhwz1hxa95z9unpdoo8h87jsgkjp45jj2zk0cmsaynxofxe38zdg7nxckel1h69ablhk8rq0c33c66793bi76tur',
                remotePort: -9,
                directory: 'g6g8uwoxvh1dt2679lrsbprp4do270ktctrjak5a31xm99kby8w3hlzslmzk8vzgpca6muc8i7baptv4cwy2g4sqy2hspepf4u080p8qk5h1ybx0l2vk8doui378e40ruqcu3hokgdbxje9r9qfzricwj4goacwi9ss0zl6cj6qoa0w6xe7wbzt5tjudh0rydg4fxxnm5hn8c0zixufw3bzf7i9rgpq0ovjuhiyragp0dzivqbph6pyid5pmusww24e53iyd0xopkbqwq28c9hewzeedl12870vyqpzv7tevopwt9gdbjuy3kapgwpuiyzs1xee2acog76rzx8kzzgi0thrdocxa9swu0fmrte1wos5l5oc0ofrf6b603jqbutlzyrxl67qg5qenxbgm89dkb2rl460o0iid3rfek7iky58zxrht64a3vp1jzahvdm7ox0lq9mv4jyxtilo8vh97wnr7uj8muot9etyf8aknig0yswzu27d9vlfmpdeiwcyrtngq4pfj6ruo37rjjze5ftqd625ldi9gryilg90lcjourgpqzb4bxzzm3wbt0y4p5rr659j6iufwtg8qaa40ml8h0o39c2ejz3povmz7ohjcarydm71y91cu6195ykkx1pibvmctg8hfff4bc81s2cdvp3ja7euap32g7mq99f6z8tvzscavx3qaboppc3zz3pl8lbetu8imu3lbqqknaompzuv8gqjbv3oaev0bk2hxt92pw5bqanstgbsbvkyu2v1ormlvt3shy4bwgebkbpapkf5viaur1vcqn4c0zql7pa1et8bpx5dqi427e0bqdiijl3hl86e0ut8qpwa4jvxlk92u7ean2as18h2f1br8tho6xz8jirknjgm9uhxqehfxdvv50wnczsz698dgrautudxh1ib3jkptpkmy0tj8xuv6qcfitqm18y47vu9jn9ynnfdcm1hz9bwyl1857kds64c01hwaxxe1xih7dn125778sne6bovduoxu',
                fileSchema: 'f2hqnfayswl1x2n5ffcn1fo8de1tgbfxrzmryb1ikb3rvx6zvm4sgl7jq9f15rwpb6sl5re2hay1ha58u53sdh8fnlo2xzu9zl4jrhrzsim0ls0j0imitw0x7s4l2ewsxu0zcz45leslslag8v6klebgauxrguw7hys659u7pa9w0376rw1ypvevgtx5dy8147aghpmseh86xh8mxiciu0dqjsci8nccra39bnqc5qogowf2hsmn72z4k2ulz90jxstr5hb1y072hdudhhtpabptknkgfmzd57rd1jqi7dxrnber6qjofdlqqlvbd4rw9r5f3cls2wthhht81rctal8mj0zn3sl827zj32e95r63tjnzi9rgze7fxopqqxvta2or3p5e58og7efztmcfgf0tzau5b3pfu79xwl0fzatkpsc6f27elhojujf6tffuq5j8slcvwewz5xme3wb5fjv1boad0nsl78dnkto5mt7g8yz6cph16zedcr7aisr2wx19w1olo0qwd1ega2qqs1fkjynw8cpo14wg0y9e8vk7h17iekweqrkkie2045rao4e2lq9zxd5sdl98cobjzqoi8unb9pzdp5h50dekg5xmplt032z7rcfgx7r04iilhq6dkxqn6e8n0hsowb9z9u64zypxez0xq5crfderd6q9bdm8vrjvh8p5hdqgyr3vmfza8x49zu9c8brc0zyg9y0mtagnupsiszbukobac4j3trosk2uiaswkv9sm7col3r97taa4locoqnev97c865795fcyzxklxnd28r0g1q7wxtgirg95us1plfgr4xyikaztk1livxifav4cu6f40r7m5kd9xtjwgo0v3elxzhnc5v4vvvcfp3qo5a08t5b96oh1cum32lycdc7y6h931oudjsa6zkvma4j0e215kku89g8bko6u93lbab3djuxtfk47i861eiwgov1sb6527lqnidi0sjhkkctpsm8pi2ix60jfretn7qfaakhcq3gk',
                proxyHost: 'wce05p87n01ign6x6ko9gxdi7eokzf0goaptl7lkixopw6nlfmv0kz11lcwa',
                proxyPort: 9917173637,
                destination: '7hk4azn9l18s1y3sbub9rynwwlfire4tse4psfkaekbysqylb42pyq0dmrdgu0wcl2jro3bbz5qch5igoxabc7t8imhaljs71l57rkdgsjkyhdarb3fi7n2rldesfxnuxe67brbicmv15xhrwnbs22syednhm51q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'l8vqitp12mb138d3pyi5m3zff2y56lxiqthnqmz41bee3so4zqma9aitgo568vx79mtc9l51d0gpp606q7aycjykos0uk40jq7ycy8kpaudq5folahlaskjzp7x8v3steqc8x3rdosokvyq5k21k2hjvy6jzzsuj',
                responsibleUserAccountName: 'jpu0gknhlqlwl1p0xmap',
                lastChangeUserAccount: 'ykextt3wbqcs97zqv36b',
                lastChangedAt: '2020-11-04 19:53:50',
                riInterfaceName: 'bqhu1kykx9qcnbpb0eow3az3lpxndmt2q0ltyvfkqa72v2kyn6bb17ehogvd73fd9piqu0o61x38u80cl46d24ep9o00utdcnx87cgaojhnkhwwczn0fhid4jz1zusjosbqobatut1tf2fte9p1tlf2gdty9bcq6',
                riInterfaceNamespace: 'ohi4lv77n45zpzruneopt7tpikcnr4cxtzpp8j5necqwgg2eiek02xb1lkmywjcr9ga7e7f63leobuihrg4537xe3pp8d4bp8g1b7p0a0ew848v1ejbyf6ts4zlc8j7lzg1ynquq92r25nqfh1yz93l7k335mbfq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '9ag9916hzle2jgxd4ytw0h3mlwa05qocuwybukp1',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'klqyj3li16phpvfqacvx10gwy9blvoh8no6mt1nfaw7goevrug',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'tu89nz41jaqudxespt1s',
                party: '13hmnrvn2zfblq4s5t94rnowbo07a2mk9s6zdpemfwlwr1o5xt722k1v0t6yt84vtwpva8c5fy2upte3v6c9emecebqyu8wfuyxso3kzn6oux7kv9f5qkzh56w07064kqb05keqlsmgku52xrkmitsa2xzadq4i3',
                component: '97n3jo5bb6n8gek1xt9v5ukve2dwivxpkzh3xvn6et9h79n87jet8bsttxx84ctz9c5p16kc7h46m53bxmyzdu28v9znswkccf8jglmktsog0xhe1o0z69lyafpk098ud1yy9r6ext8mqnntwjm1y1v9v550z1rz',
                name: '25d5bh4dunrf271yic6hilesmobqg5bk5dhxbcxho6f9p96awpb2fc72swu75x0sscivb63qemlvc1vjs743893bwecr51saom39nze7psmye8q7p2qszzanpgsl1yhjuk28ugpbhzd6oh0txsz1imdbk8pagdn2',
                flowHash: '00jjmgbukc7rlq5kb5lrpce633wamz34p5rg8x0g',
                flowParty: 'ydp6476oa7on2p9na6ok5u88lvd0t1kkosjz76aedd4e0mhy5wtcvj8bqkbzoba2r39e701q5p2kt5at71cn51qcebawh3kg3uirmro5b9m79a6awy5njv7qn13m971nqi4e7ihsl1u97ygda2egq4lkj9w45x8o',
                flowReceiverParty: 'tj8wxrgd5z335ppmao624clgljn4vwncml73kyr29e22wqyibhhrd4hwe8ojgulkyrgw1bg9gstwjqr9z3fy9df5zarsi93q44lx98mohwwon5i07ym7hyr8b2pcxops47pewqlmdl4ro8nt5eaww9z6bf6yrfnn',
                flowComponent: '4f3ranatoguuwnb99cbfnwxi4fazxwce8f4l7pobh105nxwwktf8cvpk8nmnvy2vmgprqwvgpoep7ayt5e4g8jgxgjr12p0o3xswg2t2ix4e0rjigdpw8vwz9rwnt6j6ajtqjenm9bkse8yywoq8wq8ytznx04s5',
                flowReceiverComponent: '5rhzbykfhg188a8vz4e0aekenprq2atr0c0nhbznk8x4b2wbbldxadkwcxk7vzqsun43qkglj04s46ksaclorz9741mexmci9u984qkv7cnqnykyj7pv6ooaxkx8s62lcd7f64expcyyddnbpo8x6f1ww7gjh942',
                flowInterfaceName: 'gw44t1pwkf3e5k3fy38gxeuiariz7getpx9n64888j1fagen4qfh7pefvhe7422zr4cgu0qupcdwwutx9n6qka0ge4a4pycqh0rx6xj1qx8zknb3lth8yr2swry91a7a9fnh38v5i9ydjg81axi77tefd2a87fkt',
                flowInterfaceNamespace: '1e8l99i89ow1jmicmt79coz6m0zx29ls4nj5jz1ap705qi08yz16cbiq7es0eymio2ts83lgctaiirj6g4859bfwq0j7lnuytxvv40m3mnodm974mqio72e4yvun8jbr0iblzi4xhugdblpz6cct0m0vg9t6ua1r',
                version: '88inqax84s1jq8pu2ldd',
                adapterType: '1wt2u4cd127cu0c4bwi8m0h2gwg0lshghp1m6gyl7mmno9hjlnvv2kzzeoke',
                direction: 'RECEIVER',
                transportProtocol: 've3pio54zrhmiok12cdu6c7rd5cl5p97vw15kynwcn9xrqsvmlitrqh2bfrl',
                messageProtocol: '4qp370mum1tux6b7zt5vw9kceqkbg84qk2v8xji7fx53oxoh9qh11ivq9rx0',
                adapterEngineName: '3vibvxc4zp23qm0b783hte49c4ggyeuh4auxlbopjxl3xyhs4oeqqw5gyfj8q6dth86i7tscmlrw7srjyp3zspfo02t8ecwg5h0x4r7xgqiddsqhgk34ii7kv7oy05zmttg5y3fjdiravysdkk8fazaa2tzb9le9',
                url: '3l33j5qbx6kxw8a0i319j3tj2sis8grzmparkjsx02o8xf9bvp6y6aogst4zas5b9ogdrfttk0zblfi0cv7dpr5828yksei3qd1zga6r3p0g7swvz54cqblijpj7y0ov3g6wyjomf5j1kjo8f5z3dfi3xoue8n9v26std5yuirciaqy20908k37kuc06ox9vc4qqfleutxogxf5ti40n8xi2tj955unk34x2zngxrjs1o7gpw8u6kir13jkw9tkxgxna0ou586xovo0wza9pfn7sq2r9f7jip53tus3j6qwgxc3rqgujy55u3t11h45l',
                username: 'st115szmyvea8752ox5kff9s0okyj8l84faqsqbxy8b31di1ii9j4wy8adqg',
                remoteHost: 'jx5ckyixgfopnjl0011h0huq5i9fifp2s2d7qxvh8ofnip66ctzv5chqqh5c15tbztohudj1zwn4nh0l7tk3eyzidnc0b542nldv6pq7dfj0v37v8o7gfgwcc66acaku7qihk255cf47p1a0ybs7gqxgkxnfhws0',
                remotePort: 7026621928,
                directory: 'rb4lwz5oczr38r7o880nky8cms4ygozb2cpt08hlyl7ifoe79o7l3311ndb3w3cjceloh3r88elmqgrql8v7n3gh57y4hmeaoz6fstr2fnbaoexa3qcf0ioa1l7w1kvfghlrp3q86el5r6i0urm9tap507w0151odtmlsl1lxqqdaot0w4uu9cvhrbkmcwj7zef9bngjebus0rs48magz0e1t83nbtvpvp1gb39u59gozhjc5d4wia14bhi7yd777yps4o9ikjcsm21wqo0usaluu9d6i8gv8u3d9uw7kdmdd2hbktbx7e8f3smp8p4eu3is59zh2kstctoo0ngzhcfh06xgqmu9y321ffeccliveu75t7och4yaozyku8rc6s2ssrmarvlxvpt58phk6vb71jyfvjxwrpoh9hkhfkgn9prfv42bf444j5sul5dllam1hjip290erhjvy9yvcawyna93sk98l438epdmedypl3hxmlxxns4707xldv5g18gnb1ara53j8pjcansjfisc4d924bp5dg7bhzmg97p63w4qt2bx6n13dmc57ljyth16lqdot7c39uajypc6q3r035s2ql6wgr3tg5e983kjd8eq4hrg370zqygs5h0le57v4aja7p0yjrnd7e4o0glbluwo36lfahv90onix1xbzesidtixvfczfeya22dmbj1ban4h0dfpnmxymglzo0873fgiwvglpmiap3zk1erbj0n3zde62we7atsbkhdu6okutoqljqs401647lizslpjwhwjifb5zrftst77ft8ba9wwi2xld2m0k7u22kgb2tgy1iitocafpyvwbvmbdb9renago2r3ulr1jsvn5kszjnliwor0pk8hgzda6k4gb29bjene02bng5rbn3u1f08nke63vsk97rmlxybj8er5cru8dxi5c58i8u1suhzmz9ieo2ykv3zam3qe218zzfes0a4jgar5069jgpay7y0x2bpy3nxq5b39p9rfqel2',
                fileSchema: 'osiq00ar6gkzfjjyjcn0ec3i48npmwyi5gsu5hz6frpq24e5o27xc3tkbh9zwrqa2ree9qt1rrvo4jnjn5uwmgyhfhbq913l3cu06d2rbrooen4xosd0xsyj7mhi36ghaf568fsqc4w36gmv348yb36bidd7yp0cn46c70fcqm8ktp4ck0kjxjda2tyk36sinz8keq8xkl12nsyi6mojtbqpw5m0cgw4dfvhw7ag8nhbxvbwgu7l40vkm09bbif1iitg64agh2eotnq26aq387ksbymxu1o32wycrbbgh8guw79ycccssacu9nxgn489wciwb0l6kba1uzjk2yt1aql7r0ozons6bhgzsxv50y7lr3up146x9hwq03ti4v761gpqtpyceubdc7z6a8smi8ao0tz9ddlyivh9em5twar5i9i3ek6q6f7sdr3wzh0w82sujj14ycmeq1z3ehu29mbpjkpuzzf82anafc42cziu7amytida76daf4wu5wgx3xwrzl1gynh6ygzsn1xpqbrr89whjd2n6zdhdkayetnfik9i9rvsqqzpf1ju3mhthvswb4q3wa3ttj16e7ocolim6mdopw9ik5eilvphz0bh0kcl76miozch9g1t3p48zqhivmtckey33gwla355tl2lid24oh86kzsn002f61p09v5w5gxrs30u6er8pskm8w0let7wnqh925fq3hgxp040gc4lhbge4r3v4fxv94rk91pnhn0sdmjlsqolbgahr7ief5r15iskmaktojn8ezr996q8xtruzjf1kzm0o0vq6ji0riwxal83j33j50tpy3u17085xrb3wkowi5pb3tfvfxlh5o2drooy8rr041ms9km1ukteanos8wk8m1bjo89ctw07zsct25o16pozndnt1nvm4psv7xskm6mz8qwi0btmmcarldc6qrr056gfem7fkrwehrzlne4rcxfwe70czym3v0gh2elud1n2rh4amk8vizpvk54k2ls1kg3q',
                proxyHost: 'jkiebhin8xe06sjtsjywgd3dwte21m7rppfoybi2mp46sm4rfqzotm4g0usp',
                proxyPort: -9,
                destination: 'xlpwil78xt3vy811w1cp07y8qwxit6tbaeoebqnxtecdyq4eplwzzomyg9hi2dg9wc3g7otuk63ksjxkcb3q5zepil7dnunj75ihev0rc480fa94acidymittad0whveu8jj9fe2924t64eshgxb01g3uwdrsm6b',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'etpmbbwyl7efy1vljrjxm4seybchwecwek2flzg7pawfas4jud15z4kna8149pjagpypphmssie1pcgm8fh4op6w2uxyo0rexeulgq7beay233y3muie2uckls40794f39qu0a76ak2wf8w5qtgvbdbkdcoa6abf',
                responsibleUserAccountName: 'rs7giqa0ir66hzweuqzj',
                lastChangeUserAccount: '7yprfn6mtaotxbzgdy98',
                lastChangedAt: '2020-11-04 21:15:14',
                riInterfaceName: 'c4uva3mlljqctc6a4sjnbxdu83i1t33o9ucnw2l5ws3lgyh7196ppnby2jcsc1bllxpfxp31telij9hn9c83l7i7j95nnzhpvsqftb0408a9617bc5db3r4268vwb65kqtio187cbhdr23xlgrh2my45w15x5m1i',
                riInterfaceNamespace: '2kzk3r4gyah448xhiuxoe9bqq2ud9bstpc5v1l78yc5ozotppps4ebpb9kqsprqyxoey6ynte41aud63qsr5riyowbf0w8j1pf7hg4yqscyjyfvtdwnji5219lcdhfh17vbbrhmtvf8l9nii5r3i9ddsuxe6zm3f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '8megngoka1giskjp4b8o8zbidyxwt2nj7xdt0tci',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: '1ym5k9080kjk15nwf1xfb42kitmhc3v85hl17gnl3kt1ag7dfl',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'sgmsxhiq14e0mb0e79cr',
                party: '9qfz4kj9pvpd4vqm41osem3nq402e1b443g0k96a0izqleu7yadzdln87599jci7izri3pg3urmlvttzb9lhtp30gj29xtloivzezb8w7n6gl47k2an7jouctzdtgdntek9t5fitomle3oa9lkc8g0ychii7kslz',
                component: 'l7v2d6l6om2au63jup5zwzmg7fmfjaebymhl4sxav50sqxm1k50pvcxxxqwice5nghdfljp7vmgrak3313drob5t7ai7ugwz6t8en3lfjjd1xhgv0v85kj8s3of0f24fg8fwa8w0j2mgjnell0x2a36gwpbo7m54',
                name: '6851pwuxaanvy3mc51a8qjvk06q54pl7rfxbfmc98q1ttmya6xeobce5wjv75a0biqnp4a75decbtenhzodmwl3atqt3jx9ao8f8pi49iih1mrquniw9nezfsqj09okx6ob40lwci1aiwwi4g23xwjwrh7a7qy77',
                flowHash: 'xg0e240giua3m7d7cnuyfuu8sh49lx4jxdzyl5yl',
                flowParty: 'fzhzwib922i5ex49hslrn4jkydgkwfks4xdlqg91g9myeh56ilto5q723hvctxajsjjyp435pgk8huw2ivglwqqobrwb119r17xiipfr8bhx0vwcvksqj7pk2o4frctfgxnznqu41699wm2lifsobynivm8rmisj',
                flowReceiverParty: '2xt5x2m1f1or5zihsui5pmiuuof39ngtxqddznx7ybij0lpz9hfvp8qjq8qxsj31yguhidg9y90ohoii9ok98hfu72rgf6ygqmih9cd0jbjhb1hjl9h3g7p58ls7yokjwfhwkvwb1emywf5dmro7iirtagtw3bze',
                flowComponent: 'qwx343umj0xpty113bij14dppuidrv5bg1s99edfg625u1zucxdt2rkzo63ys69ty9nkw8kdh86ry89j4bfppql8a9wcdiahr6l6m352wbt0di2x3a2aohgvw935hw8l2i3jbibhbhtnvpyf81x8sm20m2preo33',
                flowReceiverComponent: '1ppu0gkhz1jz0toicggfnlbmms9g4mou4igzqdokcnwr91715k5op15v7do8gcv32jtcycqfce90ln8lfbowo9sk1ycehgqg7ba30ipsxhipc3i0b5rzus3sbyq7o6rkvwy6o7prtufnyuabyq4pcih465nfykiq',
                flowInterfaceName: 'nr7cpw1lvr21t795twzhf3dnkoy7gnf54infr3vmru5r3vga80yrnmv8ydu86ja9mx75osocqfhjnsvo6pny1n2w6j7jx6j337uv06cdw7c6awaw5bnrlxxtjfzcht58x0gjfpok38mmcyhrictzgst5cgjvqtyr',
                flowInterfaceNamespace: 'dgkyuc5it85upqhz82otxgsaqjzyhb88w8ee447vzw6ud76di5v682r2c37ne58afy7snp2qnrr8g63qdeptj5j2oz0ud725ftxll8fjwluprsj2vvzf49mxi1zjmkr134w7t9ybuicrjmxs580xw8ft5kbvimsg',
                version: '0753th5xtqnk6t4ta6r1',
                adapterType: '1dcl5qie84227zt04fn3xiwa63b7iwuy9r8dtkaf8kik76lqvwusp4mbzjx1',
                direction: 'XXXX',
                transportProtocol: 'fzbh0ron2vrjheswarllnf5dx0i2bwnwmdziovp3ik4llazlin62muyclaux',
                messageProtocol: '7a4h2xz2sn4n6o5yf9hw2jmektgj45bqu1wd8s78wv0dxz5138p485t9mcp1',
                adapterEngineName: 'lylnu353rc46y1ilhbs4glnv3bhwi89mtok42otafqljhtwxo9veok0eiw8hrshit83ezvw0df85gjizowsbo9g3y9a2dd51o41yrxwxktj6lme3g6vsom9jjrw3mdt7vntfcuwczf81nnixpknvtu8a3txju097',
                url: 'zkr83jbtqknvr4lr403vcjf0ccg357t4t9so2fvpn579hhbhulntwlut6o1k7d5lxmetvst7lnxedykm5xqwgf9va3bcxnlheayv62scesm902qfxm576mlweeb5vxy8ci60uxj6wcnh2105frkn4xu6tff4gjkyyw5whbygruseft99yocw1mo8wyk5xask7ccd24y9hs5h29mq81zrq1gdwtvs0qeuxxiamfidswws72ktu7oyaitxb4mqqklej10mwt1v4ziq9xevhs0y5ix9biz6117kk9e6vk6xvmgas4woeah4pfdf6oupvjsx',
                username: 'k6tobsplnxdanq0mlu3jioyd9lc81l006mk30htx4madvw37gubitkhnfrrw',
                remoteHost: 'l4hbrcq5oxjb71xvw45dmjmxg7m74ntdb2duuzlx2c6enj2pzl3d5a6ch4mowt798wscerfo4ap1zfz3pdwxm5x5nhzbze04471cxddb6g0w9q7m6jx647m1vl77bdos58rrgicsapsxwgtfm9zjhtvvkoxdcr2t',
                remotePort: 6274886025,
                directory: 'ymukws5necid50f6e3dkksrpzv0u2sonnuaft3eqz0uyqx55kll0tv13mpoesr5tfgr0y48d8a9tytv46uajlsunk9ts1v0kx7lt9fqa4stnazibtm2xjo6qrwaojew95f1vt8w43r44t6kxzkl07p1vwu7gpvwg4chbjpyjfhq6o8jmirta7xtkn1zenir6w87dqn2u3gtbeckrbkug7jjxar2er7mcxy5yiubthqp3wcgza843z8f77xkspnr9yhv4dlcsldgmhsk4xllhq4az0di9f4di7r34y6p7fcwk2rwa0mw5ldpcm9z9m0965xb94m9loq7q8pr5p8c50nhi4wfey2zn8gv5e59ygim3locdpned1gdu7chuh50gtdjmj3uk9gfm2q5zfy70f9kv0brhjq9zlrhv8g6znd12tsodqsa85wyc6ym3mwuslbrcih3nq60ha294fto7qc86rg9jeq0l55kgkfqpkxauodhhi1s1cloyn2j734xiu9ia74a2pxd8btpz0836nccndaz3pcc3zk5g3jzitlbsuu61scifugyzjjaf9ys3hz4ulv8hn8bhna5dykvgntqfc721pfgx9k3k7u3eusr5n977974bwmv2m8i32zw40bifxi7ut6ibzz9221czulye59c2qryppq738mr7b5rjghanwsqy2nqtjo377quh1ptq0e6omf60ju9yjev25mbaimt7i3lpxhygcnzk6sqxuud4a7so5m4vpe6b4amfv2x973cyn3iibhtiyle1andvsw6oaqk6ckmvyonbjoy1wd81za5ei2m7m8yklhypeg1mrdn9qimmjh9d8uoxm19x5w6yf1hqgrm98nlechfr4ycdcm7a4yynx5bwrprqyoekhf90he54gbeljopl2dd57kc9ziwvtjb6ta4o4hismvxylhj9sqp77yy3pumb9m3shj3iksr54vknh7bttoocslt2z4ufnunsp9r1wwthuiwhppw1to1hbxfp4v8d',
                fileSchema: '4moxzoqwth0ivkgk1nrah4w5wpq260aoajupjjrnftsbmkw2iyrujamihgduhckqxolv77zlocrva64minera8esnqjelkiqbgqu6hgpx1kf3xqvtpgk8ca9zb3phg5ghyqa3nzagv7ak7lzu2e7edx50xqzv9nellriyuxkmydi45rdypcjgw20rjg3issrxsupnm3drsu1wq7e7h2zdmzal2t0it9arig3buaeejqgftczwtsq3ebj3t4fkmkz4e7jdhp6o4sid7tn2eftegvdvqe0elnafxoc7erd5lbyyzii7svtehq6knwuugdzkfqjrgk1o21quu39d0pwa2f1qm9bnllqaai4rv6pf08mhrd2glbdx5tf8z0v37wkhh3jyymsk30kmlgyhdqrx8htzvrdvnh5djdpixbm8scqlimcn5y758ur66ixdcfqjxnublhh9s1fyclz0zcdxnvxc76kvo3bte8g8k3rug5rp8d5v3sq2eh7fvs9bkyyntokayy2a8ffwv0wuqi5dw5kctus7s5ctee7rewpdv4x5z3mlxl8oph91wz4j1r7ruvdqz0sf88ap4camlviadzsqmp2lui567ijapytg6jsspm7gl0jehr0qhiwgtiqxkvv3kiqi8s7mpp92as5p3a17m57vparj2g2xeh6ctcm2yuwqs20br0am01vzlfmgsfmptxpbfqj063oimub0oxttm206gz57cn48nnsl8d6aql63mudgdkr412zwfjiyhhaarbrhqmxsm66xgad9itztirof8h9cpdamctugy16crr15vhroxd3q0pin85ehlzwumz3xivspgm1qh0aeijxffq3lxw1mry5aj6eaxg2alkehja2gmhzjrhrq7q77emjymtas8jf9he8ph9zo4rprrnoidfyeje8kjbwrzqfh28e0scoe093x9zi3yc6yanh89fnv9hkjcyepbfpqbwhpek3qhbsk36cyu51ktjomupn0dey8cp25733w3jr',
                proxyHost: 'ese524fjlbb962s28sr6694sjwsza11p6qitr17p56lc5kk4n4n2idr5zpw6',
                proxyPort: 8863298619,
                destination: 'ejhqe7xh8ww1bgehgep6nwx67ndvoi5jv7ujo5kaosz5hci3sh6gtrlvulmf5i5ec8qmx23j6ldpnutob3o5qlrhjrlreofzuba91ucul0k8d32r930h1l3spt8s4x45u7afoey4g21k7ehfnbyijpvhbazddfkg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nise1n0dmf2ox9te08xa6wdftyvxrd0pybn95rst768n3tenfabfm6twp9q5cgbc0uib7jdfx7a6tt9t5q8umfsae0idnwqf33fpkr3xlxehskrzymr7816a1py8nnrguholn9pozula98ew4s8z4q2bb369boly',
                responsibleUserAccountName: 'c9egaalcm815hfsn6xdb',
                lastChangeUserAccount: 'ug8qq869csnib18z1d79',
                lastChangedAt: '2020-11-04 02:14:28',
                riInterfaceName: 'yffcv7090ixzpyc274qb1diup1z5f4qdraqcce9lcd3oo7m139reyp3kpyanuzd0wcvihpjth8y4gnpnmu8lr7hy9cxl45wzm6m3bvdlc3jvskstuv5jsa9y6bvhefztua2bsv4bngtkhlwif6nw3qwgd2j7uf1d',
                riInterfaceNamespace: 'egii329odnobz47uwp9mqowile6e93x5qjhpi8cg786634hhxr3pzsikvb9w6vg45tkf68b9r4ykrl6p29ijzqebcs6ny5vzv5m2rrfrw2ugm87ilv63jsxdqvgw2zfe30i0u0om3l6p9kgxl6t7j2z4s9fgze64',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'w9n5o4dejzl2eky5ej2qacao6h3lep0xjw0shk92',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'w82qu598676l5t70yhdnsinwmpfoftw0nu1xges0j8thxa6yo9',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '90aavdgj18a4ez95mkjm',
                party: 'ib4s5zrduqaxtp7wztfur91syy6aq1iwqu14kjmfw8fjq1s9sc5mwm27a3leuhohknwk0owdmlge5atsijc0yomspzg0wf03onseycbyyd508nfpjxiqn3jio47ztn588mel1tlg6pdssawjmklhbh93y6acdwgx',
                component: '8gxr6aqs98mfg7pss0hy2sqa0nt2ystts29qhor1ne6po55mas44u7w6gq44b3sxxujyixfhvnik0giit3jcs8b4fiqft9pkf3elmgnlyudho0q7l96tgujuefrfe12d0fdddf6vtaiez5g38s3itf48u03z8r89',
                name: 'xe93rjvd3ycwo7t2jxh73l7irsaqs9jyglzi0p9704enxenueo09nk37qp8a439hfxrwz7w2hecen4qx7figd8nhvqc8bvzuqszjkmxtqsabhl1y6gtpryc3qnjnlftjhosv2a5hc6d8vsmjurnpr1enml017yl7',
                flowHash: '6l4ziy7uvcvvnwu9nfk066sg6th8py0p486idkrb',
                flowParty: 'izq2yhf9ws3m5iaeaxqkfb7eh8qg1yrejfgj1xl8stfl4lqytr4ga2nna7bzte81ytjqrg48ve3d6ks0x9b4c2kdzaoz545p66c2klzk07stuyfrldyxlas4aqtvwo2l7ftzdb56lcs48z6ljkrylfiigxerl4go',
                flowReceiverParty: 'nl0jh80bclhixzyhvthudgpb64cc8ntnlugjyb6dzq0hi999ajyv29bnyyszxsp5ags3lntvm258edjvqg2u6q32s6zoxf3qigdx7kdu3aeutoa7s0cxct0rc12nx5seekuxzr7g9hxk9yj5u2eyp7f97c7bbml2',
                flowComponent: '788q99wcdzq07ocz4l7uc1t7cvz20b9ohhmznyv5qxebi861j6thi1dxuza3tye3sr4iu4k83m3ngz8xa4u0sznjxs4k0rt21tiug24p5mzovppzfayhfr53tmripgd0g6b2ut570aqre5rwvokb1qwy572hxzq7',
                flowReceiverComponent: 'kzxieh9y85gwz02xogrdrq5w2u5a2tos17i67ldd4cvc4pcknr0ys16rlzlttjef60lslg6p90qz2qb5t7evblmcklrljg2w7mha8s9g004hjpzi6zw9v2t8mztev6lno8dncnu3atzlgiu0eihgsekayidtib4i',
                flowInterfaceName: '54t9rtj4qonu3rlzzapjg9npst4ff3mzop6yzvn1gjyrm39vpc4gdawbvxfxdwykxiv79ttkjz7s4rmpgrguzebg84y3fzj0odb3rsn06wqjw9lanhlkb46ydhq84uqy238cnjpeineat0h6iw82dk7l09ftn3xa',
                flowInterfaceNamespace: '46wik3zva2jefjhf3hl9wi3t3eqil4ojjysh2pq6th99u575zd8hdlyth8h3mtoq9nqdh7j6xwrvyv1rzpx6kggx8vjcfbw4pgdmg0epmstop8uekntxa4f7l5gwcqrxosjzl8tpzslrs9fqflzb4j12tiquxaac',
                version: '2nkjina6yt6wr7pkw46a',
                adapterType: 'yg4seudypyj9erhf0stdzr2cylbb3jqtut9kfnq9ketdstrm1hhy47bizi0v',
                direction: 'RECEIVER',
                transportProtocol: '8x38qsckwhsyhaszc9grp45r8tgn5n95wb0ko4kcn7t37akj81kv8y3goaas',
                messageProtocol: 'nk92r4nps08k323msuwyrj951z3h9ozyy2ndnw2rwgy01fgsw62vdx5pwvjf',
                adapterEngineName: '1gwu8kv36pqt9k36ggvtj6qx4h49nua0nhgp3nffh32fkeckxsbadpd90uqlaxw6qb8k9lqi0x5ghqknsdx4cql73es0v14qmhk0s3ejnpctv03ggqtyw2wuvlgm28t5ob9um29tdnwc0hbdasju1xd6g84z4ew4',
                url: 'i4ubzv7x0w72wxurfoj0gcqnhadrndqdlwmtbprq607xr1iikp6p51dxsm3ocvqdc1f415j99pxrhbs0yuv8m6lxhkxflq855vswwwwe4t6w5ge82u15x2heh8xocjejp3mm24z9su2xd8srg9b4v0je9u5czsmlll4sfvv7j37112j28n3re5gjvjucaduva1pcwfhtogrtb2kuj0bsoln7px63sgc3owoh0zeef2vvth0vdo4beksu1lcgiis5e9uognomgpujfp00ybpquhwtjyzfp0u5qztl28t1gwvf6ikuzwmhk4dfr6kmv7rz',
                username: 's5w94z85nclsrx5a43k94fck6t3tauv1010z4kclrfpn3l4ev9i7odq2sbe7',
                remoteHost: 'eg6vqf5zvvgnzfm3v1cdbop8axvuqzdo9z93asz4lzzwrx0d3mivjr9pym3dz10234utj7emfkoy1jexpr67k5xtxg1egrsn7ld1lp25bnt1ux7ta60s7fbnanypon8cv9qa6lqmkykgnh2gb2u2dfjqa2s9k83n',
                remotePort: 2469950002,
                directory: 'nszcrqk002m39i6apcwai9h6ftka0elh84k0w4voevl2honbsqjp5o2766bw7io9tdeu5w5vk9z6pasvuhinu5u5udzj9qkf4inkj9lm76487okmb6i10o7bx0adeexd1m6d5fi7gxxb2s6h8pxge24wtgei64ivbgwf374zp05550j23yq8lvlprn0obf155v3v6lr9v2ztsslqiiar6xr9zo4q2px7d9jxe2e9p71q3wvtiux8hx88xrszvt5mb8vlp736aiu91h8tpttfnxzx2i1os7prlo25k7snc19zysou1aecd7eejvhmwkndveujy3ynxylrczz9wc9s36unr6s3376zhxc9pmlvud9g551yt338xov50myd91ph85hfh4pi003ozmn5tyvpkqjnus1vx0mqmbo1dm2s42t8p0nbynul8koeunp7gzq6xvs1gdesb4oyq1dn9fjjejjwlfbj2e4tfz1gy0r3s6hu2niftuyozkte48eaetvo6r3p2om851ontwaalvnaln37ciltc1r2ar3okpyeoqkw21ergvuygjqpvcrq1u65mw4prwgu2cpk3e4bzfsfoxnihtyb59efk539gt0wby5il3obdv65sha8cdrfvghx7gb06l7lbyd2v3ziz3qdli8ylikmv00d394jes4spm6yrknvw20h4di4efebmjvfd0dlwr1gvqqnouwvuk4rjlr1ud2jkw1jyhu5i1jwk45arx37bax11648aw1fduf3v5z3ohylu1qlput12c6343p4lwchixza0iq7flher3tifm6k0heactd2qdb50x9ilv8ff542l7pv8yrgdacdn03jrgm4ejmqg7jy0tw13ogzljr62so0mh10cice1up11feijx6s3qxhkkc0yvvnqle0edaouq0wav248skrwar7nbj0tl3qzalc8lxuqvzwh0r8qtm03dh143kdhzvqieqqfhx6po7mjmqtcgy1q1jcc9fmi32hqf5eaqwto8qx',
                fileSchema: '1h8o681dx4t0znwrlwdqc6tmyusyk8ah90ko2dn3pn6c33s5zlwbio73iogdyv2bu7j1w23liife6h9ef3uevd893zisbj6zrqemstoocx0g0s57re4upq1kel5i95l43na48h2get0gx7lgahd5fdlgmlh1hlk4brz7mbf4tsutndz3onpwweyx5cyfihjkq2iurcy5tizx2d0ja8fnuizapr0lxipk6x2ko6b977wxqze9b3t33pgqqrddek8o60j01mkt026lazuigy0t5zndd0kyy0a0knkih0sc9rkyajlg4kqfp4x4qu9l3bz2j705nuevwvf8jvoh1tswvi836wjfxw17sysum9gnw30shzqgdjqlacz0c8glwcup5by4aqs4y408e3e2hsekqoqqd6kforjnd0s93y46tqlmdg6jczbiwh2z0cm82ye2e9euhkt30240mzm5gqtqrwtxxfzmw0byohvkrn8kzxcxu3xcsbja0tiz66bx9anug03ti1wpo68i42l8jnkksdydxuialeux352v41zrkcj1s84kx645mrxz10lzvtf0yzyp039jdn4n5om1xzn26npzprkjkuh9joui33j2m5rdofuo01v3tlojj9n0uyi8nruf4tagik1248po4fyg2svd7kd301wy08bvofez827sy42fyb8at8k1xx2mtzsp6nc17yfagfbvihzv1zz5m180perrvkv6da6j85hzp5unhqil06ky2zo0kzcznl7xm4epv6d0bwlzpl4v29rm4w4w4masox2mldrqeblrje4w1nk6116tyh1h817m5dj56z3hreotvdkzll5pn2h23mr700psjs485c3y1tuk6074t8wxhzfz0veg7utgdd1ih6l6oz730llrlc177b5ecyirbh1s1d83y4or7l6jasqu0nsvnvbgohmbfqr8os6gbnvtpj67q2q2rvailapvkj0ulmqnc8539dtfh9aqkmlqx4jfurdalkwzez2vn4hu',
                proxyHost: 'x331ve6e306x9r53l2fs41gu2hp6mkbupfvosmw5afmpkdg41wnmchwspmii',
                proxyPort: 5212588930,
                destination: '82htvyyao54fand28w90v3uk9g9ipsuibt14ss35jqqsf0omix44ehd3apo2vtmmhr9yzmauzfqx12cb5b8yobbegxoftxlvnocw59ceo8g3sfikzwmb4ukzl5e3v8zsmdnni1o1y4l5tr0uw02yl7grxsc0dsgf',
                adapterStatus: 'XXXX',
                softwareComponentName: 'hpbzf64ekw5ng0hr5tz031qet83fcbt1zvq6giduwpb28sstoubkg0twtywnwqtgb0fd7au71uwf0rcia1d35ar36m2gpchdj28jradm9ww9cdkh16dqlam5luzalzp98w15k4x7lw6y3zco16a8jn7qiqzr46bg',
                responsibleUserAccountName: 'urggc4hjtipbrslgqfjh',
                lastChangeUserAccount: '8fp65wy49d5vkj96c874',
                lastChangedAt: '2020-11-03 23:58:01',
                riInterfaceName: 'kc20khv7c3vrssgcobxxeylyblc2ea1t76ksc2i9fcov5w4lgavjcyzn9etyq2i1x8ptxn8rw9bj9g7h0lqmdwtz4s7ubpamjohv7v3256vkgwqjkca8mms30pmngavprbu75s6hn6pnh3vdxlkn3qkrcpjq7jwq',
                riInterfaceNamespace: 'llu1e5wwqla5cugnczjzyl0u2wfl0lwvjemhzljkpaubyr78ubb9z86n255yjb8uthhfho13wo5kbopgjwqxya03pxe390m03iw3kefgyhcu9n9psq1kzh9pros4phdebwoxax1jn830syumsc4ia4dq44qnz81c',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: '1z0zk1xvi7ucbu3uud38ys3v46up0mghp4dgak8o',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'vmb8iacnfnbai1219ei4vk7nemrnvkce1j9h1y8m6618dv6i94',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'ti1ncdjr8kkx8aev6wkg',
                party: 'y4lmk9yin297pt2dp9h4cden16opd4vllc0f0hmil7u9f4v1uxk55rndvp0ntfl7ufrvt2366ko81h334qpk0qyfny7cxdkp9jd75ys74z1vmhbjq4u02dd19zd4hdr0aoyedaxr8taobono26bcglwgrl3snwpo',
                component: '8wnl9ja9qyeifjq5m23y5k17wo957gtmtk1lmr7vupus7kdtf2xd4hqqp6om3y9kh010php8sw6o60675kvki7c5inh01e6mjmrohfp8lbcsomd0jitpg8ii1vl4c9skiuyi7bqpzo4dxdbz6lmknh4hhdg7yp2l',
                name: '7uzey4w25k0najjavqjhvfyd9apzptv9v7pojkayxeesgr0y3807paubetfiw2bm2a1qwaq18klxo7yyutfjt7s1jmxhq2cmys435qpurj4vmdtbaxm55tkwnayivbrzmg6coytp1nzvatiul32uzujvbh4u7vsr',
                flowHash: 'ey15iikuzwc9m4tfu231a5ub485bjkxr5f0clvme',
                flowParty: '7prtg87qvug4o6vyabqswn8um00tig6rz7moern4sdshvkklqxiw8xc7ztq81tzva4yro30pgu73uifv7ssbqic1v97jybpras2nm6wkxx7l18b272i8wkwuex1cehr6cy0dvq8pi2y2vcwn4j0udi41lylhxu47',
                flowReceiverParty: '0p7hvnqd6b800pgq9gn6qpyly7aklspzd6aeknbuw8bz9rmy6w6zry4ehcwhko0qyd1ij3zo5edv6ejpqiqhnz2e8kavrp3ux03iie05enezpf770r1a6pnhgd57f14883vaxrevrk17n8ke4rw7fcid3h2q7974',
                flowComponent: 'xkopbqzy9yw3jubxajxth3cmw2rd0jv8jcnh14txlqhhvu3z4szqjc5bkyu0ut66j13tws3s21qk65ten5degwi9l1k0w2xeolp2a5dvzuzauga1y2ggu4jlno1bn8slb3umycitzsetrp83niw68nlkzw13xs37',
                flowReceiverComponent: 'qctcaoqtup9j5x4sdhjj8gjwzai1i9shn9w54mq4orl7xzahqijab2llhlogyepeecthgkcf9bv91uq6apfs8l1yzru3l8uisb0sun76mkk70eri70c0cpbzwyy8xsne3r524grqdwkri9boxzkdeuen862e0zey',
                flowInterfaceName: 'nehe6q2i1xnqf6zosb20qe2k0q6j4nbk7iolvu2gyq0vkq1nfb1o3vfruj1ey0j5omgco2h5njkvan1s5v37j2bc0pwp5xr0nkaxznrfyojjbhlv3xyg56le171yekspm8h48bj4qxwpbjn3lmy49u8mp634ocz9',
                flowInterfaceNamespace: 'ikmvyk6vj4e6768a7fc030x1i66l0imwiu4jze91qlbp81e0qei5kc17nshcj82l2gei79ijzn6hkpnt9uavi0nr0rcm23vztsbvys2shhal49wjzi5zygtp6v5p1rozw62p56snmw42fjrbr52vfvtq47zea71x',
                version: 'p5lrx32z48znwlqi6q8j',
                adapterType: 'pzg68d7no6wdqhxjc72ao1arzrynr0wur6li0do43to013kamnicd6rlykfs',
                direction: 'RECEIVER',
                transportProtocol: 'mlwjocgrv7eb3pr404ppzdq5u9ai29b9oepbvd17f1y2dbsrd7rp8i84nv2o',
                messageProtocol: 'ulpseqacfoqfigibencto0a4tjydv083yukmqgjo8r2qhl08qbk37sjnv3u8',
                adapterEngineName: 'st83twgnhnmzzqbh80yl1n77i2q5if4w1r8dsdjx51lsmktldu9wbojxl3imd95ruokwfz2iagllfdd3mg4jtx2rbnvf4uv837g2hjcfgl4ygatpwrmmy6qmigihxrxge19tlpa4ze8rn462hn3et1c8748qkk0e',
                url: 'wolmdrd4rekff85bztrlg373jp2wslwwsko9nmb2h615t8m0pdweiz16weatwv86gcyehhqh67qgomt4304hfrhqdn0r6k7rerq12aycw1a2zignlxpvni1ofgr88xyzllugqb2zoofhywpoihdjpnui2tkotlj4ngvr89mpl00bexoqyabezcgjduet8sxz94m00q99l30ygqnfc8yjestubw1ikli2dj2rbwlse0rdvqzg8ybl7cd0bb31ukyzw759u0qrafkau1y39u4btdp8l1n1zi4i1ju1fi69xcnhldbdpi7ngudxkjjbrg18',
                username: 'tevd0wu0jgq03z1ow7ofu5kvn37pgig4p4tk1uv88q4uigun0ebvxmmceyp7',
                remoteHost: 'ihxyu0w7tq2vl9fkhhgtzl23b0lkg5a3zj6nj23au2ux14orynk59ool5iavzxphywmk3hgxzk00o3btk7vc43prqhynthuyrg36xwct7dguly4qylel5zf4nd8tmwfnypswmr7h5r9nffztwgqyn8832auhjf2x',
                remotePort: 6755389337,
                directory: 'u0j9kp4r8ll1pg0elnzap6yn6i923tqnmf7s9er2ueddn6k6t4csmspepykaxq87bguvki0pijlncyeip2esh5lya3dtftgftm3e7whl92ppn0gvdps5w3gsd6c2fphp60csequdd6jym2ywa1xku6brvt69rujc1zuugzl45henckdjf07z55u5wkxh0g13psuknkx3j6rk4uw87i5sku48b0g32m3xb5pxd3vd5nqi0kdizcd5opdfo5jjm967bag8ji8kyqoii0kmghds08030wm7mn2s1x2ybob1p88dkdynv00v6t4wiilk9m5ii8ydm160h4igxl4wscjsvn7xnq8ak1qz9vgvwcjp6aqlir3ylrxaiha8ldjzyyl8q00sxlo9ffmoyhv4pcmxf78hgwgmd3g5kjmqgegrfiseb8jtva2pfippiig57xm7lis5276hzi9iiuvsjhjfxsckd2gsmvfrkktxm3ezk5q5xtj0zlvgo5tlvg1ukumbwxskjup0u8pvdqzrctqqb1oe3r6ya8e9ffadcjcfdo4p0ein6ca3gwkglpnrwj3qzafc5m6uwl2i9fswrem3q63bff45fce0hxrcvr1m56qmdgbajkc8mhc5cnqn1lg77uqozkjgmotmw574o1rdiw8cvbbkzxuy45czz81kz5ywcltuet57hc2unsl3k2ie8epzn0n3i3dcp2ayaumdm103r6066is6n6h19ubxf6zdjvusatwcrk2sqgza4idor6cfi5ffmictqxwv1p8lv1lbng5wj14qz6wg9wu4j8ao0vbjeeyt6rpi97k7o1dgvookt4obdgn5h9tqx31p39nzarivm9m46zb45b9eplhnlymz2xu35rrviprpq0igdlpdofhuedwwgb2m9pylyvmvhl6cuuhtp33nmhercxdbf1orih22n80u8kugl3tnxostjyijux5vboxfy135qscgb9diov89ue52rv637gxvhq6g6ien69ukbul2qmi8',
                fileSchema: 'ql02hxrtd76indqs1es73m1xjus9r165mgaqcf50y6ae8ku5tpkfo825q6jb6snbf9avvd4o7w8dp7kuy1qptnzb9z23e4phd610ryn9evz94iar61wkmgaz1malqgu1zco7qw3z2y488h5mmhvuhh89etxa4f7w32f6da5zs3t4a7t9hulxq6yfbu9dfxpgr2i134lza6nlatyk0dt5sum73ly3tr26osldzseu829ytb9bw4jou5nwbr6y51sk46drn0t22cda0r497kruct37nxkdoelqprfmar6uvg6acn6ausx5jse7lss5xfggpaxdsdyxj6muj70bo6jn1j42mt7cxzc753c8m5a3fx3l9xoulkvgkevlwtu9t2ulrca73kpmh7xzpsm9ykrpv7v0ilx9n1y2hxnso0wdoc0wlpgpm5llwwlh2gs24lw6yo8t1xe9qtx5af8m52hjvad96dd8m7e3n09v9g4oqd7g6rfj9zd4rk2xdinrpt1lqkho1oveew26itadg98aqkl0087y4a8jlutlzgmfcpkv7indi15gxkml1gcllb2ee9tms6lm42f3sblovtt8rrkkpt0z2oyndhi1gbtpk6wzr0ylvz146813vs473583qfl2qjcyd0s5xsy8vmhxkhyf0usth7ze4suzkax7l73zzy67izjojcuhxorxm0rtns0h3uu0njkerleb4c4nhn87fp31n2yeueh8yqlfrsbugt64tn85faq4b84rgct8lnsatrensf3mie0kaqvb761xfqvpqw0utli6arukp0n2uvumm5vui1xq9zfn35ncvev2z2slfm6c7a6hw9ym0i5kse0sgu1eq37ftegrhd4wop6p1xpabwc7yamic2qftxlcltbs9awiteo4hex1cu5cjerz2iypy46gtiwpimffvccq77tg2jvacpxaldelh2hei5f8nvf60c8fv59i37l0dft0p7loehy16o0ywt5pum8bq5op427kdeub74tj',
                proxyHost: 'wlvpwsa2xcwwbeexkifqdi4awavuplxg9ob1eyeq45z67aj4t5uatsszweyo',
                proxyPort: 5406782711,
                destination: 'xd8lq1qmchc1aeuqjnlk0k9qujlq0qwj68krcbmetf3c9ee4h1mrfg9yd0novrgf2funsjclckmg1cnfn13ck8nfoiwc9g0bx5aq7agv19whpq0hfzj3i029zen1srs4yra1mo5usr5d5b21obnr7hrs25pzezr1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c0i5ftlx9ruo0r3yb0noeqagqzgbs5x0off7693hmv4rzcmnr78avs9zpzxztulv0zuuu0nyx0p6f7dirxnynlkssov9gn0ybtosop1dvds1xaqwdj3532zi3rukw48wibk45119j0giejjs7lh9uq2n43isr9o7',
                responsibleUserAccountName: 'mfyf6083mnhkv0or9gop',
                lastChangeUserAccount: 'qz36b7fek6hyspyg9fel',
                lastChangedAt: 'XXXXXXXX',
                riInterfaceName: 'gq74388sa1nmgw487p2269amn6cqwvb4t6trjm1fyi022cwoaaeyqkkrhiwybe1crazqhy6fc1poi2bssh3nkww4340cb0c066cw8sa8fpw57f2o4sl1ugabx0aq3ujgnrv1zo7ictdw6z2rqxktd3d42p1twqf7',
                riInterfaceNamespace: 'nskafunu2fpdlljb35riw9cllejhp8n576zmevpqgcazwo0ame9ony4ihpc7uvei5uvxtbagpxrhn0bmkwn0o89ubpb7rxiw69ju9l4qxygnkpqs6uhbck0fmyrktlrv8pdbcjl3peo8jac0tm0b6js7fn7zlj1m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'a4p33t62h9svcleyrf9xicb4vqbcue4187te23ek',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'o53wp815n5qpep9gni8ewz67qmwibuce5uceyfxl2q2sv7lcxr',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: 'vugd5cafl47rygbvcokl',
                party: 'z9mfx8laznusnu03vfxykqoeljnhmr9fnl8ilxcrj1cyfsmmksu3k8kpffba4f7vszpurtw34eemq0pewpl0loe5v2zknxobppp430q408vdh4eq43iixkozc3aq7aj8neg7sud4n36p5tklw4ssj2gfhqb5h6fr',
                component: 'vba5c0myqbts6901vowu9n1s87fknvg7ha1gdyamtcl62dx15d8xhkfgf0jyr804wu31bp6krpd1f6m6wtod6sghfcw0fk183jx2esqqvhmo8mixz19kwsvnotzji1t4kzv3531c58uyu0lxl2m61q9n31jyn3n9',
                name: 'i83kg11gksxcj4johe93r4z6suqfw201gmcnfxfsfk3qzexrdhsgtkv9tffg4ote4t07blh7l9f2pk5r4a4nxyzby9e8mdi9vatb9zgepkxxn8gb0m6otw4hp85mwzrt721saro5kyjqpnx26zmaatdtv2z3mrdt',
                flowHash: 'x8edhg4zse9s0h0vmc13fbzsvpe88k8rtl5fy11p',
                flowParty: 'nd04u9fg5mfye9argajapwe3bgtdj0duizmvtlh7f54cmjzd50e6nn1n1sj15e1kmf5obg776d7z5f3y5r4dddfzvqeo3p08hdfgd2eigfjxp5oqa68qf1ew5sfdbbxwd2zh008wnaa8xfryvvgg5u1s9yritz09',
                flowReceiverParty: 'h64bep9wwundreeha82kcrs1renls2pnmnwjov2jjo5rsav6i2w8kfjuvqehuia1x8cqs1kmr9ek0sdhdlgb9kyhtyuqkexihotczze2x306jwvaqstz7hgvy7yz984vtfeln52z27u2hus4moklfopmf0yxsict',
                flowComponent: 'xpf7vvav0zkehzn735qoq009owvf7e1c0ilemh86n6snz34maxgvjxe74n16d9qsiwyj1miqbd890h1z00iztjstyvp54maq65u86foqwykvlq6ivy649xmm5j0pjd8pw0sq520hpyfm35nmac4hoac9t2yxtv4s',
                flowReceiverComponent: '46todqd0iutak3xtbdtwsf5j8okln4n69kj80vujj4buvf9rxoa1tzjvg6kc0zo8z40bpaovyk619ch2cpd1as9mxhhvir4fwydj70jmojtdde5y3bx715brej1mopuw9rf55vaujfztxduppbp4wzncgsl3r5iw',
                flowInterfaceName: 'amd34i929529avtom0mibv30jjvz873yfyqwwdxt5h0xhqfxao81kg183o65x5la1v6sthg5gp30tmi904910n7ykm4qp6d9le40apjp2e44p5rz1zxce1z0sn8rnr3rxsc8uz42msbbwiuhv77wjvznrntjn240',
                flowInterfaceNamespace: 'bg0qvk3q6hmt5hngemro0yphwcgdzuzyf3l3qj2oe4pn9u4qk9k1koxliei3keadvljlxquc8a29j3r2r1l6wjejcrcm9l2efb72af5f3m5dapnv29aivogqte4x3vnkfuputk8824efz7ppx8e9vkmifn84mcl7',
                version: 'jpd3gk182cu06vvifgnu',
                adapterType: 'oam6mj1l47ade8vvfx654bkm2tjoccgveaoo6uno0a65zxtnnfy2bdvfsovh',
                direction: 'SENDER',
                transportProtocol: 'neonqbm9eqws936hkjsg5c1ommarrs5a1msndjcvleo3e41jqrcbygo0rvqm',
                messageProtocol: 'eg99r45nzkayqecyhvlng9jjp5vv3uafzkid0h68xlv3ez1holvauvkelik9',
                adapterEngineName: '9yytvbnmxrc239r6gpcpudfcrledzysz4pj9zuq3f190wsmxuh7ys86qwdyulwvm3rkdhxnbfcgsq6emw1j9yif07yzo0f9on82gr50uhpnei1vwh8ha7m56z9v6asj5j3np253wrcfzuyuhvhe3amb12xpgxdrd',
                url: 'tpvjgi8q6ozk4phdy71k0bo44h1sxl87pvw5zb87l3h4avzkqsn89524uitrp5duk5kcxgrrba5ds146fp0gekw7xs3ixat1tdt5armd91ya9kgj1vwp2k6ie6t0vsdiy690zduym28vr0hyff7sf8oy46cnm5rvvxo5tt0h7okygjdz26tmfchoa7kuk4np1amok96bnwr7ecehbtqvtv8c08s08ey056npjouqd0j57bj87m3f8wlrrageve8rxj5hmu2i3ufyet7ry7e9xkkxukp5g4epbehe5qgit55azq05d2mh41nkruwq1pmy',
                username: '5yha0uwlhco0sfjbn9z1rtsiw526uheabkqxer2mprff74ksea1zyncy3qkn',
                remoteHost: 'mq9g9an898gi19nf014bu2fnt4ldwttw76lte6rfgeh80jhvrc9gbdchgo0fk2ltc2vhovgrol1zro095h93rvrhim3bcbo8zneg3277ibh4t91b5sub1vkmt9hpx7gkx6asprxyr2ngxg1oh86jktxe6hbqmqco',
                remotePort: 8925419627,
                directory: 'mpam8pwc2uod2modogeawsfown0c8abcjq4xjufmmd1sv3jrhcnfkgfq55zf48yamv5cmr7p231pz2mj09xg3vft6zs2wzxdw1psjsg112n9pj4syaq20tsojheqxh6ahqxre9bzomg9hxpw6zi3ufwzdgzlerliiyyztpb0k161hevtoaw9hu14rgxr2h30wyeqezkhveoghbw58eu8rd6rnjgwig9yk03uhdc7dr035mudytwb2judb29pqejhaxjhce3dsma85j9jd1agx7zu3unqphbhp2vybtezs0srbhgn2ai2izdzamox413zoddim9ow0svp3rmj7ig20sk4t6997f8ca9v4ysop984urynbyt8py8l54u1xikh7y3i6j4pgpo8mi0lhmzvbv5r0lyxr6i96uwtkzdbge7z3jbqrz389gqdthjyckte2xqumgpwd9uzp3sw1cibrsu8f0fwbzmzj0bteftum8bp7zimczgnfftllhw0w98yo1xu0xfybujy0xoe93t9oaq6n8gn50nfzjp95ls7f051dh9rql7inad6j0y8u8sdq58lkdkfcruxvk6gasjdzjb465l8122lbo7rwavijfgml91fxbwwap9d4tpfv8d34b2vmocgbzl7iems6id9qg88zdjopqkolptcgxjw8e8iwmudr7y78pz5vhxnpl3k24ix3ep41pbtpnh06ipd9lwd6nzjou9fmge1td2v26xm6hjcr1gp6p3e4p6iy4bjsso2bv3rp45u98kdagmi5cflopzd1quzgzqd5y6nomd3j0jfj85dsuswmsy3gpgow8j7oyvvfvzcil6s2ev7a95h66qwnol1z7xrbne2u8pgj6xaknq4x0jgnb22zuoo6ngjfydl5o7xq5t2mifmuqsa3v6o3t0mg59jey610hr1r6qkorwd06xtm5pixxv1pkbx0pzdqnm4annd0vpyyo4r666inhpxg5jb4xpdm9pc3esp0aobx22nvtwpu5pn7',
                fileSchema: 'nj0zkh625x86e0grf0koseoh3b3zw96uto1ty443x2oi42k1ij2ijw165akojs5vi7hojuo1y3tfqeq7l076q5v7luuio5vjsntr3upolzofxcfxzazeauen89fnkzyy4gu6cp74e1r0w5uln2ai0t6nmbkws08buq3cgh4pcfp5g42fv6mc64vwlo88e7ivzcppirvg90vs8lts5p71z6gqmqllk9lmvwh66irrfnnuz7s51e1wknzffflk1eni4bn9ramealkikdhu44k8mrtkh52e8jq66si0se5bbvcrxot9l9y4qba4341kqtskzpsjlq1bipy6jf64z11aoodveqzynu66t9ctnu0fkogk7o7s14alne0yftjvrzgzuonfkcph0ft4sowlzuryybl8m2xzi0p4rvektwh1okvbp4efod1r1s48x0gvn6tpt35rmayifoaweisc16j0zlxzwhu80j3chvmkmhrfezxq8uftlypniykym44vwa29836jzhtk0pji94hdfgre58hvly64166cr7zc0n0o2ldfa1ux9cfx0has2ard4j8h7qsza533n2c1lk5qjuy4nnny8ka16qwqxkd6laesv9em1hy3zi2h3snrt6zm21upe4gvi3szih63k96sat5n9h2itrw0c4x197l53lqfg33uwr9xon2mv3wp73vsygjypmrus058w5a641426wjyvffe0tvampg32whkvyafy85b5cjpiim2v0y2c0ghhv2xmsbqx5kn3zgry4npcrpq2zw086izunxfe329uchz4un7nl1cpns77xlc8rm8jd6o0hbl41r3akx2timsl6rpjtp22gwf693nxamiukt0m9xgku1ttic46r0736vq45m63nyg69hryem1e67b6ikefgkvui8jct558o68hokdiejqjdpgmcvzdm8evq8s0m4lsok7cj9k00ynz7qysugkj1df6abbiahkwbiyx8t7m67085ubfeisxj2o33fsl1ku',
                proxyHost: 'cdlq8edjy08y8s1ua492j4iqqyiu4o4ik54tkv9zba7gxfr4537p4blcqdmq',
                proxyPort: 2381140381,
                destination: 'ncg1qkuatw0xz3eiikd1t3l0ssbbeio8j866p2mg6ooq8gv473vpxgu08kfdexspra9umpeupey5x1bmn2xwo6b8e8kd80zlmu3173s9rqznt3wzj33lu6q4rjldr0eaua8awpezc4puov0f2orhdvdmlym7yj11',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dimrl4fzv0nazk81j3zehwxzaa0jp5e0fityhekgfbs05kyxt2qfo8px1q5u8t1wzne16fvl9372joii1cjnlt7nowyexapgkcht2vuuvhnqv3owb036vgi4nrhcfhrafmmg0isg5av4ahowp93r0cfrwcaj6v3x',
                responsibleUserAccountName: 'xtvekblfep4qr9qtf4iu',
                lastChangeUserAccount: 'l5of62y2pemhwzao09xn',
                lastChangedAt: '2020-11-04 03:38:24',
                riInterfaceName: 'hl6f3dkk0aqichrdafcdwmaqzkysehvs238fk0hnbfz1jrgza9pj33uqqf9u91gop7mwjtvnuopzbg8imwj4f7p57uk1pbimuysninysdmydamkg79gs9r317rofykcvze5k5ijx6w7p0qfjs13rhrfbzhv6r9rt',
                riInterfaceNamespace: 'yxmbvkjwmqpn1fefbxae5che0iancs5ectcrvv0hk4w6dh6dihwe6nhk1xvg8zyo6a56tv49q4sm5k8koeddu3471kqyauo5py8edj6iur6l0czorkej2g1uq4fpvqbrvec6n3sr0a3sv3idz9hy9sxcy0tjmdsf',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c2463cb9-0012-432c-a364-0733a3e96f79'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98'));
    });

    test(`/REST:GET cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/0139066d-267a-4468-ac36-7a8a871d5542')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/f4c63c21-b58a-4c93-81de-8a07d4a9ea98')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98'));
    });

    test(`/REST:GET cci/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '9e5d3bb2-bb54-4796-84b9-9253ca7f3ed7',
                hash: 'ne1a9dq0wakgvfxyjlhmj21xouhhkvt88rk66qri',
                tenantId: 'c686e080-6cc4-4a16-a560-09635b5e0971',
                tenantCode: 'bdczx4ngyzki9z8zaoo1z9divo7fzkiyllt4mbb0688461igrf',
                systemId: '821c0ac6-b810-46c8-94b8-c2267f9d8be2',
                systemName: 'siemz33nd0u8a64l6ien',
                party: 'dut4f1ewggnqj6fcu4443cvervg61p3yi71hpj1abxrq78sq6ll8847aic17mznmtch50tzsjbcy126htjtgo1ges75il85a2itrgt5s7nj5qe3lnggk1q3rh9q6fd92k65d2xtttzrb75hpt3kjf7ie5q3k20hd',
                component: 'hvtj01u4ypvjkzk7myecc1a7zohtknsz5xu8bidvtuha08436sv9n6wq3beezuvh7971v5ud37u04gqp56f1clssrltw9s62ln4sboa8kckjglo3honb64bbhc6o7b7bexopq7qmpg6rmgdoqidz6l1tunrgch3d',
                name: 'n9r0nf4iup20yo3t4gz0mn1fdvqsebkqkwmz58lcezelrnrujsnrxqqxlu4zugm55hmrvl0f52mx2zk39qi9kqcbiexa72r8o71qnk38xshr18r3wja48x7daiyge0mz8ligypr4cl8d5rffocd8jeavg8t14o3n',
                flowHash: 'x67u05auzuar2bi3d5wgd896t67xgd2es79o7l02',
                flowParty: 'fzn084tziy6p44sjfm9giev24p9o43x7h4jhpzx0d02yimcgm8vd4m7pm52xfj183ix1tu0yijip5fzdyv53jx3n111oqk13zis9115c27ulxmyk77malicyizkx57zdp03gtzrr8n8wcvkx6s6o6sougri2l1cy',
                flowReceiverParty: '39hhttm6xlsplm20a27q6jp683tfz5pxgx4q6suz17plhuunwj69j0a06oel8ozr2fiot0h666z791rh7n6inw6kilixfxb3z9adzrr6grgplbpt4cxs4j1zi46qr3lizie9e5in1w4v9zrqzi018wqasky4rnoi',
                flowComponent: '9wjfocr6kxlcb2432aqtqhw6v0pys504uvegcj3oz0ufh0udwu6rg2fp2wt9klggyw6hyrxjtu3j74xikivwoyn3lj8meqgmg76w8fl9ic38tdyxcun7pghyha6wpdnin1jsch6hezi758nipmvqf1kzpz0wa47z',
                flowReceiverComponent: '7d5j2mofd7u1j8dtbgv05sbm6zp96uw39dv2u5cospcp8codr7gyjonig84ao5o5uhjtxb1ittwczi86s7kvbhb97t3drg4pt3yexhulyixt5q23y9ut9wg66lpm1w1yso1pa3x81kbuil9x9dte5xs93yc954gu',
                flowInterfaceName: 'hd7gzoesbd6w2bjayzz2l9ob3rxmwmc2wbj215tjyy2424auhf4hf1ajwn71q4hapfjrk0eosu7uhgagexqawchbnv0irf6ybaenav10mddivism73xf9n2cfz18axuycfsidnm6edhh5ttn1caxqpfrshfyyfpd',
                flowInterfaceNamespace: '6dwiqmqe4wpr0e2mnoexd0vnpo2mwsljtfbiifzz6kggjtdosf024obwpc2gs7l0tptw1lztx7andednhxkt4or2ohq228um7w1kus1914okb2lpqn54gzc81vckztcb75406dj3nu41kkk13h6itynsyfxumzls',
                version: '7yt4dge6mkserwah97zj',
                adapterType: 'o6xcgn7nrdhjvsnme5ak8g4l2spgm3pq22dpiz3ylraceqxkwu286z0ue15c',
                direction: 'SENDER',
                transportProtocol: 'cvmzg4asvc8ytuqkx3crpen86ygnskm86pxd6ihqoxw5m4mtmza9amd32nw8',
                messageProtocol: 'o1v3vf3hhorwx2l2mtfd3umatygt4fghiywg1h2qk00kmdkkam9h25k7ighp',
                adapterEngineName: 'o9vwqz5pufnrcjnj0o0nwo3ff9e1h6re4g8m572d4bliyia67to2fk68v03o3wnp8ocuej62hp3oqcx55o5fnlq1atnjs2ae42u57jmec2db3wa1vjudjx0k5xh5ysx6vx27o40uw3nz9kq6nc9a70i7i6c3nqry',
                url: 'tjf90yycm7elfcp6kcgeld2hccvh7n9a0u426p509wsgrhdcbobjqv79mmbsozmbziv66fwih87yuazx10x2jkpc6e2nqmt83aqeoyc4i8wwih1dblawgvjo9j5fo7yxg66jd1hc0ynz0etlwqo79a47mmvswmewkcv353glfkx6t4d5fn199w1ceep14qetu6ohiyf2zcxfz7i520xrdlnyq6ma2kv5iyjdmtht0m3le77ssh9lq01zhp327ls1pnc9f5a7qgb44vbsa4vt6dwdd6f08697jm8edl6v4qp8puvck4qyv4u86r9exz6w',
                username: '8lcxspdkfgq47095vifkp5i1vhxv4kbxwhhmywqtfw2x7y358lib4cou5mht',
                remoteHost: 'sndhebqxr0c6sxan8bg49weowwxrfkkmy8hooyrhxcobqo0on1oqjk5z16whusmykndeadq2f9yl88oyk8vi19hvjlciae07tksflpjds43nzeg4ycq1wduldby6dq3il35axcr8o9g5viphfrsae48p8io4ochk',
                remotePort: 5564285679,
                directory: 'rpubbwlfnv0hlowlj5p6o9ni69p1h4082xh6lfok8cvk2iiuvdj2gmshfdezfhufd46r360c7bknemjh9u6n5eo28y032byuep7bipxqsed84w7wa6awe6xvqcpvqwm54zapcflqpg0w9f8xz5b903s7ols4yapnngml3wy2h3z867cqaw1nnzxedihgconcyi1yqacjcheny6ebo10tzfas308dfa9qqd442ggfbhlgel9bm37k69g4o1jevrfm5m2qjhk29dkm6pxhbfvdgzad7hidjpbpaj6pjqblzcevwngyhlcfs97i9pn2e4v87t8l1grfm39oxvup1l4gtskjrdf8ass6t649iogeenkhkas00qj82d9xwvn9pwd4x8jzsywbsi634o9vvgxisa7ix909xk0d1dqrfnyuibof4rxv2pbfhw8q2m2qgv430zji3h4q5eddzgumqrv933eptytontg69y87aqtuq614kuzntoegk1wu0xc6nvvcqyq2eyi4ndwqm75vb3pwhbdc5tnftx9d28aftlorcd4x5p8x73i3hnbuerysss2nv2iv5g09bn1ml5nv0zyvxne8dc40chkk44mqi96q5w7znkyqdchctds49orluwp6hr7jdxy2h8jg6u0eszc520oiqlgpihg4wramcat4j29maep1ui4agj5oe1z2d7hijreo10rl2dw6gh6h3ytfjqfa7xmm7pptbiiczg4h2f8zfywj7jmym707fx3vexcnfn82w6wjlnvr6uo432fnetze7tkdic7u9phui5nm4zeoente1lvhhdtb7mjnzwjlficqh1yim9uyp4mgiuycf5lyxh8w0y1xjjsahyhl5fcxe8916o35uc3946cp0gjfhj0spja65tsgu03wbc0w00yyhsghi8rs3asqegq07gncm9yd1b0r78shk6jt51fekat5t943yq42ewgf5ddc3smop33y35txgj1599jrrmt00rmsuhf5bp089d7syhnp',
                fileSchema: '2b12nsm8afw6udg56w61ihv8eq6abn4hx1hbcnaf415r91509xy67e1ufgpnlx9v5mmxzm7au5dcnqsol54f4u6loi1xc5gye9tbj7dj8xtw0u2vg5bgcf4usqa0lftxntvynirv9d8qi0ui1c7a5nmu5k4l14l04fyigwclv95gtdf8qzwzb83qba4kh9pmkrxs7njhgcyijdj86n8vobe7begxjucyok9svgwq2b5dqgz588ua0hsbafeeuib3h6q3fq282a7plaglunfebypvciuh50d6j71chfuhx9annhhioxebee1pniv0qlqk04a108yndmk6qpy7qg8vz0ubjdg14eybhlfwmh32p1b5ta4fffbs9ei3gli5jq44jux1sterb2lg9x28h3t1lv5yx4dqb6yyw1osbvh1bdv7kfoj4trtj6f9frj5uwwjbkee761jynaqlpl3ttsbzg7hzz5gd95ciyutm66qk9l8x1imvs2pgcfm2aqacutaxwtirjyjyro3mt1o2z37vxcqo0c93vxdj6s9zi6skgr3z0d0os308n8mipd7hsra5a7jc50j9cnh5gbq1zdqrmkwv5y42q76gysjuerzxzu1v3vbvhlafg5yxnvzzbdso1jfnwix4wtcuqigp1s63ttb71y69kg4ozzf1d57en6p7jocf0j2owhdu2y9unv2i8xt1d65ocxltwa72wlg1pz55qwhybjho28u4gcb4ds4s2brg2avizll0gb1bsqkm8ofjzixtr95iv4h4cajdx3wwenhmup9p279x9ja2bcd4fgkd26xpdaqyzdy0y6xx4fl0eiu0s6x1zdla79o6em3pm0e6e9fxn6zmi3rm87nn8o2kvul3mo1gg1icgspsphszvu5aem0zww7ck4vk1pp31xk1gmimf6sj9utco1onx2tjgubsxe68jfbbcvw9oll249s9hpq0ian1glpx8ki8r45jyb5uzvr1cp3fuwk2039r8l2e3gj0rjsuvcc',
                proxyHost: 'hzcvfoh1xor5inhybq4cwtllhlpir6cr9eonoz0tttz1cxa1mvcdw5qw0w7e',
                proxyPort: 5646545414,
                destination: '4vuv3ne1y6nh8yfco1gsnrcevtkmzhrbcm0imzw8u702zi6rq2e8qjg1zhv99pnihcasq4ze6xl83etqz7qlvjkwv0a7f5t8f65xn35y9cmfi0fjhehmfxxw4gxf58fkvx6mtz1tspqd533qia9rsf8jsfmupdn2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ogxe25e3at6gvvm3zv221dg9841dvi04gctuzfz5etxamcpg21p3yxhenmnchqhkmkr9awrsv2zfize396hanl3lkquf0qeoc47qss9yy7ucfptpdp4ibpoqah70kdbf85rdryam96q0kvoumohtw20vr7fldjtv',
                responsibleUserAccountName: 'bcwhabh14qj0571sd30j',
                lastChangeUserAccount: '80i5ay8mboyv6r6skwp9',
                lastChangedAt: '2020-11-04 13:44:21',
                riInterfaceName: '93jhnnja7fozx498l81khmphiegjo6qt9xtax3k4ockuype7tywim39j6lsniy3a9dcz7hxlfc1vrpoeweeti6gvfygm7coq6zxcahdjtenj8q3ekfnkvkeelxgchctzmm8ow6k9nn17irpnhpkmqad4na0zwqli',
                riInterfaceNamespace: 'z54hccnt95bkn68dbolh2j8gj22e8mlkbsm3ky359vtfqx5a50wkgun1jcxr0gpfhxg7d9psx78btu716cqichboeg1v7oo4qshgxoswffepvuq2r2w3i8c1zz7bpfgp92pd4agrey6q1xpg2l494bdix8hkj7zg',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                hash: 'rei3arkf663pwhnf3iqli1xvxsaq94mperdmvb2b',
                tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                tenantCode: 'i14zmjffjv3c6ls041hgz4xdb5bexfwi439zo8bkgvjsq1tfvh',
                systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                systemName: '4nicuph74geaa2j8efbl',
                party: 'lx9k2bn7a66fd47rmlexkd97eut96eeijl88h8lfq8hwdghs01eunta9k91jxcdtb9pg6ntglpvlgnxa52ikjk8sg6hccg6m4n4qg0hj33bvsu6kuwactv6u9vz85eatvg8m20osl5qyqhqsqbdjhlaw0tsqy6x9',
                component: 'b5d80o3slai5d8i2qvp7utmd9qpencchs79gynleze4blaomyfs0b53gobnbp7sargpzrcj7c6zsl3d30km2l8b9ujtxgw24m2ql0bohg4e24umwv2x6q52j7rgqioczmdgt21jphe32s4kpzhtcuh4nvqswsafl',
                name: 'e45tl0gldoijevyvtl3cr0ovpm9k7fn4pryomyic0il1iqsuyaxrhwj6yj433v52byo5rc3i42can89jgzhy1q3yrtxuc1pcxxcxtwjyfi5sd4d1llfmwvp81dv9coxbhgjdd26v7iut2p3ypm0wd7ppryhe4dl3',
                flowHash: 'i3exyqxtyna55fsdnw8xncwavhts0a3tfk5bxtt4',
                flowParty: 've9fgzip6ibmqaa14bwbb0gv0mgho11b22vavl2cghbqt9gwe1no8adfbknd7x0i5rpzp9djzhrpugtim3im0hzo1a22imckf5sdshcbhpkx5hyrbf7rqv54ge7q7spfhsai99rzvaxqwpugordgdt2lhvpvi98h',
                flowReceiverParty: '270asqiqu1cp83w6mmz0unfxx7h0edj6lg1dvw22yo4ecl9ar3xkfcxdqah2txlvskmo6dzijxowj1aq9037c0hz0es5wpjboz4yv0w17mccdojporrk4jcqqx3u00nb2n8t4xo3jzkue99pizuenzjnh1ibm3ek',
                flowComponent: 't6yw6t7uxav1hqccvm6g0sdyty7icc92ula1mv6i335z666ssswclj1tzmxwivglkupsfgjyrueon3h65k3kxgwne2rsjm4c7wf2eayfuc8qhmslnbrin98xau5n7mfstrti6rd40kz6oh8ld3t8qlutdnd1ffbs',
                flowReceiverComponent: '50ukkygw9gdv5vpm6u33c74nf4v35ksr2byutdxe0jw1ckmo396brtoql9r4xnmytzi4hwu5h43yxm9vqtegzye0f98f356c744tehh54784dmosnodjyc9i039i0xl5quelgrp3sd7c4fom2ljja0mo1zuiu623',
                flowInterfaceName: 'y3gg86sr1wcp69lx1aq42w0jrptjrb7qz151hs8qj5nh7x8dhl7uv35z9to0ptah7lumw1ng5n0nqq7h8ja7v4p0gmkqdiwai3wv69ljt4ljut9idh5zucoh8ak3p7c47r9p5j1rpd7sz35kqsq3csc8osaj27d7',
                flowInterfaceNamespace: 'poezqpa4zuw1pr95fgc3fd4pkhrmxadboc0m1u09ctzct0yt0spsfppg080j9xwm6ocwzgpko0y0tmswkmmh1btabfoclwxpswvnmrweme02qhq2rrwa2q1ve3yyeajhy2a1l2o50b5pg6w0lwoys1uwivf91wyu',
                version: 'vebg9j6zuhc37pgfg7hn',
                adapterType: '1zycpg9ubtdv0l2hatuze4zsmkn5lug1xkisvun6otyd916gp48m8uu4djpz',
                direction: 'SENDER',
                transportProtocol: 'l78tgrdkshvf89aci1il8ab7cgcxop6ke02l5auxarrr5siwy3io5p6r13bx',
                messageProtocol: 'mde1xo42t5hktft623orou1vvhf94hq78nbg7ny0wlfczwrd4h01f4us8r7e',
                adapterEngineName: '7mlfznpaiye9b1q8bc6hklwujfxs76r225gl1hzu20eiaq2cbcc6v8lujbcto6o0sac9ek9iu66aaxs2vfjkym2glyrczwsj6uednu2syh53wz1zuoxcah5qbkcg9qnwrzx5icv5tadxc4rbsmqvh1ai9f9eghx0',
                url: 'stqr1q6jmuyo411cp7o306cat1y6lt5gjg7q5mzo0d4byix62ynb1e6050ijzfvle5ipk0jnyfpz5pqut76o7q531nav1s04bt2ri2ewbgd30hpxj2l6rlrstzpb36sknwdgihnz7n3i9sj2o16etxj7n8nhgbiyi8jniaubxovwi1gepl6g19kghmi1aat7tlixhb9zkvxyiykmiiys412gobwca7tkswrlmoqp5477ndjh1ax9gav3mah3kegtlcwxrmmvgld7e4a45wdpwl56fmdqu5455qp9jq9h6s6ult40qo7wietnu5k78cau',
                username: 'osvhmgon7xd914n7390rew5piucy2y8ctj2vvsh6yph2bll5xjjm8x0xofqd',
                remoteHost: 'fk0xwdp5ffib1i3me81h5ok292b6nbvhmq98fd2npgo2v7au6ztdrva60kj607q9lwjjzzhtc10mbj08vs3hdgq7srsuvpr039mucoud2yr9o1esl6jq3ytbh6l83qoo4fj6s2353rkwzw6nl6371zcxz1y6cy5o',
                remotePort: 5662258038,
                directory: '4rrbcz7h5ssy999l6o92eppi4w6064ux7rlybmrsw54y06t4tqsdc36syniwxx9z4dohbbpcdlcse7zeicltn98hqzde03s4m9vke3m9cvv3pkfzdy6n9i74xiiv1l03grkq8zrsd6rqfwtsj8mlzh97nqfq4cecvz66p6xo7z6rx29th40ef6fbktr1jw8j9lx2dnc52rprpih54j6kfkvgwva6sd03acw8ga5zcns22j4yurz5e8x5pq667dp3jwaqf6xvz5zppscz8jbsd31m274o9fbuovbc0bdayb3j79gveninrorf1wpzceaujh1xg8eiind8g25twtibk9h67jh10qoxxf13jlh87rtinzw6k1reeq9elso7qdqke2u6d4mgwc5k5nqi1bl4veqclg6x5zbvxb54scrl9mu8yxrn4jbiqerq5kd4fdesu60qkyqa6lnsun0b3ygik97r1iap26mfh1aosv275wh88ff35gkh8tw58wuqu55tk94wdh5960nj8ljkwqc06bmo1acbz1ec647b91pd1t59jcnq3y235v9c5jumwn40w0vm50jp56enc5zr7u3ctslpwjz3cd2n9kibdh10e90aa2mk2h6iqitqk6w0y4jc0n8olzshdvyfzhwmsqmlzbsf5hg6zfhr5eb1i8id6btq9vg4qfz694oxkl8lgh8f5r1p5ecjttrvooyny46fwym9wf79nlkatqn2v8imemld0z1r1yre0efgg4dzx92999mav68ita97xog4wg92kqyl5zw0xct2jbrcgpgqhmdxlcy15in1g5xof6z5akp1llp9rcuozuh3zieqybxe4i7h07wqpffuy8vhgr49056hxp40gj004nla6xu05eifj0369xf04q8banqsi98puz0jk8rcbld80nqgmltaxew85cyc1z5d8cs4znrpbwyyeepehhr34ehjlz573s1g82c0zjl3gm662tqfmwp98ag6kxxt2f62v1nbd5v6kc9h',
                fileSchema: '111nmhyswy2v70gnx4si6bqh7k4t0tron69bwg8eia15z89drlm42ol1ahg37t4agnes8cng5fmewt34z40wn3om22rg4nz3p83y1lmeyknnw7x9vmu9g0s6hvu14516co08jzv7gpuc8e4aik1htnqavhvt8r9btu8apmparxomdnvltq6kkmnek3jjskmhztxh2f2vid1dkiuvfkn8k78e3dc27xrcocu12h3dia8fdrurqsk8e9p176gm4r7byy41b210iojwftgo1tqrtcrybfu3ihj4nkensjaf11ou76qb40q5ky53dnu893j47n2uxtebvr89y5fa898ahcskgzsa1x9hwjfib995aczu434z9zagkjdgx74l5k91ccrodo29y0dxavw0dllyo7t3r1bgdqx5pft0jqw6az5n3zc7qi5kf5vl5uq1i19msmjp1dpdzcs7vd7ttcljsix534s2e6txtgjo0j26jhua9jtnoak4mk0h0s9lo6372n2w7w91opr28swpt7tn2xxk5vbehalok3d688gxcgy96ssnbfrrmrmfabunz8axyiugmxkxasa6ohbyffoxa0vdiptg6je5rfi37eu21x3qyqb65zwt8fsxie94itsvule00m62hcuem5gh92bq82k8aq1hoyf27qq607rqtb2r1em9ee080p07mtvfu79a37u9nqbetqm00ab9h3ayt7yieb1n3tfo1xs4smiqeacinhhifg219gboxhv477s73ifc9f25wwvgr1k7dibtgyn2wapc6zdrth1hxdpkf14siczc5o4euza5j6aiy2h8li1ea3pzzl1t3zwhjenjm87w72eg5kl9c6m10na9b50dd8bwe9dfq0ibwehf1yjz3vfsksssm5rbsheouyz5p5cm25rqd9lyhp6pbaqwv64fwxy3470urk6z3jyn7mywqc14pbq4i5fe8tggu5k6d0xyfwmozfay8f9le0tryv7yfm3lnlcqvjngxyu3lp39',
                proxyHost: 'i0uc4t0gl4ecwatsqpyi71geupfeb8sspj9wtdpb5ri2qbox1uvqv39fyic5',
                proxyPort: 7903064950,
                destination: 'nqatp02cz1l6dejjb1f96r6z2xfo9pripq59l2xjdsmaa5d6xyfyrow11eu1ojlbtes6utynhj0vm5b5im3s71uezat2bwcanguw60j9mwvq0tog6l1q9wp9novgzzpbel56sdx535p6hhi8383mrwbhp002tgep',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jer3vovaawlf9sjy5a5nhn8pk16q1y5he1h4ogdpkv2pmzcdqczuwfqfkbrzzx2qg4x9lc4f6yjj2zzyhndlhtfwra6or45gg8wvmhrl75m6j0u4zvg42huyaifs6hz437v6efe4zuebivld8erd6fykhca978ay',
                responsibleUserAccountName: 'qx7hk1g2wth3bsvr9urw',
                lastChangeUserAccount: 'v5ul1lmraecwtkdcadtn',
                lastChangedAt: '2020-11-04 02:57:59',
                riInterfaceName: 'aoyzqwxh0mw7oi6uqpfweobvaroyeyvczov16qzyz7nipzh6ykc22zxndapgslxr46j0kr3yyfm8hlq34gu6un73n1q6rrg8gm6hho61lh8fhzeec7uhso1zaxbeecalmiy81bevaju0s3afj6loql7yq08zbiol',
                riInterfaceNamespace: 'zs8hcw0vqtapmgk2blpktousaidleu0wb3s4nbki4jogf53bkjdlok7nvwzsu3wmnz614zmc23imgpqyk29w14h49x2p2kq14r5us2i93111k59icri8rsn4kqgk4gh5l9113s5kzkoen9zvne9zab6nm8r3whjr',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98'));
    });

    test(`/REST:DELETE cci/channel/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/6ad3476e-b971-4584-ae84-35e03b0eac32')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/f4c63c21-b58a-4c93-81de-8a07d4a9ea98')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f15b5d05-ab17-45b6-9979-6b6e2e462baf',
                        hash: 'mqj3ajv0ijolitk6tqes3eg1iejobwy7x72fgekk',
                        tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                        tenantCode: 'bfar4fopl9827cyp0d9wwvxqxxg4z2wl5tmmiunb24vtbgn23h',
                        systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                        systemName: 't7oga2ak6ahpjgclyl5o',
                        party: 'jtvsy9hxb8kowwqps5kqffhpfpth1reb6ufs8rmf29fffnf4svb5rubhfpwb0vnlf9nqvp9rmophqkr74unnzubxf90djduuo36op5etzprsgpfy0uxpydevmxoybf0k6jhb7tzdo3ytjpr1a1qi9brj8exmglhw',
                        component: '4lv6orn3w16b3brtlogzmt57h9vszi05zluieczdmgyjxphqlth26zlo9neawri0ic4prnz36zdwyojbsv1g0mvcbmwib1dgb1qwenvavogr8844samm11yq25r9sm6tl61juh3pgadg0e12oftceo5sniqqp2d4',
                        name: '4myy1v34yzbutc6snc5lvnq5tc4p97h9jc3v766qvspqm6nbbn6tm7y7eqt89edm8sej0er7i9phdkbal81255hrh8ici8s4ufo87ulr31wqq1ihxoic5181mv8zltg6hlzduzbx4s8igl8ccfwiy1ykqzwxfszd',
                        flowHash: 'lkqtd86ii2ptsarqda9zqyorhwmqa6fvbahvra9w',
                        flowParty: '3u0wzpp8yovcc0wfgqnfqdt6tw93kzaef25yzaronicgvlccd5h6ti32v19mdnhljaucox8s1qufn2qy0ktrhwuymcb68fixnzddd5yjbkowh892d0hd9pcfju2rfv7gjfs4wp7sgra6cfml7uewf2jhqil2g95x',
                        flowReceiverParty: '7ddtehc1660xmbios0pizu3x5kvg2zky6r4eat2y0gqsjnl72tddj442yjecbs6sdl9e3gomh5t7o9r3upablbg42jttgfxtztrkrt13z48ykg883uks5ztrwq0ppbnsv4wgpgmz8wxl8w7ctm3z30bx5cc7kvzt',
                        flowComponent: 'jbtwudmlvr4tqt6xd00ju19qinw1x9amsipbkukkq45vboapk0kql6mpgk9ts6ukjru2tym8vtejmg7vscizqzpy1scoy5s1eunk0s33spuqy9p935q0ltl8c1yafbhdg2842q6ykmwnxsp5iickijzi2rof3ann',
                        flowReceiverComponent: '8lmryqwkjqu6igob1nn8qv3p81gra5x9qaoutqxgc3rbw3rgc88tiel2qw95nx4u0fm5lx5exgonu7c7o1g6lqvx8nymf4k8trukldbuzxg8twkgg6ln2f2rv2hwxq6amhagr8by064wl02miwbtt4ep960hr05x',
                        flowInterfaceName: 'mbddu4xjq4mae07h2q5cwx73gm6cunzakbps7j3lfj1yw3xo79tshmfeo4ddiqwy7u5mberxk1ix4muh6a4sce3abvt42wpbgedqaiqhpi09dqcqklxcnpaakhqo3j4c12kukgtc45ss8okzladjw2dqi1jbo4yn',
                        flowInterfaceNamespace: 'ihf7wzktle79qxhyh46ymvqx7ubl28uny0f8r13lgxyyb6pak1ggjs2datl4m8gp5oqj7diai1tnxtz15hj31mi92xxql9828bnn80uz74mswomip4ep7e4emkq50yyjsj0se5h1fqpkgg2wpx9pvs9r4qa0vfr6',
                        version: 'ed9h34wsg14nlb5z8zif',
                        adapterType: '4xtnm6fgmjwwwhzm1ynjiugpod6qwwkqofihtf5131hzhb4v85402vq5ay7a',
                        direction: 'RECEIVER',
                        transportProtocol: 'prb1hpnijxln0e5oljbfifya3o6iswctbcyebbkpijw2ltyg9wzk5wres61d',
                        messageProtocol: 'jvcqskd2dyio39aui05jqzy099jr9iqt47rtdx4b9mzif7jiu36rv5zhvziw',
                        adapterEngineName: '45irbomy0deiycn4duadz8692hhjly8rtz2jh2o3sqo7or4xigmle3i0zpncca18vqb5bdp8ghf45ahje3phl9ay152hg4r5g6qa1ig344fa001fypto4sjowodxe60y25383rezv694w6o522f52umwgziaqxph',
                        url: 'j3ldhj4100xmf492s67psbzv8hh9ll2qtxg8aqw54fmy4ymt6qztyjbwek722n0e9ghbqyoejo3eu7qehdmdmktp4ok34oilrptjb9wvaurc7ixn3gsxs8b79lgnpfuntbu4zu9flntpua9pdo9hotqh88r1kxqw2gpktyra9jv9r1enbaszup4rneihzob9ubjpl1a46581uew9y1r75ijn0qe5hz5gvyjt0e2srr5xmhx1rxe2777lg8z75rnkh1c49rikvjiu58ezp8ix6h5ed602ulog9j71n8gslv1ptk80tj8p26ew707ezr2x',
                        username: '9dt7wtvi8q6lj9bd1wqs3v6r7iu2ebkya7awmh7mlx7mohef2c7hrs9xv06e',
                        remoteHost: 'zaaznkgwzahv3ouj1ibahphv5p7kkgmh52a204zhg5514mqkvbloc5ir3zsen3akdd3r5i77odww5o2i0drew5fewnt7s7ek3y58nq5cybzonwh7b5qg2bq3bzl4vhswmjumrmx0wtba4j9jyamaw4rh2q7xu1pk',
                        remotePort: 5963205488,
                        directory: 'ijl4gv1042v4ea99z39fls4g03kxjiv4pvdu9t6rev1hvj7209xpqlabv5ua7dgvaxinysa9fxkjrquglj7aztdaautm2t426rq8fangi0rmq7pq6qakgyyeps5wrd11r7lme2dpzfm647t1wbxgyrjx9z89mc3lb3bsx0zndj54fvv0g1lgpx9zgvrcovm7vpugyosdvq688gjlh3seutsuvojj1t4sc75eet2oe9jh4cradfbrpbzo1dkdx8m6smlcxpwtbpedho18ims5a4asc2imhbdx466z2nwrgozxg2nybfxkjixyrg9hgukwdoqnhj2n4oud06j6pgpmzxjjqjd4dm52gpsmv6mhlpc6q2zovum1w4sot9w88g2ryd3r47ohdbi6tc1atx93z7bal2kg2fci9kcmw6fflj0edym1bn55ch25mghq58fxg6hnf3s6cips1b752ff3q3enp4wqelu51dpzmbdki53711zhv38am2v6wqbitmwx6x5jmocoga3oe1s5parffjlpqzgh08t84vhgg00f3441ehr5lii5cp52bjjj18ab3ga2s15rfah9tp1tfhbrey4nzvqpoprby5ebykieo86flg2eqcwgehlcp19p3g1j313tnqjb5z1l7w41nxawrn1q1a1f7yodn6541cdhips8oclupr3puqdezjmqg08cpqmetcymiqn7tzvld41krd7jr830l9sjyz43r9z76ubzb11zz3kdle7s74zfymcsok2xtx3f3gwn15skj0nb7oo3kqoj0h1cbtjxnhkbex0fbs2px4gxry6emt9s14nybksx24re4nrlhh2op3s2128849b18fl4vpdwm6rdaeh4xfjnwzhyoms8kty59envz85b1de9pqglgpo4f7645uxihkk0blf91d1tf7hmjp6ozpyrd5491y17w1522broo31l2m5yxfp836j0jswk7fmnwx788rk3bhrcbmkrgsaw7rk5auxij91do7vqxhwv',
                        fileSchema: 'padq6wb02fwvqmqb02k1yeap1tupf9s8ndk3orxn0cczm60ieyrfp583868nesf756xusxcsj3uhay4w2uurtovi5z7557p3d8wrldd3y9f8tz33u15uzqxu9wx0mm6qxzysy9ezqwvydzqfx10c8c6w72lfciqtpo93jvnji1getr84ftc4fwf1j1l7cfysgpb28p1amfeb5nf1tyhy171r3t9fvvb62cgm0cqmwbplmq175gulx9p3mvmo30yx7drh3t45a9gjba244gfoxtjth6zuz630jt081qsgvu155c12v0q8i905fc4ghghddd3q2ndzd7msdy505u4jxla29pztto1ws68g13wpgz5gwri7b4crjwwdtvgh7edmz7sv5s1y7pnnvxffi4btmy05bevb1gsp1mnp14e5hwqhh8kyomg6cpxfu6ffvn36fgwutzr5ryu3oc5eafac6d5gqzq8p7z0f2hmj4jxn30tsi9nj7clk7gfjlih2gprw0j5zfd4r0506y6no6tyewmelyo1uk3niuirm5y7q3tk52rkn56kts8rlxe5kb5xc1ezyltgtgq5h648gmw7sugpshsdgvgv2nw5h6d32bvl9eub1a8ska6zcqgrrwbri4sda6b8rycko4wmhbeoavmy47v3tdbcmkqrqhhxnlprm6yhz7s3da28vm8zyoseqj3ovro4pevjbf7uvhduo4d60tyygi8nmvvyo8vzpv4s76va8f3wp88q25mtmypm0bm0el8oq7gotaxjizu173ok2ofx3s7on9yg8zflcg0vnh28rna3v7guedfiqmf4upk1yyf5zhbj0cjjff0z9jy0sw8jw9i7djtxro8yfww7sflx73l3g11chf1pbdsyayn1suo29ynn6uv91bthzptva1yhz3i5csy02yhq28efqpghwb5tqdktxy5eob9pkbj2370j0f9ayegjx3ku8txgnie2xfvoqj531w1xymuwph37fdeddn320glntmfq',
                        proxyHost: '5tdm4kae6wsznvwhjxr8kex9t2fdf66rt5egr110x39b6ao54xilcx0fg9kq',
                        proxyPort: 8870659082,
                        destination: 'yscfz345k0sy3rllplgoma4nwxjrplbzy8f7bnz1i37h09gkjegt9ape91t9s0f1i6tpu8jikgbb8xuhkxh2tf11vn54nqlomoyir9aaymr66dcz58zus4amevl9ildgjo0b34ope9rgjxrdak4u56qwy9ng2mqo',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '1ewspn2qsh3zo74topz2q63n8lme8letw7nof28ezbaw04ybcp92h0ve3jm05spanyfq3crvmeu74q3y2yld96qg3us4tzn86bdnojolvw9ilqlfnbh9otn0ax4dzxnd7gzuajjzo42ij8kxxv7kuqnyjbx04pbm',
                        responsibleUserAccountName: '9s7pggcn1a5suflg41cg',
                        lastChangeUserAccount: 'btkih0zas7zeftyngd6z',
                        lastChangedAt: '2020-11-04 19:42:07',
                        riInterfaceName: 'up2kshfs8f2k9ttl9lsphl8y7a5trtmo5tufb9ejvmekwxenm24fca5ysbxe743n0v76fp9kv6el1j4rm6ceen4yzve1lzwddzya8e8x0df3oi2p3wisw5h0pawd9ma8c9sangbp4s6qdwoy0bi8iwruguc691o9',
                        riInterfaceNamespace: 'pkhn9n67x64rleou21u7c8q57abux0vna0t4x6yupvx7vza9oq46zfiv5b4u21zyuwz6p4rjsf40dew4d2rfwkk3u1w5uofqp0u9q1imlsle77q8f4eziaq7x2ruej7fdv4cditqf93q2w81hfaum3ffugkri9g9',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannel).toHaveProperty('id', 'f15b5d05-ab17-45b6-9979-6b6e2e462baf');
            });
    });

    test(`/GraphQL cciPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannels (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '92b3bda1-3df7-4b38-9ede-02ec1d76561e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannel.id).toStrictEqual('f4c63c21-b58a-4c93-81de-8a07d4a9ea98');
            });
    });

    test(`/GraphQL cciFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0cd232ea-8cd8-43df-905e-4d0a177d0588'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelById.id).toStrictEqual('f4c63c21-b58a-4c93-81de-8a07d4a9ea98');
            });
    });

    test(`/GraphQL cciGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannels (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c9d51139-414d-4e53-aeee-8b89da77029a',
                        hash: 'wm1k0nihlwyu45oxspkrpehw8eej7w0j9fq2vgr9',
                        tenantId: 'f568e776-f294-43c2-a4a1-12579077fecf',
                        tenantCode: 'h7ixr7jdo21udk6j9a50jwtfpckyvzo7qj8jxtc6yzbklvchsu',
                        systemId: 'fe9276b1-732f-43a0-92fe-838348303348',
                        systemName: 'auii8sf240x9fjvd6rfo',
                        party: 'odhz3ri8f6ddoez5l5e6ubjt13dd7qs2fta9m0k28p7jqnoijuohl4if4a4scl33jj6n364h1x4k63q0rznbvdmlpbj6ojine37l6j1f7dww6zh0xhh95ascaul07ocj5jr79jcawvuh9l12m53g88g3q2etxwpr',
                        component: 'sxtbky2qhnidtvt4x9kw08gqg28c1wnw0hlk119f2myfg0t96djcslec34r8oncss7tqjgalnt10r7xqxk9c4rw9cqniwuvkvdjxfpgl73m8n4kc83j50l2s6g3rshz1o10ooabyngxdfe0j21npbdds3xzdga9d',
                        name: 'vnd11ccm97tee4szmwcttadpsgtmvj8md9mhmk2c00gciawv8xu89113jat5wwxut2eeiaohson82jqfxchcprnwa0iatob37opxkfxf8yktxzsuqgnapaq0bohitdfwkfrhom5kr54jt1gwuckxq0yrgp2430qz',
                        flowHash: '2a7lmhqy5fjik793hkiiickffvml1xypdg2iev6w',
                        flowParty: 'xkjwowgfz6vhgd7kp17l6liwz5ibjky77wg4aie144xuk5jnxsmhzlkzo8rt338fgu6xtqi2es7gd6elqomuexlsge0sv9t8bek8nozhsl1eteo3ou03ty9w14lcdv5p9rmzbnzyanos970wstrizso6jmfwknjb',
                        flowReceiverParty: 'obph0ntz069i1ujmrye4g0fhdtkvneacz0ewl499vc4ouidrcevls8qegge2ii0oavfyrxdaycszez3upodllq8fhwun5ysj2p70vsdnypjqvuzoua7sd3qr6osbyswbbbq2j8tns03h62ybg600nq7xe15hi1fb',
                        flowComponent: '4ao41besfzp8ff6eej73sewdc2a29yjhn9ok7bq44o2xrp258j0jz38gidg1g3ygkxcv5l8ixq5rnpe1gbur3d30s3fyb29h7us0u5om7b6dy4vkz0uxihlq0pxtpqcobbs6kxo6raszjl1kb8x1ggnxj0plfgbz',
                        flowReceiverComponent: 'zfgw3l79mkg2f9dc63jjteaymlsjlmzi3vauqth1fkf2w6ko43xwfhdmim1xaks6aqmrzrqrnjfdpyd30g46y9woumb2x579598q2vblfrc1r1xdmg7y2kqhf0n406sr97tttfszk2a0vcim8lfazbxsparyvc8u',
                        flowInterfaceName: 'pr6leldqwsbv1rko3xkvbe1k22stpbi8wnkxisk74myjybjyj8qixc07zwt4916tmc5trbl3y2rwqoqkbdi1okjbqzlicc1k2nt4f92osysc3rly0snho0vite9yd5cqflaq5sete6h0fgqsrtreweul9xy67q7r',
                        flowInterfaceNamespace: '51q93r1m21eujbuljc27nf843afvh2q3vt9zjdl2jxh8dpdaerhfut6xexq76toouqc60z47tp890jo0gz3qa7f7eeeswczasdzv49qswcgwz3nf3z18r8adv1wa5lt48mtwhzjui2nzpwq228zvxwnzu5hac64x',
                        version: 'gtybmzo12nrgclldap8l',
                        adapterType: 'ycaw8sv0rn2n8o06c1j7mepfb831cv1yazfedd9hcsv1kohwumigmvl6fiwb',
                        direction: 'SENDER',
                        transportProtocol: '090d8smb1keaohjf28gpihlkplgevcvjj5ltdlocuffckgfireqv506fppso',
                        messageProtocol: '5fkyyxwt5lh8iycw9mzggxchfkx48dedtsadbgr4ha8qkes3jdf0jz75m80b',
                        adapterEngineName: 'iwfsp3k9xvqlg93b33oi2kd689fx9s2hgtagbgfiv8tzhiz0hua01hsdovg6jf395cm922w7154worbxmpklh8mp4lc6e7b6qht0p5icl8544d54p3py24gi077emnxopr4ebh2hja981j3w5jhedbud5g8fjxv9',
                        url: 'jpm9873490wua02giqx91jk89doonldh5o34tqx96lofj12jad4tlwa9p4d37lsvj49qkl6xev98orkd9ifny84tgx4wd7hlwpos7zarca6ru5fedtmbuxtlx2ay2mw16osypn6euomot3ysq94lq8ydddza6y5m7l0uia7k0rj8kv2323x0mz1l4etkb6lkyicwjl3ko6cuqne15232d2wt8rvfcmhsayuvhcr54vzuyd8p11pyps2n8m7pl014b1ylhzonxe70v8q3zy1m88jemyve0o6elbsaxawenkpi5koalqdzopxz32abo249',
                        username: 'oficzm1zfdaeh97orl2bxyqyw84ew7ocwxp63rwczcndt0utqcuuzupzwso0',
                        remoteHost: 'ife43cldpubjqenvd5vqtvojbogsddxh01oqdqlquzqs4cotepjcm4mybepwqap5dk01hb7nf5625ceog9xw3p9ldu6zre9k4fq58ohhe3u6qq37545mr2a1s73nq4szaut0q5yz2c7nwwb1esvu202te14ck8wm',
                        remotePort: 8503863501,
                        directory: 'ao8tnoq62bbqbvj6jgtry36cfghxvvmzsbubhukjni6s38nwq01jf0ma0wamoqlmeqvh2vu6d58ke8060bwpj91kznb8hbdmsfo01ch02tf48mcqk5tucjlgkz278v8ten1bxj0t9zbhkat6hplhdsebnq20z2n9kkl0kfruu7k8r4rs4ixivmdjmzyuxxi342c2crqedt203gvnsc1ykpopsgue7a8sr9lgs0quu0q0wjdmd15y63fasz7gps3xguj08jjto04r6szuwi2kgocanxrp78of4ck3e8850r9xn6akievfm0wc3drxafzbh14g0otvltrvi7bgwqqgoolq1ldrkrhqd674a8r0v84al9pafbhvy13wo40mr91313l1h9w00pfnujd5wq2vkf7e0e8qds5a36gqd45rewzyf5ae4lczgqn0i75embfco1k4me3d2lnn6cbiql1d0la4pzsjrqkjq41i6jzjnzgqd2mwvoqx6bzu7w33ltlzhg6vp84ib7xniyaszhx7dj0z84a3svbdga7wpg53a5w8qj6tpy2ke87aut827oqb7u5b84qvjrpdsqnrdkjwll7a67oweda2948ehti4yc0qurw0djwtxge6gnt0dzbz271xbgnpcj5nz5hlwpy1nwkw2jj5ywi2phvmxayanubl5s97w1opxsczyiv47ya5ny6s4d1t5m21ms3u2oafrl65m6xuehb5cttjwazabb1g7h7h7yxysmxdz9p3btzp2nx15zrhsmdvz1b76zyxnpqaaphfkjk0h3rt3qcluemgmmyrnji0aetv9bnb5wdiu602xwamjuvk5jzyc8l2js75ndu8u3snir0734itr0dnf09qrfqqktj5hoaj43oiq944hle4umevw2ttzkbs8zbfp1qsza5iftj4pyxhu5f64mh3g2po0qsnwh392ebbkm0jobqyf6jqv0hxgws5e2ij6l52aj3e0mnxdv7must9lyqi4gep6f7zh5e6pibz',
                        fileSchema: 'hps4bxgurzmgm0ljzthf4c4hcwp38h4bkorwfodafl033onwyo7p05vm9vrnjfysu2ntjri0mv4jb641eyj1e81fdgnk8hrgx1ilfvwrz8gfencpoduuuuawhaiz5xe8gcg8tumpp6djz6zyhim31gobh2d6na1nhrsvfzdilf3eykosxe6yqcdfqa6vzeobt2rbwooli6tare4zh89fo6ycnj9jpdvwh0ndp30h48jpvv73bfg198z34zer3j7epwmfb39vb8avqkty5lab9z2wy937t7oqvcxu4163cnd5ixmwyei1uqzld6ooj7h0rjz0cc2asndhxwu01tbphp2bheeycqt0celry62axskouxyjeldt9vt0tcnk4o6by2x3luw115nz833fx63qvuiwf89uw7mld69c3v8bnd3egxj68yl4p5zcha1aq4bkh1f90e0m38jxku6k4bfklex04u46wxx82z0977jnpsc8dvjg5a68kdiri8d2j6zhwpk3h4im0m2d4q28dn5vfpppdw1a1xznbuu1g1ckyosqo0iraai6jgys0639ep43k73cuempwjtpb65ye12jytvhq5zk15q42ocu5jqrq1qvp53qd1bpp1tkfmhtxxjpewsinfczfnpurqvefbv7cr7mf0aha9y03h8qsprtpd1ujclf0dxqpi9qaeks4mvttm0h1loocz13tkg3hcqo2maq3j3dezbwm0y0f29bhpizv58ohiowc55377yzjo78e4emhj67fl16vunb0o1vf4y0k75e37qr2uy6lnnp17wjjwursyknvpzi7s6kd9iy8nncavqx5vp7866cj7hnl2p7mfxi3wjrj6euvf3y0q5t06dhz9e2d51yfwyf5cu5lwic2t2fj34lu0fe4qdn6rmqg092ylitkhsfv63m2vhl5rc02qiqmp75h8sdibolvhgt1kw41k38c549snj5ypx0mw4p8t8y6vf8ds00z47iah9jes6mred2m6gq5vmt',
                        proxyHost: '9bo2ttcxg39clk72h4uvezbqvnbkji30fldjz94uy3ly4qqt2pg2gqau8otd',
                        proxyPort: 2352560588,
                        destination: 'gajdg1i3vqwf3evsw8chkrz4gtlr10tzllgzyy4xr3dggk0mfbj85114zmdvlckd6lzur5l2vmzq5mjzaaipqc2hlhb9q39kg654ivv9uv95fc8p96m419qy0owmgq5rtxczuxvtvjq6pajt1lob1jp8sf78rpm7',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'xfo7vz7gg83uzufan5dfrebpkkqyhek8uyeg7v83snn0rakw2m283mvbw5f5wzpkxmbkpla4dev8ebrr7vyfsu3wa0zqe4lnhbgow1wnqn68kopoz6bm8wyozxesi62yoqm9h9kxlb8svxgdzwqvurbluianpqbu',
                        responsibleUserAccountName: 'z63kwa9apunoaxyz92ic',
                        lastChangeUserAccount: 'wq7yiiwlg0fyltxbcluu',
                        lastChangedAt: '2020-11-04 05:31:50',
                        riInterfaceName: 'e0vfazontkgf2sjy45aimbyv86vm5ami60lb8u4clhfo853dihbese6e5jwwv67gi8fkp7f3illsae9ay0ekdq4943fox4l8yjcxcmf9nonxbiizmu7gtrt5cstnp3s6khg6aaxxvi73y1pu41tx5mtaoh4txaso',
                        riInterfaceNamespace: 'me1dni2chgtishs92jm7cdc46elf9f4jsv4i0zw8y2pfqxwj8k82j74jqo9y8revq17dtb56e3gk6tbiyuhi3cv2kxya2dse4txei90c9t5kj2ay4xiq2tv4dsvwdjll59m33lm8u36f9yhodr2zz33x693ygclj',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98',
                        hash: 'df0ebetk3698mjlpwzwc2s6ksu66xqh90g18mxr2',
                        tenantId: '2357d1da-746b-462e-8dfb-dc3d1fd3ead5',
                        tenantCode: 'ormah5mu6sf54br51dhn0qbu5r2m2c5rpr0ywp0omnzomyd7cs',
                        systemId: '4865dc64-ea04-4006-886c-0209279a20bd',
                        systemName: 'rwbm1bvi6ooqjk4vrmyb',
                        party: 'yag4p25maq2xytajuczt3pl9zn7bdhanpj0puvskvi4c5k4jks1vb1r3irymofnogshphdx5gm1cd9lew92wbs5pk6jp2wcbtm972x2ad1d6v6cb7dca308q2ccjbplvnyl5aedd3oiubftm6482b4l58vhznqc8',
                        component: 'u8v3veec5ppseajf3j21rny37cihkt511d3ec44q23sh8rakrm0khjgeov81qdpu9j7xdi9jl0t0t9lt8s9tdw4kl1me819awdooooh7nwc1gz1l0p4kqk6lg93qazwspsq0jbzl71q81cifuwkk03pahd182zj0',
                        name: '695ybzkn7i1lyp4e6v10doxukxps5vcwwpb5av7gpxkdop1lymp84fk692u6ew304ibjeuha4ao890a3jk7xmuy20dgxihi6aqoaedyuydj4a7iw253gxyvn4iiu47u0myo3xirn8syd2ksfaq5o8gy3jr4xk3gn',
                        flowHash: 'bnm2lv7eeqsdhqmxr6yvssb31n57z5w4644qjiv5',
                        flowParty: 'cgnlxyu1v9g73z07o50ecwt2f2ew65so0k7wkb3z8nwy9pev15wcsfrh6bv009h9zokoppcy786d0bvrsukxnu2hfhjwodln0nbi60nt9f82bmz1nphi6owes3a5hb807hat8w360isdhszkl0q5ge4waaaqsour',
                        flowReceiverParty: '6ciodojmcd117tc02waerl6c4xxdtftcbg13m2y4fr3p0kd92rzbu6dmvyc83wukpektgbygxa9figezm98rvm8b9a4fzdmxhi3z8e1bqsv0pv62y19myf45fxykoktw6f9s0na61chfs2mrpeapl453naoyds8a',
                        flowComponent: '5bqksn284sowqst75wc52s9xr4gr5i6rfjcexrwaxebq8a5ziqfzfflyiyzvgtzdlb8z0pf4ah3twav7hgj80sa4o50mvj1m3pg0igahui1n659pwnntr8nf68zsetvzlpisoih3fjdmvwfzbxsdg9ue7xpqnf2u',
                        flowReceiverComponent: 'brbri52561r3zcqtcjbm1pjxfcksogljeet7v8ha9zxffcr8t1yyxzo72x9npbe3sp6x1shhxshmkzfauu43sfyzw8d6yoc2uciv5ct0hisbwsjm4xkvwmahdz7bzxmjzc95rwvu9zxpipr1n9u6rcr3v8qel1yj',
                        flowInterfaceName: '51rulcsg6b1au3dkpoucnxa2yljdmzn42ocsqvvtsu7l93ihatnl7acr7mxigdyffusbqamhcn4k38cmpo3n4cfoqew7tqkmeasi6jalerptyuwbyuhsylp2q46tbfrpcurp0icbnvfs1bfy9br5cl2ur44fafvq',
                        flowInterfaceNamespace: 'n9u31mfays3jo4p0ojgckzrp13l8v6vloi3hxryjz70w8m2zllky4lso564w6v5xcqscus68bachom392nq7ek3kvj3ywzlpfezk8zzh7u1gq3xya83pbf2xmjgtar9eams7r92dir26bv4xhym0lw9getqjk031',
                        version: '3rk05u8vlvpcg0ly5hyn',
                        adapterType: 'f8lbuqw21ky8zmhnb9zim7mvpwce6eaudl4q6jo76340chukn2ir71lt8w45',
                        direction: 'RECEIVER',
                        transportProtocol: 'nworwlw11u1wtug7z64714bonnnq74w4l2m90f1vqzaa26xz7lv60axsguk1',
                        messageProtocol: 'tgf11k0d7lq0qzj0c8tjzy2j7kargridp4qr8lz9pumtsyqlbwkpp6yp85gr',
                        adapterEngineName: 'yyuoastqhrgo8ni864mx6snoznfxgorv22sucp9xruual1r3kgqzcxerd348lxzslv83jvx4qtf4gm9vf3tjb3m70wc0j7ktjcvo3w5zdmj8vjct2pohjghq9uqacl3p5yi2ns75xcjdh5nln2byp305w30shgg0',
                        url: 'mdudj8ql9b164w6b4zgm1salhdi4kj8oj0p9kh9lrotypl2y2l3t98266hahnwggo38rndfssoo2sgsb8hjvxr2blv0ifbriw4wlyh1nhsrd7ydp3dhuxuh9yqpr5em5mh1eg87u1d897qi50tqobbosy03r3tel9gkkdl8qov6jvne1etw3km7yg253d1n0205qhc6hclfq6h4733ikt686uin7ufvwzmjmrukdg3cv8s5vmfznwp9sacnm3kmvkmc881nj5wtspgwc0m3rwdkkztjf8r2b7wnb1pv946x0jyr3c9rzlecr820av6oe',
                        username: 'o7bnd8i3c3604oem8ghfzvruu91q0f8dmjrfdytq2u85pqsrkmobqdeb5g2u',
                        remoteHost: 'v99xgghtzphwu7w3pao3mugiuidpy7jksw6ge7ovtr8fzkiz5phqvtzhvbl4a0lkci5p4ronrp79y2lr9k7p74rc4uuf6arnmpa59s3rlv6sep495kedmhrtoj81tc5868wrrdatllkiolbi25bcgapcl4edme24',
                        remotePort: 6078409086,
                        directory: '6jrveyuemm88uxsq0uqpxq55w72mcajolgl405w3dq76p4sxx4qwxc5fg1u4pn8g601hy2fffz5n7jpi6v2l8gev34seod0rtshm0fyi8vni9nn0brhzsgugcathsl44ijo2x1p9vuncth6amyvhnvs8h6gg9hl1kf7nfheo403v4pesf2jnjgd2yao4d277f6818etc5epiiyjnodwfx92phb4pe5xiubv4l1hb1l93xt0z8sowuoewjmmj4v1d03mnj1g1g0kc3sh4z399erjpwcori8h1c3pm2hq5lugqwyox0yrk3upd38wgmtgji6lv9gti7x3vdoshcf9i48sl1oo6k8p20ixhtdqz5anajadeqsf696umid5i76knlvtyk6pr2a75czk5d1lp5ass0fv73lbkct4gb5vm1zes44u4y9tmj3ufzqp9h3dwbccw00vtnib4gw8z2qcgxxtb27l6cy88x6v7zhz8tq2uj5imv3azvg19qsgjthxvomaw7g1hojvulgata3ukhf3x6vgkre6fmlj0ul4mbc1eknysnsdmyh5oigk0hhbqwbzau38htcyzneiel10027ma7qzh3fsgub7i6yihsnnqpu8qjht6bazw3tdm1n16uzxmzsrxkl6xlsg7soortqp6inhz2xzfc3s2iku7916c57i6i1h8sncslme87p7nocg3o38gw0c2qfdrx7kthlsbw5w723nm5wtqggjgt4eiruweqv358vywnd7y5kzxxi9ma7h9sljtwy1mlai14rpw2rdtl2ywm4buoggpat68xmdl35y8q2v89f8599o1gvm6i5s1to0l4dvevhjwhqpydl04aqulga42hlbebefqvfremc2fsg5m38rif47hnz48r81s1dtjgsqzqor3fzve1ojuysqe0qw2jtsqu4gbl4pl8ea12sgx4so1x0dg4i3xth13q1etqm6hypokw4dowekc3bcr4b3z8sscbzpu0zblpa1eywfbbn94ki7d',
                        fileSchema: 'k1u0so3b3zmizi120p081r73hqqfp8q22djjmohy0kjxsaqidvxw2e4rby22rlp4abs7dmzf126arp1uy63gj2ujhcpar36kmzdqihwjand7zrv2zx8yop95u0wcq7ua1kq27rujst2vr4jddnq0xij0m3c1ntlflikhqz7seabz02p2pjb0n8tp4dvrjuyh2oqxoxgpbg0l081vik59ubptg4uh8bn0vd2vnnw3zfj9zqa1s3kkxi26bjlj1iew9ytfi0lbnn3c2ql35r7rb2n6xyz6vyynx0gncuhnhsnqcsu0t2bdesnex7rwv7fiynpb9tp7ybjuwhw2wlq1uppf2k1fvwp0ulq2eawja571r9a2j1emhnr7ayq7v82iolcuyfja3bpi1yd087mp6nzgx3n2e4hq7yx1y753jy9w3vc7cgqxnojl33rsp8713geqhtp72r56bm0jx9xd2kjqsknywzot2c2oeh9p03n1ko182ocupoewweorwo081n99klytguvw74fei2rcelbafl2g97ngj2qowzk56qz9i7wl01vn6rjahuh59o8op7zldq1ul0lkzmcohutlerc13fh1fyo472xlf5anpi6rz7zr27pn2vj4xed5i4vf2eqim7ekbygqe63pfpt4hv5ufjilimkgclgee55l5wujsi67952irjb9l36nxdcjq4xw35rkhanbb9cgp2jw8ls2db56lhc7dqd5r92ecail2v4ox3e2yz84j2t6nacpn5adku7eql5i32tgb6d45hyexrznyygu2dsy1az2euz96wpzqbdy84ztv1gt85c4eczqn8jln4nkr7gd6ynhn22l021u3p2d3k3mqbh12f5nszhr92ej05giihoopr3qlhvrqgi2zsyptkv6rxnbv4ryln30u9avm1qwf6k5mr2bhv9ecdskliqt2l04sllskspio0p3a7xikphw8sinwkny3fcm6d7cob9di3229rovag9isnjogck5uj3iphzy',
                        proxyHost: 'nhq83p0juquzfvzr6ug1zsh4nk4kvnrvypubhf8jrri0lk3bjxnnm6uhrn6r',
                        proxyPort: 4307731918,
                        destination: 'yes28vcw538b5sonl5sw3a8bk4ahbvxjl4h4n8q1zf8l41aq1udm1bxu5oy8dbo5nhvuwfx46e2r4t0vb5ftnp1zgyfhxrjymqm0reqpby702y7jmlqo0tzjq9lrdr4lknv9cbe083aygw5i7hsodvf8ulj4om0v',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '6yi00rb2ugmhvi3pob6ne0tre6pwmtdjncba1wbulrqem03a27leu49m4xtutppsnt7vdhdslm8d6kxcck89x80ukrtzxt4hayqz0dg9s3p8c39zot48qo1emavp60e1rhwiv7qnfy26cgl0a9job9v77u20zotk',
                        responsibleUserAccountName: '5g9fk1ha86whmetdhdp2',
                        lastChangeUserAccount: 'j4y3ul28p9d884mg2obq',
                        lastChangedAt: '2020-11-04 09:06:24',
                        riInterfaceName: 'lrlxm2jegetdl71i24qt7p3lshr0345xgcol771n9vioejqhmps9ovjlgs7i2zyjvpgdrf5i3m1v33cceaogmnnz9kc4ogkfkw36j4j5wu8plugr95wo1ubnc94ea0nnylrhi8djigqyfr1two8u59m9nhucmbnc',
                        riInterfaceNamespace: 'cjss8r1n3l3vp6o19jobbeynvruw0u4wpmkt0bo1xfawuwzx0jpkqelr2l3a9zl855lykdklf8zk3appr0n3ujhqoe8oi06njv5u7i4xc3ypdq5l74kmn9mikbia8e5la8onc444x9v4wnh9irnj89048phazt0o',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannel.id).toStrictEqual('f4c63c21-b58a-4c93-81de-8a07d4a9ea98');
            });
    });

    test(`/GraphQL cciDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6f8c8989-4520-4c3f-96a1-c32ca4819b76'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f4c63c21-b58a-4c93-81de-8a07d4a9ea98'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelById.id).toStrictEqual('f4c63c21-b58a-4c93-81de-8a07d4a9ea98');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});