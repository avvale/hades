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
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'ywak4110u75zi7eqx10jwotlies4htk10ci9mc5doz9abqeo4i986mmjfc5grb5vm7i93cb7m0uvrtfy92iv8nou0640wciv2790j2163w5l4uc6sgpxqj76q40q4iowfm2cfnu4j8onns7qm2zxzjax78p6f2mzyjwfz13qs6pyy7khipkn1dyfiwv2qvf4jkyybbn6ppv2f13aph5vochcwgc4rkhln34nnmura15elee8jw4swyteoe2gz34',
                surname: '2masov0g8kcej7gpimz3m0axho3q0vcp76nbvy99z0eywmet4bhd2sm2yp2tpb37wu8w6ircua5jdgjj1yil9hnxrmig3i2dtb2kndcjg7qq6kq06biarkc7jjot8whf2gosm8qs4o2d2vsz5rgxeaky5gx0zrdccwvr3vbi8s20syk1d8p2o18cmeypqm51kf5sra7f0k5999n9q0zlkolrfiffahq122o02ntcll4zsvzbjrz2mid52u3fr41',
                avatar: 'ga7mzqgrmeys4451be0pjbo8vvrmujsm4ige7584r34pono3u7665308uwylw921utg1iyyys2mhe4vanz5dav8403v6ne1lxha6wtq0q13u37979cxveicxhkjvw8zcddiuwplmqeelm2xvhski995031ooivq9gfexyvg7y0qllkuahghp0crtjugdtl0rme7a1a1fhccqssv79n5xx57gxvj4q7pqt31g0sajhl76uan2vhrznjx2t0yz1x9',
                email: '1avrcgn7ac7mde2ol4ngyek4xvhljpum86nx9c7q4m8tg2hsmiuex9z1h0ekh4ygtjtfeys8vq931dplnxw12h254p4x1ewhitu936d7nv0cyryg3lvq9yw5',
                mobile: '7p6azoylflixbazmslfeweex79q29gpalplzprk6k3s2ucxx7c2o5z1f8qxw',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'qz7wk702plrhd2g3ikl4k9i2kfo2349atp1qbpvbet005ombjvwfmrpavc704wg8p6qbau3r4iz02mumef8cp4zdtt91d1afvf6b473doxes2mxl4n4r1isz',
                password: 'f1lrpihgdzj0xcnilqkthnqot8roowaehut54y62w6m1qufitotf38vwhj42ddtusbf2vtnjjxaukb6usceotf2n7jgjenmuur1yibu6djczm4utx3ujotyvvszucozcs997raitiiamifb98bl2s82mmg9phoc3fnn8ft916wf6kzpq7d9lujfm2ozueumgyl4cfc8hezeyo4jppkyhdmivpsh5xx9kc04cxdaci1k9qdsbal05phk7claer0d',
                rememberToken: 'ivvnsop8m6ll8zxe177wu8cmehqep6ahdueeg6c1s4n3iilm6okr7jlq8tkain8g5pisoz37utw01hpgov5q18qvlqywk8igp3vk9fqf5mrmvjyc5dqbmpppd4h6tqilia4mbfp19t8hwv5gpikm6b9da7m8j752d7lj55dlhjdjbhs0fmawsv844v1cuz5epu0q69tehy1xacizzbrr1xt32bta0yte7c1kw5waz6jyz08mrqlnv2xugdfpxu1',
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
                
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'lyzpwdn48bi85tugkcqijtji8inuslmjv6900qqv4ka9dcbbp6yn6gl8wy83nh8qw04wzewbwlr331wj5tuvepmmjw8qr15wzgeghj1vm0i6p6j9nti9kvz97ca3hfw31ypyfrqt1esx7n6qn4ff72949t4zbts1ck1ixhi9c0zg7nkopeoz1gp1ugrdz947e9vg40w9va3hsgimvk0qrzg62du4bihpnfn6sczivwxg9k0itf26xqglihrfnff',
                surname: 'wjx6a5umn6dwynhbs8tsolzts6t4abinc8r8lac2svtw825j17gk1axxe273pxkb7khzcv1cwqtrd4yg57q7rj9lf95mf7mnlrzfr18ncowfafv6mubdhafd7ij6y0v5a5ecc9563mzkj8sh9aabfgty3lhotv7wagsj80hxqxs8ui1qqwbkztcmvawvwygprp63vvfx0fir729kg4w8wnkq81pzocfigbs7py7p26b9skoyctibboxgo7y1sw6',
                avatar: 'od2dm865152p5byeftwq4y0bzwsopwuxw5jbj9dlqze89gihyozniuqm97i88ssvbr9h7m4q3u08hj00nobox2ah6pf1cz08cawtmqnu4a19hz77pd5r75fi3mv29lucnpxxo7hsau52zqr3iqashx1qoio06m7ykrunntv481uauv8wzhvnd94pjce2h9iu31ypx3bu76xk6uqj9ry9nk6a1g1bvmp7i4kq5cgd23xy7bmzk1agl1dkjyrbr3z',
                email: 'fy6ncjapgvdt0wdxi53f3zgwskzg3idk8z2ydctsjp6uvniw6ajzp9vmokdake2cn3ldy551ewp2rw5x4mgxutd2n3wgvfsopo4cnb0por6hble2p8cg3wkc',
                mobile: 'brimkcbc12nectybdwcf72nczr6c3l7mdvmv836to1ft5brbls43t8ldil13',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'mh6jwlbviyto36ev4nf9t03gitstucpw3mm7ng5l3usn33fmxgvf5t8fevzvdcmzpshckeik80injmumvbtdlf6c2mkrn0mw90bybut9idmh295hh1ru5a7i',
                password: 'r2j68iwsnm8pgf4ja0wbuhfkyzvic4x12ge4m4hdhspicgglgf24key56vzqq10i3fn2igt54ba7cdb0wrjpm9irtioux05hhz9v66aboop4vbz7r3vftlkpydi9k88c05jjhnsrv84yh8tgp0de00na6vg39qz2punkltz86bet0yw0lhfl554dqjub8lo63h434mjd79pag3ognbup9owa6bai8wteytupd9w5ohk29f5ftebzmry9nxri96p',
                rememberToken: 'timz4dwclkts2ngx4xmapo4q7jf8q8gh5p7ryrwaqacrf0jddupg7gy09tco20lrtizqma49t1fvgdyfj13gt82xfjtllgqlkr5rfm2rjhvouhu0a2s14e2aq0qpri51xacv707vf47vzy9bnmlqytnen67q0llwq71t6d2u1tprjal9924zt5xopmpfivlg1pepqprrgg53j0o0s2amfmgyhpf214u3j05icgq6r5d5uwa2poqf82jllsob3ml',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: null,
                name: 'q5zgx7u6yopcriqotawssz2b8ghw2g3ez0lk9t1dn06sr5j3of88lch53uklj9wlwn2akeuorgm7m2fv8vl3mkqv6s0h40q98t0339x6naw2db5zu3cleruttwvfjdvkowqyj0nc1484yyilbxjonryv65s0mpc4uz4me09etiwagt4nz0c2oda9c3e8n7s0a1qwh2d8yesc5lgjdw29w37a6ylr2xsi1m8n5e4c9gh6tdn4mkmgb4vbnaoq1up',
                surname: 'fcdvh9fu8rcky6w2ao6dchv1bjr5plgy3yfrxj6eozutogundgv20thoavsm22xqdnxv8t4ccbf12ig4etqe16p3602ui3kv5shsr4cixs8u0fo2x16fk2hymyiwupzla9e62ndj9eedf8qq3t2sklget81tr5unj5thk7p7zkpn0klhj95ed3ch1y3ic4aek0s60nuu707gniso37sexj5dharwtx1vr2svjewpu8dbgygokg0gsgjt16egunf',
                avatar: 'm9auh2pgvzfdq2wdodhurjn0836s9yp0e4qeduke1w1yytyvvt8zqja421sg25ijlgu29oi0ork9blg5p5xk6rvlz2w624pvdw391n70pog20sxss3cgul9nbdtw1ikolz48uyvndxbc7yuf53hh3szth2po4utlx042b94g93d1q2xwdlftoa4v7wqt06o85n6wmx9pxl035j6d93o8ravqixe6ts302wckprbmj50kp2qlbai787on155mv28',
                email: '3x6967s7hr5j1b8hknpdahr7xh4n67onry6222rw2d5jjbb1sf4j5ecerktkvzyr9olwhh7jsvq1ius9z6x2dqpqpq323p1t7l9bewb1hodmuub3m2b7fi0g',
                mobile: 'kutopece8kdrii00yp6rli7y1eh6unzmp6qr5lwet8ehnaerrrw07piiox0n',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'tdmyyewsiq1zmc5wxm9r4rzxel4bxilrnej9xytlkpruq7epq8tn3ad69ah0g1wn6q8oeqfeecws1hknticom989opyka48b93os6bul8tdsh5h0dzwj592s',
                password: '4l2hvsv8gk5yfh9b5phij17uftzz8cgh4g8896i5diw1in5bvqm9hjss6bifu477qwhzjg72tl3j0bjn1xsz5jwkudgmwx0nhn1t8xn4t96hn04iod1ce6sjtbqhdmt9zig4b92ds8x26xf3jozg6saiowbdi2vcx1ilp6t7156fzxwdi6afopsprfqt0gde2utrueftwo2dyaewzuxryhhmjwaixzxl824x3fn2yobq5s66c71qa6t2ycag7a1',
                rememberToken: 'nh0qwpgnrmvpnko7zgxjuugua0gtbzmqmzp560iyfsg78hj9oqfni8ux8fxgxpas543stwhohgiv9276xv2oqojvioox70v362asruwpdw33w8a1ksqro5prutstrxsaacnz2hiefxx47muifthlklxepnj4hty4cg3tnk0aascqw9an5tlppo0fvfbl76cf6vepqi7r16192qi9s1ojolqm62sbjffhaa2nq9pvumveumlspsi69idjugc237c',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                
                name: 'rclltbwy9twhhr3cenba7pkz2owrd1y0ryy3omawkudxotu2osswvufm435yqvtrmifg7fzb506kfw25b4zypy1s59fd6qeccswtnuj2ueo6k7vvv1op2104kcz4glu6k4vinyoid8zeusyosy59kkyefyykpniv4flmxauex30k5e8ivo3hfa9zgetpci2soykxkdxdi90q3h37g7qta7657pva2kkcqs6xufx6c24v64h23pg95kd0dcikinx',
                surname: 'qomzz2v04q6qambsnsjoxxpa26gx6feykcuu3d5zz7i2voxz9tu99f5xcrjzytt2j9rchypztc1nt5hnqg2dnq0zx9itzn62o9kqit8ep7lrvjjn240txhith3s95nscp3zlpo0fh2eg3eup7xq1d40vb34dkchbldclw3m6eqaz9676bep8dbzhik2545lo7ekyyscrozs0sa4merttpg9q6lv4v7c7i9a4lavfg7zlgcduekq6h2af4wbgaec',
                avatar: '4cf4h43962idvy6c1tas7fsoycdem4gn8062hlpzx7p5s1ssqpqd0iydeuptl2e9vi90zred1yqay0uoin6fcd18d8f4wpc86q9dnpso3dvt4obgohwhcrbhoiicxztkpzcn4f4eq94eedj90ib6hte4bn4y2eez590pz10crq99i1qwyjirxfreou6jj0ynrsndyawzzsy5er0ygivcfw3wb52yl9tcacve09ynbd2ksuw3iijit0epy70yviy',
                email: '5bffvo8c2jsg62fjrq4entaz9qqtu7b5bvh1u681vicn0zc39evq8t1n25s7v5b0p22xu079b51zsrytvvvtd41ubgpx32mm3d6gpwfmqi4v2q1ofv810gk3',
                mobile: '3j65tst4wevad2vh9qkx4fuyxp11zvbc1z8rk7tmzigb0v0delira99xxzyr',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: '6j6up1y4hvt2j4bo0m0h3650xrbrtrnour6loaqad7gsz8lafg0cir2cdp8iqpv05x81t5vxs0gftg4a0tquqh8ovns3d5r8bi0snkk0z31ug2maemlgjou3',
                password: 'fcd1z180h56rt0jbb2dqwckwpc645leqda11h12be4jmcomfr5lo5ppdcs1h3hh5l5hmfg8rya9rmsvgo62chl3nxdqf87ebwl711ekidk9rqp7top89h0mbk0csnd1d69jz64obx7pke3ljk1oujkuermqr9fqkl6asxi31lfcyjjpbv8pe7m4mnf0o8n8cbfufometgfiiffoc4tnoz8os5ze0s7at522k1jckn0hc490wfvpo4af3stkp7bs',
                rememberToken: 'p51vgrbmzkmexpxq89aort66vxy83tk1cbmg8tkqv1nd6ixzw1ob93u7ysiarxoofqjzr282op17po4whb7n933t0ip8lqq23o9t1dw828nlhsdubmyn1iym99r6izxxwez7s7qhozon8xrmjfne6dzlaimgcbvt1gxzwfab0dw5lzz9zx9o9kbg7n7hfezv76ns0smuqek50w6h6vio3ufqpxwovp5rgfdtxsd11xhrn2ykz8v3b1kby72noc3',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: null,
                surname: 'ne0dg987fkar47yxxqff2wx8sk5sqmfnxmf83tdbd8095h5xucdrnz9krlm50on1ahg7ntg5zmvdrs0m5yjgv0qc1dar5rgiapfddimayivup9tw88ktqe1tmnuw5z6aexeu0ql1tgqv1iqt58q1eoxxm82hn4q8vkt1er49hp2we1ayce4upyimbj2oznna7l2mxhzmwkxntk2i4665otidhqex0jrxvasf2rnq2pt0p3irs94bvqwvhagtf0m',
                avatar: 'qcmt8pofi78f9hr4ys4cvoh6xfj5j19x5kcbzdyxanx8vacjihg06d1s55c31sfmvqx6kkdyvjq60pi35sc6n5afmtgc149ahv2xvzsuibhfcmsoj4upfhgoq37qg9w46bxm4r8jeak45bfla4s0wertfwljgg2bge8qfr825wua07f36iz1o1n8cu5ea1euq3sgy255w1b6wbnt6evd7n79maahoarbrdranohtrinmiie1j5ka1993uisvayf',
                email: 'hgznia0l3fpknppjvaxzr01vznii6o4xaltaeztfru9bdzg48e0zdm7fsxatykm9vemwfyo7k45zb6xet8ef33ukrxjkfkooyotdzv7cnl0tpiyi4qk1whk4',
                mobile: 'sd2xblqwid3hrfsb2lpx9ab7k1asymwnp6zjpp59nj5dmw65szhp81by8q8b',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'lm6rbke4lrzofofftmsg7n3n9wg1vxwr0x3zphwof8ng9j218ab62ssukwji42ebju3rt2b5hnrauho6ogbbn4v1sjru91mewswn8ijcx2hgbzb6ihioom5v',
                password: '4flsdm6bdh3ek0b0xqq6vr6y23hd6yunjv6k7liqps9jrjya5e6a5fp951jc0hxn6f0kv7eeg5l8hva0prb8vyjgqkw0oplv69c3ht49dr4zotu3zbph8q5brgmc8ovbd3heqsrhzn8zhazl97d1v7gro5gxxcreo7sobueamiq6zcyepx34gfkxt5091f2hq2qrhwzaanv76b00hiiis1b4dwqh3rhcft162c7v35dm1yp6kd4vkdm786eogol',
                rememberToken: '5y0ew4gs6ib71z5cjkzrgw2y22x3vtyniiy8oa9r7c2vj40dg6fjiomm1b3oio8h4hu7qzzwnk9z2d2f9n21837bixvnuevq3zww2z00ofrtkufkcu338y2n3735cqm45ousxymnet4f9c58ydie24x6zvu48a8cw3iy7bff3r8930h9s8h0w9yuen2lh5f4vtvovx4a88isnwctx5u3t9s28qt51nb3matwarsrkunehh4r1rxu178qmozfhye',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                
                surname: 'r34n7ra5iy35pbn8unii0pywcft0r7nxyv1puaal8yqsc5kryf0fp7vdsvqkhb504lvd6jisxzpkazb252zme73rdrtqz6kv7bs5ubewmcf7av6b0luxhg6qzpvbj1ieiycbepuwl2pq6x32ygem77tlrq4eh7wifwh72btsdi4nfztftrsnthoiusmienn4or2gl05yg7r24eyvuvf8rfovzcb78b01be204prbczbnnek9bl2t3h1rh9l36ly',
                avatar: 'sxszr6svpma462v52xjubr9mnchwplxfg0j3dchdkv6y7erjv6cragb4spbrdm7o9uxj5jzkyvyyxoz36ge33q1mtakjxqfopfsaolz8yjrdsphe863niln55lpz9hukqduv7wo7vjmd36xim9v0fzn85lgzc38dr745e45wkptp4arrdhzf19n9v69ma96506tbvn306hlbzmn6bzbxc36cyr1ozopllj0dpa1agnmytvhz89a24a41e5xb8rq',
                email: 'izg4368va31es52e41wsyygfdsshuj71bowuy6gk5i3wcd2xuu5s9jj4dvoie3vkcligzjf6x9crmaxeytvbhpnjywby5wz1cv70htcx4tcg9pe7fdxhvpav',
                mobile: 'pyju936vw1tuwwoh9r7gs6jzzzxsf7xrur1cjtktc7yra2ps2nb2lg99ii2i',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'pb7hzfg9i2fsyn0l6h8fsra13av4spjldqzynr2r4i5fweea4uxum2f0ne70n22mhxwb4r86slbbucwio6ze4hn2ccgn1tzcxqihumhhqgahumaf08soy4v8',
                password: '9vj1htepr8jkx3f0hpho4evd2i3ip5g2qqxr7x0y520e5eaxldofnhnackfdf1cx1akrc8cb8h9haehm57lk6hmsay3kdmdvxs52yjpti4xa7huajajcvycsp9plnqpxaj5cinbc718tu5nys33wp5163cebvjbub99expriz3m51tfsgy25l6trwt35j352vyv1n0sk7h1t9xaz843lk5lk8j4r0j5gbwqgn6a6wq4zg717s3vxq8v2d0g6jfv',
                rememberToken: 'tu54ygz9wb2pr07x9yodql8prdci3m096i044fknskpzyf7cwmkf0k326i63amizg7gwtae8eir724bpyg1kw6rlstf2kb73zzdylmm2j812eeepky8dprgzeqr8a9c9su6bmw0frocakk20x3bv3os7kw3wp1jv6aoy39vapx6xcvdt5cbtuko5n3clk4sisyk8fabozatlgxl9t0qevkdye4yfb1u1pu0uk7l0837snusu8ouo5tdbveeiyrf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'edko1yo26w1reb1lga406zfk8umudbkjieololas1gmj5dux5sp1ztuq8gb8kpsm9q29ni0w03kfkmgck0io9vc7f0po4zziiei47yy1z94ezi7o9pzblifq6gorvoiej0dkfvckn6wdg8fc6va6ij4e26uk3pygs8awjqpb7sq5uuhuqw5bvflrzb0kgr70i1ewcom6pq2udqmb5tzqf6hi2ujjrydkj76nozx20p69kwon9uzmuv6dbkybqct',
                surname: 'nz8ff9n1nzr0np9zct8ohzvdbikrar2yoacm3wv3z572xdoldc4nnqkbb5aojp1eoao98k172atxp1en5vcsldyaotl5onqu586q1vhhgpjww5ip9u0hwfia8bw0sles9of0qd8ns5zblkf777zitub3u3v42zj9723fgdocc58ybz63o9fujil6khsnyydw9jxlstf6hgje3liylvrfjpi68pj10k3wu4fwj04azlbgb6cnid2u648iu2rl115',
                avatar: 'ysprdb6wz4f5z8czp0y3o57clpzsrzzbmn08rwq1n37tk0ijrhouk9xf0k6qkhiz4j846wbs3eftl7ckcz2n1sbmya16etteyov5c1nlxkmvrrhbyjxyslrosp3rxkizeiuntfz6ttclssi39gomxvoa5tc8mtuyzghvcz6j8e1x6gt5skkqjkbod4wkukvfwt8fr7kcw3nepfn9fpphryi81fcxyvabhdk5q4zws01f2021hubnbfa9eha7qkn',
                email: null,
                mobile: 'xq4c6kyn61wcatsq8md6q6o1qov4hvb08aj8oo3wlxwmwkv9ztng1br3sfuo',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: '8cupbzu1tv0uhwwx211k84dtr3mcyw60hbo3lhmlnzxm1ird3av4w6easdb57plr6blaq16s0rpojkppimeh18vmd3lxhu2w4rgc1tjzt0ufkj0g2t9bpa0o',
                password: 'x3vqbbl6xzsqulrhp95ml28zsl2oxmhedznh8bfwiz7kvo9cyhjkz7eoteazdpeqqtp4azv015etvcwhl8lfwq9oguulhlw7i0s1hyoab503elrs7wtc529oip0p8ob3c6vx28m3n4oo70onvrs2qvapn3nhykr5icl8su8eh0g8xytgrjnn71xg375purigi0e2p50glrmw84imkp7s1uwknwh57xqq7gile0kfzk7ypaqwdj8o1d7s954po34',
                rememberToken: 'trzw9iq9ap9fs9a8a7p54mlrm6bnfgyra3fr816zzy0nvrp5xiq5xhltn8pgo280htjcgn6uqusrgdvpt3m8qmovquvc8azemyurs4jed2icmdedx9g2ckbhnk9wfqeagkbzxdjh4dc59xwgwhq6xwjshpcau1ov21m7i4zr1ljqlvybupkxedwb4cl4huwna2u7vzq2uw0ajhx3oi3dml9sg4friu9m8lt4aw8kaka6hnf493c6xuoggceuwdj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'rrwbww6shbo06gogbb9yoskthfw95msd9cw58jpp4ul4qxfz3sab8c4jwznn6z7ly7wqrgzhkybnkwy000uh629a39wqonjt39hcptfuwttlaqqsz143oo2sz3pqzhin22thy9qsfqwk5qbgrmfd9qovybi0rwohy31snov511blvpqhvyjtu4yvptr4lb3siiquz98f9c9nvd6286japshfwkwjd708lcsu9hksqpcjaj2t0vhr151ays78am8',
                surname: 'rqsx8fqngt7qz8hfdpxvqpiwy5ve2bmk39hjvmwswubiian2bdna57fccy3du2h9kyn9y8enrh2mp6wk2g3foogl6ihaf27d61qrq77w1n2f5qimtavc802y7npadoen3hzmrc43y9j954ga49mbut31g2k2waog0xmdrs62tdlysic3a5sry7qe15k6lnknbre6r4kahpu9e4zs828tlbul2eebx2bcvjcizifn8fqoeronnzf79paksm3apel',
                avatar: '8zf3zqy1hr7n1h1fvnq5vysjod28jwvgex12r5vb4sfq1khzfuerz568ba44pd9wpsrcu4aaxzsptzwj7klipebsw1tsmc2s3r80dxmw3cstvz7kb062qoq7nawmprtsfr9ym8nlktfu841wsrkcle2tb5ml2zmla3aug5nivv3u8ttea0esgnfn2ukuk0v7yly6sy0tl0w6oa8gow8v9itqmpm0o34eqan2kl36e7bfuxl081a0236m1j2gsdk',
                
                mobile: '7xlyos50eayap64eljxvn1jq1i1o1r2xvsq8me3h6g34i47k5ncezt69loo5',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'h5ow2qnoxl5uu062p4fwu7y2vh48jzpy6h3dslrd3qeleyb3lb9gjbnmdt2zj9kq4ydph7tp34m17albude78q0pc8spt59f0xkfqgyhawyq4059aazd1fkp',
                password: '7uykrz0mm3gqbmi46mb3fr5rjwddf4okbsbhsobgvbfr9xezv7o2kqyto7jl3fdzt186n49t1agdf5tb0fjxqygmhtqjmod2hc4tqsr6m4d9yjh8zl5srw5ry4ia83cwz7u9xqrl1hxbta0b2ubc8luih1yvjgam18dnmjod6d3icc9wl7d07sib6uknbl42l1h3a4i3dk3k6sx14lzitsrp5qf178m008pq5036kstnrkuj9cqx83kbrlntola',
                rememberToken: 'yi9is9hcmy38diwx7mfm8f0qbswc821302o7xr7t5datucx8yjogs9ed47dfsm2hqw0mcxvl7zpt0cx3v6jj7mvoxhl5a6c5n4nndpha60btq0wnekvk6w25s3y98in6um3x2h2l84ybyzybbmavutaqab4rtb7kqsmaxhahdesdgr5dfywumuor0a9yzez81dltw04q7vds7wgtak08vb29x9pyrbjlftw6x1fd4ges122h7lw2jtxd7tted09',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'bya1sgujs891hk5kw62zs4yfe3p1utrc1fagg38e2iaebw7jyddkq56dec779zzklzxsraw0nnutfl4jl7my0rbvi6vuzr6rl40kpv6xtzmlt4od2dcvtrv5ygjoc5cvvo385m0c9zp9tmmy26xuy3n92zfkds9hgze983vsap6vlxav5ziby421m50tp7xondt9tkgtqahnj1tae1gm8lnvapwt3exdlny7e8izlkm1rq44ao5hfwimiqklqhq',
                surname: 'pm9u2zwa2c9jki76qpphhno18osyllxngxa6ibgcyr8zi0sxi5j4omb4ys4mlwiecxcy5vqk85p0thzhrk3u0uog0dlrbr27r50rflpebhw4d6fj8at46wg8jszz30r4ez4fnjljundmbfq54myno99d86f2i4prjb2sohs2n9q94jx9lhxjlrbfp50afgydzlgauzp6a9dqnn6y56904xq4q0ps8borl49f7zsmroyzlyz906njdm5kkhr0eew',
                avatar: '2q6aqcorxfpq88r03xld5aa1e071ndb6t91x7acssm239ziiighqdeoa6czze1figfy6l4mnlehoike9boih7vwsnihzplz2myj0ko9yzc301vomz2mfd1fvd50ch38d4rw0aeh60ayeyxbf3udjqjxrtbzfvyy2lmxhv1lokk14hzdxp196c5aywvpk3swtztnmtg5yq68o8n6s5t8s65twalyfp0lvdn62aaauustfffleahw0juq9knr56ed',
                email: 'r4glqgjk51pygex7zpvcfrqmz005vbbzlfvwo3tllo1a715bklemmk1eotz8hf851l5ji1p6h8vg03s6g1kooa5ow1kls1g5q9exobrixrtccl8fnb7v4z8k',
                mobile: 'foqx2myi92gyaxve8tnk94tgac7o6yg9f4c0t8c99thb51r3h79w0mr3s4k9',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: null,
                password: 'ot2a9irqkembrytpriwcnnwdcaowda7pdhxo5pue5dru2p0i5qexi06euiqtkw0vwmmt9dt44czpnanvg8rpkx6kslek4c3q84n6ztgbk9o4i0zngd7ihjiuloghf8wspvl20zheg2ralv1oqzo5tfx1jgyxh22zqyzl061wd30pooez3ij43ds8ori4il8bkbe7avu1lvvw89zelnig0691xw15toae74a8pqjje6hb06z277lt72np8ouaugh',
                rememberToken: '0l2p6t6xchisz4dfzx017nqhqgzjklfnr7gafe1lr1k1mg1maxxr713cbxaz8vsg18qh59t37umpnpz6ievmig7uo0pquylblnbh58t6dh4peuv6wxqc0v5ir27uecsyygtm5jxatvkfa1yhnqdz1j0gkdy9q0p4t2uirx0vyswzdaye9w3jvx2ojiqnx5ly01gsr48chuq926pxg6q2idgtgu1hpsqfukintekb9njloj9bi9r119bsh4grnmi',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: '5rkv9fmnjqyyk9138mfx92hhnymyedmcwo9t0svkve8cbuj42g9cjryec9uxc6dqj24ku46rhxsg6fehok5xp96dv8mzl0g9favc49yt8jcpsp8zedxplrblkw6dg3x6u83mlgzueu2vo718sly39oi54fjvoxq4h6thqt6tyxcb81fpwoyf5cwy4q2radqpq35v7vfah5ru2cf8jm4pv9x2j59wcs6dpouefj9u2dzfhbbmf01gzrq0hj37a09',
                surname: 'rm7dywijlajsppjtl61pux0thiuug0df8rhtrs60u8mj2agv297aw955hvuw86jser8rfsf0ucmd99oglc799k0lzzs3agcxy5pc6lgael9vvw9n14315ycq8bhqfhxsrnuthr9dbu7pjxkxdi39esppkt63r2ub0hadocrmpy6ubxqj7qqab9xwqqkdp624qepiu3afb8mytjyhufmjevk1ndpn1hhbimbspfi5h5knc7d7p8qihg2n36abeqt',
                avatar: 'htpzd1aq2fha9z7x8a77a4a9bibhxnzypy85x20lntfrxk3g4zcqxfhpjsro83c5luvrt9k7rib5pquxwa0qk5qj2w3lg2pkr2c2238mqgicr1gi9tsa94hd8ddt1ndw5yz9wny0ee4cxh37yxjprqzftpcxkomwzd1azhmd6qbr1ybb7h4elvm5u41eqartlq5khosmlr4dm294rddrjj20h316yo6kkcukawznaobv9nxy05afrizahx1co7v',
                email: 'ol4q7z8el9b134kdq3xdktm5l46v5z0vtl6z9lsotbk2kk4nnf5x9yowg5n6320pxyv2yho9w30eo5p97aewf8nx18obm2ezp9gqjsjy2xkb2tp2qunxoyat',
                mobile: 'e0ot8y5m3ix33m497v5ypjrq1ya52wgfi0pzj2qo1qroiwu1lircks2hqj02',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                
                password: '7iu2t0wpu951hgwz237t3j2ple8ivhm5d0a6cfjibwfai1n9xv8yg0nfz2jen4b903fxuzffnn9pqodlctv7av34j098klu37qgmvjan4qbp0b0po1kk8qpik3avjx8r72d5q5b8fj3792mos4bjk77vc96t64iorb83x9vh3io1ge08f6li3fcy57ht2pyst4vz53r6h1plttvxcyhk19zato28a83wodmrhf3ozvh42n6dd7o9htoxq5zbfg6',
                rememberToken: '2r5ca8bcsrgzkkncjwhz3lwnttkbqoj1vu6zt1x3eds5nl0l9gojxnzcjcqx2e4mkd6kp4gws9gsav0p7zw8cr0xuwqf9b468ynlrs2915ar1r6oml6t2ikgh34qkm2c9lgy6kt9rbj27wxmm2dgwk0kttci33jgf4s5o8wl30sa3t04sp261tuc572blq15vou51c32qyptjkkyi1th3u64zpv5ekzwntwfemk4j38c449azo1f0u1py7beayk',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: '5ylppu6bxuu83qhrnbn94wi7m6p53bvlvyirkv4la40fg97z2tznnf10ocwh34hc8zjnfoq2oniqgtv2qu9m3v7pifveosc4e4z1w1gx1zdbnn7mbwkfhzmwhcxn65pq68jm1y0yak35iysmhfgjyypjqcncg7tv8gjxtfnw1zb8cgn9kqrpmbnsmsw8cxe0uvlons4tp8kytg84mj2njyipo37d9t9yk67yr6vzdyuhvf1nvit6fqjfmasmnlo',
                surname: 'd49zksnr317y6acivh2zq7912sipacowp6fgvb495jm43okto535y4xj3daowkqrklhf609ti625q770r3laltucetd2cxebzdwbs8io4fpr3idude1r4ylbtl8t0ichvzpmx26ma0cjoyoz4dfycbdml558vmy4jkgf4w4jzgss7zq3mwh8hmhx38xc8op1joso54pceanle59m30a30w1a3hyb14oh81h7uk9c60c8v8gwivhcijm7lzpv31p',
                avatar: 'smx2widh92fs44dnhodfl507kxks8wubog4csr1bglfsyqm4ufcpylec0aada2hjk72p45gd83j95dkt7xk7mdk7b73ep0d45ut0blzk3o1gid9wj27ogirfmi2vzn8g019hqgqkckp1kqkqus322samlxez7eubd8kaitstc1ef2ncyx5uf954x5a3il7ccdv1ygkix88qbkig5yivwwofk2zsawbm1r5nf3tjehpblp4leisqcpdz9kdpih46',
                email: 'vslhizvdcqn0usxdxejis9kgyhbrfot6k1e28s0ovv5bgfpz21sp53lezeszorx1pqg3wzg389bt1qbmpfdd4qmc4dq846r5ap4jw2tcliq42c03hn0aa27k',
                mobile: '3lwxfjqte4yj2o1kktkv4d5pp1wok229rc5i08udrwp0me2sq91rfx4appwv',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'ms9sx61onb8g4no3p4kfx5rag7qo7pdwpjlrfvde9w0q5kfiklzhbitbsobnp29y7jqxu3khrvip8znaw0lvs2rwpng228gtyx9mig02aybwvqjgvmoitgf4',
                password: null,
                rememberToken: '09jghhtd2nmc7fuajfqyenujm7h8wxa3xn75xrwfbyhpdj7yguzpq10o94o6nudlahz9p172ewfggcckq1zzoc4j9ifzheln3qwu6ndm2ydgwejk7w5twxuo7jzgq8myn4g1t60a4ote42t3wtquj935w427i3pewabrwok5zboh81p09v3r0nqtpsauhke2lxn9l0q7r8i7tl231qitbtx014xdvtpaq0jnu4hl8mu0bm6vmg0wbtw02u2t6og',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'q6n6xwu4z291zl0ygsjhn8dc00ukds1segnplnkb6t8u90l8ysva6bhy1rcnv635qq7q1zwoug0cg6ed3qqmg9qs6pifw3cnvad8vsg56pgvb9tmpgbo6rfrg71bvvtszv0tfplrqj1f50r53ri0hfk7oeierxdahyzjeucriahn7pml65ew1j4u6dvpi1xi00ew9yx3gbstf6tzzd7b6i7f0wiofhllvqtx29zy4kcknm6hl8ch22axelmlz91',
                surname: '1o1o7v3melfz2vme45wg43wzxqgfj4xsp8dc0fjt08ha4203ayshuacgyyvmyfjxs4tasbxjia7upwrs477xwfywhvuz8khbm0ok411va0mg16pveog2ghxj50ic6p73min6kmleresmjbpcb701bos9u69nv35gq4w5dujetu9p8zq6wo87yr1f8ff5t790d0u9tvkz1gu6v3c8488cs3vncpbqntqgtl323nh9qa9044fdl0iuw95e5j29dlr',
                avatar: '85qtljvveqw7xabknggps3xu99q9zdl9il9z6puknkbrbpf8dolqgjwu7ethksf2qdas1iqow8beencixb3i0oj8r1laa9ko914fi9cmu9rg5leqqfjzmsbuq7lzkqf8gm4lh2l5jmb0k6zbfd7wve83pwaua4oa42b57n9hpx5b3jzsmdt0kgwzjkgwjcb77kd67bniactznv0h8lgnoq7lta8km61xdy605ggdvas9xv7q13zwtid0pl66rze',
                email: '8mkc9gnuww7pkx856ckqknuzfk5ra057c625a719o4btq6ls6ik5moni05t3pyikcidoqu02nlfa9ibynqht2j4r53agw6hs6hshwl8f00z8axf4ljjk33da',
                mobile: 'psys5ayq9zwny6s3ffc1kn173y70v7mujg0q53jc5j8tk6ln0soutdt8kxwx',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: '160p87o17dvlj6zt4w4jiftwlovc7n6dj1e43nuz653wsip4jy0o06139yi9x2iee3joiqotryu65lpfphwfzm25251u31ux5r7eqhysfqxqsn4nuumblz7o',
                
                rememberToken: '6n51y3fazxsyh4hkcozd1jw624smip2agravjcxcaepod9pw1j3z7jz7i1j0cxozh204jcv79st9x0qqbnj8q7lpzvc0bp4as7xg4hqlifjqifroullx4xjlcrqrxicdmu3zo3oaenkd2iq0jvqz0d4nf6zoru27z6krz8pnhrskt1ohkchm4scpeusvjk4dulxacab7lmbcqnojtj5bokdzsal1pt0d65wjxc2glyt87sgx7tb09vmxetbf0vw',
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
                id: 'cx79fqx5895hko55xzxmb01hj9i9t0xpxgkil',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'dcz25pj60vylrj12psxhhsyvntj23asbks9u4kpcb2c55nqtlxi5zkdpu5is68osyjqfq2egk2qw2q5d47z6xu0ioultom8cldg6qoqw45w2spx29a2t8hgbxh9z5fbwkep19w5swhzv6675a4ueck1i7xefhhrp3ru2v72l257aj6midg9mj93qx4wwnj9g2c3me5b6u2x258ti8kse34n9spfmymdvakmokmwroxo47hxzu578k0glkgvyayr',
                surname: 'pbtsjit770kjpg7tmhsli3ib0g1nh2d4wdqapml4ubz0a95bt2cogjv261o69qge0ozalrpi3ext6uspq3l2jsm91juv2gkrkohzqllg4dahgr0qobzs9piazhy6x3rmwrkwbqj0shmqfajcldt6dj6vi12uyvhekucizuulbb8hc750wcisyb74or23doos3o34wk5vzuo6bieau9fyn8l4ereo6iaklldr38cngr4ly4hghd570reybf0pj7k',
                avatar: 'mkiu7mx6u8ji6ir5w81jt7v9hc9p72xmdicaxcbtjm91gqk56rx6yivqc9wpxmn56worosg5h2bx7pbt5b5qkvq18sg6z6wa2156px7cd6ftnvyrjbvwoo43yfpmqir99u3oaew96cqruphv1bpvr3tbfr6pv60otj0qsp09mr3yxswvqqfv4jscz5qn1vk7n0sah3ju8desq5wsrtaee0y91o9icr33c14h7fxiqsa7ziwpk9wqnjw6i7q80vg',
                email: 'lfddp0iu5iu5249a3eyljb28wkvaphp027ewu0sldoiiihlue9sc5hzddtv9cqr8hbkdb282lpwlqx13va1127f2q81cm4dtg95x4w0oh9dt76ebwqcu0wy0',
                mobile: 'yiomhc1saikdsck3vvm2wj08caesgyfrk2yq8ec0jcg9q3yud041gd4rhk1z',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 's2wcb02dhaio3rihnyrn3iojakhgmytgydme741siohpen2ac2i8t4ga3zqll0b6rowrfmr92fk9w2n3cydkisz30g2jyb20s712i8udw23dbnbxvpeuqpkm',
                password: 'yi471y490rzbrpcn7bvrpowpoz6sfd0rcvik7a6qpcvn6owof3s5gy04rzvzah37r0h4frzviuzktekege91if28acrpzbl1oztzn0tjw7um7ezjqqb92t022mj8dn1ipa0j8bb07pod6xa5ldgpk4ulqp1qpzm6ffi8uga5lo61r2e7y5yr01ovmzcwwpj8xyrofka9rwg0zsqk0qeuue2tdk25bkehi6msvhrtohfgwdpwi6v4fw8n95dxdsd',
                rememberToken: 'l07rzg6s26tv4yfpfmizw6qt3a6kxt6ta5drmf6puy7yv47kskqycmimtm10njo4ygq2honsdi55ibor1qw1ffv5dmo7tudb1h0x3s1tf5k0j2rvalwmtwegfyxjs799bpe178sv6t7ryninx4slguoi8uk5fht0c3js93a7mg04petruphanwaljrfe1ws2660jsy7rkgn8z2kpmt70w6rn2evdcjjqzt8d72ughedx3zctaob1vaiz6ai7b2l',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: 'g4iyjn4othdp8b90qog2254drglya4l9uyzlb',
                name: 'ts9qdy0rnxfne96mdraurrrxr6z2aaehdu2woaxhxv8y101yk96eh4a2ijv8ocw9vbhvvbb8d2phzjg3di35fxdo2yokb42euaaosyrvzxvhpw7njpe882vam0syan1cf6om5oftvfl9a2oes2x4cobp943c2frrquvicme178pbb6bs3m2z86aae96o9jlri0rtfip5fqrw7p008e903iska9lt1659xlnyp74mbhjmkp16bgmygs4d9j360be',
                surname: '89asecvhrz2cwvmmdx4327jkd9mkzyptm4xhfbsgx9j3j66wh74gnnjy3zsoc6os7jaltq88q08i71ehm1kedvpqtz1s9ekvb24tlaty2d6sjx5kvff0dftkabs2cf5diji59u6eyb834a5ph8mmifaend8j7a7wh5e69i2eep0dtm27ay6fmegb2n9mcpozvzk9h38725zt6l80pcwje3qxsggayeo7klm61jn2w61m2tmuatw6ypojqbwn1ay',
                avatar: 'rzn06feoe1jd29mdka66vyyz3j2cobymy4usnj0081b8u402cw3pr28leqga9xkt4sk0x0gr31w8ncruc9bpvgki5sguwa7mldtl0suaixiyxf0ld9dlo8l78j2gbpsw7n0o3rcrgf2dy2yy0dl3wg4aq5fu664uy1a7z4aq99ks5m6nbl424sa9me925voy4fsv9hxlmwfvpcuck1waryx8znymiw0b71fhexyb1lmu13moe8rsxpavw0vwb25',
                email: '2gpstuw9srbee5t39z7mu10qotnr7pbfe9d4s92biuplusku6ps3p39vr5rdfe4pal8v539il5rrou9vv7uqkavssvo3xmmy2r6vysj6yvn7hn4wqi2jh9e3',
                mobile: 'pzizjkr3kl8ks2absdtnsy61k8v3qurs1o9r18zvnx3lk2dx9g849qfnhoug',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'ybpov57j6x1612j5aa36kfc4peogvzp65dpa30npvjhidle764i0w7iqaz6z2wije6c5iovx0haf93fk0qkrwzee29jhgldcuih0ge8kwf4ylimhqmqkk0cr',
                password: 'cy7wl9v6g34egxmr1dtuwenqa0q95pbgfgxbwulk7qgp4jpqzlmwh8z81oqyf3j6byurdl6blpa44r474rhjxggmgwo0c9mxc6om3w1fnkhj7tmtz74utscok042v9vbwqjj8l20lsj2jdw2z7q6n1ihza37r2hbfkcbj3w3x6movff2nybcq9gjzcede1oudpgj63ozcozynrz46lu89g38c36atydiagj6qudruvyt5c11u7so5tjuuc5n7ke',
                rememberToken: '8s5r8z8589e8bt68be8h91kiapy4h57cpbadoj7o07wtbqt28pbzxzqk9icrjy941fpv7achu8e5yp4wkal7m5dm5u9f7q24twhtp8m0hg80yei9dqlkpbzye3fs79nb9ttu66coihykzzt9iryqzr252tonvf7472bmib6t4fs45txcdq8isnsewk6il6ajyg1qn7259qfthpmn50mm5hjka9boszp8n42zn74lff33938ierl3qv8rofwc12w',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'okd6icaxhpfygqp3h2ttbwtgkvzqe39uyc4b3gk8ipk232jkrr51iyv4tkwqifaw3f4o4208l0sjpeiwsi7c41exgouxiuazexwnokzfhx70t5y0hn7412lpaav21pox74uifwixq3kun52s9dhzxwms3vmpwkrbqycfvx9gu1nymzd4dzs5j32zfqj1c5itw2zmc4ddbrr4ke7um20tj9gy0o5lr23lg6p7dg4feoyyedqlahje9h6ompjdqh8',
                surname: 'c9hge8wv7r1e51u7iga4o9a2vy6bok5ip9ixscwopvmhno6jtevuiqq9v1f4gkzgr42txl209ezzg7a9z99tzgz9xfw7oxr8ipkvnib5nm25yji1u8aq93dmjv3jqeglzh7ttl835fexh56kp9e965etqdzrlqe9ybhhr4n2hve6ncm5g8kh55eloa3964mdk886lcq4x20dyv41gdtyyko9n7xe21m3gtleg7qp5teyu5h5ub43dsvhwngsdbf',
                avatar: 'g8z8h3hgbehshw5c93isrefiluv7zfp9x6r08yjy6p0a3sohjhnuvgrome0w6q4k97r2cgasqtovzamjasgdz6zcoxxohmeiqqqa10yvmxxcjx59b2udnmsnny70bmzjuodymhew243mvcnfkuaeqfcq4o0443pmbj6uxqcvef650ldy6tmequiudi67i9np0lpjtyyhn64yirvujn1woe2owj4py070kc7q1oihx27wy2dxj1ogoctr61nmhe1',
                email: '8creeiraofgeckx0zeb9h1z45f8z9bm00a6zxo4o5vchl1qos54n5nmgnrnj1qrmaj97ndlendx2uifbwz86el3luughitk8a5zsm6h79ie42kf4f8989we9',
                mobile: 'iz65dy7dilifhjl5z3r946q6wfhgqoct4l25xbo0j48s03k7swnbm8q5n5ek',
                langId: 'ozr5boafqnr3ro64xmr1e64748cf0lgs2harr',
                username: 'f61qwcv8xsko16zsu01lqfn2ywatw1c81q4i0wjk26ve35mcsc4mr3rbxa66ez1ju9z3wtiaefmuajccm5sqt17wmvfnxw2e3quxqejtxg4szeavckn2mxw2',
                password: 'lbxbr7ejnwldpq0oha27zq24k8027ulkbqa9dr4c31usp875wzag45ej3mf9jd4xbu2k1oq8h77xugcdi6hq8ybnfzp40g6shea2caf3v3kxnut50y1sj7lcivo51w0vwbicpg8bmfiznmwd04sn868wlmp8e19zmlcfp2mh7obofvolvqh0xw3e2cypuy17xe0as9l01wcse5nd37k49sk3iniapcmw4ujyngg47tdkor4wei8te0hgabsgzw9',
                rememberToken: 'kdqniyxa1i5erh19bxh4moayn2s1776i55lt13bdgzaacq4plens1ubq9uvwa1eua5cab455b91ok6ziqufsv3j1g8g8deachkayo0ufs7s3imcrix5iblb37rftsccrsx3h9e0w4o8yopqlx9mkhgy6kbwx31wpnss6jl0tcmlgpcpgs2tpxganaqbs9shg87w98wa5zopovv6mooa9mq0peyo0glljx23i1hagdnbyd4gno8t5t50f26nr38l',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'kxp2atsu14zc98achagnr2jaqzdgqb7q9zl3seemhhyzhk10jj9mlf3se1bmpbxx3rmqi8y2h5wzfncg5xbwumlzg3x4hcad8aq0y2yej7ptd5qw2cfl71i86uwysk983j24yht6fv6twueeza0vmzyw4bxd442ja3qaomw4bxijg4n6x0i14y6snq4ym1ssycp0ihf6mtuuv95k158yepmrucvhxo8i12tdlilgoy49ytgpjswgtqf7pu8jawx9',
                surname: 'mszmcemfull5pz57ttm1mij9jw6nx6li844roi4agwenwyspxh5whryihw3h5v730kz0mxuvfdwspy9t34m0v1bbx090uavv88k07mzkd1vio1cpw9lrh2kvxfsnw0rut50xbyy89j6wkm2uo98wmcqvoygwu9tu62c7sxtw2a47en3aiwq5trnhfb4gyq8vqeui4z0vaj4q2vzpwe1jlrwbafhk3hynph3lcaulodsvvwlwsrwl1r3q0fj2n7z',
                avatar: 'xbzs6w20yg7otbxry24saa9pvm9d9pd0h5ogtfial4o4ezghoxkxr2fyagvwjl7tch60iyksiantl3dkjw37nvoiszag9otpnd5l2adxw3am6voin1k8splx0e97kdnww58d6hkx3dkht86g6q9q1r7uv89zbrer7mj0alpqlxg4pr2qo89r8f04sx51tghdwstukxx7w7go3atrljzh128m66urqxwfasdudhfihtcxqdfwcl01waboshk7asu',
                email: 'tnd6y9ejuq98y32lqnjlqcnww8wk9p8fewe7le64qyurk0uoqp61mnpr0e55k29yq1eehat41lva7ubkr68ycr88bymzonc6bwrodnljlwjo2bgi5nkxchmw',
                mobile: 'm0urrodxxma7pxr2qk8vxefa5n61hesxxehezmsz846oxotw56cm1p1g8bfc',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'itqwoja2n375vvwb9zz3pocaaf28inllgkie5bn9l519cfbwdk6smxfy5azoj02ozhmlog3007j7hqt83vullu43lekolxvj9osymgdfwlagxwntgm34nh2r',
                password: 'nh4sg29r2ruhxdpydix7ycqj174wis4l6rudx4m17himht2a8ic6p7t8d1yf5ma0hjksmtwsnl7omxyix09441duf0595knwgnfddwp8kzlc963babjzrzqy87b4l1q8ngz3gtlj107g77yim39f9os96hh3n7hsqwa8di2fgyxqotqoqdefb3sxcqmc2wzgbyxib45zmyixlhuuwlfc48dwzva5k3hxgseyvsjxz73k2xktccun633gl5bmkqr',
                rememberToken: 'qt7c1i6ody5w2wb98xku0q4awlogab7aeoldvgunpxw2fkesd4v4yu09h9cf65aimuumwjfgw22w50kuob7k7g2p8dshck61egqvrpzhj9tmydr80u48hua01he61vjtuzfxsmhz1mulsehqgjuqrcod7ecaond0c0vcbeswfb444adatnw11rtz4vjlj9rtqwcq1t2wu6pyh011qcwqeyz0dtv6blh2x0uy64dmnrojmgb8boqs9anyevw2ayh',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: '8fjs7lp9yxxir8b6m11d5joo5m0dty800rv1ltmp9w88rnddcscupxu499rh3ga58suvkqmonc3k585ryze38r3g98krsvr0wjcuwhgc9qukq2u3i9bih7p9f111j8rkg0lyylsm5c6evd6nkyl190hbxqj8ngr4fgpdqthe39sq77hgotd3f5zgjt8ci571jjuymi4ahmb9p6duqf8skmfqcxmbtf4n6cdlpuxn87rkhywjv28w1x88bxdzf8s',
                surname: 'joczi5c8lphah9eql9fm3xg90e79cck0aqc6dlyo0eubmroh9xnz943no194vcqvkzsdinsswbem7rvmqg4m7hq1cgusuxbf304ib5y61ojrxt50h9ko3az7kwoq0ojxatjezxweh0o21yx6469hpvs3k2axwwcgzyq4h646krpbzshkuw6ambvwlf5h3jhizvszl5rcgjhdkcrvywqubv09dpsk714rta9an7gqi7g92eh6we7w0my63ci6diyr',
                avatar: 'r8svrwhv4hijq9vklp06hws66yitj73pkpyrm4yqb72z96bw6tc0ti6bm698zlpxdxz8rbbyizmclemu5nbaygc1kqx5253joihymixo4o1vhyrpr2l4vmmd2t4q6l0d3nxvfrhc2pu29bu9gs1qt5afj00xo7arysy8ple3eqwgxpmd1821dy9nwc0788m6ngsbqdoz3bp88zfa4i0kfruazy79ceimevhix9aps12hug92rib7f7mkz1jdgg3',
                email: 'nk5bmu5t5201ccu75o3vo85013v1hmqtvbgi7n2ztky9a759piex5pz3bl1el3s13z0eczox4s7rlepfiglqejsqp0mv5b2qyergldwqk3ukjblzs7mznr8r',
                mobile: 'yko83ejul3cnjxu5wyw0kglw59d7ep67becypcg1q85inythsvwj4yq5r0py',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'mjhjjvt0g7fhlmts20z2v12lf3akg6gknzt7kvthc5yyjxi3md189ctdx052ef3kxy3c9vgguzr7590myhfwsrpx3fj713rfhjg29n54b1zm8qe1gai73550',
                password: 'ihzvlzmudpxo2f18eezndi1k4di1g3exoubvpmz8zvua04v0pb4n3r0eju1vn47q4nummbiafo4olwng0tyivpddr796n46izuz35ygb9hvc9o4zuryrtcuwwzjzbneasjtzenim33uw4ftt6858k3ag6jak15ueur1mg38cphzxrtsrkouw6x9ka3cklxfvyckp1gjwtt0r16vupsk1oon7tmg2hwndprjnzfzjrjdpr61d43lf61tck8boshj',
                rememberToken: 'gudqe818481yyr7n9pjb1end3c0ved9g6fwjzljjht9h1lwsn34u1mc21byk40ssvxojleb1iz5buu88w6vr8lqmc4190fdwz1vg3a3mmtejfibmn9wuz6ccnswtrnc160tis3l86gs1r102jph6twbqhx6dvwmoskngintk02zef33ckxgpbzaxedgmc114ey723f51dp9xi8bex4eqp2kzz6ud7qcl7hcdho80a9ot5ribt001xx5n7mrrzkq',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'owkgzl9q50hlows7pgu70m37fco8k2e1ro2aao0aorjj32mer8qw4z7081r28orozhc983e0zwynroyd3dzsgcvrjl5luf9emfqt5c8qs51adf9cil6mdloet3lm7plw5qonh9jd2s7pn24lu9dma8mh4yguugra71kpoyctcibl156wgsfgrqpsd2ygpyye03ijh9824k6sh1mb8pm6uepmj119glgas1t639sqpap3ob94p59w92fyuiohw06',
                surname: 'v6gcrcfhgv6y4w2lf4cf4x7qr7e4goixlv1nlhu4on4gwtbk5q54miadja8th5yieara7j6ajhov4bgq5h42jj4nyyl9tb0bx2j3ofufrdf07v9zv2zp5ov1hdf3d0sap0egwuc4mdvqsn0mvuu70cc8jjz7xf7ok4cgfka9e41zquq8sbj7eglh5gb1tqboao5vd89xx52iczj34rnqvktl8fb8t705nq2rp6j3ttr9oh9f9vruik09p7h45uh',
                avatar: 'tmejt9h3ayuqg3kty5dfvy4kr3evh4r73jleqqj7jlvfu1dzt2fgzox0cdl9bnuetfdlgayj3hcjditgvpish6q1xfy75drhc2jzdex7zg3dkqiw0akpklj1cmvui9z2mpglbf8omha3udtqhhgj1gku0ms0umd4qvwxhxgpu2mrejcgqml4tsqwoo2vnpay1og81dv5mspqur9lvzgpt3wthf7l8w1od68ws0yi91e7v5ry8aitqapzwjrtoaoj',
                email: 'wtzwra0hao7hw52ezxn2r1ja99jtsbnd1u0f0pvoblkl0q5yqvg408utuia8hfbblt7w3mizfhv2zois58hhqll18kwtjn4cevqm0l82gacqrm11chh6vqhr',
                mobile: 'a98gbxkwx8imelnbwthitfjslwmulwsh7qio9etjfqvqtj7nxg3jjwmjhy2r',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: '712m6qsvhketh6asnjb811uzcyio32ehmgrggy5o5fzw7awdetp0nssyzzslqe99ydshv5mvxqof7mhfd30n7ymr18txtda6bczd55q1cw9pw43pnsz8qh37',
                password: 'oke8mml9s6996aaqa9edjt739nmtw853b1nqx1dkxdmno4qf6op7vnn3rs9lcsye55r1l8vq0r6qkohndzwsvrrhlw0ialj39f5fws9bhpad0pq9y01bch4m6x7a44l4zh0ctc43cq8g2m8mfdfbfkqq9p6c59dqt1wf6tck4olb88xh5h7jxoncjvf3kn5jjhctjesqmah1k1xdpc3xjgpgwxeh7iahrxwkghlsosyz44xtu971s15x64f2h8n',
                rememberToken: 'iwnyo8p6dn2zjrkj8gx23oo9545kiorotgc7oopl22rynuk19o2nur8qozlczo7nuz9dfvvx756ye9rwx7lzcr7mt50qw2xg7piz6brffcyy46vgpbjrtestod4isb6b8h6rajsuboz06em3tr9yxsv942ae0q7rc1rry76l5y1shgbuhf1r0aozgwvr7rixjcgq77gl0tp1zp92lgizj7n4oea0gazim1g6z42o939eb5z9fabqc7nnp3op3oc',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'qff875c14oabgbqy4tv8xedpzbk3ut7gejtck0jnrz85hmd3eqk7zadl77cy8562hv6fhm1fmv04uhrh0wafxdxre18aqvxdbl84u0e9yrztp1q5c19jhm6d0kkrjjagjsx5cvgc1wc7bsy41vfcbyejfk5yixen31cu8exn6holqf1rg14omsli5ds0fhm1zoxrmcrkqfdq91ra269sbnaxzyoqxvc4qob0j1i5xh4lsauxa5xwoau0g9n5qi7',
                surname: '1gltu46n4j1n5s8zlp25b0y08vw11wp48hvowojo08eazc9822egbwxwd0ph3xbbovzir9m4a6nmlcg5qmm0p0mv3k9rcixzhltutdm0zx3qy3z5crmhjrbi51v5cptf72ak65qkzmpqlmfitl5y2wudxkze22lxqrtnnb37uyu1vousvadwe8vpa4rjva2hax8kxpdydj7a6p5lplo53dtk388msrj7e7l772xk67hi4mw2odz7ab45claruib',
                avatar: '9hczs6xehtb3rj2q0draz5ik4rhnwrb4sub0mb7tc9t6kwhmgm2c7qfa5z423vxqgfdzq5qah7i5rolzhxm4cyl78q6soanqrurskk9t3qa5yl6lyo5uat1h2d4hqw53sfi3o0qztu5itmqn889yxzfocq78frjkvq0ujru6my7q3r0ifn75hj43x0g5ynup44phsrsvmz60jo658buq6g990v4kn6nfpnoyxsm6nigtgobf9ncw63b4v1z9kbg',
                email: 'dlpcmnhdewbugnqyn3dlrvdrzebujugobjsula9hf1o3oeryqbwzpr2f4tdqi8jmacqzsbl0smdq8w17g1yxrvn24c75qeeeg7z7qs3iw1rg0ro98esqw9zxm',
                mobile: 'y8v2p231p6c5iarust1l9awv6n1saz28b7jifhjsioplo19117zeb5e8ywya',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'igd60bsq3x9j448v9vurcijv34f7m0mngc9z3v8mefr966hzpumxziw3nlmz5bveicbqzh3sfpiick7m4kczfi7vfbs4nasvd81c3cjknjqhy06vasq567jk',
                password: 'ttvhkb2ionhqsigu5r8fn6gs1u588fgjeihv550xkfodjmqzfs52wj81ft0f2biq99b95uko5t9ush7qt9c2wlc3bmzh9aafb72w99b6ieytnu3dki2ql1icncc7secptt7qkzlvmnc6iz9qgrrx312mn3nscyq36j1upvlaua4239wd4yspiahb14pus4s8gkjgdqpjglww9bi55kca1zn3vvg6m48o75h8vkr0o911k9o7rbcuqo5vvwp10um',
                rememberToken: 'bti4olssczara74t3a8berus1oy427mphlvnun569mfod2jtt9obmc82zqa82jcttiu9z5amjji6vcajulmpu8qri215louc94haj1tiaywp19kjgenaw8m86s98kqeabvqn4tek0lag1yoif3cvhqiswgp0zttku8d8cxmkoixd1t2ypjvfh8htuhlqme2995aepusams4ymfv0qkixikpjw602qp7mv7kxaajy5yefmc64q19ppmw9swy8351',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'iyy1sw2h0wmm7ikd6vyb5nxgbfkm9vtdpp8wylbzdha078o7e0knpob40biwbq4gwkc98cg48dyp6003wdhnet1gt4r1t8qdi7szsjhb4z477td5q3gxjbj9cbn9xalrlntgwq83nvwgnvjsifiyrvf1am6fw709wrht88ppfq7p3sc5fymbmxuqtmnbwtenqrnfeqdyc7qzl8nhetg14zuczkhf0pdsuhkzhfrelz6xclgkajhx1k8p6aesgn2',
                surname: 'rrunqb943na6cbrzn8c9r3bmme88o9cdy0qoe0px5h3ds0vddnzhg8h9jovh1kuswso4h7ygz8n87d2qtnkj3qwugy4sskkfvnyqhn0rfg8wcwi2wkz97pjoafwlqaehkqtfvvajrihx0cc6w44m9nsbky6yt0g2w3g79d7b0rl1v34ickii5sd7jcpvwxo61dusad650c0b04mk8na8eui0cquhao8sogeuxms51mmbzbt6zw06gjcq310v0ml',
                avatar: 'py9lrnfsmsgtolk5hcopq00nu8vsx0fufpfes05k7qe1at0huy8rirqycgsgh6y2evy3aneo6zntkfb52yo70017ai5nn4hy5ul4vjlos6mlrf9ygs047yip0xim482l0urx07lleqc9gvkrnd3nd0qq5wi2g44d7t8dhxjej0f3i4iv9x4krrgmycazbs6zm1u9j7y4z3l4ikcmfu2sjwnu4cadeeiml848amsasrnuyp972w1diesqx180pgo',
                email: '2uvda01x1luxii5ywxgfjzmh408v78dmumb05iro0ddtw6m44li1deogldzy2d1cdgpivxuh39f1x6pm3yaig6wrbcrbprgbyv5t8c0r7vpicgy93aynpiop',
                mobile: '1osqvicywms65yw524o82w4seinlfy3re728l541qyzwgnesbj41wlz8a2tgy',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: '0xecz0cr666bgwe3541ewpq3itjnpfirok1wnhjsz0tcbic9g9qyhqu04czmbimoztj1wdv3s9zus9g58sf483ze962tj68tbdvbqpha0obafc44m9w3ajg6',
                password: '3xxgs998pekkg8fkyjq05kp3enm2c0e2uplskxwuy70og4e9vrkndgta33ugm7jmwbsnt47l9atwfhzf8kd0upvb6pcpcoip0sfj3ws8xdlca416hvkz3wfnrvuu8mdq0m1vxzqypx6zwk5n2x101wo1qkm0z89ee453ge2205pkb91k5k8pjp8pd4wzkmxai7arf6btlcn20cu75pk94jrip3w83hphcesrhw6mi8sofz7ifnunyjkwotwmzvs',
                rememberToken: 'cqmnb0wzxzt9v7fk9nval3f8av291fz4oh578fgqpwd2o090rm0r7luax0qhcdajdopqbnobrr8sb071tdzzatjemuv4gt08zrnb8qc9uu3it6iyrmre08wrklar0claxcx8ho4bpfogxw9das7vllx9cuz9fm4cc21aambqvh8cru9v4fxrsdtqmbutthsngz9efiw799sg988174a11gh7yysvs0noscq7f7jqo2ezks4nyvce49y2woxrnpj',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'vmtidj2e9rlvtc4de3zg8yebdsbnvqws7xr2rcihmrnimunj2ncq5gaszpxxy528i8wrnt85o68sqrwd626gtg0liwq84keu2ahkb4bkyyjnnw958cz92fyo418tpuaidquhc643p6cifq44s8a62eoyeyn6otmldf4c8yy0sr2h0nx86pzev0l4cuq6g8h26m15x62vbhv3wkvg4x4i94suzn5vrvjjo9x89pb5c76hrd4bjp4blpjxgf6l10t',
                surname: 'tklvdj05f05fnxxpjbd9lm4pjodfvctfuwf14o1wni8qyxbblmcwde1ffdf2zzliamtnpu2aneg4b9mbh1ry08a05t28nbqymdee06ay3f5846s5560zvbegqdjzcgi8cv88gs9h84kfzm67v7ubb21w2xmu0k52tlc8jqgkfsbbvknfwtok54qm16ttz9m6dh1rhrcr8vlc6ipq44a75zuwvjwnjn0nnd9w0pb2phgsqievirvk6ql4fw7zt2u',
                avatar: '9xn2sj4gp7x19r42hjgtwzgxmbu149l5thr857fskpmqxgow9uiok2yqrkxw6p37zcas5xx6mbxyoqcaj4pt1s3c1mvupd26a34q9v92y8qskgque8ebs4qa8yy9jrn4zg75j0bmzmegtxexdhn9ctggvvf708fkowo336igl0s3v4ou092dxyout4b7tw3lnksulcf5b4wrq129vrwke31r8oghr98uexknx5nogmvtbocgekfsxqze0jt4mye',
                email: 'zcdmwsusartl62xhjdd90l0r7k4we59ehjd3j4wl0ssyj4ce2zbkyo1db4ri1t6czhgr4urcdo08dhet7flylbvfok2jtkpu2nt6wesasxk67a054abon9gp',
                mobile: 'cdkzgoeu5fm1ebfhrgl82bws1y8wjc7a5osq0303vph5ucoma8ga1y9wktzf',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'rvjfh6z5djxfdod5xqqg3vt3r7deozxbqfqs3ue519n1wz2mkomp5ny6tun6ai6udipq1mm5xhgtfzl4yn1b59tx2te83phwjxip16jus4t5oadfvi55zwsml',
                password: '5yb0qiusag9zo8ivwe5plr61r6w58bsbtp9atfqmrvku6mkmctcps8jodx043hjnw85nzckq106ef7d2kd1am056toxwjkhk9lfuri2qumuh51vswfvfuaqhfmp4ze1pweq4z8q7tqt9ina6sr63nri9txgkvh6swrw9ymc42imxxt41xzykt1tdyjlt79w2bs0sa80e59uiqlu4zsftj17hw6xoowchb4v3hg6ps5qncxeqibw8kx30i1mcxi9',
                rememberToken: '5fr8zn1hmtydjiiqniq28vtlgnnjug7rkfp0k7lg32c70tt0rsibithzti5f5it0uuf25nnbrp51yeqozoj94u1bzre1fg3l9728urvvyb4ricxvjmpod45juc1f7pjbzuwl2uvo9kag8tusncvv3o2n592801wdodti9q7vixq2afg5wt86g4nj9lq1u9qxngccq8nwfapkdor1uuik8l06x34ab17d0nrcbrshjkw5bij900n9obgmlwrttr2',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'c5km381ic0un8tg7et9jqve3uosb88fl55j725l8xt0dhuvemedxmf6gbmhjalbwra0fzjrd4hmj2qnsp0bbvhrqsnszhywx15l0daorls7jra8dwbcmc0ikp6brq5ptfqwft6279xk34mqi00qah9d5ig7qpbj7jd26lfcxgu5jc5t36mwq4wya1z5ou7usguqeva2q5z1z5m3uf5jqxi02uz0c1vi2x94ub54zu55d5h5xnahwhkilelf3ywb',
                surname: 'jd13yj9t47h2imjw3kdvu9r1hr4fw7i1ccr8xlwn3fvz8rbllsl79m2a07jagjrdk2xg4e7ttenezldnfj5wq6j87uueagl4mdbwo3a3y7pq7liknxbe3h9khbr5c2c8d7u8lcompe04jf2s5ysihg5i41h7z9spgru0omvd0heax6ptl7wwu0x3q70nwkak6p5subfi92xqhisz47tnoz9jdyhycq1ml5yxp462izni1fa2c8k3b95ftnadmgp',
                avatar: 'qz5i28uj5ec273jscvsksly1kvrl9kba1a2syft2a86gxrpnfqjrlr2tiu9bdur8b3ffhk54cptlowm49zss23d2ic6y6chf4v9y5ub390vpe97ab8u139yx4tsupgh5im9tpqpsc5whs4caf2eb1n3b95b79khgnjmvb3166ckl888czpy94k3ck9mx7memi6j8nyuqnb2ndxcdp7x5e6cv08e643e0vgfio0y52n6s5ebj0stqeu0970wq4ee',
                email: '63b7y1rjsvb0hsdwx0atjzfpjfuj56smr3emk09wyc20agwmvr90646mabbbvxxd7accunwegrbacmgbxdlseeoblg8lowqmj52wer6li5od0hb6i1jrijb3',
                mobile: 'dhoj1n9ed7k4d3nm6nktyn8h2wiots5tmlm181uwf2iudyelqi87ezarollr',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'x9xng4f6zgaeij6eo3t1czzqmod1zd2998cxm9yne20l2jhlfom6jpfajtt0xsdco1j2q0pr6lf5tbdq091qmvuy6c4apzpoplqrglwc9t2c0bbygkf08zoc',
                password: 'ci6ik0ic0u9jlkgpzs20i5a396119c56697ws4wrfdplz175ai2rcwv1b307au5q20qcqw1z2u481em31rkkdl02e3cm01zag9l61nuwel17ey03eyfkd0nrp74e2r9c410fjmo9pw3z7fa209lpt6ifuevyn1rscqf2e0as7f07zezrc492jv4k9urpd3ovpnj4izbvf2z9e297wljn385rp1h0u5wlg431rvbq3qjpmw6bqh1gjgqeq4n1urlw',
                rememberToken: 'ah7g10b9ocormrx6ytuu8t0w9butojsbnchr1bxc1h0c1yn8iujac2icc9jsf52wrg2r8q1f98b9dfxn43drwe32c8uj7jidi2pxckuim15skh1zzklfa36t6uup5mtv701760m7vh533fccbva4umdopbfzzp7dp6dvg7pjp9a9wzeif6mjioivezsfaciwpufc2trh2sntg9xorg1cbv0jn6xccjv57jhuhmxiuko5n4ugsxnwcu02c35pa7r',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 've84x7qx7dlbxyhwujvqe8xu7t8fsd49rlip5zutv2c5ghp4nl5t4z75wpxgqplt3jcvadzj7f9bmvu7kwlngh45mmdwlo36bsv4xsy4ux9mbk4mx7od6jtum2scn2qzwozgz0yw5o45xubh6mhzhyxrwj0xkoa8nt0g5r6jm85jfnbjlt2tw7vy3czjut804560l91nkx68mlx0lwrutmhoee4wqjs3r6mcxocmie1b8lbvxfigkzujb9rebsk',
                surname: '0rsiv5hfp53hlkpmiq8a1tu2mztdsvqwjtxz2gwbi51jb2gplkvmzd9cvtsj1dzu6x5x8em5jafwkotr76ddbivhy0ns38oepv9yomkv7uhdusahgd9fjmh4r5mo11jrvbwfmxkziz57a14kyazvz2cnhsunkjwr0dgyurvccmbtgy5juahu7n9dc8rxfeudwrtxns7drlwbe0r35teoc8koumw4d80igkqmk3l1b5zw6m70dcvqi19c5bkh12g',
                avatar: 'lgig24ne70phh5w1v8tydymibl737b4ernysl00s0wo3wi6h3vwrhblwnj5yt2jaaidzjdqyh0e2u29p4urort9i224r4fh7gid3b2qvg0kxf97ewaaom406ehztontlbvwsm03oh4docn29nsh6otjkoq1pl9v8rqnmyt3j3xd6dk250utukowt8k8yvmiivjxm1l9f1ipcpedbc7vseodb555iinptzdooksvj57u7r6ol2kbnyuezmin77il',
                email: 'yyhz5dstjhzeybo3o1yzl8i72fm5p4xa9x67zc2ql0sy3bn9xtc02rxpkg5ve0npw5puaz0d3zj0xzprwfgqg65il29rurpotyv1smkiq4mewkyo5sdwmp5d',
                mobile: '54bfae7dmbc8udsf2v654waedqemzzxwonjixnph4rqxdoa8k2yeyarzh6hz',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'vloblozt3rpg065y4tw7mptz5c4c47h2gg2x46bopmwfv2hr7m24uk6kdtwj22ah7qn94oqor8by5e8kwzr7cjqmx99w96ro5gb40oflg7vugt5d4jj7rmb7',
                password: 'rpomrg27tvm0d5nma3jkpaa7jlimdncazg8xjp6ha9oa73hz1jp5euoa62ewzt78huid1xucanbrokanx1bphbj1qxil44o4ywt7tu7u77tju74ebj4es0bawxecisgbmh4zpblb6dz0hjwj6tjco1r8y81kq3857jk76399lhidg601tgtjpa9me5qnymxzb8j555mnlu7bxnjfixlw0wlevyr15b02689pb0fnuxnv9u8zzpasellf9msurpf',
                rememberToken: 'd7bhpag9pu4le9aeut4okvrd16uitk76futcz5j8aao34eh42afvq34qpv3fyw2y2c8qwkq863qxz6ogt9nkn2rnov1fyguhxoz38vy54gqwzo66ourvcxbvw6uw9u90zxbyc3h7ljqpsn3lkt92e0fjhu61y9d8jhya8kf19yzfup0nle1b274m9s3ejhdv0mmhycp0senrxot6q1etu8tk9pi31s6iku1m9yz3hsp59cfk10ds0g189zfnnj3f',
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
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'ii5o9pb8r2795zwd8q6c1un1skll761rsqwucb566tzm0jwjnuqqknd375x8fbq3au2gk74havpthzuwnvq4l6iequuviked0t0zl4yrzemj0y0aqqajtc79vv2s6pyk04s053m9mgtcsthqt5mg8q9npnzf668zswfmbxxyn3m9brsdf0kejrh6wlrp0niopwwcvog3m1rajq0qkaxgaffooibzse25ux1twgxw50pgentyl9reiqhmhgjx2fr',
                surname: 'yru6necrnoacpe0rwzp4sijdhppbaf4os8poqh708oi2haw7cckowixa4shyrvd7yb9fkesa90sdlrz2h9jm8j9wzf8zzumujsqavdgnb6njxsxc0qmgtvw6eymc1uhv3z5ghuksb7vtm47obi62np0k0ch887co47gk80fk6thdjmo9jpb5230ifwvbvqp6ynljwu8td1yxg06kqzesgdfg8xslfezlvzeuopepjd4ev9kevgantjqc5kf78sy',
                avatar: 'y6tf6due4rxkb4qw670yk12rfdr1zhw6m5cle6x8mctg7duw67xa436xdxbtehqdpo5i3eva86jsfah6aiix9t4xyrim6fkix6tjzd274mbt8a9g2pm8y4t8ppguh943ecd3fuv4pcw1e5qdlt5wg6rve402bp605b00mwmzilvduxw2epfxbnbrae2n1084u26ia77s13ay43gzy0542r11xshibs9z43l9d7dxc7cjas2ry42xt679t6cgb3n',
                email: '4oameu0vjcgn2d8uoq81a2dj4q7709pi5zxlwj28xxehxpqv25jsxn9n4bzcel692lt4qoblv8w1miajc6cmx006lx43j0klrf30vf6f5zd5f5pgsjnptnw9',
                mobile: '1zfya20mruaaoqy5ay7aobndbgnrj4r23t2ephcaa3u7rsut8gsvi0rvsg48',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: 'd6nnykeokqy17p46jku3albip2tn961bpk8pzgat4mx5n23un1e67n5w10qaiyvmekbmqlq0jzr5pxg9w53cosku20lnupfek3q2kq3f47rh57bw4nr2qy1i',
                password: 'g63ak80hwg21mpncdwtqnth0al2bwq3vxszkpbd9zbj9hrymm69q2db7fig8ka3g25w49a3zgz9qths8zw6oq454snfiibr8nnttrglaas7ufxng060anm00rksw8trocywj5b9yc4p8p23u4kbonfps7ot8osl2uw0wyo7berno7twd5o373xgb6tsys2jdakbhn3f4u01q4jmwiqzpixm6b7g3nwvtp2zqphy6ox91nbtlv440k0yhupsilf9',
                rememberToken: 'j9xhpfl9ofeml1l1lv4ue8wkhmtiifk7m2ijez2avs7gqyuwgzo4snh5zwxu1rfudhnqldhrcj2k1cr4cdnn0t98zo3t9peziukml89s9whw1bcb43y9avmr76q064vshcfsx71muao73vaduoxdts18qmmvvafptmjbyudkkpi502hux4km0wtbpq619v6ywbfjf6kwib2tstnzrsiojejx87hyq3ce5cyvqhlyct47ncxitct9ubqf7kjxmow',
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
                        id: 'daa3ff3b-cb45-44bc-9493-7fd1d46d4802'
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
                        id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4a5ae6bb-e625-4f61-bb4e-5425f68de35a'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/d5160445-145d-4a21-afba-1b07df18147b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/4a5ae6bb-e625-4f61-bb4e-5425f68de35a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4a5ae6bb-e625-4f61-bb4e-5425f68de35a'));
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
                
                id: 'e3b53b7d-8328-4ade-8bbe-6af8352a36c8',
                accountId: '97a4c7b2-feb3-475b-af32-3515eeadd46f',
                name: '61jyosdw52xxix3xmwzelmymc2gn7vzmkbh3tobcptj2gzh9pkadx9b5qzq77kotl61unovxj1ynv79t6chr6lbeo1ak9jagljntzvu8oj4fw7uv3x4ikjyicuqlxr8p0i0dbirdz7ws2192s0dpv2k5kzhtd9lwnyd45wj57k950xfzocr44edg6wowxvq4uy9mb72ko7w3759hejgjwcw3nnj9eeiy1q1brzsgd2nusq8da6518dd65u7hlnt',
                surname: '91a1k3wasmo78q06htck87b3jt2faysjozwqcjob537uz3bbomoexzjndd9tqwvoya9bvll3kzt4gu4xbysex6h8mqup8cvphbkgrm937vwrynix17gbgjpzjge0mmjn0lztwv03xj9mvuvdn1o57kie6l3r0ers0a47fa4x0pbcze8710vfx280xoqrfgxw632hu3gwilqw5tswcn2lzlun2s5jfjjtjba56a8xrrpdsa0fwy6vircvp9x6h1z',
                avatar: '81ba1g3mbpvizs8jctu2qs9dwf1vsmsua28qm9lrubsp9ur72myr1dbsgb8jr5infn6opj9mr4dsc5neaiadoq1gfj9cfdluln0pgdn9vovujp0ka1o1i9bx98aqg6qfrrts4ty9z1t9t8yidclth5ux0zuk6ue3aw1yhw486lap4y0bz6wppxd6gkpike6ekgv4jo79hv0vjuz5pswile8j00n1abfgyrpkfhkujmiizbpwgr1s02aqu1h8mup',
                email: '7ovegtjz1l511k8u5icrr56voqjgaplb2hlrbzxcexlf082npwt0vtxoe8v6jtnf4wqp3kak78dueoxmrjzbd3fokr2kaa9r7clj9bnorj0g2ai768os96zk',
                mobile: 'xbnwxfwidl2f75jy0ko3ebqmr75e9kx9a9zmqter6ciyxdklugm3zoy2vafu',
                langId: 'ed0911ac-f623-40a6-a496-db3f417e65f4',
                username: '02wotxociasu8fy1skpdb6ekks0192rzzbb7y8unflexehg39hw0flf9tjbsavhp9tlknscc2ps8ioox7gjeivdwh0d4dwql64kqzhoie70ky1i5gy2ce66x',
                password: 'ltragfq8io1ne6gyqbk5ysj24nurlf7pt8dm1eh9lonk6sai0nhkht4a4f1pwp9gwv8b1anmvcpfexwpp3kbrbxldbqn2mirm348vvwbs82h7gvc9dfmlw3u0te3narelm4akflqdk86i4ivd00t4gbeyd7eue19v7zq5fsa07jruv81qf0fz2d7m08tf3s00h0rugb76uynd1ak2ztd7vj6su47oinlauiwvpzs2m7e1g8y16v36onmd42wakl',
                rememberToken: 'tw3rjrgmnwy3848q1at1y385e02z9kpyk7ooid0024ouo7c6rh0rhik47qxctlxps3s4kvpnq07kswglal6xrrstajcjstio8ubt5yi5tbeazf1em7zz8daghyzq4omacbeme16hkfw3crwbn63yne3dbpagea50dknso6p9kysxdfbyal7w3dkt6ysh0h50jnon77r1x2esu25bzwhm94siofgad03y5b6h0qxgc438ngmi5b97jgn9jy3zqd7',
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
                
                id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                name: 'jp15qpz177ysybot39ylztq814siuvrt4890lxkt1nqvdl68d1j63644qej4jppolqju4u69hwzcnn1rab9fhpvu88i8wwrjgvu87owjkj0tiucyv3inx4wush6n3whinni72czbx7lyjycsuzqreforp6jv7thaih4t3r0wn9sjykykz4kbsxdrww4vef40ntdduxhbnyvyvbjvhlpzbuqfhm6xlday04df3odsdctv0pq38jw1fwup6vf21dq',
                surname: 'evegpn93jom6cvkq7pmv252wua9kkk58yullqhche2s897dxys38va7uhu0048ej7inxmnbzwulqo66zmq65rgy0u7qawvx2unziz1l8k3ts1g6dtz26n7e0evnf4v3udwmqqablnrhz7t2k5kqokfk9dqrvds2lwhhjmhj6qmeehomru5s72vsjq0oa1f5npdjw68pgmr8spqudwcnd67eht6ynap3wftuch2t9az2zgqk9gxwd7twyqz58yzl',
                avatar: 'o6lojr6bt28pk4bf4nv5str9uvyt6xlyfjl14vgpd7f6pvmv5ck8714sc48w0qfmg61spog3ninxh07q0ktlotcw28n7wn0zd3i1bl6hrhg43p3nabg0dpy1iw923lzh1vsp9jsg6ay95c4qmv3mf4zmyuyud2yxzm4crq7ozb07exnx2r4bk1x89d47pg91nrg3vdoqmuc8r2o6qay17cc000h0da5vus3aniwr2mlieedvbooinu8ml3zz1b4',
                email: 'ea5dmxymneytasjyc84mw932a0jd6qeso1gj40o66ni1a9owpwd24fff6nhdv02ba0vkm9wdiqhv7mt56c0as27y7e9u4pnw9renhcdkggz8kmigndft1ubj',
                mobile: 'el85jg3jtse91std3elacquic0rv2qonti7kr3xg82atfrej9sj0qrznd5bl',
                langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                username: '4e7ggvbsp1ecnr8z8dmvat29i755qkexi6cirofqcoy4elpbtyq3997y2159xphihre6qvmg7utxpf68www9mjiyms2kb5qejoppnxs88ss4x3x7r4ioy1ms',
                password: '9w1lo8hbxmxxxzutbdgpm9dumgfr408q8ukaj8erd7nrh64vvd1sof0cpnagm7ll0rqrrgjff4al47eev3k161cmcpzop5p5dctb30ju4e447snt2ztbfx9gv2p46rjcfgcgj63hrhetp23xncu3krboqs7pxelcek5f2ni1x9iwvskjz0g2ucxybp3ayj8st44ul15f1iliw67n57c3g29tlki830hyk3etyen1ykh0y91yp7p43r85wwa3olt',
                rememberToken: 'b4k6phdj3ixp949cm37jd5x6ras3a7eeh6vbiebz9u6amfy6di4abeenzwusvykawcf8jf223co1ly5jrm3tbxpxfznaww7zjd2t634m1lobncstc9nsn4i60dwxdef78nhh80ulxp1wn50d3r7mkzc1ubdryqsn7jtdp4aa8nz1rnnf57fhonv35h8za9uncmfmg2exwix9oad6oyubaccdb08n28rn8jyk1yak5lt6j4aco5y4dettuem5jzy',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4a5ae6bb-e625-4f61-bb4e-5425f68de35a'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/54f1921f-3565-44d7-8573-9258b6906f1c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/4a5ae6bb-e625-4f61-bb4e-5425f68de35a')
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
                            email
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
                            email
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
                        id: '7a41038d-8f10-431c-aadf-fc50e161389e',
                        accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                        name: 'x1nabx5uup65vn6hmzhndjgte662zz99cnikktuoi7uoq7m3mpr8ongpe031i5jys66w477qneb7u4h0z3iiosd352c5d8b4zy5xx5u1qrqije0kpbeivaras8oe6oghc03uldhy9hc1qao59ashee63acgufebx6vahs4yutuhv77na1c62lzlyeakfj84xv95cbojxqfm6tei07oqifvht6ydojwa7lue6asyzpiqlgrpl5xbjb9binkkxb85',
                        surname: 'gcvponirrq74grx6jh3aw824pt3tpfz5gn0ejeu7wnr4cy7akoyx1bfnzg9wlyrevdsew8zp980td1jh7bog1fjzsien8d0uvhiv3b9kpeqb0b1jcucfpr40mqd79v7vb69kg3dekmx1ugn8md4y6jqcvggbu6qh1rgs7scvgarrxnh5ibi1ybbgw5pacyb37k6yrl2mbit0f47rupaj2mue4fuwcsy8dgllffh6guhobyfa32uyn5k3kobrx51',
                        avatar: 'yzrf1a66a1t1hvnd88yfivq1xk6uytbwgwp2yv0gt6fxiufkcr9tnbs1jh3rutlegh4ucakfvcbrivtw5dh1hk1bxhl3upccabsg5kt8mb41ynbx26ounpeqnbcs57xaaqf6n6iignxae26upticigv0kgaibn1p5mf930iv4vmpck454mtwbpnhqjzjyes1g6oosdq9n2bd1sxuxm141a9tr82va7ebe9cbpil4ezy0mfic9qkx0g9ivxb6q5a',
                        email: '5nw2fw6n7xjqan0j9064fhw44pq9qvgo4qjipi18asqwtrxds8ihmz2xefdmjm2wn76l13vi99lxrljd8ns5el4ow7b09lmpxtphd3i0woijj5yw08rcij3l',
                        mobile: 'u22vhq22wpc462cdosvf8bcoqk4q925fx2g3gtoxq0cd041vti3kgsqw753h',
                        langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                        username: '9iw91p5yjbn4ra1az1bhxqyqjvyf79wugz8uuxa9d6oxze1dxxiylvrccsw8awiwx540jnkowjv9yhoofqg7kbz22mambm74ox2uy3knlyd3gy4lpi27i81d',
                        password: '8uuagsok9lwnfos0oesmn30ftlj9ds0jsly8bf45gerf7ai485ehncyipmt3um5srdae3xim2yiy3qgi0eypsjqxwyna9pxc4860unwiznr1fvwzdrq5rhcmsxdey237z82ppabzz2dlt1d9m0m9m211n36cc6m8ag9y5tpw8whsas00813knikbgd91jrhzbyj2cvp8voqysoec7kjc51s03i6hxve1ku5cadgyaquyx3ogai72izs1iupb1p0',
                        rememberToken: 'elt0cqget9ir0wk522sg19tg1xr8qsj5p9g4xv114qx8bxnmh1kwlskm53ivlspifxkk76ay5udr0a9i79gy8fdiytqmw98hiljemxjtoh4irvw5nk0ogpnkd6e3ufgk9ej94k42lgq5ajn8fe37tuo90ryx8sny193xk83ow0x9ap7zri2hgg12mnsaeuf85rlw72wc0sqs26xj0m26nf4bxvzo7en4mhs17v4gl4t667p3im1tqn5cijikaur',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '7a41038d-8f10-431c-aadf-fc50e161389e');
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
                            email
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
                            id: '4494c9ea-d393-41dd-afac-96c5e2c7fe53'
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
                            email
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
                            id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('4a5ae6bb-e625-4f61-bb4e-5425f68de35a');
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
                            email
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
                    id: 'a4203e26-fe32-4275-b194-507350b71f92'
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
                            email
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
                    id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('4a5ae6bb-e625-4f61-bb4e-5425f68de35a');
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
                            email
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
                            email
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
                        
                        id: '89ee9070-0491-4fff-984a-08661b849f85',
                        accountId: '1eb46e2d-bec3-4c6b-95a8-fccbbd8c143a',
                        name: 'f348dw4kv0zh2u3cs2wkaazw4obi2mk9qoql39cv53glqj0ewmium0c7glrwlnw8czhvhd0o7yb45rfhgpoadqxi1i9w7msoj31rd1z8y0i9vjtvt7o9j963i4b0ngc84e6oj9owmuav780b5o55z9s4467r82uee7oy1ye0s5u05a1rbdrjxhu3ttmeo8ogipyab8p79x3gsvmugph0uykbrrs5saerz2t8j70s5bflcdmxyg744iygif4h8uz',
                        surname: '5md0zk94yiuyu7drf9uul47tacghw2heafo07iiqv8im4o4eybrhpytre2vxx78h34jcdab1d1thtfne4w3fzq0k275lntkfwzx8a63d5pjeyy5n1ca90i4rva7azaz5ww811lacjo6crwrmurfbg6hqhlqd6jzi4oia3zghcfl2x7dv2px9w7exdmychts9fpmpumqsymdkfiaan9anlrdqdmqvpg7l5ulwkvr6p27dv6z3r28fjbu8086nepg',
                        avatar: '9r5d59ns8m18fj0c2g9bj9146pnmqp9ddmypj2n27sraifq95cg1u1f0tjjkc4fkmg9wvdawkw7zu9fqgj0pm39kzokb4jgwd41985dma822f8b758ecz6yl2eg2l71kt22dfvgjx91wa5f9nj7gbnxq25n8x9naia50s8ts78d2gyhb1rthiari9c1jmdcwbftywjt8gx0df484nm0vvgrc1chvj8il0xb8ezetn4lw5hf5szqve2zk5262ozl',
                        email: '2hl61rdzdwm3swtqjk4tezw8nhjhcjwdk04fnj0vo5osggx7qev9s0qd9b9x3qop02chn3kby5iv1gtf2b4pnp8auai96bshk0gbipqj2lsi89yns7pt3fj2',
                        mobile: 'urpveghf0tfq034yh3y0c42f7w5sp5xhgoq5qxnyetcg73p781rjmtnrqwwt',
                        langId: '795aebf4-52e2-4f90-abb5-e30c95c8a553',
                        username: '8fv3apxbtho8k8jy4y3zaw5pmcxt1zg0qjrmya3yj618jmxmqxf3oddf5zq2pd23ti2teqtstc2xf79b7enr0o5dg12ocm8sh3i8x67rsfiy5dvkwtc7x1pv',
                        password: 'fkz7ljzs1nybudnnnplfwvawubirbnpfup7d4gip8f83vcsoamtp4zf720ds0rujsscd7x33grxxi66j86aoy3l3fbh5pgpxje8s284w93d4oimzv1xgmzy7bwkg4j3rx37asq0jtxpd6k4dvd81obofv172fc9kxeo1y2st8gzpq06c6e6936ohrq1cm2mdxg2k8r4aw81dlzpcew8630ybqvxkw2nn71snfdckme394ap3fbk2jhn988xbm08',
                        rememberToken: 'p256vu8atwdiaka3mo61cdeijijmev66d8oqv1wurqbshuunjkwleja2y46sjknan05iw1pcmp826uawrcy3yi19cp96pdzc0jfezifj4q631bd8ceb6zaquwkib43cha0cr5xcte9j6armjcsm05tvigbzdiiwjkveymiappauuwnukzpemq0hw6hxqb8m020ay420aarqsxzsowe0xopdq9a7tuhcy2afrvjsq1sbighifx3nchlrpij880gk',
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
                            email
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
                        
                        id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a',
                        accountId: '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755',
                        name: 'p6hw4p5q33fwdw9gekn0j1tm1c3sb4z8m2u3t5ynghlgtq3w8g8a95bk0azlbpb9bc13vdswi9rr4fwmgwj9nu5p66oc597cr0sbmj09oicf3629f01x259fs9coz14bqump2r2myx0bijax9awxefcjleqda5baln9drbalqroh2g5j6sbtvc7xfzmeec0ma8xomyamyy9qhvunhmv4mniwsygm3nj0xajuxnavxgp4ntyme6f65ixwd22uj5z',
                        surname: 't3pozntam8qsagzwe1ywdbhkwxjaxqfos55ue25q4ulb5pxje9ggka4we3g9iaw2m46ayfipf9q8khmlhijyymk7mdbe85gomn6qn50dte1la8ov7c8k31xl6cnlkmrvuekij7gz577yiwsk8zvujgi1zz6ubnzul0em1ant7cwpu0ets4gowlk3czmr1lh5k99pbm835lu20mhgl7llm94f2nf4dpl11vjhy5f9tbrjlq1i452v7k8btif7zst',
                        avatar: '7ooofwbiprktexcuhyn0s72q41z7zu1yx77ocbf8ko594u8q3djzfyvevwwui4w5ddywue7qcf6szo84jj9qr971eeju1hgfth6etn1o927lmtiqgo8k8xubwbixgibbamijjb5alxuwh4qog3a1yri0x7lq17jxw2w1bcx9u7hwjnziyykej6pwirzuzjc92rjs098g4xoxvz1w4oh7ysu3p7hxxdqgget0b3eorihs9rvwdmyyss5257kgor7',
                        email: 'wke9omw9myb4ad2md0sp4occm2qdwn30tny0qtfwe54godu9j6dwbxw4wg0cqewg8yl1x00s7r1w69wmt8fwre0dsgqytldrwjvgnyno7hztke3v2lmzx0bm',
                        mobile: '1fekrhdc5ufrbjq9z24inq7tokukdtyzlmyco42ni4son0qr0sfggjq7mq60',
                        langId: 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b',
                        username: '7473ccr45gn6wxptccfn8t0h43b3ga0b2cimsy96wpsv5pt3rx0ocafftimx5imnua3km1l430x4yaz8sidlmh7gk4qfrps06z5pt0pp78twmsvt3v854xvn',
                        password: '4svjjfsf027877uvlhmnamyfa8kmza0m5x3shhk3egje1d5cpgxt8wd1y3fwg3nh8hewipe8rq1sgs53xbs3gv9p8uc08femk47ngksnbnqge9lvnsbja6vnjaqne9jjdmmc84vsedmo03seo9f8g6u97jb87ky6xszbu5kzq1w6gzpwwbeahw2orfrnwfj5i8e6enqebghiyo3fo6vo9pcnnnkrhqnnhrolxzbvpnzaywejua3ahjo6u25xve6',
                        rememberToken: 'hxc9s4txgxbxfxanxg4jsvcgdzf4g7ih3tkq62opucoh74vnv4o88y8rjbu9oi36c4drz74mpn3582yz7xqsgf20me49q8nehyudbhk5aiy2088ctkpajfsd37j422j5wqt39zk9i9zcsrlybsbx56knc0hn0iy5zxwbqcioei83epxu5vf2cadqabfl0mwld1ib6wtts8hnrddqzmgxqhyouhhrbahal6h62fofo8ze2l6955inbod5ouop2i9',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('4a5ae6bb-e625-4f61-bb4e-5425f68de35a');
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
                            email
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
                    id: 'be15d954-04ea-49fc-bc66-6626057d29d1'
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
                            email
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
                    id: '4a5ae6bb-e625-4f61-bb4e-5425f68de35a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('4a5ae6bb-e625-4f61-bb4e-5425f68de35a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});