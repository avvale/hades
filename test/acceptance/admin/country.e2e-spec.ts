import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('country', () =>
{
    let app: INestApplication;
    let repository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ICountryRepository)
            .useClass(MockCountryRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);

        await app.init();
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'op',
                iso3166Alpha3: 'ycq',
                iso3166Numeric: '6qj',
                customCode: 'xsdddowjty',
                prefix: '9lij9',
                name: 'swfmt3lw3qdx4u5nh9j2ih9jp3fekwhzgis7yje648il4cabsrucixauct8f6ofcmoqbthyvz1nd1gy1logojfzpmrs5eqj7tuf8knhgcsphgwr4leig4syl5ac7r9szhc2nkufyewwc3xd3xc3cc8c9sh2a0f82qvztsch3q5gs6hka5fyj7tbgb1wy4kds31c422k1d5is4sxa3lj7vg070ahuq39lwfiutdrxcvrjyl1cfysy25eayehyhrb',
                slug: '7hcnep2kal3umpo03q4f7s6lyeastf351j8n745h89fewde9ae20rcdjutftxmrxru20iezty7qu7glxdue5basiqukcws0syf61jbb71pwy9dxdibggr65n3rsa124mrmjlluqd5lojfrhpo4nr3936ka4o3smlph3kdwyyu3a0vt6ea48hqz3d0rhpmun107xa3rxowvylnt0t75gon9cfk2ws9uo9zi17ch9o33jq043kss11nuuexenosaspxd9756frlljjgsw7asj3rq0r7jkms12wr95ggshlgzw71mr66ye8ktcstmbrar6l1zxdivw8hxndp5cmqr00lmr1ufo6akd3zx3m9qgqgi5cgb6oez3kvmufoiun0id27q75tau287jr5wzzf2i318qxvld3c31jyqgga1bj8o1p2rmb2rr7pfztgqab4r3lmob9xg1nn964btuj9d90shb1etwfd3nf6irodtfhkgfg8su9waqe3hqf96axdexvzyz9agxsj67jtvqlpaku0tnmc45yvhak0t14qqtrzf6vow0tdsb2vl1aeplb52vkw4ielh1i3ass5way2fwyifdvnei9yt7d3o3c6stsxlzkv4evp1c2pn4yg6hpec5nw81rv4wjzx9w50xlbfqi36l15icnuzlhufevvvsre2nmphy4r3s5ma03kpui8nr7gff8db9fnilwsrt2vw3qkl2jdy2ybkhmxgijphjmyp8fbsn97dtb063b4h1wkcvjn9adenyb3vwafp933n3nu1sv9khqqktwi4tcbvpjg3l0nn95sx4u1ivyxegeehbzmkm16unrsfiwrfi72lguge96giyjx73e0dxebzq77zlyveywc0o0m9hljjojj5qqxkyv5i6fueldatpyq7igzne7axbaylya9pkxuveeb3wlbszdciwgcgl7wrizhxeyu1rcptzmxmij84570guvw90mvz92au0sjgxiyl6mogahwbusl44n7c887griwqdu',
                image: '7b26z2f3aosikl1dg0heip9nz2t21vx02g6psx0ucdm72si217bq12v18fb86hb5lpu4asakcnf9aozlxw11w2eur5j1uih5oic2exciw8h4lsa1yys78dgt95myzxm539uzn1z2o38ogb54ljld9e7uriigbgcsgv1kmzflu9mucmdj0c9oxjogr0ukcpvbisx8gy04eo92dlddw00xqwh9pet7473fsap51k2cfr00ugxos895o8xcrhc8xio0rf780lev8pelq0ea5qkjktwlkyu3i6i21xnwsyzm9txcdov62j6hc7a6fkprb8khn1864lm16bs5dhuk5umzqhtw1oxesambux3korunk5ni43cqmqi4oxdnce0z4s72fdxo4le2e3ql3ia5rkbayn736uprzc3g7g4wj9p5pe56x6rr39wxrp1oj0nvwwpqisss28ldit6p9x42sgo66bt9ddoxaycugm4z3s10vq468zfttbjpzhpbip0bwdumpx21908lp7uya8s20ym2k4tlfadriaecl9mcnjyu6c1naj2u1mo5f6mlniytpnn9m7abwwxtk5507hrurib14auovs8m1mt9fkh3tevw7lok9svlg23jgn7blu5fv95e6slw52wp9siahjjc8dtrlch21xx3xiisr4dp68rbhxekljqf265cob0y8zmoddjuf2clqmfmckqkktv7utskn5h90mnuzpx3asqb7d0564enh4dpe30eu7htsc3tfplehvm6u92jtpmdi0fapdwnrt2qch239b7rkk3rbqxvuqta8egbw3rixbjrozt2s0741q2kfo94kj8kcvpogtnw10ribekjdme2394syf13zx02jor4t4fli7snj1eohxtv0r9yh0c41bloyjq33wc1yjfyhxgqxsaj6abymvt4ws4r5eoqfo3bg47cc3dzmfqcoldltxzwcs1k2eucamgzppsdpkhoij7xmklpnyic2w0x72fidi75ou0f502nk873',
                sort: 521895,
                administrativeAreaLevel1: 'y4opcyqqgipafx847vec3038jrbiq3t7qkk1zz5chdxwrphh9e',
                administrativeAreaLevel2: 'oac5rrgydln39dt3wvcrogzwn8mzf1d1zeexbbwderqxagr7mw',
                administrativeAreaLevel3: 'jpq4xh4btk9iln1ev49p7nnev65x9enbig95o392iemqr3zbf7',
                administrativeAreas: { "foo" : "bar" },
                latitude: 377.62,
                longitude: 364.80,
                zoom: 75,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'la',
                iso3166Alpha3: 'nzn',
                iso3166Numeric: 'kcm',
                customCode: '3n8qa4ecun',
                prefix: '5a0kb',
                name: 'ogwyxp3c9pm40s50o3tz6t1fvbd5cl8j2cwmtfd0lba76l24kz5rp4vart0yixx16zuqu8m2azqlzh3m7indx8elaq5tac1ex89nvpgs67uj5wa170z030bgimybso0kjopwb5j3bpw47z0qabhmauryf1eb0y5l1o8o0vc63aynacxafmua09x8zlxr7eta8gmif3n3zv9qmev10m71camwbsenf6r0pu2y778xdyp9dj5r3995ff2dq6os4vb',
                slug: 'gcz4a18inofu7neoce4tlttkqdyaosc0449ldf1o6v9hbbbtvlnnzo4vs7hlq84o9fw9t693mrn761elsecgwgm17eud1pji4nbje8wtmu9yldtflkz4j9lb6zb3fl7zaf2wacatffgigd1j2egc07hynubslom1ucdtfn6c7qjajci762p5kj2r1pzexqo196nvo8wkhbg6icg6no6q1i1oofy8d80n6agliinwehqvz3m4tpl5t1ipv359sx4gf5tm6sv0d46rpfwnhkiwt4ue6lo01b4ls74pmyl1l998djiymleqlwpeomvnjgyiwac0koy8ts2j8qfi9kkn9dzihgz6dl6u9z06kq08pru8lw64cxx27654uyi5alzjvcavwnqrgpt4n0jqye4y66m5vh4il4u0wawwvumv6utyjt55muscsf32bzrhod2nrvy42lxdm2dgkdwjk6pja2vvexjb0445mbjkv189e0y4o2gp53189xjb10r642jvyxj87kf612zpj54qzqvq6auzoy4yw76k9huqu5w164szjdkl301pwg5ijr8a4orctbob2fnvbyjtadup402tvpbq8phinslxrodmrohx690w067rg3m0o3x6pkmvhwffl2e5latxct0i6akmf7ir81s5jb1tyejjcu51e5wtu5codgn5qya0ox78x5f37mgdqa8dwmerfkf7fnd1jyd1m2kn324sgl37cblv1s7v08nctuhw6kgzuz38re4axwjtpx5wmw89r0a8cfyt86zhlb2wf85rqr6jr09xkb6ppqger2wuqcz8ogdovsp2z6bki2277qz6fxgiqgbwc6lnqtwr9n8nfbig9rviihqrf56h2sjayv3f1wenozj7lf5z1twfx0bcvf6mqladvscyolsaqsnhjl4qovk3ua9gvv4jh95xypqctdekb4t1xoxbfda275gux1pnozvcrb43nhb0m59dciz7cyzvbnn24lfv1cjdag5pdgsdn30kocqe',
                image: '0zgj0he323uti2v1b9o2bilsk0l3u8i0ra8fdukewgn2b67j39igtljazzjtzv2imxg3nuzvd1qva3qlvczo2tvynm4azw8439fshcoi2nii6mk5k6uqlpe260a3quz9d4ou9qnb9fbf8253vhhq4n1w7jw7ot4rsk1f6ds0ianwe1k8h4b1w3bo96ree3264z6jn6ub88li6gyrg9f4ffkx4z3hw1j594c1kzimxdjwih3iit4m46f3fv5qju1nk2052l97sva5k89wc9mzq5ckoaoozua8rseh47o6ulzdtzdspn6fqlqusutdbfhhle5uwgp6si9jqlnbtcub09f1zmvqlqfoczsol18hth9wcgirnyp9n4x7gil7dvps39p86tm0jg2etsny1v64iu1cumcmidg8knjjmm8rtnrah6eyrvw3zq9p49vuxq4581yeeydgd1x6bbvuu8zw6eh8fcto37br2alkyign4erzwg7l9pwxlrh4zaejo2vuxjjbn3xuhcaqh9eiku5yop24ttjowtaxzsx3370irr4ev4dwzwa957wh0f35vxhgsm674kjilem5887gizu80c1fcxm211t29afnim4adbu7o66sxp6h69bpgll7a5nshu8yrcrlmaym3r8vufdqlyxzwg5jmcl473wt1646vyqievpezhq5tvvzr0xgkaix4gf7ig2sgalnscee8e5ha3mjyr9qs2z9rv22zn5xgq8fu0n8hu46xphr271126xpdnicivrnr7zcq9qj5w2iz25sspqfe6uve0gp0v9haghztchz8oxc9ntqj4zf8nr710ymtv6t1p8dyirg3ejf5anpjanhvecyqth0w5jx91zjh6pcex5iqv6r5ao8zasefl81u27fvmh31cmlydvjoin69bsefk5alf3kg58vyo4u5xg2z2duqzcqf7t2sv5du27ivvvqa6lmqq1e58f9ofgt6b4i3jyuiv7vyhpzuti1r1k37r0en5if8tdd9bwc',
                sort: 227805,
                administrativeAreaLevel1: 'rfk6gtijljuukq1dev1nuna1vf9r5duxtfej9hpb3rpsix0sp5',
                administrativeAreaLevel2: 'md1lrledgbty60glkpejtqi68rispwdhhoeu42kfizvb9gw141',
                administrativeAreaLevel3: 'zlq8d8cmmqhjrs0mzpntadd4qslst0a1utrhlh15p497qiss80',
                administrativeAreas: { "foo" : "bar" },
                latitude: 571.65,
                longitude: 10.57,
                zoom: 13,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: null,
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'xt',
                iso3166Alpha3: 'yi3',
                iso3166Numeric: '0w3',
                customCode: 'iinkjo9cu0',
                prefix: 'ejpf2',
                name: 'qi11j7h2r8lnsxcbeollphpv0lypexci9emn3912h6sillwn8n0h8kcniiyyux35r0npmyp5ju3p1rs38dylrvjy52snd234xkisv3nr5im7syu66j53rs1tm09hlk8ys6m8kqj5wwdu1yzftat5hf7czo2zhbn2jayagv4riaihpeeirb8155sgt55jeseqzutgwyp45h6nkvfhxb600s96gf1xxqzxu4q34857smo881kybpimjgsji6nu6fr',
                slug: '11tsvhx0r233ojecpxafd9yd8fx0xmt5etlrafty2do43roc5osvghigj5bd1gh0dcv8ic73m4fchz82cy1u4kv9tw4iwy8yc2w3urhruhm95yciwth2joh5lpal4yg6sbfmeqb5j7ve56qzva91aqqf88x1ct2257dpqcc4n5e66icecyxomxh5tyzy9rfelsyt5yes4ataw2txkgm1licv83foobeppxymudiopcc9wt8tpi8rongct9yhmyn1kdv5vq8tje0s4j5yw6s5fqw1bwar6anctbz7x943qzbf03quxzqk0w2065kz3qw57gg7mkctz6tk89o373wbt1kumu1axhqw736raubw8wbx4u8szcgw0x3ivon9305oagr5ykwrdcqaip5hg8td68qvyugkvpua6w4i15gm4rsc8mr01x0iv7f7hdez9um68vmvdq6bczd3z3kioi0txg4soonbfheahtp5hnz0jvpqm866j9vtzef6knxp6j50mu5gukc0toftolcf864zdjpnfhln5hsn4ud8qzfphda0hr3uctqve81yek21ff0eokiue5cd304niqn32jbplvo4da0vcfqqjfj39xykhlnzpflhrqpadtoxe2dwztz6fkwm8o92qexx1bsufm5jsu9pvqbqex4yfhaiqpujrnutpyjljio6h7k8v9b7u5mlm5wuc0hjo1n3t7ze4srk1fvkkj43da2ylv3o8nkp9cpfw3enmoixvz4x7t76qlclvhgp91l802wix21jqtaq3t9ixyg2q4bbcibxqgn4x87oaay7vxzupoo8vro0wdm2f12wdarl26ngk97czxoce5r3b5vwwoohzclkmhadgikct2kvu9i5hx66ktmhzwrscdj3eeo4gxdllsfx16qta28mvcm0qqm9dag3hqbuk10l8yqp3savvz311yvgpe3t15iegu8kjvw9hdl6uamc4k34b75t9zepq7fkrsnzxk0806wlwcp954w3ci2ozk42',
                image: '5ldki880m4l7461ay2yemeb6v54degldtoiv39liho5lhcebj1vdojy4eknko23qcq14il9sewd5wz6jt8rv9vxtcnquz65yg00mzao0rkpjt57jl08zb3y7nvvapaennw46mmml4i3rdjxu740j3v3007gg8e27iynzugjiz2omwe5331z2a0dhfvpvu2qhh1nm6pzxshqig7yl86raylhbu0qesxdfhmgbjqt5vml6nxy9g2fm5e0kyghan6bnrymcmtgnckxbs0p8pv1mop5ucnuh527b332atti8trb1qsn3o3slhg2bjp6qvttzcojtybmel9vvgym3dfe1ecspfocjimla0wojudjohwsq12rmf2xq5g43u2r5lxq5ieg574tgp19mg6ijeg53xlj5icn876qsku0e0o4rh69tgdna68q70j4do9qqaecpv7djlb22xmthuyauqc64jpe115p86h9qzoftvvr7pa85q0h80r27n68wb6lv8amtlockhxr23p8jsm5i4sndshxedgqj9s42461jr1dkksduunk1c4th0fjx5nshg6ngysy4fgcileeo4emyyubvek2u6i8g5lt9hdztqqjneixywzbp6lmvb3dzh72gq3rb6n2470ysfrs1hx07acq4qa05j7zhgt99ep8z3era5f9264vz6ky8o63se7u5cabgq2ppoe7f0v8qkcyhna9vw9ehbjj93ybek8dtctuddpmpm77rx8y2uce2oswc1o73t53pa2j0ygk5vnjg9scwjao9mg7tfawrwdd9hj1ih50gvpothiz648mlr6hxz9t1v9nud8k1bu3z498bm9lecgkvxx9xgmiiv3legjjt47goo4yl8ywwqhtelclwna8bh17o3vd6fy63px02jrjts4qaodciikhc6hd8cwp69ejoxo9w16q4620adh8jcb7f4ph8ok1nvc86xbi7c2eprfabal1nc1xy6b4dy8qazglrepn55v9tpy03jaxo0y5b',
                sort: 805340,
                administrativeAreaLevel1: 'kfi5i1yrrjk6xp986retre9omln69orp05h42m9vlqgr8z178m',
                administrativeAreaLevel2: '7rm1ngzg6jip9fyx7w8t3xbxu3a3p0imsqy3xi2nh7bf5vvtrt',
                administrativeAreaLevel3: 'qsdjjvq6iyu3bxac1rn0a5ostzv9buijyaao5jua2uxedrq3oz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 271.39,
                longitude: 75.81,
                zoom: 76,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'k1',
                iso3166Alpha3: 'qj6',
                iso3166Numeric: '4zv',
                customCode: 'uvd5jyf7wy',
                prefix: 'i7zek',
                name: 'iv0bo373qbaee7tgyusqpzjzkkc14g3pwx53lp2kez3qqlny9ufo6gujqsmqngth95anucqt8frmp8zwuj2a390thrl4nia7n66l734ix9om4aexh76t5z486l38n7ysmno59pyy0ya1kfk2vnm8kvyhvhslipcegxpg81vp4max6v3ofl2hx7tdp7pyt3sh12a2cxkwqlbewj6j5px6ohh1y318t0kvb6acsurdp0w47k5fldsaiyjqjr6qzrv',
                slug: 'w7iyicu359lxk92x4y5lxexbv0sxj5r0z5ns6xbx45l19i1q64y8oeyruwi5ckzmtgrt1956oqz3b3iy36wkh1f1x9hw8wnkq0akycbkcd0g4nh3v1xbtf7yol7tujtgvg05anillqju23bvef8w3upzpgl27b79hpg0ma1rpacif8pmdqo2oyrtthzz2wia0b6pqejlbxsn05cxax0xpcqsq34ovjbkzj75en2br2qa8b0bip4uddndvifo7ttcs34wp6d1orcuq5szrbt5whhlip72462tyje5beo4dt0oqrcufbz8fwq237gao6jcqzqc5cougubjgenv73u8k2je1466ai9vvmu2cg288v58fuy7n7226xewgrikchuyywskr602h7kzcrmvxb6bmqy67abn1igszybzv8sqe6g0rbti9zvx4ndysze7aktx96w0kdh2rty0fk4f9dhqql7vgjtkx7i1w5ex4hiny12mq2a3gwhlax3tls46zt2oh70rhbtl9lziifq9kopircnp15l9xd1tnd9qslpb7xodbekk79udcocsxdyeg9ogwlt8c1nm3e2tb27si54m7buo2ha2d50tm5o9gw8acm8iflezd1pss7the7issg9nozayw2bln6fumi8avxvgx92g8f2q3vl7uzrjo1ttasoju3h8jfs8bm8mkh75dywktrwro4pwdybmkn8voskakvkadk62wpc8kbol41qjxp92wt90psmoko74a0ko6czhaacmxy8dbg95hyb5m8fsndd81hzoqet4xan5hke7ko1akh2g7v8o27qbwtye57of22fsmsatqzbguhirm60vorl1k6l1dfmfmsi8yv698aqsz35a81vadqu31ejtpe4ksswevjoltk9cdeww18jhikrrybzhvwtw7hpsugapqdxc7xkm6xn1k93dmxuohocm6vfjs5wejxy5x1loajerhws798u9uv01nm3a40fj9nto39uononc1cvey6bdh01k',
                image: 'g8wievy0uht1k5p5wms7v8shzq0uc7wlett3yqy8if34j3dlev6usgekstsidng7f7dhdr3l2nnkq4p9179xlhas6xqv9j3wpvlkn9fos2cbk4rkzsmkmkt8w51xn8h689uveephfqv5cnqzjxsyxu52rm18veke2abv34o5agvcnn5iprd4cblom2k34m8wbkltlewaebc4dgyvitg8ahijeilp3ythnjuly9ln2hmhxsttbkikguot4z5m39fk30qy6cez2t8dfnf496pvagg5cn1bnb6o56esuewc6crwcee9yihxo01br668gpgssjeu1trfrdut0pmuhi6j9vxr6iutlnzeo2lz4ipwkx4mai55v11ruhr6jvbxudida3t7ix6zm5l3ij940zwxd3jehefqmcog6s0hcd6ott4noj3ftkk4n2dxrxn53feu5jdzm72a90tpnwfmswubn4b3jt8b3xy4ymtlro6cfbrbaxd7nw9gb6n995et2f9rp9c636ai157j5lkrqm9oqfp6za3h3h1yt896uujmk5rymbes1bfkbtmt4u4ue4hqpivr0q9gx1labxmyu5kshv5k039qzntrw671yawn8t9hhu57u72nksnj5p85ycamidtuowd0un9qbnwxhej81n5dbguo5jhfqtgrcurtwp6oh0z110dhc98547pfmd8f0nmo71unb91qk1xkomwgfowi3ejg5b3iyj8hodiuca1v8ph0y76q75m4jnz677m9hvfbxfn18mtsdghbi6ep2uuu0ipzqsoh2h8dc98su9ckcaypwk0f0lho48tni1wd86agcz1xbci0cx3pmm0hfrbsrrmbykkrqxltvocv1qnkm5vllrs31cczl76njueqh3ceqslpxw94cfre8nl7fk2hd4tp0eoxbork68zwg3jndyykpgopbqciynskn6v5ganboe833jjo6n7i7fseriwt9pks74mdqzwmgb4qebgq7y4gt5b77snlsxpvzaxb',
                sort: 240165,
                administrativeAreaLevel1: 'dcfve3ogw2fwc0eoeta6y1j5c5mdhkbd7h4k0hjoa0kmwgdvei',
                administrativeAreaLevel2: 'r70soz73qqk735iqe0foim9313cjgkc8qyhxmj77y8t4ov69d0',
                administrativeAreaLevel3: 'gtqn2zhz7vlpko88bey8nugatipnkka41m18029nj3iz2j8wl7',
                administrativeAreas: { "foo" : "bar" },
                latitude: 470.30,
                longitude: 774.23,
                zoom: 91,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: null,
                iso3166Alpha2: 'tk',
                iso3166Alpha3: 'p58',
                iso3166Numeric: 'ffk',
                customCode: 'hfsmu5amcu',
                prefix: 'cim0c',
                name: 'bvt3gbhhpjcdn1pcnbcl082jbbxe53ef8gegpfym44582s9vubti0xnlkvxxyvs1phbpgach7ntfdx7crys7xzzem00wdjca52bg086sm1rvtaek59li53puflpmkr20fzt0mxero9vgy3z4g4cgg7bvvhlpyn2mec1etpkae65uix4vzgnyvlmaw0v1xupsvnv05gi26t8g7wzh34hiyvtx1w61kyguyv0b39jd9jg2lc4sz0t57x3cz6gz54t',
                slug: 'g80zj4bbcqupg926b7820fp37pupbj0aynb3y2b53mnki52smurr38taao9b02gk8yxg198ui2aml4105zfwq8ki5ef2bphzzu6dj68dq8zumhdlw5wlca33zxms4joyhjdnfvc4vfnq9fbehvodg25gs7lpkixtw5hntz63ye2tro6tleit5c446frx0i1geb47thbww2gaoxjaxrf6okyadohgjx3e00knnjh99lfh4hvowgk37nx597r1knwicco6t7enbh7k5yc49ikler34zv05ajkd3k6acdwggpvbies0rzb3h4tfnivreem4ubsmmhszll4fzn9t3gzl3g6nbrirm9k8dyfohf28rl1rhvfgwmo1bc0m4686ex9lk6fzhonbmz6tp2yjxt8p48cutyr99adgj43n4nk1hwr5i3a80hibz73o26f7brw8lbwh01hpsq5d1cgwddsrlif049ne7xt4wdaz0mfdrwnlc4s98vtx6u1a5r6rplogrukjb71rlhg03b0fkezbre3q4gxqvw6v4wv27qmj9d8pog2ga9rnmilz16aljv8zja5k7kl3cfpcotajsup4d15wv3bu6elrv1647y93xss38c6g7wdfbmdtyfyc58hfz0sh2negxpow0g96e2ulmue6znmeywe9e2byhsyltij51p69htef6ghluofyo0xgpjt567ap3w7drdu1le3n3dangbqvxrjve09uz4d6zinx0wttt8nyavyl84mo2xqnulub04rihvk0fsmdnn1cid19950ypo2cff0b4m52cojy9aaqqa4971jogtv2hnecin9vgx3zekkqjr6etrhx3bsh8iki8hql615wy2atue4ypo1ii66gxkzpj5sq16hd8mv3opfliffpi2s35a0cp02z5ezi5ezuwcg53zp8aeeg9mshanmbgf4skl8emphscb5qvsln3vn5dk3kcox69ktudz1bx5xxcb2zpaypryz3cshiv0jcpyivgtn4sadg',
                image: 'osspvqp2j729of7haomu5xjjtqcm7sspjrmuu1jgm77kg8d2qa1yymrp8j5dgjd9owvrjl0h052lyy2zcz7srdhg0lytzxl9w31o2ke5paxtrt8ab2evan7wyawzzysoncmbqmwqp8oloxfn4ysm3in20oahoi5ldie0jpl1urwql6nqe9m7da0sk0xhgi2om48aiaibt1x9iprrjhyo0ymvlzl72ccvks1rftppji2vrs0dt8hnf52amwtgbtks30f1dtu0rp372lfpl5g3k4qtkbhurh32mheqcgmj69otrjh8d3g2o5bu597h9zn94oqwlvaf6veprtpz2l6imuxaqzof0r0c5w3y74632p03oncmkg6ej5fjxjtfamlywgcmzmi3hni0tzvd9wnn1vq74ghc9hvwj63gv0f52gx54kehjp0klv2pg4pqkylrf3eokx093e0d4ag2al0s29ygsq50ihogziqf938bs1ai90kicelrb68p3niswahq1y3gqnctxy27qkv2rwjjclw824glka2ti355aqdprz17bpmgxp52d72yi07ds82iw69lkimxmwlhxb4cybb9kvhvmvir8gds5xjxeitmt3c54o7f40ii3bfhtvjnbnv6kzykjvy1h3t2p5uhzk4t8wzqjx7hchmxk7avj07gmbocwoqnx0q5nxkhxdp71axjkawztug8agbdm273k86b2rcu0u3h745doeaagezkc76ae6w9p9wwz1ys53s7bkg29zcuzgz4sg5rhswgz8g1k2xloznxzb1zm4tr0bjt4ly4j3fv93xwegfieb1tx1prbbmg9rtbkw12ux7j5hnsdjt8oj31bxzerj9vft2xlmjqqmoe9bavh65n6ryvambuyhmzz9k8z3vpdbswgoqszieae35tiawcd3uy6aylur5t3p70vpk2wwe65fgpdv1d69e14o2s9pa48e40wsnvqgulahpy3z9e5lvvq3zhzidkwnus01b2cgs4qelerunz',
                sort: 905446,
                administrativeAreaLevel1: 'd5okiwxfn2gnu42kqzt0m6aitqz4ymr6q6eolaca9kyp73zzua',
                administrativeAreaLevel2: 'xcl57ueq7kztmy0tcw35gvsyj4osq6njwib1l6ur3fqz05znyl',
                administrativeAreaLevel3: 'tetsgkian75f1fz40ypn6s62u70v96tenmm0gilidotemt8ryx',
                administrativeAreas: { "foo" : "bar" },
                latitude: 334.69,
                longitude: 277.50,
                zoom: 89,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                
                iso3166Alpha2: 'fb',
                iso3166Alpha3: 'ts5',
                iso3166Numeric: 'm4z',
                customCode: 'n2hgmz6ual',
                prefix: 'iztzc',
                name: 'k3onrbu4xpvqntdlhq59v0nvanj35sybw263467ttse94zvjxsdjcs8kemq8z5xca1wvxeklvicj0ysoee1v0s3lihro2yxfnh68jw6gj8xlpzgem0y34ek5xauqsziloc4k02zg0znkj6rbulrnqfy4lk5bd9exhns1wlhqvobzwd4vjr8vsgsmqh9trnrle4y5fxolvix893cznfpe72qfjknncpayfr7k1honzw0g7h3mzttzwmxsjkaod44',
                slug: 'zbrljnzbajz8q3ea7z2t2vok5zufg1h52fybl2vzf9cs5sxe75cn3ix95a7t6o4g91kjwtd70ivp2lldhsgm5jo8hwulfyq4f4y7l3cmaz9277jvucguyq61f6a9wa6lmb7sn7bwrtxb1ya5xnu0j6vdxreu1zetoifxamsl6smwhjgnv2k2eney10yjt5ojy3ounvxp0bhlocamoso0lt806mrc84bzvchdhy0ea5ke9uxul9vwi7mc3lkkk1u3pty7di2wbvsnk5170mprinptkviucx62ft5c9kgtnxdhsdoqx7o807b9eryg0rmj1afbapv0oqpphsmy1pruk9kvu4mkreybephpoly6f3794733d0n4so2bpia2ow8m7rd9sa3wcce59n3elsqt92v4vxi04iwsjgoka61ilsh2de0b5vzmuyhp8e7jozrwjphqi01yfb72qg3x9be9an1ddgy48w1y1alye33uhjkzqn6qi6lrnyacecvskx0zb76tt510uesi0fbg7cnkokqybfhy5x0d6yr2khzcdqyfcktl6tjvobr6uh2rr3oa7sy2wcq2hw3ai2udppo03afvltnkwiaipj9vgzgljvkd5jren2vcopsng7amu229m20jzumpjw1xileczswm3c9c1sey15lnrmny7rvzmw5mta0qjx3siuqcqmgi2uhflbsgyisg3jaxvrusv2e83hfzi4qupacnpauf1kvtgpjwv75uhr1wiiu944946jmcnaqwz5lwvuxa708qe7gaqlkuhe52skqydn3h7ojg6xylmkdu8yoh8brsdbe602h8155964h80afqw7w6lsk74n0813s079hdff6q67lh1qosnj161vfbvymaqkje48czlm1nb2neibdm2akhew7x61vempdi8geu9o8hzpvci8ympmz5j8kkozfndqw86litrj1or9reursr5sunpojzjfdj9ega5t9jz082t8f4zarx13qh4529n56nieaiwioc',
                image: '8zkn2hbh87whfch5q222dokj1fobq5yv3yvzsur35varr821n729crwcz2aw3avgrlbabbxqe97u33jy28vxpz5p3y9svc95ajcgms00hslw604jt5wvylpe6qcvpuca85nhsli68lgk8dtv1k5ktx63j4xa3z411dcbkzaejf7gc5kq9jgnv40rxw7w0j4d5srzqbybh08lw6iedbs8u4pnlnz08eqt65ayl3ygypl54g7hiufuhpigh4ew25y0vpq5vs9fzctzxo5x3wbekr2l95ll7dyk36289b70u2fw2disuhdzhikjytw180hyb81hm6vt0kmxv5by3btm7nz0xmnu2npopl8ds4vk7tfld80y8um9o3d1jwaswlfvtx52fviuz7gq73merjhphfq3idls0lr7m140shiglmt1mpg9tcrs1z0o2qx1ibmjjz2x9fp0x0srycs0pwlbalskp6o0vbenc0a624h8sujzxnsidsvyxeuanetsr370iglgp71ep1cymqxt4sfbilsn6u6557b6w6qk6cpr8uqr9cbrqf5cm05rukiymatarxcurbjmufl69q80tlmbur9c4kef52gbatn0kx4th5fecdl2mvc8pmtvk1lvw757c7s3d26eddw2kkczraiobjq7b2uaoil8ahnqfp3whvx81stw25taxn4iggovpjqsybttg6mi765ihqp0zda6y3ijmgx96sgvg89m8bqx369ilfocbve4bh2irqlkadt24qo0relxrxan2crpuoieg2z4m2y243vegs4o1yh1j9y4vehdhpa5g3fxb3avftht8ujgmaljrjct7f2x4nsrnzgyvpux7v9daoozzxj0wmnuj7p7vzgzoy0u9hh6e4m88t9f92ed0tq2eatvqzoj8hsfefm60vtxmcyogaefjid1ar1bz742ts4hxvcmfi4mmcqd4lk5vfk0ri3hfltkc67deh0sijkma0npedbq0gjk3tu2so5f8nz25jzjwjdj',
                sort: 453395,
                administrativeAreaLevel1: 'h26r0gxbnh0hus3z1wjfm89ouy5ncrh8hyyw2tzwwtrymcrdh5',
                administrativeAreaLevel2: 'jpxffil7iwpforvx12t0148gigvybxnna06cwef23rto5nomf6',
                administrativeAreaLevel3: '099dvagy4zhostny4vqfmyj0cxmwz5laq7hsifawjvj4jcak3e',
                administrativeAreas: { "foo" : "bar" },
                latitude: 502.29,
                longitude: 425.81,
                zoom: 73,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: null,
                iso3166Alpha3: 'ul0',
                iso3166Numeric: 'mpy',
                customCode: 'o6bw6kilzy',
                prefix: 'epfv2',
                name: 'pqm6s6s191l0zyahp42a7dx2hxw1n9kwd626r8crb148etbrd0qu7aet385t74whla7ghexqstt6dl9ng5bt5gsko6bo4x7l520fqr672lxgnu2701dhm3g8m6bpl77zzk58v54uysx8vxsxwqjj7xwpkv2tewyugft6ldta0wx6mqhmv4a4nskewbdtw2vj8kybi5n7z0ei4thshnvh3w31t7wxcolrg07umbng04piib2towszng4ml3ol6ur',
                slug: '6gtqzmokjobjzr9ncg0dgioiphcyt1bt6421zaqe9egk33pmwc7vyjtgkhe9shblvlr77u8y1hbw78jfe9dcq6shn9tx76gtuc1txlk65nw8t2oz8d0euhhesy4b3v81qrib00nqfhndx5c9t1t2z7t5saheezhmbx5n9ns3tvk0rt3lp3cbq816i2bmfpl6p56sk7ir0374jcaquw4eqjo5yzjqvqoap7urun24d5wufqmw9agvca4tnmsf1aud575z7pn70rhl7nh53n0t694u8be9mejogyo75akegm6t1djewbjudhww7q5nwme4rrwmt38ugbh9kef2hi3yrm1x0cnxgn8x3crsc60d4gy2a7pr9kh3xai32r6xmvgr4n7adi2loje2lzhkumosloh1vhwlwur8m4f6kwlsbmg2z33a9nhy88j5ikhktpqk8zwd7nv4ss81gbuqsj6x282axbr7g5wm99h0q0i9h4ode1uht968pj7m0sy0x8ww9bwt30fvexoviqme2jljgu0tnjx1ozng2gvff3q0vs7u6rbxtviu965kxyvqi52wqq2yo7bqrsj3avodojeoq7zerqzojjah2nwsh3e7jdp5opa77cz7bb5xox4h0d0x09kw37kz86gienrr2xctlbxiysr4flsc59sjd80ax0yn056xytuo8b80nlsoummzhyha4lkbou31zyhhwy4g24qf9284ksziuln55raijyl3qaayq8ziqyjzvzq76kxk9c4ie5rmsasohbgantmzchjvmfygq84cjzx565lw75d8jnzfj29i2523vv4rluvea6npy6xqyz5pw4kl5ue21hh9j19nh1ga0yfnaq2iiydnqlxpqhenpmrctmn6xkgmj4zzbyeggr4ocux07wv344j0ixq0mtwy6798i53m9ky3n19x5hxiijwurtz78acowqlx7ow0s89krxwufqbibcs6a3gvbipltfym1082bqbbcpdwi0h9uwc43nt3s6b8',
                image: 'iudq8vs3b2djelsek3puwm9jtjk49kvd8m8hozm2gzzmyelniqzvmkok879gg0zk8q2kevydhu5yedeo0oyre4ryjp11fxuf3yeydnuquqxual0o2kup5wba1u2sze2r0b44hwglmvbq5yxy912thqrbh4umks5bxqj726csfpvhgxqlvh0b07mcvoo6dk4wmnyfvptddoszsnkets2017hhleln8b2tq9hqop5c294ymhuccsma3f8zsi31491s9obv6hi419641op9iv8h6k2aqxxte0zlh2ng1mrjoynbmruskx2ibgrcjoyijbf06vht5yt8vnt0ot4ey0tb1gd8qaqg2s0ou5r7zz5ot0vl6cyawfh83x3mgot0itliuk9eod32dpc2qnn7ooeh0qwr6s7jzd6yd2g6bvzyquvhscvtes06xnoygj7kaw6cfsylyhdm9yipf09wkcioyifjo8vq30weg1ncz8je0a5ibajx1tbo3759h2yy2ilnoc8dpae5vdz2xvts5qaryyytfcqq858rsq6u322y2qhiurlpp08ht9ox22bdljqb0ly0uo7zct5vr9bk7k5ng9uojz422uh7sm8gzxc1xypcydskli415mq8zc6gzt5uara5q0xbanb5q1rr8c5iok22csrvkhztwxg13npj02w0qdjv7zxnmjxz59zquhwjxzlmt38uxgr1j4228kgnia1vy8dgy8nquzxfghat9a21rhjak87lh9ls4m9dsexdnxt8fyq2v61aao7tv3ksgbtguzurnlp8f5e6cx3436gwc8higm8ss28uevnkdgo1lp4tdu7ka7k6cc03kzpi3k0mxn4tbvtozmzfipnpoutohn0pib52bs4zofpz9u6iakoxt17t8k82934fqurlxfqmw0e4wojpgwvupu7vo29s1oa125iqv61da3c2x85whdxrr6b5nfwrg5n5lzdxi0fekepjen7vs5o6chsorjqz885ebwiu0po1vcxdjqqb',
                sort: 766060,
                administrativeAreaLevel1: 'pq6m3ynlrrw5t0rze1bsq3ldgii6h3fahje3joeak5m9ljpt1r',
                administrativeAreaLevel2: 'm0g13b41clk2qjt7o2cdsf1bhpg1bpf29m7gqtcknw2zz6o3d8',
                administrativeAreaLevel3: 'fgxtlmt6yfh17y8ry0gia27tnad7eep7iqoxljfk4w92fajwjv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 774.32,
                longitude: 619.57,
                zoom: 31,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                
                iso3166Alpha3: 'aze',
                iso3166Numeric: 'kqs',
                customCode: 'ss2divqt5y',
                prefix: 'y80n0',
                name: '8flhsyt5gl2lahyktn1pwa4n49llfbz8bbpyyf9r8eu9pagxofgzr28uhuqt3wr4tkb2j5588rx417j7tzy5xjo2fwlh73cvopg7p5daagyrg7u5pkuapmt5w40qnylhmgyjri8d4neocr0b2pgn7xelaijnd5yk4ch15n6ksw0jbwzwvlgikut9wdp9cof97n8ss5jzzicn1vnwf30czfe34qccrxssk65kasyv10bvltg2lz06jlgh0w4si83',
                slug: 'lddhxst01pw46dzojmsrfki33pfv3jm75xq9iqzkxzgk8b7bvax2022rvpoasthlrbmafcobr4gwqsj8chz7s81x1d82o1besgvjfonlj22ifv9yzbm8ydq7zbos8w8vdb82uor4lrt2xh2tji5p98zyefpgt3sgt7hc8zqpwpcw5spw9wai99o4b5l6jx3p7df275scoe6pyk4sk2zy3ih2z50nqcaonpv4m3njhfwe57553lo5d02srzj8vrv6w3wrfjpc7qmplac9zwsvg29c8kkhs0go8tfkz89wzp4k6x334138dvastirlp44ph5b0fipto1ljjd7n3p23xnvuwukk5sze3w9z54g5dvu71cx0ohbtewa42dmd2y61kvka22ku9sc16jz8k2mbdxw14afaxu2ul3wp2f9o47uuzopl94a8x7v4zmgb86nev9abmny15tqk3sb2s8jmv4v3v6fsj4r5vwuz9mj8dgt8l17hn6rp29sb7fnaijinjc2vdhm4hsdvhbtc6zoj1oatk1dqqxt6qjts7s3l06ciup31z5j95lwbqlr3xdyjctexa175gbjqc18zjwr2c2li6yegm4so0vma5fwo3jij5bxm6f9dfh117teiqf6ztwz7hjhnhaknldtb5z4gvik21fdmvo8w09rkzaejo3xblouehgg6an0eah0wbj81jjlti7r3ka41vr2xqer1k3ud66hhz5f8xuccuxamg82upysildgcujr8n515us5tltscpme03zmnspgobfm5ud2vhj7aocv3lh7udlo41ztvg0q24cqdjsr7udu6nmj1twvs81i147fxdtfyooi4nogggy7q47r9kola9237f5ayjt6fm5yyk1hviytmenhbwwzomxx98u3pxgq50wojfajq0fiqqm325q47b99jw4k4rhlm84kqf5u3bp0y0419v2erlb6uhvwl6007tvrjeqoy3ykpbebzrqu9qvcpwhemmbam7exrqk855kxehe9z',
                image: 'k2k5hjsw8b2n9yeyz4op1n58r1hrvqyinrnl7ygc48qu1116m9iyht5c9omffzzuecm3a1qatx0be2lzbmfgvxd94qv41k0htxskqnp1c2et1pxvs9ki9q4n2vuufz1rs01z3us7h59o18hrjdif6suqrfvrilng7rhodkzryetz0gxbt3b8tz5yokow57olt87wvbeoe1sgoyk9d82u8rccw5xi3zj4ybu9qidg9o2v542jmki6bqxjwj3yae4sc1ysqggl5fc65du265j3loa87yryzeu28wu69uirdtd2fukh32ni3de5b3nj5rdgogihwqx8k2mmpyrssisa041106rhl03em2s9ba6sc9l2frla9cv7qxx6whdvebmvz854kan72p027ysfft24n13ht440lt7uiqgzwzqvw9e3reb8zvvbdoghft5maovrplia9l6p8t50kya83dcsymik9c6hf4umaufirbzyel1o5qvvoyd95iakk6b80ipares8ahxrsajrznwz626flikbg8h1wkhvetp41vetclfa437jqx9v2ymjhdhxjl1smrv2i9os3zxfh0by5iz5ubojvh2o3v0mg3du2k4k0exnztf09l7t93arlleoaykf8y250f0oekcunjzqa09g26c2cr2q5tz2qn11o2jpy28ckgdlwkr3oh1d7522qu15spes4jxhr9kic7x50lclyju45x5q603kjjo0vr6f4tw9a6uvm3tocv9oynpkrwt8p1j4p216nqpwgc0rz0h1nx72jakevbxqwph8d68s8ei0ddc0vcid5kgt9ikxsimjbb4axaauvv05yoimoaqcm8727x8xbcu0h0lfzytk829tw55ga3en5bbze8h46f8ax8a15v7i94qxgcfuwekhq95z6l5xiz802oa5zrn7kcbt7z0u0omhh9th2sd4mzm7hlr8k5ayj68321y01dudqwtqhyul5kbm3hvxl715wioekbfgnivrso2nivsbfrtw',
                sort: 825650,
                administrativeAreaLevel1: '7dapshl22on11lfgx8afpcfbrf8pz34tdyjz4s780p8t3xb4u4',
                administrativeAreaLevel2: 'xbr90buhiei8j9o2dr7bwd2usk13mh4mx3xn7tnuq23g8n97dx',
                administrativeAreaLevel3: 'aj7jk68k72dgfzswq12ewrus7gmd8wiw7oz2bt0rpvegj9tjwl',
                administrativeAreas: { "foo" : "bar" },
                latitude: 746.82,
                longitude: 562.08,
                zoom: 24,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '3g',
                iso3166Alpha3: null,
                iso3166Numeric: 'jb9',
                customCode: '3ztrouie2i',
                prefix: '4wepc',
                name: 'xuj7fo1inbu0ck5i7nppg0ttndqlnxe7qkc9h17bwksd5j44zhxzp7of6cjxvpysof6swd986l66nd11yj1hzvqu1qjx0aker9ctd1j09mqxo1ypzppqahpc73hr7k13dipn3818jgj994s8lukw0tpp8hsae70jctxda14u210x3jsm5p2z5gjgaw4fm112rlfvlzg04nxqqnwyz5b0www033ixvrmzap4c0c71xyxv5t8q6bkb8wagxkqkbtn',
                slug: 'l7ton48xxwcj9q5ho3g9299bichptv5sv80w1r8a6o3m0eoaf1q855yt5lqou9ztkso4eb3om4rqhvdjy4fr6dnxb7chvxg54xwfyxo2ehx8247fqph6l0tbwm62t1echvl8tpjzc99a8979d1t1wun6ybv6gqhcqy4cpjze6m0euaiah2npyrdxahbhch64qjsjf8h67xw2yai9cddcoy8ujws6s1hxjliebycovr14kyq4uibrj4izrcb88zw7ouuc9b0y9gxkcspmmiyzcjmds7tluv9lcthqacwodn6phnhlusliph4tj79lwa4znvvyir8r21ms12t8m8gqhc8hok2kna0jll890te4ss2jp25p0lnkq8btc1808ikmr2yueyk9iay1ybr2pag5gs81ilgpvcycm2i18esvu0gtxcda7p1mx3i6f2co584czapp44ftznkm37kgczvnijlpwvmivr2zxcaq22uaf4wf2jyyc2g1ggqaiptdcuer0sqjrltflbapgppubjyfvb7znpa3v4yhwxat758hjm535ambo5ruktoextc5px6t2mu7ddxy2vxnxax3u6jydq25rflyyojn0n8nwq7ny8bt33iiqta2jtoqeqskj09mt2v691ljceauau3ktmadp6qgtspeahvxu79k9u5tfhn9f8xlibgcm89simwzijp3z5xxcazk5gllunxf5nsareju77khqd7uwkohzyp99qmo6ag8aiuzz13c545ymvpx0z018t0mbs4uj4lq4slc5yjf49jhjqp45yo098ylqfb5d7df0mzx42xe7y0apnxb5cahddwvfiv1aiq6f9c5byq5dpig7kvxduzki7mqx6mlubqq0z8iw94sryfsqu69km8lwu54kfne0a2azbjyavt9blwwz9eykb16c563188tschwqw3njv9ny5iezfb6aybeb577s0hoyzi9p4lll8enpf4bhqasgrmch98c6pbv3v5kxp8fkcczwki9vtxk',
                image: 'fpu677jkhx10bg6tjt4wouy67hx6zx5lm227yseeaske17j8yhuufxxlirz4b1rusuthyibmpfrqhfaacjca7g3kgwprql1ror9wzm01d2e3fwp3rth18s8b6s1ug4gl3egk42efh8bhcnx2diog7l86vcuthchmzguv8g8uf0a6ea4jq1jqqq32om5cka7crn9mpes6821my0jyf26q4entvq2ivi08hsbcxs62lyf0unzzyydnlpvatb14j2y1vioawkjxyna3i1njfuuguuaywms1glm1vagc2nlbwd50duw6udxyini80laydfg0p5v480zb7f9vl5mtjnckpn3ocynio07u3lrsfkrg16rg3llbon3pcx5ypk7fujnas9s5ylb0e4zsx5uop95cqgbtpedoph41v2wkkxs3v9gy9hrar91eu9yh92gbuzbumv55ogdg1q83dczucsa4g7jlb47jiuojytpk5hf0fo45e3zkjm4jf65sqwrvzpewh3cz50dpr2dw3p7xv0zfh23advlpb4a9886vp6qacgljxxbxw1mxa4g5dkkce7rle4mc0qdk4sft4qp3k7raavjk2rfb6rfdb8mmzbvbi8u5py4j1ijvokjvl5sg65zo0s15gkdp980ibyzw2xdd5vr7gl5zy9jffpv4e3ole672jsfb83hc9qcabxgmxolqsfpztilj3w8of1h8peikv2j0l6fqo62zvmh4li0vdx29scyopo2ze8fp5fz0w6c0fkko7vj2qrl7fq5unr38iuuobxmqdwzr5t6xbcm3aersx2tqt6dv481c6j6xetdwpx7esrlempu4bqu0kjmsxssnaw666eb26qe3h4se4bel7pnv8n0zpixdib2dqo0wp6u1rso309nx2fjskjw4fhizlpgapy14m5ebytbe7w2djo8v1mqa18qzrxs6zmdmrmxt1d8yxik967sq4xke12m7g66ilkcr8u2q3zzszko686714vp6yafv0t6m2xvl',
                sort: 482670,
                administrativeAreaLevel1: 'p5mrwsbpwk3c5urx2mw7x11x7xesr2wa77b7on7i91maazy98x',
                administrativeAreaLevel2: 'o4euq4stltd2rtnrjl66798f1n8vegy170cvfmpbee8tauw2xf',
                administrativeAreaLevel3: 'm3l2hr5pxjogd73a7l9k0cxuy9yq054dq5xcpfufq2v5zxbtdc',
                administrativeAreas: { "foo" : "bar" },
                latitude: 401.25,
                longitude: 716.03,
                zoom: 56,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'u8',
                
                iso3166Numeric: 'x8v',
                customCode: 'eg5tg9lh8i',
                prefix: 'lg7gk',
                name: 'wkrwwnz5nndowjyxtwc4qa22chmmo4b2yeorultwwbdkn8tvq8ybke4u234e1naf9osuahqqq3pq8x30wr4dgc2e4tx9ydzp1q5gqf43igb6lof9iuaqbifda4rrqma2k5ip2szvx25ckrglstamdvrorifuvod5pbcfew2eiepb8n6uay36xghnn3uv8qb18g29e2smb6hw1xzk345tzrlzjmzot1wpd7jp445va527j0bdsaoph39dk5ncwyc',
                slug: 'ca284x1rcz8e2xp872a6thpo533datt21tmwwj86io2f3l8928drl1970zwn8hx8xvnrzi4rr0k9fzrph28gndn2v17casq07o2ft7f2muo8d9hf0wzn2mihiebo06xlp5no4nsbrdzdz3imz5380rovt4077nvsuzv5hbhayfg5p98oik2935o6x6a5eevs2qk74roejopp4oiavik50iz2bo0fm3l6hphzbzlhqjv4znu09euq1x7vi3sj8fpsagyv5ii5qczlqz8sv8ml28ge64t785d2ja59j6fvq77j05vw0fgub3mvpdeql2r95xqjvqc7nwqnj2guqrhdo9lnvpw47ngn6cxqxoopyxsl3lanj3xbjplvrr5ke2ofievpbvw0tfa553sw2xjga46xxmk0a8x6w2dyjkp6tka551m2u8nyne8f56z68crz8snlqp34vhhxjj4c5eb2zrlg4230fw79ay62canbjtw37akub6gbjfvyzsmnwf6142pi7ofhxjho1hwqgvp6twelnymupuz2yqbdx62qfvccie1lzcqquvj63pfh90yijp0hug4do89pvu8yqftbvjzzqfex05zbsepou5gug3qo1u7wp63vw4p4py492weqwokzyv7gsodm55u5v90fhieyszofhslnxwulz6a0f5jzglv2844wdp6fu4s1hzcgfjj6jywe2vva2iqvhn3kf04fscphf3ykh06g9ourkp35l5lowf44pqds21a4h8c3clth0nb1v7ehi1d9v68lyy4sow99xqdn4i09ceug1yzglbb0qvy3z90ue83ze6bkamx3x0lp5i7t91ktx9qz7vi1pu32vu22ml1iaezhkp3jh50u43hcejn5aklpasesvzhv0qnvc389ppbk3kunodvyemnasd11gowjpsoh7eqfbm01w1oa0nayqsm51or3vsdca25bsnw442ep8g82wev642pmoa3ylj37dhm5xkeb91vvpmqphz6zilqq6q7q',
                image: '6ncvoet37erjpchrx47bibblzk1bbllkfgmj84613qx5apts5lyenhl4vonu4iozzqmgq9zom0v73uv7aye5h3v38xh9w4syppvm9l5j2k6yqi9r2judqiy6rt6emxbkj1nuqr2wnpa7ymfxzbuv4hd8sehca0hlgv1dpv9dx4ehzdj8bvbn8yo2g889axjhhcrh4m7y9glarra8t73ulh6hd6pus31vy3p4wzzksjcd9o80zlqkxr8fite5j61unikkijp8kg200hzb8nfib6kswamzrp12dvwaaghmnw7rurgp7wkpq699xq9ekwhugmlk34691kxrhkk01e2ibqwqhryae3grsipzu0jmgkbf6b2jwtpzttu7mkqn696hz9e2voxsrrn7efwx6lcrnlzxvsqdq3y76ujngcafdsf7o7mub1bpzs45jden7jkql8kump1256gh951rbgbral9ffr38ezlpz5bp8fxvsizx7ji0wbrqb1bxugh7shna1mf1k93tb3ssjg59mp1bklup6myetp2tey9sy8iokpm6dpvqlb5o3c3ywrppmzc8ifzd1zyyjxxy6jtc0wuctmjqjr3t1n59ywizjqm5vs35jib8yuoiq2178e2pzijy7k6wlw3kh9bb07x4bprvrtsivsa7td802707nd8ixlukc4lmtsfofjx9laavckvku589tdkogopzov9fm22qxw2kkm3qlstqzw6520nnbktxiw69kfaf1yy4xypx4fce0psi3nax8hvxt2fvtgsx9af7ynys035yosu8fx46v9f9mawu4wemil49keqwr7c2bnlmfcbqeq3zxnzfotubmw54yk7w6biherfzkgajqsuoah6pt3lsk5kfa4k1o97u6v3ri3cpy4ydc1zxhf8iwv1rzye17zrzp63anvqq44tgizndf6wv0v6ryp42yqs2yn24hk7bwdrcqc8habw73q5nmkwlei2yw1fwh9ykqz9u3bbac40xvdff6lgqnduv',
                sort: 816889,
                administrativeAreaLevel1: '2bw1vq1yu6i700acmrxdo3d0y61ez8vvydu05xjzt4a68j7p99',
                administrativeAreaLevel2: 'b1rweq602zk41q2llj3qqgna331spmhn4vtobuanxwysv7qlce',
                administrativeAreaLevel3: '495ue8f0qqw84h4b1sd2a0df2i0weygmj1134e4uy0at5sj2ur',
                administrativeAreas: { "foo" : "bar" },
                latitude: 105.36,
                longitude: 340.79,
                zoom: 53,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '65',
                iso3166Alpha3: 'wik',
                iso3166Numeric: null,
                customCode: '778q2he4a8',
                prefix: 'tg6kj',
                name: '5gc8m2atpixguvzlbedg23xu1solfziudy7n6nuz82o4ocqnedq17ji50c5dbmoqhcurq2jqs0c1z4g7ck43083o5hwujlw8gqqlxo4zcx7kcf12cb3m4lommeytn04gjl16rneeh347jmgh0cgqcjj7qd5il2uoc25b45fp4on6slud4i0n7757yvp0zx6c7vks0t0n52u34vuyd5295yf46it92z4o0hzciwb9urb4bdbn4qmscyhzjqveala',
                slug: 'wq2eh9nr4osaa3oo6lzatoro3pz2k8io606kc4omqq3w7ig0d8z1d5uds3dhpn6xt0kd91up017qydnvztyhuu5tmb7qerinv9kdklqtbufll2n2q3k2w1an1gwxd2vhd0ay5tdm4uf9mrh4wm73h2wkoslt40yg6bq7p7oj7nvjhcxat4jrgwpm12vit37icm76x237b9wilywx3qc9a2hert5v622rwmzjv0ba6sconoodeqg9stmfbb7lj1gmwse3bmj8dluuyzu3rf9odpiatb5cmd9i3lerrwduhkoncs0sshfrvvjljn831dhl0dcb8el4vsboct7oc6axtpdxszu2hmf1h7jl1m85z78hkeuttjjw1b23vbhbffum9r07pnmetdo1vta2tued6shd8him2rlvb456rsdmsrz82olnjfsacvrmve0ip0gxhao8s2gkfh2zzp2h77w0vokfbi5y7521d200uux43hntvqu8lj3itxdzu4lz8t2dmdezqxtew9byvo4cmlxaor1ea40ioeseo02x9s25y70gu3d6vv88h2amb279fdwtmamwh4jafsmjw9cz5peo3g5u2do2o30xgz8w6ubq7jjtkg12gy5i4f9loe0vbc6wyi2vgjph9fi1cuv78q4srg4v7uly6oqzkbkpox7ipbhe6wisjl7shjbyvc3rkec7rjrf44k29quyvzj3cs7fd09wg4fvc0i9p5ckh8mcb6q59l3fqrxq717uihey214h4b3g5kngm1ulq62mk10ly4j33ib3nnjisbywlcsovhn3f29e52dag9rkhsp9cxguq8tgqrohok0vau6w02kjhljpq805i9o2h2ufe6qyx70ipjgnslcd9ujuw0ozo4r9auhk8ba42j9mlnbt5dje7l9z2h6l6l8av7hstif41p94d25uswy11wnqfcb80t2qvls1rgkip1phs66fbhtyjhnctmxeacajj8cwma3o1tap9mvf562ezlgjxyrb1gm6',
                image: 'oir1lc9mazb4f9z9h0lphtscilcsb11b81ir921qakc2d2wro2bzjwvspfbx94dw6ujrko8wmyrbtciyx838ujb3dndsu97n8xhj6hlzuptqyegnovzourec2v9ibhg1yk9u71zzovjp3e7myn3qrlu56v8nxq434dncyh0rxtr360kv90bi789blhvhn14wyr4kf1encwvoxmdiiimd2fjiz8ypl5apfo0aeodn67zn81xjad7b5z4r2lmmf3odx07dx262oez8c8g06xd5xhezw5hbc097301lqh2zxe0jw8cizsf82vhxeczlwb87whwt1tjln4ycjqskf0qymltcgz27icerto9snyb7umabifcj8skhspsawy512fsq4q9wgezim14a12qtfwjj774mbq4ssd51xnfpsendxvrsu3b9nipcdjj40uhsjpgpsgujqwutsnb4ros9pdeix87i6j0zq0i8aipkgngqwzkffqns6452u7z2piwf5tdn9ri2ge0itorml7q9g3skju87mguijr94wiai2q6ufbz9mugrpyuu7ny03vxntwsby8oflqxaio9bxovnycdwcne3nomd4wevsh3j4whs8wv108j4frqoe3ox6575s84wqvn5ix0ypj0swtakmr08lp2sdj9azsvbrscmvdakn7uvub7cr686d82g2pw66xyb50bs6g1enpzp3wuo621fwd1earerm04zot8qyo149r76zbvdbmhxop3a4sfiw35ajlftzl39npeudrfuxu7up0dueifs5xtbcak3e1v79n9ur06cganidm4itbea8txucem0scxycowoxbafiyoukugffg9zztqryfts8m1vb07bgzqmrx9cmo3n35sa26osslavpwmi9k83r2a3q9rlkk7rvcb0pn8t3vb8ct5b8b496vbrrf17azj3eyuprwx4puilj4m50r45if5fhihvi6wpcckxry2dn7t6cd5hx85vet076kyyaqavtpxk7hg7',
                sort: 744341,
                administrativeAreaLevel1: '00czpev588ncs200ml4ahhjj89els36fagv06lwk42qctrmkv6',
                administrativeAreaLevel2: 'uw52wf5tv8ycks8kk5p2not3bmbn45d91lg27h8bzdvtcoclo5',
                administrativeAreaLevel3: 'hvr1lxmgnw8t98ozckkps1032x2hxjg6vtnx638v8hc67c381n',
                administrativeAreas: { "foo" : "bar" },
                latitude: 782.52,
                longitude: 597.90,
                zoom: 83,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'm9',
                iso3166Alpha3: 'ude',
                
                customCode: 'rycccl8pay',
                prefix: '345y0',
                name: '1xfdxue8v2z3t7493d5fx49tgoptt2nypr9qmib8ebvoki29jm0ggj24fai4b5r92md1iba0d10dvfy7dzx3j5s5vhm8mfkb4526s8dib791t16ushqkxtfm1sbuznmk63qxt2d7f5fb1bscpj4870w4ac2syjcn7lxwwndc3cn76ikogcxw7fnoym5iny85vu06a4rduo9qy1nz5t8l52lx131k20s9x0brn9vfwt54d986iwrxelukpc1u3wk',
                slug: 'hz7ii04slrv8wl1xjij1e0pcfif8kubaehsfbgnw47g92znh7dmeptwm6jjaubqow3wdudz2ox652zwnj3n0vu212nbmrhnaru59apebxempacmrh2tq9vd29qdc6bap2drke69vo53boqsv02etttdt1g3wv9wet4tnxzu2qmbe8xehk1qtiu3op5pdfez53lfjcmc9docx39avp2d50wdfvmaw0gzrqiftdz58i2tw5pdl3q7118293snw7olq1syjg0dsfo8iivxbqpro8saceorstylo55fzcgwzplcj75x5727tfds7skg78578f37x1a5q49828a7nk1rd8i1llnn46jgt5bu9qwi44xmwejfs7rvs2mbemtuwhqenrruh9fdvq8lruwn4lbmawdtx52193oxyk962dmq4l9i2ojowvqmu1w0ti5kmorrqg9qczfoq4wzbv7do8lm56bgmk162qhysgf6bbjv60yy6fx7icah6tes2uauw730wbb6f3ma1pwv35egdtnt9v25j48sj8pliyra7gczdjujj00h9rcqm1rerd4f1xtkewf82rxnn7t5k34m6e1kbfwmr1pmag9a76qrrlyu6jzcdonprsoet8t6sb8bya56r4guqkcdvdbsf8xu7ckao2cqdauewboq8dth4pwvpsy4yng0pbabu2cpv0iaicvgi7spqkmyexto9zqx9ulou1ppwkjszuz1tf3o70pcvfg9cnkkbkspezzotlrm8ffax9zwxrchp24x684wl9mmer9rxqefwsgyvscwiichkp5hu86qxwpgeka2kpjlsvg57dpmsmcwclldpoyhril4yxuo4axz2d0rh6e75xc1lcbfnnccy15ytn75nrsabpw2qaal4pc16v8xkc4zz0x1n89n1w50epy7xr15d9tgxfamxf9uphxu8jemppspiilr8twza1npiina5w9wjib8tlnyatjw5c6emfu37wlx2belhz2vkfsfuhr3n44lycfyc',
                image: '3957zke2s1bd8gl0556rvqicm2u911kvqdub00vrdaf5cp8lkfzk2ftfpvrma1kj8a4cpaulj7czqov42zt6dqj57ji74trrpmneelsgqvnnetlkcnec2tdaf96ldz3tuemwfk46xy1g76xcnh3so714cibfhk5y7z8r02htco2rqx9kmmxenaqjybumljg66s4incrbkt1n13retusnybgktvz95fuw2rwvofof2d62ceg409iqqn8431q7nsbp3hg64zq0vap5e77f69tp8ag33kq4993hw73cij1p99b5pnwsj4gq09rbz5qc13v1wl0a3u6gbp3rupk8ga27l620tjtul75rq9sjm8e9bv1i2seli9ijel2aqsod62eforvhffuy61pdwgnmrzl5d26hvleiwywr6c0ux1k86np3sw2c88xyfnpm9w0x73xjmhgk0q70v2qkr4vuao2w93sbuszvzrtexexs65s18xg02bk4h4icoljd80xtt58ky5v3g4lk98jkkixuw6y95rxl06iulfot82tf5cw6k32qjfb8oi7htj17hpdrrw4qcqthldbmkegjzqom5g98wa7akyk8vvr0vs4ox1qwptnvlgjwgv98t5i5oohwg45civxhs99z2afkp6bmd0cctuptqf8nq7t3sner67t7xr0sc98v6q01svswe01xdoe68kiumbdvxrc939kq67fm3xs1puo7iah1l480vdfttuwqj95sufmxgt5cby2tsf386h9mj7wt44645vgpgxgon2bsb92nbf98se4wpi0qy8qg88wh9knwloy2y07kvr658djro12s5cczd2ozdkeoiwiupims1ljiejbop7xk59n9x5di6ykt4jzozg8369boathlddvs99y45i5ng9pt4i3tjrsz30rr584qfgrcupi9pxfhulszgfbiyabm50kfmetm5tmj2jpcjiz0cifkjpkc03kyqwadxs52tcwch8c34jahxv06kgl8cxpddo96',
                sort: 869368,
                administrativeAreaLevel1: 'gc3i12ue6ckscxxqpjdlb211jztosm6ithw1z8ry4hp8hso5n0',
                administrativeAreaLevel2: 'lnfbv3nfzzeple5t02qfy11sz3xhz53nlq5i51qo0gf81rj3bt',
                administrativeAreaLevel3: 'bkicwqwz5qg528h9s7edg2i5zoj2kk71dat0r4dzpp5jom7nn8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 649.17,
                longitude: 914.93,
                zoom: 60,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'ie',
                iso3166Alpha3: '3hg',
                iso3166Numeric: 'urt',
                customCode: 'ph2lwm6fb1',
                prefix: 'x37z0',
                name: null,
                slug: 'u1azqfb12na2n3bhnkv7vujcpwqz9n4dnyqmkwf85uuuepauxenewazph9p8qann66wvdubscfnzeljfr75cfeluxdb9b4vyk0k7ycqa9nm9k77zbkn6gvsljyx56j0p0yuzz8nensgbeovmcnfssqczvwo3f8y1rlbad6rjxu6sshqnrg3ycq5o8698hwwpy0cty30frngnlarxzs699omowloikk7i4bnamaaw9tpv31kjuepirzvixu3w5zlzfhyr2tout9ebzz3vrrdfdxuo3qh6c8twbcd9h50q8087j2se8mqdo8lcz9sy6b4kuodq0m9mc1wds0uyegu95tvg01iqafj701qozrvwof8z1f4pfuwlu2xrijuhj6jo3h85j4songpmvmfpg2km381bhdpnfr22zln96adraqc5e8hbwjnys9h8h4is134xohsae7f1tkl5oui0agywe39cw6qi19f73pjwye0jzuo8hnfwc4fyqgzesy4qi3mw02seijbsdtn4l6v0rnvn9eawq2pjlm0ea3oq8cfln99940sql7agf761boe50i5zs24mf84nhn5gmbl0g9m13lzpmtsh9qdqwiwhbo7icve1jgz8fwdogfmysy6kovwd5e8ws643xbnq0h7s0raxo5ail2iod1c83vvv6kr0dye821i0dyopdw5mgs9wzfwgbtutyvlsxqdnxmf40se323eupahof9v0eu4nygze1dffs005koc6gv3wv0uujcob2x4jbvy01hzprae0fs8uwy2jopsqv39twmp2uigb0r34tr9une2apy8smpccyi3k8aoew25vqlp1g9qig54aaii8rysot5delnqt4myryuz61laq6ihgxr9q3yr18q1h6ddy3w0byhitjm6itzh46kf2jnybf94lrksudu3kowyhdpk1rkzjaq2plwqggsmc9gnsldwfca16pb09rgbyvviv0khmufvs5wbjkk0exd2l3ixsu19v3o6u2qjkaeru',
                image: 'xnzhzeyb3zvk58m76laac9gq4y8100mv59jimxg0ibhiibpiy45occfue5qa8yalwp1dg08xg8rs3uj7rvr218wzm7fu3rohsoor9gipm0n6lwed1d4cfoz79dqe3arncwtzni5rqv2ygmcz3jr9a9meahxcwzqq9wlxvav9b91sys5rt44wkluvasocwbtcoszb8nv1tb3gddzitxyg6u7lyk60w1pbwea5a3fh5stp3qunok69v38pjm5lhnmwa2mccb19nwk2kfnnh4f3mqp7j8jmrqsqsxwnhksgd8rvroyx8cx5t1kkd6r78o9nr129kma6l9gn5pjd19c0vdnot75vsfzl6tl6alz0wldqfzm36ez96tsda4660vv6tbcs44q6h48yuk6wiy9zuc653npmp0p84l74osjtwxcbcqeq2nbvslufp4hne0x9snnqgcnxl4dq0pi388x9qu23j6pvthlbryc8aj601w19ayju661qjgkhssa8z2vg0bmkb8qfq5jzz481rat8abr62dbyezcdiieqt3svx7b75adc2bodkv8ifof8xfsl0cnh5kpjqmyphmh52xnyq3sttlan3hzjsld6jm7f6gy1fyf4v2htqha44ebzh5nk09m463g733nuamskaoa0mguc1oxp7x8h6vppccnw94u439vnymek3obn5mxw6xgd8t3cevpjenq57gap6y1z8qk1l04lye9njy0qy3dk42qesxw8z2ctwrnfggaa4i8dtymhlr2n9iea4z7rmgsf2hha6u9aljp80tmem9u7dpkascmjmouz8tyx2hb9n82knwupgwig8knzq9tr37tw6gt7tcgd00rg14tj355mb4mwwnxpva5667zf3viqc9e2k4ylxnvq09p16vcjpgr577saqluwsnn5t4q0pzp3zw3l1y2wdz1fzg4vds0vped003s1lb97rixkb0eazgf7pqrkk7xyaujhy7myq70mklrf7g9awumeyh7qqnk3uws6',
                sort: 983654,
                administrativeAreaLevel1: 'w8rpa3pwltols4n7g23h1k60plvc7bj40uojwr9jolz4kjl80g',
                administrativeAreaLevel2: 'f3iorj4xrud7pjj9qhrhrmdp3eghuv3zqnnzamprv23n9mh051',
                administrativeAreaLevel3: 'stkigwftoxxtzf54b4tj4q3jvm6dvamnt7ui5v9d4rbq8wnv1z',
                administrativeAreas: { "foo" : "bar" },
                latitude: 436.29,
                longitude: 27.17,
                zoom: 20,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'y8',
                iso3166Alpha3: '85u',
                iso3166Numeric: 'nlf',
                customCode: '9w6oqx9mlb',
                prefix: '9ioie',
                
                slug: 'i5gl9p8jrk99p1ys2oqwtewcq0gm1gwrfz53sq12tr4ssdfn7694zuom2yxk4y9f1sc86nv9564n2cyhqhgk76120by83fd1o1buxxlrv38pu2rvko14u6j2zdy28x8l5lokakvlduj1ml4zm462tmfn4ru7zzclbsk21dx0b1cht3b2dblrk7712cwu22pstwkpk117j5dzcsd0r64eer4zqixpj38rmz3e1xshdov31pods31obp4lqa9z8cacfbke7eotrexh20av444draqqxoyxpphdtu7pcj4wr7hv9qgu5sslckr20cctg211oqh8nq6napxlubaey4wbc0y82zu5itw8raen75nhaz4cpneqnsgw2v3bzshxndvnux2wznbu0gzzz9fqpu81vfhm6bbipryrncqpajmyp6ihjcwinxwdmkvtv9whn6ama2d7qbsxtz3kfpzzjln5f53nshxl45e59f7dy2vd8rpjvtqxs4fjf28rz3913t6kk8pzmnpa3ai1sf8z9mwnubvtd26y44ylois6npblk5g3fqg1tk7ynvwek2g7o14ib6l2odogyh6y88cnnzwhywv1g7iej8y9yteezcgeppwdt1jo2msjboknszd3c8rtfxtvo8qihxywqhbrtyv37unkmb6s0q6j2yszlnv6hr1fta870pn8ipyxn7h27ij32hv2u1pg3t7mfa0ajzljnw92ykivdxnhuluh2ybx55vqabkl8zw52fdlqdikjpncsr4d2axd32fs7dc3xk6b8v3ad13flfs8gxz4is80ifgz6bbv5aznqc4v8nwecei496ng2pmptjf6kvj4dr11krkeh90ht8f6kebw9b3mmi9drrgzrhjjfcvz1oy9vk7b5l4qm6ciwhw9e3ipf0z00cqv5l4hvb114tkw86ojpecjqamwu6s337hlo99sgwh7igldwy4ba9nuvrk0fjabst03rmqs22bvp1h3g0u6536s9vo8piewar8do0bep1v9',
                image: 'm18muo9zs6o0efx38czzd9kfyewtg66waxf6orkt90hlu8dfemeoh4ii17wdir6sbcufox4vnsm0kwmu2boc4q3y91shpc5c511mjsp9x4wtjhn906r7ii4dk2u42dutfxl7d7e28m4o2y8v5wpdrpw662llfy7ca4vsyztf8091iw65p3vhl2nglgrm3w82cw88czdobzyovw06tuasx42buau9vyivoeg8m1yamezq90xtz6hrx2agni6vv1cx7luu5sserhvb73868k7d0eoiy6ag89htwmxhnernyz9xcuaf3w8h1ssxqdr3hmkankx5gxrbrpbmgiojyg2vd3wtpwizojzma7kxxpi4rzzz3udlm4lv8qpm2puyb2csoujkei1trhc9pc9zgzmrqz1uuczmcu0va31v6xdkcdal5h2xozky5lys8p4h2hy0oyabfs6og6hjjj83obybrw9o2yff86znzp7fuwco5v4p6kjrolqqzx64ewi731k42r0iqjaq5ev22nqkrcqdauebdpype2z30dlssqvvif0hzy9eur5kptgrjrcxjx4ntjgr4qsfkgvuyjgqzinsu253bpu2v9i5pm3i0sx7betu8hpebg7g1hvo6npinuhruektsg0e5155mfn52347suicp5vd2nfax2o9vuqqsdmqecupqspqu2ckyrcpcjat1l6whdajhz0ypmcybc3xu7wz5h57ict7zk1llfj66bo95i4cd9mmqh70xb8cllv1besg5w2niuijfo9akh0y44fp29p5vbicz8z404puub6ravh5wq50svgejrk42f07cskg8v0j3r1485ewbauw5vhpxsiidq3uz5mp2g902xi5eo6a0mqp678qpgxo68qly84d6j4cx3y1k05vyhj66c2mrwmk21f7td4h0dzwjsosbe42bp67dhrso87o9dia5n8y83bfzjplqj3mfdp64585puf8y5jujypsdjpxpa1hp9ch328jtia2xun7pv4r',
                sort: 432211,
                administrativeAreaLevel1: 'sfa7if6pvg5j4vlqds0ewbuc87qrh53g2qxofs9lsig33atv6x',
                administrativeAreaLevel2: 'uw8tsu5kyw4wbfppiikrh09mo9f0cffuu5eplftzxmbp7vtxyz',
                administrativeAreaLevel3: 'd7zjqtxjvfh53xcxgh1skz1ggq1b6gw0l6dum7dgu8tssdwmzw',
                administrativeAreas: { "foo" : "bar" },
                latitude: 880.23,
                longitude: 790.23,
                zoom: 58,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '7o',
                iso3166Alpha3: 'xiz',
                iso3166Numeric: 'pfv',
                customCode: 'k8jnqpehjw',
                prefix: 'xkl7y',
                name: 'ne9tuo4ch4egih2rxsy0djdm62sf9s70e74yoe9hhaz7fyvpnzkaol9xdtl7y8aaj9inn3xugzgvy6vvhh955rzgu1uwkkl17n4abpdr20dlehfxh8rxf6yuz78sycy60awd8pqryjkrregflrbfnmi4pgj1k9095kd03d0gb1a3mzkttchfsohldr68twcn6oz0phlrrl88raenkty7tybgb7z0fiq50dj1dq1uzgvrufe2ikqnr9a1am5m74q',
                slug: null,
                image: 'x5ak9xdqpmk2j8vscab491d1gcvdbdn2oahymhnp1cqpb4eg1tk5tw3mkyssqaeo433p24xrvlhpelsvgyzh2zyzrpq7ysf7v1p5xznbgml16ewqrq5cf8k2wke6k45lf1xc1vsbxygic9jgyzqpaqbo3wwg1uszky6xsz7k2n5nkwchiqkppzxgypz9ivn9mfuct4gv2itom2cklc4sri09b901fahfqowm8ckltxwv4wl5u6obkyt6czzd07li9pngkljn55yyu07okjh79cr0lfue34tciuvb605sch1ubnpp0luvpng4pf78f5le91lbnecxs63962sa17ge77kzdzl52qasuk2twgmsstwmi7dbxt2cgcsqb7oq8q11aj7r5ao5r2m5c8rs03xexruq9cymnvpko8wezg3aeagqdctnuzzx2l64yauf2tit4ga9ulq8i987ym6igp9w2vcwgpk1xn8w77cex2zezo2bqbkgxrcb6eh21iagi3wra2ewtyxpml0r4oxgdnct8195r6mfxnkhcsijzf4kl0xo5s0mtlgvct1gesgbikkektxh2tberet7wtiu5kriz56ckhhdsbkatzc9l7pab5uxp8pxwdoedx4d62014v4ruretle6v6ox6lee5hq22xvft1ked1kznm8nlz4unm2to2981awnkgf9c20j1rcdxmdz84lklivy0p9vne5hlgnifwbunsql9mftokptbnescgotk53xpd78zv3x7rrsaj51rlzn9ewz9yohhc7lkgdhvlfjzwyz2psw4zqgcpzzmje0iuqw2ux6lgb5nz8z06d3s8zgmkpuyy6vtwcrfv257t1r95w20ohknwbn69rkphhfimm4q5xb0zuesxgz8n8dl7u1mk5cd84jwt6nbsj7kuccwo0e0mw22443pbbfjrosaunvonv4m1ykpy83joipq6hbe9bglaehyym0wc7itlweijeivinz30rlbax61yym6ehb9li7ed65o2bjg',
                sort: 244264,
                administrativeAreaLevel1: '01nxmv972tedt7l6opl6kcrzr8fdm934rkzdxuoeti1pie1lvo',
                administrativeAreaLevel2: 'wj657uyqfwyp1bjlpq36d5indrlqks1x3967m32rnx2v0gx8jv',
                administrativeAreaLevel3: 'yo4tfzfw1v2q8i3y4d5dcrr98h9lhhwldqkoqwv2reh6w7i1hh',
                administrativeAreas: { "foo" : "bar" },
                latitude: 531.25,
                longitude: 641.57,
                zoom: 34,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'vo',
                iso3166Alpha3: '4ka',
                iso3166Numeric: 'q2f',
                customCode: '3v3hdukyyi',
                prefix: 'rss4s',
                name: '30qjphbey7xgfki36xbsitp0fzekz50aydnduxzkrssbx62ez6jodl35go1dc9dbzmw0e5d6fuyn13actm5kfw681nnfw7zp1d8ii48byrqw90trtcs2wwrc9935hddxfp32aq8dwitjh91v8oqn9v2fhpaozeayri944fuqjuc970a23hkdhdh72svtph7a4d2sunq2gg6ll48ugpgh3nlrip9bamdqit8z8co7qrlwufb2wkphe7oxqpom80d',
                
                image: 'ek9iyvfuk21l0lk3b98gvob6dj16lfmeccfo8jkmsfnz234am2ryrx3py0xrjaecfkfithlg5qq1l4813jhcig6f0um4acz58ytl7zx1npbr94cyt05f1ui0ychajxvv55p2j2ruqcgv5meju5mryagv0qkaaxp3fqseb48lrfre8wv01pcw8ves4mza0p6ytalaj35toi15mae5krzn59jd1emyg911dt9fs3vyjh01liplvhj07q3hh9ichr0r0qjmyy2mwf0slgqpmhzsa3w8pbaw5bzofwgux9pomp9v9d0geu466dru45l66aghfuv695030s0w33an1k5zjrblbbyw1zadb1xi5l8v1uyikte8esbuiutdy7brf1y3vdmw293zfa05bzikopvcpiqrraqu3qatg0e6rnkcbdco7ypalf7cgx6i832dhletzrny2hzw4p630dj59wfv2trh5sbl348dk87zg9et0sl6jm5hpavpa1v0b80u2uccy8t9zd70cr6qwm62lntw3pqhlu7i3vxu78ls9z5d3wammq94tqjf52kx75t4joplie8cs8gs9ku9at2fc53gaq533qktau815ijjwpesj3erue25xvwybc13pi91wtpnnaw5ztnkuqrfvvxh1oa0z7b3eqn8ydi97djha0tnf3mlgpubs9nc47qc50bvpqx6cqgwzdysmld7xkseqiosy2n275t86opmyg6no45u6q8aipjp0688461ghxqn1wf92fskvgevvdl7j9r9cgfof5r3iseypzcg6uxkjqezo15w3qrvpcdt1sz13ydi8q6tyzgc2i56lfypxljyl3tgcthuxnx2xnaijahfyup27nru86m2rgrkonvwkgwxep8eoo2n1ynltrgnpimume30tcj21gtsyo92w2j8eo6rpiwd4lzpqs4tzsmly27nuqqal4hwvsxqkjn6n2h1j3qygj43nrzkzxinhs3mspfbk7xxrqiyv5hu17dx7noy6es1',
                sort: 281658,
                administrativeAreaLevel1: 'h9lcntukaf2d2m0kbdczabzyl449daaivqdofv640zcuoxjjgh',
                administrativeAreaLevel2: '8e4ajyxtg38tobbn2hiqm6d5ryhlzc5yptszloxf4iuphkgf2v',
                administrativeAreaLevel3: '0jo4fqk48mp5aukqpekiv0iad5hg0b2bzk8y05q8olis87wqpw',
                administrativeAreas: { "foo" : "bar" },
                latitude: 498.83,
                longitude: 258.09,
                zoom: 66,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'l1',
                iso3166Alpha3: '43k',
                iso3166Numeric: 'vdr',
                customCode: 'pjnsc15mib',
                prefix: 'jcnly',
                name: 'rqticdqva0a8xkeya4t55mu4eg56nowb5ughfnojrrh705eluvkuwhaoqryzy8kllzctdrpfx0glwxeoygl0oy8k9uutzpeju0ear6658ibnkox8azte7rzoy69jhjacje41s3fikc4yk5b370oyzdqzi3mqi66i0qp6ntv0jqq3tyiz1akggs3jer09rcn6lgxy0k7byhj9vu6yd9a66glh69guwvh6x4tfexcslj601unja26p33bv25yl6up',
                slug: 'rlultcgwbxzh3u18vrwgs7mcluyqht2ap2n4nslnjlifxg6jysocnu3wox05py24opna7t6d6okg4i8j7utwxo3025acertgswzvue2uibd599gkcdkq79wtlej7gtxpe94uvx4g1cwgoo4no49t5x57df9bh3n9nscb3w02l93axc0gm34uegq795x56rvrpgozc4gvubwg09vh1vg7xkrakkvqno94vxqiocpsdyp61cx99yrxyv4bkh4c964dnhwjgm92t8yhz214orii9j41doiwz2o03cxgdx8nkf13breiv98ufzo6kfwibambj10b1un7byr4ezqchfbfn2059gjxoft1clfi55swfa9vn3dsio9o240esumltod20efuremzdyrk401fnhqfxyesjpa7r6t3i45nqkfgal921ic2g05btr8dyug96rxdoi83dny2uzl6nqtqsej55fode0b1folvi3ajlrgl0xxssa5pqae0twx8tdkdz8z8a6jexsv4wnak4nie52oexeajr9b0knro24u24sa5heb0e44pgi9vc4feuopub7d96tbz4efycdgquv3e7vlojc1vqlowcsxn61hxw7b3ee7zy5bdgxvfohtq7gltz48u3g01n6w3ci2uo0uj6u69h9i47thah4kkcwmg6m9bc5rpwxca8axsdp2kc51w6uwglgfvrfqfzpanuqfc5men0fq3l3ea47dqadrlw9sjv0pjcz50nfvzbj1ro7at0uxvm9vwny5cq52v3x5q5y1h0xgg2r45ukgzajam2opl98zdb5xumk1wnvbb7k5z0e6wx5hxs6tdwk3vgnxmgu8ry0aco026494ukjmh4zcjxmbgti2r40dkjnlu9r29835tgvjpm2fwj7qbj586jfd0125f219pl5alg90i2mj7mw9fkxrb3pwqs1t8a1cq67em0rrbmna4w3c83u3a3a4cuhsli2uhgpdu0abak5cxipnkdjv2z7tj6cnqvmocj42k',
                image: 'h90zyw6yqzxlh9qj1jwgy809wnacfealtzpjf39m0p2tagvm6bxybrgo6tj39wcbvcayg3c5t6pt3jmb1rerdj1ew38h0lrs5irg22e4rapymul8o8em5dsfpgze17xtgluwl831prf2a19off9r8m5fxg9u9n8auj6kax02q2i8r5v59mf3gksix6wfp9331tv9cgd7votudn5axsavpgjqmogscyd9r7plq2gx72szha87chx0v78uvqs3tfxibo3rf15400j79qcwltcsi8nh38ckrwz3s7w6kygccsnbuw1jy4nqs1e3terpn3dbhpcnklkqe2pr2ywu3x0unm28rmzrpnvendgk1wfj5hlvxynkzw94qilih04ktupb5iup0llu302f8kegf32vznvdcgwna1apyv7mol7lhdnmz0kousdoy2sz8l8n24dqmg9ulfjrvllroy2wgomxxvgnld800svvwepgji3vee7mdbbnqhifo3srzw87eblgeug53nfmo8ck6l3zldahvr9zqya69q8h3p7cdc17oh45pd6dqgkbeg8ikubonjtl1dkei8xbevfmi0i75v6d6kxgfse0pv01lggqea6e1ykym6i61wows0q4k3ae5db3ozs73q64w4lvc496iltlhz3ffbhoiqj7i4ujxw08fdyac3c6ms6okwvbqvvlgpxe1ncthtealmc95cvbddgd285us5kwapja9a0mdasibs80psbjr7a08ghtzo44zdcp4v2hqf6pzvui76rtgrq46x653d5kqy2rw8qee2b33tbrgdlmp53tx61rcgykbf4ut2270x9lzw0uz4tki2957gcgs2nq09znoa6bu6voykicjyed6sc7hc6h56g4n8kn8w0mv4vsyqe08o5pnpf616vrr5f05a64ne3rl2u7wqi9wzkx8stbedogvlzyokdh2msa537ml57uye2ghhwuetedn69b03u77a3fbn6p148snse5rml1pf5f1a8rurdc',
                sort: null,
                administrativeAreaLevel1: 'q5waj4vukcyshcautxraov70y0qihp1qwdtbdntufc3oaaiv2y',
                administrativeAreaLevel2: 'ilgyodyzp93hstb59h3u2fflolckuhod6ths0s0n2wv18zzhk7',
                administrativeAreaLevel3: 'csqov2jvvpkxnzc7l9j2qsjo0vj0z7rrhtmqdu4r3vu26laidi',
                administrativeAreas: { "foo" : "bar" },
                latitude: 871.10,
                longitude: 795.01,
                zoom: 71,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '56',
                iso3166Alpha3: 'snw',
                iso3166Numeric: '90n',
                customCode: 'twi3vxnn0w',
                prefix: 'tmzw2',
                name: 't773w2hqlejof8lpj278g5ibu8y1imkfbh2fzut5jjqyvxpgpnqnsvzqw40f4q2l8qn46rvo250nsr8adoyt2eqmixahbq5fpozrw0cfmfrri1gdbr161gpo3q2z7zjlqto2678nkywptgbwy57lzpgrgyembn0mlfrt6h7ody8vjju0k11ssdiwk0ekewyn094gts2nrt2s17tun7kuxgc1tr9on292v4kkaecebowvopshsadggt5bwfpszm4',
                slug: '90yan99emmbscba1pub0rrx47yk9azc3juoegtfnudfhmapoidva3rkf88oe6sgkhtjht59cip30hmdg3mc8tpfu9iqv6pd52wk7iktbbzvzciiv0oujhxwdh3awjs25j4fpa7v8uq6fg3iwujwd54jt5inxg0n2rdedt59ge9upd17jtkja14j42serj9zxv84cdassx8qkt1l3lpwyc7ltid6gfmyyyfpkewg5cl4nva6pzsyty7pq5g915nbuhjw5a5rbgix88ypwt3ufyjy29h38j6oivjlp2jlhyrjbem7ku0rv6rju6rgqcgzni91qs7aq50shfknbwybrpwr4twzvwc2l7hoowdgug54x6q98mguzp17myl11q34uqvgdabuvpv9c5cfnz1lugpmavbvbayuz3prcyk3xbjs8l01mhrlx2xloopizo1z0b1uw1t8moa5ezvazbe31d3n70cnqn5f3getzy1p99bhmvys5epzdiqc0kvnr1qs992ljr6qp4vtu34luomso2mx9o3b251ctqdpxo4o5f3tg6l0de8rik9e60vnt1kpcbvvjkk1xg05d00j9r80k10uomlebmfgl8r6jfd538gh12dvioze0214cozzoner4ihd5kuw346m5pe9bem2rri9pnww5qcbtuer639cnk4c5y7ugq1mqrth9cvojce7wt5w22d4qzuvuy3npfz6tvx6prn6pqmz9svh5ipbw01903kkhcmkv74avp6jy5wu0egwr5ih740ezl3iy74k4cf7veko08558a4r2vxdc1dibzgin3zcr7xgnseghyleu8lvbehojqzuhvoq50gklgv12fqyic7eq3s014u0dl2beee972g35sc7q5jk4dtob98n4z0acyr08m2f1th4qlokshozo6j5qfx8inybesbhhlcr2oxtmeikww46jdxb2jp8wzsszu3pqdx561gqzudnuwsp1w891sn9ou2sqw3h3jyqp9hd5rkhku1yfs6g8',
                image: 'lx59xdkudenu31o7p87px5kghlr3xi1r7ooc0w2nqzqwqrv79uybat6prjjrdl96g6c4xmoy2khjn96ias174ew7caox32j65xritlvcmc2sckyvarggx5ke6k1z2tyuctkt8caco2km9ybq1ga6abyri8bca8zsh8hkwpidfl6ef8wqmbbemucprcle2ajjo8uanq3136zox3t3p55sgbsc0s9wdpg0wjhur57s6nrtzszou0kmc6da1ysi7pmrjl6636d8bnz43mzlksey9bgn7ofn9g1scxgbwv4o9byjpwv7q0b3vxlwj9xeqaw74q59453wv5n7txnb14xhverip0ix4i77s3w5a1cd4ozozjibysp99qxuv3rl4qpxp9ojtc82mmqkw9gf6y989qm0dv5dgs4eq7ts9iskbbpi831m0ljhqfq7zmfgq3iyv9pc9iicqazxtj8cw2c9swuv89vae23svb2u6o7klpvh8mseh6jov1i7bb97q2xu7gms7qpo9zvl1prwp7jwit7v18suzsdalpazjgs6vy1p0tdxonie2sdqsuc9xl85p0fhtd78fotr18jo5086xu6e2beb6aalphkot6pomi4ky1zk8agswkd7he1gq1hkfwlgfc6m6rrnfpdw0ay6ofqp6d13l4pw91mibfqg8zhki6q5oj62ote0qljmve3hcpgmi2og2zeu9lae9zw4pjfml3nb3yljl2lwksrehd58wtxmdh10mm3419g652ptfihqnr6xmlsngmj1ihon9c83iu7c5abeu53m9gkcpznm9ffl0qqz4uhe64dfs46vbuo3tcb2otzoa6ncgkzwp8n1zhwn9eo426o5lkuvvgy5pcx2s1vu0r347doathb3hdjig6rgoxubafcc3rutm72ak7h1bi7h1in9nqx5xcvlrw0w6o6l16n8emqboeprmwz8xopuy57n27n5x0iiqqzubf6ajrcf1vcncacuuxm9czog84zgvf5m4i8nrx4s',
                
                administrativeAreaLevel1: 'frzsm7kgqlnt6er6q4orsmzc4ms1pfss2sjipvba9toj7nyz0t',
                administrativeAreaLevel2: 'b5p3l3eaabzpdujodlz5axbqvnot72sdzaf618e4d64ahfp3n9',
                administrativeAreaLevel3: '253gy20ya9oa5jst8s2qzcwf2839d946e2s6rnxfmi8ptvn25u',
                administrativeAreas: { "foo" : "bar" },
                latitude: 335.44,
                longitude: 493.34,
                zoom: 80,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'e53rsnc1pg072eu4c228yfulopaags1ptjihw',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'bk',
                iso3166Alpha3: 'ekz',
                iso3166Numeric: '15y',
                customCode: 'vkmkpmem42',
                prefix: 'ur1fz',
                name: '75hy5i6h8uiql75fphv42r0lsxcufaakk5b2qv33bxu9202yy88bir72ew1e54kwg3dpgzg0m37o3fn4ruddhk841q63kj4wjvfpry0dshtzu5j0m6qakr0tdt3nld7g2l50xtdtoxut4nlwvjgibk0faiuj3kapfbopt6hhzmscfs6e8w3hschqhu5in208hmzhb416p8kdxwx230hx9jfqm32scnpea92n5obt3c6szkgokfoswschbs17y6g',
                slug: '7sry6q6phsiz3uv80eyjhfvgodw0pkn19cn0ub4c6vqfatm6e4mup2hzcqkg57xdp5e3nvrmnahvgp0bcsupiiycb7xhfj6gewsxuau131qus7z2ejnnuwecash7a9hyxt8sggasp9d8dxuljglyovq045gx1vgz5y15h0oig9vrvzynqmazesdm5f8pqzy2fqzqlu6fprrhqoajliy2th3j9vn935xfu4sgk8yot522jcsserj7gsc67cndulrd2wed51t4rfpbm0wq2gsznijheqwpddhp70ftwpd2wdd78un0o0dirkcnc214r4yzdbnu4xktwdokfjr9kelwoqoshqh02jzakjo875qz8lj19abhhbq5upo1yjbsfhdwkegypts83x0yxj9up652b7soxqd0gewietctjf0q0g67goxcr3wk0zffrvg0ar0xhclzqpg54mo01slp27vwzww12iigr2hdyiuhfqcr15u5twt60fhv39wjtc25qh20as7ry6frvteq3ja0ng7m20d7vtvvbqgdzzawo3lhbut6b0d9fapfp6zrvl9zh40xzvekpxlybsmlxb6hi64jsu58qf62k9d5qzw3o8jct6t517ub611kyxbmq8m2lgarxn4gkf5zz9ni4d6ximrz9afa0cbudkfc3ycol4jwdxz7asvax55jokm615ymptma9mrssjqvi97sk2g39zvmq48i9b8puyb38lariqrmxk3ekytq7w91uja036t8iduqsy26l8kntz6tht7hy9c7c38gvp7rlayldqagqpjyt5j9yujv5x0iyke4g83dwf2d3op65pitcpii3p0fkzw2r2637inzethxln8ujuzjil22amts4pn4re7y9sexshy4i5tfpq2p91ptnyoackwnp5mt1bl7m06wqg3p1z91dz5z51jvr5qv9vx23djgjafse8womrgon9pl6ku6e8ei1w3x8zmc234ic3vxysqruoxypsliqu5dxnq1zsdssf70',
                image: 'rem65fa1dg2q5e1duu4f32uc6zgvsyxyi8e36casti3uiu2kl3tdyd9im6rqxohgnpjbxpo2ex0zcs5zux5r2eakb3kvgdktz3qsxuq9rg3z5l9ulxz3cz9fz99hggxl0tneq34v4xk07ah14kf0onlajnn0sndw2e7thrrkqrkmkx6hozzl34t209ospb7za7ris1owaumsy48d9bq54hybw3xdnnh9uhehtmf8r6am0g3jskyoug692642lo0imdys815at4zxn0w9cocznohegs3d4g2n9z7m0t26mupg22vibof8sufallsy880id8cwmkri198h59f65wmawlqpyytjapjfbx4u4oavmlyenmk3v5e2py57qye9qmxvc82ggzrib8xfabo3vw2rj8l201riuz93mh6i60wsglrbtqvprskgqqc2tr4gpy8w3erjbj57q3mf4b2h9w8mpfn8167laiesp0i4cohc51r0619wwieealm12o4hw7qmwezfhhh027hnb7oo62iqjk80avqawgz8hprzss28m3kdikr50zj9qbr2p7x1n2q2npa2q4scinmgwzyxo7nz7r5hkavlj14ax1wqobhwj39xklmfv16311sykl3ibi1468n1zogtt7l5z1f5aj3hkbdu13direl97ngg5kzmf8pd9xcxog64pafh7ylehnlc8x958mg03vlf8umodcrulb48z61hug16rnrxmjyyoyyfp6h8q934eptrl2q34d8p8he2fr1ahbaaq7ktajzilxw365bj29624qpfbdpzpj1y0j4t6r5fyylx5jcbzno0qh5cnxob6izporxnpxxizfxo70u1xl3xzndpdhbreufqiofrcatw5zi7f4wcagnp1lu0nkmk0vm6782gjgyfqhz32fqnly3z7awatq32jvjjfvhocuj1et3havws3ggxx0ictk73lwtt6b2dr9fp1hcrodfy5k1tzqxkahwjg81sq2xafitt6tgq698wd5hi',
                sort: 248193,
                administrativeAreaLevel1: '48ocwdtavv5xdd61xvhgtrhdtby0w4eww0c0f4t05b4yf15cp0',
                administrativeAreaLevel2: 'la9u0val44jml97j9msl6glrbsnfggwlyt4ompu70rxrzki45q',
                administrativeAreaLevel3: 'uxb21rnz48buwkg9tzsstdo62ozs3tqf13hj5n4tkpxqps84yv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 720.53,
                longitude: 176.30,
                zoom: 80,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: 'aidupfc4txocy9676m5ov4av4orocp48nzf23',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '6t',
                iso3166Alpha3: 'ky0',
                iso3166Numeric: 'ja4',
                customCode: 'jqq8z75lmn',
                prefix: 'a9o1a',
                name: 'hq2hnjl7c209ugudmn5cujd5oq0a4i0xr3o88q5m2eavyo9glt6gg2kncvw4efkfasih63v16am3nuvk2mf58mjmg87t29100bkvj5d4nmmb1l1byvuqsbabfr9npqyzqa5r967ya59xd021ucjfdiqt8c2ske9t8lp8w527cl21i3x625pfdy7qgx0hbx0jp4jv6qz6sojavocr7sl0x90gn6dkhtxvbdvi3fpx9s25hrs39afw5h3yv8mwpjv',
                slug: 'w7cuxeng5ec5fwc9sseo7qdesdjepmyyr4w6m3b1ali5c6u5uxgl2z5spqjpqlqcmsgapj01oihitobpjelul221dm8yz9s1772mvx4vxr2ne4cjgwwvt8oij7l4gbipuagh9ovp5debyvskeebkdd31jsyey3mpolf2y5139nx0culmb7ghnmbudketcxymu9uo90p913kma6cchpb5ea1vvokfj8xw6vouw1qghybpyx76cewst6jpad8kuosvux4h72stt5u9u6ujk0dw0ymor96c3y18l76ydjk0zaxhx4h6yugmt9kwvgg7gjw1o17y3kbh7hx308gliv218y58ngx8zq9dhiud3le1g8be2jloiec2y0vvbjb8yqpmtbvtu7il2oyzvt0sfmakj5grxt9vpl0wy1joj8n9hi4frznhg2r4wom1jaf9zrhsuruhf3fjkw90z9r3lf0dlmh5gbx884ziysqknvphkshstturl8gxpjsdaaoabwlw8p7d1ltuda73551atcdj94ap5jhenf1s0g1i9tfy4ham8u0m4np3mo5fc1mqsmdymbftarf5xhzv4ugasz5o8udighops18orbid7llqluln1ocou24mgmqisfqsehadyf8krhritxw58icwa9lziop5kq1vmb89z971ue8iib7qmt8piy37g9frnxi3ldycf9j7lfkc2vgzh5zzzjgd9ertxwhxw9j06kgw8f5pvdco1ji92a6g838t1begr1r9hqy9yvk8ejh46ea0ekvlbrkf2ea9r2h26w7jwwj2srkr4hedydoq6agp1s0pqul3483a73jvyvqgnbai1gd67cvf8m7yt8m4vo6kpqn368up66qg3ht5991gd2l9xzopzz1yptxgawqcxodlcs86l2bxua21q7ybngseflxn8xsrcho2wc2i0xwuck5qo6yeinngz2vb9fwekpxdn792ytoknbqyuax4kcuefh533hbsrsq73d30e43zxy05buyr',
                image: 'zuy68u20u9xdz6xrksu534qcaqfyuhgzagnn9o12nobm9tm3jh1v1xkrw2qt13tiqskuw9s29l5gl7km9omdegc8qz8p6lftguawtjowwtqhtso1usbdf16b98psa7t0adi05rnziindf1lct0br3q8qspj4aa1nzoj9l6sdqzsnua54cqm8iquqs6f1d7ycimdsunzest2d51wjkcsbdyy4equ2rwdfln2rok4i6mekpfct0s9kv1f0nxix55gp1dl5k7ydabq8hcr96wlffqcv2oaw39uzxzl9zqbbbvian9x1j1xei4upajnlq6oo7733bqmr28f1e5f9sgtwu9mqhorvr3hbp1w4jjmlo5g98qtt62fs55zooi2x98tyfol83tm3i7sjkicxsmseuy7kt475nfvy7f04bm7njan7s2vlvea1saxagnefnnyfgtnvj5krv8jnd9ozplhmd37i7zogp6i5x1dz6aehnj4qmgdmkd8dunzpvtfzbbipu6153cyuf44erbqtc2pa2sy8jp6izpy1lmgwibr19xsew7jdckts4q0recc3o8j1assac6ujo9wcupgx2tso34d82dvj77wbm3gpr468ei14tvy9rquop5nkp3nmqil5iy9wpnvcpkjjeqkdkfrbuj4ta85jlszunyswldj1oqzn0488sht4n1stkyjk8ho2tig26znxd3ab4hvwoypf3z3whd8yqcaxfprux7dlef7hby181zgcuk8ml31hy57ccaiaqbzhyqodkfd8hy3g37tpzw8csl36mspp03b5nbd38jw2ybzlb3wcvjbxwhs7xctas3b166q36pqpklwh0ifa5y58xg144hebjodp3svtp5l4kx0ojlcqrcvxrv504wzmlak7fhc584ty6dcobor0xsawynqhdz0jjbb18vwbtyxtqkbvkrax8a1uvxdc94now5tk8mymp0wikqcpbprhftl06lpnrop2bfz1v28x7srhrlbj8rnw31ffn638',
                sort: 130342,
                administrativeAreaLevel1: 'l0pr4n2gogmnvfjslvkzif6hpv1flcojrzg473fvhrsatu034t',
                administrativeAreaLevel2: 'ly10o6fa9bg9nwbihvlqaxrcb61bz9n6bntp6wjhccrjdd6ehk',
                administrativeAreaLevel3: 'vs4xzyemq648co7ue4f1c9egvznr6dctt7zu7rb1grhpx6nv8b',
                administrativeAreas: { "foo" : "bar" },
                latitude: 114.76,
                longitude: 919.85,
                zoom: 86,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: 'bf8ahd0krcbzji8may2d810cvnnazsx4jr3r0',
                iso3166Alpha2: '9u',
                iso3166Alpha3: 'p3o',
                iso3166Numeric: '8tn',
                customCode: 'tipsinn70f',
                prefix: 'kzhzu',
                name: 'vg93hsanrl0kjpwdx1nak9jc22a6ktlp8mpm8c4tpzv7hdg6fy3skqly89840p88sfxjhwsrhrbrzs4e44smjgzfm56p45xldbpuk82sxwvzsl33jdakefbv064bwo4vxquaprkur3hthb16bmxc3fer13vmw9k173ewxlj9kvw1kgfng4493d4lci17zkkllfxomopfo7y87d9fg2i60u5l7qgses4tqqh4a352bfhe25610zw8j2rb76fnngd',
                slug: '6n70iarf5ahgc1mdjngyyrd1g9dzyxv0gsgrm1khkjnhm12c7vpq6ey6n1bp927sayh04sheoh0vcznxeut5xeschpep3b5n34c5xwxef19grvv7mttjvw6tan6obm74884izmylf78r6ctvnch86898g4fdxyzgvadtkf8z9sxgo7y3m4evndsji3kvzt9rxpjg82tm7sfcivy2wy31ljs3h1milzz6bfo49pm75tlyl6csmpm502m872kaztluqagg2wpu54o92g2p9ou1mp2kycli25clbmn8tz6yyppech115e6f8uswhj4va4ko1rwe3s3q1a9aq1aefvwxp0lwjp3nvhrgk80ffru24rtzm61qkq5dbpzfe0jtje3t9shk81g5u8hkwl8ckbu8p66djnuhyctr0oplu0r5xvc2zvn05mlip6afs6w9s6b9qx1gjzmzwdu3yfrgbzl9zf45j2hnacy8d62vnut0wu026lwkthqcjqxqkuxmm7gg6fb8se0j7pngalqhk8nlqmn81tmtheg5rbatj86gv9k01qrjmvn4f7vev80iqy7thoxvstsa7fefr3w00jymu4nil3i9tpr2g2lv1376544rq6ybchihwnl5xd83vgvoj2eg05x9xg4an9lgoivxiuucgy9vnok52usvfmibgy72c0qm40qehtgc0njf5nlbg69lf3i7wd8ki75rae3fnszow64fte2kw45vycywku4z85cc8t5pszvxr531101822hgzb93b5xpbg6302drksygild2u64yqj8vqrk1n7b4cxnvmrqx6w4fyignq4220mw6fxv7icpdo4h71rz79cfsnc9hgdua4wesypo0arfyspc7bpzxnp86w243jg5azl5xb90n691rh1mgo1ps6ujobdrl3zfcc345x952fet0y65d1o3o7mowx1ppkyulenzkre6d1981wgm59fu4418ajquaa1mebsonekhe8exb0lqp916fblc1dxw5ykba',
                image: 'hm2rirxvxczuhgbasbtbjdv6ylm8hbpiemvprubwd8qwzw9eax09gbo61qy7blfgea77kjn91j1yxkl45aqn024covkd88qznejxjy223a2plvoiut2hfqclfriv7c3zk27q0fkmbd62wh1cat1303b1h1kfwgsfat2wbo47er3dxqwp4lgnbjwlwt2mjpr3ggei86qx9lxqr3ocn2mn03vsdjlw7abzal2fhk0ch5acomzqgu9jnzx9xl8hnb2iwomusqdfh1cla86dfldagqnrrjeh0nhcddu7t1a09xn8da2divzau27h0mgekhzk6qpgjhljubpoiqpi21kyi91xaw9i45k049q5hzssruaxya3qtp1xylixjg3su69buef8mih7u42jbptr39qyf2fkf2r5ncyl3y35fu1ajikztsnqy08yfurrh95ures51e8dzrtrq6bkhwg02fprfvph24ei8b9905g2jgvoocaw648twy1w71reqrdfn0liczzlgoeaqpvkm60i0x1y3pg7zc9391bgvfdf7jex1vf7lyw3vk8uh7gcmqrrp2l4leopritkwxrdkpfyqsyjkx349o96u3gyrfujy2dzzcou12l8xi6f34h0gendmxt0yvxnlpnc0lp5483rac47s5dy3g5fdey6u5p3pkvacle2gzrq5nfv9fjkroqfveeoemhrreyoxu3krs4ad8n7bo5ikskea7j3br0xzec0ehv543g2g2cbicvr5uoksliywgqnv55epnvnh28q4qtzapw50tfr0ev7ev32bdmgpk913hf4si5zl0t2hmdh8oks3pn966yanno7mcy47fhd8aez97nk5gw447dqt2k2dtqvy8t8ph09hr7oksfbodubwwmj6jdrq5doqvtx3f9qvo8szhrz2lu43kzinx6y6lsn43fxb2ghqi530zpz898mysmygff4qs1960xw010dq8rd3lim4sbif2bece8q444kydj5xwv04v5mxas0o2s0',
                sort: 596115,
                administrativeAreaLevel1: 'thb0zpbgqs9x5976e3e1m1karqx40whd4jpz7jkde6me6mw2bf',
                administrativeAreaLevel2: 'igbmq7oa4ho3u6p616n8oimbasqm693jdwf4hulo8fme9r8pt7',
                administrativeAreaLevel3: '41wq0onakuah6jt91ow1khhkmuw4gr06m2tobkytm18fq0gz3r',
                administrativeAreas: { "foo" : "bar" },
                latitude: 951.06,
                longitude: 480.63,
                zoom: 60,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'r1k',
                iso3166Alpha3: 'oyr',
                iso3166Numeric: 'dp9',
                customCode: 'a13gs0scuw',
                prefix: 'dlz6z',
                name: 'eifywvjksewponw0yaobm9dspb2eeqla3m78l78kbhwwbh3xgjm3pzdhwvqez1mvup9gp66li72h0hk0bch50nq4hy2yh5fsivygzvhbuini2jr37mt4289pf9pr3jxmdyy4jwdplhgpyt68ngl95pu82cdpki6ha0v00wiq4xo45jmsirb9p9ewotf3s3glhhrwasrbp1hf54izjjlu0ub2r2iosgt5vaq1qmj8kb1syeiacukziqiwa05r12w',
                slug: 'co84nhb0p92hdjb0miazo18ikh2io3snps2j70th6jglcpot54ie2wm4jyn2ya5uy6fvuzo1nzkgpxd8dljo5i1bmvayjnkjo4uk0ljwzw4k7tk2n52de5vhm54tzdtza4httiu09znb62gkrhc9zzrbwhdkiplaur1lszoibhsf8ggstk5ptouo3b8u6vihnvb3dx3fo7vr1tln880tppk6e5miq2r56t64m2wob93uokl8kvu31m0ca9co6o5xnsjqo56xl4jnf468zrf2zx90xwkjlutirmx24j09iy1ipoijtyqtqczefe258mrl5cp6f9ezuvx7xvca87k7hyt1wd2uffa2yu2nxqm50ww85nb5amahaqrz2quob3yg7cy99zfh560ffmn5b0ez3aidt9b2j5zfzhgmub75qwiz96uyx9p5yf2xfq5rkxjia7h3j0a78b27uveco2fli42drn8ifskxnrfwkjqqr03ixoa0b5og8lt6chakdold6pkil50mvtmnpietj8nic7k7fqmft2788xsix4fpp6cf6ghjjyr6ylq5lwb8wb74d3qeazypinpona2zw80irq3qg2yex6tpkzomidkn9fljg9tlnuuw2x4qyhc9kh9s081p9f6w5sylpnstl2z2tpulut4stoefryer2l23s0o9m096cl2gqv87zl94e5tkzduonxxnqf0jrzngcuwfofy6rkf061i24zjwoidvwedye9wdbaedoaq926cpo8v5k6wy9h0ch26qysl4nxi8hma5amtk58salzrw4y8nof0ezygas7ttamq6qjuzgflhqp2d5xwfipbrdgroyfuubsktvel1vvmlatkojj0i4bfnvc2wv7oai59k1757itsyxg730n9fgrqycsp3fa53kxmiggi4u044lsainic5qaky03tjewsdlcoasjp9245dtovpdtofyo8ewrylmhbbij5nh04mgw2boamj5bld5rdcv660fdlod404mjx4c487',
                image: 'tl1zj3an6151d7qzca3mu1c3df2xcop5okyril0exdv1fvznau98jil6g3x1naiopyaxu6tbjy5iwo0nk6kxwdyn4yqnyz1p7nsm3alt88yycxy7vu91ra5vjfqvk1j3jmoasurj7hyzelwxl4zqrypexa78pg4rt49zwgiwk514lw432ojowsf6xx8rbq0w8kgoo8qw4udq6a53wlm36ooc72lzh0x2pomc96bvmainsziaokq9uxf22em7z9atcelm9795rh5q4jnc6tq3iu3swoaiob25u3qxgfjsxs8i6l1cazuevo26qjwkli2jxzrll2o23m4p2iyp2qkgb5fjh0n2ocdt7w8h377j0rx8cmiverek9pnfykriwoaojkjszcd4k83nj9lhpup8y1z6nrdtouqfvah6q77lo0axoj3ds8zvasp7wyzcj6iw3sp4gatcmaqat6d0b2c6zh428iquhxs3fnz0ay1d060oba2p4z4fxweswe91rdku3666tqud02cuzcj1zk539m685sky76yjan4h5ocect9eadspu6kfb01rd1s40xd78o9up8aspyosnhbr45l12emt72xlrj4l8ddilxuhlmil2e1ypdicc0ublt8p81wfglnorg3tw8ove9ocmfigrx6lbkegs1kojj1pp848mrc7051fnckvnbwnxc8i9jvcdy6py8uxu7cli2l0hranm15vfqcoeuuo0bfhtk5nhhogfy4zgqxhegnyqfail7dp24hhl58wqdp6ywx197o8rxwkpeop874r3lco704ndkfum8gggtz885vjk9mq51aucn34gmuh2v15ibhcajbs17by57owk04tklul1en93k78h7zguke7t5vshbdksrbna2bi6qwf6lj571u19ka7cktgsy6z4o00i1hw2aztc2yt6djxa31ayonxpxjnvramyzl700uc62zkd4q4p7zxj1x6l9fv8cm5n7sr66uqbh8ozcpmeshg8s1gsqstdm93',
                sort: 685565,
                administrativeAreaLevel1: 'kgu1w1ovxx5eyykcmtzctl6lmic1zq9bzmkladiz2kxjtk4re7',
                administrativeAreaLevel2: 'p4q4nebcqmexsfvsd80f97mg1xitt3liwjb5hmmrxpcnl7zirv',
                administrativeAreaLevel3: 's45fmcj7527v3621tudt2i69icg718dgsmjbrjhx008710hm40',
                administrativeAreas: { "foo" : "bar" },
                latitude: 105.44,
                longitude: 815.82,
                zoom: 26,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'wd',
                iso3166Alpha3: 'hvi3',
                iso3166Numeric: 'wrt',
                customCode: 'nqxb167yfv',
                prefix: 'qjr89',
                name: '9foyxp62gzkhblx61vd9w90ymxuk3rc3fywfdq669nevbbj0kr8fv9bclubl6rdn5s7bql5p0l9rf5csmnw2equrkaxp511bqd7f78079bicv474tzkzd5z0amm8th7bmwop88v7tx6uulc5x4ggt02dkolhud2xkrawlc7k1955elqy7ogjbuspdasxjzpnhx6cd0s67bz8gx9oztd0s8kh71obgkf76i88xfm3qfldp0i04za3n360iqo405s',
                slug: '5ilbaxsbrn1gjvt3u3d845qxoomwz0vxsva4ejwy22g9s1cyy9l9q1we9hnv68nq48o46cja8t2jrgjz1u5nqk3yq1a4uuko8mvg88ttmhwvim6vqz7e1j2l3jn1dxdsob2h7etj9gbwpxkrjw1yak7y865dzetjkb7zfkgvyo3l1von9lxi4s2mu0ht9e67fz9vqjcf5i59k3qpv520tgan4ifes5wu26p9qk10a1qc02pbsdf86c2ah8323erhpepfb6ldmzh9hjdb5ta9xb9qwig8c5u4zcx7roj33tkdnlstij7nguj50jyvh1k0iyipc9i9whjikr0erzgjttolrk3yzwez9r00jsfelxiwcqv9wtlenaxf9h5d3f0jt4bn9m3chvlz9snjq6enr1w0zh490ynlo2qkls8n745yyylf0ulyrxzvlsepfbgjr6sqytbyjhzuaao3n9s7p8ek48ksbu0yev7g754jyqook9dfsnuelc8hmediy1y49trr4qjxaotdmg2mf5l1742wlfvr4ewktvhgwyfmbmxp92205rq4y86ldugkx9tepa6op3r8datxo71su24b2aspwvkmkjwuxgyhnq3699fojaxa1bmnja6b3a672ws76gex1fhci6zr437htejxd71zno05bgs5kj76pia8dwkpoz6s0hir6ul8sqlpc9buoroyjg5429pnih78pxwg9fcsaa2mvay2kmtmtifcismxubwa6kjo1bsluet8uenpt2uwsey12il661t59sgqc4b2cvjjw094lv43qjambbo2q3aal4sk2mxx76kees81pdkwjr7m6dwm5pnbii2fc0anmcv2ndeisje4i4w1z1awjszcus90sz79kk6euv3hzucxdpj71v2wfwdygwx6w9wnza0h60drf2njzwv55q4ajcol8a55jfvisl7wdntjow756mtlaap81n00f6dvnlqtjfy11aeoyn4ws8fulk03r5xefqrgd8vy2khsxlwt',
                image: 'iu6f1gg4qthlq9qrz1adw95nrejvnjli0vuz8eq3ec4rjylrfg2ebaqcof9stawgho872djsm4u62epo5pru9mwlt08qf9t7pkm9i42zc5a2w8riu1s0dds0sz8dg9an94zfywoseecuoijjbhtey14sw7wl51vkcofao1ylo054efm3l6kl73cgia1v7mgzzc8qulhatkn98oy7bix50zft54b7tpgqpbingv1ne0k1lu7er2hn4n244oewc87ngy0nuf1c5e03ngowumdk8yvjcnel506r4456u8afwihlcwngmbih3wtkrbbisj61tufrx905u9x8j87kfdwntmfve65pnrvg1f5oeyp14lnfuhgrgyazk3jivaeqzupm6h85gsez6f64utl5ve54ofz9p70u3dz3rpyu49f42vi50dsk0ee7ne8mijulacptucjgkugmsze00ndg8rknvzk2yhy6smn6d8swhm9w8mg9bi3pqbwk5anj0v3mnuwf58rttq8i44jek8hdwgsbkhtl030rikibmxzmsy84ldx5y0ftbo6zymmrtnt0wzz0sr4dafw0uwsy1qvfasio2ljs92l24ng7v05iow0j593cvkd9a0p6dgqpu2ro1ybo050twgnilpdgs1ilz0gwha4493r0tn6nbwlgpfnf8p5lg99wnscdz1146s35zfab4oml6s13ncv2vy7jodmbgmj9sa45olc28w7bqwq83xahj5j2d1ah4zep5tp3fa6tuw9vqs4l5m9occ316e905l9bq1k4qndp4v79p3pvuxhy0k944m88d7oez664m2a91hs91zi4gmmw1jpd43a62i48tk0zb9qou4r851txg1hr6cvanf2s87wtanhwbjtn9m7cyvb7ovl09mrmezh5p2uf65od026qt8b5e4k95azat97b8nio1h9bof4f363cw4vz6kj9dq7150whgf5k17rs05ugd8w4eesbf9cpygx453ny4d901kiqvc2881dp',
                sort: 455806,
                administrativeAreaLevel1: 'ki8l829gekw5s9k8jlzbqwkzq3p9rirfjjdrnj7c7anpvvce1t',
                administrativeAreaLevel2: '0xnst4w6v8omd35dsclpdt829j6vj3xj7kct7fqs9ip04tyo0f',
                administrativeAreaLevel3: 'u1yreyw84kudezidtqj9ebb9aasrv520mbcewz1ybj0y5lhie5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 764.19,
                longitude: 41.59,
                zoom: 62,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'b2',
                iso3166Alpha3: '6to',
                iso3166Numeric: 'f0m1',
                customCode: 'vung6ub05t',
                prefix: '5lgrp',
                name: 'y8ldr3rb6hchuvthxtyox0oygyq4jagaf7gzg6kgg7r92ws6bxj8vw2qzsi0rs4p2bv0yz6450ks8je3imyd7fyni5preet1q41zkxlmo5256lmnoto0ly1kw36j2immmpqujydxzezanga48y1jvwepvzspwnlghj1mw0ee9js77mc429jn2tl02ti18jczg1a3q4uw6fzeevj04786ss67t6t770tc8papebvhyupegkxk6adu4891oji59fl',
                slug: 'ja420cpmxrhtgbm4pbdtjgugm4aa4huqvu1xdetzvso4l8897zdz1xmn6xm5w667qmii24e485nnsj7694nasdjj0bpgsqqldfoj726hwavejiu8f4yw7l4zboy4sfnjf4m6b8pa5s1g2ve2qaaqw0kqxx2h0bw1i2k651at8wvh3f6ol2kl5tfbfa90tfnpaocxhjdzckciwpnd83whwwn9v79111rvkf6y9cgu3klp7ny5u8gcbltgmk1ow42pkkfw2iec1nlhby5f7mqmu9p4uvvpzb3yhz85q64izmtsawukt8yxgj9ncitcmct1941n5m0mfnwjwxmdaisnmmbsj0bhmxer4h1cbehcxu6ho78pj3m7e0nxyjx0s9g620xy1hikhvbmx52iaaiflpx9o4hpwozn18ijwdz9g1kr8k9zk3rgacdt0i3vcdp5tq8pcm8464j4y4pp6pcihpvjpbgbkf5zs9bjm3ae4akkw98qxhayyyo7qvwjggqit6mnxmuu6t3okaot7nr015oelr3t3j2b9sbii5vfvnozv2i1x4qqqacu2mmbjrpmt31b5vng5bbt57qa28vnrip6hg3xmo7c6m7o4r4u2mxp5a9rsac101wrvdr666vokfyphzj8tsln52gjuj2m91cgk383dkf9qzi3hlnp01g74qfj8zfu2bt9clnll2s11khufdklho67zbfbppmoz4o9lek2ckmmanj8vxsjpzqg1yll89dg9v8klr7bdu29kgtqujz5bia74u8h31xm8h55zm6osbbul856gz1t4y21ox57pda2afspi2qn8a4asyz0ywc743t8vodlyvm2s8e2c96r1m62539gfdk1k66hzch14ognib5x42t61ij0pohfir05vqm42wai3yatlp8pews3nmd53yscvya5udvm98wm8pzo06fhw17k76v6akb9s9zs21ig7irhoxutw3tkoepygu8f5cvn0ab8kolrpaneo3qdhtubmcx7ig18',
                image: '8zyljw5ijpwo13ljg8dmxtp79sromtw2cu0v1n21nb1hgoeirl1dshsvzsvjg7hh1svjwmk9g0yjwhivmgboic623hfieaz4e40bvlaitaya9n8i84bf9o3o0e5m1dxo65seo17v6zsxc9i7mohhnb9jktskw1t2mhep5waievbrqa48p3kh8fckgba7k69u4k1n5cjdns6nhwm9qkzra03zo14rz5biy5qsnd9bmy0lz6x0ipauvfc3kjia5rudneokgy722q07ljnvut72a5nzdv8dqjyfsae9padppnj0dscasbszcfvtbld5qxd9o48rchix20qkmvxgb6chf23yxx6p9uc2iiqarl7v16v3qd9s4nr6ww3tklykxg2nt4s78or1xypyoght1t38f68y4mlpcmei97z14ts2ouy01ersow5ofn1sz7mrpog8jip87qmff61se56c3r8fea3sjh40y4trf7alvez1100eo4bouiahufbdt674r21mdccvo95s6usqpzv598wmsaeaz7cn7fewjj2g7pvgvkr6gm4t82h7k3ct4ljhd6ibbtwnszfqfshlvj3u1f345sdv1u2q7l3m1zjxf42xmozsnhk9o8zv13et03g76aiwtb9q9llk3ice5owra5xjlv20ivskwzji39zyya2mc3advvkxqs1o4ol4673j3md0hy2qe07jq8gfkn0qucniqd1qbso9mmfx328swur5xlxkeuvsm8bgszssad9pkv6sa2k44on6zp25b0j8raucijoz83u6z7niuugavxd8jnril790q8yjwf8kjj3m4i7v9i2cyx13vhb371dyh3emx1dene88ws28cyejk0us2uhkr44icb2uafjq2vq873k9g9u5c1y07hlufu8vs01c4gwmb5b9xllr0or8ummnj09qtuy6v4njnlbyblufgsz9pwgp5jghll04c5nri4x5euft8r677tlbxag0yuaie80m5cf6gvqj1ij68u9v8w5p',
                sort: 161848,
                administrativeAreaLevel1: 'fn6vbclqn7lio0tr2irc70yl2ejfdgu29p642fgxwka8fi0ra1',
                administrativeAreaLevel2: 'mzk9vcb1s6zgnmkduwgf1xehc9lwxsnreaoh38f3qsjl79s3u7',
                administrativeAreaLevel3: 'uub1eky3vdvrkidvtmeb3vz0g694un5ov05ge3qtiwshlu8c46',
                administrativeAreas: { "foo" : "bar" },
                latitude: 496.93,
                longitude: 159.16,
                zoom: 84,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '9g',
                iso3166Alpha3: 'ia0',
                iso3166Numeric: 'wz9',
                customCode: 'jlrcrg5wn0b',
                prefix: 'zz361',
                name: 'zfb50htcesqryn5pfaq8bsp772a7khff6kmpv0xbfgl74ol8c4ugz32hye02jlgmaisf0rwjwxstr7mbrciq68ort682cqxobo2r6ftshv3uovuqfkorrs9pwvtswr7w6uhds51bmuphouhlw67anbj1p09o75klfcluxscs9tq5itjkodmcm9z3q3m91zmfw7ojojjgap53szpi247vpiko37zry3qjb9vnun4ijqg3ljuefi9gnlthht8s37p',
                slug: '0ba1hrbt8vc1zmy1o3l3y0a7ap1wu847nuygzz5rkbcllcbnf3nk4no7knu6k68yuvx8mg2e0sokp6sy9i73d9r0nxeleeppwfh0fttuz43i9pcmk8abmh159sx4rch7edq0uuz258r7wl4i46gg9h05zh1qqh5ydy4lj5qv9jhiwyrdeofn4ia5gavwf9n8q1ju4upf7tu0ruk8bwohv1486k4pvn9q5jce5m53k3y8zf58ge5zou926aqkch4pa1gd2uetp5w94y4qreeb825adra147iz96w6wzps06poa7d13xxmjerwsq70vb337wbi2l3n0lrzd4esibkxjjie4mowql8axzn8qw8guvml58mxjxponso27sb7p9ig51mbx9h89ycw0zu07c5tq4bf9o5s0g1qo6gcvf6go4c15rwwazpz8c4d358wirqi32imlx1j98do9ph0g3gkto8vaeiw360ixttpb3zgesa8qh4dulj15cyqxea56gtpx404bqvhr29wtvuuanozhzddjxlncwnxne29cnm21wu6h0na0pquc0sopixh2x7osp9srqm6jk1fnnvdslmgcd0184edwcmzvb9cgzm38xdrfbxsj6rd58szchsp9uyo7l6fvz1chlnz8vk19vq9b14gyq0ga9u4at4i9bjq2udqnagqqp6q6bubsyie8lkh5qw90btc4prs6whmc2yc86psj2sxs0sjy83wir5b5lzz39m4rkn5ovzpkxdguvqv6lw6z5szs3ceinoet014zm2s9y9kpmmglayc2muisg84bo1v1542hkumikkc0ddpsb5x3ozgrtbryqjgvicq0phev013psnjpmyrcv6wmvcfxcakj545jukritw9v0o8r4xm0mt4qgqwc4mm2mgi56srbuuhs0x9qol2g8orte3mj08dodcjlx5p1irteocvdiiqtkiuokujsl0uzflwbqdip6nxvkk2fht14xde91jq5m001hettalosagptuio',
                image: 'bmc2jlrk0uety7dvntreat6g0xc5z4v7p9xlabplxrzx4l2lcvtrdv5cjqfc9htxjse3l5osn5sh5h7qqa8swlx496pbiyjia4azsrj88wbq7ka0pdanq729lxbfw2au1531wjibldvg4kbiuovs5npj3571ssnppuvrqsi442vphjrr47yvisvekwyrybh0wfsej4om26hjinp5kyxmwdz26diwai0hur4f2fzvqgpa4t71uowix8x0rrqmgvgb5q4y0yoxgfk6psaq4bhknq0tgzcns2kmish63omcx5sik9slvwmyasqwi58hks74zmmy526n6f3i0de1n83trqsg9scyrigrtel4kjrc2bli10pddgva4xgc9jeug01g1rduyxog18550k7388uhs6typaxthektzi291qqbtesn4uj7d3cnlvs9onb5ma5gobw1czyoihkw12l8j5hogc1qwxwv4occqwc28oklrbom5pbcnnqjell0e9md3q08gc7geu4tod5f1gaaqb8jwyj3abzskwlfo98c9u6aiv3ydnpkrya8wfqxr5hb6zsi8yd4ubczg4iz2sxhhn38uuad765xfi3iib9f2i7h9jyfv2fkh4ooyqyhkq09mh962rzis0atq033wk9545z60r6hyjytc37anhljqpw31mowvw2nirjl4urbplz7vmmmnkw9s3dzy8qsec5duc18t2gj4gfbdmdyanx51gvtloflrloqsaqzxdk7x5zdh8m1a9mx9j6z7m8a6k3wqm5xor1xvjxbmqbx5cz1i8ohovessmn51pe0vjr4q0oe715t8owvrpf842y5izucikhzp95fw2zsyluxi9xijbta16shp0js5n2rzppca3tpw795o1tv6vdv8uzkp2u8mo3xpiljma2693zum7ihg6wdjn39yxq8g026j5l3i4emdxb9u19pf1bts2g3a9feb4flrwxhoeqcz9ccbbyln63e8pglbbqk71vfu34mll594cvy',
                sort: 720869,
                administrativeAreaLevel1: 'uwzpdmyq8nqpdecdepkwnox0fwkfgpx1kafpm6ysbkg9j96fys',
                administrativeAreaLevel2: 'qmhp75ft44t8shavjq7ak7noqvy7tcj8n914s12cfv4cfnlbls',
                administrativeAreaLevel3: 'rjr43esk1qblxjs64zbdozyv3l3712kwprutazwqkz2v3y97y4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 130.82,
                longitude: 733.45,
                zoom: 16,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'vn',
                iso3166Alpha3: 'wzr',
                iso3166Numeric: '8um',
                customCode: 'zmegl787o0',
                prefix: '1htli0',
                name: 'utqk64xqs6hzm5ei03e4syb8777zwnhv9fora4ctplm00vwrq1fln3ot86xuloun4yxxair1i4dzav5uzxu4uwq5txncuh6w449mfpab3aqi5wjfmfw8x6jifrkmbkwurgr20pg0tqpp3575z2gdk0bx82y4bqokpt7idy9x59lx9kc5ny8jfnh5spty9i5gjt66tl74833l7coirn1fhke4wrtdrwepxwqbtby91dh88pdwxymrrd12exv4tbr',
                slug: 'caaxnvv39pnczp5m5nbu322unln61jybr1cwa5k83nnajlufikz6erjzejqp1l4pzsz15swltnq2st52gnonozyaje54xgdjal15jy8bbm8ry4wyh4knodr1prcnybm8xkhl237hvr5t9oppe9vjj50y3znxxcig54d360srkkcmzqw4ii7q9q6oe76eho77ub0eai41kzxi9yn8dijahwenzdfkon1x9tv96rmu82mxlkpi4s9u1fiharzzkv0tshs9i4ik8expu8x6q7petxikwcaotyc602ejcybv4zobvdnwb8jn0v4m83usgkyv11w8lx69c3yzv4h5njs1j6v2jadndj0moguvohrusy07xuqn6uw0gfpudpwy2fwxsmndh36w0x0gu2qta2gljz3sd953hoxeuju5z2qs35z257h5c2lxfopp956f49bd3jxh4td3vmkkct5c81hkzm766owfyr0g910kkm9x8b4jjesgto0zfjcez01oyecj35x2a23snfdqyvhngpbw2k4aak2ac3cyo57rf0k1s1odm6gur2zuksn8gjgqjuoip4fye30vvdarxdgq9rj5ufzg3fe2t4lpxixi1475xwo05zwl7xmuy9fju5n351oxg1at2g04cof7ps345qb9zhrai41u4435i0nlmsv8iirva2w44a3oelxzkqemwv9pju2a3voqfh7ie41zq4y2lxkyvmf85m8tn8j8r7sdrhk7m1o6cltwvicyh1zw9l4d1eid7sdsskv99ewwmjlua902rqmbjyjtap78jjbpktkoaaf7i9q21zg7353rwt45yhmmwyzw7gt5zuh4l2g5dmuye25ppdbfrqshdv5aveluu71fq9d7ri8wda2vo65dn0mz9cizx5aohajm074cinezox5y5l3xk1q5zbk0vgiysrz4oysru1co6cb6j9xbm0xbmmkqzxbtm4n9x3cygoy5vwnlfim505vtg6zvms3y3lxkvhcntur1h0ggztcg',
                image: 'f4kdv7g0fumsx11iv1npcey058oe7p2tkrqjruidp000srxzsgs37rucgufx29neo519z54r0sg2whum6bv3c1839p1itv2w6b2gn15b6xilqp6eep5cnb16w0p3mcnrtzt4voqit71fs61fsaynm68xw09z6uu4218ma9vnr5bwiwpsntceeq3wmjgxsyim46b3lbe6paho0ym59pk2lh17s31q4a8q1y52aohxaxr6vmodznst9a5lez4ig858f2z8oopdq5pifcbv4qz59dqqzld43nngejw47dgcpf75ljjfxg296iz9d5tjkvtosibtze7r0y0vnmwaqq76jbma5byazfl4cru2mny0j9w5v0udpo1t2rj3xz748iowmah8hqfscy7bdhzxmv5wm8uhhunk0ey6qhffj77whjbzgikhnoi1k9s0rv8bl98lwr3hm826mnin83zrp6p4xde38zy56ytl0u18fjte1c85eux7zbeo72e8v7hvxwczqh50spd2gcnwz04q3krl96zk05q6wmesajv3t7omsu1gwep49gfnxr50rr9t09fv58gkome768nypuju82a4m40ocenvyl7mdbe41oxs4ew1s5q9bbhjxagevhkhbxbb4i3gsoolnm6h8zmvby085kkx8et1zpcwvhmndnpjcupmk7rhf0bxlose8qff5n1b07kisnolokzhpzrvhjx3llkdy61tqzmzf23barm9hkyyh2w3866fkun3kpitlhrc401efck70a5lkn43w1yt9ejinh25x7fknmy9ea2p5v084yl749ubb5ddpf3qq0hd4xzod2nwde7zs7y29pped6mwv2qi9urqr61ub654r4qn83dzb5qz4uvoht8lotbzmg2p2qe08mx1ap6d6nn5u9aiqgma3kyfvcgucii17wt7l12nqym9d48hfdeieg017xbvjbv27ekgcthm2a99xae6o7sji5rsdj24g37al8agvx7t6m85r3dw4n2b7tqq',
                sort: 274254,
                administrativeAreaLevel1: 'c3u7f9s2dbrxa18d4mdtpx2n1hcvfkbxvtev8minb5n9f4is42',
                administrativeAreaLevel2: 'co3bmv1ne2tvd83oob5b8cwlpal9iy66mf56cfa04p7u41pjn6',
                administrativeAreaLevel3: 'tdqoym0b2xzta7yr79msh2c2hra6myn1adidca2x8vfpyusxr5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 236.32,
                longitude: 5.01,
                zoom: 73,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '34',
                iso3166Alpha3: 'way',
                iso3166Numeric: 'n8u',
                customCode: 'drwwpgy6y4',
                prefix: 'xsrel',
                name: '3cyt7kmudec6n6jtptwp0zmbx1la2mg7gcczfnsr4h9zv2nejqnmj29kok1pvhzb9ylz3o3kilf99rrnr00sc8l9sa88qvhvaf66jfbvfrmhoht0lvm2mi3djfxeg1ax6vzv8q01rvmj8s8zn6el3yn5ak1b7v0934eovusbdki88h32rdz4zdz2gvoo5k929k9y9xck9kif8qqv78wjqcji2zlmijbtwqbktim0lxvfmm4j9us8i4c2opyr1ccg',
                slug: 'epsioh8bfpwwb1r96kpt8fs14dx2huxx0veja00kparffzkwovta5y1udo87kiv35cg6sxpzfo80243nmidctoi3mstr2krnjn0n505t5cok5y9e7h782ab4p57ypxvrh3njlm5d4tnzd93035leyxzk8o5rd8x4lgbbciyysl75fqwjemzgkmplc9qav37ags2kkxjnls6z40yoybjsze5cpm2dg1lc4s94yqacgnz1xmcxqy9uiyf1u2tjwqiux62wb8u2dmwdgyn1n80fb28ugv3u6ugfgjdh9czu450j2ckdtfdbk7qd86td9io25upa3wixokne5j1kej1oxh90d97scyohfw2c90fdy1ls4ruxbgfvojd52d6yrl8vvk5800ljzdbc6cv6gubz4mvq6kx94z4g6lqhtnvmqn8g17qqluyebincrvcpx36xncyliooiwh375s0zb3z9f0880wj5sm8ycvwk718vlvckvfhecug3o097skiyxv6zyb1q8ohiyyzyr8fekdv40meok9w2p7boaxhk7x5zcix9af9n6yuu3oancoe4z0yaynbbv3ewpekvyf707ospn82j0896w9awhbrprz1hq7bmubrumf86914515p2wpqjappk4p96i4dmkaw53fx55d92f0loukx4zk8gxb0rli83r13j8w5r6bst289jhpi5vb3menb1krvand3ru4jb5odwpus9glc42w79rdi1lxwsh9h169knbtdksf21zww89cdpbtjy6uc7dp4cq9raj9dj2qkdaqxpmjou8huxviquve0wqp5lh789oc9u6fntwqv3k6xvqailsqmj9q8wz98zts69doozm75ir5nfkrsidiej2pucjvh01aua3avvnbc9t4cgxw9n8cbgt5jfref7h5ajoor00vgfzffsoc6wp0djji14uj4eopysnalkswf20qudzfwv82cukysk27tfy06b8s1nqw0499oohk1yj7ghvz3y3l4ptwd87foa',
                image: 'xcqmnpmkuzpjbt22ld0z1jtj0krdyysbf4vy2rkq3j6uzapkxwr62sckhe76ohg72o5ohbl68qb6gbfyie5bt6ui6fec4zyuqabdfwxh7i65x6c139z79spjuf73uvoscz20g04036hkgmtw7d7gyrxqcwwzk2crhozkn1iki5m1a94amkfinbr53kmap1b6p1fft6nlg8cdwadd5pv4eaqcuo1fqlgxngu07lzlwtp2fruqscfj6y2ad33w04syov6gpyara3n53f6ag70l5y5bpchrou1fpc16fkinlui2jldr4hkrejn61gu2q5vxdfuvt4h2q6emicby0ny4tgnept6s6iiirl7gdj7gx8v217hxpbuebhb788gl5qp29bqe0xneayudl4vn16smnrk8ce12a5nul82w4lxf3j4wo3nm4j0kbax0v75mh69hacq0odzgn3nlbyx2ityyas9uci7xn052f4xed85428nahbl19aw8a0xssas8yxj789g7bg6wcx7htzakovl4lihf42131z5t1kak7aj9ex8p3dpqtz5d2wnemcdwoylyxvg5dl5wc8zz60wobgb83k5jejv8yf4q0if8z1vb0kp4uzqibeh4hclr0kqs6kscewk7rap4nr79jv0dvtojok21jk5l1m7taysv70prngtykyml6nlvbe3dfpedlsfvtvie0i4agyhp7y2w7bjzjdtj0j8lxdim442xrep5rjh2t3lsers8c3iml7t0fmkhcofgx3uftzf5xi7kmzbx8x0ejw4fael5arllp1k8a0lyhia6jwnu4863dlj10xnbhhycyiuyraainikvpps09j6cn99n4jtftm5pf1q1g4mbvfayn1p0wmnkarkiebmuwytro8urdsuhk44kw2f9rhvuw337ktwi1e5plzgcztocqjahsurdh9tpwl8yibjz7h2ow01pkjkkaja7eobc0wilp75oz8ztwgjjpfn4u62aw07dbiuf5x9saxratgpe',
                sort: 599359,
                administrativeAreaLevel1: 'qj54u2mp62jkc64f3u484zxizj4lt738ua9kr6g6aamo5stuv9',
                administrativeAreaLevel2: '1tx6t2f5mx41ta5baqb81ia7l8ab4lxficr13ebr2bxc3bzy5f',
                administrativeAreaLevel3: 'qdbot24u2mumatulp8kttoxgfh5q993en54ijofyvgo42dd8c2',
                administrativeAreas: { "foo" : "bar" },
                latitude: 217.51,
                longitude: 869.92,
                zoom: 14,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '9s',
                iso3166Alpha3: 'xes',
                iso3166Numeric: 'xxf',
                customCode: 'r544v8l5ob',
                prefix: '3q9ps',
                name: 'fyer194avnrmrl99c3e39cbvduwiy1ra1d6dwtg9mt495feyug0srly22krqbv73rbr2bj3452zmp70snowumcb8y7kawefplafpmtt6ulo1g4xm0yy3ao4xghb8f4jd64d85yrwoy6i020tafvapwo7pqe5346c59q2bgyukfn0v22v87cilyufkor31ag1646vg07yiivze9pyfg4wn8cvk20xz67tcyascaph091ad4nzhjh3gwfivtpdu1w',
                slug: '749yk49e9nn2l9bg7q2khmm2we8k2xvh856r78oak8ve95findk3h7s73eif4isqu9iqnijm73igqin42wy3db67j8hnq9q4lplyvp5gu6ejxuwg15of2pjuxbwu1ugjpo6bv7llbrzinoli8obkhhb3yfi4rrrr0gnkx7w8q03m4izvgc6xr37lka5u2gxepd9mjc2wa7w9gpjp2xhzvpeaet5h9cch3o6lk25xgrngckq4hn7vzw7wwfrd1fndaqn6vhcony6kfu0mfeki8ejp8hy3vdnbjcc3fedljzf54jq92i79oxoue0qseuxgxp9fsapxxut9d8ah0x5zgc6fgobjhecfgjz6foa5kkezf0iri5jnzb7z5ntorwggtoz17a1iksdfvkskswgnspr7w74tmkevsn2iy5z1jzd3iwr7ecjh45o0ot45zln4431jylbdmjo0jmazlrdmhqup82h151nqx9572yjmvc0irzfksj8rb85dka1g9f4bk4ss2ra61whu0n5dn5x1alxdfjew71m205urfhc2mwbx4pyodt48naiey30p8arvjfqy5ozszwm766xj1p7xtk9bx6rux02akcjxicawv3tdjhprn0tt6zlnsxjoqyua0nilb9q5523uwzcbmas5obo1ydtkrt4kyqw0vdr9dv4pmwtas5ye23h5zzoj1c9s7m80x98ih2da5r223g584btpq7mdjrug5t1i3w1yzj6h9t5qgjundmzzqpj36ndaozyd02jbuv3e1rrf4acad7emwzojj2ca0py6m46li85ed6uwo3gjgtrg6026iwbtovhsjq3m5asu9h38ky1ysr8drqjb1aw4h37qajwthe4r3zqysqr6n9z49omjjn5jchcvh47lvwzp0z7gil9sia5ivwmmegnm4z0bced7cb1yooyz7cdynee8k7pc546kuz1kcsatzxamqtu2vvx6538l9hvx5mkrkzjabqrf1x8qeykrbvric1knojjlhi8vm',
                image: 'jrez661is3zlozrgsokzmm81lm5wa32b4ba8uz1u3fvmvkksyd0gcv7p4u7muodi5v33p6z8t6wv0ny1267mvwouu9fd2ew7z990mgvhombfv70wt2patpzfzdsge2q5m52jnz5g9xbqp4kbc5c3scc7r4x9sfzi6xerzwm4ii4lbp4o6e3rpxb2j8msp2h8jsvq98vu98ni8t59jqa9vekwmvivsbg6929lwryupmgbo66k5x1kw3v95qq2rozycsji3jp33u7pr8vk94luq2vookwbdodsnj86ivtlpbjo0v0orivstgn48fs3z9bque40jg7rni0e1ygabdc2gdoz6bdc0ul8kqvkcmhvdohsln6olnk5w767evq45hhnnwmdvhkk352qb4dubbeddfwn5a9aiap4s5uvjrd1efzwwzg1b4xn8o48u1ujly36gfpwd64s0alnphg2svyjd2z98xe0ze3po3511stowgmwudo0ikd4qpgqb9n3hin5fmzpm7d35hpipaxsqb6nqwdw4cx3lx4hp1nezu06s5ye13o4jfn6oolqddqambg60vz3bno9avhztnickpfsodmpcm85tooy26nwyt9xepgfhwqg0j9yd8h12dpf4eihu3hp0t6jisxzidoz9owuy0tvet7a28fegff4diiynqwyo2mzhpf0epib3w52g0c5fh58emrpmv6pufcevw431q0o4bk6yeerewrsf39imqqkzz4fwf4b1qqxpt1u3axc1nyq2kcaqr62rmx5q1usnlu898cz2cdcgssoydrq3zkxfc04a0cnutsvgtgs484v7ajqbdh8msz0djc0cm8ryvqg73oo3xkgtyxxtdi6fasvfslyu5fkqf514j3a7ogor9jg7vz9i7f0h2oh6e7klly5xps96ws7q3m0cl56uufonbb1zbz56l6vxkpwa2pci5cdltxisvcpjn24c827rtj15q6dw6x9qsckgy9a3pl4npbf8v485jsw2tmpt2o7',
                sort: 303292,
                administrativeAreaLevel1: 'hbtgf8n2pw1p79dkzoltzkhm9v8dz8p2u6xk5pxll99yvrnbdt',
                administrativeAreaLevel2: '74v89zjyw8nsmjkmnm726gowe3l7rxtk9yc33h56fcepzv0fg2',
                administrativeAreaLevel3: 'yvjxtw87bg9scllnp5clgwv6p92pkhon8iu4dpmjh3somtj4d4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 974.08,
                longitude: 489.51,
                zoom: 78,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'mv',
                iso3166Alpha3: 'pwk',
                iso3166Numeric: 'phl',
                customCode: 'mz5pj9zj42',
                prefix: '9o4xp',
                name: 'ew9eor7mnokq184y3y460gms9cahr2qxxs10lc0famlwhffurmpx55hr9j7s6z5ki1p3teltwyaiqwqfjv4r79z8p6h2haw9joqjpq2m7ect3or8aqudgtzj8rfp49j0kyj5z4c3wqiurt7364nv1qv4a75v52907knycxlkpjmfr7htu54ltsq74tfizgfa7ol9gbcgidvbrwc0ud8w0vzh8e3mzczcrssepav38wesjgytym9nh9kv9rg6k2a',
                slug: 'i02r57vkzm3uvs3kdg1zwm1tz1m3b277pujsw3jkd2fvxixi11c7xko0pi4e4fsqih86jf5e7yk5yvp1c3ahnjuqef6r7hrg8wuv7ccw51wyyo1sdn9ezltj0fkyul6pw1k2qviqjgnwiaz0fg7lk82ek1mo2v1e92hc2ytjtuze377krisgzjmnr69dadjqpowl1mfi5h7igb4kovk9jrtw5gi93rzbfl648vdbhpsu2o7lq3lqu468b4ketl8xaps3ehixm7bkreab8pqe44sm4zuq8w7d26fl5n7so8dsv9dbuahzf4z9webjk8xpwhg7scamc71yxyenfpli3n7u8epispibtey6cxemeo1uthul1jiusrnw0qo2xbiy1wyst7tqcj1yydt2qafhfcnzch613kdxhwbgnddps9fc1c2eyyemmcpx5xyh23gqtkbhmxehgn08xkwwfmyg03cxrydkahvpy2qvfk5t7y56qngvtdny8c3vl3vwe1afgk3uvnr0z9pr0lap4epphcmx7gswu66biyl1w319369yyv6vipnmghiuyr2iavndqfev0ooa8lg6wg75a998sya5u9141c3ha3x4nmku0jjinuvmjs4lf8dkm4vwzgmtl07ij1dgk7k9desy3ess07b674egdsuqh59d4gqiunga8s0dmqqswc1gtibf15u1y6klujcdkoj1uqy6f0ie2ln1nfsy6gsegnrueog9fz5ttqkk1cektjm7urjx8as9mfh8vw999rvwdu40bqkx64isd4278umaru2t8pjhds5sbf4b2kpxii7ivtzo1opb54weo89q5d9epia1n71kjvknqrza1clfkxo0ydo3r2bjkuzj6jwden67ntoh05841jtsdw2jgevzautxt1pgpgk2q8o4tb9jiqop5o71824s32c6e60zfjn7e1zj7ouwn5sm3proq911h1l8juv9fka7puege3si6zu9kfpl6jzcf4uwrpoj8sf2949rb4sn',
                image: 'u1oa40n8515rfggrejidmxmjng02padm3zuh12y2ecqtpyrg1flp7sarq1iuun4o864m4el7o2airz5iumkvvu3l31i3893696uu4mx8qtltkw2jk65whphpjp9aabpd2d32iij7pinyzs97vh2jfnsr71qpvivsc10m56s386274sl9s7gjpapj7m37btbheqatrzzla8iqx8dof7iqxo7dz8lf3f113ab3kqr6shv82uvmj537clocq79tvn5xm5pswjkujft9v2l4oo26il5mo03tocackyffp4qjbaq3yhv45n0igp3cojuswji8u3o1axn9pkd6anavxnw3xutxp0e94bkkfaueyo5lhkt506zcjvwo01lqgzx9w8hguavyan63wpkzx00f6gq402wbmij6uqwjb1cd9ro3xju4ev4f8vfvp46frqrj5jjnvsahycf36ok6ses3we8x8jp1facrfzjccrq7zsehkrgvzrfd7vky44q7jhsy1x6s62er5ajssp05nmhq7pnrq9vp2eqyheod2w47w7jh1lwmdeskyw21jmy59bv51k3fpvdr69ectxnczakljo3jdopdytlieqja0tcyzmwa8gwp4tsswh45lkpsvmrdrq0m9z5xjjdif6dqb3b0zuugo4bupum4f8a9e395a8rzcfalkg2c21loj1csrg6vzvualj75rc4qodby7e2gs8u5e5bbihntghlchdt9qb4nu1izhq2w597bite6qsbxhmlir4987oppwwtnowxol4bhyezuu2t41z8pra3rilkzc3qh4w9ezs3sqpj1qjr5a9i8a7tpv8ldhve1hrk9mjjkr1y0g9opn8oklvbghb6if9tfkvmnku0teucjksszoe6jggdavdy70fsjj0qq1lahv9lhhgubo61gy6kuqjvnj016hhq4va39vwln2pzw5rkb2osw4d0vtkrfvbgdode5vv8bndmtm2fcztlppi4jeu8zx4c8vd9inn486gc3a1unk',
                sort: 372074,
                administrativeAreaLevel1: 'xlkccu2cx43o3f3o1lhqj0fm2vb3juzmkmko9tr2sho9323whk',
                administrativeAreaLevel2: '7hq4c3cvn96t8lvu73zexfldb6vvenflsis21jgg86gow54s40',
                administrativeAreaLevel3: '99c6elecbt8rob7shi3rywh24gi4im7uug8ouvebwu7x46hqh8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 763.28,
                longitude: 474.41,
                zoom: 70,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'ir',
                iso3166Alpha3: 'kwd',
                iso3166Numeric: 'hv2',
                customCode: '8knwzsbggx',
                prefix: 'bzx4t',
                name: 'rhg2a3p3nhvk91n7zehfruocmr96sq8odbk8sktrj6mqbmpqouu65lximebk54vuz87nj2gm6b5melbc4tasa7zb86c2gi0tb86bq1kwuh71wqth4okuwuhmycqzo9b23dinlxaemz5zt2n2eb12jfdl06ohmovcckwwtpy01fb673x6haqo9f7ck2wy26dopn7qowj38unfarnlmzt72nxwe3936fkod8c35ameg4m4fyzyktktgld7xc3fqz6',
                slug: '1r9kvh5i2ca62wlsuvf9i0zkgp3sp6xv3204469c8c32maw1tcomwj2hrl8wqkd305bnh80s7r6bs6rwgcgmpalnc83thccd0t3mcwyme22lueu2p7zoa5j1tfyw8x8mlm1i6n2mar88i3onaz2vpi4wsuhp0kg059gf5yk39rrvjokfe87up3ajp05ih7vk8ey7a253nvnnnwulv4q74poc7vk71sefihtxskykhwko4a46m4nhvxypzqpzqh9h3obud35z7bcodjn1h4kvx2axjy403ztnzxjn9glhjm3oby2sbmcticj6mck2tik7d6jk6y24uzsjnnvcupxb5zy7eo1fp1ex7v2943fx8dlo8e3cid4jm2pmhpxnbyvvtwc3tylg9o0jnguedb209rj0vmdyu9dw8jvko71wkmryjc95trtmndft5eytxvo47101miun9t1osmvwcfca7bu12ldef754501asfimh2jiwrc0jyj27y4yxm903gavhgwzyiqve6b5da1lb0y3i7unuc2vy06pz5olpdfoynvc3lti2djn8yo5mt70qerebj4kw9iyhg0y86ppi8lo26sdb1xw96nu0bl122lprrxxc53xx3y62c93nqmt2ztpnannnu8y8ydwccbzlmscqoymv0d1zoinlqarvif7nxsud07awx7kqikdn7l4jnzsd8ugz0ko3tzw4tzsf25qf0foj4hqnxlr6tk3mk6wixjmsnhbe1psh6nojsyjazq3ieu18ezpgrbeuhc3grymdqgc4qyxlj2pvt9qpcycdn4o6g2fw1pptj7ymizf9a3dvq9lz6b56fmoj932ilpue11yekccep3n5nayqr7t1u2lhe9crkie8osehv6n77tbf6uhgqh3apbvuro0ls789p9c99djs2bql5ywhlwdd2741oy5qq6w0budm34pw9q5rjo9otvncxibfr3zn5eux6ng2zmmzmc49ab6seq19k4z6a5tel9s6cm70fjwja5z',
                image: '5wuklli1av8g0yafnbxznbmuytow4jfpx7mdwedtb3qv8lo2qswhux85vskgiefge70459hrswodg9b6299y8ulp84r860d6omsyslnsdnhtfrajtlfjaadg53kr59ug2fo9ie1ucazwden2q5rf8o380xmux1739mikqbjr1577s3qc9axrmyhbxzpg3r4wa5n4pu4kwfcroz52su89esu09g1nldz1kcm8e8lgxlj3syl2ithjacjoodtq08bi125xc5zjjz1s8v42wlk1lv7koql4etv4xq5p95gwo4zoje72zhh03jun5hw5bz1085fe4buxd9p0ffvn5xqg063i5owxe5hv8ai9694swbw82g6umv02wthwmiiilex0c31e8r3y8xpezigpsm5e47wp8c6axbmfln8pf7ec4ofnfrnl1lx8rewq2uzo9vrlml97s5z4t9ucv0kipi665am7dcvm04v74hqedaudlxc40er5jhlaof6qhlcx2vtx86byoksiee7stj95teuiplhtplw7ge8rd37gzsgz99ya97r32qw563k3859hblqtx7z8pj580icjmng8tqbvxa1uy6umbah51jf0t5fnmzg499v76odncjo1x5lkrxxtp2uw8zz8mj1uk7kca06lrjj5umk73y0oo5arwsy6j0y6gaym2sn48vnyv3l47ia6f08ng2cogp4yidoy5a2n85u15rhdff3rzxxydafl12qdxz1aabcn548lfe33ht383v1g3j3iwxd4uikye3hvy4750g19gpald2k5zon0jmxkyro0avp9ljmry9xkvoz5z5zdib62isvgd5qcfzg6f6feejevhnbk2qcuvgruus2mxethkib3zeq497hkj7s5nc0jkpwvmxmbhshwv0glch3y8z6nlz19yjmps08cdrkedt00et7pncrte0eq6kgeyvqkz46u0ewnsws7ke1t9vz86ad68n2b186m06ppsvgt6q3iytoctceymr6aveih',
                sort: 4153165,
                administrativeAreaLevel1: 'pn396j5mqfcht97qaytda5p63tjt0fuwdg6dq4es34fujwud59',
                administrativeAreaLevel2: 'z9j48wf9wzhnh56cv6x4shv3e1gwvk0kxd59ryb91eyprptz7h',
                administrativeAreaLevel3: 'dtzeijzqb7xb0gwhnbe328zuidjf7pk47kl25joztbrreavr32',
                administrativeAreas: { "foo" : "bar" },
                latitude: 160.14,
                longitude: 583.64,
                zoom: 43,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'q8',
                iso3166Alpha3: 'og4',
                iso3166Numeric: 'xyd',
                customCode: 'oekh9ccv8j',
                prefix: 'g5nfm',
                name: '6q5glkdx8qat13262i3czk624i6878bqe65b9idwvxgpmche99hz0sd4r7r8rwra92eqmwwwjutr0z7bc7vhu7xuhvs6jybhbp2j9w1a6oee6y88ue21yvffc6s8uwvoi5t1wbyvzue197x0mr5x6mfh0kmuuignfbcrnhazgh7w7s3sazeq5cqhlaiz7e13xi2dhp2qeo50okelzafv0c86288z51z7afeppb0fp19xca6icgg7kgpsyybh4xm',
                slug: '6rwtysr9hcqe9j4vhsu5rdzkmbdipl2xhb67dfp40cyultitvo1dru0nsedt4ok783h42l04rx2a68mgy345ttuvwt4o8si8zsm63p5nuwxiz46jn1fwhz1ub2axpszpo39zu1vft6xpw387tw1ye52sw99ash296390btiu1l1sidab8b8u0jg6xeipb8i834uebj80pzheefcyhwcy4qlipynjx9dpzcrblpr24xcln5cn6r6pkl7yibtmwqkzaev8wfiyf4hdcy77vh5lrtlndu7q6vrvdyb7m3cu2rer05uqxe7ox5ssmzy2i8pzcaocvgmj9ml1as9bagb0n0r6tk44ekiy606fe0hfpitgq2m5igwabdxylt3sdhh91ggwf515w7khbw5plsbqbviwv2tgr5lraeadqxjd730qcuvjskfddhggl4b0191cc1xwyxv3cxkv24exukfxsczkxp87824xee5hpl50xfbpuqiq9ipldufbvv53u31iomomjcjg7l1wk6xwoexr4kh5jn8vhpk063ycnkyh9a5tx4ljkm2lzu183hjf0h6zm6fbsi3na8jz40b4qkv7th540i4qynww5kbhklnxvvxrogke81yoqkrzi5gqqsgsgoqnizixloe5jf4kzy25wj31mdvsesuy5myf5h4st0ddz93madfxb4yyzc1x2wbydilji5wwg6nfgx8nqkn03b53z8m1sarzah6c13bf2ykn7bp50r60giq67rd97a3ov803a5elnnmo1wirgxd8370r4ocg2wbhllok2zh2eu2nbhgx23w8ptzr084bhhu1xc1ce7elh4g2zl6mhvca4v4qngy24m40bxpstpu7od0g47p6c1mlwaonu3a1otp4j50bvqbclq4nc6h40o5e29h20dz3tyzxu6byea8jkclx9m97dwyu2hb89cb195kvy3w137fqgzfnmb1gnmh7o0trx5lz3r45aia212drtinfj2v22q3e2wlaz2z8d5gs',
                image: 'jd7d51b5vbai2466mqbavpfwgvj9gc57nsznmx2pg2omj1t1s1zuhp9lbl7u930mf5gbju1bxh8uz8xemsd0kjd213x3tmiezoud4fjribgroxg37owy83rzdhvb4zvxa2dmg1dhi9wyxvklrs3qeyp8q5y2vyu5nryg4lt9zvl9fxkn99p3ys19cxxi1gv2kp71og19sgvq64upoww1kam2sqv2niu0z55ny41hln2hlrchj3l3zht6qsjoz90u69armyo94gvobrfziqsfhrii8yp1hf6dikrwibgr4vi9qrpujwte5yg7no9st3qmarom9tirzhca3jrkp7ts7gzqmo8uuiyzmfwm4luke61zb46fvzhpnnyjbr65naypzq5cjft9ykhyf6otwmxqhn4u2hnsr6qzyhch2nvgajnh9wkpxrbyuzy0ste7x3it7y1ciwf67xo2a0vpiu7ff8bvthxau3nmdu1imriz9xzjuuzbzb8eoq0oee72jjwxw5pzd4dgek0mnnvl03tr549nnfu1aizu1bgetqcqwef67muox3getsdd4kqr1eoqq5djo2g8p7requbuke53iozsh3dnzf9f59ddpeh3silcogzhl3jsfnfzaq9q6twbxbs97qrwwdwwjsavf308ok6mhht4r7zm93earkfiecrxdm4yvqncrd1tenqarx6rvah9hh1uv45ecjzlbq934l8s038mewxjbzv55j2yf83uy0fxaa9hf6q997xjv1e9s739eh42f4p4kx9jpuykdl925fe9rbn0aicik39jq70jyzxx8zqo7asr0prnofrnv9o9207ig1l4hwzhecm65xhgchzfj55jn897al0cxh13tih1a5adtskk5pw51ghb7i93qy5ik5icnkwcaxf6wwlss16c8r2ehencx98aolc3jvcn2yfbl8shot0itgunrqdzlbtajgy29wfykpflj5bkceeawd93c138j0zurbkqmzknmt1l29zbkdjjvao4',
                sort: 766006,
                administrativeAreaLevel1: '01l4b4iutmzvr9zvnapz7uh857povxpg2tj4a00oun455toivvh',
                administrativeAreaLevel2: '07jf7rlbm0dtfun10avg5rzwldmoq6om5gyf1jqmut5o5bflwa',
                administrativeAreaLevel3: '5uenirafr353fjcd0yv9x203zo32st72m06lrawfoldhn3zx18',
                administrativeAreas: { "foo" : "bar" },
                latitude: 271.28,
                longitude: 582.06,
                zoom: 38,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: '0o',
                iso3166Alpha3: 's5s',
                iso3166Numeric: 'qpv',
                customCode: 'yfa7hsa0oa',
                prefix: 'utzy7',
                name: 'cr3v5bu66ki9e0zs8lxeirf8z28pjlvps3yrhbyf6miyc6rdq1j35vv1nboe5nwt6smw2o0xub4c4qvct5s167110pjslg39tfi2z6k8gdh211ft5wh2r5yf4sox1w99n8vfhvikmf1kd7xh3u2m7u7qm9r5mn2ufrlhv8j35uvdf4wvaxdh36bwrrfcvdhivyz7cul3w04b6jdno5i84jp01n7pvl1jizmzg3paga19x3qmdw6k9157qgbr68j',
                slug: 'ic3wkqxbnkc4q9t1dnbxaw8vyycvv4tqo0ez19rnvgk86chd2b8xire5f3ab10gv10lhbjfxadwesx5ck0ne9evgifu68tl0p6wd3xqc4wiz3yz086uugtqdmvyjui8e26ofkkhmnwm9kqbcfv5jkh67rfeg2vkk3o7qp156kgxdp8ysmx1m7mksaxpvpumag8ioefsuuv5hv4t40qa3psotk1dozfkrv7dfnkosc068r472nyvcieqqqqigi3jcf1gj5d0ix4mmvsbe0jgvedwl19f9qdms6cwqpks25xt5wt5uv35ll9knefangnt70bat2vvkrkj2ad86yl5dd9uu4fgz1hwn74ah7in97bdzv8q8axtzqew0ymiptbec3ymv8ag0uaees42gna9r6nlofsgy7ra0wbv2tqqhg5n3ywtaebtelqzhp92joo8z6t2rj5szlp4bg55uw56cnepiwdo5c5zzkwi7uugg81smqcwim43zhqho3vqkh0moo9psaeg13rk7h6438g5ckg8kcms0quqpci9ipb4gbcrof3u2cwt2elbv2g2yjzozjqptfm3didrw8p0aa1wdwzmkfga8lmpil1its55ovp1exdfcqvch0gowhwrcm6nfd82m4wm5zsdxmxtlwaf9c06o1ghhpd6n3n5sif0ikjsaojfko4fi0qmlzlz39zejjxghl61r0x3z86a48zj73t1ea0dj6fqfq3dg3ads907dizjc0obh0ntstwsh5ougdiyh2jbsqox8jssqi4c5zc73waalgkc1htyhpug5tkfcdoe4rgge8x1bn5u08rf78pa6o0xu4cz6axj5xe0ithjrmqiot2lsb6djobubpk98jk8wvyohcu2ueejiuhv7vk2blrxzylw3e4u1as93t1w0s14zm7rlf7aztgretvf44sm554niy97x0qfx4a8rpedufs20xz3td3wnsry8pkhwqy1txgm2rcm7jnfv8e9j759hdtteboi2mqqv38x0',
                image: 't9x3yubqpbnt7knuiwcaqnxuw2jyfgl3l1qi9xzdwnbgyenmn8ys2jn52anvlnqi7vu74ncz7j5818hhk798x5mefoqqh3xc7ejkbh09phwzazlg6uwh4x2ah0994sxyx7xifpbwqh5yphnowg5nja9402p2hxhfc10zfezxmf5kvrpqiri68ybgsi3j1lcbn6otazlq197seur3v2pkmtbv7frksjnnt9acwfnt2j72llz8rzk58pa6onncr61iu5ycd5elof10ew7o4uz1bk82n9ddhifyabtugiusit6d66p2mi8vv05gup6m81pojdilxg7xcwefi5d96d9ki0aery2qbzkyr5v2o751oy4byjpmjuvabex40oj00rbch7to6udf9d9cpl4kx960gz4barbfksiehcnykuwwrvqq81migjtb2e16o8upgieu7yrssei1krn673b63dipui9xszy9x60z5w24s5m08wotxmrkkfj9eyy9kztkbx02bmulbbt5j15jt8m6agvkter3kijndvpjb3dyhkp2ekmunanfl71admjevt5h52613f7b0k0gf76xi3bt2skw38xfj3h7s1x1yrv9w33osc04okkaim14333ph0aovphfemql91rrwtqsphc7qdt0vtx49120ao3p08oekho4fi23db982zlj2e87zgi1yst683mwgfoz23qlc5fa87t6zjsw6k6dzv3prgajr6elzaglm1b25ry2t4tkg8peyqlmf2eynxwhv5q3hwzw6lnniuhh6q13nkfbyarxrym5i7xz1nvwpog57uw6uxk1v5q3ovto39smr23fjc59ngb2viarq6hvh6uicgn3x95wlv6cv9cveqxm1bw58gkklkmuzyrceexzvhtwrt0zrz5whq79a75wr8jysk8255s358nd69e8dylxe0fgcs2h38657l84n8ngzil3h4mk4cj3dfrdrvs5aiznw83tmv4ximt2m98z7q628am0ocf6kfar',
                sort: 445056,
                administrativeAreaLevel1: 'fuu8d7tv66mbm5h9g5nndkp3jboaes2ijf5qay1r7qm3tyie0f',
                administrativeAreaLevel2: 'xy9uok5srkyzyad0xkdzggem99mk90t4gzx07mn9iu3407hgod3',
                administrativeAreaLevel3: 'e36fbnuu1qouhknd5916q1jfwh3s1pd8vj1jnsyvai33doujhj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 636.52,
                longitude: 971.98,
                zoom: 76,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'pn',
                iso3166Alpha3: 'ys4',
                iso3166Numeric: '0m7',
                customCode: 'kovg8fp1nv',
                prefix: 'gnuor',
                name: 'emkvbc7yamsgvnrmwgl7o2ewxm2f2towp2zcn305j99bq5cs5vog0tdd5p2ryq7y6soo6l48uf3qq17b7b6acrlgk6cb8xq1u5soe50qx11xbsxta0txnez2fafss8xplge0wvee81n8qmg4qz3sz360c0v06n81ieshw04bufblozb2slif60f0nh90scs5wyh5prtnsffaw5n4nslaoh6sdgdrw5wxnmmkv07lh68c5wcjdcthh3if2s3t9sv',
                slug: 'in6e751wpgk5ojrsn7mu6a9g32rsqepggcocdl9bjddfvomu3pv7bsl46y1fjvbf3eybgwstjuzcagjvvzlchf5te751in7nxe471da95x3cyakvn0nsa31f86hcduvnl6id6rayl2ueoss7vnr6f4ekgdmtgbhybyofwucuze8ttwocmn3tqs3vofwytrktzbi3bp76umd8lnebw4bhn1pjff6kecz7qrot92feea3h652ag77wzwhqfotgffcwsbuley3ymewsqgzajsm79ymzj1mzcx055oj3kpdkbjieyuhpcvj2qbwhnvae96rcxcmjyk58ipxexr7k6jt3p46tjj0y6d7gbk3dtbdh8fokdc2m5ut83eae9s5vqbnt1mx6bihrw9aeboe6tzyb2i0b1jp55drrax15s6qccufmc5gti5yp17pxgvhymxpxzb59ag4jxem03slq308e6wkkb5iw2nxfmyjgzuwy6pj0od2rzager758nyn1zz5r3aax4wn2owgs859al2xd08m11u7vqm2bzc1nafo4rtwasx15ilf3mdnl32kuh9433230wapptdu58kdfrscscaprmd13qlhvfwrrap24j7f8f3m757jze3j95tp1vr4lypvnvb49n7yv1i241xc0a64eli3lqyiu9o2u3g18ktrbafagklu6zoje2at17vk52sinoy06kper7dbbnotezpex4qn8xgominvuyyql3dxljceklwil1qwq4v9jw3o9yk0nvzlwy93cc10tiyrrsfie998o81el2bkqhh863gzrq6b86j8xtvomz5757yhvg2qg0ykyvle1rggtqirqdvlt3orj3r61jxkmubjwworcqnalz7blfdnq2u5waxewulr7lli1e95cntkm6jouumulxo3z4y0rj9t48joxow6tflhvlfvp1thskt9p4tlj9hbd0ohm4fdwbc62vqo45qqgns8qd9fdffalsbihjnfk3uoz0904tvw7uyc7eg7g',
                image: 'bvwcyrlrul3bk2lyscpgfcojh2i3kpitozx1e7lwddqd4tu0d2akudrxrsclde91buovvsg77mi9gcg54lsxsmpmsxb5hawfprjewx816fouquwhh4qk6ydzloy7laal1d882vcq1fdfrypqf44n25uekb92pvrfv0vm4g7bl28c1pwdoizkqs8r0o9fi42vx6z62hmlc5v6mewx5cov9pfjh6hmnoveqrfk77ycauhd05f47b2yf2k2qw2stc7a8ju83t0i2okc1qa1m21ww2g8e6bpde9ve29kp23n4g2r06rym6zd3r7rrrov0u4knvacp52dhavgmvuyrh65b4wdx7v1fsdewj4erb82f4w1wcou719xcrpxyj2se7b43eg8amgbomv76ghfw4or20kgxcggs72tjqz8fn8ze6yl66f86m9tn58zxjeb2rowypz8r63rxdo9rrjj8i2alyvrwmvxlb5szed03osyc0cz1yf6p1u5d0z2j6fjuhdnlh8frj8mi7gw553guf7vdy684idgp5s16d5ech20pz1okrbr1vkz52mwrickegctofukarbrxbexaalxvvk4p3atpkbke26l0dg7uh1nzjofzhy6ppdqtfukphvyrf9b3nxba487ztwsyfo8bqmc3uflwu2tor78hj5gv3mrq36aes7jafuvllcd0f190ppdutd9kjneqpp6vljgrwuuwj9cve5oslh2zbw62cddkajyug6jgd9zirbelsftue1xqzgrmicksn8nr6pm8ki1hudheuhwd2jlttt4s44l4nw1v4yj93aso53yfskj5nai805142en3trqionsiszpg3hx0gg8tn3ulg0f1fos4d3gwr62gzg70jic7hwhxq3oxw2wbehjbgieyuf80a3lkqq1sqhypqtn1qxnccczotnh1hg9tf7p1dj5sm86tq4dvbaas0r23yhx4xcjk4ocwo4lcflcuzwdx7ydnze6m0qirbcp6y7oxxntxzsizrwi',
                sort: 681426,
                administrativeAreaLevel1: '9snm66hxyhoowtnur68a2mw2dw955i8pwcjm345samw6aeglje',
                administrativeAreaLevel2: 'sc1uoa1gvlnl8inxu4196vl35n6hg0r8jiok5yjtg6try7barm',
                administrativeAreaLevel3: '25b2y22fzy5jj54iezeh1dxkxvbs35aqbc8c6zm3ficu8kb8zoz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 540.96,
                longitude: 821.88,
                zoom: 99,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'l9',
                iso3166Alpha3: 'td3',
                iso3166Numeric: 'ymk',
                customCode: '0rq653tl3d',
                prefix: 'nmvsp',
                name: 'w56ylfiw4bpm376oovcjfjd3w0tub6xpmj8z8v320ls63o04wlcejx97oq2o73a7hvqqmdno5rzkoel7uum51wf29mkg8l7ixdvzbmuzhlbwmtrax2ryu1v1o0tqhfcxfxcbx7jpbrlhh0qhq38na3bgd16u8v0mgv2lmwzbcyc55q0epc9swkp80eyhw98mn7vv5aktidw26luvw4xfrxxkbaziwssouu90x9fe511jz9elpne4alm2tqs58g1',
                slug: '6igsbpuefgk6fqux1fafpobaupqc7hhcwg13wusd59bgxa5mfvjys6ucydgfqlh4ech8d4urfxqp3830tc0l0t07e551mkzwsgpsejo1d4n3meqxbt3o389weqx5poq8vq8j191zo7zbpaxfjk5ip4gbr1syfl110no7w6qy44e90n0861vawg9z2smzm6o0p977icb9swbp2yo4lvt0f993wmury8ey1ro2435p7jbgua7rtcnj8j227icbes3a7t68dw3ovz8le6gdft2cn13e2231r3uk2zc1hvq2q3y7y5xyuxbene59v4lyhpocrc7dy6klu3kiuvsw56kk7za7jimcjywmjphs58i1o55pttwdw96q1ar2g5ut7r1b3wnx4vdftubc3osauov5ajujdc91duyi5xi9l8gr5afqe943yt1l85zjtccuphk1rdfb59a7njjfgmfjhhskusgy5izbxgpb0gsl2ope1zpurimjn6roqt5uw6prr5b42kndmalognh3p8dbglwz1tcusjogx3nbi1b92evctsy4yvn9vmmnmywmlchx1m40lrxenmjkllnkfj4bsqgeg6y4o4xhu5wmctbqtlrheyza9h1nkk8h1vi6vf5hfy86656kjrhr1rjk2k87ohetr6oijvufr71u7r2zbt1gfqxda0emfnbpnxqp2tscl8gahc9y55qc4l8rk5en4kpahd6l8d8afydit8oudajolzuoam6c34kj430yqh3ueqdh6bi1mekc28omu5ccx55iyp3gglookrmp4isce6xeieeez2qep7h84rptghm7x2xx3a3odymajbqoosq99pfyhpz89csnfis56rlba89ckbvw3ej1jaga6h6x8f3orw51a8oqxjp285ov4z2yo5lhidlcod3pjfx3ht88s0oikarpd9z3owyi6a5pr6tqteabe9m6ms01gr1cl4dsfv6ixkf3rzwduf5bbmb0p1lxunhbbohy14w35iset82p668v',
                image: '9unxcy00ycnvtq4dz8wddy7jzg0mg189y4n9i5ia34hzycjri9frofm6z80yobpw3cbv3i4cgueuodl0f2dcmuetmgzw6e4as0iatj5hhs5ggpfd4u6k2tsknekqhrh723sdel6kp6fu2tz3z8zi6u0l9kuo6f5to79reul9h6yijkbxqzowlna7ptnw2xhc63zfuaklt112k60rtlssc17sr9nkbj0n9vaofn3vwfgyok7rmsamj5u17xwyww8x73yzeqxv3jsd0fl53vmgjer8nht9fjsfajjyin0e9n0fww4y9pc1f8dwd255yegq4ld2fqxwck0shcu4qcmd7mkn4rfttmctn9evcpuhnjvyf5rfdnwgo9quaf6ytsmgpt7oaevdiu0kt2suzcbb33i3i7ca8r2b5aaou3hvspj1apqrqk3donsctd7h0vdhw63hx0sec16hzlz4lyyqj9dbbzj0ja0huox9p3kqewcbwu8kzkei1bp6120k6tkzi9pb66sb4vcaprv6ymsh81ttke12ggjxgc0oc5embsby6t2qqv1z8909uf66q0cwcjdqarogpjlismtkokgrkdx9yk6cbx6g0ouojqj8b87ggwt2uepigo25i9zwge2ulb5ou3tv92wy2cm3ljvkh75dz3rrkcnqjdx3fd5g5trop9o6zwehn28eo6g19xcz2o319gmpv8n7eb99b548shmeflt79gx5w3uc90n746f2xsqw5jh42g3fyawlt865xe8caau4r924kw0rwjemdao3bw33sp1elzmycbl93rewg0o7fpuc9tjlbgy1eyialn6l82p9wtlflu8qw5h973hg1ijznwuvvt91uj7f79irkjcqb4d16owjcyt7pj72u34za6c9udxwjp01sgn0yfe8vl9lqa8rrhfyl75uh4im6v4ctmtjjnfqjmqk946axxaumcjec6430but476ee1atbqd4svyy4bsbalm5prlfwekndczcath3qjvbk21z',
                sort: 876038,
                administrativeAreaLevel1: 'jz23xngxezzzgywqfd3tbmvc75dpdbb0bb7pvp4kk2purcs0rg',
                administrativeAreaLevel2: 'uqjtg6n2c190lfbmwy88cn2820zhxqx3r3vl96yufzr1euui1e',
                administrativeAreaLevel3: 'v743s3iyu40wdh2mf2o5znzkhodj6y8ikpfe66m6y2rmqjfshn',
                administrativeAreas: { "foo" : "bar" },
                latitude: 614.72,
                longitude: 336.11,
                zoom: 77,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'q3',
                iso3166Alpha3: 'o5s',
                iso3166Numeric: 'zw6',
                customCode: 'gwspcyrh7q',
                prefix: '1i4x2',
                name: 'b691j4ff1j1gnfcba9uo4gvkktdstd6jygasrnncq0bydom6scgi6vbipetiquc5wy7mecusyt7wqcvo4em23uuydnum55bf7r885iy7r540xbcvj61wt4j2bzkk8g3wvnnk8heuxwbh0gw3jp0uxqxmlujdalveqzrs8sbeufj4izrbd55cbsjsz8tr11sgzl22pdn1ni7j24ojeccikuuytqdsl5kr774e7bcjulabzw78j91k8hr921fsds6',
                slug: '38b76eq3vnmyxlpagnxxz4jox5g5hr39zci4hz8iuvcgywefaixtke8fbrjsrqm3onomvha4r1913nctf8ihv0chtc372gs65p4mo560ovjpnya05k9jatxw0desff7sc9mv0knkhxuq0no07wgk60z9ngnt5aid69zlnnqd837thyn2p3n1opykecuyndff8rtuvrydioq93jk75ddoogttmhk1zgmbqnd8kyda9i0lkp2nxigp0xidz260p9xe9tya981dfni6gao5ysckrh1znoc6uav2a7208eqege6w4tsw8kwzm8dncmkyrhzko8k5aqelpc6hgld5wum86cd488lt7nrml5zlk59gsp5q89mc67i1g5k3f4ulzs8l2aj0g4n8d1inpkx2yf9dpdmglyvjlsm9r1m4vdf3in7rd1i0xcgwhwvhb5zph9sbyn1u68a0rckc2g0ujgg453evlvemvbpz024lyccfi06q5k25h16gi2w2z5m5q3p89slw8ie87u47bbc25ptxp1j3b7ynh70rx5yzbj44k4odbiczbrw088x0ey3ilh99w44m21wx8bscqrekz2a6ilk0vutuewab1ihwl1kqlw0uxfgqydqi7qjhgcw2jvunk8r1ud507tipmmc9oyfw4es83cagtg1crbn8bej9k4i5ngcxvhszpx6zy5w0907xcd8yo58ormbimlaz2znujahkops2oend8x8wrr7p42by1u4xvbmijdtajkdv3v47evrqp7f60rvm3rjukcpukn0xf84ah75pls05v763vngpzz1v459mw704yvocc8ztnvg69xbt60nhqd2l0kg6magodl3ewshwoa3o1lagxmwasxkalhkgqrkktr8oz61d6gmzwdlzv55ydbsl8936yl00ydz35o39eyttb0k2n7ma2lyqa6gwpe130b7bvqtb1i9mxdwdnpjk723ssrp76q54296fv3zwg9fynsi8vjyigwygkntwg4mulf97etg6',
                image: 'tq6zwnh4a0kfa596v2ov7a7d66wfknr8y8wiil61bq0k6ca9xoehffz72g36s5q4p2i9kqhrx8j0gpuwqczpzotk6ho8ccvm6reucvdtec3u1p0rs0kjr4fjos454xucgu88xvkaa8z0yxl8fplp7mb1fjbm3iym98pdfaq82mhxdjwmdolnqfj67i2qk5wsgwcvpst3kce9eetm3un34pnyamyd1g5zf0c2n0bi37mhg4131nfp71gquwmtcsfpgsaojrtmsu15f1dxw1d1wgzmhtkwwcjqtqknyr8c26jyfqqytdi6mv3p9wpfxa8debi8c2jkk5ja0rnlogqbenjta168u9wcedxe8xgpo5hzx2apmd3rd8r5c5f9l1d3dumdhuh7qctp6pm1cyuax5nexky933bsqbrcztgjly1zlne12mxabzlneqkul2njwl263e43m4af6oc56kzp9ztg13ldppjp6ow0ptb9xwqjvlj07uo9sik4x5r14ub7pnbg87lbfou3k2z0e2713pwiqquj0ounnxewkcsghcmzz4483vcarfipnr94dcywessrzq3rciffg5d0ki1no6ca08mbra0ru2l4vny98j5sr4yt8itsg04sbt4hxzt2k5yjxon2hoxxi1atjn516qsfm3nd5bhmjtzuphrc39571wkfc5daiid59k2umnh3ek0tyxxjduykp6up4et5khbtjid5xgsctgeq418zeskzpj4z7lb8usur5szooydu4f8s948bgc89i12a3mchacq59lx54h2gwga31a1p4ha45q3lb219al98sxrz4w7gxl9co9w6epyapkts5cbblsib7gi37epph05li1ap2ybpwzwnwclh5v15yeq4e2j3egnhd3yx549kb7u06i2xook1s0z43eoc3hbawud0d9y9cvvdes00l89cve19rqh5ytsps8456fodwxu4j5cz2924we5lq8s9ypvg8y4ebgl2ceyl6nbajqf33ki770gw',
                sort: 478349,
                administrativeAreaLevel1: 'jqgnmqte1yc9wx8xxnf7j50f2hpr9mq7fdfbgt2j9tu9z1w2xd',
                administrativeAreaLevel2: '0hq5zgrbhmnwivzup00joxrnzgm4roplt29idw1w1nvf7o8npo',
                administrativeAreaLevel3: 'c1r4zs5zcfr8ucm1yql8noqen6nqupssfjd3nw1nquvxt46ogi',
                administrativeAreas: { "foo" : "bar" },
                latitude: 34.20,
                longitude: 894.33,
                zoom: 22,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'br',
                iso3166Alpha3: '2wo',
                iso3166Numeric: 'i3n',
                customCode: 'aohxgeewuv',
                prefix: 'lijv4',
                name: 'kmfj0p4g7qjn87zpo2pd3n7sl2uk7idwxv330iu3a9rvj4cx6kw5twid4a2lc8lccvpvrxcp5hr2obrus3a2optfh196kzvbhfb8w0h68fu04f7m08fa3onx4ihyc3n2796p043pcwpy1v77al977u8a01u9h71n665yzyjwo80eis2mqe2gypzaml2pdesj0etr5ge77y7ctp07r5n444af8o8381i8ghju728asdbjsciaj2791waw5nra8ic',
                slug: 'o99kbf8hv36it7ealycf946q9ly6qwpn56txomm2pbkuh85wkqexmyu6dlu3epjz8b6z6cfzc792fnseu6kdalzta6dzymwmovvxezvsjwvnv79p143klczxtsu5lepgsl8xp6f7a5gc9jcqcbte19l632r095quc6cra8rmui3o7b3xnaqdjwrlw6wv5eep08axwiy56y61l0em26sehpf36pafiz227bb3w34r6je1vvg9l0b63vzgeoqodks3isipm7iefuv3xi3guaiz6w14xbwml8mumk3492kb5xou17torrglpytxnu90q9d4js946t3i8uw04mtygpylctf53ff8dt2jrso0yfdx1hrbnj8z425u3wsomz412bzyzdvuypaje54f2eua7kp82yqtb2mr7kwn49k9tm4nh6eyxmdla8km209xbrkaxfg529y2rx7a281x6z3nagbb26hjua9rspkokarllbflc7px3csdtegm0noijl8u6soeoba14otmysqwa8qhx0gpjcj9hpflfdzz0mywq82gx8d5df63km0n7a6mdrf0a7mbol7mxoqj54dzglbtf6y4g3eyo8l3o4q9glio91tqds1916f1645418qvr8t3l6ihlce8c635pxtud663nz0n2ic7ci7nwthvhpjhfblexvk1907vn4hxvpykbee0b7xkdinzi2hxofg8wnxs75uw4rddio7wxuxcd33lgn4x39e4rotj32r8j2wdyyzl6c0vbz1tu7ai95148zk2yizelkhoyqkq36hzj09uspk6qssdclxrlgyyn6bd7oggml8cj8tkwrnx1fd77vbaa3ku66g3oubqfsayuwmtimc2m9xq5kt0yhwph0abk4jvndnrtkghe0kqgz3zojcw2oxa8bcizs6f6dueeelffo1rmz82bfd5239etg5aj7pdw4o7n3f10tkbn2rl3zmkifhtf998g7ze8rb8yyv7lv1t4kexhmthhjvrkss97gxcfsi5',
                image: 'ws04vb337o0ludnlfcn4yl4mt8u1ix09ajg933z0lx3rugemlgb3p8k6feqxr2l99eiqar00qg8ikcbpozwyvwexm7x4hu6w93v2sdouah6wr937n3te63063k9j956gx2hedx1t2m99oydhnrcnntjfyfveq4jlxemfz2r5dw6q8cp52074ghrdivhebji7halpdf3pmbuw11zwlyp973bd7wyze39wep60gsv6j15q6f12mnrlklzm1oa4ul1kizt6qietw4ccb9l3zfp1cr6fyml9iydi26tzdc1zqdpuq48fcnm7q45ty2a2tj97mxh28wude349b4zdhi4nixuyh4cebeuuj1gr5ujp9w289j4wz19fucnwvknsg0rj95o69aqpc9qljdtekge82lis7xwcjx1fwrb9cju168jas78bxjpot50cob8a7comox8zlhs2ewdjba43c0jfima62onbtxkk6yh0ud1qhqlit66lk7r9da7ov50lnlm869oxb9nwkcepu247uawgcmakcflqtaq5vb682vao6fiazm1jsfeiq6gato13gubuwg7d32pnidn4n7f3ym829fxodck74lr4lzx7mvsgpe2ps7tqyljsf2vmhocgm8vyz4g5iplxexx3dcfq5vkevzso8ugqfu3w1zngzd8pjp7mv37ceiuyvcpvnmwbtj4xzzu7hnn5p17cc9ryh3kew19ga7dcgrvp3u8a1mf1yvxaqjd4r6in35prbw2u8brwyx6uvkvumg2f6y6977n8beessb8s81en1eiwjuc6arcozombw8jny1wv8lxpt0cff9n2ws8ez5stlh0d36kejh8e7l730yo0awuwz5vkku915tt4udu593xed24t93vsoav489nbcubs49bcaad1s7oj1xj36xk36jsod22z071ot48fc6hw06a9wplxvpuommex2ngyntt0ji5af0ixo34wmik45afupcvbguc2o2rbmnzd37dtx2xv7l5mf9v9',
                sort: 154889,
                administrativeAreaLevel1: '0p2j92gwwk0vlv2r7fpbl0u5b90kel1k010ogl7blxe0om5ztr',
                administrativeAreaLevel2: 'pef66tbzyfea2t9593c4ihce4xh0ds48on8m6zf3b8rbke14g8',
                administrativeAreaLevel3: 'tmj3l0igoq39hq37vvzy123vj13sgx4xv077mfovxfs4qkwg03',
                administrativeAreas: { "foo" : "bar" },
                latitude: 682.78,
                longitude: 610.19,
                zoom: 910,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });
    

    

    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'ra',
                iso3166Alpha3: 'r9m',
                iso3166Numeric: 'd0l',
                customCode: 'vtuwduxeyh',
                prefix: 'g6ccp',
                name: 'i1b0wgg28xoyc318b60pjyz7w53etlnli6fr0mlxpdgw1fqx9fyzomu238m479mrugffyofvceqd7y54v25gdauosc1yflyoyfnt2afrtinyhymvbnh657eq8qohp5z8rfxfw46arhnq4eyal86g8piagaia9qfz0gixv1gmzyd98oaj15xadkh8kb15l2m1dlj5gu59yhzqpv83svne3mi32p75wwj4wzvkxxet4f51o2t9104e3umuk1sksen',
                slug: 'yf4n2qco9mj1ra0esw03o24a0m8vstplugr193l1ipjbmvjcvb6ohxhgwgba8jagxvl46iv2rxo44uzkmp9o5m55bes7v34bqsl2rw224v8lgrgu18v25svwp5gylwj73vfom2y4a4l6sbw993hj16iccwdq0htz6xwomhbnin9gflfk1m76buvkn8bfye7sdh5a89mwwzr1ur2x131kvijmne4htp03gqocu7lsgdxfyhe1j66v7z773le3rf741lesaef9j3w0vwyc3nuqzplviigl09378lms6odpgzpzjx7di7lor809gw8mxd6l5hxzkup7h8sm1gs2iw2pvf1jmn26c9klkqz71laske39oum72zfyie4p87e02x4sbr9i9kkvdg10azbvhtcfudhay184trr8xae7ndmc1f069szb3ks4nrczig8vu9ahb5xr026tiq4hfmhe16uuq00e0eiawue32k3zahpz9eq2ojtyl1hve7l3c7uzwrc250re4of4kvava2iibxjwfblyz2e2tz5pk7by9dtaimqpyzbemc88611pmipsanes0awhla69sb58dcoin4rtlkssfdpd2wjjgn8b0fxhsqcfiu6kb0zo27g0a92z8y6ew2kiyfxduu1h1dcfbxaihrgc4tncxbb7yr4sq80x4pkzd8npnfadwxnntvpa9gw9vrdn8geoobrh83fqjk9e5ty7sh7kr39ptsogopw35gjxdi5xwa84ji9o974lb1k9pnypsv0f9296tkdejspas87hxvtahnwduid8u5du0gp8ak3mruw8xpgma228isif3ko9g8pz17pdywb6h1syuzwtbv7j4i99byszam2v3ffh6jdr8zvqgs8zrocry17bwzon92u5yvj09vhzifkizd9z7882vwhg1jvl2vmj30tcypuuofyvpni1jlpqwqnfat771ma72fjuqa8kofyc3j7b4i97004kyrn6ff169st2hva3misb8n2hvvmqey05',
                image: 'u17laq2ihoq5bliydpg45senajaizgjd2lom6bj6h2s7cqg2ri841ubo4404z9dmq40tto9xdc3g1do34dnyma3zgiqrx6i3z69jx4iau2zu28gp047trt7z20mltkbd187ow49yi8wlysfepd6n76wnjbi6pgjcpxxcamod8fngvmhs080q5qqisw7qr0fw6l11pslyzpkkt68prcym6tg33woa2gec3od3tochdxvn4xfhq8hyaagr97uyitgnymobyuzbw97711wh5bvospj2cbiht8rnn5uu5mnys1nhv254kwszpdm8xia6il8bcd0hcpiybtgwmgb4mqljpu9yq96t3mxuj1tia21n6zae9b628mg8ifzohrglugz7rzxi1ym6v5gzxuakk57gz1l8r68253trp5iklcfansrppisf89rkstw7t0adxp7t8ictytbf8f5f8alz7pp78u276y3eblyfzj1ov1jymqwn0o83irxvn3gxq1xuazeblbjtt2r2dypd9vt76o5h3cwnex95u1jn0eq9ncwiu63tlvlvwckt5beq009ca4kf45uenrejpwb21xc0pje01flt7lab6fqvthg72ia9j54h7fyvx7ywze4vc0mgd9mer4e6nt2scasef12tvolg61rnjbscf04ufw4hnjrxslplrsa8gslgktnbodakqhguvbxz3bhfchmgnq8mgydudadxzuqs62caq2cowg0hnscu8833ma5gkl8z1levj3ca0fn605jorbyw0df4hs9880dhokl0zsvoc2ipu1zr7v3a8ocrh7yg2emru29e7yj30c0xgipmri8wp0vawd5xz1fpcggx5lhwcym3bylt4qrffluyzic8ntdqkpszgn4ecdp87fvl4x5suojuoy2gsqm70pozphp6rrnljqzyt6sgtrhiiur0169gchadawxsu3joi09aop5dginjde3g50wm9i1qjxcuxzlge613qy80nrb19pgkos8d6wjqw21n',
                sort: 752000,
                administrativeAreaLevel1: 'advnfz4el2kc2ffroygq39xsns3osiijs6tlaikjv5gyn2o9eq',
                administrativeAreaLevel2: 'l83j29drpv79zyd3dt43v0a9addbp8pp721oqbt42kkcrayjbu',
                administrativeAreaLevel3: '1ubb565gyk2evholxnhedqwoo29nkycz9b7oe175srdlo902on',
                administrativeAreas: { "foo" : "bar" },
                latitude: 62.90,
                longitude: 758.58,
                zoom: -9,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/country`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'x6',
                iso3166Alpha3: 'lft',
                iso3166Numeric: '8w6',
                customCode: 'kihxy9kk9s',
                prefix: 'll4c7',
                name: 'v7jckhnopkaf07skbppnymto2fuff56fuwnbnj9lox2uoputhlbhd6gh4sf5waeafsj2ifsx63ovmtv60gt17feq8ab6dkygbj5g0pwc9zma66bifbzo9yxgnna8ohy9iiy60jokkyf0kvxdyn4vi4v71544z31sxn699zsdgjbb30db3nqfobyao6u6k8opexuvxh4enn7i4nl6s7eytyf1ktq4f25mllp0g7z6lv7793s6mveb0qvpiihlrr5',
                slug: '4kom4xks95u8f8htdxg4q15etlt64kh2x8ijhp6fbrizl0qz8kglyk70qgo5ss4h32sanys2s7yyed3x4qctzb36gbvj6ymceuaggub4u4fl4bxy2k5fzwxic7h4pl1xhbvynkpp1snvgzujfc650iczr4kbpp4ttbqp7xxx5omsot9qmb8xqswes5q187akegu572byqfudu7wnauxf5f5etlkbmstdriuhtb4kyqago2aa2ixx657jh06q7s6wtgfoolnz2zhhocy9aiqtyu9yd1vyi5n5tgp1dm14v53i2ois07zr1vzwd5wulzbz254yhi6638aa7yc1gntf78vx321trsvlto634jihyfuqxisc4zzd5gqbw1zg4sqlmjufysg8kkl34qp5v2e54tpl9qy57gxwj9rcdtng8m4qkcpdpikpkmh9a1mg9yhzm4vkvvyyrfnflh9dmvhm0151rec30u97cadq2cgy7ctbpqrlnbs4nl5xqnn69eoeygfpepfixzjl4iduno9l56ka4n824oncwufvze8fbqyqw3w7xmxj19mfgarxp6u68brg207e9424svj7hfcn8f5ssyxgbgfeo2l51eyabeo192vroqcisp3yztxnew610vcjgu8khabubw9aod5jn54secjd2yq6zk927evtnl4fnjedu0cht0jwkfzfl8qiysp3jkbjkg5ov4tez6dy3lb8tenr6nlzphy9aqgv6pzxlgtdktbiu24x0nfwv536l7hb9i4n0frxn2v1d3gc5ozd5q13qu7wqzvzpqvlwevmaznqyp6vpupjlftypf51vgobub22rxgcrspnbvyd0d8p8exliyv7kp73kl823znrwf2jdnej2pp5ga6lytxd6qicu3pa0axsp3xwnefk6pqh45kb1jqcrm23ymm2ouj49gbe4kf8p8jyee9pj5kq1yetsmggq3by3ghng63vsdwggd68ejxaafi3sgwca5c9leo1qmqafz0f51wvhoi5',
                image: '5qdw075gpuftqr5nammflasrjnpvl45bjqze74yerg7aa5vi7tob3bsx1er1ccfgtp8sv28h8gayhdm7pa82l0tx0alsxy6ihieyc8x1ljsidvac5fw7c9r43ss1matn5ypg815wp6082m66fw55h87lj3jbguo75tk4ha0u53hy9ojwbdew8y1q1p8n9agjk2jb2jnw0xbhq1z0cmk1n682bqlwrl0yl9g0lnf8gqioyv5tzmu9sdffudlxg96j8xtf2eembu719oxyne6ozyh6pdcdp8isc77oszecoske3d7u0pq4j8xidxvuqw5h342fpay5cgo3h0az4uyjh6434mnh54nxxkgcp652m4alouf17jckntxyf8nopiwidr3m3j094z2p0o7bgtlgiz83lqg4l2ojw7rbzngwo9edu5jxvoc6swoy3b62qfdef6qyidh4gas2mi56cllhnfhvpbclweossu34rttvuv1katgog6eltv992a38upsywynjmjeu16rcu4sqmblcp6dhic9gwgia0mibtrwl41rygy4mt2e8ainq96gbk5m617gmqeby9a3ceyqtxnj346jplz9ggg0gc728or4c0tlwolm2p1bn60xm0k2wzsym7icpsmc6f9e14t419joe5zccac3xqjj074y0fj84zl4oa0aoib67o4a1dymwvxpmpjgg1mlehjhjud17o20n5ut6uzu4litrzy4xyuxiuyrfwemvu43ykamee5fiubimqj8m295vhjlih3edvvnc5bbogtmuqtqodci45zjqo9u2bcquedfgdnbqfy2lunorrzsheuj5xdf9q6behl8okr7skjh5h3t5vukuhpuqpla7s237jx9db449g5hxqmrxdopcuoq3alnrmk99u1o8s9kg017nr8g7wymi6l2wrreqlx9yzejo468eelwkmakkkbx3z6qts0tm6ady647ul6q2qu55tnmh90uby7x2esioiv0rkpzn3egul2snjlwm',
                sort: 979575,
                administrativeAreaLevel1: 'qrrgkhlsadv0ttey4iwgm9gia9tt98qa54k6jxb5pr2hhdyacp',
                administrativeAreaLevel2: 'epg4vpr0sm6gg4ma1mkuvb5kszkbit1r03dbwqi3vhciyl8sus',
                administrativeAreaLevel3: '9ch4p3nhkl0l0fs6ycdt4e43hn5qnazttxp7d2uktfyaapy7fj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 688.42,
                longitude: 11.86,
                zoom: 52,
                dataLang: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/countries/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries/paginate')
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

    test(`/REST:GET admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'eb3e62fc-5366-480e-913d-b87c335e88db'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/country`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/d79f7d4a-8ca7-4e64-9f21-c8fbf99079d8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/beb1a0cc-7429-4a89-9531-f8d9ed13fb01')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01'));
    });

    test(`/REST:GET admin/countries`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: '9df4365b-7cd2-4b6c-99c8-2cf0984b5624',
                commonId: '9c05eb4e-b57a-4f88-a1a8-9f6311e89c74',
                langId: '562d7d14-6552-4df0-ade4-8c453b6f92ad',
                iso3166Alpha2: 'dn',
                iso3166Alpha3: 'mqu',
                iso3166Numeric: 'ikv',
                customCode: 'npvz9n6dwk',
                prefix: 'emsbl',
                name: '63q4vhc1q3f5mh8w31wvdgwnm0v13e00hmq4hzlidonuce8nki6wplqhol3szettyijc5qidtu0cfzknfeh7z0m01omoxfo1fnwm0app0rez6yjgpeg9k2jyjqahdkcv5mqohb1f6vadwmmsbfr13xeykpkdc2pxb6m4gttcolnl6h1hrfxa5rjzw7canhszvr0ow3lhm58cg50wmoovnv9cy1sibvtkafjitf2adxp0pxof8na09wudjf1zh29',
                slug: '6f2s83y6m39fy0udx1ugkmxnt3dw0h0njrjtacbv7bmj4jy0n8op2akavc1smyx3p0qdg6g56mwd63lia6c22l9he0iciuof2rkd36h79updp9y3ypi9dxv5vqj593fhnzsbc1k5mv8blwoa022hsahu92a7ifo3h0ayrlcwfjtittf3vlmswe0p849hqawwdtr93hxglhjmjvn2ea2wokxuy5tmfij45miltkcxgk5urmsqy8nldypa9vkf3s3q8wzjt0y6kkni9hp5frbdlfuk73weaxpo32kkdfyyn7mb1iaooc6zkeooz54yaju24ljxnfmporw489otpblhb8qmrmtmqluw17ciccnvvoubrgscvm2rzozpiw76ywqn47p2ce0r9gxag3foddw2gl7uml6nrq4d71wc5gc7dx38wool8q1nlfsau3abtiojmelrotmxltmimbnlxo7biarphn3l6b1nzt3oxq5i3sqxalbpgg86idd03esqfus1s892srrv1sa60r238jo0dk67tcdcf5qk3d1ir7y77h1r5toic4fhl0bdvom5qooz483qd73rj4f8pnyul9dwmvo8r39qyvbt68985ud41whv25p62q8nqadg02yihvpdy23mkp2imgsjqmnv1deks1exvcwiaw9ysdxx6zwk27m1ocgvy5pvea673kzvf4bkrfwhvfejj7idqd9pm00ndwc1uh59ogq3imjj2mzt37dcxcr27qwhsjx7kbhyu6tgoh2mahkkgozeck4ctcr51l6f4sv2jcku6kerq7kk72va118tc9a7ljm3rt2f58zs1zxhoe0pp5jo80h1ev1hk8bivv1yazu60iuvltwxdks9g92poc4cacx2nh5a3p15z48lmofw0qqnz8p3xhq221so7z6ae8pmuhaonset651e3yjvqklai67aj8ds6bmyivbf8e30w75wsrik2tp8b026to6owaqqnid2jpg3j3uyoj6y3ftsfjc7ca6xatkq',
                image: '0pero3uozz4ybjwv458dboajcjb79ey0du3uz6veqou0fivq02zswkcc4ib3lwe7q8fm3es35izhu6wooy7wrgao4iul2n9mfvytighenymlo7ghh6jg0eeabuun18y1stlcqiilsmafikqdbpw8tmqe9r6u84mdgwt4av7bzt1qiee81oyb7zfzme1k8mlnuvmm7esy9ut7oeg5j23vxtod47r24fxboj6lbvx03jat59dobo2vktofedge4kppr34r3g86eenvrkabtv3rops15i6zw2815w2w81qqrxsd8d3zo8dppy293d93lfyj9xpmdgw0o8ojoeetmddxfpz9czalxzkjtyatzigo4ka4iqt6ut4yvdnm0t7qktni5nd9965yfmd5k8zu01po9fglmaeh9675qbkpx255v0pnaqemh9l5qsho53arf5o8frits3f3ucgp8cm9nn7iaf5av9sb29otx0mqnmmlau8j8hrcvd0f8k0hdgya625d5yatjhp04kirpay9pgbgsaz65g801496slgvef4khvfiojsu1y9l5c8hs1inqt0vfm3z6l3uo3e9lg9mc8h5i2s1mq2busl44q6h47o2fw1ki51f8snl2m2997woky9ra11ghtiht8o6soumavy97ykovuva9od2ndtti8357m9prb4bvtheraj3ty3mwueu1elgyhiunaeruaaekkxuadz2sv00mn2uicwy0vx47gof5js0o7kun7ogj6recbm1w0ft6ekpesjp1tuu1gvn2g97ea2t8qimxwuvbsxh8tenv7j0twpbdl7ec31ivgx58ctw52s9y7ifsd7g7xgx36iokkv11w4ibod2rid6mf71yldwdlg767d1ctnht7t49uuqz3s4wc9275zfjm9aahfgin4mzneo9n82g5fmd3brgd7bshepdq7o5ndm3zz38w3lhvdrcrebzo014pabrxpog15ift6sfv6gxtibw2c7he3v5kvhzrx7sipb2koq',
                sort: 475753,
                administrativeAreaLevel1: 'ukbfiv0jj9ltdjqioh1w6iooowgt9ik4p4q965qr11q931nfpx',
                administrativeAreaLevel2: 'g02kz9937tcv78bq7pbszey7qzfn1yuud0x53iboyn8n87s3ft',
                administrativeAreaLevel3: 'vd0220c5rjn4phhlw2147bsvcpws07eri23vx1o0g6q4zajcz4',
                administrativeAreas: { "foo" : "bar" },
                latitude: 279.42,
                longitude: 212.99,
                zoom: 10,
                dataLang: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/country`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                iso3166Alpha2: 'rh',
                iso3166Alpha3: 'l1h',
                iso3166Numeric: 'wlq',
                customCode: 'ql3bi5jz8n',
                prefix: 'awyu3',
                name: 'cx15rbb9o114r8r8nppo97uh5q18v14pjzqmxvm3yc9tptrunfvvwa7fkwne10yl1jdnfhsi7cpeslx4ii5kkvmfweug4ekwjehqhju7uud6alwkgn24atiepbj7muqixufm44j2obofe3kwa7rpczqjgbjobprh998ydcbyz978iu27bfzux4csrwaacw8d6kknz4aao7orwcdz82og9tfa4bjb673tkny76s6136p91gt0leyb0drx883os4k',
                slug: '0qgkofeh4lqblesieg22h7773e5f0l5qku8skrnh7ht65vxqf4ocsflkfkank3yhi90ru8wtbqhn1eynfs9b25wkkut0mxzlqhjyflsqzsgdgqcao53izrenjeguao5ray9lb2vk7wg9qjqm2u0msgzr16ugtye3yo9penrekeyv28walym7r3vtp2e70okgaht1ly1v2wbo6tu2xxob54jrb4puble7xt7roj322pvxjja2v2hogbd0mv3cmdma5hb9sd1d5byjuoelidxpwbkp5s5hvecsswll1c1h55uenf5h5m4xrdjhfq2c2dfec6j7lmpjckleu6zp1x0832miz1vtdf1gkgf6682kb6mup2kjv1gewdv3hcd1phr1u8cwun8exx07sj1zvlhzudfz67azuvv796zqwctrbg6auzcdu59jk0863e0srdh97acob3w0thvbdfih7exlhzcrwwag6tfnsviig3svlnf66dojgugxsf2bnjpvpxdsu9a22p8k3pxxgdyggf7ftmn2ako05kuv0e5mrpeqanauolddj07uhoz4x8mffjfwfm8n9pg11w1mhrccw81c36shsc565vqbot0m833rx2hoxy3y61uff3u6yfz4d9g5hx5l591a3gjh0xq03ohfx5ew9gqtdu84ru8v5oai0u4nbstphf39k1c02mfxl9xaups81hua9d4a48jsjbu734kxd8wq6rvqj0l4xxwqsecamu4h1oyleweo47y1yuk3ph3xug1q3n6lysf2esctwyxl88pzm524f42quwjw0113l5ru0urdzuzbl0oa6xouf938qlyhs2wwz6br58zhifjvax5v24xf296703zpx8k0ys71m5oo1bt56rchbyp70nvodvuw5wd2dvqck23tpqpzbo1cmexlc5nvlnv1xr0fitqrunevdserrpcvecm92b2um0hduifiwbsatyen5vpm5r5beeh42tmtkhq0cgk5rysko8vpxlr9f3jbev1r',
                image: '0b6vwwhvj8kplahqkabfksosso2xwja16sv6tfc8enuslfu3ye5pna90yh5u8f6afpe0exryb6lgq24x2c8he8ih222qshb8fk0jw5jjgejq7bt22w9n0a4d6ihnveouzptw06lu3s6fqs4tgngl3aelps3fnhkvinhoq0wyb0qn4llf4rixv947pr3zs5vuqi4bcy8b74xkivu2gm7zx2ad38vbrr20mk61pt8ft3sve3zj9pf6e249riq3hcj3p8zo5f83qvpmwmk3uxbyvi1qiq2piy51fr0x2twowaqzhe4nqps2dkuzm9l8cuu05g24m0fbhbud45sa97s8ikkuu39hpsltnb26ag91sr7fxn4ouu51xlexhwkqfxv2gtprhicy9il9zw1nehsepcq9dj6p84nv846zn9z3dkjagn69ac36dqihzozkli6xfqz6i0sra8zevrwd0n6q8verwgouqn0nvlzau5pto48sprzfczvv9cckqh0ryekhk2fq9jhck0za73hzd7cqfbs5qcdeopz59ly85fe6cskc9xczbizq4xmvqwm8be7xda9qp4vhnhbj16r4f3lmtg0a3c2sbu6gcfke20cp3jvx4ep8fz9hsv3r1kuty2ncudczlihpyffmk5gcype8x3e82du3l2nuogznisj24ctqc2l8tza5w0modvx4lw8res2842n3f8swa89ktd1epcpiaqryjhbc56ji59wwy40o1y2usm0g766s7kykgnqaguf3mpg59z8tu2nyi48gyc29hhn3hy4a5voytv1ii7dfounfzccmpyq1uvedcv7iaw1hqbc9922dqzxk7iw1406g4mdjndo7zo6iqrya7jpo2bfqz9gzo7xv4zcoxkacr552x3dcc9ubf86mpaivf2qmv4p0zlj3l8xy9g72eo85fdk4g7ae1gkgqex2cyfc6tygfcmn3x167s6gx707o62hpe21ir90piwui5hvutdei281p7uv2ev0yv0alm0w',
                sort: 816760,
                administrativeAreaLevel1: '0u7c4u31flw58popl21b4vziyzgua215wpwfudaf44j6784gfo',
                administrativeAreaLevel2: '291oiumzri4z5jw30y4wtnarm930v2fcoe97jpeptcnp3gfw2w',
                administrativeAreaLevel3: 'jmtukdu8n7v7cgpesa7j8z5b4udj9rfem5g6god72jjetaphks',
                administrativeAreas: { "foo" : "bar" },
                latitude: 164.47,
                longitude: 853.46,
                zoom: 88,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/3c0d2ddf-c02b-41bb-95f7-e148b9f1a4e0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/beb1a0cc-7429-4a89-9531-f8d9ed13fb01')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateCountry - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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

    test(`/GraphQL adminCreateCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd0144f8f-5b99-4f5d-a5e5-df07037e0502',
                        commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                        langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                        iso3166Alpha2: 'ko',
                        iso3166Alpha3: 's4w',
                        iso3166Numeric: 'dr2',
                        customCode: '5ywbnse1n9',
                        prefix: 'yikn6',
                        name: 'e0gw1l7ymms9vdm9x03h8vpfdvgo9pju1qsyar5pcxrgyrwjv7gsj69uxv8hvhobjkhg3onqr84kp0lh9tg4u788l7apxjnd2dl7x64mcpdzcpss9em0h6novwlbqc3gbeicvyxjjkbwdszev70f7zp4gb2hiumr7sfowh9q40j280vy6fcwidxhh7og2rg7d32zdelqjy0fmmaaxdcyt4964y5n6qgcbpjm2p8bmfnnd9imrfd8fohprls1a2e',
                        slug: 'dg7lwhp1ptnqxsea63ka5qyas8sdwbq66zx0clju37e2ref7sj0pn5i26dfeq7jw71030e6taujio5nfrbd4gejt9jgyom0kbe1gcyirtz0b7u3m4lt1bfasskuk6u4wfhq3m0ae384kzjzub65dwq7bnzbfd6cxt256ntva2obj65ro4arfnme3ghj3lszatkansc5yxxj41l16byni63v4cfa2nk8m4tq0s3lmysykbg03pj5wd7zlsqia4yfu77osizho60gb831kcuxy2gp8i703odo0luksf4avdv4ooy1hltndm87ge7qxtzp6qecjp8a0bizmtyqz2rpzviyija8jlycss4rib1m2bxu6wwmjuec0tsty41pg87av45rhr1qldblemmqvjfsbtcz2eo2zr6bvz00ycrbe7phsphrpm8b2wmnyl08t98cislezfqeb6wipbsnlx7es5ukd4i9kt1nc9qizhhylx3xh6tby17373tqhrkhmkjynbwmttoylacoagv4rrtfpvl26cn0ubxjufdqy5wqxj3eaieezvtzh8j7q5gsps5pmo1m63hsmm9setpsvhjl9husvcp1hm9oc1o4mno9ahnu542aimzo6bnmjjitvlrajq734p2jvsqft0uba7q3g7ek5pe3lapj69qjageip0lwvwmukza7xwaj6kwam9jxf4y8svhhyq9bv3914xecnxrzjx7x7vslf5lyqib367cjpfmwneh8bg27uktwa8kwxlu6z2jwjhkq8rq9vy2o4s2m1heql5vz2vpptywzja8h18yvnt8gg8hifp2r1zoaqnd279pxomdcsjdxpee8ikytt6waaxtgnsliuwduqqu2kbej1kul9z2gqb1ffgwms12v9wbxbivygt3ql8jtfcmuwdkwxtuyd7twykcaalk9ytlm5rkdj8a607oyqo5x3blu0ug9kzh718aghg1ydgfltgyqgsj2t5wdlnfxxol4ju4moehk5n4vex19qmivl',
                        image: '01xq48ax3x6esbjoyet7p0v2foa9e9xgk0hkk3ytrs9gtm4aaaqur3yrj0m3i6swxbivp72iwkqhqd9e3ugmh8tymndlv5s6y7mmzpzrioeo9eex50gks3jalkx88ejqbybi09bjqgcdpsfvsj2tusmj0fvjsi8fiacy0uzm15qv8xacrbibu11c4xja24npegkyabylzqvxy5n5stz2umn71npnxwya62y6axs4j3e4ehaminv7bjznkwatp4a2vd2r3o9ka127zssg3elagyinc9k3h5rmtcubwlpwcojn0ffvo1p5c3vku3gaoedvu8oblhpxyppnljht5ygg0ts3xuiafcuc3j3bwrdqta5l291h5puqabenarz6cq1q8bnknhpodzjrariy8ts9hur3krp2b2hv46fqeba2ywzb21pjv7immyaib5e0rp5cbqoaytcum1fxflasuv1o3eumqrus83diaukr10t65o0co8zs1krjntnrpzdrehusq0655heiiwaydvu6r7cew6nxfffabgy0wybijck6zqvxs0so8qp420yutk73h4301vba1fcdg891bsx3rnc3111gi4p1q9d8k79xuoqojex9te6uwuey4hs7ox8kvlp0bm0fl1tocxy9clgbfo2ki6dxtr0sd6yxfdu82ok26uzxm9gcjgh15az7un17lbhecz5hjt9vypkjyvcgeg4nabgujrp1cyp1oebuv9pdk2yf2rm6hsuzyvqbnoihvxo1pl521k44mwxlelfhuciorig77tohy8r25j2qfjqr6riw7q4vf7og46djau0zptr1qk7l8bc34fqr5pego2x9yhd2s17axypd359j526enrmnmzcla4ev70r98gnlsnimeof3w2ki6z6i3h7dssnql28hacmrb4d4ubfid8x05sx5gyfog1hr93d5hj17e9gyeouce9kzciz295xkt573rzd4k8np84nkujvykejodl0qrf4hkm7hzifu2ngantji',
                        sort: 223516,
                        administrativeAreaLevel1: 'rxqv91zw43nmn0glvsv81xy3d81vaidf6e2e6ypljxcfej68kh',
                        administrativeAreaLevel2: 'w78ulamesaw4gnaaj6hqlhsi3vhthm5ma2b2fgu5j6ipw6zo84',
                        administrativeAreaLevel3: '72xhn4ch48wd8y0ts6jgvdrn3oi9z6dmpxgb666eiaqdwok8c4',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 112.55,
                        longitude: 404.65,
                        zoom: 45,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', 'd0144f8f-5b99-4f5d-a5e5-df07037e0502');
            });
    });

    test(`/GraphQL adminPaginateCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateCountries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateCountries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindCountry - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: '4826f2d9-392e-430e-893b-43e9925a251a'
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

    test(`/GraphQL adminFindCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('beb1a0cc-7429-4a89-9531-f8d9ed13fb01');
            });
    });

    test(`/GraphQL adminFindCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b90648ad-1905-4209-b780-49668c24458d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindCountryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('beb1a0cc-7429-4a89-9531-f8d9ed13fb01');
            });
    });

    test(`/GraphQL adminGetCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetCountries (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetCountries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateCountry - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f7107921-df3d-41b6-953a-4ab3a5dfb575',
                        commonId: 'd70088f0-1068-48d5-a205-8d952176e94f',
                        langId: '99fa37e5-ec31-49bf-84db-dcc637c6d3c3',
                        iso3166Alpha2: 'tw',
                        iso3166Alpha3: 'md2',
                        iso3166Numeric: 'ui3',
                        customCode: '9ngljbnz1g',
                        prefix: 'isc0w',
                        name: 'ewd6vxr2nkppzshal5t3i7mbkkpfo6xct7okl5dg24nv53ln3o1x825efy039qls9leu5dfzzjpkjv4g62pdmr2896iytibgkm0ute95dp1rmfutefq697b0hi6wispmn1d8qubuzd9lrnghg4anxn5aihb6akqfhdoh3burc838qrrirm79b0at24t2y133xxiiiavk8cdy1a29wo3t3plpyuftnoo9capopajtn5nzgk3w2r9hz094xgc67kw',
                        slug: 'mu1qgnjfluu5awxmrfjezelfthcpnyytu5a9yqj9q8o17tm04kv9284w77x7c9k8ip71gl097601obbo6t2jqmiudlpc738ct3fnbtnsd0p6ebapfzbje4ala3bqvsx3dqx2iib5puib535ic8iph16j9t8e9zst450hcv1t5ekpu0063g7g367jlljocxsjxtbrn6igyxgqfwynmrzi5m1ngnrbl4aiwt9sqbhq02swq0w0f7cpwc6nydw9yf03by7jfzdz11xnut7si2jxsn9blopxne6402tuaw60dk8m0biciup4x8m69vsnkeq78wdik9gecuddl6fwjq7gmhajr68was7f3g6yggpr3xmkoed5nle6juauxndjx8p2klju8hhjqa6loaom4o42ptg4y45ddch87vwc8ewjs22ykaslp42hz81qzo83ru3cy3kq4ssr45lngrle75ow4l0679c0p847bsbwf92jb0kh1486bba4p61w96cs7rh4t24gp97hz91p4cpo0tbo38uase3429xvwure3bn1ydyan5rd9x17etbq8tap1i1m9wjdo0qxcpqghzz5s71eixzm9tsx2ixax7v50qd46yr7ffq4l0uiw34rj5x35pojczscdrrjyw3pipg0ii7aeychuoaxov7mlat0mykae922daxnvno4fhjewgjk192hsyxzw6eprkirf7mr3z8g4uxubf5205aayhe9o3gywf8630ip2vt4qzar3yrf5nng1g6tiqoh4mo9tfp7255q3m0r3v8ega04t54907ugkdcc52e6qzyhgvieaqa0gmkqar2q00k1v5fnoeevketo5cln3vnci3w60xhzsfl3ffprm3om9u3p6nuedbs552tim6zycmzf5t82gt5i26v4h5dvyomo41rwvurluhysgopyjgp8ktiq4u9cl7c2n853qj82ymk2yao7n0hs0cxptbgtsttld7wdru9fe14eqlgk0wgsufnunqma43i0r1ix',
                        image: 'h5asyrpjkovv175yddk3punbc8qik6qrg9825m0l7wq46akctfla0tlb44sg05e1raykvkr827k6ksg38qn7x2i1ni64j90fcwazp0bvxx8nbhknvj68w9d17ca85emwwvu9qvz5zbtm8efq56opxcxornal01lqmx02dpv3zhp63jj6tbo8fv3p5j688xkq0teqg9591kddrefvqra1yetqphh9a62hvgow3axwcd8di5sigs30fna65i1y2edu24m4lzd0b17th5dr5ybjirjej2czshvrrl96bcmh1iz82zknhpk0i7jdg5znmgyrytfk4onf9kjocbztw8ufu8zh363v95qb4qdview8p2vt8z36p2h0qt97xbzha6c4v164mi5eakcvhw9hd7lu3w2yb6oln6jktnejpusr5lzqbm6t6cqdveafjiv5jwqyf4n8zvz546bhmicy8g8lkwuadqhv4atmambijx2znepp65hbtjjfjk65b98b16f013i11flrn57y51imkgowh24cuxboxx3t4svympagzw1ozf0axoowzrlckc4nxb8r3ykqz43vrqfz6picmmcej74y697xky3gqrk19c3wjhiezgttf06ol8pcvopiedot2m73md8jvdw9y5gammlayi3hn41hxa0qnve4ewdefl04boh4c00hp64ds140qpt4d9htiaob2kbuqd6ha756j8pj5w0yl49x0t5uro6c9t0x1nsd9tpqwitrnkcqgx62r5ad6dnr0i2koogriol51yosojbmtfcgm6znh4vud0l3ri7rykmlzkfh8hats6tfyzorx08iuvvq1udxmqgh2uz1xx27imb76d86qku9l3if8ojgotafkg7kelzyn4raotxhdpg7nt7xjklqhc5hm2fw21n9gqgzrktykm4g03djv04fhq90g4xcofd99x5emld48t3776w6wbs13ibhdtapkk46kd2yvg3gu4xd9pyydz0pxe14ik7c4qqn7hhp',
                        sort: 468287,
                        administrativeAreaLevel1: 'zyj7xq914a75it8ysdaeymdtafha69v9vz6a6422zvr38oqyj9',
                        administrativeAreaLevel2: 'ukov45xagofwj8pgapj54ead60whigptra2wufrd46bkrufazl',
                        administrativeAreaLevel3: 'et1j8abyzoqjnfaf4j3y438ne9ihh7upmovpkhbfa5vneaobhu',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 760.58,
                        longitude: 150.11,
                        zoom: 70,
                        dataLang: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01',
                        commonId: '589ff135-f87b-4301-ba7f-8fb6212c7203',
                        langId: '4f4492e9-8ce0-4543-a351-beea15c4cefb',
                        iso3166Alpha2: 'b2',
                        iso3166Alpha3: 'th9',
                        iso3166Numeric: '6xs',
                        customCode: '8ghpnfy842',
                        prefix: 'gycg8',
                        name: 'h6yujsqnrkpyti4zjt3lk5ewq6x7mg2lbg2lwsdb7fcxdbtdt80d9sxqacqbjozh0sfn0staiqwcd889xmrof5wcs0npr73cc69czjdvwid798pdv2g5jkzcvphuhglxh9lsulsw45mf3pu9tzf0mjpbcv7btimyo9nkq0pqamp5pqp8gi0s8rebvoyie9usxogg98nikwdv53cbl7qhxsx0p6s6j5j5y2alu86akvqqvb1j3pgwxbymt7vfa6z',
                        slug: '1dk4y0zzo8tqsh34y5ljkuwmjyfa4suxxf63qkjjwy3j9zkd0gxo58s6kcmppzcmrwzb2zzpb7ti3sxy13iwyairiilth185k7bwk3twr7ty224jj1dlvl9o1kwocllscoloyisaoh7eqxfpa7oa32fryk49f7tpidnn5ewu0w9xn7mw1b8r7ce5yv2zy0p7gccel1ski2pq2a91ngjuamjj7jowddq9vcytho8e0p7flke9rvpa5o28tjrmqna2m3ibyab4dgnb3iji15l1uk565ezlwiv24jzzfxsr128hd62r5oq1yzlpz3qqaegjb384yi7wn3d74xu6j4mau1waszgtjq011oqjaupwmenf20sbn2nvaaec4id212g798417ypwaqabnnf516weyr44zi4ms2pnwrail5vuvxxyaruuh6abpntqlez427bmvrdi43k9lnf0tz0880b4kfkisvrzom5o2pihgfdbwzhtjnqkpgfuyowi2nuxd1eoqg8cgxcaz82tmwix14pd8q3m0pzt6dpmsw60xd3g2p1kp1qhsku7wnqzw7snm1jfwgd7ehl1jzc27ln1bvxvv5b8m4w9nnmpaufwzepwz8likfj9ugtqss4bttgrbmoo2p5tp8kpg27dl73aimqox7g5z1fj35zir1vt7hpspi0zsjgmbayc085tualhp3uzrhyjoaf79964871vfxplxq64b6l6jk5rjhrl0hbdvyv10ohny2zylakn8616ywyfyp2wruc4ians8pxltuq1gklw04mh2h1xto4agi441uey0tfz2dg6kfyeojgyqui3l9qvarp8di9n9402qgnrsaek1zf4mc06ekw4omfyzbh1ce2o5maljpbnvs848jlpwe8nkndlngnveevjg4yksk8w12gk6j0ih3j6oestu88f01ysfvq0634dfxj00g6n5hknbiojhpaaanl9ldfi6c70t3fa732ddzgu947v7h71n73bb0782soeo4aqt0wm',
                        image: 'q028vgsq7vpa8sbwx7gjoj1nuhnak5r0ovm1t56ito96eov6b4bd4idrxsmyje6h8zfl7keb7uw88zcmxokfo87vudzej0fevyt88p7a2l2bw7dqwmdt2fatmn2jiwly34eayen2kx9vmej3b4u4wfvrv7iks3dy4rdlsqh9gwb53bpi9l32peclpdpay9vc3u7t2dow0a2hry4i7v8ez69yoo77eep0b5w644qk6c28a6rn2iz25o812kej7u8wnbc0vs70r1a4qssythcfjx63mu7rxs0klevjc617pcs7scz293udn9m2mltp6ilo9eox68cpc8uy4ebbfs8spkb7y1l2iv8q7of9ysr8xann1s86w04yq80qseqxpm2gg524xhsigevjdz0ca801aim6piphqs38lnzfqcjeww9j3iz4xv5mbirj3rrgf6p6l5zdm05ypq5twx3jvadxlpx3mhopaf6oxv5g0tq2rgv6jq6oif9fwopuup74z8wozap7c15d5hxdtcgbjd6fxade7ms2etsq7zwh5h2d8kcvdjg9l4ydpldlib719utcw27oxoaiwn5s3y7qzgom94x6582ng6bdsm34vfy4nr930lnz492s29fmi96ulbtrcipuc0f79xygljnk5qa4njqb7h1yo1wt64plynbjsm49pldd6246euxf9168raaryddwq46a1tpmotbzu5jt8t5g63bdk27cfjsj78l8fel3fpw3dew7yf1r9eyhwepwnftykum43kyp9cw9hjkmru05uv6bmdx0srdf71ex9trx7dj7w9xzufq52bjyr6uukfqwwddf1pbs5r2plfpgn0u5osu9kvj758yy9a5zijpm48t6xj6v3hf3eckb585fa7remruzkvf9ehodwwg5yl578id2lmgjs9mhvl1x8t9584oie0pa69hb7d0borg2nie143djk1t2bq9i0mlma9fkkqbc0xtai7fkok54ytb9kdnbfbq2n72uk0pfu5i4',
                        sort: 958584,
                        administrativeAreaLevel1: 'rggl6vv499vnfquj6x8t51amlsdjm3dkfoo61hz8j94wmgvhtr',
                        administrativeAreaLevel2: 'wt1mxcgoo2191169i0mmixx7qbiburfzoq4ok6eqsldz5l0u83',
                        administrativeAreaLevel3: '1zo2vefz2k3hwrn0su99v15xqh68nwhdmpkxhhcpauc5k1u9li',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 95.48,
                        longitude: 324.48,
                        zoom: 17,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('beb1a0cc-7429-4a89-9531-f8d9ed13fb01');
            });
    });

    test(`/GraphQL adminDeleteCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3417735c-5464-4c07-b8a5-f2f45cb5f9e6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteCountryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'beb1a0cc-7429-4a89-9531-f8d9ed13fb01'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('beb1a0cc-7429-4a89-9531-f8d9ed13fb01');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});