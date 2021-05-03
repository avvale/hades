import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { MockAttachmentLibrarySeeder } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('attachment-library', () =>
{
    let app: INestApplication;
    let repository: IAttachmentLibraryRepository;
    let seeder: MockAttachmentLibrarySeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    MockAttachmentLibrarySeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        seeder      = module.get<MockAttachmentLibrarySeeder>(MockAttachmentLibrarySeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'q3jvz7fv9xhacy3r3qhabthwmybglj3u8ndchmsb8prw3eqiferpg52i88tj3xbs26qgvl9jy9p3hb84t3qqgcerloo1lupmh7rs7kbv3h1azyh3ythouiwd67nra33ycx3y9yis20t7ksdywksys7qfv7tx4r3p53g7de59nfbl722z38vndyueeskv5wevducpeaxz1xtng27ppbfbcygmg83i87mhxi4eziwmqyfc94btc1ihxecexr99dnq',
                pathname: 'ruizvo1tq4xzli44vgjahqsjlr8aqyk3kgue604jilk02s92jqb0uo34x8eghmthiuk4r709218ni39gwog6kiexblawj0i5f2ql6yd52g2pjv4voa5ppjpuk3xu9s8xs50byh0g43ayk56hjdg77fstf7x4zenb8mg2t3zqu0vdkmpj5nkgmjp6hjj4gphrs1k0whi5436eyhid9staoj1ugztjh0d2jj622dicjmspvpte3lx7jqxpsoaldtnk9h9l77lrlrfae18kmfts17927srs29whkyvgj1wmkcvun8nq4o2s7a710jkymp8j0xk49ps0cdtu3vvinobymog91tiez8ap6zi0w9ulovm7ic6ao0yzrmq6flxbixs4nzppxd6xkhnw54sipl0d73m0xby7zhkbof8ms5zz10nkmhm5tgb5lb8gbodnklqybozgy8xmbdyk50tyvtub555gtj1s5dexjieessndu3qz19jlx5kz3z2vteumu9qt3t15fljjwmmlh0ai187wtiogmdx6gmzzvxlsnu1wt4avitkzw46og208jdxbjpiegc79uwm5wb5kkue9k4efwdlcdzuxrwik58a0g6cvpgfl0lk0123p19ge3hd5ixgvzu01fa1s2bo5ta4c8f0vdvv2fzmr423uh06hpxa0c85szwlyezdlvxzxmujxj3271vid4fnzsfnotsc8a9umkm2esl9g9butzz15g3mns3ja0u3ie9n7q52jslmhdh9b15wd9wlfgg5dtv67jfdtlot0uz9vbwbq3tag9iqm7k52rv97twpg72ma71jqilvvtdefwqso697n3ruiolsqy6jrry5ndmwkrycehvnwdjfa23orne26p98efsphy43hfwfyn803ixk3vac4fghnpngd2xbveh3soxgzkaojkr7uhjz7nu0fj948vrc0nxon9xyknnl5bkgvuksbjp9b7dzwh1tteesmi3ye6wtwiw5fqyu266h7bgac2ubn6env',
                filename: 'e7317ujrd5wdzj3cs4b67jj95sp1zi6zy4l6fav94z8owaoqo3ax6xy45frpfvejkzmwusp79d151qcnp2rs1n9ud9bisdcgwfeq5lcfop7f3k6nl10hj7p3iyjbswbaryexwtdffu9xelfzgmzs4epp4zhlb2sqf92smzmt9mu8e7eqv06v6i1se9mask1b64tkpjonx8jcwcbbwp9by6qcz0qzrvkv5j6q5wk1n2syt7tz642qktnjo01whhd',
                url: 'ippx87kwoljib4zc3j26qpewaq24pkexxo40i20zpi5ecvvh5fryqv1cjwrf6woq1q2ukqfoqd39d07n8fxvxwi6lgyubqg4p0m52hok5ra7bfqhw465ari0ctqoz7hnwljkcqfqc2l238lmdcmwyxvtc4bhf4ch7ouqyabz2lo21hpzkwbw3ii7fo16ml8gh68q1iiz5tbazusikxzntvfruv60ob6mp7npyit4rbdm9s2ucwauddwqzv0sy7tkm3ma2o6lt5gtlzban28t6coyqs9g0m9need3r4rnzcjh5nnsdck8qb1cpx9fdtn08fukcww7q73w58x0dkmu616jp553wut5655igy998dkbbxoxg4kuu5y2mt1zshzbbny4tgp9cqawvhtgcyjk564mvcpk0uwdmp1eayz72ml5tg0qoz13uj2rf5p742v0yjpluesyp6sgk8cjn1u6ohjybx7egdoncqeaymsz3krk1o8lffgbi3qcbqrxdeb7xfwiiuqkqmhrm8uztxpuj8ydncd4qo3dg5dpri0ybqow1rtxwhedsnxqsy5rr9gzh3t0hzawqm4lgwm3zveoem1sc9pox4dbzll44lailp2c39ypxdpuoslg1f48mh15fzaaz0kz4pu6y6kimrhza5hkfm07r8guoox4b6h8ssnt363osc1rj3c1bsn1mg5swi1bwjntk6dmsfsrwc3roz0n6suz9qctxu76clud8u1pppa6i0w9fk9wa1y6ap3crvlkl7rv8ftjyeizeuu2ljccy2ypx2zs8k1c94mq0ymmy6mvgqvd5pb50n7l4oe7uw4se6pb23xwrqqho3bqww908vwvu4b7mf5u9mkoukqsmu7kwabyukzmcucowgth6f0ex1llhcnvw5k3196spkflp8vbczcfeiqqehf0088hhc5dhdr2zztrmyjovkfknpkcj77mpcmqivmxfd3zgko560vnjf7qcgyb9a73km5j8fzrzo046ru8ybzdp159',
                mime: 'f4ady0abxmbbqh70uipdi7s2za3tu7e2np36mihlameskvt4z6',
                extension: 'v604ogdoajoqs5mraa316ivuxp169r6gudqcb3h2yapgi0nejb',
                size: 9901679679,
                width: 882567,
                height: 217972,
                data: {"foo":"F'.`aIYHI!","bar":"Ev&fro.<zZ","bike":"O{%xZ>AUWe","a":5232,"b":92341,"name":36786,"prop":"lqBrA4m]E{"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bf7bc29a-2775-4722-8ef0-f3d90579954e',
                name: 'x0kuep3jv1vhaepk4t84zm972nz26rjg3svk8c41kmbm8313ppcqwv2f0cklapub5kpvwk8xpwfptu19wviifz2ekiik0efudq54wr990h12ez0jqkaf099npssynzo1smk9xuiye88ea44xkdwfns836k30ojmo884wq6qnxgt3rvuuk8ndtt2imxa3mnb4y90nkqyj3x11qwmhnivmekbxkrvhnpueg1qld8ldkand8m7kays74gdoprexqaa',
                pathname: null,
                filename: 'sn6h6c8nqyha8stehote31ea7dnwfcmqyqbude7252fpgjfgl8dkkjjzftpjvwbk231xd0l28xedo9b8qehgntwoalmultiedgieljp8lc19pice3nw0bp3syz124e2d2nxzfxxjtcclhex06oshxpwg9icqapr3l0jt1s29g54hm1xwlwzzwywpeph9o1cxhdnp5nl5m2r0k30mestcgns1pt8gtzw9iliyteyuvs6gir0bfsgfxo9yjxtrumk',
                url: 'l9hszxrn9m8z4lc2yyt1baqiuf43nsknxred3y2uioirbxf7ttegnil250j3tf3j0cucf07j9jxcbp1pji0bfdupn5hhx65n4yxkj0ei7er6r3wh4l5bz26ej49z9kq0qvsthroimlf4vm8ez0bc9es24rzohdd4ja40sftyczbew0c00z6q3wkrz4hgxltb1lgnx09ow06veutir8qiukcrfpmy788b8f29x4kpyzvwwm7qmb1c1vbk3romektb0bvna2petf886i4cq6a4lfvyckjvw72jnnbnq3aykbveuu0ie6cvzsc3zof6olutnpxkbwcumizpc7mkxejsh7fkogw6636u68yznie00h201s51ikirnjk7iri85ewol6iezuo3aoahaqkayfx123qs58i9e37oqey5j4bt0t43pv575w6w6fjigu2np5y6ioetakcb19c6yyhscwq3568q9rvggeqydhs1ibmnryubl87or03gx1eh0bx1pg30q0ap8i4rquo8gqcud0t9x7ambdpg0ki1bb9swxbdagcct5xm21jc1nw01rg83ywob2j91ozagm5x06hydfwqv8dgsh1ghfhee4jtcty7gp06qg3cgg4f7kveugfn9d21i7liwdjutma5f7p2qi35321qo385iqheqeejai2mym6yf29985fd3y728605pl6iq9k2tvasfouxhddef2dbm9bofjdn827sv4wrkbe9td3lja39qrb8sk4308t0cteqkh2nfxzejwa2oi1xnhwexk45fx3putpd1o40mdq7tn3oem0rdcrohjzvlurq2x44ym48kjx41cefd2yb4r7gyvyy8082ds38t0fk1mmg66vzv4hk3g9if2sz8swp7g8jyc0ac912z2rxuuq8onyx6pwx5zv2ofm4mjpqafdhjias2xhjb81v0sc3d26630tp35yews9kw9vorfpjmfviz9sv43w0ri48yt1kwi6rjua00ii3m2cfr0j5vv1l3te3',
                mime: 'z94qjp65afnosh6ipnc7ox5gps63nuo66pax3g2qwab1i7jqx7',
                extension: 'w1q18cliuts534avu1256i8usflqcvmjdbhouvans2p4ndx4gp',
                size: 5655638377,
                width: 333385,
                height: 515143,
                data: {"foo":"5T2$X7Yi]v","bar":"_7lh1--UV\\","bike":12229,"a":68629,"b":89450,"name":33507,"prop":17229},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '230acc48-38b6-4f82-8d9c-1cbda0e21d21',
                name: 'wwxbb021kpz6q3zwabczeznun9ni88qxsxuv2ystx3wqxlzjvkke88zxgvbpd69g7epzb2wdrxlpjpmjpabczmuwmuoi14zywkldmm8a73uoz7rptwihq7u6jnfnud9rb0kuz8xt41po8cjjdqvxsfoeo4eg23qhg4qnl3oqwfco2p53juf3bd6q3yp2x4ravrh9g5d937v8oarvee90fynh111wozoqjmhmhpi8b5u1ms9on7psl65yo2ibyjo',
                pathname: 'xa7vhomx4nd9b3gnikrg04azj0o6p56n9zfkq2wmkkx4yiali68negt0u4fjzs5dzalt93qp12vgkw8er9v9njjo92mghdxhl20a6bv7gltwjqpsjfttzj8b888p04sp5p9gjvrzbkvke50fp1gnhof8hjd3kdtz9xt4bw3sw04xs8eaz0al5m4302uizveom5wf55xg7dsfjlq985mhrde3nrlnhq4ubm09cd3846im6t08s4v9skg6aoawy07bqbdc3nl6fvxqymyud1flshpkz3uby346fu52e9mnlfyumjyo108u5mlcujdmd14ecv5ovbmt5vtqswciabp8j6mkru5nhcl448xch6k1cwpvdbxfhsskewp89xk9y8rv0tvz32gvz1r8igui5nkj5v4ys261d0c102litq73bm39y8cj7nbsct2gbbvpn0uw3geo4obhlahbc140d8mp298yy5vb6s6n9j734e1rivcbxsyhhq8pw2dv32z0md5xgfhddo4mgi238omajaoykmqr8niobxsm7oii50lpsnramf6uu8bzamqtsiy8mxditvmixs8m6ud6y5k40j374aasfoi8477syvz97q8kie8qcz1dyruc6b3i4ztmoxkkoxbhwf9zpgb6v8fu4zogpjp2c1dujmmceqbh6ohgij3c0calaewu7p9yauycln09z00exfmkmebniosm0iez7ylx5fy2gkxsycq0vv70mzahuqnv0f9nyz9uylurfc94ejydabqavbw3t9iuqw32lkusojcv6tb9uhknllfo1q35qtmvm9a79m50vvndep11ai42iomedz3vli6y8cqwc924u7iib01vsn341w9xcefdvj7tc0sy8ye8j0drlmjexsayu7llp1qhszu0e0c9zqaaqw0msb43hquzgfz6mi31xgv3dakhpdieu2da3rr252usulnb2tlu7fj59kw13p4uenllkh0k40svdq6x8rnduifhet382jwmg1t1exqt',
                filename: null,
                url: 'bjvqslag5lsma32ngi7wmy4lnsqm8dtwbcxhptu5kv6u3p8rkgzsvi8h1sq99ou0rvpr3m4bx24j7a3assxorpe1g92gko7fvkf6796lycm1ii824ds8dyf4gr7hse0gqf96xp7qbu82tlwxbdrhza7941n216n3oak2rxjrapbcsy31u5q2ib567i7oelwfca6s6gaby886r49we9b4my32w6d8kww5ppyij3b8vpwyvdipd9d8wryfefhkw1pv6rhjpe6bfwnnrbe1nls5o8ou0uqt5wbdo5khijpkdvj1zb5rlpzxfqc4ntzfhre55olusyzeb04u6vmwsnzniqmrgdwppv0vkhyiz5vwopedbi5ateuwxoqnmberku4teswyl03y4s2hm1devi6imjq0cjqntvosaazyodgigyr61rgiuwvvd80j9tit5dr8yi5f78xe4d2fwdppnyiswl03jbgz8hhcrij3nfq60j5i7pnplxypsi7xtw16444hlpfwmgd3ws2fcztpp8wa3dvib90z09nnpfbhojirzs838duxry594w3h47bizohz7d04b7cq0xif6u3hrd8f0927filod2f9t1826n4zd8a2pwryuixqwkq8r86ofdwjbsye4mq9637hy2bvc89qgg58lpm9bpokjadxqosvls3qg4o5qrkmxu78ttmk2ddqbl2csgg6moflqeibvi6ege5ts4m7ncd26mjzydzxemh2l1qd8ipzobb1gj9czy0ab7bd9ae0yrlrjkdz6tia0iz9rw8hq5xnkmqwr7z96cmyudv6261lgdjzkm4njhuww5to3gtf7e2nmb1v92ksx4wnhgve9xxmreftewx7dkrbfbrevvbk3flfviz6uqs1f6yi6ck1ul4slevc52p2i6a590kn21sjq1h84pnxlqe70k9cnhbfmot5u1g8b57lhhx2asntt0sgdo6ocw0ifzvilr57dwbd0gd6ime2p147g97y1lx14goltnt5owt0',
                mime: 'hk3gi16vaxq1hjnynnwmwiisphnqg6885qth26igplck025c98',
                extension: 'qo24z9yhrx9wayil0au8luci7hgabksupn4epoh34fpi4roqaf',
                size: 4087793767,
                width: 333194,
                height: 449047,
                data: {"foo":48386,"bar":"zB93\"9O]9z","bike":"g?QaGR|20`","a":24845,"b":4938,"name":"sHqtmOF$\".","prop":73576},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '123e5a83-c572-447c-b146-10cd62e94cbd',
                name: 'vz4ork670m5dn70j4hpj2g9svp4wiit6hbkx0gu7noss9bngunxqn8nuhxt6jym2dgd6acat6dgbveect7pbw09o6ivdfydpcjy9pytaj3bvtgrx39y7d8xnit5mojxzvyub7vb0xvyujheqcn47yy0p9dwm26aqxflkpo2zd44g7ken239f9qcf0gjo05bkak8sgzyqldk2l1ye4gkvi1x8d5edf2d9afbmtan8pgb50s9vyu0316wxvaxhd7w',
                pathname: 'ut8sq7ylv3oyskpobjezfjwodet55dmsln4j8fursjny7yhfjtviw3kzv9mpzeis748u7whpfk4eeyzha0v63ejx1ibexcf3hqtk8ejh3yej0gp9wan6762u0dgkt0fjhamwxf0zgsrulrwatx1i50cgejqhy2pjgs59xrocyxj5glihpyxxbnyu7zx3hxe9dim9ov3m29nbqtfo83or5wd8oz1h9dbwn0ck4zlz4xhp1q4vxwru8claycf1la0ayxwosegmx0d476y6n0oi4033avmdj649evkmpekyad6zdaotj5zcvyy7w5nargmlg6vwx5cxunvnqohbgd3pfoaaxatp6dbbz3v29ws5fteclkgh8mowcriievvgfgrrwmb05x9bruqa2yor5ot5ecku3yf1zswwefzxmeq6wwl2d3n06r74h0d84pj9251pz1o5w1hq3szf3yy68cdw211174d805rcvirl5uprkttspsiitdkx02bp5sz8hisuml2f0r0efg5xed4u09ljwfwc6c822dpsixc7xnm5ekqpoceguappfm5mjrgkfo8jt7011fvest0f5l8eh5pzuen0xo08ao4ha964rfqkr90scs1ytudgev0n7zj4llnamowzwrue0qcipuu33pbnmvy5txh8orq38zfb14qk3rnmyffgpqc1x2vv3fp0ccujxot72m856d7z9hp5yrsdwyelqofee086m41gjw0aehjbeb5x5e51jm1d8k020tm7zzqit9feiv642pwgq072egpvfc271x46d0qispsqwiegb93dg6u5f4d5crbgnwruiqomcu8on6q9zosw5nq7csb5z0p7xgn114goc15gi5acmjh4zj6v8op8djdw9kdyd99csnv6m5vtmd78wnzm92zriphu1vjs6aesk02zcat63o1l7vrr9ijw1xiew7x61ov46vpbwwgwwkyck9nxzbzl0aa4epsucjj0w18j8olv54i55849gp8jpt8ydbi9',
                filename: 'unjepy9ydkpjtsy3zc0bvjgu5jt8k4cbpoj79wlg45kcan9y0p1ipt7jof0805ih9lylgfg0mx09we5zlflvn6yvak1p7pobz3yauijplmpwkzksp7luj022xi2ck3phvysiw3k408xn0wpy8i3jwz7bluapjg64rjwhl8cyloi9659yxvso9h7pezqeg4zggokdi9vjw8jocyjnhf15dxvc5bh4pq0k43p2r58cu8pquix9s2t1kwzwl37wzwv',
                url: null,
                mime: 'ju4tpj4qkje2zw5ig99umn7u6yqz7zu2hwa2apfree6ddwz0vd',
                extension: '62pluk2ao0pnpn7l82u7qjv0tzilbk8rclpr80nk2m0ilwn2ax',
                size: 4848924122,
                width: 488784,
                height: 827183,
                data: {"foo":"[!5ey3h}x9","bar":58725,"bike":"!5}b#^|-d#","a":47937,"b":28127,"name":9356,"prop":78085},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2e98e064-4f65-4211-b772-63552dc0fb75',
                name: 'yg6dsx4ya97grasf6mny31n9vz67f0qm3eqx4ropn6iqlmvceyt6ijzncxmwl9czzpdxl12wrhvjadi2nz7mc3vv909ec5nn1t4o41cb7r4vq9y1xlr74vzhtdpxg90rovxrvqom5qpzs429bptf17ksba9xdrg8nodpquh9sf1s2o5djp60iarxj88froaek06cucfi2aaix3b99rk04d0up73l99mn3tvyt9fy887zt5jn8zskgy6ifx19752',
                pathname: 'lcpdon9smh92mw50ka3o7swxzakm5cnsuh37esqxfttg1b6u6ybz7454d3a6cn1pijeqcad81empgs5ki3nwifqpulfpaqvihny65lfjnx0w1e6m2bt1n010zwc5cgh8teu92nfk5tzd2tcn41t204sn746lb7pyalqilivslzzqvk51653nx1giqixmr01o7frvmlosehilh9goynyfgngcam2rx6qwfrvx0ty1qk61ssbax6kn89ok91jbaa7of93t1l143tkne7jgp8zxpoliqvj066mv7g7os6r0ze4cdgl0p2r9l3e0nmd5g6q6a9amrqufb0tvrium43yr1ssbp9pn9f3at3vpug4qsogqy61qluvfx958g5e6e6vl8kifdcpwh8uapkv1ok2wmiw96alexe8i2ojjzaaujds18emgl6j7xj64hfcg4tqpmqgk47bs704ertvq4rcaggwhbuyxgi3z5eunll80bl29ulmgdfa9uga7iey5w4s88t8zgww4cng7m4j8usd0tg4bjraogrggbmdb99bjzxe10wzfkq9a4n5om3eh9fsbv3vhe66mzm3ibfxytrunkd1ni18wg4x1q8cdthwnno6ngdxdcthirtlq4fa2zuv751vpl1okmk0a9z7cldft2a7xdyf400ktcih1c4rimfk29jqyttmvolkv19nmdulcwge3ysvbo3gxxefzyxi2esuaiwleqq35cz0sac6r70z33nz68g5x393x20qpzpdrpltv1l9itieacnj394k3smfj1ldnrvphl4e84vv6ps64z6jd0t7yhmkgr75tat35693qduzn1dm0427j00koo2xg9uunxch7hdlfda2mx6thujatdh6gdzrsaa1zzr8jwlis8vu982kygmjpt9ats0p9srhzo05zlvb6mspqis2s2525da3kpy4tgc7ma63d7ckwuxw5701ntjr2t6enhulgcacgr4ae8djcesek47jum14o7do5ojy95nu6d0kq',
                filename: '67wwxck3bqeixs1agajx3sa3wqqei2wyhuqm9k2tujnqvtbm0y601j129cb93zfqnine4ax6unxwt6lku7qn36rt1udy19egauyy32t1qd3w2b325hdw4v3b1le19h11ptnx0sx6x583mkk5rj1k9kg0lhehl1u7d0bvbwybktxmsjkmm8snkrohjg4xy8rxh08ivniiopuc6148tpql5hljbcdd2j3lws27942kehgfqzeujc75uml8ijoopz4',
                url: 'osvdwpa0ag0dlc8r8mycwyg6nk6r6dgo7ye7wdq2142m29h3j7nqkqv3k68cm11funnz7erw208uh3de4azegz16j5jcet8tul72qn9r4leymx4p5bxyugh7w4qf3teciqfbewyitl92vlyhqt50qe4r7gywqdr1wxfsdc80iwselk0as6n8gmxtnd6kkya5zejckr819w2iunq22x3fb9jl74w0yrr32xm0vntajxjx9emepnwgr6lt4v7vqhjmaa99rdk7kcr4bdusry96v9tdl4zbwux3upwtv7arbm0yzr9hlqm9oeax727o3yonqhlndwu0usjbg8228j90i7sx9g0m9h29y5t3z7mzgiq1vzcznaybjk92z3h7a41qoiafr6dfmog70h0kcimvnem1s9mrxnr9tkvycp0djg79jwp8a6ib4f6044zzefucg3rsdpnv1fy6nc64ibemxrliz8ucm7ijp8j1en8vlpg9gzuj6d6ng1xan55dapur2cvn0uliecrgb7foqhe4enu5792feqnjm8icpfzh3huwgz677xq7waoonwq0f4x68hfluegy1ef86ofvc6ipo1kfxis6tfbzge5xd6tk92maptfhv8ruto8pog5puqrvymt4xxoq87gxr79lbk3pv1evkzyd7mvubpyoejajoapup6j4vdt0sfonow4mfzljqu9kuzn7v3p2p1isibpfwqh293z7smmthgoktqtder2bge9kyyop10dgyjtgs5ngbal0fi7zvc3axmg9e2hhx675wr8hejdm318lsa1iyj3ky7augtj4tjkuc27ith412rjoz9yvj4iz4hafoorlmb69uvblfm1h34yjrplvq0r883s4kagi65g72h1ceb6xh2go6sqm1o5d1t4lh8afvxs5fwxhqf4yh3qajs5wh1swmm8o4etvg1e5hghokmpq0d6us9q7i70q3k56v48ud3uqmvwzsfdrwej3hljh2i9sd1o14uj81i7te3eqaacx',
                mime: null,
                extension: '1gb9z8fbi99fn3zy6m189rq80h2yb439zf2iajcle9jb5rgff9',
                size: 5445480205,
                width: 513962,
                height: 586373,
                data: {"foo":3625,"bar":"XFkU?4yN(B","bike":"bswmLQm4j;","a":"TCkFa&x+;m","b":"O-O2z=:Jn`","name":"u{<Ofg/g@3","prop":98828},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b88f61fd-1524-4ff2-a38e-0989c7438462',
                name: '0bff9i9vbijgwc3rtpznydwtw5dvhv2xa4mv9go7q6rapuhqhvo283xxdtd6khsbo902yhwrxc9lq9ei6z1rjvdzzm07ii91wzxkf0gkdgcug2ihmq1hijzali9m240dmwe9zp17f8n2skozzgk7nemtafzg7wb74ek75f155ejftffemaeddh4l0onods3zzif5znuzr5m8ssxe0kxfpulutjskk707ynva66lbxth26ugpv6twj0wg1fje7al',
                pathname: 'n4owwnzshtpktfisz1xeu5zblfpo76mk6i3i98cf1jpik5470bf3f905jliflgjwv310hc3lxfsq6fjjv0jym6e1cuihcqotbl3ocots9y55xih3ne6oijd7p25e0j8sqjfxadhw6n7fo6tlu99zdinz6zst818dc2s5ww2ne067ccahv37w6rpto0a01kxmqqfzh774bfw7kukf3i24m5l5vre9neg9nrpnm6u2vy0u0sovwqjyvvw1hfgiwzmwbmprgjqrp8bso2y9tv2ygmjw0st3h8iwa7ftx79l50uprew2o4t89xhxqfcha239kld4hm0lepwulaeavkyhorqpt3soolp3wch5cmgcea5vagwg3k8xxbvzvluj73i954g48rgf779qx16uluqjau11xk0glf44p9mjpw8th5jdwf6xh6iqraoeulyg3v0u8rhiigapm4h3zv5i6vyypseuk7y7qhvkcflxunafgaf8vrct1w0ylngq026vym62xk74tduzpujk5iswkv4sy1hmh986ytejyj2ku4jyxtrsjwqst7gduz3br8y1v7b8jrp30bf7lugo41z3fhb0naurhh6ay3aiard7p7sucw8fqibr6s6s5n9fbypxckfd5mm93iaas94snxl6gkso1dz1a7oghk4wgjt55v4w0satnndwf8tzwgxen07yfr3rbiov6fcysi2wv0r6krruvod9oz8abohtf7bsc5yw9hq225mnel3udnpcx722y7f5g3opa7vhl5mw83fbnlot4jbpb1aysn6av0lw1gsnfirreope07we7z4nx0qro5h8c0gn7jdyzolhz7aqptmkwoc6n3cbp2u8iywwp5dfq17fwdh85cp84q9q3dzmkfv8s5onu8o0njbu8w79s80yf5ko6fw19axxj0621a2do6f0h6onrojukj753oxdcr15oe7llofivebli5wbqwgsae96wgannpt7j8cmydbicd2y1ejmfnraixjxojobyfsl',
                filename: '6bg6ebbm1eintg690zfrl0qz45lm98vewteskbzx419631500bhii07ac4zfip6mxdnfrpkn1ecs8g60zgbnk6pmo628i1svhw6e0wkzg34qaq9seln0cv8musjoj8cg5yj47vxs4wn1flrzp3t7ucj2bj0tgzsyvxylg0ri3l37ao7sg4dfciu8be1tne2irfvh76b9qz674atgt9hohuuc7t1cwwvtur83p2fj20iki85kgkt0lghcejuxcbq',
                url: '5yemxb5x7qvfpe8wqwarlvhab7oi4d1st25t3gy41vesko6uq6f517x3015n93qkhxkdw5djsyxhesnu2zcoyid1xr4b2e52ggxfusvymvmidkskfynp3lpaix87tgjlubhn4mdeahhb03kjf4d2imqoi122dac5e12tylo82wh56wzw6v1sv0monseqhmhtnwrpq6ve8kjj1l026fcvg8zyxra0hfdnkd9pwaqpjfb0qukgs2ft9lqnap7hpqkawxcd44redvvi8dqfdu4cnu7r4xnw25rvvpl0vbing47i2802bxd2451m8oa3ukdluq4x0gdql3wavu2m1p6r4gpgcywa8bpwnjvhg3z8r7jpda9vp746lq4suhjpzg0iitvxv95u1ibat2ba2qf7qlyradkwbmgvogbad6ihfrjpbgex0853kfmstx1fnuopwfiffgd3c0pn38qotmuzxfsbs7yxt0d625eo3put6n5w4s6bgo70h0uraeypfvp0dpbuxgcthnkfcgldlsby8yeu9q04216wnj96k3tuwr7obgm3cf7jokbezum1g0w91ztirfg55n9zvrfv34elttgcjne9qobtsyad1p30uyq9nb0691n9u2kig7x06dj1hvrpsjcy07x2617dj8yht4bfhqw8u5vqplc9g6zyp4f36sxf724pfgyvqacfeu868gjz19t19k80bc8phlvrhcmm12l9n3vm8clogvi87wj16lyyj0wrm05ajimxpaekg27tzvsi42lp1hfbr33qee345uizxwvizs7z5j0x8ztl774kw5nv6pbsl2p0caesy8pawjb344pz8665hse3whdgxty031tx5pxkr24innxlyetnz5eomtluwmo5hl8bs3zgtkaujwckya7qhvd1aun851o7bwp11oi85eivk5wfxu5f0z2pk7odvsjpemd4fsvgjeldta9vxf4hkpd2af3ts7k1pkr3e2paznq0g2v4orvwi7zsmg8sj65m4eyj',
                mime: 'n9ymaxqi56z67yblt54ritv5f4q38uicww447c33z9lcugvi1l',
                extension: 'hfgz893vxle9d1fs9fpiu3mhnzas57dpw7eszb46a9yjifutry',
                size: null,
                width: 290855,
                height: 800987,
                data: {"foo":99923,"bar":"Z(n'sc4V1|","bike":70595,"a":")>>csFj2QN","b":"#U&?|Nk@4w","name":26419,"prop":15304},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'm2jta8cd65o1vlz5qfmt54a98ri4q5qyqw0r3jgukg428jtyb5xq207ychnmgqhn4m80w4k6t0ijdf33eo0g1lqfwhcato671nj0rpazss3wrl0oz5qyfqkyuvn3knsm7lg0tp2hvqposajjre3ig7y90871fy8zoen1nbpxo0l0jp95myxmuhgi4qowouguond6pxbwtakt4tunhlljiu2bz45s9vko8vmqbchs14na8aldiy6871cr7qlluh5',
                pathname: '6rj0w3j7utbwmc8hyu950fjmk620p9rebs0grz62z6uajt11iq5g9w4lojp875wfxfi1wekcoxts4v7snwyizl866mhuur98fpyt2amcm2lycd135rgblka2mwiez13wfhoh9sbi0qqme80fgeyxv709ch9e0620ef2cbqd49fbjz9b6pgl1h8h2jnsif3aubsbnbmhz2cfkx5edd7lrtt74bsu9xo1xa7pa8zbr1e74vcuurtdd63dcky6jx8z2dz05udnc7dqzlcr3kn0vt3s4z3jstwd2nbv245mt2bhrcx4aq5rtks6ih4yz2l2mtnyw1vv8j3i0wo13u4ey3hwtwkwphjv91h9wopwp0bd0lygd069a8wgs4sunma20j1u46cq5s39lksb2nz3xnfdjk8uda97dpa7x4dgidbfvuz2z3sd52vpvl3hjzwanytwsqstkvs7kmv1d4wem0usj89nhwa5o0b1mgqoz3mijxtxpt4igh10wa7l28rn2ev2mstojuhr3ng6pv550wz2h9hxwv0j76etii7dc9ipv990zfitgtete84ikd4s9aoz0jln2pzdp3xp0uf1qux9v215poxkzb8rnfaslxwvnwrmf5gdajfqt66yc40oo97hx9r9l5ky4ksprunca8nfgnxzuzwm7qmh35zktaqwvhneutg4pkuk2kgtgzhurrkqgmr9u18wzdlooisepwtsl5zi5drhk9kvlzhklbxanf297537mm261znxd4969ogjmuzzvx9i0t747avi8c5lj303qfokjbcxln0xstll7d6a53hbygjl4ldimxruguuu4f8b8mbzjsrzzfi6qngeecnq5qb96t2ogls0yfir81yk1ywb1yy2auel258snh353ajbuqyhuhf94vdvywp00iwr6drwu61hddkwdc1sxxm1n5nuvgzs76rbhez6sz4r1hjizk20t5oduptytpih2ma86d2s6iiz65elg93dsqr1vxtbnnwn7y9ym8v23',
                filename: 'o38br3uzt1gaasq2sa01eeu5915ofrdv0p8lssxovqri8cikm9dkb2lpmnep6c54oos5dilg9na6cjwgnyxkjdx59411lk2cmgm07g5k7ihp9egoyegsfh0ehlnfhf3r13w4sijbkqnmlt7nllnrggeo95ju3mh93wy11mqbs8ovavpp39j30p63vqoblej2536zy1f4lppulkse3mq4lljoqoio2gk6v6shsm48jkxjv94dqj6cpuwor1766u4',
                url: 'gt8irg2xo25drl0qn54x6x9p1iewkk03xg6ak9qqaeyht1wzrsw2ygnfs3mea2a5jzoybekri9lxj31htm8ryyrk8e3bnte6ruwizo7f1d3jaa1d5yh427wtjvmr4r79sv57jcqq26vzd3q623tkv8mompe2ee5bt9vz3irbvh88wbwjqpltslumsl6j9x6mfvaz5rd80rc61qnqw1auleev0z2a181vfybubdsbm3puw0mvb6ep83x488sz4y35gza9pi6mbhex0klq4fl60o1qfllqq9p6ahicaedrtkbgssizwlrvd98f23j56l4jl4e5p08qs82odd7vdpncx7bgoby1qx8q9e4pu2jk53y57rptqhfuff6r9ewbfaoezcqtjinny8vti7ebkoyllkdt40he4ec3ltynr0x502furnzpeufjb0w4c0vo3vrho2y1g0eqc0jav6fx69sr7w5i5sivp3t21qlguyu1mwsa8mrl2670mrwkzc9jaiqat8c4cm8obpg9owvqhnl9r582tz15qe97l5pq4f3un3f3ljvvsjlybuovwo0rubb9pex96ylao4086w06lf6ky24ucq303892c9a14ghn73m08c9f9dv6aqjd7b3g0afhbdblp8ttc07klsg7bkadwwz2za5sbqvb0mbce6ek6s7ysei1457k32nqfhktqks6b1wdwi0ty90cy3xu8xgctooqzq5erppr9zw0xqx7ukat2dxlge98901ns4bckmd9fxrh6wtlk2u1kg6kri62hadfuwa2yhypkssf7swh0mugv5ywmxpx1a5p3ddvpv38equwmgvdbzfpzyknjk3pwbebvntldlzdnugqltwnt4xjwe8ztxighge6j6corpv4c2ba3294fb6cfy81mvlmlg3ydphaenfk4ricyur7hzgvhdhre7lm5e8jtc0dirgl0eu2wco0t6mqgfns5jwd9l5a7e3v7uuiwafwad3cvu02zj5ws8fjo6usgrgmh2ng',
                mime: 'swpiij0lxwonq7fiswnj7vrnamzvq1ka1pa6sdar1alawb9yng',
                extension: '0t2fhfqcyfdlvy7wxjkb28d9qlkl9xnk96mdvywix9hhrzpqj2',
                size: 4338899276,
                width: 679437,
                height: 862974,
                data: {"foo":14631,"bar":"eG#)<60rcO","bike":"Q|,EEB+L5\"","a":93870,"b":"W!YNm5j&/&","name":79354,"prop":68635},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4d675a12-57e5-46e3-a9a0-5ff4c86953c6',
                name: '9p7mc0t26b3ec53bdmrq5w9ahdyjkoaz7dfh3isjztk29up4pcffou1yan5rccohs6lju4rkyzwsn51yrpo7cjgpnub1rvjksutldydl5mc8fxk996ocq19iusv3lyud9awuy74cb0uw5o3lz7z1jcp65y2k751hkmia1qjp4dz2e08k5hue7iaisdfdajx56r01b3on18fugsrsawaf58fnrkvith8kmk23m0gubqkd9x52tmcdex3r5s2pm0s',
                filename: '9sy4v3oht1cdcan2q00b1m56guekelqgme13yllp5v1reog4y1ad7ezeyiie04lyb48cdnlm91aaij3xp2qdwcrbep3g5poz0k58pmdkygb0rb92j0vjhsfzfperm3z0ick6p2vqprdzckldayp3ghkdn1dkur8pi9wnkpj3t9oafhmsnwu1k9tx6ix9c4tsszzr4uj40ox8e3qg392othur83kqkjeiyi1f4ep21rbik29cugbhd6067lhq355',
                url: '4n96beyf904seixafj6whham0k4c8dx9f0dmkvw2srdy5s67xesy75nknro435dxtydoqz1ji5xwsw13j8z4cq87yqi0t21u6z0utm2gvixoadvrqdtj1ccmws4oyvjjrig6o1y2b9d0ks445ntd2pozlgdpp8cprnsfcr7331givmk5h2ngepxan6h42cqo0hkfdcfims68uylb2pga9w6rlqhsa4gto15ayhzbsljlu4p4agtjbs8x7ahk4dj2y9ejz8q4d7psqczs11tt6t8ar3i0flrvrkn8uw3h4i4wpeeuh3tcngsi82pup1ujpkxtxlc22hv85w2218m5eqg7yv03fxvccxhya0ngkcn1xpw51brjjfwewxeipp16w3e25ymt2h8qkgjhzdwfg0b6tmrcheue6yacg6klnjoh65ijc0gzruhn6spwbupbg3g1ofqkzcecrlp0ktpmakpwvwfwxc3iz5bodparslncdtww886x4ho0nzx9u2y0k72nto3cijscqbpnjcce5wy7t25f7ocbi9proae2rwhg5xji0mks2wa1q9nrvzpnhcogkknbpn2qg8vu55sk8gfbe8ndm56c7sjbv1ckxve20lr2vyf1r1bglo2pug91c63rq5siw1pxlbmh5dwjqu45dgc1qltceonyd6mynv438x2lczo7ld0ihlo8x932h0g137qglb7z8aqpexsq1cyxyk0h3v0awhdu27or7hkmyzp922itjn39j2th54ws184rtppk3ubrdlodk8b1of37ua9422a5netxufd7kj885q4lcce5flun1rdfcgvpcdz6095ji9ovnaqg6u96xlbehzyn6tuea8iuwtmk5xxd41akka5qppmb1v9yen5ikr6rucnfoe85syufdx0ufdcyftydcjyh2up782n4tbse1znggec7rjv4ordrxyx5p40l21wtlw08n0q574kj4f830nw5i6co9arxvu5lct6qlpg3ylrt3wa8xxxlyl8p',
                mime: 'uxaez84imi57kzafv8qv3gif30hdpivkxr0ugv409s0gon0voe',
                extension: 'pkmjzafpdbiimfqh48u2yx339dohbewpxv8szmlch1whdrjh08',
                size: 6800678090,
                width: 689854,
                height: 745027,
                data: {"foo":"SnH\\u7I4Va","bar":"-u{!9+T{H9","bike":"_8Q4\\Dr}r)","a":"f%7*&7PUXh","b":61418,"name":"ek)*00ddlS","prop":"Z:pjL*w$xz"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b06cd58f-a795-4983-b54d-3f9d62b780af',
                name: 'iaj9xb7azd8crorvmj1gqm4fhcek8vsufm2xcoqwkodrj881jojujjgjken5mx63mzm35r19u654j0eshdsd0lsya0mhv52001o4mxzxdvrl01jhz1p9p6186nyzkfn8fgvl10uh09vwca8k255esqjf091jcrlytif1xnodxsdx7dv7rus06sx7bm683bute7qmmf1a48trjncu9ryen4oqtxgbecojbzy3n26hu0zeraajijmprruqgzeq9ji',
                pathname: '1fcfqkpu4ckt4amjyrasi61mvabunzqix3oik8iqw28nqz9xxf61eablri56zigb5j6dqlqbjnvjhlujmv0y3ic3mq11ug505dt8vjxbllj2yrji3qnh05xjoni13wmmzmxqi884jm3v9dz4nv2m8usspjp58s59tuje4dw7f72tnjk1r1spmst76iboyfl3q8oowa1bgcykth6c0iwclc9c98hz5gjr48d7pxp0u2stjbpdadzh5pfk8wvymm9220z71yekc9o9q9ejczsi0ucckjasz5jou5c0bnkgqepafhf5opnhtrjrctd6uvs18j708dd0co1m40f0a4x5dyj1ucmlehjlrkc0cd9h0agjk3eae7gx13iotyzxi80z48zrye96gephs7r9782eu82e6rgr8yt7a0q2ym96d6e2t98vfx87tz194qj9yn7q6kh1rggv2yi2hgje3iptb6bfr0pep05q2prtnrce9duw4ttrbr4wfczuuuu2xsn230v0p892phe376a610fknwxu8ou9op3unq7k0q5p9py9ooq8uzwuixntu80tzinrboe2z3l16kxfovcu2cln843g5c165dcps080j5s1vas7ka1wrmrc74z93r2vstvw1fiim5t219yn8xhttrcmfkx3r005o1buow4g7mmwuh17pl944j14p1f685rgszv88qap3t5dcninqf0ihpkh5x8r59tlcnp6nk5ql64xe91rvlvpeo1oyg6kse1qm0xm4utbia8hk441s8ly8oy0zvd8c6dt2obs2lxjgozznck5ndcngy69vxaiimt6lkqtido01xje6txl5xjnc8hpfxozz6gg74zs4i1as2dhs6l0trh8tqj16yea7i5ps7s869rnzjv0yx6uea5l74aq2qvbrnaa73775hpfcgaxioguag5dcl2gzpbx3vzsnvc4i5z207k4bwn4s3suafsuqlt8z8e6qebnubk6kxl0enpbscx0nhoiqcdpqmjocgik',
                url: 'zitee9onbm8gkhs58h3g7qeax7k0m7vdcrgns9uuz6zwmm3zt5oov5vztd1atxqv7fqholm06f72esu3l98w4szhcffws2867i9n5f6igseyquxvmz0d8hvb1y2z9nvi26lduigj5jnba125jgyjkvazt1osm4kl4yd0fvnc8nvhjcc842f0tm7rnuatl0tpc4f5fely6nuy1ws3d5kt498rcvmae2qgd6e5ijk3gd1fj7a99oxu84jom14e2v6ibjeg1ejho4zrq3o0ubupg9pwpqjijfttx0rfsjoe5phls1uhdv7moiqy1r3a41840xo1ardd8aavz9c8izbabs928824yqj3zehvuspl2nmontw24trvz0sc9pzzawrkt5rp9b51n9p8hukny431y3puudutf6igjpfi4pihdy6fx3v5t61ftbcn6ixr231iwjqkbzndtlk97qgq17buww9mt82onzjhpjgnpjs9irvvt1z8cn5ni8x9sdkhzco0trek6vdrqudwqlwcqv9nrmk47tpe68hr917bctf7hh1c2ps7sewz8vhd0yti5rcp9j0x2ccopl64nv3f872apycbyarf5msfoe5kn3a4cavvsvg0bwrj012v50bm2ztwx21mowtocwkg0cznb67l31y63tmxkvadabu7yfm7xqkyk4eifs4jnsctwplf5h47nutaqkn42wfx1avysqecqlike4na0mtyg5bav06od7cfnqzdwler1x58cy9mvj0njg5tvc6ld6yai948zmsh674bmyjdgbbg9rxh2kr394iv5fjvzm36737iqe5kmpzlukxwqf5noexsoqy79m526f3jr3ewdkzw2vkz5jx9echkzx7jo6srrymrqak89zpmxn6xoi37a1j90o827nq0a2cvqtb7vkqazguvyofxx2dhyedg6w4asozd1k20ewfi3imwxntx46sqmnpxzlaz5vsl6nk8p3rjojgbwdbfb074afma7mj9d1p9p6md9gz2',
                mime: 's2hc3gyu10cgtbbimscx74b0e0x4ymgmo3a87xl0hwpw25s6as',
                extension: 'l520qw28v4xu4xn9yyouhqwgr7u33rdref2d7pmlzsl1mm2j0x',
                size: 8608752973,
                width: 461858,
                height: 610116,
                data: {"foo":63971,"bar":"gaMx*dsGS#","bike":63577,"a":27047,"b":"u3.Y=^sd:-","name":"nz)w>#L8;J","prop":"<JS30L6;}1"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6689a7f5-8e4d-4178-ae2f-38d2002bd4af',
                name: 'voe2y239j5veghsz4pcub28wewwnca7h7k5opt22w9z2ijm3pva9ibdxks4a83dnwldtez0l1v2pxor6ox2dj43mttmpzn4me2gndckq0gb0lonitaixxl138lqm0o9avucjdknhnowg0u3y4j4g8of8s1roh8q5qwopfuz8wwdzs33z6wc1xpqpkokaxq7mu6bmvhy2fx8uedk36tl97gjkyr073tof0fhbew1o3928mqpck20fdteb4sp68el',
                pathname: '6p80um61g9xruedch91o6wtf6h2xhcme36uy7ta4vyy4c0so6k67r0od95zzx975lft4bnb93h80jaz2fjub417yvv4a5w0k0s3rwggef3qv0qetwcruj4yart0z7v0o32bmwre97fau8ai6ez0y91z5z6q3x4kd5xsb2h1rbip6oq67ammn2n6n0vuct4u7yzvyigoclobs6abe64kb6gjyv78czz6jvb7a4cin54nvzan54t8mipic0yizydvtxzp0sqmfp17wa615cb7u43yhtag8d5jvvjl2ykhjpnu36ncpmq0ku7aqcw6cvpkqsuchfwn4z9xb6hg0wfebxmia3j133thgkyejt4we7nil88f9j4g057o98fpy65ibn14uqww10gidxvmk2g48x51t8c5ayz6k5or0ej0govfxtye0ezoh4c4x2ju7ltk5h81e8ev1qpi93jbc0718wlo5e5mnmjao2si3sgwsywl14oh8jnpkq2f6ak3wolc2pmp1e263o3nq4sp8jwjms8y2kilrbs8f7c3xe5jimcwsu6gibfe1brumkyjo9rw0mn30vvhekac5lra5hsnbe0knwgfk9v9ubttiqnzuxzr4187uwjtkx8xwamz7x7xwqgamnkv2h35mviz4uqvfj9k655wqlqd36krnb7og0pyhdh490nsbd43bxidtlt976no3c1s5djrv0jlsfgtmxwga0cbx0kjcefyasyegr22oa3wrz4q8lon5w264r8j0ihg4lobpoptj609iqczobpvthrhu6xel35b8mnf7hva0o7nf6gte97xh0xo296r81s26hmqr8e7j264t0arvix6bhf4zxdlqogzjrrlrnockc0lrmt5jubhfph5mjgdzejxr7sw92slbu134yli12q7ftql4op33vxshk74x3wvwfdljnyt9pi9yec0brvfszyb84dv2pcvpw0lh4i2i2nym5dk9r4trd9gkuyum9ro0r1c1ufrx1kun1cxvc5sj',
                filename: 'ts0caab3jpy29jxodq0mmrmi8xllt3fzici3jurgtumn18wmzbib6k0fr6c7r5zxw1xp39edwxcs3etwq5c0hw47r5cinue9p22i3rpvnzbwc0yzlqudioy10j8ua04usp4rgzzjreimhptbxw2l6ljnwvamv6xwervxbool7agx2hjvkh8m1q1n7i72gdtkcjdx1ckaa8yx80ckftlo46we0lz4u0rms31f168u32gu6427s7qv6bxkxjv8dz5',
                mime: 'ik8yd3v1kxepxb0f51fv0lmimewv8z2ssqpo8n2nekuqn330bf',
                extension: 'mqo6zx386ilvcseynqbwv192buz6syg014w9iefuy3uth6d3h5',
                size: 7711285253,
                width: 707681,
                height: 685148,
                data: {"foo":56680,"bar":20033,"bike":87670,"a":"YCa/n(HN#h","b":"(Xe{L=BVb`","name":48530,"prop":"A\\oh@&T4LK"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5103055f-1647-46d3-9beb-6cc644efa317',
                name: 'e7ja2jt88u4lywipmt5tictwvcwd7ggqpkfub4upaj93a1ic3ci9ip939pgk6358ft2gsk2ns8kxv8qqw3cysi5t8baskn2xrdquxb6zmvkj0bb4865vbnqce3j8t2go4ru9v5v2if9lvt0dvm2mmwa1q7l1k6wn46eeaqy04ozoim2xcntyed7aksmjmnz5spiwx8gna5mms1tsbnkgkpriap9qglmo24vm7vwchz5qusrs5tt22erg0cfyth7',
                pathname: 'nq7tixq2ikrim5k874gij6xckxklevg09lir9n13ae6ha6f41qx9puhh27ejnmhsvhgok5jtzvxh9qyadm11d0lxbatikl4u56msib2hlymhfacjfdm1dxaucxm7qyovpzlgw9urh08a1w31by1x87y0jft57y1vd8eitbaotini8zqx00ul8nyua1ljdyz5bfz04ziyrhaokgk8gyrhpflz4rv16vx7qitqpi1vf207fh7h1rxlyscvyt7cgpyk5cva0ddgonik0u75xz1yt3lwpfm4fl47wh5reetpdvgcvrllhkxlwl8o4fothp26zc8vanm2c10kqarhndowejwbaea9yqpkbkwab0ioxse23hzapqzgwvfrhooiqklpvyxv0nwg31e88yo1e8buxr5g2feikb766tymrusuo7j7idf65dab1shdoqo1tc5fesdhh0evdu2s9j4bum9njrw28stg1xav7kms9ubmkmxjmcve019wkxcstey58de5cu040h9mskraz983rc53qebuycrwpx5bx4xle9xl8gxk0dvkjv66bac6h7ex34ve4297afod2stbketd7izlus0q918vouzahh994tgc6n1zkjkpmteqzrv3h7u85qofthqt0t8a32bf609mv2p2q398i72s21k3xrf04nt8dol9czmvuc9538hrh35vnwos3jzff2rmz9ncly4xct4m44w86r4xlgwct4y9xj363y4bu2kqjgb3ejoo62kwgur723itkx80fv295i04lglke5udd0ccxr1dm6ygttxc5uq4xt09ny2gcznnrt07kg69cs72tm0xn1hmt3xenl7jof29r055utdpaqcnmj0xmg6p33r9bc5waayxi74u4ubni6gjqokzflfkd63cky2oep2zjut78s5bq8pqroseu5ttu9xi4rz1rqbbp8rxeochvyxuu0q701vbd5n66aqgea6xcq2jt4grme91rc6bfn1hro0l1mwuyjro1pkkgepr',
                filename: '7nctjynsy1zo5hcfxah8ut9fmnrg8fyn2wrp1ex6ujoiyi33bnl9p4vqtas4htp8p2g4jcjtwhea23ydvb8qiv36rh7sz33ffwn3ons5xrifyvu7ye2r3lgbum9m55tl7nicpobc24ze7a1iok98lha52upnusc2i41k1sbsh315icswmnn7rudkp5kc9a6bm0m1i3q2u4pr5jyiukyhy9h6zo3eeaohtvm3dqxlabsrrshu65wd7rkrdomqna0',
                url: '8djm7m5j2qn8m3wf2bxkwuiqck1x6qan9q8a1gwf7m9fcc1uo3fxqjrtll6s2l3xnns28v5q8bdtfs7nl0gdo8yykzux6spv6er2uf3j75we7ftwhozmihwu9xmoh2yvl87qyf1r8xrra2s2uzord3oeeu2munq7a27rfqw2nkfjjqqpmhq7ce919ekhlayhvkaetl49jg3a070zswjg4ae5b5czb666j44lsb8rk1rh4gj5f5iys7tq39ro8ljpk7excvp3drqz9vsbke0rqfgb163fgrwdkqswgucplinq6oc1m4zviwgg8bjr3dew8cwtae669cuneelpolufo216evl8fr5v0f18ulzo4q6hsyemqweoc73c6ktvaqtmjpx7qm8ne5ymqk29vh3ylm1ed2sojkidckrv9zcw061xm77a19zcwff688z4aafvqio7xh8wdm8unnczwlnih9bcz0unhtx0v9tli9n0kjhplwqd9ifnv7oah9l46f6z62467g1qoy0zzoj3pcb0zulcw8hgp4oqfuu2g3be04tdiyzz7mr12a00d5t2zs2tl2zkp6vt3rlsbuxz2fvicajt5p4b4mxkwh3m4rkhhhlibhtzaw8z0y4rpjzb8t0gn2102fs1phxdtaki5a6hfdw02xmcx6x4yof2uto26domqjq2ythhmy4rjvqlmwetdhuf2ianhuj0eyoox5cqysdpqev2w8iqg4wsj8ey9ior1c4f2l54q8j5c9gp9pd2ycvjptwy0e94djm2rjwyrwzf1wiu71l5qjiqn4yzdje900e7floxjng53vjvz81kwwhj2z0whwin7lo3rd594w654w4rxjshlezmwr71404an226oa9aqahe86gw8t80to6q2tqoze1z3i34oc2cdn7nxhluaqfp56nbhl8c44j4cme1egu1coy4xpuuuppk5il9m3wuz0qfrluqel47jikik98ecgety18y8a9giz3i8utvi0hvsiy97stqznih',
                extension: 'v0y5mxlxlfeft94sia1npt1sj2e4uwlwzcqxjmsx95x219f1pk',
                size: 4647017220,
                width: 931325,
                height: 396955,
                data: {"foo":24480,"bar":14895,"bike":9721,"a":"\"4\\0w2*XS}","b":"lQweiodqNN","name":"6=,UVV|$O1","prop":"k\"mVkl=&w8"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '748e61cd-f9a7-411d-9303-f04cf073096d',
                name: '87s23awrgvk5q1vbdf80bsc0exlgmzukwsbpjn98uosb40vbxuyqxtcv2aut3vag2gz8ua9qwna8j3oe1yeg97oymxxh2np5v7v1899y6pan691bqywdt6leyu40rg1472vxr1kky131i2ufd2e3842z06cdnctlganfqo58z28gxh0cjp8x8cmsp2a8ka8qfwpv5vfg4pn3vdcidbs5vokq5hh1bsrmg2ee6egp84uqdvicvdg3v3felpnh7c5',
                pathname: 'bm4f8t629np8n2luof4761i02kgcwj5urku0fzvya19dq61thl1wqupnvxer933ylh8j71obxvhg4cwlvcb70og39s4a85eu5o119xhjcqmf2tpktup7vq8qsshy6m8b13hm47nk5ouss8xps5f6v3f0mrve09tapp2c7gllq6tptytx75ljq4785hi4veunpjtwe9dvz479ehpnt7wur7a3nmjlxzwt8iu369deb93h22huh38gi6l5mrgkaup2bb3pkzszpb0my7nsm10t4z26uoldr6ynscm8nwcpusopsziobgqlj9qy4me7n300i0at9av4jheo8btbz4r151a10ywgfeg7ruk6v5ncx0ixyd66hlpssd3ojieormuka90wiev7ifunt13k8u17d60d0hc4nw7yb8uqm0dojgv2pje4sbe7kmfgc7q0kr54m2kxe5ejdpythx6ams8q2ue1rd86kpgvn5uksbkkl1hit2fyykexgj3nttet7lsh0el28l425zh2sv92rmtw6wuiqj08h2hwztki76w2nebv7jnk2b7zpccaeizajycnu9mhmppphwzm7ssfegxdj97pksag0l21h0fcnkomps6d8ix0ltaj5gjiizlk06bfw8iozuf4nz5dc826smlft5wt3jb4w2a2kh430b0erhzt06hu2prk08cq615u07nfqolnd4rjb1qtkhgrfaogbwitkboiaz7fmwsea47xiihzj70n1yuuqrthrnciufttseiwy7wtug31wodhfhm5ypyiwnp7d0dxplekto440g1xmkscmfq8ko5x2ib557bxrq61ihcfh3anpbm3xo62mv59au22lcf8nv5s4ddxrzfhhz5ydgbyj8tfks13caz45tah07oikmb7fl7i33djljm2vwxyv06f2rnqe0ji0maxkegk4063ut61o0xf3q9ubnrzgnrpgvpvv26xdqhhj53731oov0pl8hvxwmrabrxi671pgzmulqk4xzx1c3ri',
                filename: '2l3o9vk4gwcc33yfm3g8kj1tpwucux9nk4fbfzk5x5yuszca1wylu9et0f80wob2q8mk3v8g01as01nef5zy4nu9bjfq14zrnvuemvdupuv1ajmdv0zix4lr4mdxoxuv4zqh6jv4xlel82382tfpcsafuya0wwwpoqkontj4n52eveqna8bg7wc2zyldi4zrwbzq1rs3lqpeikmn6uqvizuxiokcfah4pksmpyuhgts676z45tqc4k8ugrq5tw2',
                url: 'ebwqlu9elecpaat4f08g0f48sc5l2hs3gth65gtxkzu6jf1eczrx7k8akblz8s16a7eqlw54qc7t52ls6b0sb7pkhebjn54hnpzxvys8bl0bo7mm4gre5oahw5j3n626x1a6i6nuxccfvw2schz8922gchgrm7oce2zv52xogb5nuv2s3774v4cbz1det2yencef98tt6h57yb12vn4ioiigcjcb2c99p2ri7lrp0k8j2y1q6jwdia14srx98jtf9nvzk9whdgw60rgt7dji4537zhuulhpznhgqv59ok00nptwi8649ipl6fyqbl5mlwdaliaa17yn7evfpdzpq172wzkhijr31hcjb5hr4p2i5htviux9c4zayett8mtdsi9n23xrmaybsloo0ropmy21d0q94hcsy0jkdrab26fduif7jdxt8mgr1ufady8ttuq0dxaund5ejgzcl2a86uaa53s6klwf3xht8pdazm43nzkbjltw6sptfkrulww4bul8tfb62opx43mjiv35uneqrswni8j5debscx6rcfgyfyzz2ovje7l8uvvveae081m73rwyemon4cchumgn6u7x2ur69y9e977qt6swytai65apwjr77llqx8bs407qxbohp04a0b32jfz628movemps63da6dshikspi3ecjdpzh7fed2p36cdllsom4sx878v2raplzlciecne564tx8ry8i53pumezqekgvntyb4evwb5te0ilxbo92j7ur30984u8ga6jnv3mb8gbvllkwnekrm02lz0wggh6z5m3vm5fautbzuxoq7jbmt5k5hk6firx30s0mvfgwlee5dbs055vxemrcf84b8hlcd8syu5i9z6xup4fxob7pt56g9qt0r9fb7sosxmzscdsngqe5o7aaebfvmcnsrmv014ql92wrx9k6fdewflmdl6utfuqgoe7g1sg75dx6xria58y8axxdtihuadbc9t8vfupk1j5weqlt621itdy8qlcgqx',
                mime: '4a7sgzqwbfg595duoenlavnlltfem1ggbqc7oscishp2jof8wo',
                extension: 'z4xekkla5ajm4gcu2uwt3zlapohgjpixqnm1fssw6n3ydr3bxd',
                width: 806661,
                height: 105231,
                data: {"foo":69847,"bar":71572,"bike":"zl([5>0jST","a":"i)e\"#9#@|^","b":6864,"name":"{rq4q&5gZt","prop":"O6=A1t\\M5-"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4rvusaqd13y04kzt0v06s304clhg7y5z1pdh7',
                name: 'ekuwvax7sh8ftcibdemk9p60zb11c5wrcbvutdfxzf1clsdlie51xkqbbzo8fkye9ugzqir8bitt5z9ml3dp9u9was3arrg4lta3u28k2ll3oao8m1vz77kmls45wsassxeyf50gfxz78z4xdr6u0hzpzkcq7tvqbzwks166l1ck3pfmlel66qs32358a1samc5h9b63a1uaqsjgw2dh0tg085p3uk55y1h7fsqrlx2x3fnqqf4rfzxegxk1l0t',
                pathname: 'q4yepp12vkyo67vvetpq5h0ievkqzx9c4lffj9da9njs111jdoiyclvf8t6o5217wjbbkcziy0lqjp0c4cghnxlroa5ztq56ttke5tzpkl5ioc3rb9b6vqka61h07fvwlvmbw81xd727led8etocj8tf11wf2l5wj2wd9swmpa8fixzil8xfuhjslzu28qg0yznqny1psykl6f115v1ctdrxc433j2yt1jh0zasc1llx3vc4e1xv3dcsbknfrynxfn09vwenc8hg96rtfhp69ruuvzn4sbbhwj7nrzpyghp1xcdp813uksjyfhqkczmgpieqd3whb9vg0r66q9tlsf06iw4rv7qjvcn84waz6aq96cjmz1o5c6noydmwzx9kjwel595srhpt8ub34ixdcgikwudyw8nnvfrfkrzfkj1zhko1rjvxs04l8iv7heepge2dkhpxc9pojjup4b1sxzf645txklvo67sclscc9lzemnpcazdm6da4r0wz03odfv17yuifu5oh8zjsknscivunuo2har2yp1hwzjgw5fbe1c8d5o6zdz3xut48jg3sn2lzw410ovwpjks4iszi7vbj1fxv00qjt0ywhdbuxgm0pws04cq2qimbxhqdh30t8yctzdsgqq9n8nyay9e8svg44potrek2cqa652x3y83o7x9kf05sj5iyin7aepxqkntnvp0oxepkwlldefc3zr1e9k5o2v82rxvm3bxjlcqdbgpx7lh2vv9ey3y2nv4v4is0s0ib6hzia649konycpb2i5rl34nnw563arikx8us7zja4x73opohq1dxqcfyd34ve4iwz5uf0owjtepbl6lu5ww57l23ztlfkjyy2uj5bas5fr34v1oqodsvrqbfsb3zgcqyswklhncn3c0cbzan1r5d5eqi3izymlwqjbqktldisk30sc0dno044ic9xb1cb530s9lzieo89c5zo06wfdhwqrv1y6zflxv1t8vfszlyewojma2bcj7tt6cf',
                filename: '5urehi1xineoy7oc0h9e3qmqshcm7s5d993rsnckyysi9id3z7qzdmqrl06574p1ecy61pleixsvmc1vl2hojf8jv1jvigm5k458fmrpr93062y09r6jnawjkn8gu6v5hm4t7f6g3t9ayuua0v2nagubmoy7s1euaruml9g4aoczdztv6batiktytt0kig9tprtwynto22d5s12labg7cdcs1j1256d22youohacp25h7nx16fv00pzkypqv8bs',
                url: 'czgew6pb4y0ce1qnex8650gzg4o2zi65h5s2xre1gh31h46hgiogej499fx4qrfyihaby1qqwtanursp08fsomjnyql8i9xmuok2vffu460jtc294jnpvskouz7x18u2szsxpl9e9gbluebskghq4qctopmj36fivp9djhdgpn2pjgyg2axh5to7gyq5gi6yfq7enrd6dd7f5qubknxfw6nokeic48w7jysa1qucg0lzx3y45ywvwnyafalpako9vv071pms31vvbgb7g4ip0xlazubuc2pa580cfk8fefqv8dve5vpxcfccf5uz7i7ic1idesjow169fivnqo9b06a3zpwvluizc4tc5v3z41entjrdxysc8a648knpxo8wie2pow9ep52yjkj4akn7syy4geu2ltujxxeiqfkwf571pmnrixnyfquaqiuja7gor57xv0xfxwm5gpqc3dxq17fj0n3x596vva400z6mt0hpj5zlxjyzxtnbkoc8rxb1t7mioblumvac7xh8mjflmrdbmyahbfbjjsb9079o5kzg7ldcozymg58f8uia9z1t21t0uh24x0qqt7hfl64jjndfa2zg1ghj1tsa149ptc4iof6yfgoq2u64cdif2c0xqst1kn2te25mqafcxxpoi5rya3u9hfa2rc2usha5dyet0bg99refesxhwv5hztgc4eygop27xbczmtc390oqrn2y14j8g8g38qe8qxg3ucscx1ja3eae4ggys762vwzms99eof68w5beklpvb44gmh7mpjeua1yp88ca0bn5ru8ido3wg9pjsarc446enmhbfy8n97nvok7mjhf93ivmyu8pl88fphj9imd7guzud9ej95fr7rhdxhwovqhkohhvcomn69m87qkpc4pifcbptxft56ay4hdbvagqfvtj36myqfddblur4808enh4o4k3bg1zunzuz2kuod1zozk7z0oks151u9o876gi5wonltgoj249397fe4e2d9ytl3kx',
                mime: 'fc14hll2hnf31whpz04xqwa2q34u7f255ltavj57kfyccjb13g',
                extension: 'oxt4si7f5rhzb54tp4rpuzhcygiy846fkfl0diung0gnnzrg7m',
                size: 4876816254,
                width: 279931,
                height: 843073,
                data: {"foo":"ynZ9Yv+CG$","bar":16112,"bike":19922,"a":61260,"b":"9opQJ/=^E3","name":33116,"prop":36348},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ca68907e-3353-4e17-83d3-24942bc5605f',
                name: 'wodgnm47nd1sqrf6817zskv90yk09gt5lqslkatkwy0l57kz1ha4w7r1ombzvi8qlz9ccsz84mt0jvs4bsud7sl3s8l9qramqg9mspo9mxr1hycrsvt7w67u82ac5px45728s1km5tt2d04n7f6mccp0q4xibhjuo4xyhpjj6pn2tu9oh7gkg0bj1k6u735wujvwebqxgw068q4ps5dy1x3fele4gswpj0s9kogyx3zwy2wzbid5iblyws0simxv',
                pathname: '7uc6gsx56qv3egr8wmpxradh1tqfu73sbtigwr3it4bbvxcx3p63qn6pi45hvb4mjo8uso3mx5xp80c2334xkxd5m1ovdqiz3ijon9sz9bj873jhwtezqn1ilsrpzl5cpgejq9cknk1a0uuy0lcuvkkq84k3hvojh37ovdanjvqc5oaewmyyux1vpvf3mzc9u4a7ykkoxxcxh8g6lxngh3yz6g7ddwube6j5damy0n9nwjhh00uirin9bi0wjsmnq1ptnoc2zv58nmyvpb2euj7o4oclhjtzovsnes0tz1q4qrgvvknmwojiouz75rgf9paxv8ywlrtthv44v2n75ewjmzci1duh4tdz5mmjmd2rlsr6xv3q35ikzvtre7ys0c2ebil3fvt24zdlneuywslvcycjiu5nkq7690ir0q5hu13wbkcrf6srt70c0rpuvulugf4sg15f0i6ig4cp3tv3zdvr6l6ut5s83necrlueu7g25y3kmtwrrwckmuqh6nk8itggd7x6v4do0qu4ekr8n5cj8pd4kaikt4lzrxs3t04gg35xypswojlkeqnxzzdssvwxuflle3kbz779hvl3pzd37gxyvbkzoqe9enqmgrkzokmm9uxf168jaxwiv50so9u4et11pllgmjqn9qwbu7q3y2s9i4l3cpbzk1mt6wpvgwnxe67bjx78kaiqpk1ld8om02hdm4wkq5p793thcfmfwc5lmbs7m39mhg24cxao37aynu09pz9qv9phg2zer1s7yb1wxoltvh2xqapflv7y6i34cwiahf31te8uqk72wu0vfpwy8dpko9aiwun9i6m3twu719xivxg7y10rxlugqjpec4lqtuywrrxcc2cjrx15327u9dyrp18h81jt8vn26eb3gqyiycx6utrq61dv5byf9i058u2u9gfjn2m3al42m90z8iti4u1g2gfywspgop02vpdq4r381cnwwl58gka14l5ehp6yv6g9etzgobncie7pulvzgw5s',
                filename: 'gofun6dffm8hsyjrpeq7vtxsv5fgt86c884ym1afifz22fvazsr4mcd96oymrazxbc0fi15oh40gykanbrreg5i6hi6s8lukqoco4ulu4cpslz506gfv8nke07u5q6jy1zshn5qszes3uoktl1dygy1fokokrtj48vfav49oexq4yq1uchivnpmw4dvw9wo5jiqrbfzf8vfbgz3x413xpp0bllorllimv0s4bzznyzjfkx7imupzgrq6cb0v3j1',
                url: 'u0ntkrf7pa8tis12vianat8ljsepy56xcvpsqrdmp1s9mt3z8rws8y8rbz0opyths4i24k11xfsr7e61rq9tlx461qh75i2lxar4vh1vdyfdbx7z5a7rkado94qm6tc1t424nl3k84brk07ep2v5ngnfsgftkj5p6v11yxyt4n830rjc8z9843w8u65hf62vtonrdoz2c1lk0xa6bwua4l7gkaisjbhm4g52er1ohts082sxc5yc3frgomibnpfm77etba1qehl9t5kdpet0kb3g4ji8agskraive386dyiytjykv7dczxpvn2te4d3u7io92m1luzuw9zkbyt7ihkxk6wqvwnysln50z7sqenxxhc741pricyzs5trbs1q2kc443iazitdzlepotvqmdldx2zohka37mt5tosf1cp2b7jtbw8zgy840kclj0m6najuekczqzvdroesoo38t00ld7nvarp49lj4kbkn3pbn96twm5vnglf6ncj2rd70xzys5osv468tvygot1qmgyj1lm2de42ltm9kad85j5zcz3o7yhapi6p7u82pdkrb0a48iy3jk3cp8uipwy6usqcoqnp0rw3lj0purb4o93rqhk2hi5rlzgoukgn3673hznqebrcf7ehv8dbhu64fd9w9a4s1b13x3bbyysc147mf2hgn3s9jnvucinu5qux6fuyeahjai8ucavbvzcebj5rgfimlpsy0gnid0fzgswpfx2ozjqjg8ymyefgz8zuyakwx4j4y8vkzo6v8ubwb4p99hho5bvu20sni253w54o41owb3h0ox4fmh6s7y7wvugqxg9v2o3hmjupbdsnrumtfype1b4xszy21s0nczjw3u2pf81c5ymovdx3usnucublwp7ap2utgootimwkievbwj0scvrwnejqhoun30vsq9c5yvgm81rdd2lk2vgwhpdynur4t2pnyswn08xy1iqpffz9knqe36hgkzw6l54hoby9xd33gdhopsb549c84w',
                mime: 'r4ko3dtufk5iwluzmskbhas96xof9w938v3apyxcshp9hukww0',
                extension: 'w7f2wa0uirityrwyma14vg04f4gl0j17ql546b1zxog04ap6n6',
                size: 8367136807,
                width: 171442,
                height: 737929,
                data: {"foo":"V{\"5J[@sw\\","bar":"Qb[{b9|edC","bike":86603,"a":"@Bf[JRS&`O","b":16295,"name":"@AOA9:+1^W","prop":"wQ;nM0v}JW"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b02545ca-38ce-4d93-90fa-6419cf0904d7',
                name: 'fpzbbfdtb0g7j6ejl8pf3tbgtyt4qn4adl8k2r9awisira06pxgzenfxkq7patt37yydbpkal9uoi386snbunxjsbh18gv4remunvn0mlq5f7s3nlqbymvtnx3k4d36bid53doca8sduwdfwqp5q8kdg576abo4y58dymjljzwp1gwchlw7fhc2zmglu0pawmxblmgxsyzwnchrlfyk7j2aynjv7oowkkmq8on8xe8sii8rcybn1ebj7n7avze6',
                pathname: 'vku9v5axbg1dj6xa4ilbo5eqdg5euxzh8vt4lz7f9aonkov5xa59wnrlvfnxt2k75xvq09iwk1ukufsvhd3r0dkndtv2xmi7wyrkmy12ju5jd57qz5hd1n2n7g4qmvjg2idru173unxfvg5bhhj8wtgvclad91bladhgeutfwkg0rsnyqo2rq2zcb7gt192n97szf3lyiuv9czobsk68c1jwfm0a9noqbf1r3dcz2hy5w9j94g13u943yf0mfnvshm7lm5fkjy2rbsxe3x72advu46u7n2b8le7jcq7a04fmte1zkl7antk7mn4w2aa9rtd0hdqlwsyhr3uy34l2crxewalfgvqre6n8vyglr975ij3hgow12z9wdgyx3n84m03mzwaigh9dbgctcyo7jr72bnz1i08afwo5r88r5t6en6pmyov7etu942ce0m7rpzonkbkzkmnztcd36rrw6sxijh32l0x0fjwhj1yheb3ixh1pa6uwqorq0wqg4juz7hmmdgo6dnb2i7awyact52pobkdicwytfu292qzsobu8j1tpu8ophlwetiensx3733fp6nkkr2fol2p28o58yp84irs7u3zed01021hpxfpkt8jqrtbwcqn0irvg5vquekxwe0jur15k6khsuje0ros1jemkoequnw5nbglggbnqs9783ef9ss97ejhbqd3yf7hfdratrnj8hpwpueamzoc0gt003x1bpzizqbp8on7fxm03tp0lhuwhdjymv3f6r5y4gea744o3z3ygikx9sb20mprqhmjxcpugd91v254rlzcjez5y342zdoc2cjvwfowk16l00i8fdqmwoanckt433uk2vjdddh2fujk0bygpeprw4ioh0zvmw0ok9tt9z4kmahx6kyl6gs93l2gc3d2sqwysk44fy9pil4ceenwctb9f28gn8e50lrkyh39ssi90kxphv8wprbmo45qnkcec2khl111qjrjjicg3bun9sv1jlc40e9s5ep8a1sb4h',
                filename: 'jkl6qn78m5oh4dowrpte1piq5fbhzdz206ofd1iyb94iv4yd9u7j2gvwvyplh35qq9mie5yub0pf6xssrlahcwhdcnvooiz4wxqf1b9dqfj3t4vrsbge64nk9i8lt7n1zztacpymo04p3mu0lkawht79ce9lm3tmw8yritz3daqb63uju7twgjmdhr2dxi315cs3z01jghj8kmhpwzn018fwt197xa91nayiucscxcezxwmsj496nsve8a83na4',
                url: 'w0gv83hajetchjywultvwpfgrkfww9ja1s656vtfkf8o0c36eu3fpnzenezqp3scy9uza7qaify4c347ajjt65wu1uq0mjok9mbv73ylf3l1x651o1yb0g09vhbussin2epjo87o5e97bsv56bukixf00k63rlfj6llxj6h6ag4f1fvemi1xoweborej6l6wr7b6fsj9w6k77ooxb5xmqdsb7o15ic0ea6rvmygx2oqyo150jdrawyoupgwtkrtnx6qjwz1wguy50s125sprwn1hff7s98j5dupaf1f16emlsonezgl3nbzsrnmly6p7jmdgkm727fjn25tzj5u7qw1rakkh0uvav3slzrnbpqynlp0cahjjgrcfw4isek5xd4cuuxehw97ednxrotx76do9f9dbunenu9kl0m3isarozld95iiflt4oq4e3r0gl1r5lgucw2tijuh20guh1qi9c4lfhl7vcpnktfvnno0uy0mwpzwbz06aavzyga42nog8zhddcjejzqzdvqahtbrpbkdr9zzetq38mqq1o6jhvt9iy5ggucrdn8v4bvojcc478dnjg436hnniy5kbltl52xp0vdyyzvihd0f1su10e44rqu2toidbz0ar0vwv2enadpyhtfx8ptet29w05etbtomovshh3yblbu79z46yzohe7u5nliqhwwgue5fz5xsyj6thb3f462xihpnjsfcjvi7t4e1bbdcw4gtnq6iumls8b04ewkpgnawbucd66elxklbnk5fbhuijeid116wb25fsei48t0m7xhj83w556oaqs4s4l34ymmsc20j9po4i2euov4xp7xlgfw4qz68j79ckdwiz0wpu1a84vm8id1bm9yviirhqoyl9w7offo9wyusjitiewwbxvzdl36hgi73ckyvrbyn5g31ar6t4os7p6rz26z6qpcuift3ew16zujerlfhr1r1hxlwkfuvj5zk3by0suykxbc0eldfl468e9nlmd3s9wiyie34hy',
                mime: 'feqwwpwkw0uds7evgg8so42esjuak3wr693kknwryh1b2earwf',
                extension: 'pnvymlxyw2cbh8r6h86l2l3qg0xvbtl1b8z644uitmoldos1hs',
                size: 3061969216,
                width: 981579,
                height: 760376,
                data: {"foo":"S[*!`Zo\\A`","bar":2180,"bike":"vdzI7Us*D>","a":71029,"b":"l44zV6C<?u","name":92377,"prop":78895},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd7e952cf-c477-45d2-b538-8efb72b8a536',
                name: '6hom0woaynnmesz0a914qm9p6kl1kf2mohtu320grgd79ppasncbv4vflnveu56geeiwnwz1wxm5gg3eftieo8ei06lddtl20puz0321o834351tggpgtikja3mt0efotfmaqinbkddw914jhijsgrbkylpmvrljj243vck5rgdfolfg9mn3f93kskd8bay1mlw7vlrtpp537oydt7nk2mjkpjrtfrcpltg4yqy6fhbftz9ibgox88au6n0pu6o',
                pathname: '2o0olsu7hhkaffixkxf87tvtdvw07a07all8xekoiwy9i1a751t70k264zv4irazsclec96zg2l50ngy9d2nuneigrgp8xwdm78nffmay6y786oan2jq0ywxn4pu5esa62orno6bz2lwnre8xec9r26lk8a999jrpe3hq506f31xsdfnmlk15rt4q4h3jy0n9n70k2vmd89yz0muvidmkqg3zsdagirvaj6u7m13auv6e17tsfs4m8h4p0t0e26cv1pxsooyyvcyp8he9pp2577imnyk1sxjq32m42bodrzkuni6y3y4e2waahzbuozymp3wdpuzsi5ugrhog737uh92608ugrxlij9zzhgbtov8wcny5vdexbyar3websx9qfly2ool8n2x38icst7c504mcnhp7a4llyda55scu93nqb9ox1qd2vjwx9o6o9lgd922kim271r3z0oebsa7q786ldo72dtupkliwvyz1a68sljmzh71z41pnhh5u3f2kykcm0gpxkeulj6mc2e371lkup6ox135db8e86fwoyov6ogfsksd12wpjnhc2ibls7e4y3tsrwpjyiby5l6ilwd9wu4v6fphq6q9euvyru661xgk7mbks2y0yzgfe57ccewa6rsmoatuj9kuqd8fe07b0tac15q1eqtn7hg7d7h6hsn9y8t78e0xakmll98guw79m8vstw1xg9dajvruv2sxn9zm8csclslp2dnx8j2rsy1wobvih0dqxrlyu68ygap8n4a9n0igrhuiqk7d08cennftu4skgq2eplmxr1f8rvbjfrc56tatnj6ed1t65i19tukzrj7xrustjutxbsx7bw4z4ccnp4kkh9t644cxoi73n865go1dcm6tcta9k9ikhjawqpi49tb6mipgpvq7ls1xw9yybwwo4ap7296lz790e74xacko8jcoheq8lb5jtmq7pyai8qqck0f1eytlus7jq4swzaxhqiax14kdeosa0w2be7chbwg5btto',
                filename: 'h9ed8uv81kf88f2muy595ojdd3xtgsmff0josj9n8aysgbn413x5x28xnmeljlbza0s6s535hp73dowguc25r4omi3h7u6l58gnkabnud5v09rathdre8f7rgng0y1v4qhym0hkkzs17yujvkbqlyu7h55ca7efjzr7uxw71eiwfi7euwgd5m6j6br9jf0ad8duinzy1kv44nmwmyq6yzs5e00bvng3yxwjozz55c3mw8biior4yu8h1pn74ktty',
                url: 'dmjw2i50fk4tfho087v79jwnok9targsbx2k506pal6b5m7xycveb7au4w3tzzlud8rg6ase1ijnjp32gdchjk0np3cg3v6webzppezvugffttixaw6c90sm6zabmd0bmpw2orw7d248wznikhw70hf93pybc01gsvd296kaqgfvmecqb40dylw4vynmqgdbugbzcup54jz7pg5uxh7tb9qimvfuooyns70wn4hb9gwf89fovdff2y8j0b90ssqwm8emc8vjiypp7sc66i8lymdc7b48r8vszrn3f7mtq8l3mlei55e4f1xpi26eml08tite56jytvd41el6a5yz7aaf3j3mmum03xf86z4sss7y4j9cgrtbbyy4mbpl4a3rpq013mocp939ksxo28nkoty3eaacyt8t7gu5d95ztljtfvt2xqnu10fktk3sxm5tlergsct6ckr9yd1e39p62njrfnv3862qs57lx3glyf6kes4d36apxmc6rv6lmr87d1lazjihmhlun4sb7fx8hds4cj77evq1hjq7fzxdh04vf5fnwa42o2tk0tn4oal1yrl1s24iiihqtjzgvvrjmx8ud9hc4k97b469lvdsuzvemcpkv9wbkhrvfnfr5qzhneggrl92v5vnj1pjgnfcgbxz65yfkqrr0xsq4wo9v0k7p52vs1dk27571cstk8bz9h8mvex4h85myxe2l0bi64sri2cbcu66n4ucqpkxmx0az4jojy9eumi3k08wkebo7xqedr4huq06yzyv4454mxfh1kqzowwv6futpu0glosm17adionbdk7ohunt8mwzmcnktlsbtqzr02n2a5i8omunhw1knqzoacm2qwttrsmc8guc16hw85wcesjjudk9n45b97abvf2029pfcutontj0ie2vcdwu5ykke30qc63ek1tucd3h7s1526kwys5yh5yrua6nltouinxac32ehospizkbd7m25j4uupi3jlcs1kkodl1hoav26p0lkodz',
                mime: 'sb8f57nmnzligqndquh21gdcssfkb1mqdnfwgy6wxryc2jm3gx',
                extension: 'rz5xly07b5kcvzm2of00brq9qp3jf79x7v0hdli7u954dq19ol',
                size: 2250956948,
                width: 335248,
                height: 501869,
                data: {"foo":80605,"bar":87260,"bike":"ek=!I]_(7c","a":"2Z\"C+DymSZ","b":61254,"name":2266,"prop":"x=t,jP]&_]"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bad57be6-ee74-43a9-af1f-c05e7c5fd18b',
                name: 'nsqiwq1b2mtbwfgpsrwkyiwwmqiedsg8t5o6tmgj71dntisqr28cx50w60upww64fejov0dls52t2qv44xrkl8ot1eg16s997i9zgkpi05t6dbkf1ea3a7rnfa4zy8qo64ljkmb1wzq5fy5pjhzxgc79u9ptlaw90f5lx7mnro351zby4f0y5i6hccqqz2ousy2y08lyqgesc17lfvuds1r0u8ne7dv4nhp0qgl3zcbbrlljtpn4g74b089awl5',
                pathname: '0np157ulm6a1709nzmlxa0m8ctq3zahmoxhzly9gkjtcs9wbx8akt9mmpb0p68e3tkqczdsozkywg9iqhs8jp911jsw9onvc185dt5n8jfamv3nhjb36d82mogsrtsa9sa7mvsm4uuyivvd8bplxws6ews4rs0rpmvmxuf2qt9u3msdo8yx4ih4mx3266viajaykd2digdp8ov8kb3t1icx5h4ewysoi5lbbilemyyeklogw12t6uofve5q9chrhdena5deymdibcftxohms4z2mdpjiys3bnhg5824fy7n3r83xd38mrfk5ohrlwyy8n5o1x7pb8odj7139zmtju8bo3fndq6d84ka8e8e2r4bcvfxqyjx1rhcmkugijkz8m5a1fbrwm9lyo2csqpip18fhn0cm85b64mdtn7b2m6z1nqql77109p7m6bso770cqlh4qm6a8cm1rbkbl2rra130j31lnalz6cl7xh07fttnd3r6s09c24wn3796khldaztlvt9u8qme2o5n4qy9xrt0fdy8rcyt6i2gvymdyaluuo48phlytw3fmwl9sdvaxj0948r0dgzfi7mvmyul3uji3fc3wka3yey1rb6lqdquu5ed935nalm3ihxwq99vovi791yr6tttzr0o0xexyc5zal6hkeybnhz6ejo52gtw4c8etfj6h3d149v9ao7xsjc4mlshtbhgt7ks7egc9ygh75zqjkn24qbemmi94zuo0dmu7mjst3gdv5fr5loo20eyt5jaauyajhu5ivhzdlqyfkeot7ok02zax3wux7ge0y5c6tajka4h8rs7c2rlvf0l0he5vramdi2dpjip5og5j1krkrg1pyxtccs6vpy2fjo9whz9mx8dti2aem0a6cehzv89agkbmhvnzht1k7fdjdl83e9pwhsj1i2cxhgvd5x9uwb5femeo6dir6vpdz036esfb4tbewsmfz4u0ut4tqnleq52un5phnvid3heqt25s0o0kt3ws9d43pdg',
                filename: '1901x4jp1stu4pgfjs8bil8lqrhyew17qbzc6ezp65l6a1xpi6cqt5qgm2nuduf2ay58s6ms4jddi8q1wb6t49o9qy3bzq48fc4iu58wqb122xputnb03124257v790g2u5da1wwkzhccj11py28vjjnift4w5d2mh4yz3uzuptuqnoh0mioq2veohtycp5mckjsm7g4zgs83kh53q7lu2k1g2ib3rt9nlc1fpgawrfu6y9x7zdajzrxwu6f7zx',
                url: '0xn30an0fdvf6yb2nqsvgv8ti50uuof0v5gcfzcu0ob6uyrjfp2k750tb3kkkohbjqjrjfx1iv99o47967dnu07udt0rr4m317fwvrzc1jdonn6bb7k4wr87nssidd9h9dgz8ywrprhjp4fzoytrmssv62cs12hxzq4s8d2ax6iiwop5soqsveoeh5rezd3d51xazzn2u16f48elfc1xfnuo8ydf4pgk57df5arl3ctvg41h2m6fajl769mkghc578qok5b6qfacuqmaiy7uaadfndkq5bq5eucazh3qishfefsq6jp6a983d5ijf68jrsjhg3we4lk2l4t4s3egi5kyiupd7sjy67voljl81mz0hgnpttagsk43kma5uzobulr7khcxxrr4j663qlxgpcous4pyascoutgzsamfd7mibequakcy7q0k40v3y4237dqrs4ky0njcvv1r7k40xapjyl8e9n67xi9kjf2qup52nbon9zy0d3okg53n4qzn66xjvne6vjcnlyhyn2mcmofbyupn56og9gu2y83ypkvvjrpvj7bsteyl0a5wx0gbyn2gtpeqwhip8sx24lxds1uxlcayt4qurc0w53w14p4nm1u4dllktf3kfsh5j0moyu96k34j22u9bnv19zra15wa9h384jbm7jq0qov7vrxpxzdj1df1tkt1te488cilnijpka0myu6wc22s2totpvd9i2rdhug14y7jekvxg41m5b33gurdpmxqkv632wsbi6gd79ftz960fhglkf7wvk4qakt3q7vr0vasfva4ppd4feubw4951l48xazip12udwoxr8iu68r0zebpe6apwv5q534hjodoziky3rha2wpdzukxx9ldxac8cay1ymln17i8mio25p4avx09urzxj0o5ox33iki0dcp9ugtw487i917ivw0mjotzfsvm04m3q0469r2o831beav8vaabf07hi5he0uyfzj9hisj184dxc53zel2c7gxndash7gqw5',
                mime: 'nspwii3j9mtu6k6ay6yun5uai8u78sr6r6v4gi62abw67lle8u',
                extension: '10fihvp7x7aluqnj7o83wbyc804mwrxj85gaholditkaekwh15',
                size: 9511703592,
                width: 170014,
                height: 327370,
                data: {"foo":"O3,TU.>\"Bf","bar":86976,"bike":"+TeTYg,t|2","a":"$!kqL'B#^$","b":67246,"name":93367,"prop":"w3N2#1<GC."},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '005b53b0-db3b-4e02-a9cb-dd78b848788a',
                name: 'vuearea3u4yib103d5ec137oqh1mpmufnr7s3ayt8uebfr9u6j536tzw7dpl7t3wv1j0800yrwtnz04xe8wjsm6vkja8nis1fjp64npwg2pilugp3gto0z2v8d6dn9vx01wp21073grdzwmv5nnp6949uyjoz5l24b49j76wbiy9h2z4n11bpg0hbsedu17jbpsp9j2d53txxkqsbd9tyy8d8g676rbs7ptwtjvhtt6ez7cvfp2o8hkp53ksr2y',
                pathname: 'mf2xi4u7ocl8e4greepk3e8xijxpjtxku6w9i03lxbpj9mjciwiu59mky1a2evvh5ju4jds9ec4y6tz1g3nf9bswpyhkca70y2jibygpg0m59dl9h7o55kdqyh2piq0u3y4rasjk5c39sr8vylwr2t8ptiohjs1s2u3wzoqgaqtd82qp6j3bglqg0rfks8b54gtfgsk23e67u6ekykyboisqtv4rhkgy6l0fciey8wxyallsgjq9fowaclbmdjv4gziewpmd788prxw2bkrh5r9to3fbdzn93f8b5q19tcw4qigsbhllyj8l3ih41jgl00fxhtu9ulah3wzkc48ex8u3ntm9p8c3oxak0n9nh5gmzpbeelgs8qf553qx4lln7v8ebh51jiy60nljqktrtnfe9maq6wbfs1spjax0cyvovs2q5cd3esg0iu2hngj7s93e2ecb2odelfyp46b5mqyclg5h3ecty66wok7lqzw09aabmbxc5c9m335wjca3r11ksxlnp1n66vm7i2i218v8l3ng5uks62jo3952rjppprpwaedpfsozl40ru5lwj4m583bk3nj2d5slutcgbezbqr6kaug5jwhd7krd3tpc0pwb6kx9pzfnmdaqw2wh19mj8mpoopgqcmh87914iojfv781vebnvd6quumxyix0hul2w5s99kz4t0u6t7cwpojtarrbmzao1npuby4mxup3xa09bu8xvl0vtvgx3sc3crr86nlu15ap4asz36prnisn7e1lsanqkx5wubmtw88i4lxp9g1cxeob4qx85lgtbr17nr6inj0v4b3lktaiv5k03wwqdbw8di6kz54vaxjgavqew446746dxjuag3dr8oagkzfl03uj1mn8lalnqqzy002qtzjs1tfj26n6nlq1nxlah9ek2c38cek8425f316al1kbu7n21bkrdnn1xfj25ppuas432mfzf4o9471xwrbss78rw51kgrup2o0cmqwanwaemdfy0d3gdp3d',
                filename: 'sdfixxn2zq83gm4yfaxbw1a7v21ta8cwo189yph43emupui5iq8tfdhhrs8iejdvmzxi7l8p6qdao8ptidaglps8z04jow3j418m8n75i1ovexanfrjwt0v8rf6mfhqrisw4jo9kau6ityf9j5zlz18tous1nav6mry5rtzf73z1wstdaqe8twid1e01gm1ustwkrysiliif9u2ey0ysjw5lzcrhvc6oowuow86mjlrh5czkyy3fjsmydli22rg',
                url: '3qz4uf39ykk2p1d0rhybx8fe00gm82459oyha6dk8xioyn3qpy2m5j0dvae8g6rg4zwpoyunrmxjb8ihophlwna38qeycgg19psxhwuw7s4nxgdtuhy7fl4gdco3liunxpuewux8u8alj0l85qwtj3td74i580ac3y9zmov2dzq1myzvlzly889fw55fj4vk0qpgg88on9muo28r7joiheztgusfi704mdi33pfm7cpqbt1a86nrjagm8szltgid0ds8umu362rdpz51snak3kqsxjpszfu4f4d6j6kf5k9wklvnnffj7eyb69hyptv4r9sgbjgg8kv8n3bueys4wqpr5lxll7gl2ukdj9px2b3nxecif05a9mcng3tz4etp681uxgvln9xfp4rpqkbs4v840ecz86msbite76ohw03u6mgghc04d2iwpt3japfnk2484jy5zz44ry6t75501e8x54g7x8gyzje2x5f9p9twonq9skj18ahklsjp8g2qixarb2nqm7tuk9q15zonq2oiurtxaq9e3ciy48ov9den8kfjty5w8xrchsv93ziwvz4frwyzewwvot8xrw4du9jko11xhvnxzd7n17zl2ylbr0epsmw9spwww10o6qixz9qlpt1vkoywt2x8dig0tkumhr277ino2q9fy4nhqyg4dg6vh1icb4i6jj561arzo18ovg8qlnejiayqxocd2era9ayz3hkyo7kqks7a4ndgntlbfvs4r32blzum555z2m8eunolhda3v2wco4a48f2fsid04glu5e753ymhadzxwrfjiw3ar3i9afbi4j1pgjiupeh1i7lhav5k2wnqgc0mvazty1ehdrd3e10lkd8a4b2newi0pbkzypz74lavr9ghg7uifxohk7ffdy3ht5d5wbsru4vmm5yqa2jjvbzpdpjikjix9yl22ebhmihs4cj5e23hqy1mjgnum1h3aftrjhcc855naatx8kclbjel41zxlmw4h7gbwto4u2lh',
                mime: 'laeckrziotjzunc4suqrqbjhgv1jk31cnrbtjc6o4m1vgz2z47q',
                extension: 'hp572sm21s62y2bptp42u4fmh2kllpurie3csueh7cet43pveh',
                size: 5279758633,
                width: 645119,
                height: 911561,
                data: {"foo":12274,"bar":"gQ[dC7z,fT","bike":"=LM|u6bZ*v","a":92007,"b":56256,"name":">,%t-TMS]K","prop":77767},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryExtension is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b8c2c28-9678-40fe-bf5c-28c03358d088',
                name: 'snvaxi703m3sx2xuvbgnh69cx1co4ut4skpnnd1h64a7sfl5ev0zm0n6ylvy7juiami5g68sjjgeu5wtqzflpwsa4qwvbmeng4kemonk2zir2dw4bwtj9ib1sefw64gr3l45v479lcjpbn6hb31ecnjwtet1vvtjyb8mbw8a6vrf15wi63v43po5kl4zjfy5e2nz60a1yg7kzek2qqug3z8yq7o54ym34jm3g1nv2jy28a7g1mnn9th8jwsdpoe',
                pathname: 'ulx62c5b86443dagg747m8a1ln8rrj4ldzi8ydhxgo17snoe36or6mgoe7zf90hc140qce8v135un6e32899sq1j6ihgpqve9te6vzm3el94bmxme9htzcghm2aup20bf148ckwujzm0ii428u1o6mgh5rj8lug6f6fuwsisq99qwiwsb21xjtskimv93j9yn7vg62mf3007qou75jot9yho771lw2r52gf3ydzngf4259k5h8etrfim17hdhzbiygl15wyihgm4rgeqtck4jylblv2aa8dk6pts90xxtz55dszla2lyob6rq6n4y8fl7e6l7sxjs4evlx29hsnlqw0rk7razqwzaalcnexnemzuagim3r9f2e1jjobwaoxe2tcwmwx41kzbqv77hwfv0drky7skotzw0q8zubswxlk5orpuqylobo4kkw38e4w258bgar9njanvv7c5n34s2hf4b4cw4tbpwifz861etxi374ungsjonbt9thcq7o5s9utxg5auleixlgqs3pyis5wscnq2vhheezvjmbsb9sogndmiq6hgdbajs2s36nwhp84vgcvz3dibhfr1w5mmz73dhqj0dtqk7355eh3us79z4jbq792b4qtbeq4mdihkow5ans1y1wdag52hklhtptpdlcrr9p5lqbr21dpxnsv8czj9quc8zmrbyknwaz14f7hsy9j6bl1tlhm65gsk5cbf2h9g1gohpmmoal76ha7qxkg7py1a23u1l5f3rwfn0smz8r8hvljkxgw4hhbqqepi7y8p0xvcglcshzzs6jue0s2d4oz6murwcvzbjl56en5y2gvxcbblnthk7r7rl7xtmufm1mq3u1z6gitw3f5j1u6wgmup1gqms5z0jbrtzyfe5vbkxgxcqn4qtz6z34u1ig2q1xvtrpxq2ms6ygvznd8772y4z421bvcmp7dig4jz837mjkxl9alrwxu9q4pwi91aduf34pn20qvpwnba6b5a3mx2hsqpgqrl1ilr',
                filename: 'tbqmp9hqtr4ne937jvhip5s9rm26d4yu7l6hrcb7maoirtk1njgmsc9tvmg1kvsqcwft7243fib99iuk4ef37yuolp7dkkzgzgppjeejv8pqla6x5rtdpxj7p3mf6wewpjoonvvpxnc4z6bnbo789gmspybhpwxx6gt7ojc0i232tbmwnhk325rniwbwgggnhk9fvqndlt6xff223oh0rdy67j30vg0egyj8dowa0048qk6sldyed7008r3f9bt',
                url: 'blhy5ktwbg3v0s3gj55lf5siozkbxlpxmyqvy2lh8q1t6lk51zwoy5mzhlaun7x0cf5lei68dc6xqftek39k0ry8optfwho3l981cgprg5o6wg2ndrvhvfl689ez5ukdgtj921hv9lgwaqmjgsc1ap0klza3zphomjc6c624fkhauxlimhkx6j12vr76p4trz2c23bwt1ol1fdrnll63ucn1zkbnsei7m0roy7209ub57czrel5dlwllo7pi2l3bgslshugknqvf93gwylvc2acoju6d9tjlwlii9q6erbhv1qqflksfhtc1ehuio37v3y27yib4j6oc5gdv4q0uwrhasrxy1r75c5afiyoksiydqo678c7b983eigwfe8gop237ryj2kvtxlyrvp8bqydmmbwvjuo82flyo6n0kvtmyiwyp6sogsqp0e4kjg9or2werk356le7zyi1eigu4tkje1u8lj4n4npfai70wzhrggxjels8j8oubxat9q96ugk4sd38dbyi6ez07fcxjtbb0k6nve97gfleqxp7uxwf7sbdjo68bxu0t7tqkmndnnuof3kkrdk0q0rm5vff3zxh4kghoe133fwfslsszj6dkhpry41qd3iykxa0nb9l90m49xvdfxudobfxg16lu3t1ru6wjiplg02oexwl7ugz2xit1payaa8syabwnu88di3cituqne7a7hs7n2omp4ix5ik2y7pemehe0ly6lzwgbq9270p4ityp3hn74s0oouxwfnvqkhgx6torfn8mi2oc6ud9iqycdobqb1j8qi1t9fwr66f35yudcwzusnhm8shc1zvoxll56mchc84xjily1gzmiuraltys0dlql1uhrvkzsf257c7sgsfw3ylzkrte9itwz9exo5gt020cq7wgxccf2uvz2d28mbkuun4wh4jbya49i8yizrofsfmtf011vgi2ul8dqmudj2ger0d5zc6l7n8lf79gy8izezqxchg9ek48gyvjaj6t0wnss',
                mime: 'wc836ypa2edi2ib9n2b0qy8h4vgn3datu3euhaaenm1jfmgnzu',
                extension: 'knrdp8ec26oertzykwrwafrckapar9j6wwoo6nn75sdjwp2nuc8',
                size: 3690113155,
                width: 803701,
                height: 769482,
                data: {"foo":8603,"bar":2879,"bike":"KvWZWz,ml-","a":88506,"b":"2\\:[@6pr@R","name":2476,"prop":"De@zv)d,u;"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryExtension is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd2ad0f77-0648-4fe1-aa44-fa841c0c4569',
                name: 'bnqj8jwcqq5aa5k1me5q6654lo3ho93la1b4584fh66ur62zrsdp7lpbmdlyg5tyly9oh42xb9w5jivwh58yv2rw9gj4z7cokvgvx90pbb8pj98wge6xchaolxzp4lpfphy158zvha2k1kd2bdft73v3rur9gc5oazg63zmmxs2brgcsgpfzaxazdkktaywan770azytds8t5g0z823bndzj8loohzo63kfj999edv6nlrmjr9pduiqn048kuji',
                pathname: 'f4vya64p80gogs8s8s9oqhl9of2il78zry54nd6pfnrerc385cdc44euqj2pmwni7zbk8cbc5gbibdamfpj54du4old4un4srtds9cpqcjgmwslu8mb2fqlfitdycv9it57ga2kp5x7e88lotp03gnkf0k2v7u9f2nvsp1h7o3uxh9pdp1pwx3p8y73hbn7bchixgxcb82j63dm03mfwm6zee72behgq4fotjrvdr9yoclxrf4ucf6oddlp1547eo70x383tjnxur1goys9tltpn112uso6m2euu6yn91nr1qp7clmxc4q76esp0oul9qeos56mlqyg8yq58qywp5a65nu3nahhn4cf7lpfdhvefueck32cxj9dd1er45kdexipb8cn5svw4hnkd9h3uivmsjtjc07f6pfyrih6gmjh590v8l8r7a4jppaff47pj7ey2lwrw6mo40fvccscg37qh0gvq5uj13mq7yxn91j2bwbzqat28y9rbga6tm4rzpnt13m8487fsmn6adbr4v9afc169jbhwbxc0ngaaeykyvtjox6v9nxkmy91ps919qisjkovlf7dhm1cbmqs6ot91ysaj92r4yqq0xacov2gso29fmqi7553d9o29l5nmivnj2um3xrxgzmu9ngze343p4hd0dz2rsxw0i3o967sz5wmyabuzakm6v3ouuvfxoiqrtk9skwjrswakfb6m0vlt1ewgq5vxpuxkx002d6teh55v0mtc4vqn8ms3rjzdlxtm0lxgzzcrzi5cjhxou9f9jjnm4j2ucpxvn35v2k6dthfs6i4fj5kmfc90f65rn5t1k1cflrapzwpjqw1ce2w9qs6xtb3sfagdovhgvc23z448njp6lc4prwlicjplkdlakm7cr3wlj9z11dnom37rugh016xin5s8p6f8gnsllwj1ijbnymt6dfoofix2iseshr5xhy25xyzb4nwyixuv4xoryf45kc6ux4jpdpy1up3uqhmjr7vonfvkyi2r',
                filename: '7ixueil0i9xsg281hfywvvs5f4c5hlbpzlh91ggrsh7pk4mtx5frztpqejhch4u638y33mmwob7jnyl10oy21smqgk0jvftokwddzvv0l38sc5e24vdh1e4pj8hjkmyqj95u2zosavxje58z4vuj9ns3bp8gokxi6f1ho73pk333gmnn4jcja6qhhuk63o7gvgh1yvl5h13rlpvuj781r2jff8nijzcjq3pu54tjvxu7tu0dw2k5ofm2y5fivm8',
                url: 'cdpzhi9mmfviu4vncm0axxeojyni5x7we0umc2e01bicly33zj5as2nrp7cw9revdto3n6p1nypvaglxevxkwzj3jqknl9hyqmrgieadeutz59zbygo6t291nxsgco8vcqzwszjzrkikaitpr0gf11bf4566i0ehlk3s6pdv8ngilwpph21eu81o202g42coqnggmudl28c0i69ff72hltslfa9gv6c8106vzj5dblr7lw28c52q46ckqseufgoehk1w2gndehir4d0ahjefzzhk29iwvlnu5del3npxuxfwvzx9jj2908wmhul52hukmuxmdhpnlkv7ifvyrba9c661e4ow531e440l04n7m40y9jghznajafxjari82rea871zsxpcdx9rlgl4ju3764omo0yhh4ki6nlceah3oujgzw4r20yqiatuq3mswvitj2o34sy1k01tm76dk793km5y0wyurjtecityfofuehfsgq5ltu1w8snnhlol6zrm8qktrx29fdobg9t6jp9yhstskiwmkwafz1yfv5kfvio74ctk2ch3uqab7kdru4zojmspt4isxckmpgqw7mtgpx1t1easbqv5jqpe1x6kn2ar08svgsjbfmd285l2uvomgs5mbkjydj3ioo1f6jvv3r45fl95aisfx6te68vgmdc1cy1433olwoo4tonsndhusch59jpgfet563n5r6k6fcuqyeqcgd1fw4r2kt5f3ld99rw366z6om4jgyezc63j9d2xuq61ap4kc6da6ak8teqzvm3jcto5wipqr8johf8gdkmkz9zghiiaxge3yzpgapppjb8fw7tz2xgqggdzsssntv85uvd5h3grszephs12g69e2bkju8b1587rkjqdbpf75n8mxbsmd3g58mhembzqyg0xvflwck7ps7xlb3lyyn46xv4p48d1sfyq7iajhm4b8i17wy2v8gjnnvbyyb8yuk2g1ypiiyin90oxwsokrj3bst387lvn6ughmmy5',
                mime: '20y31ew3gxse4dajfyuxi2pg4uejf90x192jglz6ezxxiug425',
                extension: 'o1mggsdjf2g8pqt03vi4aym7odlxbvqp653lojfvr7gai36o5e',
                size: 56313316401,
                width: 255786,
                height: 869762,
                data: {"foo":38251,"bar":18166,"bike":39223,"a":13716,"b":47893,"name":"JNL-3i_M@d","prop":40849},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c27053bb-e8fb-4df4-9fd3-9cc588cfddc2',
                name: 'o1cxjji8rh9oqleitdyidch2puj8ql3k9cvdb41rkunoe4iciudde3nrzxah5sqgxd44vd9cm3fxw39tui9qbocr6wsq8rk1787mk4bccxznj94bf1ospvjjgp5kvbla38thlfzzlmsmsd4gxm8wokyxt8c94nllmnprdaug9450tcjpefle9xui0608apk6sjr3jnngzlz1fkevu3dsmngjlywbd240fwfbluxmeple9zj12hgkozi05tnkteq',
                pathname: '4towy3atkfiqsel2l4dcb1lrvvsmc4usyjmokt6d6tymfvvodaxpsygjcn5juzqwko6ncn41eu59bcee62e574siowl7vixvyjqotsadn35bv85z867uy072cgw3v6jkvx2wf7xf89bs3vjuc9m3v8yrm0how5kv44dzw4g7suyxv6h1d6i663oalrw37vz230e3hbbl84d95t8ce94rks5hvrodet40dbtfyvjdkuobsjsya1kp1lio7ti02oro9n21hpwkawx1xyjsp8b4baxatri6hlqcct3mmz6ygkh02tx8nvxwgnxbwklswvsubhqlhsx3s4k00u9vfdvkta7kaqlrlluz1kks4fib5dzj3sfgz0ywzllorgjpqrzyog35cqlrtp6ksntalwwho47i8d87zpc5jtncykcc4i5wjgehra3h7ntb8h4gryo4u1g6axes2a1cwsv5b6xr18mxeniy30udw68g7lwpn1c4d7nyeil4uc1yvghsxfkzwkm3s65z4ely2l2fl4ehk4z3pwycxuv1mwmywntu6mz1k0pxghhuchxazk5axwyp102ip7iksxxssxg55213vb78hrswvsmvubpf1q8se2ovj4zieaw6wkif8zyjxi7zzsx8mz1l9m3g6ju95rrzekhsu3t9yu6wlfixfy925amg2ium3wsmhx0oehq1x3ul3xve0bprhjas0aaimupzvkshvcfgnhtucb2u6azhzi7ykugs5xudq79unhdms4jo1gsdr375lxl3rafryq98fjia6ntm8e7tb2utxepn38a93cjs882u7gcsfyji6djmshmu3iawrns128ljbxe1yamegfkxh9b5sdcy46ez2sr3dwik7gnoutjx37drkvp0s89ud2k3aevigj9qkyd9h0two9flyq8kd2k0g40gukjttlbhml7z79u0qw4kte3cscbm01pixbx5tivxolczbir9r59cp9mp27imrornanc7gbljnl6hpj9bhvkbo1t3',
                filename: 'jd5xoysq0ikphtg8lbamnpqzf9iy3wqe0ui8s1onvdy50hakeye8tn4dqex4nu94jxtjbqmho07626q1asarmm7ez59wvkqa6c50704gqrx51q5i6u78tqe7399mcqs9ygxquqrpyz0d21csifw0bq8ac4h9s9gg7mwdci0w5brxskpb9im3hu3t4yuutn2lq3ovsi3es1fns7ka4i008xti76rtww6p10q8xxfofzem12gq908470mnkgpncea',
                url: 'kn6itpnu5e1mrtzo5o6ln4ehhsay2gdrco2obh70uxpzz57od7pakufwr65pmuhqm5t0zd6v6twg37kj78tne7je7sphnyb9z4nmwruougte0jmnsc8fwprsuih0415vschbdohch8cdjf4w85a1pq49ruwll6lcxio5mnbq7z6rqyvwzscpk7hx7fpm6at0f3fdamphpc4khkxijpeqdwwe5bgbor4850ghtc1iiaph7fxh68uuawoz0mj35k9rl729aszth2r60z7jr087crslo22zr4tov8m8wv48wui12k8chd4q8l01ozd6q9rzcnjqj599z6s0jl8qdbxtatxa3pmnl0blehciwx4y5qiakhl47q6afcbbnfrwpwb3kyiagq2ah5ra1dmcy6m1wq3clfv0cywxrzxyw8t75aytvl69rrnyu2tmm4v0wl8e39ai1rk007w9qbiksn4tfta9sarrhwvo9a7wkum881vh0ogqvgtwmw6rjpj5sawcmywahuu7cagq0njmhidykna4crjchqvl6ftll5dk0yuod913kxm7abeeqoylqubuqf1gpq17hrbmrlnz01j80ntaa3a87we287145y1owd67pazhdlm2eyp9xikmnag741nmg1bnvcvkm8cvs3yd5rizrtr7umbpbo0ghhymka7a6hc8jykpdqubtkht2vfmnekcd7j2rilcpolm9ekbx0nvkpgkiw7tcc5rzqziv7w3jf5mbvs93wfc2q3bif68pdln2rgru3urz68yg78nvx5jn9993q33k9e17bhb2zez3zxovg3ji1wxpruqzbckfvig8brgnowvd5k2uytsj3dz5j14k86bspl1umtb1ltzcp8kae1vlm175r6d8jxpos8q846hkqo8yha7lnnelqhfrg8j0274u2m7watfzc305g38zn95n89k3dz61t5lkass5astlig2w1xfof98te91zm4vncvxsg1o4d8ybtai2g9cayn19lcwhugzzs5m',
                mime: 'yl5t25tom7vd78e00vp6k7zfk74px15omf7orc24rz6hcvg76j',
                extension: 'd2osncw7dqeiyugo0b8ktenv97o300vry3n1f1nyelj1o8y4i6',
                size: 5900127103,
                width: 9582168,
                height: 539843,
                data: {"foo":"Z3cUXWre>M","bar":677,"bike":31839,"a":89602,"b":"5I,eepJqQ&","name":"m$f3J803q/","prop":67824},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd60c1643-1a64-4096-bebb-b62b46a990b3',
                name: '501qjgtw36yvecjxxr77xck24qqwt1spxvnhv8ivuwjbfk38z3jfzfn48ngkfkdvln7f1az0cudnzh4xuocnudtx1j9xdeuca90x0t93a7fihttujm8u1j7wv6wymctuuakkpf0xv4y0jvddho184k0p9rdmywlmleg5kyoortxq7woxrsw0rwcxu2o5u71ddv5tsbvf2j5kpmgu4ypvo0y2dwo1w88tkw7d6x6pvtzjou3v4vupbhkeg58a1a5',
                pathname: 'q6lce938prpeyc6wwqz1q7aqzpd6fsrqvyfkx0cwoh0se5y6egec10qwfx6kcpi84nrrbab0fmslyy4nfchzftdz62qeo9o7nnh2g0cng31lfu9ktxqw8yq4l11wxrfs7sphaa5tm7ize07ld7vcsdvfanorwhfys048yvs4hrwxp9js3qg97cjey4revlxspag235fw8tk148wam570x9wi9uqtr2iememdwegtnbhq42bv6cw3brti9x8hmw6palzf2zhugg5wtdfm5wffzkwulsu8e28ym8kw3kikl9368ve02s5zdye9mqd7z4ktk06bvl6922ld17um3bfe607l5og77p3dqsd9qd9btlrenrq5wik6sux6pu9uzsz102u9hxx2vy4ccc18s507pp400aci2b2tuuy7xxxkcsknzmxp9vk8wcqwrlksoyzv4knosrg7vvviw4xac78swxh3pfbivl69h6h8lgt6litehvxjeid7ukwzgvr6e4hk5eustbsb199lv8s5ge2yqu5iuruag9jz8drbwdg91c75aljbm6g3ggmt17u0k4wvje30dmb8ikl7xm1wh1lpxj8c1bhvs4dodat6nuxvurcewnydddq0lqn5pc2gfifriy1qa4dvcmgaody9t7w2tzift9phcitjrbt21m8tjhq7aodzo1btkywjwllixugr2q570mqd053z25erhke5ysdkqituspmztyftef04nx2lhghv5aovcvtkri8p2jv8p86vrr27qvctbjga7uow2lc395149k8reti65cwmolcdt7oeaqtpwmkfmezionsnowcw0ifjvarmmooswloagcrhtf7oeswuwq08prxudzct636hevu1dbmpifytdtfy9erwjhn3ckcfcclwdyrc328a9jtlx6v1f6yiy1rj84nb2ralr4p1seicoa0y0j74k5wmdj4eos0zihoqk5tc8t2m4j93f2u11okc4z7xhtmtvzgddhcf564sam5dhliy',
                filename: '1abjtelhznk33kr4p2zrz0rckregxezuel9p6h07k1rwnnsml4auz9f7stpkxkoqbuzj3hs65jmntz2p7kfkb7ec4mgleitc5stxle25c7eq5y7j12m9grws3sw4iwyl27uj9e1i9i2aqa3w1tjxs53h6upczew28ku7u8gq5nyp3nxmso9rfy1kkp4ks4zhwrbyln3omyykr53344ez96fect3fo3afhl8sghn29g0ahtfzmh04ixv0b9akfcr',
                url: '1v164ciote1hrf59t3g3sszefdd9bnzljfno562itcyiy0rilvbsxtf5qbi2u1259fvtotkq1elq7tb3mz38d8tycufiimhjtw9sbc965e52erdsdajjhlh6z77iuk3pfvbh3o0x5xf5puq201ctwieo5o686cdzzifo3jkb7nb7c60a3aplcuup87clpwq58gvvkqx6k0gxezjle9gc0oac1jvqikig98mchg9v1th02e8y3oddhhvthloy9r1yjonohtgucc3b86jyk9gl45koorry802su77esydwzh1xj8i3ioh1wd5rdv1m77ht8i35oj3utemjh4jrggbhutcw2a1dfjfh1swko7udosi3ew5y2x68qo562obimqa65grzusdux85d3gvkd3zuoa6l5vsjv5e4wkmjd79jyyuod65m0zeq1bdskhyrm8jvb2raxaqn3pkqtlgofk41z6o1obceih7094s1mhkc20w3ewbdls49fliro2ljrq3i32qkow335elh14maxiv3wuel68l9yle8zz879dp48u42fxqmhjg9qrmjo0ezgoqf6xsq99cmu5yz0gntpvvmyj6xjrg6emy0glylebsz1f7lnyxml0ddz7ggvdvpvhhg1cp9k2m0sseuygpoehzzhbu0h6ikjynilkemb8xb193zcedjgoz5c343sf5dly62y5mkd0wtf3krjosxmcxnwl0e7nocls75gi8ltcgql4r41jkctusk2jrhdtuipurfo1lvsyr2rd5bgcpji5xb3tv2tzykgrgt05ns1r1n00jct59xa7r3l7c6vk2oe71gi5vps1vktzizshul4t9erwt3haxaontbunrtpkc5eeu9eegc4f784j1tgkftizf5p5q9vex76ki3maz7x3d7b0iirg87yy36nkmxy0zdmlkjcel6q55ovv55qfqjowwsgitozqbzxkr75n40w79ldf372rjuhdihkq9chncqs315g0bjac2ywtighmfp7y3f',
                mime: 'j91lfli5yjuyacggk8b3gf0ijpsnal5xkue3x9l1o0j8vto499',
                extension: 'p9auakqjavzulzcfwyzdldpcimsi11w1i3ovv2bwwrb47s0jjb',
                size: 2291850222,
                width: 355808,
                height: 8608221,
                data: {"foo":8788,"bar":"!,O!Rzw\"CJ","bike":16554,"a":2641,"b":"\"k@D<o@B2g","name":"lCI\\d:l,6%","prop":"oZh)H<&Vui"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '378c39f6-63de-41ac-8fc8-043f4144a9ed',
                name: 'h7dauty7kf7srkqibsmakwgerugfc4t4vr6yezgelvs9vy0295ip1q0hiimichbrypba4cnn8d2lmfrsgs97fq1hoor7moopb42b1gr7sg8bq22ze2m9b3nci0l65om2do4lqzn44gg66swp9a2cyfkm73tu6ut4wdh1zpw4hme6sefigfdh57cb2vyyt3a80bzcqiifci9jsmsk4i5xpnu5to0i9re5ao503z4sp7bbqyz1lpksin7rbome48y',
                pathname: '6ymy89wwbfwu38vc2fhnp1udp0w4ff3id7lg4l2h46eit07667eeak58sub9yytpdaizwfw5zk1bfvtks08rv5bnfq0l54z166sfa7jye9cpobcnm3771mkon3rvagnfl4h504vwplgq31r38u16wc6zalywpfj503q43uenn8dgg78mg1jtaf2c414xpco7nepae8gzc3z9rpjm9pvpgkuwk1r3nsornm6myi6pe0fiu2ed2e21ko0lnmyn74efgyz87bm7v645m7fdkr45v0uly0f5f4yj50f0nik3c3z6g3m5vcz6z4t7dgu086to0o9ykqneqnvo271gxut0ttb768qo7irniebwexgjn5gb94zkyjq02knjvzv1siymmzwz2hw8og15nxr3ghq70vdhch1vjvv8uriwqgotgr5t6j6nhy72vnr6duo18h8zeawf9i43js7akcx3zay6zcp55q1dk9hnnx3aaa1pi1winstarsevznx5glil20oellrhq43tyog9bi8j10n45fxuyraqtod95xb8fewvsvr2ogt1ovpewbqwjqx8o97ffzp8x00drdtm6376rgjp5nxnrgevmmzbv5m4vijummu5xhc4qj1o2xtyxe7ls7as2ajtxt427j89iwn4npijk3a2ahn6rbn7ncdyhfj9mao3tecb92vkyjr58w5ctbm6g4hb79rqpwxiy97saclm70pjdvly2c35ecmug5datmjwg8yv43ffv9l7ogvsq471miemxlr5l5j6mh33lax8jzz5yewx8bbj6sht9wi8v93234zwhcknsitszss6l45vvfhibzryzakoub4zmrn4ddi9xjmq24awzc1xbee1jfn000jnga9q4xv4u5jdca1ob1gu7k4zac9mlibs76mod1vrz6loz0hj66rlmrsu5u1guztq4kdedh55use9f9bze108bfq27c584qyc8userv6awgtydlnk1aq92fsvh7dfwreuwr5vuyphy395797t',
                filename: '4fjyny9q8plfj9dw6eypcdg833iiwqfi7ejdr442671iu6houmehkir83ke4zx40xobaffa3nngaohdbqgkcjehiuwftwoqev6bnrnkwnx5kmvn883gosgd2miiduk0c4i6cip95setebpglp60y5nov6jq96zwjps9yyre6uekj7r453jbcqe3q929sv0iwqws163957xxvqu1qt21e3spyelrv4mqgdhn91h8li4hs0ttpyvfm0sby5q5gq10',
                url: 'xpysdkre9ai33ryfzch1n7eflhsuzh89dt6c5azpg34jrmlofc8srvbxuuv0y7m2eqi67j5bs4mo7b6lldrvve1ofj2nspex6edzrq1rvzqnjhuxd1g19h8oi8i4v55ievpf43sqewplawrwtxw7419hkviqtdt8lerqznn7wvdq9id5p2eidue373hrzua9mqzal3ltbhn8aaob6w126ps4qfnmh84zsdwx4rwkbv8n3i42kcwfmsp0rds8otien7jqulvrvyoims7m4tixuw6aqeiia6m318206l447jelfffij9bsaoweyhaxna8sy2iwl0sn93j8kx8harzyvblys1qwy40gai84s2fyogojqf54dw24gvx30yqtiowkgnhc4t2xr4thqcippgfld4q5w9na79clcgc5otk52d0s6osrfeouztnxuxzzawbkbc8zj76e91mr7gfsyoovbhn32oqskjazc75j5p6op714wchoc0zx9vpd1dqicg6jbeyik8odsjprcch3u9lat0vc19ie71jjuvw71l899hlalt6ig4p109fzvdieloqhfikj660q0xqxes8u4sdjlmk5yx8wx4a3al2i1clpldroxwxre7rvpanjky4far1kkxu6ohw790t0q8vb98161su45xpqb354s5q07krpfj8gea7ihp1c7nouhhusmjai3eka5qer3hzq360hs1gxl1d4pwvdeenjo93l9xdy6lnxcipmk90fnta4trx5j7c14025xkhrog60pk68leldv8mf7u404xkl94h10z8ojbk941igfdv0dvyguejg1pxjml3yrmg2257sw3ydkzkpl08y1wvror4fhpwpx8tnd2ll46o5dsys8xqxii49p3magv5cgvf3zsgilbnxly6pz4ibzc0s30ok3fkkbghxv33hikg0xf8chko7navafhfj4ne6tw2nars96l1l73qg9vd80vay0x1jdzim263rbjyw5ro9z4g4wny2s6ecjy3r',
                mime: 'r53172p5uitjpbc041awaghculjzqxhjjv7h1645wt1y5nnfe8',
                extension: 'tclaq3asus7hmvcy9h38b2nas7043w90ob7pncm29eyjug20yo',
                size: -9,
                width: 902451,
                height: 534537,
                data: {"foo":"Q:;jmU2-A<","bar":"di8j.>hJx<","bike":79555,"a":10393,"b":"VRr&Q}^+j$","name":"}!cG>}B!zl","prop":"eCHi4sjc_X"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentLibrarySize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET admin/attachment-libraries/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/attachment-libraries`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET admin/attachment-library - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '78f6199c-3e88-4654-9a0d-6f9b6c4ccd62'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                size: 2447329334,
                width: 973390,
                height: 216409,
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/9548eadc-04dd-40a7-a42f-910976fa4914')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/attachment-library - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                pathname: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312rai',
                filename: 'zbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxz',
                url: 'ypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjk',
                mime: 'ki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv',
                extension: '1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rws',
                size: 2850224180,
                width: 617668,
                height: 231151,
                data: {"foo":">:oDZ?\"#,%","bar":49119,"bike":84893,"a":"{4;4\"E(#8p","b":"!Gni9t\"-e#","name":"NKg%e4vz;r","prop":"vJ[rl?pY3@"},
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                size: 7561000878,
                width: 319977,
                height: 348616,
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/02bbea07-e17d-4b35-a4dd-5a35cd0252b8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentLibrary - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL adminPaginateAttachmentLibraries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentLibraries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentLibraries.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminGetAttachmentLibraries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentLibraries (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                for (const [index, value] of res.body.data.adminGetAttachmentLibraries.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminCreateAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        size: 2781032159,
                        width: 574569,
                        height: 148160,
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentLibrary).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAttachmentLibrary - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: '81a647a1-96d5-47ef-81b6-eddcf5ee7847'
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

    test(`/GraphQL adminFindAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibrary.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd9b7c5ed-42ce-4782-bc45-36c73d89a3b4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibraryById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminUpdateAttachmentLibrary - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                        pathname: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312rai',
                        filename: 'zbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxz',
                        url: 'ypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0zrwmjk',
                        mime: 'ki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv',
                        extension: '1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rws',
                        size: 1448734136,
                        width: 783514,
                        height: 578555,
                        data: {"foo":">:oDZ?\"#,%","bar":49119,"bike":84893,"a":"{4;4\"E(#8p","b":"!Gni9t\"-e#","name":"NKg%e4vz;r","prop":"vJ[rl?pY3@"},
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

    test(`/GraphQL adminUpdateAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        pathname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        filename: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        mime: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        extension: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        size: 3095626474,
                        width: 788361,
                        height: 559170,
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentLibrary.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '57acfe26-a7e0-467f-b70a-334408419714'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentLibraryById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});