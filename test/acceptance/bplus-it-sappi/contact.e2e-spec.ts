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
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'q828lqy321qc6cbn5cdff7lh3srnc6fa7aiyu0145alq16ivza',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'dhsr56v0s1x1c0b8n4fx',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: '1gro3gzj396twd84vhsovp3y1vdkzijdzjqqqrtyev223ozivltjq4m5tyysonkqtvhl658un4ud48klsgpta2gqhqw1s3qiehptsud69dt43ktkj2pwb0koi7rc6fkdm1xfjh6f0b5fyunutly93o4tghfd8pq3arug4t16jjfiez6ygu1tj0xj4nqprgxnjgh4eg65wk270v11qzl4zja1qi5y0hsxe1vwgeqlrry4tfp4x8aks9jspxmblmw',
                name: 'ombrerd29crut756fpm4sp66dewtlrcjlvhh0ov2o067usk6uj7j98uoj5cnsnts5dd6ihccr2ayr2nqihlqywdgfa89twxeyi8q7z7w2ljhu2ouymwcrb02h8j40dnpp93khtk69klg86hjn6zua3cea7u5bu4nxfckt56w0v3hxl9w2abbxra8ewob7i68nce5zcr2gocwjbtg2hdedze8i4rl0h38xbp3mzzn4toac5zplb0z0te5fn2jo83',
                surname: 'qn8oc56gtfnvnv4mbr8svrltdixm7t5p5t3wwxxh10pms77bopbexmpljndop4my4lhcdt9jswyep98czqfqu9lt6ppe0rp80rsvlv755svhruqw23g0e2ydmq76u8s072qu2etpso9ycscetjg2pwlni494gb1f4cle0dsdmptt14wt9bstvxacufq1xuxsypb0ur6dre04htqhve5n6r4ngb60rbnhs503r3oq4d7aze7gw2azub5zxb9458n',
                email: 'a50o8wd1y851rt1gflhebjecl9f2kb4epfaca2d8gwuwtzfcey7lhbd273ua1ci88r8dh918gxsermcz1w1pgfdk2vcoiesa9w221hny2pphsyqnttbkm78q',
                mobile: 'clk2athn85w0h1u2hklffewmlpblnbx2usgx7t8frpmyydo5xx2zgc2b4glq',
                area: 'q2n71o8aufn3ihbzznc8vdj5am5o3am4ohru2dlbogid25e5mipoxujwso34eflbdo8hwho4ogjjq4xm6traomlj3s2dw16q68hhg0fbpqe00puhuh8asvqnr4q0x6kiqru39gsmyib92yddgt3but2vln8ml0o1gqdxa9zfuxgu3omjiivfvkn5r4pxrlaoc8kkjmena1lwpf2zvmpi1xtr13iv37u9b17uox50237busxis8ada906639y519',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'q8my448xygz013nlezh9t3cjjfp2xp7ub8taatx5m7vvvkpqv9',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'i0aj4rox3hv2mu77s6bz',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: '0lpk7mtrlaogldbx5wh0p0whxxaabr3t1j1a69fwbu2jbj9i6rojb2tq7kdu1yrn6ho9bce2v6nnyvwocb5b6vj0wmtrxode5fpkc9f9yir22rd1woy3kygyihj1h54ush2dqu28slpsny2im04ie7v9h43vpjb43asypb4lv9e7ncp9zhwp3y2xykt9ak9mnwvzaxgqddk3giprpv0v54cr41yq0e4i1kl8rmmvguhmv3g6gx56fvhdotch45t',
                name: 'nylbtn2s0xqjyn5t0tth260a401o5tiym5fo19h23aijaczzbbrgm3j58f2q9t56ujh4fj7dyidcbjyfatxik81qnkmzkg4neu851ba6ykyra1zyro410o9zfonth430soc3lgxlg8nath15w0lwp9kj5upx2rrbl5ns4jpdnc0bg28tsjyusm5d7b76rnqzbq03orknnyyton4ko792wj57rl4xkkesaotnegalxow64qv70tfg8wr4xtht4vl',
                surname: 'qgu0nn2i6cmz174886je3raj4n6dpaffj6rz38f32tsamizdj7uzzv1bpp1eqk4fc35pq5cs3fesfnkd5to3q38tviospljtazutsmpqz97soj88r7fz78xrqie33crf1af5mu47dzc0fs1qufm6bb62bq8ku4ouw144mxt2jcp6lfb7hgzib93g3cidl02d01heowekjcxgk03uyo0rlgagitbap1bcy9nz05r8paruznhjdvq0s2rnkcgrk6i',
                email: 'yc78px0s967612fze7k1a5k297qtzdvakzm62jbwd86urqk4iyxa5uqfy6o3ai1l1v2xb5ap1rx0ffwly6hstfism4ow403idr219uyrmud7djkjxcrnvje8',
                mobile: '25gdvldkvchh4ob204yeibux9khzrzfpxt72uluxuzae2e68qzssbdeieq8v',
                area: 'jnrhyc5gbfgp3vurne9msd9hlxbrvsx5jesbl40kkii1lmlujtllcvtyu6jb4og77x8flm6mkup1fuoz4qay9yg35izx2nu074kutej16snfqoof6aw2gvc7f8d6dqaixg9myvmzsdzya1t1xjhy5ltzemcjoucu3dzkubrfz8f5qs6yz56e710jfl1o2tp8zf6lco1b8vb1cjt5dyg0s9tpkewejpuxdya8git0ezrabazh1qfflivq0kjj9f0',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: null,
                tenantCode: 'm6zr101ke6rhxwl4c34kfqqgdr78g1si5d2ukccl3ljfexm20b',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'up34cjjq9vbnaudxtxsl',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: '0on34nbeo9lek90socsdtckw0sfh5hduvrucjypamy58dsktbpgltzxduopp4dt551skhq4mhuk8kg4gqqiorcqqolrktgvrvke6wsdy2ujd3kyjes9sver81jk1ga2yr9j7w6sieou69eg0lhxpa73moi0ar0xai0lszuftljnqcuje5tw7exzuoxo0r0ffxqf8wsb4ap7l7rzx2plxz2dg9j26iqbg3dk2p5frf4bw6m6xm1xigh8zyxbkmq3',
                name: 'i069nb3ptjloyz2p00czghonkvtlhue95nm0k0mwrgnclpqn7zvq6xgimfi1g2th32et74tl5qytw7rbq5d1mboaa1ajt2i6u261mvjvi6zzgar3jca8n5nwd82gyo8pzdze5od88m6yyhppy1qlnq0651d55oqmnoi0nje6xdkvedxok4nqqq9126437h7goqc0fghno7kmmzq82568lqjaf4uakni4eqsiaces4cgqflumuil5vmd6mb9ulbm',
                surname: 'act1de6r02v5vqztcldwx56i9vf0w37au0br6x18u8c2kd9vlimgwb9mgyyo69hd6kndj7ubclcbgmrv3t6on6bbz7diksk8yhaqzcwcpqtzhnmvlveknoprhjem313d44tc1d3lros0tnk674yxqdz9z3ia24yftchbd7pvzh4fxcw07sr34kekyu1vphx7gd957dccetv2mea9edclufan5545knvax21rha8jzmfe4ufz6m0k313qkf6bjrr',
                email: '6yxddnq383b60nn6bx9maro1u3so95w4dz6ntxfqs4e00w1mgwd5du9bnqwepigrmzgdhn5nedxcph6qu02s2li318xo7fek6y9s95bs5pjgzt05esddsl8v',
                mobile: 'm3h3dp9bznhj5eiu5opzcifx2hvxzwdbn4zxiu2jsy510xavfiklcxs3asmn',
                area: 'fwgatw5g5etl6xq1mcbhf3peq3x1q30d2l6moqnohanwri6552hf8jlx7viy2o32p7ejq8lb4ojnyxkmcbqp6to074nbjqv8fw6v1lps5g8se3119zdewo08yybxkie5fxh878kl8ay9ym8we0ttsxw8hy638i09xqmq1nywyzr6jc3jw5xwgsu4tu2kk7fav5n9ym6r1jmaoj7sa10lxg3dr9rpkyw9h0lqfysk8ouecemfufny7aekp4h3dvf',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                
                tenantCode: '8zecnw1fhewrng0guldibi232xhwh1jo8edpd1wbhyqhfetjpp',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'g8z19inxlk1u8wt50v4h',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'ujvu31zula5afiiprwwnafbydwbfjdxlrbfjoyzbobg7791spmlpz2u1z3a0egpkuszhj31bmq4fpunethp6nd2ecqqdz5hwkvskxqfg4g528g8csct5ka4x01mrbf7qkxa9e8quj2jcvt6izojkqob6rlyq9d21wq0isebmh23puziffa3fimjafm9xhcwza8d9prfhqa06qdjqk0fa0n5lol03so956f9f2pl7g563p0kohixuufnb226ugqh',
                name: 'uso03rdarm28wmhrnvojpwz6bx9p7e5fjimltzkikx75vw1mbqwa8qy8zamahbo1v0gx6i8vrzof0e0iozrhjgiqg6ixb85xcdjbgrx1ve3pvug3z614jk7s766wqb5xlyw584ap0cc64i1lrsyrrbzbgmknd936w1vnimgkpcfqj87pphu5xyqe76iu8m19hk5sbruzd5uawks7y4xbh4s721ef2k9t3oe0w46li9oipts2pgav933hbhs0wvz',
                surname: 'jx7353cz3uojwq1f50e0m2tm6p6zpaqvr3h5vb551wrl6lpkipmkp023g49d4t3od4719fy2x2owj1gpbhnyfxx1dj4km4ryv3mduftkn9bm09f6v28ij84twinunqhrhaqwkji29y90m5tgajdl95ufhchoufu4cdxlfulg4vabm9k88b4wcfolrcfzzorlrmmwi9zrhkn9rnokdywqgv62pyf9wc1r1fqprosffh09zy4gnonp9q8f2cygfwn',
                email: 'b0hv16114l15uxycw5mqyiwx33hmncndsebwbrtk6jesgx5k99oaactblsppk624uxr3tm6q4iuvd9leiphe8ff56z21r6fqoa6s7wbwv1r12lgjqjmiudvg',
                mobile: 'tly17qg43ne7js7k8px4ryzrslbixwug7b5e190klff6cltvypnjznh6yafn',
                area: 'klcvc1l1hgaq76sih6zb83cklv2ku2b1euy1ys0mrghk0t2raxbh9bk1z706dkjzya9plng8px2qj5oqrexwbamstr97qdc7mgv09apj4pm960dxvf52da0ucohqgpluum1s2bi59yfzjmsz3su2mjhfeqr68dxjza6fwzjcdmd7zh9ktqjazn9539u4se8fvrggtpc8e8o83roi4018pg3tuh0sg47l4ssxo887ewqio6o9a1oghmaxv5mcjwf',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: null,
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'usxceoks05ev29oofww7',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'osl0yk3xg8tll1orj9c1bsduki0ltiz0ftg9jzpragdnygawa0fi66lepj4xwj7yr0hietqem4d4afigqd7myqu8a5novofxhz3s99hf3m3uc6ghtp7lwgovth9q0op5752jdypka4jtwyqvj4vgt0exx5fnxy04dq647n817b3xt5mhq61csljiot6t1kyqgm8ex2blyl8z0tr71t0jzyiv4hpquiti97e2659300rwymi993wnju11n06u14j',
                name: '8f037drnksraf678zro2pcky56e2l4pgkfj2l2ib8s2dsog4ll1jxcityslgj2mvq80h26cbjqmadh9br73ufxj9asfoye53cbioxehrmb8ojwfj0rtczfdr9xakz2ii2j6dz9fpqikw69w48kp2pewftulm6pj7bi9sqc23d59nnkrv8rmh1cwa83nrcs8d42kejlurlhl9ewen5nr283r8gmfiuaked2m64i4ffojamlfqtjcnjsmre4dm2ju',
                surname: '5k6z6x427abu7t263tvaih9vhjnrmbhqmgsheejqycfqs2yr6h2liudxmsp2fkt08s624ioxpo3qiai88i0w6u09bwos0rcmot1bmdrdq41awmqpxnzi31bgve77vcl7ilr3mtngrrbssh0uza26ckioaejovs5b890ewpuo8d1wdbukniu1on711jk643nf6d1ia6trrkemvfeiw4a9bj5kwdxllkn8c5nfdehnpjux0wt1vq6bl22rjpkx99g',
                email: 'hmq8rxlg0iv9s82nrn4ythbd1maq1p4wuax6hdvjf6g5i6zsqb6cdm71gyh4c4dnfe05px2dvf66e8awes1rov9boe98me1rt83dymq4qa7naiielz5wy1hc',
                mobile: 'zykesiqj7wv0ezz59ttq5nj34cynxfuxxoo7schy6m0eag100t5obha0nrx9',
                area: 'cb5qwd92bh1vqanhm7i80bm1q6ho2o5w5bln1lxc3svrgkb5fsygqyi7hqj37spfu2m8axy8es5iq6hmsh5cwrvmlcralldy7bqh3la1i9p1e1wvpaby33211juzo0bmt6okl7ixk1shrta97mg0b56re4bqahjkgkao7zt92kf58onk1e74c4b21ag3ew4cavu1ipktrazmpsh5llizwhirqeusqw74is8a205ny7iwde8pmnza5w0d5ib0ynj',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'qtz3tn1a3v84vrbbrv2i',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'zgjbz0qaodegilb6a6kucwkhrz66sm4zyl701lbxr9sua2bs72zcrsq0216lz1om02n0socqiv9hkjes02zfym9xlmsotre3zwoe2nyabgzhxaqpw42dfaqvoo8h52i68qnw2z4ej2d2bycjkziuvq7zwvaxioqevmw7t2lwpghtuoe4c3bmtuuvu5thxrvwotgogvl5pqqfig8ed370h47syipbvi839gv0y9bhuxdcpr3pmi69vjhfjaunfru',
                name: 'g35262vxmob42miqrx2odo49jwjq69c8hog33j42ymrwgq1siwu3ip3smzckhl2avq8h9cy7plypbjzvdsqce13s46wcm7mhz9uwwbzichyt4pjgu4wvt51w61atpvb7fkk7jzcjtjqx1ogoba367apycg0etx6pcj4byrqd5qck20fo09te9gvbo9ub3jgm6ze09m4l269elk6e32ls3x4yy6o7go7bnmilouumx1b54ds6u4b8bnjzan96a8d',
                surname: 'wzlieolciwolqr1zub3isa2f52e46p0j7813rfik4mj1hv12ti80mwsg1hm0rpe7h4dsypzelvbq25m2haga6x0fdhmonmr1x13o6e8ytrch6hoyx98zg0df801x5b6xxbzsifqsh31n2dohhjyg3hsaxhc3tljcna824x9f5xcizok8rry0ieh7o1anzi0or4ub29r5olihu5hyas5hac00siskl6qkrkz35808x6iw5zsm7dfavpvx501t7sj',
                email: '466veemzepiqanzmcizz6ehgpb9lzv4ws2jj6vjnocfxpuop10cjdl4ru6oxjgnhwd8yjp5beda8yzbxouloca4warb8g5ckv8ko15llins8a83iyxn5zzwm',
                mobile: 'pq7n8ak0u4f6s7lsqpb65rdwsrlviap6gwztypvtw5d8vfc97mjf9gt02xk5',
                area: '9f50c1nr1ny8oq68r4i3g7g3dwb9ik2frsa6y52ivr6rnj36z0bzowai3128dd41f2331ae79b22s7q2e9qljvdlsvx539ilric04qh4vahgf0v557rnuib7a6our1ctqg535hg74bo41ld9dz66am6pm6jj95am4gviasjk07e4t8hue3v1pr7uhyajcazagh2r4h6rjzqn8nbubgzzg4rke3v943x961xhx4svs4vk5348c5ho0snzpec6axz',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'l7ftoudjragdnasv5qar444xmdpa6wabzllcild7dxjxht7zt6',
                systemId: null,
                systemName: 'b30wpascfx27ck65tlh2',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'qw7na7sj9m65dbl6fqhbntuuqhfvgpp30ef1ngljx8f5fq7fbvx4zbzsjd1267gg2z2gmel9udf8img8tqnuqoa5ezv08ewd5bs1rurzzz810zldgq5b3ftf5j0hsnhqcurd0qgyyzwdshwpsikvc5d7s4xpvpaud72m4qrbuxpebcs082dme8vddpwhwy14o75nv0cmssptgbj8brhexmmk5a8puww18p91aagk6bla5vui4t9rb6uv3bgnex5',
                name: 'kgvohl10fiadyqpqtqz0zxprmapsn9gpj1qdb1yni046u43dm4p4sa2ual0c0b5v0w3u6v3et1dx2ljzwxjcnbufqr4b3waiy0cyrkfvnew0l520upi2svwbkey40rylaeqomwv2x2y38i0hvbhh030duo54tt9oealmhmr0atrcujv2sujx2at5dnpik8szezyyxye56cezgn2b3mvyphagjudih8rsmmexf4a2abgh9clc5osn254f9uyz2tg',
                surname: 's8ga2o8yyvk1dkecjzosek1pqhkg5b30kbx9pgyeup7ohymgo0qsav6lefc7rfxqsj4isx3wccsfuqwxyqhcc486wc3p5dnoyaoiqdg41q8fpng8174frr72wt6w93cj7dvuisrdtluc1hhouemkeye9lgla6c8mbktgluxolepqnbsuqbkczsvxo4b3wdt7mcgmqvs4jt8je36flxf57000g1mkiqzn28qpshd1f2dy8o0e1n9gsss7ogxo7th',
                email: 's7888am90qcdfr4hreqs0cucpijelo8uoddrgrsw1j8sq1udqriv9j0s076yo0wr1ob9arn4ya6p7yy1h4gtu9qpy42zzrl83e6g9798k3ptlnr4vo005cuq',
                mobile: 'z99thosp6rj67k86mtxbm5csl5j86xd6fxrcgpenrzgc4csznj1c1ctryuat',
                area: 'f6sjlqp7pjtccagiuybd0n8ozksy2oo99om98jweny2shhl3f81lp9bg3p255wacmga5kg5l7if7ihp4zb63vtk1dfa65qn0uzp9ii927gux8qimvc7ha8tkk390in4k91nh5jlxekywyfagxbmba3yvdjh4d5hja9vcr1tu3myfznf24im4dcvvq6upn5hojs06ex25hsip1h5u3pfw3adwp3pmixws0xjiky9w1bdvlk35zvulkm5rpb1uh3l',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'wsry55x0ruglja4g2lhhn9yfd0zrfsl7omh7ea4d7lac3q1ept',
                
                systemName: 'k5049farnvjrm51ug0id',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'ztqlns8enrif9uzq7e20ahfdg57a8t5d104r59uzs6jqfjl9a89yqcpiyu0ec1qpj3o1qglh0fxuykvfz1ui79d4rlg9c2m5od63nynyey0rft7bde9i5zc9ccjco2movgckb3dv3os5pmujjkp4hd45cpay0phyys2shr4v3hs7esbyascmtrz43sxcih5f8444rkwmcv629kx0e5c1px8wgg8w91c35xvzyejf6h1ok3fv68rcfzokwy143gy',
                name: '6ds8ao4lb0a6f0qrxwv59z4jl4j4xh3vo81lyofwhi8ijrfl5k2h3ktkierylkjrgvrgsz5fk88rh9yhzmfx4js9vzsfzekyll02nejxkovk4sh9ym1iio0a41hipsqz1tkn2qyg168pvdczolmvbb77p24rxs7z8izlitdptjifhmwy737atydd1lyqjuj0pk8eb3dlmaymobgvartnrsqnc21wu6dl3aa1ls5umgqq260mxp8iagv4moiq2g7',
                surname: '246ogxs5p54p7v7zm6i42ay5r5l8jtwc20x78mwmhfncgjda4oh9u3zpes8v820hnahcxynhs4u36gf9x7rzn98m9w7ss191ona3z3m4n59pnfagqdg7iuy6v3plcqukciy86wtum9lzn4sy0mxf2zvcu6in4mi1158ld2rwl7o1gdbgftqf5ly0dfdufy9kx6ys8kfb69mk99kwzr7ekqpkyxt6zxhtei01yjrsoozztq3jyble836shn1rfhy',
                email: '8nmo7myxp434kozt3yl67ib58yl0sdsop4xezsfhk0af2x22fm1bohkm4rnjmxx2tknm4p6opfzqc3k09gmv5i0af8ikppim1k29lfse9ydf39jhgi8dvxxj',
                mobile: 'ggaubw1ouikhd5a2wldhwdl6v3ahcl1arrs8cu9nde6ficw0n40s68zpgv36',
                area: 'cnpytiaf530vpb0he260nz6mxo1tqa4nb7prb7gognvs89h8lua4vrxhebbnvuysvn282kr5uld0kdmuy6ytxu4a336j86ry6igvi9mlngdvkpr42ea6zoidizr95se1fhh2pkht5ydlxob5oz77o4r2hc58p4n8nsijf3aubr6ux3ajmzn67v77hngtcda9otjqzy4j5su5xgk3hcsqcfnp08celpmljfybe3npmd0inbpw3ou5v50v6j50ewg',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'rg7tn1zo57h60cpapbqjtw6hpnjns6ewnpc6c11ntpr7v3a3aw',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: null,
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'jm6bbdpky3s96hreun7ctz43ilbpjofmxqzaaxsp68x8gwa6ppv55bukbapojgc5qhrjlop3gid60rve8j71xcmctukfifm6ffbiklappynu5p962mm7ig8ki62otb345hyb6ix2qmrt6gtlljbm051owzf6ygjwqrmey7vqmjtrf85iy7kn7x1qhbn5nbhpd4175ivwd4z2qv5ng3recz5d9djk6a2iv0d7q5s4m79pk6b6ck9fhc9z4ltyn81',
                name: '81awbf67ka54eoqqppqrzhmmp006w5gyenze9l225czi8u7xy7ndr0pu1v5bqb4wlewxop68o5vgwqiw26lu7mhqujpnh2fyh828lww043vkkvw1h0p9ed0dj5t4dew2y7mm6q3jkr7uintqdu7stqlpestxbgsqr7byvm04k913am1n8l8gkvwm7n2l5p5s1i9bjtmp07d76bneghwf44twa1mte9fbfib9aiphndwbq9bie9ufafucawww0rx',
                surname: 'vhwd0o70uo5q4z73ogfqy7z89w7ou6jk06n1mnor8tqac606npnz27qzcbrxnu5yy3ad62l50c3df5nxlf8bbnzx54w3mbtok0meab30x8m2kfd6tkdz0hbfyy5qq55ofzeya25k3gmb0hi32wwzdmtd9s4xu631dk8llkjo1p4ibfiisxemdfcy4jfo31dh3gr83zszkwhuy4u6e8zhwga4ce27nwkq4adyplxnwq5xlg29x8v24ersmtwzwws',
                email: 'glfaw98dpqqqef8d49601magybtu07heiteu6bibuuula1uqbvl6xolxg6zzz7vl1mnq00tiiwn5bynstcetalsakiyw1i9jn5ndyrwqa5vb1heo6dk3ano0',
                mobile: 'en8xlrx9wl1dw3r9lwkdszrh4sjqltgqvhgwp58swvyshzezmlan99gjmyf2',
                area: 'qmi53kbifj0h4f0csceu65yfrp57wxmzji3pkqolf8lgj8d0h66s2eoqj83dnqcj6xdpl9va4ph7n5f79qejm4gmnd6e3z7b78n2vvxoryqp0kffmz25ioglusmdlgnjzu1tva3kqphdv1qghakhp64n9m19i5zpxaxgqzikinoucci9dtc8ab22ip4wib36135zp9r5h47chumfmd150srv2gkgqpui9h9b914lkdzmx8c3o737shthqzptpy0',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'vemx0ekv8tob9ew2bl0fslyfjwn6kj3t2n3atj6t8gl14mpfi9',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'x6v96fhma2t93km7c04odx3xnchiifc0s83ahstonvyhkydyt3hly9uby8h8lptk3dv5uuyorbfx62ulcpflv6wc7ueqfrj1nfj0tb87lrtni3v2oz1lxrucmwkf83c74ky7qrkof5b0yfys2o35ai63nnghjaiy6v8z1ta6jf25o027f19oimnczleixiamjgnni1yomsz0mqoay83pxis4ns5n6nn35lnspiiqzp8red3vchp21gmthwahp0d',
                name: 'fizwnbipkxylce87qv926uno7k2nrq6gfnd3xtbpan4guv7b598csrby8hcof90lp3gk6ok8hr1bi40m1wmhwqdwrxble4ypvdxywlx2338v75pwkh6wrztcvq5m84erpbyj55xkxwpp9570c54k61kuyps5yv4a80hdepskshwguz8252w94azva9w949rzhmyhjj0eu6vqleouukhg87y388p4dt6oq93uush0q3as75ofbvmntakdfvuq7ii',
                surname: '6m1zdn0twqiw4biem571d1mav0aqqi3dyjp8hpnvtzy24niwhzg2runk7k1k3314et9m1gzg1e1dj3bjm0ztr8sp92sbbzjgj2zzjraa6o0xp1c19qmpb813445ljiuedhxs8r6el6k639ixvcdhkq9vx2fgljl8ywjuc6arvqevr6lm4zxxd6neg4h7q25omkx9lehtwgvsi8ktms41zo2j6y8ko0zc87khde2ptagsg42m78ki53kyag4ie4i',
                email: 'fxkar14cyt8gbu5ajtdql2a1jszoj105bdnsss4xz4tipmc61xc4ejxaguu9oo8ug8b9zwk58tcmyn94q0m011lvvuh4nen8wybgcf4uxnxuj335qwaqmvvl',
                mobile: 'wzv5kasodxnvdeb7pmu53tzkjoij9jamsk763ecluojhs4ou847skhistdea',
                area: '5jh49p71d940ph1hwhdt4g4vp1ewjh9za7xfl2zqblkuz0h9to8if8a6iw2n9b2747qbpi5sm7zy61zxfmat243ym4jnksy3dgfoijgw431ytc3v0cvorqdt15b9nuqr8q39jcw7m8rryk4fu9htfqlyfu5ir10tcupasg5zsvj9psijh5ie09giuuapn3pk25m6wie1n5x9ign9pp1m0i0njyne37e67bgdgni30ixgp1if2scm6t1wwh5e6lr',
                hasConsentEmail: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'e629i6rq92cj8i6d3rj9lkfcftfil4bya9kh80jzbkpg58xk1o',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'mwdmnfud8z1dmvun7sqz',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'ss2efzz7lvgm5zymthdbmui3wwcgk5838n5us59pbaoth3lbqhxwh6sqoawsqry9b4yurdi975v864xal86uwvwqjrkhbl3xtuol7683b9uih36uumf5euotrdbdzkzk8z2q0n4ye6trublz63tev5c602nnjnlarp97uczc6jsm3ewzrd7qr701lfhw49qdoihdcw94oi2dt68nift3eyu78ouqoc2woocw2yaxlsikaz22wfdlhvym3kbz3tp',
                name: null,
                surname: 'foiwziljq7ell8741tn1uz9e4df4hxvr2108sgsmierg5fhiyv5teaw3mcaa3lja139byq55qi1nn9g0z4kr9l23bkegl6llg5cingl9t2d9xu0nrhmnv718xeqe22tf3pp16llwwn2tjprd9xqc4csijdu4ov1rhs5tjsa40wmx1pdfnzijni8jjrta6k6lwfcu8lt8jli7glfll0jfvi9qpi4nmkcmjl4ulw4rq7d3ut24bure4yp0ypki5nx',
                email: 'bffxfxj32ajny44cm1fk4ihncuh91wovjne068flo6j4i0timfsav187nvut2zl5fwkgo1fdw17jvq1aj8ranngnc4pv7v414ehvxlfbu8mcejnibsd023z2',
                mobile: 'a8hk2hrve58ns47u9hi1hdzir5xeib5ihlwtn60wk0yo9hlt1mobeb5ki6fd',
                area: '6m8ve8umagylr6l4i3t7w5832p8vw4qfesxk7naaffw65808ic4vd2nfoi27ltofg5xl86yxg09bywr1bik41vzldis0act85rvrfd6crrew1th9khwuhzafysa7tytzjk3pwaeztbhrucepjp7fcr609pp0iojoo49g97859a6ppujogroam4r6wuhkzonxdrx1iaizdqhrulkoftsa58t5hu6ua6f19rxcvt4m17071wenay51sjw9pqs6gnm',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'jxoqwed9flqjm1oyv0drghjsmb6h9vfooxaaleo7j0lplw3bki',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'jpfhg8n862bkhjz2wice',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'basd38zr7o2rjrxrmwzgwm2emzyyoamg703mylyu93cs0vcnny5p4iffznsdmg1rereegz4qljj84z4aqagvxju6i7eg70afjnehh633wdzmyixczmjplqkd2lpp4dmeph3e26jag9h332d168eae8lux3fd2jfb79irlup9dejsm297gk4vjl3m6y0fjiua2f0vshdu5f3fmqbo80hrylu14y44tvvw9owt6lndotd4eqiv0ag360xhwop08j6',
                
                surname: 'uhf76p46ql6xddrf9wiy7vmxrfqklcsxzmpe5wqx7t1jajjqtm5f8hnbnw0md92t7w3kwoq7m97g0k1iq4u78769vl6mi3zexkzqcyob041yax3howvkobrczvtxtnyiujwe77vs7iwaxezf7zw4dq541kg6g7jmwappiuecwef5x8he3zf7fxe3upxofi8pzjw4c46x5durkddgwkbz687ismzkjbvsfur905nsm85ddwpta8yzsl1zano84hy',
                email: '19pa5r9lltpmt5qvocplxmd4wsrrgo2hs8rsn07feb5b3elp625miftdqpfsybtx59g0uijulzj5qhtjpkz0w3gmj4a7nxfgpgcis62agrvx5syx84ekj03o',
                mobile: 'azaonf3gu8bfms1gy7b0ypnsrpg2nx5hpd0y3d2tqfvn80uzdui0amq9bs4g',
                area: 'f8r77j4epdv0rdfk0di8gfoedh082ve84fri9wyob6iw26psorw21j54ctz7nare8xlp0ov19x58ul5h2w1bk0gvzr3wbyg6k9jlstn1x4h10dhi74djbnaq290h7aoyr6pt6d2h1hzojwjxx8g0hskrwt4m1awy2vmtibdagglp25y5pa54tvg5t3ltetwedxvcvszydwbg8cc1khlvi2321mx6fr7y0o2wq9mrgp5q8aem214c6bfvmpopkjs',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'yj8b0vij52fqn7qm0c9nls9dnbobe4tn4hzlwz605q3jplw86n',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: '343h0sgtl04pd1s4letp',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'c1cbxzwwhf6qu0d0lvxhbd2g2xevmkr3sv1hcp21ocxj0n3n4wp8vjg2awbebygb3582gb55tv7jnfj3kgwyi5fdwbtz1kte5215dv4duuxdq8f6zllzdi8fvn1d31s2810ipu9qkjrw5zatrrbhfl1nygsxbjhiew83u5jiuwlibvhoavnf0ss8zla2i9kq065hfme36g2yofr5vs3i0t3hizs4tal0g1i9gam1gq3xkddcubdaqpvqgio40pk',
                name: '739lxbl109mu9haehxorqred73lnngbt6i6fzl3omksl2a6jdtu1mijwbu3cl8bfzlhicxdxcf25ejn18i01pvb4arc7isr5rsvo56s2zu5ktyi3epo8xbot2xph0ob3vl0tv3yw80vqfqc8jja5ecxvhy5jrq93qa1lmp73gwi91zfacnxefsf4q5ycnwibnm4jf6ic85utqs4g2ulnmqjr85mjo0l79qbvpwvhar7jizanhj2iyifbsotyjwp',
                surname: 'b5la6a19i7pe5depx1ia1bdmaufrv0zas3o2rybvke0ei1p50tct763qutbyrilcz45vnbq9dmbicv59zw1q4h330wvq3xwwqwhoh4897omjuiw2cf58wh985i067kvxreq846yu8gxdqvkspofxsxbke6s10lubuos2brxako6hqyjs5nsnzgc871uszcovdgcndgg90ofg3z3jcurbt1twifdyxdofvg596bwnf8g86twfjue43p5rgcdh7vg',
                email: null,
                mobile: '2lj7nyupzkop4279vgpqdfjhzhkzb6vbxrjq8dpkszzyvzc540047h0z2vhe',
                area: 'nbcceaxxuvu800vqf4v19wmw845h27nin1t1yrb8nvaj5npl1kaywtgzcuxvmc5lxsi67cqssr398qppg6zl5gwe7px65fr3g8pydihwmmgbssgpujgo953lrd9t5dlgn187m1xht9go9h7amtcbfss5ogodfwv6sj8ucs8smow7zr2vc064u95ykpmlch4v4yp7rf23fcgkgjo7apf2c49x3tklcy9h24vlodepqdwkutttqz670pebsdtl36r',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'b7kr1gary8wmeeglyqbys70uq8eccyucfsmiw5hap92p65i50p',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: '2c1xuqpfqx7y2njowlah',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: '49ohhso95z604j6ehdzjzzsuexmpqct6fcxo57ue5dsqj1n2vd4jfg3pwte4zynzsbc3lr04fp358n94uja0qficxzin5vj1jj4orv2f1f6gzkqt5ardli0ie3iy4fngvebz1t6dq865r6ke5mjvszx6acvq1ltjf91pckgzc9xj9ozuqk7wfcgcf5sfenqehfo3qbmlsu31bn9as8ba2wkld5668g7vyb1ojbf89zdrpcy0j9ihril8vw70hpt',
                name: 'u7lhrl44hj87405wzsyxhbseaswk2h2ja9ouxitx70yn5thbq3hph5agj4lvp1z6exth7mqxpmvshju7pgrk3q6i03gz5j8z9pz25t0fongjvgfrikwjh4rsr7mvmkau31rh311fp568cmkdhxqwl09pqb068dn4t49ftr9fghi0ov7hh7dtolzube8q8xgxuq6ljbc0q9x86r46xv0qjiq8sm1eti5tt8yh7ot2h1z3uqdyk9m6ujk3ozdrsbq',
                surname: 'sesea7k95w062dcgohn266l42eql5v1xrzcdxhad5mczcp0n2sz21z17n1mlflxwgqbxcnpaup1k8twyappqfsg8qagqwinu027lan49uh39sokm3tdgbmm4c493mloi29t91mmbr1n62wcviwxod1zdje8zin9dfi3x82zf7kxidctks45q252rwdfkrn1y0wdinhzls4v9ub21f7zuzged0m15coe7rryt8f9rnoumq80pobqoodzav13rade',
                
                mobile: 'yzi2j6eol84urhoy4unu9jm3qd32oovkj75j0nl2yezurwpubo33ylpt62h4',
                area: 'du6xjt73nv82izsfu0n3k5p68dj81f7hl8ojgv12ddpbvnxqym8z8zohxk7kwbvscwdedu39uha82qo4m4j140n97rgl7as5mjhebln06f3rp1xmhmgeohnq8d2ym8vs5bc1gb7r2u3c3u5o1uuxalvupzdwzjqk9tlqardxnnhsnt2b9ls0lryepo9wu218x4tfvkgytkljrdrjq2nq03ivzfxt0h1xaz5fkcjz7f2nskxhw38smooj6z0tcpl',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: '8hvdfmc1c4nnnfmk3embg62tj4lonv3eqz2ydqwmmfjmtz67ih',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: '0b2uxpx2f8lc7q3noufn',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'uge1taswqnsof90rj8rocz4kkta5r2z4zsqizz3a19cxvbj4mfd21bp2wdpaa1auiwufqspg4sr0d8s8eecaclrupdkerb4ehn5du72jccdtt8wxmso490ee4dqrglccjs7m7p6pxuopiahfanxvemjdz3n36nqiukcgzc3vnsjl3qfemwvf58p3r254a2tx5vxgr0c0n8zc5o0k5d5al5llqyscd0c2vebakrnb0ra2u8miqdaq6vk5bjft03d',
                name: 'oee2vmn2ga5h0xs1jfronz5f34a6njc0yql9ivwce2qpv7dcewr68bjkcg85aq3fpe0yd3xb12osliah1q5n1xjg4i10oef90256q6narc14t3ivlmcfs15yr52zt1jdgyzjo1tz2335t2n7kk778joeervm3qx448284prg6fxnq5yko0ovnuaf8ckulttrgjau1qswg0ipqlb41jtatqqpoqtemikdlwrq05baz3bqbfbs69u8y1smpkr5plq',
                surname: 'rcajb0hseewz0118z6itipiaq9jxvp4ibmey495aoe8d6al1fil3jbzz13zd9ktor76uk6u26jlkrf50w3kfqv5mbb4j73ioj36qf784cnbu29y71rsmdzkhfhujl08yxnl90kdqulbt75dkj9vs6xldlrggaqsuvosuz94clipbrg1092zdptsb0sxb6fhgujimh8zto0tq4kl9condai66i8pyw0tds94piqg7lpwd1wug7j65uir5gthzip5',
                email: 'c29v5rcij3i7f8j0j3yvrj5e6iyi079xlzo6xm9qi4fqzrv0fo941i6tcf0wuo7pmqnh5yppyao6ppopkh9d7eftxy134ymcl3degwgh2js119a7n1agkwft',
                mobile: '7lbeyi5khs3hbw01p6pjdxakuyjg8v3l18zi67d4fxxmrml1q2racignm8h4',
                area: 'h03ovpzvf2gsjt20oz1jlymuy51lq5r46fn68buprdkmt8kr0zwz3sg0sdu1qcvgtd69dxjllw68do4ds4pz5mxisxq6x9c0d63z7utpj0a4ya773y0cpqguurbqkr7y1ati6bd7fnpn98iaftlulwlc5gxolbya6tmz2mhv3muy1elvdn9cp3ll9bjfp4mvzfx6e438nrfcu6kgzqp37duzyd6x0sieon7nen95a6y7xnx385hrtnz3l2uwzki',
                hasConsentEmail: null,
                hasConsentMobile: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'aob6d7okwzbi1rt4oa95reydwqsarz0haohzcrxjj6ru0m92c4',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 's7klpse5xw5k87rgr58c',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'a1ukvy2vgjlzqupbo8v6ptpe5nt808wtshpck8labhtkwjhcw8tj3cu5oo9xda83mvwziuygy75wxypdxhixrd9fn0v2s97h87yv4pvxjulcy8pbn9e3g3xrftvbx9mohbd4y6ini2urids355t8y84vden8psfi6oqtlr25zg4o4t8rbs9ra5a54xxat1utengm4dk9trynoc3cr46dbdk1rw52bwi6a4q6i85byxsklvi45axodknf27nb32t',
                name: 'scznm2hg483qvqz5noowdg41647tp3wcg7ba2awdtjt34gy0v5s4gy5ckyv26crzk6idf7ueffbnyw6c7ek9cl7ih00o7k9zblbr1pk48r0t1rvh4j403jpsrwpahqq8u4tg6xx7e5t1f4dnqhbshdwl7p9ur2br3vu5roh53hi12iuhqgq4ogb2fs9k6qmqpazls7et4eq3nsv0wq1uv7hvghnyxtbqjkem8ji4wfi1d0xzpbo9uki3695qbdr',
                surname: 'mao1xabwcqjrkkjovvb1os5i1nvygjpdk7tqwg3xbdxb2usz8i5mk4tzssm0qfak65clv4nvktg3dbdvwr5mjgtlrxarvebipytz45xpe9rffh18eq2l81m01f0iakiwq6kdxj8vbfsz5h76qu26vohzwx63wq28rc242tbr8k21fbdf202czjj69hyck5znp9qjy2g1ikc2ztcqg49t85id83dhdp7g36txi7qr24kwnyk8sctctvq7oqfzu63',
                email: 'f1rg7hw0zldj29n6om3zu2eg4yvil3evw1rf1agmmu8a026yaqamg06tes1njr4t64r45rcu5kuk73gid9r2h23fdr0v9ac73w89wi8fmjz9780jq6dn8qmu',
                mobile: 'hvpx46wbxyxje6b9auvv5yc0uwjuq6g0m34gn9tj9usxpikq5hmva76439gn',
                area: '8qcp2fvnltcy2gklya59ffoxaqrkqmqtl1m93tn1ux16960k01detkzn1m3hnq7apq2a6vr43r11ijeiv34b8tew4c3ooat8gwg8064orgtalw9lh7epx4df2mg5wrntdlvfeukho0pdt5olu8srdpudm7j3fdox9qvwzo1740irl5lktdexpnp29qm1xnlewnkdxwwviurhf112d9fuq5t2y7xs64hvtmp1cq1eithimg8b65qwbnlip34nwbj',
                
                hasConsentMobile: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'mlktce7u2a3ani5g1wuxjh10udvyk8s7kprpk5ismm50f3dfsp',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'uy04dxu4it003kk31661',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'jw8unclnxmcghj38h70ww3d4evmy00398d9ha4fsduuwcnykdqnjy0qftenccm7tdo091cfpuogr22ckc9oci7toio8bq9gsh4bx1ifty8vearyhi35b2b0a8mglfsstciemp818enoa100rx2nptol7bw3idho8dbd1o62blas64tgjlm0e0vheihmgc3jkutaptl3ajpjpzufjzmymhd8omby8tiajgtpmw28txkr7tg6gwq7a25u1frsilvw',
                name: '9e2lb2nojzfvlrts6fgc32xo8jfrby5b5725ijv4h3a24y24mhxgcbw8qsqmerfpy3h6lcx6fw1kp191pg6cwc8x9irjczfstgvgeg8kn9e2a1bdl6gby7k7rrp89fguocd227tzl6nkzg94d3i18l6x75tgbgche8ld3jflx76dkws4joa11jq3l46jcls8rsnb3ubmiaxw10h4fe8o2y2glnf6aflhu8s04v74b1drbo4tne109u2s4rxa67q',
                surname: 'jd6rgrs6c2jknz6bqtma3bloavnggfulw1dta0rkase393otl5v6zpsjp4v13ysyz0lo5q9tr63hdoii16slbaia5ypszbal2ytrnvcjip6pemcp9ln5nqfu6cdlklgnwb4cqh7dkjnuzv56z3pbphhb259sch5g6kpc6i0o7516nzwxny8ta99q3564pkuflbch6vvtcsp5hkiz9ib17xptle1xyw17pu56z0orhfsar1p9iy2dezihev9r556',
                email: 'i8hu4fye3rbi9ccz5gr68wmqwyig5tzd4pszxkeapry5ga683u02jrvad5a3lhuhw8l6l73jksgppk0onopufbbe7t3h5rodm7lr7bn2huenf41xe5evml0m',
                mobile: 'ztp6z8zxtimujvbgk7fdvv0r89zmf1ddszy2b6vpfx8wp6thi1q0ghbjbhfw',
                area: 'fwai76jsn5ns29j3sxtadgkvvzyuq3cxndh4d2ge2brhbbuu52uvktel8plutqmjoqapa4aj5h2bbtzp7vs29fmstjxu09g7vnwbqz4eulio92759ia7uwmdo08f160ohyiqttd6slaoreyjge443h1ypq97pw6lwvlkr4xk29z2m9j1mynjj016vhx9o0dklt2hs8qvm1h3uosnj4h4f7jl6d56wmlbvmvshcxdppuebco6sk61gmfaubzfrhn',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'r6r9t37k0y2vj6jh7u4u77lw3sv4ufxd0a9pa9v54aszmcgz6n',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 't0s1h4jmklojdytpgndn',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'pi7wp4bgfe1yyhjrhixq4cp1tyub364kq7rlgtgya9mhpw7i80z1znwwbocarz34y0bylig9ykflj9t106a58n7wvdsut6qfep95t9kum7k0ivight7zktrcqys582ohni34p3ndrrf8jllqa33919mf4zunclypzmwgdnpp9gybr2uh3lxeockwux7dalzsa3pxxh0t3n297dn3lqxfa9z0nrjnouz78smqw0g3s0kdp3u9dyqyrrznuicj63p',
                name: 'fejvxs8jnpzzlo32sbmfcuw8rno1opr87cp9oy9iz5g9tage72rni5iz10gut86h94zn9smnvhjm01pcap71l33rea31w0u5vnsb8u8ev0usp94rvejph6gyod5bpq6a055wjkelt9e87p3odk5hndyqns4gjawmix935zddlsboqfmbdz36vecebqvc7pnmewua2cklq8k7yfmk0uw8u6f9atsh1weobrgksyzev1900sobbm7ccr4hb7y5s0c',
                surname: 'kmkkihniwr025p160u3suyro70yt7yofs41c17z3zk0dbanji3cid0jzzj64r040wfhg427r5lbx9x5v0yo6rofwwkeuu8dlccz2x2nrgnvvovva1rmcqh7xd8e0rqx2ealc97seo083lnuiadi1cjw47glfx2zlxuvyxyhooi80a8wagt22u1r8udq4bx911v9l7w7zo7pza95qka1zsifat9df1792minrsjk20il1va8f7dlgf129kwtx3jw',
                email: '8lxry5hw1pbygk20ewlgx4po3mxi170mn9ym2s6mmnsvqpx100y7nvgkvau40n1yvz627voqrtw1xbpyp39b7n74utqqc7tc0ogm2iygbzuwi5igp4htrhb7',
                mobile: 'qcx5759auzpzteqaxd483zrnzrisrrgucoduyejfc0izxjimtcvbcoxw4wxn',
                area: 'podanx9mac41aisjrg52hwpy5gls4gxl3ifv78i8z1eh7nw0krpd1137p18p27st4wml5cubg4aslmva9l2mfk5di0pn2ytrzkji9vyfbk8c4sqtef6blbodtd94yadlyeo5qarjar1xs6443tdy7dnq5npyfvij9rhzy3ciejjtaavciw2nfk7l9m57bu9p9a0s7l8km3s43n0vaf7t1gko0usku9fal0y1w1ucgpyzh7j8akcky5hgzq682d3',
                hasConsentEmail: false,
                
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'qn7b6fgymus7dxngo8gbbuh10ou9yextnsn7dg57mrlm5jh53l',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'kskmou4u89gfb5jnw8h6',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'jal691rz3ohahyo6uup97j0jamptvjetfl1a8q505jx22r2odx51jlhz7i8wzcrkt9xp3c401dwphbeyhg9rrni0itof1pflyrraj83pnnbawur577erb2f6flchchaml335tcmyxg4nt1a4rhzhegh1dnzeuxre3c22fbf2drbxtiyl5euu8phbxw086wj27lili9q7l2froje9jh34uang4v37zegmgcudmj0s2txz707qqewvsbvhugy5g3w',
                name: 't8mlvk2h5hmiaa2v7budeocv2msryzkqcrsdng6mvvbgf37n0nqzvo1jm49ftbcfppp96uec2xdd1w03see6mm41wa3v48omy8i9pb5q0frqqexmoy1n3k0hslae81hfqqkjadob03ixp8jggcxhdfo2ilbd0r9g2k5to9zqapeorctzo5xmzpigvzqxp0bn4md0ddzdwi5grqdomt45k89y56q145iuxxu2m6adlqen6uekvk7iqdud47plsrp',
                surname: '2efp9hn1wrypva5bqiy8gymrjh9459typyhiw87m224khjy8iad1yt3n3xi9fq78rp2q6qehphe011xyxgqfjbc9d0c5a8afntpkjlz7l0j2k9plq2wa2bdtq0sxk12eh6vz45mrrvn83ehdfzvy9zwprncj3pl9plvv98paphapw5hfw6qg0n3cqntm4lhybb8zc6thwbbzpejw1r8wz54ezndmtegjpsp2pu97kgqgn8x970rizdgcebkn1wt',
                email: '8aast58dk6ignx8dggxqh3srvbyxh3bsgmqkg9d7m7n86x8o2eajlb0pw32k17r190nfqelstqmsgfjy97bp85u3h3kyfi104vkogahptnqb42u0812ndrr2',
                mobile: 'ap1yodrgch984hb6xxxioehs8fcurri832ru9qlx3l0ve9ildu6pinuzgfo4',
                area: 'kniplhb2rpbunl1elfnqou5qvmndrlxmkyllgwk38v9qiubhhk6j00xdcf748igo5y761a71vrnzt8yufy2fgb3b2yl0h1hyl9lw6bbri2dkl00a9xolr1z9el72y70hfftbpa1qhuo08xj549lrl7xn3ecr0wv71deleuuczziyuqm0sgruc3rswbkdjrd35otniew0ifh661zc5pov39v97e3m0cqg7j6dovox3bwbpy9r4q8b9leqpn1btec',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'n9w8eq6u0xg1gi9wj11ngj8wvz2dcm6b8riw2u7ynl02n5zzva',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'mh2mm786ud0puqhjwrot',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: '2t4q90co7l47m3lc7fpivttyc2gbo57045idad8gyk5slzrscdabe94x6iykovvqnn2ql2wwi1wjv8ef1f44egw0r1jmxminlo0kwod3vdtu34ooauqdu5v1goobrn915392da79rahl0zfcvt8rw1vsvworje1t1vye3uq1cx3zhhlgh76pgggyjfxmdjmhcr0l9vxs0vcc03wl8s8ca6868ojo6pbs52p86zsqtoxb3aknp9ufk0xkudptgt3',
                name: 'qntz2c15meyia8q6d4iocydwt1guro5qbn9ngluqx8ahqsib2z1oxicsqs83u5ie0wnrq7naqz5f1iyyc19m7q6yssov9183d27vrsp5qpzh6uiks4s1k96y3lbyttfbhopdg2ywc2sgvbbfbqrnspv201v8mzjyep0amjusa6vuoq0ycmzlynp7y7olto989g6vrwl5a66uvahnjglkmcyfbmo16m6dpm50zx3qmtf9c973e94oqtooau14qz3',
                surname: 'unsz45kooapuwzmfee5ampnuzstyyr0islt29aetu068rjx5a6zooktbl9cb4epyhlnevp6y8bx0re9ssnzntjii0r3ph7hoygahz6tb83gq90gx2m2gja4l9hvgkbzbunnu3juqe7gb4f1h20aqa3tceyqhc2534sq5kz9wqlqpcydbfvzzhsnl668weqorbn9gif9h5mw2ihgsglysvwhjinykzl95l5rvkz5bm23km0mvaa3tj9thr8bvh4o',
                email: 'vlzzdafj4nhqqfvfxiivh9lwt4erxtshz2mdobfebfwcrsyjaxanhbqnwa7151teiu86g6yww51d4mjed7rxjuxk094csx8akat0bu6utowjxn4hz6bd2vpb',
                mobile: 'x45lhh2zpwwavjmki7b9614ib9xdmvqc9by0wata0zwlw1mojij2uo81xmkc',
                area: 'ci5x5h0f0pyxaw47nx9krqs1nit98so8reis64v4gzjb5cynbsarlz64tkmgos39lghtqdo6t2y94b9zfy07vixentrrvsgnzscfuo6i9z51ghp04bizijmqb2emysd38zk2tuvb5nuadlacvirsr4mifgwy9dgtyy520wjv574noxn0bt4m66i3wwxlmfltnu541q3c9atde6ilfuuyfbkxbpomnfufjuatnctt91n2q0hwttthnaxgul95ufr',
                hasConsentEmail: false,
                hasConsentMobile: false,
                
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
                id: '9gwxhj0yjemuoeoduw2q227sk5da59ujfrts5',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: '8ymbtdpqgsptufivnttdottjoiclaircw7ljcskgqrdeasd822',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'vmj8klxiwet47f2zizjb',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 's5lj3wv4qhxxovrdleyz28e1wribho9x76orxnzk88c4lfx7dfd32wbpuhaf649ipr1pkror8c6cx6v8r8wnhb7pgtlzhgm7wn8w7997hzj2rihl0ns06g097w46g0fo16y4pqu5sqhnudo3q5k6tu9x0xqp2b82g1a08fv1jup8x422037moelegw1aaat1kxmf2ycn80ap627h6v2sdqo7ahad7vmf3tn09xbqfka0k27jksc100m5o4qse2t',
                name: 'q1ly15ena8exn7ulismby246wafcnq3rely1dv7j6sfaqm7v57z3zwd1ipwejkw5w3spxd61rsz1h05fj3f3nfo7tp3cc8ofwztkqoho8w5rd4ebk8d4qlkjdufd0b07r3xoqwyksn34jzyyxlljvan74loqo9uaqf98aiagvqmn15idpykcsnm94tvap9hvb09stfmfs9m2256lj9xn6oc85omztx4h0qw6fbfrx23em7ocvc5vdfm59t9o94j',
                surname: 'l8aqef6vprvwi65yzf0dcsx5bduaksd6xi98inmcc40resfzs6lglgypyzypztibc7rdx6f0ths8ugb2ohwnpvyask2xp5w3kcgba7wmlvhjcz0d2d2war0ukl6zm5t3jxxij8q4iegn5kejk13lbl3tkrkvu54f8yu48bs3hffwyhwuw02a4n10sf7dn7c0yg885357hhase0kzb7m8d8gmlvi9etn8z99l1v7m3h8n3ru3fhnus4xfokabece',
                email: '8x1zy1612g2k7trlkui2l8am7ozbh8or1w3rq0grg4ud3cq4h8uvb6kxxelxwe7sh4tju95w7c0r6dipgevu35zs3blk77e7v75acypy45ekgy5qz8bn4i8o',
                mobile: '073v4yi3z3nzxv3oyxm0r44ple96fvgfsb98pvbjkh0hqfc0l27jwdt0gkm6',
                area: 'dyn9ux1pqe1h7tuh4ye96ebd0mef90iiqny08jvngf0hdzpuoxgjzipr4s8t5jtwpndvty815jfm0xgsvtur736ajbjgwjuwm3t2pigpau4a1653w57cji71gz8al9pssrfn82pqvsolk6tlx66cjg1t9xi8se2zhozu9y2v18h9i0bm4ifw6mxl34kx4q5midjstf46wc3rrede85npxs7z7zabjkaxkg3x9teh89ezraime2xj6n83p2yp8ez',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'ltxzpcae3fdlfeyb54wsw8km7576jp3c15wz0',
                tenantCode: '516t23znqupo1ayv6kyjltvza43coc4ni6aaimosokdkenhyo5',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'kwbfkombaggozykxxm90',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'kw3fa07myqlkzq6m5520ynxjdfcsj9xzm492224kk9vamnqeikdiqk8g4nfyhoq5jwkir520rq1k0y0pgcl1mpdgb9oj3zgf04eep9ar3exbw7ucov1btymsxp6qx600ssfq1r0fmw08ox3j0l16mbj877txgm01y6cmgjr3053iqo00n2wwis2spbwo4y8nxpwxec5iouj5ucdvazflovlc7ihpra7egd3hucmr30zn5kq3jbcyrei1ghhjlqw',
                name: 'fqp84xmyekgo0cuge8q499mlioea9e0iv36wedxzh9pinzzfsmvgtnivqm7g87mouwqqy71vhnnw5xdexkh9mmdkpnshdhn7beol34gyntse7za1pinhng5245xnik6vpb68btk22fs1rmvjzk5gzo776957x88gcua5riq7x35w2b5recti9fu8gafts72m3g4xgkgy0fyytnmovzrayh9si4pljwe6q5bf5ja9vevf0nx4xjy36uzk7y15b4m',
                surname: '7k9pdpth707fcwnn3wwfz7mkadj197lkcky7sw9wvdcbxgc23w37g0i0sp6qzf6mvg0wmmiu7kbeiw23rrw8qxenhfuaiqkumcnkjgti0idi7p7arkn0aqee89anq4zgdz3tjxg9uulux3fbv7wlrae5w6g14wokdgpcf8ew2ns92r2wd1ajei9yptdwsukdlsc8figp85zeo6por8fui2uuj35kdhbtm3f1oc3jeqaqhncoigbxfcqd2gscmab',
                email: 'nra3e57y93q9ge12o9y5sa3gouptr1jj1lxvydxr5t4hsqtm9xaj55efv20dgireeva29jvok7n2m3drk3trkkfbpfrwx6tmn3m2f44j2xwrx6rkhbyxy21z',
                mobile: 'r3yz3g9lhncpayk1wpfxq3qqe5g9wgfb9pahv7zfxtv9c7pngwbiyfu4h2p2',
                area: 'wi8qw3w6naln3oiwlwnpp6rdaj0pirt6w3slfwu51wx9u0e9sxnzvvmvx0huv91zj346xsyyniuubv2qegbs4d3bqcwb9pz2x0bet520wq2xf3fk2wsyt5k1yj42a2gjwcm8cmv2x3euw60t5ggdn7v6xoezaqlcmi5o128ovln8w2t23un4u9hzkrchsfzxqjt9zw7w1nvoqgrrqg6pt71xvaf6092gsu5lj9tbuled3uaqxiw09fhljljs7h4',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'ngg15z1symctujh4ayrw0alqm1eig9yoltxc5mh324nozi9mzc',
                systemId: '7qxtlfcskgtzk8451we21voyf6384011mtkxj',
                systemName: 'oreaw4r84tsbvf11l04p',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'kr7svxi3jekhfvgo1mibzxk3xma5agu0bztjzvwp7ul5u98ynjnz6drcosn09orbq8ui5q2vmuz437q013em4glbbj953hvqhcae6tl3le36p09b0679f9g3i5vtx9grkiqs270scyq4gy9j58dpxhpeevf88whnmiks0uo6nbzqihvzhvvlrtuqqx0yemnctcbuqf9m6jtydcqup6b8u4rnph0cczo3xt3wlpj65bnemd4ydxkb225gy2muxte',
                name: 'yj30bx8pg65t5ql1fgy7wys4jwoan50850quakdtbnsi9fsvvzexxlw94z1mrxn3h5bfoozaoovs6ptt55hzywvqxki50illma1mzyqluku1a03oar0no32u5naxdl266thdtd4pngkucig0o0ec1ngwwll0hxhz8zcj116wxe61lg9c59mj98dekb9oeyahra9k0kwr92kocv5282r4o49n904b8bmwdsaq3pxwf4c9zh7vvqvzs9q36gp9zno',
                surname: '9iz2s7aabr9wi6e72a5b42noi17fzmr32dy4v8r8zdzxm8islca2hp1po3fx4vep6y40er32sa40wvdbkjb1knd4wvxa4au0zqvn26g9q9y8nl312zwpak1v4sht4lx1kg5x1bvuyp9rlmz8wa8wxjslwk50j5n8rgh3ig05ju757hc52sxkno757tmmh34rmh3ffpo7vv3emttgm23gvd8r1j2u4sl45r7b1dxp7r11ouhutxhd7039powcec6',
                email: 'ybabgttqqkaprzfqi2kflbe0cmhuma8d7formjobrjim6oz4z358o1s55y930xh4s3jz6zvk7x9r3ukao83tmfc63abz7e6d3hgspd7rj4zx516kycnz9ffl',
                mobile: '6fqjvoiv6tttp1ctxy1j36hy9svull00hvvq66sq228dtcdyy7def67iaic8',
                area: 'ywvax34rs32frpfyvlpmqq4r9it4l8oe10rzz31co2yo4gcoaj24wewdkiuzzll43mazy88ad2q5yj28id79yuohxece21awdrodihzvxwybw5w9re7yp1z91vwvh7qzzfds1d58mgh90u0z07exp0433s1szfii04wreh9h48y7af4bwvt7kqfevvdt51ayseltz5lksk0ruiykdrq0h66zu68net89u84ytwhnz03olzolqms26erdrdyzx8p',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: '2geb9vrzwrh63se408zyhfgq9ywyepjjzb8rkeplz9xx53x0cs',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'op9vt49dhkr3uzre9wu3',
                roleId: 'pobifr89ig0glujl51g1n71zc02zahqteka2g',
                roleName: 'chuyxiczilheuhdiztkqlbkplvyoh5p9h2wzb9tpc2x3gyo4vw60s89vtnurj9k7je9i548ytoyfrgm0agrkzaj5gljd4bhjcyoe10jcmlqcyonr7fz8y2b89kknlgra9ads3c1gk3bk521to3adq0cimoe9a8ynwrmn4h8ftkptuewtmgrad28gp3m43d4g0q25q5dvwrb7gk6fhnz248hym6c97973qz4efgdch1czw3ir3s791xfup4pqql6',
                name: 'pb551jmynxj93pysndfoqv02l46d7mtuq7qmy2iegg1s75g6dujmu58e8untku97xulzgoysnu1qikfrtxlcmwh0ohhrv9de9hp2w4cp8txg9qzmubc41u59k452jo8ey8f2bevq9dyq1yudsa4rvkfhxk2f2hap5dmf4d849laoakrl7db4zdcb7sy9h6pq0ulkdc5zap2wkwm15rbjyqsr7if8jirw450dpmvfm4897av7ed3xde0wv9jmr1l',
                surname: 'n948kdcmekzbr0abjgu6r9d1eacuepr337x9nvxk40rg7f19fcqs8f3mc1wi2z364cm7wk726c998g4d26wnm1fzawn3w9pvsc4glaai70m0hfnnra9tdlnu4534qjccg1webprlw7j9621vpomkgcpbvei55rucijcwa0qg2vaz0df0rfpg3s6t5ow9a4u7y90wj43pocj70jgc8rmskljf66w4ap9wllidyykppo826z7g2pcx99fijyfo1dx',
                email: 'an03z65tv21eh27zimd9bhqed466aaav658iqzo00u31elxj4rlnca5lztsxa3ee5t6xvm7zoml9tairt2dymhvrhed645hxho09hkiochm7tb6bqm00yba2',
                mobile: 'ohmoawwu6c9csclzaetek15wlm1oyabp2kslswctcrsf0eymrimduiaw69s0',
                area: '1tjordnwjf3oe0essr1rdp7m1bgp515ik94sur8gzzoqm25kvyb5b1k24bun5w3jmuk6873n753e5sv9f5dx230w0bj3dwy8ptym2a3s1z2snfnc9hix34vdoob2d1k9xa63kir7cwbrybxl2kxkehacxhadbpkytfn4lpejg580tcdbxbldxflvxsmiqvedwdki6ahiphk5pgdv2ktm7w0hn89v6l9a83iqaxvq92fomxxppcsu8f3rz0z02fm',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'q83pk89onm86k1hy7g20l0kdtashhwybd2d2zvd0p86tln5lmim',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: '6ypuezdps49vbnup9l4w',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'jmdpeb3ry45ptgy1f5pmc3m26kxfkxckg5s82kumklwhfm2e5fzbe56fukispff486e1s84g8jwd5ld90v59ckbnrgflbvgv5y1y81ww2w9fz8jfr23ynmfdat6odyo65x7tkaiznnfoc2v4jppep8bn7zp6tzi79r65xb9c11zzt47696axaxu2ht4trm4lmu9jlhzkkpbsayb440se18kqzh2ig7ruc1qrc0satxy0tdu16194croyuignbh2',
                name: '4tvvebo4zcbyk94objbtm9ih2hsxuk89soi193x6mr1l09hyshf2ajk0j1scpp1zmnh46p0ra1tg265tba8o5romz45jsttzvht31q48695eqckv45sq4aus5y11s9yx97281u54xe7rsk0vg4rrxau8wmoydsoey3a00gkv43u08a2d0evfmrp961nbagrk3jquf4zzto0onxxcdz5vh33yslnlrtlsi1rj4zbgwv96n1zptgnxtbt79htx2z0',
                surname: '0qetvlrvrnpc1hs2teyfruu1zfuod92xb4837egtaoqixmnbxkf5cnujp085eblw0y8apv00lx4bqzytd5hiblhn8wus9ihuu7untg4casm20oa572ctyg85za1anxytl0ptimqf0fjmjwotr4ydjorcmutln67w3p1ok1zl2j9n3p1q4guljs33rzeatqumjwqg1asbsw2zqkj2c1z69zlda84x97e63ihzqahyd3u6u4zed1jxmqqn3gv27zo',
                email: 'srfty6on3uytw418hczrcxtw69ivwsqiv3xfoqk9mggh6kgyyya871u9n38xonz77t57ufcdxhewqw6ddx029l3fl9olah34hz5euyudbg2hfhphgu6rmi7k',
                mobile: 't4ozbmz71805r3vojri8n24v7jxfn9u5psxbgln8dn6jj4psvejeslm0ws0m',
                area: '29hysk4r35r6pjw9gshmf20zq0jkpei0ew9uzdia8m518aaqr53ka0z01ipqoh5s3p01x4ww98rzod5y4i7rlmd8dvu4wxpbm3qupvtdkomsmg0ons2zmwosshhd2km99zk7ldbzuuxhjd14mp2bcx4rz282edd5aajxzlmw09m410ptryp03ehnn5q15s2ej9i9rq787n5knbleaj6d4yz43uosbpfusa2ii50gmtddiqh95y7vtlzak71heso',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'y8orja6r4j43a9piz3griwpatdx2tw6ixobkln3wdyc2fh6ebl',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'gej41ncwokzybdlj22nko',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'yq4mvymjahzjguznboml0fkdn3f6fxuk8gzhwl940hogyrpprw35czcksdia2w2v87hnromarh3fm2x5izxtx4dgtb515p7ttt8rfvon7zp1fnfyopemhmnestfxcp8pn7macuyomfh9ayxt8qwcqmog09jfjwxy9icvxgtrc8zub83vle40mceeptppgy4l6q6d16sk7797gpyycj07tsp223dd4qp1n1bytzs2hkhna5d651olvvpri8tsbvv',
                name: 'btjq5ir9vlx7ymf23bdnkr04eehdmjblvb3br79v3l5b7njj04ylf3a2vvx3jprjfvrmz9hmgpytr7q28sbfdwad2mqtkcdv0061r4xqsljzwjhyapydk83h40it3grs1g1ikg3k240tctio56iymoub9mg90u5shgwatkh7tk7ugmf0jy2ggz1jnoj9jqcecmdrdi229jdwq4a96y355nor5usw8xd5s68ahen5zyiwdw0cm02q5e2rt6zrqp2',
                surname: '2beyj7e22omwtvwt2qs75z49n7qiw4sm88m6agrae3kt5eqrlwlmnh7ao6ikwmcezmya6ofbnvdlh2p0b17dasu5ago3fqns67scei0y3meosfymh24gsr9lyjimrgxusukhslb4raqc0nz0cc2ce0s9x6jyxs12riagqqvk7mosv7udur3fkb9ishvjim8rjso320k7s1fwkljec7qhjab6umzc3mz9cy3xpqymm3wuu6syxvt8b4a0wnv8ggr',
                email: '29myfjwai5ht1i18slpwn2izsdbf6e5d83ghjfx5scya7erdsfm9mke4zhrvm2ld9p3f62gw0mdtfmzqrnmudqeqwxymxz9sxykmk53kgvm1zqmbkaphrj37',
                mobile: 's2zv4j6osi0ezj65lr6asos9apm8au7wmdov95yp2epnahbz9vmjzguipgiz',
                area: 'y5rho03n45t386stogve3t0hlsy8tasbk3lj9vxxylzr7wct3sy8h2gfp4eoughn3iha6flxbtxd7r3t484arpxuj4xh6203a0onclt9fitg9uc4vy9z6gh40f8g6qk5ozxux9fqcbz9fdrmay5yp5eb9g84ew0hr9k00vz1rz2zrbeqzf9saqa3qw5zoe4yflztblkyi78rxf7460qb0s1y0diyjfq1b9v9cb18a0wj2pchmc7baj986hnx773',
                hasConsentEmail: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'nvfnv7rjl6juw1p7y92wmubatodtsdih5qv8x2k3pz03jhniel',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: '38fgicu5imfn5oz720fd',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'fhhw3gqyik3imq6u2ks6yin185frmxpcqujx44qckron4xzty51xjy60exj36vzq6nqin7zv6uwno9aor5f57wwiuo6mj8ey7a19sifc3wecnsa52w8l98hoch6rnu6sxw1i1ao902y1l7z7g6o8f55bt74habnlqldznby6qw2k73rovz053twuqzmjaa1eu8fa1ounukf4atthupxp0ntp0ureiiuquvvuzqtcmt3at6o80fpbqtbcrzte5pc6',
                name: 'ctjzxyfv5eto5iwo874yksfh5acbz736847qhc2o6td1592y05fyuaqidtvy9uqxfq8f8qrrc0o3a7z5vlyr6z02arle51k36b244jgukze35488oosvsjs6ziq83uci6e5bok2vduy0wu4gv760ehij4yis3t4rozc5ctayhwyfmgmvvi9h3671yi48sqx0a3bo7xfskrykw3pnbxtay8udmrmadlozn6deo3l8a5sqqfl6fws8f1n5376ksim',
                surname: 'fkdgj9kpdl65uhm7bg1qwnfyx6o2xlzac8x8k4c48gnc9h737m4v2nc0d7gm3fo5w62g1vth1eq2bt3fy7452pgl00i3czv7v6vo1n84wg08k5zzllrxiz1cbilmrljtu69ahbbrhn36zzrs1i2gpdf1g2g6jfg5r0vf6nbq8ewm3ekdodyszx3t3m7gwqpb4380fcujx35yuzu0ljja4uk16zndrf4vcttrlfxv6hrzgw2xt4nmecz2e990ctf',
                email: 'zbdr0wywxq8n0efo421spu6pq5209oyxvu3lbmfw4xjtm76jkru5eb0c7xvmmnu09c53p8sj9rdxkmd79i9mwd4qpe69b57imdn6sldeaw6n3a5ls0t528j0',
                mobile: 'wknmavvuis6hnmhij8joecve1g87h0qo2ti730znixk0fqfimeomatrxua7h',
                area: 'agvo4tdjde15x8blktpq7mi8qr3q4cgon6jvk3zw2l1yp13y5sq8h2hg8h7tz925j83jzuaxsmr1p5jigc4t1rnjlidqhxjo0wa87gl2y63axnoenwpnmgidwqgh38lugedv0i2gibdgxr68ttcf5vg5yd4d51ncngj9x7r3o30gphty24rk23e8hdp4jva7j28mtucebptl1wj5lthwu08yhbcwee6dt9104qhl3efysi8ms6yxl5q9txonzio',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: '67yxxsd4eacvndvjwca3jsqcncubsdmh11tozrczzyq5xyajrg',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: '5amyk9cdbd2sg56csqrs',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 't98jho324ikc0u33g161njh4v70bnvchxdb42kdqkzqusnewux3ygzu5ucksn7yyjtll1kgpkwkf88pt32uyqpbxjsuhw8hphqbv80u1j17iqm3rw0qitffpogz93d6kcdutumdwv3sry5m9urhsg3lqj8zs4sb8g3cavptlznr70hzn2irosyb0xkf4ssfd413afufr5vzfbce7vuaoxmyx2h12ajt4mr4xibrw0yd2se0tyrdb75j2gksw9va',
                name: 'op0uqkvmmqt3sbi5671l4qegobqmgxx8h50xz2zaf6u5fp0wu0rph88523hfhhdsdebfu5edksm7x309l1rkqwug5rqtgrt8jr8dr423wbcs4a4qnn00o5yr5vu20jugp3v8tpyhb0ce89r8ro9pp2tjl2i4ay27xne8q9i3pirt2ea55ydl1oo1n1koqwui1iho7myjgdl9jny27d6npvshpk148ergdgyhg3euwqltn8x00l9o1k93o9ssuejc',
                surname: '5b7q9jcyboo0c01j30jceayyc6sylxtvv6j9bdk9fpzdeum39hywaglj9a5402y6modzzx5fxy4aqokzsmdvnnq3noo1qxbgvzd4btxhb81dgs30msue5natnrzbd9csal7cprt6koc6sxkz3z1b2tk6ehqygcw50chao9qhojtrxy0zwud7xzmykr7jcyalp26eq1gzqd38rwl66hcdub3xaxkz76wzoj5inl6lox99x93nwrbljcy159bkc0g',
                email: 'dmehoczqc2z2tfnbacuc7bhn0yfcs4eagordekzhdraow336lyort4tyioo6lpt2aqjoasyoquta7rr104fh8kvrsar03v4kcktx2cf3ml3tg87kg9iapfnv',
                mobile: 'w9mr3puzglhrekuy0xxshc1iyyxp7ir7jk5ct99vnymp0iq2koqxd31lnmyn',
                area: 'jx3mcvnh1hfg7r45kmm83vybdojqnmkg4c4t72kxnlr0o8hh2b2ghvilx3otlvkdki8yi3w1k83yhx469btyrp1hf92r251kft1ltewzxzl8etls4glmrebnx7bywbpk2rzbhfoqjl9zmwyng6llmv62fha39exzzkzju0c4tgb12vts8dy6g28th57lluv74segkfysytd4lu4h33mu23rp1ssg8f8fggy125p7s8llarizjhlfn7ru6bf2k06',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'jag6fqrkl8koqosuonwnvtwc5ypzrfgx4iokrkvfzdiz729csy',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: '3ltdtgxta9pb51att5sx',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 's5czht04smraiozqglztwpngxyypd2tg5bikcqjchdh84vqjg5jeegorek0i3awqw29atvzecquemcb3yfd8jxhebd9xwhygfsrab4yx6z6ej2bv4vguiw5jijm4vd824mtf4wbxzjxfx00pv1v5bqur5kx37q23qcl3a5hc9e1rw1pojds73ex5qh3zqtsq7fag2wwn4elf9nep2jle2xe6tv04pyckwqa23fwqm0nu3nbup9w39fv4l3ggg4k',
                name: 'xghrte28ycxf0c3p8a42ctabvfcvu7ybtwv9vxrrow1adovmnajelhbm631axm1q0slamf6rv8w2lmpbb57q2whpiom1fvheujj07tlni8lthvba1lewtg303rx46hf9hly12d532sb8f7or3683nce385ymgo4b27ihpnzhllrrmwfpawnqws35i415cqrxyfhrhqr1auahgilpl2j8ms2nue17dg7fuhhn5b38hazqftgmmybdyidjuwemzx2',
                surname: 'erlcgwor72jnxqnoc15dtu3m3cgbaz1kcb1owsfygchcvmt8a9uic1whawa081fnvkoe8g0zhf146yzcpr6fch1rrrj95qi735p15zeqea0xza9y5y785u9vdgp4u7tng21nk9ay9jj4mc5ryupy9vnxycx3dk9vx7msp78g0z59ocu6lkjd4i2jjf2e9nyq8r6wspsad9tfqbdvjpvfouek0m8479e25z9d3yl7gg15jym2d96km92b95km6ygc',
                email: 'b6bo8k4lg1um1c37x0oz3kz8aafdyzzll1u5lhwignijk1xdn76infpp0pn4uafiva44sz3ip87dcxpw71smrii5x1o6l9ynp53rnp4bewdu4f52gou157uf',
                mobile: 'gaii60oxv484lfz9jwm95aoqoiz15rxtaqlnplpeo26xvda6k9nlaenovnay',
                area: 'jc2p2wykaicwwtvzq5rjebjvmnqcjg8u0md0ymm3czevqp8l8dbsbtprlb5twd96bivn4akf7g4le66pd2bueh5z23tx5fapk88ul0gdijlkm9cnsg2m1mot27xtmo5wls74ehffrph0vo09jzcofd7r8f4z00psi35r25zyozkb9bke31viv3wb43o6ch7x0xdhrhcuf768syxyp1xrr0ucxkixcd0z9i4blgq6ro6o8vzoej8je295ov1m04m',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: '9j9ddrz3w11bdk5u4qqr0mn4qotcyr8mzi0l6gn2xxcp8cw2oa',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'h1xfk9i6dr537x6p88u8',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'ux3z429svc29xc0qhts63ydu6wi3eqvanvvxfatsanueo586a0i7e3r890gcxhpfkvgcsso9o3q8telz632hx9hao1ai9t28aodk0vo46eh01hcp56h9bn31lqr0wtgzg1ht1k36f5qb0lf67mle0pkx9pmovpr5dafr4f6e4kfni8uhloe4hdorzgm3ao3hgus4r85tz6pa5m2pngrfap99orqbzz0ztl1s7cxt3fk5m3mteg2voo6xsw3i3nb',
                name: 'lmnamyhwbjsz3qe0x8kvltcoydfp2vyj0takzyl83an5tm4bt76zx8tdorpmc0jb7gmfkr2vktsw7txj25lvhy33xcngkbozj5jls94zpj1atoyf0xabrkel3s2f23vm5eqzk6upbon79k2aunh251k5jls86gf92pez35i75unbbk71ynemow0lfk4ydebkr19obggaxt9w4j6hocg19tew1dkf4cni71g74bmuf5vzb6y6bby0ye985dxcy7h',
                surname: '6wnsrimksbrttclsmz1q2yu3mofor4lj29e7e1t49ifxd0tp1wgmywaht1lqx3zb9v1no6j3p4nv9zw4yhafo2ku8r5nwo7tnupturj9ywnj4xus3rehjtgjzgwli4tyvadit2nhwv68xgnvg4kqy9ixkmycw74gyy4jknvq1x9z3ctu8c0g3ij2hmee5qjq3vud1owh9m0s3he9xwt1ll4vnsv7dfi475cotlhd9irdevs8ykxtvuooa3uoeqs',
                email: '7ui7hwid2gdg3yrmwyvstjl60mm0k8va9cf4mbjiw4x8b6c2nb1o37z6pev0f1tbq2nx9q42jdlkqxbbflwu4p2e0e6feh85674cmoe0zb9i59iq7p4bxzzy1',
                mobile: '5eqkrae5np6lrhabfiplcp0cd4e90m345u9gizi9lu6frut8msn8grdf82e7',
                area: '7kkilkwpogdjjurc5o7griiizj1girqdh2iyvola5t750diuqkrg8w66k812bflbqycqsw1sjwfvqh67dposnv6691fj1g5gojbk54x7tsh5c40fxqzznw4ke13oukyhwerui2hslckt1y09k50c8qvxwkb6c2773i9m1nrlng6leddcpe00za1qqqtc5g70ze2gzsrsfzzn7qgsq9gtehu12mp9ts9rlge5nuufdmnprm3filr0bu4c1w6r5bg',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: '22xbfcul9gflp3fuq81f7r2iq5i5dt6ru428mdwrqjhtuv60y0',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'tfthveb3z0k1lu12jbck',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: '45f74xubf7pexrxui1o57e7sigh84lm2nyprp52wwdrr62ay92a5ot5y9cj8c5plehk6n125dy2w9pbyyze7mulu6my6lyujeioq86a16pd8ky75n0jiauhms3546ed9i9ebzrhqpte4uk5ongns06qde8ofty80zxb2elvgg8p2pbu6h88r8n5xa1culg9da9fn4sh7frswgt3u78dfnn1iovrc6kt2yba4y3mhnek14n0sk1d2csezesz5eh9',
                name: 'exh5wphjqmcx7e4l0wskmz54rlp6pqjvh34cncd431elrzbxcoqo5i96byz3lue0dtm9xd6953qg5wul7z5lk5karfp761883vtjmbh4f24yhud8efz4yl963mhs3641p4gnjgsfdcv1tg7181bqqstdrytz236lo83nr0ot2rtm7h26b68tm7my26uexwe71hnk6dok952fq4kigxx63serhv6rd3vdmk5k3lfdg7b2zn8k69h9yngei9bt0a6',
                surname: 'zyxseaglzgq41f8myx79zs0j1fc3k1dcfbvitgp8tv3c0myibbxhz6us4zyg9ycu0t89vrnf2kwgbk19po7tlqypmycweg7fyponticis34mremrgz5sal9hkchlyswhjvufc0j5ikkeje19dslu8pc2o7kxp9afd9xpsag64x5v0990mljgb6hr4lbn9m7i8z3vju8iibztugi5jcd8hj98vzhyrw7fzw4xrdnxxk967mr9zsnhlspgkx0nzz5',
                email: 'ix0kt275agprf4dmr1v9t62suca05b3h77miwrqqm32xo8xfw1vp0sgwx67wgda0sgptvpt1oaa6xkfab86cbk6p1agcf93np7l8gn1fag6wlwu6ytb5odj2',
                mobile: 'ua5atxd3vzx67l0gq0jidtivsdp8183b72evsjsp8nxtrk61t7lzc0ogwdp5x',
                area: 't7kg9xs1gm2g745w9v50ajqrvzo5t3p0fop0iiycu5fkc8qm19s49ga3mvnkvsrac9tcdx6vx0z0au93dcbmve3gv6vku83b07htgvy0imqwlzq9yrc75prnxb09h6lg18zsw1af6kc53hv8uhp86qsm9anm64vsujrhnr1pcf2zpcjjm1y34s4cl30imq4cbpa1ut58w8onvx365zm73esidprawwx8bw2wbo781zyhah91r398qbnwyjtmnlz',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'gc4ky39z5fufpol6ey2q3t3sx34couu7bum4jzoo0hyz8wr1o1',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'iy0g0df37th79k03kwyd',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 's1oodu5ctxyzazcnwqkrcck5b6sf6nw6mcacov5nojvmbjp1xxdcmmknk0t1qci24333t4b3j68hm3qlawjb84dbpo3jd5v7fz8hw00mq3lt1yde323xibydywa4rg1utmj2c36x41nbddjyex9irorn44rre3b0hzwvy7usui6rzsxs3yvicbv3akf4aa1d2bytzseydadrxwela0881rs2o6i0wnvv1r0o9pi0hqnpdtc705umzubg9yvbwy5',
                name: 'tkqbeifpumw9x1bk23h53dtm4vmed810epdailh93mpejtxmtbmp7oiign6hmqu6l6wuraf1nq3mtrddglntp36k88g6gcw5mkdu43a5nnd6b5k9ovig6bsm0txksp0dp4b047r0sehqqkzlhwibtpzhwa1jknpeeq9jnco19061z6nh1v8zftjnhsrc8yay5y83qt62dv8wkdp40tvzf0ys8ur1jmp1i4e2ml6gn25vo03qy3orrgu56aangp7',
                surname: '5g4rjro6gn5t6mt4gmt6qi8dc3ijem6139gyiic96950wavbslg4gwl8rd365ioyf96z12p7ir6c88meulbczqfxct4z9ryioneteprismuywa9zjqy1nki8u2m2fp2azvztxv5k36bwgofo9f22h0p1byxsb4sj47wk4uh2jmvsom5bib43ctvy0cfqe9g2ryxl19vttnloi1bmpsh5w7zv98pk79xsznp4rqslswsdsrmg70ptof8wp54rh8w',
                email: 'gw4f140928cnnhkauwt4d8c3mgdiegbprn93537zhwobutfsbhn2qdclbr7p79zqzxpg9x2me0ym6v74y0asoc2vw8oqkruy911lo3npzte8v16y4oryk6aa',
                mobile: '1do0riyffziuhtout0s5xvo2w5s7bzt3c68onyk0zdqy2vplmpg5x0g5m47y',
                area: 'u522ya0harckwcwh7fujz578od5ysc0vipzot54607od780elt8b0dwihlwohahom4a7eond9k53l8pgvvuvlq4vddcb3vq1ue8vc27lrqxzkw1dzafc3z00y38yow0hqxaeqjdj2ulohkkzfi0gu7qivk9ef33kl22fz9vjilddcje7j62ooiz112tx6wn32lqlu1w7uld0uineoxjnz6rvfpn3caqugkwzizsvyv9krom53msf6hy4c2d6vqg1',
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'kw5l3prhbankbyw3ve18g8m70tg2ku8wt8odu1tjjqprwitjkd',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'aktwgwc2adliiy9gkj6i',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'sjedy2ceas7ysffqg6kv4c4o7b8mm3t822e1recvxeybva2mpnxkf4ca92b4bahpvtnc7v9d028c5otbsa71eokfg6101h4fqwej0tyyqeq0fyi0d3rr9cd90lexm0rea7ubdh2j5ura7emodq6iidm65o4ov85n0aaxhek1986zbq2pnwfiswckxmrgu0kslh15we8vj48h7fqw87d53ovzoqi63ccvzf4xq7c98fbyjphrunf9qje5y23wy1f',
                name: 'cozjea88bj3lh5i4q731cnyhwyvsd796odogjga1l1wmj55zce7e62cotsflxl27ohob2uur5zv5gz1obcdl001ohz787qrqiig0hdvpl22ncva46g22iwxu7gvn3nbcjh7258wbw5xbbm56oau1h3brflv1r3kwco9ixrvi5cd3onna9jli5uqeresxp1lruedf8acuu41jvv6xu53y4pwpzqd1ceo253edvg1mtuaf4zx7mplmf7122w70mml',
                surname: '9jkhboz9w7ydk51fk0h6jd8cwm6x3efod0lnhh8nh6zg6cvwm2dy5no7vqjfs4h5bvn51gxe08b8ld0zk6k2k92wblm150p3i0ges2o2w7xc4epl9hpflzzg25ucsxtj1an5wxu889hyzuy1aego3m9ungv9or2iyxt39nd09m1vxt4em1owbnzyfqm02lza2ro14x2x3t8tn4ghbfqq8w9ur36m7qufia4o896qymndno6svvnmqia3ivhifuv',
                email: 'x1urbumh8s54kpg4idmz0zuo02bxwb3lfsnhoj58zl50azdda8cm9tzzxq5aorfdf8n6ojuof1x6sbakokimhem0q6ad0zjnkmykshjdj41mehuo3wga6wux',
                mobile: '04lsq1jnxknu17983xlq84ujcql3yqdtl1gympqqc8n509ppzp7wkaoqff15',
                area: '12rnzpbiuxh2dyarbgx3qpgr705o5ypwy1ej8lmjwyfy5pohyvb794n0l1i7c60z4rttr5jxr9be2hc9ninadbuq0b9uhcsnxescaejzqhv62v4tjmlr8baa0dl0ukchv4myfawltvz5ewhbosfi6weqvyooycy7fwhix1vfujlukskgq57rm9b5li4z4w6mz5m01ucoudmzbiki916nnqfds9777pju23mknw95em7blmo482mj9ipwz9d0vmb',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'w3qrf276rq0606vcgkr5kmx64bxhrwid70c8i0smv7ezmwb8ab',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'bouhmrhcnubz3w5ftc4c',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'hj3qjzmqvb0azuy4db5qhgjpkdcu7y1nsjevlag8lshhdzmfckxr7r66x75ysj31euoxs7k6e0kcu4bay33xhn2hmlfzyj0r5sg7elfij68ls0yt64mf1bohs5sghs3mko6lyazos3mhuhhy2qr2i1zg38liciufcz84lz0lzt9yjp2yie1cxqprozlqv5zd7xoxikxf4lt4gz5w3vn92f81rvxvffewvdqwbj8kk2jeodek1jimcgj47h2p0gp',
                name: 't2zpgfk4ggossqrvojofih8jupotw5kvfhjcg0rjav61szqwehc4t6mo37y2zga9wy6m4ilmb30rcfa4apq26nubottayqev8rxczsne0vhgdp02mgrpg98kbu824lyjyw7tsl8wihdc0zg4chiwh93spsmm31w6og4k6jicbkpe5k1r5u1p9o9tuwddp7vqfg9cdayxp73vlb4l5tpq9bfm6m3ts0n3ykb0jeevnu30fhp3q31o9fo7mqqszo0',
                surname: 'c0zehwaekz1zesaq3rwzpz2gb86u5io9jst35ctf5ai2npslg5o8v4v2bub4md6993r8awx24aah5f3h6cxxos4x6yc6irr7gjskdxsbd81rxpj871txf8akjlb0njw2qvaau6174x7uk52kjrolhvgkd8uiz588ds71z4s6nq69p9j9yak99265td2wo7di73bv5cciwzqk1hd0urufel73isnd8sxc4kdnnb71lvonm94ives6jvkmob44eet',
                email: 'gvdf3bt2oi0zo66m8i8xopkb1rc4ija0e7dbkw1cgb0e7g216dce6lw92j2ny14uokcw7knwut21fjl9rmoc05g3gwrb5qqf9qjnxa4ugux1at6wavukzboe',
                mobile: '2tfxjpk5ab500difdf8z3214lgxti0te2066x3xrfywwp5mkkb5qqnxr8z1y',
                area: 'j2p30rq880qqa03hhjzpjt3b9qrsfg5c23x2jyo6bk57wt3dagaze8yvd71hoe1rj8hdft8cid2aq1w59neufebcsak2yd0wk2r1l8k7x3pb8shepkw3nfoecdo96cyq5f4lnmbcxcxwp7u7azfla5sigec1nxwhd7ton2jnl0tj31u9luwnbac50r98vdn7uijovt5dm8spajv4130ndzbk3i1n4ialilwpiv3076hydeffziqzdvfi3gtwp8h',
                hasConsentEmail: true,
                hasConsentMobile: 'true',
                isActive: true,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'g3e0tgt47r6nuw4nao46gki18b1qv1udccy3dbuyg3pr35vykg',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'p6ugjm6sw6pcyxa2j7ca',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'onfujw7i1a1f3vmtmbbeho1ieo1wskilpnpjnh0dojkga2j6copbk2bcjzerfhxuqgmjeuio5yuxq8f8cvedpxd6i4nz38okljpzckn1ifp4oilai6qyr4vpx37crw7n0bt6vcvb5evdxvuclx4mkyisw4qapbq7h9gsrfonpiz6wraleikvdzqe6vilq77rpweeg8ath44p1x63impo5ah5nl8sczqpc0ksn4svfg42bfghrjs07vbppt81j3h',
                name: 'bcytnd2pvys1x2q3u4zm68i4r1xovkyqsc9i2i2mk3tn8f2bmqxyws2e6ycxmkkgzqb508ornzp0ij45flvid857brnandag54h696kgatldb0nx5vcmvz19tv098latt99o1tdtrh44b7it7j0n5a789apmmfs3lsaz4fedkefbahnpl4sbm432nv3xwe4p6u7leukjh7c9f6cvp8ijsu5uk6eotnjxxscbvnhr7hi82rlithgfdsupba4q15w',
                surname: 'tu2nsmxyrrpq3r5grr205yd0mq1ei2yb83x4p7qv0ullhe1pu4ar3cr5pze679u28skgy36slwtql0sm8hxagvz4phwrsg7quxq2yuqu0s9dz8kojrlsdtbv69l1xll9qw5wmyfrsv0924czu2e0oaphg1hkgczawa9s8rbyr6241f0hd5806bmzu4tz48c7toohr2zncyhhnwouan8sim24nufzrg47op9wxa7bk1x4a52vam4yzpcc0n6vo1w',
                email: 'jdn7cqaakq04p5khzc0vu4m3gp842dnai5vc1xkzvzteqg5f849c4q0mzqwzzw7c7pe1f977601lyvpqygi7v7kzoz4zvk0lu60agdhg3neypz7omebbpbos',
                mobile: 'mxurh2uxzk2padg36v6wq918kcf55e0od4efydrmtd0xz1ivfqgayf4er1hj',
                area: 'vth07n845csf42f4by34527c91r93v5bha6vgig7z2bau8b32zp586jn8bjn6qe9w5kzonx66xlige4jn92sw25n65v9lq6vi42t8zu1tc6pzkdvoobtzx17q505339ef94yj27kdwx072h6p4e40ynmqw6xu263j8owgby01tp1l4wapj3n9b5otfjxibfz5xt5c1nwuvq05z9meh1fdllrsph6uhickeja83jnm8b455kcnrwd87ri29xf40l',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'dquc3ws2u66c7he6yd3hvlgegiidqwmo21dskcpn7xs6hnks2s',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: 'ohjn1zcy8psk4wq0rtuj',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'jxhzlogqtf5tnw4w0pi0xbrv9rfezvsmi8pl4aha293u5dmop100776vq0f3zunx1dzcp446bt6eki8oisufxjp5qnbv5r38xx52izsrro883w7wci7syse9fwn4b89dbi7hkotmrkyhkoqekvqw6c23jme7zr9steomc4mitpu7o1qfeia8abpmwa6o5n04b5c23z737dzb6xcmgxrt27lp0mz2wwm1q5lew8auffvqwv3clfekv7nymhp4bgr',
                name: 'wixic2tvf0upbrsrne9flze9wczsnjeohc55wwasv6ovy578dv0pyo1anzsq7lkldy4qlzufndc92mwmot8ml38l5rxig9hrnxfe1vbrk2suwzdxusm2w639m4xcem4l4wbgcql4h9gwegwfo84mgwab6e0g2lfp8dmhtk4p0tlhljrz2v7upkqpug9l1xoyslv1wrej2qu8rzylscd3ifam01dott19idthafrwxb2lsq287yfb33msih82aou',
                surname: 'h3wo7e7jp4p68uv29fv1siqcu7isf9jbvm77cjxvf5lya0828n95bk0b71jr7ffpiuy7ta66akhsqjn7r03cn7mnz99keekgx89inamenwtzr5utivcentjhmbuu1hq6d9a0iwd3kd732r9kw03qageguikkfjuhjhl1j0c69xkd3xsbb2npeqw6u80r0sdkg8zo0qe0rp1h76cli69kkwgdan1bbwwgfyqr8t5qqkd7414kbvrcacxvq6qd73w',
                email: '847bcxaek39xxuqza64elmxpn5c5npfxgmt73opo59e5qbm63w868nbug34a2wt1dehny5kou91fvb5c3usnxau7al01d824o9ofpoz2d8z4f2zpn4he6g2p',
                mobile: '8i8w9bvz8k5zyb74slbzntctegbh9bux1szv5u5mi2vog9tx1ku1tasgf8lh',
                area: 'ea1f88lq5swp5p0qiv0y83grq5165zz0akwmbwa3fgno0q5b21tn9rxkmfmsap6v33kdhvq7rqx9licwgryivu7yhnhia1ghljxq8nc0sbj6sy2mrus6yct5qxxx2gkjfshbyg7w3v1v3ke5yn89psvotf2vstk4nd091gybwmfjs2ha3rpkqejcp8k6ter7v5ux6wx7ljw2kx0xud76i5g57ziq75nidrpvrts615o9drxx0ag5yi0hjcn3kio',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                        value   : 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'));
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
            .get('/bplus-it-sappi/contact/dbe69f0c-cd5c-462f-a0a8-9272af38ae04')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'));
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
                
                id: 'bcdbb9aa-709c-448e-a96c-b7a46e8231e6',
                tenantId: 'b8414eca-3d66-4138-9dd9-f2d6b561f519',
                tenantCode: 'ovv75o63rpygnjq2wt8shy2wg8pf0nefd8uqstz1cwjpvq7ngu',
                systemId: 'aa0659e8-7cc4-4714-84bb-7e6b409769e2',
                systemName: 'b3sp2fbran7r3adohcw9',
                roleId: '19ca3d6a-168a-43bd-a232-e1226bff08c7',
                roleName: '2ck1nb25fwpxisolue86pen7ni531jhjydszlgwzekov5dan5pzfbbe655owozvt3oh6i01ybqzlhdbif0yhebhyr02hlqw06z3mcevc7dpu5olkcaxvqsxet8ivax3pmosgqo3pecs4v3171nsn72dypnd0updp761vmghu4mmckxcuh1idxi3o3n4br61n4ppq79m1c1fxapjhg0uwrgqgz8sh9trarg73wjk4vafmlfski2i8wqkiyce3w53',
                name: 'ayy45y3ryrok37rrg8h9ecq9zhyn856h05q3v282pgv251s2qmqitdxgeoldila6kwlibecuj7n0getmmwoqzs2tkej72ql4r9cwhibpc9ydkika775fux761gzzno0w0kvx2kdap8l8c9opvcjzljurzdl0i6dyelg27nf63vvo0s7wlacghuwecex0a89o19ug6d1it9mqcfbayoo14ftfi4inayfuydq2bbkt585l4whxm1b5nvzffbfnwgv',
                surname: 'v08pb6lvc3qurjv3xoty6x8r5u7l1qig1r1zu31lvj1pur4lydv0d2d89g9c62zwvto76p39yra29w2t5b8uz3smbd26hthqpim6u94xa7yhhwxy08sttfz040ztr08vde4sf7404v3tklszfh0qso4qfrvmtyvlftk9zvgh51di8qob8l1pikiqpra82je5htlsvzxt2ee9o63l670ps68zn7f2829h89lgrvxpziph85egkdhvn5li2fzs9gb',
                email: 'jd81pd053iur7hojlk5x1pws0u96dgiymqi5vsguu7c9kwzttl858c06alabcafhivc069wx8x1zi28m3zd409hvip4oqyjqa8thdj69xvh7zu5s6trfvkw6',
                mobile: 'pyseyrbkwpahol7dzxeo5mb5qlt7848nt6gmsz7fqm4ls65z3zm6xtivwfeq',
                area: 'z8yifxdwdeulmgv4k0lqbbodlb46izool6ugp9novuwb4am0huoflv2s94pg5xn9n959uurbi9eq954es0noaldrguajc8z71bqxg0kck5lt01a906ux3z4g7fr4phxxk0qbq3kn7nsmr36nuxrtjgqervql946q6uaxjn62ja5fe9l12vdzk28nhsabvpk7u578krqkb2pd71vysw7x9z6lzhq8txmnninjkol95azxd9eiq6t2i8ccwhavua1',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                tenantCode: 'so7k0dlo2uumr3ovgphtwlqgx85gbvh18o8ag9u2tw9h7d8w96',
                systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                systemName: '7kxmidxbl49jm93u3ljx',
                roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                roleName: 'rqtxhwqn24w6mcoc0vjdlvvh5zqjqkkuf0nvh3hsvbc1z7fnzz29zt35qw6suf2isiqeu38q13cq6pcc99v0pvf9njc8zjndsvhromzwm2q1h3uaptoym35yqj1p9x9vp6fcgqle620a3m98lnbmqhxm9yt7t1rnfor78x5pyrb8himedvg8nbkudhmobya0ncp22t28k9ycp23hwt1zns926tkrw9j56kaj95re8nbutsowy524nm227cuao24',
                name: '7weu0kyskw7qvi7wxpta8bh9qh7hzfi2ukrwnu1bx9bnr38sufkoohtxj7tqj33ffavo56ccrs6wkgwvheauw06w1kxaqtz5otyep3zxih29fcfnudnsiloofdlomz4fxz0eixm55zpspqnfxoh1bee6bkblbxnq8kwlb175ywndehbo8p69d7kjdnx5r7cuzga99g0xlybfwzbobrkm746biqrn9nvaucop7tn0qo6pblkgejqud6infnriruk',
                surname: 'maoc6qr8lzxnhflye9644m7at7epddyxtxl1gk6ewkqgoqst5y7oidghghlavc1fnuvm5mcl9el2ckdmc4gzyzbkmrj8zw7i6u4gw1v5nw8mt6q9o6pvpcl7qg2kwbsa8w272b61x2kknlkvp6omdlwswt5mizvxmxl5issbrxpy4cw2tsg313bbvc5g169pra6ouartytivu7zqpk104r1zu1hsk2u62oozev8gc8nnw6tw71kgnw8lygg3nyd',
                email: 'qd5l6i5k8dadiyplj0romkmnd60el5zc2kn9mt0sgpi7fm30i9lgqbsl8hbsh3ydp58nrn871vnsp9qeptzynlbxk9jrn4bhnjmwasdxsixntctsu7o3yx18',
                mobile: 'b4s0jfxf9uxcz73qksy7svxjssxicvcci39sg01oghc2vvkfb6qu3ag4tmfl',
                area: 'fxtnqr1aowvno33ncc5kgnk9arf0nrvtljkehcatbf5ahmaka96p4tq4m87tj5fglk6wkxxunqyhlf7odo06vpr6gjaq9kjjiitp14egc7nbaf21y55xqo4ld8m88cdt2k3gmomtu15j11flzus1p5aosg5sfmvs7jbsigln90x082k9tnmwlurk410ne18bv0zh5or6ru6y198bonzh6o2kqhrkpj2m5fkhudlkjh0bwfp3ipvmul3yip35lp4',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'));
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
            .delete('/bplus-it-sappi/contact/dbe69f0c-cd5c-462f-a0a8-9272af38ae04')
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
                        id: 'b78f60d4-6a70-4388-931a-ee6fae7bb3ff',
                        tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                        tenantCode: 'lrw6pp23k76cb6qibvuy2f9oeustfiso4idbgk9xvc1vvqwskl',
                        systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                        systemName: '2ddjx0kd4axfbhwpqivl',
                        roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                        roleName: 'xl7lebsihn4b6c6eq0ee94ir06zdjcv57enzvlk8fdqu0ahwxln3ll4nmdz0qv1ws646wnhgxupbvgd0c9lbwyg9mi1rho6pcn60q9i98ujd2759q4xjlkyhewd86206jleiwsaerovq6x2vq8nl33b6mmyz1uvkkygqobmaoqaim5v7mekav37u2sfo4r6osaf6d6si5u5uo582duskridrs5qtyrprcsy8ws55s40mr7yffemjewpncks6rix',
                        name: 'f0w82c3ui1opjd4ecwfi49c9v7b9a21fbwzuu5qvod9dcbmk5ut3qknndlezcmxocf46gb3ldi90mik73kupr1sa4g33czo90f9i6k4rvhxz6rlak1832g03cv8gz4n92r559v2ylcglz3lbvlo1z1q0tsid03hjjmvot8lim53vpug22yelht8538fqvv3k5wndj8d4ahuvr1qx8z04xmpom4nrns6xdbtptw1a9o40bws8nzvsiy32ysz9k37',
                        surname: 'a4i898x46we6lws4o4a1saoawi2s8vvwkqrhk7x8li87s56pirakr4bizroure7wnvf1eduywxqty1j7nxr21ayv1g87jjy0exvh2x5xcs1kjtn4c7ckjfaaku7rf721fpjhmc1bvjase0285cschhhzgui9xeod7jbowa2fhc1xjhjmocnn3chg2o8ujq4xprgeha1tyyeu215mlmzowjugpv5z4pmenk3m0bqbizm59wylk95ac5wqsr8xwt8',
                        email: 'tkq0r2w0spcgnadtans5kpqn0h6z56w6su7zk6lyi0yx92mz4885gt3s65nrwa1wdrm6xxc9mh1cr0z7crpmem0813x69ih7f03507pha4hv3t4xq8fo3azo',
                        mobile: 'osy58orzj8er0hrtgoz0fa8fefbi6k4wh60ofb6nfwfu58t4c6etyj1dxjzd',
                        area: 'exyx7mc3eid451debjkmy1235vfr9ostmaymfgytklvuc1za0gkc5bhb0cf42zmi048nju7etxdpz0julobq0wn0jvd328noo5txgvwg5i4oj44k3cnbxalcjq2orprbsqlxxgpg6fwwx957qvkkphwaky5hw2dhovz22hzdjk8dk7qd00utb9een34hv6s4n87ixuw93kmlbx2uerwjcwqfv3m55vs26xwzl4z5xoptituc3akji491n0ymw2j',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', 'b78f60d4-6a70-4388-931a-ee6fae7bb3ff');
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
                            value   : 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('dbe69f0c-cd5c-462f-a0a8-9272af38ae04');
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
                    id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('dbe69f0c-cd5c-462f-a0a8-9272af38ae04');
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
                        
                        id: 'a21730dc-71b6-4d1e-8f33-277eacca726c',
                        tenantId: 'c53e0210-4b90-4c53-bdca-bc0710d8ceda',
                        tenantCode: 'jvulbwhkfzj2lhnpor5eji6g5cmlj55o2314afcjn1etr1ihz8',
                        systemId: 'ca78c08f-f3c7-4bc9-9d81-67a46e2f658e',
                        systemName: 'awj6lui0x4891i83mt4t',
                        roleId: '88bd859b-c1c6-45ed-80bb-54a05a0d4cfd',
                        roleName: 'flpjnr9c5o9cg0mpif8wrjmb0qyk51rlv1m8zm1lrz50krn93zg94490ybs3epvlkoic38umh6t862m06by8b3nbo6f9nom7fan7zq8guj28mp7d3a5k3plil9nqvwrbrbikeojhk9gpid6uceilwbh37tq2u64hjx0r3vbasin9feklxv53szy18qclfylcme9cortev9eitvhzh1esdcroejgmaif8wawrjrg7oxw9furfo1jy1ee8cpaquem',
                        name: 'vyshmlpva5n8s53231cfqw3t4m5xh18006bmdl8jn97ci6owayvmpitee4q9vit6ecq3gste6fjrgqpiskmwoz3map22wqjupqfbx7pspm22lhjdl0dyxf0lkya5wtvl3ffbotez2r0p0yrhxf320ojreordlr1b11ns99ko5hclne1wpejr438o4opm4hjd2j468v1glkladf82uhw9xwogtpyctdqeto1gjkg36wi6gs6ukhs1nbhx8tjruw8',
                        surname: 'se82t6yr02zq79wjfy6m4ycat7cglggldqigmw84kzhpnm57q70h7oyh8e6xo2n471ni8szy75xugyiuvskygb95lcd5i5fmfbi82pkr4dea3jywkrpuze5qtqs1xf1a0tid2h5nh7qbtqtf27bfm1gwx2st24hwcf47exklxvgzoelo7yltpn8atq59hv88qdalxaia0rv7hb3v4v0vicreta8ex1y2hrx4rpnxj1ok71xyevck1160v9kjmfk',
                        email: 'whyk3a3lz1l4vs0bs5i26oqnhhew0rsyh639peb2cv29h175137bpdxhl3eu5sdsc5kosq9ps91e7170xmbpbojjnxyyp4whdl8o0faqes8kfwidlwcswkqw',
                        mobile: 'nvb0erqjg40qd4bafq8zzw2156q9n202ah0igewxii4gx96zby5gjj9sjlpu',
                        area: 'boz6ubbnkfonfupojcut89khj294qkm41h3a4jqvxv7c82x26iwspqb6udlsjrsqo13rtsm6a1mal4j9172d0ddso8nhvhcj524b8pcpvqnqzxzzq5srthun0jelj97ytm7s4313r6ivbje1oe5z1tglf2zvhrc6kewva912w1voq9mg5wn0wvm3x0637vg4a3n8649chkhet72um9xcj6dst9s3pj1gzs4keq1e8kwkm71b67ah9c9ldusu1r3',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
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
                        
                        id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04',
                        tenantId: 'e2ed561e-a846-4579-a079-859eb7083e8a',
                        tenantCode: 'f8hxbtyr5aofnhnl67d8tuocrjqf225sj8hzbazmx5ma984qgm',
                        systemId: '1addf02c-db2e-42ae-9206-9f7f562cdd3a',
                        systemName: 'lusy9dd1nekn7ye87oxz',
                        roleId: '5f65d68f-3728-45b5-a879-076e92098219',
                        roleName: 'x5szmksjie97upy7e0vosxe17s7y7nvdwq310b2ucm83ypm8ay3hvejaaz10yyky4jd4klq9m88pgd80j4or667wdgdy19l3i4yk9rxeb21aoe0ijcyva8305mecnwu6oi9n30rgbhkk55nwbgrh8pbsp6k9jpn0nvjyyeh8dlflo6il7vxcp8ado0ga46oqpftjqjcib9rjwbpfsshnx3btvg69ykop49h86xc6kq7axoz96v4re71u1hpli1b',
                        name: '4392jkfs97viwfm8e0j5v7zaw5yujodsinkcsxky45dottjfxiiyyymbddeaczxl6dphfu7hokqfor0gwnznmqk4ekmglacxza7oscgdqyk6kao4jl2vn0swhw01sqx4yhb6wpnu9cgcfpay4525vfg66vprc7g0zyep2bwuaye3qscnutw0lq05uesfg6irwgx5we2vdzj5oxhrwzqlhc3c5xqv96jzifnc60rsqu38bz9uh6t6e3vr6km7nk1',
                        surname: '3g39ppfbykm5wn42nnisu15yzn3brd71s3hncd87zd1j0d1jl7b0farptbes05uenikoqu87gmwnmq7odnjjozfqc3qxt4x51onhoz6zp0nbb473sx3p37qynpjrcy0080dw5hyna6ea6aoo3gtraikwcpr85ril2sgqyd1uhhpzi6fonsyshp9rxvyaukwyfpp9snglfzepr23ad0vu8o8moyw30yvhy2pdxdqx5v2x03zlvsyg6xahdeugm8f',
                        email: '30k4nq6t7utb1vk1f3oykecxtrp919s75dzcb0n25ffeayoov6vg8ua5hz1z65oo3orhaqylv8tp9bs4p1beqfrfpz51df18zmtzkp9yo2q48d3kxgp10n2o',
                        mobile: 'xhl3r3by79ovsy6jmuz4cvoi90egekg740jfo9d3wl1opj0je36qcsq2n0o9',
                        area: '2ogg6u65lvpqsiafzxhy1emq6ztq6rck3ysixs38bhcc2rwd5kf6nq35mfagod8zrbl8dpzy7px3owehha0irf5n2txw6fxdzxvtzdocchkph9gu8l5gwvcpzwmdwmetc3tl29vl7bmhwa0f8ndfzaciiwpza3scsq3vaxau48dubynajbqhlo5v6308e994jtdgs7k1voc0vu2zjat8lboywpzqib9jne07mhfah6a99nxyxvlqbqrlhk71lx8',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('dbe69f0c-cd5c-462f-a0a8-9272af38ae04');
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
                    id: 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('dbe69f0c-cd5c-462f-a0a8-9272af38ae04');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});