import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('user', () => 
{
    let app: INestApplication;
    let repository: MockUserRepository;
    
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
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: null,
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'yqywm6mdiao8e7i9iq74drh4w013o9lzqqwvmcg17pwvy6ewwk2uua2twas0k5gvbu3fjc6xuosl4wlgreu4dnfeeklnn35sbr0xxdcdew0xi1lcjonp6hujdrzsslq829x2jk3hnqk7eoryselmmvt66l0xeu1d7ismdoxrvcv9fgmsqz8u5g7zm3qyb14qokxyk7j4sc9787i1m11ndmvtk68a9utw3q1u69y8nqoec4gm7as61glnpad21u2',
                surname: '81jkpef48z9cpbzitq8k5fbw4te1pir5fc92mcfnxoqyu3wr0k4iw1rtom1z9llukif23gbw926zj77vo9ahs2phkqw2o4v8h8nlshi5eq2aahwn0py0auevcswk42jre6b0xdzrjdera73t1f3zqkr5vw3v8bw91ojz0i8wavdh4hhv9yhgb4q2kz2g8o2kdjnfha4jbr1etamge5s4e7dbmo54wtpzoopindxcoimt3o122nhanxtnzmi01cx',
                avatar: 'mxk88n3nwprb8fn4lfs3u272n1n22tdntum6us8sn7szv25h54vpxpyneyq63l4lyb75p6f6fyb2dj2hwbmf6sfqmolc1diaodlvs3sdmbuin9av61t1dseviof7xia9dfs33xg26qzaw9fdfs57yeu8hsl131jqpi9z4iswtfy15m94g49w3a8evvtz6lgmwho6ej0var7b6hoqck1whdv1hqyqxx3tl9fzm6ba1upcz4koxwk93cep9te5e0s',
                mobile: 'jduvq3tqxwyxjpi3cyjtij44b0phi5kfakbkryksga3pk6ppgz5x9lwwwawg',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'uhlke7gp6jwjiasnrypl4zvnyrsek0j4rkbxw4u64d58ckhe6tpm7uq5v7tef83m75q4o3vlbn44e7hmynsck2g73drnzuwipw2mx8bh1j3vc31dgro8t38o',
                password: '581sodh304bhkj28wuhgeltnrsftkk4s1eadglt9qnkud0geaegzjfzwkqigwb5x6kx6kgw5ttzxns00lp05mz83xrgknw9k14ofc8hwa749hf47p8lbbglte5k83i13b9tejyqfcf3myiq7ikdft52iyv3dh3ftln5zd68fxc3a4vxix65n0nr3jbzowrf5b8fabs4of6v2hutho684etw7dutqxkgq0fzm46q53lxy9ht7xr90qr6oqtwu4gv',
                rememberToken: 'yhvt81kt11c5opmwq85ow6sh3mw1b0cq07z9yraky1npky54c5y54nn44re0h14qinjlyuie8wy4m2g38oqtm0aau9wgzq2iofoyu1n3kgaabqu83jz46f0g73aihplsdkderrnl7ux66wa7an1s9hmhuvk7blwkk8gubd7ge43t8x6t3d8vya64qff5g5jf2f3kcjepwac75cai3c688fle4nxdm9hjcrxe3womm4lw3u1e5dj0js26aj50kmi',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'ovczha7zbwouu2qoyxtg7eieio7nday4t3028jzkw4li420silk9r9d9zbcendeg6po2d0zhkby8h0rw9am962bfaeotbp8adnbh0q8hidgjysabrkjum7igvs3n7mjug8gxspuyoieqcwqy7migwb3y5dfzrbqsn4fa4ckvikk0hdz149vwxi5p0kcqtf8jb9ok1xprud9a25y1pjajcpc04c2q8piuvhdxtym9jmj2zrb5rgtzk975zm0f1jn',
                surname: 'fxf2r0epvm2xl9n0l68roxbd0kpwuwalmwu9c1rvincxwow7dw3xpfdioa0dcs9n3mhk6fhfjvdi88i7447khwd0zxrunvwvef4f384a8jl8lphlca39wqvrz6a9s2l24rwfx85hghf2dz63vtox1t5lcfv716yoyhhd14xpwkl0ez0qw4i1x8avecjmrgict5tpzllufki5vij8dghdkbcpx8wzzqltrnqdxl3p5aopsqhbon44scl3j8mwn1e',
                avatar: '8sqjll4dveqzsutjk9gigqq9pqdc9oov21cy5dz23nbz00mxtlsxa66x6h4m1micc7rsb4z7nwzocgm31v6t9w51qkb874qv047ow0itkw8io73mx63sk38m7gjhqzx8r1pxzo7eia7jauq6y2yoyj8cxirbxabacfescidtv1ozcnixuyus52u8u5cluo2iu9btmwhtg8xqyggacj8nc9eo1d2lysrxdvfyj7izywba8xs1j01na0ewhnanlx9',
                mobile: 'wlf5imohw7gvzvutas5ed18xdgoljt1nzw9eaw5wryfs8wxq1mx91uxubgur',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'cj4311otphyj10s11qv3be99y7b5gkd58ze6yzpt2upgo8jklk7dvj52h5xgpb0zx2lczn4l2dmb0lx3fo2z0bvd3y5aikxmz7de880n1txi8njgjuhqaubw',
                password: 'gz63xqa3cethhkaq8lapju1n2i6b22wff0htihhy8qdr1la4klljg0l4p7zx7wy30av2eotcy5yxnt4f07ootcj86w16s3ao73bzz4yni6yu1caclpymww88z7ughdy5evlb8pscxp287bx5h2opcnaf3fctnxuhr5qk5w1r28v7xs2tv0ur7a9tg06n0w6us2c9sexiok9sreyf7o3v7d15o54u494kre2rxerggx6f64l8vevf5jy1zpvn1br',
                rememberToken: 'ootm43v7xor3evnqlgpr6yo89sm0svpsg1ism1ifgmy85uu0yjevs9y5ylkd4kv5w13gqqbkqb2miwk1rgx3ftmx2uea2avppyy8x83n0wu8m47tsoo9zdc7paitvagmut7jgxl8l6wmm5clemv92r7lwelk36kozewvhncfn3aggc38fetb5e00ukboh5f6qe9ooylhfhuysp45nyp0itewfyajh0m13d5482avasa18sf78pcu21277aj0jt7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: null,
                name: 'ixtjv78dzgrgv4jqijbv8o8y44brqzs6802lyxc02c7b1zwxi5m7see9e3zucuyn0hek5o6c1nkcqazgfail3n64rwb7knrjmnccq13nki9yklyfbda1jlqfdmnzab0g4fl9pyucgnsd55a9q0q48nwyg65svodtnoz4fyz17ylkgjr4dwtiqqdvamglun6ymm302x3mqne3xkz04qaddfiqn4swaqb32eexaag2j3i0ihg6rzhs0f8uf1ao7k5',
                surname: '3b7ynqyxz1p4girn8bqr5mytm5k8fsu0qc95ufsnanyf8gidnhydsnmhjx1e118nn2ouubf0jrkr19d9hggqphz30l554xb7dh0u6bqa0ldttggf2unmxs60di8fstnx3zvkwzf3ko9o1z3krdz1rit5flupjjsdgir48lwahftn26o1g087b44dqbk6cwigbcc18ek08gd75dtvwveqqrd22j9dxqwpk57qwp3et60m9tosptqpiu696sfllnd',
                avatar: 'rrliomnxpnh1feyis30ygxtnvi41unkv50p4frpjvxehpc94thzg62eushtpmw0rg6mlgj0z6wuytle87ks9k7huzrfhj9tmgh5cw9z83b78ky66i3volm6iodch0z6xccc37bdjv70nqgy6khwviqgs7ji94uqbk6yccolbyq58memfx58qzsth5pvnk6l0zat3o7syyg5iox4fxvzjjph8c2pxxdlgd99i20jaw0isoo00fyn9skai6ku30si',
                mobile: 'byqsqs8zxydawwf5epqaq1h9r4bj6my2lfr6ge5ktzutplv8b4ymz2g0q1ha',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'kps8hszx6jx72d4w9pjzloaoi0apnd6ceqkndocll5g822hqiysba7dsx9qxlov308dkj4q8mwwc2t8bn7ma2diq83jt27urau0rsy5w8y79nm45gpxxr859',
                password: '1djid2onugxcaivwkh7md0ihnq1irnjftbmugt0rhz0205dbs7k9e0zcawuopkexes9vgaxoa0jmr63x90zgwwuao9lo37g3ydx5iyhlto9a9j2jbgssk4ndmnf7i56y509r49ubldx5nug4k2ml7f1yubj40covidfb9r1jlq951bybgfn9zea9zu0gp4b287r4aodokazbmoaty1athc5s0b0glk0kmkurmx8p53dfx921ky1g57d7d2h543g',
                rememberToken: 'ncjbk02cttx18qarynpqep6bmg7toaarrust43xsz654u7fm1wnaoj9z8c5l28f1tz8dcwlsth7bxwyim0oz89kldvwbazpr9uqmnxq11hrrwjj5i2xl92q1bndo14r5hw1aylhkeuqz0wwitnsfyrmz7soy0l06jxqde990bu5c4a2kqdid92z5ftq6wwsoi9rbbi2hb03mkbv5hxj1e61fyofvfq5674fbxuswhplr0n61px129vsdw5ytza7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                
                name: 'fxebq3k8otbe5lknoezl03h4598nawcgt6k3pe4yd56mm8czbd7v9a07kyhs7bf9id3a086upx82d1nl1q40o35873lpoy7y3vbjv3by0l8eddyu1iida5brs32ui80hss5b5zbent0qx2hm7le0ih87yae314730g3738vjockl9iw0nrohkhjo1gm5oo0v0fvj0gt91oqjita9901268ddim1dcs6esefi0tkq2lqj226x973h87ln24smq0h',
                surname: 'oszdm7hjmnpjwygr9zteh5sz429xeeymr4plo1yfn6cib5rozji1rzxlpei4gng95d34rw49h78cerpimw6hrmkl65oquqi004wyers54iysm2vbale959m6u4yfmndq8allnodndhpjfo2v9keooo154a5yk3uebpfrzjth0re2dtu8uaata0pvei3geu3u3q2wp6i4v5clwx1y1qkpgfckcwkllj6ky893w4sp2jv9j1wukw22co652mlrmwr',
                avatar: 'wubtcfbd2y65xi3v8oqsup128mmfwk8zp305w78daaua6jmswcv3ll6fu7okrzmhaqcvwwdb8kyz5ib1svo1udpyhfu8l5bg5fiaun7b8n45igtpz8flexzs2fxguex6jf0oqwk5mmmtdcrkxp8mj51qsx7l4nou4u47ovskamnn7r2nf2m2ve2dh9ato7ee24ovdjrwlhzopcrcgqw62oaosz12w9r8jwwpd88z7vkh4umx8jvdvplogs80kyi',
                mobile: 'amnjgnm79qvof0krr5op8lyl29tx041fb11yekmjdbcwa70qtx1hj0n8uozw',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'wyh6q4txckcwawv8qqpm735v3evl4s6xjrgtatry40cus0wz7r0nns56hk1hux8auyna1labiybf6gnq1jnl7e3myueq6nabhwvpr6wjwoxt2ryvbgkoqyj6',
                password: 'zpfsoka6yxm9v5m6ds82hmelybjx7jxkjcgbfi1x88xljysa03owtgtufvy9zl3lo8e6t0yqun3tqp323tg1m4o6rc1fulmlwkykt4t2xwzcpsazkmdtgvbinsfyak2zkr59gyzwbm6vvy1971gov7bcyoz7zdc6jo5m3swomlhe1eedjgzdssp7v1qcpb1k7y2clpbwmudaah64j0nak0jdxmtbr39c5ngaq88nn23cm8fu3km0z0osa74f6e6',
                rememberToken: 'z65yoqb7gi7uk8bzhbnimjro4ymsppbl44a9cu0ah8hpdlel1diq00uy7p7dimjy7aspmvujjiqed8yvvmz8wwcmrwnsqgikmzho9yui0tb8q0z3gztczhrz687y5ijar7ajfbpmbq9jmpauku53bplvck22e519xalcu7sxkenojae0wetwrmmskw8q3du2p5k5aeqwe05ln5j6wwjyfcy8i0aplp88i8fjqk8dil6yw5i44c9nig3tellzkz7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: null,
                surname: '9u62bu6skg77mhmep12qsr8frawml7s0apc5pjivgbacqqte0gzufoeu98oiwrmuzbmitczou0q2sdwjf96n78yiirimg6it3eqky5ffaw9tvqw0fhf2n67v6rpcrek5lgqz361wcgojkl8kuziagh3badx50oz8d9tqdw9k314j8wae0mabm104ngpluu9zxmnseji8tt348ltmtugea0iks903h707xsjgccq6e4yrnopdvxejw68qeakruu7',
                avatar: '3qq1cits7y1bzx9g8kti1mhivc2hfsi86c3kqzu2s8pffsh9g5p9sfhib5imgc12weuh9fntejj91j8vp4vjq65enxcapu8hi8gz41hqlotyqbqhmwmkyyfy7opiwe3fpshgvwy9hhe1uh8zolzn192ibpb9cfd33dk0wifmkb54uxridz7r4m8n13hvh58pk2uc1x2fr52l3gplyzhbs32l2gnin29gt6c8kx24cgznlzznaq0j7k2rfuprpk8',
                mobile: 'jp2p2lh9qogzfkkrzndc5dqm8qy5tcsr4jar5q0ccljesqnojkpjf0tyiveu',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'jipklqlwc968keauczxvz2fy0pg4corezneczo5jpcn3ls0ac92kp7n64722kg4a5flbiuwkiykft56yyvbrvrqzy8xgbsxm27k4a3e04u9v719l7s35jzfu',
                password: '599gteq47mccnz4aesakgvhxb4uadc2uu5s2r9ctci9gnwxedjravocl21jtp9u70m9db6vxswsakgufq28cm8krjeqcpy1clfpo8ogpd9tykcc2go0d4bguv9oeznsjpex6za4eu2z6yy7cc2vbx28agvfzxx9m4xkmtomexi89h3rgfsp4w9hlnp6thu55ggad4xg5cfodduq0bt5orjkk6nzo1mq3538rmojeo8n6gm7hezjf2gya0hbk95p',
                rememberToken: '5j6f9wc4haywyy4i3hq1vz683gqc1x06y16b2x3figlk3jre4yculi5dhnsp0r8ixnbokzfbuctzyv3idqy6r43jocjhw6htokpfi39etrxt93rdjr402tw6fpgnt9iicf4x1f3so3fctztsj0jtefa61y54n5114hd8su5nhwbwilnim209y7vbgic1707j672rqqfu4woopkow3d2stclucyz7hga9d4hqnryhzjio9ugx4orn77sm2gqufb6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                
                surname: 'j7nwhjywoh6y8h99jh3ur8qh952v62vla69y5hx3py778olqkedyqx082kwmee277f98ptiw157tzkhkvdxwbww2ebhah2vfv8a2b6tlpb7ct4pjshd4l8ido3z7cw2uijmhz1xb6wkg2egnqjexwtj1iiu95ve1xnllum447bsqttdfwi9r461ye24kk49bjbcfmrqi76d6n5sn8bcwhl056b6wktyw41zo30gzcssu2s4u78tyykdhxh2kd0a',
                avatar: 'hec583wu39o1ox458ccd77btez806e84e0tlxj8gpei4ibzf2fi23xwp7jkad9nrkg8lfr8x7wsvk9skkrsmczon912uepg82lmwocxe9cmb7gc65fk8j9hrewuz5uwlb38cdngpwg64yvctpwp2bneiqmx798jh5txmhi6eqcwtlqr9v57iw7lhv5xwsx2d90kydf5h0rh40t7ctno000q6tgjpiebk8swv1wmxnmujndfcx0dam9y3aejezaz',
                mobile: 'a9n71m03s5gdu69sy1o4b1ltfoy7ylykitti2vuhxl3404evxmcc66c4br5o',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: '4vyl6wdayynzbkgtsy3b9lreystloqxq2xa4ktvj6ire0ewtmapmwy091nfzbc0gemh2hj6jtfp7hoyh95yptu9fz4msdz9cg8a1r56vzam7keysc36zh2g7',
                password: 'agdmpx9p502w5u3e6amf1ot1roxx5lr7g6n1ambbzwivty9vur5ubvonyh9x7r0648tvqjysaf2vc6owx0a880nol8fdfazi1kzaxepbe613to42p00haipecfhwqrjt2n4bwfyejx7omvg2frsr7dd4sbiz0k2i9f58lgxqi2dfkulh3y6aojqcbz2cgy25f0zarxrhi2rissaupdpparxak6y2led4du3n8k4xwd528dobhqe44vu0trm3bsq',
                rememberToken: 'i7vmnwr8pda063cm190hba8xcm88vz93zgzyszeb420oxz9sv4fn48aqy7fj2fv646ffkkf8l9zhbs8cusdetp9lgexw3r2mu40vvv8f6wxv7thmr1ekvt1ucuvfouidwo4xsn8aiifsr4jw49x04ba2p5blxxo9wjuez7lbfnurs41d7qi7q1owyhpjb1bpvfackt6u7g2a3wb58pqt02jkp6ef3qclpgmozhpoblrilrzc5jq0sktm15i5rpt',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'wfuxdb35axecuatxugjj4avh2gmyi6s12d4ocfg2hf0jysr4lc2iyal6fa9uywpoknt6r80da457liu2z11p7mzuqypk7i6gqpqofcqr0xleaolzj2pijcjm1z5g6p4dyqo7mz1mkvbr7tutkio4780fmrrwchv889obqnlkawwvabaqo8vc8ezn5q7j5dguryn6ceb1d0xkiznumepqfkpuebkm4hu5xcow1nwbr8iptbpt6b48ej0o2hkrroe',
                surname: 'lh2cs09rle461ctjopieowekw5ckzyseqn6khud0u4ijf732c09tmg4vzg8kklpljma20tjrj3hise7nqj1l3n5t0ai39m84rg6ih6dodlupp556ybwdabm7c8zjedi93oqr9q3izxukgpeva8jg5pgf0i56rs85k6acjl83cqdaoch8sorek4qg97mbmuboeqige7xqqet80oalbfv5q69sdqz2e0jj2areolq1dfj769ge7g1wpa788o0ezi3',
                avatar: 'nwq2edbctctg83w7yvf5iqherwjooczg1ftbqfgge7ux1jpffewybgqbjb9dj3z9kb3dfx7c9t38swvcf8k3t1kjokaq9rlt3n1foh2tvjgtdo4qa15r3nlyhttkz364m2qo83sd5446yrts2polz2d20zzho7oztfwunk1t0wwk8jdt817zk3gw2wfspbewcpenbkdamwwne27quqcvy5zh9oz1i8gsgdi5kiccpjoech3tzc7eb9dxgstd0kr',
                mobile: 'nimlmngpny8pgtg3kntvg5e4coo4kj6tx1ivu0c0586ab823coanv0o6afn0',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: null,
                password: '1vi5lj2ecnttycvsnanfu3edmwwjgf8qq3txwcgvg24sn5ri8u9beb4zt7kcq5vdkslc4l5twfl6ki479v2y0x4jtpwfqsf4969fhplbsojfl1cc5gsirtzv56k4ps04aoacv79nel6glo49a06x9rqquxasgj5sudcuy18aps37dlhjwupvey94zh9nkgrhri2isxb5zag9dnrm6s02i9og711v5bgjpfc7uu0eqm72g0vtyc47dml72iq89z7',
                rememberToken: '7219q6abzuk5rlg3pjo7ribcjyq1b5sm6kyr5qlhjwldvisp9kvad66jwbkh6tw34cagxtk7pewygd511tqhqfzahy7pyjyxa6rl5r79smxb2qa7lypxkco469bgwulk93d0zpyyzy4ioxjw0zado2m8boe3eaxms1lps7vlu6er6krr3bekr3po5kef6zfz92xc7qdooovauimfd1a3271lus6z0v437tj89s5lbtwvjqjijnk7suvar6sat4g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: '7js452lhh9yc1zex3dltgo4mu89fnt8h6qq2hgst0xc1gg8svlh15mudqu5fb1wv39eox23ln79t8mitc7ea8ntbqlqlz3za6b0zcog2y54ccqi13a4i2tqhtxdsx84blwyqwodinp6vi8k8o3el4l3apedu1vui949o10cuxr1m8gc3bgbngeittvv12025om2mscsttoqmts2lyy4gaxhpol78i02qwog6vepv6jd2vs2bbntvrph2izaqmwu',
                surname: 'hj8ipyvde46ewd27uiwwepmeaiv4skpehtklt5vmubj2lo516jy19dwszpae2ccy1lw8b1zpqmcfsgaxa0dg95p9n8bhxjgx8907tu4fsgchh5jbialq83i5dwqgefmc901zrrsu41j0ja2nrn1wyiw4pqfscqxqzqj728i2f63puuhju71qpqzoydi6kh5ru58clt8ete55zr35zd71cm59g8app1scaqzyvvsjh8btsvrmzz47lgn2e6x8eb5',
                avatar: 'tt0p9w9srqc1d90ksejo1eu83kga100lbzzq3fyerqe80ohq12gl2sofrg5epzg9eu7c4qoqt7zy9698u5u4a4hx0jgrzpoesf1hu0hqyxlc3wicj3r1h14ti07cgl504tyk1nb09znxky5bbgq0uncraav4fanyo7k3xlsp6rinwruapjctsscdfvjmd3elcr8ywidp0y3eonkwg4j5gyxtownvhyphlf9alsg0xrx5vqu5ztywr9r5k3zhc13',
                mobile: 'cgixankbsen6pez21xkg8c8bqt36uqrf8n8w3yzsbp0rcbilgi73je73fm7n',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                
                password: 'gdmfi2987w7gsgu8bdbmnk5dlc7ts2bh3vmqwbb83ix7zotztgq9d6j65sz0ymsgmjo226tifriwiulz9v9e9ukqugki0oh6qtx9lh7r9xmyvhcf1dd1upa3j8j7o5jz8jwfj7g1nwbawfag3yjnwseqmwy03vyihc25ohodq05ohm6dvyyd2g4m0f19p4lmize1daarhh5r7idir0b41s1y3hxa1pttqxxqnv1zyeyupjt2djxfdyep8oyxwx5',
                rememberToken: '17m3hxgf50ggghmc3olonqnqa0eafgsvfd6z0mz7gzccz63mxvleurr9jcl69oastzr82udpqf2cnz62mru0mnsf7bnyhbr4v6vgma7clopht086x6r4847zl9ddha3y7r4qtzw27hwnmqi8elekhnk3pw1zryfzaaz00cd2m4yfhlqrnr8x8sfapcelnakap4lk1dw3ndg9h6qnq9qpsj0rcth6wksifpo6shaakepi0atpb0qzo2wky1wnxyi',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'xw6se0xy4x673kpvvoj6q76ay337nsuw2nldp8b9ujr4tg6yoh083es1dx852q441ojwbo7auz9ogj98ani743xon6md2gmmdljkm1zcepa5e6pm5iuv49h6hzkiqn9ffa8gcv7k8qqpmkzpaw8dw4clvb3cjg482j2irmx8311yqtz5mxbanggsdlra5lejdob63v9rspqlb3k8wl4dqeon5wwcsdl8phb24z3azn3r99tmol13opursj7tn5y',
                surname: '7z070ev5vomuydthuppefgep6rjq5xz07hm0xs54uvijns6a02w7qqra8ljooot4krhmpzgr5ej9yqqutng3he9n3c9uws473c8udps3x3oup6qr66u627hm7wcemiy7za9rh4h1e1amltfjkao02bdc5q8gzfsask81o0kfqxj9bqzzb9pgjbkdheue1pqyy1ke6nsli9td3gcpj2tquwf1023f1rkv32ylzzbgdzkv8imwn815b9eceuyk1zy',
                avatar: 'xej1n3lk5r8i2zq1z5j5ldawwgfxzy7pyo9xz5fwcgm86wk10ixrsh8w3y02s1ejf541btajnp0ktt120k9f12pdk6tcqn4t8qgjrttwtikyxwxxgt7jam5w0m30wxzfrq21vre3qi6ce3ksdexgmeo8u2t1v3wqg28sjjx1jtsbttglnao1d9dh40hk87crt16y1rc766w6tzxiiws2u1j8irvkj3xgh81bjxjh7f8urhcmeflp81xmr1q16k2',
                mobile: 'tn6r6upduz0ujhq8pumhgn7cnzto9zsygkzyref8y5zyjuelxd6b2opqurcr',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'ua7wmnyq8fjtdvuag5y5qw2bntcyyg6wavo3hag9058awc23xeshby8u68mnhn689c7zfn1ixj7ztq3nfjzr8vwd53wj1ro0c3beepqmftpwuq9rfjsh8iws',
                password: null,
                rememberToken: 'rf2hj8lahzrvkd42k3vrxulmwysiz3awi48unt58dqb1g6696covjamahq9g6oq7qrvbyh9zkuc1eiiiyrmaac62hilv3fsepgtg6aao75kpftp968c8o6d0hgtyrqs34vc2app2x3ztzy2o57hjxi61x5hapj5h8mue4vw2z8fi6wosiydk3bgx750qgjqyi85pjqtad244epkoyivn16ow8wfx2k2s9dj9qnoztx96ak4jx8yrujgyssivzrv',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'owy7hohpztwopw0w4ec5y45ftna2ry9hx0q6u48slmpgefpkkz1kbdzfisbe7fzzzqtgnmwakwq4iqhb3h1o72u6wv3vd3b3hcqgou3h127ft47jxz9h9p8x5zsh5lxdif77ndwjyfcacrqn53x5ntgk7oq19op64j3476xhpak3rl3854zhj6zhqyvawza3tvprp0450rmo5ksvq6vgn11ajwvmhy22wxyqguhkyuz05z2ytcd4n1q8ff22tyo',
                surname: 'xms2cnkmw4t1ivxaay6tthcn0hz3lnm1a9vx9zotnw54zjr5zzvddh3asy0fiv2fc8lbsyeu2fwpo4mml90rj3zxwe0idyve3i16tree562yt7p2bnumg5e5ljtbugatonlp0tv9foiqg866mcxx8t13cmlann7uyuue2qqxb2osha6rjhgucpxcs0pwrcrg1zhpj648r663xmfl0qhe6crol35zz4de702njrxagkff85xovin3tmrxptc7tmb',
                avatar: 'jmmxar1vtb0d9f2gzwvacpkmaiqztmtzlv8nyd2xvp91x6ztp2mn0omys0un17dlcsohzbtoswe9j34afcxvjdtt5uge0qherac43pj71btp1mrhvt1mql5gnl4g8m34vqh3aq4nuqk37dcpgkt4swgyjliig8otmnpnkgff3xkiql9vjq6n73s4ex3z63u9cnvjf1rhsts13864cnj8lg9xy72iftqvibdg4s2rf71vw6fki3ypmawcyunnbir',
                mobile: '2eiw4w8204x2x1ifrnyg5plbt8lab51gnuaem51kv6iljhw8qr8nq9ul3gsl',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'd6zm3xrj0qkjrzpq5d23x32er2yh53ustx4dsfa84zk0911p16val1kjzmuvae0tzxxw4mbslply23ydkb1i1utq60gi19a178bb8ttv6ndncfmk5ebialir',
                
                rememberToken: 'kwbfysch2xzffqy5dgtn8n18htvbei8m8dd6ew20thw70l9amad5tmcuxq5j3gztm162ol7dd4jafisa1crimzu5eoiexrwx93z8f2d24le3vsao9qf0xu6vk4q40i8ob9fapzkox325zza2nzsvqx3zhzpmhvjcso3qcnawfstaiwb5liz2ig4hh6hx3cx6kpu6vzh4xjoiytt378u1n5ov8bsrnyfm6mx256citawpjb9g0u14l701mx4cbsi',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'n44zw1kgydcgqkuto799ummqjc0fysx7jxyzg',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: '5ideqg786u53oc3kai37r40c9uun9s8kibexekcuooug9x3otu3j4ty1klj2wj7vlnu42cihyr92rl8kgx11jnwspu67ac90pgwu9hh2vkox1ahr2i2kzhgrvsm7s7n2mqjgqg445blto3e3ksdtfq0p3t6wvib91yqa4naxymr9ybkybvzl0h85iztr0v7b8x44ez0axgnlh1esv3hxc9s3qbv68wira2jnhcrhc0iaijowoxna29u2ut8nucr',
                surname: '5cv3j886xq9y6nbmy852dj57pzeqo7184mnol25cblrr0v9sit4p0hzd2penelcf1klju8kk51200wxooj06vqopctt3kmpwrqtj9o5p9swmojth76ylxznobmlfj06p6bebe8nu16x6vqi4nyzsovjqv553qbax0713c1p591dn2x6xkx4h0tnxtbbpqyu11p9pe7ky2imp7stc34z94hi6d7xtf6f3omho9tzgvv2d0268hdl71dwdnvav0kz',
                avatar: 'vno1vgnpb4sh8jwlwr66pdzh1w82npel1mb3w8uor45p8z0lt9pe6p08i8yjpp6vflcgop716phgpmckz15tvej0fgy2tn7mah9hkj4djhdqxnd5n0pg8nbe924qsqhx5kuoen8fjaso3yl2yzz2m3ozh2s2g6povr6nx5bcvg364qjzm1pd231ci0oc9cfolku6jqkz1iu8qe2i9yzcuxpmen43dsy2l61e677qyngl1cjh1iyyza9ebohoakh',
                mobile: 'ibonkohtf7x1b9q9gggvdxhs3ajteny5ftk2mhrz3noexg5wixw2jwnnt7qf',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'bzgo8ysikmzs2nd4en1g3otvkgxiff9jhqcxtsnkrfkwgokjmeivri0k6g86h9bkztl3tnz98dss2jrhex1vh00iywawzxgop6lt464raxf3lj72pid1c6du',
                password: '7bn16hspx7ddtnxr15al0nu9vqts0fr78uua8h9dw3l452hvfpeg01eyjl8bda9f2ag14gzc4j5gnc8fwa3cstogmrxhhw7eggrp5m8foralxunrz6sm7acoecjg0u6xypx2a1hiv3x2yn4xf82dwncii868dk6b5cfj9czerb4lxx4qzdiy5cptzr3gluicxq91gg4anb7rasievzo0oz4mbrv91jyt889frwkp5398g151i0a66yt6iicp38t',
                rememberToken: '1l103wd6vzzhs3vi6y244tjwhxzxkx44l9kfwlarjgz3cu7c1yvtc1adc0ufdpfrqpbe6wy6q1q5noxw5lcf2b8ouygh13wqoeattvxdnvqbe94utplo1n0mo828l3kmkkf74cteyr6ml763qochmvypissyzp73t196edm2on6gf05yk1mmhs7ffv6qrp8qev92gjzw5sdc07lvv2so3nrvnh2639khf05k311i6lnhevz1qdcza61do9kl5wu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: 'c85rw4e61eopurk434mkkz14hzhn73c69nd87',
                name: 'j86zd3vdvr8q3f29l9pdql43ljzulc3ss6qvsj1wl1ck3sjug254avfqi3zlypg0m7b100lxefnoro5hr6vmozdkbf2m2zybngsn4mnozlecjhk1dbzc0ijepagr9az7r7rx76dtm5rjx7dh7egq4fbmd8w80qwdwbla1w33chrcdtinmeupu0d9aye2qork93jw5f4f9o4mtuf8hybfxg7k7i5qorl5uxcop6t11wx6eqbexbdantg5w37pp3q',
                surname: '5u59jnrjaonqzglnoy15z4uaaykpa7thpgqjnsdcjbpbdi2drn2tsamdp9x46ww3fpqti79cpkhj7gcao1fah78uhwpnkkpe8oyjx65b098cvw74xnputi9v8i385rd4id4azfto4r9r1t8q4d0t3y9abkp3ww07fxtn3dv208djtr73zu8i4f18x2t2yxik2mdvi0dd0igf2gsl8d5e5ahik2kglj6r833vtbwev3mldadt4nw1v8tndgxcww5',
                avatar: 'zzxfx5yquvhlfgo88s430605zmnye8vub529nyke3z5wydxtmwhndr8img4xlwa1bhlmiyax7a6f145xb1zqscwdna8evghllt6vclzfgcervydjir12cdigicrwrhc3mnk2llazp22af6k6fg9o68fhxl33k3wyldupzipetx5hgzvkvpx7qhfv49ide9b42iynb3y2sqpdtnqns5774i0z8efq7l5ip9kat6y4jlez6has2ofw5jfn2vvf70k',
                mobile: 'bfw5mgchvp14tyo3s99qo0pwlhlp5gs9052dqlx7bm0ip9yd43a3vex19ckk',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'wdt6hcz5b45nphpjdzluz840xmdx63k3b012dva9rskea5pzw0fkft7vmk5yowaw19x4ztl5y394pg50ctyfe12rcxx34y3poerv503vfnj2x0napa0i1jum',
                password: '29s04beglp1aji1x8wuwy9x0tflcydd3yw4jxlzhkbzfzjh542gegh5pimqarky0z9z7czbigph9dq2jqeijkv67wq87nlha69ju645iktg89cd1ckr55amzabt21eqkv65eqj2s09tib4g33mktxwkg2n5jj1xj1nk363c4i5ngzc0upsikmhjojffe2nl2gxg1yq68tw9zhrtu9ma5rn5nj31o2g84qm9pcmrol09xvdho29z1xc13li3dibb',
                rememberToken: 'yd80l488bjp59wmke05jc6xs4siifzap31vlwznz3n2hpab1ce7ubonajpibisle2tsop72wtbw8miomk2go2moamahiud0x9p7s4utd91aqrs5yzvynjkedhebode4naewsvdd1i007ejrwpnsqcxr0h0lcwss4t5ls6c68kezbrrtput3x1xjr1i5tqlph11rzoceds5bhoe5us7rdlqlvrwdsh9xxc76svvb7zvz4vb2yop72q5lxnls9ro1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'qqtez1zlzct0rm9auomjehzfk025usbt5zlcc2eyv7pphnd27nyd5jxrgrvhveq5i90n0rj366bkx2zbhtaqwahcjcda69zu0wn6ueyhssj5gtx1n011203vikz1xxavcj4bagu0nfddf8pt0rn163o1wxsochnn8oh4ph4zyp22tpsr9yum0pg74odajrclasbf0m2ebdz2kusczrurpozv963c6ugm1pn9ii5isd07q7ss6dd9yenpehbqvc1',
                surname: '2srk7ksyqi9l7evm2f4plv7vo3pvq716oa92f4me1jkdarufxdrjh6a92d4977eo1sd2tygyq34wemcu0xifsdhphbf7zbnx8ajgo2qapww9e6eqq7rkuyy30y3xk2qsb1xhqucdlk2kwb28cv7u26hbu2iowxsmhh0q9q8ew6ym9mvxefpl11be9mi9ffdgcw1d3atm8n673cgl3lkc3hlr7ct2pcg2gjrtlqscjmbtcrf8unrc20dm1s1rsq9',
                avatar: '8ij7lb9rmmxpq6sgaevgf1ss8fbjx55gqqft0hvk3cnjimr5a8du7sz5rcwb4radtj2bgxfwhtykyx0su19rrrc3ci0796ab9t0ft41c9aoxqagbkm04nkp6l2qv8to23zxqjsfm2rkm9rz049ozslqipthgg60cw8ephfvdmcydjx2pk7j0f0ay7y7f7tju7j0s1o3x6kvacqph1iusnk4c27204oq6yqxza88mrpvqn40aw08lh220rpjw0uc',
                mobile: 'gu7m719sf1sfxztiwshhgrp7umioh6r3p7uqt2vbvowbxmcxnjk78yvs7upg',
                langId: 'ja2xh5o3o9cyr1gv11k4d11melmttuzou0r1b',
                username: 'qt6v1mo9rifve7tkm9dqdbs9q6c128ozkbqay6po1edvew7w17s1bog8i2vxxb3u684d7z841fhif5nto36mr1pxf2cxaisxqns8k94mqz6vg32zyq8svrsa',
                password: 'gnzlyv1xqi8u7v3sxy7smoo9ein6ncsz4sp1nio641vwb2vxi4v9rlutrd8lnwxixqcwamyq05nswef02nlc97pqtrv9ccletu5g873qsi42yd9eafyzzjxk2r9hk04ie4jjyzd0imqjasb8bctww081qibgti8ccsr6ovihjzk5egsygibb16vqhvj3ycpr6z6jbth5k5sda50odajz0ap523bslnvk4d5c6yf40jbg1dra4faguiobeos52jm',
                rememberToken: 'rk8g0sntnf1wxbxuxbx9482rwqrhentge84mry1h4y8eqaur1qkby4lp2di8nlg3w4iisw6yuh5o7faxc8bbdbw14lv8ya6qrf3q3a7arcfoofxtzivfvotcawshuqzx6tejjg9srsywrx9do39dplvltwx4ayx1uecvudiskomzdu74vyv4sxqy8ohq2jhnwe6izbiyxtxfvn701zd5v3svyzricachaoxddhjltp0c3i2iw0wa2i1dqf1kmv3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'u2rcsf6ikk2ywelyjgspur83rkchw4fzx9dmc9m2bjbepe7gcumults3sve3jh3m0xphyqnsb0fd9jp0deyozolnsg3cbcetfy4rzpgqjvqien1av93b9ch3kyv84q6xzst2bnj0y32bbwv19fturkd6tz6bfzzqfjifvtjkvub4s6vyan4vb8kq86d2eja9rlkmmon4vidgnj4ooyv1h52cadp5jkmplvjrs7eq9e60l3fom2otstc67jugl28g',
                surname: '3u5uacwb5u6269a00wdi05kq93bor0xkwtozhw3eos2nmg2wid5nwagt68yveor90fe5qi058l6kr265f6mcm9g2f7yohfyvzu1s52ei3wsovb0aqib3aoxbf7ueaoe3inpvur266lgnunecesqay8padg8yl2hnqrzz5hq6suiq3qgqnd3zf1bxorizvshvy0bxfz4mcyeikbpepxoj7eu88benjwh2j0wy3qn6w8na4z7z4ufcfhkmp63ltzb',
                avatar: '00tabqq16k057fyrttb330icyf62dlfeivm0liwpb618a8fxg3cww0kb4dg50spat47wzixib3q2w51c40zeq9ghdmjkyh1f62apd7spvhlrlruoh0v1gvumpxil6teyyax37tf95ukgfghnbewa475vpef1x7ad6hlkby6iv6joqtv5vpglyn2me9wg72050grxcqk1c7sp3ax2syornm5o5apbmvkezpu0yyp7kftq9qlhj8nw3emnnmese15',
                mobile: '1akae2txlfbg4k41g36m1vy0ng9c5oijua88l1fvz84xgd6j6gnfseqoq2bl',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'lp6r8hf1nf364hjfv5fdde5kmahru7bbczdiujlj7gg9duqt1u8dotxieuwlr262of20l5s6cnausn9guedhtso9ckscbprsmjpb899lv7wgeocc7mnhssg8',
                password: 'vit7095h6i2w1mzi8r5tpyte9rq3hkpb2wfa3r44ib079nmgjek57tut77tcg8o0rn95inpp5b8mbd7gm9p74l54tjex2v6orwcv002bqxfaagpihj3c52ji4dpcynbfm2ed6rf3fju2hjk8w7karkvfueme5jre3howrlh1bny5z2fliolu4bs0cet5akaba1i0cf4suwtq2kn4n1z7sm6fpusgdmyxuvify14ubmg6q6jslq1ww1yrlcfnixo',
                rememberToken: 'bwckk7g7mi5iejwnahmlbfjqhmvog7cwdpo9x6kwrezot6x6ud7tth5snsn5ker9oydceqk98z6wofiprh1473np1cr4wiaixqqz1brr1cxmg2bx3qefpyqw0n759qriwoz7ouuargpkzwagvtsggts8sj60q22rjx0hlxrowuuy9o3jstx8ug44t773d3m0g9ddl2dx01p5am7fry7impulooubbkrg0mqeqq1k5ufeono06sk5604mk30wgh7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'k09db11udrfc3f1q9vy5zuap5kgk3hl28i7nopjggyff65971bdal3b6kub58msognv8bh46l8w4q0mhsnk0g2h67k8vgez19e946hcaggctq5q34ywzm6j9ode4615ynk4rj4d4m6mrus406woefqf4eb1logzdxkdylprbhqj16d996ju6f8bc7o5tqwl03bszcl2urpoc31a1y9snkft60ok3yfz532pf09vu9fmah6a3zff83eftufqcada',
                surname: 'xxxd72mufc1rm9j5ux6na3zfyvvtse8k6f7q2jmv6sjapd8yl4sca5ynhhsb8w0a308fvj2n3o5xjzexzz4q9qv2w6g045lgcfpqhme73xhcx0anbv9n2kc8p99pllefd63zqhaas4tkur7waay344trhw6czg1caefff3er89k40s8gfof6e591rn56uihw37ejud1q8zd2smjn7a83knch8cgjux7se1vzzgap4c0c0urlyxh70ykdktr5xvo8',
                avatar: '7wtx0iaa9mskknf8xgngh503596dm7cdpiy6c7ye7mltscjo7fiaj6yk0l8qaxdtfgmj4v8ewm9olsa4dtcz807bv9txcogglq7ps6rarm9sf9dv88329yie96kzif2g6zqa16d7d7ye5kbqfj1mw76t43l0ikr7f9zuxaq6mx81wvnwj5jq6k4vvqs87duyvk535m08yv0hbrlyom0d8vhbi3tbyykezl29xebk9q2gnq2le45w5ru27lp8mke',
                mobile: 'fd2tk1gouwr2b2xo3tshbynkhmfew7sy4xznz7veqpieqhtwe6zio8snb26t',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'xv39x7kw95k5und6uwjx5bnaswq4lmb0xe8bzhfl10y08px1g8nang4kd5nfohxg7mfle1bgxe2f6owk6kegcnfsej7jfnqvildbz5p6yxcyonvbmwii9mp5',
                password: '6fc7y4vwkoktu5tza2rnpt15r7ftj4dgm5prf0oniu0yypgxs3uond3fd2j0f1mr9fw4vojfj4pqtebvfp5x281hkj4alq01oiqagbg8m3vjiu6xfviy0xiluxkvvu9r1y2z1rwghzvzmvumcolqk34vt0bvbt1p1q3a3ckj0kpytpgw8z1bwkp16oavevsotnd58ioq7vw3y9g6r8sbb4eodmmk3djydcf7a9tlob6ayxndb5koep6adt8na7s',
                rememberToken: 'lu7yjxmrof490evehbsihtvskr0faatgxbji6kec37rbu4bq1vgvmvqarxtrirljg0owtuy6zhbju4me900tpcvqwnnons91fyz5d8y3n1qu56ekk3jr2vfh9cbshi8l50s5k6zfk1pb0t63hhm0fysybef1v20ku1banyfjmvz40wdzcythsz88sxufsc4yrveq0wljks22r09pon0286080cxemphi788dppjxyfa8dxk8o12tdpzzt20v3p0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'uvp5z86zgj225nslqwrmnji9u880yav98skwl45pc3ygioxkz346le8k0tglnr8qygqciuamwt59mxcyjnhl20gsu0hfa2cd1zpxgkeexuwq5q9vm31q9j78ep6tvb9fepe2vrfuyrqyaslsfn5a4a03nfbscb2of49sl4w1i6rlaa9bcp3dpdf39t3vms7m5roet7leesyl4k1r9tuapqi87mr0us0w5i599yjiad65rw0v1iksn45oz1twtkv',
                surname: 'nzxp7oua6vi5l6g2ckrrlxh94ajese018dferl7xn7yed2kokbjag6fnfredxy7jocrtkicmqzbrx3o3p8srfl8byv5tljtsqsrkmfq3e0rijqtle80zyjkv9bqqlmlrpcgartmx7v98lmnk6kzcuspl8mev1wmrrvvwssp2g3khbg4voals5h45ts2yk9xkj9vshiezb3mwjia5iontcamau5po6y4si4smnz38h61ui0pbzbw3mfvsfg5lmp7',
                avatar: 'ys54sfxj4eggh63u3p19t41ohnericwt0of5dldwam5f7si3pc8i8caj529voma1pdrwjtz4vz95m7vujywitftkty5hxnczkm7xydg3xy7fm83tqnmt1h2sse31jicwd03q3c6fulmfujtvhlnu6zu6ss8rp049cvq98iy5svug3lzm4diirjeezq3cm7gk55h8kg30kcu0jv5qj4ickqftyqc52zfinp4kaak86y229x6m7dxw5o6cfm6rn2vw',
                mobile: 'od98uwa2uthgk9uy805upzpw5xpjzuhv25cfw26xvuajjp4e9ly3p8rpv9ow',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'clttz8s5w56cfmzltmbcsmfcca8u8fbw9bawljyuvflcesz6qi7z6nab3gitgnnqrtkfj7kqglieaya9xfhsh8luzfasf8xsl73ajk25armzgrxwsietshts',
                password: '9yx6tms8xn1zcgu8mhsmlc9k5jncs76nmar8g0d25z7eatdwstj7mhgzz2j64icq3n192667jo0d8fc9ww9ol9son2dby0gfk62eqbl5zbuhal7wjbw0s7c205znjnav015pwui5cl35h8r20xm9x0hoik2pc5jpansze5pqzryskruakcnzr500zqagsfuzwjxsw42hcsdon8jxngyvb6xpcygqg63lysetnd71c38lneili5m91wh2jammwwl',
                rememberToken: 'sfpzeex9ouj86344w1535d327mfqi0volfhaghhs3c95r8oq1y0xu74llo1v85wdmtwswray29r3x6itw3e3730798l0u3lairwpxisn0fhuguo46ursjylpu680fk4ikig3kdr5yb5pobx4yo68u7zu633x8zw8cpd7vvhfp3eipsm7x1znlzofyaky0mw95w8ajmuh29hj3g20c2bi1542p7gl93zyj31yv8qnftzq6mou1nv9czc285817ev',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'mujqk0wtdnlnjd3qlqu5jmsjpcbwannyhww0rbqqfj03j1v9q3al748p8jtw3tzl08fuanu9pcq7z2znmxgm7x5jgar8uejpevotlxvx1gshnb1uwpgst5cc27srb4li33x9jib5u8rqs9vxi8p82rq7cev7mlzdxo5n4gb6clpceem0fyulujlgzyidc6gzsl36nletimxol2xkkod8xkdgv3kee30kmecodun32i4qivv3z6aaq8s23t16s8f',
                surname: 'z7pelko2uj5q0uay4mranv08h4wz2nz2yoergco3d83kpa2pym7o1oxs99vfb7dateduzcimh2g4miu6pgxr5515am1aeqcqyhjd0n0r8wbxa8jdzn1hj27ojbnf8pvxbccqd81mzy5ipwiqqaoywhvszee3ai5w8g5a8dvzxy86ehj7m80q1m995du1p8j8rx12j8hc0gzuvno0oy261sfmz2e1h2c68z5085gqgd62uls55ft0fdaytfo97u9',
                avatar: '5xrdict0iwxizw62wzu8g8di4iy66015brdg3fobd2ydwx420nbncf9xoxozlro27gex4o2mv34yrmw7a4d0moceyfxwq3zpws3ehb9s6c4c4zrra34epsinw3lvp46ll4lcb5yi73o5t5ocxkj3cxh8rek1l085ftivlg4e1pvdl1b3y5ieuchutvez74ft1i7ypuaon3sw22jdxef64r8ft0r275ih6gdri5bveh5a3wt7v1l70dm2444cfu1',
                mobile: 'p8krmrgum46kptwad70u9bnu7vnyl0w0r97q1jiuu99030fvmjjmb13qgrbgv',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: '455mpiukqjbv5wcdxpr1ed41n8l3ut04ub4e0vkj5z6l6uj34ye8i3j0q41sgkimrtoqjj88ini4szgi0d8xdf0cqi457lwen3g4sey4f8tpead38gnq1r8h',
                password: 'gg09a9v7cbngzb8zm0vk12zptzheyd26im7m8xfklmuntmbaotgz6synj4qmz5ebkfmjev6eagbkhpvhnzghh8j8as306e8d0rwjv971sav6shszm7nr11y4mtyxmieqg1e4z74a8mjx7nivhih1wosmljv1re9kp5odc0h92ibnngi6003an6mm4ik6bw50jkijm9l5rgcloxcgwbb9auenejtewi2s4bo87py3yt0dgn2vpmsjcrfekomdjtn',
                rememberToken: 'siwtg8odcfrooxy4nfieni2j3z2nvn6cqicppjvcffmj9aslncoff96t9vanletge4sibcz87f30a18g0xiszlxjo5vdm95jotdz6vnpsgcjyrn3te1f1g6p4sezvuhbevhdxqlwyrzp1a898bhtnufz5p85fswgfc4kskb4845dfiowurap0r13ma3z5ny83w08fbheke4v23fvwqxojexh8z1du8ofsh1nb5xhx6me58vy7k8pw9bn1143qvf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'day5wq6fnyavp9xdjf13tgz14z4hce4yr7k3odnxz0zpeozb37thzwscax2c0zsdnmoh2okx1zs23nc5dmt1eogq4qxwt6dzq3c59my63gss0pkflxnit8rhgo17x9s86dlyw57tnmb1jac40ypo8z9xx02gempq5gvlk18dnzmfqu0qmaavzlrkppt7sxpinvdmt12onfzw888qfbh7b3uyusztgx98s7ojga2a12hlgng0m534s616utzho0b',
                surname: 'p7y2wcot2ie0t2hy772pukh6owr6fg73z5vovm3t4iunkjyaos32m1uc9hri3uxoxpvh799zuv8g3x1uw77wn04a9ngfyjqlgvjotqy3jk4xch10x3ls7do6fkxi9dajqilg5ijt0xk3hcuh2yh965wp10138h67sq9ym8yc4pnog2touwu5oecx88a7rh9dmjsuj7d0b8sp0htt9vo9p7cvw4s1soyrxuifrkems0ga8oz78546ybvows7fhnv',
                avatar: 's70akdr17rkb02anx7v6lk34wswa0m8jpsigwowyk9k015ptovpwf9g4sffc4mtsj9r8dmf5qlul8h50bmutejel6gs2yy2pwwfo1k3ky718n4ftz61quse6u2hd7z794nzhkj0zjulrqail0rynezkfew41cja5mtlk3f13rv8pa8eq9y7ktrbnvl6b3b0zpfkeqnkuv5i2bypj4uy4i8dq25uf69jp7ktcje3gm6jooyjh8xtyffhrmblvbqw',
                mobile: 's9zpvuk8imj4q4nx2p7l02ckd5maoti4dfr584w9alwxtc9b90h2onraulwh',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'u87d3m9aa86g65z7bbz44f2hnhrkgs5tkh3nr6bovyl2ndrchqfqjc2blnlyn2atyu85rnbivkzmgyjo4cv41l5jkf3pq4f1w520fscc9wqa6r1hqshjofm6j',
                password: '3ha5tedltdqwl0vz7yn9rdbgltezs7nmicweb9iqgn9ol7vfg0shrpnaqmvvcnpt9kr9opxqxgl1tdb2u5rog9dwt9z5cg0k6rgwasmfil7ynrd6x0n2gyl89ield0ttbrzpaz1ntelo61qx9tbe4ieoavqqwkdym8b4ikljve5t1cwgpeqpz4s6q90dx88z3m29vjktpr5aak7cog40o8b3fuqqjni2klz507i29qilbu1dk0zfjnr0shfmw1b',
                rememberToken: '00lujibfsgo5tj4f9gu14xc170cddpq0m9g7i9o38qjwas2goaz30aoadpz5pfdx1d8zwqgj2njsw40duehcbfccgd92bk12c7twauu5vnf6angre7saxxtgur6bgjffhuv70uv7n0durjvzehduh5cdydxkfzsxpo2fmy2grw7nh3loybxnqf6pg5euijqe0m298egfnvvesik2zzui3kj5qcmwq58853qpb1s148bqkldvhiit0e7c1f5rjjy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'yyojlcbmz3cdje8d5pe0h7v6eo4tfhl4i1wv7e8hwo1d96gp9z246p0tidgb9attgzt128sfsbgcipe3rd853zn5yl23ikvi0l4hqdluts3nuihoe2inxybgrve9z5ovjpswoy77mwq2ymt42r6x9xavyvycriwqbtcqkygywhdrcc790m7opmqhikz4eetudf4qz85lhscwr6bkaoh2r2lxlmqcpzu58xwtpsjh3a9utqqshobmw3wa72w9j9a',
                surname: 'jiv0err80gcb3pyiu1s1awswlgx2xzanh5argerx8tnc9vfthzrlo88d3f5k5s3nilu0ylo0qbutaic2gr13sajcl72asb9su846h92x2ooe3y0a7r2t5ribygf3934o9w2z4ty1pnw51ckvlklxds7gwuj9vfh4tqde0n4g9vjv0g4w67b1xwv5k5615ywuasmmoom8kfhh7jm4cjioge5nlprxh094n2qhndgs02tjsw7p5lgjjaerj0kvvvt',
                avatar: 's8gsz2kvu3egwhgpt7z5vhd7f2r44645f6p57bai83wdgd1v3rss99zvbdv29rb1c6uq6pz2glxsahbf4smnxw6xtvay5oc0af20vrbmugfr5uza5fl2l4m0imgd3ys5hwiq7akcbfbegg86viyvezyvhb6w7tytj1mdq70n1wn4qzce585epn7lsm1911ky3sfatobzu8ii7kknvvlt9miqqr766186ydjmnetxgjl7c2hj2o307e7fjmm73lk',
                mobile: '9weqkx1edkooyl76g8zo1qgeh9g3pabx6x7t9i300hiup13gfe614mbgz34l',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'lswqba1p9gdqe670uysc7uoc6l6y5vpqtvi1emt0mkeb5awodz1c506406miao84485lpcz66aqholsbat8xalpbci11r1zx4p7inf284sxfzv1148tpd191',
                password: 'kxx4k6nuoqt2tjhsyasaqu51w396gxoqaz61ce72lt6oyysyuw1rxlesedj7hbhg0bctznphenfztkfsmuw6zza81b388322i9l58o7dm0pkakz4nowmgv75rq4qyvna1ggdeq1sz35vfpzgqy9souuf9os2rm9c9s1nl5l3utv8ubxue4j7kq1nzu8r2wch50nmscm1qswlovu907x7uddzq9vrr1fh94922a9ftm00tjuelt9ji1yi5mwpv7u0',
                rememberToken: 'q5og10ac1zwuhloj7peyq7yeg69ynot45txz49n8oc226uvud52jujptp2havj8t1k4eb470o712oz134ozi56jpxa4e8djzqmuf6i109mmmnnoqzdoxgw171lko18jg6xem82upxlsm1w8qgqmguaw2hvid2cnzu2l4u110j9z2cnl3hjzhhclfknbwiagpqz89odzdm5q19pywua16adkud33em7jpjmskug2qhh4ooag1411kvdfi77skbam',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'g2g2ksb1o9iwmi57d7j7bii97qb0ejqxxevmtaimz2h0sn32ygmt80vrxufapxuc189bliknot1o2mqk9y4jir2xr7phqiv8sri1e39ofigsy16lf3o2vkke4vuw9y2xj98e5j6nshz844wbtciaz7pxlapud8dpd5idacojwpu7jlckwz5je1nksq38ia6q4agboarz9kptvm8du80lcqghxe6b3ir79jyonu6956vuqkki76ehjruph6qyaxq',
                surname: 'ev97bzpmfi9fs4amd28fn6r64piswnckuraqqymk46h5vv61cz07xvqw8hiivh8yrpjwanplgghg6z4yvkp3nbvnrcz5h3jh4c8x9b2729nknkdggk5xfnixqxg8irf3k5lishhccd5jyf59e7g3bas3h293z4o9zzvzwi7rsmaipn4te1sf0jl3flfk2buq2ha59s9w03c36fiyvn3mo77unqotsqewxxs4ubiyb4g08n0b9dsjqkrqynxxf0t',
                avatar: 'unpzaon3ysoyq1a3vnlsjpp52jz2wnp9qjoiexzsgooj0mrpmtopt3b51cigrqjox18qqb0pldphn2mr1b4esg8h7l89f35i8kx623mksarnamtthd2kh7di1p9si24gczj5u9ugkl5prmxakxix0y9z3917h36cq1doyym79ycke7q881h0eyk84ksf7izr2eygp7zyos8m6oydjxvunci2l0xovc0b8imgxjd4k2qvx95xfav7ksg0y0patp6',
                mobile: '2a0vqqfb9qo5ojdwa148a46wy50zu2ee9jw6e6oywjt46xuzydkub385l1ft',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'oym2m0vgims250gor248isiwemmql3v7xgrfz8doblhr3kjbaszo2w90gr2qhkcoyuh8s5nkc6xxalgtkh5ixx5ibveakgyfss2xv5jum6twrl7qkug8whb4',
                password: 'pcu8swp1rhfrsdk31q278gxih6shsxudf7798v8717gdubrflf8k8h9ouamo0i2s232ga7bnlvhvvuqmm7pysf3efzach0qxwamxhnyxrdgdq1428itqtm2op6m4lvktdzalsfabqf41zvub623oi3cdwv64zepjdpn5m9pipl91dmdc9qqpa7yac69juadj8d6qxhgm4oomdu4maxrleg2i71dqozy2vcxn3q1reooes9x7pmbksjugmu47qtx',
                rememberToken: 'rwd51244umbb4ak0r3c5j6u6rbnar1f562w2qwbq8zgimxowi7uek7zrvolq06wm3f6m6or6ew4clne6nxkmzi46tovaimtmpheovlc5n23prt0ohz7xnktcufeyd6ksfsb8xarhd4f4ol57z3vhi83x1om2yqtscsf04tmznl4u7nwxwgnr1htl18y0aqq103u51e3e4bwc1wqbfg1o1u0crgmgb3l2s5macwu7bbadxsrc02hs1sa4du5e599w',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST iam/user`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: '6nmw474bxyreb0jzagozntgv0mnauhe8m7c5ldun965flahol0nd95acxeji9lbrahk9h9e4epwl45j4kmln8yhi4tw8azb4bycft9nikor9ahs0jffhq18v6hjcgu7r6ixsousei241csaaixx89sysfbgg51yo7yrnupr3r2d890zoje0cfjgtsfy2vujxk7joekeam6wq1wq5gors9i5k44dycfd3hn4r58ex3vp11yc5686h1v44my752vi',
                surname: 'bnw61n519a439oftdlmbry28xgc1m663o1ysyxbnnj0j4quf104477zd3cqhbpajjjl01cwpp560vx82hw4mwsfwyf1bi0d6nmhb8i8lsblkt18e0mv009lekd79gcmiie4zqcdrqm8bvp6b45m87d61teuyqqs2ebp2oreegx4ppyxw2860gy19fwlso1pv6eese1dy4tx6kl7od5639cazme2no25n69dav9bmen6uyloq1qw6gise96bt6nc',
                avatar: 'o03ty8clpa9mbinshw73wljjp0swzrg07f14ntlju4want237ev6lt7twxvjzy9wex5qqz1t9kwuzxh3bzd7zpun2xobbo7r2rcr6rbwcvsv3rang3vkyuic5011zkbnumbijmozirk9ur2t07i1s7ff7lubaixjksjrgc3rs8chegje2vayvcdz99xjtozun167s7vbatqbmwjg1pz3ysugjprtrp5y90oi5ecjel930vv1jjlexlf46rhavyb',
                mobile: 'bli339zf883ykico34e1uaqz131v6r6aq4e9gtyotw4dxh4syne5ag3l7btb',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'w66s000r8xlxu89idp5lwu0y7tkggu84046i0tanutnxc029rg0sw3dejx6xptyb5qgeo3okmtu890w07rwgdd540hjkyiz5xmw3aqfvuc3k46fd5hx5r5oj',
                password: '8k2dlnb2p2r4w8q2akvsh0or8rwazaj2zyhete5z5o4e0puq25pe0eiz89c27hub7uz5tsolgpmmkjeu1gydjxnvj7c34x3684e9q8r8lbojtu0zlszmiv3zrmphk632nis0pdg21vqo0k6q3p2552ytr9a6l6pizb9p4tudq2hftlgmivqsvxjgewqvuq76v9shkpd1kolvsykciwamkijsi5lug1p2t0hwsjx29cbo1xh3hlnv10pm6zqgppq',
                rememberToken: '0tza9idkw465y6skk703io7jvybtef4bbv0b0gd7xkffq7dad5ls1lws6l3mihvo74cevu8wy0e8qxmfy8wyo17pxxr13cjcohk0gseges8n0lt9betjmswc4mw5vp2fi80gsm90zmvyhgplb5z8mmy1ut9lazioqu7kurzxo30kcfdilvpvjq766jdo43cfhje4p0ph9c5q0yxgw6bebsr0bt480bkqtr1k45shm2fx9phojji15g6ads7cs8t',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '918fe5de-fe2e-41f9-8682-ca8dd0603835'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/user`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'e9634594-f977-4cad-8832-177ea91e8f06'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e9634594-f977-4cad-8832-177ea91e8f06'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/e2b80ba1-ac87-464f-80af-d62d074138f6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/e9634594-f977-4cad-8832-177ea91e8f06')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e9634594-f977-4cad-8832-177ea91e8f06'));
    });

    test(`/REST:GET iam/users`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: '555db42c-c2e6-44c8-80f6-798f37bda720',
                accountId: 'd6714645-77ce-4664-a7ac-c25783d39cb6',
                name: 'oqurnw1flx1jwtcav5h36zc7159955rh9hxid6owwuandmsloddisl38yorgag6qtoc7i923q4ns6952fzkm6ari0ppcsjbq1ov9ozic0gtsq6c91p2z4wzt2r1jg6fx3ophewxxzpqy2ghhl6ckctbsbm28fk80bu7ah1u7vymsu29dxgmb8gttqnkbx4azhmwuyvdyqabayu1mm78j5loj6sfgqp5yodajoow55fy3k30keyeknb0awl3nbwt',
                surname: '1y2m90ogjizbnp0y1ph9wwncf9ytp47rmmuunj8y6tpw99466u04e5ptklf8m4y4zx0a01pznkwn8os2th1kvaurob1ywclq66gre1x6h7afob6utcnry1oe02ewjhmvg3w685zy4m3sxeziq3k12fkw01pagcserh0t81zo9d3p21aht7yvwuco0taju90wy6eqw8x08vin6tk1znic8npuv65sz2mvbpods6d3zyjcz4oe1eu7cyf520vz98m',
                avatar: '991iapromxybvsgigjn88m95toqwfqrnf2ko1uo7i0p6pfu318kt3hsmql4zn0knj7ynsev8uxcgzd884eozoox5vfmdz0elh8v1rz8jokdbgs08rxeigvcjnzybldkt0gppxlcfb0bdlst0c73f19vecpcv9txxicbn70s3qu5oqs1uf0quggwr7z4v89k5awd8srocj9tneeiaap66pvs4fpbigr178bk4s5ons6ttxhjgv05bjm6vngjan3f',
                mobile: 'hciid1iipp5ycnxrs7gdp1qg5g9v3r9lxmnhld1kkllt6hzkqllznnwgrnog',
                langId: '528913d5-624f-4622-b5ec-e1ee3eb92239',
                username: 'nxbj9ns8dtv0d9grqn6mokvomkh5fu5owik3xutuw8d3k0zc1u16z0kbrk3634gd5qfsfki8vh18qjcsj1nlqmgmvwamzp00lrf24tlv8yamgjo97r9g51ou',
                password: 'p8lsvwi1hm9dv16j1n5z1n5ujkt7vngwtfkm91aulss8zj9ybxiuzv45zvsvg4f8bisrd49gftbjiwhi9fvpzwrwrc7jutggdf283he1chq0ak9wta4o4snm9w5kgil20k1jpn7xlv3g80n1ag9oa3s2xge6x42lffahbp296902pkh7xa4lt1gmda6poxdwt9za1r7zqmje49quu0wld6m0uk39nn9lruhk7wir4yyxmw510d1j38rfggy7ygc',
                rememberToken: 'p3c4eas9s9m2e3myld7bijqhleq83a8v9y9x3meihu42bti8me6ynyn1t4p3ej7dfioni69z5ojoan11y3migwx6jw4iwimqztq1woahxx33oxay76ic7mp92y9f0mf06kb4q428lpgxikee37z5zkz73dyom9w9v4l6mj0ddwwdzf01lx3rq55a2e7wovzjkjm83s0v0vitdb822nvgxhnckda9u5f26t1netjxyy1rngts4onedqc2wk0h63z',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                name: 'lepozrc0l0zh3vr31xqm5l68f1ib74q6drz1ov3r7a2u3urhga4c1pis4uqstvez5l7cm0z2pursla0rkip6oo609o6i64usnx29ia3vv17uz5wqptll173kooxnm6pjwx5plk8de8vus0duolj6wdbix2oczhnxqsmm7ib8vpfqo0tyvupg8xgb9p3wyyyzsaojclqnqmzwcvofye8z15eagyoitx9n7dvqcyigike8z36rwb1usx3qp9juwbt',
                surname: 'x36bkk2j7gednk6s3r5zmm7vrdeo0rxj9l1obnkj1310vgm8vv820j6adzcpnev73j4yoxqeege0080x1i15nbkyqcd420fib5bifxj63rkq98iy16r3gdk4luzeii58hg661sx90iv4zzh2dcv6mv2h9w0iwfh2i07jqr8sp3vbz8d04eg6j63yymdtrvj606rlfrqxzal21tmhkkqkhxi5xa6slnqn17tf8jtvs4timsgqgzzpg0cj48thlux',
                avatar: '5wzv9xwgdkfr74k5pfbwfghas7noxw4udwgvpujy2xtee0maan886ueweld0iwrru5gmlghpk24gdl4tyquzsn39h0sp0w3ppq2ciskg7tuq97zhig0e9v3t3w9metcuc507c9v5nwvjzf0bdrau1ppmjoofmiy8gtb1sls9m0d6yip3rplo4rf5yshsc12ksqbbc30xx8tztx70dflrumn1hgqtnqkkd3ohkj2wkyn76p24jmmmrjvrzmp2tv0',
                mobile: 'uz0j2fpwsvwfz0zp6sjysrficrki4c20l5dfoi8b1vourxm0g6laoduw44ey',
                langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                username: 'vxd5ca39kxh1f00i97wx8f2gbbutqh8ts0wcxvraour21j3oqso79409hmmvdag0q4vktbkucgk3e52e8bw564979tjfipuhtqs7kxlw643tjynmii7feasd',
                password: 'j5yaa1zxzcohk22pfmwznmw8vyc2ntqxzv0wo8muki2v7lsmqrss4ou0a8h32mudqc0mpz9qslp62oswv12zvcspyen7mzw4f90b4orvvquqw1dq1l631qgun3yar7h5c9z6qgapk68zax1ur2d2nugi132mjme8q34lopg8f6vyx8j2m2uganedqvy0tup80dm02bjjxda1g76qua14x9mbj5fz0jhiag3hs7qmpgj017qra3jbt4a7ekbhanu',
                rememberToken: '4vhjmuiqhe2rwb3xyb1jdwcvjlhy5g7x5mo93cs4cp5lgnmn84vltbuzy0e1fnx29um9rrk4vktlv685yszhr82l9wbj3zpib5t4nlpywyyt1h93s7ydddgx1b3lk98gfxr86mqgxr80wf69sq1gng5ya9zxorstw1hwziszdiv4pq0wis8on7q5rheg1a0pcwlvnqvvjptj8odq05nuyvhj7d6i4yrcalzexm15r6kyhymv7ldr3fbra1h6zon',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e9634594-f977-4cad-8832-177ea91e8f06'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/a8ab1dac-4b6e-44d3-9999-9a6f5db79f88')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/e9634594-f977-4cad-8832-177ea91e8f06')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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

    test(`/GraphQL iamCreateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd66a8cc8-bf2f-49b6-925f-497cd94e1822',
                        accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                        name: 'azweurs3b6xjiwmmkiy31cbojsddcfhrt3h7pzk40hmz3kb5a7hxgfc67gipwdz46ciio68ab8wp1y43bx5p73a5gjd6j6zn4hbwyppnde0q8c2a7hxlfcidbxu7qq6068zjnmhe9ew7jbz5uk7yamvjr9fxe3n7zxeytedfgal2d6e08mg4b6rqyv9esbd3n31a0ucyg6k6uqaifzaxe8kl7l6wnbbec3l9g7obiyadx8iu7jqjawqnb442vu1',
                        surname: 'wdaqytyvtssm0riiysuz5u96wbici6meziajljkcqucpzz8vo9zt4dp5lnq3737vx0djyr30brnrur46vf4oc5azb4awsk61igw55rtfy2zj1hi2ec2et0nred5z9lrs11a6lbqz9oinv5cf7ni6pm2acgnpbc6zxq755oc5wl1jxehicv4c3r9g0lvfky0tb3r4ay3naicn8dacnsw84f8asclm26x9uxvvf0hvskln8dpkuxmrbjqi33g49qe',
                        avatar: 'ooaeqlitsdrzeu3lid1gv2liia33bc7jg3ymuv1uduo15wc079k42wjb5rn1e4ju9gvx9ruzn26d8ton6nly2lse8o9fhitao5p4f7c17vjphpuyusrvoiaqeb89x8po22avx2hohmc2jafx5x8p14jj3q95eit9ayvw4k8zgcn6yxcd5v5kyxns2sqii90kx2ey5jdrs7byec8rsw7fk39z7awht6cwq32mncsw3ucmy6c1b1pxsdswr3w2yzk',
                        mobile: '334w2gi8lwh2i3jcih49ftwgtnyv4ztg6ejs5gmnqnx2kk711dd1exdaoz9m',
                        langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                        username: '83t158miruq4syqte6a1x1310dhv4wtt48u4b14k796idksnsu0a058o1kjwpg10788ly7gbemgmdaqghhxuk9wgfc4dtr27jiy81v4zccyqs8v75y3vw7nx',
                        password: '41hqd0z52gk1floii7430uq9w8bg3et61lq078j42gqi3i5q19pa8veasags511jm6nei52kgu2bjj0z1l3yeyeuewx5faw7lfe5nwi6k2i61khoyuycvny54k0d8k37dok2ftsbdv7g8l3sf3c4ycwb8ekkj2t8odzc170dor9gwmx7443olt2o8lddul8d30n5sx3nw8d4u9vf0sp8o5lix2ep7nlnokxw9ydcn97s53naxn9lv3dmjlpfxtl',
                        rememberToken: 'br1sjk4a8cm9zy6zubuv4b2kfbkkwcghcvfg07wfsh39kpp02wf8ioudgpql8w36b3l9vop2z06iw4k9nbj56jq9q3eqweyqvta5l6129oirjwveeslah6nhcjcdyvqfoyvf8816x5hbbase2ghjzpu5igubbj087u1if11t1honq0s1nmh85hz4izqph9zt3xqexjtzczvlga5z3g220zzemjpg4wx8w82azkm0by6ykzaqci4evxco9nzufe2',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'd66a8cc8-bf2f-49b6-925f-497cd94e1822');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: '1127a232-c138-4d5d-9344-b7b0b0de11f5'
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

    test(`/GraphQL iamFindUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: 'e9634594-f977-4cad-8832-177ea91e8f06'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('e9634594-f977-4cad-8832-177ea91e8f06');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '16d2e46a-d71a-4343-9b67-704bf20c209b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e9634594-f977-4cad-8832-177ea91e8f06'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('e9634594-f977-4cad-8832-177ea91e8f06');
            });
    });

    test(`/GraphQL iamGetUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0127c8ec-a57c-43c2-a358-bff11473deea',
                        accountId: '475516be-aca4-4363-8e9f-646e9797bc6d',
                        name: 'j5urv27h7tnki01rvebnro3ph4ejn8gfqfghau534criyffgqocg5rg0kforn4l5mb54kzgw7aqo7dlwudbwiwa5a0cx484aalnqsbx24s9pgmyfys8pstr634lfqrdgg2fcykznb9n7bpzzoa3thag7o7k80tzro460bdl6cx3g3cvp2ehjf2eb3jy2xhgmw4iow7qn1nxaf68hdfwzfezxyog64fje8bclz12wbnlpn0yl2q99kpyflbynfmx',
                        surname: 'f27odhvuwm8cghzk719ibb64o8vt32x0i2g8qbed5pt5dmq5saxycx0wrdqadwznf5u7g1u5xq61suj80szhtexl0hskgefvzwl0u3od6p7925ry653u9rmrw30wiwmbewri6yqkqrlqxfx9zdekjui31md4i01hfjqp8hheiv7c56p370axb1eb8l1vorz6iaww7rqnj0yn0lyqlytwfikh5ewe58w64d15uek1tztzmlbn8a48i1bmapa5j01',
                        avatar: 'p1gd6ttr08qzioym9zhmalg3mcf6d0wef0iatrylc1r73h4ausl4oarag8dm414ymi2wfak17qhco22pwn75k6pp9ea3fv1i6j0supewox5pkodjeadxlj93ay3uqqwct63330obp8zv41i0dnjw6qw0t7clr61fhhcrgedquaeane8alo326465gg47c5vqiw8omkvi0bd4m01lsx5tqs7ro1bflzvgitoad03wyxia7kbx3n60lap5agg844h',
                        mobile: 'xx6azq9zw0xvlujaqybptc18ns5gkbf2xlk1gscbi3bo9lcv49d91hla2a53',
                        langId: '650d37b2-de84-4774-9758-9e7b0d25deb8',
                        username: 'lcta1k9gyi86v01255fzohnquufujxhsvbe0oeui63jhyhf75b6ey5y9p3ntcxy2be1bcyjrt3juqh4w6vtp6eeonq1m20gnkm5rwr44gvbk4ygjrjzzu3m0',
                        password: '2j6rm3su0ln66ss6b7nv99leyd8988m1cdgf6o56ec6xaagk8c67l4ep9ftry33593ojvavhjjcowvsc89xvvroys39jvwkc7dbb5ynqwuao243bjz7hqjnot19r34wdcsa6b6rbdzcaycbwkq01ahs2fjf6xy943gwr0kc2vej4te06iq8ndfr7f4z24zbba09miiiekaccf2gt7yt6t036r6jhwn51ts014n5ttnqjg315bvinuyd2zsj47nc',
                        rememberToken: '3pgm5f890nfrqlw76xe9dtuig2hiv473rkx9h98e7hxmk5njzzvmsda1meg9i6ey4mmo17h4p62f8rq1lj7lz3x99dujtal9o0c3zmrdddy3ahbely35vb10bnsn4rshxvvwopdhba3rpogt0ifcwixsarfj5dkugf00jbpc2d364o2qfc9ftdp5nd31zfp85rjpe5zt22j93v0ifrzclp0cfdho742xexborv8edl08q1wuyer3vjkqy7jfb7b',
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

    test(`/GraphQL iamUpdateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e9634594-f977-4cad-8832-177ea91e8f06',
                        accountId: '38c7882f-2977-4161-8fa4-5c210895680a',
                        name: '21bur5twxwq232e8j6euqnqd0grp07uvbrrl2gs4wa9ir02phn0v71q49s64o2c3f2wr4a5lw2iwappmofgigqhdub9wb0d0ohetgslzooppge3qj241mhsypst6y31ve2pl4l24awa3xoer5icf7glhy8pd6si0p29nb6lqinxt8lh56da3odvbqqvd8hk46h6a2oqwxa5faf5gzt22gna18xr61ugqqtkoy6qksdipf4p65l3slg0pkrzllfg',
                        surname: '6sderouc193gbfeh1x5y4orn6a3g2b5tfvehl301jkohpf3to69m8welqh23bozu6ghpu7kam3edp2liw68rzxlqe2870sbavkpcoao4tkwydzc9ztdsqoccy4p7mtgx0b1reu3ehdfsypfdi9dum03enryobvoforb0exy50uvw7tcxv0zk5jpvil7914lsnejymv730ogpswjab6twh4gob4fun6m42vbj1fl0e3opuditbn8jqnri6gjxbkh',
                        avatar: '6brklc7ejdvyj8jduyemqqlr75c9kqs39kqwq1aspaubzfta4paiogznsqkzjpq498w83nxotsqenv1aztxy0tq2w1otil0okvb0dpngix3747nuzmpdfvgm2kp1scdsw0ul91wcwleuk9xf6uc55rmailao6hfdlhn38vy3gh4tvw6ljhdzzq8qb1dx87955m5x28yy20emi5n3v7zqj02lih327ypd5r8ar9sqahykmqum9beeob1r38g94sm',
                        mobile: 'fym0oijpq4gskiijd55bmn3v7r2cwnrv9pdlwlb7n5a74tke3t3htj362kck',
                        langId: 'fa71b786-672d-4b3a-a576-2d0b2b00c810',
                        username: 'tocwg9jzycgncsuntvffqczag48djv8pphrq2sg94gpjl2jsvpnhawl9q7lk1fk5apoeojceuocxczd3iuv2c29yklquu6o1xbztx71t6fws81gpp60ajdyx',
                        password: 'dj7up5q9roxyg1qzpdwznpik43y1gpf70eff10wt1bepk7llk5cgxr68tfql3q6qaor725f8rjdl3akd9npxhvykxp796anxof7cezf3fpjma2ns7ii5pmy1tpe5n5ygho9g7xiz0pyvchpt3pp94xct0tvr8mapmobjfgm1gnf77b250qht7neqku5zr0eqwpdx3a5at1mfajwfnxw0nv27z93jfzyxtz0v3b1rifv4l46f6jtdpo53wyqpqhu',
                        rememberToken: 'f8szfw2pjkc6z2pexgd9depscs835rlsybb7343329j7ipm0rkzl430ps8qjuqerjhy3pfktjtajyo5pllzcvur9cvvn671l2fjljsqs25qyqdkr8x7rdwl0o5zgep5zx1mw5j5xg5j39hz2ey03sppix4sk997g8r01h2ce1xox5w5flzduydqfrep2mrs3h2f31r19828bj97ilkyxj3m82h4rm3zbk5pasj3f5deq0cexxiedkh8mz1mipz0',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('e9634594-f977-4cad-8832-177ea91e8f06');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5bb8f745-54c3-482c-97fd-ad42e5937ef1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e9634594-f977-4cad-8832-177ea91e8f06'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('e9634594-f977-4cad-8832-177ea91e8f06');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});