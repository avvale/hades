import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('tenant', () => 
{
    let app: INestApplication;
    let repository: MockTenantRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'd8w01dqsqmvxe5247nj1wmt1krcw0mw9flwosp861slm3e7elgmf6k78yp515sjx23n7e9tvumkrl6vg76crew5ql1jiwdnh6ik3omt5jccalhtti3ydyk3r21g5mroef0fi0o9ipfnnmrnnyzjg2y0gayzz8jqhfoamgzibun1a78w1rsa6wo6180shlc5rz9yi7a4qkjezu02vqov2v6sxjyez9dfhr61r377jncjpwij85sfvl3hio4xy1dm',
                code: 'by8xudfavpxsjiaodnqy7qgjphla2nbiqdz3rzg8d0hpy0329t',
                logo: 'gw84xrwftbwxz8aooezqdzyaw2z98cg7iboapmx1rxlo80op89h0krsc3af1rp4xdp4ua6tajdmbnf7pmni1np6u4lm52r6t05vagkuriqser2dlyxvn2hyok68xbs8uo8q7tbckqb4f6l2xd9qz2ni35d49prpo7i80thb66qg7cnetlza4ptom7mws2ufc78d1e0z3p5o9tiq2k3xd9errglve0v1bbnfrtnbumqdv8ocafuxwyyp0cr6ljus',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: 'qcwiu8kq0r6mmdhkvdl07w28ijc9jqlhn0r7ceqx726l9smzd12hexhgqz39xhzvug4lgq5v2lyo0r5pv1lvwghq5fq3ayj4p22lbxf2qnnhgp16fczwckb1jlv5iui6s7vwazig7gm8jx4uv7x0k2e4fp4w2kss2k43uzucsbo7oa7xjfa2gboaozisroq8833cwnqatfm04gdszbk7vpwugbz0zaojntryssynrrrlxf0vhv2ryzr9hgskk5k',
                code: 'd8zam149nl0kg6xc4oo1z2u9vunzgc6coqqzmvgtgzkoi2txfo',
                logo: 'u9plv8n4z2igjzyil298ipu80jjfk3mkzsv6jaay2xsf7iosv2k9ks8j0iqs45nkpzeuyxdbpeuyf8au0myc70o6lqi1wsh1kl92ro4phbsllfjbydmtrmsxtqk4c4bus0wcjh3qw9cjm88ipk8sq8g4g7rrmqambfruv1nwsyj8kudcxrh3gp3658nqimcbpq0br23jgf2fmatugffwx9ci0uhn7tt7lj5x50ldkfll1x127r7if0sui4vo1b2',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: null,
                code: 'hamdznbmu4rq70kbems01hwkq2ojjuygbksmxvjbh7iybgsobd',
                logo: '4ggxnbd7u2bnp1undabh861f54ph6m0kl6ilbrfcj2dmsrdlqiqytto98j3kqqr45anl5srs9jw26lf8l6mq1k833uoo5ram9qhc3l7lv2lt9b0nhxo9ghn4bgtf7c11jheym7tls894urlvj2dybnui0bkx2kg7mr4rqe0gu9yfekv8jtba4b49cfjvdrex73uxeji6np3bj4b0ybwlv9z50ae7f8yudgc396fs5f11lu92djifxtdyuodm04c',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                
                code: 'kcm8tu13pwdvua5fu5zn2w27zqy7fmh8p15stika0xn53clkqg',
                logo: 'pglu00x40svxvrxtb4un5utgdgkqzndrs8a155llkz3mc348g46mizj58ovsqycv4kmux80tt6ldqachfubf7nzh5z140k9lrdd96sre83lhqteuz4i2xoaarsgt700dspjl4g75ds7rxb0br12efxanf8pxkbkr84qaq57c217ydx60nv6eee8yhipnybrni9291d24kntpfb3da9cvvhedjdox3z95cj8nrkafsx4i76ud5xh412lckncbmqt',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: 'a48aq4nfpudlj7692mlflyud31g5jd4cu2g4pnp94j2lqj8s2dthtpql728rzimj9j78f2vipnkt0cp2vj37um5xkcyptxujbknhkxexjdb33gli1ry47ulrl91p92sk3ebjniyefzmyo97r2j758q5r4b3gr8acml9lpjshxglh8x16g50ec75pqzl2rvvkowumhr5uoxdzpbm6cxtoojz8q6bd1f0raeiqr4mb8d4w3z8bz0ktujybhaxdxir',
                code: null,
                logo: 'tv0n4be5p846lhwpss5pwlay7aknqe4xkyw4mljvkok1s57pzj3jrmfhxd52d1na53b49pposep92xtwsf5kpao0n1odtcvaxu1m1wjwzjw7jjv58lz5asegclqz9gkn8huie938ps555kth5mmc2j5aen8muwhpmmte849tkqsmfm5wrkkpxlzquok2bfgv639lsk1r8dq6ojpego1trnwsdc9ckh86dt3ei6n54k3bh1e7lzpjon3zehaus6b',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: 'mkb09b3vgii2mv7wzod4u2t06qange9ykf1twl7gqwz3d1qoq8r8x463s7armnhavbio5wnc1l9cea17bhnar61knhl7o5sxm0b1anczkegq0hccvcc85h2z79e2ec8uvy6bdq7dirr49xg18hw35bvwu4ehnyrccn60wo9qkz2yx4ccssvqhdd9blyjy027c41x14ktrwkybcaekpfwevxfmhs8t0gobwvt4519vi35d9l29m4fhmnjt34h17b',
                
                logo: 'bf469jmnipbq6fkea53fgb3hi8golfj6x63pwqncyj6rtpm462gdjtj4722vmyz3g780tzoutzbjyd5y24fwllwpm78o7x28eonkimg66zm9bkmomnyzp91zsb8d0fzrqbyq0s5ngrdtgtxsfp8zna20srwfa8al3hxnhis8skja80jiq7r1gb6hc8t6tq9ouw9tmu7hpbxv3l0zzwom3611gzql7an7bwawkxj80mp6jr51pa2tunlbbq97mri',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: 'w1hr74kbc7w7sonur2omtvuhxnb9mrmfjdodbx7qyu9d2dgqokwdsyn98f4emhp403mpjlkqabmsb4ib3b2gqexkrzi05w1rhbtxuegqbn7njfntwtbkf38h6cix3n5qsmpxkw86p7vewjbmho0puz7dg0zcfoxelsghjg1ullvi7iuo4gelmu631tanmc663i3px1napafdyd8jnr6g1iktgmnozpxi9o4dtx00uyz8srfqhi80u5acukhrzq9',
                code: 'ipjn97mgo93z5x4planqyvtl6glgnsgvkavinrpt7fulfai6id',
                logo: 'k3lgki1cnaxa0eg26akb486pf48oih3jtuah9r6jyykq8ha8afvmfh75b1z2qukr5c2fqhivlmb17fwqxv1czyzrgaa6acz3sgij5ywpa25xgjkvtr6isr5sj8his3xwn4j5z98fhmu8tbtp6fuqnruxokrbpqe7kn98rjnops1y8sp9fx734se01fkds538sx1epy6oymm944nxx6v0sa5mqfhcar8hjz946hx34w9dvrolyizje8bwz7bhhxw',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: 'tqpieg7qemsgvpxi7mfmrbfsygh8vbjsese9m1javjbsgax5rzqh5bfood3g85f7fv9nr47jxc6fhcirup6phwovwfiokhs2m72765d2wc9c4ielo9gb3rxl4qq2v721h3rcnaob3dtsa3ctnidyapanslz9m8mhmh8f0156myjz32lzz3xssjxl76sdr8oj0zeafwhov91mfmm72wru40b93llh0ama91vtmw6dyd6olju4yn006sv2uu1u4x5',
                code: '4opgztm65zlnk636wxj06c91oowinsnpuk1tn70u7dl1q1810f',
                logo: 'kis7z25balbu8pplslip0yjid3kb7edjp3rj81vkrv2bm1clkgh3kvj287m0uoesuwpgww7r5zwwb11csgvw7qm8hulxfz8izeg7ieaude22do8ax5wgx05vbbyjbrdls9s66pz9celwtbd0yknd66qs53jj1d6mkke5y78p2xpc8duvuvreeinn91aj8u2enby7cw52chmfrw98fl8i0mqxiy20iemmtgwvy78g8yy48imdq6fhlvsh2u2zlsa',
                
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'cdn7j708dgmz61cchjlu1sd5nrrqnqqk2sffm',
                name: 'h2vch8iptv03jc5qz7umnzdqu97ecpxqi6xfzucvcao0f7gn8spmay3dx8uixnnvnq3zsjb9j1yyauvgtcrc19qlnt2ti4mudoadf57dyllg1trvamnqiksrcg6qge41kdfoqrxb7r6zfnyb37nr3bph5o2t6gacfvyofrzycegvl23mzxj477117it5i5d7e6dumuor61of7rjkx0oyqbs9oklmyt1umrdqz6pwhp4ewcucvtmaxiiwv79fku7',
                code: 'q1l14ukyglhn6ryx9f4jj51sg5mfrc7qlyfgl3mre4hr6zxe74',
                logo: '3lkm9qpib99foklk9z2a4mqzu586agk8bessqjqqtstaqrbp3qkg9v93wwrdpx2p8nzi32jgmegsgb7sms5e1dme0igfmpip3aqx3y0yyidikw1e42hlbaezxyggljbskebgwwt4zbxhvwvlzpxse280uz8h1r6lhfmxskug1jotkd6kbyl50hjq4wvemjjpt4d48gxmrakdxlu3jntr0fzof7s14cv29ec9f33wmo8hgst4ptfk40ycjct5ds5',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: '8da3niqjv6q0z6hbvz61l59wv8cmvnhntkhjhpmeqp1esku2xy83uxoqikzd10ou1qt0w6xd7gw07j6vgg1kekc7drssvu2ct2m0ysy4hht7vuvap72kpu9fym4jjlj1ty99vztc55pk3opnu1pow4uv6jsunxnum6ydusjwwejq8wmiecmlbw948ipqex87a7w78l24jzl1oz3t36h697ipjamfv3u6heydb2wiqrofkkehrwh30fofwxsi7do4',
                code: 'q55dpwxe87m6r4hxup9l4utjo830s2gav1oc2radk2j8krqcg0',
                logo: 'na40uenrwcuyyvucxfue2416a9urdwe8wbe3hjdyfh5er11mb98380m9aseu4q9wy8vkz5c8ln7x3lleq0lu5mvrg5gspwcf6bh5eh0z0xwpa39acel1iguz37jew6qe3gh8mittf69cptpa7ti78sboxr8s8n4dtl5vtaos88rqwod231v43hd397ulude9ygdkharjxdbyt5n8c6d0grf3r0qvoia09v66ce0feyt5c35bebnyhj6xqrx4hkb',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: '64mvos3l5ijlp91360zg3aflx6u2xp3823gnyr7h8qbpxu59uvr02u203p9gkwy8fpugcg04hseks4rh5k3hgvr0wpurdgx36mrkcridqve7pvy3a85840h8xnqe5f0la9qirh33di8634krn74ry0mpcqmtmioajow273weh484vjv3bilqk373upwtut1e1tdnk1a3h3l62vr8r8vr5zclhw0g7mpiga946mlt34x2y8yudj1n8hrjwdtr7zf',
                code: '8rnm637uyf9x1pl8i9r1js4t02xkrctvbnsh4eustlt07pxvh12',
                logo: 'bktqpb1z2l8xzwx3kxc65wswe6g6dcfyxm8jle5qdrda1wbjm9h9zpzvaegthbnb0op3b9uctkoz8kp3t19xa525m2ngwwfet113hkgqaanlragwu7mz848h3oyxvkatryclxmdq3azlsqyblqmi4k6u251itiksjja5gcvcmc3ruoo0axoi04el3k41f9l5j24egfq0dfey6o14n426m32i5itjs46vi5bz7xglhz1hvom7uhem4mrtwucrcli',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: '47nhsmjrt5va1rer09y3eozsbp0iyz4x9swt7vut3hy5ecqveckgrkzr21a7hkbnpfq6w1hucumf1ev2a2daupoq05mpa6jvwz3icnk3txgboixnnzzbc0rrd3tp3jhx1ahnyl2yc2654l2wx3xlecic2ht8912bp4e9bh8sgnutxaiktwsyb2eafzmczxu33s7o7jmtcpc1a90lkj2uekojcqh9bjdu1wg7h66sde5igd52i7e7jyd41o2lts2',
                code: '2frpgmjvthh2i5dk1jock0ulgig79kpw7sl361rg7s6uxf308s',
                logo: 'npgdwqzlcgv78is4qvnj9roe2yczjmcp29eizaxy5b0zl3th9ytcwlywhda41t89nqkgosjvq9nerpkzf3q69qlawexye8vsvs8r4wrzvqpv3yle6fznukbgpda9nftdqssp0m5fjetapwsjjikwluiglz2rhzm0vhku0qxi67zl5le8gegp3dck7ebl57pp4zqx2evv040w3lt8hqnq1y6bk0j0lgtwbx3i5g2w1psux99s9vmb0tdx41buvgsw',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: 'qce0b2karn5noqewfbwwlpwbxkkr55o6mu6t612ktzpemnfb9j1gdfd74gh9kq9z3q6ubcv7ioulwkq7fy4vx4g79wr0wtkd3b9k2zmu2hs88c3zzhxxp2lemqlhvxl02qfjexl50jmt1iwjkd19gxr4cxqemo8lja4ixfm4owzerahxunkb8017l4cnxamsoj5eoromzwlsyxcefnazze1z0ocs0kppqo5byzcl2tfekdminw16y1d21qxpl19',
                code: 'dit3iuxuwsss5xkzkkbsdc1y3d3qduzzw13xt9jpb3lm1lrhj1',
                logo: 's07xaacia0r6j9tr8vjl8vdgi32uoo8uyftx93qdfdvojdyfpf7xk3xvmvygfcaukuf7hpxy98x6k0ukodseihjl34dxs5bsy68a8iss08s073f6qdhar36ac0haz54ci6pu7lmudpc174uedsocu19ncnbwc9ilcqjweu94r55sy3hbn1uz8w3voo1ivgn9awdpmag5x3rmy5aru0x9qnij2avhccj73rvsxdsbfjg29zulpj4op50idfq59i5',
                isActive: 'true',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: '8a5s94h7i3g6l5kxjy8o8vzibu60b70khnnyak42p731tlqp3um9brqejfdz80h9dfhpsafmos8w5y4fggm9m5hgjgypag76ospgnj4soibq0abzfiri91jsc6kzytx2o79n8x66jqwj2oo3w58402om2vnrv44xiq61sa5rcfy49ujf4cla1448hcxvj07h4ibt397lz8slasf8d37y781v5ur15r3robysyo0dxmilexda9nejr541trnf0us',
                code: 'xoy58dff02liiqqestlwcz5mokc5ifno1oqr49oeenjf18sw9q',
                logo: 'hwers52ac4m13bvzxr1wih7gxngng5ewrrpnay51p1s5uwwg9nz2zevaij7pw6s78ejsdl3drlsw3fp42vk1iozeqqzn63oa9bum83tpbv3r57cp8gkl8vor142udliuv2e93dkss6tpsjpi7xp1wg76v7c3dj6yt13kvoqycl88svx12zuf38ighwpt66piko9079wsvc9eonovsl1kgfi7ehybtxm4d3hxbphlg8bpep529azgd5o70m04bzr',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'e19d5699-0024-49bb-9336-0307d0665523'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '520e69b0-0a30-4be4-bef7-83ae1429b9f9'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/8266b271-bbd8-4558-9156-279557868335')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/520e69b0-0a30-4be4-bef7-83ae1429b9f9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '520e69b0-0a30-4be4-bef7-83ae1429b9f9'));
    });

    test(`/REST:GET iam/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f4a00f24-c429-4aac-9cb2-11ba1e941b34',
                name: 'si1bzc2401fhm8nkdwckmhbonsevkravvjrzkktio56bdxskd0z30dnfdcbc6exfw2h305itsynglzk3itinh8zcxzdv7oj8dil4c3b6px7a4zjwcek8sdehfdj2n4q31ojhpr70zi2l8jvo3j2v1ehikfaan1msq6jtsv3mxijce51n8meindz5j7uy3p3gu3jttrqa25rr0t7328caugyq2zpiu29pllxbf73jcnwcr0593vnfobijbcwnzxg',
                code: 't0ewiw96n8afbu1572z6uxuwcwm26f51zf0ylgzsfbkvotyn80',
                logo: '0h0uqwpohco99xhqha6tkwbkf9pj0rvc4d338zobjmz98q0oxl7nnmdq1pxtvnbja25ahh4u9vg2mtv9uffpbp72a1witj1ki6htj8yvgcnai5n7el026rf1nzxzhmy4gimj7jdvllk40ame340nj1ve6mtohgq85du9xqz8ou53a9md5b3zxbxwvcdveurdlra4a6627dn26bjjnjcpuisbbiupl95lahjrcdzgrjhk21z29fi9vrppa45cpeb',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                name: 'qufkca91mdesisfxsfq6snfjtvn3igcufe4nf5iudqx2z0j0gwf0odjvwkhuhnbmiwhvjto8mn5nadyjsr3rntrs98qksr12xgv9b2tnsxeeu9bllkx6npbu8uwuuf5pw0ea3w0x0yspd25yt5h8pil7bw2tnk0m77rbjwq4oip5d1uip7kiu8ljg8gvr4pvhn29ekvjnz3mkiq5bj1au20y5hg17ngrhyb76ehmtpgaj3q4lbaeslry0444dut',
                code: 'l7238stru29mqx9qgv7ojjugo2k431x3xpo0a5y3qs6e0obioe',
                logo: 'zzipbbckp3zz07i0upsshh764mw0aof0ulyyxor4z9ghijfb78x30yp2yrd6q9tp5ee0qc236gkb7cs9r37oqprapegiqq7ndcgsvkd71g4lbp3e12lyrb1rktvcsunzpl0hikjk1zmewlnpoqfh4y6bkshubotczmdjetzfsmt2jqs2bppit65c7hyqhgbwz4oqvjpbmaq7swii1ydc8cxqq2qkmts4birs77ulb3e1r4mz53tc8r37xgrkqmy',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '520e69b0-0a30-4be4-bef7-83ae1429b9f9'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/89ce00d5-9d47-4355-9201-2c92df1b318d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/520e69b0-0a30-4be4-bef7-83ae1429b9f9')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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

    test(`/GraphQL iamCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0c1a9cda-5f60-4353-b04d-440a64e6a264',
                        name: 'hfe3l8ksyuoc8xbf53dj6ooiq5r7obvaywlemkc68dt9do4d9cdzma8ib99re9xsa2h7k2awiroqj4kizv1k9uvkblx08wh59vsoq6sii5amyktj6lo4i6g3mwgokluygiza17argvdr45l32o08jxvlaq4cm53c3ewawtddo6x5of19f5hueumpkexmw0it39evjncq3g5unlzj8llp2sk8f4vbe63c9ydzt2cf3grgx5m9y8dv77ql3k038x4',
                        code: '5p5ti3r8lvduacg46k21lcfdkhfauc2bzrh5y64ygoi342v0h4',
                        logo: 'ufelwl98dw8adduja00wi39i9iopoya66df03vvmvnsbxzmnn54mq8smpx0enfnh1vazpt0uaxqh8t0kcjtg3rqrg2w64wdqogokl55wndprdw882kad9803mxw9n0t5d1f9k0rtkmgmq35gkb1108szw4canrvjyvhx05mmjzetqgiqhn17mf1n4gmord7ji9u68240l206ripm8zihannrqy1xz1s38zj42ui4ltipqc4gtn9ii7dv8syrg8f',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '0c1a9cda-5f60-4353-b04d-440a64e6a264');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: 'e2d6cf37-0fa3-42fc-9bc6-38dc2d5ddbbf'
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

    test(`/GraphQL iamFindTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('520e69b0-0a30-4be4-bef7-83ae1429b9f9');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '463b1592-ea2a-49a6-8a1f-a5e03ceac1a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('520e69b0-0a30-4be4-bef7-83ae1429b9f9');
            });
    });

    test(`/GraphQL iamGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
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
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cb6352fd-1779-49b9-a292-7a6b2776cdc7',
                        name: 'ozr1nntx2r9jswr10ull00li453j6p8bmreptx454jjnycmxr8chqyfz23zrn4s1nc8dy8jkvvq7lhz2p7rhbf1r4y9ayv1dstqqdyoujzr6mb6lvptq91pf91f0d9015xams8o0amwufcqauh52q1nkzjny8bdfzdlb0r6ip97mnb8kva6uwcr7uuikj418s56kjr33fjn916inlu4g4ai8rmyhgjd21zam5lumwsn6am4m11iu5rz9fiwe8he',
                        code: 'hihi2nibsfy3t8jesq2ag3we3xjxpkg4rk4i4htobnusoj8dqs',
                        logo: 'ycoaxdjs07sy65ycr0mpmgibxlk7c78zdauiswptl4c096femtzemsac3c0k5vzk5d1tunkpct106zvzecxgwg45skbtt0ei9b937bom42ldiqmfa785t076ensaik2tu2khxv25dcf5482a36hv7q1e8lo6ru2v0cl6qqyrvxoc8imuh0sczbi5g68b751k7zip6dm2azqp2ccq8emq8h0xu5m7su79j3x6wazuprjs7uhspiisrnm3d5lyn95',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
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

    test(`/GraphQL iamUpdateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9',
                        name: '99p7hj9yadgneo5rg4zg1cvsookkl3m4s9cfpae3qc666ewn4kpkrli31d8vsbbgdck3ygzhgyrusybm3wtiinoa6nz3rnutzsz8daqd6hb0qcbjcc40q15u3xjq6ggg0ovb09tnf0k6a973g7xbizehyjqnp0b0vdh9oxrzim8yqaboza5k1adcqqq1x9r6isfggha29062ywjhd9kehc646gsog149or2vreo116xlxtdtam9cftb3q6166lu',
                        code: 'tr90p0h7g4dxx08m9t27jyp3p78jq6g0axgy29tr6c7knbvnph',
                        logo: 'c37o0pwkw3htp5viayravysz0d8gevy8lg6pc27d43qosj7s26bftu826gjuxl3ss6naqr6dothyuyus5gz5h16yqhloqfoppx3x3batsonmyd9th43d1wem0t6bwvqiftyllfosqk5em49utv845h3inb507d3lt7uk7yvm7ljf1h6abiqma7ogm9iastgxezocmb4m38j4w46b3z242vj2gig1hpdsclyrqu4n9qhuw6vu5uaaidsfwf8vf8w',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('520e69b0-0a30-4be4-bef7-83ae1429b9f9');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1ca0a58b-7717-4cd2-a90d-af7fe364a598'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '520e69b0-0a30-4be4-bef7-83ae1429b9f9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('520e69b0-0a30-4be4-bef7-83ae1429b9f9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});