import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '2iyjleg1w8dj68qzp51he3jlbf0u1ljmdd766ndkz12bvne517',
                version: 'l7d0zrjwr5hv4lr4bmp6',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'z7f3ewbqoo7t2qjc25sy',
                scenario: 'oendho8orycdatia30p26fwu5ds4737wh5qyzrw0oov1ggru7bzrr6kjp6vo',
                party: 'ymgp6sygluhj2njutrwy7kei80es4oken7o2j46wz7r2kkbdiuqbfju1pcxbk0vnogne6bdvzmxkm5tzavew8ywa9olunsgxx8ejd7d07n9ugs4b8fok99hcb488uo6fc5pmrr5xqosmg6n9uoo5c8yqgoodufs7',
                component: 'lvn5y7i61qgu0qxvlu533c2xbl3xi04iqit1gkll5yi3ylldv99yfrjtkgyc0zqoojz1dmnsukreblgy486tfn3hcvgkho0248otvax2do0lk8g1culxg07bs8qq6e7mjrhgngfy254s3j5dvs9tkvapwh4b4rxs',
                interfaceName: 'lp43d9e2lmdfmr5pi9jgspj9ns3dzld0fnfspa3g6qfs3s3f12gx84gaqz3wazuio0sbvr6h5gsrmvd2k6274ln9b28yq175lix1gvdxqb327nk83h733tozfpqiuq87c9vr2mue53dtdhd88ampfjt17jsv0eqx',
                interfaceNamespace: '72ylhprtlt5tl4rbmjao1n3g8w3kbc2yxk9hnoh7izibaoa0z314edzd150czq7pklq56eq9dr5ljmzsizp82yau4urluny0pt3q8pxdoqo76sgwep1rp7g50wxgths96g62suecrq5rjweketg7hromnujr42bb',
                iflowName: '8d2wcvyj5gl0w6wtwcx9oxgwgf4oa8cjvyxdrhrqvc5xd9tel7dm56a39bbtmrarxzhlq3gkygnhoxz6ljxhu8m8i4zswgfq0j0ndu77hklmajx8robtodn1ctqj3jfyiozj4kufpjsbzbrgtg62jqpkeqrgc78t',
                responsibleUserAccount: 'hhezm56nxupxgf50ls8w',
                lastChangeUserAccount: '1xy6ikaryr7a6grd6yfb',
                lastChangedAt: '2020-07-27 07:26:29',
                folderPath: '88nibwol1wozlfce5tqks9soc0ajsafb7n9qw38yi66pb6myz0zmbedn8kdt0wgg4k1rynx00zsujwyh3m51iu02b1rcvgtcdn8bck26gfjw8o98jzktatu7tlmdbv3c2l6st07tveeeeiok0dvizfcx3i4ulxalrulez7l4h6r8345xj1iu7uakol8c3oh889il2ynp6foyzzcz8wkm0uvx4f1qpt79svl4nnulpho441vpgmvi1537behaoji',
                description: 'jirszzf2yvbtzd4zm05hjuubzr8kvib0huusp0uklwwgckm7nk1s2kavkxd5h4tjnjuh6q2nywlkormeg8hkpkeo3rcuowid0ob9wnponv636cagbyx2bu6e7hy5dqm5u8lrm7w79lu4n4nlq91kcam0k9k9qo5wffz6bxwkhqe1zxbehqya513cdsu3lasp8a515zy253gjjqrhw74pwc1v77evzkqszo9dclng6e8ke2o29pk1n7cp0lfug0v',
                application: 'cqlobnxx694qlluvzyk508r0s4d5ldtcmefl6aqgix6d6ow32k39l87r514p',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'pxiavtz0sp6gf1sobeg45c8z4ypy31ac3tgw9evp8rh5js2avb',
                version: 'aeodxqoe7q5m47iecjir',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'an5c7k2eese0mpxy09ya',
                scenario: 'idesrl0esa0frnz4dtulpqlkabanali2mo54rc567x7py3uq3wueq4lu6fqt',
                party: 'hiyj3ic7i224jgke9tvc3xcsgzdyfbe4agkksjghv8imkkvys9qdnhwsb8axhidq0gfsn34fceeo30ro44doyq4mnmw106jrkd6jgxlmb77hlllojvqy6iv6ojf82q4x7gt2burbn2tgyy5vnhh8go171xs3p5un',
                component: 'mbgblloraxatv5sw6lga0skkv6uc9zcsy5o7eura53lph1t6hbropsqmtk3ycecjxalu8gbnpjof470ny57khwwji4l075703glmakrq7l48b2b7wezsxbe9wv84m9c2ehj5dtszpxahm1sg36yobim46ukleybe',
                interfaceName: 'itvtv94k6snwmmxvopycmfpwcrbjl3ipxkp9zkhgxzuqob1xb39ok1cge6snmzsmy2b8je87i0gulii6tircgg6r4qkbnwm1a1k1jbza8yp8evv621gjwsuulb0cns85rv87yci0g4fqjg2mbmz6qeq4u43kiy28',
                interfaceNamespace: 'z6al7puv15pgem114kimnbiroddn9exx2z7ex8orh4et5cdgicxzhc1lg40kbm8m2de3nbg0xxh105wkm9xqzug7eyzyvadmj4n8wzeucfhgv72wt4j2km2ewi9r9ulv5thd6yfh69u6d5q2ykhpk3zcbyruq6ng',
                iflowName: 'stwkx9izgqqletu2nnodgsc0hzmmfz3hx6q1qggsj5bydvpklvyvp0k0ajassa94agjg86826m0ank0pmy28nhtceoqrry4igoj5v6g0l2neewv2j0p20guh19t7x9bdj32dnbhh66j11hyteqjfon4zfso3wht5',
                responsibleUserAccount: 'hvovkpy3mjcsq33pn7dj',
                lastChangeUserAccount: 'x2qcrynfi5jxy5ck5wwo',
                lastChangedAt: '2020-07-26 22:19:53',
                folderPath: 'wdhakybv7f0g8ti9hcpl4tbinfxnox9z7ma1vqrqysxo7x90mgxi5rpmqa9yl65acropdjwbk9mjaz0cbewd1q22kx5xbdlb7nzq4lf2w6in75tgna4my19yd14lhm9bjusumt1zpy312fqvwm2z42uly7kbo3lmvl00e6354q88jduu7j4xh9t7a8i6sizxvgpsah5d9444vw2v82fkuejdnkci100sdzv1u3xyy35jyhuqidm8odtf8y45eug',
                description: 'o4yxu36cdlxxu70hw0wze3ktryvhsxz0ndjuk7dlunmbnmjhskrljludm0sor0oggb6ab7dx2vr5yris8lsjp425gwnwp2ob4vks8j7sck19yle71vdzip9qgtx7n2bi5uhtge7hnajesx87on3x8oehrzfaztvi6pps7k8nqbonf8fmihxs13z2n1f0qq2pfnafgh2xnu8cab4pusw3irbqq3x9h5iyqj67p150acfc3ekjqsy20h98sk1qqgz',
                application: 'v0z9xewc8rvqshzsqkypq89aeajj4bhnjja78vgw2uh6429k2xw5zudh5d72',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: null,
                tenantCode: 'y3znz9e4n7kar45z4nme2woz41lo3byvf8w4wyrgyov5n4vn2u',
                version: 'm4zxaeljden1vemmhecn',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: '5n4fpl9lm9fkyg5v8f7r',
                scenario: 'fxlw9f79spu2zlcirq85c2vb0kl5t4mitimmg3o8i1asxhtxfugswuovp681',
                party: '2zy2v5ckrr4i4psfd3nrkkhqj7xeiuj6tlfg0d0p74nf16hw6k9u2lv7xo4wk9sie8vwzyny6bmso05rn59d01v8o9x6erzlkhvvpa7d2wm994m7zmm5ess0hycwoclunr6xga66neevz084cm5w0uw9p6itnsob',
                component: '5vbq84a8y0nhx3zonbithxjejvqwl4oflmnpykqgk7b7ld20pevedhrqg3ec03kdyk96lutux1chgj310onhnsoy6xspyoc6hpy9dk2ifvlgjmr64h9kj4qf42ssvcvmb4wgmeieu0cmqj0t1lvghnaqevdtecl8',
                interfaceName: '9dpi5xtlul4zqgqp3vvj02hpvh7q1v851hn28pf5ekhvwdalm8h0ex8t45p3t84c58lp9tkta0c3893zb5lslveifzczfnwhdlfpxc1an9ym6jkafbkngirzcvxrslmdylshwrx9k9r7sofm8fme9zxi70uj2ygu',
                interfaceNamespace: 'n4mbowcral6i3mprxs51wwmx76if6vdwkiafn23ewensjp9lw3sixo5z3n1ts19kh14qiu40y39ckm3m7pobj2bomshhei94ve1g7sm9fo48b5xi2c6fvm1ae9xfgzppm8msuck53htnp1w8wsqaakuo0vd8tnf8',
                iflowName: 'njj2cnsbhy7jrij1fycthrx4q6apawtox15s4psgy626kdihs2dkp3h3wc531usburhvj2bk2nojowkfgvwu2zqbzzfpwr0xe48q6c9hsloc96an5elme3on272lmsvdv6iujxen7gml8vqyhl09t6rxphaseery',
                responsibleUserAccount: 'hinrs7e5dt9uy8uh2a23',
                lastChangeUserAccount: 'rdkxfau2vaxbpwx6p03o',
                lastChangedAt: '2020-07-27 12:38:13',
                folderPath: 'jajrahrs7nacxnx2xymlzxgznkq4oxfd9vysni7gk25eexxj9z94jqhom7a1rpwvj41rdp0w3xmnho8vrild6dmmx4yyc44cdt3mfcjff98he11a3h9yy9q07jutmp9tys7ciltggbez0q5iuxntwta92hvy7sfnysth35m2k55ihgx9ui540hmn0b25oq0exp93nw1feaqo5n2vz1iu0k4ze6ty7g2h786vlmp2v5qdvql5mojwd5kjb2ewuff',
                description: 'eeh1kmxihv3wub7g9yox1w94d35876ywmqhecj8xprmhingb3kjlds1l38dk4f30f421c52lgiyk6mmuo68j4f4hb6ib5v4fycs1beimdl1ad19meyfqy76sfcavcu7gdk2d80nycezzo9yddr7b4c5jbyiublbqeu5kwsl554ood73txcuf1xcoai1cs5nju5zzc734cqoxuhy13sajufx06u47vw0fa0pxqujx75qa4b6c0usri3t4m31ah5k',
                application: 'eg82p17ky2dh7g441tnbn8f6fxqd0r2tapty1of0vt19zaov2azxhvzh0icq',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                
                tenantCode: '1h5mfpfi56vhe6fuic4ua4nf24jvxlne88cmsd7fcnui4kz6ev',
                version: 'oq9jpz40wusvo89h9hhs',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: '4oywsoj0mhvuoh5r0xgg',
                scenario: 'rvoqkiejcb2tqdgr4rywv7jdeir7d9yayk1iq6eq4hfa4qb14920sg4dmica',
                party: '32xhq4qn3z0kr26foxanlnxb034akl5xnnosvaybluoxvi3qpg78qpz2hq2cw585t6gktliux3dzf7385udsa64bpebrocpbzrcenu7na6iiva9xhi4u161g5zdk8aujnxq5ks96nd39hoe4fqut7f3zmi2p5vme',
                component: '02unza7egpuxgq8awcd06r2v1tvt6g1obf4pbnux2d0z1stwuxoos3nwfsrwaatp8unz165fz4mj8k4vniy7qoq4vlrsq5ldaia7itpyl2qerfr3ot047a5hrch5qgv9vawnq2hmpdpedzpmydg72b2wjv6bktqp',
                interfaceName: 'ddv9oulwx6f77wsy2we3ekemyln2j9uuniaiije8i5qewbhnhtjbrqi36ss3npgjaeokqkpe7vm13bpxrriyvgjo6d9ju13likyq1jys1bxzioqgthwypkljoms9m0o4r2ocscuiml1vt7cka5ahrapl5vihxbre',
                interfaceNamespace: 'oru9isnsy3uju62tmtmehnfw0kegsb6hu94btmjd71ye4eeu358neoii6zlv8n81el7fznt45hix4nwmhsg3n6h30cc5yl9vdl0kgxhfj2gsv1j8qgy8eo96zb2uu3e188nzrc6zyyzcnzax7ke7rqranw97cjmr',
                iflowName: '2cjd0cfgcaone0wintusjw8ha0n1vay9u0bbcdsiluwf7pnec7jiex4bf70hoxvqzdlzrlo8q1hngmojz6mxwjm24ykox5j579f03grmpwrffykk8k3kcxv1bo33qpzy4p2ycgajik5r99qblzhhl06o7bmptjfy',
                responsibleUserAccount: 'd95whn2omjgruu90o3o1',
                lastChangeUserAccount: 'gwfccl6j4zklzbsekcm3',
                lastChangedAt: '2020-07-26 20:13:15',
                folderPath: 'k0xj97iz9vcm0cz4ufojx0506v3tvws1nkuxhdrxcn1ljsqkl9p6a3hwwttwk29ve54x0o2ntpid3hkkfnuhq5rp3ylta22th653g4oert3hx5bfqqymtf6r0m2eka38kvb1xver8zqlxjyxuk67b1nyhp5boedgwxsp3ykosxnb1pi0pi2gx44hzkypxs96klewlfocrkj4r1df3dupyk8cwyfh5l7mcfm3ryy33oaf4k87of2x3bihqcfqrw5',
                description: 'cffnytzgoi22wwd5sm2a4g8apkfin1783j7n6ix0gxuu26lpk5juimg1kovbmatsgml7joop2mqz76q4t3uihx81bbkx9r219uuw29htsyznglatutqmruhu4i2m9xr4x6t4m88lgi6uok6cgk33gfhs5ksjvl3z8zde8awnbnemwfpzymr3lazp1ewci60pj6p4lagcb4raocw3q6lhhxhp8hycx4yr337aawthf2n59doehsydczi1xai81pg',
                application: 'uxpik2n65w46hx3yhlvrgwz495f4s193uof3by01nqwdzanrq2bb32v3g25w',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: null,
                version: 'qktd2bd8ozzz59m25cuc',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'gdpvg3cipbt2188htg2m',
                scenario: 'j38jel9qbxzuf2hrhnqjtxwx18fcgigusak1b0ocgd1yp95dntn02tylliw1',
                party: 'bvq03u7k41ojv5tdx5x7cf5dklju0s1vyxu94ve3qg7ak1hwxfc42c7j7dns8qcwmu1cmjxa80q8g1puia8yne5to17zue5xy57o3fcylgb5r4js1cs44573swz5qo4shmbbu3m646ewji3f5xeulqpjd6bxqgl5',
                component: 'rd9eux05tbu0egnqq8621bvguadfh3kznkhz63snzn2jjhl12f43rtuledjxfefak48jbrnck1vjn1qe6pqexo1k5ezceyolj2h6q0omyx2563dhidu1ual7krlvu2c0xxo2o3m84nthd5ueyv976c6p4wwa19ur',
                interfaceName: 'ay2dsbh2195ghayrgz8cwiv1yto0tqm4dhfi2x7vd2udto57s81oa0ywq6mx6mrigoj4z8swj0asczctj3cw63w4uar0cv2hk0t80f43h4y0aftl4vjf5u0f9bvsdnyg84o8cgwta9af8qytf5xq1qs4dx42w5p1',
                interfaceNamespace: 'x1gf5rgsc45efloozkgu2h1gqmga7hn7he9npmpqyeii3ordczt6a4yb7jujiyeas6wb4jzwuhibo3d9jlr0iqxulu6l0sj47v1wk0c7hmqtftp4majz1opb75pw9o52f3eb2r8ptbzy9izolu91h2fp93c0h3hd',
                iflowName: 'ktyp6wgxvlync2ncbqod18sdv74rpkgon8383qcglh0b0rksoo5alif9t5710t5765vfa8ns5h4zzrcf5i90cqp0mdrzlx9u1tkfwg3ugueu8m39ep1393p9zzf3bzamng7ymsovt770k8dm60dkeqkogfj2a5q7',
                responsibleUserAccount: 'qg6iitncikcr191zwhnv',
                lastChangeUserAccount: 'pf369nzzq6xbh3li2k9p',
                lastChangedAt: '2020-07-27 14:21:43',
                folderPath: '7jn34l57w0pkrn19gk3sgjnctqjpc624qld2od6kjpxnzj3w5ekv9u8641mbwh3lf9jqxkhntt4v2mutkv5kpg3zpyyrxl5jx2c3kjkfu46g3swkfp50uub3p5z1qpld0cd3j4490qa4tageuw1pvjcfk57ihxj5okstha98u3j7zvxlh4nm1c835robkzou9i4l03ft900bmo4ple3zjyrwn6kupijufjidebm6j4p18qdvyhy8vjkt1qc5dbk',
                description: '595d123hu00thb44xm0t9rpvslnozrep5m6nkx39vqn32ow6csuf5uzmghobcterq5ljw17rcbuh80zpjvgicynm87nha50guj3rcb34kp2bj3s2vs6gf3wbszzq7r0gv504a4n936incu3y9pzzhsyw19i6mli8iu9n5bxinijuz3no6izsl7ttaje70w5slxo6dcochnl220i6t3ha98638a8nudnj4ze88b67w7kjaelia1t8hlutqo7n2bl',
                application: 'c8pl0iaq1l3jbho88rdbvcyko1k1tm5qpcf3ky18hdfi0iuj9pypncoboef6',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                
                version: 'aaeie1feiy0o6oj1zidb',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'xpt2vux0qo2wx93m510e',
                scenario: 'l6ehfskumjku581faytw8dazvhoodngjhk3f9guseez9ehpeca41vpf1mclz',
                party: '19rajywhusvckksy03ymcfrklcsw6k9onshivcvxlxiydaveu3a5db13p7r0k7i0dlz1xh84j0w8j3ezkxfjardt350lr7j13p89pnlyurc0t8bvvmzwt8g1045fldef3cqi3bl6b8036dv25ecvppbi8154hhof',
                component: '20moci86ngav91yzsaxtshbpsx9zkfbj329u51j4a0eqdrtlwp629up386uc87mv17b7a5gmn25mbc41stiws4506uihggw3yppn9il5d2ts5f6wwksib1jqw1ymzemnrrfkf7lnsbcjejmjr99yfu3ubiy1xdez',
                interfaceName: 'ii6vuqkl7dd14v1jovvj92xidt2dp0ycn1qtnjd5oh0lctj3s2h38jg94h03357l7o1o624vyulg97u46qz1p2zw5mvslm01umyc60iliedfyneok0tum29816wfo35eup3k0e61sshup0184ixh75sqt5k34ca1',
                interfaceNamespace: 'pz98bk8wv91a2dqyy1bhhkezt3caq3yhu4nux4m0d3nmlztkxo3qh18neeywpqkw76kveruuiv23jgydczykbywd15obdntraddedwxlcsckwnexhx3uk50tshqntentc9gj097we2fxfw2woazmplgjljid5eqp',
                iflowName: 'bfparzgrt25078j8s9k7nn75ic1j259sy7fa001f6yjl1tz11hvvso8sa5ufi62r91bhkn06sbfdgchg9t482i3ccrj2oy26x10c8inl6wgryu9vtsc9tuzbq89gjubrriwiow9jx8jrezw2503qugo78d61mbom',
                responsibleUserAccount: '9p304n1d2emddlpe908n',
                lastChangeUserAccount: 'sqhke96ywbhav4twkuc2',
                lastChangedAt: '2020-07-27 03:47:41',
                folderPath: 'h73vvigywwye6uoi7qdxa5msslzqvn61xcbk6rxgii5xa71s6bt3o5sw5ytz736swt39zh368ihaaee2c92p03wdiqg2wks4i2ossg0f50orvgcjeqsnvqhcynt2zs3zv9nwcvmfyxtnjxqf9yb5393wrc2d8i0ylra8nziu19wcj7aqejqy27orcqr41z0725lb8xzkqt3u5aanhdti4cln5bsurfji0vk7bu9tqto9f4f6j3vjffpz2bg9idn',
                description: '3tlze5b721fwpry9xzuhudmn5lmhgfnf6ugnq3r6ebfzbqc955m3qg9lo5fnqgebe1qyyzk6npha7p9ywuw2b2otcl7xir16bv1gmr3bd9wam5vkxkztif9oels709k73btwrgpzwgjgbgvn3kdy9ukzw446ftr4qvljogqsfoeu3onyksqgdpz85cxp9gpaz6e6xcmmulncfflozhn8uqokje5qkoq6hflh8x4v346p89uq4k70w6za3qjrtlg',
                application: 'sh16gzaljldb3dc35lken5ah5zc9kxmqvwmt48v31ymq3bc4gib7ry07l2di',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'hsyfkq9y41s66l3j7ompt47ed6jncd0ejln6pj56pofx2va2r1',
                version: null,
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'oyr572csqzjq0xvjd012',
                scenario: 'b4e298bw7ai7eofk4y9tbfrzlkk4n4detgcpeecvsyro941fdbcjknrdfcro',
                party: 'jtk21sz4cnpqd6ztjy7fvf4rw3lsmz3sd12oyl57gmhsj8b30cnj83rw75yeeqlju77pregwbftgie0ff9sygyualblfqlk8n5eunpj0p9ekf9asa69bnyd8cdpqs7okc0za05uhpauso7q74kr3o1pbp25snsqy',
                component: '75tljrm70w95xbm86blq0u8zhyviwert987ocjrj7iafjs67urhdlmhm1om6ok5skb1w3j3qvw7kuo3wm9h87sasfte6xlaivb33eaw5md2p0ekyok124butf5psf0mru8w7xzg52vylfhod2ipytd5b34psun80',
                interfaceName: '2vupnz8ienovzklanpoh459i56wj7ethmbl9xr60d4ybsqpnvncpvgi1efgyvmu4bgbc37xp0f742uyxixrwf6vtwy5zb1c4y1g5fbv86ulrysgi89avlmjopjt1osuznxsm8ypmaca0lxthzkc7fjtupnjxszw4',
                interfaceNamespace: 'n81zdtga7e69mmrfkazegde3xth9mlycj9zk2brzdtwvg2ckmtn5jztmaemsmtc5o0ygye0ovtv50uod3nhfd0goutsyguo606x6tgnlpj0krzrfzx3jlc3dcg7dxyi1npzb0kvwqxejbgyul1h8dgdzx0bbuq07',
                iflowName: 'kj3w2gwcpj3r3unwz7r47lf01lj3ggfeceikufzu1j2un7v5aki9rfn3zzs4ttlgq8q5jubaijdc8n6nkgvq1hem23q1stvkw0qozts6zuep3zjy29k5qibtfpve5ypfhkx1r1krj3b6v4os8712x0k2gawmi8m3',
                responsibleUserAccount: '6v0cebrhe1jd2kkoyu3i',
                lastChangeUserAccount: '304vtc0v3ul3p7x21bkl',
                lastChangedAt: '2020-07-27 05:11:28',
                folderPath: 'pznpy2z0hqp2d2g0jq80k1uk6yuoou2k8sr5f7ceuchle4gty2ur3udhpz03l5i9zo6asvvm0qxubpo9e1eeq6fx6k1k6805n6gn1uk4sefjchlbw78eaiyrizc04qoi7cuf4sa8a596y4uw7i7yhpkx3zwhwrdk7lk8k6jc7zr17c8jsnsbrvjisvhrr2i67hqvhljs6loed83vflneay4uzsjw7jb6pt81834063lzm62flanfpl5frq30inp',
                description: 'ak8yym19ybaq6s52brxpv08sgab3zv5z7yoclx60gnd3pebhezhn68kl4hw5xcnzz7xau20ba6f8mq1qmxdisxa47860xmolzyx1t6a1ilyfoivn7rk69zs9y7dlatqbe5e64kc5juiyvsvczeak8cvjrhce3hyjlzu2djknvrfdf2cw68ovwi8irb8wmtz12byuean8luestlcjo1uc8u59ahomtu8w0w7xd3tx72glqlzvtkxreolfx58wbec',
                application: 'h20kef4hxt1cr26ilbi5zab2ixv5lifzz6kc6vjlsxx19tw6eq4s3vpm52fp',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'rxjw2zowx2hqbsugcioe85rf7kmm2t2uhm0sqomeo1ovy9mqoh',
                
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'ucu2s6h0u8kw6myksxyu',
                scenario: 'plgvsio3lnii0ujlq1r3rrs2yeygauk1n1aby4vow73bd86ev264to6ccmg4',
                party: 'egdbaw55awb52acyrvif5xieu8eis2jk9gdprsjq601x71g4b0e2rx3fjrs2c7nmppqr1wn23p6eilbhykiewi1t80agijqktq2emiyud6qy4fr2kwcak1tfgzbus4fqxkxg1tm0eh1qijl5w3lagll7yviu12xw',
                component: 'cex8e6i15by9dk8oa9vxdhlzcst79330yf3iymhfhukzb9ujw43yb01951aogbb8n9xun1fdwgerpsqdakzv2o2gi1fcnduyseavkh1y7x9h0ou2ao1duuxn9u79twpoahc82a07hg67as4ngsb1bpyntla21yqs',
                interfaceName: 'c36tls6wf5mfb1uw7ci17enixwh2bwov4n9xvaiv0zfy83ehqcizu0sqrc8huyraf12l0lyyofn64c2tclg4gy13ad83ykp0iqd1lg6cesnhrhgaf1sk2weyzcl9ss1qvn9xy4o8wjgu3hyqy6452e7sim2hnjbq',
                interfaceNamespace: 'f9vmbe02o2skf7tn5ytmq04enxrzmiobutvybau1a3n3bsvpp634xj1ca4ys7ayjfv16iowgseyupiux9ki8j3tcnr4xhsf9be2r8eo7j7v1ptvct5b6hsmuppv6gachimg9tz9f9zzrm87ep4isae5x4d2o499m',
                iflowName: 'znldvcv0s66u03n4ba4f1q96sdltjcx3o0n89yq27vyopn1edd6iz4e4jw0xrl9acay2q9cxwwnynx9ayy9u33ojyx701wf35y0j04plgv1ggyxy395yhejfujeee43ig6qt6x0cmkiync6qmykzz009s6kjv78u',
                responsibleUserAccount: 'zp4r9bdk2bboa20m39i3',
                lastChangeUserAccount: '063n9h3n5xna0ka3vu8b',
                lastChangedAt: '2020-07-27 15:01:29',
                folderPath: 'sifptogjghfxddodbd3ib2czc3zlyrqm0jn78xxn5ikhh7ws5wd9wojrpx89vobzs4rpbd4h237hr2bid8e6xqotf5ta1fw54v6blui3uxlhx3d1q6402dnw7fr7im2c1yh41qmy9jmyaiiiw3lassgsse8jmsndhxo34awxv0zqzygp5woy1e67dokn7z5y80vszv0fd5tq7uocvzla5xea3gzqetuyu7dyt2hqpajbk25oarqgn1hiy8g355j',
                description: 'ogwcte1f048h5h4o2gd8ilxs1rj1wep70lwpvkkp5wy0py6yxtesfq5w7bjdtdadkph6gppuv5lhrkkmzp9h04amtweuwmvkoqynp58ddb5hfzfvxy4nq5bnpcv9p42h043rp72mlu7korvgre6mbopdxf2i3q82lihz1amzlaowfwdhcxe0y6035jbrsfx2i206hrmbuilrxrev6jtksnul0xaabv8bhus4a918sp0saod8r10pz3gz0u1fes0',
                application: '4kodna6xhx055ln9g35kpuxtxb8be40xzjq0fl4wwg6qxi2lx3s5xfienqfp',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '9an5c0lpof8zqtb4gywr4mrxuz4vwc88lhh1tj5qmxpjj0lyb3',
                version: 'fi4hyonub7mu1v8s246x',
                systemId: null,
                systemName: '9n8e6e03ssd69l27ifkj',
                scenario: 'i86tdw9obd6poejsm2tefeybtdb41rf0wwvnvnyf1f94gv4lyiu1seq9ibz6',
                party: '9ybyn7kgoi1ukznvilkv4ni8bnn4dximimr1jx8ccl29uxs2y0ufn70pi0x7m7xga823530f9gmh5ajfck1r4ugf7x0vblis1if3nv372210j5zxlb3u8uaxe3dpgeb6oqdckiahrbn2o27zzor7voxiedjpgul5',
                component: 'racmbe1e9a6zzmpsipa1xmtsf031b85f5qjnq0c9ga4e87ej7ks6uu9a0ry8dtvioml1wh6acsr8i55ucr9cfr3hg91215hfdprwehcczbf1jusl25tgpg97snpysiu3duru2r6jow6j7f65i8hpvilpdjrdlpy4',
                interfaceName: 'ukb5z5ct8kxdfbxmlc2j2am0jgwwc6k9hpj7q8n9bnnclixx58cyg2jzzz1r6vzoihbo1a9x1uhdsgkfuoqvufzyiqcasgo6cenauzduyg6myv8kszda46gmpwz9a5knq2m8mxjlzmurn42r167otxn78e8rytu6',
                interfaceNamespace: 'f0ucw64r7z574oew7emz6saysxt6fpacfsu3i5bxrbksukmhbecaud83qgtti5ez9i9ss1j0k1o2c78tv1uzr1ox8swru2v045j2sl70h8oqn2ns2i0delyvg7uatzp41ekr17icwvcj0hqk232khwsdiwesz5ju',
                iflowName: 'tq0x2rf9vube3ounyvmld5jivhpike8fe60ohe5j8k2csjm2t5jznfk92dcw5cupai7jqez0mrmj1pqj7271e2tdaeve3lbjzkhu694af1wslnoji0egjmo17dt36xi5mj5yjy9n3blgg223cwkpweg5xpg662fy',
                responsibleUserAccount: 'sqtrsvkck73nb7ufy3b2',
                lastChangeUserAccount: '29xst0xtx0pcw5hcj74l',
                lastChangedAt: '2020-07-27 11:12:11',
                folderPath: 'lurkj9cru3gx3pfrh9r4ba0jirmto0i7ksn2qpbg5371ooyogm2ofp606gjsr081i659gby2co9bkm7stx425r6tz7lf7jimoegca5rdxc9z2kbvtib6w61fbtfzgb7knekftxjmecktxa65ymruxml7dsw730kc0jb5xuszpzpctg39316825qsaka5ndpqjqju8f8tn8mgq4ltna9ch3tmzz6a11aw7tdtm1tg22lkiq7gfp4opsriye1wby5',
                description: 'yt97zq3265no1d9mg4k6dp67nxnpeuecuwdd44f1gxxu9vkvx8vcqh73h19t3ems7ml9dd4rii70gav3farte1f8jkicudbtg46pgfeit5m5x5wnihzl3mowjquc90mpm4mbjz3p0evm1yrozqsas3nezlotpna8f6byddg7e1mp82ru9sr89qzg0wsve0e6s7g6afgv5911i0s56jaap4le282o2tgvbqwpkopqh9guzfm7m7zt00b5pcv75pf',
                application: 'j6apevpn3nmmwc4sr5mvyf9aaoctsoimi8vh5zdr763mp87wuipdh5g9ckfe',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'sqeoo509kaar42eo0xgvznlubbk1vf6o3tqqcqzjp3x7yqovtr',
                version: '35cdcap48o8ksqgbs2ab',
                
                systemName: '0c4k7wzfwpbl4dfd4vo7',
                scenario: 'ggmkxe9l7og814imvsm4kvsh7w51yjobtt3zrczmx8xhe2eoqexpdhc2wpoq',
                party: '5ftifkuwg8m7uucmted8l41dn7zj58ambxbw07i0oc8nz2nefjaammbv8ec20pdf6be9iuib5lr01se4zrig8xdvek95rtaorzkh74ovl7an6p2h8exxq3gzvj6lqwwdjs0bjqnr7j4e2pofdm1c5ln01w0re8sc',
                component: 'vd30r9gip49vsxz1rjjgd4zj03ofpfjflesstd33dtgrxtydrmmjemzzkhy04crnusa3vekejrjunlnj04pz00j047a65w15fdcstrbm0h6uqka108f0ctlz3exaypl12scn6yqkpitbsve3be6o54akfulfpw57',
                interfaceName: 'e27gtncnazl6rwvwagvntef4obyeqejkzdi1260oe08puw79r7q2049s77eoodiahdyxyzo18am5atiy0rddnrbgsj9g0q8p3vzon8mahxsfv5zqt1r4xplq90z9fm358nv83209rkyfj7tt2jw54y63edzh71h9',
                interfaceNamespace: '20pei91v1eanfox99n4s5gwnrkvq7bdl85jnbc4dezlqkw3f2vdthpc5844lk4ef5j6a4ajcsmcozccg6k8y1wh0yma893oy54hly771d2i6n4bkp5n2xqet7jq9qwejene4ppu4rgevil6hrjcu97cl9wnef1nj',
                iflowName: 'f0qlletv2j1wy1esb412i0fyxnup22d6hfwwo4973rz9f12dp9med362ygsrljvmn8f67rm36aoxqt5inxphayc7mizwioyr869g4czsmy0uzgxf44q56ejzyyyu5hwjtvqmjfzi5ipshb9llj13d472fmqfss2j',
                responsibleUserAccount: 'xk82x1h8d7k84jeupjev',
                lastChangeUserAccount: '7wlu0stl1wn5j8vintvw',
                lastChangedAt: '2020-07-26 21:12:48',
                folderPath: 'up1bwsqrcj4wj0gfn5sduhdhces7006r5d06r9jyw0ccbo5xyocipgxc38j3v4jalpq0x7heplie42b3xiddcu8cnz486dfb1l5xpkgdgh9esryg2rgjw4mvcatzoxzl9jnqskpx2t1trsn8kfsot62gj2wv1lych3hn19tr8dibxyke757wllft8fihhn8yd73m869n0w7x5ljj4tcadrqc01bgl8cc6d97i2jo6p45umgls8p6o4p8h21oxbh',
                description: 'gt6mafpop7py2tw8kr784kq3hxnksrm0xjbm9arxrii3uuhkt80496gtzrp0ximvk6rnspo1aehjvocw3p1n52d6p61lrug0od7159x4za7o0cugavebgk1s5uuysa21wis199gd2agfbtxsdzxh1xc6k7h4c9y4n7zcwfnhyij0fgnugg4dh8rggknpvsp6co0mmdkmnwrylrbpv5z0957bzf8q37k084t4myw4shufax1f1kwn3zd75sxfqr6',
                application: '0ggo0ko5220xcqcnmwdegdor61cdt6u1d73xo2fwfwln2sl1qy55qv82ya9h',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'qlclgom3xgkfbniswtmb5187i51v7jhxow3jbtm20unqo9ijqa',
                version: 'pr3pk6v99n6ot34noibf',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: null,
                scenario: 'us45jxk9syaxh6l57d7wpj5ye3hfj69hz6rl8nzyvd6qos6r9zb8rwwss4zw',
                party: '6beciaxfdhvz6f2u1ynujhfsou04om245neiv440za2d8531qja7hlrj7234cnpk6t3ftvir6402g149shmx4ei16hlsgsp5bf7hydsduh6nj7geby19fn89arrhysvvwd2esec3a00wgiqj103h98e1zesvf5jo',
                component: '01ffoi8b442rv06p4iml963xv5o1bbxbphcfkju5upex71wmheoixrhm86iwn5nm7f420d7mo956vcrgx57uo4on0ub4vua1zyaq7vt13mlg84bn12piz2ew4wbf71totxh4czaghtswj2gsap60l17d40sn31x2',
                interfaceName: 'vaqsugugmgimcdoe3sukc506toc04hglazzpj1bgmwc5rdweibqb229tb5268vl0inuhibx6l7lbrdmjbjjvlrq1rdtz5e87aellihyvupwwww5qzt15bzqs35r42os6yirwf6gwfnxv31zf5tkj6xhibu67nec6',
                interfaceNamespace: 'unb30fh8zutgpott5swrb328i3qpfydaplwictvtuq0kyb04p4dqiwwbzc6p5qsn75edbsp2c7x4f81d3xe2go0hwkmkw563bus0z65y0ay4b3ufksaso8eqhjlguyl5gh91jfqhnfw6t4i8j7ndgdwja10g84iv',
                iflowName: '9x5s2rsrpj1qxkod310236zzsnx8udh6o9urh637ysg70thjftb42zsna7w21hlq6dzyocrfhuu9rybuah6jv4qkugkd0vwnykh5qt724zw6g7x99aqddgvlygsey0okugr7m014253kq1apg96ivy6q6mz744wr',
                responsibleUserAccount: 'l2b82a3itrbwqc8hkaa2',
                lastChangeUserAccount: 'ewqq9u0cikk5nzb71yq6',
                lastChangedAt: '2020-07-27 12:29:42',
                folderPath: 'phebsv4er6785krv0sou896sfngb1l6npumi47avmngq2snpzqvmtry9k9jqx7n8oiaguteehbo4hnp2smjmtafkyu8slvyud9jvi6l1wwkkrq9l77lh9ncpgyjwsm26v7ho0fq61j67r3p0sjj1tcy4pve7witpov1ier1tuzyzjq7kvxoa8sddx1iabaui2vvu15518g836jiqdsc621uo4o6mstr7avxayynsg8gv1qvo0js7i88cadp5n58',
                description: 'roiw9l3reh7dar21sqicdl1or3gxlhahshis1g227lby1k928wie67pk4vphbc5gtzjz1b75hey4rzv8d38h8tn7fl4k5sdiwc8bvho2d2w97hwflx59pvaflao2yc15ioufal6qap8t6erdjtf6ccph5dmun3hoaw87ff8b9x2doafdwomf7kxpjecb50cb7yaojqijiotdf87wxojodbml586861ougfya8avlmpskcsnxezl1qtikrdsg1js',
                application: 'hs1m6czpkuzxdx81gaggxpfjodzhgcmdthcv3ssi1mkqazftcp3v8ga83g9l',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'pz6bafnaeja50nho3gpt3ol20mkfstl58kjyenwlclf30t03ys',
                version: 'icekk1rcg5kn2zl08ygz',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                
                scenario: 'wjproa7xlsti77q7wgfl1ul4lsu55z0bivi5ntc5nszj64pkk6bbih6j7q31',
                party: 'ckz8kwowom25h5xqwxl7824322w9zg9kezhpmiz6ap1i0ecvaht5r1owa941liuhs5pq68g5j2kv9e3kggdd2jpk9lmccbyyrf46c3csku11tap206mvcpayu02r4hutoxt8il563pnq41782ukmm2s5dc5d54kg',
                component: '29xm31m47qrxg0rx8wk0xxym38ehv0hz3y15qliejxchntpl6ibsmauzmyk4x76t7w5h17xyez6ij17uoaigl7ykm7boulq4nw95h3cwghmmxr9vimbi9h8qkkamnt8k46dsshugn34vinh63w7lu60yv51ul1oi',
                interfaceName: '27i0jhzwgf2q3h15776e9bk2fdmfaz175to01vbhshmpuy84n1crs8knicfb181ng50h4014vfwfb8olxvxm7lc4q9wnp14qbnuhfm0j7nq2r309wrrtof749v4820pj8bgwst4my6yhfbn7bu9cnhne7anbpkok',
                interfaceNamespace: 'cq7k8wcj2gopl600590xxxbkdexia2ovo9t8m9hb04dt2tj1sbfesy9v1l7qyvos6j72ra3s63xeyar56cdct35mcs3cyyd2jz4vac48qva5ip07w0q6aruw48boeamu2w8zw7wwbp7n2ubhz9d2mc2zb9djwt4k',
                iflowName: '7ahbug7il1fk72ei4qodqt73mejfrv6mvjegoguwjkxxjx6ypiw5ohe2gxe6gnwd7vcdednwsu5tyjqsmc81pjjlg74fqj13n29n3df59fu343ju1wd5a655daoeb2msuv6o5jb1sfxb3p9gk9xdhnnrmazlrzte',
                responsibleUserAccount: '6fisusw21agn88omtelj',
                lastChangeUserAccount: 'we8samhyv7hacol7d3lp',
                lastChangedAt: '2020-07-27 15:36:36',
                folderPath: 'q8zzq8khg3ujlpculy1qxl42ldspalsqijqs5bqu404f67j2cof2jec6w8y3wgb3sm95ib9dcyhit7qhqnhhgyb0bcvvjreakzc1mqhbre0zpjrccukh64mna1kl2dez6nggoxhqq10tfu51e5b31h155xn0z0u6my4gxj6323ix8gx7s61ht7nxaxq19xchm64ijt32ycbatwo7fnwr5fb5zymyielb2i39956rq6yszczs0z6hsnqq5j5ogg1',
                description: 'arpdtntgbp9vbikjadbelt8cmnz88gajn70wvsqlm0edzx14oyb3h4ikaealgrfrkv04aj2ev8j4ws49tj7rwhhgnvg79yvuwmk4ia731jue3eqyb3mycttcz7dy3kdaylblmxzfmmf8avlvpvny5bwgognmit5gxffz8w5xh651pcyoe3s7iwwj9ergw82eap9l2rb4vh0t44ckz285dxbxgitacss5gb0pz335wjyaat7xbav0ur12comi7i5',
                application: 'mcb3hhf7uernvkg00czzy0mr8v6ulvw4fhgdwjgvj96rthpnbzhmu2qz25by',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'hyb6irixyywjvrhilkwfuy5yx3t8k5gssec44jeii8n6r53s7l',
                version: 'cs90wo7swe4c1tfk02nq',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'tb2qc2s201od1qyafr8l',
                scenario: null,
                party: 'ktoewg5whxj4in5cq84sgpeyfhhwxbn0jmz004ij592qe12ix6pznkhuzzjfowqttrbo988kli3wlu5o98dbe3sdvkpdkne1zogg0ordhfjh644w2jtdc4fzo98m9lde0n1sr4l0fpg3rmpm0bkrzsvc857r9aje',
                component: 'zhkav68dnju0jvdvt4ceb203xhdv2vtqcaujmalr4mcss7rro00xml9wrxm2v3x85by9y36atjjjnfoqm3uwp7f1kdg5pno8jpmnuvudiitzus8ihdhuclmaacssnfzu2eg23hgfhjgd0a2mu6c6oa2eghp8vx3r',
                interfaceName: 'g1tpod27nnfn2skhirq7a1lvesdkzxwh51yh2k3hi2y0k6xv1dptgejlssu1joxwfjplonj6h6hhct2tr1ubudid46dh4a6o59dv24q93y9yhd3fqhes99oqgukf51jo59xps7v2rkco9r3yj5oe8rzq3pxq9mdh',
                interfaceNamespace: 'q19kqundczb8vs55xtz9lkfoxiphe2r22nhqcs0nza613grslxl7ujuhapn948ac3151r0kmivssfqd5bjoo2ebhy351gu5qg2wkmiu441wmawghdu4gddhnoq2aaxk5ki6vl9hacf6u1gn71a8mul1bhh0kakf3',
                iflowName: 'pu0kilged81c6ba50aglr2zgm8ph9p7dnnh91hj8f0z2jp18i5lklr8jvkxe3lbt4hfcqa2135g12ar6iw76ijwgni2h99l10n1teij21luvhf6dhp9j96svcx21evdfuywqkmmysuyhqkr5v3d0k9y5sakyxoqg',
                responsibleUserAccount: 'xo62sja9u63pch0cws4l',
                lastChangeUserAccount: 'dgb115f39jcgos1j8sqx',
                lastChangedAt: '2020-07-27 04:18:04',
                folderPath: 'wopsnz1ca9dsvue0srtzx7p1co0xtya7o7yn3ujgrmwcmekxuwvec90ptbxhsmubmojrwzbziq2kf87t2q62n7jfplrib2stfayzijv5h3qu2kheu2rr8fgk05vpidpfzprfczy1i2rc6itg7m23sb1qhqfl9zw6qt1bkh9jqiyfh549mcs7oag3kzthdb835elmw0ed59a465uq186m66zpu0dieh4jgfdzhkf66q10qpvc3shogneqasp2zag',
                description: 'el0kv4iumeskxfwz22x0b7ueyw4mblpdt4aeroya6ck31mrlyetbvruh3h5og6b7vquzogsreuy2x1blhzrpjj10vb6dv3x4b5a6w8f1vftjxb9hkyxsg64i51xwp8zu9ulafumja16n5qn4lous4ycm2oyg647ophmanazfiueyqscjjyg10i2czrhpob2mas5fybjucvl50mmwr3uejw4rxaklbuukeuwuy7b0jyhvt5k7hjku1ajfgcjfbid',
                application: '06r8z0va6brk6et5757sukla89sh2cd48upej8yq2l1mgua3rdv7kh1o6c1u',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'pmsssl8xcogk1eunbrbe6hy92adgwwynzq0zac2fwq6faybl80',
                version: 'cus4hf9ln9raerqgtmff',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'nzz8ap9bvg2we6x077za',
                
                party: '1u759yu7ux4unr5gdz2k8dfreo1lyhx7eons3hlzw0zz4twxsg4t20v9takwhcw6lly5ks7b11t1f55cdoucr0k8g18e7x8f2j25mkmpyo4wcy3opz9mktt64u4dt4ftw9o1i4mqmngsal7ty9zzjbj2n3t5qze2',
                component: '0lckv2lw44fx7bdnwk2iddz2rf0b1uk4skbbqb7vbzov3632j2doqjah9w3p6k1il99duobr3lx9mbznqxahrwq5dm428h9ycrxmgl36hl2j8veyswcs33w4ewtyrxg7xqmkr3sujpa515majv11on5oyvys39sc',
                interfaceName: '6jf8mif3mf3m1a7lx0cna6b9rnlkld0inj75g0r9vja3s29f25rwwzfxxyd54lpozkq25mqr9vpnmqyy3mo0zcx4yqcbo45amowmprtymf3od7borv3ns0ob6v6pip578h2r9zq2xgbuo67zily7vfwcwj7uzkvd',
                interfaceNamespace: 'jmiy5n6v277if7qtjbjw0t8ae9dwrl8cf437lzc1qg7t63tnov1yc7xgybqhhdnnr7xakekq3antk342l34p4mppns9f9bb18wk5syuo80oywzv1x4yfg9ofp7wbmei71j1tub2aglwlwme73fio0vgvmd5ra9zy',
                iflowName: 'dewcdr05mtkm04hhbwrovjdvj1r074lqdsxc0ksao76qw8rfmq5o3gaxrwthxexkqc349ijbpg8jal4p51yv5meb581vuanfda75ovbsnbrwztgf3y0ct80zk2uolwxoeh1hfnnghlcx6ganscqm2mh7oo20uhc5',
                responsibleUserAccount: 'gdtp0hrre4umwk3nvzma',
                lastChangeUserAccount: 'w82twjilp5z3yf5fn64b',
                lastChangedAt: '2020-07-27 16:00:00',
                folderPath: 'ev0q8axywvrslx5gg2oss91m3pr45rlkrko0tle0qwm4stf5gxuurejd4l314vw756byrj8p7js21z5fbs6dq49gw5dwj40aboia5l6mouq9ozotlkfhwgro9870yw3lmprv77odkttjp1cv1kqqhq8d182f9rdby03couy80adfqxqv49jcw6rhgdgx1pxflvv84j9in7z974ope625x4xh8gjfuttlwiet5wiixvbsb65hh0b7zfego1sq7qs',
                description: 'feg1dg548a4shtogcorkchzytyqgmbdu8j4z9yapgja1xjebfydrbfcbgdic5vl9oif5u51zsnr9hr08atwbgzhaydnzrlhqx00x4mvukbctfixvjgkdx29zsata8za5j5ltvh5krt7n48cxyodac2959fmwn759tyum0hji8tunezruhl6vng99qz08cwnozr76l4u8cumz2lkdcseonbjxn5tgs133gckx7rf2gthy7pv2cage41o3h1lg7si',
                application: 'bekrqr3egpxbblwz7e2y20h99yypr2b0p6cfqguw5qudxvyhzxcqyrmu83le',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'g0ypu2d77h0umlyrbrcxioeloqqq8iabfkixr8t6tozmthe8j5',
                version: '2239ep5sjn2jjclqqj7o',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'llvb9mcjk954ubdiyi0x',
                scenario: '1i0t8u75ridnpyhhfddtghrwinf8l01cspd8uadljpos6i3oofizjs75s3rx',
                party: '1e2j8uqgp1gvoma2e21plqfbjt8gwhozsz1vpp08c7vysbnfi26dd2lnsamv4eomayt92j60yonfloq63ke88s5ig2gzcfekya9wtd87sywdz3lgomf9ckszeo8byc004xnpylyi3e4o4o6r9maqxcvl2wqh4abr',
                component: null,
                interfaceName: 'jtqbeoe7spielxvrvqkn3b9c4omh5ywvsxjlbj4k77s0tmojpia6f95nuzrpddb0a7e0968how1fiuvqa3a0adojca1s1icf13zdq51wjr8js6egkruxq5ryfbvnu3smgvoaa5eup2odxh53hah0ib72jkmwtfgp',
                interfaceNamespace: 'sdjg1twd9lky41o4did16awfhe2qid373msshmilhopcc50eqmpfrz8cdrdd9a8a6anvrv26to2wcknx3gbk00ggkf6nvdy335eq24yszzn2aopa3325jxrqr0dwg0uia7ppoe0wnxs5um88jt6w8okromt6nugk',
                iflowName: 'gfgy1vbvvsuqi6dd375etuyd87pgqn979jf77wvoqmgee0cijxqurdvv3ves0us78z9259vjnqt4z7bzfe04h5x6whjjv5vj8vxxreava3p87vtmzbsl1vg95su4q8q4tubx05m4of5cvl4kjy1nepj6va346bwb',
                responsibleUserAccount: '0b5qnrn0yjk1hv6xfe38',
                lastChangeUserAccount: '366niezc1tt8yvrmejan',
                lastChangedAt: '2020-07-27 03:12:21',
                folderPath: 'o7jvxpojz9iiw981wiohubbfvu7es2pelrrw6hwd5btjaxn9qenkor5gg2yiqnu9b0kvpfa5aufjiwmtkcobyf39ywpcwjgiwg3zrzlqgtz655mizo3m87bb97ddplqr4ccwucripzdnk6hvb8zv1m5lquse14opxqi4csvsm5a5ej2wm8syal9cvbaj5j1l8n6hmdrlqncmul7rbw5f6k8ntorhakau0gr6ssb8oxfrsc6t7uggg12822460hy',
                description: 'f8csxdyk6ts0v5qgraytyqynhzb9t5euoxfqe5xzck453tpyypjgkhz2nrbn013ix07carzlt4rqkg5ehe6lvp40vqb2ftkbtlwe4tfvcley99kvq33mahhjwvh3qhy69zkrppukc91c9t6q85snrxqfsaxrl3nxlwcbmik88th99fkcw8bmxinrlvh8uwacdw8l4f1ovcx2gfwvq36ck0y1609l11slumtdw8491sfjoz43r6hh9q4htj60q0p',
                application: 'spnz1dh35bfsct7o18t2x444gyd55nx9zt85w6b8sm3bs5pi5trrwi9563sh',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '2lfg7husmlelah0ne690x24tfq4kajrhihhxcgy2o962h2bsbf',
                version: 'xkcs6v7u0bi2v7sivfy4',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'ge9tfv5wqk3dqnjicuca',
                scenario: '5nx6nfyzql5b019s17ee4erjg8ysp6xk7wrtz1swn2ryhx1ghzc7bcvyuvec',
                party: 'd4wbtwup6d5dlhvjfdruxvl0feairxaup2zjbt6vs9uv8uslu07pjard2ixwj5nx935tvrequii6k4xf97rz5fabvskhrb49jty4vva06c7nxi193wlrze10zk7l9s4tcp7u6km72e89b0itlsh1929ymujtwona',
                
                interfaceName: 'ma0ic5nlddtk4qqdqnaspsdbl5qfe92oki7udk0qzy3njkuhw8d3jrmucev9byuy15so6oczj4mm1l6xzrsh3wlzhlvs7hnxa521xtpkus1bbmlikk4nrikg7tsb5cmr125v5zipufurjofbc0wsgrtuggx695tg',
                interfaceNamespace: 'xse55hzd2bpmufpfruyj1fkga1gt839ib72rsicscgagkzhtmpzkbmvsxw3rd1d5bw7nibmvo9101zecrn61a9xlhnv0vj7y3t18ubc0q7gr0m62qsajiz53ra5rqqikow5tz0r4ef1pwu285jasmczuae8cnazd',
                iflowName: '7h8r5t5oevmq89po278sjb22ymw4547cddydhqr8k9cuqzw6bupm336smwcvlmo71s4co2v3rk2b42ub2dgtlu5nbtehfie9a81gwg675u648ijf360y129ykqg2mme5dw0czmfed5p13epommb266px46l8e0oi',
                responsibleUserAccount: 'oriso1vxwsrr1fja8a86',
                lastChangeUserAccount: 'q48gbd51desfra9hcba7',
                lastChangedAt: '2020-07-27 06:54:10',
                folderPath: 'cyn9vb38vruftujnxs1m5fpljvhbbhl70p1un7zu9w9edtn86y7uqvycdbw1l63ufhhzep3qlgjlrmtjjtftk36pw8taua1779lb18z6udbr7bqjiyvspkd1brj6whnhwyhxeamrotkuw3n0dq6p86lztskp6hecia8r7xozwznghyy033v11tk93x4jr9yp1ateisj8nnrvgnrtc11aes6v57m30yaulv8dmikv2vmjjfeeb3dswkycz7u8iz2',
                description: 'o1sdarvoqpxm2hs5bn1j7jxfp15j7tsl7vpcqq0zyb5n2e1ciu3hpejclidaqratvjiw6snnimap5k5y3oyaqvvcvvfplhd0vliyxd18ho9bgphs09wzakuhu1zxlipynsp73jy7bs5fydt2h099honu4m5u4dxgxy1m7q1g6f3dyyyr5xf07ckgpdv7dfqvyoowfbfym0zgmutq7liw22gof0n2f6ock4tcxjstnme7a45q7s8fephimpblcwf',
                application: 'ct5egwxgy4txoi4h6mf1pi4k8a4b9clvwg3q366v3tin0as1hnr4hgxmbua4',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'w81f34x8smzk6xmg0kajwzeppfab80ksjlr7lbaloqjglu0ghd',
                version: 'at3vg1vapr18hyb0a2yc',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'rtobrfyt8mrcd3vf3500',
                scenario: 'xoho233f0ceita6ph4780fqnc9hicqg83yvkl805mk5fkmnax1aqzibcgpwe',
                party: 'kah7309jpt2wq9rldpps8nxj9jlq9zdykxz97mesz945bnomyp7x0nmcjthxvu8nlq4sox7oynx4as4i0asb19hq3i6khyu0vueq02d75fsfuaix5pf1l86tl538l6dj5fj2wl58yvxvodex36aiy5bb5gt3266m',
                component: 'fbw4owu4dgm342qpgy9m7bef20vs5vw66kyue69pze2wkkj28xg2bqod5a1gwtgeafvhu1l6aelj8p84022vtmkhndwstdp6j1yfn53jf3bzz3u4p1ahzbbgyztbsm5mpyy4jqyufxbu5nxrp0nq6p5p40kqj9v3',
                interfaceName: null,
                interfaceNamespace: 'j7r947wnijrmzk9svkpziqb9qdxdqjf2hb3y5p99mgqmxx6jbc62jyh6tzje5bfdhmz0g84h3ky7jr41x33j58fouibcgbbawp298qw9ehbdbkuzddnlvtuu69dcdlcwxr3xxjlgq43uno71lamm1d4ib25i3eu4',
                iflowName: 'iyymowkkd32ptd7od5i6gyfsarxc2n0xmek8bstkkot7om6li4u58o68gpcbl3dz3d3uxu8i1kj5tggsq1ys3r04ngffr9ajo9jdq5m7npfzjikhsmxzfw1bgmzc4wn40csnt146e3ixso38cfeqlfsxtw4r8r03',
                responsibleUserAccount: 'punfx7cmpwshtnjzzf8d',
                lastChangeUserAccount: 'nd3qb5g15c45tirduf9t',
                lastChangedAt: '2020-07-26 21:09:48',
                folderPath: '9n5doyidkmc7qbzw4dpsmac52ysht1xxkq4cy9h9eg9nm56sc6vocz7z870ai2vc9ppjspqk2l7hfs4k1jr4lsponampawjf6d2uujkfi654tgcfo30v5shvs6ejxa55lhrsjrwrtbmvo7f2bxq6rr13qoo4h4rm66m0ycltdz46vu9wzggqx72cjn3mghaf23p569dy1zso5l7ujz7sotsurnxsh06ngquascayhf3470mmmswqyge903h2znw',
                description: 'mlk6oia30zcrrrkxxhw7iv5tipupcxdx76zcuybs0ib041ynndjusq98rf50nkg0fges09la53k2rvf3gyu504dq23lt2ozyilif3rxosmxg4cu6ggk7r5tyqecciurdfyw210wulm1o2ubzn4lams6zthslfjmisjx9quf5i5su0xgj4jh3c77ykb8tt68h6j5zcvz7fpgp24wa83oke5yki66mridaclpx1xxut7ejjbscyloni97w0r3cv7a',
                application: 't0a00pnhgoczbfmkta5f2dq1au5egtshb6hjszukj96y21dlya29yds4r95f',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'wlfbp5ry6wc0yg917zv0jc42uqyadtsu4absvk1fzwmeyhpqbc',
                version: '8n0tckvy4r10qrod2d4e',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'ytfrpgqisdchwe2npg5r',
                scenario: 'y7lfj3i83abmi09n2ryw1ezcymxf8sw7rczahqn60gu923axebnzixnkhbuq',
                party: 'dxxt8opvddsh2po0rtmd9h0o3ifb7owkuvovja97eqewegg2c3g6898ds2cfg1h3d32hpa8rhzodw6fb3peba45k2zb1rya8tk78hv40edryajdffsn47z9g7emd23cusy3r28bzd15fy14srk9vjhf6sjkobstq',
                component: 'iq3xeh355lfb9atzi6cyajg8cyc4q1wzxqd2ayz3s2vd2qanpttad8x0p6xvgo0x3izaxjp0qm9z8zawi92rgyo9618d3bb7au53kaxllqluzwlllok3cocd1wtwmowsyjeeymmc02ilcx1kfm7jdkundawx8lxu',
                
                interfaceNamespace: '6f2gdsnw0mttxwmbs6efudp6y6imc7iunkxzzh7f1gvgif4wj685nli4v1ha1o6y6lwj2gbf34y5i82e0exfi77yipzvgh1g6we2wmmsyu01r0oztbzjbypk7qa7mqifbtmxtutegd44q20uipwo7tiif093iolw',
                iflowName: '32nugvzhj2q975hhtg6l9xxj19fkwobyc1446ntf8hh6hpwzs0u3ozomf4u97b85xhhjwqqeexma7w3o72ifxazuddfy42y0wqbmjynvjzro0ks8d20vnyo4f7p3egmdo0gun4eh8o54g9dogqjd735sz1uf07va',
                responsibleUserAccount: 'ujik933nrm4ugpq23xjr',
                lastChangeUserAccount: 'ontscan0q271gc3n6mnj',
                lastChangedAt: '2020-07-27 16:09:54',
                folderPath: 'yr01qoxsnhnxzbacf9axveqocaj397ocalbg809k9etdvuwlqulpzhjsgld061ureou02t8zt0gbefnwibagl1t7p9rp0mdbbpe4qro8tmain467ajqo3yi6l4zgqb1hz83r6u5gsnldol6nfdj5fhx6wza994c4p1ewxnhwv1f3h6kf0c9n7776rfra36qf1iq92n6pehu8ot8jifuwsdujmsf5376x9c76g1jw51uemoekschxzmawde2pm7v',
                description: 'pbzb21e25r61jso86vj2sez4ohjyg3ucgrnmyz6aqqztyualrf4x56e9ang5wdyiqw5j195i9blcp5clxztjuv57ncg473oldy16sc3axson8m58v34nexm1ovzo5wvh2u2g7vw588m06u3l4zf3rr5kmoew9j10om74z0734yzkrsk17sjat3wx7gpgox64erxautyh1k9yozw7swufrrp40xgzpvemj9b8b3gua40ssnmr63681co929f9yd0',
                application: '20ij8523ki33va5bpqjahlchdn5f0d4lk66pi99l9c8gbdu7c4aqds597pls',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'zxfzkclb5qybzl3473nddrxp3rm57drs8y4aa9tp8plckmtg4c',
                version: 'o413xv7r3ni81bn2jkui',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'xgy9ha8hv3mzxiodz0e1',
                scenario: 'cixltq07z00laup5r8exs9qtjh9p2d38ea7ce0mrsjr26iygi1j9hxgkzor9',
                party: 'ljzzd26wef74bhlmz7d5uiif32hbg3ppl02ymdk1c7b10qy5o3t1j5mxjbosu840kjc59xko3vr2fq4hkcqi8irng1a4vgvrgyvtpjvlt7edtse1yrzzft4taku6ouzszoi60lxew1tplu5786b70eeb1nv02v35',
                component: 'zzhxi2x58k5n5qsw9ll2qqnrlxkhjyiwl1ldg6brogrlant8z9juj1bu52ne6bue2j1vn7ljsocqxyzn8vm7qqk7j0x8wcut4kam8uciw14jyhqml3b8wxo3n6i40kc1s2jn23ufwgt5ul2ddvizfzjzpnxiz4en',
                interfaceName: 'hp3s0afknqy89q4ss4julg2dggbmn3w8ea0swdu704e6tvbgaibofk8eejd95odnws8ty9eahej3er2dxz5nivooxbadpkpu2d6afr6zr6ljv9wlvj9d7t1o0c1k1s6cbxfbfdnoj7lob654hwpnikwu57ch9kh1',
                interfaceNamespace: null,
                iflowName: 'bx8voohbwloelmmq6wfdnmjhxj9pifidm1149teg04xjkoftlabyzbrwcoudvniwq357rdnx9j0qu0e3ji99mfzo6f7za27tgnfisc04hzks80r2g8n9s8q9ln18ihwgdmzcevumarc8i6jz7t8g0sxiz90clu0k',
                responsibleUserAccount: 'yusgp5vsd0nao6wq9wql',
                lastChangeUserAccount: 'ni957nunq5c777pm3hp0',
                lastChangedAt: '2020-07-27 14:32:05',
                folderPath: '22ysql8qkx8jv9schtdwjxtqodmdf2an58f9rb7iehojik9mmc0g0svtifgdp67t5vjh69bjivuacu18qx156aglzvlsoxu3w744c8786armwh32n1wn7riwtse8e5u6aouoz3dqev01l4zx5hxg3xyhpdiim5tuhuz3h4t45v0vouxqwmu5nfs8zzz2ik312x39vuiuskvjkrxj68j0gq6zk228o6junxhyz6963m0yb0lwvz9yzzzlj7u02cr',
                description: 'kstqeitsxfs2ndmiihc0jofue7ax0xzxk46kho0ieremy7xqyth495rlf420veeoapnjfbrk34dxayqht2rfsb228kyb0h4fy4hya0zj1vw8t0levbgboxnjxyvb90ifcdhx4f8se8jlpklcg5ex8hjc9ijq0fa1mmnjx8fkq8bz1zt4chxd0ejjioxbbc0cw21fktz2q51b5qtgt9h3xlt6s5d3sdwq7rpduv42ebq7bplyc5l5obk1kazavxu',
                application: 'hck698rdvc7lhv4fp031ky3hvz2csmttulo9gsq7e22rjtclj5qio85h9jbf',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'tylgwrjwbna292yrgtok76flrhprdwc86q1y69ool1l43vnjl8',
                version: 'msvqby1l090b7l3r1vcv',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'zi5kdq1aezysku6eci4y',
                scenario: '3qlxrjbsqmwi9sa4i3c5a4gnk3urhic09u1gno3396spw25zjraaclxibuak',
                party: 'xue4mddte5t3mcyyl9fo92oehdm6pvby359bhv4anhjapi2er998v4csudwx3w3kicdaw6t4oik43kkf4zfvspu5swqzg9uxxr5fjevax0xo2t3n8s8clyd8vr4t5r7vbxba0afrgfufa9jh32ike7gbvl6n3uuk',
                component: 'j08gwfv49cxg3ln3g6w5wnnqfeu7nno11svjlld3nrq6lc8bu6vf69mcmebf9gajysegz0qvtn221zpi9ysk5znoxj16r6xayy5d9hue2y1v37kagx5sb6352fxj6r0rc5vd3wwitu8vtsjv3yry9315dc49s4c4',
                interfaceName: 'xjb3cvwoyui77l5ryorce8beh8lsyxsr6k2ny22a2kbydmzh7u7af0qhpxwwidfc3ezopy4ls0pn0204e37dlu43hfgrq7yy1bqjzy2box9t8lvb3u2272rfxj5hiwavxwp4xuadd03a77um70sqtixdwnjhscsw',
                
                iflowName: '82gh7z07ru26tusd4xiedeoszlaztmlix2ye3ub9hon89eky9ftvgn3x728ex8zfvmst0k8hzb2b62zxnbictvlhry6ompyewmjjpjfirkx1kytucjo7ldw1ttfmf13vyeqylg8b7j4r9zebra2c3xt8ljhxmb6w',
                responsibleUserAccount: 'jy898zw92221k6w7ro97',
                lastChangeUserAccount: 'fdqdz9w9dcp498kg8brk',
                lastChangedAt: '2020-07-27 08:10:05',
                folderPath: 'lyyohd2so45qzkhbeecef842lb11inrgl9djc6ek8xzos8sjnk1js9j6s5p46r840aa45lqwn2bspnep4tyc27orju3l3pepz8dq3pgpqal10apmf1tra3b335vul2y5rxejt2to9rikobviz7g0j3wiigedp1i21btvuasy40yyyc0nwkf4l95cjc6vrg1dqozr0mwj98leo1sdd0xixuebigurnzmmfses9v4blvi7zby4b8xvfw2eozbkp02',
                description: '3fni7rioxqx5acdu3nblsgq68hcu002svbvgi12k7im54p7mt4gv0lil4tuxieiug9gokug4dzexq23hhu48xcffugw26k2sob0bf40oeyln15tj54fwpbwna0e5lst8ge3ghpzzsulppws8z12yprxhefq2vvtjqo1bn769pdhl66io721o4mmcmt4df9in9wxz0cjiuihlythlay7ndpbmiftakpp88cjaick54imrm9rn93tderqmupvthg4',
                application: 'pso5gu65h6jzamn58o26gmu53o6gs3x4e9qlum4q29onlhug2eegvst4hnyg',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'nhn37aqyqvaqxjbgmsb8eib68kvlqaz4k24va6rr6clzkxd6gh',
                version: '8tg5waafpfcsicx3j473',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'wumhc3sby35qg9uaov10',
                scenario: 'rupaijsex7i76fxfmqiwn7y0sgqxy1apyhpe5h0hwowshb1jolx0kbexhg7w',
                party: 'fh3vq34szr9wh9gbv5fa4zfprmypkhm1l4zdif2ikw8ryhro6ryesl8ieg1l3nueqiyw3seasiyerwusboj9jaxmsn2fvfzqvvbmd0di3etwbqpynwrze3iub66b2lbslgd24droloe6mn3hi5gmjhp2thal7dk5',
                component: 'g6r9ivxkadfmggc7qggsigd4lbdcylfv48fxj3z6cxs3bx61u4zrnf7yy35cc1kzrge28t0ecci9o1xs183f6gqkdfcy7ll55okliqpafuxisaf09h59bm7kntgcgjfuusnhxeqzc77fbhqhhn1rnoyr2ob7g1t1',
                interfaceName: '0mm1mar8spqqeuzrqdvdtta0fo4d5l0jrjslmkn977jcmq78yfx4prpku9ujjomuja1i7vr4h6betifogl67j5kiwyr6d2tbuzhx5cfouds8p8lxr8atv9b9ne14xdamr3a757u7kufhls9q2veiw3ychbmpoofy',
                interfaceNamespace: 'jtqa5zbyfw6wocypk76ujza74z44eczhz55dwr3uroyh922qza1px1c4gg8g1pydc8myrinvbgemtb0u1vrx79qu14wybqmtis2msuq46aqn52tgtc5kz5pdghyemz98kwaeen3yo4ghzab1u59i0cqp3wwhfwmh',
                iflowName: '1a4hon5ke1h84lq7n0qmsdirhk0f9h31owm0alegmd253v18nwqnn5t9i5hfumq0if3qxswblh75v47y4kreuhk0zj7g9wd4exhybt5twqe48f3vywa9m0gc0w3ow5fw642hgtn6tv06015dfss28h7mrdrj6fg5',
                responsibleUserAccount: 'hlgyyk22cmj6bc59hn1k',
                lastChangeUserAccount: 'isrpl7w5sqvqhjo16jad',
                lastChangedAt: '2020-07-27 10:17:38',
                folderPath: 'c0s6qg3fvogvq13o38dzblwygbwvnu6mtg56tg7481hefm8ibcccx7ppd805p46be9xfcbyzrt88brvihlcbelfn2rbztaxiuz4hmkokjgdylqbmgwsgy4he9apr5ntekoqcmtumqmpgdmchry5w97rblm47mj4m8wjyz6i206ysyefj3eg2j04iu762z3ivh8fivuyxcuo4ggxrdped98lkxpj099zrjx7r354935lrvw7jtbvgp7xaoaqg2rk',
                description: 'v6ckv9nmy8ldytcy113y9m65ba44vcecq26b3lxkysbddzppocph6r5hdiffg5z3xa5v7vu02xlwgytaucisvwbmzo3478xi5rvufdn29u4yrh0a7k2ubvndcf6ho3d8gbniq7c0pri2udpvx3rbbntvzvx54qi0ion92jtvl1jj3jqyig69b2dbrr2c37dfytt7gzqse718tt7v2d9c2pqzcfnwpdcu7zir5qh0y95pcqiitzofvt1pt5npyib',
                application: 'f193s9xg0n9cl72rcqslrbhmlzmsac2lb7zf9ijmbyssuydokjgozoa3xx96',
                isCritical: null,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 't2i8e1zijqxhu37o1f07berjbp3vaf61dd58mlr4c86h8ed94u',
                version: 'c7wnx3s4g8qh1m21i7xf',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'sj81yk9cjx7hw08ysqw2',
                scenario: '4drv04ba3rzvjelm1wq0nsntsk0oxslpuy5gizybepepglofmzoaq7kl2c9c',
                party: 'xrk8gg7l8brplm4mz9ufszycdnp2hfxwscpavqwovssbr0c2exprn98v7ey4ewoi5594a1oef4my8d12nb01yki83105gutxlbseepawok2mevbqg9b4tnjbe6pwwp3d9ate0q54yhajyvk8qyn93fanlgn8tu4v',
                component: '3dm8tsxs9ye5p5j99dejsggy94h34kie5a5txlnn0haozs317650zfnfef01bhs23dhv8qu3z4uvos8nr971nzpg0zfga39hfro26xnxgrdpz5r4x18ivsgit6vnw0eef3dw2s6dtiq0m5u3cf4vcgwsz42lmgzq',
                interfaceName: '82pce6c1sb4ozoa19sxc4x4vndvod4ldc97yk0djaf0b6y7hya9l62kthtd070ds68mz6h8banj6edhenbszap9lozmkic82btgodomzsy5i2jcg1xit1cytugl5v50ausw0vfodykckm53tyy4wigz1u3o2h4sy',
                interfaceNamespace: '4f5cwbe3spoysfx6hehhkwtdsvmv7ixjnxx9ifgue0jyxtsitjj7zrcv6s01hhbvea4cvhocs67ynfil7lodjk0pwocdu2rxaydw7uvjasthbqviok4tb8iepov5k4p29guqxu8l4xrnqcpx9741f5f5fwirdq2b',
                iflowName: '6bdd9onvghbo0tbz83r8acbs47yv35xguio15d2jyueva8qv6c6spdg0a8dy2ik2hyonk98df1fxghu2whd22z4ywwsyd3z1s03pmeuwztfe2domdkn3uzgkuf64jm0s9kpdbhs81nl381e8o6w2z3jjeh25dujw',
                responsibleUserAccount: 'mwd075rpj7lk21o8owfr',
                lastChangeUserAccount: 'k2z63vbdva4hvflc1vb5',
                lastChangedAt: '2020-07-27 05:41:50',
                folderPath: 't9g6b4wfnxrqerbvtmj94gmrf5t4sztneffrybhmupb4g6i3cqlp8i7obumm5z32agra0eiksqqv1o980su4xk0234fnsdyryhgorvtb2m7z3ou9hk9eyxk5vi7ukbwnfjomcym5xv17ajrbh81qbn5beliox3rql8z1mgfoce6c9ev9q56ltevul8tkc6wcvrqw2pfgc8n2uid1grtfvexnv1kyyioz7h7l8jfib1mywgm0wp0p2cjyqf1gto9',
                description: 'gwivtrplh5zi4dpwh999ypu0g65o1m41mw0dhpgoj09tx7okcn94airtk5jbif6mnbnst9mjj8tw1ni7z6hxy8nysbzpmggsrhgy6309oue75sdrkvipqi5n2vgf9vjclsfw4k8i2j9kfww1gc9smx1rh4afyx3rm1g2piagk6gz2g5c9tyh7djnvy22d7f7pv917aalqgv8dmhgq9j8l02ufdseflnyt3ga3thu3o1yljyuic7r07ajlf916f8',
                application: 's617gm5w6sowh6k9dth30qjkspa4sgu1c0immb12a8w9rz64cgib30xzgrsx',
                
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'y5lldy40j4bjs01gvyul8r9tghqizisyrhaij9kcj4xv4zqe3p',
                version: 'nfzo8e3zx5rschn3ebpi',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'emafzj16ppk3w9qp38jx',
                scenario: 'xx5s7x6vgyb9l3rpb6oy4fjh4ulywq5ch0ekz569dlck09wplew8uh3e5nfv',
                party: 'uvxnpeqz8m01rrl5lltuwfycuix2smthrcz1eo63nb2fp1z1phzkphrjdn7nadypdmth4ca2za6xeox8jtik9ymv6q9ggkaebyk4fvcdmtm42iih306j6aqqx6v5r0fl203xibc8f37nzdt8l48iclq68bgw2k89',
                component: 'czby72rn6a0aaeary4f9h4lamyzknj7bq34x58wm1frh9fvfy0rwkdsnx1ueestvc50q92w45txwwnt1nnr6cgj5pg3421ouclbcnzda84wsdzdzdj9qneefc5jzwwmpineqlc7mcd4bj31y16u4sduiz525623z',
                interfaceName: 'c6q8dvkff8cxnsi7jb8fbbq3g2rf1q4uzbgbx6ry2527ywsrwy4r8ex3fduiik8e7i3ryb1if3kc21hhpshhca7p4z9486yx5srmga9av4tnpj32iyc6v412k3k7xc95ffg0w9qk3jyrt6goeilttevoieiw76sv',
                interfaceNamespace: 'eb24trwffoc6vavpd3hyxkpzovqd2s0hqqsy2n2k2hu7dv75eidujan2300rnblqq4cl5a4vyavyk8lqloyruvge2dsuw1j1pjuxacaucdyojk40l6vcl0vsmoerc6vf3wkbnc3idawhwnj9eksqca1dm0snhd1q',
                iflowName: 'ab4eoalaigolwwxdnaap33tr4ciffhqq9911f3bu6lgr8byogz2z5vxm76odytbpxwn10ztbv7jx6axd2ymibxwcecsjgrb7frd5imxyt3vandwt0ro7peq9le34p0evm4iy1j40pcu23ga8j2s5kkyjjuu70y9c',
                responsibleUserAccount: 'cmm1z015njjefq3vikaq',
                lastChangeUserAccount: 'dqu29nlzczsd9dw4r1wn',
                lastChangedAt: '2020-07-26 23:17:44',
                folderPath: 'pmwqafijelptnu15ficye4srfj9wqr3cm6iult6o75ix26de70uvy1a22mzy0tldk31cdcgpw8zrte0tyuponelj494u4ejn5y8srw5dcd6uz6jci0b42zfbfh5ub6f97vmvz55eppdwg57uuql3axtdm563wpd9x0nkiqyyeti7ah8qmdmqoezng1q3dh4j7qy7yvm3qlf1p58m2wx0epriap08up87ay0ljwm4k1gcuaxw7inxjztpsqqab8v',
                description: 'me29ot4pan6icmsd632m04teyob8q715mjzhcug5tx0hejwtmojdrszvzom67d1jw6fcqmy27rroe18t0ogk9w6fwzlmjfxjk3jsnlxpeclftnw6x9sq954irq22c1ylqweigar3kpo2nbb1s1n6telk2v169r9dhr8du2ad3cy23qb39ckz8tqlzv300uz83trbilulo8p2qeg66xi6b61xvi5zak18ceztofeshtqa4snqlftp10prqvfms5h',
                application: 'q1lp67phdzm9crmbtr2n3c418sf8m7mr6diqlxzfbnph3f7wolumv9d6k21m',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '4tudgmrth0lwyozaswjmkjhx9zu3ecuxepulvksqi151q3k96i',
                version: '2kvjj39i9t58prrdh6vx',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'lkwqluosftbzehlwh3ot',
                scenario: '7f5rqdq5klre5kjs0a3nomsgoso00869wx25vo3tuyk3hyd6pcxc0rcxmmmk',
                party: 'jxk414dwvdkjztlz0ns7vhrrrb0yz5s72dfu2l9lnms06eul6upz8inx011nixe4jg4h6kqh5bti8joinq3s4ovhs38majgoxjj40q01q60aen2bzfmyhk4rihyfpb3zfjko7sebgulwys99osx0blxtdi1gbhxg',
                component: 'wqehxbhypgyjdquk3yw31jlgzyc7il0gr6x4yiqrlsgrzfj1iajuthhgso9jhu75ok2hpkkt6lwarhfp2botmmlmjoxg5bau8ycm4gdaotuvwgbz1synjqbxdhsdj9mxirts84uclxf0rwl33k06b17o466xnrwa',
                interfaceName: '9n17ca08ewocusc3zp6nl13k3plr6npvlxvr0yqusjo5n57u3crabd1aliecxttgh9fa4s7dxcf3mtm7errys47wvksasx8gc3kd3ue6kb3vh0mo8klu37a3sm02uhhz630mflhiczivxcu8gmwj4f9pxv0kucs7',
                interfaceNamespace: 'mf8kh46tuzg78qyeiktkgo2y7wlytgdafetvp6oh8w7393vddfuorl3bwrnc783kd3ccnt1mes4xrw92ngzafy3zbhdd82861msvh9z1soogr1d17qdc54bkhwm9zxtugjb7fcsjopouwl8ypc4aao9m440wirma',
                iflowName: 'tj4phnp532z5v4i0pq9wia49hmy5dnfwhhlgjx0udex7xjt0swrso10unomf5313gedfqtwrffvmijifhvan77g7muapmdyitr1m5unqdhf8jynwwkx8r623q5lhwghvqqa5qwd1ygjbhveqnk9w8o5qck833s7v',
                responsibleUserAccount: '7u6bk248bs89hebejvet',
                lastChangeUserAccount: 'p8o81bk6s9upbvv2il97',
                lastChangedAt: '2020-07-27 01:00:44',
                folderPath: 'c5o6gdgdr5j2jwiomg7dtu1re5ovmpy5efvw43bdvpezhoxkv6wlrfh8stc3x0jus1a82pad1d0uf7tiqdkiukezki62rfnbwb4qehxs95e2wnbj0amyfl79sq4sz7nfug56ycn7gxxdlxdqb5oqcnepq2qec5sayg3e5lzq41xvqfr0r7ope2pimhskg1wz6xh9s18816gd1c9rj32lr593253lwgtg68tw9ctq7bmbdo8yu79feqdtrcgrds4',
                description: 'ymubnkzk0t5hbga93d7472g3kdllpd66qlhnsf7gjx4wc5i31s5bdropww404v1awy22ad19e01iiz9u1s6l45kqhuuhxof8ykj5lxic4up2r5qrapmkilfk9yys9q22qkp43nkmsl83d9zuh1uckpjyfzjvbopxilbwp5erbx9mnkhxi10u0zya6xq6xt4heyn3mmcpwuacqzyy3twplyab6967628lamxuk8l98ej3v7ibdh9or5o9d0mgs8v',
                application: 'jxst22vg33xd9x0fi4zqt437v0lm0qlv1gw4m7jlfigz8c1n41b4gr0etnxe',
                isCritical: true,
                
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'f8lqjsobb90sw501wc2ndzertj37s9liuq58r',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '4g36fyeqk06vb9ipo1b2pawjwh0s6ly72h2gprib1n3uzhanco',
                version: 'eiwsooe5rqis0jbque8p',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'regsl0421j971ui2epee',
                scenario: 'et06hlztnhv8jlitcldevoifbduryvw7aeradko9di9c1uxajtx45twycbjx',
                party: '5fp6tctc6tfrnhvrevd9g7o2keeh1vo6v8t4ygwsj1ryapz5m3iiyk8k1mlsshb1up5r8fljgxv585rtfa6svrvyrybhn12fk69pt7snw9gtsmll4l8bqiienw7ozekd2a02ervehz3oju34b6wonp078uj67mxu',
                component: 'np4mvizjyexlw7rm60ez9clorimzk0kiylouw98ulwpkvst7lpo9gw8px7tqzhg398zn7rpvgox52jps73n3kaniwtbkik0knkq0rnxbxwuxz0gyqoevdl00giu7i5vkiuy7yznj68nv4s2ydjqspgbq5jd3r4px',
                interfaceName: '0vw54fn2psfztjvx2l1266z9nmum772yvt2tjngus9gvxlwisrvwiqwzlcwvdxl668dv5k1xekkac45wncx5jyhozmpxtj1db1pnueeweo4xvot1zej7cxl09f2gwnprmg7apgai7ily6z2mz5c2iclbuh3blg0a',
                interfaceNamespace: 'kvicdq52g5q29najfoeg8xx4771fmrnrvgej5oqpy2xdp13syngqrw27h6vuzawkrx8nz6rlkhf4xcunjfytjv8lfmpsjoorrh51t2dfzkiuuchg39814mc3tx3v2as7jdzjqewlkyo4tgl4slcp26boe5p8s6so',
                iflowName: '5pr3ojmm1yngn44py4yrj9gqzzqncrsy6uji6c3ke6v22f3wg9kqrgdqv3ujce0kusj49ip5hli4c047hl9ph655s029tcr0who2nvai4yxm51ywkxu6xhaxal4bpou70q93n6js07ds31nk3b0m5pdc1umfbpnz',
                responsibleUserAccount: 'acvh9e5ozrv2t3bz9uqw',
                lastChangeUserAccount: 'zhsyrxqdinl3udp7j0m1',
                lastChangedAt: '2020-07-26 17:56:51',
                folderPath: '1ogajpq7j6veqytioekuqd92midrwu3khoxn2xwvelxgmwgseior0t10rzoiui1uhh2xbalyj5hdl0dxh1iwogu04ay8pbe94w2fcnguqnj8v7dc0qiymxawg6kvs88ox7yrepbup4tby65f5108dhp1wa25x144o1zu314pq7i4ni660dnc7d1im7inxq5cvm9hej9z2b1xcvxxdbvpnqnll7hifphbpf2va00d1vzbr89h2su4uh6m5xbyydr',
                description: 'wn64qja5t5vgkfjvbj1iysa9ga5kbujussmgzuj4suhgkfgous2xcl97roqvxnjp76xqqkfq5gi49hc7cobcrig27fr2mcdq2jsddyjywp333a2u0rsdhwp8oizrmmxnq5qs9lagi73oa6r4cezrnkb2x5gwsuj32aoyuln60xmhzincoddfmq24jmlthfvh06bcm83pncnaqf7rabdi543dz4ueoenslmd4is3dlih7ly2z1bnb9fn8mq3jm3k',
                application: 'ltjw9r666wky3nik4hiotdgj71y255iecvzwt8knbnznik8ja3qq7yiacd1i',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '2vw7vdo8a8sxrfofjhwknxl5uub7z4kt43rzo',
                tenantCode: 'f4u6rz6r959jq29epxx0ng7td7taitdbmiez0sio88tblu725i',
                version: 'q4p8satelyyd6hhejlbd',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: '05fnnlfpyizg544qmu1p',
                scenario: 'f9fqta982khsq6e8tzad8rhi0xwqhh4zp7lr26yw8r6utx0ooye2fs86hyo4',
                party: '6urlz4kieootd119lrm04shrnbz8o1k7qwqaa0b61nunuig00u6kchpae5redpsxg5k0zl23mvmxqowbyolulp3g7xy2koeuv4lzlntfijqlnnfzfolry5vc4lwcfi90t70rb5r8bkxm76tiahsjdfy0hyl3aqh3',
                component: '5s0nnfuxpayyg2s986f5s4otlxl5z8an3l8jyxchq0plkiwf4bau4v4iy82nbcjxz50od2kw1n6x0vz8jon5cmtju9v16lclakgduwbsx6uagx9b3wezb4s98gjqiq178sby9z4uy593964pwrcp7erfbdfo3guy',
                interfaceName: 'bgpqtb9vvwomgbf9iy61ii6dxurgzkmb1oxidpvyy2107wk415jcxm4uf90pir3gfu0kp8tan31apymgni1mr2au7zdjobaafc0bktbq20u8vlzhi8g0q81vbsop63sixvogs1bl5rm8utbvywqg0m4z8rpco4cv',
                interfaceNamespace: 'kkuykxagmwh6tuhdacm0arvi21g3ypihnk7c64rrtywrn3yyzqszdvcvalsrzarj8hldy6ntllmwxwfwg411ydvacuszilyixxfsrpjblouem6xjz97e6apok8kq9qolr4662pvqnz4ou4jrsfukxcgcx8dzi7jn',
                iflowName: 'i1qow5qr3hqhp6uyla32aouy6fjoms5htmbt816eivcqrmj2a7nqvmelbrrm6q33humj9o44q1p5c0282ixegcgzn1vilnablc2jgbrfoa6vqk3csc2ua56doicloyppgl3e0al9x3pzuo4ch3y45g9578oslgql',
                responsibleUserAccount: 'rot4c44eno0o1slm63z7',
                lastChangeUserAccount: 'urjdd9mfwcnassl8xa6c',
                lastChangedAt: '2020-07-26 21:41:43',
                folderPath: '5po4lsoj8od817rtont5bwx0acnwft817kuhi45vl1jvxacs868n3idtr5xlrbfyc8iomgzd4enizbimwccl7r78dwvl9dyw2ge90ulp38h9vckgo650luzkeadqn1qnzdindek371jo5absarzqy4uh0ksacgy2rua0uob6punad48ng6xoj8c6esfvjukpt48j20ngyepuzjsij2j829a8kw6vxrpfcdnsgpynvgyzxyxialvvizjsbaijlsi',
                description: 'nr89mrtr1l17ugr8izwrh4mlrz41icpsdg9starnu50u8d14mndymqtainntgjxpu60k78d6w0irnd6tywwdngfj6l15vrrjuecrojzfszof1luwedtj569elywdxl19v0ppqvzf06l0827ie323esaxrpxjhswcc2mdfz78txg2omnosna7f4b2tv6lu99hg9rqa7y5l58twwtyc4x9d7cd8fvmh5yxpbi15p7ov58qr9st0jf4o4s0fs1gaux',
                application: 't6pxkfhdy5krc3zdlmr3fbt7jylrq0yj7ijeqctvrhocshcyrg73ulgbztip',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'b7412wp7sc5cv8fc23yh0b1s20d7rsramtd0e6hpcwrilu207n',
                version: 'pf89bzs18bxvj2snfk95',
                systemId: '6eoerybz535m8ete9cifyih0dlvmmbunqy9bh',
                systemName: '7q9a6qxq76vfrvainq6b',
                scenario: 'tyft6c1w7951nsq6vf47b37gw11sp5pl5k1e2g0mv4dc8l3ftvgkdwpgfsgq',
                party: '9dlk3b0coabpm0vepid28omswqh57vfwof51r7abcibjogxpfj0crc574351zt1o7k8r0ycvtrtykh6jy5zd2t69omif1n3typ98uftvlc9uwpn4mk88sr21nu2dbvia7v78repd5dyjf1i98vzk1bn0oqw9nkto',
                component: '78obd1go60njr7ivo0rwzgq4yazu2rmdnx478bow3wnu5z19pyok8l88rfmw8qe55a5tj7bfuan5adicweqrk98ttsrb3e5w32xpumuwzvk8n6lpz448rggqutwhj1cdfyzjnrbyjbxn8s5tkysxjb3gzp3kcd5a',
                interfaceName: '1w6i03njtjtompt7m9syyjsqq8wd0tkpxytq56vdqmda8eq43csp6o8sncqisbqalm2bxqdn6p4bllycy7pcr2zxa5h6w5j4jvlpx2x6revc5hc5byjmg2d84fvqued335w0zu7d0xwkqq5uvlf77j3ne3rc2qhq',
                interfaceNamespace: '8930vzq9jqol98s70gtexfzr9z51f1u2kg9tp8k24od3j2fh4iz5u996j13pqhlxnp7gclce80qtfn3ferqcd0g24a1jjrkyxmykkorm14txvz2qi6we2cxj94ig8ehibs1z9kxwqve2akutec4cdg0dx035sn80',
                iflowName: '72hwluuc1hhrt8wcmkt67td1dx8wj8qqmnq62iroecefz3s8lti7up3kas4n5677ciukxtr6c99diwrmbicgqg8ou2uw4skkobb7kvqoilo6f4rjlpp0d7unisdmrkv0yyk0djd4cy4icfsvzmbqhf65l705onn9',
                responsibleUserAccount: 'tr8f6rdwd59kzi2y4zke',
                lastChangeUserAccount: 'sypduyci66qewmsasoum',
                lastChangedAt: '2020-07-27 09:56:19',
                folderPath: '5u8kes5f64oe05snr4mastyhk4tnntqzmetbob5gj5pd44dd6ubdr3nmasizlxd78nb98yspoz145z8g5higvsmcrn5svcv6fjjxoixxwndtsm5oequ61uv97optlj3j8q2d07pxt7vz2fj8b2kpjyzl3uh2vofnlxxfvz2aaefhola0m4oddzvz7ham4x66awcsiydbvckm9fnvefxgw5g7qtb1iitckruvatk4x45ilyukt32osblv0wbjrdu',
                description: 'du3gljhbibulqmac1h2k0z4lyovge2ma2ipuotqz7i6fh2ijysh5ztbjhbuxrajsohxhqa5bqzs53qp8k4dx7w46n371nni9jenrq54ksgabki339a9g7sj30cit8omy8ccf6r9ibb1dfw1jbygt3pklxi5u1il0vkb1qicqojsw4nz69riojwr04borf2f3kdx4fjtl88yg6vu568y2o088aj2ww59rmntsdy5x6x54es2xcuoawkknh5rwf61',
                application: 's83vbz8jih65ltifiqx92w4uwapfn27qbylpqwhweg9h89flw410597duwka',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'avatt95383fho4hzs3768uzofvd53lrch7uhsd90stitb8jn3x',
                version: 'jjtoydlv1nin8ynid63g',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'jfmmwzrgiwxaiacvpsah',
                scenario: 'x9yijamooq7cx9mgnk3kin1oouhkfr3qb59b2d8mvuxdpz52tg8xwh4kiq3f',
                party: 'ghn2wbc8hjq843hu3kyx4b591b2twi4t2tctf19ky1bawar84jaz92ve872g0iyjps0ucst267s7fb5i0gbx2on7vx79nycp3kszntnsumpqlloxdegqvne86urlf42a1knn6ggg0w4hjzkdhl23iqwf9hnzevvp',
                component: '1doc3shp7nb9610aizdoa12ogxucodp9j6kkxv9rczjpzhyq1suwfq4y10qet3n794plksrhbohwxn01jg3cli3dy3efbjdkj9ew8g1zmuiwmv2ybcqbncykhtl3dgl2cjr4b7scmegmc8mq3qa9y11q9d05bzbh',
                interfaceName: '953sg6wuk3dqf6wx1nqy4i8ljhzq8mcgp0xa476j7g0vjy4xlhnj48cgun73q02vu48b8wcnrtkd7b80t7477w5n5af1ylmt1rr9ekwa533yq38qz8s3epdz0vku1fkwketavs06brdhon187teecnlmtm44os9z',
                interfaceNamespace: 'nz5n8o259bvoe1qmoglqhgfdow0cdj5h5yv9fx7dgle7ckosdjayej6ai2tr84pl7b8j09ymc96jwog4oozwr9v4zsp99qhxrgeh3z1zwe78d0hqz9wr9qqh6bfhb7sj3q1or3164rb9p68atvefx6esdq9cq2rj',
                iflowName: 'mf3a73wm4zw88axeptj67i38ly3t97upi4alt2iet5dce2nxlqm2lh1yoha2qu4vu8pqjvi6ki50kyini8gxf3lk5es0cw6rkeutczlukrixqtxjpc47haftlmjnna9j7ohl08ocwvi4i7end4o9qm2aqzmr5jaw',
                responsibleUserAccount: 'lklz4ekxleon6ihs4v10',
                lastChangeUserAccount: 'kesx26hgu12ief8g4llu',
                lastChangedAt: '2020-07-26 17:21:00',
                folderPath: 'mc1461i2gadk8d1kevc1bs2gwe0a6hnib2e9w3a3ubr7zifklh5b8atpcodmduiesja8nshnjzivr1r3mofvlh27bk91fnka3yjschw2oxnuxb8hmhsxu6km8vtzo3cd6pldinyukd3ymv0plfwtbadnh5rhrztd8vbk6i5jq9sm7dg8pd68dqni2fenw81d7jx8e70lt5b1d4eyc0c1ti2enbv8tcq16ub2g4mz5eyrro0ldzcxbv1qe3gt0tm',
                description: 'r7w3czfoulnpvy57ja4tg9o6nam3frwvd7g9urb8qiamc276ogo248a1p4d3f2fn64wm4u87wf1oqsxhsnak3mr5gypq5itool26q3d8xq1ebvhg82oruyz2wg76v9ci90enpwna7fphrhxzxddb4ig5x6j6a6rurvey2bi98lp5qef0xzn5bbkc6rl3wqwn6dzawajm8z8qxqqduxiguxqtv7n8nrclxl1570qi9usz3l54l40xk7azukqgsx8',
                application: '1j68mpb918w56708jgqnunu9xr5qsi8e4vyxf03mo9498ltzslnxog720eme',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'vh46agkm6vpy7g5blbhi0hfg3dgjwgv0ig0jy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'elqkvbt99qi84vnuelxn6vnd5q4jbix8j2kb1e88if5y5o0tcpv',
                version: 'dhz2hp6gp40n6l7ybj33',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'd6by305s9e0502vwqfu2',
                scenario: 'u06xy7px7mx72d1bxpl1m9qjmkiqrospuquas1b124cdlknlavyvu2573qga',
                party: 'anhc4pjf4b1pauizq8wkeoprpdl3gnavi3cxbqk7v59zzfwxq0xcunwab55r7msur2pialcoeswl4zizjnp1dbssmygxda10gb8psybe03zhd9vdxb6sdxjlz76rqo7puvh24w3upc1zkb5etfy7wtfzp627jaek',
                component: 'iftj6tcw977417o7s39ica0vhh6tjoitb5uu0o82nurpcsxmhstgbe8b3j3w54hx5rpd1vtnlpvnlk8pclg0jj3wasv2glw8e1nc69gj5nkj6bporgnk1g6whlp6jz9xxawbh2qeq54k3doa9z2pna51jahw59q8',
                interfaceName: 'ohmg8qi6qot1dt1d8iqx9qsdjyxl0mgg19nll4a25d1i8b4ohsi4j3cos7y7mlkt2msrmulhle57p3qj5galxlkislbwx8g4819j4tbekye79pv0gtrjtyarzeptetcbx6ntyb21sj9zpwlvdsy3gk4l02axpfqt',
                interfaceNamespace: 'i5cjxtxv0nsffjub1498e73jv4flea64gputjgytx3zck88za62pq84zc00rb7de90521b2ljejhdtwj1cfd7cp4vjbgncl4hq2mnxkgb5ygj0epbamwclga5nmmsgcg5z462goclf0gvhvkxq4bf1ytqfazphu1',
                iflowName: 'x46n6zfk0byyj4x9iqb5petk2idkit93pt499j7ulfyu38o3lh4kpqxjgfivfj34ljwm924b3ry4difbiv84fgaz3gjcvxthsvc72s39f4q90ux7svxdymtmnzvxn8awfb4ug2l0w12ol9o2vu6b0i81bkfijamf',
                responsibleUserAccount: 'gkm71pi5crh687xdw1i3',
                lastChangeUserAccount: '4008d26nu7326a0g2sqr',
                lastChangedAt: '2020-07-27 03:35:28',
                folderPath: 'tvz71th1tmrzeyccielxjmd53ys2kj4ul17bm1f8qu362qggllsele370cm0u770j4vt3i8mc9n82y3jql97h8d29jetjp8chdvglpeifca765axy1emjg5e6p0pech08vhcf6su6v1nuq3ve9gvhokcnzdmxz681q2npns67nj7u7ovk1cm6j1c2gxtupaicsnd9fpijn578774tjkcunsym3of0h1gpte4k0sdmqdslioaah281knud2rpvz2',
                description: 'lp9pvuh99ptwvrnlk9gb3hcdgv0mexqh1x2rmi413jssn6bdq0bzwugb6t9zfhwm813r0we39phv7vbdq7nwm7rgr839pj9n09t9ib4hgmstszmkcc14oz2838jqtsp24cobog12t6e91g9rlshw6c7xg9doa523vq6mbb4o5b67y88yl26bftnfic8x9p2rmxbho6jj684wr33opv9ukqospm5arge5gs9yp39sx8gynzb52n0m1r3ot2ijes8',
                application: 'ma3kkmuuzg8edq8w4w1z7p2svcv030tfszvn88j4zb6i40yptpwt2om6t2ov',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'de0blyf1i7te6829uvmxyofzx4x7yu8jld3li0n4eyl77lt9pm',
                version: '2f4q4fbwtrpmibocrynx7',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: '4cg2uvos94tgqk4p968y',
                scenario: 'miyiiscfi1esfny7s5owe2zowjyg964en4s1oy75p2mjgci6178z6hl178sv',
                party: 'zky9xqr1r85bqpgl933nj8fjosa9sdx2i9quxgwun54qhigpbwpwfiw0g2yj4exjosok3uqgjpu00cik9blrpoy83s0hp6jxq8lxrixkicoai7j0ozfpeokdrd1wtm6ehxdtp57pld1hwgomcctnvomdj755l44l',
                component: '9vk3gudwvgjs1jye2wj0oxdzeabaqnklqvps0pwt4zqm41z8jcm2hawwsibll8gcyq628dsmh3djad6qe475939iu66z22rai6py88xlzvzyvwhf9tn3qejwp36vhns0vfv79tdfpwg8fyh4t5kvey1n5ymzpc5w',
                interfaceName: '3wvqq3yocvjguxwnhg8erxqnvq8cc7owt2em8wo00kf9dka6a8b0l0kd5nkkl58j0qyumkmpstxx4z5jjx9snlyhx8dgtrvmxso6u44tqnxsq4gb9nd0kn1fy9zvjtipjvfluuasuy7grsa5p9e7vk8s64pqg6dc',
                interfaceNamespace: 'yal6y7fwvvef2ie905c7aq3owxq0nyttcv7p91lae9cvxspjyp01qrjqsxxb031qmma2ulo0yj9mecsdvy9i3m2tz2u8vvqdb9ldrbaai5w7wi88rczjvkr6il752xe326iahvf5j2e2619vm16refk56wosococ',
                iflowName: '881sky03evpwlayq5jzz2pmzw6upfodrhft9bh2as5v69ifsjqgt9n2wdn4fxl98eukjlhn75pqb03e29j0ls6fobbwf419qq31lukt55xzz0btassxer4qosp3zj3zasldb27p9l8ld91e1gmj2kj1ym2crepng',
                responsibleUserAccount: '4g622fdqpzyidyiqhike',
                lastChangeUserAccount: 'xa8az0k062vlc3up8jcg',
                lastChangedAt: '2020-07-27 01:31:13',
                folderPath: 'zh0ubt417im2vg3g9i3gw11wrhcz5uyf68bkcjge7t5ney5kajf43fvthn4l914u30aqfuqwpqm17wmojwuswb61ndluwjjx216n5roc4k1p7h6rawifb8eo72kmpltwumqrfwmsdzmscxh3ywxqnk848ytbo2fvud13hxrw5zepy4q85e1t08j48dnfv3vvmt40ugytlcwq2122m49kavu9rd93djccyrnbj1vhu4odj21ogjjtta17fo6c9p8',
                description: 'mrgz96q5ndr4f2cw3zozkh2l3unjqjzx90wv7i97yjcl47va0k8p6rf0tyb1mq8gt51v86jda6939z9i7fslcg7ab7h5jikkrz46bgajs50ttan1mvh7g4kk5619fy4m52cc2mvdoons3fmg1c11gavo3hwnb4rb0nwztjilu1x2z8ipq896z7s8fotc5yy9qlmossfc368fd4itqu3unpba6q2wqz9c3m5dpi83dwmmrjucyk939td3p3gnxw6',
                application: 'gz2csw9van73qq1h67qwru2z573f7imesfspzj29fcn33enxh9my4d1sdghz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '9kg7hvjbwij609gi0ln9ygbttv3dovawg3qqiki74s5sjuvoan',
                version: '37l8birhyygbh4ema2im',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'vrxzpvvyo6e51gfrfm8j7',
                scenario: '2rkbekduci7z4cvsevmrfu2aza9zrfu4si3xteknzeuseehf9jy2rb33qiqw',
                party: 'rf1thl02rmut05i7xa0qtb5o1iuk9gvswk43tiwx0wuxyffoyra7grqtov5nbpf2qwxi6oaut5uvxbidua92pa2gzi6g87l3qvr1o6nlfm637sapjdrouq7z2syknzauhb2654jgdiw1b1hdpe8onfl0ve9evkjs',
                component: 'ugbgxv2cp70iwoswdhfs9le7wzebih16sqxf8yyq1cdarjk4cbej30qp5uegode1prcg6w762i19rvd8tehftt7cy6qgcp0gswocr8xyoxehwm8eov21vmxiz6bhl7bz53hyk5g865h7kkx94zwxypl08ujg2oto',
                interfaceName: 'dvn6vouu1tbewlectpp7ktgh60x78y7iryneol8ttcxmbajmk7hqzzjhx4gci9goori5c3uz4gjkz9aww81m4yil2i8069jmnr36iwuixthf9wf2irxjqj1ydum1a5xwj81r58q19zs4dmw9xvm6czclqcrs1zp5',
                interfaceNamespace: '9sdu1af37wg6qfdx8m615yf21v03jx4usmeklzl14eblcm8z6eifpjp3ycr221an5gitgvhanbpm82arvjum3b2pn7cdlsczyfs94ch64vlk8y189jaj111xovmbzg4wy5qcnxxtjysfhf5hgvuxds1buk7d91q1',
                iflowName: 'q22foi35lzju0bxx0jlgjhjiuecw5xr1sbdst3xt9imlbcb7ilv6yjwed3eimuu7c5cnlepg14hi2tqkoyo69o3yvp7fn1m2vbln4ohx5u5x30fv1at36qajj3jw82r22vfyfjeqypummzay2iog94yo2jss0qao',
                responsibleUserAccount: '3mvt55d87bgohrxfgkxq',
                lastChangeUserAccount: 'kiqdhd82rcf0kivwux8h',
                lastChangedAt: '2020-07-27 13:11:08',
                folderPath: 'b43bh2xr37fa8il49vlpn8z7jtcnyhq1a6qwfyz0bndau7f3ajoub5xo41iub7cga0jsf68tsfzbhi2te1cy4c4766tjlok0jeqz48vyp20u2mq2b6845al4vr5q7poqozr0bq8yfszrvx7xkg97ahhvugktmj1658x8flba1z23bizxh8alrgtgrd9vydxe43v12ixvmja24j5gb8wtkhiy7cu97cnatbcpui90spjrowi5mz698wcm77pdjq8',
                description: 'te9ywif63a41yry21liochiwgwz3ahjczut1for8o4eaiuzdx1k0spoatum0rolwf9eeljc15x6bugmv6hkaguh409kt43sbs1nicx91b3i20gkgc2pf5ozhdl9a3bfbmuctj2bhvyjwfa232ka1cte1hl7jnkf2w7vwwmimnlvafofe3vgeztk3wm41fh5w10fkfqus16kqv99hevzubvp3mery83uyajewa3hplc19v3n81j31uzgjil2neeu',
                application: 'oiofg6g0ptj2j48fu0p9pm3wegns5fhvf42kjo22vwhwtfbrmv36r8ycbtkh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'xllfu0u0clewt98s2uy14tpe4vy7tuw62o55ya214doaugutd5',
                version: 'y46ohtiksvcsl25lj338',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'o61rtndqm1bjl6ldw088',
                scenario: 'wyb0vbocpxatsvmxwcyq0m4pn9l75lgufgebwx86wuau85kwcbnf8s2i62rgn',
                party: 'lx6th82a1mm8m0r4d4qxvdvlrkhktkrls65imlwmi59q6ohqlpzww1wspxzp3uqa8sh325pa7jf87stqfxx0oqloe0y8ghn1s2m8jv8ucx79ysr4knw57x04i6vv6maeccry5phk4hftj15n8sq60uwyufm5qgzd',
                component: 's7euotqjt7t7tjs8f3zwfr3whrcu5p57mvkc7e1lphh9o65fxvdbi2h3qll38wyvxo3bp128b4i8vmh63vb91bpxpdp69dkf5raqpz4y68jgsf1djquq65fswlahweuugljxh2xfidfkchnasb9ghfkzn3kn4jzh',
                interfaceName: 'xzwi16zdigmsu8znidzk57ld25uklwa13ubs6dlc9y8o9wyo4ub1280zcdkd44lqw0muecm5o2rl9phpil9ncq13aygyyx4zitze696vm332o230xojp2cxobpfb168b9ddpb6udl7cn5jf7cmgptjxv6ets9jw2',
                interfaceNamespace: 'xx3dlxnxc5mislzgyj9oki6l9k9xho5n986q0tze2v9z2xj8mubjg9dcm3wpr3egftxkdnqursyfskia83dsyt2k2l9oet91ra1m2in1346o2ndrsoeupyiki4a01s3zjsscemrffgzljq347dk3u42ffowwgyhl',
                iflowName: 'fkb7awegq21zrzf120zy3171xvlwl1pg536wsvkjs8qxogoxlbzv78tmrgy4uf6uiqoddmb2zjy2by3du6qi5svdb1qox40kr6s5zjxtbehdf8zfxmbn078f9phwxt32aipv3qqmziqfhszl7xfkwp3u1vq09h9y',
                responsibleUserAccount: 'b8n4phyhzd2kc7bfcbie',
                lastChangeUserAccount: 'vvn9lvh67cjtesvtr6p7',
                lastChangedAt: '2020-07-27 12:56:09',
                folderPath: 'f6cgrcrc8ebl42cxhiqyw8tbg4s0ecnr2oesm4bdfv0hy3m74iqlmgmopz57qaygpywqv7kjdsiizo3kxvnpkvamybpqkffimsxuneewgfqjuzlno00c4ta3jhdlw6kvrylf1aqkjkg766iev3cl7h67wvbyck86wujwvxgs69s4js0x1dwksy5cppva3sl6wmv530zycck5iri47ojhi7faftws19bspbtub13130h4lcqklag0nvv9wmuj4u8',
                description: 'voyzf72xg2b5uknhlmy1da0sh168nqhrhnjx4hm6cra613oibx2qtgdcw4ch7n1c33aqwrlu1px0gh9vx6jlpcfcuwvrk7zfy3zefiu0373d3xwl0atk4sm70l2aphmw930a0e0hjlw8o04uivwd9ypaopfqvypi13dfw6mgmy9tf3c5j8nrqh2f6xehjozeh6rg9bjrq3oqz6pvp640x2kcxaf2jbdho0fes4os8gjc0k50k6gbehjeq0xeh3h',
                application: 'rqa0ijstm4o2b63tix3ommp997f2k6m20tlejmj5b5x95d9ip5k9o2vo5i6b',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'gx1ybctse74yg809j4g9p1clb9r3wmb8hudeswa9st9p7kiitp',
                version: 'plw6y7idlyhtlc3se2hl',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'rbvszitpk1ukys4wep4z',
                scenario: 'sgsvumhj2eobl2zvs9fchfoon9xtyaxhrwhaqc1na9w0w3ukz03r81yc9mhr',
                party: '0i38orxuae1a85qsc5qamssb2aqz7abkfys1czpnxul9lrq1ze44z04sm4c3zfl1cgxm7tvdopxhphjow0rqqel7u1kbibvqi38pkrmh5jk3cqokhabxmdh7lig6bzdbg67c9j7yp378dddxel0dzjvk92mzfognk',
                component: 'fmubcitr6m78oa1t9532p1rmqnifxo948eu7eg1a3jkbj1ujchc5djwge8qm3yrl3gny1ag2r0g8w2a682hi9zmmsv466ntqx5nwju484yr05dvb5wdjbnt8jro9rzeete6vfjj7fd4pmlm966y724hq471pc0wt',
                interfaceName: 'dwgi8okt88s43jzwt6m2c8c3zstni8xn5lj48z7jaejmt3pddgkfvlaz7e7ipcvzz14hihk46xfujm6ywlmw67p45bhdo0sdhp9onc4o8g29hqu5ozzpmt7dmpaeyn88n2h94yc0mb7p1w6z35uil8qvb36c3p9c',
                interfaceNamespace: '8aeos3z9cnjvpfweg5aj7o9fd4cd74ew061t8qdeb6dfbl0jszf6ggbsguevgu5eh2eux06x5g1ocodgxokx90n1r10uer4e5ta2jrhpl7abc6l9qpf8hpxji9tmk4jmsji7qbnco908txiq50xpkv7b1fy75ylz',
                iflowName: '93o69pbbikltfs8iqt4ypndevioeef608tvdr361uby53gft3r449g7b3eynytqv40z9zi7gzbvlw9elbr3ioy0kvah018oeu7ibgr7zrb124x0tlhnr1o238sg2advtnd4eu5f2cq1wn71w88mo87s9qf7rlh3a',
                responsibleUserAccount: 'icf8rhjbefuhqo8hx9je',
                lastChangeUserAccount: '9pxkl40k0l0awg9xl6wx',
                lastChangedAt: '2020-07-26 18:37:14',
                folderPath: 'cnz0l6jlaznw8ubbx84nfv04t6ywh5yc0h5zp2dtiqc04nea2rb0zjytg8eavt4coqcsyoc3sq0vyv49hwnb2iiu36r7t467egtmvq8fqglay9jobrs3q3e7r9ojj64zkx9fwh9v36i1l4aor1009lx5fvli2pwod9zfsnesbm5n8zcw7j06jwo531ys810diesnftp7mkeehaeyjfwszi1wnemcby9554m7gjjvbwb6bqkzh5i9zye072yp573',
                description: '8t11g15kdkp8psjr2bna4s7fjlzgd6rt5yh8leb9p61mtd54nc47sqhrbqodhxc5m9vvb0ggqkbnlipohun4btfxs7domf9161eeuqv4b84tgaxmf7ls8uiv6wmoe4b6e3q84exbokoaijql2vroi5kli6h2wzxs39b5mqkjhrfp1kcjv7z3uls7xcpmd3olrxnfnxvlxtngnw4s7tpf5ucaeuu9eosy7owho3vu5h0t4oqxtdn325jqcanp0rm',
                application: 'yea1bcelp1x8vobmj90iep316zgtvppz863jgecleqoesvd94de8smcvss06',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'mcj7zwp3kbhmpyb60ijnrdmqm446wdsxc1igwf0806gc7j1pjg',
                version: 'gr9dajpzlhrg7xaxsgux',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: '883gh2p8dxit02mfx941',
                scenario: 'rfsn5dxf9ljaefge4zy8xwqb0k9p9hmv3qb04c915opd5h1vlje4ug72nu7r',
                party: 'wxjzssphk8y0qqegvd8fruk3bc1wwq7upwpd14j094oiyyiqwbjg17t5z7lpgr4q1hjrsi4jfomcs5905nbh1h2brfh4v6p7u7dhtgft0j0g1kg2gprafj0l0drfjwe2c5pgcg4vrvpvav74hpgphix9dx7n9vgb',
                component: 'ltzal0x1hjxyed13vm4ep6pub08bl0bdy7urim2t80hpxx1wv5xsua4odyvyjeaucc5v7w91alhf194eyl4nccdsk9h5ojdo0ha5o9wu8fauco01re20whw2i8w86u68ka0o2v1epykypfamdxsrxgmp0yupcnkgx',
                interfaceName: 'd4akeeoj9kjvjghs4l6jryidu6ps31sfu495qhqyftr9p4dn8jwaydun8yhdvomqa1gnrtosrflhnria840az2y1yaxf4cicpo5kgh072n9241r7ccmbsv7vxzu716isrxrqdg3joau9vd21pwx3y8scr7katvzf',
                interfaceNamespace: 'rmfxtbz8cyyfdawj1q31jbbcluw9qntlr4fjbp183efe4jdndtvw7yx1czsbv3yrw8v40orirasvzl4brgn1olbn8bx2a2mrwbg6zzwjoja2c0wzeg86yrxlikby3c79o6bzapx93rhq5epaujrzsp78uw1mxmmb',
                iflowName: '2ogsf4r3s4anjvd1ro1hd2l88wctir3lgnit1v4ucrzph67z8hehjo70o41tjgr3qk7yllgw6cnzq2b2blh6eyms1y77371kqwwr5z1cz9zu5218p899ssswklsvn7ob2sirchn2947orbaf147bc8bnodf7hcwj',
                responsibleUserAccount: 'o34760y6m11hjttjzrke',
                lastChangeUserAccount: '5d1ogyl18rhslt2ia67l',
                lastChangedAt: '2020-07-26 18:52:58',
                folderPath: '405lbby1ek0adbs2em23hq7aqizfslu677yjut0tho5zq516popr5oua23393r833g8q7nmivywtklrfr0d00tww22lo4pv7fifn8btqmjkvtigd9906jugbq4nv500cu6rctnrup3d70t3j0y9a9iid1nhs9ub1gwv8stdhmjdl5buu08wvfag7ryxrny7es9314xt2gf4gredntyf0eoft4hictzp93r3h6bpxnbsmxh919n1s1cns2cezlj9',
                description: 'xcd530fumoqv70zfvdimd6s9vmwutfw0cb2epd87a0puyw8lj4ghv9wgh8b8k2hpsxhu8egbguhtayv9zb0svbnggdym8t0pl51h62i7omd1s6smp94bjx9e4l5ijn52umt5a00kyyxcy9souxwzemf1f3g8vx8o9mggz4p1t1hc5g9ebdmdtsudxdggj1mj3gdtvl0kb2ohnwmn3nrvzexuemqao8yk511jdlfa9wozlaqzn9nk4lq1iq6rkgd',
                application: 'bphnkc5jn3snrtxrxe8svpc0dyifk5rl3ocu2ya8aliem1sycqu6qvg77ato',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'a76zi95rtxbu6tmhnbj8b5nq2pmayhzi94eqhl5syndcpp1z9t',
                version: '1ytzjg0nq3natspea79e',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'k05bctqfk143tnbo7co1',
                scenario: '51v5033xodf9y5u0r8bbz6uvu6wgv3cj603arniyxspbw1qgv37m80vl6uut',
                party: 'm70yao1nmymt45pmrbunm3x9nl2y2elvrxvypytldfb8o6utlars88hldkurwp9cpur8n3zqcn3amlol2v31rb88digbypb7riyqbjx1366f4frqf17eiguj33mr8mmf8yuckt5uvpprcorwwlq7q15cossvy5z0',
                component: 'x789sufc7qd26p1vmmr4zvkqrif9ixzkf7hxvo06y2ovxuaif0fkstyzz0oxqn0bpcq61lultg5fa15ogrr2wcogvyebuhbdyt3io0t7qdtg73z3rcf0oly27ddcsfbfmtwkrgp841v4z4lw8e3gh1ievfoaqbk6',
                interfaceName: 'ppp2hd3x6crc1vhpj9jyvj8qhyg20y19vh84iq44v23kpi9rc8xkfe3gxe3jvb4h079xw9tcost9p7k67cjbmgheg5tu5azu4sagtd9myad7slp5gbtcrf0t10w93s4isw00jt0rbxipeoqv5pv7ii1y6mrff6gdv',
                interfaceNamespace: 'c3qq7cmwnlhdr5s91wy94ew7b2s185guolxq9u51gtanviuib7ky1fsy315ewo6ri7mqverh9jiorzn58pxhdr2ldq7yptg6k6sauehet4m1h8rbmv4ozx7843dewyp34ikpolxhw5v09u74fgw5l0pios2tzwvh',
                iflowName: '4a5t24lv2we9k8luon36kwbfihk79rgnuwn3hpli5pmlekkqct46mggrk091w46hufd070oajx16z7dzc8vpx8y3ni0fzrtn1pg7fhjyydcn9u4q1dyfarg9jcsu9tfi7gp7c60u5youqgccibdlllypdz6j6sao',
                responsibleUserAccount: 'y2zbuj50y00xgvmdxwj7',
                lastChangeUserAccount: 'cchj3nu7yzdgce9quxc1',
                lastChangedAt: '2020-07-26 18:17:19',
                folderPath: 'ooek49ao7eodizdvsmofow7wnlvb8br7m0nn5pom1218jq4xob2kpqbepovpvj2p5oqk887f32iie4on53fcg89lmp1tbedobmxx81e4ci4holuwajw40c4ptdqrriqyfdmtkixwl6a1bls8il112l065khkye7n7qd7bnxzr8747rh7avhrczotkk0612nbqnse2bun5ds4l0q8zdyy4ly2lqmos2ar99kun589ghire4nz2cytiq40sr2nfr2',
                description: 'so4ejejxhfsjmjaz41jr5d6th9npvn14jy6byth8b4ux0q01zeai2tp5e5nch71g0vdpkrweswxxpcyy3mgv17soz3ru57kew9lgmyn3ix5p4xpuavo22hg9oxed4dk6aicc1wwg92pdazn8u0c9deb46i26c8qtz9vda1tgntd3trr9457lypuavugvpkg324sz56tnptp19pftp7gbh6xj50y9qbe98zfxi3fz3fpf1dob2jjrs2tnrtsz6cp',
                application: '9tqpan6hbql2m6nk6amllc0mklp357m53vddkb8os39icltfjyt4tf1ejq57',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'u08etw81rflodgb79ro2sox00nxdreo7uxg3h8pm2hsxh2qh9i',
                version: 'y4zi5mrst3dwp46gd0ya',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: '38f01m7hy9xwu9tjjwib',
                scenario: 'eh1z6q0sjbj6yx3xbf7t45vrepbtv6n1706xkmewdiad8raodcbi08u8vd6s',
                party: 'd3ycb5w0aakf4742k3pe9jbpk3eiedpe5apa6a5t5tutm5eisl9yuqgybgazbl0f8ggu3n9tvm22t6zjcujj9eii02eskaboeoek6yeq4l5friyeqeo8vm3uwi8jhr11oi96yfon7wn8ybj3wfr6251sjhx4kebc',
                component: 'hbsgri4y27eli5pzpmob59wfharv5bsu5ewneiuo4wdexfwode1vzkf48g9i7cjdnim68n0du8ibr3r49swt42apbe58as4ukk79p78qlz9kjbf3d8njapy0ljt8t5wtcfov4alqvmj9egrf68wcljd35yfvimty',
                interfaceName: '7wko7it03wat5d0e547vdzicppvk8vg0xyafdbyuig1rvyykxafsh38h1i795m4c99shaus5q4l05b7gnwhdcbkqu9o9cimtlhkjh8y6r66f44za34ofmrlgl1j7vradzyuso9bc1o8chxj60902q0jvp88nbuwu',
                interfaceNamespace: 'h7m1z69h153hrj215wbyx1emgyea2u99riq6gzabozymy56p4wzp8a41adgmu6wb5eqfckcc1pb3cjbnla7iokzcpjtopuhw4xm0cc3fit4h71y6fkzhzhan2uagpau6a2ta5qcusyt98yuqmibfcwxa34wpik1tf',
                iflowName: 'o9e7ywih63p8r3iuvlf121x44dn7940j4vvx3me4m6u68y69ijt4s70f61pciqd8xklvhrf2lagl09h36nrqvmmyl0xlw0vy74qiv9uw0ko0t84gp0rqo7vo6ci6154zw3u47439h09z0n03pwucuejm6nntx7e1',
                responsibleUserAccount: 'bqve4hr8hr0atnrbdoqn',
                lastChangeUserAccount: '4pzrr1w8ff8sqrrrrt5v',
                lastChangedAt: '2020-07-26 21:59:13',
                folderPath: 'd7424sz31rr77hrf0wwlxtu4uvzlp9nyjc3uscv8he4e3pyboyhrp88gyqzv9rmqbdp92n157n81lr63al3dhosyjk01xe29v8ai6kxihu4coc9lcra2tbny4f2ffqipbbsc1endna1by6zzydpqv11rjhi5zs7zt3scxfb67w3cwrffpkqpenphfxmpgua2a68jd4i2z9doi7qyf95ns8bdpej23bbd2lp4lq00f4tjbbbz5ej0yhc2vlz8fzv',
                description: '2jgl5enet0ivi45hecpfxvey5t2ezj9hn0lyqxoor3z2pooylz7ig4zr1adym751uktgbislk5dzit87pnd3hs7crqr650o3qmfqtrcr94m8p5k3vms4y6ypbbuzb72unkgk9fw98eemim8uhlzohcl32x474awlud27s5zcxmw8nfr2vb5okoeddyfwp436sxprszxpr2gdjx0flz3ib1jomdg6ew9ulbcxymwj8m8nzlw2d299ejezfva3mtk',
                application: 'oooanj7t5qt16eh5zp971ewm74qqra3nbgmp7pvu814rkvnccsp3xenadhnw',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'c8tfmx7xyrax9ivnx0xe9gmjouxqfzvps0yptmoognu5vte0lq',
                version: 'hpwhz2kmbu2ah0nu08i0',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'forfreyaxbyvrhoy7o7j',
                scenario: 'm7y8uvupbd032v2g1s14b4hhqd636gatb73cslotezgps9swv58s1e6fca0i',
                party: 'v6x2g6li2wgsp9lbzs58rjjxs5tzzfn1vkjc25kmp4ep5lc14imy3apsaa53qhcur992vptfw2mjn2sk2ieavpxq3i9rhjeixywqjbu3sdqhs2lfi8eo5uh7c4ukpjhj235si4xog8izb8gwnmn01iugvdwhvxt6',
                component: 'fzcn1tg7l1e4hx5bhn90xhm8ewgmcpnjvu5byt9wpdj3o9cakb7svrplnntv8k8n5wp7j4gfzzch6et1k7yjri505k9l8n28tr2rr1vghx5yygqfjdak3uu63h8jg8o6nv6rck7id71ouabasi5ljm0oaceziyhx',
                interfaceName: '7fhzzwhjl31z44j342uvh4zzfn4jxwwqkhf2jlawm3tx3j5sgze83dz8rrng5wlwy1e3ztgw46rltf9prpqof3bt7icrrjjmsnxxlju7kd7t0rxe9gsxn4vfuc4j9yilw6nw9dvj0c2j4wiyqdfprwyf44ob4dqn',
                interfaceNamespace: 'gl9i3x5qowazu6w2fgkgp6bklsllb72v7j617yvtx2w8z3mkcxrfics02daotflkek0flbfy6pphugvzcryktjfuao4ccjpo15dlf0wzc7wtlfmlhcpnndu5qbssybm3sdcbtjuwiwjzeiejlkb4ropntub6jt01',
                iflowName: 'i0dpgs4rwaqcce8bi06s2ccf8coml3pp0aeqe3mzh86akworfrfmb903i4myw3cj4xiyjj60mnj9p59vw95h7hz1om1u2oqnvgb3vz7yrwusruan2kw9qp0kja0tvfnqv7tbvno6cte94uzpt2qyqu28zsgnwzlgi',
                responsibleUserAccount: 't8fhadwnwli73vzv1re8',
                lastChangeUserAccount: 'o3y0m50ir3f79i65lhty',
                lastChangedAt: '2020-07-27 01:29:31',
                folderPath: 'd5izafyrikm72v2e2ug5e0ooem6hj3k6ieso979b4sm2109pqg05jaf8dscee20vg1sj73glcbsapmiwbayrlrm4rkzh8n3qkd89ljdxjlknh42bjqr1wd2ycgmjnyuivylwv5nh7uc1dyt4bcvym0px2b6jvujdtvk34kwbqoyjxkugjo4g86uu7fhkhppiwzscvmw2bi4i8qn9gqkk5ztguwybmordyupzjnqkexg7gexvhfxr96yotr7px5m',
                description: 'kkrnjvy43rh886bf7uwahhnl5rkp09fg8pmz9k2ocf28czxeiq2368ex28wick9fx88h5a9y3wrnmho0kuv6ik4lq0g3qw80fh45cqtzqrb6azp4gspsz949dnhi6sfryrbgf5ylux7wpq8z94fftmoc9c1z7frr8p6tipcqvctlzkdugg4zjbteh8ktjq9h5xiu6294my9c3zwvgo4yzfrxb08to6off0vfgld6xscz095qvryqnrjkne29fzl',
                application: '58skc7sjocw64ocy3oc3m924bb9d3sxlsu3arttxi31r6msmmirwwb1d01t2',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'esjx6femm0dak5iims2ov8efa9bnr28lxr66ozjcs3d8s6h28f',
                version: '19unxqcoyks23gftz90g',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'sn7o12humxqnmafhssre',
                scenario: 'qb1346bg9urcpd7jizy4ecl7209rbal52l7erqn2tmdcxkspdc46wuco885d',
                party: 'z1k0b55arzgbtbp4kfwjc6v4p4lpegekrhc0mv68jyy3wj1zn6bf789okn0x59ej5j7mfxpu499ay4nm3njmjrfilv7319bsjip3tfkjv80am2hjenh6iv11j4fmpgi7ilumv4pnyxpbb224q5hv42041ih2j5f2',
                component: 'vw7tbtj63g167cg00dkl0eryj8yslkqh5ftg72x399on7csgddythjkuamvouu3fqt9xuephenbln3sql0rg53usc43arleznylukgzqxfyzth7nslsa6q14j4i5wrxjyvchgwgq0ggiqeuthi8lo31s7flji3he',
                interfaceName: 'tfg1dbwelroptdg8rjukrm2dlkxkedj7f5airryeq3gv7rr6hmyq6l6ldjmt1hruorls2minkj0sjw85vtfoete8pgophs64j2cne5mp91c1h16jakbmr779dlq324bp4ttpbcmdhst31qd2euxpisb881axouxa',
                interfaceNamespace: 'w7et3y6a1b2l3ttvmqkkj47tu2k2fmjb2w8r82blydsxo27h8e0q455cpaleyyh557qi1t89v0wiwzc201uaf9kjlprux0vwab7aecb0bo4fvt73sjj2zpm65yvge9ok62hbkj7wpguwp1e64u70abz57p2npe7v',
                iflowName: 'lrcjughtoqmkkuz27xi3gyl7ptvwv62livonxdmv7xpc7jmk7x7m8l5at5cqczulxow9378en5lxkymv2w9meimdh17s4ps99q7odoucw547y8kya39rgerrexrc2ivh2tfnc1tjf0kco7tvcdruy7ch1trc7tue',
                responsibleUserAccount: '9y0qlssdm0qogx2116i06',
                lastChangeUserAccount: 'b9tl9ye12w953u4xjqgb',
                lastChangedAt: '2020-07-27 05:33:22',
                folderPath: 'znbamim7pq07hactejrq8c1rgyh5rsqc3pnvg6qanhgc08ox8pn6v8elykg2i7x44i6wtnn5xjqas2oy4f60oa62701xb0gdlz98f9qa4sqkvcv7pvc6cendn049l83vy3w8iuilskf6vn6gnka4wh02ri2rrvirwgk6razkh331gm8ir9zpjd8qb8znj6f8v31wwegy5tcz10rt7itnlz56tnojo832p8kxvxyo1cw996fdygprh5xckpgtu92',
                description: 'rszrbnwp04okizrgpowz8rx3qgn1oyld3ympzyy9ymzkkdoq62l9c3v4pgo0vabyymlfcnsrjqzt6gkz64e9qiz2ee8zlmf6pe7cm0w8bzd5gvlsf30rm05x9xnngby65dhjl8ky1q9j4ejilpp2s5nfsx41e6ploqe5vu25fzpwlik4o1va3y18umqztjwsx36bn08etkf0m74htsaa7kkv3p041t3cvh8agl1mqqr64i5pzpy1bspf5vfv202',
                application: 'rlapvbtrkacxmuwm5bt3b8x6em8jwp12pqkgbpasiesggg357swxhp25hnud',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '32w9q6v3rih89wh5e4n0yuaj4rkiy3bbrqxnzk5djw9kl78a0p',
                version: '27av9w2rd7ikphj3a88e',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'ho996f2pxx71ls6usyi5',
                scenario: 'odvd8f2yu4gu2dc0c0qrlem6m9q4zwpt19wyf012dqixb4i5m6h6dabwymlt',
                party: 'l0z5bvwaqo5hifiml0rwv3teylv448gtrw32hnpg68018h6gjve1oomxox3n27zlbb2f8zuogacq24uget4r3rnhfxoadx3sk0mmw7n431j46gnlerckbpqndq9p5u768iagsk6lcghbekepyxo1sftxmid1yflt',
                component: '5am598geivq1r4lvdoov0e02hj53g2mpjk4l44qztadus9747adj3nvfnjfroruvvdlwuoy29vhmlh8flfn2novu7521iyg6ytoay8pxeuxph9c75sctovj4fcr3mt1c4wc543gy20qua6kkgo9na8jvulfzy94d',
                interfaceName: '4h981mdk9y8kwsx7rz84crftcx0uqt2av89qdfl0m6ixas7zqmlvokxpje3u3wp6inl8dhbcdr3ihs08mo5gepvl8zteurw7ogv5u99rerh7sjzvmfqqhxafs7h62f5dh9pam6awpt4uze5wdexh1itvp6tofyv5',
                interfaceNamespace: 'wqij666fjg7ii2p9z7pi8n5f52hoq8qqhrq4nkpv144b3pnfoa7uydivpwww4gi5ws6piyduptfofch3bbocjvaiy8842krwnty2f70o80zva7gwsjd5tecylqrfxpked7qrd2whlsxnetk5t0ukbv0l0hcvcits',
                iflowName: '4hngxzsrtn4bhewss5qyosnoqwu2koia02gb7hfa2o63dyhf553y3kir7uil43qg7zb94zcn76tw10pk9g6t5cycatfeqh5riqk9zb9as3ojxv16gt9befv70mq694s2ldhoag03ujtwxnqnz0p0x0hbik3rekv4',
                responsibleUserAccount: 'k0vksdetjntw8059tjui',
                lastChangeUserAccount: '7gz65hohblb1kwx65mz02',
                lastChangedAt: '2020-07-27 15:58:23',
                folderPath: 'lo7qdnsltv6pqur6n3wh7hx6lwqlco7dahz84nxh7xczx0ov0cmiemipmh3l1gwqws1wuea6c4plzclri85a0x393wpstqf7mc4ekpsvj9fu1qqurmbw0vvgbasbg3x07kjcr1e5wsupi5e8denentlz3lvtmbhgqi6t82c0uvy27ibomivgshiwspeao01qt7ek6by9tzbm5glvs7cd0rtgcpw6hg9lvupi8yhculo0kvdov0y6j4z9hbp6q8e',
                description: 'nq2t4szp5om05ptiztabfk5syll1l13ercw5x5fsl0l2dxusr4iyoo8mc1t0i1kylirl5dciqck72va3nzfqryku26xlmi7057bffshkkd8skzyjwbqbzfdx69xki37vnpktmf3jco28ht3hw9wc7sr22h6m6tyqoc4ircclxkhm2d5hsbdpkbltvtjt2o3x1stvw95e3p7rfe9f3cmzv8aqf1akosi9gbquzrhucm8cylgxp9zewtvv3i21ccw',
                application: 'lhm36nfvabesq26fdqto5vegmg3lkruyy5u8ac7sg7p4ys9gicxa3pvhjbb4',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'c45r1sja7pw8jxy8vazaby8pz7wr8ctzc32gu9gauu7a04aok7',
                version: 'rat88q96pgixr3swazze',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'mkrm92d9nibevjrc8f6g',
                scenario: '510m3vlydb8uzm12b0p23b41m050mwzw76aows1hnmycevs5cyxperu7cij3',
                party: 'cyeyzzzzqmnbqanb7b367rcmz4rwaze016wlptp3edujsehynqpgcgknn9m3nz8klouvrd7gc0tzhj64hr044z9x8cd6vf8svabdh75vn7mtf6ue7ijx51cj51csj3fosl6xylcyslxfgfcaps6ebyjjo3f174cz',
                component: 'bh7938qmb2h7kf630awtyn46tsacu5l2zn42axbokywd6ekp21vf2syb2pm64cozgxptmm7virwtobig3ato1gphzdqbwfz08emwlp6561jnz5e57syqmwk8aqnj2ocudezdes811hxz4zstv3i3wo1lr0zcy7f1',
                interfaceName: 'i6tnka9gjoja0zlucts2g111ce4sj5el259k0bc25f5wxjump29icygy2za9mi89t9v0wv0dosow2ntbxyfqvgvilyux7oplzlw2m5v2nx88fcgzoy9zfsu3smtjjjexkvhfgnukb6dph7o4eupsdf9r3rmh1gtm',
                interfaceNamespace: 'w23h3e13h20h0c9grg747ovxxhiymn2l7drjcfxa7uyb4ttm295gl1uefm0t8pb7w8qc5ria6ebq87z0byouprd3b98pu5c7rm0pqyu2tcu84eaf3ebjucwx16yj6yo2uenj8wvtryirmdsf2643jgbrykepzxvc',
                iflowName: 'um9cjt9vvlq9pgbdid4o7rzt8ik8y5sp9ok55hz99lysge5enb4ipz2h3bhawa1okoy69pxl7anp6k52hzkf85ifgd782n5c1g9ierisjyb0pvhwf9t3daicx8342gkl1p9yum1r3f0xjktmbw2496gmm9vqq75u',
                responsibleUserAccount: '2amsds5wfwczyks4l9d0',
                lastChangeUserAccount: '5o6myyyecqqaoezxdwv1',
                lastChangedAt: '2020-07-27 09:35:39',
                folderPath: 'y4tqjkjtihluqa8yyzmvzbf95k7iifmsp2eju4kw9um2jxuuuqalp4k3z36ihoss7prvcz00tbujed72cwdrxlw5doti3hbfct3xo4dumkzw2rf9zvjceeh7hf01mjsb4i4crrp40pu7i92jisfriz9algxrh59gfz7cezngxaxaua67kw04tk433esl72omo1rx1xx29yrq6cjytqsgxos440gven3t4l47lzemqu135ixhf6e1nqcjbjobyu1q',
                description: '50zg59ioi09tmq7foymsxi28y81jnv2vy52bkmted8acaawjm2rm64dythfwmffik9mu4hbx0v5hq3pel5i4oivga4cigednhnxaun3vi2cf7yflk9rdocekilyufemi4yhuqrm13phb34nwwxvwnwy66f53wyluafjk04y54xuon456t7fnamjwhdx4i4ottx9hc16ksxf6jybfp025pmg1b22vi04nrg81lhoycc6jkmg2o8g6w261sr79scc',
                application: 'gztyelc9ix8x9z86p23viodcpv9fpy7zp7bcanzy2kcr429gfm77u2oubfm8',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '43dqmz3p0469664vz0ssmxxawcfs7xyp2lyk5i3p7a50xxe2d3',
                version: 'maah0j9xs2eiq0dh87tr',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'q2g7e5g3hhr8k1ctzsve',
                scenario: 'naplik042gd91tqagycrmzh9yiuji8000xmd2quyibhhf60jajjas8v857sl',
                party: 'w132c0goorgxt8z4wy7nyc04cl85byyf0juo2k4sczailmofzp9q61l6vecu7h5tiyweirnknqzie1z7d4e0bmt4pttxewpd22gcssarbwdpvykiusq100t60k319eztwu1jc3q4fpddy4fhv6lwz80e00zc6hce',
                component: 'uj4s3j1ji8a3knoku2vmkhclmy0zuq63i9fbv3o5y4e3rt6pg4zd33yonc4an1bnn90bjy1fxa4twwzks6qeqldpqppi3ay3ndzt55svw1sow0mpeilhuup70t1e4v4yr8g2lnyjkmkdz5jjfua93jmzrtc7l6u8',
                interfaceName: 'bbyux5q8dk6ikl3smg3x67haly09nn1xac1ah5cbj5o1055r25orrpug5aachf6c841bbsb0gfy8qffwwp2zj3am4qdiu68ar11xc0lwpfiipfh3wdapnkntc3rfhcyj8r1wqdxsgshq37gnv6mtignwagrokbrr',
                interfaceNamespace: 'jrsy72zrdhtbdu0wa0voe5w0mifm7cs3nk46jsknqt6hpyysacjaqhrggt5yshov444yezdnhfg7b9s203mkk2r5ovge5ibjkokna6vjaoflkdmo30k5wkmla45ffa6quw22udggl2dg5htiw7b7cquhwmjd4mom',
                iflowName: '9i2v6r4fah514xzon6jyf6nvw9wbmjprws3j6fkw0niqepi0clsi8jkulvh4bf20n4hcbszrcsmp24vtausunv9vhc4h6onnnbbnyulve3dbxgq3in0342xni1cs9qf5hqqrvvak3txdycdsles7ri6p21jv99sy',
                responsibleUserAccount: 'pq56cusk14fq1x6ed16z',
                lastChangeUserAccount: 'tcuyl89508vbapn5tuix',
                lastChangedAt: '2020-07-27 00:26:09',
                folderPath: '2sowow5lk7ks06e5o9u9cx7b0dbxquy2e84akmf9d6t3k72v2yzun2y58mijml2zga4ekm60fztjk2w4rpk1lphixb3oksebadia8mg5jcqmr9tjmqzwzoh8izbkldue6inh8506qj23b71jrzgy91u8kg0bbl4x65fxpsh25q19877okjaf8yaijcbh6liigqtupvcbi1arf44ypplnf90f27yji1nbeikqboih40yyku4spquf9c8nor6bzsf',
                description: 'z113xo1k45xhdapq8y1vemavaj6ykyt8sfvnscoo7hzd05j9apsx1jgjnwlwua4a27f7a9lln2j1ulzi81c685mqpb6xj74sdfrlkftesc3ihsj459ez9o12dynpbzbfgjl2pwu31wlyg35zy3f1l068d2glujhtui6hk0rtt74q15p7rpedq7z289gdi5j19giqvlf1szyt3250u3vv2iklf9k95nev7vd9vy65wn2g8ujv6gi62y068htamfjf',
                application: '0renjjsqahz3j1vg8zs2vfhbp91npw3t8rw8ydjaw7zqveen76jfz3pqwsqz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '7c1s9upkx884hq6kngtwr0ahgwtc0375e4jeyce941pjm0ar1p',
                version: 'ie7yd82t3e9j5cjn7737',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'boql0ta4kfxvi8wrnetz',
                scenario: '0tvvlz2x6yux0jlnraibc75u054pb2bnd7gtsf7kll16iwdrgwapoowrj3no',
                party: '5r6oo5ewq3hv9l269i6id3zhynfv1e4ge0ei5apv0rny0f8hoqac37ptv5tobsqnhpo5ywfh4qu9oyuzt1xhn1r63hwwm1qb2fg8jrsi8vo0hpk47kh2hrttpbbl9x16wepwzg75jw05eifhmpe9v8h03axy5q06',
                component: '12qofhcyqemjn7krdqgcw8ysh8v47ezvh663lmw8aanr7560xlpt29yi7j5awssl15azbs45aoaagrffc3il1fein00z7w4e148iq96zzoq4wfqvwxcyk6v0nvhhb44eiszq68j7akb4vvzrewazth0ty6qw5in5',
                interfaceName: '8ru0cb12oprexe43qvchnk8k518mevm86790tyqlkz65pj8h6fqbt8mc559t9942u5qn1ramc945xsb6xyp3uyu5x5nlwu03xycesyit2l6zd38berphxx6pkfhuvsm9zx62he3j0yarzf6ts3a9256vy306e25p',
                interfaceNamespace: '5qjgtvv5htysfstumvhbuzy9mm467y9e1j9whpz9mxcdc6df5orngbw72lqog60pigrcmmcr7jzak8yl2s8h4zl2c467kq1ifis0ccxlr9phdc5d5vk638kua5l7t0rmmqbpotwgl33n3v6c2hszeqvefpxr082a',
                iflowName: '56e37clnniawwlkxi73biu8bu1qpmps9sbvu554oi5bd2r0cdunn896udcmsuuarkm3vzn2hghfpxkmbvyw2jg11fg2mtcqyk4rbec4qi0o3h3zcd7kc07187w1fwgaiohd7kjsczpnb44ahc5rpho0yvjry753o',
                responsibleUserAccount: 'yjo527vrndgkoxq51gio',
                lastChangeUserAccount: 'b5ypopzsw2snkdcbv7du',
                lastChangedAt: '2020-07-27 04:53:20',
                folderPath: 'oipmfifsjq40p2qpcs2gbhiiq2vl0unror6pro3tmeui06w974n66o4bprgjmbf72psadkw8e3p6mpyweba24c45c6236msbrnrrvk5adn004yx8zfsm1793ycqad6kywkd9wq18azmusck44zkhdgukympuocnzt2u1rntjzuf3bvy68s1xhx33s1qcef3aw2er0w2y6ddkiaspcknozsvd0b5uyozofydpt86wdzv5bkqq1j3tkz130chext7',
                description: 'unfzleg1leyknbmikb3lbcu3g7yatanuxs5vvme6kq3dqbavvv26yfpgnaapl6dqqur3eruzuy9uk1dyivmjtyq1luyr2hhdrblmsc4ilae0fznr1bunxb2k0flw3mvdmm3kxu3bt68gmfb1jrs679e7kz0fnemy5jbepkp2eulpxc12plqmd28jl7vep4h4ht6sg63xrmch5o09mvr1ll5iq1obef4nre8whwgh7caxlqmtxe6s2339mj0ia41',
                application: 'dorx53vr3bqns0bstnelgvy4sv8zfnzt0qo8i1mziif02mb6hrs63mgd7h6ax',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'd28hws1ggf7z6v2n40qcveapo50zy7qcdbncqu11rkpzegjvkx',
                version: 'jmkyl3y0vx4ey5rmw8wz',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'ky0ilucoaekzlskiaydx',
                scenario: '6yb8edm75q6dfxwpl4aqxulr2bl42gq6luh4jelq060f812jbyusc5z6g5h2',
                party: 'xvunsonll9snbkz3pnjr94lbf2yky5phb2v7thwu3o41gfe6qluf5wvg8gabm11nmekcqbxszxtn34kc184yr83pnouescqk8k0iwkbnm5rr1yyjzkyw76cy2d4zacjfk91fb87q45wrky3nhc1oon5okplb8pw8',
                component: 'wpwmeaculvvxsco8w986lt67pv0szj677cs7l156mxt6p7rh3c6i1x8buv1ihae32yd4235gyolan0ziwzuor1dcci1l726pl4kam546qj2epk7agrt2khzw6pi3nt8gzahz84crrko6pnf9bzx3jgnrvsgbaikp',
                interfaceName: 'p568vvy5wnc3lbn9e5bfd03t8bhz7d1dm0iad800brux0vrbm88zymhu6adkgvtazg2qmrdqpxhdofsqaupe9dwhlnta8qtokojwq03zxbtifh5ryzk8swude8ln7gvk25bhpgm7gxu4bal4ibl3uwwo13jqwz0l',
                interfaceNamespace: 'e18oloim25yiubvf3pi1figr8ewpfm1lclrenqudepkuw7irv1cts35epmuajti467vkcdohgc6iyc54s3ab7zvphu5e8w6tu2p11tw90wm5260y4qd5ldvz9c0n2r9v180uboq10hftv43tincu8me3s7mrnoq4',
                iflowName: 'if1gbikfp7yjf4tcz8erjkf8fsuk0pd7g1wq70p644bidag3hmbv327qmxyn9tvf6ucybgl8k6rwgsvfct7lp3z5la2eabka5m1ubcl740nq5d030r6o0n6gwt2r303sf4z3yanmqrtx92m7gckl0fo9qoifg7nx',
                responsibleUserAccount: 'zqcc011nhvc3sm6zxmru',
                lastChangeUserAccount: 'kub1yu5hrirgdl28v4v6',
                lastChangedAt: '2020-07-27 16:32:59',
                folderPath: 'uujpjwo0llsv2lw55umd1tbzwqgu8xk6u6zqrlfepolvmhz8vr0fptrf5bniqddj8spiyk2rzxreaej2mzzzfvkg7dv69ydyvqvupvildfk5837jlf8riiiz56rvipetdldumujgbzduwz37d9pkmeljevgoc8rg680873nwlgejg6n4qqqy2yq3gzacx0c06ruyjswwshjswqp4usox0fz688n1fxmi2munqco7pnj0u3qzko6pnemj7uhqpkx',
                description: 'dest5dwcspt61xm01uyo9b3clb99ibrxhvcy8aja560taqrz9v3355frpr74caqomzw4xxl2b6s6b5u7mbkg1r0vp08qu08zowgzd6fpq2sx2jozm0slvqh4jxrye3s2n2cz4msllq16fdazthwuny8lqmh37qfhurgm9t37wbnczwtil4jymwqya59i6g3z2e7gkkakggrd9olgwklymtiya0wjly3udyh32gj7131ruf2318dslnhqzour859',
                application: '7hvi1facot25cqkzau1hpmeg1bdbt7c5mem2k37wjv691ueh2u7vrhzbkszh',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'i50wqn7errnyjaddgy6yj3h26eh33n8uowfkp2jk4ofj1i62sv',
                version: '64czvcysf341ahd7w5qj',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'ws731za26ruck2z9ed8d',
                scenario: '4oyq1f4mwn2omvfhc8hehz9mbhhoveiorbwl6ofk4e3mcy1ljzsvb8qp3s7l',
                party: 'mykpcxiplziefbi44bnnytxwodb4oaut694qdtomw37e9vvofl1k38bbfbobl0wfyo9zsmpg73oxu6og9ejpniozlq4ukqvaww4f93xqlmm8il02ws5k325xree1q3fpawfz3tguh74alkvv04gnlns4qwjo6x49',
                component: 'ork1quiq6v5nh9dr1wrb4mo05tgrnb18andenk08n0jicm3pj6fleaa9pbrp9w9k5wcvlfrv0le8snq9tcspzdb1no03sc1h1y5rpfov7xusfaghmugejt0ug79lvdveg3k3vy31sxy7mmpixipe0axsramvhbi6',
                interfaceName: '3h1e4ufjrclgxp1louxbm6rk4c9mntx20fafna6tnej42v63ll07li05n4d7fuxr8kcurbhu8t2dlkt9e4vbk4frfwe8wocbme9m9ilpb6rxiwsf75bfgpv42bru2snwuytg96s18z5yzecubc7kubvpu6m807n1',
                interfaceNamespace: 'u0qdkl5iu7x0m493lj1yjqzilohbvxk4rm3aor6yhdzedz3try6inb00ljrridhmxrvx1a21cdr7280z9nko3ur7igjcm1lwv41ns10dlfp9ivxow16kxhxn95bfb11pkkyh0b5ojlk1h5ablv1ey15qljlxcme3',
                iflowName: 'tpncbhpgm2pjcq46q8l30x7wm3jqq8a3qkq5tq64q3g2enhz2ka2p1v0oxgi0ebgsx4orlabvhbmwgljlvgrbg7h1xwa378dehfhublvqlp8b5janavztdgoj3a1vj7d34xwk2vfr6cpcv6gef6ag2wgdqfdma4m',
                responsibleUserAccount: 'rhqvcbu52nakl7zxg93b',
                lastChangeUserAccount: '9kcxnw5n1miublmpy63f',
                lastChangedAt: '2020-07-26 21:47:20',
                folderPath: '8trinef3b7y23jenjnjmduw2ji52agh7h4a29cmivuwfffhgm8tmmx8oammf70p7lvn4uvp31qnugf7usj5iuoxddyowoo2d4u4mixbdnll9ddd5w2rh8ehducc8lqjonxrlzfw52v5o08mc6vaafy136q6khlrsvqlcq0l2irp9fk7ykskj4zzk4h22c3igizsu5pkbbg3pjpho4pg4ynn2nk0es41l05ykz4lt38dy1v1x2z6wi6pye2e2py4',
                description: 'xvmiu9n3j033qxbrwpn0abk19zkm29j73imobmmpox8qoyqt7fu9dfcwahndlr2huruedinvv485xcvo8mrbxzv15ltsgjudg25j2b6ukw67871f1kt3dy7o0sl0epwkwpwol7t93e486fngma333x07jm2drkq8khpv829ty9w11inx8wfj96iqx67i7mcdcdzotid60x2pd05snrtxkgleqwleaihve609b3fy1eajejufk6iuym7rkp69qje',
                application: 'p6d202glbee5u4pjmq5kakq9ue3v48ad1sibam5rukf2ckle5fcivub6hdci',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: '2i1tabzb7mkab6ydg12zbf0gwthnydbbrldvkc2n64z3tf9vj7',
                version: 'kufoy1xvmqe1n5a2cc84',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'e7gla0tlzmu4r4204non',
                scenario: 'u7dkmasc5ymgicunhshiqjan5n9zxxladquq6a14th3kebxlxj93hjwxkoe2',
                party: '7w54p3wj9tojo581dlgwakhqb25519vso01hi0rlha9631raayv1tdygipwt2fm0hzr2qurmxn03zei1bdyz71ji52qsewvo88u2mjljb98cl2v4r9y7u3o2a83xyga9x7ujpx3jpvxegelzek6q7gamozv41vk0',
                component: 'dw3ymfvzlco7y683yg62pb8xapvpu34ej2mfrsq82m79lcgvajop6d7f559rimrsz80ohc79hxhb7mkuqu9hk3gi0orcip5jqxbv5i44q3n6281odu9q5oz1a32ju5un67uwlgejvdw0553txbgisoj6j8xro9s0',
                interfaceName: 'tw44k9mespnwcnh2s3otz4qczts0mivigm09ggl2ud5h1otyu3b3988rligz17sh0wvkmvpaxnskrxsuxjaxpz4r550z979ere1u40hzmrthlzxswqk8srk1yqb58biirld4i8wclb0cr0vz3mg9vrsf9zrmz8l2',
                interfaceNamespace: 'mvyuqk8fogv8l1k1jn4dlj5v93l8p5vsdobzoax1rwvjvydlubdiy6fac06ljwg3okt92mbcf5q0jq9ysp4gx41irpa6eo73t7ppri7v7yb959dstyhnacpof51xvxcnvpwio2dcoqpn1idnxg391we862i43dvx',
                iflowName: '3mv4z2c95oefl03ph5fl0nrw8ttuvm6ezdpv9pozd3nhlju40w33f88eticwe3x7w9tmrm4eg1b98wfvep1f2q8yohbb22xukeiomdq6y49r62zvrdfn12dll2epg9gmvzxf4o9x6yzbnrdmlkw3ylb2bypn0mn7',
                responsibleUserAccount: '6l1qcv3bjvpclmbm1bzl',
                lastChangeUserAccount: 'fag5b4y42bd7wup85mls',
                lastChangedAt: 'XXXXXXXX',
                folderPath: '3pshbs1hg9ku0ghsbbm1309j9ia41s5dkvr4wpiwxu3otretx0xzami2bah1diop2csnm25aotup2bq8wvmmp5jt55i9tm2u38c9qh4djm5e0mi42pd9vuzzzlhkez6ulqgks059fyfts0v75fnqay4d9afbr2jeaihtsspqz7ah4wsrwd5pkduttuszdpvq5nqcko7lu616xvv7jrzu6r46du5f60j5rp4lqnz6w0pfar014simtvf7gefe94m',
                description: '3ytpmwk2ps7pc9jlg3dcrxecma30himupn0ok5nwp10wl2cogyj3ou47gd1yn36mhco5ab1mvvmaippgvvbe8ev8z8sideao9hwapep36n3zwlty0wmzrytmns2kx0jqum3ia6y5cnuug127du7vfcbx4r08x03819a7omd4kv3z1ozgghb9mi1qolcuctvzizt9a9auqyfubwf4k1co0631mr9v03x0qnmybj9symx6s5apdsjrqgemakj9ry9',
                application: '4hxlvm0wul5mepdyv7zo9r49rq2hnx35ykpa093njhoto4o69j3y79bi0vj2',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'nlqbokjlq0k9mqbsz5jlzkw0ggj2icfvdw5o46hzp2ipu8xjkc',
                version: 't3t161kny0r756jua43s',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: '8inz2x1sp2zz70ey75kl',
                scenario: '9gjh4tmsp2y7ymbtt058vehwpzhccusycnbh10m4r1q28aa9l2tk97cm0ysj',
                party: '2tmps8kdofnml5w8b6bv6vt04je1501btr4cs5u961ef3xnpgp30ba9pg0oxwsptjcbdubeo78tq4qek0hicsexk6a1fbu7cj2xiomps3dr4unhxurwpyat4pz39rhwnqwxbmseh9s826avvzqphjuvhsbpmkwxq',
                component: 'imvfhx0rxyjp2ilxerscehvtx1beipgwn1rjhsbnhrcahqje5uofn2af4m6sk7u6bxn1z93xq9wdlgj3u5bhaqdtsxlx71bogwct9jjvxn5w71anylroihne0so5l15z7keepb5eel67167x86b2r5kg95bfpyhw',
                interfaceName: '7159kxwnn57prcw6fr40z87aocubsjv72ei48ce2uasijw87hv27ywuzj58rifgow627xv033gg8oeqfpop0cnlmh2lyztszh90s6774f8bdt61xmdq4qxsjc8ip55frvmd7fyhsnc75qlfywxyontol3x905xwa',
                interfaceNamespace: 'h01byd02ykuwb6lgouvc5yabldimiy9wl0wvlcak2kmtbzodhf3q2f3pbeplsxv2s8z2yh16mz9s2z3nwf5nw8xvk0fk08md9lwot4auwaj5mwdm7qnw8zkofjeqvknb0mqk05eesohd52dc2jskm6e498cvurv2',
                iflowName: 'pp62no7wagdt8uvyuuu4yh4r2nzj4ne0priq7at6yw3wnsed9cljh4vvdge79a20zvoubjz2fdfth36zzpc22nqa0fhdmhd8evquruwk7t7vwiek7wnro9mf3xfxdtmys1rdytnmvfl3wjyqr6erh54hidw2bfb2',
                responsibleUserAccount: 'mbcg79ul5uwhu9rffqwf',
                lastChangeUserAccount: '75nqud19i0zeflhjyw7s',
                lastChangedAt: '2020-07-27 08:09:00',
                folderPath: '9mp3zoy7tbgwhzgpbvlkx00mvwim6sunwf7czj51gqkbjsqelwzorv42w9vyx9tza8smgiknxhsjj6m3dq5snkcsews5gvc588v85v5jp3wnn77k5w601ca2xwqq6t20xy5cbok1x5gv9qrcxjhpif6zhy77qo4t9a1sz7syycmgqgx51buoxq4e4p3lixeumrxr5x9b8nmd36xmsaxxcvzw07085cz9e6l3y6q3cnzzjgbk9tr352bbazufifj',
                description: 'kdrl4ik1glparx5y9otedqswesppiy2ze41suwrbhx0nmsdka79ecn9n697qvs1tqhmo3o05nrqygvif6ajqpqsa8ju9en79h8fl2qk93mjivhhxvusljpeq9lq8l0gpjm8fw6lbqizes4mh51mrkl2usboutnjkwgwd6g5n980rkoedyswvemdu1osx76k0io6ydmfriqgtnyjh3tlkvg2lnldlw396na390ogf5h4tuakzngttcn2rb1hn6rc',
                application: 'dzmdt16ij2j4ranq2n5a2lnj4ikpk2ei3jass9n7cvdnx97e31fhr20wnbnf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    test(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '04c09944-d525-41dd-ab5b-11b7e2fb184d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '04c09944-d525-41dd-ab5b-11b7e2fb184d'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/04c09944-d525-41dd-ab5b-11b7e2fb184d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '04c09944-d525-41dd-ab5b-11b7e2fb184d'));
    });

    test(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '78e24bc4-9cc4-4da3-8de0-b448cef718a7',
                tenantId: '11abbc8f-37ec-408e-95b4-e2d005f74212',
                tenantCode: 'ftnsko8fadwm2bjp4claitmg169ic3nn5h840fv56f7m5vzrf8',
                version: 'rquj6em971ulphfetmy1',
                systemId: 'e11e4c4e-88fb-45c5-8d4c-cefc4bd35450',
                systemName: 'f3ffzot2y2xsajv4ltdw',
                scenario: 'ydzkp7fd7z0e04ll6qqdwo4x3e0h9aaqlq8ze8y5jctubvkcvfymzdidcrk2',
                party: 'zr7dooyi4xizuvzi85dksk50n4di2ofdqgqs55lpw3mf8oc8qc78zm66q83snd6eyxai5ltxlbtpzt8zov39hxmjeclyaa1m8g3s5poqb8l9qtgemiclheeoo9336j23aabz3776y8rrosemise7noirbbfzm5ml',
                component: 'bdest5yqmu8nxykpl9dee2600mi656chfu4lnp994rall3uwylbes5jxtbq2duqwdnraclbn8otk2pk3m0nfg1n7256uptn9mokxxgmototraog0f6awi76xt8vahe7lqpu3j8q7d71rp36owizx7wn2ikezzont',
                interfaceName: 'opb61wy9msbbwyvopezj2ycjv7z97peteloi6u48z7bz7z0tn8xnigsx1vij0z9io9134l77kk6jl2y4afk6g07ssm3ndle003bif109pze1do4psg9o66s7ntla0125yhum18ue5ao4mr8oopdlp6vl4dj0g6zp',
                interfaceNamespace: 'q09caayy9hcc6r7f866x6j67tx6otsoq34p1pby9a0zoaq94drjmnzmf1wc8dsfbav1fomo0al3e5wwf5f0k9jer3aghfecbezwio55tl5h4tqc9mugco6z06r3pdbuxhs40wsxmhx8sxvfjb28q4mih6p4qpgt2',
                iflowName: 'oahbzac4bau2myegezbbfb84tr1cn32rr6n256lt2p503c4g0o6ggjsqtftzcbn8tm04z3zf3k0gmz5amqvoih1c2zxlxzodo6d6smlmuu2mkkdrjowrr3wcx78zw0lu6999iuipk97avmg74yty8id7njdbhf8s',
                responsibleUserAccount: 'gfbij1gek6ryq5x8wnpa',
                lastChangeUserAccount: '61m1i8ptqfdagy33ny0k',
                lastChangedAt: '2020-07-26 17:57:15',
                folderPath: 'wtf72ub5p9kd88ycx1lw4vskbi8sjwaostd42uz9021l2r9hfp8kccezgllfrme3pl8bief79sl9jq3ox0hra8a17zxapb1l7525zvb8a7fkqsw0s2m8895u3dnrm8y1uay73mt8wyo3n9srxy76crqqlzgkgti5xoofmn3ugdojvqqk0njdohu699dcx7tj48qh919v9qdih1dq1rdm8wq5mohjb68apszzuy9wyw1a9ue46wr933icey2hjt3',
                description: 'rjah7j1jironn4ei487xj9ty6cb8okm31wve5azwlvhr6fdsxt2gdglfldw0cc46p5z9kklxdxth6j7tpvr337q8agd1jnctu5uyqmgbcq20szhj76hp51hnqs250jptoq1b5tx4s9pu5it1ui7zswhfm14qflu0uhsaett80pg0fl6o59jreq175dwid2kwved0oe9l46f6lxz2wgs3zdh9qov6tdinkbk6r42p92odqz51fmq7i1r8rg57zdw',
                application: 'q7y5a4d6igctnwgwrnws41ufn5rry5jlshcby0jd41sbexjytzccte4gt44b',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '8b4b6fbd-3ccb-40ee-aae2-d4277499fa2a',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                tenantCode: 'a5osiekfhbze9h7k5pkc65vy41kfn8luj079aamzbnho8kyhoo',
                version: '81llvz7eowkgsi7vz5ll',
                systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                systemName: 'nc0qamcppje75nobirt0',
                scenario: '7gey6u2efc0bd86hypipryj5b5is1w9suf4wv98gxyhjrc70v0kgq8saimat',
                party: 'ojo2jm0z36twdk1f0m0pr0g8rula7g9rhyrvj197iwec1iimkx63a49qdmz8jtsqx8k8ebk4w0whd2l5albz9ssj3wat2gh32dhmgpbg1pyfwydl90dlahyzfhfj51w8w0ubh3zvfvwk8zcy65kk24xuxo6g8v2r',
                component: '913ukx5xai6m2cvpsf0tvrns43xn9e5ojfidb1wvhof6y535zzfhh5r0b5y7hces2rvr0xds5tvh99y8yq92toqrannw2ag42dpqnex1itq1jgtqkz10lljqk1jofyirw5zaecwq6oskur8ik30iikzif8zb8kpe',
                interfaceName: '138lujovvh4e5awlg6plydgzpqst94r3j0wlohiz66di6mxt7zlfrr67xj12awoxkq1caraht93hnvskrx2yjqsf9v6no66q0p8y7bwbrft39w4sus2c8hw1ijvtb6rl9v1r3z6wy7rr14a2e0cp4x21ou5sbdrn',
                interfaceNamespace: 'ic0qcorpjsoaqty1aompnzr7sqjj6tqbn08324mban9sjdook7fpngy9gkhy1lrdqx8bkxguyslxahq3okeiq8vvwik9tyqwm39u9qsbnaxaqb2ardkkgkh35nh0v17mlbuyl3vd4oug1fkjqhx2rwpts66jm1eb',
                iflowName: 'gbwxva76ewm85cq33m3vz9mylfwm3mbeegwncv2u3zherjpey6wzoli9vn79venzeg01ntlahe3lelj97qk5sngsmohfdez1edxshl8hl7v7rm5uapfuykn7rq6i4azvetlkh6wvcz9d9mcuctuark69j794wny9',
                responsibleUserAccount: '7e2z3mbjx0b1q3s6htx5',
                lastChangeUserAccount: 'a24fy57orc9vyq0cgoui',
                lastChangedAt: '2020-07-27 06:24:35',
                folderPath: '8mk81yhwzfxc4bkbke7v7nm7zf2wjoq5ccr4r2x981ky9hyikpzlqfaxr6z55ns6x9wa591azx1q71b68ptk21asx1viycy2ws8euzi0fv0dnsis8gt0c4p0w3zz6vvt1q7c7fs2cupffpl54hujfug6crqcinp0t0uuhhqkt3gd3euix08gvb2dpenbvil65aa6v8bhpim2nd83y40q43lcnw5fxbkps4b3qaek3cb4dhpaw6bjlba36m2mm60',
                description: 'z0fwzazexanadf2qglh9kycvwdhgexro4mblew42367ua28m1tao8hguivs3l6mj9ep8o2v2mu9q3crnkvg5079h6a3vpeswz80oca2lco21k8r9bjcrhccs2dcf6oplrvlbp48heqlp8sdt73n9wtln1irihlyk8tiub8420qalnf7t3psa7q8snxqtznj3gpglscwmqlmes3jgpmg114aebp5lkvs7cve9qlpd3i9vewhkoizbek62newonme',
                application: 'gr8onzza4qb03q5mnp3uzkvjbblxzbrp14w3z2leqf3n6l2rbuwswwp46did',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '04c09944-d525-41dd-ab5b-11b7e2fb184d'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/04c09944-d525-41dd-ab5b-11b7e2fb184d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'bb548bbd-f50e-4b10-88b4-223513658623',
                        tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                        tenantCode: '4vwtiara1s6h29jk4jje5ehawkmzghjtdz2dw1ef4p3yzzyt3o',
                        version: 'my14sruxxs5vq27tfut4',
                        systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                        systemName: 'apkurprttwcfubr3t9e4',
                        scenario: 'pun2sqoilej23b5ami9slm9h3fi9t1g3rtazf95yy30duxn9jyu66bbquwqg',
                        party: 'yv1umeeyc78y11lau9b3mfat0l37xribf1x9g2eztx95kl898mqkzr4mr8613ovovidys86xeag0eorj7y48nzh9qfx2fvg8p8icf6triq8zpx51gk9ueag5eqzhngr0ne6653u9wlo2b6wk00vtf6990n3x3dm0',
                        component: 'qpban0eeza2zhlh2qa63livfqwbbqy92dsnwvxdnu8rs5t0twqu8z150mmd3m4gthx6e5y2ivmp5bz0fz279hetwcymnaokyebqgaarvhxklchd4ph0wvaazqnh9c3nekbt8jcgtxn6dxjrzegi2m2tteml9bahf',
                        interfaceName: 'jgu858ppej3lvycpon8ec6l3v77gvb2339n428pmzaobd8a393nfkk5d767rkttnpg1qavot3s3nty78yuk38hdh99s4eq2b8y7217iyx2q55pb7eswkx8ko32sncs4imkwnmt2azxi1ghfahl8a16t898x3d7mv',
                        interfaceNamespace: 'ebgpmpxpdt7ajsq19tuu827nsvp51mjcc1loz84pypehbtqs4yo3io5zbl2s55k7djvetasbhi9ruvwpv519yehc92yqh0c0usxy4liwxhysazilxjg0oypzus0esv7i6i61v48ctwovrcpd4ppeu17lwwook72z',
                        iflowName: 'bz2mkm4ftjo2pv5xro41isn3ld4m4x9yrth0x2m9mzwjpols4o9jla5asw2zx73qwnhzjtnq4qyftljl2aig2onh071aq0ygoxy4le7eftvv79ebm5x66g6gfgu8xw72l81eo61fduwigsnov03x0l65b62fdagr',
                        responsibleUserAccount: 'fpvwhyojwq9m62nnfknc',
                        lastChangeUserAccount: 'hy690v6tg2qkja9orzft',
                        lastChangedAt: '2020-07-27 05:00:40',
                        folderPath: '2vxilzjawv6ym23djefmrvqplhpjx9e8nv699c4c97g011gjxoz7tenp87jsxqto1c1j1xfbshnxvlrizmeuy9vrzfjfyf1khgmo6tgtfwur06zsiex3p8wfqpkpd8g2e5dh918ap8el0248l5t6czxclm3srmecnzz11gpia1ae3k05eqj9f7clyw01x99pdcxxfvbpglgflbcbzh5vivv9pxfp429etrywwday2sturdyyg08mr1c6dtwwgew',
                        description: 'rki47g2wd1zlp8dhduwfdl21y91uph9ayzaz3l4qxcfpf5ui3vpqerngr3on6nx5ou279kcsn1frexw1l5cobr0pvskfkpwuhxl9h8vrjxqcsjmlh517yzpnn0os0dan6kwpksc0llao5tynls2giby8sk91qzqfe8roo8hqimjo8bqruoxh20pyjhj9h27dit8eogvq4y1u8adqdn7swpkh2yw0f4dy7wddwkgn3019gpspjmn7dygn3bslf5s',
                        application: 'hmf2yk7ip1msu6w6bu7cttzc2qlmoufx88bg5xes8alxn0e6xu3c8bhm9i5t',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'bb548bbd-f50e-4b10-88b4-223513658623');
            });
    });

    test(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '00000000-0000-0000-0000-000000000000'
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

    test(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '04c09944-d525-41dd-ab5b-11b7e2fb184d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('04c09944-d525-41dd-ab5b-11b7e2fb184d');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '04c09944-d525-41dd-ab5b-11b7e2fb184d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('04c09944-d525-41dd-ab5b-11b7e2fb184d');
            });
    });

    test(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '751d67aa-caf2-4a98-9cd6-a33a502d4938',
                        tenantId: '428b5cbc-292f-4068-a839-5766d4f01306',
                        tenantCode: 'ylje55ihi575vacryc1fucyvfq7z222se2dydjwedwc4d4y3df',
                        version: 'ryh50lgyyoo7xtpr7tq0',
                        systemId: 'a24c1c82-e35d-4f50-8bca-989d75fd97ff',
                        systemName: '3rbnf3kz0b4y3i638n9y',
                        scenario: '087hmp0xbneckhhhx0xph4ehn394mofuf4d3vtkmmtkv7gkjbo5xp1ztz58u',
                        party: '6gs3804x51zakm93dxhhg2y2d0dirkeb3sr931ks6nqrjtxhmct071lc8fyynpvfy38rwl76cja9f35gat9lepuk63fcjyq3wvmt8vvvhz2fut03764jxrihqvpbwde8ycvhzuctrrzfi43p092ytyazmclhp0dy',
                        component: 'uk5zqilrdb2wbfbwnx4j8gborcb2847sdp8q6dy9b54lnwlrb2gwuss9nh9u6zthn68xpxlzlw5olye8k1eskc7ru9579qcel2l9i6n40rvb4zee1eemwkluig4krq9by8706dsjvo1vlwnq7rmmixb2ahuv2ckp',
                        interfaceName: '6yq1az0tz89xtqlpbbsz3l0smffd32rfmspcd0az2hc57fdachnhnjg1j45gmg53uprisomjtvfekxay8j0fdz8qg2j85kgsrspengd3m2iz3l7agqvq1ghys0q2b6uhj37plxpcoxnedpimfwukrpbri5nvg2io',
                        interfaceNamespace: '4plshbc4ej7gd0l9nyboc36yhbnuwra5dp01o1lpmzzodrcq8qcb77i9ax6cf27panwcuvpujj3ucjm771vjxb9lbl1l4enntfefl6ds41lgj0dkrx7sqzdnwujm9ch7fcgeako0zl070o00kwvs703iu04fphxf',
                        iflowName: 'fmx6whj4sbowatyhggx44xzwntozd8y4lum9f8p5lnpsa41np3pgkv0n1a4yego789atk4kw9ffka3ohvv4whc592tvtvij85onprrybw4wkpmkiwcjx10l1rq9k9ydu8xbwgyx438oczul8d37kbc11e9h6kg45',
                        responsibleUserAccount: 'kzsz7jppl9sapde988gm',
                        lastChangeUserAccount: 'hgintylvg0h75ccs33sg',
                        lastChangedAt: '2020-07-27 15:32:32',
                        folderPath: 'zo4yliafv0w0l78rlotdbbryn57d6l9o78ijjhym6gcwzskzhjy2g4jrxbna9ov0v9t25anb30nt7jzq08pgcoefn8bhr2xkkpjdors5gsk03hxemep83pyeun4b8ukwb92x63j3ye1enic13ghngenm3879ujqhtrtxchickv5i6p39k55xt5rp1wpdkweidf462f2j3tdhxrcqu3s85o7xtyfeud1sdzq1d6yfy4lsgtvxepl36l345j5kqpc',
                        description: '4o0oixyojp8mwgv7gvhqvh2vw1s572jk098xwxhcdgvi8xe8fbg5sln0x02dgkbuwur4ee545ksnowqakbspjatgm7m0jmyo4ztv9f7uil3s6z7y48ew5lngggf402i78ece7njzm809m6gmxt3afg6g6uqi0lh7f5te2xbt78l0r0bcujurvf8vik81xlic4uhgjipu5r0bjrp71n7wxjcrjlqkb04r4icj5vcu8i37qefhw88xykkdjbi00ve',
                        application: 'bjmc8z6erh09swbk1zr7ymmonl2l2w6w0pdi7gp8m2yp7ny775vijj75gml0',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '767bad61-d254-4765-a8cd-e06c0afedf85',
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

    test(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '04c09944-d525-41dd-ab5b-11b7e2fb184d',
                        tenantId: '741590e0-20a2-400e-afbc-c02fa05e8e2d',
                        tenantCode: '5won3gynmcf1zenr8ufybtwme04pvxypr47o2lml43ssgkhxc3',
                        version: '7fwzwtd1qblf30rs2r5g',
                        systemId: '5e8d8cc3-d973-4074-953b-8eb40d3ec026',
                        systemName: 'apaxe1vx5x9ty2jyfgx3',
                        scenario: 'mc4sktar4b0ku9lnseqpd9niqzfoqw5ef43pswq9hozsuw77mn5hq7hr4qkr',
                        party: 'ohcyo4uj0g2mjwafa3iccwmlcrw18563cuvddsa5qkigqq8erlbiuegkgfz5bny04l00v52tyk0ym4hm8x0qnq00aakmyx6qidyng01hp64dzopjpa6oee03udesze14hfcv6h0ym3okf0k0xvw69bo59adu4zw2',
                        component: 'j040opg4zedw16mhqv45delgxge7acuvh5n4nlmnaxp9hhvfcmr0q5nraenu66qcj152swsy1jl0de8t4bs5ap1tbq0q3v6d12a8rbdscsmgp2yovh2omspd04jnvvs76vicaxvqix7utwwtv4wxfvbs9e87nuxq',
                        interfaceName: '1ndb0qflc6nj99kbkbryyy6bbos6xihqd8hzuz7faau10v8ivxj4ywsghjtz0fg8hgdhz17pf0ahixk19occ7xqlv2o95xi88czgnhj3jasfnzduddg8ffzudnfnnn84hz963upqt4vxlt9198z6kai3e38mx2jd',
                        interfaceNamespace: 'k8wyafh5torzx2mc3gw97hidcmggpljqstl6395pvq7j9wyc5gtrq4jpgu32pak240bqfr6ru12d6mihl3qq7x4hjf7xdmlue0o70pyxyl3jdevywqjw09wiqm55oaco7he4571ipsigneq35u17e0kecejtva4s',
                        iflowName: 'bjrvbu2k17y1yepsy86g1rgb325nl3i0nrmryfg5tynxctyxrc2besv82jmnr3w1stdqlkccc3ms0gnr4xms1zh2fkp6dq3k9ycdte5k11oq6fxq2ab4mc17bcopa99wo5blpedmmkw4e6xi0ov2qvy62r3pu332',
                        responsibleUserAccount: 'sn0r4fcwcehoin7p90gn',
                        lastChangeUserAccount: 'flbj7sxgc9vly6tmir58',
                        lastChangedAt: '2020-07-27 00:18:08',
                        folderPath: 'jhtgn3sf105h65uwhvn95k2vvmfp8gbs2vipdfwe8brk3z4syey8y0iy9mf7bjk03ymkrxof2hcfiv7y575ee8vvklz48mzqj04zc10f96342h82otjvhugwnrr4i7ig05irbo0gx5gxxchy6k08athxsradugiirizix5e9urbe9y0h7u3zbds3tg1je2vumq3zikxurqohypud0s3qv4u28vk4838wnunrk7e7mcq2w965c78wpomnrx1m80s',
                        description: 'wmnmavlx6zdz2yhsgvci7otk689fnvyvgwy05a9lcl1bq7x01dryy2geoofxilwyvm3g759efrsafs08llk6kcc5fegg565ljn7v0nkez8lubrwy9mbu3vpm7vj91nu1ui20h4pb2vkd63obn0lx41g503z7wyozl17yg9m0q9lpv2us4x8kbvv2emdodccnmrx4wwi0ykmd7gwybba1rxcv5ae2yir9i4mz7ih76r3foiaagcv10qxt85wcvjx',
                        application: 't2qfa2xdqffokk6hq6bnzseovysroq282enl5f0zrw7ehcodky1uz7l6swzr',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('04c09944-d525-41dd-ab5b-11b7e2fb184d');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '04c09944-d525-41dd-ab5b-11b7e2fb184d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('04c09944-d525-41dd-ab5b-11b7e2fb184d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});