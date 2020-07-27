import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'fk8ztyct97bglhtue3vkdxw3lpsc5t3q9qxzdhbyc8mfq0quze',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'b8w4u26yu6qavnfy9ard',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'ovrck51pfider138n83od7x2wj48vgsf9d7bwg1n0nde7rl2oxkjaw4rvouwjsuztymde7nm8bpra9v2pjze25pv0t56y6hlc2k6aoyfuy3mcrrvyxojkiql97f6mkujeyv2g24282cn8abyvpqvbhtpxge2jd9l76wp2so1i2k8lu5qlr8yw1b62u09jspw1ibc2h8blvwcy0j3liqfvnvpdlpa53716rqbhq3k1nmgxuhnj1370iukfe7c72k',
                name: 'cnlvdqdt5gnjlig0fe66q5c9jrl7jix9b6kkhe5yu9g4new6wm01ncmm6dm4ae5d56j0ozda13jpfffhzkrn1v5xwucm74nip8s4h36c1ngnalah2ocyjft5qxcl3r34y6f451h9w1ch0me9qigmaqltcn0luecfcks1bicbvwvwdtnx9oe7lmg2xjzutwg1lm6lp63lq7khvtpz5fv1v64d2n2l6us68a7tkyn6jyzinm1m9jvss3lrs6kv70h',
                surname: '6e1f9p96d0zb63lanihiianf2xuo7waf1uwdvf8v157xaejz80x914tyqblafy0lo1hw3zuuor992rbcwaz1btrpjbbfksb0dllmri3pg0bokpr4eott5pit8c6wc8z331ore9jhpp9v7wjhl807n4jy000pojxjoql2nfev5lfnwln66w8aysls628il1d6ce2dcyhik71dc9od8j88hjjds65l1qwqm052layctedme1q8yfxen7joh64uphx',
                email: 't09tg63l7e8vzt5pgwg1ai8guu272f94cm2tofk13llcb8oqm6icxlal88d16ml8moxr6d5hozjtpulo1wt8mf8i09xxafwkpkkrua0n0syuk350hlyu4k7y',
                mobile: 'dvobg5qq5cp0k5o5orada41yzwrdsxu52vz11qyd77mxtaob1beffev80yok',
                area: 'rvsoebq0x62q77gywnf88qyeybyq3w9f0et7jq25dz8p5y0j5nldwhmclb4nf5t95fdpmsfrg5lzcdtm41cxz2zpbxt91u7gjoscq01u0ze4vfm3fti70eec2vyj7mydg9j2qruwvq9azx9f7imcvo1snacb3jg9o0m6xznck6l1ec7iwlq90mezda4alfnrvyfiqp72tfb8hbed2y61k0j9j7o9mgqi3v3wr58zhkuy35w1emn0eoqxgbn46ob',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'ugiwmmzi1e9hawulnw44iwdvtpuu0wv90x9ejfg2usrnshek4j',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'j7jlhhgmauwiygjhthjd',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'dm0m8o7r5qml086opexi0whjar5yemyzioksq3i93yzk9k00huk275ch6jz7v60s5k0z75h50veqtjv1avwi39w7wu3u99ndwiu36jvs15sw380y9jlbt0ngmq0myrqm2vrsspnln5u1dbk0h89y5wwsr0je5esq49ltjqhpsvk360d9g789qqlifxea0t3szabzuo6n1g9ngdcyds4kkbjmxcuu0j2xx6nv23fralrd4z83yh4aezi5anelj4t',
                name: '8t68sgg5a2vjr1pcvlux954exrqj4tmeix3wb3qj0s2txzahifodr9qd47d4fpfm9qkxn1qv3icsu807w885t7k7h2w59t4f3k09jzx3eu9ha7fqp89ipyjegylyt4tmux82niu3jiptggn9504upzibd29bebcm6gc55xh5ivgh6qgtdjb12jovy7n854ie3wkaqordile2ef82bg6ie1o6r5vbu0x65kqxekhd975zfuh6ufgak60orsz6ydp',
                surname: '2embvf241a6d8bn1f3030r6pzfmnasd7o4c92xgtocs4tb3o81su6ehr99kdfawhisochhcwsycy9sllinow6nlkidj9yddk74ec1kbgh7kqnatkj60762eff9gstzvoq6d5yuvqidued1oxglz6r0bqmsqmpn2tj7elnbq3yw09t9t6u0doaxt0rltxiyn6k41wj1sz4gdp9t8slss8a6f7khevjcj4febt53tddxonajjdyhgkio2gckbe4c4',
                email: '1mcqgf5fwx1gjlekqupbspt1zqcoa54956trr7ex5bpsm7orq8oqsoj0trdu4sco7q3dilxq396sok7dqkrlehkein122xloezerfsfgbmm47wgx6tr511y5',
                mobile: 'za1e7h7kx66vohtpuj53khnw6y8rovwg320nuam2bkl9p9s4l8yxkv2hgzpd',
                area: 'hrkmehh1jxg5qajn8vp50ok7x1po0iztd00aj3y27vth3p770qkaoufgx35oi2tye9rkbun9wpwt4pevhjsv6yq2un8dx7odmpyk5nwam00suedsm6o3w1ju1ikhjbyaxyyxla6xagpwa5l37l5roicpy5pstjhf7qfjz0npgn3fltrdl8hhxto2jxg3wgfxe3u57krh68z4t41al7jxmx10guvuun63byox256h8evshl06pq4y45cmns23k2g',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: null,
                tenantCode: 'nx1syqatnode32v52cfmgkfviw5590zx0tb5skvbgbwuhhoivi',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'awq7qjpooe703jsbsrib',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'cjiuyz55wyuibz6aponaw0jyiob6mwb83p40xu4088w83bdk0v3yytwg8v7crko7s0kyw8toob08vo1m7v99b3oi23zwjsju7q1qp35b5s4xldbiawfqzijwj0ceey7kfd3p75hlsta2lod4id4ldfaxxn3v70c2jsirbor0yekugikglwxy44xvvvp9posrqqdk9ani23os5vpsyy5ry25mzprtw27cqn1ppiutjrkabbate22ke4d2rrrus5b',
                name: 'e8q9fc2trlhghflodgl2ns5cl1grl7bet7iw33etfwvtxwh970z6weypv6a6c8qvth07tdchlljprwrv3ekx9bc9a3k62x2pc2l8f96xqjm78vciul1fstyh3gsgf0em1h99ywnkcf2plnqdvyrjg5zjw04zb2p6vuiewoher0wp2rxbhjng7o679z07ziemzdcxb4iuccuwrnir3bed9l4ccm8qiqbwdifgcphzi28j7467y0wndlz0k8c9xao',
                surname: 'mmcypuzgtpticfc9c6r1lyc11c5ije2v2oj9ny4qo0xs52nn3fmaxn821pbrtfwmva9pke5s1zuqwjhcew7434r3crb3e0k8ptfkzw4w61p6plrf39cpexj2qrth4su7gj0tr42x1zrte3x5rvzf00di2c0silegvm4uwxsalkichpjgjncxfhxvuus4idjfz9gikcpx4w4hhcfbzq5cwxxjud7cxon5dkc6w7mffedyoy0h7ojyxp0pu1x0m3c',
                email: 'm74bdeh9gaats8lu1gsk768le5q32zmg02f9zhrebvluv3dyvekngpr7216tqm86cqkbt7iwjfvpvl4raxycwl1y74kdyekx3hif8zzlzqk6gtvcw62d1dw3',
                mobile: '962r28pd1vf81v88tv57wx1myeel4yzprnyjzclf7cm5bzx6nmw3inc4xq84',
                area: 'f172nr0rxttr1et9a84z8p5pt0xiodyij9qdj5jf5n8otlwjw7fdcxm743cx8ut96nkiahf10ov5xftreqpy7e3vvcy8dagx4e8pb2g9osy2zsgnspxmqzclird9eepviow77wz5cm88tn3acdrl36rd66e50w1vua4ip2yvwvqxz1d9qdtjq8mrqjyr57cvkefbw86cbtqrc3mrvmqd2gb9hsa35u8ovb4ew36902rq4wr18ehul3g9sntjycj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                
                tenantCode: '0l0r8mh7yadstfp7uvvobw3sl0phayshpw7eitr873j0r6zghb',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'gqixo6cou94v3rzbpqso',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '74rypf4skpmzkackv13x2n7g07wmdlq6vqp6i8kmiruton14fx3euwnq6ykkp1hre7m69uhdk0z8gzk8agpdcfvanykq9anheyaxzzlg8ba3gmvxsmrsuy7enpruptj7g44tknyx8hq1tl1td6tzwmvi0978pi09l2f3v9ofoxe4widwp7rr47sziqorxx2iczqzwtks8hxt4gr4u64i0m9a3k4nz74uhbjwccaml1ndds63jrnxl4g19gx0wtm',
                name: 'ehgh6810mow1g5fq1mk6h457mz7e94u0u52rrmfxwidq71od6cxir83x0vm4u5zlp74xab6l9pvb4ixzrm60zd0x3qyzqm0tf7nqr0hef0z0lexh2tqtutlxmtquj068p0iydn76z7uhx1hcr4qhhge1fxe6259zxhlngf113myj3kjyrjqmbjng1pnddf4rnvvgki2vjqfebfisstarql0q4bajz20ems4qvmfrem8jlqq0nt5vs96amay3s89',
                surname: 'e7o9jfgiirqd5yaqyh1yhqkucv5v2z5mjvp599qfnrs4ftxi8lweufdvsqzag64rs3hjwk7dawaqpdw113ldiymmzmuo2v67eybvubmc0w5fa4uwxdr5xm3n67izra199wc657fiyb3kk0thop3fkyjv3vvqqo07glrqhmnsbblltjekyfp3v5sb78vv6fg7hbsihb1a5n55ccr0uv9kbknl33i0u0u6j8ia8o43f6dhhv9y424bjh8973hhfu8',
                email: 'j59asvxmvx7gnt3nxtyrrbi1ebgg8n8wsttgixdsow3dnylu8ugjyixnykmgar08abt1iywplo84wgu41wkp4ecvbakcxd2f2hgbjlhj3kyk7a9w3dvxu6f9',
                mobile: 'l3cukzk801yyeuifi0b88ghan3indopzbtzzcxbts0cozfqjkdewvy2bye8n',
                area: 'wfhoa9oo6cdu6cq27i9wpxgtev8k3uojqrljhlwczl4i142tgbv0g3d0jiliuu6av9m67dnh9xilvntj6rc2e16r36au6h5hjnj3fadbb3gvb6fp5b2jhgnat1l6jjh6j46dbt8qyj4xons9c018joxpmn40jbqi0jv5miq8o77izk5v4iy148np8fjrmiukr5z1ad5cn0sc1kazti4ba09a3pa59e09ad4kyncc2w0gahssbewdl5zdusnep9n',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: null,
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'ebp1t3qmbvtt3bkzkhqs',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '9nbjmbz474f5oehonr0b2umifs7rohghzimhla0pn8x9y8xg57704acjm9ucxm55pzddz5yxhejqmy1uft71m9fmd69b7v5phqxdvyzakq44vif06gb38xryafz1uuskmrz9uxwgxtxd4cnbub2lsabawfiax1gtznxsijf3vvnwxxxf07mue6l1e4a8mnif088d2isr6jl90pycsqrvaeo6e8jepdfl3cmb59g6ebndbck0qr4ed1aveag18ab',
                name: 'yz2z5dvwq9u930cg950eol0grlzxu0u79425fnc67irqpw4no6ytsrtogf61lwkgiugia82149c3qh3wyr2x1123q9ax1s6jlbm651a0ylsgdmdspt9xx4qlaw38pyhxgy95nhce0iwhstftk4yn4esgoxrpbi79n1pqdtoky47147ptedt3usxzxky3r8o318wnmbkzvybskcu1vn5s3gnzywnqtuourwjzj630sekly9fuam7st8kqir1b67u',
                surname: 'fs0s1skxznhcexewzqc0gern1x8jzx3fyvlavro0szs79vz4er77ogz5xou5xonxd15q51weewqi4c7rm96av1s2xmdagc2kthhpxszi9ququcysvo3f5xfcgp2dxn8bte7wejnkuqo6d1n0frrcx5h38fxziywqsfw7vjpoosphzql0v4uoxogk5sesqwtsqmklecm461ydb9hpaywc17hktf5k9321gxzhlj6yr4wsj6i1tfuv5lirfbsor29',
                email: 'yttybhy3qez4zeytpzhqr76vhhbv31w7vovhdzgmxsrxr9ls0anyitbczxw3425fdl2fsgvuhuzolgs53i62v5wv5o3s03lsxt9t034xgx3klnfkt9r1b5vp',
                mobile: 'bskzy8iflwkftrygnl8q5fxepbet8tsvuw15o2b0ifjohx7byl33eu05nix8',
                area: 'f7s8zqnczcg7nhln0pltl2hzk0mfmgco132zrg825rfqdcy49a2r96vy52znh25w3wjl1nsv9761ku8001xs3ynkqqmhzfp4juq22vf5nmad3fzrm0fn45jo2bfsxg4n5n8czn6b1nd4kh7y3tg1m1kqep1wp5r7aqf4xw0set4b3fj2d1xo7yxtca733zn97xp1m2gtbm7dc7zp18xx7vd602z4hlbmzd9k2fdq2zwjdejnkpugcc715svjfj6',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'y93yk0mquvou4a2n1xan',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'ur3kgdxd1u7xebdhutrix361un9px2uxqnvvobrrayr56igy1mrxo030xtlv1fiznj9lmmlhk4d4b1o9yhidntt10wtxqcl1ym5j5h8jms54wl2t8t3dg1ljajg1re0tgttga8yuxyok9u194ycsh8ysh2o6v3r6ncp8mbi5g7zz85iqgy5m8shent2blvswwlznjusebqlunr4n8wly10pvitl98qcdsp1sfnm9vhvg59hmv0mw3marmxlmeq2',
                name: 'ocr4zog0b9s3cem2gfyd320j8gc7bqfqbqw36ckksjqm1jbp67it340s1qadvol9xk7m8lurpesy5v2setuslhwe3uy5s8lw5zoh6l0x54yylv9y0ewo5vn00xv8vygdybujluxv38efgy5jhjww9pvfvv4ytl654k7q21uvdnuj53kl60q6r0weox9l1ejozbswlic83mwon7l8ehqih3dx084x7qdc9vslejws8mm4dy3u4dmhxncv20761e2',
                surname: 'f8xy6k8uiii403myjwbjfx9hz3wpopw7ci81hoan7bh9hykfrz2tuy6bnq24fx59wy4eytfvrtls0kt8a56ucpnofu91ybarx9iux70gbprjqo33j7kx3rh01qtqojl6jp96zsl69671wltco4u8hexmn5x1wya5g4s7im8kdnowrx704xlhd41mtwdck33schwmlculi1o3sq9agmypy5al7wzl4048w8zb8lvokliws47j2hxwor060uazd4q',
                email: '7n601wn0ez4b2vwkok6qos7mquqbw8o2t3skx5w3lwh1m0tuzl15ish717r4s5xbdn7rxxhu6fvp72io2ojk3jzxieg93b7rrqrdiqsayc6jygpcp2bxhh6c',
                mobile: 'ieptbwlz6oyspo7gtyusa1cvwgz19iv20zhec7xrhgr1r6w1c0o9lz0faaxn',
                area: '7dh3q3hpzxjngvkb1do24p5n0aiy5i7hvko72t3inztcj7bg3c3ysn0wx4gjk94iy2zvik59n2qhvbf49js03yfsh2us5fxuk8n757kwcl3y92wvqdlydbz22o717cqjglfqgnwcbwdw27q0xzal37gqd9xncwek43vj8grv5z9l9uabzn8wnnmvay67r5u4ev5c2ecpubbwxe7ox7dw87bpldc3lfmgvjeonu35j056rnblda3sh4op49yk0uh',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'tprn6fc05dwhjeu7y1wcl1m0l1eoublkp81jmk0x9l3f0hq6bm',
                systemId: null,
                systemName: '60b401ygwa7efy1zyo6w',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '65oebf8tf6fp41qpw9ocr40k7473yugteyzq4wedzeliqofj951ua52sol4nv2tf86smoo7pblvyr90sll9vof3szt0jgsnfkpdgwp22dyy3vb9v8vle8gyffyasz3cqaiaoh5p88w3qg5ajxo0o8wuewkcgrmkj3zbmw08ncxblg2ro5honkneradu50hj1ckn5m6kpkbyt87zi3561ydkm2r5c90fjl5clezxalwlzq5rfx46040did10bs37',
                name: '39yug8xy9d5gg09e1qtsxc8lta5jdmtbqhj5xx9wpjd5u6djjmp6e6ao1hzl2vmniqbmqzb5te9b6sqg54jp3f1i9i0hc7ciqap7f4ey5zn4brp9od1t90j9eqiunvnizjpeof5oung0h2z8lz8lkrxog4vom9nc49cw0a25lqomfkl62b4zqreejvy3tbksdnwpqu96kx3p8y3dac6klsrxkeexqn1pofgo74cb7s3prqga2ufshlec9tj88vu',
                surname: 'f6cgixw8cspgdwh9nhv98l3tg5xp25ur8uj36v67ydw10tl15twddkfyha15fwin9q8urs1dwkve73i53ba7xbxyu9yc28ohrpinz2h1xne7zposi99knc037h1ig9dmztv789c7krtwbcma3r2gfncevqceiblzbahjtirddkj6qtljhei30q28f53y410f7bv1qc1pt2m3cxwnempj2ng8e5as6txny6nalxi8c8rykxkzmjajzla79g5wcph',
                email: '9usjr7hl1v80tgp23m8xtcnvfg7xtz2qgmfucjm9c2y0ezfg5u12ympntcbl1iwxgyb2tjexvl92eh12ngj8u1wxf9xe5ulu2usodnk8tk5agk2rbxhyipls',
                mobile: 'kv4crocubnl6lep9nedl87nsnreqh6l7w9zgvj0m9tmwrhubotza0q9omohh',
                area: 'vrjhy8tysl3dls6lwhx8e7wq7z9verja3zoc8fcn9tzf86to3gxw4o2xzu2ii6iz9vj8yks6l3p8j8ylhardez3y96pewsbzbun3su1vw9wiwj4k31sl1t0te11vwy0ybt54dginviqki9793j32ctmb3kj2cqascm7pd51r6u78p0vt9lxjiqseyopton141wz27bltd550o2amml05a66oe1stq8lxfr2u0infvwk1yz2egcpy2p32abzh1r3',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'p193pjdmvetzd7bmxv02g4f8p8kxqu5q881xl69eavgxhiq24v',
                
                systemName: '45j5je1g09k0t46mt91g',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '4itvuoawxjrftic1gd6i8ei6ovv6t2yw6bfnrovo5tme8s9ss74lyw1ohmutjol40dreyn5sr46rsffahg66tqdkuyp853fsfr15p5mdvr6kync7nd9c437cl4lic3q2iwdv8j30ql7yydhl8nvev2u4gjvtwnyywbeb3yizth2zmyk25iojlhml04itmosr7atmm5cchtha7vwzdydh67xt5kk5x1gv4pbxlone2sivgn84mxvye0cns603swk',
                name: '257gh9cl8m9tcpqsc4hfwg6peea7hqrna37k8jvcc1tedgxn124s3miym7h81ectjicjyoj240cx7jvqopd7k23anmr5jvqhe6gika2kiu4yq6htbsmxtp65vwevsrgaxr3ab1odmmzv69v5g86okb2eb59butyhbrbb0phs348nlqome7f81pa0qahebeyl6m59kxayknesewm3owu97nb4bvgu7dsnndugse64vm56iog0xq9pqerfwglnpt6',
                surname: 'c4oxv8dgqcre0gjzha5w560sb2nuz2uexypd6002nsq1okyublf1juqdg2duhz8ls87md7ylbrhxmyp27xlvbbvwbrkoqzni2lsq9j3a4fd3fxgplbptlcognftphe1x54ka7e952n2f4uozpgd77tzi4q9lcdgys5xedmoqvikdffouegeg326pwve6e504aj34t3t7tfhil7ndko58h38uiw7jclwm8w4ld3xh54wkbmatzy972gbb5ru8tja',
                email: 't0n63jbxciuglow0jj39je9lphy2ckukkkvu3oo9a72hwlj70pl2zc4e3ejs5rc16psclmv8h7ajl48l5478e5h6w86cmzz0oxz8nkr984urm96w44i8lesy',
                mobile: 'yp8o0lu0v2v72ezo5j94zxbnazvuoc1aikdu06ux3kzfmbmunkw2svz4sm7y',
                area: '1xpmewypdq4ma18tuyel4grwgasy7xu17xv9exilv26uwvmeborwx65qqozw22lllxwqm1ocsqpiif03gqy5zng736ahaaydnq7af14xms4gxcnlnkhetuxzdtr2ah6djno1u8jgnylyfnp3pdxlyl0f5vxdhowwoq5l5lkp3y0kqnfth8xtu2emi1v8pxle56pt8p7zh27qho5xjerenhvcrfmubq4g4zqyhpzpdeemsmwwfyxjos6w4cjig0c',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: '38uh7ciy2zyfimgw0o9pu7dh3fl7gtmo59n67x95a0h8gr25dp',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: null,
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '5l1evcy2ztauhsm4ntstix5fmor48xycsr54byr8vcra6pyuju0ltyt0kjkxh3xwcfbeymo5w4oy1ubme881nukqf083ylz2cvb3k74d0ktt9zt6k3fewaejj75grvm6zvg7bnd43niq9sm0s83epohu213lv4pl5kyeqoumth1piwq17tuie73f7m4vui5ajwskso3lyp4jiiuakh9e1hn4n32ifmuri488qu7imgfi3gpq6dop2i8u0ou4pin',
                name: '4ssrqr2t08n0he59bjct6qkw4eky9exzec3cu6hsb7aqore1wqgnmqt3e3hmzr9tk4uxjln1zce1pxv31j69h1zk9nhrfba57jtjorbp6q9liwaukkzw6fesakhtnfwle8pog9hi64ugzlh1ypvi81i3uxpwlsf29bh88cib4l9tesgqgw9w358t35hcbexbbj9os3mgm47762xg5b9a33o2zellbxvgbqgq5imddt8zpuv532ie1arqa35y0wd',
                surname: '40ommoeadk879ht3n4spn4lbj3x1v67tee4nf9p30bahvh7b3v0811citdq5m6pphfr6zc6x0h6kgtcmwrq4h6nxvo98pqemp4vp8noc02q8wcm51v3rqwlhigrs6osyoez91ebn614hym7ebnkb6bp80mr7njhqu5pzyet8q9j9156bn901awhpx22jcuvijek5gb0ug76znma5v13nf3c2n2905zx90a9j7mroho5nlbixij7qns0zoqct4d1',
                email: 'aglbv3exvckb99fn4tcxsxpupsev0khy06b3bi82z30hv2ngelxcgtf8c3c6pjgbv8fzndpc002nz4ab2y4tfblsbmsv7hwv3vx0chuzddvg5d0wg5esahc5',
                mobile: 'j3vlsfwcslsmtbegnr9o1s1kop9er34cxx9fpvex5keb2ljesc618ty63kn1',
                area: 'ok9vxtpcriwee2yqrhjy0hu1uh710sdelsy81epzs9et8cwbyb831ty607azk2frv9qkn4idc4gevbdy12sisnzx4m1ra9xshaaxgjhiq0kows44688xovpsp0hp82y200h1kkc0ltybnynt0c8dk1zp2hn2f5qpxtvzb2bl79ajrl9okfboybit8rcx1704id0vccrp3ysv7p6zgb9uae49oln99ff57igbh14fjzqouj881mvpejiwn0ul2fk',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'v1tielchwhph3oot21dbimciddz8gckgchpyz03bs2onlkhlel',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'ogwd02ewx2t4ogqnyuqx2p7gb8nnperty3j2pns5132mrm3y57vczt9xjgzr4yerlagkrzbbvlqfxgr8wfddi4xu32yr900jbm4bilv8gwqju9fr213xdpnbtbgj1rk39g7l0bf8doy6p6csygq23xfb3m4z6977zb2p9sftvdx5lawdq4qb554tfo8bfv13pkuukwkzbyemykvt4lxpgv8zvy8padg7ephuujc2r2fh21qk16i0wqjxwl1kjja',
                name: 'f4q02i8ohtsvlwehks18qzngnbhq5tv2b7e120p4zbm679e09j0omsg2yhrx5vehrw0i4u3oxoyf8ubc9mpe63x9zm97deqxw460jq7fcgicv42qbc6h6j7i9nhie2bs1n8olindn5ht7p6e4zll3lyniabwyz6zeydlqqyalgg4hl1izgzddxu6grvi0zfbjnr1h2h1ru69gaqe9wumps2s9mj54qp33umpah8g42exat3yxh0nu23iv0w4a6f',
                surname: 'q20yo39becr2vqfrwqvypih0zju5gsgqiwnfjwq007mrvjnhlw3qmmgg7nmpe4wviqulduu8062lm2xsr5jtr08zi2aqo84syahp8x8mvmmg4734vetqlpjwolxven8oued7vtix0aq02h9w90co82i3rc4qumsf53oq3193q0uvj8379q4d4rb3fccun5oy83qu32l3gc36vhxs4dy5q3d2l4e6lx55i6tqgwvbqinthxx9e4bl00dy6h0qzgy',
                email: 'l1x8tp5hxyzfkpfwvufzxfpomw7s42l3jt927a46ftft80fmfh32avwmka4f0p3sqan55k4on8041wta4ds3vzbrzpa7k710n50xzr7u6ecqxj34i4qwi1yk',
                mobile: 'who1kww49zg5e7dncc40iitans4hduwfy1viexjxp4o8o171lmo27eexkbf4',
                area: 'ebpchoxuj2qln63g4op8ry1c1t94xc2f1udrh2qtxujzunvdpw0ugmf0w1qbb2h7weucto2hiufw4fggddep3zc00c8n1unc8op4xzot9o4bm6p5m4fgge2a5y8ve4zegyrqf3z39ql34u2jzdn0ym73732oaeo0su1c54i04dbj4r2bkykt5u3t43mmdo0r1t3t109y67vzf1kqigummn1k2yovq2jygm1jyxs5inqqypg0eoaglfthp443d8c',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 've6brhvf8hbmay1737yisyp92e523rv7mpt8ixxhrgyxi78yzd',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'be2omb4u4ioj4zms2dog',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '756rkszwp5zark4r402ae0zr02lqcmndl1y39oul7nz16vf2zqiulquz7sgs3mz5tf6g4ii0ac2vtbvgar6djbwephgbas4v20425hw9emq2p6x8fkpqhet0728k3nds5vh1gu8h156vjhdbceswr8u142pagk7y5hyed3xcw2z6b74iau512uf882vkwisz8ao9ncvpnuuiw0lst0nntk9iw8lbmf3p08v8zvy2srtcjp7yczmbzixinsvqi38',
                name: null,
                surname: 'u6ps3zuaj5r2ixjyxivryy9hfd1itjhhcwvnmlphpuf9t9gjr6ox6b8q617dk8cc9ogvpbe1266abu05gn62nk3gnmnz5dkveiimk2ggu8egr4lss2qr8ffl6s0wsr183bjxlx1izyav96xfxf2t8njbvl8xgfpwhoncd81qita6b9fhkqgwnl1bif04x9kk7cpousq0ku4rc3x07efrki6xl1axvvfgkl0wt4c0weosgdgfr95p0gne73r59jb',
                email: 'o44530hjaxgxbfvka4va01dwlv22iaoc9fw7znmwmehejs8ygdeq5tp0ylk99hia8h6639hffydnvlfrdq6misx1j8fdviaolxelozn3gkfiknqkuq1qbfdz',
                mobile: 'tjc1sobkqrr241lmd5m73dj07fe3hmyxntgjnhihfw0mgexbzl3yhguygtab',
                area: 'na5e9umn041yywi2txt8bvrw3gvb2m06mkslgv5qmfj6k6k6bhgqnwyfu36zp45lxfp478cnujpgxvi3nb132xiwhxdvcihuipmxxtj0bwufqomlp5ggyflvmj5mks5g445v032gvcqbtcyd39soqk3qxjqmkyg4oi1980fwumv4js95i80z2279oib6euphyirlntwmlh5t8d4au4qwhvllkcvy133phv2ja90hmccsbd4dc7gw0hvm0nxd6u5',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'tpi4pssz7nol2tbprlwjg4a7yz9lbwzz1rn1t8ucuxn37vuqln',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: '29r1qs9m5hnzt82oogn5',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'h3ytkhkhdrmqvkyl7rffaqoabo9sda7ivcc200wwsddqf47sqp0k8yo9pithnb7opupbjv2uhwc1wxxed360pemqh53xrrulm88rbdapc9n42i3pw8s7nfh42evrb2d2203zt6vv9u7gzewh4wqp0bm9wpsjbuxtg5a2jwsmnmw8xb9a0ctugjvoiva3sl6kvll7vhatrry77j6z1pqnvk3wjrzk8jkv7trdz0wv4tkvf60k3pfgfxtjinqhss3',
                
                surname: '9i9q09xief6ec22a3llplzh5vgwyxhppfbe5l4qa80i9ocg8wufnzcfg0d484c90liu9kw8b2fszn8d12hipn1x9oasdfjkg776l3qpny8zkuew11v0zovfsok2o98jbvq4v8ql2l6avvx8br2igf3ljng01rbg4fodzjvwgdci7ohxi7ky86n9dj3nv4jy6s4qfsqo2dozdwgeg8jqgonha1gedvt4w2rq8shvmlm4cdcr9f7h3mg7tx1w9g24',
                email: 'k3stc790bjuxwkg7y300ut1wsr3lxi1oq7vr55v6kefntfh0wmkd2vdrefxrutyrqhvzt3m21vbpgg1q98gcpedys3mjujjijfg9avpvd59mb762ovq1wjwd',
                mobile: 'wnucc84ezv7w7i9snw2pxciqudsjzygw09bhkij6k3n7npnuygmnx621xmie',
                area: '6963rzncele4m971yfheyfdluca3trghqnd9de5hs1xl356vp56sjynqsr9fidco2twm0fdzq1mpoz4vvyjy01icuda0ol53iq8u2l9i44e0b6ottnwy5gnrtai8e55k41adax0nnz8a4btvgr84ggjxycdenlrkkm8jxb08wix8z7j2u56lp7rrnwnyy8sntx4mj6q8jeidqjwmfjc427ebvo7kmbco1kmowlo6w3xmeyq0l5vyyh7mepd5sf8',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: '1b1x20jh0dqawxvekiuqbcv8lmw06dxwkw189wk8ol5onovbew',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'xjmcbkoj5073spsbfgcm',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'hnxzbxrejmcq7gtid4hhchwabzb6mr4wvcttb6471eb0fpffye3jsmgn8svurvbagceontq3mlxoot72tt6dsamp3u35uktbre5hhor0r1yqdkihd7dbtbicb7l21q48oj46vczu0uhztad4737p79d5zq89f0wdylm606j5kerolsw36hwcwd782v6kwdlwc2tg5k6hruvukra72qpcxxezvut3owvg6ua0t34644cd0wknahmphzo46h1c4x5',
                name: 'bzduu5nagv2dd5dn8m1h259ikxd03bssmpf3e4aaun7a6iefd0rylv3t656o8tg4nrf2oafkbgikzmmi9ccl50hes5esfsceqa0bxeboei0pdish8ense77g59ppdafa24o4v5i36vbtz29yd5cncpldknnbljl96hfmp2som0jvjqcfi0z2g2qjrp3nqd8daxmhtnozkg9yp5ygd8ojx9kj9qbbeiwv8tespm6zemc1nxy17duvpolecx9kgjw',
                surname: '2i65o65wk2g5wlrv9wra3g1p61ambkj3g58nbghd28u8geq6tvw88wtl5q7h8ruufmyxlnlcf5809iex5ox70gz9h776pb69hdf25x91wge2yi8xr6td55txdquypido8nnip3fs1ochppptkxifky8jv4a6n51k6c42a3bk83oanqzlsc0l4ja237msrh2ewienec4i87wzi3q9ne1ph6hy35ufikc7uc59qaa37ihwz2nt3c0tjfowd6dnecb',
                email: null,
                mobile: 'nhjfn7t58bx0yyasntjedlyimlno8eqkoc8zdn14ztlsiq42sqz5yo3m3ra7',
                area: '4kz4go27tk9hlqqcehp0720moeciab651n4u1fey2bq9a0shde6fnsmie6av35q2cok8enmri75tfypfdbing3t216etbyokuiha5tuikip357t3ikk09vbpbjg7v0pb9ivv4xyowy8ai410hn9ot1spn7auqjth2pzguap6c8j2yazg95r55lgejqsg9s2bhk52dxs5xuik4bw2wf0h1kaaok41uchujk0wofkw77vufm92x60hzofo54zb2gg',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'o8aku6jdyet9s6rhjilwlbv2pq92kcychup7bgq439520b0ifn',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'hbc30u8gyns56rytq778',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'aej72m31axjjdbdb3in4aksi9e06rw9qwr9aj0inscs014kkg18blcafl1g34lgzk6mh9ws13a30qodn1l9m6075fsqbldsjnhbft38t6l0g037tth3rjy0141e8xgscg3h15hp6klaxyq3a334tcgfeg55qqnoa3wygw6dykrojsj4bv4wyt6uzdsvsac1b5l42jhtiy5x6gg5of0jwkja0a3tl8ubg5pgzn8m38dxpe7nxdpwrtpbgclrb0hq',
                name: 'jdw7qp09xk872ejpxaqzpa5c66q3uqyewlef6rmmdrl4ww4nlzsjt08gstriozca3w7ho6k2no9y2e7j82soqwnb903hmz4ggzrtrg7kie98jn5xtnl0yl3fert2ejnld9iijp3jq9siyg1q4q9ei4sc03twlk0h8z8108hu7wyrhfv320tjrfj4tfdq5eahu56pm4mrp5ms4m9n995qjtv2uoq6ukna5cxo3pf5kcg3rcyer0clst43j9n1isf',
                surname: 'b0ypehrvweojpulq5kfm3qotqjil29wkrlbzxli1lv31otndboducojfrf0a858doxzhw5csl17h69f41l7bxdoa02mf2h32k011qffxd0eoka2ytiriywemforqoqu617ld1gtbudpu8z9io5v78lfoc73bnuu6aonsuu1xotxnok5nu2zaamsgyygs6uw4s97pscf5e950lz849pfuwfmyhvzd15qc2sl1yc9nr5q6ebkddh4zzzu26jr1ct2',
                
                mobile: '07dx6v4aawtkeyuwyqseavc1c50d38cu1kkecu6mzocj4ey72oz8r3n1bquf',
                area: 'krzu342353or6j8chzzlvyk2o74s9crlsvrnsv7wi0nyltbxonalx8cw8rfuasffmwqtsh7wo683weilmxig3hdh3wd5vs54czxm2g4n2ewkaa8p81bravt0kpj9tsw44vru9czlresh9zb3p9h7uw10ni7l7ezoaeg059fe518lvl9lnmnnlyw6qsnqhavqtztcpic3z5ssrgb2xnn5i4931kg18k2acz3hb9wyqr74ohnn4qiqixqwkyxlz8i',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'niflggbyc2s6o95fmyewxg3q1fxjzue0cyksx1j883ky0yz0q7',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: '2450rl7ey2b73ufedsd9',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'fe0ccpu7ymmvdx67s1w2qkyq41rppwrrtbrplrkrtq2vwwt06cwse5ivmnps46ncaj77ukqgp9d6ux867oyv1aa86bwht7tqakacu86iz6bu619wzh4d050f8w64joss0j6lp05ikwqcyonfjcej264ujaqj4aisyw6bi46qacdhcy6qo3dpczi099ysake18hv8l67xuvisaomi7r0hxeo4ejmbs971lnh6sc4rj78rhj7nbs2gk6u215fhvjn',
                name: 'v3dt58uaxm5rdqgr84i3rhdiuarqn8u6u9gocyyux3gx2jlx2fu56vtwfm4rghywfskk87vlzhp6g0ozu08zsaentml3ak83di7s4vwwh2h5e8dhyx94lqmb292rbxiqrz3ppk14a3cty391z0msucy6fl1jv8a48natren309p29d2nl0lj2h99e321ny4qovue5hq42d4rlsbg663u3ofqhenp0us5icrssdlb0cfw1yowalv5158x6zi02ou',
                surname: '77kw0vpq9q5vcdgxitj6om2jhthruospj02lob9b2a9z8ofgitwryotgzx88t28wsk44g6j2rwzlfjd74sq1m0it4in2nlzo8dqyrdgepw6020r79u9wbvjw9702ymwzkuu62y9xrwjd1bjw35bif2awennc4psnhh8n73vjmlzjqlf2ktcpdka4hbixy1ciyyw6icoxmhrl09e0idl9sa95zt0x8yzgea24jkf5mleg9b3ikbrwlgws1yz5zu3',
                email: '83rbsk0t7fte5fxz7wbx9gz4dp0o6gvwtsvshqxgtp1lkjpeljj8n2wc7trtqip3ayk70lq1sqkkhb1rcd623j69kuie2x1hir6aicdg289qdwlx18vz5byz',
                mobile: '6qdq7t62y7x1ht3jhp2bebxg5686dswsmidpta0p8rc74mcl07dj9ypwajam',
                area: 'qbzngwy3ojszuaucxbhmk0lqxxr4vbpxsp9oejw0u2gzu2va95pxv9sjh2f8479swylavcak37v6jjkht563lmbg2552fz6lp9i4zs94foaqabm3138a5h95zfduv6ik80re0vstax297rxgyugghtqf2bd6r5fknwe4et7b9ikssuwq3p0lsawnurmwo4qfk5onrpglw8zw520dv5wp4qgvljkqzet33mgfpvbbj4xbbb77g6ieihwl6tjgupc',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'sacecqgf96m9s165gktyuw4e9hd94cnkskif20wnao7l2xlpxd',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'gwbnvpfed0512vxzo3pf',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'clpfk57qogprmyr1i3owrbnsq8hg78jagmzfo9e7a0au9g64aprz9klssk6htzm72l15pjfpnk035f3mcwapqkcrbofbhk5ando2dn19stw8pzp18dhpz95x4y761k70yittx8nkn2ywyubtcdhek34391gyx8lkx2qjvbpt8odg7d6vgnce5kjf24gtnaak2asyqbcjjgyxlv7c3wg466ptajoujhvxxnfiufr2j0j35xkyrf1utiv0pedrbm3',
                name: 'o870yudttieg5tgdfxjvshaojt6new6townc89cnqhvceinr883z66vhxeph7ccer99sf45mu4h9oq9yv17l1vafh1qsnwhc9r3671u6m2llw75vasga0btbpi4hajmvhp0keqk6b2p41w5o8c9p2cqd7ae3kq74r6izpmzockkrr7k4qc6qn54yagma134s1myyx003ejs1jvudp5v1rql6tw2mel8scry6ku4a2wdmiz755lh8oxudgdm02bj',
                surname: 'sclffsfpj24eeiomhsw4o5bjyr4m7xuv9zmhpeitezdaq7bpy5jdno57ys4qj5fw4zduh9drvy2x1qfk0cl6uzp6hfilv54buta0q0p4126e5vgoldhfpphl7tvsvypuiz7y9ubrhq2kxif5tsbipuuxlpoq7tgdt8674qcdb2thqtienkra49lgku5gka3ttp6dd34l2wlm89kcya3u8s1ejskiweo11u0cduei84rn613tj9npdzluhyuw6c9',
                email: '42qm8soa4zw30mioidyig3m9xhd84igri5hj3ash6bbf9pb2m2ad8jx8jz67lf543d1hxbyat70mcllkrbmehh7z0g8e6ryx1aeq67rwm19erq6vip7xtx5p',
                mobile: '8btb463uq97gky94gvxakvknfu72zob4y7aj0arekpdp3cwxdr76kfejiwlv',
                area: 'f07gx0cenvaijj4aahqpcg4zlw3tkchub2nv8iwiwbgnjy8c6zvpzc5x0wz26ucgvixi7selmasmmx92l8en30asch6joppw8xe2ncolboknjrbsznkqfa7ggljfiziv8rgh3z25grtua5gxbl3ke2xxz5jcguf3l2kv5vcnioyxcg9hf13i5ypfhncgm6t42ks8gcmzs1qilzdfi03klzccc8svmvvnnd60ywjll577jrktmbof6uc8gu2la0q',
                
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'xat32ifjcujcu3lahhpp4tszqcribfcwe3d2as4pi05n15ir8h',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'ixodb9fvxsw0n1jqv6ko',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'ztj2jixxhotsc9ae4n2ebm2991hzxrvm7xvrjcike390egg34ne6f871z0547f6izjao6v6hsabuv7cn8vbpfmaqrzx8hxik23oj9rum444z7xs2wnmkus7t96xxwrlvqj76sdg1ataquu6aqooco6p95vmzwfwfrkr7z2tvsfrtpwqaxz35psa8zimnvzjzolhs3pjuw0q5epno8vtiwei7x27fz9wxcnchz8h2ls087uoqczxpa24whmbccgr',
                name: 'igaf8f8c6n7h2i7zw1dr2z4t1jq055boe84ba7inhmdv5iwbzv6tv8kosyz7afnrtfx6avavppszbdw5vtevodmuj32nvsbwsf3qzrot16emlpjkcnue4lkcm63x3ez8h25erlc8ghtgn617op2oj628caxtutnxy2tkzc04gdwcr8cu0vf2b5e2l1cke13a5jcn8ctnvg8k6sq9eqy3l24yip3hh7ir84od922fjgks71zv6nt95i5qboaj5s2',
                surname: 'k6n2kf5kup6xdqzl2c0qdmedcybgpcsshqt70u1s5tpjah5ks42bzuls95lj0d5rsfc1vmf6rjyvg7nv04t59up23t8si1v0z288kgdc3i89lsy3zq3rotw51hxwacmi1g78ilb9ep2i3nauvr813u7oulv7h2slh4r5tgju21j7fj3vcplqmxfz24bo2xeadx8nhbhaoh5ktevaokgtdh2wytaylwhwyzcod5lfrr8tbouqfrm35gej7h9so06',
                email: 'o7cr7ttu3k68dj8vbu31k6lftz9i8fe1pn96tq7s5jafsyb2pkozmuz5n32a6m6buu9xavnom9vde8xy8phlgqx3w3ieb6hy5yqsz4im11omblxaku4tjo81',
                mobile: 'iuiemqmloka2jpqg8cuccjo5t2c3zb7jwrz61ldpq8fcu8tlhwdlm6jynt9a',
                area: '2lkjpw82exr2v4i7zft6dubu7u8qo9cpxo2v976bps6ujdger8ixl76x9sro00x9t27if291oaayxjb4nf6zhbvxtem6awem8f8a33pgajbzt0hw93ybqj5hfv5pvsl5vmnfhjjvh18fhaoelzyb38wbubnpd2iiac1vev0oz6d9beksrj2vrwebf4n30utd6c20oh3n5pt268mk28ygsilvg9mcgfilgqekwfmh3c9ay3r7gxw4ir4z03vzxtv',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'cxscdd7a1vttupfgbqk4v7w5fv6i0kdp9sd13w3mno9b2uvkt4',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: '4ljl4z2ur696ui861a04',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'pj8ei96yn6m8k7zuf1wz86yo362zngav7o0fpvwg77yiosrxwavnco2rfje1y06b022vl7ib0kgswns9leoiassnw2upmr7hodl63v3r1ydkkh3vilenr1m41jeud1z2c5qr09fazid9k116wd9g8r143atg5rsxrz7v2svy6x9wrw5jgi9ghj6fx64cbzmnduwfw30uyl4pof3qpbv56ec7mw7mttr3qc93uo8z7dlnh2hs7ut5oho3h4yhvcj',
                name: '9vtqmz64u58rz5mcs2gajd2l396uda9cjh6tklvwa7lrscmk7opfnu9nmr49lkub6mq5ruoun3l6tahv0kkht49hxyih0btzoi73zhhuo09ues89ruavyvqesywce8u3mv9e61c3o2ml314gupzhgnsxnnxcq3i6kuhx8iw3ltbp01mkvgkyogsclaqub5n2yshyi3pzrzsxwo0i37q74pgmt517u6j1ywqocd6o5s6cw0py13my1iddhcanex6',
                surname: 'iqrlbgeua3ex4g8e0ajiv5eub91k3ctkumdjcezuqrj1jqt25blkg86n95h9d4mmqopbif2u53axnm2aq7ikh7xxwusyf89skogz88hcvu0vk665f3rwmki5313yner478k2s5n0bnazmdvho22n0ist6teww9hegx8xshgkpid6gzy5hub20rl960zufd77t6wrr022cg24aq40pvrvfuhz9l8jrd7z61sufm4fi9jxmd1s2qb4zbbmf6sc91c',
                email: '4rs9pncd3jrnfecve0w04gmg4abgfspcw909pej81ufff0omk97ko4447soidcnjs3lr6592xzmo7l0zd663p6ey0htthodnchay1gvrrjrl5j5l6v2xoywy',
                mobile: 'yijq6ydnqxl0o22x3qjz6umomo1l9nrjzw06ozfxqiy417re2yme2w9094wa',
                area: 'bhuuzrd48z1nutm3wpn4rbzi1kmr5pbmyv4fhdottsy3i0jppa84omtoi6d3mqvl2s441wu24vr4jl29i8mjmw6jjifaeb5vbmn4aidu4q9sp9aa33h50sur92uopfpfz1m6q42ho2ap0wjudrkvzvpwghrev7zpax174cortmsj96278njc91s36to8t672btndn0ea151l6ek1ptrildepyg5haj4wlj5az6xx6uzj5qcymct7s1m2ukcrsul',
                hasConsentEmail: true,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: '0ybwr4v3bounzyk1h3apj5ha2jb3nddpm5gtnxsrefmrvd8dv1',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: '2dm9nlo5n5ew5w8hsr04',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'cvfadp67ce0krocuz7edan2zmw05y7ou3gt78otvi43i3uwp4ugp8l4eojrtp4zjay8mmxe571uhurtu0tgi9z6u8g3ahfvcpvg6vcpalzd51p7jod1h5m9urzhlsa9wau9hx3cq5qfx2ocxrs5qu5i7h8qewyb1lj7aq5cazla2dngrxdo6cec2m7ho76g5r0ea3092pqafkhtmqi8k77qdvgglcqa9atq0wgkam9h4rw3r0q6s9uwg9l0dq2h',
                name: 'l1aqxqxpno3ydver0bmvklky0z534wur9ro77ixxc5ya9ygypdpe1b29sbxij8lktptt3pf74zuqv31zwow7o5c2nwojqfnz4uuhrm8ui3kh8etug8dmnte9pp3z5y3piyogg97090q1od305l2de28gsgawtwt9sch21pino6zi84q43rsib76570jl8y7tty1dum5uz8m0hgaa3flrdgmxe0f4tczyw5xhz4oe6sd3a1y1cgxat4x3pive9bp',
                surname: 'f1opitsg6dbiksrfwc0g1nssar2bo7e52ya0qf38kw2s61fh78lbo22fsyd686rlkyi5gmq9f7awwvpmck2ipuvytlwy74ca7tdx0d6d3d98zgf59b9onskaburm2o2essqfmivjpuhswgzutm7cjp263r4c5kz2q6fjyvrk56sdq0x2m0x09jpp97dfjogly0mm1dl16i7q021bh6sxzedbkjsxz64sgzkapxx8b03nf7itl9m6p4832okszsu',
                email: 'ogwehsvyy115l5cke8pfbc8k2pquwttxqiv0qy5qjz8si5tryxcz0k6fypu5166lvhe6tn7oqovtf982ipk9m0b1t3vivxnnkwn1zygpmv8b0xsru3sg5okp',
                mobile: 'rlplp191kftneob4v5k36wl30dqdldjr0eyz1rez2w50ij5tjp78cn2ulacz',
                area: '1zgcayqslx1yfvu0i7pwc788bqlirfnaa5l4qfun47qfsy1chgwakdvhr4imuwr6f4kovak550a02xmwl16cj8026ykyaqqh5gxvv3pk9tcncfketmze7bhmaxfx2l5c97hqm632qvf182dtmdwpqtgpftu39cr1umefl91z76ylx0olympeyu3iz99u53sdm2ud623fg4vuf7vig3fihzwgn80it1ofcl9g6lqc8k3zgvzc15fx4i21w65um91',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: '6996ciksf3bza4lwijl6ddq3d9qc515pbm55ihm17x8h3gktun',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'gbl5wsfab0jl0p62oc3m',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '2vlrrz8df5b74py2z5b64fd1t2ezi2ho2fd6kziqyvf7ks3iobqnxepchmo0558815d4kivlzyyyisuj4tcd0jwglmregjkevvwacftq51whutpepsfhu6qg0eczutppanrevr3preq3u07n5937rs0u7s6hzzcao561iks81k2m5tngtqvjficuf6tonzeoinz66q6n31l5h8zwfas9gkq9rdr8l11mbqyaapo0evxmhfyz5202yfy9u7lwyhw',
                name: 'vtvu4dn6bsoz39l1y1xklv23q2o4n3cctlvydge4vvksswyrntuek9tikf6q1wmzf9857bci7s8vkmts3jnlgnpwpyruy2lzd15sw25ua47itdwmtg82vm9yqkf6w6crw3k5ia9zp8lo68ovgrmik02r77avqdv8gilpdv3i0mguh6v3324cyjnah5sh3i034jeaqogk78v1eatu0s1f9sfcmzaorey1lq9tj6om3nd4egmyxdqttarisheiixn',
                surname: 'j4vxsmbtgfdlp60kup3yglfsb87om21czsgcq21mzj973c62djm8grnchggo9wr6lrhm7u71yys9qdtlg3hziy8v2ll6o41zho8i9y09jiy97qbomxkfti1yxthauz12uhqjdthiuv89yu6wntl49z1lw1kveabobsk4zhz5j2pmwtexkpayzcswqhvh627kvcxrpxt0blc58k0ufdu7htjb0wyfc5n8zv093chm3mwwbrib8zkhvmyl5dt0kzh',
                email: 'qyizrk3pj4zttd7dtvjoqr4rn3ao6y51xity066xjihnk7kqpya0ffknoje93fdx3cq3pzerixl0dw52j9sefxpcvzoze2xhny2a5w2s3qqvwri3b4bdmwwg',
                mobile: 'zj42w4g6q3nh52bj0pzpmo90mf86t8y9q4x71n13032bs7ywof0mx1o10d9z',
                area: '43m97o8p46qh0tbhf2wcwsvw9shw1c79mtkfezt3qvg36oo75pyhh6am79ssvrzfq4lku7i2w6joz8esbvr0emihy556v4pge6tyx95s1wclr02p3lvz5i59er8ggclaro8tghuhtoqncd8qsay904xy2ut7fs3pwn5ydmtnaymy6pro0fcul1c3mdwswayb3ug6xb49iznekezvxe0zteswu79i9ktuieg8abdb9r4jbg6bha56t1ocyvtulv4',
                hasConsentEmail: true,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'mmaw2qv9ercjafrfetotre1kfhsj433ubso2d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'ts9no1dwu00j4d5mvzqumv7c6vofcaasv0ed8lo6nyl9tauwqb',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: '4vtg05tid6lkiumr5ntn',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'lo0p60j2bm4zn5mabenei5shvjj7eqkhxkt54i6ghzu64cqoek04cfqbvqxbhmjn6q9w1dbe8afeonshlvfln47rjlzu6c0ors802m86pupi9zprsc71wod2x1ibna88qn9vxmlzxsomysxyx1gq49bpoyrrp79kf10450wcklpfcime2b4fwapvu1d9x3kz1qzawpj4qo2lcoev5dxwot7mid8qddnnj107zetgz1ku1xnlmvj9rryhmeu8kqb',
                name: '92wh7cptbqd2kmyu7d5040nw3lp09n515ybi7049vflivsz8ifwz0j5i3yw4tson93l6sphglfawb52j1zuhvla8zta7v4dmui44wmkttml64t2gvwhhw0v9716ifti84fmmp7r1vzut93fkcx95thv7yt80pqstco748kcesvhfk5ru4b95ytiyenh15h7wy6ja3qmgv4lk2uupeg5p20cz48li1prisguvm4ylmwir647ox0sp0lf2mm6aq2c',
                surname: '7ku1yvpt1mkb1occavayymlz1v3kvv7o84pgelcuyqsk5mfulimwx49l32pped7ekj4subuiu4rpgcjl9892ceflmy4urs5k4nyquzdbnwut2l6akldqpappz07q6wi2yxeqkxxr8wg2aftdijnrfprz88l8hsgw9bjohmzcou28j5i6a2tqus30qmy5vp4awf9yhyfhoee3ezahebkwddizzol63bgg7kqru8seezhcfsyazrw2ceyh5go7wb5',
                email: 'qr9a86nh0h47xo89k8ne5s7bv08xxgmiofc5en9vppr7q0sigb08xn0ap3ubtowl02uy4eiofcu5w03yu70fp38w4u1bnw9chmms4pl37s41a0vnqe9l6mmh',
                mobile: 't2w3wujiblc6fptrgpahkfwjdjuxaaxv946s381y1v6z9tn2qdr3a1tx1hd9',
                area: 'qhdu3uanlimzi6wtvy6zw51a84ndp9glxoip65ec16kpbt7bb2yq39xut1cea02rf5eccl308qszq9zjyeiz1op3op99t3oget3xliv2wyfi731jved7vqd64eps6rezqvjeplwtrd3m1ce7l4ojx2vnfv0vtq3r6pxwr9byf2phz0mn8l4pg7d961ux1fmkbgybqmm85qfm91jvuz7ijvizdauewiassoxrzfzk29sczfrituy66a5oidxb1ce',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: 'mw9ai9bvii3sx9vu6budld4lgkyft6jjanxua',
                tenantCode: '6qrd3v90u343nq6d2ihxy1j43loio24jcwjs0ukptakdbg2c7l',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'lukhx66bkt9uvexpvi86',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'qod1p4nqe8xkunv9f071ypmoeqi2ax4ewl1vg4sghahoodoqp9g2un29bwodd41xpy5g3nr1qnmeawclnx6zt2jhum7eddmzr6o6nxz74gwwh4bjwdu6ltd1bt87w8nu9oqqy21lhx18i2vqgt7e0qhzcuq0it4xe4k1psjp1rxwado0pldel2cl75rh246gyl7fofyucdjiizvdt11h3ngcuqd4h82e1kkhc2eucw83zlfq3zrtm7mtc8ha7hr',
                name: 'xhmpp3i8oebvyei2ml59fl6w6kectjbpk2a8cj32i91rijzr2h65vxewh3wbsu0fjrunht6seo3sezkot1t2hj5jji6utuoak95ox0wuv6t33gv0vzex7napuhker6ytfyzbrs0drh5rw9c0ra1sgrzl8lqrqkiohp24b3i1s8yj4cady5t3pw6s5a36f27jllu89s0yykgyw8iz6qzujzc0np0sqr1lc3t620sidsbzcqtj01mbpn7ns6idavy',
                surname: 'u9w0uz3kfrz1yx2c5i98g3kjhcre69a1b7fqnz63qzjy191t8gy6gmvsm0nilnio7my09tplgmfvkks7weiip9fxywhazveso7f1u0k1t1yunpbttk5diy81b34iv0sbvr39h9h6r6330tmzg3tts8alkp6eya7ip4ecr8wkw3vvaq9zg3uthabn3sxv1g5bu8jgk3y7f3xchm2dw9463hlipgepu3clep7rcm263oa1zc6bc1xbb78a8t7agk8',
                email: 'lid44mwitld5vtm46k0l93k8hksmsf2hmfgwegwsewuvgyix0lzr3ge22qo2rptzjof1dgcyqc707nfgf8gaqo87kddi4vkka4fze37u330wo4zf2tlqiene',
                mobile: 'fco4uqeurahyuygax62b1nmqxgtjtzwd4njfrn1vs127f95dzbyhm6w6rt1g',
                area: '52s5rubboquqed0imy5ak9d4ebk8b58mifbqaypyseyelan7zzrecbilkjrwk8xz9fwkkjt4yml85hwzek2zkdyththjqpqmiy5fzjys6uh3x8wwrho0i4kmhlryul3lvij8d0c87dby5do2oonwp0yum79tdx1zsvzao5yqc033ztl2132noqc1e7ch8ed10eyue75lpem84ofz868t8on33bcbo4ed5m0t6nbqkx8ilhgd3n52xe5ynjt0j5r',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'cqdffv3r1t238eliaaknoscij3z2b67l2jo0yjz7vgq7reqr4w',
                systemId: 'wkihxgaqx57j50okzecen8k3s9l19684xskmx',
                systemName: '62j2vkpass4fx89yy8l8',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'et7y0uexbdxp7s47smx47yz6j5pephvc5f7v7ec6prklp7c6c9hnrfhv1jlx2viw5gfjtfou6lr96p4fdm9j0ilw4wm2is0j6w2kbqr6avu57f2ogqw6yo0hgk7sfdaatqdkjw9kqde7zc527rq02cxyelgigx9z7izjngyxzqoiooxjcgxc4lcyf8dekqxxa9ruoo5o9q9sxfcb17jjuqqv05o81w9g25mf3otpp14zra60qe2yoyfda6vd7t9',
                name: 'iqa73zeds1m0ehyljlg17q6g7pf9i9vvobvabr8ec08wgpqbuclxygwr7evm0ek6vph0b9ffdy3uzi4p9npxxa8pqv1jgx4clipc8ei7r0e4u2cvpillhakqxt42ajx7stssvg408zanbm1lno9iaqnd5i4y0lcf1ybodvc2c20vuosrnepjz0bzy0hk2c8iolyqsk4o4mvz1a2kaq1bzkscj30v3xl1pdpplv7bacxemu0xcnhhwt8rl2lb2lm',
                surname: '376gveyky8bzcwz866c18qodmkytgyc4b9uxktt2qdz1qdws8gcb96zs2dyqupl7pwqvqptq8gxjvdz7j2kry5pjk3fs187fkkivgoorxuiveis7cu40p41gpxhxb8lkoxlnw0cgs23571zq4iccz94khd3vnqi01mw24i83y5e3fmqi6fepiehz3ra83n6cgu5npkdbf9dof5z7u68yte745h55nlt4wztad7a3r7zdd5es3u2heis0ihc252x',
                email: '6u8qne0iazhdgui92exrf6jw3ggagfqdr0x2cv8orq8tzxfz3ya6ogs69xq6exsqvrsi2ztpf67bh3xr9v6dqkle1fzmoooukph441mhfhdl2vjtd2yiplga',
                mobile: '393ecvu5gofetvcrreba6v9yh23emzt1suxdv5clysi9cy6qw2nkyuhkaf17',
                area: 'en67184oyxa7ni1jcsr44c90lq7jcc0hzekhqolj4h2um1y9cneh6oqyyojofaofvai71b8z3nshxudx10fkwdq6zegvtcce9o9cs9tef0yf40kr6p7ny8o9uw9njdqcwy0n72qt8t7mdrj1swea6evlkzdenka2emk18oys246u8qvt5o2e31blg97lfx5d6k7day204v2f4incxxgvd3anmyvpdfizbsh7kerqkwh5jh7jsad19qutafcq2eb',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: '1pele2ye0ywoz047szg9ygksyu9mnedef3oquec1u0gyw1c062',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'q712fxcyuh5dkdp1bhez',
                roleId: 'owzky1makayj82et38l10it9gxetqmjdndd77',
                roleName: 'toicw1aowukqedkriezonxc33cm83rebt2irvi3dhe5b6d786ivgjj2big8hj5mm1069xofvw1znh4sy1s7nsq8dl1dutyblfc3qwfyezndpyct3l2u1u7cwuxyd789mokaspi1lgkns4w65jcmbh9uvr0t3hczyg898nybq8n5w5993c7hzgf87n4o83n66t32fj58j9runyy4qz9nfjg88ogxy7mamtrdlsc9knngv1gy43wdng65dy564bm0',
                name: 'c9skb3fm8nacm3p5qfxkiwditff8anezx3ruqas5i76rogyl4dc1txohrnwvgsmyru16onhqh8bw9q8d4rippm6b93g1031qj12m26br88gdxboejd3ftam95uacslq5w76tcz1bpz9pw5707jpy4g1ycosgisbp3qrq59vq6qamr3ngymy92w6whvul3gep3ef0kr4k1ofu8r6sipfvqus90j2epnt8ia3bnfq4h9beq5zipea80c4zyof8ejn',
                surname: 'h68xlrrcotbp9y28wpeokb15yvhvr4tbypmbf8ay5tk4gyduwumt4dtlnbfvb63bhlvdcbt7pz38vypif9z4of40zgh5czp2ptay091hspn7tlmg1ndlruqbsqwxp5tcxmhzz9d1u555op8vqpr09o4r37rvdwjvrqdn3isjxrfy5t3m65haysmzo5nwztlxt05vatctxmajcbbehi2zgt112j6r8wehns9vr3yzvj2fshcjlklvcs5uwio9u0m',
                email: 'hcdlkx90qlf9xte0r2wxr0fxpuqcn0mraxgp0l5v0vcvvz7xu6obaldt75bcrpyo38ynxexpc2z54qf1mcdmgqwoek4ue3ldru7ypddjnkyzofg3j3ahiqw3',
                mobile: 'vtl6cr1aoa3d00jfjbpz1whkh0otu0wsgk897myyf0qaoy83v4ho667osu5y',
                area: 'd84td500yndc39w3qgwz6hrujg5egtiard0eryo472cq7zuc4a46k3b6pywhlju2rn7qmbr2nbbj072dkr7eebpn6tv638gt30gj2o31lmxllsuchava06ctkj0kgsbfgps1e8k8o59h96kc41mvxuno1wf1j34hm46ph3qpfsxf1y7jzowet1ei1ervforvr92edpmramc5vn20k460m7cpvwvdbzp8u34pdi0aolfsxcl3jp0fpa02jcwk54t',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'sylpdice8ip12ywknti9c29phk7t9lbuoxmoguf48z79zzhpuib',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'pzol0zw6npzr1wg89z7h',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'x58e4my208h87ccz41wo8a8ddh3v7cv9yjphoksd0ki1jsn1ee183l4sd8vksgtwa64t58wfx3m49mxfb6tbjjvop2yayv9gh9hbycpjvp2xvo3fdko2mf8gogy2pnjv3d4wjwngjota377cm0doe9y9edwlyxl11z7eq09e0zz2uux54v6wcc0rh0sz73tkmweu50bk4g7duo3gsp57qrkln45bffcx7id7v7moiq15h7hron6ybzmhx3gq93f',
                name: 'qzh5f4awsmrndvn7n9dpa1l37suojtby6pdy9ryxa31n11fjdnju10ihwqe319240t7nzo4y1yuhwhypzt8ggtbdxf3kxg65bx3q1z8dov9k71fjlqqu68jkostdz5uboz9c5n6gudn9wlbnbk2b2myg2974z8s4apcfcoinhsiybhnq3zak4wannwm4m66obo5xaafpck5xqdhmmgs6mxfeqcdna61nfkgodb7wovdbatgk7ptxp28mh7ucbxu',
                surname: 'hf8n9e0c7tjkef8lpl9ggjqxbgq1loh3tpx76lkripk1x3b03nte0j18jj1j5wxywsx08voosiqqrqbhd5dfbtevmn23z5ulqtp68g5ozssr0s1zwyudtieuv6mp2lm3hu8mhc2jjkt36oenqxdvqvgpjt0kxm6r7z0bo2i07wa5nh7diii1grrs9pixpp7exfap8kq79qhc6wafaac8vkxabew09v22wshm0xza2c1m754o3f2lgyytmozn0p2',
                email: 'n7bg76blvq02rfifvw5lve1rbynwo71cj3udh2wn9gdjkpedq1qdvpc2jgoi8sqq4w76lrkiyhqfqo9zlcxhr7rzdqeodtb420wcml127tn3qhgz3z6aqqwi',
                mobile: 'b6s2bvllmyximyd1bajr5gqtuqunc5e523d3mkajwojx2wfri87qxjugp1j3',
                area: '9gsnpol26o5mse412dtgwy8lwehzqshcqtypxoxhwird029jd173yidonsthqtyywopdr4lrga46nybqiljcl125xq4nn0njhquae3c0ovncp8you4u3kc7ksle79k0sswzzdx0dmzqrfv55jucu7av15a498cdgwxyt582mnfi4df7rwfif9wxxzkevuhx7skadkpnofinhrpy8bb3539s46zz2url247ge2itzjz76u77q4hsbc6g0wivwyhm',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'v1rqsy9lwhu2wfekgfxgilnm93iwdz35tlov2x7phd7v3pjzw2',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'ykucd77lvjjvvy4ncw3yf',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'ln0f6ljqo238hc4uhq6mdxugsv5jjq5fosl6bn838clolmyrr81t6dqtet99fk3x7drs3nqjygyke7n4foszjrdpx5t3nas2ppe2nx3f5a384mrq7wxzny32i1d1ag0zmbxy3d33jyopu77cmt3py1cgycd9a44eyoazfydbm94w82kr5cvfl7z2w5ccb0n1vd5wg9vx3agzkaj45487pciytmtaam1815tlbe801n4nr7i67rqxlwlvej8gfzn',
                name: 'hov7uy4malq66ku32yh8zsk4gkomzan3p7ulbcydq39h3xbqdeuegvp84p3bgsad04wxjjp022kewabx2itxf8rk8qcdpcxz0b6za3hl1k4ms3dmyf0xmku1csayq6vxbbpmqqvn81q455qoz5xddqoq0a3wja2krzajcvwxvmncabq7zbq6ycfkew0kcbt6se7curvnyib5wvqozu4a74kkrwneahm2nixt1qhqrwnhm9cz8dgb7wz2fq7q2oe',
                surname: 'amp4mi5cv5212va95ggph6sb6c6i969req5tn1ma1yxsbflwa4rev2zquwnzklgnasspg9283sicv8djzbqopoklkpt9liyghftn0lna2igclgf7axtfx3e3vksjm34er516bpzqw6mfdcsz7chzzmolurxjlf44vncxym4id6u2czwcvcge7al0380yra1i9qgumwfe6u4ifeelqw548bcphlj2va4w747taeiiricvdx6nhf7si56zt40umqt',
                email: '5gvcpap9trsd2mzb0h1hniyorp69i8bmdhj29rpddgs27lgq62rrf7x0nppvi3cwbbxgpj52ihjbdvpho46mi984dimk8nqwxgqhpispn5ejkpwff45789tc',
                mobile: 'tkn9bvfhro0wrswc9rv796c3oeesl8o21fyocxmb3r971p5ltq1i2go1u1q0',
                area: '1fs2lnijr3hj5azex7rstvpg27l7olvq4ekx2o7j138idjo4x7hkm2etsbqx1h3azvs3zv0bvj828bo3thz37x4brj6io4hjqkle3f589nto7cm9bzh7l3z8netjj5piva1fphh5zmzb6rfi55giaxetctntb3lit18laomzqx29deuur04j6e10btz4ld9xpkqbb83iow7jo1rki0spusbl03wh3qvk5lg1toupa4akptl9g0k8djdsgz7j6om',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'hzmgtoys9ckzdg8few39xew2a5fhr8ukdmaxhjjnqrv0dkoftf',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'lvdgfitdtn801pelllbb',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'odalpokna0gv7gzgee35skcvabpd0ymsqayxc0jy5ta9bvsdh8xkuh8fdqipu0mjfikb69fyktzxa8490ijvisoggsj2nrvt6h51jouv95lwbehn60uyjgf5wvgbxrqc6pz8syf79xs1c8oegindnyxrh7a17g33h2yki93mguyc463qqd45luc28fx8nfo031ygmhvzw4i2xek2rnjh4pic2p108a3xzoe7ai73xd5u4rlhdrm9bahlco848m9m',
                name: '2y24vnsfs0jiimgb55236bdtr398qi28366wslo27n7ju2v28lrqz59pfciryq0jhhf4fo36d4kvkqcl73igtlpwk0snblf9g9z47d506ltb9lrnpmml9ke25saimc8qz460k1r3ymje6ejeh3euhyp0v4rzldoc4o0my8tn8hahyyi8ruuv2g7iegrliye8n7wrj4a7js1utyi0b76x4p9sqdsk889q57k37oklwp39qah7yxpg69hgiu7i49s',
                surname: 'aj7a5u0dq25y3v6l4y1nnzrgwkrfavv74mg3i7wu60s3dre5zsesyjulk1ju9ll0dtl33lg3d76mzv1b1zeju1tqr0o9e1jnx3y5vy5ljtde2ly642e3kpqgofvqrc2q2rl9decvwctve6848bnd7e3nqiy75gxqe364d43dt1k6vmccs93c7psu2z6u4eokz1vfekd693vfv1d2w1gchc4gj4y4b2g1liprxfr81fi7fxzjmj6rqphoyt9gqyr',
                email: 'wn3wed9qwcjag7rbuzanmuufew15jr1nc5ttcy035dgoyjr4kowh6ru6rqi4guz0tbjgntavuzlc9emi218gxdstof8sfsy5s488wrvxcqtbmlezv1zx8jbz',
                mobile: '7oyh4kzktg4zuua0qtbg4xh0tsbdpym1b3onu6g3bcs5gvc3ko39xc6a4ar1',
                area: '6ffr6vx9mgdbh5dx1hkjlh167vra0dn0mhbsggqwt13u75blon5ardculpx0tspa30ob4kk3ynl8l8slbhbhs7k5k99zs3yhmjbuo7rw94zwlavcnn62banq6fsc52jm4h4d7q6kfx6pms4xnjd32go8vml6o85g21i7b58pcr8rhhd1638qqii31kjl7coior92vo2k5l50rin2k9he0x7veni9wp7o4e2ipivqzfxg2voimg6bki4fi6wkczu',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'm2xy9c93t7xsgvkgojbwthorqmj6o34wi7helbrqocm58rsa7e',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'vs3g04f1h9svnal0s745',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'vdaz4pj6yvim2sm2ihpgw7ox2zpn1qy61i0n17gdip5fdtm9nk7kg5xomgh14w85piftterad7jpeku95t6s07qs68maqapronr9d2cmcje41fo8tbzkwgiieyv8g9ibcb85r3u5n1yv6zgvhkfij0q1umoeix5rv2gvg7i2f9gkwjnn8xtpvxorq5ea6xqkmblpeg298fes89ie26gn667jdbaqaiyx20jvzyp31faf4mvoxnzbxfre1ljjgpf',
                name: 'akjyj1dwq1y675dsph76sn0lspx1f0aehgky7z7kg8klbk20jiu7ay90ktjav6wft57v5lgzhxb93egba3rllefjdtzlam513gcptglco41bn688qokxcp80cy4tud2j7svca6bslokp2kcctpq6ors9tdwl0y2y7x1f6xk667ih7w8ql5zrk880bckn3t8n3w4sb1ibjey8sawm33qse30pns8ucgc4g63aozxybj60fkvlziu8bqgvpzx8w00s',
                surname: '0bmw6531waemyhmqakv6yevnkdccygdubhn63r1s1pnl8eub0yz61ujp1r5ow0p6zxvufvtdtq8005d1b74ojmb06vtax2oth80939nry2a1h9xfphsmnnj337ckh9mebgfl88ergw8f6008pf5vvaymdk8cj5uvqk2qq8vthkmozrwsdclrdcz6cak45r5gqwx8vdb7bv1rwehqsd8nkcy7965fsopq0brn9rhzel612c37kiy35er9468i1sa',
                email: 'wu3frisk8dwvtk7tjbz8bwkck93nyr4f8sfp33l2ma4k5kcdyvhxsqjmglveojieebwt9f601xwo4w51w4x1f1auxez2z0b4odqsr63l2st7arnbu5ohqnro',
                mobile: 'q1dpp971dsfff6bmakj3zn79aj4xc6nomfg4uthzi31qhlsy16dv4ospzwsm',
                area: 'k2luk7yn59pzcxwd2b347ucvghtbdpr3wwsijvnfln8p5lc9g32b6g1uxzxm7pv0af0fu9jta7mt4pxw01qq8dsmqs3xqdrgs8s74ct6xjuq4cyemnkp22eusmjdjy1jeanu45d9zrz97ytew21jkdccoqyrmth92qmdi21l17dir40j5w0dfdexuv95ibfi072yp0j25dzdgidh3lw2jl22glx0p0uc85kevdstt940r1y5yzin1p86ykyk2yo',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: '78bm6t25vvvceu6iczuvxmw52jc2z9zr2g19dj9sathmmh5qg4',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'j2njt6o0hftb2w9oswxe',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'hcxpc6zfuh0es76rb2eyj9yc3552gli8zkcoeggy4lq3q56awnbi6vb2bq2gc8fg0c89oq9thx5v36l9e2bhrjobjdt4gtj8ps21ko2r1ngkgz2tq2nykrps9hjl1x271qgvydq3jqo9p971247d75xuwnte3nvex3dr87lihffoxh7s3ujx5j7wrm4x3k93wkwu6mmicgxgwm98obig3d5a062cshov3w96qi6m3qmwiues26i12565svsorpz',
                name: 'nojifyqpma0x5523kk6tqxqiqhw3wvbfmi4mu8s8kd7urk01vahyu9zh40l3ahfuwzxa4xi3iwxbsgvjm5qrdyxso4qi59g071wb4hpvykzit2oq8m31zz9xzwurcml7j4vlyk55jmkti2kl636tlznem8i85pcgdjym825rc32nbxmir1hghq5d39omexn29i1jsw2v2npw9vbb1vgg5kxms3idrzbb5i732xbf8z8w5qu5v1rl0x7l6fzizpj',
                surname: 'ubg0q9rakgvs3sai32iidku62keoxyp7zd5ng0ydwj50xmk3suqzzs14nlnzs8bl75ctojwjf567gjrmfpewrbz7bh6bxacott5y3eh93iq91yly7zklt45vj080emiuus1i4thx5goug5ivu7ojehxv76bx04tccuya305n6fbmgz1jx33kn8eq0y8uutxhpgel7s558yq33by1yooyllp0wim7r6pbu94iijpvpv07lyw9nwj6pwy5d817j17r',
                email: '7iz58kd58ch19067u9avax0396ril3es004fr85jfzokz3xwk5j5p9wvuvrjobqg9vd5xqvzi04zudcvu19ml93qed457wsnfwdhjuud0i74wa3v92gc69ec',
                mobile: '1odcqqf5pt3d3ytm9e51x96blakhylupzr627nacyr26v5dn0dauzvgru3ze',
                area: 'qhbjtlvl2sth7bvqwxq85hpt7840x6g946p1q3xtio5r130pkp21r7wpi15tlj45cs0n7dufszl4m95qntevgeu3vm67v6u75tzwc8sbl4rauvlvnx7ugj1rq568cr7mim9av2jngueurm9cmdudkxx6xk5werl4y4f3s94co0w548d3yunyu8lxtll1w5w2kuku17mo24ljjd3lwbyiwx07p73qvsxu816sfhhqnin1ykcpzoawl80jjds1bvy',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'tblj6b9sptrra7mgbqj1zo9tv59fbjsmi01uuyr70433eru5jq',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'p26g3y3zu0c9yy2qurmv',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'r2ydqgznu6uthj80vkcdtyap6zay8obz38v2804ppq784soatcjfx9jnese0r9p3ffxyjwn25qygin3vq0oygqgrr9q51h41noe8pdexvtwx5dts596t8x026bypy2q5o4li0fk3173q9xpwbskskva72linrev2rg033p5fr0p7tctdttoebvyknmknbskajvv8hwq2x70a9q6jl1ualqzrreazcwzgpyxjhsy2dc2xsyksw5vosl3nlj3x229',
                name: 'f4ba2bk1cyvyvnsfj5xldh01998edvkw79pyf9r7pwmksn70v9fape7wmnx0s0y1c6xh5tevc8pna6doncxogjfmng0b004s1ikr5001dz3zkvuwn9kalwn9r8nxntwgvcptbub844mqmv567qmtxtedvuxd49yrzku29acdgw8woyk73wppdu4aosgaj12e6gfwvv7xatsl60jn13vd3noktx5cj9j6edow439tziznqdmnblbvrcmu7jkgpr5',
                surname: '3xbjbbuzoshy2tzsvjyi5osajd0jimgvy1twqsh8tmsvu7z4qe51d4ext93e0hwr7tkafilpykathllm3yoc92wrnay6rj35v307ch5tjugd3y31wog1311q8qrkexxejrnf0hpkch741zdxpbgknncckk6yfzqjy0yxdfqqtosvr4wfhkb4296fo1dxmakmu1iw0xi44mruqrdpnsggy7hchsc8w1dwf10eygm039g09ck8ljwrr42j5q5gna5',
                email: 'i77in3hrxwao1sst8rex8zq7gtkg14lbzqatc9kpdku5ed57bnnaj9ow86efyzjhewva23epeu0ivuwtwzhuhtn3akz63yz44b8fqg4h4sqzwkcx5wal3iwxf',
                mobile: '7x5v2r6za9fpmwiya3t28a6dtikotj8vu8zmx0ose1eenfbuuzxqda53ra52',
                area: '82tyxe97nwg6fj8gy8s6lrz5phinecm6fnzqs0bkmoqawt26dkt474l9mmjvnzgczb9sh5fkvwj06q2ps3gov09atq2z7iv0jafa082nzfctw8msp5lcxo0cifqd860rbjfqkwi59oheumxbdjfx6b97760s6ya46tzec773iaayjycqs3t7usp69asjxlnnerqqizr4w1qpa00ocatqjxanltpnr3sipzjbjj0nx0k02tblpfzdhoq781dgrvm',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'hnj4r8xs4tse4x2oj1zs6xbr7s9okcdksan71qnpwglbofczn4',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'vduq8vbd2dg6ku0y7li1',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '40gh9da1rnpoinkps0vlpy155x4mhsbb023dxb5pppxiwipydnz065oj4w1tu47ls2lv93nmr4f5erasvhv07q69czfxd5osslm26uni90zo6dffz6uk3nbfqnhl2thrpz9mm8414mdk6gz71gd4vfg4atde2vym03bk2chxbhtpghf76biwpaaj15kjlz5t05hseag9u577xzdxhfzk9459m7arzo8o1vqwqf125aq8yhxkmh6z0oqwok6uj8m',
                name: '3tdimcphbl2vqmh1yt248fd2betc68xm23bes4qxpodffk3omui442qa8ndvcspcrqn2do59vx74d1pb00dizu0fczggm4g7kto1hfmo7fmfqjp083no97w346pxznsl6lvkqt3y82tjuanh4dy50cm2cmsw88ft33rrxbxf2pqmd404271rrts9br72qmdgebaofkzcywv22joxtoy2epf2zs7uhohwjyq2cpuaxb9q8fyl8x3z2z3jyncmwmt',
                surname: 'tjwep01xeix6xw8rl6y0jgav6v8hdpp3cn87zwq3x3tyn7f3e7ks05dhwofvz7nykzto06322ts622762yiad5d1ya7x5z9um78siy90j991d07w68miki3thovjgzlde7zeu34xhhidqmr5cd6c24syxn6ijxqpm0t9s1v3d9ygv8hlwl381arxrr52sm9h9d7vgod0bzcqs5ivuebdcz8mll56351qf4r9smkzatz4uxw48syewujofveb0x1',
                email: '6e9wvvvydycgdavdcwwvpd9nvhf3sfj7ndh3klj84ir665zs36v9m07d34d65n6nebxi18yk2nzocvmhtihwcgjancgprt4vgxzcd6n1plsx73p33usmuwqr',
                mobile: '5t0t669wm1gpgedcg7moy0m28uy2sxm5ofn72f0v9o7rb7vl7uxdhn6tn6ynw',
                area: '2j2sx7k6cxdvv91oanmnuur5gly8nes9qlvmbh06c73cnco95zlqcnzit19zb7s4t7qr9y0pwe7adt5wc9kd12yln5mztpgff3k37w339awpchajfspf5399wc00o2s9fuzzkq98cjh64vj9lrg2v2whmml2cjcg3gwsitbdu79zj3sl6uva97j6pnq7qplmlb0izwl6p8ugydpnk53h4c4rhu1lic2z0dcwh55f9w65aa2ltykru9ci4lwpgqs',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'h8036x9h2bmkiskf4qartxevvhq5uwlyk3hprwadq0zmm27oxx',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'by82ai82iw0lysvmm5mj',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '0vkjtngmu5nxn1skfl9vdm2af28jwpbespps18t19amiwiw39z692k3equs3fjfdjp7na1dhrxeta5tb235uqs0hi7fpdn2n8mgbrvtliskdq9v7dpwwga31s59bmk95bsfn8xlv27r4chok9jifotkuq129dx782rtzya6y9n9t0hfikzsv6hvetj84s7wjuy6enhfqde60csgg8rdqd9qli1ni8a0sws4gf0qrddlkgahwubt4dfqgft47sgf',
                name: '03i38jy436nsc63i081pli3faeilemly3tru30pboye1wsylu21auqj8ubfqp8kon4j1xbsjj84k5ab3n8bpn9j6br4rut7qeiw7wk6kie4z4rx73jpc8160ed2jxu8xu1vbqi7j865delsxbqipfycnt9f8n7hayd05ze1ofgtkpqa3z1ijdfgjhywvlpcihzrdxux7lt7cpvgodwip8zno7rv68mkknf9t76t8pmivb58oubcp8uw6dhrt81o',
                surname: 'c0t4wggsagqp77fgj9hi1c5cnfbbz9zkc244h6odgv3nl9ztdy3u7l9yukgtbvll632vlfsqhp4fv3l0qy80x5d1np37r2d4cxd67orlgy6demchys35rxb0af4djl1q4uvfrkwsclh994o4fxgeq1qmzvzelyggtywh66z16t57w9trwunfvtuy932qjfrz4ep88kxhcjuocxgoq0jm1guostr55169eqs9ccyyfavvdcmj2zavwzibk9niu2o',
                email: 'sqm38w2dxa5gp8madda1vwnkjvydos1bqc4d4pqlmdvo09slwnb1ppegow8bnkgxg292tcbak5mkz0y5egm7t7skjtiwou9vrrr381hqq0hi2qeh7un61q7w',
                mobile: 'vv2lr3uxigwxsgr70zbrwxjyz3zjugt817ki3r27vuf98eu1zgtom4h67484',
                area: 'xopskdq4blypeyoqj9f80rlsp5gtgvju8zty2503e4ynrmkr88sw8t4s4t7xiu9s5nfimkwgsprli9qmswo8msju6akf77fofi4aa2rru0sg8rffau8hu9ora3aysjp1aoy3mp3lumncdmnd7kpwxx7lwzel34ppt6unw5y50uuo4ovrnjsl7rfgi5duzexafssvqw1kdri84uvsda7d8md2vyd26jokhg0oaik1b6lsjqsktzzr34szi7jq8eqf',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: '6p1iqhtal7deynv6zasnw0f5geqcrp3p8jd81uaa5vljuezzla',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: '5qnynwdhq6h5slcxs7q6',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'gz09jypx5r19x4ns7rmziqn9ogmc6281wqnkzcsuzxa94gn7sbyceko9mypruyn8ma9n7v54sepsahetwltzb0auqj13p3wy5wzkincngw31358wte3c6fmsgp5uopxtpa98ge7x8jyor5wago7tnfkbigubxgd6sqmsdk3lv6z0ry9evep6d0ed7upxpxbh59dz42f9a60epuak71mhlg5wvsffx9l4ttsfze8dsay4yuzwpli5h0wwlw5y35b',
                name: '8rlkpc0jy5935j85calwt2konilqn4gq8ndxe1s0z8hsyh4h7bcmldud1wye5vu3vep2d7bsq3nqtgp33u44asa5eaw2i33zvh9vg7yquzt9xfj0wzf0w4gfu74vr2nstobypcy58e2t0atum1faypnf2cei1ttp8xjyid1z0gvougs49qzo8f4opx3i9npk2nxk07ur5drm81bg9nmgyq8rd2tyf5c2vw2lprehkpxc0pp36v4jtqbsvfec7oo',
                surname: 'bo2iho1aqzelyjfqo7gmnpum45bcjhfns0jgb34m458vo4r1xe12zbdvowzlog9lsra1gq6u8eu9x27hsjmpn8s3wl1k82zy3wqjyc6vu42skl28hgglpkepswrvjnove02m7gogd19jcydljkfphjnqxizqc3nwp3uasjat7f6di8jo47wy29pdpnnxdmehxa9j2wwbah5xq6h7dswjk4v2p5j495b69t82e2bx7fndge3nkznwcuu4hjlsuri',
                email: 'n5g0qyen7n57mom2vxfk7uv5jxwcmlgjvq7u4zdn0ojcrd3eqryuvuukzt6o1olpuguzt2tpfknixgxwpaypg6qgd46x7115k5vxxh6cu8jn71qac74xn4ve',
                mobile: '8euiwzqaz8zbbyw4d0c4u0vjfh25s1u6z2uethp3s72ckw4rpu4yzx2ul0xb',
                area: 'vqdfnse4y5khh3bnjsbwoiy29lg6ajsxoit11xsruldi2d6gupjpsqeipxbpqhcn4h3kwy1djwudwy9rz9g7rr4vpbgb6qyosuwz4krsp5buwa45c44426lo1ki1xqkhg1ieo9g86uab2n44wgmio55cpzqfmug5n9yukvcrzyo53ak3i4tcls8v59h40a2rac6vxvwseq2tonj0fryr06s6yw7d4gj5kme846hrqy97plav653g5dc5bpn6rcw',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'ez33t6g9m49zgajvjk2zej027j7xmzvqltpvjdklb65ks4h2z6',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'oubwaxskt0vltch842i3',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'z17c0ahmlpwrtifqcpx8ow617t3ne293jpaw1ulwmjn3vez9v9p055sycj2i261rpi7sh5qtcyok161n95medvalm3jyaq5j9cs24iitptby3h15vg9ac0n1rvay71k4veu1svw0gcy09ziy0k6clfnr5awo4goltjpu2cyzu3rogoblxmytz6vy2294qq48zxg70dj05gfzjyqwg7sr40xp9lnrye1k9q3evm7xfgqug38xt0q6xhhxbdlfmev',
                name: 'q7kg7pefg6q7ujtwg8z7jsz85pa4k74id8ibf8rt8ymzybp5hbraw04pyv6xs1aw1cah2yade7fhiufr0qmcqaxm8do9h0ubqewozqm23c9m1m421i0k6wbkanhu2ws9fbw0hog2j0ognmu3lb51nne6qvzztcck2mqgofjjfitop4ke0ykmebs1ymtlmge86ktvxqsgukljlqtdzm38fcvclfqm2qj48r1fnfj2rxvi4uxe31wuvh21u0hvfk5',
                surname: 'j7rvx4t5s45mbsxuxv10ypbgrnhji2b3f9zc232j06v2ltk29qettnpdlna6d2ni9sb38xhti455wn7studwpuamn4y8ohp8a2ct4924qb1j368uqj0ym5bh8vp1y6oacqcuqeet7ha3pu4oj4zeut7cnv1xziwe79drlyca8z8zz421gh9mromihd4a54osvjg62nu6kk36m62on25rntfuip8cwn2ag1kxrbnuuenw7q4xt8c9e985i4kavom',
                email: 'twx51pywde7yvid8aqsic87zsuxxdkrlg63umj1gn7rjvfmhk9ntt5k3a222qkcf8v684gcok1okmu5zjpzhdfro8s6la56rw8npw97p0lg6ki5dkqu6y24d',
                mobile: 'x15i8zk50049bbmkzu1dr6k184nnfrz6i8z4cx09d85ia4an4h8dnmurx3td',
                area: 'xs47kym3wqde1625c12azrcod92ceb03bgn0ynelkaj8f1l0qxkvv1okz98lkh5kuii1vgj0nsiak4mul403c9r470sardiq2wlxtd4fn1mifvq3o1v9a6fmtxnnagzjkmqqx537dm17lqo3jhingve1aprs1cawjqb4i1w8euegvsobwa695p2h5byw3aul7xfy3r23qucfh2d9g0z2yvf82x2wmx1it2r4fhy4hmbc4pr1ibzwo8fi8ax3nln',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'qj1vdx6dtmh35l4twpzu8y4rudeyr39a2tpa0fr9laghsj47bf',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'k0fbkjz45pqmbxau9bo8',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '9url42vxp3gyk0w17j4mispo0juve5nem2vbkvhqtgcgzqoui3h7pwdr329ouz4i3pa2z4srkwl20gwd0tyaah1bgq15e8wr1aoy3s202k0whqn62jye6ip3yp5xnkmyodoerx44zc2kezr8nwzv8jg34jl68n0ryg1t1y5rnxhl694ej5h5bvo1diozparg62oju879k32yekxrefqbubkg1jb5tk3b7etknf9z1z9fxsjlnad2rnis5n7m35v',
                name: 'yi19i55k9yze2bpuoentucw7hcquz03y8iycw46z5v9sjxl0w60vgmst4566gqkj1rdy1ajbjkmfe4bsdx5phfnlnfby6j0yebv4nbwjvpa8c9264iw4kodswipbepknp89pgcle2meokasym5bodla9h7fzj3gqiyuedly1yghph08niukwsj28j996x0w9240z21ado89k0cmg2nqwrhmnnwib10n6qehp3s0vahfyxs3jimt4kn6vpr6cw7a',
                surname: '4yxha3xi87wpf7zvk44dsyrcw90vl9winsgbn5cucemoheue9vaii9y3m2upxwimzxl6s1120g07vjub5hvu69ppu1sam3ly1x7gpid76pb0rs8spijdy1ay9m4iom3cazerkcl232gv4tzed7dje512o3pwb8u79lnjgwfxkenqvou9a6foyocfk0ntq2y8ohcsch82qdqw3ocwxezw1tfzlh7389ktv53o3qo8l3e2jg59wg0tz8donotp7j1',
                email: '4pexbg43q7scj82p5d3aksf3fyte8ju3dmxg6w4z2nw57s1es1olmk6gni7fj7kpx7bzf6r2g3hnlgtgl3a9rfnpia74czmi21bsrg25owa78f2r50di41le',
                mobile: 'x556b7gq14eri89fhzmf07jfu11oeakxerp1xv2d5wzl84wkei25zjj34dfa',
                area: '14dbu7qjbdyllxb9f9vjevrig7r2o90q0dytfnzox7fno6dbkl9f8b7lx5xcw06bovtx6x2k0cl5vr5uggsoxu0ilhdkkacj4fru6o3q74172xcysihv3vyyv0oehobx0hxtw0ytn70qkb9iw96d0zzkcw4ahoceimvlufod5cjghdtnf97e8thosangmjkcf2z2shljxnwi1pe8t86wjri3kcqyprfo2fxvw3myw7jzf26295z030o5rwbpb4a',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: 'xad6wrpi6w54x72xop0bq9i0ny1duam7f363e5pvixbvavddo2',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'zhxw23gd2ds44o0auf8f',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: 'eyyq72d3aznh1vomcz9uyf5py5nvuthl1ubc7fqep79yv2qep52b8zios35ovho3pi9flhiwnhuwhydq51wrnhv0h3xh6xefwb8y1wsphguoyjsork6hryz4k8nupipb1pg3iijf3jos0g3hivk24uicjqi0j7rgx0qckbm6poygt7itvmwgggli3nrfuxcm0zzx9c0jvwkov44zd98w3tz5sajf4rr2y9s8k4ve7i16nsbu8cpto49fl655qdk',
                name: 'k4xz4cdyes1yo3kiwuz14rc2ahuq8pxf6qsmmrkvqus49emflu83unprhu17wjyn02hwjmc13qxu0xhy5g3mmzsv5wc09snquqmpz1o3im7ub977zumyples4r3jtj6fhjglhwi96tlefy5f2ztc7oaheqdkc5llym2ciyuqsma1efp6549lip9t9kc7nzoruq27wgjtztf9gw6i925vf3u5b1cad99rjb40sob2we7ioyenq6achcufqc1m503',
                surname: 'eozdgzk2wpv2wje7p8sx8woghnfzk21u3s1whvm9v6sgohpvquxoj68u8b45iu833r6gu10svpj2l4c14bmzafrm5uk94qsz4upjmqn5hbrjb6tvpuvp4u4fh95spyothzg7kbz268791to5xgg93l5g23xe3t5z6z55mn9glyq5nuyo1xaqhcp6j8hm00727aw2navppmsr0408mlgdcj6t6rdt0750wjs8mbhmmrif191p8r2ax7xz8pgwir6',
                email: 'csnab2eqgvcpco1ggpyhlvt0rx0duk75qqmray12s2wc8vzgoxxnmtar40xtpfk1e0stic1xmsi8lxpd2fnglbv16dltq8a0v4mhntzzvowj24r4ihl393qy',
                mobile: 'w9njg67ns6g8ueqkif6ydjolaltjqcit974ojvlkywni26sn2u91299uv8oy',
                area: 'msvbgr83atfop1dckx10v6vqjyogrvi92hapk6fp8sfv7ebzu7hced11gv0q2uasajt6anylv9eyfp770gek9an5o3z9apanxp1u7nh6mcysum29vbwvr3cmrts5xstqxr9j4jc6319ob35371ipincmzzs43arnagj894i0h39tutxroazdg6x3zsh7n0hds02zem8jaeb2jl4ofktx2j9ir5gx230tyvpzm3flvy80stnb57wbw5bbbhdmsep',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
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

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '7229ef37-da9b-4a52-85b8-d195873c6f8d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7229ef37-da9b-4a52-85b8-d195873c6f8d'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/7229ef37-da9b-4a52-85b8-d195873c6f8d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7229ef37-da9b-4a52-85b8-d195873c6f8d'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '97f11893-adde-4a78-989b-483706c4a758',
                tenantId: '480a9464-d430-4a08-8c5e-994f58b4dacd',
                tenantCode: 'yvfwex9penpxzof0vau46qpae9prg2vlos9et8k1ilv6y5nnap',
                systemId: '8d16b223-ac36-45c6-9e6c-a24ea3607c1a',
                systemName: '704b5ht3mvuchmt0zbo1',
                roleId: '922e02b9-835e-4699-9014-55ae5cd3b849',
                roleName: '66by10q0ecbb24ibp1r7kw5kyo28x7hdcgxau1bx9smxth0tiwggx7f57cxyqarj1fwftjqqj1e4c05mt22b79i6rkxtqq9nyyu7onqzlbdg7ozch4rwt0s80x150re8zp6wtsayjdlfgftv0hnp4s4jb7oj3exajjpb7glp8k413wc86eb340ie88g9qraahd4w3nw5aeab47h77103fluw4epxqvgozeyetzmgw0bjzja6cb8jv8b875g6xz9',
                name: 'r7qqojthzbjs1t8dtjylxabe3j35snbqw7kwdw5r2z8j5tjtaguw74w4q37m063qpwhm52qnitfql6ki8monn4kw4miljklzzrp7uafl0j41xkuz7w4ggpf93ocednvu24eooteer2a8kkgn67rlzdz37tq4fyfdaeglebf92fbnh4qntx8q8mxt7oqk1x723x2iq7lzdcoil6q21ilxcc1eowfh67tafnabzjzzzlp32yux9e8lpghjrjtp2x8',
                surname: '5h7u1nrtgu8znc71ylovoze794mqkzdaauromvbpdi0kzjvbe4mer7itbynlze3slf0wnddlud4jwv18u1qc00gc29sc2i9t6w4koonan6qi91ib1dzamsaurr91kmmv1g95y1zng2rwsls9xgqa6udmz4wk68briwl5fhwl85ilkm3fxacbhmywvtwqrluv2yh6jxbq0ajm2e5p7swrk67nci3kk75gf7swga6rhni3d90e3trbp9gbjneqe66',
                email: 'qas0x949uqc22seyudtr97a5nbp17sv7zch3vu4v7jetynf6h33ych07z9lagx05ukex4chsljkcio8g8mcajfxm2yc5a8hi3v2fb9a3sd3it6p7t0mxalow',
                mobile: '1v2613shqraqpauxhn3843hxqzpulgq0j8vtybqwvhbz6ik8n1a6g9cq79pn',
                area: 'r91z0km3nvnztv22jus7q7eo23z2xzqii1qo8qcekei8v8kux545zl5ruskbwbkeyhq18ci8mz4667zmstewz4bky5kuqbu4o5nqcb0esqpk98ep1ydaiz6v93bmbuzm1y22n8fjk2snbccmvmivb30gj66orp1lym90h8hedwog5bnb7zx110w8l1sq5y76jn7c7489kqipugeuy0ct321o7n3lmxmaga3msvpks8obdmhcd2pj9sg2v4qd2y2',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                tenantCode: '7s9ak37miwsgnzmh59x5xs3bzzrgm5u31qby7wkkfhgwki1txh',
                systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                systemName: 'bpbiuks2uo1n3afl77el',
                roleId: '977070f6-62e9-4738-a02b-df061466b504',
                roleName: '14n3qq51k1qv6rzj66t8yjkhxsr6exmid290a86t6q50t5o3tviegho0gm7qocgkrxrqnmow9mkflj5h532z5ya0aue0bf9omwwiuhx7j8abfdku09n1od06wpar3ts002m2aajw2ohh6qz4uodfy5kl6k2qfrceern66i46suwnjqix6hckr931v6assqb2b9xt82ovgcgbq5vgno5564w0q2ekfs0hzepo1euhv4la6j6a82fnaffop9z9tn5',
                name: '45o5snvcht24zet22velfezqxkudqf1gsli7yajx62z7cr38tcbr0yikjgwwtqrgarjy91n5k2n2w9yvlm28zh15ah675h51p715ioo5pahwjh5eintcjgoonld31g1koc25ktco6iissyss9c2e96bsfwupxwhyrszzdbiuofhnwnpd54n3luhn8ekdgehnaidchivumy0adsf18tmxnxvm8qv7sr7as3dvqeiac5s6axq8pxq5dtqdoqj17n4',
                surname: 'ntt7djn7ua0o5ona6ac4x590r8j3nj8pafidm13eb521843fp0tsh2tq6w6z9ik34u2uzl65fq70l2fruhrt1d7ahbjb4nsmdv7inp08kxn6ohxdwxl5o22oorpgr8onhjxjmccsz0c9eax57llsjf0uz3y6aynbcttzc1b434utgg4l2kxtmw0qwgu87jfeexfhuqnrbecgtfkk1njdw783om8ce6ecqgxxbj8eioq2afxwvbcrvys4jz3rpgs',
                email: 'v1a5fz0hrghfhbozbrbb6z1ecak4s9mobnkixybru8e5qpfoijksidx2gxpcwbq30p7zq8ri32arvicwdk6kvcg9w618q451bro0wg3webl1f234qwblvvic',
                mobile: 'jppy7ip9i2d5zz9kc390b9yjbm79y1tcyv9lyrjzhr2q5ttaavgqzi9pmr8u',
                area: 'vpwmsdo4oyddfxetehst1p6m5m6livivp3w1j7qo1n6flts5d8zqqq9v5kwgfyava9o75zabx6os2vj7svkwram24cg93scahv8e9pg2vbjtx8zka5drwnonlyvzuf7708zndvjynjb9jgcuzpj6nuw0zhyqrme3re1b5jfjd8b7v1jar5502fu4vb29r00nl56mspkh6pltfnolhtphyfey32b6kg1zj4qw3vbr41sbhfueb148msqy89qcur3',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7229ef37-da9b-4a52-85b8-d195873c6f8d'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/7229ef37-da9b-4a52-85b8-d195873c6f8d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'cdb23427-1824-4fb9-b0fc-22d7b25f35d3',
                        tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                        tenantCode: 'ljzsh9pjw3buyvbulao7rpccl6nzj13qcmwsobq6neuxpynhho',
                        systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                        systemName: 'ox6fy4ckthtkb3q686m3',
                        roleId: '977070f6-62e9-4738-a02b-df061466b504',
                        roleName: '5ju7xwppoojivv4vh5uc7kleixcjz0evfr16wgiohrgdfdp7fpt4xm0wesdmwh1a5u6f8yc0yntsmtplurxzlr3ltvzw2rizq1cgmxyykns5vrandf89lsbpdccrnej938c1ss9hhjdf760rki9kqny7r7qy4ph3hkbnsjw6wgqmpk5hbxbpzdb2uhgqap07etour0w093zaetipa87im0biv8u5en5qb7em6geufkf4h85wkhrl4skxtyqq8id',
                        name: 'wpl7bvq2826u6j5nix86o0dafxht4ag4rkzzs6xf2kn3xgitpy60qslzq5ksfg5i3plsxdjjp10iufm2cs341e3guu5zyvmvys4fdwdkvnb6w1oepny01pz9j9dyhrymybd06i6et5auo4218dkoh2t94i0ry82pz7zyf7uw95qg0ume8iyciunfsxca09xmdamsqmr7i7t984vikfevq3ql4bh4gjzsscpecxv3fpm68pfifif1o3c3d8q5dni',
                        surname: 'r63zyag7oxfbs8x35k7qhdxow80nmf9k9gvyfp49dndfz0ir4cz8qwkwb83sm4fa0c97bt6w39ofbp934gietb32ml16fullp1pa94rvhe3o10sgsrlbauxmqk51fuhg5o67e8vxu2wkn03bvwefit6j1gxubowki4u67lya9mm7u5stuva9gx9ehoq6s7qn3ww9jdagw74c638fl8olk5q5j6piuc7xy58thr9odxsfkxmsol48oil8od12hg4',
                        email: '22lswu1qrjv5kf7b6v6z7w3boaz57z6eoui2wnxehbyfxemb5zstj9qfr2xdxlc5t8qnwlhjbp6kx55c8kcp271vcr6z9ho2tw7viyqvliwwrtg5qv68h7ru',
                        mobile: 'rs2ujawwzq1tjpaim8xge8in5bdov3hv5q6o1c2nauuccxp3lgzyno42c1v3',
                        area: 'wst7fwxfebgeur35nphohr6xrw54jmn8tp6u31qwdpf5ppaluiianylvhcky8micmeeg3cluniqvrduxkn58br1hc6r79fbkcmpd9py8zups0owhmroyo5g3su18z2bf4k22fiw18l2nneh832qtmuxm52s8r7qjcffqjry44l9sin0uvszta4xmterumr7hkitddy415ff34otdzaqg3aho2iin0y47o50nzusgqplb99tt4eoo2p8ut0ruhe8',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', 'cdb23427-1824-4fb9-b0fc-22d7b25f35d3');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : '7229ef37-da9b-4a52-85b8-d195873c6f8d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('7229ef37-da9b-4a52-85b8-d195873c6f8d');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7229ef37-da9b-4a52-85b8-d195873c6f8d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('7229ef37-da9b-4a52-85b8-d195873c6f8d');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '48cf8c6b-02ec-4576-86e2-203a2acd5b01',
                        tenantId: '8a11f756-1bcc-4f98-b670-72552439141c',
                        tenantCode: '232bi59bi8ene9auzwrkmosgunvs337rr98cjthr8llq697pg5',
                        systemId: '12ef4b50-8ba9-4fa4-a04d-7f74d23b5601',
                        systemName: 'lprjq0va6t29zgj7xx8q',
                        roleId: 'f8daed7b-7709-4da8-913f-4b2115440061',
                        roleName: '716fgi1hdwe7rw2270yzmxe6l6vfpp2x54vo6sjrkywtdg21n9lrp6dda4ebzqygbbqndgr823tu113g81g9fn2z3ovjvbvdez2r862ps5rth8osfohe1k33xp8v9hdtjbxtiyig315eeew6hjs30zcw65mwxrvjsqj0iedlmlvgmknyk05h4zlsjcqlw31812ldyt6t420powjq7vlzfjg7idzbiy1tw2dkalztp9k82gli1n88d6h52m7y2fp',
                        name: 'vz5m38n4ewbol6p7ggqmpduobafkbxehfkk50dg834t12yzo5edyipxqsahjie5ypznfagrhg4qgrdk3xnvut5phtrzyp6bepqpafd36ptirdproqmd89vtkgfx74zgiqne8fiu78zazdk966w5zv0whwdr7astrcvfdcf96ykninwi3xo0kfr1aoi15260apy4dlunip4q78oir2wln8ht70mw4zrbckfff2czmpkp1awaoidpx947nna9o8b3',
                        surname: '6rt5vikci9gngn2v9vyec9zkycd8kvphhpawvnyliao8e9wi48qq33nmvsz8cwt8awbkc8rqxuezcby2g10xh5qr06qgdz3a2xw2gbz2s6ugfq18ckmui1glcj2xzy8nqodcylkdbev8y2e0iow2su72hipf35mog1fcmrsirb9p8gav604gn891f5hw823ngdyuzaomd6gnww9zzxjobj3q4hrspf2q1640f8lk2nm9jjaql7t3w73bfd7a5xm',
                        email: 'pesd6cmwzfx2bqi4uq2qn8jwuvk3k0u0nv33voedpuwvd64v9bif59zefe4mx8xu2inoqc8hbx1qzuj189goex8ka51it134elwz5uba2f94svkq2x22sjx0',
                        mobile: 'og70znkxq067x23dxkh4qth4g9fqbmqmrb0jzu4trzsve55etoe2bl5eqeyh',
                        area: 'y8eynlwghm1y2mznfmhw5pcnkskc60a4xmrcct346o09lj7mvab4yv369y710mo5ps01titmf1d3ow4z3nt8wvydb1suh2wzn58ag3szv5v5a42y3jgd9dzb2jyfmqlct0058aha7l62auz6ynj2pp14cm9sdktw9ghke5dn3xrtsauqsz835jfaqar5vkrl7211aaqmg56buf0tmkozvq44hlr56zunp0626nb2ajqi7jiumfibbuoewuxrc3x',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7229ef37-da9b-4a52-85b8-d195873c6f8d',
                        tenantId: '9661d7e7-019c-41c3-bc61-44e69a44c7f4',
                        tenantCode: 'dlb2jfq1cfm3aq9ruwl3hjeg2ljbkrjkwqh9058ooyc2j4ri4v',
                        systemId: 'eee9f9e7-3598-40cc-a476-0d73d877a52a',
                        systemName: 'opnvivaz20z7p3jxc0x8',
                        roleId: '977070f6-62e9-4738-a02b-df061466b504',
                        roleName: 'hn58hnmdrfibojeh299r54hex256iq3g8yvqi3o1zlzx7d9e95u341wo9tu6i94ljmigtmj0wrsdcye9alt0msu1qif8kouws0wewztp4fjqtb2xfzibkter07i0e6qzjmtaq34gfl1htlkl994ivofsrbhys5zibp6wcjgnv37smghxamag0gp0ix2vrdkexkb7hbj1h8cvmf2mgohqsacwfz6gcdmez7i3nduehxd6nkd2c8scqppfhod0jeh',
                        name: '4fvebdtqcvilo9z5c78toolp4ourunnxht5jbieawu3zlid06mmxp3p9g8zmxv9cw3fzb4r4803jtrq1hdfbwl7qyhycgs5vf85occibyzkzkx22o5i3spb1vj4y20vx87fdeugmrlmrkbmy58w9awwxb93pmauaydhshrrvfkk0spdk493cl3rb8xl3cslvrfcz5esalpmycwwtuit109sunersu98aus251k31saweq728sqk2q70j39lhind',
                        surname: '9hrlz2hnq4ejeubizxjyuxkaxd62enwvcdz54c2yuh3tnkj12n4e6gtwt4d6p6pt2itv8u5p33u4dsvuafwbgagpaira9vgp7tei19wxlqg7jd7vaxd4ynchtmbnhdu1unrd8scba9e5xkfzxdijgxj4ka1o9aqdnmrgn6s81owkhpu3fnssar4lgb3gwhjf4aaa22ogmd2y6ynaceu8zsgqhhtpxkk9elwxqg1zarb5tzellysd1q1mwtu12qw',
                        email: 'u4p744jcpyu3k7ottxj1ecq73ui2hfv7mtko0304rl0t11w6iwixfnge6pefzmzn2t4yzk5mn4gq9ilu6rvvoaj27x1xj6qwp72go61xl4s9un5i4gukpzk6',
                        mobile: 'm4iecuj75b0v4xpq8hmu3b2sl2wb2gciw938n43m1qshgu00z7kd3f5txf45',
                        area: 'l0et1a2zzbrihhlfswaafa6xw1ablfkw9jdhajt1l4wn71du8p65wfwc2402uamjpe4zrp7ehzwjkn9xpfhr6fs6i7tidzllut1102apnt2s450pue1iaj1t7jtqu1n6si4alyqq6nt7skkyq04mrf0b4l92fz7drh6bb0l5zoa9iyvpgsw4tjzyfatbc85doop6ywhzhnof3weyomrwfkmln4dy6abscn49ma8413y7t3fmxsbff7p0mubvkhy',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('7229ef37-da9b-4a52-85b8-d195873c6f8d');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7229ef37-da9b-4a52-85b8-d195873c6f8d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('7229ef37-da9b-4a52-85b8-d195873c6f8d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});