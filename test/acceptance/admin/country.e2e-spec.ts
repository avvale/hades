import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

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
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'yc',
                iso3166Alpha3: '4ug',
                iso3166Numeric: '1fh',
                customCode: '3mzdn778q2',
                prefix: 'yc7c5',
                name: 'w7bi6tdqmp1n4b2glh01h4kv74tcqwrjs7edww59tp8lghdogh6k0kp83we0o7e9rf5cuexpe7c2oeftk8rwcz4n2e7pgoyjj80eho8m940w39x6enftntrj59wut1m6ls1s26o9prfh5enm5tbee3zs7ftlwdu0vzlqdh8te91zgy6363k8699nl2pgff9xxs1sc3it3xcx0x7lzgepeobg9zetfm4y9wyvqr6eup0v261vc6aebrjbvwkpysl',
                slug: 'i0chsz1g7d71gq6g42zvtkxzew8fh7uf815u5tu3e7it4tytxy3wdtm6a583gsvge7uwwadlw0vpfev625d8r9xl5sjnzxiiul630vlk1q823k27iwb87d00kyy5earaebs2cs25ggn5dgyv4cm32krltvt3vdfw4q1nnvbrm9jr77ldkp30xjzgq63v1s1scat6erp9exrxay9daayzdzn9ts33sdv82qylvijixkgd126fsl8c0fnk4o1rxgzypfshhh0vs77tmam32jsia9mdsslkstnomy31045kpjo3gf50nz11i702sy643x2h0zih1fdpyuf1hix4v1bum2ycms8g6swk8qa8yco3ol9c1mjqwy4ko6gj6y6whx9wfsjai4zc5p3rxsqkmmfoh9ifnistp27p4zge9w9pmsvq370p07ed1hqapvmpudpbiy3g9o3ariotscgiavyctiejxy5ysc5we9dm2yd9hkwgsi5xichixvbmfad6jjbah1d8lfxb57ka24omokpmp8bf0cc9zghrc7ls7p18wvwfsn2td7xawrgu5j1hcy12i9bf0u2hhqdidkn07dp9kxw0yh99wsn28gzqjj8kr3id9obtbihp2297y8vk7wt0cjr4szjj84bzlxbb6pyayah6osvg9xoyunvdcpkgpb31yro45x0m2ji9uvvlky8kpobfqahmzfqirucodwatac42pnm9ym4uv0m0oc5l5hbir4mqak7u6slglcv5hpje87i906nsfb5p1vpl8a5l5hc9xtpywcqgntwaivbfnsw84glwrduuyrab6qj501pdq3psyjhw36rvkjdn7mvjv66crkk5ytt2w3oubmhiow3uyfn7pg2vbrawi4uaagt0na4yvqassvdq1wvdf4x6t4xichnwbxqkqqmzstzf4e2dxzz8l5i23z6bb70vepu6s5x79amymn49rpppfr8gkiz1tnntukocr33wcks4u52u7dqpjwfzme8xauk39rvu',
                image: 'r9othubkxrg6nrfn33e4aoudqee57mz95yafyw53og6fblybhpisnf4di2r0ns26tbws7nuah3qgezk9bmld9ytq4x9yte28er1q60aw81y3l4gsos4gooqznyvvkzwykzw7fu4681a7em06tkgj6fe4ssyuep4kee7s13mivzs1wmo57duoyeqdvw86kne5h0rc4fw421exfvm9rh04ap11gdwu3n0l24w6q3v4ilwlf2wofcd9jcfm37gzs1qe8xkwmx5o336hi8t6mn2a9qopq1pj4b1ew6pp25odbs72s79h48kznd8jhzcpd3xs5xb50rx1zazmy1gux2tmffbyj69a64a2dm58iv77gsl121wwjsazdx7j1pujukz37kpdxjbgi7yslgjucc84py2oos8qsdcbrqra005vlq9qsfphst8rua0nhon6vdeb3v6991m6wb4bhe7fwep4a2ftcyc9zl3lhfvvqy8nowuuolhzgkmal8tg3981fvftodai60cft2obw2nddxcdi7cmdbrcfqgsxx8f3wnssasgmh8islvu6dhon1j02v1tc6ddeyrc4uhw7m13wvuywngbakyhuasi6rcgbednsto54uivozx9grrv32yabti6dz4wuxsaxtsg4j52atn26ucaq1h7n7wrel6shnrefpjw321bp0yv92jswcwokpmoo4orbqnkjp3wn7hnuh32exhznr2tq2j7v887mibe7szgh6cqqumfcsgu5d7pvfdcrath1byoctquqmyu5ml6j4uc4sdzb3oq13g5cbud0dn19sp4iyfmdrxed8uddwfgc2icthqv1vlzx9zjx2ppo1wguh89r9k48r9s6y0wsyd9xziqoc3x2ib5w5y3dv6e2vqpqt3m97o2k7lvulrczqbcghy6t3okwjp8fybejukuu0pyeu1d4x9087pfbc23pxceygpppv4ltsa88h7530nnsl7g6r3egt5y7sw89hp72v3y5t3bd7cbhcksjqd2',
                sort: 844953,
                administrativeAreaLevel1: 'ejm0dg9a3ecumn21qh52ic4807m92imux3m7i62ku2m57m3r4d',
                administrativeAreaLevel2: '5kutfv3ciypefzj1pop8rzvmk5azdlhijohtfn4wm7tojmn0n5',
                administrativeAreaLevel3: 'wy0x4f4b6vgj6hldexbt01rwmtj9bohdrumdd58wa6a6afit2u',
                administrativeAreas: { "foo" : "bar" },
                latitude: 705.11,
                longitude: 369.47,
                zoom: 25,
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
                
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'z6',
                iso3166Alpha3: 'w4v',
                iso3166Numeric: 'teb',
                customCode: 'yffmkw1zra',
                prefix: '1zi7r',
                name: 'h1g5z32mwhm2xqsdx5j7pbkfe7kwpzj3bqk85zni0thniceh4f7blyo3br6bj5htxfj5jo8mbearfv0rntre4xdvuv4uuqn154u7sx8a447drxvpt73dbqsb015xj5tqg6b4kiyinzh20rvwcgt5ufs16qlh74mpfp8h5xmuoym2tx02g7ozydjltinmm7b7uo527y4v7h03d3f2p3lkfgndyzpp6nbygc9zpn6fl37j184paa5jnjj04rpvexg',
                slug: 'gtrlub3wcsuqqy6doe16orkjfnwnlnmzma0xigfa78j17o98j41si8eogiqqzmmubzvsfdc8apjkxj7u04qtsrabrw2amfgu2p8yfw5p4qwxd2otmqi8r759icxc4848igduzp5h151jza9m5vo648hmceza9vx6wz50n6euj11fu82d1cwczsfrfetndq6qsfx98w3rbt12k5zqdo6awx5z9fva3h5fhqfbmuou3vcnj4ly5q6y3bo9rkxf43ds2tm7m6v3p9hs9zbkcgvpgrrx8j0snkz8gizkgz3mczkf9xyl79urimr69epacqewcsek27q9awyzy69bk96ybnsklla7ohyyplnnhcbvuakgod6uzgps5ulx3mhtt271c1outlzrq7sk9tidde981tdaosm07ejpk4d5z7vyfhvf9x51nyye4k6facly9f9j70fpcj0noe22zoetbsc8ntmclzqklfogexu00bzgr2zdywvvqdqx5z0272j5eum3knkyitx8s8tozhos5c4vsmw02tekgzf5unj9bf8nt9jqp003xcimevpftu01uclimfzgedrdtugcot5eeczvzl0rt96vmt0g8c59qt1p02gq27j3em8m4lasvdhtfy8lweln2lvz5m34m5esaiwbmjiogwf2x6wyxojy76z8nvg0ys6tih3n0vohuwpc0hunwjp93po5l1sauf9fcyuc03w1lyb1bkbgmpnfgqga2cw4lphdyfg0jqbctlw2306tenqt8gctyh3ii79cab9d7c9uuek5n2k0d7jvpaavabqd8ag0078hg4un8x6w6182diheux6vhe5hluzqwi6b1p1xnxa166qbt210deglwok72ypc029c16x8mem9ota5y387uzo19vt91r2wsmp9q1jx40u6hho4t6uggh18n58g45kljimi1tio6rrpj7h0nff3xs87l7nd5sz3kdz8up82qoooydiknn3de4r064qgk6j4u3a82qkduhahbcwi',
                image: 'q2mch8nwjjnzywuz5hhydlp0nj52cjzs68f3cj5fjs31tpsi9x0h2xcscer2zh54qjc556gwpp7utstjdk7ahdm6nboec13grz7nafu1jpus7b26k2hky7c2zxjez01qtobwrqwzhn9uqk8wx8pavber6o1i1ltcvgo309jvia5ly6kfxzuludy9v7wb4clv4a7frft04hx71hsqdtekro9pltpco7mhia0xgnwrkif9voefminf8i9rcru69f1m8kex9ld9h234izzulv9gaikrms0tc094olf33ozbpqa3fw7w3655myw9avd8tyj4788fovkb7rfp4fwexvb6fv9h098ans2ae3rxp8a78iodzhcleo68k0pghg5a328pyb7swanl5n4qd6sttnyk5fs2v8fu7clzhnnyqxxo93tryqmnnj2q0qv0lbi5idgdczxwmxpfj7r83jtihjg8hcp45k710x7j1qvlt22bcqadqsv1wobow7kgyjyvkt8rhzva5bdxzlo23nsli4n4c46thhl4r8f6stgb4kjnrpb135rf0hz1md1lti51os7cte36xmar7mm3ofi5grdf4z3ur2uv0gqo5oeyzlpusrpk11c2ywg37lbf9texf7n1vhbmtmjxe89kn0xp87t0dj4q3x52nl9sez9o9flyh2yqmp0kerxzzlz8jzkqg8a07p70orki4jp8ipm4uyr0k68zhbpddb6l9uh6l2ky72bqqv7puge0fvfr458kqy2jkjtgrokh6e5br4dc4m0vq31prr5p2mybipnx0dug06bxybcqe28mpohik6lzn8wi5ubipz52cq2lq6bqs3uaxaxyeke2gjcjyq6xbh73ouc33uw9rcidg3x1lu1daclt9be9p7bs6cpj93rzselb969ugzdiue9lvs7ncsqpoq7q1rirlqzolhkuwt100njuivvzp2kmpp28s22kovgzxjo8bozemywo7iw2yomfkrtnj8wbq8sipraxgcsso3y8',
                sort: 342519,
                administrativeAreaLevel1: 'nlpak7ub8u0ooi2odkkwz82211yi6vn3c26t07bdhl5mubilb5',
                administrativeAreaLevel2: 'g1iireb0nnbzjswbghfegvljk9hv0mwj2p9d4uompydd3tc5vr',
                administrativeAreaLevel3: 'lgk40rp8srmjeb10ue07udiqqgc069khn1y73zj4ls8vqjg1ac',
                administrativeAreas: { "foo" : "bar" },
                latitude: 263.53,
                longitude: 57.68,
                zoom: 52,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: null,
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'nb',
                iso3166Alpha3: 'usx',
                iso3166Numeric: 'nip',
                customCode: 'lkhtp4rw9c',
                prefix: 'afzgq',
                name: 'kb6v6bn0ntdz7a523p7yztwwttudsc0u0r0hqilh7fkj6pfidjlg0er0zequjysfaxb4v3w5w7jdccrdk84375uk6zkfbbtvlq4ujlxw6f1cjwdinuc8jzhh1kjq01etxfx87ffnwfpvx7q0mrbzu56ubc2w22tl2jf3li5zacktijsqboeojacgx7qn7vliot8drtykxppoz36gb7q2cgln2g18ju0vj64otevqhd7fzai7ya0dtiu952bt00n',
                slug: 'nzmb1j6f93d04auobt4tbfs7axmjx8fioz9xwsns646knsexusn9iynscmzuj8w2lqe6yswk9zcsnpfpyh6jmvr8tko5d0oxk9ux16btif5ikvtneibs8qepcssblqmesd2c0lpbbnx2r1ophlii49w71slhlpx24us9drw6dt8rklnmm63t2r04bu0b6z9s6yrrzdz4b46kxb1hc4034rsubo7z8jh8heel118oih7w9y90yv69pod2lhjtuloqrywmhwkgm16w4cxjx8s4a0w4ztlrqf5eja64kqc2y453ygwq8hdx958afw9o0nkyucsbo8fldrlnzqqnmnshlovn65gf6hjlwr2j652m5h37athh5qmhz6m4b7anyzcg3oao3iyhfi4yw343uva91stnsfillhz1x5djcxapey8qk7tneu0cce8gjyjxh4j9bjmbor4a90enyowcx0s4qb0wjwrs5hbocc4nibqr4sldxnioh975r2hvqj25omqmoeraetzg9gjc4o1rzjupcno9z7qhu8tuqujvlgrjq3ac3se4n71j3u62q0maqt2nvgwy63gtzg4hph29xh872fjxu9ldn0iinx7c3gsd856rx3kvkq1nxakel6wr622o4fngmh216ncm0i9603k6iglzon99hxed6g4wwzjfwt93t3vhzi19w4w7h0z48xpxk22e64s1pn00v7woiakqlhv4bnr6ny099fdkf3xcrsrx3pxnlrujtdof85bqijmie22bp8e5tfpjfomstip7scz0tnp9jdziel9e6n4hytryqoqnep2kvaec30db7k6hvv5peu10u5gedpjj5imnxb5vd71rtcj97xkph037144787ryuovyljlfdnanv4itm3aumff3yrqeanm5rkf7gd8tkau6zcfm5ksf07lid969gynzpw0fo4b1ebwr9dai55j1ffyreqsas6dhpy4n2j9yto8v0l8xgmmbfsd5z8hc775sjpjoo2y6ffmo0o0o',
                image: 'k05iufqomifauxxn4ov5sk1o9zsrfcer61fut53r9ne94gcfwx6puvg4qhe77xq52xr36z7nnw4k8xbybh893k17hgtw2md5hn0tnl4cyq0n5zjrkiv8t8fbbdi5dhjc4zsm669lj0sdoozkujcl8d62zx7fzdbx98fadk4zvfgophudb7uhaqv5i7g7o2nm7q8oe3o2qf13wkldpencs2i64wk28d1ypug7s70bltr76a01trew59aabz1efnm227uo9rkx9euf0syhm8tfpjmzsmvc8217lyrxwdk47p33b8oov7baq3ec7uwz052yk3l9fpm8z0j85ryv2foilrqaz6yk022zb2ev42awlspgyb71lr7niseirrmil1829r3udd659ygpdepjp0umzd71ij64377j0zbg6qxgobf77u5th6y9564kjj4ndb015y4qyn64qzae9698lflbk1qqcme8adng4nb90hvpm6f316ebuup6ze2eyvvjxeq7bfl6889l7e7osx9ctv9cjlociyp1lq1citedhyy0xgq2nnr4g3fustkr7ubrwal5lfrajrxiozv4pgzmvqra5zzdr737wblwax0lm1wbdga83p2hyvqhlfv8r9dzuq76mfzo226uqe62x8xtaon1b62pxg2r0412bs8qhr4yc298bynvj7mpjirogjvsmlyo0vg1cf22aa560k4c88nkbx5ub58ofhlb8rmk7212y5sq17ec2xbaqrjn1uebkaq7gcm2pmon6z2gj9r2xbpu1pcpq9n7wynz5z7whb0xxe3gdetsj3mmbhnyw46oe9uhmifeos320bvhuoo0kwyrpcqmf2xyq0nbzfagxa1sbcrbgg6x9y2sdmqolf8h4i1wfojctaffoioqb6or3e93qf0d7i7wro0udiytv1gxulgzr2qmcj0lu6aaq1su21nrmzdm1usftte0ojbppf0y57ncheyrhrmxjdz7nckvac2l007o55ggud9lfo7snmot',
                sort: 847114,
                administrativeAreaLevel1: '2uf65gwp1rq8rtwmtgsqlst620sc0t4eof6z4n6xx2q0aruc35',
                administrativeAreaLevel2: '7s4gzzcld1p0pam2mz3gu3c3rapp6ebu5b6ky2rt853qckrvl8',
                administrativeAreaLevel3: 'mfk1xmo9hidcnz6uqkq5dv6ocojhbrch2zzym2dtdj0l0o8zc7',
                administrativeAreas: { "foo" : "bar" },
                latitude: 866.43,
                longitude: 536.15,
                zoom: 93,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'oq',
                iso3166Alpha3: 'sbi',
                iso3166Numeric: 'p08',
                customCode: 'kqktkk1ei8',
                prefix: 'se4de',
                name: '6fxdrdpkgybsskn3imt9mrsenng09gsphv7g54oobweszi7ows6btjwlc8judb964nmvxiwfvocsa9d6ue3fspdybro26ggop57nx7q50py38b19o70mac9ofnzsbllf8vhn57jjattpylxld1gwtayk8sgv7ulmoavswgc76hh2dv3h2uf9br1ofngy4boyd2x4lo5g5vxvu6qmj6shzmlceuk86mmdc6py8p51z6yz8siongrq5dyh6bbm3ap',
                slug: 'qcza3na2rs1uf2fxich9j8m7k8j7gmq89k9n8sa6g03j1g5ejjquvqhbasilcukg770bqq7ks4tj1zb8li2zpmi4hlo2g8jnt5cfnfzqdkvm0o273u1uhf2f5ms5yqq1lwyks6kq4isudfh5g0xtzta5zo39flfpkkf971sopmkd481stl068pue9bdo8gzrllr4uhbr1rv6egbqrxzfltoqhc8eyqpy65zzh67i7he927971dixunsis3r2uhpjuo2aqm0db9kh7hvibhvdlrne6lmykn1x0x7oe3w394gzvrwaur6bzmdpo12s0geg9f65koyazz4frgh52om3ydsbpvw3x7iagr3zhmeh4qtf6g3546nac44jsnzz7gpvud8nlv9ub3siphzfcfmlgvkstx6lwoqkr81sowkuna6vpgv7mqvxhc5zkcdeolh4bbsa78sxxoq72uncmu6m556as7658yb7xlx2zfsdd9adyooll7tl3wzr1ekrnvgwet9tbhwla6xm12n2vozxioli7apeeue8t0qee472rvwank6lanhgrwohhcm69eh8vlbt2tzga3ttcuwhc0jwfsg8n143sqtz8ameyer0le7vfl9r3daof8o7x95u9r15op1xok74o3hc0zlbmp0tfes8r0s52zi0gy744b66d5vow4b6kbak5s0kcut7ji99fmjapj7mf29381khezlka27j7fldo7toyzztlggsdkk8m34s81ij0l014fqmf3zswhyyv4uur06uopdr5ng3cmhuvvnhoicyceghukst6td89952t3b9hhp8s8c02i2h3xgbi7l6rul3tueox23um5nth4g8p3nhfuryguplttpdurc6vu7l3l563drbblmh6dqm4h57d58ra0ofzipavr8irtvfgmzf2j4vyi7w92u0q8n65258i7vu4replpzaeggw038df3r9fwzuk3gvyl3zb3liwea77c0gsoow298uy0ibjxssyuukq61r98bb',
                image: 'g8xzbcjhoa84snl8lkkupw0g3njhh1nfyxmd5g74y7qikvm9hyzans6whjwb8q2ag5bklhykeuzw9jaoyv7ewjy4r5hxgvzcas9xvwlmbykay5hacz9zmaugiugs2xi962oyhq0zmb7c1165uiqb6dd266kof6j5s9lrww1rhyjm5q6nm6h09f9yz1m2nk1505blgp9ecrqf9v7yfwdf1o2281qmcgh0kijxw321r30wxg9wj6lz7qdlcjus4ct68gq1q0qpjopzer7i7d35t89wxwn2mgh3h4o203chb4qb0pi502unsgpd61ao3c583fgk9ko7chr7s21cmdtryq079z2b7f8pwqi79nve7u10tynudzvvlnlirqo27997lopm3vxwa1hdnrtbr26v66mfyw0pka3ml2s55wmckteflb5953y514bpgjto9aer6956k5trtswgxgt62wl8eq30dmhupycp9ylgk7k52j50vz90xpe7ti20r0y5rxgcz39plx93xrrrz6kmrxrg5q17u00vx7eu8hft9i2vxbmsstqkteojhu1j5wg9mvmbybx8c4tt103x4mq1dsr6gvw781v2jg1unn3bpzglmjh4xce909t67htljv8uxf2uapzhw03o1kfr146v8y2ugutx2e4rmyk387w9675pjox85uuuawofjj97wr3p6nudglv5dzwc824fji1jtosxhnscvx3x4zu4ipygzbhbowxhxzms1anenunx1fxgcwcz3o0nx0i6z3xj9k8jj9yimygkf0jq91rhcha1hj357gi3yw8qkdv0jr40y29m711effdi7388chm3ovfzdc5tjj48p51d9ogg30svbaf13dtya5umqq9txzkp51vilxk0tgm6hm1vx8euq226qtabtt7ca7zvw74ozsn61jhzzjpo9xrqw2yub7trhpo0u0sfczljgstgfidcgaccdk8psf46zjx53v4cn9o3eixupyo8i3l5ecjk6yjtxgccvsr9',
                sort: 675493,
                administrativeAreaLevel1: 'qeyfa8rg8whhprnn85p44tmqzdf5f9r6jvgbc2weqvfq2g9et9',
                administrativeAreaLevel2: 'lu2cs1gqc76xk4j2ljji300c4thrtqqnkm6hh3bo0hj6is96cx',
                administrativeAreaLevel3: 'lr42omud541h523yfxxuz0o9nu8bqqe7x6aszj2v3lf9iyoej5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 803.18,
                longitude: 643.21,
                zoom: 76,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: null,
                iso3166Alpha2: 'ci',
                iso3166Alpha3: 'kbb',
                iso3166Numeric: 'pbh',
                customCode: 'j5kcjngn5h',
                prefix: 'noqj8',
                name: '5d7rhv9l7o9tcij0hcwatik9h6rqgfcpdsv68xyogb2advwm76vb3y16uipvi89a01ve18ssydvvcslmllih0ut00v4lquw0nragykdqopz9fepxxa9enozlpxiwj3ux62k6wfzu3p4y1ml13blzy2174jp9l0hsh32de8n7ruciq50y27sgp3ekevnq3ve8krcgdtgeuelfwpkhgv7ey1sltoks2xsrhhhghtal5rgqtise4dnn4xyxwcgdb9a',
                slug: 'm703duhqyb0hdmgsrzbdhebikry68qqc7b8xbl8psxyecdcmag1eufwv00tckpyb0hh5ismcqjq1hycp055jl5cv9eibgm54kt3xfu5n2ytgq7k368toj6ql433oge99by0f1hvwvb2wmnz6jwa6ypbe49aynmkhkle1188goholkx4a2bi5nonrozwumnemoevvircpua5u3ueelj0nv9wa0btzmjbkci9yawfsx9w8i6na15xfv2ukdij6wbjbkanhlhvfgpa6ksmlw2zgn4huilaniq0i4kneajlu9g8fbcjto87rgonmeae8cri2n8bdiqboczj1ozobydb9qkheolbwleyvnsn5e0edsmbpuy0163cjhippo46hvondobeity2wui9stafuz77chbvdfh3hq67esla6qyjg11jv1l642hvopvor9xfxydu760c6ylvngoapd8ueg5z4kleoq29m4bkfwujnnl74933g96h7alb4bhh6mx79uvzx5ral9u2t0quh595v5qecr28ixnv5g40oye9ofyvtsd2ifcqvgeixsqebp0t258oeayi3bbr1cjqod23kvmu6ao67s6l9frcxc1i0uuqgmz42l4ka7bsy8y9w9y8g0vzb75pwlmrg1akbj96run57gzrcjc7d9ny08hgb8te8dhujj76uo8tyz34osdaq7yugi4sogs4bgkelnantf1esth72y4erw9swhu5m4rb8ygahe5vxyqc07ylr9n4wsunigs3e7iemcku7tqy1aed4dtx7oyemij72b7x8x23t2qji4bp03vspfml6nqbwvkyegttjhusk7dgqymenx4op3ezegupvhzng301saxp03cmk0kpncbcbdzyqy97lq2vvfghkm8329l24deqj2cb8eocejufx4t3cgsv09uxpwn0mom642jric2yvn0t4qilg71cosy63a84a28g6yi8o3v0q6f68fkl4bwb5gtdda12bm8o0hg2u8c5x3ksbjzdw',
                image: '70rnaqak13kkyjubxnluuqgpep60f7iqfb8na7umvgezd6tyxo02lbwnbaptqetcdvs2ehlwwhdzobldsv717lv4o4h7h5t3uqfh29z423476xjmf1fch8v9ndpqfhr7ai5bdbxtcfpjt7eof6ex94075qg25rko0uay9evae9v5ll7w8ezb7rcojl62ich8028qzrp7itvpcwqvz6cnjvle7sdgh54jm3jtcx38t02h2m70ft9tdfe09x2gxxvjlhmmsthdnr0xa7vzdm7wxcech6ib4swl4rbomggkdfuzqjopesyrpj7kpptoqnpfyrxwiitxq0k1alohnexerl9xd5v3m9j3d3meyp59b2cn2kd7f8juguiyj04xjsyjxbmqptps0x7hc757ez6dy50dr8r5xpypqjjfe3gfz2tsx6ap63x8tt2cqnigdx0hwrjo5uji9j27zaptj4u0go1y8u5541bv2zaxd7qotfzqt4f92uz308dj1c17mov3fa1pj7ogmnjdrtopbzpso3norn9r9reoqp162jt4g08c9ewbhwca5jah8e5978v4azis6yobdzt7cv41f25qt0n1q787jy1blss56sxnlp2p05o7e31wawwacx82p9pc4guhc5xk0hgvjuersrjhjssfn9ubo48guro7c5xr8hjljcbuxy24qsm3dua81a09xy2kekkmekkda14dtl7cnu6cvezeq7nyr3dum9qt6yvfh2ju95n9e5vj0w8gz3m5jda6hi7r7630d6ep4ltq932jnw2gdf24sl701y4dckxroi004ulx854bo6tevgd87k3zn88sn10qcue0gus39b5h09n0xscq13qry9qsmquwl6hgpjwseyol2iqj959latg89u61h1hymvcnc41lfl53sg2tn0uoqphwptvprjtib4ltrg3matho0rid7600cx2emdphnm48fxtihglz3uitodesx2r5gm4f8ys1xm1dbduvxzztvyicghqm7q3p',
                sort: 662067,
                administrativeAreaLevel1: 'zswxyextcz3p2qg8qlmi40ykx7ao08vtjd7qk2urxv7x6ypfh9',
                administrativeAreaLevel2: 'bvasrrntflztyl0itjsv4t25jltvgwawnotk8mnz9xrrd2o268',
                administrativeAreaLevel3: 'sftp2mk8u87qwv4t5bl1psautlyu6i7pcc7f0u550ckdaq7zlq',
                administrativeAreas: { "foo" : "bar" },
                latitude: 516.63,
                longitude: 168.89,
                zoom: 49,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                
                iso3166Alpha2: 'aj',
                iso3166Alpha3: 'fdb',
                iso3166Numeric: 'ikn',
                customCode: 'pv7zjg27sp',
                prefix: 'lkucc',
                name: '606snw7r92tj0xtidbwakjpdwefe7icgou8bm4ppargwh794ms0i53vua934k9bsza6uzp9ttiua012o9ederqjlbi2r1fsi2bd9we2pg12m1q8149n41xu1zlrnrdujuz1tvfgyhg7cti8czjeqnw0rec9ujb0qmw7an0ni8o3jsj9jyw2kq9zlishn7lnqlwwma64zhdbesitjd6llzngasmjnc8mjfvh4blwwmdxqawuwrc937pkh5bojm53',
                slug: 'pmtz2vfpjevke928us91oxnkwycwmi8liqeco2lzkme8gycseqyx7194i167wuge30l2253ah845lfrqutux4qd5io9kqrrys23i4e527dr9546y8em7ts5foo5pkn4hwlimsjfweaq2232k66pmv244dbvjg3gx0ou0jovm7rxrrfterboafj816l0tziq8b0s7ze77qytvde4cte12yt0v7uvv88p6x7p4ba8c1xeiokaci0ihshsgtrg9jrbzlpespx2dion6la6omy68xtcmwcptclu4v3jkspwecdtikca85kvn1wi60zta75xd1ea55avqz099ilnapetpmk8g9dilavarpdy7qkljqkkqxk04u8rbu5q8dzqkhrfkuxn3pnkidincxmrx9ovecd3uv71yjvdcu82vkcel4k2ttxs64ah7zakr3ghqst5z0b7asizljoqbblhd8c2d0ir6m43pfcx4wm1nowdvv8oyg453jm4jy37ztk2n3ez8embgj8hadv068wrgwzswrppamsr1d26wmqnb581eapwv4m643p6c9r1f2dt60otnmryceodbzler4fekz0djt92echp79sfohjd2vnjyqb4aam16hwb6qokxj898drp3rhbd7l37mfdjbjkssm8jwxym4o0m2qouhyp9pvretkp0e7v0xt0ojb0snslrdg2upmf15jqf9ir5geh4f0dl49a5ltaoz10nile5rd5j6yz70m9jvldxedkcfnmdrhoqn7e33e2h7db97rse3nxlexyg3zn2qlow6bx2a62wakg9qbu0jk4mnjsdiherctzf7rskmcy85u4nsmasebe498bnx7v6mllv9k7reaxkqez4myn46gl7m08i639j7cjx5le04mwut9a7agqptr4y0lc6jbbrneg3iwbsbvlkhzty2oox3w62b6qby9ikpwkfarr03sxslbg9b9eyja0yl4gfvfyt6fgkvaz6pl8hgbxmn0qv8hnqzi0yt3x9fx6g',
                image: 'yp3y9dolrldsp3pco34t9r96r0qu66tdia0tot82kxmx7vlt52yrselpvfybcnfif2e82h05fhw1ntzqlz6xukkc1yovl8h8nzcn1xjzbebutn3ejyt8aqst2mztt1kp1swiknfw9og0uyr38hkm3j0qhs3vdjzvumbk3zzstvnx7qfe5xu1bbwbppalimwdh7bjjn3nahopnhxajcbqeya01npyp6sgwkitnfz73vkyldjybq47b0lwocih536m29xn4vcnnr9u8smycyq1mw871kyng3dgqqn0ead4ld5myj0uy04lspin58lq19pfvra47bkopj64vtuwm86b74kgdnqhckhm43zfn37i6tdp9chud5twajwmgulp1jv6byxf1b4qbb47ygq03wlzzpdf32btfbrzeaa2nqe5cyzr2f1kl7jxewpu5ydyx4c7t3wu76b04e0hoo3h2axx5pc5bbpyoa8ziq91taexdhh000edgb03943t67ur3uoc759pn0ey6l8ye1rtvss7sa49ia5z3ymhjaiw8eg776xz3m3xspydabpqi5mmfe0urzlzui8ruhzpvsd1txq1h24jvicettne66shgdugwn436b2aanlevfiyo2r1ghiry660yqpo02391zti74tw6pw31xgamjroqr6doz6m8yfm2itj3kv6trvqf8ph7mx8cozlmbg7stfwxke7pdce334ue0p8dq7j3vwf7apukk0gjln8p2ylkyyluf714jt6bkztv8nggp5h6fbgsfi37v2rxahy14b2w5ulvw3bffio5vypfe8mblsdcqjj1ioa7mgkhraueoe03mrr4exw1hu9reh16tpovb0a5ilxex5xojpjic56r96yfvnd29ergwmkw3jtfsv7klbqwpzyxyqkmsd8umuu702uums0m5uc8gpchd1bu14ex6r0u7fwrp9422npbnz84i1699jgv3aj4wir5oyg9e43upfac390tdu31u878abynehnjwo1',
                sort: 108207,
                administrativeAreaLevel1: '0kej2rfajf3joloi4qibag39f0ohon8sj7okhh34610er2soro',
                administrativeAreaLevel2: 'c4wcmto061dsd0r9boey0syigflbprupswywnwa9hktmhao0dg',
                administrativeAreaLevel3: 'how7xdcf9at8bk0oqn8uo6x9vdhjovlju4b1sutkjlad4s0q1u',
                administrativeAreas: { "foo" : "bar" },
                latitude: 360.75,
                longitude: 779.76,
                zoom: 20,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: null,
                iso3166Alpha3: 'mj9',
                iso3166Numeric: '3t3',
                customCode: '6okqxy8417',
                prefix: 'swhmk',
                name: 'w7499o2hwwgm0n2pcw6z5qrbrc2bnw4kn508pf3rl7je6vzgxh2bsjjud6x38eismyp4ijzomomfl8d9ikavrvo1ggeq14khkpgrnh2zsejg56ps8hcliq1ikkm5rkdeslnx3b48zr7d8wi5u1280skuxgpoh4eczgdophp8au1zg94dvo7lch1knjug6ghny94hdyi8wq52xc1yst8qm5dqojtgz83kdtavio0cgczki4l2lrq106crbze2o4q',
                slug: 'h8rq633docpepg5ek71uolmu6t9kyih0xbb52rp2p3xpt7elxmzhb4epvkz7imm7yon5siuvxbuqvafnvjzmddi0uoii409d6jsutypkqktmcnngkyaw3h7y0ryl0364mvh0f8hpcmncq4yzd7yuelph1fe2z5sm8ii7w3qttqqxhjmjr4vwri0yq37hf7o6wc605dbppailrxmqvz1pm7l6j7ktdturd7li3fyfpo1utzvcfpkc761a7u7fl4kscjd2my4mvet69bla94tkrm13ifhaey6rjyqq9e9s0qhuuaq2j7fy3705j99bcmoa1tfogpfn19ifhrtkcjc5mzo54zkhxr8ma6rsnp6a2m33llmx39itme48q0jssiyhw1286ohftjbhplst1xdv150ckn7803g4qzi12vukv62c4q7lmaalvhv137fkn8wgagtc5rfqs91la3aju5440ggoo5425bi9skhoq1h0yjesj5cl0x4mrxwx7ekqcarjwikpn9y2g134gah5rn38z2q0ky43pz1txrx7ybx9md7u9mv1upqbjfbbnnde4qglep53mt3s6rb5nu4sftsuls5m2c8amf5rq8xtot46mgvlbcqceoekpffmz7yhw3ibr6vvm5lpap1udteqc3y5zknyt2yit7qtfw0498znujgytj0lcgcpe3zeme7gzifad3whbltuclrmxo7hvmidowj4qoby1ps2agcqm3sjl9chcsxdvv12wxxgka6p8f6qx85ny1medi9bj8cwiyw8166799b40ctrho0bka26oi812rfna0bu59o6knhupeks56vg9275fk97fx4dbkvl86dz3ikpl1r65lfgur0kpdocaxmy1idiy5yob5xeegdz5fxs70cmee9umd7q89qef1k5l5ul84j7bo15s6uqnb3xp9vq970oskdbhm45pv2ohgyv6a6xg59y3hnfrk034vnjpw692rsco2uuf8dtqdqflhgvf4jlzg43rojytj0e',
                image: 'yrsyzkf8654q8arubbubh495js72k0nqn3e0irtlcuzo8p4ovmggigv1bcu0qsadyxiqfqhl5i0l68w8vkh67pmjxfq6e5a84wnjhc1hwdoymcxulalcek9eq5vwrp74gjrguc7g36cyg0zaf6exiyj14vavdzw1sl5ofxvhwqb16brvj1u6sxuet748785lvpyr53jfjnvw5j8z9x3y6ubf7zqiugou4l1pflj29umv0wpwc6slhs7txd2ptf47m8889y2cw5lyw6rkxebo0a9sxulrddvrnh8y313wd1p7jq5pr1hv8i4mjsjycl5j99c7p2sq3dikkzjx1al293wzpfbym9byjte0ucuc5a1ufgr140qnxlij7rvbqgwzr3hxfa42het3rnt3o0t1ulyry26971bs6ayzhiehzwu5ucxu3ntrawxlzcdd5mtz6htnvrglbdfe34r0vj56zya25q70bkwbtan8s5x1u8tdgesmzd7hpr8c2m5aeuafhhc5r17btd6c1maevznktui99qrddoresb8yja00ff0k3e1iuhvlzbk24ou0vnhm2wtgnzc6sjmpbsvj5b00l7aohtgk770xvkg9jhuowuihil61wqs3pif8flm6tttvm2tiufmrhpta2se4gkb1p4b0g16wsjd6ohbcpcyrcodhmqhjbo5uynfuv09bm6p4j232iau2q4keopj4s3un1zuyx32c7s589oxdi89dnf9qu88ze7edaeu2a2pg51cjpczqlkcit7o5vn4mitjtt08buqfyjdloq4xe6ytoofchxnaquo08mgmjfne9dendmkbjjgd3i3li82bcf37pyr35lnk0rpv6lzx2tc29dr4gak5wx0ummf6wp4anmol1y4bf041vvp20890gcbtci9n5aq6qg7eipwg58kk1mjz7bdfgcrgprom94h5nkt20i83bbvrd0ex8wxe9vmr3qor1sxhcch2uxth9717mw2fpdhnxvtgea96ff4lwm7h1',
                sort: 627233,
                administrativeAreaLevel1: '41bsnmf8jf41zpyta61lr2xltij1v1wsn6xch02ve674y1j1mm',
                administrativeAreaLevel2: 'kvvh86nkbtz1t4w0onkenhfo6x3wmczrsdljubd685yvo3bgio',
                administrativeAreaLevel3: 'djd569timcl3f42bct5ytabvencxqveha7sxsz44ifsbm5b3bq',
                administrativeAreas: { "foo" : "bar" },
                latitude: 268.47,
                longitude: 183.46,
                zoom: 19,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                
                iso3166Alpha3: 'sim',
                iso3166Numeric: 'wpm',
                customCode: '8eiwt52dcy',
                prefix: 'c5o6z',
                name: '0mzr6eqxlro4dab2w5go1tnd95pcinlw12s9ogadszkn6fpba59au4niiimzc0m2woihtp00htum0smjyrqumnylesayzhkqhbm37z7jh4xzzky1ns9445bpg2f2r2culyrppf8ri4cwq8cyodb6of9u4ogyrtrhzml30tvrms0ubz0jsviij525lvl2uv061uxo2xo592hnwp2ctikzmqand8e1yd8ukhni3zmbns08prxv3i6xffakedvnzv5',
                slug: '16p0pdei6vqeuvhf5aev9cabbsu9dkzromt799u5v65xn66n3f7i0agqhjox4o0b8ogxez31flgwtuw5383i4qorg2kh42f4bwg7u5dg5s518xs4cjbwqedcbpcqpgz6e9p4cmnfc0x6u2xl4picm0u3dv8w74ffv6df64ca5ggcqmocd3sitakla44055gmctz1cj1iac2acnd2cmurz2m75iamiawa3rky4675dzbvon8v1bhtyrtxelqaf2mxc584y91xdof49n20pi3omi8nco8ujpbxlj3m2fwvfhga41y4np6h6e8gogrt5lqe3e2o687ob5qb0i5vua5588hj6bx2ystow8sbhggswlbzv12fytnim4k0c2t06onun5kexz4lhatg8nqd6w5z9vi7kqjfreabrh1q0iaytn9gkug8lkvybv88gurh3pai4ia2e4gohm841l3h5omb363phz44crduudu5sp8x0qf9kqffz47ioxy8yon8246xmkelust570cbmrkdx42q1ikr5rl6onxjiras8dcz6ykbfprzr07ha8vdeltvrtb06ksra4oqg3xbnk9lc8hrrbx2i8o7f0l5v1cmob6mm6zymegcbcnuawo585mdzhjw0qg2i8p8fhvxlervni1i4yyjnqdone51hn9la72osxie9na345ftp8m6ezh1mslyfzaxg5lwrq688qll8mhvl1tqbfa189n980o5jgeupbwlfkwallik05e2sjz9y2mn7jfd47hru43chlxu97sm9qx4poj6zig2340l0pc3dz6q8rt18ziavoaqdt5031vp707mu8vy6es3mi6aoa901iqtc73c9fthgc8sa09pi3s7ch2swza3frlgyajr4zf54l9ztl0w7dk5hf0oknr3ou6ejrpmirsdkddj00l1l8hwa7oemqmjz8isjhzx2afnkx73duobw69dzryete8sm7stkd6mf5qhzjvx0qmf25c8j1hw6ib4sohhpydyimms',
                image: 'uudbmzirveekzvt87vrhbso7ohlvjavpoio1rrjpbyn0zgty4pvxmgy4wto3e4ctrbdkue2oc994ic9ve7vergleafq0j4dv670l26eyq793uu8qbzs8pa9h4qgzuq3l8wfrc9lohrd5hbwvvb48yxrnb1kanl8iq9zt8nprohvixk1w7va7978d95rmkq1d9zkzwlu7aeolvyj2hdth0cn47fl5defqtgr0fzlkqo9562x2eggehpg98b0l7ticz7ygi091kobzlajdly14xb0ozpp2gdrky4t3q02j0um8lvedh9112kmwg3yuv9pic4mcxbzpdy2b5325raln7bd4la4r3m59i4jwaz7qt6x7q3k3o4ozkkq1qen81m1vwfe5qlu1vrplpp664r3umf5c6atnxraapva47tvlrqn12g851oe20fo631sb8igbrsv248vyj9p73rda2npe7foy2vbdk2cxa8cf0up83rm7vgoc62eplta63lqw5orecix2gwqpijrjgifv7gl46vr2cno9e22g2701dmulknc9w3645k3d8occ3uvkwhzf8zpc1rg2xib3cqv3b3e08ia0gf9xzd5tdifosnytvl00x4nccrjuqlfjmvnrbfvy5xhxpmm971ev7ba9kear4f2tj6ig9bemlsgtrfircc6mlwbe4uwgvvzj5374ml5793mw68buf6uw73hpy5j7syvfr2vy5g29prhqvvbwgfvrgxp7psvlgqee0nd5d0kgzcnsrai0fh7xt1t6hqrvn15s42t709pqnii2ewup59tahahf36vkav5i2ei27sdfdm4ibe7nb2elsmywcuadebyl98p61cjb0wnjrgb4dgzh3y1zzr4pvbetcuwwi80zrca1cvo1uyn2uam7ash28bwxdbrrthib6clhexrcrkvl6z94uga6zetlzsmvswbv11s6tgopqxcu8bgygen71ynxazxuq8yja11sc0hbbavrjso7wjij6gvttvk1b1ou',
                sort: 394075,
                administrativeAreaLevel1: '3ofwfnmfbxo3wmujkk1xdfyt1f8xhfl2ophh864a4o9rekwgga',
                administrativeAreaLevel2: 'x6kbsacoh56cjvczl3hukbvkk299bwql015n4wqk0yddvs7bh5',
                administrativeAreaLevel3: 'glbrkq4l95osv4negb7iewpeqrdlsnhw0m9j6n872rehcroz82',
                administrativeAreas: { "foo" : "bar" },
                latitude: 351.27,
                longitude: 9.53,
                zoom: 47,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: '0v',
                iso3166Alpha3: null,
                iso3166Numeric: '2z6',
                customCode: '0c6l54olq3',
                prefix: 'gndxv',
                name: 'd6hvo6j4u263mq4hhp9v5p30rrro2l42daap6ltwsx2yx5wppjk031105jqry81k5ubd7p5ku380mp65f1nuiwug1edaw5fm1cnzpa5vg0c4k5qegy2t6xi10m1nfqyp7ke7trotqkanj70esa7171i64caq0y7ihcyio8v80pebp3fl43umdim1ys18qpd31twn1dvkd2k0hngcbk15xp8iex3dhfc28lvjpvmc4u1v5dw061sc9anfwozkg6j',
                slug: 'tecdvuh6agr6dvncxkii01jt1ojcoeiri4b6d3bw8lsk0fwyjxepm9wr5o3zcuc3c9883att5xtbz20xu4ue0mu5898zq51a07e9im7gm92vnbe63wvcig2cmx58q9611g12zg6jieo97q2jr7669rodq8ysw6f6cj5n88gp8jzl8jfilaq3kn2qtnlbp4kpkko4edgw4x7i2be38q50ngwebfhlu6rgkunjvxchq2kt6tirxiwdfnwbmk4lvo86c6d35osqm0o9jvc4ymoldaxe9q1qz1zjqzs0gxvbigovwfv5q9dm6iv60gdg487a8bsmcw0thn2hm0g5aiw3xlrp3gvi0cncibm4h0qyprm07n9icnucbayiiz0gybknteee6lweb7l8pko5tzeoe1mgz9cavoyvp6ec5whqsz81qpstwajb9t4c5rl6ief1cqix5q9uhnav7hyk9ypaixs18ltr4g8bxzh0iwjfwf91p4pr6kw8uzb3c9ldqe0y46f02eipv1s20fmgexufzzt4ku06tnn0gwwildpu4zwwi1fdar68xvct327vim1uknlze0vu17w9wpioifp2mlfl1b19v9sag9t2zd41tlsxg974yyn4ravu3h8snlxk5wlxgd1cwqfu3i1g3n3l2ox5pi82qx5z2k57bmg6uqchi78dqxafakq8uymjqm0zgikjtgqiij61okk0v0geifxjmocsy49dr6bqxvl0n4r6ht37074cjswowkchqdkrxdeuhljlg2kibcb3styhro4an1tglf6k7ssyfue05qr0nn56ksodmpfkgrrmu7he24cj9qooym98fqfofuf0hry6pftayswlreiqv83yfrh7iyz139e09vjks4jzxwoi9t1w10d6srrbbtgum1hn53mx9gqeo6wnz7u5yosu4pschuwi2e4otg3amf0rzl88g26jrccp02qpp32bvbe8w7smdza2ubu62u5ns8gjzpxun8va4d8nv18hu258ig6o',
                image: 'f8g45dowk3baqdfl7qilvs1qbn52smpurw28ieugibxd1jsmlfd3d47zupssrglzcsfwjixrxcs4pp5ro1n8h7nlicrlaul23qqf5pojhiaf5gmq94k2048svadi10eb4sntyogbdstncc1uwq3oc4ja1vr9e8px288yh8c3q4wrixahapfwojx8ffqxjnaaeeahrt7qhr49146ojuo71yjw5gh5dhe278y5i4cc0705miwp2ttqifwvko02jfe250gkcw1rp8aeivp1hw2atqiucx6etojecbbeeyxgexquaon8vk0nla8pb38glaug1f03x2zhv0tmpb9m816havd9vgc70ej3pqmqx09jrqaxxacw1poplxtpxvln4985x4k03zs2t4we2ahg13mptwussln9bvnx5i6j3m9sx1ykdfvayqqfn1hct4ykbswx2cn4pdugoysmkna4mjqcasvhsf1mjniaiug63x9k254rqjdh8ulu01jp36uezpc65ac5ftbjh6fn3poi6udyth7zcgs0q7oz11uesj8yu5kq38gl94tuk9cpdk562oz6dp17ttww8fw42imv0erp1c9odsmwy053kw7svquwrzf34dkt9o9q7iysy2n52m8pjdf05vps6ayidp9v8acb2t5808ebpos469pjfxhye7r4c81lyr96znzhpm324o1jzffl1zvrh7dpdhzc0gs32baqp7x2o9mfuroeofz0vp2s2g10vi3wxpuhtwhrrxfnrerfz8xjpyatdl4fj6jjhws8xf48zv0qd635bji3yb3tb3dcgng3vr58pzdftxx09tihj8vkbztdt64pennmxgte2fhx5j7pjlb1ncafbl96chnvkdp4k68l9omp4aujik06sh3fptdxiqb2r7vn3fk2g7zrwmmi129s14j3kxrdnnt0zv8wo9pzz2h3yti58u3gbp0e0tc3gkg9765m8r0d5d816w6is63deoyp4st3f5mkt23skmwo0z8equps',
                sort: 809748,
                administrativeAreaLevel1: 'figi92u6r5h19aspkbmrly70rv23okrpu51yiw5sy3y3rn8v58',
                administrativeAreaLevel2: 'kdqdj5zx1kxitahfvuswhm25xp4hyy9oycpifyopohw7zfygek',
                administrativeAreaLevel3: '3ldiakajgn5i4yubod899hz465liu552fje8gu1rqyot9lcc10',
                administrativeAreas: { "foo" : "bar" },
                latitude: 482.11,
                longitude: 420.45,
                zoom: 99,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'ru',
                
                iso3166Numeric: 'phs',
                customCode: '2jsumq7tjs',
                prefix: 'gpjqx',
                name: 'z8jeyrvmaxm0xkvxj6s9777oh0y6k9x5gabisee5q2pw41zygw6udok7bceeq36pk7pncypbmedkra6zihknctxrg0ber1rthu6cq3i23ptxzqepbhxc0qa1qnl2kmq5zxh9e7s4fd6914hft8fdmjrwe4x7byn48xh4l1lqp5ukn829u3m8ajjgs79c57lsnzpcyjery1nooup757xikzjwxzvdyrsxhx3fycx6d6xxy8pru9n59ud98pj0xou',
                slug: '2wjxamqcpe2w54l9guy5feecy63es5kzonpb2ktjw5j3l93d7n3sc1wwsisng30bdxtbq1wz57ik8lwf6bgtltzbqp5y4r8fvqszsxhyisb8ejnz9qb2y09g4em2817a0s7h6kavoa30i935os857eothlu8rz2lgmku8lcav6b8xctzxcu7dpxhc3ls4dl0c0z208wbgbfifwvck0tzm8mx00fttn35xwkzq0bq77gcx7ron89ilugq7dtvt53seuq47rq6zqt8p4hx5p9yy5kcq9yqqlymh0md3lnumfkr6wkacvurdo0rsemdi51a0reaw2cflbo2a97ftksl52oyx94q3zcecnoix0sk0uabcij6277o3jthztrtx6swb2ryp78qhtnkbnlt6nl0npyvhba8jv8j1twnsnrh9rw32egab2qpa3x6b5vyyoz6mlr0bafugipq5wkjqnvzhq0pfqq025lhierse95thxvpbbifyhbbxrd9n59wzy25rw0z4qfbwq9q4oukxi6eysxfd8gf5sxpmfcu8pug3rbazkyddp8ya37y4z0qhabti27ynklioapafl2fwawqy2szocq2m7qcxgob0klwndcrxe8v46z5h6adlhtzwncbnrlzns9i4nmfrh15prs0ev44v6g21cgo8k6zs9vpyh3p57ofdhrrvujp3wpyxq0uuxan470xp45ytr7c4j6yc77lun0opin7893uhmkyid0m4mda8ucnp5xr59eholx2gum7y1jdx1onuv6zzbw4qm2xigqqm86yiwqic13n43pj4huwmwoqksxuocigwyyvjuxibf8vbfgr6i97vkiux7c7p9ygtyhaq3xemzutaaopczzus6uv9a9paz4nbed6cr0nuqwljcuynv41upran6j8w8qygiz8co6e683190dam85guaudqpj4hba77zsjoc5qttad6nykw7bwm047qq18w3xzdmvmnpy1or9yuoxx9ebsak6v3qu8wvaq89di',
                image: 'qmx8lxrxhwuwzf630ik8lwdxikrubc37c77lxdjgn1d4a85vk1tjpg44hywy4g8qvrx5hikpulwt5xajnuq5addgedn2oxykjup59ji6zww4ysckuqma36m1kkh75txm6igqy89aij3f23ymt3l70t5dey9nqskr8x8yfnnlb5ay0n5mdb6rgdit2lmp27yhs2dnxl314j99qhag6j4l3j8jwit708hy1ni6ye33wwr5didz49sgj9r5qi4rpxljywrjjww74halq81mj5jol7asazih0y7fdj03pwln1d265o5bfxfzonm3ktc1o0z5zo2izcqx571bmacru2r4q1myj60508gwd9at1etcj1z3nstc5w51wtvivg6k2j3inlc2bqgfll7wcebgus8drv8yz6kgl9ilzdbswjn8v8zx2r54irtyzcf73isdt5xjqmlo93boirgd42snp36v1hvheakxzdaamcc0ejbuxv216pkwcvouav4wiu4zt8tbsc84kajk6umwa1vqt3xse9n3p4rtnxcg32i0unvmkckz2kf0lo2qrq682thcf26jkya2zj4zzewcyl4d57n9xyn2o18r1z8jaxw3h90i1bvvjbw7jfhvyzt0vef5dnpzr6u8x2l3k2axalplm2ltp5shrqc3djvp63xaieqhbzsxkwadbaapj9jpz9f4b3sr5v5vnfn8w0r0idmb9zweqnr0l24laerfthtvgzd96epjtpyuuzczku8bygt5bkugpfcvpd87a9udblb35xcdfqpzrrfp69ygmboh7cyn4wje3sltgkgrqunh6rvcz15s6p4995pdzuc3iqvf6j6j7wj0xjoj6j47yi7widxqu3pn6otajw3mxxjw5s9vujf1pwxfucx1tgd15mnm0iujql2dpbdgeuk44t3k7p0tszr100vdfyuk79ut5gsihcpiafkzxx7b3tj3fmzem3lw680ze3azmnw2ntzbreip77q2mr5td6w1yncrkcf1m4n5',
                sort: 616038,
                administrativeAreaLevel1: '9ropkonch3mjdvx16e0p3ox1capxnve6mnmjeszuiwzkefqifk',
                administrativeAreaLevel2: 'ne66aof46mgb75o0myt6287vtpr0tcnpemh651gz5wn29rqmnh',
                administrativeAreaLevel3: 'eb696wubrw6te33cyz5g0ie8pov66kusieak9usv2i33bxgsdv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 2.02,
                longitude: 557.88,
                zoom: 20,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'h2',
                iso3166Alpha3: '0mz',
                iso3166Numeric: null,
                customCode: 'xp9sgvr7a6',
                prefix: '0z1vs',
                name: 'p4kqiq4jx2312ximkdp5ado3uhg85jzdyjd99di1gb8vv0pwmremwcqw2xa2vmrm0vmlx1utcb3qqptd5tc88tawq3yy1q20lpwh2h0ixpfg274nfnvsp2b360aka0t1jdty51g4wkdza17ttzj0q8kx9isopqpd9ql1e9ve8efeyu5h5ytfg049t9ifgm4ualus54q562o1najk7vitolv9sk9xie6z81dewgbj2pbovpl5ukkoovvmbazjout',
                slug: '1ed00mgj2c499ksahkyrnnrcgp84m1x38svg0nobgpkyrmzek2ki49eskq9vuxjyo1y7g77qcn6llwpo2dzzdwu98le9wxgroo9qcxalla9pshhk8v1revecx4dgp9011xenurf83blyu08hkpv55s299nk2ulmu8hdvmseu8lx3ed88sh99isqipi6julflhr2adeesfbwl5zontfj64n6n38j9g6cyousklg05i1o83e162yysbgzt62n4x8lrduor414y9fo2k9fbdwod98gxqsr01egx5fxp0ydns142mqpmzim9m2hyt1b6jt9ku98hfwz61wz1e4kmpfre7o6elk06u7xd9cajddzeanjqqotw65mrej7ufvqb93zs2hug3b15u87dn2ancxt0ypp9af2b0qfxba1izj7uoky453tzmhuglt8ov0ij4l2ycivjwi7a2xnobzp1bklwgssir0y6zlh7fejklznhgxwb30lr7jnmepaichkvdme5y9zhqewmufa8x52mldz4oxrs24z57vf2z7hwucsrzppt1k6x9rb1i3bkur26n3nzuihx3k81mrtf0647j94czujo6oaqstv6bx7t0nzi18t3czvqttsh5erfmtex57q4vyoa5xcbb9a00ft6xue68ka7m5krz091s7rryvyi0fi6mw44rx5bdwkssoeze1qm4ajum9qtxwt9pmiesclfxinfl3xhh3sy8jdbqnnotek4vj7z76j7v0k6ar7xaev8pxb9gx3ol2m4tjvlgufsp6j3gn8t9q9ntb7gsy74kvkorbpdyh76uvqq8f6nk8kx6lyysrm6d00dfajfv6eb9659k8lnlpzk0b2og9xncjdp85sja7np6m5ze4f2qltc7yhs11f3p0gj8x8flfzbci44j85vjuvcxgnni0x0fy6t9qif1hasjv40m0frubx6jxwx8zanx2xsf0vmxxryqeo17cj4lsqf30gl2nf2dsioaxbrnozhl8uqkgazuhrp',
                image: 'pkw8505irmkotsvya47ijl80tckc1jp9gfvgmi4akt3b7e5ad3mw9vrgk0mri2u3n9vyxzzev0bk6m2yi0dsav3pa46pwpv676p5vooysw5ao92k861n1igcxztxtqoqxllwjxvrt83c73d9zcf8yr8joqgix4vbefwhadtxufb7l0yla0jomj6d17o7xy513jf2tugr840holbksor58xdfnchff7t8pksdl5zcq5tayz97kk1mshtvn1ntufauzu597bk4ccmme3tmsanmx5pyqbrnt855ggyftztdn4b77091ncl2qgmvkd3puzsf8qq13vvxe8walk36g26kp0shub0j7ime3vmwo77yytl46edyxyfvparxxwgrvlia6tnda9ad2f9ehd6syjcm80bowxu43amd0nhn0i4s6r7haag641j6aiphm54ao0j5a9xpmb7u50eo6kgo5xb0m1iegx16wnf296qsf0613myguen2cfx9hcehuurir7f9n7cw3wcbyiu193khzuhrbo0b0v4uyiwj1llciae4u2zu1bjlgdp1dt3s7zogoa068p6odqllnerow8fjc7v6ueouyzsyylq8r3bt88qe84y6mn22owu6az41puzlvxo9v9igtf1azjhtumrsyj6g13q4ka2atfledn052jkl79s1r5ez26aftxekxezqdmyzqe18s9memt1iz3sl7zcigeej1xoa01h3umz90sdk6s73vrpy5z9yx3qd98m7v6dr25jxeteln34a8jy0j385r1mwiy970k921ujnczvh6ef3hhi4g490jmuo84rsrsx6wr1vvvpeymap5pf58gl879zc9wmm07jtisxdxftyd4tbic6uuq5lsjm05rg4bu0flvjptph5m30qt6x9jfhazmb2uejvc3o4gvgzhaatwwqnxdketqhuj5jrn1tzx6r28rg87hq1ma6poey3khihzlolgrgbhjqs6lnqazuon81xncm69nxcizee157jf7ui',
                sort: 198393,
                administrativeAreaLevel1: '0y6ckvpgsvs2ik086miw5hlp4r6t9mxdo61e8vvtg9gs2w86cb',
                administrativeAreaLevel2: 'hjtabayhrrpqgwl6lp2e5g1t4ukvqjkfqr9u7exsa58pefe5p5',
                administrativeAreaLevel3: 'pzewhuferb3g9ayjavs1po2yzrwe6r5k348j8q7vnxyr1e19eh',
                administrativeAreas: { "foo" : "bar" },
                latitude: 267.25,
                longitude: 743.63,
                zoom: 73,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: '58',
                iso3166Alpha3: 'm0h',
                
                customCode: '6qnlxav3wl',
                prefix: 'yuwy2',
                name: '92z7qwm56md2hqjcoxfw0kxc34i2otaec6hpxhx0dzf9327wahb20ky588idrjdma5t5aqdjz67ijze2tgehfdandulbqvisv40dhmjda9p3tyh6s05z2eorlxwjc79fjhibgddihi7nzmxaxes0hw9eh1kpwntdkwri4dva1fh1kwoe6dhks5n3zm4a7f2d7khaa2xbxs28hyngw4ob0wlg1595h690yr6y6mxh9g29njypwrifvw8kqmgjc7f',
                slug: 'mtxzky7pt1l2h1f9wvxjmnef03nid0buvk2k0tn1m7ua7adane8so2k735slpxrlo00fp90huyoxc8pakam16mz5pasdr5tgj15yuq9xihilhnpzov4gup85xyqi8n85jibtd8hxypywvt46lhffq0watq9eymdcgk7e1zduiozrlcwndapdr8ga1r8v70oxz3120pgxnsfg3ed9spweaamyll7ncfr3bqol64apil68mh8rcqk4wuc7psnefeww61pacmh704n1op2ir96gaun7nmrcfjaby02e91rh29shav0214yv4g990285a57g7di1nkji8ixv6ifeszva8lk02vr93nm6ia75sw7zp05dnpjv8ohc1j7odh2h0iegex8zm2ja0in72tgdn403pqdyjn8ubpoxb124kej90dz34wa6sfj5s62dblhy69dr8xi876d70majtcfhhp07ie1f88jsrhrar4ojvl2s2ghzv7hldiork099r6t2n9nmc2nogoao9k0m53a523g9elvb117skolbtabrz1mit0b44qz3b1j8uabfc6jvp99broaccriblljqeztg61pczaj2wlyioxym7yxfokc3rm15mn21eavgx2kkrd1kgyk4pftsqfmrbnnulw8fkv3xsbumiof5q2aup15jshg12gotgd10qj1j10m5zdmpdw0tfvcw3mw26ys9w0tsoowtcwcqp3nl0wa7ii125ak4iifdv3fozk8dzz82xcip0r9nojh972hyxbuqt7w9l88st6wmkqd6fqud7ntxz2geimtn016oyal6k8ip4odj8iads00so2x6tvh9dfca6gg8mygw3tn45yri8tt2mv66l2y8h4pl4gjpydu3tjrt6o32pgjgldzl5gjt276u6grmot98x4ktn2dvey43g235dufwhvykvnb2jojhg9jp8fwrxypqnlmx6zdqn60n5y6e4354hko90fupbqx3hxl0o8ssololyzeb1mez5zwys58f',
                image: 'dw9x8is5ae0qy7q80pxf6220wry75dm6t6mtm9n7zet9h7fp45rauvnct62mxguo8a0mih5sw9zlipfq2tg1p29u7zu97avwqqd445fg0dsvnmmrobjd7lkbokkoo3hnb4vvlgyj4iwrt7qe8l3grevoum4ghntf1o48p88h7t5jpd66k6firoxszo1w8ak4lhvyn43j44g16gn9nr2pvmpxoufnrlzlo20qcjhipmq87we4iutnej67l3yls24m9vfpfocrbxjzq3rfqxxkp3eq59qdxhztt52xah6qzahgf1ixxoj5xe2d4iijrajsnqj8913ys982c9b2sq9egf0avmg5zzjk9csypxa0pbi11zvrps1lkf1q1g2frsklcmkb2b83kuy5r871hqlqbr9rizc8g49nix6zg5gq22ihjs7ok6t4t71wk7qsn1s3xq6jkcew5ykqcn9t3nqzlm7krmfint3lbzts1cp7a3vthywt2ugd4fl82ddrg3yz4mkfvg3xv7nur11vvyudp5qflp55lbwcxgeob4eeyj1hljnfeck643bxzrvg3albv83gnhd9zo9w0b2ql3xu1chkxh6v46qb3bm3xq3p5bu7wf2jokuhojcf1eqwazvmjr9xlemu04vl10qw6a4iqayrl6608qe6st777skh5dpsswab3v8rzhxi5f6vswk2munsp5mo2r5ydp90ftjolfrrol18np0nq39o7i51eek43lk96mj6ur0dq4410ujagqje4bdqkc16zhppe9d1he0chl9z6nrnq70xhycabv225dnfo8kugv0lmyvcshobpxdd4xgbkfbyylg9oe6c2rtc4g5qm62rgzyzbc0tigc4tb234qhfyb047ha3t9gq0s4ijh3rg8ee131hyuwn6yh9z5hzz369knm938ywd0bf44v8t26mki14bqp7hfel0x2jqsr83f41c7z4pzet37lmixxo8fs66qzeagmdseegigf0p6xt18yxu9188796',
                sort: 271487,
                administrativeAreaLevel1: '7jw52gaktcxi9x2njaw1iiyid5bgpc2p1rzg9sf7bjgj4byoga',
                administrativeAreaLevel2: 'uwlwlw59elqbbeslj8u1036s4yfno9d307h4ikzf5tew9ofu19',
                administrativeAreaLevel3: 'xx09ez3125dcqz2as7a3cojd4tqawnkcws9teg5zj0eyabgl4q',
                administrativeAreas: { "foo" : "bar" },
                latitude: 552.42,
                longitude: 869.07,
                zoom: 53,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'q9',
                iso3166Alpha3: '4fe',
                iso3166Numeric: 'afj',
                customCode: '03f5xbspau',
                prefix: 'sotor',
                name: null,
                slug: 'ldex8kmywuqq8va32341ite1xopytp56slthkxn41rtgtb9hulopp9ays24url3jcop59j4hk82zangxzs3i3hh33gvj3wrn6mnr5fhaw3xby0hy5ajfz5cgc2xwnfnp9ckry2c0xa9p1ufqengefnje9sx4p7v5ylbyvinw1fq8g0wjqu2o01e6wtm2fttt9ey72z6qwfkedouprtq2okwaahdihpxsxqfzjuplaljbvxcv9g5jwr1nu7075ohjc5dd0w75lvhq4jcjrxe2i5iuc1ruq049r9kinm2l4o9slzpmd66vy59kc1aqm74yh68joxp048klgbn9indt36v5pej3auhwf66h3fdub6yp6j8708cosi93sh7lwyfahdmbjl323q1z3376ffehayeqyap87jcqsmh6uaqxsr0sdbyxcbpw6k1klxhcvgljiqsmz307bn1is8yenkzht6vrih4tlhsznpo88x1381epo0d1l9v606q5ynbx33kcf05przpdp3z0wgzjykqpeqxa1gxyhsu1fw66weerzf88bxsqhmsbjf8lhxklj4nun9l4kgf7sjnnr5eobhoix1v1vqdh3aujalkb17zln8osyi4zrxgkus9xetso60b0r92s2iwucbvq45690ihalai100klaiqay6c8cjl599beus6sx3kcylirifiskx0ozt1strjbat938t1buz3bm0xdzwja5lc6pm2lee1tsd4rfy17th7ht7qvf1iga1rl6zsz65kcyb13wx9gp60v98mzfus57djs984zm1wvvar5as8hlahrsgei1mn7rfvd29pgdfrxjgwgiedjh9wsr6quq87t7puggy8h4zekm1ev0lm3gu0caobed9cnzw6r7e1rhtrjhz8clvs1fsiitrwbsnwkt7jxe7tieoo4b9j0spwcklw9rg84b8ldzkblxkmzvgifecfk6dzzlvn4plw87orgl7pkjt6hsypu3hgr5vtijb399g6rkdk9ha1g',
                image: '36ac1m735ccenfhwyxemhzz5ulncjeew83h8ajudu61v7qdr6t4rzbrsnp67ncruic9xrv9w7qgqri6rzpwiyj6cxgh5kmztuvf3fy8osba3yu8a3tpns8jbmbzwqtr9aqw6nqggzqagui1ra284otch05q7aijhqj2wfgpxwp4dd783zw734covavi1dotl69dpcv1doop1fif63959o3aj1dwd4q9g9xj2hnyiot42xk5ybij0l8ap1giapavko0cs0hqwbqiw3yrtof4d41lqmi3g1xyeflytwsl9nld7jz604egxtk03w09u2831miw79meeendaz9zh5jzs3ohfi6iwqa6ddm5xdoej13vhwr4yl0fzfrd0ge177wsurpx3z8uvn71w2wqelhglf8b9r6zmrcp95jhlym5g0ete3uubyhtlxtx1og4q9jw4y01o8u2vjfzkmlneq23w4ag260uwdmrul66e270x4hmtnvpnz8fp3qr4vq7qi3zcml63hp75htklmhditvbuv4o5r1ln4jbe4bpcjb2giv2q7zi2xik7rzmepz6tq73yk2k1f5eu0dk692u7fecdht632jtvv51m4apnsa3k36aa64h62ldjurddvdzitlmzvunq5c2ypr4c32kt9ao11hpm5wbetn09mw8fn5i2azofydpefnm651hl4uyzo0xogdo14hhtdxdck1g8owgr1sr83a6amtsiycc52rqm8jqml9awzhz17kqppgs6wgv9973t0xglh83ufb5z5svzz4pqd2uw3ugnackr5cefvr08gy8xktorf2uaul63mrxwukf3bkwxzgijbdzzox5v1wuwcm60bb2anstcueksqp8wxoll00m7u2g26kanoyum6rdv98nxm3jtdxfyr0upvx5qa8z81tjj1wj5l8qi6o8cri1s5t190t5v42mgy89og3ss2vd6rq2q8gqswdpus4bfg9medan1hzujq4qhz6bsfrd6jk2klz1qjo9k4aiw',
                sort: 584888,
                administrativeAreaLevel1: 'jbq6w7uhntzcs71vmz5od5tfq3akspaf47yrg2l3lkwcey8sbq',
                administrativeAreaLevel2: '5rj2tgvs0mp3j3qj300o1zmp3jswplyt6hmgetqgv0ow3litq3',
                administrativeAreaLevel3: 'uqhdwdzd57t9u7xt4g5qtifv5wlyy5rrolgh9aweqvac9jl56z',
                administrativeAreas: { "foo" : "bar" },
                latitude: 150.56,
                longitude: 844.33,
                zoom: 95,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'tn',
                iso3166Alpha3: 'tm6',
                iso3166Numeric: '8ex',
                customCode: 'uz7icyqhkr',
                prefix: '2my0m',
                
                slug: 'fsoito5stgu86pccq53fh0txga1ms3ay4drr59r5aoh1u8yzuo294c1z2y72fe60xkcz3l9i8eumtquaylbmo2vnlco1r2s10iru6n2mluj0j33xoo2c4mnokyqup9xqawj3mqj3vk9p9thzcv6fwovzbrh04xhjd6wvcyq8c827njxgogc225z84bvflvs3v6862m5hxsank1ltk68kq9fq456n1ic7c6adg4x1fm3ndyita48jngsliqaye66w12zyit58sxzl9eqp6kaahykok9tvvl8akz48dc9b14nokmggtmj6jnxtwhej3s159stpgdephkoub7tbmlykztormr8zyktemc58kgx61wb042j0iktyphvflxhx3ackp6mryilldovs5i1n753btsea6urr8njqhdckd221h8hdaj6xccdpdwkb4z9asj02bbi4vrqsgsozbawo4qlw2cr14ukcl0od66bfx39hhyzzkypwj8nc9kjbgp0q33m1805gyjepy030twbcqlwdbq7mmzg02x5vtl5t6wtxo0zzhfknt272900ilg8zsx3jlzfib2mmsh9roqkfxgpkjjl1n2hwbhuwxdmg3yabhhvqdemq3kblz87zlxljb8a250mzbchmb1c2gnfztyrfrjl9nztyuhm32ks08r4zsjmd2imjqeuyr57n4w2098pmlgzdbb2rfn1n9zg6edkstmusg4p7l6c9nxhkf3hfzi7pf05hiv73l79zmo2g4mrhenvnl223eg5ynt8gcfq9vqym98f7aju62clunf98fm66wdhbw5yx1m5v4ivjfti95qgf7q537aba369g0w5jl9nyhjusnx28atkzvl5ehf24en0j7yc6wxr4p5t9vx0j88i4obhvref4nl07oljzmnr6yscizhp8j73cbwh00esfpnu16nbtdldbswxlawbpw0aasyr766ugkgn0cal70grh090zyki6bntbs4d5nvaouqbnsc7xxexqtg08jle1',
                image: '8ghfzd33kb0gkyv0xk5qfb9gif7gb1a4eam4tst3y58lrvb0jhoite2edjswc15jfef8kf0d0742diwh1lmgq6i024l32k2h5823yv1llhi64mjdvw6ahw46g8ko20f8ieh7kobqvkdut3om00lb265bjqaqnt2264yxi5ia9y2bxsjyr1rrioofyc3plmfmjj3o5q5ij9nz9cae7ywmawutl5pydr4r2n8yzkctbvkj3vrtvbg7ccgev71ere5nvcwm4negvk5vbvvd4ljmwol95sxo54nnxu94y0b3wvax35d33wphne3vkw86g4mu3af95eoubz5fkh7dlef5t9vge4oqhily1chfi14emzsbljiqtjn43qw7ju173sgecv0phafuhgrmc0n61obc5ekbg144ikichnr41zzfouzaiz8wd1a1b3st0ld3id94q8ijsm7tgt4ao5nxktruff5hxwsi74gy9w72hzp9v7cqzpbxcs1odrtdb8f6oiai6yn9lr0m3p7qzb5ap4og6w0va2va9aw7zu1eo9yd25fv1yrv21mt6fwq8l5njn79h6d9q90t0g502fq4x4wvd6j9xz42rd6xraunzyj734xwfzcl4f3inqrzweyn2fzpu9yi7bs8ieux7oyfs5prsyalhdbgffskxemkgfscc79qxnoub9gql9r9ks0j0jpjwexm9g3diu53a8yqpxrpoy74m1ka8k11xxege3ix69t7c3ls30tkjgpx9ulp7ma0wbp8p7snngc5b6fc3xilv462bnsrdfhwbvfz6f2q2cugurb4o94nc6gsgiutvnmdi1dmvml8dylrery70ink1rnqrotjxl4yujxnkh6geymu2ctqb3xk4wc6jwkrh1av2ycmfglp9zgz1dma4x6e9qvdnjbdmm4m6bzd192eza53uft9f3p11f2hv7chz6tasnhgfmxfl8fzmzdo33cqmpjoxj0ydqxg9eoggep25thme1i2g1qxcjo8m64rq4p7',
                sort: 691117,
                administrativeAreaLevel1: '5j7qy4155m0uvrjlockqo0v02ebc9ewj63u1zlqwb72wbqh6qc',
                administrativeAreaLevel2: 'roeuplifml7xuuqt6y5w0cjmzi19fowulr45p3eu29m5c1w4zy',
                administrativeAreaLevel3: 'jlz0sk9dsjvulqisxm1fzo64sbbda3mmwu8rqh6lqmxaj9mz0w',
                administrativeAreas: { "foo" : "bar" },
                latitude: 363.80,
                longitude: 8.54,
                zoom: 64,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'vz',
                iso3166Alpha3: '0r8',
                iso3166Numeric: 'nw4',
                customCode: '95x23eop25',
                prefix: 'xj6xm',
                name: '9e2hceo9jp571cnsaz18k833zcx10tmxj8cio3jcsyij6342541vnyafa25louqrnem8o72l2jnr7tm5ynov0v5smk8zn8ezknmwaedq9abqlo29fecfxn7lo8ylz27il0rk1mgrdbxjw19mbtald4k3ee1qvbg7t63wcksjhzihnit8hcfvlcr2zia1qn67ipsm8ys69fo67nyhyjw7qmefgn9owz824um5b45ex4d10wyfy0j2c7h0mewjq3j',
                slug: null,
                image: 'vdnldig6dmkgul3y2f0ryps3x5kcf2bg5nji1an84jtots8q1fk5m96srpgobs156zh8oucaa5dja4g2toobxevs05fxueawn2jjrsvuh4zizulnc4nf69kmbikhhiqmnfp9aash03s9krrno0k6hjupk7j93cmwmkj7c99c8y254znlz8dgaqlpqpta2w7yxgzav2pz6bt2h7leywpo7blzw5dc4iq0m2zfh3qxmv9117c59yxb92o2ot5r6qbm82c6pv5xny13jou44bvf6bb452bkn0yy8jw6yauxnsgh19abgjwdg8urfglz7h5r5emj0midrxdm4rfppskfmjhbh5f5p48cr732kaxdofdm8wq3tchxf9rfm4uwowbvuc0jlsr94yqo5mswovw9bm5e82ueu9leiqzecbrnofu1j9me9ns45cjw823742l1if0p7jxjz553dok8e4aszzbt3clhmumlcgzqge0no82bzeahnifpamlrl1kf6h5kpvff55fo3g51x0inbio99o1cslt9ntqp2godxiku3xbpzch2oipnivhwnv7bmxsyjar14qafhguivhz0jew53fj61kq7wgo9yowlb1ai871vtyoy6qzmkki38b7vqjg7wjvreuemt6zek28w8re1mn9p3ruouq7t57elvspj7nqatkwnyra47glua46p4xv9jzqxdtn44o8otmw11tcge0duzdf59hayxinzg4ppeqscr460ioh4ygjut2nyt24v8441h4ssaxz6nopppuq89kmxph5zl0m37dudqfx8u7xxvhh82t4x7etelis4sldmemeiim1feo5ei6jfcf3a68ae3od2o959wpvkc32k3l7cy4re1c4fsg6kylj3nqnyaywrdecmybmfh9mkz0icblfufw6rk7ttnt86drqwnfcefc5gqssxy5bjq8dj3eb4utuipoyvovkb13zt8ij6hc2xw9a9gmre8ohgknx2kn7c7t0lnuyyp1ghnn40bynu',
                sort: 109621,
                administrativeAreaLevel1: 'dxl388b5zwj3yn38a83syf8e0heyscdsm1ecci7aar1lrf8af2',
                administrativeAreaLevel2: 'rpo67ny99p0uig1afv6hbd0fdf6iqi73gqht0ulouit4r8ntjq',
                administrativeAreaLevel3: 'vgqyxfchepxyr71wmn5o8s5wuu8jf2z2h3nw9q8o3qgd1353py',
                administrativeAreas: { "foo" : "bar" },
                latitude: 280.00,
                longitude: 298.41,
                zoom: 79,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: '5x',
                iso3166Alpha3: '7h9',
                iso3166Numeric: 'shv',
                customCode: 'spbhzce6i6',
                prefix: 're6gt',
                name: '3j015ha6yrn9slqbbkr92vvipftbwbnmey36sveurag5mz7bd7020xncvn6hnbpki7u87bxbmthrc4e8rskbwrmyjz82bj4cq9936vhcbc3dzkn68ab0hgmj5qj54vhmxv8d9w6fj8gkad8sxbqg9skdpsywp38n12p2zo2upzgd8i13hit6uq3lw62fcu73mcxop7u5o62y74iy6tcjijo7vyjy8ebuie3obnynm6oetigytwrl59pfpsb2mjw',
                
                image: '7105dqiv017kfprzc56tr1m2muov0ybnjh3dqv8pq80jtofxdxxop7mrvzz761ch8btnluq1llbkcmzsw581incfyiad7w7qv7kg8ftrxtg57bzx25t6t1zcxy2nj3zatc7gtrjtbnctcxkqq1gdjfrbizbdw2kmgfcgnmtfrcdz6md9r2kceuelk6279wtmtvcvair6tluflkqr06hl7ubd0b38j55yakccuvrn07bzy2y26757n9tmkdfh9eft5r71h0rcqytubhi8q35zjr5uuyyrza0c27lxfanux88k52apclp2umxuzew1t1h8ijpfylkrascv4ut5lfd0x39lmdmror2qtjk2x0luqh3owlil93lf3v524db170vjmoe4o1kw17peuyb7rly404dx9c2vwmt6vngvnlrn5d79th4cbfk7bb932esgfhpcfhv2jhmvp6uvj6rpdygbkzi459k7ewr30ds84vl28ugj5qvabk75lxiozegh7l0absapyh81clm00vo7mtduugxxssijeb27gs36lmkyfv0cxy2i6g95quexms5b0g1fng050p7ju8u7yn6zo5locden6b0mb30vchs69u482af4ueksglxlq6xs9yavyujfsjlknhhix9b87xpa7zjuq1g2jqbxq14lidg0jaxx0cp5k5yqqabteq2wertovdwp8gcmcl9jcaylwfz13k49su6yiegximoil5xv5nv1cjcrnq3y60rnmheh7b6z7601mm4l9g80hs2lgwqfm05au46np3nw4x87g9gat74zqas2eykvd2k3rye4hvmfj1blej4rkrvt0qiwu77wjp8alf9k793ohvug7nhc2kwhgxprmi7qyh3ll5mud33qoggc6wstpoguj9ue9v6f60nrj8iuwkl12pi8yhuw1ah71fqt8uwksl2q0up3q36xu2bpw7t1pncozieq37bpr2nx8rqgr66iemt9lok64t2npchf33ap4x53ftt326vsf7db',
                sort: 416621,
                administrativeAreaLevel1: 'lynrb7pstv2xyhhcpk3b3eki21nrthq89rsgssq0xcde9kolc3',
                administrativeAreaLevel2: 'l7jexb0vly22t40wdnidb1apg63do2dkffsheigkf3ssgoac8e',
                administrativeAreaLevel3: 'hoqybmf9nifdb2vnkhdt8x0uvnxpros4ndn54cfom1lk3smyw5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 336.71,
                longitude: 421.93,
                zoom: 70,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '089f4je47t1rh2ietad9bl0ftkk04ps0eodv0',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'r8',
                iso3166Alpha3: '49l',
                iso3166Numeric: '12q',
                customCode: '7pk2xg40ed',
                prefix: 'gr132',
                name: 'lezakj4etps0xiej61980v380gdsvfr7qfg7kg9klfxj9em6pdjkp4ysddttsz4x8tjv1g695s9e9wxwu2xavy1mb4fbynkhqwiys8djvlfsmv2qs8cjp9aj44jasm7i98uu6slc2y4o7oq9wzworit0enk7ea505lzi6tb11qabh3ipfwn1djdzkuasx6iwaclmyfwz1tp1qkz36geqsrftb8nno0r64n74pgaec12zx0dloqff7hxdz3e5cqh',
                slug: 'mx9wmnvnmzije0zdweph4hjrv0do393tqeiqcvfi6eieg9m98qz6wqwj2mj8dp6sep1x7ctex42uk1uzjl8f249d2zb32qydbzmpbk6l1kkvafct14mtuta8ct9hprtbvtyde5veqbb82jkbuctwi9opwc7zjha5oxfoknolv3dqpjt86sv06br96qtnefi1s0d9d4koiyev4usjmvg3mh0tshqcenyjp7yodiznitvn5pmwagmmofg1bzw9ysms1vjeiartq4ucwhrwpvjdmn1dfq2oo6x2ggn1gxzyztrtd849iyt5j85nph1h6151d1be6bfwjbg76h91mzk6sxzrb8vnue1cb4uj4q3crlvd4d303rman0g7795h7bqtmedf6so6q36xiwd6txvo4vodf7vovmq6ldmfwgr2wg6os2897r84tuq8rpdo1yf2wkiglkzyssifvtkxpuravfko7kjf2ue3re43pj3nirckre10nqt6if2shs34mn8wbz9lxc6zzejnmo40xznf4woitink5rh7t4woo8tav4ntt3xvmvmeugg626riq646wm13yze15kxi1pbrwh6azka5kzxzevufagw5jc2trbng1dwwc3z53eou6t28phnh7h57eca2rgufspx8xfge1e6g46s2oyw9wcrs1qvchmw8c7wq13bsdlyqa7fxult21po2afz4m3fzibealcg7yupczepkiuvspysynltxrlkg1avi7pnslzvuwm7i17kjh9uh8cs5w8lp47lfcp1uxmgprobok97q1nz9l4m1jqlp9tqpfn6bj5ijw80fmpwbmdiso4pry8v0ex1agwnl753ygdjzxmpzqmiurlwdgcuos9clernkobfa1aycutzfrplcfhs417pa8br323g29p7930noy0a3uojj20m5j8koytfv75rrkzsgra2fvy7jtuz930j2v5ckiiuygkhpm052bsp1v3fi0f21zuanz20073b2iobz4pf6wmvqao8v',
                image: 'a93hddvc2wqbdih9yj9y2hkuu70aamtp18w43f078rvncrdl6ktb2k4z2hfxngr147k2yvwbn7lx5a6kd8wzuzmmgmigfvgkzs4jpkyhgdznwr1ever47bugm8rydk8qoqxehyibz5ajxlucv7fatijzy4b2bjl2orisev5udh4x1hyc6ar3kf9sivlmd83htay7uoliwb10uyrx1j2l84qclol43ah3raa1y975zblxfd3lyk0fpz4rf4yv2qfbddsdojrba1l8cuo59g67swxlf2gg8luy5pmxdekkb1pfam0e2pblwgryxc3wkd0zc2xvs5q9591ki0kc10rkac0zfxgtpr6b4cuc1jpylu4bmn7sej7n3s4n8yxl49b83eox36izp06vkxdpvx50geimciwa9k90jiwqfc3mbamlakw1tfxpniv2hlmwhse9y4xa6piapuhdww0v2zttyymy5nc897zpia1gzkz31wezmtod56ejofvwnm2qo9s5o1pld4ecwionyvm8ddh06o48nmb8w9861zjnuzlsjxjqdgbkz7mc26hpgcb2zjltbz6d6mvcwue8tohs2of6pjqqs5nporqvuus55e1u9eu5vbdvpu83hdr5p620vf28ug4flpsiyx8xk2kqka2jwc1fgg2c03utqmewwwtao865wxvkpfonhldi6ewuvvns00a8na1qvuhcj1z7k6yhw3uahccbmk09z8p4hfaug8xnogjnmtw7by1mxjwvc4qcfjemqzwein8w2gcj7m8js903olzvvf281pks6ev6hofil9g4xjfa74dvpwjtl2ysjbvstszwouau4b2zq2j92wv0wxg5r2xmwazebgddzz5ornk6pk0stwotedpx5k94c5vzvxg1zh5ucc2t8up3xmtprb70myg68reslziji90ee1d557itv0owjx2gm8dr9udrutolnine0x2ah1turptgyhlrl0ulf2mwnunm3s36apxd2jmtckzr2x60sunt',
                sort: 265376,
                administrativeAreaLevel1: 'jrkw5r77angdkrrhzoa9uv9gh5lc1o5mqviktxjhowf53ik0pb',
                administrativeAreaLevel2: 's34hcjptvdyaza1sv2gezdrwkwhb253a51fd9l01c0joww4y4r',
                administrativeAreaLevel3: 'cd5pcjc2tkbaofesmbi9l85fv1tkfdf2tciz1nrvruk8dqtnzs',
                administrativeAreas: { "foo" : "bar" },
                latitude: 819.58,
                longitude: 294.83,
                zoom: 31,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: 'wdn2tnhudcbgbycg7weyshlv0zagj4rcx3jbr',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'bm',
                iso3166Alpha3: 'cc7',
                iso3166Numeric: 'f0m',
                customCode: 'rc3blaq93f',
                prefix: '4nv7h',
                name: 'gt5q7ignhoo47bi7c0uaax78carte7xff5759044qigefhxlq45v3hlaad7o8na9sihda35mrtynbtf5t533aibigkunapirn4fej042ovo7nw255rvkxbw9wcoyr4zwvaqhy9gl2zoaah25g7m5he3un4xbfjgji12ae6moj0zqgl0kdjctj0li3dgb9wvml3eo6zxubjqn3dkzt6of9nwttskcgox63ipckjg81ea7a5w42c7xfdibyxvbazf',
                slug: 'ppzzj472whohrqcd7wm9w3wfq4ccux9kz0x9jnnl62oxua36xz77ertap0avd9vx7ptymlqpx2w1rc3qf133bbl89og5kqie1h0izgc8jojj027cmnxppdx7hj5zadnmr393uv88txrmx54hmc2wb1kaluey8prlpv6cix2xg9nwecb5e8h5j1aursqmajjlq8tc0r5nhsm6ieby5wnlvw4a4xgxv8egoczg3d37zvlouge0n9tcui22j08bkka36xqmtxebdxflgr892j6reet15zwvg99f79m686pcx47af9962038r3ohjoaf1a6rud8uavz4rrfxg6c50qwow9idnzwtqncbxwsm326gpd2tvd20sbxtpnmstn82n00akwqbjz1xrffsjuq2nf67187j76o2ulsnue70blxydg6e939nl507f23rhh6lbx1umwwlv91whs2dtw8h0cobj1xilyimio62491x93aioacmr46bdxv9zgh8m3w4u70s2mgp8gvmv4b9m1dqqeuvzgcc0dh96it779v8trgmezvlznanfv8y6clb7nhz8e25bv1no5n5gv2evldx0ug6d8jj0zhvouvy4bqcjzyk161szuj3cwrmsuswk4f0yxwpxl4iz7lxn25lk3squa4acv8rp0ze0qforymw8voc35zfxl6yeqk3crn7dod9nih72rrfcbuu68s8zdgnaag9ndfq91k4zetuidyitnr2hwfrpla8eejnjjwb0ooziln0kjqfi6xra6k3o2szq3b14b4pljmz80xa1rg8knqn615w3b32bfh2k1k60qaagbn0nnxj48ernchpnzp4280xnwzz5nkvaxh48wkn4iavhhb4616pztsyr16cpkn2pudlyou7lu66fd01ed9iy0ln9kvuh1d05de610gwiosc3phtf3s89zo3lhjfkm8vlj66e40poa26i9o5jvfmg784f3z36v46gj0yqfdi8ayxiee81ur8uwpnz4cm1tjj84wz',
                image: '8hr0td1y910giftzugfpuqlf7zildbrqoe7zi0rq1qyt0fbg9i88l1790b796tpq5crasfvllmtrc25xdjo5hppky56czth7rdvyzdm9u4skns341yruxesonagz471mkc3gh66u8630u9kj80mca5nblefyo2scasfqkohw4gs4chmgdcxbybx8hy80bed8kctal0ltzblwu6utgx1vmwjs6zt8zc0gn3s084ofrvc7mv341lxa339cj8axtifbj91e7tdm3s1tesskrmq98gxzd3jgfptq3w0u0nkr7wzkrf3s9dc73lzb9vur3bjdub4uty1mvccx1brm8jae9ebis39u5snuu05xwgzm637qoy2er56wn2o17jp6skvu4ltugcni9wia21fkreejx5sq3e1yvj4w670plbwm0r5nisoostbt5u1ou5oguc03261tz15rmisk36koie31ew9fxkss5xq1kdrb412u5qg3sp8pyuqeeq7vk1dnn6skus80scpt428qtvu4sveybix1f8bljjvjs124reyqy1kpq6p8qsskw9p7z2x5jo3uxugkctugrmo4y216tzerhmu1bkk6etm270fxwitt7wjtucmem2uh11opyvdt1dgwhd5eamceq4ja6n2fyvzwfbig9v2hev8i9rzhxuvgg0ut4r97y1nwgiekmzyutz0aetfy9pqvvdo2z6c5k7z7k2m87wv4apmwr4zz04fafrf684bw0wsn7so41805qt3aw501x26vzii9d36wsnqz1eb9sgsxmwpasjal5fah1nflanzdoykaru2wrci8zj0t10nf93kyrnlgwr9ds8kv5h7ciyeopffiy34ylvvwxkhu5lu7u1191yteweejnq8wpc6g94nl07umzgylvhsdb58dgtf3j5kxcxwnq2adgjqca7d7ran2plaaeth5u0x5famf5qtn9m4us5036hkvb9twi32qytyuuih1cbmduqgm01fs3qr62q4mab5bmcua',
                sort: 393832,
                administrativeAreaLevel1: '6kkjvh6pt29ot6hui89vxkwz81iqdweukis0cbionrlxdaori8',
                administrativeAreaLevel2: '8j4tia7rdivhc0l50zpvmmj6u8b3h55nhr9cniyj3sn6t70jit',
                administrativeAreaLevel3: 'hr1orh1xz2z9plf0sk90jw73brg0y0pbnghxkn990oghoa6uqc',
                administrativeAreas: { "foo" : "bar" },
                latitude: 698.90,
                longitude: 71.26,
                zoom: 30,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '9f72kap5gkeqkt1yp3mf3y3sectfmgjc147kk',
                iso3166Alpha2: 'sj',
                iso3166Alpha3: '7nh',
                iso3166Numeric: 'rdi',
                customCode: 'w138afu566',
                prefix: '7frsf',
                name: 'ben813zqtbwh950y1cnz46zen14rudh0sbeymtwrsjppz2asaela07w8whk76t6y8ga8vjv9vneaegbiqb6c55rqac94dwwqvhzmyzggugu5soujvim0k1kl11iavknsqtkk32zgxhp3y0r00yhitwcr77e1277y8f36r2ljh5mekrqpq8oma4s5ga6xinw57nnqbad8ergcxh6s5yb4ii08oki250yjshgzj4c33ny5iiko2f96q1rlt8pfryi',
                slug: 'o8zc9vgtp1swsnzkqx95x1060cm8153iclqhjml8h5w7wolvk657l2zfojt6a4gsbr1o9656z4j0z41vwnfco50ubaiu915dpfyybosb4oww1locxuc3cvdycrr5gh5wawm1uqwnhrqritcikntfz24rwwvlc27a5prn5ejvfpc85fjy8w635tfl111trxrfdjnkc56rb767yox4su8t3k7d7cz4x9erbk032vmrrhjr6694jfc4z85n7uytcwoxp1uwk5iu3alvhhc9fszd4jx32bsj1yrzoalih40fxh5nou0q4we2n8aw2p7nkepg8lv99tuidtim1072o5vyzkklwrqg9umvixday1dgtscxmq0nzxemgdq313nxyy81w31qa2eb9ccd9ctwe7skw38ecma0xxu70qt80yvduekn2ncga8w2k5c54qihn4q2g1j3xdwh2fwv82yasz1wgvim8rvcz6qsjwat4bvj0z99zp5vu3thzfywnhokm52u6cpxd6985jnzb0i7g48dkp1ubrgmsvgp8eem7tjxdvsj27rmx7ne28c36lggocvzocbqgr9l6k6h89coph60ae3j54j5i9xkp1pglexfjjw7quopdq13ye3giohjardg9t1s0n44t0ehoxiv5lc2339rn6r61ajul73yymocsdsqpcyy6qo2l743xsn3ltcf0zs960il1lyhte4qbysat0ikx9itq8gsoz70sqhgt86aablwao8gbeg0pmzevps261trzu7yiqmpl6fev6b0itzw5se4y2jwmm2t1v6uqhx973u2fxzn55ozxzsewm3fx2qdqhavn2z8qs97lzf2dhorrhzczwqodn1ccyy5nbr6alnjfzjuzwj8z3on86izi8jyl28ptm6t02g6e5fei3a1ryctw1z9qnrh97iftnwwec7ex0oex4iw07z8ufj8h0ge0eodc1b823ldozgifu87iq7dy930nd94phkxzca84ag5ezkhibyty62ou7u8',
                image: 'oorbgwhkc961wxxrw9en8g96c0zasddcs7uwu1m1go2tdimp8pxg0vlcs6r9xu3l2an9vacmgsc85ho57aq3ut2xteq2yc6ti88ig1vah4jk6fi4es7xdfjgrgyx7dr0r7mfi7fp83lfxxlrtwm0cwt8ax48dobdnwtrv847m6jswyp4fxrck7xep9bqnqhnvpfzs9gezg10vqwajd5mu4ztkpml4tu19guh6jsqtw7b9otstrshyl3aed8h2djerv7ibjwpm3fqnsvfcdojestspv4qsk0wjij4ugtmim95pa1pikyzl3jep1xuebkc8t1406375ea2k1wu8gwwiqsp9ufkhoveyjv6uhf8ym4l1nhw5m0hxp707kfv93683mutm5lrt94bru6fvxrqqvxxoupp7hiw7zsyvyb4l4u1kz3ew50zt9nmcn8okgcacb52fchekxnmkjydc8r662cz01vgx5d32ssw7x8yg2mc366hahlrd1f09mlip5ayfan251ejk6r0g6p4tg7jnbuyt2sjrmoa9wv92go1328sl3l53sxyw1rwmkjl39qau8vd37fqi720uh2l26rhfcuw2ug69jtid1kdj54pz70vgupm1tngy0ytxertdcv4r9z0jdv8jrchet98vhuisemtog3piu6c6ai3hkbop67pgnsjpf8g9730hnq3xjrkxbry6bbqlasgwqglwsjes107a7ekpzxko4fwlh6f2fpvgl2ntlsz4dae40sf7t6ii4kd1ezk4g924ol12goks4bx1mafjrs3k4yg5w3n89mtcy9748ibxlhh7eif4a0pz7qfc3gkzzde4ybh4cjucsgy90h7zhgsxnmtqkvke89nx8pett8p4bw7oksql39j2vcmocxu0xdtxm1zbyr32lhbj2wqn58a12tdwabs4eyls9xx45da4e3poq210m1ucf56a4dghwj0uj4u4v84pnes6upfhdfdjowztrzr02dbyizbu722saqvkffav1kj',
                sort: 260760,
                administrativeAreaLevel1: 'a20ghpm2o4eci44wcbuznb7jdyudku8lz6sd576pc4kl2nmtru',
                administrativeAreaLevel2: '6iizba00i119nl3gj0kw1fm15vv87ua8qxbhc9onrkj0fz7mx1',
                administrativeAreaLevel3: '0rlheojisj894pq7hnqd6iu1mkyui1f9onkb99spvftqttpmah',
                administrativeAreas: { "foo" : "bar" },
                latitude: 229.99,
                longitude: 580.69,
                zoom: 20,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'q7j',
                iso3166Alpha3: 'a2w',
                iso3166Numeric: 'aqn',
                customCode: 'yebcch5tm9',
                prefix: 'k6ffn',
                name: 'lyzemei5zqxh891uwt7q25qk3jdxd2nxo1sa46dqgp7q8g299z0f55qgvy559v75n8yogju3zxlfgffnagcvor7brq7ui8i5hzyim2lfmzuf5tr7z33nl51yezvpljtfm0napsqmcbusj8ldbix5cr11bjj2e83jvaaeudn8q2qagks3mnavb70r1hte36dz0houaevtawxgmazrve5ljumbrsswatkhblw2rnxwkqgpx0q3x4k23zhot6gtni2',
                slug: 'czoh46ud6x46pfpmkknp5hy2wx699e14sxc9c6kvgfn3q3aei7p7e73armqgt3sz3xuc8np91jywamas68da67iwdeub6l4phg3k28o5jaz92q2r8u000q6b9zdf9z4rqx5r5pj3ynuhh98yp1aeg543qinj4v8fot5r72udv3yld7609sit15il25gctdis84qrwqymaerzk71gziarbio55er8j15pn7cmtn2w753uvze52j6z85j40emtgqkvmb1iqyboa56i4jdumrsghxq75f54frypk4opjpj2x7u9tccx91ow0wlgx883w4xlxkm008918wanajklt30x1wbmza39apvoab4kk2vczrw1v7qfjgx76wcvbfrkgcox7bkd33f99cnhfo468h8yslx7ei0h31vg6yayu3kjo9jxvsg7k72475x6z26d023l3w2y0ovn30p36ztclb51x6lb13rnstsidfz0y4pks3rmxatufwxhllb3wkk9wpezhf40rf39gstf5x3acjkm9u1m7thx45v8it5jpoy4uke8ua3webnlkjabi5q6xna7tssyuda4ox6g8nlvxj3xuvanyde0ph3l5iaavslcp02cc7zj5o6cho5gelyzeetddwbs9w9bgbj4ra07lb6u0gxs0490ro1gfd4t8rhqa2v9z8vltrq64nkoh2j4ard72nd7esye2wc9ce77jc9g172f9s8fa10go2219nfvdcja855bk317qwjmxpgflreuzlqupqnd4ncj4o0saplxyldxjnfzoql75arzq6t0dnlu60bcxx7cj00pcoa0n3l4mu1p8drii9a19sc9vcslzztw7490dewcbjbvmt23du3cptp244t9tysvpw1341ngdg7u9h28cbiinennfarsbt3vlqwj7qlgv16y9ckwkesruoa4fpkw5l0tazd1grujxp7qyjg7bv4ys9c3sxa1s9t8uqeve2eieluy5kgedi2kiyeouafc7uhzszkt6zyp',
                image: 'w2ac707kqybp0g7aukrj0n63486kt6aupmzxl5rxoai4lp0fvcccmkmi4uuqmbf3f8lnvgcrvg8c277rxu1g455bcno7z5s8thqlw2fs7r8b9ehosvw4x2uhrjc5vndhfv5ez81x1r0tfgwv2q4nowvd296capk85ic6sy96k3tjrxc1g4z190tp7jrcdczcrczyevn62i9a0beyrbeb622nxyjsnf48lqa0edapje1sw4znv0i4g6gmyrrapcqm4aatut8f71hzj8guumx053vy1n6x2axr2hz6ob7840618bdvk4jq6h18i58a46nxy1bad0ucxskgmw7dn0xy02fwcwub9lvr853g1qkr9oz4kbsmze3zp7zb7j6cy14mypg91k103f562jqgl8rk62n82swqbfmszkl9h3elu39wfrccyct33u53yrvgasfxqbsz1o8dd2lp9n8fh4gf4cn7jbxef2cuikw29dzdn9e1jk30ucmjawgmtwj97gksu15u6s6o4hs74qum8h3odwg1s7o44zhhq9gfg7berr3uyop432r7lkp1n9xzze2fvq1a1vkwmfntfladl3o953wtbf3we2fqgm9angd7wyhhvplf3dlw3w5v3h5ehu2qe9t80jihnndj74otzbsnodf0ff67ldn5vjcml3gf99lic5cw6inzqwm2ud4kds03gplrlf7xddibev6mgqddjt2uu4frt8tuhdr29100dy92epvz5pk5mvfv0hoeojl3aiiwzmmp52r1m5lnea1jkyiufu5x7xgvcs2w29yxvyl42hlgd5xy7w3y6brwcat2muhaymsbh5wrx2l09b2secfyul9vlngl4q24ayfnayfiystivs76398wpjrfolbu93cwu73muzy4zr470vbza79swookwnxxruz5cl14ibyrzqpj1qbhgu8qvb2106knoxs2ejampghb7fqch6t81p0uzlj6efqvkecmf402mokkzi3dl9oywrk6lu8fd0yn',
                sort: 118953,
                administrativeAreaLevel1: 'hcyfklp23729z3rtgqo7veujtsv0yz8vffstzy6uoag3r9yfde',
                administrativeAreaLevel2: 'qjm01r0vgnp2uylqr9zt4zfjmw4k5zhwo34st3348yjwqqz260',
                administrativeAreaLevel3: '9aryiluzri554tmiawdc6184dpb46wmj8ixvjje75eqd4p8wv9',
                administrativeAreas: { "foo" : "bar" },
                latitude: 898.00,
                longitude: 230.53,
                zoom: 73,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'r3',
                iso3166Alpha3: 'y8vi',
                iso3166Numeric: 'ijp',
                customCode: 'g6x8bv5ymb',
                prefix: '79cnu',
                name: 'v4ptw8l64x4avqd0d8028rdacx36tv368s7ussixhjhxsy6p13bltgkp2n1jd0yl1igqpm2mk1h7vkthe1u2ei5f5u0fdgt3hwp4es74sladmucf63gynufw3rbhf91sdks2fulp5vtooyjwelvuvvrircxwkd97yzpj6at3u5mlqu8xupq598kpu9qiyw23hoxju5wld16f9zhyevds5mu59wko25upmcwf9tj7baikttc6nr2zacokvj5detk',
                slug: 'hxna4q5wpiapnpm02hlctt4w7kmr97664s9nvlm2xbeatx25j2a0n9334frnlddwy0smbrmzknty1g6gjtu7p49f9r9sagpn2nv7baknljedma1nrjmb32e2rux4ik9ptq987x4thdm1pgvsfb3ca9fla2395la4rifmq9pn438sg1s9c6ot5yt8jw2g2vd76ln9wi36yzp78tgui8nky697jj06zd3n7useizy54ua6a6mrndu2qzyjl40kgitt3p5op2zpeics0sh4o94p6dwvayu2txkdrdg1sgvmswcv73nb42mdgzebow0htak07ac70kipqkqdap7qndtiepscyw6cml9ltfv0bwt2hn1ivqz4jsfxisrw9tzex4neuscth8t9exn0lwalegwyjuurjy2swvqp6a7oueua9lr1yqrg91wv113f5nw5pq7q1olt94z5ta85y0k0gpl4lmpoktyut4j8tj89em5zzbjr033ee8z1qf4fspc9tfbsdj2zajh4sszxywue5jrjkd3xn5kkj7lt84nagupidu5yj11k5tb18mc4nqaa12xjl0tji5v34zhsr3p0j5bx07ybwk89l7ylik9ks3l04n9qhyedrg5p5rrq7q9ce8fgkbq2qxg734l8zidejmuybn5ncrsd2f20f7digeuf3vb0o890ezyw6rqfia774dt5o3bs11r09u263npplri5zcyfz71s81r19f6dui01z6g5t1mfdk4wi1611crj3f6uoo32zg0rcsnwz54uo9ujsurmf2dqu6h0sbuoh5io9a2y1tl681po6u5wlg3ueun5ymimavwg58c7kvm8t2hw8scly4pq6vvajdffe2voovhlmmpef1vbjeel7rhjeh6m9so8bl8b24vwkk2e3mri8je3hjmqr07thj4hx86xdu2idf7oxkcytddymal1jpg7f5s2drewe1igqgfg8zs73ao2hwxwpcpwtsvxljjt6lqpnk5rc4g8npapwiluau0a',
                image: 'yww95cl0rzn7xa29ukngw1hj5v2r5g4n2foenmfru3vm2qot3bz8rsmk1jj3ip7ekr90zypm4c0o5xyjmxmleq7vv7srhduy66yck115owtyd99hhhwtev3u0ziy5k4a07204o3177x88kk83tgwnxrjynn7i5bq8tsi5ec7710duolwvg0mbpvq0z7zijnjlsr83u6l7cte4avwcrjbm4sdlooy82k0biw1nccam9hnizv686erloollxv9sa38k1uubtsrw1b4s0xk2utvlivnn9otrnjc0s0kwyxytl8pxo9nxczziu1gxos32kwz32zcivl0kqs0hfytwbzojrjiuhjtite5b5b00rl22udiorjidsb4ownj5hsq33j3m0gwj1wf1rdf2n51enixbhjlff8uhoizi13jd52rimcc0kt3ydxv5mw1w2zfahfbcq54vuvo8mmv57utachu4evw48b2vbo425fyvj687hg0g6278bgeqw6wu7ebbzqpmbr4gfcv5fe9xm9zo29bxj1myq2smyb3mztjre4i8n78goftka3yfs8as3yf94v46wqu1gd7z3kobaim2wc9o26vstnx6o2ybkxhtkwenzd0rhlgvy5t7hiwzdzk7603j24nu8wjz55bymk6olrfj2zhdzyt2p1ffj8v6ls7tcdmyktmhrlhqgoohi63xyll78iehnd5jw30h37vk2hq8t4h02qudwm2v998u414pyzwbq0my9b0reuproylotb9axklxtf64lmf3y5ym425zslgqjgnfr8nvuf3de2qnkz1gcocmxd06vmteowq6qtz0agh2dbj155idvemqd9n3y8fwkatgbkfansvrpx2ka55ix3vamgyeelpdhj8cf178134t04wmxjhkusdmv2smkbroeqm2yip7kvmesmm7ujrenwig6uq569yadnups29olmo3ffwf33x4ollvmkq6u60mtr1xo4o0q047tbzsp8z8ui4cpxs72qmuyi5ze88',
                sort: 939606,
                administrativeAreaLevel1: '0ocagr56gz2yglve9ylck70ph4k2z7pxd5ze2wkl26td3haush',
                administrativeAreaLevel2: 'dofq42hkv31fmwel0f05w8m4fxnpgbhs2e1gpk5td909rmeduz',
                administrativeAreaLevel3: '0lukyev8kftnnqxr63jfm7jlt3odgxg7uj44vogfk10x8wes3r',
                administrativeAreas: { "foo" : "bar" },
                latitude: 273.14,
                longitude: 859.55,
                zoom: 80,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'fg',
                iso3166Alpha3: 'it3',
                iso3166Numeric: 'xz0l',
                customCode: '5nwvfczv66',
                prefix: '5fmxl',
                name: '53mhxmy1min1d87i6d2d91dxyju90lv6osebzs7du9gej4f8tyccwp7syh4w091m63stmpnqg5sa4l3biqww0ac028tavql2pbs3ehya6fnazj7q8jla8wji186t6as9cnwjswepn6bgmn2z2ciww0jsw2919su0h2gx8n51dxyz3u5n9oo90ov9ut2w80q4qtswxvv0qjisdxbzmodewyq9qpb0at5iqwal5roipu9mmkiuncfd6k452t1maj8',
                slug: 'c465ktmyl7tuv3rxwdcefcagktxm4hqfcfe85m9fq5ysnd0t3qxq39uxgc0x3dxetwc09bptwoychtwqb3seojeb13lqn6qn332lc1absoogbg4r9c7j3eeez23bhsz7v3hic98d8qfue1tpwluu9xcwgdfzi3q9r916x2j8e1rxpvj8l7sge1q2ilj78mu14d9qy01je4p5s7oppkbrh9rpwzw5ly02tz610d8zqnl19d742li8j1rg41b30qqi10rmys99ux1gdnkv0t34jk74c6aj3q54gn5zvaqnkj179fzktjd2zi35w2r32qk5wajn8nd3gf4gt0074fjj3f69aen1ttn7g3wpj76vaxzifsnrekhjcnjk6i5rw36sle2j59kmvy787tctnfgcecwqhvoktjr645p3pdhh0fov5mrvp6t7avdkpkca2cn36clfkqnjhce3yvqypzjtgnmkf995qhu7p3xtebxxdh7ke819er7xc9i2xpzi24i9fu8drngr6fj4wjea6w2yuxkytd1g6qo04oruebs35c1237l54753pir3sffcc33db32wo83dn1zd8irkx62pjg3u4s1gwnz1br43ul4aikjt56vkgsm02t05prakgp3lcu0gbzyvfrd3rz1607eml4nutrf4mf5ojgo9e0kkcxfj6t838biz7mwsv2o4qta31khvgrmw1zskbbncx3c2pvk8p25fain5hsuh4y3c1gis7h085qjs5r3n804sfiqttgrxofobq9d00eee86hac09w7qygo0g0h83g8hy2xe8o1f9xz550m56i1atzxben44ie6i26eaoa9qq4j9zhkq82y7i23nnm5y4pf6meqel0a6tm8kp3q8c8hncy0wbsax25sztol15klb0xnniouvtkbofvmxvaec0eomhdgepubx2b84xy4i4uqvt5ax6qdfjgh59z3axvgz451gfqze55h7gfdi4ps11guwf8o7nvlc6s38ktc791aponzg11',
                image: '7n0ot2daa11gbkhr66i9x3kgm31ioifibm8aj38zpyp0s5up48fd1dx7redstvv8wr4sss7cbp6bamozly6hjk7jojemr89dxbm1ah2hbch275wcaet9oefl9nrlagl4jxv9ucxtisxgjwy5k4invb9aovwyz97le4jsta2cg3lm97ev2zpzobrvojhqti3g43qoouw54sdkosuqhtu99tuc49bbgkq12ma6jntvctc4bs4sv1w8mvjw9azs96r4l2ucdqjw4m81o3wd9ce3odjztiy01j9qzxaz15nsx4zh1yupf9of8twhm9a8ly0bdv0ki7t0uk93xbgy2z6xe5icjtswj81rpzai1i5ymd485cfp5v2oc38vh9tcyikxuvro93mpnjtdoajr962igpls7fb9kjxfnum9qgdyfc9o8c4n3mg29lyi96bvxgkn95vrspkwdxfgnon2c3onwp3qrqa2025pqpytsgzurquwzrif17tgvlcjlthlayrfejv0emvwkthyvhk1bzfu299pwb3l3ffubwatuv7ekr7jv6p2g28p6gskjuj7spf1q2byy70p12twy2p5ywlisa54ea8t8025a2n5kad7q738bszqgee3x9355wbs3a6utrkut4nfjmqimslcfqx8orgk8618j1y3t3weevs5jwaswlsoqy86hwpreu42ddo7y6tb4b7scax6xgsaezp3fnngjb2pqbky7mwwip8uw7p49n6s9tcbqpsjwzutztlasubukkn0vso3dqzsidj7uyhb6zmr5wrxurjb7zr4uiz59j24mgfujdgel7c1fu2eulovj3xl6p2eyikw6bpe3v2b7n2j1y5vfz1lqpfscd28727oh7d1d0mz10cv7ruzwsi0hoxc26v4ps9fs23s2z3vceetgswg4wd5xt77cxnkh93ktumk7w6xk3g9ea2to390zz4ek5ljt5lgxx0q63zepnw9l2muwtgxbrcl8q0n9f4j1s7jyeqsrq9kr88i',
                sort: 542590,
                administrativeAreaLevel1: 'dcgugmlrhyjzoxr0h722qiruca7outsvgkj27sezwlxwh4wv7j',
                administrativeAreaLevel2: 'yrt01c4vfkd7mph7uc1jib4k3ag88t0yc3hfs3ajl0vqdgp7yq',
                administrativeAreaLevel3: 'jf1bcirtnw2dq38t66tc03ou45npdjac4tlztldsxvzmtvgbdv',
                administrativeAreas: { "foo" : "bar" },
                latitude: 91.32,
                longitude: 461.91,
                zoom: 99,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: '3e',
                iso3166Alpha3: 'qrs',
                iso3166Numeric: 'jlp',
                customCode: 'ixr5s5u17li',
                prefix: 'uz0gj',
                name: 'johb9dcg5yvimlnq5z315lwkpot30vg20sj0mqs1x4nnt801x385w17qhzmcll5d0u00kmd7peps83lbaddpad3brf5oly4l87g7sm7xdmc7uxk35p2oie6fpsh0g31ldhwj6gsulthvysaltit2zh85f6lprxyq76wwtl98wh83bau5xofrb0cvp82fkklpoon8gijrl69tprlkeodprz9cjgdbh411khy74zhdr053coxbdditlr0yrs8zxga',
                slug: 'wuj4zzc6q7ticqxk0ulmx4vbn8ht37qirbuqzupo6pd49jddg0ccft6sg11bzk778kjj2dhv616tiv0d74l1neajhxatz63iduqqe12uve0trdpz1z0orjht1lnx49xcf97h3fs4byydt0i2yrpe5yprcvzir3eqtcohsov2o7zm2tpkwdw412tuaqws2s4phsbkj11o5bymx82td31pm1pjmxyr3z9dw0ufr134ak5zso4b1if8uahzi922ss2cchzsm5ryni9bhqvrnqwlbjdkfrnel0xx77oqnv9k5vvalvijnfif0iglmfxc3f1987d588bb2lb4gdopsa4t98p4ulbydd27h5elwia9dsg3tqzcdjm54fyntkeeysy9topsrymzjmun6qm2d3a65j2ameuyw2ijsrp2qo6sdrz43cb5z1oh76r12frpcsjz3h633tyzzupuyvmtwiehfv105m6uxugnav3a7s3k16iv6g9v918gjffivwizqrlxyzr9k07uoxndf85vw6ofa71cbcxd3acx5mp8jgr63c51vjpau9y60aq84r2a0sf1sfecvxfeoowixqe08q5ynfcljouf0t8u06rjsxu1poim8lsi5fdj22kdvbhbyehkwo2zahegtey8h2w3slwsq8kghn7qo74wqb655a3di6tzugsub09gu753w0vmaq5y3t591rfp0ri7gblhmqxhh541mwk31gjy8z1we1bezf7grn5v3ysgs158epym8k78cnx2s53uy9mo7236pp9hgffiqzgzokueun7t1tn9zcwiovio7c432aqnuse0bcz4zkgeukzzuzdu87kfdi8bn1b4j3uvci9psf7k2uskf1ggbc0pei3daxjpzd3fdsib0uvqa4l7n21gy3pa1961irgc2tovqjbi3p1cahglwfg1iqojadyguiooetnt9iaby7x6l1x1t469om96ij2iu8y2yqrzy0ede4bfgb9f0fz8r1ndl1moe88lqxfsemn3',
                image: 'xv20xvr1g6um2xaybfsh4h3af1nv695wqlfnbk6301g22g9eq99h0fz608r1utlgjrdu4sm55tyqvy7hc4mwcvuj5q3odhghtw94if5ksibbcej93smo0xjrm6kne5wdk305zvbtbzdkkf2a1w98kru41hsu1gmt3vfybsv2pu219i9vmm3a6w58joble7n4q7ye59x0qyxyipzl89n539ucbcgo2eo0ew8hf75fy1qljm6rzh9tr1bthtejrll8ttwxqc9oqoywn357ry0r48tcvmsejx2ycgbnxavedbn8mi8rdf1i2tfg6cfl9q5dw2jrzgbsejuqlb8rhuwqd4zcyjoqj8a9g7ovvuf2r5o5d5rbgimu5qkcek3fppc94fzpoysawz3l7tzwek7q58yvocg2akcy7c4lnr396jcp9wakcc03ky23soi2dfson6m1c9ohk3jraeeyqibihlk5iyx6y3q9brf6wn5mtail8vn1gmu3qpjo1ad43gh1cxg0wghhndk1pw0au8jy2j88twacpuvvkcwfc5lcvef7pwvnqcuzzbwoescsyni1zchlue4mq88yprqszkbglfc5kv4ptxlbfjjkfnfw012087ruo2eftglzt9v99ql3e6uanoer91ncjnrcfyvsoo713bkg23pt1os0f2woqu8lsyfn6uwh4gt1jmpwn8uvuwlfgsp3xdxrej9dvpxjrf3jpyzn42zv2uy4sdu02o0qrleug46aejxlzjdvpftfbjbcdi0yy826o2v9emhwufvq78qe4yo46l3l1ejlx9vq4k96mdp0gu8h9sw3tg8k94x8fe331m3rral3gsboex96fv0osbj7ip73pqg2gzt1nthv454vv1m9zfbjzteht452wg29lpo265ifsnropdeugaod0mqm3pwnvtri6lrfzsgoenma2ynarutq958krny50g8qhxkq2ze9kn3v6m30y1qmsrh98qc9mxa9n31gtbmtfzfd0nry5rd0ljch',
                sort: 478536,
                administrativeAreaLevel1: '2q1ypjz2yldx9bwq5dtbpjv9d7ja7db200xoz70v4x1ygkkrfj',
                administrativeAreaLevel2: 'xw622ekv2uqy5zydgn0bl3u1rmfdwejvax6fazzpx4jp8hgbtj',
                administrativeAreaLevel3: 'ota82f1ign0l266vq40lxtvyvikc4f8w1fzj3g36nu0ka2gwm3',
                administrativeAreas: { "foo" : "bar" },
                latitude: 606.63,
                longitude: 133.11,
                zoom: 81,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'o5',
                iso3166Alpha3: '3xz',
                iso3166Numeric: '9td',
                customCode: '3ilhx8ekwg',
                prefix: '9qmi1l',
                name: '2t1bvr8quj752hu3xbzcj1o11b4i1u67kzjvsiyfva3v2q31eh15pxx0xjsucozmop59yq3knqvc0sekl3j799e85wv4s9hwkun50opa3asip1f3w1f687rr2m97rb1c2p9powicepmlwi6wt2zmv4z9aa92qwrtvqcoaez8dyuggzcbhll6i3mfem054spnmd7af0e2h03z37dir5zxbd1g6s4vqiz480lkf8wgppspnb6fcxm73iijsodutms',
                slug: 'swlo1r5d26tu85k4vtqlyf09274wmdr6rw0ipo6dpf5xgohdooze2g0ivppzt146ld07rt1m87c0jyce9wdp6989g2dq1sbbxx0vgsptkgkc6v4u8t0sxmkq39ub4ssj4cqiejahdg95uv77bmqnn2k9sg75oxycxrxigme0824ufyi3zklyoixxmxxtsy816rm8nojbzwvt43ze8u2xowsg0wkk0yzk9qzly8jortclmw8e02wod6pxdcoc1tq850lfk1609n3gv85nlytl7z01wla3sjum90t79fu8cw21w1i6ghp668tuish4045xcoo3022a2ym855ck7mi63vf9v9rcjpvk3n4jg7hvdoihkrk3ta6353ec9n6ivugocabizpysojsk8n6vmx6n7upbp8bad16tt06f7v3awsfelwt09kr231wjnrbbf0eohbbf0s90y3x0fs52imsmljcrq7gh4l7p6y0ei7q06ky09jdcdhjq1sny3ue7s3wvvvr3lkcmarvhjhc7bt47cn2vlrhbdtqge1dhmg6a7ttibglc8ya2ktat7roz4rgbvr2nsa0f3iwikwdnml86hupixwoqyw86x5g0agq8v7fhpitsypomy0avjqh4zpmkpvoma8e2y0ryqmky8tpnb7974qq06scxxav9k51glsdh7h3nxgyktp0ksj8f842yyeyugcai5da8vv66kvgz7ln0l0mrp3u1lnkd9myde5p08963hpvtucd9bu6nvta4qqx7jts3kkm9r390i4apyk3qqunpboq1yt6tt9hyoa7bd0xrs32ie17a43q514puexdvfvhnknluo3dzfz7edme2okca01w3z6yysosvcq199frwc1fb06hk8rskjhnuse11khqnq8jt66sy8pbga79ssvo6z0d3q1bpguxti6szvvggbidnhx3ztr1ow6q05houfbo2fyma1qb0s9h173tb4jomdiuiegybmaftbfltozq2kk87kqs46zlk6zry',
                image: '4iumsg33fpwbbrx22n57yn55svt4xk3j5t5nfynhjlosst98k9xsqownki6o5n5xjptc17k7r8yhjeb60oe4emj26m12jk6wdkjrxqx098djj64ro6kegj4hyj3huc05mw4a0gwaov92nfasc1ud3gna0b6vtwkm5b3zhklh21ajw6ysisj2kh9qct958lm5gcmchroqyjn775mwrd91hwzdt54qhqcmpkoybg1illwk0yknf0yevd8mn2q1q86lqfpaq26nyf2peizrnixsz8kinsyfbmjjajs3o9n0z6vc5ausgz8jz53qmeq6bx0x366eh4rcfq202ktxqpprvqi54h860wf3qqbkjb68s9a307dxr1qt8kkviz3gyttdx0qz3v1je5atgbi1cz5ev130s2y7odfd9wc94ul5ilgda9mwu81ra09rr385sr2li04oue6vcssiz54l60f2stv9du1vip48j9h0yp1as3yhdkjt14k5bbsaygx4fzv7typmz5roc6oxu4dv3fxef87ip10uw7d78gj6ozf48e270floeybrxcy393mx42s17bnfe5ty0b6oyehhn2kbqk9plmoscoh1zlnlwutv09l89gi5n89eq40v7wa5r6f8krgnclvv5gqjcuunhzvpx9btx9ucajn79x5gkn0cmd1hq6lmpaoebp8matlqknl55npey888l36zkhdsvm1jgnywhcohneslmt6izh6ed3jdq2p12di1ubc2ijhyz6cay6ma9qjs5xar8ob40bzgn21la17cmqzmctdjflrl47t8rkjhwdojep0o7ak64ccj7ndf5hg7x3v9kbbne9ntdffq085hi53121vv5008bf57l2v2vqbnivvsc7o51q85b3h58znixwfw7tlb3t23bq3xm6onnzyn4zn4byvac66vth1b6fb0zgmgsq3r0y2yalajwhidr701ej69bl733964yqwdwlnkvmugqah4vq2fpubipizh5yhta09mo54i',
                sort: 883515,
                administrativeAreaLevel1: '8gtm1crsf1ii24ypqtb80onon4inrcn97mfp22eb61n44d5gmz',
                administrativeAreaLevel2: 'sgzogb8vmurountwec5e8dkhib03zuzd8l8jnjl7cfzwxmry9e',
                administrativeAreaLevel3: 'uhgtsil49m2nos8w4pmntwmsjqvj9njqa12s6567sy9dfl5sbn',
                administrativeAreas: { "foo" : "bar" },
                latitude: 470.89,
                longitude: 340.91,
                zoom: 39,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: '1k',
                iso3166Alpha3: 'eea',
                iso3166Numeric: 'gtj',
                customCode: 'yr0telz7zt',
                prefix: 'tx48t',
                name: 'aktoz8xflswyggq53bnnupcw1q3r5lcti3r93cy2z2o3ugosnpkjh6eai9i0cf2hrkx7ka3lelo1an13xv03dpvemexlg7d2f25nzwi8qwtcrywfznk51ezy0282l4sdi7ace4vim1fnlhnvykobgc9g4881bpzkmt1cb72qg5l6u40ymp8xr272ppe45hplr2o8n57wej01fbpzizm1tw0mqsznikpeja9q96xy05izto9u33vgxujzcrhcdjiu',
                slug: '2d3b0jqt66auxt9gfq0ue6us44txp1ed1wwa6xak8weqziv28t5vva2jzyrd6luljxzrcs1z3gzwmfdesj608tb2e5lwfhk3vh7ko8ze4dzaxx55hndwsesfnxxohsjykozexhzf4eby3ihms5g6vb6epn7aspc97kg3yy5sa3n501iao6qfrzzpfat15jmky3w3pmqkjaitsnbix62hdfsi05fakghzajbufm614keig2pxlnqc5u802r0ejg38pdzu0j5d9s4of7i7oi708mpq13ecbykic5snwkq3hf24g522ap3njicyd5chpas6altej4k5l0yosrzsbwzftvifgmmh4h94zkhsoldcu8yduh9hxas3e12wdmfirwq2u43nc7xle2j9yei4dooc2o5agmf2qisocor7i1zqpjrfhxcth9a330k8go5rssa8sr9ll2s15glkna3avwn0qcakcmyk0xpmxypcwpek24qkbpy972ly8t79b3i58khqrz9k09aihfl9obrh2rmzgvf865xqntzkflod8sjilt90o6cpempsewy3desedfgidy8qpbjq7drjh9nkfae1hf9gzsinh6d0ojukp3xdufypnxujvtta6d7z6l2whokq7maq6l5fa5og5g6nu3lgw3bi1et7vhfeem4ai8kc04520uw38li90h1494p6majwlz4u80l0kv3p1q2i13psp3hqofvrfsnqv9yvxkkd3rf4fv9jgkq5ppyyx4x2e4mi1vsseawd66j3g9pn45mehhn5l96rybsej3ab0u8abna1b2z2msajjwlu6y9i0gx5dbk6zglg3gpo2dh80585idevernuwzwf1lejid73ak97vye22q04b0nmtsry6hzjasa3gglsko5g2aumsbviy8jz15dwkw265rwyvdqpa0rm2p7nxz70g9sm0bqguz7wg5khylj7lzvjeyffirsalth40y8mlgt0qj8ytzd2598sq0fh71dryaycgt9vq2fn',
                image: 'cljwdd6vy7c3h7eqpdoaigzp9gkrftdqkr80e3z9l0b7edol0i0klys6gm8svobars37f3ldxtw721fl4xt4uo1hxvvs9pow7msqihuwk9tsdf6pbqar6cqedhi55dp3prun6t6bwy8o88mn5qsn140pck5he19pt2sr13k6s3047ct4xhzejvg33c20i2xduvv0lg4a716gs450lld46ncu8e6tznhn6umq8i0063u4pglb8psdbzbqdi0s3nngh0tvz2jayew1b0jobj31634n8jnfq7bjutnpd86pog3139vz00ely6tl66dumc08xasbjoyanp8a5noss3yt1srz9yj0lkqf3d5ornf113wbw64qtc5xesy5rx2abevqwsk1cafopbe933miy4gvt124jumwrq34pr0piqh2xr0vagvmr6zh0q2zcgd127zk0b28lfjvb6wtou3uvlesowen10rhp9fj6ghcurecdq8icqxqh6n6rhvyxh5ipu68amzp00h31fwgxkc79hj53ff40hyoc69i9t2g3qav8k78u0o9o54bifi42zuir85r7y8ch8cvpiyw4vgw9ar60ai7jux3od92o13xge23iygi5teahxjx61nml1de117bhnlkrup2ieakihtx1qa9plh1qby62jbznqltu8dmkk93syws88ft7i5fccz29ut79hk6exmo2jw5cj8jmm2n078rhoo51j34of45npl8f0jpc42r4m8y4kkt33mzrpicnbm2zacz21vh258qs0rdh6o8zwy9c9j171mekoyxjj3p6n5o3abvfj5hbj3bujsu8vn3uh37wy10vlsvozby5v0gal9m177jdh7zrc3rqoh9hnbf7441svptyjh3ahi8iu5a4rve3u7beu8qr52vq9126s41r7cq55chkl8bjztsdid3aslnza6dkc2cqgti8vucaw09en9fhf6vm4cf331xkwv3it0c9w591ic4x2bz6vg7dz3409pinvbn6r5z',
                sort: 577280,
                administrativeAreaLevel1: '7yxt9qsabazz0cv2r3q70w0a2cdbffqxrbgv4mk9o8lz97s3r6',
                administrativeAreaLevel2: 'ggvxsnbj5n485rtdkary58qucsbqmpcugqy2owayalsrtpxtf1',
                administrativeAreaLevel3: '2s65gxch9z13qya6dk8mlutb7njdup31ieaylcu61xu2flc2mo',
                administrativeAreas: { "foo" : "bar" },
                latitude: 357.01,
                longitude: 378.21,
                zoom: 84,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'ex',
                iso3166Alpha3: 'pqd',
                iso3166Numeric: 'gzg',
                customCode: '0ci9f46u54',
                prefix: 'kj26z',
                name: 'brs7wvtmhx1p2xfo0w1kphydyby5yghvkv4qgc914sioo22el0t15xijy0q36r5okdhtmmr0j56psqh1n73u866gnnvldvko8l185d58zrjudzhpyg0a7okycvca71pw80gv3lepb0r8ks6nlctc72ibfdvqf3gbfji6obq6deap8k1svlk4zx2fpv0r6d25sszrpf3p0skw3l4d3dp3elhc9chjw7uleakv7ijd73cgje1rmvlywt4r47w6chj',
                slug: 'r3zjh96dzhvqpkkfugw9d5au4henpkjijphzbqi73tw09esaq5m81kvdy2xxstzqrytwtwnv9h0f2yqvaldd5zx7isysbe5ybzbu86ryi3ednvc3pr2m99pdm72xrfa8wubkyqof6deb1bm36d4bt5v1wfnsllpg7smmp7l5yuik9pj2rktsvjrc75pz81140jrj8z1mhmh08ocatiqnjbe0pyew9ahbcd3ey7t4j08f8a0sjjiurcctsr24bkq3zaepm4fq9pxg5zpsn3vhy93eqetoquvgxuaf20hqt88g21tidy5024zlv11d5v289138kv7drfqnomtpulwx52qny661jruk3ibjh17mzilytrtp736ak4bmnxr72vhfs1tybvvjc2o8h6nmai48b1zwy9392hwone4irjgfddt9ir0zyuce67ayk14yp6upaj6s64lr1b0foxk9nliii2zkt53nrp9cx4mida2n6isupdcban2zacfyahrek0c8ebv5dwo8bb2iyq6xn2ypouc1es25iqdcfmk5f0jhqul25z5er8kjei6ayo7fqovcyqt07n3zqezhphdbq73gaakk94seb3ya7eu1zjexsxp46ylf006lcbvpj82bt935sn8gn9ntfglu32h6pdxas7u8og2nwmj719puk5ftcsc4gz2u0d0w4kwv5bbujyp1skflud9875usmvd0qjpx6yryevtenlrj5d2s5avsgp0f4pwgsmbyc2ibkmy7zfcpfbq9qah0i5keu7kbv1taev6nn6ylyjpi56g7txzw9lnteujm36h3g54r2eyl4m8uspau4rcojeysw280j9in6r9j9vqvtv9nvoxyjrpj4ahate55xgp93xnoyssqr0pkpscefdzfdbab549i8m03n4evhjkhkddjsegr15nn96qjzbziein44vjdkjff8dls6pj0f3qj6x23avio6mvxyw4mloqf08huas5tuc0dlrgca37fwfse5oo56ykau1p0e',
                image: 'g3a7qf7wye7qmc5pdi4w395dqi2o3rqlzlhxhmmjpzdv7h5o4pwwjpmkolzikcdxeey5yct0pmujtr1pvqnsc3air3f1t3hq5b5vsno8dv169xpfmvvlo0lstvhpxrxiu6zz9z1ncctl2bijd0uhy73q4ml3whajlerslcbu9wk3kmjyqlpzerybw198oz0alnpyo74kawflf5496pla88ja5mnynv47a5wszlibpydqdwzf5miy4xtk304u176h4hapdzme17diu04lkejz4x5jq3iy0ca7hcmre4nvmzse7pa2iiu7ybdx5uz5x0r1qqmm4jybx1l4cmiskp6npcmq8d0iz22pxjusfrwo2s2g9lm5r1gav4awn26l7ahh4c7e6uf773t2q7fx0yc1enz5mbb4rifzhlxlow2ibgzd3xdgg8408mcli9gjx0j24wcr8k4xxr291hbx8s1wyy4oprcmdbsykhwokohd718tjglfv3fa9ke5gw4q7hvng94i91pz7a9wdi97w35ty7gs841pr16zf89oshpp6ktk2f4mb2z88wfve6vgbctt4avp03zg7u9afhfpriakewzscl47pyn2grq0dv14zfrira71fz5qwgrgarxuaqruzxi71i0cwsjc5uh9q9p3yxbasu9njqfxbsgu4t5xtbh8jyw5lvqacdlln30rrvh3zde0qzgmauo030zrmknl45uog8h5bob4qbrr3b52bbz0bs1jbdyxbjn6d2cvhcoyws5pdok9o45r10qytuebwegpwj6lrdxwzhql6u3mdbf0p1428jo8hf0yne00fw615o5cvn5rw4fmu936xasufo2z6z84xz753jcnfvfys5562hpre6hbxds5nbz21jun73ncw96gwxduisqzxliwbinj138r4pue9roy1uhz9qiqsh4j75dis6eii7mtaelheo4izqtuozzqppbbh56azerw4p9kuvusavpxk9fo5yb5opigwsb3bbz60oq2tckh',
                sort: 599301,
                administrativeAreaLevel1: 'z1eei1ut2k7fn4qmhheaub03s6g7eqnkxpsntmsoe4lxaj4p0q',
                administrativeAreaLevel2: '7nm2ymv6wv3r5mtcvdmvaemdbye5fg2dcr400dqon8yzab0388',
                administrativeAreaLevel3: 'gae0qz83axszpck1pob34w7leb6ivqojs4kb2o3763y4xf6e09',
                administrativeAreas: { "foo" : "bar" },
                latitude: 53.56,
                longitude: 358.90,
                zoom: 65,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: '30',
                iso3166Alpha3: 'g49',
                iso3166Numeric: '0v0',
                customCode: 'y9rtflt8jm',
                prefix: 'wk8jr',
                name: 'hnvdshus6eyezpqq9dhw4e593nmneznxofm3tpg85uc2jw8xbe23b5ehfr6tgu4oha47apajoezrtdl4xsyp3vli6ewxg5254kumk60qqt5i51hwdbycryf4bvie9g3yr7g45lox9rhbises2ql4uix39znredn84z8al0x8zuseojd0r99x1x9f8i7xkti2htw2ifs6aqtbbaa2r85f8c9tqut8i9nonw5uq1trk669fycy6kdemg6u77u81hw',
                slug: 'hfmqb6974i64wqxg12cp8gwv9uqdbx9sq1y3id9v9qj525brntdofy3z54gvaiub55b8lwxexnuehkc331pj3mbktkqv15iz5lihwyi4rnnu9a4k84924zum8zyjfjqx3jfdfrvcziea3iqqxjadugsr03ft1yqgi1d1rydcd2xqqv8m032be4hs9kpeoc674q78yhpa8o8ali5drc6ckw1ujst02i3uv8j3ubkmt2hb0or1uwq4lhrqb9k5pwmphdoionej5rnjnsfvgy08cx0tnnwkbcdjgqeowx5amv12z9bx5zsmpe1v7nnka4gv2anxvbkt5ys69zvb44e4hydbmx6v1fu37vbsfvedhmt39vijgt5d3tdvjij09l3bz76ldajzv3kdei3ebt6gd9uhjjb5m2qw0vqhzz34e43n8ep2s0sbg8ufllu62a5vgf21u9jdices0xojo1sckvmm92aptsde1oj0dv6kv5jmrddgbpy3zcgifouyjb0zfvv7aw42fmna6jdc4gwr089cnv4o38czb3h6rre1p1xdzylj1yul4zwf26ik8a7nq9zaiduppz2g38xjh42hkldzrxfvdw4r237kyplun0mw4i4331ayzvhyupx89wkyve3r74743n3kdtkvw1qz3vv7rsjdecqx2a5d2wz4a54moz1s2l49suqtczc2dfzhvov5qruvuw41vsvt6d8x6vv68t04gka9ga4vx5shsl4ap38gj9fhlp3hs8b9t1mj6a5im3v6j1tvn71asecgh4919kk3tyvt7yas3hkrlp6b4on6f5p0rkppkophzo4msyxi9wn2xbjt0jgthlyp3gflqxqlgzdqtmijv7h12mgr59c9u8m6o0lm672jaxpjmcaapfctuj6jyil9uweff8lcq0htyj79ki9wbkwqtpr3hoy83advbzioz2t5nzqpkee2qimlk5myei2x4e0mzaz7ibshh12qec72ifktt1oeh4l773kage3av8v331q1',
                image: '7kqjos550ktcy1hzvuc9y9mdwoi4q9oae0jdnaws8y6gyv5jgdgdy5z6yg6u8qxcf6mkhjlgsvqwb2tdnuo4ft5nd24y6mcrawq07dg2votp1ciqcadhe936h2k1j1k04iam4ck1fprabg4qn1pwd0ro9jbwbv1kbagxwjpqz98t8ivw57od3toizo7lpigngkti5nd9vh3frjgcyzonl11ow0v1lz14zxx28f3031njsvqoet8h9q9bhfkubd52682guubef8jtdg9149159a2205bq26ikt2huqpvkubqfvfcc4qmaa63pl35zutucyqk7zbdvnr0zhsr2td6q3vq2c88y7fmc6bjanzzd3t0f38h9ia6ks8xrm2pkg0fufze6lux9lttf48dk7id24bug0e7bipvetri5kdfhhkgmn9vawampjg7aco13yb1h9n03m8gmgg3r7oaxwsc4kl8uk0msui8p195vnkfx7ps6w27072bpwdar63n3q7fu7dp1g6145t883y3vq1apvyi23av8yzr2fkstf9fwfkexczkksmhzo2phlut0xygmqm8rf7bj4gnl3xvu2vmlsop1jc6ag45ozg28wl6q8xib7xqdt1kzbc1k0hab7bu0xsyajhf87eguan94rzf43lxu67a2m0iqvl2jx0znpefypaj26s42rtrwfhdjw8wqgrl4n0a8vuhguubu3oveuotv1yazot0i8f76ranpsveo80sm0iyeq8bi6pxgviqdlonskz1obdonesx96lc4dkvzrmbaony6zvdb7vf3h5xkn9mmnugvngtgmjrfshogo585rsmbwdl9udutckllimw77l9bldc1li2w1m9gsp47gero7rzqdso14kwa0qa2uitg6fb9o69d0owf82vcpf0bbywjkolgs967u5e9aubhwi2u8zmawzvbh2agt2vb8fu56r1poxoghirl5jjcm2qyq3bzzzn1eblm2gzse0mfbwgvn1kp39g4kgxzn9jir',
                sort: 867768,
                administrativeAreaLevel1: 'xy5uy0lsq7y5i7xenppjsy4wj9we7p9wsx9dqvgpdnjgut6wy3',
                administrativeAreaLevel2: '10x2p2xl8rljvh6unsgab8raf3ix237oku68jk33m7298cf34q',
                administrativeAreaLevel3: 'usc5te6ywowbaj8ap4omu9no1deddcnle29tthqm5jhly7acf1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 216.95,
                longitude: 502.24,
                zoom: 15,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'lf',
                iso3166Alpha3: 'j8d',
                iso3166Numeric: 'uip',
                customCode: '2ztqxpznhf',
                prefix: 's8c0q',
                name: 's1939rjh3gyhws52ylnsw81vwxx0f7f8w93a16hh22lp1maoe2aklc7y95z0lwehjyl2vesfr3a43hazmcbg5h4yse838fy2gns0vbra0p8mgobmrpyh24bljnpqxwc1zdrs2kswsswqcxtvbcrg8nbawtb5sci7kvluduzfx4y82ovqw62d5cooju3inuf2qwo4j8t1k8kwkay2aow3d58mv66d1tfus5lsrfhbfuy00hd43o9t8lczcm3vs17',
                slug: '8k9g043eupeolfmrp110b0zhbbrzh7g2905pd4715jgojcig2wu3waeytlpn53p946p5gi1xskuwcuvykba6wch2ytfgbvuluooa0sel5zcspprwdr9wpz9i69kezuvy63uitsqiyhj7xsfmocv13h4r5w7lcoofyzeg6xf7r3z3irr5cmd2lh27hwesqwve1zvyqdioo40kqihfhptf6qmpdyrtqpsk9rht2do8cpcr42fvu93r6j7p14e0g356fi85xtw8a1p2a8uahcxr9penuo7z1fgf3a9m9g7jeeqkk8lhmtrgsf03rkrg11k1vzp2p9mgszi07m30z4akkxs0vkr7ote7w2n4red1q8eit8xubwr5k8rmtrw8yo62n08knj3w477n2q7dv472eyilx9jyu7ips56tg51awxfifu7n0znv8kt1dimxfrtdeact8n3atjkms1d86s25ht8hxipwk1qunj65r5p79woyhltyzf8myzq04orbfumiuh1pjd4uynnj0bmqe91k0xm1wyqxu169pmvijwea78s5hjxplc3saluwbx935ghnzlzo37877i5tb75d536em2ki3carsdifa7na7xppkzzmah9jykx8qp6ehsyvk3xmxl50mf41d32marm7ujr4bad8a5fsm8ewvfpkb5nq1joyt4x4aifnnydufov50wolb1pdd6mhnirgn9gmdx4xm2iif7x62xko4p2ij7aa1k5sls7zwfabatjv4uenicmivzwugm9t05u6syqibug234a4nh9q9h8hc7qr8tklcjo77z806hfqoly3p1tyx92rrc4o8t9r8id391igh5yo7d0o9xo21p1e1zz9d1u3czy2r883hmhavt4asvpaoc2zftk3s9wcw1ma38l5fjkxtjps5q0m8zw7zvuy6nle4jqeqq44alv0gl2cuoyv4becl3b8pcpfbywtiehxg5pegqzbeh0ay71v2mymlicfs8be5a8mzcbp7h6c03dg43jo',
                image: '658vzy1e75wm6r0c042z15hpxwv4q8sghoawtwowa26kzhu01rc7xaf9y1vrdr94a288hlvq5kx557glsqmnpxlpnugoediq948sfqrhx5o84rssjl6b1bw8m6ie41dstkskoedsi9t6x8tusfg5gbezowrzgcsiw8w8wjv7hckg52qca6kq0ay7z0ycy8uvyc2j81znokkwdlfag24hp5wjzllf2q9jxoyytbw9az54d9t5j5s80lpx5nodeahrrkvt7x86wcd9p7bitu54lzryva4xgv3h6cyf9xqiiwxn2fx40ssktw0z8178v2fghjgu0rsqhm3bfklwt1xoq71pgp1d0ygx5pos8dxmbq3zrp1pczjwd17dcvukaqg0fmau6jbr197g89wymr8136eu20e57go3s7opzmqsonh9ccz1ko3n4q5atidcysi61d55c8slkmncha4pkly28uhz7kj014ewlho33pcimtf6pxj2pqspmzivplywv9b7uzrf2votavfyff6buy9qg92e7tnsauwph2611nsvli6iyr3n0fr1rnjs8yhrc7cxk1nor3frlcycnrewmbt9avjz4hjbm92zti516waxlbj93tjvczcviwjre2if122wgalyjyytyzibrbep9i2gb14zcky9i06ibvp2g6y8ag9zvhqjbrmcnbncx1calcp7ijpfmnehw5attwfwsgmfg902nfwwf8z5ewd3py3ikflbih2tqzelgy6xifgqqm2w826ktwhzx9mv77zgxsrxuqxt6htky29sgwn6rjq477yea8xry4shxhpd0sm3oo4i5hnw8mmvbcl9q905niufqu6nthg28m71yabiy477k6nym04go66v7q8k9c0fks2d1lhvburwsqb2376jc42jz5h1cvbnnp7vbri4gjet0r3uiravdtmkhnr6qn2unqga4pjez7wxy4ai8l9c4evu7u5875cuxcu2tp0kyvhq2w6vwoproygdebn2tshtem74',
                sort: 3678276,
                administrativeAreaLevel1: '1ulzfmk6rldviu0q189rh2orvhetep2g2pajj09x4w7bs3e6no',
                administrativeAreaLevel2: 'j4rwck8vh3l23o80h16jvy5jxy1duwoqlflej9lpy4xrsexjup',
                administrativeAreaLevel3: 'tmq66quyo3f8wc6qdkm76vepkmopi8v20aw5io03jeixwuh02l',
                administrativeAreas: { "foo" : "bar" },
                latitude: 404.83,
                longitude: 497.42,
                zoom: 23,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'bz',
                iso3166Alpha3: 'ysg',
                iso3166Numeric: '17l',
                customCode: 'r03c993y7r',
                prefix: 'lt1fw',
                name: 'rqr9h4kjiyujuv0hicgqxv8mlja25428fivnsmvgk67576a3s1cclwg4hotvshe4jumwgnuot3ipq590pua6pt3xzhffttuyhut7b7dso4e1cdblebcfzadj2td2u4j3o0w7y9oqxyg69h3pgx9rcj4b6j563ybmljs8apypx34bci8k36rk53nyqfyaekoehqwlt8tqon33nf9d9r5mca17y9lbv2d9afm5fum6pzbymldyemz3idr832ijgfd',
                slug: 'j2qrk6mn5ggvp1j6xw97jiqgr5q20o57gv4z8i79nqmgtxtkz0mgkii8rjpx9ehqs2txhplez5imo1n7pho687qgbertx2vrfrx2yrimp1aznq24nzqbsiol15grnjxvu2qw71bfasur01mdfz2cgxn7ksjlu7eaiv6x7crzn47ecnfl4bi8iccgqtd94ljjzvhx1uoob7a36vf9o6cyr7zod3sbs794cdnqeybei8dj45rarwpq6flq7lngowip5qm30x7vxg6cuyfu0m2bdtjaslw7uqexi83l3caa9s94ys8bwdeqspiyhkfpf0obrhi1gnrvrn77xiui30izes171foujpnejby8etnay6gyhvmm9ejicfb8tt0ra3zskabkxt2s2xw829ruosicfh3kgtftegeq3ij0d9n65j6fkch7iy58kre7g5ax1cbn80uuftozvsx3ls0fpyugar84n9hb9i22pmitgrkg1cgh2zq6ej625whhwydpgdikjt4r0srqwexerlqc2hohfaclj1i2gfurgx30btfusrjqkaihpamxex0t50sdb96nafd18ojf5ks27yrd3ixzn392bt84oi8rqbimgahn8rljslw5an2gkti25s9kkmj4jk0sv95hgwy8wqu6rb2ilzxek4qxlq7s0l8jslncrqlcgjxzb4h8wl5etsamlwpeyeaxdyzplqqspmy5f7ql9idh9qnq10hbz6zqgw3eud6n88meo3y1o6zirosa0ca2w4na53sv7wpbeg65okr3h7z5ymn695xo1z8mt837zcpq61356hi3ejmgvkahw5zrd5ped313fsi9umid07mjal72shlcxz5srbuctww64u9flntsd2skdrxyjh8i2mvh30mrnsxuh62j27haqd1z8q49kt5v0j6upx2d5993m4n55swzdgwhzu1yhxs9fq6ew3j9hbvw3gjcjbp4j3y7lc4j6xt30chyxznj2xgsb9rl5n0fato95e6yuami1ugc',
                image: 'w2ve5vw30cd72uim2pw3nq1oo6n1wmh0kqhbet4a6mbgm3fgnt1a2uz0fd4l0wsx1dka3e3wvo4egiq6xdf5zlo5pjiqc37balfpygkpcusq9x71j0sebtlexv37dwamcfsqamrflghznzutwnc1u2uohmxu10x1yog2mbs44p68tl77nii8pdf9ncpmb3mkn4is2hlephkkgiho95fhrzabvsf5wsouyz0veiktzwtoj2p3k18vopjx9x3ayjv7losoaix57yif68c6h12hex9zn7tm5hu8bb58694fp3p1uzjkcdnb8ber4yteg73yzr3llbjwnop0zoblidioiyxaroqru2exv73lzn30w68j6jgzx4e0eyndtixkrumzujq66rzaudjnhfrgyn7zkt382yn6eshzo656y7q34jyrvjgb6fwqqahl0t8ed321zqih2otvmzjek70o191habtj52vbsnsev0fnrkm4felyb1tub7nsaor4zv80rgkcvqu8gve7h5xd037nhydve7v9k2vsy1ageg3suyb6abgpe0zo5wuk8u35tjx68c7riyndicwqfzad45hhlvw3a8xcknlten8vlk6zd68nhvwku3ndc7s5mu3gh96l6qiehieeipnjb47uuzpi5bbua2xlxev599jqnjyf48ifuwai87v3skvcm1v4lt0p7yl9c97uc9mnu8bddbt86dtw8t68x2l4unjphv361nj3qdf1o299i7gord2lag53w1n0mhzzm78hclw7on31qbkbl4e4zz6vxoliubt8dmwjgwohvy66jlkn77unmshr4zgwvjd0d9o753do3leyf28hawjk04x0lfuqpkhc7khjho8bafdm9fi4uxohh3dp7q66e67v6le4x5o1w2e1zxh9jf9b1ue37kwgm8dywgha0b5qe04bkx17jkihjp2kzp48w7p6hqqh0sdvpwmzj0thf80ffpj0nlo5wx4pjgto2leiasels2x4zyrxzvawre3x',
                sort: 175601,
                administrativeAreaLevel1: '1a0xer6503fsf74ohfnlc8gca8u2gyncl04wm6iibg6gzf7o2cl',
                administrativeAreaLevel2: 'wmbsn5xthkkfnyboot6md3fide3d3vdi1dkcshc5gyzl3izh8a',
                administrativeAreaLevel3: 'ff9pok3l6hs5q6lm924zbcx418jw7asn6ona378dze28k0q023',
                administrativeAreas: { "foo" : "bar" },
                latitude: 673.32,
                longitude: 684.15,
                zoom: 92,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'jj',
                iso3166Alpha3: '3zr',
                iso3166Numeric: 'a06',
                customCode: '8onu2vkme8',
                prefix: '74vwl',
                name: 'c4lsiuw3gjxg2ubcckea9uzx3qlpl5yiqezjaegvaza0mmmnt8cn71ggf2congto8r8949pkcngx7sy7bh87vlujrth4wq7h9f5itmijfjzrlncm7v34jfcv6yjvwof9x1onc2hlybjvyrvcmn5l6yg0co8njzfyqur9an2chezoqxb4wdtqg5jka4cu4g40962yiry9rrishd96ug0cbvfz87l8046adh6qdkj5q1zv1rmxet0saoz5qq6sflt',
                slug: 'xovh7ywz7ordru5c22p90ikg5asad3cluytz32wd214gi7r9auxfw5a8te7aeai1f32zeao11gpqupp6ygr5ee0d94zmr6vzvsnsospc6wl4kgifrjro7369fz34pqo63nmsco92m2rob5f7u1c6nw7nj9qoie95k9meq312oz1yivywsw9hb0zn8iggds98xvy2wwrn9sowrs9w9ewlx4cef03rn03wlfv6a4ndq2bsvmz11tc10jo0l063w02e7kgzr3d76lplxjoufcl2ufxcgj08195958eidubc3o7hjtakuqqdstrj18flvxvx98gougigjiz387hq3kwcevwx3eczjncad6mgvmrmydk6l6nqm9t32bwc1j7shgnqbxjyg41zh9usm1i7w4dqc8c2tki58fw006uhhh62c0f1901ohqgc91eny7dgxha02c6r69x170rr0h43umhy4ie011a1ig5pmlqnzqoqsz7pbm5i6831uxt2fndlq0q0g94zze1vb4s4kt6lgrqpy4ufsy3fhfslxv83lqr74udi42n225v3lt2yww70hu5rv2ql3i0glqncpzpw7w119aft8qkihhsonf2nigy3i7yduxc1xmiag0gv9ot8stir18yo3ebknhkssbkt0a2shdzlvyztlw5i7hgaethhi9zefi5q44vrva0z0xc0ngy0su6o15ft5mu6br8htde0j5qwobcai96azna8fsau3md0gpbtlqij6rom1tp113nee5w16ti58uavzia7ybj7wt1jgh7djd3mnvpb59cpl54z99irn1oudstdjkcrc0578oq7eubwvyt9y22g1koskdggq217ga5vnch5lwvh8rd3on7p32hot87w1k8s1pofsx6patpbovo2urypu9nfaror66u52c5h2yla3ia5c3jazws3egho69dcv09tpdvv1fj4c7ojjtasdpxqeq6u6c1855rtf619dy3n7c1mza1s89auuxbhqbbtyzxkeakv',
                image: '0kdn8h1iqx5twb40an0bnsgxuuho059yyzm0zl8e41ant4oath8a5qzy190wtf1dgodh22umu7erzintyrxy6qavlitmpviyi37krb9spkhx1gd19nc17npigyvztgpjbwqplynp5coy58wxdpmpwlwlwzjmz2lexovtzafy6hz0uor7c56vydf4jb5dae239tvrycnh0tdlkq53ti2aqc7ch56lse9pq0u5chzwc4z2cly4oywz1we23scxt2fldlad2t8lbxk3w8lcshz9hlp0qet1u5qh6t4vexvzxnfx9fbt27scuwyik1byyy02fdj8ob4glrkxnx7bamgzchmoo1ae0vcsoo15ypqm8vpw7z6lhzw70h67w08nu6ibudeb4acraw69klozohpva7gnxr734wj7cs0hg1404z8rm73lccu2jhwycsmg6qro4iuiz9bbkncv17fu9fs7ktkdxu66qadzr29221569xolehpgnkj4zkf66qgz095vdqu572ykucuh3u1vzi33b1z0k2wwdc0i5gx09edhb4m5qn5rby45wppuqk3dctkwnymtjdx61djuqku63rmh7ji5k6cvo9cqlsv9nh25ndkxtex64ckymeik4h0jfxvm37tov2juzjjx2rip03q7hym78nxaqqiqhq7cnu53e3c6zo5bvf9th1pg1eucz1xd5bnptw8uctxo9odvxoxv359wqv7qj2411h9a05en1faxu76rosgswmn7u00opjcte1d7bcl6i2rjk8a702pp93cn4wsq2hk34jd0zo0236nzdgu3kct51zrmznb0pdwxbnjgj978jw1wzj5j2a10a3sfkrgjwjq0q3stjxyvtxsq1bru42yszn5e7xv0w2wg18kdcen4stw1x09jjx6lanm4g1cwh3jxhmdlpbjfepnuqoqql1dhkdijalod20xow5nvkn6mfz8b2pcve6cny2hxf0n5zul8yvua4x3m5ly8qw3iom6a7s2rxs3t7usf',
                sort: 747552,
                administrativeAreaLevel1: 'cf83qfwga1zotreu7yehz8xl6tevnnly7ce0gxitlux5c890xo',
                administrativeAreaLevel2: 'a36g8dvoa8jjd047xl6vwf35um81icxjwt7pcy3yl6gng9yhlei',
                administrativeAreaLevel3: 'n3oaght4y4uhyn20pzy6n7f1b7chd1ajd31uawmaaiuy9tvbt9',
                administrativeAreas: { "foo" : "bar" },
                latitude: 814.96,
                longitude: 438.41,
                zoom: 36,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'cc',
                iso3166Alpha3: 'cq6',
                iso3166Numeric: 'a1k',
                customCode: 'k9dv90p1f1',
                prefix: 'vhs8t',
                name: 'i6m1q0sbxvqmpfzw4fom04qr7hh8yhwc8wz70r56nhsoh2ppkwvarnmtfillo5l72huebrn9dcvm8zi4v76qpf7k7d41ifaqjr1np15lalnc615ae84bxkoaf93f7oeoqllcfg750xnfwfo76lmwlhpadc9k9uy5jl1c7efal3xpcanaf2mjp0z07h751negc02nlt02946fmy3f4m155ly4ublfnxzbasdbhhr5e5bg9ht082e52kpirdnfnsi',
                slug: 'f1lf6xc4a74f31k91lypda8zcsry3fpywi0d4wlxaamjcodfahae9024x9bdm6yycmmy2dl0k37mtqz63yzda70siae1139wbyos4u1r3xnm4tttocogwnvqg4y3ju96dxpgptd9si03affs9tqtz9nob5h433r2jbkvsibk94xa681eimj0j11d0zfz78xq9fgriuhu3p1z6h7nblnkw5offy76trq6wp5gjwgncn1jcoeehndupveoe1z3ztq00hkppyk1ayfltojol86aq83x8egsr87sfgroq49vz8zvzgceio2x7rdqo8ecqm9g68h0ft8mbut5rgrdoft5c40nv760uekkedmf8r6vf7u1eg3f0lz3407pdm0muyfrvx9xbu2s7gics2cjnc3fywil9zaam0c0u069xnf04fsrz7m1njov31695hoa16r6e0ajic0kxg06sxkrqrdi3e2aykd8dcuxrua2yavip4utncaa7hhmusib4ay7xgl2qnkoxwlj1jueug5ds30qbh4dfu10b7ms715m5blgvknjf3zl3i53lu8hcmgoeovmsnvqgkla59ymdfn0vjjogsvs94r4xlxl8xi4x6gmt3an6epkfd4z7jztghh8bl98rzeljpv472pqyk4aor6drst5qfsw1af43hlmsezx4a8rayhw2qx52umbbyf0wdsrtf0ukkur1pzjo2jtogbcguiw7vxxvk3yjyy9slq1k0qxgj24zyttw38enf7cm5c5ne3ckt7cbtqbo0l8prfz4g88oxx2w8lcbxphqeprrhfe9qudd3ckoaps7ctg2kydrcpin3ysf37gvjwewc5d17mhi78ey52qfn36wldetu7yvkrzdybgpd4akqxrjv5xitatb2dum7vhfx2sitgvt23f2fdp2n534ipuu9c429gowbyp3ng81u1eoawzgslqodr3l2gem0hrr7z9g7u9s0t42553axorfyjmssbgfmxqzk4b30k5pcozgb0tfjq6',
                image: 'c0vq0zs5yfm6kzqni0c6cczml1d5efxu15rmfy74kjbzftc7kv6byo6fhv1kr84zfy4bg6u7xj0otnailwbqt1d62yk11suywngkrx28678cwbn6n9rhfjrpslw5gvsctptr9o1f3coqb87afydrmfna3qi14z3hc2wgc6fvbsmzrsubrvo2rmoijk4wjrgeb6uhrplt1es9vzne2i8bq5swvpsje8f804lbjq0ybuujry0buozvgig44oa8jpa7luvj2ogiz862rr69v34nng3jgbi612w0wd8mghb82og2sem6id9oj93pvk54bcjkkz5emtkvqmcykca14jq1ncg8tfokpmra5nuwwlp2jwfhykxwt3bnsowrmykk0hmlla1wvile86bd0zdjcch0t846mbyomdijxy2zqlpasp6tse3lm9fr42nvoih0k5393u80ak2dafb519r0b4679nbi9m6imlz2rzq5i92uiy5aqibm4qpz6dxq2fetn3ne2m9sb4bjvh0z10f40i6aead0rgpifrqyq8uhkzo897s45mxf84wpv84a0cubqfxhzqgbjnlrb5vfo33vgpq9jt8prixql1lascrjquiqa2vp66tdjpcwvh8liavtylrdm5n07buvnf2r81df5kr9zybamk0imme4ux2wbhc3lseeb04n05gfe73n6yi8exumcgffgrrfp2v11u1qggzb2acf9ay1knmqajrnxz22nf767lxfrvjinf4gat2sienn5ugk4u2j9ylgho2rswh9jb0cn4y9daqzx856vcgwyskspq2zaylktc32x76d3mr9yqac21xemzzg8ydsrooskc0oq4fh41gftgsun8xdrq6t1vl0xc39g5ga4hy1f7ay6macymo90gujtc8cqlw66qt6bertascp8avktdley46azeo2dz9bke76q5ayyi9sonpnrqzjstk99vvgcy4dztg8oiqdmfsahlfev60u7tm3nc45zrembu19rg2cvnip',
                sort: 805872,
                administrativeAreaLevel1: 'y5cmjnz8bb76337wb2c1zf87mi50kcq2wy0ipfnkmlwlwmwmt7',
                administrativeAreaLevel2: 'a3cg6qehl31lwin95mj57n0zetw5req7eeqyfpz45qff1uk51p',
                administrativeAreaLevel3: 'hb7knznj5jjdtxt5vzhn7k856gv8u4w01nki0oyg3zyhltczo2k',
                administrativeAreas: { "foo" : "bar" },
                latitude: 222.22,
                longitude: 785.26,
                zoom: 12,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'ux',
                iso3166Alpha3: 'afe',
                iso3166Numeric: '1sq',
                customCode: 'icncmmspnk',
                prefix: 'vfj5j',
                name: '0nsl9k166ilitde4ieirwp5g1mv9cpi25p3q6itees54yqmeuef5jggoiiz7xyyhib2jh4wogiebvnqsuvl8idu6xlqtom5y2hoglw6abiyo1p5806vewii2ezz7q9pvqinhitqdbugon4z2t4tuooqy6qigygueskwmv4aryxj1iw9p4nlwxa8qgbkqvwpsoxtuw7v5f3of6qrc1m76q39suqy1l5ow3n3tcxcbqkfhdybxi85sz03qczn2cfi',
                slug: 'dq88j3kdefwwucdov1700v6z1mi7qq8slbk0no7814w30kc76hb7qxro74u4ff1o3iit9uici7zbj5e97vbol58rrw5lqnlgfy41j35iv3g83alwu4dfi1wu0bvwravqs11v0ukigz6sixyki2fhmir7l8xqupvh79vmliw7kw3i4xt42mq12scl0jrfjdhaa2rpem2iygd9tsjg6rhanw9pxz89gfi7jusui2395oekxoqygrg8ifrnsb1ds0zt2a90o0c36ivqy5ugqn3snrfgld1kzzic5xrofnq2xtz7c3dnikdz6ze4x533ck8vwy9vw7hi93yosoy7qfj2aeew3qkcmkeo3bkg856odq3cvw4cnswpezvxjgiwcz121lf1d6fegqvp3c1d8tht0w5aywnblznaqot1x52lg6bacg446sr6q6bmvp6bslxbz3ydfpsb152nly28vvikg4z763kw75rk2fssriecggz1ge9usctz4t4fc8973qvq191kqqi2kzndd7b8fzs7hzs3q1uomcitbydhpjrudgc2d625ft6ouo6biza99xa1netudjgwsmt0x62xmg2j77ixnaevxqg032yldf7bum5kk2trxaxg7zx5c3tpg457qmfnsby5m1e17degon28th7itgm70tyh0joxavusch9x07lcunsbegg3tvpjk3q7fb8t4kv2f3yfr2ly1vwumhnjv9ezmblk96uf93bska4s2dle1e3te9e4s7suqb113mbqzg6ybl4lw6kixrspjm6enhyc2d0q7t1a8ix484apt0atpipbz194mtd1vdjhy9qhxblk3mkhox779sehdxbkwmiiint9wp68l0zck3su6i6tc8m0me5nwdcoka463sje3lol5s6a9kv2pwuf2ia6g7xzw1vbpschlk3a03fbfa1whof140zqcpqbkvsvhqxfnxv5tlh9wj8cnozhwg6ucfcnr1ev1u1pnanq0q1y7tpkf9ou4cjgr86jcjg6',
                image: '1ydkhbzcpoywjyuat66nx0i9ghpq1u4cw75bcjiil8i84ecbyag71md9p708sbmine1nlkq46amkppwphu3qxli6gzx09ob7iqiscud4xovb16cmxp0zp3gbppmf4jmwfjg3roa6xfbl0l9l2t0cgg5g05h7nofxlgy12fwd1wi65nxvsqo2fuykvvkt9o3setp5tqsid061jxd6w1tdxjdbcav0nvfm5w28chifkz6andlladn12hktxbipfhi7u2bl405xgithf1me1ciaz74yilldhmkyrckl66letiz4arkt5wibluusq955dt01ejjcvyo4slrhtgkpyvhlkroymj8r3df6owgeh6rkfure4qhsb28949chz9kfq6gy6b08wtro60yzi9qox197dptv6memgb3oftkzvlxhbkk76ui4uwisrr6js7e9ryuu053mljqhoas664rov8e2e7ok2ub0xhzpbqwh0lsnpo93j2hcxv2pgxcd68t2n3p8qkpkwlkeppbi2gki6xwkku0g8x62omzjd6xawxe27lqa49qtysq9dqfm5bqqr0bu9j3be9j4qmp3zar9pu3e4bp3whgaizh7pi3lh340s82tv9soupd34zk98dndrnmnsjjkwbii5ownsqzbamrant4l7jq9utcggu16o914ob74hw1b953mwtxzupor1ecrvsvyniiyk41yidd97ljjq8soxarrj50k9gxw4rvkalzrv9qvtpy8pvhtksctgy1s2ha4b76auqmrb18g0zjx1a5zayp4budm8mw3nqgj6us5ononw2rym8wv19tvmzpk7sokgb98zu0cngbmucp6mqgshvauuk5xtpy4qcsbb7aw2fgbiwzwkghm0sgrdtbijeuviop3wqehx7jsmrt05c0x95cozxgqpni4asm7rxk3xkzotbvjv3n5wdwkjlcogmqkporv4f4v1i7ot621d0ks1jlk931zxsvd8zfydjlekw2d6yxzi8pi2w047mgv',
                sort: 521706,
                administrativeAreaLevel1: 'afhl10iv5ayzix4d8bvp9gwcltcztiwusyyy58v67ve1e5au5e',
                administrativeAreaLevel2: '4wn91rbkcwto17cxbq6hkgdiqjdqv6nwciynpv030in51jmbqk',
                administrativeAreaLevel3: 'hxv6lna42gfw3iiwzf2lzx3qlz7jxp3krqrsdzkf1huftbxkpg',
                administrativeAreas: { "foo" : "bar" },
                latitude: 882.96,
                longitude: 963.51,
                zoom: 16,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'k9',
                iso3166Alpha3: '2fb',
                iso3166Numeric: 'iy4',
                customCode: 'min2svyqhg',
                prefix: 'olelq',
                name: 'c06r3toonblrljqpne0cxsr1mu8tv69umm72vadp6gw8v00cbjpp03n9efujb1x0yroc3gspbdfotihla71kui52aqevtv3d7idkz846xz2uoawa1jwa9i3v4qfcql4c2wblw3fw1bqe3gd5kfz7km02ravp5y67m71xr22jz6v3urxs7avqmhbioeep3mbjrjv9t76rdmymbsz7e7t1bntdd5uadgdhat0cm4zn46zbiaosgr19tu561v3go0w',
                slug: '5y21m38zrm78ebl6t7okxrsu3h2ekfbimmhzw1pi5qxpp39a4jmuzb500p4wfhdvu5bmpf5tgshjj6lrmnosb4b4n8bzpvv5h08hgbqopan4xs31hgyfzgtdh643byx3zkt36ttrb1temttceh7inh4up6k503yew1pgfcs5psms61153anlr9jg7t0r9nrnxhvr48hru8dyre2l5wuwec753tujg7v5nn8bhpfi7efazdug51je4jdhpa87jzc4ukfl0vg4nk51r28rxpbhuwfshwcfmr0w496tahq30er2jkiiplrpzb5cur4a5k8zh5elz3djlxfzxdg73dj6cm6mldts65ujvsgfjhu2q69rp1kwguio9jup1pxu8oe5l4j6rf9pw9t42232pgoak8er04m9uy5rqxgr08303co1pig7fbt4es7mk4fig5zmj4pbwnycpugov2563wm5tmsdiyjxv6evjay8w1ow33v3btvjm1ord317dqtjo768o2apnr73bxyuivr7vpapzb3rtj7t2h44axfkpk95t7y5cmcu0bfo5m092g9wginz9koubb7dvdux3kzyn3wjrhxn6t78xp9kqc8hxasfd7qok0k7cvt7hywhymtfnvw3py47hgoolm08a3g08d63427axdhrn36uj8171774cy2xmt1z71hmnlvypl1ke28n2bahb3ti8k89u3focakecb889pr525vuokzo1fp14y5j2t0n7ctkb97sk1ndmxhon9snrwwije5u1vb8ohb7go5fiey2sgso3niymdrwxhpj7z6gxa40dnhawm4lhd5fd50au56pn02r4g33ff5wf7dyd5g829cwpdgs79wm3wr6bnx40uox7rzkymurq02v5fmw3a0fmdlt9k3fv411693c7cgnla04xkw7djs4ijhhb08jwpegrtwmb1m7inm9ml1opd5v5jo626sdcdetwg8vg1cehatsnv0jcssmceifneewxu9c5131untyrs8o',
                image: '34ffvpn95fij66ti5emfkqmvpdxmbk91bdlj1utbwo61ppp7768o0tw9fxiiu23draj1jxzhqg61gxnoiknkhz5k9nrdwjtf8wsrlbmaqfgahu0q8u6hhfdv1tux3er1kxsd1pp0gtw7jw44gxjxbaz92uhphfshpdtbzxuryvc70qz2gyj6e1daj7txn2274kkqzc9qb6npsbwhlbefozpppuicqcx1lt3r28mgaydame5vefsz0th8opk1cy4enrc4jboj8jj3wy5ltemxgtrp57ygbmc5t853yf0ge5n7o9z9hp0rlt2umxr5hcbwc5um8aytk4vkft74lkx0k9bkq7u8a676slkdnl3ayteiz1jhn3lu31ku01fp649b8qkegcfowwqgemytljbzqpq57c4qa4mk2u0572xqy1hemfgrw7sssqv854icpdk43x2bplap5dh5ym8e8m0a9nkssx08m854uisqicybnmp8cvth00o2rkn8jwzwpuaxa8ma3ks0bu0o81mxnf03f4jllzeuj8uu73hpd9mfl1ir8nucsl14psnmxb0jhyabtiepmabuhb4bc692fvk0b5uts2qmzu8a1ljl7pj49nvhyaup2j9zcg5k3h21y2qzgd21y4io2g6loqp8ud71p5ey956sja27owdvq4a9vfrcjzomojaqd0ihqjwftgpiwnvogj1j38jd28cpsfgxwlxz8sylys97r793hcsqxla0kgyxv0aszs8wykogwzslhmx4j6zzao0znhl0uz24z9onq8zxor1e0jbf2gzfyz6iep8g0voeuifk6ozh22sjw7kx72sk1zlk3rh4lfk76v74xd4lt6x9e41c0lj8710cjsvi9bl4y0eo4nz39hcpcdbqe81pm67811joc1krqh2v2xcxupes25i9pu1m7ocv1lkakzhvzksfbedr93jqbexndiminr6ivxo9z9upjphvduzc0ki2rbc9gzfu7xo8gj5kukvhupoi35a9n946',
                sort: 899989,
                administrativeAreaLevel1: '1lpzuh1z3eg1hffna313t21yd25lfhmiiy1pa3zip3826zoxkq',
                administrativeAreaLevel2: 'ng237rtvbe0339r36eftxaihtpvzb12b7kfvszx23na65co7yw',
                administrativeAreaLevel3: 'l85zykgtg4t1zbst6gt5uf8irgnlagy5plng4nngfbeb17cpw8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 108.46,
                longitude: 146.12,
                zoom: 69,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: '8i',
                iso3166Alpha3: 'nsc',
                iso3166Numeric: 'hjf',
                customCode: 'tn7ugioa6w',
                prefix: 'gqk88',
                name: 'puaz4k90mbtbxyjsl9ps5dwhthrsku4n2oyjukaitjzz74z58ah2pklyv624s5mdrwv1wjnoy0msppj6e250uywi1kdtouvi4dxoyvr6kxnhg3z0b3gzai7rabv5fozhkq5esgbo3nh4ci2a1aacgfjiu99tbx5omggi94pbv6jtqakmnb7ac6jgjh48zwwt2prhe0qpgvevlyc2ittny8vpiaqmnvr8ymc4pvrsrow5epuee9thjo5d378lu8u',
                slug: 'nqltzgkz14grn78n2n95kttvv3v5e3iu5umcaxwoxiegtfh5xyyktc0a0klxfjhcmmltfcd6zlqecnk6l0v94pf8aodxa3qj9n09yqancquwg491qcze7ejsap2sylhbudmllo5jjaz5ttkyu076to3xmxb90cnczcmeo41irw5dgdc7k1m2x13u4gql8wyydnjlk7204tm5ycr8496emr30801c5qbzhuiokx1slpx4ptxktaj0wpcqtd3uu5yrsa5rigtfavdw4pb1azsnprtxehu7hff7z4z2l4903389c7woj96iq8tw1qg41469c27xmu3o8vscqzoiaejfgsu8do1on3wrgzcgutc687yoiaytds6qpva7g9eascx23wev0ketv3wi64kuads8ptf60dmiu6uzqksomv6n3awo21m2bhwqme61t0k31av9l4t5ik1ldu8e54r3w7zytnw59dmh3piv8w78s0ivvwbt8do1zq4xm09esopwz9ikkp67jq7dili33bfoh0cwaqytm9ccgoxdjcg9p89jow8ckydjveuv32u0v7xn18nra18z8obr9vg14i8te7z9qeq1h7k8skse11leqa7i7qpxzm46csc0m27hrqlepdfsdlqy3wrt6f7w66ne3iqvn4aiohimtiwcsghfgrp2lj22canzhpacc9ha0tcjiqey88kior7yp0qik8mcmqqv7unz5f3k2zasek98ybgt5jw7ikn9pxjm1srbsvrjm753iuzyn3egc4e1tkdgk8ocwhwpg3mzdwmppqfvrdrpv8jxpwre3kktrs3x92sho4tuinvtkgzhc8vpplfn869nf96y6c8nd79kj0fg8zcbp6ve8rya0zxhjlpfyv5tehcl5ocuui0bne062qtbyrvrhzvk8dbdfs9ixqi1l226163i7rq9txwfqqdniye00ep9wwxb8jirwhb16b4l1uryfal5kje4p8p10bkkmaccrgdngfai3cl5p2g942rdhbkb',
                image: 'e56w6376xs9txc9pks47jmvm4jei9y9x89ijwbsv6hjbpyqd0i01xyinq0pbwwq5un8txjls7tb8sqgu3xepnytp9hna9dqo7dnxn4ii8dkpwaey8n3ebgjgkjxy3iagm12p15u5n75ftdrnlkyitld8pm9apdbqer7caz46zj33fo3n0fdw3hwcoytf1t39m01o2rpfsg8tm9vfnldsrxewzvkax66cjlwbayt76snebrg7n2lc3q2f5uvenn5k36jm2s6a933mmodef1ajqk89sfcbmnefuzwecnj7j5m91l5v10fbu4eycid8i05xjlzevdr2yilu8wsjynw4wldn9rysfdsfvuz5mf9dwnnprb0iiicvpal5smarfiqexhhftba6eqr4gz2uq5jyophipj1cpaxq4zxe4figtoz2j0nin7ewo67zujjdxe8x5v7vo4czo6nz4vle8t56k85y49lx0sfn3btzw40zn7534ycr3ga5va5tk3tzi01jco6ri6zi1txc73m4352rqn3g9bizo2zgqx9h0m0jenzv380ja5exkvyf5cbjty532cvvbb8pi6jkxroc3tlyevbng94wcwg6bdqng3vvw9itnpgpbpk4ln2h9y27wayy5vw938v44q572hf8hjh3oo45mk84ltd99a4kcsr01ulbqe5jc7b6lptdtierqcu1ikcqswf8hfxjoyaqkho8yfxundsmo2k8k5b6q4jm6otxepac9e8e21equi7jwkn3wen52olqg1e9wybaiwpbkzfh0hbcmuzr2hd8kfy5oio9rbnk3vqvcapw447do5opln0y0041nkaufqt6l5hog5n6uxio4vmiarla33cze5lgvgqo80ygolvsb4zwqxx6rb78z8vgp7ucrkfgdxteimhzlwbtqfyczweo0fgvceszzniybmxkuiheksch318vk77975h4ehpox09mdlly0uvo9cnjjc248ejub17waatthlhcsv9tcbcjxbrsrxr8',
                sort: 862811,
                administrativeAreaLevel1: 'ja18u14naaiizk6iegzioa170cc1tg2by68vavd7b15uiq9wob',
                administrativeAreaLevel2: 'ofa794bipyyov1v2hx4kq92a3xue7cgu177ck9wlw1z3shms9u',
                administrativeAreaLevel3: '144wtcm96ekz1413okauftrmvjjk1ymp8yvghzpqlf3is6mtyd',
                administrativeAreas: { "foo" : "bar" },
                latitude: 767.04,
                longitude: 816.87,
                zoom: 799,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: '59',
                iso3166Alpha3: 'gyq',
                iso3166Numeric: 'e1b',
                customCode: 'mxmzm6upp4',
                prefix: 'w2g5y',
                name: 'mhf5hp2p2mvldcd50pua8r9e2ip7m42v3uovzxl9a486vwf140dufkz4aogbtoxqrjnvpo45w7nzk2mn42bbqnorgsxdznr14c5ha8x0m3bikgm8anhuorvfku1oqehmzcmcq89go9cmvykyh5oe907mmlq6l9j9o28g24v1xnschx8x19w5uweueyy3ppxow1uhm4lcq7x7gryls5gdv0u2i80jq0xvuzqr5auc0euc8sl7u7clprgulvx9nqk',
                slug: 'd1cgwe06kmnvu4m8wchafnv9gdwbkrioxh9tqipogygw3k1ugnaydhaji5mdet9uukoknzxvy6xuzcws0yfllhyz0h448axyba7wkyqxpno5o3x6jpdqevzmyqoos8vq9wlzppogfaeaae6kbsck0ks4kque6h2meks73jv72kc3lwdkmgzl0vdq0496cjbiakqe2h12pmi0ipm85vf36qp87tzdmr61supxja83ggluvswgmnkui4ovr6yi3jrvl0i4x508mi3q4x5ev4qzsg9khgoqhzslb9q9g2nzsrrbgzecotgizn6ssls1lkwesxl4n0f9fzlga96dlhvz5yzc4ehwujg494ohwr7lmp2wxhyjrw9429k51oujxdu26o2vv2cpbt2duzhkgcaaya420su56dyycits3jpwfrvo3yp1ik2alr8g73brxvyfqneo6kn0re3zq2ah4tusl8d4zmsi8kezb1orr7jiu3vvw5mxssdkmo5g7s4q2la1zwmn3mnymrfgn9tj5yendjninhm70ttc6z9yc69kn4kkq77f8petvoby63oaxzuz66zrmjkbhc2zqhlgkpaf1g5e6mbfivgdgz0nh5tee1a4vh9zzhejmr06p0egexysda7jjoowvdb6ye0lccgbo4bqzyogozq4e0ks4j09w33obhy367k6gjg93hj2v7n0ug5radp6k8oeql2r0hxp7q09kyxetq6x44rkcvehgb17bservkqd1b44v7my9hcos1f3nh44fe7nfrw2wfor0ycombe0556kpsahijgjrban487rpqdjwunfp127e6xkuu5i015v89urehdynzth89lhq05beq9f0xy9st2qe7u6hn7ynwx1xxmaofyi1nl9rphc1cmqwk9rxzpcrgsmrtku3oau2dstodjbve4v7ahqum7yiucpkmw9u47jru9wqnkrzha5jptjmynszkmbavpc6mdgfxacckzc972cd4kqiqx2yrya1f7letyudgf7',
                image: '3rct1tq53mohasonr0c8brn7xp408hbva6wqg5w1a7lo69wsu1wz0j12impsh7wtuies4t4l4x4md6zies810b9e0xu7z39m2guwel5tzepei8n6nn190h9k1sobhtv2tt6tuls4g6k8fyboolh22y0d0zxdmpxtr9ito7epkij1awaoz99102swqdy0juw9xy2exqcnifxbcqhhj8oqwdyip6skez3brm5rupyfs88mzc37llrjb3uhl0vks0zfkn38xv6lsn153enm9l5d8juzqbez6227nwcl2q7qzc2w0t0pha4fhdqgb0apj25wrwpep5p09t2wmolcrb1uqxa65i38tipz7ojcfmrdtqqomcxvvyftgorr3dzt3wlzah48j7x70b24v2oajebim3hbmth178npmv1c9gpdzp25pa2znxmis57czs62b14z8qgxsm6pegplwvtw6xd8db4j31o9kwiq7c61rgnjdgm3optcnd8acacfooxhkjmzolpbtnw7y6k1guttpk6j71upy9oe8sloznqfjiz7m8115w1x62w557zjgkj6f5f75zbajmno2td80l698spz0ufmclnab2qhznypfx2gposw49azq4vstkmqs4jwzp7aa7x5pb77ejub5h6141r9bdvuecl31towvz8rh001k5qtfeq03am6exa3d8lmozby1arege195dppufzgr7xhl3spr15nsa3fwoyd5wk536d0ui84fcjjgpnesf5731c6o6mgeiohmx0ro6bymt16ogp24njy4pn6p62efirzn808rhs50pubt1fw9jotlpy0rkzzzxy9bvv3qy2e8zzbi3e0475jum1i0qgahgwbljzp2p028kcvrbtz1t7slb06j124gvsa11simngirxkal1sd439maju9syp8vnz8z35u3wuglv48n2cwrl9545okz2f7ak60tf1yr9o2l2krx61e8awxgem2eb7wfgasgiyqfhd4gl36c35o4rjz8yjz',
                sort: 410404,
                administrativeAreaLevel1: 'r8zvo4fsf6zj4kqk8urtsibz6lywma6s23pf4lnrtrq6axkf2a',
                administrativeAreaLevel2: 'xv73ychg2wz66i3tmi39g17oxqpxpgq4tug5y30utklozabdz3',
                administrativeAreaLevel3: 'zq9k91ylxsl9v5bzca78zh46hk50zvb2n45y5mfnotw919gyv3',
                administrativeAreas: { "foo" : "bar" },
                latitude: 230.77,
                longitude: 968.65,
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
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'wi',
                iso3166Alpha3: 'vw3',
                iso3166Numeric: '7ep',
                customCode: 'u64kmtimgo',
                prefix: 'd0kf1',
                name: 'xbtcyes7vipfa99nd8s5wrrvwllzwchle5vkbx2l14nk3abeujjr9r2zobny052amyqspw5rc9tqjzhrgmw0exm21r8sea7ognetwzl8ds8o4qsqo5axj7hylx46skw06rtoixv1faeshbu9s5h58eztqos9dsg7pemrk8vxgjl1br5hnag671mewblvsy1evlas5j7ly6puyxzmizz5zrqzwrfvekk8fkfqyqblsrqk2upy59u5i0i6txcw1mf',
                slug: '7h2pbk6vzrqsztt99je1xhvjarh2nik9icskwwjatpf4x3sc3w8i3ixfiuf0277pkg9c4c5rjk80cvs1yhlr757f5nc1jn7bm27mr41lo0jg5vdry847okxx9gptyaf8jzszkmgcird233xyn026t4mydl33r9zr3c17iyq1d5so9kpxa4axyls17yfkffvssyoqnkm4orvt9vouv3txc4hv7zx5ndltpcsknsh8gu90l5qnjnz49t72hawpzane31duovpfpx10vvn9tkz99gysdksfcbrk2e2i8ugsmxft9lnfleb6jbngfpgf0kjihtp565fppiwvhajlv335ct7burl2wgvstjmh5xvljw2eltdpzhlaf0mvy5iox6wv2902rouwe2a9jfe3a6g2z5ntojiwwwag208v7kdkbt1ejxnc0sx3ups2d71e82gan9cxt1nmxv82kmifg3mswtef3r7dbxnw0bqiq2e9u57kdv0ucvonkl6e1s2m2vwcmzyddhvd5n1ex1vwjd5u17hqmaj3xt91e1jm9gv60brpolvsl7an9inwr84ccru175secv4y5l88nvh0xbdoa7418d3jo3y4ryycbs8hv984x2mkc205rgj0zpxayq3c2hamvzt5yjqrbjftfu0bdip7iwzh4wituws0nfs1ibosjz39kr6s2nclgj2ut1974iy4t6py0ratefjh4u0q3v7mw4s7dzbpqgtpp0hdu5rmrs8fuxfb870scn6q7d08e4ugn6j8qyuuxuac1i5wl9oqlm8hu9xz600irvkdrptwr3pegu29tk86410luxt1673fgnydzrdcu8l3y8pjyreki2scs5935tuie2ron3oilghd8dd7s9agyfatotgdkq8yvokjedvbcsx1fcvkiuthd95ec84v0i5wlme679j5w5iqjefq3itc5b5of28goack2xuzahg2lo5sbs8hnlolmsqunhvrdv5dntw28qum8j0ln4qkvf6xrrq8emut',
                image: 'fsn6d8d6a5vb52kn745k9dkeeor3dgg3ck51stbw6k1g7o1fkq8c5rwiu1frrzfastseqlk8tpjcbbx4vl47qnuhj2afv00odt5stjdnu4xbumj0qoi3do8pb5wur3cf29u2eo9udbpwwk7bqd903cp7bsppdwugggnfnpybhrqzsxrfkiodg59xasy0j5ejmn6lvfmfhgl2cu15bvctgsq254gjzacwej0n5xd1vqqxu33nxw5w8xuc1xhgu3ua45nj6dl0ny7sk0fv0kbhf6ozvmpd2dqlp37jm8lz25ei1zzm0m7xzzab47ep7mvugjjqllincxhg9k1u4ib57fib14i8cd71jxh3zz6dewsx1xma0u377o4tvi60u4i0knww7966x1mbn17zz3vj7jybplufl9034spohprvzhsgppm4bqk6gkkkadk6vmrjvr0wc3tx6jm456wz1z2jgoruplmp2090spjahzwz75t6ds09ur988nuhmpl3ilk267e3dzxceb8jw2v4c2m4dyc5u1krgi2x1vzqhp87t04ggvelprg1zwh086vj3px4j1xx5d7mghivkn0i9esu5cqqyhvcxcwchtr2gakdxadldiw2l1h1a38817jj1um6msz7owzlpteieqthrx97p0rwyowvl22r12yqucsseei5hjucczxazbs7t9m4c0jgv2znccr080btsbelofsvc418yvr72pajw9n0crz80anyw61ei5p7ttu4p3xkxfaam663pgqx1i0tczmpxn5vhkugbh2b609k31l9mso8lq6mn77oshqq87rx7m1vfremslt1hqp8c5j01b8mcmo1lt5unofwe805m8g6nb1tt8tmdjxmp1b7o43pd50cx3xfux70g1op46n0649lb3xhrouw9nubvwf8o9q7hricz276y4rpkcqnrjlpabdvxmjc5sqpoujv7ycj2sftsrtkml3u0ade3r5mkbbii4phevjaes3682jsvkgo8j0f5anz',
                sort: 757037,
                administrativeAreaLevel1: 'ys3e6vvjnf2ba9n12zqhn3ibplwsth8qezppjz90aytusq9e4e',
                administrativeAreaLevel2: 'fc17qpkssxir8hn5vvsn3uvfkjlr0lm5x3h8iaqxbefen9hg8h',
                administrativeAreaLevel3: 'pj5uypcp5i8qpryab8vjxv6lpjwus1v9k6silyqk1lwpc1h9ww',
                administrativeAreas: { "foo" : "bar" },
                latitude: 703.26,
                longitude: 419.86,
                zoom: 58,
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
                        id: '74e0d05f-b0de-4746-b59e-b0806237b151'
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
                        id: '68c28156-77c9-4b9c-9608-c0482f39b339'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '68c28156-77c9-4b9c-9608-c0482f39b339'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/64940008-5892-4e4b-b283-54b8d5d80992')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/68c28156-77c9-4b9c-9608-c0482f39b339')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '68c28156-77c9-4b9c-9608-c0482f39b339'));
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
                
                id: 'cac5bc1d-5923-4b5b-896d-4f8ef9ce4779',
                commonId: '28606a25-349c-49b7-8bff-531512308087',
                langId: '6ada8d87-6b23-4931-9684-6322ce29bdf2',
                iso3166Alpha2: '0l',
                iso3166Alpha3: 'opr',
                iso3166Numeric: 'e88',
                customCode: 'wtmqj89gmw',
                prefix: '8464g',
                name: '295iirwb3yjf9vkr19j1ak630ow3cgwu17lx9rw0miar9saatwgctgviax1hbxfdrpwura2gl7mitzuqzjx0b2dko7z7dlw0grk3iy6r9psltknem1nggvc9ck6va9bg4pcpx8j3ovtki27xawrt92g4qd5esjxstqj88z1gkd06goku693ou06jbqagtmniujfx0mwytklxqs6kss2obtgr03nr993i2owcdrajyvq5184r1n9qoe8dhb7bej3',
                slug: 'bzxhe6d592g2a1w0ddwifq7146q3l42k2mdy2hnm42jef4jw1ry4ih6q46zfs9lhyhvs5hwni5b37kytrgq6cw2twos9dt736kqgqnovxm2o8zd9m8dyq7exhq7wwijl08jz5fjdbrddslqovvibu8fj72xxf1sd5xtkipjrdaa5va0aftrogfe9k6i59iy78l7cl6vf36mvwlm0jziqofppf3jkg8rv3apfqtvqiudrqse84rtnkxgju1ldl1dgw61hsgrwkkyp9kdbupzkrq89rrxkfgcqc1m36g46he301wgqea8hcmxyjbqzxcr92rps1t01xkt3ibvcml7pz5fnqbz0ignfnis2in0c5ri86d60b2terbnvna6wrusbu8r22kecln171dk1sxg9c4thon8odq0yvix0n39prwletazfh7zpwijqcoaxe9705xrkvumzfa6eqxrajce0gqhinpdmdxe0txtyw9gm35qzse2g35y8gc4dq0v8p8vtz2liyy5h4d3dvg9s43jjb3wgdx11nlfamklv0kgg73lj4lcopfo6keeg4jwjmvp6v9547e0lnjidy5vy3qudvnsqktscn954u1v92lr3dt5cytnn7ugs0pwipmorki5rnedhvqfwdyr3a2ditgbtatevol2wsg9qalhusoyu3rx97hv0pvpp7gnn2tklfejedn5km3wo2e7fj5mounf07p1vbk545t8k2tprjauh5pg9h7dtvcp1m6oj7s4vtvdzo6y8fag0v3bcwfikajkto5qtd4zs09r8y8c2p7v9hr612xku28i25h4l3zck6hhqjiike2n46mj8r5pw0b1fkxe3w0nlr8khfm7pfvzircov5v38jnnnnnp6znjf3efvq0g043xsb24k6b3zkqmllf6vlkptoxzblqg1s6t6jyh4n7evsybxvos6lj95a082uw1ghwl5kawhq9kes3hvn8uemrs5nina8pnv0nc3pv0qg1q29ip56t5lcmo1bjkx',
                image: 'dl48bvjag3xn7wk42vd6im3ahq7e3nke1kio2hfewuc9gwwn1th7rvjow4pkvuhqle3ylvkleh9epegrxo85ebb6zyusoevissceziz2l2zwrf2ofki3140q60ho9rcg0038zbp0zo0ynok34fvmdxoavypvk3qo4fvb9t4eqpjl678t8qp4oay0vohirj7qv8fobvct371ohjlo1b80oviw0tw3yh0mvq8gh1ipw976qgdmj0a1vcfn9466rahpsxcki5lrd2j49foxrvjprjxqkdg8ukynyx8ogqj33usri2k9dx2bdz9zlc9zwvhn1esiqnbiumhh9n2eah9xg2ktgbzoe3s5fkmf5pi4nm74xn4u6f1s9snrdvby1cttwnhkdlwfzcpz9ky3ua42c0s93cekm6i45lv0l3be255hs1h5p4uaahibucn1xfnqdut4ix98eku7m5otoe5mkgimctfwie9sn34k9insg66pxsl3e6fusxfbx3gnuqujlmouieu5ar1cnkrds4bronksl0f47096kh9kgr830efodl2lhq2toe905eq4nb5uid41knfq8f91fmz8eozenz0mpkdkvqh8chhpbwv85yh011a09e5o91kt9k81i20pzpk9cbsu91romoh900fr8d0t15j2m22szgll25cswwzd8meh6a3ti9n893nzqg31cxllsv52952ds2cfodxsiv7kxqo88q2nhzgzytjopxguqppv96m1fig1uemqt1kjr4hc7mc5r746hykmucdiubc6h7pdxijta3agh4vhozfvvz4amvivk8w3jjpyg23ulepn84dzk98z6cymwf6zys919sjtg17k3hprgjy3r5wi0ek56lmh5ki8j7wq2fgojlkoq04qy2t4nrf0gh2izpzm4875ydzrdc3rpbs5y3ymsj31sl7dtgjd4ko4yfo6vn0uhud599noc6ext2lc576sv8itkohlyd8ez15o23ifw0uqa15iqxzi3g8xkw5g',
                sort: 945076,
                administrativeAreaLevel1: 'evwrq288db4tsqlekni0vp8munuel21rrmf2gmmm290861xwbj',
                administrativeAreaLevel2: 'zwf59j7492tbee8xzesuhhsek602fgkoh8b3hebjc8ldiodeok',
                administrativeAreaLevel3: 'qyuhzcthjnk273sre0xtiosrbofbu0gfiin0zhkgbqlornj3iy',
                administrativeAreas: { "foo" : "bar" },
                latitude: 93.46,
                longitude: 591.19,
                zoom: 54,
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
                
                id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                iso3166Alpha2: 'xv',
                iso3166Alpha3: 'rrt',
                iso3166Numeric: 'njs',
                customCode: '4ukh7z9yym',
                prefix: 'uql6i',
                name: 'zki4kvx8abgobecrw54n9j9bd2p8xprbr0ren7n690l71ffgl5psem7jzfq040azos1dx0xy4g069la5x6v5xou9vfaa6tf9qg20ss4sfqnqwplt084mgdqk7upf97zw10wsd83d1bfknvywzi9yv33ho9lmhnj52nmvj4u8lqruenu6jgq1j4e9tus1do34fel4xky5jxyu5kdcksn8bpp2i7480hn3mjzbbe0vnklbj0ib44358nx57kgsc49',
                slug: 'se6jmf2urolkgit13mkyqf1xk8z8aqklv26ng4fnkh1m6tb6h5af30ho88wa2k0gptpuoftw7fwzm4um6kiwqiu4dvz48awxb6x3liq7aht2tg72fhsjso45tmb315ptk4znoi7bnrbm4siriu93lf86w347y6hgu383m6v4uvqrels4lp7esj7uxif1x4f94y51yuojsmxn16cuj8to8ktfz93em4xezl16001n67eoaluqhj2h7d00f1rp2kpjofql9y23r24vfuh2ykygexxx4x5yxlneli4n4ptydn2829jo0a8vld83y9d3tadmmurdh2igfrgeiarbf6naiztbvkrkieznt1vcnc7ea3lavwfk4f05laviqbnsdv5icnepwra1x2t265earb9pozn1gbx5ookwpv1m2p4vjckmjvyxphtms2casn3q1fia6v0fvma8zslfu7rkjh32tpzjfo5f3s52bqg7svqbrtqqiic826fy0dwm0b90hezy4edw7bjyli8igcs0eu6sajorg3i0oiawlt1iup750ake0p7mvxsbfx101ez7bijpuk888hs98ep96uc4046pohevu6pumw4p1sbie7ac1cs03140i8mqf51hmx95tkl63vh298aqpt9ef4m9oe0cwmcrdrpnfojcdasfv73tibxs9hz6yq60ple6iy9iv2c17t4iwp3x007e9ibe9pnfbfjvfv81kg2583bui7aoossf7kq8yd6y45srrf3dx4tpmk76dnyz4os280dg3z7dju4bpgk6awuecymh7kt8ycrvryjchmrnsi67pau9y4rykgeeqxf1lpd0zq5p5om1pygwy98o2eskt26z0fzkpdpau19h1opqwvtsiz87axihdtyss5co07e6mgoukcd8xbjqlqerwqqoebyvglarh9dq4vtkc99nk04hk0v9t18avj7fldxwgtu0ski4rvlij70dnnw3feggycgoglnd55umkp1r1swit8ryutgc3rqu',
                image: 'hyzhkv67ojgiclrse2vw595xfj0o45ob85azlujmrqe8gqkn6gq421xymlzllml477q6luz13z6eaf61sh6mltlhjcdmk98gkh0huzw7pt9i1hp41ch4luzbi4wotrn8bh8ev490rwu8vdhw1tnu9obx5juqi3fjxv0ol8pnnq2v8cy11z11jy5yzta099po6klyskmwvlwvt83g4i13dce5x82ifif6skwocz52m6wmipqcdq77e3g2gfj5f2vsc1mxhvt74a4x21rnxpjyzg44nyjw2jmwpxe48r282tsu3kz4iaborddejnf8j5xniap6m7p747xwgqi7wdgc51xjql5dizdklcrcsz0z64nkw7djgfxr7dy82nhsvl4osz6my3axv6j8zt8l39y78v2dlw5m472ti32j5uxk7w66sdyxenq3rhtf0gzqedomg9ebhguu5ys7i913e6svuxp6s49565jx5v4e5zwn1ttc44ketrf9n5o7c3hp0xu3n0ucwdqwa2lwxfe627p24vpm3ljxf2dife5g84vll9h5vzutqnaivik25b5hmwdr7icpsbljp3g66huxa91oyw1fmahxk4gvg5h666xd58nmdilnpuwmb8utxgwz6gzo7hlni6xc9dulzpzy0zcrrtdjmtsmtpxg0cenbp63b6yzyd98bje0wiqeaq7btf60ojop81eq57yrkuoj835znmfdex3pz6vjybrnekmrsa1bro39fa8dsw7y9u99o11uhbbiuj2ljro8oq6rclwn3ooy66vykjr8ufttcb3zfgq1q9zow7kqm1xq3emqraeaxsxvws2zrp77u1mh81jdca4kstm27dxzdyumr0ypb9h3507dlhzi6sknfve9zz97xhk506igcplnfc107a7q1igim75c74horz5m0jp1fkiob2gcqlhbkplrjtfomjp44rvvwnmvefzeuwu27kw6bvs774wyjt620n5nf835sbmvn1gblkd8nj1watrydiuq',
                sort: 760801,
                administrativeAreaLevel1: 'r3aa1felz7ppyfrybw2iccwagl14h1vjuzuu2h70m1ts1kcj6n',
                administrativeAreaLevel2: '5g7y67582xkznfhj01bl10vl10bxhqgxbms1ou550mqamen9lj',
                administrativeAreaLevel3: 'lwzj8cpghb321juz1ploj253bogu4f5dtvrkoku4xl25mbj82m',
                administrativeAreas: { "foo" : "bar" },
                latitude: 242.31,
                longitude: 539.55,
                zoom: 63,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '68c28156-77c9-4b9c-9608-c0482f39b339'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/9ad41346-32ef-4141-b7b6-d4d04c5f66f4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/68c28156-77c9-4b9c-9608-c0482f39b339')
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
                        id: 'e4523777-b907-423f-8d07-3465a74eceaa',
                        commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                        langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                        iso3166Alpha2: 'by',
                        iso3166Alpha3: '3zp',
                        iso3166Numeric: '0us',
                        customCode: 'uhhmfbeh0u',
                        prefix: 'lexym',
                        name: 'byfuhhyq8z49idew7jeaqney2ngrqgb360s1i4rfsep79facpbmo6b3yre92hwyb8ksc79d2piya9z4nx756plk3t2c1tgclcf41k5lofkrjq7b0qo9ux5o6dn0euq1ce2l38l5s614qnh9c2k3xsdxx6rqnb1nqsndrqngfdw1og81vhc49c17cnhr7p3i7514lr2k8amwxarfunjfzwcamh7i0dqtyqi6xvxhk4alowkzlfm4veedak74q8tg',
                        slug: 'jhzuc7tgbldhsbs3sdf0n2jc7jfws3f669qlt22o3v7y926cf3c279649t58u88jd46q24p95hi31vqshgbol2ir6652gjj1k42ff6w94ycuqps8cbuncoegm8rhqqfnt0nmpcw2ohxd3j521pm1lopdgvkhv3ia4qxn645e3qu3ko6u210t8vuhdnqu1eslyfbx0h81atww08qsrj6umro0z61v6iweb9qwtkngetru4oia94t3lnkwxrrj1zf2yumvc65i6mfgf13t732y9ji149g0buptu3e3nt01vxl6g676ls6gzj7di5oe6xljedmtjao77exr4l94t7w9cbled44g5zg5umv8cjplkbmlzad4lkpt8q5p22i3yp3jmpm3ofy53f02b2iqpa02jjx49icmlicmohgoxsltrbjbq0g6zggewz06ewuoghofqzbkbquif3w88hv4b8c3xbjoyshumx21imyn7v7yvpz75fyskqfh8pqyctdc4ldy737dohv39wmm3h23mt8rnwiy2wbb8rdfk2jg5h0myee604yq0kww8ri8itzjxx0num223ohan08xfxzgb754q1itmn7dros4w3zeqfmtwuedw8wj6y1gewo4m47x78l7v6zi4lo29bk9u58v9mzoplrg90f39cctle68yf6if9nq6iem197xek7nql23auhw3psnoqbojy1joi2k4k1kymvusuorpw5daazjkrr5ex5e1c6gsc80pxvamx9o88fq869xbhcq94k219v3st90b6nyn20giiw91qwzdckse1jpch2ysury5kv3tbq6ld7w62l55axcxk94xhjoqxhk9x796ok97of4nft92izmp0o34h66i0g4epk9jwolfcjcn0p849ch4d37haa9jegcsfq8rctqnnay7m3hg1s8srhkg9toi4dujp4egblaapxhk5cwz3ij00u4oxnl0erj4kgg8dcm1aswpi8ywb31rz4jm1sbcc98jles9hdcomgi',
                        image: 'ixdn5odaqcok5ch0ko2m25q4j0ek2m815a7wjjikwql9am1jkbpiso5pupyjdilel8unm0wf30db7pfrk5yvdxnpm2y9ndcmg0enuta3c64p829uawtg28l1jq64jo4ggula5hh7vm0139054lkgi14pedvjfwo4xpuxd23a682hpjhizl2fejkbf1fmce366ppkklmuhtzhp4aixna1g4l4zm7lqw6890xkctijuf3f7v79htar2im7mqjjwe3cz80zrxsrnj2ho7dbxr0dpsy2b9vdnd10bpq2u9unie95mfloc6ojlz6g6nviq8ni7j9bj9wajhd4azj471b9rh8vk8ybczz6n83ogypec0mzdy0pa02s344o5ps6w1t4873drvi4s0sj15ywse04q8vkm9eyyrfuuvoiryyjaj3egg93d02dobodc4oyfzgqcyh44atb60ud7atdlu34wudyrm93k33uveoxu2rtteohvzbovaanzlynl41yb46y1yehkf7qidybsqbu02miz3v6qurnmhdjdqusxhnt400w34bkmh3xx23tlv4noyeckcnr3e60vi70tb5lyecvfhk6mthztgh005yaozft7jw7bqlbkpisaz3ngg0uv5jjdzrws7o8wwmx6c03j3jm8u4n91e70vpc6xcfb7kpjgg0gh46ypva4vrflvrmh80ygwgpbguiz9li3450148zn0xopsgnwdikv4pyznsu486u9n7basckuwtdcttby3w6hda6spos12tyrv4tn2imprxdlijp008r3tes8b29qw71l69el4vg59scjhtve2qsekik4lusj1atjlnzwm3z6ekz5g4oae96m23yb1e22229fo77ie77vb980gdej1cgldu0c9mnsxjbar18u4ahxkcyhoziz7f8b11q6cqp75xt6cufgf0ceqtpuir0icojrgid0jlmh3bs7puybgs4bivggs8jp00b8xfbpatw69yu2ds000e2b63u66t8goja',
                        sort: 921185,
                        administrativeAreaLevel1: '4bkbh5tp0cx2zbbrk3ut9d572ebzqnnbvdtugi64k2xsasd6j4',
                        administrativeAreaLevel2: '50js0t63xkwp0j02qi82az41pnx99zg373slow3f2jk1mlprsx',
                        administrativeAreaLevel3: 'kq9srmkx6ectzn8ewnpm37sqlf67l9mmtcsnugiaiyt267kchm',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 278.00,
                        longitude: 880.77,
                        zoom: 48,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', 'e4523777-b907-423f-8d07-3465a74eceaa');
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
                            id: 'f8f92e46-e29f-4d87-8263-7dd02797b51c'
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
                            id: '68c28156-77c9-4b9c-9608-c0482f39b339'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('68c28156-77c9-4b9c-9608-c0482f39b339');
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
                    id: '102c9849-8837-46b2-ae02-1b43128f5033'
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
                    id: '68c28156-77c9-4b9c-9608-c0482f39b339'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('68c28156-77c9-4b9c-9608-c0482f39b339');
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
                        
                        id: '85c5b0a2-031e-4e10-8828-10db2f31d264',
                        commonId: '313663ec-c4e3-4ab3-8755-833fcc73c29b',
                        langId: 'f7fd2af8-a2c1-4913-94df-bad89eaaa797',
                        iso3166Alpha2: '05',
                        iso3166Alpha3: '3yu',
                        iso3166Numeric: 'xx9',
                        customCode: '1b9qjfx2pz',
                        prefix: 'qol3l',
                        name: 'qqohgyo9q7rdc5zz393ap8a0pfn10d55ewtkt2cca8j9bjhjap1nkcpqcq3ojxsu24quh619363w6jknalyk8jn3cdazksf9f7u4btnwkdl2hy4ttp08eaiadx7zpmtmf8h6l2d9zjabiupfg2imsw7kj2jvffwjioi9u0k6h3hq12g288ng97x5r3amyk1evicfurunhnaqfcoh6pofncqgan22hw0kiz0wdhxte203ia6xq2vmjji6ci5caiz',
                        slug: '2w2szcxye095w04mb3p04z5xz08ih2ejzkbigxekuqw04agqlefzpy8avm4y7c29wmqt66y77iqjm1dcnx359bnrhlwkkba0eblq7rs5g1yo0umdnm0unmlfljm7eoj89x4a9uu0mfu6cqs0ca8j7nkj24b16nha7runxy55t77rg9xdl3nm0sz19zoudum94bvc5bgb54006kwikyhckfajbn3dlis4wx56d32lavba6lv9mpjbe4ty7o37g414ri6s9lwksxl31hmfc5zrtul4o68bsdaj9qhsfdwzty5fyukcg4rbqrcyp6dtu3pe7z77z7e9g4iolmhnwgitnk7wjdxllk7l1899ecuktvqoijce9een8nuf1qu07xlcwi1bznxlm9ea9mt0kvqz06bqy9uon34p54y578copbxcnvjzmozpxcyrm5kczptk0zprgteexwomxawsombpl07rl0axfigyywumstrtpyog2sgo76i5mn85wag8prtvw5hhifgsj3dd8681mvstug4lcqtilww73l6hsoslw5n247wg0gp9pwo4cdbu4h46ijzftfrkowllyka5ji1mk01ogetohhlt9muhkwmdc5org1ej9xrou6tbrh2kucxwn1h9m1kq8978xx7wkzxbzmqwz54wy10ni6mu7et136mzopoq54cndizacihzh7ku6dnbgjr2aql02uwy4pvs3bvpiathuao9lhexhdwjkvpk1uhmjlwju30pdbj9vml3ygxbctj4ptpft2tz8cnzvzw9qawgvge1aqfrvcrql2brjc7fup1k5hfrvvkbvpkhvhcje2pogc8i8f2hn6h9v1mvrtqy9mpnmxb4khohsey5htxmiiw4o9yq01n79tc4dw9o17eisclau6exmf6dmml0mm46zd59lqywk3vljdqccb6qluencggc2bdf44uoh2yubw5r6dst12lpva62vmda9h3npqllgey6x1n0wj6xqywp9y236f9nkvf9bruy',
                        image: 'mcckauv1nqwuzuvhbi3hddfg6xwke9tr3wwzsou5q50coc6wdmye6228co92dnbu1mrvgvu0n3u5b7sm7t6qehyagasipoc1pe1rgd3ghlgu7gmh1dnzh9beyvwvt1lsfn8wogd29p47qggbmk9e53jovn65ez2xx0xqwcf2aqh3frjt4n2aba9b6f9lx9ev0zhqt20mt4jdilc9f6mzru8gazkyi9jtims718oc7wk88jpwl72alckoo7apf6f5f5ctlwwq0lsb48tlqnwvldxxh7yck2ygjr35zknur13rs2wua36ss0izkvdssnobzxl5w1c6j7031t9cdihzwurxqmw47hquyqn09w6jjwie4fsh45k4a0zltvldbbp0o5cgqp4vyv4gu7qc23uszh0ogze47xlpfxqalfez8epflezzbvfu84pm9eavq1cmgyx9y93dwxkl9doumtwjcmbxaphww3sqxx56l29d3p8jl3ut1f4ze370bkud0ujywpc9is7tnnun0p0hx36bajaes9dk91t6imdewc9lepbnjmgr2df4y7stsjkd2q2tadcoske6ekuacs7cyuyqguu5xuvcgyw2mpt46enn12yale6xnrs64sqwjoae1qn0yg6qle8448h6mdlnc1l4wg7xzevnhk63g3490xotseui4rfyea3x4ivc4fz1h76thgtj3r736x5l4eccfqzszfnc7j249cnizd9jf6qfsg79vaidrbrn3m6t8hh1spzn7ehwfc63wy7fvxpz26di9yfah0vprhly00jkkunk2pcwedm5fvb8xwm0h6jerb3hbpezrz1p2czhrg3qlhl538if8ygc751x17f4icvx4o7znick1bs3isipgoa9izaz8yh7bjykro0t9honh0ltglxlrm6a4j6qlkvj620614nl6077j3grw6e19t5q7c9dvsa27l045smcyh6i35f37kw65qx0fatg27igstkwke3c6s4r2qdxrh5193c558ma',
                        sort: 420503,
                        administrativeAreaLevel1: 'w9hhg3cawy9pypklisst0pgqyjd1bdd7c4bxyn10lby2wni17e',
                        administrativeAreaLevel2: 'kwlrpl88b9qd02sxlj05ycvjwr2km4rv7sap4y64e6csledsoj',
                        administrativeAreaLevel3: '20uwd1m7jfvxcl6akio5hht9ujpeufan416v71ahk63p4nnixu',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 153.35,
                        longitude: 149.45,
                        zoom: 75,
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
                        
                        id: '68c28156-77c9-4b9c-9608-c0482f39b339',
                        commonId: '4398873c-7f67-4743-a4dd-5f615298b7b2',
                        langId: '1950e2d4-fea2-4339-99e2-1642f239c56b',
                        iso3166Alpha2: 'ds',
                        iso3166Alpha3: '0ui',
                        iso3166Numeric: '6pa',
                        customCode: 's647646s6n',
                        prefix: '3f1zg',
                        name: '3qhtrazp1wp6g1587isw582xnczb6t0kgf0fy5lgj8b1mx66op4opac4w4hceg6ljnm5acy25rl1ugqpwkk4ypdd2w1vw5t4dv6fkfrv2bz9pcucy7lzftkzvy5queftiu9utmkan7e7avid7bw8ed1gympvznio3ldf5dhs97tuxbn17esde3tr6cdk1cvuuua9qvlwwg52gkwcyw7u1q6ark9fverd38z70y3chya4icovgunma5sakc3nht4',
                        slug: 'niiq01e5g9m7jns0m5qwigu13f6l54q7st0abr673s5lmjw9t78p1jtjhzhkxwq53gj54n3hnmy8rzt5h6s6udpzy2k3pc0cmj47uvjtdacykfstn74r0n43ib6llg1il98bmmne3uwwa9mbua13hzwbx4ypxymno4f5bgo1ckiroxe0tbdu2zd6vwv2nnkb7jb32g5xhs9kjnz0hrwq74bwm8ygixwda14iabs2vblqzlr9l9vah512tqwej4x3xipxtq412cw3dyo6z0noybk1ynbqxmc4aqgvaziz3zq85n75cu8ycbrfqzrygtvlzfp8nvdq3dvi8mnz8dsaf17vjq85t015p1kquii7xf4x0wjbm4uxrrmff7yfr1n2u0us17p60zm9gcki29j9jwv99l63qbyhp1vyyduv8agx4nmp427nay5loutnu4pgm7wr25nc66tp4einojhov5yjt8xcom303c2i3zfit2z9jdp8bf6sg945t6s2btqup7ob2mluh3o1n6ajmor9rhw9ax00aqvpj4rf1ah7cljhyd5742gw832q5u2bvdofife7ktl4lesp51z27jag7edbu55qvnabv3ic9rrqctu72ngau2lef5aro4s1wf23er4a5bhyqmv63o9ye2w4o0tzohir1bo4olz1ecxgnk04e6x1ts8pph3zvbxn82gbpmqnbvr6kr4gxu8gs7wjjd282mp8soqv8dm9f9jcvbdmpjjhie8l1syrv61875pdljiwqdarbe4mehrdrmlkny3tpl0z4plpc0amvjyhb31xwtzqkv21nkdn8xv5f0enly5qgrzsfa45jp7aa1yi9ac3bkll1r9nkfnwoa3yrxjgl2gldz2q99veyerfqn3s8m5hz7ozoomq18hbg3v0w98sf4ewd4hwma9wphf4n3zaf3mcy0b3u700lhtz68gh8nr0mhmmhzg5xe6og3zwwfk113wkxfjj1de9o4swoa18qfybcw5zcr0te30dd4ph',
                        image: 'pd4e6398rdsddzkgy0jcw6opyhjdrngjla43fn6yb1kpn47x7l2dzemz7zx0mx2n6bt14kq20jn4fukg1y3qjqi6giu0epb4ipwezn4djkb4e9025kjjgt6l59mudzihrpnanqlcnogd4tripeo98mo2ej8blck7nrib91ay7euktwd409utdzmzzqa94zd5q5x2z071ts5i2f731mgmhh9fohff6uvbeg13n8dj0rm93e7l1fcj1ctuw14sphdtvuk1tb4oa5dittzwz8y0t93ql4x6cn5a9dno2puh0r7urtorcmq2jniqhns4ebvj52myc6d5hzqg5f0egj72ins8fa83rvzhrit3kinyda7axtchdi0ugk113ngn6o7soy86e0o62fjhcdk1rtd7n283k913jv6q7d1xz162flvhitd2cyzs7zf152bb702z0v361aa5v7hclxe9c0pzuetqg5cknvuhsbc95rwd3u3b28hljlni551izll2dswaqcy2ysozzm9wxcmeqdjdo1mbsnih28q2f6biwef726g8tiama9exke1fxf88dxppkf629roncwtpwjiq97vj38go9hfcpff2vr2l4mroqzav2h85vqhzx4kcoow55sp3mdoqclzo60ikrgthv1v5ui6jtaa6lfhx3w0359ofsr6cxtluagmqs4n1u8rdwtt1gfvzpgijmoyj84meu11ge17fqs9uydctkpq3qtizbhz1r876p0r7gvxsrjh294k1d5ght33y30273aboi9rm0rwwo5ose1q845mmjiev82pxicsiwcjpzibd8n8veowmyjwa0pggri023yp83qzy1fjdbani5m4wumiyujvyd2bte8zexaizzwn99t5ei8pi4z9x75e59b0enof8yhiy39jn9micp73x5tq4qicr03d9i8g0ghk74irzi2uahq8yyzjsbuydkr93zi62ldojnb7jq0dlywfyuhh3ei3ql9lmxaznmsc0b81zdijerarl',
                        sort: 986988,
                        administrativeAreaLevel1: 'os6dx70r97lr2qaf11xnlyglzvyka7ig11rxj0e38p17vts6ri',
                        administrativeAreaLevel2: 'yxiy9ma50y63yj4fw2mujx4j2ff0nwb5uob0cdwg3zltw2o9g7',
                        administrativeAreaLevel3: 'jjva2hmq6pl8wzpibs66oenlexkteyd5ujcqdtnlf7yxpnzuo2',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 361.54,
                        longitude: 861.56,
                        zoom: 12,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('68c28156-77c9-4b9c-9608-c0482f39b339');
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
                    id: '2f90d14d-5f99-40de-8f28-9b559a41915e'
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
                    id: '68c28156-77c9-4b9c-9608-c0482f39b339'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('68c28156-77c9-4b9c-9608-c0482f39b339');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});