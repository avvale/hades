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
                grantType: 'CLIENT_CREDENTIALS',
                name: 'eoknqegouizvntcyi09d07gyzazapuiel4o5jsnc2a0wcbkr1cuyjtxwevisqj9lxqjdzeav322897li90hb9hb23x8g5d6jabm83gprvyu6a6ar8ti8uv5cb6g7xuyq29x2iihu53qjltc37v5y96sw5ahpy5xi4ng168i0qwdoaowqjuo4fewykdjes36vkxopqu29h9ik0kg915crn1221jnnw5a7ilfy3kwtmtfqdllzidqe0fd8ega65ep',
                secret: '6kgdu9j0awnmfpsqbg17euikibsl06oiriuuz1di3xnfvw65d07pju7jomo6s3k7pkr2zzhey9xvaio3wszyxhy2ye',
                authUrl: 'oj3d0g8asgyz3wafxotblcq4fjl40jd90oteykjkq1c83kdduz5w47cfnkd1t3qmuyaenzdxmwmhcjpnm672jie88gzzltzlgnxlq385h9tymw7x4lppvka4plv4kav3lrzcrnlqlbhnj2jwh4dpofavty2x3k9mas8t03y5hbfom0nd970so4udhetqi1yzkfvrc2dkuj4axcqrv5y3qqc1tpx2gcbbl1e1rt0edin32497yikzmagmpdjtuma86q7k3hee9atcou2jhfozmklwwh5ck27vpoz4a41qlthe2frg1xa9199hu3ud63w2hudzurdor3cy8gq6l12opgjqhe6t6tlfibu9u84hhw3oncnb79zl5t64gjnz703ru2ft9v6tkjetn0s0swefj8n8v4v3ukd6hbxi7ulc9m8kwj1f1lvpv7pu5tngwbo5k0xzu1v1m7vw9ub05sybl1etkxwj6lf69t7zdsmmlbskvw0lf9xd58l6shf9opxju155hyyz0x5x1az8iidahfvkn80oe6a2sbv3d2eyf0idu0nmsy0lkbusc540plusl52fj3t4prpdr7t3leboailobms7x2ui819z1dy998lmwzd2p4rotr66ynp88l30apwmlh9vp5c9mzf20himlglr7frzaikkl13nz6blw3pcsfxssl0mo1ghvw1hlipi9bc9ixlkuzv1hz8tfiicny1w1xqe1eadtowoo6y7v5q0e2kr1nbo88f6fjvao77wv5zzkwq2yr0jz0iycad9oohfq99o7eaos6qdwfzqb7qc0tf5y27fly30f7k28avna95qxwby907bzp5ccjk5lwzhdd27j6tlsmrwu95f9714w5l0bybvamgevw40pc50zax37d7cure82tp4krfdukfmiv3dfs59xyh3mrj9ig2ubycj67mm5j6axb6wo8sbouznl7374w1lxg5ie66rhxjzc3ywvvmjmqey5tvfodhsg72fg9mq6sgnb7jvmehcki652x0bfiiywh2jsdjwp83uuzdykbbmnaz5h84jghv6yomkj5xddr5kjxqibuwe6oriiiv5udr3dfexcgz01pdhqafr5ttpfuup0y1s3fxpx30q9aql2tx3l3cyfko07sb5ta3vhpogxqtdw9jkh2ojfv4k437jq5pp79ckv6zp9r9dqnojz678htlbbte04xbxro1ycp5l2la9a0uytrfix71n2ehm231em5i79kezjhma4wd327zgq2zappygmlbfr3yknw5kusuknebn6j1uinwlah7r81z1meax1lldgxpp6lb59zr8dhrm11yf6m4d1i29ndur6b7n6ub5qqp1xmxcdximuvu6p66uelt4enxwfdwur474j75cma6dddxq1lh8i4z5rz4oi9y9vi8bh94k3vg913tusp85suk4vv1wvgzw7sw3etorp53ra3lljnxo52p1fvyhqf88mri92jdtiu8axhypck3p0bdyp9j7zeejug20ybk0fhjaat9mducmemnxlj79jeyff84p5oqqts4mn1g1rqvoil6i5rfb8xhmfo9ngaj4rtpkpkmvqoppirn0w9uaowbxxr1qmov3dycejrpg8t6e00yx0k52w81qr4vungk5tkkbp9s8xkj4buiwehyrekvyzd41mumvisvjw589pbokxpfoeg65x2n2vf7hurfh081hzsqbu3ug3nl3s7hntt3b3zekcbcw95whguvxppd6g163tmua2s58y9vsug8u1xkttfgv0nicqzibm1mzkp83e2dmgzimvimliqyrjsadty1lstx6qgryfzzv77h1t1yo5myri1kp9ugqacgf2winf6f1z1577s5rjon1181san0wk9cgc4pu2envxs1h0p6h9k388nmkq914ytcw1drvuoy6rvfewaxjmrpso5um9tghxzwwmrxlhh7n8bpvnnff2qdea2w6uyfjh3ivrnyeivptsydyx71e9k7v3wb97wbomvuah3hgbdj6tajwypxe',
                redirect: 'uf6zdnu9awj9yzr388cgijj8o9k2jlrpbi795o7lm952i3i7piu6h9xffplow2p88phwpja0bpbfy6fxit4xax68n717ivjlspf5wtvf1bmf5hmevlqyrlzzw2snvri21ycd5vj67ped7l9mhcof05k84u3x36zxxmdodaoj2ejxzetgenpyescugqlhgrky8wakhfo9ye4566vbafoeaug5xdbj8fl0khv9nacvb4cdu8d96g9or7oimdxez6p865vqdrvaxntk8x8gkubh96hvxlnpix0s94jffybl80zd66v0dq5d93nzzrhys1ijgoo22l8kzmpz3nm80vklqrrlncb8s8paalvp6o4promnlrsuya5krui9f7a3z0b8ajsr4tqitojfmvtdoii7gb6ycyccto0ff41nyw2dhb44bnik68ar91gax4rju6y1u6njjyvfossjhary082pebzn8d0pwenmlk72nehey65e1pibcccof6o9d99tjiyxauq9pczdtttjifjvcf8ogw7zwi4qei55028iwwudeuneyzdjtzwwgu8tzq1g4z9pxyip3wqhals842cb9zmfxvn37qqwpnnnq3gntdb9498k0ka4g9hjmr6ppoc2rlzqqkc93diltonll5ylwv6tf2qih27morf4zpzrgpb1wdoff9qzgksmzmwshjfr0u03ejkq3pr6zc45ydsjfxf3vb8vz4aihtpckp5ano8mesmla4cght255brz50dibijsqbkh93u8nbtegveh8r0nisq1syjwg7a5w4ku6dgo5b45d0kqchhhzn68khlg0tvd5hvmktqjaobk06xfuls9pbpn1ntpdx0swy0vrp25jldjfkwk3zsb4k1t07u2p7b6aflo75g10v8c9cc6lqvrfmfhp0lsgmlr2gsw1pozjgtr89axzs06unu0emwpwy7i4cy2rson0jpdz60vp7qj2qaohkun66hrf3h40ft2s28ebedh5e0id7k4npnxwqivrj05z8xqnzoiq6slp0gw8qxb74sdf8o019pn8ff922iqzqgy22qvgnzsdmyefzr0nh7wugr9om59d9isajmquap5boakc05tjodmygm5vek7gcaz3trnxz1od1dn4cpdnyht8vpfec86i19zhyf5lk5ypbgdz902er1x8ttffjqd9btomyjm7157ixl3d9j3phw3m5rmmpu1l9j6imbjoksz0y1aj2dgfb7me28y79rcc814lo04i6ob24c4tc23ycay0hg6fsxc36i5ulwhzzztd4onmy4fvd1ko4apefsrg96k41r25t72tx8o2vctbcin4us1j41t21aubwxnowp5qfou8r9vsu6sp34fgb2vi7850nawj5r9qab8vhm1ta4x0h802ll1caucdruxn35kk0r0i7edueyb27wylm6l99ckqictmtsbsvq75sr5op1s44edartke72jfjuepb4crepwzyr74755rvas4ytv2nk45jrvp8ah6zw2sej20j1ohhof8zde0zk4tg8puyusz95v5726kz2gu8me6xmty6d14oirzj6x2cvp6v8hnchea7skof9ch5ilznozo37tl3tg4qpaj3jbf1hj108n3v31cjderxy6ubvlti3ym0dshz2pcvlrzx8t46pzcrd0ngksk2tjsvbs1t3n5d992lma1g0om21kveshtoxpsjr9uor8qccjxirife7qfm878ood9dyep2lcutmkx2pivcidv1a2mmfhnhwz2q3tyv65uv20nwcm9kxhy4zz6u2mw0pv402qvmevv5fc160vnd38nqjih1p6yb6x47zzntykrq7crw56fht5kz3nmjna4tqz2uu4y9b75e8759igbk0yyhu2sg4nqodwc96zgz1cv0z7osrs9b2relpvxigdiorz1v89glrs9lzkxe3d65gsvocm6apkebb21qivxgjfu4eguub7r0p1n59ij72qqa4rrlm09m8gxor2041d8zlcaedh2qdj56kqszsd',
                expiredAccessToken: 3708308965,
                expiredRefreshToken: 7771863118,
                isRevoked: false,
                isMaster: false,
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
                
                grantType: 'PASSWORD',
                name: 'fxjwhg02uc63kq4dxp158bvtqn46fihttpcs16oo9unazh9g7b2hpv9iu7i4opj854732vjsenpgj3za28qd85pt70h7mkplek5i797r6g5ubg45z29m4yani6goxkyhe206pkf5p9kjq008endb6fq2m207ob8tcuqja1gy4hx4ceqoaytajyhjwtxylgp1xyyj2cyuh49h81u1tmeee9t13nir868a6pvvel6dwzvz4hvqnsyczl26cws21bl',
                secret: 'bld0963sygqfili7revm51o992kmslqpylspjf1xx1nsm9zp6qa8vkz1x04buoqpvxjor0eimkpqmu0kt48fm4q28y',
                authUrl: 'g92l55hk7gt1jtnklvp12e3alik8ihh0useg4up9fuxce4voxvnbflu3afamujyjc34aqfc3i6j3mg1ismpx6eskmnk1h3b4ji74iql3157rlx2hk6bzhiz4hrrzxwn1au515cbleebt1jjn1wufd6wyyi17m9oepieo5mjnk9tw97k50ukt3q5ndnqhniw6s0ikuqawtav4mjdkox7ahykxbr3lstjd5ybr4nxmkg6j23240havb2916f5igx061jcu5aioejr9w9d3bmg53l88d4r910iyil5uty4xzxf2ie1r0rdu0fwq0fcxqfs5veyknuxmtzphqfp0v4pwjwhpf7xlpztmj5lzwxhjlid0rxqyad95dxc38f5qnhojbf6k5roipfzcdmi4l5r762kvmcfu9pjn9yn0ha3pisfzxt4oax5fvxabgqokdsp283ck4hojwwncv7pj1217fgr21gu0h0d6fn4ex50vnx0iyr3qooncr3qsp1mpztpty0o7qrrvyx14xxg99iqr0ssessv9gwhlu68w6v5j0fx1bdh6kbwo2fuinbor5c64warha64tofn5tepsn4sc55jw4plfrm1uhcjzyfziau8cdfvvnf8zjcsek9t1tb4qtnj01iuyae1j6mtesa89lda52w8gwn9lu2xcuvkdvhbqms656x2mdxgjdkrgeyrethujdnyusuvps05dxjx8tf9c2w9vwkdzk0fpe7lj6e3wwlqel2wcw4v8fqi5bou77oe7736x7ddpok5agdpquupbcbrtunbnhj07nu7urtri1thz8ocmm4syc8b5cxjjzso4m9knuhwcu8eifp79yqc6r9krntkmr0xwniyzpvztxty16ou4th4ow7i6whl8zbvbpabvuf4ox6waemhqhsa4lvpb7a3xzi7eswhj318oyz09t24yiu5mu95jo0snhcx4gdshmcuos7jj6qfbeihvvqxfi4ec9b6a2slgstogz7d2zfoa00y0mni8p0kszcr7tnch8ei929ithm39ys6pt8mos886ohq0th9uwpieb0j9mbfoe4fb6ce7pa66wquyu39dktgv3obskysbejfrkh9rowg052tkoqdb2bfh54p6jx9miw6fv708mam5rw4ekuyic6adiszed7hu9uqeqp3pfakfzv9mbnmu2i1z2o7d1zhqsu4b8su3ajw76k90dmaf2xksniholjyldvbs3uv903qjzkm37oprtfwiey4uvnxoi48ud86ekwwgenhmtdjrd0hjkn380eygadtobwag4fwxfwvs11ue59xbxqojb696gz832etvzjjdk9r3nkzwkfv90fsrr348sdb3ztmlbyn35otn96qtxm8en2pshn0zufomxyg2oohejyp26fsoip14rn48lctprsar3meg6v252mhruxrkwgsz7fnv10b4h3jh47buautqdu3nk52s6a3coufdmz7wsfcvgdgltc51idb30796t3i2ju15mvc8kqcrbkza94d38k7aslf4gkgre7h7q6h6naq26y69go4wgauyt9a46hhi54zx9nesdqf914yuz37g1i9wgpvu5x18cuklyl1atevrrtn5450znvketuwde1o3nzix7sadvqvkzf4o8h5bgopxdoum3txxfm1phm7aobexiqca1eof2o13mzh99p1qtnddfqnx6d944ckvl3i8yzx24d7ynffotyr1ilq9bu0ed4oa9q6pchlhr4wklxmcngx1gw3r4d7w107pg3r8lcivzmrtzcsbaxp97sms0j2q2w5ocg2betpyds5ioyphiwjxxs9e6id3neptceszyu7a407b3q8iduhi2wlypm8929cl9d8rsi2hg62cc7ymj8ve7ybx3qzepak11me92gkk4nv8nhv39q8mjc3gmsxjcer5dmd0luspqj0a5fxe84dqutyx9f7ij0trsnbbkt6q3mb2tiygqqx7llqjkfzcfsl1eaeyhjmmdhryghwrj89mmlaosk0ii2lod4jj',
                redirect: 'vvqacfaset6ea2tga41ax2yf2y300war6p61eyqal7jbb4kusjfwx2oasxdsn1o2ibomb044trexvdreqypz11h9zp5bdoll5m3wr0qnu3l17x3ov7fk7ij9l7ydonchp9yjop749nwu456a93n8lp6plbzbkbu2szkeigp7s8yu7z40t503sjhujo0rf8vrsw12k5dte62z46bucz6wddru5axvi7jpyyuby1neoc2xv1oj4etqjyf22k9b22whjax91c3xfqwxufewdzjqrxrf80h2s1vkpll2y70wfhrs81pyxcm8atkxat4n4epefydqbz98lgg8s8hwgfp1uzfzctcy51svd1wsy3k45i9d9pf7r3bzizuryuaepip6swqaikptbm00wp04fdw8k9i6fyc5ypar4hrz7qlkvv3926edqjlt1cm1b8cegl3whjfzofj9d0glnjajnj36g7fqoqiqkgu9dsz8ab6znu5ys6km9q4gpxmdoahh8tz4waynkebyfvvzwetjezku4eq7ryfxvwp6qqjqnwotxu8bg57jyke82di5jatuctokl2znbjv81tyj7l638k87rtrnau7h8gi02tx7ghrppll5100tvw0u5nw98j62db7bn8ti3wikwuj7a5rfed41la82r5k3w8e7r8t4xknidyralp3c03gdqqig8dw643tbxoj4qpxt3hc0297z4j35uta4kav204d8mq4xze01atlf4ld73diak6uc038un1bfz4tcicc5zcp3pv4f6cdmibrpfkget4qswb90z2vbv9lox4tc7hruryz58yd9kkpq8hcrxp9xdsbcpk0k89g3jbkkydh38c5o7e0u3mtq0b98eq4riy2tv6n4f4n2jforx6r7ucybq2blm5hst4ws8yqwlv41wlejv7sz7y9d6y5ev8nmqnx5otvp786uwx8witiuep5fzko7icer2el7hjyyha5dju1xo6vescz3bcqstzo8vb2c10cih86zd7op7gyl11iqmfbdwp51ibafp64allj2ogtn72wznyrq6vgm00cp6wycdc5sagkvbpewm6oltxqbb2z088ub7qoja3zdiq72j0huqsdhik1bj2id66svhmlmic74prer1w82jlghdum48p116d9yl10rv16q2kbcwr971qtt62mbgvnlxsffexm85rvcgfc1s6rhhg28j5fj34o63eqsywqk88vkc0e8i9v3z6gtgwlkivkmth2cof22c6y0k8v9ily97c4fin0vf5bi6g5hsql8adsqbdk2xnv4hx2nw6bh8rna7fb60ao4mqyrwjiz22latfb0uu2zds17p5o01tc4xghivicqmsq9gkslw0z55feu4sgyoczzd0dfa0jeub7naun2hios4xkg4ilgoufkip7wco2of0xg2qudac6pc81a2m9nomqvn07jextlmuvuaekkp8li5isl7ryitd5mo42juc07k9631emqfnpayzp13ywpgcrahnwa1hdt748kc556gah4xcqbjevbw4lper0aez2f4g0scpqyysmn3c5ed5b1f6ex7gn7n7k484t71b445lmrcpzimf1h33eikn6lilz7fzmusfxli0acoxca7mvoe2gfo3ssbw9aqqb766r6y11qh8or1wlmt1wpxdw93nq3ac5m37jxxdqswxcva3fd4t605d606p27lqtaoy4n6y2rinbqgjonmj5zh9cu112be7jcv89lyzbu2xlaupjwy36hz1gntpkz0oei0vfwy3aez1mlr31oorxct62d85euhpuw0ktx6m6m5uhdg4ivapzgvmu7jrpy1fl5iy6o30vz5fofe9q8ol8qipn6dg652gnqn1xq77y6o62is4rpzp28lyvcoo8xdwc05cmzni9n4nmph5lti6yuuf9qje3lqhi733i3eon7as4dtytwc3oqmalfnank44jlqtful6wxka6y3vrwd1w9bx4t3ozn4drncmjrl4jcyw2n4kyurzlwvsss0o5qmsmm',
                expiredAccessToken: 1030889642,
                expiredRefreshToken: 3873881369,
                isRevoked: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: null,
                name: 'gd8ptipi7rg7e7hx1xiqqsnkwnc1ii4w8aa0ouins1eq1yx9uqsgtqpdowc2i0ixfy2dzppplh1cv4i67v4h0mqsww3de52902xhth0otycyswe0f923v0xla3x9181lnvu5inmb3fdh2k0bva2eniwmby1v2osfy0pbzuvnz8m7jdygb58x547f0o62x6wshxi96jqdzbe57top6l8pgn1uudndhcx3uibsc7s5oxcf9re68uysc0j1t7h1fah',
                secret: 'j65uqe0b9gnuiyc4diqzcly9jkgwp6jjfc8km02z14tmn5ws8qpkj10qn8efd5lrmq8bov673zyjgttn9zntin0n78',
                authUrl: '05crnb68q3r09pwflv8zw5amyletemqhorik25kiajb1k36pbj7kt2fgeygv9h1oy54hiq69mzckh0kcn3gt5iuieb42vfr55ncd4a70fz26ysng6vqlfghc18acsus0v76tfzmgkwlyylgvvsn5xprdrp78v1bd1dn2pinc78xtgksazh2xkvefzu7asy4l55wepwxgrtkqbn772103xmgnva8weq1ah3zrsmtv67b46cn0d3goih7421ew5krjckdqdfv5b4n51z2dn5zzpbb9or12py9d1sdaywb3pn0nhfjussw65zd1h4d1xio0n33jcanry4koxryh91zaodkdnv3ltia29ut518z5yyg0y65pqt7y6ty0qbfouu1x7w6hceauh0pv5xjmtl43a150lce9f7xwe4lyh1b6eualhpquqac98o4807xvkxt20rbttn3qy3p7am6dxggj4z9v5420pacgqau6jmpm0zyawbvv3hp84pn8tmd8mjqe3drbpe5fx3z0du0ertxuph5jjum6iph15m9mz5i8of7xg8b11s44abi6njwtpo21yk1nb7f3mdwxdxpkaasdyv6dw4ievmbhcuz5xy0ga2h63tabp6r4zippxsx8v4fdolsc5hg6iarv5c481g9g5ngqzhvil8ljj1bhtyrbf7urn3tn72v3r997jf0didc7ksdu6fgvn0277650bm3pm081i40jukntnlzil9eu5kaqw0tkllqcpz6jjsudqpzs4ekqs38jlad99chx198je2ahmfp0uydmmlfr7y1umznotkxgyws28zc6antvcot564bkasp9g3yx4pgda9c202p42p8nhpl4sf23tftuy9rlrila5oi7jui6n7ssfkvnnl5b5v4yufwndjb9nul832uk07s8cg22pb6pfqgli3f7ks4amhtoom2pmh4m1tgaf8ch69mrih2gam9g25fbl4gbx403zmsomq32vi5c9eu1buh4h7jxdpitz0uyjhwvou5fltegymtm9ymgymrs8f74y038nmyookx5cdsz8qqnw47oh1bkks4s8cofjpb3bipbeon0ak55s41ogbxwq89gjd1b8nymw35eo64t3l27cnfbde07h966ubew67who0czl7rz72ixe70fp4zyzqf4ovjq3td71c9o262mha1l8ifp75e1gn1ecwun1rt7y8w209sp9zuwh89eyn89fg37g3uz2zhm6g6njnkcqgo6xqrx3d8ltclfp9v6lz6568n6q7pq3fk8ma002akxo87qerhh70ru4w2vbivgtrtwad6ocjbidpufuc3pjgdoxcibq9tn2kdjv2rt3rbthycd7z7iao1vpura5a8wbzd0hbyxku47xdeoxtxdim3s5oeql2let2xnsfi7z941hwc29oh5uwgdxjp82q96qdbsc98h1rueo3oxc9yqfjh0u84tmo7jrwicq452mad7lp06a364dqbzagtf2z363g29w4ap4yqgjnoyjj2zleimd4dh21mq8wxyukspmjzuzdmpoz6750ke2zxuww1hxt5fpkqvpcho2apgkk9xgwd5p61wj5kw251cjfifbofm6ymus26n6o7drmmqbowh7qfsqfr60pima36to0y7ph0pdatb0fpfl4yxmxwclx0bg8f3fae6261caypevyfjnv9z0l9kml3rig2b3tb3pkijyhbslcoy723vixaxkrisbi90lzvtr02p5qmkayubiqa84b3hi6goviyr6mzvii7vmw4nf96bf1maogmyrp82p6ouf0ry0rz3wgyqkhvslhlpljiuj15oxa763sff0axp1cq1sxnbi4swsnqer0moauehskjxiwb7ud795gzny1iwf7e5dg9s9lr3j7zijoagqrs4ri88t1br37ixezc0t34oo9a9psji5xp774oreil8zue28dtzj7x2ans3j3glt60789ncchucochteoj90vn17hketaba52j4tsimh5j9fmtvplczhfjrsbjkn2nb',
                redirect: 'pa9ovaq0bmmr4p4ok2a3w9zqnf9tu830v5jlwanp5s9arhcrai72ufshjmp6nippmqz4qpeukto5c189d749gmf6c7wo4brj8q2dbzuwxvmxtm2lo9vicjpdr4yt8d17s82bluoxdpb8hgeraqhs92fwt6u5wsmxg9gd8awlsf3oymoxie02vn8axcyjvp67hxbhv7jroq28nkpm92wox9o7gwpn7nfkgrxjcucikv31bqa7qxp3icdjt30rgvgshpzw8irntcjm5g4ivhjbkcap72h7z7aocoj0jwev50q7euwlcrsrgs2xymp9p11hbj8wemd2b6w4t1i4nx5p5aizlpr6ej6qj0ymdoa0s3181e4mt09utb1yym32ma1x85c8ka2azvlzon1emej7lwljr6qj4gujmyzsbmx832lpg14yl75jkn3ycimzxotk23oktqsi2xbq3knpbh7srywi9rjoxwlpbiod0ibponpbvijcxnjrxoj9g68rw5ptuhk0650yo47ghyjabmg2hs3gc0yaadzerlrkxgn6ei4zzg4ngwp1oxh2cdmddyji2o5wysq44unq3wr874ggay69dcu1s359q06f6rtjkybxrsrsqpeaz2hahpn4j5xfg8kk0v295ipm2hjoiqls09qw1wmhx334uuzzhszaywp0x0557z2w9h2hlhe4p83g58y1r7c9k8s7ilrj69sgo6tw8iue5w6q014h2pc7otjtwhfwf249knapqrvyyphlvjpqsiq3gk22l97985oofne0zi4k5v3oyv4o7psnj8hnv2nfkmyup77yvw5a7ubkd1m275n0e224hxtsu1nyub0zoqqcbk0rync2wqwy97kijl740pxjznpz6nommqcvsxvnpdyd5koxepl5chcdbx5gnhixhbgmrpvvkwk8siw4fsx4pla8eo9es8mv92l1gaevbi903mx2hc8jemkbm4kide6l07gkmyjbf1hqzqus6esrbrz0f4kdm021ue9z318j75ld3dvajrg8d04t8lgf547cbvmzye4i82g0eavxudd60uhnyjy111zipqjo49n83602zd125lieu5rpyzttgfqzhcin4sdb3ensego6av1lgj0pgs1idystcdrrgmof7yog8e1o3xzyyajt2ohwslja21z5z5linr5brkpqzroxv7i6roa08yed5dyiesnri4beyiw0pz37q1xa7yxkef8degrdxnxaxuc570vig4v7wvujdv7lhxj0pr392rz683ylcruox5r8p36hexu896wqdr7fmw01yumz73g1kge2v0v60fn27z5pob93vlijwom3gl4maovrtpktw569l9n4jqbhon3n3n3utbvhufluxs1ua33pvw0h4w0ydj5c7svh0yrvu33f2a2cravyl6b25m9fq8t35zmc0txqw7u2v5ap3yoy6bma4ptx283yq3x7nibz36jrek9ktrljdqrdvd3mrjbz750ytakjk8slcqvmetn5rsffp2mfgk36faq74frvr35q2py5kognywiw7jbg0aq0mucs9u3rgb19n6m2kjphe8typ1cvzbaobcajybs8xkj14h0gqscdzjfv3nv2nkfueuznrp0zkmwzzoaopc155mohwrmjjonjwye72fowwo0hxz7muaj5m451ij9c9h4reo66m432q8yelcmomopn1xgz3cafczzodmcncpv42rdt432mzpsakg38btovs2d66hqj4in34ra376tmpwm3ndb6zabezgno4ashey79wqytlxlzrencgoan80oxz42bsn5t6mm7cess4zvhi8hp447yb1on0dl0zsuwvq96rxr1fxqjnh58rlop5kag8jlfhoyknl5lpimox09qykb9o9b849gnwxk2t2n9edjgu2c4ubir148og9uisb4sn0j2csub7q9vaqh1d3i696l4rrn532bpy5bjw42cqod08e23qbjrohw76lhdj3cohcx1x10xoks96co77znygjm8re5moy61',
                expiredAccessToken: 7596802861,
                expiredRefreshToken: 9653099297,
                isRevoked: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                
                name: '2hezq2jo8nv2z8ya50x68qr3ygezjwdqfs1tbnv9b05b75m6p172xy0e0ly1rog7ds49d9pz7i9lchpf0uiw4vlddl1vlammflvxbl6v8fzk7bd1rvonn6kivhk6zhmzagu7jdf3f0z8vxrm34xb74vg9amrkqdu6gg5ao2z3u14d7oc5fivgz1klcyjn4id75joivgw03sgcddo9nrbrsl3c6wamd3peo6jxn1qpa516x8fw4x7o3abp0ugtut',
                secret: 'xgmha3tcl35ihaq7ngphfus7f8z400245wuckm6dtr1hyp4x4ealja75ennh34hocwr7tad58bj66tclkpg72hxtmd',
                authUrl: 'j4iwwfuwww6z968qd8fiib43wmcktkn598y02zqltykr8ae7rcahrdjtj1vl9anyo7atim8z7pduw5mavuyw9v8lkayzrp01g86xiueo20v9b02ywkdpf3nwjzv46njsotiykg7sg8opsmeqq1296lmrzngn2relogtcfz7xlwl5910ncue4audhgm4yas9actgmy0caxpwoaz28b11cwlootp759l6kn1u243jh0033mm129z3lsaaeen2owuv2ch4y7oo51wzmdsc2tvixvrjg35a9girwzpq4u8jk8f2u393m1337uzvya4gqe1iz5v8u5k8fs8ctx18wnnahv3en4obb9eurqyxqpo0nigau8svoizd8h37its7f4yhz66n3vvjdwsocvgy5od2aa7ij2cb31q4021vm6honbg2sv3ir52x5hor462e8152pn4axmgsrhqap7z50evqwd1vqvxp77qxfhgp1x95uvk6po90vfgzgok2t13dfxtbwascksrzinyuozwxjone5nk7tc0f5vmrwyrjndpewtl3t7tfxzwljh6m3pkvrf790x0owk3vmzw0lpxrpfxkqpxve737voa2i01k9xpth2h3mnfidsfc8ey1zs3nm40x8zb8blcl5u9ik9vdj45l3e4xhtkfei8re3n92os97dhjsa68n933s8vlav782sj8zuljr05ky5tokn0k9s0c4yc14fe0lcgv0r3v0ga0dowpu81mtvvk4u6yoccsjcjbww4404n8hpn7etrzy0wy4m9aoh9kd9twlwp825vgyp151d5dencmwrnblwswi2j5pvpoao1r52lpivou5n4rw6qakme9uala9lrcq0fznj623scrjngov9qroo2619ukz64spjb693nc6auibinqwc88j2968rbvu63r6o1cxcuf5l5rdf8yq81vwkwapi0aof4b4vrm34b4bnghc2axlgxvveftitae7xijmo54je0kryayvw59jneihgk01lct2ijo7692227nozitiswo6uchanpa833u3j3s288l8k55cv5d5rnbqon0xazkw6x6wg2pv05pl0esufe09zct8o0kw2p0dz0aojd6prnq4lcxm9rae3ga9oteohdeimpaa8r23a26nluqj80nrvzzx2qrg16xlyw2g28uvalj4ltznm76b0z5dtxnuynayx8vkzf9sluvi5xlbujitsxr2kdqtwkdwbqlq2ydtvb000orzl0z0juhd1x3jzui21g7e8gnr4mallvbj1cgp1rmcl6xc8mbgoa20t5avl5f7wwjumpdkx2mpgg3599sozdovj7pj3ly7gxq9ahg0k88bah0ykqqbkbc86st3aa18i75eq9ui9g4ypu39zmjm9bta37xw0dqets11vjygyyy12o2hev4qoy81a2a76c19vornjvqm2zypj090exbefam6ysep2bhb64y73ptxeqfhz0bd8y5xdm3bd8c03etzvdwz0sfxwcq67r3hbl7om2a9swhkgfvh5yjt6usbjo2duy83pu315vgaza4lxvriazjm8sbnbe8napv0aobhhcaxtxfg0xzz9o8bhipppbhit0nc5pmf3q6h84h0qj7rp0xs6p87296f9vpf6v18pzaw286lvcn2t7gj7cr4x9aazxjnjro1gzrnwga82ksyk0ejwksj0ahf2w4ev2s70o6y7e5zp1disesdlhqumv32d0653t5mzdzroolywkn1ag6834gz10snbbhqb9nafmd77k3pgtm8kwi99t1573o3u8cs2ve9498hrm3exy09u0mcu2qcq8zkx4d6p833om5ahe6rls4ppusa0rldmshesqd31fbf1vt03d2rj5fxw84h1pg1zbedhgce3wpenv50uhtcf97d7jaq3lujdmr8coauurcz6ckrcm4hxe1bu8ikmkpxg90dmz1duv2uhgscfr5d09o000c7fe8z1imps3nje84oyt8n19c7m1n3z0csjxk3fw5hktjeyl35uuvz',
                redirect: '9rwot0n9sflc6jetf2ehc6xsp9yr525ig1xsplmrcxievhd6fjnh9cr4fiy5xlp1ip3dchcpxc5c0sezan19xsq3q0vf96g8qwtonw509w4qrso1ymlyjiddagglhdb5vmwvsmf2qzx4o41gccrtncbzlbpu5mrd1st975z34wghbtuqc7chykj9ztybfibn5q20x9o7xwihjwz9w9ab4gsxtdoeguze6ha0b7ckactrm5iym74i8qu64kwhhz2f65cnri4hbnn36j3mdnrdsmfb7lrxc3ysnujh3j3g77fdgatrk7x8n7kia0hyfotsd59pn426qqq88xvaa71qwbmqdlmn1q9mn9nyxl2rnwv9tk7zuil0mr60n3a3pt7vi4oscus8pah692oklbb9dx04233iauorzaj2r6u2p0u29ru7lmyitn7azqvumbdn0djtzkt903ugyzqxrz94jy4ip3flxs9gx3t8fnf7i8zv6h122200ejknlirzmclyw4rijlqst02o64lgjx8mp6n608s3weh7hi9ar0tpw1ni3enhgcsqfqnlg4htvhldmsm2i8osd83hxv5km3a0h0e2foczr4lym99eubzy1phtgjipprm0bl2b26aho31mlavsnpow24zjlyfmlm0zu6sesfxxp6oc261qph2kkutrveorzv78i3bsfquv5ay8acnspzytdw6lltnmfxn1w2aq58k0ktnifh1g76voxvd9krkxbuhqrcw1ngkfv45f0el72lxwfyyqyjz9scr782p4foreq5g3ti1u9c4egq0ubwkx71hf1dd4ybnqwa7kh4qu9mz095nrugcir7ahmwk85ma37hcvdi3o59gp7zphg72mhdwq2yfl85rnzidtw28emfpmawqwstndu75hhxfu78hgh918osiio04afeuvfdsa5ju8hopo76r9k5am5fzadq7dq3xt6f0mu4mrzabgvlun3ix87plur5d503x1j5oaeeupn766llbs9s7f1udg71itmoz98bg48a2iqisdejzotpmeg6uovlhmi65bogzn820u9ieph0jcyi4qopwl3670i2qhj5uqf0xj8rniwi1gm0d1yxir4hyyuh62gm2pcj5mc62klyjcg0pj2pft1areetzbexpw0y0hjdg0rfhbnua1kuucjav42mb725sejuunilg3sms58uoovcgxp8z8a3yxmkvou50klstm0or3uxcwzjtkgx08znb7malvra90atacudqqf0l92g5h0ngaqbbyiceljh7d37wwh79dq6w4a434kdxg9u32255qbx20n7qwxuxeyhyz13hapga97t5rm2572h6wmo219gr1866zbvuu05sbikjfp5awr1f27dl5zx8ko5mhikmwzzks2ojn6bqo59qr3txx9rr18ipcbvwo4v9sz3t2roz78jkvfod5t98kmzmd7kgepuqh3bthhas9jt2kw3kiv71kgrv5uoyou7liw4cjlfb67pg69bh3g9eegcqkkwu3zwcr8euv8920feaff9ael1qauase5z1sewzv405327yx2h7g57gnqz4y4xl99kgda8i5ie5d70hqj4wp8r9buv64qy13c008wln8aczywfmmzx2oy1cc4c514a3nqnc0hblzp0r7kpymu7jq63xkryetptizc1y3dl4tvovjpibsyefoo519nowonk4tva0klci155hhsp3fw8cvcevt92mgdalmkyp8g3rc8fhntwxcxtxk6takntt348g75ql5bhvog0n0r63oej1w8fa2mxravjdef60t4rw86i96ff3937yvil5dvq4nx83bl07tvp38dz1pnr7r8t5suf8b9zt0epah588wwy5mxs7a0ekpy7t7ku62ch0vaeqito6fobwxobcmbcbv3l0wxpfrzqgwfjdhdk801cpc241nq702lpwtolrcldtpd0b01x6ez8f9a38l7tipx66bt9mrhcqfpwg4mvae6dzsdqmkposfosyn9hbwmefpstbw',
                expiredAccessToken: 4086074700,
                expiredRefreshToken: 8215030053,
                isRevoked: false,
                isMaster: false,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'PASSWORD',
                name: null,
                secret: 'kjmj6nazg3ite7fdhqzuy0drdmwj2r2ks4zs3cycvvb4qg6qeyqokxghvu9dbdejhtogv46iizocjoz03ncq414qr2',
                authUrl: 'ei5nbdnkg1ofuo9sjt3qzs7wwd8lthwmiy1xn12gsqg2rbw1uo3q7ind8ihvqv33fr79ndtcrq8ls0muqcl3e6459mm138z9zuxpmhc50sv01bzgs0sd3bnv5xeypnk2jry6se2na9538w867kdatz6bgk9ijjjy1zucbjhwas0nvz3sqc8mosk74ablhf1ez7s3hwt9x4x6uo3pa4nu0ictm7cfpdli4pdasv4yq8bbgzua4fye94o8t45fxnludcfwl59hh1gbvmz6iya93i0wppxuwughq67fbewi7cxj9rsdgd6lzcy115etdh022v7niefqwxspj7cdtum3azy782qiez72lon0yago5qrstv4ks1epgvaeahdemuw5benfmy1ladam5fxgc60zqqch6oqjtnf1s9qsgp1oud63k2qfgo8mq7knkx2ge1knylh4inrvbo9btygyqnnp8aaic0whr2ldv0eblliljplz86d2ispinlbrocginkxhz8k6zl7m0pqtharxbam54exet3wjvbv6es8sdgzlvuk5uzt3k3njvb8ir6696cx374h61b0mve7xedcoq0d70xk4hwefssjiw5ynihcgzux8kyo55c106kp9757ci5q35wlk0lohddr1jrwdql9bm4cz2eyndi2jp49xq5xn1yx6gsh675pz2sphyzt70kuywcepcz62cg5far26mabe0yflg5p1w95rz25v8zbipwfb1yrrjijbiazmht1acvtdgqwoxb7bvh5b8roney0uv3csh3f5v4ce6796se2lelkv14smuxeum7ud406vt6oog11jrhgvhqpaufxdbcfegigumht0juwkvfeegn0kmurn24z71b00b83d2t54ouidf3m28co9vim6ytuim7sn2gf0xgmpz161q7kn95g8y07evaz1dwcwv4eb2tnbl86qscyxarj79ofwo7p15p3ufzle0yjyy38b31vh9jxwar0gn2ild8eut28h9bpaxe7mtg8i74nsn0hlp2nmf7u7eua2cjb2atj0fhgcmkdd37gcxddr11jrdgfmrsg1r1z5d6iemifd4127s6c4zmmezeo5ke5nvdn4t5m8yf5d7t4oyfytqzxd928te3s3fqkyeggkhrd1v8cvr4vafitjk0ifd11t8egu36ghrg6obo73cejwwq3wt4orgh3qt6bl4r5othozzzcjy6gcmpssu26cvtrxe0shlaylquq4u142f3fspnqj1yp334o1q6vbc0fhdyh6ilj9v3r120lri8flwttm04azlog6mq1mc14qwwj1bgv70memx7x0qfatqmy34uvnsouygm1ml2u0jy5fz8eqik24jk731qz9d6m3i9roy0na2e6si35cetw5lipp6xafuyb3d34f015nxfzn9fe7bk0i3h5fsku444106h1vzrcmpzq9z70e3tbl85bh3jdxa4yta8izepezxypkjh99hctszvozmbiww0zuszpiqqpc60wtk3sre4ddxfjc79440kjz33akkgqfjxz5y9svm2oq04n79tdke6yyf3iafw2ubdmnue177y7m3myi3xrqxfyp2ouhak6vca8uf3y20kz4besvdsyab8zo6kbpx9dstoie6ak0z68f1d2iu2iqrs2a8tcoy7a2l9hl3ol1hz086dyb2gw77vczis91kpynrbo1wkr67b4mzk4lpuj0gp6l4jzrxjfa1yy23fgv64alp7gbk8njbwbpwhdetlyclwxl5pq9zse3zp2w9lvb6rpfc49debj23dnolnlx8qgxn2ebiac4njwvbs82r1z2vkhanuny1xdxhx4qhpea7qrp76bvbv178vg1gwv6oykznankthcp16rkllmh2wovcet0ml9d9j3bre177x62dq37gwb6vdthb0i8a4ov6ghyflnlcxn9plbu5bsoh7jwyuce9iyyk84s3dha1qvhrcnxx1ipdfelhdz5f40qs8e4xltfz3z9qdccgmfyxi6ksxav82ejwbfe',
                redirect: 'j6t4tf3zd56y3kjsixni0aseisiqc1e56yp03x6be2rq7khz614tlyijjswucqatawetzcsys7gut2ghmw3qnxs65zw0jql884polm31ort6hume63xljrwq8ery0dd2r06v6yvk2xixmfb9c56q51mc69j3cb5l1xcf1mxfazshr3o32q1l4iq6s2bjjjqfe76jxp6gyh145e2yscsj6elz63vet8gl737ara7orlkkatezgw9xnejwdkypixvhe6gn2ac18jb7u8yj0fpbmprzl88w83wuuwrlj3q5490bxex9zfgl6xx1b8sspziukoqs36sfk5f0b573b8iu0px983eku4czdig0jcz8oz7xgvpp4dymxf1d9x1lv38c4njymcq4lboq590x3blzi1z89keleih9358yda7ifri09j0ps64p4e5httjvdl559ylbm1nu13efppbc3faggodlu8tt7sm9ljnc31otmju8qkvhbnfr74gvgq0qkkmpw584redzg50yj2j24du7cpndcldmr0oq12gt75qeklt09b1gac6ot4xgdyo7pwphwo8v4anot673r7r5peu6k6sy1vqm6o47wezplqahyzar945f9osnyt3tmfrtn3f9xkvz0gj8o799iaftpfpixypfr6l07q03xzbdyw1drby5x0ja49zdomc530wiuzfoe3eszm2eryr0atqa1853ho7gdmfkntt3hr9nva2di0fg2rr85mab0wif42y73ukl0pnpeqyp844id4hkbxem08cb45dqgzd5hn8sdqujer48qsdyi4spnjljblxldqdvxiu79hsaljrs0nsl7mvgg2z8wz7bf1hn4ke3zkeltkudmpiquudabna6hsatiaxza4qtc90bq36mbpn0xg744o3vwi2xhcpbasq0vbbo0fbr6lh0ry2dx5xy0aingtfwplo3x5xfb2lpbap8cuam90it1qnlhery3c07jtycrup8upyzxvagwztajsusq0f9pn6i5fgbnvwarn45qzqabsczqa62fi2day62fl2vqfhlhnxeyebobe931vppxx2iosbo9qtleebi34jj4f6bvk2fkfyyz66ql25r09qvccztgm4dbg2tn6dkwg2jk3pknlrdq5y6j9nz9xq456oxxq2djac5u8qsfwfwceyk0xoov0xdwf5j76rtwe873qjfst7k4q9hsrwjihl8o9h424o899ikntca17p6xmyvrjha7z0x5wbfmltrke4vfr8yxftf96coolkatpsaydzgm7mp13g1wosowkjai76ju2n4yj0jggrhzf028s7f75mjlq7n29trefe02ug0cmf5fqbyd4ihbl4ydbo07y1ukvu5f7dze7rrwowpo5jh54brw8hk70i21znulrfd1qiefksx0upiwi3xdaxvka0plcveecrj6ot0oswbbak5xqdyop7gtfnu1iea0i90uldouo70m6t5h58ly6pbyxq7nb90stm0xhiolqfbb4njiztpcc83p6bvvww5ncie2r1xpvgmzvxupl1zl3via3t2hzw05teoi8z2z48dsug8es2vllbugs1nsbqzsqdoz3inht7ao8nbrty5dygkmjxcbubiq3730ypghetu64kr4iifskfo3qtiuugue8ip46e0ez5lj3es5lmjc75fvoinx8vtbwdcjetrsbh8jtwmgtoy1brrhylq75nrpm49th8bj9fghbh2w9cn2miq4cog3pjtpd8bwkqjf3sbxz2ppubvptv18wrleibdloilk9sxi7wl6o7w2cqcj7hdsc9c2xwjlor29bacqvpaw53xmz6g9w4q0e3bns2757ree3hq0e6kt4ih3sj7x0gc9qmabttccxz5kzfdsckel1g0lw19jg8brpop1xljfxj8ic4kw9hs2pu4c8zcci4hz60ouzg20artesmpi2n8zhde9d35v5qfvbvccbbqxdhck9vr8mr7usa28a0i2dm3kozws4dmielvml87zkjmdz0425oh',
                expiredAccessToken: 2639483126,
                expiredRefreshToken: 2895317241,
                isRevoked: false,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'PASSWORD',
                
                secret: '2zrane31o29tr1zynrjmq97f4mvs1mnyajdwfudwhwns17wqxfzcewesm2igf75esd78ijzpzxul3wz3q3kwvlikmn',
                authUrl: '6gjuixj0m395d139jeptwy78e26duo6t3r8hlsqbhp9i5ejgbq4x14cm7j18hw5uunary9s0k4z9d6jz6b5f7icyn8zconansx4ztuxdvm4yana8dpiya5yvaomicvizjyn1d13sms5iv160cuwrgj5okb33ush9r1z0eif5knt2sltpxl3t4d651to6kq68cz6he38e8ucbmlco8q0ahfqmrlivl9ir6qr6z8r05l801clsjj50773expdo4yooph9x923icdepxlmiy10ttxj4eajljykyp7fomo2jop72jo0bjqtjnhmn2cicloj9hka77kru0v0k35uxybkwxs0zx7rgyox80llhhlq8615t0aegmpb4mhsmkvrc0iiae3qoyqs4sdzp7pgph7ycbcurfml8hacw96ch7o02fcho867k6xfqfmimtnjga38sr0ec78m4y9ffh0rdtthumtx3kj6ya01whmu895rpsj4jwlyog2hiwndjavuvvidi1c53v8piyvcqcq010hv3s7sgpy0lseg8r4ty3g587jcftf2n43c3r9s7vemvoosn4wmqjfxss3ofx1jqpl8ntopuwon49nlq9xfxmq073qf3usvc1sb86x1shfz0g67igp2mob1dm42n2nl2hxqafgqigw9op5iyw47win7x1adwj0rpmdur2tz9gbhjmllhuni1h7867wm1k4nmtttb6nkb8o6i9hq4d6xzzydb69eq8oqy25fnct7zxoezabepwkd51xzenhhu1a12aub04tgytpr889gkpworfwszqz72fwrrfyv9rixayky9xj6fkdai89c011i1erdoxgehsxbdwrwaev5p3pm66dc3dh1vdqecl9059yiegteprmsw4e5a3sr3jew2ziog9vpx2zyfehjmhc77tniqdsjorqh11jukyinwmf2cnxa1wqu4z21o537ff9lk3dmdq12g8pk74xv6nsmtonocy4x1ryjbmkr6vn2po4sh07eh851b4hx352945ogrnatj1b8gqn7riz0xlingfd69pvwkpnzresppx8godhy862tmq3zvnxu7g2yp70ric7czyf4h6vynw15hq2927lx74d8rcjaxv14ldvtqs4ibcmmcgs7wnoa3jipo2qpat76adtuascu5z1mwcp0ra3qsrj3r9zwhvasjhmj9ka81xltp71odtra84craxkds72n2wizi8viyen131nulnde0gndig7gc9x8576dgdqti7p6f3oqrkw5olszgfyvd65a8ocmmym0bu455fsc4lm8ll7hg802ko43oima2ckrekxuid6nt99c1v9jirwiak56rum83i083tco0a2urx0xgneeq8mgd2u1drnpfqlutbyq4i6clmo87uewq3lzqsuee5m4sex9knmwcxnq213f6f9xy9n6wgs2m87myrp4stir6jccjb0erhd4i7za1rz2c8ly9ktgt73cwfhrp5fm3caf4x9rfx1a5uooekna1pv5v8ujtf2r3hhltvh8sqkbbd2eeotyawho9jupd2v19hu93pkg4mejyr29y7g7wa0tsg05eig81g29kkbd0tzq7afvh5k6pmo8k5d0078zse8tbkv6nupnz3t6unyduls07r9m0n50jm6jnl5zp4yh1ybh2jarogrzqgtbi39xzt6yoexejx2na9mq4zgpvgj75aj4f8rqve5c6xligsf66eji3ss2evpuh69k9bb1jhsssr39vlyliii0lijbzpsn1lhl0ihkkwx6cb8licapaveutgrtzzzmft2ks7jz22iq64p2d4h23nt1bd23k1q7o8guckwyypwhlozydizbljvwnduy7tagoynowjow2pdt6n6nav9hqkdaowgb80qzs3qcb54o6cykmbli67zortalvruo8lf6u0p9jarhcd3086cim9t5xeljhd6km4t854rs7sunnaxrxzmi6ohbd9wgd1wl1ie4tt29z5jz858pgv9ee5aotvy9eoncxz5vlpw2i',
                redirect: '1965u4weomznza0yona7ps5h8eglfyfstx5jt68m8ett4ktwoj6zvfhfjy3wquw7zlv8vxh8q7dgi1u24zvc2x4hccg4n9ki9m3e3cvp3d3juegkb9j29msi2l126fd257ku68hw0evt0ok5ryyzmznp9pyaf94ujthrvc09u7unexwqt8kko8a5t48cwkz2fx38wae51xccvdhm50okmjha9a3hby7zre079e4w27d9b91l5rx0gykur5xljobaelk3zzbwvixxrfvs8skn3s2lu06qv2ebjjm09hwfb13du8lb7o779phg8gl9tl4g5rqo4wz0wujfkfdl86awyyaxomdyfw5mt9mxw9hchvq8q9vkky1n8en29rjzhyq8mwtv5514yuy2lph3l81phmqbpr6z8gj2uys9iuumi42q39ml1wwq0uczt0yuey6zbowrmxe9pqjsnplis9r16z8iy008nxablzp47a8n0h2l4iouq1v4vdzvh8nyx4w5dynzqm8wlovr6o9mb978b4ghdj81dz4alwcddotvlra6mraign6bi042sre4373s6mjs5z6tf41qe6ckk0bec29bzxhqyuh0eg05qs0wekfftqjvi5rs7zutckebuh1y0y159ensm6ym0t5f75q6z1v3wj2l19c0qd1udgb0rkc4003red16mm6otfnonyt80buk8xht0cmnit3nknvxc79zxk9t9qepvbamopc50ikq7nmlxsb8qgcar1cb1rqag3yqpbvhcm10feejpuzdovo73j7zx68k6la8n52ru5wvhdq4punsifu3pce320rxd5ixqd9naay7ftad6o1mmplsohe5xfc6m0bpzn5dkeqcnxmfmyuyglf93cib79fqxhiz2f30wu88twm1lmnsp48yvh009id7voob8cjm5nwn6bz7hnzv274txkka5f0w0hu186qmqnm9twu9jq5ohd3qqcha462ryk5eihka9fv9822hyfhkjqfdlfpcza2e06uih1w8gw9s2ifcoi9au0t1rm5gsc6ppwi0f57su1muz6fiiywpd506mkn9pkxmkdwl63bdtvnm0dmmjfe86i3uhsmb59v2o3w050lse8g9e15pxhj8fomkiyo778gel8yxclq7xbqw4hr0hef8lx2w2ikoz6clgy02dmfmi6sht72bejiaumoe3d5hlre3624tx3wsf7evtemzsqi5cfb3htjl22tkhmmwnxns41y6t6c1wb97jblkdrayp7oykh9mmndv3vtjgxsjas4a7v7ginl6sy1c8r4xjdv4dhj1ybfw3ad1g1tzrnyeav1i3r8x058nct9qbasrwkzns5sfkau0xp6npa0b17ha6ema4qd800z1js0jniqwviu3k14675wp8n6bsn4gcccwpn7arxehw335vtina6gsnnjrpu5hy52k2csaqire0x1i3b1hj122x37ngg0ji48wv9eird1k74z9v6ydvhqbf0i39ghzeh3l0yblbejhetcbnzpxmr6kxo8qi9glnzqv2a18ipzv7dw8k0oyn5kn42zdwxrly998ddlaulpubnr45pft1iuvjget2wxttc8ekbnatl6gij6s7rzqphcm89ohpb78zx0abh1i4q1xmnc06k4mhp49hr6dwbbie7ejaat8vd81jcwnghe6kqp8x5vwl8j2o2erjvxy7zxy72oi01gifwqn9s3jmramvoo7uuuiij1ss5nvh1ofn8124yhv9lfrklu92rx82in2y7dt9e9pzh8njfpeup65jw2g0696f4j0yieyizcjquwvoutuirq5hrtumn52eulwi60l6dda2iipv10el15kew3f15pfasjql2k3c51tnehmzevjieglf42c404njvwn9hbsf76lu8bx3tpexljm2lfcjuijkseotifph7mtpuej59icq5ln7h59z9iii0jonwjc07vesw177queg9q5e6lnv4npsapy428tcjj2igsijkiraghqxphdb3q6p3tcu29f',
                expiredAccessToken: 6573643639,
                expiredRefreshToken: 9884842407,
                isRevoked: false,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'PASSWORD',
                name: 'uno9xqksq0iuzvya7xchti7rr3b943zveiuh9pml9zb5uwgiu9f1bzgu9wqzzear0ehdcaedfwhd1bippllu07r4v92ukruel5hwtlbs9a8ogibzb1lt1a02uzdwzrulf94kk5p1yy4kiw4wtd63dnxo5po3kc83o5ntfk9l2aetwr0m8yhngd5nb5x98p02cjppb8o9hvjmpbqegttfwvujdcri4on0f1fng2bfa1c7xw18xzilygk1a8vahoi',
                secret: null,
                authUrl: '2gmdpzrxq45h1wm4aztbicu2b1k17nx01pgjwlxrlsdbmpkjmdv0nzc2w7wdb7upugyl08bi0nzi1zhcrwpmsbqc67y96yoa7rjhck3ibxjhpnj78t5pvm5iqq9ois7rjtiyyd5oehk348p9e1uj3bochvy0qk1os417q9bwu2ei49jwqswwomkaby8l52mrtyx9cxq1loecvb5ixjjsdzfr7ftd4bx6d7adso3zsh1a95m7hinndl1kkp7ktsg1djrqywzc7i0zpgof15ricylvy1u3cgxy5yh0mpotii8h756286s43ys0853c4o2zlkl8a5miwroyrttw6k88bixj28j412s8154kqhq4hfv2q1w5rdc69q19zzr2owtwpnznqwky95kgxzc6sw3ikk60jpizpu9e90jt4odsqqj3k80l70mwu0m78vfr2hvckfpkc9rcob08t2fcx5iahlfba2qzd1jnps0jg11117219d9isn1rh0595ia38w8nurd7ew99j1a2r9okavxjukt00spu8xoz1q1lextc6l9u4abzzanujmwvwll4yhmp6kxxrr1fc9lgnl4xixds7mjlm5wfp088ymmre7ynh4njcxaxg00d9t7lfo9g88c2341pq08aqaf1qlvq0pcjfwv8z05mzszy69zdsv6zr25w9jm4sm9vuzjuoe1dfj7khaeyu1qkktbj8iqpppgogrxldsd9ramy4ukt5x1hkeu5ff7oiadbrx5yarv3z8kv6jhlmnn6qw4q5rrcxn8c8slcx1g8iuc8es39fdznv77tul1pr2hhx9zdelb3d6ud2gfdu8tsufgd7nxinn5qlifufalhmthqc8e20c3ogdun0rjh5rn9z3xzrw7kvemfemih6whqk4s32eb2b0cl8d4i47ttewfk1oup091w0fttvdh0oz4x6bt53aljc5thyv6w1mfgedvq2wh9yjez8cne5uqyyi0iytn8j7h9yf02mqweo5jxawvgilitgwfj4emu3wqr9g88edyz04049byrkv9yw4f7vabpx1934hry173ur4e5b6o4tykxkdkhkev02jx7oahza4grcw4cabqs8sa4iu4o25gyc5vy6bu1soormx1xfqq6lf8frjujbit1uuelramak4zgh4mwbq7gi5lgvs1fxhbvlhb4rn9l48u50522na85s8nnydz0t8ug5jbhe4jzf7onvycmss6drebk763h6xtdfcj5ap5cvx4r8zfeethsw97vgel3qby2bc4zi22q2i9lditk4vx3qvlqmtdvrz6akpbx4w9btg9yntcbyaiqd0ibhg8qq6teglx8xt9aw9glcy2hxp0h4dlbtlsxjtsci8romsdtzo59xj53qbtn5p58wsq78490vpthad9bnmdqksmvt90wn62xjfmp30cf2aumkn2a8h2cbto4lrc1kkxqd4yff4rzztxyfcqmot84xa4b7hhtt6lz3e1xcv6dc2il82spwpiroon3m8yeuz72p42t3adnq0js28a0boebygrf33ihj0w8pgcmo32jxev6don0k6ldxgxvukojmq8xkn2pblp3eroq0krcbzrr48nuhks0w20gseyv989i8heu4jl30z0ew9zjvd0oku7zap7kh64r616eyh2xarpi25psar6fczennosbegv0txur1uwutgwcskyqwm8i3cgevnan8tbk3rdm9yz4dibazterprj9n0szioi6gl4j1vy3c0spr9t0d3hdob1ak74sdunwca08uaoyzw1jfqjm6yei1o90djtey5qkyqmzu87uvhjdmuilueyhqf41jlp12qjegupz1tvpp3vk3oj7f209qr4ebop4ynrhqccu59g8qtl49w2sody27mzh4192rlbv8cjxfs46yvmqso2exmyxvr0t7up81e9ki7vebqbqlsxnrrdtl7m54u3699q4gc5dfo3961y01q0kfh278mednc1lfdxzzh9zupziys4y976u2a0kpiaiu77w0o615k5m',
                redirect: 'j6q17c9q5qcnn8nedrou2bftk8zbcqjkzq578m0ajh7hsarflj2jbaqlm7fg2797q0z0i7et0iruvk54x02l73jpqkhurd7pzw903x0j4p9n3hmufeyxcqdyz9fjmhdwhzjrjvxpazqfq93x50649de8ahjjnmn79hsora9u620igg1czdqp5lktjo2d478cxtq2f5bfuyuxmbxi9mm6otmk8wvt8i2991s78t1u5q8i6savsqtqf4n9889c11ijbbwhebstwhb4guujdn4xmhgg4tnkizzijyqd2v7iu0cu9hqry9tqmwoka1exyr4djldme57ejnl4n4m77opwut6a8vegyg2na825jmermsc282zsi60mvm0k86bsbmi2kqdiq6pc2l15qs1vuhosrofgb2qhxtul7ilwk1v96vtrs5jlt6vwirweuqyumvfjk1siasj1svzmf3jck6aavg1pasrztt75uo0h05lpvnacu2de8ith1fcdh56p0wnf7n2qb7b5ufo47hkubsllf8z93yjj215bckttk5jrvgnvjgyn06djvisewyimekwjz5h9m4193m5sdg9nj4brey0ybpyhaugbwpgfpxs6hkok7eaw37bepmovyha1hfvtaf423h57d342swtaf91v7u2jhby1mqpn0o3snueu7bghq9cjiklpml550ia7f8b74uwwx6mx166dwq49m5agbzpeczldmirswqru0jhl57r5jfhesvaeyzf2d5sxp6gnsg39sikq42ot69co2analbupc9hhkymirb4vnxk0pj0t92w9ls864n0qpunlw77ffx6f1xnx8qovluobi8cbtx9yawt3vbhy2bl9zbvujcrr94rkii0ttdd5gwsu1hzomqa0714x364xvu2ypxjtn2sccsyv9x5qsy462b4vxlcr0q3cnjviuft11qtaypkac2l5m4btuikp3avw0kfb33zujtmhx8cox7eb2879qi9aapq9r7cxy54nq7f2k5495w87q854y00p1d78qdd9covrpzy76vidcr0evnvoqt8wod9llfzz7ygrm153qh1pq0ceblr0effg4wady3wu9iglai14h92hmo96l9q7grjlo8beixo4izla3lcp3g913whe6yc3qn2apij7tlras53dd8g79yesrsw5uh1r943a8drv6j4x39cz7dvuzeybxknoyhsb95wug4m9siiwq1ziiszb5asfphsta8pafchingtm0plazmez2pqtf3q8d07kzgldz7zr8lsdzlepumpwcu6flaw5ldduji69f78u3w14nohgh1j9borw0f6xj2a6v0ppq4jwx609pktb82ec29qpsp5uleth9iefmq3epnydv71oaa7cota17fi40ihduxe46k7wbsjbnzaawm7fb42una1r59cllqju1yz7stz77nq65xa88h2zbspq8o5t6ls5rsd7bcbrd98qcto0hhxd3p6ecwoubvuhhj4na6bk7v15jlf3f78ih7ac0avjqar2z4yqs0tpsj0btq1p2ag5egr59tp9xwfyu58ou5ivucn936jq98urx7fvuvdcdq4rx62taoavn2kt2j49vy4j4ab3a92i84rq88zzk2oerlyyndy2lu3norv0qsmo8xniunqm32t4avkhc7rtupi6dyqu0i2d8b4eo5p9lcbgv1q9z6tcsxs48i0vpu1dolv0zyfjffin239ofwn22qo2xfuf3cpmwp09hdupd8aaunk3y6156a5enupig143nm4c4tw6ejc3uemdghzp0zjoexhg54zhr63yhex9526sud9heul6pkzuvga43ynb5n6w410yuu5vk9uh0glew686paax05u8cz0rvrmzy9gys12txw03tc5swipybfwzd38d6pl0my6lr48qknfr84ms3lvl6ky3bg2vak1i89hdyh720a3i4qfezwj43qpccf1xsbozfnytu26c9y3f1hn0im3g8huz5czwc6dhi9ldczjgoliachr7w08d',
                expiredAccessToken: 8715172258,
                expiredRefreshToken: 9618684910,
                isRevoked: false,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'AUTHORIZATION_CODE',
                name: '4rzfw7fpx9j7bu976if0ubmhd5odcv0kczic0ye5tm3n1b11qfdkzoq0cmrqn2cto1vwxt3ndtu13wyp4pdxgy3ijwcbhzftrm1s1fvdhog1r3fkxcehywjc6zz1j4kmw9jjhni08lke1jbrsvn7rqbhmjt8witvm06mj2ro58dqgkp0pmtj4iqf65ki057gjxnrdukn5pfrwu7xa4aqokrma1aaw69oxoolv4zesqs01m8sqfm4185em5aey98',
                
                authUrl: 't87vzqeppgz6utwx13hni571fv9k0rk0y2w3lnpny6u80ob2tfe6xunez8lby191pxznbpb3732rfbfv5q1w7zwyjy1gybp2u9eev7wtu06029n5dmln4m1v1rubjc82qfe8cadv94di4pm6ik1oylenr0ctc33uaxnaivhhgb300cm2twptckxl7vqzotpbxqn8lcf254zx80aq7lr51bnk03y4w3mcm6yrpf9b7l1m2eclg288ov59s2tmxgvwg9x5971xgpr8ybxcfbm3wocxs7mp4cs0i1as4fljpzvwi9nmwxoft49r39k0ikn236syb769qpfzsxz1jpk32vbtdh5p76wtlwt92fwlmtnovlhul4wetajfp271zz7w4lscstdblezztn991njx5o0hgh4z95dmijc8krq5celxeubp27utom1dyhr1i5u4sbav7hs8dsv3e1levhxtark4s3i4b8zcf9e6z81cvt80ic7dbgvuzbf79kq69aln1ur7v65yauw9efxe0g9szvpoomvojp1pkbunqi1u6vsp3jcaxpcqi1uel3fwg9kdj54oaqh190r3zdtcvfzyl3oab0g66pt2yw0wu7bp55djmiphdk5az3gptvdzn9tyafeubsxghm257l2bxdktg4k60g50mv2effzxlr6udexh6bgxgxhbjsclpmxugpmwullr0rdccn4uz5juu7zmw16ff5brks2kkeyrfrf1eka6vegvo9eootihp9p1qu92pas3sx8tg9p57skhve40nvzzr2h2rvl6xoco7q0acocftl6nst9d5fl53s41e8ft6nd0vqu1swnr1u7u8z56fjp42xea0l3yv3npzknilpaujxa9ynl8j1kj7v93qmdbxzfnnwjdpjzdjvuqb4ouxzykfskbe2tt4iiu9m96v6q5i855yb5353j7b64nn0at1acw4psdkevxeji1g3smsc28sbqcu9kxzhmzw7r93yeo93eh1ryy3pokklg21p4xi2hs76k6qv11scya17hjzv9cqi1d2cjpif04c27ghx7qfkjq7h09ca3t4xi3str6tadxldl49oxi6h8w4knxx2340r05tlpkr21cj2040ue87mwccjse3xqswj2v6psz6hxehb6nam0mw4n93aahz3y6sqvljo0t6gkzbmby29xfksc1xo4898ajplg9l2vbciq9fehvvmmvvzmsqxo8zl9kchnr0nrdibn89p8yaura67fpjy3f14xmkvyouh9qq48pyans0fz3snkz5x04a2xck7j7s3cry6sonyxvk9p02nqb1almameqcrkfkyaxnxqds5wpuikj89tj3dlv85o4rch7l56i76c688re40e0klidil3pcldh6wr9wwky6560zwkdj66vj9ajjjpcmao1b63ita6due5i8e29q7ta8g1h78p4rvzsj3pnac80isnx30pnrex5qktg0j2sf7i97q7lqf32987u1q54aw7v51rj5ldwkjlkrzpd1iazgofuc29x2ezgjb2cvqtkzorj93x4ltiam3zn3v4scz2f06u2ivjthtlz8cgidqbi9fyvu62hlxz54zs9qn6tkf8wa3wajtw6558oq41l6of0xlk0cd7frdr7chzhb6lhw8quaw0d2b9h0qjxm5uv72vhkt0yeorif9u7y7xb4jpaeajxuy574d5mkmhywa3bwyofnhipnaqe8npdgl9tv3ocandjm07gloeni22wb5q519sn1hvnsdfd96ul313xel26woqq6cqhrmyqeqx5hbsk2wr10awhfx1zflf9ughgnuiuxk4vn6ioddwlrmpab4mnqwtn120tj0o7r80uaqtsfe5lvbovoe1dzxv3mc3lsr7kwtmvdh4m776azo3k3b7vf58o9y0w60fxoaatw9n581ckve48x0fu9knk837yb1rp2jejkbi2o7l4n91wow6thxg30sr81qt0macv9owrv3xltaplvsgnax14um7htrkaxcxbgwtefk13ki3h',
                redirect: 'gn4fttqrluviwxnpxny50vzvvol20j2rng6lt0i6wojjq8cybxfr0qoc5gh9ls5w55ao4lzttxvbsmcctvjuc92jc0nb4ko0npn0ag3cv9yvrl7oz6bqmeaa72ezwjlr4qgmu6atig4trwtaympdgu7ewig42i6op48otw3erg8hf41h0duyqulbt2tudsiapswvboopij69pxp4pg6ukzx8164gshmgp4ihqt7o8qk4lwwhei71apdn0hqeoq1di2gz1qodeey4nv4rfyxo55wi8pwp46n8yhl0m8q7faf2u0rpgvxla1l4fob9sb4wa5576cmsxso8tlz5yb7oxivnpumbsif633l62aculgcr9qitaovtwqvijw13dcg6go683ffmzrpizalxkmb12uezrdvekslr985xociboh5r6flj351kxocmpg2btcnge4zid9uu3iaqueue4yvp76kkmhpc8ikn2fsf2sxihw5t4ymi3orom6g8dw6tdkyazr2ul55s3z9vyplcmjx2qvh25w75e1js73wuctrko6xtx4w7706rsbvtd4bx6bhcbqrtojspddzvyldv5jqx294t07rssgjqk8zj703bckunz5efprzb6270l8g8jlqcaiurbb471r1zl3b61agulhv94ajfjn0qjqk9d75kdltircocr55j4zt2lqhkdmf2mc7nj6rmlczyd4k1oel0d4qftohihphrcna974v6zcseplca6zxsosh8vrd7axhextf18sdic94zjhjpwima7qjcxqc2e92qwq2y3goo7zdf9jki9sjyr2jejr4gmbz2p3fz1karmmmda0q0gnb97elejl5io4okajegjry5wt0ogk6pv0zsyhd7fywzvkzrupsmn5sthfd403a9q91mcyffqmj8hrsnq05n84a90vxd36l1ziamkmwwbd9dcjulyxdlj4g2t52leliot0a20gke24ttkwgttvsrdlcs0pa9qasra5o61mxhwhqtn8z1l6igputpbryxq4e0l1iy47bikq5f2lhlv7doch8x99u5ewczcshg1fk9v6zv8we4o4m888m9paklqvwwn5ustkcinifb9whe74swrnf83h11yt84nvfjo4q5fsbjadyc4fqnxbbfiuhcusn8d36m964dam66vzffo4kdxn427zmy7xvy699b8az0cr1zgjcw0fsyhd5q812get9n0jjjvo8qv2vn0wd61qpbxi5pcrtb1b4cs713avo4cspd52mcoxsgghyszk50xo71nzt60z5gdk8xu896ecbmtowx1re39vmcjq7a7h2oizoafjf9lrrmg8q91agkm12xebmlqh932e1u6f211c6wyf256a2697jn78xwwmfv7pqcbgm2thmelo5amtuokhb8iumfis6icp32p2ev89p6p8lsg4h1s2uhwjuwsiht0s4ep16e29bbxwdbay4hhj5v96tbdnvtqbcjsev884p7uuhme1794tb80aaiwi0ct39ym338w08tuty523ufanhw1hcqq9cxtskyuxnvcg9t71q3rsctvtclm6q0236dxbf1gw178l6hekxms2yrjri9aj3lnr85zmisgn5l7c23lq4ek92u0cges4e8p10s651won9d6nbj0skngyodjai77w63cxbf3jurtmj3ruvqxruagr56x8f8pkfsouwu77qwpg8aefzyz2pijogthhhc4dwcpwz1wskf09sk5ou3ccoig174v967ihxnyrrmmg0epg4ni3nyvv23nojtvrxoj7uhh71jhmzl7m37hip09qdtetbtq674zsqfln1n0vjj2su62rddfuh2tl1stne90gims65rfntspuwk8tfc2wsqx7ozgi9b9ik22xbor5bp42s7ga5higzumpzzybyc9l93fpkr0nn2h6ckxfr1p8e0uw3w0gx7wgml44v6jghjn8zsyptcnwoyv1yk1q2ag62tlhu0sdtcdu6k9n18cg2n4ufqxqjwscoj3or2yg4xg8r4',
                expiredAccessToken: 4682070688,
                expiredRefreshToken: 6059670899,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'sd0cj5s0k5a6emqr8xoahov9d1av1at7abzfk1ucmuc7nrtujq6fjennzg8vwps6664m8jryi66u0qh7psyu1nlqggo47lgod5pxsxuhzr00hv4a5m2hmee5pai1xzbxpiuoqsq7moubwnz96kfncs61t9373b6gba7hm6xc7cum757aj3isp80rfzt4s2xnu60t6nmhg6vedfd05wyux9bcz0v9qxapn9b0h3tomidwq60p60v7l7q64chwhzx',
                secret: 'dqk8xnze7ep1n5lue0by1ieikwikhzh7wpn2yic1u22fd66gd9bb6qg7s7zfh5us67fn1l656igqa9wl8euy5dm73q',
                authUrl: 'lj03p2pn1f3srdvxwzti6t6b5yap6bdzp8ugrysgqbgw1rj8xxrtps4guk0ggf6f9rft5rs4wuzfcktddst3qwxl3kc28e4vtnq1ee7ge2z2z0qi8clyod250cirlwrm0s3614bwlcxp25gyzecj756tzypu4teduplkh9l33iqn1oda1typf22nozccdny0nfgv8w7ii00t8cbkgepuvirdbj8q4h7oyvcmv2hnas1g169c044o67hvxvktv0tmk1e5npjptdhb1rfev6oz32w1kslgrm4plo9nild9htwg9ufv87j8zusuib7vci0x476xn5rpvg1wq899r92gpx9v36wuyzdfiqjz6ld1jbpueatpwde06g8n623zr7tc4ven5odgmdg8z4q022bdknkdrfjov6l9vrwdfgahvdl97s6v794do2t3vbejercv2l4zkn3w63r8jnr9aqm50qmhm00e073bj0yt9huy6t7pa1pcec1c765dc83kh9r3azlnxh2jwyuu6g1vevafoahuwwyhq70f9ccb14hjjesk2s7tknd5ut894d7lm4ixk7w9822jadernizxz8ev6ut67csid4pbm4x57ndwqg2qrubylfpi7g1fmo0823sin78c5dsky804t1b7lxsmx8bdieq3k6zw6xj7z4na09go88fbazcwl6lt22pxqw6o6cp3retgrb66l0isma2kuig8lvct47xm2h7t9cfmc1f8vtm8df75ejkgdxfneawhb1526kp81cgzy2ggzia9bvv4o6v2zrlhtmrfmqhtrtpvgj8ebwuc3xe34a91hc1hfc5iqissmgjdivw5kq9r5bqqvdg1k25px1so13sh662rjf807r6l5p4wjtnx1udmmhn689jiqe0dtuserlz5z5gn721hgsmh62mrpghx4fif721beclk58dt22gbhrli11bvizwim47jh3gtuwqs7yqi2yb5aix8crfzb9e87d1l2fuyprij06k43akk0qoev8ynyvq9i3grkpqy3iqf485x5p4o7qu6k03ljnjaai9z2wq5xryjuvrghd1x7s7phntpsigpe4bsrq61eia6lbr11be07hb8zsauk3ofabqw2cdutptw2025dnqrrpfnnoky8p5sj8ayus7i58nmhf2wqebeb3f061tt9p88dwndb178g81loikpcmmvzwpg4nmrbbn8thv5dz07zaec2jw79zqnq05uio4bobjd238keflrgcjxvde7alz74qwp4tg5t2g6jih8836wsou2xr0ct4pd9dcmbjy15h7p2uj1kqwwrqaitx92gqohqnmmend26p28ap0fhqgoizicjax2tq9suu4abivcjbvdui2oz11zr7s2iq7l425yn02yeyt64m3qn3oabfy108142pnkbheo3nsyoak1lzh3b14lsmdx3v41l5fnkpaojwwy82h3mpdrnc2z7efwn6w8hd1s2v0m88mfs60ublas82c1hl53kocz8yaw02wqtc4i4vle8f9d5y5i2km2d5fai1xk0l52dbknab7qqw0b042s7zlabmeyl0kyv59j8on8nzqv0j9fjw4o3tawjm40t8809dd1zp53xk6swgi1t473hs680tlph8soan7k3k4rqpam3mqv256870mgtk6ypj849gp6n99ad7o6isu6y1xiim5htuwzmdnilnvtv587azoyolszzrql5dj2hz5xhawjbklpdlhfw4wfva3cp24ukxmru5jb5vybqmqmt88za0h14hakfejqqcupcixd8eab9piz4uecsufponjvnwfs96dji5yop24k0d4naeg5hv3f53fj8fw6q9m66wtdbv04j7usg4amivfyxtdh3cxzocx4n26fmgli9ba4pekrlgepxmnxiqysjus2d15aigjtdj5vujnwmslavvo7x9vexumhbdxkizkc9ew4kvamavz5phirxk70arbe23oj3qzmhznhatj1dqoog8va37eand2w57yyyq1uqrmquikw',
                redirect: '6gw0az00e20kzlg6uvir91zemfs5asktf7eb32f9rfb1x4sm7wtrnb9roe702ky6xgeejoh72i3a37taxttd5yt7nun7t6m6zm5offzf0tvf4v7w0uaxv340ahf9rkzykp42700xwc0dpntdlqry8u160rycsitdmgoatis77ykdnffc73gq6kkubjq0qzi7mlrnyj3k8lskliy8lozuad9u0sojgyg8cxyrewbpjn53vubwufsh5yb5bw75oy06y49nedpcqfm4ygk0fifrp50mlozrrbctkd79qgm9no15se216m683hiad0unop1618pw0dty2kak907wmhpr26jengwol6edcjk823wjf5uvo5czn8pg8vazouyw68b2sdijezrkep4s4g7g9sg3dgiflc8j84bufuqztzuw7v218kjn9n59rtuhmztxer7c3c1fbigdnlm6tqdbj9esuq6bzem3dmlmov8cg4o3plsdb93y3yn5a5wvjnftn9niczz73k91ytt5yy59il4ujqcyi10l1mdurkvg0ce4aeqrxmqdf7by53k1ygocdyks45o5s1l6nxmoj4a6o8s2jfi77su5vy3nnyrl1qz926wgsd521ecuxv48t53df2wq7p4l6nw3t8di3i1i7hv0rs4scry9tsynotc8c8fc5wn8l41xw803i8kxnk1cmflrjhn6qysofprslx1e3ausckafaxsfomhxyo7fh9738pqsq7fbynxz4hdh3co83swxkgrzdn2a98qnk2rg2glkb49sl0hg5gq7406uvlzogq1akm3blqyzwtahitawsabpyg0r6d2i7mojvdhmqlhrv9mo490140wlmhyz96qco3j3azineo3hcme25vmvarqw135lkszyotaarh7gbcyzfq3a0si7v3jdezym03gl18naraxbtjx9hvo1gwe33f0pi9wvikhdfg3io0frjrjlcyakhludktik1mxrida9lgr1ydp3ycb9v0g1t398xjdsxmvmgxkvdnlkaet4absjbf4xzz9oxcfybk57qmt3wcijey0vnk2xgod8o744g21z7g1mx51h24scznap2ku2yzrleqs4icdtag48iixqll2qlv5j4zo4t2vtoxk1nc52ekkchzmgq83kae7h5nju6so4uwahd4t4dtjvj0bctqqei00x7vc9plr2n1shq6rqitmq0f4dtwe1bkaeewoqz4lf6lnpoae58hmuosempf66ldhkkod6o8mvsnytwcuuuu18bhalik4f0gt3k376f573zbydagi0e2ym102qyeba87efvlq87miy4xy16a2ytqy2eu41lzhb9i5fd3df7f1ffrwlv9jzm6bek19cze6ifenr7tio1avwb3q1r46gku9wila68qrx1jha95eu1h30vj2vf2hlpgqfmkhqvd7u28lz14ixml5m0x44oa9lluzi45dudgax0wmbacxhix9pn3o5t81gqlbsai8jbejqb3s9qzxpenwwj35q8yynf04vv2j0t4k5wgudkk9lo9hmwxht2n90frmk15ip3s98nuk1qsgqb9sy39yc4cectwo32k3xcol8k0wb88ufif4z6csmvixbl0uhsdaoccdiuu55p5w4e6w1cegd4wx9r8gv55ec2vbz19lyn8uce7snxg1s3yifr3m6f1rtsk2z3iy43462gsi870x59uxrw04cmzp1krhj8eqx47qhdo2wo7on8n9yz15dpf2t39unga0m1baw5dn1l47oqcd2kjz1ntab95q36omk76elo9fjp55prgzfagtep9b353enxoxy9gak1alm4w7dcynizkg0wbh348f2lmx9q2ew9xrem8m9ziycaug918fpgae8oy27lasdt2yoxp4nyeusyyuzdiinq5sfw7y7ctmtwi0u6epwo69g2krmil1df8wae158zffmp9knphdowije0k13av3bk3ntaouoi96epxcnn9hmxnpdwx7zr3sbk25pqlwljwbawftrjlu4ye8e',
                expiredAccessToken: 7959511556,
                expiredRefreshToken: 3102872748,
                isRevoked: null,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'r5f5okimhcl3cghde49mqomtrwk4tla9sqjwuobfp87l41gpxkzkwi9ca0a6bi2g1i58ga7pyrkawxqgcibj7opsw4xa32hmctlz2va5ib84hmvt9a9uujzedejmfs8fj3p7yvpftjofbmmp0i7t90fl24r49hwbn4uunq4i84c7kc6hzqtogp4v7rocqvther06yq5b3ekz0q1t6ij1ntvta5phxktz6gat6uz9pknarzoib0i6gge8bfzoy10',
                secret: 'pz0ppahumd9c2bmddp5o9r27p8kywl6krh4zlyvkni43qav4hfyswtob89j4t99txvzbnecjrgjaxkgoxrj5qxlrya',
                authUrl: 'dll05k5pmugratw95mt80u6gb47uq0h44hvgwsiunmpjo0jfwb7ii9wzraz9soj6sknajjhqd2jeaisuixa2ta10bfngmdf14oevdxzx8dp0yuebihwrnkr6viz9f797s1dpk1fz9027uzkt68l2a5xny23typ6bczen4w28jril4ornc76ja5utohnup75ro6h3bl49ojfhsycuk1qk0le55ebkk1x67r3n2wtwmydlx012phq812ww6p1ahyzq53v6pi48ikfxe4am7r2c2ncc633bid6zv97r6wr0b9xwq6ooxc9n29hirjp4e0tjv676eob1qb2c95zx34243k7fkth06mx3u1y2uvhlryhmimlrriag6znee59v665pf6077xhrd633uv2zuzkehtz4wxzeml2o3kmut4oinz19wgvp1dposr29x2t3ifm3bvb2vnp1u4spuzh2jh0le69hz9r84dwwc61736gozxincx63kvsf55uwrw7e79lz05hwn3locnobnxdf1u19vj3scuublmnqrlm5q5ney4qu4412hcjit4dazjs4e74hnfsb8izk1ix3fkqazh05t2le8melugey7b1xb1jl7msa1ivvhrydco0q3dafhuj7etx4p6vwk5rj6han8w85hrt33qxhf7mheyh3idv7kidw0vwcicqorf3lodvw2p7ekkmskd439uj7zxd2imnzbk83v4r2o9zvrpribq7wbnhsrvdzh952b5mlrm4jsnnh3b0sp9laj6msfoaydve5iltr98180bkaiupswrgci723tfbv67ugialkypwls0sklwdqpvtavghbtt3ln93i3w6f5u5s8j33my10nnfwalwzzouo8vyk4xsjexlowpqroycmgauz45eripfpk9z52jttnic1xkn6hlhfi6x25uzaie4g4ahl1fqra1293ys9t8upctb4vvdpwrl8uc3j14fxr503wtn41ry3zakb9ulga64a02o3suclvqe6v5oju93kf6yj0jza4hvdbuy42rh8i2jdj9kcvluuowc7ablkyrzb0fp7e7bmab94yx99sgkes5tc55ohclseifl8dalhcrdghneb3gpa94v518gxdy5b7r8bx4yz42lgukzwrd62bsl3zmd3g6080iz08asr0h58h95f15xajldvm3shb77l0zxqtmdlz21t3aftfxjdixw5112phwh0zr1jstp6gbx2zud4m2oe2yxhcd5gxl91e178vqotzngi1ajnwrikr1ni73xhou94v1iiv58uwpkjjenexdhn1zn12gtikvdt4jls5oflzisp1f2bsyt2c2aai36kenswtpdqhc0z86j52o7ywcq3tku3ga2smh2lplkvqa8gicl4cg29pt206nf9fpxjfyfxxx1dohv1abkn0dsd8c6ejzfaeybp1zqv1f3f25sqxeg7nkghunrilus0xpkaec971zidso4c6f99v1ka8enp0e32l7qs7rnh9fdatik1hi73o3q32y9ebttqb1n80yogwlzdgdf69zobfshxjze6uj91j7kv6xo6ioq1om1tr9rwlue0upvfz49evvjgmbwnpfxtjinc05t5kop17zyh91bwm5c3gdf83nklnbv1tu74cbpklpc7ndc3n0tw1c8lcc059i899m6bp4vhtosdjhpmqfltvq5tgg89ao4vqvhc4gu888rjz2qv17levthd2bcpslunsqne2nfegefzg5iiq4vxgiqfjgiza30etfn0b3dxi8df6zmp2tdxedr6zr70lgea8twi9qcd8g3ot7yad0ccgj4j6sq1ap8e48zya3n6pwpejlqjqoahvy9g7h73z2o0f0ayov3my8pzlrsyd4g7bcnuw2f3c5jgb7k6bses84geqghoqqb5w1mb42ymf7qjx2ik1zx6u3u0c6n0j96sr8etkwb59jjibj0v2x3nm5u6kow2mpobpypoy7n01vbryxf3hefoasfz25a6dpwbnjf2vuvi89fyj5uvojte',
                redirect: 'hoh3im2ve69pkf4rn8dxzhpawlsk9lnyg1xuu41y6fpvx86lhozh3s9zcfrm1cccwijpon5eliekm0oy0bbwchpgigexk94914nyreu5jdf07s3cqjchqy9p6u3sqwezmmkua7xm4m8k7texk4sdi8usdmt0q5hj6vld1dyebrul74t9m31r6a5hzde3nvbrgo9ecv8vockrhq7c2r98b5f4vq0ivehhojfw399usjph3g00t9mwzwte1qkuybyndoy7dheih7en8ulu7l7fdorlbp2dgi0h10tu2sys3tjraddinnhwzpaoo4xiccqpm8v9t75tl5g4loyfow5hk1vm3ywuf4aful13x5xg7kcvvggrh0f1wwsoai015n8yuoxxp1zao03ihqjaizc0dnjvewj66izk64j06351vl118zk97luwl5spl9gx5ud4q0gqz0vm5ouq6rao0dbcwnpuuy5jikckauml9lt2go7mldkyvgodysilrghbype7mr8485rnwqvvpcyn6zilfbu24nchf2c9zqtytw7jdk47b0tqoazam7em2nlh62k3ews6avir7xjtuea8ggs3j39nuuxvv6b1vt8nqnkzmrmnlcwmh7atxf4a0tl0vxr0j9mcmtwmfcq6wauhuel963xxsg1lr69p77lpa1ic4admq50f4cre819ri5n7mrwotnfoe5neap5uaypcg47d2q2v1j3wxpr7586r29lpoqr8ha8hkgr3smvm9f35ijw9mi6xxgg39zyhyguyn9w1v2du89bili2pv5ib4fdm62v9hlu82mwt2cdrthvu8je1g9n2oamz0xk4552wpuo10e6vyj8vi29dv6t4rdz10pc95xfbf59fgwf0mtqw0aa4qjf6fq8t4cv4o8ndy5ayzzncrpaoboharto1iliq2j8uzj8cr3et2r83g5g2b7f10sy5uiskgd68172zzajltgky2wv7fwg2rts01716rl0zs8w689j6mg4t2ii8l8l20tn38x5eg2elzffclutzkg4h8kdkln3hr2qra5zmnaoj3gq5gwqilx0inulb3pxiae0xr3w4fub2xoyhmuu7zjw67o1v9n93zogu9ub3gzrtg0qnw30q47vwnn3iyvs47ggvzs1ogzrusq3i60kzgnafw4wlkrkj338nqws7gaw1jfeocx1ps0urllq8mmfcaqhlpraaq1lzlbcgzb2ozixfoae9819lmtnl3b3pvkk8tun5kwsck8z58q5zngj2d89xb1pqq5f4d10lhsp4866lci7kr9exw2obfqh0bmhdj20df6qxegso5sstqhdl2dwa9f2telwmsvurw6ayrlsjwugpgbw4kmxi3r5c9ihs55a0yvh3urlier0n41nj068f64hrqkycl1y0fto6e1s55i3n5c5w0pf13t1d3un8bmji5c0z3nrpxmylshh4wciw64jt9cycdzxkii1gxkhbt7exry98voqxb5rbip9z5prtllxw5fq842irl6y8lmlkugbph6zd7jmirqgnj2hgrll5ck3hvmpgzvkiqrinws40n423gghkbxrsmmi605ctoiajjtuq52ufty09qy72ob1z6kmoxpvpbtmvbuwluftzrjb1s7nzeuyt5ziwh0lvwuua71w25k0n06mah8cnnei19hreczjie5gkdd7aimn2qfb9yzobepur6lyx3zkut23y5xpell16kceucqo17mbkqsxu5t4zccc2ak1tnosmidk25dos6g63cw54d45c5969lxolc5mc2gbmsucpz85vcq5s16lpy080xf4t5e40tioi4nwb22ys6oyzdpv8upcn0hfz33h5zcdh5wavqk3glrtdcmk1qp3ztnjtc4w37w620r1tgdq5jo0cc4nf50qoi17sufvfmhvyp65sy2ezfqmwn6amq3caox5ivsbfnoay06nalzd5dyepbly9q28o4cfc5o18oh5zhradjxcinczqjrb17obgq4wkqy50ck37s8j2hmomcje4',
                expiredAccessToken: 8270605449,
                expiredRefreshToken: 1187078213,
                
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'PASSWORD',
                name: '1a7frmoyp90e0pt65wt9ucw27jmmkgowo1xmg0hl81sypqe3gap8f4r7kps4l3dlgfxoouh9c3st00r7n14d8fjm7uiexnjacm8b7y2i4j3xqdm1j8p4revmhk00dysbymr18qn3nkivn9utnyxzzfpknwkupfkd4nmyrap4ifi2ee6t9llpghsjkzcgweom1wgkload33bjphcqtko6zlbnilchzgirhs6ghqvp6y0zvmoo3bju4muv8px0457',
                secret: 'xusixybwnz8lfc3mdmbkw595lrzt4qaamt2u4fvndi6ii6q1pjri8ybq74uymup2qng49o65vd9sblw3vyncxzujbu',
                authUrl: 'nwhiyauwbpe9ho7ov5n1rqn6fc2rq34m48h1wc14k2dtxaly0qd92h8v91acc9hi11fhk20f7kvu5te8uc317tv840aaim6ptumbkkkiyuwd0ogtzgqkfl9mz11e34km5r3swhn16s1mlq835bhuy7hfga6qqrgslx8k0rc1e9zuz2jxeyk4ckrpfl4jnj8ahw83mt0lpx9xs7hzg7a9xk0p7x725ag35gxt7q0mgajxnwiqy6f7k07o2m22xd1yfyqc2s76lmzbqlvaxvvsnwv0hl7cogvbcl5uchxfj75xmod9cqugbih2ydxr087ubpqekfruievt2q4ftom49ww1opwqhkwzxazol5z81dp04oohc2eoju2x61oy69ud72c5xgwfdoficar07kzs8b7grb8s7k6nq0pojg2hd77gtqgjabam9olwal2zedwcwcv2bfi8mw9f9cuoxgc9e7xi07lg7zje4zpugfj652vv5480e08ilauf7jrtc2tlt1x7e5v2cv5wv8jmtzfe1sdp6dgmuy4knmw15h9tut8ae0rmb38n7i63f6jr6zpx8dfd4vjmfapf9buyjfsrldurmyl5jk4upj7veblt790y3dre2bzxs9ex30nnw5r4jbl5pho2jb8zr8ti9avw6uxt7hqeyoxgnd1277n3a826680aeaprz104k8muir8u0mht9xhxod4iibojx9zcajm6lgl5sqsdm7o8vnxifa61mj2k6cvbn7dghrg0llv9uhsniy9p9p7j7ztlw46zykiaf15q94bsrlov2lg64apvepmflgal1uf3b39jwpp4egf8164y4tyns8jgfg6ere6pd72iyju0q2p4n83p1s9gq9la9ldwr3925oby6az1d9la71i3eqdactdxkvvbbf6dnnujq483hpdm0ta90cl9vqm61bb1jpeahz2bw2i7fm32yvtpy9bh0knj7rvhu3795a2ojpb6hmnr5jq43ppyq8z7fde0firs287wbhyrmlx3kpcvohah7vsr3e7ne3abd312c968noc2ip1shb4cxgo9wwvsffmk1zmi16nxnn041agkr8sjs4dqo3n9zmzuky7dezwdkgihd0oc3hzwyj1gqpl3y7ba2912gq6yqvaac0m3kwlynh0x83hd7qwxlfzi2nu6r3jff5sjphvj0luwhfucv655444ar65v1fbi2bypitjgk1o7puf7ie4jiqy2ch2l7tkphhiluj5ocyy798i4h0xgqctrz90f5rsk99fjf4vmehqg6f47vybe6v657x3sjyrkfvwuyev4vkwohnvp5cqpeiki8icusa687r4vxgafhpni1tlpr5c2cuvaf8oum6beivbu3yyn8r2y0s4dhykw9sou2wmrypvhmvfg3kizxqs0o6bk70bf56yec6bg8kv26may1z8kxe5bowenw33985jcqy4wcu8edh84c1i7oes5u0dzexhxdsif2p2xc2hj31a98c5wpla5lvnpa1h3jc0waftozc9kertktsrobw9arcaag714y2oizydwrscbwwlerwoyq8hmjlrcdkit6hni4jr8n5uaoitkr2xgmd3munkrdy9qnnijjpgn51z1w4x19hf0lutdlv47uayeifu0od4v2dwphn63633gto65k4n594ikq54tevlbie9aot9x3zhcvc3rot5uf9eocc6tueub1yryn7p2kkdbj9iuzqmqqhr5odwtqsk7wn9xx1quspn5xmoddj16n1acr9zbdkj6ai1pu5681csmwt92yg62rfoxsbqoy74m2k5vrosh4sz7tcysvwnd4is54amotkq1j872xt115pt7psmser2l934rnu1vgxrs4xhqyz075ybsl483jtu3a9cvh1mn58ezjmn1kxd91fvn97ptdtya1w6p6w1y0pc6psah6ecbpoyrsy702a4dirw53u5c1esu8i6ipf03eozcuc4vdmmgsm39f8s2x4isy5kpioj89hsubiph8e9g762o431d1p6j',
                redirect: 'gmmvrs1saxl7hzat0to1hsqxv2xz2imfv3ediec90pxsmtipcozfeb5ablsjtba46kc6u5r17w6wcj2ichfpjno5yufkzwyufk3m0634p5d4eh4uqx56c145s0tciepac6gp9azuqaq3mwid1pobjhpugq0sros94nc8wjqr62vgbfbg85r5lgd559nbuj87ggmgkwvwioc0c39l4ncwwu5fq09a1e8jd4y2mfgb9usxjvs3mcj2wxcaex9nnpiz01xc9xac7psf6y6k6ngi28ystw42i710zhkgtv8jb72sjdhqyx89qk087kb1herei43mm5z1w4r3inz94bq4ir77hcaobk2e9lugphe46colzvb5zkx503monv845ztftcwiguur17ictyvf3mp57kcgxpnge3oiguchxtczg5o51zettugf16inyyi1aszho5dnen1g27992b0u59theyfcu7juew2y5cw3hd146wakpj5c5pae7rjf99q6cytjhlf7p7j6ffnlfd1k6ag5v715lvw8o3409bm4evy3td66squpdcnidxhbg0vlplzkytpyjbqj3nilh4i1h5nmiu6alunsyn40clbg731gtosnb89olddqhlgwe8k03z311cqcn42kf93kln36ou74vdgxjg0aklip0saauwwfhiuq9vm3dxjyw0ahr6q3m392ps68btbtvmuu622ll0s81hrfxvhzroybvp6or3h2ovttdh7dfuapedq336z8wkvm203j3yj6wqnv8axyfv4xnhjwlbxel2jscd5bk7bo35897iyojfvqu0cyvj5lw88bl4t5j132cf56k309rbfscj5bptsp4cpx9xqc4omayg7psp7eb2klfyp4jo6edxvc18620ul5ucagcp38doqx0zwry8urqggk51psafdu31zn69lqjoa64iho1fk51i7jf3fn1c9ve7y16iljt2h35vijwi7prjdx927iwrb830m53tz1clz02e8hbz8wh0ugbnmvxnhhb9un4e1xo7zxh1mobrbigi9snu5tlptyhp1u56nuwonywx0ne7mxj25wm7zg8csgq3k34yo3rksu3fg2bzxxyb67w235rv58xk5iaxyrprx165rltdtk4ubxihpceikvp5kl5vbgj1573klhufmrgg0modgh2svxkedupyftqxm1wq2ftf3rtgckbs8ribfbvydhvj0fzeozonmu15jxeujzi1ckvzt51mwwpcko1w8optupf8vv1p09c6ec29yd5fwhv6jl2uhk7qfgstirbj5bi6kdm8izmv3csqo8hvlhmbtzjuvx3x7fmr6qqcmj08roi3zypex2xpx5dvldvpgt6oxnug2n7p7hg8g85kecroi5fujeuz42oo29ieow1j294l7j16ypi5pw2nw6do9vaygp1o7j2ith4ql0fdwyfzy9igzf8p75fkph9v69q9phrui78pserkbv6v6gyhtw7vif1ip8nlkhtbieu9cz070h6561nebsh9z6d6mv0naxdcaui95s96cdt0voh43pmnupq3fvux6ht7gj2to7yik8w5ne5swaavdvoj0cn0cltd506hrjrsjjuku2dq0ibvr39mdmmnjixbfmcnrhfzavqfyzdotud0ee2ltxww95a4qbzvxjg04wio7ujfd5mc1fmsup96mn86sieeerre9sl6hcqlvqvnqbe72apq0j2qmxfax6282bylbh04px39xu2krfs56x2a0lgc27kuw7cwt00g9zez6aeu8nmi4423pd9ycmjb9b90ajhkp2c67giajpvzb12tk2tyhfjf6lzjdi1wv2kcvrhytiwd7oan0e6bnn77vn9hzev9na5i2iow5dhqr4hjx7zc73n0cv2webhmi2rkk2dp3c0aspgfb6l8dz0ygxl62xo1l6gpycnjc4fp25ehes4lphg7pwwulnq3q4clmh76syh9mzypfyf12xnwyevc2nqgkfljo41ivbmwarfw91temre1q4nyh64utv',
                expiredAccessToken: 5417610927,
                expiredRefreshToken: 9024881518,
                isRevoked: false,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'PASSWORD',
                name: '69dsgd2ydx5jr1zaa36qnx4lzsf1f6grylics57gpxg1xl4p19ak1bstgphjsl7b3v5vhpoc5ze6uumecq7hoec9gg5trch9wf7otltup7j3xu26a0vedvbifwgxfdl1gifz00egrd2o0nxkaqu4n1zaj2inrt40dqgkpqooiq5o6m4v88xh0ddb4y7jsx2c13jh4657sl6fa0o1gzgq9bjy812ujykm51f6683vokyj4bmxj8sjkuyfao10c3s',
                secret: 'n0fmtjhq5xtryh1f8c1xla4pnyb2gv93tfku83bnlg61oakpa1vot77072rqfcu7k8s9soy8y8ehcv4qgpo5ji3d99',
                authUrl: 'goiyj51tuf8jqlcmc8dcbcp7xb9pfygaz9p8n26uz99ow90ev26rn1rv4vsmwudnolnkju49kf86694ingfg5309vr31wxn441u3joul4w7iz28fifk29iuz5vs5a8mxx5y4rxecc5d2lygavmsw9ew8z3qmgmwzbwto40nkkjlkxz3ps8tnqh6neyucdremwip12cxy8b464ag00ltj265kjlt6sw55yplevcou5yjb8bhvwunrhllgnh1yab4xhqm3sezdzu2or88q6pgf3jqbr1sh3kt440tb8rsp2qa3aef78sm18soqn7ux7cgjzabr579npwupknohxxpnu2xkxqpa6peopj8yd281uxws1hgnlpyz5mwgy6pl5quxtwi7sfk77nxriibbzqmiwtaajzg5egkmbam1w7pqgyr8q9ioqd3xhy85s29j0eta9gedua2n3wd4yxwlk1718fjl353cukv0wperkn2ij14y76t3by6yoyd256chryfhsc0z0u192dzgqr1qmprj5yv3ww87gqlx3s8oro0mfuq9yup2p16v2kr1z2lxa8hc1ots5pumg98rb329dyfv03tmc0f39p123kve5iawza1cyemzwjjbk9w7hom6ejofk6xr4pxdy0dqk6saikqt6r02a7r9ao7h61evr99ngtfpg2jo55gij65epziweha0evldwkncymc50srvwpadk8esehvhu9afw18156ne31gn1nu6mivsfftif6mrc5aaapaind4dcoaspnfbkiqzn0x4kf9vk1qfee0n9i732hxjrh36x1adrjshpf8kb37s65uc8b0f742zhr6i7mrzshdtzookweaoys6zsiaoyu2nwc93sx2sw0oq6r2b1j01uc1nuir045bmmfgxvn3ly3y91fmz547zonsqzzuop1he4ulszjpo1tvx6adz0m182r03ai15ku6ryd7ufeze9r5njiw5u0x1ilq64970rfj0pnzawm5un9zonbdrqclmomj3vbmezmdlwt01xw0ixgy5xr6jv8lzm6x5alt3askuh1s7rqatye374a26jqh725cx556dkd2vlmbjxie0w2i0dh43wjmhip33ma7t40u519gmfq5duaevf41sb1juh1ioo7yz7g8psh3hd6uqcem9zn433fxs0bs1uz3pa5omh9i9ulzts99xb4bobcuh2iue40jfyp75te5jg72jaufmfdppau7hjfkjdzoj0pvfnl9seiq6pnrju1pzqms6qkcwz21gj7d2spanvl4wrqxp4ulyw2yum4jl6723q76ke0piuvgfe34p6ct56crl19juxu7utlmvgcbref9mlotkrpoon1c2jl7nbkz5c3u9lkop6cfwcbhr1ld2m090u1tqzvb9slp2tq2upa7memkx9d1pecmhgm1r2541fvzv4wr1kl6s1hyc8i84akom7l0ajsx66dtmnjxiwfl35j4h3189301slbjq441ib98uv7adwga1rg90yqjeu9ig20wm3vojui265lnxh5nxo1dfuhvtuqlhyuc3ib2r872c0l9x3oyejt0xrbh6z59li24hef215zyt2hr4s68riy38jyj3tpnx051nfhi9v70ymt1chxybdalcqlf1vtqfgdtvm91p6md9smg6buh3uibadysz7szjqocy49ugh094hy09rli31aymi5wwk30axqgb88s2hj96e8qv3frzetpqcjndvlltfsozcovwolp9pzwig31j9shp4lpn5uis311rxsduyi0vim6tist7i0vs8pewdx00tvuldol0vu4n8x2wagvh6hjawo9nriw2hbzlsrywbtb42irpvu63wyya06n9dgp2d9r327gbvbzqca5n9g6nlw7rf0n1q0ho9yzlk8fxf1hviinjo0otizislotymznr0wjt15d4zoia0bca4e01kupgri1lv60klpzunpg54mwvn82484n85cr2mgxc4yqcdl0o96di6daycc7jedast3mqikseivnv',
                redirect: 'bztw9jh502ba7sciyc6qch7oe6osm307viu5yiq5x3l185jt9680eomq4w9ape2v1byaspea25g60qpfibj9y6lvze13mr5s8g926dev2ztg3ew9bt3zuupgnox5hk8f1qm1fcldbekdgo3ywl7eacjionrndy8vrp9z0cmq5r4u46qh817tz60u3auo1j0n4699sb54qz4vk2m4m2xq5ku9ieakqp79e083xq32gelrenuvhk897zp9sqqhsedhc6eq0mph56st3wrjkljuuo9sjmw3lrpdw0tziumlehgmq321jcrngdgde6eknvmev0hy34d7n4kgk28vxy0xuaa8ztha2v7ecpjfqg0bzxph4poanj2oh4ai0bxvr3q3sdr02unlsh56c5spvpnumoumidq9lyxfobcybza0284ac4i70vhax5fk26vzpn2lfgkydqdpi050w7nvxfg0bjajcrylb5eemsht3bbctb6uaw33smvdaz4bah9aiw2zxowiluq3ih7ldimszp9btvk2pl4y3olkl0f7yqfp898obip4alncctz7i5ygwk7isc0a34s4takgftzi83vg2stlb1obz48wle5r0hhod8fgfq0uxhq5l4w796v9fgqna8j52eioy4ax19os88zf76tvglf82g2z5m59krmjuxoygl62hw4t83xcggddiq5wd1rvovvltz5b4hsb0thrhmoa5vfaxqv308egt1vtpzyt4wq7tpufdzvlb8wy6l5z1oocts20qldhnxyeejp9sz84o184nuo2g77ugzhpjy7962rimsgt5cf1u8y6cc0qm42jrva37a4ruo25dro2un206pe5s9m6x7yxfj6x7l58pmr34k23mmbbvzq3xkluxgscs8zjvnjncyptxnyadb7p089leuyk9i1fm25mbcltecvl3092vu14kf9yfni7zqnsb9mkerp9bsvlwvtddctft25oi335ch4vn2itp5tsudjs1ecjjxr62f54u6sksqstiw9ecxlugap4klyfax4usiqtbh6stltrjhn9fnantkv09frej9hfc2ulcxf8d496myhdce4hw0af4xtia6mlx4spc98r696bck942nuhv58vtyga5iqxhuwsqs0qelqk3ah1ftjdu1qyfda99icsm91www4zb5xxppd8mfi60tfinh5zhfpo9qdbzkl41b6m7wimbovhjxc10axutnpxdpctfw9lzhfxmitwzaayux98sblsmto0o20med8h26q7gsaj1lxa76zzjmfcjw3a14audqgdeqrbw1ut98pia49ualddy6x5lxrt2dge00cl20q2v4sspjmcx9vh6iczrb7wois95px3r9teadx4i4fgj86jbzfzz7osh5z23g4qg1fhlig83p23tynl6qkpp24hpf6n78lz0ww6s9fzxh6r28l6vrfsswh6nkd62gsagn32yopxbv150rmoa8dmkcj0engd0eih1cundekuy69svtdw5chudoifcrw9nl9olw4ug9jimjmfensqqxbgmz0epdipbqgh1zlno4bz8uwbk5p8i5kod9nfudacqtmq0p3zrq6xbxokt27l5k1x60s3dntv627g8vrp9xoilbjfxopxs0k949nqzi06a728764wcg07ur37a170tc4c0wwylcjd5ccmrt0kh0f61kj4tt7i7w39mrzqnio40sxkkdmu0xojbn9jqpxzgveodk61zerug08lthy8vtvzp2c4sgv5p9gi4wm5phukk6jbdzuk6405ekguju8igf8qv97nnfijglrobr5kkkjjtn0am0sbni2huy2ek97tb4c7nnb1n5m3keulhqmthab36tqxzf5ike08idyi7bysftag6stn26o9whonv5ysf662u9m6mb2oa9r24i54gvxbqb3q9fs9jptlpcvbjij8yc712hqyp7d9pmn3vddpjuvo3li4bkiavaruxletfo7qky1twzfrhabhbvatyu12t1sfxfhslz5i0ji95i75',
                expiredAccessToken: 8337244890,
                expiredRefreshToken: 4705929890,
                isRevoked: false,
                
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
                id: 'uivic0xr2vdh1dytvzba8e8nv50bg4ox5qaz4',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'qpboijhenw8t5boq5gmcelu57ljbu1270d4g00gkjncxtinlnh9qspd4e351ar7h37txxjssfwjwano82rlh7nrb8e9kg4rbuwpzxzk0w6290fymlvqmfe64ayfdzsy0iqf2p3irsx9j2z1napd6h60hyjnypdnmpp8o5x5xsxg2rd51ox2co1m14jx2g5zmypu2lrx6cjlmfq6qpuk5ejiwbjs9w2xs1l83bhio1l9rqsfzez7shgzfhwukt0g',
                secret: '8pr0y8fhl0kf8y94r6ecz61390n2mtah29raa37x83ubk4vjhgvcb4up5t85e50pnxnary3dwr7plvw93brr3v08zo',
                authUrl: '74bmaysea97rb5xkkrvkd50whlslsetgrdhw6rpy716y9xvv3udo6vydrmsfa6j74kizbl3ksnclsxx8aeil4rrle4fch3c12dovxuwqtyt6j1j5cti8e66zjm6t5ygsg2gv0kixy5lyyunpu0iiovynfxkpe5knal540al6vvx7bo8jak9vko0v89uy3vu5oegg6yqy2ovdwbupdfzudyjc40lf1k7i7jf9zpi3sh9ecoa28mvvqm8qjj29280gsymy7uhe9nuchb965295k3123f6pgc4fqx3ezu0lrne4uscb5dlr4vkw76f13abrnvx5fpqw2fzd2c4k4kg3ihe92ot6lbxukzzvudgsfn8iuafb4kf8vz41jw0n532i3awhrwt54mad1lolo78mhm356q2qod3nrc74fnv3lf1is4ue4dtqhmv8jcz4ntymu9gtxkfnz4t25qaoh636dg3d4klav6vxoobtns7iixiybp9hdnx76s8whugp9zdoyatjo3r3ukevoul8hc4mydnitfmn890qqbfhofkivytxq537f2iwmf2w6cwzslmmeazkwbns1tbxwz9y0g6wm34cug26kdi8zvo6f7ogxp1zrb41en7vdefuehuis3zs8wfzxy38xc76xrj97dby126x5vf88xne4lyfgbfyxw1c08eosv6hbtwyodkfnbpej78trpj5e04pz7seqc9z32c24i96blm95djzbt3u2d1iw4hg047gs4q8qi0ev0lrtxdc99jn8f5qvbdjfex37vrj4cj7w36m30haalgabioz8dfpp7qmuvd3fj2ipcf0mlfw3fu7dvtckfgnjiq0m52zkwoizkoyi9l1nmel9hp5ad5xkr6s8z3y3nnl665s58n6vaawoooyt26nisu098nj2g9jk8l7t6lt2kfh852mqva730sxllgj4rnpsup4snxsuyj9r047dw1r9ody912ne468v8yglpvyxueeiiw77s29mqxxq4f9ru21s0ik8g4z83jn5n6l56tdt97ucp1turd3cntdt5z8xswc41pes6etx4zpd08i4sd79mf9mf3zlpiwa4o4k819hl0ath66fhgertgif8twm1f3sunkkuy9uewwbzgzahyxqom3mh7s1dtkn6m1xceirukh0xp7gjvsfd3jjaspr3r92hi7cuxh0qvajhzxqxs2ds06qa17trh9uwqpwnycpv8v9p4qg9wfn52rwxsqnd04u6f3ygpdbhl3exriix5vcmg7kpcs39jl8zt1pxxa2hkotc5vv6o86gerbkjhsk7ml1w7cw2evygmrz6ic7qdpbt34lysny3nvgjsjrbf9pdiwos9dfdmlipsleb52ggqa08emttst5sogmz9fhx3s84b4pwcf90h7kqfxm5xwtehsscolfkwnapeahtojd6ula0ity4erjwf635dotzz9u4r0nztehi3vxp25sbq04vdyljqr4g6ukm9d0bzi33jc732cmnivygernrikcndw15itwtp0x55qpm1flkef8nm63afq73alud6qvouuqj60ibiqu34luwrns2ilh6wx27dfmhn34vmgtyqp18g81k4ycqll4jkiqx728feayfidnq9lf8kuoplwt40viij5g8cy6p3s5nrwj72v69l63n4i65qxx5z92oqqe71ldyoi9bsgheeay855ic0ta5m4uc14sc091hv7mvapy9pag4m7b8vz5qv8cf1kaq3miexbu1u9msxoha3n4fih5qdcug60jlxu5olh67uxazsgwzc2y1zclq4791tjjn06aj2m5kb7c2fu3y94ul7bf50jzbioph8ennuqg8aheel5xbj4t82yxlvbm5stvplx3lzr6d31shx0zf4nsijh50lp8bc85cdxs92e4tvpwxv2bhu9s5wedswubdd5gsk3ybc4vczpb1pe5wdklenxa7iesz2df76832te616bhdl4ci1401l8qv3ctr1yca3kjk5lysr0eydsqbp0ah9gszlzs3i',
                redirect: 'o4eidbpvruirvo9g7t6tgsaw842n8z0ufv2xcv5p3hksnj8by8ycg8zk6o6r6k25d06pd1ibwbu1n9l0qvriykg8ri2tg29fkl6t2xbbxnbbz6vugevfp8lsi2qjrtgyifuy2jsmumzrzeyty5x2jr8bgubawk6trpryg0jp53mulv1e7mz5ihp4hqpyp47pojcsyxre5gko3iy70iti3gc1b8mualporpmexef4bygl0j40o5ah8bj37jlg69o573ltb0d2idmd3jnldcijohafbj23qxiwbx7kuxfoaw5fv1sg40xjs92k4hzaqvnvibnsavgrs11bvbaj7pouwhocnbctbj3htk80nfyu3bchbb19wzhs7i6xkpc9cy414xshlj7iinxmp6f4clmezy3kjvr9jp5srqfh6uovdnnz54lvu4qnsynztznvbbq7vq538dbikuk3sffakhnkvdntntjkskkhkl5vfdqt6k0ru8iyixolzat4grtkpnzppuljdcupj3d9fy3m6vr68b1plbqs0ie6wf15z0jw1pkoieal96cf0ztu0sw8ffj269a5aw3dl7zagnc8uc7d0y1b0wzvxdkb743eqy4lvym4bdikl1ldgs5ggzj917wlymebnvu3uj8prztmvywdv148dzhmf1zkslcou4k1u8zr2tv0x0bnjrp4uxcw5wsw9yvgdgktffsjo6z7fdlstsicxjztm3t189fvts4057vc302tekjahox8r04mrgb52fc45iezvwydffz0kqv53f1677lnwomyuyn1njxnjtn081fk6fhoy6yag3eou2elxhv3t3k7vw2lertom7j8w4gjn59157iwwznujuizo7wkkzx0ueadrte7yxxjus5lfhl1n4065849d9vt4zrz5ho7ojj8s21d2i2d8zeirh01uhe0azvi2evs77xrzxszen7ckn55zndy9g1ml7eiwzb8edyph79tmbles68qxktxdird7y7dzqd9d6fuxy5qt3w97290v1p6fbj8rdpm6af2oi4gnt4qvpgzek4drc535a46wqmlp50hge83vzkfz9vvybcybqidiipg9rigwtmxrknzgwes1cu8gf9755oqcdv6rgs5qqjtb3nrajaxlydlhjd7rvz3tm40qrlg2jqax31a23wxjyrsluou35jw0pcte4rvr9jdoi8m7xdb6ayktwfwi49489xcfp2ozp4t2sm9fb0e7di5riszmd12pvp9z0clal3q45sajmman4e3msyc4tj71ae5yn9o2417f6foci7ng44as6nhkufaqj5uoi1ma8o0o1l5yhkkothhvo02jmp3ismtil5faz0epcr94cpis4qqrhqxbrz3wvlybv764kecg5enyo7gc3iw941gjgj7qmi3b95jlqafck68tow6ldcwrf0sdgzdwquwafdtadm6a6qpml9qw4t0hql0vqet0a79dctp1vf82zqjsn21yozld24kfnwjjkskkql6nk1mdv56qcv0nhizqbnqkuwalad3xme18nnnyjkkkit29w00rtxepn5awpzuvwknm6bz88n5lcc7ihzlb64pki76m2hzpfoivjmir0yi5gv6w0mwj7248wi7opxfh8u2ajwexmcl3o3xy31xv4vhfpul7jj9gsdzea53w6wvsgl4us37ufprr5zvj7u5ml8scqopbw5elcubworbpwgsjzc67sq7ipwveswet0ac5ihgd45d3qzblqg1u88i7ppkcx61rfy5dc8mtpqucmn5ggrqghooytawtct7at65xa3352917iavaxi6fqqng0gp5c8mevhmy25s8eq6w3266dnsvbud1suwzqtgr8pms2vrcua9ce3ux9qe1zdu5xzhybub78n9e2ki5gvkxl84ilawal8mvm9ek0o83ocr06vs83jfvwm9bfze7gc5vosflgb8yprsexia0ipx834226ec7hprugbzsz5a5egwys21bocfj5v2d1qnj18f3bavtia2k1xehh6u',
                expiredAccessToken: 3345581527,
                expiredRefreshToken: 9447586970,
                isRevoked: false,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'p7szwujibjppzgqrovo9emttwr2656wounpmi5ciukxce8m80v8xfsfuy4nmhh33i5rj09d5xebfsoygg973ainnheb965wng5uer0tuzom63cmy7xsob5k867lp0bhf0ppxw66p0gi5lhjh8x4jaiu0ug2xm92mh996ueckrj2gcjonlbo61k35qdczhlrgtq334kp71xrgbywavo085y3ycynro73p8egxatto3bofu31jmzjrqr9ua9uzvf2v',
                secret: 'nkc0vmneh2s877cjspco3l6skgvcq6ejsha3zp61hvmcnx6l7q6wkq0ie7j2mntb1vh5i0i8ol4whewybllvk00ah9',
                authUrl: 'qlh6rfqxk6ens9aamtm2lf56m6pyhvhdum5p17vtjxc1ep7sp6ajb853sz5k3jpvyxmjovuca473sx1id8ly0zqzyo9f4sth4i7xobg92aeqqcw3qit43pr2n19d2h1aq7zcl4w5w1aae9b21dj3abgunzl5f19znhox4kc3g8dhp3ki3dy27fcx5kr5kq586at068u4kanok4nki2d9y5n9h57owgn8gpfei2mr2rfe26k3epeuwt9n828fm8a9lmy7b7e93f0tbus9byoq8tvutyuqj4mb9mhjz8543egvfhnfk1sksiq5iqhc62vb63uvcc680spohd2216bc7a6eyfp3bawt6jnj4zmuxaioroywi63y58modlopncae1pq1tva8vtslj3yv3k9bq5iioxdt5g2ra8e1u1vohpa2wlregu55tfgp0gt6y8fk05ni02nu5emhzkzx9yz28298orp3srvji5gmuwes3407j4cfto11kdtcr3hzsjx7b4qvpqgm9ua32d3tdcne7zm9y3ltjtln5ahq6d2edm8rba1q6ynyr5584pzqqsm0zie7p1n983x99urhw3ntvcb7ohsofbdwngnkh0depbg6891b38tywerrzg03i8op5uwrokq99fv01xkwai4d7y5hazpoo98cylz9az8ek6lwjc9w2xzgysokr7tpaq3i9ov88p5q4oxwxy6f6r6s5570xsbdfpdmtcitwikowd5gy7aiter7x2bx1ug5lgsu7wl0krlu0cgu3e7sotoi3k48jevsbs6slm6004ni653n0u4lr9ljnpffghbhrxgzr79cxmg3t056fal7p4gfm3t7ujju1nv1e15jkv5ea3tm0rl7wsccfbm4slbsqagaqh8zgeiznpwqefltu3vv9hj5ocnlw5h2y27spulvtigtb9x21bmnrjg28wxrrr71hpg49b0x46zhzps8egl0uzor6uvcvz2eenxznob2fzfc53uep1j6irsz134kpxp5dgnm046rya6go6zktdh8ow5l9c8stmqwp0no6k4mmp4l6qxplakijze898h4dycy29ok7rzj0gk3sy6yadriqj8d6wen3l32rnht7m3l38de1h5ipab3dcohj62m9kno5ajnzaf3et9urp5hkt7z6o0dsuboxas1bzqqxbbyx85l7i55pk5gxuy43998aizzjpzpr87sjsbvr85u02w3o67elo3ewl0tip081ey0z469w1ygaq41wg7lgueutjvre8k17sxy1ab85arj3rhbd3v2whdygnon94md6cyylxz7m78n1j7bqtoqjzu5ej1utv065nfqmd9kgqxdosz5x6r3otvodriiswts3ss956uokwsg8t4skej872mdig6ghg314bl2uu28ihl6hvwki3w17e11oluuiwcpmqh3gbe3e4ypx0glezkddkqidehkd1s1z1coqohbivdfy4udabbdvr882qbn9jl11a385r24xipftnjenz5gwau48hsqeqipdn90xt1z5ws4ikgwae4uw3ky5zg9u7ab6ch89jnv6mzfclt9fv66skdhtx3swwkiru6faj9wmrc9y2qsahp2ipgxrby7wqrd5eqctnpsz5gpsf3nhfbrqv9p0ut97rp4ptfguy2tgmju5n0hru03g232iefm7tfpaes1v9osufwrsbu0j69utelkbu5zldpxt3hj7jpxk67j2csf03n3wd1v1yn8rebbyzkywu2bgx6stx8edqljggx2yngpcuc2sjwbgfb8nys9uj8uzk6zy9eggekyib85s1axzo3hrubj1xg8tutt80asoe4exqfrng7hhe9mkm2e1nzakmxioqznwl1ixgd0r4wlq3cvf30nzo0bw1qf1h581k4yp3sus2p7whwied9dj2zb87owa1ar13amab02ee0zvau6lnot81t968av4wp1jrbl92shrl3c4hsvwbebld0myiqrn56jp6p6io538yv41jd2v2pizzxgavc211m4pvll',
                redirect: 'g5t6x08txo2zj9tog29dpr920uq4yjp286pqwhy0hyrzhbyldskd96r3spdkupeq2yabscp2ipn8drkh5hcip1m3k65bn2uk0fxzav8rpxfrv7y45hgcm8r1the6w8rv6ibo99huevx0mlkflzo1430qczkek9jzbzmiq01gqerhz6iuok3y7s1dnnn25d3skojky9ef0q56mh27felfwrj6tiio978qzcycgqiyzj7rxioxbr4yxmr3f4d3bp2qbwt8i2nwcxrjgjtptw29xm3m8s03jvorxqxnvvkd2zgafvq8zpokwtezn9l642q0d5ql7qb0o0884ex5k3na8i4mcl1p9exvdnmee0bc1yaj64it9xvtfzqmt6cecs403ulqgmmbcygx312qbzygmvo0undi2njfbcrqpgwje0xinxb2z1h6awxy7i5fdn98lb3pql3qo77e82wbxexd427ns5x778zqm7t5ksqgtws5z0psev4kr7oldy5fd44f2wr0adm30br2ixax519qwidhjysinx3bwju3syxe87dz19aaj9nt7d6b9x78rokvst94t9yziem1sjaccsd2bggiz9rbm9366ifcykty1dn2nsy21tbb4ywtl6g5isezde8qo82w5th58prw4oavftb3g7p1b6kmlsy83n1487mjkzhrwy8t7i7uf0ptp49nmjb9t0p0eb6jym6bntha0epkae99bkvn3kww0trfvvp9iks35w2lw6e6lqhbvuwf2madt5w2k08lvfnsutdcp0j1lplzmcigtafubhigkf3otsoulq2e9s3kgiz0rs1mt6dc7gv29deqsfdu0ms5ks7683378ekrseny9hqg9cc6cmr6mjo1axt5i2ztwdrolyq8ve8n7afvjv4cv1rw7unutwcgrr45dawm8ra9zy98yu63wffu0c2rtdzpef7bfhz588ibbcwvbnxolv5g5g5iakicbqvctico1qgwv89x9n43j0kupyft5fzqt4iyiatblbgc7ze0m2eezm2sm5i6k1qb3rtsgrm0kprjip4ht46ivsqcdm3s4tdrsyhwl9t4xptobystcsplpsjjtzmw5ht30gov2ny1dpiln45bu24fq8cmf0opcf5beoa3u65hveqf5yg9vufwo0rdy1zcjjsfgtqz1jleuox85wxfhc3ogwehyb1mxgcur779wsufaozzqs9wniymj5l2bpnodkf9ca1lfxy9u4ahpup12vq2fit9jn3k9dedpll2dwlvrqxgne27bz33eao6j78hlez5kxgile959jvs390ejam6qjm75mmn4v5oiw6aw6kthsmr79zg1iwyj4a4reyphrwatd6odfwc65848hhzj4paw1lak295hbf5hoj8hmuqjbtjkphc4gklogs1pzqrvare5yszep09odjfsfqc4d2imy6cwtcmtm0uzouno93o96vrii5ba0nzwqnla554uvnlfx9mstmhk0ebwbna4ep6in5kyr9y846iycyg029gjktvdftfdh7jmaatcb45889at82q00i9jyoek5hnhfi8ajd7zdm8fntihxd7fxlfzzf4m6f52s596jnq80qoc3vshq9a857eyah9r4vrlbx0xyovdvmy639v1ajrv3aylwavdzuaqpcicrnl89twv906dm6lvv5j6quz0ttvuvyn5d2dqm17wvrzqsgwh47v0o73zb03hmshohyli6vp2w5purc897j1xhw6jfgwz7jmaco29s3wtg02jqpblog5iapsj5m4bbth8pnetiwmsjh7hg5eocfkqbrhxe7ifm4gxl9ldztebren4xqjuet4mxy0uxfzwd5pgz2rcfhkmv98tuxgyo3pnwxv0pido5fw29amxarlo4pttmmz49gq8d32d5qjt5wy7qo9svjkw1yhh82kxd6ehs9ga9qkh5k3dhpu29u1ux8xy8pd5xzs4ukxz4blpyop30uv04tcola3215qf2itsvp7k75e6wcizhhow6fic6xl8v7n',
                expiredAccessToken: 5261086275,
                expiredRefreshToken: 4425539159,
                isRevoked: false,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'cc7acwm3etb116uo1suxd01b84simhanspg3jumwp51a42cuda0tsuvlw9wdnl0eapvpddygaw5giy07b5kay72ld8eojcwt0iyda1ad92vponikkjm9myjglooayahqawiklprje0srj83h4u8bishzc0aa9pp8xhoi8wxctty9a8fw0jqqyssewn4v2ynp7kda6pbgen7kfix9khrac8cn7tokwby3d62p1vo2lpowvtdn7ck8mntuyc12wb9',
                secret: 'j82ultc6zxvixmjduj338ddkzup6l57didmwsrfajexfssk74i0thhv3kds3laxb9ld16v83o78jda8xv1ewjmuppbc',
                authUrl: 'sdnzckcq7t9ixlmgj55c72c3jvvxr62g49nh8t0k8voat47jnzg72nx4uw8hm7ef45rvzbpon2avha35ax79smxpqqr101jscqn8ui2s2ln3l9grelrmj06j0opmz2qbqryw2sa83i6scj1elq1udgnfeduzo5uz5pj94whvi70cu10onufz4sjux5jgqo4l2v6xdbvy1fqn1lyxt4q9ln0yprrv611asfcbvz6o93ho5cgx7x3yo2n91i5vybu86cghhch42vqlstpduz9r4emvx3k594wbxaioxdpy08lg0whjufc9t0vwkdnxm1stp4c2jz1aoo9enodg3wj19op2kl0kqhsud23en1mpbxkim7ctkwnl3qkspa09m55u9681ujkq5171uvspsceowmhsegm8gmpyu3xo4dq8i8fqfomoz8ynbjfjbvxubm58bnjjnpb7tf37tm5vuo6rrh1jqt397s818ukp62irayo5vj1xhwdhvoedyvn8dfsy6i5jf2903gqzf7pbdjtcq1ojrayq5jxywblyeurtu9u6oahhpjm9hesm7fg2lwdapuwg1mkupuwue6kw7v5lrjb4xrldlrovm4hif5ybttfjyisyngi1xcfww8gcr3ns04wq2v5tc8zkqmjs44ecaqh9wqdtrfv4ancam7sf92girhy81y6wh56pq1qhmxb5aaikhpszvymthpc2b83ol9jbdk1d405lthmpcq4xwcoxgjltux9m228viloajjd9qzqimgwv07n020zav8rcz28ozpxlgnybez7xe3bkqa7teqyfnkex6fmq7siju4wvowxpmjkwabg0s6sssyarsdf0g1rahsjti4ydoopj0ijzkzw6n5ao0b19fyhj5zt1nhbpszugv2s54wbm11aodpufofhd1tmv4eofkz8xubw5iyo9on0s03oj6q46q3nqjfy20zv9j2z2fysyi7mduxov7u1ixxzw4jvuvyuqn1nz3gr5obi1p56x09rg6g7zdf1tdrop7r1xs2bwj1vlap980nah398rrwdlsruxyepomfy897pgjm83v75at0a0ghia4rbrlalnf38eevhqmuu17o66pf5i2c079iqw248d3c9y5gn8945m5t1s2xqw7tcmbhxuysut7ivlhd9xh9pfmhfurs5j2souuuj2k3ptjho2po7h9a07dc3bgqessok16r7pxbb1ge529si0v06uxzvl8m19r9qd40n8suj6rr54yxlxoer75262d0uepdul81ce6bb071rdxa50k3b83gijeepro6ly9ngm82qc1x101sjv5iaj5afie6fr1bye9l83zeejcrcaeopvyxerjl47a9s1fkdrxk0bee9kbcmxcpxnqw1qgy5lpsmpivda5no6qlqn0qmudts5p9was18gdqsipg5xgn29l4zdgk4mn2p8vl11s11e5at0g11bhw4a3yecv0a8bk8tfgqjf8d4vx17fmcuok1x03mkb2fw0wm2u8xtkpzuajdf5jayhla1a7bv2jz5k4s5i1imixpx2p1h423s8qym2m3ffcw6fmcdxlroh8q7ysh66oq6ttczxk2wz9ydhcf38ni268bm13bfa28u5kvktq97mvvglpyy45nn5482m1gl2yjz0g02sjq84iyurcdqn761w1n09rw7l072wcpu212e1fb6zp824t19qasc9f5su0bi66tltpd99517aci05f64cg89r49ab9uek4nzvkf30b783r1den0a5ilh5hsxrfyvj96airpufd548oau4kz16ou35if0rzj3m52a5cjk8b7pu6mcny22rk19azwn0acti5p5nriox39x8xcz6ynll2bng690ca286kizzyhzvuayzhwvwxvwodbs9niqya17h2u7zzrwfl9o22opx1t8bjmhqdka9n6xq6fufdmg0rnqtmisxvdcysrgd5hn3urplp49qqraf456ng4jgtrykg44am7tnkzgu6krwp2nq6ebk8rira9zgk2c2cqg',
                redirect: 'a8nzc22omp7567dr7d5deyzqvmqjuo27td636ole93l6dbbq67i9em8eascl2uk6qej1ch726rnvsbbjg16kbtq013q2pxtybr7ho2k9ckp0aot8gf0bmbgxemqt8a2b12vo8ick3bzyqkr814sfeyk3rd1os13ztj5lltas50g0cj68g7ppupt7if1ou1j2ezvo4u6s4ed7o0ebr4m5yfmhr47p3ody8nm2f149dsy8o1inbi16y9u0v5too0da1n0t77bihigtbjz2ok3zvnmxojf7aezxi2q43kdaxtagv8xy8c72fit15y6muwg8fpzto6ssstna2cxji07jhkisgangdluudib9ktk5wq2qlljf0okib3gjbqbchaw9yxm9awr8if0ffbw7patlpzhf5b67sjarwljimkgklzr5v6cru6bx4lk1abpuoza7th9jk9k6gshaeev36lg79xxd9dmmorywpr31xcz1jkmr9fxrgfssvz6ys6l4wbj56cssa3q9vrx3oianitenqf3qc234lpbx7wssynxoazy31uiajzq28ktalottf13tvozjtp1g5z4wv7b1rd24gti2hbaix97djlmmcat9205cx9y3fyavv3h3ck0goeheyy8ret3xr2782opw6fki5q1nxzy4qblb4kk962o3083kdquj8tzdpvt05gd3h54r4ls5bwszgpvb9vvv0vm4btmoy3led5axik88gneq7itnpw5oy5une7ah6lup8e0x84um3336gvqyk7ymzky36wzljkacp8747n7ciorfdselsheax0qiu0pm7di3j7w7bgr0ndfev3v60vpk5yulh6az0icgx7tq9fqbryjd22eksctx3his5qesb0dslh0z5gyogxmzn30qqzvqwa73d4aerhvbkyx8kpvaeno2sltgd2rdmqzyqclll3by94mt5224t0x8n84kkwbepfcr7yd2nkli48gy5w30alkgg99nmwalogck3ymbpqm7ryro9qtz66vl925rofs0a896tiwmia77u1270oru94ghq0tmwapbb0gpli9szw17pp2m4fhvfsrlw7pf7t6hvq4exprfyer3g9gb3udn3wxe0rf5j3ewynzvwtwrqxyedkeh8haad8ewo537wcap6bp65xmivmtosdq7v6k6an0bf5waqlgaiyt9mweeqc6c0ylz5ayckporxra24mb5w34mjl53zwnpmw3wu6udwx3ftat8vza2e28ili04duwaye39frmy3ecq9mofiwcrz1gsu2v2ez0z6sxqmrlo6i7eeohdjt7g4na55hck92n48nc3qc04nwccjm70zu5ss4rz5bdq9us25rt4rmyiekjc3usyjg9h1oxo13n7s19gk6ybxdlnu5u561ye9qg6ljwnym3uqx8bglofi5fl6408pq3zbqcn01e8g5obef2p82t40pr9nxjvjcdadxyqwtnyez7enl3veu9pz6xalntvlpctqkfok82yvcz7anzo86vhcyghscw8eum6zqt956v7c4logsqsmpvy50c7tau2bbbfdr8cboeus5o5d0dv2ojq9f98fha6vm7b1slk6g1ypuamtkhbtbsbix8k3xof8grsv1kik9wzzfc9fri7tnjlgfzepil9p4ul8h551knzpxuc194t6aomocceqjaj3adrl5witdonmkqhank20seti7vjhjglkwgowq2c3lyorgat92m8jhbf7rakjo7fe68j7mn9kxqde9kzxadtxx731dw65rgq47gfmf2wwt55t3iqmlhs14zz1uekwfl69ljzrhtjtnomwv1s694xu23fdmqyx1neeneezjyzhm708xydmv34rhiyl74g4o9mzj78w7le49w61xwyjgbdjot6ltff47e9m5hf9gplrkjmy9ofwh953vuel5bv0t5fvpza4venz9594o65rd53n93wridbq40kpkl73ipaqqqlht5u7zh44zn1skw0w3kgddvetn7v5n28cyrzvgot381z',
                expiredAccessToken: 7617299221,
                expiredRefreshToken: 1318929467,
                isRevoked: true,
                isMaster: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'fev62ibwk12v1lhbz56izex697m2yiygyv6qe6014u337748tp9kmoe2dnaw7gdgflivvd1ybfrgpjp8smx9fmkn3hsekrdofc63p61xz1dvevjstri0mrzhuur8cwhb13uw32d6durie4fcndq396ojzilrec3uxsal0zgzqnldywfkfscqueu2r24jfoydjacp4wzr4dk3xydgtje3rnkm0ky4ulpqwgkwblitbvwvf4ody56yk1jxc90nrtb',
                secret: '0su3zl6ci2loaejwjt73l711lccpyqq7xqxo17nfzfx4titlp0wqovtnil1rn3w51506i4mtbco2t7p30jx72vbdyk',
                authUrl: 'mirp4ak7gm3pbbzpe0aqf6wg54sgjvofvf63wwwnjrwzk7el3q4s996rarbi5l7h57c8a8pi0nko5igezktlczt1xc7ccqubswmfxro1pgir9ch9fs3dsipvt4jhldmq4ucwiu08iz16kt6gr5bpo9e3fdh0bdu0azxgluki76l0yss0ez6b3gydcr42jrovhagpsulknt6s8ca4c72iqebebop54jfoxu41eksop0c2xlr6okooe5r5nmj12r30niotmv0an7epv77laylurhc5c5omsigzk6ui3xxoqwfxecrvkqachl69v1utqxnwnxofq1uv925lfiv47x96gclkkcngsyyaqw4t2o22009b7txf2vlcn0103omsqewd866mb6retlia5ed456yulqo04gxfhxffnn5eh5g9uw8ehi00xnaijk650ejz70rv2wt8an1xh2z08yxi3mkyqs7l8y8cfw0iiy5t3mh4y6f011ufb7whnu42bddjx64x8hju0wxggkhyytmldssclm6nzycq120g2uyuo7cv5lj83ufixzwv4vr0pk6jd3zy94fklgm3wiyue2xwqx6nuko3qlrtoqjpaq3pfp5ewrkl2xcs3ams1xtqdy9xo36srl17cfucqic0vik1a7p1iwbrpt9ci8wboneeverugn51zgfr8cbwns8g96tngo76lkd0cmbelao7n63a5rbkgr9mqxxmndqo0etf45eawbsdh4evd7z4awawveyjof1axedagmdj02aavi4qt5589nkegb55hhterjxpvkvxeptxmgoxkgdu50p43rwspkghxt1fpji7del5gaceck241o5ginf4qbsjovmte8oxydl3esv5p2vjkz96vx48l7hix5ewdr26b4ioqlcmra4aagkdqey346sjol090lcfnuoszshmnps772i6xre4ubgu2q0hzcz0box5ayvsdg9x195x08s94aii0o6un2gbdvdpnp2wt8bxbn5xi2b2sroe3ae50gy05ecl905fzp964hacakfaahb4qzwxnsrcqlkihgog3ky7hrxjc0dcp72qobwcftospvbq3vlj3v6d21gn67iugzk323osklvsphnp9czjghe2874homx9vy1lhli02o0xq10imtncfrprn5os4atr2umbj86w6llcri88dy0th9hvahao61ob60qr0p82x0lozqphh2j98epudyyrc0qt26ggswp0fvc0t6w5k9gene6d8bsli0w8zvez06we6g5eyenvbfrco5do8afvxr1pfmlbm3xq0ybo1f47a5mla2qqfjqhnv4ny5yxm3orlabrx6gwsza6eu8nlre2ntjvd678lobktlpl11fixiyl868i2imq2m6ygu89j9o5tu0060d5rzrlxom3p5hrjjat71cheqgb62ip3tyngg3e7owqtt71wed7q0dtnhy16e20db3p7vokrm03kbh22g6midhm7swsdes6n91dek53g7stvldf19d7lolkbjljr83g6j2toiwn72juw61pebapjx213redyq5kzpj6ag5zi6v4ck8n9r97sdogjubkgs9u053gs9smyr7j9qcnirdcgfi5a6hrwuvppa2avuv15krb2tch10g0cb6akh18xgcjzc4hh0a44obew7e7vs7yjovt23wu5w6qfd3jusda1vai73hs8q0ync94kcotsxgwv77q98s2i4dsa8y0svn7nlgf2pjl2p1b2n0v7c5hiepgmhcrgc1jk9nnhy231yttucgzxs23r9p8n5l7fbyshghallttvrhyhdi9klspdhmzdk1l7zrnefo9p07uuqyk78064q8dp2wsccjwwoyv2cyje0px9v67mfej6pot3o6kso973a4k7jqws1j7dta6f9ar3ji1zst5yygp9f1n98lb5j9er4wgsy9n1voauwnjf4wzuzolw0tbis8511l49s6973i9sqyi5npocjgtvnfclvt70ndnpxuq02n0b0ycvc0tqb6vm45br',
                redirect: 'spg6w4uxwd1yz7qudjyrn5tks6a3skpvyf2yub3bmmwffor1i67rzm9xuh1fxdexc21nrao825ecx5amcth7864799yivp8wl3lq4aysp8xwgxyfj51ou36ulimu8j7g46gt8d1ry8v8vh8t5youge6fgvx7oqoi0r8upk97nlpafzhjgybfeyydm2xkp9me1w9vk8edidm4u91uwii4tbutezds1b675s2a3jr93153vmzltnmxlqc4f8u13e4q0weglfo7sa0r6bw1aa9s1j0stfsra8w3c7snjmbhfi2yqnz4023h2adaap9xqzfqcek4t3lto7u79rq8le0il41j04gi7dynwbfvgxkkfsucbn7elcg4z2ifcu25kyudzcgbx7rdfuj9eyck0u9yj51w19lgiwmpsymx42s7sbvpz8ugz4asw6u5xrra9i0rk5u9dkvifkruz0w3ob82qfpsv7qsaq0w6exwsahblcacnnanzxyel81p2h4ju66xnb90vqfchopt58h78dn436h7egdmbtfaj6bvfq32sd9u5gsl0syuf0a7zo2m3xp7w2p12v3elcsaphy3stw4yfh0yjcl7jvmc40hab56ah7nuweoqz8l1qtiw6vtnlj7ass27tqnwfv802hsphkj0loe5py4dkxa7cj9dpr5um4iy9y96er66kesysw0f5gi95frgzntboj8i64qu8nns0z4kn91v02usprtoja4hd18o04a4yspb7lk2z8o14dkwn4f1f866o4p3i0jlmt5dwmuyjfb4ddbtz41lhfny9ylrik61edxdzhl2s88yxehsva90nxs2yy015494zxhah08e6q7ufq5slef57sx6nq9i2lq6vgf4xcuj6qci0i59uxh3xhtqzf1weixp7kettv7nsuvx7ruliefs1yrcrph8jcpj14egkpj1ps79789h3jdvmmtbh3vbqp4pmhx0rexmor72gh4rauya56bvhbil0sfokct1kucprmcp1vjcy48h68dlf8l6bev4bwn385sijjur3qg89r0smny2173t84cs9q82iqios4hta1l542fe9x97wdlqidgx45my06mjtp585he1pqxeqf5cuj0sxwgkp63q8bbgcbmqqwf0761msb634f2745ej6dom3znydig9dclp8ytw8zxrtoif9gku23c23bro1tk34r4omdvjrflkfwsz3xnq2f2zv4d4m70aobxibvs0ta428uuoqzzq8tupjp748z2ny0krxe8df1ps50h4jzxyg41aossafb68x9ckmymtzzxr74qjc46wcsux3bsfcy8x7fa6ah5v9u53wh0yyd2eokor09l9k41xbn4fwtso4ck2f3sgdgctyfmtkdw0omqcxq2tdiuzmilov4vwzmewlg0xv982b0oguoqrvvymtqt6grshf8xvtqkvec5bne874in0n0482d8504f819k4hb6z2e6jk7kql0o9tikwbl8rnw0liplof0x5z2f4vm1n8myjlveto980y3c74bwobzolhvyfabqcqcaaw119jdkd0tsdx65ej0i40h6j7g8u3tjbn9svvi27zjyupemymulfjlssy6n6irx5xymuubs594d3yucesmk9eepvzq8mnu2fvbpp34echh5xbhcgotci1mw3pakdpqxvsu91bttxrqags3e26ii9ml6c5je7lt78urw5ndberbo7rtoueyl4etqwpc3awukxwdx7frwjkgx33ub46yllr9hktigp7jcikizfkdnmjiw6jh83165a5e6xv8i6yg3tnric9zoy48c6msozxi3sk7kf2mgz1imukkw3sugtvplagnqc6zeqkk525aqlq9t2uphv3g8d13zz7qopnrm8zdm7qiy0ngci4y4qf0mnwiw1kfy2lc2yd28hioaq4pv2dqvn67yquidzk64q7w111mgrkawniy7n5rtozqlizxb2npg6mqyzm2abm440htknpsklf1r1e2fz1jf1ng3ct9ib63uicu5',
                expiredAccessToken: 4284736373,
                expiredRefreshToken: 6773145360,
                isRevoked: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'PASSWORD',
                name: 'w5d8i84q4m69m1o81sv3hx0sshcbxx0ortouq68s2s45avu7e15kq7j2znwqb722kj64kjh9j74utt4hc6fvzqnubc1uau4ogsj8wm2veuks67owq0du4z22dblhfwzl01a1thcctklj5z52ycvik4l4z6v60ia2r8j83eqnt268sbjzsrblpvsvcxw5d6068zk7on5v8p6oep1mmbccfzzre8s9n5epfde14ocdgmpjteo3jdqyhfrmev0m077',
                secret: 'hlg2lpezp4ypec3lbvd4l3pz6uvrkhcmmkh3zf282gfuvceft7wiqqezxrtrz8vfahvmol70uhezkilj5w37zjl6it',
                authUrl: '9o8oux85nyj9m1009htcu6t9nsgvhcb8dmqfvnjevl0ogdrqxyk5f1l629r3eldygewphr0fblya0q6n7sxj76jdd4mhxo7c5i73trye0acya7ugg4p0bw2i4eyonjon0r37y8h55cjrlna2o1oryd60zx5w8xkaabl3d2xtfg4a7n8sb4go48acj1a2uopdlm9yp6qz3qkx4t870b7ogy3h06y4vc19dnazobxpl8kafcax25ftx0wkv8oaj0ajnitxfnb7p7il4w0o7oa0jprb9gerpo6pxq100q583s607k407mnjsbr3ucwc5xfxnegr2xxe47jod4fbzv36dgos3d256zexb8f118rs1nqkn74nf7x0wjloakdd1o446t0124b0twzqgowkdzk7iashatftj3g5j4gmguo0aiz8t5vjjm2wrxrfalgp2lvwtafg61gbdf4qt2qfrh2wh9cihml140s12kt4hml3cur22j2givzusdt7n40dyrjrqyn74xzzlyx2dy16zrzhtylqsahw7tjja3m4w7fbsto9z6ldgofm4vv5c04ioi60yxoe28zpmwbvy2c7s8ufn55hb52q5fi72b3chkr6plzd45agg6lhecblsqbg8hdtxs8lrq2rd9dtz2zppitstecsu13i332f3ls5w2av19e6t08wyzxll0ljhjwi01iz7wywg4ocz934c1z8h910tyoebm0v52q0x1im760zl5e1omaxijl1n35vn5jolzzmrpe8ism5566fk2dc8lrj1macu050n887a2rhdhdg5lty1cflwr8kixrhwykxuzoo3oiro2utgogd3omo8hmrhfa3lguth6avzt8x18tb6urgkzlhyyi37mw4vlq300cxd23l5qx4udtycizl1zelvrd1yv70qsv5pkqs8sgfgmjcnlb20oej3e7gkr8rjaf8bbafpt7mubfhsvdav7s3z1lmy3qa6208q7rqfacvhbci0e37xndkuqzqweybzd3gwwe06x8xp1gkaommgrhv5sa2vhqogxsztix8nwl6w0secm5udvkspgobm6um7t1m2sdtdeuaadmsyo3a65ma5w1zt9yvxrld4wqy6oh48vhk8e28ztaernclezyftcalio2cvikm4p4f3ew72dvgwvin23mcslbksyqlqbp45h1iysmvezc9ljf5iepw9lvnv16jytqoc1jl5ac8jtt1vkyoy02ttwmln3csbydcjt3smgptyl1xz609ehv4ip5vl9lybeu7fecmfghcpm7kf2h2fn3rsaa11dk2g0m5n6itr15zt3jygdiad1q6qyfld0w100mkqsiz4yq9dfrcojsxc9bo3gmgh3ialy0tn67u7zsia92s1muc7tmoulluizo2unzt7bk4iifoyyuripydfzn47ljsfbgcswjmq785mhg9qgx64414xf4p3t2o7w8nvsf6j7f6wucjdq0ve1hl2soj6h5x2kfuwszbk2x4pm00chxfwjos5ozxan3aa3fls5bi0ie1w7ykci7ljzpuzdmpre2jmjj3ghus93idd0i4nuya6v3j24oevq21ct80a3vr9j5jqcutfu1conaukfgz2fssvlb0pwdyvq91vme75qppjf7tvq3pc5atupg18swhwxpq6brfnu3ffcl3eaixmxnontxihmj9j5bgmeyiyczcm26ymndio3h13whetcuuyk31znmnsc0ubfznvxno4ly8y0s9isr09lofa8d7nwpepd0usugyjxsrdcymew9v0f3hjvtzczkc55jexnqqdwc8q9r5hfr9emnprgj51aihm1g4706dtyo0f8z36vn4xa4jcnxrlit1o6a832jiy85c5ytnvb5ygnh6x21jiyhls7unm4u6nm3lxoouf80t519hxwoxx36ml1ag27wn46ger7kbxg69z17bjhpgs964zazofgqz6nd8dtsvq9996t7wxxaxi58tufbmuv36xq7hy7j6qod8ayopfogk2gcqoi9tyo2wcxg6',
                redirect: 'bbs4fsjdcgdzdqjidgmcx5ft3xtefguwwm9xm24b096xcomjgyem0izzleirgntcn4m3i01t4j1a9mg5on31c4nfbqlf2beoxd8gg0yjqs45ge5ti4e7hgsn41tg63cfjfzrfrh43z5ixziewvwm3ljx90crx829ee36thyt0l0k9qs83b4p42s5ma9uqwr4575djzgc6iko3qiyduy0qrrgfjhyeqx35124ncwrq2wwr90d0iujbgq6gy38b099g5vb39mzlh9q3ftkmh8vyqfqsqpfu2z7obei128lf88tlvvq9c2pbxi9he8uhlsgxwy23u22k2cty6wrxs8wn3wy4jomxlkebv213e8xtnipsuzokg2kyhe8jcxqjuf9g8qp55nqgmtdh9nuhabzhfyhuucf9w3axjni59no5k8wwh0f57pdqgy0hyxsphrxgz1v9wqdweyq3l0eecp4enwlpm7973gr4zeet91cy83t5a2s5xlmecsokyxaqoxxcaiywequ30xlwqk0tbhcf8t6xbb8spymd09dkdb0bskcz9y1zj9xv54tsfhlnbd59yag2kd3zfmp1hdp135a1ohmhomzmogbtio4vaonvvmalz8k9ul8olfqpd9zdj5jnr61xbe5b13pnvsrt8k23v8jp8l0mdiquretu0sbk6ok10yww0pa6l2vblvlwa52fpvby3fkgyzj3fb6ds3ywmaay49o7zcvcolej6b1b0a5jtvpg959ypo1m4emkqy5lfwu89km1cprybm0ny9qj7tw92yep7udg3e486fwhucex2fbwb1pnlvhf4lb1wqyul14d2prvvnbdix6f9qaywukx1ynb7hcqhq1wgh1ao5jtyjcklx0yoo2pd00y8xcd3ext0tejayz30y76w4n5d6r8bxcrupt42lpppnzqil5ka10ta7acq1wwvkqrxsc27ejggdo3zalh1eipkfidft9kz7s7c7gvbzq1v3gca0twz00qg8c9f8wt80b5k30f0ay68bexlu9fgssccxalksui4hsw16ihem0m9fnv1c62yqhccrxmi3dm210ivlyc0xik8vmhixw8txdek1sa0hyrk3truqusfan0o8dh4wvi85bslz8zf002eengxo9bxpdaq80pz1433xja0a2kvcdy0tk1bp61b8qz2318z11gmqjmuypwx1gvhtpu0xex5a9bkwcsqxri9k9y67vau3yceyzkzz4p33ayrgfau6doigmjiarmjz1wb36gdoozb6g6fhwqqqb1nqn0so9voi3o12kdgfykfg5664kv5nq1nvgbpssuyhuaew0ye8w0c4qw6xwk24c93dtnvlnp2y4xcut7yeizx5km5zd8xdgrf9n36qv7wr27ak4cr31qye8j9eqr42jc94t6gtmmm786pe06ywjj14i1rvrbxf62yksh14ec30b52adazo0nk6fijxcgizwhyi0vo3xjyyysvai5qcgabtdq0vg2ok5rfjbjnxhor3252exc6mbcocg5zlx2xfu50mnnuwfikeukkbrnt4uhiickt35ihqqc0pzcippdkqrdrv1c1d9w8cw3sidfw51ro3oavez3nxfvnx2m8shcpxj1woa0yp2nu49gklp5x1phsre1dn2ybmw6na33tvpecwi907awuh1d9dgzgz0t7y7t6myn9uz0vpkcj0m48r7dgw5tann7kb41tyr0djr25ny5beh28hpdz7rleftdyrgbpi3i6btakk37xr8k8ubr08knfdkfp211cu99ihf3anzqijv65ulwonfov8io8zbho6bdqyyr6abfqqbajh7yt51q7psr48b2vq0u3sa9isx13smogwj1fbv6snjnlo4qscg3xwz8rdg8d71maofxge72ay3eagskgv6q2jxhyqiuzokag34albyflkyytc2gev06i5d5thja9phjfzc7kj1fodk0vw1iunorcaoulikxuhf07qrpaq6xzetmdywat72zr69cb26tqwd6qh7ta7ez207c',
                expiredAccessToken: 6025508693,
                expiredRefreshToken: 2653476583,
                isRevoked: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ls0w9swi5056h6286c0226hz72bwyk79tifafrlbrxjz667qjy8jcpmkjs0zn0f8kxsjkbmxv7wulyvvciyjd7liryzogtecernivtte4xvrekr0yi57h0mxc4ipyeuhs3gho6n3lm3efquhx5oi09llf5t30fu1pnrg4q3nwyrbvecmu2szigopy25xvnkwdsf3tmsk3xv0khlkemr382uund3diqhl55fh9oe1m5ss9wre1ocp88m32t50qp1',
                secret: '3m6uyigifj2vf9sdrrwv6cacr4pgg0ke53uv0mm2k9ui8hza9jojfdgrj0ugi2qa199t1nytfsxx8mno1mcqg7o12j',
                authUrl: 'l9scr7w1gricaeb3vodj1svrmf2rlsqwng1jvameuztf7va7cvok38f9t4c6v25l1fdzvhx148xnzq3lceljq5cue1fy9iwvtai039fj99i9cl6ucgzxs3918k9cen44g6iyc1f9t6zhaped49fl3ybompx37ynt7cporqb6d0lejs43gjs8s1hszl86ywgmqtkivmn44du0lbec1cee89s4p27fqkia4ozk5whx7pgezltjl8ux7wqxp3eq9ezkd1yysfc6whc5f87v7fj2uh34ae28hmt3xkkav4bi95ynx9z56ky4qlugvalxspwjou296ts1sqz2p07ofbi56fql8u7yu2m9msfd7d71n8ci9q1e38698we3rzsg5ijt3why8mep71wy1stalensswy2d6je6xwix6t0ha7bhl1ukuzgxjbvfpaixemygbxpitjtkr374keojcmfgb63x9i40s5jedzts3ew6b4yrlswd7haulfki1ukdkzk28vx3aodmdias1u5fs9w3cz6zf9hhzj1px15of0kictr2wll508ht90uv3j4p5sk8taz2jmi722cq48z57bb0b1dwsjibnqr2p8ed3yejmxt1rwjyjsizy9nmt10dbf2rudsxhfhsb58m9el33j2v042wxlak8t1s81grma8g9z8ftlo5iq7pfm649nm71l7i8twz1qkrfbba7ce5j7lsf2344v5exjzmv16gwkgcjqgldp6s6p9aegg57dhvqdh7v08zxfnqvnwgjjm4ujn6rfxakv1xpc4qmtj8djpae9gsvfruk9mw8gwqsqp8vg7cd95zgq21fq3fzvmaxqieoq7vfv8pb0puohzjo9pkrqrjfogfbvs51cp86dmizuedz82kyy5c1h8stbkktsq5vslpps42gr9sr71uawqzmf27gmhe3fb5o8g42txed20qqc7odyteaw43dcc3w9qub0qg6uyyzyj4zp5v3gnhyurxq7b7qy9tfunxbllwzqgr4mfoxx3jjzflv849bc18qeh3s4x2n2qdqzg5xzg1guia5739y7nfcs3r3w8et0a1j6r9q0aefr9em22662mckdjwuprgxugvplh845x5syx9u5mdphtbr311uwh95ydcqk8qrsjwk15qq55mgvpcsxghyltgzla8qdkcx9gka2egm0263brsyocau3r01mv8w2enwonexqp845t6fs7tyhxt7dj2g31v5ok1d5gzy41fhcmjy7u37hnue5nkr2z9i28ut73wcmb7mxcte7w4vrx2rb5g8ixvmpho5ll3mkewvyi853bnlkviptwulq7w0jwqrek76ztuazahenx601rumg73pg3bhavi6r7l2qijs44yenybminbsfew8bl1pys6snhfqn5d9f7wof1l7uyxoy4ew1obu4csfvpyfrfzsv3no8vkohod329fyjl3lmihuzvg2aqyndorfd4df8ylhaskv5qpvre9xrn04azrsgr3trtcir5g3u3b8z9ohwn0dlxmyp5uy4pn85gcxxhuz22p2796wkhlw2sba9nan7xvr6cwl7ya78gc5c3ubbwzikqwkp8yq678uydysd32e3gngozzq9tpt6u691yic0tymr4762hr3vnq25v5pswxiw312tq4p1ncmulz6w4koadxq3gpwwib8rm5wpcsl6hlucgyus4keqz9u541vd4ji3kactkdg4mu2pu5dmvmxj4d65d60y14v08dgp7wwof8zmvof0n0g3sj0ww1ke2oti7lxso1f253rqa0nrd665nxfib6sgocsb5vvk28jmys9x2q5yxjdlg9hzggg783uaw5gqrjboaxiv5gtnmee6dz3gnksoa0dyjjb66snjhdp3ccj612ggyt5nn9gas54vzhxjuk5k3vhr8sgq638fgp2vljwau0ztu77h5hmqzmwfxapybzhsvvjmvp81n1x5nb1lj8k0mib5imk0hxpzufwxi53ivp21e1e9d3xo58li3ka5veazk4jcxhfx4',
                redirect: 'gwd19n6j58kr84mwtob83rvpjw6c6xliv3sjjvde38gy3xfr726zk4wxzsjpfb4igezk9si2fate1a47gt0fob58o4xho42g9f40h4ccottponmrm1493bbi275t24dm7nmi9bmrmobol0f72xgfqqxm23r3s2nnxga4xx3oy759lzgse31y5g5zc1ye59jkp5a0dujxfs55p4h9qgb1ks9f24055q46o14cvpkzcdzl9djieglhpe1hpkx4t824jf9kc1k3bruhi4gcf2lm70hit6792d74nxvroypynxybvodmr8m89j0uy5bsfopfd09n1vdcfr02cvqd0vnkifpponuf5ierepsbhb9wrbg2l11znxtlyxlv5npv51j4vh598js7054fxe6dit4lslp5f6gbfujs2z7kncycccyd33clo7dul8o24rppmynko1inzlpbnrgltvcmt9laha4mdpmknx5mnv6ubtaeq07xlv7mp8ae9wk354ot0przz5tjpwkptkk6j889ta8kqwzl09lhvda77insnvhqsc7wneuzx9duzzfrd27hy5wlao1oecb0503h5zb2881fwdwvtuqzk5d2txdzdqogrv4p7lyn6ujwlu79az87vwi8r1ln20m2bfatn7qjjlnm84xnbvhd9frafcgleza1xpa4cdbgso30v4ljo58pdtkmcv8m59vsihaei7de6vsu9jhzacjd7t2huhadwzgyppfup68dvsclg4lqelauou8dd8p7pry3sjounp8vcjwejqyn6nxlwrr3gpbjvkxspual0vr3g4yy7fdv18t9esjz1md9sawndkua8k3wc5vubvb8iw2pmyx9ops5p33wrbys7k2x5r5adsg0co3zfrt7xmcbq4fr1k7mgmtyyqimi1hnj7iwm4msxjcw79fxjeoutsgp45xo91zkwulhez32ofs1jki4xpy3zg0e4l72vmtiihizm639vt7cqs3zrcmctn4g5jd7r7dnoqbgtocsz5ce93aip66qyttd0s1w7vyhwkfeitdplu4dkldw959negbalwplhwwgdlfm3bd230po2faktfs6x1ijfxe0nwlyuy1lo8hdwts7uwbzx8vks8t07fgrd3up1epuz4xdclaxl8xqhumf4zw4pb86wyc1zgcejoelir4m5ncckl72yc6tcl31bjcucdx4c4asvxzi186tgu852jexhmrgn48fk9nch8teiw8l3dokfmf9juawg8g3vmgmetvsj4f38icbcwnniyhn5r3fm1x104oknn3746dbhh0y3qrdl7ax4fkqs8vn9w8wj4unlagmvrl7hcvyqvd1194h1cynwa3w1g8fnfy4zx3h4qgvp5ddevznn8czevw20v38b1qrjls2rnkvf5e3qgpon562vh8lrb6pb5uo9sfuz5rdafla5jzg7m7sun58yifc94ccsehyhrmzl9st6i5mejjb9pn2ptvnuc1gxfr82mytrwqgd5y9conkyc6p2fyxysl8hq3peg0yyhrpf20wjbivj6rfih0jzlj1nx5a7yrs5auwo7fnblnaanrgfosg8n7dpie8tz9flqm25dhcbol03rkmu6jo9wsdnmydf8ehj7w7adn3a4xuszi89o29cwf39rybyy0f4n3udjcq1zm4fhlp0scm207l03chqxuukidwdsm4gffojc9it10dos0hgnyojxrxulk6vecvzl9tijncrczpkmpm4ctzbdvlijtlhtaophunaaptk2vryq2pfrxa27ovsgb2c5yhu2aa35n2kevpwxm8q6agvpbtm9pm02eehsqorol00totfkmaeydrlfcgsfyqiiuwd5jhrua27acfkslr2taihf74d229qn2er1y942tsx39x896w15uesuyadet629d4joj8t3skdy907tyqxxe16kc9wzxult2ahp0k9f5hrpt7u0bfpkhz5pdcfvbum8qmk3629inelwky7rg52wsq0t1y0jemmww94s8101ozhurdf1iq',
                expiredAccessToken: 76707013573,
                expiredRefreshToken: 1486761343,
                isRevoked: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'CLIENT_CREDENTIALS',
                name: '820bdgh7roe85nt9yh446obg51p8lqz8w9bzla4ndjhwk20fovx74hf583ik5xfsge19y5tcmt7izqtne6nzd0bsfu0v9ic400fj9op5tsqmos4ecmld34vjhf2ywyyitmquh4ul4aak6lbgf05hw4b4hgekme06mkm1g564rfdpr0r24y3p992voau2ea9a1lvx1rjn1ii6md6u98y7dx4w6csbj4ndgqvwlsdccukbwepexv7xprqkdyo0g8y',
                secret: '5726gpridrflhr9iaspfd093dvr9lyecz0ko1an6i8g04h69pzdhezmb7n24lsynjcw4wuzz7ln2tzjv554upqf348',
                authUrl: 'ou9n8492ygz2bwsk6spam2sbrj9uyopw8apq9b6hgiwjy530u36e94gi4dt89tjtt90sh968zvsfwi6lo8q8b8m1armyc2nd18fg8mnvxaljral1nt0mqd1x1gauo52bnakrkjj9v33czlzft20vjet72z4ftw8k6fqinq97arhaz1hx6mxupzm6f46l6xtewhpemcl521yppoctd2t4v27icb6eqxjfxh5qxksoijdcss0lk2ahcy2xj6kxx61ypfp6lkhm8lfbpy97q0dfd3xcetbaeval1hyhwurlzvu6w84f8l8rmi38woafrcz3y2j77fbc10jy28m42ecbltk3f0mhvvgub8eacok49rl7x3vlq1xgamcj8z66d9lr5iezdmwj4dp3aomdvs1hcx0i77prqtg9b2dvn9ugnvzxwyyqx193y4rtzqm3vnekubg8hskn17br7iexzrzqfaf5guw29pzlgb98ibd0jc87d41hmbzlng0ynecp63604ft0ge9rg0h80uro3xnyuq43hd0eib41c37cs5fxfwedmk7uhii1hpepj05ng16iq20q916hn8kqkq5pqj1bxjzi4v3f5jqf1b5bcc2cvv9qv8qqmkjloiq9en2x73hasfldybg0bdazhwyifb5l9g2f2yiuvql4cs798paup8dm3finbzkcpueiwpi1fcrfmatq87sgnxzkustjs1g3jnpxh9964275z6ioldb01k8kuqe3177kbol96bffxtdxqt6fyaguq7w3jadn72ftmwzrvopjnz0z5s5n853d4wynynk458pw7yt9p49np2nz9bcklundgqmtf4u2pdmv0nob6cjgtsvwyh7aaw1uzup72sa70ouhzbmixfu3ju4yztgi18zjizgrmyxyod9p1y5ttyvdeau9jk4doxg2nyjyqne832bitqqoaz646ixe3agwg3qod1o9pntrcsdhwwx2h8nvwn1r37yt144ip1p1s8otnd1lbbv82y3gi21899p7wiq0uygi90mbzsnojg7uybe5bzfffeplx6jfu505h1x026zx09qe71190vg6401340qnfq3zxmkzyv3v9w3l1ysqpzmstzlcrwum84oe49909vq1m5hiznilyddbzdba7utz0etb4ttb90pure9b15hnn026i8k0sbw8p3bav2jdodm0o4fbbw6xwtjhqf498rnlqd9wyu17eld94us3wdh8gb37jnyn8kef5kx5ubg9k8rcpayqfhy4s5tknzan9b9r0f1fo3baojsfq9j7i8ey87h7qkrwqaskqa5xuzzrmzdmuxi23hhgjjr4n07qw5dd8btn4dtoqsmprdgmecvd9pt6ld3fh0e1e7j1vb4eej7t55llap2q30g7cq1wleezem1h2uwker455ba3v3bh224tc14yoav5mcbyr8w1xmdnusp10v9uuua1iir14mc7dcw8fhwpbnpp6jndj1tlt0d2p6h3fxpi5q44xw87qmqz8ywseozb15l0lfav32cdiy2z3sfx68ltmpnu9v12sjcoyz56o1rgofbytdph755wxpramg66q71ns3rmqgb0uvfduoy6hkdm8s674xdqz8fd5wv662d2xhyoo7d684s7ri8bqal447nmyafnunqa1lo65j8xhqzycau56eup2w0di4a2qtcumwny90f3u5w35psk4n69n1piiujq8likhfegisrs64o2h06kxu1k8vmwkaozfi217z7935mywg9h5evzp28ztqxmsvqcsosl4q7d5yvuqrhhd48bmxrigzq3jx9bes0koer29zi3isa2y1gul6d5fl0f27coeygtx7namcuuprm1d25qlksaaf82ygm9nzilo1rudqmt8yso0yimhnq7ag3qlfy9qfd4nk6ey9azzvlgrmeczwe82ldw18yvyefc6hhlnsbqywpbnbt6kiocl4q8jbi16cje4hvbmf8m7puhylrjhvwmqpg52gfbhl9xcytyhbigddjommsbf52wlxdr',
                redirect: 'rlxha9k96q5dkvv9h1yyji7bkc8dfoupd0iotyvtdm8tjeeskzw68oeffoc57fdccotzcjd84y1kag0v0ld1glyxh6d8n92xceuv1zrjwxzhepuqis45ioblrcvkuctk4wfflyuex0edbhwmiw738jt3dqngtre43na1rvksim2j06koz9asgexxzh7o0ltp6mme9hgvmazmbv0dxdqvry9q5ldibp6i6zo9uvkrudc7bagunmsdgiyj05ket0barca5whc8can1zmhno0hfijlk5322uthb4mq19wkqqu0yf8c9h8er199q6p9up3urfk4zuvctu9pb4u9hp8hj0027dmyi3px92iczwu971fvbogn9pf0i0wb0psk604joomocrwk20or720n9lc2iv01xpkggo79kkayaky7b85473srfm75abyy7mkc3ymd2ncp4vij3l264h5c0y1i725hwrenu3dultemi0dh1bogdxjp0z1xcjcjdg2fmgev71azwficxc48zd280mt7nee3gkd12yenjwb1nt3l1w6b0bl6pazar11hlb3wbdryiqtau847w9kr2ddxe8dp86sob9mgs37cos21g7jm1uefu34v9mpt91xmldzcyax6myg3hauz8la32lqp1kkq022gtzihys3890hzt1bcc0xll1gdkfgwjjblqszbphjwvgp5ce2qr195rh1h6tqyp5z6fros6uo9i80h16wbycsepgz92g8ndvcafptdj6qspgn0mshqmsgkw96z8mkdew8uiojraomepqtw5dkgrud6aw0794xbf2nsluvvgqyz858rk4e713wltbitqo9brqk3sfjvqa4y025a2catf7sy2gg83m709uvpkvfmf4jg8dx1k074d22g0ghc077ehujgcjv5xv4xphmuvi5vl0c8rx6zd84axpeaqbeh8vq1a4z76iqn25oo4cffaxa0drqa0e5ad5r90alz8z96wm0txcw3llib943fryxdr3tmlso8oe40651oeg8eos960j1kif0rvxvhgvvhn8n2v8dk52n9zt6u28arh03loq7rb770mt30a7ljrgykizkmab1rvjcsib04ghv0wdkhro9gbj2fvhyp5bnrf0ghh4dy4evg61nqqoqu52jwbxzh1v5w14aa9wwgzc27r1lnclvhedm6euercpw4iam4yfmnkokq5mzrojdviwzn5hcdbded0zvbanb7v7aiqnzrwq7rc12f6wyxqad0j3pyie6xhdybaevtz7tq19bzvi53c3jsl743hqatlzvwxo0994qp5fyqeurhy7vuf13sjfx1sf16dd8ddtc6xu9ilaxit3j6i2wdwn7yqb0m7oby87x5ud2jyvsek1pko1bio7zfolyajwmf05sb91zkrvfv95t8gn03dicvzhtopizoddq1s3e5ay4yeiwd4m37oeqiodlblvqtza5603w6zsve433y1s4h5l1863kdenzxc2d75xjus4kpoqbsd9re0whk61kmbm5s08ngy40c2qrp2cgqbkaxdjz4rkef4zanjgx87szkijigglkuialf47cuvza92e1r87oc4h10xh6669m5ualsn99yykpked56h5b3topw3092wwlqx9b2jz0r7r3u795aue5wo4txgjkfcwa5kriz0qvgt3kq4o6ourotdrlmzhr48uwarxs0g0xk7guxty1mlmz83q9kw64o9h26qn837419r3znsa1uyeqt893cwdf0sian1a7tobgee0i0iy2qx0dkapf0uejd9sn6jjn599wylx7arcp1g825c6madlnp9b7g2n0lbu87c7x8ygaurez2sf1xtxtpaqfut7s4dw1tznjqocyngqa510w8u1fy8pldxkb0cgs2n78uxeo15npq7jxsu1547n73xz75khacb8eeglook7et1nu875mih27mqeiswozpygdujhe4ycyq59uhe4s4eb84t05eyg9gjccyagfqasfm9qtj2zailboj9gj51bs9o',
                expiredAccessToken: 5250246730,
                expiredRefreshToken: 22174251574,
                isRevoked: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'PASSWORD',
                name: '7o590aa6hv0fng5qwv0df73ohiw2ac3t7g3d141pprjcer03yaykslcgikzndi9kgy2k018kgyjw7v1wtdokfqah3cni9gend34zhm9bqhcsdgp2i1db1lmmk2gl742gpmp50bw2dzxb60xninox1hct784luwzegr5v618x561su092cmnzdhkatig59k8ara24v6py7wffmhq8o1agw34uh2aqzwobq1qvsjif0xo8yc91sru2f2ukwxnii03',
                secret: '8eqdy8d5b1l1bhepbd7nvsrm4mw0t080m205dfr7cuhze7o13t55w3dd8q59boh4otg5kniyizdk4titapb3iht0qh',
                authUrl: 'ujtn8h57nao3ushyemytkkauv675a1le543izqvidubx28a3a1nv9zuyrkthvcdhplkw8sv7cocv8mjitafns3kxq1ldqu2fyve23sp5jbzqcpkml5j3o5yjple50vrq9bmq10sb2h90asrpgri4jfq0xzkvnju98qzckrgsap02fb8h5wem40t13gandfvotvv5mgwtwo897u7k8lo9r2zln5fq14cyn2pxxn2czk6c65frcodvto1tu96at1cfbrkd120k77dzmemv0372cqcadpcwyj9lpevzp5s6gdhtlgsaiv1quziafgtwo5r09kh0bnpkfm0zgyebd0u35vwdx3iy545k28d6dwbh0rmcjrilcim5gg2j4uxus9v1omp7hfha6p5nx81xq0tw82ohucb46cwlri6ct1noa40y2ly3zpcsgsggi3vu4ayo8g2gkj6967321meosamk4b8o5dw7ddt4bbhp72326ggco69z0ztkuf1qkvtm6tb8v65bna5hbm2cciatxhfw7yxzad6vxo65tgbh3dv8zovzbx50jfmw21cokzvp89s5qfklok1amgkjrj99howmzmtl2ui13s3oordv99fn24apozarvj234jsg5plda0xmlegmblb5xbwa3r1u3dqfepvdwxvfnes4pox56638ycfqqctw7oo0g38jm1asmru53en32wtqvzog4fxium3xvqsdjd9f86twsrljayu5g1ee4d0vlxfyzqdvdg4yfud2j12brrutmziioe3173xv3le0686mvmx8gtepaeg6o2u20q1kq8n9iz815u8b89npn72pl4kva68y7jl0snfu2du2ux3hq1dpse21aiun4ocop8kzl7m657zog8c16q8uzjzogsza97wu7rd0cc23188dsf2tcl76vp04juzhvuzpefrphbdlkpuidoccqq2qwglr32nmohslapns8hrgl9f1lckhehssi5xu977qo2sacqaai4sk2kaol0ycli1rbmbh327mql02syh03ekx8nz32pbtzim16neojxsrez6l18a4iz9i0htfpou5gy6iudkgr4r8bls97ww0e4ihog3qpjg8sfh0f5dx1oddwzps5uzediue2b8c5sbpfsnos0t0nyo4031xbhq7dn08c0y8s68wr4w97jqxbx1zuqz9xlxonjvhmbp92fka4zgj38ofi4mkuvx12qxehyfup0wt6cztrhz4h2elietsfozcu8emq845zg2j5gg6rsyu2jlkasw2ftmcc90k7ewrl1cg7zjiijcfjoqm4lb6hripondzfr4vn200a5d5v56m1hnny4q3da3jmdqnv9zukbqf2gpwk0vjmo8vi1dqlsjzt90c4ngt7vedyzasxvhiezuq7jluhu3b5lct4fes0303qno5wsmcnk2jkiv5ep64pytkgo5ef35ze21dkld600wotomw9spr0iyai4vsq6ffhskspx3i8w609kt43ned4qou2fngc91pgse6lz5h609o4bf79a4s9bv22rmk3ierxbud3nfnxh53tzhil5b8n8ydjlbl2rkxlz2rv0vz5eg364780dxpnoc8g58zh1et6lu6f0kanz08c3vjiph9gliogso95m0z6jc6m5owgcqabdcznamipbk47q00vwttnnm8ql3gshp3udhg9e7zf0tj8ugj6d02n59h226jqlphgjutdpj3siqch0uizv5rebvz47niokqd4abcosppvm74v12pr2rqzd7pp4rra3mumalek0n29j4waiajp4303oivjhyjcgq0i9ap0p55c7jl42ee07x4f3w5j9i0pipmadksjkfiegxq3gd95bpt1bdc2ifcf6gfsfs8hh0di1cuiuimi9l5yiro6jp65qjpkm6j5hfm7nlmrc2zghmogxwzhwac99gi4nvk5cty1i3ini3mpt5n0phwsxzc8tpaxzx5ixyc2xwq0v8vxg9ybodetmosotual15cjie6xkarb26et49tlc99x03l',
                redirect: 'e8duo4z9hqp10jcipq1s85kcenlfwne5zj8p2dusjv9nm3ew4xzt4s7hav2f3twgkli3mdti9s6cpiaymr2bt2yybuor7w7a272o3t6eaeqo85asihvzpfktjzpa92xxfsd8qjrt1oc7pvzzrlmxwu1fvc5hw6awpwek51oab8d3rykvrtntlqtpsw9dn9ywshf7nmoh5oagjtwnu8ipm6z35gvzdcschbvdhcfw1nmrhr5kmai70jadlfqopshlwvw3xu0lh38wfcz3wbuinp1ejtjq7po0nwehbex8kti45dafb2nbf2vtbg9top9li9tv3h9psfw9rrd5mi3den4496s9rysg6xfqs2rbyg9336mza6zrp7mnp8270a7qlbe795pe9t2lnm4nxeffdx5xp90isiahlhuf64hkf57cxqfcyw1efgtcjnwmp1rfh8e1pfddgvw968g9em8x790asjuv4ai793n5sl4p7t6gd701yei1tlr97lqnk75omnimefl8uuofrjgpf8411jrl68mk92hthedz42mxr3hckfmib93b3y14l8q8x49p4yn0nnaywtmsntnf9ln514epsi93odrinkoctfda7jyxjbrwn8djzro47yxmj7rpu2uuofg0wz80xh4sty8utigavlrkjw0ouemubh7zuadr7ttd8zt47tjrbms0p3rcs5ux5ibau2hhlnxovlipimd0db10cbep27ewd1zzy97n4aj2ych0hbdw61ftwwnofi4jkhnts0q29apg4zin9isc4rcn0g86k0sbft33zviwrb49yzqao02wl3troqx1nvnkz6636061041xu4jsthdhcc1x6nn6s8oog8dm0l57lrj115kizz0w3jnpvaxdo3dfwgb4pxi6ttk6nr2u3fycz9iucilts7xvckddo5frzriapoexhr2o3bbh4l60fuyyonrnk36mbqo29vang427eif7l07s0naz7137li2nbqix2l3rmgxgnwc7yydta7ppltuzgxjtvm71y55388a80gpyt0tnpbmd9vyvywvycnafxdmhhb9li94ltph60xal5wck5rgi3kam9599qt76ny1yor7v2hgbfqodd9er5t6za9hwfpkmgquexhs1041yrce2u0h4ez8c5zntkc0tr8mxtpe1wrp28t7luwyytgouxe0pl4b6e88j6em5c2d8d80i7gkaid1fsxqdf81yuozzhwwllrhwfueh6mr14x842xtljli7nx1taysausylos5ij7tlg8ah56sw1m2ikgkhued4vroif5s6yioigd9qsv10idhy8z2663vof787xksoaoji9l9sqzyt2b5dypi65mcvvkk0lsq38bp5a20pwc55s2oqs4pvzluh9cpxg091weijew00u9bk2zv9pvnawzaip3nai7dyp3gj731ti13dhn6ggk35zc99rlwbfwtrfr4hdwg853ouvz7igv8y11yesyy6ued5xorsmqtwbgh5phpav505zdauy483zgnp5uj6k57fe0uarkzajr8e1amexh21l5sswpotaavdfm98nqm16y65ts8rx4g626rc20sdmup8nt5rqtiyfht6a1dl9eq904f0mjdzlqx8zh46o89ak16m8adydka563uvj9pf0bv6ezh22amz00sq5eofae69qp7nrbpy564d7sykmsti7qnl1emhw2zofp8x3xgm8zs0lvtmipfjh0aqhz9as4pt75wb0n85nqnlmqvcg2kmipigci8uiudss8zmy0fn8ahuwham6s90wcf76qi1kj3vaxs9z18eyfh9du2tmn4dlthsylmmuqyakvf6zs2kuzu5r1ah8bjf3bm9yuz71we1379v65lte2j0n8k95fqaichzcqdyf421iu85qrqobxqtaj64ng65kr6d3ceq3i4llx7g2ohs0aamteqxok2fatskwdki3n77mxf4kx7mxfufci29moytbc5tjfdg6c3m8erf4d53wkv9u7skez77ts5keqfj',
                expiredAccessToken: -9,
                expiredRefreshToken: 4153425175,
                isRevoked: false,
                isMaster: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'AUTHORIZATION_CODE',
                name: '8uffrq2xwggollw233d2z909bqaizkjx84jxxs8xg5nyvezkzp0zeuufnhffaq29zn3lichlbi9yqh7w8jb61s5jt2xmc3ue6toa1p10a4fwm0sciqnyq1yapdrixx29au4c6ooign3foz18jsg3djs3k0m9jzl717xos08ohxrjaacuvlko1j5n76hcbt0r9rvhq3vixss6ke8g9rs2rfj0y1gta61lzvsxbwpsont72ltpljyp89ortriddo9',
                secret: 'rly0nvp3z6swsumu9qj03qs51drr3pv10wzeuj0sd5wn2op5xm6r2443dmgc7flo4gm58y4bl11vm0qojdcrnoxiey',
                authUrl: '2vq780yd7404blb45abikb1p7ahcywh4bnkewmrvk4xxllorjdl0m3fe8oru0f50haxv5tk0zkn67sm754bpchaz13z7gkbrveqdejqa66jresd4sqd6jikapjx858ozqd2fu307984bnlaqsr6p9hkant4n2e6vlefg53irq0h9btm9lxtkesn2xenat1xsugjt9zw5y9msflur4ekh4ne7jubq76sm5lo22q6omxfslnlzlee6u5me0ysso3faz2cz7m9evf4vlq01zyv4rmy4cwqpijh7ctg9lgs2zay14xk5ccno53ff1otpe2pcfpgqlpvql1im8i1hjxjmbm076kutljoxz3rrufm3w6jwfdse64ggm1oka7uz4bss73p1orz0big9kug5embvohdey6zxsgqulnrx3cxl3b6bayfxyi006xthrrr5p667ulcw4hbbs4bousg255m1hgzlt3dktq268gateaakl28uum0y1yxp1ai0079fjfak3hllaaravf21fuxf33x7ptfrqnv376oika4vpygtr8cfssqmw1jep00ptx1ldz5qb86h38s235hd1is0ehn7b8dcwfjwxjz6xabhnbqgcw932y4ur86o4rhn3rbzat5yn2zzro1j661uqax3dq1oki4whh4hik6c48f79pchcz5x544un8ethq34470xfcrc71zqirgfgh8x07trlkres13j6365mnra51aiwnbht6g4l6tkuwh49joed103qh9cf8gxtqc4jh478zbzefhwctkld9sugjlhxqjjpj5pyzh1rzfnt3hfixr9xc7x1yqgoyq3q6njrgcv68k9utlxcap6mgl3g10heectbunlozt8duqpnqay2rxzfqawlyctvkuapdi8laeg0s7jxbnyfglvqtuxuf9vd0ii5q84i78zhedpcqclsittn5uzd3n76jkjdwqd7v3ffqlvrl6hr10uar6ogu7oxefynke5qgqycflfb5bmwnrtrhobef7s4uyio50d782t2er10uba1u1y4txp7t6w9vg5y7uept3xe2fwz0s2byhl3zigid1tu355owzur5ux7jgzelrk7fm6l16l7rngn53q050zz94xiy3ls8e0clo1e8m4nwf0hwnrzcabvyrysrev7yc4rsab9vlyj648scq25lq0nbmksd3bb26fjhaaici5s27p2k341bobp60thcjvk9d90qs2o66mafwq6rcwz2h5omgw2q62zxppq9aqazdoylm15dezjk9xm09bdsq3jlptchqh33pj906zqur1up32rem83l6xzy3cparpootgmbfzcl4ib8o6ti7l3pqk09jsbjwfuaxx9dbxxmvtmgakguaykv6ybwzqov3dkdgekyta9sxnm81fizmvyj4q856kjlj82ji4cooy739azrpn7128brqoftsfd6e8ydfuatohxanawjjx5a4i47hrl7iz0ahy2txu4fq650n9reatbbxepspy7ktpr72ykt6difa3bhwe4spa9ueycz3x0ify5l5qci7n4ooqow14nnvcs8kskygj13iqus68710kvplm3fq9x9evpat7pd95b13vknp8pxru1f2jh79kzxxfqxjs8bl0tkb5c1pnulcqru3qroyp5ts5hlok1hqq4fnnfuib75oyjyo8aii6kq7ws48yzpq7zol1twwxmi5spitxf7r9ovlq0ba987vjiew28s2vxhgtyaq2xzv8go21bl9n5ls6klpq3rcc5hbuqrqw2bhd6pf7dvm4nbibrjwkw5cmynmrimqrzjmaltr9k7lsj0391sjqe43xhtwutj2tb9zbzhuwjxh43u53vtfprzohvhc7q6iccndwes7kbenmp82xiphl0br4b1grgvduhb4957fwbz8z5qvmkeztvkajv3w4dhvrax72vq29hdq8j94l6gbl8kzq3k2gxb1b0yt68fy0ztifhf3d1491mmc9eyahsmjrnrr53vkqhdkx6lck2gq1mvoehchzt9zx',
                redirect: 'eib3asfvsgu63y3cf8nrk9bukoeub7ps43pfuwhdixk3l9tfck2son84yij77azzw4q8s8qxww0h9co2l6c00uld4syc8fa791c2bsxjaoz2jssrn2y34fn308sug6fekuw3yy0rmje76lhdmb93n8bn44vd1gvwqq5nkgi73v0katozs29zi3ei9pv5w4kkuq19qkmhj8bqor9iyogeg8vhn3rqaz35w98434j1phb9tvuuwugkk3erunkriy35jo0iea7nu3jw9rs5toxm7rduw4mjpdsd984f0ovlrrirtegjixspbi89tshwk2gb0evcolrwt633gi6l8y51jwb2yor1prrctrzjvfz6el7l43at64fszkhsvuopf9s9jbr2bb1yqizkptw51f2w27a1nc6kreq4lpwsim9wygplfhcz80d1e69pyh43n0ecpzw3pngutbc46wtgcwm0tdmrhem5k0iur8h6lv25wdtfextnqtqh77o42x8a2tppfr2zo79n4d5erkty56tav8xz49iywmkfw1ifhvyfb4b6dt1n5wt0vp5cqwr0n9dwpb4fh3r75850d5dbgsmwxhqn1ggazgizsakc70spj7268zuor0ag292bcqugejtbc8bu14jdirx19gkm6c2xjntxf00rwni0vu0j89z6mllcbbcdkj2pq5zd4nsqv6q1cs29h4lobzd9c9utioo72jm8sonltr46qatmp2lkz5ctxsh8pw62m3rzo2zu20dwalppcq2jfttl3yvikzuyqe62i4yoblzk4k7b4vv9w8il6wddkvv3085fjpbiedzeg1u3k7exse3cy77iwqx5jjjd6a4798touido08rqm715m167nuv40mfo11nuzq7m4xtkwyzvnqqby3p5idw83iwgr38d3w8awe4j2njxb00hc8ayg6309bqlbwo9hrk77ug04v27qbh44elderq7rc0ob36hiwkyx9e7glr3zptcn3iekq6amr8ay9jnobjfoi38plilzw5vztqopkqnbjl33w4zfqsv6galp7uywr2te6ng42lg2bumqz78szhs6rpospuq3o1u6rr1k54pge8snoi88uofm3j1wfx9x32cxzw6gbfxrbrx043stf4exotd7rbp0vyqo6mec30nlwdf7kdv9vujtsyfd9plbdmmuogzxwrp5rglesoyrfly528ig2fd696eilc9ue7z7rpjxy467l38m6zdkfxowa64b0b7859cyy9tx73hp0pk3ijvw2hi09dq3xagco9xif5fhwpipx0qi3otmy0cergp3w76ccmdza4qqd5efzz9rmn3e0e6tkb21spd48gyssflscgtv5ps7x1osp3py1v39ho2e9x2sb3yc53hmokwfdyathofomaiq0yw2zeddghdg5iiohokq6q4ueo2d5cudcluyg4gu8xifsdui7s4uzf1z4zcn6mlwnlwu6m9ivdwuh9i31aw9p021ue5k9jr2ks4nql5m51aare565m28yilz7rulok17q6tbktzevverar74h77fjv53kg0kd9tjuzxzn6wkqgusl5dbh9rsiw0uoppb62v5q877ra1erd4wc3958870rob7howorr5oqn1ynrbksb541m497pf02yd45nicyhv1p9jfujifiuln9ryuof3z2x4rzesncqw4z08bdvtwievciukpi9ggull6ilwfxmnthvmpgxh40cbv48ilyy7wehatjwtubi233fp6w5iv8vz050d7t16i416pn2rdh1w966d778jlhxwy0m16tuc3zs943karbn4orcgx5cffb3xudmz9wx6oqycpq06x9rvv7iedvwmwptzsejmt6b8o1lksofqaxhnidht0q3f396s7w7qtx3nvshiype88n6u2lfua8p53wda0ovhkbfshhx3qugunwkqs44znfh17bsj7jx0ez8f2dvyk9allhf2zcvrk1veeug7t7f6gm6yb27wt1kerq4vd3djmy4w0h0fpuap0pwu',
                expiredAccessToken: 8139482994,
                expiredRefreshToken: -9,
                isRevoked: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'g1xlmpq0goncqz0x2njeznzt5primhbslg95o4ajovvt6o3l189ha0dx2y7nbno1qz2kmzz4n1gmtu7f0juuysfg4jxunf8q6qtpz0kxd9h28sx8tmd3ejgpvl22c67wbjsm426wls5ew62i9alyihctgz3g7r2vkcotjceyil62ymym8uc3s655jhs4mn8tq27k9uhlx4iex1bpqwtfzfx9armoappaphh8j8e1fdp6u1am82dny3js06ss989',
                secret: 'ma83jxafzghuv91jbms48hd988ebxe1g87uvu61zbm3c2o9u5u31exiqjeovfoh4od7nrd55tg8n02zwhtl7vm08f5',
                authUrl: 'wo0gt5cvynk4juwlpnjge0tm574yuepirrdb6mmxy90pydq5223jc11xq3faybbqbe5e28hs2scno5qxkpc9fvb0clyi3zczsp3gfyjo37jx0ncumk3210f5o5qkbtyjrzavbbyuzcyweef4ehm1u8ar7wkf9pq3i9oepycsvefshqds61hj7h7zaij8t4j10ji33cocjb889d73ng799r4zwwsaudb2c6hv5i7dy7rei6bx9af6derciasv3kqp224i9i44uzg1174ij57ktoqqn37la0bxz6jqxwshue7ckgeh8bqwxp9loiam24v8ney2gh0ebg9vjwb22kah437kfp66039yfvm3kmj7be34d5tmf91lhfv2zfvx5lkr1zdtuha59syod5ja16fjnipz5c90dlvgctt1okxasdp0nai5e49nzlui072876s9ctqosn4sleo0ghm4vm501shy6y2di3bzarch6553lyr7h7y97hw8p6j1ap6jb0puwuqgb1jhr48533qa1m48b13do7v7odevyjvf2vs4x688kyu1lynzlrl1fq0j6xmvb7zhqbsugkauugkjvwqi6yvimr78iwxruwrplyf8dtcociggn5y3ull5n7pi4trnalva28metqreojad1ibmheesa1afo6mixlfl9gkf3sat2lejlg6hjr5888nfsd19kozv4k480of9ee2m4a5bnxpy8ccn7vp89bp59ygj8ababhi9oumst8wwijqtolyqyvq5zx2td955z6kjr3p5wycy78ice8kjvc5anplq3pkb0m471kg3x7m1fodp4kqq53kgt5psx4x9mo8jd5u6s7l9f0ztz9tzgddfshz97pte5fcp82601a4apmhkqinf8roqugtqo5xtpi8r6y6qroze5wwymw7jlvv9orbntj6cmpjz5ro68040vv0sij3si917hgz5tvxsh1ufx8l6r810c9u06x3zz80qkvzzw8oliv91mxss7kllojjnj3kjd7g2g0i527ulnnbh8io1v1rq1ypjmklq0x5iy9q9cgu0euqbrq8h40wgc22hy5h620kkj9c9etgwezizpam38fnrv1tgecpy80beost5sld5t7zy9plzj9qt1j16nm1ovbn11q4745q7ddarmxrscnon4dwolvpkz0ll9uyl4uttarcphhzlm0rr6eezsupfebmlzr8sq5o3gxan4mjhs6257h10rf6bj12aojx8dthfvcfpzz431dglswp8i79u0psq6ma8dh5b0291ok8pisixl3swhy49zsba5nnnku2kncsp7eicalkqq45ug734s8htg5784b6uhmc0anj9gw823a4odtwnzq0kz7ev8zz4n8fqwchth8iyac7ec5c9e2385tjrczzy6bfubmdlhzkm34nncvmi70mya3ofbova6r7f7wmz1bpnuntvirsq32ztqnawgp5orndnceat5lln968dsj2mrnofaa7gyy04dcrhjlj1jii2qe0xot4rqz97qli0txh6q6oxsix1bd2ing7r1g92m7b6o7rfud09ofqan1n0m325a0sekpqhdlrw1ri9zeday1t72c6yjloleryb9h2nce3fznyw659dhtnb2vvars8o5ed35tjcsgzep9948lp5j0kck44kekxitqb5yu98quz10x7p7sxkug4ihlt74lrqj59pqifwda4g6fak31gntajmdxc559mmck6532985027anyos1tyi1di1zkcypo7cbv7awj3nozlwfkng37xbgdsemnyxekm0vby5qe9dcilc46u6elz1mxozdhc21vlmkogrzdloow1rdzswtuxkfx3thq48erugalxakxdp2ajepldc49451lq6cyqvcvl21vgml7jxstzk2i7eirvf9ekrfk7g5e5cprmsupwd918emafiuc1y2jqw2en1a3p5wpg4mb8mp8phy5dopkttq40tx4jzgndrw1drosc35sd32m3w8pf9uq40jxioye4ntnidar2',
                redirect: 'j37uzlwmg03thxo149c3duzbmti96peccr8qlp2fudholfckzoda4msfh7d7qlb4t0ccw1pemdazg5yigtnkkprs2we1s04pcs395bpenqt5r8dljsxlwc613wjfbci8sbyac3386932k105jcs75n3rrfi305b0lwifk7rwp5jflu7z0ms3zejf2lzzwgp0rclmq9kpgsoler2uqgivyu9p1vzc82afyacrefb63eocgham60eesv24jaoag52wvrba8bspofel4e5hl0uqx8jeqfmfy5sb2d39fcbr7o0eu50icfdstgpugg8j9n8ekd1qimdsyidf3ofw7de8853otmg2or8ekw89pby50dm42xpxy4bfz8klrchev5vww3pxx9hsw7i8glgv062vkyvmvjhetwykhpxvv2ajohll2pxuxt0nqnrmoabpwws5rcwle90yjm8i4yw6e126sjisxf15by7gtlyhhsh9j1jcy76li1owwosy9zcija1rdspkpf8cogjt022du1wp7l6qbua7lfuwvvmherh69s0tbo00w5qbiw6gpzt2wmgppqevrp4ne3lxmora1v2pbtnucoec24dad04fzng6mjzi73g0wcdxz0qfqmjamseejbyiej2y4ws5dd8qphivuze5rmve6cfjfwkdxggbvu905mr6ghz1tn1rwfgln8zp6tlzickomdnln0o6163ogiededcpwv2alfx64w2vz353vh11emtyecotm9qxkimx1l4az0kd91hive60wenmchxjc1g9dhkz5xm5736uw1psc2i584at0jo8e52rym7i10uop4rqzlwynz5yb3q3e94zhtl08w3537tp84biu9rumwbcyjr19vkiczt60s0yal0lsk8amf2ibgu63y0qzll80sj58noqykbxl28caxk2azy04722tv4bkjogw2vybh7ip1ob0ivwv0bc81wi4rr85xkpofwj7iju3hvijfsg3ovomsezm0dn6qzqgkrpv67v440c3fmx5bl7eeq8muo73kmx7plxnqngkes9jv2rtb19zgu10pfnz72cmissc3gbm9dcf0h7u3supj4i1pweqj1u5im83l4iselew8mtqw4zrijcquo4rcp4xzlsfzqjo95tnha6ig0qtsncvwv3itkdfbn4rpyc7yx2n9cam1ddyhat7rvwc85oxyjhipln182z3emr39lejwt3d8tikd9tui1lxbxr1z3bqo31g086ofjecy56ffnt0tvmfe8h0uejcmeun6bwlc33ezfrd3m4lfsn2oo8uzv0nmdlfzhhi9uzd6fc6j1lmsliaf1llt1kafajgae1dqpayhzj65j38nfbo0low9auoimgn40xrl9p3x022txv4bstmbaig1gortveazdnk6b7t4tz0b2dre9yaepk9jti3jsiwamp0c5vloxwau1gstar7rqrg18dp1pezdyee2974j0dtpfnaeed6q54eyvxd3dcicy1zjh996ji1zpe383nup5s6mo2u5dhl8z46ogn3rw53rycchom7a2lxi8b50sxvxozuu0dr049aqjxbqs18mp3pridcpdwr97yywc54al7ah82zboer0zmb0tknuk72cdz2u8sfjdqlmxeoxaqghnpt74tvu9jsbduecma0lt0ns8e0q5zjgydx0ymzagmidk5lz4knoyrib2c8t165h08ahehre942r3g9cnb2niw8mkeu32flziuv2sbmgptgwspa3247vfa3z79d3qatwn34z1aib9xdh009b23c9j16nxpkuasw1lrcrjucofsioqoxsf8d2opzx1h7c1j0l3jn8t44zx8az7pmrq56qnqoc5sclw7g9r1iox7o1z6vnapzeyq0rd05o8u85cxyxzooxhjg2mwmqekrd55dv1ovfi9yxuufxgt6c3ibil8gl4aqp1pjvz7zef74hihlxf7xvpxqi9iw42eh34f0hs3tg0mrzom9n9whn79hglpu5kagxjv0xu44a3clfs1',
                expiredAccessToken: 9470127413,
                expiredRefreshToken: 5172175836,
                isRevoked: 'true',
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'AUTHORIZATION_CODE',
                name: '3we2po8twm4u19trjohfh33wc5f8do1xb8g8wfq65nw3rwfdgfw372eax4q0cd3qmerrxuml1kxoy3rtkvhc2ntma4r4t176k89hmsnstztji33pvmg9jfbzdilsc3t5cttyjgw58avnh4ftg0jx3s0ikm2bysdd4ro2emn3qjwwnqfrc2twvfsn1kbaxmh0jdtkdk4n52o7ygdv46uoe5enqphau4aqj9igjqweathbak6hencrtoizxnrkyig',
                secret: '66sodcg5d3dyrpl1r2src9y58nfbqz9ul16goxjpycrxurrwg61l2q7yv4a40j8tyqt452rogob94rc8wsw8v9md8z',
                authUrl: 'r2c3v7uh9ybov1krcktyvwoonwdfxt1ry9jx4jp70mju5z2513bjsgbrxf8ysvy5jvtgdsb3k867xol26khogfy0jmzeulyi7b3xxvtre14zvyg6x42p4mm7j13la4v03hqeih9o2kf1sn4flsqhlfzan7evq82outy9gq1nwgn6aaxk9u2x94ydrudbahczs6dzwkazo61lq94ubdtafcz1j9q5yjbklu6luvizmmfxt0bve00vjmmbnmwylalzx0vrflzzssihhz15djsih5s8k0f03h8y0j6ntjsikfhyvsmnrdzzhv6bkkaenbdtoxv595ofv85ol44xspwkkdkf6mso1kr5264hb1a4nofo1jzp3dh39y2jn6s06ems630gk7q5x2yu44emhiciobqlrpny76kaox0rslri103qomadpt226boew3re42ea15obz53z51jzr4ewhgpasjbgxrxcp6z52u4ry3orutfsn0qvktb3c0yhdqi5jmar3ob1qaolfjgm5amgbdko4y63o88tazbfjmt4qtqfv8thcc8fc6jtnw4yqcntk2cuwf0nion6htf1yqe68jiv5wy1x34qqsmka3pkpx3mze64ixegn3n610n6ix2yyo9tqhtncv8iwo7yxc65s8lj3d6ffs0v7qz7yeipcs9s3t85svg2ykyql0c5tvxg3o0u4712sxz2affcf977ehs5s0d8c06ztwfosapdksj9a8q5eqliivybwkmxtika825dw8wi27e4mbdo3kq4vxl3v5azpbf49hymcgodcxutdw3jsqf7drzmi8tn6z9el74pvtippx9614lmcy3uyecf1pvxqs41nup0bjazh1pid1btber1zsd3bm9wq7wv75k2uktobitbmc4udqrumojs8f3eu3hf2r92h1o7ik14gtdizs2b0u3w52uplc7s2qzwhrewvv3l9tycvei0g2co3rwzzfc8ijqh1yzbmerb23orpm1vrprkrvq0tly0ce6gmdhk9m73ty0d9rwm5vb6sp13noiqn26pvgvijriztrp7oipn7hd8bw444l9kgqgefzo3n8cdmbq9rqz09g60phkr5plw4a0rgwxd1xzqly7r1ojxzo9oml6ht5eb0jf34ollf0n1k4teoahzjzyj6q3a70xmwmcehw2w9sx155u746gcsexisj84hmrycs9eqmbyq7wu3j7043lspx4jaeikeppd5ghykkx70t5wjjrtfnwx7frx5j7yx65qnoi9yzgfxuib4y4vmpu9gmxn2kgwinuuzfl0gjqd3k3010thpuzz37gbyd3twvuxi78k75lo7sw1tulli2a891vmykbkwy0fjko2p9tk9bdpnx1hrvqciriar0y0vkt7jbbihw7x7fs1fscnk3k58gvwvtpuaigfk54jw2b4ay70resm5myzirrvxbg0mj6t2uo2j6qimn6odtoeheaaap0mwxooe6avxwvuxvof2ycewprj46z8dxjwu9y7wiix2scyl4e9hec2t7go8ad5n2fe24g1bsfdgzb55muzvloecqc4hgtt4u4bw0sh0ho9wqusmnt6c7hvnf863h0v107ngwtqtkqkwbw3gpukbf6gikuqpo90y3c2pzoes24v6ba2nn3lac239rq3zta74a5vwltgyiyej1599z89q9wl1y8sdq517v2tmtap05poaouf2fnetpyj94s58s0cxghuth8yynb8r97ddcz4kw5341457cr1folrlmb90j4pd0r7vot7hrm0rfkj9mrr1pklwxtcbildinrvyjkjyvpwpfwk8det86xiroa4gwm523136p6odqlp1jx7m120bbtfr1z4xaldo3abgt4tzp0o8xobd2f1ci0w5g6kxgzapncifldsv17mm7q4f045iqdu3bh5in4lsm7wihbxgt8gzsqyzg3ek27cpbjvl78maygi6hylph3xrud565sxpe7gyumoo0vd8cnntfhoa9cxryle3t4jcz0ji2wjv5kq3wfv',
                redirect: 'u9a4egnxh1a21969baro36adpap4fekgyma1eea78isck6ucmlslqj4x666s8ttzj6uh8mxn2jsc8qs5glqrd22tr7jm3yhnt2o2k4lr4715ghwb4od6duqeg33s6q06juysa1lm9pcd56in45bnhhajdi3wmbookb8weupx4zienq93xvkom75ijnjo0rca7tqyjxcgizhfikxgyzrir8wa8cirgq6xmt0rz0zra9gdbb1png1e89nfmc3y3aek18p88om2ihzympyi883koxtw6otu3fw0ewmn56y0s5hkqgch2w21gtlma547y5oqphn33vklu8zihkncpre0f91su0en3dfeynabr5sieg0eaivu2uq9bwqe1ispb2hg1tpdcjdkk3la68fn8ec6nr06zoccu3e3fvkty9sfnum2qbhxkl0qny1ajib068ry6f7pxy5zbz3r7xjyiym95ivjhyk1nomwi9uj6evpi0dpy00ho7ffjz8aesqvx1yf2oxt47ybtraq5dckcbfetnh0jco2jjm9k7wwoiu4qtmnx58xjz7urn43ipxgng3xogok6pl11cfztqysqnh2bfdoz2nmwldrh542epw617syk3s4jnswq4r1nm65yyn1n9mhbj36txqmjmsipwxii90a096342sq9d1hlreztxayf7p2okp1yoaar7xb6w9eou4flxxfokkevr2tksm302s0u7u3aczkr71s4owarndfddpzdl8pr4ktxlmi1kmebt33r28xzijbfbmgtjm6lqi20fd653vhw68m8255bmih2grvdlyfyiluilyibarqi3tsvtizgxlurs6j0wr4t7f3tv2pcsx4lyd30pp3wjmlaste4edrptybeedtdopkrrlr3i1hwrs0ekmx0lpz7h3vr90zzcafsnocer1m77qoueuay9tnn0izbcjyt585p6m7uk779a4ufjvn5d92idq6ramnjxriyz9x92ovqhjeq2ib8y59d0qfixk1otmdudr3p8voyvvwmozsfkjmga2p23yd2lp5x0nwvha6rs3i91sovq1heqtavacckq7cjw0c7gspyty6ebmxdcxpnphusqmgdur1470q0j6nuq2f4mnjxeuvlwk309vg328fl0c6f00n03r58luf6oaysex3zjz2cqa3li0jaqzak1b2ifzzw46icfhj7mbv71ovbss0bunsj4v6fmgyhbtp40q33rqquzydzreiw4bzpmvd1nzkha08b9hrzi9vps6gro4j7khmsre4q9l0v9vofri72ur4xpieoyo053im0afaf0unebxrrxqn7l5mt7rozf8uewr7519pg0z43fwox71835mckihyzspaunga3r71lz1lwlt83z3rfz586z37c0kxrtwbpz8i0g1zcbtfc2xsa0l5jo0ord8t6iweg9yolluz0tsdhymkq8q8is9cvhslbmwtv93tzg28ofn8m9gvutesm4ozk4a84phztr0hfzlw7i0ie1ljslfj84dqvftw4zamqhv1iw7zaxkbvwsz3lz8wjivbtj8ufv0mvku3nyykdorleu4wvg1cgzfde1eyxlouhfmdam3409xwrvs2hnakgq4w5edqxysmncxh068pvo9kscd8r0w750cg9ak14uytbn87pvcg3httg44hc1ag6lg1f80vu63u9gt6e45ak3r00gl18w5xeu4y7ydyx2j9whaq7mnvv989y10vgrmnwr15q7qa8q0hmf05hsm5euiuqhj288btieajcclee88knqg9p6318qv4goux236jhtmkgb6ebqb7ip0zkx5l40k22rt7yxvnr9xw6qjid2ydlx0lt5cwqvy7xwbzy5e4ppbfxodmk8per4m3lkkb8qg9oeg6hx9awkiopcza6xxhou8465tb1si4j824f29kdiolmgqffgkvpt2cw9n6x5a4vflcseava4tfgvplln6kya3ivkvqzbd8iiq8rk4bm6p3eambayumxstuj8qehsalnqbnl6nc7f7',
                expiredAccessToken: 6076522938,
                expiredRefreshToken: 4966217183,
                isRevoked: false,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'XXXX',
                name: '6j8mou82l4y8qhn0jnh3p57ofqfoe6fuysqfjfdmkbdibdi11lb0liyqjh9mcu865ce2utmg5jcddi4ckmie9v6h5nlywpwvb64i75z3p47k53xjyy86v11ca4rtd2giljz40jgk1q8irojacx7k0galavnfm3crauwze7qk76s6w62uvzf26owu0l65g1aykc6bmat2vlfqdzopa76j27rrsmzbllu0v4k3b80q3lftcny8uypfp04mzkmqmdl',
                secret: 'i42a7u1bavnlzi04ksh9itsphyl5y9b7vx2j8o1xwf7kvu3s8euafhqjmvx63ycv3sebfc5wyki4n0vg61d2y25bjt',
                authUrl: 'fwsc59xe8astqjhcuzkwwzcmpfqz0ir6905kbo4ty2byh9zifni7fxqp3dsjxod74vqj4kn44564lkxrhn73yuhvqe9sc2b8g3w184aqghjewc0ar4bhapgb9mi8old306oactzj44lyd99tq19mpmgd9rnrakdx9yu8qaoqziiaaiaq23np90o7bup3t0xuw8ju811u9s59gdbg4r1sh9rfzmzjt4qw9ixneqo0recspgbkhpnt2fqgpuol28hd9z6a30mxrevkkbs3gx30pei1cvrb38dorsk1auq0xw1vlkmh1de82fhhh20pwmt8g1n57m5vrsoqqfgxbfwx6ekwkti2iyhifpjttbqhir9ibqpnt0tjeuhtq38md8bdtiewtkysvkfhz8k0ne5q4jhojx0z3atu4z3ho6kmv1gqr6aedmca5j7pwbs6h5sy1zmjix3rlial0p0kj9wlk1npvjjuzxkn8rmpctzuasgyrv82v2ubk0k5ukv0yze61ivbjdin5b9ufjbfkx8b1zlpcnfrfcm3xv0d0lk9virljogzbgsse8q3b29fcoxsid24u60gpli9ol2ijjdgtiieht1w36y3wb8dg38machf9nmv357anb51o3osnnf25h9g9z1yzu5ve5gzlpec2x2tv4id8hrwb21y8sukf3kby5r49dnop4b38xwhz3vbazyurr95de98yxvpove6sy5o9g5236ld3wgeej57n5cuxufgq95q520653mp07i22281fkndedkmqrf85svajcgkvqi5bqkzr87jzlnhmzs1n5pq6etzw6n6j1rlngpdmvnz4rni7kobl918f29cks4e0wefsq4mkuj05p5t4dsvqzt3qpdguqyln93a4pbrzz1rfih67prv44c8226tcc11b3d9bi3gq8mishhnrzbww2s12ylndty8zsmymj6b20sirp0bv3tijrer2oim41iqnzf6d7js0k5kgqw817c5agiend5bmjk8qzi0rcoy0jw0t6feilbqfrgy6lyiisaydtxufwzufzxjx2y7wi57m8za2zeji8otk8uexq0f9tgl0byq4im2y4hgz9yspv1xzgdwnj7xkdaxjr12kyvp29p04a9nllg1ghw2lbp7dknykk5e761dowi2iavh5p8pm401tesgdnuli12in4c1c0yn3j58jouuafcpemoh64ieox2a0w5lkrphrq58v3ddjx32xxda87enn5l476vrfirgyrup37ypha1ad6nww6roawg6rb6iiu52c02gwymysqdw30bvg00mnh3q5lprp5ojzzwyu3v0igavak5eieiuhdwrosy894hakuwcnijwu8itxxydk5n2gxjyvw4q1s9b2f0paboryjqlw8jwylzxhni0vz8ivpdk4zps9vrbo3780b3aq7kkxnf0ygpe4hj1mymh02xu4e35fs9j3bp6fz1759jjaz7jol16eqyrq84ysdo3ucmluzwzmgdiumdd9l6n5bui4um6kg7vz8jj8xjyww583fln8l36uhrqv03aiwc4xzf4ece2iopkwn5dypcegdbb1ibwx2wnh6emdnna0kj8y95fwgxxcvmr9rrozmrxchsyd5pdxjvwjku8zz4xqbyb8mll6ctbdo9uo2r6wx7emtk1im4a03jtqknodqnp987crp7kcdze3y81vojutm9rq7e2ensmhcp9d24o6zdattzfze9oak6pweyqdwu1xs4vsdzr24jlu5p1nnuz8l8gljvo3s61r5mq10a3qumrib4nusmidbwlox6x9x229wuvum8csvfohlw2yikhjm57vi5i34464l880hxjlxxk4h3hc9ic6lla1nbvklmaqjeb45vb2rnw9jl03d9cguev9zr77ez3mnb36ir7gje8pik0o5sofx64mjkho24yfy5059n9k7tk81fe61hl30t6j33427qlgwk352lgka5ykm3smg2o3elnnjsailhavohanwn48mkolluytrc9whm9ht0fkuo5',
                redirect: 'pruvrvms1obdc8av531yk3duugjzifene95yzi30d9i0q8vd5an5rh3e4gy4g25nb21mzkawdi73gale5mhpebgeaqp0jps5d02tldvy766kblgxm6txlnv0t7zz7lx4ftphzv5lq4aq0ypl3xxan75gu762ffczh4czc3o6cjesxz9yd0tqwsc2pnlagg1m8dqpc05z2p0858m09nbcsridtqaw8hz4crl0cjnrztj9fna0ggddfnccdr2fsv9cu8zaa0r46un2u9t0cjyjic88wa1knk8tqvqpruv1ywhc59cem95ds5oairmv2jqxypp02e0nb7bmlbievsrb00mc8jvishw0tixe9moyicbdjf7qjtil7vgjbxer9858tfyud8blf1wvjcbtsfbqrv6z2ktifu29onao1mv7uq0rcgezmor6hl0mcxnefmllzokqr2sm5rztfelehaneccunqwi10lfjwky8f837d1xmo9qb9khoj2hsh246c4olelsshxwqgpxltxeer4ru7tvtaq2jm9gb3rpifh9f0gh1wr8canurudc39s5ymrbb1vg35dlh41x2l5o536r12v8m8ng3dafod07f1eqctxr0m4eanywmsra0c5arvu9ortsxo6ogj5wjjp4smohal75mw50xox9ng8kz5lojcj8hoc5tamqv8kdksej4oq46lygrmjlczrwj7l9ct5m0iiq2buzz5lthwd78jqav1r4vlgdjfvvws4ylx0u2g5z4sp4obreebw5m9yhhwojm91qgu41iqdf39ai0pz462ifbe4is6if60us8zv6muoajs6ck3g0frwadqk2lqxfr0mtzvn6jghs4tncrvvnic7hyo2nlfj3erxn26o85dqvoyk8pzkhgq2gnci1bk1pqm2ix8ixoxlhu46uyhl9gmm70p2ooad4k5o3x4ywopqumesgl4ta1ptlgnn0t9njfassgn55y1ay8ydpw270xkfscys50dzbmffixei6k24nalt5jaw188uty0xxr5y5zzq080pn5yoclx1z89znlx3ufycj3dvlbq2d04iz6nyv8eeagb4qd96i124nbm7psqia8afjfp9d1vlbusaslcs2oejvb6zcmt05ckwr4x1dj0uokpty5elpaoimqbkxa2lcljaoud33kxswofbb5rmm0j2jg54uxu2et94cp70fn48i5pl5c634f6u98bx16ccmmncthe6wa0td1qto7il8hl8e62rxxpixsaq30ummo5lu3zkcrngg0chxvr62ltyup97vkut0lxj6lknveftn2upztgoszhw3y2ysw68ncibwepy05lpc68uxsnrtirp2dhay77y4a81083agyrqucuh3u62jss7hqcajb4hvqs9dojsinnu4xtyikznmmv2bb6l5inchuv2gll08hhkynw59d7sg5bkb7z9bu3r0w2mfz5xm9nlfnarr3ki56yp95kdwvywhtgyhwq3m0bn6ncxeryimuvw3oea74dv5mjpmhx5brwkvlqqvd1rvt5btny9yffd6z456yreborikrwi03utytbtlr6pyajf6hyknjduu0i8jsjdlusowj9uuxauij5rx9dqhizotsr0zigi6nuevyp5hf4ot66qzx7zy1ub34eio39miip9gxnlszcbizpaq6io5a02kw95rw9sb1c4sr76b6i1rkhddqm329xjsyvqi5apylz4trhokq9ga7kaxkxzcbmtj9qldpfx4hs8s3q80cktny7wgk0urkyiftibsi3c4s5v4edjorqw1erl7u8c3riz9zjj5098ma2c7hfsfqwz2dh4d6r08t6dprnrx70aw4xvuwin95tuxw4fm55i3ppr3jqy790g0wbhkzjer6vqxe2pvw1faivrviv2wkxibltf2iif1ummbva6svoxybqh0qgdr45eg187lgs7kjuulhvyw091usc9rbugfa7azdqjlupxswt5lidipch8cwrdrrh71w90y9uqwv97ighb9vocda',
                expiredAccessToken: 6202744609,
                expiredRefreshToken: 6555146145,
                isRevoked: true,
                isMaster: true,
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
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'CLIENT_CREDENTIALS',
                name: '454m16cqdteljp3hx72m8w6qf7dd4aoe7bc6zo4zuh49bhbuvjthcjay0krjnqs4bup8mn8u7d3hwrs41m61jj039mqmsfqlwzz8rfcogiu590pbkn9wc0euy1kytad9o1y94iwg5c9iqsbej9wa610v12h72dbmden1uhdsgkgsibz0rj1w85i8pw4do8mwz4rsd49a5aj5hu43texy03s8rja5nyhvua1uoz4gmqqafkqdqntjupwxy7c5x4e',
                secret: '5a26il8sgo79fmct0ug58skftob3lqtytb9fy1tj2ui7irkn3fjau5qkjf8fxkx0irv0esntvusscflat9nng43la4',
                authUrl: 'bx1m1zzokscdtimswco4nwsr1ypvwcmm4lsrvhbbx6usupoy39a81d5uhq2i8ky65w0xxzsnlp8yc2sip6h7lqq6rf4cglzf2ox3uq1aogd3ajeeokmhetbsxrybqsaka4jsy2a4wchw7r78exy3rya6gl3wnfmwt4ij4ta77mxycqezvc3w1r4xkegpc6rlykhoqx6iy1yd936zxtn276eue9s9nmqbjvbidb6gqqupv2d3aqikzl8v2f8ubbne8mnoh5ibwck7jl5dgof9c9wj2mspan6s2b5hm1nxw84qvsfnmmwh3kuttupqzltw6amal1ztsgt6b36n9jc6th0fevzptqqz2jrd6uflja4qzb718uwj4kux84708jkrraehbqequ9ns1nnagl67kopp61wqc8m8imfi73hpwo6r3t4iydzvbfqrcw5xkiuqing4mcrhgbhvlpfohpsrwqnztwekmljprq4fqakew0agj8tfmp5i6u5dnuuy7smoilcz13vx19ygarc9slqd4peephsevqtbkobq3yo1c1k39h88xhhrr0s2q7li45uims1fhdp3o27xokwugawgkxxsla3qmj8wwbene4xfta0g1eo6dgjv6vbjwbh5lwvo0aqss4d4jao3gztchk324pvosbcvn6whpf5ng7ibp7jlkealxhizztlew1nwc71wwblqwg72sdr06j62gmw20r1nhlb0pgrkiunzbyr8l2nwprmpbimjpkp769gd2yd5dpcd622znikol5vs07esf1u8i9nyanigakvbwu57y34heq8554f0aciscbqz0l0dc68s7eqjlcdy5vztr0xbus8ca54l75ilcjklh84xysx3mr4drv6c41psk54a5ceor7i4qk4xdwaid3zxzva8e6aqxbcblrcwabzoyxwcxmpxkgu1ntve91res9b1c12mvlv7wy5bjflyplve6qb443ij72eldwae8r7q509cgimocvwklch437gxrkk6p0mpahm1nx5zf2i0zuzder64obb3lrbjq8op541di86sd32vv40v46x0mtzcbkec92xp0rjcxfotmkh2x9vsb75470m2ygtiu10gjo5t8uqbzhxo2yiwj4fdf5fepizmciv1yoeao0x05x40jwr7t9lsa88baroxmjwr9z2ffp45xmi6qjzfbwm64lxsmtvrv6ytrtts6y8yvd97rdgou0nk2nf9xohqlbovstfnqv3n0i47n5r5j9sp6561ueqycxxcllwstyqmf0zq905009lho19w6ztc4jz0vav32s4ciyuu7rrqna4s782syn711dizwo1emn8s030kjx7k5at0h92o2b3j7xrndwp3v5v4xvuffsfj6myrb3efqu07x9owlg2rpvqi6ldx4lnl26dmgule7t8wveag9nta4t2l04evd7xxjzv8azvbi7xojx2xn8de755wj7n7msc07z4vjc2kavqd6feknodnshjb5unbbxnc1imokkbqqy7werc9ehbk9ygomdf6vtq8j9qpr3dnq7fgxw2529y2x2fi59shi9ss8ywb3u3oz2hvj38svmlgqex6h7yzgjfcsyxcv4uat3owutvursl91xkdw4p3tzo6njtfssyd0k8rukvqdy5glopu2ehlajdjy80fzx7485jifjd9982mbc2mr5eb961racfs3bfa1eph671wrr6ukivt5mk95rlx8qe27j9mk3o8c7ea2v1y7kcq8js8w7pfv3ncci5r2qn4lh5lvum5dwrggysa1ghqm5jo4kmc8vwj8wvv02ownpsydhj972z7ipvx5ieb4sif91nm1w6wggao10iv2kcf7pbh6ayxvnhmiei7yn1njj6kljzzmopvcfl8rvlc0m0ojco12i43wdowgzw4io97y9u7wt29ehbg2taf71be1hnxs03p1dfnod3b5ehbkmhsw6rzq0x2bvledp6ue1dt9edondne3bv4j122wye9lqth984u3ucw4zxd1zttlwfkhu4j',
                redirect: '1f404m2w2z3afiah524lsenb4hxeqvhcs05brjjuz2o1g32eikdir3iwdwcz9sopjnult4apu10yeu5xwk19u3o1s44sudb4pr6317iuelb0uc8251msimauwpu434ayjaviaxggdf0l5pjtrpc4p3an75oms6rxiauedpt2j7psdlwbdrx99b323wpz5bp05yy336b9vzqpov2ra58uvp64mbadjac2qadb14eq55em2u69oqosv7bq1z74cof06eb6v1xzkmbqvophfio9bcpk42xxmviwqpj2dgefqp16d9g83bfl7bvq020mgmjzy9a14t1ypb2p9vdxpufbygh5ixt8cbnwvuj8hwvfkyz5s81z5i40333zxn2op177b8x3ivdt3eqeikh3pi0aak1xte8kv0celtdm2dnr3ex3mvtb943gds6lt01svy5x85dm4x2e3609q22prkpi7bj7r4o9pf2ktjiapni47x6gwft2xbc2zpcoci4dzm315dzc678tf4g3wvxrylo9jhhhv1885r561unt3jgw06tjkye13fr5f650n4t1fmc7o9mxiet9qdweo0jj1x922rdfiqzsd9tvdx3bwoc5926kjwqs4viybi9j6ipxeryrz7ibovkou7a6brn2stbf7esl436oocfwywdk4c10hx6k2x2tizcawsivvprlywq8wj0q7gse32658jbig089mk86f954b0sglx7vap2cagvldj894fj1526pxxq6930il3lh1hdk53dz1pqxpl8a9v433wim6vlg37ssnsxi9feqnsmzqjuj4j3sb02rx4hxavsvwdygbkogv710vxls1n8b96ytnotyx8u6qih3wafu0cbby3ixdeq2nuefqf3o48kg0dkizgkdfzp6iu3gz998jf1l0k247j0xr546j6sdes94k2dq375jvruw4m0rvvuqbw6iedoo5uppwcok4zeuc6ipioy5ynxkudv8ido31rrpakshp2pgwy44bu5ye9yqn961wyu4vp2943gmvief2l2akyprmwfoqihh1lkxejlevkex54101klu911ii51jens8wt6505xyiljsn5h4kuwm4b7xu4yuiodwd9b29o8x2swzhoms8qps3pigii3gmwdxllde7yheg696htsthcsgjst5n3dbdqseqli8umesziorlg8vof6dycon8yuvkouyyarujkhojfs7rvifs4iklqjbtp3cxsl7q2125hys8l9bsna5oobkq74ikykwtc8tcutq8qpuw9hx7fidos0kwgnpry62bbk6h8sjg3bcqu9maaqk98fia83narp1o00zx54l38q43vtc824nwqjq9yx79g97ltup5a9vrfefamsd4q59r2jg0w4qxf3vzqgtvx1goy93zs12jg5w1dh0kabomeozgp5xnzrtmxc5qjnp6u1fsslhb0uetwca02e8gkw54q38gr5zbgpksfkf0wuf58ok6foex0224gs6xxx4c4o8il8xfvui82ikavjrujbb70dc3jc21cozu1pdxnf43vkkmhy5sylanesk6nj3bxbdy5yw457tq4kj345lovmqkx60z04c497jd5g8xh74qquoiy7e9yncvdbcmlz4ss3etd43mu53rgucr73uy5rfvzlc1018ilofxsclycaufwgmbbxbi175uttyrvsl77dnjyd77kaucmh1273g2trqkyq58oxw1tvo17hxmi0nve1aq8rvgvczjctbkpj7js7ye4ic6fbtlysax1z096yh3d17h0xi2gojhiqjl1jsg4zl2g0qysbxnidmmqfrp4tmxf8k823456rvwekr2vkipfk0rpcjv7vj5321dbt5jmps6gy22y6eb8pr9zl8r8rdb5dkqccijeqidn5blqnsdilbqaoj8puve87pexoqszlmamf8pkkh1qetu1xhjf02jsua9zof3r3pjqmhk68bzx0rox0feavcz40hlx2fsl2qh1xhc6f2w7udc3nkkgiamyldxn05',
                expiredAccessToken: 1103753317,
                expiredRefreshToken: 8943148684,
                isRevoked: false,
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
                        id: '00c08948-1bcf-48e6-858d-8b5ffe54daef'
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
                        id: '414f3627-b916-4f8f-8286-bdacb61e6d11'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '414f3627-b916-4f8f-8286-bdacb61e6d11'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/97771187-53c5-4744-a836-fa71bcde8fa6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/414f3627-b916-4f8f-8286-bdacb61e6d11')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '414f3627-b916-4f8f-8286-bdacb61e6d11'));
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
                
                id: 'd62e066e-c705-4804-9533-1e35e246f8b1',
                grantType: 'AUTHORIZATION_CODE',
                name: 'm34jv3dbt8cb14dome3ttbgmghhwm0c6rvx0muavv5demvxgqalugqmb6rbg4b73cl7w7s0mtjcbeaenwm1scj0w2now4j60v3cv94b0tpulc4pew1c1hu4q3ajqcgdnakv6sx5joirr1vjogkahrgkk0wo2ui50vp519vpyjr5r10wqhhco4z8ey32e6oj9fzftfg4zcw6zfibi9zyxzdfdksurlncurm229lg5j2oih7t321q0u4s4n2jcgcr',
                secret: 'bi3upuvgrd8yz17l0kzhlh0dymdj6pg2vjfwhnpxo7fituww7pud4owxzskg38qjilvvlfzzg0dvhbs3j524i9p6ot',
                authUrl: 'j4z50ia73dqixjyfk9ajon1h7bd8jj2wlxccea3yrar1dv7ph1rvgul80wblhayv144izctgs8sbfbrzyh5izc9w1hf216zq3c6nxdw8b0o3el1evgoom2dlm1rhiylhxvg9u61ovan18mx1l4cu4n1zdqdobjujyuoaru7x7q1zsdg47rbobpeg0iyg7i9ri85potyzl41bxxcz53k7643m4255yooryy82a0ysikw1dbnvkh1bbz9u39grytu5dc4z04wqjnc9fcp5xgqrwjqd4aqb9cr930z6cuq2a7kc824ktwlabnse4p4avrx4h7gkxmfwvom89mowb3461zc18dfidmwk514pfzav6wnc9hac8fq45u7p6tf17fue1ah9ovx23fdpq9i38qdw7fb5k2f510h8ov1b7a4oz6hwgtvsrjy7sez13oxda5qzslr1j5ekbm9dvhcz3h70hyaoly2yid2govk2vl9yjavpghnpt2gvpbfjnv5jphhvicshy3nkdem67h6vd6ga8iuq9iu2ar2z1sv1j9vglp47119amasbf7kpq9mawt7lndmbz658rj4pvr3tc34o0bjcuahsia078184yarlevlsid3tk48cycx83wi2ys7zogq670nx0aavx9zrun1ppyaelbf52u0ssay7im6idrptdawmgxsh8fxtdw2t1afgm8g4g7n8gixr9pow3t3h0fszdl8eax9vxxiy1t55fzno0vuxhdkkkn03ctl9sah7doll2g3ljopis83zo65x3lun3laqimnp6532bppgbup80yykev7dtop1xvrkwbycbzybbl7h4kbr7gc14cgiovedgqntmclnfx88w0n0cz053f7lsjy30719o87683t5io3mj8v0xv5ew7qi7b7rr89ius1hculuqxgdb9i4yzao3y6p808qm3toabxs03m1kbdzqvu9lvj90jq40th87gjkh09bmq0xeawczua4i8xvgeb8n5amyl3esytc91x5s5pgwnqufbnnkzzyqebq0y9x1hlh2bpz3dvdbmke6rg0vnw5om8td48wuzoys66unxsnqzz7zt7eklyo4kfx0elxoeiqd3t96jkbynxjlegkcs5z5azo4e6vdr3awa5y4n4ca733zh7o0trroalmk3k0ul2a1f89xwz9l4dchlbicgw6i5xg7iazaijfwohkluxebvl8pdbh7vwbezh1n89cykfhf1uprzfnzr5mmbwq12zl7oze2u49qnqp1en6q8oxbhypui6anbfj03du3wfnaxq65iiof5wuaeqoy7nlwf0zvodncc6faek2k1a8vp79ukjgsjprf3wyc4hj60ob76swo6jwv7mbewa8kr9f1asgru185n0upx6djk2ophfq4vgd69g9r2wiq81nrj8yvzys42a8al4tovj7jhoed671cg6uviqph558ih1johp9c1usmkdkn7wkloqv918z0n8nqwdydg6mypm1myy8ngjjknh43tr6sghozjub3gsazgptkqqdl4ecnhu6uqprsiv347dp1mj7g1au0vo5u42ijj6an6os3tbq85unqn3xwtnmus75dpz0s0yvrsuov4727n07lbqgwcpgiz9hi1r53oyjg1gzo59wqmm5eu0socv8qz6rdfoq1yzpqyd10o6nb0odnso61i42hghj8ne5vs84s1ilijjn5fspw7hjakhe95op2zhqkamplukuxk2w1j0tdg2gcxwzgunrmuc5nlrg4bpx73vsyij5ua02zg9mvqaieyt82yels48d0cxygrpfw04tmm54fp0c864y83ksl99sk9cc5zh7ct449y42y59mftcp23ntjhf499ahy2uc370x0yyw94vsq4dwojtcbjgrulk29n221y3t5xbx7ocvcjj6rpf1syffkrl32cgcy9l6q1grag0rzvefs6be5yrf43jr7pwdhin99gtfssb9paz13z5zymhzdotjx1cjbzy5qzp85aceinndrgli99z5siy57eci',
                redirect: '5vegnpirqdsu7bjy81m1w3x201ro9is757sdro7gac7w2uak6rhfk582oj5tnpzwta6wwmkws51fmtvu5ako5zofmdj631xe4zfw69b1uuyc8ccv5t88rtzwhel5xqcix64h05pv2lx2xpx8pnl666pnw0ksn7to8pbc344ne1y1d82e1yh6ir6wefdktmpyzmks24w38eepw8h7toxfdek47vq6d1nj6kixytgnr144fczpfqpkq2clraufp3t5v30k35shb08ewr6u5wvxwnwcwgy122ccbhm3e6765sx3w2xcpswu7pb9s9995sk2b5geqxshfcrkhkeqow8yefsa8r1yfjphyxip951i2kj8ob7wozjk7khrwtqh9p74xkr1k34f3h2j4d66amk56flb3hn82lhwb6boe8uui8xy5j4szoes2hhya0x7rqolds16c0jr4thq5afipt233sp6osxvwry318ttwa2m22qak48wfk7ng3tn0ueifn0lpsky7cb35edmttd8vuv6n5nljdrlcyle8bsxqbo6lfvllg0mrhhasolnpe7n44cbu1v3ktoe9cm59d5rxox9o8akumt6y32iyfkz0gww2k8wg3ci8mf0302momh0oity98opjok68ctgf8cjs3ipr8oneqilmwvna5vhgojjzafto9gubes1purzvjrwhwqyc5ei920te4jiutci719g12xj66f8a5pxpzcdenyp3kqltbl9b7vsnkyt2yb2pvtklrg1awm785gq2k6hwh1aa82co000nzquhlg778lswdfhx83ybw12d73vltu9ycjqdrb72rlneoholvm5r41yt23l31bf7cgbnoj0jy4c16kyjcgqlbg3sfa2aa4v6m7miq0i7pia185zx1f08ua6ewkgss8us5hxq7638zcyacis153k1mirab1hzbgicjjs13ccxlmjfhpac6t8wmjs4jarrya1gu9vi26dzyytukuoajobxcwi56v3e9vdmxxey2i6pmlr5kiqzvhspn33hu0m37vxw8dkc1k73pma224ek8pk3bit7oqsjx4ok71b5xraoemyfp84i51y0269jewi7oihr5uc67ygnp7y5b5ugdhspnifom4axlcp181jfotzzs2u2264xzncoxj794zqreoogi52yqn5wlnlfhofllzj9qk9gkddbpsss3vgjs9kwuo6fulepzcvh10j6yy3dkc82ebd6vqa0b3xurt01f4aehqfuwmwqv03rj9sqfj1d4sghofnt4izjrhxviig543ize74p1d5k8npbiqc1655obv68xs2imcc1ghabmffkskzqps784sfhyoytps9cqi5udg5c42sgoq3lm6dikvisbqfepo9n4ncqhq9mjmcmm7vitntk12m92aundfc87nks96tu35f9hdchvthg3bq8fj2yz0cla3cdhp7auhfrwnmancom44lkboycaibreaphubi59vm7exiv1khifkdqmbq6840v99tb860n645bfuc1ikfusxe5j92816l4fobl6v108yqd8fdsj5jnq45bfw3oxh427urracwqebpeyxazsn7i9hcp71j9k10sx2cuedh1xdfectu57dkwikkdt993m97ubcfyfgy2um7miwsfcum3bbs1g4c94kr1usmwjbxjp1pz5ab96noixgsho157vsjcdsabdtanf8czlcx34h4vv2jvqksfhn71k7nqjgl1f6mvuuvsl1hmlmnqwbm8gms2pb5b75mekynm9smkq1gu695vf13gzpmgllzc9em6te1ysqvfp220h0r7fqjkvbrh4r510nojwrxfy8fitdo3us4rv478ierlmmyea19utdmsw0fo0fg1c9fy1svn5x5wyggseiqn9wi8su4ug1nanzjsds727lt56kn00h893kfdncsisrmak0es35dltillbz37dq2qkxpdaiozj1uqtkzqt4y3s445vxq3fjmdlfgofg0xnofb4rmmpz6bzd1fpts9oph',
                expiredAccessToken: 2187039748,
                expiredRefreshToken: 7776304503,
                isRevoked: false,
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
                
                id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                grantType: 'AUTHORIZATION_CODE',
                name: '1txqewfjhbnzp4z0z7cpcy6f847n56wuyenxsmty3m5oxnagwrc29zrl33njtfxse6tifbm4esxgrhw65x822prce96z6o20e4df7rujrxydjjyk8ms5nv6g1uhxhxk5vkwnqkbozy0d3u6fws4vgoikmukxa4k3ftzktol9w93li0zeg3n8uewpvwpd5a1kernzjl9d5j7dixl16gddgxha8tw1tkx7cbniyed6e8oybzsos6b2zn9rg4wwza8',
                secret: 'kf0ptv6r27mvu4e9s7wvpp1ycl8uhphbu9jdx0pp8qvygkkm0sx0295piivoptdugdv0ul46wg4tqi9eq0ipbfo5dy',
                authUrl: 'd2fb67ll179ffhjkqixe5amt2x40woyvs9xa1omzhwwhfwx1q12egh927hybntqwkv51l83ta31d6iv34h5gueq0bbcg3uq6u63eielvgdj699ffejwc50t2z5pcroqrplayxbyzfgfjgf6pnp63h40it5d72kv548ibzja1kg2nrfvlez1dx20zokhglabxhkssg0x2ixt74cjzlrcpi84s84h5w2nc8blcg0hrxyi1chz82pz48ute1igxcjf2i7bewhrvm8k79a49x5mfa0sqj5h3tvlzgkpthc7eqovzp83rwn3l9uw9vmwkd9b0fcahjo7atyfnm064o5p7nbshf32ssnqp8bdzpsn509ezxk50q5uh4z7t5pts4u8jc8qtw4h6y3bt0f9sadcspnncu7ieyml83baidxrehtpvivu1l1ndek5fnwlxecc45l2gw9s05hafs81yj2vghvw1o978be8e2cv9i86wcaosi2bh3md7tmtxs9tpqebapvst5u0nveor4a73794g7o2brpir32vxjdkdjvc2q1l43xczmn28jrejc3xaivg742547jp6hwlzvx3xqbgb6vj3vwyzjmhgjxfl6wgkgdaj5ps598dnb3n3ly662dzw9ks531par96fnjtcdwavkd7lc4vy0l1uj9v9clrvcuojzmlj1p8vesa6kntooelu9plwcuckzp4h2ism94dv18k1ghzu3f29eystl4iaot9fxee58f36nbdcfkhj6stj8agdoofrwey5ci3febwaj0ocl27bnsryjjghtg4wua26i8gdg0fgku4if2d90l91xdk01xrdam32sxog5atcaq224e56dhai8zq2nj3kckdlblh68t9bwc69j6p7y3aopuw6hte5pn97mjt4yrhy7s4enfplznpi2egv6ly2bnmoo2eks2og05d6nujr1fe6xnzd0qnxhqfaurnevzodyo4ylvhp404iuwwy0jkp99voly1tj2fsqvp963tgw1ph9hohab9m5zlctu3ub762qtec0whpkl55404ibn4nxhlwmit9wbd0nm2dltg0snlnap0g6rcpue70hi6o1jlff5bx0t0ec3xkafpys8fdayevoxsiv98pbvrfx1tdhsd260chz0umsk5xxa8h2kglboqv5fmteq84xfey39e8yl09y5m471czsglyzztwtrerkknrc7s4qu80rtrzvly3v2p03as2hxbvenuo6yakih5nlrjblm5sesu1fcbu1mza4zwywb323k7yazv57gkxqdzzpy4v6rtb0l1opgmngp5m95gbpy2f5y1e1abnuv1vzajkqibykhq2ui1fw1k6ljm6gcirel4ov727vqs2iop5ejvs0hjq4971b954vqaxqj4bu5grdsp7san8s8209siocckxxz97trt3gedmypcyc7ab02uw8jczeqkbk8vdyxx12ofrw5sqw9ysecbpavkn5nyszijq5g3frs0r7nusgfd8t8vtfhas6ckh9pthk4xl6wjagzrtu8sus1bearz6h4mzyn4i4eecqv4w22wdb928uyjvgf83ih5oz10rjmftilqf8max1mbmaw48mbpbd4578n9amohx3c38shuxe22n84foq5s0x561qa6zzrx131de2tom7d5n33622dzmoty9ojes72dabzolhygr437gqt0sr4608pz0mung4hb1jc1ulhis4zcvov8zk02bu0elj51vahjt93yyqerfiu6jp5woyo7yd4rcwaai7issn67rfmmtzjade863uz1xmtrk9elc8axb8bdbp1k686m336m7p4fw5i2xlppurzq2n7u775wg8uviz9u4vg6rjo789l8l9ifmrrf7d2ow3xx4pldhn3h8o8xnceamlmyvtjsim7xup0g6phlh1axxmt84qcury1lmulm5deu7ppojlubjbo8gz0u6v6t4x123btue40zu4gkewpj8h7fvl508xs4etbre5de388135v3l2ytpe4m737b04dqz',
                redirect: '6un9ol3exepmmqnamj1fy6u3szqhhztta2r0kg4kumryt7kppyza2s3ad7inha6j89e2x9wb08rr5fkq120gvptcm75tzb79ndtxdvas3yxe2p7w8ol9bkb0mxo2p7kwluun2rsh9eua2czyj29fdsxeye09jvw45vn7ax1xnfg0e1qy8apkzfulb9lxm4b1wznip83ptorh9w96g8ms6dwwjipk5eerg7ixz442fg5rs0a6ylbek5gz17ls9rkidpgz8gk37u77ibcqzkjwnve1n1vj2ur8otsld39k89dixhgq3vsio83twvk2aa38yvkg3rkkawb03g4blu95m3n0g9dopbplkwtpkr3n2yqhyo0r6918xqnwv9oolho6pwix77r97qkmvmf2n17zrq3zpdv8lcw8x2cxqqkivzu9bx03j8cz74d4rsygr10hduht71rckzoyouieu1pew42acuzfr89wdpdn19tjvo9bvfxh90ucc55xw38j5k3975niszw885wgcx9it2dosfvvtpcs4azuiacigwn1jgz4gu295qjriewwrd8dkn3p5y7xcd9rtjnmdys3yqo33loq6oa52lm3u2zt4yq6uu1mr6oexvfdoo1pzz2nzyq64spi680hr1fmhjx9f3xtbjjf02jz42bg23xoj11vgpyhi0kppxebcsku98ljipjlfqcbloj534tn2wqw4abos8xd4zfs05cdgefvcz2ncj3fhw9w0odrygxq33vio5u8uavmvixti4166lmbc9j8vsxq3ukn6ypezibcbzqzb7addzni8hgegrcd6kwk64o4ips9cyg94487l278kk2yb5wv6wgbnf73me8rfau97iy2a9nk5wn8em4lgzns0soky8saauw3gc33956vgqou2evj42b1vr8cr27pnd5vha0uqs63ttbosdamd4m1yxfcygmnboyzo28wl21w3fofwos65er3b6foey08lqd63wd0dfpfw28nboypysrg3bika23mvkwm98dh2tv9j8t4ref4s1kmn9bequ8hq29wm48jqw954ibrca66bqspokzd9vxrvfue29s2ae0hkraf58cncncb1d4crbtnvcghtux2i5q4b7fsx3s7yivxw9m0qhfq3hpr2gyys165nm5qrsek8qazor3cphz2884u77x9i3z6qd287keg17mwl14qeff6gw5bmfja0on39gfvzhmuc1mi5nlnm11s2t5yruh6z3hvxf01uhuinw65surl6v51fcxka1b9h0zaljg5ufqbtjt76uybk7lb5gbfmi9nqfqf5hhq5y0b0p7093xf1su02wcnqnvayeztopnd4cmt0p9hoxx3ck4t66bhsm9u7w2v0linvurwm7uxibxxriedg6blukzx9steqhf2yt3xpt14ij2faxn1kx3ros7rlxm51wgkwqre66dpe2hkympjv49qgk97v6bui7fx1l7zh2xsivm76s98hmibbhl0l64yvr5xj1ryttk9ee7gfzgs5ricezmkaisgc7bzpuawwhbu69bxpf43vr79rqgsli3aksdmfq3tsea99r6wdihza7z1uex4tny2dogwax0b9lliiunxo02e847qokfvjopb7zhkkf7rhk8l81qamttxy2rfjwg969chgzoozsfma2rjnpyyktq9ssime6v7c00s6ec6cuuuydiv6p6q799j27f2ico8i26t2f0vtm01jjilhzuv6wl2m45id1jsng8fbqk36hfqf5wrfvog880xyg2ey1sqzf6hv8smwm0c2wv1d7xf8gng8y38k1o7ocmcbysvv108qqgmj9019mpciana3fzpeap0wh8kpgoi1in8keeu6fbxd35bp2l8p7k8dmi82p08wbk0yxgr6zl38taco0973caaqe7d4zb48ho4fi0na7yxdizd8mb8y94j0an7jbmlks2ac8rc92qbn1ltgjly2j0yuscuwaimwecadr2jbl379h603ltfxy6ojo1l8ri7ng1pzpgp',
                expiredAccessToken: 8615168473,
                expiredRefreshToken: 8223451953,
                isRevoked: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '414f3627-b916-4f8f-8286-bdacb61e6d11'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/803ad9f7-3fd0-450d-95c8-faf13c23442f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/414f3627-b916-4f8f-8286-bdacb61e6d11')
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
                            isRevoked
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '98c3aae6-d1f0-4a95-9697-95464f4769c7',
                        grantType: 'PASSWORD',
                        name: 'twbmrjuq0zmbpswld3a298di4anz3yzyfk8zv5gxw69h56t9qqho3gr9k2bvopuvsi9ko0w7r81u4bc6xpvux4l1e8t70vq2tc2ctj5co1ohbvpvwifsmxrix46ysmvew71rhkagpo3hrh0na1d8k0y4dn71zcs1m0ryzg3qkfr8l9p31755xm1h3vlr2tgjc1pixpg4hjfb3tw6cnsw212m823yaujlg87dcop3qbjyeg4f17dk12ahop2d10x',
                        secret: 'i4lm4b884eub2ehybhqoc9r9v1riadlac1vwr4t12ossz6xrb6zfaf5qbglh262aw9bzh11ajj3z1tehdxgs0kbplk',
                        authUrl: 'ltpygg72xc7lnszsw606kf9gwlzm3wh66vx8j958n2l3dk5mqao7ell6rrtr3pge4xtseis9s0rosmptkjmunqpuzi6v63fzqifqgoqus2wxsa7b3rbxjre07nojm3pgwep54i3nshb8ioairt0sut9dvozwd5pbr9z62ow184mr7smrbkpx4c1aa1lnwzmxzqjk3jxco7ppcca3bo1gmiro50nregh0gjjyzpd2z9i6xrrl7k8suygyvpifnvznwum1wc01qsgajqmzf4r5azivv8mr95i64pamfk9atyqa9gcvoscw4n6bgj8zurt2hbzpp3nzpcxs6ycj0led39h8g4cur38qp7ogeyts831d4zq31md5g3s1brgm7sq4dfrodmhll25mu923xwte7j10yd1z5j73xbr333zhiepoq4kp604s89da3egl4m1faf0hfe0oaidk1bvp7lrg3c489ocs8plh8p03bgtuc17zcdbgxvft8duaih7flavltmvm7tr4szin1no90xk95pqr7987rwirx8gv69m8nbfrhvhw1m7ngkm58ivc4uo12rmx6db2q3q0hhwt3hr02mh7f90iaifb58iij33hvp6k07tj130ps9tlfcp3havc8gic3tr40053bac2yaj5y9nzwzs3ospxyoon9l0koqc82ymjaklubpntmbnhq8122tzmi8p0yggblgky1wo6i31pcex65sccre3rsdgmrikpaeogr51679swj5w7xl0p0oemibtamsaeheezjlcnkbujanabyk2ek9n43zrh9jcfw6dobch5g6hdsfjq675fu5fumhkzgq6s8ze52nbeuecj4ne81pnr2orx29tf906m9gahqxprilkzyfz6w6z50tovw0o1zzikqyazghg3mhwl1ohtzdsknjr7qoehdy36lyxtiqmvrc9p93bqkm4jl1y0s9dqzdqwu8oe2fmtzalbspf0suz3fsr6vrm3y0bohy0pcjb0cuxnjhn70c4ukxn18gn71lm8axstsfx7nhzgu4ybps8b8r3a05banzujjwkngmvfubevllh3ntq4v43980fc3gj6dyz2lga2j3yrug1aw2ezrr2elp0yswkrepw9emzpvmnn7w49k47psv5woyuhgoqn4c61kyrviwy8dpvte3t9cvwzhlkuyh4e78z3gq44s03k4xtt2lwq6g2nswd7r86fzhhewu6oskbw3fy39vcof68mthzcdh772tvhthyiyspaolbyc1sokvx5a80b71azis7x2ca7dhyyqx81iakt7z71rk0mbw0jlrehvmmduel8hne4c7azcy4gboxftyi3y4bgwcpg6qxv0gexsa3o1uwue9p8yzcep5w0edbtggcdrbrks9r62rsgx3gyhukckzy9fezux8vm02swkkglnrx6d85t3719abnxkxz85zpwnhl0lorlhvlbq9htslpjpg6kmro0yqrw9hxdmqjvx08gzisnmayhzzc6qcary3wcemgtvp7ymfnldvapm0izacgkl9spi27rss456eappbzrc5uzmphbdpb7isukqfk4fcwlaz5h4f4gbfp4yzmz13xkqci42qbn3hujpcugyl2tbv3f99fyuoumrsz0ekh2p1yze9yg0yjkwnift9zw6v4bxwbngsrfjq5a5dbxvdh7aii3rs5udyy4n656uey26w9opvcef33u4gla0mtz3snzgulgjmgvd02i2x3b1pjhmcukohz7opvwx3po90rxr6jcoro9d4xfepx8ptpmlkfrgoa9im5qaqin35unl0g84caxba59onvwxh6x32z0f8za0uw3nou36rcc4i4n42dobtx44lkhncpsj8n59u4fll8zfvi56s4lmccve9uziqg8rjmexiizio3v9fwvdxbt25raouithucjc7kq1h2jpjygvj3fev5tpm1s2v6d86zwu0m7j0szkpaqobj7xow8b3q0zkdce32x3ow3ax4z39ih76gu8elxe3id4rstl838kvmn',
                        redirect: 'd95gcm713agy3jwosohj03d3imriqjdo7rgouy894tqvzy4wc4uil5zlw1wbcosu2whe8q8hgg2zhn4fg7sp5uri4ucuoo8qezah17n13qox80slumxnxoqvkan2ddmnsjog1vegzr4hw2zn15gg56vzghkqdubksukedj6b4g9lqrfffmsv7clojpiu5g1idqajfg3bfvhzfvsqbstt20qu5ivtb0sj4xjp8qclsixgak9h6gzgz3itdjzzoc3e1dmsr58uxrplf7cb8lf1l3ygv4b8pdzx6x7enakkia8mh1nlz0gf6yhsxw3lo7ozyo1jugu20cf2bq5lgd5jcz14vbgqwfvefqyt2setwijjhbqr8unv422sjvscr4v99k789npiqb8p096jg98fkzg3qj7gzeghxg888z3kdcdwdq3aimjm40366e4rhs2vn44fm3n3ajakxfivd9kivw29gzstg18ms4vzr2i9jflv3t64bmh8nx2kvhq08h2ixlqu6y6yf7foahngp6gxnrc5518hs3owjxfm05aahknxolf8b4xgv2weuivkkaihfrkxuwsjpp25r5b67es70nix8vqvv3n0lxsa97s77u5lof64h7cagnrsb5x5vk7pcn8iqo6yuwgy4n3ywpdirzzqxse99r4vpnj15mmtjqkyfxi5svf38vcasrhmh99f59px28adciudy447t2fd4d2cs3azlvqy68d4djt2hl9fr0x3gswkj11xneqpacsglchpjphyrqrrvn3xgxm2dw4wfl9q57ss9ph4rf70le7hdnl3s66bcatza8tvs14takjh332hqwqvjzapke2mt7drayrm94hoq6diq28v7fhc4dnpy1oyr02esm5n6fa1u5ybelwr6j9bwd3gjvofs0p3fqzpue4rgqtoegi2lllh98vcjt4atcxtrja199vjbfm8uyv9u0g3nawwez0v1ukmet9r9oscjtwpmm61yscv7a25h10ex1h889zf84gzw7s9q7ztwnbl90qsq0rlxs8eua3025jznwdna252zkdjm5pmcrmk8ct1q6preiqk2i775do91z0kn3ps3yoa0oaqoyo2tyok8eirx3g1qa9l7ks8jnawfxu2xxob1rlnd2vbq9rfp8h8tzbp47zmwigz9s9g8zhxr6ax5tnildbmf5fk8um3dgba06li7rudtl93giloj89i6k3ak2ctq8r2382pmh8uppamhjtrzvshpglqxezyt90x1c4uvsq5micewya21azwsu8e87kbbtquferysjapvycywakh95609n5ls3833u221vtt2nsxdylv1ak273c6ro0ick661k9asdsnedl5n0c5oum4mj0kr1xxp9wrcsm22nla4lgyjf7clw9vqtcn8onffjca083xwanup2cccu0rzuxi41nfj8lvgr86kwgqn96s5jp42nbsom8i88kswovi1xllq7o4b1enyh1k7x2fana46ybph1nltxiz1qsf9uwgudkhgtehqki0pzduubjsx1fapra5opdu199hw18b3mmkbsrbi7wrq23gbl62qr3awxzd5mkkvqjeqtahn8gs70qz271dduyjax36x9st836a39hcumeiikiui2skiuemsnng0982ryv40gzowkwgljcftisserb535bv4qzupbwr1om9o9rtjm4hm9zelvjzfkrrrn39q5fxvira66rkcw0qqnx2xvug1fghb2smji96soqjvxnlbp54z6uhupaqhrs0tmz8zznr2wvhxuj67i4m9u6xw3f4s1h9yp4poor6krasegipzmkt01d933pgwxseq9gyquf524ktqifyegsvmkb30ny77kzddcl28d2wgxrp2614cejodl4jv78k8ab40gwkymzlr1l305pizpj3pdnp0zjd2z240ysjopygvetcqdd90u5xyfljfbcjrgzuk6mofvki4cby0s1m1wpd8tfydxagmecu31gzs49ay2fcm608la2855sj807t61ts',
                        expiredAccessToken: 7264871808,
                        expiredRefreshToken: 3978500956,
                        isRevoked: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '98c3aae6-d1f0-4a95-9697-95464f4769c7');
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
                            isRevoked
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
                            id: '791da23c-67c5-4721-996b-cbcf2df934ab'
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
                            isRevoked
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
                            id: '414f3627-b916-4f8f-8286-bdacb61e6d11'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('414f3627-b916-4f8f-8286-bdacb61e6d11');
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '203ca47c-85a0-4a64-b887-0a17516d220f'
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '414f3627-b916-4f8f-8286-bdacb61e6d11'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('414f3627-b916-4f8f-8286-bdacb61e6d11');
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
                            isRevoked
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bfbe9cd9-a451-4159-9fd4-b535cd1c5901',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'ybqbttff3bdenvk551a6xb9pxak5d08khe1f99ivyp20fp7dgm50h39mggq5t87pzxc1rnat78nqp4oxtmv8ucdlz0yk8awbk6se9oezl50stcgiyy7edxo06a1zns6isfice6zuhohv815180ui82h146rvutvbiw46xe1lhu02n62lc1tppj11tkncqb2akm2777vwqi7zka87hbaiacouxrb945s84tu75y2lb9rep57s63ked00kqa12kc7',
                        secret: 'a2ig099yka8t5e3wuv9snxxk9wjunv8vgcdt9j32hw013kwe0ciw2y1l3z513b8f9s7lcwklyhuqeh7nq29gsna8rr',
                        authUrl: 'tk72c28sxktlxkyutf2g2t3638juiengg1z644w3y496vrcdkv0vbm3rjcyz6e8dmmy8i1s83v2tmlt6p5jpu5enhopg2wk4wcyh9dnje8q9918rjd42i4xudtn83zu0ka2qc3ywpa44bowyv2wuz6wnki3ctp8zsp205xzlnry8curpzrg63yglemmjh2l0pn7o0dk1kmr9xho3p4ifzlq5trihm3r0ygzotdn6v833cy2bfq5jcjc8awicnsba55kfbp40t9u30ydpe20utcyjw0pnmaj0u8v6ns2oi2775e7bdnk019se0l5m345yb35mpce7k7p7gzb4ountuja4urt7s3nm0a1blps1qthc1cpq881v1gducj4mnwm6juqqupzg4rhr2oaex25j1iap7ahbn020ymfv9z4hwbn5o9zq7zq2n11cd635ayt09fsm64cush7v9hf16aoh3jeqjaig6u4tcyydajdq61f5746xdwx9hq1jb6seid151aiybj4uw202q31o26hkku6vclqrx7ktfwzeo3dnxupicbhz4f6u3gjuwjtep8f993i4t4fphrn6i34of52ms2bup0kgs31tpeg0q9gv2uvxlmx1mjolghdo20pv876l77tigfv35ibynvklt4um4lwi6ud0cekjzak8tccedktgjaxj7e45hlpudxxrpzfby2d1y5xouimolqct6huowcfn9t5y2hl7l6znm2pbapgqlw1l5dan6bn8ivt3tvbdk37vekvetqh29rzdtvxji28tv5n1i3hsqv6x9dfybx8ug8pe3syxybm45ibla6hwqhnw9lnevgy81dats6cerv69fk3bfxjw8b3sy4otmrtry99nemlwwfwsrku5yid5y7n4qn8lysksq1r9ltgnjspkvf6bo0a1dcong3muyggg3dl9u89vawj3eueble3qhpfyqdhi3n1k1rbkdkt3ejhs10co1ax39es8febtipd1bjau5nqi1l8wcd1bkzj57sqmnm7tldwrdnot7rdswhrn64a9jjuwm5lbhi0z5dmucxb9kt2f04xvrd2qsqkevr6hpnwarkae5ob323gklci2vdysjljghvjjh1o8s97t965tzl6wqqzbgy60cg5ijgfxehvzlo39l8siktmdyglxulcoai1iafxnulrijqsmohxw63x4jaxn9t24wm4clhyvzr986xk54gkgztvlljzc90mcgrla4ku9ubgmvxeaw7sqk1shv94ifw46vl6993kz1yg4jf83hq162cntfgwkhhpvp5kyx9jlppijhwareverkb0ehyg4dgjaepn92yoyaqrepbbtaxifss4aphlxwceqdmvm0kbxx9kx2hotu45we1xmliy2yo7eg90bfoyd4104ajrg1pnbdl6ysmn577ul3kpisy5f854uq1f6rhztr3f2nbw0jiw2u6fz8pqvphwxcjg1m1rquid015vdywl88xjh9xi0ww1abuky8n7ybfnwshsijgtf2cf80zt0bubm7smgotz22ivtpywrrjr5oz8ed7t2omhst318p2nxc0lhmg66vx8e5w5885v3ab6ctlkqlu3rrwrciwfkdm81i90s9ksjilanl1mbg40rii7sdwxp7qngsgffky4urn3uurotwa84q7vzyargngs2mqd5jhokfrzj2z8k2jggftjax0vtrj45b991uxdg8uhi7xe189yhqspkmqrmnzm6z919ft0wqq31yznyx99g44n3ta98r39snld0mnd3r5dod0vvoabdwsj2zhthdluw65a16kxwrrya8ymrsabgh2n6eeyr2zi1ble2ozvqezpqy55buiekkrpoonolo0mobq7j9eiwzyxpkxfx1txx1bflam151zg43vvrlema94jj45vednuesxdaf9uqvksx84ekt2lyqg6p1x7kt8285q3ws9xxg18awmazw9is0k1uq57mpjjog4f92q2s9l3i73o68ax3y9iyk6cx15rg7putdxl3p167tgnk',
                        redirect: 'plhyg2vl02py82gmqysdnqoad2wy4b1bn4eata5csd1tim81xiw0yv82gis6vnis38cfp5glp1utkk38rkrf2c65pi7ieufew4ips062g2p0c13h7ibsblztesr7moa0qd5jjig50crapg29ydlqfyqojpohoqsuwwv8k2xsqooqu8wqpvc50pe6maybafq7a5u1hssaxrijmc9ymuam585lsj8n6if6xcxwl34edp4afu6p7q8guh9vxyv95greoqdxo6gmizb8r3bn8rtkvvk5k88kqv5mcubrimbronstkagpxoi97nrfm0xl3f6fvgogb5qagxu47n1l6v0yq016zxqiwsqsrk19nt26kvxsupg1blg4f3vqvelo18u3g75aw3jr14klgjp6cj34qs1eytu6ce1mesqp4z90hv06k5vp2f0jmrl9bd01p7t9xchbcwhi2pmt8lvrjr7hjss8y7mrrxoeh9mzkxgf1oj1vly33ivpkljeiv5yqzukkwx70zwplb67tpo8j18vfrv7lsgtos0eiwhir45qiuo3dc4q49gczz8o3iixq7ywzya5iq7l0qe07mq70domaipcceft003tovwc6qbocawkgwlo3x9kk9el0cy5tlv76bvorhwe02l3zszi3fwmijkxw05eoak96yksa3ehaubyndgt82k7zcbhu6clxex6im2ui0frqhfvx0a5fr60o3uwjjm37l8eqiz5hl7mqd9vyt38n2x1j7s5o50aqdh3r5tt5i9nif4xf10j7hvs5y8m84nlcv8xzp1fvl3utrtmc0fqhtr1zw8kg1j918kb960dbarfyyn7u4g4xqrxpwoaoksjpfyqaqt9u0d9xphhwud67b0f0lcqpjkolzpvjoycwxul316ofcrp61qjfgq2717rj38k452lkk7wuazn7x1aiouil0zgbaw4flet2ookaw3bno0whq9ygw2xp21bb46f7b525q8160lr5bmgz2a31r1g8gcqko48s0lv3c3u1gg4169053ap6ny1x08bctn42aambfcrgwfvg6h9nklelj51kkw7j68imt8zj3blxs4evct1ygslcsrwavjq1elk3sittqhr5joodu5va9t85xr30ix7lwsz9jg7d6tzfwctg1nbpzougiv8e0lm3cyfduxqb3sv4qfnenn3sdzeu6izcali3yijvehpcwqemj1rupiruui4s7zdtznanup6zm8nkhloo22veu1tuyk7uxt144z4r0wz183z2zahhsxofpgm84t6gsypwdcahz7cl0mkemcuwamga16oevu6vts0owdhsd6ngbwmwuy6yccbnupzcnuzdfbtm50tpy06ufymui8gbzg7z9x6n36bpwuodpsq143hjyfmsok0hyh3gkeb97pv6ftqa9v0z3fzvdlnvojsmkh5l62ey2ky60hcu3zzabudmp15plg92ttrj5l7vycedwut8ssx2jk2atzkf3s8cvmq9ozlv4epej703mqwl1yw636qgx7c6heowkj9v8kjjamny340kmbgc3qvnjmoq9b5z3ovvog4861wp1ds9lpqqqli0p27oir5s1ymc6mnrsm5g8wsns7i3lvn7qskekxnudctj6aczum3j2g4wzuz67a6jppcpghffb63gq7g7hl4sjufspq20av2uzo9dm7ov8k6g9rkilpjnsz5rsvdmk7v8ddu824kl1ehny1k0ftpbjrkjehtg5lqsezwfmiz7x27p4nl53wljuyx32wgpsv13m9k7a4lyqxf6xi568t1yoo5vukgpu18qnvpg7q4ddruse0qh9vrdcgmtioc98232w02qr5o5ifrqc4c9e048kh9jrndwrsh5zmdf9u7dagv6cdm1nc97fyk06myj1pq53eqjyxthj6y6c5ujsdhoqm4ddk5rgs4xvtc74doygnutgik7kzrzcclukpr3ufip3v232dbjpro8o0l50bnn7bvb0n2gxhmfp2ngjw9g1xlfd5iyb604otyxrf132je',
                        expiredAccessToken: 5293673479,
                        expiredRefreshToken: 6121409512,
                        isRevoked: false,
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '414f3627-b916-4f8f-8286-bdacb61e6d11',
                        grantType: 'PASSWORD',
                        name: 'f3gzgaety8a0g4zylsdrb1fc5l85wqjk6opb83ghak2h6ybvtmftazvvtik9rz9xv3pl8xvsu2ue3a8lswc420mwntetqs37hbtg95g4iklj5z6evtgv9geiwodnxpchpbrn91obizlgg1kjxcvqax624ja01i1ld7g9ibkcb4vx8ckb249ynkzuse8jkxtewab4valoe7xq31ji9qmgdw7xd610keofwm7fbt0upmr5xbrbwkicikatyuug5tm',
                        secret: 'ynjgtiivjxe77wyzce7n5hmx03cc76v7fs8pjgxeyciaytrcl73k6hbwnnir5uxjvz31vombwd9dc0hk0cj1i4jdgc',
                        authUrl: 'zt1t5vpmedowqmtocghkdzio7kx02gil1s3nryjjkxp33zlv5k3optcle2kgvq4qhpdcgo0ka12ls7tzytuc6drxpxcfobupse251xs649ycmdtxvby5emst9swisl49nr4tix43u0k6kxaw4tzxoa0n7p5hl7h8vzyztsmarce4a9d76y1if6dsbm21wrxuphscp4d2xfstyafg19oetpk6dwnt6db9ptgc0klqr7ohwl1t6ayghbbrv9tf3bxeyfbagfy756k10slb1kcgzgbpzqcj3pa69dwbl4cubqz9spelshqisjip01371olwgpni08yc4pdnmjiq57nrv0h2mounz4mi8jglvmac8tqadnopfhrfplj953ijz6x9wg6xyiqhtr7xz1gri7rg1ajmt2iui9o9jjqyirw1e89x1pklqldr8jg459dzbkejpu6qm781v7svwwwsch732clezo7lfxobd7kurkc25ib47l3azggl1jjwg7rmvgqn3332whs0usdgd8gk8bjoz0bxz6krrg75p3edb0oxsvfl8ijc2okqd9ot1ugrvpgku3zzawyhiapbohedkiokar2p3qn78ni44x4yobz4r26fjp0sxro44p60glekz6qjjbw9zkfz54ankinhdfabm2p1n8m1okyz8v3eiyvw207ma5rjs6tx1o606hhw0xf7w8j7072fyygh1x12ptjg2pr81wpjfolqkt7l4ee0zgft5pn369byfxvvgyefrtrilk6fi7f3f66m8ebrb1ajyn98rxh4pnhn7klstt9gupfw1x2samxu6gtolp7p1o6kp1jm3mfwp6n70f0h4dfuww3s0o9j2n8v7fbca9gfij9ninu9avngt0sijcpp9mu4obnmdxyor3vatbh6xt8obapa0p1dzngua3jfhcdjwamogz6ivm3xwa276tvfezwzznbgxmtv783gx1dmef2l83uw7qpcl4agx4wb7plehkmgia3vlg5ax4jehw91flkfkx5ffce7wtjttzwkt3vi8wy7vs7yq7j94rih4jth5wtoi81fibxlsk8wfd2bdll1kdyp3soem5mdzkzf2w9urhclfh91rs3lruarydt4204cedfsrn3p3yiie6jnaslbt62l5abwg3fmdg63djspuzthuoyyzadx6sojiiggk76b44zhdtnadh59b5i9ujigup9ilgtkrze2qlgyg0ral654wqtz096plwq2idoxuy3h1sknu31aw8qipma403p5x9awzsvw50qxyg7zu0vb14lurk7qteq5bui1cakjy3qtxqpnfeoqh4bknh0k13kvu8l4ol2280qhyzuhyk2cg8agudyr606w369cdr3a2jsa5jkl7lfmvh4ql6n9ddtuqpv97a3zmxfnvky79q7qaa1x7b2zsg0o3t72yu3zn6vri8s0287t0q2dm0sjcloi662dfj6ovor87s25z58ko9jw06jrpgc60g5v4gglcg8wi1ro7h4ooqym5p04ekzpdd3g8t0p8qlkn1xtx4ycc62ci5oibkvsvp16137ogn5lk33eo7zvpufhfolm7nhshvmw9lpkbh0dt0qtpgf5c9dw33lvszk0gu67jjbaom5utq3g7a6dwwnt4742wx8poi9kzvcmopyyhq9p3o3kgi2s0p3kfhbtlylk64u3i3y5fufbn8lmvxvnwja3zdqoyvhzaatz9u8tpk9jbt9qfrluxiaf5vetnr28slum9k6u7lf97rvzz7vn0bbfvcyydvvq8318abzysu6xsl64a85i20fi7by7nr2zeuxkvw8yfaszny0l50i2kufersvp733bigh4sy2gdnhjfe3hdcjj4s1t7a3x2b2ujsnem1d9clmxy40hmv7y6labgb3fy79frtqgjsq9h00h490ejvdvurphnk4nm5u8usdp400shdlgyp2p06dmkiu7uerk3zmqxddyo4u7y5gtrtk6hd3t6runp99m7a37bm6ge129d7xkn08hzkg9r7h0y6iu',
                        redirect: 'lmgfj8kwi73cb0hh4xai1aeyx3s2m86dd44gvywuhu7tyh2fi07tkmysbqupz8n84vrd7uoxgk9ztk1g4v03cckjkwnmvsrlph1ukza82x6z18bxrimk1w3pgp8rucg5zxx9o12l6au8mlqjqarfe0b0a4pzzwzao3s2yxqptznpb2vojbmicdskkwnbqs6gzgta8bxmgbeiefgp7ab8ccfreu9mliu34q6sspn71e1p3771bcz28dujuueaagi1xmnolpytpaebe5d2sospplemznd3w33wo80ln83p2z4eqpxf1jqrdh6x4vh5c8jm8rt79yc2mutnsl56uown6qwhekw63699888a1ubjnqm9ihlc104wb11xsli9l6pajbwdmjf9j8d9j3j95zluiqkmw6ma25cbexrixdl3zgko2f8cs0rodh9lgsoyf13zzsqshpyenuq644n9dudzbog8gzhw1uryribegjsjd4mrjeakr3cjcd9c9m0zrj467q0z9b4vsssdlz1ktjpa8aqjhuoq3657c098s4r868zybrk0o36c97c77woswwxcuvklrp837319pbjji259q6n4ovvvqpay681x8v2ojossxnzv79kg6svccu9m5t8h6e2wnegwely2y9hfoelay4iobst2mr70d7e0cycttswl84i3yjzjj9kpmxc6iqic0rgilslhkz5et5h8mzzmo8hwu83usjeek7vo7pcc4v8nhyx67yi74deje37dwvczmqm7eakyagtm60l00rejc48fbzhrd86jkjjtjdbgv27sjn7ch26z3l6e25tkrricw4od0hcypqjakcf79kvts6g9cev97bca190ooeb0mnh58nhehgd4nno8cw2wmzo6i98wta4zevk14j2aill2ro9mv4muni57r6nt8ajwekvg9zcxuec0zwius5ss470mt1y3s3yw0htmowkjoh2vk24mg35rz3v9zt7d4fikptqw3x6ypjilm8d95dxrza300gqdajdtulm8zqdb0pdevdvdi9kcvbekwnqkjququgxbo75i8i9ygpwwb11cwaishyuocj766j0vcn65qrgmse9x21o3bqqu182jrtskz6oho2i915ge5kkg5jces1hagqrybv378163vx0w4pl40g76z9qx0sm1a7rr3upv3vgfd2khq24bm0xhitw80kmhzyqwl30hmfuoiqtct5k01az9xmu26zuideaad2v7pcmxubhr8t4l8voetv946yym2k0hhvuzuedhrvuod23sykapx1jbx17ww4cca4ft9n4z0d046fmdnzldarp9lid3owulwy76wj1eyf3vzqgles6a6jpb541l2fy89iaey7xycepev4qmv7efa6gapifjjr7o7gi9wlk1crru630520deg4ny5158tc89z6vq9d3t40efaq0nhc33sq8qfea5aa1zj0jh1dq0t9fs9f84ldkjeg2y6zie6f673aqo95hgyopog8wc2jjmmgje28kb8v7kiqxrbbse9l4gbucdxfb8ghusrs1kmbprzn96qqjx9fx8alvmnqbjc4fqx7gad110myz4scux3hhqraa09b28zr9inzuvnuy1ub9urkmmss3lyx02b3e54dd1dfu0o5gku2iyo3lrtf35kslm3vw1zwx2jiexa7ijt8ayiptrum1qrsfoq03e3wv0qti8wu1b44ze9bhp3mwa2vwrlizroxmfyide5q9e57syuiyq50gn1kbs6qaem8n4hauazj0cgi2p4cgama040fweku748z4ahut9a3n88rsgjf661fa9xrntrzkj7a13bvyrxc6l0ctu4bxskn3khb0sy4e549y9373ihdbz1gbywzs38gswou13kc3q3w52ispr5qlzbzmbjztme9zrs18hpdtr5d75m6nlea7st19vbwmk9swa28litfk512kpe9lan4ycr8460jbkdqzbcvbd05153ak1un9dm4iqiulog4yt5jsl9mzlmo3okkn95pna',
                        expiredAccessToken: 1324725421,
                        expiredRefreshToken: 5835051267,
                        isRevoked: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('414f3627-b916-4f8f-8286-bdacb61e6d11');
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '881eed0a-c185-4378-9409-19f20d8e0dc2'
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
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '414f3627-b916-4f8f-8286-bdacb61e6d11'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('414f3627-b916-4f8f-8286-bdacb61e6d11');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});