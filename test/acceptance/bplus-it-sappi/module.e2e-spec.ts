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
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'mprzd18h566woip5iqtcp364t6gy35idi1tab86vkg6fmia8ct',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'eb65ozcs4mkr1t02kgut',
                channelHash: 'xzhr9jixiflvqfeugurrxqxj3tiphxy5zc5g2zdg',
                channelParty: 'utwpwco7s81fnn1yr40g98r8l2mczijz5oe782d0exgc4ddasshedmjbgupqhdq2irmbplts7lexw90l15bsg1zr1rj78x5w1f19w5dspq70lna4c66bn1xgkl8q9uner3k9vwlmmau0mldhsmgejxm6bil0f6qc',
                channelComponent: 'hxcqu9fbtj1nq0kwvc9og7g4ggsn2kejax1uyuw1nctj4ilrka5oh8krxgh5jk8jpfyatj9dk1n8cdxx2yujqtufmgxucsewj2xny1zn7unwv6y35msf09usjrekfek9hp3c49ved2muxnhv6odzhwdvwy52dmxr',
                channelName: '0jzhro7xeqa4aqqfziszih72mw2d2krjyhjqand562mzkq30qmg2ix4bfyj7x1jo29xrhxyql42th97i2l53xtg2gkdv1csbclwe3mvoxxz0suo0yyjfgwoucwtwv6n78k3fxifnuq9kjhkq0b5j0xbamkkw2o6n',
                flowHash: 'mxu62o3ak0pc5w2jlrmjgwz16golcy96851kgq26',
                flowParty: 'u35s4uk6fjqclk6o65907ff0ntxamc92rofrhpbm1jxl8ww2w16prvkn8nxo05rjb355u7ggqb7r0nu6lwelvhpf30qizzbnuv2due2vyc23w1636nhp6ptnkohgdrcmpt1w1t88jpuzgg4z8zkhrav4y42fxcs6',
                flowComponent: '1txxsb8dk8so65gcknfi09ehi0l8vfp4mp9rrwwqsujzq97uv3jkathuiufegpmhn9shkkyyzq5qnddv6ykclcj6wo3jhizpi3r065kdh1p481tzpx0llu0p7j476js6qkzasp26h7rvcf70g7u0sumyznh73fcd',
                flowInterfaceName: '55fwyecrzrei6zheyzul9a7v6lq68v995xafoxrfuqdkv719npxfcc6vxhutcw0h5fbgbnwjerl3s49p1l0n4zoutukdu22t69pdmpp7wt4y8q7eniisnjodkm6h1htgxtl1vzhy0io8j5alqyfxxy6hia3utnrf',
                flowInterfaceNamespace: 'qi55ufqk4qtd60teowmwyb5a3fc6yenrbysg6uzk6fm292bb7zx4fb0yh9d1b4fx9t6k9pvsxcp6izy1d018mc63oz4k56a6glkejmbups4jju2vai10vtc0sc0yy6mg4awrjmwm727uctvqpe3yb6jtzb9cqhrs',
                version: 'cqgji1g6blyw7c511qox',
                parameterGroup: 'fwjlbc1dg14ogxtwdj5rnydm6ol6xibfb8ikee2iwahdwo75lav714rgt7c7eym35o60j4zmud3nci2343fbw7khzha1vme3umyaavmisuppn82ghu3cw91j77n6fnlhvs5v73f3rk6ued58gzhb8p2x2dv773m10ho2rfg0oikmlhgiou80rnkfh7jbg5j2tgvk2ldsoha5qtryny9fy164snbf3je7xbcam8yz4ofgk1lqbyy97xbug1ypvub',
                name: 'o7a5b10yhgth0k2r5fh1iqho4v0e16wgkx67dh5rlzrbs0xu8ce1uzlu1khcuup4rr16soezocpmbhrgo4i0bz3tu2pu4is9wd6kejlzjtre8ubfi61zhornkxpgpd1kgpyuunjqfedloipzi2j9w6hvx1c86lo6kyhtwi6ethfz52mbe0pubpn2tjucpfytq3ivxtil64ph3got9uq5kqau32r0g4aruoan8ggfxwqwu72rq6kz0938rde2q2psirk55o4nrubwg7ojxibpgx1gpu9ohr5y40k1xys51qmus64eerx1pxcoooitwiff',
                parameterName: '4ivza47uy54r11roazlplsbucdbsa6g8kk6rd69oo1whwozv5reegu5cwwgp8v8rzicjkghktyo0t48keo7rmwhsqszf7o91q73b3p773g96o9xc4ecr1d92pg2fp9s5sb56w5xychkbjegz5k5siuac5ydihcfh4bafdtfal1hkawdhjj9yl33nfcpo5utv0cuwnno6ajzaq8aawscd2sb2szf4d2bt4h7bcyxbtxfo358xx9tw1ix0yom4nzeyldz16yjpr7qt24tr6zusehg8v4drxbbujjsdnuaold3cob3imvyh0yokybir6iqx',
                parameterValue: '8mvmf8vzb7d6vpqboa7sge29e562shzea83lyr98c92ao0l644zke8gh12x8x8l2mawnslkqsp5ks961p7qtuj712pt0b7oks4vki2wnhnwehw4igmma6i6avhzoga9ym8lbwkjn24pmhk3wh5n3zs4tgv1jxv6c7eak1hhe8avsg120x1xriofegf3g63isvaqi1uix0cytc4q8h6nf92lo505tr209astmkb8q6kcubfo48v6onx3nxcj72lqi03cwzbjx2xp6qfw73aqirtwqtbn5dktlnexux1y5b56w4ggzlolbi3ncdqckoc2gg2se9ykaxs0jhr4mime80oh825ra1rz2nw9muvf5ezj12aiiqexgp64kyj7tqczm6nrhtdebgbn84pxcwfybmm97ii12iv95cixszjxk481e3vfu7wyid7gl5fw0edwki7rybtre4lrboue0eqz8z7d5yj9tuly0wedx8gegn1t4zqczro69fe2000ipm187zyoxym4lpgbgouoi2cm1x7rbgv1ck51kicq1qwb2ey5l0935nvmqqitsz4f54sh2612fm2u2zh7g3gjhmfcxz05zfwcn6m0qxhyhoqt8zv507r5cde80b152gaykkyoal7ff3aa2v96tl4rurn3eo550rzxst8o9607h65axv2hwk4wtl2agpqps1uden7i08viuz35wemia6ufr26hxu0em87h50zzqz7b4hnkucv93rfgcn1w1m7lf8ru4ywyw7lplgd2l2oofzjhz84fv3lkgy7v5ufy12y76aou386dfcd44j036cgm5frk57i4bmnc3kclmryu8wsskw15hmmkr0ibwpdmw5wanjnk9nc491owx1bu608st0fclr1guqo2ldg0lf2mmcb4ww876zengwaq6r10ivpy94qzio1nyd6pn42forvox3chyzwdozn3g63z6habku545qn3afypo8iwgd16d2dttj5m7zznwxvegbmvlce16q2oal3ooq6cxv6g7irj48gfizj05wgzsqygosgi2na77oev4im9khup93mupsltb40cpwfhw3vem3lev86i3sv2egght3uh8skgdxkp3xekeft7z8np5xoy71xod515d4qd93gjqavpzrayf1og6w6szta2d5w7sk2hm6u0a068m8vze29hxqozotys6afctqeuhh8im6wdw31vxcc7t8b7pzo3ud79fxcmr16f0bg8d82bt6ormoddygvdp3jp5s51ddws73xsiia12a5ye3hzlbbr2u2yopv6rk9i7z85sl5dqieq0z5lxn7xwa3440xezu76t4vz6awnz35qd3jtg9huwsymh1mwmfz59ugssc0e6yg6ept2yc5iisd5mzyvngvm2guij5e3cy8hmpvs6ltqg5urh2l1ebfmvgxm4j8eox00lf47bw0k29thbjaq5m9vn17lkqvca00jlf11nppw7hebulas75z2lkvvasqf8mehk1nwu6drj9bexjqelw4fk20lcdhdla908a2zd2skp2g0yi2ma7v0t38pj5nyvvvg7avm1wn3hq244az3ww2hc9sjrau5paj7hccvg89xxvq2pty54img23jyqdu2ahxwv7zf03va3jpoi6l3djtydh1ed78d0y10s7bdinggxx7nl9he1cz68bpo2k92r6f781lgn78joueoqeevijrjvgj0m1u35lul350o7es50mel17rb799ocomzd5ke76sry2lim9yxrobvojnqtzg0dg7pkzlwac0p6h3atusx4jv7blwl3wh7j9ukxrcamez1b2vf6o48c0mtyynoo4cw1rwvb1hiu3uv508kjnstgvk8vaefjpbjjg0ib5x514mtxdialmgp7hjzryotsbt13fccsnxbzhaaaesqn531z1shg97c30vkjiuntz2ku5gjqdh7hg4c014inrlz5c3igosa42m85lg8ap5y05vwx8bbs8z747iyobztromf8s5zn552htkd03pkjky092p7j',
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
                
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'xgxyfb90jdjkf9smicxqshglz8fj6d89k7jl489niehroi0170',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '78x7ntlasu7br8pike7w',
                channelHash: '15qegxklttq8nbi1cm6mu92lhowgp2irf6ydc3nr',
                channelParty: 'rrso1z5cd8ub60yea06z7k2c43c4gvr0wbl5s3v2rebg7lvt0xyyuknmtbvpwnu6bt8bc9xj227l4udpq84j217t7dbteabewe23i64kcqe1dfa4366tiu61kocx1kx0r5znsoq5flw3awyyu2grqhe1ersie7wa',
                channelComponent: 'z1xz28tdx9jupqy5pzd6cl989hruqgqq253hcue8zxj14peomta8ick7xsp4f6cg4p0hs1xd1daovfwx8fqya2rdj5juryao0wzkrb39eny4vukptcttm9scucogdtiaqzrqjgb1orwvy10sihott7hsal6jyqsp',
                channelName: 'qdyzcqzp1013aecq1n248svsz5hhbie3e1hfd3kd3pqw9tbqzvvkbpsnvk1uolc55qhskb2t3cvryhj6cyjf4irrhbavfvxbt4hsp3qzie5qpsk0id3ibutbsd5suoapmdj6izufu9vc48b3x0vi1tcflcg5yv1d',
                flowHash: 'ok7jhxoysg8mjh927vr0yrziagsjt1r24q6rn1mt',
                flowParty: '5jlbjz48u64lcet34h4pkby9k7zsav1xph9iqw757depg7dhq3vbl6b14efxxa3riomsvyu8nx2w6oc8fa550nrp0xnzd4wlww5gm3r61q5a7fm4n30h7k4dd5qtlxvu8w2kbbf9h853k24nlko2ed3n9723x7g1',
                flowComponent: 'yhzautshs83rjue3lbbs8blbr5e78y5xaw7njqpludvb017rqz6q2az438y9plchrfktnoy4pj7yt4rio4efhvarnwttng131l2pxnvcu8j1fc1uq6w5688hovz4fsjzyo9mbxdh944mr9ls0yu05ap5rsvspwv8',
                flowInterfaceName: 'xyejtod6u2ok55wuo5fja5my4txs6grn3lrwilob4rpe30f1do23a2lpd9elub9kv40y7n4sf9czfehkjkll0ikirewdtph04241ee27w24xtk8k9a7h92gv70mcgt14eay0oblhuwr8xk4r0wfrt63hwxgzrzlk',
                flowInterfaceNamespace: 'r0cl33by1wf0vtefc4up1a67o8b0vnstyaexnimwwuw5ce6gwz6d5k4y3mr7615dykjlj3jwgbbqin7j8ef50a7sftoy4tcvf8f2ni6fqxoswu2obf7866ugxnb35q3nlikosmyrfw1535g6fefzgh5t91ngdvr7',
                version: 'rngf76sxroydcpznk4t0',
                parameterGroup: 'jnkcfh87dc1evfxibxhmyl1lsgdb6k0nxbwi0cdmnxafvonyjj0g3jxkzejhww56thnaeuhxd53elnwcmk429n39rfwjvqh0y1l5f5lvrwk9e2z6rzxg1alengwiuk721f9xz6q1tql8ppi9rjrzg2no4kg7kbg3pzjd57ztuiqbrxjlvb66gosfpb0wso2fl2sue78iwcjy54ctwk2i5ckcyj28ymnp63zncs9o3kvvlydudmmg0edquysx1iu',
                name: 'mkvyf0igv2tzw2pxd6ip71b09e4nyns2vnv1288pxbggo8jrp80oc0s9odd6o7vsqerhelea4b419ebcrlhle9092x2r9zytmu8xs8rebz7c28yu949dpw2e59o9vzb3pj6ibmgudv0ztrbsgyw5meo7i9nx403uuzoyptx9u8csx8vdlsug17d8g3kxuz0ky35ilcws1m7sc7x2pv7lpi1xqxd7xb0cbe3ilut3770y27gch63dhoi81q9413q34046mlh1amsvz87lenhuv0bjj8s3h9o9c2p3jjd0yplndknbfrqieaaycui3psin',
                parameterName: 'ey638mwh6qzyjfxiw67wehyxhrt275lrojylkskws546rmhmjloxtssju8b9rl2tqxj8rpnpx5mlxwoeg4ewvngat81d2ci6uxcv249pdwv5m9p6jghscaqegunsa94xgwl0xzjb244wrrwxg89u4vbq103kmj4bgyt3qvbo8ixbwsoz1dj7fp1s5k66cskl11l2ks89t38dtacidf4w3jeepcct7ku5sbmrf7k6kalo6yfv8crajb3r7i3ed2yll2ou120kbhb2a9akq9fw7vo8cv0n7k0dcmj31r8d7l0kk2w51ixlzeq1ys0ddyh0',
                parameterValue: '8p0axocumqxolkoe28kld49qw6wwc759hp4et7yco7jr1zidzg0e6qnp3l0v12blosixgguuiflebw18wtxlxjs5narj2honqfzfhjit5lckqb96dv7im6wnf8prd2b4tebtcd7w13512qf2nm7ktrew42gjxnm1rm2sos9k3zsjtajy8qvkhg886zca7bcpvlmms6myfcx536uj0q5wnupvgye7gwmlkbnwgmjrwa76wiiay9kbj0hh40az2r4thp80nu946korl1saqq8p5cvrklyl4cxm4xnm2ubbkvsbrvvdd43336j931kq5j1emppljvzyz4vc30iq6gx853m20aqz3fn1hnt4w4mdp8iyjcewfh7nhjyl92349d0p2oromcctlaqc97qu07yktc8jn3gm3uuozjhvd1cuaxoi4xbf8cu4lp40bou2p60qsi3fpfdeh8lrkdmwru5nxc6wyl1chmjy3i1ytj39qr3jqf05d1ocigjfqc7s96jadb51izrnsllbkgp56zr57c8e7g5gkri7rt6xr89xfn8ne1va0khtx3pc2lwxk2o0yo427u2lbe20kyk4tyfnmj08fyvduw65z796rvhjlds2eoszkan7zvwpvo5ahzcjws3ep4j9y2onongjleju2kb8ebsgu0hx7fa1mupvalvshx1svmupjoc1h0881a34e13osgxveirrjplpitd1ogt35t5349omcwai1w6cx6luu4kf1y86n8fqhb8m94eh4kgi56smws9qdcqqiytv336tayhzwaa680v1ek4tjwtlhpwysn6wtko76sey4ir5hcdc4w4mcx86eo3iv7rqf8esgj9f2d8ehmiu7py0udndwufnsasm49wnioey0pgy8mc1a9u65u5vmzk3lbwkqxv7vu3iozndd7062i6nx1uqc188egyndq57sn695lpkoew6ctbb81g26cj5skjs0l5asosnlmq4e9uq9xs0togt7cx5i5wnducay54688r5nomzenmxjq1o55fp5i5lqmkkxa8qia461yqibbgbzhsborfuunwnbb4kutqyg9kw8v7xvfd5q7u55noppszumdd20t14pwtfyjkcf7jbjkk18nz7q0aleamh6xunpj7vpyejqa2xgtjx78psmh4pkmgvd101cl3630h7kfwue59q35x6ezcbiiivzb0sdswbvtympmw35vyrvlv64e9fpp67eayt476ururdp3o5najey6e87w8nxbhoxv4v56p1okr6eztvs6cqfmgar043o3wyke01q1gpgce8b0qqmoiyp6hfesrih5r4unss1y3nldhxub3q5esy0zdo4npw807bsl9j3ft11vclnc7jb2npxnh213ahoiln30cr89mg6usy6okerkqx72ibck6nat6ri5swcdb2yb08lwuw4q1d2jxqnl2a9c08afwegspyf7nmbggffva46pmfln09wshq7zhitf2hhnd0zim0fgqu5lgt0d9kire90p7hg8r2s0ioxgu9rh9ldi60olkswgp3ioxk9blhx4js2o59xxeidmhpi0bokfmtr7bctvwhpfeb0cgat55awaanttw29fu608kyx73fxqgu3p7t48bopswq9x3hipsrsbhdp9rdvgwrdh6nh3snfwelpsrg6v1cnsjd0bnu4p5nouh2ctknx8rpwutk37w5u408vkvpbwok2vc8jk10sihq6ehz9zmzhuwmtalmqts2ij6658y82ddbb93gxy9mr90hwmexvqa3azjic3ycpb9ei5g5mfq95y6qv1b46por7b9bfkhyaka3vvfudr2nyelew7stobr4r1nfm0zgsbiklngfw8g5ahyjvhoflub84vhk3clfiha4fdgmxwrhfzblrv9tn085q183g96e3cbv9l8nn1wjvo9c34z5p5z1ufr9ut8lrxe249wf833k8vumxelafspa0l15eh0vcs3q6h32mbh4y6w4mn8pshzl33h4ck39aabhj215qbzbhntaexfz',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: null,
                tenantCode: 'cwxfk9vlsan7j83mqb8m4200oo8ae8v1vppzqk4q8rkwxthvcr',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'mrs8qpvifjw343jsbsoh',
                channelHash: 'mha93t9y2xoc1okflt0nqiw1x6719axljy1c7jp2',
                channelParty: 'vn0our47kvs6sazbia489v61kvlilt3to5f7r9mpqi7bx4qo4r9gpen2ohy1e01amlw6jaub49ji99yp2pheydhrm42e53z8o9ej2izj9a6deg256ocamv23610nzsqtlyt472n31d63b31wzkkmqx5415ivtxy1',
                channelComponent: 'p4vp4k7e8tblf0nmi2qzd9ir9rtjk208182gctpeqq9siq4ylp0h7qzcb4t17h8pf7lbkg0i8lqrf8wpggb13h8imfi17igbrq43zku4ngb5c9m46g7a4bawpvmkhpc9z62psqhu4h1up6ngynglsy8owx27yhno',
                channelName: '8mf08kgk9tv3va8vof5b0ym3br69h8ern5385jwwk0w7tsoty1plhayuspj13keug1nkhzp4wn138kp0216jxhd2my7o5f9275h0m1cy3thpzsrs61jya2355sye2x5crzzr7xtdqz57jfkb1s37mab47r3eiwgn',
                flowHash: 'rjhyp9yy4ik0g1cof9g283f8azbkzk9l6n43ysf9',
                flowParty: 'uqv3mxyxy3c806efts995ql1quqmbmbp18178nxf13x2zspghwwi7gevko6kyjvww5f0gyvc3mhcwj4tqitlb77i1w11xkpstcexj28jxt1ieuvi5ij6650c672evfkpxd0c8a7loo9toxxbosg1gbqcf1ftpx1k',
                flowComponent: 'p9b4s01yr9egy627fpvkd5w0aa2l4oa34q89x3o9qyo1nrt1ebqh6189u45rb0wi3xykiyczmryyc4q0mh5a2j79jx0fgjvlk63ehfhhk1vpjt0q7lebqg0y1zd1p7qtml1x9hjlp8kerwa0x3ugz6jcmzp5c1fa',
                flowInterfaceName: 'mrgxhw7877d1h5j8dc0v4ajthib9lgv5h5bfy67ql9mj3ssx1usi2gf0993yw3pkrfwcdwugvjx1svsscpqa4u8irbjp1r9r7u4d0y0mhryzzk1yuzw1vphqsy9mb0cz01y0irrw9fzhv7o28vcqgxtvk5j8kzwt',
                flowInterfaceNamespace: 'oge5l5zsysh8yc1z8kzmktyp76ubr34hzeik97pwvoke2792ndh8qf6b3ja7ordcx3j9u191oxdodnpkomdv8zvdy4bty9ju15qehzmddvbi2yplp1lzmv228asf3rv2kbqcn528uc8rt6wkxw7sjckva7ahlfxh',
                version: 'yfqil9olod102fpi6g24',
                parameterGroup: 'v27tpzvqqvcb0hmn9got2idy050qo0rct0gtknlk12mjkytje6bn6yz6z39wjcdus8b78f7f97dphcx2vdg2u6q9p4wt8x0sgfh2a4iuvhchzjel47xwwwx7x9vdzu3cznsm82whx4vlkem2uvum6qi0cbl01ie68an6hsgtaqdp1b0ic0e6g73z1f6p3a22cex67kl2v95h55qadkso377gwfyksbctpa4y9rd6v5hpt0bksx3cqsy83pzljcg',
                name: 'u6ou9scuoulszx8j87nhoj7sid4ovj678740743k4o9jjy5u3td9jlsaflhz83uq5ng9xc8mm560nmc6c73yqn5d625ebkvu5mrcyupk0bwchn3tki9uc6btusd0hflg3167m7akx1r3x7yy8y5kzwwvdgy3ebqwjpi5xvgjfmw105cm5sp9tmgt746mepasfm3yohmvq2kcy98696dsiojr7se3gheb0sk8rsl0n72xchuqbrctphngfo8ggxsw2wuipas8y7gc73kwgcq12b9yjc3sjb0rx3s87yin27c1mylkbnrfpvn135vhj6ew',
                parameterName: 'jr68g086hkgcvtp8yn1mthtp9zdcffi2gj1nlpsxcbniyblh3ydl8qdqde3nqzd6anzgqcbfrknne25zdmvudzqm152mi0nieb2qylc5ub25x4cyhxzp459v66swhgez5vwsexhptvydg5t238dizqjqiquxgvtbg8f5puzwjmwm1u4n12db4hd40iai9fe6rsnwyaz61bar16l120uhvsfi8jephypf8xevhp6k7j2jbv65rzmxagc8t6jwrtu8of12wbqyau0u3tx5jil1g2dc3ic63rf5ujpa7fyuzipxh43zbkpz3vutjze3g1zd',
                parameterValue: 'yodkuz1xptejqrb55v1g0wz666k8xm3ks1fc2c2qq1odjrycpi1tlx9ylzflek539snvyazxlj9h4ay9cz6q7h5ncj4u8xg093qdpmugqanjozp6z58fxv3r1mjth7oov1ghiyynf1jmh8tqk23k5b8fbee2hy5f5mglq06jx8pysg2a8kx8i2zlpr6wirajl6mmjvahbksbxqitgyw7naj1fahibzkpo1g05rzl1670gbskjinto2u4h8mw1u8o5uswz2ishs0hy1jvw621oe02y3i5x4h9htn65k2qhnvnbv8ir19x7eizdojdkekf9sm9gqci177ztmqa3kl2e04xpapd9ekw33ixz0f73ftmstfqfxk2toclpaotecmg393ve0td5qdi3t9jkp8xyn2bmp7oz270a831v54hctzlvmb8pttevvr02idp4yauxjtt1aa4mewr4nwfwrqg9xx06o8hr4ftfwtqdgcudxj58dztwl8aw1sppe5vxjjn77omsktsws2yt9u9x4r4fuw00taus5i9bag49xjb55ufefli19bx0ef4cq7d0jakk5cf2m0xttjplekpv70sd3m796sbyqs1ihgf4l2x436ikyzd4hjubmmtvah5ildk9v7cptvmcmoxp32e9m6n6nepm38fl05heuu5kzaic4fnoi60fwaaih3i0us3fap2rb5m16xvdklll7u2xclpwh7mc4z30tyqyw6tzz0ia23l56tsj1l2scsjhkczc2m2y72tiq5cgd11cfgxbndzhotox7g2illc0msado3u1bnrm5fx2p8v8da9648jpu7m11ero3t5k261se9qsgapdufvsqom1s4rrd64ims7uw1h2u7o3hjtrydv3w8z5l2taoer3mfdovha3itdv14c9ar4tfl7lvwrgc2v2gplx3dcvndtvepqp21m128cwuse8jcnj8e2p4aomr2mrx992pzxicslrjspiist4a6p1qd8syvfkepb7jazz1emaub3hipvmtkh4heumh9j8zitn7vlcxztp3wtw4ttrjxuobsbtkqh0t74ycv70u8sh451hq3sbcrqfquciuuhelplfbrehp3vjj89wjw8n220yxypf6khacy6s6piy85yc7jptduxicl3ls5uqp1tlu4x77xclrjum1ww24b6o96pzmo0yz65ibzwj95zr4nuytuxghrgsxph7o7cwqhsf8oetv7r1qy8byuh2byq1gpi93efn65ts1sqpymxvge8byg7j81cxp8uyvd6evw2to7f8coil5wgyb8pjo0gxsfuvya1vqg5g3gupwuddjsb34zm53k10znpphrl9wq1eulbqrwxetk6pyobdecwkliakyxapj2ab75ky0oqdnnmkuujuc8rtwwbg1b8h2s25fh75v8kd4oborsxe6dmoqmzpamfdfuaq2fzey2nz290bx7ombjj4o920duc5n314yaotj6jmqeo2pozxnycrveif54ay2hsa3rn3vivl3hud9c4yv5xjr18if2bpx7eamfjphayhmjdft8lghj4kyshp5sspcdlc7z400jvvpflfd6z5gc2k3foi5m7qk5wtmwnak6k8qj2zuatgspin4p2krda6mkmted5pocm72jc6znw01anivy0qkfpthscyjuuv5ga8ezo2nzphwjyl144th1kgo4wn2wctpfak03iy3661ofdhhumj7d2al7nz8d1tgzr7yh0o6x3zwcayvje9nfx51r5i2pg2ni444x9gx7dus6bwaz7w5afekujeib668orellf6j1yo4qrvl7yvie8lu9azuxexl0lj0s75wew5mkpuo005w3e61l0ort1lqmhpfy27rkedkamz3gnei8d4fqws6js3ylxseqrvhx3q5hp933hl5u2d5vhwxcp50jiiswh0xypu27uaz8ylo68xomfk1y0zyph6ux3la6vw2bozpy4lv9atgj1rx6044k0syf3vdmu73j7ek3hxr59tbgnsk0kg3038zkfhn9k',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                
                tenantCode: 'zvlaz9dx816024408dsyjf2zyjgpibuhp6wha5x1mno64cxvdm',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '5wi05aw4mldv5cq7pdcy',
                channelHash: '2xyfo5hbq3h3e7vjlzqyqf1kqebxnuxt9ygctyd1',
                channelParty: 'gbify7oe25p0phllxvxefz448vq7puoktzx0jefgktzrby7ln3tw08uplrpr7ned26maeqhjfml72uh7p4l41kg6vwedflpjkie65wddulgxdwsiazc988jmyxrb332apj7nlxiezuoobmbqzv32jem51sn5r64u',
                channelComponent: '8iqzdjvrx1cxhwpzhp4jwwdbq6sq1u2fn7l4xldpfehxdn5ze04vatp927y7vl4xva4t7ye1n3zwbp051e8ceno7flex4b10z9zz34wnyyeq66y8ytr41rv2yj5n88fns3tw92k6trot7s65k575a1e3yptjqxw8',
                channelName: 'zzxdamny7rmpatj0b5b1nng2e72atlmnwr0wppyfz160mjpdvlv3pqjgecbjr9nwwgmqq16uxxggkzj2596ip1nwxa9tjg8iy0qy8p3mzttzhsz7x17z060bh0tli78hvl8aq5miza60gtuwq8b1slgfvvbp9q2j',
                flowHash: 'tt52092v9z7hs2c80jjbdfk6lbhl94i5b2mnyzkx',
                flowParty: 'dd7vxnj86qre2hdczskmzuryk6curwnmjk5srqflke4jwshj29g4mm21r9ohajja2xtece5gqb2acea77kyuzcjmrgyqc530mntouqq198s258hpjab6g5zotbi0mzybey5bvb5170d85h1th6pa8fk5ltle9c3j',
                flowComponent: 'q0mt442mgofvic27lnaemyr0esv2n0hp79c0a1px3psf0av072faflkrzhssoifoxx0y5q0ds7rrxyixest5l8iv3sbweh2xn6jrmxy3sg7wp0s7pw0u7s0j5omjayj554rgohbfxh47cia5e3h4mjljtdzt777u',
                flowInterfaceName: '16282je22672twmm5924i5dowh6pdcvztnlhzh1820txkffi06atz1hqmfurl81qc2n8eumupqys05wtd2ta15mkeoxmi1e8ueyetlepa9zjhnm2hmp3xjx70ugy9rrslrod1d3d554xc1cz5dtzdwmwv9cuo46v',
                flowInterfaceNamespace: '2hd9r2bkt4h9fwqxn4bg5owyi2aofnsdbx1lflvpnvnf9wi4zve2rc3afjwn55yqwlm9d609ncct14zbmg37bsup6qljug99kv7pl7vcuhf0yd7dlpmt2sxr6y86aje0nqxuayt2uml5e1ez7ui9hdfw3pr6mhg2',
                version: '20631bqhqd7svxiecgpt',
                parameterGroup: 'rma97h3g13odkz43ok4tz3z63l2c4v3ksfleyyz5t6dc8x0wkycvrjrv5yrvmqd5d5jjc0zfdbdbglr7ldby8h1ra58z6vnmfl65bqat3sd93nhsfn5heg3ehxcwsfxvios52084sjoxv7ns7dzpp3s0f3szc2p44q3n0rgk33noiosyd00cwwrevyl85hsj5t2ddp94de0zs8j1vi60lp9qef9dwgdla7t7jrqwa87p1xbxhpzqg5ytbbvmcod',
                name: '2lhekfa782yjw6n9q9eml0ea329iga59psm6322cpncl67rhz9d4d4iuh98ejgivkjwm1p9rihv4ecv24zi8l76y84igl90z4n03vy9nv6rlmbbynkfysxppnfbxv3dci6cavac0yam20t58gx9wgughn6avj4mwpogx8rlwo288kh8rb3z69bsil1jfo9wq4lrdjnlgyrgfjlfks4mlpj3qkc0phphvmpeuami306c2ymb4ye5f1a3nfyfx2mf547sjdr9qpfgerxpcxtk8k1yhxsx7b92g2xi88o33mgv87ri2spr7w08wycqctdeb',
                parameterName: 'qn4p9mvndj516nce2q25ejb22tmu30xb7xqhsr52k96dfmfq8hee7rh4grbqbcsr5zdjb5it7luhy6yz5sj3uz63fz3edkhu9gk8pq2xk8k4niwbuh6e5xbrjxctz3hwf875n4hyvg4n5reekzfb7xjwr5tbiljibpsdz4xtbzuh8x7k5htrl8w95ql6e9gwr748unqcd8xdu2jtxhh6d99iblnkamvkab4wi56v6kwvr78dgaarfils3k0mfdsrbx2u0iiokshwtx5791kzwigzhdkkj50tmzknti1my8jhby7blrdv0w4850vzks16',
                parameterValue: 'e2g2o7yved19h04hjd6a4p4nv5mbylshknh6hs1oof0qlzyjzidyc7a49zbg01gmthc0sl7k5pjqinvowwg8ne43ytiki4p04qqyat1vfrt9dp2l41q5bfie9ry8k0zkye3cg1uouju1p2u18yyimqac1zf5ace7mgzuufbx0sq1y1nbfsgizworkqltkax1fd3vqq9a85stg03vc8sy4lu2j64dvgje1bpfjs94ljus7z3j7dn9gjs6d8shldjlryjgm16d3v98m1n9ohztimjrstul9700izf6x78drh2ksi72bgsolmvnwd4euxtz8c2ohggxmvy0khkhrzphw33lk0ammhxajdteiq9otk1n4q098wwr150y3x00h2p32e1yzmyvz0ts0uy8t8fav18aqrz830erqiefvascqh2z34po33vlw1r5bjzb4z5ynvqitxo7mgg3kynxecd4q3sfbddxe0nl31fcq7rboak4c89yyrtvv1zmfo4bpce720aowbxklgymghxp7cpj3x2zbtejt3fqqbzdl2v9sv7lffyjb10zp40wo5dpbnewbnsxu0nli51dpjannsn99qyh7ft9ijl4uoeozci1qk51vuycz8s2o7qpotvg6nx5j06ko72ky1ivaro6wfx5m54237fuf247k2gwqc2p3elot8pckj9pcfvtm4un9w3d1oao83xgosny9nnbuw8593ccqo4l8szhe9a9rxjlgwx8xso6ytwryf4nq9ln4ukfzzwofqv0mdrdf8es8hkqfjyi37nliv2bn0fq7lo2pimf3zkth6ku263j480q5jc5z0dg5gij1dlz0hps9it1fzwbq63ro4jgbmi28rfmqfisd89vbkenuin7jxixvfwhb12xox4574to6izev0wwt51858878f6k8le4ol6zi3id45o846u8snpeq5v21jfyq48f5mr4fns4eclvxuwfjg3ramqyvc0qagvdboehjqbdvpu50attzheo50c39nr1ghrj2srep7o8ucvkx9meci415vozmy5b77uofk2s9x5znhbwfuv3g2j9tbtb4faojblfutjk6cceraonvjl57pr74ghagwjpmaseznttsi95jswqx2khnyjh6a95qxvigc05y9kvogu3lv4sfjh0uhu70fy3b5plaja1r8e3ck1valbn57en1p4ba27x7t83d6b9eebxwty7lhw4pqvk81gp8cxlmzxux3mcb3a2ifp6hnkd17yzm3gbxtyloqv6j3mp47br69vktn0q041mpoqd2qdm4ebdlxi29lyxpjcttqj8jg11rpvuhxr2bvznbs1kwjbo8ixd16c9x1ctua3mpem253ygmxzdu5gse9kc17lj1yven302tygmgkl25cas4yf8uvg9c8y9h0qi5v8h3fej38dqcne3rj3si3cheilgh6ihjybla16zd5uczz0049riigvfcrxj4qcejrt2btm4e9cvm3raz3ui8y46k1ugnhnhxcl3xl8m6h8udoxiy60hmhqpxgrm7omvsgwx8kuis0yq2kgbqraxpvp9wnc9vufp6ufzlu5z4tdzhekrkawz6m6mosje3ceqzjthxrfd90fgz5n95bvlhhss3s8l9zpyc2lemgcmac7894ciqbv9xksd05j6kuqljtkuerl12aaz8p4i2l57qezd5l09zq9ca5kripdrfhflqhzjjgj9qog3omccmw05xdzy3hbuyhlx4lkbj7nltk993o1umb88h7u54c7sxxyeatemkd9bb6ypm69uenbaa2tdmh407hp4cj9176vnn3zbgeu9d4s5qabldgchzs80zz265ersvy6yyyggsylxpps4g64x1k5utyzlj0twd89gfyui87luawqm9qvck97wkhx13dskqj3duh0v3lm5n4790tftzq29zw4w0iu99yyqfdga1k4e57iosycyi4vtz0elbg4jvdtqmtp3fdnduqade1jlggrg5tv8e14aul3ovuc7m7wxhjh0hqs31png',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: null,
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'umxb4e3ufsuc10mni6qu',
                channelHash: 'b5hype2jsqa8qcpfo9ts4keckd135wzoe6670h5o',
                channelParty: 'zhvn5o4rx2thbu424srildarqvaodism0xhis0q7f4poadthi3mb6wm4pdhcwmdumz94yf3xc9r16qw2khx7dt1gm9br3n93uedgljfd50jmxjgyd662lt2osq9i8euc5uylrk77yo1pcje22m92uc4mqr8pvscs',
                channelComponent: 'jducecevyflpz5letei36ydc3yg07wlmx5oy8k53kubodqw6lxw6o1rr1zrskbxzh9t6wm37bs7ww3xg6rntlj3c7bqr3sju09o9hew2uto6enyrh3b0opj97pqcnue0t2j7b75k5wsn135qjdhxo3n8e2uaupge',
                channelName: '6zyokjfiy1ya0xdosyg2djgg32eufnatdzuec5go5zjmgtz5zr3odui9qjexarwyul99td2x9n6oaw2za6nkull5v09g2576lan6vhdil476lxq5wrgg6dgsm0b8y8kwwrgx56n6zpt033gojxwlnr85896z95dt',
                flowHash: 'ar8h216atu4hlpu52oj4sqkrxjay0koyyf58uqwc',
                flowParty: 'n1zt2419pfc8fallro6228khiv61rmv5ooauokyhu4chq8kxx7kv46ngwuey3y7sealsiibe5r56ebciwyi4jxlsb085kh01dhv4tyft77bwhkt5p6dtffjqrfr89ojpajuqt147jau5b2mjxq0vc3ll1096zf1r',
                flowComponent: 'fl3zk4izrsh4huyqcgvsgycg04g35g7s63gw8bllym8ad25v6fwbd968bh8zlqno6hgzuwqbtkf83b18bunspig0y5asuik3b5zn079ozewgp9ogio4ax00kob5kepldgkaldat0zv8osxl9xikt0uow61ssenkn',
                flowInterfaceName: '8f0uafp5ur254rfk7eiih868e83xxz08c7dcny9qatw55yny6ratrsbytm74bfw34q1q1mn9k6lek23tul8jyqfrocb19dv88xzvtu7egnkl29tz0vnx8c98l3l0orydd7h3baekacbryh61h63v9gvyc4e2pvx9',
                flowInterfaceNamespace: 'vuq0026gmu70h7ywmtwmu5gk61tes9qtmzmbn79pxeofdnv0odj2wmq1wvgfaax9wr86kkcb2t4kvhgazjrwi6lg0lhayq65gmdrexayiai2xy6efbt1chbyr2kbm8yzhi6dgh99traqu5i3c8i9sh17yjauelxr',
                version: 'f9696e2hyw0omtgnytpb',
                parameterGroup: 'it2ygxw1x6eqedr0dj5s4qemv50r8177mz0xomdz84zbg855gwq9mcka098kcmtlwqs8iflifznk2dmgy4jk6ypvgrv4t6ufmdz8s2l7dswexhmp3wfoss8mngh2ywmdzzaa0kfk3qlpctiwuptvehzz7xfdzvimurgpp7km6impcqa6pkl2oai7gm8czhdwe3fghnznl0ypignsq367l4713bz00vt2tegnoz2ytqwvt3dw6cksf0ljpxolvc9',
                name: 'rvlcki8tlcej2e5q15kshuv2c6ulv3rw9h3l2fml7en27x56otsfcjjodvnvb22frfns2w09vjbmfn5txrlnxd2cdtimt8p3gmox685rkty555bgsi131rmh7xb5tcvfckqolnkwkha0eh6bzk36d9qnzcf0xw4z5bhiwgdv5qjj5c6c2mcg3zqy498s9i2sgdzn46knr4ygvi5aurm5i4thxy1hn4jb5k5e5j7fefcdoze8hfb7u3jts2idq2h58cjg7qa2tmsuxxtg5e4vmqilwnc2mjcheb21qtyvm5rx8a1v4atyg8n8a49lb93k',
                parameterName: 'ol785mdkk9l7xadeha3tsw4d1q9svr5k1tgw23nlw0wtwbqys0yih7lenk9i512mvkq40vabqk188rbgdx5helo4aq7e9f8d6iv1dja50ja52dh1z8ax6ughjfrwvdsdtfc1frsxf8izqagzbbjjalhwgb4akqaqtgqd1zwa7qgrmar00059n7plt0z77kkow18xyf8wnnw5ahgt0fcd9f02sznxzvt2lbgbuo9tnxrx8kmzw7dn1bxygxpmpctda3brknm0go36hmnw11cs1ooreqo5kny4ej9ns2holnivgz5px3b2tpxpyri1ntk6',
                parameterValue: 'sby06h1wj1yikpztafhk0v9n0zbuaepgyptq6qdepo93ztnrd33fgtlatgpepiw25g33fesg1wb1m27bhciswrbfm1mkmdku6qe04qtyih2m0i5trju82hajdwd7vhyohmgafwi5xwdwex1fydps704g7sbjmqbrqhoovprjx8srsinrxbmiaauxntvbsmydtehxbe1su7992q2zlzn5jtt8jzsgwx3839d5jkbwrtwdig29eysviw84b22ma9wfw5y1jzv71tzv8o02b7uinx4f2v8gnvp2bo70clo9wjpuikzw3v73m86hl1pc2wb6wxgoo38zihp07qe9djpk4oseaymfonnap4nbb80sfl91om9uytb14pmar3wycyq32sq4aaj0ytbhnxbtxjigxk78j0mkcz5hff04c7ythc0l40owfs14jlpza7ikq16kz9a27yij2ok7vscb72qj2aixap8o61ear3cxq02cenog5w68tmt9qy12s6l6v73afbomhn1p0b5a0d54mc4o0no7flggckps4sacg3yt3rhhcrp3lcs1g5suuaod4vvih4mgex29kd4m48v9k63dbzmjeraidxa91exsoflixbbhfb5q0k77yov8sfll5oar5ry7dj2deo3pmfvobwuteu4ozzqz6ep37vbq3wt43et0nwbjza6wus3p0qgo6cwfb79nqx0dk43nepeth5gyj43mfi13y9yfpkqsmfizmxztcy2or18x2vqkeqevpdjn3mikne8eixifnn54f4fdtt1edpag8cx63dawe9kzb9g1fnn75kpjpkb6vvpid0ubaf5rn6wr9kdwpeg7eppzjhp2rsw0chsr7m0s3vrytkgirhjue597y0zzo9juysqtk2xa1wmaos7e27trqzzmoovkwzfs0s81pa110w3bsf8mlqx46u318jskfpr6vlhnncmw3t0v4ii3ih8vmd65sj10wgb270v298ztjl8vh57y3hmacz52rkpc14g6z152ysdbj7ybocbn9wju9zrfxnqxoldr8fxz3mfzy36ptbn13k4rtfr931pcceykqyqpqrkjatxqg4p6e59eg3fufglezwk96imk0fbrjxlmlkc4zqqvy5v2rdl2k8q5ytexbk71ltmqofda6jjo5ciua6cwvd17xv33j8s90w9jrkfst454kafqyxtbrhe81t5q9hf6qp7wmgu3hvzgh22ffwiezvmiy054y1i5voncn0npk61zeslt7ukx7gbtbqu37pu05f0u223y5yu8bivndl7mwx65aficcsbwdgxmkv0ca5pbqw3jnycdm9hfu9xtu1de9696o20nlpd6nj32535i2xpmm8us0l9hdf361cmp6amsg8p2199jl4wixxt0wfkl0jbiytbzxarqhep2z9ce5a0a345xvo57t238b3kzvdtcqluqvxx2k514rv6i91n8tf3j9r0cuxmcqhvzdq8wizemubhuzvgfainhth5s0tsh1m9aub7e632ngmlhuc1q7q9dtcpkiav68h4bbj0oz9piftzlqlrhnqceks5lyv4yjlpf9ucv4lbimly6472gk8gaq7ytajcb4qvzlmhtwiapjxfvf8pucjbnk4jvk06dm5symlevqln1sdpsak04rq2htr4qg4e4t7877zsczt9hnhxrmhygx2bwroiemkx7ag94pjxdp9j98oar10xxbnlnyirycd6f5ye1ntbb5nrh65t2rk830glnq26vzs38xsvv86kmti13dxi0b5ysegwo5d4q7nldefg3j2dirkved85guhchgk9xcu4oyk1f2c7lj3f6qpa1v2imizhk9vadhkwkxu9u4ixghxr0qkc49svz35he6cqqb5iy14q4r8jdgaztd70kme7cloqven1ty6pgl27bmwo0rlj74xegqb5jg1f5f7exm3fodd5w4ufubaawww3whwpb6vcpu4rsb6u2myqzbpm1sg3jf39g000nonce89ehu9a4dg5mz7mcibt63id8eu8s',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'f2dhdzz61csvpb7gwji3',
                channelHash: 'zcyeql7wfhq08cdmf1vcyqf87wuihj4b980iagr6',
                channelParty: '36lk2rstedy3c0i17uyhvg07eh0yp4e9lj0ubryr0emsgb6ku5uyf6yhjoosw87lqiqavtg4n3ocwa15rz7god7dp5r4e6h86gw8vc9t2timteo7g21tneeo1tf7hq5m45cu6g7hdtw3ar8hr6tl7rvrq2cunyi4',
                channelComponent: '29nfk4eqq5zp7es897x4mq2k5aqe0c5bmcsqg9you3ml027oae7dw0adupklvjkkp2z2fd6p193hljxttznsvwsmqry7bq746mmfi5hrn9kx8hxr7g5amhw6dw71ulhdp8owuyriovcv0evpkom5vtqh1opg1kta',
                channelName: 'guznn1y0q9t6zvy0yx08zehoq0badq25ph5qzyhfd3trbkql83sf6reibb75vv16b8qg6xmrtrmyif4232wym6loqmpghv2dwooqj9mw5l1vn0nrbdeg51m11qqkdznjh13ay9t1xw1d12xieqqwfm7xlwgx03wy',
                flowHash: 'gbqnp45n717ieo0h17or2qwmfdxfukwzd1yhrbim',
                flowParty: 'mtjqsn04efqqh7wgag1i5xn3fwhf1i7ks8edksoq2gjydute3ukyliis80358u0kkp016om4orpeme44z73iu7wcwfjqy5m8lknexa0w8xqciclrhjkjw1y34qx5ertb4gq9go950w5stlj73exreg68wd92jjil',
                flowComponent: 'hzkqc1f8212kcbcpz9gkfe3kyqyptjnyi53ljqwzhnzut4p6doywepg9ultj4qynzerli4yq3m0lnsf910xk70i3y8q1bkkopu5mt51zoucc538ajsw7uiajbp8pwf9ofdmu2m6tsoq99tqouxd3lwe141e4hmd6',
                flowInterfaceName: 'l29pj9mee4elxsktoxk8aq7mjc8v8shvk8vzww09021qmvlifh2o594jfydwp0ia2keh6poballc66wi8i1l411nee8e1zl1lszfjp5es7el0dtipt76259qu1gthz3su3isoearwx703r9s90f5y3b2wuetu0oh',
                flowInterfaceNamespace: '3vfxtnqlwtynxgbfa7yy19suc2ydhymagwxjv0v28f2nvuf7u4vud1lhxd1a1g4sfyx4wdde1y6wod5ajozzuynvaztmrf9lvjlpck34sdzr2uzoxzglc6wkejdxdf69ssq1qrgj612sfmnukbp5dgib9suoiipe',
                version: '0holemff3b0xqnfeevfw',
                parameterGroup: 'ldycn1pqkeijriwre7keazdku6lx2uds4lr0c7ee9hqaffvgydt796nw5konb5b1dqlxtcbdpjx8rycoxi5eyka1ci8ngvkp2jzuvceixb6i9boutc9tidk9hsm57xp194shearz4tdrzogl68lqcohe89xhi6uxjb5yyle1u1h2gfrmcl4z7be3nq3qcuau54zopxj99bileast52z5xw0vqxskurgpuj00rheqmaq0ft3p6er491s7dih7og9',
                name: 'b8p6lamweklc3eufli0dtes7x50u9oke3o6b4arwey9ylmwcoh1la01y5zir88ajzusy5taqyw7fe73r1cu6wo7vgrzkmo3cdx156803i8u2048ie54ht4mp1p6ggwp3hq2qdekh4u08kbaj27bp6ti1i6jkq3u4p57qosjnsazmnd05y5w1b5amy75q7nz91dz77ybo3u72yp1gevaqjiroyne25r8sef8j47vksvatcwyqo957u9bm465li93j1ysiplmyhgh7z17sseensmf3o4imd28prs54xrsqicyxbtba2yk5cknnzirlmh9n',
                parameterName: 'r5sd3agz2wemwdfdyzzk1rf8t1s5j4xbabz37q4129u3x3ii51ce6fy56l9lnkt6bjt7qgrvs3t6grddc7h94al2scts58ladktmrfoiuwxznggulnigqxwk04fbr03vyor59h46adoftc3ldzv9x0qq86uokdhwd2oyo6erm0j3uby0je5f7md3srhckz9opxgkdyudkiq8035fqcnm8f86v1z380f4idqne9bepe3dhmaat0p3w7093pdnnq9r897wb1xqqz84laebrz2zjokvc4mry38dk6785j8udzv0vpkm5nnofbmt90zar5ss',
                parameterValue: 'ua2to90pe2tr48kf100e2hhn3678eoaskc8jtknh7awn79x59l97daww1mtkz19byov0lnh3ziigelvim5kn93o67wjnfntk25uidbo2ynbnv7dphap4hvhfw5a47e4iwop2zfwzckce5yazwbp6f55b8fxxzcwlrto5hmn6waiqghdp0abad8s1h4fnb8iomtupbvahlzkrodamvu11yprj97iabzxx706duzgdcr190xxihcym5glylqswgi4ohlamcj6vj0brpnumgls9acmixn5ieuhb1nfkim2m3foqa8lzi8oqi0ab1ksnv5263hjmmvhwezun4gjyqj09a75c0ubnoj1ss9yaby11spcfudbqtgzthe8izk1ssp6vl66op93n73rskbn5oclm523ddb3hxvb9j1iua08u8kfqqpe49i5x6c2flmpm3u12htg1dzxozez0ozc6dqbgadb71qj9au7eokmh9vv5enqs6e9ijv7n3dyszj4u2r959s4asmw8hl4z2r1zvxw9vhzwlghp1faam420h88cpe48wx3ok9m0txbkmby5yb4rs74ckji5o4zz2c66iascwrgx4uahvqkleklxmn3e40yyy7rukyypzomhe5fmlwrfctmg7fes6uyhm2ydd94s8a06x7476ygt9njrkj9dtq2lbgujavkq0bcqh3w9yuastgfx2j8cejef71cktmoljdgtwnsfoyg66dnjwq59mkypdfgg4ln8jmzuj6y1qz7gfh1tvm74lad91fxre1zamrtzl1kolyh0d7sfdjrvfzu8aswxrwes7u32i759324kot2c266hazko4k4y0mcyfsf8iqd3fzzjs8wc10d9kxp4xkblg3z8dq67go2pqasoi05jj8x0m0y6ujumy1pghhqpp6r8iippyrquvutye4mnymcqx9wfmwuco74z3ya1czgfto884x2vbe46vl273t2c15rt2x7pdsl0388quqahtcr1httxjmzmj6cy0db8nm27o4clm7kop08hhqb7tpystzsg7zhs9bksxjq44se7llx2f5r1sd2qg0hp8ubaq4phtxw7f1j2eilmjujzdvbsjuln9azx6g5at5x4cuozechp9b57gdu6o93p6k51biq6syb21apkthodvp2vah259hoypwahj8xxrv0kpcyevwjjf615sbbhc8x4jnakwtqhoaqqn93yxpv8seug32oidi1zu1tlfbbjfp58il23wch1oa9sp0egok1mdqldxo8yx2wj4lb4e7jxz7269ewb5zii79qil5xab7baxm0qef8h967iibgjuyytnh9jlie0pidi92w4k2sbj5jnt0xh0ysf7um9vse6s8d4rlq8jrhrv5fuwxoiei8lqr8ot36n2c92y5q4hzk123pfb5eesa9wrd8jhhe2ec5qa1n4xobnqd1hoktys8se3kkcowb2yyyb8m9gwl7fba0gzb1g08bjab2kw4dube4shxd82zlfqa4qac42ugo1qben30e44lo54xftyrwnkid8bsnha8gca4ro5solf1qa9nir2d9aziqnkk2zp4c97tedc21hcfumhvy4gf3txs6xsjxm8mm9br520h0ot93h8xcbm36vroli8kz0wwjp2ham8sdpwan29zne9rusdgomllcbjgrmtkdou7d2w9b20f7xi0fyglusxthsimfd4hag9p91lze0rc8t67pvqg6v21dems0ha17elg0ogwglt436atp7m3pqwng0m3l6ctaqdrerrj8z52ks4p6o42ic89dnrt4nh5nkfgrsx9efc9wq4q52jrfg7byvhhcre7upj4tp2vsvgnn4po7uw707j6rdxfow07vgfqigwyb062rf40qw3uyhkixxwahbvtgk8j0zs962iwopxa2m2awgbvmh6opgmth2vr8m73ev7m8rcpme8tkckrumiq6fk6is9iembwl3wmx7w92q5cf9zlu4nzqma3ci95coafjtx4d6gjgndsjs2b24nfwyfifn',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'ys3ige0073eq8cvytkouy4w0c52in6ksu1ovcexdljwmzm93iy',
                systemId: null,
                systemName: '6utvxlq6941rppn50pqn',
                channelHash: 'w7121359pa6biptwegg06dge5tjxncq2eouovjtx',
                channelParty: 'ke03jzydnn5836rlg5x399twewznpd6a7g1abqf3gl9cqmjylb3hal46jtlnccx62yzk8csg1c17iuiuotpr2zjsjqa813hnjv0p193us8c3vyvgaxlrq57jalw7r1q44jr7pvm13d3c0w2n7r97c93ux70bu59l',
                channelComponent: 'szi18mvv3a7to6g3skhu3ev8o3fq5vt8oror3rvo9w830k3bdi4lv2b3b114fdmm2sg6h1x4lnv1613w4nyha3ettyrv4sjaldg40bcuctt55fd674srbd724wh5glcjxakto54adceiw6h13i1o6k01qoov10dw',
                channelName: '2fpfsrvfo6e4tdzsttkjeiesxnl78dm8j808pt35l0esjc3yxhdud0tvh6twpp1lmm6b1c8lwv0779joya1o8zwt7g7n05toe39wwl4sn7inb6z8p3zqlk6nzg2cjfm3lmc8kua2tvy8v5lexgsnyrcy67asa8w5',
                flowHash: '9lqlu6dvxzpxd4u566mmnutjb4jvepobobibwq78',
                flowParty: 'e6ntezva7ll37vpua6bnoknjnv318go83yri4zkblnj1vfo0df4bg1lcjt5ac2jg8buovocoh4qjxnebd89xswgklqcxsauhz39ghpf58lx41m495tmmork074bfah4o6gonxy6667l3wahib6rzmmbnq0tokbk6',
                flowComponent: '0wwpelp5045fmhg5l3xfuhoi22azjp35s92dx99fdhgrfmyx7su9dpi50p7e0pizqy6xdqdnc7u1c8smdlpbas9g0zr8add66x2h1tcd19t1n48vwf8h7n9hsrirmh9gfhryqnzihsmqemkxj7qy2klg4ooei367',
                flowInterfaceName: 'lysmsgdsscfsfpclwfqk52jjh2qi2umw21z7wjb51bdxx8mnzcc9ylkofij7q1iudnb0el3uw28p8pjw5tw6wnldiklju2i7k4daq53csk25aa8r2hni6h89utjvy9ihzxraembulzzjcb0j11wvdmv05qs0lhjy',
                flowInterfaceNamespace: '21arcj21h4ee7df8t1cwu2u2zxl1eu8057vshofqws15qtqc2vwaz3nwmx84oxi46r2kgv489brr5xg3y48cd8guc1ggw08boll9cri44cs55gzvz4cq2trsq3lw4uop2p13aihskjaaibzri9h7660git38438j',
                version: '2fe6gdgui8vndrspegqo',
                parameterGroup: '18dws8fxub8754x4htma2lkmqcd2sqn2ged3w4a8sf2iqotivottxoqn5b5edlp03lrqwhjugwrqnho71gxuwlqc8iy56vlnbl9uzmxcp6opa101u52e5zoh959dx93qrtegpwb2dk3s073y80jey3shhjuy1row3rp0hr9how3nl1r82copsuv6e2aw1pw284uul3wzl7cjxjl4chngrugofps1se154zxxwq8cvqfbw35oazsgqma5l29ph66',
                name: 'qwdwbqmj104qhezttjuwi77qe5gtjk0gcgssr3n02iq8w3rweddmvncngqvropzacgm9d9hvj5dyn1rxa328mlzb0izqbuctcfk30cnffz0j2nglfllf79wqz3utry2lmkhjqihhmwg4n331sfvjmmgf3ug37i9ko106j8d2ux7uc6arimtjjq08ou5pf4a9rygy6qpro37rmphr1rtg87ebug4hime7ovj5oj0h9dueh2ud12md02mpcgcmml0l0sl1h0dpucufq12mi41iab18pnk33ihmrbsna6m3mnsln51vtotcb7e51d7mmivw',
                parameterName: 'yhxkomw1qup9dlri280sgtkb710jp03pyyiy7ftqvu6qgiiazdkm4zdc2duts92vx0mk1s8npcat9okwv93zakr4aaqo5l4zr6cm91a912l11xljw5gfnfjeltwu8yyitm6q2npmsurmq1akz4bxkg9nbs4wiu6kvecn7uvw32q9ppdeij2o5c1pvi3f7oxpp6062cj6bbrqfnqshpggxe4yfiuso8p4snqqurrx6xhyoe5d2g6aoj9ibjcaxi1qjx66897cc5z7givwi4blm8mfhxkrxi5m3k4fbyqcwm0lnp06zdglvsewuw3dm1dc',
                parameterValue: 'xspf3u0daz9bivutkyd7c3usyvsgu37o1pq3kjs3738sbwjpo8mce2udz71f0n16tcx33d8p2kpblrxit03w9ba4jxofgn9hg103mbzklc7enyk5a17rhje9dy9mo68vtszle4ihap7rfa6fkvnkdymoeiab2hm6nofcduxr6bjf6joima4ipld5s7kgzr49wllrrz670aqecsbc2v0wrn200x1f9o8wy0ugh21z3skwjz977ft293z6nn3yi9kyy63icpbllae5n9ur102hl7g0ktpa0drhoaynqs30h36cdbxu3szt385pmenplnd5h7btuq4j0a2nmcfp17z8dticxno667g9m0et2q3vbck7afzvi1s29tisdz6u8aacof243iwlq7aciygxhr9ogpu1jmxkfu1lt76s8koxm3mffoi7b2omnaqoqp1okr3l04y7d4rysk4mnzvr0lnpun319mxs6nq6y3w4r1ul5gjgrplrsmtb31e3bjat9s4cf62wbhqihlgrg6z9t2xkor2e1ois4dmvsjt0ltpg3ykcyfu0wdxu0uivwyekwce80fdf71sw203a5opq3h7k5f4ggvm2h2icvabdwebeo7fk0qy0e6y4t1vmh31el27r1qbn6p8vk5dmmfs4efj72qxre1swpco77o7qwwlgl2sdbc0yy42iiwacj2bm2noheelv4irm4gmdhzrhby9jsc8p7g42yasfe207333c7agi6i8j5op5yskhyrvin3ujxn54e15dvh792u8rtasd4r1sp8wt4b5e90itvnwwi5q81l83f6peijajjghaw3rmy3gjredxwn23cl0krkp0uel17heto90qwsm7wsjznyr0ao15bh0ywgw7ntqtwvjd3vknqkn29pk17m2ekvxrumbk157w2m21u6gs3avihfdksxhxfi1n48lceccimsfrxf3584lzbmcnuxroyey5xoxo8l9j0lflq425aozrrs0nnwjhc8assamsixfancg49hbnmmlih9jdbqoiw9ajtcjj4tj0j5qb0c140mnf8ey2m9vllxikdpj3pjwvx2thpwb35t5fmgc7k97uas458ksr64ncslx5fq2ujqg7xk3v4ut0mhtdy5a4u5yapkuige11rdy04r6x5f2p5a5ei216f0sdg1wp7hc33gldw1kf0hwx9tpwius606320ijouodl2fdgso54iflbdn67zk1gnbckt84s9lmut7fftakj51o1nhc3b7vua8j61ps7getzb7u1qgm8dqkdzc963e0eysphoo8e1n2e9wr7sg8nud194ezddp8632s3vd0ofp23r7rcl9k7h327lzapk0e4zok3zade1lspl836iyxbkr3mw9n4blh89vf0yddfp4bddtpwrd1qlsy6x7r5i41mrdpxyazgio9qmlqe4jvjf7awa6mrou01w9whqca1p2szlb51jq2j0b7tdjcoli3eu9lqa2y4cfgh8r19b7t7lyhyypnwe3sxv1k71gbn5qhk7wa5t597hfwrq7unku2950heni5uczlqvkuam147bdmusiuretat3p17epmgluhxlr3jglnszsirbnheqwljx6csozpzuretox3ckw5b6wra6lkib6glwmhm7u3dtlksrfyuabflxdp23u62vd9u8dn2wfemfmbu35zqect52bc5je3oxnggzndbmqlwa3n2buqhkt07i484g96abb9g7dg4ufvbcdsz5y7fshouhmfn7vdkvwrkreow1ujii5n5c8kgdowbu5lpj8cda13vzgdu1n00wl89c25z25k6mdhqp0gaswhbr1c7su9bq3d95sef8wt28mvbqtmoliua7ka6qsx3kv7v8k1fjsza1n7xlbe13xi3ftrj67giccznzcjeivagk0ro06yzl5uf53w01e8j38rcdb92zlexk53llirdhqdjb2rzupa11n81kgtmtqq4cp6p6mspzo5vdvjxoj4u6uwve6xubjcjgakh00lk3388m3zh12w6',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'v2t3552m5clt1ida2f8hrtapwhzdd06hltfw5slf26m0f3aqum',
                
                systemName: 'fyiovyg5o7cwnhhjqobg',
                channelHash: 'is75ur0ef1h9zou04y4gip6athzng3nd7081a62w',
                channelParty: 'zir2ry2k21qf07nfmvxz36ys7psaljk2g8u7w57uk8d4uf259jzs0knuv80suxx0dqwf1y1wcqvp9d8actsvvz1607o1s441ao4fgczxuz4w01auyhunbp2msi80gieuhty7ijtlqttvv55vnurfgmr40skd5ue5',
                channelComponent: '0in6mxge0f7ketotkug5k8j47m8yvzzlb8fj4pw3ogr1e9m8eyjnmy2bpx0ztsgdssacyija9witbiyafh3c45qzcqk3gildyx1ue8jyxzt2l8pl8vfaccd4rxcsl881clw13u2ki1hax8u6bfsvbz4nn4787utk',
                channelName: 'dm2k3h62z2lmzevwz6zyr3s832vutr85nfyqcr4784dhdvscdtx1f1s0057t8ouiejy51ct8wkz61b2fk28medpyoeg6imxrkvo5u3zvm9y6v137rx5f3o8r11sf6977j1ve8q01j3diogeyeuc30s3j852w4b6b',
                flowHash: 'mhw5u30vb7tfl397zkurmwk45fycalp3jb02n61w',
                flowParty: '27ozk27p0kemjyy5btjo1uvya99uuxobm2lb9w9nqxz9fh03ery7pzs9u02p3avuw9wpbv1jfk793rikfqxk6v7lb1w2ob3sq1onika9tmrmij7aseks9pxnmhhdfjm80bsynp7fav8k00qom0mkyqtf28luv83i',
                flowComponent: 'd2v11zm5jxtevbecj4q9x2387698zlyxu078in6btdz9f0mxxt2oxuz1b3w8cktzq1vgxi1d6ayn7kr3p4j31mqxwtlb8dj96886p9jnaeq99bcva3t9x7d6azhl59azxk9u4qm7bnbpxsgiefjhtce79a02y47y',
                flowInterfaceName: 'pc7viw945vdbkpo80rdkq80ikc8qyhtzf68t3aon6z00x9u1hfj6iopf8vv2s4v1pp0puk6dg04riqcvxqhddhgqk9k4dh9366zw32t1z5hb3cttaom0vatu9y0efohm9uzbuoddi08x3v19ysywwr67miipj4q2',
                flowInterfaceNamespace: '93qmsaagtej5exhn5lkbxxlfg5rr0rja2w5wddt7250g5d8q6hnnthcasa39bbols29udk1wdzo2rd2ycs7njl5x4kc7xzo5ua22tbsi2k4o5dr32gnt0mf3ueptz6vtco32w5o4jbe5ofnssizc9t4k4w0zuhad',
                version: 'rm0e8cdc4rimwpfo7y7o',
                parameterGroup: 'qtjio1aqmow4jqfo3j4tbv942d0b07t3qz75ytgwolu7qpcbz4ik03rf527q9gb0m41fjv8ej0a5glhlxhvi4hcluhvbbc82kxbkvs02dnm1cagqpov7filr1z3hm9a7jlsw6am4nhu53c6n0e4rzm6b8ymd1xxqkwb13uhiyut5sl64ipqlizt872jnfdbwrtec0l3vzr686uo49muqi2324grr622zo175e11bczqga9r3f0iueu0kkrmc8e8',
                name: 'tkikq5oh3nzjlhyhd916hz2q6z6ufv5hxvfnrfu6wd95vm5qkyywf7ringuflrt33qwg4wl5en472pyrelxwfrjaz4hm4yy7ubtpbynr5k48yikq587xv2r13areofy7tp1td1e097n1ysapr83o5sf2e1080f6lhclqudsy8e97pou3xpv1avf5fxd747047uk2ckr1cd6wgxq41h3dqua7tqpmqpsbjc6o9ey99tzh3phueap7hrpzdgi11yvqvgzsrno1ttwu7zpbje17nv0hu3qf2cgrg7icntwtle2nfucxth8c6cigkwxv5gre',
                parameterName: 'kqqaiklumbw4q1pvjlrra9tjyzjmsgndglk3koo0nc1nbkr0xxvz3a1l4fawbi77ivagffnl0zto7qcniriugab5bcerrsjpb3rxqbb9jfpea4e72g6fed0wll6s5o4vgz6z5qeeqvenevxd4r6xe93l6yae9n6fk2k0f1atpacqqpthhockpslsu5dfm56b0ucuiihz4nomm79w9jtv38059u7gfjha2j3fsm6tnbz9hm59e6mvvqkway8dyoky10sgpj926j0lhkzz2l9y1uslukuf70kll3l3me9qtk8kr1gdswvjw84iojjg6po1',
                parameterValue: 'i7cyyt6fzvq8pp6hle9x0ga29omnywbt93cp3qq7cc7a1jhvj2toai3a6vjj6icss85b6z13ey3fimb5ywxsot7t1zrod2ij9shgqo3kxvlxd3jjee2xwi7r4y5sb4na1ak4mkzhhs9jo5amewmi2araq0tse7rld8ln4e56qbj0rw89mvp7fkn1s041nkgyittz3er7wm6r6kcuj0on02hbloqyo6a78qzc2ge8jgsjyv3ry0g02bhat8416d59mrx9qitkm5sf8m87qm4enn93fnfgnbe47svdfka8glfur7f2w7p8aj7qlymf10pvnyz1py82fz8ha4l77q8yozxvnqnfu3frbw1rhbprlkdfcpsgi9rcv8hy9r4tqf8m67sl4owpj4oxvx1rau7ncjdief6jo9ix6jvezd1asebc1xdakppnn4hl6b0majzzj8xkai6jh88wg8qpg4jbhyni4njixs937w2bwstrdk8z3ujq02v69ozjbcv9modukovumb5ktztd9t24mquqypirso2ujwwy3733xev3254w6pse0qg78hdt15xssvvjpppyh4rwq12qd6h6cqkvpruz46h6uhs6eya44htz4gk8kljskvyaoxl471p4rr5fx04fxlbtoxpjb8g736jlvxin04e2j3ocw029g0c3gwqr4ub84zbb9rwwx4xq1bkl1jl0k1pfllhdyl4twarc1ma6g0d5079jazts473mcnuxfiqgufz72vxzvffbk778vjqejz6ciorix3p659yj3pij74wdd7oy2jucob34woiyfahgl3s2k8fchfjt1f05kxagg5g2tmzup1wogpiovyxiyr2hapvkqslivmwjs81224m1vhasf0mkgm0dmzfocrx11j9t249o41zfyzc4qho7oc2na9pbi4s1xmu7001d5ld79b1c01adurofopgye8r0w39jsbvinr55d9k2wpqghgy8d5wj1jsffzdvfnn7th02uzx2a0wyrn2qvw8od9m2bm4qrxmh90g2t94wrfogprbsgs8vp11ei7gfynsqq2xynxox954c3i8dawp5n6l6o2g1a05wuzcbj7u9b78zw5uzpw7ixb3ffwtvy32qqmqjocojhvhfi79u4fgrfi954zuhe5blg3r4lrd635giv9whc14i3jt8n129lep56dva9an3u7g14fyl6zjpnx27or7xn9w40ufl8rale69bj6xds6dy9jald8o339rpmmt0hiw0sdx5jkv1b9qlba7efs4qs6yirppk2isv50h0qg2lmki0jhjifte7eazjoylm3jl6g0xt8ogfhotuf8w7endtystwy036xs89mjrt7aoudetf0eapatio0r0n5ljsbhpecy4qgdn6oi63qnt41gmskkhj1ssgy9b1i0li3w0b2jks9oecizttdunxr9f313gyumxml53bpfbadqmwqdci6rfmaz1kiq0s4b8mvlj70exu9a1hvbeerwjxwrtb57hj2a97uh7yxt9p0gj68nbhl3eluor08f1r4az0nxfc8bfn9u0l9hogfjfl7waxcgokq7fk5hxrpltsuzlj3ct0rq8xenk4s00fqgfbdglme26nbjxrb588265fiufeszvtaa25ytakmwcjy7ptssybgmslblemfjh5iy3cvxodocd6890ciwmzi4jxqcnsdz9mu1ecfm5y9uvb6du67pjl6ryk6vbesmjm9dk3ofbv5rq7975o8n3z854zkd7hdr1lhb3vww6vmtujdkbfbtz62dn6jhqf77rlpws45b9avqku6cvrq3rf4npbfdsm2j7d5l9w8m1qu84zypkuxuvdunyul3n4du1h3asu5fj6x9huyyr7yx4muqfec9equp3tlb0j7c4kuv6tpk37rj1jrczxvm9tv6899zb8vwmo475npjkbhlj8r4dw608iodeesw1c0ouiqrbcv15rjwo4u8rsu6s1g947lnhryt6ksxi8qb2e7pq6yj526t18tyk9ck0q53oh7nsf',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'vesnmkr733jstgl6geuyyfttliodaoxhe8n4swd0v8mfmjc3rr',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: null,
                channelHash: '7ufm0ubd6p1n1b5tlwvdyqnb47m70wbsu4omg8cw',
                channelParty: 'x3fqekpqm1xdev0xlehfndcxixzpoo83hsm2jhuvzepasi8uxrenifl2c2r8ing8ujq0n63ivws2guv6hsl9v55d3mv2g5cbayrju9xuo0epwzuy7l9g6np4erlxk66rbe7cie34e46m1goyl5l7thkjsojh0rwq',
                channelComponent: 'nrcjvxgb9nolrytaz2fqw5d7kn23nxlv5p7epe8t25r31n6uvdfc3ptpnixkazb04y6tzrknkgtnz3nil2m0fbr86jrqfzpy6ubug6dip9b2lrb1x3u62116q7tuoirhn8jancn9006n8j0lzhv2x6kxyiguqi19',
                channelName: '8vv4m0i9cviaiqvaevf7qfkm1xl0mw314a17j7bkt52w3mkpcoo0chsm79xzlz90p11jpqz5irgzk0bjibp436nwzqtnlr63xz8kpxop0ltov9oivu2pa4gzxwjm5s6zrmv0l7isnqtoqivmc00d3cq95h9pz2et',
                flowHash: 'hpoekkyuhyhv6fkr6y6ylweay2n59rb8fzaxkyxf',
                flowParty: 'qfy0u4lmhpl1shu12utj479o6itvhzcajypyh1g4u57hzi0cc2x5ahetux8acf0g2oo951hvrtf5yag3l42tw4vd6c1ycbszjaxef150quee3nj98hn5otaqymfspm10utrbp5j7g4jgfuurabl9cwg11mepiw9k',
                flowComponent: 'svrb0b722xcnr2cb3yx5gmybt9tazl2639hmz2f22qkl7ieyd7yv7v3cukhgf5lrmg5cio507poorrc82shrl2merqugi8sbs96x3txhnasc5jhkpxl60x80531cdf8nl3yyikbhin5ciszyusly5xy3f8sntxux',
                flowInterfaceName: '82rlns84mcv21y071lffh246yqbi72kr2juu1kij7nbxq8mt8v6f9p2hmpzyif42ja635jnrcb4ijlrpbyqrmq28n1cg7mv0kpzahavmwdeqpdo2a3qcvwd15km4wqrhizyowa6b0xpp3drw6mh67mqhageldct2',
                flowInterfaceNamespace: '9fddqwm09wz473ogzzjbxxrp6f9aq0oa83qk7cgshz9uixgvl8d02u7gc2rir484f4kwmekxrg34nasuk0k3h254003xem5fatrj4c47flkwya6eivvmrdbiem3pv6kcmsxipx0xh6rs59h8porgihbsd35ww7y6',
                version: 'w2l3dddfinmvqom4soyc',
                parameterGroup: '94h73t4we4ffzuyroxrf17dz48rw0lsr2mlddjmogwybhzbvqqsl03lrw4941zzynzf63a5ernr9oaez7p0w55mc5cnzkdnkjlbf4cvgmacxolg3s5rn6wdetai2rbn1f2cox7q5489hc248pi3yyj00etc3cx5elqxrhyw9osgjhjvjlfn9qu2d9rm5wkpv3m87i7he0gebsi4qxt4yele98wmh9abh6vydq0eocsbbo457xykxqq5r7c8lo2f',
                name: '1t4jw5p3npaz5nskvhnexgnzxn6t47x0x4h3imjutslnarvdagcbnmyq97quo0h5j1dj7z4fdbpxq4mu3zvyjrzrj06muqvdpzp3tftnxuqqx7noh0z0sw2gyrf5htniwgcucrd4gzo122a6rwzc7dc6sm018fbxi36b5dbeemi7a2mg0ujxpjr6cye24zjefzqjierq9csmqx0vedk7a4zaxs3idozwm278kwvwjdwl6265y6qurf9z5n88ks3zxxqz5747iufbw8d6aw85lla9mgqey50zcc8z615ou70rgryb5ctkakfvmftvg33j',
                parameterName: 'm9psoq28o5n8xp7t1v4m390tuy5llbn3dv5lorbubulfirux8dckvvq3haqeaynso2tu9egyqh7854pulk7zho32hoeqw13ueheb2lofeehkvjew1eyc6chbc4u8l5mig8trbcjvvquzbuub4tpn4ykur7k1kcnvy9m2rbmpvp1l5lq4ryeuagmdlhyz837faob1eb0uibtrp1jequ2wi3t5uigznqwl1loq2awtfe6r8q8li0uunw5t28dothdhevb3awh0inwvrxkmjwoaesl4b96d25k63yfl9h7omnscqp7pdkopv5uvdoziakqk',
                parameterValue: '39rjvgq0ezk4rtli13emuxbtaynr7itwi5tfsbs8ksq6tayx939sh56wouoecoebfzaexhfva19xjmooo9f36zqeugiogi51w9vc7880fpfgw34hdpt1xjg6lawlolv0u74u91t5pzcqw3urffuweskp9cf0j97c4woxw3akv9n47a3qtfdp9mrbkgndk0esequt4kxxwc2jhbm23p30hmp91eo43sjwtb3r9ivrz31hna0wmsxcjl37fr5xlwueejfau797rjnvei5uifc6uory40odxh4qj85mmi8zr8zg61it16m9xh27xxk5zc90ai9k6xucfen8g97vhe9efm1pvcpg0bi97sdr02rlsgirlp636ob04krokmh2yu25h59qwf8gmcn3e1z4djuxvr04vrc3cfgu9e3b9n5f06z3u1mqnfn0wte8z2xu74utwbk4a69d39j9gn2fshb00dobtd5blzqhbb0p9bf6ctz9hghhg0z0jzmnspi7k5fputksw8f8251zm90v1811irmfk19w0lgthhlqey1yq2xebiuehgovsf75z9i8ch5a30uefqlwr5cu7s4ppb8bdfrrpgzffu181i69xlbi5mlmqlmch1tsx5yks82dod4i0log1inb0b0prnqet9879rf9267dnvnps92u4a0ebczcwx9nmzjegqj3y2zvcl0r882dkpoag9canjrju6trnwudxy6ioyx55ac7gweam3jmxtk840l3ffnpnfju139omk7emed8l0zt9vdj2ge0d9elb7aayz07nejsdhivtcpkhc6lyu6sv76cun2s86gu3kkx8xf0u23oxp2k1oslz8wnxto2315l3ywrq36w9smv1p2kkvu27ba1qus3mw3p87xo0egnjrcpgm6t1161t34x1wra0l8edln26nkiri333o3iyhim6nlmub1otxwuzux6qgic5p2grg2vtl9o0v5tzli9b4wxbp9t9g6hakc422g3rdiq0i5m0k9l4469ocz2i4g8a08o5l1sxb144qampu715ecvtpmvia7u7dlfwsvfm4beijqq7cdwis6423er0for8w8x7s0zpxm7g5fxvs8eehl5y1rdegcjw1nzs2x3lro7iumh6gkc006i90whxpvd1pi2i287lg9vkhzmfauon9gfilr5jn2fpu70nnlnrr1l28hnfmfq546mqv27hh9mx9gr31260ya8majwdzc54g3wy46rhdnvckp8wbds5wck5j0w1i31j5l34k96rqkdqlo93dlbs8jh3wkpluv85kpo5614f66ao96ikknelk2y1e2egwjn7wt9s1a0ze8mzgbkzn55pba208lj4oauf1fel3l241gsb85z4eg4yusbe600r51swq8ya09gjefzri2ixbnves09d130jex3bxp80e4fy1mcmyl44w0hfx9zhbg8r7jiyv46dpog0zuiit2kfqzrixhf9yhq6vdhoyu39ob12w99w830ezbbphqe6qzu2q48rjiivkzf7cwks7grc3k0cnh835ghn1p10nk82v2qn6oa19dmda3t7a0m6ve7pig165ei4kiheeimdpsstxb1z8ne08py2g60jeq6qv9o47yznbgwcw1lk75nyw2j16fusg0hy9tpk25bnpip8v97ysoreokzrpzcge08kqyg2ow68bgitdnacujob2ezkj94qqre244d5d2hvk886pge9evyf0gg4bmvb78c7x512stxhjb8fk21uzew078va5vy712z8ola04w91xtc4fr3puzcw7usvnn86h8a6zc4rat12yblpygda1nkimwxxesldmawol764ft0rzimlwayv00i55sxhmabzxg8f7j12pupl9jh4j7cjxqa5r5dcdaxn8234a7c5m8yubha1q8arfsmnc3wvk7acow1gu1v7888f2cwhp202k941y4ywchejc0if31x48tb2mtpbhi67ax5fld10xt9uh3og6yd0ndgkrnjd3asntp6g7gas1s4skax',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'u4brmsb8efw1czuk1tnaal3mp5k99lfk9sn9w3rby9dugiusei',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                
                channelHash: 'x9tt148m6u2e78ppesz0anc5lgl90al10hw9et1z',
                channelParty: 'oouasliukqzssagzefm3yg0y964mmxh65u0dbvgj6a9jtg3r9tmndkhkcvhh4av6yuxu5b9obs3lt93fagkfokscc8i9tj5g82sb1b35bfhp6qoo3vxar0s9epewmocsl5vtv7f4b86v2aw0ptwp6huxfbwotttm',
                channelComponent: 'j4mxnggyewyweds41ohyh0qzfym32eifuvepwq0l7fejah1rjxvekxrikuz38op6v5mjin0wwc6sozqo8lwrme6z1xopn56v5yfn4gngw9xc28rtkke293jl20e0tsjq9bkzu9rswqnowqavb9jjkz3hrvi7ypp9',
                channelName: '9o5qhvht1owdxnviktkth6wz8esix6kn5dkwedte5v1mp7tkxh099ib6kctnmec2h4tatolojb86zowfudih19axp65oyukksap4hsplpgnwh9wm30wpm6gpfxt1d5w4wv0vzgifzg0wyyc5ztto84e6fe5wuldz',
                flowHash: '6zjhvnblqfvnj0ig4sfhr7dn7ms452c00llhn26v',
                flowParty: 'yudmq5az2wkjptevf41d4a5wy8rjaazae8a7kpq61ynufl1zmfr2gfjh351yt393px3ukj06hyjrk1s6xlbr7tllh8s79stw93zivxm1gcijyb0de5cmjtconltup4rf8xpxi9c4fq41qq9fka4bbgb5hdckpppe',
                flowComponent: '083z7d3wh3v4job1xpyi5s8qamgbm08id0d0d91oxuwq7712pofbqy21e3gf33en8phj04ou1ol1cy5eanxe8xrqwp94orcmm3bgwk628gja11i90yicuh31b6tou54lxxhwwdqd5pf0mclxn7gjdkj8pr3s1i88',
                flowInterfaceName: 'b83ne16cqog7utgmi3gm6o94fakxnh7ha537zhhen7oxtpo1urjsvxuq6ieh7kxw3glgpy827lozgfz7xejxivytw3a4ct99smhr15613joacvkrbfowhclxfu0qfuwd2oth8cfjd4a9majc9biy98wn4nrjcy1f',
                flowInterfaceNamespace: '23x7mbthvztf1f47x9tl53kw4x54rznjdbcqg24kzpytqk1r97k3yy45dha0af8tflfmd9h8h0kvjd73yvjrheotvnm9t89wyx21t2fiae7rr7k3cv4lqg0msri4q0yqtj9jt6k7vekfis9achao8or31hg3of2y',
                version: 'e0vqj2eo3g8skvr7gjmq',
                parameterGroup: 'ha1c5orzl1uytcedruno82u1noxybxqtlfe3r1ip2cz98m8wo7dfegane6dnmvgc6cso7m6fp3im5e8a5eau5jh9q0i4v4xfhf7tdxlms9g4k1i77x4jrc6h0d4x6v7em2rgfmyrdyn06nem4jv0x5rz9r1ha9iqkg469zprfdf6rvuwv9t1mqyn5r1aruk2ypyn7e2lc3qoxexvr9mhjgqiyadafnueirrs9lz1faqqqtcjxhhf2op3l26lyk0',
                name: 'q4pfh85hsub8nbm62t6c0ej7ya7z6j4udap244oww9ucc4fjjby6bp738ybv1odc04sm98h43qwc7tspjtpvdlnzodegycbk121tgvqz0t9db8ajw9sx3u7n8snblb3k9v9uowein3dlwi8gdpecf5e2iesluqddtea34tcxqxj3uzrbh6tjufhsft4n2zstk7cd0kn3ivgbla9za19jhxs985ifg06uir6xtolxadyfwa9l47xdifl50kj11d2kav6dmcj5p03bmfpr6qqdxt8mjz7bima4kdiaon8loz6miegqrc4n6lugz5phcdzh',
                parameterName: '8ptteh841tfbejl81pk6ptxbg9ncpo8h7i3r3hyeudrp46bydx6p9s2rcgznxwc5ec6w4dv9t6r6jawmvu3t56puxlktc3kjhyw36iojzntmlk5qw7rpmqeobxvvyw1rnozzna13rvrtfwlq9km7nsrx0fzmsc05zqq3gyf2v6rhj191a03poitsq53iy1xsjumy05mw4sc6oaea46129xxt2r2j33q7pe8thmz0l2vbsqg2dib06e3qmxu6cypv9hvwcvd2z4vv30povtubgnpniflt3wmpu3myc5kkxw7holmrb97xbpz84grd2cqk',
                parameterValue: 'x1va71v3lqsiq3m4l0lemg00nawi8lyjrruzyzm5bn8abd25ubp9d51r3nfmpwfmck9i5hsznnlqn5n5p3rcq4ab3cg2q37ngs1krlknb3gmu3prytwrgbcjmvm6l2nmpniip357lti2z0jij8g5co63f2cod9k9b7muqfbh3qn6qz6sqr3pqu1onhj4lrhyn15rzwv80vgumgnpibsd65uvpx02x0kjtg0qp55rubchmeth4o957wfh0185tsydm87hjkz607nkibsnqyop0z1abk9cakpqxvaw3g25q1cc1dxyrrfuc9t9pjlvhefdryybgrf95znn616cv6wmh1ctwmqg3m5a3ndun60ra3jph9ebbhnfck7s6k96l2wzjy9b7tojjjoopbvweqfz7g3wjp3i3dcj0zyj6p7a9u00k08atq3n534sl5198kv8i86074i41qtd7ubydnxpge2sm4arqidxqekhgujbx3mr3hy3bucaaqc9rfni8x1em7ro0p6zuq2d0oy7dsgc7osh87sr35gw1hj70xaeye59wyxcylb94ggeyfi3a3jmkjkb2dyv8hye69uv73v4ughvfm4cvomg1o9mk13u5ua6jfr9qupakmniftd6yo2lw9491d30t2q52cne6id56fu8hdz35snh9i6x85gsg4md2b3jd0yagab2jckfrmro0vbz3dlue2tbdqvgojfx6fej0xq8z8nb1ase860x2gas95hjy5ip3byaxpd9i3wju00p3aadvicmkg46tp49p6xf6qnte0tx6fkij8f5rznag2brc74viqjaml05ukuv6kzupati1pz6d2jm4gdmwnueqsuquihl8n6wcka2y38l3yli5f9q52r52q26xf4p3zaxuezu8fg0ybcev1d5sjevnafz6i7nrstglo0evr1xcmsdpcvmlyoeb6ttqo6ge3a1xlday62fidlu0w6buh9q8hfalh9bm0fdnsk4r63rpiw4clej86tsdkejz74ln0u34jasc49d6qx9qgqf06pfyjpc64d2o2zv6ghypov8mkpevz1fwfo7p4fsa1dgup8ej1g3xk707c4ostf9w7qateirteaq4fc2bfe4ah9k8wh6zsfx6pwfegbhbrnjz6tdfkqboqjllx27am0etrdsxb9zna9d2e003ch7gh57h00m2ss7wby2286jocuplatujvbkkr84esjk2sbwk5uhhowxt379ofmsvo7up0b6k8retuhkfw67auv0emmae78ji79kb3wffi2sux5vr6nim4lrr3x2kj3o0l4mm3xqmugid8n757nd2v1ll8tg9iyetjo1bfcwzu8lx4u0y0h8tkblnhsk0nzmcjyjsfplmniqy5o43dttqqtut99lts7c8iuqux1btxi8p43y8uijoc975v5nbdb9d9mbr2nlqsqc47kd675fcnq78rw773h8qaj4nx3r20f3gfegxcme1znk9ew7a5jhjg0o8od89azpcftp0mypecg8zec5d9ch1rjfd4ezd3ebncyq6d9tv3slb95xki02r3sdekswr5ynbd2z0reolxr924tta5lz5qrq3ugkfg96vwuhh9x0dhqdbryfjcm4sqhyfp4z8rub0hie1nzfghrz7rduhe0zaf43nejsght8zafkz0kpnqfhmn11cmf0u1kgbqm0qq68r9bvlks7j8ut0qu8d18w6ng9y35s9or26p0jwropawk17xwzuzoxp9v36wuwltx46w82d4f5kq94hyg2tajq02prgbevp2brdbrdkh191tu4mxg7rd1fr8620r5tdxgq2qbhwyr0tlrjuzh1ospx8xrd2k60ysmufq2p359ejh4d8yyhyth6xewslj3dsix55h879l4j2wctqlnbot8b25wr9agvrdilxmug726op29ahpz2hfs14lwx9578g7d5eskpm8nswreq0y00t11nd01dt1b8mn3z1o6foop1si4y3a7yuwsdhgpoq9v2cj93dkzy4vit07ao9xr7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'qzpv28e8x8e9hpgomlkk4vlzhk73enowu4as4gqvl339t89k90',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '2btok1i8e04o1ylm30ye',
                channelHash: null,
                channelParty: 'xygiqp6hftzstdjf76qsetz6aezinkkkc0617zlujp95vlril53ctgjn3usuy390fkzw8gub7nrve9v1kvp1qbt4obylistngac7a78gszs3tmr7qpkab25y1lqhr3jqp2rtm0sojvo7hd3kgt4spfwk56z809ja',
                channelComponent: 'nckomdgpfctmm51030yrrpklxjmakcxqonkcsyg0ta8izlrgb9ez51m3f1225x4ncavjveshpg8e9t771k6f8z59mzdj1mb06gag5pzw8gghiohv46jg7gjjx2co6ycl85jhp7zuq3t3e46d215nz11c7fa7snwl',
                channelName: 'mdbixs12uhhdsfousytn8k4cjyra3g15j3k9qn1ks0g485e2ofmt6enzv2cfi8ld9vkzomvrk7bptng6bxkvy5g25nkarju810okz5pfm321ogzkyapebpt56j9hdlm6paa5k2uipkexq5cy29pni3wi4af4ldal',
                flowHash: 'gt9lo3o48vvbdit3bcpe1vcmqb0a03w18uia0ech',
                flowParty: 'p26cigdl4p9a2m07u5tcgd4xmij3ma5sli5qiopy0fk8n6d99xa781qmc5azjhcpvzh21oi5jbrfh45rzx3kvutbvmz3bv7pcg0qhxi9hrnu5ogyqzejl14lptfgbnam7d3n4j7np0apusi87m2ydsebzayke7qt',
                flowComponent: 'wvbw698ir59p23h1f3pgz95x2gzljy4j7q88edr0myayiob9by61jyqbfen50ydpa28a0mq5graavcg842f8f4971c2dvko9bowxr7xvsw0n31qonhvf1k6q00qny4v4gzp8iz10ei7bdrzb0tgagvbfp5sotkbw',
                flowInterfaceName: '22zt2irqj797jfimry6v06cqgjeob8xp5yzlqg1psp6wcr1czuagh0aql9nmo1ibuqs5cxqula465vrh6z6jdw1jti30p87vwkd49sdm5fna1kcfab0wb1su8xdfvai1mtwazegqxtsi6lisskl0rb7cws6e35mv',
                flowInterfaceNamespace: 'y4devd1zq1skiyynt6ieoe9wcyjowqqhi4pqflpzum6ihkzso1w6awpypgvixr3y70wud83insjenmnkoo2lj6lwhgew21mrjum5bb16p7cgyd0evlupjjoswy9rps88tnt3fwt535r3v2bk7dgbpv75qj85vits',
                version: '0k1ieblbxdcms63kma3v',
                parameterGroup: 'sge305ctofjcrqcppbvmrvk3zrfst2qba20zxhg54bnbg6asxrej1dav6r7ocwkeybk2g8ciq3zhue77xyn87rb4t93xlknuzfn4vkr6jdr0mh37mmmk67505rjr5honjyst7hv7fcssvyxdolwat1i6xwg6haozdnwuceuhwisyp4s9h0hgdackmcrzp182keyf4mim5shud1ranww5ef6gr9a3nzqm825u4qib8onkzmtm2dvhkwllr3cqmpj',
                name: 'kjys72tawyd3tvphmi81h8qb1ijfrk19gz752j89abqo9akhckrxu7pbx39u47bnlghpw9x98cuq6cu3p8cejy2mkl33hlvwx8mz022j4u7shtosg9q5uhsaoyxy2m22lv5ikl8qe1gf17zgjgbs3du32qmess9jz8g89y3c5j7jp9l7n645ipve5vv77pbfyyfl09cnaoo04c3e47p32ftczhxfqenxgm4sfasoux2pgr66y8n6qs8s8x7l1erqccgyz5hredlohhlg8q2hgbbnsnu86knk7ye4t9vqg739o9dckibb0f98wl014enk',
                parameterName: 'n8mhjidozk9kwi06ah77giu3o8xtxthpo7eqcm5mm68yih1og1dr20peamjmfmxl7aqul0g20spckziush11nqgutiqqyuy0b0dudu5xjgrwjnzaveeq7wtz76uayw8r9fqsyqu6sxpv7z4et68ljghkv1b8ipqb5m2yozfeokiedr4564s1spf4v5xuuh92ewshtwc9it25forileaz398hhiax3qhl5794sy4muvwzkamj5kgaysg5zmu194tpput2quupulz55kgjovc5ftl6yao7ovvbolpzudkw9itry7s899rgsmbdg99w6frv',
                parameterValue: 'wsf1e4x4qkavdapmtczsvx8xx9wmvffrw1xtcgfnnq17waxtlmkntn8ybmdn3iix0xt2rc23thzwyx5orjzbovwne4gfpqmi51kb068448j1qbemunx5hpblfi4v4xjwz4znbhfzsqmhiwt93q4tdqoxm5z5em2g7q1x0qeoqym8825e8e8b9upcptqf4dlkeudq189axsjnmf6u41imssj2k4j4cgj0rzgt1fpg3zc3cybe7pbg9a5l5kgwyzk5pzeiwh82lore1zlpdbdu51akpe5sui6fxwompts0i3pcy89sbmsjd9j1a8myndq3a8wwcoxypwga2x1kuc2b1ypecqp2k3wl1p3haenwzk764o5kepsmdbmny79z8xwi0r1ldougt7x6o5krdr09xedm04s5patbna3f9hf1mgd5eprgy2w9clciy7mvwblv5qhpnms2bmnrpmdki09234to9gcre8qynuto2uhfhfximtmtfrl6c9d0zdu9s01ntmx0p7zadjn7uavo2i6503pvobgrtg1ff8ntpu31wfh0kel2k9xw2wi36qq2q52cvykg9p7ct4z4bosed06wxownjyg93dwjr2kyhwg5jtl2fd7e9cvyfb0x4vxv162jrj4n4s8pwe9jahaq9goy9wg9o0kvynank76jwd2b18r2wx9dc0tpgum3s4fc0n5ygud7uixnhcspnuwb2tokw0jeqnorhqg14jsh0012t1ma78sqje671rxxe8l1hlq119z1ws2badk0ofjkxeg7wbh5tf4wzjv3l786balk1n9cl21ma93bflaqyz2kbkxf6xv544tf0vmbdh8iu2uhz9g2e4uevja744goucd69kezrxzr54ijlul45lta36cf5jz7bizcwty0so1qp2ynv2xpakygbwuof50l1nuft3x5ynuszodvjs21ru77v845jfgcozeif1q2nbd9vuqhq6uc807axu6c4is7q1to5jlrh50jkgtx59c6sp452qxi5eqa6x627a150hiqgxotdqk1lbeq3a0mu5ywek6p6hdf86t5wsu0653tb1upum4en4fwpg8qb42xgq3pmzmlo5zspvvsj9djampx8n1gi2rzlrwq5x1x21hj02b9q83nc2l5j8xiiy4xske4nc3fb9ltoqg6ckdbgboraxg429t3d6wbt2uvk88oavtd01dwrfex9fdcsxzu7janekmqolrixdv0q91h4qaro4sjxrf1j518ho1iwf2acfoyo2vu6xvflsu2g5kup1d2v7yc52o8uxwjxuq6ckzo80s8ciwywlnju1e15p7spcpfakj8h49f0u0xus30p7hs1ho2bc55ch9ba2khvgsj190zdfajhwz05jlucoj2xympqrijoiyh8q4864won7mn7f9arnnqoiqqe670h4xyefu7mophwxwe8bnsupyi6503pz8lyfte0dvmndtz0xz5km8dsbsk1611w939xgmqf8vb6ckyf9lr8h0pduq43st6d6pzqgyubd8zzlcvrwcims7k8alo2na32x5zfx70b4jo1hhuknxodjgkq6h5ol0rc4dkoznocjjaotac99f0okijjxoltniqrt9nwedyg0e7ziy6zgftd9s4k0smjzdy6y2kh63ldukl0x8f4hfo79xfcz7p4c7dg4oiqv3v16eg832xskhk4cfztrlfyp3jmga914x27w4t11nwl94mvun6kg4e13ioajg810cd4yi930m98x2l4hogaoy0f2g4cdorc8xmo6105y33n5kz2g2z7ez9z3t0fm5auczr8kce09rumretuan1ahoc9perxeondwhymv930jbitlbvzin14ndtc82l1reir8vlv835oexv4xape9skjel12pyhg1l57amod4usnc8hz6pocdss8kxlte8j8k15u6jhasgitmbeod7v6zaat6y0g0iu3pl0t98ueks8liwkmpn15mgjquxhbstiraeps68k23n7e8zjja70qigeacpzfi4izyo5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'zqu4jdoi1t0j5tluaq78tn85qwtwue6fjehzt05i44diq7s72e',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '3fubmuq5ou2xe6rcedgc',
                
                channelParty: 'he3gm18b6aepxt10rlpjd9ntyrvyv6n8txvakdf9yp4ompekfdtqb1j78twbvvlfl9rxdku9syjpeg7237jcrx9i9jb4gdosymb2wykmbrco9k42e1f8xh39w2wiugvwnytfmmm9iaask39ev7edui7lt6sudo6z',
                channelComponent: 'f39en4on39i125kz4gvgp1w4z0dezpyy90cml76oyikg6a9qf2icpmxr2cfq2trmhahnwg55nddf1vlm18rrwatj0jh1dvgixwkqlcllgfu9p0qi02ofv09om27fdk9a97lylwbv4bsgol0j4p7gzuk2f5764ebx',
                channelName: 'c9w7wt30md8rvfkfohsdnxez98i352g31jtgd8gy8iedlnyih3kvw99g0m8501l3x7hm31pdi5x88ta261fn3a43optvioivvj2crxkgyc7z4a0z77nnkz4qvogsllufe3y9h8pm54bhrzlkmgrue4lkus8ro38w',
                flowHash: 'iofs2ilh2m3do8ym9k3h9gyoq5kn74usqijl2cdg',
                flowParty: 'hh4ze0m03i5bb8dsyvh30mhjzu1y91704069rvjh9kj19088wpz9tivpasj7bz5c0dm4hibhjs4eg1k3yxgulsn21duivs74n71vl722k6iab1jsqu4nw4lmcbg3cfes81dpqeetup0d1b9g7vrjswpl9mwldl9i',
                flowComponent: 'bgnxxs6spuso829vxbarcnt72xqw2x18b1fhvbvwvl3zyugo27axunyvdtgiwm49yah6qfjfv971h3g9ninwb4ddkf6h4xfd4x2uf1e4nvjyeqjneb3vnejgoo2uwgxfss3llu4mtjd0kok7b2uhhpp1opk41yml',
                flowInterfaceName: 'xsejqodw1smoco94malpwh3oowzq10itcyztfrlquwu6xodsslj2yfo6eg1fbu1r8fwuh8d5mcahtc0cewvck4urq9gpbn3q3dbgzgatvuqg52qms9rmhwllmd6j08vs5mdwv2jgt3hzy3ut29mftgsh50p9on9d',
                flowInterfaceNamespace: 'fpp0ifjhpvxd18t60bngu18gzez2vbhxkwpwms2k7bdytd6ogfblpxz8yenigzayhcx8n5rovy8qqt509fkqggd9xy6k5ardzipojgsoqyz9x98ktjr0sp4nifwcfjxkuzobnkw87nf4mqw49xbrj5t5si29pb3y',
                version: 'y809jb16b77lxi848ahk',
                parameterGroup: 'guu779flzh2d1ylx16qe2ilfnhf613ul8bphup2mgcl8qsoo1ijct0kx7d98f6olls2pvrodwi2xuyrhq1xlj96wj3a70d0yb5num5kiyb57ywi1veandsfnicmuy3ugghlukees11atwtqydbscrkhf7lqx0jfd0kd2w7kdlorimixrzxxat4g3h6ss9a7z8a6jzequr3w7m404aflwxhrzoqy6yeqe11gzu5sbqio88guumyooe4qr3eped4l',
                name: 'k5ll70wdslic53nguj7jq0p2vo7pnsdj20verwtq1qmil3kqqtuiz6r7pl9tjd8fzsknjc9t9s91p4bzxzih8o6jbl2xvx707mnncuytx7yqaw82puvoaf9nnn70oshytwkgltr9x44vl4rnsf85i3mp7tte602lu3p8x9xoa7euuqcrni2qsl147nduvb8bf713v3ooesueimhxxjayq30d972erga895fbf8lfjkrqku97t75ihx1w9x4z6q16g3i20vxcc0ynnc0u9c1u5ay9aaab16pi4ux1aujd561e06mvdiaztn1rqh8k12wp',
                parameterName: 'jtxlsl9bdkj6gx99cfu1b3l6sx0acs118x6vzfrn6yxhpatqy3ln21nqt064taxaw84vo6cx5qq3t78gn82f2blvuz17oice8c5ymfojlrcnd27n62x4jpbif6cgu26eixvgrl18t9uu1q7nk87zsqlunw0mal1eigeluetqct82y8txz3908u5g3r5qfe0819yu6iovwjltvrqhms03suk0dfsoarix6pxsc43cd35v252k0hjtj51pjbojb6kb4su9lbn6w0jpln2remd197kgpf47xbxh546l10946lbxbylxity9sc34l7gdgheh',
                parameterValue: 'e0bddo60cor42gstdd0dm9791uumyzazvty7f3qrzzoz7kgllv25guyeycmfdfazl7i9v7w3i6dxrqgtinacj4ayfjad3yf100h6k2sdc6aslfujmxfpm310sujhnxqujmlkjzcld5tt4my84vp7z8wd78zxk1h86j73butmr0rvfu95apzrnecdhtxf7gcioruiwu1ewxvcdrrtgtgm1v41af22g7dtz3jhhyxwcfsems8anam18rsmunnvr9li7rpjj74vyzjuwn87vv0egvma8s9iu9duq99iny60djaogvbhccpe0dswbxa1shml3slq5uudh94rvgblsytwpxb2q8wrc7923mqhxd3uuvn8okw0nn4m46hd6z3zvmbtup0mc8ik8m8gfpsfdr1plzc5wz6nrhgdjp88kk00d1ng37ll99l5m9ka8o5ivx0n6dhgbfrhq6xa17jknkv6wi312tizp0ull4i0ux0ulhmhogvafk8f1gigdtwtkfyqp4j7q5oatrcytu89zofu666rqfjvk69ew3vu6lfvjc53torqml3cdhz798uhtov8gobsj9e3yom4817abn7zhq7cvxs0fskzno48lohbb9mscofgmtamk5f6eavbaxg35klbpconrdjhox4rjqtyjh24ngrq90elqx45pl3dnvk0ng51820ke3hpr3u3znhvz724v217yesn20slg3i4h75fliwh5nm8a9fcndtmz89b3x2qsy5ndp6ymsufuosketa7dnz7z8si33aul4ks1fif7sbzaqol6g2w0pktiw5mxwlghszr62hzcgqbnyep0ylifnld2yc0r6412j7qkyg7ivv04ogp37xaxyrgotcgy890cj9oqf61xezj3rew71f3i2uw5u4bhsw0un5w2olrae3npneu8jog7j04p15inhfgcqb5ti6j9w2h3wnbhcr4t9mdq5tsnhjw83hyqupred73da1vtsvlmts9xc5gblcijr6rtu58ekmi61jkogh76auy7p1ojg0o708jwg9k5ksgfy1qzbggqdzt2rrn6ut262f0ju8jzfxzei96okn902hz90uze82isew02ujk4al6h0mo80g7hj13uofwm85z0coeeb66qaolcbskvv3lfhtrdq2ik7cxzmbrx3oq6vop6wf3ylf9uvodypeyzgxqafdy9im283drox71ur99xii9j26gr2qreogfhokmkdu2uq3s3sd7dbeadytn4mimcfuy5lhk32btvgap1prrcakcrl6b6ofd38jcl67at7f2wbm6nez3vge1ro5gkat60e5ej8bxev0srxkgwrknau9nk58t08lfuz9krw9u01zy9xyl7g37ml0xjeqpz0v7g7uzcihksi4xklj41vrs0wwwbjvbqjzirsuihjm6pm99603ofvll81om1vmw3h55g807l0hmvyzfnn56495xj2n14rdp26jy5sw2302c4p4b7olm3cb7u7c0lnmsie5zdrz6l6rj05z4yh4leqddjcfspz5ezrn2glr4tr5j00o6r9p6brmlldta0o5wjb980q013xuzqtok0kag8w2c9nc5ll2hriw9tc0sr0txc7tctuxzh4b3xtyexyp8uzubbz6h1710esw8okrpvwjqvbk7fmd7yircmldzelrq0cz28444qvt248nh654rfkh4rxuf28p8ddcyj1wxdpgw1cixkawijb7ziwpcs83nqfj757n39y0zojrg9w408g3nb3qyctlao1bl75ohh5mvq2yyxfa8p0enge6m124qyb8pm7bcau00sqv06sd2flowagqk7waw4u83wsk123coswqw3jl3yznvj2xeycjmny9nxemow9pt4ft0uctei5jzd82m5uxd4uxi0eynzd82mjr6noot2mtfwfwtqlmabjv98zr8xyo5gasr0soc1ftpm5iwk5woz32xshq7172njirygifotgvj2sig4ikq9hzvybt48w092w7v9w766v07q6wv90b62sf05yyl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'j7ps3t41m5pzjzds6y3gm7dd2xtz5sa79glzinywosbrih52wr',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'zj2ijsdpra48qkxt4b6z',
                channelHash: 'wtrdi1quwzh14zcydkf6w6osfxhko77soc4xdkh4',
                channelParty: 'ip9a42nz88z5obxujlp4b5sqgdr6d8ebtdqn7zzje317haau85anflfw8a78fl092zlpu1d8s8h4olqk0zt59pj3gvrjrw6abem3a34zhowupjnd42u066lglvvap8344hwww19wzh1rhh53xfte21i3b2u300ee',
                channelComponent: null,
                channelName: '5as2s5qmnisa24zy5s36szgbh0lutd16ngy1326scu8vi1eg3tkn3475doyvog26jira8kle7xfktnpjhkv47lj1jwfbeto69xe7soxdkgz7av41hd4tg7ixdu68x2ql9k7c9bif8hi8iofaulunfbrs5x7mxh88',
                flowHash: 'ke01fk7scwobmhxvrthlwaza4m1f3jhcnivbhq2l',
                flowParty: 'klnfp26581kc6ezmv0b1zhp5v3k213ughxnieqm903lk4lrewmkkd2hcpw49pucaa806rhc91q8ulszp06z85a2wjkfblbx0wr6oaretcebno4b0l9n3w3tkqtx7i4yw509kn3fhy9zkik0edv6gtrpi1fo0xm9y',
                flowComponent: '828m0fqxudgdzgmmin15jaq2dteb88txxto1bzk65o27zo0a3kzfsk10ttt0fihznximgov30z95awvzb2r1ae4biz4r17yqnxnmq91uutxurkz8lsol5uudvr8rjxdtfyu9wne2s0za1r6of5qths1sh1iyboev',
                flowInterfaceName: 'cgjpf4lx5io6h66zn1pt5serjzrfh7kx47ygso58o4kp54gj2ud3srrpsgb419zwfk49dzh5ez6o8gyvceoudzixyw1w7a0fpt53iqxwzai0cuqyzi4al87al09bbpcsbwrhw5wac2sy9f0osy0fo5r6w1719q1w',
                flowInterfaceNamespace: '21r3oaeemp3ni0ern83dsra1rls4no7q6z6qekzaxaavfc8uy56pdkkygc845xm8su3kkq6dyhpj8wvagtelrwr6ut9y6cvruu3lg34b02eoshu61npej6vy05e5ovyp80h6n3tyklmijm2ybddj1oauwh8tau8r',
                version: 'kccb0ko23crg2x3z5y8y',
                parameterGroup: 'kxki4c58wfyvayi72ksbfx9n13dvdxrd58go0zccrjw9x9cepww5gq506xhycxovpfhnueoo60k9f833idjn9ugzqthjic6e8svy7e572j43aipsrajpxoqitk6udcjhr1evgoawl910r2mr41luhji1192bx39ts8wpovn42q7e200687yf291hdfs9l00fmjl5ntj6ys40xe281cuyp5gt6zcdb4ixjrctysd5cdxdm5cy4lrtw9z7i7t99lf',
                name: '5ifu924cm0e32j79yxnf70su4h6s6q91es334wzfjcekpxjxnoqorpvld05ibvwjn4ov8o60qulcn6y9r7lcgq9swzeussvp4y3kzva7t0184e6f3p1dluw1y2qh1veg4s9n159a4ywvnr1ko70fucrqu7lhsrprwvcpsyq43o937s8fxgi44fltp0obumkleik0unf8ilmhmirp0ivia40ui1u5zo46h4a2x1y1bf7aqcxmkdw5gp771hsit9ii0vmf4yb47poxqybwvwugc32vvw6xy2gpkfp98apbc6rsy30p6z02r34ohql7cuj2',
                parameterName: 'btxw9hhp57blacmagumjaypkddoa4j6y7zh0x4jhbor1w8xpdfsrpdleee0ze7rarbtdtywybet421ik8mtlenp5a0sibuxvrlcbac5jp5d8bm7m4fvqkplebk6l4hptxjcmbukxeoj6ng805vsznczo7edl0b1fw54i5acdxi6zl1bem0lgy4mr8r8dwb19e6o8jkozuen2s0k0988epec70nihcbgeont34gpzxfm7mhu9zc9rhak7dj5eq0hteqxb4o7h5cun1u6jo0m7rlt8w6kd4qqz34cxtsouboyaolmm0mbe82u90wnknhb6',
                parameterValue: 'vp3we8xmy23wfxqjy0htst4kjaqwxi1vwikuhw531nlgi3z5950ei56ddz00raove05thutet92r7a559c0ft0l0iu9y7iygsukqyopblg2r12t24zofxc8ei30kxihrzeclfuz0fhvnrmsg8v4yb7ww6itk297fs773qe1asir6fevc3wqujxhrp4hunssfsekdwm0ipjd5s55q71w1js7hrq0bq9iewou34ri53eu3jojo47864fo0ryxtqnu5yxwyj8tsb5syhmhv6i4brwr2m537ugrshwrgwd8wx84stxshs2abd2nbudwchpk3u0k656i5z6dl7t1ebvq3dlzudl4k35yitqze7kbsv4n9xyss57xfcrqo28p17pphbtp32udyijm955seo4wbqzg7a5f0l4nymo9zjo9dqwoh3283ibo6srhqsc4dpqqp0ft8aw434zxijcg9ex2ybw6dsh3yfvwvujhnn5ne7tdelegwr3x4nthwt87dxaqdxhgzpmt1a6mmfkpa2izvrq872tn332zq6toyubeaspna6yx2hcbj6jd02x2crizzvz8yuwkp3j1w9g5v6fxdyf564uwxtlinzduf56y1qy15mci2lydc7kh9rkmut18jyfc1n9bk89dzjplba2m5zmfhq994r31in3jbcgbpw5akpy0z9d4cxl8gdiyroa8pcwc698ow0txh72g3zu6iragixfwbggncnbvlqea3iasjx5hblbu5lblghgio2nr62hy9rfts0ibi2anke321dpsvbybr8hyw5h4cix1sokn4bpq0jqle9ucb14eshalgpniu9cvr8b5v2n9l74oq229b25wz3i0a3cxmg55b7gwb7g0981ngmgcqr1kwdvxdos6kc76m20k57rzrx0l4vdipv9cx530b8cq2486i4j5wi5qsv3d44yhobzeq3m9p4kfqlh5zrzatyyvi1ldqwn2fpaokvegddj2jxfwee6vdfdcd4a1b5qzculgz26ptur6si3om2ri7a0o9rmrklf8lusjyprfw1coox9xn01zhzal5nkdmfnjec2y1valu5ccp32d3yp5kxhaljgraz41sfvkyoeqcb74rmnsy6lmmvpfyx3vt42608dy5k5acbx11i4k2atunnp3h75tk0v7lpkihfr13ccealb9i45ps4bhi20n86pwubd0l8f2vdlvhpkgez1z6leozd3k41699cinxwqdyekmzyyvrdypxun0sxynx3uddsn8izfatcyjdwcadatf70xwar0ud7258w3gvvq2vvqqyv8sgf4m0vwsq6n0kuixmf0oem9dn7y5dbt5o0y3ft9mun47usb9jboxcjtgxj55w09l2iq44whobopoj3kds5f7s1dn060vdzv9sc5m3move1kbd53p9979busspb7ly7kxqzuqi082c9ax7p64zq8sqh1wbwko3rpy0y0qk5b0kmsft5sc6q8zi21ifh01mu7pt5pexbk2ojpmz93q02to5z0t249ga4z7v1k3t5ba5lubdc20j7uw7nutj4cstfpmuycmi8168zezguftnx4wgedpwmcv7po9eet21pkvoj4u2jkgwbdhh3xp4z6j6ztr3pj2pyo00ihggtymkr614v5yyiwirlqgldgig0c7a4ndyrzg4x5upc34im24c25t5z7nfcku3v2616svmycle3pqwsrj0ulpo8k56xnsp8h1en8j795f4ofw8glj1vvq7uxnpf9iva4w0t26knwq27wx2p97yn3kh773zdw1pj9o8xs5cyoeugamszztbjg9hh5c5j6dfj6e3v7n2yyoyr640dj6arjq4nducnt2m2puheg5kj38jdu17zyxki29rs69imncljt32io2471vaq1hf2s9azaq2c09qdr1nugr1zx3uiqunx4ro7tci1ew73906is1fjfw9gse576qcwvityiok4rgn8lqmbc45zlgemaujp88vvhrdtphp75b36jhezh7fm17la54i1w6se42p',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: '2xqqgmog3n5h2pi38hbg91w543wnripbnx0sx2h8sv0hfzff7s',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'pghmo302aetiikl666zw',
                channelHash: '3o2w3ww49ie7l1iw5w1g7nfq6ytt5n2dg4c4rgsl',
                channelParty: 'ky4qz4qheovhyv7z36jahlivsxivaa23y5skfyx0i0pgk4lprh43r3qdq0z1gwmjax8e1wvo6cgnerkwxzww4xkpyzl688ewnnrsi7grekuze2ak3j1s8f50wswdzx4ux3610lc2ssxn3jrn2n2jeksm9ynmu02v',
                
                channelName: 'ra1slynww9g4gbb686d5l212z3bvyehytixkpou7o72qfvnxg4s8zplzjjpbcs7frp0cqfaq6x7p362y2p8i78qe4zci54xfkcty7vicaqbuhwu9pkfwprh8t6jm0mxo4ib9qrmsbp9cde5rseygb9v8ffm5fej3',
                flowHash: '6txasnevq8nplenyr0r7kaaedbwkv3voqpu1lq16',
                flowParty: '5mq5nk3s7ualhvrinuvl8zu47qjbxj5nc7qjxzvnoqa3s05niw9aym98xok98easmr15tcyo120wwktc1ysvjepar8ksc9d1cbee52h0aa7y6r1efpfwvcapd9ey8hph7s1tv6izjckv4aux5e9d3wede57zjr0k',
                flowComponent: 'gnl0hfmqg1yydgg6ge9bghaj080385gbjh5pwjospwi0cb57341nsk07ks3zasj7dlhqg2nxempdfqk63d8v2cn751up5cfjzsomoxyyu0ruv7h0jfoduimu0osgho6nst3h0c12hlih01l07321vibuldrzn8uc',
                flowInterfaceName: '5qlat6cd91g7l56hasnehb3x37s5i469u2x25qmqair04incm8aihx0obiilnxdndov5hu5ir03eatk472mjbdr7zwahsc9ljm2ung1p44jwwoynztwbym40sby1cw7bapuuqr61svq3uahf5ly163zmc0w7epwn',
                flowInterfaceNamespace: 'h83imku1r5wk3gqgnoqrkubgp44aevsxati6nozje32cz75a08bkgyl9o02ms941iunhjj5pi6uipi34au8ho8xvi8cqbwusukjcw9c39sf4c7d4rwy0yksnoixenm9fsrseo4o0loyxlnb6qbl58msatqi5po4u',
                version: 'q311sy1wmnin3u6jfy6e',
                parameterGroup: 'zy7kdiqiyfpq7va6l1886eqv76z1fxkmy1jgza1at3gsioe9jlvrc6lp5059xl94sncjfs9s27pj1zmnm3qyf7c5o8ol31tf23550sad68ubw7miyozkhfxsmrq05z4gbg2fuay45hzrifmd4ayamxq1k8aa4ze7zzul1ofg0jedalw5u7396hdype08asq5qikhpw294dm019rg926wbvot4q68asv7xgcnnpkl3u2y0szupd7ntngjyc60s9g',
                name: 'uagxmtfhhl73rnwqda86gm7x1x6bsq8r3x3u7cmav0g17bv40tp6rbsnizq20kss17t7x46ypi6mc7cqx8gk6iggs8erf3tc5tf1finmbeljz1yew8cut0wszydhll6k25iw20hk34n6tvpo23bql79o0c25l2v2w4ac8au5h45ndgu3e2isum1f45qd4763inunh4o2ekepx0qzge75exxe3gbw3dzl44u2uvo1bjx4zdzb42ieomrg5takbb0nr4nh92b2e41nqv4k55cmimqwup8iqjzlfun7hoi5jxtu0wzrx3tosdthgjpcy4zz',
                parameterName: 's361yf6vbzv5lsdmoovrozdof56dtzen0jcddhg7hpsb446fchq3iquhcos8tpfsryy6unpeyykrw4k3m4efcfkz1zrsa4adtww3vvhy9qcjdfha5k8teqpdg3222e7qcqfilhtln169npd1miob41z8w0gh400w49050y80hihz9e8b5c250rj0q4k52vb0f6rx1poi3j4y8uyh9w9yoimih9zhcrc23d71vxf438nk7gip9txmjkk8ixf5lo2sv8gftfpyvqldxsveqme0ub55le4ck7mutkjifufk4y37xmu8dqouce92t80dszx2',
                parameterValue: 'hqhywsdbb06brytb2lpk2631xnvn7yb6frcqx4q4v8qx7jxl5w0cvad3z0i3xkf7nrenl84jvobz0c0xrgjmnlecl9i11s6cm1klmxa3tqlzrtqr32ngonmm5uaqh1iomekl5mo03od55dm3h0gjutn8madqpny2vsl5635h9wmdx9lh2qd9egtznmypzz29fohg2rkehxudb6gczr2e2sqfifwvgfat6k5bqmt93twcjhtp0apllsxkt6tgzhdcgjcazjo0wrzi43t9v2htb2eqkkvhzzchjjxsadthfq71heiruesi89mi4ovzsboyea4tcuak6l7av7rlm864f1jgl8jpffensf7l1vfuue5puywtf8nba7i4mc4f9kel6x8wupum3xv7as4ujo6vnry4z69xcmljyzzn2kv0ikz0zm1fhgya0ou8narqbwh1r5gir3bg6nsel4mfpd072any3rvch1ntcq547hefa6thjx4etjomldi2682ii42iougr6oy7bs7i7f636uhpbxyhup3cem5kc91jlbg0fkwcoqzsvd5vv82j7cp3wpd1fvmtuv5dvplvjjubg4sbx7dgpn4j5ktc4auh6ez9akgwuqiizytzak5aza9g85sjrxbi3ry7tz0eqbgwlzs1g3meo4dm5kw2yoviy1octtkqhu7lizcnp4byn568u0t3bs7jze0cwrxzts8zcta4gaaa3nllr1hfecqj747m94ez9h9icqy9941roop2znkyrcekbjamuuipo9nd84h59l95xscbiqnnvnbk1l26a25t45v0zfbpctt54zl7xdzkf1hstjfim8m5gbmaloj83agk3z8vev5j03jg38dpuqe6iw4bcmgsdnrl48tpny74ts49kx8n5jtenmbojh8qj8iorrdoce5zkh3ly3mb2wuitz2oc729hhkqnc3i16bd9itx9v8o7zls0r2dxajvo5dphd4luetl24sy83tvm1m9xbt8ds4qpqqcx9sae91kmmfv25ezjkuaftmjwfcew2qnonz464dcw2z62bb0fg2m7t0yf04doaxel47w6g52bmln7yqwdhi4xqs3mx03ms761z496t8a02htpfbw0sb12sq8rmt0mkv339i8eq7wb6e1h6u7m4znfbienjzoroinxrpmo0uc72vz4x60v5jk3e1zeb3bulseqf771tyrv6bptpo1bi5d9vattovrw65e362ermtofvsrh6fy3j4gqn1cd6c9a2ri3hvo3j8vq3uhg7hg1m9i0wc3du8qj5vgv2b4sjh951h39ae4upxkm1fd5qg88nptpkpmp70a0i1yli893xf92rbe7iu1ntgqzul9c8ogy2h3bdbz6clp4h18w6wlzpd3j657l9mj55cztohhjktkoq6md9s6lzc0my2ct5kvvmtax5ou4u9tdm89fj9l8050v45gu44z9iyaz4agdjpe0r4pqrufu52nty3n1qcsel175th3nxse4121bywwcubexdcyu595eg5nnrohynvn21nbj5rrc0fvjx5b5870qrxn2i2xq7vhpf8gm57fwoeuc1slzz69bx4nn8ko661aja6dw9mckymwytre574o1apy3mqb1u0bgi1wzx4mm07rwqqxpfphx2ekb7wcd53xwgdykb7vn05qyx1pfb7kk3p1ecigt1pm81gydmo3wb83v0r9m10tyc3ccjq5jlvwfmq7thwya2u3fu4bzn8fyd6p7yvzpv1u31l9dtijuc3wf6abmc65l6p9iz90bzjolmqcsk8cmm4aox5xap7167bvfecld140s6n3b61hxdehxcpdrw3ra0uljo9icespbdtdwjfm1m5t5n7j6nzhon0mfmogr7raqduty77ips8ma0m26hgg7yixywoq3tq0p76g7f5os18atvmdye6d7pz9rb2alkfd059m4qsvz6tu3pvfg92u3w0sm05r7nfmizyld7nftqzrf884a3i89phr6rq2xvrxeqtkb9jpjwbyfhgdb1nr',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'ngpp7a9o82efj1fkw4u0ltdehygs5ql1crj3zb7vk1o2e5bqhm',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '31y1qkih833txs59f9va',
                channelHash: 'vzib1cv06txvborqa7ixj36gb9z1mslikuxoeeyz',
                channelParty: 'vvv550h055vjqze5v5tokuso2ql3teyzlzx2ujqopxnsr3w9dhxhhxw15ykpi2r6e4usmft6xp0bme4hkc1hp8qmsgvxkeantbjzzq4nm42py4t999bss6tavxagz0c7pj9n304jccqs89u6jl51sf4kcn4sefot',
                channelComponent: 'tpjdfm157sztnbnydlaa3f8q1zvw8nwkdjzz0x01md309pqdcvt7d2p6nxl0gp8m7l1cplrtuq8cwieqcvylqvg5fubv3owu2iaova9xpr2pudynd7jsvkpx87unz32cjd62iswwb2ebeouatjm0kusdzqwyl5ay',
                channelName: null,
                flowHash: 'jnd7ep5znodxql552qcnarkw7hk1ptls2zm4cs3p',
                flowParty: 'lxdwdb0xn0kp3yby7sy8khig05hhyezxx24hoodatri4yrfbc68rcj412mf7i34uiw3tyr37vdk79yf2x2ksjtdd5950l4lrzuo0gicc6j4mz3n6rr7auyc3b3c6ydasyjqaq6kvt55aoavc0n5iv80dz2051y1e',
                flowComponent: 'ocah392pjnddmris82bgwt5trnjl90aoc9wd9ohseoiv8d8c8sxdh5elom29x20sajwjdpwssfyzlk7ml1jn2z55r1e612gg651kfff88fpwzqbtt22c102afqt9mx6oqn3767120ivzmyzdij7mmp9pq73spkx9',
                flowInterfaceName: 'r40vwru6s1cngzjhd1s9br260tsvcafesr70o6d2tqg8pmbtbfquer9did5wbt5ndnsv4o9lpge621j31bd2bhvoslydlcy39itr7cew70ax3wcyjjtysu48enhe3y9ba35g4lhvizioow2m34pqgw60c2hktuep',
                flowInterfaceNamespace: 'e3kxkt9hga03lj921m48bhvivigmtio3kvo65ge52fo8dmmp0gdexmglztqq2u5vpraac8rck6w24bps8e29rqtqn3qg7h3r4ivbr3lcg1hk4nwv97kbu49y08978t8fkin8084ncti7qfn2e8b259qr5p9j6vgu',
                version: 'cfu9rfp4xjtvko6jaggw',
                parameterGroup: 'w4cnm3f5s5y82mr8stpzwjkqjkli9eu8w2kr7vvt1ms8py58vk19acnaybghiplx70d2277sgj9yttocisfihl0kds13bloe58040dy0v139dv7rbjksnpnwkn431uux8sitwu5hx78m6g94iiwf4aeeqvs8y4x9dz936q3gmc9xtj63xtls0y3z1oiat6rnwpkihemua9orbhkgoia4wxyn5sc0fnmplfnqa42pbrs218pb8p8dhx62nvouast',
                name: 'ph5ifl0bqw6pafpwnleqzc9gc3phweyr6y2i76hddjztdia1p1rkk7z0caulzc01zff3bpivo03lbn7w9a5ahvsd39i7cbdm5sygcv6f7aaaiutz9jge60kk6vefu8hz10zxkpoo8ska7fyf73mqumh16plzw6hjr186hnf9xtb3xdai2vd39bvf9b8j6bx0nng1580e6v47napvkqll2865poir23ecwxgvrm4p9rmx45wzsrkb0i3vtd1qke4t8vsilmhv1jd7hlnitsw4rdimwoitsuy8o3o90jr2hcp4wbvsw6nijy1iljh2ajdc',
                parameterName: '40au8g4a5n2776npgcnt59ix2bc1862t8hs7v9qu8l2an7zbjg7oy2354vimkuxpc2y2i8c4cxhz2ol59h5rxwpohdtw7jnvdpwff6a1blzt4iccmtvkivl793htoxrgjn1iiwylecmw7l7o5kmlkawwl1iyi6y6zcswv0qlok7rbvuyioeyv00dp8jt1eoi61j2mvgs1p9uzr5r54n7rjpv7bes6urr9bsit3bka9460wgijytkgxg4zths0swdcf2j5kbpkn214xldz2ywhdzhxx464xdz0lamh9pgpcot5gy77itixm3p6gwzbr0n',
                parameterValue: 'i6l20wrs75m70v2u03blc05gl0lwoih9cks8farl8vbrii9wh6lgdx9oflsigwh6d4qit5m1c9xafaiop84d0mlp7c24ugsfvnay0kaff48lyz6m7tmjjmgkes1re2d1pi7xj1dtp3801uhjppxxp6chsauxg8f0rzkb76s8kck3s67yb01gazyy0ylwd344yi67n14z47tczs55h0d87i14ek3rndtjfkt8wm5hsfbe4xb19eerll6jsyu63vq9z1l7h5b5wqgp586mz7810qf2mb9rhvlfn3spv1biwt2x6mqzda487825lcs5iufmbzngqagazrllyb8oud169rw5yqjq15eskw6yynpxdcefmhezz88vx4p9f4oj9w9z31acl7cdpk69zyj08s595gdhslqnr7sg8o6wyhlpu695f1eu3ou4pe232wtidnp1a6sb97xjm5bss4417ikex1bwm6niaw02o9hlbmp9lfe1tkgjf8ziqskd3sq9joiuvjast789qozf0kisae56mr2gyezq23swhmlyq1vo5ickl2z81und0wgnkw2vuycd90d5lepwmgy9vzhucuqnqaq7z6lqfplnx6up5uoq8c2cu1r2h0ury30dwk6qeytzcxwpzmizvq5rdopvs84ul8kije36xrlnn0xmfze2zstbtng9b55g25djp2ofyt1zcpqinfw2t5j1my3p0jeyt35hh0swmvaig53t8xpw5tpkw4f5gv5vn8oxgfhzsvee0a6l5p23khm5prjpx9qqgk6mvnn0yp33badz6wul8fvzm40mf6ni3fnhhmhb2fty7hznhx2jt4b19ife0l08a82gjdieo3wq11jkos6pvlna3b63z7z2z3znnz32q26zxzioaghs53lz80u3ehcvf1z1disbr6bne7ke6upz86ij7s4f4c7tv6fab8q38h5nljhzl6ld2x89k6bjvrq7e7viyudhzq2hlqzhuojvf8sbzhvdt0shiube8d6708vlg6ooa31vblf4gscgcm0qmwsn7g7xiji05vyhucydyvq2jl8bghg1th669tq2sw3eue6yj5sn57issp77oifvu4mmis7rgydzfw204dq0s1byvmj9ajzgr7yz5k78jetk076g15gf6fwqha9n6e6rrt3bsnr6uetrqh9jj17rimgns4sxrmzgpvzez11ke0w809ravp7yv08yzhtrqhkiz4iewmxmaw5d3obi1iwm0js2z39wn801xpgs170753mit78u3eu77f6jdrghta65i0zc76n1sw5b5u3lpqwby6kg04fk6ftgangsf5dz44nb8l8ai5cemby0vztv1fs8ctnkgn62mmkm1mjg6m5u4j0fz4ujfr7ogh0dxh1f7w1d4a68oexqxook46o4gvzhs725oxs0snpujbswsdb4td07jllbuiw24dgws2s5totxc51p1e8scwjbsofdgvx1whll8aowifzyf2mfksnsy2q63r1mfs1jyn0ftpywnl5ya5hql6y7clcm1hzzyksq37obpqonxhvi6e5wvufxxto794x76fng268b6u2z8j0258ibshxqmw9ixc465dp2wb49txjrb98czerwcczc68asb65hre3hm8j5xshon15bv040glq5mmw3nx2n79zifjak13e3glic6id5u7j2huqbuzns8bfu900wag2e0oigav9ck8eez2ozn183gihmlaclpye0w55r05smljrd4bdi3hehl6ealit2f4jqkqs1id8k565zqew9oio85gohiabqtwl6kuu61bjvs7sndm27pcxtcieib4iyu18ssjw0m0umbfkjfgxkz48c5ydtnujvy9sha8dc3oz37rjywo80gp7qv37ttbx013gnm1je4wsjr9buxb3umslxzzu66241fpadt736dha05n5zm8ncoz9oz3pzcb2ncavx01nso90htawjm4s8o0ti5eg7dgoyuf5l93h6r5lutudfiwit0yyx1mpw5hlgtavdhlcu',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'mmg16zoyw59x8bc6j25cc5ye03dzqtk4o0jenxnkze9zjg8vop',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'jt47pb8y4z2utyjgwzq4',
                channelHash: '960n3unymbwto7m8igwp384m4flypv7zewnaalzm',
                channelParty: 'u1kd4lvbfj6hhq474b4tpoqlxup0m4zpwtrgxvvd9hpms8y2ohbu3cehbcppv1ze7dcb5qv20hcg3jcvv87d847j9ervg06nctg2as2piu6zzxar9tuq9io6le6rqqe0vpro96l4hwnqr3np95qelmoiishnsy9r',
                channelComponent: '78n99pj4kd3owfwjedbvu7dv9kuosi5njkot6xwirvkyurx8xhaiqmilxe2mq9b6fafvqbcqcjm84686wfz42h6kminqkxj1uzoi43muue4jbfl8jahc07vpukdxiscgqc10lobv6ml9o8g5tazboqipvt3atm1w',
                
                flowHash: 'mzym8rf39p5a218qp8k3thc0ga2d9h2r9pnbjwee',
                flowParty: 'crx52by2pihalcazse1cy8qxrm48ouo8r5fui6n2l14m8tehest8y8m5njqieh6i6qcag1gy452aq3ovzu91tyhtd832j5jkiwt9c95izqviyxhd3rhq0hjnrdibaohdm3f8bzqe8mce6d2vnmdzz0lwm4g2b8vj',
                flowComponent: 'xqq00ho8uncd6zf6sor6596lu2dcalw6sdom77tpblyjv98iim9x492jy2dauwomo24wvwm740butpl9s92m2c518awlqflze70vyz4n3rul4rsuuxacda7fe85np8hij9pl4yr6c7dzbxt532sodxrk7izgsrbz',
                flowInterfaceName: 'xe16xp8dc4sbipa6m4d5zfxk3vrpsuhd6wbx7zeuhb3s7hkc2g9dl0mtk1k9vbxq1qcgryeo12j65byv8s5y2pyae2btcztvuo40ogcbxixnoi1q24xdtwhn2sbmig92wjq3obdskq3lbdvx4o7pyiyhqijf8qfu',
                flowInterfaceNamespace: 's21x10y1thnv3hbay678uczslebacrraptef9xtv1bheggjqg3amesepx5c2a9nc84sz6vb1ef4muwoyzsws6prh7y6rxev0okx33nmo2d20f7qf5wc56hnpz9odu2m8qxn52c1kg13vpq0tjxg8vt3zgq7mwrq6',
                version: 'n7mbzip2uog3lmy8kf1i',
                parameterGroup: '3de16evk43fmgzxy246qew8jsj1nuyujh8l8lmo87cz6gika57lz0cuyl2r4zsoxm8o64hj4xx4fkxflscnzrt4l3ls7lcoinb4so5bpvppxhocfhqgt7lkxztoj2lci3i7nv41bzbk0mi90fkjyr11ral6nv5q3h2rxbnmqg0gj6j0rj4xy9ohpq4r817cvxa5ijrqy3q10ji06fppb3k2qvofqwlc72nz1om90w343iazmg6ae9p6yr03b0xt',
                name: 'vosv2u5quw3up76l3j7krt1ysz9itud34j20eycysxkdqopgs66nikvagyappjjd6u3665qfjse6fodt9pdvd39be5yndxxjnb4v0zbetua25fk7lml83u6dguqd6zhaz211jbzc4djjzkkj049ei7lqjdnzql634ns067hnxs7soefyclc8qvecd4ww0v3dan207crkq3czrnd3o8w3ujvwx8cgnqm2anq36l0prwd2rwbcgc4s0zz9paajzucygs9vhwke53ylae5h7hosvtkjt1su8l0l102psl3r6nzsl96n61cppn8bu2pjgpen',
                parameterName: '85ylhztcq2k5u71jihh36e23acsk0mrlhrpk1o7shce27z61metbtq9ww078nf7nwfxv2hka3kuixywrfue2kj13zxkqaubjw6lfmbyz8frnslobcl8xwaxnokfd47wvoahj179ao35g090ss4b97dgh10vombpvpheklhlgmog712dw13fem2fqtviicbyzdomm0z9hx687w7oljujp3gekymma4sykc5a5hqj5e7y4kpgk5slgbq2fs0gck51scathoqg9qek42drpi0lxu2fzvpxp0cvrz0k6onoe415mz1ofw4rompr8ggiqpjj0',
                parameterValue: 'mlvetjlfl3y0210nam50xaj5pk1sbtpgi0euiwtloeaj6x62ho4arqr53hxa180na29e1c8ppnkb3fgbf7tn20fvqv460gq6r8zhccqflf9mhxqjsmnx2r6acaxmjfim9y4gvbmuomx63ovgus0s2m03zdfjzy592d7qmw6zxsp0pn63yynaw6shpy9eqrfwr34th6j4iz9uw6ilk9b9lq10hxwopjqucef80eoj6ci85l9pfsq3x9ke02tnoy5a89k54c6p5v24mz3s1isbqqjam8kfkup1x0pmnulbkzqfgxvto2jav9e5sb9dugifcjpa897q54vel459my4d88qflusy6tw010ta2jmio1dznzadn2181wemhd1z9ekifwevqwyvodezv4rqx7p76ual2qclbvxcjh8sb8qrwsdpsvaij84fkwaoortqo2zdrgy97prfqym9v9rfz42ovyb7rlteds50xk447zqshjzyaupy4f5reyfojvittquxcpdywrebqp0fekie4mnihcw42yyx0f5qhyn8o5l03a661n3ehgi0n7c400bnj1hm9xyls35iko9dcx6r2187v446vs0mxu06neblnm3u9sqg1ywxw9hxuvvqm6d1n0oxudo192xxz91j26nlsd0waw7nfvpq8yu8gdih30kxbzocxyg4ka0b6mbhzri0fiiwc7dux6z4j7wj1kbfxaqda9scmwcmqrxnst2d433j9awxo4yvzdkd2lwr9bn6whhy4g47h4fng53vderbb5r224ljr6o9wql2m6kx4hk3e1i4bl7prv2v9dooh9rc08a6l0kbvci21xs77s1u22zaq4ro64aay1leamtdc3p4w7hu6qxv7bt46berc34ceebibquv5lxkuyzaj21cbhoalbwcoeak2uww3izl9xpuljapx5trul4tpwuhqt68ypquesu5crnh4o16npswl2ez45kwehvhxuoeokzel0ro0p7l8gex1ef8dk71nzxcvvfld46qpy5u2zi9epoj6ii7esy5o2yzqs3wz8ps14oqpojcozjmflct5rfbekg6tdw2w0flzpa3ulijjbb2kxubwnchmz3tf57r320x4p3epj50cqjmpa7e7m7n0vcz9zd0aghhy5skpa0s44mxesur34k40vgt1fxvd3oi2oqa9uk0oe1nz56rirnwsw4ep86x08tx4r3zijyn1k8cd39dwtku8hnsxfz4mkf269856anl3ra2e7924qdyw9fzjre42ty98np9ytj93cy23if0udx07se6a9synpkg4iakk0nam3om4kn5jizxedx13l09i4dctx533j49df2et0vlh8fs553qcf92vqgigvdibp8avib1zspt8dloywgr8viipukk58xsv2mn2ztq0k1kpswk82b6s8n34spipqtmrrcq3mlbragih4km9749d2393ggea6lorjw8hofsb842sxtf4jizqsgido8lb6tn4p9yni6w3sc7hahe715tzy3ikhcgvhs4c95g7x9fjed8yzozr69zgie91xhu6bfs4n59x2u2nc75405b3o5uklwy93spvq9wa2220or5kejj5hg5diixgw0w596dfm4flc0wk6c0bpr06uoesmhv9d5uhtalyw5mo1jixx5ji6cynv2u4dzdv3zczx08ancjmsxwcwoq30iw0pg7pe8uiygb4p4scvlhjr6avfz46naiakllzkpd2dmdx4vffqosy5g6q5fy1y8s9xaii9dhretksf5p65tqifo19bea1ct3xn3slmqllcc0m546lqvskbymkiw045q15iaw4xndxa5en392vqfvhunhyvedb571nddhssfhbcy6icfiayecb69b1hz8kz1uaiachs1lc9u4tmj23gge75u9rvk2px1rvq5swnwbah3jtdtt97bpky2s0tr8hszq2ugh8rgddslg14vkmv3ndl30bk4vu31s47ujqkridvtnaoh7tkw1112m5v18dqxtaodrwrx924wf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'ycc6qufnepz00lmuu5bt30ylgzefqyaikyhqkw35pvro9z1nzw',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'bhccrjrfbirfrbkrwny4',
                channelHash: 'ej6c7enpxu5l895495wsohz35wpbuvpyo7xjr2t5',
                channelParty: 'xwpk3bks5atlb8tt6k43vtpgamza98eocu5672dnlxdw3sk9oyn1fpho1mn005z34dyftl2f73av963f5o029t3b6pagjc942qol7riuzu6yq8o9j93g1mif8tbmso5cw6uf1x4b79kepvr682ynnljntu6408ti',
                channelComponent: 's4vhtl9ipy87zrg8fjglrnhn7zv6rnr1vg08vwczdfbgohvhoc9ltew2jp4oboz8mxyzqe676fx951xy6mnhz08xmxzm54372hm9opxivgne2xsvjmyfg7u5s9fcqynsgo9gn38t82b3wyvi91gletvhwcogainq',
                channelName: 'c0cx59mqav8g2vmyll0dlvcpabo75dc32zqt1n9q2fhqg10y5q086qs4gw7hmp5b9hbe4ze5f6p5d1or9cpuplt38e9w0glafcqbnhw8bz3ak3wnwxk6z7cge9v0v29ieunozp9ivv5lh4mk1qvosjv7clbc8klq',
                flowHash: 'yd5pazafq4gnyzy1knr4op3cj9qh0ngvu9gwbp2t',
                flowParty: 'w6mdqtunr3ji9b2w4rpp8a8b3sqlsrxccnhq5qq2drmh5xghcur3u6jq7lboelzcclx6xqbm3ys5jgts8da4g8ec11rgh2elg5bnngsjtowux8iler7g15709my4w9txhl2taaaj91826jdrgz4yamcy50dydr1b',
                flowComponent: 'ner73eogpiw6wfnz71okbait1ej2pc37s2yejs90whmmh4190j1xkbnp3folzlmzeuzux9b7ns2c8lrq6c1r2bxvgvdovt0s007gjwvg7eqe7fg01267hkkvm99763pu0xyqwc454b11kpdmn57prn5akxfxv0x8',
                flowInterfaceName: 'd4ltwteicsrgb5ab5cjhqrfp4fjmxw51ye2ugo4fy7y6mn5g8nvhq77ypat3ws4zhwkc3zakwzs0tl9f355defgekrt6wpxe7r3akad1b3ss3c8ebs222uw8q2y5827ynemdm6n0zx7ni4mx95lggyyvkyf4wrzl',
                flowInterfaceNamespace: 'rkqw8n3aopkm28yhqc9ew5gkl8ymxf9g8slg2h9liylwejoogi288qhbfzkm5cw3gde2pr8q74nriv03w07f6ybsa2wak34d13himqa2dbgdrzb1ual833f2v6u59w6462vzvsab5a8ii4scmqykh0ezjoam0mmy',
                version: null,
                parameterGroup: 'flul1rhzoo97gt8ykos6989crazcc7cc2r5jpibfntynja5m3b009i7mjyzwh6qbjdp714yflotj8mdamv74janm2dt44jja9xfixm5zv10q4ha30uhurg5dwjpm5ajen4wes1lqr3w2ru346g0y2r6c2k80zjz0y407tv89h6zlx8pzbfpxlactsq462g0b7hqdecus7meuve91ls06nf52sbet80alqil4z5zucge1uy5wwr97thsse7vq3rv',
                name: 'tc2b2s0tcu6ls5yl7f7k3vdm69fz7wj0r9r5jvis0az68lw4q2wrk5hwpxldmnm4vi0sr7o9qxv0skp0g4k8sfo3ejdsomf1p25to75pgqqht8erawin85ckovcmdzrn8h4porulfohkcng6zyqbqx3nd77emira5f79z5sasfqv930yq4qu2gt6b7fr7w78md4pbvkwyxnju9gpu9abysdq1azsf4sqx081baroequukg0r46kx03dcdp45zii7hrrd4xyifdg194xguxx3k46ivp46nuvu5rzjm2tfmgp6zpeld2d2ho8i72mmd70a',
                parameterName: 'k5v0vl1pah6av43tjejjrdubhh5adub0v3342b3tr3d4ocp7k0kbt9mgoxvgknpt0lreya98x1hc2ozk5ev10rnb5azc9v04b8iv9qwydv9f34aex3ikgqraemugkdme2jg98a2ypk6xeq7sl03dnlupus9iler9ya1vs7k102s06201hl03zrojehyznda4z2cb7uv5a5dup82zjhlgyy3yeunw27bc299qokqk815ifb89wwkwm7nwyc3g1cx9q66ett078ms8s5gv6bl242dhm4q8owi6764n45z9h2iz85dkua2ks5v3weltv9ii',
                parameterValue: 'kmc45imopfgqzkfb02bq6xc53f2sgn4tm9hdynnjr0eirnr8mcdok3dmzbkxezkc7yla0ojw05q79b06troyl17zz8m3wuiuxb4nzcmmv3gj8p37a8untwo99rewzj9yqwic3uuq1r2xbzwl80nl9kj6dmlphu9cjfob66lowvdwflc2hh1hi721zcyp3myvlrmsxrb7g4dbn70aji40rt7fziu5w9auy6tyk4bb1ijse96dx88sxo676vhuoqmntb8glie46datawhr3jlz7c2hhm5w8tfgdok2jltxzawlo5jci7b6lededjpxz9qe5yejobpz3qyjrgx6kmuze56vq61e8tx250atdti52vl4ob23e4hzewpewzjt1vgcnrk4u6ryfzvhhezc4ocwn0lb14lh4x32tothwo4z5d52zc93kb72n7gl5yczc4rq4cm65qoszzuptir9sza9rvzbzlz5dc427hwnm83d2ng79h3umoyfqk9iwkg8nrwuykij7f2bdvt5tqujmgxhdijvi50cs5s8kgh7qhh6mw2kf2kkzqi14okziyma2kxmhm4jdfwg5x24zad5lu68fgrr5s649zsbk0bqssr9sx6zmacedfiebley0hsf3pusctpxgb43cxfz7w7px94xdep4n73fh4cst5d0koztetgobzdkfzx7110k1kcbrl68c0a82rf8o5ewocg270bn5f6v6u9adnn7tdeez0d67jf4e39u460qff6ya9lduyq4wetgame9krnyhhv7j86bsota2grxbr6hfiwi5huemwxjdnpelxjd0i57xwqupod94540sfwtprfj80db4plw6itolfnv08dbacza974qbbjsp6lr3nveb3q5ivh46goj1pnyxapydidoj4bsbwiazivw613lhrb6dcaem2ktvzo145sggyrvzr7fnu2mhla0ou0mfrtrjiwyjv94i2evwjl944vtpr8029d0pthdc183031h2j1iq08ymx6omw3hl77mhyk7d5vwmntg0ye2uuigb7fxdw33uwfgb132ubszfg7mbdjeoifq2ejmnqujh38yqnqhhpokbz5eoly1d62ctv0zwx91lkpuuijd02tshl34mxj8xorc4jqmme4ja5m1w0xlrv6b5wm45g5ycc493k39sxz6qapbx3lwculu6lizpma6glxfxw390t66tyvn2rfo4ocr2gwh7gj1qsd0n7ovo4fhh2odllpzykbi58t3usw215ywejz3wimqq1bhsfwl3s8sp9ashtk11tdn4u7ugfxwlrr1fqdcc5lo0e3gzioz1xudztmmiw0s6t19zrmtv1owncku91vmqf0rvf8vr8np5i17hd1pbr2nyrqcid80zds1co9l1e70noc7zp31iayqjf7zh4otvoua6zt17qrc3yz1yk6qrpn81ipzli8c81a17yw26d8zs0wfu70sf11s94o65101rzf48g4qwcf8z7jz4drqzrqtgjd9lzsock507ca9lby4p4trutgufx0kre0qo6kjbfdluz4n84ae12ibfn3v0x88a2t8w81whmaua6grmqm0anqyb9xuq989425hta4x4owpakr8koa5jdrzn928wa1nd5jyao2kr5l6uf4uh8972ii12l0yvb081rb7ktkkgj5o46hfm8ie4zdiskfay4fuj4x48e4wplq3fzglbz549eku4fopkb1amv111rhp0sq0sxrckmnnf7eakbb6768c94oxis0z3cc4cyquqljkfs9y27jd0n8u2fmp5uribz9u30b7hithjmbqhmbh2cuxsvc8zjyk6ekvko53zdg0ukp2bg2fpo5ptajvtoynpg01hnlps6aeakzg2gz4yiiqbgwz5e7grv54emqeui8nfyvcmyopem8nw8h5wv8hlco3j1m7i59tyovatkks8wwy8gs6to0enq6js54w2dywx08psz1sbc8181lgi927z0r9er9cbjduqqh3wneqdywq5q7rbka7zkfa5twstj1v',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'zy3kce7tslnaz2sfub2247n8rb6g5qzzx8n3gzh8rrd6amw6gt',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'rovq5fx8ainsu4c4hn8i',
                channelHash: 'i672m5f5l2t8nznqpi317atekur9n7rhbb27k6q0',
                channelParty: 'xopn7non4s0bvi12r85e815doomz6h7sfyiqsd27m5r2xjji72603fcejyfajlw2p2hefwkvzkj2blvo3njx0n38rtlxrsqwsadcdq3dbm28mvpo486uib9rmih6vueogth87d8pb1m8t0maydph0ga4dly96mvs',
                channelComponent: 'vyp261yq2e6lreqlwpiqv2owuzn16agzkhionk3fq7c4s55dabt1lswk4izo3i4042wtwk9477xvz1nrpjf16txjdb995k8lod8mlxnv432p24urbgnpq0yqjry7fonb9fmra0c59gzunzentaz69uezz52mamif',
                channelName: 'n4w4lsq63tfyikd4gklo6g6peu5alxjqdtgsx9z4smt4k42f2xtov0msngik50cd4936rp3re8p8m6rk2vfq8gyfzuwuz1irjs8cp91f9e7s0l92g1pzin92xam6tqspa04u6duzhzitxpthaamc873jcrlyo62m',
                flowHash: 'iux2at2d8reaxth4libm4panroc68go6wkbwr6h8',
                flowParty: 'p8f2clbkzy6tscnshk04t1wty8ck15vitzk2nh9k9vsdlap34n2mde01deslmrv35983wp97d3vpyka0hwxuah1ig29qe7ri4gdtwgz35s6gxpc55x4h2djsmxmoe75y0m29l739n9usu2xgg7yfo8g52znooarl',
                flowComponent: 'h4k2rnl4kjahj6ruc6njl3yqx4w86lui8oov6blv07d0qrbqhaqnunfkfowlmebnekt3fu1y7742nkna6vluvez0jztpijl6ebpa85zbm96wvxhuu6zlfsyps1itqjsse1davaakocbpubcax6dwgztfkwjtvoho',
                flowInterfaceName: 'rdvzjx7ztofwqbcdt4k4ge7rrbnwgaio2b6fnvcz558t8ux49vkhozxwyo7qh2lkktsy7ccrflrwe1ti7e93u5xdnf1shrf6igexq4k2st7m7go1rr4luagqs5vz93384u9qpnrdh4tdo5bnxv0bai121en1sq7d',
                flowInterfaceNamespace: 'ap2df5zj0mndwufmcq2mdzw0brsz69ks5nltokk8sw2zna1n5e6rz92aqitozcvnrbpz3ijgyw1gepwy9ei35psmrl9cv7sy61ywhekud89gi5llt9rj0s6dj6q36bi41whokglyr0yxnpyvd4lu0xk55ehd192y',
                
                parameterGroup: 'nncb7tmy4yptuxbbwc7dy5nevie08m8zl4vux1lu161z2pyzqf7xgd5tyxi167tfsv3tatsqdd74ib0vx56lo3iq8xj9gdd0updj5puxlvug58y35wg27tbijmd29xxi70m2n1l7bd92m1pt18zprwd7sz4zne65vjb5mgnb1gsu00lr8tyzz3miuw6dfl5jekr1vtvgpeqxqn6me9dn03jfuk0j82sw224hwunsk5wb11fbl9efxjnntai23dv',
                name: '9646cmxvuyon2l7mf3huak1ybhd5kae7vh544urq7ax1v4vn9zn3tf3sbk73e8loe2z250lcy1yjjj2i09rg8coeaws1b10ytovoa142h0ujxyp0l21j3a4ym0cq3k958oi943rhpy8n431b77zigrz7ji8sf6t4nyd6i2v0q6l67k9khl9eloifuogv1aczhjug7zwnrmmrtf48zybzz3b69le5f3rkmqyxwwx95fpa5ed4fflzhfvsn0a3dh1d18e65heft6czyp0o6a4aq448xmvvogcuhrh9c7q9ixnljh2i60jdsh4kme0j9izk',
                parameterName: 'qxw6q07x3f8r3tv8umvjwqhlct20hl8zoxix3k2h5yau4v4jx0h5tclx1oaozy2dvs7eacji1jjfm532hru6x2dk8mkxrepy4d9yf9qmy65cg7pi407qoyxnq9f5lr2dadx16hmh7k148o9pa4lsrkx1o0le6hw8pknu3ua4b9qrg49s2tvovd9a2o4amx2vphykdt30snntc49anm4mr4zyalm8bzlo8gmak23579niwm0hsdgpt8okmfjjig6lgknbttok3f936wm6zs9qqfd2idlf0bof5gr6943d85w61f2aswlj31n9jf3lo1wc',
                parameterValue: 'dz86ahb8maxal5p5oztnav4mburhjwnv7ehjma3shi2hpqm47gq32425hjfvrm0bafyipd95t1dlqkcyiom4hj5ouskjzeck4amz13c7y3l691htj502b5d5aoynhgfwofi5gewoyi8pzb5rfrrnym5jraxcqu6hhevikwe0bcziokmvp4ouhg3zgz7t0jy04vjemas3lvs6dygc27lk4l6esp3yhgberwb9vsmcly7bnm9vmwa6gs2njoj2oypoloet29prujeke7tp6vmz40xcjar1sn87nls665ogbz6db1qtyh4no6fhk1hhg02hwjjsuq6oypyu8u0xfhz30a0i3p33uyy5onu8sp1cxdu2i04r7w73jazqkmpvu9iw1gpzr4tqs0gphxkvcbk510ycaeixrb8pbcdnlbe0f5803wb0klpvy5ypke1wz0z0l4w597woan94v5jaj9eik8rltasof6v16pjtxi6cij4fna26371h9muppn1lq40fjtq8wdx4occxdwaypvwc19cxd74dstj6bgvwkg4p5591nfkkcqk06v3iopaabu1ocepfe4ibg0hkqgnd8ma5uhz8dvemj5cfgzwdrqsrfmlrmrk1298jowisfgj18m2919wxcdx8h0v0ay6a129qbn1eodlywzdunbxuzbglkr0cbr2j7zhcp44e3x94f4nxqycntkur2zfbdrfljv5y14q11jzgdbef6ge8vyszdim3diu5ytfcpygrddksucflbc4hpca0f9k4chetvwf2ixv7y911dn06uya5qdcdjcfl02r2gcadlga8i4dj510drubco6sv6br2m291imh4pzjv7im5jqbr6ipjuiw2o5xtk8amyp8kysviwtgmcyzngse4b8svgw5yrinjuapnqk4ofzq5yiv7otpez0z45j0nzg8n4k0s1c7naz4vm0u0mpe8rjz0b6xov327h05b9l1lbvcm69wyuqh62iqm8xus1tigwde9q59dhphi77frkvcp63celoib2l8qo04x72o3h0sckb8ln80z3yjwtzvd3k46q1x70z0o0lsyv77d5j250nwlsnw4p772504qd5u3fhg7n3i5myfhgm0h7o583q8s7ao17u1h55r3e3cwxjwvb6csm6ix6pp9nhge5cidco32a9h5oly92njeyw1u85b0dch4u4v4iyfgl58nnq93v3j9qnxn9b69izf62683g1idabukkys3twfn1dfsxc8q0jbl8nw1kkw1myqnge7ywf0vc6lq972q2gsvkn8ftyqn0u5j6fcj51gspnulcmwfrehm3gdwknza5i1ftob1r5al3hklgg98pzbsyxj70s3tem8ej4k3qzx0rxrf9lf94m6ky41h9g7k37vmbkpy3duajpmv1ady7wg4tv2x0qalqttnsn93ytdylt2oc5glnomc06rqhgslpldi7do6hnzlb1vhha03qb8k7wbd58r45y5s7fx3voydgtao1nlvw6ld8ac1qztmzfry4b2pmpd0ymaqspgt735o3iu94xxjymspnpiyth7ywx2x91kqkws4y0lsl42iqq8s57hsxcie1s5iaupsfn861jt7we8wz384iz6u94q9w8azjsktenw9rg7ei4l2ac6yi21vutbwygece4deyevwwdrwi7z0b6mh6a76hz1432fjgwmobtao3sodbt41g615i8ozwqkwp2i8e8rxr9wdps2cxf2333wnc01b9tgr3w8lwinluijst77mxdjlmm57jhusgdavepgu7kgcbgqbwk4jw95siv7lm94xqi621gheg1v2o8lfx5frwzzku96dz4yq16miiiwzxwfczp5j3lhu97n82v7k4vuyk4o0m5fjbywzaycpokbjcitehz265hzr2o7t73rk76nh1pc9790x0c5lowufu04fy209apsqoje6a2c0cefoprefmkk18a2q3qf948slvrh716vkm5lwcu41gaufcuokwp4gi7wc9hsodzv0ifzeqmfntilq',
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
                id: 'o3o6e4wr4q8ehyb862id40sal0yw0xrm5sl6t',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'tg9bl4jnm4a970yu9wkrfqr93rs9eqa0wu4odlfcefpip0dvu3',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 't44yo9xt9oxr5ydhfrjx',
                channelHash: 'k905t4vwyow97oaa28zg4300z4p6glo3hfk2dkz2',
                channelParty: 'y0hk6wcql4775x856o9dcarvruu1o5nezkqqpm7eb99veyey3f1vybql2t015zhdtq2y4nyq43n60nm0nhrgsmt31109a3pmx5kftlnypcdwiy1wppovju2vb3yxg7pi1q3hm6kmbcqnjru75c5kff7g4lqrr4go',
                channelComponent: 'u5ujs2nvpw15k3mqukcxiwqv6io3onhir2rte5igrhw47e8drj6x83643n7mj0hgv8k5wyv01tcrxbazm6mwyskz69fp21zxy3tuoqaeeo8t9s985wq1yxlw6zohqyyk85kn2jg4ob7i650l00va1oa0mlhs97z2',
                channelName: 'o8e7j3y9ddsimf4wzw7e16t0in6cf194kjjdusfi8car3spvzlgv1w5j8oztxkusudf1n8dos0yhlamvbabjixo4vaadn10vzny4k462ddofi6oami9sbl7cl9ywu3u0qneuejxpp0y9saz5iqxommq4rk8m77ki',
                flowHash: '5lng0t7mpkjczseyuf77je4kaogmc7hdrdiazok0',
                flowParty: 'ougreb3f2i13jehu98qijgyn7kpq0yhqts9qob9k949ey1bpva7m2lmbw2wqenht0gb0zjbqwee7vjyj3m25hpocrxakcdpxokk24kakn05m0f9a4mlbd9lsv4idtw40fb8buxlcypruve9gfp9agpwpn6fcu7l7',
                flowComponent: 'q5243wirh5sc8pxr5lbat8qjlbw03hobz35xtcixaif51gld5d755buslw4z6lyfvp4mywsw5lkd6ppcjhmss2voetllxz2si755zgz4tieq4zxwske6if565kk5ksywelyv0japns6akdpy5et3z2ddkkbesbp0',
                flowInterfaceName: 'jzbgz422fsexjwqy2k0nf0x6skd2t0wxkfpzxgzl3kxp1m8uvcqad3vjkf6yi5vgj8jni82fjk8ehp501cr7y2tmkrc9jbrpvrkmmsifipv0dbnylo4kqvfhnapos45pqoo0uar4wfl3hwyk2v91ot368vuyv8z3',
                flowInterfaceNamespace: 'gvls98tnsnnlmjn4bgniveih706flwhewcv1bk254rp60exsaszzcj5k2wulvpn0wf60um5yf7e20cqhmw0ngb67ugurlafcctgxul0hhal7y8ki0x357823x32y559bk6k7yfcn2kjyd1uwdzepal306rame12l',
                version: 'fibgnrpvsdzfuf7j18bo',
                parameterGroup: 'fmfg4g9yenhdm1zddq6n84n1t7jxdsk52n54tiaco4lep7nlmph4bwnx4fnyq86etn9q83g2vm7omob55iahynq6gkvgzmokmhfzimhsnlv73bhrqrtxbn11mwtppo55u9jdx09q3h7n2n63crdkj1ogd8zmghtcezdyk8ya123d7l8uvxuis3j7hgm7twzfh79bgzw13528cte4s5lvphhiaey968i5ge9de0jynkz5x78xsy2jg01510gtsq8',
                name: 'ju7kpjjpsxes1ivvt6qfa1ukvl0lywe96g7c6bypaxyqa7wco6d146dqameuh6lhy8mulnf4rhds1d5zosb2zzm1ch8maz74bmomfs0f2a8xss7hgyu7s716d53bfd4u9yqersoe8147y8m7auxy5nrc2jihxwno9i8btky2653rku3o767gwfof4ezbwkb7w0fkcfgfbrhq2vpky0v6iahc64fc5k6envnkjkigrdje67d5wybdp3thxomr37kxh3ku71era796h08yvu95iq0sion4tiuxgtcipckawqxiw90n5yt92yn903adu75m',
                parameterName: 'vru2v3f2vli25dxp7mjqdipdyo9t2gi0dhpdhf2z0h6f9qu9mzsrjzqbwc89fsk6fbtkj8q570cjh07dmvyh6y3e3k5hcihs1al7yrwwdzd9o2pvc9c4f8q4dlx0a0o9ajjczfglm9i9qhmt9smbvrhvt5fxpgv943cc07b7ii4rncubsu3a2gcdsjq3os0maswz6fypr5nti3mvs674v6jcsih3k47ps24albai35rsn1r5fuc8338k247ysn785n2je0wxxvwjvhq1syk1433io7tv4silxsiioj65uf2tpi74kogcqxh7y8u2i14q',
                parameterValue: '9suz4rcaitj25np57cuqv0c4cmhopnd6g2ue1rhdjoho2li40iluvevdnemgcpmna9ydd82hdbsza364pav2491fqwg15p0edq71gjpmdhp2lumu919lykom3tshet4vm8pfj7bb793mu0fveb565373rs5kxxqz4eynyyerxm4e13iewcnd36dpkczonwvbn3sqha2gi6eu4kqkq4isbp0iey3yv47v4oygwcmsjbbzcsttpjx845jhhpott3xo6hvrurqhzciyhghsai2t9m3nrh5jhjtzrpbf09sz159yeo7cekhxs1689kyje40rkgif2szoyqh1t7d1wfhu09ncwz6dmgmruytvb031341q5lptfxv64zlef9frgk4temtw5f0yvalnh6w6huixahvvm1ri0l7d8x0eylwgtzjm3wuwz5iw1hh4eu2cnz6lsn480a74db792djfh9qsvvdzowvcbdp5ecfnfza1953ce6a8g3760txd31bqoxr6at2yddk81zqr57p81zprfas886s3cmxksykajzvxy4sjtbvifbod41tlr9qz2d38e2wpdrkvdc42kpyeprmjrssllziroy3t5ap1gre5gjypc8dhoq3dbl4khhtp9px7flluiq9kkwabyfjkewt6qix7mn25g90xrs7x1dgdzf8a4wvz3bupu3sw1q72yg6xxxuwcnmyoinpbuuax6ca3ajwbwjnrf6633bnzw98ogc4j647punjgjfqcbkdqu99lkvk74zwoy757khgwiqrwhpukvyunmqqh0e0box5u4fg6pb51cw9iwinq46eennc2n1b3xfxzq6nnmj007ki38sdyy7agzyb03v2hhupbpu30yqmcf1eyhbvkur9ir1scsothhvkmlyxpqq4a8y70pnibicas2p7czw9mutzu0zgtq29nchh8r0dzmlp8m4ehwrz6ikid21yah6hdvtj82kwab30ljthi3imzfjvobprz0c0fhnbf467lyalcecb2jxzgzwdlk23q9mq20bjbtctk82bqdolnxixbn8crxdvi8xgnic1slpwal81db3nszswdg7ojtrw4nwvy11t8u3z03tfr6nngkwdh123rxkceahasorjw86dvcq07yxarbzcxwx4b9gaeyh8u753054t6t19p3joc2g9iv0b7bopb0mkgqstdb8qafq2ipprjsuixz9qqmssk7jj3i43fcmu2qytwu7sity17rd26ugm01b1wvgmzyludv3d9aomp4lux3mtcltr48281ibpjj532ne99zmjp1l0wz8cqdhrxrmrl7bg7v9o0byznyluf6crpj51tjwz6wru7zk0zer60cmb8yfrlj97i5cxvns4i12r710ntxlfibowzfhsddfjihl9jil8wdnmhikmdw2xw48wmw7tnizwm6btxe0t3djzhjbw7i9q9wtdtb9slahtrxmj1omgjx35s46qg0ectu0x6p3j992o2xvvddsuvybds3caa793108ocdyxodl4xsyjs3uuwmpmqhtnzs78hyfcghi5f4nsf4op8seyw1cg26n4c8tzhnfh3b9c74ndoq72e3t7d4ymbhmvfcdgyzlx7xwoe4vwz039ahq16qf35l1y1t31zmk0eq276ds696fmu2b02al62yhrlct0ng8sg1qowng7mufvdku5aig373pur8xyslz1i80q3xtr74bpcsokuwnsn8dfgeggwryaoxm8bvt2g5exge39g5lcjmrspvldbmilpmngax5emw28a1tci4lc88vkc1egn7bd9hmd63k2wr1zrqz4s45e4ap5ud2nfly8qpvqe3ifdw4rzqwu95yezv0a0yy1bz0s69mj4jkhywjkvx1qjzrkjwv8p03rn3xy995idb89nbqevcgd01lkv3w1tljhfcd4epnxk35qjdi6xnwri4kk62hsal66vyzvpzjbzh5c6cz024s1a4xz9fcz47c77z6emmd4t50pcx9lyeweth3l91b4q271uoc4y7fh',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: 'rgha8zczasz5ljkk8ofrpln77tehriv12vvg0',
                tenantCode: 'k6bipqv1qhu2z5izjhf60z48pfq24787easm2jdqlq8v3ee8b6',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '3ntzy31et2b9qhb5ashz',
                channelHash: '3gmpm221qhcj76zu3ikangxdwlagxklp4drmyauo',
                channelParty: 'yo2te7kagpno4qccb14zei23b8899y9w6pkeqbb18ifybn1vyitccada8bykk9huxinffpift580oi9077za3zjgay77teicl10e4v9e8mxopdgdpid6wzy3li109lcr9dozvpwquoe8asz19yjljd8ar5q5zyhx',
                channelComponent: '53hwcq3x3xuysxseh45diti07618pa5dvly504fvwej9bpcic7hv0699pnas5z1cni4sq85hveika2ube3yhkgn5wiwch0cl8axuq0ph3qacf5bwfax9ylbi38mpv9twuwmm4p0g722mbwg8dybgy1sztxmqxc5w',
                channelName: 'f5k8vz1jm1s1jpctj7jk8fen731kxfl4169m4redmo9b0tvt8jxqn9witml84l6bm23k0ammv0xvm4owmzjbacyr7dd6nsenncmnzewnd8utbb9oaxxp410dgk7l30zt3ka96w57pptrcucn3bb0qi56etxlvmqm',
                flowHash: '0lb1oub0iye07h0rfp23i4vq6vecp2npbf0458ji',
                flowParty: '99vp9pkewwl4lml6vtmv8ck2v2k78ye3asuziopp4upkg9uoir35gx3idiyow3xaurv084r35gqyi0ijvbct7695ky0dxfxecybfd11nml5l8340sen8lw3on3koieuqnnoddymhj4cdzlkmi93c7tcq2revw5fe',
                flowComponent: 'g3oiqbc7oxfimt6mab2sq9f1mbf1lis7snw3ce9u00al4yh0n4p1r2j9s9gjaxqs3876z2gekaepzb6llzhks1se7dxaocidzjt8b8tp2gn7kktmy4r0qj778zp3dttcunqemh7h8yfmedlqmfur96udscmockiu',
                flowInterfaceName: 'pg8v7a1lvve9iwe2v6s4rerrnqv30gtyb545xwf2nf0i4a2zujceedj58zilmuaexh7kbjj41xawwbb5bup5axdliq0878zw1p6mm10fgl9l412f3ivkc8ij1oy35v04fdb5mqi2ygjbji6uzm5r4w5h4u7oc2ke',
                flowInterfaceNamespace: '6j2yu5ghl4nwinuxpn35f375acv0fnyr08og5mbns4x6q47dkpx27zyi0sxzjj7okhe3nqvk8putu7zpzvc4205i2cd1a3ttcflczz8np51xe09e2tqzr5keaxswghkam2pm0yqe038fqgg5bvvvp7ur2xru8fax',
                version: 'lz3bn1gcz90clmrs6sao',
                parameterGroup: '5sib7voaufg0eylgtbvxlzf7hsdbifh88wokunkuk8mgm3ieidvsz3o78vkegqb1qpa00v1ycqdx5y2fzyxe6nnu5eezv72bgppf1svtqlhxgkg6qjz48l5xf4owf71ogd5ek4lmawnpt4ulesla73er0unjsk59amvtk7woc2bmtpvrjzkm5h6hofcqracy9lrtyol09v95eevr9qtuhapzyhjqlgoenhg2fmy5v7ybiibz2gpkt52dsrg2cgu',
                name: 'mz6ka4pjyvmglfx31uxn08xene5i69l5g7vx4rccowvpt3n79tygnmq9tkewknwwpxlnwx5nvx4adru3mjirdi3phekoq5lrbcwqlah9x9s6qysvj3k6ulqpw6ijomn08x28b2xxftj45tjkl19kk8zaz7v1a95xwk18owrav1uhz187ru25j1sghg3jzevvb3ql6l1tyaw8k9q0dfxacpfftawuiijw1r797jf91zd1x4dawelkfqizf8acvfk8uakrvsojmtduff3snc1tojanyu2ih9z4zl1s6107weu3uyqd1sh9n2my8n7uqned',
                parameterName: 'b5lssl0pc7psmnxvmsyujf2wajl6o8f6e3lcmhhk3vsu5oncsrmw3azy4hva70yk2zyv2sei7hu2xofmpvf5qz32xrumb52t6skf8yfj9qvgz1aynqya9yh431q3jczhcossv63ezvowz0qtczz4ei24k1dojd22fxkqkcmiwjx4dbuhryk7hff060v5bwtfjubhnonqwzxvxb3dbsy9yl8u0wl8opatu2vs5opp7nqcoeukgvvn0u2sjitav707ho2utnd9qenjeej9yh98s8qznc47ixrrh33t0r9vbgrr4logmn6nylui4eqyf18r',
                parameterValue: '87le3mcteb4fjyn3029zsymdvqxkn701mbk41bkjki85vyg0hjmcesy4alo24bu455il8o0iecavl4fi7m9uc136knurl86z7qi1uo3dzwbepze3n8bjksfdivkgl3mychx27e8i0lpbkklh82go2he975gnwo31ml00xg1pudibsoj7xi9sjsa46ijeeollatywi9de0ia1lrahaajhz5fvyljdtii2xtzquxsza0dvu1dgs9t6uxciiorszci4kf1lhzo5tsco09hf8eu9pcg00rxr73wil3ayrf9zhr6thvvgs0zir288jki576z65t746mvpzrlsfyk9v32o69r21vddpguuxhm1gwxjw2ojijq2yxyvsr6ew64fo4oebq013zzjnpiez4rk8tu5jmea83l117528np27713x2x51okvsgp2321hsra6x8qay95hge44t9wu98v7nti8drkti3gqs7dewprv24jte1n5gh2nmnabr4zozph6lag3qlsa3qesh6ude8jira8dlvnu0h8fa05kk21n97mjmw5qvd7asab0p9rq9d8bjaxjrdc01id6q6k902558n45tq29gjacls51ybpt9edg7iy1p1bw3jhy76o5bty3hju5krem2s2es5knonzg0knw5bsezi3flgcg5w84z1cwyyh0ltscsxzg6s31l8p465t88373k8x83y8dkzrby3p3fmg6ogmp9s8usq6kzay5oddyhqqahd5vcpsxobzsbji2iihbd8h2r9rrmykwankptsulqtna15nrtg0uy7dx3t645lq0lngy4hrndbmn42gh44a6hp2p19lvv055eavwplqtwf4yc7v1575u1nm68o49hpocf2fj9tgh6oo4xbrtcgl3h7hs0hp6mif5vno4qlvxca047kfytmn8ohq7mtgvqtqy3951in3ig3mi4qzxgbezr2e1cof7jjycze8x5g654vm3rfdytnqjgz8sbijj13gs3072dl4xjk0vscfy90tb1k6x1wuia4js39rxho0oa6egifu10hshuvzvgm7wxkhvex2cr68bwmjfze4zr3a084vu6yrts4tpazpeaykvs76v1pcq1gg1gego8h001xqoofjbsbwgdn4r6te4izueiopdkcyhij3d3tskqo8g3m6bfet7p62dsux0qv54b9i83b412c4ihh90y1cud8wsjzf3txr3wozjx2gowtroywslh6jd09ibkwrmxbmbebym8v4oweacfpn54khj9ddjhiqf0p9dekxfoocgyxwycxah2drke2i7kl927y56t92xfqj6h8739cmn3o3vds7csxj905zmrv1fnmnmid9ycdghv94fwi1w0vz9d0iryt007btlwox5ron7lue7kmgbm0legnu5aq6k78fws7csw0mvi0jgbyiky8f75pwimv5z5g0igouthhtrhvaxuhyfrywnwb5f1l11h89lm1y0mvt5g8u9xsufif9z0tref50ntos91fo9akm7lzic73csxu3t0831oma7v0qbinqkt0ob47ct6ye2y4uoz9vzewxostrv8nnruwfonbbt7v8r1wmp3lu8sp3p2p4d1015rlgr71k4j5ze7pd9q7u43wcdsm9rauy6urf2c80uqaoq96px6duj0ul49p7eceumrs6tpifsrk416rb8mg14c87vjdy2bi6lfeqfsvpaam0v3fj1snwrs9z75drao11xcerom1n9krt914bxdcfg9koamikpe0k4ij9gywifpfb3ju1f40s882h9whbcxit89i2d4beqrp9g8g3zm4o9w0qg2l84otd6ear84wksql85ik63tsx3b0wjjt4hc9f2uadjurjzxs2p3m8j629vt51hgrbqelrz1qpxbb1i71afn4pyltvui1oyi29i36go06mm268udr4yc5i4tk7qbt33pcsae3tn1uyvkse9rgqa8veqdvyiaomu4dzy24etoltv5kgn73e1yhxxjqc06563z28952c4gy6eda5z',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: '2an5im3iyjgapav4s0uu85bz5rb3t2q92gqp7ojzylyyr77mfr',
                systemId: 'q8f1zs9uge5o8p3f8j99jifl6zzwghqxomgw7',
                systemName: 'b74rcuwrlcbtqn1q5jtn',
                channelHash: 't79afjfgrujzkw1yei29wyaycaoqnz999n3ynyt0',
                channelParty: 'qb8r7lqec92k5rs8g5z1igo5s0og7xcpgk3auimpopc9pkou33fxmccdp8gdayb6q5dqts7ch7leg446mmv2js5i1gkvm7j2qpxfx5krk31nw4nktp3colqq0jn24ndsdm9arzijleel880ixe0pdzmiip22t03q',
                channelComponent: 'hbs36o8glne3gmtpz8o5qhu1hmun8omhwv3ihprgq14j1hyhlw522jwa8fcq7jglojsyyas9hla623s4mn11cl2res4pb3sz6leko0p3yp922rbxfez9vx0rszvm8dreisorvb7sh7ex5u9p88b5mw9l4ifidhii',
                channelName: 'kht1pw1if6ac6651gxf6czlsbjgea7oizhwdjzxtsyn56kx1un5h8yi8belnetsl2d40bjwmk7q9ortw7w5dwdaewxlu2ytxdjfad1dlrm8rj3b7qnsoe376zlparzrlzbsbj1vjxxjywgmo0kq9zfl9rdg4tcuj',
                flowHash: 'hj24socobk3iltr52ckvp1z89n3qg3uv8e0yf6bh',
                flowParty: 'bfa1w6u1729tkwt50smqsznxlnm61f1lfjbtual7y4c9okcx7dyu68a7x9r2pvc4l6nryv4iiwmr1opr3844fbkqvvg8uxozgzlh9xc293c286plv8cfij3ymt57f2x8psph2ynr818so6i2varf66lbgyjp2lzb',
                flowComponent: 'ol3fowjj82v3djytthy4hyh40jf4g3bsgqbsxt7htog59lzqvdmsk3dz137rb3p8cni4nmjy3fu7m6hy6gqdv69zmm4z46yu6mf16kg3yuo60fwj3saj02pa639h7wylx1g10hfos03iwe0mmnjjmsawzylwjvf9',
                flowInterfaceName: 'c2y5ghn6ujskcelp97g4mhqctz6p899qadlixf2my383onivrylvbl3liuujtx8haqexy55cdy6iykcxww2e8vpzm3heaycuqkkiqbvpn6hh3372xnqbs8hk8p9av0icswc8qkvo95dunokhx3mwofeolbxeie62',
                flowInterfaceNamespace: 'ueew489s13wi01tcyfslf06eavr9yflvugl53kvvn3g0by7rwj5l64mjimlosp3xuv6jujkm0i9o4pcz7pz72gszh89f1ra1li45q26mk8b19h8a4go9fx80qbcc1jgks5svtxy4ahly18y0antr974objhgkiuf',
                version: 'h5bm3dxs1ifcpjxxpndd',
                parameterGroup: '1a26wg4bfndjofpqx69kctskmmpomi5hjazyi8ojupsb8c066ksyf0y91sgnra8tcdbzlrq11ufvq7galopppfhp7z6jp5rv51ai7dtmi9bqeqcmp1bx4ru1b11cnk8rppobknzphwgkb5wgtzz9vx8gnjzx8qheuibzgl65gqpt8tvfwrj562o207kt7ab8096jx9pwjaiem25i046jdgnt4fur72gwt9c0pocbjy3p8ud4n763z3xmhqc61nl',
                name: '3nr845h2z3tam2wuak9slzbm078f97q5r6bldg3ko53jvm1b499t9p3etqyr2rlloulsdk0koc3p2p2jt3ooe8xr2pecgk88w9uy44aw41wjpslhm377f4b181zzg5flnuysshpv3q2u46qk9wsccl200rxa0wozerm2fyfin4903syotcjl0y07gsx5pj9is31zj1fnndtzjq2o99vn74pe0spbkio5fep42wtq9o9rc0ztfs1ewhyrdrqbh8kl15941kb8hrwhdu6mi6k6td8p9apuqyws3dnrvrdwdzfr6grsi1pgt7xcdef4fcgp',
                parameterName: '7grhk6box63dr8fmgey7da1m3b5iu1i9xdnc1v9sze7obecw1mgxaos49yuyeu4zkln0gt19y3q4xia80jgn0qt77vtukn7ns78dfjwme69id1jvlelmmgh9zxakt6pjenq96yapptj2gg85oaosp87mh8d8b0t1ftp59cdbvj3hslslw4nbmiz6ixzcy7q77w75ovv07b7p8qmm3oqcg7rtm81iatk3g3wtjsib4mymhsbi4gl3nvskrtldy7hmgsbpkh6z1x356f0wu25smrpahhayo6zvhszoe7ib3f9oh5g7nktyfjmjw047z0jn',
                parameterValue: 'oa30yuudw1cm9j16iqfwi5r8mcv6mv0wo64yt8dirb4cbv461pz9ythps9m7eaj62imye0ztaq9d48lv5l4mbg8cctebbcfeetofuzf6rk5x6x7ynq7bm7jd586ccjnje31v6lfqdee67hsam3xrdbgrgcha3q65bah8n3h82347c5d7ypzl60b1uk3z9mssagfnsd8k3fqg6cvr5oo46ynrpxarnas1v8wrznhnwakscb1sdzdyzbhxyqkm4oibm20h9ke45tjtb900a684sbxyyoe49a8iko3p7ak7ivg8ios139iec15f7d102r47e54xyq2l00jewjyoc96uwfixuilggr6yob7ykhbmnjohpp96qihm3v2iv7goiruknsk84bvxgezc6fzbt2yd2kdzkdtlycphk9b6cbu2k5zgc8zzk7ibpxq3b1y6xqz3su2v1hmw85y9umu2hoe9ikfrhw2900sn8ebpy180iolxipmf5m14r4wd6uluyea42t157nzlnwx9tuhqavzcutao92c2aox9zm7ow1r4l3kcn00gkcs6cox6l0jcs2t2d9o3uvq6e9a2p8nxqyq5c5z2g0x17crgltngmu8gu10ituz7leccwgwu279x4nnyuc10zgt7exwee2k08cwlo41oq0cguio4hxp6z4uhodoqi28446xwe7yjo8iiua9095spg8lqoeyk29mgnjt32qxk9xqq2abe9hfs77erd7sph7k9x9aq8pjo2qi6az6aycvsny88asjmkzn11qkza3bxyl94kohozlmp7u8fxpyuod3q5smnfc4jzgye63wlhpvzml7121wc8jzauft0s96gpeamk6l79mnur765vds0q3zd3eg47smmpqiqekdt2mhxsi19ctniny0003ex6xehxeholvkkvjvxpax6locwv9z5oa0vrvodspehwozz88o4k4vi7kd5iczd96c9te1j14u22zqtatsl6bmlf1gnag0on90sqr168xaso3agzvtntkv5s2xbajlxbgnqsdry8zref6gjh8e1cgh9n766wne6z37dwxx1ijdopq2am7j55m72pejkhpivdoh9s570y2pkqoinotx0jh9ht8qs3l0j5gs1uyhsqwk5cwtohmdd9cgrdy5gwei60vml16reuzxtr77bo73lnozilr6nqontluj0jyc6jgiwtiigtgbx85zkc2ajvytdii31i3pkxds74f75p4agyy4x38xag52v2clcu0yr4ztgng3e5ljjt7ng4sqox66xkcpeciiatp3ca3ikt3xxgasj96g07886ib9hi9s545dxymcylqbbmlen3wct3f3s8k80wuivmqpas6cea1uo0uxjhlcwcxuyzcmnay259me9uqml1d9o8t83iptp5iy2n79culehfjmw6y46gnra8cfhjpbbpvf3uddaj78xt1lw730u1xrg208rszmsg8xossamlx9n3s98104xk6zce17vfcp5304ojttvj12xc6g5z7dv4urs06mnk5egj1dk0pyk4gmzygo7wdm6oocigxrdr1efc9319l3wxkaeeoybmi050vpt5gkg08spyrsgr7z7syabcrl97t1he181kohjhhzpydervsbhohbc34es798q3k7suzr6g8kje6fwh52eoy6fiyd57zzs2gpzk0mozy4uj6gl0laa55avsbajiqvrrziimgahj754dijtjzq9c6hnfy26h62apwc6lllqepndlyurh4kp37xfdywzkwss26w9sfwavi8ja8n87jtjmeghj9smrky8tq9fxx24o1589bf7jdd8ifzs447erhg7m4oavw1j15196m7ey418l341mnwtkx1q0mj6zpuzued5pxqi8gqe5simvw32j3r84ci8od8nfdc4k1nwsrkezjf0t0r4namk9zxwijvouzc0k6uku0ucawko7i5jokg251r3ltsi6iadrcbq1yhglfh3t4oevhhhijtl38mvnvbud39uwy7ibmte0nzx9qou',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'cnudcmwh3gxufpo16kug7rk3mgruhwz74nrh9tnbypnm5k92r9',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '8xl1si1d7e4nysfls5m1',
                channelHash: '3lu0bpa92fgtuwjo52ogfwb6cc0g5q3mna4227k5x',
                channelParty: 'pkfnxrj39zx8m2wodrdpjiaepyhsnjryg6exmcg9qiwspobureluzif8xakxz4svkcbc65f89l1ts8gu7qaku8e2adgdd9t70zmawczkyyrlyi2udrqftlnnho89b57ux1mpkj20nlxy55o0ffqebq0ej1tonl93',
                channelComponent: '3b1ex3q47sy99ocveo2j751krathtvzs4fmbk1wrhtcwygals0n57vczr2itm2c3wjqno03o3x8l7yvxqnl50th41dt27i3fo4n9enyxtegh8q557fllxuncmx190ism1b5kc7miduh9c6jmyl6wk2syx82i266r',
                channelName: 'czopf6vm5oh7hhkrlzm5hs8uti6u3eqlngo5nzp91gbn8lnngoshq7u67g423n1ka69oxz3mpeo0jxl6mzuhzbz7kphogpyroqx20tpjj8jc9h8tgxi738xt7kbka5woyfq94sex2auuki1p5b38whq6ummf12l0',
                flowHash: 'hls88vzld9ro2q2vrzfd0occfr3pgn51xwghcm3x',
                flowParty: '7c3a8n8n5pmxnmg8sfkb7dc097wznajksa0rfoprxmmwygewsuugcshlvg5sv0y64q1qw3z19tgznhcryjr26nucjwzw9irlx1bqlqpnnxxsikz7ygft5q1aoalpsenzrvy2qrsaf2rzd6y7gnaiag38cvpp99cg',
                flowComponent: 'j1y5nl3v14yxh72x9iptvezd3ap2qmf25msyvlobbf4o03yibi2ud14ypa7l3r7s4uw3dc0uzvgoevgjgndxi8mqwmkrfyhhcadum942230qqk86dwkcad4b2crdj29csd63mbiioq5n7gr8hj63k9ou0qwi2ri4',
                flowInterfaceName: 'ctjbyl1htsx91752ryb2vzysl0c1vumacukyu8ybf2sntokc1db3x3t3n7560cxnbfncgbrx0h8i62x22rxn5k1d3nhwrz5mhz4cqrt9rigrla7w6pnksvmt2fkjlb84ayiy4seabf4ofly6lempycmvg72026qe',
                flowInterfaceNamespace: 'xrc1z6jrvy23zqur5bpnq89cr0pqc0b9v1mrukeceqqnsioht0mciwsvwsa1hpat29xt6d1gxraqfp0oq7pcyxmdxfsobw2gffuwz68kppuufb9s3zu2oa3dnea7rri64ka000vvr4p84rjvlbq8hd4qajhp54wi',
                version: 'jp03jil8h1lquh18d7lc',
                parameterGroup: '9z7koi57uz90ubp1j9jkz5z4173okeckii9xtk77mhgx9pww127lh0hgxkt9p5r5ycaanypmyb0nrmchbjzw6ywx1gm7x1qimnut4v25tsmfert1hcuisxpljlgp1xi90e2nfvk3bg81tj4uageimlytpew5p5izm0jfh7usi7keprwezivqbywutinhk1f8hkc7ygn5o7m6j439a9fkuauo8bbe1icxzitixaws1ner34queqtt5o8kghvdwns',
                name: 'hygz69vm65b446tkbjv4tbwwcu81ufy79rjzwkcdzkblak0kkb376hcu0y7fzqtmnfvtigudjzu0e8vst2uulyz1b2pwbb80vtkxzk6et4wnf9lf7nci54cvchunbyrmw1gnf59hgk3ci3m0asc9ooqs4py3nhh80obt4schuthapdx142ne2jbdxukchux7b0cjp3j4ek7foydlg3f1liy1sagrl38qes6c0i2nk4nvz0ypvj7j3qx2ey4dka86m9p8kexwckqnrkszcae6q3vvdab0wgizrvzf69d87tfgdy4sau5jp17s3ikz5yi0',
                parameterName: 'e9wcb9vqlhlc3v9ym2tta7xkiioae1np4qkntzzcaq041esqbc75yrhvfj518rckskk0fjfjgwg2nfzdes3vcvusxz428p30qbwm9pjxfsxuo0h3d7bz4clw8ky2cgjmoqq9rkq5z4eaoe1k3w4o4gbxxsu5sd42nghsot1iv4adavhewbcfokcnv0df5za1hfw49hrk0hcyc3plbtoywbmlcsyt1qgr2lp7686r9t2bvunvmpkflk7et3569r5g5pnuoj2sdtetuqw29xmoq7a9fd9qz21ak7cm1h4v9kwb5enzxwqogsl8c9avpkmz',
                parameterValue: 'h6004wtzqsic1kcrvct5n8ixaw2zfk3rf4xcr6g64ejy6tva9evv704my7ahtkvy0l6a4pw0nldrk027o52poir3ska6w0izdz7bj0r7d0xxpzgfbe3l5hbwpcve92vagc2270r0zi14whrxrd4xbofv383t4uk62tjk04ib7qpazxnl46rrm5wmhjwjuahjbv7y2obo8afzd93kyc0a2b19v7ihd2n2qkh5yhbny2uisc416a3up62ss04cg7ccq6xhw7bl6prgarzzop25p94w7qfxxepzkaczrlfm6p1km6oo1hyokfjdpn5by5ra2dktopryqamdsf6erqzfxj2s6myrqqcjf3c3zvjq0bnzoekycaktji8cw9wq1koo7cl4vkp1x5xhvwtn0uk239nb3k9kq06yfix3gz4gseuz3etmp3lo4vfb4c9fdeycivop7s9r6q3mkppqhkkqw62wnrl5itz6dqbnqzi4mmqnn3xifw62z78lmjfx1nrzyifj8kqfnvdpvifp5y32d9i6e0lue3alutyw2jg92m2q9lzu7wkp14kduybwpscloyg9yu74cbib1dk2ahj6k8lgbu00pj7kfwqaw5jay6aqnz60rbovi1j1eix44esbi6i53efybccv4ie0ujf9swqx7qxsb5hnd68f7odg6yym5fmrj8atqpma869af7of2n1frgvt6vmbccbh05isq6kz7up10e84glmqbn8vqfmb0kydsoa6lqt2zfxgic2j0nwbkj3futihiymbg7dn47cp9f4h48vkcpo6y3l9y8veyu7f3108cnidd44r95n1qx3p2rfefhvckzguwa0jeiojklg23pg69k0n5dc2jj8xkeocqixavdkjelkjvshfquivo642kza2xsdf6vjsptcmplhcl6lwq804u6s1hj142iu7oasjnjzpw1ganxq02ha6uqmpcnsb8vwru21ehvd93svtpsurvbj0geg89n6tlahfn9inrcbhmr7oelfzbvxrixufwbzqz3i3btxyap7ek1hd1p8musifqj9wu8zjatmtrbv2kr4kb5p1kp2r3nq5pvxvxb1nrsoz9mgts5mq58zf40v39r0u436srs0uae2gga1unwdyvwqyi374c74oylwspi4qvoda5m2becjthp7k4t9jc8jjyxfqnevqs0m2lem8t6ra7mtt54rvpuoqcg43b8j9wdrigcrsjajl4heo46rjarvwncp9fdyfa2at6mqmizv1cl44m1gqmek23ykeuj5nc50lls535xe83gytqzpel2h8ru9t55qnj4d3puy3hiodfugvj6rpphm3g7ysdqbu3iq27ntg8jw3ry9o0e43cjz7x6drrn1vjm9vhapxlc9etgfoycg5u74fv8lb8xxjtes2cshszh3twv92eodsyksek81ewabyd05xs2s99qs8pxj1xlqy6xy6w909hm0ej4uhewdvufoha0hk01qi6ugfaln8ipzu1lsm83535l5zykconvtdz8355qc9mpc124w9p0g9fbl4di0ugvkg9qp7hemf0yczigkmi5espof0i34p3hzmmermt10wu9kzvvtydmgsvn4chqcat04p2ngrozy2r45s80gvvjogw4k2z37p10v0jv70hka9qcr9xo59h4bmhjtv7o5fkzvxk46a45tq9gy9is6cgletlwu4ovusyl3b4eamc69k2tp5huohddinhmu33wf4mtxx9znxlg7ibde4roxjsmuu8mh4zew1m8t5fgad6341g02zeipld1ssn8iu1i2sg9u1o82to0x7op1m4p36u6w1uksmc4wm1cvlm0vwtjuy0z68smlyzpzxupk7jppcf594rdeppo5fsz4zmrwp6epwc4vcsw07rg7x5flk0gk4nljrearujlr4oz58srqk4ycgojqhw3cts7pok1gaifqc4qkg67xu1doyqt4gpdsw5x7tcml3vf298mn6tioyc8ccirc46oi1io9m9e8xmqea9rmic7aw7nzm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'gaaft7xaj8fck76ptr8sz7ca9gj0nlle8us4mlifrxt9gjbi7t',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'm6gm2rqyw2j7sfnywzqs',
                channelHash: 'on04sxs0hgw9txtp6mcj0lgl0w8uevhhh9c2qcaq',
                channelParty: 'yjnpi1j2ajukr9gh1b7k6r9c2ktcmqq8hrygc50uw4ey8lyb5pd4cmfbdfo3lj887n249fnecfc79i5serjuw6eczdjfow678bpk84fjl9mgmlnsppbbe4mrwfq2tms3iehx3acb3lp9jlyzouez4mtdu9k9catl',
                channelComponent: 'x3of045qkvojmljjl4auzk8czqkfpgbg5w12l3di7bs89vcmn9hepi9ec338e3qj7teh52cmxkx0brytj6uwti7eai7gl2cwth52ecle1o5ugl1uw0ensk4cxp3z9ij045iym09782c44fn7iqi923tdye94gtqo',
                channelName: 'yxkx7n7ey57yjimq505xhtk98u02afarrorw9fhwyq0abn4t9kygaxg481bvqqymxp6jh4h9uzdinhpp2fbwawifg1ra0fnzt20vowkz43km030qm17x7hmtq4gsrbefl85gbm4u1q97g1y9fsa30t3u2aqtkra4',
                flowHash: '17sbrkeic0eow2bcyzr8xhjl9axdlfu2t85fqedk8',
                flowParty: 'iq76j6uj9z4dkld7aaalx7jlkplqt1cqzzfmvpf3wdgignctiilie3j0u22at8a89kidg89fhgbhjd389wov6mvrpwfwbmgtoj57ktzbw8yfcnsyd7e792lz9z0cl7cibagpb4r03cfxkeim5xmti307vepyezzt',
                flowComponent: 'dv5nlkv6ayy8kqm5z011806hvsbs5qgmj35l3ab3yoig0b5jxx6p99s2x3w2cq8q1c32rl8qgavg6m9f214baj9da3zlivsqsyaam19khb51r2zp59snkfo1t21lxkbce6086b7mdiga68f6xux5eh1mvvfqjx7c',
                flowInterfaceName: 'n9ebwflcnac9kf0cln0jhcxolnh27g1cdsjekt7r700spa5pmkvhggt9lmo9ihgs8g4muspgfarzv4v4kqm76lkef0lvupcoigluscuaabazlxvd43vyxn8kans6ciimq2dm0onk5una4rxiniqi5tas504b287v',
                flowInterfaceNamespace: '0su9hzoh4mdlr2rs6fzdzpvtca6chry3ioezpn26ojejib9twvp4ibe0zuf541ht7x7b99ctmesfssilk1jkph4mbqt4zpdqjvnblj7u69ietam3dn88x62qsqryq0gd7nfjfb014ffwa9lb6umlmw6rbxt2hi1r',
                version: 'iiaikng3ulfwhm8fqob2',
                parameterGroup: 'mpc3u6c034ut0g542itakw4eri5ims3vjly9xsqd2tbt7pgcpf9bimxqjf8uas756kuaoxlnqq73hlxqkww2zuycreshxgnrznsbbej9p6ponpsa6fwx6m9ze7xbg73lzf4f4akbi7djmwsa7knwp0jvpeglithoqnncwdae9fg6uu7cfly5d23crrs5fibcs9fxtkmt01oo2wsskekiz6jri957vm2xzkcfc36nocti4fah15s5w1o36lvx164',
                name: '3n5ryluq64zmq8kvxbwk1i5n9ngf1w2qqkm7es994dspm7ydhfe03zjj62eoqpdtoil3n6a6vbobg5a7ly81qexuv6c7kahe6gevi361jolfqf56lnzw70bj5elc5biirosces0vrs1tredchq63q304g9sbx65kubsepuwplydw5dqkrkphripv2gyloc3exy0wbmnmludgkj91wh6esi04ddhh3evhmfu8txxp2gq199dg7ngadzbo67nhjij9mlsfijd5wzh90hm14p5bgw8kia5xrnrfv138dkl86j6g4v9o3cjtob29brf9uock',
                parameterName: '38n28890ddm5jday8de86wnezqzcck32bq64sb5g3ogeo1gx03n5ike8onv3mhg6cesvpskunimn622kfxce08gokbcy5otb7inp9fn2dwzirxr4mkegq3tfwl8yvwivppxtjxd2quf4v2dnnvo5xf75yvpmi2mv6ryh405285bq9n6aub1yfaedqphks72na7emvxfiuht628kl8g8u0x60c2k4ihe83gd22c95d26gem9g6zqshh610df318exaqmeja90lux5a7o08ptvb1y5q0bse957oc2ow3f6fd4rpp08ivo8spf99bq75jfc',
                parameterValue: 'jd0zqs50kfd155dyuq2sjr1tumtp9nsuqbw3l55px2kod4qfwv07sm4kfjwzgfbhpklurxt0ldyr6kbl615u7yoku90qzo3iwx766tb6okxtjhg48qae5r97h6f69nyqt2g6z82oq8b3a1qgs9zmcttbkiy1tv80wiffbnr8opm028fdakp7k6t057g17c503sl1m0mxuooutwecqwafespw12hthujihlf0sif5qpix9ml75ltr3s95lytycgvabsqc2r5k9yl7imyw0v9010lw6wn2m77bjm5isbfkzbx9k0dbbk35i2ieonvdih7g9xg01ju0acatwow55ka4g6zu9t2qx7d1a4p0a6xlkea1efwzxo1rwt6i8hmixz1yrpcchiw59w1zpajyy0zjvovkvnmwb59uidj3lrahoibhovizxv6lozdr1h0d1aympkysm3vstmlp0u59sy9nmr4d2rlculx09crjx35wsntkahu6h26yoc2gwy1qgw6awta8nj6fgj25cu496zulzwb0h8jp8w9n9sz7nhewha29gqo9iyjty8dpci259gm5287412rsymvrooxf8vwyepdhbr756jl6o7az8kfwtzoi7v9ljirwsedirhwmezlz62vkg56djtg7wi964iia13d5ayc2mndmjdkyt01sc9o3tbbv6y0zkkp537xk62pi065m7kxmqb21x8bgmycxig06q8q16c53gh206134h91oxrv5ykhgvi99ltmunvrqf1vroxze52u8mw2tz2frxljp0znqgewqu986u6n6hfomcymbw1fut41fymfmic1qzn7lncfz4wn0fd8crrrq1obewar8mle6rpaowvpjwqnp6g9xtjj5fpytkjv8f50oadvc228bvysr59cwi5bfknmyvpynjcqxghmitkiknec0yx8o3rik2s4i82bd1ijmz7rxkmyjm6svub3hk9f5v5464fmt596vdok1d2jy973xukjldyw3joa3yemaerc2zq79xc2shtyy4ph8wjuf8cb6gw4q7ytv9zcvsj771vxd0yey6wxujwa5vwxg7oezg7vvonfmcuelmyhgmhwfuaf6usowhsi9d0s5wm3411vw5ybhqyq54zy2blu5yef89ugh6mp3em8ndd93tjqm6e2j8tutodykwvu5xp5d8n6jcn9jjb5it8qdbrduydp47xm95fprjmw3f8scu0ewldmmkwvus3g63e2przb96d9nr4q8hyw4f03fbhda0erlyi66t8m9t6q1x0avdo8rix3ctg35jan2qglq3fd5b2942xv2sg6t0zkfzk4p9ykd8juoa0w1wuqgfcxkm3w0ljut72on7v1tz08snu8ww3udeo759wsl2mzlndsmt3ms0t4cm4bvhwgarhnvo3pnxzm6skxpjynmmj0lszj4k9fq9zilavu8modauxi3pwkgohlqzfum26wnh4pjvoidxfyo7x0ahro9hixumfppsws1vr24ogvq7xbz9jwiwi5r7hvt3qoqmxrckig7a2bavg14vpamg9jfgx05xs0j9jywah863ln1z9k05my82dl45mztpb3y2dvtvub2rk1iznjta9lx9czku5omvbqn7yr37vtw6f47857pqx6oqb2jtjmmonc47yoccrqrfzzhj532j2u2x3uucksgt4mscwtjj3zm3w0undgk0pg9jt4tqyv7o0o39cztmeo8v086ciou13mtvhypt1tva38a38okpej8290xx4oqg3g6y9fdtdkqvzklhfncqll3ey5sof1vk4wqn8y1eiuoyhqt9q6hqwyh4vtzo7hfnuhuki2ksx1loasxk53kn3td7r090r3l2ydxpxn49z8hidn2a4h4snezi40w43klwpa32pu9rpzyoovoosnmzfxxo9hwm8bnkc0zfqelyoqh4kvsdoydhn6u5zxgsnor5i1gnzwerdafbtxv0sywmxkqdjzy8e284easc94hysc0scxhju17m9skruvi6lkhuffw6xxv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'hhd22c6ry3lmesgjxx0l93hiisms7tlyxjea8h61yowtwh8iojs',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'zg4ast6cayehsbws04u9',
                channelHash: 'mgvfkbuwmx06rndufehxprkoho1s1ydqx2wd68ri',
                channelParty: 'l2w23it8skb4pj2q7laei9nk4zh1n8ztnt71oaanp6enf7w01ue1g57f1vtlpbpxb7val57dedpqbuwdmfhihy4d85r4vtxlg9o5i09qayzpwci9z90ulryizg0o17viqmwmti1irbmhj4bo3z4o8byx58xswkie',
                channelComponent: 'lvs8er464zjyzbz69179spwbczw2za4ooltzkplo2v1d2p4g2529pb5ja4lqcdxe7muczbpewrci1mu2hup22a6901c9gssjujz0s1ll03ookdg10cmpu82tmhxv84cr00bucd7a8zszd758fmzssx12vr4g0rn0',
                channelName: 'rh8mki2z2nug03q0nak971wlay4bsc6lx2lrb5bi3xbfyprhqcytecdivgkwz4dwfr6zwdno79t0x3mnhavoehe0peiprjmm8icc19z5wmr8a6u58evgy2uxtjvot11jcs6mn02dbzjpkqoflqcmmcwrv2hb370r',
                flowHash: 'd0k8yqpgekrt3jaeu8l7dn5saetw2zz5xp02ecz9',
                flowParty: '7wll78o59d1eqqr1uci4ebrgyptk6o934zv4b891bv2feby3j5td0fcftf59fjygejwi55g4t7sepma396lbtg53eej0x9lcnyaz4ztcflzqmvuzqa1fowv1p8jwwu3c4qafqzv2wnkpt3xu8osleritlyj7i0nz',
                flowComponent: '16du0m4exvn1hy65cwnplc49np2fmp7phezldmbnv730vgc6zydoijurt7f53qrbdr3hw4fldyeyam6zsfo85gfrn74fmaetix8zmszdtx91064ya9knz2358ndiks7xl858gon6fcdik5crqg8b1vqhzt33jg1k',
                flowInterfaceName: '3cmlekkc0tqkv6qmsj1ivfbkz2glmm7s8pqzd5txcxqp9tenmv0tsp9892x1m7f71dofm54ocpmovr23zqnwnnqtg1d0dflohlv8xs3j9xag701p3e8ikrv1o7qvlios0e26ldutr5lvt9ijgwpk3yknvj4ycwfq',
                flowInterfaceNamespace: 'zcq98y9fjw7xbci4u5phn4c7pb5qxslwg3swj4swsblrcprqclwn4rkddoljrotry6z39urbokru7p8do4f2con22j7arb5y9vr0qqeah1trgeapj1ez94rqgjshe55h503c1xmplp5m0sbdpx382gqhg3ahivmc',
                version: 'wk56ufnnl1pmzlygl6q0',
                parameterGroup: 'fw0waeulkdbzw0lyyzz0hv9die6gtv12hr7a0aa0gv8ekqciygj1ocznjxm1j4pwi7pn2hzwf7d1863gptv6ey0olvv76d1iyytsct7ec97irde3i2u495wrida6vrg1w2pywutkwn0j7zwx3c025qt9z77yrwi9hvx3cz0d5l4y7k7f8h9egmgyihatu8mkp6q9u3wn2lvtal1k73umlrp6hk3w2mwlhbixpwocmbmkxmjx5ds4fp0zhp6oojc',
                name: '78aws1qx4vm57viuhqbjdwxcwf5tzcqy35n9z3723y4xdiyf78nvlswireboxxln32f6jdzvkzixy0g6elskunygjq4et8b5r40yj4za15bwn1ete52cdlfb069ivw3upummufh72lsok41uie4020ay98bqy30pc5648numwy85z5k4q31xevf61t1zge18lqn4bizczeegyk76ptpgb3ga1xnavnx6sti720swwfpnyu4em20krjjdcdgsooia24zggwdssy4oipt1lsb8zuvn79azhwxe82ko6zr9z8jtd3kocmlrae1gqjksf329',
                parameterName: 'vxn6awdabsa09uvhffmu2wpiv05i2x0okhqfyvgb4dxaoidwk19hnz1grl8e9qmeptaf4mfs3x36jl5cctby0xpvsssk3p9o8tp2wyui3uv3zmkjwd4qszrdmcbc0n8cp0ant5nb1deouvx0p93rmtgxnv4g5fodo71bwrhv284a5s9nligc5pyfjzqp26mqjrs2xb62o55j8te2nkqaqfkc4c9xqorjdb3sw62jyf0un0dfev0i5fxmmxz4gnmhszq61x0vv7s4hzicbbl1y2jyq87oq83r3aioo2a5kf80xhqvpr9v10r9ymzjw949',
                parameterValue: 'xg8qi6hzrrx6iprlfuufp0lkj3kxe4sx5hzwdnp96260o60u0hyffxme9k1czs4bj8m2oildk1mar45osf4igzzvd0xyqk0s5qriwublv553x088u59wopleyyyxpzw129oqne52xvl7yx9cp01zmr1f6hm3va3ugt3csz6b2f1304ze9bcdig12nen5ahiuzyypth59rsttxzg39zhmojlqk363n2fhut3tl05zoeuwyitz9ksbsrt6pri31j218qrson7grlx600b6g0dedtfz6m91p78wbeamrx9qc2ebmopb37l0gczi7d6i0dt35hkidvje8k5xqak0itasz3bsu9emh1wwinwop41xf923keprumpj14lcvd778my171k4g56rh4wi0o5ek7f35q0676i8l16p6cx24yru1vmf2hnc8igzl4vhdbsclsmab8zil0mve5rgd9tpdggw808nyu9v0s3u6tcur5su4a5kx2po53nw0vurdjbtb7k2xz92wkg16stcpuk6ogexxq355ocyzovgc8u1t3q7q9eal1ek92mc5gdvp27wqu5mghtibeqh014zticizl66vebzhe8xnij0872vs13ccwajbh29px8po0cxualj7mpuzsn06xhr3sdmdjl9rfx6xg208frsw8ra8i3lzfol9xv4m88hlsttcazuykf0sw8kycft0s17633u5ugnl1gdmn8om3auhh393lk4j99o87ed9d0viuf6twlm5sjf1yzxprhnm6pgpmqnonv8090s6exf9ioibpvkob2yxsl6r6g6z7buxwlmcr6q4fxk2tf6b49vavd1cbw5vx2wfu55x6mnoan6pwlq03k9y089fkqoavdnzsgqqz2mbtjb3rzy5gp50007jo3cnvjpbhodr8vea4u991muolf433ytxqwnv5ygq1s4f6tssdgr6lugetuafx834bkum6yo8vjpk48c3zexvw0olvzsysqz93cokvatgczmbl5wm2d9ls9a3r0ott7bjn22e19w1kerbxfcbuu45n7vvh9k40453p6xc5zv2c364mv7imhndfbbz8mqrku6qgh93qb2siejf4y2ie7arv7c06z8d2bmrizvjroojb2t8xeqdhwg1lydf0kamv3bc0jf5ga35ah8qnzlg6nc370pyxosaao65m64y4jx5ojli7maqianinbcncxq0o3kn5291i3y9gzx8p1u5yx9u2k2klxku1fqd92bp8nzmq75a4fumb6enhm2gv03pyb7rdl00m1diyhx61f9ztk7mrkwq4xdqan5gvvz2sj3vn1mnk3nuhi5vuh7v7vv2yctf7p4d7cdxtuy92yitj7jgrcjau5lekd88amhcuj6vroj0s02dmmru9hc6sj573x419k9ejgh8xescag1h689inee7ow5vmclprfs4nghizfwsszl4arpoa33d9l692bdpu9kykwjcnus0tzp9qz4xcdmree7sr1n0uokkytquv4nvw0gr1v4rc8hxzr7iq8lf5viupnn4ba17npzrht8josicu40y6cren31oa34nm12rfk4luukfsejqxv8hqi8whamfo2gwf8twatl30bhe3nk44kin3cvyehy8dshgjdvoh2vcxpekphjz076obg5kb5h2yub7e3hyyo41g2ojnko22zx6gumpy38pyqnj6k4ksz0zwggo3q8msc0n0csricvosew5b6x3kex7jw4mjxqzzouswbck50k1tjh8kjq5vfc8h2x3mg4m7nr27efpaukv76vl4x91d9hrpnlbtk15piijlh28vy1yjujc3kohw2rm7fxhmr53nk9zv3ymrelm2khffi8sf2ayib63qvnfytl11v7ly2uxjr9rzy5ata7b3hpbli9oiunvmluqu8wxlzxplxjgmb40tgi5ccfsxn3mbdojda0ii2cs5v3crx11geh5ddqut4737u4tdc4tc12y5s1yxrncxe3ikwpj8f2tmdgfoocbmg7na97ph7qben30nr7',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'b59c4bdflgeggvb2gmxko4fgtxlq2a6wi8wkc9oo3xjkmsmuq2',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'p58awlh6txrrci52y5wv7',
                channelHash: 'it8oeazzsoekvtgc1nd0xeyo3q1rrtfmfqqflbor',
                channelParty: 'inl33ybl4pq47qp57db4j2ilske93a3lhqv23kgtqamh86jbapi4fumyx96s96hmra5a0fh8slke9fn22x70qufhx5u68r1xq90viqhco1d9jororoso8ow5mu3gvnm350mlhalzkjfa4evckuv2u0g92l88dqjp',
                channelComponent: 'moykzrtieffdjdrihbpschhunk1dzjbskjubawkbemq453120drnl9d6p1q7umzvil10yp8m6697vv24xjvphs65hqansvdala0qziw2uatlk25b6vckybj8wcb6bqhpexzn0ro4bqo7x2r5bhiyz5loji99hogr',
                channelName: 'xesb30f5m59owottbl8rq4bak343w7522ju2otd0pr6s3m31yn8gykngqrqt4puejc3i9nl551svmz9gjskwuxc8t7jih274exiorf322nxu5oqgcx71wvzdhg7uiypu0g1g40euoidfuzgejo0znk8qo4agzo1u',
                flowHash: '0bmarpbda1s6uisltduyqxjhp8mj6l594fo305ur',
                flowParty: 'ooaen7cr3eiz4a9t4q502z8gqpbtrf1uhwutum6y78is2c71o5525thp227ai5njr8e8x6drjhlm6si0l9i4v6p44djj821686wk1iuvx4mls671hbbvadil00725x03u1zspxib639d2iky3x8eqjm4xgb7o7uu',
                flowComponent: 'mtjkwnbvvuwqp31uu4npez7kip79f2u4b4g28pjmwg5966byatgzautu3m9u60685pscuv48ytifi84nit58g7yjj4u73imykcqphbi4alkn5c2w7koq1s8d0acmq2seeth2cevfzgjavzsyky0nenkr7z9109bt',
                flowInterfaceName: 'g7msdk3ru9hq18kjl7lwfjxe37f9uy7fgo32evf2nmxgne1d1nm058l2m5nk6l27747cgjmui7uyo4qgyd8210g6gzs0di0u6p7uio81plf0dozvh9fu0dxy3xkqqwifizxh73s4rrbrv2g71i2dob5g1459vazb',
                flowInterfaceNamespace: '4b9psp4123iaajg393wl65hi7yhf0x6ahquxbnzunoyf73wjswi7730kqansisv33n2u6taoxv1ymbexbw46w3oyvvq62videwjxao2do5epaf5g0nnoldnysse7ni57ujz4mhqw6bqdl4ykynosnhb40ou03xm9',
                version: 'dbkoow9epdqf0yq8gepu',
                parameterGroup: 'isk5n27ilbk2elui35knhjwtyg0oqunm7qg52ge50nqtkqta74oveb3mk4581gs3bbfsiojqmptkdx01rly3e1mgi2yd7tsgdiljntzem9m352cli82y4lfvsdw9td809iooyasw6pg1z83oefcx70dh5ky3sltze3iwmmf2ddm6rjwsrqg5qsol9jyi96gmeroi5vdug17htnkpfbs57thzhiotr1ooulw8itd749ugihwbaexany9zx2ka4j4',
                name: 'lji2ceapp7jz71jow5ocm5oo5ou7f6cflh2ojncmo6426dq7iv9687va1p065w6cq1euloejblknhktz070ew5ooirvhytp2dgqd6jw6hm2fzwmkxcx57d9xc5rup3qpu4bsk5k7coq7a4xzx01uvye5ou7xd4tub4tee4325j7aaebhqjk7b4kmh4tkxcb0mjo26m058bcjjdkz2uvn6ta72t1wrn533krieri3wpho99zdbowxvs1znb7vgcifp1kxrfx4jws0632okgxb2qdd1botbsv48jqg0n793q5wrflbj79jpcbpbv0hrsqy',
                parameterName: 'gak7xkveeazf6a2fbbbzkugyw6kreqms3ryc9nyyu8x9wk91ieso9g1x6gs69l7hgxm202i4kbltq7fwt3ric3yn9mmnxmjoycr6cp0d0dtprrx5y5lubz0q3d5x3je1dy2clczf72cjyu3mredpwt7wkp7sbkc340meu46ndu4zeb2r5kd2lw137s3geq947n3buptbvkf9wev1kyyw7atn073g2hotwt2tfk31xfp1rrstsxqsiii5wksdg2yu5v3lrjfe7lds1w90mupiwd27yrltrtjzinkbgh2f3iy4bv5z7wn7iaeryvjulnae',
                parameterValue: '5u22klekr713yzjkqchp29y1nkuzmt7p277weowh5orx2t5mvqrt1l3x5mqdqgh426rnxie2jwlqc7agkhyf3117zdlg5ym1zmk5l9bmr335gos5nu1i5qc3pfcx0zopoc1vefc9fya74uw1d7emfuyqsa85bx8tnpkuwi2ul2x8yw3ru2a8d5qqr43z7yjerxw6qkxhcmdiqvdh66p11w76syecho1hgj4zt2j7jf2rfvzhc1f88epip2i8yytdf5fr4stlhvpaucztviqts5gbvunrmuamjmnncrjbpm7jfk285x5dd7m191atewcxmyr4addmr07u9y77pqfov9rif7pok9oyu94ptvp2nzrgmaxiagxkagl4zfx9oxs1ait3apd0f2o0xcr5hxwyki0t947bvc2d6ga0ya686jz19tlojiawntvbzf2hno13gddioxf7dkgbyvsp3ldv1k4w9fbcpp0d7m53guwpz3eytvs5xn6z8w8c0wyo7317uydpuwwpmkpway18ll6qb4wi7mbul11ce20l8p84b8klpjre404nm2hzhttl2aci9wgxki9e441cfsvpix6olqwvqnnu08dlo1h1hhf4d31ic9m0ur7aujwqu7om6q30qzbt3cggvtm0ve63somkkr2kwmq39wvlovqczuqyyoyyxz1jnj2t01n4q3n99qrvwli89dojezl0ef0lrruq5kjfh55vg1aqnm1ww3u6s8t7oqbtyoe2h9pyg0xd80qhl7k67lr1ho0x95uxhjk4cexzjt4124m7jai1aeg3gkiv57ityxoef6zmr0e5tgl03wo1qfl0fso8e6dq638vwqnby06la5z5nl8dapsk1kyi60v1jmwsqhq9y4x2s1h1r0ejdupc9gqkc6jxhw2lxtcab8f1itf3b4bxoiwpf64r2wmtssh9rbby0dxt5mcl5sv23hfwa99ezqgj6ifns365e8vkm10r8go94t32k4pmsftnc8qhkyj03lsp8u4rc3c2s1mzfumc03nl2xomxhr7vlwnc4rldsgdskhim4p4uuts0pcpvi6tkb42q70zfls0diiyfreu6i03o9t7wo7j5tbaecvik2yxhtxudlrw0qheuox9hbc8rrb4ifkwdib4m5nzqd22axk6ltp1xmr22qvtifmwhdnuwm7nniixy9cyneuqpkyetozs65xsz2kuat3jrwooivd19976wmk3zcg34tn810i133ycvhigwlpxdigy8ev5lyrat12r8ox5yqs5xa3023c04r2z7k3o4vdudslzqhbwtph0ecgk2bl9t8j6fa7sk3r4zyce2l6une5jap10xbkgr50lz2hnho9cztd5i3g7nqte888lrw71b21a03raxf6e5rlroznt5z74p0p1kqughwc6imcjkur5ocar0lc7hmjqx8kim3nga66vma2ivqn2v3asbqvjlksa9xra7rp751jtvnnaj07cdkhbqlje5pmlqc9hh8jijs3809yi765y40cttj4azp8la7iozdk19syo7cpya9d9uxv2v981opjg1k4dnvsm2iseucbgxw5e9rpuptexyo26dhjovy4xv9p720fkv6qt5nbzdazvibdtnuaoe854ostyqqn0tmu47hcm19uhlz165c5p2tf2wrsd1tzm5xzdfruhqq3czpvgrf1i1etet1qlrubvgel4jczbfysairxbmgdg8x5xbcpru534tpdrk41fagahsl9sr04gakxd0j81goscboxx71cbm2klwg54mkel4eza1eojoxu9i9qsnggqe6urjaaw3tnkld18wz8d18fygo3o3yrudg7sc9nr4bu6knae9hvybq4xckm88oofy4vjqonl94m6h3zn32mlvzjs8p2mf7tgutwhm12gvzv57sbnj7e7ghzu8epbc7ltzbps1ktv58qsqb7k6hdaro20x8nqzqerqt8ovtxu8ibr2n9fa45stsvutqqdiq2vrq8i01tj4zhikfvxknimwzqyg1gwh8dp',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'cpq7jczhb8ieljdo0ky322ddr3lzznc4n982p19cl05dae64wy',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'oylfikdcdu5smxln9ldb',
                channelHash: '1g6nww1q1dampb9x16ulacdibxhbop5wch9zowno',
                channelParty: 'l8oev2qjwk893tzsgpnnj3316nceuu862urncglal0qy352bxevqtg650zv2qkrjui3basu3tqpzjc9i3kr2pkc9xehrw8cyekt287io3w19vw4dj5xdnaw2jmju8israhwb8k6blszjd10h9iavd8832phzdtsid',
                channelComponent: 'j0nf0ifndq27kp49z3id2eganjmq5e2cj88f1gjol9q6ap4xxqblgpzpxe22brbb8avqssr8s23eycpw79kfwpg8cp5nf8gq19cfrc5x8ztjnjxw47qhzfr16c1p4ofstk9cwt7djwktnrp6oebv70yt0emho2du',
                channelName: 'wrssgcpgrggrxlkke8nvtt3lqwwifrkwz72j2de6i3onpb9r9yc8g8nnmpnxwzz98epka0jjhpxfu4ou0t911w1vb7fec39xdhk7yh7aldccc8pwl95n5rtleugy1xz4yfts53kp7zsdbg2yivxkpsn06zdodx6j',
                flowHash: '5rwehbglj8jgh69utmqoqja6128uy4vkfcscrvjf',
                flowParty: 'murz6woy90qsl39mer23m2b47u9rucwgyr6oxu8deuqvych9x8lmf3ylnkmee5855v4wj89y1us8lls8hp4k0xasb8wamj8agzg85rmrv0fjwpk8ikpdye78hherpmh8cp5i5doo58xu6lly6p4y2wvn84t878rl',
                flowComponent: 'agjghjpzjoxkrteumw6yfi8x9y64ef4x4pk54pkb5adoi99or2t9r8duaclgdk8kmmm4qih7k73cf5ax5ni6xuzs2xcsi6urab0x1xnbibxkqww39g69526kmlzjyj7ermupwk5kbvzmci887tgiik3171h0d0qt',
                flowInterfaceName: 'c6bysokmvkfsoaur8xmt7n28yn48vr8lgwezt97c1niwzd3uieu4ggbnn5cu1psilrgcdjar2l0i2afmmu2zw8kg65uk0tugwihojsh2ijg09scwl6mawhsfq0qjr00tcnpomnxbr4s2x047fe0n2gxuq8isj6xc',
                flowInterfaceNamespace: 'tddwacoc1va8j25qzr44xqv313qn5wqii8d5cbmmadi2mm51jcdkouwit9car89uk1ni3hjdy2t5sbdf87ddoiu9xqj7shwavei0397ewky8nlwdfyzixtnjnqpmmvbcjc667zkrfm2b3sjt0d64nqm4v0mlp1ne',
                version: 'waulj6ske99mhat6580n',
                parameterGroup: 'sx55xbvxnddxwg6k7gnvibbvkwmp5uvo9utalb4h8ba6iq053lr2hv3f08y0pxpceu0owsghtxhk0ix9ai84rths7impk57yktokofqs8iny9akmmh9rftlgjh9ic9484pgqeyl93j9i8u8riav53xt9wmrgtsdkulnldmzmo6xmzqjs7fvkto7au8db94m6i78ut1m2boyplvjn5bda5gzmd8epv6ofaxrn0u1sreuj8k3jlkfi73e6b85l7j4',
                name: 'admg59gehor02q98ab1g2vx05wh2lmq3p3psc352sjv645jrotyq8jjmxh4b2980uvx74dbl82jhcyr0eqfxvgmtihq2j6uo4alzy1nv4wjguvmscw5ou4gjox2cs9psywxmcso9o4dq1m7co8duetorskdkudln6rx0fznultwaoz21vi0ejbkr6251lybevpgv6bmhf1fqpekr9f9rgpjz971bm0sas3kd1qec2xqufavgpo9zrnw2opn32ei39vp6qmu7d1kq0kb81bnatxg98513ybp6090qrehdajvzuvx56dcrys469f0dhsor',
                parameterName: 'dakfalu8lmnh8x3ku16qlkjcnn0q2ijmtfollowjvnsn0d3pw8wvc9dabrfd61112xwuuw2oilx7yrtyylezw03gdm64t7txf1xjiejriehv8rd5pg2qmfcdwuqqazmof5n99acrdl9cr0b1p5pf3mik8ke7alqkj1h04kbsbwmgftuty22299grbywzqnbr9iaau05o9sqel1d2cemef9pf04mk5nq114qt0h634vbidhcipo9hubu27q6u9tsq30hih11cyz7rxkhityqbn4bzxp3eugianbxukueoutphkw1ae1jodygxmzjbu1sz',
                parameterValue: 'e7ypk15hsyc3fqhn07b0b9rh9ctpmj6kn2b1birxybx731afmxzy2ncx7k3mx4pbq5rkkeskq720l5mfo7gyi74kxqxqxxqef4jhdns66y5tf3k1cwobjmxsrqv5hd4t2bmuy9b5u2ii6gy8jaqbqnn5hbbz4li2s9gp9aawwzw3tiym4atfbrcysdd72zecaf6uh15idg1rhryi12obdteylbsmhc8g37wy721f49a7ptgvn1kixxtcshqfqjtmo3ks68o7okj7mbdl4zwviexaecsf3ilbzuvcbm7obnctv7xdwm585jf5jjuiao5ca8nxumfva0dlsm4mgjpnu7jb7fsdorgfgvxhb94maz6jg7z2rh2e0fb2dezjsl7pii69zwr2oa33m7r0jdt2winzj71ditqx5f8z96j4ns67ibtiveagd7o8isp9ytuxlr808lqclomii39d3gda4dgycfjbo156dhp8lsckdm8keka0pcaec2kovyll7hiihvu88uel00zxbcdc72gbu4zp1rrqljdrzbxwn2tmikze1ww63jv7hfic6jv2qv1vhxp5rlzymbqpyp0j8qzbhxe56d7qrx8tdnjwqbqx4jswpf2kdqmucp0rxm1hybvgrkwp9olfbyaggbfr08872vq1za5w290bj4guihihzov12ujak4bar225u7ahkk22an6b0napcgv6o68zmu2ws71nchnw88e3ct1g2w12lw0p0mhjf1je1c6muz25fqxuv0zx1g9h3fuubv5j3r5n6g3es1g9w2kxpyu0csgy54bhqj39qvql9ccg0eiok6o8lb7tlbi6b6dom106t1mjtp2s3zwkbc82wejqibunndiguyc3rt1yu1z366ocydmdprjd1ukobelj3anlnz0if21jeecl20octhndjan7j9ebjfkt7ldt578mzyxfq1jghf85llrm474n34liphducdfymp73ossfdfg4s4qxly82uazudgg69156ouryq6fhyw3hals0i0ovjye5s03pvie5smnyqtbfinhvxjoxuyztg0fzw5z47pimexzdvhfdji9tvjtp66tt5cjtaa0rnxvl8bl73q62jg41q6cff3hw1t3ofeyx6iwyv8ntp1v2puk0uufo6o493zz3rauehqmesf6ew213dfdtuzxk7aqukwpjy8qmk2ofl734vtwi0i8689bap71qr4euy0j0pjt55hvssnd86cuf2gnou4n8pdylh78ythk4ytccedkrehk9h3lx1zydgvmfqdddkvexucbxddvm7t8behj67rbwfis2135kjxzx24afkehk5auuqmclbr8xwzc09shpum4kdlkxd5i72wjziao6efsou0qqpj39j4vi9at11gbh7ofv9l12pln3370bwfe753atzlpdwf9jgfte50ul0n1hykbw3xwccl652zelxfjvzisxxtkmhxt6qxwbhl52lfn33820fhu2779gtqh28nggamylkk9m735iw8ia59nnzvz55cajsmqicm5s58q1a5cu6s2xqo1l2zj5erds0w8atdjwh8pf0aajypfyyg8cgi0tb7lpwh4so212hxm2klrvmo776t6vr1610z9pt15e9jfrxx1a5p05wbg00ezvowj9258uf4sguahjj9ieami53gnjox2a3bz24zeum92f45mm7j49hopv3nldj9csxuaxcb6btew97g8o51ofmwcm0dio306t8of0c8fllh5cm8uqjakeaz1ph0fjpjjnvj0vphxpcyp1g4ae6fp9et9lovhrldo3kfvf9h1686wt1vpjxyyb59raa16ubu23d6ypqqr4kfto6v3c7e7fah2d1byn9uqmvzbhho58opbj60lhh83wntq3rf5ketw4a1x7ijivl9nglmvci8u8msdqf5ze2eaq6qmimctl1d90n4b00whxpxucani3wujh9u0nu0orj95j4y60laxrdh1f8l83l0npe6rh5y6x411ezyccf50wx4ew62ijipna',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'dgv5sekqi26bpfc3x0638ywch73hptuqbjy789jfcd47vnturn',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '2t1a1qe33drycizg81x5',
                channelHash: 'ogmgxri493at94axq9mhcqfizheyktt30xpphy83',
                channelParty: 'z8lrvudsm7e8s8zvkvjw1wc1tsgqo55sgh3ttb36jis6uinqga7cryk0rwh6vhdhmtrjgkbv5m3p4amqo4107ljb4b3ekje2ngqid7jvuvwnip8e0ro5qomyeo55k02s1dbttni7ooxheki7be48u8rpf9yqcraz',
                channelComponent: 'clqg7xch5c5yegvn8zwzvuqh3an1k4vsnt50vjcpt4tps9d6c8nmam646q6jevh4kr4ysaap8id1w7m2vl3fys3xba0ixdzjyapyc3j3t543cpx5p8n7qbqjwa73elhdume6qpg0t1x0ruyy8uz6jg0qbxsvemboa',
                channelName: '7osx5ggxxv92fqjlst7akxs0i8whffxmgiq6zy8wjvj2xktjqos3whtx2x2arjscgv6l6gd7rqb6lymmixnikylbj6uvf08wwj9751w12umaxr83ny3ay9qm6no40gdrye83b8sw9x5qvemmqfonh7tv6bds57mr',
                flowHash: '7h501yvqakbebif9y00vczjvcq3oam5z829rjmli',
                flowParty: 'blmwu97woxixj3lgyoeh4v9xdwva9hxsxiu6gg6q7irq8rlmv6uap7mvjoe0sajjvxsizcfhwf5rtoyae3vbjlt8kt63o98lxfqfdbi4rsofgalqlodvpu0px6hq2h0nylnmmspek62o8a00ubrx5jrria30in2x',
                flowComponent: 'pft5roma7kuxyjx8u44wlgpniwyjcovaihov2ue5i6yz74gipz2om3czbmorlmcr81mifr9r1k8r8czidr3w4oc67ndf417dsdsd236tgjzs5kw3heo7gz0d3v9a01foerdzmjbjbh29wtz25n5myyty79kbukk6',
                flowInterfaceName: '9kpf5q9wqefsoafoldh9do781o1zwrx73w77og2kx0loqya5p0o7e7lhdr53e7spaalx3rgwj8episcwhzgj3ahfg2j5ha9xmyhfcq4izwv3skrjlszxirjq9n4uoi4n0jjgm2ljd2f8h0ae9pwrxku5f31e2vgn',
                flowInterfaceNamespace: 'pccpkcef2632q2lakn174yqkjv6qf4gxmlhfkrwv32ek99k0tg78i3o6jux0wwzghke9kmn5ytdjgu66ff37njwlnw3x4ybz0utv7ixp4c3jqu575v82v40nwelpg0juqub3mnqjybf4qol09mbni5cd05sgk0p1',
                version: '0be7rdwun5b9py7imo0k',
                parameterGroup: 'gtjyxqumrzrjbe0q2hctt5ubrbkzgi53zqpvimq8psmxhor8na2q9vlg1gxaf9wuxedd9kkau6ivckvihx8eu9iusb9aw0z5bzyx319ekksn3lq1xabr6hywtn8x11fgrmyhu027tj1ovfs41ngap7xzrbgirw990vrqauikp06p26mgwjrc07flhtrrsr0pgkaazpyy08bzvh53e8kyx9h9yaip6wkq4lfev1iw88o3ubs7ya5079lrungyy1i',
                name: 'db6yaldziow8vk73r8sj6clslcd7m8ruponna87gyau9o5j0yh9rv3iikf8ycob0mfhffdxkedsjhmgku9rgkksvwb0ua3gd7lhtmnym7neb4rxb8fap3p2z7bhzqgg326prqivz8r9jexiwmf6qpxtcn2t619kfcba77eeeleyku7mazdra0we7xpq62tys852hlppe7yyji9z3s3hhd1ifd1plzvhuz0h53m1554mal6n6fhh7c6fnuu2mhgtdd3d6jzmgvz4r9cydpocx9ttoyvlykqm4iufqas1cz83af092ui7ox6mwvrl44yiv',
                parameterName: 'hpcbkt2xvh9mtclt2aszrv0dohbcmnuhje2qb7stfua7tp19qfb9rdh3fd93ygsfn0ayg8lskd1lyw9lp83hm7duy9nod3bbctc2qd4h3hj0sujj52zqpt735obbnfovpgpmvtu9cst0358bqmx58vppjgym111s0r1ljia5l0nhqwum8l0x6ybcsgr07v6bruojogzjx272d2henzi4ea3a5u0tnc39yd12w25hve9w99eush31z72a0jgt1avar4l77labk3lmzxzns84os89aitjfo8rmosmzbwprrnvi94piycmri5mk3z6hqb6k',
                parameterValue: '7oevy2fexeiaf5u1ttyd8fsn4lyrvyskhs0b9ivnh5fkm975ygcbc5o5wwlvde8kr7v262atu9f0ow8uzfnh3yna3a2556nqhwxxaw7i2to3vup8flsm94v14bl7vucno75nsmkvkxnids21aw8bhdc4ygpqlfg6yvyczcl7phc8n7y6f1yp86emx72i95eofp7q6n6jq44l73gou5dkquogzyk1xlb91vbcdonhf3hz4scewqh8aa83hr6jy3yjjpe5x1c93dhl062xefnfzxew0oq3hjlgpr8biak9tpta20bv6c4jo5138hd4p6knih03cggepvhvmxb431fi3zcwlqfiyhig1h373p98ke1bpxwz8jrmdr7a80q1steyb3yhgbpslmzponnvtupdw484ltj01igftkek0tko8rl0r332m7m9v57xklpv7yts69wm0ojzrd1mbilllxw781nr1mq2neq9dcxwi9sde1tpnu5ycwieb0drwnkyw8lytucji4f71asux1hpgatqjnus0m3cgvd05upv50nqwt6lxt670sxwz5uy7yit1sjziwcmvnv2k1yzvb3002grfg0pw3qvherachqb1yh78y532d94r5tws5f46d5udxgdw2x6yr8dnpklkb72iyxl88lgw9xu0hwaof6xxat2uxp6lp97030o9ssriqmwysn3ywhx83mmp1obuarmag4kf3wx0brulp9weuak492nct1ep2awgx6b100jzedt1j5dj7fhr0db0sgz68qqayamo0l38zz41c87vronwy0cs27orzkw44zix4ba45qoqr4j5csdwzi3rmyeuiye4cbt4umsv4rwcx1o78mvfuz293meuu5beg1e92feairy86026xsznbid8tu9luoje3sry5grqopuxizlxq5ekrcrt3s64hsvj5pewagjufitd85qnvx1stnri6em56a4fx63g5ujpk2869ic3slas0e4l0rcb9qxvopa04mbz7a0rm0nt4aq3eqk2ud3fqk9ca3aughu5pnqqeivecimhba71a79jyr38up217vsb55a1yd792p2kx7en670ati7caphqfenutpndfan2ialssurl189jj6bq4f0lyz6x5rq6o0zxrpzvf3wkhl1wn893my8xyvoqubbiakmieuv8101dy09hh7s9mvhhrfes0gq548kwu48reeyyctvvwf666efomeb6w6uxd2q8ggxoo3jngu51fufzydufwhcp2qb9p84igcr6bcqnipem4xwxze9d4u62x4ixbdyr5l550pzbcd86nbtt09r7o3u4j5l3216bqb7qe0hlw75hyf9iit9o38hwctgd2dx7fpy6bxwudc87oxly5etw5wpqt1o7dzu20i60jgx9zpxoczmicqhomwaz6kwucvwll41eecjvyaf9lf2ccneqtwmrukdx3nwc5f6159vjfl02vzv6xg3bv13rflow6vcqgps25hu4p2eiexsmzjk7cwo9pzz18dbkgxiu9qgymbdzfmqq4xk7dfkaogw0ixn7z20dkbtf132jmcdnspyaqvvlut5r83h9ccrkyh453icfzi3h2s1h46obkif1b8njiipeyyri2wnn0svyfguy1h8uvstvnqj4eud8ytieiabvrff4uyr5wtpukh87tkdcxc89p07nbjbzevd1ysq4bqasg9gl8q1zi7sxbfknvumatx63nukhx5qh5h0mr9mavbjxrbezfkajnfn6n46k5u8xe5mnv8abowdmdqa37pyxzd5t4i8x8j8yrtrs9urdh9vpbu6vub2sz7kcv7u3acd4hevo7xkpfvniuq6if175gyczunpb3wvea2q9sbkadpg5zx9j2190tazrvlj2yxqvkl94kch2n9f6nt8g777ze24xts7jt9synbi2kv9xlmlif1crrv9s4aslotehj49u3q21xjurqlotzyj4uvyj5trj9oqxfsggxajxpfvrrbe5tu0plo12hhgpmawqffl5zxatvqa',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'lpnluarncunplpx82ybubokmjzjrpbce6aqwkkbjxdv1mycoo4',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'yzosg6oc5yfjvj6srwwt',
                channelHash: 'sum6hul8g32obsuk7tdhmsjf4c966rhk8sj1k7rq',
                channelParty: 'nv5x7d02qz6ibvf323q81wqny17mko10b9cxq6qk9v96d6ptm2ayu2yof1g1tzw8azrmay5skedd3t7kraxubgivgje0i63hgll7stabqf81sdlvn83f74t4z6k6t43hs68jf44afpacjb11u43bxcsfc11mbo3f',
                channelComponent: '46af1ndlkniqxoyewvxr5w0nq21hkial64b0ye673cil7l2cy3dur2w2oehkp53j3z0jiks8f0du6gta8h76ct6oq8qmdumta6h4zs9eve72f3rq96hfa79uo1ayyxxmdms0ydtom07imxf6ao1p5l9pq5t67c19',
                channelName: 'uf6bfiffo1kaucbz26qsf4v01fqkt8ukwviuwx89mzmw921qea073ifpf4u5n6rxod0qid2hrb1n8d4m0eli62qlm23dcr5j5y5p7a12abo1a428vxqqt2tumlvwc52rhi9ifadusbcwdzsdihgu6jmluoipix9kr',
                flowHash: 'tic5vc595l32eod54oivphsiuwwjmhwf729aiogl',
                flowParty: '5345u7nzg33dxn56e2vixagwoxl5n4yv6z501nvp68wv07ertzepfosmcvgeausy1h66e8v7x7g2yu43cxuf93xfi6dmi33gcplpvzg7ddy5qr46479giswfn9fopsjgizb4s364t7gwa1rsnzerdyi1276ftfc6',
                flowComponent: '92hco6d5tp48qbfflssl2qn5jo4nrckokvnj76crag0fgkvfh4wunlowcmuk9f8t3wsrd6oetcaupznuqnaehjxzt4orm1jl2t4voqxk5npk3aed073l2q4m0txdlfhfl5jbh1wb9p7yhgbpso0elfy9ct4hwx5w',
                flowInterfaceName: 'pvw3uyxnol80477lfr2eskwbbtz9bu4rhmujducxge8koix4zi7ghxu82d4jqlam41sk255adok3z4ny0uazoxsux97uuu6mzmdks99yrjsu46h2grdmk72vjzbmypnwtknjw5kpkhuu7ezep7l8i6qnwdnzqsm5',
                flowInterfaceNamespace: 'f2bs5h27ql3g34x4f22dh352tg934cotl2in8mij1baam81nmpeco4kryry65xw1n4mk6tcvdw4z1ylzfurmtegld6a6evnlq01al15m2edcozlucxlnsk7fjr8iix7w9l3eu3472b54dwvxun6vn9h4v36vgy1w',
                version: 'vfmcsybj36olr6nms9sm',
                parameterGroup: 'v80dtg48y8bgd95u6kiy0axdaa24ez4e28m4bg39x6r3hplpm35j5wi9ozdvixfxjkoyxcbzg924kw9cdmmoslzo4njq66p6h9f59ysha39t0vwy7v9qidxykyyijj70w8oqqqmm3cnq5kw8yyw96go2t1x55hdqbe04l23q6vewsfnayotcp1lrwy5fnoas9oemkxcsi3orzy86skzpndvigfc6re9xect4b5hfsgi47ixd5z6i5j69hu7jngc',
                name: 'mkri9d4gdk5oxt5iu73ih52cl2prmohemly2h3iycsv7yzh2j801tmy3t7uexg06d7nbl2vn134ul5lpceavkdvlr155t6jriwdfxb5tuqxhmyqph3wkrpvmkm3ucvfwhc2hciws0vdwbqph1fm96us6izgv5l3c6rlc9kwm0dy5kagof4nauz88sehutkoxip0b0v5qyz64pyhfybz2h6p2fxnvfsme5fq2jys37ux926adno94ec5a8iprgb11hw2scus8qyyn23tar5x2qjhhbukw0fwkiilsh95ngckzop8ls72jg0bktss2wocr',
                parameterName: 'lerpsech37lcbtweash2ibykr638k7ympwx4lek8rr3zh1fi5324q3prjbra1cwclrtr33pzv8zvzmjv44ofe99i7mslgnetn18sawci2n4rryyzch50zcfn4up9b2xgle0877ch1sq8isuwnnw3clmi724gi91n01si1eociz8t7lv59f77j7linw0locsfp29gfe7ihg0ti1sqgjkjr1epabbx4pizd00vvelpu3vbqi17z9zngk9k5itka595qd2sq2lq5l173nr41axt458x3975ef1h89jp3khufe49xeyrs5tsrtzgmcavu8aa',
                parameterValue: 'cksotnmqmyy21f6ji2vwfazmafeem0wt4o4g68b4h3xl6krjf1dnguyln8bgphl711t54z03kped5pu0nquwwp2ogzuzzmkl1k2zvka5tk9byuhyloifvd0c4o208iiltqzy92fgeqx10zckzgft1il4ze4ndzzjelben63m0gk67f44defoppc9oqsb4ygb5pffk9ikyfi70zc08rey5o79dagg0jubfqc5jto8nwuc3xqj19sflmdyda12hu6fuqo23ubri3y77n4yhfjr0iekac5q2s5uc8a1eacmqg4vpk3r59i6znkzcpkj0m8l14279i0j8qf6wbipa5tsseuzo0qcmp7ml133fu72wru96j0vgn0445pt4wm72o2am919lc3xikmw452dnwdv0uwil9rp0pf2xjgta2pkb8ccldm2ofu56oo3m876basxpkphdbj72as8rw8rtpr6cvg6lib4wwyw3amhcgtxizzw1fhk9uw0jegiap4c7x7b1i3in5sspm7kf5anhcv1jl4rykqf0ij49eec02gxbofpyuldfdwnkktkcdhnr4xe6pqhhff45cmj7g16l84vn87n6y5pfl70mmiolredptzp3di8q0o82795gnz369f9g3nwf6kkgvf5ferddpojr867udyh9an0gisggj1q4yyrk86vxk3zmuye90fy9j1rtsnp1lkok6z64h0ldun4ugu9af1qmkrk7uz1rf6mqxi8lyolrm9bf73421yww0eu6gelz2k9py9su6oqfzd98atk8lx4jkfibdlj6nl3adpb3ty4e7lpa5o7z0ompnlxpfcefmlpvs0f425uyw0pqhphqjbftxkfwh70dwa306ob986f384be7zfa6pjt31k13jo561gbcen290768p9s10femqhto591sxxnepjj4ltyweq9bklv79srzkq9dh4ay1c7s6gks0h4th20czsvmcsrl1py80bd5dhtsozagxjt9m11lxdxbvlhsn4ajwrioe5bfau0p6utdhcnom1v7r2404n78kwopswqwumbi0ulmod1w9pvcmivpfngs2jf77hvw4yr8n9wvjn1b9shtql6vpzwsmc5cfpupldmuh3q6svfus57q0mgxzphespf4xpztfydd4cpxks5w55m6wij71wwb9g93ig8vs0dwzn0izp9ticqd2f97ulr13k29bqidsv4qqt3s7vgjfavuuztnjxo60b362yqqf6k6wxca5ih4d23hcmb85x3oyac0pkmn82r8b5wxu1f8akdj5u9w8g2upm2zgz5rhtmi517hztiwuy4pdyjfdpuagulb5ybugt31kf8lrcbjn7fra8bq7dbbiwl2pvwm69xg54j0dd6xjqeeij72lbuzux5b8eokcv61kt30yphxznl3iptmak0tfdcp43iycxfvl86pv9g4uljfrlm1u881ed087tosmtsb4czm788gk6l70jcbhltrunn2tp1wuu0rag7n765eoahwwyn06x0b2y79drra6h10954jjydo2nwcvckdsk9iu9318wdy1u2u0eh1gejmyr5gugftc6q7g1ntsj734vk9u6fhdrx5mr41uszppclz6qvetb5j1pp1zhox3jamrlwubkeyw8bi8mxk31inzxkbkbpqji524mv74w0x18nc91307afff7clqp39jjlxondqv4ihatphpjfh2nh3nkywote11mboime5d8etfy6mlz47lx1vpb3iltway80gb1xcgtiq8u09l4qn41gnjhw1unw31js4y3qthp4n949mlvlnf2a5p7azlci26i3o1i5yy7ga6kyw85rf3dhuqnzlgqvwt1w9ydgm9i8xfo8dk4ot7fl4ewgyrprb3am3ekhg8avlkv5s8n4l3842y6p6bt6cy2gfau4etdqfu1cj7gn61yt6n9yaqop9r14rkk66efyqn7zfsai3svqs9ha2wwowx9hpmxt02l642pd5sqzsvgfztvk67m4euzusvkh822i23u2ums',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'hf7cnb51jwnf9ltq17wntqja3r01k87gftaka1up7imycq9njn',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'ojrqoey9wuufdyxkfs1f',
                channelHash: 'kvbhqnqgcny91co2bs38ohqsyegnfp4p8wd6w523',
                channelParty: '28gcjwyqsax5syeqp62ejs4juf03heve5hvgixs548uklr3nbvcqs8gqqwcplfs9njwxxnrhcw7qmwy8wqvjjn3tlazou3bc8fixyxqaoko9vqqql0dhxhlwp60s3kslo2agc5ea5uassenglyo219sk280oloxy',
                channelComponent: '6kw54wfd31hfl40hwnz7rnk4bn7hlbceos8oqn9awd2ldes7wc6zo9ep9gmvllsiakozoc52db3p63zmp0cmk1g4svlhg7jdcd1tg8ucm3rqyaztmgj8fv0hhlhzi85skbj99srb4vydwc60ettxrv96bp64hcgd',
                channelName: 'awpvno0jeylvsuqqu1x2f2fqarfte1kfsidrm50hj14yn6c6nahj4v1z6ufi9cex9zyhhpfrnx47aao6qjon8gf0145nwe11sqwho2lmm8lhkpbubucgvkzq3nqro44ozpuz4te6f6myuqi9frszku0dr642k8hb',
                flowHash: '9snedi54pow7j1mjs8ahnd89uu6t6wvhu3hn32u8',
                flowParty: '2nz7qobrabrhbc4wifejl29ynu80zizrz6gv4jgwsbax6lvdi6upl1p1ct9w2xdka6ja8hg9xki6vbsjx6h2ut4zk5m1u4f1kuy7yyiizzac0bm74z75odz06msz1uyjop1hchrnml6dzgnhfpi1bp0ogv7i7rxep',
                flowComponent: 'g59cggbwkud3lrn8x1t2v3yq0td9efv6pc8nbfua4lawz4cpbb2uvnn98jjhazdmc8hcbwc4s39c0ykj2qx802rxgkwlxoynr1jos8wtdvtd7d6u192nw2khmis3ik6htsdtedg6g1iigmq107isxi0z751meqr0',
                flowInterfaceName: 'vmt25y2i1ddfcnztmahb66pho4sabybbnisn8dzo60kydmoouuhp4j1u4umzmon8tygh8w518w6rpkeo2u7nz9thj9ynm7q1fb8hkodnbj2p23yt88zw0sno782x2puj0u73xijzhflwlu9q1nvi0wn4791zaahu',
                flowInterfaceNamespace: '48r8ncf2omp0fcd5iw4n31tx3gddawrvcatk4717dpch56t0gwbg88a4agop2n6sf8t3t6vgv2ymtcgopwhyul7dijt67zyvtvwkswseeegjnkn97bat2sscqo05r5ioi59cmxt7x7jhvli98uq7372hm9ryc9yn',
                version: 'tlnwfbrmuj48m4nvzila',
                parameterGroup: '4do3zfvrtufpiofa9lhiz9d3idha3tj6kc6qsnkp8udqsfk9p19tbfhr1j4pr9t71nclwh5yg81p4i8qu7oiz5zd5ebmendaiain87c7ldivhjf6ot9utzcu0zh6m3teviugms13upf2ygw44imhvxd2djexefm30dmmygqfqdnjk88tto09um51cwzqhuupzf4r36s5p5pp53rlckqgci0ae77f784lumpp8w9q50vy3u1iuleo7vx9saj8zaz',
                name: '93uy0ssz0gxjbdqpobk4fcjevau3asaq8pxe8si67udbl4hkadar69rvxxwm5mkpwedx3ymsb39h7qpceglhsvyivomv6ghmzqa43yenb6nzpcefvup1e5vsnpx8atgipb4caun8hiy0s8wy2uwkfqlx9l15m27h8tfbkdjv9idyz0z16n1zdyzxflg4r6auvdohxl4zsoy9sny8rebbftnbx1tlyrx4kepna03w8x05h39npc2c7wmmy7n0v160gpuea9machxw371vxul2tsh7d6h50bk9ny32yjw0ufawcsp4sz96hdk2s7db2k9k',
                parameterName: '3bmavoqpul3jeh8rplp1bahuhsnqyghxsehb5ouri5rg7xz8looctjjijiifx0zi0og8t2hugelvzdslvp9pzvsai79p2zvg57lj3rv1ci5r3ai9lhdmg4qh7jgviqmf1a85kylvqxkgb0fmbxhjzbrnvrdgru2jwsabe28vqsbuuqh75zojz81w30vdt8v7gy6jz3dl3ayegyf46kutxu12kg3ak7ukgtda5q1z5n3m75korqsnibpok5aux06r7vbrawtwmfuu43hbtxumtra57u8d9743fud7fou4xivkos6jaxc7o403o9gmoltd',
                parameterValue: 'qe0qghqlgwaza9i3ueaw2ryana1atrayr4d7iclmup1jdo95foyg9o0zceaxqhrxrdkhe0mn5fncahua6l3z5zmb2z5oz35sygropovwr7c1qn5ztyp8ozdwwxb4kmqqnpng3ugkv037u6xdfo956810jjw4verjihhlr60t2gy0bnuujqxgig9i3xti4a46qkqhb3guxsri5sah4nikzxdnm3k4tzmf5lyybmbhdtxfthvad7cjk3n0ahgbxn4ta4ooej8qe25g4wdnmlzgsrnh7u9pgcfsp096t7k9050my3lcuiiiqp7p21grobtnhcr3fqza443zxgcikj699wylcvegsaym8tagqrni7faln4naxv5rgz1ksvqnj5orl6m4uosdx6de4n5xaqo51zxesmoowqjf937744tgq83jdg9knf712ysiyhj7thfm8u44isnptscsp502ag27m3cnedmce4g4chb5fc0hz1fx2d97cmflclhdr23p1s8e37j7tfd7ddvydtgemmh9j89w7uapwobbdty0s5nqf65vbirv3dm82dnmms08sk5rbgiy1ygpoiebailh7lzxfdg4yrp2mbr3vsem4lj8epwam81g8e5ycoc9ihdzu7zz21r7z5bnwyq6ijc8z5qarjpnudyuaxsjbvjm1wpp10090itubw2dvf9g895ameepi851qfdzyfn3trqvn37vd1xldmid24c9le49jogycjbbgnlwwtq4ebbodek4a3x80t6z2bg0zle7pqljrbs8h3e6er17yxc8ap55vafhilfiahdeyw3q52v385i7mcd00o881pqum5k9effcnqpjg1u53pedtmv78x107438c31pb0ni1uvxmn9vvyj0ml665mc42cwviwxagwpz4yfh5u9q4rpbz1hhpv9d11mg2w6yzmjehx39g9db3hr5lfu6ubvfxs8cqxob49ujiqct058a5cektunq541ekeqahp9sdfims2aw3v5jklkfvc6fopcbtbk8asren4zw8d5iaoegr7rd10twjwcycq77f2p40u7ri24sfupsjlun6w7y1xtalh4jiawe9u1mp3i0hwhmv3mtx8e8hnxhsxxjzin5cg4px6if2n3iv3yx5c3uc0u0gwdzm7rqliqwbpmmo658lugml4nplvouekr3rie1c8lcz2p3tm7cwng454zcbdzylsh06w02px7lysg4ppmf66gowu9ctgburhw9lr1itfixi5me0i56ic4lxm4qft942vgtwibe3qolenuyq9sxe838nup6njg3ed57ua0z6si1syby3uaxnhki2kiglsxvgydh3c25nn1mxsxrpv9y8459xspuybekfmf81huhaxzcoalfytdu9erqcmqmvdodgsduxqga2oir6zj6gci8nibsote1jyxibehjwct38alox6blky7ewyc86gymb6akahxb8cpm4286u6sc0dekjw1u1to67j2zc8smw0p04br3llv9d7k2z00ldcszlovcg7austgxmxs84g10hutt0whz7nce3m7lc07odos65iilabn7zlunnbdm9eqfdwlocqx3r9u0jhr21skmz6gsyxwvo2y818dkpn6x373vldvihx8d2h4lgn0tpt4kvzbusymuo1kx7hxqntnwfu42garwrjuavs83ripz710xnaz9azzd31v2hj2qc283mkzzz7zpanlmlkejl3bh0ym45317t4yqnwh69qk21dfilfy5bgw5i9y7l8s8md4chhq0v4jr8p5i39oxirgpcukougvva2tuvj29ewckt7k7paktxtgydv02do4y3c543pvqiptzugnwwexxekg0q1l7pbzpxq8lttg9vcr3zc2ue6z9lsu2ofz7btlazi9cr7ahpw96kpdbb5srwxyuqm149pt23fwaj7dg0zk17jmno3z41lls2rg2zloy952nj3shchoorgaae32z8nql7dyakafpffgikzyvlqxnvfl6ss7duh7r3gpv73nv8k8y',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'si1rp4y0q1ywrdl4g2w49msos4b012jfvhrb26bcm0iguyrud5',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'rw92ndb7ul5cvmzonxzk',
                channelHash: '2ayucmt145u5s47fhlf331akhzy0v138xjfyh50b',
                channelParty: '54vy4neyv633hfva2zwejuvdhlpidcqrwdjq5air8xrh96fslhahnyyxhk0o3oyntykys3i1fs6e7dxnndqfxryveiwhaz04z4wbhv3lz4dxyx60jbh7iqpy2cvqoc24ainyu7lsgl69730gouv0u3lsnv3emcs9',
                channelComponent: 'k9fxe2gh4p27dsfplxlrdwu65arhglwz0h5jlvqevdb520x1w0ms3aw145mbjcqcfqwu1n2p9my520x3jsocstxk7fpcb2wzqd8fecuke77djm6od9tmcjt6nqw7vm5r37gky29ud27z8qdsmz7rn48giapc7b2x',
                channelName: 'zpfgwiikyia7vmelg0iz1k1ru1yaxc980fe65v1ydw2l3u23c5i3ovegr7wwef1p4vsbrgmij20u8n766131rrbjgyd4czfjakhx4r205suf3qajc0ae0qvabrj5jggfbouuuebx6xhniuo59w7q9ocfuc7xammr',
                flowHash: '40t1oxpz4kdgvfku398ktndpmgml5fita2bjsae6',
                flowParty: 'qoo09ki8p25p4d22wt72ld5ah5qy5qzvtruiaul3eydqn0y83mz8kh3g118zylia1bcb09bbm7t0farrnfbd7aolw7wszt0tsrvbsdinqnsck5f1arqk9p9hz6eagsp5vmsulpvfefq4gidf5b1juirvfn9hau7t',
                flowComponent: '9i0hfvma5v4cjydwusk0h03b1z7wpla5vmdotwgay6d7vaq0slzuwzf067r92uj6a2fu6z1wpwtsmzd2j4gu0vofphzbrwt0768hdrhhfbsyydvykx0r9cdow05f5dgxt2bgz13sh7yd0770bpf49ksftncs76qhp',
                flowInterfaceName: 'w39ildfbc5i3jjvw3v78mlxqe9e7wmoz1laxnjt73n35fdlol4uhw341uyyrnfhumhrdz6tguti5t9m1j82bgf8tdpgoj04vnislhmisiy6fs9k1xrejschv7z4cj9xf9ngeyq65i5f6quk6bwoxe5mfbltwsjp7',
                flowInterfaceNamespace: 'sfy55b7aretsuhbjx1vr1qh2x6gvtbzjp1bro1jkyfqnsm9slp0l5nvxxb40nejlp9a39nkkngge6nsiqp4wqqzws4shghunres33ehx45liivvbgh3nlxkertakt9oq4mylfpmaundx2ylmb86fub528ltv0rxd',
                version: 'wlxz0coo1aixn31fsn6i',
                parameterGroup: '5cg7tvbei9ghtu7mh5tblfu84ay7vdpv7qxz8xyqcksf7xqgwh0ih4hgecuzlljh98kgg1850y4y7tz5hy2ybwafdj4muptidc6asx36b8dk3ukbfzpvcbgrsy4uwvulddaxifqg84iqnvrfvwkhkeqbb9i2sf4lkjki7b15f14s98nzv0upwa60lhoc2ed2pjvp4csl9zlfezl57aq1pqpxbale19pee12w0hbtfhfm8dv8p2399x8dmrgmvol',
                name: 'rs5po9hae7g509wc8qp8mb3bg9lncw0zdelhkyurlo2zpbss9jd9wziw6plrnqln0nnyl0lmvqzlry58ee8pr2zdeiq0iabr631o95blatsgl3m8vk9luh5f6t6zb06tqyra9hf59l2wecwzwki31m9gmmgzfvkazbh4d24evmqtbfv2ztx45h24lfsvz91vdifowpe7x2pyesbqv16p32v5qmege52jq3cby3s3pnw74078gvcp12zcqtfqyu9e4yx1ol8rh9jxddplg114r6u5e18uv22qim4z8rx24c2uwgdx0ig6l5ruepmax8ew',
                parameterName: 'sodqshqdc81wlqg776h54q5yd2kvjec6p17cj4bg4vc5s8g7q5mcy76gb2srmvyiw170t575q0zc47rx29rouwd7lwsn4tnfcoy9hnk88yf5n0lyl79o4ir7ljjxxro3g2rvwxl4vtso2p1xoiwn8v8ohcwjlioqid6pywtem7myr10t9oitrbajno0xodgarpmug4ko74qig30w3wkoulinkheisj7igq7qy0skydridvpvjp82iae6l473z0ho83tnkqgz49a04j3wv1u4thx1qcbmgmu2bu9vjiu9gxy92elc2fiar2junoi9ak3k',
                parameterValue: 'd75npmnwmg6s718s8bfbwaa4tvv4sa3phu3uh28krr605oovpzg8jkryq7qxf61gi03ltyyji9pc3yp9pkqy89xvxqmacm9mvftp73qma44j9ibug2wy99p44gidwqjj36z4buw8lqhtw3blwgxffn25lp4902ssi39k8sxrkf7qzz4bi3kd9b01tbxrb8hj663s0ltcwl4gv7anir4fft3l08njxhd6f28j2u38w3u8qq5vz6wdu5aklxzpwn9jyngdy6clmycf84v9njkbwzrm0g4l30412qbmq0b3nv5usnv908l0l51gej1seiiktmyrdz5gr2x6cfoc5umy3uy4oiqyccvx5fifsmc5teyoo1or8mui06pdl8jl6fpyx9h5czm09gzd0cq67o8b24574b1sbxwicvkwuxsnmtenhvus0t00zeqwe0upvn0q0f0bu4fjak6qfszqzquou8ihbrh600vd3gzpd1hvszw8frdd7luug0larx8col48v2l4wi06823y2inlyw2yonhw125p5xyi50a8p9skuvvy9bm89cd4cijcfb9nhjwkoy399hfc69ibxvhlduv1uspkuahwed6i87x2j7kju5dt51pisaoxsoeoif39ugfg4qo29xc12yfzdxgifsw1vm2j2wdp0ihrgtn8uete1cah73vfw6to2zdw002suognavfz64i3qhytrdbpmg7k2wrtd8caz64rzdr3ymqwm67u39g7t50rzar1e7yq7xssot84azzuc0qn156w7a41j92tt7f5uwlttvt8skslrk2hlk8r22o84ggn7u4sqg07rs89osxg0bor9cq90ifandxfeug0d3o0oxilqv6uj2ig2uhyaey461fis0s3l7xe6b0rjmb6lrvy9c5ppoc8bp54ee95c4ya88jvtzolvsgmd34b6i2vbthbtv532jefjcoo7t64ovn12o7sca0jv12m8is4jpb78dkdkfva6amwc99won2abrir5bz5t4r8y3w7wkf16wc8m7ygmaqb165nj1kadd7ncdbqdqkhh2sfvxhtvlkhcg8q4d1o7z1s7xn5sqa247qwpkw7p61r5a2mzlolpwi2iy6qarmlo569f4xidgpc5iozx0pbps9pf0blnwgs735juex7gxpriz5z65ixo1a0g7dhhu65t010fybbsb7n5uljqdvqkodsiblby5uaw2tasz3v76p012lilr6sm3fu276us9julfgc6s7etvyi5s484jh1knj5tg74bi3uyh8cclj7zu56wgyf3sif1zk46b2fubcat6aq4znm3f1hbnb98lwp2ceei6m9k5z2oqqeskczknnnt6vyx8chhqs43sgg3j00lpa6fq03mo4oli3q1m7os1rsqdbro740irhlqvwdxtx5h6i758ourf41wqt35nwmjvbwvi60n2hgk0i80d9gzq6z49q4muwwgik3tr1uqzhwi3vyn5b36kf755iuxgwlczgfbrj7arsvoaa66dgtoqofqqk47paxpdkfugo78kqf0fynqifizmuvjlvj960t4tzvem1vzds16b3xyma2j07cba5pyyyl1mdpmhcocsdsm2x5s7sc6b43igayistruvqun0xjyql2hxwngyhicxqhbbv1f81hit31ty1emlqlz2j062uspl3m82ci19coahc1e1gtzpl69dcon3iyn75c5xslricl5zj7hqzpufce4lweki7gcyjr9zl80chqgi66acdswiaa08hgfgu42zl31yfibtwldoyuruidvsdzx3noe5tt1fhhyounr4uuz9dsfobahqpv0wr9b228mpdpv5czpa3m9sv5kceutdin7hje94m3hhzkjlphnpn1gj96qt2ujujnhplguz6q9jbiux2hteo0bqimub9oz6pl43ncmpu5ov09bnv7th4ij8nrdrwws6a2d6o52et5acroauzvmq7qqapltsp3p6knby03bvyeqdqv159qxlg7xjs2kbtg8u8pu35t5noh5wwr',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'lx3cbbk5mf4ux3kdmxcutc1z8fpzoshtio3ediz8ms9jdhw3vi',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: '7zb4rndufrpscrtz1y3j',
                channelHash: 'pvmftu046qogoblfokfs02k50lignx2eqdxctxaj',
                channelParty: 'mqyz0e9n1ighscndkc5tgkz9s49bnnli8ubn3mqdfjle93xorn4fic73vfhq7j5mbj83uwiy617b7u9or04jsyvj019i0fkutm42t7avavi4ni35sdyd6trps78647k6ncnepjojxb0thczj1s1sd86aqgl13ttk',
                channelComponent: 'px3qtmmhzvauh4e6bur7fpw8fxhgy3lfk59th7upn7o2i0dm5fy370r4jduvcvkovqjjvzh6to3p1duj2a9liwlwzvupy6uoei1ufcvo3gj3ekjx9eg0q5whnrggwqxsqxubhag830jbfkunk4v65nylta97rr67',
                channelName: 'vqtlfjcx2g8b6xbdmuhpaxs7427zcodz5fzn33os3q3tjfy2cqkegxnpayxjei1lq60o389vqiw3odowrnkyh2sszq80sfbq2t84iacyupdjirz85cfs0nm88zebbyjw6yvd238rn2dc3rb5v75b9zc7a7vpwnx1',
                flowHash: 'uu7ktt6845699gxdgemdrmakaj10i56f1uky3wtv',
                flowParty: '2jwtww0nhbhtc370we8949aonximiv58otwqpxbt9ou5qzl643plsdqowry0alz8bkbwnh5623g95vyvyvm6dvmr33m2dqdbudoczu1twsydp1j0u81y40i9au0wi47jalx8sklr2vz2pmiiqbmm6npxkug99pnr',
                flowComponent: '3q8gfljov5aca1w5j3895xt7y01lpfac67wqulo9ls5w113g6kj6dpdi6xjujd1pq4mqejui1y5wdw1lmm5jfu3lhu5blc9ayu111b21qmahg1jfdsdhnwh2mwdbdshpz8io7ymsrjjfijlvxcitdfoaasqwnma4',
                flowInterfaceName: '5ba6qrpcoluemowl25ppxlgvzo5qdh3xuf18qm2w2qtlqf4af2k4yt0f49cn1eunw4nrou1ux46d1y0oxw5nwahttbsq8fc8qkaqnqhb4ikj1f8cx2l7mp5piil9og10i0pj9efu8r98s5we53gpus3ecmben1u9h',
                flowInterfaceNamespace: 'hszvou05m2b3ce9dbwh8x5kwufgrvoom9pm3beslahngd46u9s1u6ug2d2dhqouxq1r3x9fm5k8pdcdctk56hq9gm4fm92cqjbn2gstmzk6lw21ngb1bt47dmjoa7w4o86bpxsegdmcbexa0mi6i9ewx23pn9zoc',
                version: 'pza5a0xlcf5lws0t1dzx',
                parameterGroup: 'okqbotzbd4z1x6nfd8xqrc9vjyulw7tflni418iy8308z5g2tvfdbvp12wsypldit54c0xzyud3lsl4rnucjq2k6lor892gzcakrtnwectwkri7y5i7nk8p7g6dcvmnq06aw0z7ognwdevw51owgb7yckzscr5i48jwg47i1lfdhutyjy7tqarcxg6nojh8v4ac1n3690hmmlz3iugx7hvaklsxrwp0qd0x0bjz22w5x5faag9xdiicxv7zdl92',
                name: '2qyabd7ax9gj3gfeyx5vax7je1k08k4pa1vgsgsovsmuipsw283h0ptrmsvp1ozz1fwhjimpddn1p8ahtkxdr9qfkhpnj0v9f9pz9lxemhfbdzb6y8re4ivkx6qfuofpyng0rri4au8ui00k4is7mkckb79ta8lxxd6mqgq406qc1p1pxjzj47cbl0x6zjorr05gl6ihbj7vokysvfeonh6rzqbio8bm2eqrcw4p70plls72byveppr8rbcjhxgc299xlgvepc3drjka65zp2yxn3xx9vc0hchbub3r4ibsim5p9buw06lq1aqxa3qrx',
                parameterName: 'f2mrhszdze3mhu822pcsleu6qz7xcljaxc3i2umb7px1xmbmm4cvmrgftkyo077stmkplhe5qrp8wsyhqu5aqky9apwgxf50i7bv1jeyeiipyth9cvugbx96pqkoamfc3bimj9tnd50pef84avjeqqkjijpvmpnddq9uy90bvmxxba0s68ntz24xlvmeei51pgaw47t36z6mgvc4lpyxruo5pvdykr838f6ofuqufudibb3ohqiz57x1o8j8drxvrmepgzzvm7uomb0gy8q1xs5m1prwk1i4nn1j669ubgtoqck69djfxgzfswbw7ngn',
                parameterValue: 'px2hdehv9a2ev9wbmx0s0kic07srvyfsl245l5y5mwv87y87qsglou2z5tcl8jwk6bap7hlnolonou5v30btko0rj8pnj8pkz97g9nwr4kjsv0ms4skngecpuj95cx60ipfsbkrirke1rzwklye73tjjd0e1z0dqe95hyl63lzz56500y3plde6dtg2skusltiq71t3dotw9wymc9u3ppmd76phpg0ztvojz8zhn57qmm1nlxn8ifm08dmfsgqgje4petmlzk4gi7mvn9fllondf3fu43swizbon0bf6li2qdc44i8njzu7aiezm3jfwu79x7n42uvarkx2hwmp88lr06adwmrlc4svucf83amjm9ycdpbyfqzkxfcc90nrg2w3glpw1bo4t8nqlcmp2gjfabhm42i2mor1hbzmlk2oca9atip0e91j0oxhhe38u9ppfa251otiu9vxjz8u4kld6c94cuky0ovysdxpd8k9qklvtvsjmoc3yty1oyxy8t6sdato06ypa582jnq629d3ebhpc7wen5dbm07tsk26uvwtvnzgkaw1ppz4w22wmmvjdk4l2dl02ywficmvlhhm3pocrthvbcgch9682t4o1o1umu1dm1uqwd3hkz8qyt5tcmm61utrplz03oy23trx9057elrwn6bnp15utk7xtveu5pran35sbwxkqxec62ogwz36izx2rtaxemeyow2kwczuv16dlrq672vb1o2z4q2bw0wxy6f49ftd4t7p6unmy5qttc819r5x3zja5aswnm0a52hqpabh0jndmt8ac669elex1b1o55ts4s3wmszp673zly2irsqvcrl5suaurayvg8ln6nvaulodzsiix6s175kyu4mf7gt6z3qz0oc6ufebbw2si9jtqkin7sspzdadep3diwo4e23dinan73ft0h8etj50g0eldwv0b81rv07e9ro84syv8nwgkvlszssiczykoso6aet867hm712dwop13clyj94vpgabv74sts7rflzweij3yia50orv6edpkals3yogeegp1yqeh2ncce2usg5ti7d16ryaa3t2m0ua9sdakcoyr770ow5ia66kl5a09joxf091fob1bj6eqkgawtt996s8eksdzps54ib74enfkqm3c13vdo0a6nuvnbeyp7udygd93n3ycd7ff5qijsa978442sizy4tcfxexcmau8bsrfn60iwkfb8tfshca2c6sh5izsqtaecg3f73osuvrta13iqi9n2tuqyio7p3lnrblqwog5smn9rkfk47zs1c48grmnmcjr8m0e1gsvc44chgpa3lqm6m5foykiktk0bnvmeo83grm4a5csjlv9m9zumldpqm6lt2p5mq0ygb1me3qp19h3ivnssm3036qrc7zcxzk7oqzvh1cnujzbzvc4vsdduw9d975thrywpatikhlx3nreoski9c7mqwfdwknxvipww0pbxptfqg2t2cuqpv3mvns08lfbidwwy897nlk5blhx8qagdhv0z7zfpemy7tvyq4vu1b8vxnjz2mptzfoypf4f21s3i54o54qenswi2510b0nl0yjyfb18xwl52n73c9jkrbouryrzk8n0w89hw1lp1x888oy7vagvme2uo4ods913aaj6h9tqxsyxq8bce9c3xkn7iyndfa11gwu72imxqwn0znk5u8m6it2idg9628x69kheay2ep05abzsl06x3qp8ke534p2fn9r0hi9qaon4ur6fusqu3o5ixfbeiilnz0o1o6k3i64ifcxoux4ddfdes0zrkwupwzts93moadaslbozcrlw9j991wkeo8s9k7m0w9zp0922tpf47fx1y5oyinrfdhfmz7wa8qygnbjo5vx7nog968qbjsgzgyt2wamiklppkh2604eqb9s9tfh6y5plqmw6vhkjn0qdj6iqglve619neph4w4x4xqe32q01neyn5fwstbkzdp33yyjwpkuy16yo1igtltzrfupd4e7p2atznfvtqd53t',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'yhgct1hx1pcxbomg08atd7pfth427hry8azr7tlobrm9vdfb9k',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'gbahbk8w6o6m4nwqiq79',
                channelHash: '4ofzne2rgeswrl9ukzpeczzp8th2r7dw5dxc139b',
                channelParty: '6vbl77itwdqf3001rlq9pel2ywwueybbvblacjo2sird4z69stynxlfilxhdirs76prn7knou9u36xuork3bcspvluk4wq1trk04e0j0jmha7besbcashatctqkjjakm7mye9rdlrtmwgumsbol3gf3lajoqd8ga',
                channelComponent: '6hdi5j0ydvriqxevyfaxfsr38cff76bnkgi14u1gm2hspeuusnw4msxg9b5ercngpjdflrr19r785kdi1tv64q2srh0ojjwmw6fevrupe3s5pj5ngvhz850k9j33xf8ifdom88tk5v42p8rv3e2jghg7vnbo8shk',
                channelName: 'ljfu75s6whsbxqz7z0nij27sygke69o90e7trkcwju4ivtsjhq00krxmj9pa3ow3jlurcnf8xslcbmjtqnqv0zsdic26v6zzd8fhi9mhtoflrcc36yp9hxoqpot1d4d94szstc8rrknbt2z5844w37dou5icyfkz',
                flowHash: 'pkrf6d954r332bkpr8z5b0xi3kv09ibezzd78evn',
                flowParty: '7sft9kkmupwjbpkeuzj2oxa4k2tktubdw9bzmwc27m78kc5f3hkkqokkb2iuwmjhmfeyvj1n92nn3vouflzebzt6kywkry9y005kyazqnsloipu6jghlv95h8fz7axcjy6lk157ql8rh47v9bdnfce893ay2x83k',
                flowComponent: 'h6am2c6kaou6p90ui99b7666oq3xu28yr9td7qu2r0nrw71tfcqsxsfw2lbv0cj8q6rebgo2pl5cfa9aqm7p96aq4cx7if020bsxugaw9314srck96b0dgtg65eui9eq5jhhctrax1bhgxu8xd2x40pmvezs2b7e',
                flowInterfaceName: '3lhke34wrwzphyznueqro2zk6j2bbqp8hptkqxdz0jyga4vh0ygnsxqboal86qn07ughmclgpfunh9al97yv7zjgk2w7kbg8b1mkagofs5vtszt4mmbpbvti7hfxvl1w0hiflbnucidzskjs25hs0y784qs75wgn',
                flowInterfaceNamespace: 'e404ms2i6h62vsijez7k1hv6btyrd7hc9j1ieaop189maq4uklqmvyzkcjyvszd9nfncn6kv8nr3gwklk5fumvt11t2r3kv037zj90z60a2b5ufph4mengoqudkujrs03k2v7josgepc94lzem61mmnhvcie132s4',
                version: 'ouudst8kz50v47if3m7c',
                parameterGroup: 'cvqwqpqqhk54ceww46425xhhyr4z78t94rekhxf6r189d35rmseot64pjhmj0cjrgghn1d6x1fjdatngemadqqud4s0bh5iay4896b02fb9rkwedptjo6kkm8ajwljgl7ph3vtwxgb34a72zlav0hzoy1v45lhxciwyvir6pul4x05j5ksutk9mc4r30u4axa5dcjq7tyixu42f7m8gocm5ug2h6gsp7j7x82gpe7nq74sfau4l0acnt12o1mr1',
                name: 'tm5urakvhks3i0mxxt7s81bjirabcym1hhixt53mjpi2r99svonjxr2czeyyght3jwrw13tcd6jhkm1exgcfu2gipuy5jfjhjd3xfj56tm6q5iif2ujyu2p6lpa56gxdsdtpmyetqx211nn4pb7kh50irpmays9hz3lp1emg9olfm1xby1w5ogk1xxsbh8gaqy4lnucj6v1m92k0oskc5w5f5isra4ziyvmr4v4vamznboqrwc6yzygugprqydvrz8xfopzdtf7b9vnkp6gf2qd4cja90s9unkwyisg201u1joxiwt5tdcfximesed8p',
                parameterName: 'q9kjyx14ldt6v03qpq6k0jfzu79155de7gdjf36yxfn7x193s26uco7glo86eeqn7utgvoxb2hn75xoad9fq0cilzdh2a7fp4q93rjk6pgxauddsagnljbfem22f7zjumi5bbg4c3t5plgpekcqb1klc5l2rns8luigyz50xmmprw3pfk9kuqz3e9d8jvz4ud0rdxtwvuan1tak190e4mippj5ts4g7ppjlfn3q16tt9z3ymrf0u1akl2h490iw6xu29yooz3vbfcrjrrw5n8h9utjp12v4uom2yzqpo6po9nch66w2pry52kvaggwp8',
                parameterValue: 'bui50axc8idl2kju84i40tkvotpg58afzrexer3ckukswk4irc1flgdj6bh2va9etjhytpws4l2nr43lcnvsgbguk66fuon88o8nppypntdx8da3s8d7xnvsb9meaaaozk80dxn0x8fuznwrzzibupsg46sjoqe4kc0chh6mm2h94o6kz7enp9bvlpnqoxqtfqcr6ohjozrw7n1onlafz5bz449n8e8b9lpiw853q1u6om8vmh99ltsinqqrb35t3ypt6vcd0uzudij9cbxeeb1jphyd79jd2gv5sdu1k074ccwpl7zjgqccy9893p19q1wjqtrb4bn4bgct9ljy0p2g0imxkp8xkohhc9d17d9mw77jw9on5mspnx6uqo4nqda1jbmc15ygay0oso119neuit48mxazr6gsm2y8c2yo8fer4himw0ti6dby91u4h2u2uwp17pr8mszu1tqsav0jggc831yihbbt68vlu3kcxxdyziteapqru7ifso2zu0jrxjvafi1qeh8bhtraai5i5i3kncmv7um7bxi85ujmxta3dnrt11m21gs67ax5bthx96h2c70brmchtjwl3l4s5gzyxw721ndhploq66hwd3qawn5ogashmwbr1nayyjlvf8425qtbk6p4140mak5b3eb9fsv5hvs34pq5xs3wa6vo21cgzcul16x0mcdwjmz511bd86sli0nkyvrw8x46qgmzodh56j853afoa4gmxragysox953gf7q9o055typ95mx5s2uaaw80uatlpxjnvvapopxfjurviwy3if1te8grcf37ax8e1xxe4828nxz4uz224ouoycsoecrd09129racelokwrsp1g8105i3iuelhhhvk8hfwo647dyugw80f2xt2touf9fnlrpp7xaxlna5yvkw6cjfekc0k9f1k7cn6iunwbews084z0eor8n1ur21lnylvjhw38ubsyfjswohs6fivk7iafahfb3cyq994zxyczbyup65tpg4vofgrt78doy25vwdabl4wagsoaqvpg9mu5cufy6xas4g02g1xz7gj8xufkl59ru33gflsfghjt5uenffzrhsa0znuadc7qh1w9yo9gxxmov78hct6f4yfhvddeh0ibo05wx9qb8x2qiutdwl7vj7r1pmc3f8f3u0exw04ry69snmq6cxo4jpq3re0uszy2i7wik5g786ho5b6pe9d5j54ujzu8e4022pqe417oo9qrjxq2xk84fcxuoewt98ai0dcvgtyh8cvj11x3mnw44ulf1wuxivd436c4nfd70cae3pw0wd8f2132bua536yrui4i0otqnyl3059r8f8zygsb21kg3u17v34se2855rglr0cf2phz2fvb86zb2md8fn0r0kuzltf0ae6h3oudg3h486kqcohgvneti1i6kc480jpncuzpi8ifbz9yaamxz55kcf5hreyajv8w8kowr6uerh692i2inyaj6sz06qrvt60yjuwub2fz8v3h0puvx60h9ts2fxjd2a21ou8ernxqgsmk0cr4l6accdqujb7cucsndfo9ueltpgkln4wf5ec8g5yb2olg45okongi3lnezxofny20okjn0hlzk5rbjk0d7yhmo6r2xheea573hypb7qdensxqdx4s0x80mz74phdygl12x0kxufkc8y9a9cemwcqzthiviap6lgm6ub7lslmb3b9z1dhnkhkz6brrrsm9kdgbbzj4wtgo4jm840u3lko6h9parvikhi5ud8vwq0a73g03wwqukrk5aa74ewbxgq36cxbv3wdmv58m1zwdvz32e00s2i0y6qkwjwyqcgq0e49j0gg6wmvzan6o7y95qe0h6lzp7uql9hwt7quq1f9l3bex523jrxlstrz7oarf8h7u5g22uw1ayjvvksgb8q0z3apmc93jh003luhxpbs21f0hbhik9ac6g4f95fp26ms65fyt0ys4q6ptjhh2krpc6qdksl6h9aar70iahx0o41wys0q5058wxq',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'lv4gk1hailzd2fcjmbikxz1gxs41c2bixlepynbg386a91fkx8',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'ttpsx6tanklkd39bvytj',
                channelHash: 'pr5xfyo0aondx97d0qdxjzqm4j2k9ic8kl7uglin',
                channelParty: 'a5owyb2n7847bshi5w4ll2t62af9t6t6tfly918hji19moe0z5k479gqndq9b5sbe35su0y3hx1n4s1ive7crv7fqfomcsgubs85n94kms3oft7890zxi6gp3v7upje7zce2cd906j52dqx23agrfsfi38fw38hr',
                channelComponent: '9ulzo2fm8dh0jp28nhp1m5af4sp47ttta21pavqwuby7rngfzn9xkbqknv46b49l90xwlg0y2jbtt6ffkq4qf0vt94ecc1pvdxlm04whjevvazaw7jc7iw8fs0psbs9pt7u0ya0b1bgzxc9deqrhmnize7nixbwu',
                channelName: 'equzl3wvw8z83j19bkp01f4011jagzeay6571e3rxwxc4chf85kd8lzqpk4u6tyfqz14v4sq5g1x9kec7c13q6gsr07zeyb20sdj2sb8lcdkf7yara44ymeduqy33cg7zl9htovg8bbiv2eafkhv9fhm15tsq2y5',
                flowHash: '8fb6jslrv4kyxrs27wg2u0gtzkmpg62lnw9yplt7',
                flowParty: 'nw1goqebkuife4in9y9r7v67zlmhgo34a45w9tdb3wdqavs5nh56c2dspsaud11sauolbynywxoj5bu19zgf1v8h1iw8gx8yxbtc2v00ycy20gkrft2ryjcxugz7l5ocmi8zo842w0y6yh5jrd1cd3mqi7rgswec',
                flowComponent: '2yj3m0xsl1xaxic95qwuv5yw449ucfkpsnaxjytf6h6lok0o6ihmepwzzqqfch4v2hzbnd5uliujbigr35saqfj2yc362520wn4htu1qptu4l1nm6wylvifbrsvmxfu2r37u8vvv5x2i2uonlf6omt839ulrqz3i',
                flowInterfaceName: 'olc66xnjyabqasft9i1rt3ptk3i46gzkm1mcmpdfpr8e02a1qmeckmgynufvkgftkifgpdlw14hr7soir98x86bmmqh59v7yilqqc396o29klhariur4kfxu6tq2w51ufliiur1kuuos764x2olr7mssat7dbz9r',
                flowInterfaceNamespace: 'dcz9xwvfuvt6mwmnavwix6fxal5ynxn1so9ah4bb5au8ybk2hcncpxurhoc73ak225lai9ahxg9rfegv3s90u2bk5w89rj27rf4ksbm3y6fbxsqgdxrcxc3qhfd6x5zezfaql5uivc90029g4n2a9wa36bo6c8d7',
                version: 'hnml55w61qdiaxbsshhc1',
                parameterGroup: 'ksol2ya1u30cqaac5bbn3ehhxqrnnt0ecdh29cjcr8wxu0zfgrtmzhrd0uv11hkce7n21fr9ct0rc71dgxa2rimmrdp6hgb1t9v3igiuex3zy2koj7gfjg6k065mjtcqou44jzol0jxi10d5is73ifmmpjchxtnunqeuha6ktmg32ot9wun0xihg32eye5rpjb9georu04u4ku9dyikrjmtxmnkfxifxrs1ikegyanimerxkoo9a4hs7enumdcj',
                name: 'p0nqpxk5djj5igyg5jpas4jzq1201ckyuk1wdq8ptyy6xduol6we48x79uqkds02eg8ahelvlhes1hzhz0pt44yt492p7p0z6s4fi4f69r1iwyv5jrx4wnp7qhi75hhijtcnrjhwvkzax9oot2sk53t65nn8g3nfqoy1fefm6jdxpj4qau9ak8eiip6snyv1cushea8dlb5dbg6b7vgtfrw76d3x8dod9v89fy01sddlpjrbgswsecoljs8fd38zl72y726ibyxgdl626xrr0lh1tk9meeg11t8zp5riz3m0zr732088m25oz3z51l5j',
                parameterName: '4rfx8xj9ekszeu9ocsrf004v5d7ig3pfpmtu538poqc1dhmul3gq2ui4xvn9nt0xtuiu6fdr4lzxw5f5txyful72oltvb4w486lj9s9slrgww4qgprczi7030jdx73s7ivxkcuqp6a0qnm3hoeoek012247u346tjsyepmgkqmpo6rku7vvw19a64ai8mu9701t1yfykoz3cfuq0bk4q0uncdnvw6r4ofydjcl3anetivo9txpmh635mr6iqjnwkrjafo3izn4sx9t4fn4vjmn3cq83a87wtxqzxncsaws7064hkkfr6zx207ca2ngee',
                parameterValue: '18gdbys0eocx4sp0fbgfm3otfc2y2rea78i3wsv8j4nhrwrhliu7j9uq6ff1o50d95z3wlc8ait9gk9lseozt1qltcgzvdzin20o0k9d2ozu28n3n9nywsv6wltijoaui0ymod1o1ubuhxjfp6qhpnkq39spq4fut73ln9xl5hy1mpjnp6q2g9hzrs4o09xwaf2so6gs8q441f6igdwu920f0zlkxy7sikx5qouhq7lg56ai40xwg4vrxrtit9ahfzhkd9xvnm5ifm5lrwb9ljox2ui2ltbchizk433vsyatftya6ibde20oqogtj15sv4ej3jmnzhgf7cjh3afe9ewiv9u4fmkstw51u9q9dw3wd4qhwzbn34l48megk638vwgyii1m2jv0cglq3fm7jbzq4w1r1t17295g84ktfemqhpvszjeaklekyn8jgwtnlleoepd5gt7l559emtk5bdq34irzz1t4pempvmh73u04axvefh72wsycxh8obuqbqsiip0ytisc5vdaosggtxvwmyleiuu4neslaipd8tari4tre1a6m3j5t81ryrxmkao4h3it7h8boei99wzu0oldcbuu3r6g9weul9a166xsotf60za9ml05od3okbrepxzz8ykbcwo1tqbsl3balh1fmog1i2wfbzjx81v3mg50q5yxr0og7pek695vnrjugjz7jg23x2mcac25ww064hw0zzxyele3h9zakvy2e5pypmr3rw3lku7tmnfc13yeriyrbaz6lf1vei7ai0l3j0e8yo43kprpi9xjylfii8ruf50dz6n61iwhbleji3en8zyoov33kea1fbk2k80w8g9v4saf953emlxrh6i5tzxhocx8ckpk11se3upqe5rmb22tb98szmixaogghyg6zts9clko0iqjy336qmwwu1zgvl2zlptobs3zp4lzek8imtigj1sgbkhzcn0vtzgg083rifdcdf2lwavda7aoxnr75om3jzq05vmsx2x4knqf0psttpuging3657d6ghqtj1mlp5gl5dxttl5uf708o7j2r8h3jbb5ljtrvxiil2dpo2fp2tbb923dia6rdlauadak46px4wi88zu56oed8kglnwfuo6g01dt6g319hr23u5nyqmpnvwz7qg6t3yr7mvzlp34tniclimldvnp1ayitv7pf1hwaxfe9bdn3mtjt9oi1jvqbp23mpue4sz2ymqyv8bvn6vcku6mqe4wh7a50yuq7gax5cphneyv4bjz9x5fwpk9bqw2ompvoo9l9u31impdo2rg1sqi1dlf8mc4yruej33ztb9mh6m11jsanl44p0bguws8hj2qrlpaqdg6z0vxwje39acxa4du3mja79u5iz9c6c3yrhe9a8dnic2iuwra6mn7hu9k0xwqg8zuascypr85u748cyjiv4k6ndnzlqjvxaiwpxg2ki2lmd41t23d3tlj0wfy2cvmzl3alvi2r9j2ll1j6726ae3jfbj2dofpqpnfvofvvqhho3mbxketjlrau9sg4cojqi4214ctsif1aflytnmj4tlpmq9e3pohvr0fkcggue5xyumqftopl367dig7mk0yw3rnhy5x5v86ukqs2jfzkju2pcu66xzuf5u9unenoh3vaambxp8e0h3a2n6zg9ny85k4zibiz1l4fox11bk3hmxch3kldgt9nbjsrpdly5ka4oghhk7v3hvtl5zzdugq39up8et61nq00xzif80duvabccc4od73tfmok3wh0uhdwiiaoqrrdu28zwduibos522pcpsnblc8ubewprhjdkr06xvh0jueqgq2na2mbe3xqa2l8e6pt9dkuxdlyg4x27ws1dpilyn0zsv9rqfow3xdyfgdofsn1h7k10wrvfy8sssgmxlag1oeo7o5cq3gediac94fxi1aemkcfj93r2s79bf52s1ywxmn7ouwu614nu40jhcz798dufgr2i589cx8250r8ywssoxkn5rncah2iwnu0x0y5anjv8aa2cota',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'tk5ffhkkbbqce4cfm1sxwy1yhvz1fzt9jyll8tdoxgwb7seokj',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'tohrul4zjf5bzm7wo17v',
                channelHash: '9l7i56pncyemhxpniqz9ve2b5ty0cxm8bjnoxgfu',
                channelParty: 'm4tnei4njehva33x2kqsyrcayu1zbuhzeg1nx6515oe7y9v5hyazieoe7lwme23zt3ivvgiklitbe3ifgbcxvc35ga3mhcaduci1s06eqicj9luz1dcvhjyo25ltamvyimdi3tc3icu69rk8ntso5qd9wz6tcawe',
                channelComponent: '7bwzvke2d2wnxi8c1ycsqp35l4qll180cu8s2mhna7oz4475qnsmbps6ke567vton36e08ijo32qob8doj8g7kb6e2gwyhh1rw0762op0n416aoi8oph8pls4yh0sntk5x2ww30nqqrk51zaeh2yt22bnwu5c52e',
                channelName: '8gbjozalnkd2ltw23abd2vafveuooj4x328hiewfd37mawbfuu7ib64utappxgdz5sr059ipo3yuaqsau0x35q4e76i9aw39y02qgxsfj8rrzwmpy3y6hop7k7dzka7ml36auej30om2ahchb2clsh1sm1u8sflt',
                flowHash: 'a50sqwwe0r3o6tb0sa9wsqh4359lqat5v61lczw0',
                flowParty: 'gfxpfqp7zd7k88nxs5r79wywst3946a83jxy9ms7paossrvc7v1znjcww64z6645gxa3zgsseu864clia3uy3ary7qv02tjpfvs4w8hiyuwkgrs9k2693qttp4lz7rpfzbvcd27dfhymlgd1q1z4m4kjmopho6ii',
                flowComponent: '0mh3ht078llhpzon7tjk26onk4c3cwwnwhd3gdzms60yatlmkixs19s5tztvqbvz47d44hrrjrmyabt4p3qr7wlniw2olg19ld639qyitqa291rosb29ah73q4vh7tg3fhobbk43n6jfxbfawd68nb8y24ibept2',
                flowInterfaceName: 'ae4jvhj48pcxoqc4jebhbi5asl2pypkasyn3zxode1k9296168nolsvtfssskylgx1160cuppeygxxc8viehb9zq2vagrm3q0u1vni9hqvicysoo0kxiguls4qw4983ufz0ux5gx0n3y3or4qcjb4vj8dcvxbu19',
                flowInterfaceNamespace: 'g4ozmpisos2lzjc9u4j9zdmkipwj69o443stp1rbzl4ksede27j8mdpgk6odqm7a3650b4dbd97jko3turx0eu956vq4r1fo8kf2p1leuo8013d7454uk4kr8ks6pjigmgsoq6m7t0ftckvvjj8wz6kt1b6apinh',
                version: 'glopzxhbbk1pqtf8caua',
                parameterGroup: 'abm2e35vt3z0241tadmkqp8xve09e0me889j1drfa5h2onqa5n6736qyxven2hj1m6m7lqzjtbw1rcqfy0flgt95hx8ucznobh1mpq0wp0eogculq41dcch6ml23eghokavzyqx25p1aufn0i1b8i8o7vu2ii7auepg86y2hj2pifhp314cfaearjmjehqtnaurfp2zrg6p623o8lbcm89ak0jgicm819qu8jo2mxu4y3h11754rr7pc3z61u2x5',
                name: 'a4zq18ykd8hmzj6iwyx06frunk5mjtz6dquxt6truhx3nxwdxt9gpsjqvx5hwxypnkibbh1n5c75buoddqm2pwlirq1s0le6umbiorsyvdvkvffkgspvf8l2um7b1y2hdma8raehc1g06ixryu0zqqkgjf7c4iwnprjmns69uksaopvvnsb7p9mxcv3pyv3zefs89se6zjxnirs9eoagkamuzet8fd3titx2hm60z131ephx17e39pled4or2k0kcdmttzp3xlivqrttdaxhossdezr3j98hmpx6bvx6sctsqekoq4zhsclqwynav995',
                parameterName: '56i4ut6z31sqkgxc5hmt5pbuf8p3gnwse7187kb7rsgc2sst3w9q5bjud4fw6qnc6xjg4ozq0yul0sx7lqg7noaldp8cxmf0rjyih54s28q6epjbkcxvqws6hd0ewbzy6sd5chwg7sg6wf57o1mq0dpmxnf9vfv9hi0v0gisxknq01enrrk8964tjizx5bl4jiy8jly537x5z6icyoqnouwalse9i7revn4s93g8r36781b7cgcxmlyog3rga1h6ypadza372fu2hu49aibf43mvib2jbc65v86rblg7gbdm32jevd3ovmekgilcw2sc',
                parameterValue: 'vkhuzl2zj0262jcqwfrr6qi7wf19kiil108sh5vt6fb2to47lshyrn1ue06kdywx6a27n4m68xptvp7clh4tgtuc92237o6rzz6s13co5xcv8713nyfmq5ufn529mbxuo4xyqcz80n5d65wacdkax69gf6o2hjcz01u0ss5p9s8i11pju3r2rfgdupvwqe8ff6un16b2krqmk45gosue91r4ceary8ggoum8kwsttu01ehpui3z2qvxeilrch5igzzj4bixz6zcpq30ycqnz1e4a887ezr514cbg67ne71ui9z6d6iwmb6rc27apgzwamlvk9uhhlduk93sqz8jj3p79ksp33nsy5nyr3bzunsxoud7zgqlcudr2pkp0wvv0momj0n0hinh7ssphoqj2bvz7buaa14xl6of9hxv56p94u0lr4ie2ssjcdx226xkcfbxjr9zn4f34o4b8docjuobymyuqkkejk2weta4e4w8zeznkhmq9yxtr0dyrkz0nll6fb1i3si0ckithq798426n9czu0h456jt3l0d4p5rexov2rnxdar0i8tgit5p5ywmag415aj3b5ld6vtbs4n0k3iwdew54n488le10vnu4gnlv20kx3v56i60lo3q3r9trudmh8yh2cluilgxz6m0vxelzl8i1pjzm6qps2kvud5o8eksuie4zc8usjqt0p7pqym72ildlhb33z4whmtfa04f8hypr8mf1b8leqtux6kvzhlioujlbmwqj6xqybcly0y8lfhiik7srbw9po9xxh3ef0joh4a250dle2xwsegcd46lgv8p56aiuk706p4alef7gt3kva7cl8cfnnbapkqc3x7dbcmmx7gyil0lr06pw4itceiwi4w0uz6efi0n0xg2nwqhsjd4wwsz6qmvn4fn1tpymppofhlhkmnt5t4ls3dddqme7mgp5tx30alc64ow8vc0pxkhj95yhyoipg7kdhis86wbr73dwvym00c2hw5jf4689gwvtmkys31lpadt2x7oga406z3ykslwu81hdcccu6o6mdij2369w8h3bjridfon8r7rxatbla5gvdak60syvxse2uqcxf5zejqhf5wo9et00swdut2qq42deyz6n012g0410diw5cwwnku41lrnvwc4ro2xqqksk6twnpoiro8q5adpu72ut2zglvem4nnmploircwo93arho09dltavdy4k6kmckaza8r1jijhfyx40nowisdftqlwcnor1xoc5gjtaftjxbgnb824xl3l3d5zigabbjirk5gwk7dq1ab8v3pvkefe6ur602dnk9wxs7dnq1ckyhr2uchddxldd69kq9urexp9h9lyo2v60ytqt89mm5q01fu0focj3hs0ufcvlxd3xlsv0o1tyk9ux5b5slebb472a8y7efolhllogu9fa5wsy1aa2g497lh08biyzgsxpwja5f9vuxkjn4xowdzwe9utxcxofybbjsqhdetk60cqgxuxnvlsbctbdbecfo8tgflqdzvgmnqzabgleazhrruvds8ct2hhq79m6dmkwra5sb52kra0o7grhihfidpgkrmmp1a9ko92hiue37oitpijn8mmf6m8uh3kqi5yxz7acetlfoad82rxcwfmpyrslpzgblaw2ahv3rlqyvijcam6p8hnog10f7ldaw2g26kx7ohjgd4eaq48ekxrhpktckluyh96z1xg4712a4w0otf662q3414v298t45nx3tfq1dfrmedj2a2gcjkn1pl6kdbxarfgc9904neb2dy3oqnil48v81ocxpdi16cjz34rjw82cv3bfejcxt0vua5ebagbw42t3s94iogq3ax2jzuylgwuixgwndvvweu4avetz0idd4646pu5ed8o3elqmmqz8vuixkajv8vl6hhwm688rwzmb8gnqokrwne7gnxhlf5981a2hmlf2spi5pgshs5r55caigvh88g9ydjirkn6pagimp7n05ggn1ywg8nf3goms9re3wpzlt9kg3bii',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'ncok8oh8mo142oi72zhiwkaxk33xa5we7549ulkscjbjq0uhq8',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'vu1x2wg0ce2odnx8zohs',
                channelHash: '9z73tlkqhhv44islc76qcdncex1381l850gs4y48',
                channelParty: 'lofk0ynbn5jtzir3yaa4p7bxzonlqb3x248rslzx7pprjp0bfwh0d3z1b6z1avfob61wyi2u6wzbvr7lvhppylgfp2g3qskg1zmxkaod7hfbsochud8cmy17blelrrgosg9fsdy1wqzorbcwjf8lnlgnbs1fc8ks',
                channelComponent: 'qzbokesydph1hv6xorxd6izt4capkb6x51in4kry75atw5c6tj1k4q0le5ik1n3fd77rwa5agpu31nv0eq4h1087xedu2imqjjbusrl465sojh1tz6gc6olxh2vd555lmfvjoqev86n9rjd5im859abpbrg958n6',
                channelName: 'z8ilzziqgehza08oqjscse445wkgq4pyplpysh0fjorsnyvy6s1nmohdi98adw5pbq0spimmb0v1o43mnd1hf5ghj8esgpe8z7c07kkub3qk5r7cn8g1hwckpfvxscxlcytkto718ghsjyyfou2sge7bfo6ij7ux',
                flowHash: 'r8lguc69rpk9s38c0yjfutq9i9bjxm08hqnrrl3f',
                flowParty: 'lv22wso8sfk7wg6c1ctdkucvt0t1x64ok8e944rpye5yxvgrfbr5nfklo0e5hcdtn9eirls32miykl9d5kc10xcf0ddztmrct8c5vvm3g4azyc96xyygsz5u58lwcvp9k4lu9vwvu3b43r98m334iajl0c31qidd',
                flowComponent: '2fcgmyoeosfjzecg2xcurujqbia9c6kfy9nlwtegrw8o6nxn0k2f55w3a2pa6ve8ny1etph61sjud6ksf7hgx4l2ehhvkug74she6b2zrrsp9b4t0hgnoo78m8ns0mzk345fcursiydry9x1p5gyb2teupa1gfyp',
                flowInterfaceName: 'ppw2fjt1w3re3z2t7s0b9v4m2kc8av3h1dxfsielsm689e60y6gzpltponon4svcgbea8ygmuxdpd3v32hh2v1o9lhmtl06w4ty87risg8pgkmqqsi2a3dsihh6auux3a8laybn2pl9e9mica5tc0i6i4gx8pgb5',
                flowInterfaceNamespace: 'tjjkhp5otne5de1qiwdcrwh0a11rsji2avymbz5t34a2e031mka8pbx01c4ax3w0hnsz1vqjuku2py9pl8f8k81rbt00tnpbrwioeshvktl4a78mqrd6h9xmg6hawhiykewdbjive8e4qcm6ey04y0kj0dbhz2lf',
                version: 'wtvp7actes7l29y92uif',
                parameterGroup: 'fhqpo56be6gm9oo3nfeyoies6ufhi9ij35havbb9d44t8zwz5pmaeisxb39vuddwyzlyt44r0so8p4lz3wmi0fhlpkdgmuy4kkrwz2fqtxc40jzs62uij9jw2ibcphm8uc5fbg6kl2c2nwdlkjj9vgn4bpo35tpv7pcqfereachxoykdnum7ev1jj8v9yc1664oz9hq0rll9kkpkv8kjqvfipugktzpmrc62g5tkjc0pb3fdwo4v7oiyayj08qm',
                name: 'jge7wcwyknu76brppd3helod3hdowixkg7rgap1vxuurb5tiqy12jmhj0kcapthm8by9e8mciot9naeh3qe30zqtt6udeqw2moi8r1l8mswd83sslducn4rlqotfezmrsc2o30hkpr8wrwmctuvruf27gi8qsg42vl7dbjmetalyhfp903qfezvbk01msrlb77j68roeorrhzhvvz3mjlwzdu0jmeitbu8r5014f3grvurjn2zwgr18rbrk4mxlm0zv0oypac9dyynqxoamrqo0i6fadwz1paq9hm1tfsmf0853u2li37qdyamrduczbc',
                parameterName: 'rb0p27l8i44q29tcf07af8rcvrl0pvthjlbzggmkqpusmu41cl3qui72b5jrr7fojejf9vpx7yybwv3dtc0w5pmkgjqi1xjrtsaeji70k6f0gw6id1fa8xmvqf63nwlkwucwmsigaxm8402tpl8epneb7smrm1dkdazfzp5kjqihcsz60spr7tpi8ig1kipp62mau5cgouve7wded7um2zzw682rs46h94do300f8xkj3ofrq8k6rm1uwwhqqyms4fxx532xn1nyipy5i2gf8guz7s6wjz2zy5lqifqi3lc0ngsnpgy1gka5f7nz63m1',
                parameterValue: 'o5ys3d1yksru4990a4t7xd6iq82fjsiktt6csy1ytktz9gj5508jnb1wubitq0qcszx9lja9bh29rtxp8cp922bqmj43k1mhfx8rc8g2s5cqkzfnafbnq7wvjmi1bfbe28uka40i59w0567kpzj1z3tt2hvnc9f84tyrjv0qhoq5we1kd1vx6c5hjzh2k02o2uhf0cig6x4rnv8ywn9asmcmfvvtnel1e9ldkk5h8y63w02q9ntoc4i66cuvb2u8ao9gxor09m3dpsz2tamcf0g1nhuj2guxjk0z564952ngkle7kg2vv4iypqvp43hqanynb8l1tub8db8gow3obpb5ijabaq2st56fk020ob4ja866f8dgjx7kx4ijsod3oxr4b2d06r6ci61gcejggrm6gvyok9paz95e1gq051ahkmywaaue5khagf1fkvqiwmxt2iyybkayr4fw0ca7ddm2fwhakmfbv0rkz71ghmay28vwdt92mthyqeww4ero7jyasai0q789ise1r6anur5inxhg11cjaenuno5zxj8zjhp2pa5xzqyluh5rajehuhuotla5bdw4b9551iabuxefof8c99e0ryaqbmilxo8mmq4c9u1pyuf1oasytqfiu644zg9kiqs1z2ubkwbv9k626h8x5isytae2o4lfvswd2f5qpefcj27ny77nnwn5bzz0v3037sxdcwxgk83cehevc8wj82se5vs08z988v9yezc4x38wck7bglouzcpb3fa31sysag13p8d4d8hd8jlbe9ee1wyp3ti750j4zii9orjg03xg8jb3mvynl0klrdm7gigepdx1t8by7cjguilruueveq0xfoovjkv2e9nyrxkhxh59pi68urhkiee4e20bldedbk271py96nva42batjalymgs0ghzz2w3zwd7v79sgoo7ivpyfzuu6vuf7btvd7bqfbcadha6k6qimr3ksqeiyz75yzrcbzplywo710ymeceq7im3798kbfddtu4vu3zca8nm8yf6rw17vkeziblzq0v8f9ig2maguxlymk8pig6piue6c1oa48gqmo0oivimjjl0gt9tqngerjh0teuhpi76kdf8zdck8k2flj3hy9fyq2avyvnmxb6lk7vmyyftn4wo7gj69fha5r2hyqelynoqv6zhsypqyvhm3hkgtcip5qfmotkqe7vp07pctdoz7etfnhwcz1nf00ilw3t37gkcgu2sxg01s7qdyq85r18tyc5qeqnv0lskmqc4mrsgb94p0l701d82x2owko56ns3k98vkg0ubbpjtx9jrt6se8smjf3xywecc4uhrf1km9xdf9cwf1a13vfmzhmyfsfm3nj8ip9inmwnulgj9vlfv1v6ccfb05q3251sclt2t41dyrxi3szbtal6x655tt3nikdqwgucy9h7jhmr71su37xm909bmj293w68bmx8qu47l1708y5s4gu6yljb4m3abxh1hvxvwim6yfjcbb7vx05qxhk2xi2ykreemt29whkz6l1rz9j1k46b8bf85vvcvs0dap4adldvkwkwqrxq0o3pj7m96rl3tcf1m4g8t3ddvdi9vaboasw2x5b2d5ac7vgh1t7izue15l70eejyi7rw3n27v8g0lt207jm7rmpq4kt57etnh3ns98dho0rlhyw4adgow2ehm54jkmes9t7mf3rb671vc73yl3ckcaqwvt56acqjdcokp52ilflrvf357c9kfin4ebsne490yygxgvem0bf5o965dfkkwithu0spgwzsyxe9nvjc3erbx59crfo6eaw2q7zex58rymh11gxyosr3ou5vnug86pofwgbmovxz253xw8hva41h10fzsi4qtzjbwonihl4o8i1ub9axm2nng2ncag6cav8cln9qt5z6tpylpxc505u5cv8nn3no42cgs65kj7vghi5s7sbj0lff0gctkyvgubs55hcjuhw8etolrst0bs26byxxckprujfwwml4zl8pwxvlqn9nng66f',
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
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: '4r4ryut9gt0nv0gj6rdnjmg1a4khkic3eesi5iacceibmwuokb',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'kc9q303s7wiamwevfeso',
                channelHash: '6jgn6kbo74mxnbsp85a8ye8ycq98nhypm1xkicu5',
                channelParty: 'y8c1ih866kml5dnfer4mc1iaribt02kphy19ut5r5ybifr99yt7k0zva1pc7zq1zh9bt34it9bz51wljc46q5mdibm6pwu6qrhsjddluouaf0uvgvlipqtzwjwnmrdojjkvfsgluy8h4o71pn07sn9rywejgzb6h',
                channelComponent: 'i74lmc04vx9c0yq4nar4ovp6rgqz5kttszi7r5zzuepozifv79bb1p5mxnwglznm2hf401hy1ypewbjp4wmjg137tx4mlkiqxuvjv9h8og8mjn5t7g66xfteq4vzadg76mayrgq9iiop49ahbmewf7gxceeggtbv',
                channelName: 'ulxx5pn4rgwww9sqgllmd05wlm1btmbno0s8s4yfaswsl9z00u2ta942fd9ts12vgeflz1k2o2shmuzxthuklkyf0slb9r7jp762f38jwy5ap63a8qsr4mq4gb6r7smxeyocev898kvynhprkhla5kwkefqzj7ar',
                flowHash: 'oaj3ypnxn0873bl2oq0tvx5nswwrkh12ey2l9jdc',
                flowParty: '5ajj30e6iiqi8jkh18c4og2amxjgxuixje27579nctpwwma7h2oufziwelciqzivb54qx3uw5q91odl212n7ja1n444z72svbeevjpk2j5g82trgeg9e9tsgxvdcagssoj1pxtiyubvdayhexnrg49uisbas7ylo',
                flowComponent: 't62e3p2gay37icxfawlj0rd20ffd21sx63nm5xrzalexs1lfnmpk75nnzkpehwqdhvg1apmwitqy694wykkbwdagffcspf7yyy1d2uh9d6hxit12qj4wsffu8dkenrywhfhdlz0xqqi23guqh2kps0hj1bdf1sla',
                flowInterfaceName: '1bt9miugbs0jzudux67l71kdp4nhbqfk29tk8fuo9njdeq6wnv3z4g9dfeg8egc2igto4otk76qx3rzjcziz6xw8i6y8q7pnp50klqtfraj7s2v6zleirwhjbabm6nuvg3czh206zg2hxr1yerrxxz4ult9lp49t',
                flowInterfaceNamespace: '2viigfrlof56hyrukf32jnbww5ayaourr84kiodmb6e49sa6nwnnbtiroy9pauxyvqu5hzg62iko7d2jvfchupdahbkecdp68e5fo401aqthe2pfp70vrkryotqnbda3dflbhkx4izpihrgud17hvy7hhnjct1be',
                version: 'n7ln9vnd9dvj2o6zn9vx',
                parameterGroup: '5fx1g9jynpcefhfo7cikg10273vvwmzypoiyjsin22fspkvaekobfg5x0gqzlwlzr9t5gpn8zb0dw5vw1e42856yydns8vix1jv2q54z9dottoo4k89hdbr535pyslprr2x51f44n4anoh94xl62a2e6yk33wnylgf5wgirsahcv7zdjxjtd0w647xz0v1b2vz18wkm400m0esv681dh7pfa2s8dh1jnkx7316g96qenvqijf1s3u6qqh2ft9xj',
                name: '5gvqawt4992fbqlmchozvut5f6lrz5s9wqqcah7a49c7rhec7md942ea8wb44yn3qklb1pke7l8w3siywytuxc8wpkbmxzh4em4n0jrobro6qhmqe1rztlg192slyg4tilh4v2buddojstcu2mthwtsczmhsw5sfafgpwqjabth9lbldmuw2tekkbz6brzpjexew5zw56hi4udhq1gk0ym76j5t4zl3h68ge73ux0kxum7tvef215ir68ki3uw6wyo2w5oa7xaagr5wg0fqnxdkzkzjd2k2ejolln4zl01is3ve5zyf5nctybbklaxk8',
                parameterName: 'lkrnslsj4zia3u2uibyhi2yr2jb45bk08azvdrkvhqhuxduf7qbft0ljbozkv28cihl28utbqifag0wktm325yoi1qehmw1m5sex7fiaru3ruyefhxoc0qmsidjm4ai1u0zwkoxfn7ybysgs4xycaecs411twfnsjjlp33dgul444icj3rpzilzc33asiglteb5v6iew8a9kf6gptjkq3ii81ef7abr3k2jef173dlavlutsferleqqfnf5rmwfdhk5o76dddps4c7r40a4ogifboiw54hft8476v7rrsxyypqfedjkqh6e9o6l6ssdgp',
                parameterValue: '5w9vzr6hjjn08xrscssx4l59o800sqieri5n8v8llg6uzctv9gn17me0nzbwmmk7iyw5vwadjuecmwl3p6yneo37dypmn6zbkqe0ar7sygufxf045p5g9mlibnu82kgdfd106ev8x7qs93xkut5c0q0ntx3dm618hazkdmgblzy9aw87jhy79ntwnuzahksa3osafjjiugpufq2y2euhp7lzs5jl70kd8zu9ilnj1tblch8rt4frqcyoe1d152f7s4007zftx77acovdg3n1uoomf0wbufwbrln1k5qzm2b9976vkce2tqyhzhhqa00erjju5mlnyeu1yihzazihnrs75ftw0gtopzumonbepvwh5qxtwui3e5zljrlobgnb9cpc4e8etuq8dilg6235ls392ef7il2myhp4vgjitclhe32gi38dra84zji2pued50929fq6erwds05t4j5eywt8cu0bc50c9h88aqjqhepodu1qpdx8i6dzi1ilzsy824nbfwey0cfep6hxnntpgz36uzxzrb9tc7gnrnqmp3ro3cpghi64npjva9gz6hbe5upz2tp47ja63mup089xc6tsc68hkxwj79u1imrlm3fdvhfcb639relr1esexwy3pgrtllp3wqx3jftcd24hqmr43d5vj7oxhahn9bn1dgcblc3lbro9dopzl9f4edg18mdn28jrvra41uov8qvtwd3hocb0ftpm24ag0mm70hm009txpqx7e3ue240bnga2dfkpnnhe3cs7ee29xefw2e1dhp55uh7ra9gezq76tr2dck652kg5l75p05deuio7gxpk9c1l1mwk5db1r5rwb0ixo4gppaifzf08qbhls2ub0zxsl7hely75f5b98gr71pqt29t02mjthttlcw02irneroq0doalfz67fe81l4mkngz8maxk78inlzpkbjiifwjl4at3jnlp5umyawlkhgvx9i7mhddtq21yakgjji1a4jw3ill1jqngbwoylyfvjhz3g27kj193ktpddnr8n4xiyqmojhadl3vtpmmqcsn2dk65w18bp20bh0759tlt6smxmojy589lwvmh82rm0gl6dhyhknvciz4nqezuvr00dpatf17yqcycru6hmm7gvx1so49m00oqgcpkz9pchaf4zwrytqgyevssk7s392c3yfhyxv9uae4199kdjoiu3sk9wvz4ocin4sjirb6w4vznp77pji13km50pcz4t5ekswodr2o65qs7moqz20lauc9prjygj356q1r37zgxxdi3sdl88or7x543t47np4lrvczygzjo0rzilv1rrk1615zjc1ivw23uxv801ozekm8fhu6ehjmjjyzyomsgg6av8zrahgyj281o7jwczui9feocot6n100rmrnzzfowga35afp3wja8f6gw76rlxetu1wtoqefx0z16l8goxk9hyehapmgkdcn7gmy1jevtxqejiwyrn6jdykzbfe07p3p5j5msyzv4k3m7bj1h5gpfyzsxmpaq3qxh3zlv84kzhbop2fv602d9quc0ulm6vsmo9cveitmvoo64fdhvadgnullnp28df4tyx9ya3wf53plde87rpvhdgfflxt2b7b82arsixpsrzumfy8wr2m7mzop2yu58elxuiaf6tfohwq12oungx9uma2ga84t9xosh47rcv9wynka0yqir2fm3c50hmtdcg0ctfn2rso3loz8ukxcisi9s2ihojp2chnybukgaccxtido1nupui3bfts0446swycy3gfr6chruc8vdqwj3lt8gizlsyfqvgb132x4x47ip2yu84tco8f6nhajebmakp79hokvul0h76cftlvz2ms4fox12mm15xrwrneowvxfpk7mtdzsla20iwiuk6rnzffydbryyafbx70h2xcowop31u6ub8duxud3hxcfcano3a74ub65c3q7p0477i1n1pyam95u23rm4ji29urwq1883gcmqtnhopk0dkx8i2zfbjmrw2e1rsbwe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'u8zwwnk7efr1gp1ffc43bls1723cds2bsf3n5qfl5tqj1yejkn',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'epiy2mwlbphkw3y14s4e',
                channelHash: 'cu4her9zf52f7jbv9jv0wuup3d6jthi4n0psos9k',
                channelParty: 'ipisk4j7ccxmuv3hb4r6511f0d98qu5860abs6fyc6suhzbwx29ucuzwgtkhqf47bucae3ejnz477064nithnlzjc3sq2em0m27qby38awawr2ka7ewds7lyotjx287gor7gv2qf5ztgrcbru6gqr8qiwleoknfa',
                channelComponent: '0xnwqxmg2yfj72rjtws5tz6i74kqw83ferv900iq26af8i6342l65swg8oqbnwp1980v5kofumxbcf5wbi777fkej0nu9dh71iff8bz1tvs4or7pga2jhentx2k6ckk8n4s4pebx3a495f2zzllqez9o0z4r4gfu',
                channelName: '27qx9mwp7altrn9g59l9hmoku7e1eym4udbwyk7yaw6qexzz1ukhjjn0ce02ebkyc22v0o8mqrefc2rxvppah8m8aauzlefjxb1ajuaayuwwrne0uvtqagrjmdq6hyj9phu9levfnlnjdnermsq5fo5is793qxu4',
                flowHash: 'e3cu4i88jenkutwwoyg8icwcg2fpsqo1p9p43lfg',
                flowParty: 'kvzlf3dm19y6a55zvdibj17s6pwafzc7jveeixugbxc6vmy0fan7ozpiwq5rt58i8a2wptng13y46npoeldv6navcif57oxvseedauchx15dglkercn0iq0wieyw217uxjmk1s1grg4hqmv356ot7w6glc7o7y03',
                flowComponent: 'ly8sxjr26xoxplh86eq8abc3cl94iswj621wy7bdrmtvifyrlwzvwnxyod1ah3s3nyqry65bn4xrsq376jkyni1qhypsp2vs8fmbba1ki3kxs1pxqqk7cb8vu74ikm59o4e0jr0c2b1bp82fw11i1ico9sz88mxw',
                flowInterfaceName: '3olbyr1sc12bqn0ybqqloif8ebmnud178nudbcvzpfu2cw5uu7xab3hgdhjihyfiibsyarx95o01143by19as0trx4bfyblyc8p793xjqpahoxb98xqjfhkofxfmpstg6wxnww2lqi285tf9nyng7nflw7kb6qeb',
                flowInterfaceNamespace: 'yyc7o6lwxkt0bkixl0g09r5y6hny5ssa5o6iju7cvw1xo70dhlebs83clvppsg4xvnymr18bwzt64extzk3x6ecddamvz9j18sbpzm2hnpwteui3kp6jbjk9tzm1jjfi7rzc0f9xxa22axm2cr5ndmub0frjpc9s',
                version: '7tilg3f505kh3vz55p4o',
                parameterGroup: '1vlejvaum8bl0k2rbyyl5wnykgjvbotd7rx1uuj8ozcmi436fhdhmr3n5pdgaly5sj3uza1hh7zk43ez9kuh8i6g9hjijp2dq2m0almet0v4kvy7hvoy9qmvuumuw5jxiyu37dtxj3xucq7d394bxbpudb77xkctlecgk2pbs3k5tmogeixp6s2g8cmnoysnorqalqmasyfhagowhcv06rr9dquz4gdxxh0yt525prx9n1pvm80iar64u1qw378',
                name: '2lgk3hads8mg6pbp28aouikdjl40w2psa0tmatrikszzbp0oh1rrdy6rlmz0we09r6zi5qa69mm942ujvykshpdjuu47o4dk027nbbaj0zjajf1v6xbo7y65p0rp2k1gqixjb4a5ixekvbsplyzjwurxezmmyx8faggwxls06e9b9f0d1v1vyyz1rye2r5neypafkju4ceph2pr34qmx6oxv3k09hf5dn0l6qzwesze30ipykfwcl7ojrvsjwee1d44ed2gvyw9yvfg6tyo6cp84adipwymd9lavyd3tporwivrunmjxyc797nwgugc0',
                parameterName: 'isooty65nmisvh1ebpny3uxaijbar7bhaezf896nxqoakny1yq67vzcttugcnwx8zabvfn0dnssthzjihw2urzbo8rh6cfta5leffltlsncty3e5hvmkd5ykofp0ghpfd2m5ipymuvf9twg7dbwyjwwqex4wshrrhqkkip1sj21hp5m8ir0cfmalh901bnbvirtfwqzd4gszry0r2hs71g4stadtki3w0fh5gzvswelyucsppvgeb76qwwusjy3ywejy1fw0jw4g24m7h6ar0safymsd7dcdvxh4bk9afencbaaoush97o10o2895k7l',
                parameterValue: 'nhsryhhopuidxr3g3wgine9brhls2s3r5znzhpcshwml84thhkaatupox6uxj46growdh5obi5sln50tmw66h5ppwpboxrha239myc58sltogniinst8iepd811cd5b40hxmrlz0pyd1xdqx6zoib346frhk50qx1drjfspg5ckzubkpo16k7uip4z1y7yhii56g6k8xhs67sh4tenumw2caxzfi18nhl59zlvfq7awvdrwo6nmp3b6tijvpdv46rpnolu1saeimvkxpbjyk4nqsve14oz0qdcpm46wojg6sh53h6u3ggol75ick6jy0upx34mdvnswsz19vg2qhvilyserebgauqpggdp6hb2orjfn0pue2gzc3eypjzt6du4cvifncsgk6c6mhhu95dmomagfk6274joc125vedcblgnnoxgcyy0ybm3fhvnsov0g3bwp00ideura7b3ys0vkcruv0f230rrov6o20px89isovl7gikblum3qthq5790yhuv6z2cs6vx7grm8ozsquertqq7y306k7fpkf6zu4yb6jdomnfly0zfzszjmxb8o8jtg2khkyzz83nbdnnkwmnmsfzem8t3wzftsoe32xfr7z3wncp1ed8705xlnftvek0ee8lo4x35im5npd2ujsphpcud89wcbxkp0cz5c8t99f14x9qvvyezfo43hgsqeu925bmnhpivf8kk5f0dwvcksiunaclu3xpazl1w7m9my78zw7qdzk7gbhw9kzsq4yci9asa79xhwikfw6g07692z0gawjn36l4q7mkdtfdmw4pslujdkay7vrsqv5w83qiomr5pc8qkfjigqo331fcky3jmfbf6jkqmjal6oxcwh7809vm9d19nlbvy5ixwcx6jqasbkje3gmbu7qdcgql5j7vj3uk8z0yahtzo64ebwifkdey7dnxx6btzqjr66z1ahqta4rkjb497x5tpdl6d0o77y07co66wd59kx40y995htr22ao29apocdx837p1swte4lbijs4p7teqbw43b9ymej1hay411mgb4ntd5dqqr4lmnyt1z3cb150n5zuiivsqri1yvq8w1akm24yqzsnuumcvaya9cd3edtai5yjs7a5sqobc7lfe00q2jc0ys259hestys92hwzqnggxxy8myu51xukkk3m22s1pixht01ojdui924uqs9c687kqyd3o8fjeoobapaae4aq1nvsulxn1aegz0p8jg9d9rwpy6daou2dehxqa46mb45pdil9lg8396ddlyp4r2wa86tma4gm1woh555aqxhwyek89c1ma8bmv8eer2z4wyopcd27mtacvlh6rd8dbvop13gscg5q0op81kmwpmehnc1m6tel04yxroj8qhfzggcj053pfqpk44i3v6dxfxbof10ky31pafxaabxhwihsgf2f58iryfk72ucwlr4ef5ygfp98ey3us7a9veb8fg4uhul9wmf5ma4bltp781yu99yf7euftyaju0mcoxs8w78d47zkskxcx1xwmv253y66su9nk2jp4f5ncpxih50mm0pba4z58k27uu0t62nh23rr7w1ggulu95libk8m6zfhxivq7wjto8x87tfkx4xlft9j7kobbcf9fcyyyj20agcb38dr8hl2dblk9dmc7yacm9j8hr7hrgpc1f87zsi9hz8n7d55ngrrn4z238abnm0ta6wmnlszohws27j3cxpqp7xog3e1peeulab7a95vazpa9j0kfm2grpaufioy4a04d3o72581kzger7e4jk0hmttl5lypxa15jbwefvjqfcvxjhfgdd6ur3iri8jqhzyeq1ek8qtp9ayob3qfk7xmbpgx0qg84ntkdg15o7sudq53w3cfpmtp5xmkut3208ojeqiifdyuji74ldj9eh69oudwzo1qefl6vnj3w1x7k1nunuti6xu35fu4n6tcy83myarxhlkhpy7sno4ngjux4jw5fvrb5eu1g3xkobtfxeorthywjd0cc1cdyogsx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 2048');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: 'x85nqpf5yts8lothvead4m3tc8hisnrj3kcsrp31oafapq5sra',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'vu5ju6dfmhl9dzro86p9',
                channelHash: 'a90az402ebgyfd41gahubd06vm1e97uwf4biiwdl',
                channelParty: 'ptvglintagq2xtser9nc885jlxdx5wy9slgan79r39oo6q62ty2fl0eqg85o1sn4i433788dc5cf6imkc1gapf78zf4ypsur6rke661n555goegict9bjl5p1s7g4o3pwh2aetfprma54a1oye4fe9d5pt318172',
                channelComponent: 'zu3pi7fsydv28xik02teflj2n8mvri36bw0dzgs0ct32oacvfu19f5o96fxv558xey228yvlx7g8va9kx3wu90kdil3f9jtwqd8noux4q5u1wls41s27zzs4h2pjeup7gdi6rujlr52b1yrj5xbs38gdh60l2bip',
                channelName: '6nwu8u3vdnewr6wv3oyjlkchvsfcx7ovn3gssfqo5tkpcid5rdbywpwhezzr726napqqnrm661x1ym6h4o911nzb9gk8s0bk584qps7aqlqb5ncixmd3ejfzl14wdt5x6bag9hj8p2ihoroytkh6v3qzput5bg94',
                flowHash: '7bgovn464hoipnc90tiducbeq00iqgvrchuoe6wa',
                flowParty: 'heejf6yzq19rwpcijsa8j3rhhpiv4fz032b5f4b3xfr9g2bocwq0cbaem7e8ez6vhfbxp9bk3eadmrlorwcz52yh7jw1dqn2im2fduk7e9zolhewsxefq6p9g5kn0tqchxnqu3mwvgvnn3zakxzgysi7b4uqqfo3',
                flowComponent: '4s94a5ig8hes5zli2jm4veelt770ri7z1mgpoa3v2np0fien6equkscazlzmvunajl7hwiscxn2fcqmmoysrmbv13cl2o3feh6qkssn0er3m88rmer1cjfqihbsoy7z8o59kl0vg1ywap3refm054sw2odwf9hx9',
                flowInterfaceName: 'sp7nfjdfk8qbnaprcuc66ptgdrku8ra6tzjxmxrp0xfgkb33gzllkdyyxxgw4udr7v67hnw8ivx7s16jqy5wrhjvx0l0dro06gb5qmxc7v2yt03tquetnxzx1157vsk8muu1z06xfeuia7iucdetjoxdtyq3ypil',
                flowInterfaceNamespace: 'cmx6dsnkbr5rb2me00ri1fkujkr0a1ipayvwrsmwdrd7omsw0btszvi4zrc1xle8oufuhrwgqd847f2nom672axtg2cnu52d5o2mccqqdhw4fiiws7zp0di71gn7fhkpbjs1oc2zbw2fomjzju3irqoh7sripbed',
                version: 'fti75icuz3bawd480e4e',
                parameterGroup: 'k49jbi4hkcda0jfbfmi1lz4zaicup84nwguwwsx2c6ht7exp8d7igxw9srt6gwnb0wzh0g07fhp168cs77tj3rg1vfm0oujp2se995a7ixf3cdv2k1ev80cyd9ec3nuz2hjusqgli1jzajvp3bbyham7jav8v76cvxy4tyw5ohcut42j3w8yvvs15zylt7ee8gbpurre6fqec58pmddjxe8064zufvqqbvchq8ovwxcam2cih7eb3vc0xm766rj',
                name: 'g0wrvb3jqykktc49tkzhplz8gf97b1fd1qb5aw4quqd8ujgh4yw5bfsecfe2wtt01sveok3cwa7xmc9fcsveep5zbyzw3cosg7qv6nt94vh4fqy5174cmjtfdau6vfl5b58zrou87jib27v1ca2uk9mvpv1u0uofwoo6e5x3v1rz2qgbroixoyb2tvkwzncz4i7jxfy9619ph6d9povh86sn2mfqfw7itrjrjg5iti3jsfuwusnqdaxffo3924sqnrnxrpdfu28u1w2xbtl9l91yf2z78p5s0owmbjyrpzszgi31liar1543mx8se1pj',
                parameterName: 'va53kybd8g9rrkl189l8pt1lai6be5j895in103yh0do8le1vam3qs1ow6l6bq715ktjqp7pjz4yacpxnxegl3m2axkwr5ir7rlior6kkpdzuk13du83rx8vk8npgnhnrqy3bcr6btv6ud7axmmt0k7vx6ckm4r7tbxcz3vwczghsri3ltpemzgslsrhncwqh1ziqwebtnbc9bx4lbm87rymyqc30jktysygyfgw0tmz1ujcpace3atu24v74d191glxb5y7iuzm0z2gralyhgw199vnwsrkm601d60dbyqnyd2rs86rky82r2a6ux7a',
                parameterValue: 'qgfdj5u6z1my40wsu7txsxdh640bjrze3uwmjj2u6dm5hc76pbzxf3od9gj703k8k9p8mzq9gtnos2hri7htkmaeqmue9wj4rr8rqx0hqmhej3kzw2ecyz4kl26tdgu0x2zepkiw86nx0txzt5fp5vy9bn3iuerl2y6u9u1f9gx0yafxxnpmk9vcx9enelhxfqx3khyywik6exv7y23shnxbd40naaw34qa1t5w1ifiifoundpkbyacaluaeb1u0vgv4mfgqez3er512wgstwm2ox81befsgz5uz15x0gbins9c04r5psqx7dhm9n9nrqca40spv2qgiysrtzmmxbnes9g8rlk903agfer9p4xo2rstaiw0tmh0mpfdl1k6vgyirwtehnlye47z8jipgtumhhji3lu71nsyl3p1c1beb5r8eoo8fa5x7jnjfbqax7gdw6yv6r2c4xsq4jvi1gd1h7mitarrfdxzpg38c8g47v4lia8xjjeftgi0slyd85vu33ap9838mgm21d2evgtmf1qhsl7ds2f9ban82fipzdekolt8sys5zcxxd4nodkcvdhgjwwwwwutgn4ugqlipsg4qcny37xgtbvvanz3mfcj5goc1jr4q845dhbte4y6tnwbwrsa2jire7imthbwqm2ty1yzsoncj4g9eg9smh3ryopddvhi16wq69kmeepi6q2qago9wbatqdev7sx0r53ue3q2h3qo1moxk6onp8n70gykd3or02s1mgq7octh3hl5uuf201lyaqiln1un52153lsmd3nwoe09c0e25teofpwiky10fnoi6sk6pdkg97zhvwmdm8y7ekbrjhzjc7nyvywsqpgamac0xcsjherxhy1q1k0y1gtcgafr51r5b1q9yimrb9xhfuqvgyaeyuwjt0ndtaov4580kk290h5un23lmr2554ktag15la826km0fqs1x0s4ak7bhqwp2uiq4lqphach7kdyrt0l3n0kuf1tcjdbocaxe7cdxcjjtk2ljeth4t2f6wf648g2f2vxha49ixvj4jw3xkif4rwbrnmjg0jwcgfaq81iccct5r1xwev7tposuk5yw1zfxfnkqcwefsyl9aw395ey4axcoy6r7wmcu98dl4wi3vantkiuk7wgfq6otkj1mfhtjc685vf7k3dfeblghpjd29dklta99yyen2yrxzbwoa7lm3g97w6opwktzq1t7q5bz62aueii59iu97zf76er31ckojotrkijul00b9t2xt8xjepf55ilngsnmb1kr531h32owbgxsz3mbsfn6ttr6q6u8bw04beha8b8iu8ws2ob7ukhnd21pwmhjei23nmp1w7v97yqfpl24vqhvxebaxk8p347o4ks08lhkm8r9iscxli5xyg51ilf2xvlcx05n4g26gho1y80oo8e05lurk04os4drmv5zil9ygx56u65zz7iq52ib22wzo4plh4hdz2nv9ghhpcz3oww4g09tupyxoi4v8dnwinc4yut2zpd818zg4w5q8s9n1153k39jeoj0yrtkgfa9ijrpxwyn90ruvz7bvkmxdw1p461m0tc8xnb3nkrmd8bqb7vwwzaaalx47kekj08a10j299ayx7raqvbdk9llyv44w8oyonbx5oe2sajw0yr464myhyt6nhmuri7tea38k733vx5hmf36smlh369w87x213s7c6t4dy1y4xc3mcy5wbhud2yrfvn67kr8zqfc9h4nmxtp798s369wk7wjob8xd5du9hbxv9dua5cl2oiuw5ikbefles03vqrubazgggl2a3wwjcg5ta84ca9h1n3xslb4h3dt5wnl03165wjmhb2mx6o0t28z7wtg418scqjbsxypfxvpnqm8fxdjqslnj7n4nyizigl92lbbq86u58fe3rkv6bxxtsdnu32lj9u7i40nci7l3uugkbxgsfgxcgnh8dvrkwo79b61hgl73dqda8yt8iibikx092uf3js0sy9afiaiic8malad4ekkak157',
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
                        value   : '3a9a2c6a-e856-4b17-9004-4e34f8c681f6'
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
                        value   : '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/a660b324-cdd6-4825-bc50-e6334b3fdffc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/4a0c7a1a-f65e-4765-be91-c482c20e1f5b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'));
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
                
                id: 'fe816371-e98f-4947-870d-056228cb12fa',
                tenantId: '5197d5b3-3268-4b0e-8f29-969967b42226',
                tenantCode: 'b5razrmmiv8vwk8stzm750kz3znsvqzvfa7b86lop368qlcjkw',
                systemId: '6590cc12-03a7-4147-afa9-0a50b33cf717',
                systemName: '4c2mlfl55a0pndudoxnf',
                channelHash: 'vomqsvuka1v8avwb1warlbf6aqj9oe8irfvth4m6',
                channelParty: '6vi01o35z2x0t2ddr12lhct37dycnnhiqptt83jsmkfrsbllqui8cqzqlup0gvygxi8kazz0kcn507ulyog3mv9bu878y6q9u3xxg3fuq1apc32uqquq8301yhfll4p6rsfa0qkm01cbab3sgnrtms2rs4j5qgwo',
                channelComponent: 'mi3nueqssn71fr1x3bmb4t27yg9rx95pbv6akkzscgm44td0ag0ijlwoimm1u3cjklfcrc82y318tydpekzbbfy0uezt8d703c2ev5ru19haulssh8xeyoyc229epw2jixc9wro7sk0de2w9tqj0p8fsumqi1x7j',
                channelName: '8vojsh1mxzbtig8gfmfscdbwh4fbf9y6j2hj8y61ojcseafabjizu0ql6y247arz42v2prp8i8nrv5c6dg93e69v79lhanx0azjkrjh2uve0or4wgza03ybexahy3zsu8a9qtd849itv2yyx0mirud0lr9hbblkp',
                flowHash: '9npkoirfrgga9eny9e3o49xfefexrgos29j1vhcr',
                flowParty: '9ir2rtkgja4gdq45lwxk17psduwcnxf2ibv9p85syfve4ag2w8dlse88qckb7ggmweq4f4h7x96ajsjtq9d6g3bcrdmqkvmzu58q9oh2u32nzz3pcjlhtrnik2v6f04u5wxlqq3157qycsdp83hx8rq083jhhe03',
                flowComponent: '0e10d93gptwfbqq9foc7jqv7orabtyxs2p2jebajmy9kd3pcmaxmkz0u75v66tc0bc58z7t8m3on3ayt8y73vkx05llfuulqmetg2pohja5csr4rlanbosrev6fiosaypuus704ltwe8pcfryx21galtooz9gloj',
                flowInterfaceName: 'oh49vgdjedyqnqdowskyd2kr5h3fbv8rslv8r338fw33re7xaijo00vwzejyzc6fivn1my2qs37f6lmim2l36s80b5p69rz4i0x2x13u7swapudkm5ehx8b7048h5ng57bf0r5aebez957le5kaa062h6gx2plpm',
                flowInterfaceNamespace: 'j32730djl87l2mu13kt3i396skusjmnjxpt03ichuzckt39m6i07fha89gpygohhqnrj2w2ftv0d0n7yoe4iqusud117gz2doixs67w7pzorw7ieqksg76zwh4k60zujdhcrrp51f26663foz1wlo5pgijpgf8ka',
                version: 'acb7twx0hb3ybt7xclfb',
                parameterGroup: '4mpc7u1adt5mhk195osdyi10wjxn5zu2ycvxceu1jdehbtftxr0tkmehhjds0mkfhsfvbw1uqth10mhqmj2jkvapyng5g3j13griz23jmj7i6leyluzs8zoliqdbgmhtfg0v6sjd3zcq0891nu1rpy4q9778nw8akyoszwcksszaim6sjnuw8bw6d82s9kumievft2vixoyfvz7eolpzfe6abx8gkyw6xqypqmenzctlmx7mzfxw98v9xnkizro',
                name: 'q28qf7rgsl8x8v18llfgdgkx32gierqm2krruwurhk18q0mjvsex471chptc2z4c628nb742uxqilkqg9lfujzjitimkq8505xzbkzzdtu0fircqe3hyqpsqzcxb2qqkthlai9iwz1xvkh2a454iqx7mmeeg76sh09j5l2cvhhdfzqve6pupuj3vq249rmmxjkccepawv17qmwqo0ane3jutva61s3mb6wzw0gp5wjkypvq8jayephn0mf2x9ojwx9bg8wnbnalz5o58g0bcxagk78w2oml8k6pqa6j4y013ozyrpzoz5f2kwi4im7ru',
                parameterName: 'g73fp2s61xxo5pylr8t74es1y97asf45ezqwpeb6jvvvdjpvbrnqh1x22bytli7fmzav5pd6p43rt6lqkc98aypdz2x3jom13svmliyncmgtegykbkq6tm28qkqd0r9acm9slb95neo7fuea4hp5utar3owqqv6bpyd0pg0ccw4g51zcixhqzr42caazbpojx3nmzgngx0wt26phhyld75iumrx997wqbz7joj772b37ber3revluy7ymaaa7ml595z9ojtasld6gh5pzqoudhylzvzjxz0n4w2v2g2183eh8w55eqnj4j9rs69q84t1',
                parameterValue: 'v7rbxdg2i9509lh8nqm3ne70arqrtqwb0up05qob3sind8jdvkcg6m9nyy9w4g0b52o7wcds1ej2nqgq3xbk7zolpshaggl7slyh8mmkww4m77ju4zm8w9a010i18dki6kvjw9cnr7c40bdz4phsihh3pri3gcbdhn6ga38ejalxg9qlou434un1l4aeqrwec4htl29b07h40khkpg5j2nae1pdpv1mz2bhkni5cp5xvwexe5bkue390g2yc8mpux5tz1mqwofa6hlytp3t97h4rn0brmwuhc1x8jv7dlp5wt9czx2yg5x86xt5hscu0iygmjmc51j0cq2teb9rrqx39cri3ntvhx2f4646z1n9m2l1o1i82loqn5tyvseao1fb2wr4kmftr4dg8osmrtyzqu9hrbuag57z654ez8tdzn885dm9ygfzo80issantigq3iiy1ytuz5urfelokcpqmv1m0tdrnrtbjdcya2oc99ypoeyn4hm4br3bpvcc9370ttw82bx15wk4l1l99mvmcp0f4cdsq5c5oq11oiyagqe7xujwdofuehdn3ltssuu6nzei0zxhi8kdsc2lwvuubtrmg7rpztksqq97kriwjtxhtl9fxw952o96mad04o7l2ti0v5y66edlj02svtvaowxw99tq5rhrv7s6f3twd6nupfieea1mw0t387jegkvmrfrr4es1btqyvlg0yb1h5kp56guevdf545j7widldna4d1l724nwrp6nuulc6vbo4bb0gwm9mdu204sk2akw45ql84e80ckfphs10bq9dtwfhvu5t4gpns9t6z0x7w3u5fstzp84fbunf8xk096tc0sc4p2jqex9sxuwvi4wi0rb1gtyq3pqnlfyfod6432iyrdmd5q7gtxcx77fwcfnef00xmuiaff3wi9d4eyvyyi9c8jspm9uamaqa8u0hh2ia2zq9m1ftx4g8zi6hpuorlydpeyi61gp2lvaepcfe62azx6u6nmlhslarnc1whfn5v7l1u0ji8s2bwpawc7nur7c2dubvs2gsd7j4316bnm4ylo1qpiaue8w2tbesbrxx490c0f1gc87995q9udfdjh8czxdg4y1myx24f6pzqhkav8x2v8ms3q7fpne1ovwgiavb3ral2sqggle1uj57yn4cd2159inx5copcxvvv4z5pr8f52yy0z332i3b20jiumxb91lnmqgq5gouqah0au7wyxa8uyzuuz0l4mespkhtgv46xd5d8jk32oyyivhinbs6tafcju936sjk4wlmz7ixk3bip7qvygjw1f4l5lawver5mckcdgl3c2wmcylxk6drhdszy4qm89gosmylbpl17tezg6hca232fcxcs2mrpag2mnkk2l2y03ownzswoy4ngm688jfr7omkeuimu9pbo8xs25zzsf49bxs7iv6yh8zuo1l3nia9fm249mm4x6vcwn82wtglyv65uns2a6jl1an2kd628kvithsudy8r6ouf9wjcnsl0yjnx4iixj2xz7fdgyh0c4uiba4sjtb876l3he0lpox4if60bsix4einr55cvs1a5283n8dvjzzzdm101ck756d2tks9w8gnt2j67v6tt983g07z6xn8umm9z9xyateqbp125u3hd4lt40tjo7do0194vyeo8ftni2i6u1emsqya4tjw0kmh676o5xnf6t2rkhbo4wslcf4lm35racgxo0j88gfoep6py7gog5rhk49b4v6xgymivwq3nu45wl88cob071een5xpxya81t0fdm2vz50rc4gfhrcplf3991ivxg6lw8g8uhxvhdxgrk9ee7ih790jl1eub4altdqq9yalvbz83lh1fvnoqqgbkv6jc873znvk8at04es9ev53jzum48tbpym4arudzxzsvc4vlewgsj6964xth6n464vwhink3p46ti4n3j5dxabhpswcs4s8crbwuuss3gkcq81u9fz2x1wm18fkwpky9t76y4q2n2abvio4d54x59khp5b3a',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                tenantCode: '1imhb91tfpgxwteq8xf9e3x4fdb7y07em2lpgwga1skhe7sx8d',
                systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                systemName: 'r7hsu35d040pqg34zxw4',
                channelHash: 'cdycu2yx0wlstqywb3tjbezudjqy6ricreilejtu',
                channelParty: 'mk175l6dp8eywxnxfw2v707lv94sz8r4bdek7joowkvyt78abitv9od8ncsqcpt9hvf5ih4vqstjetvz68m9tgj4lym9ua5tm6ixfdmdfzth5yh0iqydn0p740ptzl6k590q2vowupdvtfa28ruoxk9alo9zjttp',
                channelComponent: 't0azhmwrp0j906bnzj78wocoobbd143w8ud9jkbq0b3rslrqjbly8x3crmxqnc14nsz2hbpguxpcde8rsbf2vhblk6n6r173fl4yyw3juq4pznghfrwxze1gmsdex5mc11u05y9ehkvth4lxccf1nd78m44v412f',
                channelName: 'd83j1njch11cyh1970p7z3yhcqgm2qs7hwe3adv3ib5jpdf4wot4llstcsm9fkj56gi29c0kxjxvzlb54rltmnvjnte62le5e7a5jq0w1v93d82ly6xn9uam1j4g0fg5kuprw6239cbnp34vbn9hzcqo0yww9kap',
                flowHash: '5zlvoawzqisk8fcdqx26xmaeh98fjjd780087x26',
                flowParty: 't2425fdt3cr5aprlo6xqqwa5b4y94une2ehoiw5o47spmac9gkzc4jc9nsrv8oemsszrwk650b0l3w5mrl0btnlj7pnxljb0lq6z6pf5qvqyjrw19vxisp6a0yvzu587e9wf85t9y6c8wjs0z0bc69q60khc97xx',
                flowComponent: 'bhgdl3jloxu1tdd8vaik2xmzkl5bz6k8ou15rli4rx66pu247kajd6ylck1hr00l8xnnwa9yyq2djqbobzqifs7azb64roiuj7ywvbls6svmz223vfc0ik2x27q77uyx8kaswmxi96zhb1vy5fiu94o8ghu17j1s',
                flowInterfaceName: 'bj8liqz7jsixo3vk342tmi4vdujv9f8zwvp1ooz6gayptlwva5z2gvsvlijvqldkpje4y7ugp5vu4fgnf9tpogj7oi1lj4txytvsetk2pm50del8gsq4u2bxdb2eusxu04mw2h2rx7tj2g73nbtwip79m8iux3gh',
                flowInterfaceNamespace: 'verypuz1ymsshd6kp4lz8yd4epegjjdf06eeti5wsa0ip2wra01iqgl8utfdxkw6uah2w7k3gx9l8s62y05czcaw5tk78d5ttr2mrz3lum2a1xmcvvoy8k4nmf7mh7mu6hu1f6hzsjssxsjnmcs2duzty0kbt9sh',
                version: 'r0l9kuhbbbg5dzmmg8y6',
                parameterGroup: '14ckqe505ckz700fsox2ranwcvxyrecf9beph1abextnygl3r42atni7n2gduf0ha0sjr6gzxmux9mlt6zlvfkvdtt2f5gs74oxtlsxbr9i75crgn2qz9o9wf5kni58bspzt9jsntkre24jrk2dj7xlxnjd6vm4eojglcengkjya00ahircekm4b7bp0t3tl7xfp5sy4hw8trno924aww6d795aznp09azanoau7gfbmyahmx3fxlz2b77z8g8h',
                name: '3f205ye6b17bvu24dj9wk83j1hkfoteyklh10wxj7tedj9cy1sf66qdh3xgsowrtojvuu1loyj3z5cll27kbfmp1yhg9zf1frjcba6uwry6cpvu9dvjuqvr9pvnbha0uoz54alu6vugwysglrnoow716dy9fv8w3ywgrjfdq2k2sekciymzlbv2ji25dipelvcma0top9jvf48ja216qpwdhtnnm3je6zq8wxr774odb7b9598svl2776q4je53hzv1xbp2bh1xv80dfy5tdcpc5rfylz12j5dmfht9jc9fwn014iyqkb0pzshulb0bp',
                parameterName: 'dmferzpvx02nylos8nxpj6nsunhw83stwaamygndgd2i4j1qwlet1lucsw8ytuq03iztmbhn9c6cwqzufix4yht2lbnf3i6mvijhqo4ypy7d5nzjukmss4en74jq2i8h8cm6px8gi09fdjg1ctn3prddx5xeniejzj9eeb6mviv7wck7msivu6pblpsv1u4mr1ekwm7iw8rf338xcwyj8yqohqbtg2aeja69mazbgku9gzmf9r5udntuxglbwznl4c3yhw5okeex1nmhgzirm68ja1vxji5u0isdwsgrqfkp9k1254id86n5ftv6p30s',
                parameterValue: 'w1knfxb36hshu5f2uvh03m1smqz04v7whudr0no924u6v6j45vaaj5rlfovde8mzd3obax2mhl8dc6v94tum3j86u8do7iidqjynr8h3tb3nmmlv8m7d1poqi5is82eyb2asine4tou7leof57uz10d3w4645ig8y8sofyexbr984gk4uhtn91ytosrmfmb5cvvu2hlso9ksaafbwb36w4myerjrrkurgiz1winqzdleivf6t3e52enampyldf6a82nmafim1d8jn0edr69l80zxtbvpumdq7haaq518n8jvy87iqpjd0h7e6yqeruj3vezaa1yshz5wzfc6eccm4innglednmstsl4l24ns40lfyy03e2db561af7xqb2jxm51t5oi4s33v6cxmxy9vdajwoachye7noopdyj08g01ofaafrdd132700bzwms57kdjwna5z4q3hsqpbaturuzwlhknzg2zb3ztta83hpv76hpdtjnmg1b97rtv5kbz0oez8inbs9bvkr6vpg64m6j2h1an40r11df5d6qreuzib6eogtw62vhre2yge4yyfy3bacevubxmjgd63i4goc0hi19p3dqtmx138fcu0w521cfcvl0vk3q2ptly98ss1gu57zls3quxm6oac2ajlhorjgpykq6sn16g89k5e3zdc3w8nem57mhxr4buhfsheq0hvmpz3o067zw1apqww3y9o9kjyo7l6bbczwx97uwp345enkz4lih7exxa3htiw00219k2k09rtc9xshrtb2k9zeb95hwqfzwe6i4paryypui7l2z73alfh11islpx5ijwi2iqtfcbjgirsgxyqfpz3etdvtppzrc2ih02de44hbro18bt7yilyicg38n61m1etzpsef4drg2lf6tl5jt94zt5ca2uabj7t5gotmsvi3y818ak3mo7u2kogigax4da6m4j8rl549rmnxee2jwwklqjlh70le40d2nbypvqpea8e1u2wqiggyvqpt2x82cxb29oiuwdv276er4qef6quhwyhyiff9na27apotv43xktiaafpfp7b15ylyrp60xlgoxaie835kryxllok9iqoz74ss6ie0j47120rpnpcy3j1r70e2f9cblcvs6ezhkzvcqo8791hq8vs9egt0lgzvvascdorvlctfnqipbpygyd5e6hpy6elkpx10ivllttzj1flww5z4h58aei80xl14lorvvtg1bjy0jir8ft90vkuqxqk6550irzqn7lj8c6jdil04vw6z10tc865p5uudvan5qrg3y7nfgd7h3jiy27d2lvzqvq8fmggvmlibeuqvt8mk1my9p91cgtxzg9o20dwb3uw24d5kesd09facg1ptlvowioy6xz3v5a0zu8uhfohju7ga7s6s7xxwaejpvrqazhkhjvny2en64q6s4z82lax3idpt89704r4ypx65z3tr9li0h2gxfrb6x69y9szcfu9d8hpn5xjmi4nw45mp5ssond4levs3jzzz0zs2oug6d214tvwbe71lt5l5u909cfwr2k8ajvxtgy0r0wzz4e55pj1ga1foy9kts0cqaac8xyjcwtjrrvkoo9hml7vqebgnvww9ybtdqlijqmbf2uwxrsgtarr93cwha7ca4cn0thx3bam3k8q9fty3jq3zotb9wrijo37wvms6yt66eah4s8z9a97scx2w4aczwxoipmfdfraa4j5bnq20xbputxic1fcvak2kkmhkdf277nfqa5oz1gw5vtnszu7we10iq4mjn2sbmswe7cmxd5t448cjg9by2y3fijnp4rsxohbvvuxxfaq3t932ct1jrufjyp5arck26vspcnajhfnpjycgbxoj0k1dq3vy3t44nzee82ltmrhkj1plhyf5ghmngs3zs8lalool1czvlwi0txfir38r1dz7k3rocec23dq8req7bdrlnej8wbpzgo8thgmn8hix6260uzryk6momxmp7fdllm4olf5m1x2ll4p3hc4ieq2097r',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/6b411f75-018c-417b-8e5a-3c66ccc083fb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/4a0c7a1a-f65e-4765-be91-c482c20e1f5b')
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                        id: 'edf49455-0a2d-4c15-a167-23d985d7ac70',
                        tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                        tenantCode: '49nrc576raf3v3i1xxr8fmirs1mytjkvzgmao0yy8jhzam4297',
                        systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                        systemName: 'gs5s6b8hjnhzkegu4f49',
                        channelHash: 'z7wt3b5giufxafzijkytvqokxkymaf8i7r4ehqfi',
                        channelParty: '27tamfoxaqep4f6peg70o60kva7d2bfpog5ge9jvflztq7q8ol48x44g28gmk2cfwku8xf748arevu7mwofcg1806nshrsr37slp2st7m18uxs4u0hxmbml9idgtl728iamkjds4flxrkmezb118hy5z4ohme0ck',
                        channelComponent: '9jx44j6cc4x0hgg9lg4mtdun9dedtsjosbhu3mgl9crdfyna59en34d8o3nyvu6hshrric90tmedqepf0b7qqnjdnoooujzk6alzh9ezaduzfpoxi6i8bcc1b6f9serpguehyug0wt7e2c8pthjfitsktwiifwj4',
                        channelName: '87oamiqj4bkbvkcitabl1enobg0109a1otdnkjsu85sbdhpjtfu62q73twuhnekyiu9bu0krcapi52luj7ef3s9gc6lib7wgncj835tt3cae5umjmypw0r7ge9bvx4intc31xut7au1y5m4qdqi3bmll7au95wj2',
                        flowHash: 'to354v6n27ppvklp5pwwpy55v0x2sdmjbdhdda6b',
                        flowParty: 'gm681wsmj1t6uiblq65ud5v28dspbcrrqjd9a7h73x1mgk4gury67njhif3reacozknqfjfeypo0i465h4sjm8o1q9r6uqrs7iap0rm380djsaik2yauvlrzuht45k6mgm195klwacg4zdrzdxtsglunginrtr5r',
                        flowComponent: 'nenlvss7rt2spkcq2i81rg5p96exuomypd6gz7fi7rkrrnq3hnuductehbv8mag3cgcuggak0g6sj89i7a20iwudihvrf7z910vmsm4gy36q364xzgy3kh8q8wg6guwkmokkui1msei3xv7oqkos8bwm5nl2pgg7',
                        flowInterfaceName: 'zatd2vfege6c796s5qyvup8we4m6ccsk131j8h0dtny73czmnnfbeg91mohw3mhae2o0rkcdo62bhe7qq0uk7a5yvbztsggivaaqc78sujoc8klocltutq0s1m460s6n4wiypa8qb7zracc39rr9kcltp3eyeojr',
                        flowInterfaceNamespace: '4hg03428v7t7g8e1472397v64vaklwt86xnw8t5wj4yzxo1isxjmryc0vdcumiete5ifbuojyr38uk3634v866m8isdheweq1gmhq7o6thxplilnwl7b3qxnhfsefziqtsiig1wswzu0wvtharzordqchuv5bkl8',
                        version: '34cn82po0bt57pg8zj6t',
                        parameterGroup: '51mlv6w5y8ufhkr5brhx7np0b8aixdnoyof8v7qz8qocs22a1xxdtj7tg1kh1vtvujsadynzsyl7j3g4a0ahoga8i0iy5dywoeumql2r6x7vz4fds23tsf9eepgzndvz52v0mo92aviwe1qjv3bbpocz4b4ychjir2o8w035eoj4dpu1ik55j5pvlfyxt776oak2jdlnfk1qh6a0r3a1c9rsv5t0s3lggm37w3y87txvrmg47kkbtumewtw29zh',
                        name: 'dytlujjuoei79o68muglgdup22onfwqye0u740tqx6w41ri74y0cqmbyp6is88tv0ltibikw375mlxdl29bhh1h32nqnqm6myhg8xmif1si6jv8pex0izbdiybosjaitrefhjo8y32qp37c957rxwb5lissduixqndclsff8odmkrcp7mfr630z189wkhi41ou81ivld4q6oe3skgl1t7uegivn4z8me69iyyp5bzz4wulmwrrh50xcokr61sovrzq5fasufbesr8gofolcknmvl6zpy1yeyfa5jshvmnuim0g59gvqzh6pmgkocklkb',
                        parameterName: 'f1ax024teq29nouxwj15zexiq2y7i1nw0uiajr7ikfeftytgnlnxl4t51d9q8jlby11x6sslcf4x2gjf3kwu9tswdrofynjtpaq0vcfw1k0gyyxcrhcw83nnfz53eub2zvubmmxt470kybl2rogyvdgnxmahb7surychw51vagy6r38idawsz1uzbi8ejbr93z0c07cnljehopufl3cn38kx8xfabmsgx5kur40896dahotijd5777jmr6byiiwn5honxi3qzk3o2muu1yiilccbd2v9oorcdzb1weliqqn215q66qp7s4777aeike20',
                        parameterValue: 't2942zodyvzukh2zuvzmo7xvhmnoetxahv9rox0f9034f978ae7w6a72n1ki6tp2c01dduifazopb1tsx8ykwayfafny4m2hm3smzf0l9g7zoq08gl8kq5h3ui6gn5c1n73r3tcvibi59z7kar6eqh2yqn2zkvivu0afpj4x65kbb2w6foj7vsme7divt2papn3byhsaypybw1a4ehksgbfgepolqynbdck0kjp12zykzp8lxj2j0a45j842ydgi7m6yi5wm7c39rdg0c3a3t4zlch8xsqvi9wywmos6crndwm9zf50qfigxgd2v1hw2b96m4097qpzmuehprbgxi9o7zqmmoi7afq7nxccdf66egxswozdmjh1vpdpzxeu4ddk29578choe37u4uxts8ritm6yj08bofj02sg5jou5dypxuud1zvxngslz4mpc2bie6z1ehdwrogxd6c24k6882ks9lt621bkft7xdo4rzibdb1r3k852x2bl5bb7miqn34148fa46ckuyb89nitlt0sjrky8j4oxpuw4kkh67as10qgqp57eh1q3yv61pb4pipfg45ukuk1pxyl0vygyruikal421b5m510179u2idavtnkkfisvptlab6xa9bdz4lgzqm1tcpn1zdcqtv2psxi8eclpqpa7dpf2wtvvi5fkc7z066fhv48eg8tuwqo1unfyb79lrvh7jgtsbmsfda8zw241a3qk3pbpwzmqvmupgeklbetg6vmrfma97xl96580ci5mtdvluixxkjckxrk6uc2nk8tnsg3fat5y5tgzj8vptyym51lzam25mghfgjsijhv0bf91mvyma4np5fdtkya3pnk19qhw17wpa2xp8pq22ha156fur6v97yu3wrrtms66iltu2tj4evkhwcmgtc3s649muc7kj06qavlqyfitl8nrxuz53ohd6vvoj6k81l81fmyrulceiqd9c4xkosqslp3k7skaez0pwzakhg9faj3ysmq24fatfed2u887qls2sn547fjfjre7rmt0yc4dce2a37r44h9m75cb2v4pghp5m0aa8tfxbtbi6f098acz6vmaq64g7ssz0wrefn7b7cpwh14utkb3zw7pgzz6edteil90ya323xuiefyf1ppdvlbaizkjsw9rukgig4mxvgqahw4bj65t943jfy07lfl7bbmafoh0bb00qw0wieo06ngn9vtyybughs0jqeflnaleyixv5bssfnuvxet4etdp9yb8e8gabwwgu2vgjch6eisxnzbb5nx719ch97kr4k52gywckb0zu52xtkkx57ykmq5m6vnyiwvjbf1eragzm3t9mpd3bossqgwty15duy6uuafl6uty3eyhbzpryn0lb2oq9tvjrgtubzfj2l0g0dfd7fsxzg9q94vsbva7hmgo6h23y61nr8pn5r9u1x4cq22xdlyspc2qp42a35ef5z8u7x6s0vyn5jyui79v9s4x2klsm1fivg0ihoxdruox0wx8ls26f80w7ddu4pe1299fjxuhi7sol5ux6li9sppihkgh5e9v56av0sb1nf33vfle31red105nvzhfiaa5hdzh5cvlkfzjh5sas5alq4g87kphkhvofpt1ympw48q0l0mtmkynps998h7ls8zeasrtyquasdub2lyvncv3e845xx8h34zsh0fsxnj8x2kctd43wpvr8s9vxs0fwl1kogke6uigyz3gzlaovhi5k83tgotr4vkf0le5piuucanzgp7kuu4dwaw4xiogjon3hklf0v7ki1c933ga7fbeeazoulwsipmsszeqis1pzah19wwmd9yad5kmek8fzhwg5zn73gn4cx93jdl2ri5yl1wu8jo9mjbua6ml9dxvnr6qldzbo9cndvg0464ajzen7huwfg95gkktxiwyqkpbpi8dy964huepckjfenv6zkp59g6gcsbpitwff1ujce7j7b7g1lz9wylynj390hqdjj4jxh60rirslcoizth2f1o53irsfrt46',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', 'edf49455-0a2d-4c15-a167-23d985d7ac70');
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                            value   : 'c739cd7c-3a6a-4352-87d3-5c497af67fb1'
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                            value   : '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('4a0c7a1a-f65e-4765-be91-c482c20e1f5b');
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                    id: '772282dd-e4a0-4504-a1b6-53bad5e6494a'
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                    id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('4a0c7a1a-f65e-4765-be91-c482c20e1f5b');
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                        
                        id: '8d4b3a8b-9b0f-4925-bed2-80328764594d',
                        tenantId: 'a1554647-48e1-4821-a3ad-14cb580d5e96',
                        tenantCode: 'u5c3b6iobftib5re11yn5gtemvt2p8y0lp800atpk7x01ktgxt',
                        systemId: 'bc99165f-012d-414d-b5da-525578ee0b33',
                        systemName: 'lb2f3fl8711kr1udu524',
                        channelHash: '6xy1mfutsdd5uybuee3ek44tys1aq8wste0qx9de',
                        channelParty: '3vbf3km1d1wnn9rp97c5dy39a4bvds7oaa7voml2o6pcq8tg6viuuh2snes2nxe2jsdtmn7nxr46flfp0nqsh5xdnrsi80yfbh4q1mgapse1zxtl01blue80v5y0l77qpu024tcfregxe0vh6sit3oc4vqtr12a8',
                        channelComponent: 'ojffzf8bacog7v9gsexgaxnfcqefvsi4quqvi97o8abitpdjoj8x02ai9mtqjxx80qud3fa2gugc8fme1q89xgs1p2ih5dpbcmj0fkpu45tep0naf8tqd5v2kx54p53c46e07nu2n1impeysjtl2wpac18p8x5bi',
                        channelName: '3xe32ixqiol4d9dbh1e9r4mypujw5fse25i6zvcu2c18frt869kmlco4wfhreqetsey9n5a0k5hwjvxwxgn8j7hvc7fjoame94w84u6ln5px098pzv25xm0q6hwz3vbb8ie5a9fmebwbt8yx3oy2sd08g0cxelh8',
                        flowHash: 'e6zlj29pljykfiz16ly7a8oe16sh8fm5utbf5i9i',
                        flowParty: '7c6olhk7j4kvjst51in4c96rpzrzkg1i3j69cra1w77ocdbuwnza1nwdqbmadzr0pxqy6feoppis12w0f4bodxnl2dtyki4j36w3sjb4znyrp2vfaj1iitvzpcgum7z4tizhbhd23xgz7gcrxerbp1bmpxdjl49o',
                        flowComponent: 'a7wa5nxe8myadzqq4gvdt8hq2s68e6bsrg031fb9q0kog0ajtbio13dazn623vbkfsrgu9leg3uh2hclh3rmbrerpuyxq7495gmq8wdx4zt0tdqm80m5sotje8r10nbi24op3wvstztkvjsgjiing64q1jbh5a3d',
                        flowInterfaceName: 'm4ma356rkk54z0frnuj7zbcxky28qs2sqlyiqj1d7l2vg7wai4u7pyszvvqmivdrks86z2015bx74mhvhks985qpgejjqfvt5qs2gc262wv1m4xdzpb1rmb5fwvxv2x2bixjh8p8hxson6bqb74b2avi8zdnhl8i',
                        flowInterfaceNamespace: 'sn3aedp3d68rmy3uontcxrgdlont6wwe1hcwm0h3h0r1409cy3iq0ktos84zm7jlg9idfcx63hdo5s8loqhvrbhxrwikx3fha5hkr4u3w85iofnqjausb2khjyve3u25dprl84e40eg1sg13eg5assnmdbk2rq93',
                        version: '2q9no5dmp9ymujp8cedu',
                        parameterGroup: 'mkyd3a2uw520v8pr2b4618y1rccdwmh9s7uxomevqnmr5f6wr13e6tf4oviqx0biwcgq6ostuye00vk3iyzo9zyf0yxjgo4948rouiq7pbnd1fer974ieujetyof7gz8bgpvjha7440u39kam5k3xhq9lwxoaxuror2je8060vgx08azm62hb3738wyhwelm96nhemj6otcrsben9rrdxebsdwrkw51o31w4ljkufrzw8m8xmdowy99wlafwgnr',
                        name: 'r9t1lchmdmrxl71itbbz5z6jpo4uprtvoouq3xok7iogg7xdr7v1yqsldxeuozo9gwkufs4i2rwnbblr21ko3f0zrotul2y6b9w2ke6ino6dmuq3ovkvmgniix3z47360ctuzn25dntxbp4n4d2ruus7cwmmrigefsg7yt49bi3wbai6a1gcj9ungij06awh8t055ycnrc8x9str7xbhrr8m6xp67n1ivv53u4r4r5pv6oqb5h22vcta0wp340v6x0lkcgsqphkjtdwlcieyhexaza19xadd9i3wexk340pwu0vxwpjkjfp3whbsugyu',
                        parameterName: '3uqmcqbvwn56lm8uhzqzy6vlu0xub3jm1pd5gfmapaidphhsidddbfxxppgypbu8xid7nfxy7rwyum6omnwul6ff89k0poo87ught3wge8st5fme79d12tmvwoapq5gj4yassat3wnhpijxmt9v8lwjbkf9qpmomluit21psc713nx2huah1blgfoceoh28ftj4h4hm1017qeyvxt040gyacr9qp62nzoiwkx2wnf56x2fgsu2vd3l4feutsn1iwqhn0bstzknhum79om2sg6tndfq0470pyi2hbn5xivvwvlariovyxqxsc1hk7nfoe',
                        parameterValue: 'adcn1naytftm0fqt553i9tomnlwkpl1bgpkoa74ebfz7e8j56kyjcq2xm1nu5sc2nxpy4z2d1jzaxhtwo9m6elrpbw0tgnsfvq35uec0y97t3ho8fgrpmth3it8777mzhha0mj2oo6ak4mhjypbds7rkd5ix90emndsh4k2sd739pwy3zq1lzmaub11h68vhm4rizwe7jm50rxhun8zsxo9m5eadghovvnsiwmuw4pe7j38nkdyn7kal2i7cg1ks9c4hvqy1rv5szby2c24kkrh85ofagd1kjzo1ljphb5ci5i87szm2duybcnvwj57sysd4c1398x3b6rtjlc0wifj1hin9pke9by7vmjyrerxz1auacgx1b5ihmnxjt3evj5rvkhzi5wu9ylqn4z9qbp0wfr6dw3ox9y588vbkqrqcimu892czbhmgrmrsfh2f5hmbgsw547dxn9z8gymihfcc0fon6ovgh6olv1ct0nwvd1wl4ufnwqk7hubxkobee5psm7btwvy2q7d6ir8nvtlwshij0atbb64s9iglt80yp7dovtyk42jryjak0rnm0ka36lrnaf1lii04xth1mptalocbioiq105lel0lccsyws9syul64yvnatw4wo15mxn8razgdmhyr8bd9vrzdgk7ws3ydj9bxsqdbi7cb7cnk8rd95sp9ew2k701nekhhtesnqb5340qbwpsqzjye7w9dp8azru0ad79emlfuzj1bzik32a1clnfiqcm2t5e39m8utrc5ewkm8om078xixc5rtbpy5cmjliznhamelwdq4xwibrie4kywu0273ggs4o0w9o5hxqur23dhnb8q7mlcqoblht0yo5dtb7fqvzfosoevr3qlfijy6hzc16ut81zvbktoqlqjn6jjos2ssyrrj3bqf7jibhmddyt09aw389h1ffcq3oo1tgl8loxjthhpdr9z9mmap0fmu4whav6z4dh1b3f552hska0qakug31w8zvolftqblhocinodncii3ewu82q8c5zpzsfzqhiwuaq0yoiyljuzavmt0e5aa2cdw5vkt7z5n945enfuo81cgn2lofa0034ela4zvhfx26wn2vl97ff536766dvwo1cjszb5xcetv31so7wz4eop74tj0iag3uthysyetnj9l872b56j9kfrmzvereezkm3kipsl1foiok8b56rylmpmnxc89mtx5pbpjwme95b0n0n3nxykisvh2bd05yo5kkjshc3icmgdm47zrh2x87nb0b97dhnzzbr27vrjz9rzb14crl30xh7gzie0hi5w7hc4f9gjf7vlebn04ivwl5thjzza28yggkfwc63ym8xi07y3mprfqujpyx0ndawk73k2u7cu4cyvo7s27y0ncsd1q9j4qx1050tkanvcm8z37pdyuj3zxnbh3ggvnz8r6fq473qifpuswo40ckl1nn7wr32c5clw9av7fy619dhbqa1l27hzqp4mzi22ep2hbrw61n89x6v746jt8vlj9pfxqvlb0iunsgx93796zdgsulw9ta6tf11qpjs4h5wgjx2q2m8hdornknj6x8oxbjyb9c6dnp84wi3q940hag9tn0jcg9ce3cbjl2y39chsaa74cd5499a1fx0oi37vfmkaxym847qbfcjhltkld1xb96lefephu49a2m3cfh53vf04q0glj8q7du828minld8psktmzzny4h3z349fctqc8gkujz0iz96j4exbxhzi7yuhof0gpc8o8pk0uol2p7yrekm4u16gmdc2p5gxdprs99vub3kbk0whkgze9ea6selp8avip5e9z7nrwjgci3kovxqzlh6y5o2315mczll5aeoredw64co4q9b6xwiuykxq77ozyxiwvaleo2yiqyi5v8qajykud7dcj7j9z0kmnzjx3y304m4ttwz4zitg5dthzud90nvpq6elkiiqb6x5guptbjryc32o0wwgw4zb7q5odhvuju7ac8v25xqmr4462fpr7dpjmgd1tju',
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                        
                        id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b',
                        tenantId: '283f08e3-f20b-4154-8d0f-8ac1098899c3',
                        tenantCode: 'alaner6f985bgd9k8o8a1yjdw2pzqzqu7pov41quqlwk6mr3ib',
                        systemId: 'e719f8c5-a728-4983-a4db-90440554b4ab',
                        systemName: 'ygndio3nhkzovcrgzamh',
                        channelHash: '0mwhs4kue70v39ijexgxuzflylvc5gha5dm7vv3q',
                        channelParty: '09xff6t9oz9kx1h5cmyvvuzn98tpep63zr808ste0vi1cpbi1ou8x84h4uvenntp3p1zhnb5n3ni2szjdw38omrlindtn66rd42wu08o7yfae9xo46zepsdv5rcopa3j6v173tgx6h2l5oksep1yf1cbp82g593g',
                        channelComponent: 'o200if5sv2mbjk2txyroljv04o4397ibxjbjv3vtj256o6gan15rlr0javtdqzs62j5grd4gr8z2byifn7bilcn452mnhhvrwngizz11c56lavyy26e9av6uqqgfcef8sem994i1umnvphh2x3kbclbklghx9vec',
                        channelName: '5x04awgcb60jf9x3ikfezir9u9ve3bxkx94mxqxtr1vz6l8t8a8mqopxt6y830mvqirr8uzh5lopjkgj03l89y9mrqbbqqvh8j52u7uaouprd5a4mzxhpeyy2te92q27uqjm6xaip4itmq897nxqky59qe655fkr',
                        flowHash: 'zidkxeub6zgb7bn0ye5l9e2yfgaib28we95xy89l',
                        flowParty: '3hbpcuwoce4tysq7a3wr7777dx4k6xbumhxxty4iydw2i2mutykgsvklgtlt6d8u316q60d9ibun7bouf75k27wrfg7afxj4wwrq1dmp55ja6de3ke60kkqqp1sb155tcejfewy2idras24yd4bne7o8hrm6wn3a',
                        flowComponent: 'i15tryvjfr555oui3e0ny5kvb1l2g2eiae8mekz8x7xdha68tdyb4c8f7puv39eyypwiy9sguz7y3l4jvrzrledkfaxtn6qk4wb9lau93n99c4j1d6kqefm2awmeula14rijq9k51cvrvj49oeqwwgtnseiqmjtt',
                        flowInterfaceName: '4a5df2xdoh69dt68u5tpqczmuy64whimdtyh0oy3t3wmyevs7pikbidy5nqn42r6xdhy4ud8u1yvndzfa80hc69p9dk3h7imv8smvbi4lwk30qxl9ty2cz8471sjx1m97hwlz95668jpof2jnxxysw63iyo8iop1',
                        flowInterfaceNamespace: 'z9yjqeccvegqqx6csck1drxiv3bsn4q9me53nl3p52y3yo26rfpnbge170gp0vqm20zms36un2y544e4r8rlx10qzp2f2qfftmj5fzfce5tmfabgo6jptlu1sxi6fcqcytf2rv4kvqol8g06rr3kpk1irfat6wgu',
                        version: 'd0rnhspxc9cak7mkr4ky',
                        parameterGroup: 'v58w7lf2i2jmk1f2sodhxxdj405p8qkomzwnehcc2jyuz7oc0qrhvorc86gqu5bkjl146lfyaujgwe8qg1eyevmsz45uiznsbfj5qdi9l8lsxk6v0r6ljqf0om2a2ykrnatbvgcywyr2oitefdci9dm1urmr3rcilngggvub56ly4kd0rll6t0avvt1vzpipd7ibdw0ue7bcnqtejyw0z8lpf2h909dq32vfi4x2jj4acs2dur6gjs676njcxgy',
                        name: 'x3w1dhkc1f8d37cb4igwyndru8ipoo7qwbscj4fkjxvtnzpvr8j0bysfjlq8r3ghi0ned1e34bi021ci3kca7axonm5py3bumqqnpxymbwd0zv8fkqqq3wa5vw9ib8uhr5nkcefm1i7b93htanued5u36n5r304ebh5ul94lo7z93ih5b9y5oyloecejdn62mnck6byp8hvyidlztkr7p7edpbq22sdmggl3qaz1xg1gkguof38iwy8990ja5ahop5w0tlzuapkjpkjjx7t905tq97pyb9f72z3n6p5t6mifk3ynrjibdpo5r2mm2m10',
                        parameterName: 'h7azyl0qmaq1ecjq4dm943qciorztd8733psel0uxwgdh17d8b9tjvzgldy1smfmx1gcnx2ex2hh69uzovenjosinv4hwjhri952rxvyse6rks3ku2cjc4mw9vvlftz0g3jnyt0ipn3m5e0w6im54vz56fgduxplqi39zi1vp8xhsieiowesap4fzhv4ofhinj2ms6pq67hofnrsuq5jgtny8kqh5nk6zujfawwd676fz6zim4fkhnkcojyol9tkofuyqlame4ki9sgjsvkq9yx0sktzhglxs9wn6y2z95q3babhwik0lcf577t1rcxk',
                        parameterValue: 'yfmu1y9tijfb5cj9zik59v0s30nciw6mtu4gvxsvzyqvrcelrqpf2nxf275vqzns2xmlwrpz3r7g4equrejld9ld1djtjdiy77n2kt8hxatlptwjrcemvl1v25kf0undjfgs7cyb1rem3155mdrnfe5ckltqtezwn1nwjmnpeucvjsd0uikqtkqyymxfgdb4t6m85lbvrogddmkbxerj718raim1wp3cs34hbj8o4m1h9hlvz3uzxf4nz2oik3epmaco2x4477l2hnhvrscbmwzqpdebe800bkd0hx0lvmp5oa72pgzte8g0n3778lclklppgenmcjzbcnzmr02sxourizuxvotl74b2p43j17c4fllzviywjbbrsy3y976d6vfqjseqe2qi3jnejxx73g35lqwtsl006vew9vv3xe4k7txj2278z14yon6pi7cubc5sgdqr51wj1r2td2i7zixh160eu3gkgoyck7px61hcca9dseuc7bhtomto69quhq2ajnbucxxblmhdvxj88tzqtfdoj1sex0ldy9ah9zy0kacfdwiaul9nturqtukgwi6urjk2qiorldzikgftpi6noc3h0cgvy36momdjg6u9htk29dym76caprul9tas2thsvvfwnbpp91acijiheqog6xgobp7pomknp7i5wwsmbootam7qt9nv4ea9fjdkkhe69jvuai2h2suufy8ri05bbgh32cwljttzpwylln66iwgb8eyo4ndaon5zl2ys5yxyfhn1rt8j8js504gfn449cfoop8oqvdszquzrbkdyw23mgwyqemby81j8nff1iowzt00qbly9zytaijhx88berj9b5svodph94phj98s14y8zmqfvdk7amubg6pv8flwsmn0r7hhx7ylmcnqma4daytqg0ujmu0vf4z3ooid8r8ll0ratqzlqqfsj3xbmhudrwjthr2fcg4unfx03ssggd3ri3a8jo1t673dwn1g5dw0rm0uo2wkhxw1gwwxb6ry8agqkobgbydv6z3klw4icq18eqf4f91qfzgo6kexxod70luondjxzza732fnf65065hxglte0up4c5u078q6dkvyz3aa4zyw5xqfxhv318p6jdpl2yqs11gf5mg75rmy7bcnb8udpfrydqyvigmcdd6ojpt8sdozsbflsrqj8wayjec9s13g7smya6cvme05vl8fjah9ji5ev2zxinuvj3umgvsqchwytfwdb8kpgmvwdkpftpx6zfsrjh2buyb3r66qmm3p11c31oakhecyjx8s2aooq66dieeunp8f3ermgt8980igix24vhwfbjqh353sn71l23itlrvi87ctm89idfh7ip7qi2bat5zpwkw63r5elbcgvhurb1fvx8zbdxvdnw8r0eipjpr17kadn0e2w11nz7kil4h3mmj1ztmke0ik2dae61ixnlifj3x0ytclx0f2ma7rk77v5fgsojasngdryxtoingkwr4tqn4vxg63kdxerdrlmey8zgyrpqv0j9wbka2b4ycyd9zqa502yx1l7obr2rusgmepbnarv63clfl6fwrw2fvyvcrefbzcu0ef16n4ajaubyn6f2nashopkfxfzp4k71oievtwt8a9vbjf1n5ae75v1vt7l6rppmrh4b3tmjp3e0eynwdq2kol9keora7pwzz8ffy4rg5e8uxe4teqdgueq8vg0u6lzp6m2g7x6vk6kb6w53p91xi8cb6ibchzisko51spj81ud692cuj9o0vjgusway5loyqcm8sbta50ihr4qoqqcobjzjdqeivrwz4dkt6k4gjv92hink5xs9zvovwfc5kfjrxgh4o8b1jrf7xg1ud4tf9v9b2gsvp6c6s7yax16c9q5d0qf8p87g2l5eiwlgye37djt8plcp1ja7kthvs666iqa1wyjmmanwau1crdmfu63sht3xg8hu3ti0zrwawicsudorecv7agkc2kgnz0btm7l01k33cjs79o80wh98acdca5xt1osjefr',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('4a0c7a1a-f65e-4765-be91-c482c20e1f5b');
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                    id: '094832cf-9afc-4066-9d94-9995c43c3444'
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
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
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
                    id: '4a0c7a1a-f65e-4765-be91-c482c20e1f5b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('4a0c7a1a-f65e-4765-be91-c482c20e1f5b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});