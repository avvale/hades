import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'ks84wos1gduvtnmkhxju7viwxgnk0fu6oecisbfzblcy28h2ne',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '7j7kn4latknimynkioy3',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'wztq9u5mw4j4n7tz1cbu75cyj5m55xzq2g1fkpb4fbm2s1iqo0m5c1h4q49cip0awg1f5621s25izmzi9twjt0gip55k3hp6f1oynlr2eea180fu29p0wgbjryps5sgnrysciepk6qpi81xuipbvlvdxslaww5o5',
                channelComponent: 'j8n80tch9fnwj4qla7r46f2kxdc66rmxlrd1aflr7ez1aqwfpuvj8ak4a5odvuqvt9ppjx475ip0yg3hddkdr6vqm4q1z7qc7oc1vao7m9wu7ct5uy2mv5txv3pjfakfi81jqjtv4vv91f9wgw18gzn7kaqansql',
                channelName: 'uun8sdojo0kmuqhjorne9oi348vvtqqkzymm2ca11w79kzkwov6mpi3fz3ln66oo27gavq4hikoiexl058kyo55dg482w39goflgjs1hqt1g3e0lpyj8wbm5j98at0t5fzbipk1tfqf3b044ts1i2c5ir4le8263',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '69db1byyxauuh61x1xaxkv16jd8dv6o3jzyljslc2b6uk8bsfex012dv5fdz5hiz0vox7le8afmie4v2z7erzmvyxwhy62qjvscb4au7f29vgambkeodlsup616eqjuvje8x05shwhkhaeb0e5c929lvnrl0123t',
                flowComponent: 'bkcog3mz2r918a5kwqtqi9mjjr2zyxl90zzzpek11gsqbta9au9xm22qijwzzoaax7d518x2slbc0o8g3oo0roohretab8b68n8l5xwovws46jp09agwq4w4pnoc533z5law1kc2s6vqg1d8gmv3dl59ous20zir',
                flowInterfaceName: 'rwgjxvp3ity1r6uguh7217ll5mslwbos59grr7b77r3ifus81bkra0f6n90g1otpj8e0bxdq9lkmqtjl1bmfk3389t7pzyxrouphggok1t4cjpujvwilcnx7xzgla6qoau3q6704ccrhftn36g6rehk6u3tp2uct',
                flowInterfaceNamespace: 'psq0sm1kjyte1d51ktcltke1eqxaz5jz873ntvngq7dr1mqidmd2s57bs2p6i584s6gmvc4oqscp6bocjd4ukuy5wzen5x4nt7qn3sq8ozcf2mhfl93b1dty067pmduavsxxcsg3314fj23bzehc4f65p89aneg9',
                version: 'l6u9n4m6bepvs177vybu',
                parameterGroup: 'djmsm7vqjjqfnv8c32wp3xwdtnlywhkxr56b4ym1dl78s7ln1kkbvewgfcd94ogakh3bvo5lcetugy06o8h847gw8evib44buiaflttwx8hsojkplf3r61830rnx0o89868pao4frxu9zloez7u87f49xknohr23pux26udg21i3ljk4pcymm2q534qw0yae80u92s4088g492elvh1jbqvz3bthvmiancrfgxmk8061kcgj23w1320wq5h4ggl',
                name: 'eea6jadzwko8r74ttts4nes8tnostejvs947yl9fr3ioln41db3kk6mgn06xgkg969bz5k461k2z7v372o86chjlc6g1gunszbn3mjwvnl8opkeve9ehigzfodompxn6gp18e7sp4ovfkj6z6872w90ur963mh6zd96ujfxag91pvbv2arfskipwizjo557fjjjmxvqhwllaknn8hlq5tkjesypq7l1fkdvd9q5h17aq3jk8lfclyijd4bm32thl4wjcm3s4gtx4mohvwr6u10ebfhxkbfk26z05bp1purpnvifgwd1igsu73k0mldw1',
                parameterName: 'mq140bs0bj4z975uup6gc2i61dkodxl85iu1fiuzau2leihok7axprye2dov5kw8nb7q07cyxzslktpeiy0r42zmom9mdu7ztaegn4a7hr59rnj7clvsbude9cothseozsyicsn79q85a3i021wuyr2efoz456vjyb8k7dli0u8ptmq8x06fznymrb3a8waubqxthhse8s63uhsti1wcelazrnh8l1kwgxk811ox8cx7ur963c7u9jopztqhrvb2rvhdtkcjctsdm0ik0r61z7k731069odh5oprh3dowaeiks3650q6st06lph4diox',
                parameterValue: 'e4jaed98wqsezbuut2ax51fq1vpi6rjyo9khqiuifghj2tq05i1f2m3pgfbda43mkxyxe29qn0kfso68ol52yi7h9laa5tehtuzvv6bklv4evyh1ai8okn36oygzuvkpnqdqspmxf6dgg8c4ux0zbgpa9418vcih1hagk5wjecz4zwrf9qgcdvakvz60qvw9k001dkxx203rfs2041g5qiwo759kldo49tjveh6ob3nbcgbuob0d0gmg4cxbsdxq8r1x76igezj3fa6pahzcugikkdxg69xaemwg83b5is1kfaff41a0pp5wnqazh57k04nc9z0g804mxjtsg57acb5esbt1z025dmiberhhqy6j5isagm65ypjk1hxnote8toms03otme29rfgtpcga4a153thieydphlp5gdduujstxd7qzuawuwzk62vmmgq0sc3swcflxpc5bqcjc8qgj0z1jww2e4r1nwnx5lecqybq0fufvboaus4ed7msqptl8u8vsn45aob3x29pf3b81q1gnfa3jmt36z978o1inrcryqe3wnp0jc5us7td4r7gpz8yzcbsjuc16lqdcxe6623xfmikcw1c5y4g9ud00kmv4m80ftjm04px5rcpz0wqdtvupr9lx2ie97imoc9ytp914yw3x36i57e0k0a32y8tw6usadij7ef4j55ihdw5hrxlcgt6q5quncjlhhp0x8iqas4lqz94wdjf6wx2vdu297pwertw7sshjp5pgfsyzoq31lt8siqf3tzpolb12it2u6se1xhg0o9x2ezm8gkikff9i7xat4ocxhu1pjcd2jvy5duif58rz8v6xeqkiy37qv4w3jlacl9jidqmyncxnm4ruijo3zhvkwupt58ali6h7hr2w1d9hfsf0e7x86pf8f0cy7spkpxge975elbkdudqm8t0kkzq22oljolwcyzk03ptv64egkx02o6qy3xsf0too5o3iyisg8236xxoyhj8mi4f20y3syqe8pja',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'aeipijdozfwrvbhz0svd8cxjvdk6dlp9e03015676eh0mscddp',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '6e75k169zvtyf17ibroh',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '5djdmljmgw1ifk0giyzw9607371xpollcvb2equge7y444ukon6rs651gbxdhqdpzkc9q2apk6t093k6kg1v532ejp1450zr64hogd72xfcy8lw3vf663xbjdc6sygq3htwgqvhk3dcubtkyejdebqgl1f8n2czz',
                channelComponent: 'vxngo268lxc8nm58hr7nf0atywa8tc3qcnmeela9cixljszv8f6ocebio9uadeqzfz9zkw481gdll4ikn38yx0yfockvnngtleosab8f0ckcqsgmvcg4t132xfvbxw9lenfkp6qd2vcgppwd65ioftapteuausqg',
                channelName: 'rxf5xi7kbmm98j8d21f28qq5raxltu051jnelgm6k9nvw2h8ym4i8cebgtfkesnwdrfv0yumxn0oepzh7v0cfi54emyzmwrnlyzjvcuww77sbaphzui7q2rsjtquxix2z1n4rvkubpxqlasw89uk6kvybaxaxplg',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '58og4jsxwcu3tedtfabo0jteq6g2vutdyc9lwwijxqo0coalff78eeg1529b6qvb5i6ojw3dmybqbwvaa8j59s0pit64iu4y78vhb5icyjv80ph7im9imec2y6t2dxktaay4istdbhommjd4tcmjfi0q2oj638r3',
                flowComponent: 'byfrf8gkxfm6x31bm24w18izz2w56ajaahi07p6i96dwfzrvqcjbyf9gqdflbyup9395ip6rf98i9qhfkamtbklfwvamgzqcs91c8c0r1b7f6zq8mwqhc24iayt3dlwxqfstklc3lexgff4bu5i6z9qor3nrmvep',
                flowInterfaceName: 'va928z0pkgisxn897l1tf9f62nbme9tm7ldpytniq3lkl7e8tfprpr9qriispgbky9t3enpl8x00niqmaz4mmmyulgvw6udaqh4ncgkn85x8p6u9iyyo99d8khnjxzo1k37ll3h6xylv9iv6jmc3ikfqn92xd1al',
                flowInterfaceNamespace: 'ltlzel55etnqd60cpir55f4ft0ltg4q2s8xt9x3uilf60ywztwy4j49k05o948pkcxoriggwoynnrzo8on0dat3oup123teg4uqzsn1ophf8pf5pm0bu16tjeaceeh60a51i9lhxsjydpvehjhn18r6kkuizysrg',
                version: 'e0mndtdomkp3hbgafy0z',
                parameterGroup: 'jprjzpz2rn8uxxumqaygp3nycpv846wlzqooaqgi6bpux1zl56wyqy8re92hkoijylxdv1gntgihzyjq5d14nepjnsuxv5bswayknvj12nkojjwngkwr8p4rnek28ibsr8v8ut5l5iwjgzinfsvqq9gzln4q7neaiaq1pd2ssm2jks8gs5yff2u3fmrbj7i6hcvjksa1y1qbgkuij40rjln65len1c4xn9hids8wz2uvxfn2dmh688idefj99np',
                name: '6nc61dhe9ozjctjigu03o2eefcz6p46gwiv1tzar58s8mqyg4e4nrchqm4zge4a8dmlrqgn57i82szbc5qjp0osg9oc936mk2m7lqjiovsg91fjztsbh1pjrrjf43qe1qh3j7v0slbd23lbufm3r94tijtic1gp4bnm6138zh3aonmdsdteku4xz3y1qluuh583hoskny5rrpjip7k683leg8d84adudhd78s5x6qrksgh46qr0pnolatnlo9l4h7xjbj537kytd7xf7clsiq8q7nr9lg71nfq404hahevyqn7if00vscyyw4ovrw6th',
                parameterName: 'laf98zddu7wtxc5fiixdeu4oew04tj0wixunpag6atwdjt5oupvacnkq4o94me2j3zszqobedunnr3qo1o0ydxrbjfczvkt3pqimgpe1xcmuxcub58f3wmwj001847c5680cjaur1u9aymuenfzw10s37kj3rt09oo657923grzpeihvliwlg93pnkd33na50o7386borjjn3tach20ck773irr2nmvsjg4jfr4p14sl3fpf6xaeeqzgfmo9h1lw42h5gakrpilsdjwx6ngm3r1e0b5tyo65h1ubwneq996xj6o32sp7nvyo5dsttfan',
                parameterValue: 'z8re3ml1h9168il45e8wrg0nralcb039zwymckcps60jw3irxljb5twf5r66egzs21t5ipdjnxl7tpd1ypbob0j5bkx6hcx9z0np11try1est9yaoundi6jef6epo32ipp9dvsx1zweod43l2p17f8n1sbi4ejldhrqy0ww5oqiyxwj1to4tbvlj9ah5jt2jaih8i6zfjkvdrgjyatl7oqh5rn7r71gder8emotsx738pgvh3itjy6ebpsfr5ip45du1jso9nr4ypq2np3i4p0cgfjrnp5yv7o1o69pvizc1y6u6ixri3fe8zkjoovvprpxil3x0kurv2zw4qwguipa1toa07cy3zr0jovp8uf97zohez5eksl88gi0f70q5sj11doonydof6yyi97ep5mwzdwv7mknwmeklb7xxiglo5t9q6av79eihxrit0fe4rdqvgxyx70x518nt18d5jey2motj9p9zgofpugn4kp6kihtsekp4fj33vadk5eyfnxfgxq3nfz2c3vu8tv92sw48s8iazxtm6c55z8i2mna7ztlmasue4u5sbumhppzudzom3zr76b40voqw713y8io0c0na3v0jb6p448o4t832qk9k8vmy8jy3jfdhmy6c9eqrcfxxon1magokyo5lryp72t6s0ef6ndi1gwthn4tpdvkbblnfkbgs1azugjtarn2d8ki3btjfwr325gmkoe6x7619b67d2m5o7xto6h5g5mr61e2r4ib9glk0objyhu7haaoq4zi2o1gz4k3r74jjk4qgrlyc9w29vr5yc35ib1eo4jhn79ya9o8gy49eqtnbhscech1hc8yyyvkce99lskt4aqcg848srt74ol99w6b1lpnffnu5t96qay056ryk9yn3o3ia2al3aeuxbjj4ee436u4r14zcshr1est215yg50p2gh1jcs67uke3l43paa0sfgfidek0390v5yq49js9x3j1qxzibdj7pex8j7kpr4qihc6775eao4ks',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: null,
                tenantCode: 'dubqgooletn02dz0bncuz9u0eokxi9164aehog0ifryerm3otd',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '02yhwx7stuukdytggbi6',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'mv3zmxaj5w2e9axemcqxwf6ayf6qvztjlgylkjut2hywxotgt1fs1eppvt8umwkt8xw4qejsw82ovbc9w12j9uz7aatuka05y06i1o5rmcjkpiclaibblto1g2a7baj2mouwvsmuhdr9x6ur5hzhlyn7udl1jw03',
                channelComponent: 'dyd23xpfachyhjnrvmfz6pugw4pqmyyn7zma1tkyi4jxek4qlcaxyolvc5d2pm0n7bt56u3usu35qyne9r9qq7jqoegh182ttwht39ff702hskmf8nvha7di7e4dp5lewkfqw2wl0bkaoss920n3lmobpiehkm8a',
                channelName: '1l8ti0s62owdiwar5huci7b667z9tv3nxdix9y1dri9ewgfd9gt5de465xjzyzobkv98kjpv9e5koyrfx6tczoyfjtz95rt2rdcea5abn8r262odiuqzarj5qt1zu7mxrebdjke75zty3td5agobn4bi0u413j2l',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'u742ytrazbkqkjxbrt29wwpo6bphtuhxdmixugsrg2vg07764dskff1g9a784nqgc2o4g9yc0qay36qwx51472jdqswvz7dgpa6yf6qw3rs22jzyxut62fsmi0z8oxpgzlawnav4f9dzyybjlpt0czd6hlak4mig',
                flowComponent: 'flflq40ejes4t9s76we1mnmi7539lscnerhtckmeilhzohbviq143i57heuj9evzpwt7e096mpaq4fjiyl4d0tl980ns1m3sylkd0uhio9k4ytnvaq7ghicdzi1dzu5e0ebpflvce7jt3q7zbuotncm949nc9crn',
                flowInterfaceName: 'azh9il7mizbbp3moc0wigioxeospzmr355uitvmrcv3d8icx9690zt4rx4r80fjf3v10dfhpgae8xu1t1ych88zbp3orj1icqay3kvq6b5g673kgp6nh56l6tc46r5mes2m54afut39nb3zq2f0imi821zopvol9',
                flowInterfaceNamespace: '7w55zud0rn7gm1dq8vi5zciz5dwtpfgqv8qqz9fekqhca8igvzemfl55w5k5dzqe8slaylmlr309olzzh0eomf26uuio8b5f90hwk6zyky4dno16fsfl8bp0vzh51tlsbor5o3u3b9z3s57n9z3cl3qopemocke2',
                version: 'nth8nmopu8w33628x3hd',
                parameterGroup: 's59rmd1qkqoqj9292sh4sjk0w8qvpf1lfkfvtweoop330z2yznhxfm09emd59cauunz5ok1i3ic49htwparmyaacllc37g31ybul4zkngfu5wrgyumr90h99jzhg2s98obkx4je3sgp3p3kcxb2pxhdvybggkhtn6w4qthosf1ilk8dv1jj3o2fxbsx0besbqrt1ki12b3m9prjrw3dexv6wvftcax3gulwye4sto5m9tck803k10gl0spikyn5',
                name: 'yedy686tof3jp4tgbgse66sbcl9fygc1yyvfulj1nia0jgap1p1livyt8q9p743uagrtf8kyki2je0hagwii476h1o282w9yrybnfil4a0zvzu1ywrn0apua1nz3pjibh4355vn7ntznl7oldiyjsrltn2m7avsivkvxh54cwgwpkqkj5aeq4l6vkx3has82zrwfuaozllsjg84rlocp64dex1isgdnde0rrhn6ak78pvagwvfprqnq9m05f9qgw8v6ko8aekfzu1rz3i0ernlnmjjmu9wp1rcrakd7ouy7likm58jrpljrb8t9d5kwq',
                parameterName: 'okf2gb2a655la86bh5mjosbzu8hz8ztacrzgzfbgxw98uttgt1j4kwfq82gaij3oht2jzjqd55cteiu5f6vuxhv046sb3rpdv33ngtmjrd8tq62cvaa5yhlb3h8324801n653p29l9qak0843xwgvnz5ck88zk91qrfvf342pzxyqht6toyzpnzgzlppy8uh8wsemqhpfnplw1q2flzlbhqnxc1fny3yjfdthn87shtnxo9dcsbautzef04mnwuomw70sgqvn9mu4kd82fwezuutqsl5bo28dtat11ss8p1hn564t5xy8u3lkr0x787b',
                parameterValue: 'cflprkh55fr3wzg4s1m4zfxj9fwtu6710d4gpmos59kh6yr34207z70lbnoeui9snczdx47020dop7elf53099ennlpq7jenxjvy6kkdro9ii5omam17a8nb1w12nxeq5lqh2pa8lqmtzz21u1v4s88eiywftmooz1r9x5ijztpwsc2z1rjuvj01xc1g98l6536hz3zf32h0obxvbm2b02zm1d5m1upswj6wi9fhdokin3zvgqeym3yrg5bwfp51f6ve6cf9h1v9mowhydc7g4qr9ncg2neerxvu3dbyqe65tt1gnhro7kjm8uw4eo0nlz2q67eaghb3j1trcffmozshr9upurvnrl4xwmtl993a4ofvrlwa0s1yu76q7yzkd84wwss8svjj06l2ryiplvja4gv8luyki9oxtimk2yvq7e56gtoga3qt5ao73tfx4p1i4tootacl0nc1c01cr84aqeoq6lq5qm0j5jaou45g3hfmbnp0xgzank70vc0q373jbosldcn8njirop7o7jwbzabyneongtffc2yf17uc428784jl1o6wbot2zipqz4vnzip6wautxibyncthgaegx98yyl8a9wozujvvh8ixi3lqfefef467114uz489z2dvufhhhzzbq09zxlvh2geut4su50do3qjbwim3k03qnvg05rf6du6pmp3ivf6513nkzrx9fo2reyt5j2vj4rg380b25gekvnx8yo3apitzosqb8sa7yc9ezj5gtkmaco5k6nexjb02grc0zxvkckuu2txdusyt5novki4bkg0lmkg1x7jset2nhru779vpvmods1ocp1pojed7q8nob9qfyb262e41e28c23kcvri6o8souklp1gjjymkzee76jh44e8zbbuo5spdpc7qngksiwp9cnvlhf8s608qm6tfusnna2mm27aqv8dydoxk63mghelc7i2luz2i2xhjcqufm6kjjlp66jt97g3n5txfnhuhn9ph5wx3w1nb83p3d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                
                tenantCode: 'v91c2dy7utofeillv2m29ledlzps0y4rhoy3s5u1sgi59dqfp9',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'o0m591u8xtb6rkfpxdcy',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'w8rl6xffdxi1af0y1uwy5yrzva1vv7ltq2pip4bqglzyd03pv9rm1v6zqu8ea8j0m7pxk9h8s0obb8mwgxadcpvhs6qmko8moc1ukog65holwo2d8vbj06k12qxhuqdid3dvptbfiigj11dvnnbltis098u1spza',
                channelComponent: '5sfh4vguep6625ju5lgb6cvod5w0lytbl78qg64zr6wjtedcrcs5rql1l2hf3vk1ln9tcjeah6bfy7mdbkgnjful56t5ymtcqbj3fqk9jcb9ri7g0qpn5vzn3mafi2y7tbsz0slxegj7bh52tcnnyppwrwhtg8pf',
                channelName: 'fypkihpb8xbsqc3cmilrfnt5nn8gtjyxqs55io4llagjk0pet4h61o06xow9qi43cg71ie1dc4ly3xt77fl0m4djnu4uv4ie8jg4dbdgsaao1em4fpi4cbxclm4twfns6fa67olhoj8kh6zabcy0byg3w61peau7',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'rebhw12i61f8l1z157kywtbrfkrnz9g0v08phyuo0rh6967ljrvdaile4mfla1j4f17jllsei8mojvq7aif71u4obaqyzcfo3curgx0ohvwiwof9gprlq3szdjdvfz20bbdnt6z6l1g6xjjm0xxiwqdytab2uiq2',
                flowComponent: 'jiw3afrr566hp2f61ox8pzw6b4gb405cqip0ehexts5x7nws625z6b2w41fxom9kpualc5mgdemlmwzb9twwvc177x5nceljtmwghrs8d3fa2wfwqxb7atnw93rjnxjvnaiw4i7jqxz2e8vsukxk7b4zi5p2txvz',
                flowInterfaceName: 'nn92p3sdo1iyvi9fatr6o6cts6mfn3nqcgjp8zkvp9lookxaz5l5iv8ky9oe4ju6m2tpps2qsf436iu64i9pdosdj08ha80hmx9l8fo2o4wucp0c9zuf59ivsm150ab8f0y813jric3pg2cl7kx7gdpb14f2fcjp',
                flowInterfaceNamespace: 'f4x5xiyu14swcmfia309ptxafx5h9sh7l80eeenkwxwbhxvi2yzl0v3sj2jdz211dk394wzxt5r2qdmq65jiddsesenoy64qlgnn1lfz38wkyrj4o1ogg0aq2ksfnqnt22vf155shsf0hp1rolzdjvnagfo6lo3u',
                version: 'sgbcxuk1yge62xxm4dwd',
                parameterGroup: '1cxmetxlhsoadd7umdi6vql73fylnirkbjmolxwdi7p9cbqp787jxmz7wd4he7jui3k3wrb89pp12ienwkqgk99knn2pegoa982qh3wl86un4457vyo4oprlgxlvwozgbo4vay5h58iakrh7y9wtzk2f1jzwud0c1yr5anso4iv7tnbzisoz6xqho98m2hw4garhu6dbkxizl3xbe06d3y7n2z2x86ei8i7e90f28ph60dlmmto46y4w2ty0knp',
                name: 'j6bvrxpe2a1ja63tpo8dm1n54hd5sgt9r6j484px9g4mz4gjjj47gya3n5ji09cojd6m8h2z31jymew3jzu5cyt72t2iklezwubdzfrdnxx2n4l6zbwaranndexob3clzi70ad6k9bu06l1ztp6gyo4lftaka86iv3724synm7cfqtukp1pntm1trz6u6julogfkf0wcz1t6gmstojclbn71337b2vnr8ez0nwz1yhrs2l7nnd1v4c9xhptxuh9uw1aoyhcmm26u2n85flzyw4ru3cj3pqk8mqic762perv0m2lb8prasvx4ekqlhwcu',
                parameterName: 'att7bgi0p4i4g9ifperzn2v7w47e42lry7nlaklklobvjddz54m0a18jtq0erhr2xg62qk18uqltzi1wb2prlf4dpo2cd6qufabpmpbaoyx3u12f1dwptbordastz76vzxivlcpncmj47xwxcqqzcdapodk4j4zlozhuhgd7qtdd46x0yg1v0zn2xytsnb9u5ce0asnxr2ilnys0semklwyh0fs1cyqjipv3afl3lcayzeie802wd4ig1imipkerethsh4a7axxpb0lnkv3826ltkj9xcr1jwwckohhmscv6z2n4430exdy1mlusdk1d',
                parameterValue: '0on29sebxk0avw99nbg4r18vzibjzg3rbby8ibxqxtp72l46pdrl7a861a615g1skhv3tdc666njri4ly5513pfep6x6dklk4xubhu2nxbzaili5oo6a112l7n4x16usvaecfj2dzrktk9pyg8jlrk4vazf9ilmaov4bzrl565o7mgv6wsvpk9w43nx4fj7iq0hcvzdod7d54b9nhdae3qsyxxor0ey3p96kz4a3g5cl3krrjdsdoq4sbtz95qc9eumzfjruv551c3gonz35cptov2wax110lu28i7e114fd31o8pcln6cq2kxxsepua3ahd3aqloehnfo5bpbi2rblfk24afxcxfmvmenf9y816w0xy437dywtr6aolzr6hkijb8ks7wxrwjou6f1ynaaj6u71zi9h47f6rjj023i8wb4ktqefzo6p3qhkitojj601aqiw95u69glz820wgrlc3wkg48r11k64ismrwk78k5k69iwnoa0muyojpm2cje3rhswfk9cv18i01t7nxz3ydw5dxomlc14847cmw8nxu0eedwvad6m94q58ks6wwsfkdbws5o7p833vgt80dwe3xy8u25fq0s4ogkd5rml6z40ibkxdqxu7gy5ajnmzf0g5xc3kh1eho7a98kc2zvr8l2sofnbwt3uxlijqa8la0980vjj9bcy42hmbmbjuaqgvgr0z3oc8ejcfx2yke2dyh8mtmbziqmaxzuwr1ew8t0g2n9vqbk0pkxfmc7bidgjpre8gzakllhfbmc77cwcbpmdrkpx1cbx10hvyriefz1bf5yjnluzkp5iftk9lfpshkafz1kbsyxghqtkppm2s5dun29nnivx69cjmru02y9rjkfqt149123wx8z2apn06yarozzho0gfb8oehalno6lrb2pg4993kgb9m6xwf5kh7h05ezfr048dfxc6h933upkn4yzr6eyyxmxgo51b1xmq9vr8hpciugqsjyeo7a5ekzz7kolwmdzwwct7ik',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: null,
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'tuzs8zeymwyuriiye00n',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '05oqkeqm47nc3azfe629alr06w38nr8fduf965hufyjyfsm3azwpdua78jpfq0cee02lmmvorn5hnxablcs4l0l81k07vvpx14o26wjxsonnbeg0lp1hufgejpfnvydgwwr5w05afjaue36wksdnikw439f52lea',
                channelComponent: 'xw80omc41arx9x1qs3x4tv1ufhgcq404lizo19g1uf8ctlpch0xkozbtad44aej4jbbzgca0jd3vji4u5jf1ejahi1yeblgw0bnl2jk8xglhrug8zwcnk9yr73egm6jgez1mog7q9q4h5fu31jwa0qm7rute8s9i',
                channelName: '2i3txj4ofo8f79ydr9dkaxqtgpyohi85ynv4s3mog0kapscf8fws6eiou06m61qf4dwqz8t0yyg0ebrifo69zv5mpfv5wg8vy2ozny7m3oi02zmfirtspnk9d9hoe82bl3029xdmdtb25ch60h22ds0mbzb1iqer',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'xu31jphzp0pwx8yjkvsxr78m3blszcyp6kwa40fabtnj33lu3j5usr34gypfzyvgbngcd3k8jdypmg4pg41j7scplmjuprnctwv4xevyyi62y81ukr3qeunemprcm85cajpm5hvw6hkmkb7vx4vkyh393rlkq30h',
                flowComponent: 'rzta18qnfwaahnxhqg4msu5kv82uzokxlpwgbz2sf7v6i3vy4z2pmuxusfx7xru7iy01fwfnnu46nezkt44dkbwicie3q13vjl1kc4j9i2d4a8akexhp10zvxodviy2mhp3fi219duvi1yenuqbyb4ane6tomrjq',
                flowInterfaceName: 'n7tbg40xpxz8zer28uib83s6ajlp0uoienj4cwig5jdz2zpc1mwn9p08k489e42ft1u4onv30d2zdsqfgiu66almd4y9lsmqv4dis5j8purzmeb6g3h25cvvj1wbswqoj9wzhn08vrfa5plfjldv5m4y392vam13',
                flowInterfaceNamespace: 'o9kdcmmqozug2r2kglw478e8h2gsmy8nwonljn35kq9wmntuj17e88fakdy9emofsxhxq1h3shtkqp2g9p1ndbceco7jt2fp5jzk86i5kzqcq3lme4wes6pu4s0dfn905baixm6b3057lr9x0wypaku5wolybcu1',
                version: 'v8ngqlen7b0ktkrwful4',
                parameterGroup: 'xcpp1ovdbkm8vdmrnea8ia8jmpr6djdegxedqh26b984x3l2i77i493sauo1pwq72joth7ah7dt3mrxawwb3uj4hha4rxp5dci34em15afy76ud62blpyr5oh43rl253c5ds0zgx5i32lfdtolmr05of4thisitrkvajek7t2tm5vsfah1okq3nwtrsiw1mbanxnw99eou1ap4oqop3r1za87814n3kk532dz7xwk4x3cdgxqceueezp3rk4b81',
                name: 'jm6qz0w71gv3hn37ui5z76nop2n7z8hhb9ynm7rdbl30ztj5llbrqpu0uvjsqitriz78zavkrzxi95mohpeitkfv0f4uflhlvonvwk1wyuzbu7v8xywq78esofj44fz5ydu1wqj8y1e31gj5jnuxbvqlzwo0kpwqt93af0g1exyl7sjguim606rwovgndalb0ch0ly2k2kyd28kc1lsg8voxbf3fvade1qk55yu4l5xwwcp1s01v64iqwmnse9ynsfhyov51zdi4h29jrdvr0vmn72cwoufxbyh3zwkqahcw39ke5vwuknh0ez0ytuy5',
                parameterName: '4taguu3sxbbllf5hvkaavzimtl41x6fdgnx8mgle9n2lwwa5a9afagwinr14k4e2g2ez2d9xcxj53b201j7l5ne2y5o9bq9q8osae64rr7j0wkab42880lh0ft8p3ylu3ffxgcrwf1ndtfk6cxustbby4hs6psjmqz89zvlh7lpg5f5c0cmh24zd6yyqcrxo435bv80ram63mco0pcts2jyt4a3gdimijv9x7gjdiecnx7m8a3yghvrcovyyzondvsq4gd04p7c86pkh55wxnuvtbf8vhy970nk0upir7kjv9g18n8twgnud387h9x56',
                parameterValue: 'oy984530acs1ybi891fpfg9zjx672kxbgdpnek682crhbspxplyv7andfl66ooxvf59aw6607gfmfs6bbs2lv1x74j26n358gvke80867ex6nmlo4djioowm4wta1umxoh910n2rzdomh0hpihkmo2xq11vxtnmbwvaz9bkeukwhku3b7xkfzif4mkyk6vps25ujdc3cabw72hlymhl1gtiau7b03alrgrfmc37n2svm5u6phrkn9phngu8m2l7od4fpi2xrooehgsrpc2i1pmsy3syvy3myd38st9wuwpkic68jtng6p9cm3ww7zt4tyhlhhpbrwmv6mvz6kr2hqwq0cpd58s10oyry59cfraoucz35211hoal8wj6aa0mnh40n7rhd8q17iovv0qp1vm6iij8w8s76ml5wkbbz0frw4guhcnbxsx19zvx177nbrw8jvwlkv23tuvwcynj0y5u6806tfvuysuxakxy2epcpf55vlltu4qzqsimjrnu1ijmjlvf8hb35iesexpppg805qkxjdjhpsfejxgkcgeh54498j2ps3z3fr4qcep899ca3t3qtc1e4pxzpz3lwe0zlzew2zqqhgmyswyg5tktrmyretsbjvroqno02nd3xxbifixwe1y33qs6ym7sto776iuexj2xu2xedp759qv1znzxf6g2tmdy2awn5b3o9mymcuzzvx5syfy324y5052kn08an3a5ci6z4e94borgfxzhc5sfzhj95gqlnevx925nvrc89ecdkrhpb2aqf8eb5ez9vnf9wfrow7bxd6wzgh2al45xys84vypaehmw4tmloolsbqu8mar895pz7zin9l9qiu1cb32y327lktuys0dtddknobuzveay73ol2xmdihtli1nlk26h3c95tryvvvawho3p0ot4pz8rnktz29tgdmpj2ig2zdfxqai64ua8q1fkt948o93863o9emlqmb8t1opu7ocvkngyhunmx742je23ho59cgtzeltig',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 's79z83ei36h8cdpr99lm',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '165jckgz7ij4hgin19srt41d9mhptt55btsv6aa24uruvdbsoptnv1mvjhwwupjtm3ruwzhimp588lgal7ekkpe9jixxop74eizh2nm1980ukkcb6vw32kqny4z11bdgeravs05sbzotkyv53w4syibmsm9wcvat',
                channelComponent: '6iw91563g3iwm0lwnn94zratj1mf8jnz0ehyuaao2k6s3cgl8xupqo6y8ws2dyxqjqj9nnstg9h31oiaoa7wn2j437chomgj9wi4zbft9sani8vqrrz8dquhr4zqyc05w4togayp6z7bd0rz67e1njkz13kofq11',
                channelName: 'u1byfr1ss1x0i568glbh5rzoi9jnmtbbdwjcvelfx7pe04s42lh6qj073d74jxa0l125zqbz8ifgd0xl56c408y4lmjs4xkvvlaauq8cf6x2hhifhwk5oqa9e3uyvhi68gil7m4i4jtyonbl3gj7tv7078t9nooi',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '4e0qnhomj7sl77gtwlc0ujt89vzj0gelehszbcee3sgvplj7vmdqb7xikqauteid1uyaxc9yhydz666702l9xysvgmkvl311yfpeprbi4f1jbw68ablwhilmu3pqhvafm5ep1fajvqtwf6hlvw2dx01i7thcadsx',
                flowComponent: 'x1ifrgdb3pnimhjj6kpnieb3amiwbt90up8xre78c57dpc2n3w0c4ha979mabtiena9zvgu08pmhzvka55jfc0cv99z8hqc2yog7p2bcqqhopuldy2mwkpjqzihdcesro5v88pl477s7bkf6eemfos2zpfa0wjcb',
                flowInterfaceName: 'gykxokbcsm1v4mob84g8rj6rada8deyqg1yk9iz06upf3q3e00x2rpyqvfmwan6wzv6tn6fcal3orj2sdemkpjdc0jsx87nmyq42awekz09w1zicyi6uo6fgiumzkdviljy4rbom9swn2s70t96i2vuko8bmq3ci',
                flowInterfaceNamespace: 'fhkoxwm10v8j6b8f2d78490okhsl2ce79ed5cwh0gxjokhq8ncj08u8q3qf7lde6qq96wflb9b1idbfo73rbvmjohsahqikjgi7gdig59fn07y3gf6j802xdolk17n7u96lic9fjxnw08dp8bkazt2nzpy5qv6tl',
                version: 'e4hq1nf2unlep2is4c56',
                parameterGroup: 'ie3h3ylwkc0dwlavscda9er4rxm7hfunv3qj3spe5s40g3y5hf80jqyvopbkulobao69y0ehl586o0yu6uoix56h8qoqpmttksq2c7qqja6repm0i2srhn82sqyyt614jcvj1hu5ogbzonn4xmcdnab24fcauqkq327gzo5v7i3ya9anfyo14ov63dix2rvbt08k8wp9y8n8r4pb5ndv1vee6jns6xlkys5i533aipqoccahcgnjzpz9usm72oz',
                name: '9m89swf1f1fzihjd4hmze0koaldf1spza55wr0latqb4hipgn3v3ry7p9q3g10yul6geuzz6bhzjl0wrsfoaa6lxt8w5efjid2g9ducd5bgi1muef985c1m74bine7vhg4o7bsa5267ii3f2jwn5qnq0agsilwlirhfb2p3cpqvawl0sgsp1ksfvwj0c17u3nuysy169a4vtf0j4hvqz4wmankmf3fygqavic4s77lr4hx0gnjujup9oworenuko1hbjsp65dqzmeu5yef2siggtrydo5ht0knyu5h3s9q03vjwwxjbiihv08umvyy10',
                parameterName: '3iozblio7nt86p284x4ore1d19to9a6bk5c6swwwp3q2q0whxnz9k5otk4tkgs7jnp4tp1g9m1d8izgdol9blzm6u99zij6wbn0i3km91mxsk3q6nxig8aziv2iakktg0kv5m11cxxba6nw2pvdguhvpgfhyj7x7koy1hdrcsino13l52vvgkchfmjbod4qh7b2yc5aoa3gre77bsysvd0lu0jqfegf07uamu9xd0a155hkl6tlnutgg9g1h21dcqf4zbh9ymsf3ii5gsim6r0rn70mb5fc5gg9gclb03gbioiay7v01f04gfc4f5g3t',
                parameterValue: 'kzggg8jlq6nj4g5ayv5hlxdksthvq2kfvubiehtzm80yorowjpcdhkhv5gp6mc1c7w3i20bme9k5uaatbfygt1689ihoex3ld0g5zen75oa4qtv3hkm0qvs6c58mabn38agko0eyowxkq3vl22lf49cwvdw9qig77rkwd1pcuvdefn397wyv2us6nf2epok811923si2bjxwqv0a3e2hx4eomi1oaadgqgfqpagpq6yaa9uv7e8qt285c4vrvwwjj67ca173q56wmog2rv573v7tb2ylrup2scxnyreoctuiep3yabfcb0yxeb41dxpekv0to5h9liseu09w0swnj2wfnapk5cxwgz81e0pfoz1ysjmyqalm481mtza0h96u9s3d67akl0bn463ldbql8rz4ltajacbpef2g7cfeosysperxlico74t4b2c6y33q465l98gb4leattiogv642pqddyzuze475okdqmjt2qxnpcm404g6ywb3hqcjccpapdmxn0p1yvnhxcwomd0o296mgklyc6jzu9wi68nw9a1hqb91bs0zzltrkbc3hcbhbwweqr06cihhgmk5e5mdumwb3h1dslhghw6ps2nf9sywy1a4kpe3vo28aee8sovw4pykvvrudvhwe5o8c6fss3uj9tmgaip522f09q701l60fvvtbnjduh89jyjgdujpxzwwyxqfrs5o3hxx1016y116zq3xws1g98ejk2rwn6thjdp1exrgja3vthnqw89s1t7m4ilt4p6pn7fkkk4jm4yc5txgbnhl0wsg1g39f1rkup1zsnfhxyrlly6btbdin8gjgghg91hxtridt31w11cs2jo2xwpp6jcezzf14voq5lr86gpthieri31lbkssoxg4v8bxpkl19hsa1h77csyhsq0moveua0e4h29c2dlukgx4o3zuqeuqhavkzpnh8q7x4ytuecan6bc8fjs5hg2x1j96qwc1nd5us8a8cz852j6d2d5ljtcq0chx9dqw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'dorhx9gok79c49jp2tvtby8papfxyfhp8s9fgsxaszxcqqktf8',
                systemId: null,
                systemName: '036wpvvunnq8111i5ahi',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'hh7r432sliquewst2jbifcajii0w5vjmo8giodhdaei8srbd2fj4guwi5tmfhrynlwkp6tt9a8y35fkq0x8x6wzb6d1ipdsl8prdzg81dca3m5v7k15bzxdt4stwsj4w36ttylrmdc7alfhyjk5rowlkkv8zov5c',
                channelComponent: '2dhlu8womdu1ybbqf094udrc26o4xs022gugzk8zai5ikjt1ka3aokfwclmfsz9dsv6fqsivgal9sk0pt4tprsj6en67qsqgvl1kov82ett6bz5aj45dq8fbopeqzczgs35k3zajm0yhhfz2t5m7n7eceacqqm4e',
                channelName: 'dc5pkgp1aoh75j9yfit4fxfkpembu4yjwiu4bynn6bsamhkmqjmslih2hscvt07ggk2srpu3vczzazyt40e4v2790lbi8rdt4s7cecdst3zvaqd1udat80tmdw7x9vakp2xk8dj73t1ye1vf249enh70xxfzr059',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '6xusr7j37fafkeqpy95w7v9ba7th30hni3qvcez341w9r20ggl1hf4k9wim205pb4iax7ejns73ccxk9z0mvya91asowgtpg5y0fwro85n0vwzsgud5gkwew76tlihdvrg41c1xwoyijy6hbzof3klsn4oekahw0',
                flowComponent: '77o774xanwut664efiwgteux9jogiwd4iveqnsb3kyqetlc1ecqr7qwxmgn0bolfy27ca8xfhtkgxxda6129p9nkerz0ulas5hvgj4oifhvghm4zevn5q3hwtuimokgun1w90sdi2scwowk6w28ov6j7iz5d2xfu',
                flowInterfaceName: 'sao8low9271i4zvbpurf66unwk8w9uynhjl110rzx614830bm23mjtvjn6ao6fz665qt5f7j2dxy1uf0s49ivv2d5tnghzroga2nm5mud8zppjnnpdlpu2qbt5jy7p62h4o0jkbq4jbzx34ojoshqoi5rlckn0gd',
                flowInterfaceNamespace: 'xhmpdwv6rz2pknsxsoy4uf3hxi8b03nw6mo5nr5odica6bwzibc5geemxnxjdoek5z2iifj2fgh2ctp3n4vvkorb32snco2yk8nhqphk3trou64z8tyaho3py85ursh8u7co033vdzmutzupuyw4jzu5proe4ll2',
                version: '0jhnp7mfuse6tr4yn7q2',
                parameterGroup: 'mzukbehs24yffek3jciyaprhuyrfxkv7vavwe4mlwj63j1pq1um0ysb66hnb6zd5cqtf8o41klh0519xuak1vu9dd2ndbu14wopolvqqg9qk3hnlnwmrawa16vrqk6njczfb1t36gcafx42vzcllxz1n3pnf9e4uiralup1n61octumyaqwn8rfgs0dlm3s4hh2e11w8lxodjh85wpzhozxmsy1rhfiolpvnxkft2mw4yvqpj7s93v6tgbuhtcb',
                name: '9vl6f7qtfxqn2b9c2p3opmzetxb3lafg0m41tr1nbsp4ihrboyodokrrx0i49qzjyb2hzqed6rj7youe316icnlgwbpog4oogwgq5a0tm5t53pitk8mp0f6rlam1yzbnewfb5smc8gtu68rrrng65q0awg2rrtn7dr6hpknh0hrnmjjmpk2rdnhc5690smzscb1gv009n378m5zkstdyo7cbq04sagbad1xym1kr4pp4q1tpytlnwtqyabrv02wmcau1btkxvrg76dsuhki0l011y81pfpq1uvzx4hwobxta54zv7yhlhki69x71j7n2',
                parameterName: 'myoxm0qypmuwhzdgfce37sjucyddw3kdyvmoe4ush4q7t7ya8thkzm88twslu7zmrbywpgcaj3f8tuq7nxs4li9bngc7wk35jprrqbhwoylmpige1g0k1nso3a583va3cnoi0y2e66u6woeb7e2xosqi76uk25jsc9edo29wtsyi1ojvawbhd72rif979n6fnmme76yejarv8t2hvtugrn05v99wwdsos1ussthpmfpnvxah96wk4l60p68796pd8wgpvfg84xgo2j27s5262cb8qr7wqmkevw8orrm2ccg7zt3y5cavjb01lojm3omv',
                parameterValue: 'qdvd6fswbuwjq3jkb7jfbmbe23ugu7tsco2vrxgzuk2sz5bmlmp5iwrkq6r4xw2y5ntjzpoi2lbs4rrwbdf93qvtbi2huxrmozh330h3fis6ycspugvmplsl6n62sgqlncwy6uu3ljh5azlib36yogwnp4g1bpoyspafdcl7m1qvjwsqk7gkwki27t8fxytd6t9p2td0ha303am318xzmz74hnbfxvr0j9c717u9cy7r5o0lgmlcskwid9zpgih6mt262w01jy4ublrz5unr68595bxwc6hwaa78wurmqeadvkdb9iwsa3kegyd9f9cbct46amwmw56qqwoixofq7u8s6tafdu4u0p28vc0ig7atb1qiuj2jwfcqohdb3qzyfmkponk166mxqrma4y36dwxir2wwkswtv4k3zvmkzuhhrh51g2vp0i2z1mreebnvact2idgxe8p70aut96hetixw3kkuugsjzuzb2wnm3kqa7qagfz093nlo0p4w3b7btmnhl0xkp6i6txsfpulsrmsu2hnvgpir40me595xmw25871281vmodwyk9fe9t2hpld2t6wrlbmwwknghnv8wlj1sjizaqy6al7kkhtds5jd49hu0tutaxe5yfz7qfdupbaz1arhli67g4xzaeuz1dqddy36w7vhmx4dz2a5fpwa28r3y83rlwz0s7ejqdc04lzhlu6mngnts6ihlkmavsab225rzsgjn2jfvr19f6ex1z179k06f50nkyopv8mwzm9k5ib9vsemn52tjg1zson80gqt00x5ucbqnxcqtap90uj935h165fk34l4x7bnlanpjrfjzy9rjmypq2gehqb35xwj1ulmsruwmyhoh6lqv61jea0mkmqqrkfjk5c5iwd9dnosfglb1f3pcjnplfo5jcdtaudmqhotu9leetyqp1upmerq0jl3syr5zi5xs5fajmmdw4ekgrz5bcfu6r38tziokww51lwdrxtczfhes73q7k36ps1uloswl3yn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'd3zq4lkmr83pictocwu0k7wvggnj4hyqxrrwziju5h6h94o1py',
                
                systemName: 'nf8rhg06dbz1d17sbnre',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'y2ugshdfz09t7rxez72iw8j0bqbpxzzqdlvd4csnhf2wnqw9jyldgsviinhcmadaizd51zb2i3uoprrc5nbmc324238lj1q4avpvtkuv0mgi7l3ovmmkoadv3wkj4kynli43wbukt7153wvf8is7vu47qoooje62',
                channelComponent: 'qry5m2jry4botqltc3iorc0a5clf3kzkkcwo3q6soh3w40kzu2xxkjnuo6ie7p8ljpj6hof783epzqkdjt8lxygh6djkb80rbs5qsllkenk5x11ccvnx97vc9plrp9l8d7o36k3mmw6yd5c3brm3vpifctlu6v80',
                channelName: 'bwub3l1prx6waj3d00xg97numsibon480iu86ydx6ofsrh9bf8x9x0byw93946lqyjrkcqvdbi9dokyivr68wbxwdivrfmn5je6k2wau5pznepjg72h911a87nfztkslj12g11it3jyb0xo4i7ffuhlc957mbn95',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '69051ss3iv3fxma6h39j0yf4vrh2bzc4282f26gbtxd1ds23ydagi2vlufclbr5d17v1wx1xn4l296dayerutg1darwunq0clu0grhzw2wnyq2ez7ng4jl6tauxnomofboosoktq4xc4u3ea2oil9m8fibudvkec',
                flowComponent: 'on05dr0btp3hxk6tpiskfvdhnsvp3zaty8rnr11ik3tp3p9gtmmriidos63fa3yvev970fd52h8mcgeedbnygxvff26dyb6lns8sk313lvnwpyvvdmn7oqbww99wfviq8e86pfmudg4g9d5dcpw4vkldi1brndx6',
                flowInterfaceName: 'h53xyd4w03hhamx1tj0qn0l8wn7zjafrm9l7dfgsn8y1szdrsgj7me5zsht8gs57jjmcej7lazvf680j21pcynz3ioqz3cz62olm6ns46cwox68sv61rzccedeclsyr42782itmnx7hs2qiyef802mj20c53rycp',
                flowInterfaceNamespace: 't100wmcddxtzayflloxjiwtni2tzmj6ywz9zonf6orqd4jykgul7tvj3yp3ow8zpazwvk29tb6l9w179ezfm8m1rgylvcdryls7zytlab87eae44ebot52qsbmbm55hrmgjcioz2ubxroyftrhghv2o0wk24jf90',
                version: '8jtah24exrxatet748yv',
                parameterGroup: 'ux71i52s1caa5sr3nm2trwz2moqg8ulh6twxknqu796l8zk3yzvcszeyht0rbe6d7m5cxpuzor5ynxdjssqm4o8rxq4ki5eggpsqp3c12y3wd2agi2baz1yu67gm7s24nw8m4kfjxt7g9ddeered1fv1nkpzyorxbp8mtzi4aiepthzerbikdjwetelasxlszls8t8cio5i7w753yxbpq545ovaxbj02rn7rdfmjkln7o7asortvszrmly9yq5d',
                name: 'bc90m4kl6a3hm0x1tqglzsnupkep1quuwxwm8jtqrpxoa0z98g7g1qu3ap07tfkv67054au97xti5h143a8pg4f6rxv702yuzj35e2etzf9hsidjc1dgvld64y42dedo2kuzjsumo7hdowbh9fjkt2ktoe9rqj9myg33b7swh3cd9b75feg6qg83ycpn0ggh1klie3a1t5q3f209qyohbjzzix5e48frry3zulcvqyg7wlj2ue1veujtsvqmz5thj0u25x1v7hhqsobvofb3b1o02spvv0fwmf3vswbni6nepxssokbrykbz0jisca76',
                parameterName: 'lvsciy7m60swccnazhjsdvf627jxf7mw9zer75qp9hi45hb5kwethuerk6y84yemv16kv1owwt2ixovpl135l2arsyn1dvbhe1z83jiyuia7j81xm9t4cq6g6r8d4odw0jxzhrgtajey49oxg82th9556mdk5snkjvfesl1itxjwhvttcq5s4dyz8a31kjdt1g49aocl8ofl2npeyqx73f3nrbrylt5a5c6znv4j2s66yj6txxf95l40v5v6wey5uqqfc0jrt6g08oilnfqn38tuf69ftni5jpvxgfx8ibjrxga9mi9cwl1xb0z2un0v',
                parameterValue: 'xqgnximgt6phc4a57xil5nh7js81q4clo2dztprbiwe8qezrh3nc05we8x9qgrp2nhdpss32oo4uo2kzia7rhxmn0mfiu0c60ii9oysdl2ya8flecp3l4q5ayykdtux7btv3ktfqc5yeop6ln7yq2c19ukcntwrtbfh8kacpy5h6n3qfs3v9o769ai4n0zyuv9pwn6057r4bez4k7l410x8petc8cty82j6nxj68kulo58ybwbs820hj4u2gnxtrjjdod8rn8rn75lx8upr768x3fhgktc9hq43pooyzup0q5wsyu5tq47f7r1bb8xjz6ejkwr0u0nnmuuvnh24fxrnwrudkurfqgxwpydf5773792zueewx4zigpvnceip90gryj5swqw6cf68qzjesh535vx5nbnawoktceq986j5ah8myc9p4xlx81fmlyqhj48tphe7b6ofuuu10twsunxguyn3om48wrcaizvr2s97m1fi5098j469bwpwusk1cr09myg0j4i873a2r0znxq5yn0u2dd9u1w5yex1opars8y5is3lmnaos12adamx7p2tle1mmh18cvt9yvz3t4igdoeze6jwvr6no1zr76isng5etvr8gpe98bvx6wgrbxmrvs283uv49yjyfneo2r8s4zyt4zmfzixow2qybsgki47203j12d5en7vx2owr51tavddkoy4thwd5ulaw4pwh8a33fmpyn710flvitkie82u5t7kjlp64quvqdl81ledhd4228moqxk7kulam52cteiwefhlf230quuxzueqpn9qmqskq88pm06wds09mi0gv8ilulgscrg2qpx0srph62l5r4133xfai11lz6bzvknnm6rxqn2427v8spn32q694l9ts6ayxehej9r7l8ydbtwdl58o79ad0wsvjhuugidhwc1d6weuuovw00gn18x2z7l7zvgda1jf8175b15m6pqmdp9jm72un6fgsmojtxcos0qqah0r7680le83j08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'x45munk7sblu55nkhv4a5c8egzz5ca894lvzrotny1a5w1jto4',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: null,
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'z0amsoyybntf4mkilut4x6wtfv75amf4azeock055sgv9gd2cii10s3atlzsfc8z4z6t386u1o3h7b0ood51lb8pvvwfcpfg4h06slnw34p2on0tziuin0hm5pi9ztiwon5a8t0grzhqd7iaishjwrv9ax5d2fr8',
                channelComponent: 'ez8zzlgfcw3opn1sysc94rgiynpu9ufnsvkkqmhullyvboc4dl961gx08t4tr0fmrk6xbiv21yoxwlwc4xvw05xnt9sjl5lvu0ll35paaie6hyd171ofbhg1u7mb261rvaruw5e49jm02ght6i41hjrp0bwkm60q',
                channelName: 'vxkz4b1ix43oynlrg7afu9nd3lp585fqs6gp48bb6ehcvbldqkcdq3uvlb1921ipnn4eqqevv4o21lsf817fty36ml0njr3xxrsxkon8fdtj4ffnqcf2zpqxfs7wlz5ktk9h1a8k2otx10iku43afx2iibc8vm0i',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'npk3ae47plvna8hl6b0kmmfjesp9eg8iq5yxkd6ru4bt6fmrqyh2rarhxw6ihyb6w03fq33nswj154qj33u8j1s1cgbh8xw75o38dpb1v5tic6wwbmbfszvds1tahrub0ekj8osqa3vj3ipj3jembi7xh4b7k8vi',
                flowComponent: 'lc4t4b62v2zgm2ocftrw01af9dt1qsh72t6mk4v3bdguraclu7bfu217jc5tvesf52nyyjkt1sxz29x0s3zc8ettuzggptirqe4niwammqrbzcu4vwknyub1kvxyjcpj2qck40w95nu8ckweugmkaj3kdgspqmry',
                flowInterfaceName: 'ruqein7484eo98tz7p736bd4029mdsjcxxibkw1f4ym78z5q6td69swevga37jb5ftsy2hquffil2zypmlpqcmjxpmamgoaqm6cytnegp7d3jp7k5teg7tje42pahlntb8f48y3pptjodgp71ok6rfljvxzpsk08',
                flowInterfaceNamespace: 'vx0nsh91wfo8j77rixhytphi4ucb97kgtciqikqcc49slt4pvbt23z16nfisb1jqcf1wsris34rdh6l2s0ue0ikryqkmmabdatrvau9t1jgs8513kguvfgvcam51tatp7celdtmqgr591jljs63fof1tn66hdy63',
                version: '21u4rleb8i545h1uzaav',
                parameterGroup: 'jwcp884wj8310an40n1na0l9c54ppyf7s9ehwn3b7xtxstyo6qe8ikz2pvu2fk5s0iczr97v69h4ann5od0o7nrc3hrjhgw0awb82e1w2j1elmuwlcxk57v2a1qjy189qfq55sgl830ritnicqo573bozdnun8i916y5ta9srlat13dbw41ihd4w2k5au0aap10ftj2docduqovenigugz3gppbd7pkqjdpg8u3p2bbx18xwfeazml7ygc3pqlx',
                name: 'ozrytkic804b4ighd9h7hoqzgnphhc2cdqiipwaxl354nn8hghktlttqnf965prg8onyx7x42yy6y5a7gnd3xdwxeakzg3qple53bjm1fyu4cysoytahywo16ujh9ia6uzl58dk4nl6cr4qb7x2rlpc0m49cgk49egr4yq1icu955rdu8flwfsub0vwb77frufrlh1ogj1irk7z77ck6dg38gdbznpjlarhp10dd7lw6m27bm4k1w9c3ghslowrlcjgf0y91iytyrrkxyqmtrp3ot290h9aspdl7xspu5h4piy71mfnep1aoah4jctck',
                parameterName: 'c6ybkyjiiv06qe3rk2rrxpij702gzjyflj10man894fzldcfamq2mfglcuttj0cqak1ovw6cawtpiptoxdlbd1ew3nqk11qzis23cwzk91geswfg7oau55z9j4b3shuv38rxdhgsuyid5kex7sbolh614atvfmh1xpanve7h1etqmu1xbucnmq35wll7jv2fkqoeyde99tcncxzm07pjpoz3e7yy59zw47rojn36m1oa2v8h9bexdilrbq3l886uv6cl96a75kv1wfcvhdxheb65g70f3jrzpm6xuour8e9wbzcx0fclulxzyckk2pvs',
                parameterValue: 'hd8gtttfm37dwdmask3j689ae40lh25r9a5qkv56we670e9mychfnykr8th5dnj6cbr9159jsirtstbnzeiao3g7jyc71op6gfn9sdig8t615hles6hmzz759hx3dvqkgihw9100p9armhr1eqep3rq67rz99mdt6zbw8kgs4i7l649wr2862k9j3zo2q51541jubi89eut11hisuhrhdg347kv6iqzytyokbq2xyyeic9hm3uursyjzy5bwqkf6ppfowihrmf91sp12w2e8j85dw0dvnuwfkzyefmb7u5stuyc5n5a0hc6fj98axt9cjkfzesv9ivhonlix7tr4g4g7j2t2gvts4d4ap18psqsithotoseztiehf0wsryfuqt4e6xd27gasjikzmyntp4miccf6vq2xg3756wao9vlio4qjlqldma42eltta8adnovnf568gs4dlth3shca6y3o7orup7i8c46yfbhqkd6op32vvjwlekpdby7zj2ibqr7yelb7o0m3j109en8dnt4dxd29h7p70ylrq5th4rvruc59qo64gkqjbt0z3ya2b0mdy4nsfa9ggob028isw7ap14cke6sqehcmcrhqyhznfri8cfdo5i0oez7580wavd90jxfln0srq5d3euv8fqsgnsb8t1salrju9gobpm4mbxdvm2jogvs1nlzi9r9znzmt6jhj48317qklr88057rfeyhoquwvgjm5es2sha0x8ci9jt1c4lay30qvn1yp6wtv0f3zv65kxfqaz8cfn65azx1d8otyuvuif8m3zsbbwcgy7e34b9woyd5x9lvudsv2arz649l29nonzt53azspgz6dwyi1saazu2aok0dva5gwba2v6fhnq1enm9u9rrfvkvpr8dkpzlh1fa21e15lqa9ees9bp3f4avyjzx33pi2butv0cgobwo0f6s02ocvfcrgxbpyu8lqwjxwp73xpyca8t7zji5vuyyy7tnlnl8ofzs8bs5p0ie509zrz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: '0dfoyftbxd0hnzcuxgcmqgnlh9u40n71leie4iwdfz2gcyq97s',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'p0akp4devgedlyye1i671wjk450skvqp8mmrv2u14glxfrl05trps9i9d0ulfqzn3ui41hzb1tslch2fmphb7lhzt55xtvp3086kfsm985mvpslrhp3klt578yxw6sq80u8i73pkx7mmw3hba2kzl0oacg7ubzuh',
                channelComponent: 'zxsmmasizbbtaiejkga62p47ywg0v38oh1ade008yjlyg67u45lon22wo14a8xlm3jzkrekewsyj1fh9lm56p4g6vmfsgmmy4ypb3160h8hgvswuy6df5zmoz8l94y5obvnff8xqsmdic6mmcck7dmtwemv8oxlw',
                channelName: '3gh9aglyox0igwj3ip9dzvg4q4gm1lezvly2h0ut04dkxxxt49myvocf7gsh2ced7a1i32r42gpesvvpzf8eay7v93y4wqdejhappuq6wp9v879pq1bkzm9d9uow5dqykyn9qjs6nu2yxezjc1xsm4w4zwnz8toh',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'hd66x2pl3xazbfszs5wbc42bahggnh5cf3arx6rutf1sq22g3bnv5j2e4z2qigznkxq7g15cim8js9ei6t3azoywqkjnije48jhcdw5xznrhad05oc9cotda1yokou94v3lsoz4wfdsb1rlukrog7o92dmn30ggl',
                flowComponent: 'z0j1bauhofnyhgdwnu0j92wfvm4mdxs4gzdpf9jc1f9lqg8dlgq8ven8l3q0ln1flx8js2cfga0mo91npvd3eiwuzwhvyskcevgkunr0zgy710fnk6cujo1t7t3xjeh0t2rubt2g6vbni3gykcuqhlz3ey4tehn6',
                flowInterfaceName: 'dzjx5yn2hg1a1ps259pbg057u5njpuw15q3mct5cihquhpbtba2qjhk32rt2fnrtv8b6uo92gqwam5bo8ib1dmk2ihwfytnp4lmggn6486mv3q050vnwz758n5rcx5q3az0plsd0v7qsgq0ja6r76vearv7wt5o9',
                flowInterfaceNamespace: 'srofllj812vc3d2fptapjsg9v6psthy7ggj8xslf70bwxzraxi419hn5wz2jwu29y6rmrp616d5q6wkm6q874k2wvguk8fdpdtz34kfyxlsfh1v89and2mniyjo45qqyftqvllfl5pe8je7itzqu5cr469odk33j',
                version: 'jqdawatwk5cixkubnzdr',
                parameterGroup: 'ahelv8crpwfd64mivadiz3lpdhqydy1jqkf4jd0bfekyfjk8r54f3nf18ww9jp9hvyzh2cv2ey0uil6m6juw9fqu6k5juzvp4jnsn5edmz0ickk2kgrbci3ypdqvdk6pqkycgu5y22srknk5fhz22bb70o1hc47thtt948g5c3obo7q5pys1xldovjf76r5n6v9qabv37dn74123ioifqxku50se3uc5sp26c6d99eoonsmhn7uv2mh4u4s8euu',
                name: '6m7czt9y25az0ymettk406ifjj479x01az7xd6171t1uli8ktvumsbgueisovmg7q83s0uav8zm8b8002ijk2t5od6fph4idy2lk5a4u08nevpojg6j4uj19th853os05bmy9i3glugoln5ok04g93i6zsnbekahpkhwlbl47w5ja4nisnrdbxwc3s6w0q4gmhegajo5ls4sucuy1gl0gyc742s8ila9p39nhqsht52kxg0ecu3czujzhefy6lwdmasu1gwa5it7pealtsgrnwfo0mn3v7t1qjwljn72tyq3xbysmu5nea8vx9libdoc',
                parameterName: 'ez3pf515y67hv47sxjmnvcl9clhsg0qzgoxlhjke37ps2klo8k4sryd60q6ylxaxnf6p3cd3j2usowdiwyqtipmvonea0pt4hycfqye6kzzxvgpy0d95yki890upmymgjob3mlip5ydqdyr5qmzt8sdh5vpsnnoe6amdaralkrr2joxswqk8w2gxlzd8jiwpqw3ge5s7n9zmt9myqjkp9cuyj8n918xjqip0wbiyibbyvzlh556gll3su112ey9g0mx07pds2xwxx9rd8mip9lo28z2nw0x8yxmc2izfb5gwx0ny549g4hozszs4hhlr',
                parameterValue: 'gug77iurgjw171c6ub1l5jfod2xbtd40c13o8jkmmgrpe6m5yjpdaxwmjn49er259efsjqe2k3xehwn5uito8el9eo2mrbtg9q2n4s152rctwy5i5zbx453bbspxc3en6nqokzqz9j6py121bnssmq69epkdoyw0ljrazlr0zfzliy4igm2qbgw5xksak8ilaahivxezewgo8jc2qkl5xrp6ovawxv0z87xlrjeztx2o147ag6np13658sf5hls0p16qdrcdpyosae26xjfkr5ckvz47wi1gugzxzozt8abqm5pd19p0eqgjrxq44hof13ttq9ek1qxar8gmru4147pwxq9pyfii3yg02htghnkp7tkj4k2w4fr15yqcjmmsjxkdx5tkxnnb6ez48vjwavedp7z1mb57enys9p23vofyzj3xpickl9pcud2cdlsd4rn9vgox7fgk99n78bx2qhq82zc3prxtgewg1l0btk920uoe3yiy6dbzbgm2tr7fhcbfdiq8lsvnvpw975viu0revni32526i5i9jpkahcy6505xewlfz5hfgxjsh72bfyua8g7n5enw9u7tf3a4v52x23kg2k0xnrfgw3m0x2a2c7ntqbgfo404oncaqjgt79b7ycroa2ys8ey9ucq2c45wegcpv9w1ksgk5axursk7wdsjlsp8cna9isalbv390mashn6iddkm0b3bu2dimv5i8wf4phi43dbgj6jdf9m2s2pwlmmbgqrjuyfv3hfz3as6o6n4xh9kg51k4tshymp0b23hu6otsnkt204dd5stdw5l140yxg1rrw0kp2o8wyh0en257yfznyu3v1kys2cnlyfnweircoabt8nqwub7cnlvvag8hbbdijvsbfwccux9lrrth8g6gm8o838m9gnsjl3yy1f4cx1o98wmgx0flqbaz9p5hdnpczh4db08ke21hzqnfd49bm80pi0wtpyjmwy0me51t4ahllbejhl40hbjrqp9brttlhuavo0k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: '8hhv9391jfp5j11ly0du8zmou6weueq18e8zw5t84dehz4vpmc',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'qcxfdui5d59km8yu52t8',
                channelId: null,
                channelParty: '9xhmyu54j150ioon6ntatuz955fjcl6lsqiedz3et4dsq3z61rky8n4l1rga5nbua7aqgu6eo680edjcnebib5nfj00fz6gtpwp4fkf49whuz2csrvmcp8cw3zxtulyhlls7xwos9bh6sx7yf9pes2jktgznp0l6',
                channelComponent: 'vz922qk62vnz8wg85narmqhl34rbuhkhy4n7qql1tzj9nqkhc6mxjcopfwjde91d155kwx3bvs4zxggox5fkizynzmyq06cw8dmvfayfuujbu67236odk7zl4xz2uw0qg7zebr35q259340inzyp3sna0lii69l6',
                channelName: '9ojw73uv9z0hzmmm9zudg1xkpu6tj9ljrd6h66en7ex8doa3qa9g8u9ahq83xcqaj2qy2m6vcinhodnzychf72jh33ydzeglwhzoz154yz53yjq1q97b2siqdb5k7aw24nzxzld0uew7q2fp0dxzys52bvbmji4l',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'mdavcjzrrgmsd4a4hb3q0omwofcj9cuyjyq0mck46y245bqjmbk8euudx0ttq42gujjfzqnnv3gm8bi1grio6rupd4qfdxn0uwjv1jvrizwbem6i6lcp1dqo93wyfpmyhv2z26lmabjz87p3kij4rsov1jqgemv9',
                flowComponent: '9fib6k2ehm43a72973szpy8rd7nayvcf451nko2zs8pcg89hzgrmtta84dbej6sux3eh6tyynvt33nsb0a6ceig9z1l286h6x7yegmxo2a7wp4i9p018hpf9zovdpd1s586aeqh6lojvz3dt88h6wiynvvl4h9wz',
                flowInterfaceName: 'on8u3ajvol257kry9c1qrweop5mvv1gao6bijse5ep4qf7pd8yfjq94g48lp8jdcrwoy2xcokhivcg8iydcvdu0myof481hpmrmbyv429mko3bssc4not8n1sshtt1si6yot29oiqviu9timb8ww88mru5fo671s',
                flowInterfaceNamespace: '8ugdy38qi7nfgztrd3y6g503h4sk831g60ldbevi6w7v1l6rd0fbpry1n633y0fjwhb9stx4sl16h3i9jfthaiw1bwamryoe34nsa1f4kt9iba258t50e0b9jcccok2a4ogbqcuke9zcwtiw1cufrgaszqz654c4',
                version: '2izch0ziwfnz9reluh3k',
                parameterGroup: 'izg8wz8rjw8rq46l7ifeqabw0rl521jt33d7szmbw0hxiioqtboc78lidp6nuuqxo72z23yg3vsd9w8f3g8ctmiac9fihlw06zqxct9lq92idi683rmbiof6t78t660sdusw201sul05dac977bljevqs384yv4ytecxl1uobv0n2w3jhr7yzniap8gss441t9ig2l2n6wyutodip8dtyxr2tr5hocmpqsjldgx5fzqvi6jtrpyrw2yihpx3hv0',
                name: 'wgwntnif4wvuxrasav55adkn9q4x2pjctv3c8dvqukecyqjc08dgamopd9rcvzwt2hjv38olxsy5f6yl0anlbe7hqrv9myrye4lamf9hrx97rpt9obzb1y9t3kh871t29pr46bbwvb7k4njr0wr5s3c3fw1cm7povn0shp42nmvrhxnemyvbosry7zk63dfq6pccgx91dr6vkv6n68bq6r9omp1xougzl74svzsa94abvjrzejq0tsdid8dlgn2zt6dq65qsng5rvnq05mxt55fcygi52znp86g5t565uot5bcor6yvyh03ko1l1mjvz',
                parameterName: 'ydxl7q0dhfyq8eq585xtlgjq0igk0xbp7i4606twua3e4btg4m83yhwiow9j8jx3v5y7qee06s6rb3r3ol1gb7u35xhlbw1j0r7o7odi7n52bulw4kf7x86elvdndg256wh8qbf7pbn8v24bixueavzt24ohj28divzqcg1vom4i7tzrpzmyj0zwjeaia8a2i2dmwbob0zi9gd5isju2bzgw292uaffuwo0liiy23rfhg1rvo7yugl7l48qv9z9yabtugf98pupljs8r3ryzmqtssax2wfg4pn20ylsmspi6k4mfnci2g6vah9df5mik',
                parameterValue: 'ihjyjrkhqqlhs9jngsmjjamblc9l3f5zab8devq8m0j58gqg03v3vpprfh3a9fxr0oo2kpxj8zg17vihxc1m4czudq35tcbx3dfcwbriupkwiw2lev0jg6ob772m08ji9ypmgqfym7ti6mbxqnjdcq99dedcvrh82dn0l3hmnuwnhtdexjivwhzlb0hx95s8fxsaazzrw16b2emyc5p7zgj2czd34v8l63dv02qa5agv1eyoyhenl995q58wcs5zx50gzoi0i1fv6pndvy4a2wtzl6lcc56e3hoiz2tb1xje43lramfyea1ttzu2tlmx98owgbo1drdonjmjrm9s4nevjqqmrnnhmeirhz11zazq4nqhhak45870zghbtgpaylpf8ri9akgjjvft9o8i6d004scalagj16v4l49tts0d6wuwpc5alsgo2979hfjh6mektt4ogikuswuahqol59tu63mhuw4r0l7ry47m6ck484cjvqx1k2mq30w0g48rr1j6eazwcpd3fgkx0ab5kf5d5ml4mc5dwh4ozfu5mk8w5z2kpo5ecv9ckbx6ismh55cs5qt5xi2vyz7ssjesed9881t85vl8d1uicmq2fde9l2wdg9h3q9fkcypcxnbwzfzng4yn32f4fcrgesk5cm56w6xib29mhrko2egh0vd6bkreq564rhajgebj0h96qzh45yamodqvgeoneegjz5ikddneo1j72gotpynk5xi9599k0lnssk83h6v9oym27cgr5hyf7qtvzstrdcz157fec8acf0mj24k9ejralixrbfrfgsq6p25shpdoygsfyqohbroqirpvjw0ps37hwoc2kl9ir27stdzr52rt1q22a04hc6f860g6mqkvsb8r1mg3x2zf0ce31jy2eq0uya1mfebpn8xguhcho127dysy99io7z6ng84cxe81734xlmnb979hrxoxhp1k2rkldwl4g926b7oe7hgw2n484pd20z81f11auzwl41xvev41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: '2oyjn8vfs2ydt2xo7c923gdbnzhn70e8gu4fk021qwzs93v1dc',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '1lx5avrvizqhstk8edgx',
                
                channelParty: '0i5v8ah701t22kj8dqpc66ersg9p9ol7q88og3oqvwhj75tb1t7ni0m6how24nht0vdl01tk1zz1z38byfh1wki304pyzoaag0xxwz954vccet8e1gezod1tz0rlajrogev8mkisnudhy6bz04nvzhsxsv5w6n7h',
                channelComponent: 'wt4g6bw8nhxowq4d2yjkewzqm0ertyy4msoyg2k9nwc25cvl45yemsw7js9zp0yoogv7ju31rtt9ndclqc6ngt08564vr6h7mbp144k83crep5eqgbilxbqish2vmjsz5jiv298141edfyjhfq99i6gbmfx198yj',
                channelName: '0v6ory3z0uctl9n02xbuavy6lr4ejocv3cqtn9nfd4mag9f841rtlmjx6txdsd4ebhesgns8gfgn6pdhjji9v8bpju5xi7h5wbtuu537d68kxernu2y7wacx9onm6p5hea74j5i1m8aqgwg4nwd6hn2ihox9xfvt',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'l3hc2j1wbca2wru39sxq7q1dmo3pja93i16bl81720v3oo74gcv6ec3ikb7g0k7msca9emw9wkwehcuxkt2h2grvkfrirgnivbc2tinyvugya5a4r736xdzmn1y3j5sxfjbt8lkwdjc46pwflrazhx56ohulj913',
                flowComponent: '12y8vwg9w2iaayn2c89vc6czzsscvfhcsp2khuwqrmgjrw2820a3l3rrwoxypgfrjweo628mwdrp6vxlkgar916v6m67xzwk87kn47ti7lqcwvuriya5uv486vcj7gr9omt7d1xm6knwinwruulj8yb4xyfsizuo',
                flowInterfaceName: 's0uieiqgxjb4a28degjujaf43kcvgsjqu3pc2meju64i7pespkzybenlo49y1k9q4ig46amauyg6tq1nuqn6uag1o0h2rc7h4k5ahaudgkdxvirawvahbggftdsd4xfndq7sc3gk462zc4cskhzfhf5h6h0jgizi',
                flowInterfaceNamespace: 'r5zwlv9jn3u90nrzjdmfjdgfypsj8noy0a0031c36zn2yg2qyfpgqrpovv6wr3to5x3g3h8lqp10h4hsi71b7wz2ommf7zpwmbzetqu7cjqb3cf7nawr1h5jzv6byeo3v3ts3cajyek9mrb5fdfa1cblxlrzwjye',
                version: '2lba44x9hxbnou8fwc14',
                parameterGroup: 'x8wdkmtcs11rat1csaf3vwd783hz49k79n1wf3bapkv2rl3r7zulhgk06skpbu1kaddqwlqe9bsz9j1avs0r89gj9w0lci2nr6b6cup4grp8r07jfr8z5kn6mzz3b20598gpovxeuzhh47ili28wi7zx38bw5emuoid21hd5ir7d4kj9qwty8x7l6o6ibw3lml5d7j5xh05hh588cfgatde4ihmhh0uyw8nmhrsgh4pbbj67pjdqcdiwczna4z1',
                name: '9071k465inlrue0gm9g2n3ja7w3uvykq51bebaatl2awatc9veinaqb7bjlhsybpy0m9cz5z42xs8smq9qvgv138zrpk4dob0zhj5ahn0qmgnss59nwf1yta5jz5ywvbw0id9l1tabbu3hhkpouxtm6zg3psss76bdbyz2vhetlfgtit3cocxri4h0wqvjuo60rxwj1mosmrhv4vgtgj4g7kk0qvc0t353crdfc3vhump40fndz85578f7nes6dptw6ujthns2u08cf0u5zkikdmb7ngdxmv82n2salhqn4b4pmkowfk3e1tlps6uc9m',
                parameterName: '2t5gf7fen3wu34r5c2uswvgr1te8ddmfaff7d6v9avpcvicx4l9bi2djxahe572c34rmk97j67qd1q1osf3u8olgie9hmtggmpcddttpgbalim60wu5gghcr1q42pvz6wboqtvmpw3mnmht2rxwrdapltar8fa00wfxnuu36d9etkumopzwk4r4w8atxtr6l1g1y90mr503ki0wjbmws60ij3hctm0vi07jfxqft7cb6jt7exd2jiubybd0f5w76biijsh03m28ho9iq3gc6ozvj7dakruhu6xc88tpcrt3m5s1wlcyahygfrjwx3tjt',
                parameterValue: 'vhdolp9cube1qsgakvi0sl047sk8qw6smtlpffy2h2wyhl8u3rs7zastfrnq1txv9fd7l66j1t1y7ib240fgomyrufq81eelsy4huxyc32mzvgomzn1mtyi0g6wjdb9lxm2tcoxbdqg93r9kiap8mzw09n1i5lskqekntygaim3gzuk57vz55os6bnb1e1a9sv10iy26u4oicg2zu9u2lnp01kn7tqdweoy8hpljzcnjfzhf8pk4938ccd7paxpc3n9mdq5gggvzo09cai3a6sxjpjsx3g069zb34l1rapbxkc3sfukteujf4b95eucf0p6ggj5ds0bynz59czem56pmftjp9xdis976g5eib3mf1owvmxrlynkvmgu90whiumuvw70kpqj7ho8v7gqunzzmkhqr4qczsxexlf1vwm3iktk8w2tn1psru0zlk0v8tjai9c6yo52v87g01nky30rwr6rc26pmbxl9m1bpnsja6v6bf23wy9i6mwrxtlndlsuzqy677hrxbr4274njyp3ql4e4hqmfuvvytutcjkvtozb7qj1gd92j7l0pth5kgloq477omhydk8o07asa7b10uvvqzx805tk9h16o4wo3bon9pq4xc8hv4yqqlxfbqt5s4iqnplaqy5hfr4xv785zpl935pnaamk38kg13ghz5nywx86eal5j5iytsp9lec91y89j2jd2hmysz23e1ym2d78hqnht6978h8wdvia1jaos4cbsft373vphpvtwfylgrnpzxo6x4fnmn6cxk0ymdmj4cr008mkev6uc14o2zechm37dl63cvw0m22zvkjp0tm1heriqv8me8pzrcxb73gf9ijcg57itm4b5mnsb0spxp4wu7xfai8pd58h3xs52phvuu256tnutfuotv0gma0ch4g1mmbnr30x7s9wkhnbzf1y7ayjrtojqvp1cu3bp1qk7pmn76rddzcxqreuuk871php18w516m8a4kczc41oo03nmh6dal42l2rk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'vokowhl5gddroddhxllews0z4a0dciyk0435bz3qtdgo0la4u7',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'k8nz4ukkelnclppvddlz',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'zwm9oay3fjcziyfyn3d37j241yhxt17l26rapnrnmlsmk3in2ufs3jtcr6u2g1ik8cmnjne9xbq2ogwjh2i6safj9xmmbf1hlhfztbpxespiy28rol0vzqbsr0j42401fe98vj5c77b3rc7499jgsja0zom6qwjr',
                channelComponent: null,
                channelName: 's0f1na76oq3rtd4z2asj0uyt5fb31m6gr5z77eusg6t5mak4okkl5b04f1j0kzdmdbmyrwuywevcyl3v2kcqk67uzt3xi6n8d2n0ox7xdbylrdviqztcuzoychdomzd3zan4vh4jp21op27uvxrq5e5l7iyaxm6x',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'f8f2cod8xybhrmvtmrkawrubthd65zybe6axr53i86s36ssw7q5gk90axxbhf4r77nguwuzvha6kugwkugl6gigqf2zckvq1xv1nxyhez87z51ryitqwqun4h3leh9nibx3nzcgkkne08344591951o4bt4b0w7o',
                flowComponent: 'y0dl8m4mb20znsbbfl5eo04t21wkx2e72rnew9rhhdr4qmh2d34ohcfys26oywk1jr1wvk3agwl13b4kqw3sfqfzl9ldrwgqrflhyv6qxo3mf8eg6xxia2vvggry5ynpyrkuwutnfgclf08o95h8cgnyjzdmo1nu',
                flowInterfaceName: '4o3fpwoa1km20yehj1xinz61nyym8kgvjzamj3un078vwloocq5qcf3ms19a7qj9zg9klo94u74s5jtxut2q9u83ow7wjc6lbzb1k8ifbmf9uy3613ga920a6k7nl54zagdnh95y8phmscry4rkc9307ihiakeqc',
                flowInterfaceNamespace: 'yms95l0waoh5dmzrhzeu7carkga2eqke2ezh8toanuh3d61rafutnmw5uwdpz7dlq1sm4frih9cbww0cl6krgpf85jgr8svyn3frxqy0rfb6jkzwxru9avbpqgvh77g2kcuomws5xrcouuaogc80sd3qztef98cd',
                version: 'yg2zbb8f6kl8pfyud8er',
                parameterGroup: '3pv8p3p7hbgrem27dsir3p2tccqu9s68bswvavg0ub3yn8yxyd7f9ljyi0osn04j509xd6v1lox7ytyiy77wolmrw7swlor9mcek3jzoq3604a7wctg6j8qq4c9onmn5185vdy7vpeh7wbatny28ith7cxxt0rz7pn2eb0qcbpkzwb2ohqsuz4l5hmr8dv4bo3i10m6508qdy7t9f8pmtqttz50n9lyvfrpv1jdaijq85fg3cu068s5a6zamy22',
                name: '4zfd54c1ymm316evj5xumf0rb6ruu04f3g7ekz4m840br0szgg1gubzmuzykdxnbt4or9107rr1qdzkfkrbmfofp3m572ik98x0qt4c4fyvdoaxx4d9uqsm1xcvkgj9z4tdm43eljtt54bkqn4q0si8hpm491fw45dsmmo7fgc51nmzjs4c10boptae2a7wt6bvonnpcntewe65dqfeqp3p85s64s3twb5e2nxat29lqv1te562fk9p7v6b4sfkfa5135zbakq2f70r4hau9m78q2mxkmhrpktrkv3rxw3cbpopi41zk3g7ziju4ni2p',
                parameterName: '5c1jpuow7l6h7sre7myvq7uia3y77f8n72y1sp4k2o27bpdes25c1ipjxn2xqcgnfouzi4di8sj0rnbyytjq9l1y48m2zujst0tmpp7nx59zf9kuvfor7jaz4fgsw2yghth1chfn5gt06dkzrrydce4fsjxgsmy2onfe6gqme1eq4cesnpjogaeytomp67n6foe5yztxo2birsdksmk15x7etoohk8rknxuuiy4pjvvtp0gpbk9z74symgfty1r43wx9752ol8h9l6afwbra5dyifiru5uqwbgbdvggy10wsk31vpev568q90jugr7e8',
                parameterValue: 'uqla84f8r75atl7tjyxvjylm9596p9a5g6epglhtf42tpiduo5qoqn3ciqybwdrlsdg8nfupb1mwygn4nox6rhbk0eirzvszywwr6bb0adt3vg0wmbgtajy4lbva8oa0bej6jttb5f3vq4qsepjt44vrroclakwhypqowf1tgwk8cxhwgwmq11t925s4tifcsfmkgwwmmfkhh68q6k9cg97o5x8wy4pmx1339esgsftso112ucek9slz9p1pvmhusm2on7tba7nytqqgq61ln8j1ey6hd35fl9usy53israv2kdvnn4bulgm9inm8dzdzavy9my32pv3obkem387054bkog2es4ss10y79kq0eez7qlmjy0hsa008bmspyos7di825drxdl20fwzqf0fpk0m3iomnmbpt7ky4q3zn2f7hbogqx7r7ho3389djsn6h4r2hvn16kh2e3rlsdbuyi1cg16yvdaqpldecfj55fa9312ti91tdtgmdns7ptx7d8uxfna927ppmqmjvmu9zm8ow9cn7cwykyyuqkt4nwvo3amp8v33aaer59h8a9cgefslzf6wlp40qnwvo3trcsy9fswfy3z1jnpo361r3ef4i7t21z7zsmywn5c2jtfk5czcqdmxp2nmja32642x01ocfxkc4i6ja3wr0d324mzoxmbijmdzql4h2oo11535eatj4i2q6o789ovcu5byr6ol8dbq4ow4cbewblztv9uq03nhp5h3gnkelxogqbbplnnj3b46mjj18j88wv1g2j1bgfkzzgf3c19et54cn8jvss4tmrvtvordwrx14s85r03w4zoa0s94ov8nr4u7zt2tajpo6whc2ojlbxpeqfaw0mw00ifa0exegyjchrdnlqt4ib4l3ma5tftl409i9uw3wa9fdu50mqik0xm8ds6lt7f6orqlqk6tufgagcamib8pfskh1f6xwjvbg1obo2c4ms396qg34dmuqohzliq9ec8z7h9g3pvdyjnfcncj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'y7v63736b7kas914zk6tvlbvce3l0xwcybt7jhozpzibzf97w1',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'xwouh2kark6488284xxw',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'y3l67wi5gda7c13m624z32kvig23mjfmank5lqif4rfwsdk09nwhcj4n1ro7wnbzkkuv2rl0kthdar1u3clrtg69cqeouqzt5yc7bkvbk4rh8uimjtrk5twk2ltox10s375iyu21m5cb6jzn90tz4iiy6kn6qy37',
                
                channelName: '442o452a1mve54cqanf66fvi88q01bjy1v1wic3s9q2z4zuo1o539g8ri1d80v1dttyonh62x8yf51uq6bsinjruo13jffnm4x7xxs8hzfatoj1bau3o2r55sar4yanbt5h1tfshk091ovn1i7sj6f85vyagrzi0',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '0qoyebkhk11mwbaqm7msltl2cwinfn6jazaxs6l51mc23gog4topvpw18lq7l5pat29b5w7y4p7npuimyzarwssnq3i4pbu5b64pfd4o0ja9iqhh7h7zxg4hbxy7efybklsy6osh1e4aj40sb2pyujoh01mlvsl2',
                flowComponent: 'h0xqsipo8spnir4jzm7hih4pwezosgjrixkzt4fzy1liq0qoilq9u3kxkppidda2por5cmvtzbw9t0kiglalqdgj8w9jl1dfkv6di4ty7j3ncexgdsejjfaztyvadc3htz6bsb28yquex5xi14qf4btuc1wq1eb8',
                flowInterfaceName: '9dclqz7y2l34b9zcqjkr9lxj613uwzhq15sidz1imf43h4yj6218od5r660t16ogbxw9ll2jtb0nkx6er4sw91505k3qem6o8r6ea7s6rsrlyfldfx8t3cyrgo1j7tdakhqqwmqa2gfbs2aiuoynnifc4qro815o',
                flowInterfaceNamespace: 'hsu2qbhyv2iwezticxi3bcz29ghc30xnt1fqx9q6svd7io64txosgnraveftal8wz963crpbjebgau8a8mfwoo6p15gplu2f68my4ogvia46nawi1cp4ofp0xupzsr6vye78uj2du1larylbh1x2tchwq3qzuu4n',
                version: 'khz56b2coe39ljc78vy7',
                parameterGroup: 'aavtw5075r4xh401ynbwkwv7crq8dd9cmgs25y8yis5tmqufy5ftxonabnmntf8txsczw9hlk09qwuu72i29hq4z7ml88nsz57wgu5qgim790xzfczgrwmtvcnpjuev93h4e9ks1lriwgo4lfhidwn1c4862ydc6ftjgr9plhmzen55cauv8008mu2m3meryhg6ndnd1phshpbe6wg02661niekvvu2wnf28zkybnvqajcl3krn6h4vifo5f6gt',
                name: 'mi2h4l1hmhgxc4udprtxtbzzj5u5iu2qgcaj4g6hi65qim261tzwujsqu9k03sk55ag0ootjir9yt3hlr8lw2iadwi6y968jmij1q4n3xqkz5h9mwbyssqkp0yrwweklhiqd29vwzcwdzahxbsn520unwxw36tlxeh0gll4l71xvnv7w8mps3sn6pbm3cbhycf9gfzymgupoubpufe8t5vk9479xq29sb2fmmj5mc80u3iuhumgktqvg7d5p5zfhn4vovnkdp2csgqggdb2x5oz4i8fkfl9kzd4j0pmrhpau76xazh2icupee3qeoacs',
                parameterName: 'aymrx91dane5scnv289xhsnye8vqrhq8xg8enxg064fdd1pyktxllf6un2mkltf3q3898pk6lko0oi3eli6pay05zph13sdmbcsvp4aix5qzulmrq3uooclukzx27cy7ev13f41rqo5leva1dnl2j31im6lrpwby6dyioaexk0f647jzqqu9weuti8o2jjrsxmj7u586k6ggosxqw9hfbkbsbs7qja42r1maqg61nj0sy7s3jxnkpmfb8zauaa4m9550efm2qqfc1pazi10n2mhhcft44nj88rz4rgsf46pnf7waetata0to4hjdhuzr',
                parameterValue: 'fo1adw3m4ufbhujoy7m01uygrotct9uhl1eir6jdn8mebbkrz7mv3xgw5ur2bjcv6484gj6v699nzydjw0n2vlsr6zhd4ir0x0vzyvd9ramgr7jhcp8g6yd33gri7ox66nwkcla86f594vbbbrcjijpas9sxkus7yqzi84q2hlgxlv7i7rcxx9bmwiervb5w5mo2rqsa80716ryebexw02n9pq12y9vlsbltdp3a7nuwvuek68jcxi2yxjbpzgi8x99qaey105im9d91olkwnj48l1cup53z39nl3s3uv307n3sx601buyl69o8aptuk6od3v247fn7zbh5hdoql2d542exoyqeci3ix0w6xvuniyd7s46q6jowjgcgar6ch0uft6tt0diccqzohdnxtd4f9j5svrwfnjk5y1k8izyzrpiop3i9jsyalthylclg0lpyugyk1cwawoxk23ut023blqg7atn3xq6zkorz1s0hfwfy7jfbc9zbq12l055f8qkrdm0gaaizhzy1t4j9cz95j77x5v9f35inp0o4f9j8cm4lfq5as5c39kqzpfhjlmakmhe4s9gucl7c1pf7tq6p9okfjflerksqyanfmbvalmo5m8cr2g40joamf6hemdpi1j9c0wouzh2j1a4n0jywwbcda0rs426pilx1etwwpsyoyjkda125zuc6lpqsclk23oq1l7rgv5cy49g9hk6r6f4h0efoazo9j2181q63sdpmgvv9pcfzh9ctkk1wyrmeyy519qu0tcclve40zxzfdvpy7fwk63pihcwlxgcq7gld6m2gs3hvx68ch37slm7i1xppkm9wj57blp6s5pli2s4y330uvth7c591ko5u05xgfgb5hxyo5v0c0i4ew616spyewrchmyladpjrflgag7hfx95dquyccwdmfk60zn71hgdr88e50rgohye0z5nob28urwpu04nbypzznerh37oq15rz60pfn4g8k1octapjlexf2iqbxtld0fw37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'vl2d5sgpxh96eoqwpsc08spxuw8kb9wez14a7fffnd6ivgyt6e',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '2atuf54dfobmuom85y1d',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '4lh1gexfk3fbrpa3ovzjakhdkvjrd4y4pgwws9gt87t9sp6cg9k732gg3x1ys7fh0cq1bia115lvta47q0fpmwgz6tbhg15h3r4pckpo7bko1gcn2we9u1w0edvfo1x088ige7o0hn7b95dg2byijhpvo9lbm9g9',
                channelComponent: 'lwelsf8cq6gyxpq7fdcsngj1gmd7ueed3uiibgq9jn56p88htaio6ul3vmw2ncgnfy02w0pot1br627wpjz3m7jzz4w7d1qahxi1rg9urkmwhdpgtr4z1vdsak3nt6nz6c1llpnr1gan2fpvhrg8sdardcud3rwt',
                channelName: null,
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'g4pp3zvfbeklvb6ldat1v2nu7suwhayn566k1q522r9fidf5l72jt4s0i3yzzbp9moj1adxie4ax21rjr3ypacgkx0omcdhmy3u3olx3h99ne6ox4zxp1y88al190cgrhrfz760zqlt4929srud1zdu8u3opswqe',
                flowComponent: 'ivgsi12sm292nx5d64gxgw1m9zwjwo7yjefa869thk7pnv6p7aj4b29yeu55ktfxy54dzkc47n9i0rd19efcfw2pziv14r4169yjdzb44nof6tfdx10p7bsct72dy3ifgkl5fr9vuepq2vu87yww4v9b9dq6w02e',
                flowInterfaceName: '2vgut0fvf6shptihyrbzvlof7pna4qbw7gz4cwwb8zrscq5mk386w0erkkn8jd4sd7vegyhjy88z460a0uwyfjjq9d61sws6vtkobw90hi0fc2c720l558gu1iv1k5cmpkljvgo3qagtczdq2f7i6gk4lo5d1lyh',
                flowInterfaceNamespace: 'sa4w3zv67spfv38dp5z0uq0jhq63alr9p79tig44ejmvlqf1nig1f449u2vctcy4khzldszf54d21iqffz3s78feh6nuu2pawxpg9rl4tcczhlje1t9024d6mjy4kxlhfb3c8v9uqpzgfxaqnbcm04o9znkotrvw',
                version: 'y830tnsanmq8lbuk1dzv',
                parameterGroup: 'udl2vlj1wb0zki88t57gw6yyggmhd1s2exhi5u7t5cuv3yp94r85oin9gsce01sqfs8sd2m0rhci6v2b5dqjzaru9qhct1eg7jfl5jn3k3grt1xe6igagwcjqdchn5d09y9hknm8etmrtcw8617jqyd5850mu9qg2rp29taro18yjubio5ezsdy767b5cs05tbphyzoncdx1873ccncouvmtlsyg1dd7ruvidjiwhyjasbcjy30dqn16iy05dug',
                name: 'efrs6ts2sxh3lwnbhtddydgbrayor4jyxbitz26ywv6hn574ubdn9x963pyh3porzijnl35dua0yu830hfn3hu86hcdkhgzine753v45inez11xefas2bhhb8nbmtupmhjsznkilj6cay52lso0d8ldeiwlmi3smhl87h1mpeoyfwkd8b9eug5xoyq291mmmiwr6z4uqr0lmqfadrka1cvmjys5u21ac6ajo524ik7v3tqhjkq7syxja5le2220ndnpr4tu12ztulhfgnevtersb1wts1hhhdkv0dalnbsy8pqob9b5ono6m4zmo24rs',
                parameterName: 'c26efor81ka6cyi6dp02jgsq5xgg3fwcxhbialtt7m6e4euxhwetgwh9n8y79op2q6agcmx8xmh5px757rplc4ltp89ibpodh6o7j9k0gepnmsvw0lh2326ckh88hsetmp2vbjtt3tai6bt9ke3u2n7lp3h2fao3q8t5np1w8vou1d8s1276ptw2bbs11g0edny1zn58l4jpz2nc9lb8csns5cy3v6dn80r20a0ogvjz3vi0irkmaafg67zp1po2ta6d939sovxbrliqcrfnubq68r499m28l6q1b13vnu7ht0xzex06onoluyte2yhh',
                parameterValue: 'b4pom5o62vbrycpige1gq29zhxej36rozijmah1uvj85o5zknx3pz8ssv7ocd2zoopgicmkrqip0n0h5vq9dgmwhxacvib99ylr5bvu4lspx903px49m16o34oee6hwugczvzjzahzkaou8d5yy9z6d07zb8y2glbi1b7kptjdsfh3qzc2cy7ndsvfoy7jq5maj7pg4g9laou3x7vsd1am4les05244bcxmutecmojaljlbatppdguam72whrrql60ub6maffslzv8tooigzau0q3uhfqhu6mbzcgtctjhb9d8x6bk6o4vxzuet7qjfseqnf23a9lajnp1qdqgdtg6iwudaztn0t8z3xz4yt65qpnuvik7txhd46y215gj239tuc04ajvcdzsm8i6coba1sjepnh3jqxsq4vazm53axjifduw7352mnx6vo1kzluj4qzvfyniteihhol084dl1rqnrm25l7buxbogdnoofjocm6oq29tv8a920n95vem22wtenkod3m4tbzj8u1e8uh2vtgoq7u2d17sxyc7e9dpdih35gbjqjinmcp9hhelhymc15y3keexbtiet8kqy0kgv7bi6n0bscwsn2p257pq5d2ec4d8pjuv3ywn551s6jsecg9kjdwmnz3z15bgg03xbg1v5go52fq5p5yss82gz3niw0u2c19xsplg6airs8omjidervf158skbcw5h7mqr7w5gg2x6umbfgi7nv113isr39tjxpiikde3svytfdm3vj6kskh70rtv55u9wldy9gjmiza9bfvbfwhfkpztr24lg7tliw41ba2h662ob17yhe3ffxl7d4v4r4qzmhw4pfxjkzw5mccbxfo3ca54nt56239pi38yx5ykjt0y2d6qdvt750aounkjzy9116dqht1xv1w67xw40ze0i21upy3pipxhwgeqv5ddultv8vwrz4eppnbishx59tlma9ik08e7zh2z6154ne9b1qhki7bm3w09h62b68h74fxh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: '2y739xrldcee85c437e3rqsb1cb48ovq3m6xrf42nvjeptun49',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'ezgbsl65wvsz07dubda1',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'b7q74jbrz332h0gdjylcyelswembyd9vj62e69n83no4vsl3i749qdydb2n8pt623zayjxelukq9zxh0po1pgm0jz53aw26j85lpu73sq41l4n5ywe8a7xp3z9x2cxcbd6ye0unoto7uwyao5iazbn6ckpwi5x55',
                channelComponent: '0jvwr3ak5h8rmuypwidwez9iv9hxvn45r5rb2b0gvqtp7kuefhxvwpu4nnizakrk73siqkoi6cg70rxfllvktvwk05ix2culkxxlf9j38rc381ugpfpsbie7twebhv9z1ub8sn8owm8oy824kocao4gwnlxcavyd',
                
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'z20hrq4bddht0rj288zqy9h26k81a8n2e8w5oqv5whs7568fvwt0gajvh6emnjuv52e2g192ym3xgd9a6bsrgr00usiyapxchab9bkuylwrov2t0y18uy88rmi75hnudrl1i7mei2sqnao05gny2vqk0hm26wfv0',
                flowComponent: '1lfsee3y72n8is06a0lhaqdc1lnk6v9hl5owm60flgklzkagxxh9fg7nxj9v641y1njoqzs8qxbk95lr8ptr2yaj847yn908duiwrmebu1vx7a8m0efj0zobdbqbzdtmyc3imne2fa3ig5dwzkn500dyp8gvhh34',
                flowInterfaceName: 'bffqgqp8sv2n2cft6w2ghgz90orz96p6sojazwc8uebfkmtd233nrg51o5yiijg9z2sg7mb5g6l1sl5nfmij8zljlv3k3esw415lsto10bvp6z8eslbmjny7qi9c1eazb5jejmlwd3cmwgibkqlgmwt68yr2k41t',
                flowInterfaceNamespace: 'eilk1d1mbdsr55fss6xjxcixjp2nrgu5vtk4j22abkyti4844ljrayqbz7qfb6h19ujd460muv0ze1v4ebepmwewi1t3erwe6myhj0l46xpe08r45avorx4o1gtjahd9kd2kcg50sd02tv7782x9rszeea4162qf',
                version: 'fbwy2hpcayz7qgbj3cu4',
                parameterGroup: '83ou6guixq5liahyuzfpshln12gv5n8w41g27niq5hu2ue03sxlazbt2ufphh50zimnq0i6tu13wbscobt0ff1so2gupzzl8zosir50hw69czltqj4af46pp7jfw763e0dus5bgdg56wn0llz2qq251n7dqdcjp80kzxtnvgi4ivf6v7xhidke52w8i05t7oegiczcdi6g78cpifs4ucugmmrgbzmy0xxazfs35af0t2hwvuhpvvxzrs8uov0os',
                name: 'a9ebjtfnbm8i7py8lgilp89cn976juz2ybey3qqe9c19bqlvxmfemd6jxzxrs3k7x2gos97qsdf58javgl624n939eeeoxsdqyp5772un6274dkc80scfgbg1xq0n62ikjbd4ennshs423mdxpq3fqdggcdvth5gc6xks8y4fmb5ujv9j3r376htw3mmwcr38x1w3137d9787vdbhvjdsfrc925pywog3mprp27z7bu2botkn2ekgg958pw72tcndgbt7jwcwzo6qazxot5v4tu37u71q3r7iube4s5a55bcoydgiw8ggt8ds6g40zxh',
                parameterName: '879eks8fw3dwzlmt3l8tdsnmplioyxr2aw8tqceltqk1olhdgca8ubdpjrra7u9eeuelxa77lxyg2h09b99yg12z5iv3rq9tig8x670i8cecasptubfdpfmvzqhv1wl4un9xiks2iuktuctocoyo6vsdiaoxvmwx62ma1556lt37nk2vazgxeatbvf4nbzcuc407ys2t3cfodwspd34gpwx4809ca7cq2pi2dwh0j52tn0vbpstfqtke266m11vjsyu62g580olbyajg3bmy94mj2nwrqmbktfbvsmhh0796bpbrcb4f30xe08ktxzli',
                parameterValue: '4lxt3nyutdzjro34pjdne3tf4bgcw33mc44v2zpljj4sc5hremv37k327smleddwapyi828geiq1swe23eot8jn1lpmguuyo07a6kp8rfzol168btop6ii7g6ldosy97asr8febm7vb1t1ed0jh6bh78nyb7rmdeehk9igzowqrp6qp03okefqi3t8ynt39njf7mpocwcaj90uaiur3dqcil7a3ib2b5bv52bbzvr0zakr791xlsci3bndga2vgxosf5uerclzmmpcritkezu0819ziex6b21jzci77q52uu9xjxzakl8cizrtoi39xis59ru34hws100cggfx3gl9ug4312oyr022j9o63u6j0g8e0vmkq89ikyogck2jp8a1bb6tehws8g5e2jwbtof2tnslfcgz7qqmdnj33aywz26ze6dknu6fo2dfaudblb8y8hcxvfssm2xms0yvlszm2cw5tjnjx24kk72y1dhf6lpgipgrblkz0ks5exu4edaowkk4ku7cah2kcb7hqqag15hb7stzn31yzk9n4hjc8qb8jh6cjw1g6w6spde9lr20wunxtxjhflb2omcb85x7kfdfyyytc9nlrzlr8zqvm26ufis072pqz5dmc1l7yb935lr8qycfud3qvbxy8lt97p58ii3f38yxqoz68186gy1h1ah7bhhqrz8tnpj93w4moeruzoyacvdvfryl92y8i4k15wksaxs5jm8k2eyc20ltyx3436ns5m26l24oqd29ed5akgd35xfwtb6k4x8y7ds24emlmaup79od5893te1qxbdnpkpoletl870h913i5v9mvq2da3utdcycx63po5bh2ff1t49syyp45s5dxozwe0lnl49003gkibi5hwphp9phlirbe2mvxd85wsa4aeesfjrerfm17wkrniu3jj9quimjonfw502zoew8zm7a7r9k5fnjw7iz2ydsfuvpzns2tro3h9nlr10coadcvd67dtbn9bfw7d4u3atgj6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'dj5drxoadypz9dtu8egblh19cvz9qsz4lcvpmmv12g6onwff3i',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'r5s50dq86xg3af29g49k',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '5bwzonvxqbf1fjhyjuay7trpkeymsvl1rhhufip6y93quzjvzadsbeialcer7smf4n3giddlrgvt0qk2dogritxud97921lp767w36u40natfnlg13f2qtecxilpxhux2lndcklqzpz82p8bu8so6xmqkcsycppf',
                channelComponent: 'p6gpodpyl3at87qjbuowxa9ru6ai0j8sv98ch9t96jog9v0bx0l787rtox7a9iom74axzmfszftt07ofyuysffhvwx91wxmhzwogw3za6vmxd68hvc9o8bdvm56zn8o9gh1bvk42mry6we00cht5mh7xjrpi5n6k',
                channelName: 'yp7hwm1fv4gtucfebw6lgq7qu4gzovlabk83fsbfxm06e2jcb2zhrwbgi6hqj1ms0jdwtjpjejgtdiuk8pp337yef9hrpd0lw2587brz4n7zlyhq1ujrhet1fux1lafh8jrrsie1sxypflvmrbgpfz7eosq2qroh',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'n3tzhnzmmp22vw9xxrcsokbxr4qgvjirsvkssn5jzb0wexral6tfm5ok313bkda9z7grinzxk280ji5covfnyh62sno8o1bfi3tbyyshm9dy2695w1lmp2u4mcwjrq1i5sskg9iucu1adkay2rjxyixm83xzyrjj',
                flowComponent: null,
                flowInterfaceName: '0m3cohqc3orof0urzwhmsgqpy7m02qltmuhcp5lz4zxarv5jr2xild6zmnx3q21v3kzqy55o20n47qrnu2n27d3thzmybjrgp0lmahyy08740377wcf0u6igw75gcyknmp5ysuosrq7wrsrguzkywbeaj0afaznk',
                flowInterfaceNamespace: 'jrdtoaj0507nhdlv435l1n78e08z9k30quqimkfn40hy4zb0n8nh1cqfky4rwcf867a21d6sisqntp0eq6y7y3wa34rf3baf5x7gzebpe21xaux5p9kkzq6zln5u4jdj4mf3gxg7a0r0rpo209037wzxufiw7edp',
                version: 'o3jytf0vvw3t3ewo36cm',
                parameterGroup: 'bn7is8icvvcnf97ds6oo8udgxdrai7i2jt6x6ig1vfa0qe6eklbpp1vipmxeuzgsdix6otwuy9aup70uyrsh79jclq4ls29edb42ncm5nb5hf9ffod688z77g60gm95j7us4bp68it577nmb2haj0ceyxwpuils9m89qjre9qsv30jn497ki5p13djnp9tujntwbsy2yf2t6w2ooml0gj6wyvowhpz4dk4kz4ifav9qexhi98r94adorgm6bp80',
                name: '6fa6x2hz0z61nm39r6daotr5lh2p4jdz1f2248qcc9uafivdzr7omi6s8fh9dnl7pam76tbegz1oy8rgd49c83wx852yf6qupdpctoxs4ekk2o9bl8txns2n7l7a00qko6meih4jtkiwzkg1821oiabnho86y3iznxsrfvbohp8hob07jejdk75stpoeizvpgxcaw0v6a6pfqh41u2d050xljhjz8lqqgj53imhs46svf3jl9xjwt2js5nlja78tfue6g6i2nl8f0x01opqg2osc23yq98x2rpf9ewoxjcnrbbzyzfkzdwchx4ysjltk',
                parameterName: '6q7pbq30u5s1x0fxdzql6n6sxr1jlsfkqgbp0mrpijhowpn34a8qkl6rajk4vz7c32iuko1x91r29ukxlqhrmtow7flyijp4b4tvsn73ebn08aoylnmx4z3oua5igxsu1oopkmwsbb51zlbn4rpuaee2chaxktfqdqbga76j0o6y9pndc84rpt9pauq2lma4ut6sad422tbreds7vsl6eof7o09f3ej0f7b04bzi56nyrsx9y6txxbbyvklbs8ak6nlawr8dpa1p5u0vdgwbnu8y4l7kjllnutr3jk7nd56g0g0bqaxrnwlu5k8fgnka',
                parameterValue: 'cjj79bad6s0jrlp40qk342dk05h5rpr8e3fyse4e0y0he7klansv5l4of7aorzznq743hclcx4jd3kkfbbjoagv5e76jmuah48pqmlk8r9rg9a2cty84ps1f0nippf032qvf472iug3f62s0nisz8qlqchkezcxeec00bmqci1qo9r3hip2syul4ag97hks26hv4dp3zkca2ualnmk6wlshyh6avtptqw9sp8nfj0wmo9fb7kos8ssl5dz58jz1xs5qrpzetlz88rn8qlfmj6nejl8twjkzw42h60z9wbiz95a4v2mqpusex1nithoguzh0vx7ugb2v4ywbkwp27zkzsczo0tueoutmwommt2s7zd656ml4hc9z5lz0luj53gs27mmv4ayttc348wpi2z5dm5owzs51o4k7xvbiu3te0l8fnnurrdsywylt4j4e0fqv4f6rkuls6tktchgnde7xyq354i6j7xz35iii7af1stlf675ifdkkbunrv9m0qurq4smzamno74ggxluyv2rxy2uydlpisk0bhmwotc9ua7pllelrjjfoz0l7wi9b7yd3x1e6rtvscemkcptbow64m8326etky34kjwk2iqfnpjw2y7za0i8vtle8ghdp0xo9ygxvwafxiabnt3lp34akeev059o7s370l05302tn98kis0zlumobzbgep1me3uddbht0pyk7vqdlrij6ekgfmfbgd9vggpxldtfwlltf6u9hbj2xga85qjy5zxt73phlo20nci38fdbt310ik3muss7m7fn5eweypql3aljqwe4jast16cz19sqfuin6oqk42nkggviz8d2gmimxk13styrh1vaefybfwy85s6skbj03foyxljrkjcuvcr22ktspgh6ro7x3h3n2tw3ixqf5f7pl11ljhje5lur03lntagvygwijjjf3dvtu04w2xmamn08abci87ido6bwu58vxtk8996al9sfb2b9b2jn3tzmmt3zn40kuxpkk6oq9t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: '4rxgg6lrjiub5mklrvqgr6swjjc4uco4i2c1vcggtnw55s4c6a',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'vbr6msjty9x85bqdmbxx',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'w95eu91o80ca1odmf37jyr5j7p1kr4s09vdp3pgvltrfwyjr3ngt60j5q7qjg13svxjy6vq88wkrxur0v6519wcv8zwiixf9859dvrpx6gzy1j6qot9ijlnozrc0x29w9oh2zyfgh8h0sly2ogveaiqgfmhmyp8h',
                channelComponent: 'cs2awfpwcxv225zpuzt9kn4kmrnd31iwo9jsxjrbjfc6mjkgny7tj4775d90r0rd46mh8p5adl4955ep4ewc332wvbb5h037el0a0weikc78yras3ui9vdcy9cb3z9cblbzjnhoybf614nr7xtawou4mmxwju8mv',
                channelName: 'zt0j2e1ellzql6esvkbpdordoxnxiw61sy2vng14qupfiyhw887oocgy09ni8lnhx0rn18sx4hbmi5ofur98twvpqvn94udga1kl7hs4hydxwngqpt53yvlvy6r2p6wrlgcu6e46hp33mu43c9grlcnbnlrut7lj',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 't9q6xra1qjjh6yr2t5wpb71zz7nshjfincu2n7eci8d94aj46degwzbyw9v48pithfh8q7st8252bsx1ky0gmwg2cnwsufy2wnrerel4k240yjfup2ndc9k44yrvw71m28xg6f08jrw0iv7hgwoeu0sk8fdrkte9',
                
                flowInterfaceName: '7yybm4q0iyfq7ftcsdr9lv83i8ahi5ei8bi4tg20gz8cu3e10su8xquwk75e9o9fvbyfn4mql4i9wukekmn2gkwqet71a8dq19domxvyu9catxqyr13vjaojmoe5ewjyjl3udm14hgxke249ldjgjfgsxmvslziv',
                flowInterfaceNamespace: '4q6h2ybcixqep7fr79bmgbj5twp3xs03pl05n86b03x5t1pi61b65p68t2s8pypgah7nys647o46qupoq39r25nxk2rbsruclzxei7ps623sb4q6o09lypyq0m5b5d82iuypo8ahc3p58191rb6lvo4748a6al9o',
                version: 'dov1g5q1r37cenjl6o8w',
                parameterGroup: 'tbci2vcy9iug6e3t69x22ae8uq6ca4arp61pwp56z8et1era7g4qbq32t0q4axzv889pjgor8tfrwfwvfxzz27utmw0k7c30cr04wl0yfhb1hq9qwseg24i8ru66dlkdwsxpkoiwo11ghtbou2dqmmxnkds7bf5wxcfs9sve35f4n9qdro2xax3daeqnoq404ucx2qq5f3x6lvp0klmqp1uzjc6ptvu8zzu4dsyezrciuqd8vynrf79ske6b9qh',
                name: 'eeixa2m66d9g71lbgjy1319p0d0fq5lkjztiru8zqjnxv26lksra62mffjtpu721xvezvh94ghyhv0qdchemdaq0q2ksabjf2hm0s2e6lojunw1xrguumlhruu4a6x6c81y2p5vyv1r060dilw3nq6cn6z4p12mr23b7n3knjomzqs8hnoqpnjm98uqje2ro8horgg4m9863jp1z3dteobravglg7sc47tqll1muut3mkib13kulmrjok47dyg1bku7oy7c0d4cb7wj65xrb79ptuppmiz70jzb2kf9kgos8w1i7omjadn2dbzk7dznf',
                parameterName: 'lf00hneqyecrcv6c1m0eq3k9nyuz9t8o9fqw7rmowq11hdp5pzpl2bt6ungqrhfnd7whuyncgke7zawokhfe91n0sre6ydvcynoavrprndfz4j9f338h3bu4epggcekkxme8pjys0rnqdlir4xlo211yoxgpvcjl6mg1r298fwaxam1zwtum607j47gq8zl0rh25svn900s4w4pxdi5f1m688blgrv7k8y5m6jdex4t8m3t2qhf8jrensfvea5t9dsqgaqumbsl0ez2ylfxxu4qdci5grdfjhoseosh8w5wur8esiwgnyaj87od65q42',
                parameterValue: 'wrgdsh6ijzvwipmg9z07jffxd0a02pbo0uv1yespxnexryuszrhb2fh4e426squ9xye4315xoioqwkdn6oq4yih9jmelyfghb0hv0ci6aj45d55l99itrnwd0nsqkwc6omzjzw9ry7ys6s931pgeh8wag66opa3ir2h5cd18an62y64sdhpgm1zntnkbx6en5ly9k4u2xyaolkls89n01q2lmusl3x0pj7e5gjc3dge5gwje790loq0b9hdjja74io1myhbrrboi2jng7vfvgn7d583ppu2nooyw2sk1qdu5dkin05zu6cixndxl2j2gsoc9yqkl2lcyayj307dqmohekt2bs2h6cji4ijjnjvfh4womao153u5jrzehu73qyjb7hfhjq8qx35kstyzildfd55idxn9grjlm4dr3f8qcv6m0c5nwo058pea2q3n246x8ej4xjofxfvjpsj9wvzix7ikdyy39nxu7hx2odyb31wijk0as8s5p3xbjmy0f8wx4iiky2vqigv3zqayma048k2fkpgiqh3l3zd0nmlxcex1bk2cqwzyfv4yzhhj507o71sbzg2dyixalo8ff3g6ykqu615b6g8sb3e56vx5o7iyiffebr7cbfnn2boyzf8a2vbpu9mr54chrvl3uh019uatlpxuwpgkftjydpjnbn9l3dh1d8pead7g2c8i6iw3kzz5jfbhyb5tkzwu47mxsvh7owk4i1ncdtzzlvld03r4lnta46bcs4xs3zmggpjldnina7qkuh8fzmebnmlqczh530f7ri9ojoh1kxrqcnwhx6uhhheode9th2dx0qbikwq489ile16nl3ssndegvaeepim3ov0deb0fd8thfd1oixvrklzd3dvry74v0liwohfbar0zg0l9dh997w3kibv0ohqtnhixybn93moak1zgw3vv0fqhskpsy961w4rauhbh358tpq5yjhajl61spiom1m2l0sbbfuvitgb7ookdysxegujt2iqtxklmr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'hitu4arsex6bybju9ct4lexiud073pa38xrj2qezk9pe12pxhf',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '4nmcltjzrfkftcxy7pki',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'l3l1yy3kn8zlkkkayewz61ou419x9pvhung7te0p3psys7s6nayn3sy9v8wp01qi1qp9giupakcftxez2z1fqqf48m4t21hko30n9jrsea1x6k6gr19l0niv7pvie45ap0ipu898b917qc9uzc0t2z3yvuigmn6v',
                channelComponent: '3rfrq74glhtpf9i9iz4eg1e2mlt719y5zf3t65s5rvlvli11f0na4k4pwtjivflz7m2vg2u8agqphiwq4tcxjtlwbltoco68d17t1g7jgb9tf2xefwu6oehjq3l1y5v3z8ewr1wlwgsb7ka2295ex2afci87klu5',
                channelName: 'qqrq5pjoo2ifoxhp0n6qdt2q38288e4kzc16893m13vo9hpuel4zm65l0qgqkdi512jaq7jj5ib5i48flrozyru7k3mh905kgnom4fc0kp7732z7r5bftpma3926q05alycqn0q00f0hd10gzj4t7p8ehrfpviwq',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '91nn7rn9p0mbfevhb43fqhu99te3d6mxlkrcscdzp8hnbl755wht2p3g9q2i66upejh8h61qd14py583th95d3zcsy0oeg927pe6qpqt23psr0u2qwv6xjy3vkeag6go99pksyb9184aqq1do95weub9kv09w2f9',
                flowComponent: 'frw6zzshuyl8n723ddh2k9zl8em8dlvt7rmxsq4f5u7tyadfktowrsoi8180vo7znpzbss35fwtkzyrn71c2cz6sixrwnp35n1h553svcpu2yjws95o2j0vpuz1f8vg5fu0sy3jczky6nrm31wsmp89jauvdyas4',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'c6owsal6ey9zhxbc5mfbgtqiroqm0k55kwib1kb8z00jue61mu4y3hgmwxj5uqpn3o9t9frgg5fcwlzspiawv9xt6ftku1kzk15hcr3xjg0x3rkxba090ykpuhwvnozn1aphqwiowikohd0ye23ftfk649qrfhql',
                version: '9c16qddq9y7wmt1bjhy6',
                parameterGroup: 'nzgzydnfq5weahnqgy1qw380lbn4e8r19sxlm6egypf6yt37u6rit2xtqd793szegw3rmed385f3yketz3mewmifjsu5xuld7g6glaicplgz54agg4ujlzh2bo3mzxm7mrcvj200hsbozxo4w354x7hzo9o0c9uwwcavl4bg4vs1t9gvv8884mk5gnc7ghdiicrw10nizmgi0uoa6d97jfxwg70614ngxici4rvb10szlz90wjhklsnkqtopwdt',
                name: 'meilgzkbhwths4451uwg6xm2xeku4q46zenmeffex3756w7s3w90l184c34yx9gjwlhyvwpmng4o3580zzr3x18au0kpahef9la4vd5dvevib95l4x2h2jyqph0hnzenjcpgmq8y1b94ka80iebua8aqnvfbbqs077991e3z5mxx0p3nbsn5l7kvlrzbxypxul93i6o1w1ciwzv354ltbx9u6veejeuuaspzid9xqpgscegklx5a4f2p2xfis1inqizi1nmbzc0hejaeu4rx0j97fui4mm0li5p6u9e0xbm1porjdth74wzw3scqgf34',
                parameterName: '940kbjwkeonex4cxad8x3eegrqwmghhbziih7q13nvwrbb6n0l651nkm43f7x97i4n9ttzcuqzzy74np4fm5nlzqadkeq3v6p1hafwd1ywehgpjdp9ubt6pcm510qu5dyb8hzbfoxgxxn9xwvetk0nndhk5e1ac1pemudul9sevd5s5jtuas86in1nukvmrorseygcad1drwj53m27owgq89leetqrv2z8lai1i3w1vnp9pedwl5k566ajntodbrkp9aesp9lx6txyqy1margwww01gpekancc2i9wyfe9q9sc8l4bh4yyns13hfsln8',
                parameterValue: '8u7hzybsu7f7j6nxepvymm8xqif9hoxr4b9x8d0r1n40lblrhq781c9z9rvjstw8uo5iyqnfvpp6vz3ovezzuah7efikbldom6om0jrzyqepa2qxcmy0vd2u7pccztxgby3pgnq5qfiiefru0klbkuou0fmd2hsu34yzl1hjifnae46ipixjz694uf7npbf8f0esk3an1d2pznydv8hne3884xicfe4kslorccq90xq7fp181y5a5vg4jjg8rm5qx4sfe06vfqu82hjgfp9my8vra6c6y7oh703da05pgsxednumncdisu07c0o9v5ylvjr2c9h2krfhbbqzna52gjn8q4fhg5stptqbqfqcxfl0nffsdu09z8s14kn179h6rjvwp7qp4ebjqpq51cpp24qanwlv3ht07b38h1o8zmxxer5s3xl9kyox402vr5npghiw5d7sad0ez0f6g1ojwsjgtzfbe9g04hiunlujz8ajz2xyhtsvv03d90h63cwhqfko8j4rytpkta2gbuns3jjukjwiwjg6pczcbi6oqxx3nkkx5mdhn6cmbrw0u7yrpaz0uz3zsw32ykx4h6ceu82zlh9k3oh3y158vg4tw4j23atf2r5giqyx0hgfbjqcaul72uyfki725139qq847e7zbqfyvfjm8wgm34upc1j2fja37rz005wwx4adnz284eyaow33s7dzbqes6d3dq19vgxxmm34j3vb43ay8j0bisqun5r23lgco0vus7dqk5z9raw35rpv54pz3v4qz4lq6y41g0iz9yw6549l3v18ak4qlupbwobhqhgzs83ao8kdmg2364v6yfn87zo60mgv4so3i2g239icsqf6zignrbkrc3pr0pdfa5c7f2ebvbsv0hk9zk98oj9kk4h4datb1exqopa6mzapw60u962krmda9q3go01a1z1d7wr5vmtd6pinhfhj26yyixgdj83tpn1znibvp3vknj0fyxa0ijhlqcs348zi6xnn79bpl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'sx0917xsg4agtrtb8bgbugwrvp1zixkr4ze72qoeqblf10u0iw',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '60tvvv29j9mcp44tun1y',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'eftipknjo4qxkyesok1daffxhfdgobo0chqf80w8bobxdt71ty0vi8dmdpk4ort96w14ns9xww96fzypbcxs9q5eyx7o5ba5kehq00q12y7xzbow6idltskpr2gy5cj0h9zg49ilmaifw2gdze40y5cvdk9odfp3',
                channelComponent: 'x2l1olg5xv3lzyn5l9a5j49jr2tiofkxfcyepyif5jznj7zgwuyavvgqxt3qh3cddsn9hr96y0t7kn7xp7hlptlvl6537v001aasyzafqri9dz17pdekrabe8ctb3von8xpglqd6n1i6eues6jzswhmaoufm4f74',
                channelName: '5zdjv4tawiclh0z46vl4mhxetwiwwwhgzjwrrw0vazqfe9z4yrvr9ijlgsn2ysv3bygjgwf1xcn30nfqaij4f96scxcmmpmjnf6psqzz8n0sefy31fgmlhqyih23jkcv1jlchwsphpspdxedfbc4uhhtscv3b27a',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'wyabb46yvmvusunpzdbhk8uuv87eq0azsmk6lchdfmqyc01n28wadvcrr418hujkk62ndtz5aefjvb8bp53c58prhruaevwluv2zn5ygm8irobr6umvz7ch62974wbif6qk6lb725r3zvr5st4s8seq7byvx8dko',
                flowComponent: 'b4uq3tctzht739xkzd66svnvwqfqtizouejg4zqnvc4ak0dh162wjimbc7aa4owcyztk0ou54kutcts2maun4ut5o7ngbwbb3ln97lbslquiola3q4ssstdrfo0iwsbh5ovfvsu797ka9kj5t1cjjirff1twatk4',
                
                flowInterfaceNamespace: 'a8g4ahjhqzevyvicgx3vyek683z7q4rnbyqfhwtksfz6snyfguh3e8235wh2xs6cyr4u1ejtqabayooc5gkwfiwhcgds9lasxys39ci7y4u3af2j47782ylbzm7bz20p0kkk185axp75ytu78ojigfg5nprgquhb',
                version: '0polkbm5rc4hekwikpvw',
                parameterGroup: '0m41p5b7d9i5pbdckucpbrhzwwizktm3evzk2fi2hhxwg68ezmdcafwoscwyrdk0shz23vyjlptcarp6sjvb202i32echuafqn7g5uymi93r8n7i2sjul9gkgqemd1nsjsixupi5q9n9yhvn4nke4ps0oxphs1d9ip3v8cgesed95bfpyt2csuw4ixp01bt6ih7dn4n2h2nure8d6p58ehkoeibh7v1uatayquq2anrqv0nvyfczz33ihs1fqrx',
                name: '78c86xdk2grck095q6m7hdreqlabno9x4tin3q8pjdd6d57x6mqoi3tswfhcdh3yajzsp6egwk5pm3zippxm6zxu7mms1idludys300qi8uqw65cwsqnr827o5xldee1yde9m5b02gfr1cvm2hrvzgd8vhzg0bipilhehha01wgl8alqu6gb7odhcmfc4yz2rxks08355lx8rh8k6nduuvff4cgbm7endzmjpsmrpc13ty0wakfq6evlhavur7cnd86a991cgd3bzfy1wlrygbsuuwmbakn6ywqeap6cneo1k651jzis0l3ejfsxbap0',
                parameterName: 'sl2x8p862ncdln49com0581qp5nb1f6y3a88sqnzhzurj0zk4fny82dh06e0salmdfy5lu8qnqto3d8u4iuj5qn73pga4eqa2ofu9dxnd9llfxvcbl8akno4xcqcvmvselkexsmxl3bduynmxy2dlntgntf653nob7189ttky4q5q6j4wbmdf3wlqzvgaou02avsequ1reo84q37a0sx4xmylavj3ut5tidb6ijqg20o2muwuah5190bt7g6zoqssj20zk8vbttwodfgdz20gqomka3tzh318pegu0sur0u5qgxim07yc5rujxv4hsyg',
                parameterValue: 'cjn3zrjzx3of0ktg1fitzo0jnlx292zjfmw8zd50l59rmmbgmb7y27zkiupzk3ff25pcjulzcbb07odxcdsrkpmvnb0skz9ha1tm7jjswhv4ma7nkpmv83htcj3l0crkacyr11noc1tghzcqcifmzklwvpyive3fsufp81s6fnihsiy5lv0fop92b40corvz8otje6rstonz5loxl5dj3v04rwqg15dysv0mz9081s0vdifsb2lesr1r6m2r3gvp14u8gxuexidteqartri06nzoefidbgyc813zp2jb5312q7v4fxb0yhvcvuz0x0hh8gjej0croyjxv85gzauwwttyoip4bnrigan5e4ybnpnyh3n7useexkasp38bco6noyx2sbpz2csv5axes0vb10yqvwtvx5a2tcw2idyqx8mbxta59fo6w9a5jxau62gcw0n9mazlmu4c6vfsszf5ek3qawaqacttq0ycaicyvpyaf16obunqvqyesnswee2qbnt1fcickjfg368ajtrz2q2vt7bqzp7sctu7g1dv7jolxxiwe81e0pw1mkz9oeuzy7pvflyoi35ih4q27vsfibllzczmxpbik5ns0v13dp55eqhln2gj09et38kaqnni0ggiwwea6d7wol945qhmjh6o6u6vwpc9bxph21fw2g385laxkr67b3w9mlubdy196qd3sx89pehoa3i4edk1woq55oj3a24wmn3qu6wjeq9yxdz1srbsqjt40h21ncit79sq3bf2cjd4b8ao4hyk18gno3uejtpjjz9ccuw16atjwombtzsj725t7699ib6vkr04ndor09gs7u7eoo335vjlgvrzsf4go2tw84jkbp3yrno6og9agp9bq79big2z501tkmtg2nxhjhe6kq1m5fp5owy1ptabry8ikaxa2zbeadjwq39vg50crplpl72ithetvq9yasmd50wkie8a0w06onc7zihpyouccf3dbvbtqa0st7ank1rhdhw55yyz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'hw7i55hlaadpwl6gnmv2mj9lla1cd1w7mdtjzp0y7gtrhhmyvv',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '4mjzn0be8xwssf13bemp',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'pwvj2lyh2apzk4frrdyoliey2eze3miek6j1gt6az7q9zm52qq5tklzls3bijalhznvyq40z596nd2kvcsfhbp8t4i9dcyzwlrwtffodhu8zzimy7zk6pm88lbz3yf7ilxwjqi24mcnij07c3sorur32xcqg5hj5',
                channelComponent: '5tca26kin0b5sy8egtlbb7ovi4picyeg46kpdb1m3qlp8ywfhw8wwy49v6kisje5d7jb0tzi1t8dnxs7d897p1b3lkwz9u2kvix4skcu2sj06x3q1bfddobn8wpqnrgui9lz53kdbc5gyetnel5mqz21ycj078g7',
                channelName: 'hcbswtyph9ng0bs0ymigb5oi0ap74x13456014oysvf4yun4q14dcvbp2kxcqwsf7gtz0a66y8bmag4z077s9t30wknubjfnzqmg4kqmy0ufp4gjc5gxpb4x0k23psgm3om8g5ppci6ibjlhcjg9rlij0y0w19cy',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '86pj2c0wn2rfuvbba84qvfnn4905rf6x5f0jrjgocjtdizoco30h3azdg78hvamhuefwgi40q8yvja1f36r3bqj7ilhxpem2717q7kdb4m6drxph0x46ylzvefjev0cd2td231u7j3ma77fuw5cgvvsnu19kxtrt',
                flowComponent: 'o98ia67pszdq1deuurui772k3wl9bnfftsbc31udozof8c8n5a2jkw9yjr6suufr7rqvs9p2lbl31eb2pe7wg5x6z9wzr4gdsjwwtrh2rje32thlhfz2d5y6gd1csjgoht1hm4ezoe2b6cwveu85czju8hharqnn',
                flowInterfaceName: 'r1iet5roj5jnkdj8xnwtn5aqt4drrutxsmjvm2t4pv1p9wh1kpx78vums9st1xc4y7w98oakqx2rmkyc675aeyetszlnqgtrb5uthbr0pdy865k9ds2a75468dlrvao4urb7l465j1rskx81olddrn2zv7d3w37q',
                flowInterfaceNamespace: null,
                version: '5k4ok3d6vl6ztfbzhnqh',
                parameterGroup: 'z9253yve6qy38m62jonscdnd3ogpjfnrtwruwydgpvtcplmk2cwbv1wcvdgynbutiloi7hqfpqyx7xpwd3s74mdta0xn7q1o15pikvprl3pk9nmhn289bbdwxbekzrj89h6wzddntnzutygk7q118ugvedbhbwe5253lvvxowmdq5ny7bqd7hgq3w9gaapgqc89ez98fims6o05vh05dllcamyjev1u9jmysm6tnu05t4nwocxi0lyy4ssb1xjb',
                name: '5vdln8o0diupc4ckmy0hqfk8j6klq20tdcuvalrf127vgrgjc9jib5gdpu9egmgu4k0xbdmu2djgic01w29h3t4rapwrm1ayfww8s2myd16idbu452z12atpmdjo6n9d7xv1mzt6y7gm3uvq86nugi89t09uojayfrl4dwwdlycsbi3cme11fvc8vsj3s1d7tukw996mv2332pwyolftu6hgsp4xx40zo3glphrf9316h6w4rhxo7b1zdl1f8trg981rbomjnfmccmcfbo5ynph73a1qpisgyhyolnzthga7h2rtoli01zsi57fmi7cj',
                parameterName: 'ar4ebriof0k8wa49dv7ukyc9sgglb74jgt0anyatqy0eth486729nogilue2lwgl6fanvfnxdepxw5s3nkbf7p2eolg40w1c1sm8f66k6kfee104gzf1070np41nu7qxwapizc2av0gq21zterjuotrk1butg2s9jica8or7l9x69rx0bdpuujofkeouz245g86ud74p78o8gkusz272cix70k1s22q8fnlq7a09tzb4hzo3pmm24p6oeih0hmc2oi3l575ebyuox96gx645h5jugcmlov93ahc0zxroa73ttmy2s7chfo7x1weqyu72',
                parameterValue: 'b8rxxhlypez8aiw6wjh9vdlmrumnzug0vof06giai0wj8oguggxyint0jljvhajs6l3rzulfjd6r7ce2dwudlomqec0dwcxd7bjm2qssa2jgwm682t8bh4jga7iy8pl82zb1w0voawtbj5qc8ncvp8g47olaqs7rpkvdg1agtn0ys39wovsjgxjvds6xjkv84fl3orps4d6bflx827k3py8oqrcqfiifx5ybola9var6oj0et2seqa1x6fykz2n7o7s8g67py0hv0ds120ih5k7c0eutsms8xie9ifttqnje5bfwkjovgg9ow1rfnbnvhsyaafblf1aerlht1a7n5mdx601l1zdm406xa6ksbxa0kqatt7vul1lr6vq5iizkkf18m792ipsnplzmj7wkclr5uuag8y7jej3uoke025m6k4fn63kmmcngiw6q5fgry6r3167jqd4fgt7u2vaibsksgun8b5rtp9sx1o1v4nx0l9uhbv1ov9b33c76r9so269zabng7haugh9b09cs7awyce2b7ybob8joeunbeky6z6t6hmm3kx85m210se54eekanc6hwk26isfs4ov74s5m59g7kef959utofy3sycrszspluao6zjiqy7c43xb6rgof6o5ughhppu8c7w6ddl9o4hs9d93sv0exyazx3lrna6ns0ka547muyczz9vhkuyk40dxlveppkt4pwj1sp0f6se6293u2jnn2v025d0dpqtxhxoazpqm5ncbpamjq0d72g4i2yaiu5tzyh5tzscpnxx7harze4v4dbtxjt75mkrbwhz98rtdm6wv01900kengyhdc0lp1j10c168pinmljpzgi2qcp3np8mfbfzu0a456mi6fujy7s4401h9mv2ctwfdfvukasr0jmavuvd3q9aicd6fvsyitcfoajt63m9041pjb7jflquzcfxubvx9r2fnx5cajxhbr7uen9h8wb8asdeiudgdi4vgbtjxc5igmxhod5a33p9gd7ld',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'qslddeuoqgd5ctimbder28t3xkmkvpumqw64dprawqgjuko86m',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'axdfnj872zxgabe7tq00',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '0iro6k6mpdy5uqf3p9xwvngqlbjabj1ej6ojov2iadjn6t2065n08q331bx1saplfvjnaibfsagl2odr7ipz58mw5p67olzfhnyf9u5zrxiussg3ku062fqha7vp81uqu667xyhrk7zxhdqtsusy2l49zigbdhqd',
                channelComponent: 'w01pc6rbcjiu0zpwlp4oczdxiamzlqw7t3yi97mhaibddqkqsm80x2tb86irv1r8xpr5ei5nx6wg1rjs7vl1b4hoijsb4p14nwzjq628nd45xm33bpfwx8179saxo8m0yqbbb6i05ohidpxve0pi39nxf15zjsm1',
                channelName: 'ssbp1ix69nggbs8oa0t2r7fe11u1n8e3cbjogc1vuv2vmlhj51dgbo0b84l8rk41ip5xqev720mc0fw6yy2kdne6ic1t89bkaffpmzwebpkfo7vrlgv493rkjm6p7z7kegkr7992lg8ntkzgchnnwf0rh97fuvyq',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '73nrmxoxrykjr348nguu0tnjaumeik6f75l7mczo0vpef6mrhfjupwxod6laww6l0vr9d8g96icw06pvxmhkgw2tdbx37k0qvh2ztmgv9mkkvcgirs4v2fitn4kwgjg7xesurg9uvpgax55x9oh4zgi8b4gwf22x',
                flowComponent: 'tp8ox1jeus4uzor43110a9vcsi9sm173jvq3oy7f7s36bk9gtgv6u5oy7youia6x3a3e1mhl8tea89f5u2hig4hoydqbmuwtvten7uxvy7zlq3psfgv8pvf9kvp52ajyl4c8w3cls1r6r8ubf1lhifwryqvbzdp1',
                flowInterfaceName: 'v8htvpgnh54de151jigvupzjbmwlacf97yokn5ftxkmb0ieh47arflu09iavacnz8jyg359dqahkpr2op3uhqhbmt8cek62o7iu5p83anfo31h50hbnl7lg3oqrnpl66cwbqdaka9suwfsnpg97lrjo8ia8tgt77',
                
                version: '8297vv9tqj7k710l0hwh',
                parameterGroup: 'avfsfdy6ehkfwiiwlfs9igy37d9f1y0mjxn4yq4jdsx7anw89qvcmlix1qtcjsycwryn1qnqc7366l22q7y68av5ahuv220mk00tzuwhtbn5216cahh8smux7jt97spluowrwyy9668bjbldftc465ymrj6fztbrhzyrdiz484mb5goisyhphn510oqmcexngh4fhgd96ttsva8zb50nces0q6g39cuyp0b4sl298gb9vdkvm4wvd3a49zk5at3',
                name: '4571yrqe1turxs1lnisabslrhfv6d1rpizvck4nrbvrp08aqe5phqjtd2tbf9wkfbm1cxwn3442mxie0f12ijjdrm5oe8xzzxv070i8lg8hv7py5x6woqnxqc883ihgna2f6zbuaj19milsraxjb9zk8zawuny2413l4xb4sob6fvc1b14iqrr36udx7z0xmycg4ojujo6xbm9bmhhapmdzkwj8iaqagdmcnzib0gjhjtyjehymhmx8a5ysamvuk4p94whcld8iio532fu4yxbs68i571yvp6bmfq13zncdkha0rdbykk6np8xbr17ic',
                parameterName: '6fcablvhntrbtdb64aiw2smxrgcjtaa66uev6k7qlhv75tryb4q6287l4nqvxpyw0owkrbm8jpz7k5yijoqhoemnsyja86eos91b2n6xel0gzlv796n72t78a7uhomlw4uknf3ydnf51sjx1uukt1j6wn3grrnhd2ru62deo423ekrk06itbk60vbu3fjxl3macefgz792x7rg3sfvyts1xyje95km8kmfs8lq9cqlcqt61p2de8aavpo8abmvwi9le2awiih0z9lmfe19fpt0rcv5dgzlucma3r8zj4jj5oz6ww35h9dvnl1gpbf42o',
                parameterValue: 'yoxx0nw1572faue8vnbqmlooj7efjd9mza2p8gdwtm005ppvz3q83da47nrzioqfzzhh6evp88el146odhmu87l14j4wg0bgji51pi29d3iohef9kvjnzag34bm8sqznj2l9owtw3yex6g7onsxvqkyg4vn58moqhk2xwn6wd7yl60aj5xl1ews6m8ha1ttg165qx5ccc0ptx97m9cwuti4ce7rj4e7zxjc2x0gl95ktp7k1x6gh3w5xgnjqulc2s49jps3el5l42lkyvpgj25pmsspg6lybic7yu9w5qi65msoxcco5idwsky0nsegjo7zvzt8d4ofylj6mtea9lxf672f1422kdulqylyw2bbl6vf91beh21bsxr3acawutc2mmngo9pngqzoy62kwmgn5ga0lt0hzxgzpr8yvxfts7zpshy0g26khoas25e86psk3527n88es89xsf1c5r356nmpfjot62vw5jd5eghe4rzafgm7ffs8mezvc2or1ad6ialoxwogexwvhcbgfg369g4e456pzgoy1yf05jgphbjfdf8jvp0j0f76xngnbf64x717ds432x92p026twfrn3i8svulksayc0rjbh2dmoqlxs6i1qfgc8bclimikp34iydxo5lkc3pdbjz8lbnsg1g6i0v4h4blau7xa5dhmg9ze8ir7g5ws8mx4uk0fgysamh14fmdarm4p6qot33gexzfavn2x82znxlocqmaas5gfuqqcy3hlw4shc0ro0p6i3xeizaft3fgoete7mhsbwqlfc7k8orgp1ee0wpdi063dqzrr3oan0slkusk1rqieh1if0me13vxhuo8vao0xaydppjjjqmqsuhb4e9h4gh9klf0p27l9gqtc44wkfqii6eqlngmggi31sjw93f37cl5npys3xwl4y27z8ay3osqsh1rh5y0or45k30suyouy4ybl1g2de532emwdh8kr7nugikogrptp231fw0ddtq740zejib3oucep0auh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: '9hcsofvunucx7b6xyqabokni76lmt4og9henq7e4m2mdgif4iu',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'vzgsomvsuoopfjvkdgkp',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '3smc6yp21u89ocjqm90nrnfho63iin9jsmmyievv7pcx5mszfarg1qfpymprugmynrh4z7oy6i3g9bbxuhpib9ls3sjb3qx2810gtyvvqb13bza1plg8h1wqfugny0zm5xoh6k7h657lkmw2lmhjos8r8xv9d0k6',
                channelComponent: 'wmv2r9srxnqlo7ls1w5ye7zgddtfvyiiv869p95s0d89x4nfqma6gmbhb45pnwtn82ve642mmfarkz968sgjkxspj4of6a5q9l0s8rp13d34z343l5a4cot3k38s4r9wp49r7ekdecj1yaxddubkpwwpttt1ke89',
                channelName: 'v6dee8qgdu9x84mlvduhfzvacgp22frqr67883x1wk19763dbh8o59x3ugy6zj5r610g60pzwktl1rvuxq2tifglg0na4tmjuiiqs6aeozkf806bkth3y7x6x6h7u62ebv2jukd4mfinzjpthsf6d0dygseknjsz',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'miy9951pektiwfc4xtl6wp7tbwcv03ler5yaxmh4gvozeqhgunv5nd3bjvbra8m80gh2u2m3bnckth6dm0depqgds0eziidbmueq3m3lx4l7b29f65hdsjxk400gq57425rgx33nruig22acy9qbyr8wjrts1x8k',
                flowComponent: 'b52bsnj96ffe2cbhhrq0kzgj8j3qy1t266c5cmb12fqfh41je27rjgpnknc08bgrurry9l10e5ogxufjg55vkaxvf8mj667yv6x3ga4vjmik5x1wuyhbawz6b17ny2985ysrnk0m2zq8ik5alpnzk3mksxqtwl7j',
                flowInterfaceName: '0ks1825gt5tndoe70h50w3iacpg64pexgl0778gmfbli09whsdfj4dotwhynobj1jeszwb5gv0pmfmfsgainx1x7pszlt5pe9x0fxfvc65db8r9sp2diiwc00v7nnz8vpcpg9dmgswlkame5tf5zrhiz3onlvoak',
                flowInterfaceNamespace: 'nwxb61sinalqjzkcbg5eua2nz8ud0tpg4fg6wtfpzq49rsxdkr7gdwtld0g2ba2cjln7p6xcmo8me1e2c0gm5vku39mblkn2j9hbj2wenyf78z4zsvi1z7t74d139ljcz9w1ve75y4mj3zb10jzcg9n6sd5h7ce1',
                version: null,
                parameterGroup: '96uobgyr3e2p3xco4qob66pnj5d75ltrwfj0gqyk9e9d0vl4g41ps2plb4e019szim7evkh67f4xeimazg98bqve3r40rmixszisdi9zhgr0f7gchj9d2wkno0eks68lokn0b2jhu4rx5q0qakeiptok4ge7aqlqi8xlkv98oo44x5cs3osc0md2mkox4xl0ka8gjd6u0kp22q2rld3764xpfoipdbt7c9o65ci0idk19l88xbdopf4y9gc2twa',
                name: 'tg6osdq3ba7i0epxkzlitawxlbyrc2rgg9s8jcma6sv8f1amviif87idmxymi0niudpna3vjbmzfu5wdkxqmwowfi80614m8vfzpp9o5cbxkxf6i0nkd2vdhnbn3uuq9cibj8s6qz10g3a5amkntojpgvj9gog9fngjeoqky7xn48adqlcufhvq424z2zvywfkn60j7cncpy0gj21fxy2clqotr8um0mccj1fj7laxznaa7w1yfy0bd9twvk16kmgfb44ukw1a8oq9re0eog4z620d55ro8894jvdaajwjezldujyyyt3a32wagfgg45',
                parameterName: '4rni91v8ol29oi6uadfmgmvjcfrgjklf0k7g7cqvf19w6rfyzjpkc5lxlyyhnpiwavznigrkds0z8ikcasmagth3l19j7qyxg3lyuqkyf0k0od64gmiy4xyeu604v4nic18gmb1sx4gedd0qb3l8xph9rh93zho0so9rog9c53czx0uoyei067mu7uhw9suqrgjtdqjzywfuvwo1c2fm0kazx14yuz9gnst65maro5wrv1gk9fk4lpc4r2no5tcoga3vzgyzadt7bgqq43tl8kfnp6y7vsxh1wquvw0zbwjn8pwlk76sog5922b8prop',
                parameterValue: '51tjv555cg0g2tfyrn3gmxtbxcwiz1jrrmdjd1mc0vfy4934mavsge290bvset6vjuiajehju3k1ba0o2lz4wzpef5rrbb8bjqjobn0qkoydxqdf9g5gz55j3jnrcdqwbgut9huv6jpbof2dhi47f68d30zj7wv25f3092gaixk1201mah8qw5fc45jt3tvjoqpyb7w7i3zwrok93199m584hg5hqex382o95r63j6vetn2103os3e1uj3qbmz35cj4ttrn0yu6ozurof4iv8fmlpvsthgmkux609mkzpd3cpslz72hzli76vnkplwpqi8nosa0oha9xckrne41u1ze7ckpx6a6mul0zqbhiu98mrjm0mndzriuo46avto3bl200vswr58ljmvkalcphrzi0yvi16v832xvqsdb1vbhy894tq9e6snai8clxtbc3qjxrjju1cgbqp48pym0wgfxumfuaoi8mx79ridnoixft1amq8xsu6strbrb3cwmb0ra4bhu56eeg54sa0j6l4f40mqrks42403jnk9605qqdxbt91bu67xrq3bu2voctlst3we3fl0cim4zr6m9pl3rlosj25pbldse8hfc8my57rsukjm4tr7nh3f64twl5lhnsue98bc2lflhpk1iziugn2950ibwzjee8elhpyhpyt95tyc8uwahzed6l2v9i80fzbcxnky069v6r64jeq31a12sten68yho7en4vowp74chf3eawewzt780tje26e38g50y5atyaoro1ixv46g6xpv8tcl509tnrdej8pvy6a221rzg0bkg2x0cqwgiwluubekwngr9kuq6a59cpkop23iq3da5axcmt74rxhddlsbr547mtomxqcbn0xlvk7znrm33tnsz1zlxtxugahyqlao0irt55m57ml77y3967pm8t74kyzvaq6ya91gflpnabt7jmy2u2qu15ropyoa752aygslkcbm3mv7iqy0ljy64twveanq3dzsdyubxv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'eykcldi1hkmsfeiz04rkix16tskq1avnqajvuta543hihdk2az',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'bo9z7enli0lvrcvw7spl',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'fmuhovcguzdkcc2rtbidmgxo07oyh7jndusk79zo24et0v5wl3in6pe9y5w93oy4kaq92z729pc4d5fvtwgyj53ranftkftcwywrvblxf6rdn2abmpz167tfzl7zpu9go3ymf4mwf2d1pvhhfy4cokvaavel196s',
                channelComponent: 'jkbjblce90mi17u44dnak6cqsncezbkskbjyho3frlqzfsvfeqm5m8s0t0lmdmmvz1is45uk61ktc98fh0d541dgxrcx9mi9ifojk3ud2y6t16u6mwes5uv0jn70xf9ionbr0m8ne5a5la4cyxbgs2qcg2ze24f1',
                channelName: 'mnuuwv7aph6j3eaap041q1sp5e2pliw8agjsmdf4atar1i0y6pfpc9e451tgjdo487itlihk08u9lgblam54awzukc6clp1obtobmbieyo3tod9mzraeg0ab5dezel6u15kuxozorzqg8dgdp6lgkijlazdczju3',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'vgkuh6o7exqfqnh77tsotdl575shucx6jo37jit1mm1hiec0jp9l4m1pa12s5ans5e7e8cojcxsgyx7g9vedsk3g5il2ix6a03c9sp5xy7gf5v4ukme2sfil6krlj0nbvl5qwn9v3h87p25a1jb7jljj1o2wk53g',
                flowComponent: '6eupfhelelg0qzxpfatwu7xscix6m4l2eh5e9w0wxjxrd9s8dok75j3polc0h9gzo9nmnrwk87rljjyxlsusp0ns9xdqncl3trd0y9focq7vui4eoucsq9wnl5ptdrwtfxgkjw2z85gek0j6tb52maqyu3ddyb23',
                flowInterfaceName: 'x2asz1j8fbj4csf0doqq25z69esfq7eub6rf391sqwylx5romvv5lobkl4ssoia5yk6xy3uvya2j2a6nm4t1phim2pugdotma5o69fptg49cfcwq2p7zr3lb63reab7ixmjcszw0yqoyho8cd0xmc8x2cza3azkj',
                flowInterfaceNamespace: '138xiz075dt4v2r2uqlqz8fx2u1o1fnhm0dmh5rgqki4dftbn5bq956w8z1jz10lziwj0v8v35gn5o3eufedosw5rcq7s9822lgkndjs57c44tabppciji047mlh129tqjv2zigsavkxlxuwwsluc84xtd3zig38',
                
                parameterGroup: '2ac56oewlyd5plm4b3cowe5ld9009d4tzpwq7zjvtg37rifatyqunnehu7rw3ylpgdt89nu9ed6sa69rv0hb7wvbqywvkhzosci94rkcjvju6ejcu6qm0md50cpfj9ewnzstjk8h5hul89umbgc43d8dwyfu30wn67w3ta6216tiqwo47xopb6j5s68tdx7vphvvyz908k5vrqfmis89jba77kbkp8qamgc8m18oicz7e6ykvyvpwourpddhfto',
                name: '7opej3298a5qie0qmpnu6elpo4dnav60hjfx54fh4hggprsvp4z2ljjuqm4qz53w59ycfxflnffdao7pjy7wecaui0z76k0gv6rk9v8homy5a4phxrqyhlb1vlz472ismkrxr0igkve89940d6qdvytvgp99207vcnmjbkoujadjb9kpciec3rewm5xiepv2pnucqnf9l3xdw5yu6lw2drswgf0mf1tr0vv9vv71v3r55f0mp0zhueepcj44cjvc38p4khyry02yptcn55b77ao2xhz1r0vw59kjepffjyf87k26u5xqg7onatf59u3a',
                parameterName: 'iqjeaww2for6wt4ni8knjr66qlxowue2fn2u7b78anitd8qa3yud5hcjg4aeuntt4m837bru8oqncgbgl0j91aifc1y3id7e72irc5pp9feftv876b0o2hwrw1z4nzgquf21sjxsgzyahfkie98upwihp0o55fj002dweyijmkkkw69nmegt4cc6mmf3hsvwqz6lds0qk1my1tvhh5kbpalbzewhvpeh5gcgdc2evzo1hug8apuh1rdab7tyrzdw4qi137ubn9m4tkg0oq7ljgzcwvuvih4ygop3siurjhglfnle7kbxzn19dwz7puuz',
                parameterValue: 'cgckj47v6n1fbl32vxwjv6e6zhww8rl7hg25kzz3ded48n4zc77etl8holirodqodcrdxwosscm2lkfkbfdertg0zka7u30004fn4kvszzr6o708izj0vbcd4wt6f18l6z11b424xd3uegfrsqb8w4w1zi00m5k96aovt4v0bllk0j82hl93uvojpsg9cilzz3jw3ju6j34754uhkyo7zipjf45eaqqb4fyiu2286agwmztixbg5cyp1j9olnomaufvczl8v3yjfbvzqse8rg10gvhdec52kiz0em89q9hnzla5s0s91mrm3lwr1bagnzlj5wvm3ve39t5d15vt485qtcirxgwn2ppr1qdd97msulzf48o5ybhjn8xevbawmcmh6ascocac6iddmlwgekhqavhizmdi834eo519a1gj5ogowr8dffiebvtr6veg2nrq3ayhrthwaxzb2cu0o2vnbvr7yyjtogkbzk6o5zp4si9o9p883vzvqqpn60yop57opsworww45rb1pz7xxzpau2qsyf96epdorghu71n21eb1td6nmugl3e5q19tu0pl50xwowmt85c6q8n9trqqot7xe5oj6d4vj0h3op2b11uhzi6iwnj0t04z94a3tdvzujuora7eb4r9u2hwwrmnwwkgby7ypx5csooin7zywg27mvazwkrevl7q6y8i6te7o2b1x3m8xp56rzladkc82qc8o6jhzlkeya0zcf82ce3gmv9h9mhkt4a0mgyzzxx2zqybl86y0oldnkn3dgx20bptt6xwh0pnizg789s8gv3vm0zlv10driwudv9bhsrg1hh587aqsbqh3xcu0shedzp47doumfii9fth008dmp1hmtw1274niry34egx8y41cq4bgr3jqcnoxtyg0hb3rtazd2n0sz4nhf4ouyyyzubae3wwkjskjzwft8ww6joyol9k6ngsuosgrcjagxnx7sbkkjj71upuurwq66xmw06szusgbixpr9ksjrs405',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'sli1b46u1xzio8sw8byqbfv2szzjna23nerem',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'edbfuhk6jxnuty75z9tlmpeizujnm9xcdk7e6lmzpukcv1vttc',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'ni5m2cczfudjayaphasl',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '621jygdo6d4ksscjzqxtvu983qf2vo14m6gofk3qcrkbjpha9rzn33ezaj1lsd22uox5kbf6ku6njpbdvytmgvu7q9ajxhpnvasfp41v502mdjixp1nzf8je7g5mtckdosgod6kzvm3mznma91t3v3hi2ex9q9vu',
                channelComponent: 'nqoowbrvr219xvzt5idlrz2igf2drhu2lftt2vbhrgv6hpc4ix3mgisn72gpuizbn8lnj3q1g7oik4ii6b2lzrsf86bxc4n3sskt4h5jxwu0150l5nm7yef3t0i80s2mh9gn6wqwjeb11ek5hrden5pv46gc92l8',
                channelName: '1rzlr9ppq1ey91k758zkqw0fw3cs44ka4kzft1lmjwaxiau8wwxgz3sg6p2by3etqe1em1dpbktuda3vitjws2dgh9uxsvtczesb7525aidbyegl0u9mkwxx5wjxsxp1bog7qjpea3lboedoomg8grdt4zgqaz1t',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'll30e21vwn7cqdiv0bnp9kjvu7dxx4hc40b7ka35x7ta1kmwb9ycbeq3mri6h0gu8jasdicki7iuybznxibhwinipv526x6qo0iumlgh4irul8ejp7ic6u5hberbrzlfz5ae3fvpoz7mf0l2h6ng4v33sxu67rsj',
                flowComponent: '10vrikbvavgec3uw2tdhtaqacqrc06oyyh9odekunvdjkeogewifee89g1tht17ukxtr8ch0ok14aoo3raoi60gbkfreh8uvkl0qiwacgd7cknhhaqy3umiz4ifly3pehghy6fig0qakwrxeiupz26df0bf981ef',
                flowInterfaceName: 'cctlh4vfgg7ej8ldgjj26houdasd0mr3rc11hqis882zb8co5br3ltie3ylmlvfft9u5t7t4xlw62gd3vumm1vvk1lxvjsnt9r671tc2xud24kr65psfhb5of9rbvvyf0q4obrnoxqxlptkc8d73g7t6jzwcm8qf',
                flowInterfaceNamespace: 'hgc9nv1kvp3wwy6kg8tokyv9tgillhw9gkj1drmnlewvkmvbx3yb5fmze6717twor4n09bhx9nh2oejkb49k5ld4ihxmfii6sofxm9rg3z9kat2bn0grq4wmsu51daaz6etfc903ek28z680bijnh9j6fx8z6qr6',
                version: 'oasdgs0cqbu7y3gif1h6',
                parameterGroup: 'ds0lezq8yfkflz2p9uly8isu35gja8zqe694w29dhs2bt5ns75dumii6pzlyjdentksdgwgwzzp9yxiu0x0x5yinborkva6g88ajdz0z2sbd2mv8gmq33324st3hhc1mvvyshdny8segkhspzzvw9f8ff9cvn5y8u8wfjc4xup8jwl0oa2rhi8yz3dacpv72ua6y9xonhegj5qeik1rofxn6iw1gw3gw3oug9nsc58pdrluda6fjpef71v9vis9',
                name: 'jo1m1do91nkl2femvpdzy4wu4id0upahjpnvcwk8qku2dycsz48xwequ7y9pclzmdq9qr9d52y42fsg75oiexbrwaxaildlwitazhbel0nwodidu63l1jy1ppd5cryxkmms06g01rjkytjconr2v7sk0duowhds99by08fo71g6br26c1tganx6oh9mo4bxx11d9cmbysds3gjquz6tq4v0mmo73sc0tj8rog6ce3xyt8zg2spcqkzd4w9oq5mxc7u59mzwd78h5fvkfj51wi5p01bwnjxmt01rypxo2dvuboqxgkm3ahiwb1ohi5m71',
                parameterName: 'fn90nre0cg47favu0zagrc18lj3aamt0yk8l40au1pug45k2rbb5wcqe30nw2b8ondm09s2z1asya88f6799tb1t838f46que2sf61e0em54wok4c2d754w3z8q1jycg016c10drz64jqlulxc3d589finypgii97ywujxykvjc5jvxyyasft1vqe01u328po2c0ghlldklni8apxx2vg1ae27nztqe04y50grtivj4iwlhv6ri2e01f77yoro8udtxbun200ezozbiod86squds5660pjx4tqf8j9lxok2r4g2fnformktzky32v7lq',
                parameterValue: '0y940h1c5tat0huor20jiyfbxjp2jqiebeuo5ee9kil0cmyttugqvz2avszczkptttvjmkdnb822b407d9zxvjfqnv0s5fejbqjghpeqv93gfhmlp7ddm9e6mnz0ifks9mrowyeevyzrhjjygg95kltqo2tlcz5ivdjthxmn3zvtee5yhr8l0ipbrnuo2nz5dqbnkwpbzdupswsdji8l2e5a83sdr12qdfv7ficlsghv9wtwp1txtzqut3z7jj95d1nklisnfre7wm7wq9y9da3jsg5uqqe8a3zyz12gz3juc5kwagwatwdgztyjv1r4s5ij95ibuwas1wnut3jld20db9kfsehijgyjvvtskag6gdy31r5543yggwo4vga496jzhcv8rg0v964kf6zdmt1vqigoq3bxkycvjo3vs4y2i9rgrb6vhkd4nkilj4wtdqiry6f31jsxig3snxl48s6k8macd1nhlmq6gomqvnz344yfowdk45jbz02o6w1ms4lviywk5r6la9vg5nyzwvalfilnvnufiba8n16kxeutv7kl11nbnxdw516hrb580icutq8y54h2gph01xymdudk30sg8w2nbwsxfwc8zq4i06vs4i9dzqpp8bzvmqg2g7yb0zvt6b45dfyv6ekesg41m2wz9zsrt8186czk45g76q5y55bo5g37m4euvt6428ufj1xwj80f7m7wkv8w2vif618v1tfls3ybkqvwb2l81ujg21kae0joes39wa350w9ub3a1hc6hd5idlz9kyitwdb26ff34eb91ru93rcnhfjlzvue4unyjhtwk5whup5fpvuw4ge14x2akcakjqmt5oi1sfvrrj80vl2d7jxco2cmq19no08vrwuhww5sgg6eyxjghisxjp15iuasxvl5qag3r4gqp9zt10hrymhll3b5yk31x3h93wn1ojcptfzbj23bn2k1g2jdhk75mlv8p1mfdk8kvobpz3mp8wfvmmftexqkkyks7qbgpw85k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: 'd80qaxs4m4jxpa6pgqjm1c3c8fu2n92vxkzcu',
                tenantCode: 'i3s7f2v792nv9rsoyfqwqjmt0vwtfnt4494qx2awppqugtj1e2',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 's5brjzro801yn8laetqr',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'hiuujstadqhrrz44d8uk7vrl3mj749r3kxehw4irl8on8ab18t7007n7y5s8uybc6z5jdseb1g9qp3c6sg2e09l1t0mpsz5oqzrmnvvv8t4oivhdk6yvhv3n8tgyhrsbodn8frulrd6ipw02mp6v80c759wwccbz',
                channelComponent: '432hd1movxq42c1mrya8tiunt736a96cimryecsxrvhv172tqsdpbd1y0n5mb4a0b002fgh6zgqfe7obldqfqk77nfmcqdo7c7dcseeijkubn5kew04p11d791firf4b2jdsdixy99qyrar7cerh7o8yu41anfjd',
                channelName: 'p1044s1zj0ua87vq9416ov2qbh1fy8qb7gjh4b1ebolku8yiinmnojh65kumrbxuka3sd44eyowhxwluskj476rtec7n1qr2inc3f3n9bs4rqb5bl3ljb6kdhycrjlljnd5pxazgt7oa4oxyfuabpq0leveo9knr',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'zxzr9fx5hfpquqkn0ytpdk4u1lhgduk0swyadyrlsae252d02vr4vpberlnjgva1ucbtxymhr2qh9cl9en1yarh8h22qnci4zp4iriccmfi4t965sfva63t9j6e4998u7hf387puizsp8bkawrsb3vkfstlj9r00',
                flowComponent: 'axd6jq6f6hwow9wxqt9vxl8kcmwp1th61qu3ymk1c6hm9go8dyprcwwjfidvl2lnloya0k6kf73jthlj97h0wbruvhfbzdf8atommhmp3dxciw7n6j7jibmnf3s9pdm206w5u1g5j1sxn6fk83t6trh0fsyibs1x',
                flowInterfaceName: 'wrz062jnjorc09hiplzwzfjj7ew9wtiru8sprq9y4z2bzt6dfve2o4kc0lt5172h9qxemimivbonp9p4ansm26c248dvpqwg5zrk1b05lnvlt8kt3dwp8myc8qtwq0hg4drdif6ljrpe1y8t917nevvn678zbg6s',
                flowInterfaceNamespace: '6i12w7fnkc37sgts24jc99wbbnz6bw05ufu254z9j1yrdf155dgg0iabfyq4jy2fng4pjld4tuqu3n9x0uaco5doj3a1zz3280w3wo2qd6mol74np6iijp59w8lviw2ipx64xkvl9favvtx4100dwj8jg44fuxqn',
                version: 'a61q11429ebctdlhftoc',
                parameterGroup: 'qi4e3dq1mj9feipxx3ihg709xkksun4elgxeg9h7hzeean7jbusv7g5s2640l3pzkzddpbdnfrix1je09ik7xwlpuz3c5j5d3bggu4kwqd9m6ug6d8r89k9yj6t5pzem40aex0hjcwp129bjnd1h5eomjr0ldlixc05mpwi9rw7nh7e40a02e8ucesagr0x1b881le9fz2so2pfldk11yikz1t1mjj4qx33d7mqzw4ednoqrqw2rrz62pjyz6su',
                name: 'ws8e8cezbj90wfqb9b3iwy40j18y75c10l6yqilt5exx6xrtbzfadlghkb8x4ayj1ag0egspvp808vwtoq62lnfb0evezgcijfuj9y71rywexa2u4y3bn378fg471f3v5h8kaaid7e6fshm4c2p3etwdokytzsvjeqo2r0vk7q7t7j1dkqqcrwmcyp71fjyv6jp6apui8z89fgbhum5pf4kgdvqs3vttw7qn22skdxi4npt8o2mqxjevj3a9mptsplt3iiy12ho25kif3dlz3ndzdd2a65xle5bjg3y9leoh8h4wa9imwvvom8mdvadu',
                parameterName: 'ms1us3psqlsus95bezmv9vltwrtlqqe6gc4ngbzu9ywitu3htkob5dcv5n45273pqw5nk2oqfjtwmtpji2tf777ce8s9u47z68mn42qfz25q3ecbdfw71gjudlri29f12akojv9yecm9wojvy9h31j785cwvfufbr78dcpul75uweftxffev3bzxde4smw0m47r8jiupe1712prnjpkmiuajknog8gpg4o7w5zjfk4fjfcni5y5phvekcqcgvzvtq1wgw5zv1kpk0x3nal0adluh0ew435vyqvnlckm3j3y2zc3siyv9gctd7reovg59',
                parameterValue: 'f9py0fpgwy0mlfnk4j78v21yt48u5pbq7z78zdewyzrjl19trb5s5tcdja1srww9uuvjmjujcxbxivfahb2p30u08l3au1g4uowxplak8wniv7oyuvo4c1cwrky1pjjtgwwuamckz5aryoxcms2kpdg9t0ghskkrqwzjy84m5u674h0946jc9cfz5q5phnu4kxacvhp2t46fnht4rgaucpu3bgh94q1ckf6jeqxff1c62j3nt7efhe7zqb28lymic7qqo225i9x0gl5l09u78gx6uzqbg0x2r41j3dc2y1ksko0r0logkzoui5n4vlbvq4pvq3eiayc24pihyp7o5iul56eqzqwaxo531l0bh7833lw1wgselr95mhg7h9o575hsjmtbe9ml13kjo1bbxrpbkh3l6o0xwiwfl26hlbdx7drk3tc5qg9oe2gfgpibtvru7fnxmsqkuh5vxi7v86o3lzc1lf2nedgnoiofxrlqua0b3u6gzzl3pd29ykvxf42b9jn26v2kg5mrwn1f3a77g8e6f7nl5juc5bqlsompqlpk4fapes8qet1t7hjgsqwz35ta2484gn5su4i3vgg31b025yzawoyzamt60qd7b467s946lqhkayjkupsat7wereg8o669cw1zzo0rrue232k626hajewjpp4tbig8vhs7xmtou7ibtrdiezxi3jo7nwh5qp0xl29upg5ocn2mn890tjfmvah8ao8n9dyrikz61v6gctu22t33l2oc36ro6gsnj1a1ioh0tmm6ssn7hj7v1ow997s0jx39b5881zocd8oui5c70piwmjrwons6sb3fzbw1wg8ct2h8quub6zoref3mq0ongjd9aiz7jc7q4iwab4r2958ft9x2t688kxdgwejz6r3velthj8m6h2nunuzgrebzjqvrqsst6184fbjzi1k3rsimyyg3yu0ux9q8x6148fcodwyjpjkoem1506wu4nzjysp2jodzo7m9hzauyhvtyu1ywfx8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'gkghvjarj4o5v82evzbqch79nhu9uepg18ih7j55fmfuv6uq8q',
                systemId: 'bm6arm5ichuvhotsan89c7y1f90wc09qbfidb',
                systemName: 'eokeiej93g3mio9ytl8q',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '0zm6xygntpb1mrg34i30ptvdtkp2dgjep8tntymsg37w73b1bb9gidbdizme16mjjdrvjol5fmz5ppijqgyqq7b5jwf63nb5x5wc3e1vfgs4bl58sh5r3nkvofkzp17ssy96axueqaihf0isa912qqjpjmbvu3dh',
                channelComponent: 'qu5jf7z5ra6evcgfzs3ht8g7jyv31amyx25xhueyf0jit89o0fmurydnrybydgno0s1x92xazb468hc4rkjo0tlj2csmcepeixxmad1wtgctu3kkq7ab7n6nsplaa2nk5fwv8irfkduafdddaqqfjprrsni4hy9u',
                channelName: 'sznh3k43kqa8skv11umsqn9zbqxw6mup91swsknj234ep3es4odyyxpy7vmug7uruo8q86w2jghp4jt1ufzyqpdr2aa4206zsahe1hi55u7mcb42mfn113k6suinn54wx8swb70cifx5lilsqwfezqtqeb5xzqkq',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '2q92tpbshi5cardkz8t5sj7lstsm7j2p8r7pvm19wzvalzboktzl1c079l36gz8e53ukq4j913nbnaggcy129z9gcnmzn7d92vlckw9ywf1111nxlv4b91xhnj8f72px6m3vngrkfm69u46ywfzda74mcgs0sz88',
                flowComponent: '6m8lbzu3macqof5yid7q1cc0xncr969ok4p6jfgce5zozrx24an0iev5kdxgdt81zc92s67ov9l3do645i5f7eky7g1gpdc5atb8sqdbr6afjrk4uau3dsxgfisi4qi95yo67nbu6ixwc1htfd3mxxsi4t7bivv8',
                flowInterfaceName: 'm1fv00zi789krsps7y56ackskvk2nucyb3vn1xfc8nnwtm3edfs0bu8qh2p3mqgax03x16orw4hj3ttarpfk673g9ai7h0huj7pqu1and3vkf20ekjlu7ujde70g1qdijwn3mecvjtt2xkp3yy2cllehvuu29139',
                flowInterfaceNamespace: 'y6v5za1zim8vjy1usbaardq3m949kk5ql1u4jvqrd6zwqkmx4k143iaz4sx4vwlxyj03lxf6een6io5tc69og668gp6prqkkufs76kudkqo2hjdvm4q5uosc7z007g800pol4q993kejcz9c3d5706u2n2wllcpf',
                version: 'l5szuri4ypx11m16oza9',
                parameterGroup: 'e3gl66onvuhjb0ftpc7ywkvmlkwvicv146b9a289sc32twozhmix2cwb5zikjhm4n50u559moh8x2zq5b4r5liui6xozt2fqgftaeurwawatjen34afreu9dpzlxobwmsq06akmuicxvcuckt3fa66wxlfsgnb6hhp3fghyof5plo4v17b3wqy4c9ugou1whq3wdfh2z0qwl4a3t226wkyj0u87qcwxwtqmw0unri0p1l07i662898f1l20sojx',
                name: 'nptzo8ttsbhymxfk1zwi3g1rvp6voyfrptqy014b7fuxx8q5jj42pcc4h2ogq0snycwospguf59b8gxcwpktnlb0a3xz4t78gy6gq3clw9746qdpokwn7wpysem4wymjxgdehs60jvj6rcgwumtik18y5zff7d2z4ujykh20rw6hgjtggujlcimuxop9n4pntlk94n2nighiclr9pwcl9q5xfp4efesv8g5gvargf6toi1qtdsgl1r3efpd77ewnszq8fikkqj0lvclkbwtm30qy436iveagxhqbnxgw3r6n8xkejwu6wyleq8r7ezcv',
                parameterName: '05wfrkjo7twizuiyw91z8tg87sisn107w13ut1zza9zz1fn0if4f0go0xeikr3edxjj6ap08m8up0jjzl0nb809mb6jqdnf9schzo2u2sk0cfb7mfhld9nhike48ep6k7xqf9xstkbu7x59d7am1gwdiw12chd6xhgjlgjc6obdygxo49h3khty7l2db1cmvo4nohbxpc53ajm3kdfd08vwsx5wn5me7vmvykjfstgdzjl061vtrrmvlcl9epqy1w42mvolsebqwlprbali6a208l0fs6bgq7ox8638z76ce6wxoae9okoh4aeujm0un',
                parameterValue: 'ej5dgp5maxdlhtxt9xj1xp08hrtoi3i57n9le063ih1ku1xvreps33kwd0zur9b0m40bfu9fypqwghz41tbo5h9lek4oqcyrsc4hrytqawxbyuxu295n6wd84m2pbsrk6jsiv5plpstf9m8f33u9gf3icd4qbjsb7bzmtc3p14w2dflu9koq6q12rq2hthxfshamkgq160cf2vamvpdsrepq99gcgoifk9m0nios70ktox408e4dvug7v4jmaav0f46ee85j7rzx4k0hh12obmg6zzbn2ej4ci4riict4sxraf2wjg7pgtlxqsr7frt5zagmgbvy8go7xlcoxc11dx7424ookdf24gna2s1jypcq2yy8b42y5qoxlodfv6s25fl9n6foc0947ii2r2re8tdwjd6bfhbicauohao2hd5rdjtb5beztp0drmhah84i83b3u9w7xfs5d8bc62pfv60rhf1y0ahw10twzeu7snyyjrgfhh0g5xhjyd4ay0myw6500pmvgbziswotyr9v8ue9hlr8jtl2s97h7j4q2xfg9vgabj1z1urjrykiw8p07doufcztmywwesvaw9mu0hs9a5kea512c2pgprylmaxcfc41bcqblau1uiz6cm294mc5kg4kq8d9bha22030uczlf1oefk825yydsftownl17sqiiuerr61ou4edzlrjt0g7s50ulqxjgvigvdovc0z5q9tthl9w22wdly3sc0r4m5yh7eblewf508uqac2wg4h3brqa34clxjdqfl57gas2ruj5abx795d1khzvjoksr6og6vhq1uqb1g42aec2z134l0ucu5oybxr463el0ho0655x9j2674lykyqdw00yzq58r4dq8y5ssei83p1v4k0kkzp0xzjd8b74lxoha4gfq18i7ziedcljtypehz78wyr3uruzqt68c91556zxh6o69q0xnf1b6lfdykwtmqo8b76ks2lqijb8ugey3931en430f0swq7w3yqntx92',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'gwcro25vgc2nfowtb6piv29qboh36u1ilck44m2ylotz55ov2f',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'jx4z8gh1jtl312up6yyg',
                channelId: '0y9v43aamg1kbg649jr60gdu2t7k4kygqq5x8',
                channelParty: '4vvlh9cuc2ahbmitnjdqbzpyqs9syzaisigw1fi81kr2vrwuf2sqidlqskdvvmzpu6n30fbztjzx06d4ql3dlazkc7aw3cn82acisdp4pf667vzava4x95n9o63k0pbn8p1br1w35flcjbwhsio12oxsz0mk63k2',
                channelComponent: '0kg2z9j5h1tikc0c164ppibx2uf3a4e33ngtuwfkre4k9zfds5kameilwwe1s8ohemxt6jvirdzh7i7crgsnxnrxc6aw539w39gtli7d40hswbrt2wmomjvu5nbox6iszx3a88op7doo9ioa9k3ojsbevfnrt5xh',
                channelName: '3fvaldn2n8zpcdkc6t05bw04fs7kg6znz4flae0knc9v8htsjepk238wd5i16jq4b60z5d96198wlmbglsz6quvdho2gazl5jneyw2t8qdvsa2j3ch6intmsa8pb11csjy6xgoxnbhkrifams4a2nb71gl1x1a8b',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '997b66egdl4m6nduwkk5yo27v8ca9n64bebbp9uwg0ooog4prj9xgiapsihhs361cgqi0x9uemnr7se9bppt417tqvc9xglw0eq2avxuqsykmfywtvjc2ghioh7hd3nzsad9021sw433x3dlu57t4zfr0gdvp9wk',
                flowComponent: 'e7ipz0oakosnh66wc9blusoh0aocucpx42u5g57q59xzzkljx8s90qkg5ip9vqu8edwrobv9noh79wtyc7v3ooy41q9cmgsai8ydopq5t2sff27t93pfuc7sfjix9wjjjz6adqptsn9d3g0jsiljr4qqf770heso',
                flowInterfaceName: 'dyhucvsgyh603as4yp5vhuas3ffdqipyiauzk8ueg9z6t670ongwojpotr51b22kazfuedur6bge6y4gzpr864oni2p6tnalq5jem1kcgm4svnz4z4is8k20c1b4zvokkz86vjra41srp1oazpqilkq9xwyt0fs7',
                flowInterfaceNamespace: '8hqjur61it0rokfv408u4jas252fcvmjwx5u01us34k7tt3wbse8am15cyagid4fydj99f518x9yzyobuuiuth3pjnewru9pn1yf83p0jcyizyw2hkxmh5sqi62vmulkl1iefd3q2war5d6e74pi4hl5erci6cfi',
                version: 'wm4dcry5tu8q1v9cws8j',
                parameterGroup: 'u5wdp72hp0l2vv3z3nguqaywq1a9axnlgukoimwvhvk2gjx0a5zflionh0aqt1ie7rlgz8h7uunq059m2w30yejgtfzbz7ezbz08n95q5w7gqixz43xyd8w1j8k0lew6ge9mvv7p0uykqc76d3ymuk53zou80zbklw1yc3kneogkcdd050fuwenpq3m1o3n05weberd74gqas80d01qrmdk8dcis9cfrmudytoah4tidb6txolbp94r0o3tw349',
                name: 'rkxnvtb17zzt5o8eex8glncz6hae0dxfzhvlpua6i7fii9m4ciqbfxzdq6c3v5qohiipcwsdohswaalxo5t9zncscmd1dpq2ovk5wuox8lrqywpfvu3vt8xp6s2xph9g4lw0mcisyzivo2zzwt36nwfmyc8io2d7aa26wa7anavlx4raw0zrru7q44hcb1kz8gr5caqzlolf9zj6zd5o0660ksejbvvik5j9252btyn0040szfdl3jlp291h4d2aqwp33b03vwcd0ld0sj8h00z43usglrnadilono2unavgz05zgi0uznoutkvk50cy',
                parameterName: '0i29xh990kteemzk8v5e3rf0xpxvr8hp4awmluqwcb9e0j4685j3jlpz1sq7aujqc8nj3rnyyukei3166pl2v7ub0x2uoruq9us2k4dmzpmhophz2ozjdbo85a9padmvzsqgtslnymnrt3um60r8cu6kf1d6d5vrs8ceij84o2rxpipmorf0cfb3qc1l8wczfqslmmaca6s1swld3r93pkjrx8ppebe1rn8ub0q0macftzkjh9h1c752av39hqg9x61060zz25e4p2tjdi4yb57sdwy5mjvdp3stak11uih54u64dx9h09g5zzm6bgjf',
                parameterValue: 'lir83brl19gde7a5vs3lwy46f7sf0rb2jn40nbl8tkls7yb5r8vdwznd9yacifyjwxyaigg27pz8esqb5o9rofvh6mm4mr5qqhgku2ps9dbq709t36lqhiz015yy1y7mqn6cghj2ffbalkl1fn8zolv5liqta8660rglrmlpf2aukz2k0g3sv4gca30eejvgxyb4so6gjkudmp8uw5bfwblb7hsrsdonmmr57qvhx8stoc8o6n3x9nz8knhc4av2v38dv0f8cxxzvfpw6wwrrwubuh8p9lprp7gfjzwvpp4u0w0bepzagu0scz3oslisx74w86dad4vvt7ws5mbdjgsbmmagj8r4pd1qpuja093zf033a9ihgigskdx4t5zkigif25re14pyyweypmom0xx4tvaphazfn2bb17h1se7x1iw2e09lrlukzv1x9bho8xefvgg6x2l3v0hd1h3x6tnzxho4pwwawmlsplygpbd94xudcd3kl88g7ndrib3pq5ntxn8cec6tgrsb3jeyjb5yow10bdexoaezmvvw1dh7tndw7q5ewt7m5k4rsmropd6b07af25a6na06iqejma48pn6w1mmdojy5n2wczdj0zuyv02dyyl6hexpeh5pimux4bndb96xh2cctxuo1xd51jjltzcgkgecickyrq3onxhn5o1shu4xx6h8opfhwcf0z23j9p3n2rd9awh9ltltogxfjhopl82akvg1ei19e75aay8p01vgnkr166ude9xc4qs2yb3reky7g7cyrlae0wdt5t0m513o9yi5uot3lz3aifggbzkq2rfquux2hjj6y3dsmw2oq12exq5j84d6fn2bt3ejdrl1xtqad8rbdg9scafo83b9mzbl18a9umekbldy61ebd3hi7acm6rzn794viqxq1nukajqf564snkuozlotobthlwbzpypbez9s9gke0z8sw1hxkivcsnklsndervxsk1sutef25k6ktyg975ztkb3u183qb06eo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'o7u2cl6ij2xg3qctyec3xyvl0561wkm6k59v1abfr8phdpiujg',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'iuf230jloampgcdiv8ye',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'f4sy1mgwp8ux6amuefsbq776qdagno0lus5kwjjj9ghf6vdkvcdty6ou4jiys64faz2rzqzdlvbcnw6tsnkzf2hyrj218z8z4f0shdz6pmp73jwq8uyxranomyshfydsy1s5bfqv45heo9x9me2vsow33905fjyn',
                channelComponent: 'hkiltcztjo5pqcq0eiyuap0qxj1uw2d2djta47bzwq7oqyja7j10k1777go9h4blpmcptgf3ucoedot6yvb1s1vld42fbau0hs7pxx371tljfirgvivzesq2iyxt868zamkgr9f46alqm8hxbia9oiwihi7upckj',
                channelName: '3q4m800xepgc2o8nioz6ymb9h6wgbnrqmgqz74r5yda626qzirdft5lgxf1xcjllaresnyf8bj2ajd2r6ujpvlp7daef5gq4kbrunz1fie666nailfrc9x9nbtbczc7sjammag3oaz7n08tw6xojwwrlm4kut4xt',
                flowId: '3oxobdmf47565ejpxm7mbg8r9fq84agge2d9j',
                flowParty: 'xlgymxsogqyrpxrtc98vuax7kwhjv411kh2k4mmfn1as681bh8o3gccbs9lw4230r1ho1k1hc1msju958mb4osa51caytwyz822hhg6qknubrx6kja0etmwkazopau1bude7c3kbmb4hwxrsnb4yz74a1yldeu9i',
                flowComponent: 'xszv59qdge15uxtsaowdl4opz55efxrykdahjjpxrdas93g6bqub0yosk2fozi70pe14bkrpxt35x7vkfcjinbu12i957eo9g44f6n7n72bze5yzhj7og775pp2ivjp8z85b4py8900w6fvrqnfixqja5o0lq461',
                flowInterfaceName: 'jmcic58rwvzwldgx6mlf056d78zez371zmxor0scvxo5pa9uc4k6bc4hxcecd3526x76bq0a0i4lunm6vyroyh4rmogtbqdurso3cvfgpent0y3go04pk9jpjor0ksuodu7vnsrm59ktymdv39gllhk3r1g7ieqg',
                flowInterfaceNamespace: 'l0kkqgyspsidtv1kshwh2h1nmnhlgk6e5zy85jay51ueunuzyhn0ca23lv7j47iriiy7ayts73y9g1vopo4m9i2vo3fgm31rj8i1ikcj0ntuqwos6dk6jjzbiqsfjpua4vgzpihrqc6fimb53uqellsi37oded2t',
                version: '3r1otu5fx9w9t0l4x36x',
                parameterGroup: '6kqtmo8wk8ktr9psgiurgc427tt821ovx8lyt4q0cukxk87yy3wcmnhmskl5aih4t8h9ycqg5ik6c6sw5uix2l57bxw0x23i0rhc58c7tp4s7ju1jvvay81c6vdoc7yszr2qzv27ar3c9a6ah7ww4ea8rd9du7cgu3np9uvczuz84rtwc5d8g9gzt626t73x71s68mz7chuqelhse4bmsx3du440dwqe4d7po5b5post26owa6pdb0kzz6ay2h7',
                name: 'rq8slc8no5u35xnxz606xja0mwz2yqq3u2zspv12vxe5nimz7et48dmn5s59pv15c6dbd1cz2mcbi2hhm190o39zdfclx1k2rikdkkcj4ghyvfds6s9lqxskvutzq3q2fibgb1fyr50q6llmzc82n8islyjuqdrrsrlm4e1xjrpud713i5xycslls0hqedoa6ku7nm3rs2xti22myl375oo17p09kprm1jt74spbvz25lbkivacfxx99x0gtfhpy93avf84ti4zox5w8pbeapcvi63kv8oy7m89uurqlqxuuld21gpyrc7pnb9bguw5b',
                parameterName: '91bxejhrygjpwalehm6ta5ewq5jud85su72f7rnn73gizn41t2huw9uonsyzh25fatlo84mnuc33831ospb8dpz5e40m98hsaopzdup5piq2jgxubgv4dmj095bwgy3g5te72pero3r6xiufy4evfr9x9x4yxljhfmx2mjzjxdj96xu0w1j7iei69xcojdt3xm8vzokgrbkqfss8q1vdnian31a5fx6u9hc14dysy0mtd8zwubcz2vsi70vdbb8uzuvl5p3hyn3wipdz9shi9fx5oxf2uri00l4fii4uaxbbtval96e1qd8clarwebg9',
                parameterValue: '7d7cerm27bka49gkvo93d36opy97xy0owq4kz2ntilqcqhhxs4sfihjkm7v8gnbjcahkx4i8btv7rl6w8dm1aiodrja0ae1hfwxeko4unjj5re17sxjo8mp47d7nqldiapgdkbyj94qf320vmeknzpognxc0me7xem77sev323b4zcvlpp5tdxi7rgtejxqml70l5yahzqngz7br6wwc0vnemevivkayyo133rg2a1hua6kyjkwkdizpb5glzq03n6uk44eehy0ik7zrdx2vjzr1ofsl46lbrehiorgsslb7w9ks2b32pn47mlqwyip034ln323szcbt0w9vrvdwlgfnueiunneq933nwhj90xex1wf46catddjswlnt3k6of6actcidczhjk2wo3wm4d1y6dbyzhste54g076wmf5g8wesb81gi5e130mrkmooz0182nmzt9tsz4vdq75eb53ng6i874dvan9awcwhz6yjae69l48c4982xy2d59kmhebe1sazyqmou9gcaytf4ls0brxnte9hfd1b2vn4tsovjjhghkjucyr1w62649fi2hquvxakig9s2j7lm603bznl7xy63vu057zgj8edyuuuovtibilqlir14wavey6imcwuo76n47v66elyp494zdm7bmnn8q6rv0dyxgzsy37aptq5jykb8ejul7vjg30pukbl5a9xwd88ml2vwb2nucqnxxh3ugznepliwg8pryci7j8b3a0bmxuq7y4e7dgpn0huh91afclzlpgnydu8hcx4yhe0p7abyznz2wlu02gxz6s8qsbzpgjxmqi5wys5dpfalncmx57rep2o1drz3xusoalp3l73jr3iiyhq9nn0unnfw0gz6p6uoj9qd14wnwkcd7x0yd52er3jqupnm4w5ktup2y0246o2zo0anexxxjpifjcspky5wmgs0e0oh9tmbxm0esn8bdyk31zola0bsqjpskouov5ifqttjv0qzvmu5btw0vyfkhf9dvsnl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'cuym8l0oeoqnc476dbmtigvucz27ec7n5ithy6pme1u2kkcoqyk',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'cgf7q55zj5v6tgceqw5n',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '5geqyyum0eq0xyz6itygh5dv6tgky09j95651rvdck8y7fcuuxjnq8c312227gz4cyy8d02wuvcg1fyv2jpeknkyk9nor3v6rs5e5qq6jjdn3sp57lupur9tvdkjcggcxm22cdv165uwvq5dpdn9pys43map0gf8',
                channelComponent: 'hrnuuo1qahhjzx9k5o4a7vkjge1mid1h9tmstly5cx3wf8hb6o191rmdrsqxps0e35w5sknokmc47dzolhlpp3guaet40t04i0jb16byhtkbv5k8btvawhp1wwqh18rwuunofcuf4w1s59mkaphyq9uav8x9etmz',
                channelName: 'br7abggt0siwehykie5zfn08670lpjy41gih5aphu1vpuel01xsus0vv8am1rugotgswdnafp2u4i4u9ne4wkl6anqdb4qh3tw5bc84acx8zjtqa8o6c8dsboz06chj4tos8bnev60my20l139o8ko0gd006e27k',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'yvfxmx7d5h849gsn2vtpsl6401tf2elg1on17mrs96f42wwauqyryf8oq307zbr4h67gktpgrs1hy8uuqwlqrn6sld1od4llrijk46qoxy6p6yfkkasxskvv3d2wqn9g1m574cgubi7i43kceh6k63le8k8dxuus',
                flowComponent: 'zh4vuoehrt6csrvcf92asndh0kgptqfe5gdd2yqrpywrjrtcu60wh54t3r3wkajf1m6kv8ybu7nsmq7gcvaa52u6wiryoz7d1nac47xeisuwjrd4uosqm614s1fn45rajhffo5glgen21ha3hmnaw13bfixwritz',
                flowInterfaceName: 'vcdo3ztuymfo38wempyidskg2eg66wkfw8nkezpr4r1n2xzmt8hd1o45ew2qz4uf1pwfsf2qze0z1xr7z7gog0mzu8c21g39tfltyrtmi6ec6dyipedvhxt2z0226wbrls42lk92polw0kt4l9kzrabfh45a5sj0',
                flowInterfaceNamespace: 'm8kxxc1nmil06bdv0bwqp9mt037qm4p186ox92wa3uthp92c207isgilv6gphz6eciwb358kttfugokv3u06lwi8zcibql76mjmcye1oem22cslq3ztpgxcssohruxs53p6mxywaxhttcmgr8itx32q7vb7e7piz',
                version: 'ir4p35u6mtobv7f8w0h7',
                parameterGroup: '5um5s6h78hvuhovsrvbhav85jivhsx9pmyhtk8ks1lgzsuslw6yc7b4zjlt1c4fmiy0hnkke5oabntz1cjnl3g63k6vzx73fbsdq2u1p6c8w6tjlc2e2wdm81c69383qf42wudt3dys648x1j33uiy8fdwnqeerep4cigh19674ppdd7qxa02p7lvemest5sm8xcnmdrm6r4uk3555qy7cw9lpu43bqdrtaw3ccnpso49cxxwmybm13o478icyo',
                name: 'r7bzcsbpt35eziw8s62sthzji8kwg9h0prdswhi66xcmwnjmhth4tmyryh25yrhagw6iwm9uy6bgtv8osmyhiuxsvakvtsmso9npm9ujaejy4j5bnhxc0nfleslgzunx1vjp9cq5133kdw6or78qq3s071pjw3oh2uofcbd1vfdkd2wyxviy5x29cclt9nbnoeypmi0wvqykdfp3todjkhqtlwbsl31dfgquf1lgxen82p65tj7gynuargk2u5jtumtszngyrrzp8cj34wyz1ydrc2o0mvh0gh8efdnqr60oyy1w6knxuozqzhm6tz3d',
                parameterName: 'ltm35xz5vx5bluvespbsq3wqhz29gtug703463o0qw3i8fohyuakkoi3uf51vza73k12cyxg6twnweohg5ri8nwug23rda9xbdemawka6ixlsa00x59rlaz0cdjp5viq4p48wqqb4m43sq7oayn3yv0w0mi6a9jlem80s3r7aukcjtyxsr98ngj2ox2lvz058ez703884ufdygrcgt385tpt3ljur2vijjznaxai7svhz5xcvmosxrwl4n0kpz6ng9cjdy6pqxc2htg41xi4mnx4gm5hjbz6o82y0uycl5p881p7p3tjc1ep3rsfysov',
                parameterValue: 'dlmrly8aalrdst8p5k9p24o3fxsxrmw4aax5dgcg56i5p8m9zllwcljfb7w2lntvktcmymvx3nu2eo4lw57qm2qeav1z61c8dhoyykhgz0ugojz6wopxun6cl38upe5usvqk7mn1vgr8vvwb0tkoj58wqdn9sgnwqhlop2kflo5ohgmu8hx9ogi9a6tsbl4rj1gzr8mzk1q9dll7ynpkyxg4zwtsyc6fm9qu72jackeqoho0fvrq33ah9znfk37bld4nt266v0b8isax2d8eaqdlci1pct9n37c1k17b67x1uczubpn4g6ykakekdi51h812vuklcda9yfuk72lkcqtzf1p2xq0o8oc320oeurt6lhej5k8azyglg3sj3arayaoho9gpfxcs908z4q0d7n2s3mq7dmxtygzy4ct7g13z82aodl7ag4y3s0u4w42hhr73mi0lvlxy0k44k9fv1q681by3ui43glor2d4jl4tltfr55tw0ojvka7sgo6cntbbvvdlyli75bf3evks8ycc78kangztd46pjt7zygnf20suxu6ln8acfr9ius84udaaoa9fgi3ve20vf2bzrybv12gr2urtaxjfqxkce73ipe8ms1fbsfnj43hhcen4v7mme860e4b4jt13rvo56956k8t1gv8cfqnrjoqh4x2xdvxr6jxciwl8wvvaieb6dffkwe46nk96db9zxrqcizrylgixxf97owch2upw2riu7o104hxqgi7nlalsc94jqdf0a5ahk7wugwybvcnyylazk4bfm6roqb8yyysikmufpegv9k0z8v2raz6e0r1tu4vvyejbwx98vscjttoeynsbmknkv5u5uamocq1xr8pfyrvm4dx516b6qu0hfywgicx296lc7bvjjyltpwsj9tb6v5342u933e8hh5ntogxo1363zr3mqqf2oco27rfxm6b6kue3jphq50fidf5mqcjak9u4ow6rna83v5o4p9d2nfpg7vgkln4sqtbasyva8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'td5v7k2eenz2lezkr8oq8prjxbc8thjikb9xo6cigeqlfbtg3l',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'nqt2eu6zfbfqq5nfe3ijf',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '632o9vcuxkyyq068g2cqeeqa8nsqevvln382urac5qx2b39bn1zmn1ymhmq3utncun91hpamr2bge62y154fz7nmknixiy3r36nvse385a1q19xqqnc3exatk8xo4ghkj6xkhwezdnk1bc6pgp116aubmxy96suc',
                channelComponent: 'ccl811der69xg0258235m1ryh9zrmsjtrdsy0slpz7cu1fuqru89lq5n9xa6mchfvnyrt3a7gf05c17ubzdjw39uqfdptfjd1wclhifqaoush2fdof2frndz2j1hkynpo6dh480obr8dpr4f4r205ya5o4krlzgy',
                channelName: 'g1ubne9ax78bjmlklw6h5s3hnwupjxzuw1eg5kep8b0ydgllsmhxmdswbxasdjyu0to3z0t96unnvwmp68gtmvxh7hthzyscejeq7mvtvzsqk3do6rpifbazotsf5wyzy2jpujbudu5n4yuot2gb7w6t3d7lzt38',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '4ads6he2hky4uq0jfmphbmrpspqkokti98gpmvsm4l97ovy1q0ou5c88ks0cfdjco5osptducvt64b9nnyesqhxkapyrva42a3hmkndfzoruq01r47n8m9g2nfqi6g8jcmc0r15iv970yfpng97lprsmpahvv7y5',
                flowComponent: 'u64ekl78jiai6njkouz8asvhfb0ahfl605g4d5f5ew8q5a4glf3dzyycvj5v0ukuvfobflz82fjs8pdqslksqple31z6e72foe65b64oxknkmqtkkljgthlqnvcsox6msivh8xwfa7t5oy2l5b927ki4rm66785h',
                flowInterfaceName: 'nz0bne4wzd88upbbvrmrq82p6r604689kgu9c0jyf6e8c6f38qdk5vagkbafyj8d9eozprbr9wz93y8x6b11ri99mhwbar7n2q63wkcohsjyjlg1u2f0bp1o9yfbh57tc16ct0ywa0s3vnkqft1vypfi087ucqxi',
                flowInterfaceNamespace: 'k5jkkw3t4wjwib44nbrwi0iz1hp0telt4rj44ikgvk3czti1hhlb2ofaet6y1pvzy71l98ti668ogtlcwys8ma0bnvk2ho9rdk2knsfy4zt3xvrp5zuic3a07mkwr5fnr4ir2zjlx64eixjvx44zstezjj4bunxe',
                version: '0j0wrk1ql9zg6tsmsq6u',
                parameterGroup: 'nq4r5kdpyx3hg3shpd0xsincg5d0yc1718aqk4sbz8eatl8zsqj7825fkgxhytpwpx3g7bsqksd4fv190zqoggxunc2m87ysoq5gyfht8u3kcgraybizuzbg4cgkqsm67blhw1e52e3js0uln5vmsthpgsvtjpktv1kencz9rd6zhu94pbs825w12ycmttry6xkkh1zpiuji076su9eeae8lruw31kusgdlcmh9jqrf9n19jji6rbdiav3cla0c',
                name: 'lenj5rc3xsmetsk5zb3v2clrl4v17qjymjndn8zqkigs6d0vytht8u80lsmzjiynq8gz300qw0cxp4qaya6b3r28ns1ufy9aq1x2yifl9e2x9bdst0cllggr7ytw7ckxy74c9acovcxegxtox8tmeokil2krmro9acm8ve5d6y7of3u8iabpismn2eoyf70paclh6xww50gvc7bb90iqbxgbg7bcso4473tagkp5nlijb9ycdgicfr281wxlqyzi5mudcjlvyi8jx9ih8y1l9zl100560uypebgod8t45m6cxdjxhvowi76cvpj0pxhe',
                parameterName: 'gric2uzc5ygr69o1u0kd8sxi0f1i25ou9gmfux9tow9swoo0sz1dj5i1xvi36avmh82f47mhmflnfyr3dd4iq7jb3s5syltzgybf7w3uh78mf425ijpt9ou2o8avi5atpi7cyc9n27ycldzfvdq8x0kd7onrsl5rz3nhi3m769a9h4r41q85q3lytpmdyktvi7r649jrtls0fspnoq8rrqfzx0ai670xxkx1kpxcatlnhu5qybjgjyjuednwp52rpb4b48mrpbuv44pnjm05v1iqi4qncvx6qm0bof0o174vd2dp9y3vue58vrz78mze',
                parameterValue: '40gh0miliaxxt4wo4olqvcg1sh09lrpqr4jw7aclkimj1olc9jngr8oqlmamy8u7bc3vgvr9ud9hlamlfbuqtu6ze0rd8y0ulbvpl01cxfrrvlb5qn43ihuuyw6och0zs9z7k1a3ad6llq443ov6gruknpkl8hra285o941w3wj9q5l86can8ordny79icnpzk8xbsevl67pwvpenlei30vl9grs479d33cq2peie1i4vaqmq0o7gnh41w8ft8e5iiawfilg17qt4nip2x0y58wftppwsdn16wfijr328ehb9d77zk65xzhy42g9328v4h0qdp6hfzz54p6y2mx2cmevmfj71c3byadh0rnq6xq3ucfcswfkkl1z33z62t5x0c0thin6qhi2ijn41tj2x1qxoku0ub6tos2orlsujq4amsmq7vnzfzb3nbjeeqp4mt81qm7rc463zq5t6n2e4xiv7xv4ymlxew2zs7twpl7ov3wlr320q3om8y3up2wd4yfymxpdv9jpqmcgy8kgv94iodndzcz285jgq69glhjsds9l7ajoxvwrf3acuy0by65o90izttw0mjd1t2jt43y0xw1uju01nkwlpog1in10uag64fo4fqniyz1znsoaljjisvjywxki5n7xn4ewl7fbic1r95e1sy8r5e10jp8r5m8wuej5mxqnfzhlm64mpyyozmle1w34o68yf8fsfzriy3i5vt6ryjlaimdgz54x5ytg3nf8aw923yi179fy1aku3ml9dwavztm37hdi7apwz6myu5und3yn14xz4kimsj8c8palqd0j7nbzx3iu41sfo2cxb5ncaupixpars6v1xxlxbai121p3l8rk6v1osim9g5qjisukzfj10wdnixzoyhuc7nzen6230ky15krzuqm0t5puc8c142gsgr7ztkn0rsfd6ontyiybd4mxpzxskljoecyptd8n7i0toywk1upeo9rdwsmg3vj76scc8i8v9lgeji7qu4a0divp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'd5e9gij1g82kq6ly9qkn87if68j4pgu6t1znv6g6zkw6t5u8aa',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'w2rms32y9p1tmokced8q',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '644tx6qkddcae3vtc6aaez4jzwxy4fkj63kdd20npxwlzdlun751fpr8pi4yi5hxvmw4rpt7bwphwps88m7e6v4koijxqtq6lmxjpd4yflcojbujncbyl84rs1jywnatejzhewtr3g6br9yhs0ffg1mtfn51rvbbh',
                channelComponent: '93idk6wrjf0z613f5wg837hxqfyz08yj1su6i0xkc4dedc71nlt6phy8wb1xulb02hn75hfqbcfxg1e07kjsndzslrjz3jv0mud6apikwafw70juyu3t2ngw6d4v64zux5i3949l1m5fdox2ixomobulrqlwbblw',
                channelName: 'q68kek9zozczbfqgqxvkq9yidxurj48ot6ktpk8tgzpr0siuck85fussznbx6cla0imvrkatk7djykvyh4h1i3a2xso92ltqh5ppytz9nv2ktjhnc65gjd3lb9ezvpscfyczr89srsv9pvumf947efww3tv96446',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '32ph1bht8m4g236wf3m9xyo2s812o9ixie7otvnjn3mfbw7a9382ufrbhn3agjtye81ocfga065ppccki3yon0u8ffmlrh7btlezpcn5kjzcmsh7bky568ychb0fg5h3fkcnuaahfaaxu05158atdoaw11lgkb0x',
                flowComponent: 'k363h77dbp69aqtn6khz53npqgssyyivrobel6kb5pokukrtf454m4znukl8rs4wl2opcq5xpnja1t1blelsubn6rqloxfmo496vnkak865u4qdrd7q157tcavelzs95ucgul5sncbhtvxlpnrrrxlnftys4gmu1',
                flowInterfaceName: 'qbs2twdp30imhcr6z7ue3bzhj4a3fe0my94t3a9e2mxwgv458i60qte8pu6ghfxhhcmg1odryoiqkur1z85epjvmvy6xlp3h9gqdsx4rnlp1j5v5cljo8nl3e02skd2zztic33d7g8gweyy10mvcvi0rdvts3otl',
                flowInterfaceNamespace: '5dxq2jfj3w8huf9jorj5zjhet6nxxfqfy528sc91evlf3y60ht0j5nn84klhc28gah8ougxbzp7ga49lugq55vbifcoeyy0xuacj19r8jy7jipnlk2z52z31ncj06472x0qudvoz4ljmhady6fvj0yz4g4wvchs5',
                version: 'mvn1b83d2431xknuvhw9',
                parameterGroup: 'tqxgmhs6nwcn121rw0jgo3opik3g3z3v2jklyi5iiazxctx71xp1ed435ox2rbsef6o0i21xa26vny5cnb70nv9gfhu248tf0zd9pop8xlw9e2ywrvxxijjjo7ldq9abkeqbq4yn5g5qdhd3uf4dp4cpiwt7ele5jwsrz3wk6d8gnkfy4c8eb2vpn91t3n8nmpkwinxr8hig626tv1msi2vz7h64eyy2ux4cqg9jtgn2vgkg06u8gt2nzvpw144',
                name: '53pwzklar7q45icsssy65autx2uvcd3mc2v10dm99o8r4ba780dvldbj8022t97vi0kp7x1m72tytuc45ztj0ri2qf96tei6fyt5uxjdwf5dz56shfqgfpseq2ktuxmlstg4s36q9oen5bu3bmfg0aauyymqcfti1dxcyoi3skwe4hystkhivyfgh3is0o2b4atgov0bhfwsnr3u36th2b22gr9kti11kfkc9bqrsumxuhl9yhra9qvoqw2g5a5ct3jabo9ojnm2304oj1jgmbcit2me231fj4zic1l8aettf847nze8plnf9h2g7qle',
                parameterName: 'kym9krzjlbf85p1jiilo09b11j9zpgfiv3ztfg8rc5sgnakkoyiol44ar2hmmu1huladyekfpap6p56n763cdby7gxcijd1efpymkbvrkyruid7fkxp2zw44lotig48o82k1vy58v0o74ny4gygrf1y56y03osadclfshstio1ujs3ga9obicnqdakne5jysv5ac9zzl5ik23pmi3e9nn456yot3idcne1y3qd4cj7bjlllrb42tfoiebbdenqwtbmo1vqisqyzgjf85dm6zrrj130pt9pft9ox7wnp0ia9svrw676tr4yx4ix1xxetp',
                parameterValue: 'mj6ph3wrlomv6xljr53tiua5jf94oibqu94rr0af9i4ku6o736vxaumzgtxka4o1iwrauvwhwhhu47m36t1wutcebaszd4e5jjeftcmjvlp3dexn67fcn3lrhl1pd59uijn5leg98amj48zln2u0ytpibo7wzk9rbs7xc9gxajvcsi6fopkm3hsdx0lp3hcaqgs8t9jksovpj4ffhfocuo0odb0ed0pnezjnd1u8c61gc2wuq0l6you262w5nf2r5s44ojkvy5xzwnpp5709ktqggwk90qocua3j1iabsyz6s9u8bkoxcoksqyfucqaufojz1358y7u6lbyxlh1sxf1d5qfk1zsuq6qz4qcybknt6qfpvq6yy0vqia5nlpf7imjlsu4f8s10els744lyojp2biijsklul5z4d3telicevhwrlevs2o9ky0jpbvl7qd3w8n0eivvudnhmrofeniiozri0jli3m4c0m79d9eu567ydzgah90bv2stk2k8zx0g1cfmz2t5po8fzxfbq3pr578s068u1gmqdhxppm6v3zdbzzip6s5axa0jicramnlgbcyvg0n3j773fodjvnrreql8g1rb9tsjd5zcsu6mqxw1v5lhi1wowg8bs17i128wcwrhehpl2zo9h6qa5pr0vfh70np3d6v3znu898cl93lqv0gbhe9il1xayr7rrn0sa9y93ov0r6e6m5mrkis4yvj6mgr0ygmp6wxbtmiupq0j4mqukael1aal4bd6115l7ixpus9hkubre6w23p5nzh2l6vncdib1ftc6hvp5bhgupdvsqzo8rep67dj2i4v7iwhon1u0six2mw4a9134znjx38puw0can3vtemskb34s6nlpgax4qz9ay9s6mvx8ajrtf222hbwxyyw6ngs5f0tc5ze8fqgupic3qf9kcbzjgnzinwem2rkgo69xnl2jzukdpaxky5nlvjobz8gaeii7ib54t0iir19n6nai1qyjte7pudep30z9ei31t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'zz0mlu6a3uvxdwef00xj7a42421gc259kwpnukptaq8o6wa9u4',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'leozypqiw0dg2l6c6hpl',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '7vmji0komy82xtvxc2cajv0h0cm9h7cccew0m4f13uxdqix0cnxqx2rxcwjp514wka16vqms5ifwldhstls9ynvrwzebpfyqhp9bpyrpdsuqf0ji87dby4etf8pho4npow2wn9n4f4ba5b51yztclzgpxbfb16fn',
                channelComponent: 'wuh4w0cpz6odjoy3szdtse0827e6tpdtyw4toxi3141w17wt350zdcgsdxhyh8m88d7r8m20np3q7v41774agccy13cykbrkph7n53thagxrcswq2omytcoydkmw01s8xe4c4vot6w6kud75j3n4gb0davc5j79px',
                channelName: '1ig8qua45y052sgv2z2vu10llt0bw91fgeanavqhcaglbycj3wep5bedc8p2kxs08qrx6lc7n2penglhl2zktcz98tfmk3mwjh2o75u0yc5kllhyf2r5kcyvei1s3j5dpvfdmyfsbrzh9slbvg3j0zfhgly07h6j',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'm64nkfabp2mm9s7c3fqa7ph3ro9tzwp9sh6bid9ziv18j7907agi9zpq95lg8ck58h6bc5vjw3m86j627wzxrllqbo4s18n319ngrb54qmd11x06pl1yf5l9eznax5u7ikiho05tiwrwgfcyfw73yhqpzllb77zk',
                flowComponent: 'n4kz1xsehv05p47u7vxho75tep2fxnifitin96cba2o21lu0ssxbar76s8b270emfj2e38timdca45glbuu7a2c0e9y87i0rver490ug3zo0vxdgn01bfzcr5kpuixrpzuj8pgwtcyjw830m6np7ovhziaimtg5a',
                flowInterfaceName: 'ke2hi9isc538k4yjsvyfjznhh232ratdzj5f6c80l4n0ojo243ef3bmrn5nwvu1rbc8iooee55ok6r5s1v6jp4vz40lvylzmvgz5qker7srryiobyof5sumc6v58cogh3t9i7dqc1t3wo6gh79qmy3nv2f1a0pyu',
                flowInterfaceNamespace: '9jl2qiofbnn9tcowgi3c3h59pqxhegthnmgt92lz7829ik6wlnjtfwmbcg10gvb5bgs14i31oq1dpsv8iyiu2lh9ujcyzu7q25maeentrvsqk272ngeyt4xih0xspx243iasmgqkhoofjdlrg271mfr2s79qzkvj',
                version: '2dpwlw40663gdmn8two5',
                parameterGroup: 'fcbr6ql4uc746desvqw4ikpb7zlz5oosg2bmw5ti7uthbfuitkcy72qju68czyvfyknjgxhtke8v07c8mw0fiizo45fbjjzxskqvcsensykfl6xpmxprnj1wt6f794bxk8vcg0d6hymvszj55ya8dou1syvi5rft6cd4m26nx7sodo6bgkkecz9pvcnspjqel1tf0c04yvcle9qtfa0z2dgk4yzh5ryj3qmcpvowcykpteiyde2g4if6shrbl4v',
                name: 'hlkfokbw2tqvdw8858fj4h8o7w8u201x9hzwc82syrr3yv4ojnlrk2cag2db0w8f3dlj4wesp7jftnq3obw0mihmqsxxoiyhz7x1nzbw0vndrfrimtotdzwnphhvj8s2uz7fmacgw1ct5ezcq4ku8j3mupk40a8bqclr2iidcwl5k7t479fqkmpiyov764i1ke1b4xecg45q5ilw1b730w6adede3txhg99kbtjbmg20sknjlttus3pu8q58jqg9x2er9gnqsfncrlqbb22myccv8pkggb8995w7hpcdwa638ndploanjijw08gxiveh',
                parameterName: 'x1rk4ugy6a3a5g8eoydvk5dqm5na5p6v0rxlu1htekuti6em39nv7wzdrk1gun6r6nw7uwki3fzt13qbfe9hoaydub2y81tupvssp7d3o2idhglb2s6f3u8fpn3j1bogmeho6svz6e6fgxuqmdvb4ro6x1hb1xiw2pb02xzhfix3ajwyjhotj0zly6tnwo5on875kdxw7gws4xjwmtujgsmf000ia4ni9woucgvoqi3c26htnluk8tv50xgjj3mlp6h7o6a80ghtgx0m0ibsyuf68xn7omjpavin8u28842zznid2r6kg13xiof348ib',
                parameterValue: '8nyl05hw0m6jceja7sv5j15mb4ab4xu7izgth03n0bsppol2wpq9mkfgifgerhzo2t6vbrmo1g80old4b065gnquzbqfud1t388jay30kx0blzcigvwczp94vfc1i5knaft27oapsm2npsgzqpahwc664fxndbt98xnkbdqn3fvkj4z1hrnb4ao8nwneb0bduts5kungjr0o00pxbi9x6vnyprtoeueu8m908ptrmujf0qbhdbd0djyin8bsgxszysjbij23zyicwkzjr7dv6zaw37zjprgy7mqesydlr788rkepo0epbe2i9fhlthopl161ix152urh4o16w4tdw734mjzpqy159i2ap2jpnyl3th4kr9m7lkpxglafckb5f3dqmwngekju433i97ip9y2472wm1r3mxeyufnjrfxai7fioqg4shuhxqu9kwilos14ao0d698w9sd3lba0hs3p7tpqubrltt1p5h2tinqex5ris7ckwt0ia3n7iky65swmklqi20jmcn2iex3yknnv9mb2ram3h68mellglsf6se4287x7fnpuvw9kfvbgdfw1b7svz7ww2sreita3clal1kwa30m0tu5vnj8gf57rmlhdsqqfcqpjurjzvrfkabcfm54v5sjy394u50fnutsgs42l89n1mnwcpwqnqwfq25wjlqqq8hkewy9znu4f85nzvqbr0259ytr3s8hge8aos4n3g1v1c1i4zdgv14d1g6vvqn8zv9edrgrzdtkznu0p54d7mnp6t0r86b3iq7q0g1msi2m0g8ljgwt7h1jg9j43150zvdwsg8pkj63urcd6i6u6h6v8e5yzjptrofdjbf7fzvk8uom8tch4c2c2fsjav0zbh0rzwcoh2254lldfynviiz5hwuoedpyzvepir7jczpjo7o3djbefz05wx2hiwf1a5mnc7h2l9ksqroe79gvrpqyyvsf8xbntifbxnt23v1h4bevo3jptikqgvgzndq8wjfjbq2r54h0a3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: '2b2adbnyoz7jnhjxput4zqjt6rh88eoki0csnh6z3uppvx5x3l',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'houp7xpq6o27rwtf5shd',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'z9hdfv4ed9nc1rm9gnx4ciph155r5ammpjbjo7w0pz2ewmdr16jjzd4oz7jgaldrmr28lvvz2smztb6nsa7xeo7afw42os48m5p2lj1yr93d0lyay3545c2te1jmradvxm0w9vvtd1se2rn3xzo2bfk0k91tjwzp',
                channelComponent: '0uia2iaq62o51y0q6tr4hn5vqqawrui761c79tr8ufw7988dh0s9mij0ah6c6g3v68820qo36zwsjgfbbh04z4wecqat4gcugjzkvd0r4gej8qx8i3jlrs8ctkuvomh2mljf2fcszelf4as6cxyq3vj6otio84gl',
                channelName: 'notti1257ilnvlh4mj16rlpyn5bpnt8472uzf2kfuvcfg3w21ei125dnjb68w0r73ogofare39tqb8ndwggluha7hsdwaf3uufplanbx4obbifh69t24mcffzouws436va5fwvt15oxdxusllo6wc3e3v0iokk7mg',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'cmdt4hqbljn03k4m44ftv9cdfmzoort2jpplz51wwcsgxa4kngmzzmevgdc7lbmxijjug2i616510o0dq1ci8b2ozdx7utnd41c3d2auruiyb5ncwh1t28dcfih6i79cj17q7r0yf46t1rt0c02e6fooja26nd2s',
                flowComponent: 'hv9cblcjgko2ee0ufna2qz2slw5kkhcstnikdltmm1io8hqb6iewa6lf5zcd0xl0sn20d8tmfwc9hj16scxuy3wcr3fkbvu3a2f8ewexytdnecj1txi3v7uabsyratbdaeig6y0zsclczc4z78j41sz3kfdvxyq2',
                flowInterfaceName: 'ufm2iadq0hmupu22n8yjc9vhtivilfg4jb1jr25ay9o3a063dc1yx0di7rgife4zpeb95o6p563chv5kb11cbnxn2sm56gs5o2guxdxpzr4b5fe46diwouvtwhn5aymmipjs671vx1x1s9obav4scltrdsxwchs2',
                flowInterfaceNamespace: 'msw7y4r69kdax6iw6hrsb7cwmthign80nr7i5sv3haj9w269aup2l2xwq88fedmkre29hctnizji9syu8hic9vtnya6x9reqityy1rvpoeuu7a0pq03yh9kazezc0omzg4q7cpl6x3xsrvzciko40kk5a4hthpfg',
                version: 'mb9vu1mxldv9rm9auval',
                parameterGroup: 'l4gfj7w6c0hapopyikstaq43tsy38wigppm9mi8monv6exgrwmm8bkb9vxvpe0p2zohbflafqdxq1zod8kx8m2p6fbs7zdiv61vjv7g7csd2bg5x7g0yr73arjxbyui9jb7s8b0lukmzgbwmgmv2fw2ctkbnnna7bl3zotmywctanhgh53rb3t6ci1k2dfhpwtk3y7a6b4ivdaf3pglr0f8ysnwxha1l0dziei54hhny79h001a07vmpzg2t0xb',
                name: 'w4ynee8lc9lw5gmdm41x9lfz88xn9uuftx1vm7v45wnxf01q0og3ved9319mpkmq1slyh5hsafbvc8ra5xbemgl7qwwkf9clgf3wmlyc6pt3jdt9bjmbsn1wdi92yo9mva3lmwo9juhuu829j7pu82jvdl7597lvgh06o4bb86is4bvkow42uejtq8qmw3ldqvwybz3kcu72cpa65z8qexn9zfaurjt2p868ap16hobg6rufuu6pttjti7hlvg61xlmcjg4mywxqvs1lqp8bt1tj2j53j6oi0aet7b8ykat8ea88u0yysq6j0k4m7k1s',
                parameterName: 'un8u6s4n13hx7hzcrzgbu6m4wupn91l6ohtos6gir3zgrw08391h7ugaduo43c1hg9lp13q6tvw0mgetn9idjvzlzn4lccbmodqk4fczp01uop8if4jdecwp91sifxnbbxz9zpwkdxs1iqndootqr89hkydh89nark6bgfogkt811clep1262nez8ki5puv3isohlck2047z5f88fbxd1hghct5qqcb7ie42pecddlpbdb02k91vv8zwcn6zv7ctmyp1ynap7jnd5hams7gqoz29tppklaoj0s8munt4pgxj92hwsmxpr4ord42soqhy',
                parameterValue: '4j5em423361g6km7njz283f6ks27f5g5yn2iixc425n9phovlxxmvgl24jb717pnsh4gqlpgmkwi9vg0atql4s08yjcw912bff9wabz0h04rut2uigfrfll8q4l8bbt9uishbzbkfp2gh1xl5hivyqdk8g1fw9zlxvcqksedh9hbiwbcdzx76r9nfksgiiudr1mqu677y4plmccz1bjchbej4pzp7xe3j7eslnmuz5sso0sacq8b8paulbzhorsoedk6dkdq4tcqglu2ihm50mab6oxetjyku36ybphea6iyv06gjmn6v69rxdbrbt6st5cn0hs6se4v7y9c60wu6htp9zam79bhkjz45sxcds777w6p8e7j63wl2evacfcixnluagimw3kztvs4mninxdveh9hs6j7fwpr1zszzgd8peq995hqhszcq7kgrkwvbxri99h0dtktrlubryn3c2ddb8t2wp684lvolurh24m66lpf8jpgvdui7l9qj0suc4k91gnk4uj4k8u2kzsvpsjaixhp6sxh4g51m0uk2tjo85j5k5tued1qkwk7xi9ph64d5pnlywym79tarpthen4g5mj0ikj7fm98r6qq6pejqiqnxsuehlwdmwtrwhsxj4i10493krrba2s24ptkkznf286zz0lqag28twtbkuox6p5oqp9v83x3sj2kwfqvng9kgzhlm8k9uqnxygjp3wg07j5y3y2lrf5qkcp8u64pkjdnonk1ahnbffz82jbtwjkq9x9y232nih3t7xbam0ibjmtszbjq3kahxc3vg3ecrdrj03q8aqqzeb3d1ikmtmarh4qdaoj3a65qkb5lnoiz53ijsdc4m9yhc45mz8g1y0m8ezqlt424bb4e0nlpdoy7la7otu84xrmeef56cjj6jt8ee55mdsj7kseng1uqhsmyyqsno3gu8jg2q34mztm5vllkf2pdmrlpsz1zw1p837blmosq6up83h34pbvbncbbm4n1zbwggvd3el6k9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'q0oe52ixkzqygj2pqnq6d7kjtj448hb3p1o5yfv7vppi7irz4g',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'hh4hhon12seiutv301d3',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'be674x2b6wtv1pg1w7vmhhvnbfz9174vytnrp0gz1wouevnd5p89q3o8u0jr77lxt3e2gillsjh55ozopqc4z8mrhcftb93j0o6ctdexfqwjlc1yzkvzf462rky2en0my6wxrax6iw4kx6paeylwaw0uhr2qknjk',
                channelComponent: 'tvix31x5hmevvhzqsztrtlvyadgz9fwdh3g84aivpi43oumewia13leura20knfqrmq5s920701tg3c5kjjj4ts2lh578ngx6e8olcabjl1f9flbcfui7so4it9i2mox636rynxsw3udqmy2r56r73wlauhz7d3z',
                channelName: '9lbq88zpq9iip5ssuz5khc0kw8lucmf3a9ep8cbhi8ow5w9l2z1d4aztiwm0eeuxr9r5w8viscfahv7313y1fu1ivaa3rvdrz2q18jk2tggazt60s0ttjzaqqbcuatfnk4vvfoi15tf3k6msh0yliwsj1ghkcmfk',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '0xhbb0fsn125a9hlfggm94d23neilrosiktppsj5p0525vyz7lf3u9sffs6fev6l2x6kwmapks8to4hvxmkxxylv7yqnvunzt1vn7c7xrucr49jzrka6ybcwiryaxskzr5t98kzisommohloxfemxqx16abbz720u',
                flowComponent: 'k87b8370xlsixbelc5smr1zm8o8hzk72fwnz5lq463qnh7qpt6ajszy2uvak0wicuzz0ero4kpx1i4qf8ob2t9lg6fl66gqnwp0ff3wm8yjcbk6zjxo8z2iyvicekc8z7alq2z8pgd8o16kwjifnij4yqyzj1g7w',
                flowInterfaceName: 'd98gza7buoow24bm7ufbbwjaqls85yfc9g4nxkj7l6ur9ieo4v6j049jxnds6rqv138clwwg1zyg2zeyxe2z3sroqe3rip8h6db4x2e8x7gdu57fgz7jux3t4pnc2u3h9p0tcg6vajal6e0beufht0q6eex90yqc',
                flowInterfaceNamespace: 'd547cx9vr4jsb87yr6q618q8ynrgm6lrxa2l4lukg9e6diutri479m4hexdsl1ualnplzkk2nz3gr71pu5bgb9oqa9omkcb3xgnwrlisvq2xbqvvbl180trz2w1xiphy85qa30tcbq8n32gjep5cruqz6iv1b1m5',
                version: '6l112thp0yk0bycpsg2u',
                parameterGroup: 'if5cdv3rcont7r1q2adxy5t81atukiw9u4f65x3gt1e8mh5lz59wn17cb2q752mvceeqgzcczlf2o5fe29f3acsychcxji2ujo7zucvl7fqgc52ocl4j2gk3wxvwkinqsvpj2scogfthga0d5lah2y811aibtv64qw4b99bk2ya99q5gwtrywt8h7yvb3ixisy45krmk2bskw3p1cut52ye2g7r3fpesei3mcjpvbsrmsfupzldjke7fi0a3w6a',
                name: '2z4htfmk9l2ml6s9odgqd6kqqexdyu52l5hkire21v2zal9w6v6yvip79x3lnbccl9lr34rkk9rbyrf5iohhwri7pfbachqmiqr412afxb1qcdq9fwqtyn8lpkq20fn1qq59j63cjlullx6pfdakd82au3a0vc1we14utr3jqjxdok6dn6fl9w26kl9ls2se54s9sk96c2nsd1ch33l578fe6nl60u4t0i9zqam5gj25mrxzc1yfyhgnmf2oipsw28jka87y243x1me1tluc20slx6qlx53adh4gfzvktaab7gi944ornjuj2jdals9h',
                parameterName: 'z6n0jb3pd40a993jzjjrfai6l1zxn4d0kq5vck4b59j3bff9bouosl4n2ev8rh0jxjgx1jaetymzudx3k574edlv2l8ktcx3yat9c9yeo5iw991r5u9tl8b2rarx0tp2gl8x1ft4x1sdy9tj1jd82mzlfm0yhfntv4mkwn3juhxu8ourvmnmia2t64wk2brqse1cpuuxpf3fsw5cz1r91vh6kiz4xj5yhbsuhd7o4sfeftdqmdlq7fb4tyro5wj9i10imb1kafvq03ql08y34xu7xhj7ksf09dp3aaspisc5y4vao3spvzh1d90oszos',
                parameterValue: '18h401awi5kexl2buhhsdywskd0rqvoqfc05vlflzlbifkaqesa3mhf1o68wpk9zt4sqn4nnmypkpqrk5fwt7f60eaibx2exjr85jacn5855l6qwozi8nhr9c41u3s4lw3os48yfi4p351jprb59qllvv0wgdr3rz7cpkv8mwsnt36yqqsfvq6f0vw4g3xt627wb7twsdvjk8h3df8hzb88lsflhsbtx9rmkzisl49xpeia8cwxjyenmonhx6oapcpsjm5rzfmyg7r89sqajcjyfqsu88rb2gxpf4rmemlyn3j8x8exwnanp0dqtl0pwngxn7y755ld3iw4a9c3kbfyxx7scf5xk3ao74qar5x2ljohf5h6w6apywzcj6qi9m0sefald4iifc8cz5zhjbvk0me3pbafutpqvtxdqo244aw996wp0x6t7ncpsxjxk48uiw1ryckujxn2631w4vaelqi9srfap1pgjbybc15qhixgma2wp84r5yhm60tp8k6cit40v8wqaxxg5h5hpt7he20hi7y8w6azbtzy6b7wq654eg42ket9picl6yhqo6ncmfnosfbrluncijjyc2a2nbupmzk17kyroobbn6l5w3nob6qr5sjyc9pjzgj0s75m7qb19va38zl5nw93naauw0hesnle34l3yx2jj65gxz4ulxlk7th314p2pkbe7v2rk5rl8bnujbzazcv9wrfigva1px4tyolpj55r76dxogv30i3g91dlpqivtqah37bzlfm18s7leyjyzbgcpf2c5p610tmtay9iz2emjs7d7pjb972vzj8ixevuui3wusmmy2gbn75g4nwg1furakddy7ag5kk7uqe17xxr41eb7pfeer8aa73f4umqrv2p1jfgs9gn1qc704ku1lwj1owdufg3io64u5ci1bbjt944uzy52ojkufe1hra940n53vi9nv3onw53zwx2chtly0pi1h1cxfhzm695erx9ggqcrooafu5fzwh1p3nytmz5r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'dhmgyljrgewjdvnjy2jk56r2qdvuabcmvftby9hk5e1zkdm83s',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'rq64vd465vhb4gi7e80i',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'hd1tkvevxxzcdkxmci58a9u3xhp218gcvegnagabj66aje51ez9dm9b0vgii33j1cqqtpwfxn7ocs35fbh0u7vr7p2sj64m4vqap7w9fxcgml37opp7a75btrhird1dv014aq9yw4rhm2dj19dspbjx5sgc8thsv',
                channelComponent: '8dzlc4in9m76v8c1pk4w1prshzqj397w3snv60qaw9hqd14kuwiqbj5unf8frwq7tcunqeazt2l9qsur54ld5o8u40tu7nut065jpy56bprtol9or3wvqufomx0cncda464pyga17953op9jz6os9g95mqsewzpy',
                channelName: 'op1omy825i6v0bllopmp2nt9kyk5v2hcc9smm9r1oteb3qjs383lgj4pffyluv9mlvco2wd6ugu0xetbtnh2xjz070b1jihnjwmhtb1syrxlq2zk7k74y4b1snro5z8zfy492ogrvauhnmoyeqed6olgjhac550b',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'u64z8bjh2ud2v15f26tcvu6necgextoyox4yd7lz1uz4c9vkd28396ys50yx6ihtdoehm0wud94npd49x7upov1tqf7r3co0rennxb20e8qmwxs25bkr263scjl8o2jzt67o0rwznkwcp60exesgtc25od1asbpj',
                flowComponent: 'cym0ss465n4h3mjc2u6hmd0zcdmf7j8udwm8fvw116w0g13n0o91gw0qq30vpuifexeukidix0q8zfalgaa1ttb3hvym9gunjx4b0aadoq8mlifqf1iziuvkf2dztp8bxelu6y6lb0fu8yg88ek45x6pyuiw7ho93',
                flowInterfaceName: 'imfhgemxdi1w3jl1fhfzjbmm9k821qgjzprj21v9diftyxtgtdkp3vlbucfsyzxps8jg0nrbrb1i0i455qv1ss8zmz3ycathn8aic8nk17xzffdcwpnidfx4w8u1eq96nrooc6bvywv56m2jpwclxlm0wvjws7l9',
                flowInterfaceNamespace: 'trwfqgz8daqipk8rtkbjfieh6io9lj1wkdnexlrje0f09u2sduh9xfy6wnug4800lesoaxob1rmmhmda2cumqu6y53ymhjfou5zm0tvzmwlqocxcxw2xt6ftrpjzkyszemlr821yhrqg8xz74fvdle60azkcb1cp',
                version: 'o3gckiddekfzvnqcoa0u',
                parameterGroup: 'zkwgxpiobnng1vf6a5oamc1zjmsc6upq87iavzh5vvsae05b1g5u8ca8oibk7yjrtvas1w1ala63cir9zhhu53xyd2ts77uhlo7qrdbet9x4qyeu8g2zfdbqq4rh580qcy1q1vhrsj9kvye9nbhm220593e275zo3qam9n11iee7mfg3j0vvwvnabf51k4doiy0i8h9bkqayqpgmcesxk4vbuh33wezqxsrhu9b2n9kwkf741rnhobjmh7hqnij',
                name: '79d9ohm5w12lf09arm16cdv8j3dd9bcurlovgd3dyomzsguck2bec1epb2xrctris0lw0uwa8520a378ajwot4t0ou5zx14g677cpirfy5wjj65xe4bjb2999ujt1yrb6ip25xk5q0mbj2zehooi1wifigh5ma7qte7fnoj13y6wahus9p1lq3o2lyqrn4kgqx9hgqr2vtdq2obogv1o9bd3py2cktkrky7wt4c5g16mwr35tj9ayzi7ckl6yod4w8e2bdlpyghqhkb77thl37eep4arwlfu328o07uhvzsokl4vfynx1bbvsse52sp4',
                parameterName: 'fzrdwdc3oxxsqa861vdi7glz30e8izrnj2ssqe5t2mhjh6wdgajswb840ic25c42o7i0m9n79l1dspxkvdtrkd8gvyxjc5h3goel65updpjkdljxqw98f4ykmg69yrlzx4dedqkppigmhysndnbc2daja9tmlnnt8s17rai90ngisnv33ypxcrx7dblox0zmrhu519cuzr7d4cjonpopwco25az8whzuie9qv0v70tsufnmt4xfoonzptmx0l2zpreklfyz1ljnu0wh29bo8o8z4c96do7e4sz7mvucdfw9c06qwp4iffq3v1zowpafy',
                parameterValue: 'cgzgy6ze3uk1weo834n6s8vyccdky2e8t56f3g5uggm571n5f6g2cj2i805jgpztjnjdapa252not2ljws2jcqef4fk2x2nj32sipkxnx32kqyoahrnfnv4jetrqcthzzlep5mjdhgmy90synvd2eiy9zh6wsia10m5ut7kdjypyewbm8e35qqdfczc7ll3nj8bc92ho8vylnkse1z0xj6fw4e6aj9dup5tad1k971tbfi4p37llppts1f6satse0ai1l06eayh2u0fkfeh02s9rtdgkk3gqdesixw8170we59ei18yrl8wbd63xivrovrj8evnzldj3q7yikd7socmivj7u4gfxfiuyewtei8r9zf905f1ugrcu3342zz6fmlzvf00iplmc3a63vn35u2n42wb52e9atwg25t8c3ed0w9dwt8b8n4mdmk6km2dftvf1edeag5ueb60r7imhvgobukh3639hj0n4ffbogd3we53rg2fi95yqf0ahbv2lcc4q5g5hxj30rz1seql4mdahjxqi5ukad9u2z8q8bvswi1cyz5gpu883mdxxge0zj3ig1p720jgj9rw6wevm89px4k8sb06cwl6xlvdgd83mlekkprpua38inm0bbiy88i0jh1om4p2q63ls2oec6c3vjyfjj9wp1x097tzt4ajby3lbha0gg32vuuphwt2vymv96qx5s38a6cje8vliyykosyx196nju7eqasr2m34g56je1uq26zj9zpudqhhpcwfodihm8irt8kj9f31q4i4itsn1e01qp38lm1j17t1xv0b2rxzj5r2i8vv4yh3frix0cscfe026ykxsj584huqn2ss2ek5vm1ag9nv3fekaxts4o4foc6h3s6i197jszc4optwbjvbyl31x6k1b5hgmxevc0db7bi8mpvn3twwwdloqe0f6cd3vm0wlzlgpjbjf8p16m0iminmngk8l35zkwqx76kqxjog7riuyihg34pg2py81flt1vgfrnth8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'z5ckotfz2w51ww2psi9dm6iva24oc6gyjroyzv5isku2ecc0pt',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 's82sphhseki9ykuh1639',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '1k8zgv201xdt89j36owul9i4cw1hc7zn22113aqk2ubnsrojul1obas76yaphl2ymonctwupajfltiwj28oohtaq0nceshb06x589rg31wk08v23meev0ktcbampeyjyt42c067luz1qo1lfpix9cplzufzcol0y',
                channelComponent: 'cz18shers3ak3kma1y500k31fyz2vrxwqlbis22foo7qmv191qdcmqii30ap7zz8ctj805f02rxg22dibwqzav51nadn0d9uy2amsvigri9zts55z6vd48594zqr196fyzv8vbgim0ryl753id6fh73rvy73pecx',
                channelName: '9s7es5zxoxemxy477hfud9x8lcx9uxl2uugtqfuq8705nsri6jdjuzb4quivkh5kr0qszkpkudo9leu69ysoqr1drgj8vgf7avp35anp90n7c06bwjq0a2nqex5nmaorgcmp0tzakbtgf1q11554hwq3o0q8nekt',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'qtxx5gse9vmuqv1ay4i2psntdvgcxznew38x3ca7ntkpcyklqscl60dytk3ac9vnipkd47w2x04cn15rbt1ngmrohmlhmtltwcnavjm0yb73ozz3qc5x9grmrdv8ezdjvdgdcos724vm3g2vjkfw7dufxp7nbspa',
                flowComponent: 'm3su8lkwo2c5ace59xfazu1n1ln93ozo7mqjoihq4fux38u1r5y1ndx0r1pysnldx7puq9k6t06g79ohiwqulsp1km9jrgmxdlzvvx0wlrrxypvb9sulzce8wkljbl209oh8eg9zi6wkhzzy34y4wp879h7fds78',
                flowInterfaceName: 'xe0bwo7gy9dkd3utg8fzlxuxd6ptvfitgvhcx9rc3o7dtxfix3uuf8hw0rjyikqok1wpe00lj6ana6078yso9i7syogcvog477q7rfdjnnrzlhrt09yzv513cl8jzz0o61na1byoilhvkyt13oyj12c8nmtp5sbdm',
                flowInterfaceNamespace: 'vwrq0gbzh9pe74atipg8luirq7j6tgsb3dqbu0fnai9goqw03jprnwksz97avk93dhbxike6veolqotqit9ock0gxq42u0baapmgka7j3gdgfyvv0p1msugl75oaxb1rc265kx30fb20t82jinfgn4mvdzfifvrf',
                version: 'mln2m3j4ka9ve1b8nb2o',
                parameterGroup: 'dlwpz4uotcl5taxe77qv1sz8l37bobw0wf5hd75j9yeptehjgt5c46gqoxrq1ogpxvd6am44arxtsk306ajs8bil2soivejl48o2uqz1a3sqzyijn353x7btcx2wsvlq6v0rmava07t11x3m630fpdwe9rytinc4lkldhcyl05hx66vegqr3vh9c7cyba8o3oqu5xc9c4rf8cot0i9sfts2nev6dukaooiiba5stv1gkqvhn66iplg8zvtt9oyr',
                name: '5s389mp2v909e1afr3cfyzjhoeslfjxjd108k2vjguaqzejhujky72w5xtfrhabjtpgg0yq72qgy0m2ey6tqceh8ggpi4l8mmnq0hhcsxovz2w37xqc1gapxx6ewigb513tb2gw7wy5z4y2kg85i8kqo8gr3jczknjcymc75h8yoooyt3zpwmdemi43q5cwirqlpvh6i8kn6rtcb0ekia8warevlviojtlpzqql6ezhf5cffw3lcbdsy0ol5iqez62nfqy57z9gvao2993i9o0frevr44cgo88zrd5pgcvy4d1jh3niaeglpk3mfzq3c',
                parameterName: 'yok46q1w01wbi23pbfxcuu0l1z6hfi7w23bggm1o689s7zp5h0njuyb0cez7i1g8znhuf6cydanzm0zjaztk0z0xi8dgbxy18fkzcemdnp4bwse4rry0hfrqt0xg66pqav3l4m87xo5vvowms1hu6mf9oa3qc1b611q9fpijlu8uk9pabjn2sppiw6uhnun6pzx0kd8ngvp9yn20cj5l98w3m08nm1oloeidvu3r3m2qnka8vw35adeszgml4yg65rk7igho18e7p1ex49t0wzeif2rmhoxhf5r5jbjj11e0ut3awlnk9sy96ydrgcwc',
                parameterValue: 'kcad8323zhb7fyzu62jrgst08gr4b0k86x4su4kk8aug8vzzze5omhlx75xubbljr1z5cj36elmvmthga0thl7p2rpltplu6juex56e7iodx446zt01khki7lxl7od133qmdde8ychm2o7116oxk2f389g9jmtqixubd4fy54dtd31jhufa8wprstrs5ohzlueg0qckoy7acvk1ramlattv6g1aamneghx2zpyp3vpuisbcez1uyh4b3ax2tv9cxrc3woxrtr44nal6y9c9i6jzmwu003nkyooc915jnx619xqnfrldc21ratgz0an2vjcx2r3yans3zvcn5bpl17zpgl7y6rja331wuirpjejgw5ixtvu9fmcg7tzk6pygq1i7fdur9aptzd18j4gqx9iijwm53j4mj0gnq78zwp27qhmbrokm06sn0kzf0qgtie4hp25g8frd3rws6pk7dt3t096kvg4923lb4ruui5klwzm2c11ed24kcaz0ocugdlrk82r31ee165ciers8zp6xz4cguuwpz9qa3vdzrgsiruq3nghuhd6hmomytajh7f7kwlra4vx6o292505hq1qafypjzvbthp2vi6gg3bx9audbxbu6e9jzyzd3ckazqley9cqnwjym4f7lzxebu893h0wr9ps9tww5q18lqd8lnpk2j5d6mix2d3gd49v876pxp1f13b1dczc3rfgwy1g4koc2jnjwu0b66dq3hu04czkq1vclropqc9u2tpepwoqfs17vvrvoos0bmu0jiu4jwid8fcezgmf6pmbp6ols05pedo598ncjbis3yl2ekz4aevip5uipheg51a268iw69l05wb0m6j11joj5aesffzg9ijawcbdvp5od3daeryiaxjgx39q2q9uln8wgnikfg0df8j953ay5bph0eeow0aqb7vpzb1ev4j0hzaztm4z6q5ehhthovn8xkcwwar27shubgeakbuqqnq78rw3a40q01u1ho4bssicjz2xtt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'fza6nvu1d3qxo01zn2vom5rvtyfiynrtxorghnzc8bjth7k51p',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'h4hp7ohvkrzxofbduxs5',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'ugta80p0kmghz4cf33vjoat9djssmaz03k2i8utugboax0qsza5buxb3321z2z3118uofo4nd161wr5id8fyody5lywvxxj1o67d14dt814kwezc518o94koh520u9c5q7pyhkojjjnchz39lwr9i6hke9zilqp6',
                channelComponent: '9rbmy70uqoujnfovonn073lsc95lzn275u2njfgx3b6nnqg7yr9fk2m2aj02wuym3muci2i677vjxkgrk8bnueuqqclfg4bk43r6ywyoinud6dt0bevde7tq9364yhtbi9ubkinl0yu2r4gz55xqmykveklw43la',
                channelName: '395v9uwi8dksknifiwh7921gp5axmxzoxueb2tfq9ttwj6972z7k16pqgcmh1snbqau819ks9v8a8ewqznpq1lbmxj25farwtm0o7jiq31rnivh6sbiql1tpgxcobo2b3yyqu9z5mdvw2u6ypjnn9h9gsvl6vclk',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '3qi3uqm96i636k761a6ty13dvt8i2u93o9dpb9x501yj3jj64mhfgv15exzmsdvxv4g6rnvtdjy7fz0kv22aqmhseoosujtb91ndq8uqsc4qamq5chlxldkkjbben52x4p69bnp7t06sy5g0s3zgnzx8wj37h92b',
                flowComponent: '7mbr6r2q2t6ieg3t61qi1npz28t64t82zesiin73d2bez7iajiuf9ux87smqjn1inbfymsqt6tyho74q2snh1ywkpn2ttcdlt1f2zqjbmmn1qr3wxzwapela9l6qz10t7y4se0e7tt2cipwntyn6w8xzmi9ur2mt',
                flowInterfaceName: 'q5x8gakbqe3w8dix6cwbsp0qknnf4mn9ysuro0f3e69u8dfyq8hd6v0xny3gv8bsuhsln36qzlike07z23dj0p5d1ei4wlqkqzt3tjtywh19eahk0t6sa77k8xy40zhfr109y8ljoy6m9mlbo2ocowpc3csqcnbl',
                flowInterfaceNamespace: 'i36uey2wu375ws9ipet3253641545x3ge0iurz8llbcwozbnmbi5u0ltq3zp5fic2io4wm35uqcmbv9pzgiibi0ixjharyccqnecqhuknhst5d0hn9u411piiolv9vqry53s2ugempxdu07hep60li1nte0orf8j7',
                version: 'ifktxlhlkjdjbssn5stz',
                parameterGroup: 'xuvc9p10f8uj3h1rs795kphd3dtbp7vfh4xp540kzsg24fjbu07zcufntqnh74cewvuvvk66fhcukxs7ab71gaodituwuao7001gnh4dh5ra54r9g22quy0qw85yw7bs4o3gnvfj6pzjchozirul0bmxox5dr61bjg3z0okz05362exnyy5g6cw1spx0j025o1d3o2lh7g2k1wzp1ivqnqcy0oe1lkrhxhibrt8xy7nmh2xle46stzjj6re048o',
                name: 'fgyhrte6xa5f2vs6up1eoulu8ea6ifuw88qzbgygi68tcbnzsph85f8p3tka0gedfq24jsbpbeu9kmb4uki5mf93584n07tou0sb1ogvyf7chxrhvbkeb9xcm46unsap9p9tqalv6s0ux6gi04xzzonbt87h24czc9x3wsvzbqkvyac994c2ru9y9bszfzzjg9sedv27jdgdwcezldrz4b6935emltz8zccpnxh3mnj6kq8qiycwo6d835r9xfdfrwko6prxhj2p98dz0z9hzsy7ufcqk9dvmjo1ubhgv0ilmulwidylljtlkadtjh74',
                parameterName: '8n9tnzjsy26iu24wzt7qy2v8p161wbqoj3l8kd2kmfzc0wkbj5bnl44ziqn564idhhb2xfx66sg14xxbax7h7klboho2ay6w3i7iblwbppqgxz4dzmsesi0dv6yz2l48ef58svp5ny8b9rx4hg75cf34bzizklz6etsjqkz8nljd5h5abinrit82xv52jjvmenj5xo957nfu0whnc695lxt07786iovid9qhjytpiomlmsel7gn3oty0tii6h519a6vcjl838oxhf27o85p3qweekqr1vhfo4h78c9zwa0v5fpdjbn313bwulggtc57d',
                parameterValue: '72qfkimjxk62wjfwnr07fsghrj4tj3c350b310nwct7esmmjhoxeyps6dur321zavybgk4k6838wewb0wvbqllinzbxx49p7erzdlczj0ds220h3e1700io02oy5q6mxlsg235h8qv8kdbg3jqzpq47qsbs1d5dvtf4zxum7m6d58233d85iu8g6zhsar2s9cyw3qpb306e5m0y8axkly0o6hqle6sohljiihqh4u99stv69l9l61jl2bp0wd1u4b6tn56gh9womx9qqaof992ysnb1xdb5shpnd6vd3w7mpd7su2j0m9tdk9wsjfyyi8wl0un254eu2v5omldnpxmkt74xtyq24t6rxzjgcdztots5w5aokquhis0y5gigu2ny04weckx4khglya8bgxkl4154jv6gpqrgit6utxzglb81xcsjmbztbsy7z9dkfp88zkueo6ro3b0izt2ex6sbru3tcj4nrjs13z1ny854d97p6wo99qhun47wv0147c0h3vnp3kk7r00844qvz1qycxyklx8bo86thk8uim1m1f0g52e8vjneum6cjc6kjvtqpfw9beydgkqfufbhkj39p94y3aq7mqfyibkb3vhyaustpmhk2oygin6lxn2qtqu7s3gd8g2wmacfu2s8m5se89v2idm1w49u6odgmn252cfnmqgic1p1fz55rrulcgg0y3ibdmqkqmw0h81tvwr5db71fbfjs9pxtfzjjkf6xrvaozdo6ko8jk3qyj0qrkqvak08wlgomxlfceimfwrj76w44srotoks0za12ty6ikpia2kba2e0een8bh64cfjsifz7zbziq4ub16cibsedr85zdtxnvzi9xj0adui7shs6vmzfg1bpuigfnfcn9ww4i1uo9xwg350nkeq4nhzzzwxkyam6qhrfebqnyc8fp9r5zkhzmdhasbfb35mf2uxw665uvf0x8056jsp128y3g8hycx3x7fjxuqy98z6kth3f819vcqi858l60dzhm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'dynsbdocgb6ottz3u7f20kjueq7pj5jfpmnb8jgbl6gndahqub',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '3ouooco3bmjgsltjdbda',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'iujk9txcfmruggj420cejkry02fl8wno485vslwbukdz7zh4qp4shvhacawfcgrol98nqenjhuh7dtsxj0rpysizqmhkwz2k1y75furtubleubg61hc9m7mg5xxdkw9lygtcgjq7d1pngxu9cgzat03xyyv7zq2w',
                channelComponent: 's3gqwbs9k6ntx1mtq87n5aq632spowz7rmxe35nrf3d0k549zi0wxzpvu4emfthsketwidsisdcolb9zlv8a9pbutgnoyg57v8gxg02lwq9h8zt1u5ihqdk8obe4mugo9nbjsqo16prbl6rfwzefmqlnscoyfk5k',
                channelName: 'gux2do7gfj9zmpkjggp1ht760u8mxeyewsylkootqkobmjkf4k84xds0cgimp7t2bpjh6149y2mtfa0lifbmv94gbkhslfptnhtb7xtehgzi9gz2tja7mdrpgspre0rb7wrxnnck4imad3tmgoemgjf3nj9nwpp7',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'r3peadkh7anew1qi1xcp2jds69bx5gj7yr7bnvtqnqo1eo6byoi76wrn6y10pu4du0h8zdtma56dn7p3obdjb4194xdcludywsfgs93h5gijoh9qjafv3nemzf4ofj0qgwo6s3f7vwmcidlfugoztcjbb60xc78d',
                flowComponent: 'foye4tcmy76fs1tvfnitbguk6jbyreumroo90sebh87mxktlbu38x5r8rmze4biyhnwnu0ap9c5hhcor06vj8wsxmdml6vdbnyqa6zxmbsiihatfavffu51qf4ibkm14y6906vw1ejdmm70sfrp2wh3qrm3agwxt',
                flowInterfaceName: 'wmjaw6ygw95mytjfk2v7qc7duz4nlg84sr5t8pcgyuk8d27rnwj73kyh6q1u3gyfiyaakx7ukt85ekkdoccmfwpf54c3pdmllpefylvhtxrehuptbm0bdqaodkzjzkl0kko2e5hxpuxevnp3doqcgn7nuyslgdme',
                flowInterfaceNamespace: 'h36bl8iktfhp9zcuiil7ynezqwdpq0niz3yf2sc15c70lrjeyu3imn86k6v626ffbgpkv65si11i0pz3ryqnhmdmj1xinn76hnngvtlj8s0rsw6165u1t8s2qguxb7jp7dtzg3rz43di18x1sgdkaxsaho5297o4',
                version: 'x1ja78p261kmeae5aa9fh',
                parameterGroup: 'dypdcui3s4xwsgvd5chi1r6w59sxnazeh3x38xfk3cjdmp90sgrd0u2jxb1kf9vm5bxz5x9gtmhiubzmw3mge1gtvp5q2j7nj4i7xb3cfhc5fqvag940dray0bezbrjtedq9prwti5q5gvlk40gjxmotrl7epwxg1nwjojqvwp1kl1oa4ciocw9tp8ugueiyx1ykwdzgedzo85f8iz0634wpb6slv182nmlbvhg26il0l6klclg9dqic8ekx0re',
                name: 'f8m5tl92qna0ewrpfsb6rhqbd29l1a88fey64jvfc9uvtq2r0f84n9qgc7071mfza05ogxwtctgbjt07xmhw1e916w3n5c33h802d7u4gyakyg79os2r4rbwt0s2ahy6ldl9c95oafmk0sa6t0egl8eyttq3ab06whnwylqro4vzo799l7ek6syzsrvteu2smt58gpvwgfs0d5ocwp6c48i89ig7u1bmg3k5we19l1yo46b403q32w4no862mxt5ixo0ot793if3cfnvaf1iwt76uek2yadcg384f2kskytrztf6y13rnywji0k5fzxh',
                parameterName: 'yjx5j5md95uvo1ja7kvhtte9lkzqpi821qhocfviw3kknnxqemmycwatcn2z03uc8pw44h5wah4d39yo2whhcuqozhbf5tvrjdmv7xs7h0d4ol6wbn56ooxseep2aj920hvs6u0dofjhjhoq6oh112j49syc4rabxjkc1bhr1l7ifpj7tbg9t4xe6zww89bfucc1q4ijy8y45gwbv8bvklbtvhkvev70uck8cyehohvl0xx5khs5n0tvqyw6m4zjy4u3g51uyrngo6v0q205l9ntymwkam6o2rsrgwq8ps785g6rzsvb0vighm46fw2r',
                parameterValue: '2vczmzngjpufkkbmseg44zb9pcsalslr9n1t676afj9tevafcuk0101kiyzejxlvajt5dw3j6oxy9hj6okjrg43fxpw1s315ttldvhlxge3ea8p0mhev5o6raz92vrs4nwqkqs85l5dlof3qw158wxa7jsrmd2fd7vgllzbn368mcx5wq7pcehh9o3p2f7i56howdmpbku7t8u3q8953hpvxanjlc7g2geeux01q6bz55ujc7p481r9rnbuyf0pccxaklhyjvx7n8xgawvv85r04ccs9jqscaore03amaksxlm0xu02rsmdssfklmhpp75r8vozauernfkyoazgsj9595tauhaddf95qsgqnaxn2tep2c5d6vu7jy3v6q8siz7h3g0xw9dogivv6zi1awbp3091ta38ymmvpic4akwbmhgr1weu458uc3g4nncbuh3xq74watbsmz3fuw37hehzqt6vr7bujvbo7k6y06qhqkk5h80jjc72v7t0cmfsheekpw59oxnnf4dysf9qoziagwvk5iw8x0qxy9hpitj8bhsn1xe30ivxydmaksb0tgcvstgticcd6vl2dpojviycu64h2h1pq52qumxpx42ykand19z9lkb2rhxxua5kg4ker5t3eo3oy2zyfnpsnbea29u7jar8ra4hm4xdsx3zbw90tvp02llrpnps8yq35f5v9prw8e13tyi8hjjec6vkpmmq3j3pxsz83upn6g7q8zswk9ynvu7th5flwjwbkqcwi1ta392wig3bxcu2gelm9a1t18hidqeyqnweqs5ka96b3m61cydi4jiunr9mnn48zqqyhyxl50hif8eenqtpwu0ws5vusus0gux1tg7f5t6x53sjgd2h0aovcz5mw5sib366yx60g6pm58gcj7lq7yjyonhlb262o3fc5gmr1ipouj19id7pbrfd2t00w167ruox79lyt67oun7wkvqbc0oqm4vkgi7sors7ikbi9it598e1ve5jlmzygehsi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'iebr8uwvaz7i36fdpkguz0ggg1lqh6l7cdegt1pjmk0u1sbn2h',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'z95inta47o34ekbfpzra',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'uh3d0p3omh5itjshtnypb4d3375pk7fr62vgdqk26waqvyi90qz3zyqhw6p1obu5qcvnaoif67aiowf3nw74crd0f7awakeunqez4ca05u0mx7e8i0n63vars8w80ixrkk82zzdzvcmrg3u02wgif6csd3pyzlv6',
                channelComponent: '648jy1wynzjlmo9iu0fyhnm7zasn704tp0fe25dzs8h697bbq756zliseucdtfex3vbaw3cy8d4jqz5o5gwnd61zgcbpy4rkb4oznn6kq3mz9a6s4zfg9bjipbj71phgujhwp6shflw7mqwytrjf324f3fc4sqeo',
                channelName: 'gynnsbiarapaxr41u1n6jbc7umehgew15f0qrj8vjja3q22ncyhmnanazm2qd6tah2f2cw92gz6x4o5pxe91d9yxuszx49efhj2n0l1xeb0rgoxr4z73vkdcops382glezj6mm5aymj1y9fm1yfya5lbzpu6k6lp',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'uult3k5fq7mby0fhk9kg1vw4gt2mkrj0y6rj9pan1dmgp3ey5bds78413vgfr84nld756hi8gmknwx9i4nv0pyatph4uf5r2qpgu833m66vkcf2gaca2hxyo0p5pbnqj59w33cfyosqszffujgyo7jam5w4amekw',
                flowComponent: 'viiho4t3v1b3biev8zobdj44668iynukkdt02kksrj0i81geg7xupv7sfanhkd7sfn8eclbeij1n4rq55z1jatf6d5353ubvekrug6nszforfwic7ewhhgot768i1mg42bbkij3tatr4l44kqvjo36rdm9vcw8f5',
                flowInterfaceName: '22y9rbkb9qdap0z3ey4g18ukqyndv6wv7gxo7kdgngbacov7vvsbso0s28f4hy7lmuiwm74361w097wlkpbokafnqxbruustwce5a8kaxx3k58zs5vu2k3sxlwynpxv696tf7aoc3qg0lkwkd5jktuu63gnvhjkj',
                flowInterfaceNamespace: 'idhblbi15htnt5dzufz86pl4030xe4i7yaofp6jk96ir09a2703g6ypyc3uk66u9j6q3ot4wgx1ot6cjhxty06n74xw8fsmwzha1bb64ldh7gi0ykx287f4izbye5w9svs0vzrjhpnj95l1jvb5n9anbkmgzq2xf',
                version: 'y36ddgtgaizkdcqzzh7c',
                parameterGroup: 'djxdyva84wlxfn5jekoppvpt10burkpzmznyisbi81jms276pxojnctb7iawexm55ss376dxfq1ch1cx2bsmatd117kxxw8no9ml5i3iz7mqkrcaqmtycbh18qtcdh874c441ivcpl0nvuq1707283lsjpeix35khyzgowqkdhm5afxfnaqxunp2mfda40wgleuk6qh68c5wb58mpt8n4grb40jt378fc6k2vu6ir5jwxzer9m1iu0n29c4jogld',
                name: 'beww90uvnn0f2rj03wl9egagg0osivuvg2wzlwzvnjcrwpltgzcma5yfi3n4hc1snlcbj3sskjhn0ev3lcqops8dnvlc9fs4tlo37hpow6xmkhph928sfyt1hjll290ir8gdjlhy2k75e6mbqoe069hacey6j0lde2e0yo2ul8mvo9m9olggs04yjqzziwua64lwh93ms9ode3mrhr5sqgrx2j25wk56thoiz9ln8jlr2myr1jp3ktlm956hnbe9iq8ewyhn7u9zlkfdfggdk69oiohgm95v24kffbkt0xh4pt32s7veee2xzzfw4fu7',
                parameterName: 'o2t3bqra70e9r6urj49xowjll3juhdvaazmvdwrbw2ncpnzcjh370x97336eq2finhwqu74hi3aoisxkmoi2jov0byf5m9lo2vq4lbg9uys02ln1wjymqweouwx89aqrisj7annng9cbc55wl9c86ul91aou2edb4aipw7y1uk5hp8owjl4xfrlfwylf2j7p9g6pzawc7xvjc9zkguy47197lrdjsuhhlfa6vununfcfuomwvwps63mzkz2rty6k5ck8tsmjqtalwcmyxrqwqs1e6nddd75ajx41wfxswomya4ixcic93a8btnim53cs',
                parameterValue: '9wjaij0vemhdz1t0zpwc8xt4ue1t0icjkcj2p2sxtirzlhmw3o9b23zoe8nlfjzci9hrdma0l75bubxpeq1akm9h2wxipclj53o88zqy3kezs4244ld59byamzv2lcncqem189q5imtgqu20zboz86qx97ek56uvpqbbus07nn9vap9napk6q8qo58qll961qpmm3el1emaxif29cksdxqsms7bisdnr6c05qh77b3pw9zvwe2ebm5obf8f13f5lbpdb0e88rqx24izjidcvnzlxotqvzxrejefe9w5oz3d4cpp192pgqf5eflmis15mdaaadquj61b22o59yvj1kdnd0wi9n2muqynscxn6b5tumta2t4lfohna9m15nhd6n3022mge6yb0yv0ey1l0kjsa9hyyl3m9opsj191fxpq2b6gpz4qehxvhfhb3f2eck8iq2ubjmj83xg87k0aodai22u52k3ci8euwpwhinjybyeuqt2107qyt3kausfqkx0bq3eh9jmr06no1tf1dtoh09vjbvzyex4gmmagc2658gqm4kw80ifa1omq6flt6fqs5bit3tlffxo2wn221z495gz2v4pewldm7v151gdjg05p1t138seywv5926rxezqfiwa72vzvmcgwymde4iha89bgajzgixoqrnr5qg3juf382lk9bnv5nj0a66stwo5fgt040qke9vog3fxnxqj7sa13g28vnbdh4a737xgwi2wvrekz3yrb2jei5w452oqfo7pve5m9v8ky6nykja5p9taq7j52clw9d3q15fw7v1zfxqtjkaz74tp1qy6ium94yit71iqfunagocpg2si0e0txzgsvts2bb7wh7cx7ayumm27p2wr9klnpk2mwiwnjzzqsrafpw71wxrh809c53o98rjy0x4m40ru9hwlgkd0jced135nuocx6srs0tmtg57n8wjj3cfe4s3a54v0wsrmnzpmmr52y4350s8sbsarrkcimer5cxglrh9gub',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'w4jffnaty5h831yqzti6w43ocqygoe3e0hmn140bml5z1xtzs6',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '6ildr5r4va21wdureo7b',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: '7y0mhahrvpf4264u3nhgrymb81e9yq2xevslt8whun3mymetcbf5cl8avayzbh57qagueq3z5nuz8ly8w6206gsjbwjk8ognytxddjktwce2kt5pxhetf8cxn1i5hcqr61f9mcgkgzqn53i98gvlm5n1955fzh7b',
                channelComponent: 'bb3yntjhgys7cjhbm73ev8vwoxyqf8o3h7wvd6txbkdky5admw4gce4t58bdlofqmb7azqpq4wbub1ebgytp1n5hj3euf672x0lmdx2g8acdvwqzea181fnift0twfb1vkwpdosb3iqs5zhfr3z6i9vomk8ax682',
                channelName: 'c63n53hnoy98sv1rp5urp14l6236agp1r5y8aonbfvhvw9m5k3edrs06y580j2i9cvq1pi25e5si6fjlg7hes15gexxhwi4q9ti7wuht7w5hzd72fvecwvk0ksze9p4o42modb1mfwh92n95ftx6yc7n8pfln2zz',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'xzcul09bhozi12updh1xisv539tt61h3n17n2kvnc4qk9huocszsmd7ft81y51jc7z4z3yfxdihzxhzg0fkcs6hdhoiu2kejeu7s6khjnlnkergsos9jzd0qpneux44beout6ojvcunn0b91mt3sz5mh8jguv9z1',
                flowComponent: '1t8oti4k4sz3vldl5gwulvbrtqqomhtnixnqcz4097td7p4xinringt544k88iez1pmkln291hl5ql3b1jg8j2hj8lo1m8vhqqvtn3dp37dc83sdfddfmy1kitugy2whf3m56kf83mymtzbuwj10qy64zxi17g4s',
                flowInterfaceName: 'fwtrq866t8d39g520shhsxpiu0pmpi7y6zqf03pp1p7e6v78xiyzs4akpnrekqg9vgrqovorrvvacd5mtggzxyx3vogmqnajpqib982oqh2h1yisleibod0wyj4vvdbl8q421ryguphp0ukld2jhdlzjywz1uo5y',
                flowInterfaceNamespace: '04p3fwvp8km773gvld7467o25kaqxaxwl3lva8m8n8pyo4ejdegoylxsdozf4ue6k796o60b7yd3pxwhcobn172mhy5mc3wetj5uyitclkhundp9v8py47g4ta717daqbajbo90o4jjpmxtkbbxdluki1btrwhbx',
                version: '0aos4m9e3w4dpc8d7gje',
                parameterGroup: '3q1vawgc76u5a84dsvxv8i32vqyl7a69x5m1h2yj4f53sjizzijoe1325dv99omni8ik4narplc8s93xc45ugtyybb39stg6ahm8e8lggn8xa3cv2zwk2chwrx86n5ewa88teijo0fi7bnn86w57e1ch2yz59n32mtv9axmwodo8lvvl7ot0bng9s79ryodxdmmipngotwsrwhe1wppip48th4yi6rk89f061c4po9vk24k0rdzbctahmv39wx7',
                name: 'ngabuubu62ooj058ilggg840pio63ipwcswx38hnc1tfiryykcbdirbckmxbgw1qy5s9kzenwqxhmpj371fsai7txhr54uokzck1q1w8kmbhx5k2pj2rvinnpfesbt4yqd605omrzz207n41aetm55boqmxjsi4ugwnndmd69meyuhglwmyywfh6fb2pic7mx685brvlxflsyewh50xjpidv7pnw0s9fysmmg4j76i55e1wdwe6znrex4vn9awsktw7xexsm8ek2tjo01fodplidx777z2727fzvh43083o3ztdar27ixo8k6r1xi5c22',
                parameterName: 'mejkd6uv7zvt8exljmlk4az7hml4tc016wnc27ivvvfm39dprsbe4jl0t2e7riletybtqyyfk3v1tol86md57aj2j2mblgshnqnsdzl1rx9wu3t40kz6n9oq06jdeev71mbcr3hf8o87n9cahq8bjrzfarq89j3jdnwb7d4u8v8k9s4vsoooizlqedgkgx5mwqjgkk7302pnlwo2ni846xmpy2uxvw13v0rhfk792odpm552vwoe1ofn2m5si1oqbef8l093b2sfxb9r4v8nctqy7nph2k1qcyb6b1en2exinlidplnjkwb6c8obozvg',
                parameterValue: 'uohyxx7ty5qn93dyp2ua3t07001w17v73kss5gqa9n7quxd2jesr9sbpg9u8i4g56ke2iw3rnkmyr2bhy5tsyxzrhb34zqhd0qb0a1oh0wmas1ksb6tobs9z4yw3geyflcse0ym5zop0d5b7xars8ny1otd8esobt7b8v6b583t32t294fsgtl0q2br0j6jno1vpp6vul374yejnq30egb53fnj512tpxg8xefl8t87c049i6dbatsi1psmgv601597dinqix3piksiejypapuhbdypeiwultkyw414nny9pciqwti1w7ku537kxkiho11egkzy2942m85mwwnrw9wot0p27maefqa0fiqtvhsn2scgqtpwolm8jaelx13to6g849c6n84c1t1mjdx75ndorcz2z44b1aywnfl232vxb3603vwr7oqvoj5opnqd6aww9b9b7t4m4hy2xvk30tjspwzoxwabu3gdnquv9ub08jqs6zg4ly3w4l2qgas1980az548lvt6sz3xl6ug3dlhb70ejf3y7conlzlwy5ymyh1f9uhq4ugd13f3fdyrevduxc4doy0ej9bo0u04081akl9x2160z1gdvwjjh9uvt52e4gth5fhc5pfkwrqmfxweyb2iflxfh7pdrro6id4p0nrerkfdyvfk2lp40rskjwugzl9ecefjhuc5zbsedam0ih84r8vho7ga01ghnn1whnvxkj15ytwmmhns41a2vw7v7oljscx6k81lw1qwoce2av860y030yep2awyrv9xabxxt3ht4cbrzrb5pycbr8r9u6osdlz612c5qbn9vi0ngmui50999jhngrd99l497firr5a4c6mwd0f21s4ti47sq6jesbmmk2q2fnj4yi36d2js3q2cax33r4691cgnbqwpjo7p1faujela5k28fyz766cj1mxf242mjv19rp3dj026v9m68pihr9arqsd9tby0mb5uym75vfjret38cj81uju31mm9x2aajzv1i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 't7h4ww039l7g6q7muol4enhy3z2er5rgp9zfdpexgstpk7ug1l',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'nsyksy3kj4x2taponcr6',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'y0tctw80xn0dno6rz5wuhy7bdkvaz74pgda49va24ipj393leb19a1zdizcfgaa03ssx4dn803myhco029buljsq5rf6basyyvxzr05we3pwtm7dv7xkp0awpz127pklgcqknko3d48y0frod40rv5428rzn7wdx',
                channelComponent: 'te8qzv0n180ascweo3om0oa2spr010nq7bphug45majxi5ibu7tavl014c4ld7pqwd1o9rhyl8jw68r8sm5mkaqij006cd8zct75i315ytmpt5otpd1mfl7sbyc2og2s81k7klv2b298v3llcvdmjd8dhbl6zrl9',
                channelName: 'm43wy9rpbbypae0rjpmog5cgougpr23hir9hvhb3qnj4tcwo8ndbl2zdteu7ocdu55mfm9x5qz9ufw0yrqz3vq70v3c05tcwtki8ljh9hq3tzuueb6kex552htrbwkcw2bbp29lxl9n6bz0ifehg52pzi6jb4rcs',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'o47v4s0a1of6q6151phut38ees1noefxt4d63v1d5j26t4l1mdbdkwab0ydqwhz3rac83jcvku0pfs146tbajoaxwbbzpov6q5k5ooal753lc9x45lo72psvmuevw8p0lic9p5mw5j2px6n7fh38eq1z1ley91kl',
                flowComponent: 'jale0vy7479t4i60d7qycmvym28uh34u7a4215w8jfps6k8bgphsxgma5nw3ui3w6jrqf86qgawepqievy2dv78ulw6azgwwz9tdxf0mnbp5lcawcrtapb0fakqw9ax1wu1p45e7idufqqnfbo01731kt8zujeaj',
                flowInterfaceName: 'qjyndw2fcbv9xecz394zyd81mhi5manu04pljywkjd1waqjgity026a2aqf82p7f4v75zm57mpv826rmi7md9qu47rdp0gjt6ll0pzobs28djrdi0v7ztadfpzry4f20uoecufe3gr0o5ymeflkam0flgci52l6f',
                flowInterfaceNamespace: 'paj5a45wi8ubaxep7zk6by6dg1yofcsmrzd0n5bm9lvvs7anewr56rh9ua50oiqzil6ex997vosspw9l7wt0xoxws1zvgd1an57b0cah9bwmvytvormnxbpwutnjzbcow8a370sqzloh0sikpir5hzhx5zyevktx',
                version: 'bex9s8rgvvi2v6hd2q2t',
                parameterGroup: 'unxl3f62o6tyn9fghek7vwilib5912rjtjwvbue76vjxiv0zslwc144xuddjelrxuwbzg5s5l2m7qa2kcjhkcky55wyxha0bber20cocl5r80xfuvn7upa7gsokwubyp1c9eebua1wqpogvpmni21r0xu02dmm52v5x0of5ivuel1bdyl7fv4s418zan5i2fgoswa3qzn6cenwseeq5vvlwi7tt0yikv70o1q61w5apurir8xk1eokgz3q4erwi',
                name: 'ed4x6cdz06j422ra5l0jcxjpt7x601jq7d064hv14kzey1kgzumwejdnm10rjzmq2tak8e7g4g1auirkd6k5d8sihodorzmjbbnqnokjqiozxnbrufun0wg40dli137z7luxec9yzs8l4f7szuibzgu4haemttu0ibawk7m8xgea7jl22xt3pas3qmc9a0gzrxm13wh3cnxg5a7wmriks3rw200luyok4z0z1d761ll9ep6ofk81efrutri0o4etzdafdyio1r55cfrvf9vf2133tkrroyhouvdcp2wy5e5v2wv4hr4nnczlm32rq3su',
                parameterName: 'b4vut1finm1wdpgpnpak5hxpy8ifjusk5c5et7qbpmiui756napazv5afkitjrpt9v14lqb0pc1k4w5420ugkedwglbgw2dcb0jh6zr4mldbx71jqgihjoaa96b7yix6heyjh2q9rxltzdc3ajdcrvd438hrex2q34btogllr7srjgo8kvj8mrbgyzsdk4xyualaw2lb9osfk6enmck8unmaq3ydr80zmeckv6ukdk6z1o93a8wcot0zqw4f10uillx916aqeg5rtin3dn5lh752yjwmtlf7vi5mgalghy2oe5o1n37s6349fyw631ml4',
                parameterValue: 'zdbu25v3rg3m6lr2enxcygjd2t7rcroc52qhjugwkls4fceet0wz1d38lqnrtoy3dqaaev79ffjp4ugn9cs3yotueq5gsbejcnyh9kzntl9wpwkvwvjmjkstm8b3u3k1d0d9hicsbth6b8b5x3b9wqzu8wksmsomk50ka0bl6c9jygtzn11xji9rebgyu4dh3gz4ymabnzwcb84jk5pj9wz9z1cijhbzy6qu7ychrffafiowr22fg5w6u773vcmj2mqvth794rqcfq13zfav4v1sgmqhey0aqitea8of93rkiy0ytolj56otzxxk8f38atek5rcjy6rismmgsuam6btoenvds8gbjqn4w0jw1zs49h6k4ekwmttroqgk3voeg2304n851350m37iss1e6a1p6b6stzv3dm2do7s7zza48nivlnip327uku0e53cj7chfye0b7b8k6cumonly3sanoxf54bcp49xc7ldxtdsb9krfg55fxcgj5ttii21sfgdczcevpx51ffj83x3xyt9919oob6wtyeqheffo52uvlsnuj4du667uzug1tvm3a49pvboji0q6unz7jqd99kkek5c9jxgdxh6jx7eoqmz8955qclvljct8h59qigvf6v7z08niuyxwrva753kvltiyiubikitfoxfw1aj577b488lyvo1s9jyarnkr28mfymd5p56uhv0u4vt8f43wapbowmc60f1ea85z3gw4hk40zsoqttp2ut3ig2gjhd67hmux3l5y70ugc2zamidyjfbahrfgna8dqknv7943d04d9tswy67yf2jnlfhwxlvzjondypfbm0ebxgk2afhaee6vdyp0wetgct1m50jp8ydnoz0k93ad0ocu4eargrmkdj2hzsynh2lwe0q5o60q9fustscvfvyor8q7k95c1mvpalof9b1dghfnq658gd03hc7uvw1dqepvrkouhydcr1tacqzkowd08abftqr8jd5qa8hgcanz2ybxb8i4q2p8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'qaqntbgzvph1wx15iij9u3hba3vsyfvk8xnccdxeopxw2s04o2',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '8hfni8dbvsv6ol1acaye',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'tdmspksqo9l20cxdc71lghcymji26s2lk2vh7za0bkvoyr8hi2h81cv979lym1vzeubcc5qd7bbh6sfc7ao32yfljcpnco4dsfs6by52incznwk5j4c1z1ez2gbfeiuqbbpzyslws29kaq9o2kdn8uw5dlgfpau1',
                channelComponent: 'bkewcqsb0x8vwc1gc9264lvg8en3vsrr6b3ss4iiivsoaar13wf1ho2ksew5htudqqeqg255d015yojdvrxoocvklg2lz7y59aza4ld3y5o3so69p9m88nso4zhow4izhix4jdtvq80lym0v9mp9q5ealwq5amef',
                channelName: '50hn9ref4lmc3fcl2yah21eqcwq860wcidhveuo03317wa7afxymsi8r2mpjav0225grttkvgz1oarw38msx1royud6eexdojp6w4rlxwc5krc0h96anzhd9c32h6lmxgh6m1kdi4o8bx6rdozjqq619vdd5twjn',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'yxtvulfnbj3vgqoaqvhyhf1bevpytyqwb9n1vm443o7w3l7q7q0dk1hstpnexp9x8avpvfhgks7u37t4hsrifq0gqyvoqijt6vds21ht5i37k2rc5hdr5yfep1o3dw868ljndzesb51cdyh6y9k9b8j4py02x7ht',
                flowComponent: '66ayli5ffet43hpj8alus4uy5t9dojre7tqo308hvdt1gl4euh1s6o3shvom6j8dfsq90t16cmb0odb8bknpr13xoov66w0niy7qy7fm8uzw4c58q77a8dcm6nszvs7co65yzc9zqth5q89wmdjk5qotc9dd3s7l',
                flowInterfaceName: '2ly06vmc7idkzjrsgrfdc5i43vlm8ybub9hwn8xe64v1bxup8lokm0i5tfia9pgrhb57rqd6p4eq0pm05c1cyux2rz0jx0hwvvydjo6rvrljd4bxect9roniptyh6n3gbu8b32oishh9h1ithfqkr4zc2ytehwxe',
                flowInterfaceNamespace: '0s86ncf2bab50q1m2fu6mmqvyyttuw2go4yz24yw8g6uf0z95w1i4vaxk9s106t5m6kwnwu2ona1799tdjm8j3tdibuyygzz0pphe9b8v4h0o4csqonpow5g6ra8r8wdafymua9kmwhpvab0eufdwhyl4mf4u8x7',
                version: 'z1oxwfhkw5vx96yr8co2',
                parameterGroup: 'qaibz68bsainfmynhq8dr554o0svlusnzcqac7mqqyigiwhe6c3s3rhb7f2n1z56784ltd0e1itmiq74nizk7z7uyrdmrpq7auegplpfvbcntg1fc5ru5nd5y8keqxs8fout9kr9ety2n6s97j1pr2fv15eyqo1iwqgn4tw2or3u3o42apvf3q9uf6mka5rc3uwxe5aq7d1mff561unqerr5jzv9euygoonztohvweojbp8xe0gy8n1bbzexw06',
                name: '322lt6ccnzhdis026d6k8aw09kqelt0tncaxknpv0koo1x7cdtw7zct8b4u53oy02oc8iiyisq85p3fpnpy38ayh009z7g6nyub3f7snwblwhrnm2t2atr56663btxyzjsnx2nqpq21j2yary2t86n2j6cwkdu52ejikpqdiftm1crpiludoeto6yaikpjub63qkgif7tv72ma7skabd2bzuxww8wn2xo13q9ed40d9uhaf28teiuoakzxx6tm5ob7kapn0w3jsnk4x7p321pk8bo7xqsuoud5w55ukvz4o2bzwgbsbkah55ejg9cigc',
                parameterName: 'bx0r5gjirnsb0hib6r4px08ef3g0l282c0477pzj8qldlbv8s4t6tfanlwritdluwtmtj1a3yxns5aynz83zhl2wrp85upguf7vdznpeoh3inlo38axbcqnxmme1k3vba0g76x3z3ojhr5cnv7asdszm4x6hdx7t0z6sbr3vhqjvqg3qx5xek5p577k7ix5kbbfjr8suhcgyzcqtk5ds8fozrcpgu6r8j4ran6kh75y745zmtr795wgoh01ihui9lsxqqe89o9qgji8yinvx9xj3bx8x3gj8t9awug6vf1khjspamhpuh5lx8xcq2vsq',
                parameterValue: 'cvrvdsdo9jr9hnuuqy4xedzomojtoo63u3yynbka6fa11kxlrwl71figajhzz3ynl2b6gf8hjby3t4arhufrmv4dgks8wnq2usmh86d75d5cnw08vdgjoegcmr8z2rkxxzjze1jn3wc9gchxfa3jyej59ghas077mxhh9xxzmjhohmbg4sfxkt7dpwz4trba9iridchtv0sgr5p1vxr1tvbwgsz690v9sygoj7p82m2jm7a65lmag1q6cyeelngi39tehm02urjj5ho8vzjiy1mpvlwhams0pi8127m3yymvsjctrivz2nr2pfwlyw92qzt375e3gnfd5a8ljoit7zme62ezft1ydcewok37wybfvr88dw7mppxeuubp8ehauxi8riwfriidigaob6gyuq6efi7z2qym08v5y34uus2cbhk319i9yrq0v5efz29p3gsgv8nrnaoo3xxy4yaaw8pbbvmf9iqv07jktmrddejugowvmhytd7r7w6rfq5oq9lk55i9xkjq5dmjqwrbtgqb9mjwbqvtjfgh04kayvbagrc2pxam6o6uoowin5cuk7cws3kt91osde5pvg0aj3ckatnrau1uynqaxk073tzsj4byzjxpnctg46n14nhemtcg0jwv82cq7ajnmys7f9nxqs2f6vi4e6r4qylx6dea8s6aznawkgt0ixxp5ob7vbb88u8hzru5pvkrbltdkvqfmwn74i1vl1iqh6b6jcvdjfqxyg4agxw7dgrhsjsfwwqmykthndynj6mcyj146gls4ia30li76kwjfzh0ej8ctzjxtq8xq4nwsnba1ej026vwep1zc8lcp6nizpjgnfyt867kicce19u7421wpnnelmmdpwui5p6j773t5qdb3ntv3docy6fzd5lmebn36psqynkepjdo9lkg454veoj4werugtg6n1utqyokggpcdk0gj2wzpp7fd8s1p02trdzf097ic4rrmh0meio7m78d29m01k05itiic8qx8crhd8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'ad3gzkbvcj7qh4fet0cw5x2ua7bv51tvkf4oet8dvsws8991l2',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: 'wx17itvhz2ay2i6i112s',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'y6fyr4q4xx338v97k3ofoqh2gtmbhmzt3k4ak6hqo5bqim9faqzu9o5kthhm8vuvnbtq00uyhj3ryehca5fp93o0nwqoce5pw558bo4pcx9c2lpx0ol4a0m0dtc2wqp5l2k6tqkpefndn1z2byc6jcvxm41vwaav',
                channelComponent: 'h2vpu8nbcis311cr9tdv4n3ngpgi03963csakwb9wbfn6uxexhcvd5ei3h1ljdf1ri4k8bzdqr00cf0qipa5c8wtklkypw2md011lgx5v64u0a0wx9fi0fgbyvsari8rfdk555ot9zt4meigfffshq8zulznxn8v',
                channelName: '7jnrx57kx2ptng0qhvkjb3muepxxmb9edaj5lid8aoq9flwqep7hw7ladg34q5y7vqox7wsrczr33368pzq7v1ri39l2taol6ckof8uivntpmsqg652i175btpj7r9h8a2dj8x5646uyjhkbsjhz9u14n5hsf02l',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: 'hdsoa1nmnpbddsfvz6anoloizmx5v2shuqwn71d20gat8hq0kom8zkqpl7easy2qln92nxf09izpux9t2jv5p33uzttz1f2gt17ppg0h1abzxh9whoamqanoq5qjo8fxrkllrr2cmr45vmdmsx3nb9u0afdpb3mo',
                flowComponent: 'b0y9tkc579ucecw1js28n0t7szmc5igzuod03hsj9o6f3kus3ihlp6rvk6jz689p5sdbiqa4mempwwwz35d0seqee316d54sic020f5n7pffz3n8967zc9vsvwre9siahesc226zixl2arcg186pt6o2fwsj88yj',
                flowInterfaceName: 'dk822tiww6wrm6slz0z5clyqnuoi20791we41li9dafz9t3s0t55znkuwx4l53ylaymld8e18m9hadfq1hvrwy87lsctfc3i11194kujqb3agd91c94j13q9ev6anq43a39k1t4ti60tbrhyes8imbljv7vg5xx7',
                flowInterfaceNamespace: 'u3r0eu067ix56h3gpm31bx316lacegpuqj9zb2lf3isjuiia6ifnj3mvlm1ax87abkufyt6wj1h8mifibvtmcc3mc85la2tvzzye9sko8r096id3cksed1i01z8e9umswjdsfr47jfgvqc3xoyyx0kyegaal8ame',
                version: 'ig5wmyki29i7jt37e9r8',
                parameterGroup: '3dq47t3qexsj47o07c88ijuookgpwznvvdrlrv921kfxmjapujys6iqfis1t2xic2xx7icrf5xr4i63ofa5nkwuzcql6zmxkn4gtexgu7vvtp5jwxnu5a6j712wu1hduys7wwu3d37b73pdamjvzknuzer9ec7c0dgbfaz567wx50acrbyzv19aufpukgsx6q3a1hw2pxuf7ckz8sq1i1gh3l09snzz37boqir67stk8gme03ejbd9fkt1fauva',
                name: '5dkqdudhr6b30bun4q6thq7y1bvadnw1blf8vfg8eahgpr5ouymx8alitqfm7dg1k7ajiwmm2vhgxb8zxlmpx328m55qa2ar753kohq5j7dmfttozodjkz1kazepjvd9kj1ua6t1rwd0phxmqt0r39equeakkceq03zz7fa61oocgny5gae5flkvvxu7mhesixn76dgj7d51wczm8temyb4map2qqiy466yuyf40mtoxjgwhi6waw1vascab1rh5c2b6iigcwbj2sd1ze7hfs2ha5s348ogjsxqp3v7xogqzphih7ijbne3skxsayp8f',
                parameterName: 'u28bk3seq4ukxnesf4opjprhd209k8ffoo9ravgs9sb012c1cv783zvwy5ampn8cwpjpkmibnl6oishcfvrvw8zuj4dhudthzgsxdm134zvwqre4b2wdv4ekhbjllb28a6045bm1m5u32f5v06p2ucqkrzbwjm00k7kurdprwpwvpuum1cfl0ndu04ksooljsseg4b2byor8x6yxq1aqmsp9ttjb1ogf9s4x7lzjd4m824u81grmuqeyd7w69p2nlubhc78i8p7gl37cbxl3rhqldbo04rx3d39354q6ad581e7g10r4uxfyafvyjaa0',
                parameterValue: 'irsq7r725vrqaojylnwqxdm1clo4bjw37j7ppxknfpsntsogfyeyrae5xo4oyir3chco6sqj6hgrqaencn311wvaxkqnbsk2ler18w2opy65pdkqjn4zpkuni1pe76c6ve7jbrpkoelohnmqyifck8bfdyxnd7zfqc3bf9kmjrzltoedrdkpqbgwxh24jrswnptql7q1yqrx6udhnhk4ezqvzufh4lyccbsorq04izsckj9f05w3usq7nwtm2sk91uh15ek2br5gi0a4m1jeeqf667eyww8tiffzagp2etwkya5jd1xfb99i7snzm4yfo00f6en3kmrv6wdjlnaan8rq7bzvts0lquk0r8lcmj2frdg50fun2iqrv1fzw7ncrjy0h0jx6xiktukpucdrg1jaevsnwtiipwkj5o9cc2niz5oi1ru4cgrmb5y6ive81r7w23b2v7yxm85jpofl0qjs5q11m2x2neg7b87eizxeqz4p4y6qs2pi07xm1fex3tdvioaocty1wbir3jrcfodvstbwix1surpx6i61io3j0uzzisxg7fkopmehyd2qklkk46k6j3o0a2n4vchbjx8g52o0uxoa2zatktroex1sdg4thkskfrmv9lax70mlxl5b2r60fzfye1r43bji53uyrhqmqyugheyvowdluci0qesltj1m92uq1cckbxxua2c353owr29d05iq3742p03zne6cs0czht31li55gqdofqmk8ik1x6urj8brfpgfg3badq28r3x6zf1nhu2c7pxuzfrxl4zzsy2951aiho1pv7zcyxknadpl6f01glfh37b5yskz45kz6hh3s2ioapdn21phucby4elis8aacwr12lroijuc8tn5gljgnarqwhb7xf7hbhjrstos6q6g0ylv9f7rgkc6ufsr10jvfl82dyq03etuw4wpknn2ssgb3qbvlkswwr7caf1cvaasvfa9ucdygus5kd1bl3163y0bcs7uok4dk92sw4trb81d',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '0f0c8917-9670-40b1-b73c-383996440f12'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'd83d0bd5-aac3-426e-8876-3a39768a8458'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd83d0bd5-aac3-426e-8876-3a39768a8458'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/7203239a-fed4-44c4-8fc4-5945a824a1ce')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/d83d0bd5-aac3-426e-8876-3a39768a8458')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd83d0bd5-aac3-426e-8876-3a39768a8458'));
    });

    test(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '0cc57b06-9c02-4d9d-b9ef-0271c9b64b93',
                tenantId: '211f5ba3-391a-4dcc-9ad5-a9ca170c1219',
                tenantCode: '09h191zd6fh837f7ih3ac33tkh7fox58wll2wjf29hex9weemn',
                systemId: '4d6935ae-0cb2-4f2d-8dcb-26fe9a224e36',
                systemName: 'kxrwzk2qrddg6sgp9hq2',
                channelId: '0a958216-2baa-4362-8844-fe160eb7f3bf',
                channelParty: 'kkybodta135h9cod5xdivf2f9hxeomv1w9vhukc6sdo52hjwi3ir5ii46hllugnxt051yxg841qzcggwfdq24mjkt3oiecahj4r6l2fo0npa9ihx1f67ldhezf1mplttg82f85vw8rqjzy0ittcgbcf89cvn6l4s',
                channelComponent: '3qqys9pp860ksrggdjeip3l2m557g43gmylsc8vi9g7qsiwu5d0abrzwzeb20m0dkl98gfdex4d46pl0dgsw4wvv2nhy7d5fd9awye23r8m9w6c02hl35l62k8dyi35l0dcbq1eonvgfd7t72m7vwmecw9ey2j6t',
                channelName: 'gwz7lwmghsxp3amuzlqpbxswmxz515wzjgdh2c6jnnv9m0tztchkzbte6g8w9tuo6cu37xfsahgds3xaftars0kfbyigjvb0fn6igovn5ikzhdral1e4zlt6ca9ny5mysi0y4bmep6p8sl6pa8my6rct856n3g36',
                flowId: 'bc6cc9e2-8b72-4719-85af-880b0afa27b9',
                flowParty: 'uw8xqccja8z3gzxsrb7wkqcu028ld19tu3mhaljsovg0cfiao5rz28jyhyfmji1rn2dxk1w01ejawgjz8ana4rb9xy60acmhxvjwsd78ukpo3svl0qa5olvle59uqyhad4ryt2xugy5nwdr70fzpubckw2096v05',
                flowComponent: '3yhhxxy5mlxv2259oi4ephn3w0bzgnd2z0l69l68mmjy20fimiyht6rco6ihxt7ly5jrgme4ro504axztojbquj83q0bsgmhpax9x0swgahjuz7q867r7bvmxr4qmjonalbqsluhyc7bjj7e719es2ztracheveg',
                flowInterfaceName: 'm8rinmzozwoq2bt2wllcjt59dqsesvf103oyz1hrsdi9w5ni7z8efqpxap36bhvgojv1btzo15qsz1cwnov8euejsig46t3ilkm3qxd7pvgdgnxxjpic4171hjlwro0uqbn5vc58j2hpy4smp39yy0313uh69c1t',
                flowInterfaceNamespace: 'bq1pu1iw55ybp7rd86o1i8n0t6843oejn3jtq1y1ohlyzgp4wuu60lbt1d0fxo8ac1ys41n0w56jnx03de4eze7939h7xb3e5nruhyvj5f0y2vt4wjg95gn1ohhp9gfhp0ymxnyis3vk9mjyj3t2c1js7yn4wzdz',
                version: 'lme3pkxx7o6e791at85a',
                parameterGroup: 'ob2e0sur7r82tiyy44kthmife4j5tvoryobw39hgbvjb0kcitc5fx551e6q46aqldk98ijz09zt6cjqerkhuyjv44iprsrgbm7q1u83v3x6og6ye11sp42pv5892ws4k8bauekq59ms1pa2nt5lu4odiu6g35ifz48b3t3yg1oa0mts8h9u9b1efmnxcii2ubr95i1ti7vgiigwmbczfgs2gy96f6plzajisjj1cboo39wld8vxmbf8luz64o3g',
                name: 'kvf7pld0lf35aont3fyj2ql6oa2tiuhe8dqy2v24wy26lc2hvu381ih7ob0nk640179f78iu5kpvcpynkjn0223wdhi0cvjukh3tat70ziip9uazwxu6jg9ern3wn84c5fgvm5jxnrfbu15sw0hvrny7rwm1nnn90x16namsa00lsdj3ksj13bj1xsyohj01cbhhw2ut6vbgufob1pxjxuc6vqcay0pot4bahrjixcretudh7r5xfzkzdrdd3wztr04v9kxhizrrsea371qrtf2iljjkpjxp02lh0chvitqhtfrkv8ew8ffy346j35pl',
                parameterName: 'lxnki4phq17z66l8xn96ur428tergmkcpsu66vk5jnd9jbiycjvx16tk6pz34tkxpezxegcp9jombget0q7w519e059nc9u2kowiw73tottknur2vuv9a4b1rnb2h2wxj6bztypqiljvkhv9yt63ih90aavubvae03an8ij0fztbpocfkpsypeu2h0tyh4c2xmg3hi14tuigb2f5iz6414mthg5f953cr0qt4mmzvvr24sv0bhz5ukmy4iqcorxysfrxt4ned51hz9w1ek13jvi6176el0z4yj0r94qb8u8okd2q82dnk36whayjd8tn',
                parameterValue: 'zhjq8q8fz4biufgxq4f9w20pwvshyrt2gfhfc4l7ng6wvmzqs71qqqj8d8ic0eobjshpsr36olrvb49ufy8w1j5hhqnbc7eroa1j0suod069fa77kcqzn3ut6lwn13i98ouzuhxqb2oasi5z2hctjiil4e44x5pderxgniy0lwco0uacfkmnp3fstfgqv57sbjgiov1wx47igxri7wka6hknqrrcr94nqg449pt6bz4risg7yhqi6sqh74wh2lgs4aghhbdgeeyjj836iqm6ht7450kniec9mx4yax4wzdtcq9g82dr30rdntfbdadx0k1obah1uv54re1lil4q1kyorbj4kuorjhg6fn6mrvzoprqu7rf38q8alnuo4oyy2v4wzruqy3ipyk94rn64kkiznhrhm78hjjd5ait1vcft1fqgdb4czwa4whclpm7w32s68ztf18ngv8pnp4znt2b8xoten4bqlxvfbomfqn2wjk2tz1t4cuko1ybiupt5mgvkgha89znnq67r0gw655flhnpfxwaqniegou3n5sai2fpr2mft31hrjb3h393a6rqppsed4wjv5swi4a92vz5amkf2b7sic7vst18qgy8qbof6x744chhlw8dhh2j0anxjx3p2q1zxbx9vq4c4o1y6scip2m75ik4odw8of2ksqu7ydn3646ksmp9c4rcg3rflgifczswviu15kcfqra3givmje7jc5ia8n29is9zqa6qhc2pyjfo5ugcmdr9rh59cva8evlobvq7oipql2axdqsyamjfsomz65n844g5at5zn828my570p485safjy18yskckr0k5ih57xfvqe97hll9t8qr123c1dihsvym4ezxzs9stokzxyzcjjcrgmck5z8zth6cnp4xv4ndsregw3drexlx212wymyw08x47w2u4w944qebk1eadvwi1g3a0p948fwmqtf7ioede6byvqpg3tephjfmvv435awtts0aj9awj4r3kcjl0hxjam',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                tenantCode: 'acyha3n1d3apwj61tpjh4v6nruwi4bgkfykpt1uaz4dhmh152t',
                systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                systemName: '2z2hvwsl8a2d7zxvccs7',
                channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                channelParty: 'b5d1tq76f3ygkvln5hlsso0csz8vsanrb19r0i17et3xt1ckd5e4sj6yql72epnvg062yc865vjq87nt5ges6b7hvfs17m0a8mlog0krr23ge3zp4et6m886nbha8fredu3cc5mju3ihlharible35hcdoumwawf',
                channelComponent: '2sglo5yp34pi8cz978rnhwjnqi0fta5l9ajg2elmio9weqzfou2d5pgz4gq7flhm5fv5pr16v3aubxgkklll3izl8yyjcvjewdv2vpu5dmarceob662ncthr5qput2v1xklq6x116frc2oqsx7eg92fb4d0pgt33',
                channelName: 'cj4ws3ora08ex84cd6nq2ovvav1pk335ug0d0ca8q77mtqtjqhmwzp2934vjrzz7s722yska7j9ss8a91i8i4zwcvszxtm91abg084sjger6u11rcg45udcw86m2dgkksb1h1l03eltx8ho6rs7cddu3ixgeumyc',
                flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                flowParty: '16tgwb69tqhdoxnv7j20sqqtp1id1ygc1r5tvh34600vlh4gk049q11pm1s43u34p8in9vgw9o19zp20kofcrzmsq0926uakv02wh3nzvmdw157dv3e79c2b6cks4nqnqhlx1s46ey66cf91ot3w7qjda8nbiqpq',
                flowComponent: 'cx07zivuwuiod24jtn5svddjvngpx2lypwf7gpus003nxgjq02pcdwj1rx1joko92yv17lca0ab9yabi6wxvp0lipoym51vd3q331jsqsp537s7op5g88ymgi45dgu8s4pg1exsqvt0pjfrpu5m3bv9kyx2fanr3',
                flowInterfaceName: 'j9io3njpnbeqvv0xl2dwp67fu0r5kvrqyqw949u4ztsikr3r3f23uulbppumvjh7bq6tgryoblc1g6ujgp9aazj1rvmjiprq49uq9wdq9anmqs9av372k93foaqnkg0m9ah6purjtvgov8m0hgx31vv11sstjqfd',
                flowInterfaceNamespace: '6zs6wldw8hc7xjnv5a3wig2zxorsh0mvc3kureluoqo55rae6xqbp06b51trnx4c6icgletqlfy40bb6q6l6mm04dyzyvo4b4g1v4h2evp0lcsxnr2nly1u3oyx6jvyoi5pnuo2zuaoxowi4bdgq4f1thdkxxx73',
                version: 'xna676qax471w0oah112',
                parameterGroup: '9jh3ay9l7l1vllkwqq2lg5qezuvqsya6qb9qodar5s0udz6s2xd016vlzh6val61ba08ci2bhfymrlxtixg9lb94n25q6u7s81ecdjob9oy4ijllifcsivc88p2ksfrjo37efjojo94huv9r4b16ksf5ggpg0bzs7vqo865i6cdowpg483tqcu9gkeh76scwsois9cp8s6rjgpynym0djwsdzku94pjtrrizv5jtkanlqb8pzbjb0wr6uwhimm8',
                name: 'yovhd08rbbu55yf03ascvow0ifto1udaesxctfnat2v77psx861xqfkdk7rbhquoq9crzr7v1hz47bow95vfm12o5o8ihu8mf97jj4pwjw55czq272b9k9nggede25pndhq40i4p6ur1rl6gc2qdo3gwra3wl0ktg7ecqpuk1cm881ti6g1rh36hzs6ld5ysypg2tc2v6vqi50vj0i5gwxk74yhbxtq39wmgf4zjemlphwexzevcwvazm1c6yu377izmf2o8zd0l9zyjugdqco3cj0wr872iwzak6s4uf743rxoaxqtz1qnce1q9qixt',
                parameterName: '9krjn3p8wrvu14azd6lku7vioqwn6788zb43ku93ycft0vusc6vd117okvzuavgauyi1a73chx6ws0wk739a0o95691kd0iby6eg38umdz1hdop7pxc8rmppymlcq1ur9w6sccxl4cd7eep6hdluzswmywi3phnavtb0naf1l37rmkoj05cwnmt8guqcxlegihukgev5d22pnmaqad2to7zkbyq73gooawltqkqjiq61bgwfxus49oetjjfdt0mck0ryq3drc49uo4gr3q93tw44mjdxu4lb4eb53xm851zgkz4hfx596fwkxvhjfoh4',
                parameterValue: 'q6q6gen1i8c8jtkgb6nwu5riz21q2n2hbi8yr5rmdr7dvmw3ugqp4wevcgmqcysp9twt66dw601k0quhtre0dsbzmsnprsbdxhstyq681npsvcxg7usdvqjz87igxsqhshwr4tk89x2hy32zc9rebhoxfas0pd70t0y2j31vhnm8bg5ty44yg15lrh3zf3841vxv0ftlijppux00ok29hkysc77uho4gn53jaumwizzpkwg36vt2vlrkrixu6qxtix8a6flfpbp1jxgrvvskrnsgfxau7pr8h86130dfv4384hclcpbpochhmm5e5qb7ne31i0lf3s2po43by17mtujmwlg65kxhqi1yinr35l3v0hlrn6zwfywg6jkts93y2w9hw7akltszvh98xghk3faz5pr4m6z959u0q17jatq04jz56ij3574bovvm9uyiz5lrjnvx9h38yjahsz7urair4l658ossotkfotqlqptzowjb49949y3nrnp7k6qpa3ams56s7vyxpqdtp1q1zqnmggwd8ue7kqeah1ygqfddj8q5bt415jkevlihb8gp483p0iocj7t76jz3o6w9j5pmb6hga7ir680nhfld2y4m72w5a69rc2cmh9zyssvtkhkzs86ibht9orl7p704v7qavbsqffchbd1mr0sjofmsnqp5on8a2auyjo5terig6gj9fj72lwa6ghuwn9qh0dmq39ubn2c1ls0o9c9x92snqccw2gmvc6eup95vjgpppe5ahss3tu5tqx96ffspc8zghwe4yla0hkc3kfbzl46wg4goee5w0mz1x046gtixztj8c4opt7hz87drpijofzuezxp5cyodp0s0crtroaoa6bcf24e32uqqcy2z3jvwf1prg34jg27ixccg40y9zytzo88l1mjwvqj87u972rn1qtalqhdmxhuw4hffzi97176euzb3acvug3gsf3c3ia1zaox1frtrjsmz01lcsq68kuzo3ez5vo1ghmr5ipv3',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd83d0bd5-aac3-426e-8876-3a39768a8458'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/92ac3e00-a678-4c1c-a1d0-01c1c461f5fe')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/d83d0bd5-aac3-426e-8876-3a39768a8458')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    test(`/GraphQL bplusItSappiCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0dad7803-e0ac-4c72-abe9-5446286b8943',
                        tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                        tenantCode: 'zm28diaklf689tlvbcgfz7c3hldg9ghy8y7t2jhrwdeb02jexh',
                        systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                        systemName: 'ucmpr5hp25qfo8pltrbt',
                        channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                        channelParty: 'i5bz1udx8oeye4abqam6vwtyco2n14vmabg7k0f8m5srqnfwjaep5wb0f1547y95fc7bp1xrn9sflsmteeq4svhuq5pfwg85zgjsuigk05c452stvecdw2pvocwumn08dhxj1ibds77hpumc69eye2wseduna2d4',
                        channelComponent: '6qvgt06bu1yr21sz731e874xduy2ez1bxued5px51cnanca9dkm91iz5ueq6078a940jj83kx7fe2xv63pns1ulm332uthom65cbihqrsf3vkhdbr1xiduxuott42t0vs31qxv6gxjldmqrero42wlhlf9n6gml4',
                        channelName: 'i48t7r98u12iy5wdifs02mhh5rnj5bhr9jsaxtpsdoxwm93q0pmlywo23okze7p0jnneo420s479a358vc3k8z885evzwrb60o9jszh29h92ubv5klbezh3ykl95r3uzs9jckirn055l995c5zhca4u1rxa51y37',
                        flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                        flowParty: 'bjzs2my2mqsyj551p2u0edni6ty2osjvaqgk6rmx3wiyjc3x184yqqv41tstcu4v4j3kc89yyv5ch94o1k5gsivbip4e01dkqpc4blmf58ai4q845tsqgpfqmcmg39t0om71v0u2x8ybdqubcsgacnr6vmd42kwb',
                        flowComponent: 'hvsasgz5kldw4kqrllyt1j8tqb0i9fbyi0xwvepeaq028l3bbk5cw4lxidu4gfwmkn7rya5xk4a5ovyi0ha7co9sh3uybsjx5gt8scwopkyv8ma2a4tp67juqxami75nph179b5dukpptgjbd7c9rlyri40uvrhr',
                        flowInterfaceName: '96ah4vj2a3781b5yvkgy4rc1evnlmctkgy5bw3o6qlwu6wcp6opu7owystz7kwn7g4vpkn6k4pedl65bdoa4wlkhrb4zw3l8s6eciddku4kahhybw6velv79er1c0lafwy4xz7qsiujez75285qlim4lo78vjc4e',
                        flowInterfaceNamespace: 'poohea8gm3zqie0s69ec47ak3mk3qunfldjlnrk8u9m75z4e1779vgitt0xyz9m7o72oprpn5ymy3mcdf02q627v7v9azv70ncpgc4y40ccwookqrd0hcu71xf4otdwdunpebr1fyzzdepql4t5pq9paacamelwp',
                        version: 'lxyhierojkd69d8pcanz',
                        parameterGroup: 'er8sop253mmwnii7e7izbev8atkak5pjzl3uydsl1wbu91r6osolhpzcaoyhvk9vkwfsjnce7n36r41drhdzchswbpqib5nlej139egiur6txld7xgae7ia9kwxmg4p6iz3afv2du0o34k1rcx5pvvdjbur0erhdzqnuo4zz4ke1k8c3lxdtkqvcoiz67zz979dct9pwaayg07rm7w4mit59677fij2m2wa04xdvt28p5vnt4gxh02wlk8r1999',
                        name: 'pbc7qiqlyaquju20ywa76wpaqjhe64tyx4dwfsp6pftc4006w43x680ms5c89qvd3ac5tivbjwt7q8p4aw7t6sjhb3rw2bupln6eevkcl6t7ycvt408t91mw48im5ekqh6stf0ifkp1jna7tbx6sbc5nnj7wlyqj8bz6wvn4l6bc767h6to99ma5edb8nyabg4lmjo9etunom9nq3g6h5nvdy3fuh0scplum414n8f5d7xr9pudwxypp33qkztquu0ei6xfnz9we07cbw7yvlxij11hprehc0u90byim89utnzag3e2qgl3p0pynscah',
                        parameterName: 'smvwcvhgbhqce0v6hhz0kf12mk090vz768g6mjjoop7x0xn67vtazltweiows0c1vwwpudrwk5jljk0fhna5f03wjwjx0z5nb0zj2iru1jzn6hf9s0mcawn2uwu873m1mojjhitz44z5rvptnokkg6gds69391vtpiia4kwakf0mjlyiwnkrr3xcz3d6uxd8ag9e5euk0gbk2zfgbo84j0mjvj0jr9qbmd6vjnb493tmc6br1url9zscv6tujiycd20cbmrkeuunq1mgfjceyrnnrecdar6qzqwpsz0s4dc9gwd265vcp5939ppa29qs',
                        parameterValue: 'clr3nnpqdy6gxu9eez5negemyktky6kt75kwltefjonglq4fl26ibhg5ee9gnjnpsag5k9xiftx7r25u9xrt134wfsbpq0v36zjsvu40sa37fqkaau2rxtfxym2p9m5r7dfhzbmnze2ifx3dqag7vsheleubkpgvfvjxx9ogmxqq2txxeamfsi62qp6axevcwzfwi47bu611nwkhjzr9uqk0bdgv7smuzvbrdlrb47fnexlo5tq8093sskp70z788035bz7ezbie0ucsujiva0pu49kr7l6ncrn2mwcbmhc5hqq1jugkhdsod6pqxyzigrevek7rfwinzmrw4d1qezvro371k40fhjc2h1rgz2wcf89oadmgdeddkmlembo7g2wxa5nsek8xog9m1xxw0h14ewo5dbmb8i0oasec69k18unldapk7rvdzlqx4avuey8qaeux0lwmz7qb5luw32lgpv50y9wgel8kzdxflmgz0zhxbn8b3gowmu1plpc6l1lhpye0qx5mz6n3qwv25ehipqaa89sccqmns42bpqp3a6bcsez9wiz8v9rqm4mfyc8ncnxqhcernhvr6yija04taw97li88v4qq2mr12cdh3bx9sjc5snytienncxqf7t2uawonrf3htjdndn3cnluuie0hw821y9le8tk842t3j37fudkfa974hdod97yjurh30qndv02mh4xbwpur6lx22blmr0e4ttxiwqw17b9pe3y2zos6vgisq9d569xnurutm5w3rfhns11rsaraz56srk0l9myvqy8jsppiffhfx65nofbe959vz7ljzfxhcnr125a3d4ffvys2adeu5id7lqa80ga509t60ptzlkhaujnbljizd2pyxmicvjiwowmmkdefgli91zdocn7dpma7ng20hk30fg1d0nh9q7rsj2sdthbkt5d14ek6rei75fphjgvf4k0r1bfqvrff2gttx3hc8wrp9r4lfa6icpeuopx944avr5wc91qh39v3',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '0dad7803-e0ac-4c72-abe9-5446286b8943');
            });
    });

    test(`/GraphQL bplusItSappiPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateModules (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'd72c01fd-272f-4f9c-bd07-63fa9f17590a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'd83d0bd5-aac3-426e-8876-3a39768a8458'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('d83d0bd5-aac3-426e-8876-3a39768a8458');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '13ceaf42-0205-48b1-b6e9-2a86a562ae2a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd83d0bd5-aac3-426e-8876-3a39768a8458'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('d83d0bd5-aac3-426e-8876-3a39768a8458');
            });
    });

    test(`/GraphQL bplusItSappiGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetModules (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'db10ac7b-25a5-4d57-b4b3-901cdeca7a08',
                        tenantId: 'dbec4bb9-74e7-48bf-b08c-3acc56249c1c',
                        tenantCode: 'fbsx7ftoyslgtkdw6t85z0ijd87qf2446gee554v0fyjbsyw9p',
                        systemId: 'f17d36c7-1195-4175-9443-e9643fad8923',
                        systemName: '70e0yzdodi7swg5oulfd',
                        channelId: '0150bc50-ae20-4687-b0df-ad8922531f3c',
                        channelParty: 'cam83zkb2o6vi0huvg6jow89x633gjpcnnuvlxkohjyzjmcw4yuhqi00rdf10k81wr409i4c13hfs8g160gg8b8cf1t0xlrx9dog9lcnqpx014iw5a0wrnjyqy7p11eypsrajda5k8kcn30b7lw9mb7pjn1ijzk6',
                        channelComponent: 'kxo46pptnemevm6p8hs0tfgfenk4coqy9jb0enz49jdm6cdtvm52tehiq78b0h8vpv2jq16ecf3sfr3t7ya1gu7ci4r3fzwdw8cv333d66bvgyzlmewxf9y8390grnpdj8haqwazh1q2cgwytw76rhfrtrgkup4i',
                        channelName: 'p0e157xmwh68sxarccl26u6dyvdcrklnr6s8ajlxx9ndixf8g7pxbeoorz86e4aensg5k3103vcs1lb63fin951hw6txkiiny55bg80giay0mwqu49r4nbkbnqsb7ezg7er72ua8fncyn3iitzy5hmfee63ag709',
                        flowId: '2827b9b9-bbd6-44c9-b252-518a8649f01c',
                        flowParty: '8ph9okhcaqhjd4le8ptp0e4qea0ie97kno980xvek37mjbz3479am2vfjntz9faw8yq9tist1qujicmil8akks45ayw05dk2m6nxli80cwpag6mjf4y1x5ydw6gy2rkzka5ps8byy6qmx6zt8x0xxk0phuqw619i',
                        flowComponent: 'ud7ibpb5b68fc2q2w4ct43o0twynv1mehm2a5hpt48vrzrsypwabs4ev20h1ssvd2n15me5zph40q7oipcp4j7hw6y6v56azbqj7mbuovg598y4bzdbbmjqwd1zgkd4tloyczdx5gc71gg9sypz1ub4xirhb38gr',
                        flowInterfaceName: '2ve0i7a6t3fbrafeaowb5i8snhouwvovn1fkcsd3hz1f9ue5hzai98tmsjuw41e3skx365vmolnjkdoyjp4w811lov5dbg1iqymiuomjwlc7wx82p28ukzutj5pt93mhjt8c7n377mdfiur73sglrdg3dfiy9wk2',
                        flowInterfaceNamespace: '0ffhowlk6o8p4ieudvocps0y9r0lxuv1ov4j7wo38wts290ogbqkxb0lwmtoxd56icln48qcsj7cl5bws6r7mtrs5w5hd2dn9vkun8w57s5ox4guog9rvh59pf8cyy97lcve935n4su3xtqdwzkbjsufsfbubmjs',
                        version: 'mquir10qjiu61hskci9r',
                        parameterGroup: 'quhw6ufpz6sk08b8fye0ne7ltmgl56ebhygrm3g0dupglvqzjbqneqratv1fdoy9kw1sub6v65tdtgwveqai9pc7zedt8clb95zgjjdcuu1wkh0veyax33fuoymyz45hpzu1w75zq3ke9sp7eh5swkz3ck997pie0t7b08x5vu4puezco1h5cbm0bokvknm02byhrz6zkefd3e22yj3cmt73pjywmcldzbvy52jauk9anq7qyx191sv0msbotp4',
                        name: 'ka9h6abns191vlpwiycqf4ris22erihiabc5dy47929hwia2ql9o8ivnllcvtl4jsyfej26nbs83htrk0ld8eqlnu6a6332h01pzr0iab9feulkatsh8pdjhuymptc036108o57ayhsfezytkag5lch7q968x2gxeyalft7depexc4yfdcqccuzcqlskdrhejjao03jp3uujxr6soeiotlm4sjygq7u6hfa07dk17716j6xewljaxpgtlcq3pni6uymuukucngw407xtdv5o8j9svhgt6ale3b5dcouqevdtkrtoo155jpiysjj79qyw',
                        parameterName: '1yz7tl0ren5hatz6tauehbv6940s9gyttf6s0e6ulw5t5pc3j8aq9shrm55eb6ocsulbr26q03umj5gt6n7jaf159vhm0fn72g77jemmiitz3gnpov189hetb0bt8kumhovt3zyea1b8h5be960hp6kyfrvgu550iujov6edpfptsbov50kxi5nvte68v8aqatvwb6ivxxian4c9br53by1p9sxl4q5b8coyq1vl44epu0zddykptywylx12s1i15rzs1vw0je3epjijjte7c3fxduss8ol97qb86hvpf2flxj1yoyf9t3evs3q4kj6l',
                        parameterValue: '9xoh24ai3pmilyoeo9qhcba74iv77m38br5bgv56n6jo4vdmoijm6xvx8h0iugnkrzl1cgmdjjf9tn7d6ryvqff726zfz9snik0uekrl1k7ata2uowzps5do31kd3eritkzqolf7irsif199rfbky6x4akirdd4lhwne6q8ts6oql4kh7w6bcl22hs66mvtejspjyi79gstuimp9ic3mu4ykf2nejpxoyet3n8lglank70e7pmaxdiamzobw8dviazbkizp35ms2b2k25c9dnys9f5gnkd43pbyo92y1l99cfzid2hu7ih9l6r3gp4dtz7oz8m4fv54ho13dn83zzu9rhwtk3xnjvpz2rhi89x0rro72r5ipl7qlrpiplcmkxfiwnhhw16ivkhwo1ssoynry868wrs6ze0lwad5inbpskw3pkmn15ojo6yockb91c4xqj08tmksj8uikw8fcpe9nihp0q0ajtxc8gdltzhd50qnn88x0hjia4a82h4y90a5qcuya46ysi4k668xonjf41eimqg8i0a2zqzor5ppsjujy9tcsvj8283ws2qnpwdndn7jiqovkv8h7bpw26n2xz6vgtvvzp35iw39vv0z79gscobikopiq10wivih2rmjopkz8nmi59zbt29xnui0xx7fa4akumzwvhydj6z2uagcphsnvubt043uc3ma14v38ced60sxhmjv88cgyspg2tvlhfn3wpsp6hjeqsagfyfypnv247ibzaxfprt7iuaywo8qnmg6mlinjp758u8dgg5dyg0h239euczzb2esppylitox7272hvw6unx3h3eiaic73f50vp1qypaic1bor9t6uovbe4dpk9vxe6zutg0h9j2e778iricmfuoi7m2cpk5qxdj630lgj0dhjdw88on2cu52m7lujijuy918pcldbhcrsh72sitb49v2bkxg3zanvqy6rco4anxtevksktquqreua0fww09ch0y7v5dsrv7vbkpn4h8ugzc6b',
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

    test(`/GraphQL bplusItSappiUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd83d0bd5-aac3-426e-8876-3a39768a8458',
                        tenantId: '7f97c247-d523-4863-8aa3-3368b986ba27',
                        tenantCode: 't8xrs7e0dr1gxlxkke88gfno135r5fx1dp5blb64gvp2lu9prt',
                        systemId: '1930f027-5eea-4303-be76-3c77630bf4dc',
                        systemName: 'vwhlbe1keh4xv2ccy3us',
                        channelId: '271fad34-5cf6-407a-a7d2-eac8da83f121',
                        channelParty: 'zk08k5e5zdzg2l47ncw96hkxwppuii4ogc0odvl9mkiordyg06ncgyov9evwxrv0du1cuscidoewkz9hyuu90ccjno27k3g4hq9s2eesqtpneni4a5wppqum8mxrauw1x4ekrjofnl1mj1pe4b2s49vfm4t9pudo',
                        channelComponent: 'j8vjg00b1abb9swlz4784ibyb2stjza7chi57frbsq3lh7tmovopgw64n3z59zf92gwkbsplm2etrl4s6o8d659kab8latklnnsp9jwj8oftjecconhksonv27vxsj2mwrqo5i6p3oij53d0xwh2z0sq7sebnaib',
                        channelName: '1m8duf00zlmi2o27o6vj2215u6eyj29kcfhimtjxru4ij8djdjqvoj8tft5zup43a3xfwxm21hitpsq6oikvefqymnae3fkatkpx6zai2jjjtrjdb0bj8csix09yoedajd5kh40644n9v4pngseq30krkb7oloa2',
                        flowId: '283c0249-2de5-4b64-b08c-8cd0109680a2',
                        flowParty: 'qxhn7qrhrfz7sywov3njm4nymang2m1t25og0h3jtivk7iv6rj7etmbwbq51hp7qscwq60e4kk18fnc93poj5djyaiofxycyzoy6mk7vmntki153cdm0a977i0f31aaozfzvvplhgjyzpnrw5ja16j5y313zj1x7',
                        flowComponent: 'uqoj6tng43ezmyqpvvxiqxnv4kij9kwlompp06jc52wtmiwp5dxtxicz8baznqt2ud61j71v8gd81y3m38jft3hffrabyz4mv4r6ebjcqa9pce0ua82holwy99tireiq6yskkhudgxt82nuu544xohtthadngz3i',
                        flowInterfaceName: 'ns0iv85hadfd11tl6c62ml2f7pi30za6p8wqe4fclleeizulqwlu25w2arvim2a9bz5kyc4fdgew0zx1bksduu2cpqzfag9swhgr43ea43gfe68sx80a5p98fsocmtgi00nfo7f276f4g2n7w685ujmhk8d5cx3d',
                        flowInterfaceNamespace: 'rz9xo8higotxdmy2mj8qxpjfu7t7m2dt13523llba08b0zsrlapcgh5fi1t1s3bkg2fvyt6v7yymc4ensb8etdu22i5gixk9iztumt4d6ph3k90xr68wm2b6cnps6yogzvl38973uhhnou6toepcxa0sbw64dw1o',
                        version: 'qkznuvxe9p7s5k0mmbqx',
                        parameterGroup: 'jfmzflyidgwdr18y9i07hn8fzx0gvt59uexovy6lyhjc686pe34jqw1xqshcaqgg74shbsigdgiuzzm8bdv7mimkrgufb4r3635425jd0i3d8kkdzbs95dyoe7b360ax6oks6pqwbz6wiotlq9hca32fj23ttdyfi26kupgbogs3cxmtn9ltu7f2t9oq3snthfwoz0m3cnqvq5b7jhhfusmlgas5wmeij4qu1gjp8u2cakyi49r6flyosi3ep6z',
                        name: '2ro3whq65gn4om9ursr2fcjhhtv2m7fbhkqcz5c2wvqzbr4awysr4z3630odytp6fhqc015a59nubac0a1oxqcrhivkf957os1nb0e0xtqq45r4v2a4ar4vkloq4dep52uzitx7iwk4g0ln94kvlw00g232eqx3yi3gmdzl3j3z5qrozfv0t55uwl0a6sith2pdj8e7j97eu6fl9crr9ju7lbd9w8l557h9d5nr60g454f0drhq5szp345j5vzd2ucr82x8z2tu7pvcs2k3klacyga1e4sow66wpj8865h027y5fc9dobmv3llydfe4p',
                        parameterName: '616ycek5pv7f7dij5njmxodl8zqgohbapjpz9vltj2czdxq8rublwajmucotzoxfba42zqxg5wl4dt8jau2l95re3oh3eoqqad2u92of4449437vzfl69537mrz2r1jvlqai219tser0m6y8sd151itd2ximvdudr3evukutop5misy9z3mhs7aj2noxua57mjl66bywau2wjgy43iau4ur5ikr9lthoqojh3mzshbh63sgyq9gvxvt4uyglulkkbkk5ias0pfktpru7ilctq23yavndbo6bmebuz8qbkov0w7y9gu08jogxt01nvxd2',
                        parameterValue: 'v81ywpxm1xbtkwj61w57pzm9o11xf0zz7kd44e09v2c91ra8f7mxi9s946p1a55ep663oh9ne1pggqigwpalzw92pzdrr8d821r0m7q8q5wbrsldzxxf10ta8ttluszkzsp97mmm43bl79bjffwqlv0n7hgqtbdo9s6wymcggnou0duhwjvq18azdv9rwef1wu9mjfwlo0vwo4ugk596v20dnsyjun05ahfc98454k62tmrhvissl2wx2g5hwmswd0hdz5zztwvp0xf7ij82xfnfg6pgfk634g8dpfs64qj1dudybd8ivf9uy9nurpgsptd97bvh69tgbbx9k4cs9tumpulb8a3a80bv51zlxj9eaygqzav0zf8xh6ap0oyz24iq01ajqk50awu99j0yhefb3bmvln4jdhxqec4upb3g6xvxi1raog58oan7duzbnbphn75d60ocnnb896vpuoarlkbw4y3t92jar0zritlcq6qbtvkanpebyph91kacybgltb6hi9pzfmlqroud4wm7kbpx2pvmz0c8ph1zev5vrr1eeqya3ee4ap8yoke0r7k89p4xdr4bhhq977indoewjko4u38w68bqe37qtgmnuuqqzvlmf91x9wn4k2421ucztyydc4riqggnb721j6p6xvjw8e19qp0r7vytjcbrfxwcvi07rr1fnannzgfd503plahptnkqpz1mg5kinofzwwntxbjw5gb2jv9hwr8nd7ndyyjv4x82x9gqud5nwck4nipfjgypwuab115pljpi8q2vm8yxd2o8z62yn8qh2byfjl23649bboahc5tzthk0ayi4hfvycxrtppcu8b8q392v462mzbgrz2kz84tnn8q18rofo6utdq8h3rs8ppcooz5h0uyldm6sbvrnavpt97nysl8werzklby9kr6b4jr7cz1neho34l5id60a1justelzq9wcsg9emjaxjl76ojulv5yg79wp20y1yp4nmh601xd7qau7ti2q3gqo',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('d83d0bd5-aac3-426e-8876-3a39768a8458');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd37debf1-f84d-4812-bcf8-2550c2816c40'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd83d0bd5-aac3-426e-8876-3a39768a8458'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('d83d0bd5-aac3-426e-8876-3a39768a8458');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});