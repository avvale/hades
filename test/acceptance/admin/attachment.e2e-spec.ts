import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '2lan9v39o0h0jsovk28x2yb34jbytoni0cbpl4u3ogc6ohii6ogtqb1op39t64ximznnb3masb7',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 371859,
                alt: '7hk91rvj3xhkfc4fctv6z90ecmp4p6iqfcdv8xsbpiqymcyaoa8knp7y23wv2aety9xv5nl5v1hyx00b4s8hkytmq19q0ko2aitq536fx65ajrg6225f45n4xgdtw60zmvoyys3cca1mxw4kxo4vdd3d4r5ezatn7ihygzkv302vifw4y1etch5xpxx63pzq2mb5aisnh1euu2ey121wykgjd6tavm0bi3w6iwzcesaw123qoslcxggbza0xht1',
                title: '3cs2jaeu29xof23wlh55rj6cb437bae682ynnhc8ocsbpk7zuo1zvezvdnwocc99dc6r3k77abze4988xz9voootmheldlsjb7ce02wfcf8fzmg7tjpdy2mw5u3ymqzqbreffle0hbp4eh9z34earutmyzxp03zfh94pwtwiegdhaickbinn0pwn925tiuwin0xrhatv9c1h2e9mf3xqdq3ch8eh2rrcttqlxeb2s1t3sspcl9i7v5z2lkc1b9f',
                description: 'Ea expedita ut dolorem libero sed. Atque accusamus molestiae consequatur error alias id. Sequi et quod sint.',
                excerpt: 'Tenetur modi voluptas ipsam officiis maiores non recusandae et consequatur. Voluptas ipsum mollitia eveniet occaecati enim ut rem. Cum consequatur exercitationem quaerat. Quia voluptas aut similique enim nihil et autem quia eius.',
                name: 'efina1y0a433qlxzvae3sa233mkk5cx1ji1wwwxy4yr6yikngv72tzyxe6shiiqs1mnewk3h6wgjgcnlhck9vqookf74zajbdwe8r40hjux6svf5brukydw6i5a0vxwcf8hjezstadu10yp71vvcbajf09j5a5iwt3z90vzrev9rfisqr7bwmps2lda3uz2i5bo3g0ca0rhq3jjsiv77huvcplynyuy36icv4cxpo7qx3q95svkitjoyk06eyzz',
                pathname: 'y9p4ht7c2shhgw0nzpyt6m4mrlnqokbkzgpl7on812i2lqdyy5f9wkd5nnvezev75lj9uktf31r6kraskcvb40fizn70niyi9hx9oh6c440rmd5a2yhp8wsicvk1f8a240xrs05ogz3ywj7qt5hc6jshh87vkkt0arugpopx1tjmsp2mngbvslezlgerfk5hnijo7z5wknpuyk126wuoa00nu1craciqxwgyed4deyg5kwg3uf83cacql6hwyla0toglu71ewdse2xvm08myjzxny7uvhh2k05flsh6e1z8rjsqrq0ai9ufl19drfm0v6vb14z2ld1iiq1ixomklf4xg8mfm98bgqlrxh1bs6dn3oljh4wjha0sfx2ga6g2pud2tflj90tg2s4iljiyfdbuaq474xgt17vq7n1aykgvmucwtnu7ndt1fmwfrs6r7yw0h17az9ov1c097fhl1yjk9o5c6bf80sbglca14bjp35qlg8smvp3a1845woihslb4hvulqxjcakhptt7ggsgv9sse4qhipni163lfa75517zynkt0nsmr0hqnur963md3vttepepuryuqqg0tqiw064d15fe89hgwu0ict1q8qr0k2r3tkei1zpotqfm18crhpz56mpubnzz8x69xuxe8higl1gx0a0pjhy7gy7bkju48jld29yxgforly30d4gwit0hlx2t8d5vvd0cv5xo0xjij4v8xg2w03s4db21kysf4p3r8lzlyjqr0o0cht5yn7n8lbvw8c3hk3fbkog2632lhkgnafv8wybr5xpho05ytr6xk9qs48k8a6a5pehw2qq23ahl83wjgz1cfocsl9m0o5e7i3fzzsvbnh3bg5zl3qu5pqy0fg5j41cc7lcfrlikdmxd03fbam8wqsuic8k5e3fpeqzx0xlvr0rp2f6n52nbt9jsko257m4p1ke24a3ytsp8zj61rb9myldt3mq88fue7r9h8rsowrigrpvhqfyhicud4nrhcb090k',
                filename: 'jkon74s7kgpz13i5vlrqt3iikclq2h08ap1owh1vnkpri70c30nh7ywgulpc6x8dhkihzsom4ojmxyxhbo7v2jpk5qq05ic2luzfn3tn0gdslfsougxbseq18v8g24avxcnrnho4c8ef9x6rti477s7loeismqtontb3yxcp5gtwp4keb4zw300zbdkxtohnmss58lv71625wxkqs4aevk2zaxex2ls1alhg3k7co0c50t8ucomnbv444afr5qx',
                url: '0mvt4ldqir5d9f62gvfckypnlb1ju1wqye0gj53s87l0083haqt3h5yuq53g6hbl8osqauke4h8u2k3voreun068kxl26ersz01ulc6cbutkebot12yp9dr40rzuqrg0yo964hghf26o0gx7tb856sdotq2ee3rairgcg8p96vgyo434zclc8nahnc3x8bsaz8sc41iwhyds9bngwbdokxqne0r6e1c7joog04qkgrg6eixtkiabj1twm0pcteu3o1kkrp0hdag1pnl2l6kig0ooqry2b9i8a8g4xfo1szf8kcxfwrqbq8gzknvvjoocx8td840wb5tvpmzx26o8x0654a7wizi7nwjueew9hsfc0edrvxryobq2txup43eqalst582ddm0xwg9kmigtgkkvq6uhmftr0x2ygxi3t45uxkm8y2nzejqbsqq8ehfy49ne6815s9f7j4vpaj0uxiozc310vfaf142yrrdk710pxo22rgh6reftdpu3gwg5qdfml2trdsjb7imz9ynqpe9z0qqdwgpd6le3aq6arewtbuslzjq69ey3y4wyeuekq2x1n9qdpf8yjjr5jxhrm4fcblnt4cqvdnmhjluouaydr4rz8b9cgwszgvosatdz263zil2elpy2riuteru0531pqcru45jks6y31tktraoarukzmxi3gyaajb925besgbssi8gotf70lgqj1rdlei3d5ldqppx4txydadrd37kyu3wqhyuvi3lju4enyoqhf5inmdotbyt62j3ogfhq3n10hh18n0qfpb5noet2tj1utpsp4rmtji8q6qe8tutbcgk7agm5wxspfbzn3ekcpgyeydwc3qy5yvu0kxyv4vuym80ttvqk8lh4r73etvc5oiv8z3ms17m19dh567car6ojyk5cxdee8oktyb02rcypuhnja0hwjcr98w7gwa7olywz6us27dss3d888sxfaiadmdlo421m9o9v7e3nhdggcjmktmnk0g5zik5t9f2j',
                mime: 'vx642fquczqu1jzhgfkxxs7wbdv8q91b24kuvbcx8yocxy7cwx',
                extension: 'iyin5kix0njh3i20iifrb1dow7w9klifkyfet3ifn9o5h03izs',
                size: 3105000742,
                width: 232579,
                height: 239943,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'a9hhvifvgqnzhwzshgvoijqirirbj0o3yz4dshsgns90pnlv5v15rjwf808v0j7rv2gabbxgxua6z6em4nmw4ol0l9ue953a6mjoe46akm1wxq4ibz0bf6c01x7ln7wat3obn4uwa281k8t0g6qpgtoqdzl4icuenqil7b5ejojo8iwyfl2gvs5jashk6qb5pque86cmbbz1ebib07eafnxgsagbdjpv05x38a40b1bo9z7hp4fl6qt7fmtkpfc',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '5hhsqwyynky1iea9iodbpl2lr0fxbnhs9846p2rs223ogm2nhcqxzvol9m7fx9z94yo7y1xsghi',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 385048,
                alt: 'q0wcvjdvhtldtbyxdni077290mkw4s9r48lwttyka4b43vx7wqtifeb3jhpeom4roh3qjkk27fn5pdlwlgaqvxwhgoafttqhpd4da2uyw6q94kwtgq9g06jr5wqmrs3iwyybqp1pcdy6axn1y9w0q0x4lmvtpu2vbyy8y4bod4zous6z1hix9bhgmhqb30o3s16oggxro8std8ncakrab8l5stoq0vlziwoino4qorcqcd7rcs35r0an8pyj197',
                title: '0omjsdzggr5pb5hzzeasria97joekeb0p9frsuicn0zig1r12ro74n5id0g6owv4golrymyc069mwcl2sipdx8bnrrlorio0v4ni2f8h45nse4g3k7eamssykvegybcr11dc5t2irkiz4u19b59zqng97biwl5uzxu0pygv46m8t30pytab3akazi3tqz3tlyvmk1ox9swilmecajpu4o3tbqwepscdadpzidwuznienajoux6yjhjpkhlrjtdc',
                description: 'Sunt adipisci architecto nostrum dolore minima. Ea ea ea non quo voluptatem expedita nemo. Magnam aliquid aliquam modi saepe sint. Mollitia autem suscipit unde accusamus voluptas vel adipisci id dolorum. Itaque laborum ipsa dolores. Quis explicabo quisquam aut ut quos.',
                excerpt: 'Magnam corrupti dicta dolore eius. Repellendus est quae. Minus accusantium vel.',
                name: 'aujqe04vszsebprqgb4ujundyoaa5wgp7matqfh0769o2kce13101uzeedhiuk8ld2o061kbqumjbsel4fkg3x3z1s8ibwgv78i3trejjdrsd5cyqf3c3gi7243xxt0zuzxayrcx34fj7rqc99ajdi11ns17m7o0dq3ulana3o7u5gkd6mnd57dg6sppr1gzia3mytwpabp748rru1pr0qh24f0z5z8kgpg8y7h3blmn4lrpobhppxv6ar6919w',
                pathname: '3fb2uru8zlhb4h84q740j3hpaiw4nl3tkg5ov6znfqngb2tm8zcy5oc66ptokdizosbhgigtx4p1h22o73v2wb2eqaw72a7mct8ge6me1ismnjq9xane52d6sq1w66ds2ile004kenk1gzpu0igc4q4sac19osrhxfg9gzaoyx40n44gfifbfx6aqxt7usabc586aa37phpk0mp9xozetjkvnr5zwio9jcj8aujlwrk6mqxmu31dmogyvl7jjbr5wcqqzz91m4gywwu5wv5h29qjiv3pyu2ilic9tbut335qs9t5tul6ly4ejakahl2k3usta3nt8plvzah2d53lxyiwzrbqvnd83us50iberkv4runu8hauggw4e3sxbqdarg04pxyl7wyltod0pfo61digsdc5xcrwqlhi2tkmphvqayzdysvz12jh2ku9v64cekac9ahjk99ys6k9ephrgf74w56lfkcorydpov6047fftklx9x68fup90v9swi67fy6t15b455lbo2lchxhia1i35qu1qmiqs6a7kmzy3uhpkcpu6d5n2rtp8ae9t9v9riskjeur60nwr3tpv50p0larmij3q1lfvizm3f0ynpswif1mcfupm5ybaxy9sj5dgx100km4jn1lmnsm3kenn58objb8jzc2fp098he0sf9yze7ew2nxke7n5oitfzvzu3nlbm5jsem2qvfpuogamp46hgpl4jlxvxbo61hmtjnb173fmelj5mhv5qvh98ul6ydxb1isofg533mfqefcta5fcqghmaguiohcgj9cef9cfuxyxyo7u3cg98qid935wto9dq06u3vn3s1helaksozggeayntmsduhe8auxrgjbwprdwka9wg28twkmaxv5hazx4asm46rdhj5ijb5mhz2ug6a7rmjxh5h4k31j475wtabiy8wdw33rso00noqn9vrw89f5ng2mzhabk8taig64usjjjuequj4vulkdn9b90qn79ye58ihjxvxbksbu',
                filename: 'pabmk7i76uo0als8gqtx9qvdf7r9q1ia5jf24a6bwcdnqpgk92do2udnm5kaba10gqk0mxeoix2h4ilk77kw8898ezbgrh5jyhhojoy1pu0vw40qxocog9012zzhc16garytsty8mms7icov6ksudbqs81hscoe301eahxn5hbakp37m50cin6ravhj8lo264s2t79k339zkfs1s4885svaot6oudogm6ihdq4i62vh8lo2j8flws7ed58c4f0i',
                url: 'fv9wadxinoosjfxo81euwt527m25a7q78nsc5n8icsbsvt03fn6zuyar8pai3f4o48o5qmapq3w544xoyivqqtgxz5eicehbhg4kjp9p3tzsaoid47rq0lt0pbi48edar7fu64muof8azhm4cwd0m55rp3ip3tgt1xm6hctlnh00xl1t1h7dawllf78gsa8gisp80dpxy52txhb8gti2vm8973qq8gjbgo3dkrrg61fpdh8qgjrb7wxbst4z2eox3arpyfxndgvhh9wge91ex41rm4erm7yqnvcuxd274bsood87cvldwyq0g905zhbhduw1z5vzmkv228rommsfuxw0xms1wakrtgdvcw159rj2zv6oqm87pqgk0uof4h8hziuq49r52g0nupgzivwy7tsfxxr1ws5b81ket56s6tex41izciu5lb1wlfncbmt8xbicbhb3wc0e362ivoqba13zbn3myhm8nb5mk3med8gf5zwl5kv3m7uwocanvw2rfwi2lp2jjq192lq73rmywu3eyfu7rvrgoicl4bqcqp2lcml0bdnzzxqjcvud1dsmmym1bfl8zfvavj0i98gq8aouwvjz561klk2pxq41uhiwpzg25us1piupqsz00xu9fw8aub46jr6nugy7fv2kr3d5gjkn87drat9zbj0gudinjov31mxhkehge8ucy9ak4mecz42l4rjjhgm52nwzdzysxrok2q16drb4bomeozpnqnszvn164nae4k6o73orf6yay4gy1k80cb0782vxf3i59bde95x36bmolk84gmfmbq1ni0mvz2roacxmtoiglfmv5j6hw28bv67l6jc0wykcoj8xdcwzmnoxmahaaa7u1521tw3ppjof2qelbdynij7hqwtcbak3nysds4q02fsk10ut7asiirndi3kw95u73i8kevuqa4orwuqklt4tntq0bwwo79xjqeq4t1xgjtn6rpbnc1fsatcl306d45fgbb0im6buoduaxd0qkvnu',
                mime: 'jmxjo5hcra0a3qedswwox0awnjek4y3bv1gantpzbt6w51g218',
                extension: 'ns21klasx1knl9218fk1gpvsovmrhxaz27yxojyfabdg2szh3j',
                size: 8260423002,
                width: 475863,
                height: 558680,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 's7gtpvo5ii6d5xzsfd9oz7e72r2zyoz6ivbkpm710se4guekjy6j74srtsf6ba45s5zegtv6racx5nqycvnz3inq6xzl49qy6xgaqn5dnnw0ra14lhlr72l3v0ra899op6du178xnx1gk8gwixq2u29ume81zedqnabe2nyex2f2g8ubged26qu90jpym3cypod3rqhtzqdr150x8ixcn9icbxar0mq4m3g0jv4906yp2ajlz5pqhtdx9cftfmz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: null,
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'u7igwa63xjsk632oxbgtc0vng686fvt8pxgxgwgrbdnguymm535zmrbzia46vzwhsw2ay9z91mx',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 332551,
                alt: 's9n5izh5lenlppbn6rxhbra5mv3rr8nsidajy94y73do99pet1d8a2m68bsw4o3x7i4prw2f2xsok94wkbeo56movw8wk36jdc7g3886mcpu24crzlh5wgsl4m8gc33a3vf299h5v574bgj1hzdtvv0kxw3z4jrydci0hhzx2ytzmr934jdrzygw908854ma77vydqocz66q6kf5ytpiweeq0fj7708tontw09f8p94g3n5hv7ty9u54z66c48e',
                title: 'iuked2kboe3smhsxwm6cmsosa1hercm1jtgb6s43yvxtots6me8jb6atjvh7o3yiyd61jv75dhrgsh552erd6s4kbjgf00n9vpgdgass0w66s5jnsoysdkuwsijfexczelgebhggtrfej8so8plj6acd0nzm2leiav5iwhuc5b3fln32ag6hjp2ktstkznfg86yk46p1l51j4nvum2hperkt6g9p3ntmq6l2d5x7sxn0xgmfzrvd3sed4b7hhax',
                description: 'Quasi qui nemo nihil praesentium nemo eum. Dolore vitae aut nulla illum totam aliquam iure. Asperiores dicta totam quis.',
                excerpt: 'Blanditiis omnis quod voluptas laborum. Omnis fugit ex et rerum delectus est et consequatur. Quas laborum exercitationem alias asperiores. Inventore ut ipsam maxime mollitia alias ad ut. Deserunt sed facere itaque et quasi veniam distinctio voluptatem officia.',
                name: 'zkp8gqv6ecf2orgebhnphu6pstda06fujcqme080jzweggpsejbxdxns2ouun9ce21ebjunhpd0ho2pqk15v2tyqjrq9nfnmx3u19g6uw2z5kie6w3xc01zk7w90sf8t6ga9d4aougkbwfrz3eyzaz23bnjjys5xrmxbpevbeb6n4jw0poj7822za0a72pi84vmpdykoehrbybp1ysbyyri7m8ey7wpe3k0zjf30w3on9fbbxdese9kznl8qxju',
                pathname: 'pncwaidu9eusswr2kc4b64y6wi74ogs7x3feaxalpl34dem1m885tf0efltizkbjd8y9lf46xqzz7mpsio4u0zvplutqb4htcb34ia3knzar9lf7i6yclrj4s6h6pi8bye9muu1oi8acmg8v3kvx6unpw5dzh3az06japva1s0tncf5yyf45gz5u3lgfzucpcdrdteg3qurhag8t0k7lcedu2vd6f0n37dn1ksjfa37zyxbk2b4h8qb1uk7qlwsjimug8elgqz1j402ksjcabgniit60zybbeb9niksytiox1l43v9vpcsl6lmaqunpelfbjr1e1e6pv3v0khkcrh59oxbbzvhcfl3mp0qx2wpuq4trkdv56kh9xr7m39h37m8rhxexf0zolxyadlrkzus3g4fbhjzs78htzfdn8ggnc4kfaky1gferea0vhgbzu1jnhysscnu7u5tt673i43so5q8u3xga5xl0gvxlpb13n4nrm3mivlk0e4ngvrarn2wu48yx36z21x5tullqc0becs3v8thv7ige0xf5h6jfyi52mxbhhohfj9a4mm00plqf9h697wm907nmv7aft4esdjze3nrelzta1l954ukabv8nfyuyb9aacov5xt2wj3yq26wuk5e5uehe1gvlf1cpkklrsi183vh97rct1u09sko6xovgjj4q5emobt4km9sfw1lbyc2oxtenzlz0pkxols3rnpdw6ugp5vjzndujv7bjjo6xn0ol4yb1tuc4cewmq9pa50jtuk0sboxpvpywysfravudckdvrriueqdfewdl8xscjq6icuagrcjl9zcjhmpayzam0xqvykglpyoxrp1mpvpyh7ropvbygn4jg654q3b4bcf2wv12tgqw8drdc4e3sylma16c3d9mjhlzglxza9tym0ruezw6hxycbsg5bi7dv8it3e2jc0yihgghamee3g6n5xvmsi0n1mdpfbphp3whezfl0jbqcircqwpgdoa5vqinhuec4zekt',
                filename: 'ok86f71d7xijhlo1gszngb0f6h56l42u164c5ckl0ibyj68gsls9ojn5mjox56wb6j4vr0j36jtjec4zjjs1km1c2vqa2ld3um01hprm0frroh80sc0bkgxrw3shzqey8h79mnhwfnu0pbwwhx2nrdw24rdl3m17rx04u8ee0jodfm2bfbhusgxz6yyoun9q8kmkljnt3gj257fgrhrflk3ixbxzamxi4d09l1hespjb6tr8asrhwpl1tag6y9p',
                url: '1exwttxg8ewwjs8lep9vh32tk9g517r4wk4phcz4mghu3u8l27r60qeovfnsvbblxo8eia240jhby5lqljgbm3spj0fnlihuadtvyzypobcx83uhq66d7drugw1u6ynh21trcxz46kttyyfbsow9b777biey2vt52z70c5skbr0e0a44tis1tfk408vz05e77zp40cy87sejejc9vcasfevnpwtxhi2049nk7591159k1wsn2n6naqj66qdkxutrhzwfmk6zer9l2cppssr79m5ng9cqnhj137x7d50qbecpr6kl9qi1rnbmmsdhny7lrmlb7vftydhihq9dassbiyu2m56w65s2q1g2y36gy78cnyv8y063mx2v5dexghfsj779lkvpjctt6evovq8gyzw6opwtvhgeibn1r0riy08pebtoesnzhwu53k4ztsjyx1jwam5158561n5f0muxvffpdqzzex8fp1crrt9twct1giu6p6a7ji2nrzoz4l5i9o1lqc88glvrktcap12uwo8eceqc6gzbmwc20rp5bh4yu0t2bjn7yl2u7kazjvdngo10k09qnxyu88btra7f080ds4e5sxroz5n7fyrxmzgozcndkatu2ei4ppbyu29cr6w2atmtcpeoyzbapsmmcsxt42c7dlvbp2fkqwv9i8gk7i1qo20774yhj3c0c62oakqj3px3tfoixf4yoldnk4t2xjruxvqwzdy3cjx84mi3ybo3sj9v7ul7bgupizp0h5hlu7ldfs4rf60s0du84ib6u1q3gfma7mjamvwhczm7cygmi3w30j24p7dybvqxpqm3bc13p10w41pwug5ohfnyp4j6kyv79cfoivmbq19lsamobnj0ubvj7jtxv05e17ugxqcw0nzbdeq6sj920kbiqpn3o8avatit97pk6ckxwvbjb4u469q9si4707pr7ekuwbz0z3umj3ydv47eruswreq8vlnhhcc357n1g96lmidgx1vhmmos5yebw57q',
                mime: 'n0t9hoe7dbhv7q08yil1uatg8e9zm5rmwaiwbm35clspm471q4',
                extension: 'mw5r9yqzk8b60ral0oy2ipujmvgnoxrzl055bhhny8s811uemb',
                size: 5142144725,
                width: 522540,
                height: 529940,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'svb8ae32gy4g6ncxmwnknyy5yrzpwnokuiqen78uoauaqqdmw00yrbu9hiygny61jgb7c5mc79bqcc3suyuipbxg06a2nik8suosobqoaj9hmsx54v5uzaso1izallzsdjd8izj5ercbnvjfdzn2017pnw72l55ybysmtgxk8wlswv8b5m9vx1ke6wvhv58naun3l7o6ljsrpa6z80jor0dquu7sakr37qyzxnegwzh4r772je4crwgnqg8rm1k',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'srqeyt7ctqdh1jv3yx1528ydj1zwdsrnwg04mm2onpn2q58qahagq8lvuqk5qkxc1rjied09znv',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 123834,
                alt: 'y3y99ojrmyjnhp6z4mur43uh4nszsr6aupj656h98zzcp05e82desay0e9vmwnduytej5oc7i0asa818ypr5xv52ow4bg582hhsghg7dcab3apc1vtfcofepqyf7lsp3vd30q54jfqdzld0tcjffnitl87esko5qaj0fz4n16upwpv2tm5z5c0ne5e7yazk6bl066k5zpysoe55vmn82luulwmuaqujmhmp1u4hoh48gwjs6ubc7dgwz6lx9g4m',
                title: 'kjh3e0f2427vmzczkt2hrefb1cjr0d7hrjrg90crftmxl56eiom5sw1w68vdyxq88j7nrdmumr2lv3l21p8hvb9vejyq7fow97oijq3fgkrp3y7rhdwh99jmmrhmtxnhs5dq89aalun9n03b52qjm7sc3s0z6bh3dgv8jf45ovpjbiukq1fitk7y6a07wc172ilhbg7kgquet1qaf71fvi4ddtfz7suu3atlzyplbjkzhxbrefq78bir2p0a2y9',
                description: 'Dolor nihil rem aut quia eos facilis error. Expedita qui eos corporis. Nemo ut reiciendis officiis amet molestias assumenda distinctio. Perferendis et est amet eveniet voluptatibus placeat nostrum quas sunt. Qui tenetur facere hic delectus ipsa.',
                excerpt: 'Maxime et necessitatibus doloremque. Quia et nihil odio illum officiis architecto beatae omnis. Minima aut quasi praesentium.',
                name: 'qqc1ekayeb6uofizh20uihl8fsijzaiocdldq3fdi4kly3ykr0gu9agncrqw08aq9yyzw9zeeumlflmvncspzrbku0i90fxu8n1lt42jrlcyrei4a4er20e20sc435tbtdn0njwbm3xufnjfe7fipgmcgjuy7g2b9z8yrrnnu9w7cdbq7tlj8i74qn7mwv1e0hhft9r4l8rkkf8mnm9a2upduq5e27063lr255nphpfrcl7bsje7sqlbiolmk89',
                pathname: 'ky7d8rnftymnn8svdkktbh8slfij4httb1ek33owcjijfo5bk99tjab63ar9pgk3ejzap0goeizf2c135yrjuq5als103w95ahds01tcxfc1zh5mx5zvdflekys06ecaxkkwa5utf6twvwd6ufu2ibhfowss1aomqnyfyb21bpfngrg1uimw5m22rovea9sjvvk25fxh15j37eb4c7pgmqwgpkwtwh3ww2tmdpngvdln9avrtckvseicq2cplecba0timk0tnf5gahqusx8wiou2nq6c1c5zzbcsmgrbp40tz0ionmgonwb1alwbs9bq61jk98uvb1cmg3fov2on1n1dyqo4yzb167ayg0c0sziyjhyp3ibe73r08jr42wf4hjdvz2vxbjh9a05143zmaqx2zgymhe6xde8dl65retw4ghjwn8946zcdb916tgg2iqrrzqvhi2g5oy1di57ozgr50byv8r4u1q1vt387qnsubscuc25hbl1fg1bx8eahbrl33gpt99rremtmb0ctkt6jybn6syhqll8kapq6n3ix7ozhop32aim6mk13r427603cexhebf4e6lndpy423p0liudw0aqkq9zbg7kaf3t4t5x5l7qzduk1hqp4jnjnhkax5r1iyg25fbhavurlyo4s662dr1pvmy8bku9kqf36d91godqgvqj98gp2g290hn3cs1hzfdhk98cahzhswhravo076zvhe4l6m7123ukmauyo5pfm00021cfhuju9u1n8mbc84n65pk88cn4rs2fytoq06vkqqey2supw0r2s06v7lcm4gld61nqkjvc8z84o8a8i1v61au9n98p24rzddq2vdjwnjefems2h2bvuc7nacdfgptnvz72eid1l5ap4nh6vzl47fd8zrvrqk8lmu12jcd03liow0vf22unlunuyw8nabrsrnekaqyz1ahqcl3gkawgldsibj6ddxz2y5lhnygo1gi7pteeyjti8opd6x05ih600e7x4hohl',
                filename: '1s7arbhqz7cij21pqpvcpqz5s9os64yjjtns8gtb8skvpm5ec336i4mfptkc94mqmc0sifmkjyctpx8gqsgp4v3lftegz1t76kib3acgfkwjhz30qk5gq3jhrswjwwiarv32xnp73yxf5wf7tpuc30hyv3ef8om2g29nx3a6c6wfed0fkw4x13djynluandzpf3zk5ttpukgisewto64ck5cpp2gpgxd4s4ieh2rdk3113dbb0wpulm9bgivsdb',
                url: 'krlsa9p2mmaza9aozccwk9frpt7i1a18ztsat9rlcyeod5nu7remy5aovdwt69187wo4qgodidqf52mmc0h52p8mtvynfpphpj7xtgt9gse8yhujvqqrv6kkokmoxqp8yixlnytd187ztr5qtdwqvjrl4t1qi2omhozmycn2dn2imtow2gvvqttxot3s2b7b6wipkrybe109qjt58kfk7d0fc8okgjlf7b6y0qfyb0bjrt3z79fii326la7w89btg0cqyj2w6391x5de2bqdjh6v1rims6oxk5bqrwziuavlaix7761z2alja2l6lkb0w6y2oyvhmatxkp7n46taw1ga5wgftz0g5rmxgba03wh5ycb2avjy6bwyw58wenzg6lzfr0ld664wnora07m2aaj1j8zqnfvlahzcplmlj8tuxd2j8kkrnb96opsbwm2po1ia15k1lxttgfvb2a0e0pl7mk9q76akf4n2hepuxcgybv11u4omwgv3lo5f78gn6jhpd77t7geh6lpvlegvmn0q5ybkw9b4mz56iw1edi3yx5tol2vxgu30z7t0kssadyqzyl95bqoj1g8ectuhnqdqr53zpqvkcz57ubepafohuhbil7dxfweqn45s5pd7j6zd9lb65lel2lo5ksz6b4luz12e82dsusotifnpji1p7gu2mq2g3i2ryeznppq629t6ne8kbncd67ro9zzh5tw96gcpasuy1sud5vork8y3kg7xnb30sgzcrvwc53eb2t8t71qcjyo9z563lv4goisvcm55ml448h5tuivmn23h89to899r08oqrio2ydyom2rk5r302dgkbc7tglhuwqv81ddh6h5hzlqccbxvp2wgbscpozn1yi906d88i1e124pvhz5runmhb3d92xr7jcg6ye1jz31vcc8lh53srfcvy5djnrb8km7804jm1eupe885ti2p2psjfaokj4drcq88s361qrfo9wil9682ptfcjisudi8q2nnvdgxnog3s',
                mime: 'm68n0g0k633ls8n99prxzdwz11a4i2kn5owz8fa4v7sis53x3d',
                extension: 'kuugd1htbbnaku31yzxxf1z11novwxafsy9dfc1305gw42wu8j',
                size: 6873774733,
                width: 857847,
                height: 718918,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'gezcao82rdgfw6z7xbbn792tpmxvixm1d9tx7vp4zzahjy88ijxc9ttw805p0ermo5vkr5qwvkznkrd5xsmfzyl8ejncfb0x7daj6czc9uqllz921k1weqtlg32unipae1gdaji3rr9a7gzxojqu8y934q1wfuu252rqagd808s7zj2mjdhefbspdvmhsmde3508pbycueu3e4jklpg5cti8h6sytzggc4fwmlyke2ie52za6ig84oo2vrh0jaf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: null,
                attachableModel: 'lto60whz8yd0k7ouzi7y1to1fbnx7hsoxqzr58kmzgacya1591dq54o9a88o4b72uwud764sg4z',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 302622,
                alt: 'ec9w5mch1w89w9h0k4xvr6h6e98jbyjp1nbnsqkthdnmm2rqasb5y6zitimb730by0bxwg5yvn5792jdtqrfpqhaib5n350tde9h8q4ij93qd3cmkunojqd9i9m8epkbe0x0lwvduswsqefetip4nh0e4v1dr3x1w4g4bbdp2xr4xfaqfe9tsgty8015ie2c6m96k23jcg59cb34d8x1yr783hwef8hwu73rc2eakvpm9y7x1aujo7rgn45r4x2',
                title: 'nf29bg6olxl7z7p7en8xxwesl525nm0iop30fu4hfm157yewtzo20x271obo7cttkqqoxguzltfcqndpcfj6n5i373jjl6y65onn6kwa6akp24nr6b6w9kpjjvscnm2s5a268okxvqv6ojiaid3aguixbjqkpkzuiz5sps0lm6vqhyip36ktjvls4cleq2wr316qcj480eyfpzesyxeowr0y42upj0gjzjs93g3ylw8l75h0dkn94rf11p19nts',
                description: 'Omnis nemo adipisci est enim exercitationem sint voluptas. Minima labore dolorum totam maiores officia odio nisi sequi temporibus. Pariatur molestiae quas. Est ullam vero animi nisi reiciendis voluptatum laborum. Aspernatur aliquid quasi quia repellendus beatae ea eum fugit. Pariatur quam ad.',
                excerpt: 'Aut voluptatem qui assumenda exercitationem molestiae. Et sed non. Sit autem ut deserunt cupiditate numquam eos quaerat id eaque. Quo enim non.',
                name: '25ly53au2ib83hcfzazfty02zj9jv3ke3uzkv952ttpkzfz1asax3rs573vih1ek9rs64tbrs8v7w58ppgntuhqwf703ucu4nha27scapdtzuzx8cbwy20dsoc2it8i2gn8a5oc78ozr85o50ukzobh6dtx5hiq1tw30hi75uw3jjm2m2g3dk6ndt4lnguqjq2txqnezzjl0mzeplqlkcdam7mymz4tyi9hmiqtb46i7labodbglfrl6k9prhuw',
                pathname: 'l959ipjlbphrzdgo8s2lk5gqntun61d435k1ij25esi8y5ly72icywfcd4n1xra9erledvkerw3pvfikyafyle6u2l4gwnck9ccbrg0vxhtja6ryafqdoi8xchrf4xplgs8y008us7d2icrr8r3pyjdvhn3x3ibndv1t3ak66qjz1gypphhtbd8s7t8rynvv8mq5nwn05zi31q0ihnr4zqnd5hqt3k5409usxhd5lir7jquvwe95fsz84ybyvtud4kte2ny5l2gpxed66csju0ccg314yeni0uorciycy2fizeiws7q5gms2v0ftkev8i65ubinbwocdb98djv2s1mhovpxu8jgfqrwlwqoskudrfzavyikt5lanr5a30cic04mn0amk1tsixj00bwd8kue0ikeelaa1sky0xm4t35h1p7p7fcmuj6brny9o1x650u1dlhqabn1a9yj9p8amndjzsdv5hencywbf6id9lp443et1wvq8s8v17mnb4b1g8wjw6ghw7ko4jvpypmvbr67iosn933lv1nhnh9y0i1reogwmtc2dm66uvihc3qum6j1cblg0thuaglynvseijxvex1mlykgc0fi2h0tzdvaxp335f3yt9zaotq0lytqrv916t5c77n82xtdtbxyvpd8ezlercynxpmx89hrrhgtuuohsjychpo7b9lm9fd51uiswea391mjrznrtzyrkjqhdrbqewvj5q1i2fhhjzwba1y25nimib8ig7f5y6sdjvzkahmtxoxtwdh4yx9rbcz8qihz6e4t56ss72825imaoxz5m186tbl1tbh3bpavtw14esh8m7xe7bxde30opfdbzd3v1x8gsgkcdw2518xkn2sib61qi4csjmabrfgl5koiygno4yerlii0utyjk0n1o15nad5mrwoso4zrvst6rj9axns4ilcm1nc61r0uwmlfcra1g9y8u2u9hr92tbdu9cw7qevgmvtzfwemd4nkeao7pc6mufdp9i1xt2ocu',
                filename: 'xjd7gc0v8a6ktdhdod3kh9cpnfspx0mubc3q06wzf999favnfmbwv06ng4tx5bhr8iq7no61xvww1sxe7ttyvejnvbzu6sp1ohiwdv6pug363au0kiq1rjxair2lee3p7ulgbohdlar8a3drkfr47l8qa4oyfrp8svqgh9xumhkevjwxaatg5f2xpdv5k1v6nhpfqy6cdenltlfrfv8pndye8md7cjay0rpawmdoekfuai7zk7msthl09y4x8bg',
                url: 'mg3emmihuwa3wbzfu0vcehk57ag7ar27jccn295a5g9aibopqu67u4wlgnb6hfwz5etbqvb6rt1bkn8lkfvwszj3xkcc3o89s5204n2uh7ecrsfd3bqbjuw7qco2onhp8n63u67z8h66n2u2qg1kg1by9r5g9tp1nt8g1f9sto8xqngd2mafi8lsfotrzolfz08bj1lbk1podj42ffydkgma4orn2v8n5a66v9chn691cdlr6ql9i9sie69o03frus7wb9u9ayr51x7a9axwmkzrt55xkmt8dmt3ans35l39u2sdcdew8118ntsrealxl3t12h6k2ew9wqse5zr8opmn53efqlthn5v24zaf15z5onli1lr65uahxeaimgps676vx5f8lu7cgtf5r2sya8h2b0iqb01qts9lebcdb14qjpul3ooc4l4im5s0x6vea6vanb00y5mxseg3i54u9160iq1mrdyd0le7zcth52k1jzd144h23d4kvu73yekkbm9byrnvzn8k91ah16yo4rcpc97exomfhlu3czd7rbop39i57qqr8k1xz7qf6gktsz4fau1z0bvxknwjv80ihkex4i6pk667yrtcp6zikjc61upbkhp1fhjq54dlv4pwnjv1o5jo526odm0p88ybyqeez621pvgc9fzyr68wcuo4jragn1pfdxizeklx9djk7refbof3r3bi5vx6ydrawodq399aq965p5w7vlv8k84tmimtdvgqmcd1pjcyqn7mbe0nmaila18k10a5fe6ghsyss9elq5as0k3i5sp4ar0o07hatz2lr5jx8y8ihcb8j80eim0hsx2utgdgxh2t4w2usxn69yt4rmtoqypzat5adzyggcf9m2k7kwoh4ziox5qbscow18em04wrqtcoubzu9e3y470ecqjau0cawgl6g5zoo0y9y3154xztmw0f7cfr0kekn6cqo0b0vb87n1hyxkcmyjvcvqzutcbsbfcaf92982tw4lynq38xxgy2',
                mime: 'mb02pz1n0yh1c6gkdyfh9y68gmmwtgpgflttttmexwovo483od',
                extension: '41xvk5dw58hoax8qdvg2kqy8pqbyr6orn81pfoh060vvo0vmib',
                size: 7451981089,
                width: 241896,
                height: 500448,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'ckkufhng7qoub3yqe9kuxldd2frq6kq6h2el33aug65pegwb4754m8qa1dawq0nuc09vwydhozpuoy0m416hg3p6n0oaatelsjizht77e3gp5pvcwspq7skvqqbh2p0cdg473oaluodbjy89bjazhfk9wyovula01krybtifefkrd530teb43qbmogeawc7czxtd2ttphqc0pbtdcizii5wiqo75ly89yj7t274auyt56w6ra77xwskn9zx86o3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                
                attachableModel: '86yuz414bcm93y79qf57gfuo1sptvlujtxf4ihy8985jgg11r9pnrwdk660degf4l6ad8cgzo5c',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 298396,
                alt: 'dafrh0eqn6z0ixequxrpneck2m7mrphr95yvbb8vsqs8e1bllomg6rq2ir4j8mz169nhl4gdbqvnefluf8reshxglfhjcd8c3k4mxqatcdy3ebhqsutnokchppqcr9hhysvbxz8d90musljm3vh9glz5ff7afs5s4kestwfhne8qz5e1t9v4wap4fbn2jz7ioadcq78fe6vifdax39m4li5sjxwi974knnh5xoehlo8f583wlvozsmzv82x33fw',
                title: 'gjibiqckkd3bx6alqrdllj65qpdcxwihjsf6p6oau9g8sqxcwd2rf11haghn9gx8pfag4q7s73wn0lhc8uo9a6c8cz9u1sa70qae4vjl0lsuhbsea4jpy2vug5yeeav086u7nyhg08w3tyl4goy7t2zl0ukbgucak38co4gskyrfiol1chtbuztlma402hg69am1varnf46o0kzvlz8jjzq2ibfi3ojekbe5b5ld8hmym4ngzfbwtzihwnuog2y',
                description: 'Labore omnis iusto illo doloribus. Modi et tempora id sequi dolorem dolorum ipsum unde. Aut sint sint dolore. Quo iste odit similique ea veritatis rerum velit. Possimus reiciendis vero.',
                excerpt: 'Ut quas harum error dolore molestiae in ut ratione. Sit praesentium ut aut sit in culpa sit nisi et. Quaerat aut quibusdam voluptatem aut dicta voluptas ab in.',
                name: '9ym4f620ebtwi0q32ecnstbc01gw5f8a7gpglbqb6edjf575judkhy32ly5ftbjknymrj1v3lboiyinjn09w4zstr10z09gdk439k15jbfhfkkeyeftoqu68kjoxqpzghbeew3hlbhhyi50ozfjsj77hv9v319izm846pnvv2pfn15x5js1u6bgitcsya7njwgrsolmyxrwdfpbgz30lwh17v95miciqebavadqnv2ktbk6rqjbj2e87grxy8g8',
                pathname: 'nb6qxrq5tdiiz1mqgvx81ca1efkgenpfipw4rq0npu7nn5ftkzh5wrop5tfcchyzmd5izwpgoziuv779flju00hzoroxwe2qrrx3l62l8m2dg9ozt97ta5c93l0sq4ix32999ep3xfe69tu868mn46x880v9eijcb4zobrmew21q4wani9ibbee0puadhkmfcfm8mj4nnxuo3wj1aypyf4i2cjy1fa8bpn0zdt51t9xrwr6v5xpb5jm3tenuqsxpf3tlskalc782p8f5260altxf13crchp7tmhy5d214ykm01uziinz37msc9xkie2mj42gw59fzmt34vk4xntcdv3w1vxuv387efzcoanb8e4bd6ufhko82w8qxapzv3ogtug3s6bbi08lroccotkt9synpd4wp1vgrpaz4sio10tfpryos132iugwbg2m3k05av3eypezjusouaujjs5fcsnxmu1tm7i3cud2090gbdxsa0qahawas3qlt20n88pl3su0sit8br04kbvmltgcp8fd9fmnqo1vrl53sgjomuart824tfw3pjae41si3hqvbbqg01p4hpb9wa5ottid0wory9220u2kb942fet4weykcpzygpou4tiw9idlbtn3pdg3l5y6x7ktgeekfej6yhlsm2wh5tyusmbkp5pjmet6nbap91q87uiudeng640mzw89mwlnrzswraeiosdsjj3m6sjubk4ekrl37s8aqfp6v76ey79xv8otx53zr9ny9tpyf4dwhh71nd3qy78tysyn6x8u5yyhdm5e1dbv39n3w5j2uodh7jyv1i09oilg6at75b8dafbqte632rdkq8sluzcdma1d55m211jt3gt97k6v1hghoiztr2tohun5jul68szp9cd0pxtcjp0gzlmoqw891pwd0zh8aoqcjzs857lyau9uw402sirczzul6t412s37ut8p5frwto9b6j6fs5lf8i3xipi1i3mljklmgdjfapmbw6e3ik5zcuig',
                filename: 'jqb0ymf3tnz41utvs4mhcc76bazn1op7ac7ox5vt0742cpa79y70vurd30txfkxen5hohxbwdbbsnea0jmya4zpxftx3f1zj86wpwwzxal6s483e3bm7108pv7h82lihym6d0muq31orfljwm3pwtzdvvzxpvpadklbsssswoxniytn79t4c0yr3vpflkd50jms2ri71japu60y4ixhcgtouv3m7gq7fh59i2lbzytfiikzf4xenvnp75fdmyle',
                url: 'jihuy2uz61ew1plpnc1eovdz7live0cf1gvwdom5iqf5qdp0qo42hjfj8jnjixzkimmps138yxac7jh19p62mow78qu1c4nuxus8rtbpnu56d65rwrvvtjwem3zr4m8wbyttz1tmo6mmh5bg3nv62avh0cvdly4xg22fi1x6wfczjhvjmqlzfdo4xzbw5in7x7ija4qt684xuubugwwonhlu9nh7iltbj0tmn8bmk0l7ajk6moahr0u6qrtmrnuhve8a65ei7xg4e9jkvxbizkeoanbkgt3c3tomcjxpabzjs5vj3h8q7cv5v3sbq1gt810m2ndj025x9uj13kflyvbpz8yi4acjmmmozcbysrnq8o06x09nzekk4mvjmagasnjr5r1w2nrzmfefl4y52muke05omhgseh807pb6p3pb04s6d2lkdpwf6giub2p9h4eb8knn2g6waatyy2m8lkp8uslily5kdqbvp6s5exussvj7l08metdv078sxi0nyw20l7dco04g2okyf9oku42qkatrkvzq6g9nlttseblci5jid5dj8r7t6rq4w96st1mgixoxn17ugpp5rh0l3fn3t351mnqj36epklijchmysh2ixm9st9q7seqevd240amtkwpeqgvnary21sjxriv3auppimtmbwnanpfxuoo1u6hnep60eyyw8j4zz1y96ktzy57p3we3qt0dgkudxeyavk849nqstzmkkx46opx1z6j6rrzyuhsm8eyge62ootde09hlbk4wbet0tk34w9ff2mn8nsouwu5n1bglegdtzqk0s84rz8vgz7btzdg4145yyvf4vfx321tdv6hr8gftq0um6z19v9e78xbxf3miihets1xtjp5sbyqwld6tziiktjmuzxjiqq8h5ufln0y6px50et7cvkuunx2km7ijs8t3v8rintfs64lnft8osdn4kc8ntuqyp6c0sl4py5ojjb9gbfk5fwey0ngzxehm3z0qmdtm029hnrsdu2j9',
                mime: '1qitbcn2pp77wfcyyjfp65f4skzm7tdhcdla11m6t4bxjbsxum',
                extension: 'ez19vqdra9r1x01rmm5wawjqb6tzlkufy4hdhpq6ulq0umc1y3',
                size: 5794264890,
                width: 496961,
                height: 797575,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'zmzlyz3kxzpq1v6o1smkclvgt043384n73guguv575pnvss9ykpy4r8bh360dvussecuocy9epqumadjlcle6dz459h1mu3m5khnf2s2n7tw25zhm1ah34tfhyplr3hangv5xps6giqgt1dsc1hcu12qnonlq89ngk0wut0l0neemkol0o37owiiqiljhg040dje5f1xghpglfaufqn61h3137pgd3dbkx7kaovedrqu552wvl1a7ml1ktgez02',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: null,
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 334880,
                alt: 'ddnmxw0f04pzhegv8b3wxx022xfghiru6fm03o2bzw47cm0b0bi5sppu0ipi1w65gzm7ch188otr02cwvmvp4f6my7n0xuy7wa0o1pstbkw5i5ppt6otk81ssbvfygu8u6c3nnmjosinbpxg1b02d1t8mat1yt4oxbj86w96vdj7b9hcov9ff7ddtepbpantwy5qs4cxty8f7996npfdjp2h4uih0h5p6m71f7rr9zc9lsezibrkub23bnsf9yx',
                title: '74jfkbxjbrdsl0s16b9m1e6zj81tox4wa1b8sln4sut3u6l3wnyscrlbh0aznep52yl8x881qkd2l3nwm98mncxzuqkoadum26vxjfzr0xqqxsh4xsy1onimd3pi8iafjxzthcyv7ry5y3k4qzaf90caqkwm909kdf4ynvi855ya6z6rhifhul6l02pyvu1y9akfw38jt8a2uzmj73in3jy09qykwypg482fr7gwu2p7oup08427q5pi1s0lpl9',
                description: 'Nobis qui et odio dicta libero saepe quis delectus. Pariatur cupiditate dolores officiis dolores alias omnis quia consectetur esse. Rem est sit quam qui dolorem facere perferendis. Amet illo placeat quidem ad consequatur quam amet qui necessitatibus. Est rerum et blanditiis labore soluta quis. Ea aperiam ea aperiam laudantium corrupti autem nemo eius ut.',
                excerpt: 'Unde dolorem enim voluptas illum deleniti et dolor. Possimus error et placeat voluptate omnis nisi incidunt maiores esse. Eligendi autem quo sequi corrupti modi repellendus dolor est. Eos unde sunt ullam beatae accusamus.',
                name: 'rl1l3jmmae8n2hcbj1godrvuzsl9bu8pyrdyzqknaprlbrjsvvd9c6yh8ww6zgvo8hcf5wcyhdfivpnh1tlssmnr029ks0og5drmjlez79wlbx1dpknupdgyq4nwdq8xzscxxtl818vz2bxm3k40y0gz1df75wqk9xq4zmh7wehwkyt76nqhfn5xk9nvn8lrbc2km5p76go6b2xztxo0a929raf39jbbrmro9izdi2ge3fpzthkxz8vex50irye',
                pathname: 'krq4yu1f4yhqy1tv9rkolnrgmhc26o4wldjy9js02jea8v8x9pd27jce2thmce3n2a0d9loet3a4a9nn9zpkz36jkekclhi5veynvdf6ljnwdiai4p6ewiyybhr90v7unld3ivj5urxqcvslnk7auusq69ilhttq7px7bjdxe3tizchat3q921zdqrp3q9tui1bzdo352vegsappsyg7t03dk5s14typj7cvi3wjgi85btx090p0no2eofih4tlhkut1iiu4o1b36hsb0i2ctdd425ur2pxudc9htrc5kdb8e405ll2iakr20v2y93hh82m35itt6pau7flm68y3cx9z8o1306so0t4kpblqnq1r31bi8oqidggtgw0tfl9jvqgljl33vnk5ijacldig2my3d9tee7kn6zcrr908piyp4gou6tcowirb7kuhmwkxqm7p5sc45gtqchct33psxw8jxsilskq6lfakd1ofxd2p3r94f2lssgr1prz18dvtrszsi0tlhe65uaqlcmxi332wfpyu8h22epc53yaaapt3b1zeaq11n1mctw5r1fxhs6mb3b688k3w3pi9attbnu0knz8bwzqyqj5wczq7cchcdvuoh93biks1w9r5ijxbufy955ny6c0wfzqqsco0dqxci8gcg6a0ptvat82aunzpnn5h1lzdjm6frmzgwvvwqzocbxtruj4sa7ms3i7br1j44jq9qfv30q4d2q8zfscbvmwlwxjou4ek73u64k27uxw14skzk7l5v7b7fiipyik6s8kn38kkdlmiynj2u53jfgjsirexek6214j1kvwiri61rmcjp4tvcinu2h2ojjvgfzd4ghm6x357tshu3w2ho9ohj87c57jzqm84akmn34ea3ppmnwdsr28mun5m69akyxr7s70f1cql7x0nbtrcl62tiuv168m1k90zlgt7c04c2mswl90azxvtqh4jdxzigysb7ka6mwibc7ibccviuv9ltqwyuu01qmaex8j2',
                filename: 'quskv0xhg2gktosvq9sil3pt9baflo2qddi7n8tcv2avzbow5vbfgrf0l8alyoym21roc4bcbl7y4pgcvwqbtca9vekfd136prgllo9iem3n0j6fespgy7cnudlslg555t2scipj4af4dncjkggfiwpns259c2f4wg2r11yjwgtarq1dvgjnduwqid445j3idxvxp716wx8lan6nzp88plp2lqu95bf50olyl119ufxfhw4lmcwe0oq2z3aeg3x',
                url: 'dd6m2e25y1k85n63j8i9ewqomfx0ol1qksn0d46im3othz8rcbmz7iu24f67dvfjpbone9x5lg536kcjceevr3oun682rer1o741nhtbkgnhjrd9s8ylcut0xy326l89i58tchbibhutdg6fe08v9hn0gerkr2o9sf4b396ux1jsxtz4fwogjc4ec1xzm83of2z832k9nv6j4whet0utdh21xz2jyoqmi22k3oldparnof8sgcnddz85kwhszyxedljt1nkx14uhf6i2iwaic1crn6rm1tntbmv8ne1g3r8lw2ol59nwq7f9akydjw7ykuu3keiha95053u2z4u6f0bbper6thqlz85id4gxnjpogl757edge04pi0t7j4nixh2k6c0lasb59z5uua2gvl7slwarxm3sb3pi0ehp52y6rz7wf9oqbcabtnooii0gji9areqtza6qj7kt52v2dpzra41pr64fbk6j9n8zztzofsxirkmztwz75dtaj70k6faxtcy3c08nc5e9j4jltrs1i9m0x4u7nw79hl4voqdpzq89oor9461vb966u5oofx86qldpjck474chbqjt4tug1jsip3igkbqf6o850ns0y4ya3qxi0k2s8vd2cnkfkx7igj1khk97vtjetj72w78ir0dbt4u5c4ta0tgc9g4elh6lq0y9dqje70hqlahr9tllnyirxj21a30k30xbjtx5kujzx056my9xnn34zs6s8os6mri4lq3ismc9qvumailhhe2m8akpurcad0hbabydigm9zej05qrzvgonjx2yc0xz88myiyj38f5gwubxgrxo9o25rx86kyx2k6kg1t76ouopwkladsqcugb5yqbqhr0q0z6knu6wsb32jjk3rfu6p10oja4co4vxsnr3b5u1ylz9v697yrrpe6pf4dutnoeriidmsj9u94bokg39wbypvros90zxdotceuvddrck3nes8zcxmz9vbjiy8vuthvy59f7ipmjrlw32pdz0',
                mime: '9pj1q3j6yp0hcv8hm7adk4g7zvoi93v13n8vwhtdzsy87dc9ni',
                extension: 'z0ze92s9or7vpqcrkjzdjxi2rckabng0nr48cf5qk8ujck88h7',
                size: 5503518005,
                width: 545990,
                height: 255060,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'llx1793tgro925j3nbyu34gyi2bxvhcskk68g19ijdkj9s07i6vkl3vktbicx3incbx9fayfpufww49rg44o0bt52b6ccwi0kosm7qh6e9d7w54mdvxvwfk0n75ty76grg0vta1zz3bprvlmk8bo2f6pasvbwcr5y3mt5eoday1cmrrdmnouh87fvv0da6hqgm0ubpdl24pu09l8nqdt4dpmbrjrejhiykwpp89dv2u2o08sf2h3zuf6cskn3eu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 362909,
                alt: 's6n59n5broy87m3rkuxxpnqdcylll2c9ccn456rey25kmgj5h7mmvn8n6veup8mxgf41z6ba0l4mxodno2ynuj0nfqzgt4eupsydomcs7r0az0ut9rb5cz5e1zo3ta4mp8nrb734pk6jylesn9b0jp7dr1o170xwmeztjeht9y4ljpylxtcghlnsl48mh9pqa4f6df4frmxj29db2da9jlv6ntq7ksmk1mb4yqsan0sixpteoef4ruv2sum4utd',
                title: 'osf8ye3644oiwu3849ldtd646n3jjqjmvfurta0ax0chlksizf4cq0xmd45oc4a124mj30a5w432jsu5jh1b9dhiqwvt7hacmaifsmtc234qawfsyonbiq7zaidpad5c9ym9q4ih8sb4q3mrrvpc59czpiszdllf0dc4cezbf9jvdhyjj7us76mmhw6nsm4aotbvtomc1x45qfxiltb9sspq661xdnp6xgay00ctflacal85c6ydxhplftxg46j',
                description: 'Voluptates cum tempora temporibus et in est nemo. Et molestiae optio eligendi accusamus. Non animi ipsam voluptate dolore vitae mollitia incidunt quibusdam. Dolor ut dolor unde excepturi cumque minima laboriosam quas.',
                excerpt: 'Maiores atque ratione porro debitis. Vitae neque vel dolores voluptas occaecati illo. Et quibusdam unde similique quae libero quis deleniti. Quia ipsam fuga non est nulla qui commodi atque voluptates. Temporibus placeat id expedita eaque quod consequatur recusandae. Est deserunt est ex aliquam reiciendis.',
                name: 'ayr9tsdik7vhwwm2ahtid2d7h8a4vtw3clnhhf38e7yu9omt30mboenncth1e6hifj2n7lfx3d8ux1q9qqdn2vtcduoyf4oy2u64xm9y5mrmlm8oxjrxvsa7bhynn64rkpietdqmm2lymid4xuu9h32kilaacdqpch5trle6eqj14w960gqu0xzvbgoz0dkquqfttbcy1sno3k60fxepwovenryldig1x5ysjuwq4pxgodhxlufs8bufvzupsio',
                pathname: 'tjsefp9inqvn81hf040n3x68h7sgbnzsas0zyj67gex81szj81svpfdrg9nwtt77sdqkitvdaja47hsrrs2r8lvydw182wrg4y04pt9j0vvtm8qgt4fkjjf63vd2ty82w0x9r9jnyswylpabhzon5hkinqb2rzwhuvu5w06xgo1l4eiu5xliav1sxrf7inn0a3fjqc7ij4iqjpftprza9t4u5altqisf4l79pbn7vm0al0ecfpm0v8xshnn7oprgvrs8ljt556kej9xzfxew4valj52cooasa2cnaaxamv1wqxeo719z7gstqaglpfpf2kf6fso5krgqgsty4lpsrtdt0qb91x7u23ib5351jq0p2qj3ob02zvmll141tgdph2se8vahjh5mbr1c5h7nwi6egd2ignbu1rzo97ssv4kbwq77jvsa25lzmefr4zij93kk62k15xgjihjd57see8c7d0yek152kyz0ovlv86xeo76tsx2s2ta5nn7lpvccqs108xdiq30mt1ybv7ush00zlxtcnd725ru9hvlgx4ww5b3m3pzalzllvxctyrkelcw7gen9qcwjszlu3cya81wtbuzs78ba0xk8iqwhnk7fdlc6v1zlktbovxxhthm6w6385bbe3ffbqxghew53wgk9paz76wu2t6s8j5cb87nydm7336eiq7s4a71adv77knhpcw4odwh1yfc6ey3x9zziaz309l0xm5w6ohntd0eoi5shl9bt3x841hou1um9uop0d38vt6s38fgrez1axw4y3i6ckxkt9p93cfnm2nf1wsp30dica4qdzx949e1ntb8l99yltj7iq4j535ghg2m76sxok78hgy4o6u0ekgyy0rpq1b3e9ofx64jre9c1t4uzyb4bppqx7hkfqponup3e4m2xatlt53dufngs8niqpeimc0y0ibplu2810mnwbmjdbv9fccewty4xszdx7brps19ktnrtwbitvn7gkc3hhnorgh9jp3pje9lkjnu6',
                filename: 'k8egf9r2rhhz57b2j670qiic5eg0kv91veyvgrudbrofudbamxy4z4a0d65iiafxb5i4npk5h4eiqqlwn4x9nuk066rj37qc38qzk88upsa8mxf9jcemii1of2lyu9pyy92iabtw1wq9x7fb82z186n0xofgnk5l3hnyjvqbpc8vof6519zuk2cwu3gbbu6kql54fzldtcjmidocuwgdrj6yfswxe1iw2vcv95f2phw969rdbsqigrzqbrdfs31',
                url: '5odld1yav3z86pa6vee1efyjoqxe9sm14rht4d9l6y2dvlq13oj9edqn7cx7mfetlryqbnr7k1j3d4cxjm5epsryehpxp2xu8zvrhjvqerfi87p6v020tdgsctq8k01og2h7h89y5p5ybeu022j451vveuqqa78hsixpekcgdd40px1krgqhj6z0f15x2llqiyip91zk3bffpqnv36efwv5zk4udbl2dc6uqvgdexfpqz2ll3fx9y4imypck1u4k8fg4xzzqdw9zpqgja86auney1meo3wugqjqys8yr03yfwz15ui24euqui8z4nlh2d7h9s1bukh8tdmjecnh7eadw6wo9ujsvp6l1abogr48nw83o7owzqaf2kditz9sfbp3vw79jg3oi8hh6dfuim3tlr0j444h2465t2im9nnaxsa99y0155qok0olk71ak3248w3zyu2o1mml39s5ss5zwjckee4imvuhdp9rmki094c1g85x9zmm43mza5ntf6olfl7cheodf23h651darg3u0t4su4vw86c12nc5woevjfgp5l9mhr8l4rcf6aiske7vvtx4nzui7kh1bj3bxp8m8q11qrbt0te8mxw4y0oodn5o9keewa3auva1uhqpioqp2sowg86ox9yl46rk7r8sqts2n3cssvju2umeyiwl5im7cbedao3a6rfi17irf001a45y4c1kiou2kmn1hsi1btxv8rp700tbvmy99jvrbdr51urvub70ytkt5uzgntornamlrirwbv4sv0sqthv2cxbgsyradvnjodsmioht5mkz5qwh1zwwfu6uwiavuh1tpq7pjjt0xlovnkkv8h2dfdukvph3n5uxki4l5xm2r7192piwgi7um89qgnyhrmx7fir4cl712q336h9tw773g8f3bhlu7xowju0acnksx9j0vw0dmi970lko14j3b16bjtntgimpyppjkjo0c3id5ei4lupfbpqrukygz0xj8ilwzvl88f37tb28fwd2',
                mime: 'tgrcoctdkvoo0oo299hjbnqzc98kzwe4cu1ee93j7c0xv39ufn',
                extension: '292z4xqtiz3859t33p3tflgmgcpbvvsklmyqojgbm1yfdfjxme',
                size: 8860471786,
                width: 444605,
                height: 742700,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'vwa8pxovevuusj7apznqifet3php7o876jkvl078vaco8yihwtnydhs4qvyoj74t8lbx2x8c1l96ggb3vk9zlfswvww2nd5xs13718j16bd3lq16cvtt99fqzqk1levrqenrqjva44vfvtxqaw15tspni3ca835k8mrfyusq8relg6k8iyr6ti5903ywpoz3s0qd9wj1pi6vounyj1jth655471lde6na4xghq8t9vkymcvmm26i584r6kcdvbx',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'ltimg7068u484bcmb56wrchwtpabfi8qdas0htdpe5wwv7s662m3ckrx9uyu4jepyzgilc35wb5',
                attachableId: null,
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 428274,
                alt: '7dk9rgalauzmvzcu5ac9g187b6io04bjg03d0drioza8erklzicxkqzi8mndfai2369w8rb52pbo66nenxiyrlintp4fmtv2jhc2zhpe2fi5a47ilt79wqcdspfaqp4sooi7orlqr071j4mb26ze0ypyh7yl1gkhnxy793big70ctd802du3y0gzx9y60s6j9fhyze9ehdtk3n2raj38zksuvbpgy6jt7i59x4k2vbc8wo12hned4lk6qgsjxz8',
                title: 'c9n4ygmowj3gqbt16n0rmmmmz5n9zeqtg23l9qxqvqnh32dni2vrlxh8mrshxg1opvnuliep880crhmhkzato1ywkrpambrume7csuhpm4fna74lpglb571bfjcqqnf5y63dtop85k95k3znnrqgwcggqhbtl65s0yupuok6kt49yqkw1vj9102xynvhq1mbwi7pj8lx8m1a3issc8h6mxv2v3e4yq4gu5yf2j7cshaa7qduwc3q5j92qcq98sb',
                description: 'Numquam facere consequuntur vel qui cumque illum assumenda. Illum et quia veniam. Sed illo molestias repudiandae quis aut nihil magnam inventore consequatur. Minima doloremque ex.',
                excerpt: 'Sint explicabo officiis. Sed perferendis ad. Ea voluptatem suscipit consequuntur. Dolorem sunt recusandae consectetur nam tempora a facere et. Perferendis expedita quaerat delectus voluptas voluptas id debitis id velit.',
                name: 'dkys4gbiav8t2khzr024spt9ok2iuarayh2py9mhbk3odru7v789npsxe61149dwzc38uuyzp4bikbgq3mgnpho5qqkor9flm6kq7atv1n15grjelapt1ih210i9czvnshfa5b8nrp7q1janj0vidaadffgjy3p9efliadob9dze42rrwiuofwzeq7mi8icugdvpr7xew6dddgqwgruatoe5ppu309mcas75rkb4e0nwfdrzjelgpl1eqpmov5a',
                pathname: '7cp9hqbbsapwoa5tld1axpi7cpc3vebpcwdf3fm7p8pjkvwb5b0e7502n3gamnho167han8ctjdrfsfb9m3l1e96saa15hf4sztuet5diaq9ojh37cd28ebvexf9p2k8tlvh36ulk3gbmp227abh7bfwgax9ftmtspdu516n27mqsn8l7zcx04n0msvs0hv0hrtn9heshx4gol4hw7p5s8nor5u10jkst2pmir5vthxqoaod9dfxzsdzqrwf24dmod8txpc88masziiq1gf66r3r5vb7b4v2cg7kuyrs2wi3x80w9fyulrr19zjn20ls2mc5dz28sflo6ccwoi0hoqd1urr2yuvnosgmod6ehdlfjzsj00x4t9qi1nrqb4rgaxjl1xq47anocbx8gpkdjjq8z2xqlyf9axu1xzpn1vtm0hiaynpsyjc0xt8o9z0b12hv3i03spt52ty0dxhix63widj101f1cmgntajwgaacsgtskx9gnju64qh10x30971x1j3mnh8k5irtgckqfanlwcdyphftd4usvztr2rujkah1fyou8i1jjzmz87zlgudd1t4uqtl1ri6zxhdd1j3kvma509f5wife5y5qvuucq0q24cn5xp2y2ds1uxz0hrwt2vgzuczhxarzxz5rjlgqoqrijj7g60i36k3e0corhugp44inyrmhngse21p1nal2uzcjoap2racl7uhmbsakau6t0csv0hn6urwqahmmccwdl48w7wapkij7zwsamsfh7mz71q2czpm7wz4cafw2iivqa6ijjlgq6enczqg3zjx9gowqo9gqinps795alqg90e03yvvb80u7ynpjpeilkz9a6vj9ndcb0zqjcn4vh8dfopbei4c7xxtfqtypsnzvrt3s54mowhh5ivvrgii5d318gi0ofowagq42a9us6ovtu9go2g3bs5dcxasb5qa4c93gze8jvt19qhkmc2cotst45hstwaudcobkrnehn19bsta22ih3t03hridl',
                filename: 'jfyq18laf8zeaoc77dsrjd1hc8a1njq0u0f555m3kg6hpunh5vfabtdl3vf3h04tylz2fju4ope6zj1djmo7bmpmscdgtv00terdi9iq18etpp6daa9qg9kkpao5vdhjp77d2csa48sxlj58eo1b8tcw3zdrzm49a6jaqsig68bkpuw7unbxf6mjkuliwq53986ua33hxsnsj91a0atai112s8f0wlfn20bntvbsiyohle6sfkr3bk0du0t14ao',
                url: 'uwgxol42sll7stryppygpiz2a31a0e3thvi5tpcx45v3qg35dl1622mt20mnac5mgko3dvtnnggzowkvcgq7eoa23psgukdq8g5y6us8cgivf08ywioq5ppbe6f5508x0i98nuq1bptztnuje1gofdb4s3agk2equql0n4tuln58fspbi67hfs7r2264g9grmosu7xe8k1muoywx0sz3pvgu5znuujurpqx0ly46uzcjt1iuaa5lmyd7w1ycuq9j0bcpqpkond9pab6gkw5am5tarhtju0vgj0nzcbxktkdlnz0mvtbg7root6gqf19lkg0uwzpufes5134utdwf7rhdi9df9jq37oiv3yz53uhtt78hif4z163lzm40ly0ot8zoi6gyjysseydn6pp723dlx40b03v8nzsk0yi375uej4wuvba18o40fa9nxw7ykhcwzfe04mr214am8iuq46frzkc2yslya8si9pn9rj1wtf9hav48gx19l2ape6le2wb4nubayv8o988aeb85w1gu6ha3jqayo4eu9itwt67p1oogi266gaa4emidt2a8gmwrfwzl0hh38bmv5s7602vq60bg6p86cz3gdo8gawkcy93vokcj9meix0zvub36h12ioerm4uhkkb6gwq90wjo6dmw68560ls3xj8ubho16clmytjxpj5dzp2ol8jk8jt4r7jjxuwgdhhfk621e8mzpranup36e15cejoollzqrryhxefgdf8fxiby5x1gdwezsg897pfg5vlt64g1sgftpjcp38xlulwfmrfw2alrrd8fvffk3au8ci05b6ly5caf2dx6bfg2zrmh9esmaw2b8ktth7aybk6chxjb4dd7b2tnxiz1k983vda2cq1a5vv1gygdb588ix988p8vex1f5bauqree7p7f5fw4yre2ul3ij7yu4xquxxrvergiwq71ccnvuxms77gyrrn1a2hoxmsr54uc23jhf96ia3shwgaq6mu34xybb15bavwpj',
                mime: '8pfrzowdwmlp9gfq25jdzz88hi1cg5y2vdztj1i96egexfgllc',
                extension: '4h9mff33ax27wyaank33m8jc7mg44wy548juiby5d8cfh20j1x',
                size: 9653729085,
                width: 585185,
                height: 170028,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'h4eetceqcmnp2iej1b74cdydslyiwmon876fyds1bc5tw14f2n2hl45a8frpfc04y4ax8zr7uswhstb8pbo2z916djin9wz6iiatzqgmhc9jetpx6w83oi5hdxqy3e6ka6rl3lf2w9fgblxh03c7kyf7jke330ka4rb4ldc02ahy975tl4raehs6wurel34gpawotcu0sluu3bpw266lgu77rhola2ddg96avksq2g9p1a5j2q2dy9e6j62lz6g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'dsb370n44jwyolnvlh1cue8omz7rfon6a6f1wwv1wl2y1l7huptqhiqo77tyb0sxndwc77xfe3h',
                
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 762575,
                alt: '7jphl9pfehmixiw9vanqtnuq9sjctayaz6g9k0xpa4xim2nye1bjcxne8owd02d4fkyvpgz72b2zv4lg6vvqk7bmgyzllkd3ptpswtjbtv4camoyycd40wbi81efuw4camzy2x8wzhd6zthbxop7mnnbdn781o6zyeaa56hx3x6gjg31kanjxi0a1u6zgotofhj5yupgmistix6h9kuvktyrh97n4wei8vo3a32f5sczysy4kl8xlas2eyssfbd',
                title: '8rdumtodsj6bzg2epfhqqxiqe4y8elz7nbgbwjzj0uc1c8f9qa9k9i1ijwtk7czhn9g6rjh41a3ehklugqnd74cqx1gn09xzi0deklfb8zkzqjapcqxapih6e7wlk1nt24kamffwwpnekcoid9dkeza9wyrcs4x1x9g346d4jgllae5b3cxpkkahas0qd7ewsic8qguqc5z9pd7fghjvluibhds91exy7dsrt4a9bafd6538joquvxoftcv23o9',
                description: 'Consequuntur qui sed optio perferendis. Explicabo ut quibusdam. Ut eum ab debitis dolorem tempore earum. Et dolorem velit aliquam voluptates voluptatem sint. Blanditiis alias eos et et.',
                excerpt: 'Aperiam qui eum adipisci sed id voluptatum qui. Modi molestiae sapiente quod voluptatem suscipit. Vero nobis et nam quos earum.',
                name: 'vrxv38g62gexn26pjd9yrr5i085tifazfaobo28fhhrjl1bmchnbmbn1jfe8nrxht8y2leyqld32eq4gq3zg0jhkbdxr9von3a2cn641ws12av7kmpggtsf9ta6s6d4tdyiy6xdxqtrggrtze23dt9bu2ydgiqjtx3coloaited26bs4nj15yzfwzv8gjsj0y27s38gov75j3muz0ivjhhuly43ryer7rpoadndw5lrll2494zywn6xshnk04ji',
                pathname: 'fzoe42u3m3lx8evhn3owt9o5kiwwyufogalb2ubwml22p8jo4nw5fpqvu6qzdl32cm56anitzrj2fvphisuz8tm081yigro8cvmldq9bq5grexkvc0hjcvkj32kkzme9pp4rutcf51e8c54zrbotlmllmha2els4n6i4exq4adgio16nkrnjrelcom07z3hu2sjnx89hydbg04k25g75rbk61jh0vecf7g5pziuhvtwpoa8ajkcfo6nu3j2w8zq83efo44i0lotbrek74wbfbrlxgfee4fmkft2geq5s2phcz9xlpco7kass3n5714fvhdhnpeh7kala5g86ijytb8hzr1es2u9ig3sqfuht36668plahplx4qny6g8wzhdjxkywar3n9kdxzmyfhosx7tvcpd7j981ygefr0b4vpfk05687o3yqpimm7en54qf2e9orvxnslmku4pm55ptxfdv3f17mc0b11dikareo30e108xi0g50btzo07wji5o06ml375zjxi43q2upelp5mo6l9xwas5koe5llgfto2q3oy5i0ilxc8s8kl6w4o1624znn5lgsajwks0sfun7sksqw1w2k198a6eod3zuw1rjl77psxrwy26ytz2eaxdpqgz1pa8gg7993ruz029p0526xz9fywpkunnplcs9jwppmvxlc81wed8lelx56wbhdgukx8csc87mi0dxq935uk2pxul1yu15b1wlkaur6xdqx1un2lbvxmyvqfr4j6q0qdjuvp5ayrh1fhirymb2m0g9lwdy4fuk9dwqlpwhgrgx8aln7dqnsbcrifmoobvp6d7i3eacqkqdemnlkhmbnigfeeed0nejp01nami5wzks5nnjwmddbjeisuwf20km3afpz1rfu5prfmffvtano4wm52qmhbkwatz284irkyl3h9omwwjyuc0q3o1imrqpcffim3gxeideg5rwiddieccxnkx1rf2bs1wp5uyuesib0jrjl1vgax72s4jwmkfmz',
                filename: 'zj8mg8b9xdznv1visquygvfye0hkwrj47h7i0rkd92dp56s14e7vg2c9m078swz63ncry60t6kirh5uizoth6oq456qy6uyf3s5sjj5uscobxsk0wtgzg21f0q6vxy6alzjtajttax7cizfxqj40kth1x1l7qnz50tsiwku8hm7uxx336psvpnl9z3l6wwfecak6umrb8wu8cbdh8r669toob33gsjucakral7jorvjlpep9jns8e9f0d4w6ewm',
                url: 'x1v5v00j152xzpyc9vm6s257ue5nlhnap4lfmv6gnvbg9kt7nca023qwfl5vxqy8tuwg2tp8u3k4xlzeksa23zi3m1xvy5trm8cgj6m0qe8mvjtgv9kpofcozobt9ipckdjv4u3sb4eq61gck2ut51q000o9kqwo9re0xz9znd23q7jbd0w8088zain3w0hfem44qw5s298xzibc754k2u1rv3dxyhn35t2ri6hdo2rbpt29pfmaebq347ye6rqiwtjkj81n7yz77jb8qih4m02sz4plo87p92fkrb7b01yo4oh0axlwc58pk9eysfg42bpj2bgckdw4zyjs5x37u2buzv9bdx03qkkuy6mjhmfqq31gmw6ssacekpqnk5f9nfwtxsqg9os3w0vf2a74vt4ziw19txz37avo236115l6jwad8iu164l7z7yf5i5n5ecighuvvh4rfwni3fmx3f4kp65owo2o5ckjis694d1mh0wet3ngmmr6yg9u0t0yw0qi38x0469bcxghov3ow2thya3x40o8i5cr9yefr2c6yuzxhksr7z6jf15rano2xcmi8v4vklw2mjfn5jzw2gk59h5i7k74mkroq9qy0s86d0cxo4rjv0z2h0zzjbcmw73ylrgez3yh1odwwnyx8o68iu5339lno6xypz3db6ckl2qrajcz8x2dkr04at51qsbzx9qcwnmfdi7dw9sr0kn1lne059h83lblo4ti2nlmbhbeahhmb45gy4ke4pf0s6racexzp0q1mizvd8ql2eyxawd7fosohqpn1bq2cka87f99o5vytuujshpwuimpazermz38rvg5s2mltvgd4jxac0p3dbxve6wyiukcvoilfnpqbzonsoemdd831zdz0b1986xeed37p9g0wkmudwjyjad0jumqnzro2xdt550g17oo446hbe0m2y4ipqy0sgkpa771819b5i5zei45gwr22uaomo2s1jyn7guypcu8cqmsh5hakognfxjumbhu',
                mime: '6hqmbp8idffkec2cnj4d87x3xisfa918viz3270bzorvmo9z9e',
                extension: 'pa07fe77g0kcsj2oz8ytwk32or4sagt8v6vodonwf3pq5kh7fa',
                size: 6484074812,
                width: 398476,
                height: 714550,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'ow7vnnxcnhk6pohpos98e2xuhgt6e8anm4dm2emab0gbbvmxvt8kofa276c18xoe1flvozh17wzsk5go7o7x4gjtwjsp9zh4c9tb11y7u1gsk69ynb6s6geuzf0e4jb9f09mxhxvxceivmmlq339clfflwuflwcj26bir9r60yjwz2xc6m0kwhayjmth91sjaqjqmqd2wk3hgm5deqr13kmvb2h80fsh3anoobb8nqu2d9tvpyen7f9yb38tu6i',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'ey9kqr2tmpmrizl6d9a4c3ikwzbfpd26h43k6an7lc2a6rx0pa1ozfvtnwywzogneosx0b5e1lk',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 889864,
                alt: '5q9vzyfpqopn1rafwvzypje17iijyq3218sfmeahjkzw4babz1nsxzafjj0yajijwvpbqsrk7jzq5ml8mncg2h93c2oiwycht68vsxj32kd48k77mvt0rbkz3942vxga05vi7ibyqjzjybs5et8lqh2fmwrpfbqep117cbxmg386i1gru9pcfv282k6ecm7scbo47qddvcw2ziirsivov68w2ra0etrhopk62m71bk679imm9rk552d96a1j6k4',
                title: 'zdf7615kweocwneo4ittqlkbl9udion2bmk403dlqdthbc2exgb8605rycxf1qkr0ji6bsxkn9yq38ivvv1vd4ych4mcvtxjxtbwlxwtee4fah3483n7k2ap7e5o8slggkhna3cmogc1dkr3od055dko2d1fjcini7qyzw5fhk5znfl5etrxu4iw0w3y4mkwggitegm6dc8xs5xz7av3vdcjg2z6yfkbmkps54f5lyq8ri2pnsdry4t4nhl02xc',
                description: 'Sint maiores exercitationem dolore ex dolor architecto. Ut consequatur eaque natus quis cumque. Repellendus aut soluta quis velit sed voluptas. Voluptate officiis sit nulla atque debitis accusamus temporibus id. Quaerat quos ipsa porro dolorum nam eum adipisci eos consequatur. Iure iste voluptates veniam ut excepturi voluptatibus magni est fuga.',
                excerpt: 'Perferendis architecto culpa et et laboriosam ut ut tempora. Iste quia illo sit repudiandae voluptatem quia voluptatem quis ducimus. Numquam dicta autem nostrum voluptas quo aliquid. Nemo eius commodi adipisci eius tenetur eligendi delectus est sit. Impedit voluptatibus libero. Quas voluptate et.',
                name: null,
                pathname: 'w4eidh0gbohxyj1im00mg5yehlpyl2vsxdkaa9jmjkonrc1a90zk7e4207d438ekzjc8b2jn6vl9w5f9xetyx0w0terdgp3gzfmxfj5pqhyy1l75ue6pfggniq8r20xgbq3licckc9gdxvp1vlt6151rrbh9pgbsziql7ants9j5c5prlu3hqmydaipg5gyndtssphuhvy4mmzcm45uq858vydnbpp4lbn6ztzst3yr4edxyb7hfpdjgckvxgjzioskl0nfxv342gbb8hwiohvm86w5pkjv6t21decxm1lssg27e9uoqs08i48myvi8bk563tohazmqxbss7bf1b5nt2j88kvhidl6abuargyuogoqd3qy7pdpgw6fniazkb9te6hgoe773ee4je3ugiiygfi47p7a41sa1nri4hc3b4gb51w8b7y438hpw7yfhnjai9bqd1d28q96pxonosld1084sxa6qbu14ffp7cij9kvyh0xsvflxr45kfx779z8u29osgv5w77ct4hbnxbbwv6ucz973jujs9q2p63t51c8romy58yh5w80fmum5rdtsv71cm8rgh0tb6hw2ffz6fu015oxo9usuebdh9xgko96q6p3b7pjtnxg1uzhvbw8mjdssnsbw7haz3ovt9g50xyhhk2hgl18w3xqbjlk3c1ynif3qnvdn20uqlan8rrnjgppq8yctqhpljzwdcje1bm7mq4qblh22van91anao6axrptw6znwisrxklalulxgvepkwyukn098t9nalzyhsas1tt563w4ummj0to5kij83hp82lasvs22xy4tnl9vqatwrv2zfov4q2dp02kbf9otvd4vvaw6q7sia1d5ay3lx7gz6na2i7b8oxjqed9ce7pvtq8phwveytabtql8984lfrfy55ya4jwnv8jk88i03960p582ic0888soxw0nh4a4lw7r0pt8o49iebp5pcjq3mwdz8bh92vl6hgt4r7bumvphzirr1uj1r1cmut',
                filename: '09azdxiv3bqcwvj7jq3jutt2pgxaka9uouemk12eniyhrvla4ojyqtsg6qf1iloh57gklndlake5qhe13kasxvp7hfsaihl48dvxpforpwaelvzits8ylmdpirgap5qe9fq75zuozk93ntlr3yf19wawwzq3pvwr02d5hng1kj3hlju5oibc83sodbjcn98fpcmzke9fqivtmwo8nfe6zlci3suho02xvvca181eehgtt8k7dbetquhjacreo0p',
                url: '8lq09pcuyuf3wpanchkw5q87ijq3yps4zddnfffpbudo7ap323uo2jf1reop4lqhhdkydiue6fp8467q08sztarjcwk5w177ejo12way1by66esad63yjl00lazx7tgp86pcppbn8um8r26xoplwzbbdr9gu2eh75w6t8l04j0krd44vle70e2xur17th2hxpmeh1dshwlcxwzwk76mkdocuj9qs6cvr0umme1lepj58axh31rjm13nbhfxp72c13elt9ysu3o97gqd9m0833a11l4kkztk7mokgf77f41awctjiztc0w8f7mrioc4p3hce08tbtwqjwvzicz0104ncol2jymaysgr5oa1gpooqa5or4vwq86pyvhsgnk00v7h58s86qrq4sio6e6j2yzq0fmizg0037lb2zt3rfe1o7djjekquqsmjwawxssb9l700m6p4yyb7x5q55wm7ehuogf9gq3dnl60i7dqljpns9y0clo7t03wktb1zio9dhhsh9jxxjdsssu25bhexshnou3g5v75j9mqwlypk5mt3j017wvnx4yupfx4hidlsvv39jm3nqagjrdlz6vme8yl84w8o8dc6gfumx9g1kfnnora5gewhjtq0zn3b575r5wjfnklifqjym8bboku6ff07he4pwnhqf0wf6g0v2so727m9vmeumojri7ng13oqcezouhdimdq3cwkvt8n1puctwnepelfpk5uw6xmqakvvmxpmxgchjs8dwyjr3p02vgml88q5twbmhard4twrowdsaljobym2tnincl51mf9om76vbokqas4jxpchimpmj3pxzyzznt1hnn4kdf6gjl6mb2mcv6qylna9ss83od9jnff14xg86uf8k1doxkpt4tfgvsvtbdeswky64u2egxjtolh0wzapm0ejc2gefz3gcbol2gq8avebtu6tzitpzsvplhuopuitx1c5yb8z4a5xp1uau3u05b48byujprmjkiojczdgphyunrsdy22sq',
                mime: 'ncd3w8203a5kxxmcrccqnwekwgzyqpfzrua9z23w05kp86plw1',
                extension: 'wufp516m7z5l2oxx7vyo8m3lq7skzm25ybzmbj6l2mihf9eos4',
                size: 6589599185,
                width: 136782,
                height: 103222,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'c5i7ayfy3idegklne2uha184rg499jfqkktroo7l7opwkfzx85z3w7fbc8om2guzdtpvxo2ufcembfd0gwc5insnb2peixrkljahjlcxhdredwkawxocyxy4qixd9hda5b6vcikjj6mroyfr3uk0pwtsfsbxjkqiu3b0u0zsucjt5jvzg3dy77loh9zb6rixz21g7b01j9ojrxumbngm2e4vmeuk25al0ewf1z6zfzyuan3wg0wdeatr1n9s6pa',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'lj85i5a433vo3qxfo9quhxwn226oaxb1xa9jfgz8dm6fsnkzgb7e3mi3r32bdk6w0mw0vo53o5t',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 337690,
                alt: 'tda1w7k2elt8ajjbeib9x46taugrxb6soj1ucsccea8yh5xr5s8lkioztwm28z1n198mwla0hplnskdjkb65l6cjafuh4eipifw6oj5xc731uef37yrucqh9jx1ohzwakvpeq9op6fbnerql4y48xsnwsu1e5l6u5m5mlddrqtofvsbvge1knkqvuhq0lt4u8agug3nopi8iczxlfihll0uq9u944s4jbj8sab6ej3vlsbef17ppf76qrkts5x4',
                title: 'emru31qse6yo2dr764j7ez44g52g0c5lyu2gk990ahad1x8xutt8gdflkbw016u56ugh0hymjqohscvnkeh7gyb8jlbn8fxcfw1z0vi76f70z9ugzm041cf2vk6xibhgt58fpbb6hng7g3e3cdjwxre45r9o71pa9yt6jnm0r8t1jmriisuojsh376o9qqygb7l3a6er4t9b0u7uohw0pas161n3pnj2v84yke5prcjcl2gmyvzu31thuj9ywsj',
                description: 'Repellendus qui ex illum quia dolore reprehenderit et. Id delectus eos deleniti numquam eius aspernatur. Quos ducimus culpa rerum quo quo est expedita. Consequatur et ut sed quasi. Non quam quidem facilis est autem ullam.',
                excerpt: 'Quasi repellendus rerum. Qui vel quisquam quia dolores et quaerat sint distinctio. In odit voluptate vitae. Aut sint et sed qui non nesciunt consequuntur voluptatem. Mollitia est ex quos totam necessitatibus fuga. Rem aut quis necessitatibus rem.',
                
                pathname: 'tb0c62d5bdmkxg2ngdcevs5wzg8r901frxr2yn8liw8ng0uo87uj9ldet9nnrx86w70qcb0snjj94imth5pz77nepizni81pyjy74cy4cggi2l3i2po79n0mawby2barbwo3ay31ty8za1e7zb42hfadcyk8sc2osi22oabomhb0k5q1xl4sp9atiaqlyfil3teb8tne0hs5ps01w54foigeixfly09dru1ui1yoxu2e3xf0dokmijlbatlocxmjxffgjhch8y0a4vsgkc5hthsjh17dl8clds9e41rvikhh8353ruprrf7zopegkxvpeys0autrq0f3m9soqw8qr4iv8uccw1kmgnax1q0c0a7fmu5jlp6biy3eb8eb2cbc9iirwuwm9145tnm12mb5l4zhsevzk0dfkzlcatyyuckjwt1kox0uedy3svynf3fvseccjjo3t9hhmv4sgm9ju1px89psnxr32uw4d4jkws92uc34qy9t29i3hdut1c12sjzka8nym11mon4fgv7sxos993foadwiaukz1mk6tebchnuot54mw1s1vctsmg4d1tt3ewu3e3t9asru1j0jc5xc7rr8lrtoy784pr5nicht3s80ds4dchx8lqx5tt6nx9av49b0okttrouyvh5nd2ckcjcmthbqhrk67m3vm4bwm51uai3c3phi16uu4kap6f2xsbm99fbipfkxb6lemskku73pmp97g2gifzfovp7v8k2wy1qti017d5bbpplwoaz40gcuas0hb3fy7mju2vjfyl796rrc3wxa2kcvb3hd3lji6g62bsxekc7c701x94oh4ex4gkqj1a0cl1i7k085tdi53jjy553puf1o47twpamx7iqu7y8areqcxgvwemlysqb8tpz99mkl9uwxa6inei9nitujahoq3gjxdoc229xbtwkezg6fm732818yf4d3xqxvi0h07jqr5hloftvqo6y26pvy1fgvtb84wepxtzqr9arn3o9h4ofp9nrf',
                filename: 'e1i36utdvkhr5a6igc22hnzrhcyh0dubrfinctak6tk48mm15vdwqhesmrc0cfj2rg6a7x0wqu9x6wid8zouj3twk15sbwf2jd1b3aglr3mi2xmr8zgt9vacmqhe4pdsy2xgcqa1oagx92d9kjazqxrgkiazo1y34isex5tbqkzb6xqdlnadrc1s76ol38ntkb5ebbabyn8a7mfwbr5o4ocnjfdcg330q458w54sqly20szz9v9w5oaou1iab0c',
                url: '4hgbwwphnf0lllbcxbwuo3e4ybtm462qrbrjys5nzt4mlmahhh7juxj0xl31h4cylnq7hzovbvvqvoylamu4k3l5obkjyf65qnpfpadivpmi9apultln5iyeyuzj5lafl833oo2ai4do29p9liggx8l153z3whd7svnlk7co1oa1h64q2h1zxyzs2duo3xft89nku93da5ax9jmmm56wsy90u9frz7bskxarz4hinq0ujyfo14c1dvlzh54tbw0knbwpjxywka4kcnbxjmadsi150kwl70371sbt1iams8gof555px49t6luyrws9acoet80n2kdcra3b5w39qa9hjt9jbv6dzft1ta45tp9yinrrfcqq6imixfzo837toiq85myn4viqqa27kaz6b5aptgtv15y4k4agsotey62pv6bi37xn3wm5ie8zpm0gdx4ezdcx1pvmecm5n86gmq1m9unbe2ykqnsmtegfpnwui4ht5i9v5sby0gaq1afdudolwd31epcnmk37z0b35qqdw8jakakvuk1zvmbl3s80na7lnalie86ahbsloo31sg9sfdwcmceyyafzc22xs47q7qpv4t9kwk4b107gsc7mkx234hvw1ayvwdha34gcynlhuere7hr217z19npkilvf2rusi6mbaffw20a2sc96h7jbogxj7z5tt9regn4v60s7ctchyq3176cukpiban4e4m4spd7rmmq3akooa7cvs8qiovehrex3t6pdjfdrvuqm0da9atkfst47otin3whfc98qiw2kvo30nlt3wwnysoaxb1u36zl24l5ovasswvkbfvfgwq3s8rvdjrqgqwypddvdbyz1w3s99vzt6nqiosziyx1pbl9sqz7dcdpnh5vj51unitagt9yelumdn4ooltc9ckmxezyrxooxilcz0dc6p0k92tpqvzh1ipsgxr1z3n0dw6dqdju4qg25v1iqm4lhhteeyvnuyo9dier97ld00nhd1rb9pcb7976u1uq',
                mime: 'oxi8tddylsxur3lwgat5wx9jk8pdrrzyec2ob6kp5barwu959i',
                extension: 'pwxtsucv4qhewjvgmekj2navn617ad70niphkqy06j55ia68n0',
                size: 3722248017,
                width: 626900,
                height: 765664,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'zr8xqgqpalcqckznmo7s33z8a02c1aj32celwkp5yt8y8mugya4zhv0c6o7hvluxxpit12c06o3jr55qv3ebr2l79q1dscl8hz1p1dzy69vd8axslp7akiied1pmb3flum4rs2l41xxlncv2gjupr2dg0xnq5qd17xk9kojab5lk2o4dgpj5lg8srjxxseurd4eygta4jwkc0x4n84pe2zysrf7pv6jyoninby1j18i65usipsa8mclklh5z49y',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '74mriuh7w942h4ll2g9bcqc6wxvqgwqeu9jk24qdiw60s1u776h9zqvaqgpukc5l2z4b9t3tnrj',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 922545,
                alt: '4x3ls7gzjvtnzx9ccgz3ow3x86sxhn6hmc1zzk4xm8p4920t8910mde5tqkgd78tpqiand5d2ysiuteuvmfceslb73hkzikglo14um9fj6omf6qngwkmhkmagayuo4nu2j51pijwzp6bfiu479gb28d5avswwnhew3qzsldv3tv80k2rfh68gb306a42tpykz0q0yuqt5zf99wa7jhv3lsns8m9v5nrh78giwlgknets53aw8359ere733u5beq',
                title: 'vmzs4kx9t1gxey3d616yrf3idobdqeyv5ivvhet7ugvhd91jx4ym4k79jdt76zwqcvzzesh35t17mulcf8h255gtldf6xun2mxdf6yehe2zg1rlbf4or04lpvgdwyj08o159d54dh5llfj8x56lv2zjd3xc17cywrx2re36qh0kjeaoo64tlq9hn3vz7f41p7pw938nr7zb7jvs10wizj6gbqvuqyhu6rnoenbazchceowr9m51h32o04ozxpue',
                description: 'Nihil adipisci impedit. Vel accusamus sequi officiis at maxime deleniti recusandae. Doloribus vero quis laborum iusto et. Qui delectus omnis sunt voluptas sint fugiat. A quos dolorem nihil ut cupiditate tenetur non.',
                excerpt: 'Et quia sed rerum laboriosam nihil ex quo. Voluptas voluptas voluptates consequatur placeat est veritatis. Omnis reiciendis qui necessitatibus harum exercitationem voluptatem beatae numquam. Ipsam quaerat dicta voluptas qui rerum quo tempora.',
                name: 'd7dlj1wvoibtr1lmvyieb872grpvo2kvd5b85qc9u45e3pb99w4l7k5450tg7n67qsrmpcoz2fbyf2he7zu3crr4a4foilklo6do8i4mupo8o0b5i0te8yp73022xe8ss49e31wgcrsg0uxeyhbcws5vf9o7n7z53e9zg36ve70hjt1zzvx8ajnpbken5m4ow6ck0d9phcsu3es8va06587riiw8bg2foi32c567cb72rz3yw7k34a9i0g2atd0',
                pathname: null,
                filename: 'haiwa8xmw8mkxjm517xgbjdkvcamy9q3rjirz6aqrfl1d1thbpywbqhvix54gnzkavekojen88m8e6vtn9fg38f234j19cr93am9pt37w3mnkiwqm17qyfghl3sqakikqfb9gkrivzjilzeup02utnc10n5qt24x7ehh52l25zddee6jxs3vrjatxmlunyb3u722qtbd9d1u9c01jwzvf7uzzrbtc5qxfu0o1e2b2v21o72tjx6qemmy31jx6fg',
                url: 'c555ipc7uas18ks1r9hd7u0aaq8m1b6yu4fvjzxedfag5mymbnin9mn5qthwn94kjboxju4s08vjt1ee621cu111u374a60chby12gs3lotfs0nr6idctgznes3t2kaw8gdqikjav44zfrgxtt4f7791guccritk28ohj7dnvbque2rtw7mfgtyqhndjhs7bcamtbh879ljz17dnlai566tay7u1p0m0wmfj2ggdkidljvejooka60x3tv8glv7vxeto34bk3geo8p3n8dotzfcucgw05k9vysrp6bmggmwrnfpgx5xxj6352mmjalzfzkjrdv7ki4idvvj1i3d14d27upelzqn9tvanzzjkt8quxem7etg8yaldyk8p7sfdthssjtyb3ejsr35qxz7g1ajkr9kn8k9od4crgim1ujf4bbn3slysyazjm90czdb1x3bbgmuwpgt5ulkxk8o4a4fsov19sy9jqu2f2bi709pj7ki7eiudnfm2fpp4ge8za4cs2aflullm8y1bpo2rck8wxqsw6d1vpvcgvyztidh8ieo2hm1jte346eu8qc2nwexkobrg1d6nichrgz9qi9lo58yml2an33vco24f80tfcta40r49qe50l8ezzw0ugazjbmwfghkwjfwc3z9hfb2gpcatd9l32mgrxmhkgfcbqt1e2an9l70hie6cki6y4ejo6d1zzofcrencjkyydy00gj8avibddg37o888eztfa4k9u303rxilg8k6qclelinwtn5oicin1vdape6lgah40rqqmwvokjdc442upcfuc6va18v3qgn03ij1q08q9z8b9xfwpjjlyc9o8wappyc5cfurgwf09ynx1wmimu8d49aur8a7xxtbqxmu7fpfx18q1kh80tff79msg1utpgki2i8g1e5n41p13144r4ygsfdlw6mc2ielul1lu9faskdqskdlxyja232y9zdx3zuadw5f600b66pxlw6wrw0p25kzwmjkpznvc7xcimhw',
                mime: 'zfi148238x9geng1z3avuev56t6pji187ile3z5675rav5vxlp',
                extension: 'gb60oqhlsi1iiivw4344uzuowajhkomabhcif2kh1kywy58mmj',
                size: 9392706816,
                width: 925016,
                height: 375463,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'rrf4hc1w2xifjgpnf96tsxlm3kpka4zeoyckidkax4ay08s1bwe9qo1nlbgjlwknno33urqm9r26zem948dhv0roo9q2hxxi2oou1amh9t7q9gtkeclwi3orvbnalubsyfdki9gcoph95npr21m7si2c58ll4fx4noerqzh7cxilngya5adey0fybcq6zrc7t1d0vdd14lccbf7bs6nq8y8igrmntgfdf3xk7ohn3a9qcd69rl5nzkui7w1h853',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'bip1ix8hpbddyiplih672yz590hkicazqbe8nbxdccpeeywcakhdqjwh162tjmbowvzqhua12um',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 253679,
                alt: 'ffbfpeb2szx2ccyso2x9fktxuphh1ozg1yooiasec6uk54u9nfbsy2joz4mkbtrg1vh48i3pj57fjknl3gpa9q9fwystzu0zn3h2c2bpz2qykjjvr5m44f1a5pcywa1nzqjk31vs31zo1k3k5s9v95idsahsaeyht86txqxuzsyrg0cmdkks3qhm6i07l210hcsh3adzapewfcbbz4utnmy0u1ags67p77j1q78kz5zthudhlweo7okgnx44125',
                title: 'tvktvf9rz4019cfuh9nsuj27k5onmpkun2heakrqcxgddnhobeysq422cmvju7bomaelmupfvg8orhwkm8ez6tw1vjp0o2q3lzm5iefhgj6fivd3t4vb97m5hteenaixcekhfo46j9erqp9ptb0uu09cy10zm8o0khz42cqta1ci30zdihknol9qrdtz4dmini9w74m5ddsu4i1mpjhz9w0mh0ji1db79ty74xvhv1qdevchzjk70ngg7lsp9ld',
                description: 'Aperiam harum perspiciatis. Iusto deleniti voluptas quo animi nam quia ullam. Nostrum dolorum saepe eius sapiente.',
                excerpt: 'Tempore necessitatibus omnis est dolor. Itaque sunt perferendis et qui. Tempora error ad provident saepe veniam cupiditate fugiat laudantium omnis. Non expedita veniam. Numquam quibusdam possimus animi optio error soluta error aliquid quia.',
                name: '9n1slb23gevp4q1vgwkl1bs00ohwvo7imx847060tvz2aw5b5e41hs4gg6jnyv9m2x4gl5w12e2q8aq7d5taez6n3wkgi3cwi7rokfmkkpej735vmkrbujqx779tqh1hunsoejmpbg9n8ajwcvg86y7fwq16cdnnr8tag99gkvh33xjbmgsmilf58j1y49ceclveyn09pp1idmc8r37dya7ax3dnp01kexv4g1jv2xhaqn72f5nmvx5c4ax1vah',
                
                filename: 'upv5j67y0hkxtq5vvm1rk3mqnfffpg3g737m88n8affzcskw7na06rcauagszp81q4d7wqwarizce0ppk3zm91qlftlqwtcwaaanhtqufi4efykdmfr37p2sqv4emc71m2y2e0tmlfcref4cypv1p7jbhd1kx9jn927zq6omsxt9p4zltsz8brevfp5db7mnvj28b5yswk1de23vbi0xdzjbwxn1yuyloyeo8hc3o5994u8n86lzpfkdzdret3b',
                url: 'w4a8cfb98wq0wknkfh3ttptmnxncb3h8puejcvr16qz8hxuuqadmzjpjbpm3ny1w4be35cdogdo2ljhay7dal98wrx46ys3sfjbk83spjqio3lgq7yu3v9ms1fo9sqffdprnhm7wyvktz07fezf5e5lz76s1t49fw6awvwritfg6rjcgyn481aj3nuzojiym4gkjwcufghxd0ozuaoplskc826nr2ky8ypvo8d5tdv3eq3xtrnx0sazimf75k3s8h6a926sng98j0dn24ac3zgto064xim0g65sfo94vjtemu4uyuxc2atvbvz8v7y4tee38jgzv22jp9cn1j5k1sr11jb769sbut78uea2xkp2413cna9us4fjt1ee9wrbl20icqps389r9nx8boo6c7gr2do4kh0gm4qrp4sx04bzfumdr8fs5mc2lt55w0zhvlmuxy3ih5q2ayk1t6uaof0qo7xxjurnbnbpcf5f06oleuh4r0imsv3t7i2md6ivbes92wmgdp1ns4yvt0sv13mxqud8k0ou87nrnlzkpn1mtntq4nh08eozpqsmpmkaoyai6eekbn9qo35wh27ho6avk3w550paaqypk47hllk79xkw5gjv80rlif4hiaozxf53o6pbn23pg8myyg50qwlyin57eqmdwvblkoyh8ae6hihp1kderb079x2n2qctjgvmcz56tk3yv4tq5sa7ceuia11nlfogqy4g53s4j3fowp73b025x8vq784g56xv4p1xhwayiw3ykm2hnwghaqq8w8lo14s0tm13sfd3y2kmi59yibmdjl0niw2rjz8x2lgnimr64q2zcc1eghk5jf1l0e96umzbgm9zqmc2awz6pe5m6br3bn7bqcla59ieivvc8y1rakv6hponrytp31t4godybxvxg8wlj8vfvl11hhlp1nt29yhe2ga9bwzxwojv0blihvhwt2jk50ex5wikpguateod3tnu4lestehgqhdhal75ubovtl5rj9m51',
                mime: 'kvrm4emeakzmiymwugicgo4981rcc1rg792oitsbmsng8b9ijc',
                extension: 'uosjrbzdl6kveshpnv42uffkmb4jrdiss55yhxpuidm0dgd2vh',
                size: 1315911034,
                width: 927186,
                height: 445701,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'vbmv7xowtpr69rr22blqtuycud3wl922kd7dch4grma7id4py0l6jn2al9jxu3t7kpesl5048wjvq2y0otb5lfu8u83ahbja439r7aszsw8214rlymnth43nfvlywg4k8mrlryefqww64jjxd26ukc5gmcpvldsepl6z4jpn2f5m0doxgyot38zai7wnkmwqj5obgoqv6y8ow5xiikcql0c5j228aha6l25izrl6e5c0xcrnkblar6eoqidoqd3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'fubw49fg5vtwdz5jocqaru1n8r2dqsswxu4b83r2pz3m6dd9ldf56vapuyisqd4c0bj3fu7urqc',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 742050,
                alt: '5spfjbddsfpjjnv6snf6hf7dr1tzwd46qd4oshoav0mi70081s8ifn1ww7yy9429vj8n79icvjt1e3usbegii1bl9fmt6unj4hqtnu0171q1w4q957jix5wdof3gi6jy12mxpp9iv4pt7aeancz706tamnb6mcm0tgtlio50wpoefqpy2tqd2zkk7f94inllzvp8n9ca15q3h9h8yc5wejv7b2ntumqsxatmqkyx3fbv04bv7u2g3pzsh48qrki',
                title: 'ug08df5f426lmwfh4bto3zr5l0r6m9hz1zpz7iixt2yxquk8w98gqlwg9kuzrqojvdzrq1ojiwl7ckt5h9rkazrkc5a3n4ojfg589v5k0jkywiksm8lro3f678a3q55w358ywvhx9jhriub8ytnzrnbfamdse1ci7sd02hudrie0v5s90vy1zvmla8n364r7k0ruuuxs3xwsfqlyfkasi29t5brej626d4xkcbcs4ja44l4nlhj5uiv30uwkxr4',
                description: 'Cupiditate laboriosam iure ipsam voluptatem et earum. Ab sit omnis odio ea hic dolores alias. Corporis id voluptas voluptatibus omnis porro ullam rerum. Dignissimos asperiores ratione aliquam labore quod minima nobis soluta. Ut fugiat neque.',
                excerpt: 'Modi excepturi velit earum. Qui esse omnis velit quo. Ducimus sed aut et temporibus voluptatum accusamus maxime perferendis. Harum sit dolores veniam velit. Perspiciatis occaecati ipsum sed culpa omnis repellat labore. Officiis laborum laboriosam enim et aut autem officia laborum.',
                name: 'm473mueyhqzeubwjh8szbwdqhzxl05xgz0q2ozssqvt2p78vds6v9lcda8j4a8zmtbvzwzek7he0pb3m3b3qmfw9tga835ebs6ww22aghf9fwv0et7kt2u0pwk6rf0xjmz3nmwzu14qi0mkl9tg2unp9t8okg5omb15xnaen3j4irrr2oamsvb4ut0ggvnhdnsbk7shurkqqacbpyu7bqsydpegzsv2qv8ea8h6nvbvbvjcl32ai5ejl15izibv',
                pathname: 'moag10zqwa406dhxl3j8z95exvsne87gr6uw6n6w0wyskwq6ua3e84vi9i3dizo39ctflk7m0zdql43mtyprzl9dibpqiodvdjgi6v50e8dare2cwfsy5s8ehe4ml21tz0iic153g7rwfh5sn85dj3igly2fnwi4v6mjeo3eqbuf5ntldmpzgikonsusxc32pqs7x0dfmxppjirhhutjznpntgrybbius4ufz5jrglol798v3ixgz08c0a2ygdq19i9001o6twkb54uo8h12npzbvywcxzsu51ibgv8u8clw2obt5hcklfkkw631r5zq6gv0dcg20xsh3055vmgyviy3cnu7ie14s13ed057nsq4vtup6mik478pwgt2fuo8wkhkg6r0e11zg2wp2sama2g3i7sjg6d17sl0378xr3wtofw58pvg9djycs2frngg2tbeiedx7cen4ra1lhmb71yi91b28c710qbdh37ak9rdem08gryj1bdkrmliy344bpj7jnqf4k4ncq5s63d4e562ie4ifn9debh8e278041ssh3lcwp99qr9y3srm7d1a86oqyt6mcoo6xejo1x98gh2ib11lex2tsfmjbsvbakx09x1c7ihjsms2iqjan4p17rngvp6u13aekg2pk4wmuq0bbh4fy2m4q9a8h9q64eyo0myvoe5kz2gjbtgqqf4uz17syu9mbgpsyoub9ryy214y0f8d3ygeach2i2ryg8a6zldso5ih4r5mjojvav28sep82zq5psi7s4koglatcwcr01x4ut9o3kyqxn9aboi8hhw68tfxkl52mcou85dlqss3izub6xi6opp09rsn6k5nek6prjrbaohsol2j32t5hmi8fwm0gikobz59vgevyx2jf3whe45u9cgu1s0oqev0bo74i9afvkm46zw0etz720ymyx100881ga76xr1daphv24o9yqdd38pxenhosq4izi7jj0d4a3xvk95vm0bke79uypvljkczeiqtnpb',
                filename: null,
                url: 'hcu70gqsgdkww4k5n0j57uwh2b2gwurgmpg4pn8v15479edcplp4yaxuwmafglr6ycya3fvyt3zsi9hkj569692zh8jq1zemw3wg1l2h5o3pv3foqrtmy2tmemi0d9rfd2wx2fp34a4xj52hpbv5f2h7uu52vrwoor5bcyh3076yx9ussceyn1bhuiggif1h7bfzrugn82rwgjfcj8ixy4wv45u9rt81vuqwf4yw398u6kuumjhnh2d55dmpr8faxo3cnxtw7v0nn4846728hgjiqeybl819axi9l7af6n8f16xmp85yx9gokqwyy6nnlnwonmn1cwok7bf1k50207rkgg1qx7waueabp13889rpjp24qbvq1k62r34zthgocfaqcek8wbpwr2knerumyzamyktael0mqnj19i6c4k8kixm7cs9uauanq8bccerqlbf313c8dbytbfmicxrzpxtw0y8t5n3fzmu2g7ort6mwuyytob1dksnl7vzeaa6fiw67la94zc3vjqg1fxwglnijnw3cbokn2s20xxorsimwlw83zh41c1su0n2356lk5cf3mxy612xxtvna926h13m4k01awn8zsr80q0pnd5vryw45j87mu7l9uaohws6vpl0z1d89n1uvvzkcv4if09vwwxjzl9caxb579pa8udvz5z9mgm2dzsvvyn00yd5uu6e754h3wuetloxdht51sy0xylq0gj70wxt6mwfg9puo508rvq23phupflb1wefxgkc6m6flc6miana29ws80cwg4va0tykwb7ljrniyyib4c5wd1yzj6v0c8b5b9iuzsy4tdm1xgzmzl8ov8jlml30ahhxe3wbkohvqtku9zlg2m4vpsl97m7awvxts7rj3qu8npx4avlkif0vtf7i5lsj4fnjca8s5i07t6wwifxk22ekjxyw2zs9yvdreh9r5qrexf8xouqc1jkb5ev76m3cnuutqfm3v9qyhqqupvby22g2rkpobnjyj0yq4lbbb',
                mime: 'tc444wamuyq4vp9w8p5eqhoh3p34zzujnxkpjtmz8xmw2iynz3',
                extension: 'l3ko5n6ug4q9yrtauyl8nqlcche5wikcty9axos44hq1jrr18g',
                size: 3936729760,
                width: 816089,
                height: 378190,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'c8kaoc9pvt0l39icp223dw99uwdxrn1q6kvhhr7i6uwleh6r3k12jjcoktl8qjkjn4v3p6cw4n8qtug6sua1sr1qki1gjf3203nf6ufit98qtlih2pcgllmk49jencixm8qbux64yi1i11v86xc0oy4kyf1d8hresafoip3duaei8nwpr9mzv1xe5x7q1ciy5mngwgzihkjjoey0q73janj9jfa3s9pqb91jpgpzmv8qbye2h2x2wtj05l0p0tj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'w5p15o3cukulq6xoio0uasj76zq6orzfjfimd29uk75vv0g8arzm0cm4xkymnabxdc1k0aypg78',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 196547,
                alt: 'ejiljxc5w9six9madq1wvmen8jl8n9zsr24yp8gqr8s602xavtojtrvznp0w4jbxv6fzvjxpordai4r4dfycz7qppd4gi7vdi3jjabruauvto622y2pnvijcxaf89da48eb6y9bgcmi577efiz4rzrbkeniatpr7lvaw8xlgnhon397qccjzxh4hoqtizaxeyrfc2r7tqyfrkpqz54vivv598rnizt0f9vs2itfgrh3y50sn3scmqlqdqeoou9t',
                title: '7uuo8pahqlx4poxpbredx3kq5vnx0aah0on4c4rp7votsl16pi6bweoljpo7kkyne6wqerbyd3pvxgw2u0qlm2lxvv74vjl8tbzfelxq53eyfnonoyaq0rrom4a4wtgycx6yxr9870dm3h8w63y6u9vppaegt2dwnj9kz8dlojonlcqhtusxqrli4c74odf8oux11gg51gdfy33uwq7ta5qyfk6eyghh3j9evsu9e2niwow9h80uo6zds5eukqa',
                description: 'Incidunt voluptatem autem iusto. Nulla excepturi perspiciatis ratione aliquam. Alias et magni enim omnis id deserunt sint. Vel enim non quaerat voluptas repellendus eius. Voluptas quibusdam aliquid.',
                excerpt: 'Error ipsa ut vel cupiditate laboriosam. Ut alias ratione et sed magnam est perferendis. Ea illum voluptatibus enim temporibus optio officia modi.',
                name: 'zs7zwj3z23vddqdlbrfnyyvqu6mses0vos1snuss6kfdhzubo5knjuo2pe0iw2u1sl2dnbrvn8fdvwi3audadk59m12ggjaeilvcj6qn88soowdwqyyraxolo7po285yb0xr7oox7qjzj7kmywvaj875ok9kkgig5ro3wjk4pgzsbnbx8qyhwh08imx5fxuj4q1hjf49wjxi288l9uvgrpma1cbsx0w6x3e8b60cu9cuxg9ktjxmkdiusvjsmes',
                pathname: 'i4rwqfc8ul9szjbr3h153bsy6o1qjtmu6h2961u7yli04tzxdrcwec4ifucf3e6o7iedf3up4h32fepo363hiiu78e9knp206gggyrjwfg1y3ao4p8bk5n62ta5l0bxehbd2gd19ycot84eaeza58hz8j3tas6vmjedzu5gk0kwfpgynenhrgxcp61owzi0ahgjwu5djsivvasts3ibnq1w0t0u2359bku7dzswxlxsotbgi50rk3vtgpaxtfyowhvenebmodpm19yo92ho8iv39dr1c86jhctfdpqet2qo3bkhh66iad8hjowya5jn19kpxcpc7lxl92tp6nakum9ecboatznimxb1msvw0ubh6t756laty8cg059hy0y1u64nj4fgxf80cvapqvwx07fbic1eagbghk0885i98s7pa4qb2sqokht48lz5sbz9tlqi9biot3si1i2pbcpc6gknyi5ylwhiu1e1dmv2jgux71xdqysmxt9vwvhrvapbvin1rxl79gyr5nznizvn1jyho7cjua81m9hrwubjbpi6qziz8216zb8c7vmuy75gl832ch9hna8xetr6clyj76sd19xj26f7blcb14z1xjpsyf8zuzby8b5clovyx4nhohu3psf9clbarqpnxlr8vnps1vffq7tgcbyw48hvk2iv2hz1xaevlbktg0i2v1sih7iq6n4z4dfovk3ez98q3luabyhvtv6mze8s2fdw67asjhih6ta2jx1tiprt6vydi71cvuftdw7tgw1ts93r1gsio718xarw7h8kfr0oq27v1js19wg4ijh024o7r1ngutpx5po9lyexlr6isyu2oeurrzlt3cknd34uvkd86geoybermrff3w2atzhs09kc9vbbqxq6y4t3vpjkv8a0wnmjacjdgmghmy0emhff1tnjh9patu8goeu0vlkegitrd0jc06d9tkfyqiaqkp909aonzqselqk4v96e1g0t3u6fg1g3bjamxwwe11a8ihpkp',
                
                url: 'zoxj10lb33wknyfl7bhk3srs3ermjls9e9rno9te5dne1gemrni6f32d8cv927y2luto91fmbe0xwgms5yzyovhuex4r6knt9s2oxwddstcliz797mig1d03w87j33ycpooeudbi7qurrxply8odd4eg2skyr8ul92x2djga7i55pfjab2ng649b5kp0v2d8bh4ttudqnotp8fq4ac4ce6u6v4hffz8zmomp4ufic2zhejo01pghl05618gm6oiwxnf9xoefu0evs2zodnl63s52gvxkb2p117mmiy93vljad2q27r3l7qgv4yxmfkie7b98mwky31xqj3vqub4t0k396wnh8nkjws49k74hq1mrgakh0yzpv5nn6eaf9rq2irq2etjv4ebw8jdthvha0vfnzoid1dq0br1w2w8v6wyjxm3u9e320nske154blh4d19311obopdueqnu9lm6kr8sl8f4z9z1bs89qznpwyl49qql8tdd34jlg1h6jejldqtllr5ij26i9klxoleze6um1p8eifutq6os25yggio0amnmz318cs47sak54wmq54gsocq14ik9ziblcp8naf3hhp52s0b01bp8qbn2qcbgh4dan7l79kl6epmeuiv60d4beffgdde6twn7z33fusbc81plcixhvvt4oczfh0imgx5h2pdrnmu8tdfz0949temc25ts7v6xlhkm5lyo1g8yhpwnnvqijh1qcfkd0hpfkrvhb0dfhgrz6zbu6jq27qs630cc8fyyrczi0e9saaoiiub12vsf5phiftmz8fe0xny2twt6vuq2tgijypxo5ls6oo1hzyn75t8ciyvxcpnqloppun4yyk6ghxt3abf5oomjbvjlopdwqkls5yjk2d7so77yqgosfv5shfeefh5efr06wt4v82l2co42bo2rmc2a7lxpl7sie7sxgrukcw1bfou0qk2k7lfuxkgr4xdno9q7k17rlxv2993m57rh7ze8etd9v92pldza3of8',
                mime: 'ofou7qy4bf38ln0d0nj6f1w8xnn1uaibwyavpsiow0723vmwpw',
                extension: 'm0vfa2v09syt5iqu306k9oq0g4x13xgojjgw517lecqrpjsxmx',
                size: 1364807642,
                width: 723919,
                height: 428370,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'plgpxsyqigs2knfxzbj8hzn2x1mrtpt0ur65jgzd5s32pencsrmqoyqubwnkpfsltoetnhuhgbian4es2rkbgf93g5cbg9llhvcrk12mon62recg6kjq5wy1p0f3tdpy0wsorv0w9qlp9t2a6g1ie9kccdueztsp87r1j9erpdnnohqslueobffa9od2fu4tviqx1hmf1xnuvk6iyychmlh6tjou8s75igjwe98chzhyyiwpcd6yybjwmhycy1v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '7azjr1xlsfwrkv1hp0e97egxzf669r7ens2azg837j13qd9h1lw9qijub7746upilc1q4v9xfq5',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 360971,
                alt: '0so3kk4iyxjhnnrcw7qj6lk598otv1h41r9xnrzcptah7uytosnl7lrx9y9dzk4lqx8petkjztww0ow4x1tm5h3ssqtkkb98vel0qz9lbtvq4ko93up58qbjllh9cqy9yuhdp0hekm1cy83ld85z9xnand1ra0xq8r3edbdaw9xti3fpe4z09wzesv3kzw2xxq41twmszpv1hte6hzry824ujmei0sr7rw716sdnk63w3evqhbp196d5pcnbzbj',
                title: '9k1y3pv9p3uhi00gcgdidxt387d1cg7dvmui12ejqm3kxoog0411ywg0axazd435s42qlfkqrqxbckz92iaa45gxtuzqg2x9hlyuj85ahoas6bnbfffi4csywslt4hjo5r8b0b4tlwypf20sm0pocggh66j8hghg8c4ymxzhjwl9l9ij2abaclknc7pnajg2jer0t6w19vuvwkqn4br97eylcz9hpxhogi0754wkdknic4d8w42thxueuyhf18s',
                description: 'Est libero nihil libero repellendus eligendi at est ea. Omnis quo atque possimus qui voluptatibus eligendi. Harum sapiente suscipit modi vel. Hic soluta in sit doloribus a.',
                excerpt: 'Iure qui fuga sint maiores aut facilis commodi voluptatum. Corrupti in consequuntur in aut deserunt quidem voluptates voluptatem quos. Ipsam ut libero voluptas et dicta qui delectus. Occaecati eum repellendus iure vero est aut a totam. Eos ut soluta. Tempore consequatur consectetur accusantium dolores sunt unde aut.',
                name: 'nxp3pmmhdh3p9n3njz6tz99m7joud12ecoon8wver1fz0e7626epg34txekzrxhyhm8mctnwyp131thw6wguvyfsncgr5pj0uk8vi3v2l7n6u3juri7mwi3khddw200izns98g7u56dswiiko91chkmhk0l1on1bjuxwi3rhqk6ahjgr7hbi327ricdc5ir16rhu6yffbad5b3kl5uakza85vt1imlvwhd1cwt94ushkle68r39eyjmwdm7nyo8',
                pathname: 'q7vvp4pliivrc48844nmy320msi1it10rjdwxkh9luhbf3yw5d23qf1izai7dh00cnzqqxl3d7cm2e5sfaygdcjiydvzfsa2i2g0m5di6u17w0q9wshi05q9b2htdqbtypwp3hlqct7fkq5xhm505pzupggq70u724j871czsh5pzpgah3i77qlqo7vqygky1wcfop7wuvam31617eemunofikykaeee5m4hjbvzkkpx5sy9p94rmuxhkjyzt3o903gcod8oq7fcgrsbfxurry0maosaf7pdu2vr1gxtyuxuadotsniuc43114l6eh3hkkvjynz11ktf8q4luhtbtupi29yjp9odby5g0f542ok2yvogeydt3h4ywi8qmh16y7pzg5v2zx3telxgm65vi89qdzcn3fs3df84qpk3zd95hsa2hwzzkg1zvxxb33c5mfqbrcgyuwsdcz5r3rxz096pjwdaga5fhu4gg7sf8oy25pljhf86wxscvy72c0fdwas19nlrqtnqrvqz3djpbbn1cbalqwmro1vh69wd6h0gtr01c00flkz0zrkqfsscma0uy449aplxfnsagxi421qkas45ncuu4p1l2f40pkj86amu5dg5lb07neawa9mz82xgr9hy26txo8jezu0lxsq6kfwqrzte3zrei8ets1ep02gf6088inn1565k6hpgietw8w0u2yrttuig47r6ikrd9ogsdur1sk5ws5gpn6a6g3wlkc87r22n5wvy4e4ok5r1vv4eq5ls0cvyjqud041sevy4094g2ev5sugbg6m0vdutpogaveyb9khff9qjuss8xiddlekzkts6ui5b9xy4zhtzc827dmeitv8r31q7fb5fquaxcf8znn0a00o8u4mh71gyf3cv703ewanyabcbjrqx6gxfchwlxqn2lm6ama81ped00p55b9h5ige11zfc43d1wtn4upqtahrctvso1irrmoyj82cf2f206b98hrpb9rdiiulr4nx33n39',
                filename: '3jcomwqkr8i6k4u0ha0fjldqquuxrldmvirduotfpzgmr22ere6nkio2zzkqzecx5e9jtlg2z82qr5a7npy2npn5ly0nw48p8h91lwc7yrd6nj7ihzpl3s51ze8irtkdq4wh19njpz0f7e0g8mz86frvq45t4eqbgupgkgf0zmlsm94ono9lr9oufrn2yfprtkzffdavl4ged4dgmkt0q3anoe04dz87vzdc044jd6vpe2ozagjr0rdumvmlw3j',
                url: null,
                mime: 'wulhqunjuewf1r5rt5qgrdnxy830vjettgrcp9rdi2ha7s3l54',
                extension: '9efwk2a25e4o0wrvx08oewt9enksyy8pkyby2pjzp29on9lylh',
                size: 9727513243,
                width: 863275,
                height: 205051,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'v6835dsuolilubcnq2mae20whuw7pvh0b4840kui4hrlfnk77r58lg3ve8836dm25q1h248gr8otu6qg28hnay63a6a4t7me5t8be4hmmg6tjt6u9ay7rjg2oblc21d32vng718vcpbwfuv6vgabqv9k5ybrlazaaideb33gl8zb9allarkvfnz7ngymjwgn90tthiwe92hb3u7uxm61xjbcgj3x72e36bnz03afmdklff2bdpzdcn2vpc117fz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '8brz3jzr09motdo2qo1vcdty38n9g12f3wspaa3h5fbumjkhnzw3dapu1aocxagp8ik8luc7yns',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 865863,
                alt: 'a5g4rrdf9k5xuxefneuj4tlfktv3r8vsc1xldo56rzyyfpa8h7rl16xx0uiuzc3cx2uli830x1btaip1iqhvuy1csux0khqezhgmltlxtvvlsw2by91rbsp7edvd3v3qmjnd7jymsxbl2jbybcqr96v7gamovt3r5z6bfcndoh3t97tdkitqa8jskjphn0hfmh3n9snvabo0cp1k4rojbo8jd5vf090c2otkn8mbfu9sccuww28ar5gcsb5yl8y',
                title: 'x5uqh2yhd63bzy8sq19ayojodlw5yrtvayw9jgm5tf2ybvqb7nsf3dmodm7c95q3w88cgtw1j43mdro6rkobbt5w22tjg3wn560gv3j5xrqrc9etx8wgrngcdeu848je4k0b1w6pp0r4g0ang8diofyqs80v1o8030m6udeiemc7js0dnuqgu9jgrq0nmdmr57n7gs1z654tna71twgvyv21necqd96z5qss1e268ygpeqmpma5wz8rbexnng3r',
                description: 'Id aut vero dolore doloribus quia. Tenetur ab et consectetur aut et qui debitis. Repellendus est repellendus molestiae velit ut natus ut. Porro consequatur aperiam sapiente occaecati dolor odit consectetur excepturi.',
                excerpt: 'Ut dolorum illum sed. Porro ipsum consequatur enim dolor et excepturi. Eum dolorem iste dolore nulla.',
                name: '52rmzimtnw14txvjc4jeo9gfvsy8k95s3do0m6j7nsff21mmcjgr3uqf74a3uhzx6z9yqyqc5o82tvmz9ui116hh776aq69tpns9vxq1ao8c1lx17e1olpe4eequdy6r9g76pb3eu0zt2qsir271c3hhyiokjnqh4ibjpkhxosmwbkqps3fj4chg04p6m8t2rui0je4ywpu2l9eyx3jr3klb2ctklnvtes5qosakixx8msb6wmt66tos9mbujip',
                pathname: 'mng0yv6xgkl35s3yko6etniqh4z4tu96hj7n1tdg6lcr9piasfyplrafi65pqa2zwetkctt40ojklk389xfnufohiou572zp3me5ioeu10bm4vem7nloymuu3y600gmgdszwj362414e3zmzfqewx4njup671qv6eyow6bf6zibdiz2m7gomjyl6dq1g0llefb9cjtrmrxhdkl7e5r6bffp57cwzdhmd6cbdennvozqlvyjt04ndwyvaf5mb6hy0bx0ke9k8rqohtdr0wbrg3k6ekbsmyqcj74y2qrk3wv9g3kskmqk8jcj4vcb958n05ellis3mt2qsqjmhtgsvjqhhvtgfidlsu4eikpx0t2vt4gn4jtg6op39opa5mjnth6pj27vpxa78mhr7v3qrssy7ftsv0wxyg7ect8bt76oxfwlpo19q70yk793dlshcpdskgaecpts8i0kw60lwcc7cow8yv20irkme6b7ey5h4d1310xqx0rlv8xb0vmkvok9481bfr0ger1vrgdpppevpd9dae9cr65scj3oxo77hzthuc6ye5syphf3lvs02ujx4vt8jltwsyx5ew8y7ah06la4rakjnbzo1a4cz1074hqijba3lqrzqfk4p6soy18mwbo3gupi6doy737ukg7eazfvt6vjjrfsawblvb7wkcqroxe0slunwsr1p2o7lj8mbo42ygqt5f8q43vrfzkljqt5jw12id8g71en9x9p88jb4gp0l7x2a9c7qhgiy49ecfb8m7fi1iqpb57tg7qt5ljvkhfb3k4wwihlhkfnw5am1kzszviih9jtgjxiibzyduymzr3g0nhg8qa2379xil31w1d76ovfdiiy9d0wryyzjqi2y2ubqod4njh98jyfku9pncsewnajoxkcbyuekg7ba979ekn17ftr36o95lopuf3oximv7k6rkwd729odz4jltzzappok38etv5dbi6quf0mlj4lvunxahwckbi3rpnljdvx1xelnx349j',
                filename: 'uuqtzbvu7tx1pe7yk5e425awjbadgrdi82qagm7zd993gshgannlv0hu8itakyabok8d85r9rqy9mj6cnp7tecs8vm0nju8qavfgdxmy2e86enh3wkertqksuyx3vjh6ukiq7jff8wws0syymo3gwg0qx5jh47or6ypwo8rxxf58v0mtcwk8152kr4g7sy9m5jdeeankxip1oftd6pknp4cdo431eomfqe3fn38hkgkj42o81q2u9diq2pb53he',
                
                mime: '1snrzhd5v49wzo265jqx5e4e5buzk5vlosp6pyx151wx4hw65a',
                extension: 'dqac2lanxt1zqmc3sv11mav3cmv2m2x18ezhhcpdipeatomyct',
                size: 5544711642,
                width: 749660,
                height: 955984,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'ubyslh615bm8eg5tqbnl0zqzmbxvmgdlspd9goggn4u9hlngqov78494aneu9mx781si2glgej1ptyubm847qkmh58vga08pctsxxncxxudbs1p4n8rboynlxkti8g2o7r0d6m7hfppvf8li745f47gcaoo2kvfdwlt5u5iklq2ru5wp8i9iyrgjnix7lpn98vumdh55ohvawxupv0js6gkdde5l9ql5q4vtzgq2hvpcwkwk787v3h9zcl5d1ep',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'urzxrsclhr48ntm3wfrub0guek011yko2b95wghe96fbapuca5eqza04ed6kqgeygrkyr62eei6',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 593608,
                alt: 'g9jn65804pxgxhsu88hwxkpgtcvf0xdu2furqe4c3k5m48pmrtr7lltaf8a3bprtg1gf76k2qzcb1o5jxpfqj3f9bv9qpqj31rr19f0ynylpk0jociq9rzl3lwh1tgtqpqu853r32sda15utbp2hphjkyit0oxvdxqyq9vdym1uqzhf7s1oqaf2v8rxriyrvtb2f37ohymdcsfl0jba69of670kyyrfvu0ff7h9gqdi5adrk5hq5shaioh6b1q1',
                title: '0mmuuk9qrmuu1kfg7xpu3yjwgwyatj6eayza67oi0ki9wfdenk3que1vaa70vp5ut3pahl79ayb3w8sy0zt0wb3xms1u4hkrjcgfxqh623spe9o9hmmchm4n8n750uo1dtyrvn7qey7yy5vznhgga9edtcm2n8y3rxwqg2cuu0l2myg01kv8rw4hp4efly8dmalkpz36hc1tpgostxkt0u00lw0q3yhq2watfz9iugajh8ycveedmomocoq9e7t',
                description: 'Consectetur dolor veniam. Sequi aut nobis. Sint voluptas aperiam aut. Iste consequuntur dolores eum voluptatibus aliquid omnis illo quam. Repellendus laudantium numquam tenetur aut unde rem non.',
                excerpt: 'Vel rerum repudiandae odio sint. Qui quia temporibus id necessitatibus minus aut quo laborum et. Et dignissimos quam voluptas dignissimos aspernatur ipsa nam. Doloribus corrupti fuga et soluta ut vero est. Consequatur placeat quo. Nesciunt et eaque natus qui quasi aut aut unde.',
                name: 'fkv6dh5904y8bf8xbmq7nqdnam8z3gr5wjfe775z42qli8y4wq9kpxb3pb9g98n5dlr13d432mjca18x2gwjntxp1hklj7lawldpfkq3b78cl1r9fgb38xfqe9g74y85gg9qo1p63mec6ha9euoq8bweni6fob7ds8y2udoeaowcd59qerolxnfd41yrmjwx7lzghui54v3bjl3qv8un2b9ayif97pk9zv4rcsomffwm47pk8uttc7lhyz786ps',
                pathname: 'qczq8o2wr0n7ig1bs2mka6o3u591huybdm4l22jzxmxj7lidgz1ja8coxdlx6maaifwvyefs25okpfwiy1yl4vlbmnzntc38te56ojw33axrmozuw443idw5u02035jud4gztd4wbi30mu07x0l4bxhi8ap7wdfhx3jv3c5xe154lqdxj41nu59tw6oqddquk5eptr6g9j4gbmmabvx0yd95ds3u2v45vyzv83c9bfhyf2flntepsr7urt7fol6moe5vx3et3c65t1xeg22uxyhab8tkk1eemj0t48yqh6dt2yd9u8cctpyd7p8449301tuj3ayr3r8981ncobnarzhpfmc6qm1ex40ax0wozf5tsn8rably7c5nr3a2wmijmondthubj33s7oceefi755xwevd1ht98dpxv4mfhkw21db8l0z2qp85ni3vxo4n7w9bitiux8jc6j52typ3srlgl4h9z2dq336micl1n8qg30gun08czcpwmnqrcip7118qsfwzsewkeuespq2mj18d956iotdvogtzfdkppzvxbfap6645utzgvtktv7hsqie3dwqvlyy74s690821xpehakyxefremvfmbhych3j2nydlgixyqvkvdkqanqus36xug3f1maqztjh7kq7cxqx0uyswnm5fge1jt9e1g8opbknptdd9xnmom0mbj1oa60wunsx9o44flgr0wid3is7rvtbw1xr4lgvnuo5kt5h29o2tavr9k2oc20pv166thy49grwgovxa23agc3c54prg1g4z2m2wv27qrvwbktlhfwsjdypgcg2q5z07xpefc1sesgc8uu5gp40uasqeaazbwq5ax4npjd81xhna4hbhr8j706j6ooukejdwcozf74swluneg2uhg0l243mkopjv266254v1vggfjuiyjafb19f3wbdkyvt06hw9daqlvh2t8ztk4inwq3h3ett5a25vhoxlk0dz1kwrvakbhz4q8vtkxf2ijqgzan7pnznhf',
                filename: 'j02ji8jtkykehrla6tmv3voh7iigxud85kwmvrxdpnsbq23qd8337nggkqcb7cahjuv15ai54c6gwehqfcahgwbfja2qh6nlvxn74fgwg723wzih0sdf6q3hjcz113youxc1f32nqundnjti1e9peseuy1n9ql46d051h79wb7hiob1oky2sli1z890vgpri4if7rfgbulqjspqtl2g5o9gjougf0vq7gdtynb360x7ptr03n40wrjsg17cob0w',
                url: 'i81xwdki335v2zmor5lybp8dp53nz3xommmsudctnrvrq7b8muajfqnp0tlezq98y79xvl5zz7jb35r01ctmxkg4nj2z276875zw0cc6kllg08tsvrfylcfc51c62c46ksdqkh6hmabbnbddsq3t338rekt0gbsfsv3x631olpv3dr2kavljait5ch4c30oqium9otrfl5ltkhuj3ckao6agmht0kixk7f7wbqzggjvfdbm05029yi380ni9suj0r9awe7txxggo31w0c0sk2pbz4xbzvm9n1hek2f5n7v4l9kt8gf1al41rov9jhnxgpxjodhvkgn8owjgdf31gvxuwhtadt7vmaqfi30usebe3jqej7i5aij7wonr0e213hpw0fyzt42tff7etz817kd7xbcoosujpzu98ybzvd9mvk8p90yvdcfrwcxnh0e98w6ezgo8ucmegr47k0uzbulzvakbtejqsyki7a8up5qi8b6p2h33013vlwn1zikcz7wgjzut5l8zw5a87dvmeh4z3836990db7apty2x7bmj6h69wbc3plkqwxhxbt3rcddv1p0m72dbhcldpywp7v2qbkk56xqqde5n7eqyisxo02ebg5a3qfx1p2k71ril1v28qzgjh8r1kntt0yvwf2tyn70igu1t5wyuv9pbvxl86ppmauworgyvxgciyny1hnmela8aaf2gugiqaus19y7c9myezpq9xpsuqevoik8vxojq2h9128mnoc5g9kn59golemrgtxgjxwfyrtnlmgkzq1xrjot96ymwxojkzhvvx4wa954zhagzbw0z6e68rp0ilwrz8s347wgfjnz8hoc0xlvz2qbv5dhp26mcdv8lsa9x1s344b393tja86g8rwbpqe2k1vjzu7rwiy7x4yx56bfv7wvfr0k216v5hiklfio2rogejz3dq83zra9zdlgddy9amqdjy8pzq1zfxljs8q3xalu4s4pm2docd1y9uc2w2vjiq1v1ntkzuxx0w',
                mime: null,
                extension: 'f8h4h7z6zb9khadph5aw7ygj4q862xmkxch8zayc8k6xlmm2y1',
                size: 3495598320,
                width: 222762,
                height: 834973,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'vzauq63ssgntri2cwxxnq0761fnjl4lswpuxqinjw7or407mshj1sh3dy95bvnnw7rekr11g6qikwmexgsglkh8cxmyjdi8ml7jmoe0cq8bh9vot0n0o04er2kkj5qxeipg140ldqcv1ifwn5s1rtz22bpgkamlhw5f6g0u1tlye84oqp0ixml55xx9lnqkrvf0e4lhdj86sz2xoiupx3b408hfxd5ed8gz58jj01ky20azlgin4qxre1zwmo7o',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'af22izyypoyev0pye4jhcwxk94p9mp51cjagouhoi212gi7twz15bii3ywquql35vacnaac7csp',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 514676,
                alt: '2uqebvybawp70bjxb1b71sbqtr682qu4llt8baopt3jv8y9rgpxyln06w3cr4jsbav51kyt3sbcq8qtgzk0b4n8snu5bf9m7hchhimmdlx9bbhsunutwpmrfu7kqnf068s4asag71gi0mbr4z29smtistgxv64ajweyhcmnpov5l7xfna467by7arwlowf50eiaul336sjvfhiyx4eqwg2dat24kmimhhxxnd0fkp517x1b1mca9bxq62yfkde1',
                title: 'ryd9xlrhnktoymn7ewnpvtupisxalfgr5m7gteu42tgr87hi09xt4etnzak76o4o73cds77vjc28cw6ab8olxoaiv2rate7a2zly1rgedvulon2r77wib5dg52oefb102nmcrvwdvxyh2sxjx65zci78keu2yghd5rc55s7mg250f4gr0w99z3xezixxio27k915x35qd6fd453gvtaheh3h6stiiyn488a1uqrhi2vv7qj69amdujxehlrz7rf',
                description: 'In nobis eos. Vel ad esse est eius quisquam omnis consequuntur omnis vero. Iste veniam eaque qui odit unde fuga. Delectus optio laborum reprehenderit tenetur accusamus numquam.',
                excerpt: 'Hic quas perspiciatis et. Non impedit dolorem. Nesciunt tempora architecto. Voluptas magni voluptatem dolorem fugiat et. Sit dolores labore. Nemo nobis temporibus sint fugit voluptate quidem.',
                name: 'nphiduurszremwczhh6nblk2zapxcm4916jpph76yxen2r0y8h4xa64n5rn0qtggnnh52sxerwaegaizjbvx267kypsyat2akxo045vv3fojjvfqiurxu1b7c9zspdf4mjwjsxcsayp8efqhhm2dkwmxyqxoqrcpjsel3owkxaxvx176qb7hqcgzfxw5d3bkk0hfnk78czfmcpk4e5ekvihvs73ehriqwgpsq6bnuh30m0f8xrhbizq8xqep2e2',
                pathname: '7quhhfsizsgprk130rspjchjy6sq3tg1dvqv0yutapztrq0ft17zm635z81esqksd33bvsndfzt6ecdzzkjevcutaf766eazdd7aswdkzwhxf5uh4eqy538svsog70czma80u2mjwc6kydqct25r2d1c2smwe66wmxoyc1n19eyettblpn3sk24vt3i1dhb989rvd9pmxxjf7ei5kfgb6tgx23f0moo083a8v43dbx0y1p9tmg6iqjp2exq5qiwmpy4t3o179v5p7ggav728a3yug7vuzuxdae91cfxyadftprj0jxtg4x87xd2mpne29wnt2lyo8y4uesls1md89q87uymoydxj5nzcqcj10f6mpags7bc93bze4kxaa5y4r3v1oi1kp4dw3xpedpmgsb2fv4onobi85jchtr5m2f4w20ny3ioy3vhse12fnw41bp1u6mcya4jt2pwtxf25h8mlcrdcz9lrtqmm0gb3l6ggaj442e31777j7yg2aq88ruirptpgqeccvgclc3yga1bpj3zmp9f8fr5scra08iawk2vda0ftmxj0bfp6f1kqwz6hyaz9dk9r2iel3xmtgnf97b2iswe8rl13pz73fi2lgsvlks9jj5m4obw0kyghc8kpkqb3szqbs2hzqwviu7dcc67143b2gujvml1fkhedfmt6n8f8e7tqf46l2vp4bpilig3rgb5vy92vkdbid0ccxlgwxtn279bttgrl03hg8jqbxfeyjnm2cctpz4hoxc3bmej8dx38aaomby24gt6886al8xjisy4boncb8ylvegvpbt3x2uuptqe3lypfaiq5vb57bztqco6b70bwnkakj06ziz5oocs3k8zlvigi3cwpd0sl5gesx6on9werilnvivdaa2d8lbltwma5ex0aa785oh3mheacg7diwixoaatk16bzq1dkfqoy89ax0blnbqb2robh699vgr7f4se9wt1b1oxn8epcwguudgdagnz098e4wenfay8a92k7',
                filename: 'dwaltw7l9hrxosew5nvo77s2t0ioghnl3s0zgvv5pdzb3ljlheoh4evmww37ymat5ld0sflusmu67e6hwcqicqdpd5rz6s18243zivluatcehvg10battxoicb9pg13tmtmwwqn6o2oo1np5g7y7ra1akcdhlxccdoo1ff62xdoib0c9b6n1j0hrb03imcbxxojquj7m612bl86d3b6i0dd7nb31joi1zra5f6zv1su6yycyunv1o8jpdnxiydd',
                url: 'delkajuot1y69y1bz342ovc3szd42pk7nc7hu6zrwjkgvul84y0tj3zwifruq7fsx34sdq63gxx1q9y8y2iac8vfxgk0sg54pbpgic8kvgjnh0xv4xb8iy9e691ynewtvdxsjt7lkws6qxuciwypqmov5ak9frwm7wsoc9owhxwxbzku750c4ka1mw4d2i92kim7pypomnkqiigqqtalzijtkvy3z8rk5mq3pcvjb3jsmlzc70q3nygpatwrj5zpkll3mg7u0seahlmol5pov517z4f16jxtcup0gko49zwvm0a3zz5hzagttbg6qmb4xhy0b80d1wq0rixv3s3b0l08jaqh8o3kp7et76rul3oy4v1g9o1ruw286e0neqeavh13bty9o18wvfzd3rci2kefrhaeyufbxfjrbcva5u2mbnia9fuyqs8o1ra7ue0a56e91l0etn1kwufb4n5zbu2oevswlt9o1fp64d9nq0gdh4icz42mqtlf7sopw4mwclnlohmnrnlecowqli0lo83bwco51s5plwl0zoqcdkjg37bt1gr00v5rqitcvoyyz6yam0t2hi53ig9puswg6vd753r77pw85uzd5v9u2wsn62nyx05ubjknf15txg1q6uf5tjyoaks782z3p3l35v128qf5uuaq8d1zys1kyt845es8mf2kr8zhvh7lri2lubbck8wvcz855zd6q4hhjpn3v22j9cnac9eyxpunhkaqd3wpgd8yftpvi1iu6uw4uozvm0r0xxprzw5fijdbieuusd6cabhkafopkuzj5d688kqxyrz2w8jjy6tao9xhmdluvafocpopwaef9uogkpldzcf22rnwpljnrr2ksthdel7haxqt7liv255q6y058kr38zvt8yhdyjy2e8e2o93c8045jrgpnal9dqk4n86czgkbskotoosf2yfd03cs4n8v4ps0rn8e1ib957utykajdhgrq0lxios2x4r872jqc3z0kiiwttl7zibuirxf',
                
                extension: 't1d487egegnsihbsvtxtzmg2dhkso2eyaonxir1mcdncgkijtw',
                size: 2606184581,
                width: 644655,
                height: 485986,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'uplykkskjget3mx86fr69sou0dy2grj4i0ybgp0tt5e40x3ho5u0xhdl95zx7kp695bz14ub0ss1r3stbayo1dieqefamu8n1azaw9m0d7xx1dgf4trmgb5i50olh5fjbkhrgeodwwugqwiqq9lbgrk9w6b95k5362f6d9whn5r3dj2ibzb7q3twrnrjigqzjzh2p3gupsk6y4xcp7yrob48hj27te7pwnedvq81kviclohcosz74cgg9qcp0r3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'jjqlmgprhsy19irztd13nso7urlxffduv5x9dr0l6ew8bgwzpkwbgb05w7hhc1p8gkt3jlln98o',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 646044,
                alt: 'yfi4g3xm9gx5sjj3ijx5u0qw4akk7n933qz2h8ms8lde2ziz3valsd306ksrozck3a2g2vrjcy6rslgp4u5ognw27ubico8h96tw1p6nnvbncqcl4dkrzzz3j1a9w7fsvq7d3kcdxlqhgie68l0z1huedwcvrkb4seq07b0e1ic8av11xq4nbps013ecwdri308sebsn77zhcdr9dwutmr5ugakva1jpk7l9k6ca2rosfqsl4ct8qmq69qvnpi9',
                title: 'ticif4gl427ppetut52go172o5aws6dj9z9pyguy7op8vnbghzst7mkoajjsbxudj1temuew4b300mann3xwj7tu49niv5mkmb71r6kp1fx3mo042zglks6okxfsn3dhq5zvpkjnk9aeubv9wx9aya77w9hddyg9prh6bq40l7lgu3o4yht6ibmljuovtmvo70l4v3wek1qsf8w98oqh83312ll1yjmxv6h3zzpqka4p8zf90oqd9ed6nuzft2f',
                description: 'Ad sed autem eligendi velit ut excepturi praesentium aliquid debitis. Deleniti eos odit repellat. Qui asperiores sit repellat aliquam est. Atque commodi aut accusantium voluptas eligendi. Aut rerum ex molestiae magni maiores laboriosam repudiandae sequi. Quis dignissimos voluptate dolor et qui.',
                excerpt: 'Non ipsam commodi animi distinctio quas. Qui odio eos officia earum enim provident et. Cupiditate nam eos dolorum qui quia ducimus ut maxime expedita. Et sed dolore omnis sit id sapiente reprehenderit vel. Laborum eligendi earum exercitationem porro ipsa labore accusamus nisi voluptatum. Minus illum aut animi illo sit optio.',
                name: 'w7qfmbcqj27k73y5sczb61msp4qk62fqpq95dw1piwlwxcc4md6ithqi1s5x30tv35o232prk0ji3ab1mwjpoqkmdgc9guxejdoh6mgggmh5sde7oiu8j39foqc52p00ii3404vdqycpndx6jyw7erv3m3a2l6lliwby9agszhqqz66514oj48yny0y1tqbd9run72h9ov17a5b82tjk5po4tahj1wbk4f3ryga350qeekbidd5vy8yti1h2aji',
                pathname: 'r6t6ggy7uf6y4tlmefapc2a0866a6m9upprmvyuce5646d7kw4wmuylmtot82hwfxwicvjpctgviiban0m8udbq54fs9ivi80iovchbke8mghbnzj6dpcrsoowsscihadpwf5e2uu06wmqetr7ty0jbzktknr6quytcnbj77cdi4rrnmrj6s3c0jsds4gzu7hggifm9iyiwew4ymvgyu58cd2macgs2rc3ib4tckq4i8n01dkni1akbm2tliq38lht0hqc985cfznvtj7ji1d9moqy3me0q82epsf9z3vgvlr0yxoxvbhxwc3tlshzgan6u2f6d2lgqf5ts0oza7i2a0twku7fth8wkl8j4o28v1uoox2jwyxe4qaedz3x1wi5h07fliwctfsvrmwfyh2z68mfurytpq4ii9gbysetdz4ywnl9f0l4j8qit63n7nxcfkcg4dng9rgy083dnyu2uv9fndp6jwh6li2jxuebm4ms6773obratzwzqkieabhbq2p3ki4nva1dvrjeda3lvvici7tq7dub6gt3kb47uzpa3bflu29or2v5gewfv6amb1hgwcpeabzmbmt856o6hghmtfv7dzs5fq8rbuf7pflru8db0jgr662zhxmza6yrvimue07ydz5h1mefcs6d114dktakphio8t833u7l4tllabklx9tvzt1d1c5x97qgvws3k3dekzqt0t33nohmmvb00havekajxxpzdib2s0iy8ydc4cbwbwmj1fqohsw1otzgi7ermsg1p8z3qix96m150qotskgi87v67xi7m38tyybb4oe0gaprxnnnn63pq44sq1z6uc9dps4o71xssuwmmdaet3e20s0in487hwehe3gxd559gv6eoobbgls0oloz5mr20nljoaj2o1gdaoa76vepmki6e0eh07y29w7o63ef9r06mhc3efst6w8qyfr0naqosstry842p5qk6stvxmuzz968djl4o0he5rldsmw2pldcx5728w4ji6',
                filename: 'do1vlkri3g1ggpuvlwif2jpz5fqdf21rnzwl8ojm4m90bk7ithma21yxesicv6k7t4f065bbsl8pxawp11nd7wjw5dgq72uh80psupmz7lwyot17a0ykpemv56adpve3f9crgrfxuwmio5u5isyq9h2ckmrsakqjjxfokwyhafxmtlwhqznx514xsgj9ct8mk9qdy845td6biniij2vtnwx0oj2uubq51opsohuynb5tapgxya2mizcix6hht57',
                url: '389wtsgb5lttccq3daqg4l0gtq0lstkgtf3embigkxmclwo2wqg1d9l13vrjkdb6jaf9vndqb8d6r8o5jsiqzh2p3cayfmkt4s6p3qrult4pn1ppfwnql562z0oia38g610iweltvbim6h11hgm574sbko47x36mw4p7lira1ptwa967xws53bxxb97yg1qd0z1is9mxkio2hgcu8xyxhpz8turyhjopffgbhydt7msaial48zzv1prz8nz6no537zk36yq1w4jdm1b0vxg2g27uwglsz1rht3rbdga6etiij1hp1g6vvotoocxbu2qep0k1fjrctf82ee8d7t0nvzad3wucukz5omqqk28udht4tfk3vqlyba9jpelwtxdlt7t8r4m82d91gf9kyx3txdnjmygqbxx30ctjmed7ryrsj605l8cmtly4rh0qu1kuayzf8bfe5je8ggwqn059xvqzi81zpeh4bnxpjyagpnt8wa4s4k7wpwdikiz4i988q8k4sg27due8tag1nhoabhepovt67zfe36u50ceq477x2jqskxxsrwki7a71d9ow2uqd7qbjbqah5jng52hj3ugzzytx6eo8w9p60vl01a9n197vwc4u53a3nsi6hwjmnen9pm5i8f874gze5z5czau1c5ngu0n91p3w8wyixt7ptzfcw3hqt9ivc5mrlo6mi2esjou0av5smfhjfuelf13lw0d72mvwg9yb8nsqra3m4w6nymdpee2st4p9xlxs2qj4ahju3mphk2iakspo1395errksm5ugnjwz8uwmp96yp9oaxp1e509lib8xt98sy2oclv6rl13lpqif3fvui2b2jau5fvqv5u4uthv4xtb9m9mulvsdsr2jpdccnqqyalaajf43ugd0r2u3qtnpq2gaqlctycrvpzqb9u06wh9ushrgxnth2j3d6ig0231helpxl0zlcstogjtn85nh7kzygzeqjxdlyg9k1gr72nvro1jzhi5oeic3ttgnyld',
                mime: 'xinxczbd6cxsuaeswhnvf18ud8ipj8z2h0vcqdwrngyt4qzzvt',
                extension: 's4t0xt71o2bx9d0ohlfrza50ww28ufsathr5ik2500j4io5clu',
                size: null,
                width: 941792,
                height: 697416,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'w0bvsv6xs4kcc6a4ckh17thdvpo9ka8drgczmmpb7qvnsyws5rgrfun1iabtz8q906p9gq3gir6t21kka7vioi4pwkay9aq81atep2jlipixpqmuuat0fwdnlac88sk2c1g12now8bn8tqf5sqyzteryzlqxsxnypvtr6a4su460cgq6bk6i3aujhetgrbth5iw0zcjl2v0m1qvqhz0s1oxkwciv7pgjo69bkjjn4bmudus8fpny6g1dcdqqvn0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'kvbjmyvcwku1e1gcuuobf3w5y5oagtsfy4j826o6o92tomejh9oty24fgfkrqst0pi0j3h98tfa',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 408688,
                alt: 's1a6450ewtc4qm18k8xdxqv8e7kjsixjgnfvxjp2gs074pnry5f3l4dlamqm6ozt7atsxuu9kf7mwoqyms0eujn75ahzu3s0mir78oh24k5xfd697nietk80402le1yzyhjkzbss83zsf7eib966quunupcqu4la3xszzq05v7oy963daub8hhmzcxibxmjeobdzd4y1gyyatvqjnvcxrsq583n1t929zspuna95ae5269b6nugsqiuptme7k57',
                title: 'ut4v85bm79asq4j8sxlrjkx1pve9vbipbkdyvr0zvx2lfspasl724ichx13zodkw0espgoi3ef81p05ilz8632mwakolge2txg1fb2lw25sstq8nulz0d40azcnfu3g8tdkjwspmx09iv0cpvaqb8m2s2y63u5m82s00f98obp6ys5q4hkdov0vx2medf4mkaluq74papcd4m8unsg5w68trs6r2ieminmsdqnkdw6by3u05xucbf3rfbzruy2a',
                description: 'Aspernatur ut eos atque. Nisi vero repellat iste dolorem non esse voluptas. In vel sit doloribus alias. Rerum natus in tenetur ex.',
                excerpt: 'Qui ut dignissimos et. Facere magnam repudiandae praesentium. Animi voluptatem qui exercitationem velit sed quos voluptatem officiis. Placeat repudiandae rerum quia reiciendis quae repudiandae eius. Praesentium aut recusandae in. Id quia similique et.',
                name: 'hsxl59ji12mgjrbkpyh3ovy41zneagegajtob9a5fdbgzyu1b3fzpedropwwq93xe9vamggklgsfq9cklimab0qoy4ecob6bgc3wo6zztyjl29r4d668zgf64jvbfiymt7vyge2igp3v5ev99pqxjg52shnkpl1wuwu7gzjjp3rxjwb91hvtewz39fkofpm5xwy3afznceye1p728sm3bim5efg7ye7tsmefcn685028rnm3ywwh3cah6w27uf4',
                pathname: 'rukx9d210ewbyrl9nidlzvt0urgcbzmqeepi4mlofn0x811x3z14f6tiswqql1soff17gw1vykm51k4szur45w52chbw030m7zzyxtri6q7hdh8c5v5p6t0q6dbag28jrio6s9kqpd0vueayjt1na5tkd4nvce108n1upnn7j6kxmpslvneld40ru6hphr1e6q9mf7moscnectyz0sv66cagpi11x350h95d2kxoxx8go1hh0cy2fr1br7hcc5xdpxbntn519yze60oynw7sqqneqboyo5sdd0xy74c8ao4o7ovl3hd20qepcqxbt1mkrvzw89ks78yv07nmd61m1v0gysezuwqq1ir6t6lh5pofucpj24yaoraxij9jmpxycu15ki8eyzg13bo6o0k1qvzzbpv2b9zyt1btvm9k3rrol6n6xfa5zcvk9mttaadqun03rqahrxba8nz7yi10xrlj9fktju6ubnuft8lb36rfu9jkhatpq14p9w5kfd3tfo1y8hr7p6e9syu7jdi7h55ng1i3ohlt1v6ocv935e2mhyjvwd86cdf20ts9wdd7fllpur0d3l8k8thfeihyzdfjdju7jhch93l3i5vxm11uesqegampjvgukwrwb3uwomxhh2j93v7lqyvalcv5g72xgvi7v8qgma8wgeucgdvaa1cqdhrpsxv788ltrmqp6pen3z6b95vsfde8s8sloe8dat6iz53y6pb4ljlxnn4mn2s3awo3o4uo3qw7wjq9qo8yl8gq22rxpayqwl0351ehkdheoyorscf44074neic69cjor6vrlo37qqyxrs1gj1ihn9m7nkiuow62ogys7d1w941g43q5u4qjivucjloxt9v8ou608wxc9e9s4x5583b6ore18v90ep87que3u7lwiu9efgnxk3x4gyju8z4zuvcjkekngv0ksseatgqhvk1n18e259fzfb1n54ji1e3lzedf36geslh7zxmwl9zkpju4zx6rkt7484h9kyi',
                filename: 'aj0y1zz7rkt1uapt9djqxazgaxq3r8osgvqyicguf8hwvdwv20oi5ukav05lhhrrni7fpr2vwkxbn19xo7e0vmmmu6vnx0bvn0pxn6h916027eblz4zfrcg1a1651sc63s9jocmaq0khzeuuwuxoqe3jqxiqthtzaj72nx61u251eaihi5yyfc8lwvjz0tud831jfsdjokhy3b73uk5esoj0tntefp8374m9sp59l26rxqbblvdqb3z77ysspc2',
                url: '3yxm7j9ipfgsif1z1tv619yxo0ky1r40uy6o0urcc07qr42xt98h49d2q3gqjzbr1h4fprq6paiheri421of6385key3qlqcjb11lg79gvb94gdeblizt9rewamicuwlv8wm9w0vnav7mlqtx77dy54tsmiwsh2cj43ez031z1bbuwsgdnugo1qj8sa0w7t7q8yt4hdoe9ooz7c2qa2v3dc0n5xtu78ehyza7j54wr0wa5u63k660hpp3b2q89kwd0uc8e2r0njerniblbbi93ymeucih7igsnzdzz4339aiy4a65tsy38g40qowe2kmlwzltaur82drvmjq07j2zdrhi29gzp6wafdh4y3lglnre1ni6gna8reyqdi4i7eb05sxuhor6n50sizrg28kulizn04lavm4sw0u5isqdyp8bwkw7xrri79yu199rpyjg7rx86r3cbc0pope7ms4kxj93d6yjb1lodt4sqfls2yodamvlmbxsfadgr1wl8gcj54qnwt9f72c2cu721pj5864pku7mtj0h53thjyjycs1gy9ycm1x5nkbdarwma7c07vcy2nd42y49dzv1n51dhb6zjvh6pgl924yurcz7vx213p6qi4aiwrbbqdtemsj6m7wnxz42t57c5rij6ypwsza48wyb3tgeef40b4zzakqj5jeub2a3f93s8a7zhrezg1pjwle5b73nce86d0bmibcstmgbjycy5pdv79k5v3147s4229t650i1rrk2hizlajbdjtobtn5qc4w605omaahl7x5dhxusovimmyib9xw7fpq72qlf5vjn7t8u5yg8vq26blxnk172nywpuj9d0h5cz87r8ntodjhnx3dkvx3q4qng858p8vrpj6y0ub85ehnwvs8sj76unktl1mky430kysju90irs6taztr6b13a1kpdt2mvq76l7go4exzvtxvtg3b7x6he91z5z7074gb4909kyhbrsqx1ht31xmltmapckne4gkacjev6j0x',
                mime: 'pmbth07i2m81axb88jel6p6q12aq0mj455617p1ztz3jr51gp2',
                extension: 'yhhn3rh2ybvswth52f0dw58kp3g4t8fubvicgl16it4kpvagi0',
                
                width: 433531,
                height: 690357,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: '5izqarkiaat16co11yypk3o8gv0egc4urwlr4373z64jyhewj1ix41xioi9urmnfne6d4z2jvmrjnazp2mza1r9bwf252g47w0xvkuorh8girfhopvs81ne2oukbgvhi39alkx3cqtijokod2285w2sb108v4k9ushwbnvlirfbisf5avbqmahs7963v2gc3yipaaz2nh4j77rt1vvvqpaarfk7arczb2jhw3fb9imvzwrb1wvwvngpi0z8z2v5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'xy30ptg2fyae1tucnbyl1548gj81ly023tlc0',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '0115a17q4y75tlingujm5vmn0rylk7qavcb0chff6ly4pa95f30kdgx8uudpkddftxq47c15xth',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 364398,
                alt: 'jbe751izpn76sieinbf0n68denubkc1o85rsgbjpr3klcss1staxkotqaliyfk84ocjpg0hl1h5xafj8zojunf4hypf3ls926pf7h9c0v2gnc6wmiatzr46ndgydz1pnokvlhjgdu8z8fxsy2q8ljxef6udmk6m7ntj0wt2oyx47tmhq82prelvcgllk9xv0pfjcv7p6vhof97qld7y6myiv40ky6pqgsv6h3mju9es3d4471uflgovx8753kuk',
                title: 'xbn3t710hn0e6f968dos5rcogtvot8rgmqep5and3uf1u0zz7z9o0vbacyf8k5bd47fzr0yrc33gq3opyk3dnbuwb3j9b2hdxlz0hg5luqndod6w09d9hdlyfvt2r41tgse3if9pogc2tmwg2siteecdoc8z5rfyfvsd8ar658vqicpbuy0030ywrpkqenn97nbwg0s3dq1itazbs769fn8p8hlhtn8yk7e9le4vlmllfwodxlmq79zmaa2pxvx',
                description: 'Ea id enim voluptatem dolores aut rem et asperiores. Esse excepturi accusantium et. Doloribus non quae qui ipsam quod aperiam dolore temporibus. Id maxime voluptatem incidunt maiores.',
                excerpt: 'Magnam non qui. Repudiandae voluptatem officiis nihil neque soluta voluptatum dolor. Odit in sunt qui eos.',
                name: '7bxj0qdax0x910v9d2e33of44onl1phr4v55prgjcnfhx5tsq68gowvkesug11rgj19736betgnuye6c5a7zku781thz0boqiwm5290soxngj4fdqrwegeugyawxu3p8vh0xeurys9p0tgihjj4lnbxcvjv4dmcwag1k34rspptqv7tdyhavh6vlsvfguiv73s9hq7kyulj79urmhvjpn4u70wdi7f8zabncop74get7jpl5x9toztbo65ekf1h',
                pathname: '09a5e9ihgfj0wo2qiyb4qyz0rg72tp84ls559znmg38yq3a1xodsylye6i452gqwpntp5ecfqrfhz4jg2tt8o57rnj66zst8k11mp61soohp5zuderldl4catw1tgbrlvzrfn7t0a27nni31keuasovr8f01wvrpr2qi5uepyr22vxdmcbe1hjtdmtskiipyd8spsg225fxqowepp9k9r2x9ebp2i3abffixbz72q0ubgsqlidqb5st34zp58yn0vcr34ce8bizgnwwa5kfl0h4i496l76hoycziwmg7yuhwi2xz6wvg6j79cwzn6bc9g26ful91wsfkskspqbpk8axpcpd0brahgsdu4axjehhoydigsrkjx4unzelie2crr34yorcrmjd3mdkiwlvmdvzwv8eglob80vdpw7j9nhmpyjw5bj7mluvp1uc6932qg0km6y8whbgiueg4gbz7qhf1tanty64y5p5w1qlvsio3sk7d8h2qian15mx8mvty28xon5yatm96ramqukonuq2jmoi2fyq918ncbfpsl2agawh6mbfv3bye1kexsxtp6iczzg3a0qg4lc0469n9umri4lwa9dilh3dr3lvffp1ujm6fjh82gmv0d0s1bjlqok2g14mu8w7os5pspcs74xd1eqk635k0fi0lhbnzecz5itkdtgx2npy4c86o06yil61wl14r8gh5buvyd3cn7afmb6iy0o25ba3jzktofenkkxzvfln3jhsn65l6ga92to8j8cz410lrn8oyb5p5r1yn157bi8mima6m6qqhgsklcdmvbkwlpm6ombs4pko7p7b75l66dd5qc5qpim3b0ysup0gimzzykpe7u3s334b8k2sugf1o98mq9zyb0k7yoqcnlpoojznya9kod03p5s4ucazui1161jpyjugsoymmqsgs8v6nz0todsevmfduwtukhxxnj7pn5fs76fsdwcw48tvlztct3ot5apvlb2a73iru9dinw2qxshl9kt6e',
                filename: 'aqb9s9fe0rpploeqcc8ut69etrvaa0l6g4j2mle7c5g4tvrhg6kepfrvohtdd1inknd0dbrunlg00sibtqjqsdsahl9n9ry6w1s79dhr8ef4vodow50u14h3c4loewt36vk1a2s7qov903tbj7f7777werg70ueasbk3zkfquwnwodujy9ofalppzn40nakegb85v2vq1thoa0nvkzc69f8sz2cln2ekfugwji5ts6dyp49ga1g3usbrzfadurw',
                url: 'towqw1xq3enj3pqe40fcqakjao9c3w697b053j3w2o63pxbpm9pa2063a8fho5di4e35xsyrp25ku8tvk2wfq3g3kao1sw1zhtm1kp1vvg3fc4d1h3qk3re9mkxmxmnkhwu6cu1g1ecouj3fbwz7keaofe1ld7apv19q9vybt8wqbgsajb00dn8gsx0rbrwrih99tqfdlizy1lxkmc78wv39p4zj4f1zlwlv34quyc1df28w2kn6stkldj97mfgbp7hfwk77eg7em288lsc29ngul9e3bdxtgi64gjmz1mu1c5p2bp5waqy0mjj00pva73hxbl9nq42s998unnicx19ze4znexwb2qzvu88i870dugleaq0ros6u0klb2vjikdw9pkkhj37n8c295zl497qhy0s8kqoipcqrgtvysfcfso2o2b9aezyyo4l2c19spxjalnjetj1b68wm2fv82gu8y1ut5rklqu9hgkltduo8hyxj1xvvy5pvivmuxmuw0bosp9ac8xgrg1icklerm9gm5nuikknnlai1r86si2iqo4qxcojlypirq38lsmud88pjkhgd12kfxtl0n4qrymzvl9lmxjq65t3w0cydiq7ra4f4nl2dkow7g9zeqsaoi75n35fabwmmczbvji7vck7wpou7t9jbyua0z7rhq4uwomzxef8kfp5tx2mjxbd31indbnazpoplmgjcd3pmw1uhspucc9ndy9e7slonczt11obfn1kom2nm1kiwe3rx22uooo78x50nndu455uy0rj8hd14pbcyezizg32c0psgur4pfy9tfr8c8a4v8bdkfgdwfcivpxv68hco1b95h6j0gh7u77ucfydvm4qovvmdzm99pldes16pbguc9kk9kcmcfx2e2ue3oownnvdx4f281woc2r0lc3nniv9dre4ecrtt5l6ow303zr942poh8pn4kop3tcr8lnb7mn9u5er0aqca45zaxljzex27r33rf9su5222ikllrmgkzyek',
                mime: 'ygf29o3jz4vr4u0tqbqe2syi48osa2nypfs4q9ech7rohbfya0',
                extension: 'kcg5ja62zuv88zwhrcqbma9hjgkxs26p3mp9bx8oit31u2aiw1',
                size: 5655278883,
                width: 429724,
                height: 779099,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'nbvxtv2vovihnmr47jlcr27gsgdpwregzbsxysj88g0rujew0m6ct7fvmjy0q5a7jev4bp9q1d2xgs6qchbedc6cw9ohuaorfk0l9siqd4z2rkkxhkz78s5r2gcpazl133c0vxvzcuyto552rs5fih7ypj655ndn9h997a6iv1vgh8n141vhb4u33t83agsh72e5e6zm0u4r3fb4rcdyrjd0qo7xvv2eg0yf8xhztdah3y0anqqo12sga85e6jh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'laidtotgyijq530clfe0g7j3lizj89ccpd8c4',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '8tzv6p9zisyb45j8zab0e6d4low8ce0s5ww9pt46ooapw1qqmvieyy25zn74rt7sjpiimjx6npu',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 679665,
                alt: '737yc8uzbwy9zighnyhsf2shksnd9j6ffuolwvzg77zo6wug5ww79sk3xg8mbbqwf3dgo8owsyk01cvcw0294z7dgoyf5p6un65lln3y3n0rpmk7dy54xr998ipx44nx6856b5ostbvo0xd96u0o31gous28mvvtk7tf5hi2qaajpb9hqchm2iit9yi2ztdcsq0bjlteoqms2sz1qn4fh51ibivm0hoxmmaq8vyegnw6alnug8649big9st2hqp',
                title: 'xzxs78irqzpxc6qme3xbrtp5vkqrlgvltyiujag0tpxxwdoxpscmwxof3gkx5y1zvlh57mq0yk34gdm4aau1j2r8uw4bn1yrg7yl6d9qwgs1rvqulxgcs2ugsf1w66yvijsa0au0o5m4nbk8ndyiymny03eyz9sfvrph1wyzz1okzo9dabp9q9lqpiqf3ijesap90lod5t657c001kntdvtaesvyfgdyttzmd6lyxu1z7amy7wqb0q4e6pcaj0u',
                description: 'Ducimus cumque eos voluptatem quis facilis iste laborum sed voluptas. Est ea quos officiis dicta molestiae rerum. Ex delectus ut sunt aut corporis eaque molestiae cupiditate. Eum nihil soluta praesentium similique quasi consequatur ipsam voluptatibus. Nam ad non nesciunt harum.',
                excerpt: 'Quia vero modi asperiores nisi saepe dolores quod cupiditate. Rerum et ut. Commodi odit sunt iste. Ipsum aliquid ad rerum suscipit tenetur qui voluptatum nisi.',
                name: 'nma9yyenuj18vfvuyf9uitpd9iws5drtap87w2vott1zsu6j8jamok7sairojdmxajmw3kbrnheqar82qium8olfkt4du0ho19h8w90vghws4lytvhgev4knemfbkjyr9hog3m1u17u5dzceh4u2ak2ibbjho64846qaq98v9gzy015ckfo087ynqbsfhoucz7xh3yubd25wfvjjlweu9q22g27a6qw0qnxtrlhqe1ijoddiue5cxdi32uo3ltk',
                pathname: 'k656adjbmyttntmjq0wr92j6ncldt0cgd8e2fws8o4haqvo4wybpkre7bxf26t3548mry7agcj5r52z2ohpve6itkfrqwus4jyzp4ynkty1da5zharahqmrplyrnrdwnz49c8dd2k613lgthxbrg75shvp5oy48n3w6w4v9yk6m3w1tqg9oko3ejjwkb6pq0ryir1o2xf2xywh1jyhc37ppu320s0hhyxkwrj7gd6beeegez5eh8lgzept2q3shqs6copwggaq1ve1w7naaxeaw0rl5u8p517go8tr9x5vnvunwvuasgo7u0f4mxfdo1lu55iczu3pgymx479gwzctwc4378u2xkddwl3ssbqr82gjbowbf9xlk7dvrin7z4bju3i8cebvmn6d4jp7rycx89xtblk2vuf6i7s8nogoaxlwyc5bmz8opd2cuy6jygn88untbsf2hi9hnl6chgdvazkoplkum3k6kuhbvfo0oi29po10txnu6jzcpljfvnwxd4uhqn5a7dg4r6s12lk7gehs08k6dk9pzdwfambfn1tbjnwkgbev9irm14bcqdug3bxdnehjc56f6uyb8a0tss6vu82jc8p7y3uyi8pgoj74ilnakjb9ayf9dt60potlmic6m21ym9n86ebljev2bborwc7irr2hjltjrcy04ab5rvdx4192v18ljawelqqjz5goazjzlu5f0r3zqcobwh5e200pc4yk9cw97o5yn9m2mdfxp8gpasx9xy73hh9iuo1p0ccwq7ploburgssstlq4b1jdtnkznh0v1n8tfqg0pqc1kiyp9f8kzekg35exlql2fqp7sv1ztgrkcwr6cqh1dfxij6afr0aqmo4achmv53ph65kdxnhn6077tryok3c0ei6c4qzkbnyupasnhaitc54sflm72zxf6mnnr2d6iznkkc7jggm80inbdq4n7yqnfd9cixsavzt4bzklq8p6bqwzzrbzkumrxoloqzdpf5jb257604140t6cg3',
                filename: 'pco71k5kc56l04lvmich7l10gveqf1g19ofd83ztkqlbw8ocd1m24wi363y8uly8v90hwpftcfhjblgyoygddv7bfh6sezq0inwrkxa6yvgtnou36jnygpmznzugro9y2khaj7ag28n38z8qrkk9h1am0wnocevnrr8q59b68zdlq4fyob7m340r4ec4am7ypzsvoe6q35ry5tgenwsrlmomyurwp91z6x4ivfcvogq9dm0bb4w0tt9mic51wk2',
                url: 'l8l8anxb1ltz0aco4jngndb5515c8plmg3ru7osto4jholynrkiiw3lv4y4h7g0q2oqjo0qbi3nyyxf5hu7cwy3yz5bd1ijv2u0rtmulobukj0ei63wdokltuq78t7g9itz8jf0aigq0lz3cntb6e6vsp1pzuspwntlsad9v9m33ozt6junof8eqa1lbycd8io4euktg259wwzzfwp2qkfp5vvumpclf6sieboj0eeeh4i7y7u9tqctkekcri8tg8ngai5fnhsfenqbdieso4djr64m16ln93043v5pzqx7l5wiof9jxihr5mhm0ztu0dghivg731sb181ezc8rj7c2lu1rbg0zrv4k5n7crbii84y4q955cf0g0r03w2v4vmdl3247dl9n6ludu6q4xpnjiqa6uajvtk6n7kkpc2amhp2kzegya9toc5xaec805ql273xwjhfqnvpbqp941m8znkv03j37vkwi4rvnxis2f9llvf5smbbdl4geqk9kc9k46fieyqbgy1q8cgqvkiqr0xgrd727726lil32ktnkznrtg95wu1ii17o8qzfiicv14hzrysefwxht7216wdl3ynu36jlztbnyoayx8pukbxc702huv0fsfyr1dwi1hxb23q828hdip7f6xlkgqt52yntpbl5r3l4mnhae327tx74d0b0z2fm9pz0iashrmwm5meh6a3a8ujawezkyfe404b5p2ymjlzdpm3mzb0z0urdn6brnjkqe1foccd8mq4vpstffx73sa9jy445oa2ywbzhnhmsjelmcfrfc9zpcf5pkqpm950vgpuy77jxw2xh79pp4mtru8noxqdty7e684ygv8ymfh6cweaiisbhrkskybar9vyo369rjugwzbuioea7zkktv7liz945iyf25cydtwybi3hl7n20e10dq7np7xsbs1d59vh211itq4kokgdveoehl55b4rw9soxdr3qlqs4lp2ob6cybzhr08kyhu9lwxzw8t2khvhcx85',
                mime: 'vsbqmsr54j2fn35w9o169e20syh5f4lu51xcrnepg5nn6640hh',
                extension: '8gbxkhpjoewuq15ixtsgydfplwgssodof42d04cmu0jomvcmjl',
                size: 5745473502,
                width: 743270,
                height: 163683,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: '6hyu8mbfv6ryl1wi8ozlkfiqgmnnn9umvge0bwsq0aa984ayjlt0dzsxgv1zhkp9sh6ax1zbiohfw5x8muiz5719ja2mzrhnc9qpohygacf3qucua84e4e15z8j2kw148pogvlffaw1f19rm8znurl4t9cuyrsefxij1jifgpedexbwmbyhy908vse8hv0expe1eystidxtv9pcyh22m9okzsyr7hkqtl47tpl2q3swooj9sck40lpo7qayvoct',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '21bfo43piljwozug79md7rshfw8kmmn1ltpe0',
                attachableModel: '8v8q4ovnue3rqujb2p1q3rsj8ntqx6nb3zexc5x8zwct92oh52ffqksvxnkwg8y8iwk2vzeham1',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 949603,
                alt: 'vdi8xhp4biv9h32sjak0q63bglb766yhpmlrrbbepmajjua2r0sc1n4t7z4r92bfockxpgtlqchlvee5ti4s944n2pcchh0jlsske5ep2xhypmdec1bp5c6lk7etfy1rrddgug3y8pymbrvzum9wmi48ytdjr456jqxpr5w3q54z3iqic9gznmwbea8pssypt0rofvqf61rmi5ggzwb3a19cvzch5e7fxthfqxgc7suywaiemkpzo49w54vnlnk',
                title: 'osmv6j2gar896zqthjwdvdv8tcxn8ilsppxngr1ciab3q2ontw3il4zklj2klwscz973cnk7ryltb51ophnvjkkes5m950x7z44ldwmts540dc0awxcbyn9itybigzf5oyhotd51ups38jrw9saxm67txp4la7djauj6lye4jxy9y0pvurejq9px91v8r82yghjmypo9m75ca8rwp274uybwcxt5eh5jwrpeuar7d4a7xi3pwb8epv8ckzih6k8',
                description: 'Voluptatem impedit adipisci. Ut et consequatur nobis recusandae itaque aperiam placeat. Ut rerum harum quis sunt sit.',
                excerpt: 'Doloribus deleniti culpa eum suscipit et qui id dolor nihil. Et earum nulla. Libero a facilis omnis laborum eum sunt. Quia et nobis ut iusto dolor vero. Distinctio nisi atque quibusdam nobis magnam quisquam.',
                name: 'oepwk5z88fhvwqr2tzd9j7uiqo2s7tlqjz7l28ggcuj9a1fcfqa1am192dkmbfqk3r2xab2k26axkeo485rsyzp6cpkt5uexwbvrt6h4epwluerc9u7db0lhhp580s8r6opi04wnyaeiw9n2szw9zinc66h6yze5k3ocfdodgak6dr7qzixyw6317uqe6ep1i5oxzphps5enibh2q2kkee0fwp8136ubi39wj5syf0xrgmny9nqtz2phxxkhc5k',
                pathname: 'jxsnujqvs9m1wawrs9uge53bmgobmkfvjwgn58s1dr2sz8kqfwkg5dn6ig8ty7i5jgrznl3cbzlnn8w5erk8dicmdoncehnfqkyaijjmtu1f4m9okgmeqxx3p8zm6hzo4famgm355jmwmemjvl8hj36ehxq4nzyb1lqs7adue1kukgn45c96quvt3tqb6jb81437x0akh9cen798mxh77vvgm8twpro1oseretrl0ltsdgphvb15houz77ylqcueybmztu6tujsfs8k9ibl7u1455bwtp0ynxm0i0wirldanmkej1227hwwxt2s3idgdtl9xkviq9yij2xudl80yoff128i8g4k6aypg0fl1fx31v1taoehka66qdkw48nylirp51dz9s4r6mg2wweriv24cu15pzpyni6m11brt2pdbg23oemsdc1kf0zlqdvjwpj3fawh4mgr880mu5ndrdaxd5a1jqqenywm15xk4sktcj2zambogrgo9hhdtukqmdhex6t6bm5o3aa9nrqtfbfxbd12j837nkjwp45bdh5yq5qbqsvb77dtz9wt3m4y3e4ej1ciuwryho38jpan9ey2erbxxyafrftucr5tdfy71wv4g1u8aouzilzuizqa6h6wh44axqiokt4n9f3h2fmboqdnrmdcos8y679lhf9fhxgwslxyzisczuxnv6to7sndblnl4239rmf4iimc93u1zjo1phe8pvjawc6p1wns8na9nyo8hn717gys7c5to7ovtddk29smesf67096cvey2vdyxzqgt2n8etdk6y9to373qwswrlm9bn8xbnbdcg6los46tzg65aso33yzo3l5frajr5tk6r7f3vj3urr2mtsj1gjagdmqlnxa9qy0wf7rmk90baifnitkjxbot4c6h24fwzx3sypnk7291qhl4d9l0pz84rekkkae3kir7jk0yidcu8lgwr6bgx6uekvw4lcrneavr8oatewuyvsyegmqlrps9nrranr1to09i',
                filename: 'dy0l52idew3whz4a3b877xch4asoyj7s7fmajpk7ccaw6afg3vosq2nv9uasyurvaesigpxgva8x98u3ucpht6ha9na90mnckm3dijv8r1opk59kymbiy3uq1y8mygpg4l2t6tlm3661end9u2ipjex1zd6wxzgb3eocqa0df4q4xhfixpb0iu9idiowg3ksknqhdmuwj9v63oocrp138oeq6f83t8id75ohxrdg3lomk5jbx77ft01in4prvje',
                url: 'y4aa2j0uvxhc0s1eyb4bmuzksoogwnn4e9u6bgbhaycn9e6m9qrtflbfe9j70in5r75l11469a62e5v7b505a3cbb30vo1t2h6gxmhrwh3iallq0o5c972j4bj1q30305j6gcz2rhcreqi7ngm8cuu3dn1en52ktwc3l6clsexjhr8xnoxjzphp126olwysg8kw1gagn5io7as112ex2vgqrtns7m154c4busxnin1v7wuvephdta30j822p29akb1lsdodllpp1dcd46409m86zm9e1jtery1i4hq0942b0wmlqh0o8nwk0wdish2gpvsfxt6xk1q73puab2pg4o062arsgnptfzvl3m807elap8cglss3ujdjvfs8wn3uru6lnd8vv4ck12smanwbqoxrvnrafw93t1cjz9gozwx3w6dlosnuyj3r0vgcobxkjuuht8ctjfz2we8bgc7gzsguzfarrmydtjrf5qhb2ic1qrbbnibubrwkqf39v87ec8x31ydl6zc6it42y4kohsd1mrp26yz6j868hlaxteqdpbdgxo4w2ltzytwnxpscvofbwiz1wk86bkmqskudhq8q9debf59e0s4ily8cgmk413nbqeswjh4v88jslchnf7tzb9s3slouom828ns1gsgagkynhwn1q9ys1ua0rg8i7m8idkttyqan2szoksfumrk5anea4ggse2cdz0dn8x92yq003gq3hga7vb3yu0lshp55i429o51ag5yrwoe6apjed23m49xz1ecqhp3q3jrbnzy4j83um1q5eepehqu40zsgbub6d8ch0r2riql91wimbdfmvjhqn71ammfahkyuiilj1tj40ie6j0ixbz3awckc283rbgndolrvq5zqu4slw9k3chx0wmrhnl6qp12kjl37acr3xftluw3oudeyxy129w94dcdp3ahax5p175tage4j9d2yzchcwnr5xj82j9of40ft1wcm3rom1r7cc95s4maauvkbuapb5toml',
                mime: 'xqkccr1x6wrnv1lhzv57j1vhqwex6ov0lcmhzxba6a1uswdehv',
                extension: 'hsdf8foq8mpjg5akuhs8i4wn5qsv5irenk0s9w50ehufd2mr2u',
                size: 8625340233,
                width: 472877,
                height: 649190,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'e5pn9nb0z42ze4j88vm8mtb6mjzvxdd0zqscgxc3x27detqz3fc5nn280bfq8kfm0vmnyw4260eypw4izdadt57egvvflfmyjv9xv9w79d26v1t8v4yogufhib8tsi417m6z954w6gluck3j2hjz04kb2xlv5olj9eh2qyw8nvb1f1fqwmz64qybm5tjazk82rutvnpyz0o036f0er0r5erucfysletwtssppfdhiwp4741c8wqr19kfj3xvr0n',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '6g4ziwyagt80msop3pufpf2bbq8qjmrtruer2d16w658r8xy8fmkjrnitshd72hklvwes3trp3d',
                attachableId: 'z38mzxowbj1ziejxtfrl11e88aw5ecs12fzaj',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 132556,
                alt: 'eg4vr06jjdaqj792jol04t1o8rllu5q6zs5jp4clm5zw6tcm440q8emtehfu0rkycyh2xg5w3qi2d6j2vip2tnboywzd9th32h6fhkjsy22rsznonpduv66dbo1xwo0x35vfmpmaq6uobewbfglx6jcseqqqap5816scj7s1ysw5iz25ngh4drlzgo9aayzqvjjwzqcoymmdzy7bmkcpekffmztixgn1y9jgjrps1d9bg4tjcq0y8svcpac7guk',
                title: '5qjmuvxqke3q8iyy5ufboetv0fkqvbnn0fgkcvg24xu5niundkuo6m6m1hd6nc0gdn4ltyyhrrn9skzjpx4l8h31cbc9c9a31rd8fudfqa8musvldqfqvl3672d6cb4oz09g9e7go5p79gyjh1aevn6o4gijtmkj8639chogeb9wm49qc2umyqkeoyafaqglwfa6t4gap2dm7jonh0jcvr3gpfx1pvvqwgl979ez45hzmibvmldwbd0c7ddp4e6',
                description: 'Magnam autem doloremque laborum. Vel quasi earum. Dolores eius est ratione ipsam rerum aut quidem sed praesentium. Laudantium vitae perspiciatis excepturi blanditiis modi adipisci. Optio odio impedit minus aspernatur voluptate harum.',
                excerpt: 'Porro explicabo sint accusantium harum quia. Nam repellendus delectus quia nemo vero. Dolor saepe doloribus veniam libero aut iste ducimus officiis. Maiores perspiciatis est. Enim dolorem recusandae aspernatur qui.',
                name: 'v716nutuqgg58izaklbrmeo8mqrchfs125i3cvb51prp682rqqb7q3td3kkv232j05jt315z5i15oqp9968dl01nt2zf87gtitw0n64m0j81gskcdzdknuxr79lusxxw3kxvybbpjfe1n0ovhhctpcm7iywzdw1p4xmi4vf4ngqrgeb26s4ex0dozk5m1mvkd2dkjkj2tnzxftp24q7amzdj94wngp5yfttjphm7l6hjchhwlps4rdz2xd0yhdm',
                pathname: 'zidi4egpaen31iz43o1jvat507fu4k3cr8mvj8t3xekyszoy3qanoeuv30c6479ciy68rl05vd07p3i3n0i3a1w4nxe0drrtgpus2ej5fuq7r60t3inb26e9vjx045je24uk590i9weimyi6yi58u9w390kw6az8m8hbwf62aag1w4bnbjf0tgx56gwapcq00u8b3fdrxz7qfovzgzwktwub2qqs0ek3c2k05zluvmm8gb3mlyfd35z2r3ohe2zlli2ejb8fs6bo4hbeetm4jmxp8n6auumt9qvrdnarq4v78ul4bvejkcw640l05t7jg9cn96oaon7ykeha48pui5jmgluh7m80bbetyoelnbbwqjkdzms24jf06tg3y9nvfhzb65q7tvssgk1h0muhsyu5brke1acmbezjwkqm5v4sxlonau49b33byabune9jf0atfncmxddwkralr26i14atfd8bkk93tfflv09s2gx2uha1iybpngzrgmahcj14rpbmxurvpqwkc472j0k94jd7ej1li8iibbmcvqyww612udmnlvwmmwhx6pw2ubrfjbva90jgy8or2uli6sqsw1v0jmxopchpj3z4g24w75a8gxeiyhudb1185soqtla6nhuuo1x6jcpidgwozfws26wjw4itb9sdvdmsik8sk9h66gztdy11471ij25bkj24opvy5oai0gqg3o2zc5aqljj81g7gefraz2izaeok9n6dnsa77yjjg7uhmto1n4iwpudrk8f5fu1e5rg3l9aya0s78pzwiaex4zjvp2wnpx666gp0aeu6wi2e2k1v4r5kpgpykzrom273cgunrrzne356xhyy9m3p03ljies1r3ws0b0q3b2ju5ytb6xxsh0rtoyjwiky4b7pk08iiaklj9zy0z35jhpoh0tbhi755jx36y4qdzczushpt4jh0keafd0ueuj3nc64mdd4higp3cg0fzne19nd7cyxeh4z5bxx58swp2iu7t2mt9k28wc2',
                filename: 'j6gdvhk142wv819ii00zbkc92ggqp386iwsn192zaf5zc6l4lcavyrq0rvhsltoaxlhrsxzqjbi9jht6326h22yk0g4vqhzwu86zxu09px3egypmcl3omm05h8wi7g0zl9irn052ugix16cjx9jx75qfywntqptvmmgnbrhltx58v1h2n128egkawb6k9qsy8ypnrokg3mqhhbabx6299mws4yucx01q14xl5ztnva3lp5yi3t2t3qg3trbt2ai',
                url: '5soqjdfgampalvqhbg66fdc5kgdwyqjku6apf4m376bggb9ynt2637cztks1msp1lufzpb1e739hazrx1zp4z101zcdez0fvdciof3sgab871xb1xg2zvb074pe6r1p8hvh40c2kn8wik1jcsj414395t9f9oc3dh1wyts1fdbxp28xywchi4hxreazwddcpcanbpal6yy0p1rdmkxw2tgoxag418l6q7ouinlwilhr9hlwee4wu0cqgkriu67of8fqnovmum7tc978fnjy5w3rl5g1o2uim13p7uyn48ijlr0igjfs6telgqvr0cx1t8iea3l44r3bwhzywz6jpw8mp28hyvsccltrjwobv1txer2odg7322tfvu05cavzu4mh4chnyw55oou4pm28anc7176er0qoakicm8gij6rwizb42taldk8pxw0nbvy7n53povti34seeg4gv5tql9qbfg7gcb0w9f7blspuvtrt2pojw1cpkjvq2lbofve1963ne1bhuapg1iqldvxnd660l1m3ro3qsbqtgqjctmz3p4decs0nzqqjoej0f3wavkhn2fnmzc9vd5a607vpg2msim3revehwsozgbndut5vd1q8xeu8m1nyh63pf7yza9o3yfxmlo4noxwi2we4bk8993ccamx80xw6ss04cnuczztyk5hi13wrr5v8i0k1y6drz239l7mkympsgisms7ebw73at2r5lshnghnp8qziay06zjqlnyyrkwa4cbbzv3ryaa1uq3deiyfjvo7qsr8a5vs3h0bmwxd3lugbttlqf8x7urbm6op6u83il0ltr33i7ochv16s8ywandedg6p19ys4u8zs0zs1xuqug6p5ysswbv2l4z48ualce52hs26b2rddyl18aq0835nw9ovl4cke2wdgikn277f9ivg5c1sy006rpg1w1xnim419rghag47xmv59jp2dgruaqq4w7g0tda1bok52q5qju0zrnpz6orm94uwhj5b2kkvbz',
                mime: 'cyu5rawv6jrxiyi553dxb57bxaszbpf6mubwg6ih35vf6igwp6',
                extension: '5amikmud2aetyzh2aq410xvcjec3ulvyg3tas0v930sgzlu7sp',
                size: 9167703557,
                width: 457571,
                height: 974703,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: '222dg3p49s39blfsp560r20n5iak7rurnfmyo9ue7cxxy7bs4oepnkq23rsrdm9a31eqb3v8j5h87f5xwarofyektlosccvzv41kozmuai85no9dqpq1zps4cn7ebyhmnnlrx9wlksxy69zeloxlh2xruy36t5hpdif73w8mcxjib974notyck05giyh3ifala19z9hoh80b1r99hxlkhq5ec5rh5lsj24pp9uau14wkrmfprsq59wjt5y257sr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'es8cl7bw8yerlrlau16suyazi69mr6bq1trt4cp466d7v4kbt8uwr4l3er9i2l9r35c69gb3el9',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'r3yz62kth1egthhz1ycr71c016f6e9ujiphfb',
                sort: 222422,
                alt: '3elmzqfssouuw7vksq46lbi7bar05kz4vutebrgdbnd1w30rj97dhxm7q91ybzqom8729lufcuo2ph3fr6vulrkhbbgofgft3dgjr6z7rh0hjom8nsfk4tknnzmbdzh3qduwiy1kuaou4brufbp8dvuf9ebmr6zkz8ykbsf2rhmoi7s1n90jzivu15as363d0n0nx5790xfmj0x7svxmi5y1wo0js580zk9tmxfmv26cgnskwlxd9schwvi57l0',
                title: 'nbyhf4pt5x2qp8wp9dgipt3th1zpyxsl1vr68qi7q4z24a3j6k80bu9uh8r34ouvhq1pgtk8t99kmtrjblhwsvx6wgkxs82p75f6m6avvl7qrdvymx2fhf0zj14kv65lnd13utl2og0jcuq3hjuujghe3jqjjk78qkk40jjuhl2byxwr28q6bj9eqvyrse3oqfvtu5nvol724ow20539love5idmzkaskdpgd64bcn3ep8awy118vt1oad6wk82',
                description: 'Sed pariatur eum impedit earum in aut quas. Minus nihil at ipsam eos ratione in voluptas nam exercitationem. Ut alias nesciunt. Cupiditate et voluptatibus. Ut suscipit et esse quia quae impedit at veritatis earum. Voluptatum quaerat laboriosam ad minus impedit corporis non sit.',
                excerpt: 'Dolores ab nostrum et et. Velit eum excepturi. Provident dolor voluptates.',
                name: 'sy78hel0fj7hjehv8fsq70vrr4802eosohagkg5x4bh0dh47srsz44m1v6ptjj6c7ykvnjns9xoq66tgee2o8facxzd290l9ppb93lz4bz0qw48p64hkx0t37tov1zzg68dy59c6cqjwgb8qgkrmztqv4j5nlibmwq21t0sp0wkpogoosz0spl8817o8jijtni02puxpe7d8lbmpu3r0kggbddp15gcrt5yevz9a7o0nami4zsukfxol28d892v',
                pathname: '9wsvd9m3ua334zkpbvhvvw4oshxddm1hj3lts2mz8bnujjuxl31geni4ol1w2sql6f6k6b2154ijxvrqp9iw3zw4s1idcyayqf60yo2y5m7v5mgixv7hi1bjngc2rxnydvjk90hf3fzvblkwe87nlxnat5tdmufc3f4bac5aq2bjfrfqtgnvp0vvzltcuvbwdpmxrvuhxew1sftowvnh1gpb2td99qqkunia3oogqgtogfu0ni87ascl27hib0u0ticx7ckd3m9e7mvv7r72ll19qex24rnp2ylo2a35w1rt1ksgp280jtf7ofmyayc585svr3zom59lf63zw1utgtsaz9vlruga29hd7rjht58kixzh8je58xm9s2b8q9tkk07kcrxitzlic73ern6q0fenvwwf9o1w9v8qmdjghkxn916u3qntai7cvnxq35yisv9zk598hf3kf7rc7nua7biai3l3c1yv7qcod09f04lh5nlosnyynmlbuqi4ioodl8yoroa36d7zh0fougc9ju1oxwvuv8q9xqebwap38drwj6i99k5cnsa0eemec6icxu2xv84hsp7dk26itgsq9yhpt6labeo3c4qifi2hsco5290blmyjagprboj21esinexc39hxd3kd3nt3ln39tnhfj2cbkmjv12il3lhsfy0hyyk1lpj23vhs0hbjhkc7v6qh7yd1f1dmfzt6sbrftwbe8pkadlwt3a2xd9pdzvtbetpwro7gp4o8eis1cyty2l32zqzieynxgo4uc1raubb67fsfealqnb2sgtbnqs2b9yq6e8102mevu7zdzsur1yxxxq7ed9ur7g39d1c0saaszs8219vb2e7vrhudvn7jk5ywo1j7pdvyi49vlhfdq7pltu582qwpmbo63n4a4z8klabg5lyrto2ehefdos44uaen2wehqpdjxm7zjtkilza4hoyxbujboencpat7b3ijosaww6jq9kd2lwzaof686wa5tudjsnrt4dccayod',
                filename: '94kilxygp7lborfvg9buuoa09vuxjbnmj0ennzxlz8ontwgq9dzecovk9x5wes5fuborzd06p8las20fcxv2b7rpx2vcxd99itcij1dimpd6c6qwtt3ey342kg970d9o6m9isjqf5yclsc3okyojcof90q0pfmsfl9tsa72dguhfb6xqt080g5c3rzd4ugtdi0a6asl86e0i44gqxore855xyltzrmk4347p809k0r9mpfn3j1w30x84yns2e4z',
                url: 'elbil3awc3qsi22ziycf1nlu9s27cx6fzms3scqzrssjxq21bwse3mld6vc5r8kj66c0ovyhl97urcjnq3zrqznmhlblz922jtsc6mjhtwst2rx1o7w4gydtv3ciud3mhjk69h01x4immni78zhrulh8ed801j6dxit2wzp7r46a5rknfwfrwsteynlv4mupj8vratl67lm7zh6gaibs03eikvpk3vmeeqc9bzid1m5new72kdkaprj18b996eo8ukm11weg9k1n6l5p48ufjeqbol1qrb2wjfs54mjv1a719g7trm90wvxuk9muou1hct434ccsq6zs2apkhn9ylo1m7d8y48tnyciuwaccvs5svjt2315xat5gp1f610teb1s9mx0araq0zl6o2jdq3ce0hzk2mzm2qrxw8pvdon3r679gvtncnokkl08p3mthlqlj2bgbki2q92u7os5c90jbgf1clummbfrwu40qiml1vvgge968a6wgsnyn92lolbrsxrjk6gytncyqj0ov6mvurpuc90hlrk5bik6zz4gl7pnku0ekq9bhdzlbrbmewy8pamqagehmr0c7t5g5fawiuz9g02szmw3ieijr4imu2gzanur0ew5f5ok4g9r9jig2cp1yjs0o375tmh5vji8oo9ahvzdxoi7i4ic67eolw5gi61p3f0zettdxtbw5ecfkrffyvlg9n6z4653pd65cpmdtslqbkuz55m94k7vxivi7fe8z9qi99oigzt7i4oapz6vxqug6goint8y42epwl12izov2u7p0mdastfr2ge402g00vush35ibfvy923zo9vlhsxk9ys327t7qaj5hawkzc6kaz4oe4qcetmgvrf5hzvtzz5hvn9dkoxuqps3jot26ghd4weim8maczwnmz751vf7ibr8bsiks6t5tjpumklwgj5eo2vrf9ap9i2tfrj8v5locdmy96dszy1qmqycsvth8pbbcb9015t3y0rpxgrpb3v9yioahmqpb',
                mime: 'uqpva6gyvw9reuktermyn5ld0n5pec7haxfnoks218c78x1cyh',
                extension: 'afd2hy6vs08g7qstemqr3iki65y3ggpzjk37s1tg08fp1iptpf',
                size: 8670971871,
                width: 785125,
                height: 723592,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'ixllursintlw8vb06zcfbm3tk8j4cby1auy51kn53mpi1365srle4mkw4v27tqcq8l1lo58r4alpx3zgbsxmr0my0x5waz9t52arixfrq8sxt8nqu77kd2yxko4lgr9sjfadvwfuwxvxw4vfscwy581c6e7q04ij54s3wj4f7noweu16kym0h5zzqlzjl5x56xcpca1y0ig4sguq9a6s0k6kl0ha80idvadp03epx1ygqmqbtb7lbz5skbjpgez',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'r8qrwd07n2xmg4iki5ky0f5s67itp3nv3m4exm2p32l7vql8czqs13eapwggrz47f957zhdk8jp',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 821242,
                alt: 'e4puiswzwnlxt6u9athaat5mddq47v4u3gsd12ez9p0331esjzr3qx9v6fan7uzvazs1ytiw45eydt5njm906hrvkbtkixxh8izeim9a6iwcvqg4fo4fokn7su7m24z8031quzz2xijxkdsz3oaqzrhfdttenorvn3qdla84h96i7sv80tndlcat18ucipokjzs7kqi5pnmhywtk4zyuoh585kphrt4lbhv93b95ptt749pemfttlt91jtj6ptr',
                title: 'icyvkurgiupwyk12ma85rn8samdb57tvft8w7a2hy0vdug3p3pr0idjg3re8e63qv77h75xsncr4x3h7f09vgy33y5ouciytosn8azlpfx4q5jylccaehhcaqtcqhg8fzgvqcwsglqqb9koq2v34d81j51bv21xazrq89g9h18pwljfhzi6zdrq342kzpu4r8cztqxxc0v2w6j3tnpizwm1amdj2l0uq7z2xb6mwkedtvparu37bywz74k9der4',
                description: 'Odit sunt aut labore voluptatibus eos rerum commodi dolore. Modi vel et qui quidem corporis. Nulla itaque sunt culpa nihil sunt fugit. Voluptatibus aliquam tempore aut laboriosam et sunt delectus sit. Optio similique perferendis. Error maiores occaecati laboriosam omnis eligendi officia consequatur et.',
                excerpt: 'Nisi facilis eligendi temporibus delectus. Excepturi voluptas placeat at. In incidunt occaecati. Nesciunt laborum rerum adipisci ex et quos aspernatur deserunt.',
                name: 'zv6ptsvfrglbs3z567l23zu754fw7rcbngsmq9yo23y7wszigrmy7earuzqlt8w32v73pk64bidepolmuwwey2zw2j8rom8gtyylnhixofh8b8v1n67kgw7y8bo4yva4oo78fq5ua9fuamta1gv85dj7k66b4vvngojwdraz67ab291q2udyx3fgy2hq669i5iu3heh3qwl7ch6lsgt80xeujer3g5ys12zd10djw6cn1wiwluu1cx4d063wtjh',
                pathname: 'mx7iyrlmt329r6wf4rai9hofxmbhhj2xtr1exn9lppfza9o1m0rg02vnm1ku9ggi788uabrw5d4uditqydmbika67t5aq4y710w4pokzbvb8rsrl5183tzbeb0l6hsil5h3uvwzts8f6x881hk1k3xw84d91i04cr8r4xs03pgh2fykv4q2a3q51ul8kn8jz3fzalryao6u5fcmdkw07t0e9i18xbvb7a50ydw0w7v5vs1ca9u9y51hxbsg47dhxpz07g42v74p21kuy4ibslcvzcy0x86expzqmdxosdsiochqryezbxb4ncg8413e81s9dz557k8icrroumluklo2s3cy5crnxzjuhha4kv3kuprodun5u2f9pbx5p6iyvyjsl9gybrkswwrys32kpcm66t3gjmbdm2f1r3656whdcz8bj3zvzmy5u6zfshikm4xo2tit1x3rdiaiyascqifgbj4jkz2co2ymojm2ygzh26wi0wit0lfhnaa5ny1hbjyra8gtffji6r5slztsgohtnsdm4lg3u99wcitzeea8ps9sngj0cgt2s7lu04fwcjwrrhu0gzeh7v41re2cp99lzwh2wa9051kru4fqu7rcc28nxspfp8ny5r6vrnsvpnkp9bztwid0fk45fk62boatsa1ogajgtly7ae3ij5lxdwrdei10wbkbr5ednypqgbxgdetd4l9wyx09lb95q2zw7yagowwgikrjhobabq0h3kptjmohf9fy67ci9pcke6dfrg107vvaru12h618gsrfo6hu99nwomosfioiajklu8fz8sg1eqxrbdqgyhgtqry2psmk6c4p78xvef1c2tj6s7gh52wjyusw2wi0i54h4s1pa4t6wpzsganips74a8cn6236t5q2k3m4b325r18xl7p28hm0vc7ry8eb2062i3rr9bfeh3acrqbrp4ikl89qkeg24afky0ht9ciueb077ly8k8epxy79gqe9qzs7q4l3swbe1auklr30oe19e',
                filename: '0ct3pmolhkfbmb9e61ole393dyywwynq6f28wwoz88jq9gxuedsd71ccdh60zqbvpzcgo948wyu69sj7xrjjw8yckmm7ptxlt0cpifwg3229cl6fiqpy0ojjd6ae9nq9830l7owfzxsvaeq0fxkoj2pz6ko5hc0the7zal8mvtc4n33z657418plq3qmwwhc0k4pgu3qz41hgwhualqcxoez8uuu16pmds52zcaiiqut9wu1lpoz9m1191d3wfi',
                url: 'gelc9c38mdkqjj274q3uz7fyq3o9xddm4bkhu5pujxdbsdehlui6aezclr4stjtupwjm26ys4u8338cchaylaic747iic6cztmh1j3xrewhmt7uhvtne0km3ze01vah2my8o34xyccdg9pjtn0it21dx7fvrbwqa6r21pb0ocv6sa6bavgvcq2fep4fzsaz09q0dk7umx9vtaykcxuvz41ua91y3lr1rhusua8nd9htrbi1jhq0alrr41dhy3b964spxyfe3zlvudof70kezd18vzc06sfqdmv8g1vv316rsllgwb712ne0ng2k4w055ryokmrnbejzjxz2tq731fonuykdwpry8tw8w7gibl80q76znhkjpqdzvqik3zfuc9ogtl7ip4zaeefr1cc1er4ep14g7jyae4cjxa33wnuyvx79j6wzw4jzmv2mb5nyc04nulgpxskfhmfkqfbm0jkd5vqy85nfr7vhr1ea0zgrqdukys0332gh6tl99exikjfvai4cukvk0l5rzaq1qetrr145mlfjdxfa35r3d1gya5ygrdfpl7qvryov8ian08i9o269tswzafhqlpzi4ehe7p5tkv817wg62cwv6126l0awan932vrhzvzva622zngw733ws7m6m6lx4tktmx5r1rrsxyytt0ok7tx1nvpzse3ta1cx02346r6bb3q092nih4qwhbws18c16r4nw824qnb9v6llom5uozoeaqd3dteknguymhxe0mpx0kzoo9jlx62p0vjiub8jwxmb5vbqbbmapp5zhkrvvnb6t09ouyaz1rha0zarnmp1ovtvuxma1xb38roaao1cszbf42x6ygcc63m4uktvo7fc4y8hwuluo65wd5q89fq7d80dby9v0dxm6bjtxfgj4355rg6cchv1a10gvlzeziq4zumll2bennwawbzepx23ikl0sgyplrcmg2jlk859j155vwym47jdjirm51jqdpwvdmubzpv4pdksr0dpm7iy8w09a',
                mime: 'gxyjnn91hjiimk9mh10nxywzv7dkjmpokcbyzr0ywymk0j38vi',
                extension: 'bvz4hwn3nf8r44sx4z65edx5wgd4cgvcqbiswhwhb0b87nrxfx',
                size: 3473239426,
                width: 543033,
                height: 414190,
                libraryId: '3yg5h7al16khx6da24es1syxvyoqwkicd38m6',
                libraryFilename: '09zf69wcdye14luyuqs4wh19zyhkfagtrc2hldnn3j03h3hormq9whrdqhq79o0bxgwcyi26l53w8bwgiq3b7gz0k6bjysvr697246a758m0nirfjauntp4wfdx9pajug2wjcsyxu837f0qzrei7j1wfx9idicaog3btip9x94elungfco8usao0ic90ewm3bnrwy8kgcswadtemiuc9g9ufnpc8g7fod0tb8lsg8x5c4aexg7phy93td0mt1ii',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'l6059izfgl8q39fey1fh12bxe1insoyh31iwha2ai29t6cvf7flizrkw30bup83butlmzigxyqr9',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 799584,
                alt: '9snecmlnngjim4o8r46e3jaoc315ug9sm4tuvbsvpg2wbjoj8wtorjfm0gujeuti9kwionlmmvn4kj392c85j20twg0y9cnj31lg1ahul9cukiizct2u4g0spqv4kgdvnrlu9d7a6iht5ccjqsok6b311mzkzc6hjhp32ngguv3rygerpew9cfdqogbf9vo0wg4qiyr2tkr90gq475husyiwhw7fqltdafje4gg61ahk1v6o7er5vifw861vz63',
                title: 'fbk7d4xiwta0wizj2vbqus4obwxvc0237sn8p657nw8dwn2jnl91fuvcxx4zo81hypowrh67vds3l4krwr1k4cn39z29vlkc9850vylgdt7x8x2ylcrjtwn0p220eq994cazkoetiye6gdgdnmxdp5h3v2b1tbvw9ky33doyilefnzqlb845o11fmhw1av8tsgnu3mr6k6qmf21a8an401deauk13t61dz43dxtzwamyq1qwhkhk4wbzfeymsyf',
                description: 'Aliquid delectus deserunt cupiditate blanditiis alias distinctio. Id error totam itaque dolorem dolores est. Quidem repellendus nulla sint nemo dolores. Pariatur eum quia quia dolore rerum sed exercitationem optio. Quae et quod est.',
                excerpt: 'Adipisci animi ea corrupti quas sed. Sunt ut omnis qui vel sunt deleniti expedita sed. Laborum sed autem. Beatae ut odit inventore.',
                name: '5cnrt8cqc7ohwfu5plf5rzsmds5l3ofz0l0c8cbq60lto0lnckgatxid60p0zl8wxpbphjljp8e90e2c28v8ssy4a7n9z7vt7mtq0ypvhytv4u22lpqotfoz5etvq5jqgikz5hmskplbyg0v87y7466895h0jy5va2i2n9tveskwlmh8c125kkw18nb9v1dran7owr3wel44gzb5d74athlzlaahpydy20qdcat8irh5by1ih9p2t4obh615jtd',
                pathname: 'hz4tmdjtli45vsww17oaxzbkd7amednh3vfj57d3r219uo48uqkn9mvqm98hknq8ltsgg8r1hcpgep77gs17cehr7vf0y6c9p0pi9p9r6j6ca7jkmjxw5h10dqu5s5ta1ahhrovz9po3fv8iu92k291n3vu022uolgiz6m3xgkyb9djgrh6xq9q3e0ytty00yrnobk07whrf2gif9ahea6m0b0imv3c92lvbikag2xmdgcx3fhf81ve0pdw4em03gt6z4kvz339pqgc3x589z4412d6rafhgdhfjwdnxnzktv4igmpn4sebyhpapua1ukbs4y023bb20cemd0uhro2xn1iw037tii460fdbzobdjc9nidd98kjpoy1flirmbcv1dm3v1k2k590mk41zbsbyc83qvzoriec9fj1hsvgkz5rneaftpbcpdvxhbbkkd6b1oma5lwnhpymuifr9lnt1isefjowaqjihpmsm2s2ozjsfx9qu8ejs49y07lcvk4hxsbzcp9arlpzjicj56xpro3n4n5fd9djaxrafqzp5rpewkejqef7a8h7x61p8pn8h3qr1v6hvm91hffq01wlfhrjkbg9501gzae0vrx9djx6q44lbf2y0vz5hq88rdpvfwp079k5ifw1auivw3mm0pnq3i8h7eq4ndaazjw09bb4gwo9oeon04qna1omabua6rjumapftf330mozjm8tu9qjhs1cjusbcmry3i3hr58l2xf4wx39jjh02xorb92rri5oco0vhqcijvsrtmmjct4sg6szdbw7cm129zi4wpzjqfsvg2afhvbw5vbsnts9ppm67j281cvaqoqw6pp7jimvxd2s58tjbn0vflldijqxldfn0yrvuswlhqqsiobexa7b9pep14ba4b5bi6zi5ewy09syokdi68s7ukao5ibr4ai50j6o6aqbr6d6bou0xxx94bl0dm0u4x4pfkrs2kk4kztdnulzn591vjty8v9clertcgo6696m33n0nb',
                filename: 'ug0p21nhwn0n96cr6srzqd0kp2rdfi06cg3g7my0vm2zgwfovhi8c3hd9huapmlqh2t3jqaxc8dz1q7915dtmhorrlrroqxn4u6hptuf3k02lxgkr9mms13f26ote2l5sx5t7kqx1wifti75lb5tg4zjpk5lwq8d91cwyynrf422zqwuydpp1uqi1cdgjdt0qv06wsoxt29vtftewgvsr9fxy3i669vugdbe7kg6yz5682q3mnouf7bzdh2cfst',
                url: '6ix5hs186oo0wl43hhaxxbbe8n0jbe20wyb491d7mc1siqgyfkm2yfvq6l18zw6nsa36lgwpmm2bz2g823tb4l4k3zvbaiahxihcgtnal3pc598i9kcfjibof8gwgvmrwzihrcaokwewr0p7ok2if4czqnqvfezzti07q2ej2vv2p83xgmdwi58pirx5tfh2h2jdgva6d5gc348xmzvpqzvdgdhyucn7zdw8at7mvr0npa2pvhqmu5r3kgmrzxwvpda5tg1yq1juwsmmcuy26xxc6bdvzdgc16nmainxl51veaxnfmi3po8a0u89tv9i05521ljqirnaukpc39rat9v9v202hoq3r77ags9dww5rk1tcqecnfehhnh5f37bzb5gznpfetvn0gb4mc5c9csm70sk5wodutyeknynldq56fuspdw873uoaqfgem7ubirqoy1qb7fm113x8urjw8zesanf5m9tb7encu4uut7bp47dkrhigz6yhst9s5vg89nw8fem61dr5v5rxsjlqvoryl45bj3vz0p1bskadlrv0903y8cru1alg3097li9kru1qrq11mpjm4rup3tdejxaeuhuadwb2dglvwp256hg43x1n8r8ubzyk4zkxg9lx1rmsjraaytrhg4vieigu24bi8vn2f7szvczrrmjgthmn46o8o63u7c5dmqcd76cymy58evhsfeonj5md80gqiw26rpylwrjnwkrwbdphth79xuw3yjxpzeutzzafia3eiwykdv7auzxaejc5vmxvfq9rxixtbf5v5l23s4bhb4hb6znyysg3n6nwgg4j09tp3z1z5ab882fujtcr2iz2wz5skrz57o1328cji0nx75dj7o3570bgbfil3qm9q04wlcm9855k87fnpgpfewnx60xaqis4245gdzq6km18va613r1w9dk5m99owd9i2951785s795vhaxegaewr1dzz27ceiatjgomkyp4m9alugc4f8tcvkkz7wzptcjnx080',
                mime: 'qdg9es8uwxkwbwy2hwctmnz4vucgfxcyxrettqzdk4879yv7t9',
                extension: 'tkzun1a8o5exnuuz6bc8jd7to1hqw8igin4n9xs3gs3wpqvo6h',
                size: 9945209317,
                width: 372158,
                height: 841470,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'ireeur90my4sxnnql1tt4ms1tcx4ucl4kez5zupn4vf5odsj3t55uamw93100garc6lvbeoz80nxv839n27s5g8o1mt8dvs47148ve4suqs8ukh4op7coz9irdg10i4g8lozea1ayiw197ivhub6aadab6egkwm1agstlkyp81osooehvqzascphakm4mvt5cm68d04wu6vt75dljmq576mtywnfqop90hncewmzjkhrxkw3o9drd66ewmdtm8z',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '8qtvjn7ocs8xps7bzwvbjtjz7cw8j7bzv4k05dh9u1qk2r2z7bf4mfs6lo1z1xo5fz96g0iyrj9',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 6793770,
                alt: 'uuqe3twoi499pf73thm5efddapyzaxwa84sci8mjklshnfqudca67tt07u8rpdbxlyno90cft5gg6d2jp8lbexqoo7de07dkpmn105ca8nysito805h9mw5se2x9nzn3evy6pwz53t6myiaf3d9pzqx0mwc202jx7ug38ppn0hu88r8ktmjhtq2al0d2tty1ycehetfxvu7gett6p5c7dl9yqk82xzp06pqo8pvpwv6p4hiu52gdwcs8oybgeqy',
                title: 'b0kpklwuxrjuhfshwpaqunzekumeqxibr7g22jau5gp23759k2ucg5tyt46h419uobwx1vfc41v4tq82me2cox0upxn8tr9daoxqhhpgux3q06fym5yy8u9saznddlvp4tz6kvb1un2qie6jfuel7w0gwmv0rdpavzu24m8xuc9wwszali71lqbjd1aqaxkhl9h7kq5tbzpaayvbfn2gzlio58otq105bz10yx6ayumgegr7t3n5l2s14xbigc5',
                description: 'Numquam accusamus harum. Soluta assumenda at aliquid voluptatem. Nostrum porro tempora consequuntur quod iusto. Eum sit laboriosam amet molestiae totam eveniet neque dolor necessitatibus. Facere ut autem.',
                excerpt: 'Voluptate fugit totam debitis aliquid non quia eligendi. Unde sit repudiandae consequatur sit. Provident nostrum magni quis quidem.',
                name: 'vpf5gbj09sk1jobvmeb45un75jg6lpv1rln375ssogkkuusp72g6c1vmarrfs4hf00plc05uqrbhvrdcjl457emy5xnzqcb75brmlcqw9bq1wqx5ljlk3bgtnwyc2jagz42s4slwq87qpqo5w7xa6iiyawvp0oiep5r2t7amve1en8464emoh1be9ckxay4fbkpr4vai82cl1q0lxrqmjjk20thh2xk3ptt0l66k3vfq1sk2cw33ipr6wxpzad7',
                pathname: 'fkgi41xof4qz09hlx7dxpxzqgxtmyof85598plt9shjh4rgw1st0obindf7x4175angxfvryjythqb3qnkqtoiz8po6ui628wjyemi2kfl4fm2288x0t9mblik0n32dr8n4gl8v27uvqur0pzdfja3k5b59htibv96b1rotccnczmoalrb0kjigv2clda634nd0qt52ib10puqm6shr9393dlrom2zemiyr1x2rd3lvn3f5ct9s385g4blenu8lbubbuj1rvctned4sebkiwkvp4s8f5zmphfug5iwd0wp8ztxceoo8ttgar9q68f33etrdnzilkahx2n806cre7r8wixson0zrbk3rc35yhi68i5rf9o3mezd4731m6wi0pqp9futxmlnvh1vpu1joxabnlwdvi4l95iunp2dr90m7236x1kdvi33lnctt5w0ic52baf8f6pexgao0j77pykcfrm58zpa58qaagh9iy3oag7zzblol66saqutipwuybf0h8wmgqjr3s7zy25rgb68h2rj0sj7ir6v6v1p1fyg4pw5hzgxobqiys35s12zwyrqbppjs702cm9apzwzt4usodtca418y1f3wp2bjh80o7or6vz421zf1albx5go1oxclg25jn9y2kbyx08r3hamek502soeijbn0d7kzhvzypelohfrf0kq7a3risaz535o0u2wug61pxbfpezvonqv83gdwphbzk15undiawe3jvloqdwp5b8dgto11igk51zp9lbingemwrq2g6krut1903bvqwv9hnll94un5imrlpwc6otfk1mvba21fvxubsdk0gb9z4pujeh7ra0mo2yqi4fec6wk0jkhqzm4oph77k4ycbux5nwa43k161jdurp15nusoutq1r91ekgn47j0wk9ocmrbwwdpklryj1hdedwn4tdavabt24xhit9nksmgx7ljjzrunpdo7vea594sur6zicbcbn7qqgq7olhmcjx1627qx4e82zqyvizgxx',
                filename: 'd2mo3nkw8ubvvzc5rblug3j8kjk2l9ajhqx662xp6ih24psf9powntjdqof33bredmzn3yvvembazpjo6ed7gc83pkwqr9vmmzbllmik9q44ahggvrd4jdwpky958gedv2o6svinriziuo2cu725rykikelq68c6glgzso299q3be25mlvp0pjy3l1z3193f98j7pdsd60c8rvmzd25xh9djes3ejfg6brqiwr9srs2rysm1za0xa4smujwpo4f',
                url: '18dj35wxhd8l9ro3yn5oxlma3go645lwneknregpnizdo135ms31lv6ksrq8gkk946k6f2jvlhgq2hrrdqzporhip8honn6dej3cze2f2b2zckbzfeetka0rnw9tn5kndtrj2vsoxpfkxiqt0n7qqrvaq0b4ecb9jamle4ribgyu3v8nnko9cn68ixt7bfiuia8rp9cmcdpyak5jfpj51bqy0ry7ha4cejsgdz5k0xp47yiuok3wgoqegn22xvkjjg55drthwl5hqbgb9wr4vzwexw8m8sn0zony9nv2ax5t4s8uemr31pzt90x4zwmjwrdjaszqu0hlehw4nfcizmlj8w1eoig04swndxv6bbpidr4tyu6g4vltgu6lei1g9wuuouxajcmzajndl0b23uvbs2txjq8inkuo7v21tillcdlqo50ecjwoh9us2tkk70goy01j4gsaswiij0jtmvn02awvtu2a0q3a49897wwybocf7irdiuxwm6ae5vlzf99x3c3sga1ahx8ib4txhztddqqo7nq6fl6oj73hji0mvco3n203mayatph9tx2cb8ce2trl2e9pew8haca1ip2jxjwqvt9su86tugslwh1pmu8syh7tbjencdvqzj9qiw5hgmd29z1426qh48waztvncvn5bmhpcidu11z0hfx7rfnhpkf3d2ul6vp6nnnqwxpuqm0abolba8yt3dp6f3lw0uq6yr05y86y824kw2fb3e3nrkf58wqvweg24y7n27u4vqp8yfxprmxhzg6pqh4esi2e17mpl7gt6tko1bwfqgc2viba6062yzd74r8emvyxp0hsnarxo9rnyc6jpvxss5g52fuyct7fahmj62mbrsj1ijhcxpc4nfx169jua4xt6y75efcdup8u7zohpwn0x6y6jwsyf24alayr3ybtq1f1p8uxvvirc04ynncrglc27fmq6bml2uuo1qi0k1c7grss4az3np27jhi9nd3sko1lan6qpzxp9l3m45vb',
                mime: 'hxo56gaej8nkhgyx9r1jcj990wqd27iueleukz3lofcp8tg3li',
                extension: '06ejt5tjqitnf83bhbf2bn2gqjzadhkmm8gh5wd47z2iw87eu0',
                size: 3243977141,
                width: 897046,
                height: 291811,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'lxwoh944wf2atwsjwse83mdadklf8hzijuqven8gmw35e61ixfnhj29vq79c0i4eqhucqnnf3c6rvp1xexswjv4hyoub6m4c8t5oa9vdwgsxo8hq98x4r98ndvwmh1x4bhgt0o9gyh97m39qko97ge3c3lfyit6b2vjujftp6ssnswo7sny1k8dbr6f7c2djjvd5n0465ugr3l7vlgdekq4w25x9vpz94xf7ffziijaoie2v0i0zcrabjthvtez',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'glzv1007y5vcz0gnoa2aridefnvf366e4gq4kaaazc9st62cjgar3l6glq9zeb4eabkn0buvu39',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 676256,
                alt: 'bgmurxmbj7ysolo3fy1k0vszc59esi9aqket4ekgkj5m6nn21mjgxhthr2evfpsowd3l6tw3c6jzj5dldbspqej34gx1xbr5lun030wnve5l590frxa70a7y07ble4mgl5wnnm0kipo6lzmjhsqg86fwfo5sex6syyjnd0k73kwvqrnukmpe21kelucqfjhjcvgggo5mcvz8vzyzrrpf4tjhyfpedv2dmtm7nvtj8giihux24k3bnkfx64d871rn',
                title: 'eymu1f7yhyep5ww2g0p1g4h17ydiep1pc52ic7tpmf7w4dqof13i2ukpqyh13sehrt77k5sig632ri0ldsyeondeibzlza1l1xxdkartqdbrveh5gojf9zyynckm7k2eugvulq44gjj1x87lwwhv5n8xbckuqjdajpeaezjf6qwknzic8v7c2w5dfkpmkst4zg68sinvg9cs6carcnlc2aop93cm0t6qlcni9o91p68zy1rcq0r96kc6y6nfxhr',
                description: 'Assumenda rerum porro quisquam consequatur sunt numquam omnis maiores eum. Omnis esse culpa iste qui. Est fugit repellat sint. Ad adipisci ut aperiam quod iusto voluptates asperiores ratione. Possimus non modi beatae fugiat suscipit quod voluptate.',
                excerpt: 'Enim quam ab reiciendis non eum vel aut dolorem non. Rem consequatur blanditiis ratione. Nemo et molestias et explicabo autem voluptate. Assumenda ex eos. Et amet quod quas autem illum minima quisquam voluptate. Enim quaerat omnis soluta temporibus et illum veritatis temporibus.',
                name: '8jfe4soidwzpabnfcc8lf0n7bpi2p0t6p0cjv4fyakv6wk1nk9hge1lw4zaj6ekge3ur3abbp0dkh5nu4wkvjqghtoaebghs02a9e8eu94trmsr1q61tcn0z0mbeud6acqx9b0fdwjn0095tf1prcjeotld2j7k1y2pvrdi3sevezqagyv3vlolmwiig5ccu9c70br2by3ofntyl2mntsnypgx9eldl9c94of5q3eijb9f52tkc1ho81kv8yzb7',
                pathname: 'p14fizr6s4i8pblz8loro1myobbyia39ctm3yzz5r3snx2r3l4e9vkuoin78grejcbvv7wt0w8l9xdupllcrc12x1mmisic0d5dz86lhttzwt9t5cklkgkgqpd3bqnu9uckao2tmiazu29q934cjx6guu2e2m46ggg9hdtk53pwhpzp00s5mgudd7jlunw71p33tdn5rtkn1wgoj81nav2o9700811otslqlsxwcivtcw3240rsudlz9yl6o2y5pgw8knyompflt4m989mkd1yombci5nzhc2xeedcyvmu6b8n6rxjo6ahsz1ilnm8ob8j230bdgbzuu2jpns5tu8bq4la2tkantr7pqwu0mvvf7jm4ps9qshv2vdjxx883gxvbb3224n128x0p6kpvbj3ge9trbh29418x8xjwdn6qmpt0b1749jhdvewtdakppr1cx5fnml6gg3ywh17spvr4sb3f18398514qzn40ngle8fb7t2lg9lqjpq0xywkhshemfq9n9rtwm4w4o54cxz9agj80kfqchtpdl6t4uyckigsrsj0xl583fiv9h4044r0dsqgkctr05k0h8kgx3koolo5yv8vga3zmxwjuy2cz468yag3sq4ne7s570056ju0ozbjaw6rmb4fh4lsf50vp9udg4c9bz5e0x2unzf5vax2ah001300x9o6qe14scw9knzfw79cfuwhaee5romuzvifeh5myqi2sn6jnp7ov6uht3ifxmuikt3unetr0mrujpq94mkhcr7vs3chrfjoqs5uebszui0r6easl0jczmc1rnbtw60gxk5xq2darbblxvdedlne13mll1jglph23ulsy4z1jrenlgrfslf2sp5ez4h4jdmuaji1m9rbrwz2i9qgtn3er38qu9dupy39d8wumkfrrjyh0dkqbhb332a3byyuws8c1ratw2rt1w386rtly49e3ieo9ohvozpbuc4ighz4scdkqiyqran2rg65u9ysv6ybsj00wsw60',
                filename: 'iqa1p6pdypd717s49w0p32i90wwd419pmbpflgvc4w3e426518r3ejlm4s3mj34foodqhj6jgetgwcpdde6dc3ugp5z4g37npwdawm6v76cviqxf8r1u8rtjrxljacvd678gjv6m6uhvmxpejjepjbxuxi5srva8lzyb72wnjspcpl9kr2prqfi314xpxbq824rwva0ruql0y1e9u41w647pc56nkn61lrjn36co9m3wkngwooeecxqaty84yxc',
                url: 'zdendou3qiqhvnt9exwbdjw5ohsm6cua92obkxeqj27788br8hvmhr72x1a6yjzg9vpexfjd61ea0usx87hcsnv5sxbbbj28qr0d5v7yr8zvctxpjp8fw95ta83ppip1ehz2ckdszkyo7h36jguk3m6ftt9dz3n2fzo3gv1ze25che9tnwun639s53lnpbd01v1io95m72jetfexwd23053wgyl6r4npljv9ujkj56z1kpyjp706miziu98ivk39wzmggpnj9hfki9mz79ql03pwihgsmn1r7nt047nefd5mftuyr0snts1hm20ywlggo7y43rsmaluje7khcq8fj4lurdyd8m6syu1y88f7mkq37j87xl3olvvlcprx4q6s4jzt58ox8asq00bsllrr2zzlwwpeksn5g4lebcq9nigpbe23i3a61a4tjzfnrqistsex7793asdt7algyz2o1qzra0iw3mlafxtlj3tob5lbk154gujawin0or60indv62zffzxv9ut7uct18zpt1zujgtl5xc332fyava1ey8wvh0yc2zao7pf6imjlfdpd00ojvlzmfokm49v0ghnw1d3crojon2o27ahjed2baf2vttmk9qrelrzfsdhareioen30ny73yfg9co7mr452yht7i2llwou8d72vx0pda0r06u7f7xc2kc87llorody9lo076w4abzlbe08xjmv6agf5n77ok5jvo5yhyule8m1zr3zexk3vvpt7n88uypy7mmmg14l52ikz8jk2qzugt6tymp9y2wbbw8bx4us09jjg2pur0b2zzhgjigo32kksd96zuo7bayn9mhemadzr3btbntqpy0b2ynf7mo35xeh3pmykzcw6yx8ykvahj09yvyim7o5ns5u02m9ev5w76ywdc1v5k6bxstevtjq1ynomt1cwsff6i79wio1l1udsj26bv7l9grnugtleaz3xywo3i4uqm6j4novr7yl7gdpcca2htqwiasux97j7a0ox',
                mime: 'dhxzffgtwykv4vn14honpo288fqjwieok0qfqqtvxk95e4bokd',
                extension: 'wmz8sl2gv0g9ui7mhms78njh9yqd2q5czkkjmhr1iqcv0lnx8y',
                size: 4471597041,
                width: 949691,
                height: 302801,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'ei92gqglofk95u4kk7jtg4pu2iyi215i0omdq6pc45ioo9hgbqjeqiu5mnt63rkfna5558aasc6wincrmr5ou11yyz5b4twsm45zxecszzxf5je6dmhzu0a2xo2580xpqr6nykouptcoadirin1aihwvzkqj2q29t1j3f5xhubr8uz023jp1eomf7mix5qjm58ieyospg22av3ozi0wdiaqiqpxp7vambuzlwqrlhvnlkw0r0bxgvz95v7e0lzy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '9kud73ueee3vfhayidcpxcwuwc75xghyccp7kokne93od556einak0zk76cikmx69q9dnpozsrp',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 287631,
                alt: 'xe60syfqirt54l9uat6vjrm9q117fkrlvhfo5jqatxf2glbzc54ne0nifspmpqh1qjkn8ebb0ub8av78vog43z1fq9qtbzs83p61fx17nqg3e7nu8hbjd7po9me2q1igw2q41rgu5lf8ybeo2cizg5m3s2kv0bv5xm9r5tgi481usphg28837jk0bile9jv10q9v7gb6r777bwks0trrsu5jl4y5r79mqg6oo3y79cecbu8ynkjtpt3iwttp639',
                title: 'vbplakd9gw6amhh96lv0yau58mk5p9vgfw5c2r0eu4ww5magfb0x73zdt18lvkjfmmzapxvrfc676na1d8tffqg7gf5jstac2y7h7b6t3qclz6mr4zvtn51mjhchlusr0ztbu4ljbv515vvz8ljoeur4fx8qiyikv2ces2bhmx60b8ouzjbqxsozalko41c3mkrv8cfx36ua2zfyc052117t9xhwswbay91h870batyimf7mkuivbxyxpj6coqc7',
                description: 'Quaerat voluptatem sed consequatur minima vitae libero. Ratione ea et et. Dolor sit sit exercitationem reiciendis. Cupiditate libero quod sit fuga debitis rem totam earum fugit. Neque dignissimos ullam quos.',
                excerpt: 'Eum corporis libero quis est ratione ducimus est quia fugiat. Ratione inventore quia atque autem maxime. Iure ad non ea. Quod quae sequi sit voluptas in optio aperiam.',
                name: '2adbhnuldn0n0d2jn1x8iko1mwmsli8hpsolxvo0tmuq2qc8yf257mxoc664nanuq2r61zgqez0ytpuelguowtuhkaool5gryd4ohdwqcwdfeug17ze4dmqszy55maajyilybqeq9m4t5mndj7csylbtut7xmhto2jq8u5shukr8mrht1py1hktxofvmakt53up50gs8dha0kvjpumbgowjk50fg7mvs5z1bp1sp63ohm4ivvt3zgllrd9yspf0',
                pathname: 'f1ruj77x7ci88q2eqyfvavuhpiyx44k5htepwrv9jgw69i28z5p7wen83tan01xmbgebs2xsulizl57fe5tjoz84h87v9x7vjvu0ra0gzenu8s4o6b5zkrcsyehas99750kse7eqyaqftobcov8wy9t30uw0l83l3490fu9ry2i4jrv49zjpl6f7vzym2ihboql26kpj5o9td0uap1mqiwxpmvpwcdp6r2duedmogr74oh05b3xb5qxx77xvxctpifcz19yxsu68zyx6akah93myrdspbm9mbdb2h4n1tvp59b7p3sbgnannfiu6e96toic0tyu9ljdhauimr6nhdyxrwfxz9dofiu78puu0mzeyykva8tqv4xxdgakgftqhudzneodrfls5xbh3pok3a4ifu6tfi1f5znwkp4ivvhaxjkcj3aq66ck54v8ly2fy7on0uf9gwb8mpcxmlcj2ptjksb976ihk9jjpsp3tcl99prn2a84f7yq1d44j6fryuhoeu4tjo8b1kj39mq7jq9cok2syoelbo3xd5h5zqihhu8s6om4l1ddkj6kp9it1squsc8fsunqyxi3pzksdoiqjbdbw5bria24x6p2u3dyhu4w9rjpek2751ikfztuwist1rf169jv4taa5z97ul4jphb61c64eszrvqxidm1jl55ynromngbapjhd4ugdhihaf9a3igvh0lqp52m97p5lqzvp9sf8t8ifr2rju1l9gtyt4au6l7g74hljh2vklhzub5tbxar4erxccg49p36bqi6qjkr1l0g15yy7rtx912vemek5tzmjwjcpinr22t94or03cufgm1cnoxvwowk9up6s7vjjn34l5em4uvwy9imb5gklsryh7x6oh25kxtxlxxlf24xdz0sfrowfvkzkcr5eqd6k57p2hizgrhwlox29q291khtxk2wdu8woi0qo43u6b0d8e0lacgrfbh3s6flvz3onqzz8ddtas11atiuiekve5mj0unqax5be3',
                filename: 'jramqwez43494iggc9el8arbeeboyxjjm69zyffccnstm32maopnz30wd8367kbahcu6m3my1p3zxapx1ql0q4lz6y7xhzlvp6r6np2mcjf5iv4of2jxtxj8y0a8kh33fjcquvhyc8vmcls8gnwvsj414nkrh0vkrgrnsoy0sbybltdhltl6vkgijwixgndcte75faw83eotz4ld3kl2i8z1tnq0c814jze9wtaejpahwbput2cyu9vjlnido46',
                url: 's8x9ivbv9hys2p1zzm1hqu5anuxrjmrflwupn1l6euvg2ewx9jaqfa7bz7g5af5ou2eobj8qowz9sqvjlz11owo51bbitxyflzqteulti037fejxv1h5wlxslf3eynjkus0dlmruw5lxa1nlzp3t7se57ja5fmq2pdar6lei97srhvm38aehjcvwyavysbr0slyzzj06cxyhdh4xmy814asbgptsl3iq7q6ax2ngzddtdf5x7imtmhzb40z4sno8mee0z58l0kevcy6h44ckk5rpxd6hs1c437gp3s3tuysffshiz8i22qrn4xeob8023rqcyt59ogco990d89r8bubdi7ydy4cpb3i5m2fkr6rvumu9ndpsqc71qh9dkt1qbh7k5wnr3t23bolvw06c9acj3m2uezam0w0g9e0r76gcpy75jtldo1fu83d9zk98znttizhnjtydk2zrwhv648xxqxhcwu7tnh4uj5vfyt9jfxcu3cws6uuphgl17yr1fgbw9tr850ercajisusbhnmxtw55fxyhzal6apx9du4tyauofm9952kemybdcpf3j0ov1jxj9nulzrg7mu1n9461cg4yz6728mvdqx596d3bats3xsafnda9ox85zv3fw7a0odoe0a3xh8cy9wuggq94svnfhrres4rkqytuze49h6oywzjxmq0r4jj4tfgm6ucl3ils1yipqnafw2af5ejwcvilam2ve01q0f8x7z77s5zuli1w7klwypohwpl9t7muzrvcb8rk7bqdwcdh9qeotsp1r1cqfknzabufng7glk321lkvg473r8u47wrb8h9e27f6chgs1c0m6lhph2nzk59uaxvdqv0z3xz919q6acy5lhjad80hnv4iz5no3pqi5p6v4c68n1pqyf4p49z5xgknxu81wfyif6m3o5m7j9suxkog05wjnnj8cbq52f1z47qvjafds08o2mwfn7ghe2qos01yvwl3xllwmmgn29srmkni80yaxb39w0rk',
                mime: '3d4t7tosbla4m4om5ph5wq24irq4ohe9wsrt2esvcx3phbhv0a',
                extension: 'mz2qv6nsv604tyqhsfyn2bpums5c2xus52fb5a551b9g5mxqtn',
                size: 1507899890,
                width: 942344,
                height: 261937,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'n1vsqbrff5wzh1ou0zdcwp80ivbvz297ehaxbecxs7mizigtzufj6dl2wun22l7ox4df06ngwxnnmpd7ypwohhr9my0ii03y7k8i21ayx3mtek5cilcsg5udkbc1atb5rd7kom52u10venxjwxu3ku4g9ge1cm2vmkbr5yo1vjaa5vxhipc2s13n8ze128gorwv0na9wdhh81500vjl0x4aycw19u9ep369be3k03j2hou9dpe6th46aomkp2tg',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '56zlbv1gh5sof7bua69hq0ktedretcppoz0qka5c2j5cfaux9a3fe76d16o48bjglpnwce7sbg0',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 757133,
                alt: 'xnulfvodzk0yd4v04sifm199z0du71okfgdx7h5x97zmpjifbepxzuhwxsd1j613zhpofjve83bek1qsjaeeie3lpxuphpqmmmxlkpzeu6g12f8zszrl4sr9i3tvu39kzrlt4p1ok58kpylq6ba4a9tnpja30n62iofys63zhhhdwmvfvp2q09pabgsxqce9qe8xicr31bw4gdet7dfhif0e1aa0sqrsoahj0yengv31ghgf2khq7zn5va4h6ak',
                title: 'mug31822yyepiyfgapfxcslezod3i63i4vxozomphbo2p1gyk7qdcrjvrzj9icmfpr8i3tp1glmpaz05pqbljx4i4ry22dx92srp83m98ifkv431m2emag68fw2gmlftzwzpq646zoc3mrg3ktujogc0bo56vwizuiz8syq4kc7s316mvqicf2cg4z8sao4lcrwhepjtnnd0sliuuhkz73irftqls06nj9q4weouacro9nef9j2iuhm5tmznjce',
                description: 'Nihil et incidunt ut est ipsa possimus. Dolor ipsa fuga incidunt sunt animi sint rem. Odit voluptas corporis doloribus dolor et praesentium alias consequuntur. Aliquid saepe est quia optio fugit ut. Quaerat quis ut quaerat quia. Omnis repellat a et.',
                excerpt: 'Consequatur molestiae eos. Excepturi sed aperiam harum qui est aut. Facilis hic sed qui corrupti earum rerum et. Architecto excepturi autem qui ea neque. Neque omnis voluptas. Explicabo omnis facere qui modi nemo cum earum.',
                name: 'vvawathqrt3dcv5x0s19f6iyqbu339idzn7itvzjddfcpug4lr0f37e73saclhhj6d0d3jyf8h03xzpwgeerpa7xqzxeiat0bdeamxniwbs1mf3ecxn8bumw9kie62yk7zuzrhp1i17s1onzrj7gbyko37s50vy9bp8qxph7dwup35adhc174usf960jlves7qpmo2onhgsvosaj4q2y3dleeijmuezegsqh28x0rwr70qo7u513vpimfa02anvv',
                pathname: '94bdkp6clk4ga83bli0g18uqklkuvdizhtdomqsky2nmw5su6ckh70o5yjdbpim0h3j3ypu97cf0wfluztwakfwulznxt8spll3jtr756te85xtll9kanb6hhfqhlaqcjv2mrlw2o52lfw7tsrt9rtkkk4plqwgtd93fo545bhxsh8eeuykpzbytybko66y0oe6nv8tjalgxwewhv3hbvygxx2nln51dgnrfk57ju5cm25evyp681y11ie9cguaxi086kzvk4egmkxfe10pvlhg6ncqm0l2v5x3kyc4riw3kyogi36jz57my9px4u1ja40kt8trt0q635vk4f4192904tttesng4w2995ghm1itwsjg0hx276efx1bnucpijd07q44ptab2m3iq3n2yl2fdyz59bl9h0y7ncc76ju7tvefbfgf1q9rf1ynauldj25dskax9psslrdw7adu0sh483y14rekzv7nwb1glna155huahtsm36nfa31919b4rkw6lq4peja67tzp4ultzdg6fuc951b79v0177j1qwv86jbpj9zhupiw8wvr334k30x515djd6xrujztwh36xlv29y6713fxyxocdujn748okl5cqoqw382woznyv71ljbsxrwmrl1l35nxjcowqmawlstneoew4ck494poevejamxkyunh0h2xhfw59qdwa533u7yc2qpe563s5qmpxzkfdi6rj2ug97s6tjvls5zbac68uvdk328u7n5aq9q8oldmg7fc9azh8qunpio06nmpq5jgl3zhzd2s1gur475acgc51e8aubw3ongjh7u8dy2z2swdb9rjabkk3a295u4erlosyxj1p8tiehytt0rm7sic46ws5ql8jj3rkc0fo1rxraacph81y5pmrgvl3o0z5q0xbd4tz3ny6jvby1ykjycxzkiblz1rsws5r20ot4g2ww2a786w46l409m4mveckiwtak3vvqxfg2ptkkizcjgpz4b063t7ud70nrd164',
                filename: 'lp23n3nqyp274e4upg57xpqdzh1wrgxfnsvnip6w22wev1z60bmvadlvpvxa17y6flw1bl5ezfwnpqud1w42k52zc5ie2h214fjvl0g7n2whj6ue9urf9kde18x7syz0fde649bjabo8ldhur6lpcnl5t4y7mcgucn7a9v7uzxl6x63vis5h119k7qh3ruvutvn5rhqv4l08i983e0emd4soc28nv4pxtwanvkztco8whkwsfn20zv79n2i5dif',
                url: '8wpcv9kyrjvzcnt6lytwd6t6f36ys6bwa1lr3worswkuyfxg3dejkbf1dts7z2orxvnsma0qyz6sebibmncwgyafjehwoe7wdyqyvmbnwwvydh0ez5gy0n2zh0w671t7p821t1z20mftwid7s19f8l8ns5j0d3smsvxphsd6jy5541q4ml166nyhhbvamsykjh6xklh3k4lf3x2g30dm4dm21bahqcgo5stmn2io7f77z8s76p9bxx6x2i7txuzkopzpqlbtbtvq5txjrhcwtahww8mnwdc4pn0p55ovrhe05jwusrnp2ltp5p9ooeie0zqpcerkisccqqhwc8ulrl9bj80r82lz9grmg0wjslqnzfpfa96ux8qjs4xv7vt4cr5o4lo26dbyqenfhnaepdddp896xht96t7wby8c3084kafy7f4j6sgheg1xubbk7971falgjyt3mjmj61mexr3xx55nb4rh5u60f8tnh8n888ly1f53eo7wzdhwerdisx37eb2ykqx5ksp1sods9isf5edtdmqcpptps7sxrwv04mkgcukn0ham70m0wv1bppgd3t4mehi8iuq8uafhjbr9zgwc6ycz1tds2snhs0xm89vurzsmk0grltblgg7sh30ddirry6e2mvol5pmuqcbyomgqyfmucf7bhkckmtl741k3vioxdsdcsylc4btwd73lp7vfaos6xpoa9qadgdnjkxlwwtmioij6undlcaiesmvy152bfnekq88ehb0230qhhufp5sx76b0nv5y9ltmk4zm6lmyh5hwr32dkivcw5hnxtuti3t8wuuge7q531ku8r05mmgqi3rnckuhn4schmvy1y7cmbozxc6h7homdb8zhewtqu2z4yt1qgjl6hxaoifunm4ilcvws0nj7dkw7x672qpwf8fc6rna5b1ri5b8stvfn9mmed1fmmlz9syk8xxbpcpqutkbb9mzkxfvgxi3cufshqehvnt60npqla8n9mrcz6ymmusnh64ix',
                mime: 'cglljn3ow9bnz2bqdg1hhhj3j5uca2aciq9hgcodkhsbb1d8d7',
                extension: 'vm88d0f3vx4k8lkcek3jqmx6z958q949tfykr4j2cubipky5cb',
                size: 4223942075,
                width: 197867,
                height: 535187,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: '7lyjqjatjmf51topvx137n2aygqd70wmz7gjw30ke9qcj7qpos2r1itk2x87mkikpl1jci8lnqkc8xtcswi8dm7nj41n7wv92fh6xcbwgx299jvy4kxo8yf35gd1z54zo4j1m7uyphjdj8or0h2vcv9zwu55xt9dm4952wr6avzdwr0j2afe2somm2g67kqq090ii2r9h7aimi7roks5dv5qisvy7ltnqx2h5u1472cv2xz097g31ordmzsc54x',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '6m2xczi8rf3yzcdfstp90dn3w0dgpxotpt8xhbd2potnojtzpvucd0y4k9n6akcupyhwr02u0ll',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 822312,
                alt: 'sw20x3urt0ga5juzf35rxzvfld63v3ip0qkooutiuayuk7p39ys8cw44aca0mrthioecvr2lll3njwdek5ro86xrzy8rprf28ie3g4mbqy2t7c18vympq7nm1qm33o3r92c2xfqeu083h6h1dyk90uj9lw0xho4ar3g24eeai7a3st33tbdopsbsjb5snu8cr7f1pbhocqzlfg9crgdo9tudxa6gmkhye2anrj15ht4fo6khwmmhrw9s8w0ftbf',
                title: '72q55h45n0fklhnxkq4vkewvdqvpsz9zapltwd0m0zal6iagezex9xr0o4f2goujdudwv70idgzkdze9uxk2vk91qcaffu3f18mc3gw4xg1m8oi3sqei9pum2fm79lptlu4hyl8sathkllcqi1y9pg7rnhr3d3837ytd49w3mz6x3ahkn6veydb7v8ft34re2mjbp00s76mpawtphx2ld0wfeh2jlists9ir0f8jira4hoemsejmrxnt1n036em',
                description: 'Facilis laudantium aliquid aut non. Sed quas similique id nisi. Saepe vitae sint quia. Veritatis commodi aliquam. Nobis labore perferendis at. Incidunt qui ad.',
                excerpt: 'Officiis minus cupiditate assumenda recusandae numquam dignissimos maiores dicta. Explicabo velit enim aut aliquid qui eos laudantium aliquam. Repudiandae eveniet ducimus vel.',
                name: 'eqfa8qr1ohqalu8b1h8csv4wnspcwgg74vfb50omz865bhnrcvsqp85eitg0vu3ui3epa4df80zeiojm4e98lqf03ecg9fjt536ddnrfe9rtn3qldcjbvj04ldhj0a08mjp3bri5bdp5envylt02la8m2705tijh2c2tehyzsq8id6tmfm0mhh5czly24ti7nyvoz7bmknbbg0e39n135yr8urjc2tvqksp97e7t8hh3r8n8b0f2yiym3o2ygyi',
                pathname: 'zu4g753m152a2n2h6qdiamokotmrn6mdexujhiuegl9a8ksujx3x9qp59hxrxcfl4ewtulxwdlx3brxl1jsurnspdcbax788102hv6o9m35xof3bvd7xezzqjsleud6qh73x6tme56adkr1d7alzl6kqfg8ame434qvy7ishzth97cpskw639jtnbsbc235y6uxgfpmw1d9r8dsuhumskjh38i2iqz2omu87vdq639evbzs596gr4bx044yx28dlmpb0fjub3ghr3jffucw84ixyqsqv8n7jqde3twyqkkent9gpug4gkt5e00fwqcs931b6ouqzud2lcgvkec5ekxdpvny2998ydxpbebe171pc616bmwkpaeohet05llsjnhpe4tt4va85s4glw0k5a06sukz7wrawjpmv1jam28bm93vn0x5rrrn5mtm2glcd6j1u6f1zgwc30xgqy4cu2rkhcsv2wcp8sgps51figucm1fsz3xyxm9uybb87wv97bzpzslzy5e0fe8ebco1uoqdpap2fhohboi4c3vep436010akk9xtkzwh7dw1vobfjaa2g68bkzcn6f606ibtba5vqzrvkayzcaptre67glefd13wj6td9537n8hjnxr37jujadm36lzfw9zrddmm5brb1drok4ww0wwfp6u0j4mo29919mv1h5shs47tctw13jbcs6b9nqf8eeld34xss9zq2z1rudvyofu45jexhdpbjxjuvg9ja37cgqzxg6mewnc6cfd6elibvj2qu2ctyhxw5bvwmhplor5tjowgpk95t02cw2tjzj5j2yzektqrakqwaoicn9lre152mtdo0s17tae6wxogldxqs0mzd7zolswbtp2rdf3ftfeuj2z17xo49con87qvgclccsplf43sx4sdrr73fmfjign454v0f88mhs9kynrfae9de8b6ta6bfdcxmzori31750uuti5sgern7wuu3cfpgznnudly0npgp38d979uzj7jwptk3',
                filename: 'e8gbsr8r1brt6u2sdhlfqsou07nrhmgx0sgsn4vcj47a556q058t81xq2epacl2rfm3imc878i82r78tpt41zt435bdg1pvj7yj0qwbfzh9kzwwzi13ai1s0l90x089058tc2tk9boemyhayl5k2rw1mw7vqqiq025tkhnkssijkzfof1f11b228wdyrlik9c1ga45gkisyjk9n5y74ll3v163rkryj55likg6poev2qm2gjgs6ukjit5o75gm9',
                url: '1dgl302a66v5c9mz7lgcf4bogy5dcnl0h3t2jb06d48j1pmpsmpc3nx1lvu9ecu92wzaly4jo32pstql2vno5r23qbe7ck1n3o0kg2v853kvhjior3t6b2v29s9bswure5y4spvfx3ii7ar15ocx3kpthal7eviez23cdo8ecm98cgua8mf17gsuh6iavpo755wvt9zs8z5lcuv7ybppkig5ltarfcd3gu68vrwc8lfx4hj0u6cwc3qcqjhk9c8vb0k39abjugw0kfrumaz139nx0ewqve5gaf3kewnlg4ml8bfvuscz25qmuxpkgr9p9r5wprn4mpv9oeqk4n4qhb1djdgk4ydf6xo236q8oo242st9sby6yprczff3ywkm3w1abzn06y4m7i745gangstrtlpzrskplil4kr7prfj50tgpv4zv9wek8y1oar6jhu51bt09l3hiuy5a3kks8s6zk81xb78wpizsnpdj1z4qwljojudxkwc6n9tfsvm8yunzx0w4o4al3cgk4wrr4xntioieert2nyu160xsflvqlmndwqm0ooi0135qbmv4smalon1advayz3n6b7pkoxqaaswqc8wv6h0gb0kuq9vrxoxxakk06nnu8kkst9wdakxo0813cegf96iwormi60ehb6v2vd1l0baoemjyc2hmmvnv7dix6cx51job0p1w4uvrg7zznbm295i28trgxiyxj71kluixrwp1t2agf0epbzf5mys9sfurz2cow65uu8ayka2qy9uonwo2qelqw6tp6hs35bgi2qqyji0owg4hqocezsrmcjzpmavdwl2cuscdio1sekbwk3lj1gcfkv18jqtl9u3gu718z387ju49tlodsz651nfohygx614dzusdaff530iidreel72fsekd3cztbiy5llavcpjlm73bftgfh4qfgnu3w0v0jxyiw2leg5yvck7b3burz77rksu7su0o9rjq4ma1qnt1c6svuvr4r5nr6z74l7jdkeir',
                mime: '3izccpctatx3p81tjyvlxhlpjc15bs8di9p2505sangmgfuv5s',
                extension: 'nasck5pbcvdfveuvfq6dk289yzkbrzde9u8hd9eyayj5zlwjgo',
                size: 2427927203,
                width: 994967,
                height: 119164,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'kisc2gnwtr3st9j4vcuwx6kh2badjnuo5sd9j9y82v7jei0tc5aj217sm506ffrq30jgd4ccgoktndtrf3pdy6yc0esmakiise8u73r3zbu6s9os8vaszvrz0gs39feb5wozp3ok1ug91dc745j397q492nr6egsgr0z9w4l3zi6y1pd0cezylpx1mo8fbwqzhkkf6eyagxxiegwcum6zf3va9tpo3g19m67g4d71oirr157w91h694e7tngcq5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'ovwz8r874ju6v63d9utknma6g53pupmb3ivxbj1nq4i99pih9rcng07kog0pmz8umbq59k87489',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 102474,
                alt: 'txyc7v9ymwoq6iugs45nifd0oubzc0sz4l5rhwbeukq0ln7q9g83lyywytoz9totz2h2jiiqnyk5rdlqkkw4s6ixlc5cp5d0japzv1bnhaawd89tv1l8izcgmhfblt7xfnprjpwxuz25ebk0mebuij6jy21u4ru99jnqlzda3g3l5vhc00w0fsks07wxnavgiitln1qhs2b58lwc1zlgeypp8ugt66hb5akflx9fkcxju9uxg2epe9dvz98y0d9',
                title: '6jtbvien02af7hr2kznvui690kl8fs22d6nc5dr7xn33u869tsf37fg8xz06o97ib00fpg0ulca9bq3d9e1i1yzq96t891wsrov3fmlb0jbem5dnl5kr3vy67oflbn2joewtrikxcw6rhte9vjadvx3y8kq3uf0tiidzy59n4vcvla4cphjn3ysgqtq6dhbdqwxx5vbvf4d44n24y0x2ml560g5q0kc0hl8k0t4kq07hcqowq7b91xat0vcmrce',
                description: 'Nostrum facere eaque quod facilis eum saepe est repellendus. Necessitatibus beatae dolorum. Quia dignissimos ut officiis accusamus et quidem et a animi. Enim ut enim et aut quam molestias facere. Totam quod eos consequatur quod eum molestiae. Quas odio vero modi sit repudiandae asperiores.',
                excerpt: 'Id tempora officia sapiente eos quos eos. Necessitatibus odit nisi fugiat atque. Laborum laudantium non eius est non error id animi.',
                name: 'keei7f7cl0bqmmwkx6pns71zzo7awndmog5xtzxlu6tln8hrwehq7715dsl6ag76g6pvwwzhvmozq405szhe1wvqwo7niscr5895ztwovouu5appjzt6ny8hxtoqaqe1yxfj7g6v0xpkedz5zu5npg6jxd67je0zmggnwk0bwvi0k25d35zixnbtoxdb6vlggwk4crcwnz7yit3rb0qr03hhye7sfi7uru17oxhiwadep7b5tsuoijmb073ndee',
                pathname: 'lvyzhxjgbyqo9da5wac0rmxbkdpad3g2qj1suuxpqifklsspj3b3po1wx0y2dl2jvdc6u4lbfjy65qrr31mb79e9s45akrqg649r8p5rut90cjun6ncklc6u7jaxa07rgs3xldti4s9o0bjh1s0meua6laan91dsi2l5cq6l8tv3y6b4p7i4kizulokwqvuq47cynex55m56z0oe2a49srtiovshi98idbm2yb1542kvd27jzb6arjw7z2qvkb80pyntkmc8h8gcay36h3u13lojggnlfv6g60es1ssllhwd92fdiko42c2rrvhjnrwyndpwdzilkpjzf8do0vgrknvniu7edbftm65warkce84d1k7xlzyb3kfctc5pnn75rr5sm1anulo0ck2dkta3ify1upj34j6soo6nxz5c4f20skmld92kkcqjtept7hn6k2c9mm4raivrtxegx12jf60wyl1gq49pxxj85a4lu94j14xfjlq8crw4xo5sm27xbfkbgiitl7ncec9hs1l9t3htydfcajoshem87lsngyfg568mhi9mxmum57exocg09bp6873sudi4vu4trf3a0e2x8haq53xsxze70x2colbrc00ernxqre7egf707upf3hyiom4ugsm9qwu1kj4hrumk6sw8lfyj93f5lpdl9lg1jkhec7smo9u140a8fhccf6dhg6os7v3amr5rsxykcff9q4f8h9epd12lu3zx0tzjavll3v1pe6cdlu8q7yj71g7lzs57kklcg1ul91yx0hsum1xk8yf18othty6dttds7tfzecot93ef7ko8hpmsmhht38dsoxsbk60vfvs0urvzaxxq2g9ztg07sdpzn31a1zs8kkdaic9hq2uca9dvq4xbftstx6m8g0n8haqolprttv7tfbgbe203ld51j2mzp3ekrxaerqcl8aoa6qwgyr8ajezdfh9abf52xt4n3de18v0ylhkg4254rlh8jr5872dd1rg1yb261y08r3gj',
                filename: '0msggef5h3q9k3jizqfj5g8bpbedaoxjps6kpqlpdnzyws6qcdhufady84q0lhwm33ifon8f8hix9qw3c2zgxpi8ttn611w8i71fpvookdsu3dkzqxud5o8fks906kzkn5ddy09igrj4k46f2mmtnmmujot4qs8qr0wr6kvsx8nlmq6338esb3am02hf6hqsutohcl16zrogruuhr25zdt5deb2v0h21htkz8bs29j4n0csxeaka7yskj92t7s6a',
                url: 'mwy7z64nm6gsqf6avdh6gxrwqzzb8r3k5ny92n5jj8lnqmzipkkp889uue5f1ebaw7nk49fekun9ahvu9jzcbmpngpqlnxej2v7g9kvenwpjd4ar3f012g1k05cumxc4x2c5jqw72e0kl9s23zv3uz7qot2ruvg4v7l8aby4nppld7sweqtgb6o2ld00j6dmu2hyuxvyxxuoran4a1jtcp2bvohig20dihvnr3t2ium4ayct99ecrat1lb5v844k4vrpcxwzn5zevaskic5rsnxz3sahunnmsidh0m20f9twq1zrwhlpr8v9iogu4opqtr943r6fa4wtdifb56rf23y9f6m55d1y5wkdm83puw409f78x7vwqht2tflo1iu5ma6ejt5lnl2gywcjidgu3lezsr2arermcv7hhjbrtvdvp110jwonvw8qhzm5abhamvhtxnuv708k9x6jlbmp4ken5rpw8e8pvm6z1so20tzfr8x1hr63sbd8dmad9ltp952bjxl4bxts97uh0xjkn1f0og84b0fpw9sd2ira8pyaydj65y9vom0kbzb7h61qaueocjyhksbo9egndmld3y1vl6lwqza5y674z39cax3l1twav7al56gxy82mjlm3pmg3yjqv07zaey5bepyg4zchcqh3sxa1vpph29zqdcevmweedx0yryq31w82hf6et28p2zyvad84kiiufq4ik24t8atcrozsox0v0ulp3vo5etzk9y98oc9p0ia543cm15z44k6giuyenkl0bn97u2gjn3smg8s7ka3tc9nij1murg6dgi1csygo3pq64mqntspzxwcs904tvhitp349nuokisqll6h6km6pr36cn18dnu925fxosbdtqalif285crptikes50acvx58d3bo2fnp7u2g3rw0gswdrm4het5lrmq6b13llopbykfrez90d7lot5bxgf6saowlryhk9rktvcdk7ur0a5o9k053jv9h4f68uaonmigqx3dvv1cp',
                mime: '351k5dh4lwtliwb4nhnbwm58cgl26qirqed6a9uuqa6ndydpd5',
                extension: '6czhlz81hhrmisiekqh0f764s4edlrop6o5lkz46x2cxtjm4rp',
                size: 5151168474,
                width: 524903,
                height: 543753,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'gawftkjyrjwircu33nxcd7frfmy3ru605t69s6myuwd0m75jq75es5ajymufx151w2b54bjehkxgprao2j24z9qq9l3vd65d7exqq84ehxsxpvnxxwr2sru1kpfo340wdsdwmbupket4ky3uw034nk3l46td6x6kkwvvhdxfc846tisgsqzh1dm31dqt82jr9dmwsghdznbvzsmk1vujatsk9hyh6zthptxzs47no17fm0glj6gxn16n8kx3yf6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '3x32zgixfi8vp76ta3rmbm3gfsc7pqtxap7563hswvjqrpo9xnub8r779df4w6gvs8avrfzck2u',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 860583,
                alt: 'wz8l9de7z0fgmveg6unpm07s6quqi7g91g90u9z2kmxz04q2lsccbeya7e5izcae48t0dwgve05m546h7okurscuedxhs5utyjrmmc1uqwwsr80os1231mpbexe4z5u22qxsq94gixqcu92m7qjjqcihsmz6za4prwtoq34ogp5kgvy1oy98fom3ye44dq6d511cc659b8zgyybw99flbzn3i7u266ezyovp37lerp5oqmoij51hyqb4eca08an',
                title: 'kw3vrsurqfz6e4dyf99nfnunf4snpdk58i3n68n2wvrmf9vmjcfu03rauurldk3foqdcvc9xw22p8o5a84286a98lss9xs4vdal9qdmcl9858lgqe8epel7315wqrdp5wxfdigsnchmyp66tmr69lez43wn6nrdnigmzrjgnppcjsvdjaqyyx1l1gxrsr7woi2lv6l9p9voxnhqvnciytq1nfho2y3yylunxm8lo3di5tgxkdku46l049xzulei',
                description: 'Iusto natus consequatur molestiae aut consequatur similique distinctio. Nisi soluta quaerat. Tempore et officiis et. Nemo modi deserunt.',
                excerpt: 'Voluptas autem ea non est ea itaque. Omnis quia accusamus debitis eligendi voluptatem maiores sunt. Inventore porro et nisi aut. Eveniet odio eum dolor repellendus.',
                name: 'mso5ou7fgjbsson6h99puxu80imdd9zu5xk1svvoh1rmk1bkchj703fvjkl89ziw3vnxp8vzmq6pi92kmso3h2vo91rm3tzcjbj66jeuww9rbf94n7njuepvabv8uewlw4tqyftlqfn2m0h0s2wwtqa4qttxpqvov2lnqoeh9x2u6e67l07z7jyyomnx5wn764zvrqgrb364zwiwmr1d7au5fhud0cp0k66p1ulb9xqx06ewxhc3elmytbr6iqc',
                pathname: 'dmifcvscpmi2mqgxomjkun1mv4a6z7ua88v5cx3049fu3qdpolkbl4eduwudqn0lto6v1kin35uzw5029ulnf7wjix47o8emz9ned4zywwmgkdieme991a1jrlnuu66zfc657j3wwbfxyxzkhr7vqfg9vl024zmwc8saypjui8l0qb7tcjc5rccp0imz2l07jrxgfl96njm5808qv8w2uqx478i4msdt4x35zl7kjh3rf090htc23o2f2ikbnu8oek81xonu4y6as9xnm5xc5d12jgmqetzacpbwapkbewghx18x2c3rxruc9hb0plqu1ovcvrfdor1tmcnm12cgma8nquhxo4nar956hfxfgnsqv1ucn90uh9ascmagz2ys117fphbc58ja0mftxrarg14wbdk30y708bszls90e9dt0ziyq4w8b8lrthlcjz7lm2irl85kwc9dv984qpoo38bmsyaoguhifiy2c43xt0xjwxynnsyhwmi0mgrpiaw1xm4qwt74fi2mw3n30dwik5w5bicrqxlga4tl055iehc65ucpplap26npkc3dbmatfqt6p9qis7fsronkofogf4msdmc0kkc4qaje0hdu6fbvlfdwexi22di9ds31r2juyh1js1vwxw0p4m0e5aunsbf4p4xoo1th7xps6gt65ztjxosnh8iigyyqkelqzr5u7nf22pl9r6ccqhyc1tz8j56upxs53dh2itunh8zek3beod7uzl1nwh5vlt9u4gh637v78105bz09s771a6gww3tjntubq2s120m38zdzhdv7ycti8kogrzes8z99infcrgu7wjd7f7iyed4lvbwpef4jymoaid5xmcetfu6qc1ozoyv5z19a74v64wjclqq8ofy1gwtr9kppl71am7193v3tpaxiix10gajqyb9owkqq1rdmsu499ds9nhlriyz1iml8jvvrj7475tjdeety4yt655spssppu5r1b6b3bnwqrrlnq05k49fg4oa84mjp',
                filename: '5zg41hew8dz2ssfdkh5yc23727twntgfsa1qif1yibglxiymt7vrplb8dms6t275uu92n5bah9ai0hrvgi4ynu13xkhss8tr3kxoxjrbvv9wogu7e3zyh1t84s3jlo2igqnetzavn6lhn6lwv0t82nwwungc853ugbrjstuhw8juorqlgn85hj4v04cz7bsf0c9vq2ei8lmxh89ju4lhdyvimushwz023i695lhhs1hbomq7dfwr8u5ln853o8m',
                url: '0fsglkwvsbwt0mvtr91cgj6ei2zflln9ppllvz0l3py706uygm5m34ny5fai4pmvoul22oy5w3woxzsy8jz12v8myqziplkp59r15tq0865p5jf7pxozc3qy115za1pqo6tz4g07m7amtivy2iavspdfpl5biskud5qedmfl1rpvfkc74i4w7rzlunr7085q4vta8g0thvakx2al0jor6d3ui4s1b662r1ppf1xb1wj1t0j3t7gsj2j6f9xhwj43nkctv7860hjy8nkl0i3xqvj6wcx1jx35jgl3byefb5g0vzh7z4f3y70h20nlxegh69zd6ximasuhpaptfsyemvpwwu6cv68ofsyqwyp91uvlgvf2c76titj7dmvp8pao12vukzxubp8504irpoydzysqbqz2v3wiw3pgk32rm01c3o65k8qngf4zewmux5uamkv63a9uq543otdk7x0nkf3e98z3fmggyevjuxgwi3d38p38066d8hzaooo86j2xabzhiszejmmarh98ng1om0d62cl87bs4pfknh396jgie2a5f8a6zbv0ecbcvqld7on4idw0zys8z9k9be5v0qdkhj2pq5z9jwbtgu2r92i92bzhgepyxlfdlyyvi3mslnb2jpapnircpyh6igrdnixo95o0toc3sjsdcu56l3uky3vwkxydg7m1mqr80q7xnvyouxb874ktkuw5furuotbyamxopt8eh9bufyscjmmttasg2g5sn08295nvbs7j187q9qekxbc9btqipba4k1l9mvepu05p8d72fpc1vn38h2zpcr20k5yzv6o3lw42g8npfajxm8i59f5je0a2i6km6kjtgv0cu75kztyfujceuogxeeonqljfi85lzdx9m7navkkv25yl87fhlsdupydw5o5u6dmh5uxfnsglvcmii7yxu23krgbqo0i0zy088z74emwtz65ih45ezvunmq7527dgp9cyghqz1jx9b3n5q7q7a1mpgod6ab9etk8jw1',
                mime: 'ljhahchnwh1gj8dsgf75wntbf127ofjn2zjuewcx1pa2lnou3k',
                extension: 'dl8t9vm1b0m0xk9irwbofzjb988mj2o8uxl75hdx9m8hmeusxs',
                size: 2703161510,
                width: 763701,
                height: 986302,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: '6br081fib8yzf8i3601bbglg6zq1ghrvuzalagl98p1srtp1whcaf39dvcl0xyawj0ieia3hu393127cthuh2ajf4b44x0ucl4q48ob19cd0jk60i6zdreccm30w0s6zfnxzg6oi0sgurma1za5hxyl65kibqc95ziepgfamwetp7e4wga6amtimefq5pb6ep956104quzea80fc5rxss3ls60evseviu42ub9xi5cnejux8ihhcm4zib4npvwy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '3tklgx6b8nb8a6w5mat28g8sw6vdyznd9drsgkvy8ubkbeyb5b34felqb61gghfmelbowno503t',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 514624,
                alt: '99kc1viuxkhra2ph7y3lqdodkd27dfxu19u39gptqwfpuabtdoqtfqt131cz065nn5fcgsdnq31s7knbvfr6ffl284ajadwx3iag2mtqjanfmt8yl6hpqyall920d3z3bc7zgvx8twzwi55s5otd6ujmtc34qjftk9ppnw5jp94y50y2ukuzl214xu504hw6x30vwmn4jrxgn8g831792rv0uzwc8vhayn083eg8hrfqyg8v7t71ci0cy1ngwsu',
                title: 'a1j4f0udwrtsnvcvq3lo42e5ysht6vpvpc1jt5gxobtbequn6wne5rdcw9kw20vrdr41k9yc8i3en0r1ktca7ple1qz04doo4eseb5y52vfqukceu8yfyb6ijki5xxa2l3ld2afjfle6yvod37mr7gip9cncceh1160ksua0vipu3dotx9rb1bbks6esfdcmtccqa3j37u14atzluwazryifma4cti0rs34l2fjqoq6owbnpm2bhuznit3qgb9s',
                description: 'Inventore quia maiores ut cum eveniet cum similique. Numquam quo rerum iure quia possimus similique. Vitae dolor eligendi repellendus eaque aut asperiores voluptatem. Incidunt nihil temporibus quos porro odio fuga voluptatem minus. Et repudiandae rerum. Sit id atque ut.',
                excerpt: 'Et voluptatem ut magnam omnis. Qui repellendus sed in quas quibusdam beatae eum. Tempore fugit assumenda. Dolor omnis quia sed voluptates ut doloribus delectus. Id qui delectus sint architecto sit. Architecto et tempore fuga similique quam expedita voluptatem non.',
                name: '6mt96v7llbf5dl9sa4202fkoeoaczivq6bot2m7ob11mxui2u56gqqks8yz21wjg05v6i32obs6m4uvkhsfnaiskza7p3nk6omq9c14d47xkx0gxkiwy1u39joeo7icvdrfaaq9y1etbfqjaa7cet8tnprl9n9catzgd15kpcxhstqodf9trxc8hdq9stoic4gy7i49rx1zzbrkf4f2zl1sb7bit01zpgcf3ksr8su88tfszu8oo5nj1lr1t2q8',
                pathname: 'gf8au993u7tcq2adv7f64lu4ng7opfwiincs1jnbn5ps6xquk64p3eb9yn3daa9tejxky8vnnenbhzoc9sk8gbpheulw32ztuiqzf1q7arahwop1kvzhgg3z26b9isvokldambpl4n584f0vhryboz3a9p2tqch64crj71u8zlnjzpf4ddwrunjxx8ut6jfjra2qnasru7tjco5ab7bw8ejcscmclqszhdp9sph0i4plisdfz2itt7zzqb0csvjzu4fefx6bmpvz3zg5wyc33pjvg0g5c0kl7frpds20flblr6t4ahukdzuo8wblj32ib5tldhd3eo48gvlh54v9qre08vlolwcvmynlszjfmurumfhf6o8dppy73i13np6lvz8bfa3ejlwqh953ljlsw5hc5tdk6thpe375qwko69vkez8kqb1ityx6xq4dzgavm3mtqa7j4nu8tuvcv5u52svlgwjfl36k6mjhrcu5pbms31qjr9xi68ur4vbd2530kz059s4irw9a1oo4hu221tmkg0m9jleqrgns43cmimo7jw586q8s4qrjgh2kddlgw59zgf5ykcwwybkmbauh788vlq1n0n5c5176bjnnnb307gxa8ty9glovl7fic1i4n3zfldy8kuvl5gyoe002o4kx5ga741n1scnvgkujku47lhsbrnvw8t3yk1wvan5t6wwe2lh69xd65tqau7sxqybefzfe1wgut9v531o40in6x86pv5afta99k9pmgk7hpzwiofb5eh33aztjflwihjl2gi2ic04npmsr5ly71e9pic1jrntch3zwdrpx3stvz22ulic5kozscadmvd70ozwz8kdieyyv8tqti9iqauplfb3zwyft8muvkh9ksy2agpg6um24qz6dxlbgdsvjqio1u65rni9y9f4qxw0acxzo4z2i8rfeycznrc6rxiw5uvit2qikeewceswvn25awwdx88zbovy57twrya3nyjggi6o9k7hlf1ny2rzdlai6',
                filename: 'beh6y8ptxbprrvgav58kjqz23d7nix6q0rq6qi9bjmhebtsxsyz3d0ymyc7vzh9kmuf4rfalkygzwrt6ygeo40v6eiw6xq2ys0aqgb9hrs01dcx4ulfoc7e0weu7cn4xdrocs32g76r4bk90xu71sr5axrzuvxosvnns0a2ke7zrid0f2f8qv271mjuw4ydd9waxqxn93aeb39ej02zrcodn1svthl1gxuk6gadqxat1x0me6d7vq4e81zdam1y',
                url: '52nycy2gayyrre5dwsrc0shmldfxtx8x2tx1hxau6a13p1m1zrercwpb6e7dueeqbzmdc1t5f1dvsz8kshc53phr8mffvv1zql7e2i18ae8na4enm5w0dmdbxclt7kh73n8luyvv4i73k6qrtvx79k0rjuhzrmj77c9ou7ceyqd0skmwqrqq9nc1mv424b396lqi392jeyjoeqw4j9ore6cj0jp36qruzh57j1mb8iasunlai6rb4n4d3rlf6wez696swj05lk32yo16g133sroisvb1uj4pp7ecdlm8cogdbvx8j7grajfgekaqcujmwj1t1cur45iv3kptte9ig4up5x4pnhvlgzipyyt3btxtjfqbmina8ihv871cv9hl5ibsus3rc1tp0peduwsmt1qvju8obnrb30tg44z1623u0h4zqwb26fexu5rsop8it8lwoxc8al5bebpduw4gqrwmb64v5jliyqumf50khghvyf52b0zjd58ck1r99zorj3c1se6yaq1ujll3sp765atn0dr52ocx9mo04qub996yd2yxa801tarkmc1d8jc9ytkgpxn80ti8f70y3p3qrst6lfkhsz11u858v9yjqftta1oi85wbhcjvhzi6cgqk0pglrjjm1elxorx8bxm43k5evoy9g8h1r2dgaqqczfmdmoaw88fc48sbngvruphmqldh54o39nc3i37ypkha46uyp5smhle5p7o1cpvizk2w6uokl7tcib4ydp0vs4nlalg0vimu2g57jtr983twcsjx53ac0zsu25x5njid5d5px5ldjh5us1cucixqcs02sm5oz5l4xjhw63tdkg5xsah1grl88gfx8ib096f2tmgi9du5sdm2c9hj1rlxe2qc98ly8xwq8ts60qwv46p821q29ebf2dmbg5sm2jjq1pnlu10bxvbentrz7rtfqkumdfk1p6caa020ufyeynvmhpihd6tpus5f734xveszws9o12t8skoalci6yxj06y9h',
                mime: 'l33qia9t6np71gf92r0ujmfr9hsky5qytlb8mkmeec4eb1vzby7',
                extension: '27c3l4xsvzz8yfk6366bwhytiqvp89usf9koybg9pr1ytxswf5',
                size: 5959145924,
                width: 437832,
                height: 476471,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'ncfznu8pv2w9zsp2revv0suzcxs97ocoya5yd9whpqn44ayu42q1o7ywy9yym2iycmb8890xuay0z4dmo4yqv4rtgr1vxo5e3yrq07ud2b23ydgffiutvgvup6blw703ma11i98vmw2cp12t9ibb7eq6t4iduu12z9w9gy1x1srtx4sr6q1siq3yrk0zax4qm76mxndhl27030yr42xr94dhsh8cow3djuizb3ozt3anoxix51r0ib1i8r6s3gf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '2bdaghjtvyozsxla0pxsnwp5x7cyn6xs0is63aaw7thceclx9dem03jm5evxb5jcsiybkcfqrfu',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 102154,
                alt: '9e4qfcxn04lzidf9yda5no7yxbqgbiycdvxdbwlr623rhtc1xrfiqq5dausmzzhpafr2nwchhfaff7skvhncormbhp4u6vgwcqzpmngru9ovte4g5i9sar5dsmqz0lfqnpn7ffbawawdlc1ofqkk3rzkibakx4luzm01j8flr4ztcx6sqfes0tpux6kuryktjamsu9yfxwidcux5u37fwl5ptez68bgcsd890o3o89h971bu9jh8wjzij2gvxia',
                title: 'b8410wn2fw1s2b5s8blvoc5pptuaogg14ddewsicqtkpvfvnc0z9z5alz5s5a2ehtugbm1gu48zfte8yy8hs853wnqmezbz4iec2ddn3yh27agry396y5efaljam1g6hmt5m4mx0i0e0ggp2lp9vntn6cbfcj0r78i8i44jw9p11bixb7nkb5mq1r7m7jmlf2v4znm92qzx0vrnripca2at06pflg18rtwbkzs8u5rrw604ct2683576fbnoosb',
                description: 'Magnam aperiam amet eum quod id quaerat eum beatae eius. Omnis voluptates laborum inventore et ullam accusantium rerum. Ad magni animi magni est consequatur aperiam accusamus sed est. A quis officiis sint reiciendis cumque. Illo id culpa facere. Atque et est excepturi.',
                excerpt: 'Ab quia fugiat eius assumenda optio vel odit sed. Non consequatur architecto aspernatur quo nihil vitae porro dignissimos maiores. Odio quasi rem odit dolor et pariatur eveniet. Aperiam excepturi minus. Impedit autem voluptates alias quos quia dolor commodi.',
                name: '4ekan3zxk97ce79kng1womf2k4gd67jwmui1iy6u3w2my102eyisvuhetds21aamre2jv87zk9hzx7tx1web5gjo2bzhxzpp0nib5hbh2ms425e36uc49wu87w4sb84wfiew127fsfml3sg7c0gynpy9073epvuj4nyfza0u73nau3mfuaxepfwkuzr61halgaqqpt3ftf4zd5q70vrpj6j3wl3laybc5t07qa1rkjw5yioev2elvb0wuxvro85',
                pathname: 'qun6bdorhss1a80z0dqj3wi8egne0jg44qxqkpvqc6vo96m8sm6ysebk3uf26u7y1s18809hjttmjne5u19a9tpu95eu1i2e4d7rcadaphp17ai75yu62udykjn49t21y2sja3jlmxb7pxgfy1e4wou8fzabrsbqzudcfajg90skt00wspi16i2n522umgaullmivk81p4pn6wmq78biztuc8fy7v05uw17f91i68l69r2rhc4ythfb7b87czszn1xn2fdrp99hrks1w9bt8rfsimcgl1qao4w5btdtanlrvq0jhjmucg7yzxspcny1m0looret81oht9otsptylvprvlvedrzma47dal9tcqmi15slkdh2n8hsllrtfswvfzfgqkgwod3u8u7z3c0v0hp1v8okx1abaeh97i8btmynuc7p4yf3qbw3mqcxc7z7blppn050mh8qkkbvu0aep5np80gkvfcdqa3it0bx7tdp0g2fuokeq864op6ydw5g1n8zusitsboaq2265oyoo9ub5jtfdu9l7n1unv8xlzttgq6kunwrmil2gpmxz7fnaoab9wbko1zu2523uqopjgraqzj7gnfjsc7ewgpvmd10q9fh8jrd5y4em495utx3tijanawi55ln2o1098s5wf74no21lm9i07j2u9pt3csygmzggaqh6142836ggu6u27oilanm88y2v7z5lw8e9d949c5gwulo82ydz1h5zjlyiz7dib43jhgu3upwonl3p7r889vwoxrz2t19ct17wn86dw5v9dr4yueyqs5m4cvlyrm93gm5glg9r6h4tc0l4ebln077visrgbg4tbq62tinbpyx99x9mce79q582wkmpkmh08nyguh4v24mehujevqilr3vndo7quoowvt9roeu98syahmfjs9k4h0yx3ltu35ixw2v4ofatqct30k8eg5fuisv8i04wvf7qxqucqnzva3zhdjc2tiz6sbk0kg3u2jzebuli1xn0j7v138y1',
                filename: '0jq2q46ikikrocmo318wgc7t3yxdrrfwh7071s2ysjqrbynibafua4aklsbmp2yy041p4oh6ia6xuvtst9vpyk1igjl7buqcqgemw5gzv9opkck83itk4g3wpx1xz1ttyydujwa3w3vkefwad0gr1rg6qwsbj23v596ac8miykdsrdo7e9kpoqziknlcsb9inpyziigreiqo22nxu0k0t05lkxnu7c6skm00poq6azyns0ynepqwipe9b6l1zvq',
                url: 'o2lnw7w7afnza3wipghmvlzr1uixsm104s8xcw91b67s6e7b3cp0bcw2bmnknqthiq2z83ky16fonfsclrg1sy3rbys6nyswok314kg5cxvptfsropu0xqr2vwcrw4nnziod4sygp86bgh9bi2p0i66kgibzaf27ftxr5gind8l7d2jd2om3h89kubpokpno41tqdfpdahmcdeve5mshcz5wekzvjm0drjavbmxknf4uj1gct0hg0rlzo5t7sczg9kikhtn5yiu07q7br40gpdqnmekw8o1o16gdyb4kk9s3x91v24cx5lo3jfmi02nr7s006bzh7g3epvhsng64baolw9wipstlqr60wsxg8z275dvexaocs4vscuhmnts4ugxz5ayo0qloxo4et1qgu9rd8idqwipde4dq4yrnyhup7jw8zz1x2uwkofbbtcw2i8yttj0oy5t0kpf4cjf166vznhgq8tyl1gvu65nszm7nv633j0qklg89h1o9q5g7bxgpfzifye08elopwanrxatw7tzt70uetin7encfufiqiiu8gif4n6kp9o1md4c7dhx3yjf8l0z6dwn5483v6qzwsef2bp8ngv4gc0jttluekfv1jq7uacyahkp7gr4o4qtfg90c0mlbw2nnx97z7wjzm14jhuf6a2p0v9ajpla2ugvpqppeo8gnw5yuutb571wbudmuaxmtxo8iz9m8hf4v43kf27z6hur7nkv5798ejab90gfc2b8ca698pj7ri4t0btshn7unkeyan8mga4c3gpmrcoq5d32kaq1ypugetf05fxw2z80zg8eunbui4fxkivl3dt8d3ytz1jxn7pdhwixnz47tt2s1bnsc18zun6yoj0bbbdk4ps0q1biq5gns6wdh66ubdm1a7hvl94ratrtcb8rv9ti5v9ak678roplydboa6xuyocn76ifbu2i6mqslrngaaxcqtl4e4bqvi6zo46xw4d2f72zkdc6wu7e8lrniz00ewcufuuv0',
                mime: 'gfobk7745dlafy9wmlcm1ppwpenmtmmjdr6vhntgrauhrsad97',
                extension: '2fq7budn7d17nnznad7j0rnlhd159acixmth5dqt9bgjj7hbdb9',
                size: 8779638579,
                width: 511961,
                height: 256019,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'g18x0pr8txzaycfjeqdhovuwi7y40xlvh8zuk60ej1sk0c5600ydf70f6b83v2tfnyfv89bwoybl0xfowf6erur96hvujrrtr6nkxf60jodljzki09zv1wjx5tohu8ufa846xoj96pha1mm1r0zqsqs129phkyp3rt0dg34u0ob7d0l124teqckqwmd6lks0x4b5xu9zryuhgt8omkihob94ismjobh0wunx9yklhe6r0py7xtlh0fxdcy1q7n4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: '3fltsgya7t56ejr0zt55bus1ub6lnc6wdapvgpnb8mvfzj3vm848ljmfdr2eag2yqs3dphephb7',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 362483,
                alt: 'murn6xo7znzj63s5s2724qo0vgmc9dxxh5bntgionplb98yxy6rzq9ufmaxhdtaodtysrbz97g8pw7x7lygsw8bediy9a1vz264hl5nwf1cm9xfctj1qa8splt43offa14dnsenx942j24xf1n7aqhej7dmqlpfifa03eohbmr9hrx0716jdaf07nl0gdnc5ciqp8q4wkq1kadfjqva9a2vi6tzb8mzx3yr96r1vk236s00d5ovfc2l3681221p',
                title: 'whxn6p4tj6ascyazjxlet4fu2uswgustlxvhplntyf56t9t02cv972zpyf1au6mb91ijxva1gfmae7bef8osb4fdacbtkpwqkpe19vppgzitz26280wfkehiegz3399ynwba1snih8xtbbls8wz7rmzsg3ab79dyqe01gbywm3wna0rdodo0y2b1t3yh5gxai2bh3rlfj0lb80i5yesibw1no29u0b6sag1ywmfue071s4uesbzi9tek3vpch2i',
                description: 'Architecto asperiores non. Voluptates aut quos quas pariatur non quae magnam blanditiis. Quis ad blanditiis soluta culpa.',
                excerpt: 'Pariatur numquam earum dolorem sint beatae. Aliquid qui accusantium dolores temporibus quam et pariatur. Ut omnis consequatur dolorem illo. Ea et quo cum ipsum accusamus sapiente. Sit doloremque et sed temporibus debitis qui in sed. Praesentium quia sed et aut dolore.',
                name: 'gjdebm5sv27sudj9ena9226ltdh6job0d4jo0bmpajfq2i4u7wh36kd02xqg27wbyv9y6fgkmlxstkkjuiqgycy8g5xlaftn7j17frhknrq0tap4aof5jp0sfhvomq7lk2ubrwjxzigaux979fao3csz448nerptkzu5gsvpwjvaeu2f45hsvb7ksqhp9kokfkt9qum25wgruqwkjlfj1yutijzj9h1qmen17z1ikre8p5neeuedtp9364mmxfp',
                pathname: 'yohnm3cn9610zuk825sycs3cu5if5j1dcw3oy7a52k689o2nikuu5fbk8p0wuokg1qqc2ft2oqye6flh65e8x22nqdamt63pxf0y9rf1cxfcpghxomro3tomvea1zd4jmw8hf2vqaqk35ozcaywulvuyw6jsk0r6fau7wnq59yvdf885qrees0z35qtbx16osiz2k0z35lfi97c0werhkh8w8gj2gbse0jsk2kbwqlmz9fi8u4x7ooxk4aifzurf7sgf1cglax2efkn0e52qt9wplw802r6rx402q2g9tiig7qx1zs2dha9j3ezhuhnd6is0zr6i8qv2zgnxcvvv055zgerum6ddor0y02zs627ssawrogi6c9yodst1hmd76zidjhhhc4supbagfslgke7br68otq4yt02zv7txzmg8zd366e312k1706vntyj61uj0l2n4w9nfgez2u8j6sb2utcemb301r0iija8ubtvbskt84pvf1h9xr6zvjwulgaw43zbgokk5c5h15z9cmubqslphayn36fcgen9icowsrdoyu9ux72lrvnhffi6c41mfghh8omkiul803rsc6589qg9ulmblgkznurf8zlrxgmq3pa07kdyl27somqv6ky1km866s9e3gwffiy07q9bos3wlhz9ay7ks44wwuyn7oycc15bfzf6r171usv5pi4whnoonvh9opitrj5vhyuxsomjjmk4abja3ltuf853kxfar00bmjplduyc4v2r8lqwo1d77n47g0fpoebe3cjssr1iah72swypumxghmkegbybodhwc3wdai5ar0na4rf0kathkle7evby9vzwnybiekrsk8tg4uz4jp3l3ijs8mtkl3p6s7o4vq6s7pl19bte7qha4ymmwcvlnp4plx3w1oguyaoyjaydi5zsg1wrrkq4m7e8kql1b8cz0n4ptwp120hvnfod5nb3iob9b3pjdhp475uhm3pfjm1seszd3ixa1a5ow59whjxjgd06x',
                filename: 'g46bxy0dr4oxc15isxr5otzwl0c4ftkf1h3p3ika0dvsw03jc8nt1x4tapme9s0g6xigw06eg53n6fgoahr7phdi7h9jvpiua3l19unt877fn4gmfvfyoxyyx55r1x6s8q0rcnpke8ekovdxuhd2edsn9tta4dmrpm24zrpvyd7likrh2zshm9fljii47qk65mib7wdxcbqilg2szwjyfjj2rqhmlzd3gaktpm40vl09rqjk66w06j7rqychzeu',
                url: 't0qvuusochvrp5vkplno9yt0kz7hx6mabz8m1qiuop0jtc55qy7pfqjfael9aqfb038j5s2vrvm6e08rlpwjq0fnmke7c6v56u3mv39jpeg9g9e0136yl9yn1u7wr4ipgzj7kkkabdqf5d2mhmiqybytik75yvadmljps8n4iilm1sauftndt68uats0kcvrivqof123gswqxftcna8q10c7xcz79710xg6gga6bl3nkl1440nk0656kfnn3hcmkmcxwhqdp02ijms8xasyz24b7vdgsxk0ex2ty70mh7qf9pzgrux28lqo8kr8m55lu7iqqlhe2gjka0rq30y9eoafp6cjxa3fwjh926ea8u8fxizovtuav6l6cx3ogfjlvkbrn8rb7seq8abg0rkauckcos73r05o7nm9mekgjrdibzyb7tqy94heidszt1yhjd30m349b305l2oocaktkl78f8kgcvern1sthua05chjlr5x7tck1ki5qwb6ajlay0phh9elhwwex248jdt72omducex020wmc6q34uhbdb15fiktfajrhequa6yn8u5lyyj9aqhnosc3tbatzs817ft8kxrxuotzdbtsztzjpjx4xvgdata2bayubrh6sqwxyul2csn7cl7dilgbt79i3kemlg91v3xopizyrxurnh5xkqguykcyr3khh1bggc8mppybfwgn5kgl50f1d61i4bnihrp3kbi3ore4dy1j1awuhdfulagx69itd4g4fu1u3cntjvogv7ejbcaq1c5yc08u5tvkzz4pge0irr4drag77humsf1iz1vvaaiza8ta1d4xihmumkisxgwq7q2gz0y9tomelaoxt5d8rp724gzs2d140co7eejb0hslenz9ygni0mi1w5gs3de9nq7mj75wyu5djiiqwo5pud3nyq7kmn0cxxu9u7j148vix73nqesok2v5oj6o7wzgagb3yu1l9lxsbu2dv95nzqi9b7vo03kcj6byh1s50p10hc0w',
                mime: 'lfo59hbqxjv9m1axdtnuj7m217yrkkbhkmaz58m9x0sidbsbe6',
                extension: '5hzfoqcra2hs2ax9lfzfuu5h8cb7d8msafek6yiyytgmbq5bbe',
                size: 90569487377,
                width: 892437,
                height: 655659,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'f6ul8f3lj9nxpez6b9hniz5l6xudshbgmwulrpozv4ef2cz365nltpqj21apxzt1mpkxd3b3mknrg9w4hhp1kyp8n8d54ippf738dohm9xyy9ak4ii2kmki94m9l5kcra1vg3g5s3ww99mgnqssoknlzompfw7iwn52ihpb417xmlbai9fui4y6ed2p0x3lfoo23628yo2wvuvige9uhk774ei3s8ykeis3vsuups2eq5idzhy9dwah8clq0qdj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'a8hrf6l7p5ytl9pwf2jwlrptqd65j9swjiwve8i7ex29ukeinxqlxqhuw244djoxnhryvo72hsc',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 732989,
                alt: 's1n17ug6lk8rmvd9raij0ek2b559ykqkfwyvz9ncqdsn1vml3einjjcbm00qm2kehjsiyllruqzi2i7y8zzju291cfim9ntn9rq9mc1z6q5ll83xabsp871djqzr625gbse0wjg99tn863c8djwr53mq3yzzzhxa7tdr4p3mqsjaszyvrq0avmm6sraaup061wcx3v8e990eoimwwhmoo4vpgyjh2equgkcph4i3yby6641o3z9a2m7a1n4syyd',
                title: 'lrxbv8xs4lw7z1cmvmbtgxp5doxjh4jn7zjnid97wjwulog3ys3buadkcytttwuuml8m12gqlfw25jjqa0cpxvdf46wbxgsreo3tz8gmzu3cglob4s8dystukkvxdk1wmzzeapd9dt80ziykqsogkfdqeylnuzvxwddvj3p0ypw5oltm2mlgpso77hb71lwiua6vm5d4q34fyv2wxzm1rkc2mrnjdjnwn828g1pdqle6joxtlobttieyx2icpxi',
                description: 'Blanditiis ratione omnis ducimus ut fuga ipsam reiciendis soluta reprehenderit. Iure ullam assumenda iste debitis. Numquam ratione quibusdam quidem alias rem quis. Est natus inventore in quo illum. Facere est illo et.',
                excerpt: 'Veniam quasi itaque ut fugit. Quae dolores dolorem voluptatem et voluptatem dolorem. Ipsam quis similique provident odit et est dolorem possimus.',
                name: 'diz5m4hsybubl7myru5pfig2bzzyy2bvteq7y793sr96xq9w2x0jhyeyuebuutvh9disxoui9zptni4kdh2qg9ybrybfncry06wstuet4txop1jjoxoolkd0ullnn4y434qq8mw0fonniwcp9qhtfshbrg3qala1k4q28qrk9bniyb7hh2ca1ckb0el09yb2atps2vv4leebod3hrcxgm9pzgxmgty7dfbpsb1bak6sawb0h6beosy2iiqcjua0',
                pathname: '41tb470fyktx5fzqclnhkkcfzvbn28ce40879x6sc9d581yowyag31c6pgl3mnwu0ju2ryl4b0lz55rbhqiqnjzgi84dr0hu3emo9fy5awabjsf99lv9io4fwy7vindt4oxcxmcvs294sy324cjxg6zn373onjnz5h68ejhmwv8k3vsliiu12otovvjm3vpfuo8ivga3hpz6ywmf6jeapnjkr0312q8bqzd0tf481y325jhmsy1a9pkgpohufdau0mb717pwn3ezj4ih7mmyouskohip4q7pssrpsc4650hf3uarvy22bjzia03eyfyczk8vt5shglm4rsg9dwk4mahzu7sdm7hsavr6zd54mztaio6qdf2ul53bssw21vafglv516x28odwz2tov4jwhwei2adwjk1qe7hh53zgr1stp9614uvl8n0afl70rele2hjmj9atnp9xybcf89n93vy0qo57exqs9togzw94mtqd9gu51je02v1jirk6wk482nac0kjy0oze3q30drfaqpeheiwf0724jga4mxnz5lttu4ko9s125l2pf10q1tn93j8zvx37hvhtp2a18om5qj9ifx8gng840tfvx1kkqfwxaow6melceo6u8dihy99tkgrfolos2ffcge2wll6dcyijwe5lg9dh7b7cfmomoiu68nb5s14if00uselh8yq4fg68tkruo5rga7nzjadpf7c134qgdj5ewsbdk4bwi7jn5u51eioms6jq06k5pdi1p6ie1b5yzuzb33z9hdmi1ycvmx9wk2rlm150ulml7ajq6bs53rc22v16m0b0rmdkzj4mz56kd6bmiww9x56kb9hkmkhuzc8fp2y8cqeeao4cui28cy18vx8mthkkqa7qrdei22ziw35770w76vifa8kwgf3615ks4nj6sv067rh7u9jfvbzwlg15b4nade1mo6zd9kek2u7y3oqzl9q4ic8eb7mm77m5jew1avjrw6yr2apv3q2b81nw66k14x3a',
                filename: 'qnhkbjrfh1vaobqkp1xtqmctp4yps2iompdyemdcrwra0adumkoe4f0scuul4sbxj1n8bqwetmapspfthy0nbympo23qte2y3sl8wmaj6l9mmwwagg7usxa53fg7sp7xo2om1exyzbhm05yekbvdlly80s258g6u2m43wzoqg0kxzi5v6uykpdac8ff7179x2pssqiv5tt0dq8awobkozxqwtgla8ssombn5npxilmrjscemefrx2g2oz3ongzw',
                url: '618khwobkju2lkdlxdjjo7zqy42aiv7h3mvja4f09ix5wpi4iy6ceikqvjy3f5mz503nsvq87nq4mklvosvlmd75r2psvmwfy6fewlg5p7d5prbxbuodo89tun27w6l0e9q5wvh6stw7c7zvhbnyabds7vigwxppf8joxarcaut2vfokm5xlpwt6o2q5kkcp601m2tuk6hsu31pne5ys59r5zjl08ccyrkgfxs5feg4rtlw7f3uux0yww8in1v28zcvssi7i7pyv6sbdsy9ulkiw67k3zgdz95m5f1fbgzm2aa4wmt3ww1yp6bbbcudm6wo8tev1khgczq86n7o86q85lyes9r09wjrr2dgboprp64qtz3i5p1ob2hab9p6niy8gh69k37od5hm802im4msdk4y8886cbcj6j5g71c0f7fua23838zqxuszt7xins0omjpqexgpb1ma6xtuii35ixtzwztlmw9p3v6xjb1m6w8u486x0c23fe9y4tdns7o5e1oa9f27x19ixrtc84xanr20lrf496arpopvapw4e1c9q7xyr2zm79da3571vsv5k6juqt4c0m3ez42x0635go0p3ey2bnijiorv9n55qvjn0zvsesy4gw3qnom7eyclmw210srlxc5usgot5l67y54tzi3jbnq0o9xj9i3h3aw6xfi1hqh7gpzfml3vf2wck3zg7crlum84xw6z01xlgpn0zueuebq29wfuzlkfjl61x0p1sf86ket0ffjnzyp3nj0zjuidkwf5cewcyc3v3kidmfhciatezjqopnminkt3sbyshhh2pu6ur8gqjr9n5tf3dh2sq261ov6cqbm70qifi20wact2t8wppcw0sjik1d93v2ac0quw2l279l6q536wkh9s9iezn39yav186r91l5odskl5wq9xsi3sazsaa7dkkgyxy8vu0abjk840yoyhv0z1l8i89xv0tp2q8fcyluj4i199vqc26d0stou4pwrehopi9s0hd4bir',
                mime: '0sb35z0t44ymz1e1cskf9mhlhmfszwwzdjs8w7ue62exogw9yc',
                extension: 'utp6oenh50889rxjo7oef23hvprun4vqd7nnlkl5qoe9x2qvl1',
                size: 2194472482,
                width: 4783027,
                height: 247224,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 's0453vsm65mx1zb68vfx2wn94bbq3rybkrm5imv5cdoxaua5qbewen6klwbs8oex2w5qqxyu52g0sgo0n3ubscjtd6qmzorxsr0ctpkgytx6uvoj4jv8slvzvxw66bv87qfaynf437i0ef80n51j1hbg701yci80g9ybdiz8knj9mgasxniu7wxg9avapdu6rbgxovpgr3f3b1s1bfho0e6njbjdub7v0dw9kjg1vya3z4q4sgz4ohj782qh9r5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'enxoggjvz5u5qn6k5oeh12id0x15bkn847xhdwcgqjhtzcjd6ni5071vb6osftmo16z6k06bmqc',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 557022,
                alt: '5ftwzfhhsth30lml431qilpw7tyy9xoy7tqwgrvvdtroc3x7e4vjhu439cdn7lral8i2uzj6scohls63l67ncg4vzzhvb2tcauc6qme8nxnehbup1late10u9awxmjw1fqzo4rb6dsowu1vqct0xbwepbyaw8vvnk4oc27pep7xe3yqpvcslmavycwq6nc3nd2oty8ku84o6c3aee17l4xwvsh83hicfmi7jm8ug0b4no0be74in8jhhtaxj8yj',
                title: '2y9omp18f47jlqpoxdisdim5d3y6efsfhumn5jsf64ahk0kr3yaihzmn1wkzz7r14l9pe7p90hxiy6c8zjbbh0n1ot918zdmiqh7tfmdy805yfh47rii6rr5fgu2jvm8fgns4lmf3m87m2y8180tkrpjiphmiyvwplvb4gjq8yt7vetz60008dvmsdcktb2eh1ddux1s2ojhtpq4ad01122bjyctmpwekzx5fm553fiw2jdpc57ejorguhggp18',
                description: 'Eveniet quisquam laboriosam enim repellat. Non et animi consequatur voluptatem labore. At atque veritatis illo.',
                excerpt: 'Voluptas vel rerum et voluptas qui ducimus autem. Cumque qui non. Aliquam quae laborum nobis magni rerum et corrupti deserunt.',
                name: 'lhi49clgqxcb20gk7pm3avr0jqpcrtxc4uet5iep65bxwse4y8hbl2b1fkq5rjr2zhrmjflgb67p2k7lkbx8mnd4rcb3vzepvcunqtzw00sl5o0z49fbtss10xdgbe73e434ko0z4iy9lr6x7wljjwijvam1unjqmiyrzv3jcjpsjwm4wg3j4ju1ozlypasfrlf72fydwb9nlhxg4rzmxtqvyqulzjykxxzf3c3ws5mjs2r0vmo9gevyh9sc6mp',
                pathname: 'ldgfq053l7tl977evvej7heahktq0zi04ks6rfxstz1ntvxm6caubpfism5llu8x6snpqr83cbm4x7zaun10fhvgg107v53fsle5fsfl9193yp4lbayyply64u3d39zkazmczn2xwtjd6xo8804hqhwhzkdlee56gdnyvhd57d6ptqtru3vb86n5tyovloe1zc6zt0emcwxhd1eamamadulcqrqka73p0agt8yai2ujwr0boegrv9d36n9xh0v42knzz60u99g1zsusnihmg8p7wy4owomfvk787bogv8t9w9qsz6453xa7j7c33keah6zc0ahqwkxzxcgflg2d9ke4pxwh3mz2vph1v97w0pmgg0pwkoxx511y2oalepnvon4gmo8p2y2tbbhuo4x2dgxow7frvgnbsom4ixx9wwfzr5g2lpbddvrcd61a9inp4ccyy30frpmfrhnd2878m65uu3usradk3p7brm99njht1lnlg5wqlxu4n6gc3p6bdmfu8804vu1818uuwjrc0ii6791dc1qtybu50t6hd19ecijdgz9gdfgmcraks8fndwjy2ww0wzjx0gb9tjckdvlbbcqywu21de1sft6m0i9rbx3wta87eiy6sv5bp5qejwgx2ls2ckfyye3kkkmojmfxkh6d1zqg4bkiw5gkgu4vdmpr8ovlceqa57zsq2nktiz5xunn6mqf4ibflsf7mymc85o6e27cgzhrqeuq8r8iuoki60vwqukg8wzw3sx5k7bbsg6qfbptutbvuq9u1qrivce40d1y0qs8pakbvemdth3rmcj34totaxeuosm0n2sgdborzjeley2dyg8njn717jfi21eyi237jmwf1a0kiwst3m3l6ib05a8xniys0be0fj0hitxk23yv4w70035z6yv25zqstxghsiyghpj69zaqs2hscerksnpoht35phwo3rkrz7sqr4pygpea1s32zw4m2yobqv7ig5nj1fflxlmzrene08xa89w8rqsl3',
                filename: 'yfjtxpgdnbkow0a9a8ber6eesjrovb6yygrt3bnfzirlhnuinb0xrt4owje0i7jqh7bru0kp3cp7t9tv9ntvrghkdbphyk5kbc12utdjdqvoki8iqlbo8kct4xneqzfjp6babgefghz5v0zxyyd05yhkq680l91uoeflwdbgw9g0l0dfalt91t7tulk3bgslzihzq59fisapcrfel3f7e03xwchfosxe8583rzol37pc97ahszlkxv52t39pa6v',
                url: 'ezzxdn1y2xozxqlron3yb817x899uy8s8j1bx5i05d0jq5sfy8xj3su8zua7q7680nzde6d2iixrkhzkuqz57uxj8ln8q3mw0fuoyl06hwwd2sli4omw79m9faf30gn9mc12blwrn706ykwhiuvx6newyll22yam3mq8rxsi0j4sqsf1vdnmsrlca1dzvi9nxpbukjtuyjk1hjw7s2mr8fq0uvbisghjunmo8xwojktc1v8phw914w2w1gialc3kcb1yr2fr67lh9nbkpemx3dyrzsx8omqtahk9ktnxxg024qdjr9rugfbmlnm3fsnnz3f6x9hov06j5eal8s0uagbp190nqi8fxg85u3szsrke6925mfomtr89bqxnmz76z2ftoif3rok4gaq3uwznxz6easa7pqr3icvqo92tzeo2enhzbbfq77ry84bgc1mad8wwpwlydmnd97lwnf42gv4h45egl8rx1ojrz1eww4wn29y4rdoug122nuru3no8ji8k9bfpdsyonc76s1mxe61lkz1xdfxs2xhr0bevtqqw53nmeb4o4o6yejabtqf5if193mido8lrtpdn05d801e30ri8mb0fas8myzlm23auikg56sssu1bh23j64gjbca90uto6nvnzwah9fapexwi3hxgjqatz9rm38lvenqjm1sjbo81ixfshqi9g6nr8tbw7bck1ml821vjejjn7dcn86hmg2fgava0mn2kee93yvjst8mcnxrbz0ceig8wnq038mwkey9r5n3md9v1abk5o6bu7a2fylq0he3uqi5shlrf86v4amzzr8dqbjhjz6jzveu7u1w3mvp6hag1r3g8hx11edlp2ofbm3c1jvfoo6sfyz4cqdjq6fzxnnl5skypryhmh5x1eff3aq880d9svvki862b8y2rcdg8sugfb8qbbhi45iwxo2nszapgmd1u7oubg0ovgaxi6wtnvskeekymely88vj8qvppluo3hhd8jgqym9avrhzr4zibc',
                mime: 'svuwz4wuob7oo2ky6r4j0007vr6fep0tlo0umbbasemdlx4zmm',
                extension: 'faeqtlpo5ufp00wzjc1w3qufgwnlcq3il8dnejnmerbda5x1va',
                size: 9652292764,
                width: 935520,
                height: 3490447,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'd3ivlxgm75ql3muw5uirjd8b79jw0c07u6w6iis01tenuoqjg0pa5a4cx1s3hrvcuvn33htbtz6frb2dg5zgya7nsdyzarrl2p5y9e08fgy0fhh5w8vuvc8bsbeboyun4veozjljvv4ixn4s8qxeia63s5d4b1t5sjzzfa5kri8mimvxfi0klyy9bxvt4abo3v1i0xlobit4rjxuml255ti2dl2l69snb5q8int7noglnhbcqjyzot7co1b4rj8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'kkwa8sp60ombra9m30tss1tkxdqxuyd68s1q8plgnpxlie74kgq8ey5jtg5ichiowd5n2oygffz',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 111225,
                alt: 'o4mmax2s5o16kt12evxzsryynuc1fukavg9bd2bvjqwiimurx7r70mm9cj6o4k5m5dtu9863g7vb63tio1vykvudqs565z4sqq290bxruy9on3h0xai661r18j53ld14x8ditsu4c4uvt1iltmweuyss2xrfn1d8nv23gfd7dilnv2qon877tanxfv7f0f1v676as5at6b851vhma2t6ytjd0a18j2kd0tpfg29c71rtavcyqlybwz06w1arnan',
                title: '7k7eoxpastst9wc60s76q532lhhneb7fdll9cmuzu6xey95gesl7gua4mxjvm02eyqfyb7y564c98j74y8o24vo2499z8gldiijaaaxmmc9m0sbrexgmcyunv2pbijvxmzme7pf7nbd1wgkohvzo09jdutycqcdydpy7kekulv0llrzbabck3tsrt9ppv9szhfrfvog0etmeqvt9jptkfee4d3tgvhr87wf1tawxrqw78n5c5ly22t1w1vk9dx2',
                description: 'At tempora voluptas velit similique quaerat. Recusandae minima saepe. At laudantium nam. Fugit qui laborum dolor et. Reprehenderit est et qui adipisci et.',
                excerpt: 'Est sunt culpa odit sit quasi quo ea deleniti totam. Aut enim dolor blanditiis iste tempore ut recusandae. Molestias aut natus. Asperiores aperiam quaerat ratione tempore dicta ad dolores alias.',
                name: 'xmbj9wxhqfanpyk6faa6o3h1ugqgejmv2i1irtpbwlyjw7qrg04cy12s8ejkouwzd3mb3rg8bs0e94b0vnxyodo3mdoo4yxdzhev49u07supdb9z2hvjulnohbcdp7l1qo5kbra8xhxwccet9tf5i6gd3s0tkxtva4dg3shyb557wxbelw49yvvkqr1kg6ua9syun673v7rabl9l9g6hjv8dpga19jlmmpvzthsedfdwsnqj83cis6fk8ocy0hy',
                pathname: 'yj687egro0nmgilmtq7uak9pl6y3xoe0pj239gthemfwn5a9d2mf459bphmgvp8b1i2u5zduuxel9dzvl72hj9qurq1br815dxl12v4we8uj6drx1fs1ny5wr4975wi0mwja0p4ugtq2vc8w3e7pkc6jpqpppgs7wfxejfte3pdrhrx59dux4sv4mlr8bwrxsk0vv4wwifge81aaac2s5150rzo545ythbl9yak1d3s9pd7ay5juf3e7xr6uc4wiowzb2n9yosugem65t83ahjy99tc9177hiwf7xvp8tlxuiji989trclembqutoq3qwnta3ksh8awtyqao7i0pc4ldv4ocmrvvddghhdjof0d9zb82ab7ehg16wmfh9zbnqg4uwikcautb6f935cjf6ks2xwkuxdekjmc76ln14yot3pqz5z8aay5h0y7a97z95yiijyalckm0e4g3eu8dbg1o7z07fzebpaleb3qc44ukidanw7f0go73xtwr8kokf0sy00jq6esrbzmz81wcp2b7n54akqlqn7wsk8ksl4b31wxdft0zidupn7si7gc3b77fb4vm0lq7hdssfwprb8hri6c0c2rjsu5utujeamcnx9inf3apc71vzavfsrfjs3yehpl7w90d0gjjyaenrioc2idr367i2bp46qtd9r9zizzs66m6riljm6ho8io97xy1jonhi4yq17zjmnmsn1iv6c9n465e5590urgzc7hjxr81okaooczf15u7tjn9y1suchl7nytrlwiu7jwcfaal5j1093kt06r7s3zgw8kkxka73582uraxn5e9sv8tqvzcong8n3nilafr9myuhyqyc6gcplumdi605c44vnc3kv0b05pai3f6hd962r1jv6qumatz8k66r7y1swvjt0zbw10ejennlqwwhqf7n7headamvhmw10q5wrk5bo2ijou1971tx9n6oxbnurpmpvnimbf2tgrycsn3zr4h6zimwuq7roofrj9t5icidw7f',
                filename: '2rdqhw5wf2cb3fqvedr7rscjfgozxjcqpgxpdhl0oiivb8c8jik8c7x76nadbka2gu8hf1o6b8hibdyl25av964b6ad8ij9hazzsjgnnrml248i3w55zqquefkq9750evqb3lm15potbtm28ehtb4or6rkjsup10qm2bv4jr98l641tns5ffnyd7ajg1c5c2260e81nylkxu4fr3rbugrzv7dn79ywdb2o81ez5q0of2okkpwujsdqkfp0g3ced',
                url: '68f2f77d831hpjnvgcjryqxibmuvkqmp2cv0ilh2tyjmybwhyo5v9fsd7u3wo22gq04flhj7lzmcrr3fxof4zcf3rnyvw2jzugz50ll234yvximjdk4nre6r2zw91piqeocv5xu3yx6n8g7bcpumvfu10qklsfpdromv70xsmoztscwl91wr1t0pvtkpi6vumbtct9ahleeuj2vvtbjlqbn8ry504pnnq1jfi90m3u57hs9gvyxw5egpzvixwv4wnughyavi69uefszm7yl7pfmli51fel4weqx3qdk9g4ebcbn3dbc7d1q7paib9mdmqs7xgx8np9hylap4m0qfmar26lruq41pxsuyj1az0dj8a69q4okuilljhvuectt28roskpvq9i2xa8i2jhjnzawlpcyy2ggcxa758o3qdfo43acd6cmr6zbsalaqszznqxbn52up14uymukhfqcfsi0qd9piye6y1orjnvmnxjgduk5pk9o7jxz63swxgk3nv5dzl6brvlv5kz188gmm6f37x8xad513mle1noqwlm66cmsz3csr1excco4d6404s4b0tjbywd16nywjw5tsjczjdwj09ifd4tmcz1zem4b1zyf0q8o11k8bd1q1cr248p38yh2t90btj4lwfilim5h8ldwmayx2p1kfvsdlypv2n9ni387ftyhqg3i3zbe1of45rsm9i0b0xiumg33jrzhui9jzo26spj8001zvnivj9b5dwqn4g3axupl4l8vd2yti3ida5ufwjsg9zfs1kg85g2rmj5oje4zatc15s52a3ub805pjkb9rwa45bm3ie08qlu3fxh31xgihkmfgp82qjyjeeu38uieif22wf7vo4jyw45jh05yiu7oys112tbvcb4228te63e7rt5f973yv6yfz0mz8sqscrayc3vfz4qjm6l6xx7l2du1bnzwia9qqu9ggmod0m4gahx0s7dhet62ec7xh12vh52lffpqkmf3bgl1zolsp4vkx0d2p',
                mime: 'iuiot65hy2jbteb4xq2uklz2prqrogn2w5ggxor9e53qvpq3mf',
                extension: 'l209by0121hgpqdc8dd6l7am6af7ra2up6iqitvivo0va34it9',
                size: 7959341585,
                width: 598040,
                height: 321683,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: '611nww1xeh46fxr1vrev03wfqtoptfm2zznmoxai1w51byen1hixl4rxiazubqc4mc0jt4wijllsxx994vkthjjrgiygukehozjkobdtayt7j30d2t23absttoovnimu2v03jxifmhclnjp3wuina15jnu0b3m05dvyje2lnd58s6jd3nszyaumb05tieijyfq4ct4lvfzkm1xj9ogt7c92pjwbcf7rob3e8xqnb5a8m9lf6wlg13i82ir2l4dwq',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'lq6laj2l6mn5kima1oxurx3lzh1ng4mgg676rp64dgods8t9nypoo5ktnkl5enmznnevtwnuux1',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 575331,
                alt: '4aplf3e94mm5cl47xw0zx74aa74o84g4e25sjtv6xf0ymty46u3p79s9m722ttkn1ffkjm356mj6efi32ieez7mclp0g8flbndwx0addu24szm9fjiu58nqkrjkhkthnh2ay4eq935mk4xnoyq7b8s0ov038qtg7swedog1svzm4nttihj5wqc1d4zvu5xnwymdv4vd8uhx63ir2j3w987phn83ipozo7hpndbp05tra1t80x0k27rr97o24co9',
                title: 'yfjq4y0oxj5s69gplmyycemgeugbwkiw7d2qmakezno6e0r230d1436ybg7jm4pcvln2ecpl1ko2g6e6f3o1xxjh0oy792ohvj5zda8nw8sdj7n5zfg606fkajhz8178g59qrs05npbsj1wr0tu453x817tcrigcxggwnmuskmnbprbta4jdlz1jvvojue7566kvhxwhuvzuuxoeuq4nyjnmup1c2sdfuff6dazengdii9xaqpiplvg2k2kan5r',
                description: 'Et perspiciatis recusandae. Necessitatibus fuga ex omnis et. Voluptate veniam rem blanditiis modi et.',
                excerpt: 'Sed consequuntur at sint aut. Enim et culpa ea voluptas. Quasi nihil veritatis optio unde minus eveniet. Est minima ipsum dolorum dolores aut sit earum. Dolorem consequatur ut ab laborum aut qui.',
                name: '61l6i1jjmis1advvfvcowqpi6fqg2imzh8tj80g4lppok66ue3zjn024s0xvpznnjehbxjf6ecu5mida62w31vlqxo79f066dgwqghv8k4zuk2hzoek53qf1n5aaj35hpgzp42tgbb1vyryvmq8ur47ybdcgbbhk7xw1q3rfid7ruufa3ql5cx8g8p4nsl1h4vpuboilu0vjdczg5iztc4z3t95mjtmjf6ndgwcjdijmzjtujqeh12zt9amm8qh',
                pathname: 'tx16qc97cs9kk36ly80nh5a0sqigqr2z4l5nqg5q9e32wn4j3pt4y166cya04xk90plj62694z9efl5imbjlbg85wvlgjkiyraw9lejqwtsl2pjxx6fzb27fnsgskusazdaep1jd5c1fj0j3kcegbua7q3njnu184js4th8mszknu8v2wtzy5za8p2k01wc5nqalwx62ubly0xatu4mtz3ys5f1yvwzo1q0s9j0pvo1akghbisrf864n3etsunqthdcbbi7z29df2fw7e6yj3sp1fuuvyrv1ngdrmwgokzen6g2hjknbxwb4dyqsz56zghmvvnrzoqzcfxkcbmrxrten68f55plmz6c4ugyx6bexg5s20bdezkz9iuwd8dr74df1ozh50und0bxt50ky4e2fgp1f0uefozxe0bthebge9eedoq5aqzkrwtobiklvqfj4gfs4usl0js6riimuvge1xdhgwe9nsagygv9ouunktcrpa5ntitcbtr410ot898ovfupdcrd1y2zlkqo98xt7cwf64kl5y0ysw151ou7gtd57nipuvvtcg8ez7cr5h5vwpbiwo5s6ev00k3mcb1todu53b0qebu69osgjly0hbvq87sdpr8flawrunsyq6mlpjje4l2iog6kxraax3srcudyqxl4jqs537aqpu4pul392i6siu4fqd299yw68by447g0i09f5d1l41wqxsl4hqhfmh7swq3yec0ez3zicfzxr2jta7rv75oiefet4uw42u815zrtwba0xkix86d3v3wuhu47wt5lrgcafg5zvgl2j5qco9nh5xp1urqp578a3mnb38i96vhrs0mv5bdyybk9ret2q7q3bao6coy9akc2fvlrxsstnyvpkygjvehrxsls5igpnddf2mt6q9jmbe7bee3v2faxayazszve8540at48lv0yztzdc2qgehdtj09iridphtuanetowawp45xw9loobcfn8ts69auly2hfsd5bdc5aksahupyya',
                filename: 'w9uf9p3wgjimtnjwq5n2rkzgc7r5w9xm4qu9drwokm5j3w3hpk3z1bi3ikqutj94jubwuw8954lfswehup4db2ig20unztbe92cnqd5al8rfb35ojizzaukkpjehx82j75govvyj29g5rqueeolwj12e1vbwryy8xc4ufxizy5f828vwv4cify4kbw8vrj7p6vy157k13tp8lwm7dt8k0t0r6eksyaysozdctkanqmrq43usv1lafnx0701bfs5',
                url: '2rd1d4ygjedvekxeka2u7qsaw29dryzvm29peukbol1a1m5fcjk0um2ufyjfc385jczw1jixemelrvelr2h2j0xx5uei1syc4n9bddrpuvve3p42hbdc0gptj0n9ikmyhvy5xbpj0gq4s0knnk3h8ujq1xfckcigltnt5b3fk8mn1pm9l3d53acdgm7xb5jzbyx8wjanyxpfdgxwwk6vg876fdoooqq4vn6a98xn1acoylly9w0ppg9d1kpbir36fa3ngeb5keb11st6mkr9qhd9hvmpdn4dcj07vss2iuclivq2xttdqhop52dmq5yxjie9c73uro28gxy1f69zd1kjripmw6d9k8y5lw1nltkwfynayb88yu8wzu86zmphqoqiq5xy6e5mzjj7jc0g9jzjm4gmyf3u75xb9ei7p3536mk87bcwvxdufa1vsqsi4lybrqzzzd3qozhhc9wuh2cx7sttqdilykdu6ore2mforcc2ujjdvdafzb10t8pu3p0s437rt7baocgkpi3jgw7bqlg5yhi5b8lgjawqa3uazlmi2xkl7iiqsxfo1x02fwpp7z6tgca3fn2mxj6caiqk6ultgastukjw5nu3ydp9neetk309y19g6929r04n75luc8yjyoauw2k18cliwlp5d6wqd34ky0tp5mghb8yfkal3a7z6dy1dtazec381j0bkfk1cjr37eefos5sljm9h2gl7u5aunmtnwnt3mnxzho7wvws3sov0hn2hufmnttguzavi3zdj69pgva1oiq37y0acdijgep2prmvsd5nmut37fy5w148gvgxal78e7182lptfhqh0a0202uml0abu0qxpj3gtc3upjkm1qjvidz8fnmvqmdcs3s8onogfftk1t3pzedovb7g00rac6qnqgvvxdu603rukagnv6c0gm9ur0v0mrbcip657xd6zo87w13h4e33v7n2jszjgjwnyntuv290mjhf600lsjc4w0tjmfesb50z8sq72kzri',
                mime: '9eu4tdow6zkuevjz0830n4j6xn5zn51l1if6pp14juc27kh7wa',
                extension: '5v7c65w5tg01k98q7t50818cxhg8gc3l8scpkqqa0h0ztoe96f',
                size: -9,
                width: 503434,
                height: 258080,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'u5hpotjeof52qf8kz6l0apzmzwzau9pv5uevnuv8qqg4b00w35ek0nl0303es1784gcmliuy78dw2u6v392rxpffie7n0xcp5la819fozui347e1ag507sqfd50fwywilwj8krwjpuyvr73a5lsl557369xmx90xheuti66erxg8ui1shaaxgc8seimdrf91krv2g9wb7g63pvi227q1k599npeygpcgno1f0o1ylf0zyw1or0ffyn7jpipgjd4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'yi8gk4nnf87xedz7buvf5hakld0oqrt7ps08996at1xhojuy5zq4f6ehr0p57h50isg8yx2yxmo',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 356460,
                alt: 'u3vh3bcbp7f3xuc9u5ic93c2gmswqztw9krj2dcovgrmssoxsop3xb1swwqyogxhad0qospf7c6ygqfvnr7j4gsrbc9emb122mz6oh3ugajp732dp44otr58ugxfna7hp84gv5xemzcmukfzg4v2g13u3chvidlb98351lwplxvm70l35f5bjzag6cfst8gxv7nj0enbtdsud40cbskyhrdn773od059pnfvacugdhfnn3vlxfbw9dnhlw0oc2f',
                title: 'm5u3bjl4z6a19iefjrj0xo6yonow21tmjk6di09bxzd2ar25rlrnw3zlihj0hxj6txecyfavea30z1st1ezjqh63tx3i3my3kls4uvglha4pwk33cheqwa2tw048ovo9jzf29q0vx7e3q9bq5i9rh12ekyvtvs6ui6fo9opdfemutjiykuqsiscytegvrb5tfof4ky7clq78efjrj8wyuwuc5clsnk7fmteyvohb5u90pmilf60ehsus0a3s8bh',
                description: 'Doloribus quidem minus illo molestias omnis assumenda cum. Fugit qui qui rerum quibusdam. Adipisci pariatur incidunt excepturi. Atque qui maxime eum quia.',
                excerpt: 'Repellendus porro et quam sint possimus odio sunt. Voluptate fugiat voluptatem exercitationem aliquid porro et alias. Assumenda sapiente aut similique animi enim nihil. Voluptatem odit vero eius et tempore iure repellendus ipsa. Modi doloremque quia amet velit omnis ducimus deserunt quam dolores. Ipsum blanditiis assumenda.',
                name: '5ppnya5hp2z9booi21x5mlfd5qm3xeqp3cdtl8d6h2ce6jrnn2yvo3gbw74l1l8qo4fzmdzr05pl0vbizl4q8ldwfezpvxl89rtq3d1r31c5eleydwe12ij6mzom7gldn7f44mqpcjrkeciaztp5y7b8850dd3mhgoi8nqlls853gw1prhxznx85n2javvfklu6h9sgwpgkaybw1hra1jb3e3fikqgo0fn03cbqiz6se71bp4mvm6njw3qern66',
                pathname: 'qbg8k21agsqpdhucse0fhf2g956wt978i3cacsguebljp4iomsd0i72drarqjh51whi2pocz385td67d1rbv0lrupkb7jxgnbtcquk2088xw5m0kpipihaqwtwwas2ggbsbgypkq1kg38shdio52kmapo6jmmexvz4v5qedupunp9446y3g1t1imtfincnz5x4xe5peafzwog2k1fhy5jpvifpin6dup757yg0sortzyoh04ws1zxcndhh9oce5cyl5xc17t73fixmaqptw3ohz0eyzsvr934f4kww1nfgf7x0n6stt9po424mc0doogjba40r2t3kwykyrkaiostypk19vlibvg69iiyqwfnu2jebxkkf5j9ichpvj4uo5f8n0107pku3mhoadu89f3no2sa88p39fgxvq6fu0sijym91eyjtlmpkrc9xz699m22zfr8jq31l5tqd6agq0038zc5mx51jywlalm9s545n5wtxh5560tiwrslazzs86ibboudpx7hvwrf9ih16xa2b8dhl9l07mdkvdqehkrhn9afyhctei97r710vuceq9i4kwho3lf2zswnxy407jjw4tu1kvob72wwg7lyszudr412irlqc2l0bnb47w9ez7thfixulgvj0adfdjavx8zun4idgsio2l82j002fovp2vk9e6syq35tn0jvgjpr6ygpxa2rwrzvsoivbfujy9xo9gpqst5r4e94rkfvccq22el5iyvzml3625wm5dd0211q2m0y19npeethaikbk5xij0qhkaxybtmcid1jvjtddvpfa0ykocbj1ydkf2etq42nzqzvqt1nyi9o76btrrw0ijwb4yk9m81sxd8531k6auqv9rcnvvitrjmixi78cruhmci3ker2q9vi9plgohshwlsa2kpuq2fbok7m0ptssi2jxj2drquy5p94u63811huckyeto4qpqqccqp3d7j0rt9djxtumfvhx6f82dmzq7q8oo4qq7c7uya95axp5z4',
                filename: 'yw0lajwqhsms6zgzb5tj3ly9w7qzzsgdvkxyrjwn40mzaydr75y7jyac0qb3c4j11wwgat9qpf9hq6or4ezpmwglfjxn9jjcrwl6qxyusn5v9t02he45nppdp2k22l8es8k4wyxtdzw9nty0e6z2oy3zn954yvhy3q9fnw3juqf6lhgn0ai2skw314q395elqhxdigllb69h1wr1jcpoo9w9cnv94wf1iv3nzkddvnbk74r5h86ghmkp511kcff',
                url: 'lh8dh2nwid3rfy6qdasdg2rptu43llvbt8fbzot1qqrb6m5u1cue5nw24fieuxbizegrfcgt58fd0p72sj01udfz624knseco3rhdkn2lkec2u4qhg2kfbhfp0cn4jynqw0bpk87sn45aeezq4n79jbjx81n28usyhlvn3kj3mb3f1075rtbdrk2x80yd3e7bz4lmrpjioheifcwlu3p2odss3g5ifi4omgwj512m7i6rdg33nda2bhgu0fc1gdkm8gz4ljjwb8wfzkpwh52ni6dqi6dtdrs80jq6sh5kz5j4kgl1hm0vfq1nx4pzsu1nogy41dqwup1mh6epgdaq6bc45q70codz9xmfqk8boj7jcf11c71hid94wjgfkxzibnf0x9fp1itlcv6m2qo8u7ok2qju3l016fgbhdqocq4yz9zgllch0wj54wqfc8vai0ar7f490bq7doolklvtnlb0ryla1h4ujupytv4i202hcgvsbzkryde9wdddb0db6182s9smmojsodphdiegmzauslei01bi2r051gk062z9tlpqu3i0fitl3u8u9qv4y1j3auzvgh8ufhfkqla4b8todygf536z1ysuox7yatek2s9rov640uuw0zzafm82erwri6qausumnq76hgsxaz4aimnv6i0aocy1kvnfi5h3bi5cidz5eoah2vi6j1idyks43hzytpnn98l8je2az313drth0w6g729l00ge6598kvrwc1tu9x9pmmds7jjx50s4e9cdcy96g5p25eu85b1usgusuij4u2uhopcktve0x4z7ibp5lkz4qm8ws0dchqt6hdbof0v30h6extkcozd9y6fkwiur8va0xhtxpvwg6qjwe5317uc0s2ix56257t178bd663kemnfiolkft4eonpzbl7u3yksxyhfbwt4lkasfsbi1ch17svzvxy1ncy1yp2obtemkqs47vrux0g2f4pqkyquf4xntgsxxmxuz928lh4l3rholvmeij51',
                mime: 'd3m4nqwt8p21rbnc72k06fv2knjmpod9vhb5n0rhahf5s7ploe',
                extension: 'v6i5vnrrsokfj263iw7xqkqmum3b83bvgh59swl9b2g45ymqsb',
                size: 1305347421,
                width: 383365,
                height: 152665,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: 'xnqs6wwvnura30hxdb32rju4djhqvrf18djlkerygq474kgswcqsvxklh0l0m4vz6liomvy05b6k5q95bbn3h7bghdcya1jc6jxvu6rxky83byjv7r75wjuupqlqphkoi2fac5o3ffoewfqoewvzlmiddrtvphkw5jtef1r3w3d48x4xv6oqvqg6522s4jw6vrylouyqow3k49a25bfadoxz0jma9wa1g1o7rp7k6acjkas177y86epz0urzpd1',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
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

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '6da1f477-3aa5-4068-895d-2edff9941f2e'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3fc6a796-fae0-4d3d-9baa-956f3bf428bc'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/4995adb7-5d2f-4abf-a04f-4b9ee2344417')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/3fc6a796-fae0-4d3d-9baa-956f3bf428bc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3fc6a796-fae0-4d3d-9baa-956f3bf428bc'));
    });

    test(`/REST:GET admin/attachments`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: '89cf8939-188b-46be-8bd8-9c528e2b0bf2',
                commonId: '022ab704-6f40-428a-9cae-f2670219e823',
                langId: '277cc92b-7fd5-4c5d-bf2f-d545a1364b29',
                attachableModel: 'dryhkxv48bl7l1jotju2bpt7cq617cikca9e4q2bbm1w0yyen64y5weivaczj7nnahmd6m6kou6',
                attachableId: '1a2f6dd6-5444-49e9-82ed-fe52094c02c1',
                familyId: '636c56e1-daa5-4806-bace-a313fa555506',
                sort: 946970,
                alt: 'x7xlvpkaueklmp1zdg6dtd8g5mdrpfq6e9z0eaddi8gpffaxto3gmpgj95df1t2z89fajxkdfebc029den5j82wn6905y4qj5k519sns15zpufqw1irv3q8w5ojc4fu6u1wp1xterahwspy0hupcolr3ybujgpofckcpk1epgzw0sz85isilnwxkxwc9lt97z82d2vgkigvhmpgwx2pfxy7viz6be54eqt31lux79oyndp5l9l0px21f6c0y0fd',
                title: 'wbyncoc0lrhrun2rwa0lsb2gvbk6byi1d6gsgxbpty2gtfh7d8wq9jui2ugcfup2lon5dgm9i19w1ejku0289f31oyrqx3ys2pc3c2zaivxrghc2lvicvgc3riskcf8dl0d6gua2e6j3sa9uqwc8m0vci808w26havuxa4jwrxhx8wy7ds4yjynqwrxkyscbmszeifafu4qavbkzm771fyly21pp8kkcfgtthk21ljhk2kbkpy0fy9uh2bpizow',
                description: 'Hic enim blanditiis sunt voluptatem. Dolore illum expedita maxime. Modi dolor corporis quidem aperiam totam repellat tempora incidunt atque.',
                excerpt: 'Alias ex voluptate autem architecto quam dolore earum. Aut minima id maxime velit maiores accusamus. Nulla tempora quae non. Necessitatibus enim dolore veritatis velit laboriosam consequatur eum.',
                name: 'la975c565zpn160vylpp133zynrofix5j4xjzsveme410amygtnemw0csp22o6gqik8erk11gi7bcm23ia3owlfivqki2yskenkdoxo1zziqsy9ap41hgxby3k30cms9cnxg0tuhgdalkcr5im7s9afunqppp8jazihx2knq18k6h3hbm45ciawpiso3cyey59x1ut35cgmjlpb726ern4e0vwpbnu8x2tc5a8lky330l6y1fq8ffwic4u0uerd',
                pathname: 'fpzdxil0g3vkwpj3q7ij6pumipnzdrvntqkdlw9sentowh5esd0vuo8kgmktnrv8uaipmneatloee5idq7r5jk9b4e023mw72eegqhcpcwokh672quxkz4i71f0bxa3nfxdikxxxv8us8qjxlbhba419r9gr338b5d06hofnxhux9wupbi7qmdint70gj5vcexjh7unxlh65ld3a19hvzbxd6uy6rafjb29hikg0wr4lnl5xqqb5mfujsd5olks3zg0wi8svp8b97cxmrl7ebzad83n41zq9xcrh9boibib04yxb3dm7kh5cg9ugfihhvfvr81gdw1pqzhsuyouoaz6helzoh7mmupkc0qpq6v3pypxt8grj4dfdetsmjvsz2tpjwbonf1nr7q1pl8wzqyofyw2phv7yv2avvi2c8mgfetd669npxcfqbhgxhq5er998tj3qaz9tjfwl0ixdbe3y8qormj0jr5lep8lbe7jm6wjg78uyyjtdm860ctutvpefulb73r9cv5cjlyw7gm0utlgkadfw5f3ixabb5nigp4begy303nuhoy5qnq4c68iuf4ik2tk7wyujaaw8hr10py013gwcbdpyw1cnemoea1etdzjjoeqjxlnxetb8x1jr5q8fd53u4s6zlveqj67molu0830wm20b80jifd1z9rs9di5nkrwmwi08s4vsnxvr6ri81nn43a7aq4x5z4kjlgew3qkd2s4dnjbsltyxht3a3dyn9zisvjnevn033lh7nflk4rvngfr8kg2fihe95yn1c9wl1fk8c25bbj28klap0170e4yklm8b7kq3gvsnddp2pz6l6klp3zvm9xcnc8zaozpv1gypsih52gh37syzjxkf3mlpx8l77k4aziea8v8uoj9ap1onhol1n57ctn6ufgjge767aeb6q6nte5knjtwo2j46gta44bto5r3vi5zcc1k5c0ryr6eu34ankzgktwnuro81sny5ocl6vj7zkwdurnqe90q0fv0g',
                filename: '4vf3wsl2i0gmldwir4mafy9slnz47nnfl2dw4ovx6ylxntb9fo71qb4z6sz3knf66ejx812zsr1chv3l7dmbkzhoo5n0izxq53xuysddi98xm3003y3nb37w1f7n4zkaz6d1pq8tb7k76awfq33fozrhv24rozboguxdo2elbw40njslqeikxjhmg8f0r8wc3eyjhr11wn1hwsvvgh62p2yghnqpg9srau6zpgjis1hcsgdv2tch2n8jzs20f33',
                url: 'xlexevflv0czn8dfnl4oyxzgyw8k2mt59puawtbuozza2p3k92cfyv00qcteo6sskjx620k6rrzsculxa3lfftalmcjmlozgxik8geijqvdeyyvm2ly9h84gzeu1teidaf7eupa2b6wwa8hou85h4dzeuypd5r1z3l2r6mbnhxkowdov7hc20wlwt8w5242v8r047lzvyd3m74djm1oa0zrmymtairq1ecgrojojek1gr3jza28hixutna7pqbx108mry07dbvcf4ojo1nlo9tb6btufh8l4cxcq8xfjduc82bfzg0x353blpin5no24txkzccxadd9nqbvrdtpqweh9q7mdfrge39bp1ni9vbqfccnc9uij3w96uf45jnlp78i9kjeehynhbgerntuonbli845lb7vfrfceko6q2gduefl95rey2m2mmkicyonroi8ozgd8jw70xt9o3cmgjehsasmele8gzdlr5a3jfn34362d907nasmy4e645kmkie6is3mp0agbtylrl5oi9trm4l8dfa25whmdcp77l4u8y8cp570exmxgbomu0ceujsb18imk17v8rx3oe396b35air2kqihsjin7wl2942yomgv0ev1f1bxsr42cciax4tgh59xo6sja2994gxxuaswu6lz2rwbhoyhqny222dsdv035ewfs2f8ytutkauo8wopkn0qrzdwdrfx6qhke7gmvaibbtpw6t1buepqeo74k3198kuo5nbehvhxbhd1p99kkv1krmx1pyqeodlpej67byuliukac42yms6rpihofwybo5sfkkyh50jv2nugnar2k2ovvd50i3ozmaaixdk26mq2o4w8syz729h1iz0ml6qdlcyijjdcq3sztsncpe42r777l5nclb987ok5wj8vwyx1ojolrn1fc3wftvp34terqfigad50hqzprz2altl3nm2vchzhlni89725aq3x9tznjj0vgsck9ll4ecewhqpqmlqshvrk2xtqjq1zu',
                mime: '9axo0c013zer73fjke2clu5fp5x0x6t2dnda8f3bo6l6d2hg86',
                extension: '2bck9qdwlxoj5nvd8l5baxj8oqplaj2c0bvqjjqb909176h73f',
                size: 9299834088,
                width: 991414,
                height: 479967,
                libraryId: '760d5976-dd11-4ff2-a60f-dc239548897b',
                libraryFilename: '6phgkvj42ayaxbdltnaorc0a6bz30t3696lx5cjax3l7r1zm5j8rswoqhkwqsxxmf0tzbqhnc12pssykkcji3oxbmzfdvdkdzgp8ihuynuya0dbvs7n0hladowrj8f0b39m9l6pjbhsorkn3k0riyy0zrjzkttw8v6uznzyg09uzhm600jwdzokd18vc8wcw1uewnq6ro7dfcvlju3pz4vscz7ljvvecwgvg9pgpabg9v91qqj43f6x6mv0x6ch',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                attachableModel: 'rtkdozdryh85mi6q4l2q869agms848tcu3mno54fwasvpyllqtercnpl9nktok49qytibkregvn',
                attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                sort: 841567,
                alt: 'x1rd699nkfsdtzt2xdxu5vpjcun0z8vm85n02ny3m3l0nwp9w9brjkqm2gn4n1fovq5g07babgjal7hl8pjl60ayhuzsw6ufhr1tqade22hop23iuyio6f7pz5mr3ud93adrdxy1gbaw74iae9ovv2ispu3zbx2qz84qhcspis856tupgkh5y1ytychy1l2kz63ecsp4hpfvkxevum9o42v7tynfx8gr45n0d8bz9dn7ji0v0e0gnvg2zwk9qf2',
                title: 'q4y5fogaccbm6t6ggtz8qrg2kd9zp5z100zejhsns624bts3mejict2h4qr26vm0bhdaevmqox8pxy4qj79xynl218kelyl0ynnsqzxexcf1p5w3tgzvw2d6w9mqyy4ud4ky3rvfs8ch0vakspz0tcdmqevc3b11i21e5xq3p5nwyznbwrwini52it08kao1vd4kawdhwrclm5kz2sl9psfskerlrinsk0lyns07cwwce7xwpfyo45klczqre1i',
                description: 'Commodi molestiae nam iste ab. Tenetur est veniam alias. Tenetur quia deserunt veniam. Quisquam quam blanditiis fugiat est quo nesciunt non. Consequatur suscipit quia inventore earum. Natus error saepe cumque perferendis accusantium.',
                excerpt: 'Labore autem unde officia tenetur repellat quisquam illo. Ducimus quisquam consequatur. Quis harum harum et libero eos minus maiores perspiciatis.',
                name: 'fau5h2c7jve6shftyv3dgyuexdfrouxp2hsv8za0w8bjobir5wpbbtsefmuydz2jh13k3p37essgdai15yf5cjmkf31ivwuta977afak4ulod82vnopxgkrv8b71aoebj9ycdg0o1mpwdp915rbwh9epgaa8l7mad39jw3obgjbrdd30oko1qbygccibyx8h5k9rbjjb8irvawuw2b8wt6zmycrv6t5rjhbwj4si95q4xgepm1ubiwa0pp8q1ih',
                pathname: 'gs8f8k0gk1yodeh9w4qqefhagtcbjill8xdntjrkuwgb5izoir1f6lv5eokhzroya6001u1vtcg6sfzk0yinas5kdyk80c8hxagx8ejwy1a9ausuygoi7g21amxlx3k8drga1i0xeaama3b9gvd6cxna013l9tevfy4431i7cn698npa6fsie2vd0lhwabu75ooa0deflwwkksbx1lk4siwcrbii4zov7garc9ei0ayi9lchuco0s9l78i777d36wdsq5s7rkhledk7ath813kl87i0u9i9ao3h6v2f5qs51igkchba4hh9l517cgyewhhry1nbxgu5fr4gedpm83b245hvzce6c3md4bsk00y30f2ynyj7q2jqi1ox4c4057nkozueuy26upyt5iatkn40evbh326jngckrm6jiitohnvhs0lrr3smgx5psl2kvmjxqhgnldz7qtubw9mexhgnbbklmqahi6m5wvl7si7jlhljy5wpkd83hibv198u0ha52bdab0u6crjzyq1bqkb0lu4979zr45z8whl1ojl5cllsxq27gy7ryj5ozvd8thllsim57wwvhawjxp0yniwyxpxpzxjish5w6y427em8zmy7urawjqnev2k4vk6brussdh9e950tan52d7pjtbqg43sixfs1gverkbjs4hkk9t724i0ckg0iqop81pjnfqc9ukhhifvw0yalmvrpwj961ocmqi63qztev9tpcfx4gg1meci0qt8m4fezcihkfsqmivc6bg2846n0n6usrqanaejxjba6zwlwuxi2ku36py2w7h5dsprhdjz4ekgkfdc9b9ci0onhhr1a5sisfndunt76359hecz1p0mpagl6rr5e3wg3e7vxfa9trialk0dh7npulf8kdia0wdc4s8m2zit8ir0nmaz2gqhttekat9q4gjnoy02ysr5a26ik4705yh9fk53b7fhrjfxju9m24vbdyxznn2ztno4bupc0ce4qnib5wufnwy3w65n6g',
                filename: 'qkcxe1hd1o8iqwes5ied8oknhoi3qrztixeuphrz5elq21gcikhzssrjrfo9o79ohp3zblpu70db1j7ysu8szu895883ysujcbujlj5cd612p6a5xp2nke6la6o7ulwwcdr7hre4emj5tisu5whz5n5de9nb6olclpt9l9ipy8hzn5m5y8tzyhop9kki88bse1zaq9910wpx8gzpgz5h7my4tcvfc9gjypgmf05isegem115igk789vegiey9dw',
                url: '2vc78em9p6pv9gqexbibxl8r3awwdsivorw3mvcboktopsyolms7hz6xrsq6for3vdbwh97khhthjcnig2b0thyuzin1zgmcehyb1se0x4kp0m1jg7iahdj3tjo3rqi17bq6q8v9m581oll7dmbw1hy8qkp9hbrdaj52f3r5rkbasmgbyhwdperny99bwjxg43bcvu17wwe0ic4gydb253y35rw2t4217vs3jnee9jhc1ugofkgx86bkrqdi8mrj66cak0oax34ar5c2cus98s09l28pxp7ubybnjkg2k7nb6zjpkqdpk9rfg80mueuem121ebxt1ap9yp4ysxb0iiww0mjrs0z7sjdxxnx5i46as1iotygdhky0lw17wjsznlc03ypnzzs2sq8nmjwghbzpvyvq6w9ukad6dzeebrzfb7b17r8ti6bd53bfcu8fn43o6v2ce5xcqzad75vi7emsnpmc3yi5kubjv116m4lkaeunxr68409foy2w2cvmuhxzg1u56yszl7vgjhisp9q26ltornje752ku9vumzggch6nvp215uhnldt5eg7ndv0pvcz0i4l9fhr76ldr1v8k1d9tzlkemw4emqjfs5qr6q7c3thnx4n0gawy3dmsa2q0i6m7yktvjlem6bsylvvume55pmgslyttylw05gejvhnzfmm3fa6tvefrtriwren5a1qf3gvm4dzema6a94df61qjmv0dn223i2vsvyisjz0z60mts4z90r8lvhsywvjxv5xdwlaq9jbqjynq83eko30kg6wa1qf1qwse4s6ebduezwkcodco88hucwomed5o7d0ctzhe1kithy0k6g23poaa1en7v2wmwk2mrxhyeunv8webn7xn8lr7zex0645joxup1wubk6qx0pktq4h40um5a9kj2syy2a7spljq1ae5ptanslxttbsxh6ejjl5zdmacd7rg9thyo3esw91mvelmrqm5n9budyufwhqc5j1ps0zy49gqy1lb4ilg',
                mime: 'fdfip4mhx3urdhreemvmwjn5kjduyf1055v5go173g17uzctnt',
                extension: 'mss7r0g2agzj964zs8lqlk2isqehqk8if0yrafjnyg9w6rqdlf',
                size: 8420050605,
                width: 761652,
                height: 261884,
                libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                libraryFilename: '7gr0dwojiyrpodiwyo6soh1jhdyjk2uzr0exmuyx7l3t1sxxfinaj4iduuag3e54n9ep0bgw6idoyg7nmyxpxca6f51x1qpkn1k6p586hdfhzdssgn2rsyprknzrj2y4hmilwcaps57vkmq4fjwgvvz1wqfunw8ywou0it21588qaggszowvv9erdu5o5bfpw13huyncl1b4road0jmk57lurdjquum7d9fva2k3kci0eppgr9cdxszf01zmdcb',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3fc6a796-fae0-4d3d-9baa-956f3bf428bc'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/a672b61c-d5d9-4d9a-859c-c56aabab7053')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/3fc6a796-fae0-4d3d-9baa-956f3bf428bc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
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

    test(`/GraphQL adminCreateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '604d732e-e4c5-4402-b695-8ae10203331d',
                        commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                        langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                        attachableModel: 'ob4ykncb3ujxw954s7kh7spzgo60ahkv26g65o4ip5t3wwa7zhtpugeby8rqqslkg8932dqcg8j',
                        attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                        familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                        sort: 299590,
                        alt: 'd2iny8kryn8z13op8ctrcd3rjzp76awznwhhtw9g0sm63xdfjoisvbwg6r5bbsnxmyoqxtiov0r48oy27wfhy2fntplm3swny36p9r2nyxta9jkaxjo7yblii6jvwjiuwgmbpkz8fb9dwqschexp7hm63luvjwjhky1nptyin1hmn0ko814dkoe169f8lv48661mgfh5aj84a5l24b1ch066ygod5g5yc7vbjeyuh0g1z7282t2i5lvvo9h9v2i',
                        title: 'rhwrqo6wp1foxb9hstbe4tza4yw62ngl8n5yr3i5ulq1scdpsr8101zeh1biomrc23b32qm1rizkfncukbuhdh2bsa4lkw7direbnklqau7u9lk49o00tlwia60n7hvmza2i5xzlq5133hel9sx91mxie8tlze9vrykvx656wat4rnblmzimmefv2pao5gc13uu4v279rnw02lyoqkmj1nhg6b9oyahpx1ujrhatgxl02vjedfpmb5zudbvke3n',
                        description: 'Soluta laudantium saepe quo odio qui. Qui non eos assumenda et vel illum quibusdam rem. Quasi a at dolorem dolores.',
                        excerpt: 'Et impedit sunt cupiditate expedita vel officia molestias. Nam reprehenderit expedita modi iusto eum nihil eum iste. Accusamus facere dicta enim illum corporis quia quod consectetur consequuntur. Exercitationem dicta consequatur quasi aperiam. Dolor vitae architecto vitae doloribus quidem.',
                        name: 'awv6nr6u7kdydaowm0zcjai0g24a412a8ac3rojmqamqj90r26iph1w3gxu846vpbjiagkucoped9gvkqx05xk3cskjokrnqnsla0fdn7u5qn45vx75oaboukynxirpccfsxrl46fpgjudbmn758gcqn87u7cndmmgh6n306m9gin4r36ce62mevkzr1iuwjbegv7nthbz4okse5ooqkn38jk3wox4l5wzxgjtl8z2rf7x1wn4y2ineu0xpz9lk',
                        pathname: 'td0t97toiidk7622hjsasytg9nvl8ikd581caw954uk3faovst5cav76poxl6zt1n59d3ooygjxc5mjfjg0gwzkmhyyme8xu0mkriss5mi283tespyqiho7j8celf9ppwf095judgtg5lroon6qkf57comfnjws92xj0s3vlpryc2d9uzbslwvqqzi5f2xe145sg87kqyg1ad9vfuae46ecjmaa9r2p1dwaxo0urp6hpvun0swqa53meizjc7zte197cqon4jdlw28f2yfn162xy4lb9yoidhsuvy3j41ehcqeonetu1zxgw268ybcp6qma31o6zm5a8qz2u9eh2hk1hqlbmnu4wxqb9fynl4fni7d3enesiatauedimsqear5fgyglnirolxrsu09b0b3q3oouuvdozwzceazevb39jcemkh008mavd1wxz1ercdib6dssitc5gmei2ht9m4v2st7xhfaid02hfpiouu2vkyre4wqt4qneyht1ygngp7d349914tkjt5fs45ou0bkopfoab5k1ilfhmxltqyqdm7mlhdqm08d8ptk9cfx8ucnaqkh0r7i2m6yn4a07hn3wk7yuyztn892dj8zbh93f6dxt6u5dp6a1eupz27mxg2ke7i2scb5mwbbb888x9rd0blth88qbs3zpkm9asm9j2rjm6obohh28h1lv880zvpauu9n873boitgdkd0n11olqmcu104ekyb5ur4dqgp910u5rxe7jnywxenn863nsm8a8tl89i71ph0ff72grp1xwndu2ypl5qvxrs3fv9nmb1jzml31qyye6zac1yadg5mlbultsk2v8hyte4h1mtn8pybecb27rr0zeesept9kbw4dmcnggxfht7slpbx75tw5oljcicom09m3wi7l20mmj3xfg5vcwoz0er3y92jehxnl5orqch7jq9nelh0kr2x66eq4dwmd6xxm1dem1b06asb6k3zpkeckidaxrxhdy4uuz28mfjfia9upblmsg',
                        filename: 's2px28gd8h8uge0iu2xr6ue1vvio4amjzk8qoxk7gryn240srx2ta7q7t4rzjqa0dlrg3tp9ta9beh85d0xpp0ak1sdwskuv9ohjcywludwkvhfibyamuqv7jxj9hv9u53s2jqbuz9w5t53bmw3xgoa7yoqqn4un0zp1l8odvpvz36pe925jz5nu4q1qjp7u9dz4mdsh4inl1gib8eljnt8cj4rbow8limkqilu6zkzxtml3p5szfv14s5s1nrm',
                        url: 'lxho24zv0thwxtdn90h9ln35u4ufpfswcp0rr6uumq4r8g69363gt45056aecb9582wo6743clzuv2d9bz5esq6fr1ypuoego6ca4hbiehpiqe3543tqou4jtt4s5h4lneq98rtd9oxdv83qzrjco5fizqk9vrafdw0ltin3bhjisgwdwbvc407bjv7y6c01m1mywvh0cxbuacdy85v0k1t55lxc9felqqz8hju8th2ghqn6s5os95p51kre0rcpkzoeh9b41hurfnbu5qtmr1rf3xs2ktc49rnfl4lzff49utrhnoa78r5auwt77ipfo15v1bo1jbr4dsqs3oltb0x1p63m62um2p06wwo27bucwlst82e7r01q3zrsh62kneyseg0koimhzildqed3295zmyw2r78d8f24reqmom3whaiidjztx5wl2gy0k3b19pjknwsukzuanwxnggwn72w76xu0baguarxb7k45de8pt2seu00ra9pykv52ticzyjtc1hr2g5turr2ffydomgqddfn355outp29jjrrju9czo45h3aoenmcsz7y6kth1f3lei5nag0beaaha31pd5aanp1x191hyjp055ni8au6igxmc68ic9x66oyigfx3j8f6rpebg66nusd4eay6jj1ydkbf5vktfospt1elw2kxsggotfswmutzj19mrqtkdi4t1hat68iae3on2tlihgruvf33x5lkf0iyw9jmvjx5n282uydbxp0e2sqyywnehrnrqql5cfl7ybpuu7ni9xz0bvfkany4pl4fyrknvrvte5rt5vgcjxdiftg084ums1sfp1xcmjr0lrzbjhqzkpgp09ba7g12vojhzp57i2nl8mu92lwyrvkruw1j35uqupeo391h1b2t4agi7tf6zhv5gpop91axl6jxh7ttz8viwsfz0sl5t96fui161ojswexibchs2fxevjyrhks96qbiy9j7doysutrgkq1b5csxu6fovdd7bos413682hnd',
                        mime: 'eutgfyvr4r5lh7x37i38sgb3ba3sz49w7yzwwqak72ho7mi9pl',
                        extension: 'xq8919hb5dpq5wgpsd46ergsl6qodbn5b5kuvnj0k6yqaxkfo8',
                        size: 2175202602,
                        width: 551542,
                        height: 145805,
                        libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                        libraryFilename: 'e0j59hqkezq4vqwfmdrigzg0xsem77ktw7fctr9tstot4wlb96f5oey6kub85g862778gg7zprkzz9yiu7wo3n290f7wkvnavotlzr9qwxx9t9x3kpujurd6zdx9qxggwcqekq4e7fvvtfjeoymkgwifbxi6zll7a59yobn6i5ufl105jssxr9s2vy0vj5qh7544eo9h7iktc04ivd3u0v69bla42zo4l8tml8lj6fkqd9xeze5aac6yycdz6j7',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '604d732e-e4c5-4402-b695-8ae10203331d');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
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
                            id: '95e2331f-2601-4704-80b5-590223e9065a'
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

    test(`/GraphQL adminFindAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
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
                            id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('3fc6a796-fae0-4d3d-9baa-956f3bf428bc');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dd615fe4-c246-4c58-be07-84bb0eeca2d5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('3fc6a796-fae0-4d3d-9baa-956f3bf428bc');
            });
    });

    test(`/GraphQL adminGetAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '31fd3792-8ba4-4320-906d-bcdca430b301',
                        commonId: '15af16ad-bce6-476f-99cd-4c245303b7ce',
                        langId: '4baa3ce5-0e4e-4bd2-a0b0-c4e82a6d8ff1',
                        attachableModel: 'bfno4gqcww8d5zz5c6flsim0dowpmq2avs1nzqnt9bcav2wb3yl7ak65gwycfxbvoi19820jrmi',
                        attachableId: '43d23f16-f2e2-4807-95be-12c156161e36',
                        familyId: 'debfbbf4-a04d-4866-ac44-a9794dc2cb47',
                        sort: 106002,
                        alt: '3jmjgmf8xgnh5zv6inh3bttg8vy5524kxt80ovsfkh9vjpzct4udymhwc68bhoq9kx5ttfn23l68p0utdr1grt28kkxodgytgk3109bmyz4xo0uiegp3mz4his6fo5l9fghwwuhkimdcrzamcrx1gbdd7x2w1rslycx6airn0brq2yanuuwc0a2ks42ioodgg5ml3ni4er5n9duomjhb1al9fwrwweunmjxb08q88rrnjnhvckh2s45rs6avvmg',
                        title: 'pjp55dscmhkc6drdaxeipd9uz7xo4cqxcsph8i3jmd8cqp6tpj0rgqfh5vabogbpjnhv7ycchuv2mcw7gy8joc673ec2rmd253l6dxzw8bjsickzq2d3yoallub9f8lfjje7botin8jat80wkkznikt9oeezghi2etjf9o4bie3o76a5x5i0oyg941rp4hhleqgoy6y5ui9z6jdmv1h2fknso8i8p55id82ketj421tx7hug8p3344on8ng8fs9',
                        description: 'Aliquam ea deserunt rerum aut dolore rerum. Minima dolorem occaecati doloremque rerum. Maiores eveniet blanditiis nisi. Praesentium omnis quia numquam reprehenderit atque ea dolores. Rerum pariatur aut. Pariatur tenetur laudantium voluptatem aut omnis occaecati asperiores.',
                        excerpt: 'Nostrum quae ullam et inventore dolores quam harum iste quia. Ea veniam neque temporibus nemo et. Repellendus sint a minima. Velit veniam neque dolor incidunt. Omnis natus veritatis alias.',
                        name: 'bebtaq94lb3qw7roqtznrhfyilcrhp6k4m1aoyc0a7j1r060q8043f64qn74h8o8lvjuv7ka2p598gxcwtu1p526cgm6p333n03yp05fqln9qcwsdiva8ktjqtwpxhb4heqno4sdxlfxgyjpnnjhzzb8kkt42bsdd17oz3d3lawb2vb291p7zskptyo5o7iypj9hw13eunavdsct4tg8rqfslxslx5eah04k4a77wflypyv7067rbwwdnxu537y',
                        pathname: 'iw3ygz7b9yug6jay1lfwiibi0qjhvm2caebhfx5ohz27yz5oz4wn9d4ad7gibmgt9mt8gd7pdez1lui9dk0lc73h01p2lf3ax207cbbh6qub4eelnl6rtrew2ga6fya0bredd5595w3k9mlwqqpnhg5qv8fndcm30wjz33arbpm0ubxduvvsi1s0m1wgybk7vu7w531ttoi8ybrk6yxpjml90h8s8uzzhrn5smmki56ew0y34cocqspz0nsdqpcskqf0dxjv8gewczggmoy9oenmish9ql1opalchl2jwxg6314pa2844n8njnpx9twrrhlwohk2czue2enmbj4uzlt3f33auw3d1kji5nj6os1pui1bw7zd0ytg1hut6br7f39a9dixbkrvi1e81hgf6urwk7e3760lo1c1s5n9t41izto9elnuqh426q1z0rli5nao3jawt8svpqor4w28z421wn8rjuz4yvpw7gujphqionudnn8c1f60y13mzufd7kkuywb8nc4lxbqz2d259jy0af8j69vwk6d9shxyrtukbori5zx1lodq9gc54lhnka8c8gqkaybnec2uih8w4hhfploikhkqf6235txwt41y8xqgloxuwhjzpa4rcdwby8kplaxvkuhu1gcne100403duchd0e9yuynwwqz9tk007vusmejaylmlt46xh7la0vapdjjp8cbyi1fivnu7valalrpoasz2jb4keesm7eda91qsmthch43i1qofum7wt9rfhv6iuv70jhku7isgzhyw8psqwwba77xe0wqgda9xnpsoh17fvkd7anmbelxk77os6l1xmkg9ia6btztujd04hjvr1tzbdjbyzw2oeveo71tmh5hccydgjoo812y158173rhs676wdkzkfz8jc2ulp87jjxad64anf8ms651p968bkvf9m1o2z3el25bm0si0afvrrz8vq09c2mblq0af84aesl6c4vl7f8bvwmj0iylel7ldbvrwwvx75nm0',
                        filename: 'hgprg25wvloo6lw3ayib850kseuais0ic2fj6nuknvgy43zxkhgvyn4isu0zwth2s4nbdamboicrrvsc09cf23mfa4uyht75dlqmryqwss90bhg0b552pacflj8gf333v9z32fo21znhfn5dj67dbh8zacijwdcqumlso5e2iz6j6k7uazgtznkmf41skljvgk6rbn7y8sovwrfkngsyhqpof8kxq201houkc8x3ohbp44kr7k88cjxgvi840l2',
                        url: 'ny2eftq3wgueqkqnlqh3i4kwjexdyd5p3xyr3tw639md8hdexw7ct3qomtp6jel865l8ymoikotjhzepdftakx34x1raq3526bp15s3u3qanlwqt4pw15nahk1mkigjgps4uec0csy0zourqiyp1ke9ky5y8ushksqftpwv6gcpwe0odq7r04wdjdjry6zdh66e6le2i8oomgjdtabmcmw0kyypyff5nosi1um9a3xu7zoun04zxfeux0mww459ewceucagxmbjufwbco01e5mfos81obr5tzrw2q0fp7q01iv6014pib2jfik1r24dnjdsacmbhmqb1fev4oh6yyhkqgbze2njmyzk8ffnlmihdov26l7gxpvl21znwmhpmumnerhlrzfdb44cz9w5zwolvevx1jlke1iumr0peiis1vbx389bbwaslz8tas1kyjt286bimxmggd242ysd48gr2lak4hozbct7cydje2dmw0ouekm2eylv10kxaksqmw5pu8je1zvc1f89k6aojbsr2dnuv5dotvrfrk0zaaak1tosc6w6zttqcsr0wrhufl77pyfgwgdb2ifiqwf6kb98z0eztt4whviryqdrd2a7ezghdqrmvuhioidyjrde1wjkxo1j4hpb6910v41pnwzj9yskz2ljxkx1kmdabguvfhu50ldod2axwr8pas6ly9kme2xntrha6lq8zswxf49lru6qxzyssgjb4tpcwlvkzvissycmroil18vby4uh88dta7svd7nhmq8ioq5tgbpmmsbcmxunc1lghn9xrj61i31dfcya04n1yap5jyqovcs4ssstl3f4cfqhjcwlf9xzza9zj1qi4qji7ab1l4x2hdxrz15gm7cmlqv62hosv30y03wbye8f91ig4288vaei0eh5lvxhvwht2pvi6xey57704rpyev6ixuqmatw9ze2wlioy37uscmwekw3u5e4b2yrxqxpwosefzindwv1mv8e67p1vtwdbns60nblzk',
                        mime: 'oct7n8y6ioiaqyz71kqeyvff4ckm6x2qbximsuwgws2obfbvwq',
                        extension: '3dl59qll60it9pl53hufdv9ezy7dmp3s8axbkfwwir7sgih2q4',
                        size: 8770123287,
                        width: 841794,
                        height: 199967,
                        libraryId: '8f4356a5-ca07-4269-8933-bb7e20f49672',
                        libraryFilename: 'kpsmzpglaw9sl91jpam3zb7mrkab9igmdia0zvtqqrneetylkd86l2sjmzn3r11zdoomf6oua1momoudshvwc13keo1wm1pk5sosk08w95e8ujstz7v524yv2jr8ujyjcb2vv29zumbaj2m5eqjuv13l8jnb2zc7muvh6jz73pajmr7plvag8okqdmkeah0raovcc9gscd6204t6ucktlrxgzylbteqk00i0yc9gewshe9n0bat2x9otj0zyah7',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc',
                        commonId: 'a2ab4c6e-0edb-4af9-84eb-f5fab4c440a6',
                        langId: '285a7e81-9c2d-4c9c-be4d-d5ea4e766f4b',
                        attachableModel: '5uu1pe9h1nb9gqyf4hbt1vein9c65qv4k5nhth3gu6ft9qdt659y4w08w8xl5zwtwdteic2ykga',
                        attachableId: '432fdf53-417d-45b0-bdba-d6512ffc4e66',
                        familyId: 'd5465def-8bb1-4a3b-9a40-97997fcfcb5e',
                        sort: 446422,
                        alt: '98w5kgxhopm1hiu8eqeriu20kzkktcufwqo7r414v6t7g15nn7owvos2sodg30vokzphpagqcsg2ulb2xxv3mtggurkfysdl4r1rhay9w0uk0wp05x6e74ad1uhtuwsg9797f714cqt4xhq5l63javjvbjiuo7umixmq9d6ry5v2vn9a0n0jhmwk6o3dw0334bcr6izhrz2dzqb7fcbj5v84tvm2qlafmhth88287pamg1tbimxcsqypal6v2p7',
                        title: 'rfsmsujx6i0l914t4hua56dirjupv3fn2xwjw9ntz52ltxbdad2bq0zm6tds726i2tg5izi82pyojojqgmgiashxwmdjc4fx1qi3og3vckdd3u8w07wgvjstu0zwmh5yz08rrbagfhs08j66fvuzd457ii4wkwda8bch2h66tdfjw1n7m98zjqsprnvevcvd0au43fv5fom1r285ine60qvavjkd7ctzfmu25ua6xelab0d7aqjgiwuk7l8j91d',
                        description: 'Eos iure magni. Ipsa eos cupiditate aliquam et provident qui qui non. Ad voluptatem tenetur velit ut repellendus eligendi. Rem modi sit incidunt. Quo alias ut enim et dolor eaque illo. Impedit nostrum harum ullam.',
                        excerpt: 'Omnis expedita quasi dolore modi nemo molestias voluptatem. Assumenda accusamus quidem. Ea qui officiis fugit voluptate et magnam non sit facere.',
                        name: 'b7iwuklef0svd2u6fppedwsss8pt5mjozgu0tf97mmo603wfosetl2ushp75t14ry8o8kvt91no7uldrcsxukvo9e6ph69apbnv3h7alr7e44m93jqr0kixred6lnllsg0hu37i2q52yinhe6cbnyj6s16kt3pq8j6a2ec58wi45zvnbxxw3fkw7rjoinybvbj9ghsexugojk7kwkioxylnkdxxn0gyd3hmj577e06ta38puwlz8bcxug93a9qp',
                        pathname: 'c9bjfbvf46pyhv3y0ldcoxrpyjgtaqhqe0j7qelg0lhms0wz7cslzggguq9xjput63bhox6ecluq3hmfr6fal8659x612rcod0jdhues4sgngbogwjl2jq7din6rjh55pal31l4ybufmz7x1kht3z2ypzo0luozuklqq9j86vp6dkwz321g6fdb9alaevahlu95u33f3pr2czs56h5635zs7u340kwnd6wzfeafio90qu04llrvc476gl8l4q86gzekgl9loi8s0efuct76qykqe5nrbbummhgjved5kip7ikwhxehqde2q7zzdkmoafkx6andh0fr1yigb1o4aqf7c5avje3rmw52ahq3z4immnjprycub9gs5y9i7b5jm4lx127su3r4esihs6rh8d2q3pt9tlffsip0o5kjq4mvvtnqop9dqzaitvceilfwklj78nls3z6168d9z0s5w9i1ce9qzhibhxmhyab0sz4af04sbedrlkfwoj8gidl02y4bubqbomw35rlgrn5m9eb89hz1epjy6hbrm2tbjblkhfhz62nakyry0yaty3i78tf46v5s95ah5f56ircceizvuvx5y3y0i4oyebescz51gu6lwlx0fcp4ug57r3yuqe5n8opkgomcc4yu3eina95ksb4ufs5kes301v0dcz9ppg97cb9slgszwhbhqe4mp64t1xca4lh34k29zfe0uai4eiyuo6pbosal1u8xwlw85rckx848znn1sirwy94yy1sov8qvw3397q6jlujmj11azulu7xqx1u5sb3awzfdc3m56rqilbidz50v1ir164huc84bndb5ma7tgyth5pv9fewbp3flf453wf262t7sgze1qxnvunyypevsk5ritnkpfhky10qcx9zpielkxq07qoncgdf7ykt59gvmbmwc87ec9o4dhljfebvq3rysqnewqu2kwmsapk9oaq34ivg5fdktcup6l4n44sp8mhs9xeaoroezin70i9flqc0rquq',
                        filename: '0p90thaxz0mpnosidfubanb4e7r7yar97s3r100c34lcuak4gv3fxnfryqt7qsybvvkhd254jxarssqpj9qp5lnqqm07g8t8r86cqkcc4p04ulvmz94goupd1ti2ysskbmuw8i6p85ycsk895ehi611hfi6vqgu7yg89bkvgkr2rjblzhcjp8tk0og05py4o53x7u429h6a2trfqagts3ycy9bamdn9j6ffn55kdl5fdu1o60f4dqeajfnkhwxp',
                        url: '1in460x0ksf4jm27aorc8uhhjifyovw3oyljk2ot13ckm6869oa77tcmgg47cohxq0ts1ned27c24b247e2qgewtw36jwg5fwoielpowt1xjyaonmuixk10ox35hxz6qhguyuvn50gd6f07qtw7e0qjd2tq70knq4o3ar46ixycpd1gdq93jz9sb6viis7ggm5h9e9xxvt2rca870idrunwxa6movdpiq0r362wboyv4kw35dw7vrtr2o0ml8gxruiwya7cictk1r96abipf0yo0jq1lyhq2xkgspo1qpp1uao3ea3v78p0raypb7v14sro1ywxsxfmdacjmpntpljfdu899wwlr4d14skwvg8ec3j75xe8ngrraevch913jjfyv5ooyd07jnu7pq0zo0sfdc3z4nliu80vo7eknov35blhan0x639ud60g54c5i2o2ia0hl8u65nz7adbfihjdjfj2mc7jlx3kdbl58wdfvsbcxe04z0qenefox4pwvb871pfdmi9pvozhwma4kfh44mxest5mtxfaxt6p3qxoxo2d5dl8m3p2iizjnyjr7aynkzouh5ert5v3wwbeudoifby0g8aevjl6rm4fj5nfh94wsf7yvr57q1jhkbe3d14m7dgbwjikwjieplkhmcx6wlzkihsu5l1rryzqql35i2htc32pbe1ws5cqkv399j5te54hi9p1cxd003y3u6vbifwatgezuu024t6an8gj566duv2a36q1m42tu2088k08arem45fswrfvsgauk8m936zc9tb6hacawz98lnl92smhdzz8leysrnvxa5wvtvgla5sbtka9lvarkzfmy8awnofbaeobe68499a5gibz70j3ycwe9js4ihaw8vupmyzm2tzu5q7ui6giilel51o48ozvl5mslxq75uwx2ubcj9om8aolygwrb2smbu03fld7qs97h7u0cfsiiih3qu6jxuz9555823zjcgge7cduxmzq6junol7wdv4lze9t5',
                        mime: 's7qs75pxgqyvh970vs194asta21qbdyv0g7v526xlmk2h7pw9p',
                        extension: 'y87onqiu52m9lyn5g0w22jyt9eonehgb6koqi4akm2lw42w7b7',
                        size: 1225124744,
                        width: 977400,
                        height: 826606,
                        libraryId: 'e49b17a2-cf4a-4d77-810a-829339371a60',
                        libraryFilename: 'acy72svapxf1e2p61mhqlezf6ow1r1znxzx3pt1oz1uyvntx3hnzjmzo8sluh6kccwhitosk8hxu2tegwgszrt6vubghv7smunqzxuuyhtsw285ubnrk6khiye1yrk7d99pk8sqrwskzyrrj74u2gpv2yf3vmso1tw5m52ptt2j3rpbvtfgenqvdryp935dxado15nfljmq4dkfd7agnv43c05opvaupzcgv7xm4fzzj9995h6sasjo5lv99rxn',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('3fc6a796-fae0-4d3d-9baa-956f3bf428bc');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0c28ce28-d4f5-4265-96f4-af8e70b2dfff'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3fc6a796-fae0-4d3d-9baa-956f3bf428bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('3fc6a796-fae0-4d3d-9baa-956f3bf428bc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});