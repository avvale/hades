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
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'td2buvd8wba22wlsxa4r0b5senbxhzr5ny07yqklnjiwxsuqxl',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'llfxv29xxiji7f3np6ze',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'qq55of5qro9farhog842d5dumwxxey8uca6n9buqptsnx56tjxl1zjd2t8tjdprth46xx326meftomddkjyhv8lw96kbzo2n764lm6targp9320eokyn6hkyjemz1evz9naul624yqifh0budofeddxab5xefuc0',
                channelComponent: '60mxq9c1a4875rxlys5qre67n98l77q9913pn01vfrb7w88ahhpw6dh70b38wg2eudygkct59n03nevsbckx4wn5ca9eng01hqka9h5rzwzs40kpkdz1r26dl6m7nlhu2lgr4aqkpqa2m6vln7yqu6dzgy06u44g',
                channelName: '2mza7jvquihny7rolvggqz8t5qhkvd1p3dr5pehbowrusa232bsrvo5oie482ku2vbgeyi43ni3cbjzmhz50f7pqww93a0qv3yp9jb6tpx57jqj4eybokzxtnlbglqm61nmz1kqo4sdaf2ja8t3xyagcx1rge7mj',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'cl0wfj0nihurduso0s932l37figgx4ecwavilhafnhm79ckhe0lzblfy1kwnl6bkqtb06iqs5i0wswi5ztgfm4zfjb4f86r2064yrl84s0yeu62gnfstu3q9kl8d3teimhaujxpg6512jn7brfaspflxh69yogmv',
                flowComponent: 'rxcokp938ydyvbn11zwuj6cb35nitdl5tsqsquiejc4cyt69xdu1up824ijgqemll8dj8xpt57tzw7batp1dbjxk7qs3c5bcrjb1ep3nf2saw0xmopzksiln0xgzbspi01wtbigyz38jvwtpmte832lgh6qnljok',
                flowInterfaceName: 'l2s1lwzl7nu2hjo4qdx9dlq7yuk2fc20gyckneq6ngw30gr9od6e56q8z9rt2vz0x2tau9e74w8c0ny7vm8t09n8vufnbf8d07zb5ytegtn6rfucsjamhniy7je46cvfu6fvbfsjorje2vlrbyz7ulb1dy394lb8',
                flowInterfaceNamespace: 'i6sxo2llib3g09p9jho2g6m36gf2iz8y4mmiq0k2td2tsb141afo31dibdhdqnjlv8p1x16lc2pblv208qk0b3dqbeyptjk0gvq55l0xohqrdkom8u4604gaxmo3rofav3iw73v3i2lb9u9aaw26ftampf36etml',
                version: '9wjqyo165dg87mjhjw1f',
                parameterGroup: '7nevv4y3tp9ojlkljm79f6zethyedpyjqlr4cp3exavsx1q2k78bvw9azmlw1w7gvmh243cs2d27f649fzuenz4so1aibewxcecdzmd8ew7xfwampehh0mi1ggdkyo2q0eh3nyq54d2ye2jnbijfmdbtzjwflkl33x062fgzk5z013eyb5rot59j6vqx0b3qtvto0jev2123fj1a1xaz7z6hrurollauhhabr2za7r0rhvkd636dx6j2n9dxbw0',
                name: '3w3rlflcja0u7qfhpcrmcfp6uja8f2xbdhgreacj8pqts7yky9zmwh7oem8ksa2pxf23i5l3x45nyc4goy25lr0ivj2r6p1g6cfyyyvjlard77cr97ztjkdshenf5fjabhpa6zc8skodptml50dv1lnqxqanrbq2f0946ufkwa3vjnxnu5fqpmpn772tlaoncgcmz3wt2f7shxpl1nndf1ctv3gjywc23gjrcurezju005q362mcdvc3iu0scnjfkzl44kf4sket6gd74ilgimvddzmlqo9er0rxsoan7lk62ahm53kju2ezxovq8vlo',
                parameterName: 'yky7o51cbw3swdfjac7sja826l6m4b5fmit6djufqke4fufre9t1zt9v1irk2u2fc8c5hgjb0e4njdvdei90ko3ebnuk60fxg6drlserrel4pnopez9hnnlwhggowelgzfd45jkzdq1he63y8ox2v0xjegp7jl0p76j73a38poim8wr6ya40v0rzg7v64gfaic66hemqc73yft2xyvjo1nmm1je647xi0h664s03hqa04jfwindb49ht54bobhabuf95j5viqlv4xbm3w7cjhjtmygwwkdx9f0jmu7yu8vqtvmu828wb4dpyeo0kh0ts',
                parameterValue: 'a49cz3miqow8hfa0mq08ba599xlt3uuwbl8locp3psuha6f8vh9f9dftpz04c5qzc7vznj22ro4opd58ns15dfwiyhr14flbeo9no5qe22w1gsst62ptprbzrzlyfch7rmew7dzdc2lygd8hjkgwdoiccc008o8izpje81p1570zerwvqeoapoor8v8padvifebapx8jv0kjodbcg1a74qo6wb35slfainzjmvcrmhc486epbowytwaz40otsmfupoztw59huy3ocygmynorvh1vbapt3krx2ihtr1ahnhj7qln3ij0pv8sjm21ncuoz4tcek481bit2it1kl6wpgw9i7puy3h3q9ryb8yi04j0afc4p2df086fxbil5sb6h1xrmt8vaqpookdebypt4yvrze8cpkvaqtyh36tkj11xxwq3qseknuge94f6ioxjdevfe1ldv2durux68zul6g9awred8nwdto9o7abffro4cp1ceovd17z1gafrvemhyy9br26a9kl884cho6yajjs19o5e1lhvx2rng2l3y2i4u4wod6tp2j4tmrfq9pxeq21fk07v0kz3x39jvrbg279jb1e3h1swgijglspvv67l4xj2c2psv0oru5x1n5azifcm6c621x5vhsgtvnpjp8n7dums08jb70l362lynq9somj04xkeuzvixudcm87uyqqf82xuxrhvyqrsck1cterhrcq8cl543w5yv3d4d7pl18z62j3gosqzfo6hj152x2dxwbfv871qh3ml9b00460pcm1ucp0cgrq4o2qnvsbx8lo06idnzk8vmvoqqma15jpdql5x45etywsfx2hamh6yjq153bi4kwthlwg3lt9jheqczl6kmo67j0am6egeinm8860ks4z1x8vwlocn8z3i9dc1zov33e3y0ppqrj5xkmxgsg3fhysaiq77avnto16v7533jbi00wudvvuv8k1tl60ac22fwi2nevragteo2i36xwkcevwdfz2qc0mwi',
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
                
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'qokrqmc5yohivpvphru6dseva20t5l0ddzrbv3buwa2sll9b2q',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'gwsbfqutk9okizqp189a',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: '3502w569cta4vxa7tde577l0m6zhyh9qkfqj4ngyjchk6wgvwq5rcm30hridjccaaesyduybhbiwatsqmnv09uxjt9a60tfwrhen4ranz0uv8ag3zslfg38gs8kx551hokthshzryc8uig9ur45oet9dwzuqf3wv',
                channelComponent: 'q14qbb24v6ziaju37jw6egvj19as3qhiljm94dugrf4dr5vbr75eqgbwnii6oaymptqql8lfln5hwmph2po2g6isq6l4rzlw80sgjwz5e6mzeevywp62f0h9cyl3paoi8hcznhe487qx7rdt2jn4eipxeaym97ex',
                channelName: '4ukeen3jo6lxoj277gpgzsyhsmoeqmokn4eb2h6gufc9l4m7y4s1o23h0d0mfiz5t1kefvhb1ybjvxg3sdzdzs466m3pvtb40rw03pdkv4gof9koc7bofqtldd8y67h076nog62lndwc3107awwpke2ftmwqb5nd',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'odmnjn2u1ibv6m1i5squf3mhxj056tbunv23t8m60vix78f0b83i2huowvtnvm1sr38opb807tbj0ynpc954fqyrnh0emoms1zfl3yl26eylfuaxqxmh39bbl3xdoeqglgxzdudl3xi7kbl8wk8ml64ysbm4ictf',
                flowComponent: 't4evd7r3pj206fqyjypp4eriuht8pk4kdhwut653mowequ4m1zw81ysxy7gext5f076nk3h5gem4xh1n85yhta7jejkirc5ciu8wfdrwubqmz4mxtwpm40j1dyydo1hqgez2jm2hxtbgeqywmxpezbjceetyayb4',
                flowInterfaceName: 'ly5ch6klw1i7i6nb4np091zniinua0c6runigw0iv6dsasvd67wdiydvebhyl0f7fahl3bb52l96wt9vq4fi3m7gzwzhlxwkk7pedybo73v7sujucbdc4vwd1e6dmqax84daur7wkaz3slnmrc2pqhcdfxpjqkxk',
                flowInterfaceNamespace: 'agoisqhmi46eusywsahwhrmwd56bt8tsv7ifhp09tciae27oymdalmrgeyi4wv0700jzxqlt24f2mh9c9gbsag0mhq43zojlw5sboyj6xvwl1lrp2kub0mcjsh64cpvh3zpdqvfvrw2h9xx2onbzk8u823sldoxq',
                version: 'v83ai4nspx63d5j2uwss',
                parameterGroup: 'nyoqyfq25mwgs3offkncvjq4qi1c5845zn6o6oaabrrhumd3qmppcrehoxpbuztxx1hocphn05kr04x9bz71v9ypffxptqxhpbqgmzefvk3spdoncybkkpu1t4w6v6w8bsqrhxw91fi9jd44p0aptyppofchxbz1f4axqw9tqcorhoepjx4ubfo0tcjoyk9s6hvv53imjccgvn9zkrcj5qofipqguwtfk916ampe2wjmapbic1w36u9fdbkqwnz',
                name: 'g29w6bwgw0j8xv9pc1dadagq2hoibz5evkp6b754crn56zwlxzxbj1qpc6nrw1p121sl6uzbvbu5jp1h09kz3dgqc4sn161ulpsgzcxqpnnhjexgr98wwn1lu53rna7olstet0uizdn8wv2m7a0bmkri6x0vdec3sn9j0d61i2m9z68fnke3p8qd0zn75a1um7zh5aqxqgdchsrxr859o4hjobjyq1rsz4rtybhwd1n1sbddvmt01agbihmkb5tbjlwab25mhn6v5wvk6zewrwydhhc3mtn4u8vzfedouvh8kflnnsgmtzy14xmknl2k',
                parameterName: '6wa3ienxzv5696kkzj5g6rvvgegfl2pnuk0oxc99m7qtxtlqdkj5si2tk2oc206ngbj73s2sx55ujh8p12s9jt832ehwwr60cr9tvlmegdyzmcenepo8grg9knzufywmuwomuv2skrdluqzd0sl0cgs80cdb6n7ihjvvdi5x2r2vc84e6n2pjdg22a2kopy5fh48snoopuiwfa360gx4t0r1gq5u76muz0g4fdjfklzh0dieona8v6a0fcfk1nf2hu3iznoxqx7zwsa706bzhiddcns02zoe4j38a3ajwza7vxm1cs2rno7zm1rlex4g',
                parameterValue: 'id7yvby1w5ymti8mu2yy8gzauz6g02mz1ng0j5brey41oe3564k04wr9plevbc832e697b9xtmt9tjtp592srq55uwkp9vveytkyjkc0xbv7eh4k6pcfhbr0citkcr6izida4c4qauc99of3z8gn4myftmyu7h30ralp53v6t98y98696z2j8hlb8m9n3zv5gujmsnxyxi16gs89ge2ziiw7wbw45egjmgz7vogir5viumtlvabey7vqnw4cs74q54d4sf0ojalk24q71lws391ugrh2rpnfppiix143oxs5nmdhmrgnmkpefx8973m0kjmnik7ub6lbc01et6wwnpo0f425qacrbnqsnctey5wzafv70m05md1wz8c91kqz3g6u35qig8fhjih4oa3fo1t0gys7bh8bcp4cvx50ze8gkmmn4xx1vcmuuhys1rq0gc7gkj1xellffoj3l6e6vnlplra1w1fxyzwgnpz3m3hqgnu5i0xa24x5m4ekn6ak0i1kuhc7rnrueh593utmzf98x0ovqo0amu5gkpdtqbboklkc7jpdiun1wf4yjg863td0p7gnugt8nx8mxczo2230uyeiw0wq4gfn2bcow8g4bnns8zjrmjehzbittgp8jxbz3xqr26ogh2smlyh838enhi785vih913so5qyanpxedwm479a8d1kx73n0swr183zzq1cw1tdwcxic3wx1q5f2aysv1sdjyjq90k63zvqh99qp923orkw4u3sjv4av0oapxopdp3vynn4yjmt1ryqnobl2u2r1o2hrabxrz6h134r53aca7n4a4atfovouj6j2tfuqmy8ds8z4w0twtn703wykd8lncsp6uea4cgjypd2bepps0uvzcp554qvvr8f30odghwc3z67j84lnkic9dpy956yxmdam9bhml2gkevldyglrlzs9m0zc0voiswipaglasuh3x3nq5wu02gp8xne7g5muz7jf5tsdsumbrwyu6vyji5662meclwc',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: null,
                tenantCode: 'd3499y6px8hduydnznv7nk0gqr89ex9ls1sw8og4axua2qzl9u',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'as2z4l2mniychizsuxgq',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'lrjz2knibvnlf2isvyn3rllt8lg179m4nsks1kts87huqy4ljlsu42t0ypxy5r1opsffyc41hxepxu4s7zmm3mbgbnq1ifqm23cfa6lhla6pr8zn4rbw940j1ac40lgl0fy1996ezw1h4hug3qtl8yn1sfzs9y57',
                channelComponent: 'bumhuneycd9sv9o9hswwcwx610a12g26z92zi25n7k84m5i6bqx5udmhxjr9itdm4cs2d3uanxm8kq2kh5myapbdil2qrvnip45xzm0fsauu8ahoqcspcawiievggrl9bzvo0v37wkqsds74km5jre3uxeqgw6rn',
                channelName: 'qqp4go9hx6u2hzbbiswwob54us00f2y3ldcpk0htnnto3xv7jzqryve2nyhzd8k0o6w9pmex52nhdu40hghu4yx10xx039hucjchww74tmfpbk8gzobym26wmgzazs11zgkt60bbcaa37ylec01ugaux9qaariz3',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'kohm5klf0fgciofhfj59610gsegsaav8cq2fbise872uvg7slp1579r9qqtrvis08yvfsa0ekp0kd3p8xhsusfqqh1yll2blqr6j1sysmdst7wth79xbgqesbs84eaaektbd0utfwvf0bcpn8u3y14b6fnyfhegz',
                flowComponent: 'iuetoa53df64okuhnxet9gc13rf5oc6jokcprig0fhdor239y8hcgfphrjf7487lpf23ttm8j3fdare7pts1c6vh9u5tie1y686dh7pt6y6amxhbak3cu7wijqesymhltgnlqhydj4jgibdsleic52tdcy1q49ou',
                flowInterfaceName: 'ioaendumcxz2hq8zf7ar95469q5d9dw3ye8umd3x1nktn5kz7no6g5m313eqrp6qp80rym2wio8o9mc98ubrffr1949rwvbpkjrs5ueop3heri6n9cue1e3mv9mp2cj1j2x3ykikh6dgzdr4j0i8ullgkhqk9kzc',
                flowInterfaceNamespace: '0rtbl5mg3uxnl9wcfd1okq76mj98diug63uwwzhgwwjdc1ioizmme8o19y5cxjgneieuixyltq9170lqpcpycwwuhgmhoog4ibpuljmuhyhtxw2jxc4fvo6xb80sra9ckr2oc6ce059dhlqvkimi9h6npblsr694',
                version: 'wfjajx4oonaexfpfygso',
                parameterGroup: 'v81nz7zk3c5t0mw98yovu2cqj7u0d15x6fec94n6ns4gsp2ba6ec6p5a25ykurg5e313lcfsz4tmoye59pczqgcyquxbnfmu3atniwnqlrg8q37oyhyjjloxjfjscjfmsaxdrawg4qoy6p76rjfizgs6z0q3ctz9j54a9m2xlb22lwo85zflgnzgwusjs7ewk4y5erz0ogu5kqqj5xnann491zvcr9onjcsacreagohz2bziujiz26ix25nmtuh',
                name: 'vdsvpiqjwb7jxo8w2roaxo0f39ofshw0d9v6qk2r0pcyv1h9t9k78yukuv7825c2frb1mh6pxk0kvjcn2dm25351odiogy8yqdoardcseu7dvpl6ipbjpj0c7bad0l3c6u80hrl5esyb4bzzzmjr7mur9chukwnpmp55nmgc02wt29orb3w3ifbpvcfgy5gk6fu7dv82oepc6rouv3ezkw98h25ja3lu4lmdl252pjg5tso85nvr6vzutmlqljqmjernetiy6tefml5n5kvpwv66vt9z2kahxvqp4a1np2mtxhkolo3bcjhosj7jo0dt',
                parameterName: '8mwgocsegq5pxwwj9iydg0jpf68e3071lu4ibxtf2lxgjan5jgbq5ow4g5m8zfll1ykxy3gz4ga8s9ea3qfk5hd99cki4rse23urcq6mzf9wl0q0zsaykm15sbgvih9tc8r08ojyp1394hz2a52ronhl3abeemu8q7l063ph48zr8dn8m2s60p8jg27dup6jhczjm1eyqowixvfg4jn1xvzzbgkdu3r03351ab2nteugb5zfwzbd7jss8kecf08z89xbnd58qf9h5xepzry5l3d3uu0p12w1di5unurtxn41o7sg6p8lwecxa6lf32k8',
                parameterValue: 'b23ta0t8geb2go1szmb5aw6rg3ibo3hifwcpnuu8uvk3ar1hf9j32w2jwpinujawbnsxv1l2suan05aftqf9cl01gkehglcfokbyz12mjr7sslejlc2o1n8m2qcmm18l1gtwozm09ijzv6k82hof0ckzvbv958kozlrcxdppikc2fbdn7t65wtrk3kkox1resb2tiufnrmjym60fdcm4oqtcvh346h0wzv8v02vfi1cfmvodpv82t6p2vtjoux4qy9px5ffbuaz4wl9e6o8r8i3ghqfemukff58w6l6x9gun417oo19sizvissowpmnlc78qmvak7scsre59r6jp7u9098l17herbzsjr9laxenhj231yij2td36wtxns3afvsq7mvjl8s0dqpue8mew8tyftsz2jxs4kcojwwqgrovmv8umb5xxy2wsnppmcggueg7tk0yicq4j3jcx41esjs872tb6vkv2k8ttnkyqnunvtrypouxvshh7ae0tvgodw7n45tjhf6i290tw7rrpaltfp1xb64gndyh0ru826uy6q6vi2lxp6mm4qiioylwyfo8i5z35u11m9h6okhns69235skrh4lstdmzcyvbu4l8o2qt66i62ocp3hjnngnqval0iyc8q0tevf9phcrnhhwomjb2ptrzdpcxlk5dmeveqg6g7fax9e4u983zhy3c24cv4s6woext5n5jfqxevyk6z9aar9s8u1wsz3ihw1a04eq9pg6c9sr5fkcrj7sy5bxyu7utnca6xomxe1fg9g24gfb6i69l0d6jz8lghjlc1041fpfu3mnbqztpp9qxetksuk6pn6czl45wev4nh0cfgqhubg33onvzrosqm4uk3uhr7n9cgomvfa3qqzk7lrq37q9fnyzvhyi9qi0f9t6x6yitmcldz2lz6yxyx1prhfforewx0w7dewmdibco05b5tt9g1mlv8msjfvr9g04uwoexsldwsjcp6bwodp5xcte611xnispf73wgd6n7',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                
                tenantCode: 'h1awpl70gs05dw60feira47nlfjrfq58cg6vcuy6yiemnq0llo',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'er0etr25bhu3oth5cpxy',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'mo4ljypkdezcuham29qmjp4d4zdyhabdjz71t7rdj4zj7joidlbk0r32tduc7tp4sfakoxqo8j11a7e1mpav75l0dkns54wwxqpbd5mt03f4xt5qxa76fnk0pnovyea06grjwegaxjayjoqaz16azsmzakvichsk',
                channelComponent: 'ezkartv1pf4x4lez1hxd4o7zsr0dk8oruw4d13hjx69cs47li9jlv2k9x4vxcrro3z7yeknoz51a0ec5j7w9s0mzd2wle28ajlcbc9fg5pz1quketvjct90qska6ei7l8m8ic1f80jf25odiw4i9gk7jz28ebdey',
                channelName: 'you29a1s9wzq3tye8bl4qkggw93zcrc625pgoxrlhpfacc6fqlfpeg6xi0n0xa9gp7c27sf31l7x40vjgk1ayufcr3qiul2ykg1pourqaj3o69rxt2wx0svppkx1748u5zh841om4v1kxi8eb3nrbq7l1fiiu95h',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'z5d11p9u49njlcdxqlfk10yca53cdwwlmj1jxa6c4s4372c4a5eu6wa5w3i2pm0j7xzczk2w6va0adz6d8o05ezt6v76d3hanr2rise32vj42hbmip4tn9roll1oxgp1kijr535ph1ontwpyhzbps1e38xcg1r6w',
                flowComponent: '0wmx8nqns0rt8ph76h8b5z3f1zyopdw30xzsmscfkkd57swkswzn5192g1f6qttq4edic39pcowqdx6jjupaiszw61450d6vz9qla53r5vi6n8cfpnmzb83bk5tn2h9dnncu1ega4qu4g17s53na9u34ip55mxzp',
                flowInterfaceName: 'amd18fnx02ajufd6ltjfizh7nqn8jrhjv28i0z415x13rzbzbcq1qa9ycdtvfxn9jd5faa3ogqx73iem3vytjygc15en3xd6pot4p0ygm783n1vnb2n0cfrwhdkt2hz7rdg41050mmvdm5h2vl2imd5gbpiuxbcs',
                flowInterfaceNamespace: 'hkt3du0nt1wlxjnezu35dg4umuretkpw1t9s6j74oyfvxzwpbb03kis6yhflu1zfoqx2tsvfleb2h2t815eguvu082plml3hjvl8usgowulyrgmtt7xigla9k0ip5apglx49b0pt7sdcs2cijj527jdnxk1ekher',
                version: 'nttsvjnf0rb3okmnnct6',
                parameterGroup: 'q6bxiy0mvvwj1vnvfr7vtl5zo8br71rqd8fcgwz1ya0k4jrapkp3aua9773nl1qi95iyvbzmojtry325i4p8zzbqm1nyi2tzu4j6khk5f2j30nrk0zhvt9ooryxoubbsprnc4xluwlr13yvf6s569ahmrlxmmtlra94oi58pspgn4pv76daih6dub2f3yhoqruzhu7s0bti8oqci9kfuj42h0em8g5dzbywbofpc212wy4m1m9wy1ghhi4h7f6f',
                name: '2q5639yin6ntch7vd976ezlpp97igef6sw10cxkd6pozlrzocn2iufy2w3cu93jm20xymlk69tq5n5py4joeaqa5rj2swfq3yloje4y243nkou3q6g1i7t01ganrgppa57e96q6jzjtl4ar9ieupz4pmqaglbx93ps9ld287fba05mhx8arym582f5vxku1wfv7ddrdmxgs0m0gs5zwy5c4lqycxic2d78mck1m1i201n5y09kdivgj13xs6at64chkywiq3rjqyguzof9lkcafp5jm59vz413htyue53aibdpk0713ud9nho6cl8dus',
                parameterName: '1vb5iaf01rcrsyilluvlpczwudvxr1735w3e6yoe536uscf26pmoklda2vcr6wiycrtx2ic2zaaspg8onn9vunmgxw392oo3wcs931dj6410kax6yayn8a5pc56urn5lo9hh8qymqerikhoc10xsn32541l47o1trws0yjdpdxaqpp7re6hyo7sytxq8zpu2vylqz5omcew35twvdr6gk1vhumtk6a20odizhoxz4t3hest9156t1moj08s5sac1mgq5133laqvx8pxjuz6qw930ipyv6pykpunuh6m9sar1jea0l9ik9l0yxajdgeq9',
                parameterValue: 'jop5yer5sl3uau5et9hcr9875cgielwv0er1bmhyj8egwkcxsjnaa4d5lydciig4f2z7gybbedjb0unvnp0ltucede9ndd26jzlostx0delt0wg3oruzh498ykm0vnyhuozjdapwgidwnddfgfr988m14tiwfkb7ze2nxu04mlhsnbi2iuvuv8dz8hq4i8xscmy6jzgo0946bia1a2te6s8xnzcvha33jd2edqyde6vry3ov8f3t6mzvwcs0jkx55jdita7fd7l6ckzkkmyiuqku7w5wqqei1miqko1gi19aznw6rkri9jrluksfm6n8yeeu0q1gt2dkpouqcgtcy47xh8jrdjbj6lk84atx3hnruth17e4ligx7h78k30wlcgmb6n4pbqgoc4q3b755x0jck2xrdxxg68vvj72l0hbqi9wfpmum820j4lw3zlfbcibne2ngt3h4a8j83qlheqxc25s3lkxh4j9syf8qea46itt20lcm0pumr7zgwm90kydmdj83vwz9sx84d6otfdwlsec0jwmouui59jq7x0cf22zt5kl6nl33b6cattzqw4pb71ho3bbza42gjageqm9lrr7wrzepjfhp16eqo3m3i9d53tg6qexzh5b6iyurh0cpx0n3hh3lsrcokdwn7nawp1f7hq83j1brzyz5kikb5k8tf0oat5dha04hjtmycqtbjxombpuffaeu123qhq5i5m90e8k25bbwqnkizdwh271cgqms7xvndav7yrn8piwmzc8it59ggls5oddh0bb5veymsg6owqhiwbfad1122ljiimm2cvrfb8xu8uhh4czy4fb5vjseisod9admdhjluppe1bbpv6td1128f0feqbdvj4a7636vz1w9od58d5w6rotj0xhaq0zhv0n5gzcmg2xc0xhzpg9oib09xzdpvb8ya5hl2wukoejjuxgd31mw7b4vtgzaydr50cguer54zmjhckglik7wylurye4vpt29i6u35rm0275fsgcl',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: null,
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '38k03oeyjtt0xwbz4eye',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'eqoytdy5boplpa07txc5v33ptob4exp5h91k1ct949my446ol70j4c1jaaosy0r8kgzfa2vyfvcfx5vluf64qfm9rzt0fktfozgkmkx8ppkmy0agaifs3b769bqp8x03ohcdm0w9jjkmsqm90rovg8br1pdgclwq',
                channelComponent: 'bnmtrccyksblvzyswmvgsnm6j25m0vj946sj5ucprd7bxkqehu26ujcyozzouf4uwh42fwzipac8q4bgs86zpiti6okdy2qon8odq492b2vjv7x816a5olk1s5743pir78q4ug9q1em15zfqn2qi2421x4kq0te8',
                channelName: '2eve0jnce2lzypftplmsdi08osi6fyout7iv8zmqfalqv27h1zb8c7mcih6uf4vw19i95ur4oxnggb6a1q5lgut3unmkrg2tcuduxhqx4uuf1swmvdbyjy5he0az2q5azt20jknxkxnm88m6o6v6dhlq2hro8boy',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'hq9q46pveol9g0aufchflro6klz5i6idm8ymlefhr9tajo70vk2pz2rh3k2gjohkfz5ratxwv02th8036l77ra9n7ab03lcptl27cdnjyxeufp9m6gno9x0e7yn6e006uy69zlibizdxv88awqlpbf4frl0ykbot',
                flowComponent: '514gqd3vcij3l7t9a5blmcdk0f6lhxieyymlb25wb61gl6r2zillv2f2q4bx2wwzbzop0r7u0ebgsbbybsgaicd4f77c40rh6gv38bh49927l177ql0j2h1pj1k6qxc94btu2n4qudtwl6gtc48kcoflohceu4sv',
                flowInterfaceName: 'o51v06kfb0x69y6g9wl3jrve5wsmxsrmpendnlmt8dv2ay0fvn6itypt1xolyx9m4gon02e7tub3bzjhnj4qahmr9nbrwlia9uv7no5c8etwpfm674mhhm0kifx39go94kw9hc5kroyso5rm17krhfh2mr0v49w6',
                flowInterfaceNamespace: 'obt41wu9o2b3s2t1w68yv38y509x6t40tsrcpjr79uygjyehld5t1elocv9ksqxpeeec9tdwxg62f5rdgv0faamxpd7y5rexgs8zr6tsmgwc18dkmrwqchqlr2zfjo5t2t6ysw40q5xl3hxnpm69rvb2nrg01qcg',
                version: 'm8ikgbml7r71rslkelnw',
                parameterGroup: 'rlk7nhahuyt4jnzjm3ezer999ikos1u9qv2rpiztpnzri9lvtgg164lmv8ffehl9yihaqibprnwklqrndzv3xywunmldo283pimu69urixivbthza773uzor7kzh28yt0kk14rum79o65yz9z4d9f958vgu68z00d5gzh1w7oem2jj5g842qpa6qceibw6sb45c7ndxakfitujpv0pj8itvp2g6eq27d1jrubv9ay8shry2rh5t7v20mndngf5c',
                name: 'yg0mg3isa1xya4461qq3xnmotf8v62uhbz2l6unr6id19bvw8hjhh76od4ghwshwyfzcepo6qv43uvfsf90w41xpqruk1hh90ztp4rh0xal0i6rqndxctshabs24jdfntbvg69vvrqmkxrads9xbicp2ixr3f7fl4kbqb0i8s40bpiscoaf800n69ltzy7fn9vn4if0qtmgikywz3mcptdnmk401awd7eckj6epxbxigbrstvbyiei3zec3r533e371sd5nohoalmxavlmx3ijs9uu9xtfn4jna3mdkqkbz5zj9o1viingfxqharzdrt',
                parameterName: 'njh2qbkg5pei6luibdf2tb1bkqsy6ka62yy7ftg8jagqpafmzsmyzaatb30a43u7cev7a7ol7qmvziv5e1f630nbaunljzydn3xb3tjc35261sp2e6jmjmpfginfiknn6j3q73eawvhb3hvekdjgzbao1iflhlqgn71xztigu8cbw7npozxfyr6w6co3pvtqqhrcp4zd3aytd2hy77l4hhyvadekd832llpbdr5t5mt1h77s0uywal6uiks8uv0026019ekjs1axwbokgbajk0pks9qd9ja6pqg1dqf4doa8t0wt4k1ba6ik9poy6ns6',
                parameterValue: '78xbsr0qds28sbp5cq0ju1nc38vbsgb5k9xc8lfqo6mvw2n2f9u3dqysn72xey8trnjxh4e9b7af8ec87irqslqzh0kwtgp58pfvfw407etu273dt2jb9rebmqdzmkw1bc10x0wlsy2005ewrmr3ih5zs9xmfiwj0rjufdbhc6ntm0obuie9x62m8jazxeomw6nq83q7q1rmgypdjp7w4z0ufxkugb6zdafb3lgwkvj1u0fm63nrr3cl9uyrseaf6p7aswb9ojsojizvlrorjlof3y1szgdq2i7txoz0teabrk4j0li9cp91pxedrvai9kz5dj0ne6o0lym2hye8xpsitmdlyedcqzixc4b3ta8cthokec9s8v1pss7roq724y71w4pnqf1ido8o83mw321q3v038a87klxzt9fbgx4222zm1s6n47v1sul411kvxecfu93oxxxv2ipwjrc1t1jok6mlzq5ucebf63nflf1d7l98g6w9abnsyfh00q1l84j1syez3x4ld7rezukcs0ga1i5822rhu7glm88lpofdmdnk5zpt7bkhgkqwt5clibkmm7b5bvn6zr31hgnd5i6lzndh8p5f14n9v1kxgo6dvrpfupnkrhq87kl4lpvekseysdiz9m80m68ihovrpw5u5bkmhk7lr7eas6yinxcya09142dvg1xg7oqfyxphlqvtr6gyfle050d6xufc1hxdxzpjs4pi8tev2qlj5yp7gn5g459bn4osg6xj83j6liwkws1lxe4smyk0pqz1rug55q67wlfd26qff55alj2um635amffnn0xh3irapj6e6rlzhxxqthfgkdrvtq849py0xlnz4vsd4tnaa3t1rpsya2ijoysd53xxak2t92o05km1iq6vgmsg7dk4r32q1zwdaxyjmvuofnjadsiezr82m7gi0rlk1brwrwi1enwtsmg9hd3p91ator5v7h137j0jay4i8pdd4irw8ovrpmqw4e3ybiu14pwjugo8rlz',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '2ikjdcy10zj3btlnufyh',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'bhfznk5h6fg8j2jkgppqb2zomu6jdaqpy1t0prk971xjmvpul4zlx42o9i7g0s0qmz3fvao1wp7c743hg90fmxe8b4dzhp5ggcgiw9weq1widauzk0p5cy7unj13zwxj1suzwv0o2xttimm5wmzad17n3kdjmhuj',
                channelComponent: 'rxkzt800w2ntv9c4cvvf9xcw7syyt0mhun90ue7qr5e757nilzm5zsnb9o9r91l41sun6xp5hb8biwu3sczlt1d9anjirmmx59ima8wb1n1ucp20nr4iry9noxsp2bk00pecqkjanj4kjmfozypp5irj69z1nhd8',
                channelName: 'rpg804txgrdhcg8b3gmxhbpqs3pzm9cgqgct12tq32fjrsheps6le5d97kritc0x40j8513mlf93mqcf02ir8k2ayxjhxa9an5o4h4lksn2nmmonlu0nqrigxw9t8uc4jrr28yp9gygvmtynvao0waulb9bp6n10',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '506kc07h71k8z88e9evi2yloqb69sfdrit4k5ux795pje51zq8fastbh8swxv3gdi3w11b7ugmhbd0evpjzv6y5cczcjd2fa5k34gca6pf5z9gdsrkoda99wqbtndrjax2xsfqmrjtn45b620e42oc61alsdzhrn',
                flowComponent: 'tt6bf906qkd5m1sz3wtv3vmqdt0qmklvzxw9rb7thtmqaws4ewjzgtzkq65td2z3ag72z8q0mais1upgvh95tles50k3qcqll9z18a4stuc11tmshqsa79emy2f5081t8oyrzxrtlp6d08rqltrqey1izt2gcgwj',
                flowInterfaceName: '7c9hrlsdw3r6g8r7bcteevq4pqma2yeqhcrr8tsdyvwv6f439dt4gwb9wyodcyizri0my8zikuymyh8ve27e2hlizh1o7bs5rpofm2go7cn8eqa92dmyt6ez0rjcez2fujr878lgdpftikxt7emthvstofrffijf',
                flowInterfaceNamespace: 't4xug02uchlws2d40jrasj64kyuzie1kra6hj4gs9x5rbrcfgo66wtpjvmlnr4xic8comlr2lycru7vd773qsu80aiq9bwxo7vjlsukivpk15f8qkd7xy659wrddxkdqz811au3tzfm4hb2py7wvr1sg1qtt97mw',
                version: 'ciw25di9zzgyh2x08c70',
                parameterGroup: 'x5qmkdip6akcjt97kz7t53ofl52cs2bmayii67wy18zbhxsj0vwt1dto00pwbgb2hyxn1zdhwbm5wctlfbru9p70d00r24oqph4uuoorj7vwrh2sb7hihtmpolh8yyhpbw821qqmqml9k4n0pxeuat2ewp0albhxc82f3nxucmyipxwqcq4wnon8y1xqomcz98isafpbrjdxhz2sxd94tuxpkt5c7ysalbq8ainndjmscy3b0h4x7bpfndaiu1d',
                name: 'kezzh0o9mjnhfxk7et217l5y1fajc4oatjtmt9u5sxvwu4okiuycrw9p1xy0ehzd7mj6ayvoiiighedtlbg9y784uc6jtijw22tjx6kwenfwtmxbjgvxpa346llfgofenge30ytlo5rym9yqpfe1apjqrcjx9obsy0q6jkyvcis19xcv5pkr8fyuiclia6adx5e0uccnszgwpc7hln179tb8uy1x6gmiebr1u4v47jd7dm7m0k0lsbe96my4o7dss0l21gltnhsr4focruppro0pba4gtbsoz7n55mas4qzlpd2yza84y23vvf32b5tc',
                parameterName: 'd65pxla8t4y25s323oejt93it7p3eupvbxprjbbknxk4xfw3du14vo4h7qu8jgiw4yds0agtpheea07tqfxzb2j7fnbk3tiy2v4qxu75r5enneiim2hzj9ajy3h6tccr0xxaj70gpptvm1vntg6bmt1zcyfgcdahma83r0q9b4kfl44uffz6vns88i6fagcvlapw2xhd4v68hdliuzfv6oegbss0rfcxr082kjs777mh36vbzbg1tv9zo1m9b93nyoi7ho2pdliq131mbah4j910ybhxlka35un0tan3bt7dxuvl5e72diqo7jh9lux1',
                parameterValue: '7a40z9nlivnxlo40f0m5lf9rnigjd9r265supd09f94d1h0ucinrkqz7i2k1q86g30sjbz25tiaet1miau851e7mlprkb2rzdwpt57wu06aowtei6anykjr0jg6pf3d1x6px6x72mhwq905onozq2vhioikymtgjkmnx4j9q4j8gbnz9olh0gvh2xltfdvpiu8j9p2a5jwh6jjjs2xtlitc58q2s9g9suivuggt7hgmexdhp7qns7ofmpikzuty2x3hccbpfi76rsu1ciw76am1n0e54b9qdpjzoavv3ngb024kruelats4n9ueenx16laekghee3twgm6ydxzfw6eiuirotn2xqszl768v37vwbg5l3v0awrv8dhs5ua95v74jvc8bk5mv1wfal1ycvrxe59ikia83jjiclo0xs3vo5bs78d194zeqy2xv93qa4zkyq16694kk4a69pspnbrqjysiver28wd08ydpvgd1e3733z9u967y9yeq5uczoaa6kullq67fmbdjt8eu25t3xwr9483ib4w6fjs1aockmuffez6jgn5uubfzbcjarh96ebnszqej5y2byqbbw4x02bqzsxqpot1778l6ffqcu8xa1i4l28dpzqbla3slr2jmf0hc88x0pbnth3pc2x0okx1nf9unpsmo1o97n36ylgcp282xwn4pacruazigypiqqbkmiu8lh5j44phq34pvcqj2ndubs3pyqxc6bpix9ie3xmljzyy4v5ezy2kvaybmp93qzmvdvyw99rxn5yspqhpis1zcabova679d3gp2207puc3ddvcafg90qxx19d73u562rfzukha2m3a32yn8zo27ezslguoar4747ly9brzme2d47pt7xgdfqfck9q2yveqsn3vpoezgqfdougg0d02mw0jrtxso21fpqlnswnlhriunh9rwj9qsm87led9fd4x4rz2fvrh85hbob2i13fozls5whrg9xhiyjia99vetp2k0q73j08oxux693',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'y4vcys1j79aex0y567j0mgzb9izxpvf39korlnjjzfd6hftbsm',
                systemId: null,
                systemName: 'pt0cadaehgrjr4t5w06a',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'zc7kxdgsoeikjqcgkhfxf1fma17ohx04iyufty87wv79si3leprrj2tfe31y4bmlw3u6nclpcflonv02z4o0ojeug9cs96b6qdoekgu7sfghs7494t0hl717107asj4e9dkx8i5k54kb75sfjb86zcdk4jrzikd8',
                channelComponent: 'r4jlvs2ytlqu4vv7df3dudl2lo7epl6c419q668u3tj8ebwxxo6wl4jslae1gysvh1h0txze3vbqemqdxg9hg862olikcvj98jxe67uiyalhgep54qfowzqjy0fz6e4dqbd96zeid7z209ehza9otf8244g7pyr4',
                channelName: 'qsxvymebl8tlsgc63h2qkbcmsuwklme5rwiht887evtve2ugevi4vkcnbdnx0nr5lceyfty6rnrofkrsp0vpvch0bq9zh15frc6tg2udd5njpaxxnhmgt0q644cpl9323s4h5uwcu9oi718xbn8a1sc09gzv2qc2',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'm0axuu1nu5x2qrkhb6cubhequ02lvxvyrojpwp0ylshbpd7lnc39u6ac24ykxvx42j3fibi1eqpx4mdxntun14hpmq16nas9m13hu8o3igsrdua7ainvnvjt5aqa27hhldod8l7ki15mzi6qre2kr14dz2q0u3na',
                flowComponent: 'ego8exiehep71o5p3iranbx4lk1h0qx7mrj99uty3l78h7m6cptjp6cnspvieiugaj3ustr7wghi8mbi6vmh0b1bbywz77qv3yw7ccpk4lwnce9s8jabj3q7oee7ijo13hvgj9dz852qf7ha6fbrqunmevefudeh',
                flowInterfaceName: 'nplfcxaxd9d0dn8a08fp3lsiob3w030l9rwmmtrgb5bw37m5f55zwlf3gmm4pqvbyagul8hdtbxfol0ei11hixm4tcfx5391ot0qg3l9hjlb43yru70ujh2o3f7tojgyn2jhcceenudk3hq90jxx7g6g71j4cnx8',
                flowInterfaceNamespace: 'e50oklnty3242tbu2ct5bne0xq2c2je6iekvrjd3hgaqythsfd7y82sy5h0z0dtifstll5fv3z8jobzc10oyudbckns8zd5jvgz48ox31vgipxb9e00ok4siuk9w7ux7ixgnspfpsc6e7wsi1i40wbo1fbozm5ra',
                version: 'wymtsscfns7eque5ie40',
                parameterGroup: 'atyttuvpwoiluwtlj5f4m1a4y5sc4mkttle6i9umcj4quxzgpcbpel34knqj3wh19ytgjvjnoctn7pwqhw51gebaf0r3o9th1r13jmn2ers638qitt83n4ya3u0k1023jvy8ew1tjqhavugs1245m9a2cbajrazjvpwqaogwdep7e574gkam5c1yf1oad49ttykg15potfst9lff9jxt0en4ijs5ek8rot77nckyfj2b3hx6z9eapz2qwpt66sq',
                name: '7qmbamvvyse92ywogdgghsookypbtm5aaa2os3x0k5b88lmauwetq1vmgfv2xvefukkruou5eto9tfenbv8h3zb0nbrttnhnd83xfvu0k50hxxotck1h2r3qapov4ozgeioyp6dsoktb4xnl1e7ko9hg2bhqest80y0h1yi1knuxx3ubonoph5khh4mltl0xvz0f0wschw97m6akd85elz04n8f1u7ar9iknvvlzhjx5pf95xy65thwhycp4013aw78rsdx585h6arwkqr93ykutyv37yvdje5i0n0e7w135lcxn713l3y5ckc3xdhqt',
                parameterName: '47bi2cldnnyrcs12clmjb7lv74b4vawrq2ezcmrdb4f1um23ktkte45igsf4cw0t4qjn0p638t9wm3hbu11i09h06g05imby6m5jh8yvd7l5wyasptzbfdqchw6pc7jgh77qz2tgh3ozbcqicu17v5oiqm1tf7vdomzrya6pmhvrphuqjixzbu939wbtpmbovq0eop96w02ex64cau88uifxv6mnh9ybkf8marl9l8ch1uith94lsz91q8l6fi6yo34guhech7fb2g8j7f2ywwlvnmiowldn42nivpnd4zdslcvf1lw5vt6n92rbk1m9',
                parameterValue: 'dora6i2oz8thadzwtxlka8iwlnmy9u0jwbr6suech1s7np7u63fws8kb37rjthot4ahq2m45ukqrriamfaddzfc6u213u0ywv1cz80xq91v7zp4cr9xsohrkx7re3g9jpkgz4s1g7fxwh02vwylukzpeays5til7arv54matasksajy334zzgluqcvyui2bkwojaxwxb50ja9leikb1rrb2y15eelboruh6z7mnm5lfdlph3m51avrq6nbv2sh6o0jwwi2cpwzci8ftft3uzt42ealapf381fh1ewypp73y38xiorbcdys1fo4pwdhx8o0pure8hg42lqkwvefxznl3n1zgvsu2drerzho976hp2iph9hpql1to3il5ftuif62hfmx7uzl1s7jlw037phh8rmesoa7337stst9jkahv6x995ye9yjwk7np8qsj6jobmwi7gratwccp2an7f0xuo09zpoln9dztdpuyrho7f4n0leldy9kwye2gnczt01he5npeqkya1ejbeifwqmh74kaesbci7561ng1rxxhgutvj85i4p9xxplaiinw0x0w9goe70gemfz6hqxah656sg4bpgnu20z6ivstm8lkkmtrtzg9px8z8crs8dnp2sqi4fkot5nmkpq5hh95fy1q5wag8b8s2yvpwwz909mlmr5ylwx5fw86b6n812259ch5316e3b8cpsxk4d16u6j24bbvsecheq1ngac8evd6d34kfqypepwmiekrthcxsnyk5bf4q6his4b9tmdsa3nq3wz2ttf68n6widh8tofw3cjp3frccd77k4bi136qelspv521414g8bh0r73c97fj7ybxx9nakddpt8nnn97m5ly4k5uotq4lc8rj3rq77kenfptxcbm77nte2qyroaulod98edoqyrrsk1ya9qf9l98tz3tutkpzfdsfkx582j44vlpvbrxxu8k1kfkbmesole3qp70vkococ63x8v6nsxczu7gpufaczgb2kpqnxn2',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '2501yf59uiasb6o29ig9av59lph08qjg6va4e5r7crh890qom7',
                
                systemName: 'wkq05ifgjfw65gxavy8q',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'bf5owxr2s3hzi7yhifs6xk8fuo0qxz5xfuiawwmxcat6nyjjybw6nclsn7i4w11phrdgk0kdqehsjzcjcniycp7nzlpm53fkqrmz86pijy8v7nl5tgcp5eadm8ogoq2e4bz9z7tj4gr1eav74qvs0qmayxxc63zk',
                channelComponent: 'ett5n4slthqjisqki4xfuds2g3pbsqq6b5ynsg2k7lh3sn2zxi850pl9lnt3q0kfuam74ny8w2winb0kuqejh07f4h7jtlwy4lnldblvgbqo1xb2d6w5q0pjswphpvynbh7yxq6zd9qa77tyj38f52cgqvwxc2uc',
                channelName: '9dzr23t0q1npojloyh0jtq5s6eec5agf4uj3s1x5kl6nkitfsj7suu9rzmj7zxaj6zku8io9mi5rhl3yn089fni1904wg6uwl8oh2lqlr4vyfvpz9mvngfm9ogkofzx5k4r8z1ir91vmockp5y2naa5mnpr8xs1o',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '7iw133dvlhppe6v02zbuztwgg9n4l6zl938l3e6on53ca6rll35kb8cz521cq053e2wcgj87rniwb7mk6gddb59bzkb1ohdnflmypu18bws0l48faxlj0vkaq46w5jbappmm3vtd3q4a7ht8iau5b6hhk9dn95oy',
                flowComponent: 'rpkzwd4qyqumb3w74vrjhdvdh3czuwzlfwn7wz8wdkijagve90beovuq0dxyd1qd5qg741b3hr2jk4ik2u9ao2t3pvhgmb0g6vyzkc1bielfaykbslnxg11043025jlj0z1xz230b5gy9mwluf900j0geqke83qx',
                flowInterfaceName: 'fr0s98xlyd6c511pfadz4z9ewh7bg4ts58y4l56acopbjat93fgatrgkxormrb3la8h0fl51gal91lghmm96ofxh6bbm9aq86tfkequ6x0wsu4wh4iqp49s7qmgc6qtyw9z6nj36ufezjh566i7msuswxh9n9vre',
                flowInterfaceNamespace: 'zgwlyqvxjqw2oxjfyn30n7kg23wfs30u49dkplfk2e0qyprtqqx5lhd5ercqj4rfurgxop350atl6omm3jng18us80fxnfpwumx3c8euh5360xk294slfbfk02m2wt06yq9nim5w81rgbo9bbycsaivr16wu0gfs',
                version: 'xstpyg6eaw7csrt43cwn',
                parameterGroup: 'e70q8of9l4mlyxehmlcjgl4l9bp4z56lnhap6814crzwullruphvafvwpovfaw81pb34qmmk8vq3nvcvywsg732rly3fochfyovkbggaqxnvn8l8x4av5ravqyaxy7e8592rd1z512dfvp87jmx21vwlm1komhk45pi7dhdv1ghla31m68v58v2uuz7i7zehfjsnst7m72x5m4bel5vi2ev299ma9mz9jm4m120ihemfahey8xogbjmhuexasd0',
                name: '6kmww3oexva2e9qnczzdn35sr8bkp02wox9qz8cnq1njcfhp9r4hqx24vxyto494w2r0bkloj6v790itooxq1udu63ylowwbqellt5dupho90h0zeb3gy1y9b9dc9mppkq41kqk5zv0jo3jmlm7u4od5l9mqrchqgbtoeazll47bcpgdciuc5qe8pdqpl30cgbl2mvt1t7qk790s09prktwyh71ecom36mgmv9blu1v1uudz3k6bz5uruiggpv06w6z9nx4v7qmod9wr0kuzhwe42hq859p5dgvshbshncbq1k1ex854lzjua55m369g',
                parameterName: 'mapi0n3bylnvmy5mw6w7xtlxulhauhlwl0sd717uj1cxk4phwuo3cbdhfvqi1vn1qextcp5nxi6bglau4l3qxa32c96dloifhf5wvrbdqdfl63ssyhwplfew291c82qc775x7hcs8krbzth9b4e5c8vybr6dujitp6yja5d5c9yipnf5a60lro92l5qksl40v24ksdlhpvoiytbja0h8po1ay5xl2atli7d2bvgzl3qfsy0mi3njy0hf86qzkzu65j0q3jeyxtuqpplfd17ph7edsj084yse3hf6yef3mjvptwnxiwpiot0rdzzhjq1e',
                parameterValue: 'n70s1cix4zjk8vnw6wy9a1ljpfahu8wn7olitxpuhnt1rjhxwuk74vfvk3aono87jn8uhfvoq385cf9tjcdel28v8if9s0b32tuwap94nkelmvgwc6ppc6kxxnbfrtl9kcjs8saunqvgpfrxwytojhrtt15pjoc06ek73xfkj5q8x4ypbj3r9jnygey7a430c4kxgc3cwgrsfrw39pdivbxrb7bi42xijtd6pjgwzalqi7yatfcfnwtz5fpzdmdw29t10hiy4pjf9ixlragc2l9atitezun263xvoq0mjyv123e80dp89kdz1jlzcbpjxujzcecy7dckrz12gdx9zp46zokt9ibmc70t6cignxbg7b7g8wq56868d12h6fi9j6p462t7sksuc7vl2n0e1s7hhnuluo5ss5m4rgkkch1ymegxekqgwt8z6yz0drufcar7a4oziasalnw4ybtxe60qw6pfb9qcrn6sb3t0u76nb35os6s3zwxdkski9zfcbfqr5xhkg5trj8a9hryef66fl5cyq4aculcqi13t9f1esrbxo2c2za6n4m41gzmsdplazhqtglvuh17ei7m9pcgv0pl01irytla2gngf6ecdx95dd116e8096nnmc9j99wr0cy9eflalprs6n66mr8xf9pxkmdcrc8ec6q6jt1s1zd1kkotigns6qapy9y45pe5kdeg6uu12ihkz13v46lh4l7vvckw4f5z04mozlg49hcjl6lr20k074f6eu12lullbw5hatamnmcnym1a1srwxge5f5c8tpxoykvsll10hldocwrspdrf0xo39hpzfavsq2evubdpli55mhbj5c8ijog3bxlk6opc7axssijaatpsi33cnx6xr0vh9bhxarchye6xmrimr99vl90zo37oqd3izx0m0nit6ziuhvas4a4h2y8yj0m40elwj4r9ylv19hxs1gyxu96egrj2i8e02ebqd23ltp9w82rbfsiq48ogngl10lcsravxlzqdu',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'rzhm1b96j6jty2jm34k0mx67ovuu2si0bmlffyd2dz7l5b2pt5',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: null,
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'l8nxeufcx88alzfo9oa4kfw2106b9dgudh78le1u475etsl8jfytpmgzpz3ag9apfvsywtsgravzfygy1rxydi15svd6k10hfjphb296yyudekebimlqgp6za6auhe9w55noy4hoqncey0zr01rranedbg5omf1m',
                channelComponent: '590q3rp6ku1orlpghvtqwazuqb8aq2w44m0q2hbble68nrwy84hs2ct14zfhjfin5434dezj3mc455nt9ga666so989e9ilh5tm89a4kd0e8gdtn0r9uoh6m4mtcfikoe0dynjejvjawr7cjw8nkoxe0bapjx5r9',
                channelName: 'kwkoj4xubq756lkf3omd90relfxi4nmkk5zsamrb747mdtbwp9weaks2ydrrc1dszbug3vx776owytrvauvq550wijs55g43oebdden5ykpoo5tui71o3c3jlsov4wruaev107tlqln5qbftd5nj7ek1u8v3xr84',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'aqmra8v9k8vuym06c49l7gny7p0u719lxcj8ndqz7esh1hsk3g73fwl0uo4hb4adus2h9swoswfj63z92m9ce8zwa8ywsejbiibza0hqjfuzeaaekp1opvi0w2ctzardnf84vzzzw9fj0hi4fkrgi8lc3us06vye',
                flowComponent: '0w5g9s1hnpofea7b6mxh12yteudn349z49gznwkp7dwu54wl3f2ulorprdv5ijbabg55bjcr22jmhxs638cq6fzokrtt0cukgctioo467hfpicuw4rvccbn76jffq422jmo6dqeacim4ptk7ewda5u7sm4a5m595',
                flowInterfaceName: '4zwr009sc67hdcjlqre2ftdaj1er0874r2tlca417azd7sxv2cmcu1h3pic8oa6zh1zi9thjo6ju056p8fxgh4y5eidfow3oju5f7f684ajm95i04pddtszfll7tl6a1vr3mjn98ge1bulkwkbfz4kbk4j1nmhv2',
                flowInterfaceNamespace: '3umggnpjhdaoexjhvzqihpkoome88apj3knhtuihvo98qvy36jxhnycpfqjaswf0dvb9abkgg90pq30jiopnmhicgy47roprndaw1vu4mo5lafxmdnkilo1j4lkzqpcu4qtw5jln2786vqfa1zjghzx4bwpg1pxj',
                version: 'htndzhn0w4niccnweu76',
                parameterGroup: 'v7lbkcyuhv5ree2m6zfgtd7o68n10qtoq6uzcqyp3ad02klr7t5cjic9vb3r8a8ytyex9l8q7rs3cfmgc9fl5fxtxh5plktglxhunjbfpi3bqmqsdpxg6e2wna90p32akqra7eewjf3enzzd2sop5wlxje86eurcjci1xkgymz7bc2hgybqre30y3lr7n70upa15o1pvn1zukj1s4l8l6111fj8lnqqajvj5hlip4irqymqddr6xg6enodva8le',
                name: 'zksbtctzpeb9gs9hzv6anmud9ppjpvyfb4vvth2f7wvl7liqyjbrscmgafvfpwo4885ukcy0tx3doutw3j4xtun375m36n9cj64v2wwrxj20r5xah9g6mofuzyehbo35ff4fmlf9984fpte23r1q33g0ngom41f4dhiw1zpwp3j2r093onbzvgigyweidn31nv4z2is4748xqx9v13za0anuf2rscqe4ebw4v7npue8slguo7wl6b4u30zxgwi65dv5dg7t8w3we7avry0tq3al92ey82zck19r5ezjefbdx5xyitkvwdno1zdpxslpx',
                parameterName: 'p9njvsbp1om7tsy5pzuekp3v1nww2ybobw01dim2edh74mk72jzbsqwod6ih74xq1yal72lnzvwu7wisthv57vt3mvq1frugkdkwahvqlq3q88u4jmioau5kb55tu8bafkzufssuibhbmyr3ap2ufj6yhjvbeo3l2kxnan0umadghbymv8hr88b81rojj9j4b7n56d7vfefdv8kh7rczeizmr85gaz5dewk1lhq6zulh8y2knhdeva3aimj09g2e49v8qfeb7p2gvurop7xjq6qjd0s0vtvh722o0xkblaqgyaxk7nppthnwq7l4zah9',
                parameterValue: 'vevwdf2zmsx9yzaisyn4rbwwzir2wh7gvlc4ik1ff783gry9gi0n8q5imukkhdkyi7crxbj0cixvf06xi9m5wp2ifds0hsuvdjjabs74s6kepptx5glegn8ejlerg6fg6mmkb2gsmlh03zw944ujaqoqcqnapux3gt97k3lkvtj6lvvel8dkfm21rnlwxeqfxw63argt3h18o82livcfgirdr0vfsbyc7fxyqi2mzhgljrfy98l8zv574uep9exasgwa2iejw3j06tcwzudwg89no6zadidptsmv3wv343l1pl1kgg3f1geehsg2y4ds2dndpex7n9azvfaojinsy4dizhy0a0qab144y4i4qkjn25u2ea5v8v4cwa8rrkkd5mh37ax47hg5gm4nr9hhdt0eebcwyqw47pdxipaibo1hcqxgx7achjzhxn4atga9z714gv5tyb5f6l7815qpilwuq5p0gt4b4pg0jrr3ed77jsnx4pwqlbi9wksuwzf8umyuvo15ltdgabbg23fjcx772kt15qpfekvrrpyh72geytc8oz0c6vwbauoyghslmo4ild452t5k117x0huxl25bjid176niv3h245692w47epq5zpqigswuyox7zz67osmr6fggw0tngq1dcj2f9h5n9f07jucqolex28xrawse9cvlj0lb5cl610igy32r2mvzmod1nvo6yvg0ehppk1n49ln4bf0r6fff3owx87jxzqulsl77etlrkpdlp9cmqd7pnje58cchiy3zc4ng3saj4i91brsp6965pp0odcotazvm2trz6v0vm4pat05ddsr9imklleg46awj3hi47v3wbjp0mg47iddvsomndw2j9914nfefljhprl4d4jjdrm0hyvs73q4b2rjm59ovcwzes4r1k31kqwhsuyri1bzpi9jf0ani7e1osjfa2v30vp2bhz10a35z40cp6ovuzm1qvvy7cn2sbiiq1wgdi1m6uotzoi40hmtoeiqrael6',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'gsihb3rzihwjie2c691bolexx5gtjoom23b1r09gdkhwlp7p5u',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'uhwbpony441gs78nqp41fhphez23cl08slnwb1s3kk1emwtq3sqe9qet6ju33wszi2agdpzueu32rjkjpucmet04n3qzuh14m636ifimt8thvp3xkn9ogwmbmcbbd6d1zqgj9ktudvhryqx12s6q6871pt0q6uue',
                channelComponent: 'no0grvfi37r0cm3mrecdr5h9n18o1m9z9b1r91ner7els74oopnxk6mlo1fla0qt98tswka0setpk2ndoe73v17py8xq3g7ue49aoxe6s4xht3l35498pocj7bkzuhrkvf0icfq3zjoeji6ju43bmf6afa4pn4o4',
                channelName: 'tl3bnbgjbx6y86r4toyfvcbm2zjiw2an64xqiqoihuzqvq7vselgkp1kpaqnnnh87p1vbwr3fd8q0sw02kr1mrb37hlei1m00s0o7pmw10z13bfcchdu01lheri199yoz7ai539w74w58ep570jj2ncxkvhwzq8n',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'ioq3krdfatmi2uqtnuzh0rq6c43s2gewsfkf3v2oi2tefsjk29sipx295b4v6g52lrcprnq1o5cohpge2p86exmvxpu8ic64oi3efopg1iz4f2xgnkmejmrn0kobawl5zzdnfgtf8eplze1l1xxg79f9niec3kc0',
                flowComponent: 'zyv27583ij1qvb6oubzghlldqx90h1lwef89tc5h4nrt54vpl4hralsxygio1min03igqgw9fmeha62gfvaf0zxud6bb7rv6zspmd33omnnyi7j5px70xwq57fwsdcyqzzxnd9mn94e6vz6lvneqqmspu3kthqw7',
                flowInterfaceName: 'xc9iq8kbdux9r6ltfavrc25gjmr5aettajdbq9hvctiaqw04khe367cx4n6n1d5qq7vn88y3hid7a18ikpgk4hoj5h3uvgujbcfuwsfvwvcbuhjd36jtr5z2ss27k1r8cdi2e8owx7wfj20af34hcx6tulen6rvi',
                flowInterfaceNamespace: 'f9lw232sdajhbggetfelgv6n4st4l37lk08hj3jzrsf2r37gz30372f1stprw2dw4k4yqa0uddfhjy7wz4oh0kpxyqxisifq4aw2jypp4obz8nm1mbonarzfocbcizhgj9ez67yx0vyn8pvmkgt04guwzgi3ptok',
                version: 'djz2s5oh81n8mds0e3n4',
                parameterGroup: '0mojtwua8clbfsojpu4tprpm5zxtbfcil3snyleg4p83ejwmexax99qi5wtsmnocvqsogn7d3ldjbg0adf1kp6h1zggg6v763r9is2rfg7a5dzsqvbhwanvg32efvnrl557wvqfn1u8ijv5ul2r0j3t9c4sj7ortantn3iol0wkt4p49h5g5maqi2nj41l11mdw5kqtyn373227gfq5z1vcjg93v8qzr3s0lsscn7y06hkbtno6q4xy2idfb6qj',
                name: 'mywf37598wffi6w2me8wrm94d4wm4yledkdoalekoysinyohavb2tyzft9d6kgmk825chnp2mgc803o2azpit4zqxeaq3krdkf84kp3ybt9ju0mc77awcdgwug1fb9pld8oh2pwyxybrzb9pzmnfl6717im44hatemwar76crfiaogbsp3pqzmdryxakf9qmz2g46u3qnqjieg0raj4u2vrqu8bxo5y2c4x0vghrx1juc0ukrt43cz9uy7smx8sgg46s74uruhsabdafclncnkkiplfwd40ih0k10pu0mtux0lnlyxv9mpddn8wx9ni3',
                parameterName: 'y14jx3zidy2m3pgbewd38u56okhtwpogadvub3x35jvg1ar4r594oy3ie8usmvyeaaeikiz1n9u9izqlxymrc4uczj3sw4wc07y9xvj7fiehvcxryp3aj1laua2phl5feg2f882yqqxnuivcvtiduf2cx2r3uokgeu3ra3mgl31q5w4b5jm7i6mqrbjglfarztvvfz927ckwdfy1vr2ydpfkxrg45mf72w8147vse3mbmfrvmnjzz2bnz6m2q39dr95wz26ftkppgjdhclpgev12ph6qwi3e34v63ekx9u5o0do1shsnihfsdamjrf9n',
                parameterValue: '1sj4s85xtn4yb4j7ex3hs39q1h3l4anp4ph0sowdchqundlljigc6ciaviknxfzxxtl166mgqqovl5dqm6cwiz0okkgv323ynsbw7smhjprje8axafaiaq6rhmq42iq64h6qpg4fvbxlw6609yu53cyxsd2r0mklidfymt41viz0ehowahnyn6zm1gdumvoypc1gag3zy2u10n5klwynne1rrhhs5bj9v36c78a99iww0ma2htf2ayrkl6984ue92ueo9xsqph4b6jgifc6446sa3duepch7omd1k5bjnolmx78lkw9c8dgzfto2qyn53dimazsfuot2pg8kl1z93y5gq3py2jlyh57olb0a2vpfa5jvwpp4zfqc7a189ib1x4zvg0k7npbidqmxvofmqjdzp9whg3taalgxv9w8l15r55utokq4tmzxta4zihb6i08j0j1qeummlgxfq6pz4l5ilimr04u1s194meqkafzpqi3fll0hmgbjwit5j4prr4d1p8313konho6yhcwdmzxb3hkihqz4ltjjdtmuxowurtw3crobqrphxefa9mfm728txzzw65z6ih19ivh8ncfngu9fnkftrbqetl51nu1cqqdu6uwpu0eharmfiyt9552mkjkyne97k41z5wffkh00uveez1g1ewa972r1adbwkftzeuomzagbtm81npf4pkoag5io6x1bccqb81bev8xyb4k9sslhd6jbfo8zjvnvw4iz84ui38y0lw6sxnqkemcuvhyh8fwt4raf8aaz0fprfpeihby4bvcjkfpinvvcaqh33shbeuuu43koi0gm2954sygfpjkb45t1lez6i6mtyn4yep9e7zhkrz2xx68qj6sh5knfr1xiyb650dyf5hbizp4jsixf6l3uxnrv6710h941eek40dt8spb8wv73p6p380bakt20fnrdkna09o1q44hb8jq9or34l0ic39157anjpuzx6fwdbwuuhynv8ehmg1b16ikhdj57hsqu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '4o57n3nahe0h9yunr16ikuv0khea8r1x2azd1o4jtwlufw9qmf',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'k3jhhtaxo7vcjiunc8ss',
                channelId: null,
                channelParty: 'pp26eyguygzn0yynmskt75slvqy4xshjyhz1uestejgcfrd8ydcavta5s8yq3iseuypo2r2wqbuxy3vqvzlirx5k9gkt3h2leigm3iz3qi0sixi2nlqhjvl4q70xoih4uekli53ogx67ahvsf5t6t7eh8rrq1qqo',
                channelComponent: 'b9125u11o75pz97kxzrp56kt248qrhye6yttv1y4n2jnbsevl7onrtcc639909447ljgljpzqutjzo2cau46xo1l36kmof0lt911nqs9l8dds2yl3c5g3ajmfmew6dfkpiegbl68cfgntx9ao2x1jvospkr15gw2',
                channelName: 'aec52kpp7g9yvrrg4p9bt6a0gi7xub9wuboknppokatdgqw7glq4q73cvp79ve2ipk13ffc1ns19lojwudl06sd7jn90iv3pk3l01ug6p2oidk8yx7a1jtzkwofo0opfnuv9wrtlzs838hj4xu1539blmb2k6y8m',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'rmydflq0516l84mccmpcnk1tazgq20hbr6yz5777oa69ji8hclfo0m2dt091ryh00rc31tmdn7rk58waq9x1hcoan1vnc52n9wj2re5xzfpcc7padfq68quobwkmotax7903xgnf4zsjfju7qjbl9rwtxu5va0bk',
                flowComponent: 'ydjyf1emqiz7y33chq1vi6xjhfq1wvlp7bx7fxry3eeus42ws1h91oc8jroohjugv612gxt471qn8guk8yoq9svwidqtnldem08sztj555x1h5a5o8yegee0u5x0ng6btrt2ppfzgreuqu8hoofru325plm0aogn',
                flowInterfaceName: 'h1ydgr6rk34tj4jo6loamtwo4bt1km1pahpu524f507jcjylwvfq7kk9l48i20dhzddak0byat5i6vs3wauzxl9l5fc0te9596qx53athq0r1w8xyytkt9ppbwod77utjxpkno32ka3aafzv1ido9flu3ufj34cd',
                flowInterfaceNamespace: 'ur5ckiy55bfaxtgyax81g5ije3vk30ykr2kruhvzjzav5prc06chbdfb70is97kn4idukqvixzcumqelthib1ot0viseo6uwg8nl7q8ip388htpt79yzj8skgcbb1vse8mbmwkog5wtasarj6ak3kfiefgb0ixol',
                version: 'ezktu2v92bs5s8kzpd79',
                parameterGroup: '2xud0p5s96mnrfrq5mq019glcblc7s8lti75r2srnpky47lv2ai6cpcisjabztc2qbv185qglquyp3sauoi94fsjx9gaylf32ewxp5gpoddag08hstjvuyhrqfrpq3fwi6pby6vb5n9ygfvv4h85cud2lcqgkbm2hi4oc8ih9ef81kmt3q8camfagjf4e9zwrk2zuqd7sngmexxuxh512j8zlneflqp1io5ppnj9prai86qlucryw16068lztvy',
                name: 'ox92kq2zk7xjfy9v67layf528ik7fs7aez8sha0sa8697hmg3qk7zdgepgomhjtcgq6zuy7ff3jabqyennqwfrv3w262tgw7qt0qyl36nmtbztu2xl0jwmbzkg8ogcyx233xyn8eqw1lgshntay6krwqm1ztcniiqbybxhve83n4jopzjv348x60zitz71obm7vtnwdhiopq9vely215uo4m3zusijvqfua9e4ysslkc387t43cdu72v7k3s0jz7z3wuxjk9pywsqfrxbdodgiwf8yl140bx1ftehahgw8x7fr5wdrrqcjeobhfax7f1',
                parameterName: 'a72inu99yowxobrqtyawetjjgc7v8or8svd10joh75ixxdqenabkd4aq1jrv6o14692dbi0k9ll9nq8c6ddgixq3k831k8apk033zn0mo8b9627sb9oktuzyz1p30fvarpo6q7tltjiur5cfel1odstiihurhwwfwytsk2pppo5npspk2831k75406n49zuhw78y1d0fi833arn5fhjy2fki1g2pv75ze90un1h38g7xum37eg1e80xn2q52018me7px7edabhej15llzcmq6ofulxj26246o0tu0rff81jyhl3zje279thegbn1pyuj',
                parameterValue: '330ahg7ubwtg1dkbc2iblr13nwr8gmfpmtmg9bsttav5ztof0ecqhpuvktif9h8q1kf7dc07rliqtxg87ov9pwyighm00qivf3rbrlt604qb1z565cozj4gmqfx3zgiet2stpmu2e86qzknr420rvwh2m1hv9mrnib5vh7t01n71cf30nk6xmhm8pp67weo1mltpuiy5xkxtasz604oqc1756p8zdikee700es3n3r77hm02m1idy84uy58702277w8ekgu99lbo4c3t61psaydpusyfim5j4habrxxzbbrkqba5e2k4id1gf9v1nqj27r38gs4fxjvwo1ybj1jgukhkcz1b5iufaplwmcrp390kh2ps6zwyqt8slkx4uumepchzyw84malz7f29zwfzxdraufrc0b3ykcakl3xp3dyxchuhmxu1wglbz3k7tl9jgw01d5prs3d8dcd091wmffopzdp7q2pb3d1qx30h5jh1gymey4nnmhpyygyemcvy0ipnosl4zbcktdoo6z5y3o6ky7yuoe790fsbafm2x16bygpyxj5c4plm9gukaymzllxav6dnjr2a2989gp4cvmoi8oouf4eurenqv6i2pf8fg9y092s80d5amianmr2x49hkac7meaowol4suauh1m0ke2nidlp85w4288bb2ha5gidganagv4f5zduf58sa5qzoqlvhilfkkk047qzruh66ft8znicmom03cc24mj77ilbcqng6s2gu8oozzl0ncoro85cdaj7t3006ednnwm9pfwcrrxt99fmrgbixuuojc7wz6myt8ctt89aa1u81ez3malk89chdrjk3dx9d81o4oc9r7brp794i69ns1qf4qqgu9q3v1jw71lss1nryiesxz3lon3xqcbbvwz6qqh363i0mjtjnt3clvxvezn9vpk6zs8cnj7tu545g24817y6hst25cylqiwyg4qxuft7teqqn49zlmhmelbbocj04rgqml63l6bxyv11hlzyy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'soeflk01mw73f8ptaz37a12y02p9y454v6qrm6vb4ojibq5rzc',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'ar0otxek4dopvkw6gvs4',
                
                channelParty: 'p97varysz57rjz4mtmnuot5oy34hxwq1fj6uha1dv6qx0gclgry8opx5piuhdy26cvc3kpg5epxm3lqqoesxri2l2b76nyi1qyyowac9a8ikvfyxyxhuny0221mu3j1zwaqufuoliawg0roympg7qsso4h6bunkt',
                channelComponent: 'rsfbejnehy166gdnzwm0y3ek29g0lc5rjbuu9cfpxip3p7zg7hfhuqpfe9acymcqskfgkcdj99hnsrk924uq7g3jpay1bug0c8ikd3aqm2c8bsgdzpzmas0e38my5mr0lv2hswlmqec9wbzshp2lz42xez7lr41j',
                channelName: 'z0r22qo09l0iyonbzu1sbz8uqn7l495vk7zwp10okeehkcifo0kf43ow7ld8ze780az56hgwg9scpdc6mh301dnqb5gxyol022v8e3twy33rcx9q9q6hjlpn5ewchhneaw8wnzpag5vajax6nd5ngwq4bknitili',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '5erhjpvnwhrr0q7ewylai67gvpx7k02asdhdijg4vxchjlgb6zvusz7fx7t7byvbpnfjgdcj26jetb262re1nh20rr55p93tofocsayiqbvexeukb679h9g2whkp7mce4yghghtc6dy93rwf28fn7yy324gxifuy',
                flowComponent: 'fzavtq3s7xb7xpyc36ufdypj27nsptzazti0hegfr8s5uservu9xrxjyrpjcex798jlsum5ood41xezauuvx0mljo7gk2kpoe7jgscf8j3ijhgwbcq0yusgbg430pqwpkgub9gb5xi2wx1zic4smnlu230h24h72',
                flowInterfaceName: 'uwxwyada8t2no24vf74o4yhmtvkftbnip80za717pdvqfhtqmk961495026pca9xkcar9opdk7mfxsdr5wtxeabb7m16bp39lk9x6n47pnky5fihpoafd7oj0djplfo14da2svb4nq9bbaw1xweowm8ef2cf5yr9',
                flowInterfaceNamespace: '48rw947ni5fe95yxhxhdvue3i4wn5wexb9u3jbozogqwjdtz7ip6ynnedcv44kxe5afdnboal9cabxpex2dmau3m7jbvi96vadcczzcnufvl1xwwkgtstnryt2gk4sit3jjevrb2d4coksjbs07w4zsypna7gxtl',
                version: 'pkl7xmlllhesuc7v7742',
                parameterGroup: 'lez99lmy4e7dh98qzmmkumo5aewmd2bc79o1raejarzxpko6w5i5j0v8vbmyaemyxr2ed2uh5gx1t74sasjhp38ck4pg4y84gam8auuidaa5vcc9ip390e4bb3hvdxwnxp7u06sz1a08udy9sbfo0z389ilxr4vfm6iumfeg891fq3nnwy73d0s714twivp1jnofln3ut14cfodkej6gd068qjyocygb041dhswun0uatohnnz4wii1zqogegyj',
                name: 'g8u6u8fbzyn2berxnae0ubaueb5jypwig786k85adsvx9x1fwwvk9ttym33purhb0q4ablyv1zwdx0sd7cuzm8uisk0hglkxw4c9f881fs15dpo8zdhn8ec1ux6f6hnzjly2jljd1rpz406hdqjoan4e8mv7pqp1znz9zipp5io3tx8yhj4xoa0u62855p0ha4ldblaxv8y4mlbt2jnci4jmrk9e1mlf9mthbbzs9uc0yi04bxv127pwc0v6jvav1taf9id7vpplmbcqj6yrw7qq0qbhyjmd9j7ed6b3r4e04owlblwyhxanv1vrtk2h',
                parameterName: 'dplnvvmyfoui91ui4476wdvvq77sq6valjup5djgu79kalkvkum0h3omq6tjo6zpteuk9cby5r47rj8xwgsqcadsvla2eqi9nfzhcdbaq8euv8vvx3llnycgv5fm1dcug5dub73iwizu0bnd88ce0kzsgn8wvwoxel8wv5vmq0dhy54hy0ve300j5cmhm3uh0soib0uq2yabhnwrtuksopeurt1uenytcnep6gxzfr8xyork46qdc5ymt7huam52xlgiay3tjuidv3bipj1w83wqz4l26y5xo7p99cf6xgdwki5cucuoennl8ee0p1ah',
                parameterValue: 'q5z5z1l5r645zf9eg5c499jm67umwr2bcu3jzj8rmedgepi2qdryzgq05v70fpwovxrq65yuclo313sttkw5xpdv901gtw94v7kiu5kmpks5ifrxakbr1xu6x6jz1izhtgienkabev72h26mesweubj9mo5efc7gfttjdh2zmliwxjm3ip7ms443wwpnns5ed09o1rfl0bz443st5v4h9m8qmxpdee8f9gusjsh7c73hdsyz4foq77gyx3qk3hctz24nmm4f99a2hcg6cohgumymm5iu3z1ipkzdrv5bmcbg70hzil536v219r43twgdsl6sxozduv914efsxw2n4qgzujoyztzh14gaqwonlinovfs5toqbm1dju21ivp0nqtwp1a99g7ma8tomox4errt9jsen7cshkobfxzv5w8v19zbvjmffqfvk7t276t36y4d42hfa00cf17l1hh8l9jyx3x88uywcwmyoujqbjlxg1fgmnveaaqyood08l8t5k99cmst6zsbf22qwd424qo2znm356gecokrt5s9yltgpiyad331lxo1pvhrpes6swwqgholkxwxkgr7vg3hv3tc2652kmgikeqri5z3cxt85axkr3hc70azvntdvoqqu62v4b384pb1k6tbhwk6o1go6ukrceu4dn4c1onoji1srqo2qffc10ckj2k7erijfjnd1cmj1b9904td469hu8a5tddfoviily1kwk0zkddht4qcpkc7spbbkulooho3tuma715q4x4wu3x5hhv7f66ek9prjnzckpuk5p0r36pnas5nuhp4hb2xi5a01ld3bczj3um8pmhhelompqlhelblgh8hd7wmllhn1d6ykbmowslezy2q9fro5m5vwue5zyrir56ikpguin06zli0igg2hkjd78tw8yi4818azeyn53nz477swt5b37c7m56bd3xxqb6x95sy8uux2heejcygr7jotedp6yhg0s69yf8vmb37i2ji9y7yb5oug8cxn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'ifxcy06efvm9jm31e3l9eum4lkn79lz176fzox74z1ke3v2jzg',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'or6rnz44h9srxkm3ipdi',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'g98179lq8wv3ud3pbup0vadhogwgdc7uc15y1l8aw2m5brxalv852wnjsno1z4tnoo5akzeqtbli0lwn8je2o3q8s1ghjybnw03wdedti5rpw12o9akl3vtgv1xgk22ncnr63cd0dipj3miasnl1gdcierltuxux',
                channelComponent: null,
                channelName: 'hawjgsj9pdfyfpxjtxh3anlmcca859ccfx1hbb605wphso048j46te2e4dodo02zej6wivjtvcd60gkc32cod2mwob3vshim1ffkoogetgjh55cya8itsui4cftrl8ebhyl2vowveh2e3o0wsu4kagxh8o247ppa',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'v7sndkeu26u84ee1pwhawcjj3ruz3ms9c0mak86y3rfoqr0774w34jl3pyeudrnu33y67lw7ayna0vsyevcbvpx7dk30ztndgd1xpn0hjyyuqqutdqnsnop551vlpvzaey0xw1svb9plevavhix46s52z158midt',
                flowComponent: 'q9z8ai1g2qmw7th4w3dlf5bkk09xt183jdik7c1l465bw8p2by2ydqch0ix1lu5g62tcnqnc9erqdkutmfqbv0zk07knja3kj7p87mn2vjanec2dbo5atwtaq0cemhuwhn0nxcg6am25nd0wiouwx7ofunm65dc9',
                flowInterfaceName: '7nydrcu6fgd7xhqfinic7hhvy3k44mo5nsbgpelgj7j5nqi3jf2td9wrt9473fl51683a4mioed0h08xukmwyklm7y8tyvafsrh7vbmkjs4npa2ngli65x8oogx6ahbrb7bte5hdt92j9k6mkrlhkei2cx4b30r0',
                flowInterfaceNamespace: 'dk0nvjsrofo0fos7qyy7q8c336x5gdtowbulydwdlmcchcg0djcnb7d2l56fdzfv1hkilta1ncpr5k7w64dop5nfoy5zi4decc6ww75v4jo7ly7pcidnoruq4ahiak0pz0p3m35jhp1x6k9pb73b15erx5nspea3',
                version: 'gagqlaq74uhiqv1gs8ga',
                parameterGroup: 'dvfy16v4x5jec3lm92dkb34eourgtwd6xyiumwn2ufe3qjlfw39wtq7rsxwjmfp8rn2af3w11atig6h9dbwum3ir1tcxxro51j4y45bdtsdj8mtbkmg1ubjutkj4uhrhdrececz6q3i3ks8m8pgyayes2pe1okhs2jb36z5y7omcpvegiv7r6bbz27e70tg7foolx0e9lg5jqahtqxg5cv7l22le6dg902cg3hr6wnafp4rxc0g5052rqa22p7h',
                name: 'tfhlwix0oy2sapzoli70ysfrij2vce7iawq2q9ujselydiz64dkxapyvlehbz7k92lt9p86hg7o7xpannwsp66wtwfrozmto1n232g8hzbt006fqe5suvxn2rd9dm1qj8qphq2tjtyg1m63hfbg7cfh6cv0082equ5yj85peulk5oeh175qyeifxebjoeoigo7hjkku7sk8t5qbecp1v4tq6bc0bq34vxz655tam9iv6hm079a4wvluw45app6uyeh10iisjq3h3o575rtf93l8029mg11xe8eil3mvqimch0x1a6tpc3vgvedwz7tvw',
                parameterName: '08fzm5v9aa4bfog1ft5znqg7iyhywps1jfdj6aaoobxpvzq8h2jbygdfp1puq4ncjgh5ahw2gem3973cks8gjv6qmhvhrscc30yt9hy9esg8iph4i3z8iplvavbr0w5o6wdqujzoyvkfb6inou0a1nhryl8nibmukrn75vgbthccv0yoey4241ssmngziwpk3wlp70d6qug3vqycl94hmaw78umldmxyk440jc1oo1u3q3dixxl40rrniujuq9ji6tgc603k3yzho8bpyl6cskoxm1d53683fgr67sdb2cyaje1qcwquz46dmuuambe7',
                parameterValue: 't5kqc8oxu3hey9mvpfluoo5p44n9dkcfctbcsdza4o6j5ynjn5cvq3vxdjev090qxwg9p8xvm8l76v1zmvdqcgehqj5ak7pshh18zl23n9e3d5ffbpp0s371xleh46yndijhu8g80fh4ry67sm35c7jimuqiz6cstvd6oy5er5zul0noy74t88i1grjeesto8of3ndwh1w1j3sbblxs3f1tjd8nlliyrieo84s39iulh35478udrw8xcp6h52me61n78hvtzx05qztczxpcd784ais1vfw0kthotrg35cn521klmbvj9tf05x7ai50zmncf3ros4f1z73j5tgo3qwz65kan6jdfnj0fjb3dpy64sx5vk3byrggdhsvri79v7p3x9iddjhbcsoao175tluoaak4q0o33f45g6xmslovcv3gfedr2hzpt1j7k2z6rbrrvmmbcp23hd6p1ko5iepojh1v74pi01zi2rx9j6eme6xiw35q5bw3x2e827h876pqto297rdhlmqad8i8c9dp9pybnfpjtvlpztm7bcdnq96y9umtrua139xlko3dns46tfq76yk07qviyhp93ytnefpul2os3q5drnrm8zlftmn96gyqk048ylu4k5ft5y6rm3l0ibem4di5omik8jhaqy8sfvko4rlryei8eemvqmm6ww7t4pnpn5iydiohujqt45mhcy3ffxoufwll58s376njhitkx94epnpnion1bdfdz0gl968cm6dxzilciv9at7yujzqewqv9uo46ewkeqma9h2pxi46hknxix5bj3psmpzfgpv1tewq3jrcu4h9pz79bfqwqsapy733szfoj17u7ietbq775sits4gpc43z8q0kb1b097o4aw4cbk0bsfuy8uaw5q1xr6kc8wfy8eergs3c1eerf4j2xk12cw6s09qvjk8c860fxafyj5e5zuq0sfk4ztwyyspgie92liy9qrgm9ur30rappo7zfc6g1g16pnyeqmqb7p43qxf',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'lecvidu157eplqnjxgfo8mhwpv7s2vbxgoiigochyajbj442ie',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'sejieikr8kevj8r9fjz2',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: '53v57jissckd4zdjzextkwqaz7514p2ury7t7bfsm9hj7lap3alpld80zjqo37zqckfond2umkk83p3i8byq3b6gpefgfqgrx1hu1i9vjwdby1e0n6pzedssddatvjyr74cnkz5lrq0dwqktj14nmsxblhcvoedn',
                
                channelName: 'ahabtvsv70p3gi9yn6t0ujzs7prtez5zcrzybtss4qbthef5l91re8quot0020c0sgf8807gi1e1ngd6abtc31vq8z2iy4g4bl9f7c5f4g32en04zk76fqi0sfax753f6pqtc3k3vgu5h3k0wbm06xd695gh2t6m',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '7v2so6u871ordm4zrvfg09pis0hzo543v1m7nd6ixsxc0p2faxua3uag0px9flb7jylcz5p58gde1qfv9sscvlca634332z7jvbbm360nha90hk3gp1cs11x74z368hbi6nwaderhfarr4zu0ceumho65pgm308y',
                flowComponent: 'r8g77ia2wpfh3vdn8s09chuwos0hhkvwozny40vcxuxileqpdmhdkyitiwul8n9z79hfltfxf0b2024xd3fut5oetlbf2uezjuhsghnsxh4zie7tnyav3pogst29s0agg0ilr0r5matqhs83i9d67i5y7l0ae7nm',
                flowInterfaceName: 'v5vgdy109vxmwvzbl8okrq2arvvplim59b1diqxat61a3vc5fuo6d714mohaq996maq5sscao673nw9v39aymw11x6e9qwu6e6vxjhhor5jxrgv6uamjl2thsnu0ipuycwjxl2udqhrxtayfgqra684o5qwvq4c3',
                flowInterfaceNamespace: 'q5v1ug5gl3sldj7jy4r1df5nfr44owa9b25m82fo3i8f7anstgd6bvf2v5d9yjx63ac4j34o6syk2jhglxicwxq1w0adichkcga49abppdlvcoorep9zscthz5cmjur6u6pi0qsr1003y30fgik4ru0ac39d97o8',
                version: 'rft1cswhqtsnkx91g03s',
                parameterGroup: '11jg7x7p4ehneefy6tj1s18a9mvy4rh7irfeiifapqav73k3hs4hplarmkmb4rf0r1wz1o0s0mlu6p8ygwla4jz393mclp0ow3jt9z86etwe1vn6x0kednum7c9axyrp0haau22vrvm88igm4q2d79le4hzq75pl124sxyeq2gqpldbt6r8gk5jfvyrkgqp15rgzoxc46uijansj1xnm7quvy483693s9fznpj8v91zfyjapg0g972dzehvm4bv',
                name: '31zf6mc5lhy19c6541t4ckl78ks54p1v0uutewjoasfqzt9a2c6dkfhrppu9hdxdltaq8glnb0wgyf2lq7ed0qvipsaugue94p1d3xrysadgk9a1pv96ki4ypmg2wpfdlvms59efaw0m2sub9moqcmj2qbo12yup3grd9qt4w07fdqj3eavris6faiztnewlvy8as8rhilndxnvvsd708ubcrkfhv5r6uitd8h93kphlfp9zr0kii6v1xqbd7pmdx4wk9a3c1t58tdw5tjz40cp3olr6w199enjs352a62szqmcgg43r02l8oex48nc1',
                parameterName: 'lywxxabr2zvf580elgjg7j1z3c3cxnsw1eenl294ddsfci9545ytq53oj41wk03uzfn6i47it56kehbgvn6hed0k68f7e9l04qn8zq88a6rwcfavar5fiuqf1ia2o7alxu9aw2wlvt0wvjy167dzmfx9pvc39gtuvmv8yeuj4wdkl5lap8ds1mryhoaat85ebyrdknriz3v3ox1yy5hs3avz8f45hdu1x605gkgd68hdyirszurertwwgw074jczz789p6kho8josfwm6zzpo247cl1zn6417xwtlmjfz2jcdeeiosy7aapfe9bynnmi',
                parameterValue: 'daxdy323qwrm854thqnd5o9hl6bo5olns319pxybzlws6wdv1v7jizlc5fmxf8n5phevx8if40yy0e8sqkhr6vh3fh1lc8w2tekdeknjhd5hsh9wv8jo8bxb8fj6tqswyzr2foo5wveimeak2xforzqaqnzrzeb3004fec1khffhqy3mn79l0ef5u69r7g5lgmq46wye60fafd9tm25own8s00kfzcis4ucuq8xjj9rkuji3iom1bhoiatia18gt13r54bfhj7g8bf1wh506aezcrtjjhrsqfeq1k5htgida87iser4fo0e4da1elw8wob3xqyf2ipdywbkukzbtt9y4676p4jft6j6g8ul6mar0cbdndd05a847oyvixjl1j3l7zsijvi9k8g3pdyz1i3468us8zcjctbk5btvg5kngtrjr7b871nbkrynxgqt1jewpy2jeyfr9gtrvv7v0rr66okl0t9810v513qwmk0lpm79koyath4d1c2v4j3svv9y8rbmjd8gd4mero03b0ux9nintd2vxzuyly952hydc114fj784aizcfacc3n3c4j0ttv5osdzo660tjqxntifwo0prw9f8egrcdzcova0w7twbmut0lb0b0tjeg4fa5xqu4swkndi4ccwram80n7bif124e82elbs7tn3h1nks6reuooq2hoo2mfxythssbvlh0wu6ezth3dk9gvz2u4hhpanpollrn44m2t6fo6bgruw39boorboek02eruyli84ztj9yp9di604bqiq8xr4ifl6hvuaki2fid6az8tdhyyjilvnfdnzfhfc3tw0ol8bfovqs25wovitrd71jlngfwhvz5lbc32kt0v5qt0pel3trplpdselg42i2i02ek5eongh6f1ul3y284jkz1u3r6e9i1te2r2u3nnhplmb9er8o04zoiz6trn8t0sl6mwf0mrocammywosfl3q5qlx6fo21hi1ygmp22762wgz3o84sdx4gzj0oj9gpzbka',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'kl14a8i1nkz5msihnacrpc9jrekowo94c40z1sj38g4k4twgmh',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '12ureyjovw3p9dk2mozt',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'pvl76nvmpnpa2rcwewyt2ck6zcrzztxocqqucoa95gos3tk686jmphn5d6y97btjms1bojcq1gu3q70dych1qy3u231edd8yd1sh20f8tjg2f0g3af16u353g1cuxtj50ax3q6q9zzcoho52xnqq95w23tffg4xw',
                channelComponent: 'xprwgkkohy0jkqab7qde8mgfz6vusi55gs0o8lzyo0gtnrhmw8edpncmbhmdioox1ghi3l8gkgo1rup9mr0spg1ujp3e5tz5fik4lmq6p5u4b2jvo43m94vp2n5x8u57f6qp0yks8zfrwtetqtdadyx1w2csl655',
                channelName: null,
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'l8xysceu5o8sq2ijrwustrqdyz24xe26vudt2ucja1sqzhnil1gc1eg3ftvhbigcfv7tr66jrvzj055jwagjdiwxw0wamcpvakgqt83ts7fu45afeswgrjxaz3yiu5wyp7b2dxgveenfno7bga4ick5olemko7x4',
                flowComponent: '1z7hshgak5mi6kbsgi2e8ukpjlva7k4ryl44rqbinca0nab7claaltij56qwm0v25u8mqiyiir267yuw3oigt64ry9agt6ca26i6oczbde8j1p4uvtusz2ymxod7mfu6p3mi3y6hi5pi6pgljnxmdq2fkcahoba2',
                flowInterfaceName: '6u1hyv7codgq0a8jtkvoddcb3y890qug42uxtnopzzxvk4dye2b76pq08or56g8vbnow6c3hcl9at9ruh3twutm9y8kf88oi97piygtza9yl9jsi2af65cr40ejvqidednc8pfqcep0r4r2z6t6t329kn44s37rn',
                flowInterfaceNamespace: 'dqyaveznvh5j86xgtbjhwbc93irrzi5fulwf6khgl2bmkomcjhh8osj7loazb2ofzivjxi7ukutibqwseh6xkctgmvt8yq32nfu80y6wasjsvs6ae8iitxiu355ozn0w9toooxljcc4lxgjuq5h3dimqrt4ztvq1',
                version: 'um3mfeqio5r9rv6pgru2',
                parameterGroup: '7on6dumzoa7tpu8h042qy9g49eterxyw7s0im8f91krq90ibh7ohad16yldsicbrz75ct3bop3gxw1pagy4f8t6u7nhz5l05xyt319bj4rydpvv6vbofuvicxse6sm8k47az0qr129ovl4e1fsw976cqycv9ydrraj1dan4xtzzhrei9l4qq8gnaiqq2ecdqvq8ajujneulqh9se6p20qde2abgifmrqq0psujdox2ay8918pdi4hqonudd3r2n',
                name: 'fa4tqhs9b67zi0x23r92lh2wpfx0r1mrsgnhfvgaa2zdahbj2t213kfdz5ftudr9d4k2u4raxtt2z5hxt3y1tdwbnkumk541jir35dy8qzi72t7ttq5zxnj6yun48lckho9aejqhsekdrsbdkpcwoa43jvdp4psk3pb3ufvwm96osadde1ckan83c0jfgv87s8llefocprz92zrfk32d9e3xumt1clhv2bp9hi7xsvub92frfiz4rtw6o127grtoaqyt861y4l4zygrdqdq0j17zoy7ini6woyudvhkdvthneunybzj1nrbt4n1k3601',
                parameterName: 'd5t3qosyajv9gbv71l0bzlhwpv4ujf10n791mc3pzo3hjwj4sx5bcjatjmj5yiplgex4xtzrn2u03rh8lnqfc2mel7yvlre1tjmvkr76m1bwnm248mi9gi2mi9p51fpwmupghaajvu1hmd2d9gptymzhgby408var8dgdnrghhhutldq5l7uaj9vcman02ferwnj4fj7mxhui5m9lvq0dzsw1ccdbvhs3g6ob0qojp5quq7t0iyzkm3fv0ue8377sdfqhnp918en5gospermsejhfhgx80kceet79uw9wrcvgdjx5a68uigonsd3lp7n',
                parameterValue: 'cc3ky4dqimd0vdo4xrqefqmepme8kdu09m47m6bs7c68xkx0uzcadfl6e1t8foa9eegbq990jc3g0rm6iwhfd6wrj96pf2s6rpkwmo9h99q7u34amu6e2ye09mspv85sx1byaous852tf5rzp25sw3kocdlwhjjxa65labrp1t6tt4wo8r0mrnpp78g8lwq7u96o3jz6x5tx7t3qpgf2rb9p7ull23anqys6gowo39ianpvbnoayy6i9is3uqgblq76k1cc80hlav21ud1trjquld8g3myb5wx848w6izovxgg8p1jj08uu058eoutd7ngpz970qzqvy3hvzxe8t9m2kdh8g8ozznqkzi06jop8pa86rk0qg93mc7jbh5f0k8xpc2g7grd0o1mfcjfijj4anklm4shw0ldi4t9yu0wsftqymg3nfvhmmc3cfziul9ergjpi6244wj5oanfmez08rjbf75j5x6v6laeg8ikdy5zhzvd2bzdpv0g7vdjysdsnb369cl7yuszzjzofv2n3ho5u3e3z9upie4k5mmbrctunc2jdlcg3r940u8wam75b8paamp9oo7xlk6mbxt0xzx00ofbiveeioqu5i1eb89fplzh62etsze23la080aa1emzz7mo7smnc9pvjvx0ec7rxkgi3p6lew5jr8v1j9autbwzswkwcr0fy8wz7gzme27e47lm9agb2umdopz0dkduzvupdnmk6gg8h06v76asajlxsocheb60yyo2b993kezx2zqnvlkytbdjvfezvsymxvsqpxg9x84ieetmxobvdij6h1pswkn5d9amh1dmhujxxmuccio6lp5uyx1454mp1dqwm2mhmxsmlm0ae2cb59oqecgiq1wbucf540khizy7oiism9kooi9xda8g63aco510wcudg060pqczcpm9zz3rh46lyf5k9mgrx1zjsa5yqlruw52jnajrtlf4ixlcv1izgov97apddovim0c3ijt00trf09e44zrpxt',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '3inef9mg0ucjp0gorarqnbg9v5qkehsmonxbjfoh3a4kv5xci7',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'rx5rca58y0u3znqagilw',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'xmthwt3namwkourhd3g2biocgbk3amna0imjbxiycbhqjek1uuj6z1pmzyi0k865fq1e5moblmel0eqg44h7rjwo3eggigznzisr1zlfwex5wufa29xnmsaby75svst0i6o1lfw996zn8iscth09uhr9umkqjsds',
                channelComponent: 'gpxxzjmgdidzeyfnnpbn3un2lcttu00c6p1v6xxv4eslxuwts6ih1h4qm65er09brfwukta52me97wnxx8aj1kp12pj1eypsa7c74flgi2jzxi9tbtfxjtodgk5o2aoffzlxdop4268sol3j0nimqbk8g5z0of1e',
                
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '5f1xek8usy3zvcboi5u7gsgy767g4pbmjznl08pnyavk64zi88qnesvwzxnm0mvhuexo2boke0160i3om06gajzqfrvrsctxjdyg41rwzeadvkbhfymlf7q9k74ytmplnm4n21b6hh4mxpkxg4bj1ryltzupy8wu',
                flowComponent: 'srdyhkaxqfyazibd8sazx26mme31y4f1g9a50hzk5djjjhq3t3v0elawy8ymt0oy983mbjt573jgagzz1rnmvnlla4przruhx7wp5wln6me3udjgowtaeugmpflgu0cc7p8whefqbk48n5imbvan6whfi6b0zgrl',
                flowInterfaceName: '1nltqttjykwjy7pszwjx7xpyvsu6oeurwuvva5k6fzmx6mf7uovrsmvh86e4jgulqdbqumj378j1ngi3be0nij0oej9e143pdf0ijzc61ogyevaxvxy805l9fkfw8lho6i1jrdcny14t67vkww13tpfw2wwz8lwu',
                flowInterfaceNamespace: 's9ldmx1zexhd4o538sz9mu19irtexvo4z725oeire5vmjow4xyxnzdnisme39xz36l6h3z60p7lz2nqmtzz1qnqr5e0e76iu005avavcwmgfgxqre8dpkbgv7ssnumsdou9htb7qlea0otd0ly9b4wnys7aph9s0',
                version: 'h1tr3be3u96sc8atjkqs',
                parameterGroup: 'm12ql2ok2whzo8ei1ehllpb0unmkiqj9njfk2xz2sindoujrw8z99s52i1wv03yhoppdl8w8t6etuyn35rywks1sfyhwzk40kjbeg4thpaswofb859tfg20jc6jak20goni60l87qyh525mmav8tg1yvqa1nlbqbu3oe5n0iuvoxam0g1z87387z1yv3zlf7nszwoq3puwfvawsk5qapobbdqc1l1fyw9co1tg1gatrxnq81uohdkzkrmw00var',
                name: 'ysmif69dh37m7s0p2lm3tb62rla8qwha6ofocnf6tqjb5hnmqyiluf62hjvlizumeegkn4q89pn3r7gqa1w37a7lwduir2n3zfj7iplf2tvnwebxk6p81wvzffth5jot2tfcokg9tzyo3qty7clushev1e5o272fo1sfjmwbo4n0zn96eln71um5732v1grwabou53073jzcbdiz6n4gq0gg46kdxl34p3wm0d60ges2km58ndooy6v3snj8ngryxl8o91lgvwx0vibt0eozjjr38rxv357lqdp626w1jsdvge3wcbtwfrzzwa98dz86',
                parameterName: 'eglndhiiz1n9m9sjzx9n15fvpxarkewpqe2k1bqizxoc3ww77h84n563gfrdb74ptfx8y9b2tzl1bpbbz8ng0se8fawc508d09smcnft4vcjfmusvvo96bffpq40f24vcp7p7r2037im3ly4vab2rdsg9gp29cdoiu2w75pmpz039jx2iacikd6qp6uhdqac5ty1szjxi9pbh8s1lsqoe44thnm6lrw29q4c7mrwvs6u2395bq10pcr36uqrflpqc7d0kq9091bh7w670qsg2aerdjr0cp3s5fopteo2wsn2zs6nyhpff2vbejt3y9qw',
                parameterValue: 'jk6ds8nu8y2stu5skxq2eonmgyz63ds9fy8rard6qnbeavh77yiukawo39bgn7aw4d65mnpuw39fk7hvobefwziajb1nv5mkd09o29jvw1i41sew8foaut0j97oxgrlet1g4uzdr5wsg3du91n9wmmye6kc641kmiknb9m541xlwcvj3ox4hupkk80z0b2ue0mytzqsty8imq3sszbalijuyc80v4er6iiv703fi8f699slnxl5p4su870rms1du7z7rl9u2j3pujhr4palj9pe25kclmicy67y6tk3iir14mz62lr9xoi2azuh6qdrh7vrykqix0k864yytp7qjt82w1kbd0xj3d7q0p24a70d0sopshsq8y9fks7apt2yk4m0t0w0v1v2gqtwn76pg3g9q1fel93z2hh2zyqsfjx4t2tckyzr164xvjsn7brypg1mzzh0hn2vnwgu2oocvkon7xjjkh6g8iuji6xove1iowv992aquf99ahssszx56x056okxeld8jv9boauspbbrzkusp4dw0v3hok6t00wbok4tcxol7bd4f6nxewsfexsu0yy9gy9eg12p6ydmmp319b8sxu35gp8b5gczkbshxeqm5iamfa80k9ggut9l4qxbpohaz0aqvf4ccmiqswcf8z7xf1wwddmtzse9y4jqvyvfxj6dgj45km5wcnhurm033j6o8gidecugmd9g1fhiagi46avhcm09pq412b41nv3dxd71j1t6qqthe1imehvo239d4ik19s2vtx4tg4qfifft26q5jnjzapc4g3o1g2pdlgq3lpbun061t97erjof6m9v3o425c5cler697ev920j927476pfctxxzku8rtsqb0kvth5prswv0n3jelxacwqwhqy8gvze72w9i03fk3c45vbx4hghjb1ocd06e2je8bvmk9ebj1hnu6g1l0vxt4xjdxb66k2xxnuafqkx8k2vyjx6uxu36192fgrujeg5s1dsanabw7l2hzme6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'ly5xwgd0bgms7rr9xah4kio4f45cbf8qu36w7jikn2c9edzkb1',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'sox2rz7lidk52w57hqvq',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: '2kj2lxryx9xfw5mfwzh2m434emfkwjpgznydxaxnxnliiyzoeuv8dp9wczywpxyrhwdf5s42elqls3pnxosabvvzh88qbvqebdf7qmfffqkv6nq2acfis98967c2tp0ipufuvw57503f1jl4kx0x7mc0585dahxb',
                channelComponent: 'uldg55mjm6wmz8s154mp5krtrc23sbst59ufu837s03pmignjlzhcmn593qzerxcxk1145wnr45kow7awfa78yp3bw5id5if3di4iwvlfx1zll7ddsjnl6pb6k9kseoi38hqj8rxd7pwvw52f6hl4h1jp0fb4ghx',
                channelName: '1hpsahkdvzdb2o5rp3udk0qtezskoealji4u96d9rn9ksyl83vlt2h0lb3jmpg9vgnlfzmc2w1q2ta4uvgi0kl7skkjxvawekseqqzk8zqeyqx2fr9uzxmf6lkcscitfbmz5ejxm9xrafowts8kfxrcewfb3trjs',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'mykv9n5ks1p62rymqqsmiyfntquowqypswcpqf1shze48b32iyfukjzwobdg5yifb7e2mdcpu7lhp4f8ma7hbk3qvq7fjk4zwcxc09bvt2dig9e8w0nn4tjig3re8gdbkip6rwoyg30ywk63xqb5nml3zl7dug2t',
                flowComponent: null,
                flowInterfaceName: 'owfw4pxj1ufmf13pekt98tjntorivz7q5r6620dfzufihy1sk73ob1wv1rw49te9e1jl3m6hjthjfpp9wehyxtcm5via0bjxigg1iaauztt8nval2f6d3pnmybnbq24uqtcpcrhgwt81ovii78sjrhb3d9j9enwk',
                flowInterfaceNamespace: '6xemouov7wio8j1mxbtwtyfr47a30u5kxxxfmqwuamfw9yplcmhnbdiy8go6kvha5zlaxefoxzq6ectx83nhjau9bqqeouuxhw6v11hoifrpwtsm7gjskc5tu0b2h71sna38d1yexne73z0dfwgrvk0wp7i2gzz1',
                version: 'j9ic5kxxywcix8c0bpbp',
                parameterGroup: 'hytv5pnnnge1pv8assvjeip1vh3krme1dconu6z4t5wfaj9s2l7bbrdusggrh2kzjk67d7xv1ntpvjpel6jd3j00u76r6c9qoaf642md8oni7z0a2x3uajan4yh3811y03lhcxw0ru1vkfmqrq3o9jic33a3ah07bgnajl2fpmgrwknnw4dgyetzjvdyydsc9v2bkvjphjt6opph7k5ibmsj8kn6ipf1na2kb6m6zzsi1u2873fhydg87k25ia4',
                name: 'xhbbfdavuc1xzpkgt8pj9l3vpco0hek6b1ena0gnbtyrtwnz4cuh4g4uu9bg6aseo2tgmecnc6eodtx3kz60h4codaii5ua85k3bisj26j0tqhghhvsvwn2wlt90f65ipkbx3wag8haja0oxo7cho6oik0p1ljr86yl69ldchuhdack02vab0n8mahal68d04kxn7x6ch21o1xrfejh45as339ecdtvq334njrpastkb8fngk8xtlas8tzpscno1f4i7uxw06mo9y7j5jdt1fhger34r58lr3jveklhtvcekwjffh3i2wi8a3ovccl6x',
                parameterName: 'x2ixok6ll0g3bl425l85m5pwt29qm1di541o1w6x30zzxmxod3dznvyt0a7ij2lmn41zlcnohjvgkmxokdqlt74wurs3g3mebttcrcd3z4h2m4tjw9lcunadmc6l44ab771fzx5d0sas8sfx4r66xipf9zje9tnwgoorx7iqz3or1rgrbzi8iiox4utwthoqwh3x93f6sc4njlzfr2umdteur3sslfq375oxi1jnwcd515p3pr5wvc87j46fv1z76gomv2k75ewb7o1veobu5fsbxoeuhgrhc8h54auhkq7zkot56o3in18bp7idf5wn',
                parameterValue: 'c70l6t5doqbaaw5nk0osojrin54e4an0geb76ydp6rfue0tvm6sizdr4chbsq9ol7rngckpqc6v3y9y6uzicn460m4uihkqmdt1rcs6e24aqi5edus4j39och4w1qn649ae7y8fpv4om35jjbgwbfbngacrll7ujaoyy1501irrf0wqea3ats0yshdb03055vf34ilp93pid8rdt7euco3gzk5j34orazg03tfrsazseyq9pu7s09unf4z6ycle9fzwsyvwlgw2ohactgv1udlxbtp0lbab2tmcmgs66g52gpfghjuyiadk29tx2qpmd9oljevdwvboafij5lsz761z492i5lmsogoqjtuslxub37gxpsi081iljzctbpo52akadja4j5e35jj20blyjdn2bkfg82fxbhxk7t4ainx1uax43zhr3smbbbr4pm9dm7prqc9dk0c89u6sgbo7250m1hp9ntyr67p4pfly3lvb9t86s56ilkv8fgs0sjgr0zvyi4mc41ilxdkdccqy4ox0ofgyuwjkicssiv0byq2fwqo0m0dhd6q35brikz91x7921bllrp8es756xe52bfci31e0anampk7hj2akdkmbugtrdbdd8oxnlnf0z3dpu2jtxfowv9lsm1cmqtycbpomhcfatifteeea7utqk8bfofbctehsg2badqtbknh15l0ex2sbg6kexhvkmbq3ig85uvpmvkr0aji5senc6soyd2g91ko6yw17zjpj9krikygibsyrg9b8ludmxp6tjo238g6ghpn0035t9cc98cfjjabr5yhfzg8djf7cmebyqz2r7n6oks65t8p0ylg48nueo02dd7z029f79kaz5kpcogt2aajzyr87qxj37bfi4barhf1snnyel8xor69unogluelimtehv1chzaqomvtt8m5her95dzc9e3d8cerh0yszukt3xk6ils0nyazk3jllhcvgfg6seozfdwa32nqd4ae4mvqjotc1hyl93447s',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '4sz23ba09prkhmlmeljsobhiip9poio9nmqu32b996467khvmm',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '9f0wo1pqippgoj2kqkxs',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'byamwtwm7ykiqjlejrhbp89wzzy0ygffzmws7z6w4cj4zdp409u9m2zfvkn9iytuqep9aloy9z731744oj5uqm2d4k1225a6mnoorz0mt4b1wf7at7hc43s4nrnjv6aku6doz2tjpd94upu7efxy2x1ffhsu0e12',
                channelComponent: '84pkr0zscl5dk2yrv57dlcc6xepakq4mp7qe8erxye6ytq9ehh8p0170szezs4bc7hi0be4xhhr918yx40gm3x8a3nhye4u5rmh8o9d33ul3t3h0m9ddlq555c5j0fc4gfuhxjeujudeqztpwb8m6jtwa6oqqzsn',
                channelName: 'l0z6hgxwmok72z3lc75kp30odlrwmcef0tu58eftl18xflnf7odq1c0ad3fqxvbac1r4gs3wuigrgo94fcg12u36pcyamgstkzka0s0i44xq6od82t9mfd7jbl1qvyg04nnv1kybejruq44w9u2m6zc6u1p121yl',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'hgxiq9p6686v3cei3i8c77wcmpttzrnofsb72m3831gntesxptuf5u8c1iyqkebjxer3cor5eazb2av6n68z0vxslqyegn3lu21hhze73tjga55kounxygqr6v3q4zz4d2q1c4s4huqilxm9i6jt81mwska3rdiz',
                
                flowInterfaceName: '5z9xwuvd85awy8rhpyh7n9uq5yyputxo1gsdsvwo5h5neoiae07zeunresah6u70l549kwst41qpi0tr2jhplw426qmv9uyx1uo4ewjrabmoqo0km2f82trybqzmuoeninfzpyms3vpgvbg13x1d3g8vslscrkly',
                flowInterfaceNamespace: 'rz3z32vs538qfi1mwvznh2s0e8tos88aefmilp6734zhtzdsk8ywsypgq3j077zjakoabfkzw8uk0jhp7ddlb81qwbqsfgurxlzcv0diccsoqhiea9iqr49pk75q749a8x4svjdlqsz973uefg5fyyojch05m49v',
                version: 'vp6sfew14hbjn13enq91',
                parameterGroup: '3m9lq6bm9xjme0q5diy01fk7izygntdjcpx3irj320wdbzqging0krrzijth9vqwubouvqnnu6juvob9ncqq0sx98qnj8gcqz8ld4u0rp22l8m5nbgkiepzxic2g72ptw6a4xxebl6f6yzai3bkzy8hujz3dxruovqileun2epylg61qdhc0kr729262ivi47khvydm6g78owmzc2tzs68uzq4dmf8i7ebnaltocs4jgo2xrcpz8zc3x09sih1a',
                name: 'rk1qed2e4c65mjdslmfpzap2z79wqdo2lfix947ku3gylvr3csf9scx353ku8911m3fidbh2vqt4fqcjm4o81c8jhffdsp4uur13opw7za6gm4gnay8cbvu0dgdu8w6mholxy7towwf461vyrpby3vypv01tfmyylwwksl57fnfgnhjmwwem2v03qwc395gh2du368vbz791jqa9scb9hk37l4srd1pbwow7wvoh0n3dr6fp0u8aexdd8hze8u99nq4k6id9pi5d8wyjolztvxoi63kt7g152ot98gb2i89o2lbvt607z4cfvgjww93x',
                parameterName: 'kdubympby7fh3v7zjfi94avlqgnmnekiba0dl2mnujc0ywkmgmw5on7zl8kfhkzse4p426hnw5oqxla0ptvj21rrmzz9st3u87xnyyk767ah17pyyzc50pdr5hthvdahxzq9bl8ff0lyvt6uujlslmkwtb622ou0abya3arkt9iiuopp47lcpz06e2rnfs4h8ozba6ze4349n1caj1wucpesryll72dwqg5p7b3l55px2c2b1r4b0a8yk3pu5yog2vsueisyoyj6c4guy6w7zoetum5rac02h7gm5cr320cr727j6kh3ttsmmlkqm0ln',
                parameterValue: 'f6wl5wgundoevbapfdo4tpbwruzt1x35u3e7ryl5ie9fe7uf2rynojtc7ettk7zhrci87sdy4huc28o95ckzdan24k8ne8mfleeovq20ln4zqej2i0zi1xnh6x4zjcfispf931sqmna9o01xbf1q1hqbdykw86fbbw4zwc2r3pj1cs0n380l381mzbibrqp66qdyu6zbmefkk4am630t6afz4fvepflb7404iwujgvojc09a2ah3hco37bhxje2riy8ziefrf6opa7a5j70kcq9z5b8cage0co6ga1zlou3j0zqps4qe1fuconxv7krt719fvit4lwm9c0gjvsdvd695vb26e12g7u71t2mx5u3n8h95a4qzs43zkka24yuvuy7jlk3kkdc02yzobrugn3vruc0k69xrhfdqzwxj3jg7xgqwru6zz8q6bh2u573wg4ohz1mron3kvecmq3ipv7v5arsuapcedjua2j8udtfxvmjizh40tdloz4te6kpdcnzqk2gvg21yqwnhqzswenfsshc206hxz0oed9z6ir7rl5m16ctga10ai9vot1s15qvpt3jrke4on3kibr0vhjar0s9ta3gxtp1707ct7oge6iisqsg2808run9cc9vhyrv55qtrjoupht7p28r0d3794ewgr9v9vaenrbqaqtotk3fn38l11pba5cko6ukwsio9nbilrzfh5yv8qc2r7gqdco1cdcy88l5j9me52xhdwcbrgvnxucp77s0hmpa3bd58xxjooqp8pwo065xl7bpmlc01bf1ghfdxvtt5x7sce2yzzcf6v5u7fopcsawgnd0g1w5fr1b11tx9h1c69ix8xqrpysjoz4rxorb7e2x1odxpzup61i1asovii7ejbim0sozdbij25bivm4zm2svikncn8gh6k8ouskr43yss34nqjctkeza6k1d75kj20d74w6ma3s1c1423j88knlqu3a85cuukiyh1xqlt3wkwpyg1gkrrbnurcnau64pg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'jy3rrn8mf695z0adut1gsfdaeir1k188yl2ljh4sd0ddioatq6',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'luby8rqri46dbiwn45ca',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'iuhdgadgrapcpymgaeb6wpdhlsrsj7ob6pog7t197l14dgrjw2s0ylhy2i97n157nhznf394fqqkysf8yna5s1r8g4ob3vdzje9k5gcf6n22y1mpmzg424av8ozkm0984eawtj93qd9t5bbp8k1vvwd9i92ozf2w',
                channelComponent: 'rl3t36t079bhoqxxnbsijvrixztk9jp6oldp50uqz4k5lykrmozp9sfqdwnadofqv1vmb3829wcf7njf4gqcso586i2pn4itao06f0tv4l5khnskedrieu824axci0hi3knx29enw59lstlj4s4rk103otrhzvzr',
                channelName: 'a4jkds18kz7zs6n1k62dy47v5ddxx7q216vy314ete6to6tc9lja7ci54aj335lp71rxgjsiysm1khg1876o1j1mqi3m4x6cusf2gmpmzzji2xql0j3pznpu4mdzaqjycylfufx78nrzvl973y2sa86sllbiyi11',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '3yzc2vwqjz7202my506dzyppmgythmf7b764s37x21huhadmrshuk1u9q1smfdhopn8p9ontc25f66jyy9e9pmycns4wb05uugslmshyxsnwfx5dzzfzb6uhow292xrpmed3zhtmvwc3xulmt0uj4qxs8io89uey',
                flowComponent: 'vm19q1bs6cmsmt772twrfhjo943e1xkmdn5hypohyok9yzerso96dyjllpvj0ctjk750wph9da6q102mgy4ki4q8yo7gsyd2gr9g3manu26t81oxnmdx6zfovge86bq7ocst4vc8ubt97ocffdo5lt6hciwailo3',
                flowInterfaceName: null,
                flowInterfaceNamespace: '9kj8zpvagv24zlf3yfcxiney53o6kot9h0qva07w716hgo05zvib01miysx27oi8gjl7qi0s07iv8gvmzildhitl9h62xnzgitz2bxc2szmvaocgzehhhezkdrbvony6xowlvwqr0roygkz0gar5b1i6w2tcuwjb',
                version: 'u7rc248h2z8816h9dx31',
                parameterGroup: 'hxuuo9u29juj4egr98a9dtat8uov1d0jxusf3wlzbgf4sfq1gufzb0sk00xe2pata9wyh4gviufd68z558rvp8kw1ry19nougyrobnu5t96yz0pcpntsr6l23p69375kungo7b8m81zztzgikwh9x0bjodq83ybzy7l77qzs7uk11z7y8cr1zbopig5uqfpu3a191ymv7qfe5ivvwl3zt2x7lmsc6yaubqu9aqnylpl2z5fb5j385bxqekbvgwn',
                name: 'bmlb4fi5hbiktqnsuexjl1rlnorljtep9yagxhrl6ptstg1t0jwu6vnd09nf5yhgmdfkl46lz4a6ziclhjtuyf8110wsz0eg1jpsb935gistricail5weemry8ab9ktnjissri8d54np9870d5n8zn4fj6n521yrutktjc5r4l9q0vtl1oitjh1ecjaw43y2t63q07qsx0iochvysfiy3cmhb4vs7q1z0k7cpe2fjovg3b26ktc9a40a2j73wriq3beaejla095q2l3kzy8cj00zcvqmggfxvf57dcfac0a8i7v1vr70symtvxy780y7',
                parameterName: 'xpofhij7kft88xfv52jhti8yhl7p4t8cutbrep9ageshlv8g8f2d5creazd1ermbjnpzf3veli45g3u43pzbn31341eb9jzhf9kxsh51o9h8jawl6e0u7rq8s88ir5ftk975cvdbqajqcrvjc07is0to43e9g7e6gph1s9bz1bawq7kp930zobjbiyi5xczm786r51i91tpbgnlq28s3ur2tjjvj02o6avhee5twcpgroz8eokhr9peva00zhhucxskesj5jt2j398b31q2mlkt6nfko2uv1m31em4161zgvken4h4zmyerjdpnojo9p',
                parameterValue: 'ytzj92aetlbzscxrnj4jt4vzrcoeacyaiy9obe7dvk9hc23qld10iz3g7v688q23pyn73cqr24mncggcwa2otqt3126dj4jah649xzj1worn7f8ggwmfc5dtzkzctiuhvu17fl89kba63urgi2t7jah8uwzgi796escr9y4zxbqatzc1w0iodemoz7kp4pi36jge2d59zh5tcvkjv3rq2ebw98vroeet3lffeawha14wb1kb6dylgrycuelb4ekncon7u5ob16fuv84wty51apndtduowumcfvhelpb3kr5lwl8j4bj28gu8czwr6h5m9nwa6y79q4prah0yhilkhwlfcj5uirfty3r3kef71kyhuzc46jut32rdy48kyryw26vzoesphnsjmfv7e2zls16qdiyobvhi76jcsfxb80ft58xyjk1kr5w8jetru0mlgw9496xuymakinwo6pkl4hzkbtd69e2grcege2z2vp4wm43adxo6v9f8kt9scrkhh0ei08e76q7dyfnj0xue63vmj9j6yus2s6gzh2y8ghfecfveg8bdvu6azudzt5t7cbch250dcskk7axazpn4rw1zs8kjok7fra6zvknjnf1jr09nbvnncs491o2meci00rg2af5zdv7cfnizxu56qy7t20uh4z6xy51epavrcjrxg46l14vs0rpu2pvbal4oiaaialqpuknki89264px8kelf4cb2zmfm68zh8fhqgsboqnnba4h3kh7cgbinda560s55k1zhoofhn8ocyyhj3blwrj4k636274l3tigmakfktn5bn432qqlnpjl05stfocqrh3h2m86t197z3r053eir6vgbzldbucaa3khv9mm8vdtsxcr3knenzubf1fnseevoqz34j76e8u2njgereg2nzgxtat9ck9oyhh2qnp9dgzwk0odz55jpmlvtf9pjuspbtx2s04xu3avcvepf3rt4n3s8osjuvwmjgukgrdhrlrb32jp0ae582ivbs0l',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'ovqn49c1r6kl63h3v5qt6jkx9g9cz79wa48s69wdmhpqqw4531',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'syos8st63khgn7qu8709',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'rt297c8yu5guwx03hpj3ssoakszscf7n4xptdn8djung1kww3kv5puko9xe62j3unccqspfot6cqz34cjkpojrt07sjhq4affplnyfu5ucvhef2kcc03jt50np174bpaxlx4nevsxfzccs5uzltzoiy963cijevn',
                channelComponent: '29a0276b59ffmj8cp3wr69ztxkd670cemd3pmvma8grr7yeuzl2ssg0t1s2zwqxmlp6hxcrjnoaj5qrdrx7yytm0en3ypw3xvtodwyb89n6qpxax5yng8c86sofg5iyfs4el47odg437vyzuozltfggnhvpq284d',
                channelName: 'cmftdse2d1katylnf53c82ska2xvnh6wskun6aomk3s1hme4uhi4x2mmkip9za84kt1cnx8cpef4pobvrym6xzgol4z0r9909vxr0957dt0g6zoun4xfxxokqov9e476e8wvv2ox3cnq6dekwz09zz8c10uhvfzp',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'umjao8ubnsejlesukn70uqziug0hi0n5um1err81lkxrixwdngd8bm5y28cihj38a23x0q3phven1hyuugk2k5w0rgj2hf8d65uxuu4rsfrw4eg1j5502xbdkcjm3zxivy1sygl21euup8tryu71tuxdsw5c7210',
                flowComponent: 'fklma456wsw7wyv4q9lihgq3xnflgmxx84aw6fkxpmu6ah11li4lepdb06po1iqegl5z1wd60hk7kq4pwd2he7rxzxw0tsoic2lxvw7vyz8bea6o1xjspo7lwsah53h39xprhzqzdkwtoum0dsxtywxrxtbp2z7u',
                
                flowInterfaceNamespace: 'fvdpumlnp8espqibnuv6c78npc6pt87sj1ra8xyi10cscfpujb51ee50uy2hzxk5ld5wi843yydokrn83fb7473cg53igrmdcmk4oynmijrdhywnjizzc9rnzy9zwmipyzanu2ihhubj0zfv2f83rotvocs0ef10',
                version: 'ki359gn06rqdwvk6rtx8',
                parameterGroup: 'ywadfscorn9m4hu5hw4x9qaf0rqofjnx8osqb60rxnozbtha1rd0217lgyb8r0ptmxf3gbxn09mor0drj3laxfh5a2lws5nz5x6yd58mnnezucjtvoedbyku809xxnn48lgh36ht5qqahj973gdut8kkv2joewsyxtk6plhuqezdgpfmt05kclc4gqw2oo5i0uwosqw084hkab0smoab7pfsi8boekfa12rdpnoaat8diijs4ebfe6f50otglpn',
                name: 'q4d3jutbx45740zs5ba3nisnia9y0dbtteph7nkr229ws41xfw0nte5n8vz3qtb94t0fwexatmfc21q0q9a0jef639x5hmcxb7p0mfu9mezmqbw22lj8885rjisqif3iqkswyx42sc9qcs14eurh5ullo5tn3wmxeelkcn5o70oovpw8lnj9phnu9qkhqh3wngctcmuaa9hw5cnbbg0p48itn1akbd91k6sbowzq3zhew8qm3pzjqkxasslnxaayf5dxneknbyb7t8y1y1ao1fu6isbsxogi7g6mntco8683uktd4zts0kv8pj58j4u0',
                parameterName: 'x1nzgfz3hetbvlirkn7yo46ueew1e2g9l0eiv7z4babhvidlc158pdf0841e92avae2pku32hvjypcnaclho7fce0p8w2gphm6xe8zjt3i85ps6i8dy62obzeemasjc5gtuql89tvr0085kmbrolo5ozrnq7sksso9mfm8xfhp103j1gbp6kk8arf88hl9h4p9fwjh4z56knbt5tj317sg63uwmyie8qixkfgfnt5gdbs51pgszh2fwrgak6xdp0pddjxzwhhenn1lw1m1yb0bu50qz1l2a0u1eqcns432nzhfnjx6t5xa5km6odmbwv',
                parameterValue: '1lihs3f2d1aglk7obuceecvpox3ritqyy9g274w42qyklhfvx9zgiep3kndtuoo0yj6v6do0w37lc8vvtjns4rsdf1pb5dq20qtz70gbwunu3zxxo0u77waosgjfp38jzxdm0pxzck828djbxnh0xkolpfhjaiq8b32wfi7qsp0j5hulmzej4z0tqp6pl478vbevf4kasbqwku6s4y2p7177f7bb1w2oyaa795qip5cf730jkibtu6l1aju9ld3td7kfpjy44824od8dsj9xs4zpetaoo8hhl435glai6od5ltx6mbj0uryzsc29t2tegmvf3hdm8dzvry6k0yyqd5mbnx5ks8nagnahughlcuome5j0aol7pu3oi6y7iclzfq7frdyre78tygr2bnpw2az80sk7yevtu2z3r2yc3vn0sonfbeudgksqx94veqiwukcgr5glup1hlpv06c3wsm4hcvby5jbig6lqpiqxw1h01qor99ehzspz7tbhy3iub0737i6e48r6cyyhuqlr7oduo675w7020gg4f64zwqr2nm8ytfx3509a97vyp3y1797e157mr2uex72qdxwyaniwfcox9tl3x4jtvp2l0hn5mb25f0zmkmcbte2cey32oq59dcly5ojvm50skkr7fuivg82h3kzttykqptm6ccu6opluh7oqpd38v6z7s9lzg54k45cbl8z0tuq3bi52brc24qer1n4zcfrib0ajuk4h3ohadytoqsyvnob6fuyczxj3exrgg7tk068cowr6j1ckgev6wiqq596boogpqebsmkndne0ges1emtc3im7aget7nz6trzahufgxi2uduyonygo1wpphl5bgo0y3sxdpqckned5sannfnkqb5l6dp13wbc04pn42ugux1xwbat82gx24tmf018alt73dt9n6ujlk5qhsyl6ywelu0s1ncd414zife3fipo9up2n6q4jfdqkfx3eh3958d4zw4arej6cbv2a2z5tr3zshqsal',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '8zwd07ykxmyr9yjc9h7cdshf66o84xys3jp8oou7pt4g1vv0nc',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '4ptycjfvjhvmweixt3hr',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'lxrgdm79uaq6oxctkg2vm8ly2hpilal5d2gd9zbbvid7z4at3fliret2qg2rqums9uev6baq9l4ixgpfdwfraupa0bjhh07er4lpv85vlar9l0133f48a2maxdok4nohn7vk982oqjoa8wfv9qsi20mqbyj2znba',
                channelComponent: 'tmqh4ii8jbsfrg8lz98frwfwi5jpf6yyolhwseeu01dhwnrgqnw4g1lvabcw9tp2lbu2jtado1nmu9e1e8wfn3jbpuyj9wtqrk0rfvhj14dcd93ljuv7hyesvahofcfj9t5ze85msd9ojxvida63x7hvz251kfi4',
                channelName: 'b10jy4bzx13o3hx0lnrpjxekmj2271y83gv2f0mc4bfilubw2rfnxa0aumy3s7jbsodgln658calwfw8k7ibfj1fv2ic1jxts194jan6omnvd6g0pbn8wwyiwp2zjowcwicgrat6ho4uu9rvavujayktjibr6fsr',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'kviihufihjjf4avuaxuo4u45la1d0714zapq4wgb96f4k7lbh3beklmrb525n74rpdlynzxph8ssvc6dulet8nj75aqz376jwx88wpzskejcxlgfljtrgcyrm1pi3247tife67pkpbmk175y976edxt7eo1v7vpq',
                flowComponent: 'c935n3mtsrzmz1lutnm5fdkxbb4gyd1u99xaw7ieozmjk1vuz4e9p9odmnmw9x3humslhpsjlkzq5in9aoshqfu6b9pz8mkmnespg37fj3k50b7njc8c6axwcrmsvvd0mhoe9ktabcdan5t949i5th20vykm9tkt',
                flowInterfaceName: 'smhfbedok53wkfdn9hzxpbwk5xqeyqzb4jl7zamj0ybn4hix7idmd1q785hntl3wumnvcl6ujhu0qq4lrkhsu4p562ltxszwt8halt2ixd3balpwbvp5zvv5g8701g7zh9qowcm2k9q41h116m9d4b0h94qgbg08',
                flowInterfaceNamespace: null,
                version: 'p3qhnc1foc134upxsp4j',
                parameterGroup: 'qpyf46dvnx0t1hxpbahi12221prtuf5bixfpgld35gubtvw6705u1hd92zotsdwo3v5o3avp479n28kxmz6eqc4e9k8zbukfg5j3txhvsdbsmjqbv2g9rb1k5jjv8ubya79ipugngow1sae767tagut9x6ca48wm1ab86n7vc7sjigg32nyprmg0jcxzkvw6dhyzx54b291ade8xm53z8mxdm1ggf53hfrel7yrniflarojr2vvcthxbappqzx8',
                name: '57esawd71cl5jm6631029x8ustnhgwadjqsehon24cz36azu8kodpj35m5n8zsgxea03mdrh3no6e7ra6wom3u6gixa04qdco3z7xfy6ln70jvd9jj95pzkckc8nv4gr1e3a4dtgdzyw6u50vpx0d76vwo0s795eoz9yb3k1a70t90vcgowsa9i0ekqua6hsthxeo9achr3nt6302stmcjkdg7rxwef6vi3hqd9dt2f29vf1brq4kd7ai8jvi25maufhiye0oo9xcdu1vuludfnuk5sbvccx59jo5suvs0r6xf80b4osteuollx1ygls',
                parameterName: 'g0ini4zj8oz0m9a4164jmauuatv6n3nxq6cnwkt2of5ivtj18bop0cqzax66synzxqz4g82ootqc3j51qm8y4td36057n6vnnlww22oq530ai6hkazxh7yg77w08tl3164lz3ypnbdpitl4do03mpicl7ejfi926tolx1wnodc03nbxme27pofp8vt3b4q3to151lfr72h4to2uqkmb95yunioxyczkv0kxc80p3k60dxpbvsf1n2bkkjy8f1d2npiankzotzbwri1kpuq6jbbouuxcu9s6p1knq23d5b0ee3755z84wni33ml39hmza',
                parameterValue: '1lggkqyqc7u4utiv848fr9az932zaonvks9ogkni61fov59y9jxjtfr7txfwal48ndhgir88c39vez0ljk6ax7jd8a0lru1hyu0oe0gtfvh5ihbookaayfb3dhu3k4haxhicv8pca5c9bt16iomd5z9uvcidejtht6x241lvak36ogrjdr0627qklxkj0gfp8lq70tfp17lsrtyd31xndijl2q54h2ortyshpzdb63atgd0f99a196i383uu0ljzhuwm2odfh5hmp07yvv3gvpyqqwtdgyheid7iot6odo5fiwhkatewjte85tgoeocsx0rl6qn3gotulljap78rhptuaps0efkhv8b11583w1o32y65tv35kf6x2yy5mpm076680szg7m7ygo9ubcgds2dt3att6zfam4pg5jhnlckr801zkrk0oitsuckjbyefr6ko06fr1z4nok5oq0dhah6nzrd1rbch0prnas2bzplerz15dawbhgo9ej0g6zirynmpi04vf660shh96v6402mctcnor9q90287yzgkfkeg6pf1tdcstgusqlkakh9qjuyjtnebr6mj06zo3vyrxklvc0j3v4pyd9iubdmlmyzn0h2tuohnqyv4olii9b4r7ap9hnjz1m8k5nbohb0zwsr99uvhjxiiy0di3mo9ye89qffm6s6rjrzgh88jttm7q26i38hptfo8fsdenwvsm6lw2vf9xupf7d89aosimyqz5tjj9t2gqv33ezvy2n4qjoegptlkdhw7bugmzr0u9ithbo56o5yua408ipz5jladi5ww8ei00p8pxc89fujilavk2pgw7ryk0hg6lqqg65rnnn2nzzjyvq4n9tjdf60smxw1ektlos5yn8qef534w51m0u0nhrzdwrwjgj4iey8i8pvcjtpv9dlwj98b1p6s8hg6mmmdyzqujg99acurpvuzq2k8wwlg626wbqry9jor5e54dblu7g3bi1bumljr6yrkygr4u2hqtyunx6e3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'mcvv77qxu5cgrgudmce21poy7831foknkgjicd3nskuh779gqi',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'mn7fo3pkexrckbz2n83o',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'wk6nuwj8a9sbvha2t7w76acmopkgg5pnvw9axnhdjyxaj3yzda5r6asv3xw2c9162v8yuzfyb34vd0n2p0khp7uska1het1umlmvysjdb9505ew40tmlgnpbi467o4izoo768rcrknr9xya0bpq4y3b00d0o0qai',
                channelComponent: 'ozcvkikk1331o9vqenndi0mjvzg9uc44tikxydiffvft9cmc3tfhh0w5quvlcq9smwcbk5uciuidubs1q3wamrdikpkfmwcufonfepcaol013kt5ztocxdbneby8n3s6jswx5aps6txrnsy2bcn46yaklo5ti75w',
                channelName: '1th71kpiywbv46e8sbem59h16rs3yrux032bvsqdb2ky5wao88lqczfkbe7y79mtrx6b7rmuoar44yjxaew09u7pryoeq91o4mmh67j5wha2ogqrpc70rcz11i326wwahxvlzlkrkp2j58k4rty3qkfr9qjw1ybr',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '8zs9ox6wbhbdwyp2xv0751cupdayj2a3hb593xfx8q8qi4b7tq73qkq6ptg512wdcq6hfk0q4evz88ntwkwws5msi95zozqjth6fc242cz8c03j85e0c62ixyfijyax1eg5alrp1e7pq2t604a28qp5kxvjz5c02',
                flowComponent: 'j3kd10r7t54eb5f1hxw8114tmu6k822f8uj1gyajeimtgtnpvp1nq7bqt36qsueh0ywtppu5jqvep6zrqsadyz7jaijppj2ei95b2xqfis40poxt04fosky56s161pe774oo1zfqa4wj9ci2q6155v7pfuhefdnc',
                flowInterfaceName: '81yzs6pca3r063zwbzlspj7foso8vk4trfnl1ogjmh8iph6y0z7ys08jzddwavrw0rbeo6k3oswdd5cg1g2h8jz0kmc5c7ye3un689pp7xohgxld5zipncjj1y6c54gqlrdahb0c4a7n43a6qk1g12tcz4285p5e',
                
                version: 'k58g0psskoj5ipmtpo8e',
                parameterGroup: '4jba171gb0nnd667ygawkn9a4r28lkaup4deeqv51gymnpqwebv5z9p8eldartopfzmei3awhe1pn7upua62wr7bg69nvvy6s9zfg6tp3g02kn5bopikvukokiymrt06b8jv5qpxwhnasy25redlhpabpjys0dqhr9uaucqudhrnc89laqvy5rd5yht0jsv7ah891uwtn2da4f6hdm9tuze4kggolk0prtuuxi5l5lcd366likzex8so7ahqlxt',
                name: '8ftvt0pvy74gozc66gzltx8j5khueiejeffh2iwifx90zcfv05fuwa947xumjxv50pzw0qn4kkl5sbo6n9sfkkb43add6475p6wx2zz60orlomv7nkmdam99jw8t0vw6gfttyxlnfqlpc3aepmegxsbg70kf7bx8w6m14l31l9yvic444tcr20h24h8yi6ll84bn52msxnn2upduw8p4db9f6ifzjzcjkbvjlwm1govu0e4emwytg8yqzdn7h6dbt1wemp1wc1wqvdnn6xlullmf366e2an3dste0og86tp04eexa9jm7qfalwkroa84',
                parameterName: '3zbbkq7r6kaqpbrv54eln8oi49t54em44w2rcazzw9jr4u9ojgxwkvce8x0dv1n048ucfojv8hmyylh8pujqbiwrsf9fvxqi5iwuaupr89d9o3mb6g4gbp8idvtax5iqrhw4y6iykg1lwxbjx0gg997964phb9nbzrggb8lcsi9n9odek3kefk0jby22sj92kzilrjdx53vl3jl3odhuphsb05p53dmmgwx7lczuhbw2m6nujwftezv5hlrgxlsdrni0c6p2ciz5wsamtw4ado17e76yzb3amaspyf3qsd429k105sod7nd5b926md2i',
                parameterValue: 'io09i8mr1wyns2jbygi11azbfojqqnplfnr8ueh1naasarho5n1xice2vy52hj4jh7kpyrs83unajvlp79706t2zt8y93aik6shjk44ih721jjcd06b6e6bl5hfkk6b9e4wbovvtx11kaxlpvns0uq8k4lz38i040ujds6ou2v77nmuj2vx5mqf9qn4fmpypfrcmssoijtcq82qmpkrjljhioqi4b0fzcof1vks7dlcns4a1claamh7s5aq9gico3il8ww28nxbels9tyxmj4tvxfdrf6inc1f0ipkvsy53c3xdf0b3wncpt3i4kgl6r0dofa15wkgak8c8ib5uao5ggqddw3qmgsfevmu51ww6yavrwauww7z3mrguadtyfgpuwfmoof9paq3c8vxu0htjpdkq14er82gcl9720vv6uk2mt2vxsoaxouxrqyy3n904vv861ppscubhjfdkef1xdrb1dnk569wwycxotyziyxecnfzqjnc9c7dwgdow9dqznljbhaekh55pfx07csldji9sh76gzbeto9z6kex9smay9g4l1ucgalj9t4rbtt5dh5xh7ym8zf9l3fmx1bqiap4mtavgkxdfyhjji34zu2ezxadilzg9zacp9befj7lbx2ep9231icrqbvbhnzg3urjnqxdt6m04hy4enikhf2778i6ogto1k5voewmc5estlv0l70fwpydrm9oblh7av1mncndir4t1ob6524v1xprx4s71t8kq9mvc53hjgizjvp8dnovhf832epe8pvokfrzmgk9xurmix3gl6gldxssz97ucmg0h9ci1ddat8comj72w5tevuuo3577ndd03eyzjn4h4v7p17dsz6lysmwsg5iso0fwti01v4x8wf6anw2ivdeaokmxf3t150w3ivv8mpufufxja1anzkeb2x4ldr8mffcq5h36yydrvq0g7e8yxc75c6p7sdey5stn5vwar4iu2d9ranp1wwq5g0ll2f01nd3wtieq16wy66',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'kzaf9vt8gw1dp8r7dc64jgys0x7e3zpxk0ebqxsbzfgg8g78ic',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '66ikv57lzx8xofsogvxy',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'rr2qg4s70xh3cguz3kgoeac027j0uhjdln8l50wkw11kf8310ocnt95hpqv7e776zwmos0vb29ltxpai4ya8x27urldfa4eameywmbp1ml4byio7wtwp99eq16q1bpglvl3rpjtre45epz56bxhkksyxaioy9jk2',
                channelComponent: 'ydcts7owwsconwiyyjwodgmotf3270cutgvcfb8kqvds7w3z0liuauzmq8gd1lrc7d3nan5odunbw7ci4n19q63wryxmv7tdg1ylyfessgfqjcrfr3my0yv6ld82zswbqp0hk1cz1gggsjl1l0cfofbv3zb3nvez',
                channelName: 'w10pumyrhzb8qd1uvlwm70t30dcsrojno74zwizhnjb7az7njqnu47d5rpm2q8xqebivfelvim1jmt3tx9gc35w42v8z6zyou3d5ujj8s71iy1y1lwvkm3eyuy16abksmma5ixsgojelwogc4qam7piu4pz0uzmj',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '2oo0bp62wvnw9nggmnradehps4wab6f7veyw1jym9ubvlom1hkmm15vsou6p24cnqci5w2u06inwtpx3hk4xs45dfgymg6y8pakj1zmqg0ansfv3avd9tvo6dc6c4d5lzeq3xiitzhixjxsmptju647jnit4ynia',
                flowComponent: 'fqsrp6wwqrywyyfjw6bx4qbvhkop7o3rllhg8h7xg6heht9u2liwc3237qiqix57jmp7htamms66k33w5bqdh8fxd90kefzr5b674julxeq1y7vnquh5or3klhc8dimv3xg4pfjoecmj76d9zsbgsye24weqmo8x',
                flowInterfaceName: '1sakwp7vuch89i36ev0kikdtz9dqwt0cerxlr7s3898uecd7c65qd7hvla17pd0ntbg54o418l88agwmp4qn81c1t20htpk9il0dlvvw8wahoki8ennnplzat9bg0rezr3siiv3ri53a6dcpgq94ol91x047b1fb',
                flowInterfaceNamespace: 'aod7ceqte82ynuah0yx8z0mumprmqsy0yn5vr8fmb2nfhte8l0jpu4iiwmonw92buiaccvj4wivhdcwvc7edcprg3m29109u33ahif1kdq69nkxbpr36dfnszmyyqs5fcwi99xbfdp5jg1hfq8bhjioshl8eg78c',
                version: null,
                parameterGroup: 't6os678h2g3vjepgzqt85dw69lvzkpgqeprc2azl4fpu97mimrd1lc5ptviionx3620lmxv12em134o3t0bdmrxva1s2lwdrriw6n7a9e6wgo5h0jycy9ktmzam987cdfyvjat6izn0nlb7qi5nobwgbvgv3ezu10xec4uzlfvtz0dj9njem1d6kuoqudsnkbwthmbxybw7dy5mxz5ls2agx6nedhaghk3q9ooulrnq24jg4i5wxbihmyputu2p',
                name: 'b509awgvctjysm6rdfq9dnhbiuk3z4mxsivk69vodqy6fv9kl3mnbi1gsy0zpjn3mcuar8w1001yi88k3s64jzq4fb6jj8ms37z76tu7l3884s2etmybfnzackmeldaocereoy6mriygyyn5g678lm70zv6fnk4h317n06i86jl11s8u93xqwtu9j334gf5u4zvtcx7vl8a3ls21z2g0xm3gd3bnaxljf0gbkdjupea2jttfvjsndbk1nt3xm4ospk4rwe4qcps7vpbfdxlxsykn6bxp6fd75gc08iordv0hvdl87yqopaf2qopdmpug',
                parameterName: 'amsneb5jt10780ppde70h7reatmw6odp2h4kpk2aid8l9kb0wr23rtv4nl0qje3sx2gmsyg1hen3jrimvjny07b4kjvas1vwui42fl3bibaqp20wy3i3r31u5zlhrb88h26mtonjrzwbepxrcr20rom7e8eyey6bbfz5gylba4ihef0e7k7a42wpqv85sjgx7yhivr9o1knbyhrmgbi8s3qrhashdwt3kwmsbxdk0jtdo1x04fx2i11evfbrws8sq3shx5p36jejvq4fva9pm8h9y3jm7in8i6p8amvht5qxu1suff4f7k8hd7joic3c',
                parameterValue: '2fnp7wfrroxcjx7z5n7lserl7ysw9fs4s5ghlzd0vvmq6xdni3zsrbtmmrnwf40pqr8tpcv6brh3dk6teghf6c4603zvreskoaj5h9pxvamb6du1xlvc7spaqsrsdpir917hge5gxt2yelg5phs8bnv3djgpydpdlkjjfbcwp8wwdz8wfoh8bfo5y7u1lvo43fu9jeq185xkppzlgnba3urtdskfgkykviowiohjouu7ld6hm00my2cboirad3y8x264lec559ui0emlw727sr2ue266qij0bjk6104lpw3pp1h5mseyx28zf7j9bircvw86m4k2fpq8rz3uy7rf382dk8fg36vnkic5t1d0iva0h6r7ke2boghei74x25nuvae9d8v2tx01x87yzbt11g1xb6iz8bmon1005gwmhomd791qrj0xgo58io81m1n3042svfi85cfv18jxzb24ks52vjig9ejjtgdu57sbd2lh8x0msflxwye8yl9rrg0u0c707eloupe3ktnvf5ru6rhkfusd5njjrdv81j8x7r7iuwmv8y6heyp98jtwi6zasdnlf3qtuuwfpd8r1cyaa09i3aqap95sgmgk0ggslvmpomnd2z0ztxbr4vap5u4nukw9egx10js7xtg07s7hpgzxlrp5gedonubqdb18d8pdo6e0cyteywvgvuxssv5uv0o9oi8d76tw6ne7oja2p3ygmlm64k0o6994yts2mc1t9uvxqrn1h18vcmyh4jtw0h3vngexu38yd47vs2ajcbfxqh6d9oum6mbvqyj84mg1zaiy6378bq8v1m28luoyyy5mz3s27zqbw3lzraluf4nyjd3mvgy7e11dmi6c2fkfx5f8yqpbani7giuocp10b0vym4un87uupltpsulh17134lryyjhnxwczrho36gkstcngkdm5f1ke3ilmjnyl0185hzvaxgjv6eno6uut1fugvdjuojk50gbbp475x9vq29vfq3uogjeth8tdi18r',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'uqezvwx9s27ctypke392hox20n9y6u2qjvgaaceah0zauazq8p',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'hkc55ryk6exkbpj6txy4',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: '3n37jiskbmqccv30ahdty0iedj9tqof5pgo3yyj4bb1slja6l4akw15jpe1qavm5q53yc83tycvvm5fqd5okhpjwmtret4wyucaqj027v58grps6gx44306r8d9g1zjknw6gz1vo2e9hhz7f0tq9zpuvtgk0gakr',
                channelComponent: 'ebms7pnmimmrhinjxclnk8zluj0btrwdgiotj5vbonbg0y301r195o9whl8yydhw3l7t8vyreway5icfuderzi8plnhn4uhrxokmx79g363mg6ruw7k5b6w6jfu0di1cf2qto5o4ovzd2q5fdjhcrv9km0rikmp0',
                channelName: 'j427emm97tohxowi0pr6bs0dnqwo7th859e9s7ojwtr96o70vet5ns7abm25gqc6a81ju64nit8rsuq5dxyosnqhk58jr7icv2z3ddp94d08hbiaiysiqd6jfu1bjs8zfth05rbv1v7sbq5b0xkm120msx4fym5u',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '1y2ph1jq45vkbumrcfr7c9lyvt88or1l1mhz90mey8jprrils58z9tbredn7jtaoy9w2qn7awjoond4w962qe0q637d15okysfg6iv7sx30ae5ga6pdxeqpnteoxtdfqphk9lxyjnyk355h326hzgarhjucd9aol',
                flowComponent: '0p81wjt5tuwmbqffumiu0uwfqkrilyh83aiad38d2em4r3gi32je2q8m3p0swpgq1conw2m8f99ulj1m9kyuqhzk42peuf2l8v8dcj8svwx3autyachzpp69130lyr31cqxqe97ng6204rovp7jhg83f8lwoabu4',
                flowInterfaceName: 'qi6jlcwhar9lzkrxhz093puqe5srl2dzauqpe7vl9akc3m5ehl52pi2udgszg9psme3buft8mpl8q5owp49vkqyn9ilr4c8aaxb8nj8444kjgwxii2mw5bo6gjqdzshr5xahs1x6k0e84w9cijlpbmw6btufattq',
                flowInterfaceNamespace: 'uocx9dznjmby6m1y73be5bz0t8mmpov0hqlcjaj1hkxxkah730ei068ppf7qf7my0jd4e7r1ztv25m1m67fsomfncc2bbxo4yjp6l2rip2bqjx6vlu01947redqe3kbb3rh0fdjumzxdurucqmqarfhosfaw4r22',
                
                parameterGroup: 'el85h5gagq124mi1wzuv2vq39ujiye0sb8rt9wxhx0rzk8cwlk7pd3ffbmtol6eqz4t7au64squogy7h7fs4cz4kzuh27dq2x4qqkh0dow75bwqdofunzd65zb4k4vchv87c0wkf0z2aju3ger1ajstnsxhsnvxpwu9ki8rksk5kjp5pglkr4xvmke1rcnwfol9pke2xpq7ndgygqdt2zq0z23h258ub9bz6st1mew1x52wuniuwuptzuf4uamc',
                name: '0ll3jryiwv6iqflfus0octlpdkbmq03nd793nseej21iegjoc08fi2l85ztqygjfpzsrr8ums9175r4ce1lmld6adwy42hhozy7gs71tjyif9o6f13t6lm69t8ze3tijp1x56rogzjmihoriyg513uaj5khs8ahtpldlqorfkcoj2oc1uygmbucfji77xqluzdq0pbgzarllg38q0ccvl0tph2t465tjcxbkirc54jzc1get6vmsrqlfwmvnjrbp6ibddm7ndf23fh5g4p1860l6a5kuphbej4g5ubunuuu00k1u8q7e47mba0o9ymf6',
                parameterName: 'u92wwxdsbscet8zpe2xgho5gvirhur7iabtiut76aa4vkz5juc1cm6bysnsbyvbd7cgsvbrlrx1k0bf6bcdoot3bsywxlfwbqy98ew4vhy41c6m4puevreosexe7cqizb6tj2koq2oecit0ztp3ptg13yh45kcmg1xoe64fzz0xisbw2h05r4p898c2f0s3l36228dujwi15zqse17v8t9pu7j01ykzqcpfy3cljuahgtqhu9n1lo7mwmem2c7k7d80tq3zkm8p6aokus41r9bfr97s2j6h06scbkhjcrqt593lduivdehft96iore9i',
                parameterValue: 'kn8ts3o8b8yuisjq6rk6rn0bvk8mld54qgk10ym78v2oohe6wwcdn3hefya1cl4j1tdzcp7imtglbtanehzyiic1y6ayx86obksxiy3k5y8ihl234so421dwk9qqrmju4ty85g2mc0xqly2w2qdn03wwuvtuikeqak5faes14j1mg6kzfl550a4qcxu7yl01ivzpde2wnk926ozxvsdmn5i8qmf0fazm128zmytsbbhyg0jqn3nmi8li1hs4c18sijq6ripvx6cc36hp29bmn5gmegksc4g5rhepjt08mxmxudtbiw1uaio6zbfpsxc7u54wtlfpcng11tlo0o4dp3ljz5ogtaeu8iq3ltwad3ll7x8t4piryqfuvnv628t8xtpzxa9jx1o59pwishso74q0zrtweabvc92ojvd491fjh15ydpo0ubh27e6f462wiczw7021t1534yvmsjowflepcmvslnbv6fugw85spefctvpgycxgl16wpkngvn5k18io8nqzteawwda7xia8xr4luvheg7k0zjw29nc7er7w2f57cd47i6c4cdxu7x2542ip92x36n2z9nipsrybyei1vy9uej2ntwah9mep6vhtasn8yxv5wqwcor0q5pqd22vq5rltb48214ea1g3useb70yu7x0u639xfoil0sjqcnshoo1ctf1aj4wygi2dlotipozp3n1kwz0rqvk9z1q6ewuxg4wksxrnp6ew439wiueefay30qrj51j2k69i3qv6wyu8i9111cluvh5wktx85nu68nblu73fdrvgx4sr5tktn6sfej40wf63xsehb37idqnl7emx30qfh9k01hznxx9q4h9menehpv9avtc5peq1uhdo1p0c32rfytz8dxwz2m8bi1lx90n92oohcsmkf8uf0rnn7aioec40b23ysx5ddy8n2mwm1yyf3htk008p15ryw0rm3nyx18l3xxdi3r9jpv00kptgacauelndzyvm3sd8vt80adus3351g',
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
                id: 'htqygsuini1vwff7axh75knwl3bs5iyfrh0xc',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'k3fb4rl7wpgu8erggq9paqdp0cwagoz1e9fz8l7zzwwbfqc8zp',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '2lfr5h9lwd694rc04kme',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'a0y3225ue99s6x753n4usmkm574zh8zdur2tzkj7pmucge49vgsh3ieg3iv8ujxzeb3lk11d1su4j5s1mkb46ve2z9r6g3f3pm9hvfffl942h5bnosj4b9o3jdwk0a8gxgoux17cr10dy0yjzhdo6etfxi55azsw',
                channelComponent: 'qqh19zfz54040l81tjctilbvzg9mfzuvkq9hel9rlscijhtc9ox08w5x00a0baddaerxh52x05fnrsds84emvtjrfccn937oqrgsmato8kl9zsbn5nqdk781zicmoswd7cyp4uvwhgnbgm0xml6i2bjwgx9i4258',
                channelName: 's8ifynsrcqpdx5a139137yhrdz7j11kxx5wxzx8y1r90qlora1kbnoxg5x9b34qax83qafousy4dntqcsztas982swb8rkg5mzuopgeddniq5gb0j0jzooj8j8l4k5e84q8r4q7faktmh93xkr9hneiq6naidd4v',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'lfd8ekq7qvt84xrkfv9ma7e89kkkpkwxe99jeodb3bk4i6fy9uq7wvj6p7nczdf3tpft660xsgtbzk0lqjac08ciucwucmcwbajbil3rx51wa7ebxxmobh22dsj4loawc5xek5yua5aspaj1yqd3zymhmyboviee',
                flowComponent: 'ah3dave821i7i22dchpz3fbzpt511srnmfpl5prwjovk4vqgzq6yxavtoq6m0vcd6013m6isc29dwmgljfj9g1zwvcqxrplziztk4owub49s97mmabdyz78sjflh8vf3fcdom9a8rlkc63jb5w6kd5vowv0tk92t',
                flowInterfaceName: '10pu2xp3fee1q57uqw2jyzyogvmh40mur5jg2e4bflhv57b750d9q2dug65yalmbxglshmqy27orl7j84ib078sjqm0zt4ufuysf716nx8fs3y8828yformklbwtzd26nlbxoaja70engwbvi1xgyvw70269vrt1',
                flowInterfaceNamespace: 'il2zxwu11mq7hdqsa9ytw0kb7wyox0u65nxkbs5lowkyiosa7ropmeue40rjbuthlg1x8xikroo938ypm1dps5hq4smqfg222hhcr4b0qwkfu3u99k65gnrheqta6dp738a84lrkogo920u1v9w8dhdnyhpu8tve',
                version: 'gve1rtyq340hmjujp2ff',
                parameterGroup: 's7bx0qb66r3dkvyvlhu1we4a23k7oasl7x5rw1vwf6c21kxghszg8p1jlaecgom3yqe2ycli6u2avnq8xijhqwgoe41nza2733dgbnmw1cnaf8l8yfxlz6m3shcureeuye4bykipx1uoo4xal39n0y60eybxwb1x15iw4g6o8h4xr3sf5frtcwwvk4w73dc6y11dd04exynvz0x96wmim2rhg9cywswkghwiezc4ag2vcs3w1364ze06b68ie0m',
                name: 'sye4jv0fg9n92vmm0s69q1ipoabxwbqwt04vksjsng1c8ay5lb10k14rzlw2851zaydgij1mxle99n3um8lvz9e0ipjgwx5vho0r2oihdhnnzuilrncgh4ukiskpy9s6kzuuvkcsx6ltlv95pwahyajlmp1jm6doywvbek0s8kynocn5xpbwxudiaqfby5gd1q4b5qzy84xbwlthjvgbrk6br2ppq1lclrc53964bu44uuba8o861lefqmdr1ykccpfxhjx2aff4o8euwt6ri4g59zv84344m59gt8zstlqo88wmdsgcjv5ykm0s0luh',
                parameterName: 'esull68asvzldf1a5k1ui6c1hgo5k4su6320dhu1zxzyennvs8jy58wczkqvimtci6v6m8skhbo2dwahw2y0nq3hq59gpiadjocvmmxtrpq14xyyf996sigfyqn8s30ic1xq4v2yurxotndo4n1dmwmcqilr347b8mabcysyk1u41efteu15s7srlwu5528swxrj6blqs9jahhx17hgu11a43gyxndbgrvfe8r5gxg0g30zjjazxd6rp4z2n2wz2i7pc3u2s6lu60bj5vqlo0cms394xmcgni7i2nfh82k5d94eemovkpfc4o70xf77l',
                parameterValue: '8gfs1drl1ah2nqf2hsy4xs7xu3a7tdpr38xr7kzz0s6549uquym39vu047u8el0fmusnsq3uys0qnenky1mjmhkgi4pcw79cixa1x64vevt3by58yho5lonasw428z85rowkaj4idsvbf6hgmv0j9j4ajtz7kkzlu3pp45xid8l2bb2qmegyxnh8c3ekief9hhsl8gkdiit4dvbya07ox9vmz3862msz3p58yvhr0il9ro0sg5dgl9kqemm9otg4qj9lk6hcitvbwel9ua3mq81tzgs7ao8ei3h5irigwb8eq0g0m9r5mu99we0szjdu1vm2cic0zb9fgqffhjz7d47lv4xsckr98jbf70d0btkmosbc2q1tid0ooqem4i2rsj79mtelc64j0fjcqgc2hs5h5fb938za79kta26g3fxn4zbwx3tc9xb4gi5wbaibnqsc2jvqfwbza3c6b9z2zljsg90vah7rywo2oduyq86mp20vy3kf6kf4hgzqyhvush0w4c0v142nlcy0zdtiaw8hod2flwj8fqqbdo565x8jghz1qz5gkgd0hifyd49v6nox8qhvjys6jrk8u835p11971aj8d9lu7apgb2ewwrwbl8fkdomtniy3tlcsqbgf2vprzuo8wtudl1arttjv1j5fl5narolkq1ew3mkin4w2sh0a3paaani6k8t8jp9o6xwp3veea5716l3bzjhu43ip7kq1754gabh34ynz9tqmxviej1bfxfeudukahr9i7wmokz7fgqew9fkgsm43fii4e2go8rco39plel4p6xsvzykkmc3mf1mujymoca3a3j5gml4zoqtjddn8do13qavsyqje5hcee61rkj30hmxkrge4czgpbpx8ny5sp0ha7rt8dnppc029tbn2sd9d3f80zqmjhakno32qqk80c7t02f1phvi2k9kkqv6tk0ugyr5ac4misia8jg6kb5a0bm6de99zo5ls49yrwzc4lpbil7afmlb76szatrctu50',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: 'oq04wsrs9p7991aqta9hzdkiaqkbs8y2c2vy4',
                tenantCode: 'o21hxwdb4ow1moioyoclkqz9nzykj8092ypdxavjw59bs2yebl',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '38vtr2uxc6q7fgc0wc4w',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'tm1htrilochm88mmbx7jn9vvjyytp9ulafwupeaj7qvzc6crib4nvnefpieyk29c0auz5n0hf7t91053qs54r9g96nysf4gpx8qmzpuc0ini3fyixjs0gclwz03sy18taogir8llrl6b8ttlrgms09or93i33u9i',
                channelComponent: 'xpxgqt8rf66cvkoe8okbpkzt2sfh1fv92z2ruljo6z05j8f47m546rd8hgubbhge8b0lhrfb85k6nz3ppkq5532xdxvdg6vqwmnremkr22g54q1uq2gtf7m287hemsdsn6a6qgay58pipuqjqduzooj7uklkhpx4',
                channelName: '2del4l31sf38weiq6c229wui9i68jch8giwpjhys9gqqzicxpxegb37k0miqtkd98660jgq3wgjwfyo57ipwjbjocpn5s8vdawmnfgo8i8pg0g1lkhgow18jd403qad9fl27eyz42hgqvy4lbgmwa3eklh7g0jz2',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'u2ulbr8rzx0bf1qy75797azsc1gjnrsxmohkd4c6a3bfeh465z30qa5w0oh1r3hc9py17l38j5ny927w3aifxtef7ilks2ofeabzuehfj2rbp1a8pvu6rq2egmy7tb5ib62cm3xbmg1ca9m3dhwy1x8dgbd8ogvk',
                flowComponent: 'ghp6z9nmyrh5ct8gbv7qyu084p9yetazazfps8egxgptsarbm6b7eam5tuqtu7x9gea7ngi8l9fa6mqtj8b1ser9tf9rtrfh8y8etvusvwijyxcj513tatd669wf5o4j67ps2ly3az0uck2ujd34bbylsse3pefe',
                flowInterfaceName: '2z7cs2js0z8kj2tzx77ga8o4eijm82lxg29whfwoobq9s99myzcm541qtpwg7laqbqpoeevkorj27rvaetx3e0psdx0ishu62d0tukj8rio3ouwtk7jhqvwb6d3pqu5mp6ciwl2rfw0ycan772fj0yia5qwt287f',
                flowInterfaceNamespace: 'qo6o6gdcjyehlcyip9najpsboce0l5fc95kw50n47y83ou4d6ro17u6e2rz8u79w3098d45wdsmffnedjv80ejaalt294jt77vud8ffohn73zh701i8zet6mfbqsqclj26pnz7or9y8qimis9bck6ujqd59x9heo',
                version: 'v970g3xfzq5cdht98q0p',
                parameterGroup: 'go5rn4vpwfw1lzyvgzdntztfu6nq7n921uwa4jbjecospa8vdcapf855oxk5s4n5daneh4n0c6du1oj1ndgpgebr5a6nfbjkc0h4m1xjbwzm5zc9gwvzi73uyvd1d6lq1r4ernuewlc49ec4g0w7qylmk4053b8q1kz3i2prnl8jh9e2a2fypl9h2853g4pvlct5dmxinp9fkmjgk92wc6db0fvo0pzc2yn89x6316euifu7pxgty3xlgdvnrjk',
                name: 'z9cpihjo3f007577sbsxx0viv9kjhpypkzb52imrbzrztlp44lht5ib8bqtkbbxt41od3pbxf5pnhkvnc71odfcycocelvn32ukq2dfane4hm8rbtva1vhxhszzo5pvkd180imasi9l2piqscr2meqtzl9jg9wok8p8azjaz02axx7788c416t6hv856yvg12pmfrp6xha0xqy8wrj6vxs7vip9g1p7f52v1oczym6gyuxdv5deig5h4jdu4xgx1kw057ukruz9y24s5kisrc9o0fffkn8fjzovgtruqh0zv38aw00g7cymfc3ctwzfv',
                parameterName: 'niac97v4mgwbejf1j6la2u0030fggdcgnnoonxdg77wz8g5nbted8ovku00lg7c8hynjy3mqxk3leyllibhexm1lb5jz0rix26v8fh1ok73k1g601qhin4dr1qxe4wugjlj8sds5he8dumf8nvqjibqbg29b6ff46gfq3js0y6h47oa5j02a542ooqdafv2ot9mju1y4nwajgeijvjp76p7lhy254eudo0hjnl06jgkgfpvcvm1g1bb28ufykummy2gyt4ny3vd6u49xbhqf4d9d6uzrr1f7lfh5rhtchngxpyf72gz7avo5b97dpio5',
                parameterValue: 'z7zlgx7dh292vuy2gd5wvxyvkito14xy70ip2tdcioavxpl49pny5hdehkos1ke8al0hkxtu67vg9ictdh2pgucb5nt50sj8a0jqvxxdgbgu8s109ucwjqeu8z89gsvgv640glj88qn8bwp4mtuz8y7boyjup70lt6cinuhumyz3ay2ta2qta06k4oqmtm2r57vab822n2ad65tfe1ry1lhaheazroii9cq33j9k8md354rxq8k1wij3b648g0f1kfsm9334q16plf5bk3pzbkhkb9p6h05eyuq5sy3dxshx4hs0xryiw9iag28cb0hh7k41qipcgqgcarqh2u9pz5zqm52h7x5fjilz6tmxteso0vcglgpb9xyne0wedncrahl2vpzgf2riho2i2amz7wueegbrtzer2qvs7o7bj3v9fqq6ziciwpx2ya7huztuz03oabeg5betbtclf2oezjgbhu797hocv0wxkephfi1dat8muplmv8zrrwqsqn4t0k2w0oab95qk1ppf4cqs3hz9m72ox8z23arapy2jyzgnl7z1mwdmwku7ftmfsp3nca1q69zi8tq88gvg6woxkzq660namo63fk8n5dt4zkj0bt3pmdfcwxmfzi7s3ejy060liwbdpy34mog6xf1eu4x1dasr8s27ikyu3f8a3d5smc4ayepqwlcad9qj2pg6csf63h1x6i314nsvaqvghe1p2zecr6fubhvlvs8lptjn6g7r7vgt0v0mrylwb3haep1demimxr65bldt24a64pz383f35y157dnli86rjaa3regt9j78nk4qpzkbl1abqqct7bp5b39c5e1om7tjswxyc4xxtqnibtqgfil4bxqg83l2ytmqd2kk18q6erurueulkzz5s2a72d07si26rk63bov1nj6qpluvydrzit2bbynv3ggfvptkg9s50kmrnj35daex1iqu5ufeisgzf5spssm4d826g10co7dudxbl8kamq72jfp85ouwgjnj2',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'npwn9oljdxd3krxz0wlqs3cujyli49t1z3v6aefj6kip728iez',
                systemId: 'adun8bjnfoqfg0zx5b74kq1okaz2j41jlbokk',
                systemName: 'xtqki6qtidzxdc2tbvd2',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: '5e3hli635vff4uv692ujo0gs0i4wcr4060b1n7kz4lq38aiifdhprsms8k1yc2579fct23d9tdy9cclj565xtqf252znynval9e3y5aps6l6jjcp75o0rgi5cn7p4u4unw44zzpw70v77al4jkxru9yb2v2l0x4v',
                channelComponent: '1l0s45xxi2q6sevsf76t4mh9elbfkmdmlrhdfd8bjh1v0jvl3ll1v1xkzimv5qylqa1ne7sq2oaw3guv63sispr0mgufcmlbpia9mpxxaotewdytxk693rhcw8iz0sg6ldef4sfyuz6e5bxszdbrgx9rfz0033z9',
                channelName: '29nwozregl2p7zrnioqwbhli11ybgagdfrv016o6pjwvmadntk94yzok10w1o253gnpizhlrecm4iom9hjmalgrf760vxlyek6mneerrfunz7kcbkwhludd98gll0e9hun91kq56ee3p003wy89n89kmt9wpzrao',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '512i656fkav82i5pp3l4ljsq5leknj18snh24ierknsfns2r4jspfkblfoismmlqcyeb7qaxf2xm3dhueojs5xlduhjd1l0zvgqiew6nvue8l27ol6qqm0equyrauosmov80wqk4dqehclxlox80ppfqi6l114o2',
                flowComponent: 'kom3cmq5j9nfzugcje0ieww535ecsogzoympi8bp2ko15ukbe24nlx5oihybrrt9om5g2npjpz7yjm49dohlgyn6ynltbkkmrhsk85tiuhv25ambvmgty1wcuo1utvn7zu5zlz1n1lu6f3abudj8nyu57ug7fjm8',
                flowInterfaceName: '3pd4bhkdrdpn1eeeyy4gvt9knrl3vd9skhk9dqccqlb8ln3dd16jxnivjwu7qe8brynn768bwubfsxc1poqm85x781qj3xkoe3z2soft3f2wkov3zaxvzlo73s7dhm1c6xsyhbgtfgrdlth6087iz7u99qamdgfb',
                flowInterfaceNamespace: '1d1wzt8yvgr0nwhmjm725nnfqdv99q824du28ql0cwlap92znacclrai36n6xezebzncll5o23z0cqeii2efzwac87ma2w7olaglrf1863v9c2oc1l2fzsrody1pqhujiw19brd1ucvc6buoqh8lim2dkblkxr5m',
                version: '1j2kksk1haxxez23yzqu',
                parameterGroup: 'mgphdxopt5653o1eb051l1emj4xs12ikmfvynxb43owcrsuinzk3yjauusa3ff8xppc88skip2b3z2llf2bj29cwsw5xth2gymbr9lnucoy91309xj4gbsk0w5wolim4pqo4tv44hfiqye6us6p7qs0dxufdr8t2ygdcoyp0imlud9p5l98nkwj6wg7rq6q93t3oz43700nwlvvmhjr0sagm319of6i147llaq736k4d1182idb6u7lxrtimn4f',
                name: 'rvq02unf17jtnjqgmgfphituszav5lizhyn7n1sinp0ii805u47ptw8uzs19v2qwxy82u06pzsdk5mka8o73u9lmm0n2chv2iud9h9x8t6oweap88dhubmtzwcizwwa0xz3gw7x1i6t6ya46w0d136ymtpozcvcab0oqsb75x6pfgpyf2dqb72tnotzecajr61t8abg0lz39dmtslpudjxjnm08im98uc3gdqc67vy3l8hpb19ziurcle8lrhnpemcl2zxa443fozr7jfobasx26b0awlqgweki9jige3w86qxjw6hzrnpgfu5784p2k',
                parameterName: 'kbpcst3b7d8fr9h3ko7lf8wc0ckzueevbgkg116k7xzktbml7fgdsuhsrfduch96r24gnlrx4sn3b75t8ceyxgpvhm0o2llnsjvypay3c3pj1tjcjlxw37whyz583l6krolbn8gqm1d7gkfmhlr2wlswc2t40xamuyx3oxtkj86cvx7g8tmka70g3mupat4zjeofrkweem9pq9rjiq25zttzx4kpw8caaxawwcj2olc8wfsjsyvvkhg92uub1adzksb5bsercmuzasp2u5jtxykj49b2rthzc7xlfm2kb2xqjqsug4872lpzwdilxedm',
                parameterValue: 'x6dvm0hz09eogv4txwzood882tjqu92jkyofgjpd13z48ga0eerh91ejdl5hfbz284q15zfjowy2dqztkkvtna671ddchjohxrfgpn3csu12qw7eee5ln1vna4xo16xganq8k48lw8fmu6vihqwohsxhd1kt6nkara8wxkhpb9yfkjignfawvahtrffb11yphd02afkxtyrbui30gqmj1ta57i2w8g7oqv4hqeedpefbsse15765yjuo5pexefukkpdw2z3n0u3f40icmmsejhr1wjpastjm296kbimqmx08e3t1s5b9zfve6k43qas6cuohf2ji14sio4jkv4wo7se5jvb9wzy42f027t15qpm34dqcith93olghb0z4vfltpndakqr2ymx37hm65ymskysoxde7ub2lrxrsnj5xbj7fze5yc2dsgmpd9ii9rsawvxkfti8su9scfgs6u5ctk13vwr4snn3sw0k1hu6eivqrt04hnk4ztjonelf16zneucfx0dafyqh4aivppkjn2qr076r31suqlc2oe6x2koufdkv9e0sfyjsnsblt3ajfz3xy1l2m48mdjp3s4z4pc1jeonr06ppabwixbo1k5obd212ikyvt5nm4sjb01bm8sxnjxzi2mcj529mcjohq8qw9i3um7grq5yf0lv1nop8wzi4mz4sifusz1trthp4weu9jt5h2ff55465fgaujk22t8ps67eagh6aet8tv7ywmrz1ho6659d0p1ia83ocyihktjiwpvrsxvfghd83jfd6ewzc8mw9j4vj5yte5ytsqtrgavjl4w012ihy9xfeau493c4aaxjrlw66njna70p9nw21gxedj7t4t0rlbu6vipanopyd8piy8634urkomz1nw60ee01jsn1etm05wvsug0dh4msr58d4fhua4h89jpkjvu7tw1p6gglnpdc36g0nvn99k1fy90t7d8c63h7olmngfb1xk9hvgeqhov0rm6hscxqlb7jej8sqh5i2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'yba0w4o24o1xg8lhikq8r8ewpl2zmpslqx4ecp9q3yfti4f4im',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'gw38u765tpgdz5ozjh9h',
                channelId: 'ufr942kcymkqfyhwx2lts7dex7ub8bemri5bz',
                channelParty: 'lnjhx65661qf7ahabgashl18p5n67izkrg4aacz7vnok1zz9oey1c2yztt9aknewzdrwrjvjzwnmcjcv7y1m8tvch1asmbrrenvk8c8gk4gjqezr7mcpmwnxcw5ln2bnc20z2tbwusn56c78xe40sw3dl0u6l080',
                channelComponent: 'f5xiadi8ezvy95e0ywyqmpmezfsa0xqvkqf5wqlidhi3kata54uichnf2ajy36xrpxsfu0t0u88o06apqv3fef5xk6swy9dgx5e6p6mj9m1880z4crx21ehovu34y98u0c9053bm7mkrhp6mn22mxe13jz11zgst',
                channelName: 'cp4pwhzfuy6viieng3m5152ejf3qebzh2bgzb0rq5opla3dxx83hxodi2nu4y95j8xhktraqxjlce1lrt0and8vv92oz6dfvyvz2pivfvev7feir1ayr49fbafka74da2oh0od1dzimb8qs8eoa88dhfi4u9iifp',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'kqjy46t7oa394v3qzofy8u0hyhpxfn2mrudna4ju97c4yu6n2gbp2gqsgnm30axegjbul88xf1u5yr3hpzcni0k5fy705yt8p5z4jn0gxprl8x4tjjm45qbaw3529tq952ch4gs0gue7zwukbqhcy9rhs9klrbqm',
                flowComponent: 'uigyoa9lvhi0c01mjdw13gagei0awj7e359m2rlp002ps9qhptdabm9f51qalh2lthbf87sjcqgeb2qo0lu106tjrg3a6bru18fm4r7l927s9mhy844br8mvyhzlzy0kd324og573llcs8rojtghul1leynj5n92',
                flowInterfaceName: '5f0rlzorsq0g95m6jpk4yfgxlx0e4huh78oevzy6n4g9a9wbfz80c3i5coxy2o0jdivz8gy3v3nqyphg8v8ea3jcsqu9fn71wqs08gvckan9k6d7quu3jokxhtv9v4xi2rur2yj1c8dx6v06183zv0x8zea9rr33',
                flowInterfaceNamespace: '2oobffeedagp5qgoihbr94jfbfn9arrn3vz27tfwnucabe787kd7bzc883wbxoegc4gqvhrleejnyld88trhtu5yjeu51bzxxz3t7fs4zhb7gcvsy3euxgup66rnal6k5f82hwhbjo7m8ozz6bs9xerwpbvxqgn9',
                version: 'aa589di8hl936nqgiwtq',
                parameterGroup: 'z152x92odebgb5522o4spmcugjve40bh32k3qbgn5h3md5mlen65f68hwl9pif7wwp3zcms8tvyvkq4ed8r37uup9lh20plg30tcelrvciby58orsj1eznxeqlg1itkaownp94f7t8uwyyu0l9gkhjf8vox0kukdmfsu265qrsv2xwtwjoamsj1a9obv5lzbeg7dqn6iyxra4zwobb4y56dbccgetonwuwe84phlf2a2v38hakpbjbslw4hlg8k',
                name: 'ugfkud633zxhk20sqyta6rrmp4rcdoqx90iswubs47wserfiyacoeqhvhy46305og8iutby1wkk1m52hj9tzczg0ptar76ius2v88bj9yl1mz8bzbixvwu3a4zajesyq3n5408cw6f4di7g6hwlaowtbuob7g6omytrdbpwwfu7n15drqe60ovpzogkn6j5x7r2nojsnodddxyur8540t3914dvtez82gx37exd7ubahxpcqspiujqpplyzivbdfv5j37hk5pwrl67l5b9bd90jb1sjbsw01kj2c1nvfkmbahuxgxid9ci8nt2fc1n6h',
                parameterName: 'n0untmxih0p75hlhefuo8ft87mstqag4q8tachznwhqsslp7imzpl309ovwof2ld1y2iokq94xk8tnzzmw47k40ohhaqamc2g0mzqr7r0i88r3vhtydx3bqc3quhtmnhhyyvol7mofz8dsnqfs6ef092tehy4sp0gpva91ykukencbzbbrj7kuxnyuzzur99f2vy1rckqqsbg0bwhadj580w7kdexeu0mlpvis0xh0mfhjhhs9j6zutrnlkglh1lrivt8q06016qpyr4sf8d4ed5nfv78uolhmrxs58j32tycbnbubo5ggzeckg8gma3',
                parameterValue: 'crhy130xav7ux36w3r1bc6b3g3ywfjd3lwczpumnamuc9ywlg1dhqnc43f5ojq7nw8pc8xrorvifdhdf3e4hdyltkev0k6y3dbsskh13hykt7enw6lww5fggdha0d6j2x87sakknzxhkvsgsqmjlh09or59s1oohkgw5dvge6xtzhwgqjsozivsg15mym12zx7td80clizcel64hpek9ln9o0qcgh5di0527hktjpplma28cxz1gm7jbg3t5rmsp2kitepboz7nqavmm2vbzrmzaacbqyinl7w4d4rzog09kgekfew7hb3iby7c53m08eu1gt74x3ioi1lcov717g5rwykxuvpzkp74enswcv3a4o3gcluuhc00d1okpmmq47tdprzpldw10rhbyekh280ct3rwoyj3iqkb5r5855yudrbv2i9odp9tuo0p47b9hfo8ewzzxvt8pvjlslxt8xmxpwdkzzkc0sp4cota6yc0x71lbh8fv88gmpi0qfcdpielq6uuqtc3iu8mwzqzjkjqi8924zhtgqk8e9e9d8rt1ooaw2k5uhbradu1ehcxuvruyn77j7664jofh3qz24bwusd4ic921kazf087weu1ixsu6akeh1g2m6f0824kv2g3tfaw5scfg4dlhyidjhl81f5rda8w3rs0161mp9dvouq1ld5hpmhy04gi3rbpvpytqyk83bbhfup2z9b0m68ww914vk0e5sc0tf1s8wu7iungo3d9xmui3nrhr42w4r6m3apgjrf83kwveanfpwdlg3zypbwsip2g09pc19y8a1fy8g4ou3q0lii28vjkc7tkc1gngvhpfch9ttx6ivj86e9w9pv5q8xpbtt48ypwxjlf3vmbytja8v9dz2jh7b75dycc89u7xttck0o7u5ia3l73cjybe5pbului1enimdzbt6igo54vacgd9t133b6fo7w93l8qxhsxbl4bmiioa3nngrgcqtbfglorl7nalp0msqq5d1ngjp8ztxv15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'ain9tl080vdz90ltwmcy0412maj3i9ai8ilck2me0ldu7fxtbi',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'gifns4lt0m4lc372ujsn',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'o41050b0k7sojjcgltgbu0risryet6qz2la3np6yyjaspydl1l9aub7894nal5g7wz9sc57jeofzi5d5l5dbu8zacm51xi42koffm9jynajpa6wb6ks9q62ber494ko61gflc1xh8yu3niflfhbna33b7blfbh6m',
                channelComponent: 'fpqv1lm6ffpbtz7j13ibersj5g8rsub9smiwfejmx3pypf5t6yhd5rsdgcisfxm6nh1p0q6hw0lnzh3an2rnn7y0k82yqdvqxo2s59ulgxwywxs5nwdft03k4oed5mizxc7j6cxia9057aicjza8kjvwb51q4d8e',
                channelName: 'gecyvpntydbvi2xjdwk5w8iummnot20xqtvptwlam5ogxqfyitc0bikj851n2qh894ub78rcafxy508vhjakjzagsd130dazt48bdaddwkp0vx4udqsoebf72m7t4yoduqpr3lg5zdcsdruig2a7a6yjr161esxo',
                flowId: 's1lxuvf53jnaudsv54txzzfrheqx6rx4kjnlo',
                flowParty: 'kohnjm4d1pr3jdhymnuicwe8qhd4lkgx8oojjj17t1wkanjw6n9lwj55xstaxudme7e53t0il2glg79y5ntisljhx7kx1flnb5yhlqjaahyro40iwucoqbyu3yq11wsn2p7fpig9dzrzf5sp54potep4p17eea4h',
                flowComponent: '9f8fuwd8hgtnw9nzcwcage9auf56ea1i5i56milgfee79kp3dl4po3d3uy5dyatoggv7bh14aoxwugoyc8m6m18q8lujap7soymejh6kqs8p8879vp0u4qhby4hqdwmy5vp3qs31lnc4d3k37vrzs6sltj33f440',
                flowInterfaceName: '1xaxkd2kpd6s0i8jv7wp1pv6zp2jfa376ee6zt4ki664f79oj3rd07a5kica57es8sejsicp2f8fzbod2902c0ctnpjtmqvvkhls1nnw4ioxsbqwadhxkezz0h2hdpa98ptzgqqfjivkn7qnzbjjddx2etv4t8c8',
                flowInterfaceNamespace: 'kt3urpox4y4r3d90zg28njqpzucdlevsvzp164zfogsjdqys0p2o4sllms1w4u9sbdaysfj2f1l0j58j1uaddhh928suehf81anb63jluqq73sw8ajse1zpg4b4r7qf84ibmb4vecw2jw9gsck1egqwac78cbxmb',
                version: 'ccqpnt1efhdru04wo40y',
                parameterGroup: '1ep5ls9upfhp7kbgk66wk0m0fgbv13lra89yhirjraxk74d3v0e5bcaa1jd1zqhiqcnu8f9degascbv6gurtbyn51l9967654nvaeev1ogaddmgiwhj7ycw8fmjv9ufuw4tkaznb3zbwse5anrcyqu0b2npakh1ebl6x0kv5n4o5fcdhem8025jvzm97p40yt9c6b7r8dtttq2vdtfmwn934hdjmyb33n3jdlcyirleu6sbkwk18w2dxoev9g8c',
                name: '3budd6ceydk050u0ssuwe5uoseibx2rooghl9zqpjap3aez83mx5xd8ftfyftwpcqcj8aceto2t867n4awdnjsxdvht5oynq7viwa0e9z0ejnda1jvuvw0z1ebn4m165ykrrlrbobo0baulc6fvomk107w0g20x0ut6xvpu8gtwgxnrroqynwfk0sqq5gjongizou17b33eqe1ydcf25ma6tgpkgs4ye8d3v2gzi9jpbe3ydfkezkxkh88rim4jwrc91bo05mmuihoj0p28txjeukdjttxpqwctvmntihmhg64t0gjkh0ic6dugwry0e',
                parameterName: '2px9aehcxsx8irysars0ys6vcg74ff7prbub5w2tzowjf0f3xfwifxfhnuwx7rqnk7dz252wl5rn2ooym43rwn2hwh7oigbztz35q13o12fubt8dlbnixnkg615wlzuadrpc6vlg3jxdbhv5x0psmclw976ev15qvkz5885a4htwseyl8q9insvjpyyopbfiem14wudzi23ryndluqwaargm4plvl53dr28e9sraklm7rp5rg5s7q4i6nk7rhtz2toazc1mza40wdhyqg5iqr2k46gfa5ki5o9ocv8x1q4m2brze2y855b1i8giixelw',
                parameterValue: '8ajt2o1rgjftml7x29bo4eneh3874oc46lc0cixz9myzzp2zocj5zdoquw3w7hyms68zozy05h09xy0sfqvoiclsva803p7ugntdifjtuoyiikghcyvw2djmonye1j0gd43nm28qoty4q80h4lcurjb8dop6xize8ftbss5q46ijdqb180o7mpitvp4sgg4kss1658teleg9naavmojrdk6sh6xrjsl7f5dhkyuflv3zonja5424ev3qfhf0nga64p4smpp2pwyj5m9o3mdwwj0iqbaqu63pduytn50q9dr8pv148zcm03yai4s753bi1x6eythz678un8scu4vz2p9o75rp14ftde8sm144qtwio2h7gxn33w46rr4cfcjkxwq5d64hrzlgdhnttzqxyvtcvcaqjqri5a1ljjjlkb5r201gtmgze4uriyx1nm6acfgld5m4skz7cocqgwa23mnziw5ox2lda2spyp185d8bla2jblom4660xnahcwcck81bqproofu3183rx0ysqw1lb7lhtojyixtia8y6ch4oqzbt4mwdyg2zi310tjxp214wp99wpjs28tvie8xjb9zpwh93k6q745oufb3bs4s4gdaqa0d4ieo2bmgnkk5rxghjnchqks2haix0rk21wo3uj9agusjamypbkt5820b8mijsroiijhysk5wajw9mb86aemx5dc3exof4cokbanoi55jl5kdd4td610xe2yslc5xbomre1wqrisdm8tcsoa24ridp3rhtz8pg49fz6c8g4gmblo6z2mnzkt314lu499ra7rk5q6xzd2fyq6sak374s4tv43s4alt89acbo9kx1omzft2w7zrmtvncnpdpfo98zzrp35laxe80p20578eikoqu62yju3yzt012mb9jtgnznk0rzltlbmlbsji9ql8blygixgktn7o7up25yvr7dl5wt5fiqqc8ul8ufgjr63013io9blc5xzt8qwmc84v5pj3q92sl2e0pug9h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'w1ls2coyu2guzvxr3fu6p1sd1mq467k5gxq0fngkf8rfgwj77zn',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'p0avvfpky0z6m749aycq',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'v6ili9i8leg9xrm2pewxkem5vrr4s0vgmxt7h9o0o08y8ec893o4c5dlr0tltv4w98xc24w06xwwntfl3drisqkljei1wouqwfte74sl5l39bhpa8ysnek5jq1ag49fi6ry9p9xcz8dh8t1lskueoj23ev3ku7io',
                channelComponent: 'n6czg8o7s5chhgkaji52autj7i8nhzdhm9ix5b6z3jgg6e7s1e4qmldkh9b2rzqtard8q26vtahnbo7fbr6x39h8bqhx8seeig2oe430xwqqmo6susc0zxqt4a1efoglae6uda5y3dakni0gu84eu7erey137uie',
                channelName: 'wck5nxyybkp84egrdybmmmcdeis2fi69aczfr7yj7v13fbawaasqfgetyirindesrdn6g7v8psldnz0skdu7yj16j7hu1v5a1879wt0vm2orrr5cdse3nkwu3tw9wn6ae507kbwkxkjhkp137ii3du2umwy2gxbd',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '0yrl8jisvn4v7so62573ag6wqjvvihvfh9rosjocgsr72rvkt83ejqlo83oy6ulpxhs1zorrbsz6x9vs43x3z5iammi1cate0akz2ntguicbdgx74d9stng1gxh33f4shgjyav6t683gfqxfao1w8p1u98pnglmb',
                flowComponent: 'ws5uuxjrzuqgc073phabbj886zy812206tbe1wlvfgp1n35ruxejfp15gwnzaq09tlukvs9wuy1r9cwwvawhw4y9o9ie5jkp9snph4u0l89v195ej8d1spdxinq7rbgev40nmtpux7qh431mlixrbt1zhz5w1yzx',
                flowInterfaceName: 'lpgjuaaouqaxccto2o2w2vhzp0m180xvrhanlsiwb1fozzhu1rw3y89tiifrmoiai7epe2uh4em08vmo9xqr2ahk6hbn7ak1rqmmkdlpf7rm7j8d9gte3makiuczhcm7ug5w28ydejawyb3itt27g1moo2onu069',
                flowInterfaceNamespace: 'me6vldpg8ea4uglyan54d4hgvuyzpijnk750s1gtwc3l8wix9ry6wdkinecbqudakzijdwu0p2so56p36nwnkr497r44ql85in3hl8icjysugvz2cyopujwuv3d4lh1pk8xn3hklehhvsvp8zmphhnbax67fiwb0',
                version: '9p715t2scairlfb591h3',
                parameterGroup: 'sul0vzkmsguqsyug2rimhlisngdkpondmokpnzf1vg0rft1f6vrv34rpbfrntvu8ib4e7ki82trgunvg00hv16ir1sslc4kilrj1lvwwchqrau2c69kwx3adq6p0ytlcqnf96jabo2oe6jdcypk6mvdhofpcsn7espghkv4jr2vbjs5wwzc0mohxfbxbdw9b3znmkprcq6e97xkkgelhv84cjg5i46q8lga78vdgm58zsmcj7ybhv4t24xrn0bp',
                name: 'iycmapwegfbojv6zsbioskdvhoyal6dizi9owu4i91bhdy9bkb944wku2wdo309kikhl4zvckkcezjk447a3fyi6is1mq7xh1klarlizc6gkq25ihgfpql118pk8tnpb20ub382onj6gddpi4cyx5gywswzcsv3h9ck17d5q30a603n3p2wc0tzfctn1rmsb4hkxe5az1n1a53tihy2iaufff85uwt2aiypoiqcsm32plfxdzhdr2yusqpc0sk8xmx7qo3l7w6q7zboyh3g9fvixw3uebuuynsc7w3c124d77akrf2nfxa49cktfzeij',
                parameterName: 't7tgz27vctsb7m3grmsm2jh672p848pugjk32awhcd9qjld6cf07j6qynov5fybydfnv81rwd4sazeirntr20a2gvd29a71wminnnqw81vb3rugyddaptbxvusvaj8ce8lkbbkvokis2cajopqis7h3k18b60s55z0jxchcv2n8t2ev3fqfp9d9jysud6vag4s4nd4tz2j7osw5q22kuwh3apj8n27m4l9ji8056aet5jc64uqdex404wu32oxosnr8zzjx3enngapd9pgaw2bkpffljyvlqddnd92r6h52bkgidn10clbq2d226erny',
                parameterValue: 'rb01kht6i4m65waro5pslfoh3g6gr6mcv3m06hu4s4gk42okpotdwqal14agvkx6m33ouzkck8088umzu9vdzz4uctonlpdlftmcy3fuwb8c97zwk4w82fqae3fd4hs3cmdlz3rl0mmzhptmtlx6hlv49m1ewihcpy8x5zgle5oewv90741a51ahb2p5ex9jwktv51tcllseb705419oa5kw48f97jtidwjtiqamu2549yew0gcqkq4zndg2zq7lau1y98twucr18awtxuxbwf9eqfsu8i6utb3m75dufxgm0rgcqsecoq4bcsb2zfavxccn9dyy48xkh1vendajp0niajike9htzngne2y94znj9y6qvrgb17kvirp4yefrpb9pgz5a4y13sk2p5lxus62m56pgil71cve97q55sn3g90dyrr5rpuuybmvkpy2xo9lg48i2vise6fr0gi6mpy5jb14tf4rck4qdxsobzb4aj216wk2pfb38auhx6q8nue32kb871ho8dcqvqcnt7uuh7ba1r45hpf8059a8mykhn9wfgr1n8j4defoeh1j6ovr1gkk9apt8q2o3dkr9soxyu37o0u4ogtl7j3jfxpc9o9m3jg3wfi7knoaxl485oqt680bolgvvlmzhsjh3q1g49iod6rsgzrvcezg9j481e2ehv3ki4uovobx5yghsrobwgb7eq81x4ufv2m6xvcja0j78tfzuzecmt5dlcjz2f5of3q5gib9x110ut480oxfi2qbea4n795omoe7svlemc3ijzewc5s1daj7t5dxpaehs6j1k2gvkzzqfw2s38zh93ziaq201pex4z610hauw9f9z1se8qqc1uuvdqqwihcfnm6sv9rjmivkgujnj3ib2gr6zq6sn71ae00ge0p0d7qqp4a4gc5vuq9kf4mr2ptr6r3s2y4gd8yd0hiktfm3deyk10zp19kngo484j4oezq7mlp9w2evcpj3p9g1dmpbs2velg5o1zqfo0w7p',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'qeix5gasecpa5vrwph60g5kl3zzwv0dw2vu67ob1tu5d1hq1k4',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'u2zcy7e4n8op5diy6fvai',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'vz58vjd0eaps0wq9sz15nvx83ji4oiipwdth8loekt87zzfkeeea4vnhlt1m83svls4e4iggvpeu0p7lmrwbb940czbjbxphes8c4obryyto0dcjfdxues1uqgyjd8hrrk2kwo404zfwt5mlo35klsazvclyyyvt',
                channelComponent: '8b7nldhquvj8uwbctt9a73bgxyf1pmxa235llw82spxpbpeiy9y6knwxto6sjdexpbqp5734asn95ngv81wtk9h64ruwts1f8gmgy11623zll1qnjj3e1m8xg51vktbxwih2o6ptgyuigm3rrqr3q10bc8ezesrn',
                channelName: 'we3mosvm10w1b6if9z3u1zi23h3yy8bfs1psdohuq9amsfqeu6kugoxe1ni7mneu71ljg8a922phuzvemriwwko4xqmb7rggt1i0cgekyqy76cky4ztrjuc78x5yyxg7nibyc6eycex9i8t2k9qkk8flx6esubu2',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'c081ep4l8pwy2oplwr73zpog7kv2v328nsqm13yyj0ursxf40e533sjwxl56h0rbua78jv6kfupvykaxxtrkys86lu6r233n83h276g651nf0hhur36dg0mpg6epy5sz407m4cco0452etxs2ew94eiyc71i7xxo',
                flowComponent: '7dbub5wnwau46cyatsusz0szll88appxkxnclm6eny8hz4xazte81k5pvk3uii14wgixneptjw3natiymvlq8k8ul8wu2hdxfcvztj24kufja5fke5s1l1chszqcxtwnqn318bbqeijgo87455t6kvc7qelg1uff',
                flowInterfaceName: 'blgw000ao7wybdduz9808rdmb3e9p85mcw52do70ag5f24rwdhbovcyl75sg9y0e0x2vorlpz6glkrho4phfzy1hcf1uiqeb3dtwoxsbex2tyya6ufko5vzeb3eyx2lci2m40nd7kkvgm0bqyrq2ivf9lij4dki0',
                flowInterfaceNamespace: '6o1pjduncqplv71l5col4qk1b7r5dmgnxynuoiligeznqgk0dwm9x8x71q9riqqzioi0hjto4o7y69lpbppvv3pqm3hiy180y04l5zpzrnb1ih2ut0h1ndr8gk6ztk4gsyj5ycke6jwjuozdn2tckchac6t2tm33',
                version: 'r7zxlpvykk9lhmoa8g6s',
                parameterGroup: 'tqp3tulq7m70i0a2kajdc0w62xfdbxusfkvqu3bvp3sqmd6dn0ju3sz1bjupakwcoorlqm5ppqnmi1y32axrvg2t5qlkzkmbgfpp8y44ixarjsoy4cxblb9feyxrbh1j6sh4cqwuer48jfhscl9q09id84t5uwsonzm80th8cl333dpkljs0gtm4yopual93llyf8real30fvmhj5unzuoqblxogz9n0iazk9zo2c9iglt8y2mlzny67yi1zenl',
                name: '8bcy99tj18hqvis97lt263a8xxk7hw291b67zvochs4l5jntng2qqt6b95yu0752aq1bxehv1kziehttda6bo1ydkeittj80hrnanfvk16zbieozjhpoiqd3gbtmevbhe4jaz6cue1lyr2b4gg4hvdv2910bj3jgqynwd9g47sr5cpknd3s1phjimr4ctupcnhzgpbnlg8fkvza3h56el8km2cnbxq8eyt7ej32hziz9rksshkf9wveo2kd9o6yv1fw370gxsxyxouddrv3ocfnsy70aw4mjqj0ciru66ljdy6vymyi8lypo8hhnwlwv',
                parameterName: 'joap4lfnbccj0yp648h6g12ppspepov2a69brma989w0tvzwpnyvfst4a6c123npd9hiok526g3muaeak41fmk5e4ns2cfifi7xxxh2rmnugatnl140w0nxnq48ljyh19g2s5hvhcj4nq5vsm56lqapcgxnlp9u56o9w2gnesh9o7r1kim98egs8kl8v5chh7w4cmauv6rdppqkfa36jm8gdbbwmpf0p4ztbwz1dfjohyj6p6a44qao5heybeah9caq0ivo23fwox9wwpn7tiahw3rzfxadx7w7dw970xpfqrd1mpaepijren2albyqf',
                parameterValue: '1ec7ca18lofu8w20ukddgew9if665bxxoek6qri4nr4xbdfgm70zsclalbe9ubt73mhss7hq8zwv5f5py4lega972mzqpqv8iod1jsmtcvz5cs6d2iema2x9kwic2sxaoeycily2j3nb7ac8l5ahjna0ceqga6ezdlsr80jd3l52datwqekqmi9hksqc7i6vm8uyqenk9n9rgczlwvbpwb8f7c89ccds36tnj06xwh5gaokd7rca1j0e6lzdigthmdu79p7crpepf11evjvf31hq4b7g7845b56ub0kd7rzzauycy356uinn98xvgn2990x5z8c7fvggr6i4c5awb9cnshe4r4klhh2be227bt7vf0cn1oftdwkzg6cnkaq1cubdj3lgftuo7y2yuvgv8mhik4lk3d5iipba666iv1rwpp08k4jqwvwmz4aprv9e2w12y6836uiadqk4eeqd9s06vk64mybigja3p7zkc8pkf67exzdsspvswd00czl1dmhlbrj1gk8t3cy71sczrwcpmpworakrr219sws4v03fsw7pwpuez5mqy7dts3309p224shhoqvhbr7unrg8dp9xjebg9pmj9tky2fp6uye4nxth2brl4hocwj8io7eqt6t34kex19k07lhwxpci3mkw5l13rxrc9omne2e6tazoricpqmeph0pmv4key53q7k7f0xdz8chg4h9175fgdg3s0y5gghs3l7qte8rg05am2bbxxclt8txawlljte4uylzfzlo2a9bdzertcqylrsl65bgn5ef9l8gbomhkf6qkxpygndayuwno750m7ui5o1cbbpoq3vic0seasxwnlisx1npuvg98e155ju9kae68bfksa3sfzpmhh45vwilm6rlt0mp34xdh518v148nx0j3kyyydg23cyrcl4ju3yfg1lfrha0adiiwrwk5gmynkd42nt04eg4g6b7rnjqnqvbbpujc50d211lzcb9jgn0vqrus6qu60a5d9fdd2tw8',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'qzwdf5of0dsdsuxftqgzqmjb5esfrfloz65u2iyzb5n9wzzh4h',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'vcwavdkpflbuhe9og6by',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'cs3epkzevg4vevrzooohozu28s7op1dnwhg25yy4j9m6m0d4oxu1jbo8nfwfi14cwhwc3c8oiez1m8fquvdr9psiz3p016sfjevbyiux7m0fmtqblo16nv7s0s1h9o4nao35xo5gnlj7euehic2zdg519rx1apvp6',
                channelComponent: 'p1finmn6q0tfiy7v7e9279jwb7sycnbgagm4ghm6gchyrqqrmsh64c89q40prlmm16dgit5qspihmubfd3narshm9xfkhlgq96iq1x3c34n8ens2qrdhasl6yz5dxbj6d1f4dp9ld2w11x5r9j3eth6n8mk06yfj',
                channelName: '4wvuelsu4uxg29qy70lurvptlye8gbueorglxsqttl42nmrr7n4ba7i6zxp23xetj2a5t1y9u5hoxtfbajm1lc9k1lwq6ucvmxet3ue8jk9lfs3mbbc9zeecebd58ot5q3v7zhpgz3ql6ol3t58qz1qoivw13fel',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'elia1xgtbn6a0fvhyickhxd5ab0tsfry84t0xg6gpfge11o6tupecu26ir023rxuj3zurajwf5owvxi7rzfchwv37bbckq51dlbyg4uclf9ollw2613ymdlfmdqog09qr4nmm1wk1rjkb0i90d7ev2z5r67po5du',
                flowComponent: 'nzlv65s6nveohwgaajxnjp1ti79oqchl66t1mus1balwj82qfty1yhkqcl7jj4tpaoym1h0p8wezu2afes3rlx7k212r79sk6fy30tyi4q3un0wb7tiumzovy6fqgn876u33dv733012o0z2227m0gnk4gz7mh9t',
                flowInterfaceName: 'pwgv6deauf5h9as5hrfvky6klshinb2xbp9dfsvikt8whl5nlgb5nsos4toil7h3e9qqg20uu0o0py1vpxb5hr7yvdq0twnaccnje540gshp6kj34hyxytnmjiidrgkv5l1otsffjn646tphbm9jt3qeeeupx5kv',
                flowInterfaceNamespace: 'xrmsvjrlr1heo367cg7uegvd1x9o5eq0wvcg2tvtvh4i6uubwvjisf5lot7jodgalxpjvc3bhxqjejcdpnh0jcmvyw8q1pn7o7fo1pw891ijtsmlqg71zqja3rotz6563gg18hw7nmrc8j5g98zb7po1p1cf60gq',
                version: 'v2a6p2h6kwomdklbp2t5',
                parameterGroup: 'c1mvo9b4rw88w1an6s1czax2o5l8ccpgmr9dyjtovgpi470u20a2irw2qg4hz4q1nbldggdkiywx4k3bpnp765xdpdrrq07j31zztlhpunlulioh8k4nk06ddyr8464bdzux1mhebwtklqabtg0o7rm7hczaidck6p8y5of8k5l3l5lo8pn8mg5q7f8zn18g7ui878js6k5r5oqw46bl81a9b7t0o8bc1kr8mawaw4o8dabkzca3yxd2yuvj5ak',
                name: '6k525plkdpzqojee1ma7l9018hiu7owi3j173xbn609kydha4r3vrg9efga3bjqehu58pkouv3w2e9r2zzcy656bjsrg7h15quxmokf7q5q3sz1oxc3r9b1158nme273xsumiccsl765anzbyc9fj38i20nmewvpi6mx1ggqgiibflfu8b2ukui4ma8oq27pdjegkdbusnlfh529kcv2l80cmkd7nmk30frn3w981566jjhgzco830xd2c18j63q4ol5tl2r5351y4ume3a54ne0m99j3h7apegayhj80wuo4tq73be1o39arlkrw7sp',
                parameterName: 'ejs397h2ap30j3dvs22eewq1pjkcz4uuzlw65gquf67t8d1odakk91o9wxfjzu03ay2pyfm71a774rw5xamw34geahdgrtwoq1bpv5b820zp523byjede40mg0ghdn3c6o8vwg735we502987n3ksxczuwxtsy5i3eou99b4yybxf5yw3p3a69m5tpnvnxlo3ubt3mk2tjn7hfp64cguxpjk2b6ib3o8s4se9lwl4bkbudyy3r1n5jhp77qumb9ackq4q9jiur1lj3pfbq0dbatuxfs92pba7ftulizi2oj2m801u9uun8kucth0wcs2',
                parameterValue: 'uo2k0m1ih8xppl6hyv3ry0dajpkn9f9ndye46k1gseduv2y3vsljp4l0zolpyxi1yn856b8jmdyep47zaoe0o3ni2h7i5rpp2u1lcmycx83b31t4xc4imcmsfyvbzr8d36e24f1xmohmvry3qa8j2hiorgorbalzg2lf8fexz8wu4bkna2ghhfyxyo0wer99uyvntkxbl57vek9ra2zuvs6bnb86h7jijlgpx2tp1icvj9tricgoddzfze1qp3f25pqu3j7gmr9yqkfks9fo4653j8b1k6vgyreelzfn7pphdjkzt0sixolfxr9pnsf35cc5ez7eytl82xqmecinxtth5jwk4vguvtp7psqayl4yer0vhlhtblqymgu4hv5iex5izvg1u441xxcr9i546b8f5icfrti9840yqxa5tx2aqsb4l21hbfo80vgg6fqod4mbbpzxwjlnuu5pgi5phg5csq3jpw6gvluo97n85atv05ob0qmhjzhfz8ve5dq96821ud7cws0k0c4svzwobtbejs4wcskilohv9l2wdehinroyqi44yivat2zuapllutm4jedpdpetmkbodtagd51k767odoj02byayur218mommexohwldgcq75aagk4zjpd6yw4dicy4dostsfz207z3oho7n2rrknpr0e2wr3n3uftiir9guxwmrzljur2p32i8mywbthbfmvgoun3xow3em4levkgian7zgr1sj7evc4r1lmz1cnx3gz4vq23aezt4g39xrxgnwq8ke8plckidn0t1wxydshakfwtgg8w63c2slqy5f5jlml3ewmiuml4fmacria4ah0z0ekptfhgatdsie9jmmk8f653d1wrgdgbv0avfuiftqtl3fjf3v19015vumaz3lv9nz82pl0nx9fmynp1p46uchi6jd55zbavn61rvg7yhc63j1o8i9j25poxmdphu5r82usfqu5i7ju6q4m5k3phiejs0r03q21disdhvmgrf56gxe4a2',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'pwmlmibl2u2i562rpktrffn0p33aesvtrns9u9r1px6t1jm9g7',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'o022fjx2068u4qxqmw8f',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'ys7zfyjrt5a3a2g90x0az682ifih6yoe617q0fb8gki8j50nazcdyzzz5l1do65b6olunrf402ne8xcu2newy19s86yszqug2ptkgblvxfeq3jioaynmr1j07a57puqpjatnixujdjyus3nkfoy8soy57kjl8zi9',
                channelComponent: 'stjphdh7cxm2now7rfpddm5i46kh23gvhfwo2ew7xejh1erm8x8651ttxpvq6cwuk0hcgl2d7kv9bea9pkirt6hrwfu9kbexjce5n6lm5lc6xhw5hgjlyptcl4ykdtd29l6ps1oyenhp351df1dxr4pcyew4kstiu',
                channelName: 'rpotomu5vshkhtgf4975u1i4yiv4fusorhp33dj062hp31f1vzeeuchj0ft1glaw0w424b0r33q2o8itlvzpex4n5dpqhnulck0aa7v52xby8454f0n28c7a8iljm5p5sxoamlej436v52koyt6ym191el9mk1o7',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'dn7tbo4ks1fws7xaj3wb87lapb2up1zq8muxa66miys5j4aouazaup08bp4v8bzznu8rp36afr5oyx9ii7p0f0n9dfugwt1vaoi7xvywstaspzlhzw6y0zjle2ciohxxpuks4y3puf3f9fc2mw1lkfgdrabftdf0',
                flowComponent: '77l0owh1olwud7tmf3489v5ylnhexs38u0mbpvm84ckqqqpwy392r47v57iavy5aojrpjhgfni5d72yi56xzalbzdv3mg1crhnoxw6qd0gez7e8lp1mcrfoca3aypkjrmuqx0m4x4ekusluoley2is352v33b6kc',
                flowInterfaceName: 'j6m9z7grai6c48wxffgc09khls4ywumxe3qcgy5tnprnijnmo5s38i3njcuzwa8ffx4gl9v3nbjd74rqx0j1f4aff9to2dom30u1d96ofzru78jdi0t7uasy8ojk8kbkcnljshm2xfa548niyz8aja2swhhadil1',
                flowInterfaceNamespace: 'jg86ux4ubx7gfnbj2g69l59n3u38nfo1alhlnrhxuczkwd92otn3t4gt6hvvucvllbjq4w5lmrzq0cj4erv882m416zb7ws6unub084w80u3mhjl79npcp39naxgy4azdiy8ui19avkzfhw2y3ind01j1q46xvmq',
                version: 'tj8xi3z7hi55e2cpsca9',
                parameterGroup: 'l20y130tf7czv8clec4bzxadexbsxmdwu6gzd15hux74543qm3mujluaszv7kdbmtzz163bcx02cbfmvuckvxj4tl4fra95y1c0l8ztw1s4wsd0w0fz9viyvrws5sq81a6g3afv85iypwes6a242vlxphcttq6n1p3klx8k5pff7vk5xjmpa87toggm0gqo5qzc24og88cokqgda8xahkgmxlbg5k9wg6k4zj2uqrg2vtdrhnby8rmqy2dtyydx',
                name: 'd5a33dwnkerckbao5ku596702io2v3lsd5vuzjn7r9bleipw442fhoomfp0jcgd7smx5tbvwspsu7aicuwxopc4yy07pt2vjk0wg6bqjby53wbukfmtbrz5nhfbit4ephvtlhxrgidy46inun7jmr73sn1g7ik3f8r8po6hcavw3upk75820i4u9lycx66pp1deev650eandcc0rnu3i7htmx91osir0zjzvel47byb0jhn13i50jsmionbcywblroqofkzlc0zq3pjbhq5ddbekl6bc1i5i5esg1swjr8fcyrnch8fsnpjuncqzhy97',
                parameterName: 'rynopk4pek0gazjsbjgbho1oq6h6g1cgd2g40wp1xji0z5uil88kys2lgw69e359qspjiotl6t4s7vevqwmdlik8en9mtabhd1olju9ksps9n12h0qp6etlfnn38qxgccndqanxujaq84gpxrlbw6z186kdadwpso7jyjx36ui24wijnxcfbbt8ub0w8eacoq3bd650rqskae48h9cyt18kg8rn9dfptgaux06niuj2jlrk1finw30l1lnhc4jfu5ubvi6zfpfecxrtj552ttfns3n66vmf09d8uf9qsku0zq22v6en35kvu88sj6h2j',
                parameterValue: 'm917dm6ovtwskyx5wizbfny5jkabevvxa1p81ssnnaz75pxh1l74xhjcamjroq2k1dcpe0m1ms1245ih0c4aqv3vkx09qgcfw1log4k2w2gllr79eq1de3ryt7knknfmysmlbb7pqhqdxl5chor25vodnnwmhvr7l6e2f7xse6pyi4y0h2b7ek8yogg4bt23fez9v7y1pf2biqkf6b942eqoawk6u2u3mowul89dke6yrsudky4bat1fr6ziv7rtiuidzjtpqtcjzmj7jsop4xcwksci2ak2dn7vheholou3zphdzvq4ufshpsf2zze1fjot0vc9kb6xumsvpq14t2fenteg3xdgcbhdtxn9o2p269tu5pa5e41cc3m5yu25sma3bz3xodcp8e933njgx89ox7butogbxmqsy4a0v73kvo6ukhgp1s1ix2i34pn2yofkkna8hvzxu7dol8npiusrcmwrjlk5wykbjdwdsmxm77f475jvpkn9sx6h93rwf5ei5sf78i01l2qztdsizugqgeg0sf8zupx2b8atddk4ynq1ck3wbedj8zpfeijkn0bhbwf6qcg5lm1cq41eh075pcc8wxoaqxxgtunz2bkb16iprdnj2ukpm9iw58s4hr8nctwq7s1nrpq8rbins4mqkbh95ifd0eawqh68ypbb5mqt3zrpuawao2itxpnc79mti8ol42j4s33d9tttku9zq8jui6dc9jwilfzdimtaz2nwl0gk32nesrgq9d2t674r4riq8rf4i3x8aye9o3268bbg0p1dvx63opbmcneezgxp52ecvi8xuo1ksf8ncebtktkcmc97ifqmlystwbi8kfs1j62qylovp13projc7wlibt9nnp0q7ek9ivc2x96rqqtb1ois4d4q0iip42al8wnfjv334l18vki4aly7l9u4xv8t9cr8aigfp4amijo8mkkah4pnz2kjm7u4zydubv7o9vc0mc4e9sz1benhybqm4k68aggu42h7bcbn',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'wzrwzl1a64gal0ikirg7x8h441lm2u0f1kh8o77eo6l7ytu5a6',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '0iyjpt5uemncgxuwuivq',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: '41m31kdkzne2kzq3bj5gaqhq58ajtzngyyjtnq825oovz6yaqdt4igewtebayp6utw1fw7m3q2y43ni8o8sqwo4gvszxj9esocnknh7ljn8hq0eo3i44sr1jrctxixfp0rc5jeekfi61ngk0885le87vn35w55gl',
                channelComponent: 'dsvpw57fqgmey57vt2dl6fzjki8is689p9zw45y9zy7uebu1cha44q9rdk78u0qa4kdn8amtjsuw1j32oem221kdnjdtn573hy47ul1ftwptwnnl82nrjwson82kvnkqy1ttp6i9z5w9gou8vlvbkcsegc0bf4g4',
                channelName: 'jszuxtj81ddw0c0ighkrh205sosdwvrtxqnvksl7h8q8l4m121vk7v5yq5exz735wdapm9f7lmqmtqqg19e7gr6lunbcbwb6s6ddbcin1if2gipb57drjvdk4ad6tqgpbwmlmx2sl7il1hktxgi4j49l9dah40tw5',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'bbpfr5c7yjod2o1dkxabtvd1i2mv8anuzdy05ro3hi5gntgy2p9fkq6xvd56vxhfead1u5leq5ndov2g1wj06aix0d60mxuwxvnzsj61mthifwfny9osqel0y09lxdntk2fxl04f10rdvq03slm5iioqlcqyf1ti',
                flowComponent: 'dvic4477dbcy0y0erereb3ao6ij7a24my0nu503x7xc26ldb2nv9fp970rraucpd1653dfuuz9jt6dx7z7dlanmut8ll6n5j23sq135i80p7g0o4kcq1th4cdlaa4xs0y6n2suyrjx4y2c1coj7js8yc1ykb32xq',
                flowInterfaceName: 'ck4a01pcj3rwlxtsede8ktpay6tb3iu5om0domla8u7wha34j1akrrl4wjqajuofrhxh2h2a504xik6t7zvh47qng5oqn927yype5km0isl9e135x2im0ho9nbg1u6fot8phedclga3gwavust3qt2w60iicn8ri',
                flowInterfaceNamespace: 'fimymtdn13rshk8d34c2qf8b2wmr6s57r1glb8djm2m97j47hgy92lzahuc5d83pc2h7y3587bogt9ed6e8c7ebwqc6kxo1rryfij4kkmax31u5c4rdkgovzwqmtvepcwxbcah7x95ixur6fjhqi74oijiq3smui',
                version: '3zd4dz2iew2eelxrmw74',
                parameterGroup: 'ftsu2hf2aha595bz9tophtge8431nr37hy3z52ud3nhznnjhpx8v6lolmtxfdoy1alvvh31y14874ykfmyrpthmr92ciaqa46x5be3rgp24dv9tvv5g519i6tpys0nwtm1ma55wlqpidjxro3fcn1wrk9gw5mzlldqxvfhauiinjn6wfkxc8opniewvbd3249kcawbqh5o9uwjh41y6o0vjrsu2czl30wo33n1a3wbv9iww277hl5n290s6vf7b',
                name: '62pjmapq3sfe3pcjrvtccuhta28ttpxrdhqevr53req4w6g9fapqx8ualmctfpp1hrmzkp7smo8kkizfdhdb2wir20agqwn2whm2x06bt9v28bhmbvft5lvfu9ihidw0civ42pcv5px35cqekqfbs8y0kyzu13ap4up66wtuplpkrrekgr19pjxkeg82ikyfzs2dzcdzlx9bqfynpcmkbkvflz4wd18143bkmgwdc9idies26xqjgyjepkihjhe10ieqd3ieuxp5cipqpr6fesh90mykxj3idoq3il8i1knh7p6ebslq1x8108cfdjor',
                parameterName: 'xo3hp3wyy7m3lbt7denjdvuyv63koi9pfd10iq8wwugdlac3zbekh0u58ijc3di1mtjlh94e3ssqvpbbnowlxpm59jopsvvll1xy31ip9ote7g4tfrr5djm71hh4k2ia8ervco1u5c7ubhzafh2cqkojphzf7qm6bxhpze44kf8fnaaz28sk6gznx9x0igaie4yubskdu59deceasjiukewx1v96dgq00b5aegjp2cfyai1eo116wpm2e0u9gl3ftbr6u7t6cy1yvnz7jb8mj2qbekx39twtgf17cehmsxm0q6msv8kgaa8po59rgsf4',
                parameterValue: 'mtkn7a03zjayos2j95228zi9rnh57u3fv55lsw5ecbx2pd5e4pl5gboxvgj7sf2gl5vbmyrec94z7i7ehbvgjjxc3sins6mo780bwg714nj0y9zzjdixgrslkeeeg113lvz0ub2t58im33a0cwwdyx1kuv9myrpu3bcmdl7x7tn7elh8hp1uw2hmf1mtqk61g31qdqfbwx9mits939jt5ovxso3wnopvlabhkepxd7ydur8pec1dpsgeuu4emor0r30jmcrzkt5mydm5pit3gbcifo8x5lemfb2ztkf6qvrbd1anx9yuqt3whlp55io3j9riyfq4iz9a0m5qpgp7rdwvbg86g8v7eofg8svr3b0s8ay5hi3r766q16t3rwgislyye3m6m1bmjh16i93p1buuz0ibs3et92axvl23wmjunieem552ey4k9ef9ygh6y64jkg9gk1ov8t18gekc65jntsv684zpyoli7qeolquhf0bdv15288msknpbx4xv3i0grm3a228uzon911fu9k7b321oz9yvkqianf1szexn9o29c22lf6pj3ywnmp3vlo27jvlu1o3rdwmfiu9mn2d666i430buhwc612zh9q0fcj9e93xj8j9ti4vmjhos1tfyz16cjv4sy4xbq57g53miv4s9mycsyhlprkebazux1g7tcueczoa7rkjew7k6hwb4r7mc44y2jvc4kxachc5vcws6jcwe0khxxtz7l96oisxiv3ccvxdys8ypb6xcc3kiem6b692i4hhkahe0e7tuv8ulv7zizht8gh7a0f5jjbu4ippbraoy9910xu7f1ai0flpdcgbrt8yamdknozveaeax1jx1hkkssqhm6ydnc8ic3ex7xj7jst5c5qoclu48qfzzs0naq2b5qhsk4zv06559g29cfcdutsejet8rlv3a4618nciw2f1bajpuq5emm53yk0fkk64kkldrn11kb66jds32jbxtsh0vrbkyns78r21xr4f1j4jwqx4g',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '3b4cf8g0xeb0b88rnq5r238wl8jfqf5l2g3itr5w72wr6ut0ns',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '9yew3n4tqufr2cipc0lw',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'vrr6c7j2ahm0oi4iif4rz298m4h5zm56udxah4xts43cb9vhaipa6w3a4or5a2rh44xfl9c1x5o4b7argx1z29mdn0oniqkn1jdjpd2u8ntc098a9zl5a0xlmj5zarj3er9v3qo37ta915xjcnmxczl0ml091lco',
                channelComponent: '98lhqzdx21ebmjj1fzoprukfue68xbf9qxulohhlrrgfr2arn8hsq1wgxpvro7y9lsyz4q2916yvxx878b4gm5v8ei3cj420l9rmh5byo90qem2u1t00hfjddlhfyup2744dqu8jcmlkr6qdkmmvfts29pz12sqy',
                channelName: 'q6mozos0sa4sv80jr3s334b6n8drosfbm3uah52sccdoo0hcmpwk0s2iqr40vg2zhdnk1y1luyevznxl5bmqcu8b8gqnbpzeebmwsq5ugz0urg82jjjlkpempskp0d6fiw8jkgobg8jz5qt39m683fusukk0zdgb',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'mk02mrsbko8r47kolx2j7ver84lcjyqf3cn8bwn64dgxjjcbrgm8utkrjavts610ushzpvu7qwkjp664xymetyec5152wplfiimotg7tqr1m8crvf5liab99nxvekd9rae6vlw4yexy4gtxiioavfdzyz2lxtnt1v',
                flowComponent: 'o5k25t9w2bf6bm5gk94luzllehv8esoupa0r2j0tp7ccsklcsvbgxw4qch9g8ac9c2ywupklkj9g23egzt132tznh73xqhz36gra50zluze0v5et4fen9dn83r6d4uibdfc5ysoqiakbjovouafuzlt7q05igvgh',
                flowInterfaceName: 'p8k3hwbdwpvwiv1pz9nfk4zk2utpbt6w23q14zpya11jjq1hn8tk7ev3o04g4ixj0wcqilphdv9omn7h8fi3gf7un21tkyatqlnc40ci3al6ychu2rnolmpt4ybo8mzzfndl9ha09dmvtqsp1ell4sj4whfz4msw',
                flowInterfaceNamespace: '492ftndpmiyao83vefty4bd6x4pgsaeciejbds0kdb07du4rwodo7i535htfaj1a10ytkpo9dmvwug55r44gu7r3ey5tc94on464eyloj0m8r3aj4cg6gmu5w4yrorqa9fme8gnckfwf8rs1jlam3ezvokzq3vm4',
                version: 'fascya07ip5dk3de9tj4',
                parameterGroup: 'd0ig0zq7p34ip91t6tjjq0xqr99l4wnzuvl2nlmieye38n75wn6ca9qpblhpr41o91l9y8dh7n63qycg63lti2thghtzwioh1sgdcsj26y2wu2nuid5ucoluuzwpz17kmxfn9uuouxjqezwgdt8bwgzx3bultbmijaspecs95mhcjxq42h2ch58kljk1grqmugpx7pq9rx6qfcbb3n8mc2fghsy4arcx9wwy0ikpzojva6yvmpfhd2bjycznaka',
                name: 'ydbc1e929xg6bdwoj06kxacbbn6acs5tv9vn393ezt6udwf9kom4cq6fqmq8h9yrseoaju3jvlqa5ulku6fsk00qu80nikqgjmbls3edbxwfwxtin1m9wqkp9bcelq17c0a6n35a8zmk1ra8rs6ycbhqp1xcfwbq7vov9n8lvrhjeqjpkbwun7hl796zhf6ajvtvyx76gdw7pm0yobmnahsfb8gjryvz54q6gbfmmwxpmga8ytfac7pzgpb89xvdvguqp5tgkwkiqcg11lmfhii2y62fs8b5c35rhw10s0smhvxi9q5suhm1bh8tu9jh',
                parameterName: 'esledwf7ygp6db127u6x8558719z1hr0mp2fq71iag1ldapifoersrt4gyjx90hasgddjnt9gyn5h5racupq7bgvc2ksirg5j6pcqfwy0aduq8ilc7mavp2jx43t2efey8tqesweiynrrocc4dcnsn6my4qvz6gzvjk4qhnf9p0z1cwvd5c2x7dx04sz5phit6lbkqdgi847l02nv3qi0yvlcvq34jivqp3z34wlydcu8shcl3tdt73foxyx95bitub3oxznl3yp9jhfdlwxqbmji0sllatf5voj9mnpwi2h54bf80l86gzep2g74gy4',
                parameterValue: 'h4ie9rufu956if1uat65nxvvrqovop4ghqsvrbk5m8hzhxwcllxt8ed8mt0cmyvwx5q3r0iue7fgwbhyr23wy224kyj5os6baccllcfambf69lfdmhqje23y9o61dz3d6qodari1dfgw4q2w2arpviecproz78s182ikg05xtu1w422zwda7b7hfzb67pvwciy3r1nhogro25bhj2lophkqzt7jiuj9tkjxfmgij5cryhqx7tqr326edaxsp0koh0kxtgi0rnpgt099h7n2ox27omsvm456e7ot36mphg61do99we8s9vzzz4wjpdxan7wkrrbn16jfv7biz7i04iqxo6tjjfz9bsih2hlzxv0fo7oamtzute7aqkrbjsb4ecti9f1ffc6hvmgyl2ekcm601kxzxnnhlqckqsojpz6ooceepszv0anm45ib48oydnvfj051r2k5eeji3skuq9udkakl2eae8b8z5kxkn9mhfvfle25fx9bls1aqlwwzcsespq9av7bcqvtgz0umyxv82vl06p0lsq2iyzwn2uca7p6993euei7okvpdne1n8atpc150jzx900hcgzb679xgnuccpus4vkvpba5p4pg8qp2pl50btoohujatm3ovfcnbblavkxcswglk9w0pcqqjd5inzz3x8p720litp1wojhuruzulwp5wjxnb5jpf7ii0f36h206gfdlql2wyloneh1njzyp7d30mb7rxo1wevw5czsrkqngnoonhdiyltvj1tfzo45mndn9zegbcpdgdiy2xzkodwr4xeafnh2hsujpmwvbb4x0j2v3cmsrx5y971x8azgto5ocxg8d5sg3nlue0eb5vbnhodh471y5wu2xwp03y364f809d6ctj6jhjvl4liceos8t8g9oooqdo95u4mykpmnxz45085p1zvjsmwk6b5vp8lia8rwr9ftkmp0k6koqvwa0mn21hfs9mkhguapugh40mdlgsn0bd7ullxz011hft07ol93kvv',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '2zyu7jh2ask3r0yjft5c8ncv0q3p8f7sqj8lgc8gjvrr64stqk',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '7flrh03yt8bb346ftxwg',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'kimd2dznwdt9j1w6nlzxkgh5z7az1xbrae84mg9n6kxa9hsnm9zbfbjn123meijfapy7z0vpn1p3kn6fjw6pd0sgozid8gyzjv7ztjthxjhjwrsaub5hntbyg58nhx07lepuqea83z5excw3i64xu8rkjutu0enf',
                channelComponent: 'jgib2zq93w7n6fs07nf7u7u9xjb43we6oazms5ap7llpqt8hp7mi9k0oq9vn333ovww30w687etwkbxhp4sw7opuocuxlfu0a03nh81vq9ih7ag3b8bz2jpgestrlfy7nno1acomnp63lnjllbjxx2bkjlbbe9b4',
                channelName: '1wlzs7vuqpcnzqq8myvrenwhnwm1dyyibecp484xztra0jbgdjljnzbv1ad4blrm8fn2fvdc1awu458erqjbbxl56w5z23vzesjr41jkfwrovvb1y7tid8vsopq4eienzjgp4c4xeomwdh5ole2w68cyzjs949nf',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'tzylfw7r6s73s6zv1uoqlg9c6e3yai7iquye1mfjr7uno7e5zxkz52tipxwmxgxk94p9eg1z3vxadhyeeencgj52vh284hodd0pobgwn7tg4o3cx51b51z2ngazr833hzkh1xhb3v9dcgat6a8cooq93b7jzb24c',
                flowComponent: 'xm0hhv4cxnmpvp5ldn7a3dpp0x0l7qnhwpv7jlxp8zticrlr8cd7f1b7td4hlmdhdvc0rqm18z8w8uwyexf0o8d5g4frkybqd236syi7amhkvr0phl3lwpyioh2w6xdc8568f7uoo11vi7l4uhakk1mnjn1r1zgya',
                flowInterfaceName: 'mdgfon2slirrzxcbmc5a5iwwaervgc0st2k7kkny4ab4gkble5relkugqzgjatob5rxbq0hbdtynx7u4iogn8exgo0se2phie81j3ouc1a5ryjecu5dy9mbr2bovnqe669hl63ghcltx8pxep7z15fukwqo5h3xl',
                flowInterfaceNamespace: 'ssrlgn9tg5x1bzao9lp11oikxpfgpd2v062lqbmauint4b21n9koxvblt7mo7s88eoasfnd4nehtk8y39dd9p5oupuh10jrdbywucm0cqni8qyoj6jxi8auynlauzex9w62jehzyxiqnfgotbhtxcvr7iljvt4s2',
                version: 'zjs9w0kgb5a77h9ti4mk',
                parameterGroup: 'igsbi6btkkhm97bk2yechcwmejoq3iodvtq0b3so9uayeo3e4xu4m1hnekesrpfz57nq6qkbqaajwcrt4kihrfnt2u8sf9ix2xrfzity62boemhmd5h8m64ulbgll0hmbqy5jbn5zhspuaisg3qb0qk197t1eykpn1bbv9iz5awcs9pb2xx7unxwbuhkw9gzv03jm6viwth2lu7nyx1wah7ebyam54todm01ycqakoywifv2qw8akedxeu1frkl',
                name: '2d8j1pirsym9anj25ojz7z3r1jkinib2fxq7iolhm0yd4y5egw80xdy61a9k1papdtqf2nyv7qdxq1mbfiijrfo0uhzkgezwjrievqx6x1scz7ytqn3owcegkrfcdb7n100708ynlnsgrcny6zgebxksj2wfyirmdd8tuusfwtehevxbfruvwwiedz2usfjn2sbfoxpwe4dy28g1iepfhv6u1tfnuwqv2n5dzxpwzhoxw3ussvpe4zisvownsrkq3bybq5kh9j9ps5gt842yt2nkjdq3vu7idoz7zf45ygfvy71ltnfwzpfshapnzvr2',
                parameterName: '2sq90se3djyw74jpnwjy7xme9kgraz2srl4abnwgmdrb7qr0k4qa37cbh3qbm8gs5dq45o5t4qyhw0c7kmoaiqs4gqv3nwlw7soukkvvu6j5l0wdcuy6aeq8jliojmzesbclwvblvniwcrl1xli91tvbx58vbm6n6o7vezbhftgnvfsrrw090kds354xpsv02tjppwltr8i0tz72bi8uqo7boyno1fcac3szbk2f0ui4pse0ch8img0s3subo06c4rbrrzwwzr449fexdyyivraywhd57cemwhvl85s99d5nl33h7snwtnfxb6v75d5z',
                parameterValue: 'hyakryv79yyx7gkn3dzcxd5jwbyygugg6driy70g3bi5fd865i0k7vkl9g5v6at2e4vy5mf335qvesqwoes331dttxlh1tt4xowwdb45vzizppywl7jxds6ol0q0s3vhoflqoyssoo6js5jwkr95yllv0rnajppnuxj266j20iwdcjklp4avtit59fwczizbz3961xwen9i9a4a888bopkvalkzapehjeugpcy61dxwl48jk92cdj4vpnald1rq4amz4r092uj3hzr9qiugh54dd2wrsfaiovf5htsk0ndtv1fo13aiwyjya6x3yp1kqp02erv6rqss10j0tjpcq5hxlefhwwa1obzuiu5fh5bcf2wskxzikhwyducn3lln8wcztiym9oi9w2l4syaigy23g10a0dgohc6gmuq1wawrzz363wvkjrx6vx3qdxxpusmlk73fnmdw63rf4jcet49ts9altmfvfy57ffe9synqk8mj98qo1yczkie26787uq0r1qmtkuklz5hcsw1c55w9qnn19me1pgq3bo3uqmtoj81j6500pct5j9qjwup17akv11c47t8pb4tnm7c0tkfchyxt8vo166x8v2ix3d9op6bzlj2olyki8192ad3qx4e2dd25emlsmuj8itm0v9t6j6p1743ndsbnfv6xlqbraii771jqw9xkwskxtqi50x55b2akuqtz6u7fl3o7rxit2cz75fd17ts7mlz0mv44kg1bfd2nb74rqc1izwtz4wvaz3xrfzhnwimjmlk8r0qti2x9tjr4rke0hu6hxlr5z9mu5r082dnahbgy8ra8tlruhd59ee863tca3metz2253l88wic4w20xwi3mo4hq4xxmf8tb0cjufx6i6jab9bxbd09xv77r93qodtjzmwgxnd2zl2q4yhxtib11hn6j4fpcrzgr0l5k79l8mrotaahrjcx3o6a1k98tgltk1vltdfa0e79utpu7evbe1yoebdmv2jaozilpzji8j1vxx',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '22c5pcop4qcye2tz6ydd8sy3e29xuccprsleayfixk04ken1vw',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'lruj8znc6ngzssdiipcn',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'p5o1q9e4ntc00j9bqqd7kydykhv8n4pjf31ixzmsrswipwwzicam9baozn3qcdf53hhpjze8fc8nowvss8z2mk8hukf1dahexa1s1gxjsl6pf8owqruzzg3w24jzxsrtwsw9pov1r6x0gwe13jxmwv6437k8crin',
                channelComponent: 'kvh77cqfe729xoeou8ehdqnm2qftbhgmlkoh3plco4khjjjilsxdq2ayyi8pzob2hu4bzuq0697bg0db0r07vvn7e5s3up9h21rkc67udtx1f0737ed52rbx0pm1e5yaesoy9yvuv4np0uq31xdi7afk7zdwy782',
                channelName: 'pw9dtyfpeuxc8i1eck3tqworbraqry3tg4lqsk7hl3kr8rqe3ksrrs1sofjjkgcp2fcmvhbzelr14vec8mp4et0kds7ejc54w5hxb9bdd2je4ldeheb7uabhcb52bp6o7dfwc905mpp7zoem2i6tf2k5c9no855h',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'ljmo057326h6awpyvipsau5qih30bxj7vy51vz26cpi9elitkzrxqrlq1wicn9ufcm9asrhqzq3pvrza5xj0p5favea7cqv79us3wub2iqhf8yte54604ydfinzr97mxjq42vy0xud61vncdkgekz76wptez3c68',
                flowComponent: 'd84ao3erm097zoexh8zb1p2rgvbvimge8gfn9l7ddwyslvc5x60901utpkn9zj0ms6k1h80al22ertur8v54g27srxd2dybm8t8zxqwx4baellbcktl3iud61n2zqspcq4zr4y4y25z1xgdwunfguepnqcptzjba',
                flowInterfaceName: 'ko86c08o9j52hyy7slts81uwt1m26lfw1wa3b3f89ldf9ftv5b2fgejwwqphmgxos0y1urj8c4475ie0r8cnyek3483wa93agnbfj4cnd2zbpk0hmi0p7d2s8wiuy5ej3xdpeyxi6dqt17ikosciqn1t7ozf4im6j',
                flowInterfaceNamespace: 'fy5a0i8p9eui09ly0l3wfza8fv8aua3higmln9ixpq3k0xjtg2pk6r14s8l9x4cgf9eqzvp69c4471qhnd62qltgbjny6i2y9r7pk9mcgbt9mf1v10rr98ycj0xbh879san6vbfex2kyj6sk935e8l9tv7s8bffr',
                version: 'dtltdq2ijgr8onzf46aa',
                parameterGroup: 'ox7mnouhpv6mg64oj617hwd3cqb1lbk86udajz32sqauqclfo7c6zceftfx4g12c1abpdu1tp0zhukzqbc30ama3xw6ncotcli71au68amz0opwjz4yh6nutugngpdjcuyaqkqxq7kxjkvqn54q1xgmr24yy6uv8assxmggx8mnl45x4qyc738uucp8qq47hwdzyxsfnhlbl8pptmzc3x33n764654jr1qm1vdrpy1pt2v8usfardqqdtnr06jb',
                name: '2s9bm3k58fzasj62nlzmuujx99twtjqbnxb7463oig4acd34fqymgo8hb7zpqcriz5too7aefqgsnke1g70v5dv0kxkxn6cuc5el0vog2ga52f882t9ad5zsouwehbh76lsaocgnwhw8ldyfux8ts1icm3r1tcfcwq14im4isokuc1li6j90gnpdxrq9b3s5bluq66jk7lim7jdjkiy1qqbjbg1l4ruvrzeofb2w2k28ldcw17dges2lgzhfgzc1pgh7l1wkvyl9nk66tjzum0w7monbq04bk3hkja2dd4m7tawof6u25tpi44rgd4k3',
                parameterName: '5njzu3bg6jj6rqos7xiuhdeqba7wxbnpzpdno51a6efzix3lm37qgd6a3k87dait5xe09i32z5xanqt5zizpvblgazpsy6ou6e8a5698bonjtrzhl6i7l7syxp9538m1wgvlrdo5m35zvqv68fbigzardmypgby557iwln6jvw83qrmh17vmb321kfzkai0jco878jqxjsbazjc4uaumdjev6j33rrkfx6mo3l0sxous94y3cizzv1nz11efqbjnybd2tt3o45i9ttbmw8puypjh2f5b3k1smdggrr23b6g656anqyp9kb3d1zduq3d8',
                parameterValue: 'k01xwuoq7hf0diuyikwkby1biunpuijxly87i8usg2pmkhwv9vx5ftl793pvccsaotlopiddg7lorrse3z88008buj1k4qm9jofa29ioq93pdk10njgohiy9tpavufanpef7l44w71fasxks00r7p52vu4nugw3utoh6v139rik8yen6y24vd80q887662iwzh6nqa1emafumqscxiwdbj5hea7cvs32zpfm5wbkchivhm5mcgbhk8kt3hqe8behzfsmzs0vxfakajvhh4jhforinlk3em3bqyaux5ld480n5bzy7zw00ydzbpqrycj2rvbyf40pdktfcdpnh52sjdqouzlae2milcds8h7b03jihg89dw2vhe3c5lgwnr9txcos94os9lfm6a78sgus1ekb6n2c9virb5vexu2hnurmad8fr4cde9tssf8afcstihvrw23isup054svg7ubdf8idhxhoi7s46mmhvz4emmdxipon52mu46o374g7rtl8ybo1766u019ktypxjdr5gurkpcjpab6vavltbtgpmxdsctqhj2czhz2yv50t0zvs7grh2t9l1ta4od8u8fcj2a2jflrmbx3qzjzjoj0wvn0skwzxsxqrhp1nu2ixgtp4j9vqip69ouxbbxcbuhzrepb0qmb15trhhfyde193jmpzsln5pmfyvk76n21kbm01nf4x7b0qri2ryjz379cfeonclla5935d38llgukqnbp2p1qg4r0fs9c2ra5388386ds4i5bx2fh26g0vl1rplza1lmajqbsoozewnmv60rtl5hp4agklb3xythxklr9e0w613ufhonv9tivcnbzdko1jum1tjymknh98tipen14r91huvl9oz7hglqaukkh28d41yjk9odwgo5onkkqzfs1ihq2if8lbua6uklcm4akqjaq2z1nk7nbhgvgjk3l3ie7xl95k5jma781poq9f274y4hp31e3trogqa6cll5q4qg5epg513bjh5wtyduq',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '7z4y4e2grv75943qz93b1llzc04vreqdjlg93nhj6z4vm0ka28',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'fdzw57eo5vkjcisbldzi',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: '4lg7uoa8q2zsgupax1jsg0oiixrvjb3w03nr1a9oc0m3vvhdspo472vka0kkzyhsmgfj02c1x9nv7f43sb35o49p4ez8n7revlggd17ershhfv7m2pxlp8j9hqcaq51xn0f9p6dtcvwbhmq1unsvsk2a3bf3q5yc',
                channelComponent: 'crax9sm0okfc9wk9b5zr9q208j4r2iv63xgf4g68t8a4tse2pv6ulvqv3a7kgfqfxbr6ks53d1c6elmta4fz6m97vsmg5uj5kyf80j02mpbi7h9hxcpoxfi06rg3qwhz5pcptdr1aanf72go0rn6jkhbk5uott23',
                channelName: 'kc3l518ea3bcf20mp2yltlu4vtbwtxqx5m1163qv55zie1ihu61y736ak15yqjeyxh2d6nur05vu1i72ow3z7dvggecdozdqvbvbnttgascm0mjzf1lfu26eu3ax52ko5tssggcclvw2j5889xbjtpz3s7h2z4xm',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '2e2s1xn68usb5z5z8xyj7awgval0s1wx5lfgklkxgy9j4d35entp9q5kpo62fw4mse3iscfyhgnqb16q7i6krc0p6d9xsdur7ia3nxhermsbiczpjjotpo0sdqwhi4x7dowyxc1noplleohuqb1u0qp86o2g3kiq',
                flowComponent: '0cacx3zyg7atkx8ao81217930iw6ak0n99psusdbd07tjpkn9fd148z82yx0eeuk9563ih5k6omwv3u3jrqh6woppjarc2ovo3ptoulps5ul90errk4hxjx5blp731komszxo4csfaa01jtj1s92ryz07ghcj4cg',
                flowInterfaceName: 'r2qpaywd7z8gfdfjvc4mai7xgtew24onlzv6azz0kedr38ixi7lwzgxsl94jsp37tcu2obc3yjgd9kszatwiborakvg2221z2q6n0tw5pitog6qrvqo7v61lpcvk6k7gfnmml5s0phfn59ebv7tu7jpcu8qv9aww',
                flowInterfaceNamespace: '7tvl04yafds7ry04trur4jh147o1zitwqszrr6zium1wekfs1g0dpxgibvpo0l5eryzrbptt29eom054zx4w1ba0jo53y2aantw6mu728abuyz7b4hza3crvmghfro2padh6rm3b5ge5w6nwro0tjtwtkfsd0fdfp',
                version: 'yjo9c9n2m18k6vyppoao',
                parameterGroup: '96i5nwpse5ou6pzksvhu725x7msb3miytjuujzfvh4lf9486i8m3weve1gucydtrsqxx080jnshyon3av5ttxrt436zf2r8u67ws8ru8gq6yxujg8fhqvcjkk2qqp7st3ek4f51j0vwvhzp69xs3es6x8bsgmf7bxo5pqxp4k6qw4kkljqad0zfi1r208v527gvrb9sfq55xsblu9c73o3e674anz6ntjjo360bqbxpyytm4anae6yp6b2y1d02',
                name: 'smyil1ay2uwh3j5tzwwodee36a84stun0k28tmtytlk63cmms1086uu9kee7xem2e4a7iiieqthm45j3gp2vl0eh3s9yom1u8lw5y39pj1xnly9hirb3ggcwr9ctp81u0pyd81v5cwt6ph0xsdssnfuizm8pa10v6n00hq39awvo236nmb5gvidtv3tazcvh7jp8ml1lgy4br5dz0h2lvqlmral1j9uszr6gwicy3kvrxyupk0l0lujshcetjqad5dgzktcgfdwvfatwdxl1zekhhyuiarb9fnvtqlo1r97irmzxj925im64709hfoy3',
                parameterName: 'ciom29jk9vst453gfld3qfhu5i6v486eaa8gf07hd1974s7r4bewhjspgtspb66jhqi0cewy16gc7zndo2ln0j7szmdg60am2xihwgt3j1mkj6p6u2go6o02luyznyz9h6zr89j6mc5mco7bvyff2juny0jb70b8ixnzq0i9vg9c8z0gnrki9ogue4q8r0cssdsmdirrmf3pg130o8xbsxrbicnf3y7bjeu2s056kkd2agg0xpdmhixc3vj2sp0578687jj346fg5yzi3vs56gfl64ruapod7rtadmb4h7daxrkpu8flnt8ofhkvs4ry',
                parameterValue: 'erzchpy4yygfrjtgs060dgudxywn5ovlfkq2woknlvi1tz8851f0m4k1iw8so699n74cqt21r4xwzjwn2m31ygxl7p8o515aj8nodjh73cag5wxd4oiged01yrnpw0y4gx08fhh58emdg5a0zxvy7m6apgsrmozwb6tc0w8vr2dajyx65jlgmcp4hkspe95f5dsz7hyxib2bju08getvp6cnlketjnj39zo0pq0k9g2sxlz1e1rhkywa0qfn8ththz176yxsupydet1s9ey0bh3bel3wdhr9ornb28fg0xypcyw7fr7uiwfsn32nz3dbpmmirbnoxb1jls3tm7gi5p1vkynucbrq4q4dg5jvligksb9a83qg06oy6n88bhpaiybccc0x20wyj8tzax1ys5yqdta8kif5v1octn3fif8ud7yunpyrv09q1lc1z9s2h8oqrloco76pkzcqmr5806ea9cbldej65hr89ikkpc1fyevx58uiurop2f7ej2uebmcdda2q1l1m895qdumtoax5me24kk5tk8jkj247mcqd9yliur6qm50dw62i77ifwb7wl8ztgs4723rn3u2bby0y7ys1ywt6gil6cfvhio70vsj8113gappq2qgpfqxryoby2y2viosrcjpx8pqsg67vl8ucxscy6mhc6qq6unnarubr0cywe2rhtlzfz8b8v8qlubv6qjy6639gjkeglamyvsi7gsc8bbnkqzjm655oz6k7g01tr6e4g9svplzfw9rcxaw84gppvsxy0ec38aj2cj4mtyaka8z1ah1l9roq3mz6xw9qg3dv9a2t8ba5v9efntawnp7q5bs4pguupwn7vrglsllnol3pw0vz81q6xxcdto0x1oqjshm8krlgd92e6dyuesek1k550saoy8vsfakssws1jhlrflrgmg2hy4e7nzpclwyni5rgtsq0l2qi4em4nhacosuf0d6y1to27vqow35fh38nfuj9ah3k5pxbysnr0k0zg2a7n9q3',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'a2wzsg6ma2jk9mch1ezxzyxh5nm5wj4am0dgqwke3vckwvrfr8',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'kxre180x5nkujzh7y35h',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'buuy8qe0ikllv5yov4y67xzbaixh32ja1mts8hzx99qgfxc0tianz6098shm6a4p8i18i7ws4rsh0go3xor9lylo5u0qxntu3za44ks4gw9miwj087uihdatk324hzgbvpeysjn574bl9yc5xk2v054gw5pkbadm',
                channelComponent: 'wbmcr2t7v18hj7u5gnt6gdqj76lbzjdqmrmlsc1umqnrjgps69k5su8n5g66pu2cg35u2xhfjt6whcww09chgilqqqz2r38yyebbh0732zwn75cp9hjgcxy3j85mvayczaxgnkmqzj4ttdm2na2o2avbpokdnjgw',
                channelName: 'jg9acanvhifd1quthk753p5psyjulroar8vqqqaz12b31jitaeb9dtgncc8wh25kereauu5nd680dout2shftxpb4wbg4np2kcptbfkb03u44ylsxjp34huz0n5ov2w0ajhlwt1wq7ma8kz4rsxp6fqzucvu4tck',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'a9p7t89qu3myan126hmn54ret3246n91obkoswcbv120hf74tvgsw4s4tci50d7kv77zuev8l70uvp9jyiu9hkvvirqa86383re4i1mh7yswdv029wazhtwoa6ceoopgl7fnttae3vfnmbcmen8ergwgvde2d9ot',
                flowComponent: 'fl63sg4yhjjevg75bk2vl2fkkj22g8fmw9dpw74hszwxpwmm344egwmbjptc8qtjtwy65rh2r316sinsffgdj4fkui6z42j45k68my50bxfddcqk35flgxc1eofb7dbuhow7rw2aa0v8yadcciigrep9857vfz80',
                flowInterfaceName: 'lb7r9tq663li2m3ezvd81qmx6n3lzoiyxuvvs0xbrnvrmr4m9dsen1psed8cgbedxsxj1fk514120w4c6kpuenwfyh4zrndb4mpv2l7mjuiidjvet8hxsu7wszsqle8obd4g2lzf2gb1lw8rf636up0crddowgzy',
                flowInterfaceNamespace: 'h6jg9kng8vdcbw4pfmp39zh2xuyblo7p5c2q35txjtdlsovhynbn4o3s4gkp3oren9ma9o2kmmrntffmybaezzk5hdu8i0vyqkv4db6wzzboqjn8m2mc673vj5myf9bvmkn2os6sh1iq3xf62edgpolosvg4o1b5',
                version: 'dl7yiqa9hklnir9du3i7m',
                parameterGroup: 'tnzmtz9oi4n3bb5yde02ifvk06k4p6bvfuo71zesxs8u8bj820cgrzthxaron7v8wegglyhxy1ej0ohlktao7rpxa8h3s53dj92ijqgfslf11abs5kr463zycvacrcy1i9fo6jm2nbedhhv44yvofhytru5c49s3ndik2hy4298kiublp3r5lzwi1z1tow6v6f214z57p2tzsbwp6ua9b3u0prmq146hjbzu2c31quh4zktbi3bzpjo15pme4dt',
                name: '6pw6l2wuqch4d3ki3825j2wot5zwngrxepmtomb6b8wrm1tv03c0tz6czlna78jzjsrqp03r4jikkxhvj20momvyvomc2ot0kschgm633qwuzaa6e8fv0rvblbaic2jzztpfloz3a5uzjj0veowo794i9dwih3vmo0bmihf7psof7rwlyp80xo9dclghh7f9znann0y946yo0bsjgvqqhmxjbnulmd0ltwofvrwjseaw3axy1xklmlce3fzc7pglskv2xbs0lr7v1jsmqrgn5vt09kie2j8e2rndeadeuzm5oln6vwo7jyvcgo1dedno',
                parameterName: 'mnmf5k11umuh7v8cndwm5tegmnyhpjpmml3zvqlltghhc3g87h6m6k9yvxpkii0k6zkivwts1ph82svebc3zd6zob17yvae0c08t79sxnyb09lwxx6u6es5bylxu1fip50a5bywtvum3sryqhyw538kki6fpk0oixjss5vufxq1sxrkij5qmzu4265nb48vlfca8c8po4gtiqx9y5fdahzpas7890degaxzzj77dcryfttsw8srkxtgrvuu313g11804xv9l5r9oaxbnz9njytybn0vck8qo5a3zpxu6wo42nati9ebcyzpbgvf0b5a5',
                parameterValue: 'hfz3l8r85lwp7m7g6uyt44ge7yr3o0w4jkc5a3ggfnhpvr59r6n0zyk03yzhx44x0hmslt81bhuabjcdpopxf5i61tsz9wjwue08rdee8ifbho98er1555mmv20jraeelot9f958gojhehhiesqdkfv0fuo89ignexizwejdsh05a43hm5qq76moz0od1kgeoip8tkd4xv9r9kz5u63tvjdo073vl3w8w2bp6svr4z7ghza3frimvr95ogcxy5rtjrodg09azde0dzos7gs05ekgaf2k1aky5mo0ojxsviv9lqrs1oob6hk08gr1mo7sbwfluopt1ot2grnzc0rg03o9utvejdevdrl73dyfoq3c2dy80xg2odfou0avbo8sn6fljd8hru6g2vldbdvp6wftaxagzeqk877mpg154v4xdbd7ci66ioochaukrkp4o3gutzmw9ljk4vibpzixw2h00s5pa8h7typa8s9bmtk9x7gdzi3mt9w1c84zee48dnzil331w4rpq073hnbleyhxkps0t4h8x6kzapjoigtctntbsgyl04h3pp6f37vxs8cecky7qezo95zxtkwcn89ze77it36r2f4wpgamm1q2m39mj6wdue71u61v454y9ih9yej3ljq4zlp4js2shpadtoin68x48qo1c5pevhrmt0ii7bh9tsh6y5wg7pord8faoj5jxbqaxrbl7c9cd04yykmh5x0zxssnfjn4yo1qx8fyf4r4jr98uurxuw33kw8avn4yk25eha1dlr5i73lqmul6ljwoyz65z9fvkr0pvnfg2gyhe5o8il19kdf89ad3wzweq2321ix0sxw5yhnyzq2k5lbcch6ye7ju1l9xagjkxssn89e3vv10ufatj6o6rcm89bbwlzv1nvdeal2npnkcptmwx6a3gqlrppy911wxs7voddbpkm44cbkwlo07wbckmi82ijd0ffhllahsi4nti6agnplsy49xr83fph61p5o0m2swa3dp8lod',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'o5dng2c8q9ki7xc3gfeq3hqhh60osyh1avxftyj2np2pfrst8v',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'hiub4ulcq2quy8wb4tdd',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'qoyh3euagdur3i4xp1njgl4o05yd2eyvbms4o0agptwhau9k1bb9ovwj4jl9cak1ll8dz6a8m71wdbi1o2gc9aj8kkoi7cn31ytajwhjuj93z74z1ai3zku25slur58jsf5r8rj1hproeaeby24w0onq3zwyj9g3',
                channelComponent: 'd3h9x2v5l5je03m0eiisk5qtznmj69ssr6olechvntm3vbdek1j1mj38upna4roncn28lziow5nt5t3z56onzqds2s8dczesr9021qgwctnsxui0rv75trtvq8v27a2rn753ihtk5w7u7r5ntnmh466nm8y6ilmz',
                channelName: 'w9irpfn65g54hewhlc41h2ter6kp3lx8eotsp140qu47w3ytz5s99y2ndfr02m6gg7ya7anjl8rob5vkgt9gx6f6842p7hl889c23ehqwkq9d60gbi7el9v93l02au0fcjuvooi9tapcwvr2zo2mnter3rfnfjzn',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'sbrvrx9k8jch4x8sja81wmu3sgyxca8118ixeg7x70bqa2s1zypjknzacha1kx74p47io0k8yh10s17zh9ax2nrgskj6jkmsuemb2wpeojowa9272guk8buqxtl48vn0j9say6dq9juozmdmypzmic7miwh9sesy',
                flowComponent: 'p4n2svqwf4y7dgecokiwjcvxo3u5p4icnzgv9bptpksu0n4efnsz097cu6kli51rta7p3ilyfumo65lylgrosisog2bwxn9gv3ochqh6kvw9zi828fash5zqa945o86l99povttt0bichqerronnslx8lw8idgvz',
                flowInterfaceName: '2igoyzikd097rwgvy9ktjp14mphf85pq50bwug30qubo64db32uygim4piv2jnbi41hdbfrvl6ifu0r2dhawlmf98uvai8w3tglhlalzns2gqfbkdn1eux7ly8uxg1dms34fz0hnlf3ijo41m4jzn8byax7xu393',
                flowInterfaceNamespace: 'elt68uykhlg8ooxdkdt3xmcb20q7qtkxymnzilgttj49w96solhcvhom2lm5h3szi3nohue8x1iptc8hiwwp4k51v4rzruhld6debmvilb31j5t3e1bxsqyiaefewnal5kmwhe0n57lcwtmtvgjd9d9c8ixcvw5p',
                version: 'sewybk2sh2qouvolz8nq',
                parameterGroup: 'y5sm6bti24sr3xf8ir9l2zmyf7ie92uwwfe19hd7650wcy4f2bpobz4qv7777o7dd2wtvraunrym04drcc1ivwyhike51ou43w2ozauy1muqnfp6ng6ttggaag5bbpx7sw60xl3nsae135df75hy55skerejtqirlw46gb2e45v89s08rdz016nkppff59c947tk3kq3w88w86uvtkk7irzglm617j7kpd9u50ai4lcsfwr06vigy674dl2biw75',
                name: 'lu5gusb2co17qb2copg3j9p78cickoc6ukpqmso249l7uyy5gcaz52baq7kzoe2ajx83ud2bjy2ex7se7iv2adl8ubjfd2v0qac8r8hcb5tw5mientd8779ajqaofucf38uux03qlx9w2uru359frp58iq3q54fwgwe1hcpa1d93fuwymc9dye13ynmjynqiz80ekmm29llop45dntdmgp1oqxzzu0wtket4h897a1f3jfrbzzs27nnoj6ccs153t8yyl2vsoy8mbisw11dhat5u3fyid129ld58auwruo8bmav5oxwejgt6s2em2xqm',
                parameterName: 'ayia8yrm1dbb1wjoxf2tuzj6jdahauw4nz6dfmr7eww4zscwbngi2uiqyiq9z44ihs6u4dd7i9zanbrc04t5s8i6p118y15evwxvxk3cgrdzps2or7j1p11i38rcw7csyvdlbmzp2u8eh8ujaftpkt0fu8w1vf1ywuo3ylnparlw4y75xcafd57uch7ikn3j7l3v9ntzlmvenv9wio0yhqknvsvi9z6sdgksnw2g79108yzhpmur1n62ijuilq9h7z6lp2g9e2ruht336engmys3so7jl1nw5nji1pzwro8k9fdv6dcgsinekvj21eho',
                parameterValue: 'rkv3cj756o106afkvhdnv36q62o4heulfplhnhaltb7ivs5x7lijd9vc2qvbxkthauyizx3ayd4ey78ct87yvybmnib1pxu8qbnqy0gx2911znj7m6at9ls7i586e8vbyj9mhngvjic6g2u1du73vny8k3xlpkpbydqmn4uc1y6zc463mpcyhluleyj0h4m8hfy0g8y1jkjhz2vfc8nm0dgi1xoix45smbiu6a2q7ux6tbzsak4q9nn3fl6zj3vsllqvpvk1u4yq8tnbxdw9taxqj2xt67j95fra4oiy8t0vrq5nuovu0k1ivv2v2567t4nk03o61186ip4no4gu7ug943hr47egfrs3hanngxidoeenhwjezsu16b74is3rvjxh6ve9nxr339dhqle7lnifsq4cnhf2kbrrxqgzqocs9eolr1lp8w0dft1cat7azef3jfb765qfk21co17es0tsq3pjqacgrzi75npc6d68d59xs900qr7e7z9dsz1qkdyodf99tw6axt34z1g55ftsqj3pq9vy8czwym3xtf8izdfufzrkv95lfgr05o0zt2ho9gx5io3m60s7uh5wzz66adgctozx04441wzuibo1knf2n95quu6za2yx5avk7jop6smj2s5jpdmkchdusgn5gnt2cyvuk75dmq90cqdc4toyzu2ivcoye9bz8n75du1y65lriszu2t8t2ct99q6ieftchcb4ng92nttrzhrw3e952nw5xttav30bb61k3kltpgerdzp6tirewbr1he6w5lj4dxs9l4zv70hq5wpjefkiryi6pj0plhrdtrelyaj65oyevs2tgq8qlw1e57zcoxy6mxv7zb2kcvubmpqy36cz1quapinkr5em0fmmm6jb1nk26141r47tk4fyx2il74pcixp6ub6twq6pel21zai7w72yaddxkoz9iozxidnnngiob3bys0dtz78cqtwr1e0esuzy3ex2wmmvuhmk51uylaj597y833xgrlfy',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'ghtr7z39nxebmdmxj84lt9wsgp5umi5u7fo7i6p31ofc2iwru0',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: '8ekiei0dks99858d6qwc',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: '6abgomdqx6jiu1urnrn8u4yhhpw7z7l5qnsvelc27i98dgszhw54gezufj7tr6pf90mfqyk26b28q96gy0jz2ljdc992m8fvx5126ur2k8bimychy5w7r7bul9ds3h5xbatxagfi7655lwlstqtfqead6xzj0sdf',
                channelComponent: '24kqwthlq8y3txu720ii225d26jhnrjm08z99vxyw8vqdqudky3mwg4v81hp5xplito3cv8yinf4bfkltwh6a8yhxl61fepo17mankk1x6td2mfhmbvgzplp83a6txwb73tbxjoo40jwrbwp31l6r4tdlqc5iprz',
                channelName: '9zgoj7a8b0j75c1i76ol427wxqdvlynmlvey1cwmdl7178t2zhvy4aqlyptimktb49nq3g4b4awgq3q01l1z5w5swt78rvx9gzjoqmw8mfa2necr05ba7nxpxfqhe9a87jwmbwzqd5a14dcw7uhgi82r6w8aj3ip',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: '1mkn4w8r3bw4ouu69b4w5jeno7s1f1p3etk7tfovrfacf3ayc5o35e5d1vs8cz1plpefxy8cd8ccm5dd5o4ruq05vo4edmczs10oaiqwd5m7dwbb0zoh9nw0mbld5z65n1g28dwtdjf6hfbqi386plmv07gob0s4',
                flowComponent: 'dlwnwcgzc00qec6l6jvbtjn6qsrytx9h8ep4rhn92njqch5bheozu5ujhpfsxoeyli8drus308gxqk2ug5t9051xaynednd86unfo8w1dhnlewqb5p32vquooetgw5eckhl6qtm8o33ks2f7shv32irw0h79inw1',
                flowInterfaceName: 'rls7xjusewrsc4z287atvchxvbzaf92rk41vlrwnss6thqz1s59umfm5jy7n3akgdyx1bbrib703htp6trbdp4z8otdt1w3fzt3hudvnidr1c4x4giashwem0t9ibho73fe01uaqid1krhtz8nstrrxoqj2hk6ov',
                flowInterfaceNamespace: 'f1ozzl5a58lb9i4mxekdnqjxu4awccdz7nwx26oujg6goqgp58synjsnifpsz949tipkty6fm4oxj2zzx0k783alxcecf25ttmte4c3yuslybnz3tqbeyxzqrkhz22z42j05zqs9xfkuj2ck4h0y5louk23ez4zb',
                version: '2xvx1lcu85ty7jpx0ygd',
                parameterGroup: '89z0zhlsll7e3ymv04a5c7eteha69o60xs3knftxjh8za1g7zzd1b0qqutszbm90cslmx272ixjcfx6c9zxv28udcffalu2tmqgkazlv3zimyaj0yk8y71841ndda8um83to8j4tj2u99dk5kchyhi9fcqghdfyuis6raji3tieyy5d7rb8u8r68l089pichej31fbfb9au61s7se9g41mc0nlkj62wvmj011chybbrp1texhf87azt53rdjhl8',
                name: 'y544eilkcoblhqa4nwamsue8lopn6552vjp3i27p7twac7hu1ra6xfymmln99i780pi9y49xw7w6q8xg5kt8d10to07wvq73eb2d9578k2i9mtn7evz3j29bdox0b3hd0unk5yy1o2hooklyccachgitnosvfi7hc2z64ce4eza63ndn7wlr5r2st2oarg63zgu4167p4qw1l5buay1ephds7s7wnmv3gn153kdbrso4yok0bh1jzza9c8xul9y1rwey1ykh8sakwkq1n8iswf8bcrdqk9pt2vwglh71uj1cn9atdsedo4yrvk03027rv',
                parameterName: 'jshdxth70zi4o60o6789jk50au4g8y2lzyjah7e94gxwlyyu3wq6dcyqgtu3se410olysgyfukjpnuall3oqkc104zsuuu78t66gusxeils65ns7hobbf64vryjqk30ehkd3jwcltrro808nimuj5ols14ffhr43rswykalepo3aku9sacxebq8borfnwgy7iz0ixyzxxb84egei7udahc121bibopuh3wg7lhqri2lbrhaqdnna0kdhczr6y0eia0d4a7kep1lb1srnoyghczmubhf1122jnhvu8yiy2wx7l2zlu0we1kvtgz9oekxf',
                parameterValue: '2a154q6jx9jp2se67kdgatixahov4p8dh7aw59kqp1z2v6ssivi1orrglprol7odq7j2foxknvkm9pub2fku4tzd22a9d1clgvdce9qm5vhf97lldlvic7sks2pjximotflllfxrjh1snoehfxljx5nekpod3lvcc4k5yy1ek4sgxuevk2cvak27l4rwjkh8h41iy8vw214oh2kd8p4dexw3djwj13qf7rfwtm19f74mwbpjtbmvapivje4hndjbk34v69cf00khxr98wpkfegocxqosmlydsf0i4jftkkvvrow3rzmzzlcfit7v90gnw8s1rxmst7htiyz5du8xnr6dsretqfdzuorptwl34rbq4qq9d58ntvio21cff31qweni6px6z6llh9yrrmdjeq7l0h3lhhacnesm5bbdcft1uihjenq4i4f26tuwvpyrcfvtswxl6dbdn9zo8kcickd9t8b8df9q0kxss6wp8wac5yx0l4yqtn2j46kjgog53ytciiss72omsiuxwze25c7tzt18sypauu61em9yh33p88elo32tjqj3uxitfx0r2n0de6wvmb9nmlz4vn3xx0ntyx3ebkobyvv7xgb1atch8cw037ab1h4qcnav2vnftec8au1p6jwtydy7su76v60z09l7a1bauak7u0wausq5hwwrxepot4pgj12nf1pd2gfr6ft8m9u9sehjvfd1yxshzcl8fges6ajyupewv5kgtz7i1ms8f6bb86g4j4jlc8543g1gaweg0w3wutuip1yoqupmv4wibuig2hermyo0rhhyeojec002nz2sdzeq1w02eehk4wbbhkm32lyyw9lb522fgcdpop1uq4p66afve7le9l1i96ixdei5j9x0et6vrx92p31apiphn5ujfde22bbb4ssjm8q02pzegmmbtpnethghpucfev76b6l6hpqtjlnsxke1i7bqxtaf28v34vn3zwh87axlc1mrvu4n5hk2hb7x9orh7z21qfv9',
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
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: '1fmqy39adppilcvgycq3x29hlt2tenvwnkhldthxolq8voldnj',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'n5tdzhkpmjhtmencjghx',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'yvc15h9ly1ior5m6cncyw0rz51ys3exlbp0t2yllit5vxe4wf6pi7m0n0qaqcpmwd67413lai9kzungcqcy43x89ms2z82hrw9n5agljvaglvuklsfjijcdm1n0te9m67x8owxv3r0owaeszqnkr9pjemsjief40',
                channelComponent: 'z2105im7s2ne7nwbw339v2d6apgk6in3ec0un5ba1kn47eawanemp2jwgbp7d6w55qrojvk0m1337ji3ddgwugvjtsxnro72hjmefem4cdtd5n9fjaak39bdc7laa0p5vy9hdu8j0owjwq7vtbb4c0ai1hdzo7ug',
                channelName: 'ysgyakyiainybt45a48yuq9tz2n2uulok5b2uv0a7ur524roj15r2ht9ovjjzat1blsqqf3h8jlqgha5rkr4mhwqjypkegza88e7n496huhqzujncr9isogafvk7zybqg970ki7u5pq5ijhtyk16no6oyq7sb24t',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 't4zitskpybg3wdumewt864qkzaqvfko1amiivxzdalzx107vof8xrgf5u4nxv02nsdm6q0320wtu5n7siet52buka2hx0cb3o7s7xe10oyxk15wua4c8ucd62iop81di2d4koj44dqdp3mldqt9nzh78glxrycfm',
                flowComponent: '0a6cg2vf9ow352moqwkseo6kd9f54vd8mcj5v3t2tbotqd8ep2l8gqdfbwixv0rrpcxef5858h24rnzodornjsnoq37dv5lhsyl0s83gua03f4c2nza7wpbc9hv1onip0mjqy4fngaruw6eikqjdjoz2847k29ve',
                flowInterfaceName: 'k6v0oz7aazw6l8y9y54s86a0zxkimcoi582vrhks1pzarmoj0pjo8043rfu8qlp1tt3voyjyttpv4qbwd0glaho1cx7rh6omhjv7fa4ry5skxcz5ad0p2ekr95ixzj609h97kty9l8wleylnj7r5suqp8libi8wc',
                flowInterfaceNamespace: '0ssul77x8exoi2k8n14t7r6qdtn16bmub7ve7e660yetn22cxmifoebi6crpjocwq4dfuecksoj7cyly6j8hczmvj7m9ortdpnma5folm6h2ehaa9egg7kruiqig5w2353luikg0gdquvzktl30p5e099nbgb68s',
                version: 'ajvehjf251c6jkaqfufk',
                parameterGroup: 'bddit3hfeyqb6v44o4afhhq8qydw2lmo7sxc4ujjn2bu16z2w0c89afsq2kwygb46mr1pocltf4g8woeqpzwfnqudp71uubz3phyxyjguvz0wx5zjjqys3toq9rfydp9aivl72fabqyl27k18pm4374pdf95dwzi1fi2fuh9w3qv0yxfklkp33lz0w0dgj8rn7hhl6ubwmmu6la33gzyjl3scjd98tavxxrwda8wxfbru1p5w2chc1pet2mnzvv',
                name: 's5zl73s4f8lfqqzvvgnh8m3wnz6k88cz44aw9ag8ydd2tgpr1zkm1reu0yzf7e941r67kik0jthzk6k79t13xy2wbhpaxq4a2i4nyaxe34pmex2opuxnzuo3m1c7dm0athyhw8mhin2opzfg4thm2o9k7n1cndegsfhs65o4z4hbmf8ms6b68901xr4tv0dtztsp8ndxk83bpfjt3qo3i7hxw3wrua5ztbnq0y9jwh5zgn3howi6acaobukqqb4g1wixszj21yf7rcxibxjmwd2vthocp357ts3m83sedw6tasaz8qb7zod0zlp5miso',
                parameterName: 'niob2xkup75wpb9xex3fi3kyul51z3wecqgvcm9lw2hun7bssfmnbj5kuchadatgschhfs9q09r3lcsvzfawpm7ocukeekj4g07gyby6n11foonyh9e3tyj1y5hx9bvnsm8iy7eapxwq6upcjrf2yes8qdr7zdwf3b4f0bb6kwnzfzmtzfhsxd5dpvyveem4h8riyuudc4vd5mltlh5jf5cop37htiqcea2e5v073j7gfnhzrdw40p35bztcwn7ovl11s35rrh6wz0fpu8124j4qb2zjq4apeuuxl17y7hl7jutivwxl3adswk6cs08v7',
                parameterValue: 'ybusu0agf27tvc8nlx9n1ca0ixj4bwq94wo5vox84bwhvgm7o14notjw2d8o9ixyt9z427xaxg6aaj7h36i1uswje13lycnyh27ozlqgtmp8kr3zx3yfyt9ytq1xw4a64bg40we2ddc9ausqks5xzx1yarjo0w41ou54mhz9cb1qexr0zxu9ezo1lihoxq70ao9k2fr7h3fqjspo5g3vsutoy1gg67gkgarjpt04wa0plndwpqs8j5as6vayx9wiapy79oxsqr7em6csyj1brfg0kbi8h9fn7n4mzwsfpqc5uy3i47qu7jaopeeje66y7i7z00xbi9zysvyb6vrxhdlz78yolx657rp0erzdogdtk8ofg21ikfoemp94zgwax71ltaik8ispwu9uk4zinb5c4chtc0ufnenvwwdkfzoews1mgixo31s9lebjq7i98kczi9b0iu54klr5m61qqxy5mboti65rzx4bmbbdfo76gw2exeofwa3tcwh8b50ly6it0ri0wiww0mnb05ul520dmgfizhnmvcrg25j3pay1isbf8hyb8lfj81j7dap7udoaowtpz61w0w75v89v0q0klcfoq140juvuetar4e9in8e2hy7ct9wboui7naa7rtp7vylhfif7hz1pb1yv0mi8c0j6omdv8biasocmdcdm2fenszlygi2pv20os7m3ox5gzlv6bv3n9bv24u80pul33v78c7jz0wv7ef17qaweelnbde1jwfjyh8onxi0tpxiwsoge780n96z7bftpaetf9y3sctpunzre23g29bhqt2ohzs9pef5kwdb26a84b7ojjlshmodxgtbvy4bamnl5cj5lc25b25dh92txv3bgsmp2hqok1idsqy5083o5bricgbgbs0o853staynrhks488x9f2eflcff6uwgjeaq04r6aj959a4rdlm8nycofivecl1fybh66a9zwm74a9si3ti1qn89zahsxnvve62neylmn2elmp5lncf7df6n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'epn0l3ml6f5heix9ibk9lkowhh21fed1nb6x5ef9lfjbda0x40',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'qtzs1ar0kaiu88kub86o',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'aesqkbumf14xsub28eqtvkzyypibynehwdy56rdvlwr1emzmejfmatkbpll5s0a718upuaazc8hv789e5x7i0ml649ghbbsssyfcw2542ypl18u32tgtqp9w0ahazqtfcx8cm8741cdbrsjecjkalt89yb8c4tu8',
                channelComponent: 'fm6erbc0gczku9mf1zny25jl7jovt0m0j1ue77y44gxfchbkoxcpeb64z807nrvfoe8zhypvsyi73v00uyl8it497vdtsuqd40uplbequoi4bxl3uomr1j6q1q5kh9kctnjkke5xkwuwhvwttfqslfp6g09xcf9k',
                channelName: 'dh5l6jfobhz8oo51lmovhllyzuvj69l6dmxyyr1koepzicecrvzed7y88i99bf26g0rk0xfr5s5bbv5eo3gucg2dsqkzqoztau7zsv4aqyeo98mta5pvz9iz2iu2p1g3eirrhok6c09167gtoyek8xb1xs3m2cj5',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'czxk7kykqjshkwb42bbzmvcq32c1j2l9uf34w8q616jm9v4bfryx84i1pbh8dwoatuipkt7htdatwnajzrygojujukdwfvk9f2dtqkninwqmpcawu7jh0s10xta7wvutm3wmx0xcvm0xuwlbxx6f9ejehrwrgyc1',
                flowComponent: '7ho2sjhzz7u4ciss72wmrrv9vej9450h7legqcwpee8h4tgixkoejrt3u9npyi9yxbi7zsvqp92h13n9lg5fghgmim42ecfsxl4iortab3su94urhchnl5t6grmz1fv9obt9p9oxn9uxhz5zazxpraqd4v26lv1w',
                flowInterfaceName: '8vx7x0umov82kru8azhjmrfvpobn7xktvvoo4yhysxi2p7beorizkrsv9rsan06tz1t1fn4f7wk11klh16etx8b2rhfgtjpc51df9onc28rezbf7mra5y0nmq24sh571k9qwck6z7p1683nvrwmdcgf3954xilje',
                flowInterfaceNamespace: 'tgyc4yks8dguxy4w2mvx00bepd14zuwiqekzwi3fnauwaz7439wu1ill1cqypucml2vt1tjzolb5bmjputkuku1r2lauhma8jebv3qwcpj6z5z7tx21px2jhc793ybpu9j39btl4avuz5mga9kgs0ir01bin7asd',
                version: '909rnv471z1darbyq86w',
                parameterGroup: 'nbt1xv8eyn02ny87ppmlm1i01wdlnwqsfeg8bxl7cx6ivcbbr7awytmuxpcvcustou6gb0x7t2korbj8iumfpz5gw2nkipua1hih428cscolw6um7x5sdmfcxkgcsmjlc6q21eflk9oqg86mn6pe0dsvhgjekh70umntqfq838vhnoy7wjqy0whr8rw4d42yeidgzn30t46vw6t2dqijqeyvayybaxm1ytcyo2tkf606yobwt9mjwaktwcwi1mf',
                name: 'sxrmf3gqo8yg97wdjyzv4xrsrzvlpyf3gxy1m2qnbao1l05sqgxdsppuwqjy6duydy247glzy4oymna1489zlp2y78qns2s9fcy0ddkncouvnkz3j0p6ugbxle2supl4xu83gnkg3wd7rv09v73hl5xvx3n5d5rmowiaffj141s5rfakuy8jrww3hvwuv4ihq1rpskbkyimsc3ojp7rr2wd05mptcgozuya9bxdtraqdsbu654jhiidxr6dbtqgornkyv5r30jps7w9e6fnlp7o5nwztw56gtdq6p25jh5tjh3716ve8haso8eq268r1',
                parameterName: 'hd34shx2ciz1em37pc6r8jx5zcy05bsveat6kgql8loitx3lvdhy2o0w6rycbjieh5j1znqinqko2g1m21dfshmm9ys7xv8zujnzegf4s7spgv4w7o4qum6x805z9155tb3fap8958fi0uxr7u8oddmoctxan160ljy2p1j7pgjhdyyjcnenpnelt5gjbkpq4p6eizzzys849vfuek56sfd7xo1nz7aq7xfey6l25i24g6f5mleroppmriold8e0p4n1q2r3xbzb68zavwjrucf2hzan9dmbv333qa39zp9nr60n3guzt0k5mjonv81r',
                parameterValue: 'ildwy0ebshz57hivrx945xp7ted4c9bc55r7wtci7808kgm1zm9p6fgk6mrs07u6snibis47nwp13l1lnskjopwlekhuii3v94jcpzcv1kxbtiqsdbghzzbq62zjsjownplf2pra2yme8e9dknnmf19px57ec35bvkk1hobo1knsepj5gybjzsd3vh5e08f11gtadkqp05uus57jl8vwyruebbz171bq9fggyivaouj0zducreth6hqppb0rirn9g5kz5o7bdosbmeec5y2de6ivr3h7qbz90mkjkmjht19ms91s91bn4618jr9a0dwcqk1d6h6x0wx3mwmb22hz6jgga7vze2zf4dci7fxjn7kczw6bju13npad96m6r0fdfejbe1phx2jvvjxp11sipnx1mcm0a0jqbsp62cqrmpbu35tv3ul88y3i9d4zfwjsuhunihjadtxvg68uk0fqob2bjihf6l8iy1ko3c0hu6jyigqge0qfusfvqqbzlgte35u214slblipbe286leproz51lldhtcepdsr7f7b67fxaiph31m1i4adsttjlgym4qx0fjhxbor7ek2i3frl1htj53xl4zprl0z4kfelkiam768x7y64r77u8cvgq0kklok0jqaabk8skffyfs2evdi6kzm14idd5lwbr8sf9tun9ptj627z1kr1hhj3as36oz0vtn1brucgxeab2pk163xpm546xaa9434xztn9d1evmpid3pmaavzfj3o7nm25tz1pwm4tahfcx2ng1wjfehcw2tezjihjaeh84sjs6ofh17763sqkskfzmz00w27f3jeot9atj3yqetojsvp55gv82tyv93renlbmbkmyw6hwdlmr3dq5rrp56hezr7ui06uv2e1et6gqgmjk0mkb402860ty5s7s8nlgtwyoam3u95c4vyfxo0et4zvfez2zhf9fgepqalxz7jpbggedabnwdrobyriarg60fb1vtbivnueu2k9qf8oz6k1krf019',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'i0owqt4kinx4fkqy64b1vz0li9jt9qafqnwefzz3ev7suikv15',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'zcuhcxgw2gsupdsoox7f',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'xpgh3ph7l4rqtcu1jx5bxqh20o39hnfq1ezssrnvfjovzkmqhze9j2xlny0i2lfp6bwbw4teffoeqdgvb9ybjp0dv7hxqrdmw9vdta8lzog7wpnku0sebu1ibhntsahyuz3zqp2egbvdr5cr4fgtkqh8cewrk96k',
                channelComponent: '1v1ug7f7pni8lw2qxvtp89faet474l16yto4qnnv1l9vk7ixn8gfhkltt633fjo5y86xri6gusbm8hkkem9ybrfb6e5amn12qffrhsuaxr76ap3hllizdk9ydmrne0ia3gbe5zz3qbwjhfvp1r784mszppbm6b6m',
                channelName: 'jo1fo6kun0cghzpqwgt9yhjz7iz4yh9edveog1o7rq9liuuzkf14z43jqq30ugyp81fs4gasdjuysmqa4hmv7uuah65ur0tdc1efrhri0ryqh9wps5tiuaoobyn6w6qsj4tfutnuh1ym2s6kmumckuwbeq1xvxnk',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'izewpamfpncbf77isstjoca7qlfz9x09w7a6ce8wopjn3iq1tdndt83bzfd4k6w9464wm2pe2uzh3i7w1nrrwe4dbiwkpt6fpo9nnultg5zs8mccmbgx7ae2w22yediwljkiug8393p2ofgcq8gdl5akxez1p2z6',
                flowComponent: 'ng7ermirxfs1dgnrevt8yiaxlnce5t5u7r1qmic9k68ayz6n85zdfwg6ys66lm2an4kjwvsf1yzhqpaureaxtppn4lg27h49p7gfcyy8qqlq6zwntsqu5vm893oke57tm8aja6yco1kp5e0jvrrba8bdfpalvi42',
                flowInterfaceName: '9beci6c7jl2ua1jw63rv0if0dx9h5oczhn4fpsk1j7t5safn0i52y9df1sz8jj0kiva1ki7y7xx0lfazmz0obutqqd3y3dg64p0vamp4kbl6bct6zwpqrbw14kedcj820rzk1kz4od94ttgld851qqb8lqz349qm',
                flowInterfaceNamespace: 'qe65jsonznj2ov2bzw86e5af6m84cssl426yma742mitqhd8rqgt1yn6lfjmk63rtr2g8aqzi50qan4cnxg8r3zz1ffryzegtltfjgvgj9hzx8t95hdkncs35wah9vv5obxf73voz7svdht3f31tra9x2erp7n8d',
                version: 'mr78c6zjud6wmur52uql',
                parameterGroup: '5hrafqkm128jzehjtne0auqp4933kiss751irrt4u46srhdw19vtv2o1j5uwnsg1wkmz2iokm1zb0ur2axf5qkfv450jd1zad1vax1b2d38ws4chrz5fxhrd9mi2qgmrlfkoefkyhmiqadoqqg47lshl2a8xa6r334msx6yesx2w7p39rhohiwagt15pl3eljvn7eo3r26xmb0w7enmua0c8dlqhc6uyccpsvnfmybp3hkok3roftk0866tmng6',
                name: 'ib9vgbx65zqkn46v7r68lbl57oht2cmiv2wnnrbh7sgjnetz5e2xp4vkl7x8f9j3728vupkxq9cuujrw60nq7xckr8yfrnbb8eugi9i2y2n9wwj2542pegjv11dio4yu4d894obub9eyain6hgg4ujemofhtk0thrgqs8vr7b01gdqku8n36pd1vgzmz6rx74jtj17mjj0naysje29n0b4oh91q3u316urtpx0fgt5ebzuj2uhupawn5g5xile4u7jmnxlcwava0xgu8ho41bglp5n9bl2oq0iwx3a9e0os3cqdip2uzq64eovfvzugv',
                parameterName: 'ochwsv2is4yg70yrnsvf0jm31nviavd7i8dx9oi1ipne2dkkx4p03adwrxrxupt2ysb3pogffo0qtue7g3cc4vf88c96g2i42bq5zdd8yeem4w8udtchdeca4uq91h31mjddc2iqi3voi28bklao6zi19zeat99kldzaz55mh3l706r1goaxczank8479h3c6e72jwb8cpoj3fequ4wpsf2qqvbpdr9ydgj7x9kc34lct415jy90dqy1v6d6hhj60l5q6gn23hlpszqqqrkwncong86b9amz5zpymil2wawpovnk6hgmd0ymh04qh7jb',
                parameterValue: 'htrzokhym7pbamv37mp4nmtigrnobd6f0zlp1n1ug6rcbp8emb873raotqteuejum3hvjscd44u95uchfryozlon1a58gkeukk34m4erfk8u8zmr2hq9wufgkljrop3snz23h7nb36al9xo35swqcyxytfxnkze3vtmryzek8p2vxwl95flyx2aqouoat7gq53vz738r2ozlv9l6njw7jbz86j7zgy5atwyzmscgzcrg5lx5v5rxv22qu92r8d4byfj5174vzsj0wpruc9n4qvd3f1szteirykvi504zbqfhj0bwvxrzy57t5ikrvwcneh74ewqinnx6jerfp1k84er1nujv7xckhyhcvnv7gr5etooaodl6fieeepsnnwa1chf4hjla9t61b4wnfq4xusa6qqx2mrwfemodlfvwst40t62b61q59h63vmeclwgu2e1hzk0pm1czsz24qgj3vmkbcubpqpyaqstjo9ae6gworf0o4lficbtlimrahmbgx16sqih3f3zkfps2r6yi9huv9hkj7t1nusb8gpamduw4yhp4ou5bixekqtuyfaqrjy9vw1szn00gys8l8b9xxv9t7neij3nqw99djw775uh1w0bwgfukv6ihjh0hqkcipd2o56528u9wn80jso8qanbhgg5djnq1pwnv0a9prhcrw4hd0en511rdylbiljzma487m6acctsd2v2ry5ein25d2wwamcl6za19rmxi74zy9h5pmyspfr6gvi8c1iyn5ifottk4710nb0oustli33zsyyv5gyyqg5mmayp72h8ppni1plnmf86sud8km2xnk9vyegw10i5epfwzmf427o83z00lzq2vj2zko389110aic0u3fwahm3u8mvwbucuy27s49bpcrrqsb9q8vwv8dr3x0k9gp8hfb5zbm5odo55w30wcn7asovw6vxhc77vfuzufoe0febawnqrmifrrptn2y2uunvrid5xdfqgp8t5t2gu6y9j0xdgzvc62gu0',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/d5f22bbe-d1a2-4df5-84cd-5544ae6aad73')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'));
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
                
                id: '23fb195e-7f54-4dfe-9c84-96a862c2aea5',
                tenantId: '31c64e52-0f42-400b-9342-eebf985b6f9d',
                tenantCode: 'hv8llt8q3mrdm71ly2cgg7h2ekcxxmuagkk81mda778mr1a5bw',
                systemId: '48c26cc6-d1a4-4045-b5c3-27b911b290c6',
                systemName: 'hkpakxjaijx1hdcct9uo',
                channelId: '63ebba2c-35b2-40e4-b647-c32121b94d8a',
                channelParty: 'oopm9sbqx7y0v4xx8ktkpdcmsre08bmdmnulnui3gy3zdwp8ishkwmbiqgb9mo2rcrd37ydf1e5mxpd1kl3vg7g2fvofh3libsers16nugbq6ctvbafy5zyds93y3h01pdt2gxq8sy1lg7pe2wimv43brmnuc5qw',
                channelComponent: 'vr8k1is5982cj3929usp5zmi3037ombaezp4n0xd54inzu8mlafvh4wodlzka0a7zn46x91386o26wo8r0yn13ognlnhqtbbej7o4xvz5k76cfumuqd2xozta8ne6qcsem08gxwo3rlrlzt2zfci4ijfw2ki9t56',
                channelName: 's2zv32xisss50lu5bgaqs7iugujqx5z4are6y90uefz8lo2z514pa6drlrqwf52f8avzhfie1km1d532pj2ltdu55iriy29xkel30jxhk7yh0xh5ibru90t16kd5ytubdag9w41l4vjwz9oczgxksjxvwteoljdi',
                flowId: '123bc597-a49d-4684-af13-4bcf4ee279b4',
                flowParty: 'z7yzrv5eok3maphoj53fwma3abc53jyv1l2qpnn66fcmxfzafftimdqiroqktck16jmhlezb5zgnpl81f3fwf9iy0bicj8wau0ax5oryxjh3grfmfsclru7tm1ckimkoa7g5ty1s1gelnic7vj27kjiuf9rycp82',
                flowComponent: 'vbb9wqsrevwp75lrwb396cb91l4sqzzmoi9g9nkeh7wmkl9ptokpq450jhlr3rq4mt2w23t5b16yyhlmxj0lszmfjyau95yjyfvw1jwk8h3d5f817g9kmq4i4q48zgsnxwjdunsv6wab1nxvkngjmrrc5fh319wd',
                flowInterfaceName: '0vlic7zdkuce2aw2ehhp6xsfjd6enzbuidgork3ojdgs4th3iv8x8y2wfenoklaqi3yq1o05b06l3d8qo0umwm8rqz3cr1ggleidzlslq7ts5rjeg5dwtf67dehny67k7gizybdud9us1xfgau5uhcqopvkwasx1',
                flowInterfaceNamespace: 'nvtqte4enknt4gewgqgs7g5ejtvlnetk5ppu6xpf4aurl16wpcb2mdvozsepgbagckcs655eq8wuyk17uha4chrda1kdni5ptd0ey0qfyqrjln8rbvlqseefruwyojlwqcbaw1iyspa0cbz3j2wudwsj6j8ppun6',
                version: 'kpdiy0puil1pl1lvxn9d',
                parameterGroup: 'yrbg9k1bykzppdwxoc0ix2jlu4lfirwu4ow7af8ihy7qwmzjn7np1ektrnwkm2yvvm9xl9hwgoxfcdr7wfo7cetjwtsgob96btn95sl56l909qch8oknacpxvm3uf8s5ewshbjk4kg1x4y9m4bazvtr2ya2y3wo93er7laba98vihb89sue6ct2o9hchpgbug0yh2lvpn2hznrlxnb68rhm2qlhoykjbk492jj89qhf617hqoia7cztpiltlbh6',
                name: 'o1aszc1osryr78aidyuxs1mp4pwqdu4e5yu50340hes69wdo0tjtsjv0lxkb6pgwpvcxezcg4h9gjwc8gmwtu9v5sfdj1n5r965dyr07y0yswqe3ft8vyhyys2wt0875q5n85gpki33oaro2qacrhhqht4xy718hndjyhb8mb7z8xbmaa87xrbjxsgquzaqzbbl0h072gxyj4hbves39hk538f1ujqrw1lg0pcx3y57arg2qbq9ubs5zho1ppo72v70az694bibj466hr9maisa1ctsibzrlsl6fuiesnfrql2miyxp829p45cjwqq1g',
                parameterName: 'ml0tuk56fgcvbuca3vp2tknn2208cbnvnrepaitiqca2rye0azxjkl1wakksoyvcauzg8003lwz3ozy47plx0ehkgiglx0ttbphf9eh62torh0ivkt0spxtocauqt0foqkhejag1jbwyx882khswe5lzf9w4zhbvcg3w2mtey659nb00z6owfamnz3q9op5zzkvevkf03wdz0b75b43aagm2e3jpw2juabb923zf5yy88k2cpmybvabubfc4qbk0grf0tyssrhfuk03uj6pumqo5t1t84rdc8zf32lqyyo17799nwu38hay97k9tzufc',
                parameterValue: 'btm5zjluazi8cas9i79ggpgeto1mdv2040q863ixlgak779tjmnpjhke3ddsj9gdkg6fqmhgi2rpirdezj28qwdhi4icnlwas8gz2zx5ejwlima6mm3stsrj74dncwrvo5cdqzg8xgz8odjwkvf54kgvhnovch9xcbfe6g3zmkmvzlc4oky51sq1pce5jfprru0e1qm6xybcbdueyz0b3pae4ewhpm0qsljscqlx402or9w7xir4mj7x85oxdd9vrwfen2zvng9w5yex5htqm8iu5b18lycisy4beruwa5cjmao7g5z9oepuwquhgx00zpfkymt4x75infa4v6uk4ew01dtlmtpnfopvbu21983u494xv2uvd2u2tpm48jsekqquugxm6qxs7s745rjpfx0osop3rnvsodrfd2kbam6xfrv6yhwrvtz6434a5l557egojchwoqoecowqjqdh812874tslu3bjg3wvon33lgxa69j4bs6ktcdxyp1fmh54pqgpsxkuj7cdd195lhb1wb1zss4knqkhdspix5ibawzsi3kmgvphjlchbabiofa1nsxfz414p1hkhcpf5egqg6d30c8lrc237hrcpqd9go7t986eu8iuxpzom2hup5eztny8uosrnshj09zgz0mrep4ekl945ztqioz8r0y1hnho6wrjokjflrx226vvdqmablm1np6lctfv95wzmlo38g9gc1dwq5srykc8wlf41h0svuf7yh90lkpyodbs70rgv7moskn7a20eq8ih9btqzcy09sl2x18iqnfoluqpnthmxvekljguip5lls27bka603x6lz3bl9bl87n7yyn1j2jar1pdonqy6u8jsf63oxmclmc0z079axhdc232sul8gbjbzfgax209j821xmjhpzmwbhy3blx0xh01qqjcjkr94xc5oi5iwvlaipy3qa1xp2g57gutics4x46zk2xmg26yi5xzl32k30rbpk2bhvgyveh946ohrab156ed24f',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                tenantCode: 'u55zyp4zdkr95lq2n0shg5nfcuj5p3t8jlbsjpyy7h23sdjsfo',
                systemId: '64f1392b-8c73-4389-a675-00b624624448',
                systemName: 'souni7v2hw1dv5kw0mpy',
                channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                channelParty: 'i74tw09tddmnvtj9ttbrov4tdpbb5ukzd4zbxhwvlon6sqwla1bm1jl3ror6b5sd18d1svr8upfyo12j51wbl2mdbqvchtlblvo30rq695sctsfikdaq9f928ri1xcpgf6i1x7nnq27391012481rdhb0wy51ewx',
                channelComponent: 'imsap48bw0zb915n558n1uuz11u927v0xtb946gr3uek9qk98ddk7w8x082cea5y7sdltdy3a7vcoacon8d9hi5jto1d77ixn102sk36cqheh1otbffkul28gz6953xtkrqai5568dg0knzrdg7968vfgvicbxmc',
                channelName: '7e8wuqvkjcrijlzwch6v2ydkuqzcirp2vpelwog2he6nkrtionfhxpvswzy5c54k2bcacz4evac5woh7h1l4gm4fdf9nwzs9deo2neaju6cks1i9i53an18mahwd3hcwtnbm2obj093wf5qpcbwjj3n5igu8zphx',
                flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                flowParty: 'v58rdk5xezvqwmowyp8b8bhe8y04qz99cdjw05hhxb4348dpg3p0b4xpaar8ywtl2tprqvj8i9ihox6bhvwwv593b3fu988s8fcppxosple26h9spj1evidcwrcl1xfx5ivty5vnamd39v6cje5kdb7ca864nik6',
                flowComponent: '1io6ofcfs0wi6lstcbhszf3jwwt5g3hr90ab59quzztdhligtc5q48uprl7yv6b7nx9ro355hienkoclkkuhaeiux5zhehqs2tvgoo7i7tpk3n2j88fi14bntcybt70fq1ic9y96b8ysp19ycl13dzko7si6hbbg',
                flowInterfaceName: '2t1vkoj0vhjwi1qc8hqbn54hqtns92di0jsxorx4uqs0oe5cadurihmb5o877rudvcch60yxr03brysya9n0iye73x6ymqmg7j9nycog02uzom3an1exybllf9qc72uce04eztc49lxh8s9w4fsqd1rqgf4elk3a',
                flowInterfaceNamespace: '5klhib9w9ve7tdamxsaoirlvm6r8bfmf6vdkrw5enyan9v5n79pusgya1eb5xdq7qs6zkmvkodq0bmdvok397t19cscjsta8rb6aq6teylgpxoxy0voxcd4rkven26rqosbd004u0ztjtey6xmhhtiy7gk545rtb',
                version: 'c7s8mny33stie55mkz6l',
                parameterGroup: 'i51hx9g848dsbx2v6aaa4ws7xgt9c7jl21w6an687g3ht6lvwgfiwalruhuacofg2mvybk1vv2r0ggt5c6zv58ncffgzxby1rdzsueh7hwpnc6vvdfbuc1pd39rgjed1rjao8mqh4hbv46j9daph6dc64gukl1qiari3pk8vkmfyg9364faw6aj0j30vcsj69d9tls41d5uc6w760rxe6r5kl8lavafyc5b0x4ko1mfqrgzwqujd5krhs58l17i',
                name: 'g393qcqzkec6ugb8rlnv9lm9apf0ma4lp7675rh3pzobbgtiicla4n9g1aq58gjnone3s7e60726tmw74ojwp41tgjt6pne74zs94bsg9hhwbvr8org5ucal5ncxswj1qt72hpittre80l1oggyxulnowkpoih054s22thfbfho3u7vpi3s76xdncsaizlsgkvnts26qn4c5cpike7wiwzfybm4xokewpxc777761qsv6s5m5sx096zgusxrp9ihudznarffwypdk94q62z998ndjtihva177cl8gnhxme1jakbe8jtbgv67nyt4q107',
                parameterName: '4e7yaxagtrtnbfxayncw4g6nui4xzjn9av47f6dynpodegz9i75ho0t9u9tlug56m6f5nbgdhcm943bnvz75z92vrelexid258c3up3w0mwnqclw4j7t1vxhvyw0nxe1w6pz2r6qyx2a0084kk2imjtzy9ewrdfjr6mbvqaouadx0qti0f8nx8zva8ck4oytonz1ry681hvl8q49q3v8cu97glqmlgi5lg8q4mgwwb0f4r4we3knfzrda0bblvr6v3g48qo4up84ogkfg21ubr11caoamcwabr1xobtxw3a20ip9r8gtmzfv4khi3zen',
                parameterValue: '807husriyfrccr15x7gtetx4degb3x99sl2epaul2de0jidwyc212b9z69tagrtmdm03tkifl05zwu2mqepv6gnofxkzc019j22e4bbr1hh0wlasteaboqt301k4r8bbejmufg35tmexa6evblrueexqxt9lag5x4vahcihv1k786vofz4kyh1o0yxi90gd6kpk1jore42o3v8618dabagi8f4v37kgzuindprr3exl3ffc0c6ekecko3qveldq6ellgpqw7oh0jdjjvc4eaiiw4yjrmi4n6urqspi5hk3zv4nk9yxfbzxup3lrk9s1saulko91phitl7442uzeeiq767bodzentuxuchunefb7v2slt5ffqe40tk7fni2vxovon61ww9plkbzsh3yb9a5q0q58o87j0io0wozec5wobe3uc4sf9mqnvvan7z7pq7rh3u2kd5b0jrfz6p026mnrjvwyd7piwtp05j4c5skok375i4p0rlghc6iis3uenn4nhmzh4f3wjson2546vgk3n6pagvunqj2azuotydugbnu1soctcmguoplvf0866weq2bvtofj9f81p0n9bxm7svv2g013y3jpvol3eqqfcysp2941wnj8un3ns4tpe9hts6p5rlppb90cl39b14vlhdce6rmz44udh3sps77nm8j9xck6mk7gs9ctppju4y0vcyguvggbc2vwhaqs9y4u80mb3e24l8ntamw5f29ql4cawtq7b7dug6rd01osm6a8b19pxsctfzdqt577w694p0htn8exc23aozm28dkxx3mjz2dxrvv0ry401real5356e1cmu13lgmasmgnn5tymt8risz2hxbx4rjlvsv35jqu6452j8slsh3pek3whzb8uhb3nx9peh7moo2gcr83i7g6kzu5ikulxb67v8659c9c1ofxfa3ofvkqqra2klbxv4jpk46ga6980hdjr18rxay8jsigka1ncq6kkqa2pww8i2lt56oartypbagzbx',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/d5f22bbe-d1a2-4df5-84cd-5544ae6aad73')
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                        id: '9f2eaf0b-f208-46fc-95a6-0854e448ac06',
                        tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                        tenantCode: '7q80bfecywsu7fcgp08diez20bwg7uoxegut1xyx3dygwlqtf1',
                        systemId: '64f1392b-8c73-4389-a675-00b624624448',
                        systemName: 'l4xzpnn8fvn93z4bih52',
                        channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                        channelParty: 'yikd2zbg2unbvxw6wtmr80sek08xs4eae5mr5h8s6n7hcne8ysc5rdv5bw2lcyq9u457ces5cjn8n635jw9wokz2by375spjrfrlx6z80geytrlg3bh1ui3d48qee1qrqma182srgx44xeyqpnarr164ed7rwhso',
                        channelComponent: 'gq6108plucz88uyjph6f50n23gghos98yqbmvnk6jxiqszqtwsieuorpp5upfgsmyqgj65i8mv8w2gruqegbiiirxmxrdecihql07q6g037f5w2pkpaj23lj80zkekiyqxlsy8xspeglb2wc9hd637yv9fck8szz',
                        channelName: 'g4h0z43ayccznbfxz5ltkctezcy3tk2h5iarm457zac5ktfodmmxsup1e3nrxbm16trel1zvt5z037stdk4kgdgn02q3afq8ewbj0n7h767x93s0t024n9exccjo2fyby78vju9crmv5g4d1nonglaycnxzwa4pj',
                        flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                        flowParty: 'xt9phstmvffid875ajgvekefxccwqnko2jt227vmn4ilbc20gwgz37feaddbth9onr8b73aaul8ucfmj9ml13cgyh9oyo4du19reo5e25b714costjfdrg242ebarunr11yr1yt727xha7f4f1a3qpjunczlnsqr',
                        flowComponent: '40gembsq1gx7q5yvvr9myfh2adcjl3j8lhp4rhvxvkjaulbn4vs0hx6ehb3tmn9z4tur78r9psbveo16xtnnhq8ybjba2zos1g2loy3fd8t77n389o3t04b8774p0f28khigk9d6svave9aoqtie1mmofoihn2hi',
                        flowInterfaceName: 'n6it2oxs66unhk2jv48gealavmnv37ri1nvjk8v0fmq5eluzddl1126j12ci6633b5i3bx3epljqhyu5i64ev4rgdf3ysm2wioh6jsqc4mjhjekpppcs7qv28qmagx0soyzuir82m4zgv8xg8c3pv842im4fc64b',
                        flowInterfaceNamespace: 'cl26l3kqln5as4zufqzty21sycptzocfyg0xcmh0t60e4pgp3a16fzii7dlsb2gyon9482r3p1hk9jnt3qh3lotplzar6huvk08yom5uy4lxmf8qlx60vb6ntozzo4jooaw25kc0s8gj6opddbi8tyuqs683gwvx',
                        version: '6ouw00v6dxtuvmi0gs1n',
                        parameterGroup: '7xjxnng15js27z7on8991bdhfmtsp4s8usx07mvsxxuwhanqs8byat2qhgtygonb3znc9ur2vft1u1t06jsycl7tidfn8xjucvwr3e9ct9nopk4y4r3mey1l6ky4algn9r2iywvepdcw0xqdieymt1mm7h9lxdkqu0hqq6kz7ce4h8tre7s0inwytzs4wsndm63vhs21qxsu9t0ixz84he2zhhejwkuc7uw2a0tfmcmrm1rvaf55nlk5xlgzrjo',
                        name: 'jyaynx4m47ek1kujtlhl33baxj2owcvbx27q8e8wphdwzzdhsg03et3qz017v0as8covz2dtp08hwvxfj3uacsxbjwteblvwpf1aey1uf6a5rov4pkni166wvcqsxtvlbwkt5cxidioi48fj9pc01fqeq8xucub3khd68xurs2qptwt0mecxuot1c9wtbnknm8xbgx7qqrnd20d2r93up45bbuv1izxjibvann1lwj8t383pt9omvlvba4y54vlo1a83h3pyc6aust4q09g1n0exy0rko9gaq217fia38t38s61970go33pp23htnu4w',
                        parameterName: '8m2tltzeylzywb5cbofbtjoiuyif7ptp2qobqp3jlxq4cnh5yjs75nofcsl7kbjy0uyi5cx1qbnbz3vxo44gpgpvn15osvlf1d2k6c6ytgdxxl0lqpcuuc1nkrvtqjolc052m6sytaz0d929h2pje2stgcbn1254mbpqe0bqt3xidgaagugnwq3wizm1a0ox4p561wg2tn6vg87w1cfeyzq4oc4fde9lru7o7cqfj7955sj7qu58v2ty00t0arepu31my1uusz08m7atxtpir8bhiolw3kb3kmf386e6qvnd5r00r8i1egnt6fhu11gb',
                        parameterValue: 'hca75eyh9guzfzw6bs00ab52d5cm7khrs5120q5j751zdg1g8t8bbpxvixx1l1bwx1pxbz7jjpipzc2vq5jlqfjk5ogts7bpp335xf9gflxg1lkyfanz065csbi5p02m4b101f9d0x6h3qoc9akbjnt2lv4xaxefwpm7w9kuicv4q05qdhw56y83di1xoj414gxrbp9ufodth0ovn2xfy5rsjd46iicy8vxn9y5nkzaio767brs78p17844wwlsw6fyt746ydloje0ooixd416s1ks8mstcesss32tu9swnnz0lm0wb9zdkg5ee4we1br71ywehgwhbz7ecwcl2olje4r30c5mya307u6bqzmwsds3r8qpa8qazezsr5d6eytuezrbism3yxlf2f1wfgk9u9s6nzhi3hxhbhzi4r4rezxngl2072bij2u57o7i3p1amjnlf12vuumz62e3yptr6lxmhztql7lnsl0ypb70lqjb5zhgb385byatdy99tw4uiwcc9c8sbs4ztphg74w1hy1u60uueemk6xgqi9le08ku2gz53svba5h2faw9ygdxmd0vboyfd9tgcrvfqv0cpo86e2wku1ps9whnedvnhinr7msycg1sm6rfui6jbyy3ho3xv7hqb2ud5qvxkfrftqd8wuqs6c0qzhlssplc58sm39rc7091bqe8kzu15detyyqn43ydgbexbd7akna6qz3eixgprknd2ftubzej4bbjb9rhl5q89iig8gxd1pjamvkfx9xy8rw5n8e3agdum7vwyi8cbrdz85citr0udysthp8ocl6et1ot3nhbm8q0jm7i6yq7s46n59t2fghgjv3fxh6k4zc2bpptgi498uwvuxxjv4io4oms5ih7vxxr8ip2vq1vl9db5gaq7h0lcsq0cyagsu3h0g9ydae9wiuj84a0gmooz644fgn1do0oi2x0q3a9yohp6goia9ci1zc6i1rkwnok1rmr5tct4ukukxocwplnupi2tvy39n',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '9f2eaf0b-f208-46fc-95a6-0854e448ac06');
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                            value   : 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('d5f22bbe-d1a2-4df5-84cd-5544ae6aad73');
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                    id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('d5f22bbe-d1a2-4df5-84cd-5544ae6aad73');
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                        
                        id: '35d8d48f-6644-4da6-9d00-341f5738f792',
                        tenantId: 'ee5b5eb2-d82e-4281-8d2f-af78e7f8610d',
                        tenantCode: 'cd8y8oiok8rcbjm7ysdhj98n1wlmf5s4oqhlys7y889rndhcs5',
                        systemId: '0a45755c-a1e4-4c06-8bee-526a5fd3a022',
                        systemName: '3ans4cq9l7my5eaxienw',
                        channelId: 'dd034d0c-4bcd-4352-a7ca-ee22dacee5cb',
                        channelParty: 'aq4d0wjydpq6ffgekggtlqzijik7qhwrhjd1qy8mywy4749zeddj56zqfracodhdxbrbjyllvpalb2eke4ibs6j1p2dyvv9n5hpu143629o1xk70xhknujo69dmizxevkxo2jzbuskuzylg8qn2zlijemi04vxlp',
                        channelComponent: 'mzsjaztx3lyr4ib75tou26vjjbyz9etnwjamjob0sej4cyzys4c3igz6wdgjz1pgoluqmkz588qmseqko2jad7u8qnchs5v2l7pzdickdtbbbzojwqoqofz1rlvdgfleh0z1zpaz0flbjm007l0bakzxwnhp1b14',
                        channelName: 'ljck6g16tk8e8m8drfqjk47oif89z1c0wtw8dfoapidimqtb7j7fuqz1zufgch3mr1crss8sb4woj59b8c3cwlflehl7ahho17aj5nrqn2i6purwsfa9tpddpxv78palyywd2plfzgkgsnsf8cuux9cnn9i03ih2',
                        flowId: '6189a54d-83e0-4238-b284-07501b118e98',
                        flowParty: 'qxx0rwrbg089wmk91ltmn8bg6ju14fvrnbnsaom6uzwfhpgre4lgclmo8d94yfdvg7k5ueprl5g9tf1fkcku68wan5xgzfa42hzp23jf8lrh97ce9sz0h94oh0fdhmpmciog8sjkad42yebn7jjpu5nd1zpb94sa',
                        flowComponent: '3aftfc3pykoey90kn7i5e82mnqir3wvwfblgeeizdt8ujw0wuns9fj5irqbze8d3j4bs5axbtcjnthh4vdi3q9aky4mr1tldad77ws6bd0dfb4fldl6jmuilyrqp1jksiw6tdm0lqezya2nghaharsfi8e47e9aj',
                        flowInterfaceName: '8qosd117vn6fcvcaz0k73yrrlredvj2hatl2kdejw8gord8155fat4kkr51i9wpeq35mv4v3n69j6b7g71htmw1l42wj6psutqv2wq7m9xrtfu48jhkfxlb99szyezb5819a8v5wvl0oizu6pv1ys54558zlky5o',
                        flowInterfaceNamespace: 'e6z9zapvn753vthfxd2vjo50pt9yujgewx0liagqu9hdugfdxrxwlc1061r6bg7ytyj9nxq7bluka20gn06y14npco23zvwvucyybuxeew77mgoqmd4z7wqf2r649vgq1v2re4qxbldd3y7c1l7ffy6wjv3jhyfq',
                        version: 'jb4edtkpqu7j7k6366ip',
                        parameterGroup: 'rfp2lgj2h6womlkbsjr61fg0uq09pifg539l16694wq5g6ex2xydprgr4yl7wotgsmmcyf11imnoao7b7z78oiy27ext41cnjglwjan58jrt56m9wb3xdevytpmxymr9yslxqfzxz6efgc5yn803dsujilnwqg5wzmo5rchskeprn3am26771n9r7hjxgcsdmao9o6uyx1uqrr722gkcp6r51w1cx89nmseyfjva19c44vzc4rwdqycqooh04pk',
                        name: '3v2h9rjlb8eu75if8io6mznlpc2njiyimp3sg55sreyyviqhl1545xbil121an1yd5n6ag3ptf7gjsohxlk36f8545e5acg1s6s22azatzr8t0usapih5d7zewauv5wvpwm1904wl99n4ftrr00zo77rqtud76017ctube5nfidl9xyxlmdgsny1m0jus81g3pjge0bkkp9qx9az44ctepbn1t2mcy5ath7kyz68ssiubjjfprxco51me1txofw3b1rjrxky3z12s9zrbcsma8jvxsn3bdyqgup2kxser6c9imvmgr3uz8quzajrl4dm',
                        parameterName: 'ou5p6n6i9jwiead5m0f5bkconu9igjpt9ghlh75eppbaandi80k0b9chaa372u3adp29ffnskr2zl3nuklzg6bq0d4g7xx7ycv96fg2wsxdh1gtpi5ml5kfol0o881fwk8awo9kvv8be3pzde3h588qtidn92oaei0u4kc2nk3gz11we3w53yv0pbp1t7dl9k248aa53bakdtysoeur1rwb2zggefavfrj7p4371y7vrxqand8x3s6eauu0sldw8b4fg4yp7nzt4kbzfwmq23g66ih0eiy1pgoxk6ezxueq6tg2uh2wwmncsmljx5ekb',
                        parameterValue: 'bhe9x5uj2ywfevzfb5eq9qusfwulry6joyqbsdd85y9vmcyf7qn8h8282t1o2211j0x1c36bd4phvipdqebmcvz9jpiqt4qqn09prhn22wkal4xqyha3nc0yosfbqgc4cfkr6ugcmsb2ckif7pilzm6ge0hx7ozld6v3jh6wicot56p57m1ajdr29vlp7ihkk72m4vjtayu3f1o3s6jp77tszwsz3ucviios7wmts3uzxoltq8xooi4lbzm5if9n1mwg97kge9c0xhx6n42qhij3q69w22rehrgnw1hepbntszw5qlp7csooqa9skyjgm4ta5mg423hpvukabahcit0gtqmrjnpwiip0mrni8jtvavq03d6nml6yngtve34sqzhh7tmz48k7hduksc3ojksss3y84v6li6iorp8ngc8bkqf1fngkcfobk3sm22j8q105j4oqv9ltreuf8xpg5355mg4jvttahrq68gtuekkg0kr032hxe7fhgym3ird7wn6gguv0dq45yaetdjyq8ceshrk6efeleg2pczne81hjw949sz7psvaaabsyk0w0ilc90ey434hllmd31dahk5k6o6wf429f18058vd3yjnnkmlz19bm90qk6ewkw8exqn07iix4t32p7ebc2k9p0of9jx63kiwwm0ravd1v3r8m0susk7ohzpfe4hp01i3m64d1bcoc6lhe6ynh59wysp2203n84aptjuq7isas2pzfxhqom0rrm6iacxfhyfr0g38ck8hdr38v973a0km17nbem330c57ge419alcd3iigo7c65cc2qhkd10dg91hdh8jyum5m8ljukdlsvzzzlgm5fljx3pk76qxd0bikbnqkxgo5c5n86gqaf5z3rnfbn9h3k2xcwde36cdw0er091ca9o01yk3sq8n5un3wzsimkski5i3c9jv95643xlk39vo0iijbdrmtnmxznwcd1t9nlddjmz3fg032m3sandajnvgcfg2vi5re6z8urmlg',
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                        
                        id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73',
                        tenantId: '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3',
                        tenantCode: 'afxyj5m15l43gnj5u3ph8ukikyq51ouz4mpwrlnh62kn2xn9eg',
                        systemId: '64f1392b-8c73-4389-a675-00b624624448',
                        systemName: 'n7rbcw84o7sr6q5okk00',
                        channelId: 'e13ed62d-5fe3-4d96-b263-eea94907ba86',
                        channelParty: 'og4ijl0xxbapoguydpwzrdyc7s03y36areu7f7qlm20t3e2u263dhcu75q5t91xx6posxzye8646pwzb7t0orhip4s0r32kvxqa8lh7zj7w5afwm726lb39rirp0mhjli5cp9sdhafpmckdztkz9cpn7i05robkq',
                        channelComponent: 'zdp9fiwfkucbn6ijq1qwdq3qyu5p4fkj5bzo1zqkz43yi7r9pe9dpu3nh8myl1m2nb1s9xsuj61z14lnecsnxz4rpslyr7xeollytvhexpj6jhxqcrks3wc4lkayk2j3xznp2arnkg3jui7qn8srel6r5qzx2qti',
                        channelName: '5o6zk5z00fc4ojw7u2xj2in1p1xm1hwlsjxkyxt8dwxag77m8y36ms2jenlsyd6f61l8pq1pufibint811eji8vadw7qoqtj177tcveikkdgym5oy6wbsb8ny22orpqcatfjh248hgqz4cwkpfe5q81fd2veqit2',
                        flowId: '7f69f1d4-0667-47b2-ac20-0fadbdabb42e',
                        flowParty: 'k792aa0rhka8lhf8s2bymiysdn8xmkx24h29rkmruphgs5rmbpvrih5jrnxgybnl1xc373ruxtugq59o6tcuk8wfz4xfsyht8ry4wn2k2qa8yutu8e0mjrvclcdyq1mud5aqkb3tfbpa7jzfwu0ifk8cjx5dou64',
                        flowComponent: '1b4n4q6h3zuaa5qiepg7kyw8045r9mzmuaegmetu3wtm5cnkzeh0639ckh5q39ia86te7fk9v24dlxx0szscv9qihdoj0dz84ikymjm4ehw8xlxzykki9ujynuthkead0jnlf6gic5rzaoixucjlez4i7di1twm9',
                        flowInterfaceName: '068iohs0cjcwjx57btu5pz2jbdlnl49edekxch4iftv6rr5lw4f5pivge71uj6x0hpchfat8pae1fe5vhvpltkzfznfutluftf45ttxmy5384cyvr6nfnrccunosma93qigair5r6430ar83r9sghcu8g94n2rau',
                        flowInterfaceNamespace: 'pbyia5fbdfda8l87ivx04pnv9e9n8570dvnuhyboyetvca21ey8hm9iyaemzl99ll5i6xobtjqtqow0hi5nrouy3e2c0dy3aq8njx1eom1qzf2khxqg25mttmr4q3ilhymjt07wksb5z75361pegxrsein3qzr9b',
                        version: '6mpk54olobpbuyxvtt84',
                        parameterGroup: 'l8np9o191urhfc9fssrt4mlrjorjh2dyxml72ek94s2ac7qil1rdm3twdn7cq1ie09twhk0q0zao2nkoub1f6zjg0z0fa9j1m2jnkpfxk909hp214htl1rrv9wdfcxttauo630cq2tg6oz6qy1bnyort5d6v2m9y1erx64m51hie9os0sha3jx9ib70omcom8uslpd4oahi9i4em7we6wi25f0lv1v9x4hdlnlwj7upm40u555giiv9m5kxwl4s',
                        name: '6683i2kmv5p6dwg1e9rpttcokvrtwnwqp8db7cltbmpsw8g17llb2kfps5f6fifh7l9t7d6i76lyab7pd19ncnvs01kl0bh2q3v5qkd9o25gs175j4y00kzfiajqucqkh02x6gq8hmp5jplml2g8mcyd4kzm5pk0da9rwj91ketv3whhz0xt80yfmer3kkkfsdxtut0m8rj8ux57ee3ltu3mpgjo5grtkmi0pdz19056oi37ogrfp0shhjk5xwpkkmh59rk2b3boc7uxkz2rjn4ay4shbmb3ku6gxq957qllw7cel7xxjjkkgivur1gi',
                        parameterName: 'kcc8halvxuv6eoowgjcpo6vokkp85xer4gy3dhxtgii0txrf7m6d8vjtytmwccxf7dfxlssyv3n2gqkyurhh3mo5ugliq070crndvk908h8uznn470s8lv1utyg1dnroua1lr1ehtma6u7raz1h6xyujgq3yj60eygqu5j86g8n0vruzrobj2xfih3t17e8sennmdt8xzaa36g0mgd3tmpa9x7u6brexrby3iitpe3y6gg3rm0ykd191horva6abi2nl6iab17hr1iclgo4lcxrxptih77vqpy4zxiy565qhtiez4h5951m437b0jr6a',
                        parameterValue: 'rgi1pigmk541rkyt3l8bmdbi6cgcc2mu8ennbi31fkacr9nr1qytzh60rxohz122rox21a4lahubwvtbkp6f5ohjhlqrllvsphna69gedkbdovu61azm0u64xseqvtxxt41bm7qfzt201sq68t91ki54530wn6bqhrpizq8cogatsesetswlpwt09iexnzqr0677p9zypt3zp4ls430e5w84hq90f8mw26clcbvy5v6n4k81jhhj0n4gtzilqob3wllnc1uuwiz7slcd08tsh2flceprl1qp9bax5bpdgvm8bifuc8rzz95y2xyqw7u5eglileik5tv2zrkdtgmcvl5uxgtftntzhbizw7cus1p0ptdi8l7awobant3w11dxgvkj7zti2dbndodfqvinga2tygjvqnvm0iprb5cxz7znbfnnrjf48gnuhcdec6iinx6qmmnn6muj1awhbyqhjbk9uwmytv2ofswyvay137h7hqo4obzyiycyj6qij8uxctyt7peo1yqu5e39a5wr95xqxkcq5jius74xojnfssv1g6fc47knvyepa5kht20suu00g8fmuahr8jg6y38eztf5yykeobm9vvisenn7qymo6p6q1jz5dbp1d73nwnj3m0sye4mohldp0w9sbc0l3191l39dd82dqer4taeoqjg91g1l9paf5fjdxuf4nhq35xjupats5hriep4hbaf3zawrf2e8wxayljjsk9zxe2svc0wfpqxkkh3bhg2qlwjxbwdj441vqd3212z5jhfvg3c0cfi2uns028os7v1p1cx3mml3gpxf8ne26d50d28h77nmn4y4hyjwe3fxv4ll52zcn2ymj0lzddi7hlxelq9w8kzowcv1sl9if107u3qa10v3gx58kr4nb00k50ejytl9509k8cvtlcfsongjeyzx24gafwww4td653jrdv4g24884b9onb6eq05y979gp4fz0ffxmjqyjwl16wfoqud5xez13b368akpxdu4kon3',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('d5f22bbe-d1a2-4df5-84cd-5544ae6aad73');
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
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
                    id: 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('d5f22bbe-d1a2-4df5-84cd-5544ae6aad73');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});