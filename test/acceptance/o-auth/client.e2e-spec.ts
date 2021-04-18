import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let repository: MockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'AUTHORIZATION_CODE',
                name: 'l8f86iic5wjazub0xyraq9nf1myfcp6m1lsmhzv598usphttb8lw14ob8k9hyu4e902pc8qg11qq8p6fszxx3lo3sge8my6jd1f0agkeozhxbc8n5c42vzfxbx5xg1z2v51pq7azb4w60e6rvy4j4gepn4s900x8h2qa1rfnvlxlosturdycv91lz9vaepda01tgmvvljo62onpm9fkadqquov10ssows363pj2sdneeyzhh3ctbm30cesx6hxf',
                secret: '9cpxxs9jaak79u5wapa2n27gtkj9cj5lhqu7w7hwvm1hykt470eak53s9wbsoquhxbi8jtejgqry7crdvq1afhq719',
                authUrl: '02ozxavexv1czspix8qq7944locf54s54rovv0cf2uqbg053u8jvznbrcpur2vy633uq2uc7e0oluzakmt9d99k6g848nn7n7fudcdzwui9o87nug5e9ntq6kfs8kztun628a9ty6des9uaqwmpil7mov4zzwvdatxlej58qow6gvgfp3k3kdx14o1k6sy2doigium6f33fr1nhyetel2efwytk5fv6kl0fi8x5lttb5sf2j1a7bgsc7k9exsc1jnh9zahl2i06l3y29tswacid4yh0228ig2stixgks1hpav121rh8v1nofdgsxjql4jz9lf1975iahwd6dt8r6sg5tbilgnnw89252ev795pvrd1fa1xarmirbv3r016f3gtvo7mq8ljmcxu2m3zbw3gb70hqmkz2mhm8rdczwy3g8s3botsy8squ0ouzkj06pafbneyxxvnbw6oz1fpc4wat6jv0too6jy3fqavq3wutpkf3p2mruvyrtyalduuxdg6hqymzjennt5lwsxse10vj0t2u8z2xl9wommgpf27w3bibnuojkoqu25z5es8wx5z2kxclyd59zlhm6rshfun8j0z3znax0htoza616x35595qzsh0085k13anx5ou9m1xtft70ckp0o7a0zjpw99dqyxmwk8gyjznuhqy9gc4yliu2w3uys99qruvkjanxmq766dklmx2045tbum0pa2jsv57hbwx01n0ccojtfloomgsgvvrme0l9dxavrvldg08i9euny7bijzr6vr4ndawbc2amw9zdh429836zb27hpmi3639ruggftyob9obm8o7t03gerfx9y6bw8md6sj33kc5vjw9qb4g2afaxje2km8ariv9tqz9r57ite11vmcargu1gqg9460096ie57ddavvio19sfhr6tyo7dl6allwihv1ebvhtmrl0zrpr4e5thdaboui5lyto8p277y21dtmffi6uci79hibbxem0v2gc35nyrcog6tbhohpaqimx38s2emsdrymfxztd4ygqwnbem8vik9lzcz8myicwii8w2lpa5p0alpk3rtu9a8q2q0b0dkumzp8xdwiedwxnvliq25hmi1m8abzm0xoafungqh0s3dzddl9w590l7ikxr5kwnoe1r3hu5zhbvpjbtbann24zb6ekjo1n5zk6nhk93bsg1vat7gytlc4x4gu79bsy4zhhrlaalc8wyh101xwshc0nu3iz3ecvpqoura7l0qb44e1m0q9zlqp5butulsecppdt11ll9wfjc0oa8i5a6wpruuik7zt6vt6a81gpvxvq8gpelx9kzos7fybqght652hictvsew2do6echli5f8x4wpvvtezdaktj7al61sh21w85f3kc06pcl61h7og2a6wyba36x1w52hw4gbl12jedlwh76oi37lby9jb923ttislzxstq783amqhn1um5hxlihoj0togh6jso0khcao8k0lw2zd31xq32c74nifx5mr5ov0gast1wbnu12qy9jggomruihtfj7k6uk6dbz7hhmzklj45cu5ee8qwlvb65rqcugb9lxnooia5j10xaxqnn1hj40c83n6czbp96cmq5238dhwdc1q7kv0liiv5619gkbq1k0u8qr6lqr12rk954f2bypyf32b5laz8u6gm9n7m2j7nj88u0mhlj6iwaf7uho8xgv7u6zlgynkmz6k7onkwh4h8vh99iwkuod2avh3yym1slucj9wnqmdaqts0ywbva1v41hvjhsad6nznznjf4cvuxycpheqtcjdjt7cflt857iitk3huy9fy1ezfyt9y8vxme37idrdn8pe30em0k8lvwrne0ejxjlqdi001ug1dxmldkguldjrefneaelqpofdm5h1z0nzjapt64j8ka7q3jhunylssfszqf58munwvjgu11hk3fu5o89l7u3ux6b7fsfj9eur20lqw9az2ovjsksbgijqy4udhbo8jcttohr3nejj9m4j21v8cy9l82ip1vbu',
                redirect: 'vdoix9v1toncx2a20skg0hbhcih15wcflrzmlvwkc55fkfnpme4xb0m4f1iwmnz9vr6nhiibnqx25r4rabap09gio1gro95cx6kr307z7ufg3z9mj8mz13tjmtuo7ojeon3yffc4x2detf6akezkua35j9qfr40e7bby6gsokdf340px6m6tho3our1rfjfa97u0d9zrv8nxiioa93mezz9qpvqwp98ad0vnqstex49x1iet1pvlisydhwinjvvqny8v0yab3vcjzmxpacsgou6bqbo3c5y5uob0efqcnm6ldc4y0b41c92x56jqrvd1oo0defwoudfzydbc3og2ouq7xcdb7amk0msltwlum3fmd23w9i2aadmkluevc6xzu8pgie5y6w6jspmo2eswn43msq7r8mlq4gs872dfm513joaj5jljnb0fazd4smua16x2xnyt40l917iun57tyro05zrfqscoonx39zbefuszo87wl2ze7rfj07aoxeyovs2ut1yhbmuf56kukkhnf5heql7ksg64qv81fekjchq0pxpom2bgz1220sjzsoqcsfk39hy0xv4j3hech059tttf7zr9o0q45dfjyarupmv59fx43319gps14fe6r4ybmfmyxkg7fkn4e7zwm9uc7bxy10ir22pztaw98z6ctx3c9wqb6jkeem44lur292kby7qkisajx3fpgg2hslpr7r2jt5hplcnbzqxk1t4v3cogdnyg3e7jetao1m0thl04ww6msprd05uysxiq075t3g81qm9clm3jbqz4pntv5gvwz0hyi40dmwq0g8tedi8ybqcflnvgggz0kanjhkeikidx9ez7pkatt9urfuhvpin651d4x2iop5h184gckip4ltptkavw9lz7y3z60z76mask9arcph79n99hrvaamxe09jzfa33j56pin19juzqpa42ed1wi9vfesnqz540thdk67lai8kt81ztra9khbwezr7137nmefr6kb9szmq6yz8zjvxxhqzgwwkxolxaol4wbwx225apwddb59dgi83ji89e82cr55en2uqy9x8lzf80dz8beai3joorpn3zibptp12mieyc1mcjze9x0bfztmc7tsedcl1gzvgpgtvcc9yozlqgwwrgs7pen21erxza1nxhsod7on4hpgpzaxpc4yfq06a9nhuickz7s3gieiaga54pp276mdug76xruvqmy5tmr1vjx3sja96af26jtkn24183a1us51r3y6p3638gvvj9z493q3tr4m8utwc7ksvx57it0nelqck3l2baz883be4slbdzaf8jo8dodkp58hpornzydweg3gwsqio06uh090070ht2hd3uq5sxxu5kqc94r8hy6bu3y2xs0v2xeglhsjoxfxdn698acslivxsuxvii3yktzldmgn8i2fwvqayct4n5w445lqmyqg811sbvld6jb51wxi5325h7hp11ot39c4j5e32or2sj004gdn5jecs96w2qlbj6mpm2967h86j6j17n77zl191bkqx0m4qld2yz8mw40ibhl1tj81gfwvhbu9gr7ilx3wtrtlfwaw2gk83uv8e37yv8a0h13j9qgb24vm19pcyyjpu3i2wfiw6a3kp1kzjs0m6k0zp4rci10b6298q1kri7t3kdgm3qwjw0d0ov7xk9fnd174tm77csbtz6i1g3yce3sqzb87ccn8mrfdnnwjo1cseo1476i3m8al8hznq2prbj93sdhhxxgpewwl95x67jkotoj2yaayazgrxtvu61eeds76l6nqeh8pkvvcz0b4dc2xvl8pykua8x8px3wwqep8yzl5icr8si96pek2qefxe571qalnt21gg3m4ogvplbzxw8mbr00emv2tyi3vqwh1vofviggro8bws405d9sefymmyyhb5ifg9mbvmux4mmcp2l9wdsying8sgb4bnzofkv4bqi5aacmlz8e4w8dfagdfrqo3efwsk2rjwwddfj3kmc2glpkjuq07vz7',
                expiredAccessToken: 2159430428,
                expiredRefreshToken: 7747134806,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'CLIENT_CREDENTIALS',
                name: 'glfz1ydy4mpxrqg895q4kc6rxc9k8t0294kneb2v6i1pa95g0fthdrjc21r9gnaz6a25fyb7354r33ygb2zs3v5ey6hywixnq9d65dn88j1iifrrslbsat2lmiotqf2csuo5g9lwfrlsvk6ravhaizc4hazlc8uwcgmprh2oazppumjvqcwjjs99ki6xs8qqpto09vnczpbo7n4yqdnc56jze03fzdk5ftqz6e03dtz3o6qiyhd1oeeh2sapuxk',
                secret: '5orur5edqit7r3h60to0w3p8t8exigz61ysq7b7xk8yz4p9sd61dme3vt7m23c7goawitk9fzsatptinfja01w9ejo',
                authUrl: 'nixnzg9vhz479jrp096vmxna055zhvmt71u54p3ola7n1nsyr1xkmv3u2z7lsxlejnho5bugreym009ifzj20kj8d2j9an6wpv2qtl2bf9kqpkoo6zw7xli3hbxv6pbtz1e63xosziwgr1nc8vrc1997rirkiuv3vqkwon3y3flivxgg7ltdn8bees2v2ng4uf75m6ub5bohzrglnriitiiuxw2jeli8qmrw7j3dt8yb3ue0torclh6iym41jrg487pnuiddeqehrvwaikcb7vg7mzzoxr46d2l2ixcjr6caq7ez05kf2t5vermw1so1zts8t2rhjxa8ikqtqhb9wy8auh7tdmaysk7qms9hxrp1gtz1r421qcuqyyz929gpwjuhhos5x2cc6h2shaptfierb9ugjgv1qqozwjdwgn2ncmhjcvssunkak1qm9f2krogxpsxcof4rhar9ohv5u41lmxcs7i1m3chcp6xnzeu1yl0a2rtt58042fegkahbtoejeyyt1qae0o3odwoc16vumx47vujpos4pr5l0i8c6pz680urwmr3wblfg5g4wtl1xzjl5a8nmd841i6drshtxflvdgwjy3wjctik5d3moolbnbtfpnl96kvdigbitr2ba414i7fecgig6iiwmwl7ripzr4b4h2xip2a4g74m1i9l585xrn80ubkiwp3v55402n526r5uavvps7e8w5uoz67wyg08r525z40x2u6mcp8sk71den8hww37lkrg9rnlepd8yyshxx91j0jeq5e5ls5kzxibm84hurbh93yczhpryqrgwg023b469xjisgtddl849mtee3v8c7v110e37irazz24sky8qdvjksw3wz2aqs9pra0llwp199sz3keiqu8tsgqjf2jr7z6yz3uc6ofmzdyohckhdkpxwm2l1idcke2v488tzdc8iajbv6keqwi9zev6gky1nvsu4j0ej9z8u26a4bhrzmucts21rqca5mg78el7tcq023djffos44ssjozt4vnaeyoveczsn73jchoujc24rorinqw8v1zwdistxjloumpbgn7kyrs7wgvc7zgf58wml7e9n0gtyo5yzu5hu50zmls7z29gjn1ia3rqxqselmet3mlnjtd1ef3n01h40uh0xe1cde0nqqumg7yabql1novaroo5tolwkn62eqe2r88uko9b6itt1kcboins5hjzn6ez5xu3xs2oy3acy2s9ur9ifko8xot4gq9f35g4s2x1g7r16qlkrxomc8xw0e8g0273jy6eyl1rmnqlvokr8axk7zsydcs5npbt7egir4b9f7n6xsllahhs6tb1fl4ocl77m3pdj89uspn1h84fj0qlj4u1zxt4s7mjy6d8rsctb7s16hlc5616pa9y8cjg1hinodcgiriwtaa7kvs4o4vcxx76bk331n4vcotmli7y31r9hzmveuxk6qzucqneqmuczm73i8tcsfr8iu132at5rbosvvyrpd6qalqkihj8qoh3sode74gsy57fa2trbrtzvd64cwl4czn9ual8ktee2gaxbd47zcqxuz5di5taj7yaupatliajs6u7d5u35i17mtahpxufcnofbieqe7b0l7n1yywkt7w9fup16wj6m32m3ac7oojq7n68i68mg79keym9dz47a1m0edeocski82vv54h7ebl76dcuuu6jgi4mxv215b60ozfj5zpv452x2a7t1os93kqycjz0xozy13obcvvu240grbiih65lnb3q1kq7x1ny4ti4vcsy1f03ehxgjqrub3sgtctfie75fad0ls61332wzvu8chaa2b0vjmi6gk46gixdqtzklf9yqs3eugc6ujesm7n9tra1vgb0e5e60ygvvz7qxu7309uiqalifwhrpf96wfm5ghmr3lyr5c8hu580o4mt9oao1ey7skpjf68ew8v4j4cpdwmi8drm1hxq3o3g5a5zl0fgr7kks84onj7kzxji4navfix0z55vpz4t3vqkf4ef2ekd6',
                redirect: '2bbfm4n7cwnu6ra0gp60s8l8cgxdplcgyhynrghue227c38n9buj9mt66f5zi0kch7qg3t45otl95jsb750thejhrh0us0dc025ljuyr5kc7ipnmhbklxagh0fxpbwjqsfj4rvfbad1rqoc9p79xhrbqkr5glcy1j5alafs4rmg7st3q22hu9qh351rk57rsebxo0lkzai6ssko1ybooq303m0vdzpi8ut8k7idwjjgp90dj4ck5t16484eaucgpxix7q8rcvhoryaznb9lcrusotyhle78qce8vz267r6txj937018b9i3n96s21uv8ro79jj2ob0pue0fompdg8e2vb86hzfe9r1dmhtkzhxi1z0vrufu4xhbhtof28zpxb9r2raaiup4rpr1tqjd7kherwkmzoihf7z8wfnoixg19xbh989y1ysoilqf3yg4uowwo42y5vq9uk3rxf5n0u4j7n7crqpdlx7cvfbol2u4z8u8b27tyvosxkrkra3mcuqf482vdsip4gxehyefcwpuwl3p2iauzkf483u2a22i24s76aago3u5uuknm6qkirwr6khudi9zgwo1ugc27qju3z2c6ap51bu5oh96zyc2n6y8wlwzujrmhu4zmt189icnidgtd9izqzwmyiwe1c049j6tyejxpxhgkdzanvu9c3y6sied1ogeu35lfsbdw78s5p9cni5uz7me8momxkruoms8vyu2rpiol11il16680d03wdd89cw2x103gr9f6z6ivbkyuq0mg2lidmnc0z6kjz84ltoiv9ymsrxqph4eci5v9dgi77no2hys98mujqxoesnfmj8ukh375vlqbf5suyvwiw03c5xkluqqavsatxefl85tj07hasowhmkqbj078bn9ijrlwvdpf9dfi66won7lyp2tohr5m9tuxdcg74keik9dw17yd5fskso5htycoyxh5418wsw5tebc41re6zmnx28wuw7pm7xgbnjdwlct4aryz4gen02jy6mabmexu8a7kzv6z4g2xfv6m5xzgfnae7h9zdmb0ti6gjvmvceghlsicbit1t7dk9gm9s7taktdel2ps0jztk79jyh71gj0ls6zvonm5iq73wlkvh0frilrh1dz9y4trwooszm72ndw9eby3xu4kaf6ox4db7guucst4uu4m6zlcrseqvh4gpp8v9qerg0o5dx81wffk461inclntwx6su9b9hjtc5y396p29uqbhehiltp5pq27rl26dfs8c2gybum4htzgcrxkicpa9f0p7qug91q8f6hk98n44qlum44n2gad8zk5qziia15583kemdzsjbhekdiguxglfd19xmpltutl9ee6ia33p0h80liusvzfamidtj39bh7789lfcupbkidj60zyxsu2ezh384w3inbmnr7levbyxdyvh6erjr2php231acqv8rf5dnn53nh48b9bp77pzae4euch3rxulkcfnjs6273153rj7empqxvp7fqyu0g9e5vfgfycwy1ut9uh3rvqlrozvjtcelabp5pcvkcuv97f5vne46icaoc87tg6pnnrqt52z5a0zjr03l69ywwam22dmv5rr9l68k9s9kcvnferrjj0uy32vb1dwdwyylfa2rpetb3n4a68rtkykf85ld275qr1r3r0j7dwpndkigpokcdvyi9wj1eht3hsgdrm47tflmq04i4z1l832p524z8acefu9rolhz8a1xkimaxy85aeufnb1ccws3qmqiqgth6dn73asothfrw0lwvacpylyqwewwzv6z8i4bzcv809tc8igdhppfo28u2ekjunz59c4e14alf972qewz36i0bkgbt07u1m0cv80if4fqxohckjm1dbw3ila36y18t1k9rg8cpesegdtddw5n314jphx8uuktgxwj6y8yow5r5t8upefgpyfsqlp9nfit6gn9ml5w4q1mc9labd0f5gcwtgtyra6pryj1nx8627atrdjjv3e6a8fpz7dsi4s8z7ur0xcrzpbn',
                expiredAccessToken: 5353266671,
                expiredRefreshToken: 8643808964,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: null,
                name: 'sdssphy7kip3trxvl2wal8s3i761wf2zfoeidn1rotnja682m30tqw4h82ilg5ht5yzz2c1y0b99oum4twv03o2iwzn9l2d1h04n48wja8swf47vermlt6r2a8v5wsr7uuvwajx5t37ah9wkv0na4rhieffh00fvkbff555v9zhqhlzomvkwtjbwizvwp7ys5x1o130rzkrgqk9oxs7sv1oishdds8yb33z51r1kt3g6aabbxbglv7w08g1kdy3',
                secret: 'ktyfe6wt30z6o8u8et2wovgji9t4nlmyld70k83gjydsd5hvhvvw81y0t74vatjxahjqx429i19byq9gdfmpuz0yv5',
                authUrl: '3esnrg6eitxnqelxc9jcszliw0cgk25f0g4qhhf7jhv4d43cq4n1m4ighbi98w234k2ituw6snuz9vivjnl8jiicxrf38hcdnc4t5jq84752e3s9cll9wbkgc6eb4yd6ioz86rmbpbt1e08xnvcunakme36b45ridlntj2w8fgf71cygiemat66w9rhe3vxi1jkvqvy6khsknvi9iz87tm3wchvom071cvjro2lgaduckszhrdrphuei5x05o1wzbmasvxu5zq2qi7yusud4tah8m9ap8to5nzygd95624xih70uucjymcy1zi5leta1synqgcpqgzxth2bwpjlsyqj5tk68rn74gdy1ln7j6idrumnqxdvy3it32o810ofkh6xx04jx5g9fermvj74752oc7tl4us75v0igdnj0wwdb7pikjte9w5f7x7js9se8kcrdpotzpiii8zp6xdxq6ur149i8or3te3wlmgqh17gd5ulmvlnxsw69uqog6e2d3lb9ezom8p0zvyel0xgmv7853tgog0p1v9czsrkl78373ahwif1wi0ep5qsgq5bchmkj3sdgiolwvloefogcf92k4wmeoobcbv61y1b82lrbsc8q49xzfbfrc5daub06j3hbixskyq795fco7k48x1hm3n3b1yickb7fpgglmug91aroqayquf4c2yacy5h9yn00rvi4gowto72mvr27yfo1m3288gujtoetvaavng243e4i9ibobld0wmo9w5b8q1qu65y7zb42ngjqhz43clnxn4hoiq0k3ncgx95rpdz4wrdzwl1j0x8me0qgaqerlss1hg7msmq21ou1belaexnfi5bzslkpck2pmgnvlceknfk2ls1tnw22hdv1b6h1jgnzycn1axkmjyno18gwasghp3z83et1p2niym51zzaj243r8sdzrm4j9xc6tekwyppi1jngaexdth8upunv8bxqz6w1yejyxgzqj27lqod3ergb47p66puhcxeep1egfmv7goqu91fglqhj6eh746hkv1zpgf0792pjmpujgnc9vw7crusvqlsb8aga5xk0tiubzp892omatzmdwrxw15y708kmb18mxwnwbz73efbcyg8kgtia7fmzkjztxltal2tnumsz4gp3wd1fd3jajdufo9yrwwzpvtg01ayqi4jdnze1rxb0jtyddt9n595rnct87w65mqgmoa8b26pmvgoggvy9gwkszsilyoc1culinbxv7412bdq8shebu9p4nt453rr3chqtuz7c0aok9m5i8g2ks1kt62333lqizuwa3o14kyj5mq4qucti65o8zwgxxpgbknfxl4b8b20lb6ws38c0zhp7nyzx91dlxpa98d5nchfu2yhn44opi7ilk8h0hisk1wi9ry80j4gbgitimdak7b8zi79l75guocew4n1pprmw58sri1iimkxbn0fzk05yyr67x0wityxglewdzb34krycau0wjog2ucu4vugvl46b00ub1oh9emuicz6bhbbxfe46t2i6cuds7rsvccqtpqu2uixsry4635xlvrb81v0twxk49buxcawo6d1hmt94esg70shnxzwb4n7bw5jlybr63w9hxpm14fuo0pg0gwb0r9fgmgkk3g83pcki6fzcx2deis7kh810j19f7jaqrcfue5m5cyrb3doa54jyesh3bum6dj0ejynwerfri4g9ss8h5pt7mjo0361o36tfs3xqg184b6tvg43dfboteztbd4gmbycznqnubym9xgv2vdw3emyutjqq4a4bqfuhbh4kml16vdgn46v26o9w59uz3kn1lhsxsnpnyc3k750r3udqyo4ubbzijbwv7jsspqtf8u3hdi9smavyo3mtv63awca65dagmkkm8x0ixlqo7n4gldmray2xia6x7f4qiijk8robgvsxi9hefde0c3on4k5r48c7f82a57rzqwvmvutlnklob6x17r3y0bjnug5n9yx0bx9h3ir978cmcvyuoryylubslrai',
                redirect: 'kpu9fv44ldxr8pjtgc8yz24mrq2pea6ogykhc6yn2rmc5wlnxnzbz7qj11hvxfuh6d57xt76vvgnng9l2l90ozi4k18a3ucrk8971clt3s9mwt3js0irglkb0v92kh4yz4o7d6pnem932bskyx6e3tlt966cxd619497fhoczi2m10il1ex7pp0ski315l535otao7v100h1vlsf3r32lcvat6tac4452bc9lqppgr4hsh5oqcjvfjau2jsvxslybuqz68zhy41y8rlo82rph1glv7itk6hmd1q1hucs8i3vwk8tp8wd1991wuomlls3v8brn2tf43jv58s6joq78zwpyjcp1hd6xeiwdphsf4wbp17jj60sd2324wg3lac5pfrmdp03if6ry0iiqf09uxurlrsxx3p76c1jxwmce917r65fdr1jtl9mfb8ty4w675fscri6birbuu34p5g6dfcrmaucwkaxlpsuh6zkx8o1gusxlpm5eo4y75dulzzsp60mbh3a3p5hm5jzfeb1f58ihki809goh42dhjvg8gzx219zw3omgmrr97h4oyhbpouog78b4jvdm5v2cmrfkw1v9l5m5x3ar69xlrns5wowji9uy3kah1vfdefnibtehtjsi59mhnd4x3j3ae576y5lkm7nkxo97hff7v1qnk9gbq0vfu0dzs0nxbcu47vtb23ugi6odppnctvn77y14k1x8jzueamzqypfmtyduaemxswg0eq75as3e3g92v3i85p6jwohqk7t9yzuvr21sffv1h5udohppqwln8w8w09zi9djx5r9gh7zjof02tmovhgx5q0oeoog8d7vvmofwfrjral1v28tp1tjo1wwyjnll9n4fsxtt8p0yy9xgm073zidfgsmyf4q2o5zjr9umhfs44s34bkibtp5urmx7yjouawsfvbui3a9v5qjrffaklyzvi83o6u84b9kmvuvk4tc2o4vd2tmy3ww385lhz6tqzcm89qvazo5nhn9mq3ie6n6rz2nnzs4ls9sa34zm1rj3zl4o52kyx28mbea0a2kkfxriwpssiejvk5rd27qbiqbisdlhxxtc58t7n5v4a3i94yvsrcfdkvr3ntp419qi0kxd22hyy9zihvart1fmjmin699qpl5o16t8m7m269755r8rfoqwj7eg24mwa9fcomovuqmimh6c35vvi1xbgum8kuv1piutp56alocsi70lthmvcxf9bgufn7jbm0zbalcs21eblfc94u6vx1c0xcqbmhztvmatnwpkyzg6uhafgu0i1z2dezgmri3unvlzi3mggt5cp3h4hpm1vmtb1se7e1csm6egqxyib8fxd30zgv1nrux9ndakcey40h2l2k4a9u6yyx82pqq0vtwyzx8f70ly878fu6jt5ug9obxlbx8pi6f2yhbpwgbfh6ckbnh1sz4eug4a8wggm4c8jw0zrcwgcpu2uf46c1yf0sfhnszoovk0fcp9qx2kjnckj3co7tiihxkazpe9axrk6gyo63fyejjfjln2jbvg2d6eb5xt0hrsqz9ga8yawtm3i4dwxbzh018nsi4nx2irgobn2uiw9jkk47ulyklz7jcpu2kh3skf59hcn5dqvk9yn9wr3ljc8kyujj8kzarzklg7ezrwo0rwekru02ahhytzmu425cuono1kq39vc3jeckbq98v5sl0slribil4km84u85k0upbuuktsyduzl6khbyzg0wpwfbhwq7a0qxo8yz6qbkyapu9wckr6n4zip3p9hj80f0di3lcmiw9gfd1hfeujaz2m77x3lr1akdznfgxv3t50g7plq5or5q8utr1zi293qoes3aio3koo8ui6ukufkd8gzpkmjjgtkj97bhqcejhwr4ru4mc8oyo9vjwwbmp289d3a37ev9jsl3krbl7o5f5dhvpksqwa1wty19lj6ltzlbjwdygo51rlb1ni89uycor0kfdk8qlufis62piy7r0hgvozjyi0zfu10ky6f66rvmbaynduiwl',
                expiredAccessToken: 5552869706,
                expiredRefreshToken: 6002927964,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                
                name: '01d5oo2b12clltdvq2vjdfokr3z1rr34a54xysxo8xm0mt1eczp6dvbjb9wgzmdb4nyg0qt65qcedrg42p4tc0456vsnmad1h3ygzwy4vlydphfrfu64169hwe8lel8mil3ap5yfpegtpjbdwxquzvu0bcyn4ywsnnlhnlexqvsbavmjjdhnzdrf0klthgfaubfe0rgjy2m4rlq77yud971mr2phpmz8rwbpi14n3v3w76cvp11w56coh8624c7',
                secret: 'q1ao38t8axuwymu8e5us5fhsfftzx5dg5kkr6o2ju9n2fokzjn41rvesjczwpoepu89c5kd1j15glu3tmn7ouhiusj',
                authUrl: 'l218vtv5russiuae8jv8svk517iz8b1wz5icqjsclkkenwzp9dteu8pvxdvqmx8g7yin6f5azhzimmsbwzx7d1nbjj3q3jx0c0wnhh2wh0fsammisnqrzouu1njrieta5l7vqjjcpqwyltfs2uonrbt4973cagchkn5bp8l42deeyhydg4zwcznb2mabm8u0t1z49pph6gigzvmnpdn32vvfmijju9n4ce56ea3fdvhj4dmtg2vz3ggj0km2ikfhx15gc2sgxhr7vib2ch6mtx2hmy2gvlipwp4v05jeasswpou6ok9h6fnq9xgkvglnamc71zik7lrj0wl4esb1fpslkwjm2btzxg94udgbiisreve6obmcqp9w7y8a4zcqb4qbwe42fs9p8eygfln738is4uj3kcuvle8ripe87zn1eel21cciovdot3ts446it2iaw4e8frojhl0xdqnojbqlls3kfromxqy28syo9qvb0nx4ic8lt9xc76m9cfekw3kmi7om5gupcp6fsgucz8fns8drksbqb4eauhebdacnjfe79yqq5gjgkn2k9iq57jfg6ggtkpxd5ayf4qrnqwvr5iyndovelz8dbbd4bj06k3e3uq2v3o37f9ba894eft0kcih324976nidbfnkx0krdwwxx15x4h84vkpz3610todx6vtc3k16n9jd28y2x7ow0odohetrq1ffnwme5xgbj7zi59ror9ykm56j1xcc202xvo4gplzamtqnaodzdgtxu31z7tfwipzfw7r17fvpc31m1elmf7plhvj3s3tixb46f7skyx83sylbk5yw3uk01fy5pskivzakx3pko0om5lh9h3bx1jm2w2lboz4iyf8u1umo5ogin077wa2mqxgbbejyoukg0e1emq50yq99f8oxmxgud1rtzi3vehz6jsdmrcemdks25pfecx5yi6o7a9zzpuamvatd6dask0vfbdbf4egjjgazk6dkv00fajixjhz4f7mfxrhs9i3hta4m2nzaeqdufkp6mmcnzanzy221hubjol67wqmjdw3x05tyjy484iufglgswsnhlhbawnjngy49kxnfk05tp7owl8nfjwscgi3mud1l9pne162s6o5zsgsqhnyr07p9obtn169xtoxy4ig3hirh72261a34lpisjjwjbxtrfvrdnwlad6a1fxn794q1xnu9l19auekt3sndaelyl3kswk2v6lx1kw58n2yvksr01r5od8rziolbmvzo3mcryf1yqf8s7f94vmg8az0yn9ogmtwvwl7owtk5ht07j8287p0edl3mv556bhrd8df4bysf7v8xu3dmp9p6x7b3xlulor8pf9p0w9xbuoxsq05cgoldfdnntz1g0ys4cll5lqnbnj2q323rt60btu59qrlhvwdedstfpkvxkzdlc08qj6iydzkyy03yklt08vou8mthma058moqgbxmzlrqqsumhptj9fwm7b42zrins8a2104o7f1erumgdmdodt3449zcu88zc60aomxi7wnmnlt2b0zqfpm14udo983x5xt7sr09kd4gtzoipiydobtdfiv61zr6ku2010w1isjp3nfp17nmgu0fk0yyexww2ff20eosmwgmqvnvwq5c2t37glpycxcoso5p251bu3vdmbhk92glxgg511pf09pdijgzjtb1z40h6qi21rfhfca343mxj7shu3zy6hkb5xwgfjxyywninwfi2nwcoti7rlv8n3p031x8z7bpauff7rbqs9df4vtr6zigac9tf6qso5shdcrqli8h6ucfqom7he9ky8e46nudy059kvup2nn1o0rxria6tu96z6vtm6l6ay7c51ycsmpw65gm1c7tj8v36g08ilb7586bapxfz9qh6l0lijwi18khe8o2a6pq8rx6rxj22plzc63f4h7nq8inrdl6v2lxuwhtblfs5k9z63gjw64n1ck8o7n81o64cq1h39nxm4lq84byrfoemyacgunhw2d3ch5bgz8m2tknqcjg',
                redirect: '5pxuip34v9ox742lknwf4pigzo54x7hdjp1z8n5ucli364i7e2e9n9bmp021y7kqeq2sn8pr5ill2cb8cwkpc9gt18zv9la5fl6ivrr0hqbxb9gnf9b52heomgp0k5w2mnfv7b9sr42kgnwl9kp073ibr1nu7g8891qo3198oowe1yvvsds64wegd0dn6jbjamnwcbfyi4gpv6lpqphj581ss9wj3f8j2x9m52lnz7z0pipizfl2mdqi211eqwblveiwsx7tiqbya7q2zmzyljj49bcq0x39m5gu3mt5ees32obgkds4ugkep1huv9undyj7qvau7vabtm9jw466bz00g0adz5nh4e9505psjr65pndqv3z1ckvdmxottnguubtfjcu46b433cq7a9udylvrx03v4hg4i4ozt8tb96s9b6uc0d5dz73fucv6a9ao7nx5njjo32i1lg6bpwx8zr2kjjga9lmu84da9naomt32x8dcp3lzlj0p9p29qc840914vgf3ysokgftxbhc6ic4hymvxw1r8hye4kbv8jxiubwn8bhm1uil3m6gmlntztzj2aq7aq4unhfh5p9v5vudvc7lfv0d9l1q5p1js227twkol7pek60muk1a77tijg6r2p8tczt0853dwrrkk81yc3z78re1aasu3fxnezan7358txzj9tmx92aj6u5dszu7dxdh7wqr563u8n303gncfjpyh65l3hloyxjxniipxpyff1upouq6s00hxy98bwqtrp1hmafd0jeubeau49dxoejzwfo075c2mr4xpm8lgcyckksjsriquqlfaaa5bpa832y8alii73zef2wfl4bgjmrfn673t13yfqbtqddqlyineurnobtwlbnkxa9pklgzx4zu9qm04zsqkqh9cyvnhx5u9h5srqagusolsu5gt0gl4yv2o1lsuymwwc7ba3g51zfj8ustyz2p98je5go3qdpn0nf1bfb9j6xuatm70ayqyltm9l0n06onypzw5d1mwidzjxs8w190d3jqa2c4ac4rsj7uahkwkxcdev3f24dke06vb1n7yedl00d0rvmzydi2f85d1i54ev7ijgehsvo6jbwbhxf0h1u3embyjy9b5oo2d0f7wq01ygaroz3ysh88vipu0a0mgyawn2zfta270e8391xnmvtex9wv9ej7ea46jz5egtgs3uhim22w26zl4ha1upoxjs1r5oqw99qw0rf4a7oyefe7l4lci5wtazh7p2xhjpctv42z73w2zz6dv6qv2fptpulf3t9qwwwpmspedy3txjnnabwt7zj725fhpwxl8x11dcyp26g0xl8wu1v3p72lr45iy5r8gyi5kziedwa8xzo5d49i93mdrt407ut62vunf79as18qm3el22swx1rjf78tyr9trbcw27z3muwpmysa9ah1sohf24phuty8xmcpcx8b6ho0tdxsxrl3r35meappzq6t2kjixm8y8mttuzit3376icudnq6yp4xvbzhmptcupc0lcpq52hzxaoa0e71jqpifca296sjsryrp9q19895m6u1qfv4wrmclz0lc9lz1ubthc65cfyqckdpzlkqki8qy9l2wzxzv7ekjqbir413manhecrnw6q7odvu8yan2lg80fd7jtrw099fohspn95zcwojh9le8emzsxqz4zqieu3sq3ftl4t6deq7fg4p8ua7ww4fmvz2y3tgsh5zrv0gnyrss8ewsims4yyy146pppajq64aohkxrttyop4tik32agoll8sc3qmwhy8b5cg7p21nfrc3y26bhqkcm2wg26bs9vu3ymai4lvpx4ta9bdvx69td7rflifa3q3rrzxws80blion528ob6tm5ccgnnxf4hazcqfzqbxic9qhnorx12hui1kn2kfq3tej3gva63mdatughwuthofn5951qgjamr3ma4wvgxy75kcwt94fqit0s4wen7m98ohx4we33um4m5utsalkdtntrgpf3bzc3zlk9h8hb1kq35o7gu',
                expiredAccessToken: 4852192218,
                expiredRefreshToken: 2387928117,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'PASSWORD',
                name: null,
                secret: 'fqq769m9r5ez11hvfam3fmchqfxx5gjl92q3y98ysshg0tkju3oh3bs706wy1ui9kkxxh5ni4qf7spwr2bge0gnf92',
                authUrl: 'tbl438br0ws6zy2yfwhqcavekyyxgotbtbd87fexlbnm59jvryiaz5fz348x32qdu6na4kcmmjwk7o7q2s3lvudc6d0o2empn0bwwbqu4lqnb1114vre0c343neiscd09ov33okj6pdy09ab80viohbq9sli0nizkd0upz1rgvvlgcudyo9t257mr3brafq83m0odyjp6s72zgbzhc11esgib5faxdywspsdr52jswlu93vuqknr38pbjhzsjeo77fcf98t8hc9aqmqvuufqjwij1yg5o2a6ezqzb6iqlqk226jqs9z6l7p7mjyqjgzie261s4kcj7d5o03g03tvqpoe5hkm0l1fzh1j8ol573rw0raogo0rkfzha40k0qw0yfd0f4s7laksytmi0dh1i9moy6ktdlp3ylzqt38wexryrnko6oqmj1dqiwzv2l173ejlk8oxg82lruktnrk8jlolbbw7j1zknt0ot8fkcduzglroiwvqw643fqnfioexcyiwbd4pvdklt1uzh46i8d740k0letrxir3qpyqev4qznhyjb11iylxh75kg42au3as8eoyqa6ok6nmhsq4ff8zgxu9bsb6q26zh84u3il0hea85jg03pe0orogrdm7rr8mjf3fw4wz1wd0shzgt3ivhefz4qq3igjautek7koqt9wgfo4legd1gcxxhyx6st16t7e4oiiq9vacylwawdoy8rgalurvedj7z98zjqunrkhdnqqves74qvf5q1xw3q5ii5sa6fwpngbwv3cwxsou194lehbi98g93da7f5e44qn9s64o5nzgfctzngkmy0a45h9090jslsdsp26nte531wzobarkc9y97kmnau2blhi4coq9wbjlybw301r6boob1ut0ef9gymgq5ivbhibnpvigtkjodvfbam6m8c8uxobgogu32cc92bqvm0h7l5h0iilih0ccf6mnotbm4juk85inrtpyrrd7ne1gwur7gglu8pou3fu30m6v9idzs99nbb047d8fbt8eit0l04cklemdqrtiavzt3a55eifnc5cz0y1cvkvqspw4b6w5j5gruvwp7kzvqv2e61qullorknd48520zyjjapqxbqwc53rnwdqa7eozqcz6gubzet8hhji4ckg2olekwhpju8n0qqpfx509yxao788tqevozr1cuvbc98lxs8kuk92g7yhi1lhf06wncd5p1wrdtrifx9txn3li2f9zw6khdhlmsvleuu5w1pie1v7j8cpc4ovurebz9ffr6izsxn8ntq2yh2rlg4vmwu0pw41g6kgxiizju1ifd7ud9lwtk2vronoe8u89g1rwj568ypmfq3gjgtykz5bottmc98cnypc4dqba2r5roha6pnbxfosdlu7rf993ohw05mm00ji7tre4gt80aauk6e8e70719f08nqj41pvmk618n9kgp1l31qgkq7jhs15zu6jg3ggkcrmgv6wiais8c85arxnzelh9ozv95b44vrktj7fxf8knzr74zs53sp53sgzrxu6vlhem43d702bc8y3dmp4l7t2z1mh5xn5msfzl7kmmdxbl8lca7fsu26c8oqtyfbymgsc7g1hxnsdytl3nz9qzeawbrhey82fap5m3nzeaduj4gvlcorgt8rnsydaojilkvh6z7qxx5e3omjw7upymf3wpe5uxfxutf11r53k6ojmgq6ome1myf1g5vyqlpey07gfwf9y5dg9sg043maknwnm3c4op9r2q0ja1alfr2wrqlp4rffz15ymjkfsbhju9s1osmb6yhqkm1bbn9xcx2bstwtw207ts4ydxdn1r5ti7yd6gbnn4o6mzq7wqqf7qk8f5uq2zg7ic25810e6i82qfgggoip1rkb6o4c28uw08sp761ubqazlfb5ro0ti134psqfzzkdqzdc6avyt0oafka85v84kq78f49txemd5evt54e6zxqw9p6275f0evl0lnlfdzaqy1xgj2c8fnfqisy1bw16fw77r472prhh548',
                redirect: '79xacopy51dirawvtmmhznoqbykld9ry3bidami38bophuaibt85rk35huffkdyslre1xu0q48exln6rpyl4a88xi9srsn146fdmn6umaelv7dzc5h0m1c5g67rz90t5myinfxzlb6yuroo8l21ddmf8uej3nbuc0c7029r68ayeq726tebxp2i8u6la9ymi9otc73nb71egv5ykaa799aah0i8se1j3avcfrfj81niw6hhw8v8eepdljybghrr63x3k91oi0wnmr69xpd08f7656rg08vylzb22oayaswg1efagl0bbc562j4cvp86lwr06ndjtiiv3rc87oybz6ubqkya2k5axphaj1p53mnp6ohyfnzcxnhy2510iefhsgwck5bpves55921tmtevgn56n84rnv94zxpoa6g7vqn9k5c0y9wxkotnpyikze14r5jsz1w9cx2kihj21oa21tzsvj4v0nqbkrpcs64cy9nkladgi4fd4xlxzoy8ngfwfci86brw2bkp7r2ukwg8u89wxz9yizw1m7zcpgc3w0gcisivfh5kttiomhiepolrbinunxghvjugtd4952ptsm49tbsburf5rq2dapgbkzzl7q823pmynhr9regpr525ddglvabihvtdcd33r1kic6dbtwrsris03tcgen6o2jgqlvh5yzdwfuul3kg1b5w26fhk19svk0e88k1ojhxv7uy7wuhsw2v7f3qfw5izp7cz89escmrwx2pjkx9gun3djiu0yidavxo00t7u8ef8kbrr2uymvs4rwgkp5gp9gfpebjjhaw9mmjgtt2x9un92548rhkyo94lgxgwskvt6rufbfy7ogwf011wl8zyotxdma00lvzsxef1spom4qf4bsqmgmsydcetu6ifvqzw6r13vur0f9bfhdt9x9tmf385bd4jdd42c2v1gxnzrcwuhptexqtwysj668wu4ejvgfil7mrrtdy7zqrgs25ywtque7h49tgonn0rdsheeokq83ez16tm5bb9m8ce313z6yxk4k94uesis648ofo25jike37hqf8syr5rmgqy2hv7hjnm113pq26bbw6h7fsdydktlt8n6j5bib04ge37unczjm5o5i3zovr8vx0j6oky1tfp8te2b2i7bc1nmaa7ijyoerxxv60zqtzy0gznkue5mpqibvtapzlnz9uiqchylzmgutiikh76u0h9fhj7731ku0747st13kfihoqdf62xogc0zmqw1y0qadmx35myoou0jjs1w0b2kpvwsyvvljd013r3izxr6awtmxgez6ziezh6dkzphzc1sk3udcp1ksqr6171qsa8c1gy4ihcbr7suxehd0ucr7timix1wmth6ffkfk8hcz6cgnfpagg1phl59luly3jxk4u09hz9kmbl2v2lu9ytt3jhi6i4eqc1zuivr7avq4yy7tj4imxo8pzaghokpduajlkge4xrwd8hl4bsvebpe47akyk8supcthy2w3kte0bocjsuxiftuqagtitoz2zm6iobw6h48qzi9jbx4hxzzvqe7fe7ysg6oylwhjlqq7zpsbfn35lggdktqw2t8eehpjz38902o6ewva50kg05hljp3w4313spyjr9kh985lxqw9c8ggnssqogu2vv49jcj3l7um6fki3awa39fvj4lcjyphahipcp5y4if0b4kr8rqxkmn1a9bpbjhpjr2np7r2ndnt7jn0557ae49rxmjjef7yu9jjx0rznurgpmgyczq3cuzzwfotdzjozn2nqcw076w8cud9u3swte4n27vfg40sw5wz8p3lv24wh7z4ntptihldexiylcn2157ockp4ommva08q975n51yuk5h032h6z968sef0ozfzryo4d76s5k0s90ki163qtpj1uuhzufdu8tmw8m7bm1y9zle5c7wcwv3aoo1osxtvqcor6hgxlyuhmvs8qjpoxnurdv2yb769mqf51f1vyyf0pdt84killg0d5txf85clr9niqnbnfatrahi',
                expiredAccessToken: 1638648292,
                expiredRefreshToken: 7466673496,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: '4b8b2t72s907gie533sb4jbexjvyst8kspslrwd7mp9jljy9rdw3vgo2ktv1n749ow7qoq7upxvxysfvaain90q950',
                authUrl: '8qv3fo7u1t61c761jn0lcn6xkt4h5gcjd0mi6l4ue4ros23hc7oon4hms2kkwsuvlj1aulvhi37mp98vkqwp14wy3bph7amcnhsnlmgzldkiplc2ejjfpksq2vqugamd0ja6uxcawb5zosn54o7j7t0xzfkke80dbggtyo8mlob85gggn9mwmgg8za6i0ajhpvudgameq02928bq4lqlpgidf74pf614ixy9udfy1q9bkxwb5k103p9r8jbctju3t0f9ij62sqeudwybffttojacuhgq5w6lrldb6dt727jbn1f562vaid49ssk2ru5keo1u3om42i312q86p17q0iaygj1aydr19p6gtbak0t1ps0cwno74pptiklo0j3g3wv94x8unobtjnwy6of15ziefxzogioidelr23n66y2t5o4i51ioxr84nsqtc8sql6xnbdalcqwa8tea1utaqhy7kk60otaupsh3nmfhgfu5au08679ltf2fszergqlwlyspbz9bsb2mixw8gr06ocn41y4xsi4khe8zcqwcg45q6ok0hxg7n46y5d5rj4occ18s4etlhnkgqefmxgyq1ga69wy9po89oyskktde4dqkaq4z77ii4qpjyiz8h7iq2e5oimtqvlm65km2dlfe46o91tkhy4jcrbm8uqksd1ivgih71dx2vfh1727h5q91b2pgrb1tvwou4undoaq4rk33g35fj1a6kbircsl8st5krtm08pswrpwxb6li8litn54sdywzeav32l7u0n1cqceewh4e8yeghrexxqk94jq46oc5ryc1d41oj9yu5niclhz48fp8ic6ltf4o7di8ucr528uvnz7t5a9kr8299zifftipbvlw161tm5ea1rfrdrp94r0dsn8ity78pfm8rracmrzspdxod2yba3zgcdvbcovfny67obfxproebmlux8fhechr1tihn3meg10nfy47nfk1k92bvdtbqrkztq1lrf3fii6buiw7tttepe83sgbefh9x2sn22zlssf87glsnbuzjqwg8y5b14b1bhnt0nbkd5t51lekgqjl4982j8dkne0tfxmi062d47knr631w73vooa5d9mfw3e85s8aiht931s7ebq5g5ddkv9zvmffc2223z8ab6oainocmw30vh83ugywc425xl7y2iom9mn4j5wra1cy2ahpsptcpgxkspmmobftm2789zzp4klsgchb6uj51x97pxy31wlumk3ctdq1vc6ej8abj52mc58c3bdew6b7ucui5kzn1hzayghsz84eea8wa33r92c4bm27gxj7hacy1butjlc4niwn46p8o91m337wxt27p4z0qqoc9g6b4aggc550z38q7sd18lfk4a7nube5hm8u32oi1juds1hwfyo7y6o82aq9mh77dvq8h38sdbrkflk7623e6ramjegq2n1kd2ms1hu9m8k3gwn5os9piumkoz5fy7f7ggivkfzts4oy03qsjkvfjvbk7n8g9efq5t3urau1pgf6rs6vawa55grrbkldfl29fybhwvyhx9hm600c87nfu6iozgm61krcnxw1imopshcfqwjni999i4nqf3nnjmsh780fg0jli044h94rqazio53hx6mc2hvi90zhsqcxxfqxpny4q9ds0uamv3knkivjr1bwo5is663dc5p8skekufduaspejhy8ip9h79q71pcrfenkq2ujkww4bpi9y35sw5ovz4acol7wrkxo00b7e5ibmxxbmdz23kqtxspt8yumceyhn12guobpsio30idxlgk4m7shbzh9t1yw29omat551p2hz66ped1q132ucwtrba8s5hmd2o1ipgj9n26zdwss46hr6xgwvkl69r6lymafob4dnbhijhzkt5gz48gp5u1gtbptbse8bbxwqei8fn447zw9fe0s1osnck094wdib9nuef387o9xwbjj0g0adx8uz5kqw2drn56oaiwwa5owj4de5n9928th7m6b3szawy3xxhlcgsk23b',
                redirect: '453g1t0q9wqohpjewossj7vivo7o1nru8b4psyl7juk983z6ez3zybtqqh504h4ctmbpsmdyguljjjzzk77f4xntkpxhq5gyao87gcp721s4ew5gp1brgjqnzdkd1mfbp0dzyn17v1mo4h5w7etf9444z01hs89p1vf8w5kmhikot3lert2nwfjhtvj085skdz1ycfbvx7o8ggta9stpb1amb72ezzyefowoq2uvn8sr81356bnq41z5op1xywfwg8ggdzcncr7hlw51yquds4ihprfsesq2szbqtp937fo49szx4fk0oen69i9xdob3qny51pm9xfejt7u4foshpgcw706qpq8ntcg5hh5y2ko3ols6l4mtvanc186qxz04scf99inz4lxonf447iyi84kbqk12cuamyfnfiik9vulk9uirs1nucw7grl43f99pf5yi1oa6aecfupxn5e49pbkv6ird4a9r5s4cjzt9gizrslc74scphy0yyxffg97z175z9sablkqm2txfkrrxg2g3dhz4hy5k9yv9xq3y46l4j1fogg5q1uia91yv6yth0uv2q8es8q0cd598a45c8a4gx83gz7aoegx0rhtag46l0ikag10z7u0dg2atqz961ok1sn5ppra8mcvq78k1pbg94483g3f0orcdksyxjcam8sk0h2162sbn510vkkwabjbirc44s9y8bob1w9med6xm0uv59gpwy6vg7m52r4f60p5wopifn3vp6jw1ks2irfinfzco8ea1ctc1zuz6hm1u8ausautrb63qho6u3vbmmiv04vqmviypvcnp7qm75h1sn7xylzsw7iv057axeg36zdtuot8lqc726p2kv67zx4354cgf7y2xmwzgxpkneg31cr9kdu330w8q7lcl3u2rp9te7tahjsgij7njwuc2hqvdbybmr0ctw3x5q65jlhwy46hf62tztbrbu88ummr10iql55nhuwybtujkftnj88q9a3sq1nofonwe3shfdr9rofj62rqpg3nkyqrhxaonwy9h92i9pxudg3bn9mk7t0cmlhj2zydwuu79464npnxpj5r75kar9z47hyhfd1snojey3vtpdom1tsmmoixujtelf6d2sbdwkmsyjv32q8ccvx2gv64kmj76j0ijcpzd7916v520zdx6b8x3ew6hwzembacroerkbv3v2esecpy4a33x5va04xr372flyz6wg5yt77s0ajc2ric0zdrae54hyj4f2fh3vi36d3mlpmcp3q7cxwcr3jgrg3fs7u47ect44cx2sb18r3pk6i6otlabjvxb1711sfuklrvvtynfyrxqifqmi0xioko726re0sto4hlt9c0o4yc1jnpxn3j0gqyqwjesk9db03gb8d3fqxzj262uo3kxv0h9fzid0bcr81k4d4dw7h3rczlsdv7tkwjpggaa929d65x71n8gjpyekcs62rv77lwwy4p39nadfe569y1jkag51ql4d4e45pqlkvp9zjq2f0otcad7uhtbz9cw3eoq158y5ae938nbv5eg3axvwdb43pj8tbu51otn91227883v2yq8zj91l4l3e6x4pd0aqren86bxvz6fhjcjg409mx4vqkpfu5f6yj0hrr2utf5wuoe9yhviyn5l2oakhfmw99k87usv8dyz2japfyos9bv8jbtf8cwg8gcu6y6ufyc44a2gq0i8mouw7f0uked9rneske7lj9bft1a5534mefaw6baxlvypi0j6kxb2qnxtcsr3anyk2fq0phdzuytm0km1lhz7z6tb99gzw5y9ihhqyasnymkgjo15fqb7fbbfts0q6iejpoxiuced2gvg5xdwi2sqhbnips8cl5t9vok8lo2btk8kj03kh9lc78wefagimwk3xt8khzosxh2v4fksg795x53vv4l31o113ssb54ej8g1lt0py0hy3uptjpssjppst9yq2nd2c6ogtqzfiss9f1vjlh63s19josobbplzyx0s19r7cum55asb9q5x',
                expiredAccessToken: 2174552909,
                expiredRefreshToken: 5785356825,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: '6nje7sb9ziwgl8pubawx5ekg5km1r2h8aprerwkmroeaki2jxgjyaw9efwv4fg2sarznza3fs5rl1w0x2of3ndx8lez2xkae50r9zndo50qtyzttaffdyufc6ta30s1sq6huo1cd3n64ms5yx3m9xuzhrgfcmxkp6efd5bjmka5shm308j2w49a8k9xb8d46qpsiuinxjhlal9uksprjiolacp8tdfw6xx4jyt12ijtx2juj12iitvwlp4s7xcj',
                secret: null,
                authUrl: 'cnmleh7604u1llno3rpfz6epoc6pmilux15fox2g1phm6hf34aenhxlqm1gvjmltg6c2bwgy84ynphub16b3evbpj83ytyqublq3vv3p6py5p264r941z8f34490bcslhtvb7va2v1t26rmlra084dlzzvdpjl876ifedegq1xeebz5u3h2wxi48iikkm9xv4aphty46vpojeayob8j4da4ooqn64btulf3x3mpyastjoswqalvowg4dnyy8jbnrsx49leu7djt0avkn3ra16aqa3cco95lowmifi69zmxhrh7xfe16hxvv0hrqgfg2y6pskz42cp0w9cujgmqmnkrwqckkk0rv6u7h7memhtip4c69871eyvw3ylric57iifxqr5m3c7upr1bowba8ezehl2xxxambrgm7sw8im7p42o9syly0ca996yrf668569uum17godx8yo1hgpydbilh4c9llr02yxlqsj13ozbu78p0ai4vn0zxs78rd97zv1k8tktfpzm3krgscr9bd3x4ww802lf46w6hsoey5kq8ofvkmnugpu4usbf9bqq9jimt2ssee8fqqkplaz19h9wrry3qdstya5mim72j6mgwroh21qi5ltk1flebsn2cbfjrvqcw9loj37digjlq6sz8wm9gtoay4fcqa8jyv51ks7qn9vg3866vb6mn7r0322vf26gan627fi2lb6mkxhan5fwtamqosardff4kpu6p5wbvtj2xtidjory2ufjq10ekm43lz4v9kh3oxx75h8b8iiy8u17ebj46ztzwjy574u2lx4hkej1baqy4487j5k5ylxnxbwoc4nt24tqrjnhxu0o3btdiqnn8dm0nr50d2zjs61gzvy49r6l2vqz5ty8u0ij7nc341h4zpav25m0wka0s67ljf5io782z5yglcyx0l9v1fxxu1xfwavujlcbd3mr95flze7zgb1x6qkmrnl6ae61w6efgr7ek59amqankyw8856txypkntbfn4itc9p3mmn8lel4fu37sjwf9sfnb2rwqc37guxv8h2e02negq9n163juwui15gqakr6acobab7satpsdy3gtvr9mm82t8bssimr2yer210q6lim846mv3knke6x8p0v2kv01ezo1fe4mjb8x969a4sig69cj0s22tnx6gdshwiomnh5ndb0wxkl70i9zbafjqlwszbubhb9t4iodvgcr7jihtj6l1a4bds1g79umfcbbn7m0i1rwel2qezyt8pamyfcm61xabphcp1ajjvu33pb2u08p755eze9tl5lwj7kbqc2pkrjnkbweu9fnbekzna3cp9gfmj917hp6m4yrvjzeij5mjt5875f9oa8w9yplpppmliuynvw6yaa1z5rdvpl1h2z2g2hcp41svmeeijttpzygg3u8vioz3qz9d11wzlo6y9f2xah3unmch3zwnq6haagn9m9jm77wjob9kjvjoja06o7r3zcn3bvn0tagirg0mmf8u8s6q3kaeezal6pot0m8v39eimgivr43hcupt86wpck86gh04ky7kt652dssk5kxzrpmzd8na5687m4kx2vq13ql2vwtqiogvyu63cdeaj57msu32tqzqdyba6p970c7hts3d808d25pa7hlyvu5knr43htfzrkcwqrgxcp1d2twag9894ueradoawgbdrhsxzl4vla46pxafpubjv9dtpuza7572eor96lfvxzmqwpl54hamna3jyiuzmmgdclf1qnl8pzo7ec9w3o4nf97204kv4vfrgjn1sk7dxpdfpnnhtk7dzaxt6ee30nq8pnb4wxvupeg3ae5430i24ipq5y7ditk5q9ew2wl0kqu2nybuytdeewzrowm55f75awd1w233ridxhb7qa5epp8jy43qr29g2dzb1yjdv0j75yf42udxwgg4y707h6pxy6ec1oddvwrjxm5n0e6nmie6jjsw5jxx75s4hze5151k1pqiwlkd3l6p1scp3gawiph0w1kr50cxqr479',
                redirect: 'kxb466tjorj49yl7ccb2t1wt8y2nrbdes4w3iz68evg2jvadl2vm8smhqf9kim8ay9j0l6axm824lbk5fpmmqj4y3wrzfr47mqpjbtdbqibx9oivgfs6y20pd2wrevui5u2fafzgthhp0m37mrp2600wxp9m5ksrtasylz0egzc9r08jg93p4ek8wjcqbtiyhfcloikzqtms0oonrddd6bvz7tb3wrcn7pzcbb53bs3hh615ar2ngl35kfflv57gzmgfwi8u9lb2z3bcq2geepzkqiz9vwe1xtxwhkqgo4i6zu43a28l0o25dnwsayp85wtyqolss91aeagfc4vcy8blv0985b9l1ill1i4xur7ktnrv6tfy6i9izbay0u1i3e9tulirhazypju1gdn03z73i9j1vbzqim8sm1kzy3qus3s14vsk7zjipicvz4v0iysxteq0wgd5lki18u8p3vm5dnhub06mipu97fpyse7ew3xoyocf76ohjkl2xtqoyki41pb8rfo66rixpi2p6edrmdo6pg0hzrpobrtzdb9bk3dxpbnojgc9cr0l6jd5i823ud2oh5lqckascictd3gtdkbzy2vsmp2kcaf5ykphhc36xb4basslz1vdd2rn7s0a963ff8oorse9pmrhsb8jlzuk0a8njsw885bhiud8c04v0xp7uiruer6jisim3sl68rafmd7xohv0906jq8pjrj93fvmgwojigb7eugu6nlrq5nhfh04dws3i1ca6pl76ua1d5vjl5fjsecw9ofevxa4s6mfw3utb1mj84gi8yp6fek9tek3m3ahh3p3dc46d5lhujp0ra6fd6fct66ak8wnlujjpn0kf813l7hdj79y78ttm4v5zsja0oravrzjputsgu6i8kunad3lnt7tmwxkh6q1k2zqjvdqiml1662dol9d2mqpwouch6kkfp252nas402ppj9nzux5308qrt4zzilzpihwlmxgjelg11hfozv0plixyhap2b8b35zloq5p7a67krep20am56ltoec00zlbzzx19i2g9cwjj2xkm1ihedjd5m14ip9hk6qeq4l6ibck90vqlhazmmr9guzht97nckiq2hpji3f8kuaonekohsla9jcey1o9b215s3cyqdlo4hj3xkbd30mkc8yhnjcpft544jva88ovycwjszodvfqj12zhhp2oaktrrbj38p4ju0z9ry00xwi9b4cccbqvh9f0081i7vyn63xtmwkmp4mp3snm9w3er2ya0z9trmfa1hy088fhwevb5dt1abtsprnxqaswzq9as7e4zlb5gw7qao52droh29xii9ge5y4konszplldquhx6qujcnqdbuuuad96xo9rwe0pxeaei946w4th962spx46zvijol4atmbtpzmmwackfocgliwrtr6nbynmnnaijkxnjfsv3tbfun71epgst8e361ybbq7leycp17sr2v3uezxsloqyt7b6w8ctb5v398p0qyrii0wbd8og4uw23fpdo5ccd6mbbqxw9kvyu47o1vzf8a8yuit3kp8kmjjrea6crdo4tny7swt83vu0yry19uuuet27kl4j9yl9yvosxj7kr5915bkyn33i31wqdu4tkgdua4wr9v1ulfu0aimkahdchiw7wif24v8pauwo6trncuwzkmtls4o08xf3x8cb90ixr7ogbhytnp0jolpdcfcuqhp1l43jsuxkx28oybemyplsybx0zrzl9far4fez69jgimfv92lg1dguqp9k8t47z5ymjclzg5wlsok65t9m2mjatmsges9dhsy56vp49kmyfzl46g3a4p6navi392w0gx4js0ht0m65ni3gt42a0egr36lc74qmqcj28ymo2lbs10bqiuftj9ku0l3oed20gcrnd90tu5o84fl9278mea9zem34h7rbyuaow09tfshqijoh8d5roaizx3swctcv10d9vs4tzbbusj32ynngx4yzit7s8c5iodcnxj6tbrjfidod0iivs4e7y',
                expiredAccessToken: 4648070568,
                expiredRefreshToken: 8548245950,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'imgriwooaqewsx46cv47qq4li1f6v34t1ozymbmvf6doh0505gn4fcblyaqa5autpmhf86xvd44duy5vwvgwb7ec2g655xxzuxnc6xtgqnszuuycthilj7gh0ifq8pkdurc4r26ti7yzvo4cc9ttmdal0zjd92mb2tcolk1u3wx3io9df4aq27llq6nvmp8keawk42vxzl2xtb9wbnezbt1lvhzgmzsdbefj9nubzjmf4pt3m6571d4tc8lauup',
                
                authUrl: '4d849exnxnpm7v6srlsb5vn0c0mftzyga6mlri88s20osmyysirenwoe2ts1hyqawhp2t8oezi1uyhhjlwupr4vat3h3wszwxdebjpf2mrmclf1rjth31x0acahpocbd25a0mdrsm4oerdidie9px1mv2qtu15wnc5qk4kwjun8ukz8dtqx73kbl1zjm3fvlv0bu3sm6a1leu4wzfwjwi7bfyn7o9fue585o2c439mvzkjg2nc1kedq07wcvapjzqcmw7gwmyil54jumeqie4qzlqaolnu7rbt2q6qzd9ryrx2tmq15aoj3z4rmbmpaj05cc30k70k1yv9kizjtzp7kdjuzrfzdoanaepc8d2cmdzevuy9wv8w59ni0glq9r878upu3n7h9rd66yc4uxg96ajn83yo9s3jezqwf1wekbn74oyt8cuk43af3x8hw07zlnpi49iwi8g1dxp0wdrinyiog386utn5jrpiei2vpmghxh4dz1sxgyqwcb0c31rwsto2208r6797iztyuxhis7sqeyor1qhhaquevogjsalphls8uu47rqakv0znpwu1siszd6p80mi7nntng4sd8zkqaajqvb4zj0sbzvx4upqq5gj0h39sb05bkoctet0r8yx4gsbncrrcee9cybjlon6acc1zystfqqg9265qbq1y3iuia0yd3t82l703c9hz2ah483uf059v0ufmve17xhkijg51h3qghkfcxz9yb6y99wu7lbmfcnfxl3wt7vwoz7oj9s3ytam5di3gyarblg3xxhispwez0ld60ppitp2ti86ckcm23xy1ueqapws74ysxwmqt2j1n7ay199gk9qbfe5ba9qbri0uhaaigrc8v9bqb88tedfxo8k5tbpejo7eiuo373psjiqvt4ita11qf3ev24e0nwfpie8oqp8vmt1skwpxvjjhvj1bze5pjx2wd93nyerg7ghg7ig4mir3eajzlxd376gc1qzn5gv7ghdsu706fpwah41cj4put2ajnk0pufksiw72zfgnkikattsdgwb2hadlkq7xsufk2t1x2xumc8ex44d4k2maxcwn8afiz24d3hduxhh8xyfbrjm3c7c89j91gvsjuz44rhkshmlw0akcwaior2ex815dfi8o7syrdvkj1djvo4z71r5ua3dvuy5518ukz5wuzjji6i60qhdkiogwnfnomrwm970n6qxjxu2864nmjk8sdwzy8f4x0ux8woos5sfvgkq0f9pcjk451mkqzve8qbxuugldkqkrmy373iyrmbbtxyyzwfwvnbk0th58qni48p2t2vsb2e62a2faqz4dj6rz7zfet2c6khvfpjafdmn68gt751chb3ukih7xictorcyubiy322yk0wbmqcfxoe3779b5p4sow5lw9ip6987130y5usbjcv68irkqv8t38w00i1roisvwd1a2be3glprvmfeq4irs9p27d4ejok4u00e3a9frgsxslmg17v6y9wfs817pdpw0r4jdpcchyxz5obxk8qckc80376ztinfutkmp0kl3toz8kg8rotrj8py3esiqbemk62epul74n6c21jxon5cd8p0s8fd5hxvc1uim1llxxbm440nyn6p22adbg81ok40e1a5vx35qmeh7ifknuoejpwxicjala62k1kwywowj4t1cg4j6hovio8on27ggmk0q6374yz3wpzzsi4wt3ghfpxm9rfzpifbhi5sk7qx1pi3c37hpijynwd6pijacotftlbmuljcloal5so1gwj1qp4lzcff3jdadzsak35ep4liwragjh361aotwigmtrshya368z3dns8iwp85dm1pbq27mkz10dh4h84ss4j3l17sfkhdnxfj152xeydic1mili1fhbldfxmbizsyhxfxvlokm39q11o9hz644akrwmc7v3tjyqfqyir9w60tmcgtvchrn5jv0zgbw4bapxqvdwluo1vbj4morolytuqtta309785xxkade0st0ihxcizepxvt2xj',
                redirect: 'ay4uaf9i0uf27wk86n89mfz7lkh3jzeh4eaaqvlxjy3tpp1zvuks46mw5tr6yrqjqtmz132smi0tzgo4ojek1bb9uyeorjvplh3k75qkrv13qel22ykle5unr2paclpqn1dyrfzc5qivsfldyb870txllobwbdk2q2gjee0uipwkv3e8pxojmgvqbnux1zp6937zbp3rahb2q0cpylo4p1x5o0t8owr1l8zp25apgn6e99o8d04ot52jfar3u00lnaa6onec53w87nry7ap95567xtmemkjucr3gqhq1wdduhi4lnwyihaa89ycrt8ns4w7mavy9uabzptkzprrb5s25nt0g4qi5suxpn8nd325wflwfs2mhyui5673zlsv8t2gm6vt44r78l8fbhn3wno08jbkeoofxd5fxinvnkbs01w5qzlczi4675136tc1dnfn11k3zwb62lewxwa6vofv2k8i1x3qsilanf0unrf33wymil1urtttbswn6dsehj84fvccsf6vmydzuchmymmv9ayjoi63uro5mz14q5cr7t2wbaef3ajzus1ulvkeghp7odb3y82vj973nrh7guwzboi6ize4i0d0y2bhuac5hvfrrsur11x33f0f6a6c88rvj911n6n5y7qz1lzz434ixhpxnzdwkbmy2zvtco997vm5i5pah6a7cs3e0zjamffjyq258upkkvx44se91gdqkq7icrz5pelq8140ic3ykkhgj2w2edctwewirtz9kjc0yontx8nzmisrcejkk3i99svl8oegjlpguqkcufoe9wwpw1yxrmoewx7dwdnkpd5zy3oafci1alt3nd8zanf9fqfuxg6s618z43if6jz279t5vy3aa34iv9oaabbux3waixgetiwinchdvahcgs2jnxjoun84qj2os50cd2n1wry68duz3e0ineip56ho7jsoj3fsyt64hacokcierxend09xs9z2yyqfy3xtqf628a0i1rfzguct86nzya1sujddi3g7l9i3mpn1o8auwr39te8p33neg8gicy3kib5oygy7qh1pvhgur748tmfu518os8d8zrglbvqs720xmal63a8fhkix78icyoa35fpq5tyz5ebi2enhu4k5pio23bqaqz60ffdavbd7axwu5u45dgjpctp72o8wh1wzahjxk64kwcf1rfcr2ycsbdpiitnec66o79c3jdrsgwk4xgcfimvce6pwx95cdrff8bqu9gslfgotfvopytdm2p33nzwkbjnnas0mhsz25sdpkdj39qduszyp62dmt1qneh51fwfegfe27yu5664n6z7y0ewdm9hs8ict7gckuvqo1kmbtd5158rhr4vkaihhcjdwy8hphmclm7pvrs7dgqcdi189x1wt5tqp839kocgb675twp959t4r2nfgg6psf2upca5poygxhubw37ft9xe8uylxbcm2fbplup5rk4bvgiunzuoeflbv3h8ft9nfuuw3nmlf72gmqk7ptrwmxpz03dhkksa22g5fvpk5wjrumdjxd435rgyrezos5ushk6jbue4j3i0uaq8gqgngp7vytbtw72ctfvi57spd9p1n4naauq4sn78b70cwnmq2c8i48szjd3x4tarc784yr2lcxrbk4bmb6fu69dminkb71pp39jip7eisfvs5kufe6qgxgp4mkq1zm4zvfhkyqacpqhjive6sr7qtwdaxpkehqxwj2e4lh977fjhbmacs23kr65ynq4hpn3ayamnnmxf9netc3dsyqp3373bvgoz6yh6th81uwcrichz6b2bi3rgdgp5vxmdal7ybbld5yk2opfyr9ry8s947wf7pf928se8bc72nlvuo7sm9ttdp06pga51gduy0rbrg77jvdzu7nbkugq38l3ea0e3mxu37h5c6hkhhzqmndn4j6qztvldjy7j00e5mtpfy6epn30u9zflmprepe4t17runa9h2ukkeybz2traxutyui5b6t0cgs7t2tgdyd1zphsej88by9',
                expiredAccessToken: 4016365950,
                expiredRefreshToken: 4319133361,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'PASSWORD',
                name: 'oupbvmw48ens0g7nxo98m4hs9cmck06wrylpgafc2ua08z62vr9cilgznbj32ealptt6bwwjv8msmy4gm59zpayi67oh9rhgucrw77b2y6lksqjzn930s6o2j79ubra6du9q013519eu6hivold87asv2cu7oz07nvvobh9h7s89dsoi3v3ddufsokj9j8thcx3ciqgz3tt9gglsnamcxr9zs21u1fxakjaiqkg5608kqw6y7fgdgif8jogb1xr',
                secret: 'a55hv1i02r00budqw2bi4m5qrade7lsvtkz6xr3gtwpifq860q8vriaidjvhsnjzbrapjmlgshrw93vp50beluuunm',
                authUrl: 'qpca13ubyigii3nxlyfj3i0e6qd8j8vpoba0zslou64qhqt57e4a3wjvt5mps4zg0yk75ncurbu74h2cy0llkybz43p7m05qjwr5tbbl72k33laxzmdcly3re76o7qx2jhobg0s4b2d1sfn6ejyxpx3c3jxa0s8pbvmggtop6uf3fkkpexq4aceb7i8zqz73cb5psaly941qfli05feyqsez4wiyak4fu7b7wko6otpw0el1zr3npqxs1x29dh03p2n82byejidvup7dd7j2qsjvevrm74zdev74rdwyqixgoadldjkcg1pkx7v2lgmqzbyp4kcxwg5wl4j52oaxu60s05yjgwyl8tlmyz2uideqxqahaovgjfs68672xoeuvy8q1jx66mrvknqep7fy784nluzdypspgro07c38qbi81d02fe0e5ignop46i5e7tgynu7fkipkd27h8hco5z75l3n7rm6cdn99cdpegjyc4j26czsm6ko44amf06zjs1bhv871th12xzo7kl0xmbeutm4d8ghqm2auyhpsduyd0ylfny7duuymqm30ubtx5m2mzy01bev0h9sf1yd7vhcyjdbzgnzny5to757800lymcoiq5eldl6h4oeoyaseywcto3q1fa6nbj5ndsjgnnxfn1pnjkyhvfuboe76519ykdojp2ejrwez5x8ry2xmztq843p23nnxbzmv2u03zi1rx5yo2813nxyaqlbj7ad16uy9lphkssznu6t5xdewfg1wctrwy5zmhk6uhm2568mdvc564sfziqfwn9zig8q5y8gk5d6dokxo313o1blmx0muqrj5d3dyq67xd5swppxblv5ce14yue2pyrfoay2lgsefjcv3adpdcl9bk9bnfc9qm2nzrt7sx44pcq6g2o1r3arotypd3g9jbqw706dfirz40q7bxsgtpgh9vjuxjytzc60p5g1paq6k9bcr4klstokswk3sekpxtlr7uk2yhgldy6s43m0akbzilmid7vu2luvybd8mtvoov5ozy480mpuk0t4j5r4cim2s6z6uah69me8rnyqd1os851zeivb5m16yiwbsigys9ui95nbgk81j8iirobx6gj9cei78imu0srambqzggefrwc93554y6vslibdl3x6elt9wi7ozvz6ybn9bg8ltrv9lx793xjm57np21ioityfkkxc2zcqeri5oqzh4c4fil3fa5fh4y3aqj78jznl6vpkmfslau3t55jzb2d9nkem4utt50qx4mvltyi768pujm6oybrjk4u86h72hmc01l1mgogjfpdsf7vm1gwvgqntjl9ug9o2i08t08yhzezxq3vcp44yhzyr9r6jr0pp2segluewota47rjzyyrbhea4b1y848969z4c8kbmarrxkb527yh6zjvlqztbhdabk5jmqdm03qraa81p9yra0cit2rkr40l5jwj0js1miwxhtx6bt5rz2v7t5mwt6gyr6splapzemxtvsvpkqn7ro9qvsmmlakrnhrbixf6rtvtsy40w35qzjp8k1ah2hfn6aqjql15vg8hh514ldatr8iio0gr6vifztevjlg0eglcioqvkvsq36cgz51x9fs4o6x6xtukiepfzcharhbk9s1w1ezohutx12zg84wo1h7s1napit1cjlset9si46y3ts49qptsns75eeqgf41lx1q1fz3dzeuvuz34jxtzhqxvio4ssi9ibzf93vnaw1rqkm4x4f1fjwmagja0041dxvfamr91qelr4j8gvbszn7su53rx3kvjpla6r6nnl5c0ui67bxlwtutaxdavxbng7p6e2zqgkc0dp5grljwxn9c4b4do3roksvsmpicxvbonrxt6allodi37u5n16lb9dzyqy40fh1vo2ipka399b4tuuind2dy0i6mp1ryohrxg9hxqcd92bxi94t5adr1jwcmjni7pakwggv9yqilqb7f7ynt016n0tvi2g1geycgycs8zd2fr0vv7227relvj6edbhfk94m1',
                redirect: 'f0abmqi15340ntdgfg3zj1hihix9vxgwor7m8fyoeqwo2654yrf3jr749xb6poxf7zz0c6lrfngss5n1du0u8notsz8yzq3nfn2web8l8cj5echtkrl87n42lqkgz0hxaugmsflyhivxtnjriuynjiqnoqesq5nfltk40az8fbov88kyy31oajr28xx4nhy5vj17xuuzoz2ara36omh96jzc5sqj8o4tcyisezg3l9jeqmcidv8vaota4lx9gggntcxruij8z6rcbipv60ixku2rqkpfzossjm7p75k4vn51e81fks4b8kgorlppuoxwes8ttjsgap3n3caqbe6y7r8pp2yury9rze0mx80f3w6q82fnnyhlugya8faa138x5zt6qh22volzpuyeudzyu5ogq47mxw3f1rkapqb9cdfpjs5morioqulg99lpljmxrszlct9s2rwrs38tmjir1wf37kixgoqqp20einn9i57ud5fbj84x1r5z5qar2ign65qghgvvx5wvchgjzmbq9vluqvlq044ut8m0alprnehd8oozek405cthdbmoipyvamfehkicx7di6i8cmodrnhixh255yakgk5m796hr9zfr6oiurpumz0ze2qp9cfdnqqz1d1i4jefe20l30gj9az3g93kw7v7e6nh5nzdtukaqb8mngfjo97edhttp9dqntn3r4zayu6q7esxpncyof0nw2nbppy2ig1ui1idkp5hxp4obz7web5dqchcdvh2lq3l60ugr17220n610difbunkr469p5ekvi8f8bh5xa42dqinf0pjzk1y63s2l5ivnzrkl8k1ib25receypmpsr5xapi1bchzsjl3rk2ssbejkil3rfmclai4j41gsn0jju4o4mtqbypj6paqz0vswjk4679zmt4kvo48jsgmba06115fl1b75esl9sqsql7dony0hnxb4ai7isydyykwuzpv4xcht0vh8ti3b2zfigootxkq8p6kg4q55se94y066ktmzkf03nicg8hgjy6gwalfjb903h33iee8f2h2q5q71dbx64zs3iv55bepgubz3z8gq3o01csxh2mrbb4ujaoiqbvcwcr6ea3q4rco2zxj55y2cy8eh2dt9fvhiq38g52yk59bmpx2f6y92hgyhe3ew7plh991bgsbomza58joqe6wc0x7pithf9uqzvlhp81e5k87hq7bkgld4j0ohfpp8m8plhhy0twkrfpqs7jb72dpagajjmv8ep0s33b6107yk3vynn940kwowfrywap2p2wvakb269mxokw0xnd5du97w45zmmbchrtq2q3swou43axh3gbrtm46zayazdiwsuiffjjisxgrnk684bff8kp0za7omfjjwnkqn52cgaea4myqrkah0djeuy059tajr2cbyu3078v9fypnjufednbvr51h7ocj4r5fgl4yl8ceqzcs0q7b4j4t50p15204bygxewgmfnwrfotu9t4t2e1zksgl6eyiwzan09pmq1vwi6vk58o0v353dr4xw6ect39cnwt62ij65807chlnss8pqu11q0wn2nxlee6i7rg8effyaj995dqwsfij47i5ijk2fn8xumfcipsp3ftunr9o0y57wortrdk6jlch79d8oz7pu3y8b0n1k67bkuq7b85v1ym1jp7tt06zfzbxr0d70xih1hjr0r3k78dbt5fgzgd5ewuayuo2hwcc0wqjqdcaqu0qf4pul5s8agz2ambfk873ornaz3zj779yqgdaa4hi3rlvj7uyoyh0qztaffvovryof6rfxomxjcflq1zcx946k0j3yao5vif785t9k11v2kber8p1puwgaep8semm3qf6m4jwzs5hn9zo18jx66vlixj7zob504m6a3somc6gudflwn7eyvss9pf7qionso5mhdkm11ulh88tstbfs20dex9pc9by0rzp6aruo69np9l5x7l4vhfdg2xhimxvmqqkkgdjo5sao7logp1mt3robodmoeaxnrdo',
                expiredAccessToken: 8289446771,
                expiredRefreshToken: 5985258757,
                isActive: null,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ynjxl94qwlh26h0v77tecgdanyddtuck8jqzkzioox469qfoodqd2udx67i7635qqk86h59xybcsxxm18a6o8oz41u4e4yi2mhmkgmizf8phyg2a10ql5rhkj4ldjhyy1yslihcfdj701m26n28c7nw8yagyh5vgguci7p29jelgqrqwmfpavw98cprwd8ca3fsc1buw3xk3k8pe06tfq1p6iiw8kil5v3ci4w7f3qzuao8t8mmn2on59i38lw7',
                secret: 'lm95zkn5m1elg7ypmu6lhy2nzdziomh6org3y6o85yqmdyiox4ndx5it49i7sn242lneyowmxtdqm6lh27wyi8d1e6',
                authUrl: 'oxszqaluk1qs8tmnogxddnmluchrb7z8z521wrky5rvo7l49vjad7rj9vyp0a3tzjiw5jjjykuh9qn7fqolx3bh58kkiouvgznqggwh7frau03697o1sb8ebwvladvilb12zi2j3etkoofh15ck9qd9j5d6jbagmes7taun52s1wbwsunjfsnzivwnapfbb91i47u8vt0xmpc4otih0d0jqx5tz84q4nj6qp6b3vyg9pen4d2f1b8o69b7nwouyahs2c8vmwbu5cuua25c2ccgik86n8t6gculoofhu4nxjfqxufoi9w7tkufywega8l5jzmhpwjhftn25pp7qpgtsfmdgly8bmgmzo20cc6jwnpbi3ogh6l6x1q6umdy5wyqriosrus5c2ux3r9qnkrgcjz2vrcmz7ykitn5oiuxlzuuw30zw5ew85p1rrdu79pj01c13x9po3ky8maobtqh9f52syqf4cgxobpxz6fslhrfx118pvi59jryjctum4sbsig554348g7mr330vtjfw58i3pu9u5z59kk8a618s6ig998kkymgzdozynbzabjn9vn8v063o0nzh8fl6dvfvrsme1h868tpkkc43ssfcd3bm7gdavgdj3feu01oxovt6egxggjaejv79am6hpbb1k65yaw183tw57hroenqgqbv31tdpv8lfhpleur64k7dqjwibsxn3pgmj02if46udy9ma5xjc0plb873p30d4doy5receamql5nq5j8spsl50nnyamiklrm8m2dyurd8m1miws9lrdcw60mxxoh9m9f63nvcmvw4jy0lwaqocnr852nvkrospu32lllkp6ah8s0nx7m03ch5duhnzn10ji2tofbh8gcdmovcfbrflfh1lpg4bmokt5g6yw6s2yhsligj0zikxy2wfqszhpa28o67cwcj4zvcyea2qvznnc1kek33lqoh2pt7654giw0h83mdnxtjfmig1uwi5or3wefr6zltubo00kq6krtq1794wwgqc9o0ilg0cuph3qozw1l1gioku4i2c7549hdvp8fv05laeje7ntearcizsre0xkmxksvaxh3y9syzmj7vqy1zx3k81ll4gq9si6jdrm7z4mqrofmqzjvkfb1pwbfawca3clg67yrfqu3k5uj7vz31x6ed5925bhmw3nmp3wfg8vle63n8bw8ao80yhiud153ty1za8y4ehwxtw547cxt9adwodn610i4w51uwn05etcayxnxwh5p54sbwxn7cdv05l9pj7gox3gkh1y0siymvwwqepiwxdph7tnmmca76gak459ydgtgc6zl3pqfn1bx9jhwn88ni9igp4s1a6a7r1dhsp7yypiy9s5eou0iv82smdi7pb84uu98wijfkb4d446qib90zgfupqxudr71bts72qyn8qhnn1cyfxkkpg6lq7cxqosci1myaiu8t67kt8ofhtwm5ceuutzrz5mcl6cbi40j6demdvvuqr39rdlu6z2f7kt0abnpjn9gtnb3590os2w25n3qr5tgxiotvok6cox1pxrnyce6hfju3gzriwol1kj101e2djbd4ew31ykwsk0ln8ws7t6cxrmud4g9kgkr75qt7pwohyvdad4ar54gizjlbkcx79ndm5t4ktet8usmqo28sccspzcy47d4ia25wqmzyztwfyd0qw3quv281vb14b62kprevbvk7qxhqgrx4oqz41a1bxicqbv2i3bbol458tgadi4p5p3oofalsoyj6hpufzbfs0nozb89h3jld4havzjt5wdwvnfvv3qzo69f10rz2fi68bj89usf2ebuzwvl86rxgj2hlob00r0w32oz4a85vz7ntqgb1iau9y0bzk43ts7g92xpbdw8rlvt1br5iq9mv3u3v12t3xbhu1jdmuum6jsjois6pzlbigrm2t4610u6zj6khr8h0l7nolbqgiq04nqpiti1fc3i1vayxj2sr6gvp33mxx7tg4uudhuhrm5ie1h7f1iflfhudrqkaqvq',
                redirect: 'gi4wlwubj3ipbaihny78o5nrgnd7f9bh1h1qnq04wc2x0mnxuou0ip5u146fnfrh207gy4j3t4zrs8wn0a5qagkvh7ir7fkhbvwx4dfy9wc49suvwr8aej16iae26a3qojsmgz4k55fjwya2wixjlmqp0bsx8o8if3rjusl3qb7lozqatfffz8u4wmy7gylohs71jkwlncs9mmk5o7gnwbiqez893zzwep15dg5kmxdm3mpycy75zweyoitphtti72joemvav9tyh99osz05h551m7ypwv47u2ugkdodtskugoijfp8q19hnlutngi86a3ixkh7w8nmw0njp1sig7pg1ged5tcww4hgb7bfhpmk35nj1b4wzqhl9wdem7cp36yyofwbqqis7shl8rkeeymp30ifq950dcweyrx71wppwb181wqupg58zxv5o8mmcy7y8c9yf4xpzmee4sl4gpi7v8mnekzw2m7n84dlfwrmi362fdauerzt6gsvp7vg7bj523psgxwhqfn35sry0ipwicea4xf8rk08vwjt7khij01clh9sdm7yv4nmjshjpb3ymg6hl1h56rbahf97tcmjllm2mv4203boohlwdg3z84l8yf7h9qxhrt5l7901zv2ayp2vah5c1mgksnfvrxjk9bcqnaik3mqp7hglixif50arxw2b1zzv3tli5pcows29060prv6lm7hgfud7dzx8p2kwwnhufhhtb2yzcagnn6j4q4kpnk5klqvaxattp0hv3pgdaienhhvpldlldpmuclsqpgkf0skg7nekwdv0z7rsnkfox2uqhisf44v5hz4q30phk5e219bdrfo26uup0aq31j0rkaunz5xo3ykafdpn5gk367gci9yq3nw6wi6ze6altzqtohi3yphcpde7efvyoicqc8uemdf5o3ezjokbgush0yek6kn9zkx2v8ckdmhiidbqy8mnypbf9kwh8lhlyq0v39w2f68gelc2zibaswb6z18kf3r0ncwe3k033223pxs3ebdc20ulkthiibvekfk5b7lhr894eujar5vai81h8q0foglq011288myqo0aro2pek5hbbvq6pilh4g6yqvidwkufo8e9nuzki9ne6zvmd2wcmv76n7r4u220wein4v04b51a9y1x3jboi5a3lisvaz175wq11yd7quwor1st8639b9orqpsnzaxe0iljuo5icvw918xyu3z1zxk57y9qog48ov09oawhopszqvjtzsus6paci5aqg5g7be34d5su8j7sno5t7t14u6853i3umiapkt2ievippikzpouxwg7as235ay3sha710q12m9k5xqetrz25q7023r72ih37povvk1mzgil0px7xhqew7tjdqtvq8g7pfn8shb4i6u1v8ni6gi9c8d7ugswad1zeb5datmdkqhwk8mjfa4c0is69f3e9n0l90kdjb04tow5f7v7e4gn4y2ooox9edtvgpoxzkqaz3kn98begy8llzyr3ofy76e6j639g9lvaxxrqo3p36qn43ubrxb0vasflpt2r01lo5ny7dbcidgkizzhh4eyxfemo09df7qts67m99gvzja0heg0wwpwdga7zezzosnddcvgxbxcksvhhnvw2xn5vrjfdue1jpzdxps5muiz37z9qg4tw8ki8siejozw2y2j4u4008z4199f9sfo40s0tcntxa7la47mr3vb9fsnr293nwof2fkktr56sbjkwdvrqztdiwb77ozu562jfy5skw6jk5323ywrhycwed4svugm3a8gqz8mv95h57eewo7rcczh59rdoi0u0udeshuui8o9hoq8yjn4bv1g1la1iaij0d1doigw90uuqankb7nevd8p48e7yndvgirbntbtr2vjp6irtqe7ghnbw0ilhamp6fq44tuepokfzh9m3xjlnea6mdm48v0tstmuw6ekwq8lgz23bst9dicxlyi535mrbrmnmd4ev5h4bkp6mf09qfj893w9ddepk7zi3i7dhy3ek',
                expiredAccessToken: 1122851831,
                expiredRefreshToken: 8273787510,
                
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'PASSWORD',
                name: '6z9rubf2z253ik7z70dh0bs4ena6gm0yxmydkxmncceh6n33wt18yd5v2sccsqjhmkvsb79ycn1kb3pcxfsjj4h3g5p5a6i5y6sivzxlvntj2m7h5n8ez690tqn6wqkw6kvbwqev510qjsg5wyqj3o214c38c7fhoj7ra62irdvlv6b3aq6loe0a458htkl2jvcynqpfasyg6xfj0ihwwvvtioq96d0usk8icwmksgiw7rgtwswdlxrcf9p48w3',
                secret: 'kzhajgi5l07t0eh72zk2vjoavc5ybnh4l3wryqx6du68rm2ghb1hl2umpo7d7cshmqtj29w9zdytijptb4nyykmkgy',
                authUrl: '2533lmh8u43ngaeaubxkmirrzfmvsg32ziclks4tf3yfx5gduphhxi1hnnin4d220ksp6lqgajb5njmijlbynrjagp5in0wrl903rly1qeha6bpcyd96mivuj1f70e0w40srnlg06z54e8qo8welzer5vn4reegjxf91biuweinzn2kbtglm0vzmpsk7y29nzqz3ddzopbbiivk4771skg0ye3tmnuj6oafguhct4c577dfg172l7yjwzea6zhbvju58yzbs1iw1yqorpt896urribjd08140r92l6obz4fnsnod1ooejhnc55vkgbnk87w2jy5eylgjuyra2o81aw89od9e3ouq9o05axnhsfwghs9gej8xbhgfoooasqvzi8r7wsap9kjcktpc5rlroypf5g2ijurzo48xbtqbr50sa254aa1el12mrurtzr2j4i2w0i99io7jfntpquv2ir53di0qfqtezbv9anxfgxb7q6q77ofq25p2j5qell2op0dqgc51gqknwo98rbx0xge0881riptbi5o6tvuhx1a83zaevy9d0bp91h0c2in3hyxbtwd7h4v1arx3tftmcqj1xvd48v291o6rs0ejc9w1u8m7th10gbr2su32mjcfoa9zeq2zs9jd3zlprnxcte01ptpzre5ffo8jaf77zynvowuub9rxjxu2hbjc78fmk3pbo4498ydli1yk1yn7861dyb7vxwp9j6ix9984yj0ybq7aatlghb9znj9pg92uhxvaiewqr9dl29u4gz9o1figccubo7847oo2l447jxtszaw2jptbtayq2kdxn6ua1frtpuco9ksbezz1owcs90vss7h7eokb96io0c72pjh80atruvgm5oklsxoxwdecequa7n4x9s8g2xpbe7z1hw6c4ylex3l94c6rsehs52237i7btewmwe7z783def5lcyb2noleqvndb0jboinmxw6hny5w1t8go8q6ll45efxnc20d6bbswqxas3ap4kbb0ws1rww7lnrhiop7w9dhkm3mo065dg7k0e2zizb6r2mylfsqjgwfxzu1p3ta2e3hgv47hqx7lav6zf97vav5deg2dj4dvrv3g3z8da1en2xer85ywq53solmva9vfe3we3d8rlpynhrh7ok0e8x42jm4oeafodfb3jvpwqkurjz6mev6vn1sduk2ubdu38bndwo2gz7gt39kuc1c73wsykrpn7sbgom3xqp17j5u0k7jco07sonog18ymvh5nzgnyh6aaxxrg705dmssu3ik6ei78vnp7kduynmrhikt22lepo1erk3ov6vukg72v5z87zn4lcpeedij999v7z02mfnb7vs3clqf3uu4e8jizqbtmtl6r1tyem402lomyhrqbg5pm2eiyiebx3h7t4vaxw6moz5nok1rp66qwogq2ya6ba3igqohgg9qnp60tfdkh9kxn2ahgsj6m63yiitc1usgkij6f5gy4nir42060xalt649dxbn27rp3rr5jjiusyzvvfd7pwrr4cgbumvjaum8szy8hcp788vm6hpllqia8l23wbqrp5ogolhgsl0nxkje5wtgxlvtcbqsr5r6v5bk9c86va3aczsngnzv47vjg4rf9kliinfsbqttnbmo9awtgfevhps4sozzuz6d44mlso30u9q0redxdmof4ocf3snfq1ukp88wbev13sa8ak85wvcspadr7ru5qpee5jxeh06txy3xkb93hifzwmu8du4acs7huvyiyltwcnypxeowz50pibj9qkag02xu19yz8cv33n43fc15r1i0pygkrucpwu0obud9rrcvdwwz2q6pojfrshyt2k54468x0ja2tor0t85jlz78ll8jbiqquai1naout0bpc342e7nj8k7hgjl0o9v0kvbthqqws6lu1awn2vlkax4hv7pgsp6f9ogpj1v5zb1zy4oifwqjiy42tb5dk08j8lpcvm9tjxb0kggu72sv2b0gthrtwhefb6vfmdthvh1oq7ujmacv',
                redirect: '42ht6owfzlam72x86k6gax8qu5a76mh74mjqc5g39hknr25dycwlou7u375fooeap9g53pobzng55zaer1tdlbos5eh3ma1jywy56mrpe802od16oqgxqj72u4c46vvv8q46s0hlvmf1g8xskq15sbdvnv99pjsjvjfstz9i5skpjdiow6u5l46m9myim8ivpqtfyefbcceasad90cb63mh2ribyicr76rb9yom38bu58wjdjwqwahkmsv1i3lpp6dhxsovcwr2p4cy80g6bxdolv38bvmi3ft4vcru9sp33y8me8l62os3ajo5w81g46ce1nokqbqywgd2hvdquu8f34qa4o1w22w4gjnxx8qq7l4k0fva4g0qpwxmng1uu9bisqw8i0e5sidfhxjkitkunulz2wrvp5o7ep9dmpex9jnruegg15s2f26johfjor7jrk155gqgas3ay78jc84a1fh3ko2db0vv8ff26kirye9kjihxoooppoprk4ri5r2ag7bypj9sxm4i3od272excbdimfuu8n8kroo7kbnc0maakhk2exdxefk52tv2ypu9m1hq8q8hrdwhoisfw6sg6y0v44eyt8fp6zori8bagno01ezz4gh3jltj3rdu6g3yh9y0njefmvsl9qwe726k3rx0oe1f1lkbpmnfsv8r0q3l6dc6tzos41nom114b1biu77z04wcea0t1gu7t9six1noqpg7gp2khm952ri2grmz88nbkk9bzvu99yowas7m52ey1portt79f63maackrq51q0w73bqtcevht8sgcjk0dvbzwqtwqsq7w4wkeqphhlpjeo3kzvzrwb2vys4zf4qvoq31ff448xqj4402uuqh4evrkn1o4ui4unk20h360fg4b7i8c43476cxvqz1i8cvguk9z64sjyjjubt6395av1u2xvaw49b3mt63eokhhw6glomnzajeoeojek8d4v78jj3t08yn68wsas3zhrlfmi41anweis7d9fzgb1iu4dzspesvz7gry4itfkbdjtradpmtpkg89qwo8hpdhu4lfuuvxoksyzkyfhfizrecj8qss7zb88nevjj2h00wm14gsq4fut2j0yy9x0cnuiqvbeh8rtezq6x8puiimstldt35ac94vny9f89o569ipn3lzd70tn25990elx6ykxhsnorruzh1dk3qdyu5ifovkbjz0b3onrrz3ojcdifojzcoiav8do0doaby2h63ujfhwele100wmcwuluhqb772ntkzrolknzi2mfvv799cz3dhhdug1wrhi73owoyzqdkyc3e54b3lyop7omqkcmuk6fc2up7mbgps1e0t86wndg1aj9h45ms2rhex8viwh3wquv9fhl9rguoaiocsryr8pld0ygdn6r9qoaaju3vednh7qdklfy9n2s0n02fpnbn2xm7xc006dw9og5uckiluv6kyt4ql6pkk96seyuudw8qy102i4bom9e567ygmcbaajs0i62mm21hubktgn17s9pefjry4y2k81lw0syje5qdvwe4aaasgyh3ff3hrw4fvr8n63dq3h2ffrlx7vdmq4kyflhndg91un5q29sm56kh32lgqalp9cymszcxakcnhi408123tv7v3dpvowascqt5by0mm686p9jnmlju83awqgec0ju2mcu7vtncg0e2j0vjnrrsye0w0vywseqxcb0xf4tpele6yk45lrt1mgzucv4p2d9hjczg6zbp8n46kba1omf30n4sqhrg02ebec04ksc45lraynihplzgacvpbau7bjs3zuruu6jq171cf8a8joe014kf66p14ov4vol4tl6irih8dkinca8j8yrkuif7vmbnvsn8qrd7fmm04eyxhtu8a1bgbp88gn6195pj7345255pqu0j0jp3ay61x3y8qicdiuq6hfivqo0edrxt88w6z70usdtrk9zz9koxkq4q2td8hxoz8l1a5pvol1n8wf2ma5m38kvmsd1mhxyfacynpo9p8ek6t8',
                expiredAccessToken: 6292665987,
                expiredRefreshToken: 9221024265,
                isActive: false,
                isMaster: null,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'gktdmppgylwd3nx1y6q4zw18budropra9h4n4ourw8nxghnto4bubmaquxu9d1ibj4bphji8748isdttlcnriwcabu0z3injw0afiqtwude4df7z4ovz2u96k05n4hyqd0684u8ydmvz4xgtt9wzb1wegu6v4betagyn50txclm3e2ku1x67t1sda2yw2w8kf0rchhb71m4p0gl15wm57gjxx69fuz60t9p3gzwzrzvx3x25u23wcdgdyi51q08',
                secret: 'iky29oul5ms6fjgehhlzjfjkmcarowlnp3bai46b6k68vb13nji9hauhf7sapatucetmdnwf7rsu2m75fm4tb3n04u',
                authUrl: '38myn6ucgyqybylkadli0ygyfqlnood0v5xp3mtk712000dxcjzxfya35kzf4fmypwiu9y37inaors8xoemj5kd44v3wnomvxap2as5evx0cp8k6gpexs1n4i0gbb0s558wo0466k1672gxmb32o7xauz6c6twzw20frmhyw1cljppstnwl14b2vc91y778kxc81mrjlye8x7muqqjt9b3snl9ysojwftqkvzgqf721437ynflu0jttgi03k7ftmr0dgrug5yagty9002x2q934iqe0083zxkboc4xiutdw40ory9nm32n6hit7k9deiv9l5dsiz9zw9x6tudgtibvp7s4f07bt67x7b4fmm5dkkcgk9lrud1img496kgek1feemos2onayk6p3ufwrgllx08zhlfvztgqrj1eucl8xj41aaavpzr9mzecknok5mtbddl1issmqv868gdomiimgocqlepjo0krpuqcn6sl2gawcfomh4j0rokc3xdbmes0bay8nylf7yjpu4lnigd5vxaia7wh75j0vvyus6hhn78gel8aee4niqphlhk85xq7gfnllz0dtiajwwkz5v3afc2nkd9a39d5sd7jdrxvav2lp8h5040k05mgwqsvaccd0c3ohloah795ir8oqiq3g4lcr3s73znzri8m8wusomdyxqe09lihpnnrqaat1qul8fpvs5r7m7ski0w67vv8b732qf22z2j7perpu3ulm3vsj6n8ti9hmffv6utqmnpmeb6agyfb377e73jtiwiooic0ep45cjvjrkuslzq7b4dwq538o7j63tq607dclm9y3cvl5p04fyulwdlf2l33o5n2xabwvc9ergaarkyl16bqg88jcrdm8jyn9fr54k083zwyyad3uc3gta0o7qiu3e0ojjurw73o1rlpfyruzqbal7vrxashqdi2ehdnpqqqo3nz1jjvjtpe8vx34zs38plvyfkrtxanxyftx3efzilrnl24qyld91eu7ve4sliz5kfmcsp6u29ossaz03s0d1o2gtqb8nus81cdh9rk6mmzt68lpzalisa4wynd2q7f57g7ul6b9vw11ur4z3tq2y0y4j5v6mmffvxktjusz88x98qzff90tl28zv4iaaxncg3ecaom3qdar3ay4nffko34pzlybp5nabbotvvxm0p7z0y8q27cezznnwdz30pgylto7z4j11fmkk40vgx2gov5weju56dwwzjwtclaotinc26ce6zh7djqk1zy7p3vquw30xxayp084ovlk7o3l4vrwk4fbtpjplaufh2basw1bv2chra7dppwz2reczvsneu093ly2xhehxkmmpcolrwlhcxj2qugsbgj54vyy5vgo2skj8a44m91k9gx5bjt79kkqbdmfexhpm2zo1ongkf653zl04a4ak4k9a4kb6czjtw4qhhd7l8lktv088k144iehcg20m6rslt70b0dlqd1e8jmfwqezyezfddziy0gv18hmsiwjfhb7vbv05azqr1okdlvtnyywiljdvdhitlnee0o4f41nopya72vle3i5q1zgcunbf3y8sxyck82ikw2nu7uq3yxic8snwh30g9656pbnz3l55eipk0lbnldqq76jaqqrvj3bj4cyjddimmfcfs1i2y9liyxid30i995k4m9osvsesf44yd1pwy7i8412r26qwkf2kvnesdml3tmemw67nm83mlz68gqewox5twjxwr7byt3b2bewq3rm0o2mp8zypo3hx7qcflzjbci6hh4aci497asl7panklnto9pz9z1nnexoan5s5ezuf5cqbgvrpmvusyhxwulozoyh4eavnkvya68a35rqok1e51u7szy4e293nu7thff3vqdxk93fwy5g9er30h38m8mn1j8ma8lu6g3aj7zpffs4yp1idaegofm02cvkttxkad2dy7z2s300n9eu585jpqbwj6mnz6n0lel2zsqxmrfnfivp0fbbpnqddc0d8e364w88ys6icx2yv9sqt',
                redirect: 'd7647gnm8v5qbipqrbj1t6bqdov3qiqqdpa4v75u5keltez1mxjvh3h0n1267z39rsa410fz0yhaoe0b79xg5vnsmyx6uqwfi0ykewzmnhmswn58k3wtl4mts6wjamuk6p9kkq7g7703n6k7fvslre34fyz2qsfqo39p2by01eq3uk6qahvx534folpiu28uhek8pvkf4chkj2p9azrg7xhtr524rjzna5ddebb2v0ymyt5pu7zac72mnc3tbgs7u9odno1zhw6iw0kxw3kutidxx8u3tdj8zjslnaneibpp6kidtiagdm4gv2hnmjqqxldm2ph43rau53ipijoql3fmnf22c7yss48d2wmd9my1wjpfgkmzk2rqzuxu11z908rr8krctdx2z7aq9154hebvh2hzfwggv7ce6au2kjh3w6xtx3ddoxd9n2m19hooorvhv0q786yibo86ivlbs48atg0xsl2ei359a9s21npu5nssxhzin995vrh7wmw1l044be6nc6a41n7r7vd6sjkbnquvap5w2v4tm28yb8e85dsy4esz7pydspu8ak0l570ckxfndenob5ftfg5vwhvi6qj7kyiq3ilprelzhwc2usspjgwzirnezyl73a30by503bli8wnzmgkpwffoa0f2gkc3wszplf2u3jyj7mnzd1wv7pt4bs385xpmi5766u21ucue5im2wt45nlwxrr6n4ijzjbex0zkqi7d2d4z2xqaz9kzz2onbkg4giycqixkhzdt96qz98viad0ixuy0jqfweiepwjkjmfxm201bu6p86vw5l20no040fw6tbwmlmed8c1ynqgw1h6zjp6l2n6x1b2kbc1pge4zq1ilsqfojrusqpj8minjg3gus91r6o9py085ys2yrmh857tqoyar2j62rfa2gl6gpcww0ox91ojaf4j6wnl2s3ctf5bn8wbzeqv8jvz7q8xbqc6b6qab0g9zdbjxbdzu73kxchqvnezbtqnm4bddrb3ycvr9us08cwanrlz6qqspm4tg50o88zq057mld5wrfxvduk4rauojgzfdrs1marzl7kfoi8hras00xo5xc8cboopxywrk453ou3wse7xdv1oi8g5uhekg35dngyh29j4fddx5ezvsj96zqgqsgdazwfce266zolgndubj8wdzsz842lp8oh78euop8uq0o9yu4ppiuelko7c7ibitvgk0dglk9ystks5u6wlkmd3qkoni8smkl2c7v5iy6rbks5vh93u4jrjxtuslgqhnzjrtab8ahez89iwitbondta06u8m2ngz5ggb8csbaacfv2ryiqob5yufum0c1864p8ub9gaputnuinesvrbuvxi6ptrkatk8ka7t8ubi2ggmhw27n1zphjjex8p8iwtf6pz8c12i0q433pte7e1psjhh6bsr1yg6so4qyae7s0b9rtxyw2vlx0ml6ejnp23um89pm95rhnbw9y9efn8n5quplb3rdzyrltzckzykgkq2z34host1mwfvntzjsg39lyhmhulr7trgzspqaiafcynbyq1qqbrci6n1r9utf1h3c0b6oj4e1l49giws3gtkxgw9fdcbdur5vnzpbe91au471zymxwwkktp4115s2mbly2gpxpm1f5j6g70lrc66poffmah33tvi6iyvfv5xwxmjeyisct5tmssutsjpjdcapbj20akg4ztvg2dg9d814ce2f8ieqm4rks1v8ai1v0gft3yvg0gzdqz2ctqpuoclag7xa59t8nezvrpkhvdhpr99erie3k0axze38i9xu489ln9w6wgj9j1ec31y88m8or6i9eqiyyqk8y3x4pb6krnm6py6yspx33i9n34h1n2u1e8bhhn7s3w9n88kk8pwahxcefv772z9om97414qsi7wts6opl61o7z7zgiied2lsrx4z1us4rc9s63n68tdp3ge70eicv4v2xcc0z1aowoffels1pncsexs9vlsoop57pmivwx4pmnpwyb1ru7ciz4zfs',
                expiredAccessToken: 9927709051,
                expiredRefreshToken: 1251704632,
                isActive: false,
                
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'ib3rjr7xyawpjk74rdfqszvzvbvwv638kvrkz',
                grantType: 'PASSWORD',
                name: 'lgzztphxgl9wcc0la6hwkwhd29c13tz8yvdjo54xsgysjw8jyoe7mlr18dgwaw92yym2m221jq5yk4kfsmeb7hb9n4k3vekyav3e3qx21zi0ngjdl714573zl6qeb0vaccp56el4rskezxhj0zamdufhessfx80cinlg6stubjxdedcmq4u45ndka65osz2shzuv1ip8830h1nff3mgfoca1apm2wtx4l2wl4xj4hazef6x6su79ctppedvnxkj',
                secret: 'nkk6b62fdakjmt0xam11g4if3x7dvn0e5gugrupgcpsebm3kdfdg679nmzntfpk8emufald4t30ci13w3mrq9uas2k',
                authUrl: 'osnm0pjocr4pduckqjufl80cp30o7unodkh0pc24baisj2wqjmbnzz89f7tmfkjfdb3sq4mqqzje5mrzln02q04zypi70e02ji10e5ta2a8a3ybrnbmh9ba96ztnrv3vmqmj6l6mh3ox9a5q3qoevrefqaoje3rpljk2va3v8y182vny1k4kq8skgzt52hkph3mzjmra8juw1joz41j4m9ng1yqpvxk4p1hyc352sxokxzmdnpjgm4kf4l5uuwugxirhncjn6fz2dubvdmm965vf5bzgtek1bz6g1zrg7wbabny3mxjul5wxwycsgh0z7xumffc204b8cv0kvgbni6xvmq03dux9w1zcnie2uqegief13vhwuj2f1mbs3ftuzo73vrwnqvys2e5ngtt3hvjdzj9hyvj6trpwjct3jvgk9cpuq3ktdxzbu26we80o3dc67balnnmls5l1ho5jk1ubdv374mn6s6n3013ce50vp9cmeufvbbfjoem0mu900u5t4880huzaud0j2hm2e2nwqiywqvlgkegstxhny9zseiqxon4vfwp24bt2u4b22hhjrghtwuk9zfr5pggmzo6vh2vlxn3lmkn8ztu6rzntp9d5xlxh7dc0aj56toe94h0fjw2kmmwgomn51x7csdma8owjlme93fzwyyt0fnw9eyo21ncegd7f5489r64ygjwz4a8p6bcwxrtg5s8u3k2qd6gmz87ewjvan3put024c3p1pazy971hl9pzu7g9r6c4ht1iv1ddkg3qiwrrcdgbr4d6soru2u9xdiyfsenau7ol8ca3n8f1gag9oh6mx5uo69ge3c5zgwr18d9ffjfv0ge5ozyc5s52sbd6w51jk09cyx01glcwl54w7ysv17jwk2t4r6i1yb4x6pztyabfd1ui8np3j9awzpktv484178jpuywtrtfpuj51dcalcgaz9g2lbhggqdnr4638la6qjl071aq3zlpn9rfrj5en8uvgviqbw6d43c7l1jqjhna9e9hpxt3xawpwvo4vmnv64vvjzhmzi3voe3bd3bhiydopvd5ihn072ig3jlyc87slrj7ytp9f4sbalckefnkgs3hldlat6owijt806zkhwflxqshx4wi6e8k9i68sp1b5a3g40bnvsvodi3z47c5su6px2b7ifolfetpjle8nlgqll6ydkbaiuhsr35abkpxfs0am35fso9hdzeuszphypbqjp7487zqsgdo19dcuumtv4mwlyp35d4uf9ds9z9eo7lzv29q0jymu0byk8bmte39ysk3hu02gvqoaa2av562mey9462vf3lgbaedf43ljjiuky356o9a7bn1oz76tafxvgmsufz0rbrwcci6l6ezth4fofryke28olep3hryfwexghle89gjsql0uds1wo35krcwnmx4sv8y8trb8dj00ohkk6edoiaj9w2gd622c4074z00ihy7yuvagjovyurht37m3shdhojebftidx04bpp28xilvamg7a8amvc19xy4i729jp1gbl20mxetjsj7mk7f43x5pqfci9qc158rpok8z05clz4pzjeemna79bz7kyszm1rchzb75vpdsjtz58rp4zk4nt02963679165hywfvm9b19jlldikylbl9huwoi928ibxhzdhwhbj4myptup4hp7l2i30b7nxwsd6pmpsu6ic9b8jq4q4wbsymcxhlcr579qosxe491k3i59bpi9yn0tp6tbblahzjwgjycqnt97wq1tc9kpqjw57cwijsloez94m5o34ypnwqueripnwzy4zoer7teh3zgtkjo8pm6jx40ynglfcv6r83bezk7lzqxq0er7q34hqqxo5lyupew4lgowxx5b7jgte5f90xi1kg7a2vpv2kkllj4dctsr5af8mrr2ya81swwwivczxs2rijci0virs2nzvw8z6g3gt960xph1d7zxi5ctavot9pytnh6yiapr2etjcsg0kkm29sbc57i9a5h9bwi61xfqd4hf5qre',
                redirect: '94xsh8nla7n5ofwblyfekwzsdzya63fv4ejvz9l2zklsp1nyxg6kig0nhaa54se5us0upkzjzeg7ch87pqtzoen19uwk19fgqkc8aqtitnbbip7nv4ds3i6q8s2wx3rc4j4024ak8c3iqa2akvu8jztqo42ug4ae705fc926drfhqd2pb4v9ih7bt6aef4e9qj4392oq7obfvb02qgl9g0yts22clcf2gcockfw409mqgc7b1mee76bdqkgvf2mq62xizmmspek95xthypu3dv9th2s1gh7ado2ir1xwr34juinbmgjq0bcnboorqntd9k2qcpip4b5ocriq1eyzudp7ij8g2gxlnqzrdbrp51irh1mkuswder28rr8dzaxr06eqtxt39n6irh8yd3cpr9pmfwjtsdrrkqoijzb1she3pdxoumxukhfqxwlac21g28egaq80eazyhps7elk5b6bdum6qx9wkk29ah493t89rpfeli0xifjkvsryexlqhw5br8t79t3ouj2jpajfaaf09akp7bq9qz1pq6uvw2j0dox51pn2f4v8gzi1teeaiv9uparavu3dl63zt9fty8psr2okb170asgukk94olj8hesvy8obblrdl8unc1ubis4gwi5le78beoc354wu7plk4g1iseby26srav81f4ondnxjmryuledmylpsuk4ow99883ng5opwr1zqmzlt9e4h7pnl9tnhj2r5eqb4wb2u66dug4zpwh77j92h4mopuhv9rlh3y7mhfdjpc8quvbowksoto2ek6h29zldzub8y2whpx5i0fze25erqferhgbengxcljvzavcstkgq4p8yijdgxekq33vy532q0u8mawisi68t6gungxuy1s1m574vzi49ie4eyrddifb3nia9ccdcshvqxpzrl2f7hcgmsgw3sq734fhow2qx0u7bobd5w5qlb9eryj5h9g5f63a2fn379ulmou9f7aespo1ka4d4iz1jn6cwxa4ppbl902t3pekcuvwm9rcxbc6pa2nk6sj3zarattlkwfc0n9yuu19falnqfrcrc08eb8nah5p0bp5ffyk7sx0hcrp48tmrc9eg0a3k11cbs7il7thel3x981q9l9a6sjd5jr1f1kpg6f14ur7i8u52yhj64xyyqobcbsucwse7yblwfri9a4qrodzv0pitoxg7sxxm9luquab7mmp0lvtim75ayei7or5yjsxex9lgc109jozczizczrbvfxgzp20x0oqqsimclh5mlh3qjy6p05sv3ogt9fzgut2hojidx6tchz7xz3uzspdhjl3ke2vk19yhurjr5yan3zbhofwn202pdhppd2erfjmmime0qdk8jbs74lnv20diiknxyk1623kg7me2ffsrgf4ewhuy2tixvkpy2zscvdkyvdhy3smyq0fq9rdlugecc9dpnjtfyzqx1xeez0i03fkc795u11yjxs9la3erfjz49e02bh7jfozqcs3tascb9wnlk38888g88d4ujn3v6q40ys2gwq8616do8h80pidwsqi1h9q5ieoiz1em6o1454y9fdyke9ysqv77yvyqnc7fh50cmr6vocbpn2abudskd15cr8v5yxxnchdagnrdofireqb6ee3isf5pdxx7aa7ymebldvhmvxh55ogguc3i2df6r6t9kaqoa64ou167pvuc1uygqn5g91lwvfn3nlyaorhdqlhmz1bv696w7hflwi7xf3doadb0zn1fnjg6fm54wzhq2z5jxwetzif7kaxos7hgsi4p2bl67hleupp87cm8fpjlntwegrw1urahqjxyflb7de5ys7wnm5h06k9mknkjag8pr6nxg95m2ph26mo39marmz3osp39rcs79xy0zae9m7ejagrm7ogo0ap1n05dj15l6jezpqdrv9af43qwyh7tgjyi0xh20vmv1abjsqfhpxg7g69qgwc31klohd4i3pc9eei6f4rg4fp7a8hgj52dnhea6obkjsji1je4gnwq66gw4f',
                expiredAccessToken: 2345693504,
                expiredRefreshToken: 5198312425,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'exfqgx7fo7is2oalpb7ij0i9bqznn9c4cuc9dsfe09i5rrq0qyx2zraghsxq5fk1p6myxdyy0951leujhn0941bv1lewtaptavmhaqohdsvnr1njszv2yll0e2olb6n0i1epqx9gy3rqr6a15oakgx905r3n2qzgwi8kt5ft4w7dh25f81ke7k7hjcj5eetonp02x2xz21hdrpdlmmzdibhth7ot1z7v88p7knwzu92muqvhs31pjhnkh1mvbd8w',
                secret: 'nqumcuov7t1ms00sm9ias0ppnv452b1kneudn4xi8w9mfxura3vv8etd47xjsy4napip8cljqc0cc9jztrm2bf0hsv',
                authUrl: 'qymfmzm539i8ug948thdhkbv6wah11cu3ftu99lk2x9cq48mxfsdiq58po7cbqxgxxdk91udanbymw2421kfhukt03x7uuoudkx8z7nrtyndqd4t816lnf3i1gvtg1he5i2htyxk6zyg4iemkj72fquossjawjpfug2t4wezqikz3fm22fniucww0vqoac78zlj73olid789dlsie1hth42k27blp9kaekso0ifo7rtgjkcs2g23vzkqpbzr1pb0csrg4j18zyu2l06nr3itpbx10e4cbfytu71aqqy2vt6w5twahbatxarnu8teg4l6rcsiufpptyezl3tytgtvskc7unccyvtdylko4l5l1mtqz5jfqpsen1h63dh97lm2rg1dgh6fpze2x0mc4re9qz616c554jmg0jxyci34xoznwftv7iap4f9lxpx5htkt5lxyc7513vas2dalor6lpg2xqmo5k3tjcdxkanb4ouj83hlsi0foxz1stj3k6bfg662wdewn772le1y6ejg8rfrwlnwmwfddvm2a0p5lb827tb3d6sa3ge7qiw930ryeh0fmv58jaaycqb7hnnt2jl1es525f7bxobq3sy6ps88c5nch4mp1lgetrg76n2igx5ws6533w3gidmrvkqtiwq0t07w5hsrw8cd19i1st2o9vdftdwifolio966ej8dg10t3rvs3a4s3cv2od2hf1lrmj8g4ts99et87thswddhyqnyvnu8ms70w68qqgac7mz5b2b3t3143n07dr0rmhgt7n5l56vdnelkqp6w1x5tbl03eckpbqxp0rsy5em1xrbepaj3aa8dmtqkmp038jeq74y8s4189ihbo2i7kgr32iqauzh6jfaoz2tewugk41z207ctm767it0mhnet24jzcza622l8viaulf8ywq5mlzfuhabwn4zx5ar9akeqvvbrnvlbimzhcl1dky3pvkcr9ey9r5gvuv3l6exqf3zekt0sr1wktijgim4dpnqv18m3crbap73zmtcwmfpezh0aaqc3eflwxr0hw3f4zzcshy4252by86a8dpybr6xmyupthzke2cpspkh495fs7odsraai7t83rxrlcwfud15bdbc2bruk4ozi3c212pbh89ysj6cr7rb6pbhqpu2p2u5b2jpuz2b40xhf87wmmae6btxb11wg50y45n020bzp23x7xuqepfptwbb4rvd281nz5h4aojpgo4ilhpwbrre1ecqek9kx5egt2k6s0ygl8wvlzl6u0zjy6xvujsd1iynaonfsem3lscnkngs6m575ovuto4ep35bvdxc4gulwv22jn1gqq4pwme80gdtxo4prakryg73etssc1nhmifj5bfj0530youkdnqgfrk81mmqqkh4x8l7ntzqum6i71owkxwxwwn8h3rw9y61bzfr1whmk5mqutn65wsnhzlzs08s3mwu3sh0rtmdjxl4opmaoua8k5exl0ep5zs6fxessjkjsttb5750boj3lx8d0l6eulolvw78sddhmrn25u19itufg76xyl1c7tl7y2taecoxxhpnkg35hltf5a6t682171e515n8qb70u099s67gqmb9ud47edw3chmz7j5ym7jz4817jtixjocb35pksr0d44q1vw1elq3w8xw6h18q1v3cezas12zzv7393xag2onvp69jpny6d5xazr9pgjss5tl35643dqz49c0rt5kappsmdjdaadf4qjadd53s50rq3azppmhlvzabghqhla1q9gbk71rbj6chpzj4d40lizn80oq45fzusz54mpjl3hq2aoq78s9bb4hg9vlko8rgn0az0jh41pzuoqcqy92p4vs6i67j232s9sgfxj7zzmrzo5q8c8cxpyvic90nu61r56r61cwpnj2bfv4ucjizgd621cx53pf9mbmp6b0xg0j9ilnpsee38p93m83107bl9hki18jyrfw839itgzbpgxbazq0lx7ktnh8er9043i6jttl8b8aftx7ayysc7x',
                redirect: '9gwpwfxipl44ti8q9rxsn3fgxbe09shcoyf3j22sipv9v5bttoqhndbs9ur86vz0mrwertgpb4nj4d1ol6l91rnald18aloalf57ddbu4sijpor6gag8p1sp2ok5nx135318jobqf2zvl6i9rtkrs2965w1b3r07jcfx8ncinwzxyk264az6y9tn5cmq5y7p6m8a8ldtzhl8wtiymmxuqn8xv0dsmdju38ugo0uv9ktb0p78mkphvhnhbuap33n7ze8go2cxa0tb1v2c0vo0h0b2q67iam6e17czams8lwt7fprofhpmnw3y4fhyw3rjaj1ph897djwt76dp62c0uxxjkhr3clpzyt140u0exg62iah5hql9glit3k3nxmh0ftgqbtb1v17h4j9ylpf17mnur13pk6tsl7w0n5mm5b6odus7wqmt51cy991hvaj2tgnmbb1lfg03epwo5o0iof8i1b6zx2wzh949u1j687he2jz7i3dncf80fdv56ohk64olsxoik2kflh24i3mvegk1moxwry4zrugpi79wxx7hb6b0wldw1hoy4k6davkug6vgjp73pn0nal20bnwanqhpqk7elwjb8f6tx07oqcwgkuvdp9woxdwct9yntrd4gq9546ka8axhhknd7lnif2wjncwv1x25v18okitm3m9ko1z8wpjlgic44lpit7dov8y9ss4t1mfphsztr36p45k9yjwatejkc2grwxvv4yhpttuk7a7mguybs5j4v1cl5ir926qkfhh05eafky0lmaibcbau8725qsi7e3z9au01hhuri0eozuf6049l9etflssyyj4j51my30ggpw2dsqzvanm1zycn8kx7v3xv0obt09ziul9vopfn50ubxs5laf4uwn6aorenuwit00etfowcub7cbuhotyks2dtvnkmuyjjw4v1qa6slb8o3zvk4eqqh3uluily5succy3ot3zhdw7goxzvykgurf94vahop1fjq7ylzh80xuar1tsfaacwqzsskzeybds9vgbc3rcop1uvztuz8vrqlsa6h07zhrd36gqhpcmjn66pn749eifhrwqzi7uwdezfz6wpv9tmy9s15mhg6yz4sms8bujy2eac0us4r9j3etyl5o3xshbke24qzwu7f4gbnq53f06628xb0azq8uezsq01czhbt513uzxvlttijv43dqwa3diqyqf6okho9m2qz0mc8yx80e6poo49c8b0toyaladz3ctr57t3qy7evysz7qfvsyx6p66zkylj86qhueez3d8rjwk9kvf5rujew1k08fz4oyojpoqbxn5h54r6um113xbl4slccuhrffioh9qcwofq0pg8pb93r96roxjfzecqfzp3qr0i2yb4idh8osqhk3khlph9m08an5rc9flr477stjwu1a7pk70rcgnn2ksdpul1419q4qwbzdt9bu70wo8f0lu4gszn6emlt9tij48kq3ivwizyzb8tgnsq0qea357834xkrmce68nicfn0j7iptptugwrj2ulkaht520fvi6f19ywnk7np7z4mwdrzju887qk71jt4f9k74mmcf24gsysp6thkv4ubgk0yk1pbk1a2jp8demzq1xw060nnz3qb2w3nfhzu84nwrbplaxd0n7lra6l3c1nkmqstmefne62py4378nhsiyi7ak4mseitph3avl1bjvuud2p5xo01i9silzaovj4ypzpzdf47ner1zs8ijtf8ec4vvushudnz7jj23krfghdizcnqlyr4arwwui6dijeby25n8uynriryjz1lf271twl4mf5pqfl2xtxa3xfj687e72ngko80dyne9keevzbous1jpbb27paokb1xvmj87swbis90ozgaa1mzuihb7vcb5lc86cv4576dck6rriropm24zc5nv2nagnqirokw2t1p5khui512ivsga3e38w6lyy62yauker5h5jdlo00sixxujejyduefhk4y0yf7j6jsdml00h782s46az1o6aaii3mze',
                expiredAccessToken: 3814592442,
                expiredRefreshToken: 4639064352,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'AUTHORIZATION_CODE',
                name: '08z7vetgaa2ltkfc6qsjb1esn34a4ivn4b2af8n1shtl11c7a8bq2kgjtc1f0w4f1as29e3wjw7izr1vjiwkfq8qgibnqovpq0bl5j8mc8ddge0goj5n2d28qa5967hyv97unv8ys4lns5gmv1xacx4b2vqd1xj9vth78z350tb5kinq561ivysf2hrkb17cacsg3gd44mhjrpv8gdc6ru1tey75qknlqlap9o749mgsw63u6txyy662yj83eld',
                secret: 'auhnpxvbb5vbu1eal3uxbpqfigbvg0citacv102kjnsu7611rkwuncagnpsghoy20wean6c84y5yc3hrkn7f86iqk3m',
                authUrl: '7togzpcmc3ooq1y5yl9fgc96or89als0n16t9la8e864xzdd3hv97qknfej59lbmelmowdty83b2hy6qfine6ponmeug2ijj5h3g3dm87c0th25ow8m5ng9g84lpwqwa40sjw22vq9vvw9uvvefbpnkvxtvs2h0e4cgxwimgc8hwv8twv6j9clbk7imlluum4oukgaytl118w2s4p04aryz5z467hudohh6wm7rk1dtkl158mme162xsmtowpimqofhw08sp6e9ra51d8m6tywt2neht55g9huqvymg84709n9x2em4jujriogn5i8cr8t6be0i0a5xu42evzaelf2svemz1idhjk987cn01cc7prk2c3hlr7jw4vt0arc2k2a18776mkpmqj2x39eb46xtpxsd8sea0mmrzz1y67g9lquaj56y8wxjl8tp0gwrtugrjwuyh4ou09k351dsj6mlq2sqjtd8yezg9g1jm6n2x89385jtdg3dqatjp8uiy34sxrg8uzvsx6ar3vpp2y5a9o1yqs1xw54z9gttkdt2ur6g9ashdjumolbmd4w8pywj3d734ffrq1gvhcbsvwlin82s7ljax085t8832cakldr5yhkfutbjfjv2y60pnaxsz2rc3xbz9m25r1je9i9hdqybj7otovxibqbze7kk5lr4izood4npe57ucewpqtdukddrrpijp1fawt0q3kmzahihlem9gz425fo7tfrajgvszy54nyl6eoxrwb10xrqsp2tk0r9vz5v7smjyb2s3m3v0fv11wgdl1tcqcuwvmgqgu4ndpgzkphf3cfnol32in9tbxew1orjjmo3b33xz5a80v88df0w3axuvsfii56a61yvlso3l8emk8bapn41068ueowcyamy73y6s236frjymkhhb0ph28gx2te8gqxj1vo2brbuqf05cy5noedrj0czb1si6a5rwnl1fhrh9lc42mcb0s7u52q1z37vfbklo1471r53siicyqzfg03rl3wy7snuxftvkqqlaejkrh5sy5tuu5bfriap74qszndjgbi08b3rsckswn7y1q5g0w2ldjb8rxxl1o81whpy1n1aeou54lodiwmq3auu29h4sxit5glfnhkui2tl0n0v3havl8ylld0zgmd8r7brt328454blzmekgjxwb2cghkmclkp8f7ph24qk6lz633w2vnywph67bcg2o1zwkeg9ls235rbjeatbjsc0amfdbhzzy2f28xjyo6x87v5a3s274x16yhhwhdgz91dh978umco5m4d823imm2i1mzeainynclheh0s5r9kzogoltnut78e7t87ot9pmgx14osyzsw0hm950dbzldf711yalsypuuqvsnw0zaivt04dnib0q39zqywzmed1iooprt4lax4ceot1upwj1vf86evofq550sdvrevo2t718r6xfym1v71zxlm74desb29tlchr1lpfo8ty4g5i4qknnepzea2x5wpjg5hi7alz3vt1g04at99nq4vad3ae142n3x0rcblj10gh10tqnl1jsmas6zyru49v52hq6f8n0paed12b3bsqf4v589rk995o14uru4h717c6o6oufkrxvy6ngcjte0m4bl626wie9s4bwsx1ok8uz192xbmfehexyvjuwtqqodgvfkiwifdkhw6uecjosxez8vf8fhgtx3oallgojd8pzunv7p137vpog55ponb6n16y1g2pgbuo3n43vnzhwvn17nmmwfpwg0mz4ljxsfa9yakzlhhkhhushsj1dm7w3knyod97t527xmzlxys90w074linwyrw243zfpaqrj2q9zrxwm44qtlr3h2fiiyjlkct9wyvuj48l84zlwd49gezztv80zz0u42hkf2wjxb0sachmusbt30rdh9k1qcrvxlo8gtc94wfzg47cfnf0hg2215gfo2gat34v8hedjae2okl54evgt1e7cbx20ykrq0kco81fmkst9bw8pthfurj080n4n25tcc0cb',
                redirect: '3ukkmkaelcmey9ttltn2hzopvypm32lpyznnfxk21495stkgy70n295ud1lrt4x577rpdvexrsksoxciwi1mtat6wxq4yupd2xabz2jsueoapihtbx4kjtq2i7xipythj0mituo0plcdkqwy687cxz0aj4zg7xw5ongf3kz3fc5ox0z0wkfem2jxj5kd5weq49d8vvudkqdajlg3ntgr2zf3zbbu7q0o8sgyggu86fsyioyjoba9pcueyjkdetvcy6evgnd24jyenm0o2soeqsdau7wql9oxsqb0in9on9nqr0l2kqhj7rm0pyo8qx2pqpfdpvxod149a7kow1gme69r6spjwupm3kyzhr9dwmleg0zdxla4h1w12n8xywhfvuh3cyeyk3q9upnhi1c0g8hs2lqgd16c5mjdc33q8knci5goq882mwg98829630doizrgyy68p0rwen1tvcakjn5lnal3cl9mov9hqvf0o5ktzmu2muawecg8648isx3r655191d0wg12mpta5i2pxwyohydeautlu32yccyti8ah621i94d8f0oczhwr8cebtnnkyynqyn4698788twulg4jict3at25gn4eh5bfy1m89efxkv0u5ytg9lz1v2tvyq77hyvoqkjukxo3b33qm3vjyxhphusewl7rk1vwm4hpiyd6zobkfkzzqrtj93thkvhbxmyheatxjn2ueffkd78fxw2f11qdqo936s44qtagt55fp2ue4qf03rhzvnkr92u690p7qe4mstx2jgrx4am65parszn6wrfdrf8t9dlelv9a8zpnn744fu6ptt4fk5y5t8e2quo7oi1p3j1ksi7vq0ibkyej4pcxrb4deov7cz5s3g08814qh5rjkz9dkf2bcs8j9ni2dwnkyf8iy1v0k4vfj1y9mnvskxs8hjzpyhf9evteqq68206rtei0cm4a40ljcf7md1608jbge4zqx3fhjff9se4q9vwlzsyurq96i5ygy154rzisr7ld604mkjbexqsqv9xty6f0nbl8bdvn2jeo93304aysk5ti7xzyxmxt570zfb0oiwovyacmamcpuias6r2qcvym5m0rrtrex34ls30jjgzedlb7lbkvyyzs55t24dybbkaukn2nwfsaa95oxm9lr64udd6ocn9e8twqbl6dk9qrf8udr7x6aybh2yp842311etrbcoz8wwdkqyl0lhnfk00mpuneeb12sw5lxmdc56kbcg6pfd2gp10oacmw9kztll0bvkoyqtyqa7gbxqgdtl7txzni7l91s6e2a196s59u9zj1fy8drzm0sf22dn2c43aufsele5zbxohddhznbh11jb9z66ljhxxzqtnaebr8m06slnxntfk6dafheinoqwt19t2w1jzd2bkwytgtzkx3x95drzpglejopxjb2d08upsaeoinm1ddsjo24t75z9pbv5as2qxk2hdyic124hmgmnf306bcouxz8by1srno0zgivweyn7o1j6ymc7kh9xfkkmy0zdlp63089s43j8ejo01juszgm4s705h9ix5e37mfnh86p2svk2dg285999a6s09lje1olj3id16w3q2gjbwi8tcrzuwik7wxfr4ajca71aah046zuxto2qjjx6i8d2hnalvue6a0stupr2rfeuf8j40ar6oqp94r6iijq7brolhveyi2gmanpzhzt5kt6i0d2ofoeqi8qqocswdnd4hxdz2nw86wz8ljzbp5l258qgv9h7jjvjmfav47mmle2yq32lnxoemsbbp9nuteboibdbkj91yanxbyctejj34s17ltwa9eo24v1kvda7qjo6t25b5e2awzcm48vr6xoolyawl8fa433ywe63k5abv7cs22xf82faj6ybgaw72bvkm4elq8o40n2u1qcm0tfxqx646rvioosxbkowlsdzf15bcgbd91dyf4hdew0b068ayxnhkznnc1rc56xc99zzlo1r2qha8fygm09oj26o0pmdk8lo9sjogwaexe75',
                expiredAccessToken: 6354630699,
                expiredRefreshToken: 5935608153,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'AUTHORIZATION_CODE',
                name: '8y6f1ffsf56azmx7y299askvkampr2q7blk39lob7k4e6325jcwnzezc8t86yh25svzvj2hijjk09fp1cqmp0d1q9220xuncbsztqk53fus23ng3k88630wrnzi2ok0zma309u3nrpoc131mf5lj8tubh72zxf5quvniot8rrmujmfqjr3ql87d9ez98mqkflvnishtm8bgldfufi3er0mxldvq0pjaxktnyjkn4hh41kg9nx5h8km8xizsqqxc',
                secret: 'ni5ejp9tz1wa1uulqpmyh5nh4rm27ftb9ltc54q75xb83ots0ihi4j9qcvpu9rrou63i8woeaxiv02r5z7218x4us8',
                authUrl: 'dizwitytyhjfrpdizm319x8lv501ee6ttcmc5jmwte09cg5qsy14doy7wbf26g0msnlgqke6zuqcxlael9j1k1itedrif2usc5gs43dbj05fr5m35gpzd7i2k2ilxm1jp2z0gsu7bsiuveenpyzshcli52cxk8vukjjoe6wup9qb25d83b7g60g18m9odwlxwgbxk2ll30kstdb90bmy2d4k543iejhhj3j15c011e2fjiaso7qtcodv2sfl0nbt3pi6g1wa218u2dpvnrmnqbpl3dvagpujluebhd4gek2syz9pfoh6h2atmobkbj4ah2p9de8zoke66p0fxhu1njqp9nyv6e4envca1arqiz2kpf3l1hnrfz5bb4xav8y71l35gzsytpq970jm4jqdhdpv7azfdiqn1uefn9vpmzpqe7fs1j98zr9fgvdvhhw4zqh2dgj3m2rjvgl0wzsnd3kjwz8lbvxfjroma71ex4ufoedmg1kfnhkcn2kwf6hltu7v1otajj4p8uk8x6pni9cxnpdngudnbuep4y4qs50mneeyl348vluwno7ade2z7fkwlpt9zm2tmb99cn0vzh8ydkp4jut0y9h9vfq906ylj46hk8jm3mf2aq2givpb623mgrjoktcxagqexhmj7gc7wgn4rm5g86r223bcrph5ge68zqcgsgun69zf038hdz6e7mii9ehv6oyvhgps9icvi7po03uym1b4le74m2r6wzyo54tmp319g6yoqmbf4h43ru3nzndnxr3kahfc9l31gebb3envkpfx1pu4ojesr8hisdm9n27mublcpij3lffr0tdsythotyaj41y9d71ebxikhccwi795bl1z981js2bsyu9aj8qgvw10849308pzvi36m248je51ryfhjjibkfwowgnp4h27iiqn49d8te386hzlmxfas258az5nm7yqj9fvj1ut1jy4bcd84tjva72ftn58v65kco4kb8hb39uusk0ghz43jk3mxltzit6dftpu0clx0nlcuv5kawmmqb2a09zmbi78u8jzpoedv08dr9ryp60sn6o7v4dejgwvpxosc44zvfj9b5vhe1cqqxbilo510y2fbqmeay6g97vkhyfwit28srwpblmpj2xpzywx8g7tkeh4femtwhdb7ssx0ufm75bjkhl45j2w34g5sydehfs39v97j5jggwcb7u7fa0w1iqerin9vtkbd4medvdgw508yx2n0wsl2b54y53ygm3ztpl1g4rtq7ogmhr5lkcg7vrffwe1eoq8ovrk6d9ifefdnkmplkq7lux9msdngd4unesgmgoqybymditlj6m21h6ujh4s67bet7ph17aho0952e9n7uf672k8ewh62g3m5rkszf02hrpqaplyyeec136vj5wrnrrzdmsf9y5ccgcj9y6cwku4nfhx5clpvkpmw9v0q6phibhhs2f08uhl162kuac5eswn32w0c2yry7kn4rmv3rx96ghz87ld1ex4m6ctw519r6hd9glxdihim417crw7lj6sjegrwm0oxlkeog4aw7h5mtfxrb6cnim15qk4ly8hwksiw21q6f0p6q52vq31ap9ux8931i6n66mriad5cq4qnyzundqgw128tnsb6xxe9qoyiz7o298rns6ngtwulfslqd4ocfactuqzysad60nasdppi8b3e26bvbefe2b190xowh8u3zpabq5gvw9dzbiyr8bnvnnhc4y144lgyd53nyu9rjs9r6fm6md9b6r9a3erg2indc4cxgx8uywty92x1yofym0slvky1apnqo74acijnnd8embhmbjstj798vk1cn30jjli3e8h48uy2preln8zzr1nhqkkvscpqb6q0gn4i7g2iybmqzg3sgue2254qz2x8nchr891g74py8lq07v5lwfrdiyesa4y6sdslql6jfdccbuoq11pndo7btdpjpdfnrxfyy528bxlxux1hh3bc4y732olfbgob16mfxv6v7a788s7l6ruu8w7nk',
                redirect: '5vj0v2bf31gvlewruexi00oaxcs1juh7a0oqzaxgnc2z3rcfz2q5wyho1oeve0wpbrgar51s3gg9wlo1iuph4enbcs34je54n64v5le7bovqbhumhja4ndlzlkeyhjsmsh2g9pnfgap7ii9gvsibdtnd5lzfq2ckzmo1fl0d1sci9nx38x5w9u4zubk5ircwyrq7lm7iv4dru8bw65uxy07a09gd04nizh7i0vii2ncu9frfq0n4scpgbq0qhv61mstb1z86p0mr8txpc3rumzy24vqfdvmfyb0gvpoxxnkcbe9ma74gqcni226ihzlkyv3fdx72z9evf7dxt0d5fewjz69i4tj9fr5ae4vdd097zmtkq1pktsycq1qsr7pp5chpwwguk2jaonec8okfq2y12jbjz0tutnnumaurdvgaicw8lsqrov2rpa41bi68147erfead8xzvvphqslkvh1uc2nlzwnc509vsc4ep9afihh3i71q0mctly63r3bwbr82dlb502dke40usk7lzb1tp1m50rigtkif9dy5em7vbe4wferaavopq0pnakkkexcllmgb7sxx4fwlkdp9qfmrt8izk51j2xdm5u46mlzu0spkwmzsknrtrfin8y882aceeq3ysbiruk5a5krt8fc070g1gjzj0b6pgdvxfdj42u37ds559lp973r1mzci34ghpx04wfsvwoywzu66a0vewh42nvujfodlgwkhzj8yaao7xewyht47fablg40xq72pnrwvqwivldmw5shhdf1twovuvplw86iojq6da1wql5vof8r6t53qpn7rc6ayi4m5d7tdoyej37zh9ywm2t0z1kvugffoqtz4479s58176zkguv1gs16ffzfvpbxebxaujwynx40u9gnfx0tj0qjc5kv0u140qm73ownaq2inyn8m088wrrlbtrnnsyvur7vtxsdiqd8sfcdhylbbxgl2cgifhkv7xa3jdzd135oldm278uz96cdux9g2otln3tqkr8d7cvn35pzhpzthqqc76rao6etd9ex3e57ck2mvo01c73n0peqdb5bphsre20mwytna23y17w2mcrqyxsmb1w77sn4hm6ed9qqfelcrsjxxxk7zic89c0fsy7cft3ysa0mllns279zniuv6n90qmerqciawge0tbldozb0alexzrhovatbxcw2jovi3jr7aq13huo30hb3lwwp8qh889vunsxgcy7j4124kkca7b1hmzv5zua92s6ir97rhnk7ti7aut35rt5n5akf2mhkdlkmtu8yf8o4pdeb27m6yofkq9rrrk2kakx9p6lf3r2iaang6d295oe5g57w59lmz22dfx84hhm8ipy78d8jg6waur6v3yy5jrqa6ywqdiksswzuh38kw4aou9q50h6xblntl6dw5plaur3f6renlarxqqj9y5q5yx5w9hh3jdt141lt456f5zwsbpzear0n8u71lua04rm220lnqby09gmga9zcqi8ph8iypa0gggls6a2f88v7rf3zacxb7oxywpxg1krkjfhv0rghnkfq0ij2v5vn4lwjlc6j4j0k7ghrc6w0tckqt8cbj788vvsqdd4ra82tecuu495kwojgs7j371gsjfbf1pyob88que2tv6pmn5rvhj2uvh8ri5goh1d61f3rvaj7fgv32dvl3j2vpze6ad2bt6o2ofpdbsthwfdtxdzgxf618bslljxtgixfvtwi3671xngsvt4wq4iip8b0mu12x8cxmmwoa4btl58dxzwg2l0zh6bx4maoox0z0dx3xr885r8y6s30vlsacvuqz8yfgi9tycn508kaeapo40e7lthui17ia0b15e93lcksi8qc6l7w54y84kqoade65njboza35fjrgf3an29gr2ynuyden07ghraeuff4kg9d5feh08f70wom1b3ff9ellfnn2mwqmhxw0ov93bc8okni6pw5kemfmbnueh97kqf70gv0k6lcqtu082qd7e7iru5fr745v30id',
                expiredAccessToken: 2753978684,
                expiredRefreshToken: 2804935284,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'PASSWORD',
                name: 'rj6cm9g4cwfbhj62pelgsglgfi2jwu8md5t3w8d803v50qsfry7f5ipjihjiofvvm8eidznhqnyxr40a34jy47sjtoiwu3hjdpr2rpi9mbqmrxtgo22ih9yqty94l2i3ux8lejg9ktji8u0knqh24c1p9me71ver6t584laswvwlfwxgehdei74p53twjqeugqlgnewyvread604ahxifsuazons4u723w1ik8z8as12atooy1yl9eehfkxeynx',
                secret: 'e12j7fl0ssg0i5zp6z9ve2hjswciehzbxzq3cj2yxe4vrbuo48k6b1aw69ne2yjfmr5umm8yk31voup2ycivewzm39',
                authUrl: '538b5lruczb4n8nn8vxbxx8mdygmdkygd3tj959ee4t919gu06d06tts3mnth636u1atl3s60177ryb0gj86o39fy8n45z6dop9eosqzep9gfjh8vcrwt07edjfzto9281mil0l7puo76dm1141p9skxrws9c6ig23cpv2d8hkchhgtwx7wcnl34z9j5c5ro1phplodrlc1yij98xhu90xulu2ch8k3k04tgjy6vijdsplb3wty7b4neot9gyu3969igobr5xkvqs2ifap0u10t7zafak9wd7g4ts6snmae7j24qajpxs34e0wg9g7j897eq85dzvu7uvm1qyocpji5y4vv23tpk127yej2jm13jv52q8vk4qrzrok99o2h8zomlqqry58a9w45esv42zwj8tkjosm3d17jko3gaxkh6bpqb5mcd95ahrkelbz98l9k3q2rx2w1zr02zrfl394vcfe4pijnm8jq6qx66nrpfcsjznh0gnf2u9szj29o7gzi5ezsr1ae8o1t3j94nvk8izwnfzdrb7prsvc58ozao596fnqbehqr8r14ecjnysut4b03kti2yezu6jfuxidgk0drfksoe4wgkh4mcitzskqwpwakotj449pghfvrkacx3kyicy8mofwvniou99mxv0zstc4huponxxkz9wow8x88rr3dex6kph9fybph9qxc7hnkpf4d4myepg1kd73on0u0jwi04nxh9x80v4vxgnzh573zxm1x3l0cakjj8nypv2ej4wc1z7o06qxfye6rqinojspe33cqhl4621fluw74gz3wa0teoue4ldm8qm5dfysh5fxbfeo7exr4elcr6djl4wb7mi53sal1m530uh8qfz4o66xw2kfbs4scnecmfw2aahgq1imuik0djzifw9uhilh4lzi06ralzn74uit6fcuycypsax9avksd139tjz9w45ft8at6nnmnjbwqt439tcsvllx5feexf53ymtz2q7ortjrfi5zlfcknsthuubtwcayx393o9w4tucrw4pim5293cuwfz73e62jpqvhacewlhpthdym06q5sqwni6gkfek27zdhhrrdte1ujblghoef0odq99p2gw2niuiv2mgoqznpho90t113rna8w4kvn5zd7myi5iav577jnhci1xgc50y9klcp6gaqzq8yxfpc3vy0r3c75c4jqvjcs8qgllopg3owap9ag931k3ssfu0200ar6abjqn1psh65fvir9xmbrcjg9ghnxupx51c83gbyaq4pjrhaqovcvcgu3pb43k078wx7bfrw50xyluw03edpbc0eudyqp9qkfsdm4fv9y8qjsx8fendi4m63mthkohtds1q24jigbl6khtouhg8qybcnvtw9yg0kyybrp6j05tg2j2fyc9afuhjzghszttznlf9uyv0uhzlmbsxa1aurubrsh2p8455kmd3nq8lit2y6js0wec4nvietpkio574d2u0ff4bprv1ieguc4lycq58yn3vffipx30p1mf5ib2gk5r4qig70ncmxjc1g47imh4hq8pm4mz4izee2g3d278gosyvkvwqznvvco9jzvdr2w53d67zyp5jjvtxhgv0819hqim13d5x5zzexs7r701armw0lfim466j287d3bj453q9jfq7bbgayjl4e0ps1loy1wyjevqs7mt3cw9ucvv9vrzwhs03z6ro01lwipjmw0xv63c1obphwc70peynxtk6ow5u67can6do5l4otzs7usotyshn7u0azj1ixlb6mz0gnkpz247q0mbawo0axkbkkfz10ca2umi1511zug9mhnori0b02lb1zvtl7g6ncpfwg6i0ygy5avsit16kd5iw6hezlux94skdbsixhd6ul45u9zo0oswjp0uyn91enstve4oiy5r7rkbrmpwifhrcni46bj5gorgd58to72a3brj92abdiqaoxlx3p46ehtt3a9q7cvr5aaig1n6d5dbxpkn5gq8zer6gv4mppezua1a0vqg',
                redirect: 'b8mu94zrdffsssvdfg3auejvw8mj0nndb08bfxrhwt5ez1183fnigsirft9zjyvo0kqbg37cg1xvawcqjs9ic83260128ibp9sp8znggx296mudeoaoklbez3vssm0swhfu5ec5v85qqxx4ak36736msgfeyc9ltbxv1o0c2deaaic73qgfqi11so4o6dm1bcvx81qe7ljy7pp1jtcpwwjvwdzannyte9h5q30qbklod1fucyks3cfc9ynpau753duijjkj811087zhayup660yg4jkmjdmhj0ptlndidm259f56e4rbyn7w2rj0qs2urc9gcmcnchm3l9262vd1o5m2al2k8fch4omyjapyi4v1zgzzoj7reea5ibapg8w0ubng8rtpv0mnb8g1sib29e3tfgex6e8a8hzt0e0o68kmxuk5fm4yf6ewi4muog09it5kkdpnadsckd10z5pvnyfjj0tmjs13hkiyxwjsckgawfxcz1it9kv61r4er5r96uvnwio7wwpx4hm0asvjylzpcofaem3a9e2pdvl0twk1rtg28fa6jh6dkkuxo3a5eokyyfe6naxijiph8egi9t3ks2kofgqmfk5x4uatobhwmqunaz3bkbop47vt425d4idjoem6kf3ea93whjvfaoqoz9h0nonp55xw31klqa3a7jenr0y0fk5bg3t25rx3luqn633fk8pqx8xr4fzdzz8iokd5bevblma7phm6bc9u7kh98i8srvl21zhwlfijf19c51s6dcveywu1fd84phrbf25joy9p0j5j76m0a1ekko2ark3gdbizijqncurbxtwa47d1ctkxp5iebtklqk9uj9chqyaud5y2fep8p6tnnb8ckvffg54schbbd8qbahrg8l5x2ixt84q8kfvihyphv42wcl8lwyed2or6qdw9bciwd66fktwoz4ohxx2wx91r0j4oi0oi2m99jsprhhckzq2kfio1z62grosthd7nlbfjuby85phtq957z66v6cmwohbzrj5hj8y0ua5lau6q31prfmuetjdi8la0i26o5fhqhtw5159a79e8u30kxkrx0oyu6ahpzyak8iztpij8xarghpcxty0b851tjl5g5vo5g3y83cks2j17td4qcemwkizdt0remo48xqos3gq55c9ls6k60ammpj2yszfl8w4vvjwmqdpwuj7asozlll7jptfixfxhu1kx3uueabewcx6zz29h7i94o4o3ludmqt0ojm5oh802heoipdb0yv9z32ma8xgi5kjl7mb4yj3rz21u1c5u5qxc8o3f7i3vimila5b180pimxamumy3amcwwq6rv8iugw4wrrhogh9wvy8n8n6vshq2gvwfobep1lnyucagch0gidgt4deesga4zjeze45071jdpf8egbgo54ooxtletbr8ptetg13xgzxzuyguq0l41cj3e9v8faqcq3s7co2wmum0imqhpjempexazcek7vclki0wi6deegaaeb8opueir2lf66nkrkw70a0xto34ontg0gvxrqp2n68u9i6u2vbwu66ehmymoa1qeczt92y3rsvcgbuwn5yw00o9539dz0n3cu0auxkxbatw0q9q7p22lyvhg1iuwfo9wryqcdt487jwo2lwzlfh2vkm5jhpo6nvop3q05abzdb1w3m0g8vdu79z6nkou5lws15hwfm0a3hbilue1imhn5i9xgwg2hzzweoxqkg8wx18qr5j7zbqj6s1fzzabq8t9snl1nmshkagxzxx05e17vfpcu2ec440v6yrq03z9xqyu7yy3ck3hbrx1n80f0ky9rcmj50m5ttabuphrhq4d1r6tsfcup0p0nupxql534azi29hnkayp16su59iut0apeg0lzrn2dpwgnuehavinp5srtvymutdtrv65uymnssck6jg2v7hpkgd79o76xxn8laxsbt8jorktpehmbd5g02pd0wbw7d46bwrp5z64iqoho0z13388jj7zklk5yr5zqiofpkxtl7xcp9jd',
                expiredAccessToken: 7348398843,
                expiredRefreshToken: 7380608415,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ptkn2mtvhclq4hlu0084z4deimawcdzosmdvn0acnip0joucmyhmz1q2d08r89a1c0jih6sk2rxbvjpyxpi0vrffx8za26fe2jmbx6p4tkcplq4z1mpivr749482smun3x3t7qkm3z0qf1ba3m4x0twii55s8j56lttg5zsd74uhtsm7u51vf9hosly7t3trof62kg3wd3dh0exj5lwvs3kdx8wx9xxm9otywgjqznqc0686nqg56cjzl1id3lc',
                secret: '7dl8rd2cyf4b5qoxo132s9a66m71w5gu7ccxw9lqe6sards1hkur09pacq049xsxq198d7w7jmzvi69f3fedy5f1ce',
                authUrl: 'hahuln1b4h1j0zsaqcsqdgvldihpm6nfbl6nq0fjwrvgwr24n0aigbn52pdkvfhnobzsnjlrk9sesd2dn8x0c281ndojw6qpusv807gybm0p63auao9bzm50dgfl2z8q88pnkhz5kyw41kqslgh23goym80az627vr45a35h5v6q72fp0786zbk8t9pejefnwi7tl0oc9hgivnqda8k5zhqe347sbq730e6h4qy6bpkwcinmyfyzt6l1aqbmc7hd5onugk2xcf0clkhqgxz58ff6dmsgv58zm92sp4mvbdedjhiww072bhvtejflrg4lmsadtehvu7n0l4fkbaassm9dqdlj3zqj4qsubujoxh9wdids4h4uvd3yoerr7pmdvlbs7x19yml0wim0bizp8f1ynjfco8i51l3r1uuzc7zzx3mrg309q515xsjhxhmycf9ial18nmh5qpke6m8wd3747y20evfw1m5w9bng7kt2sfk388pm5w12vtitti81b3nvxc6tcjrr596cxh62a74prhb8821ve4nzq88l4x5jircobuye5dq2xljbem37g3igpp1vahi3d9hq3g60h7u0z40phd7g602fy55gp5631s28n2xd9nly2qs6agqliby2ly9qvnhe9pz5qb3tpni64fj6uzwgcos7fbya3ud8rapj4tabuxsicorfa2wfa751v1xmtfqt38csthngmcyit3rmgmtqbfbsp3yr9l1a21axfld3i55yhbn42keixd2s12a7ppg217i2audqv2zwof1i118yx0gevsuezw9x9m0w4zk9acwudor2kr699y3djuhmb8615uqhxe66yx1eynl6j8si1pd7qbe5dbo6kp8iz5xitajup111xoym6rk6a96f2sc9zl5i68cz79ljz5k6xza66fljm6r4cx8w3qzssx2j2s6m9d7otbyftizbm9vpprj1r7vbikh85xeslpa0xsnlxa5zkdw86ucx1ybf1d0kr3qy5j5500kh02q9bk2z1nfk76lix6bdj150fnd1gc9kbdmey1ch2lc76r5unfwk1ylxwu3fbgt6lwx7qgvvq3ry4af4y15q7yv42126etgheq3fk1vd5htwhu3byhwh07te5kjrsjnuu62yusy8gq1rrkbh5vaznj5o3y9psb3jzv30t5pnzx6anmv9b0d63dpoyfsy0s9dc8wtrowyxfage86tld8kretst6ag1ckdb59ht8xsykhx6tf18xuleb8l410jtonp4wu20mi9w5dqu3x5xe7ui2svqsei3vpdmpsureg47uvlovg9abygopyx3c851z1jhz17vlxebr2fl03yi4uc4qqmt0sattcf7tskuucmqraapm8mgz6i1sehoj4jutklesuboz08z2oai5lhupqyjr7ekrx2ny4q6oy5afzp5lq0bab5cdrzfu4ciys5rld3fzb1ajegngkir637dt764o33ijya4bquafh7l7ditdqx41pklsfrlrwx40qkq09axi7s9eoy2gic8obynju46pi8wbti6kuysc1dq8ibxzz4jvwrm89vo99jceghes87f7x18cbf8f9hn092g90y877jiw95gkslz1yog12qzjwfk3slerxnmlqq9akv88kx8n1lnj86huwqtsvvpkn7vju20rl98ws9p84yxu9o9vwyomf8jxcqgrdhc3jmc01q3g9f6bad59v1iirs4kg3rsvc811d4272ykof1081dqmmmbzgkccv6g4sk0crelh3rzi3bl56tgm16qlojdt6kwssjdmk2w5ztbjr0pp2pj09snwlx646yzrju35p6xpxbmq19ssjqz6w5kwo081730zhowdf5iawy2n86is70b3pivd7umpu31vavemqf9j2csh9i3q4w3icjolvzqc5yr91mcy7cfd0wqe2rpne9hftxyrletecgh8p9w1kdstyszydusysp18xukpki71zvij8unhj7frkdrr7axca10kdrvesdehpzgbdwy5ipc3s',
                redirect: 'sjtehewetw3o1z8usmjb45tcj5g6b27zy7sm56kz2cryl559vnn2cl2ldw0pvgqka5ndg74eiv5wbit2famige5m51lmknwiyqy7e2s900ofph063w9tha184sx4llwceqonoy47jzcb3udrh5r79zpxrw4x9x3hbc41010itzji9j9s9rmujsr749wtbeah34hndg31ryp7k849q8foz07u2fjbyxwaa7x16qcp4qnns6nn54as64tfnj58vojqaxwo8ofa3yvi0bkaxwv3lq8v2z3kfkivl9310crigjrc6xyzrss2yq8o310a1yuvmpudu0b8xfk7uqcj969bqnx2dkozy45ojlkrzdy139dlj0ros2xssolwigi3hl4sigfbfy7ccjleer819t2uw1hrc2odrfyjkt2jp3kk9bhdkf5krngtwsoj9rg0xocd1hsedm7l9e08akcj1u761nrpsm42gls6vmkk8bg46ic9hjyawjx7k4xsbf0lcfdv71p95e7hw8r3bcgex1vxv2ekcrmou2kfq8jx2kyntv4238xbr2f8u1nwhz9vkdh7f834dgi1u7phfeyqei2du8w6aqpmmd2wk4f7t23916u0avkckzl4ktgeu6a54nk0mqs7duf0675043m9ou6z0yy3aigxo5v66zc5dsqf4zkp8w2yoqhnyl8gbfbjb5jv98xz1hsciw0jydv0sas3n3rxn59xrtua5ato34xtvanh5oswwea7pt0xidsjhvbn0t1vkfsotz2dcaeu1m3nlk730sa51ngont69w75klz55tb9yznhkqfurwl3gaqvirlqizmanr9nasmbwofwuqe3lx6cp1qz77bb78x3s6z1com7sc1esgzeu8m14xx2k5by56voqumxrniw4dq2kzr55kdalzibyk018ajbv8m3qtiik8lbyjtue1mym85755edmv3zzek256dbxqbys3muybq6ofxmzbryhca60xylcy5lrc8kppry0u4xeildojokhftuczed3uqczs1667ffnoasmsgfvlii7hl92588spa5s4uiztrsct7evhvzcd3lk6halbhtu9awf8q3ikg4rm5thwa09q7ttllbp2qjrl5smras7e1n1892hq7x3d8z9af631uibo3mf9nihwguysjdn3b5wtfqbnwkh3hb5mwcoe21hdjhw2j1fzyz0cyn0lub202vxp36ppj6szxxk685szzf8nzkctajjyhp2zr3a6arm0omjby32s691hhsd707oilwaghgmfzmm1kahp3calow4v28yy0d4n74id72qw22wmjdudh2l246x3oobzmwxdiaghmwcs6vlbgon6onpiiu84v8t3pm361r60dahm5ii2pzkn6cladvwybzuq64nk3rvjry2n0s0giomkz380a73seq9bntct0vebklxa6r9ibwr4sglr5fmp70e4pi0cve2dij2g38yrfqloppw9q1n8metl45tvvfzc6vdeqx4m7eepgl7t20znugj8q5z4c646ykcm712st403fiuo1e3qjj4x30na8csxxnugp0w9jgliz15856ydqwu7myi5dnpj046djq741gkqme6bk43niauegsch3fmtoq7d57paf4a2zuwxahr90ni69cukaykpgfyhxegf9r1kerkkp0j7lbn68l5qb8fr548lwydb6rjhl6otxry52dxs2cm2uio37e6s59h263i9nbpg6catk3f3ggld9cr4054h75lb3ocx4jy3qgy25qrwdg7lwplcpft2pm195bq05art9pusz56mdzr7xyy95f4tx800k0sksxkvh8ojcji1bmosmr6ox5w43nm6tk236culvnf05bltytlksma39cco4bzplhve1r5arwyno54ajdumd0o321w4nm3bfoft5orvirl1yjqcv4b6qkhudegpbcb7o8dg1dzr6mz0vpr9evdu0faj1l6xryww82szhi5pf34ml44sz32ohjkqd3n7a9hi20c3jz4h2ud',
                expiredAccessToken: 73913580666,
                expiredRefreshToken: 6910048661,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'gm96nw26s2nygg6yyxxhih417oqfpfomera7k3bkd3lr7vf8ttj5knvy5os9cf0potcs88yc1l0r9jir79fj1kroyht0f5hgh4zego0og9qsxe8emmryzl5zl6fvkddf4zqlsvnfk71hhf4jmaypirwcivqjeqnofshqgb04cw1wnuchy3v8ppsexbhxlba4paloxhjllr4w40dpmgiiukfcdeww6ncg44bbovuscmw75y46um8fclv108gqs83',
                secret: 'l2mjtvo4tqhoksu1fusbme0l417krnovhjhd39o3fckd0lxixtggw1781iosburac3gickp33sd77nzf9on9kpt9yl',
                authUrl: 'm2xgirw8ppeeeiuyt8rl888m52kxx48tgu46wg5kgjq6ni8f65k2a9gtvjnx1o8sp1vag9szolrs9d20df0tpj3wpjtbdfxgmxfem6d34g4m90qrbhpe08or1qlpeu1bxbr7bswdml009pmdjodmhc2p9kbxi68sjsxnpfkj7n9jpn4m1fo8jzt6of7g48p0us1v0s1ulvbl7r0gk3olhdpypz41erxn2i9gsvyrapr2619n17pz5u4my5mitqkop02shpla8f42du67ny60p9vvyrteb74wmre2czpsamkalm81epkwqrpw5gcnuz4xg52fk1rkmabnw48s64bxhwqj507laof9o6tlkkcdrv7t7izfx8x7nc5vmvh7qs0xie6igiyfqb5yqnjwdbjd71ww9tka6ajhkjopqxfv61vnbrfwsletxyu7edlnic1xfq0bzkollaofc1xz6m8a2sza6lbtc8jt03i2ajo47d7ue0z76q5n6496ji2bdu1jz35l9k7v5nd6td0m1a7z652qu3mm4uejxp2wxpyot1abu38h4lyuci31ap4u9buvc6tz6om623gnlvfqe01hnet7fei5v7s517hv11w0te0y94vd9xhyaff5x7vuo9fz2hfqdffzbazplk43s7gs7wv39ws09zcpan7oend1064bskqbrydt8hm0hjpgfwm3v2dv3synpbi69lar143drve658x7ovzs3bjwzna72jnc1kteccbfqgkd3ivv24voyq4u4oi9h8pg0gvj63w33h19vyioqngl19y15tpl2es9hlgjw11b12dj837sagfnw11dqo4nr1xsfpvn4hzbwqdii1la9g7vrq1j1x2aethqb4quuux78dwdje09gktf2b5msy72tmcy5cw4wv4y6iwe64njh6ms6tyylmpb2hswx4iwnyy0wdz0u7s151dorl5e4wxf15unbcuq2bw2y8n7stzpilg2b2npv2dng2d68c9z77jnw319v5j076bfwembbcp26bqqb0f21frujwbir6qr2zlxlmzz7u7tmp68jj1zs526w76cyf7tqxvo635h054tqyx55g8txsfdz17lwvhk2cjutr20dkx6s3b0zs2mbddb654a22wi6h0cl5ddkmvyz7wb6tfgcggjxrl1in62p4srt0mmhgjkkmp1wd3lwso9n0t4zn0ispdhvlvh6aymvbriez0q9xb8wnpahluzb9i2cvwfue99r65u3gwmmel9l3g7hsocqflb54nrebgd70vsch48br8qkvvnx8xfu7p8h735kjol5zs2vn8zkr9z25hpbopge0hir0yvtnb223ibyw40k8swbmb2i5rbsjslkbpze9x6eu3ubhlc6t3r6tw8qrb1znaiiyclfgkefffu40luuykj83l0kzse69g4nmav2khi166go2s1rg6a42khq40r8ygvlcsqlw1u0jk9qgpdbxecnep3ijkyepct56dh1eafm340ige4hkp86yr30tx034yyuxj0mebfmjpuhwe15l2agvj7y86dxiilra8nwbbtghkfdj8svpsnhdolc57fipx7h5dczuqa23z6b7mzndlxlkmfgttwdi7t2v5wlbsv9wft380wulkhlr8ld6103otkn2mblqm5s2c61rs1bd5aqbb3oeug31pvy7ustbs299pqd30kjue0sefbr4khrfr8ophfsjksoq8g5zj23xzeq47m5lnkn08ea1eq7hzfmrz3or3k1chb7rch3op6doqo92n2ia0r7d84tdvajheo3ory2dwsptkmvp3hmd5jydpyhssexyopbnwk3mltcern48etwccly9rfbfsmel0in7cmggr9joiq32qcx6r7nwsh5iafntrio8fn0jlongc8jzjkvzcvkt7qxidocuiikhwf8lmyeqh8xv3j5anakftqqsmojt7gmewqpzgr4s1du7byok20w4robrlw5qtll8dpms1smi1qfwvn1995tlr9rm6jwnxl08h1hhfhhxlb',
                redirect: 'v1nnjeqpfxh9l5go7jc1f3aqoquf80q4kvgr71fbe8rgzjj38kzjbsdvrg3pl1wt3q3g9jf5iydqiefiilqmhov74joz7t3k7o6yezipxi1k12lzn27d07ms0orvg702s6zwnhdwvdr4xx2s5c76pjq0ry85qyoqnqcaj996akco1i2u5tzgmurg3fy0uf5yrzcj770zarvcqt92i09xlg633oe80vo8xfg9yzygcg5si7kg8seu94t8mt80i9zaroyyz89an6xf1y62z8h1quqnj2u7bgfec47i492he41kj5gei3i9s9vrnt220qg8rqzif34rihvyvgztaacj65yqes4pczqd12o1e6ifkvolzyx119jgw1khl0keuayb8hvgvygyt397cwzmvcfgpf30fhuzwqasxi54mh9cabw0gyorlrd2aosipv41d7vdsmp4x0lqn2z5jdfvods31d5oe7w2knmyyh9jcs6rh3o7g6j4qo1wz7woso5n94gdcnjyy2sjsx3cjiugpzztgqj02gqm34wvbwze45xh7dfpr6avb8aqequrjozcnsn7s2b5xtw1mvgmtcwpu0ptvkdmjokl0uqr211x3h4y2ikfw3d73yb6aq8o40np09bbqs6637sc11oewixtyqlql43cwmkgcdita3tan8mepecmp1ik4mfbeziuwkdrrnqvhyn1rq6isklpy1wu916wajvj4jd33ubiujat4ak1fsbp24wmp1el0hm5lwr1h6gpxeaihs4cied4au0ns4v9m33x72b91o2ezm7mqzkxuif47ui04zg3l3tvgtwcftmx16io56ebj0zfup44awrc84x7sp7q8zd0kec5jmn8vwll0ghyid8147cgz4hfivozkzrp3cp8lcr8mrfarcegug6dbbxll4185xdrpq74tpl5958qvede4fxphv3eibyf9frlt5un0a82rxsl1fcy8z0omuj4hj73lxhd1lynx0qmbda4wjdy0efhbd4youdszmmnbqtuoa27h24bdtfelvxd44j9i60l3pt97mmac1hmrn30981yfs0bqxxvahla7617g1xd8g4eg2mnzag9h9mu5yd6iv0d7r5k843jxtxyg0m9v6tpy0dayi39zumv1q9c5daepybg7iss1xolte7gwxa9otjom7rdsp8pjpg0yrj0vkbnn5xfqdikstcojhvr4k88oshkc8c7z18naxrl6s0fwl97py8stbag15cc6u701qxg3omyz0au4rocybuc59nbg1ooaq7lx7eiyisus586naq1utvwp3xyi7cucq481977iz9y4zytxvv9t5e6e0m3jgjmlo3974h55oedp4ari4mwrlbz1opnb1risrp1j7nnt93b0zcf9kqv4525mgft5p7rcwqtzotoggelhi5oy7kcrw9alxk69ce2emz5u3za3zn11epy448f8qhhbam9nrjnyne54xq4numr5un09nqfi7z5ropr1l5lsxzdqyvfd6g4ps9crl8un3bf7s9j4gultqyb9x746i1jsj09kzmlzhvc7kt9t6q0xxh570ebo7ylibt2iwl98bf8t7wf5bj9mhgu5izrorfd2qbmclt4i3mpequ2m047j7br3lpqdgkzckat9lltx35d51w2qyugjj1w459gdc5kfzdol4hc9lifi0oumnyk70urz5ru074c257pcxdbua7h1sshr64stkakcvidq4bpcnxmzzgjnyfqhfajqsd3pirwfl0jvya25qrnv1ipw1yarnph6rqpa4jtv6klysv3vg2epa3ej6z5pf4854xbqptotlao8vpvhf6qddje0sxwlcmeko8cb8ie8v6mkint2od49ep3ctf1yt46scd07bg2qe3wwgwzw20b4whcy6bsmvrvry8fqhml3t5orm0r887xi0egn1l8hss0bg273luvxwl18zs7xcrmqnhkvuzixtzni94m3ne40j00gkgcexh8scahzpsdjd51uuwcn9fe3ny0e48ghd6d02l5',
                expiredAccessToken: 8301216460,
                expiredRefreshToken: 28790090113,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'fx19ksghs19bkwdzov99jq59afqpclb5d2qv9ygr3sp4nt6jlezdzcwrbzomlk1kyfznkdoifoc2aj8dslfyfw7wetjjjls6t86y4nbxc9awclv54rg8gz1voysepzk4an9qgm9lvhpr1o454hrmpz631p414wvpl5cvnhlnty46reaadu5dp57132r4cwbm3zpsthnobqerv97n0udvfj6svp8occuqsvweo1dnj3z51gtdk0kqkkzfymx88yd',
                secret: 'tw2zckfzs72f50ttsdvsztb85n32v1ife625e9o7of96z91pkm74rnkcl5cwp9z7yk9bz5i29asm29eibsso9q7o4x',
                authUrl: 'uprv8xww8wdjhvx32zzs7cho5qscpdgcz8691pi8uvnatahd92hm1wmf40ixfsn5rinyt0z686655v20c3ebv2kaku7b4dowzh20lcoyayxilf151r0e8ti52mlt03tv0hs3c8y7x1ycyxngnnbf4hujstm35y1rabvrgfyq42tq58iejs5igzxw0mlsdbd60d0ik6q4vspw9jepucoegesus6rgflshq0fqxk9aemdjusn1ucp5dol25ye1k6a2irplo7g5f8urp266i9va0ztg5opzcl9bp5vvxbtmhn3o23x6ibq5zf2w6ydubc2v0f05fyz0d6gbqafeebhrj20rcjm7qr32aqc4stty0c1531z2pyyr4vecg1d2ie6dhzca76tbcbff3wsvt55hyuuhmbxmadovvf31869bls7ffdjba3iil0agzug2yq4qpw1d2ptpqr24rke5278o3pas1l03a010x474om6g4tol97xsj1k69md7zauaj1g6izeddb9qf6khu9hv5itxmdsu8z9ilepfz6gqyfkg8l3dh8gmeb7nzl1xfskzm2z4oe824pz00fin3aog8dnt144k34veq7m8yveha3zklkxyop0z799vi2xrydivk6dxdsetnlwmxcsoyqg4e10btoaqmhekksji3nlreqbrn86gap7i2p9cfkab8be0omlwvf4nsrpj4xtbv3hpdwtswwt5xw9f4ygqsu8jejyqj948wshz8p45sw0r5yx2rz39cc8uotwoocotccy265llmix0z3kuyye66iq3xnzhvkk3nkvmefsa0gmjrlxhbgszutx1q83azvwicyoyc8mwzejnsloiwcft6oi7papet5hn9jarrmig9cjgwo8y3aicbm8tjtka9nxlf0jvn9czc8m26xknnk1ygww619l3h6wd5k4kswxln2palsbpkihnym5nn3rc5j2lilkf9vshpm5r5wv6fugnp7on02hbce8koqhee1gqrvnn7ymkwgj4kkbx1qc5mlaeif5cnnn9nrvmu9be2g7ud6ht73cygjjbt5m61dzsjeo473hhc3k2pkpo610lnnbwe1ukra00929vm3r0qz09lj6w8m6cur549uncirbjm26hcc7av4vvsd6dhi8pzavtu9au5bssus9v3kpm94ex0ei7l1fj6psmvv74mpjneu4qznaol09mskuk9e5lug28vxt599xw4wnqlf8ge3ay9jwgnexv82luu6xb9sjgrs6llcaupynbu2e5nchi874bvc3xklxnturla0o5ghdso2sxzlu3pkor4itpusvkr0m6g8aav9fsudxi7amf1ryratwqwww1olklhuo9sjz6rpjw5admkkiyzp84a74s2e34kawy0t95h0lm7mi15dqv9bhcqyhh5v62bbkyhy8riwe5odjk07bzfmonyzt762e0tfu0v7joako4msw7bcgj62xdvambo9p4p991xmpqgcmiejhro8f1aclni27iiriyoro3b63fds22omfgundhpv7em9os5j7a8ppef89hn1qkgjpylb389ydw6tp2s9wejraoygcxj085e454ninqkmdl9d7nkg2mukqe2tj8wfay4snrzky98cy3r3acz8fj8t5kw2q44sunkfi6akd7fj1ychrfkhk3i8somey0xhcbe4w9l6gqlnoiutphqmlfeoroy2jky37ph3wz4ve545708vz4cupbm71ft063qcbk25vkj64rh4ws8p3s5170dj0kmogvu5e48oa4982vhl562a53b3ihkm50r1m7yx0aor1beuoednsfnh6zrptpdvztfttxqu7ig5mqhwhkqj4ytpbsew3klbywborbkv9dcjf3s228aybiiu6ozydhpl58l3h0ly7hmcy8pvfkoua98hirb8ui7udbhdiybcdozr77whmyk4ai8tyxainzpwmtrn65tze4bwd1aol7n7ifg8dboovexh5xaoihpaf8nzxgm8hg62a2sasn1k6wc96towp6',
                redirect: '3hbv4f90dal9lcn8cqz5nnfl5qk5uwosmdckx6253szcrs8ej071xrjcfjzdb1o234sqq6q0uc5hpr3bzjcvtsm1rkrwm6nonj9sw7jg5vazpaodjslie40j3rzgfj336ezpe34bmxg710ukjww0f6ibsg8cnk980h5fl6hzin17sbhb9wbaom8ax362zaykuakxbwdhpbhz0lm8png0fzpz7r89in3yh3t6qauhedj0f88oyh1ynkt3jnaimkyuh3hw2tcpi4kcg19ljva46nnmgupu9omkruds1a5mn5yg57a1bfdm8f74pfydewqxrqtnehyodcrxytfhfu55uwuxohgx55cfvs1lpjh5b62apvojn9y87oe9w3r7ytz9cfg924ma0e49z326zzr09nub6j8haq6nm23v1ds4w2hnjxyub6lnekuw65ua0y5yasbsnlyjr1ewur96rte6005nvmhp1joga7uh086rok951gsxv1c25bc2jmhps9adqu9i61trk40l152b9l4oixmd5q9gt4m0zm2lmcddn79ipeleo2jc3cmr80z4bhf03gx96lhn81poock3rndcdr0c6x41118lsya9b70vf0gmzh2fuuonha0c7jwmo97yj6zzw1e1np366r3lqxq60l2ou79vw5rnn3qfi68n56u13j1z8qut42pnh5ejewg7q2vtnp2y5mmb4pmk2xc5eeqkqedh8ge05ymf660esyz78m9qe0euwd3lrph3nno6smjp5peqdwegz617hzpv02ar6wxlxqog8s6ouqz5fi8rjctqh1o0o4fyfd6bij064r2lc036jn8upc3ymzuwncq9tvfpliin7y0fqxnid44kf1rl7ix0ptgsmwk0d3psh9t60tbomdalp1obiz9oy1i47x7bkzi6lpo85itykf738vds96n1hdytazbtid78f7nat8gt9fexp61uo0bb6lsnutrhhwjzq2i7epl295o0ravsj4mo9w5olbv1vutzlyv1qiqyihvm1l4rgzx0fimqbe4v401y29t973opmgak17qdqektfk6a475bprmgubz7klvo06w6an36d3zeigrroyn5y9qhymac6tqv6833z7s9gwnfzffqzajvetmbi56bzyr52x3hq7qejllkk21sxy6cja569flc2h6pf02iqb0h2ql34oghiqtklbgtmqj5k9uhdspeb19m2hgzuvbuwlvhx9s78xlfqcmxw278r67sdxatf16aey76xbmb235rwe5ntgoj5hhcxxfggc5qi5spodc41lx9vjzgvjwshu1mpnwli45boq1o7fdh3api9kj7mcq81zi5ln7knzfb3uojmfdnsxr3uzlij745g0l0zd4299pu3zpuc6kd8725tbzne2jraqdejiv80gllme1d28i6m5b4rxv3izpu1q63xdrrrti4b9kbru3w8mvxdcu910fkjiziq77hrvixb8ewap37oqjj6h9qfui13asyzbe3aqkvk9o6rvgaecz0lk2nqp352ul95s5yw2rdhiodo04xvlij86f0qmltm035dvqvc5xxngjbx809tlctt4jpv8t7swqrpj1u10xy382lj63s3omthuih6rgfzalacvsu3zryo4bb5gt1oqd1xroye1v1j6bwc19o1aru4txywspsxin7e4rog8fug5xyo3h3sslpqp1zcd4ljksq9m0rrte1pqccodlezocud1jk448vsg8jkyvahb3cpikjpghl54eb3bzceopebcursft29fdmawzmg6j898euze6x3tuekh66054z1iowlxpz5xxmv9t4q7e1zdn406rq11dv8p5q09363dtw5fbi9dikmrdcfsatwr0k69u28l9coxleiw9fem9hq1huuwope9h9s6smormkkjpqfxorb64okaupwkgi2vno3zqry0mollo8p7rdbrld1t9uh1areu1058kwv21k4hfsy6bv21y6t1ahmf2weawn69zbeict4wosj364fgmzx5ce',
                expiredAccessToken: -9,
                expiredRefreshToken: 5534495453,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'rd3nwq7lhiz0ns0bvmvmi6op1iog1st36erf0skrjpml9xoanb887w3bk91copeolfmpmlkocxbta315tzn3uq1n7lvaf6ilc3c602pxxjx8rwxv4grcb4lfmndns470micyow1o1bbrnb1yqnxfzhqkk0825ud9j0jh0snvrdcjl9rytt98m07weg1q430clj2odmfw57pcgq48fu8y4bkfqlz7tqkr4f0u41ixro2w11bv7yvp2j54j5xfdj3',
                secret: 'vsx2id7bj8ldl8gxnz83req4bsrcpew6aw24l18l9hty6hx6epozo0avfzkjcljq3cxlea6lqjtfmkkrh1d641xhk0',
                authUrl: 'oqi1q7hg1fkvjfv34hzs7j6f5if4gjac1zwnvmv93bys61j0zr8goxmpf4kdzrgk7u8x758l0secef7izp97sn3mu5t0zqbjv2zbyugox9ioe0syswmgmjwxtkxwkk38xh3mdcb3r2fp3gtsej0qogsh02zdl9vlk2mz02mtgpukpnhwwg00c9edo3f7lex81dsa57rqx9c8a14ncyd2dc9fsrbq1rm6v2fla4cs1ztinxltfswlzk1060jly2app5ak9olhkk83jgdjwy1ji83a8tqaa6cggrzc26d716hw7c7po656e0shfx2x71sibcxx61iz9ecpa861tromz5phjhemkekgnqfx1lyqk822pqsfeqf679nip878cegng063mgq0hklo9wwpbw4mzk8t0xzeye4128a17g3xqycf12eaao5lt3xi4i9yz1bu74159eklnzwvnd5hefpgbkj3bc6vpw2pyj7ly3huvt0m1u924e5qfl7cwwblkmvdv821w916wznqu024i44dq76dttbq07fesqxcq8vxi32a9dhbn03f0ir5py71xzv9kofhnm209e4i2rt5drflpgp32pb29tj2swzz214xlb738lggvwn6ysvofcyhhhuaqh4w5ijmasrwt2uvyiexyitd7obz6v1fhosfivr18x1dvzv5u7dzvh3yxllk4uhszdk4x3kn39qlloxzwpl6g5a2mygdoypit86arvo85rp9j5j7aoye294ibjh8vy2ghd2lxqowkyy39mxajlnfdn5gixj228d064hzxde29vzdy89krkzb0jprbeh9ku606srf0qvdgflgk8n6pejt8lm4p70wpwkuzhf3zjwikl0mxvwu862yxegdu4i346q6qsk3dn23clecssf910fasmlowkwiwig465weskfx7kdo9vqoh5r8pzwl6hmcerp7u0pxovlxolog5o3pghgskedtwvfbkqf5og6n6rbbz8wz6yeard2n2gjul9xeqnwpeh3478ii7o66ytv855rfc4vtrm0gh914cuo6kan34enggr656mr846eft0wcm7bhv55yic4yyzi1q4o7eybns8cii3hn4g1bk9e96iz3siywcnbvxp3rocz3z45rhg6n2vy3vpbhn3ibfiiri21lhwtvbot658s0gf2ul5ubzbk5wkrw0r0qm1kmqwtjzqm4wyq2e5e7i99xitvkwsquyv6gv4x48cbjbqjv4c6ryqav692tyiarnh8o01hvsvyiba54vpxryebpvtj7xolt9htg0852g059gx8n2ym25m0jjlrsv7q1v2k2q4yed176xyna7imjr81ida0w9xsyz9cdklsvql0utx5jvkx44teefukgu5ysy2zur05las0olfnecfwjs6l8fyp7jhnurm9xyyarrbjszd2x8al4t6x6c0q7x6ggs4zd57hm88tlgbu7exowf17398z0jfs8pyoyszst4cvgeyzzcmrgisrgd8o6x4bhsvd40lmz58690eik92h4930c9pep97qmodtjeki5xrgkgt0s6wwgyg44af5q2lxdaiux1ee80ehmcsfv4kvswuzlzidnex4qyllsu74ngeykm3pi62wg7z73ftv8df6dj5hwwewk8j2t8q1kvf66sk62rt6exvwhboe549vcfatc26tfhngm75gz0tytod8tgeeokmfwz94nvvn0akufl5vqbtvvp5ii8d8ueqius7fixi2pn1lumtabqc8g0rdnbu6vglzql1wicx8gt35ge76gi8gkljbz3f64g9vbkk4g6v9lb2xmaw1613hmih2vcoxhficx7ej1i8z1br4cu35rqz19x4yhnsjxsc4r95pw374oza2nq0j2qlzkl6tsi6rixh7duoa3o4hlligb8nci2ekuvma8say1av60awb82wos02zymghsnwz2r809wsk9t8q073tllx0c7ty2t69pbr8ygzclawwrmdtdasaej5jdtao41n5fbjjfogvognne19etps9s',
                redirect: 'nb43qh6sdw671u4at6006imkenek742r28mr8qjeoqqt7tefbmc7x7hcuos9p658mktqbjbkiowkzxtf046e19p2l55y4qgrcptli7ho8q0izrbisfejgq5lnvkjlu52aacwcwiu6uvw4q8znuf9g4f6f8w5z81mzt3ejbhsbfsq380gcmuugs9l5nibcv9vb0jzho07c6c7zzhtt7tog5ypih0i7jal8pens0zoefp8y4vmlx90v9qyyrpipj82oho42jvsoazn16w1bseqzhnbn2mz51d7ulmi63efl1zj5j0k0qfbdeco82e9f0xkpzszxz5pw6j84agtm2fwu0q7ru5y3zf80dw7695sjqn9v42emw64gwowc7br83y74lruvfchxv5b8wya8imopg6311ms40uxx658x9b67fpt5pozwt3p04j1wbkxcouuyj8ya8762fml4v1m4ai9wj8rarywo4s26vfqg0wzbmaxl61bdcgkqdxf3wh7482bztrae212dh9oakslor5rco7cacgh5bpsqscr47m56sxd06jwl3lf4lswkea0rv4dtosqqthm3gzdfmkcrg4j7da5sdnthyxi4eck0pwycbvdf8g40uap5474l3roir6wwokqn769k9f3r6f9rzvmxqwc3k0qr2fchflqqeqzq2ersou0nwralm7g6sfxq3nuvc3pajienolnatf7vbmyz900kun7wge3j2p4h5s2tpqmkjk8gn3obmi0906r2ngz764rrpn3mip6imbeo9fyb7gx21hsxg2waxz7xa1u2wn890piik4k8sg5msh36zj7qfgmos60xn0vklx6uv8wvsppe8eq8bx68990h4ee0msoqz209gdaw85v85u1zekdfnap2yq2tf244ygqh4imlx1dvin8nzptd4s8wpq7ipn5xpbp66lah6v7yljjg6dlittcimswhbkv6saxarsp7ddtpsuot9te78bgswjyx1cvbrfzsobk6hsfhzud8j37slniey4vrmhppj9nv1an80lcpr3kmgnwotucr6l865pgdpe8gvsltoig3k0hxcxzil34v5j7qjy7rnuzee25t6fcweixmb5elv77uqmfzw4cclu4frt90u6l1z1ru29xhq7wlucnhvcx95hvx2zcg2k03qok5dpojs26xz8hi7m0ux41ho81mbeujn31xepg4aqd67pg0f0szg4wf0cgfgt0yy8a3crs10g0zpe2wmmjawdhsq3z56lki2289wmymjwqe147opi82z4hhi1zm00nedsb01dbxhcuov3i9d6a0swp6og250mz2fuidfi0gaeohbgqfk1ywbh3jyth09yoi172m55mbicz3etj2r8nr7ipmirw8cdxs52zpbf5i6z8oygjgzqwwr7q3zn7ypp81ab7tcahqbvhhjutfxfa43qa9rj16locp21yusw5cjttt8t0wtpbe8z6lesqg2utcsgpthxxxog9ghmnm5dfy6x4os5erncr0yfki9a5v1ltl2jmz2ohlu78mxl7i5e1o5abek7qohlzejczn8vrfujjiqzvu98sa8mdx65toip13xoymq4q4hb71b2egj57snjy89st3yb1mrn7i92j2wgzfxkiay9sgdbmcsptm5v0h4pkmfvqglsu52kbjikr9sd3d526w62mi8va5hay1cihssmsmskn6vx5t7v9hnxq8osagct5lbgfu5cpvhjrdk2yjp7900bhvlm1wz9ips4qypiwgy6s90hppas446aly8tfrpnc4jgr44robxydsdxj5rw5xyxcbbhhhsxgt67fhmkz0bz5cvkmb93p11iiagco28chqjs1jc0m4jr92mf47pr59foxvjnstzfd8az385yt7veja2sd8ggm4jc1hfu9niqp82de6gxhh1bmd57h89b73jq53wnzn2w3j071k0kb5e5ehkuvujcpudovxn32jx3nvysfa5x397esukqijj9fby5q6ul26uvkthatk39xmx9jo8mbr2cg',
                expiredAccessToken: 2356645463,
                expiredRefreshToken: -9,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'b0lwupc2fs4d6ktb4bi2bs8v5ddl9zqsz0qa81gfm32xmz62622zm8c2ef3jeo44t7bu7ysqgk0wepk505b5atx53tem2ejc6zrx6hr66bmjbrck76r7x7dwqya9kiiereftq315kwl4s3lx72ckji7ve2db9j7afv7zwmmtegwev9lm9tkyzvvco2bcc0hrwt3tdplzc91jmjtkbdgeyfhdie8jy31wiku3t8ofh329ab7o040v2hj792t7oxu',
                secret: 'dm0rdur87y60x1vnfvcfcryzr9xgqt408iseghlrclyk99296c8zf62o2fdkdi2mx4u0rluf87q8n2d6ji8tz838t7',
                authUrl: 'lgm2q4lnasd2rcjifv0wojdsz6yry871k4ad26f4ddgl8k0ify22xi4tbvz0wpjsdvrxk79z3r8gkdtz2cviex9qn9fmssefsywlcotocbr0cxht7jqcgfi5b4br64va19eetajfcsn8oa98whdlkgn55ekr5qt6hkenpq72x6at5ock8xcst8z5x4eqtfawxvktmgxlla6ncn4r94ndca7q9rr1enmzu5kzikx2lr9heqkren9tacmw5xz5ixnj6t1qm0rhiui7ska525tqxw8tyhl3tgo4p5s39ppae92rr9omq1msdv127s7bbv0jfziqxoxpxcaz0kfsn179dd3e3zd5n97lqfuvlpzy5m6ft49ztysczdnpep3mrjaym3bhcaf6yc99hgyj05tdbk04deukvd6f4lsp4itd6ch087e3jy6n6uj1ao58exfmp4uuec6m9wl2rk70a6t7wu5zrmg0oeeyhxs33bm85aum4fmdy0cyrn5pl7k992qbmb83uzhncqfse1c6bakbqna3spptjkgk507p8s0bqkix8wxpn6hgtn58bvhn64ijnrpwzm8rqqbgyg3e068jnh27c5r6a2am4h2cqmvk7l1gnm9a9os7xm3902dd8lzz3bgjfygi756x0dtcz0o8jr4xdhlhgf00qlnqlm31fd6vlnsala1rsn3jgdpdd3u65wn99i3wfkss36huanvcdf00iw52zkwxr6kwxy5pp92o84e7wmhlbgn8i9n9tb7n5922vwr9pre0ul7nzrg3x1dfsjq2y92hix34uxvggcz36cc4fpbqorbxzlplu13dyq81h6atijmxp9tlqix15624ppz1cyaj2kbureejfrr1iachxt5silexyzpbb38ya5jggy573hdychy3d2lcuamyh9feb5jocae71u77mffvcwkpr93o81310plr56q1lm94zt13a1xzpgei157iubj0m6k23ws1yj6ziaprzbwrx4e8bl9dalrhghitliie4whglzrtsd22lqidgr9z76rvg5q88ewlvuvx5p9odpdwbd71o48a113h5xyki3frwrql8dd7nbknkd1sdnk6m2n6bsfa4q4shuboj5cxyqf528wb1ad5q25xvfca2gd5agxz9c5lvlvn95r1e4lnhvy3kxzj6z79g7z7sxayi12eyjsonwyqqhf1hzl75okr91afu0eirgml9u0nhkbtfa49ozjlovmv2o3nko5jdnteyxfctad8lo5258ps5t0wf1yn0dmov3w415npasz5k8cul49fu7ohc14rat261r8iqvy3lmf4gsi4y334v21f5vkxx5zcimui2y299bw6ntzqv400puiv17en1enwpmz5mj2gymj2w9zq8hmfk44guhkoy7p8xaemfip5w53pjpy9o58lxdpivnlaop6ynj12cac1zf1chet0g95il8iannsiwyjkwlhftyp4625rwjzfxz3y1o9d6hcppuixdubmsc5obfq57duchcdn5qgeigyvrxc89c2pmm1xg7c5li4u180djjeiylpkarl2kfa4dns537njsjxiu4twfp47l9zjsqmxfngbut8v1qdd9lyknx920rspqvhdbkphtfu3fvfw7xtoiggfjesw4infj06giw03kllfzpjvji75cymxhxmhobknxypez3fqiu53m0as7idzkdoydm73pfy9ultzxbwmpkjax3ztzrtxgzyhdsxvnvbopxrhzfpxfdwp6llzyx2u22tizi4jpo70r8g3gyz45ejfzp9yw8hc7d9cv57p96w8a0b383a62j8tzqyf8j47hzquothps8xjle6yza6976mocel4xtqxiih02i6fia0a6kah0awxg8awiseyhlnlbkh7v4gj81dmimy45pcr7yvge2r6d53vz7pa51m0agz2lph3fkck69pmdzeymlfypnqpbc5o5y38dqewjos55h93dchf9b7nghrnpyh3inojqo3bokdel2lm4ii7tizuhhkdiqlvb6ux',
                redirect: '4xc5ena4h7nahw3fmwv9dv7dzhcpvc6brvd9z331yj0ak6mqmf1tw2m731pafz5jzi6dx2bijzpcz2awuc7qbftvqww1sqy8pq1dlwgvifxoi1sla8b1f797q1txekk423hx5s65u0ns7cnvjw2lonyc6r23zrjy67eyz4wco9mbzt992dmnld8rq1nejdy3vr11uvf34v7jkqqrfj4bdytx3lns882tjk57psv4p5lxjoofz5ipk9motlqdhzjg2q8wx1hxs56g16gd0z8foi25ynl85a0mnt76lvul14olon7f3drikvxzimsykyl7h165jgg8bpyavgxzp85lfc8n7sbn90l49g0kchm6jmm0h2bic2nvjyl9m6xnuypcbmlnaabnudfsc3dvs3s68gi40teixthqf8gvgdve3bktea7jl49tlpzf80lru10jn1hhukfkj8iocv0zef7lnoaczrfxxkoi0wca7rgmjg9kehncvfu8nj06tcw8smrrpu09pdpbjhf1mbt8956dc684zkd2ppejd2i51pocxot7ucwvctxz9c2whb3f4lnkhd326at4gn2sdrnbxi139z1jy33ftvb5042koc81glwh3kjx2pkbsr1psbe71klug9cnjnj0m6es2j1yuj5ohspmdexmdzldnq2dp801dlx5n36k1twi9eh7mbfaf22dyk2v5ccm0s1zjl7n6xnytysypmaet8azf5cvruiv1mgdovpv9kl3gn2ex9jhgfvdomndz1izrhad345u0h68ubczytwcxacp5uq94p60oxri25e5k8us40yjskogdnjgndu6iroj6ajei5yishmpkkh3lnc90x2wz7j3xk3fb47ptcidbqu2cr2n5iyqdt84gx0trsmdu4g7iuqpqpghuh8cp6onnpv1oin8cm5h34wyz58bt0narz6szp9wxs071g15znplrmf6aj919lhiebfexg2zesauo46uo2hc1ouuke2ey08p4vwtawta498j4n38ighaprf23zq4jhwdi7ajh1u6hejmzq1wkn3w8ab7cq1n11rj1y9hsa8co1j22vbsm7pd13cwq48xds82xjcu4fhacdnfhq661b80imno2o2ko7agf8rher6i4l3x8p46w07ycq0wbfhlg9mw8e1gse35rocukv7673gowjft3ssytu61if1jvm6hs9xz1xnhf3qduqxb5qqnc1n1vztojlm0e80gadz8wwy5jnp9x0oqgruq7r8g5b5ziceec03o7q8eenpt64fnfsboxesbpuywsmx8o18pn3ox479h3co93ft1nt2moit1c9wqcrdk41b599mlh3f1945lcdoi3du5xys1t0dysf7k6lq2xdc19p2q305f1qca8yxlb6u5fg22pzbv3pgpyv5c5c8gt4fc9w09ekgfvj2dzvg011ki80iyl0keaavimm2fvdqnqbw6uqgq4cr7k0mfucqaza3rjsqfezefvetrut3mu3vkchf1sia0jo9t6u6fohiuhnomvv1j3l4ybou8dq0uwkukm6ty1fyu8yjfubsc75vshujtfoinczuoyqtyy5pqfx5mga94cay8t1jc0gluf3qn2wsq6xov0ys0732cgnsuwkumd1uqbzeh23olt7e8432iqf59cquakkqzk7t6p772k3vnj1db7yqv8f45a7b5g7z1f4cp0zs6ftcctpc850g2owhpbq95ed0jxrvo6q7bg49egbheodbuydcgy7oiec7o44a1onza1ygagmy83yc9jiw8v0maf5b3tmxlgmvcj5xxbw513q68hb3m3vupgb5uwgjx0bj94rvpd02pgbn8pfnge20fa4fo3ydqicdy1m0vr9gxuyaeik785w5myrz8ikkevppioprv1xzifgko0o6saq9yyrgoipewpe1zqbhm7cdz32bg4qt52poed6bwj7mlwj5bdsmkfx33knryz05yvmy4oiu0ltz4iuy8iq1imz3a6r7lmhjyt851z50db1vf4636kwwp',
                expiredAccessToken: 3398132927,
                expiredRefreshToken: 2628706047,
                isActive: 'true',
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'AUTHORIZATION_CODE',
                name: '5j8v522am5jnekg520xemkobclkiduv3tvlb7d322ao8eqdqypfl50azvn66uu4mpoje4a6t66b71ouytqsnnjtcf4a88lxncyhskfwy4xzpi38e7jeipikkpaz3ocxmekgxbxfeq3bsma0u3uc5089u7pmzu4x6jevjojahwrb3t0d0j48kqi596bqp8gag1d0wzpts1nq36adqxrvp7woec4hhkucbf97h8hc2a0kchsu2fcv2owkwojiw1xr',
                secret: 'ekw47aodahfh8ghhza6clysifku94oa9k72dr3k4hebtegd49y9i0vn0by7pxg8ry0msvl286p8gexabsefea6m9ry',
                authUrl: '62ayabtwzxc8rvv0ljab0e8ef9lqppkn7llr321ztyw8ut7f3mt8ch68ukcnr7zq830my09575zsewz0smdr7q4juvw0dqt6odh7vntzdvw7c57qfz6b80pyvk1wjhft2rrljepcazo2g6wp3vfm1ensxgttv7g6j9amji3z8xf28pnlf741xeg0bg6cxbjjho1gk1rrgerpqpqauv25f3vwia704i4rakx7fkwtfi4cr7d2xy4k610apizk4y8km6vmeihlvwl8n03vieqrovxu8tdp139jvn6x9vk6q7swb94epy4et0cepther3sp52cygm910l2cpa0ke76kfdvdhmpjklcgbl082qhnxbvyqkcy54be8gk8szvww001ogmtama3tky6cpwsex3ukaoy9wnso9u90yip0lanerf7uywm3dze5y2ylxl1rj4rv8o25bw4lb0y1ri4zethdbqp5k7p7sg6vgg7po05f8n8mf8bnrjssod583m7bng2sucfjftc01qm0wfiernqzcp07hbs1llmhmfxp0mursup46zturixvxlmqzifs4ksdwenfni58aghhbwj4b9tpk4n12wclhk18o9no3wq3boffpw8hzdpsvprup1uo8nxrmrojf9x647jk2w2ol4kb4alsungqh0q116ah4agtqv4qh6e6z2z0fyu3sb07eih9vsdjjw8xi522bsl8t97vc2exddk1ybxlu98nc0s23zi92070c1fg0vmhs36ij2haq53ni53cwq6egqiaee3chf9z8fcvg5uxviylrtz08l5mw542fhf8naqpc3v4fc2fakee4caj1jgipfchrff0thq09wbshxhy20eullmtrogxpffsvj0ab16k3iliwk3q921m7a8d6wwws5fc1qohwv6ucypudngkg025xotmot4a16o58sruazklytz4wko3l1dntmtxhdk9xzqvcf9hyi4utyu0iyy81sohveb77v2dx2wn4skt15snn4wqknl2e9ei5j9geoqb14f6mu76it06ca8euc0ed9u5s7n7dt4p5poeb1ux9ckpobfx9sfjbnhsdj5re6rxtd3iunm6f20jrk91mc0p1ascvrb9qw17kk6qwoulzcdzlvp5vo6ocha422znmkp67mn1nchwuqgd7wp7pkgyrbilywr8zxg3j2te007kzbqvjnmvl7ccoyof4dhsnj6q16xe2j7jhcl8rx62v3iw2pjv3oyia7h0agti6wwm8qm4o9o5h5oca8vueiykmcwmiesa8qj666kvmnd9zeonafrxmqc6zt4adf6obn95e7vzdkskbh22bu8yqop4m0xd6l8qdgtndou55nfiwkpcozto73cqic7hdvm41o748wt19gs6csh8nipepwid4pcp6yzw29d8rnw9hqup7deold75rn3mfdx27e8v41uw9flrxcw38zb77ox1y64yfr8a4n15gnijemdmzxj0t71zu2mm5y63xva30lyw83vcpvj2vdri9tl7w77aenylh08rk73u7v2cs0ya9yxotod1u1fik0v4okv7o6kkq4a90bvgqhzybwpf4yej4ra60z0towl29o5vpzct33767e4gnmskzeoixt7357r6lwxgnssb2tm37tujgyh202gs67zc2qz4lgpbjxycgyzmaz8d9z5i5y5aywcgk0r85inh8y35oxrox9j7t9yo4t5r21yx8y9edsn9j6wwx434hj36icqifkzi7aimz70nyk0s66v27q3kx678ig7ocvtcuq56ibmqhd4aaxghlws8dvhc7mqnet1138n6o3v6tejjl8pc2ifiz0p6rdcslg8hoa94jkd3iqfrctsp3dsh399nu5wllf4qak2vru762ynmsjvu161plfhy5ki14ofy28d0jn5mldj4opwam2nyanlv8ohri38rvh09ymttap8gkr722hgcnpcc2csl77ibifd1smarhat2rsglpslg3wzu8hchp8fzie7bd3llr4f7kjizp3jcw6o',
                redirect: '3ah5bi5jdszc3mds4yl09t1f3nb589ezm2mbprpcakijf2yxbpuz8t8ylvkar7sfekpzqhzfx3w4n4u6g02lpsfqo8da6zeyrc5awbzg3r7b017vp3vzn6ldo0efl0nirmzulcs0oy0yk8hw3vl3757vyul57eakqzksr7a4imbknmhfdr93bticgh8wpbjuidltt20tyv2h9sk39r2bivy9vhygdew0kh967c1mk65txzajqjew6woo0spmht0ooliyol9tdetc92naqcord7ojnj2t518ku9fcz3mj3revettlqe6eiqqgrg9u12b1giq3utpjtfcgs2e2p2l90wcrb6oxeq2n5uw2b0s3fcy8rk93v5x05ultzsm8a467crqv9s48o508d912u74qyn538opcahh0wb9ucwp5lb19ocxgfy66b6txdkpqawdensjmp0u7wolo9skwbb2uibsgm47ami49meoaf8nhb5wwu4r21zk0gu5vblm4pqrsriq15gtek09v1sq38otxtf8ltio4v8wf5h6v550m8qd68907di7izz71usro62towmzdscae5tfj23s36lnrf5wzau1wa818xvoo3fvftgb070cgu6ckq18rdkqimgrp88114avxa4dlimv56pw826zukbml2t6316vu6fjqu52bty1a1iq8sec5se4ao88zogtwqgashz43ujsclhrangeeu5chkisyzcey115502tj2xj1cvj6fsnlylcyyclf24ef1hu2feypuw5btloqy4tdtau8htiifralz2cpwdnffj3kgq5z63vyq5pwffn6lxsekscczz4mzju1cbv9zsz9k0lofs9z6hwdooazbkqq43dli1tjhlc2bczayewfw6zfmgxsqsh4xlf4yn6itpwjh85qms9rbc3bvui8u72qewiowsn9kjeoea7lko7pl40fgrb2szilz7p3h84ffrsf7alzoy5p9u2am56mvwk8jzahu2ujp1urojxncrq865ogsr46zz8c3xdex2o82jx7jy8x3tufaab6s6o2v512eqwl2da9p0g749iav130w03a9ldvxl4v4lxrjbkcjyfyhdsqybu795p7vvnsdhqzewb4s8142oo7vogdsj72figenj29ac2hlw8rzndedsqpda383iy93qmt22d3drberk6btmhkers1rvyr5cbyacidme979hhh7tgc677ojlhehgf35s2gu1ndj92a0rrww7uo0u21um1ngui64jqzy77q81euwe8qvlenk2x4atz7wxv270px4bl3smcc9sgxnrkqiequctjhkdrshekz7ehlgkcrafzdurj5ge3vlwpgbd7indveievkb0qx3jyi9d0gs1it33jnqzzff1kuc4dyvbkvq7achhelrza320htj0j9u4z8x3t3r9v35m29ljqjsigu9p28gqsqgyit1aceltgtkxgpu40d9swvejq2s89cvvd0izslf2p6b91j8o24jzy69mmjkfk7sx6nn1jspblboarlncgycsx0b6cx8t6pdje9n44ox32v6dbnnsuliewk786h2a2ad0kuv52c13mpau7m1sw5ninzykjyv9bc1q26wowtn06fzo44wuwjfyhunw1u98oyj5vci7qqyqz7w8z31pbq8wwjhqid7h124l3spzw18dw5ah5bwxmogs01f6dur46xoh8tgebplnum3k09whr6s3p3tse5l2nhway90cut65e5bzunl22avao9ykbrx8cxaw3f3wzssi922thjnb1hxwtr44b4zk4a9mluom23bpjg2x2l45yibxfvrrpebicclj9y9k49dzo8h08trqe0ysxl736vnme6x0g9rjrojsxzdsmksscjzeh59tdt44f4pj0it880yt8dr31qxiqskjm7g2967dc56xrmp6bopuxohexo6xdk8csz2h0d2cqgpgsnyxh1ezowrhftclshypcldocivseh5o324jv96dgt756odawpmyq4y24vamshx7lc',
                expiredAccessToken: 4785241169,
                expiredRefreshToken: 8800692393,
                isActive: true,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'XXXX',
                name: 'o7b2z42u3mmdqai6aqxw7ho43jop46jh6vthv1gfql3zvkumultpsb84d0dtdg86nlmzxm0renvhie958jrurig1sfaf8r127xis5ceh5mts1u2xi1y8g9a38766gyurvnc0fhi35k49kv4n48l7jfbod2rwf299bphxb0nlreyh1z83e1ub4i4lqnn21rrh7nwwwhvfuhx07biipk55ef8es2vktvrjkrmdsbqm81nk098m7hzk4p2qclkiy11',
                secret: '8b7zv5z1629xoenoydrzeltvfxh9u2qyfq42ejkgsyuipgq16mafo9okx0f81m2imi5yf0c9ti0wnwxyxhj8r68yu8',
                authUrl: 'kgxrrf1kz9fiz1nlysxa142ti1u2fncwckuqgbvjxwbpefvw9loejnj37rsp789b044yergbtziub2yfcsu13jv3z03r9uz3krndvu3sxz8uzl0rfsran9phc1uzqkezle71s3x1fz1st14tn256n45222xz1b8ujjmdx8kmxmesqa0tcpnqwlk5r4xsz46ddkcwafomvcj6osxc8gl0h4n8py4hpj2v8nioabzbyljbml0c2sx0fettvq5vlnicmnvrv78q4lyopluijrpwu4ff9q8ziblz4n2sv0vf5fcq9hvq1v5smtjk8z2ir4gnqn35ix7scs5c89r293olb6r1gkc8qcg8ulc52lmfyzpqa7k77sk0suvto4qs5b2dz74v5kym6f2i2zsjic9akdb8xzeuy2jinlotymghvb0t8bv3hovc4wt88cf3lnr5uj7i6dn7el2a97wcdfsmsjs2k1wnblktssm4totnk9bmxatpwsnqaf76g99zqwepdyoxnp0dgbssjw2g6gp6730a52850o1ub8qdz2txcw2sohol5n8bezu167su8m9l1dwpvhs3wrx3rz8r4ck4tinjyk0qjq7a2vpjae2prnmmas72ung75k7hu7q6zs4m5tzm72p55pl6els7x3rl6jm8z1k60kg4tihqd8nt6syzpsdntsgwppw4rvdzaaf9r41d65tfthlt3hwy5vwfixc92eam6hqdi8bfa0e6np4msz604jcpx65ak27bqr80e8jgtftoj3kyw9jppssu71y9l3zfywpb6w3bh83y44o4m1ebb44imps910w7n5p7v46t1ygymn6xoop6gbhki7simcuyb014v786gsjo8wr9axxdzjqf22yfu5swm2xgy4r3n2yrjk6ebvsimi0e17ke4tvw7w3w6wpwo236zdon6yevz8btzucwvs8q1pnrdtyp7dof4x397ody1g0ju9oiqc2vyxw5naecis8sgt4b423mbq1gsi90qa0wj00i86d50mnpkes900p80xma44ibn065ik2oxzy5en7y6kuasg390qw39mt9xxxn6x38q3fnfmcgixsikca74fdhi90b5mpbxvewi4lbdwtjrningjeb3ti8vu8wnihxphanckjoev4tu4fvk2zxaf4wdbtlghzfg8zw5w7xolgepgsauqx2vqzcpmhfn4kr6r34vdcmdkybf10p249nt5bh7yv61a8kj5f1dch68s5k255zy44yrg6n1ss48y9s0pkzo83age3oz75mr532ctxz121dusf5gm4o25ynown89je39bhesc4f6t5wy15l0qezgikiovcy6blph08ncbjvf7jhi4lepfgehfjvoley2qtwwmhebl0k92czoodma29slj0fbdkujnycovekwu64997n2wkgfzg4fx0muayup2etvrc3kduaz7g0vfbmy10kxcqgs5pe0tylwlfl2jexcykh670tl06t82eoav4ckp9bynzc2z3fmdacwib02osdhvvndgb58vhummuqi0x4ix7d7pqce3kikohlmiegw4ld22t9irnbittdpy4j2sn5ytwss176e6kdnuatruneqrzm1tlafp3q8nlrd63cqmhwf2cex865rhm4zeoh6mrjptqgjyb0xcdademn21s5wrofs0esruek64jcgrjbxt4qv66xzuk8w1puzkg23j6xr6ttzg0qr74q66i57jzwdqmpcgaab0ttr3hc86kfjz4kgzl2d8mbhg35yww10jbchjxkfoyxk5bt9s5rxkpvmmvn1p9kk9honb30psnlxzviybrftxt4fwhfjsrfj91cbuvytcbv4lnh6qwtb0h1dv48je4w2socd2g1wta3kpqz18whslvr9g3kcdk1wpv3jubodjl2sepfa54q79n03pqgpxkwfpbtgnczwq8jtyj71ktibgdlfow8c307shr8s70mts0jop3d0lswwyn1jap3ht0d8fa3wpqs0sj550zygo9h6kpso904fo5ecvge',
                redirect: 'hy5ji89bbrk57jmfosgoob3bv0biucz7xsgtpu4haol15zyr8acxbf37n24nbcw5syslvdcl1hfo6cyv7emg5i6gmgkz0x25qwkwh0ow7jc4arikbzcqsr88ybzzzy28hrn3b550gai64cmmeovnddzgo1rpfxenkbv94lwjc395nn74sf1s71p7s8hnzngnbg1pktvus6te6uv1ncnmpwhc9wx1thpmbks9rrvwghm6agvedu3t4gg0nlue900ielogs1p7ij8lyqvz3w6qhqfx9qz5ea78axus6haf8o7xeks071utiy9m8mrr118637kyjm90rsdqwzika7i06578syidzzyrl8w63covdgttnxej5tx5maxodc2vqbette95whaze73ndeqh92shkqanaprrznufya80m4rocx467qx9jq0096kxk9j5lpyowtge9qmcrbsn813mzl4ocd2pazj068l1czn8yvsherej4vdbo4jzbc4t7hgdhkmw0ucro9dttfeief34wbqofythz2wo2akizr2yhvrzlzomngwcfkmrvpzy9eo945bfw3dfzoaqafehglxukxdwey3npqw2dh5yeurzr0b3w7syoyn60ydgt4sr2c9t83d9rnv7falu3yzq76uzuf4l007w8c74bhujrwersu38on9433rd589a3fbzhtdwfpqzznmamhf82v7aan5hgc2m8jv9d3fhljqg38lmqv7jmgykjiykqih2gyyr3c1z6f9lgl6igufuvrmoi7sjzo4vcopsbeljuvhe2500rl5b6jq7ag4p8cx35s8s1wjdlmnia01vc81b0k8665sgd0j2pz9kb0xouir6qqs0t7imn352pkjlfs5avm4a0mhhkozecid7cf4lu3rbr2a3p0ti5vwsuxpoclnlgabss267y80y3vosnvwlfiquif2z2oa12uxxfsfpt1xg80dtjs4usg7qgd9wy09vbhu59t123szzmif4ljtn7mzf7fwe58xqgllopp6qcqne5akwlqyucop5081kjt2khzxssu4zmnlp05bkpwvnrs52axhaoqtrgmox5m8tquarxubaf5c8oipzvpnms1pa8z1x0e25keow0p3rx86jhwmox4d2mz4a11230cdruf8e2esykgqy0yoxo03w7mn19uxtoqqhfa1dxf42ofci7sc9v9xcssyvbe727xeu6q14awlejxswjzgw4fbmja6c1vsvh01wvqoxdslv9jvp2203sm62k08e0p162blud994wiu5cixhqoo488wwc5o21wfv7k7q5zsc900m4cbzmhe1x8i78dnx60hmxdme76bexdinsayq7e5sduxn3ngxtjj62axvakeeki7eaf06n17b4ep2c26t8x8893nnufl1qrl1jsg7o310m9n89g73qqya15gq26mm4x4m9fjntq0jawozcelh0efra572sdwzh8x05akzft8pzpza3l9jgxqtk6orm05nfhtxqq5rqi3t828kv5ny1g7i9f4dgsr283cqc4ib06cr0ftqp6tdyuupk7nssxsh31w26nwngyua82acxubinc9u1r8ecutp0891y07p3p2gy5icqofx4xcnpbtpxfdd1d0223mwo5oa95khub3rq0em1s9q9y9d15eb6atlwhh5dte7can62gw21owxxqgcxvl2iiy436kzznt3v9wmoeibrdzqaiedu81gjdg9m5jmm5vczb82y63ghf3879qcq51ad6exn3or29zew0s5h5rif2gfnejz7f81mbyrkc1th1t5xg7s5k7rxu427l9fgf5uc978l54vcj4xkrg2lqovdmdsyq3awzfexdu9o2r2efd1ko5joecwqizfueqnls795r1je7hiq812fovqf2xqkxuu9uvkl6rml14cm77i86q40jsusmafubvieawzdhwps2v2fqpxjkyqynioyejjy40dq6n2yz8f1j5z5br0lde6bbhy4io0qz4973cx3bwgc2sn3effrlthcnw6',
                expiredAccessToken: 8303677116,
                expiredRefreshToken: 8563095324,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'AUTHORIZATION_CODE',
                name: '2h7mjr0mdg08dvh6ddkosyi0q0292ie4sbgt6c7ivbs0x2dunphovd8cepmojwnm5w0xec6z6bnd0lgeh9wgyx2qegsf8ahv2xxgh7vgzcakl5rdu19z3xznza9a6obo9rmgvt5wba6yhpkpd17z88zvaxbp29s1ycgsn738406ve6cjyotw3gfchhoxppaiz6788khrls9hel81aldrmq8a1s3c1wtzfmhy1ulk3byqlpnzkx84q8nmfpfwwuh',
                secret: 'ixri8hpcqbytf41tv5v3wchgiqwcb9kfc4tmpnizinjo6r8x99y0j857av8yg99h0f9ba037f10w95yriw5lby99h2',
                authUrl: '9kww1igd6dytrfn9sx52kutmt9vdehvai9tvmv2wyrk07cl1xpzeb06odaof81hbzq0tgyf7o8g39e6mond1u3wy929xvr7vk19sl9qx8bme6rlnz22rw9l1razyf82atc48ijhcpplvtfnrxw7zcc2cbvzfhkfkv38vnlr846edf147m0bt2uk4mx586dvvopfuupqdaizdvgkns31ciqg45wtel51gufz0524so9z8qirf2qayb6rvj23oqdxv95delkmnn72n97nt3ewc7ju7n9resvogy9ucsvuav8cl7dje2j6nl5ylkshhz9pujn53b3lhcg4u2qtu2wocpifu00d9u9b5odw0tipobt2fxfcs3qtgqnqig83zeog56juhttykr9jbim42jbiuhj692wnuq9yeru3l4usaxg89isj9xt777mmd5lpzikyhhajrdrwz0rczlsvttz5b1j6kocziuzio10k4jv0f9u3ldfdia77726xt2awhlrf705epsd18r5qp0tnznxql7ol1fcixrbdt2szido1uippxngbwxxl451kjqkhz29bikrcydgkxmryd4fh1xm90ymct9ypibmlzj0griamf52q07dke366kljt9wmok73ixjzhi18xnqid5l46djfokqi6zclz9n30akxvwalv7cbe0o5sou9zptzyimb0amz1klotvcb22302g4zoxcae78zpipq6961igoo6u6xs958ul57kvm6b24c3xulf8nyj9qrutin5297s9c3cgkgocmr7bc1xiyah7zg03vkvkixuslmxm0nqxyngecvmxqzxqz7lrfdz2muiinnp766gpzm6rzg59214wy355718f8igg207tavqn3m831le6ow6gul8r1nxhrgvwn41cy4y9b5dhejavhvega6wifokbqmbsur8l4rlpog8sx1o24970pgwcwe6gyhd89guv5po9egcd1w8oud6tog9yc1j13nipbsmtfn7ly8758qt8cbt86wct82qsi9uq0tpn50828pbh9zuwdkhfwymuory61ld5zab2l2vhkdp9cc0gizbkkjkcyopr9b7ck7uiatxok8vgn1z7ya3x629l5c9y97o85j2xb1yimwgxn1vsv7k86uw0e13k2khq2ffdg4gxzjy779dmy0ls2roqu9383ijszazjwgi0x76ce1rfovik8ujbyqsod8d7gnw8vvfzssv6bqeb9w8d3hfgc8kujtfy2eyn5auvmd6x4kk16ojtcgbflwdv1v5vn0mpslqzs97sqr4a9ve4bfd3pxygp0r6xuooemk8bb73tyelu51bspyb5pirgqwlqs9t3ou85yyh1hc67gc6u0ijvx2yxvnu9u4k4o8uee5srhlek0ue90oa1pgqw7w4nq1jdyj5gkholejyu31ykds4mx4ztx4cvvgsxq0gag4t11izh0nh4wahvci4t1b3yhanhj5aiku6l35aufigdj49ogo32q5d0254tjslpq1ihjq0p1f1a2xvxsq9mjcmb13bmmdtcwwp623qmzqugktxqi6uvf5tcsmqcal6ojjhvk5yd8ghao88j6ia5iydmiye7szvehtjcx3wvtj2u5oeulzqiw2x1wrs3jyzumfkmmgblxxdhv59nm7qrs22pidc2t74rxpkmo73qg5go1qnyduiga2lyyidvpgc2mnjvmi0zll0gqmnh7fle26c8enpeh322tcs1cmi16sgvxbac3u3un624l0or9pgbn36t8qlr21bm297ez8gqhymw7ig3kqbseh5q81b340klatig4w2takhjs80jgq8v9kag0om3wkday5xq8rfjs4dfneheatfyeicsrcmzjvo53qzpr73e945e484dgsflvaulbnpfldmlfje1p3cxccqcv4whue9muvftqn52kcikbvuvcsy3yk0bz5eje97d5ddd58nrej86970u2l8qg9mdnbn515nydjyhhvc5y282h97cestsmydaz3rckvb8xfy72nbgv1l',
                redirect: 'y7ztugtrj5lafo7coozxuvqwygdmhiga0szhx0xhxghp09e22eh1xjnn430oh51at3i9uhvjif06v00wcsteuld0cn8fc5beqp63o5mifu9hyjfrjcbzic0alosqwvlbitzhynpatr6inui62xa9u87hh82jl5zaiw1w3bal3x31nbzno4xy9k2o68dibxsazp8qcdymxe3bntz48l1ubhc0tfw7jf5lmjdmq5uycmv3deptwmqgcztkf4a2rw9bhdkiy85yv7lhrrxjmzgoa506fh6lb8sdkyzb0678kxnouozdi3aqnmbypkx7nwvm5pjpyd6k885yxe4f51d7vns3tk7lj6f4mr0rj1zalqoity9sfeaqa1d0f26hohzymyh7q89qgkz9v6ujyvv1m0dfool4enhawgtptrmcgdt7tj2a434uowjrqur3c03bois6ztrr2z7vb4yok55hyqhnuici7skv09ivl63n786aqi65fetwp7i7s8hfaoka5n9mjemwg57ae5w9y2i0yq3uc8sd49tbmhixrs5ncop7lhm87wfy21b1r1ntjb75n7twpzfjun8f6ynu7zlesbsfpei0bj0b85be1snliq6o0k2ky858hl5u4v9pil6c9on3ok4fw9itxxvuxrm3fjtay6uj23sxkb9b0q4bj1qhrku0vu5czy5ntr2xhky06b1gmis7gijkiyadlgt04qk22ha4bmt220na17aw8lfzi7uf0bsp8ezipj4ffgwkgd0lkyg52abypdtglqtjusuoskk1a49vtistltmtpdukmgvbpr6rjpddsqpi1omf4zlrcnvqrpsjhldunt0breovwgmcicg3ygeqsu3k53wr8c7936s7l5jqjni9928lw55gydqrps2ubyacyt9n615nn74u5sfvu4o8nurb2exqakd6ijd0mjn5otfs9iq4r46q45pwivhr23irkci7rfo4ypzoj0thpopsnou1wp0xdex5u4o7knalziilz0vk4zj1lvezf4bw9zne09arfrqbk10uc4vzxpy4xky917ji0q8e11kpkdr3udq2dfv2xw9zt33ub4vmycmkxi3dghz7q4ooyyt2cd2513pihz3jo4y75nig77qqz2uvo4z319i1ktw02b6p12v4kseka7lvier1ttxzaf151x3rcadfl7kklga54mfreqqmgjwoedlwxue8w7th0hwjognkxeb7prq8pch1invellk1uyvisesdb382c5azt4if6kr32yfe9jiuqd2r35aib6yx7rsfzo3jtj1hulhfacpyvxei01e5vra5acd2bf8us0yynzyonnilwb8ka7xqsztjis5re31bcb89h8k6k2nqov2invpcbpghkyy0bagyhmmocz7hxwm0kdqfcbcfjfekprgnnna5mizahjn684wt4z0yj67upyrst9wn02b0a0uhngy7wnrgwmnf3cgt4nrmq2y1evlro7kgns9iezd9eq039zgeg6w2ez0nkh1mk3i5o72jtc270utmcmqw5eakgfg0xzqgt9za4fnrxdnxfjnx447b5878ny7hhjio1qyc07unihz4261g7bfpvctsc5zlg13oiq4afu06hmq7isudzdhbf0770egz8wal2rtrb3s9ji5cje8laeh9hjy2lygspn519ri12ytz8veivo713aljr95e0x1z3a0zv1o6pd6for7k5vpx8r0740jxo0nnh2uds3oc5s3o6h8dnmgnzfodyl0vi8mci99hcmvzpyhoml8hrk7o3h6a2nz7wdnsh2j5dxejo3z9ep0oi89s35qprpqpfg2yty4rgk4uqogtk5mxe7ngsycgw64nzbjdxj0kps96mp1abi63ep70fui7qj7dfdevmz9slu0vuersajgd282nkkxlkv44csj1axnwckuvhfpcpk4pwa8r7j70wzvoh8bcefbpmb9lhuhqvvbi1yss374niol5vazpgu8q76z5uknte5szqednyamkkhk1j3ym5te84sqe',
                expiredAccessToken: 5991642604,
                expiredRefreshToken: 8008014348,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'edd9428e-f724-4043-9c64-6049c1bc310a'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/4068a3b9-ca71-467a-8fe4-8da138ddfa72')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '736f162e-3df6-4ff1-bfaf-102ae26f4fcf',
                grantType: 'PASSWORD',
                name: '4zc5q7mhu4a3hzgfrg4yy068xib1ozpy4os4fz801euf56c5tv8jscs3lgxho1lzs5jhz8qgal9so3cq8v4irkw8w0n5q3nqt1mxh4ky3ndmcre7vc4fhggffrloa4a39nggnindichtye5u5n99kqy00l179pa0gt10zvi5eg3ueeg2lz7n9rhy0okfr7bsmibs6eate1qp4gwjfoz2w8ohw2hr2mr7ehs57x8m6oqwhrttjugwoscnn9zxzr0',
                secret: 'cyh91j8fkdc4ouaybqtlofz8sovmola8m2fmlbwpzcotaxevx6gi5edaw2m4uktsvycodfsdpt9ewyjahq17fdtqp7',
                authUrl: 'vb2jdmjhcdka7qumfnb6ej1qys62pjsjj8fhbplv4ndcu5da0189lq2rt0wq4awmkohgcmv03d8rj734m73hbyp4vgwlo32v5ph4byucnpovef2klbyycv1vqal50e0l64i89s333mjogx3gzqf3vdkue0c2zdsnw6p1fc8oyzas6ovxqzw83ncr5aefyi2p4c0wlasnbofhh490cmanfatkeevmpp8dtopukgy7adfogsi3gljsqkrknja7wk14vlipize6zwuvvglfumyedbv3sh6b3bp07u7977srcprn87qk6hg7iisfn8286sj7mlglxtlrt7yl02pqyfxm4ka2pbhe5har75chznuq2k0elbyrp49vhjhyg5wi3i2c1rm3smzk1i8u1ze5pgsj5wedicl3g7oql58trw4cns47r36lm9tyleih84g9bsppha5hazwli9ic8ysdtgmnu0p2ukuptyxxns9z243pglnmox5vwx320gjcbu8qq1xnm145ha2h9zymgpvohhyhbl4ksikmauofimzm6jexp903luc5w0p8rgl9pqcbp10gjb7kd9fp39i3odzwp005w8zqqr85l4qi0ik5a7y2r0qkaee1374ifak4uq2v590zeub16jvmk4kedwjtz6y6uog2pzobqmspzgr4w9225hl5p6mt4bkdbesh4gnjz55niclklooug295f5v7lgsc0sscq3cclm5mirpf46lllcrz6qs2af2p5j8dj78d0osnhbhpuuqumzsyq8h83knt47hqigtyptumzg3o6y7xpq2zgjlve7it2mzb2rtrc4gs6tiyqqxoc18nxnslfcisdv8hx94gplhuv3rdnewi8uj9rdautevk7qejtibh4k7j2kev1nfnzrn0l2yv7how71efnng8ftcpumgm7jlao4zuxclrh9qzhattcv6uejz9qaefmv0rdczqt9f6dztbhy6nbaevxbniwblkrel0xjw4pia7xet8vywo6r3sp5k0ksq4qlvuw8d5jzmfqj4y2ytb1bp8zrla0gd5wsk6rh0rkmz8ujtvv3ina8kebq6xk4vo5l4i9svdyie65zs2gcofw1fhz1bi2nq3fmh94vdlkk4p5fd9y5tk5ft718bhc6hiii5rb3kr5syox1my0vvq3z7z6phde0zda3ou2ic8joqautnw2o15ryov1c95wzsfa3cve43gzsi2hs8yhgtoflo1ja0u6w8chb0srt2bg657eh71b9k0qt3xuv972v5ygst4zqidvvhuip6fdx03ylqt6005uwzvayn7rg3lq2fh1gg58112l0dlhn8kvvqz1pz2yjbhsrd56vle74p3auxkzjz0cqlq0pf1b93ssz2t4778qagplsn690qfgpkx4pdlhtcrm17esia7x2fid1beynnxyzcyjfisti2vhd5z4y4wesan7kloagqvxhzouhdhsbc4nqla5htbymkxiit8fte787pswg8edx37ne3ruoj8do3uv49tfxwyjfvlj6fpb6tuex58tla8w5tljb9jr3dmjmh061ue7nthjoekvsp31lsgbfqm3jpu9rftgmlpka8c6dr5z0lhsn2uo13mwgr5u60pmtqxfnho44a3jlr00edluwfln8wrcf522hdjal2btvnoudxzg9ziz2l9at4652myduteq1kmbq1uphtv4j4zz43ikzlyp17izzqvu2yht6qu5va0i1x4r7tk04yon6a92c9l0d7jcx8n2c09wtxur8sovrfqip4otigk74drnn7rrvj05d1qqkm1khtq8li0ty0bo6xcnmowpfnrb9m5kt2pgvq1lrt813hjo8es4sn7zn1w2cmk0f0sb41jblnxhmw28z7xbxzkc4rim3kmt4f5plxp49l614qz4ii9zzkna35shm71jeeqbayutixrcxbpt641l6fv4ygtospgq74znhuh6hl54aj5rmhfy10c1tdo1c8maxk3ojhcod19cgv2w785aglk9195yrfzuemo79ix',
                redirect: '15lah5xh5nt6t89v7n0kmlpt9uxa6xco7cjqisb61wdl2xdmva614id97w01oqo7w2a83isbqjfe6ww4hcyidsijcbhclj3a9s6l3hiiweckw4sjw1h802522fcnm87cg9gpt103kclmig9ldfun83qra35ac47peh6uz3s3b8cwr6ni3ex47bep296lqwviqy9zd82q4vbeqfjp3miaftvr36p90z9vosnfyjujiu8gy1ewqsjj76del1qj37jv8n239bsvgbl4d2ktjnlyq9wz4h61oqsa7199byaxngx2kz8yhrnu7ftdz1b8piwkdqrjtpo1oyqqkh24wjj28m6jzq6yud1sqepi2g7so8hz1ivduwtcqxam9vmr7yuby0jqxmaw9rnhsfm2t9j2x4dde8wcix06avft9cpro5j126po8txaurr962i87qf3342adbk3zbnh7yyhwqpo8fg7ronx7iun3f0sutl2jdzt5ofnz60o0439krxuzm9ozruasw8f07byid9gtivoxm3as5jru4fa75ij7i8o2edj40urktugm9uliuarbyk4utb5dk5426t4ovug50eylqfskq91pohvxmkrn23bjikpifvxn4j4qt5t3blbakzeka8gn1ac13nksavbp98tqxblh8fbdbxf2zjp5d5xua7dt7vnzhqnjt7hgnvvbdxb5efj3x7blh1czcvzm15peftqjvpeerhqp07t5q3jc2lp0pgkognqagxcphuka07jhk6axfp2cilduux5enxhc0o0azl6kygp2jo81bn52q918i1tmsbtzetquchcqjec6ukhe6filvolabp23gk8147ee9tbemxb46or2seu4hulxaafaz2pizn3ve642qqtyb87xrc1j4u16ac7wksmk6l7608ua030h17oojq3nbhbogdr2exrgnvnnbhybsz0401t445so1j48ren8ljgfik108i4s3rxjck1styjqcp6obzym57qf7m18viltyjfs4o3mk1evsqpmi8mxl24tvrt06x6cgvcqvmjgo55fnz55lk8l5ffmd7uu6i62dxykl947wc5g3xcuupralg479yw2ll3b2o8q1wvcff5dit1yklprjj7vbq0bdbmmmzjw75mxsomrnqdmxrmppatjtbleyvmqllopedj9wjjzwc7mbbj36kg3y15ob0byyjw91l232mp1zttik18x9w306hr960u4dubvi1hh8m7fnps1gc9s4o00624oa0ej39hgtf6wfh6afehtvlrixpv6u5a7w9vtut39g00knax1xf58qa5t04jda2fx8bgdqrkppbnued2g5n9lumugfui4qlkf17xeuxhts4anxgfhzvi2o5w4kszc8jgxlp40reglk77c3z7k90p70t80aynwvhs1fge6r7rvzj87jqnyx0gsjz3hc13h0j33ey8lrufjay1ty0vx986f3a2jhtktmm5051ro2fjys2a0l7wfj2siye4vzxdysk9ibhqeps6a0hjurbeq0mnhu3vvcoc3fpvjc599hgd8owm2mzxoswkqtlmjldpx9n8q3eakkudev9iiixg2bysvb7h1xgrldo76gvm3638fahmcto02mrmw746ew0vg06c5zk7o4ze57u520pn1qa1hvgsonywbmvuhuvz992dend4hy2ychfey8sehgxauvfnnggu2jmnmjfvxxyvos1kte9gd3f4p51aovgj9blbndp2ujnb5tnqrcsjlzi39le3nj1z8y9fq7u0mofv7g9bb8073ov4x7x5dowq6d2bp1lhxyauwzhxkgyj1a3jmqumokf90rrqrxxd3g1vvqbx83w7nysvhb35gwvxdgs7vx684rstp8dz5luzmdt110t5kirnl98smwxk5u1o24pntfl7n0gxuegwq9hme8alala8sxyfcez5d7yreb1t9dl0m7ppm0hp6pgtcx67ir1npxdfva9pr1bshpq7bvpvdmcv16xw9ydidb0re2vvos7hbjhvl7o4',
                expiredAccessToken: 2134158853,
                expiredRefreshToken: 7827639552,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                grantType: 'CLIENT_CREDENTIALS',
                name: '7uifsvm6x50mwrta80ve71fwqotlbcibykqv7suz9o5sa8dehijevqgdw8i02t7sql834bvqcuwckd07ss9l9yn3zvx468rk69rmzpbt3wirtu3usej2s8wd3r2z18yjqow7px696utjmr8sr7qh0mr0uh6zztfqsw38b6qmbnxzmmt6bdq1f8cr5f7rs6xws2pa7wx92y2hro47h7tcg63n6d5eh1u5gd0dszr527diamfuv7acvcecz0ic03y',
                secret: 'beceyb1oi2jdifvfy03vk254q2rt4dgfinimopbcam2uhupbejezvmd5eidaohm5w5dcqislripsw1b7p05k6awuf8',
                authUrl: 'zfmv91nf1w9lole7kodzfaju62unnds83fpeekzy94oh172cn0bwtd28qve4x7wk4mtwx5z213g4c9uhyqi5kij2zl0ckjbxldyokakaftcma6oj5hc4w72psw8b8mx3cul0pubhj2hzrrrbxppt23jbv3p1wyvy4xu52x2woh7to1a1skhdgyig4xotu0rar67jd6yrl9fnxhgo1gk6wzqcivc89sn6fta8od6f08r5hbou5x72u3drtfcq0zilhocy4cc0x1gqc7v79we9n1hrd09h9ie3scc7ckzxwas4poi7l83f696s89zkdfaeltjzzivrmzgucihamwmf1ycgqzmq90xyyiunc8g6lm2awwzotxstlqfqrt94d37r211gzfr0ifmbz5p9gv9m8oetfqen7r5dufkxualifems7wyw8vdareh9xrli5gx6v2slf0odk20m1qicitcycign8pms1kx1gcg05nr30zk2fmyk5amsw30snxaowz2dd0jgp8sxzoowxrbb47rmumh152fl8n78fid70vrzyeixwqcytuaafi5b389l5sfdw8gm8kvgah50940bvj4323aquh5qluy8nj777yd6xeqry3ht6k5dssytr7x7ztzyd2gn01cr27uuua3elcz0jezofie6vdygiqfmayogd59sbvcwwp5td7xs2kkuabklcepqhr97mk0b2jocvfvvppbsdo43vq0y7qniuzncl351aq3pwok6oc0jrizo6uwxrs2b3lx086rli4laihkcvu9e79zldd54pneczx69zeu6acpg5mjyf7y6z105urz3qk3wu9slvo2o7gg84j6ttdn8526198fu9q8jz8lcwxs3i20pctb5yhj0pmsuvqdvyb6xw36fsgw5exwfjozhus3pq8xxwpkos8e51cfzp6jzgyqxxztnsry1mx6hjrqtmowgkrom2omkin9i4njh6d1j1oazvxf33jlfk1iwkn85uq3xvet1xy3wyhw72ok22rmknbr4xzo7gdbvgfsotjbafespkh2w3bmp6a8c1s76g63ylezpgjvlefjw1gnj4fsj5an0gvybnbdtjdx946pwubvuah25q40pfodeo0h1rl6dvidy0rqy8jfuwq3sj3q22lcmgkcuv1i87le1365047d2gze2pg6cp87lyhxc9lmtv6bl0ipjnt6b60699dbx0ibecmjmkaxflpsekjd3hmhbzxagk385q6f1kxav6sksa8588muf2sml8us8wdqf79fc3od90sp00jmlc0bk1pdymgmsnk6e7bqf7m1fgyqinneo43aqr9man4bijrf9yhfrf5nnpceufbqxlu9v81xc08j2hbsnku1zwt1bf85pxkzll1x26uyqepvjpwixjjvl48lp5g3aqdt1a822gd1r0ably9pzbawlickq8nkaqj2n7ryiut1pthsbky6l12c2dmjbdg3ff2wwyqa0gxr7kis3ch38l32g5a3txo0hjo5oge2ddftmm3y072hb95zf8f7irnesgepg301zj5q5n34ebmcx408i0u3v74ibyvzey77vhq132gjfjgn3normmn7qm0hdveci5mk4prvkldfrb13jlxb230sj87dmj24f9ky33xxfpiafba0d7pl332fa2b1jtmry4mchmlfrruomsk8v1ixn7gvtucj7s20y9etw45hx4uk6wo2o04uqffksbo6ypntnwdzx03ob0nzfa0sdyi02z3o70xvc9j1f4477cqeo5cb6w02cug6hp3d1nciefj8vbng098sapiytlxawg6yi8kp0a4vash8gw0s7oec8pflg1kmamn1sc32y6ivatoy1h9c7slevfoqcb5ju1g25qv013e2bby1lf7iudxxp9u9mei4f0krtr1estg8xin1cpilqcu9vckrgpuftenvzele5lriqtayhxqdsjx1g188gh2dgmzkjdjxe8ffyfmznz4rtiqly0b4qstphzjbs3zar0fkdvdui165vkqfakd4e',
                redirect: '2rnkcu8g2vcasmw7him3ho14dinl00mezex4mn41z08xqev2x68gdxs3iczc8wjanexp31p587lyif18bn93jbpzfgvch23atreic77l1mlsvzfxvuizadjll9fj6lj8776ebvbrckr0g4eqxw2g80fz7t1gw96xx9fetaf2jh9idwvzjcjtlc6e45lx2f2s4s8uuwvak87immg7lkbwjjnjfbdjf14u6myrflgms89b3xlek43shli37q72b1zfa7qvyxsg4w9zyjw5pw23w5y38vx1ppo75juof0bz9okiog0eok0wq4427bqbxwpuxw3k72pfft8rk93i1qb4ro6bdzmubneocghm7rxuszqmef2ad8ttbhhtj8x05ub365ayapji9wskzrou0w904qicff1papt8fsjv0j2jw1nw3uy816b2x51ztgaiammbesurcaz9cojbnvwq6yp0dqgtmgvidmyd5xj1eajx5wz96nlvw9a2kt2iau241ayv6im7syp05y5abua7dueg9z66wj8glu2v81ozn35t5uldgxtck3wf1yqmsqj735xl9luhfrm0tqoo3tdp3lowkkjffalvyo9dq10chb01g53ejz44m2ulnzk96wi1ihqp5sq2hbjqxl5p3uk9uipp382u0gnb99hia5ny7yp3ogvwmlxwm569bg8u9tedvgzt4jmnia0hpeytgmf39faua7rhu35xtm48id5bft8no7zgbwcrnlbvlozyaiojis38exopin41n3urz8l03m1vfmbnmoz2pr24f0kkzjdijf134y3xzftulu37twubzo3az30iw86x5fgvzwdvctd66chkcakhjvty3t6bhyoo2q20ks6y5fvsf6abilt67siybqfvtnh1lolhris13ojc4vtq04ztxjugenclbenp3cmcy6ky47ugjf2ha9iohth1a4a38ns9dtxi2wqkysr437ico98j2pc62cxlj83euqjjc7f5ecn1q3tc5qgzx3615cdgzopl5thm5ygsxmlp677g6k0s6xvv973v6pd9vit7ugq98wu99u6h622bspabxdjwad924iwgleg0g6374boww23b1m4z66mu4l05sv0w9m9j8spd5vt6ok39uo9uatoijfqfluyivova0pem5ihc5ehltbn8pnuzp590gio889yljrmc3mrfsyn1o8c2jx4c8o8sjitsvvoe6p7ujoi3gvi7nwos3omjx9ksedrtmxbj71s5zwvgiab73yf1ohusue6wmp3nbt1shf2lqf13o0sd0aga17f47h3x7vwle2nso5rb3vwmf2chjy5ijvu2ehzxuq265v3hbt945z5h52kx2uec86h2mf5emqvb1z7yzm9nvlmqp9jczihiedt27gmwfgux4a5ualrn9pm1c7hshpl01vgfj7rqv93w228mdmw5b7291ulxqr7m70e94e3gugucp7k5ax20o4jbeuljoxbwskpy2zta13ja197307o04awu5477xzejthfmwhd8sjo3vx7w9k8pz9divuvqeyo3wfuf4oc556hbvrz211fu97oajcno3bth67gxi5f19z6hof4iaofqwrlewy3e0lgxa9wbl8ijq4k1onvuemq1tyy6x0mfkzq8j5hq5jlhzrqildi9ads4rrl85h1lbci9rzaw6hi3bem4zercu8nxz166szix1uwidfd3mqiuq7gtvampe5zqbwotd8leq905af775bc2c40iyr11fukuvw7cjk5gh4w5y34oasc9vftjwnuehmm8utkwcltjysyva46tax3ecthqwqbvkabxv3hknflyh87ddqlmgcxb6s2d9a9moab9he5zxw7bm7q8rsfchtuzzcz8x4f1pi6xwx4thydsdi0ds3qefhfc4531p0lt3g4tpfg440hiwqd9523z25gnto6d8f935poaydjk2e66xzk86rggpvh191tjxw4h43qg7aj5eqw4kfp9416m5axch2rf3en6ejdt999l6e1uvwoh',
                expiredAccessToken: 4937517108,
                expiredRefreshToken: 4520088372,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/5a72362f-9c0b-4096-bd44-59cb16041772')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '24e96ae5-0be9-4034-bf61-43f4bc0dd728',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'bvwl08z3gbinx8u6b9q2v6882tbnf0ramno5fufpzlz3bz3aen4nj1oml12k8fn8biqsxbxpfywyngryvjq2slny5o3n05x6o5umjlggx0gab96xokfu4tlexyh8vvl8y9di8j0echibb4rwrzfo6qlqzvnjqn8rgd9njrvoey109fb0d0jn0rjalpc9gnv1vkmw02oplnnsi4md8ctdfbe2gywpf6v8i86czc4rjrzpit96cpedrfdkvprxfzn',
                        secret: 'c1c7svai4ahq3xgy1qa2j1ui7xn7zqcgs0dg4fdmnbb12lev4aev8rsg31gr68rz05c6ulanv4ljwua9gmga6259uq',
                        authUrl: 'agf7iqzxabtajhqkvt90lwbt3d2qqw07ht94uawb9vhuexu4nm2rh0tww6ws32dknzejstzcli7vnye149l0w38f8qid0jyq5rwqp6uad40yxmasf4zy9qcygxy4qe8zhvu53zluolc0aoxc0sswzos6m39g2da4cs42f7e7akezx5pd4q689m2bcnf0hrbfrrlrtfe816nh7bcuvw4dint5lkbi90lktv207g4h5ew1vsubej843ykrv3nax9yumqc6754nq36e1pir4su8ce073x3wi5v9tc9wkfmytxucy1rfdvur2f564y1lg1c8iwpsjuwsw3s622u3alvmmijid38by7943jxkvh41hztgvsk0gwnvlfwxwhekhrap7br3jt42dp8h3u8k2ycebne8tpg9dphk47755txea8ag7u0vw48ol6t32shh3inv8rtuy89edpk598popac7l0ln92xp7s3sdb31ezq5nz71wqqa8j8cuftkjzooso1cfzu4oxxegywzidrwkxp058mqxy20sjg0p4cap89hmt9b4606tolibh3yhcbp7aarweatkz9oaypk8ubnvpm8b59sa3gvbz2ipbg6ehsn2cd6cktfnclccxwcvt6tnh6mg9en8gpfugvkhtilissuneezniqluksj6lrr2ml82z4iv1yigmxyv4im2y70vdh4z0ugq3pnszrruwezn78wcjq8vrfxcje47agka844qee84itwcllc5ki5dz3yi8ai8942p99ifef4y9jmj5uiv25r6lx7rjb7lc8phcptjudmd918amup0bw2wrwm1s0ht9hpt1csd5l5ns9z9fanvmsfmm7g00i4cd510hydfivgunspyv513xjdg9jbfjbjaxbrvqz4wd8tasqj4r0754jrvtl9ed8gwu58942iksh7b05wn5phhh66klpjx3izoglhfi6lpcn0cnky1j7251yujtk93caf9yntti5ijpjt6y233j0l0kvwdg1zcq9aa553nrgxzvx8vfupsc2cowfcy8wsowm6u16git9z9httm5tnf9hji0tkgrvhf9fm856uyb37gy3slt77f62cw2laj4pidb4c95ffzg63h8t7umd07vgfur5vtjwri25nmq304tbz10rtu11tzwyi30i5m1vnbglsf6wd6gt5hq0hwq8um0q71g2e1a704nj6fl8q800j6dp1sbxwaqlpkngcha634jdz2sscmnzk5xrbo9pnvyd14m24qauew6twjvx5hs79xngf7eje5g8k5qfcc2073jdwlt7y8fta61rlwkq7o32kprsmrb3iyk12pu5rx842ccrqv3iqpsxzddl5yp96qknd0z3a0wm3m8n5uyodtg4ciz68qx9o4wvxzp7gu9i1dpz5kc909uehjta4mxwmd1oyy2uwce66w0oz7denj2v6s53jyed90pkhj2wo7m1ji6dc9u2vwrd1bn9067ly4vqgbpkiiiyk7t0qg92fd1i9695in2pmzzuh5bam70tc4tvrd6p300z4lk5ghgw4v9ur6aapcevn9d9k9hkh9a0exah333lgc9c08j8la9pbiswnyoqorx4h4yssbmraew188hq2si7ycakejp1p7mpscive7mgpjkg6g37c1nwedazvs9rzklo1b2kg8e4pan78hi6jcnaz28q01sdav7mi5xn86dddx8pgmiz8frnydg6nlm2tnh6bdiw632gwo69wib5ixr5fgrhp7i06bikpqf1agpvzkm5ryc7t22t1ck8ye2xw2buuwno3zdrxzobah2dfwusuehwxmlecu23g7en97ifixmm1350c65u656gvqnq17c2tj3ijtsu3j9azco1bsa9i61k16rhguwp5btpvd51pr33gan69i61ljjeyozc5w802nbkizhekulycqoxoitx7mk8vrgp3v9e4w9rjk3jioi75toszx3l836baz86kpa0pw646cpihg8wrlsaufhtut7inxz7tkgcdospupyr4pbkr',
                        redirect: '6nav9m99udlbe729ny4zr4ugky340uhwav7i2gq27l91o50tnhytjakuoewk3ailwifem37glqm7oprvdjriimtvd2dluliu5lia3uyx3dj6u7vdz5led9g5tk9os5x0obeyd5es91c8mpor0lps3phpzxh1vnr779qfvskjobqabz0ov4kxbdr7e8r8xb7rqq3iyijm792ukt4urgf75e8cdjavxc39v9usncnpod6zqt556mdvoxfzptou30m9vzawngb29mcwpk9mu89vep4u7bccolvg8jza7i753skp6aespoqzpgrvzghwwj7xeiiy6if2rcyi590usgzj1tpd8ikp7dltzyo6qqhq3vql0kki08icm8huibyg983nn4o6pozdwjwhggzyp42hnp959xmlev5plwtp6ru49a6657cv8wkgcguiwiyaywmhu9qpz1xzd9eafzfgt17x824yga6u0sgwzy1y8pm2gcer7kfe9129ob23wnirr54pmaa6l8ohhrhgnuty0xbux017vkrxqvrm6dq9q481iv5bsvqj8t28nt38tdc06hy7qafy1rodr4ijsmw9zi995kzq5pjjinoqrwmi6uxrd4hozso39pvvttf0lvpu5qul05nopvntsxtawly8atjmtuv3ylrs8x5iuq7pqtejsglc9fcy128y15wa1tuleufchp7u6mrwj2zq0kr57iwyn1zrn0lqb7hrqkn0aravz2izx1caxquxovxukdleo3mwzeuzzbndg802b3m14hrbc9zmwfkaoxzn54vz4i4l4abxymt5j8opplm81rhznc7tooddqopnuieowlcpaun6ynyrr4deurcesdulrcpzn0a7ta2xjsenaf19vhu0igblkik4pu63t8by9mci6z8jwkybqlp6jvlmok9854mmaze9amwx6vqyodwb4q9l20tbgpmlqq32ygtdex8123wikplmzj9awnig3cbjh4vio4yya2ll9wg7k6dqjhsvqpwn4jctytz1bs60gs1siyfgcgtlkqy6ug3h9g3nbknxgtpdqu6lpjcchz57evi4wtg651gqh9l5k88mvmpyjzxsakwz25fhxyjmda3q8inkij3wz7jstvb0mcje94mq78nkfk605qoyncvzppcy9stfs5ylt0a86r5274n4uy5lbcx3s8yd0n3190h64fu04j4gngm7lz1u9zwca93czkhx24h8q1493v55z853nashownb47b546mpjcpsp9rv7wl3gtw5r8gexclzn2co1l14d87x39jkf26pn57fsx3rf31m00ssltjm7kr0ly6qrhhtts3792qnloyrv7no3ygn36v6dg2a0o3pf2k2wfzlf0u9jq23pegct7eljb3udw5czt6fwy8k6jiw0q8vsa205folnwngdebwp8o731scso1iml03fsn4v9miypdj1alr6en6k09vw32f79fybkzslsn2zd6cbkm9ojnc2sxsb0xrhif9q8ov8wj7fpbluwmgjsio4a7i94llevfyhoeim9c3eqebx3kgpja36mg795pwmkis5j0oaz58h1unjsduko0ptiqd18e7rm4j5pb0llo1g12ywowmyrqwp47owe5kuml395lwblgq1blwh1a6s93rg0uzqor41d37ti4noie8g2f9342nmadm8i0ax23mqqi4bkfs4n6jrgkcxyi8l5cs3hpc1r548yjb4dpd73m4adgf5v74c78x9ipp5ut680axe43rpyhzkig9osqujdhudd95rv3cqcnjcy8pdxsap7blwv19c5ia0qdoyy2rv4dl2qiq4nrmwi6hio8dphqfl2j4buoewr11xt01vx3imjfh40hsyoimft7enmwbsbdun3clabz8h302d1j1g3bsjmoeb1hbsayxcw00fsh4qy42jgzzhk789eqrb3wl4xu7wgrfpkckv7svsd32z077l4l5a04z3icd47vfwan7hmsxybi2oerdu4pn1pby2asvkf987fkdtqencjh7',
                        expiredAccessToken: 1903960604,
                        expiredRefreshToken: 5013661926,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '24e96ae5-0be9-4034-bf61-43f4bc0dd728');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: 'c9475f74-68ff-4269-a324-3760b0793d5e'
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

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e019fb0f-b76c-4bea-87cb-ac3ce8c76933'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '228c061f-2850-4aa7-9932-a57841bab697',
                        grantType: 'PASSWORD',
                        name: '9qm7a849hhyrhudwfunk8m38gxd532ct97w03mwahcyruwqqqeojy48kiqsyw4fq4ptcneld851yex773839jejlq5ew7wdel8c6fj6rfokjtlf3uuy8sd1jge9eqgsfalyhm7hrfinu65dcv1mnukzrukqbxz5pp520wfbi75m1atipuipdt1owdrwjmpezogu4wr2qz4mep41zpkye47082ks34jlof1sa0942ce9iyo55xc0xq2xcmf73dos',
                        secret: 'lcmgmvs93yipsgr7musm79bh2pwhd4g8n0mku0djm1wxlxoecdra0uhrs4dazf4tnnmudmo5z8obd5agr76i3v174m',
                        authUrl: 'nt5dftp56992vggx5ohq9293v8rw24owzjwoam0ass73lqw0zbvtlkzk5nuhxuswquij76mz1cocpeefjyjvjnwdzvd8x94qgdot6ptkaq30oq1gbwx1de8nw74pozu1i5twphusj7p1zshebfc3w1lyzt5zwazf0pwp6la26x3e3cf8ennhl2n1cuw53jujx7woblxl7ey78zp1wnzzlf78wd2zbc9d4lxhli2zaatfh40pp8x8e9aulr6g15b8bqs7umncajv49a8tadrjjxz95m8oh150k57xcq0qpvek46tsi9me11kevm8chnwwwzphjqimjr7uqil3z7e3ftbglo4sv7nacs7ct4kcs3mt4ix1f1l2on7ax6kqiqpu4toqmgtsy488n9bmi1l4zr06phh7ipmydnyllvr30picn5sdvenyoif5t6ciawgmsf6kdzuogke5506bjsto6qc398vn96xr4i3mmfjy4tslfgo03iz2rk7teeoxjl65rxentn8pxv02mfg5ofqd2v8tcio7e53bvja0pjvq65h8lq7xa3u3hw2gj7irouzhx0ku4iqg48ngzxs8kdw0izqmrcfkdgivdj61gi8w0vpi8iqkjy6cssa1v5nqbal6bmz3kd5vir4x7l9fgmgkq4u0heu6oq9q4ayy4lm978z3k82vylfocmgiiap6h24hkgbeur7cpekpym1oj0na7gbd59p29jkkm49gn0h92bn0274x8uzxnba7zngzxeqcwaj9k0hgbf0wtiaiel5hw1bi7o9dzc9to7iu9ytm5lhf2rg0dprnu55i3h5v3j5tt9j8xd9b9t4vfc35y8f0yy6fd5u3ftwb0nxlvhsnqz9fozktgmvko8znu278c92xcxwqmpxgg4ule70vtz98zby5o9fngb1khkgxeregbigmaxb0a7af8jw9c18h4wxc8ux3aqjpvqgq4sga40zuganb8aq985fjlkn6n5v8ovl3mvs2abrp7g6f0ssrrhu4ypzh904pklwwqrz59cxyjkk3g0hx28gboe5ll93rnas5sl8rde19vchfqwrjq5jm6vdfukdg2chok57tpw85rpeq9z5gtvvz450368dz8c55gnocmc3ohu7f46c9zvhly6e5puu15864a0nm3jb5tgkck9tarfechij8o1ahu6jrpvctrk1hm8p81mwan7mvz766ovy86d42xx5xbyakjmm0ydqz1nnzjiy2abc5ioa33gr68909gto0exyoqb4je36b9c4f7pcf59zcwueo6dhqjz6y96dna84yxl9whx8osasvnq90n9nwsbo3z4l66o5j4jvprrbzol6paydih0ytrng9g25zdqko3ohqq0nl7jzvv8vol9wmm9kvtgg7u5l9h81qianwv6gcryjckezxaoqwe2cmz93lqxgjtb41bu9zzw3kv3ex85vifxcehl8a5zkrt1jtporbgk3byneaulbmuc9p6axinrb8dmet54brglw85t9jktyw1kh8fuo711qe9s2sv791pf92ojivnq2kedudnm6ftkcziav5bskgxkdnmaj561z6pfx9g2jfdrvs7exk6t89313iys2hxtoc2kkfcdfq8jjva6tnq213m0vt98zpotdx96i71mgxbnnsve74espj6p81jq15mn0b8zz0qwnqrtfjywkfihs2mor9kxlssgswehqfu8nbf3eooogt5r9dr3y3wvo9meymajm4d7g6irfd7gq37rpofyolcpzg4oyxb2xuboh9bps4h9e4t744yehnlqbmb1u22j3npjcs1l4mzir8ljbavq1nah1r2k00pmpsmb0g5swt1eeph161wwwby5nt1gm1kt5rim5kwfplr3cbqhfd0smuk7d54ege5gm37ywdh0zi3hbxca5b2tasa3tclku2srmqkcmpsx12hon462s4jx4s1exolctzaja3g9ry20uw0mhbssw8vwqlfb5r6mvhk4oic2raqh6eswvn5ybx8v4n90udv7r8qjr1',
                        redirect: '47f5hzruyqt3l35f4k59vvyddigsgaifq6644v9j1ga6xanvvqjmi0w7xicw6stmycw3c4v2ytibhwrwfvaj53hixk183nqdx0bbbg4z8r7ijuyn687kd7gmkadvmxt88v9opxpnf96u3hvjj1czfwuc48kjy1tac9w3i7so6wlyhx6lsn5oiq0gpgxxovntp31dlvi0dagmpgo8gh8fknsi0yest80lwb7bxvz99twxw1ngd6txfs3wz72lovpou4193egryyzywykapjqtums5kzwv3bo8wtc86umfxj0g7z2rxtyh9ivvkdf4t8w08tfob2khbeinrt3ve1ld9vuimmfjr51xuktqpc37egocgm3w9ozz50nmrbih4nxemgxnrvlkj400zmt9zg5joyt413mgsmho4uemmzltmvla43l4af8zjrev5z86rfdnhs3sby82tdckimij83w01719ch2f1co746afwih22ku2nh8bbl4pbb80tm39rfpb5h22zdzb2n9x3dh1zq860qiq685y8xsovp9zj33jbv4qowyvxpzhaizrwpxj6ra3bzk4o9lfpo8qhy9bn007pp8z7u1qrw6i6r422ayt76ewwpi2ec57oyzgrqnbrxwxt8ljwanidayt00in7wffad621eldok0h6y86u3wpz3r32tlm65kk1udezt51cgtooappzn0b7ym9flayo7us9w0lek4y4hpafhqp2tsjleyy1f0e2xgueq516e0kkyuqutmsguy2za4m6uns7wpcoeb51oouhtdav5w5g4vr6idn26yhs4rjdcqctc60638qm4rv2zxqjxh9w0j3drbzquoakw0su9psmmo6u4lzi6ps75234poyn002asytvitu05wc30pr2jum78lbci4ca9lafjgqkfrkueuryhdlx9osjb6v4m1yuw4fg59n58vrie2l6zd5q1bgmrgq8wq0djtxpbvo4l1xsqe5q97sghih9125ck4u1rq9zengtuiciv4o56jwmu4f593k6qqfdccsjuczx02t32psajrddlsp5po7qp0dopb0mzu9a0yacpx4qbsgar2abtae439r9x4rn33ynfy5nii3naled9g3zf8un4tsg81nnwq6vaxctxfylh7d6n9mua94kyzbe6uxgcmrioy42nlo5mbdmzilgzdnc6cx21tfn1yubn2gf6uid7ywp371byzlti9rmiro9dxmtl2wls2y8odmjnjrzmyzr30tv4jo172igvu0duhkutk9fkn8pm01wy8zy7wo3peidr4s0wjj89n3lpybbwj961fwt8od3k43ytz9b3jrr3jpdv6qh95blu8vaots8du1coxfputi7ya9t6bkfrzwk1kparhlibybatgvq3kv7ewqfxjdt8ori94sip2uwnps2umhq76ebqv1ecbruw47gp75y18b3ur28pvdygyhj2l59e3abjfcqpfo0i47dmw5yoifsnw1kzepvmhsbfiqzwdbo0mlct670ozmuwrgzl7chjzj1qc3cmvtk797oqdc5k7i2wg5se2uzk38yhrc021mbm00ukofwa1iu00ek2witdhob1gnv8z7s3vue35tu6ko97nocc6e29u1miczavb87l5yroc8yh3cvt8hrdkd3s5h0yqkcfzuldx9os4mxy049q25i87k4u7ln1h7j8rzb0pb72gv69p198dn2xxhkqun5r1wrm3rm8f270f47akadiccalscmwqzrakiia3gv181vgiwajolvos4bfg37jm78mft2v7828ingdo8717ile22ow62oxl1drf4zyju52qdsaw2olzv4ad32cy4vvxnbyfi1wkoa75jzgrq75xwbbfcf15xzgu14txutqcv2xsl57illgd22ys5oloqxav9i3hsbbglfamt14leka5sn37hbfkrsc9okmo9l0110zbgc12moimdogo440fvghyn5la9s1x8veni921b79z0s9bglnyyd0iznt0klm9br6cxe1n1mhtz',
                        expiredAccessToken: 3576903976,
                        expiredRefreshToken: 8079620403,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
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

    test(`/GraphQL oAuthUpdateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb',
                        grantType: 'PASSWORD',
                        name: 'tqeleujua856j1n3uosqwhdu5ho72855nlj7j9mi8qwxhi0fxjdsjsm85wn1piwge79codsi5sasbj09iplnukknkfweoo6nhe5domcig32fskombov9y9e2nbvnk2umppzg0txudmo43tzh2j4bqb9335afb4t2ywhronhs1w5vognvd937zmr0ang0axxf1z2b3jh9ekk8el37afhk2e2gvdg0hvcqnistobi5tobv2rf7to8b32y62ttuzsb',
                        secret: '198vosz97uc01wdby5e9ujdttlt4tkvtzsfc0wtk4lcy685ga1hg3bt8kchnpjx1zrri00q0wnlq96yms7xj0p9f7h',
                        authUrl: '5bgsb8k0dyh6dt8r2dh58dh4a5gu3vw0jvens4la6akjkwybb4bfzch9kp5fjpplssipil7fw45yh8lliksujqkvuceag0macy1nl5d1ev13kajl8qi2evt3sqwethek8iyk2s0y95ow4whwigwlh0e9gwnud4kx609jvfvjunrsvgh61pfcem772o9fikhzmtcngjz0plmceu1vqyjk85qdiobhpjo0kdd2cdv4x1o5yp1qo25jgdt0ucmk4f5ah10v7im5zcmj6bck4i7nx7l7ue77tmgun6n4f8fkn5ik6b0uekvmoq9rakzyrty7zl7u5002wuau4sa6tyfxv94rpucm01710mxmdu8iwubk4u6owyjln77024qf6pp7y5tmkpc11sx5ptc74lsx1auexq0656s76ecwj38o13o0w9ndavcgcibw7s2zt15ntfwup1qfs8cq6sgxoiyp9txbcwiimawkie3klyhwdb9ilsx1phyp8wsxfrr3r7fp7srchahrg2rc7qy6run1810ttovruq4uw236jx8wxsncn39hgukr0ajgyyrqmtbc17pin03oeh23qr8phtnt4l9ye5xxf9ypwhgpi8rp8116ej56pyi99lqn0t9mqvezp3adn15c1wj4frx7y093mwz5wsut849xl3njyhggkc8do1vo4wcgqyq0mqetqe0vol0spsg58aa51jp0k2mthhh8i0522nlcoxrc6aj3itn8juaczvyup0879mvm0p99bbzj4k1e3mwms3icoj1l0pz7vvfm44nfg41dfsmymuy218axi3sqt3az6rr0dx212l9ah736agdmldxy1agdgnjs3lr7qd2uwvbeqxv66fxcfgkrwoujf04umsxpsb85as1xi9hbnw4lointmqclyzpyt4rawu7eb8pvtgcz1za9d895jd0u8qrold3o59ancwvzeu44l9e9svvox5k7hhk9o5o6cgo0g949wqx9x1qygdjavxnkvkor6db98qytupj9j0qypf7uoan25k96rg754o7hfothumqfdg16tso9svdd8muufz3ri603twyrk9we53o2hpg7mhmazi1vpdww3kb387pco1pdfvezfeegpglh0ftdel7jdqg9m20krewd6gyllxumjf6ywx1q96mwt40q186owqaju2ihorlgap31qucb6cribidv79rh5g2jnpqeu3xsfajzsbdnbktwrvxqieh1es3zkj6l10pncvwiam0q6kjlj5ax0cue755s03qxoavdvnfgjkvund45y8vq505kboanv87o3hp3p3h2anfb2eqrq7cinhr791wckw6sn5owcqpes59gbt9sk98wtrbci3787uzrrl8u3xa8hyp362n097eosfk7om97gm2nkaqs0x7gqg55u14rm5jyxu0png8ztahffhwq04zf2qyxmkw20b4p0ahuehn46lkvmprb9qbgruri4dgkas86y6ab3tz8fa0gooz1gebjpv2o4ehkljez5babtopndjbs983hz0yivhz00lnwhewc8dwqip1iesefogmq7b96s0xepnvj1ls201vimmlxtkss2tg4ohrs6dfrgkamw7zhdz2r2pc4dj7pwwljiwls0cm8dlq0guwtwldnjth4xhj5isc274dkk6ywk2jbrglcgoii3z19hq30mb2fwk6lhaewkhbzzcx8j3pconpjzkui3rh3khp8j7f8rwiotmhu16c48dm2yo38ulnztxgb6qdpqf5lbftcalo12qbkxcenul92m73rgornku7xc32syxp3v6khvvfxyt9gsn46y3q95649j2x7wk15arx9sil71vaqcjiip19bcadez1egoqqoh10f3ieg6rgvyaymf3iod4wg9xgzcde5ihc69mowyz8hm9t17tuljjw29bkmqhclkvx3kpnc1bw9aq3las9rcwxj9vcenvc3s18dz098fu20g6pzr04j6xfxaxa59hpazwa80dnwqpayd84pyansr7dn55hjfsin',
                        redirect: '4zzkcl3q0pi61kekw5gqxfgia56zjovyf54b2woi0oiusewpra7dv22rohxkstc5vti4sro1ryouqjhtjrqmfk0ff0fhlq6wdoxvpktdffsyf9qsf8svwi06nnjw9pdk1hvxast4zoyazo45vwim0mz0z73k4v3880c3p9ljrynmwk4gtmfoab815idh0i0nzaoige1tdjp3n2tc1vn132lm09l2rmy95uv0iftywplc2jx7cdcmk6fvxmbgqr0fb6k15ius9h45jglosaoyohrsmhbk57hb6xhztorep7leyaxitdsme666h6cx9isd7fyctmln9m3z2rf5ztwoujcjjdn6lf8o3g6oi7ib575reppomvreqwg1k3b5h0ugx2b1v3j92yq7mr5671obib1kwherbblpr6vzpzo6iigsc2z8qjaeo06j1hgsaj51ccwemb8c99dob679m5jh1soqojxhcnb1s9cg3xsbzimvag77zqkwnl56wic9ggat6e6dnog3lwy9chea9gllhqhbghauedspmeemjs6pe4b2cqrdzpl0wac5tsc1cbg1a8cg2eu2tjuoseohouhailhxjemcgk1s6b8rbq264q0g1silr6u93oe3ihnud1iuxvynrhec8hpxx7t7owbsti4e63hkronon48egs6vbjcqru0gzqtp62t9o15547azy0vbx1xs5gpv50pj65fcaefjan8j1lmi1inhn0vxtdyflh3id4dnoq6qod06oto6smp72eopyup1vi2hftvve4cpa9x5uam32is4w1o63hvizk1uwqd4c2jd545wxgo7klyirxwe50idwxfik8i6efivx8rzr5b0fu2zw8nwixljrzbpici5aon2ej24ug9plw3qxpkmvnlw4a5p2i9rjonhu3awbkt5tji59jdkacsshbde4x97zqoym649s9368b2oo9tdhf05rp39a9u8xm6cgw40krlqmo0ro7ds8z5xram0futf9jxdfnd7ucc0nvcv7wbthf41od5wghfpwycpiycb0ojbbajtqvbtnak1ziwpu2ueouwvec9rvogajd9c6q6ahapmhlxzixdu7c1rj8iffgiu80vhx0wi8ub4q4esyje2ruakvqudut1jo0zci1pwzs7biud2d6vtiw2927yxbuneibf9t4c2diyssz2turq6anmpk2od1j7izqzqg011jxchxk6dlky32hzylo4telvhb6zbqpsaaa18n3aeirbqxhbtbnk2gv93n76rc1ux9hh9303ymjf5tnnplzy0gsejy9f7y7svyp6r3246fedeauovk8q5a5n015rwqovm538miig2mt634cv7hdxawpqujysfazlwu4xq31lu5dqml500aacdnrhl4sl82f5a4k1f97t4rg3o3md06x0rp81x9zgv6sl8cvlyh2r5exgkk003wwco9xh0q9cuc4y9trgxqulr40claiy0t4je875jp8qhd0tix4rgirqfspazs626mkalixewff8r33fz5h385aym9s35pndi8hcs2pwegdq87ohq7z00kr5w334cxtpxhupixz4ixuf80m67ycfnsio1wuv47h6fpmegizq8uqejsitqz6hx23xi5ijpvcye1fuwyvodfpauzy3zk2ry02y2bvhf5hx0x7j3lmwknwch74jpnddu438445w91bd69sklm8cqq65tcfg89pf0n5g0nsq2j5aq9it9tswp8b8nb4edckg3k669eo5skxpp9lupramhb9lvw15y8zgkyis1flfu7g2hvignubqzhbhv8xpwdifw763v6fxwwpjhi9rfg8hflbfeqeaepb0rtnos3riyz3egpma1tnvidj9fvfsn2ybp9xygvxfdgm4yzhjq9l12w9vo9kqe72j6lvs4lw2x3903qy33b573blsr0opbjzhrixeuk8qo4cab4a8sub5cb8056z3n071kcd0gqxh1x9y588jsub9y5a7xc1b8ldn7984nxa8er1ez8bvvsxcd',
                        expiredAccessToken: 6209226399,
                        expiredRefreshToken: 3324495042,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd940a52b-846d-423c-8c10-527a945528e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('2b0f1de4-bc72-4d31-9ea3-2e38a63a58bb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});