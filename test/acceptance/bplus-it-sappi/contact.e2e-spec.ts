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
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'hbt6kgy03ps7o6hlewlly31xbvr0yqoc5iq1urssct7dqsz16b',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'l4u2zxhuecqw7rs7r03s',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '9019t6d6e4azv6meph0w3qihkk3rosyloylzqie9lc01swyphx08vppef8n0sn5tpomzfscwl420gtxepzsn1qm720pam6ufmffbb367kthmmvqtx7nobgyfca4u3b6v24sncgbw169m47m6t35xzklun7yyve6mv1bm86m8i99jz9aaw294extq1lx9x5xz09weopqunj6zk14uvnk312lwqs62quv5hraa1m8magdj6jbfk4gz41ruw6ysvg1',
                name: '91ora6goou0agdd11u0fh04pqm7l9ppcewdhq97fvw6144d0vgxfke6suqx0axmbyp7sm2hpauz24dw0ownhftttvp970nhhfjyz84w8isxsj0ocp5tiomh72mmn3vp2ityryo8voulqpgfyb16tcp0rmyvgsiwf7853mfdv77scq09633v1de4y4ntlovg2h4fsr3fe2edzud49ms9lavp6ixqa70e3x6l16bqdxjkbmcyulmah2j803ws3920',
                surname: '0yvcbb1sxfzl8m78a0krxmp5yyykp9h8066d3jx0bdf4a0j4u05t0x8g68gynq9h6sfu3u0mj5f62lyrtje1hjkxqnfmwti665qsdto5hmcs61xiwsl1zj8bxm0c6055wv8deje39egjbhu8huyxfhvobc0idjejoqsoceyd6mpww0ez0rwmvbpjptmq5cne14ydkvl46gw4h4oviny3m05nagvdtovlmz2cntkbu374rw6titsxei3pyfk7sgd',
                email: 'tbo3iuex0zvadb2a5w489nnccmgrimvw4d649yjdl0tzg6khffscuapd57fmhkackkshlc2wx928i3j6ahwqk7ma73ghznf0yistuz2o0utbcwmbdl2iq3vf',
                mobile: 'gb4nh4nqjlmxksl3ufcpvef0ze7v5r5g2z5r0mjzty7wauodq8ai0c3xjgux',
                area: 'bih5trr8yacwmjnhqpsp3cv6rctj0k1o3egd44x6axudi1y7wdin1bugeaqoig1tcuyijwt9qno1sn4fj40z4vfk9ro6bctmwh5avfq2gwdj7151rkb5y63qnenf73w78f0hvc7hasdqdr6tlz8uxmtdmvp1qsinvdfnsnfsflv2lny3o4nbo6gpkma8f8n5xvy19fssgycua3kql32u2b70ahgi2z17u9eg74d140ex869djmp851r3l1jqsl4',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'yrxzxncbz4mg5fagfqvbhdawk7mi77hbup4syzlti9j7vnk43i',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'ffgpqsv91wq4qimu9fx1',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'ynrmuls825kifyszji3e1kvux017yb3le14sb5wjny4b60mo2engbgeb2l89bqug6rt5629t1wre354cru3dkozeory9qlhcl7rz4cw6stb6qpe4to4mhe2g05whso7l6zrfz6r2e1yt33uk8uxak0j2xicd7q4g4pszrvmowrf67cut30mjnyqd6ygtvy24amhf3xhe9f02kwqq4j230dvdwmgpkndi7u12oyq24xuv5zn6he8li8477m8n3hn',
                name: 'zlp65dq12o12d1wmut84yqhzee0m5we592mez8kyalakurbg1gfs2jmze6i0zpllah58n759ubf92u5sw05tt8xy85tt31x8iq511ftlli8gntnbixn44rmlr1xs68m23tyt2dlnjnl1hwi5y4cqst31jltdma9syvjfgm7z3re60kubfji6mw7pc9vfw03a1k3512kbrg5mvzir3hj0o80vpcmepk5i4hs8spqw0jbgecp7v309qfnjz6o0mir',
                surname: '8ar64m0y3zwktmdyjremh42x4h5qx4z5tt1yt0ugeo48c137ioq9uvyd06u7ecg1o9ecti6tqzn6bwhjhtw5picc7jmxaqld3wpa5kzzrqwf5hm3qfo23qnpm3nsya7ero118vanqo7tmpp0gxanl5f22kos79zv6ct4ytobetkj293isko1opaoelzfe5ld388skkft1hwn9frkgijkldgp31lixq8snavtbi0fu7irjfrkmg5gt5finr69g33',
                email: 'er2r0dv5cyz6g9p197uzsq2pgqw6gho5edqvn91npetwkyglyfm5lax0clru91tek7yj5ni09srmpspwn8wz7pzccu40phsbqf02m9s3rqrke9x7umbxexan',
                mobile: 'j21psabzijvw20oa0jb0cvh86ao0y2vnh1m5smdn0ru5tsbs6mzhxqzio556',
                area: 'dq9gob82fos9a4fxgqqcvpm6lq5hcc18s5nt0szwadzfs2730z0agk3qnnhzom2h5nz0dxko3r83k9uzdf6seru3rolgniu848tyshi77xyibguldiak3f34jhn3b60r4kjc2gfyenteqqwthl7rgb73bkm0l22t3m6238vdscjhflqwr1pktiphedl7dknflkzq5lwqin81e115yr65x144nca41jocfgf9etx9siddh5u07l91pzch5rsk28j',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: null,
                tenantCode: '4dkzw8ki52dv7iauruaptgs7mz4r48bw4feli3nbc04b40fcx6',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 's9ld2z963xwe8c3x0zeg',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'hokg92m0pbsr2os3w8cff8bkq70oxddq15gqq0apkrygjcvqr8vf5qqilijfhxagkaxmj71u5hm446z6xqm2736xwcf4x94rumuv8muau8ab20caa3m8ob04j851rtg536wgu1wyew0tpggu3at0yclsujnaul3zjml63cnogx79wmlpy7sxmtq8g56qi8jkdtve03bm6rwoyropr6eqbh8si7icjyx1bwdmc429ya9znu026z5wo2gj8nkw25c',
                name: 'x0v6s9ouy85obf4c48is566xth0cuvu40w3dddm38rbdijawu4cj27m9c06cr0eg855qwokf4eqplvb5hdydpaqqrje7ak7wx2gnuyesug0mek1mjb6dtl1fqivsbte8j54p7jhst1qcmerfu2u0rvna8tjhdczm8d930lh3idcvihijx7izv6us0fmswbn7cl8brdmi68n0opwo04dyzvhwgnzvddmq0arzijr03akwp6h7fwvhr3uapcz2nci',
                surname: '9uh3rjvu99zavf8ao4a69e2ufvef7gu24yl4xi530mmu51yl4jhyvr746e76521f59u3qk4t5gbp3fx8kdkx0hgm9pru0t2dr0k4q2dzpcmu3cwfojsjqzpoo8mac6i9ymja6g4vw9pljeq1ts7e3nuqurzijs9o6asjmj1b40m5fnibfkdmedztjxaltcyyyczenq6ary5l8dye2gqf9huve2ga943yspl3ydha1e6nc30p8gyk56gh7jhk8f2',
                email: 'ocuaalzbzg28mo351qxd3oei14cfsx950915dlh8gyb6uq2zvh55m5rkvfanjew6f6y7v7ez2qpm96xhdn5hlz2y21vk6gtjxriad494ultc1eip9lywq8b4',
                mobile: '7i9z9g5rkgymc0fjonpilse593sdjzlao5l4onw29lqz3ry8tn4xza011zvp',
                area: '8dm6ieppouymwh9sv2ceqe019teufoinrnhvs4sfixtjvvhr2a5e764tp0voo0mw2yo16kurr1puax8u2w3dxoie2tift1by9k4td85p1heej4vtiuccssmhlxzhsnt409wtzpxp6c7zbtlbk1pbqconfeu3fikoudmooqbfi153i8adrvbt9zzbxb2khnwc8h4qsmdwindys3sg1bb2u9q3sg4uxn05tsgwxhccgcrh1bk64r4rtmbl59d6wia',
                hasConsentEmail: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                
                tenantCode: 'iqejw3nu50f4r1svjuhugo5tub4dbzc0py5g7w84kgi2h69dg2',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'bw8g6ty0cb4da49f5d12',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '8lewjiw7uw9vcoeq0qsvcrgjd8h7es1rx7jgnky9lhwthuwq0dm2dwfes60w6omogm0i2qn3dtmvhefdijri49gj0u52lgxw2xz88pwxop1ktmxyog8nyiqwfr39g50hqvoo45yrlnzg456674p1jqf5zf2l3yccrls8x5i7cv81hz9dtim31sxv6alniwsbz4yee6nuo41728mnbwb5dil43ksqsi57vg2wmip1psao9rc6zjbwktwnbnd5fbd',
                name: 'i1flhjzfuq90tyzvkk5uoqosh4e2fqve8zw1vkce99zu0d3luo06rscge4sbipxfrnjbt0sai9iio4tyjloq3jygbfijot6mfyz1njhw5giuj2trwp05phfvhyeqt5mk54r60f6u3macljhivvt4cj3fnvkduf5to1wxdwomy4jrwstbft57802cvyfn4gjof3ck27zto2e3e29ib24ryymkhlabu7q4j5rwqkdagx3jxel72xf9zp6ink9tvmi',
                surname: 'e6xqunelojjc4zfx7g7e6jbc89cm9xlngj0dfagxjs9288a1gw6rykf8pv19eda97a8zute43y8xw3dd0mwsfwiy3dcgruor1nj7onbvvcylmad10xmop3vlkpsncc4sp2vp1su40sxsx69fcmv617e2k2y3vtqnzxhlq2hia2ux4s40nb980uxjzz5jzug2k48vq8hr1x0xotfe0oqck954lvcl0w0ptwh36kii8yk1wweesq6flm9ik5qtmv7',
                email: 'm2ejtpmp6xc5799cba2brb7mxqdnsnp6au99rp09k5rys4d5ulryshcgqg47cd2d1lu97gtybhiyswl16tae42c645r1367r9a2a07h20fvzokxgubf71i4e',
                mobile: 'xzentmzbxav7xprs0iwkl7kdhojksv7pxj3l77j48jrg8405vkra2dosamrv',
                area: 'h5u2avnk6fofypeuvec8id4pf9tppa266zsox6eoo91sog09xfd59d8e6t9uyrgjzngrm400h84akvun4ufs6ucbr9usu91cv1gys4q2pytpf7mul1txe4yl0yu42e1kqd14x4919wf9umt6f9eqndubo4liscxzxoqlorf41t868exgpnnsg3uu8clg9b5gi093jb5u22uh2ma4l2c7n9cf618arqob6njf3qfnok82lp4qfliiswxuc9ujlwl',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: null,
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'cum3pq3se9s8h754n3e8',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'hykgz3w8y1dtphj640mj84shaxj0199wc60t13i74xp3pbx7peer9zc0nih7nbdykwr1wsvbhb4yi3by6ix9p9lg932l1tygyeg5lmsq8yb3g0fz3rubtgceswohdar86mu1dhvi20v82qjxu0crleb87hvkegdy92jijaf71jqqn7yjiskf9zg2lk7vf2lnc4jk1phe00xq3uz6ky29ojun34jcsy27ktejehe1teb5lo9zbq2z8pzus8lomgu',
                name: '3jcwepmow56eqzzhou8pxt8sdpjydpyoi1c6idlax5voevb654m2p41awo4ia7fryb6xwk2ok227d8xr6fctdnmrcv10klyyvkevmlw74l6sv046mzo2vdj4y5u8416allzuqwpbtd7ki3slhhay92pgdt4ylwnsjyr78ss7977aid5d0ptznkq3gr19w2l3v2cwff6vs6erlzfgat6b0wbvb1hm5wt03l9c0qgtjjfdkp3y31sdnoa6nsqlar0',
                surname: 'adpiu25ylbqeufubxy66kla4hlf7uy8kdtyhkzlpkf5qw93cy2bg74eed6p5bszpjzjde8wf5h9uyhu73zsrci5m35ytvd9if188ushuqvnlt985hmrmccqth4hcoag239f72pi4dl46flgt81qf4ubo9neyquujdqkroh9qu9l7endkrgae8wrrcz4vrishn6x6opz6lits1pt17fbiyaipw1i3xycp5k1xxkej6wsla58zkehoxvu9oxsgs7f',
                email: 'u0neph4njjtpnk7l1hgnc4jq1rd81i5m14xnk0ju0k61lt3ay75a0ajzn7bw5sf2o3dc4h9ry2olqkzvjw5ren7pzl0zm2nw3pzyjhlzs3yo2aqygv7vzxvt',
                mobile: '5xna6et5cjz5hrcirdz27tyrlemsqworw88med2mjlfeb632sij20dhfrf8u',
                area: 'rjg1xec1mgqol6dwgduq573rt2yi225vdeuy9srg809odhub2tyrcz1e1e00zddgnh6ee7y9hipecpant5d63od84v66btqzj8st20yigsni3kwtgkzx0kdt9pup9inigjb2yzefex7ib1lyfqj0tjq9pwp6q9pqo1jx8sczvx5cxfe27n4o1151pjhjqfa8g5dvzpg43xbzi14l3uhwxt0d4g1zfqfy2tidn4c4nhrnn51pdk7roe9s8nivifd',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '5pox2ugd4thgo5ni6hgj',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'usr6gp5doc8z24e9m0iidvpkfb93mwdja9zh7sw42z49893sq2qwahf3ie7jtc7lw8khi6m4v63ik7p6uocmba0wyhcgow8d9tldgwicqr9e85aue36wb89upxeqvljgbvmpqlnsubw9bsgegsl1mt34nq1is93bwunqnk8x18loxmdbw98xo7nl7i0zfjrbi4y6pzlbiu3fhedwbj18qupmbu2vqzqnvkyv4sdabxrxk82aat6lp1npsc9rhd2',
                name: '1imnpjmrz0dljlkxeed6sj6zor4av7o0jr338jekl4z3s555fvw3a9yx2kpl55i5fq3jpjrmkolwrfgrcj4e953mrfimp3r4la40idoqnp60ibp7lb7aexqqoqp8dyczgh0do29jvfv3s5n2tdzxj4xsvjdl9y8r571g3rno57kbe5106x9map4smn8djoqq4bdbsxi3re4hteuc1sx0dma7y3eqs3inljjjt1303uznu19rbkkxa2fuvvoxqwo',
                surname: '5mvxgtd64wmxyqmtt7vovaxd1vqhe64s3zqryyb6vikr2eqe5ot8f6qukaf0qex7iy2n4jhi7apoewbdeyhwwjcpyjy9pa7x2wl351eicsebcse6zn37xwmi7macgkgd7uclrj7w7nm06p6ks4xl0f2yubdmqtdv3bdd0i1vrm48qi0mwiwn5o4hargo8b181uicd8j2twmhk2r6yff9xv1tswgaiiz63visn4ufyd5jzfo0ary0s2f5o7k3jkp',
                email: 'uyjxuiq0lhh8lauz7wkmbv5lw4k7cva931tm5tknx46hd401pve77202r8m6peapzd5mraczucb3qnqucatbwk9tkywueqw9sv0nxvvoau7lj56y8o1um1ld',
                mobile: 'xdjy3wcul133c52hysow1a1tmbn3jafbzuu7xbj29f025xvoc7xmzdvcffxk',
                area: 'bihgcqa6zw0pbaun20jl0x75tdlyoi8rkfgyph18ftn447zgvkybbw1gely4mea3ar8oyf35vxxx3a4teriid78hugdfyxrzrh6vxpldq5qqksl4dyhi56bg1reh1808ibevri9tymtx0gcnr67ri53vinmlz4hn69kyx7vya43jlsx2ok1imhhnnetolz0oak5lh8k8hqv4yfe2ybvy2kyr2xbk6dwkp8nmnd53nt86zcgs1qmkemtmzmwdhg1',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'qfgyi74l6et0pm44tr5hxwca34l0p98yaun8out64ubovt5pj1',
                systemId: null,
                systemName: 'jdce03qh1aiywy0tm6a2',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'xrgjht6pm5jykvtrfpa5ig8fqep1zv08zwoqasm5msnu9hre2fj8izenegnyt4ral4ew4boyvrphxjf37bigyfpg3cd5baqjuisq7qu5051qrhfx12wfz188ggf3cil0atn5rtsu6unpfzmv2dy7r7mt2p4bswmxktprcfs3grxaje3fji0enly5ytn2s4w9fftn7p03y5eqgssef2wjhwx7qarpmnr8nfgi81typ7adchxf5sc95jrgg7586mk',
                name: 'l2a8c3fi6r5mm7385zl83gew6k2xibiahmx270uu05k4h3hxkywuquurx49xz387vpi9l6544yvxupjm5sn4e9327kd68y6xnu8306nl7qqgamm7fyhlsoh0tniwumcjf1qif7vdeuqr5jiff8ju6qqvbbrojyk6dhydd3efc2g7uyg3dzgdkl11oii20n0wqa663x4b4inyj261rlhzz32bedeqcktyw0hbj7nj3mnjjd856trmrfuil5vcak7',
                surname: 'dz98ax45rixafd65eyyxu0vh1u0xi99f7a8bk2h2kd08z61gfx2sunvu11ipo27yybyidpc5kq8ne1aciuvp56y6fkwv7ctu3wse5lrgfeeeplvaz4ip4i84yx2ab6hvs10eaah242c2ihxgz0kavnovqej20vv447xqjrpcl3ldjid11ge8mmzt46kg7f9nd0dfhkd2h5ovtmsg8d3hgaav9321z7ep1ytg3r41396sv9da13c8ze2ajpdclbb',
                email: 'on8zas7mhxpbcv9o8r0sejib7b9rxnn2yz01gsb4yb97i82asrxmcrjo2fv3pufw4iu58woxqbx3nquy7vr99e51f6ei3k6f039l76gw5arm6dftoncc5jbq',
                mobile: 'zbd6ddb2fupw39yux6l2exz6v25j9ji71xt7z4renhwzi2aif8o19c50tw9s',
                area: 'dksxokosqhmlpzjyhb03eowl2kq6ihp4ei3fhn9r9ly7m40qkx9m69itxy6oin8guamry8r0fy494cgck3ns4jychhge0w2b7qth116cmpkd1koulyelg9rcxj4j2pz60tma8sn714fs050dpsb3pjsfio2ahf58buahhgtd6rwvjkjnrrzyc7sgvn26i6i393lsrbtmxjj7ke5a6sy7v2j2ye976cjv0iaif0dp5fqnk2asyibc9so7vl39ecu',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'uhxhq0bp5x7ah4tqfaf1hgiz3y81xd140giktwx232eqp5nky9',
                
                systemName: 'jq47krwsnkg0bukpdpoh',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'fj9ilnqtm4y85y00e9dm4tkykg2mpis9p00ljg53g9n2cggsdp180zeatpwwtv9wl5i22uxr0iimmjre1gk8l7vslya80vg2aygwynauo8h9xf2um5c42ep3ligeao97lslv3a7bt3edxdyrxagk0o7gyddao4jccwthnu65o3i449tegue87koszuezhldplup6uu49sp5s6o9szwhibt6heefm222009yn3ubpm4ig36psa3z2gioe3g05hy8',
                name: 'dt07obvzipo2reoo1i6984bxf3991xjuaz83ay6ny7aeqw2htkcjkr01xih64jarcmdfx0end73h7fh4bxoopjj7ra2jmg1py9dyyfzxfk0f5fno0cjvqrr2injp63oa493rao6u9xlh8h38yowjtifi5v319s2n0sus7kln0z1y42cor3l3efmiynkrdi2w7kdtsdz8xrnhkkbg0ju93qhcg88wzb4h9rdt8hm10fa5k983ldzoewkz85bh9j3',
                surname: 'jwfdce9dmfma4t4wsmphj7bhzu6ekr3vjdvnjerp7kelr7q94q539ak2kk38l11kl65mideh0g4cqd4zzxbg04w2h65k9ez83u69zfhcvw3f976yxmu21l66eqtkm14nu73i5esndm2gt099s9lb4jbnega83us50i418khqn36u0naocraw9qhu5p7jdsncxn45n9n00oxvy7ylbzs5h607pgfbk7dcx88b3ytcs4y3g4lrl16h5p96nsbjzmz',
                email: 'f4zbovhie8n1hpc28wf3jjs9rbwkqw4weec3xao9qmn8mnsrqkd42829v40ot1ippt0k1qvgdjt8bnx3lwxrvepc1mxw4k5u9uo61qpa8gbaw9htrvrhtx9t',
                mobile: 'd9xc33xove6c36t7rj6s9ph0xqa8mqwv6kd33bdxceygisjfqp9rwt7dszmd',
                area: 'o94qm9kexj5kk4vmaf75zd6fjbiexew7g9b0ka3sti0x9sesngstjlqf1tcrkgchds5pzfo0pviv7ad54cnsqkkztwxcvtz512a1womur71561ku0n089nvfzojgqb8ljydvg0ihsy5k0tylgjrkn6206607l1vsl0rby6wlq9ldbqul6ao5o0a5i44e9a61d1qbvb0glfoulngyvkppk0uqly68n2fd2yck8vedfv5euhrtfy1el3b3lw22jyg',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'xpo81zorsy5bj4ail67uuh6deygk6395ap28cn38pks7icnb2y',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: null,
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'da8z1v379869w1p74i8z9zpmeui4gj9wq4y5m81z4144gkeve4v3qxmd1ipgz1tgeejyhvvvigv4heh9zycs9gykb3u712w0uwavyh72gimmlb333632ckhc34nr92p3qavygv5lo7r3mohb5drqysgg9saqh1bvvso84tfn03z4a9a93y8adyjjswi26ups0tm3qpynsg9nyag7ymvwozbe4s31gdld4ptwznjj1dwj7x9uhiiu44pg8vfgwoc',
                name: '7gj0pye9zw1jfy3a5h2nciukk32o16x2hv9yiqcpof39jvc5m7824mw35cl67xkvddxskpgh7taxvymehvqb0xm3mhd1zvvdnze4mv60n8bkm1a65x2d6ieqy8btin40cl0zsojr0ylc15m2vatth5493c1vuxcj0mxfqo9idvzcmxreqafg7yw33n0f2fbqiiugll1vikkxjr0014vs1g028uig06t2b1smtwk5ay6dhcn7q0ok62k8ighthoz',
                surname: 'ps1x4q3xehhqb0r2ouuralulw6oo091sg2eni4gezvb6we0tfnukdmjkugi0a1jre8wxu40cv665e6k6dhv6n8y8da47rrk4k6xmy9oy96s3hjnss9zeix3aun31t1xyae4fskwju0xo9p6qufoopqqdzvvs8gatrxwog4egqgkdozdm6in04ua4flc1dlc17nn95d0trlk7y274rsf4kn1os868rq4s42580ukapjn7l2t0daw6tb6h954jamw',
                email: 'ew6wi7n6aeixlqptij4kv0q65i0qpu3oo36ogb8aw9ib8oftnwetsv6bhcwpysa1ghd3qj8el8d0xuh824x6nz9epy8y4nm3q0ri1p3lmf80n87sby2rj0hr',
                mobile: 'sm3aak1iqtexvya5p9rkhl66jwvb2mv4o5f1zgusr63pmt5aemdih24u5bw2',
                area: 'iz9tomt4y0fc6xzs4j7y3c3on8gn3pxcmesu6iiyx82acgvkiymu1lb2g4h9b9d33emc6f09lmy6smpjh23is05qx4gn0c0iha8r8n3vpaji0ot6244e9zdq59xq8nq5d9vbwbtyxjfsj10wnxfcgyikf5hdeqzfpbrp5mo5ncg776d31y3yxy8zueq20srsi3cl3w3ktvh36wk4k56dh53w535qzfdi6co83bt6aw60fp8k3aqdop0kvkn0a15',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'svxui51t982tuuvie3mvm3gnp7y057klsu7ntkpxmemmv18677',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'e5qxcy1hqo5maxuuscjd18to2409u9ywjnq3a4lbqp267dsthmxre0rxirsopagk7u7ngmepsds4rtk281bqbf0ty10ash4tr3dgnra4k2bwrjytlr2pdbg74xjf792ipxmygu0e8m8r682cneq6qigfw632hvdf31dz2vdj5mb9f2rqan0cd1ml57p5gyo5dekf5rsjxyauv49pvtnk0uy1uac0hk6upnyzfdwnr3phluzhy4t895yovjnbm3f',
                name: 'ko1vmsdfdfbk9qwtvboc73jx52dkvea3sxvxbug6xoqg8ogpxmxkc547v3robv97riqr5x6qss3bfhe0t1oqp6undp88ohvofx447t8qj40cijzqmtut01wu98g8zdtaipq4twm7ezt46xq2p8jmpr9ij4cz60ql1poc30nb88ofnelpc3942rtt7vry3y2e0zfu7yxosvpzuu955rcr5s58499czdqd4ntlbq74fd94kgnm9ki3eucz6ir52mp',
                surname: 'h7jzd8n9yemrmke7y1das0vb2kf0z1achwv4pf0s2wmfm86wom4ytfiaoo10nobfjua043tjnd6q1mknj75q8yc4n3olhgf557ff9kziok21yzfoet1hog5dgtiirgtu6qwk9nmk16z34087nnufm10sdhz080pvuful8ra6nhno8c4fupli74hiw4583yissz9rjhvac0zskxlvnkhjfbyvyosyibdl0rjjksevzrysyf6xtx85kp12jadatjh',
                email: '8amyrj50bp0t3f8opy7nubc9qyti4ft6ilz9uxvapmsiwecox708r21h7i3s0ydw3b3spkwybl4wzqz6sckdr5ajzbfzblg84c9hc1h3bmo2qzaa0agt8xm5',
                mobile: 'gned0bqdvdz254mn4k8d3yth0qo3dzafva8pktoh83a01w79c8tt7pcmj9tn',
                area: 'gs9i3d1qx2nc1ceiab5qbsgfo1il68and3ckdbfvudye2j81v6jpt3g4yimdy2gecr8g1ajm1arzvjyl6zjuf5hjq34lg34418jlaod4k9hqttnvvg66pz8v9u1v37ujxjm4chsfp875womy1jmtk5e4f9rhso0lljlry2iursl8s45lf5goong7vp6z1ga4x4xcx24dwejpnp0f6nj7dzv7lckczmxrus2pnjg2g61ultjh6urvuhl8c8r4hfr',
                hasConsentEmail: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'ek0d2vxbtfah56gu9thjotwyrsljtbmut8hrd83ovm91tib31u',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'k9t64yh9mqltz5nykf5a',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'wsmpy3j7gsm5z3sngtg62glh3w11r0cr42fem6rpfn8469i6i8i08uy9xjw6mvc0ajafnk9srutdc6ct5frji4txqg0j0xwgig585unag1ca4hdcticpc7htzmvugos0m4bt27m3wm1vqi2p06012g1n7zmhzozrmnk6wwhhotjycnqn75d0dyfb93qotl7a9hkf821bhkmx8d1rl3v9aejfm17aioq2de02rzn8xvbnsr4j5mdq4izcvql4l34',
                name: null,
                surname: 'kyptqju5wk81ndsrxd8gka6spf28ngj8izowv3bt315vr70998advclxi47kjtv9l605lfql6ghpf6dndlllmoit7pejjrolj7qe9evvtiwmihsfgxr2zjme3sh54f7f4dy1c3aa72lvwga37elfkf3yups0ml4mlmpjk9gckwqlkoaivqijle3u7y1sl56aki33so3sj60aozbtsjhuk80vtgqhg61xch6di6isbjca24ycewjhqil2i6zexc0',
                email: 'zgv4ooxf4jteeqhseigh4s61gcx8bi9gu8oku52803w1wb0w8aki9fwhtk5su6peaskh9w69awifdp33vds8g3lgqztroy77scxe13n13jzqryt98p8xap9g',
                mobile: 'ou19gahtu6hfreh3gz5r296vld5ltvpq9lp3rcjphdzsxxyqq0ukos4ix49n',
                area: '7jfd4flu5e8f81sa2of29jl48vcxw4ak7ztt9hwcpgf3gry6b6yshpwkdmu5u8efcb71sx0c8trhftugg1otxebrd0iz5y9525mf3ovvslvz4vvcyo5xg1yh3m3ijqprzizu1nwg5zleltz39fwvm0ttm377i8z6te8i9dfahefm34wton1vsw7kp2g5mbnq6a520f6fowur9jb8od1q0h0ig9x4oo70ktsux7qa2rumg8qqqamu6iwoo8tu5ls',
                hasConsentEmail: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'n7eftss24mgfvclqbi8i47sa13jtrr35ch7rc73clf3uzcia49',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '987nyqdpj4b9g6pyo9uf',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'os59wixogirdjw9fxmuvzxnwnrth1zefxbfny9vmiumxnqaso7lmnckj174zum1fzr7dvl8qmk6g4fsweacmhhtbbyu59h1ioflbhuq884p55zomcrozvia91vgtv8le9ekmk2o6tojv4uo5s3gaqweqrkt4f3o8oxko7c00w0fv69rxx7de4sib2qk6vh08pblf0yxwjjtqalic52bxzf8bioy2t05kcuyovzupenky1advm0p1he7a6xonp35',
                
                surname: 'd9c6utqie4pvp0pytzjmmit26pafwxmwtfy1nd72en7ejpjaii0rjfu5owkyfl8s8mchnvvnxankb2bvj7zg1jqhx69360evry9a7mpznhw8bzl1mcodrj063fnrdnz76di6qygmybtz7x2rprsxglt9zfmtz8m655gthcinmvdx8ev6uzfokhi75cj2itufkjpduffjkuj8rqqswpihwtkvubidru53iqywv69qn904twgwsrbe3paepz6jmyn',
                email: 'hhjij9ew6m5lyfqycf5z1ws5ecu6tqqz4k6h2vwr088psc0vyjacujk08i7n6sk65x4jazxuinkhaffflv9b2lzjnp86a8e08xhiia2naiylcjub9lsistt1',
                mobile: 'xpfq8f3o3i3l5y2md3xunbofbj1ow4jt64gerjmg8npnxlkxez1jjn1u6ht2',
                area: 'uvf1lj3s6b6qviozdthplazu9e8cqkim4k1zmkerz95fgccq832kc5jtsgkafeedi7m3ccxfblyrd33fifcukc2vunxdwpb5jxe8i0nep9d1drkugqxndgogbrnlll0wmjdef6e6fetti99rsxg280njj32np0sm7ube94jcp2qtfid1weg8sieb9wmbrr8x2zefte7b21xsp64vc3av6dnsnzfelxabzt2xa0kcv7z313jdqx6l531xn1rhpip',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'oni4xh70divvsoxxcp0o6ckf5m72fjmf5lppqcwiy9st93ydrt',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '48mbo17kc7fe1hq3myr0',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'x4aj2zsqd8xlkf75fnt2invw5izjlh867yalmhefossxlxlephvdnvdwxhq7xwpl5qrdur76yy7581b1i6h3yz3n95nzpt8y2bbbpaa9es7cg4yr3hfa4z7fkdl44xrmeigv9f0fudgfv7i8eio80qv9gcrl4uzdqrjt3usyrmcy1rxikkb03v2vu05bi1os0cx6xqi6l42xreu7dsaxxp9v7oxw1bj5ch017jeto9kae5fphku5wlx8ba75l2y',
                name: 'zon1lrjtbj0e7rtyrinileocvk0ubgt9jqsn2enhh7c5xfwo1xb4nkh6xkht0ru96009ks7zcv6lcm3k4ja1epbawfyfwex0s773tcw4v084wfc86gvmaw8xa7bfau3hvroml6ue4p3ewnb1kf4hwhv3pswbh7ick7eudmnq1talby3ok4zjzhuhmns7vtwpcc9di0s9bp5heaka0zj3zkqs6it83hs57a6r54lndhxs4nal4fjqd80a0svc3ck',
                surname: 'jgw4h6c39kyc4sq8lb0ndcgbkxzmbh1tg0mamxfpxjz7jw7dec13vh7hobkp801dcn08ifn6t68iseyrinbfj2vowh3vpb3js74nnwypmz6aqlehcodplfkg8koxre2x7q0um6hiyno1o6qlvprhznfwxd97d0m2zqqz0pven8wguljwl3en5t6ynwk8uc7uh2ijntqny6oxfcqmnt1uo71iew9qdtr4bstyl6gjcou91irv4f5pu90c8iafh1o',
                email: null,
                mobile: 'kxfaj9gk4jowl53uuuwqd8fnx7nps1c3vkdjjgqgdc2yleccvyvabrq4p4f4',
                area: 'a3bb96c80wbng5d0d0s565jcf21e19xz9havke9jmcy4d65fhep60rlobjp3x4rpwsn5bwm9ih3holw4jctq02bv9eqvyhuhmdx1y5didwlwwak0c3trlzzgpg9hij2mmc3f0rgyh3atz5uxk34bxx4xmmgxwgrw6j4oqas6gy38v2e773v9c9oy2pfy7n2gb7xlymh1mbg3la4wnevf71mh0jv5wx57s7gtan7mnnc4kfvf3wi2m9qh2r06qsq',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'd68rsyczzn2d8by2rlh8yd8uqtbo2rebo0s97ri98uc1qtbd4z',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '5ia003zp9nvnnrdvlc1k',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'x3v83rsgnmpc8jej5k8fc15p45crqv3x2c580679zxgqhbwoi3759nfu6i5g6plji715ff8n2jggzogkpemrosg5kiv8q2cv419z3bc36ptt86vw0engo3uy457uvqdf2nm0dlmwgs7b62odxm1mbs9ap653oe1p87x9mv1zwm6zsc1rnrco0vnuwdlm5a4irlzhfe7ftdwd5tm09sbefsvp2s8h5vkatz7bae3o23v6e9q0anh2ncjccxtqvrs',
                name: 'rt5viaqdsr8l85r4n3t5mybt4vu8ofqj0c5l06c57dj23chnmlhzdagtz8bup4l55hm58h7i39shxb66nytqk6mdyztrbyk9xhk2gcvkcwre03jlrjaiewll9d40rg8qwtjqu6f2jhspvids65sg2rwfb5pnv0sapfp0oegs2ow0dqg0e9533buimikl0hkduir3ynvuz6sh6ix4meffj5i8hukpasqpwj5k3updklz3savuio0gp3vjuqla7ko',
                surname: 'c66wtu7tmjjlsxv5naytbqcedwzh00hpaqdhj4c86miz2mxk2ryyx5lmzpqv1f4t1kxogr9tehuoeeivigvq6f44atf6hc99vin43h37kl0srhhg5ig2jn8izf1moxo0qlf4ckm32mwlb9blkteess6fmbnwwr55zwqpdvbo2v20tdx4xrcb89s1aylk7zqgxvhampgg9borhwoxijjnq7v4sclpfa1d0r8pnx8nkrcl8w46guvg4kykxl8f3bp',
                
                mobile: 'iz3q72yf4hlimswl3lq4a4kk3umvdglgydf5ajktdewcueg6av70lr406e08',
                area: 'qpd1imner5k2kqi8glcbud8idf1pj47zl9s6e0pl9025odjksvtbyww7751z7ssjqwfjy8pvvl27vqagrqa7v6si2p7z9ea304ikbg4t3hkbh8dg69pbzh0zbcx5v93p9ogv1yw5kx5zs1ffhp70rd3nna75pxagq6zlk46ebbkhyiprz67gst3cp4apq9oqfmdhupadpebzjvkt45dh7vi7yq1ij7rswy7khggudyvgs9ey71thm8vzqi4o5wh',
                hasConsentEmail: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: '1qrer850ctktugijkd276pzgol0vqrqzzvv53fm4d86xvu9pzf',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'sxbrk3wcf05oa1of3ug8',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'j6gsv6fposkg5wn5mqg2t8xzk7qozj3k5j8eruvjilnwx0k7ao83hdyedlm594qqdr4j0t7iegi7c6ir4beyouqzrw5lb64k5da4veogx3dftdlhfxjhadv24hogpr357yq2qal2pylh4hhhzdhuwg9ordarq9ax7ypwku2908ubbqjk77m1omn36phk0o95jokmz9ljgyt49gqzyh8i3gnudjdpnbeolmecfpf3zgl2px0pg1blj9ku0e3vc3p',
                name: 'qjb4yzu8wfi52vsh5qnvl5sptrjherbg75b7oggmp9e08vdmccu2scodu7i5dgcaf44jggxjgnsy08l7q4festl6zzxwtdji8c553ktrf3v3cxmneh1ij0sgsc5htm7auqmyib42bw3a08d4rkmtdj1aeu0taojho6gz4l5vynybfjy6znnxfaie22my44l2apgzmq21vlzsaeuoxrnkwepb4qy9hyg8f226iujaffju5i7sf9szyz9zb0lrzah',
                surname: '0y5x9firyjufh2pdh8dkni8ghebre30ztzdhbjao9xmx56vradvk0jfqloydtpnsdirlcsyv4sa5f54f4210198qd32fgjrs3agz91wl6vp8irxua7zofgwsdwl2r4wcyl00z0c5ngirr5va46zri2z9mk5g24zjem4kbe4sjxrtb5269i9xggscotue95r5wybufz8z81jrzqsn6jgyvoiih8wwsyo3oe4x9iupyq0nqity3w3ea3szb401xfp',
                email: 'f1qdbi3g7bev4mgj0prksyynrv3l5qnv4bu8ov0uigu8n864zc2unn7i4wulrt7xm2rkpk6g97hi38jg1elrh9td8shzuns2sg2sgv7k21ir7v9ssrtqvd2m',
                mobile: 'cahzathyttcslafcwtp92asz3gc4m2bkzasdiyokx3c0ohi48bxytmwzcbnd',
                area: '17tx7dfzqoyaik56hpuw6thho91wye5mnotpz1uq25iiu0xa8jx3kfxr1ko9jqpft3hvo0h92nct6gupg9umidal5lj0lvr5aqexeoi23m8116a74emvkrqu5n4zpyj0y50mwi7g3u1497mxfpy9shw1dlnk8plipozbgri6dhx3iywjggqa10rske412z62c8vu2djthls4v85koi0b0c2y33aveze3zz7dafh1sdzoyvozdyckd5ufxs572lj',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'ln8of8224usbrv9n2dco62ml1954ky6sjxvovndbuyg3vysux1',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '14f0cxcncde1zqliyxu1',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '0kkq1k1h7abpr5ecsxr847taj0fnzz9r0s6l80cy2js95yywr7ulqrb8anq52468o4xo8vhm6i6195k4hz8zwnrxgtc5r4kv43zm299nk164lhrcq8toma2uvlskinzr80ds51h4yj2ahvolo5eyksu6mmalg7l1ssjyl2whpm28caelk4avskhk96qqe7c5okau0cjh7gu1c1gwwwhkvg9388pkb4jbp8ypogpyqdclc8q5s3r38f7ja6mlvr9',
                name: '7htwfzbodgzjjzpectv5n7hxz2p0ocbtouvrwu4g03fl50ktrvyovk1spp2qokdss8rn3elavfwrjeq1jn5n5sszaviwqeb7klez38t0r4er87ixveyw9sk4i7c456sb9wz2xz4a99nscrek7hb6jv3os1glerp8wurihvtiow1dd4m5p1aydipvemmcitq0hyklfeaub4edfl0gapcljt847ks7p0cevsu35ot2jg6wq3f2l1h4kycdrx4nczd',
                surname: 'vie8bgfmsneskvj6qo7n4oicrf8mqoo0068u7lzjlgebtb1a661rij0nr41z8waa29csuey0qt55byhfkwbi72t65pumz0q7j3x35z9j4xruo93h6bda7i8u8x84opotbmrot0rx48h4iarb9fr242j0ioaebdcaqpdu2kh1l2g9xpdkyy6qg85hduu764wtjwhy324a4i2e536wl674nzahdqq4jshbop8026rlo0f6ljaqcyq98sn9hvyahsb',
                email: 'ter2m7vwvztb1v977hgmkpcw0xymytzjply5bb45c9jdk5wn06bm2r4dy0l9p297he343x5vfa61h9cip1sqm9h9l43lgjz7767cppckzmngjhjtv13zu324',
                mobile: 'o44ia4fmq37362arf501l9xxg2t4rjwcp8nslrvvryvuewh6ajtbx9ncgxk0',
                area: 'lnca2uxluu7b8b2imh3sek5tet71ee42vlpkdm0ybdvli46ofgsjc456or85p3awzceb0glfzxmuf3gxclemp9fg5h3zje0s49zqqxxo2638c2x0j0yphoqv3t45a1csc37ljlawa1052n8mumsq4g20bnjnzpacscmf65jxdfzjbj71qrhg3vq5ft7ewhdo7ekbrwv69nidg6dotn0e83t3l7sg953o6gcl60y2hoa0m9vkdt2kad00fempqr8',
                
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 't2sz32nb22ujit0pwa7zehfmntkqmop9xffs9qbgpxnm6jqsnn',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'eb9rva03frqp7r2is8ha',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '4tqcdv7nsrb94bhptqxhun8q5u1ymmr15bdbmiw1jxzl7zzhbyoaiyspm4ny3t5japl2p62x3r3adpe0fbmyaonzn6vi2wsjvwjirr3we39s7rqqvnhdivd4hbsm7fkdvvwtn8gy714snum8arntblysofdom8nagbatmvf4h63ik0wmqn7yngi2dbirlizvctiigt0ue42it2l3ww9oyoi6hbu10b0rgxqw400e69uael5lfoe47lesuuqsx5g',
                name: 'xatjg2gs1sxnew00fc3g321cerkpv5jenbsi8c29acjtucbmxdlp4xtkbmjypow35f65bif921lgp9la8hvalp45elcysu480kcv82jxrr64r48l2bki5fyj4dj7p0etr5611biz42imnrh3woxdeqmrr9lg82u216rz1osn9w5t1n8msb5ked7kqcvj400keugu2vmh904aghrkyk0qsh45vo71zgpswo0kmnxiqzppulaxjehdswpgo4z17hq',
                surname: 'kr87q28ebcr2xqb5zqvmt6q6af9wfutqucajqy41ffv009y871m9gdpjyhazxhfy1gzsjbnvgy2zoh7e292lqrckj5eysbhkrublnyu84g6ql7uxcujoopsyhhr4ohgunwnrjko6xp02izdaqc4rw93z2vpmhs7dmulk6bzhhtpsuocljboy92a591ozwz7ho4td3kflt76ntnoebdg9h2oe51ntk4twcrl7xmu04nz14p14fkbceiy8b7fgr77',
                email: 'k2garth396nd0qubx3f617pskgauiywha6cwoir7hpu2v6tzzjo6uok66tm5yf5m8grwpc4ece2j5u3daq6kkcbfbo84dsm571v0tfpqif9omdwzo9ux158n',
                mobile: 'y6nbs4ovz58fpp49iai1w2knqtlcgk8kwg3ltcc6cfk586er0a2l1pgsnbya',
                area: '2w4irzkjoa83rrr8qu2110e5bcjzddg0azmayq8xriytb6reufn1uo9ml9isal0o2by0n3r2moj6qwwc86p7coftt731coa9wpe5ecya50fo5rf1drt9oahl2vte958spc1qqxjaqiiztkayj4f1f7l2jb7iyctxfw4ldm8gad45nuzz5l1vndweuzf6zqnzqn5qxo9q06ebkfha6sb97nmco6x7pechrjbqrgl2vbrh2u2imkzz9s3mtoe1nvf',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'ladsos6zrpb3cys9wfuqv32nuonb1i3wrn5rzduep6knhfnodh',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'iq5toay72qy1w7o6thye',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'ct0jbwsk7u68ug74bht4qo5vxucvcw13b3jquwxfmh3vwalc1fyvqtcfxf8rtqaksai6hwh5x5d12ykig5gaep3jx23pjkmwa99f2iv4levtzw2dv55uf8m21x9jrpwj3zsis5r63dthuh2qpsg03hn5o5nmnumqhp64sigyf3kz9a0shfx0y8d9ijfdn7r99n7isgcbx69lhe02fk7f7l3s9so1d10dt5zfkm9j377u4ns5s6qkvs9d8h0j6hc',
                name: 'fn64kqidj594t9ka0ol8ij3nh8i6392nc55sx71bafgffk37ow4ws91v9765calkr2mtexzxqjionc9k3no22uzt1y35798gy92y2b0kxzimh93nckjn8sdupvgee8yhevlb9nfh7hyfi4umtv0391a8bes7kkg71ufnx8w9674u0mrsr6e2boklvsu5j7wfgpcpc3vmryclr8l8d9ooghsg8rjtlew6j6dbc4actszhq1juipnpo7d3ik1z6xm',
                surname: '5ijb86a5539ojwk3dyfom8ekftkaqj1nwo9viwu1e8mmpb2qtyj2g1rytljan5snu1fhig72ahqyogat0s8bev0uq2a6sdqa8ri806lnlt8bodtqvvrxwy2emkyvsujr6ygdcnjnqmgmq8mls6wlg466q4s07t8yv21ygystts97yggjejdkixw2ysnx6vg3zigemyp78kzci8wehpz4ki4zya538u11qa8jn42ahp8s6hdyt5gl3a4tiy57ygi',
                email: 'u07ssykrjrm1rq17too52m8j872lbsl6o5m3dh7s2flhlbo3f01le2nl7zpg2n8icy7njtyluxwxkc3q8umtc1qs6bozgwr98ujcy2g3ad8z0aa0mj57gp2t',
                mobile: 'mhtunl9ea4u9qt9p3n12bzcs8sg3ffto6jxw8pvva73mzogvp62u6tdcfuqs',
                area: 'rmllvysy5fzhovnqrjmjpuef061xb3c22eewgnd3e8kqbepdtxq8bqhjfai8ubbr2t54u4y4vwifeu9b4cw0bjheji5wdspq1ak96yn16igvqzh7o7rpbpm6vq2hzbk3vngw2kamrirs7k9ttutvm5bwt8y60hdyj7urp1r9ukxf730avx7g7em655mkr5zaq0czq5jac98lgfz6mqioach5ykkc4qzzq6y6gfrc2vxtaz90bkhcsahghze7p3q',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'pl7y77lstpcy3zxtb175wnhr3by4lfm4u2vt7k0dc1i2ku7dvt',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '50rr3j0n5zwnth93eesy',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'ej541hwedkvwzsprtpxf3063mwf54497032bgaxm5a7b7mb7vs4vtr1u3flrzitevwhzm5f5z25mmg1pm2z7ib6rgnocn59zowxbd6vruksjy6vaa9ouwz4rkuuxtkzzmaz01dflc174krj4khp1a3qc9xk1xwztila7g61bf1eg45kbhqnxc912eo68y3gwscoj8q82fbgrl9i6pmanq5k6ox0gpwbbzifjunsee4lhdmiqy50egrk8bo0jykh',
                name: 'vfkz6jwgqxwafo6aja58wnb6wiqztatwngv6j27ut4mneb16bwmtovkgc7kfljkjm2ow7w526bhdr84j8qnqvk3yofg1uixthhn7j3h2ghtv4qwz3y0a276a3r2pywydridchb00ri2gx0n0lg3qplw2a57cjkj4vmk0mx3r7xj289x1zhyyj0jr01v7hh86jxcxd7trsjuacf3nvurkibzrfugjckuge1rw0k9uq5jju1sgvwwqel5ukj6tlld',
                surname: 'htgojidenzd70balk2hwvtvwlfofjygo6pi8cf1k492fv6oggwvpxz2c36lve9k8syaq8ceau1i67mulajoc4t7jx5v8burnsmb6q57ne7ruukc6a9sdyomyo69h5f9hn6t35eip8gly0gbnerpr46vmffholsiury3btbtly5v981vlljrht3osn9cx0benon60dm9zs9yv5g35xgfrgtjbxmzvdtswv25lnxydbqemqxg896hkfol70qd3al5',
                email: 'y6umojal0ja0qj9chkqztu38iloz3b67f2ox3j46mk0difsqof8f3f66mnkh5gigf720papnacgg6cz6gipaodn4akjb5t57cud8lbzcmwkmyueyzn7mctrh',
                mobile: 'g3hthsw6wg9hi27sxx4cajmc9fkezitgg1g55me7e4b4bpum0k1suikjwcpa',
                area: 'npw3k4l4oqz872gipoapcy4muqgcvfjepdhkmpmfiv7tnes2a5uyyibv1ph13dh621w5p26ezzxum8yb6myh21tx7qzd2bqlxpcbbshmc3l4xwqpz3jtojbjua060p7cauwx301i9c69fvez7ziremmh6pgqih3a2npytqh16l7iiyadi7hkkziv7l44ad3qqyl9lgtc2nys4x0071iazw56mqrbr1bq3nkku12ojo57jx2cbafpzarcum0er44',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'l8pdbwzp5n7e6rcy4fjopp9e8zhyv3ujjf1ne1s8vsa0ejw230',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '2eoz5s1gk4bz8ygl80sc',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'mb84o0ptjqwhdo6ctupafpexcgc7vhp5aakhw6mg89wg6s0uj5kykjscz91m6q0m5vylvqonqiznfu0nqvjmepcsornb9kqi4gxxcz956goiqqqflncla4t03v04aw7r9hlfxapk91ibd4jw3pjalxrcrvrkdrb50mpnd72e5dnptfkuo4mau6ysybrok1g5lvbjiny18rr9k2yahcmhbri38g9075q0hw1cif3ksxzmjd6y8ui4j293bxttqlf',
                name: 'ujo1kw9scmkxw322wkumcjw3ynipuw0delna253b8nxh3ti20ss2e5cqwy1b6cnkqln19r51vewsyu3tbv350ay32qfl17xzq62vpj1os7v1w5f85lvezp193p7id38jf38kglmpie3l61kvu5jy2zl11jgx6anjfnbwmasygf8jvncq2qd69df99zcqj40v1kqwzg4m1py59aejqhfvioru8gi0qqlruopwbviytzjqvkupogbol2ne0kbhoml',
                surname: 'v2u672kavsuq4hgm20jcluyux7xe2jdmarexcspca337jornzuzcq53ailnbt0zoos11m0077zuk4ikm9nvup7ksf6a73jf0zo6lhzqt0cs2w0jy1oraq71z88niu9txqvctjsl10epvr47rw4wx6pu84c57g785tckvflgyy141hy79fwi5mr8s0dv5cjyss10fa4c45ge9qamfq4ztr2twpn1m52n5wxeij7ut68ey1wczdlz3ep4k1sywh9a',
                email: 'no8t9656afxhqf3nj3m5c30neub360vx7uhb41v31o36nc67ow96b3r2d37idrz9gjvhi3b4remzg56n6r7pm1x3djfog7oh590grt8m2lnejuwhscsgpidb',
                mobile: 'q2wcrtc4n3py1nrffaino90djglzi8aijo65m3py0b55582nbjl4p6kj5see',
                area: '1ti7ds1xm0ws85l06gtaqtcalyji6uf4uuf9xbleovfs40ldn8ib9nhliw5p7c4puqy1s474myv7yv9ehcc53le18kfh8i7785a650ni02t7odk2bs6xq5agimxtgvecrjplvfy8ujmyd5i8cmz5r4w2ly2yxdevt68pb1a9w70p9kizzuwwjqc29zwhbk2msqy7qsl9pomhslf4rj0bgsldqnai1gly4k575odp6fwqlhw1pso08wxosztzqxg',
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
                id: 't2oe1d7n95zgabuo7crfwh4eacf6j96lyjr1i',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'hiqlkp2cv6cl9zyn8bjrv98hqr3h6izohk9qo6jhq25vja8uzp',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'anftoy7rwn1857n5rk96',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'asctl5xvv2bwptsqmt6p31seab9go4x1lmnqdzsnhpjz44iwcspfasl9aqhwoyq2brvqgwfg8yu296vpq7iaqeixh4vx2tdn0ynh0y0m61pgh046o6vc98txjn3vmv7wchr4s7tc50z5jz60y5zlmnbq7osou8jt9jgc728t8b9a6md1ev0470otyww92qxjqq8t94h23m9tsflnci132k3i04cw0vkcgu41j35y7ival5m1i6qejv2oli1popc',
                name: 'g77dca4817muhmpuo58rb85tz36xdkc41pwjp1zop3uw92edfxbbrnlnu3rgc6xz41i919hwu33s6mq79o2m3woba9jhd8mndehywlu5fbnrsvrkga13mgukew4f410cn69rovo7w22m0conk0l3wlbfaj4ocb0tad7rtbqtyux4y4r8x1dqxvajaaqsntu5gvusipd7vggm5elz86whgxmq3tsdnfx7g1bebmdjsr58jfcroth07bqf6nxgyw2',
                surname: 'avqeg83suql7u22ss7czjlynnegk3wyyrcz1ukynstiymwtnffw313lbuy50ydociuclv3l7hifqgu26q8zcdjh7ic94lzv9kb10fhv6gcnq576ijhu71e23vfducysbu625mw33e6x2u7bsv437osiizrvc6lht1admi44bij0b1hpx1rgy5046dbk0lqduy3cnm1viuvnnk5m5gutqlg4dcbbv8jj7z1aheak0s785rw6pgzxy0xejqxhkuak',
                email: '94bebi04pznvnt1efhpltas59r6g1pdt3myt8f3icy7ia5v0048uweajouygv4xf993jdo2m1molj6dfg8k2bxql71qt6pfwadbb2e22rkrcq5e0gwi8xojd',
                mobile: '3cp1nx25eawz7d1pkacemxo4mbxykg7g65wenidy1ib582jh3xqygp0nu32y',
                area: '8xjw6w8ozqlii8ebs1ix2b655rv0v8occ8pmugilcwcgcwrdrd66scdihmo9rk5a05xm6nr7saeaz714qwy5j6dyuk7w7ybj5tsjso0d7cim23sq2a8d02swhxzowjhz377gmg2xbqcfp8nlkznedtuq0cpd8nj7piywv81s2la6xi21pj6syj5m2g4l0woiunnukcka9o0qis0k812q92peclmwdmbjfrsqtph5r3oy8jadjmpzzwfavwo9hxh',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'e652fcq2pfrig7spku0m2regd7l4b8ajvdskz',
                tenantCode: 'g1a3537altdfc9lb0s6gae4n9mlnabky0owz6vdx2e5nauinqf',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'jc9wmbb6c4gilopnjvzn',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'n3dx0h9qam9vie6fe8liqpbeqaol326t4k8zeuuyrh9788i2st8rxszixgz91c70pn5z3j84igngx95walufi8ff2bprfhnduafblhn3zk5r34bgueswvtregfgd0w3r14qbqyg0u562y4ot3jp5lysyiokfxuk031fvvhfb54mge44e91shuz1y9pbb9cio17x3o9n1ebcr7r46o1v07su9qxjtnfdnuo97x5ixgel718nk8amn36uov913abh',
                name: 'al25fru11nxuvautdgvac3bk27hl6f8lccjoscf46zgpb8exgf9bke32dea5ouavholyjahbkrio9jujxzvfcmnby5rmvnd29xl7v2c1365c1xgbasoxlk21lufs4x8lvlzz8j8s1nf2plxwk5hc9e4ehqba39k24tptuevw9fxg8a39r5bgf05pnylc9jm6dygj74tyhdzrdz71loasgycd0n7wclogv2txf8yndafwiouxvbqxgf9o7rekcyb',
                surname: 'uzbmhs9lyjybuv5y2tpv0ha72oep41bdrxav9bqqmodbm5df8tngp59cqx6iovaq2956029bngt76e5k0mj0jieiqfuysplfy77ti1j2yyjgk8l2qunga83zj4060tfldrt28px49jxqrl80hx82509jrl1t1lkoaktmovbucwqu6jx8o700c2mbpu6p3aqq4vths4uoqgfdywvx0guomneg6acd4ew95h7l6d154cw8wc42kf1klqw5rzd3eyn',
                email: '3x20lwz7p6kzmpqy7wjh95bp630di69g4wl5mmfo507wsn94ov97wgsql788oljai46ojblc3ojxioqk7rylbs6iaanrssb790abt5fccsz2qw37bm6n1584',
                mobile: 'i9j9zny84sonk3mynsm3zei06p7edkscrl50la1t2vplibezfz3693sf2neu',
                area: 'mfosmtkw2vj3qznyaexdst89vkpvmkjolhgj159vm3u64t0tfhsnkjuq5deb01fqkuuw6wduq7uhnn6vjw160nbfqrl82nztlr0al9atj20ya20b00psvbbc3xrkmq92tvfned3rfz9udcygzlo31m0g4tnlvlt4afhjyp0an8leqb28odrdexda8h1heg8fx99y1sadi6z19jn30jhn062agiggjfegzfe9vytwo80u0rbmn0azpx2idqj1fk6',
                hasConsentEmail: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'edcl4zggh1euj1x77tmy4xn66axftb6h1ehkoc49s928naizs3',
                systemId: 'tydszz0pc61jibiy2nkjb5n7zm83fccebpt3v',
                systemName: '62mm7s6et79r1e8gxpg2',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '15gtdpg8ww1kwddedktc4up70jbshrzzo802eqio4b24tl758k1t50kq4jgv1ydt2lv6q9nt8vey3fivtq0w0md412hfyj8wg7hm7uy74o0txi2kmshccf70jikgx2qukoqf2wz0w2poxu9edxpe8pxv4m8c58ad0q49e8uczrom12plac04s1udnlf4x70bb3mvzrjrbeb39rf376binkadi9sdbftqy5x90nb0md249n27xgufzw1yj416xu2',
                name: 'jqtrp4ity5aeu76b4xabwrmpkpytvmh72zow1inlnlnx4hl6c2luah52d3rd83ruoxgofigc8aqnz15ej5942i466rtdtv2xqlx8e3e14fn8ner3stms64xud0v24jvo5pfzypl9cdooms6eeczzm6o2gk4c24rn38xg0sc782dqotct7uzym5ge5cs56q85fwxufwl91j0ytllj3qgkspj9b1gqg9vmzkce6168bpj3plqncrs2uggppfesjxu',
                surname: 'npmxq84si51x67ck6shrdf8i8abm3pslvk1oelqgjw386xgs3ofqhbmsjqqbdmet9ys5ndlgiofhcldefdn3jtu3nie6ggk95262kafo24nhqr1acgfo4znu6qurrvcxit41y9p2tagkkwtfbdgl9az329i9degkyv9wxcy6gs4s5ewq2dtj8asge1jlms9v2a78wxgt7ydx7xwigcligskezt82npc3zmazwpcpzfk6hu8gkb3a48wvn8b9351',
                email: 'i1fxhf49eunwhwgqbyqimjpop6and27u15a0yhio9pxl56ek5vs0absflro0637ucwu4k588dgyv839brvx6oi4dmvprwwa53yl8dubjynziz2pe6q0fipax',
                mobile: '54fvn7kh9tzv58zf25pnfcfecf4y95eshz1iwe63gockxkju1kklgvoqo3mp',
                area: 'az7vhpifxtv7c2tmj23uu43t3d9nsgh7ql7pifwu3z5osxhbmo02qzrwczb87j495rhjijfjdbjlnn7ftp3xp0nid540axakfjj5c81qlo270ssm9itxs8h9wnyczypndbdxl2bcxz6sg2c97nbp7541qbpblstrqj20ipojxbnp0fut5vx7e8kxu62h6w7z04oec3fvaefz1f7de3mf57gyrq6flt5hz71kgfr9vs8icd5eyi44phya266jpxe',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'bvhdpieor1k6d6onw88rox5xn0ua9p55pdgtivc8ju3tl410z1',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'ehoy3vg43hfx5urmr9ic',
                roleId: 'h6mmpqzi92jtpl67ivhbbh4sk7asgn5kfuzag',
                roleName: 'fmxjehwuysily5s3sy1e22f46mbckotu9d43l7w822r1zp6h9lrdx2iah3uvd45warf7svp4o03fxok6ho1d15py2urs2hibi4r2hywj5yyvncedv3rlp33u0gmuzjq2kqhq9okv65wwvjkv28bykx12vs5gpn5px9hh723amns0jyw60z81wlm605okd6en4wddycqsb19bua8sbdrfla0bd8j6jays3q6sc72bjezv42t0vncqs7jd6q5vel4',
                name: 'pq0667l9muxhb9ocqk0edar35olirk2xq7zkm6a403l1jegciw3d001qezw5n6liijyzknbhw2q6w3s1oijlad5bqisxqs18t3y8goudttyl8eaeufyni0u9key8djtxmo68e5hhyxc0cpqaes11fm99ad8w5umkkka5petxomby34iq8kukn07ww75nog2cslr22j25igkzvwdfrh5ig78bd5nsv8r1wps95hiey2zz588kvpmltj4pv91d1zt',
                surname: 'jc6gt3sux85cesnxdm7fmht86zh1zr12zxjkax4f77tykgeegazuno08clvi9jhx1mjnkwhcu5xmfsi156v1x1yv0kazcpy0sm24mz76tleg6war2zl80vv99omwo6y7ogrolf4opiaw8vpd96hcdu765k3rifcabt4ewm5929jeubtlzenltgbdg8r6qfpprtyzlzvm2bpzx20xgcri3xrwmjirt1anf7593aftonppeckyasc1vmmotelcj4v',
                email: 'myrledlgsnmxtt2dwjj2d0u5cbgid1sesbblvrgsug2pu8ksr9g3b1ljayt2zbiuo70bfrolor1qfxnwfusx9n0ax458tgudocnjth25upoi0g2t5evo8gww',
                mobile: 'yahj1nolkao0vdj4ua6apk1my3mo2f35egse55usgtttjkswoywgluu6e9kj',
                area: 'zst0p0zi5aunjjmngvjro0gn8aulg8h45ww68kvti8yxs969hjyayjkyo8hoaq5oqb68laftlivy531dbf2ahuplnp06q4uo7j83aakibxng3bjnu3c3a2i9wwzrrbzxy4gawkmo4ibpprrnenc0irlvg7ux32ud56n6xc4i6hoozjraj9pptn5l6fyuju6dwua0skmtliav3fjmsglij2kve8l9nnhkyjkhrip0liuzadlr0ji6nn7ioluvpn8',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: '3dkozxdrx9bh361qzahwgqmsiiaioavowmdvvgexoo5dfbdbbse',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'e98xleplq1ilbhtyyq8h',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'mmdwd1ez2kjgfdo7mb56jw5l7rv8iy6w9erewivkuz674ixthsrtayaecmxxue32zleuxchoof7dqw40dcovbed1hh06hqdpcs3f06375eise4lmvvyn7661zg15475ky82t17ftt46dj3cfe6iz051yh8ydv1xhghum64z34wejopwrvghvjyx3wkuuz3acrjh5cd7awvj0sbe9d4x1vmxzu104zlo6f1uq3bccidqwib4i9zb2zc8akl51nxm',
                name: 'hpgy164kgpynhnteheuz35ai1sl3kb8417j81zfptlxazpq0pugxelco9qixq03bobz2e8gmkf38on2cng86z0zhmxhkci47mbpr6jsl7g659nea7gcof62phqz9txokjdo72xjgiqbs3epwp9kchv51nh5myxhueqmpkyentwyjtkrlowu4hasxsbgi0he8vznf8c9wbozspu63hlu9hyavv1zimf7dii6xldfujj2wrfyeksyk1o53oy4vzb1',
                surname: 'i4t9qrf30rwpjb28ggi2ddm2w7jrwfhcvrnorhfdgxoj7n84i6lc3rr1hkyblav8jshk6figacwa3atvtawd4gjb8zna9rwr3hdhflpx9ztnfbja1kjyq71tpo9wzyvv6mb1ds1lij88r3czmvoebwekk3jgspio2jm7reu510vn7lmr62fl1byqzfz895z5foulelut96gs1hiobbc4h1q56h7tht90yk7elyss0q1tsac228zjo3manu2fim3',
                email: 'nnn57fg1fiphv8e4nfbzlkyy5k283sqdojz33in93bstzxph4kclnfb6mqi1je2d8pim29dxkm7duxzos2r96sllr1oqcodqup9xwae0a19q1vkbmbc46xfi',
                mobile: '06u1fxbzj2wggr2saqnp76wc8hxjt2ygxkcin4nc3nv5yxktlc9pt28y4r7i',
                area: '3uvfsyxufwnyjlt8juqb4lz0zw7hhziocy2ns6l73byaisr3lpbismvtp0nt8cqfmc4yahvaj8mimn188mxmcrf9a41dh76naqvtj9eme0l4hke6c3sn6sn4sx6cxhrnexwze9g11jx1bn32ppftxhil8cjehdh7p35fmu5e0yxd5roui9pzuv0t8svylbmoyu3k0fa2dcy8kgvj50rhyt31uggow9foyufiup1mpuqzg7mrudjl7w0hko9n4y2',
                hasConsentEmail: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'tg96kr4jcjuzl0dt228mw2j5xfc1vwxuayk3te335rve1qmgyl',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '01xixur1lrui95koaaf2f',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'jog05cf73lbziwadadzg1ppfks8tci2np6htqjxy9pogo6so6rxzgukil355cs3cfuxo1ahenowg8du9xqsr60pf5dvyyeldopblud6zbovon8o885juqnjliq24j4tsissg80bpt0vj31yjqq7mgn4e3g9uqcpmn3xfplwzzjzvi5joef5fl4xtni3mmjey6vumnz3fvcdccklpt5ybma9r0d81e7fna1w3fhwoejsyzomi1grg36etzl6f292',
                name: 'e9zevnwgmxy4gg580be1s2w8spbftgtb1r1tnbxae1vy7ypiew8zuyzj3y2q3rwf3hqn6annaiby44p3z1eedxi5k7yvb29hyena7k6sbtq2h14c3qj1az4mjz8o02tuzs8cfd6usvaawhn87fuwcrhvekf4cd4cdzhmwsyk9b2131gn19yta4d4xaptkt4k9xnwnmlh86v0649qtkcu68v61lert67cx5igvyehk4qs0epri9uxj1bmcacfm34',
                surname: '4vyi0hd1gg8agtce5xp30268a8xjrzf8tlx9wzvl66x5df752qni27irssvo0g8vl1twx6dho30w4g031t46ncde1wlnkx9qebuqzl8e2gwp4ol74su95pn2jys25ye2tdm05yrc9ag4sw2sid96122vvy6avf7j36wn2mvowa8t3iuj3v90yjd0gbhbfm4rojn0n1rss9b9b8ma0fasgnm5lu5l3ryp6zc9em6smux5lvar2vbbchm3tee2yfr',
                email: 'r8431wr92yscqdq5d848ovultc12cbge8lkgz8gyzwqr35ecmsktl8bitrrwxlvxdevz9v6nw7bqq19xmf82t7iyw3867aceecu7nc4nau3sz0f7rwyuwruc',
                mobile: 'uvo8gtc6bunkogwpnzxjt0p6cecdyu2azwz6jps4hdefvcpe4pmqnnec990n',
                area: '8h3te5kv71lpkaihwuthos1x3xe85jyyt0s7wzcvu24w2jjmga7vtf1v5hhqiadxfmhsrxzovnavjkswj04i73i6jzjdcj1qfk1zmrh3kgiwek26emrg5shcdkkybwjhk0416p6nzyjk5xg9m8ma40rsqjmuyimi2yizc7plbhnyxpjoal47kn9y17hd6w1zdwuvbdbeoiuo9aii3w6xw7bxg1jtzvt1w2yvqhzrjsvn0seqch0lk9s5401ps1g',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'p946a572mg4d5ptg1av90nr1jpxyfewck96xcexxpjp15ss2qr',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '9upczupesyyt6y2s70yr',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'sfay2f3mt7xrgrzquy1w94lpb2z5bo3vchke8frtzk3uw9bsz31adrw136ntzqh7xahe9jzs5bkofjy9fe5gua77a895s1vpv1jk1l8uzipwr5vomuxn5yc8sml55f3wg7ejp2vfogp725xpg94bdmp2nzxi983j465cc7gh6411h2vp3p0tjtjvhbmwu7bi5mqq5k6pxeir42qviorsun2elvblfnh80k1mfjv4s6m4i4q559r52ey5v218qm9p',
                name: 'arxqq79ijkaczn2s09xt3duvauychtn6xdegy8c7wexdu3b73ahbxs5qd38urh0027npuv7diugudcwgt1rux16kd2331v5myqn6og8o66cou6cql6rztk87pfu83c8taye3bnmme9taob6h1w87hibejk3haofvc3l1xyptg61tcfs95vt0mzrzfeb15cl6be4pgt218uaguzi0kvb451664f2zuwf1mi5bhws55itjf5j5j7zrkjokv6ox5ly',
                surname: '27w8czohncrtpcx3j5a40t9zqhftylwsq1cql1nnq5efkzq4ormagacnnzd8ug2i2rryfg1omqxp2ge0grmnbc8xa765qivli2l0uwrk6aplliu65fjo3ly5n6bdkej53z3jl1vr5n1rbvvn3qusm6mqbxgdgoxx3ywakqichvljv0rbmily9drg5x590pt0a3ex3q3ty56dneath6qfxqz0q5muy5y5eld6qr6iuegd19yqvyxq5vcm1stzi7z',
                email: 'qryq34u91diseo5ggmtp6yvsd7jtgkw9m3ri57qagb5lwdcz1zsy1j0u7rw15idgxs8nqp1wk6x9060ijs4lhzq6wl69vy20erum7cx4arczsh9wwonhvm6c',
                mobile: '8to4qfeouql03kntww792vomhrq9l9nzzaq55bndywnbuuuikspil7we5eg3',
                area: '4fczkxd5r5icyclmik61lrekn7f8nbiqr6lmw8o3izewjkuz3ewvnuvsbsu5vg8ltdyehdl0ichtp32l8hc8rcwg0xd08rfnuw06hgofzv0qr2rakt4fpbak6uz0oq8o7n1f8oal5abd7nj8pmkpvrqcwckfoqrlrhx33klld5bawnnc7n464plo39jmx85hsf6zoq4omk4dlhk27it1qlgps58otfnl26wwyzbj2gv48rlwzcxhckjrbrj843b',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'ewomew4pyutfjsslwegyc5nciy53ufuah44udz7gkk0usmfg7i',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '00k4sacw4jgouhd685pk',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '8ukpg9tqxdnh0jwt49v8gabt7jsruekrttuj17ug0egjva0cck3gn8djn6n447a55c3blc6dofdxolb2sqwr5m279aowm84kpnsyeqjglzolkqqpxvp52a3uga6e3hpdjm0t81r6sjibbm17e1bicr4szbunm19i3fnyuhbyl4vekbclad565ifm01r49vpckp5az5zks3fyclef2xta6k4qql24edw03e9yx4k6hb8uztmuohcp78ugz0gc39i',
                name: '8sclzm2w89e4x0t38788gjpc8j981m1k5fexohral845sit2atm3wynlztiyq0pzbjcyd2ka713s8x3yml6codxxpuqaiko4785mkb0ms8eji2x1xcc38t9t8t6sqbkmj0190l28pecyk7j3x01h0im08u8vu6y13xb8h56ocpu0xgokd80m9bzsc1jllh6rswzciqw5e39ukhapsv67xsbhkxpm6kk9g8hj840eudb8w7fw3div2zdhlxkp9iuh',
                surname: 'g9ztwpz4ypiw0im58uuubo3hmozt926x9mpyhdd6k3md9c30kbh0wxiblrd4oxzzdl25wo5ygva737eif4wusui7k0vvp22fk6sps4td1fs5tv621xmrn7snoqw3oh2udoan7nlw4qcg1ihihwst5w8ytaku0ht5lphs8i4ztxvsweqazkdzi5z0b0epow75tra69xda25vrop3bg2r97jc38mvhye957bzs1u7nfj0mpdifbjbw9128lacftnx',
                email: 'ohkj4km2pb261mh4zvigsejckaty7rff60vk8ahwdjegwlwad8tl4sj84nhwzddfsxava4mbn7l0v2qjau5ane4x3o13ju9796ocms8tr5hbeklevvfuq7yg',
                mobile: '0eqxlfpa7a6k7p8nitq1fidvfn7p7wjq13a3sir4ml1rcc313t35kdukw65a',
                area: 'fz9t5qhl2p7p8ok3i6hj36p9pcofw8m8fpv9wrxij1oj46tlt2b2fl95q4yqjxturdj66lvlzikmb09lmfqtd9fm3tmm58brxso4eom11yipsfi6zkt8d9o3pdtl06sn95y9i3l6rz3z23rs9smvmi0sijcjtnq5qjo06jl362689l5vvs04pacu2o8hq6ro2bkm4v64v3n8jl1xd73bsmz8k36sxvoe79s0b702ced1zbduxdln69ss2mdfgw7',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'zq8h8pqntbhlkvq9nypvmtj9zp2i4crzktha1bdphqbayfyojo',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '9xjiakf5lvsu864rfdsx',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'of3zjtmkbsxr2jzmu96070gjsxfxzud2w4gvl1awfgw8ueell7hqtsev228ww0lpi3zplowx6rqf2qw4inkgh8de239a6y1lfjlbc8p8ue0kv7ouh80f7zrsul1mpwqy66zcqq7tpoitk5aii6rhjtqiow0hbeqkuucr0coweb9w2vl3lxyi9om4mnijlplh1izrptefy64r0iih7kygxzge512fi49y1xk69tzw0idyc72ux55e7e9dl33fjpf',
                name: 'nmqsx5lwrnhmuibybs21azqh7lu9ymllrshgjbgap5rym56y5s95bypzrt7qc69h9mfxgvppecdp7axe8qh2u36l7zuhffcpytvsqc69bvrjy37vk7kjgzbqs04a4z53g1kxx06znn56yru2ns16oaxdb3e8rei7uh0nu96lch2p0nuliopfd0wtyvgfi98slhe5o7qktjpx80fj2fqbsog6t009zm1z4399hvzwnutst0w4ae9i4o0fwtxkcfl',
                surname: '4cjmnhij9q0f5nc00u78c2dvh346u54chsl473rkxs0r4y7tnjbd3cw8q3u8f5e2o211d6v5txgsta1yda9cy0qoiwbmksbbjob5t31xupsizfu515mnbi75hn1xzrxh6cnx5wtpq3g2awmf7lwyv6odc26smqxjipcgjl2jwl6sjrtom5og7dje6r8lbj3iuqpvfd0k8q1vbt3eez1i323xv8yurblyqgh8h1nrb1k1epl2y9nxdmjpa6czleyo',
                email: 'vwfutsz0bw7m4ienp7nrftc545q46i35o34s37d5nhmnoelpq7dtprbrhk58vi5ad75t8rfwa84b8vf9xp72ld6pwcjo8ciovwxno96ihlivfsos9adit00r',
                mobile: 'mm4ilygn52tr3g7mxa3mzsahqkjeribc8no9s7s89lj6g99ot8ltmf798mof',
                area: 'kr6lh03nxsq8dhszscdo9xp3pih156pfmhaf0nhqmmzf3dl3er6qz0dq3jm5pwvlzbbtvx0t6t9web067nhbmfw0b7w35yixsfpy37vhdr3sl0wjpv1d8tnbo7qp59e0fe2o5ruv54th2035giggq7t22gwtiyn5r8o6lwmetmxzudbj5njzrrglycy0vw1ur5nmwxpluc9v8vox597kvsagkq3msjcyiplq0l16hj5zocemssphizr2k5huez5',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'gftwo3j6rw3hsgkfdib9k1y6mtjgdrecssu5i5sw197q1cskd7',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 's7ncrfjtfedxb3xh2w91',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '6lmzk44v3ru9rr4z8123jpbeu8jcilt1kdlwov7vou1lsm2yrra4xqutv420fngyrxgtfk8azyqa8x6aglgovy8bc6jyny4p3vfhpvrsziwrldgif64l09dy974omowfn27gavargft9jt8pneq8q7a7kti7qdf9voeumtqxp4ahgdt51ey5cbqd3wycd3n4vsozi7wh5hqwhkxszz38pbxn8ps7fmngsfjn06q5lax32ochajbtjripdbrzytd',
                name: 'oyzr2h6tq4vero3eyivzse0862fovxlz69zf3nt97xwon6m0nfb7j0d0fhvj4bthatqlqp5yjhe44d1nonk5jbb1iisdk7nyb4ywqh9dhbh71qskr5egjjo9rpj2gh5hions74b532oq7er60y14pe7s31kt5ifq8dtkvrkh46w668rqlkxl2vc3yf90ff01z9ik1i8p8s3csd2knyn9lk4myp1jm57uh6usj8uld65whn03zj6d1b9ipewcvif',
                surname: 'i2py6ku46htm28wowf5sx02nc2njyxj2euaovf9r00f2r4lvc54wc8gf2fpe0lttwhvgvq02u60vqxisygtw4fnmuui17nx829dy6tei15atueroavd5apqud1hfxqr3icjpibbcdqomeeba2gsqtza83fz3jonv7zh0jk6cv390kctwzvfyvy7h4fb3ers1xlltwszr2hj2s3cbcs1t1fz5jj6dz31sxey4yhu36oazc0ru3evtwvqqj9wy1py',
                email: 'zam73rqtrbhegzbu3kwpvt9tieocsm1ovw06bycjfah9nzbarcbfk8y4uv613f7fvjnkns2qkkscjgasjjiytwcchp5ydyqegmkzby6mt1nqzjcpixqn09qsi',
                mobile: '6ki5qrddv448fhf73rt7nqs6df282ld2u82fhiw1qv3qiuo8sg43kz7mkkw1',
                area: '7ib04uhv51q9h5w5c6gy567xnmq16gswjvjg20bufci86cijp1ncfnw8vhhiifag9swl09tl73h4cakpgycgjz7xt041thzaueb4lf7owliqdn7r9d0bftfppi1fhcqw6e1d1u36fmaga35f25rvc685dcnwby4jj15joiwf1g36reg6dqetz1fkjq79xh3b0aw6c8ix6x3np28g6g6401iq2ftzznd58pa59xem6l9s0o9y00f01wc5l53h4bj',
                hasConsentEmail: true,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'td1sbyx041hy5nz6mnknf57as40odrh1am0ws5lqhloltqiw6h',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '9e3favs2p45yj5fqy10t',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'iffh4tf1s3ldmasmdkomecw186wb88nxqqu7w4mgt2ksblyvnpefo8ec4cyiutpz0u5vdngig9dbymzo4hfeg2cwly43mtglflb13n2oia0q6yqwwxjjbdp7rzcjo47q2hgbnyxdmo51a4q0ln7ylzgi2hguzrz82sacc5n0rpycr3ybm3b5hsceg3zc6z9513aynwouhwvb6khevhlxtkz8vq2v05hpgh1pgi7ebi2xgiktew8vxhlek5qk256',
                name: 't7lq7w9xpptnwrqilm5ws54xgeismjaazvupq96g6nc9dcni13vixylh8ljsw7viqxskz0amxqu1hrtg3zq37jtmpseg8c4thu9e7dx0sjdhsis6zn2zeyjpy2v0omde4ql2aipk52jt72dyxjgrkqf3qyuwtblwj22we8427olujzpch84u4udpybpl8vdy7455xmef9hseg8374if2gyo5y3umzibglbi9sx1eb3tj7ry658zdtfqlkk729ic',
                surname: 'ovajeu6fnmop6secdjtlb7ml35anzpw07vs5ikhwh1vsbrcmk7w4mf8w6ugdr9vi2c9wsy5q3rtk4zynesf8nkqo5jt2mln8j7q5ztvwja0oq13rxy5g8ydwmg7xhoq8imsz8m3afqyzueg1sas8x7qis0dgxb99rq8pwca138ccxut5zynoqhshzu7c8d4psjaqz7p9xb51bc587wpyxlqdytb1u906a7srhr9sqmfaj5f1jf4qra3thcyhg6v',
                email: 'uhlmhkoqu1z6om739paf39vu6ftre80ote1iynpfhho4y5ivjw42awh7cg7jol57mjxaiwz79inw7twp4dxxoqr6npfzpd82v9ymy1pytfp31z3dzukvqymw',
                mobile: 'g20e2e0ty38c0t4v3h502nujb4hz6qb0v0ighx4txd5e206dx24bq03ng2xbx',
                area: 'c3ls8gs4mmr6in9inxrkv69yenz55glznu7ab6tfro4mwbf38tw6bp52zxigfeist53p8xfyh3jq3ptluwpyzijsxshozg1otbrhf3uxmzi3aiy20kwxhk2at50il1gsw3tw6i57136kzrbm57srqi2zf1zr4z0exas95u8cko1v6jfwnx00odflymisadtix31xgw6vaz1r6rijvsadbw8g3b3pclw2ypx483xexne64o3a8bxkoc0qtjyzo41',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'dxdugpmtox4b5bbyxxorg5qmovo8b66glhrg81d4i1x9z0o2df',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '3r30pgrylbe763nljsqv',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'ot15t73qi1z4ccrrln0li6p72qp7w992dbckqnyh33ck78oowrwnt21yqzj3xc68ezm76e01ijo1e5jdgw4vxau1mp61k60jlh1cxnbwooqltlf5b37vv3h8fu5x8x9m3ze9wkxr8i1id6mk30t4tes920ghlf37gqrs1vaz984f1p64905w1cxj99o49mpdnn0y8v465qxpcgxdic2eqnoih6a503pksoy2z0rbv5d2kpn8qxg1vekfjz0zv3h',
                name: 'pks10yexj4i74zs5agqvijnhv0rgn2pa0iy1y4oe49l92zho98v73xez9nix7167k1y8n218ywmjpud3k3h5dxw8ifywgwgoke4ekesg4r37q2ueuaxierg2dhjd00107fo4otobt6gzvqumyqh07iue0d2e9u0q7pr0pgkbupxufe2fu96vf4zja2ydpj02ev50aclnhz68j7nuctvlzvhzmcwp7it25ixx5909srpuz6trntccplzhd6zz89f',
                surname: 'g8cf0wlssdhup17hr95p42qze25przy8ln711lw4mnrzmz3c8oaahihjcwezgyilhuv22rka39g6gpxde2ewxnj2lfg1el4vcrv5dc4d81suna0h5rezx0pf0twwj6tvmz6lqw0rpckj7dmd3nr0qt1w2hq8yr3f7tudxvj2ysmkzwom6b93gxomzyepixmmc7gte52420uj6ccctj858fef925zcb8mlnqwwjnclq6v8rclzciqd7t15j1acbh',
                email: 'aj27r1xc3ixaks6ztetoz3idyj27lqhq5c2h45jmssfwzbq6jyv5dm3iad0mdrwupwhcoflfdb2bimawu4fthx22xbkd9mgw8qih58cf2i7178z2u13ajnhj',
                mobile: 'ch7l8sb80on8jlzz2svtjn3o5encu1ybgwg0338cgo66acbld9tsnjsni6n7',
                area: 'i4rzt5ijdayfc34c563iqm1y2kfy8t2clzgqgaj3zwkebjm8n2h9ep9rhsq8a43gspgotdbrl06w3x35yuorty5hbmocrni3tzr4x22e6fa2rfzu4qlvcf8inzqqmq4xty9v3pk0ag79syjkgvbjnmx3gguc3l1l5el8mzfttjl05836g49ozpmxhhua6nvw3f3cijfwiqec1uzyzf815yvbmg2h9jiz4x7z4koozxwb1u7d2z3pd1wm5klil7gd',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: '50nevbjqxvfvzk6jx673mmighm9wkdootbtbjvkg46ucf0bnbe',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '8br4ck8b7i1gtgk5aar0',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '0gq5eunljh7r1u6mzkaca4j26eu9ni6q3bnm75bkpuwtutxl1cgnckugh552b9ihdevm2x5tcrae5f54tqlwh8shtf78vr50qd7cqnobexay31p1idxefa2lirajuwi521mqmyl59k0eyq1lv7vgexwmnvu4j3ym4a84shvee2lvukdnh1bh48rwmixaevvqre6w4chli60upd63tvuy6q98h1hhoj6pugq43rckl3mmguuvhs82goerk1p22ud',
                name: '2gbm3272z5bz51cvq5tbstzfic0c5z7wd8pn5p8yqk34apa4gd7sufn1pyjdpd9vezrltct52bwseuej2asddr96i73ajsjmdiop3peui3b1p4z83widykzit7n3304ao8jxg4lt3dog3o3mtioodh84b5fp6pf57nzgeex7nuvdg71ag1rtyf8gezp1o3y1t137yprtwqo59atis3motxdsxswj4u5r23ama2k73ly8upob46irc6dkw5kql8g',
                surname: '40jekzh3663hxg8qj1aforl1jrsd2f2zlwtre4npdigp9gdkuoe2kiljnmuuedlowkas0thj3vrovnxmpxnqa5psj0cemqyihv0eg3jy7dejv7pamkdfps4kzpom231rdq4sf7xvyw7kbea410xcjnq9ot0h1sjytvcxwq7hlb3h77cfevfwalhn6wgib9iec9js9g2acfc0c842yevjhudqhevrri6af80v8iodoo9dg7tf4d7idnrslfjr6z9',
                email: '7ub7lyrw64664mzud36myvdebk0hj9yziyxd6attzhjrxpqckkdjo11afiea0gjlxj63wur7xqbnfibjtuahxsg3whubks9kbr3jrvdoay4zi7qcasgsj74r',
                mobile: 'vo2fru3mx2e5mrim0qx6kt8kh3pxgp59tnw9t1d45vldtnlp3849rrh6r2g4',
                area: 'ck63fxh6uwf9aw7492i8pkfj7jxg8mrocpjyfi5sajoi26qkcsfdn7gwylk28id2vxxboouh0u7ulij9b8gdlw5sjpg0h02fknp52ynbq6qqmutwoh81ka6qt56vrp8xze5ydgzq08ua4qb0bethaygnqm196rfoix4qhnudkuvcsk3bwvrci4rmyw406u3eekuj6kp4lmrqf6v0r04bo4b9ihusjzyiinjpcprhbatst5aiwezbkrd4jjbpymn',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'g42vq4sz85q3te1a83qe2iice99wt6jjwc5q4r7313zpyx5ewb',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '9jzay70ouu0h481t6o31',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'w5oohqq0g5p5sdda8hhicpdezzkiadsnlf4erza2ryz3jov5j6c4kgb25ggwtc12mwl635irrche55ab37m74rq53hh1rj50lblntt8h6ddtndvmcuy4knth6v1pkv77ry3dv519k1xdi8gjoc4tlmgaio6bya24ox3kkwuf12toz7bog6vima3well3oilpd4ylz65iwyk9ez532pds6i8llqhzxi1igla23in4azrko5u3f1vsz8eds5tuxxr',
                name: '9bvdhcn5ahckc0syhq0jxm2qj7nf0h7bmhi3blc4hkzf9cuao0lovag44rdi1torfqll7zuz25vnkpkj1f8hvpgub1ejpzlbge4bkfu8smuobfymh0954rgp033qgugd3171ivbdhhd624vw3o16751nhlkxmh4v1otoitgdnq8ijigl2jnd3efdxayfuaivry247jyxr2ar4syixumfcgwxwtzyu59vort9kiv00umd5echddp9xhq9m7p4gq5',
                surname: '7shrhh8ylae0t8lwqr0c4u46xfj17mib8ak67t5u0pz3bjf8c2gmjdaua1ykc2wjuj7nn00s82g8aj06ybln1uhkwv9m79l3dhekyqxp3q7i7npf744hmg7odf51deaaq1nt6kuoc4qntgsi84b41t1kig43qa6qf3iqecjth4sq3vqafcxxghuo2swioqfk0g9mev44k8ywhxxcqd8y6p53wvcz57aqkh11atxpfl0kzif411ndnf4vjwvln1q',
                email: 'fwus42g2y7i3annnup9gp9jrytcxks7r6yhua2rndbr2fiyz7ae5y539xhwpqc3ipku96lo5xequ72zkyfjc6j5qlbpn8w2trhysyldr2cwzg198iudrer7w',
                mobile: 'tbfj01g5g8ko1dwwmj6lkslk2o54p46rul4cz0dffp9h0i8djjeenqs61s3h',
                area: '0rkrb4jtx6gqhht5cd3u1njoloh2ez3pro7hcixwdfhaekiys3jpah3zchxgfxxavcfmq275xve4j7pyo90n5unyingpq4t73kuoj5gsa1yehdd1nub81wxigli2sllg9yb7c5hz6vl5wr1kgpfupr2wu9kgtft5936m37bg6b47h5lw16ze95rg0j2kevwysnluwkw7rc3wtxeb751fcyezizv9llhstvsy9n0q2lmtvgzcsu02uob3bxckafk',
                hasConsentEmail: false,
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'kcbj2pqi8fsjfwys9mp8n9mtezwrlqfmzko2dl7fpk33ahcuv3',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '6hh17ja3v33vkvef6lye',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: '018ykw8h8zemij9zahzuoxzxwqyba9wdnsnv0k4n8tgiepim6zs8udim51kzxq3azuj4lbyutdf3uin5wbx7a15azax3t61ppsqm1wsiqfcii967w5108va6il1o6r1d2ledis5june4w0359rry3qe76y5doo7dgey3rxojemvqnawcn1mpbhq4pxylbxagro9qsc2weqix0vyntfx6vy1nqedklnnmxxpb2wj5me54vvvh8qe951dlmleszll',
                name: '8itim5hulf53l7woia9smwpz3kiqardzr25ia68xr3atbmuka1bx6c65gktm4sj70gd0wcv6a238na02f67ij42nuwmaag9ux1fu478p1ismaroqmmf98zsn8byy8wfho14jm6pq6h8qfdlv9zeanlalp4llji8gz2buyrju2e4lfo82ea0y3xi1xwdi3d6j4lg8qzotuuvxlri6vt5wtjx54rcai0aw7204oudl3feaxzam6eti5231fxusv4d',
                surname: 'l5q0shppieh9t7gjbi8eivs5n79vx0ole8ep9l0idmozgnbljg96x5b9os7y2aqal5x615wqcqvxxk2pa2livchm66ncwsgjx3qvvwczmyr4x32twjvo1r8bvaab9qxzk5sfh6tw3nv3m0b8oqknba4j2g9kq3d70xeadds40o80zx3xummua916smek8rtzf3f48cit74a4fxy4mmtbhj1h5oqh69cssu4yd7ixenmq76ao4bq3q9f5oisr8ez',
                email: 'gs6qvbsrzwdrf70x74rxdsch6fv1wbcmzjw9ae4ec24cctvebqfxg5vrnqa1kacoqan4sfxfh9r7we57y5io0r0gvbdp0u0mmq1slgq3bed4k36rkh7qqh9x',
                mobile: 'wdpt6jcioqr4siihizj1ccpgcgjnv3s61m1rvaaqhnntyo12ucgzd6qgvoy0',
                area: 'xjip4pbj7tic6r87iqkmkdm5xs7uzfogsz08ps6i2iogm00q2tey31ehftd16j3xflwtq4b2ybprj0lyphiukf7uy37ezzi84aezq35h3f7obr6950gg4mv5uie6lqocihhadoxhtybxmyp0k8feba1hqxlts8yn48b186fpxkpovxc1t55war15cx3jyslyn38yc8nr6h2x7g4q6raj6eheuf3iynsko1g40k1x6yr0rgsmoz1bu0z3hk6xeyh',
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
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'aen3vu5fuy3f9psqltmdxrdt0250j6xm2bzz37vlqk0c7p2a3h',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: '4arp5nh6a0nsyi84cydj',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'ijrr1jobustwyh5eco8jlr2tej00lv4wp322ofpqb69o3ko36eaps3ol1enw0cmtq7a5pnv56gmabee1vbqj6x1l36b7bju1x0lspkktusy84ppjnur3kz6i7q4s8qreoa5hvkvcu43fk08bq9w9kgmxry07ph00gh8rbvl7jdln25xyqqy0r5higrpxsml55lvb7vaogram6x6qipiu02gzpcl0cgkaekztr2exq7r7vtulrir02sxkgw61aqz',
                name: '336273v8e48v45vq4zgrmirkgmtlsv3hl7vow9a8i28agcnnun1w60ab47nfe0zk3v755d71k3xniv130r3iuydnyza9qc1hjsb4jyn8kx5tjgpnn44ubgrp8i5n83qcarig070rtdbin3zuserya837fpxm9siw5laagz8bh5861kgaos9iz45whnvhq8pwv2pkw74btkugebbhbirbmrfj5cxgttno8ok0lkq441a5hexzhr4ledpni0omk1w',
                surname: '1no7jxeadybd1bjur0r1qggift83oh97qptlb8lod15kfgg54n53h17srwrgloif1vvqxgz5irrk4ixveewpg7zw8lza77gk8zob3a999gr9ggpi7xjmmiw4twbkvwnlf4n88z1bdaok2c4ki5yzi2ikm1fmiyhckrkdmxs9luxh6xj90dntzq3s9upl444vwc1at9igp871y4k0qm23labh0y9km0tywi8tqbl5qeu9edbwb9wf7aitsm459v4',
                email: 'mjva9je3ee80b0nnnuoei1i96vobb0mpjkryaucn2bb1oijlb0ndinslmrzlf29jkw7iy4e7iutu49c4jrg6vui5uykax1vu0c8nsxi4g8b69jbz0s9c8ja4',
                mobile: 'dhnirzq2duhr6bzv28sxsdvvssek2orphjpbh4aol4t2fvywo570tu6gn0ad',
                area: 'zcs11jz4bvkl4o12nb3ytnjuoab9s7j1cm7pzrfl1e12gmqtkuznop84dt37iu1amd71bh9azdzaz8am774uuqg2q6n1tvyni0xha2kjoudhv86r30q9r7a0hgjc6l3nlnqwlydda0q9ht7ebf8r4yk9atfdl1rka2ea2g92ckruyocrdi3lqzlbbge13kzktxfzuzzftrip3pdcipnk82t3xk6qqbmma4tw386c9d5vdv1lt68rxz5utss0fy3',
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
                        value   : '10a0955e-058b-4114-91c6-de0003f1d641'
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
                        value   : '1d827279-ad49-431f-8224-8687a68c42c4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1d827279-ad49-431f-8224-8687a68c42c4'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/42018867-c491-4037-ada5-e95054bd331a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/1d827279-ad49-431f-8224-8687a68c42c4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1d827279-ad49-431f-8224-8687a68c42c4'));
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
                
                id: '1ffca3f2-dc0b-4e7f-ad89-e618c3e6d644',
                tenantId: 'afe4b0c5-8017-487b-b3cb-e0ecff69555d',
                tenantCode: 'ablr8dfnglzfgqy3j4wvgb2l0ytzrlefkb1lx06ytf2yyz03i6',
                systemId: '128d7be2-7fd9-4745-bd8e-99f399581612',
                systemName: 'zdzm3esonhyjcsf6yfcq',
                roleId: 'b840b42a-8c06-4596-8eac-3713fbf4ff2a',
                roleName: '3w6x7a6fz5lson5iiyowoj9bahyka1ivadx1yxs8yngyysxlrnj94jlburnyojad9lg8zxavd5uxtrileoc0j4r5oqhm0aiid3yehzbzaxzmypqrc006npcds0o7e2ktk4j8ef8o4cknglssfd2jcvpblzjnhy0mdf8etoygxfedcag7d3hy856cploifdb2rnqukl26v39ejswr8no7vd9x7y2y3mhj2dkfep94do88ip9gljswpvqfmz0oqfg',
                name: 'v646oluuzh27a1ofovb82vxy1c0vmjsg8v1qgsd7zfd1b3jmwqdi34rmj556c30p9nimp38e1c9nz3c9pp5it5jnw2v848pmb183yil8pns4rrbhua7xw36exk00eh1802jgb6imaodpkpi6fj8eh2fsfy0pt1odhnr3eh0rwnnu7ty4ymj8dcvledzb8x9v7nzz4jc4jy6u6ozs2a2qegd3kzu7ci47fx0gi0gz6o6q5xg4dw41zbi3khpqu9n',
                surname: 'djv0dvu15no5y7jw1q1ujhy1aujqtsxxkcnwzj5aai0nwcl6rly6jlyp38ykkga39cp2lhaisovm03t71ogjxgcsfrjiffaexwceiw73k149fjcln7vsj123dnap75m2e4ptt8xxqrx2e7fg4h6kdfivgtrph36yr67a49kb5ie9bqyj3yend0cmi6z5ogfmff8n9qmidkgwu8pt719d5dmm9g7pi7cjp0ronha0r3el3cyqhsi4rdjxpvgm671',
                email: 'mfqnk39f5ihqw1ha40a9iz99ddlyq1ofu6exd2czvp7na71jbfla5xwp2iltaiec99vwr7a0wgtye6m84kp01abtk13d90opsd0atkiqus0zcrnyjtke3xp0',
                mobile: 'ccxgr4h3fk4z280wvz63egbwnazzhf73n31blmkmtg70uex50xqre7kufi5m',
                area: 'xv0sxfsrb0bej0b8asft2dj4hdhlfwc5ptwzn6wlbyztyahv3qrne9yevmj8a5uixfxm4q8bi0ut1q15e0l0l6mmyggio7yq1qhe9jbbp1wciginx1bcg4ccdi9qthqiqaxbyqfcjlbckz7mu0ugm4b1i2q7jjgol4weuwy8ospfwhts5lsuw5nc08jwmqhdwmgunw9gzput49bygnkr57nvfhfgi2u6jgubuhrwxiemu8fa0foub5wabd3gkfp',
                hasConsentEmail: true,
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
                
                id: '1d827279-ad49-431f-8224-8687a68c42c4',
                tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                tenantCode: 'rhxn4onhrne11wvw9r5y88iewgi002bwicebq2sjqfwhw5m1d1',
                systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                systemName: 'ej0174ob8wmx2rh28xh1',
                roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                roleName: 'xzcj374pabrijt6qd524s4papvlaraj631lmz45usxfrp0tekt0dqp86ulb5j81dcg6xm3k3d4ehi15ogc9akiodbvic2767j5oouw4savrcugnt6z3rz109x0dhja237ytv55zm7vtrt463vxv0qodzf7prcinrajnfhcxp0ki50ip0d66v7r6onxvz8xy3ad0zxoky191m3pj2l41ru6ls3m94gzkzijxqqbctjcn8kwg4n7kqqmgbzvn66qp',
                name: '8quuhrdicnp2xbapdej8p487zgr2f3t07gv5g8prc55iybtqvvoxc528ixlslv7eswbi7hppec27dfmtn3v3zyt8ip3hoq844xmm1erqetne00pu0ku8ejp2ak61wdd3d709m1cq2u7uec07ian5y15pdmxf8vj413h3smat8bphyck0y7x1kb02ujujzs9h70ekj8thfjddend4tfy8u7u563yq1yj7h7yurf7bubob7v7ogvbx45skiak07ve',
                surname: 'qyud7iym1ddvq26kaaajfgf8ynzxdr5xugz9hl03hk60r8tnwe4us90cswcq33nqhzerwnk3f9ee5o4cmecey5lqwtg7m3uohukphzzt5k3rudnle7rs86b3hgxaitm5lhk127kq88gvjocg2zf7aa9zpoiwh8ilcdi3e0dnuyxz6gn9aeexcxfqrkn2k6vymcbvw2puflt763g4gtwx5ofzqvg4myp5uch6dkmiorwi839c8u2huxtudhfds58',
                email: 'iuvwzhvgb48c9kv9i66onz6vw9kd2qtjo606mvgeo6xjithk99darkp27ubsq8kd84ta79xagoeigb8nq6w0np444m75l4fwcwqyirwok86kfqyo3q2mxs9c',
                mobile: 'ih0x2x495wan94jdkx2v9lm0jywz6y4opa412lkmbto25iy8dd67liccia5v',
                area: 'a9j4c489kx44rx2ppdfcmt2sixnk2d8gkczjp9j5myww965iyvjh1bqg6uznv982tnlxojo9q9ss6pqly6lsaq0xpam7j28eczyvoweyyr3a5njcbqypg9wdsa4g9tiashy5sqv4udeotj0l6xfe5jy53grl2q3eqkgnwwyos0kh9rnie3eduvwc8jtwdwp8cm9x1ldsov7emcvjilm2hbx3g8ykpb21nsxwuyg1v216szbfdosp9qusi1kv5w6',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1d827279-ad49-431f-8224-8687a68c42c4'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/37603404-72d3-4667-87aa-46fa4f245c85')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/1d827279-ad49-431f-8224-8687a68c42c4')
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
                        id: '8a718d92-c868-40ed-873a-7de221eb6188',
                        tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                        tenantCode: 'yj703l7anr0uy5l2gj7fi8yz5sg9qpr6j20ga4o42z97lxefk1',
                        systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                        systemName: 'f9wzxf215my5i92kzrxe',
                        roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                        roleName: 'z2y0mlkw5kcpxs5ynamrwbm4sq0ufw8chwtflxmzjheg7iq43g6s2ebfw8ygdn3h3vv78zvrscr8stlovxa0a50ntcd93w0q590rsns43t1rltqt1334bfxbi5eq3ss5sue6li8scmh0iral172yyr7xv8i74q0bneqv8szju6sjg71a00qml718vtdn0e5vjldbxyzaau7m8sgksp8d1hcn7r2dq5zrjwi0rzie6lzzxgun4rbobeoh85hj13t',
                        name: '69hnbvbxtgkyqx8vg4dvxnj0497x0q4154wpe3kpcecq12tuasjd1fvz0anpz8s66wro7d7x3wf8lit5cnrqek5ad2fmwpvvvki6xf9xfqlfqytku6droupyhrsppv6qued5w3yow991wrbfz7n6bi2igste11cby5rmsb0ufjm1okrtghzy2ezlg25tgsht5b7dlobk81ipzkvp8vx77cryqahvlly8hcjdjr3czs7t7n4nvk2srfzx3hls2dj',
                        surname: '3szuym0yb8dz5f8bcmro7qeelt7uqb1j7oesgoidt4q8m1tdwbp0dyiaic26q6e6wrf52eu98bblz30bdyazfgxlh7xvkr8vl6cuaoq01dkgp8he0b1hnc0l3xa55rq5fg8kas5p70r3w3mrdjuoo3l9pr8fqbnc2n3ketx7a6u2gbhwgaulfy207hvg7khhamdejvdav52c0v76zipphwg337fxqxcmitqp3km720qu7liwgdgrhujfmvl3rtx',
                        email: 'vefbkd1ftffv8zin7p8ku4r0u5rj98nh97muplqydbr9og93p0ll1btiekjus37fet5h24ed7h9q30ag0g8h3dmramev35hftgn1csr5o0a6rdu3grn8izjw',
                        mobile: '4km5vqjsgxc6achbc1iyutyyly23nul41zuxj92wfainnhrsze522loex7gu',
                        area: '8pgpkm5q9amznj15gxcj0batn7u834f3d90tp6hxh450iu9gj7h0p18wbj6ptxec0ql3puoktrsmusv69848oaixiyjp8bawq7rytvsi3q8cyjw2tcbprl2vzii7guj89k6aita82145eh61fv1f8k4uowhsmcih9g8nyvemroe0eehix2xmdvf3evjghbdtiqlrn0t8dxn0q360im62mrsg1ufsu7ccdbubj54fd2ojy0vu91fjyqajlz3g2vx',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '8a718d92-c868-40ed-873a-7de221eb6188');
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
                            value   : '0460cfc3-0c92-4d13-b43c-38da1fc5f314'
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
                            value   : '1d827279-ad49-431f-8224-8687a68c42c4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('1d827279-ad49-431f-8224-8687a68c42c4');
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
                    id: 'e97e584b-001b-43a8-b897-3c4bb1ec1618'
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
                    id: '1d827279-ad49-431f-8224-8687a68c42c4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('1d827279-ad49-431f-8224-8687a68c42c4');
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
                        
                        id: 'ff3fab03-ec99-4834-8947-94f1e4a9c56a',
                        tenantId: 'd3d3aa5f-c69b-4382-afc2-2ae4e0d13749',
                        tenantCode: 'lyyvgpbj33whps6maxj7btiom6hsuiy6a2uaajphyufhe7d1a9',
                        systemId: '02fed53e-acae-46f4-8b84-7121e5f228e8',
                        systemName: '5w7g8irwwrwsimsmevyr',
                        roleId: '8033376d-8e21-44d4-8a24-42dbf3e33b8b',
                        roleName: 'utm5xkf8r5fe794f23utkg37inexbeod7e667hcqpdnwgmb3vhlg40ivnuadsl6785tmdx3cjwvxbu9wkc02cyu3efmvgyibtz1x12qd50ilnyyic269bkuq29t8t9fxaqdx7d1c4kytlwucf8te8vl0s7koc2j3e69io6cs7ws71e94a9rgwo45mwdb2d3587rd8urz488h3681a1urxa49fl7g78t9mi5gxxfuz8htq4pq1foih5gnfaxcu3g',
                        name: 'xo2lp7yerxpeq0hj76rizvjhxz3g6dhhi7ul8v0m3fry32dg3h84zbm5vg7c0zokiolvqa54l29e0kj23kfjh2b7wqwy9j765blxamwjykugttp4va3ewhv5igy93psht5j957qetu67o5o13i49oah78yja2t0sgdhh0kiu6v7uensa6s0apnz02uthbg111eh4wbaeoktl23o4knmxrkvh9jq7s31zzu1zogelsm9tecw1vu76l3593cbx9lv',
                        surname: '1wlyzc0wpiafjq6kc4n22n0ufs5iv6lfal87tovhy7zsim56wzc7ll27ch5z72fp4kf8v4oeharl8yi4cgn18wu1w6vvm1yvnbrou2lpv1yfxki3rge7ixogy4w3gzj74jeozxuxmtxvhl1q7brgsrdbbt8mvxy8iihdkof2v9ptfjrj28a9cmoph8krlpyh774pec3hcwd0dj7iibm57ys3lq18ezypp12hbpqgia5612lp4y6qz9i6b95p0jq',
                        email: 'iirrtltddtaclr4x8d16dw316lpzlghtblhvtx1fpf71l5lbmh2y0ao90oixt2dspg6wvftx0zz7e5ricig2hm20quownn5uq19sz2aikck5svwjf3nbdzmu',
                        mobile: 'fwvre5i3u92br2bb9hm2qt1697kq6cwafhjod32lbmwm50uiwhyuhp9fy6od',
                        area: '16pgr9hx319eall1780k38487ephfnu3uu24yb4kvkavjrm81xgb852ebfz8ppb58m8vmlxxxrcwn2poybbc1dud0ujgaueevh5nl2xqk5pz40uhth9czk80nio24rgtekqa0j04x5ecsh3pmg3osarj6aiggqomisvd78hpos1ygyigxf2dpt0nko7yqhngjgbzp3i2qh85qdeh117w6dp0or3ogtx4j4m6wwpr4itbt9scypc64aksm1uecj3',
                        hasConsentEmail: false,
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
                        
                        id: '1d827279-ad49-431f-8224-8687a68c42c4',
                        tenantId: 'c8e58895-0f4e-43eb-a67c-670416817b9c',
                        tenantCode: 'myuejspwzrkbpm74x9tpmw59bzqqha53z2h44it2db174fs28f',
                        systemId: '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2',
                        systemName: 'mxdc4jjax1yyw3lmkomg',
                        roleId: '8687237a-648e-49c4-9e0d-2ef63aa02f59',
                        roleName: 'wfurr86p1dqcf3jx7svn0lnam6d43jjj7zy1zo2miiekspru7ylbm2uv4nbs792flod5owegzyc8sndqa97my7i5fbzultvs1giy4bx2ocpiiuqgjbf574q27q3kahh34dt7bb1q3k5jvzknutgr78tnf78vjvtp2qazkgjggb11ip8iifx8776pv0gixrjlm8f8blfo6un9rdya1vgeaiqqtl1hmpv91p3wls2bz89yx2kfl05z4hr8kk68by2',
                        name: 'v4dryfyromrhis9wast3p350mfsrtcrjbe4kg7f5skq5wq1tbpfabftqw4gg7x2gcunhwac5du44u8n3kgq9my0bkwtv4h3r8wt8b0furzak1klfsxp75hecs4zx00p4h7aejom619wrp536et4kaqrncgagacwqpljxjcupxt756vipjt0r9824sfsh7vmqxs7k6tafkktn8pse7xwib5963mrmjuqkg3l7dbnm876d7xlrakr2oq6lbuteaoe',
                        surname: 'i4tra2ckmif1yoqk967vitsdndfi5edwmardqwijsq9ol15d0jcj3ryp9kog3thuc6gior76p69aqbkr3s89ohmqmm47d4mdck5tf9kqysz6py7oqe03f8mjd430dj2e616xxjrl665zrzdvvnqcnma2p5f69w7x57iuje90x3ukcwgef5d2ckra7bqmaprn8xxsz55xm1s09itxpzz29qddcfz4nczvoqthymmiezzo8ly6ploy8dx634heb75',
                        email: 'i5cigyp7vau4lgp7q9l0g5ivmajhji2yd5tylliyot5kkyy2d8utunxnjinb6wdfemkskx6rkcbvkzf66w001rsrse2jwx282nj6v5i9z49zl4jolwnh243n',
                        mobile: 'c89piio1i16vf8gklovjnk5lxut1idih52lf923ck0ft7jeystuvkfo9mnwh',
                        area: 'clc0ls7aazniym4az4e81mhnqv8fkbuh1zcmwhuwxscfegkc09bexh3w1rg46y3eb8xy9u4pgbudta2x4si6949x5llfys96ryrn1e5eq3w5t0711t4km5xg4y2pas4itbjy8lz6myzf62v1z4pnzg3befzmw4v12vi3duxansk2s6b6h5lns6umkel5uhmsy0xq4bcag7oipqrkzbkhc4278wduexd61ste2uymcgi7f22z1gghpf0qvy1fk6j',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('1d827279-ad49-431f-8224-8687a68c42c4');
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
                    id: '66693972-6b1e-4af9-8c56-d7d0f587a41d'
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
                    id: '1d827279-ad49-431f-8224-8687a68c42c4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('1d827279-ad49-431f-8224-8687a68c42c4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});