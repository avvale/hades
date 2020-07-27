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
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'eeb0si5yytelfipbcys5csilfr78ehhm2l0uzivvdy8u0alvpd',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'xuae7hf3c53eb5awxcbj',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'zqxjlm082vbnc82igt74nfcprld8ni3f1ykh2c76de8aqiuftfgtjlot6ulv82sjthbt7empg9ij297948bes7c98nihwn6qyg7ulzfndr7s0rgsbvybvy3whuh3dpr8j60872zmvc0rf45bp8xemk8xwpw0jmnagsn3cw523owki37kz6445jmkubxr1b0algwyhqv3fbw3cgow9g1212jks8rdk2uuv9tk1wq72ya7az25n3y6hmd5ap4ed0g',
                name: 'oymu8h64qrcm7foowfjjscyn0iqx0eqymxm9occlxj6dpp45bhpo7uwgleg44jc8bgdre8vgvf2zexsx87o32vmb8a0u2nal4cv6h570zeqowloglrcvv52vfez4n9l7o0mybwvemapquy5n21ucjkutgzpm3mwc5tzfkj8l8cdef86ttpjhpyw9cfkiud6ji7b0xq3epi2p99vjmzsmvzapwjhdqo34o4atbinaxrbvj1wm2mhi33yxf1n4lsn',
                surname: 'efd7x0r4svxxr9i8j6k9qocn21dby0tj0m316pgqts6ttxc2bgves28zgcsmsghwaet2ut0376ss177so16j3ytu9sx7oipso8s891lpgwv2l62kvmh0qy77qj9tpfyo377h66py0jmejya0g35531u9brrkhyy9i30zsqghyootfrzxxp2unnr5mkxmg79pqs4eomcirufb4rpsbus2p4k9cevppsj3ch5edhz46wm9m2w7f0bwmvibv92lkbd',
                email: 'k5yytjp2umpt1qgmc2s32mx2oc0yvpme9fnxgi2zrvkmx026gxq0jqkye81a3vf1l26teebyqmebqrd9vaelnvwyhz7644y040wykjiw6zpqg362tyfbkmgd',
                mobile: '0pwglva9nt3koqasslux1um7d2mr4j4y8e0gdle9bnufchz5fc769ljht2fx',
                area: 'f6oz68sevv7hl3r2x614bmuh8qjcj712bki81v0wd99po2gt6p11ntyqbpcodbl6y54k0d8clpbup5encw8llhi7zlqe1v7gdrurbcppmb2lk4isirc41njfdcrvdxtqwvdrz4ndcprmjganmanm8vighagljtgnjd7fjwoslo6zrzfd8dysct04gq07na0ynpp5lof92sn3tso8td3e9da4w6yhi9e0xo91a5x8i6r5rmhb2pjbfajkefddkjy',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '61r53dwp50puyf3t3d8vtwojbonb6igvnnflg63y7r04bzfcwz',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'kx89r04zxvbl8rzmanef',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'n2gy6c7q0w736mkv9eh92fwpvysvtup7spzi04lbhypzqafetrl5p55kugro06shfxlftl55ecv2m1g6oym7lug1qrh6eiv2c8ais8edaqlkbkxsybiwy2myl90ri375lolylpzn8tfs55x0zukj3srnuaoonyrzhscotwgnbxzxho8q665a68rzlclifygkxhhf4eapvedy3x8ycmiixz38qeujj36w3jlsc1uz6y0ufe9blaovhzl9d8ttaph',
                name: 'k72eqvym6c8b8ivazek5b8lnpzo0lhn527thk7nst6ns36oaxz0t1hvko0j32dxpa54a000mfg1j69guzry86c4im8593ab8fz2n3td3rg8vhqc8ya7aw8xekwiuiuo0zgajf1bj7b3f57hb5rx0xgi5u1ey6wanwybfcct2at6rcbvc1wpwwclko6p3j181ie1ga4oxogn3ytos3ah1zkq2jesh0gfckjj66yq8k6z9kttnhlnyik8l5qwiyob',
                surname: '2gma95mu0mvmhim1panu9jadyy2b5rnzppnjm36mvboa3m3xwwb4gbqdhzxd9wc61ma4yrwu6hnuy60f5f02lwfbpu301m8ahr88qpdsrpnoqi4vs4t6gmievn6akk42uwkue3av830x0ficy7me2zipfukd0slxyjnb303lubmx0a3441pg7q99r8jvphtk09k2mcqal6gv0ifkvaj4cchi434tbi95vstmo6h7t8qjdlmi8hygakh2d65jopl',
                email: 'bhjo4m4tj1842myu5td6pn6akvmk1gcw5ma1gg1u92wcaf6gsmrn33pg8q0hwzo83ydfirqa0064gn5ceva7ux555lkkolg8fmv9q2jxqh43ue7ed65pjl5f',
                mobile: '4nabx0durd0zl3kbw3mg0ycd6jv3grev5x93nqs4ijg83ol55agntvqne5j0',
                area: '4hwtf47e0qtx2id2ck7q2ti8xvpz25x1fcknnkicfz0xhb6ku3dlsc52jbk2vaplwgbargilh3howclx2rrmjkz1kuwvela25ch1b4qcxwbalrd2zcti95mlp1gp9cr2vlihvzqypfl5m3em0mxzxmy8oba3uc1q6tlrkkqew6lm8ojib8gkdbw7wvhc6hvrge5u8dgj1b8onvavr5hurdw2p5dqziz32nmog2n6akxc8gb5seryr98ibiu6kji',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: null,
                tenantCode: 'e8n7pzonqiygz46btkcq6d8ljmq0pcq0uj3hgqi4azhicwv2mq',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '5nmh8c51ig21tmzs9mvp',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'h50n8ercbtv5cb9x2oymjsnm0sl6q8suz09oelc6ggqdxboq5gxznmsw596hxaucooqma9wlgqvwnk64laepnf1y4gvoaqd49qnlwghpwnezf52wl0p84wu42r3bjkuaqo74vsf9wcpns7pppbbhn35vsr1oxrtowr2injfv04njfvtaonr9mv39lk8v6y1ypdw0dw79rsjw00ka1ej6hp1cje77wscpp47opw1aw1t9i5ex79obybf81xg87n6',
                name: 'wq8313whtfa4i3xlqg3rq2vx2t60vy9lhvb4nh165842mg75aoo6du51y5ofwzdhji4pa9ttnpgh3mvuz8aswu4eothjnx82yqasrs3eydjwmk4livrzx4qgk1qiacc6sk7gbfv7s154ytna5cc00qv5hv7uyvzsgfhbhh57gx57u64n49ml4fabsk327a4y40zdj14zypog00pgkmjqh2oinr36walwu2r9ztxmnry4lmbu0sq57hb67rguqfx',
                surname: '9cpvjo7dpkjb5krd3m7582q41ezkllvyvfs9fevh77egs7b0wydltej0rayr4m8keoahwquglteluwy8gq6mch4rl1hqtz4a869zpk4r32yziop61rol5mml9g1yzjjg1vlt5tde9gjgwnb2fjmtx9w0838y6l8zr3ya00vqh2fkd96x2a4bfy91o195091lmqgvoreegc33hl6twpfjqx8x1oqc3cd7mnq8zco6qfq6y2e8zehb33wlcaylb7s',
                email: 'l7npy985e56bx6mniz6nrpgge1n7v7v07ooo6a0kimpvvamu4rfix4qnvuhodegktv4kzzpuf8qodimf9424wlxefltcxfvw53gg8fivf3o5xvldtwnpbgw6',
                mobile: 'awnj3i5beutjbbfnpl254wss1piacgxfhdix0shqw6rklnfx2p4h77s7mjtv',
                area: '6m3q0ts7suewvgpixbwfrgjpfjt7dngt6tmsffe7n5aaggqxlmzy6l7yl87uvs6kfwg8etgsfmligjez3cp5sb3rwb8gkwrebtnfe1osekd60g675dv5nu1clyfwnr9qkllbkyeeknx0azifm5cy59i77x43l5mktmdqroso7wegruztaivh0xk0lkm84w2svx1qmfyec3x49hl4ejhmoh8vb3jrqvz16eu3h67ourhbhfrqyzb7c0xrg1nz146',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                
                tenantCode: '74xpgrsuy98n69921lfsn8w5vrjmqeri19zva99hfrqzw04zx3',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'wq9101czg43e7c1csvps',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'sm13k0n8vufo7zdab23mbxrrb4cuy280jjc3jl4dwc3hvqs74oqdzky81pdx67qcojxltuj7b7npzybfz23k79bqhu9f9xqb33ng0brgjenfb9k0i3oknzxdm32js8tdjffwg37xl1sd6uavcu79mgttllakingf2ucbvn176lvz54i2urd0lvw8twehu7juvwys9s8d7kp6wj1us9in9v706j5zokvl8ouwpdfxvjswncyp7xu7k68sy4m4mum',
                name: 'hmyeb4nh79nijfgufvg33p8ofj72xg9qde8rg0mathq9o2o7v9ltw8ya3foqbb0jt6i42h2ghzb3hkt8zrc6v0lon1vn0kjvpzxkxoog4n5n0ti1bx24054r35xpponlk4gbhgxjjw7q8j0d9snepg83enqfp2lzsyekjwanks1ene45mz6ukhmaabw4r67wkivivwp9nyjy1yjxj8tvisog3n1ucqaiq7ymn76epwp5wp2q1n6c492umn91zbd',
                surname: '96xprkrfuo6s0qsmdcqygc8rctknn9mo14u6uakg195zq7wev9f6huffba8984xs20dlxxvfobc1sksfwz3c0dofiyfeyoq0t0l1ppyah9caykjf65f5wnrersig2yh4ivqrachjqxyzy1u8rwbq8ynlo9salr9rqrpy3au8zzinwg1m44dyjescnxis7k5ymkubq6uldn7g5iqdfp6tc9rk7uyxg9xf6enwbkrhgv18681gyvypjcualuo93hj',
                email: 'ekq9g0n72wb10lwnc5zu9cvwkouol0876sxj1hay26fcwd7hma77oy8w9t0v62rjwp7nuwa8hm63is50fx83d4ffghumzmjkp2gkcxrxna9l5qoco7ndcq9p',
                mobile: 'bxuxz1fmdpbibqrgjtsz2ek5q5nvats0nnr64oqps12454zgz6tshm6a9kyv',
                area: 'e2cyyd5lk5uywm73odnvrd5nphpfh2g4ds8r7v8l6cqyrcavgeec0njs5s5dfv3c3lxlu7qmdibgifjw4vbz2xay8n8t16xb5c4ayv56awfgkgpysf72gk1bxzeryrv72ouhu9n7520m297me628zehco15z9plo4sosift17e23qfjcdko7ljpw4t6jsyg6xbdl6nax2as7ajyixuil4w3aqh7sywdk4t07b5yaogytg7eq0edtexnoi0yhcwv',
                hasConsentEmail: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: null,
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '3zaa69eihzyojxio3k4g',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'jlt6jpgv0qgrf76pdgw9pkr696fozlnsv2rxf1jk9wnk0uh0pgddwnm4tc6ju6m2ezpptax1ifyus8j52bi0m20f5j14z4ozmp3z6tk99y4hz1bd6b9m8xcnh8uwif0vhv11r0bfc37q9ae4en6f3ataxqr36jyd101remlym2mky6cwr14kir3ikpcpord3vyigwg25fk12g6qrdc1sjpj7yov3o8k5mjv5qb6q6nipba1735n0vl0jdwri05u',
                name: 'emg0umfk1mkehei0gnpo1v1g766dx945lrw5tonyin9sro9me8exiqesmpn1v1el0n28hik8pe2uirhk3hncpz0gymztkj75tbdmdbhq5axucw21a0akmk3aajmpjtahdf0skqu85ndpiw510fetsnkha82k2z5phtmspm3lvuw4ewfsqk83r34h1v5ofyizbh8pwcbixsosuvibm9p4eaax3ep8amvona7n90jc1yb880gb9epp63aun74jm2p',
                surname: 'i1nd1a2xdprq0aysoo72j6xne6nyu7rtppv84mijz7h99v1nbxgnhluzoh7olwzxlu7rg95p2z14mas1pnlxlmkaad0eu0po2hz7fkewsc14nimy1e51vzd3hctof5iyt65ci2x1p9e30pe5c24qh0rx2ypjsh1lrhxftj42jujmmifku6b66aqrblkuuzc3tm8l9te5jnrejfo04igezc01u8whlz05so6ufqccqcr5eihkwqdz787zaihayes',
                email: 'dd804s7s0ayqsa2qervj42kug31ofuo13k94gc2ok8s30tn04kcd2pel5s57nqkvm2493am36uz9ol0kgelyyupqw32qbnhwj3kdavvbyvfdbwx24dcwxwn2',
                mobile: 'o5fl9qvbnf0b6z6k7rsiuh4n12mwnehlwq5q0urpkz361rhc4csb6mcypxwk',
                area: 'atumgidqcfavcwoyrvqcwv9mzbvbayohn27lfc0tcospeuji5lkhrwhur6q27bb2k4stypwa0frzgwyegjhjoq4z14whrqeqqh0mee01zgbz4hzmodrt95vwnraaii17ohzjvx79fhyr085meiz6d72iai6znhjxqcytlzti58exz0nc8n3wrlpu9suf5rk1ugc4dvdpj2lbpcdworob28lya4uwq0wibrtvr3hikn2egj6i5811vmj5sybyont',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'w0yg3ayrgwazeelkgh03',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'azt0q78jyuvqwk0qszlloonh3cuh66uzu1ttvax0k70jf5kfuaofiikzh6aq1dsnoa30w38wg7wivpbgf6vojrcc7a06b2isy8qlv5k3wmglhudwqftj9o9jdap5uogaxdfmsxuyb40im1n8qzoxh8wlrtsbwkif7np7gvq6802ty5uefvyhg5hlplkkiv56mjw50dtjjgt18kve4s95hpl2jsu454bh0hoccl2khxd953ip6c532u0cdkevedp',
                name: 'c82x3tladvr5la0202l6vo5d3ocnmj6yd3wlmz3dg1cangril3lz7n637h78fhp8gvuxzdvbe4rperbo9c7pf3rshi0utfj8uc0o4sovh07y8ndz4ywsabpknlhq97vzt3w0zmr3c2h5sqnjkdz3xiqzgb90gskgpkwdedwoidj7r5omm6ri78loah5lh9aukyad2pfkm67odnrd2iee3uk0fsp0frwbncf60s9zr3tsiy0o1cqib7p900vh85u',
                surname: 'tx5rsbdyvi0adyqke2l42thjha7vcs4epu9xjae4ihpr5wyj8aqy62ovjd49fdn3ggcw1rq8vsmvyau45p9r5pokyukjeg7rexm0eo41kluonkm2uc2labforp46mis2idfvl65f10vwt9br0wvhnj0zip0dsnuu5i82z1w5c744b65wyz4u8d99gh0i05nlowyhcygca1w6rtje8h0dyaka71gwtdcebibagcj20h4btnsyok7sanyu2e49xv8',
                email: 'gbpvpa20f6vjozk3hpuxm1matrg521lrk83x26p4ipg83qy3qgh9c1sayh4sgh1g6q7lpqy2ys6b5wcfq1u9n348uxphad0krj0hfste3nkip5mlgcban3lk',
                mobile: 'y4tgpkmkjpl16x0tw8sf1htoyvx2c6h8zv3h53sfxmi4wt0wj8c219x825m3',
                area: '9stwior3eqo518r8awyfh5zj870gsfzh802dikh4a6pihlovqx7ezofrj5nc2ptjrlxaxcfbo0nja6386w0on4rstccd7m2itp6lm4kt2ex9rll5ku50wbayutwghbvu3m5tnin7hps5nsqfvdcqc9k16p1zll64w9bgfjdnlvlxxoyp4ypnqqz3ti9ai0cnbgyawo7au0j67y9ih4n6yswlmmdq6p0f7lbndkocd2xrwhsbaxjk6d5o04lg5x1',
                hasConsentEmail: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '4cutb047ld1qdz7lszc3o0lqfwqof2md2979ut4fybscr1vf8v',
                systemId: null,
                systemName: 'mg4kf01dtccr30kgtr3g',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'tg0exmod0dz3jlg4ozmgoke59r1jr1h9ehp0v8rkhidff2z1dkm5npb6s042w7zn3iksnaemh3cw772nmue7d6d0udvso5vkzg57ktdiq0mv1xms2prpap7crep1x7pu4wyc3cdmajoo81kckjchk24747vkwzo87ag6eglgpk1nu1218psuaap2fcw6pq6hgzb5iwvkf2kuow6nvvekrjp9eyui3kcruqetml1itpkrs4jvoo2pauzvu6xbvur',
                name: 'pbimp6yxeghy7ptlhuw4ntnykx64nwr6y4bqz6pv3h0m8v5tixof9vfmo3fbfybaiqdcd6bb86eoph11ftq268zfi1ayipue9xl87bufbdc5pn9ydds3u7yiplzfxv1ef8qyv2ut57l1uw4w3oskmn2tbm1vf6pf665kp4t9f34bddnsdk900akox5m7yiyqb9ypr6o268fjbpen87ew03v93s4qd9oehfnr9ef1h3nwmxle55nyxrt49j464tq',
                surname: 'ywm5cmnja8g02vmgx999wo0et4roc09i2ub7smxoahb1lhyuuki9199l818ccmomlv2o1qstuaj8c2pb3w8j5c5bdv7f3wudfdh242g348trsa6byqhd59txtfy5mz6qmcs17cwegi25w6cb71mfw5zqwezvith0p3s2bda9hom7royxsusiitzvuoac336teocg5jt9etqoo81o986hhc4eo48de7dvz61uhlirrgfis259fn60p5zwwxogzla',
                email: '0a82cvbegh93lam1a1ermcco6tul68wi69eaae5llitkc9k2h4qf8dbe3ojq11bx3lx056cixafdojgwmqpzmy4so10fsvy3so520vdq3jgj8o7jlavhuk9n',
                mobile: 'va827utcchiprzzq049spj3rc5l2pghzx8t8y3st947xb5usr27g6u847iv6',
                area: 'hgizb5ao3saysmg736927c3ly9ptufbhmurmm99xrpegrvawcmo1sm0uel4vanl3emoirq8drebt55hiudff727mdi6daxtuwqutxctnxcxb7bpsarca7q52iosw69695a6h8jm4ttxvo97h0zc9z1uk4gfcxrhl35e53apsfq1g25yn9p0eadx06bd3lgeq52os9s10x8qc7rbok8f2bey7wbs36ya07jfasee98ynjwtx7i0m1vtnczlx3ye1',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'yto2zd2a05usdxsq01j55l398tyg51fk8pbesiie5wnpbx778v',
                
                systemName: 'bjuulb2ucssxsiile13w',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: '1dms8omnvh3q8sfrq2x4xx9iu213k2lr4mug56jf84zn5vcrm5oevgic9q0h2jt7guhpf2hrt1dixq8acqg5mm7fuqhcqge2emtgxx5vcjwd3ds9nfs3v0ms05lmn5w393qmk6u7bgs1758ct963t68tu6137t6ejq0986g0j5rjkmgejbww0eneljulpcsdv34cai0lbsr621nbgi5567e71zvzbioxewxe1srf7z25lnvnmce2p1uik42gm0k',
                name: 'xciww2gzbcas6q317i9zwdl2355rdy6aa6fenktbeyz5m0ulbzz0dsrgjebirx6dzojoqw33kbkp53p7ncw6gx6sstdnjst8mj4hjih2zrqjbbe9nwjjk9zd8lphwcgivh5v7dt3ypkjjssiybqsderq6ui21ev6kmrsvfc85x0gn0oj801gz1fcf815x2cdumzk8wm99xuopelt5tardu4re4hmj93i4mt59v102jzg7zgbyhfv6h0yx1f3j2k',
                surname: '3izkamqag1c3c6qt46s6llckbv00qjpqezphta5x4up0el5z70xlvit5isnizfsxapmoixsv820m15iczr0sw2gf1ohvh853ov5ohti0joy5l4xr1rrjry549z7oh3pczqjnnjcut6yos1tmth396kiq7qsaqfze6rlk60i4lgu5943j3kdonuvlw4799e2o9tqsdvfysig5ft6ebhw2syzd4ef8l7pj1f02c60me18r87r53hl2ugxmdlyv9lv',
                email: 'hg5bu507y2917ukcvxwvfyh83fvihg6fituv8hqb4k3vh24kb8yz30n6vasn08tbhtx9dab97xrqdlkb1ok4nr9661ycsll7ah052f5dzsfgp5mjlapojkgl',
                mobile: 'lea2xok3hav9vqzgm3mnkzi5oqwq1qppjmtkhgk8l6pn7ukp3ul5ig8slvu8',
                area: 'tg5kbbrssxu0hj4208wg8y7zcq3uigvc56r5lgr3u1no34iumzc2ztxv8rqaig7zpedofn12gzcz35dpf534qf2petyh9llciwrlqshs4dkxczmpse3pyzzgzaysfisaeum6gcr33qqrfn2pe35etszplprlk8egqfqcfwm63im993bbimse6v4utuhfqcvtg6iw6tisllxoj1k7tn6bplv79wym9qaexkilb5o0oxatzalfb99q94fak20mg3a',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '92rw7tw13pq24n34u7ktcyp97mys43nnbuw3hvnq08xbj21aku',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: null,
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'duowwtj21w3h0ox60724dd105blkfmntnon0sswzlfiazu3q55rebkk64vdklcf2pry9idhk2nj410nf3l8kq0d5g3dlkta9rz7ibzg7n8fj5olpkiguw0uj2ya52d1qw3dwkqhathazggqq8jwdqv5m4ail6716sg3fhrfk1offja53dk5scozzggiw2xqtl9fdmuqz1t5l9tjs2srnyljqlqjdtln2uyzgqywpuj6lbwcagyifwqmhuehfzol',
                name: 'bya1uwovtpl9kdmo7l3e6lbyvln7vh9cr1gz00rdavbmovqqt1w4tar4ks7dqje8tjow42ejz22tif0x2vmauslfhoz8py44gd8uivk7ukg4ien6pi0uvowcul1x27uabgl00olh8lkd1osm40mu6ox5k1ieb6y8l4rifn1l2ua9q8ymfvvnivbpps1683p0j59nhk3ogog6hk54pwx1k2tdlnj3yj06ni8dvk3t6be9iut3ifi8e30bby5nwec',
                surname: 'u8r3rmd49465m4sh68ujc7jtrwal85goczad78o4xbd5g52cbni1rmedzq2lbsy6o7o9vyxntzxs22l22s7qcql4zvifpvfijxxsw80wpo4yausuvhs7wndd7reefibahyi4zap3fysczb5ozncg0p5lfpckmeu6eo1r029cesdeg2zqfanz6kzsx1xf9im7250mmwnwyne4bxtroz8r0rnehngqmgkulxsqttvs3zjrokq7n7c69li56iossvm',
                email: 'zrpesusbexgjc8k9mx3r6djfe4j0etu12az1qm485h09llfkpilzwyb7dpm4fj5aoqatem8ccb5d8tmhw761e6zyklvbyyes8lwcp1a5uxbd4u6x0zvzykb0',
                mobile: '1ftcbxw7kwe851lr4k02vxzbi1gqfo07abf58mihqb0soqlnoy2akxcq8w9x',
                area: 'p2j7ikl7pd4ngm813xrsjwuwwhg3c9zht1c4tr18caizg1dlslq5n469g98xsk601lninsq6gjk7eqr94bx20vkorycws2n2r5wvtt6coy626bxjgf8lqkd66l9fu3ons6f5kqyf0ed8jy0d7ee1ce3k8ai88wy46wn3bhpdrzm36aza23mvo40ynsy7bflnk4swszkup5jjwbs3ye3zoa68f19oiy152msb4ubsmr5zoyugxqoyysda7ic7kmt',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '5qf2vsytu3516zc16nuqpoyzsnw204mnp1yoeu6uzh0tifuncu',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 've0mx9a6qf0uzge7cmf7ibkqzeeog0p7g0srkxqzdi0l5bsvhkywoqeehfnjx1cxtepwe8lpghwx46ci8rv90fmwhvdbpmr9kfjjwj8rxmj45h6aim29i4ls268lppfpv9wf7d8utqnu7v7ihph8gur7pw57eehyid1f9rw3dg7gxcd1bkfwi9fi8vmaefevpeino2q76fqrex722pos8mt8fs4cn7jqjqxnl52fnnyq30a33lvuesnds5pi09u',
                name: '3ojdswdmx0fi1fxkb9kjutrqdikwh0k99yfop2jmiei52p3ke8062aq731x0jc4tj8dkwz6tb4tgpz9f7dn2z0ic0n9shmv3l5m1roy1d4dl6utp4ixqqv5fhjxtbiignhnexr69mpr51ih7sondbfbh6judge2intj5gkdh1sq1d9o3gb4eaqqjkukoxq607agh9rgj4lvh3xzzzrpmff6da91w0walw0xjqp60u6mumjqq3jmwiwh22uh8k9s',
                surname: 'sgu4asgtjyhsgjnk2ceqdvyg810jdakcd406c7vjj0q30wf0pk2dqgziyul8amna0ks8u59suzb17fbxfacl52zwzd5crh9ahfw4x62ikdzfqo5gze5n7h63hzfsnfw138pb39zmmqzuwcjox9vnxru0miqne3xmiuf6ru7sc2astcixg7orgktrdc7bbky5azlmlfkwrb9pp6idktaan5fbhxjehb5pbukzm450rjb7ld0ta3uq5van3mkimg9',
                email: 'sutz026u8oa95fa6ham5umou2187xsocw7j6s3k30rweq3eunnl5hdss0qi8xsdh328xu4ivnyaqjms59muxnd4emamhwfy10cad4nry3wna28f6sh5rrvnw',
                mobile: 'sowm29q2ak6khb5rcwxek5t364b7f72eitz5ukos8gzgyjkx4oiu8gy4sccs',
                area: 'a3he626qt2y6duajdpukn8oml0mwe5y75r7r84y50nmmijlx8tgcuxo0kfhkbihz3m62s4ppajx4rwfvldjrkxfh4dmlnzcnwp6o7v3gei5mdsi74kg8pr31ace6o18gnno96d0dnbndi6vu023ekmxln2in78sciqgk9uyg5bbh7ov54i9nxaagykaetd0wal269fxefhe5rt1o6becoc5x6wo20qs1zzwgf62p1olq4uzdlqjh8xdxs62oqak',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '52mj4pgypx20c2n3cmnqifukx4a6fg6eqwpdk8tnw7gcadlfry',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '5nbkni8bgg5l18oukp9w',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'kxxw1h3thwc6azrnw823cecqtrn7q8rytd82a1tc1p710tfcq9fd0rdwe7f76ixzlhyrcllaedq3vbpi74iaiewm60pdt9qbg4wi5ok9p6fq3hpii4erqv397lnz6lqhy2he3159y927vjza88vznzkfylor58sz3ec68egecxj6e0y03mjldj3lf571etoxa3uc8dudupjwe2hf3knvjhnq0bkc97ld0vjhtl03hyujtx5bqgc4l23qmtf7ud9',
                name: null,
                surname: 'lls4sdusqnailyxhrp80d8svb5djkiipug9wbf5vjsxkjeo0tywy2cquvq20jdi7yn5mp7thmamwf2ynhq74msc389vjjf330w414zqws197aqbt0kgm5yoxzkf3m4eozu04xbs2o8ocbojl3rf5c3b2f24zjfyacoc5b7pxyd90o3bdrleauda63t7tguukpd1q71ai2whici42l8uhven7nxne8zoyewbt9t8o2wc3zly54wezin0mx9440yw',
                email: 'p2840ofgei1l8imlqjcd5xwtwsn4kreedffmiba8r5irg7q1409wz0pv9e4ycbcmfdfptigpf33mxxvy4kuvyag3x1x293dqoyih1dgbe2bq8vryqdyh06i0',
                mobile: 'l9kfyadzspd6ofwlfx2kjaktmzdrj3os97fj147xw7n83ncp14v6r2kd2xad',
                area: 'o2db7clat67sxes96noch029cndsnxwtyp1bna8zsyp7ljk81uuyqn8l8hly865i9sx6wuhuism71xma164jlybqz9m2b6wlu71f8sbmwtlzj5bcxp7gc6w6gqy8oiqp2nlc7tt0mfqnyrqvf6lwh8n353vdiqjlujxdipgyfrz0bn5hkzkybf8xrr9y8s169uxkkte5vln485v69wn11y4y4h8kbwvmvul7i1cqn6dnrwjc10fprltgzeri45o',
                hasConsentEmail: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'zm3toz6mt45z03mndcdgspvn7cmdg4ckc4ztcad8gghwbls9iq',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'zvy0ldq2kpir1do9rz79',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'nplo1qg133kjh9mbljw7adwxl14gbjc8ca47b96v39vec20y4iyituq30a93z1046jj9n2nubbu6uko04vlx8tvvqaa98du0tzvgvj6ejaiflkenbiwfmsmhmx79vnwqkp9xtl8ks4ryrqse92cq7rgl8ndt9yuxvxihztxvpk2i6mqbmvfo39sncyfhd4khwz9bbwxta7ym6cujtx071qul9vvlxjy15r3y8ii1ncj0xpwpbfmwki8b4ms4yyn',
                
                surname: '3stjf4f8m0waryhirizidstresgfjv6lei6qigp2l40pdgpaitrp7qf4ehb7tcpfs8b95kzzkal71xcxvhjhsgcv0dxolxjuxqxxspkrtc6ucldqelumxl313hl20uwwrwi8zxb5dde3c5p7ruw6s0bjg5c99rr9b21vg1rx41e6x9zm1sqyukg0xirs8hsif4on6gnaz0j78tb824lz38nnup5ll9djgtcuf2rpev2h68jio85y38jhdlmcott',
                email: 'aoxj0vwqkiqsisk9typdvj007ebinrlp3yln4qhornzg2zrezdfyoigzpxfxu2gczcdw4a5r1c950e43lep99898x7a6pzdwut8c1xg5k8keqztr4x4w1o6x',
                mobile: 'ghvrzixwaxn92yiemqklk5w7pjfmu3l06n1yupbqi1rsak9c3txxd4r446ke',
                area: 'ynee4nrnafd877brsgrugnk23t2hadswc89bl1u45431es3usu9j4r5q4c0n6c763oic9toy3zllcix1nnj0elaiu3v361j0lr35d8hq5i7vffkx1qehw1cx3ptz0kdzznx3b63jda6fysul6o5sz9r27k4d1rbezemw1n7lz1sbfvt172in681uwmlik6a05ladqnb75axyv9csdqpu8h4x5vgkkpxkpmjmq0p01mi23yh9gj430lank4ljaae',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'uosj3j4io8ycmjr3cuaizg78qcxe9hfte1us2sofvd9u88tick',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '2sn5o9dufxqksrjg3p0w',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'drya5hii11ev1n0cy6wigdnqnl5dw7bsqpk4e1z04ak6mofw21pvcpe3j9fkr9pltaouw9knrgqust5ja7w7qw7rwfz5hd1lll82t26usfk20fadg371lmhohskxc676ez7uyr3dpjd1mhw4vyl7n78vxfak9sef0bzlcoib0s1h7e8rug0pt615a3emnqyxl03yto7g2zfniaitn50fhoarfaf1gkqoqe6an76cwjtxt6d4xuaitdgww7ga6it',
                name: 'b3qaffg1rarbpeqbjv6lyxhl6bjn8cjb1t6veoz8auz3m8n4eozd7mbqj978pk3ffo9pjsjoo29zg86lgcb481322dfzcoti5n2aq2sg7dvk64l9yuoo8zg1h1szpr45i1yp5vfggfw0mr9wq5wnrutm788o87szmta3tjtwyt88cqip8hjbx4bmm8zwal00ybemv4el4ipm57j9qtp7e2xto92o56q7ez0ynbwcnk48rpiikk22hnlausgwmv7',
                surname: 'duk92wcsxcmd4v51g2xlzi3lkqauttfeupanar8hxhntx7h6qvhqxczsnit7of0pfz69gpwjbj0k1rjk68zedaiwc7c9uldt5cakg1iw8jec60cf492z1pf1xp2mi1elqrmpn6kx59wcnt0ufgzibia01bcnxu9aqii8gpawz5w40bwosts10rzb51i3sjioaa9w1339nqokz7hhh0l9neota3g89cowbn1z1f4ia283zxld9dv7z8ukjcla1p8',
                email: null,
                mobile: 'twmvbuzwg7cuzjxz1s6vg5lje34k5nvu9nuf43bn4xl1j60bcckgd0u6ebo1',
                area: 'o6wi1nchvka6fdsxhm7u216ed3snz6o8ez7wt1t0ymdnndozg8b9kktpd9r1ng8n1w00ehv529irl8vh4zqj7yuodsmyr0rz82kpclt63owca0w6yz21c66ggtagxj10uw9jia5g6o5k414rw8id8dzmfl46z0xo89k4tvlwswgi99ksie3ojeo3l1ybpyozq6epwrg7ws21y2s54a32d4c3744umn2tp8vx9z7a9bi2aaqe1w6iy77w1bus3nu',
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'j4iez0ba7ulbo8909obo03z4p4x4ujcftibn8msc0jysb2fzom',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'kmosgkqsaavn0wtk6rbk',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'exwp0jli426y5mcdihpk7t4dcbuf3t7okrqm0h1skk9gt0w42chtbbfnjxiybxh4oxjzhfqb7jfs4fh9ow6r4adacfe7kbqo2km2kwn25n8icbomx6p2bq82s6rotull1hm5regbiibwies0d1hh2rjveqwtuspcmouuptjh19uafyceuvt0qwi9v5pa2cdc6vcc16k2nyge7gt2tswr2bnd0xv71wocga1v142npylvfnoxnkop2xwqqd4t25b',
                name: 'y602i9ath9aqm1my54ljimz8k51uhd32lg4ycq67w81zc6og62xib55dwauw4m434j3jdjjzeu93ddpmwvl1tbibqrt420uast0liyaw3m74nkdrtuwrni9ujcrw4wtm7u34qsbqpk7o5dhjrlf71s2x0t2lm5bmvklxk1aj4is2lrk725kgjynyx3ef9lp82uxmv1e7ja5b124mhlhjeli68pd1a70ggiknwpnawaz50wir1ratm6jrob81zot',
                surname: '378c6chjolbx262evrs8i60ha2ukjmxbcw5hqhdmb3sotn625ad566phiv2fdsrjltwuts8rjc73ryotmx6e2p9oqcz53p45pi5f1al5u18k2gpqf7iuwxm9qqvus5hei7dol8q55m4x4g6jvt8icvzt2f9nbp8qmvsuw4lif8fh3ewsrz5kua0i3lz65jnzrmh2a06flohctu0gcw4ch6ogz0e251w5823kfpz6hmy0r1hjswgo4unsjv6xl2l',
                
                mobile: 'wet9sucv8d9rhfm5kl17ac7xy5aszl7pqh7crjvq2zyv5lpwdlbgvvr12wcz',
                area: 'j7mhdf3yey7uob1kys9huvy6i3o8rt2wc2vkw74y541tgaooixpuzou89crelcqnwef10c8ooywmdam3xxh1i3ca30s3cl2e6j2oqg1jdbidddkz313if8korib1a2e4ueukcftlkpyvf3dk9bmymkzijtlfhbreztinzntxz3jlicf86mtfj8k1ypqkett5879fwftjcxuztwjm6ww7633cdgxhnkuoa94laj97pexoubvthz5syl83ehfnp9z',
                hasConsentEmail: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'c5vqugoer95y6ryp7f97qsrpf2gfo3rn9355oyipc2i92giwkg',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '6waml5h6gdiaeri2n6nx',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'fm1qjko6nhjmhji0n3wqdffyc6yx0nk4mhe480qnmrkeavdb8i8max2rz2ihm07zd5acxip2yymwheipileo71njtm44fh52i2azai8473ojh0d9ulxmh15h77we6n8pjhqrnuf0urwqglda35f9so85huvkrtpw9utvbdzfkvis3y9inoyagjqu672fhg7kvwo9se0eaxk123nt873ze1s2ki7e333pdlnz4fc0mozxdj7l7y2dnle6y2qjjzn',
                name: 'gsfkzaq91lfzop4l2ptd9449xtqn4i97cg4hbnngwvil558a1e0v8fi2zfudxighgirubgiq4ablgoz3jf3gcn35n0hn22ouqf3fpl8368hh4xb4gm2pzqj9l3j2t5fu22tlhbd1byl22yuf40t8jjwq5957j7rx79lkrq57mcztxhq5dglhzaydyg6some172j3bnfhc1bvfy4j7x9s4eiw9d7iefllj3076l2zsp06bzqq4992xcjy4e4bbes',
                surname: '3rillu7od235bniqm7h5bndx9th3xsmaw5cg3ry9mvgul3wxupfo250clu6j9wgpzcfc1ksqxdenfywwjbwfqh6jqer3u1oj6nzb681mbnl0hebijj7tbu68mi5bh1fq22aglytdyx8qb79p5ncc59s2a7vqwd5fimoygv292eqrvkg6cupynuuz8t4pw10a6mwlpk50x9u1duytsc85mrsavvfh94ac5m8xflovn5epb7ai2o92fppkho2pg7p',
                email: 'nxqb1imx0tu96n62qd1c7zhz0ghe0vjpl5yafzpxtnepjublsfk2ayoefi66vr7xa32eyfolvi9k8f5659ia409can1aboh9cv3r3f4l97brghwinhbsyp5d',
                mobile: '77h9745mep0z5cju33zvy7xl0jab15n4on8sijhszk06tm4elup4z7efjg6q',
                area: 'p1veqa8k5dqm7sj5ioghklx1mi12um2zpew3h12x54oymmj4towwgqxbwkj8cgp17pfthh8n5q5ouxfut9yew84zf22s34vfcidnhwpzf5brjj6obbz101iga26xdilvg5ke6umss6swqd2c8t579birgcs3osbboalh49ah3hy672mh7l6djrqtp95pfgzbwly8r0mbzrtfvo1op3n53375tok2d7zc7qqnxwqta9dh7nbdhg2jua3092fuk0i',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'dlk3li8811r0w3bt9zi5nibmhb04puu2o053yzwtpnzpkhewix',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'tfei4wrwg7l64dkpzr20',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: '13s82ldroqo7rqnq8v9z50gov6ow7rlrp4blkxeetvy4qzg0uv9ry8qxurwighh7lg2w8ym316r8u6p9tz17ahz7qykaypk56bkj8fv4xm2bmco2xubw54bn7cvmzn02uc6p06ddty8x2zg9erc8hgng2hfx8hex4efmromdmluq3bj4ovwkdlz7e3k84gtlmvxw7n4c6wk77g0sc30jg98bqf0txwllr22mgmfzcxojjzjv3sgb4gtzmu9vcyw',
                name: 'tyz9jp2tgn50cl2kfz6wamzwhy3pwzqjaouxan660vz3ow386klm3lzoatc99cx9dncj5zfcnjizw4glqd6l8iuctifsdbfyzvoka9zq7ond619g09yoplm044l96hqgtk0ozkixavectspcgpjkvyj0j9yc3q9s1lewm9d3o3fizq80naclt0xwzutzwcooh5221yerbs5mbawly597clxtc48fsj2g404opavkatd8na5lykg6ifq9dshjeur',
                surname: '4i9zhy0htcvtd30en11k9c45lh8q91p4d9vyxuk49uktc6fj7x559q9aoorh1mv710psrgpy7uvogm7cx4yxz7grqnqdqdpnkhvqbeh56n4ma77dgtd7iqc55p4lrmyz2516z43248moyguc3dltsrxvsep8n9chyrhm0umv9iwbm02hmzo0kbd1mn58ptj5n105wz61nmcuy1rjx02xmbobtbbtfb6oz6nmek1hm1p0jwmg4jp5g7a9b9el9gv',
                email: 'xj68jb0bdtkbnwi47ihuo9dxftd752u7nfxy9i62jvzzush0aagv9i82eote0xgb878tubt4v03i07hxreww4syjxgarn1tmpuznh4jnbs9fgzvlx5usbhsq',
                mobile: 'e85w0c7fblywbkyf0vxluvgdfnw44bjl1u011cj32j8x1j1cdpm0smjj031z',
                area: 'tqoxbcjgsox4jl2iy8fziw5a08nev6g74otleiwowsffhn0rr1r46460zl5si89703cggxk12x8fd9c40any4mld6211zc213tdscc53cz3ckrkl0k6jwmip4rcwkyfdw08r6qhs4uyw48d9rwk3mhyt5nddlslalvir50so7d9skdq7w7qhwzm8vpcb0s5lzklr8b8m87zb18imy6ps44zgjkzea1nxl1ulv5dyylgzfgwdlb2aaf07khcucsa',
                
                hasConsentMobile: true,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'owyairf619ocjwex2qqbetbfuqcppjxwuq84rzrq5qxcczr5ma',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'cenxrptqk95aidxgdiu3',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'vntvi7fvyyvqwe0so9r8qdv339c7nvwrrl5956etdt6epdxq350nautds64ngtfwp1eljnfqdiodjwsmy3gc0s5a0apl8morrj1ijagpsw61j9kjvrltzud8h7ullp3ueerii2r4og1t10zjt7vcr7cxex2kd7wjjue9ezu4w6wrt1hv8a4ipkpi0hmy0fkl5hzjubokyhtiy2b6vqn14lovt0ps1v2e1x5xb43abuuv0se3xoo2unqtwicovbm',
                name: 'nuj3mjlbwp1tqlrpuw50j699z3za92egl2lkmg435fk8xe8abutyq60qfgulenmlkgwcug124xyadbv895ezsjd0b5lxkschepxn6r0h3agsyusg6oowiwna86g38fjijgebo6st52vth4a3qcmmr9qphwc21nflui8m7319ooy1c1f3zp7u2mmiijcvgoteg9jdklk7sgdnc7kvh55alve0w5wt25zyaypovsnybr82agb8d5lai13cca71c3w',
                surname: 'jz46pz39vt1zati8szrgd77bu3cz6fy1p91jd53o959asbknxgaa0f953jpo9e9x1h4bqqyet8zl93huct0t52wgxl9xyb515w0j219ieihyio6u6f3ijfissp4t43c4idogiv7kus73h1nuqlzxgpsz58uc98xi4p1q23gnrcawm6v41rdwjb8qgvq0qm75cd0va6yqy9wztr447yqun66hnh9tjk4u7s7dy9qdttfvmviup8ceqvenqpd4bpn',
                email: 'wsiaj14z8g5d03nsivc19bh1z2b7vzrrl5z65chrmm51nhpbx2zlvbbdzek6glzagoekkfwuh4ea3uacizjfkzs0vmx4r53wxdrvlrsykgpe7dvg1e60iy41',
                mobile: 'w4vybqnv7a3ehscpviied2n70ts0rvnuju3v85jumjssx1axhn9aqcm16imw',
                area: 'l49ar1k93r1vexkmstb9wlrpc7sk1te70h4uhxyngh6ngacr0vov4vxgt3228sxac71ctw4gmzimkjnut9eoqh7r0mziezdiqaaph8l81w03azdczfcs6409o9mv8nb2t30j6onrd3cra7me89egvywc18mpho72y5yyy02la45aoej2um6x4u2thp050q05noay1ijubbwu8vsa8xecqt0nixhg17u5jie3gf23vm6svyakmrnqiz2nokf3d7w',
                hasConsentEmail: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'qya9q6x743gp0wiun4tk9w2qv9dvudjfytahs809vm8qvk80pk',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '0ap9sj4q0e06m0dorm7h',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'ehedq4xvsd88ccwzyw68oi2xk1m2rwch7qje5j0t3lb6jey1nupcgdkkhiqvy4pkgoee7g3b4cn1puiqjtdw72a41hvtrh9l86ub9awxb5x4ty2fr5ibbckwl5l7843ac3pgc9ekwdio57ebjdfngf0dkbm72s602qybdkkok3tuawynoccyn5xc0sjjfqybrsjnogpfo4tw5srnrbeqi6e7ruwka7u9mrmdwqs1kdegfhnt3kstvkdrsd9y7xh',
                name: 'ev0o140kq1qsahi5br2yz67rmcenli7vn3x9xaz2imtmzsepe3ytfcpfup9fklbgfiyi6kc39jdl6s73qj72o7jdidvfvf3udy50yrusdxxj75rzzqwlu2fyclqjzoo3o26bpvmlbwmzj005f2vkxsnanj2mwt8xxbten7gny0uerbyxzylo8a4vby7i2h5343cz3k0b8yv8gc29e9jt6ff8g9c8gke9kk3xjjj9vqo14ny8mdfm85t2r267yo7',
                surname: '3ima07jt6cqlac0betf7m70twzfc97lj3l5zq3hzw8ue4376ktnrxybzrula809dhfk0wa2eawpvkzdc2vsjq1vmgw96jvxp8aowrk4lgko5agivpgo18zaedtz4kedh47sh4qliew1wrubqjby71ars8iuekn88dorsldqllmbg20twui736ayyovt2b36e9p43c490c9t0uc54tp5told7i1y6z1pl4ztr5e4x5dzcx4fhu2hzp1n2q06kw0l',
                email: 'fi63h9wplyiki7ol3d95cju39y14nnyvzsgzb1ito847i7xrdhjn2320emicbtg7oa1uotqwwgde1ip8l25cmne8w1s3qiu5opqmua65r1kp3yq5m884c2u0',
                mobile: 'uwbnd58dn3lqf5ysvof3ezxz5h3kt9rr4s13ne0gcytyl9ttoplkhg9ti82v',
                area: 'ng9g3fwoslz5x8qt4f045b3teeztsbly92fxdhgrs7sq5nd25gmm13zk14p36h1t5p63z6y01e1xzfh815cy3gb31nhjaqpsr93u45hihq8dw3q0p3zmpblrmhqlfa3ytrmaap3jm3y4e4xqdxn5gywk2mo51ibwqmvfoyp6ndqo1u418vb63yhr51e2mb7gkdg2sron2apiene80ki2pi6glln0fkm7u7v1bwkrmqcrmct6dz9bhktzovr2mgy',
                hasConsentEmail: false,
                
                isActive: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '17o50wuep72fnnqm6qsg2xws4xhz5klx90yeay5rcw90jyf3uv',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'dg61utbsa1wonpnxaih8',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: '2yqv4bswj90e8ttbtfakqqwoa9p0ccj3c3mz25ll14kw25qez3ne8u6ad788k7j2fhjyv0ktbft95p8j7zyfu072kyj7si6ay5f9eqt2aw3iixg2v58xqcgablomm7knn57y1zgh4tbxsjdas2c8v6ndkfy03zecqrcuervq8d6tda8dvcgg6q2n8a6eouwgbvc8tbnupy1x3fxn3kojz5f5w5yedcvfd9gu69nqqctxck1bakyhfn0bwrucbxv',
                name: 'z1i7ngpu30ue4yba1vzzy2n4i9vi382q3p7w3taveyyos0o1r62cc4n41ppctzxnf3438vc5nyixpiuz5d68knkxrrv1m3zb12hstb7hhxjcbm1b1cq6xo9fv3h7o8wvo01grk84nyab2tby8mb28ldxohmqvigmr3cjwunl26pnphp8y27firecob7a5douimil2073zf0sprl9okedo3knt9dhkb7d2ruqs9h06l7fmlbrsdbgr2fv79f5wci',
                surname: '1z7xws1tk1m9wssf7fn5hwvo8ql5lvvxu1znd7w3u3d7tu10zak3ty94pemy0sabg67ardy69p8vv3nlc4ryp4bcpkj3yv45a1imqgv64y5y0a0kb7yueyf8n3cqbx3astkepb4ysc1z8abywje8rwxx3fyg6w245binmx6f5aemldusstori2rr5o2lxn56pvn2imwzi0vcpge5r7apqbfwy5h1bkjc25hclidacxhz9v9k7d1t3iz3rmzvjmc',
                email: '6hh2lhja3dz7o90rfvz6ycw8cy17tyf7kikieowhxv38bddkw2rq5jtgmxurgdz0txkwew7bnmzijz9ugky2pvy0pt9otqa4o6crtimhpcd68hnfv1dq3v01',
                mobile: 'xovgsn86ge90vekyjg0vngemcbboq4hnagdjuwd4mwjx0kvgw3ymvobvdv3k',
                area: 'fyy1g3jpmi0mqtrixaz5r5l4hzcaoc4foezgz7qqhat8grklis8ufkp95vs9djagh6gde8o4cqs3nw37z85bx65pyko3bg1dj8ueoa2bdufzsu0szozukoiovwxqt7p722n7jcadraxwexv6xirzzi4hwbspglztxu7gyaeta4xrxy721eu6s9ra4tdjl6fe8j6mhypq969crasid9e2ebjh6ufsqa06vdogwnco40fkl3s39pboea418k92ovx',
                hasConsentEmail: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'q1uor99yl5ui53x5nxgvjha1e5383q5hvktavlqqltfy3ji8p3',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'b88zpuzsgy9m4ocr831f',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'tjmqnbv2ysbfl5v10xp4gu225n4he5i09l6rjdb4c6i466p8u6w9aoux73wjgxvgd7a7p3imvl1l7bhyamnxfadg89vnrye1i6akyih3oovkh7d8i6bcc1y7tkvgl8i6atqo08k3nj5zd0ls0v92cft1aqb0zmn33mkcss0zlr32ntl1k53cs5kwbgt020pr2csg7lgarj988di4k8m3nu6rb82pvy7soah16b01811dt0q6rgkwdbf1sqgpruz',
                name: '68q0vm0fe7mudmpgltvfbxf63yffbu2if21cc66jiqubh7i73thc5qfxppnhbx6cbi9pdt8bcqab71o6307uab6fbhjn88h4joopm6od1ylq4drwgcam81shuorx9ptu08hd56oe6fczbu3mqot8u57ztn8okqic9ijmt1y0hde39o5pbxz4xi4py4lfueulupromo0kv2okxpzdyh6venrrr0blb72ux7yxykchoody0ui5k42h972dw8nmezu',
                surname: 'c68rpiawmdvgjbr52g41rmxgp766dz1x5cpd1mh229outg4pei5lyxjfaw64ik24qlc14wtvpuh1q1dfe2k2ob6w95sirclz3nfdzytyiwso485e5uep074o7dst5tm9zcat2bhszywaln9pj6qlzbf0b07j5ozphgg0umdv4gebemr5bxwj3snosoijp1ec9bka070vt71upb2fxodergk0eqx4si3fwnyige49yvgy19mkfv9tqltkg83xndw',
                email: 'e2ke11278khtn5idep6ikn9eot2nmg8z12w1vye7xtaat6clndtbou3x6utcxvxh6hqmtrb3xm4xuban1en998nqs6tztnsw7nj7nztz7yzf34mqizay1aom',
                mobile: '8zuw47bgp450wp4w9bvr0apun3qiwaim0sd6uru1fwawpxw6hbws7anjszii',
                area: '2le08iasa253qpggzsyxo9t7qyc6tvzfm5qqpfcu0oglp171eokkwil4bml54enltl3uircu6bhc0zkzi2iiw79g0qfew20dpxw1wclxrtg9qe7sz8lh34a1gwzo66zv9riuqmurwuxxftdmdm0xx8ciqzhz1d7e3os7og0905i1we2do4baf1nnocoz6jkmhdr7pvcjrb3q32324wbdk0ehypwm7lbrz2gmq3zrhbdp4haxq3zrcxj9nzce37y',
                hasConsentEmail: false,
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
                id: 'wum7h520e18dbu2d4bvbd04u5aqfjz6wwmhsm',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'pay0hzp4uufl4ztfr0c5dc4wecsg76h86k4x88c6lmyyvzvw3m',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'h001wcuaq9f35ej765co',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'i7r6wt4l6crvza5t3jl1w4dwk3fbe8zpd47co7mq1y9g2fhzevi4vazdtx7piaz98t9l84lq5tfdsm4wy2mrpbkr86d38sb7952vmro6cr15hb3dby7wm2adcnoo70xplzyqmo73mtx7ejtmhm40d119l5hvjaedglksem880g8segqrm54io1cflsax8t0gufklsprb8ydjmqdg17kr12o2ajt4g0wbavpkad6by6fuys068kv959jc67u0fsl',
                name: 'tj7ti4fgwpk5h1nqanyv09he7e1fpn9rgzrughl3j37hk8avs3vsqhmgnmw1750sm6y6ln3bi8ve22ofrpxbr96wh3iojtqwb1dk364qe1mqv9kf9iozcctt58ugmgw3bb6uri9h6l0ni58abi546alud3o5bnu399i4gu6cfb0ju039nafz71o5hmxcfh8akqx7y90tmu60bvcqqmvdyh7p3yky3sk76fyf90sue9nyor5nfron2cg98rrfr3z',
                surname: 's41psolhbfreqlc55z0p6adin6vqgwzt3npvq5uuttm5lrq8cjvjcw9tspjy4iriz5xas6j1up7req2luhwrefufewuxvjcbivfc4qzr46gl23ijofkdbmutsalnjy48lbu644vesaly6hcq721l13dh7d6mkaiqtut6gf58qpqc0rt8gvqevlkxle9iddaqmfxr71aloljsgayvd2hy9tbybpsc6rkl8c5vewavdou3aiak38svt5o6kj1r5h4',
                email: '88otoit77ce5tst5tssdijlzp2s86cwwpdmuuc6xr4n2wurvwtdme8uor7aqj3xtb6k4f94u06zfs6s17ik4qm5ccsm5mtsmqlbhqr75ttqfu8q1nb3ky9u0',
                mobile: '26jth3lp26ln6cgjzegk0dn9a831ise5pu1wb9jyz9sllxj0ar3s71y4s4zo',
                area: 'hbs2aq3vbbwfm9l0ue6r15wqnfcjjabzhn6ib2e14wwuit1nvxh69qfiq2rr8rs7navttvsl7dpnrb6r37c7fretfvxoftlo1la77tcmy7b3hydo4t1134gq4vfrfftj8c8gcvcf1bhnsfxxj7uqd8e871v7u1mt4anw3n6hzrav48v94bqc1s7ui1n103cj1vv5elxl7svbvfpy8hikifl96bjxitie5h5pip769e9pbxwjc3zzxg8dn4jk32r',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: 'c3t57tax8njlwrzmb0bwrctoquhnef7s72hox',
                tenantCode: 'lx7s6ll77n4novkfqzpul1ona6o37hvpvi4hua0ickj67sevmx',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'i4knnai0lc1ngu01hozr',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'kl4cwuhoz0urktivi3wde8kgbcjltkcfpseyxne4h23jg3z2a46k0y4ddzyxoldhsrk6r4tj84g5v9d3em6lsght1bjfr71dp8absvx2wv5isqytv665mfdjzrsoj9gtbytjak0bomgsx1d5dnyaye8j0zkp8gh8r8bjo13r8gah5rn199cvz1bk2oiilqmavpqgr8d9ag4jxkq9p096fo0p0kjjgd7z3cixljyh1k08j9ye0n9u6nxel487fdz',
                name: 'wxi7b839e67qggfb04lt5qyklqspz5341zi0q1cf2v1f9vm6q2xsvnlizahyzef08mfn3mn3g8ylig0zwqppx5apm8vvzmd1gk70yma5ywrnutju9o4ku1w7irmsq14urdfxp16uvchw0wrrw8vzgwh4nmalmprxs6ft7czhg4ohuh3gnx65flhu3kxdoq4g0huzgbzt08gvksusqx6he19pl0xo1j08ar54e4suag41d68r4dyrxythhvaoxjj',
                surname: 'l8gad21tsraoxzrnmge77shh8odg7d0y5zdlrchdyw3p0rtyg5389m0dwkix8x93th80vczce0561rty6u54gzayadhsgei8nzfwaocy2rqh7gg6p4l3o5jyetnt1frueuji4l3csng2qgna834w7a19rxykvdiao9lv1gpu3e6nv8303cxf7ozw85192d44em0eno9ialnxfdo9rnfxr153yigok81j74d2yriqszne9bd74qn8qfp9jgu7gdi',
                email: 'c0uj071fbl44nsjqqleww8aftmeb3i6hbnos7w6syroyqe6ylkbdmbnc0u9gqa66lcmft43qk42r4atv8dvm7qey619bvah8k8rnca6kgbkdyev0ge158lx0',
                mobile: 'mx5vh7pdme022edvfqp5wu4hqdnya72d9gai3t8amg6smfxy7tif6n37kibi',
                area: '7tyk2e86ag02rb8ty6ga9kehf6yqheel5xez50x6lnialwbjkh4z74ei13czv55jeonvoslkwl1tijn1v552stkk8vvg1ntghu1nmiy4censm7do3qo47r7vonuzrrk79xj2jkx15gt53bpphg5ne38bukm6svrtfzfuem0xe27749yjanb29c3hkhz49qsqm8i2svqtr8lc5z7xtq1av0zx3x8j7pz67pesd8oxm70hat9tt3eu75nbxwt4g8s',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'x6hun80kn2f7ngb8mir6vmjffv7jxwjggml3dg6mpxu21cas2t',
                systemId: '9bw4mbayxnyfyixc54mey6v8yz0ui8xgzsuja',
                systemName: 'vaxil5jlole2t1x2h0zm',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'b836wfpalmpb0gn1fcasq5df00r1yqo0ux8kca7k1b1g8xp8ncibeydpuyucobaassf746b357w3jt1fo3am6fxbpwz0bfrvga6i314wajbi6rt8tsohncdvoxcemapdnyn2knacohagxgmu253czdb2pqu61ey3dlzmq3803azqs2fshpyrpbl66g6rr6dy1tg92criczykty0aoax3s60qg254sdtfyn1fnc6n0fq1jeicf9zj614zxvg5n82',
                name: 'dsu2kfzxlpchrl5qn2uthtlrfob1puv8v3bri4ye3dxe34q70mr9jppbcv6cu1pv0zxvg9rbzngxsit05rw8l7sagdd006rvcctg28a0bho0e772fajria449zufnvl4icza1j69o60tru1jxb3optg7j31qycttfzam3i66xuo9m4okbjdy7mkwjqbd0e3xzadbaghlw8t1sp6eurury3xwee39o2qptd4d5p19okhj6ott5rzap09u75l5jqs',
                surname: 'gcxocybo8jruc5hidq4ataw28fjed2os87ja4it0gs8mnjx9cpy79y2oneyb0in6n8mdsl6qy31docip2mndknst962821rls79l6sob0uthcbtfuo0edtp17xx4p5ntct0ad5y7zfqs5uyvwib9op8ehomypmnx8aamsd4z34f99cr7bknyhfgjkz5w2ygl2z91mpddmqpobtwp2ammgpd1dtx5nec7z3ujlmtayvo0fu9w7em2rssoxsayzmb',
                email: 'y284rnpmyfgar6ks7ma9bqthj7y4bzpm9iq0gcbtl4mkst55rcvs953yzaiq2y645tyrmbv86viibh1j9e3zn7vhzcccyola3pdzzqlef1tvojk1yzdh8o4c',
                mobile: 'peh8rcwsgu9hljd060uucorgrnthqhnsz2iizdh7369att19fimd58qz2m14',
                area: 'vnkm8w07e1i0xiytrmkmjas9pinjdb9subo36ecp7nb54n9rrmbzd34qv32rgm88t2yx48d2ovzaftcl1ncz4j55off174b7ah36gf37vt1oxxcd8bkjv1msye97tt081cjg8ne4786ium053h163mdgvz9o4lpq3mdqq2kgyqjz927qfzglryipjcud0a7gdrg0ncp324ntr8tk1e8j6jr8zsrb8dph8c98eyx0q6qmbjw26iehufo27vn7swm',
                hasConsentEmail: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'tdpbig3z2ddn84qos6lr4qkcslhjttf2oiurozm3pq30x8hy8y',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '6rryevjfyehxbmm8demn',
                roleId: 'dufc2n2qs51zipwgk4dttltqe6mmozes0pold',
                roleName: 'e98pzpkwm3wbyctnx3anrh240zfyxhviap5hl02cbdwj0u5pvnladccanezc6iauuvmljtquynjn20s58yqhyl02bt3e7rkmz3n5qpyno5rgea1bs6o7zyn1qwaimtwj03y5ez9zjidb1fu9xnmvmf92r3g9heeuc98do5x85chq0ty77bzz86dvcgpwu3ovogdro9u2l7vafiknwpiafripo0qre5fvir99338kphk8n16b909yddcwfhsywgg',
                name: 'xj0j7x3o83be8ldm443vgm6tdowx6xhbittxvz6ilthyl9k6ga7imy9xul0xqq9gfi8koc21hohcqbw4wsuirejulqyb1uvyn9yxovudnvj3eqxad468f8715feb8v5t4l9fhrfp2aym09ev18mca7y4pd8rtqmgei95wrioop3yjsei2n9l08vc3lqcvmf3n7cxyyjp67721wfzu6f37g8wwtrjtej08e74ku9bnvee11jma7o28t7fkhavokn',
                surname: 's2jjxpcg5t5h4m6sf99v8vv09z9292fmjgfm1on1esj4efxh2cy2jz75yqe170dr055mz4zbc1w5ob0duzazim16z6pp9dtuchpwtv1gdlle0hysod1vrypheffr6pxpmnobt4v30754xdt4n97ebiqnzgwfho4r2te4v36dgiixyh5hkof4ufafljwuus3jdova4ygyzjbs893bdert47x8s9j2njnhneqjqt6765peapdtxzgy8zdl0layg4c',
                email: 's1343e188j3jwi8njvgbjy2zyd43lg3w8wp8uee2eu4mo496w3sbzlxh0hwdkv5oecsm2d4nzlj39tvg659osgdqu7vovzsh6vcmj11rs8vgchyhbykny497',
                mobile: 'wn9ys0wlbx7xrk2zkvjcze3rs1kaa12h8it14gw5iy8ybr08cc04kg25vj43',
                area: 'c0j2i206hxvaocsv81mwryenj5o31eygo1eoivlsswy3pk2k86cau0uy2b22oglqugl8g7220fdskq1zosp6qq74zdz4avolfehh9ufqos49gk3rqdht1lkp2grli9hzxfg1cmk2c350lx44a8xjsdmcddy4pp3shpyev4g2ixhu03cs25sll67cokokuyxn6jf5itqtv6jtofo9kbjlwh8bv9wjp3jo3t2u6nddvfuykb079rocgp7d6cq5axt',
                hasConsentEmail: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'teez2cn784u6f4pm2ir22gcp8xv5orfstbmce5644cbr49qzxpy',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'b42ltsdq4b2zkxjz8yzd',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'cbxzn4blp41l0usnhs5vt03t4kmqo9rr17cmhd1obnbrdddo2u1jf3xaftb1uh3f5hjxrslksa41mnkovn534yrnv3xlphph6e6d5epyyf8oocldxmgdgh22f1572axuv6h6mkuiv5yu1mhxdcifs3rib41z6g69lbxtznvy6igaqeh4iwqvveqfdm6x3bzr3twnxv1pph75t5kjwnzcc59dkyrjl386h37q86livge37w3a91dckfjp5aesvo6',
                name: 's7gm0p66au5szxbjwxwyndn1u3zmjb58n8xfgngt2ni81qluajrbmkyt9xvqiezw3ugye9z2npjw2bo5bi0msrctam848t0sk7rouov9smdbt1gp1qgp2za50htc15xrnnfi1yc201wwx83zin99p9hzt9q1q5r6096r55koid8h1pgpqrqa9rbio88qayrolm8d06o2raxojucycyjzkpbdv0n6emh2cetdsjzz5yas8p0rugcrzv2kguvnu0e',
                surname: 'h7bs7etbatroa9n81n0ule3bvwxlteikdp9cbukpnbijelouzd6dgz5tx8x3qg5weehnwoieli2lmmtlhfycjlvqowpb8zw2sim6hxb5wrkzu0rxo38xx6pctmabxxbtl9waclhsgq7vfsomx9bkmwizuo6llva887psrs12wjlecq9ot38mo10f996d25ltchp3rtuyxhgxxq1jaxtqo31r6qi90ttv76iot22fivkn7psxv5r6z78f0njg8h1',
                email: 'zdkd7tarozpfimnvq750xcxclctini60j6shs9p32221h2jv24pwklmu9k2m10cukrnh1voznsho5tq6p601096e22sjnksnl5mhsfbcrthhevs8it3c0lyj',
                mobile: 'uvkurlczwk465026yjoha73bc3o3me4z5w5e8g4vxwp2h6zx1f0c7gl3nuqx',
                area: 'mpkqtnvmiqewxzz51rt752jn591xd19xh7yelqwu7o3s6del6tzig6p5w9q3wlnpx2fbvamgmzmogetyjmkkh34q1fdh5g38sekbycucynkc503aose34gn5meqoc6ndey3vmcd6vuk8xke2s5v8l6uyk947ncvrafiev67aetlniegjak2b9yvekg5mzb4pnleoj1p1uf4aoytsa7d52w59232z772rhkxa2i4up2wz1k553a6w9jietizrd5m',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'qoomzkkwhlwtvoktu0m1496quyrpy9j87xreplf6gperk7qngy',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'r77cs308s9qq3oyfk217e',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'sba4ogdcdc01i41id5cv51u4ie5nc7s6h3l7p08w4forbqk5f4ezts5fa4d3a3ee3dev46xqguwqvf5ege3o07mh81t56xe7p5khobuljpimoi098o3sajrdecrp0uk8pb6we5lssz4oz32jlu6jesulyxqnt1ikjue7azruhu6s029e7lbccgixf3wyyw95g1ydy69crczzqfbqcwemdryepthh174qz86bokjcv62i9epjm5j5tb3ls2rgynr',
                name: 'h7yv3ucjhyn80x4imhxje9bdg0qlj30ruboxl1ernrzrldy3lspn4t02hjhhski9w6sj47mp31nofv92xoacms9rtiwqbh5uczmn9r4hxvet12aqir4sgu3r6u4s96pz9judrhzcg9i5sjmqzurw097ic1xzxr803n2ukntc3f2hjpu8at949hmml6wjzx0n9p43ew67z00qz1lbssha1zena68c80ezi25uf1bzw05cjlbaieqh0pqbn2xatcd',
                surname: 'bwzraqh6rl6mp49mt2ialb78sbwmamucxq7pe45mzoio2kpt99467hkoqf1eued1uku8ho7tvqqhsfqtrnmas18nomi9lq3j5x0tza17wcf0tsp1obk7fipj78cfrvjuc1eu59x92swh21co4pqreh7p8q98g4psdrqlpalukh07y4h3l4jd5cxgej2xyi7z0brzh7bzkxrnemple5hg6kv21bh6cankykhrl968byzw6g8393r6xwq35sh1z6i',
                email: '8roewvc85d4ccub25vw1q7vpo80sllta0ph9680voqfp3nilghnjwp9hyakguzmoyeoa7jdi4w8j8kwnokwgy9tf4eab2n4bgrko8v5vrc1lkq5x87urt1h8',
                mobile: '9xh2dsebzop720n8k3o82igmzas05w78kplema06x7ufiylllms574a2oilr',
                area: 'zelop9vmvxawsgbz738ebesoxp66949hdtckmk7608kmzwcgqd3phg7fwlclpcrqxig01i3tctaileud6n1qh55exhl7nal4r2gml3tlrjc0gnijepayn2ofbx9627to2w7749wow59o5yjgjov9btyktf3nwkflbm9p77c024i5va385ai8f3zp54e1dlfz9o2avilffyfrmunier58p7p40ljhqw094gxo0x1iclyzuly69da2lc97qxjf4o6',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'rwy5i30tcj590vrk93q3bfwe8ar6amxzhslzg40sne2u42101a',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'zeepxbwj3xpfszvgruw7',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'vli9scydgzdw1a4biqef7tio1s3514l2qvmfnhckseaimm8olvhzu0jaxok4yycheh9odj06zi5ujzhz9da1l94to1q1bvp8bxj76hhsztaf5vtpnsl6c6q6ql4pebp0b1bx7aeo73tpbi35jlfz3bbqmqg7sr75dh92bsb0rz312d7m87bcdzpv4oauohvo7mpmx60oi7qgdb3t9ivohl1h53enqd7v2qjmh4s4iowsrhnig2gi1yofn7rc6q4p',
                name: '1zlj46skwa0aeqxi8i21i7i2bn92omzbcrxs1ewszc4uu9zff4bapkwm519lzdhklmjhwjd80x4zb1mz5bd0ecri5lrb86nmy06v9c2x6brbfogcz9oktqimne2owypch3j727plr78m9frn0kyn593n6emjnr1oqh5szl5fggvrzn8aaiglmbba2i4fdrmwprx06xq6tqvj81pxa2j8xh998by9w4ydtj21kwmcnp6oh4czff9q7dckhr8l1ew',
                surname: 'ryv6gpgg9brp60dsxa7kwaiho4cprfgc1oxw95w0e9sr8cw2v4fk4dbah8h7dvfaua790y1tsq9hm2go4xs0yhgxfgbysifeqazfwq6ed10k4lr953tsgu6pyayptcytzlsd75gwmzk0pnnjdqwzmeunehzlys1xss7yhvrp8prv8lh5cb8nmia6icl06rvy15dj0pu8z8rnfzqx7qpgd6jky9132jvszmvtajq6mshy2qghcvfhbp5ewuw0hg0',
                email: 'n2us9d4v6odfzt7eb9r50qfclg4fqj69mhtvwdny85w3mc2cxwelewqkgahbku5dw43uu398hlhu14orqnjfg3ple3zky8w4c480jxrfxjv4g9xykr0qi1pe',
                mobile: 'n7jgy9yrzdtyy5x7kpgy2kedccdcjqi9kmnog12x0xts1k21f7n7cw9jdjiu',
                area: 'b74hlbf2ajfcvsurhm0pjaxfs8s1odectlu6lkuhwt0x912cxpkhacoq1mn3n7ekwredfktdfmdpnl5s7f6981cmwmrh03u4zjq4i9agu3gsifxwumsiikn9mchlpartiy66jf498kqj36ge32wah3jto0hhw8f5cisy1rzawb7e0rcw2xn5cw1cgivbs3cxskph18mck8fvmw94hszubzn3dm08pqb0udmwi51mxgnc1ya6a6hbaycsf7zifkc',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '98xzo53x3qwad6885y92l08nkq8vqymhli7tqcjlgp2ovrt6lt',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '1xic82kl1qsqutzz13z7',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'js4e9a7z8kehlz2bdqbshfaie9hulsshzlquqilqlccr3q6wqpbew2peifrfmaqt9hqhf8348ufidhqqxf25rr0qnw09u8u6zhcx39ittezkfh2rpzyihdioinvs076h57tfno2exde9s8gf3fosj2yytzi6gzzw4i38z95t4gaqh6e5p0g1y3ot2diz4bxpbnumuus5i5s8qr4svyoc4d35pr42frhck5z0rh2z8wtnfqc669lin3g25486rw9',
                name: 'x0s234iv10qyl9qsfp91qjkvda044aw47ebduveokzb5y4dz647szbocm17sx59n6vec7dfyk94o7a1zkqtutq8hge147uyzquqxsi81s4sqqk85e7e7vsc7t26ktr12n1hbpqdbpumydjv4iwvf9yki687xqct4q8pd5adcb9fhpk582zntn9oqcp9pend40bmr0zf05ozoweqw8dfsatzkznunnp7vwzxb7zyn1g6qlwf6q4iwqly35ikdtiiz',
                surname: '2u9583qmx74a3343bqhktqwhmlkr8ldn9myff4amss7tvxprd2pmcunu3xy44x2o20mw7zkr9n6h95yocmjo1d9tgj0oqjcj0jzitpxu8h2kwzsyw0z0tswubhwr7k5vpgrzd3yr769n80keihimyxem2jjieynb2kntzho48r8qbi0v0zuw8jn2uwai04nhbrhgjwl40fup2ebi8vwgbvw1q3pg4nq5y9x1ik96r5skst0vhfortxvj2qs9h0k',
                email: 'bv3gkmomhv57uoqb8fwb0mxx8erk0sdvfsf1it32xv2un2sioqeksg9huamwy4swwyh8ytkei6shds2nyaqd6jidl8xwo00x22e5kh9lr2zw7ih7ze7y5g5v',
                mobile: 'wt9wz2q8l115ax1g27vh3mt6wu8lh8ferr3mhjq4i0tdd5hak8bzen7xt5ic',
                area: 'l2ukixsoojx8vstp56npiuhlthvg6nnye3asyp2013s558q7vatk0wfen1xmmmyyap934s9wudykkj6vr0yxg22fk7lzk1ppqrqtat8quhx1c3o7lj5i5n7emcb76zf2cd50z1t0qv0xhw5zhsodqpgn2sztj0xn7h4f4n0d5smsynmj8n7lij4a2m8g5zk8651o9m935w04tcyzs7uvnp9vi9yfusw7ise3mwq7q59m3jzaq1xywqgha38hsrv',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'jbz9ho8uemmsk9bn0vx4qbzblta23md91n3zivbwlckt8fnefo',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'i460mmfa63s24v0z0vq0',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: '8iom0u9kb3sft5z8h2gtbwmrd50gybev7ngxtp3n0v2xaaxlac5clbjuvpusog49jndw69o6v3er65cgbo65i3pybgdvdij56dbq9743ri5h3ph6ssh87830l8n8xn0obl2xsyprdhigzfikjketmoc8fhl6bod1trantufp6ra6bosayzicp2s53iw6l45sekocle7z6g2xqjjf0pfdf7yy1wjli9l5fdpciphapjj8gncvrmv7n5lcjj0vhum',
                name: 'a52t6qi67eu8w315ik0w26stljs339nkcjujo3d0ds2sn3tlxo2sv2wujr7nu7pbyywv47psslbqxxpxnr34ksvud7eg6dsx40clkt1mppylrfx940az36zlao9yt2sxvblcvb79vuzuc8780aityzr29loenembmq7nxk1ohwefp435ri8ivb2m7v6cu8jaxx0wizhz5b0s092o5a079glbhm0lveuhfbrg367e4wgq30p7cngfdkgv8on5qum',
                surname: '3vs8cktww5wy3zhgafdkppgqlbdpsgc7iss6bmhfkz8a7tj9cx0wkpr20130awt2rt2502d6t93znhcdwih1upnuwfabx2paje40e9c26pekhadwecxzs8cptfir61acwjpnvs9bczclsx87af19oe27n740ssq6oc52qlogdvzva6iw8m6bfab8okylewc762wn8feyyve9wcnigwm1chxdzes1hybko4qf5eig3turllv1ewk95cg0uq9utat9',
                email: 'bwrgn4lumf6rwek6de9ygah14tjirxgrkaev26fjoohynqrt67i5uls5i489260snpt9dand41vunscu6b54wva3wblgijcezxwgag5o9t49zsd5ee0g1l5w',
                mobile: 'ri4quyllttj1pibve6qnh2vd3lnpho8nps1idrc6il94fituzrsjz91071yu',
                area: 'fmsymmpdebro12emdu98yj5iwigjd9l9z2wubsq9trpb41qspvpf2nce0y722nuiiw8wbojkw82jzko1f8cc9q6bsj1bwwwujjw5l0lolvvcp7o09kofpokpgqdhe91p7oqp1t801oom3ajimwip0vbarkm5irjn2ggg6gzyp3x1t3gwqkblw2wy375gqbgj5d993veje9nsv62xt2b04dkq19mvlnbuklchplsuby3rrvebkrsqyc527hhaox9',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'jiu1ku7ubiignbhc99y6qh62tcq7bzcj4z2j4sv8cfh1pe43zs',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '2wg362stajafre64tibj',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: '9ydbr6okcgznhkel0ffcvyf1jsj1oy38wffq5gdxk8o0f4vhcfvdafbj7pppcm9xxp3sj1wv40hd63ye5997spcnep3yfpcahabvozqm41a6k6h1osksc6hjy0oumjjlfwd6io4beiplltfl4tzxko5bwxytgca8o3tlbjq8jp2qokcbcx6qs6vt07bej2thgh4gmlyynpp8s783vnpxahs0iu7lfhlanlzf37dwbvw70nrkqv0xrdhts7sd7qq',
                name: 'fuqg0rx3i8cngfp4t1jw4i97j5mptxuntvofddlxivt2tlxrqmrlyyyolzey3gbrtho7e9jnzd4fhsobp4ql7t8a76fwbosmj20ndo0bz9mpwsw24g15b5buuudeh46gposbu8v87osdccmcfbjybhi00sgenoi82e6v4yxsd25i9332xubrve0ysfdv1j8qrg2x9cmhqhzrd3sfci0a0s5vmx5p7y7tsnalivkc0e0hw6xrzcl0e8cewpg1qk9',
                surname: 'rflboyhg7y4723fx0p7iebh8n4336li65h0qyrmipez4f0pgqmfrpjp68cl80d3lcxqbi8o1k1khlu2zfeapj3r30yutjuxhen9gaegzsef8ox3c8kgv047p6cm5b430uwven7utpxws8cstidrhck8qfadadkeyo19bmg3wjndz7em0hzcdi2vucsvqd7hmjhpmb179xl24gwov2s1lc7bzjdmgwb0cp3vw43jc48d4opzv0b7fniowte8zqgc',
                email: 'yf0lmcsqt5q61usp531uzaclipuf5l2m1xnqs7d8bsjg6r7hdj2std9l5if1nedpzh5ubwgauxepqvux0mfhruigz40yrdu2o920k526yzccnnq8peeugei7v',
                mobile: 'y8jfka735rfxrgn6qxkldmary6mrqdsiknoct2d1ba2c403j6pld3c11b0xx',
                area: 'iptoujdizqtm5591ugut29n17k4fcixqheohdg54so1jk50zzasheh14dckknrj3kahuqwwq93gkrsgyut03e621qfy2zgapva0winmi0e427odcwlp8s71n9iyjhmqm1yb6c0p9z4s6hgcm2lprt44c9r22d28decizijw0rcx5sxwlwljshydqunmc2zgkkzcxi4lu8ci8m00l2oeagc2va2ajd5jyrw4v1unc8yruhyku0nb6tqpk04fnvrv',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '0tccaxnowbm9kthx6u69u6r09d3d81xtnk0hd5m52kl577dc51',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'rutvgalmsf3j5w8axl94',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'z0q337r3279qcz75nbw46aujcjglkfxvgtioxzuwe6i2aqvs66086ayjp1wjsbkd44gkhj09n1q66e8tph7gk8tn4kkigerdn45c77jgap7pv7r5tzjd6d7aa4fh2osth02ntmsvddzwxgbmxdtxm14swiy7akcxgxitokrnfhplw8si4fumxhv9r8s36idc11ne9mb3sesmvqpc6bogpmh5ac0q058k5nwratuh0s2c7m8rzkw1gztbu4dyvp0',
                name: 'bmmur9j7zi10jotdsbmttoslu7wq5rw84asdxbydahj4kijtjbeiu46ke3h50omrhjvo9m9wwlese9s4jtrzk9advyvoe2tm38aebppx7mbmjf91qifkk6roofzsjpr122o732s261dtnij524e3imd9zb96a3sglycqi8qw8otekyv4ua9d903xf18ig8f87g7dictfq4njocavk3roufxjq03i0musta0m3py58uzrolirbq1jatov5l73s65',
                surname: 'zjxxkfqe3pz6t63vq16hcisx217k3y4ca624oxvzywfi9idmuiy698nv8dlza7ois9velwcx3eyxeo65m95riwssjffie3axakaaqto564h0og32uzusve4g0yyjnorz2clghgzwi96ieg50r3a356zxtgww8kw2vddxs4g5njlvd9x6o6bns7kv0w5a8jhw5cd15ebaha15emam8o4jgj890xu4a42xkqgeuenee06izbp9d5mlpp63e6ita1d',
                email: 'pxtxxtjg1dl0qe3gw6n53kr4yq8nx32owbzcg91duettzhygcbu90g5f7x5ob169y2yngywo6kj77gfcdd7y9m9216ovvha1f9g7e90v77pzsw7eaznf8zgm',
                mobile: 'kc949q951r4dbfi701cxtxuzd2y62b171b0pkexm3xpg61asv5jo6htsdlvx1',
                area: 'gjnb33i3kr2yv6rn7rsirvdnc24papo5u06anv1dzzggz4f5yo0s7ybu05912f8bu7m4lnt0z82eo64ulvisg8n2ker3b6pi79dhtuo5oide9tqudpl3nyhdeart3wkto98hg5imld51ep419dnnuug3owolq6dan5o0lomb30w265kspk646cdk94rlwujp08x7g7t8f8xk767wuqaksi0i7z6qad2jhhdymkjxnhmj5cinjtzf9epccu0uzh1',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: '0foazarkg0zsv918ls29tzqmbr03x6qlpg03zdwjcg1ke7dtmt',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'hfkqxicff19kdfu0o2p5',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: '2iinuwl4jp4ofo4oxvfb0mic53i3ufoix4wj31doljoy53l33hbsilmue4b2feoi166d5ucdriwcqbjtuir1ibzoog4al9ko0hdy58q6ogeyg7xk7wgg6w0fa1vx1kox6fvrdjwngobz3d89np84w6emarh77xpnbs1mdwnuq4l1f1amv7xokb1r395giil6o6kuc1uo1h07pn9ogxdcvn4rn4ipook04sfrxxxxwrvrfw5hzywjp7gkak4idri',
                name: 'cn5tcj1kw0fsemqhdhormgb6syva8bcuwm5a8kle1dlgumm4x11609owvkiizphez4th7negsk2jcrdy1sevna4x80qsxepay60lkb9z2x9pavq1endllkuw7jl4lq7tp3kuzyk93k895xiknkh9uh8nvrh0j4hi91o9x5qtobtswjbpx6aqv8ns24wvlwyj2jz1t07zz9ep9gsxivizlsx4vcod0skzrci9wicltc8nkxw5nor4x2yneiz1hju',
                surname: 'ki9tcm9hzblwcltr7lw6g3ml9vnh3ozn3wbgl4aftn12spyzwnihoqpans4d3gdxyiwmia2s70d4od6p9i0vywkx7xi38qq8g9r7jcqfxrjvr4ba4798e3o84qvhkynoyy3s7metch3wokmigu9h6lozzr2nrl1xuytx36hecnmbcozs024f8x5v4sjank6omst44xuh7y1rbt24fkk6e8b8x26y86gtf85c4p4cyt6tp3nsxc3xj6wqghrisoe',
                email: 'istedolo4jg6nybnte7ocuwpmab3h05zouzbg4lqnfpo5f8a30tbp9csdk5xa1elmvf0eieecc1jicpv3xpe0ofibyu0jbmc9mcnxes2khdbaorxl7lb9rvi',
                mobile: '3b59gvpw4z5yz9qdoq80v1jxklmiwxrt4ol8hm0vdp7quhc0wlbs3ud0bx8n',
                area: 'pajimk1fk8pkmu65cukn01bbjm1e3ohjeo48vypm680q3sz4i92rphszv0d7e46bhz3aa608q6rv0a0o4nb39bsz14wurbzme1g1nik2afjq04fukhf31cms7ph48v4trwkkngfwx3e5xt9xxgxkzutnnhtc4f6qk9ns5v7zy3jh7byt6udhpj8vncdafqhm5481yutwtee0nai5v7vqu2dyp91vixo0uv7aiv5zfz2zd7m31fespss2bg4vnd5q',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'ff57d6o2i9j8mp8rgkw8406119yc50rsfui9eundzed226gp3e',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'bxik02x09a2vrmhsnav4',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: '2tw1fpct6315wb6ote5kvxdq7674vt6i134f4rrkne1vff7vhjz8wbx7jhstrywa5imumh5nvnx5wh4rs96kqgk2mqh63pzm3mvzjlut9bezc5n54rx8ajxz7wz9jfgb66zjxhvgbktyrxfhz0fqirl6vg8uxrrqln5dwbad99jq4cf50pvgp13xjinq90xchj5y4fewoi9ca3sbtimr58798ocn233zceg1e5phwowmsg3a06ncsa5ee6fxvzb',
                name: 'etho9mh56stwu932d1z3oanw3xufusdpe8pn49kzixp4gs8x8diggxpg1do2pyo9xykxmezzonf9kmjvs0mjf1fw29oo4mzwg6xoz4ayuf35gr11a8zeyp0qoopux9a2u4x5r86a5dowr1835wfe5bwx59kylzcxg8yyo7zlg3cbi0gbyb1lge4bzq45ybg53f9ft52nl0zqchi9ukczchxej1pe88hpez3x2woadvte5qj4lhmeod5r6dqwh63',
                surname: 'a1ruy0aep50fu1dpbanfeirbkck2wj8kwkt79sygjkh5skeqzdvjb07dc38bvudhjj27y1rnnleoro1gwhb3f6bhwr9t0h39ihclb65qbqqb8e2h1et7l0d4ehd78a0b4l68nc9jdchnaevh1uby2sv8vktss1bxd81daccfuaqijzqy8rk6bq95revr6pwyltqjn5p0q03rm6z97k0pah8uragfmcc2kybrtxim31tdh7ei1br05kinwupdjan',
                email: '600roic9w3ec7ww85ezcwg7ol20nsy183qf1i04zyg2mdtllqfe77dlj9j9hg11hzqgu7lp4scl72z1s6vk48xdp4h9un4r9u1gwmmgjxb54sspl49djdptr',
                mobile: 'ckvrxzksmayv75a7d5f9gku4u4uxob7ot8btek52j6np4pbggbjj4p4rn4o3',
                area: 'pqr14hkb6z9l54welx5nxenxquj0y25qrt3p20zfdcvmbkj372jn757ipucezq8r502q9qlwffpupqozbzfxetmr297tetw2625o9k0uha50pzfv43wxe7ya8kf17gz6xulhlorwh35rteopoulbnpbt5i05r5iaiz9327wq376prkcy3kun3eqjtarhorobuz78aqkj9rt7ha4uprhb01dlmqtsjypso8my2w3yyuxpk2a36fibcyqznkri58z',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'dioyiu7sktyimbn56v46uzxz43nxecxjjmfxj9ml10odmnbwk7',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'y7fe2pc5x4rsdugel1ed',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'qlfogq8r918awj9nkvzmd3lbrl5i9njekmrk79a0nektsp9ppkl92hd13oxyhtjihghzfclsae4vksdfhxuucu3w0h732u2sv2vmq1pkx5pjr609w3myzcz8lf1a3zhx7zkp87x4a26zwpohmiita52lhrscgocf6aqrxp19mz911g0dbdx6a2whwz6k4pr70grz6u0btdlz3cmza1bctpsr6m0a90rpseeyrxh1bjw0dobggzy97peghe4r1g4',
                name: 'we1ddp9r2k3uxyri5uzwx6ex74xddjaubgx6i0oeogn9ua1kcg2intk848hlasdvsnkaciaoamcwosol982xjm20w6abiw1fevv9xz9bui9gu0msnlpa9mlu34nhxdxxqxnywyej6dhs0j3aeis13drr3ofgxuyh0p0xurgieclebqmbpjb0cpvs6lzjjo4f79d6u08lbqby8tkb894o7ajvn9p3wp9049n49r5mh7g2darti6gls9dnv4gxq9z',
                surname: 'icjry0ac7u8tmlczadhvokvzh1ssly5d5hcul3p1qn42in4ix3148w6knif6cya3uskpqco00qo0x0f600k19ujxbqnx51a5soebh51pnt832prsfl8kwoiizf4bs52fzkprvfhzzt28am6zk66gml8d4vk72s8xcvg0iinhcvtu6836ddvauceoa200qnlv0aelfjhxfd86gv0ea9gshl7sce5kjnyxj0hw3e857p5i2nez656qj40ww5v6uep',
                email: 'rcw9oo77wgnmy6tuc44cpp3v6howgpdyr26z1jni7wrbrwnmtzchrhaun6es54xwzef00ni5elsk5lhpaw5kwb0r4iitwc585ym6hwzhg3d96v0f8p9zua24',
                mobile: '6ca5g3ckjy49y2ws9ea0kk3q37041haqpxf6jzpn0000v5yhv77kgciao3oc',
                area: 'xkazex4e5mu4hj42vakleipgofofdsr6om0v0iqu6zze36mte8t7i4to7ivzymktzvu1abnzo4ti8wccydpmynr3cpd13z0fctw469vbotc0suhd582hnejj45gq5o8hmou9bd0omef3ayc0vi9a1n8gj7ae3z01fwwbeflmhkrmf8rp65grj8bphwuwvg59xa5kytewnd8vwgpu5lmyrzfbxhoheneh5yqf9u4d02htfvhb65h9ih3ndkdlwu3',
                hasConsentEmail: true,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'ifuvv0jefo5rphg9v1x1c4qpcfknnoghvfwbeg6tmld45aevlc',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'amt1qvtbnvgjmmn9r3yc',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'mvkx1yyvntqejv62uspzfv33gvjubn40u3ct34p6r27feoqwzaw2lpmwu2200q3bunrql0xwkiwatkbggdlvhc6mz5p7p9z6mibvzosoya9ug9c331mbbrunftr6qrqk8n7yc3epa69c2hcvn3y1lsc9ebp7gh82otboga5cmo3edpsr9jcs8i6cw0vdzab3ybrkm0gydtbj0zeem3u13tqhat0mkqh4lvyrobo4prva5v35su94fcisj6en1m5',
                name: 'j7vvjcazat5fzwec1u35cxkxigbtuj65rehepv19hu7ajzd7aqubcesi8qgxplga9tc0r7ewsqwh8p9c0guu8ghtjg593prj3267qhxlh9jbmg5figrk5q1c6r3hvyfwoanm4nahs4nlzu43vrf8213fbphx8yrc42lu3vb7xrl5m1sc6sbqx0n33zznks2f20z3xf9s23fegid2a24y3gwy3r5r665ss810pr7t73jutyf9u6ovp5a9oc7xe41',
                surname: 'l0cpu3olxlb6zzkhruzkimvl4s29ypt8up66pftu9w7mbqjiak8r9d1oey93f0ue8cs1ewy51mffa7la7wex0jrf4kfx2sminq1blwlu2rjs6xgfuxc7y1i3bbv3qfqesapw5ahz7ipk12kzcjlzdd1bjxkikslpusij5flrwlliv6948qowlsrywoih39qyjgleg6d3sxxx193k87sanx92l3k98bfilbqe0hrwlkfu364htvcg5ghqsawm4md',
                email: 'mtk2hc5rya3155itdylvk035nng2jzvxw4qlgbl9bxbri5xi6d1fhs3pjw4k4gs9xemct3rzu92vp0kb37v7poxxe6nt1840lcoa0qdhygz63jja1dkncky1',
                mobile: 'wvz2j5gac9o2vtitr98tk4rpdvcelp4eo34se6chqhrizhbpb6jzrdkw5g3c',
                area: '6g45vkjevgfktw1fx91258za0kjym6mdee9y8g7ru2fhfyn2iw18ssqiyyt65o2ok4w5uidlutl8yg73igh16kpair2h10gtwk24iffcm3ldhw0aunj8zz50i6dvrzj0wa9km7j5l8buy0090hx13trvoedu6hz36lexhu1obbaap77735jj5jii0c6dvr2qor9t7k1rdy03gmfr3ygl4yd6dql11k6ao9fs8cbgym8a3umumoj5e7w5rc0sps9',
                hasConsentEmail: false,
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
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'a1zi5oyds5g68hyl9ljzhs881y0s0ovxt8upnzu13tfnieemz4',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: 'xqq9b024b83d24gfykic',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'b3997t22luik0rbs0t8qv9jjyvgd4j9kliw6qpdfav0yqvu0tqqms4809vcu1rjd3219isx8b6nxilyl6yf7zy77tvzpuqgqd3des23nex0uc0qok1e3cqaewb01oh5dr4ugvc34ck68yts054ga6dv2pls3wxnz5i7r0pcsruq96e8yj6166ltk5o43rsnfj0k5zfwhhnzxgcpoonkvo3cxnpvtfbcokgl70ylsnk4u4wbxraygitxza5ud07q',
                name: 'x5ce8ioms2dsql5rh2ipllucn3s18khp629l9cd6z2jmikvkssktn60b042vwgy0uiub6g1r3g3u44kes9s1n07lj038twjn99idw46h5y6bmcrjmhbhkj9jckxls94ng4gfw0iggg18s9e1qozcphre9c3alz66eije1xvzve00hw0rnw5uymnd9e5fgmmj4011vlze1houdno2jna5nj4rp0mz1sjwgy62apgn65azdf2ty0jemre28npfk3v',
                surname: 'mgl75kqupv6mrd34yi4srs9qa30gglk1t8v5ma1nkf4lxpv1jtqgotl799cgl548au92stfx75b30u2fctz3ju41por9ti4qehq1cg5tsk33gzkkcklpxt62d8hze6fbwbj82d44h0z5i53a5spmwjqkkya39p2sfq7ftv6qttom78ks9alckxajq79cfqyzszj3r0jxw6h0xdfanfr9pimfis2iv6mlbxa72er41mnl03uwqw2gu9eslwpwihw',
                email: 'es0gpvnjda0lr93dc4so1pr26iloyqtxtcmmvq0gr7ogc09s7wpqkeag6lk8l83o4btxnsyssikizimetujdti2bj9osus3ds6muzt9nc6iv6jyd23evaaqw',
                mobile: 'qwmvslcpc0uwll3anq7gbx98zlhhw31v3jl77uspifips1qm3y3a0sy304xz',
                area: 'i0t91m1oo70nvdhfpveq4zdoa9jdhlqeigobw5hqvep89ru4xp1pkf0ajfk5u63kar8hduyzdalb397s03pufqvt6jjvexlowljhxzjbm236lqbxf9wj106uy6h5dpkz630i9apfmtbogj67a96pm0lwsxbgsqxv8q23b6voudn2orkzhucmrx2sh3kjvfj1lowkws144a6x4lq26v06g6vqy0qs58cp4awsfd1ulb74k1iakstkt7wgk7ib1r2',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
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
                        value   : '6102cd62-f5ae-40db-8796-60d4c2bd4af0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6102cd62-f5ae-40db-8796-60d4c2bd4af0'));
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
            .get('/bplus-it-sappi/contact/6102cd62-f5ae-40db-8796-60d4c2bd4af0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6102cd62-f5ae-40db-8796-60d4c2bd4af0'));
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
                
                id: '1f0bc366-e0d2-415f-b5e1-78e9e3121bbc',
                tenantId: '70532107-2f3b-4150-9c4e-b0d1cc71689c',
                tenantCode: 'w5ui0r21b1thtun1v8bq0ila79uw2giblwc90y77v96kbjj4pz',
                systemId: '28604ccd-e0da-4339-a9a4-19ae9505c324',
                systemName: 'mm49h0kn4wsnw5eyn3a9',
                roleId: '61ef76ce-4605-4f3d-8390-48bc9ce42288',
                roleName: '76tj3ivl9lyujdmetht4nedhq8etzueki8nl3a658mhjmp5et8ux3c61ftw0s3yj0wnjxafpyf823eq4t02pzuj4tahaclffbgjwjenhd1hjs8d8n0or1dcf5yu8knqgkm3ti857ng137js7lwv1djfruwg8oavhwi6pqb8vfau7qiw9hcshk7527p93f69ycv1cuy6limzp0j4lqb3wbbd1oex4y14pqqptlvzucunclyz52ec350cieb3ac7c',
                name: 'fnm65ymmsu5z78c396rvdtw4emw7dxgb19afz8zmqwfyjoe2ejupfhzg0l4ufmzsav9y186lnvhqj4gnu4x9yd6rwdf02bo4omw3oih05w9oh30rsilxl47y1wry8ei14lqrtr0sts0m9mokuedipbgl4mc9zzmolt2v7h6hhp9j801wby3ahihu0fgtu5kmg9ke705tk44c7fqwor6pfqqneon1inftg985rfdn9dxw0kgwp8yc6x4hc587zs9',
                surname: 'omptv8f6rcwtt96ziz8pel0v0i25sza7yf5z13a6szknuaxcgmzkyqm24gu5zpuczx4owwx7stf3go7hq70h6o85tba6b8339txb2aakzjiutgijv9x3mtdmw5j1ppy1jxm04rha2ehica4se338zt86mqa1r5e9pmb9zdtwf0hqoovuj3j66hzp40vfqumcabxzny66zcfv0g7pwj8kadqq0purnwih8t5811uikqlf07ho4px0cgye1mdfyep',
                email: 'haxfifdem8bclfrttb5xlnsktrcgly799cnn7rqzjndtm6feod1uvvjirdkh54czfvpkayfiakuoz09zh7yz962dpr8ssjh6l1gtqn8avso6w9f673ln19nz',
                mobile: 'sas79vf2tzk8gcibda027w1mszn9a3zmnl5g3nmyak9ypr2gxydrja7axtyy',
                area: 'mxyjt3tkmq87020gvo8pe1kk9qptlg0h8md18pcc5z5k135u9vjemsd8142y713rgedh8gln0cyekew3sbs93ng5nq2rgelb0toypjp3au29meykmeus6i1qus6ouboyqjpks0gd6q4xisvvr5yioeob4k20mgpo3pfpwggosd77zcuz2dapao4rg4g9u4nps6yedxsbiuleauwpc9tzi321uevzrifvzvnpg38wqbev67hu72ibxx1v6p84usm',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                
                id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                tenantCode: 'lrc4bg3zqc14yg73md07bhy5b5xi9iwjtrenl2uj2mdkfno7b1',
                systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                systemName: '5efzhv7gfzr633hg6b7h',
                roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                roleName: 'wuramcvtzmqqqsv9qz7gijql2b70iiou0xcyu5deuec2xoq6l72asqwy2igui2et3pg6j9x6ffjyzz2nf1qyvzfnyjwvknr9o4k0nz9j1fvs4zr2outkmnlv7queckmf71w9pr82j0vuf3v84jf19rrmnhqg6mwng3wklyuttk6w77gog78kxjd3pxkxcagnze87ka7t39jakcjd9gwub5aq4y4ahggb3kssbcmp1voggypzuyv5m8zbxh3yw43',
                name: 'rddkodohnm9fxwu35kea8hbl6q46wslrva87j8u55vtlrq9ihvymb06nzb7zkezljiodtdwhv0fiesd8fxk73iamdal5jarjt61qfooqf7yu1z93psci25534gc5syfjeahm4npsyq3busnksw5yvkymmk79b6ajlvt7fhoaowujmqmmj2ria83xmr18qdplct7ad9a7av3a9fje6uz9ljvk3gj908ii9jtpy2x6zdyrj7hwn6jt5b41md5rbkq',
                surname: 'hkiuqsncy0qaaqvxwpialuxuo8il93vvyr9r0q5lp34d67jg2reuxiqss9ly48fiz4bp1ivh92ynufw86gr9w1j5cijvz5279yfjz3u2vcynoeg2orieha01xx64xqm657yrqeekh9f95xwpiuw4eoijhhwo9k1z785b4i20r7asr08yktmmvhb15mv92rd8tk76oizu77gtpauq6bm9gnq1j9zfxq42ln3dc3oro7urnzec6gpo1quao3qkbwc',
                email: 'fyxwe75najts2a92v4zt5bo5hfhc3u9ge1cq15vzwn95ih8jhjneb38zwb1f7ynwr8br8z4j3pqtxeffngcjjtudrag6cbsi59orfpyz1cctnqs1tembe3qc',
                mobile: '8hezgepfooq3g2aw5aymtz1sctd5uxaq80rwxp5davh04re1jedx41nvpsap',
                area: 'kk5b2k2ej3fmkxjziq78vp6hsrg1c8zr3xf6b09zdg8z79qfr5gbb8an835dv6xcr8bksrjgxhtvxk5d43sktidc80na7b6sgdxxvxtj85bvqq07iigoulepi6o52eo9nofzpj18x2keuhi2j3tb9ar6cpu6g88eww4j0s9f0q6mdl7rzok860w64e067y41ak76gwwkznpfd5t02o2emxvbvj7b17vfu1vmz0g28k9c7qzmehuquldpiyndyom',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6102cd62-f5ae-40db-8796-60d4c2bd4af0'));
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
            .delete('/bplus-it-sappi/contact/6102cd62-f5ae-40db-8796-60d4c2bd4af0')
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
                        id: '687ec1fc-f2a8-4341-a421-ee258c3ae442',
                        tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                        tenantCode: 'spzch3pw9hof54c61rmgfk3ueqwpagufwbowlr5nzsxvuagf97',
                        systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                        systemName: 'o9f776zrwdbs1xvdjyc7',
                        roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                        roleName: 'ql6s6tfa7ek218k4n3apx80w9l4bxu9frcsdxn9hhegiblswmg1e15v9j4ew186ke5sm4gexsfhjbmu7l9266igoudkxbowk3yvgubbiyy3hxpsl0p7icy7ftzdqxrl4rw8793ebs83raxgi20fzt10qem27hymt3sdvj7fsa3lmlojobpuufawsxq9jjvb0kdaizby3qna8big3ijtbfjkegbkssgm95yfcutrz13qqeshh0q3suy64h7grj77',
                        name: '1of8hkmpailcw59jf0lzxpnsp2k31qishq9bd4ndrkvy4socaiqktnnlu2s62ff2bgnwfmh1njuh5coja13330de3v8jjifrihztuef9akwylwwx16asouaubs59ph6thtl38eo8f9a588ib0szpt1q265oic5g6mlonv5t5dpel7k106caoa441fmnt9hihvcxocui9f2ivgj2dc3wgfupadxp7f9dgn6d9x70qz3lipn950clece6tqucidu3',
                        surname: '9t3p5a6ifk67rxnibpcamnd3kamb3l90soqb97fpgxlk0tk99vdy1r3y68qonjsi5wi1qomqb40wv46ru3bj3k0u56ldzbd3gyh6d1ewk6sw9f6v0ih7plekgeozjmsrwvknvekac9ue408xb84x2ylabveotakgbhn442gbtkuxpnbbb87lhw8zoreojvm46k3f0cgociymyofstq5uiiiy0tuag7gs73dte0ofksggppchrcbunslqgrdnw4p',
                        email: 'wbg1iedghtsmfr9kknrs6pau2iemijblgrg4bvgo1r2hakrde8yn4jow7sbc6hvlw6g2706wax8bod5gztipydh3m6ud46amtnaqze7tgobf8dkcmry2ozoq',
                        mobile: 'mpqxzylb5hyc74ifpj798ci6q3ia7lcyt0tk9yn9b3cznz1us2dgd7toos7b',
                        area: 'nh5epp0ubo7e4zaw3yaxxu0zai6vts8cgurxuqfs81m999sg8ssw1j38vvj29irk3tzc1dcsnmouapjmswl3slsq7bb6wrdqiox2tptivpl9li26mlm5d513k8tao76f1usr7plpcuxet5nldtd3g28lpw6rss7xct2h7x8m1iepu0p9kuu1o7wej8vtenot1yt5p8twu8g29mvwkdihxqe655qmlhnmq82zvvgcvtc5rd261cptpjohqgjai9f',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '687ec1fc-f2a8-4341-a421-ee258c3ae442');
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
                            value   : '6102cd62-f5ae-40db-8796-60d4c2bd4af0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('6102cd62-f5ae-40db-8796-60d4c2bd4af0');
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
                    id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('6102cd62-f5ae-40db-8796-60d4c2bd4af0');
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
                        
                        id: 'b83e0e40-41dd-4dee-8031-01cb34cb9e5a',
                        tenantId: '550fc69a-b198-4923-9a56-2d87a04d1ef9',
                        tenantCode: 'ltnrfex2n47swm98438lupkwk7z4yl5gvoopac4a97qwwxtr1h',
                        systemId: '2e5553aa-563d-4c0a-a365-88bd1190fd83',
                        systemName: 'j5y0591w2ddpewpsadmb',
                        roleId: '863433c6-12f6-4d7c-8531-9253d1f2c76e',
                        roleName: 'ldwn0c2ketilspwha69yszaujvjym0ukydmbruprcigdwsp2bwcha4rzuo3b8il236d4i9wm0pfjetx2sth07tkgbsld5mwfw7blauqsfcqrmefmgxq1arqfui3lc8suwrnm6q71guk6odhm5frlrqxsl56p7lnnsreej6kdwjxaknq1y4bnj9jc1ot0gcfs5fi4f7uislfxfjtyl7t7q04ixhcvm5gesj2k5dg7acbjp0zdc5450y02qrkkzlc',
                        name: '039ak2eek7ja3u9qmfir7r38cojscwblmgky5nw0xvowbb4worbqais9rnp1ddccmgiwi9pp4zgd9ccnct4o9xnovykkpw232h7fks5suhdxkoyv8dvvnrphjywgdzf970p5ydknazf5cyhfvjylchgjmwxub14vos3l4wcgux4tk9n50zann0q0iso96bj4six822s6w0wsw468aulhmj1e3kh742vkeyjlq069rscc7nzrfbf3wvken7w1tf5',
                        surname: 'ty7ic68c7yet985u0gxiq4bk1m35z50jmuf7rfbq7jh4tyupnii56vte4lo9baqotenge9fdyfbggqzemrw43q3yrzsgp5f0hzz31dqoicxz5pnabw69bvqqhu7lfnvjhv57qnzuax06kvvfwak6167f6viqzqxgqb13n5sy40ms4m4q9pt1hzqmu69eqc1yjtbkwr45733i8gxfkzbzxo33qlcuav0x73c4j8y824zygyhasu0ko0l6vmddt5b',
                        email: 'qw1073r14f0r3mwv6a3e2w9lwc4ve8ngu3nxdzvy4gioc3pv04lgiqq6esiyxpfiglh7c2ceonjw7jrk3hkm35xkk1zwj388p48x1qsojgd7cn8t3uw4rk9k',
                        mobile: 'bcrf4aamrd1hma4qbikx9uzb9g1y83ncayi2jf9irbj8pmtzfd7rwdu81ssg',
                        area: 'zxe5bihavoy1a1531sxn3c963nkq2p1aund45x1jw9ancoocyf5yaygyg6w5uyrdlh6h1qpw9kfvdinmc190uc3j184rar1rvuuttpe9bgivrx3lxco8tt9a8xzc5i3hi4byvx6zwp1nu0z8ta7o89omwv509lginqgir8lzvq0xwjdeoda86n2e4w75btsv6lzwmh4ikwi2392f6syxkz045k2sn73qwhfsp8a6fqqt4ibisdargb1zftszyz1',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
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
                        
                        id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0',
                        tenantId: '470e0e41-4038-4d35-816b-64cbf3e28219',
                        tenantCode: 'jt2oix5c2f8gnqxlk6xy2bgf16f58z1r5iop8pveszf86g2c3t',
                        systemId: 'c4c3516a-2055-4add-a17f-6d42aee3abdc',
                        systemName: 'xivko5i4clglvcouvjkb',
                        roleId: '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd',
                        roleName: 'uw8jhfll6tcdk7pzwtu0x7eoxin1exljzoo6rcgggnpo848x60ttq69004dbn0xbu9q5lpmpq57qsihdwxs880g01ykebh8r5afrvh3gzmbrzhrz1q5vemmtlf3k83oz11rupxwjy8l0kykxxfqon0sq0tvnrgg3ejjr5h2wkak3v9gavb5vfz2asg15d433uy4z9hqosetvxdp03u13j9p9g3ihmgi4mdu9tloh5w3crk2qn6aq3zk9z5pgaks',
                        name: 'rizkn37qwiune1dk9oyi9wbid5q0r6yuvoqx4wh7568uhyhfdm6e1u8swcs6lzu4lwxl7attnjhua0tdynd464orxpxqmzq3150cuu1mwbl23gtp8ntids3x5bo8acqrgfz6lzyk8545log91d9dbhphesjcp0gfuat909nyka0g4o7qmusv3s3gh21uanqnc8ga0u4wg7bsfjhv4yv13pxaku62ewmvimjavdbmb9bu95lnnpykguaxfbfsnph',
                        surname: 'jomw0ehitgg491h68pirmgp9y3bviwzg8amdfoh4m21blv76yabtttaqifriu18jmlh7eys908ldqo1atq1z3ye2ykmlx73sp02cpve3inoej86s03hrz485151ez1e29cst8e7rjk07hlnhivv2td5whfajlkwfm33ijbny7sz5642rvhr3t0i1amdv4daddzcmfjy9iixb0qpk5yn6wdqeroqn1re14g4zk230m7d9i0luefmvqi8fk9u8s70',
                        email: '6o0b1ynp4762pjfvzxsx81s6ih6eg178vecy99yxjcygxogo812wsfu4wx9r8swoylbkn6owhnj1fnhy5efwl89el13p7q0kulumquhqr56w2c5h27lgt838',
                        mobile: 'c3fn6dzqij4w0n1e8schaize988pckngbiggilg2e5razrurqjpzprkgp127',
                        area: 'ch29kzkb7ubsikmw78k0n6mjp87qfe9j0acihc987a64taaold24gdz8yigybk891j93e3yghcem8dqp3oyzle4ms1z470vye3jq4lgcg786y2pdkacg6suy6p2pnaw3e8d2gk8o2h1cucva1jcbbyxhyoaiwrpde12n5s50dz30mem6ayc300isqd2l8tgofju7gky7ez7uildg2iz1tbejgyxxg654c3a1t08q3cjxm6lx3yr9a0wvbudoh7o',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('6102cd62-f5ae-40db-8796-60d4c2bd4af0');
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
                    id: '6102cd62-f5ae-40db-8796-60d4c2bd4af0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('6102cd62-f5ae-40db-8796-60d4c2bd4af0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});