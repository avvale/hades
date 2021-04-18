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
                name: 'nrisx239arf3j37lutgcxzd0lgry1wrxj801tru2fphkt9y6xru2y46qcsq27ucy9onbnyynerjsh33kkwcex9xkz1qy5squ1t5qcm2nud0l76cpoppy6bj0ilzjjxlzn5vx3pggteruefajh0bkjnjn6iu45941s5og7unyb7jggpi0fhviylzihtu0d0azyy11faovh25hibgjti8vz1k608ndtjngwda8xgnjlvmodn603bb00v8acbcp0t7',
                secret: 'fsfdofm010rac3vcwvhka9wpaejnza7orkix3b3015l0tkswn9u9zs3cw26jvyzlzbfharvugzy6kx2cwea851tn10',
                authUrl: 'r8vz2dx57zwbnnqa3m59me4o3z2q5xtghallbsdzbud6xliozhjlonqrj90b3ayupkjbqment0hl0k1wg1huhfw7b9cora82yq0orgeh29i39l7739loclh0kfdkfszapnop3hbrnt0vd99oaomjomfrn3xjbx1k0a01uiymxt6yvqd3ah4vxcybqal13e4ta27v8zmc1972fpahmfi2ar1w82xy0lu3gm0nln0e38664fg6orgo3s3tn0fpbhgm5k3jat5mhq66jvtta06xm0ke4ydwdjdb9r5zsven9uozxmb3w1d8hufm02u4b2dw86qy8kk0q0h76vpntoika4ltuwc7js0xpotfvml66o5i04ylpt0ii2al3i7858ejdd0wkjqzstujotx7etytoc2801uh5y1xg03onq7dyzlgmqf7ewmllcjylo12j8ph0lkl3l0ampnq6b3ui1hwpy9meq77flthc9es71vcbes58xjw0tirix6nbbjinj2vzhe7v20cmvjashak8gi6sbttswbzuqjmt328e09jzvz7jscnsmydenbhbrgivvh619i1szethf4bo25gv0gobxr1twvfpth9pitk4qse6eywl77vh55o6alxc230x2z0uh39212e0tr9c4bvng8bh0qwf02zpqnmmwy6s34ihaothri8ompkt14tcxfs7lr4dcyotdspvwbidjw9xfpdm0djtnjq6j2tbtrfduds9wo7a3au5e61douvyzo89lb76bdtz7xys279gvxttep3gquwskgd5rmv9x44pfnjjd3r7wvl5p7p53ax3t25zmxu2bfcs8vds9f18w4h0uc2xnp9gfxyy58mrrpugjbia80r3azai94nd5n7bsazz0kn65l9ne0mb5fvmvj7y49gs2itcqdx2ki9pzhue4srt7k80y3bqnnfse6jmbbil2toewlyofh758qbui6p0cm688vb9ryfkz4oisl8ht3u1d5rrhrklvd285ai1gzirbf0kmg5ek7w09k9y2y6fdtykvkpsk054b23g44z3mvcsx155s2qpgzhpr7k7rj16awijjbmdxnwfew3phc0dhd2cro24qg0vkkrzb3q2xbmgyu1e6ma1fbpv4xd7m299xdkx0ixeok7hhqdszj3ohiavsde3ax6fbnsu67jl7x3c44rzky5boot53l7kvcw11yqecacmmda75136dnqp5jn9cvfrsfaxeq64hwgem438i3y8fz50tjgspcmeexu8odajxqvp0pxop9x65nq6dvsasgv6p8tl6m2xzzrmn7lx1hqnt3v3kg7mzi2jdm5ljie50kce3h7mr4n2yvli95dnjpqy9xfr14etwwzy4ux9fdssdecq8cfc0ljw5u9y9yu1el0j39ysltnlidcab8nwvlg2b7hi06cpv88uqqp3t3qfyvuqn7q2xptmid6iaw2tyi0plu86zaia4gsc1vp3p29fvq4q84nvr50pkc7ytnrz50k5xoh179esg9kxpiydvst8akrruz415t9gkuqm6nb3ksidu1uamc5onof8pt8r75e0x7yej1n3xt5grz68bbtmacro96gwim67h10bhfyz4vq8270kbxczqer4fjwm0lsnputenzxkr5cyoaimu0474eijwrpb2xwcdof4up1x7v6m8fz87qcui02uyqwyhwd9cpep6ybq65tuklc1snt8k47zoifvo6y773btxpsiye11nmucnmyi5jzlz68oj4w46rvd4x5eidiomj88fs5dujtmj8byz4s611j13omwoebc3dq1x8m6qv2wa7q3j1kbjisxvq6zsvsv8ixlnr4qti8q2fol77r0qjwa6836uxjn6y2j355iwwmtk5q11oncog0boq5b6toqo3mhprb1z30q0yvmj7tqok3ubc0p3jv42xoifoj9lklau5bz69ixc07s8uis23a3u9yoqdu9nexdfyqowu2v2m3pwrljp2dc9uacrnlz0vln3o7v87gvq03p3nw1h94lg72',
                redirect: 'qakru9jgst42mpm63h2gzgnkgkbufmxq30fv33jmqvl20stijmh6t4bwpufhtto9thiyvbhcltp6s1nr5wlyw4ffxgrlsufej7w44v8p7y2mbyclb6r40z4abolgc9ztm0uy894clnwbovqy1k94bqeqvxwwa2uyaw8fazw2xkcnpfka8khp1wak86fmt7dpy81oowkl3y7szmv1qrdgzpkyxqvmdvcx0wyi43j4t4juwkotu5i1oe0clxzgj6ztajd6u2pg571o8n4hr1uynliverl6kenavmyddk2hjbpdouwg1bheghi1rrsiei8beyfbioz18y7hdogcpe5tf0w104ogd6y39sjnnowkbuv6fvoxrui1gflsr2269gjpemx6j3tqbo9th8svg9flqsu6bev5t5xkbruounxf2173wbc672lqazfzranljtr8oqbi9sykfsihcvneb43eef61s3cklqqfhbpoqakw8k68x164z1b04bydz6o6b8l4ns9zy5asnn69x2bevk08etpbu15hghtdyiyy88pspkyhfmxh0hfwfyd5nbxxe9hdalw3kxx753pllm5k14405zlbotv22mxif4chlymh4j0jg4ia7ava04bh829b55vmht4flb6p1bhxbckpx2j6gdh9ddmjvv6zt9cte2tn5wkalemna704nt38q17a2w0btmzojrkgclqnu6m7pftjjshjksnn7cspgg8bhct3du5brdq4o18ezqom9e86jbvmj3kwm9tvc6mrxx7vb27dk0h129atjnd7s1agnap1ffq9alxg661wavrbx7gmtbgcpfn1ocmq02utf0ugys0mr7iija08njdepxbi08atnk4llpq0ouhsto70hhtgl4mdr9f3mmx21jqwuabvov9qozuqhwf5cgk6154twaz8ruu4eacljt9a09iveledxy2zchqivi0rls22hvckq3icws6yoowtm8n1imn1vqa1k0f6nqvtcf93dduzfzsh9syc1dr7y1x1nylexvlw41xoeawdia6tortp6layiknirimp2jz2smt9wrw0xdnn754bfujo2lf4fmu115xg7calky7zh9dw8gxngj71z0ghixq791fgdpd8e1dd0awco3uvv5gfb8tuc8tq7aev0tfrm9cagmvvi8dj8igd1p5c6d6ouhvmw1v1267xpm2grs2yp5oon11mqscfpmcaf7salxoshzlyvqoftxq57ainn5s3omdi6165wg31iarn1z51tu2qho95lb3dsm39omp1qkt5y13chkc727h035yz5ry41elwczw9jhetykk9y1d8ilsqh5kcxtlv4gm92zs47eagx49sufphc4qye9rd5jlcnlb4ibc5x32228p96bdfex4jpecqjrnbc534y0a5zodebh2z9loholbnhhxtz2z8sbqqqlaj9t440ebfj2h5aaqtbpb1r20zcneysbyo9qk0ud581689whm1st0avtjnv2isqm57wgxbfx5j6ay8dikru2p4wslh0colbiw25txlgzfq6cf688jo89i0e5dx3k6n3z40psv6stczw90mesvr4c4kev9kgbjetmpyks9l5f7dicrleizr3urk7dzv0yeeyes1ugrjv4qzyaj9nva9wu2hc1a2t1dh2gg0qu8tviwhffjvbd0aahk43e6dazr8b8k2qiupqwo6wj9qqm7yiqc66awnz24no1bra2wr4w558lci0bci1cyg3xf788oij30ho18d0keyth1eqxer7lmt3kw85lxukmh8y4kynwv373cokb9xp6i5fgyyql10r57t2ccrua4xt5nu0xokihoecq37018tseckzhiiaerbcs8xjsa70p2a4r8h6teiyq1iocnlqo4946yxn9yn1d41cob2unco6hgf3ve6i3ggwz63luze1uv899t3q4z5xrmeuey301o1g454a14e41mwljexjdgsx7l7ydbjvab1vh6op56z49vey4w5bqjusooa1p64hcp8tbbn',
                expiredAccessToken: 1289934827,
                expiredRefreshToken: 4764839337,
                isActive: true,
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
                name: '95tp578ycdmaow18pv2pkhyh39rddshiwb83gsga5ljf3j2gybcpiv7x6lo68i8vecfwttmxt4cevbk6lauch1sq2rx7pzno01zz32fqk79esxnfrgkclvfbjbbe1mg9zehfkftf05dd3nesnou92mx56kx7prpe3twtp1ph80mqeyovw5vtlumvlc6vvbch0unh477cx0hb015waq7rvmhkpy9yh37vec2qo4ewvbbfz2fjyv9i0nb8crvhiro',
                secret: '12e3jhwu3nkiagpkkr60zhkeudod3w9mcl8uuzxj8v0vtn0bxmdcs2egcyqdf5026ee2t3bbmtwbx2xfj3j57kk7s0',
                authUrl: 'w6l41wh5vwjdcmfk5m6abr087sxdz7dx00nce4jkw5g50ub3l7plrsc5scknpp7qx8npzc9fbblj95p4h84pqpz4k77iq7rz9qg5y8dlc9zxxu72sriggoiaijwbibwtdo00unu3x9ht9x71g23brio8nawuyf7nnljpbcro82o1ftq99vq56lxngd7js5d15fahsbwqaj76pwj5hknnpoynm2qa835cw2y5vxe2cl18os8alanmln17s6nr9qsa0r86x5etqqfsqjz25h3kvmz1k8i6v6sosj6t1mmjzgh0u2sinfmcjl2v86bgtbxiwztgmdmb1cw0b3k1fddg2fjfumjdgbqcecxqphzq51r9dbhczpu4bv563q47ps817044n8fn1841qk0xtbrat0icrqpvenr4sxlo8rfejj6b8px3w35kldk4gw2dhw39azdehbrhvx8uy9rg9h0gw51h84x2yfn5tmryekfgy1jiw0owv8s8aq6u309xh1wwej0psk0povynq84bd9ymk7m4kkpf3hcbknsrdqrhy73f5avy5ocop5otm50ysufhnhsy0dx0tag2ht9dc53y1dv77cojxf74bkh480fsee9fn89uw0ebfhx6jv0gdn640jpwyxv7hfy9v3tivwh80v04t429yfhr7go7q9m3075mpslz7ic58vmatqss9qa5xedgzb4ud14mr7l3izcgp3zwd4jobobidcuxyo4z66f4565sv82wqtwe8kk0rejokn4hnxby5su9jqufrq02lhq4eu6d255ir7znxgzgux6k2u2qo2jb7i9dza4kzbds58ayjjvjsut709b02b2so6uf62h6d1a9tbj9d29ymvkuk30gpvhjhyrzzq19d5u1g8ncfysyzju43wvjpczr1et2ofabqwrp6ai1igbduew3dvxi5jds6dwqzi0ldcpzl85dsku2qgqthg08sj38d2z9ozmiihxcfzbkyoutlappso9dtc0rwk0pmmjow36wbp9o8n97f4mz4bkha2ztepii5315pvit7lyf3c8m1tsw2htidbtd5ogrzdcm1grv4fno1ti54dulx649asjxy108xwgca50q3ft2fycd6k70sgwq4kn54a08xw3v6t1dfwbljl9b8awlsozcefolh6jy2u9kttn577zequ6ja0y4kijq6nkmtkwcrebh375lko3mrp1rinibzuilqj385g1dyp89p85z6nv14bebo4psvq6nqtala2l831p3o2ukzdj04sr0jv2ogu0401m10lcpbjwzt9xuhmfhscfa18igrf6l5zz6kgivx8t0f1dbmacwyw2v5c1gv2y1meg83imt8f90tj2vxhswt85cljf1qp9lt2npmf2b0ie9hzr3s663bzcs0psiiogzw1pvkxlmmvdwjaqdq8ky9rcfawn7mnyqqfi8435q3cbh9aejidxprxaurlwz9dfzulc5t8e924sgrmq9wspwokqfder0725ro40c1iaddd2g6hiknk8m0qjaqjrfgpfevcinzxodbx6tg67sovhpgbzpzqfvu4pnl7hkuhdx0xcyf7qew55v2y56dylumfqmaqflgfgerj6izhplbte4cl8y01exujx8n7mg8f5al3vwpykfefhab7xvucv9gabixv4rm5884uwtdopucggxscd2wppmgcupv6qaqpxo7ykb6dw8d8tfo3lbtzz38yg98v70p37zhmsjtrouoxz86sigfbcyd7w6vepr7445zmr5bu2022rzdcymvh9rn63peyjm0l18z3u6euclpsw795aquszg03gdefmwc2wi2rz7q0h1plu6ds06gvotl66xibmag1k6c8mc08r3h0zhkuhi7pft0afflrlgqecya0vlv2tfd4c800fqqqn07fwg9jzchz702kidqhe31myv9b4qqt4r0d8rgsp1j99n2c8t554907e6ko0ntuoh0sc6c2657r3q26c0j3flee6ux8m4zrg9hc2mz2kdm8zcqfxj34ip',
                redirect: '9kli5rwininu396a7cm6ed9k1b4r9vrxrzuoo842q8ggg9vkhm2yzsf6v81hjdz349bbsrcg4c1ys8qhm5zeq9zlqarwf4kclixui59px66gwym6e5p9gk28xeym39mviakjlzahobxeelqpcqzzoi565gljqd2amv1s6nb8mp4anky07xcd14w6vqqtkwkb6wz7te60y01boiopbe3f3yfq8y91uefuov1f6zn62cblw3u48ixf7p6goto11grvrwjh05ykmh349rqk7szik3cjvypiywtotsr4b9hnltw2bowxazdsi1rl3d51ua4ax9xnrjkwpv12m7f3j1am2hz7ycruuogunr5zcadszetboscdeyaukf7042aoj7lkfwg3n3bqjy8e4f5liu8ptaaysepnsjq350cro1bjb3sp1dklvw15hnv3dn154ft3hcn7c0aldztgvhk293eztk2pmqax2kiqwjpn6kd6xhrffk2xa8dyh9fjbwt7vopfc3vr38lj7yvklbttv1vh6qnl2ztx2guzahj0h36eka5029f54zur79lz075s9kk2wbokd4vz8nw7p62savecjntwy0pg4rbbsj27p8m19g8l9ae78mjpjzx6z5ptrv3m6n5a5vaq5xsu8rn3ns7vb9ljn7f43kz5m8v0t3ehb18fgj9mari61s6wikcb21q6grbbwynxoxp89pzy2g09xw8yl6nrtffts1u7jpcqi1b5ylq1ei6q25qfxdpaxv0nndjqcoilvloyjc403l50ubyfo2zo901a4sjha85nxtiw132grlwflserkxw5y3qlwklg20sjeoevhwtqek7krr67ectzi9qhce2pcqzsbuqhltbwsfsb70ss8vqdz4t96mnwdblxjz4v9r0o1evdnrfk25mr0kmlb3eesg2dksyzw60de1l074499s0uzxv9tpo84wi0esk5g2cb14ywf4xqnw1k2olcu8hjtp6temrn4hhcnzpk75ud0rtuywexqnogy6acb073o0tz4zi2tw7fnjd35ujw4gwv4v7a4q3gm0azytdyxjxtltzzoa9zsxjkmtja2r4pflagqa01v1u2ab022dajmhekbrry645q81qdok5t7eu047k1fziw0wmnhicii3ij8t0obk2jeezopyp2neszrke9niem1b8ylloe1ldygscvsfikafgci3id949jevjnwds282qttxhpx3ktgy967vw4drlj578bu05bbib3yq0zd2j4rjpeitynlz5sk09cjmlv7jifl64ugrhadxo7h0g6sd80rwzslppc1bh14x0l58izscl2giin2ch98qywej0wyc8nnelsntmt02s2taj1jomrhw8omo65fu5elx3ukwz2kdunao8jf8ryibsbnqouakzvl27a8nkrk0qd8g8ha8cmn1qnpjk2jf9554r0kiflkkboojw44iqaj1pzxpet2jrlfmhx7xioker3hmj0knue63acb5y7gfbm6ylrbe3t3g0fj53n6660k1cs2a0qmzete604b5k37127grosdzak86l43p9b8d79l477d8xoovdzp4h301k804c9puyl1nokuuh019gjt2jszr0ks9z5nkgc5m7kklvquh4fnkeh3dalnnfjbhaum088bwbl9ecr01gdxgm21om98u7jughfallg276p0cjhjcq08kjdi9ncbcn2hw8kx0fhtc98oysty7ox7fhilnamr1g4a8il20l4vtmdllb9va71xp2bd0vuzkywktnlqgynkr82z185s00gyjh7p88lbvvwm2dal8k973mdmc8j0kzjq6107c9w0j0t0ybf4lk3lhbo2h18eeok898arxa8d3aiy6sho40oanjmqpgruj9qsrwtcbp1rfay1byol0d2w5i467omrkeighfmnnz3jt37n18ysq4h8j9ctgz0lktas83tuk3miooaoiy78qdrn6vcpo7ieb6e9felglfljnrd4rit15c0vi1xflzjw7514mb9aki8',
                expiredAccessToken: 2839839529,
                expiredRefreshToken: 7775356002,
                isActive: false,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: null,
                name: 'kvfmow767frg31mppp9kq1k6p8pm5scxoaikll0xzl0ltwf0gujxj4419tk27uj1ypumq7zxf9re6ouukisfuerqerk12n5xzg8iwmnwx68h868c6f5ihe17burd9j1reucye4poy2ow2t2qz2ivp2x6yxaw3oqaufnhtvhzjf3c8dfak5e69kaul1gc1q9row7j5dfsx0gmp0l5hqomciqgfzulo693d8jho2bz3ezxrcexvmowg2b7pyrf286',
                secret: '52tsxglhzkt2jqb5wgmd487dej5hpjdg4kj9k9ugemc4spobnvp1hzokxx3j95olx07msyo539vsfiszl3uebg9g7v',
                authUrl: '6yp2013lsbsg5w7qztequn6pt69u3klf4y0um6w0q6qdicp8ewb9wcwc6akoh145yc8njmltilx25d49uqgqify5jucuaxad0nphxpy7erv7g98ivhrxvu97qsojo2o48rz8yzhea324cmrn8vlx3bw1m57tmgs3556tsorj1nx55xwpzp5i0863it2nufue9a2ee4jchgizfsvag9iwwxjkenhk2tl2e7zt4xvs76su6gx06nzkuy56dmj597595k14qe0f1u3mf4xbilqubvaurfykhow873of300bjj7bgzkjx83obv3zqig172xgqdjfx79d2n1dhpwrq3s1gz26lve1lctv9iniq18fpj33zp6lewd1mpd8oofpup3qr3dvsrecu2gakfof5fyubitelxlq9uzlksqhl8g5llmwgvdtepag8oh2bv6zag5tyxh9dodlh4vygykq5a5s7ek09odtns4p5z1cfr07p9tal65jtxlg3d45up5s3pg61tuei6dw185rul966xfh4jwuv8sqbj6e0d2ads6g9wzt4wp2bykrhrjy8uvoxhetruszr6o2f6p1stddpqwer56bufyfglks9sfxwfrolym819aey5kw0x6sqreraz20j57fg4opvme1gwxrekf1cr08z26cn438hixt2azq5ybxe49cqnm1vebyv95fhnq02rztdf4y1bm5a4r6djbb0hdxgkbli925m8valbob6avo9etbx7j1hn4mak4r0di5o4o24rzer9vxc3s94dkw13bd4sp33njscetib46w55ecnz3cldczxva2gj97h7a9qvf4iz5tmqka0c11mq93ukuh67dl5azx42o6ed7umk97mwh4foy2pnpkd77n98bqunnai0083yjbue3hlvssigdaltr8o76shzs58kly86j9u73lov0q80yk16q3dv8r18zuyemwwtgbx5i8cr3ipmwf13v3b07soodvx03bphp0imzmlnyhzh80t3evs7g7iyagkdi0s4xivxilcftrchj3u96sadqmmfe95yuiclnkf6ge9j0a7vumakenldnty2zdo58dvb030v2cmjioki5vnru92kl7kgn664n3j8a294n90nry7atg59u0v85mwxax6458t0erxu6qzqw9wonwyj1fw5kjnpo2348jovp3ofn3ikip2cxgrekum6429hwtl25txadrb4duhulctg98s7yx24x929960hpdmra6tap4kskwhx3n511ejpoo025101vo8aal7y83o9tyldufwdo72yo9zha931ug1b60eotiodc739u2rspu6bv75hml7xf2jwj8s9elgjn7hzf67thp3z9t1n51xpr5hi90fttfrtwzoxfm2256l08b4ft92o0vkkbzgdymmczoktxmrfcs0bma76w5frpinlu6gjsup4c7525s4xr9srvj1ov4jutqp4um9ss49uwgb7cidctrpescfth38eaouj5n1rwnv8vtqzyb3xaw6x7ll5r1whmugq60dx08jclm4hkk4rkrdopn4zp8ncz0u60je2nqtj7w7ha7ke7vfbmi55ixcvfm3vi12qrrnrop563biyxdg0v3qpfxwm5olsbw93fpazxpjo1sq22xjvptxyxebmeh7ecjen8hr1hv53v1l7xe6zj2k4usq1kr4nscmnjck5kncc6noihrybcun1yv5o1ur5k1xgwn1sjwv7ji6ydntdsdtqr2tf4vu1lliaerlpflk8j34dtooys6djqhplalzkwci51t5w31meiculpb0ee9rrcl3x55f44pqfn5i8y18qeawawoxvcsd7voc6mn9ym0crf9eca3jsfy3pbwzo0jkuaxvdmmwg9uu4j87stpwv7ebalbwtfl7fnyf2reuel4ugj4zod6sr43n17s5zg6msiriy2orjlv87qs0209sp4garfh1n8axe9fz69l5wsf4vhchs075gq1700q250uff4bwoe3xkxpgfxrd8xmzvspm79n7dvq',
                redirect: '5ymfutmg3nz2tmn9diacih92u501mlhqjm6ehfe0n5c5g192atye2c8ysrp384yu5oyr3q4u2r9mjscqtppif3bf566btjvrobndr0hhezc5cg4brjqvmwus5g9imkc3q58811hued8vk0crto0tmv2ntjwjnnzd03md7vhlof34wvsyvd2bc1edvr00qw69qqax3gipnm4c1qnv1xfnwyr0rfp6yzmsruz0pevf2x09uogp3dllmy0ugjslzfeosek5mw0xwbqgs266zsay0voolgks7l1663thwkk1p9ae190mg3ij7x6rhzfssc8kdlpiyj1c8968ue1tgro97668zzxs90vks07hh7cwg410wpffv4mlyobtg7g2xlqpo4tsaid0lgaxy1256xa3pgpyx9ilpqvmzvjtjtnqb552dwbyt84m6igphtmj0ptbv10t95lfu1l2fhubcgvrj7yjv9f9ou8e4un6az8wpgmibhio9pudzulsu7a261i7fwgglfeh9igw6xcaltuwbtn13pj4cnebs9xksj01f107cy5otcngrjc0rqvpjd1dhrustx2x1ju8966mvwqed0j5ynj4wa0fp1cd493d2x9bv3hiw883ewd73ybm4xczkeo3nswr9yvtne9h4heb8jmywrwias1yc7q6500aqsmo0btfotihtpomm84mys5cd7v7mxz7v81napu59wu4224zri2xvwv15j1455pquzdixucc5dk2cng6yhn3u0rhcbbk6k4a8nb3mgpepyqnmq51ne1ctn2a8llk62oeolfobffm6bi01yumwr0t4whzun9ss1u9vvg4n9w0m0vjhdnh6yjj3wo5b4ccpoagjspxvmlnvjw2hraqr46va8zu2hajfsqy1j4wdj2rdtikmyarbflmr5t69gr0tw7v7gpfo97djccw9bauxmz9o6ycnxvyfab6qhpgxc656a6fit02k43bggh5x075ejcqr33rx7dy2z2zq9asfbzjc0ib19v5u8o2udyk8w3obi7epwxki26pge3ao31hq41phz94rnoksth9snfp3szv64198dm7ep6vbn2bqpc2hdu95pau1qxkl35mlpvcgp565vtmjbmehc2dqlxrc8prqi8x8jpllcd3rm0mkm20mlgoi1fsdrbtb04ovu7zuhe9r9uy1p5lo05c78p9ubzyhzf3ynt7a4dxtwwao9ha4przuqt5p35pc6kdpgwhj57os1u4lo0sbeg6duu42z74orqgcsam47s2e6mawqsxhrcr5ojr3idfndkt2ucs6w3sc09j3gmcnbljjmgb9zkiakit30w624264ko9jltzs6klwv3z3viqtr0sgycmqyof7sodpn6h74913f1vga4aop9b0fsz497qr83pwbz8sm093kfj8oacmzwp97wpgbr937rfmikt6ghyolbidb316yapx2vo1vb6tyk2epnzlggupvlgyhy9any39v57u1kmn2nqiw0v3gulsv87hgq9y256u9jgdepx9aqa78aap6f8mmrg8hr3n850558c8gxthqp7ik2lhd43m9kd9cc3dpp1s3n34ohyi3d5s6i95g6chb9cqs82zbtj5izwj18au9ilma8m9qphzqrj77pku57gsexmnybopudzbblo57et46jrcr4pm2hy552ny3islyad6xjbo1c66xliqu7vup5hw1wt3dpwx1hzkql3brhn5iqevsimv9def4jtgkxu861uxxvyns4mycgy3rokqm1jt0ubd8nvgka7tbjjfdfmqzl75sa5teggy7rse0g4a1cjh3bq20teiqe7c5kqmpjmg62hrlhkb5o2mzexa0aqny4m9c90t3yv60zav1g05vfl9y8019d0te0urdhd8gb3mu0j7fgnfmh6t75czgaxyc8h1qv9y1ogh6z02wwaeysw91wbdkz24uidbtqr9xsrk5dsv7m39k1n3owe94e9neyeyr0zlhai8i4uz036pj1ybqzeffajyw1qec1bertp',
                expiredAccessToken: 7599859927,
                expiredRefreshToken: 5070165313,
                isActive: true,
                isMaster: true,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                
                name: 'yqqidpcuuakik40s78g53azxzx3feqyg9ct27v4j0w80naggmc6fds49c4ts1aj973ujt6zdxnpzc4larfb14m76dd3d0t1awtyd8yed6yuozafrkygceryyb2ocl8h3xdmxuo0cfg802z34nq8tgcdafyv3zs5jd2or5mbybkf9s7fb1uqk04rys4qyyfkdkfmboug2e6ucvnb2s2xrl11bmse3ecnrfci23wudx4g0l82fj3v9j7a74uifrwu',
                secret: 'xkk6od53mf3wvculu9809ib9d16myi1ft9srqzfdot75clm1uegmgr67gsy3k07oa9m8v4bli4yogwx27qyseykkpj',
                authUrl: '55vs8xksxb4cfoigl2q6wk83up23gx87z016h20pszcdrwrh0lfd29hbgzix12pd9ek0hoc3chf2d02bnhwnyuzuofk4iy7lau2wfjr5btqosa2d4tmppekhgllzla5wionx9isirex5ivjcf1mhhp4xqol5zca0kdmxin1s9ua0ou9as52iu4e62bxshmoryrg78e70zocpjegh2uf2ke2oo79nrhyjkvygk0aw8r07dmlpcp9lqkfvwzo5shs7nuhzyiuw1ukf5st67u4yskjiy3783v3wpjlc0wfz4tg6vnkb0yt3xq4vanzbvq0trnkvslsb8k49zuf6bee9vv04j95hysiko9zcomsb7ljmheao8r12gtrrx0mfcwggr64dp4p3076y3lfs1pf8drzad2yz4dh4bnomynrsbk6e9h7zqdm22fuiphd2q0186b5zoqt0n3sj9zkz86s78d8diudnf88l51yarxv7fyxrvbaj8czndvd9e8kewu3do2l3x2loqnjvllm71dj4k6lty4jwxsng3crwx3vcdypzpa850obu95btprbmg6tkod2bgyf958frtw6bncq2xpluhthbw4hfc0qrpg9gdhhobsjkj6zv4b7umq57rma5tqear8n0gd6lqthjabyni7kbfz1m6779751jvyos9m4honcpe8u2xijpfjiqo9wgg8fo0r4e413m70zrtfd76xasrkyhhsnrpy6abk4ww92d7026pck4fs6xti75odiunx0n5z7v2l51c19vtiw8dljpjxblj1mrmnmre90ml4oc25wji179kknhktiwqibff5pfmy2w72yiwqjd6jjinoiehqa4d4z51z2v09n6ef84g6pe7qhfnd86ukxr8ju12hsapds5g1iuz9lno0ks7yo27sdjxrv1lo60a01gode8gcd83shqjjwmmuj9y7ald69y5jepnmawkj6050dc73jgtc5rh47q5ks0g6endh0lxcpfcoe1bh27lqmnrcm7n9r7a49u4klbfq1yzfwmsz5jgrr1mkr7gm9bxcw91zzq82gjqg633ng0e38zeaev5sufr5ygtpc0g9rc3b4s00dyzja5de4ydhmve0t1xjnltnyx3kvgfi1id0xml8yqhbgk3pym4thc2e5is3owdnulm1cjwpyt6wkfy330lxu6vonkiaxrsbx3ppzae54iv0jlogjri9vhz913y5fhmm1162v593y9zlvfin4bbti43w20nyqs68h4ioiq5b437cl8oeelsf2royx9gamylbt1623rz0s45sfvhb493prthbti5uyyq4r6yque20sv2lnt45doh8ae0xytfs29839yjubgm315ygi4gw3djkauzoqdfok77jfp4ev080edvtdcis2v3xjpm9ragtow3ppchyc5c53xsqlqc3e1vgnamijjew7d1bwojjr7we63uushi3ol08sdnmo4p3nj8pja0u3hxy9xfy4deznfov2y9bg396oppsprgndrdg6aozp2idh66y1t7hwjqzxagyim0rgz18eli27rk38dgbgdyt0uu2lhn6kh2bvwt6c14h1wlcq4whp7ezvga3vr7uggc9d4a6k8kevpju3tzjpdx4ft95erdtgejttgaryy9mgiip6cimnscea3yvz31igjmgq1obi8iok9emnn5ewilqa25pq5jjnl835z1ta8u7w9qz0ny9hdwknz3lx57rm71t140bdniqav53whscyhvm0zqzkql6pr3rt2ejcesus2amwsf94eakjw7u9nttuyk2mogckv0ue3buhdn40z3m7ihx9f0nu1y0zyp3nx8jlyoh7zp98mcr1jz3msjp7j4prhoon19gveluu3mq5uyi1wh66ctm90o0kb0dm715oqphhu3emfxfh3n3jr7it4qm1rnckrcp67hhybtnu58ertb21f4ry8tm0kew2atqnmn8rpdpwuem6nzho66qasqoy3crevgtk04s26igwzcd7dysymmaj9fm940dzq',
                redirect: 'dbjres6sp7wupkzxhjwntqynr1out7hahxny028t0vgd3npsfsjvi34oleuw4sa4cj140epklsqrp3g779eircf2y85fy5ti8a2iu9sxh9mvqactg32w5sirxvucqytd9n3kh7fcrntail908cvedy9xbqd4ricefr4wwu8v01drp8sxi1q2f2g0jdoi7ucgd152smi5o7c6flu81t2fcgnk24wwifozygg0etfnz5i8xysrpas26yw7dz0if7ab4pbtjx9kscws2pw4f71a9a3k8kbh2i0vkh7in5s0ljflc0l671tv5ogcyi081es5vrfp8xeq5xl78h385ibmlk125dm74l8fwj9f8bj30sorjanbq7182z1byrqobwc1014048avy312seal7up0ql75h1jxfqnabmn30nak3yzrmw7apzqzsww2rggd5nn7kdet0v8sk9q9577kyoe90jg8ibdr4su5c1xuqbk8jw6milk856usl8xryfi5z2psnvcyzvnmp8058n3tzbqiels9puxpsbqrnyu4tmvbxuj3hpwcgtwpqbprynnekrg3r2bwvllulehmlm6s2fzit7bhh0bt1mrub82bszhu7aqnncx5qiyy7ubdj3sx5pc3pibtl4e5cly8qpd4keu3c86c696qqeuht8p7sga09saw6ldich98buqohwxtui44465y9btybsozui4b01b0tldvc21o0aweujsgxyjbgfo2m7m0w6q15h9ajufppz00ym8wv69ysmnd5ado579apr06n1mj9jk0dxzp94m9r0yv029hjnymj4ju3098fuwyunb63wysyshh4ea8ryr2c81gnqs5xz7j3mlk6bk47xbwfrlbsm3t8j9r95dxa5vp1xd96pwvajldmzprxkd4wqfvk7iph13byw6ak6pl74dhhzcilhi769n4jzih55mqqe4yxf204pfupaxipfol7id5aoaglf7yovgvb5v30rj0khqlug53z9huxobszzkces5j2fjhm04kc40w2zpx6n3iz461bkdbghjdyer31um5ej2vyehttmujpdzxfb20o0cfl5rtwdipjkxo3pwrskiv2w4y5uu4n7fyiavhvvllmllftoffo0e5ljfvlkpozwf0kr83qnzcpff1hr4p2oicgc18wt8nuw12koj0a4sh74bmxmyt0gq7ifthuzhqx96iiifbqgv9383d6c0xckgsudkikvpywjdfrf47nhghg78c52kpvn9r9ugfuwelgme8x1xcf9otrrzu1igp62zblzrydkliooe3q4gt76a6t2tmsfong91yj8hc9k29fvui2ljnvo87c63rf0nu72fi63lr681ptzsu4h2cqilrd6krhhtlyzz97q0rousvx8a9edfyd8zl545a36z4hrku3ozje9r9qbleeys9f3wsdflx5rf6g9hclz9wgatbr9niengr1lufnsav1nfsurhtwb5a8gla3m191ifw5hhbabtsuqua6r4qb23wme4plv4978obnu0sumv648037w8o5l3974cph3734zktx270rxjr4byf1ot5oh8hwdraw164utb6bnwrqb0d7kssbgopdb6fj6348rs18idzh75kmcwy8p9tyclfbeoggj9qk8iwgf61i2teebh486g1w99gye95pcxh5q5hk11hjc8dm9hq32mau0e7dt3i92e4p49e3gwmxso0jir0ft0vh0ie3zcqbel5lpmyfq8gpyimaz5nnztg4j9wk0iqu4ug8qyb152mdf1fy3ic38b74ygmqq8lpzdmj9dzmnynuqbu0z48x248w310o8c28wwcb34rfw4ci2bo2np9cebhj521botopx73k2mzpv15o4akq04cpip6svo7ew5c442tzre5vlztcyn6tdrerbbm04h91coqeygvc5b8jnzavxnu6uiu5n9zq4c25rwni1ns8m736v5vay8y0l80c2cvrzcxopvtw3x3znm49ermfc1rf2gqfk1ztyrytj6zk4yw',
                expiredAccessToken: 8281902463,
                expiredRefreshToken: 1938352209,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'PASSWORD',
                name: null,
                secret: '1jr0wj98xrwa1u83p7lclh7yvkgzw7ae472oks9treuk446arfd3siujsu49woe8qamdrnsaljk8z9tp2ej5y7y9de',
                authUrl: 'vabc7rs9nyhyyd4fnci8p127l0jcwh7zxnycexrb7mnktphrbfuked963xigt5ujmxrdnp4a9ww8a6rx7u0a7fp09fzs1xsd1s7wzjmz6xr1oyq54ex9zeb65gtv1r4kfwq8t5bwdi7g987aamhe5i0kzy5mm4a24xluc1gphx2o01v5lzz8gtiuwg0dbj9x4eu163uagfcorgg750vkifgpu4qai15dps0urbihc8ub5mrymupcmk6t87dze6oa1wfvgi8kawhi50umvzjejb3272ep6ljv4xv5mf708yduzz4musz9n7wpdzohoj6jc1g15jz7k5lyirn0xoxnlqd6pyp64oqcv4dwltb73zdxbr23km9bvh1xrol7xowxsk20glb6umlrpp9z2pqvwfipi8aafjherbsvvmsccky9qi1rhvi9quq2jmm68c0u46o8u3ua1cfa9bnktiubnh72gxjpi008mr38dwol14q3f9y77xxhug8f4yui7m1hjvoice7jwzzf9vc1u8vyup9esjxklknu7tyyt44yq4wl7s00ir0e707aflfx7b856up2oxh53boe3w4b0cfnpswf37093yoqr36hocgg2anliuxqtcmlz4odoxh1tfzx8suatyqkr65j11n6co70elo0ulaconw8fmav4ev5z4u338cd2php61hf6xo0ebfusdrsnae9jvszzmncck934wyt3b575ha665hhca2ulljfnmh7u0bplqv0x06gxx4hciqahxopbl0f2f1wle1zhceomgqvkw66lwo6inbrwuivtf9h2z2zs8beee18s9j5czxfzb0k93zxdtkjblr4vbveohrircfbyv0beso2o9bo0rqpku8k74ishgjhb8o2cgyem88q9u5629h9g6l6ll3m4uho2t2et7av920jd7gww70f48wgovlyopjmo3begllacs3f3ejdz3ju7kv2rii8l8n4oefgv56gcs2uo48xteo3gy7g25cczo1hjsu0mxllhzqckejbyphfyn0fpfhjg18h7c6qwl14d8lo90i0oj963xiu4o2lcwmw1tdsrc5sgp3p4efbnxzra2wnrwjlx82442pgtu2ppuzly0yo4bl1vczk92fcjdrtbg9luas7am7i0j91k8ae9g5hjee4ic9lwwlj7uqe3x4p6b1atg5qwk9uw1m0i0k5o0gjw98aama1nep9xhbb1kgt17ipzt0jadjyy9aljsa53hv9oczgssa5x5axjrf0z0q2zibx3ott8nwc1ka8v17z9rr410l54i2kvpiu8kj81umncsavjuv7hax5zp3qmxt8wsiyxsr96589mciylnh7mmgyqt323j1njd28vqbawpqzp6i93qkpbvu6q9n6rpavaeos2ssdt6yri9gvh2x7ruyl5s5ah2bs93migyq8dzkknb5bdofyxsjtjcrm97qyv0lqomrfm8lgjxn0lhfdir8ooucu9up161xida491tco22zxgu0x7p5xyicrafwonbwyuu6veii02c5o1mzo2sorx0tfgchojbybw8nv7lajnw6dbh7wgt8x7isu8geqy983hsbi2bzvfzs9yn8c0ac88zezg2b4o3hkei3g21482i1uf413q7n4ecnoc51tbmnt324dercccdo1hx80qg1m64zlowxyxchqlnux5cuhzlxpgthul3cgq2y3400hsemhf2y4b1e6q6l7f9zuonw0eqy4a4lyqysxny6n6jsgglpg0jckexmqb2ext1ui2knzpj7liteaatlknfrtyruswp5d55tgganw2278hzu3w2qwzigcj43zwub7pvy84hyr3sns6sh29h7x4s22ja7iujuj2s7yghnfmxiz1606kvr2bdl4p1t9piy1xeke1vaxnaxghxr12qjuzszythvpf30m3r4uf7i3nwdnjryzn14qsl9pxb4o9ly2ri3219r40br0bu4a8gddmdn2upaqwr3mn8rg6p8953910r1h8bz3c2qsz7kc0uawnwwz',
                redirect: 'aqg5atysq2o14wmac0x24zjqop3bglmumm88j2c34ymrz4fn9sihmrqryltkvblsosklxppkesrhaa3pb98ks20r4esz3is1ehqaugu6zc6oq55lxqfuwl7t5qj0k74hzf7unap09usb93jsbrj2jg7ej8r712ozs6pl0257fkm5icehcthue01s2p2ywzzvitfw101au4pgaq5ndapgy5glaq7kf9td4wseaowou1fbjyokok3wuibwa3rx9gda2hqkq48rwyu2557vq0disr02wa1a9g89zy6govpmfbmefz2yrmzb52nxpm987f8o3ch2kzlf6jnj0dwwujgbg38cfpdkm9aofyd670onqw7fctmbqyulyglu0jwhbam946thdfyon100uuc81llk1hh6vxiz3ibcmj6b6g1nqigduvyg52lj4a9uiax8yz4aw5qt1vr1g944wkrj0e9v3slettyjb29ud3v64zz35m8g3jd1ev7e5e7t21zxig3qxm71csk0yh77zik0fk8i1jnqft41wtmzbd5pdkasqpmyuxolf6rl4f2i2n3aaymjnh7j1fan9cdzwl2litc1obctoc1ekd4s93nvxk6zd1nson41txrr144zd3b2qci45ewfb6bn3pvujvckliy02q1cyet1vggstgua0nmrv066b15vyg1lfat5da1vdkpr1f6qz5tm15pk88ju4nsv4hmpbmv6h8oyg3jp8t41bp299bqilqm1tfd79u0dh9vlmeft4l1g7mbak613z6wkih07bgpbqf40kugfbnlih31af92hvzph5pfrg4fc5yegedvg7hqry36tld77z1hq6ugqbna7dyejwdgb34qysijbsr0ys1xh3eg3th52hjm707wf1zgqcnhz406y11o15dyydxd0ccqmva5tka33dpdws299zzetnpf0xdhb4krxz6nddxrbhqp9qpy1lkq71r9z5sgwqflvrwn09b7p2j7qlveowee9aexssui9w7otjvjplzzg544wptbj7cykdi681fybv3mnv61yv4t0lis9332azzh69tdqd30ucigdsk9boa6e8l7dprvfq8z3g2pahmogib4qxahqst0cutohwjyhd30lpq2790wgxt52y8o44m8c6v6y872nlk118sew1pxw2zd2f4vjqtm5edv5ewfbvio8gult4qvfs5gm9heszlqrnu9y88kdunswjcty3458o9kf20qiqjd2aabvs4s98luk761outrugo17y70drs6m2xouj6u153ormigjf0pvdxv9lqx0nvs703pcqvkdzi9ow2r6jgzvk4vphu11g0tpggprspc8kw3epbkffr192055pd11nb1uoaye5m47mm8l1xzxhraqygynygtfkbiwjbjwpb7ugrssvcy0y152ejzcr2jpmifjbxaoojvy0xnd27yvc1zcbgx5hajwhagwuwp26q27toq05v88wrphvns7vimytfwqd96nhtbytm1hvhl06fio3rsk0rm00r5y5m91ymbmfagoxsap37intpl819ywo64crfevab38psm5xmgli8b1etgz3eymhwxti1ds8udr5aheincq15f1wmdq8atafpj3al5oump038pgewa9j6x7g25fgsrdxibsu3t9jcmj4i1w3tf9lwpiohhvx8nyj2zdzz4ad3kkuwly46rltfzskugl19tz6z9xb29r207vav9ggbzdwmtn3nbo37euk0b202643avq3ms1sve9c88q18yth11ezw3mbflsllm7vcm956uiaylyzhuxvy0nvx5uvobzmwjisjh03vns1isxut6k0iy6iqy5pvat9vim9dj37uz5dodinsfnm8v1dndx6u2nczdgp2ckhhjqn80emyyp3hoylqt8amsbqfhb5np7u2emvdk2p91u15hmgcrrgec21xi151685ys940df4jrwza3ll9ujcmbbh17mj56rg46ws769of675bfnpqsw6ynvv7j2drnmzz18tucojows',
                expiredAccessToken: 2331130464,
                expiredRefreshToken: 3085200846,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'PASSWORD',
                
                secret: 'zh5xbie5ddg0qugd7sb5eb7utx6ixifk2ml88xxeo2wyoeosx7wf3kouia405jxzubzienlrm0xivkyoexmxo8qftp',
                authUrl: 'w6w8es9yn28ednfj8uj37mfuxavqd5ltqmqy7a79mtivh6t58gt1ztho7i24xq1adsxgn51o44znghelwqjfq3rkygzqooqibzibipulqv63bcx783wmmwhqqwiy7eimm2jc9g5alhd4zrukcecw1vnwtr3wi2aioyxrrbecepocnc2m8pmaxrf9k1vnrjoz4319utekfxhsfflu4kyp9ce780qyryc37msbq6lf8tevlvo106yjx49aqjqm95vz4ywetijn1812fwpzzyqqbz1rvetd76ka8qnzogm0qlgdkkpvkrjqiswo1kqajno9ejobprxbooytuieg2pdaq43spt71aug9gvirgzqu5ktgsg581krczvzrfn1f6qbohu1rh21vbl7rguq38n8z9vh82ej7w689xo67ob2g7on69j38fzwevup92n18vgynchqiug43dcpmb1ospj2puq8h8i418ghei7dlik98hop72rxtjbni66gnww6psqn3s2eeb78r23lqv81axzb1odk5xpsel7a4vi8cgi4okonpb1gseasnr5hvcdzj2f6iqjlspa80rqupcykvh70l4axwqvrx7gw34g86tcw6r7unqnua4vdxk1mafw9jyw3ez3o09utwez4nbd3igta593pm14fdfm61cwtjj16ss69kkwj5ii8erc1fdixygufauifyct58brrp5ids6fzfx0r0ccj68cw63v6q0bmdlspyki5a7ix12j96vzo8vgh7ntd8bkhl7pjth8dbml1l0rq3yukdo4xdac59yy1226d96d79mni5e4maxqijjx13agp3a5ksmsgaou4kmbbvqi49ayc0y6zjn1kcgiz6t74k6z994i0gr1l1qjypvkprizxm6b679xcln8dlw86p471kds9tczb07mcwd9uq3slp5c3dcb33gsp7xe8573tta9eadtvgejzb315mo8a4neyk80ipu9dmhkdyo1xm6pwwb5focfpevhmxf8v3co89iqgy73i3y9t0gcx197k99vmxomtfnzfio9ban2l0aha6vdqd3djabveu8lysj35pe78vp4ed5qtzjnea4tzj9z3kvnebwsi6o3esq2sv534dz1mh0ejp5i2fnj8zpfkvxhfbupu3ea76z4hfw6puxtyghsfvy7osve32o5phstrqzkakxotwo5x8em9gxndoif3n1yrto99d6doxjn5dxmb29xbqijkzn2x3kk56uqgikab0iza2e3ho3tvub5si9igv1tdusnirdj7wyklcafnz0b2a09fru5ajlg44lz54h04zxfawjubzhmtstyje21z4bm91qi64rkcul329fh9hl86fd57svv80v8604eb03zc1ct0m44u1w8frzfsptiqn9w2x0jw7bb2lq3a72hbiv0svgniwcs34cfxyuf2kqcj9tscl4xcfgqv31ab8mvryqbe6habrv63v81aar7oikpplhf1xarxfsz58gvsve5dsmft5umg3nl7qum8ps3zu5nmyl9plz7z4gtj1ly9w53ropo5mk4o23b40zcd6ixbnovdtpthbaynytcv0kvqa76z4cztscvbqv4fj92j9k139y9r27qll7z8q2y568uakighmhfx35a7oktcplo6p103jqv05vhu8ibhvwe916l5q0n3w56548h26vn8xjjjqhdnxiuzmhtbygaqu8hsmpt4s1nk77qqbukucialc59usf8v6rkeo3olhtujspdc8gc4rcj9rvw2d0dzwv52l9dkafmuq0p7as55drokbpabufdlbuokk27od2kjevbd671ytiu2fpo00t2ooyrh2i4bqb6k1asc3dvjgk3yw9ubkwu4fe1qc92vtoq6jus5hcahq9tdpqqs2i18yqnqfgso4exvqp82j4nuh2icrqnle2tc7nf5fsmuc38b96ki21olnc763lnvcbbarxv7xzv3lfwudaak622vh5phs5mxkqxs7acu9bkew3p5u38kbixi4colcnder9kat',
                redirect: 'qjpd3qm47cpse2b5k6k4owy3u7se41b7370dwhzse5oxf01v0dwnheegkabotjg2o7em3b9dmtjrgz5gh4qyk2ld4zdapgg2tcby63lmpi85kptme7lp6c5ig9s7z5oa51zgq14lumv25ouk3fwx38x9fe4lxyhwl4sjm1tdvqm4wo3ft1bwjqoc9ev0zg90my9horij6a8zcgiy9ttzxq4tg0b2bs82jjtibajf5izz1rha2yd0s22j88lc0t6vvhewz5kcbzg4jbyq9rw8010s754a7fsf9rj24df60ox1j5pmc0ujyyt638qices9bhtvh8dch5mrkafh8suh2qkpl0ppr2zv7j5vck7j4u1g83k686mb30sk0vj72ou64z0a5eoa0mxocd3i4t7rdq9trddol8lww9urk450rb5xddyopzr36pzghpdejy48vud02ljihzwc1arse98f5jpqkqs2ll4bkc14ghzsiofbszwkw4rb8933srioe8qehwtiyl1m8j5ffledlxixxzp335cogydnrifgpwofhom9aps4ulmafbwtc9a711cq6for131qu5z8wgt9bniw02qvm0vznff4rhzpqctczerkc2jki0b0fpsl3jvnj5tm06d8jt0a0lc268imnq80yicij9trius6rjwkfriswp6jrn4vmxr4e1n3uvgvmog0us85pnvl9dgppxpq4pbtcria9l2lz8yrjuxtmjz46cynhwtrcfxb7um4frny6nvkr7y2r91qgky65syzvyu19lrxcmctdq6iixxuv1xku3vp54o0c1mbh0zle0vo9rtiyjao530mxulqwlvns2cizrvjmqnpkvxapqlz3msptef5d09nhgdagwwuud0f06bce5ebrnhmlmkj7x2n6ute926ymm4yxv0zmqx0js7sy5ckudnz89ioki0l62vdjwpx9ljy1fbz9vepgf74bsl58tyb5k15lpv6alb7gkrob7dlxrgdbo0qoybamnpu7ft8wwtgnzy617re9uueezfw7uyf4wx5egu5mtlpc0ntsagz5mj1rz1a78zzdalmlqqg6jwq69chutuqax28dbca62kjl8ftmwxy5cyimu52oaswmls47a6nl4tr0kr840jl3bjhsrctde8axs4a1qykefm5r16f86xgwe125yu5anntyucq0g4337bstqj04luw0o06hib8fcqno7j0fm2i2y8tz2denat520xzan1ltz2o2s2mqza8hqs42ggz51umdtl44bvgb3r42fb61qb848nqg31gs1tf3vb1ixvtk3moiokkwiqfs81qxm4glq1tury8uczifop9hamb8ekfefkwpcsgan02ka0qviempqlkc4aqgzsmtbx1b4rqn3n17anoebeqb3k407bkuobgforwieockr57h8jyn7tsrsv8uzmn13t83935e209zsohrtpvl7kzqmyehb9x8l0alv63el2gkkvu1cw03bpun2ta7pomxqa0d7jv24kz3r3a34zt1isxa7yej8b0ux726vujh588rpgub9t615cvf65q5nyx558ae8std95r4jzyrlccny7oh3w8jnblw9mgy8b9gmc4qkp16vru0nke8m1cmgwv5gvku10waiq0p11yijhtaf4bws7qboa5u91o2yo6kx19clg8tf5gz510nk757v8d0oi2rdnkyz90c2bdepdmhy76huxzvw68nho34k75poyxkd0atwstp2ceqen7xjhet9r8t6uu6q4xh9ct0vecg52rkzfkxhh9iubjprk1dwuwu8bb5rxbw1o25b825osuz262f7jefbk24ufklz5rh5ah3nawbs6m42edtx3b14j0jp70pxcl0iq78sd84gfah4ptnkb3xhinf4k8wxqnlcrqhn128q53lzj0vut2u94ibhonu8o948v8fanyz5gbfu20t91lrmjdfr13j0yn1m0cug1qzt6skoszqvygcllq23iobevzywo2e8j1065klyib4iyxww6w7hg3',
                expiredAccessToken: 4451770118,
                expiredRefreshToken: 7409953260,
                isActive: true,
                isMaster: false,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'vsl40ay68m96vsq1w1k9ilp1vfnlm1vzjinzibokprs3u7zvwx8dwn3h9iqqn3fz5t9qzdhui4jmvyo2chges705c291br4se0xfj0x80sy0w5rlvfbj5n2uznxacpdt710lrl41629nntg3wlzj9262cizkmku061kmza4tefioz07eujoo2que3752vntjni5wf7719197xkm22y5fqnr4scujwx7uc2gie80lp93lid7e0n2ycyonejq4nxk',
                secret: null,
                authUrl: 'kgfj89aoi317vo04f91w49zlx4r4ukvr2t98sb9ijm6gs8srqfqn7pjixbg5cb28v767tw57a1wlyj08e85p4lzot1pvgvm124ro20bxl30o4s8aa0mrc3ie8zymc5kbrqo7ltiq0k3lme02332vfyk3y8xuybq5hbk7l3u1sf2hfgd5jkyb1y9pkcy8lydifhbzrx38a5s7cx874hnfunheprkflo1z3pfy2vku85kworl4zwkckmwzxnxu9sc835w9w3a98v15moiv5999ucppy6nw7gnmkzojxzv4impp2kzkmtw3dc1ioovz614kck2to7gfwy75o7yxy9y4wq6gp7r8fv8vvqq5zg5xd0dfpibime6ny27sc53chc6m0ao77oysvccw75wyldcjffnw768zu9y8lr56dhbocxsahfaw5a1dmn6gr79o4c82gocwts25dnhasoi1mn1nw4e0zi24nvjdqwiwn3im0oohk7tfpy3y3ycryta7mh3y7gz1mwksmlyvhj0w2yfa7r9f4v1fyffcwdsh6cgarn09875g3uzxgatjfqdt2cd7rduttd1dlpy6q3fwjqbs7jwm9emo7482og3tjhkeqy1kfyxcgq69v69t5qwmxpefg1qo1v5za8070856rm7q7efzeojmtq8wefkbrjc9eh8uffsvwwfdc2cuxxsy33sigq7jznicbeuiq4ygxljfw1r355h1f882o817qno10bcugnoxt94kidl6606z4mbt532z97ira99zw7ivdy1j11tnl64yrpunmz23piseg7ufppkhh52tgxhm68lynf77k5n4y3nwu8xy4xun5krba561a89i6lk13hgsl4d1czzl2x4kgmoo023yqpvmlmercfv58d139yiur4rug8eip3em63e0x7fypl0sxef9h56poee1jmi79irtnxtxa736tq0q1iv22726zxtb5xv1bgiedl2qkma11w57nh2hpgx01zw9b3cd8w6saf6t0ruy0jtcpf79rb7b840p1n0vx9gr5dzhm3hymz58hlgc8j1r960564m00ny2ufzovulmauokbw005g3ygekwhks53i6gtyoypp8iuyhuzfsr7ztjmyc8ybincsa9jpvrmwecsr2rz9bk0y7lfmoaczelkkv3dfge0nbxf3zh3zv2nh3zy5fio6bahmd1ri28ii44dppn7jrmnyg5dtlzm1kehbspb13ht54dplz2i9gz0xqrui21ck4928rw9trb1671dwvtx0wjkvh2jiu8432bryxgl5bs7lls2j1spwb9pbbt81xxv4kld7buq6xegszdr58fpiscpndmdqv2ryvri0nvprpgaos1locye3ycfppz3suizuwkmrn1gg71cwzqlq2vn6k3ijvuhzmsl2w6g3ssjvrwuihtj5t8e7hvh6q7g4yy3mxsdc7hfqngxxtg47btpt7xa8g91mi6ymsxpmchjow0zcgw9ji6c7bluu4gmlfw561v2fh6lbnkazi3tg5j76cvsvaf6ol1cs1cpuz8yx7r4a467gi84wimvdaedgnkz34qgn5zmwn9zim67k7ncv1yycwffzv6l9aoqd79kppy3hfrfio2m6o9mxeazaezr0ktikc9abtq3iribtdpsfmi5gf18tzjsh08aojm66scvvucq3q3ap635dgwzet4oun6662frmhv55xlvba2ug88uuq80z4lpng70kb2hwpw522ubusp95ggmebfzump1cvsc89wsloxpy2vg2cwgxipg3ppjjv85flokbt33vexkphd6819j2pr08pzqh0jna2m5uh3d1v67gynal0y3or50gnn831s2ubztpcctjwd3qmwumha0mkxooe2j3xt4ons8zmicgn4iqsi4xn85cc2okm0fjsua3qpdht6mixv0wojp9lm91wzixrrqti0add440wm8j83odmqb32jve1r3amzsjw7p5vqci0mct4xsx1agadlhu1bqyom8wkjzvlgd2hlz3f478dv',
                redirect: '127xfq4mg0v3ecaf1nxep9cajnd9d4tqztqi3s7r90n3b0urf3dwmm175t1xa9giwtz8m3t5i4x9xwnb4utqcsqabfbic5k2klt3g50s3993mz9d8euxzw04u47hwkjuisi80mo77yf77pfllih87glqdoasn0ijr2uznmev3q5nhsgjxn0dxzvvykwd0bwzm3w772x6f20mqbl0hyh7nblb5zi7sxeyiei3fgmrwrazpwkeenynekw05tc4b44eujkdgy8op1ylqlm75l2v4vj1vg00st7b0fba4npzcpbry7k2vq9ovol6j4onbilfy5okvu15z41bd0rff815b34gyx1ig1u2tf2kzqc1zf4wyap35m7hh2197r3eioqkascqta01mpmv3lfub79mfki5t4e0oq5ng9ugllz4u45xejo65ld81rnahpvlnhqxezjaz3vltutgz4x28rimozkphfcyzdtghw9s58kipsjuhtwa2147s50bb5auhynxd2vi40iw8u2zmmpjr8quup8u1iuhfntrw5ajxhv9qxcxkvj4bup8nc1zr67soxyt7ow2v88j1nzoib7unb25wm72ciunz0nciwz7k7vbgshr6l0297nonagif0whpawginkfgc80uj0w5hell09qg3hcwhgfggedke140ty07xbt1i68rie3w2776vo9ljiet3hh3ja2zkvu6c50acarcphv8h1gcohlvkbaxd3ve8g6wk90cc3b0m3sdq5xk0n9bb6tnifqh3g3b1va76zl4lgmoxe0suq1524xgtfnrvbq96fdejtnzslh71w91ai75d9oui0vu12keqst57dzal68n483rgv6p0c4eg8tz9kqn0dvqfb16q1686rwpwk92a292uelx12t78ztcgda6ytowy4xaqz4bhf6slhrfs6f542d5rznootw8xlyrjjb0kvedihdas2fl6gipb7epvusobdrhj42hjl9elmwzh7yohahjwu7nshxm14q6ycd5zo3esafs0ubx9jrjx9o4uwmon0j5n42o0p31ce29nhyegeiq3cmn7czm8e05ghj1doo8ol3d6311f0clv2l3b2dy8m0dj46urqeiw4evocjm5q1h2kzm25kl1jhh6wpwb2zp8tefc35zamb36x4292b611upjkfjuoe0knim3yh99j4kkll2ba22d0p4dl2cx6hbrktommrjcscvozjt56rtlrsgy5drcqex5vinjazcvt0rzqc348znlmj8srgpcrcnmwk380ecj7ivq0nmbagf4tv1t0xgpto1d5bav4lbcter306bn0q3n2t8g2io1xkp1tvgex8rufeya0roh1nfsuciyvm72gq4ygptppwg5d6kvnpnrhrxfo64cfwq95r9co5d6lj4k9v4qfm0aoegjmmmn08mnl36nz67865t0a9wpprif5r95a3e3lzyjsi8oc8hfrw1a9yxopodg7j2tgp81fcv290usmxq7jgrdfzie0x3zuev3gdj11mcpg086k15gj59m9qup9wkk6fwgrjsbd99r0vu2lntclrtzsxkn7bzd6tnokul14565wgalg64vy8ao446f1kw93idfnklhk3p4w7bt6k9td0150paqzhj0mcbwe3flx3xytigv3kjqmk2t0jkesw910o548n4inbdu2al2lfvc7c7c3q40ss7h38kqum22okwovz2zlt6e8ybklh8f5pcs53ong1ewpech9yifgakn1j3uzx8wg36iomd4svjtcxol0tknbj0ue8qe4s0eqhs8cxdr411c097e5yckun2rgwhcd36p16s2iwkgb9785er58engmzumhjpdqjim3q30byf0yuri1m8yhyuhp6jgtump49yur058lw53t6454kksyw741cn5rfk1khfrv9g4od05rhlsm295zqlr85672ifkkpdgfq4ubgc00a2p1cxgvt2s67dxs69iak7c0cmn91qhneqwk52d1hjig2fob38h2otpx6lo5f3uwo9nxd',
                expiredAccessToken: 4995409761,
                expiredRefreshToken: 1790240990,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'PASSWORD',
                name: '4d9ni2c9ajigl29bvh36xuz8wpzxg8ix0ztfsjdpy9yjum0qjcpuh46ky1kvgyv82xhw85saoyie3qarhvyz3wp9lz0rsftalg5kqmkr77w1lvqw5vlo6cdyvvneyidnjv943kf9tcetdyh7n3kabo0xojcrjorv93mjon4w6rjz9hc3rd6wiyfqb9v9nptnivdiv0a3i14oanhoo9add2gw7ohzrmyz0j48e4jjpovli5n6hbsb7qwkl4yfofy',
                
                authUrl: 'ifhh24oln3swv2gi3w88l2lm1jhsmxxu74mpwws8k7gtg4v9ujr5b6n6yli51igf3a0s8967gmp1qgc99ngm0vzq2xcc61wpjgy842qhivjepmpcw9qm3aeebtoxx4deg3s5puaswi7o94p7lkbcy9i39z9u6w43bi3be996yl12b3zz4s7i0b5o4ap4h7cj2az0l20u2kri19o67cp7z7vle37l42ciwqrewfb20q0xuet33dpp9lz8vv1cs0ykuvu1kmisd8u2q2ldp2ck0fubkvu4hv4d4u76097eoaev8sm8r1noqpjl1bsaj2x7a9wx0tn5me8eh1dvr1a1i43fq69h95n8v2vbs2lfmsk7sqzgvb5dp1s2f2mma3aghjh3f83pfzj4me6dtdd5i3gmsg7pg6f096utow2g8bosp6p3chnc8hymbywm5oauu0rxatjjuy17j7evk6e2c0o1ggw59dxilxdvn63hdbrsrmwanagx1krww9see4kv01hzunhurvdx4ljflzkemc1af77vxea2vdribdkxku744m4ujf5cyysk4gq7r0qp1jq3ybvjsidmbl1c7ursrr3ylgw7zyap27keppww3gpxhtvq76hikqv0v1vezk22vupcesgjwgm7qks3q4ab3l6btr9scf7zmupa90ybhuqkexc3921f8t804biijn599w959s7vljqg0g1xesuf65e4hylj0r6fszmmwcbpbp1mwn8gyk1zqaccxtlrb30y5mlg4bpi4rynyypzxqruqwx9c398b9ivpmczpjo09mor4wymi8eznq0h4yjixhphxbl2noebqu1mdtiz628u1p08ghnmkkry5rem3ukrmerwhvj3zvsltltvt98dapfp5g8wut5um3afpqnxu6do77fl1uio7ykmopxby63vi2mc0cde3ljutel3cymmvigm59jsg2xxscyuc26anqf8yadt9z4yzmwtji5hp0oxacza25aptai71zk8jgd9utelc7litkdm8x3x86pmywdg9f1lfdiq1r4nmqa3uo9hvwlv6hk5bhy08cta4lss4k25l8b7q8hnmb24civ2ltc6lxlesgfi5pri4fk9fnyvdyl4ihjkwnsll8yzag6cbi32ird3houy7yvmvmansehb59aloy5k5rugkgesu85uy71tdjg8zjjlovd83z4dwgo0lzf9lnj5o38rc2zgxssoga9bbbair8guta9y6pf207wvboi84xn1wy6qno4903w0xaw5sx4nz48hnbyxmywl30aunvj5z95bdq0n3cym37aoi5v03rkck29825298gyd1xr7qmkqb8n3nobgp71orhlttmoffbs8h2nx821emv0i8s645gx3emzsswufj6bu7y0sj3rz8fc87jwriy5deg4bvi8hno3tpcllqglmkf8p7cl1lwg983w93oja5vn7xv4frmc9tjfpm6f2bt69mypd2b9frbkdov86mmas2pynv6e3hup9urqqjma9sw2a6h2b641pe028qzes0so7f2kxz1egnem6l4pt9ga2ioncqhaiwvhmg3j0j65fmtn1h2pycvfku8kfuka73u1wbrh4o3av7uc21luiidn9j8eyz1v419y9okiz852wz2r9vbmdt7c9qowgsebw102fso1lwhxg3qxvoiefb141ky7wutmv4dnu245cyt6k30wzypwdpo6kehc1ooxohgfl9v32k2suf44ghejcmfyyezh4c1ksvk5slqwbixq6qq1bs814q3qxp3z167q1sax1b2ceonlt266kta03a9845by7nb90mvqtv5nwwpp1ihsigqwenu4uti678siyg3o0bulcddwxxfehdlfvzlym8ybxc7px8po2txrh8bzpj05ya5xs585r6xn9pq5dmsauu7lw4u7qpvuyyw4jhn5rj4m3fbswpodb9a7w6iqm57ph09dkc2dhbpse9rsfe61npcgz5280upwb7qzlk2d12upedtgx5f1ayx9njy71ibnh',
                redirect: 'l2u974op20msnata8m9n46tawevrxop5xgsj4g5jvglbnbqyxjw45wdoqxyzsa6xnhvcd7sn5ar76z4f096g5sra7ttx9lepmk68so4kxg3ocilo46x8h5l1wyvl5vjeg42pmaljb521nxksra0fmvmdtrwcg4ejajrcpvdbvbw93umvmnt9pak06aqik304goruec6mpoyhr85rdx3vwc9bqe70itdo05xckjkcaxziv9bhei1rk80g1uuj9ho2hfjv8em5zk7rimklcit824flukwa3tbqzdmyqgc35c6y02i688vlotlhmd8556ibss6iyzt8lifbytvw7pbck37oj0dfh336rs5c88uplioe6ehqbjj1ellfhhik8qwhx04hml0cetgxa0iuv8eivrmzszh3ua1pm1e9nzxtgx3uzdatu08tt5cp37vz55gnn48pvoeu47nul7e71j20r1l02zlbmx8wf7wylgc7tro2kqhcn7fdinfknzlgrd28gpjmwy5ux6oc573nxhnrja1p9myjhva307l5nunh8figiza69mrtrnpknme3u5eioyvrc59t8wknoe7kq2pwlfzlsnebta6c63qnttzwssmq14g6kll0qkyazfdmdtfws940zved19uwhjltcn73knmk195u46mf8ldt379q1jyxkqio4lk68ocbaryp3anhz0j8rfunjkxj8kyg8j2x14gzesw0hq0qvesyl8sem9b3fx0z7i9y1yeqr8paavupa0lfxvfcbsfyedi9z3049jiw846i0n6ptuuiazareoyvtqsm53fmvqvciiql9q78ag8gja5hepbomv4ggfvlrnpgzxufn6rcvqttwxd5naseqbtadnmnbquarsvh6qe39vq3dlc3ktusm3egxuh3mk2mypprsu7ivs6n2fqkrjkchpu1q9a6etfcb2dz6xezpp7n76o3ypmv7bdnhzo1jsenm6dsdqk1tkrjmv8kn3ez2foyf9irsr67y3abjj12ewhgr5ydsidclsm98ea9rjhbf9gsiwab6zq725s6bmu1eq0wtwbqmxr9wy9fghpfybe7a5t13ntq7pea7nxgodejb5bqaz20zhnmtt0gm69xt2cfpoe0mp2c3iexlk05tbk6iili2rnl45v7yodi7lg8lhs0qvxbxgrsi8nqhpi17nbyg20dm531mpbjz7mzj9j8iapl138efl89q130s9v3kyejmnz8o0wrvu38ihsm9ls5zmb0c8zbybbf9ofilhpny3ijtk2o8ragxizh8p4gyb3u3i8t55rt0sep8gsras6t4vtrcek52gf1hi9i7aqx0qt5a2is0yyscd5sclnhkv564t43fy7iom1osvolp1c4qsxl3gm6dfw5v0xag38dklgh1y0f548etuqczvfrwx1iakcbeoymma9jdl8472qutunxrbiz9tww6din3zirrruaal619769kjztjnm7wuphe9clhuvq0yrfaexjavtzt7hn5mtq3i2dmgm4vacur9uh07cvjwlkia261qf4n1rwfm3hw8wyvr1e9z2x60jsijlcsemunoh88p7y7ay20z4vekfu42u429c0luofqupbng8gbvjzn5ouv1krxamddi4af71p26pcqdil0zo45pbwgkir7ubp5y8efbx275k06eowfx09tqxyzcpld9xugvu775qjiz98031zujx7drweuf244mvg11ofi8f7smaygwjl2hc6fxtg8u9tif66jjbutrx85t4g0dh8bdy59hpcx24ogdag01hefmz8j5hgf2nfddju5l8dkbe48gtchpr2ea8zmg565h9yl3qdihrr9trjrc7fyfqset6drr1ww3hp954438ivtn5fkcn7y6ncg11u3mgdo1jobfpmxjic8nrpt86clpmhehxg83pefk3jcemp4ck1jd4jme7ss0t9jwg13kb0f81tcioosl5ko9cx4v19i5oyva8v82qkufuqlk37b30b6mlegbgz0bhubbafi3qzxdd9',
                expiredAccessToken: 3251027587,
                expiredRefreshToken: 5193384411,
                isActive: false,
                isMaster: false,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'rnfy5e1ys587cbayz9tadrcej0hsu3avnmphycqrc2jxhmwdidfz2mdulkhswd320f2riuow08a93l6vi2wdtsfe7uoz4341jxp7t1xjsnwfa59ondk6pk7lgj8w4bl4rd3474mm1wh92dhx0kdy1nkqdhgifv363h73rvi7cgx8rgudu398zbf7fa1x3gz72icovt5ak5no99d9cpyov88zsyi3og9bsyzp8oefb1urwgpm6eu4h6webd52y42',
                secret: '8bhzoca280m0alcbhx6hzl0d5to1yzse83ocmzxrtwol1atejiq5ugycndb3jzqzivmgmefgtn8sho1zcy17831enz',
                authUrl: 'yfn7drbk43afi4ngurc3dinr4mtkhavyf65pdb4m84c8jm8yvcix501x6da1zhlrunpg6y4s0ao3vpbtie166hxsroutgc7oxpk1hqc5eau284ges62al19bmexm0so0e1mdpv3l2bzmhmbrxg1edd9aecztrq6fw5ukk6ebxojbqs9ud8r8nwv461fgg4ummxy5ho8n1lw9ml2h9sfxkr77o51zyxo9s4ljp0ymj9zvqphxz9hl5oi2xwrgedacbq4p9cr4egj1v86seafa88j4tqbi3o6oxmkb5562u5hu80kwljc6vyic3x4xryk4c1z53zv2tfk8bsk7aetq6pdelicnreq0g4p2bjvzdy1mznqmxpnnwxbspnauugu3ddtlawndtighr12tcwiwed7d221n665ttdiwkm84dz1e00asveptcbjzuvd44o6ys7ei2x3yc8s6w6b008dkrcl91sd5a2g4yb3wxhib3y98wv7aqr3bvq968jpqw2r9uulg7ggpmv3afa3vv5s6hl9slw0lyahdel2vbep0t8lp0md606m5f5vls9uiur9fnifc6uxbgegikp4xs10gxodmpedvxscpt8mx6m8hi4mx9r551kx32wo0dovnf39l1jhuhz64cqd97reztwsmxuagg66kc1t1yo85vyk1wpcj22wq83tnp1ldbwrqg6i2v82uxueyv1gg1tww055ea68x0yzzn913q4d9h1xzfaxpbqv3oyisppdycd51fuwoyw4bl6dkxl3mi27gcszn6jya1skl3mdug00plwwgu9uary1zejd8s9vo53n4qeg0zkt24zqx9ui6f7es2xvdqy5fesnxhnxfoaqvw2o6iy64v6gmuj9srxc2di04goa2kwi5fjlcy2ege2lu2txhlyjhq4671omnzynwd8bh0anld4xprwpo3do4922rf64iw38o7mx4wb9fy3ludqhbko1xek654070gps0dcwl90vgtsakxstv05hj43361k8sqoieir2kjc6zkunif6rr65pq5sp0oc4x8c899ezzag4mvlwiumndcfxt3lefpoaoylza5q1gvflsrdh5zt82grya4c811jjx6jx91uyy6w3t0hl1d6x5zc08eez6llr3rm9gy967wykjv1do6yh09dlt4n6ar50mxuu2a3pp3qhzxnn5mx446jbsx1ackwakgsmr2ccnt4o4pt4z1na73sxnvk10f0hjdra8q66payffz0v8hmpa297m1mdwoh98wc4h9g2lq2dis2l0cl6jmqc8xyeecdj2tj318z9xabclcnpq92irokn3k5ff14iue4ynf9319xprbbzoznv92x3fb137iiu2w1jlijrhfnhi4hdwqkxkc7et468n9ls2be2o1y7s1um5k7r754ihqpfwgubpfpqtqhb8pijqgebr4bc9dkwv2o574txne7ek8iqn7lzr2vh6acmqzqsnhwhwbnbixu0oad5hcr1yuxppwqk5bem4jocgfukpcdfmwiyian7t0lz195cx8qurqk6imffgiyt5gingo2l0bsf6c31gnqquy659d83h2hm8rrosxk45wxqd4yn4or9nmf8knpe6cpv1kaw1pkfxujfnv467ou57jhfvuy96szyaotvkoijxaa1h8uldheg59bvdizvjpmg44f14cdty7a3w7awj6wt3fj1glhkbmhyrucnv9dtka1aljtc88zeo5gsb19unq7no3iv65sj6uzr8l2z6whns8ldpelwt0nybkezvc4ms0rg0qh21j3km4yz30fyjouc3xq1c3fpb2sb0gzg4r0jusgj30dvo02ic4yr4eoyz5vb718hhm2agsdrr1weeep77i81njlfol9qnn5lpcac34jvu6jmnwxnuwpkxoe9rs4ytt3zaspysjjxchpxv30tajwq3m0w0dk8bbbbucskuni8kn01ka1ct4krw9ntuhqvppfurbwffmwp7kbcrb0dbntoxu1e6db1mu6zj8kan0msobf5sxtcr',
                redirect: '3egblx7dqv056mnej6aek0qmuwmthw66byygzs89gi9gyhqo0pf4z17g2vlfslnl5yvxjcct0lozmrn6nk2vc6lfwjismbfuo155mhlqmkk9ynkys888r3vjk81boro8kz2yzf9j5135311s5ttan1mnr7hhmo4q89smrq1shm2dswv9quvab3ffkbsq8plza6ojj98y0gkm11glx89ylfz8k7yta3wbikvrxepzgx6gv5chhzrgc1ie5udec5vcl2sdbck6n22hu0q6i2oogkdzlbahuzltb5thsvbrq50m1s4r4yvmu0pykb411h3q12seqtl24qtzshsmvdpu6fyqc678btkuufxxb2fyh30goq2uh2rg3kyqloxox5m50p3jhw2wxbpa31dfmopjdt5vjt83woz1a40rn1bl3w90j3ksdbbuf3kaupwi3cr438ygv6sa174oxnjh89olktbnkimkezop3su3pwmekfbrrb1ldsgek1t1d91a5st9t2jjmgeu2bvl2h6bqidofnm40s4ju17x732z3zs947w1or82t6hlf1y5bqjg2vmipsm6jn5skna1edwlc0ci20d8akzmpjz74xat4zxplyyqusen406vkandockxqbey7p9o1mwfagm842ywaqxft0dmk2b00wyc4qt35zd0ke3114qgvuohordupykacu0y1z3ttir4kc1qp1cdg7ahdqeh2xhi962ndip5pocl147rzyk7aqy75kbuta0mg2wmcjdw1h4akg0ct6sowwtgqocj1jzfu9hbmmap1zkq9sn2jsz8tv2b58oczxs40b67d8n5fwwl0kz5s6h0ok4v6tg7og851h4bvmjdqv6vj1kf3r60u5zzgxmgemaj2a8en1d0v37so8ysejnjrl9n0mztbi5zhyn2bqzl3w2tsox21q9c9937qaxv6x1hcn5z8dkto4omecabgipdzlm84k9b390cm2xcqzhns1ido6yf6le98nsrc4bsgqsn9jvo27yzp8griajvx22h8jtxnxyjs0f527k1jnqfxowmj668v51m8v1vq9t9u39s79h1i6xl8zliwt2j1yptlbnyqlhrjahv5ppwoaaayw5hc1plhm7vfm0h5ga7cd8gcg8lcxqropyong3kjxhbrx1r5k82mo676idqpg9s7pvosvyk5semsvn6ly5qe9o3m3ag7uxgl429si4ah12rxas7vdqs6cg41qmj9bl92kb1l6pcq11u80wff85uggxb1zq2fqpkt8ayjc7nm14ni1pvnyeej7dqvr00qtp7n93ri20q3m2vl6ajp9d1l2pjftioqykmkhja4mnmm4kpp0f79044er67n2nxi9ighdyopsnk1jmjl7lqlzwybn1md8au2rp1d06c4bvmdpah4ttc7zl88lktmhev8390oh77w0kq6ln7t7fi2bpvhzhuxwim7rw1h142asvik0sx7hyw3xdpy74lky6q0kgjniw3isbi6if3474p7ryqxrak6hxnun66cfxsmz4hs0j75yili4w12ek4fcnq3xlc7woer02ffnwermo7hw2o5eptr677otikmrt0s4i1o6esry6ea581tzhxa5jc6pt8krwvzw7m5fwd6m1jbuuqiqzri8u0zm79xqtuj1bjkty497sv3w3hoeh0pu1mtajyo6vmt4s3kehfychyytiyihj2ss661errn0n67n1ayuw3zzglg3fgujkycjk1qum5q9wkwmfeun85qgdwg7tcmramu5nia8zw3tbthb8j6kixpuywcbtuppoynquu71fqoie2glghw620nlqeawjzjdf8ys1fkb47i8hslxpjx16zfwqxlsgkpzq7omnd51w1dvk37h8awumbj82mh4nfqurd84gvjl5oclc0y67nhcglc9xzyajgsxjtki6ykelwyvix4jx3n5r7r6i0rlnee1d8a7nfi7te4pc6pbpb75lvw5uoj4j9io0uguhaahvwkjh8z3rln2mwjy1i5zmdk0syyg3i',
                expiredAccessToken: 9302096239,
                expiredRefreshToken: 5929945619,
                isActive: null,
                isMaster: true,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ngooi5ba0wxw41yzp5g4s7lpswqfxz9rnquav8vgy5gw3omnssfrfm6wkazqj1nc1pfyeag2jepmqcd3g2sity5kbnt2nazvr42cgww3275gpylryyxwe33ab239fk0mdyd7qxpgdsgf9je0gber4m4p2qxc53qhnl0xym85pp2vjuowcalyl5e8hybq5ye6a9hjn8ysxepsu78g908f93tznc0g7122r9kow1j37hjhp8prkmx5l4t4rt8vrx7',
                secret: '1twevqm2lclejprcd9dqyh1fjpt226rq3hmwjoowf410tcyxynoc104c8wk36gjit0w6brov5p0jgzi1d8cjm0yhmg',
                authUrl: 'xcvzwtlxg3p40vhi9qpbqjdx2gvr3i3hko4zb4e7p4q83up67as8k0fz1m0mgshxz5p5pod0lzopmymyoi02012g6kto1ukqbcbbzyd8csjljruqpd38qgjeh7zg32u89gdmdorq024vm727ptib8l3ca2f0xu0plep5sds0q5imkfu0qoznzjln7bbft3fp62nok2id7r7xg2gogasyai9itoqccvts6fknkrh35gz7cshmwdb5qqoz1u4byzrscwgtcs6w1fkf9jgv1icvh1vxpzpwooh36ohvp6rlltbvf9a4h4oahgfl1a0n111439bj19twdpek779iuow626mvg7xe0c5bk5pm2qy5cym4gfirb3aiuet1ym96zj6si4s7qiihqsb5ga2pttleiy3dq3wtpbnn4lydris2dpk44rut31chl3pudooh86fx8mxwoo755rzbgjnrq28197n7f8qb1kezd8cthe6wfkbydrduckcocl4usda28calvcr08ay3pubaknger56v8mezr2orqmhtu0dggefr71oano2nwqo311eumvqtxf5tcw385sbpdpkk7yqlm1alxdxxv90xsy9e29tl1pahaq3msdai84g22u9kuyoumtczc0g4nm1xtxaijmvnvtda5qagunuisi51j9he1xqf01xnl4dgpo4btw6skl15uvturgql0p9wmuwb6y2om7vj6igpieud7s22u3r1yhsyft1qi7b4gleh1gi80qkspscv7d73mxm9qpxy2fshpld4t1c1h8lzou8piujjo2xkdo0rv8o8xrwjzxl7n5zswi7makkpdwhv7k73nj1ks9o1jp70hdubp15rt97j0xbyk398v0z9nzlqk14fxrwtorfqi5v6vixjihvv860tucskram3s9zuf5f6uoyeb6e07vyi3wtxeq779jrkbdppf4mzvbbapyq3jqa6bgtws47wxpok3exegrl6navxy1sdqz9cv67n1zto26kulazi6x346ho67sbkxgz1uwvlz7cjudkxjxefe72tdjnqajj1b9o360pl8e9zo576tj8whylf5ibgjjp0rmgizyiipztuei7mn491t0rymccdtigfci2u0wlvip1xuy6o0ludi6tactnx5b8rbpn3qp8t7ciprz6s06w5fe8yx2zlx3txcdeeov3yq7gks7egpqhtv8zvjhwh8k5r07427nhazv7b53ikxh3do6u4ro6n2qrnh4au3rz7mofs51r62zw9vuupygykn9v55tq8qwieo5o284yze6dnary04r60d5bwfs4at9vks5y4zixt1sc1s2e2twqf9pef0fy8m6nlr5onvv9axovh52pfkhwv2vzwli1sin1va40ro0b2ne05knm3fus8u8x1vyo50sn9tzbj52oheuzsxx74olr334pn1clnvlxn8sv17coir44epcgfvnir7vfnohvt1aaswccdtf3xqmho55wkwxecpvcub15env7d6x55zpxu2vy8jeu0aygvde8djfkrppfa5ou34ffvhcw0echw7w875z2qzfcauqizpprzh4blsoxhgwhwcd21mc5nm2ksofrfzyaanaw3ulpr9khsf3txzvwfvt8ocubb637v2y8nsayoc9i8u3r9fj66jw6c2ii29apr5lo4lf4i41eavq5kt6dfp0bmaw9i6ygq8nlywax0s4gxdl7umjq5opqsagg7wc45bpwjndxkfp5itihi03zcmwxwv3nsuj9aufo0rkje6u07mxoauj4qxpgouebvp12eiej6ioav1xuls721puwqgw1zn6ezcrwf6ybbgcxzpalcapab4x8ewwqfvgaxp28qb7y1d41ae8b4yhaw6bzibz6cs77s7dymvbsste038l4l4gjebxtenrubsfyr8wqpvln17jzmblm6bdt0qzw02voa8cf8gdnwc8x2vcqgswav55d7vu99ypix5b0e4x4mjjudx2cym73brr7hhmwmie7ymsu5vm3w2ibaue7gnwd0',
                redirect: '1746shxb2x12pvz5mt0h7z4gzzrda721f4twm83toi76550tk0weffgv8gdip69sfndcgw77vdovprfyaoq8s427v7g5kppmepf9ry7bxyjqcz4zp79cg0a4vvhquls7h0djrakn6hkss99uesuuu10oqwo2olcwmupn2dmas8porzg0xj3g3k93hu0eb520g191sqonmzsgmhmg2qc1tcafcvzeq3m136t8swxap4s7whyan3ew6ddzeyq1dco1ew5xkxqtfhkqan9kymw55ktt1bqetpsrncodv86lc00cdi2ojnkd0a4ori8zybvce6x7lbk4lmjb9wdmkyhmbezy17qnm8yejgggtnmsv5khxji0g1qyax8mp1x94197hzzfda4rkxdwh0rydeooo2uxqlqqvwzxkx1q5g741pve7ocbxhpwmya9lx57v3u1yv1228msgs2jl36lbx3xufn6h4lu1pidx3yiw4qhl7ao6qcj5abd8mvhu50c9p2bir0hnbu9lfwwdrejh39fa5gs2c9a5f5v171c1f00sg7gotw1ty0o91lx1uz4akipqajmwn26jyndeu1iftubugh8envak5c52f5ym8j45ac5gjfv61z6wz97vfx52mnkdgfx21kriudcm9aa74efyod2819h228yjbi04vq9xjrrbf9z1iq28qay74503h840g3d8zqll3d21tc2089y8s5wod1d9ewnskwkc23gudqxgautvsp7eyk2k2mfxmv2771f4wdb7nlr2x3fqc6kv6hnh0rfoz770htwrpiox50mm66fb50z0mkovs4hs3yuz16p938z9vg8yhrcd8m8c1uvptrb16qr4qv9j4br7g3kwp28shx3vsgumh3urrmoszsxy42bxgko6jyy0rb1ue2zessr7facokoowjlva7mxw4s6a2fhq491t03592ylgx8hoi2q43t77e7xx0yrt148559f03a4ync6esmrd4r7ohvfbbwtm9rq6frwu4ktfs03yq2a0hjz9h2nn8ddgx8vq3k6ud83heixb0dtf9wtcm363oexi3d5kti2ghshu99fdzi2id0qz1labnwl7o4ljr4679k01t7ilsrm74ma8ij1sqzjjr9tci5gh41y6qt3mu1wred9rxyrhfahrh9nkzi6zwjbfgupekg9jznv3ml90x4o3fy81ezkalo28tr51ak7xzn2yu3mz7fgf81nsphja4itdowh8aplmsaprvydwxpjmdl8i06horbwuaodkf8pkzh0xtbjrie5qjdzn7fdgcsld5oqlmcxqdnj84w5qw8r8evcl21bwbeuqkfamglmnzdoxj13ectpasysqv3buhps2loau8u0sktqtw1e3097h90bznsj29aspyv0149l5dt3p2wpbwa2iwctv2n869nq6lgwzrk6q0q9m3ct2ww02fp4wjnni6pdda9typ1fdwmt60uf2wf34pm6halrcax8t62if8j2eml6a2r59zh2eemczq5h70zc9mdodjybvrvepba7nqggr852r30czq7pzkr3172ecst9mfdgpiml9hmopl6udoifkilz3x29nn69yjaykv3sdx8r4ovd747ml2mrxd9o7mxvh6d7u45xfm1puwzrttey85l4wrfj86a4h57qy5k6xqrbct44wf7wvy47rur32p3nx11gfhzhl5c2h7o70kcdffxurecchklnx99jz422klijt4b84rfyf9d2icq3k0uheftnrnfq0ujvltgwis4yligi0ayjs7gcct5s9u475cqcccrd8f7x0v6fm4wdv35kp6mswdqij1kgb258j606q87fj95dcu14bfwtzbgm3s0g8f5b8y4vugyd18i8kdaslo3wvpfkm8o0bveoetajosgvompl165osk2gk3zyf7dokthmrd8puk42uk8nqnlzljgtj8znk58cj5g0o9lofvhagimwg2ufd80sla3wxes3nbdnrdb5ertvuipl9kenrmmqpllkxssgnjj1wswy',
                expiredAccessToken: 5755329955,
                expiredRefreshToken: 1362313571,
                
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'sqj8eeeg2kwvc2s69ahu796341qqwq2q725k0nx7mx78zcnfhuwqrbqbiq26qinsihs1hplqve9ozemgw1lh13fkbgl4m2nqlyou0794dsmpyyeui36trlrg3dvo0gkz581p4op5vcgf9g84ynzdmflp14penp9qhajovo598np2ks21rgn1vkg3i3nvyetyck5mdnzawbbqz14bx2kji1hxcy241vkd0mryf43lbwqkjdpf34f5dxwnidqohz4',
                secret: 'wld109b4bvfk2f04rcdbtek0spph730m2kk7xyedej5kxg5ogd756hb0iybztgjlguqnunm969gcrsed9vz7fpq27r',
                authUrl: '4o6cb1rhujl75eph6s3lfo7hulmc63j9c91cnmch62iletgxbevrpm8ctrauelc3l8tgn16tn4cski6kns2h26rffigm9wy8jj4u3rv7mz3hnmj6p1jnnnws27wt668k1kyjj8nmihcy2d7uwsaycuo69jq5i8048tuboff86sw155yy9wqsx3rje4rnjwcd6lb3nutku4bwh95aspjhs4jrml962m9162hc7cgl7fzzn1lysldekoaz1f2bo889dxn6fkxhcn4gcf3v4rzlneck5iss5agwmnbebvuk2qev8zutcrkfyzalu4q6qqpa0iw2due777imu66xl60h6h07p9jl0cdohl43mztfrl3twsnc06noou0eg46w2vhmowz6nsgrb61s2xpvkx8dol0m27hj4euvzh9alm26ci1btpfgr137x93oww33fffa03uii6wfb49ipv05st86vj8iqwjzitn876nbn002saba2b4rdps7708rqoukdy8z1elnkuxbogly154ypevvnc53fuq1vn5cfr7okogo6vp7tstz8e5mq4zxsy2iqe64sm2za0pxjf5chignbec8zdhc1vgn3s4914ebb5z7mzfr6dq7gir5wk36tpqphqwaemr4dse7guzt5181r7tr3doqhtrr6gok55rcxqvppvrwusv02xyisqb3761jbfv32ncbqi9mqpdpd07b9om1oketh2leto88hi4410u7hg6uu6g6zj5bug0ed2xs0tihgz3i8l90tt106qskpr5yfkfegam5950k2944tb7dz2cp1spugktf1298qpq6rmiv7hs04ifc0yebk2ygefkt9muv4oemt4467c333dwwcwdpl0bz72c0h9zvlouf9lzb2dfewfg7tgyder9dunabh68ucst4ncaawn5t3gennipgoccqrvdmict8qhnfo4y2chzs2dhpngqxo36suap6h4xirgm2dz0tptelmn94xz36r6pko7cv86c25gbloknhoswcuo9b4e6eiv98h5jnff6y8co6qq7ku00rfnjfb3sjhig1p9znqnyyktn59f56arbqk0sli6wgwqnz8xf2hp6w0s4naci4usk5itouv5zpfd8dxi4wucdles5ly416qeo4bc3ydk56yph13cj6vcblxqx9zdp89ewvk1o1ebhyqvgmknap3g9vysrvf2ih43oho3mtukzcrewj2qt1e5xo3arvpwzqb8rxxkc5u6lwhi0ofr1ezbo0vq5au8368b59co5uo6t3jarc0fewqc2hwwnr3klqsi1cnm3rgxf89uf5pciijyv4fm2q1jiqt7sm5i78ru888pgexijqx8jy6dajxzr90eht423gmbbbabygi6l00k1wt1095jevaiq57w79a446e7lmkv76w21uij7zbwef9birettkpbumcbifhjgo4c04oures38bv88tv3khkul0ug9mvgbo1hqqs9h1t17o7fx3w3tkhug9pu082yg1znvv8r5lloe29trn4y3mnp9h52digw07gwkv5aoq9y5j5cvrtro320mi996mfsc0chv16w7h5kl7tbqs7ak9j34g7df2ztj8oui8mku0gqk2iculjegl91ftmlui7p4v3nhizrns02rfkwc93ooav4dgkdgthyeeadl8ynpsdrql2vjdj8n8dx4bkei9kav7nyw5c21u0m318ih8wl7b2sk4af2il1koxva9fc0dm06x4tm5m2vc36x4xdj68jmxc30pjbefr2iw4os4wj4t08rqjyh0czgb78wpdn4d56lmced7htxakv4fttmjj0ab2shaesjr1h6t62lazwm0xrvpffycn4oi36a3ob13u89as0cg30lnj9fbri5yjsn5pn2iphbihewzuh194wdxao0p7sobqfrtt56cqewuglai57lj01cwyd1afzkjf9qkrv9gs3tz282nbldd1ceil3049s1cejgd0mrgxntxvck8tf16p6w8u81s5dcf57xmxh8j4ncdoi44',
                redirect: 'qaw866k2t28gqjeotwournmlw2bgi0yal9nc0zlow7nt6la7r9u0nm5cavzugb6w45v3pd902z2cwfbkkxd4cdfl5txs853boeren4mzrtjscflm3laorygdp37nv3ystp8f078r7kp4x2loz4bk37sque8py3tslxux5gdyy6qnuex04d315cvn22wfyydu8bz75c3bdiuask7jrdvvn3lzzowwns6y606zvkji8jobxm8q4yf3bbiertlyhla2t3bb15ink0ysfjqxcrnwo7pm2w074hj1nhv59tt2mu9nyfyh86owpo8dsdehjzxnw01b4qhxx9iddjeqmke6b7pvkc6tikzr8y63eb1tvcbusqep96l98dbg3kui20f85khsas2318d6v37w4aj3eiy8dfsc4q5412uhlg4052ckohrui2gvf0f8dtukllmo9m9mau1yzdtpz6tsb2dxv6zss34w20dt5fkeg7hmzb2g8ud9dcw3l1xdjnhlrewimg2qlf8gmhn8ngn5ssmrgfne03v3j2be1nwpcds4s8ai1mvvh43rjk9rc368fufrjv67bjcxcz3zgr16f17sk8b3rln1tnirgb5d6o1ghy61ca7sbqru0f9qtwa8z5h9h0evsqd7cv73n63ccbhgvbeq2534600r5zeo86kuzig3fdf1picgrf567rw3ffjvx5rlsgdy37fdc41nub84271kvhztfbophs6tcki5xg9i032chky7pxffbtm2ug5gxmyba0plxt872nksluheq7hi39hfugt5aar5dpt82ryh89fl87b0ccemzgzrne1mv948hp4dqvuxyunprx5pkk6hrn746iasjwa2qy9vy3yrd3vfuj1e90eue77jqo7jczll8suh59i9x8vzg2q78q7mnfaxihi7cojq1zdsf634z9vw7ghuxoajgwzpucbdtz7c4czl6vqmrr4dn2tfkug604iti4gb4bykoz4fs04wnvy35k2smj48hbgo4y0m7frp26o8miylifkqcvjn3v55dz99yixqi6mrfsmy3my699zge6d0sjglnhdcd7uhgi6hux54vri47eel60tavlxbywxvodiarxv635pkjrd647wjleusmgyb6fkeqshsvn6gn7kkm3422plr50gy7e62og2qc1u9w8nhelaq3vmksglwptk57i0hiddjxvkn7suhkqaq67nzjni96xzlkaly7yac66t7h1pfu8i3o7ro8f2saz1n4xbjj0ojvpj5fogpzxuph3gzu3xc6u2kzbwrbzs9asu3agj05htk8v39hognpsk2r3vpzvvw18vup9ng37wcdy3g5vt4y1v0utqwklniyv237c2jiqdvyye47rurbu6rc7welq9jlh6u5vgogji9c3tmo1dq0mdj8foblie5d9l8ay21uhpo6pgpcmsirsdthsegyurgranwmsce9d0g3ierpknh97cqk4xffa1d4wpbdx7vj7qyzpfy1cbjivqwuekt3kwsz145ahjf78jxp0owa5z8ctiqn9gjxgxf1l1j0tb26u5zv1y613zvq7r119wkikxojcn5vrywavtucbk8g4vfqd9himlqp3if5u6yysf7l7s0drltuom6hcjc31n3lrsgjykjru30829s37yimk7fz8wn57jjl0qunrqmse7hrupobezp4bdj07sk2vsupt5973ys8w0w3yvjgj3wxgh6tahe2qj1ojoc7ayqdnukuzc5n5q24ius0cyz5frjtbdhisz0pjt00vfu4vc2t0rarv1h73gbhpiypb4op5coccc3xpgrmihdbxt22ldk1wp5wxdbas5tfyis6pgm936at6kd0qdjsk28sixb4jgh5i88pev35xe0o3lvxu0m4v0dmt5bn18gqzudu4ks9vz2iq6g7k1jfw0qxozubf4uhrd00xlyl1zmcf5y38pn5o12a5z8yneyqa5lvc5k5xhbfurluun7y86pu1hxhcodmifacaiw2073aqtmwr9trptg2ntj',
                expiredAccessToken: 8614275882,
                expiredRefreshToken: 3052633281,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'AUTHORIZATION_CODE',
                name: '8r7rt1zo17ng795h7ugnk4h744q5vdmr09amawdnwf7ozpgp2f04jy6qtzlnz6z3csrwts8meezm45comu3l4p8zc9uxiw6cdyse6522mz5mrtmo0tbza161oyf2kv2j6x08jjujdi58cxpxlkswoq0z9iw3hjdtl16wl1fx5mwa74mcxpvw5fxykrg9k7vqrd63kmddqp6qxk7nj0jurr8h4asrwssjsfqtljzjwappsavpcbrhs07fpjsw0tm',
                secret: 'ataoa6z4vlnegc1953p5d6ip467iva28wzd0bgr48u7apol8463ohsg7afhdxqz48jq7d3bs9h1k7d6e6ctj4er6z3',
                authUrl: 'rv5nf0jxlh4fs443ngfkzmehd3e5327jjg6xzq6y8fycee99sil36ei6heldi5ekarllm0llzp39iezlynwpd1mainpjaeyiaaueg4s96jrepqffm1ewe4zgspbz0veaauf59pkc7a4yav0jzznbwmx1tpih0ouxbpzbehpvigqcbd2ldoh7jfcs5eqqxkyvju91uj2138yc59uprktcnb641rv1k7i3epnvkcib5t7nbyhsgcaz178fhoekh92m5cedfeyofsy6ykz7brglve0giulzjwue3vzl9hwjx1928vb4nqwidau13yqfcl5fcns591x8wmpsxwgo91njxjw410nk7w4nppqu7zue2q727uyag1tmixcyimbb8gvrz3dc2afizpdelxii3zgv8k7jn0ob23kcclahjech00ycn1vzyxio39wn1mjex9ql9an2bxzu43bf5a7lzsuv7o51rspsrjewakt7xguh7pi4ompbne5or1z37yt16mll8e508k18c1cdh2k88vl2wa7tac67apjhbgqzf5jwnivbf8jukb3a2c5p7apxci0u2vipezw4xtps0ok4hqylvhg209ucpzg4y6fllayh9oo6ncuw4je4rc77ecrydr2566oas27yii3kd6j66e9snuu0bz8fk8hvlepyp1aib59hnx0yqwfdaz8vufu7az185rwkw5vske7jut87rqi6vxuuwx0jdyo9af2ls17z2q9d1p44raup8g3o20ovkfpmmw4founlgj026oj6ycjjl0dgez4a8m2ilwsfn9zzaykdp8nc6dgb8t940qodn4ckmi4unhe10069lxl9m8oji9qqwg2juzgyj12ktti7krqzgy6zgtnj8wby04ecejpkixkc1g4efr5injh1zk8a93iqt9z309qq50hsw5iahbpxbrr4lwl5mz8tz9wd50bbm058ccd1604ev9zbl2nzvvspez49p1t9ouc3hmcdd5p51hwl5916pbzwbvon21emg41eslcz9ths9tsm5v5u50frzutcgny0q5tmxnp2fyr2u323oe5bsd4i57jvbc2ld9xnex7c905gkmjtdkjj83odi7aisrjdh5huz4223hjxj72i37rwx82r4f6ng75yejumsubsxntyg0ag46uki0evddiao5p6n92tldt0ndvaoctdy4bbgycj0cyd6tuoxuluxiv4bmex5ie8lkslbq9tjm087i324dtu0h2xo4bai01adxdzdpck9s5fv2wxy6ovahpfng8t1h7vwd0zjdtpicvk6e493az90ngcue7gjrvb50cidzyoqkh5tttc3kcjlcc4gpfz1oiri6wy3jg4uxijs6h5lrm0blpqpv0pgqoo8ib043ml08r1871f0ejmvhi1m0dh4y952ctj1sslv0p1a22ixvyhd5tpzar3otm5qmuv50rzpjrtfjku2abtpe5opt0a14s6g3h75c9c3x85aj3nox4swknd1vy6tn09moszhz4xsalce448zez6mjmz9086r88axj7d8odqqf0m48let69o452e1k07izww9nmuxuojbe7z9zcultegpc7ftu1c9f95251c7036v9nr4xj96xzgsr9czqo0xudbxj57yk6ysu4flc1qctrq4kbabisj8kuo58i2cpkjfm953lu9erpa2h1izipya6qafe4sqm053o172s77yx2qgvvbkrlk0ypqygopaidyvwj74ilykv7nokmmw42vh1fdn79i8rxazkc44upbbd1hayhlcjznui7j7w0u1dp8sppw7nohfvkjt0h2332ecvt8npvo5uy0qljm0uflqq8iaws0y41smkr7a8ky7whuvsoqwpu4e8z9f2gg9u2535dwat9wu20se2i4aelzunfues62oty0lo44g3o1kb2vdgfhqg9sfzh7ihthlie5bwy87b621mllk3fzqjdz5o3ka8pn5v1jyqrgnn0lavykju0011ja1zfsu7bohldizwa7bjz6zkiyd8mcvtyw',
                redirect: 'p10dg1fgn45f44w2kvjmy5k3nugbk7zxg03fzv5465a86vp68o8p8vnnqbdn184414qykwonzxxhrev9o5xebbnmc3ceitaktajrckaz16r4fczpiynr2hurnhpx6kjm3nxo6kh9sibrwjjeovfooyd35n1oqp8q1n71i6xw3vsy5ii7zjv13iinl0wstt647sg8vxprnnmua3dy1mbs9vggyat7ynaymnj45ra7jv6v90zw16epb685nnyf6lsj5rldim9mti67acok0rrvrmdhos1poz1jnbvphocbz5li03dyisxwrisw1gfbxeu7imcec0lz2wgxt9m7pnytu2rehwe6noiqkq5jamqhhm47v2l690wf7ddl1jj3nnwg60kqyi6sz8tx6odzw6zu7wehqkq7u8an8wtr7cz79rgpdsauuk4g1w548vm12nx9j2c51d48w2t3o4ur03oj3xuk7enm9tlvwt9axrjo3ip01y8tgbz81o4v4fc9kpsel5z3sf9kzkpufwj273yzzvgrvyhn2dg93ck8appe3xt9e0q7ntoq6jsigh70kiwv74aktcekxy97n4hl66hb70o8z13elv9l45s4qgio94u6ay5loy88jjtbszksvkp6oisdotu2sw1s2mg0bif7gf6o746m0xbqmvosarce9ayzwc4k0w8b4na7mgqp7xpjhpxp4kkp2k63d4291gpcrso16j3si28ui7ogq12oj43oetjap2csdrhj8ge6ow11bz9comz7msibq59w90ba48mhewxcnflfpphyqo0gcqv5kn4sja7myllx117ylua59du1xrsxto9x7io8lmcdwpsc8qcuv7x84om2gub5yn3vrw66z57d1mid2kwn0vitgv89x6forokxinp3reagtn32dhhddq6fmu49l9v9ubjznt6f9ea9gnltese56iaxi4kyseyekusnl89sn7bk7ayhf4nnqxssp1v0lzijl9z9xumech9k8vi6l9d7mc9ti3uwm65r20kr32ucdo8519vncr9e6jjm6vutpjyg0bduupttncrvq0hwzchu2prvvmy3oukal0crt48ucb377aedslrjnog81szhct170ynjac0fpq34fvmu3ps08moznz11nv6asd0vepv20z6ouijusnocq3pn452xhs5uafa08y50yog4z86wjj7goecy1j1jkvhss0lnpg5jzgzso7l3vd1lt9g4qfpksnu8vl162eikj61v2afiz0l4m5vmi0s6rdpnzxfha16l3xnxkxkvifne8r3nypie73gpyjliuspdaz8li7telgbj27c04vvry2pieo68bo3gfkd3eay86l2cjlc0wysljxm9vkis2haap9jkczmyrma7n85uapk67qyalnmfpg6cwt09b8rgakelzimnan3ao5w1h2isf2j9ur5wp7bpvku58pqzboebkgciuewmj6ibtnfwuigjr0z4c8lxd705xtmxk1wg8cxsv56u88ffyazshaqpkrt9s8nnnrdbr6bxj3nucgf7xojbn4zfz55ufx3o0flwufsl37xgbvla304g80ig6pk8z4c5nun1n13wcq8cxz0hmww6ap2d8fcmbmacq24xyn0pkx0eu8v5of1edwdecazp6wfm5fd64mbobre4a4n6aedix96a2mvfsm6z8fgmcgqx8kml4thkx48iv3xwenxc8t7xp9bvwybbhfanrir8lkrasd2m3fcrn0tsh3ek83mhgyllya8cqljs8odi5p8u28ziwomqq2f2afur2xlzyxmxsl5k0m087truezyrwvy6u6223gnh5rd2ffrytpc6revhzdxt8qa6113ekbhqup1wgg9ac7vb0v8othc2a3r02jz0x16z85snqs1n2pm4h4mnlb9s37it1cwex0q1oyxbd1oncfbv5a98godl8zy7xdpbce8b79tc5ro1guzszqyil0ztnv97xf7jhs3p1d5xxh5y3st96srlb9kq9ytrbys68bk489blatec',
                expiredAccessToken: 3506191620,
                expiredRefreshToken: 9198120090,
                isActive: true,
                
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
                id: 'ta3p1goppmqado7ex4o5cuadlh5rkk4lvo9su',
                grantType: 'AUTHORIZATION_CODE',
                name: 'qtw9tygj7f39dn7qqc8bmfmncrqm2ui4jkw9hcz5033jas0bi1htshw8anll4phpk7tbbajr7nm77nsenl6nmlse6bahs1bd392hawjxh0nl3jajq7txijme4x5jpa0xn5lbmd21yhvf73gga5qev9ecfs8avvtfhk1m5en5687xo2e10hrycqkbsv3ceaeudgq3kvin7b26n7d6ja7sg32f060us6hkgrtmfs43lrms09ed4g6omm7phlklq81',
                secret: 'm7nf8269cfc7dnwdp6krv69k5bie4063tnrjo42maoupbn3b08g9gyxnb6ekygedw1577mwyu4vzefdtkfzra7zi4h',
                authUrl: 'mvoh5oromokporxamws1bsnfjwgsd92wr1dx2iabwpbjjgj2kbuap69kbh1a2z5tpciwpvx4a8hableruveunk8vrla6j2ao7846pjrllszzlios3r3bobvb08n65w74q4ng270df8jee3f74ebuww33x958d67okyd0h4ph7se3eoz361kh9mgn0d0pa2ygwpix8j5utrv1p81ryio3985gp8pkw4fdhng30v2hn561yheemtyvn4pri439qcnhb9gcre80em6ohuxw57aryj2ddbpsqoeezjfo74ejw3syx6rj6j5ug745ma1ee10q2k56smf9ngkd3n9peq3hhs9uh6e6hngy0a92e1liwgnwtmo98zt88sf85obhieydpoesjr3olrsjl5ux19x3mmz67tivzx7oe43yrri0nqx9w3wj74ddlesxlc48jiya5i8bez04pqcf57qm2vxf618h5dn7g8vl296ytvllbinqkwazxsnspytd4av9rthl285sda5jhx19gzaasdiugneq8wg92up15h4d3wizzb6v7se2y5b1laep1e8xhaclyqq40sc7dxw0743t0rbpj3ngdt7imw5mfw3tn696wtwq9rdkkhqprp02ekrwz6zz1jx2i6njvwoe8smdog3sew77jdbpharuconvhhcow6kpjhbk19mcd6tfcj01fzkjoip3hvs3khtmuu38j8h8dpq1yzmaksloxm97cff9c27psccccauanw1rgwy23gx0p0va1846kwovmocaandju44d24gd727hn5tfqvxretgk95k08k9zcgs62y4lr5uuy6rcknzbjrcc7uapi374u1h68l4cb5hh3irgc8hkv2cv5zdqtcbs7mu5mwqlfa8mrzywda15tc8pv3tej4uemte542aby1sqf2nef66cph9gccb0gak56qq9cam6o87a1cruh00mennaqg7uvn30t4vnn8i8i5simetd24sb78qo5bjq1wjd6ca6mcoc9yd2ehsbio1mes939u2jl0h0pwsqxgieagaqn77trx5yxfiekiy5ceht00fj907wtmebjo7ridicgzr3ynuc3n3filgbl5x71pp8llwk79x9md0wvlug2m1g0u1kz2neffbfl9v0cp8sv7txd12i9jdb1yiealug78z6hngd9ekyjoq5qjw6ostaor9ncyv1d937bpfgw9zeq2fb5cvo8b1p8p36179h69rqfajy0ykar1ez660nxcy21coehqlj8af4df8r3wuadku3mgszmt4o50e90y4cqm66yosqsma4ltxjrhgeglk1b36k0h3rtgncc1hk726l48sly7cf5kh5do2bouqeq8sryml6oc5adx859pl0kg9x5q1jxwm4wfsllgmylaokfq8icx7rey0bw916zq1xvkp4b2ot14g8plax56p3d8l1jvjb0j2hprzejztz01n2lu5xmsuvrlu2oxl3g2ih4fozz0ywd53v71rns51mi2m9lnhlv8vr734lnksv71mq4ozdcr8ys47lriac3hiv7wzl76088ekawg2kwxa7emzws4nux2ytwqulg3hl1zfk57jgg8rtwg2bqad1bn40eii3bsu0ieyyvcd3mdnh03841aogxhhbl6x4uby2cht2cgtzieaj3pzz8g0i0je9pi42i72c2h4i64npfgh2cf05hvaepmyxrvmpslrz67oqe6p0e2niywxcrcc63laxgkop3rx4yi1dzqk9wddm7edyr1lc8nboz7qchtsatqe30sobj09i1gwzvv6naedbcfpzzk23sd9n51tgf1aqj579mh7ti85idc8lrqicdaog20jo9601693sqaud4c33ysdufwy39xjkkelzkgczuso303cej8dbucnam22yih7019sbykmg4b25rnge89qfgrvszzqndqyu9g3tm2wj5za65u17c1xb4wlrw3x5myt4c4cqz9gksy08y8w91g3xpurmdfxq9oaeyix98kfcyfpxojsghzbtrwoo',
                redirect: 'xay3jw4evgc1xjttbgytf6lu7b07isgmvneywvu6sa7szc4infvqfeuyqt8bkjk2txv66n3wyl6jl1r077mcqstigktcokmazebupcylxbv9b39okpn97jib9x65qm3jp3eca5znk7cc6wwmpdbvuxfjuxrlh57342ps3sdbhsjr5sm6axcxnsrex1g7764t429guf6rsua3zl04y0x4e53y8hifmnj1wd6yr31nszo7wzpxhzhku9yao80ez3cydn333df2gzjgicsp37c31mg2cxolnsjuxmuoe2sve7ho9j4jgsmu7bd055hfbximou9wxjfjetsd9nwk2yyetv86rcdqg7lxdthpmaipz0c891j9ihu0ryooy2u5ntct7p98wxiym1bsmulgag22mbwg6y3qbdxo77l3gpcoio0dgvzots073hwdmgm8jbats34j5qtw0f2268sq8n2qxy1zbs5ql1fmjmwcva7vg4wnzrb4r3xs5aubclfd7122kqaksq2js6x7evbfeaug7v48ufue4gx1nc46ras9usppa56643b4olnai45z6h5lj6cmtyw1vd0dbevsjqjs9menkulxhwc6ppwob8lqfl5r1wwh7uhy5xmsl784y4wlv72gvdoxtsgzgw83q0l99xc5gwen82zvkqedrq4wq8lfgtcp6sh7svvwotduoktiy22vqxze4bszrcdcl15zscau839z1rc0uukb64isqw9la3mbthykn8a1uf6pftz2t8kpqfhpnf8q838qv5165rocblsj4rezc8bettb7fkorf3y4ghrp3juvo63dilzqp80tdrfnwesxaqtan4loge5152w9adgkmw45v2ergmkd1brangj127dnc7isvmxsn8uytsresndf0r2xid2iexjl7iq3yrhw0hqpzeu1o2sglxtr4p8acl4uebxoicosy4btep97yprfuuonif9vbeguxi18we70qs284uz4jmb1p8riarghjhy12v4sfwb1ws0ygy3c74mz34dtb7rls60p4rfu4dlqkjh49x2b09a3fopopujjfc3zx38eicap229phd6fum71puoce9z743ydy4ues5clzfmv0p8ae6d5sucig9dtve4w9mbxrbe838qddwpu7h1edoca65gms6lrta3nlkwmrwakmpnb0nforii7rjd0mrbb58epqsudftrr45czlmowra324tjclke69fe451mpatzdfb1bpfhypgapneqbepttbibdg4vbo9mvime518fsj6bi568bc164y1sfvgcb7teib3lp36o4za42eyijltlecxd5ikiavwo8ppmlauttf5ntdqviht7v4g8wu5jtoiu84kzuupioc8jnnkam8qdffu9nxt0h6qaymt13pr2i48qr8qr139fm5yrj60emts04m0cl8it5ejwjxqilbctfxfhs5q6r787h37w938e3nidnz794dpm2ad2sd4xq4c50ss9fyx20r0d2u5ep2dosku1d3uwjbf7we6j1ecviejsr4bt6cec1rgfke9hkenjp0aa6q9n1d8yhwamdm0m93cuke68igw0gk220nzg51p1tx99f4j60xrtkkvf7kebflbd4iyabarwvy77qfqy7dd9h67nskh8k3onk6cmz9uodseum1lwgylkgbbtptar3nehowrj5vbepqca1oaw5eltiffw1c65hjjeqz1wedezqo52jghqq917hcmb3pv0gexx0xsgdxy8vsctpqt08lnq14bx3o4f9h87gkyonhrjgwz8bm15ks3t4ltp96e2ixa4ury5ddvtm2own1rl9ba8fumqsxwk8a2tqr2gb7rrbsjous7u6cjzzibdxe35seyo6qha1do5u9900pjm8sj4z40e2a9hkhgtlqcrm58wxtvpw404rjc4zzqgc964rrrvob5vb1bv82cj4xaejutj2401g4pahigbj6gwjhl1e8oc4nyfwoes0kesvzdo2kcw0yz3z31v74470krjy0ujbs0y2',
                expiredAccessToken: 2717797009,
                expiredRefreshToken: 1220306437,
                isActive: true,
                isMaster: false,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'PASSWORD',
                name: 'd97v8l18qo16hzjeuubu6rubqskcd6h2k5nimtlh13ji8xxqg2aibnq2nspwrqe0k29i4fq6gzgmyqvmssfl4l8c46h9vtfjmd2dscnbmsucyd99dzp0hdrcfkqtb0mdwm26al21yxyicdak50j9tuv8br0mhhyel3cx7v4d5hdv25wjstqk6bz3ob1jsxntupf4dll8huzcnvxp7hwbhoyjafu0n60wl59h676kbyjlsmn43zluq594w8oy63zt',
                secret: 'n630xmlabks1ipt5mpfzslv248tjyl2am4mp2s2n21mu91p3m0wq32bohwm8ksrnqv4vh3mqm7cpxk2yhpc0q4vrbv',
                authUrl: 'xpsc2lxr7d1w7zof1rabc3fj666qwzdskxc3b3ru8bawaf5exdcndpak4mdwzabmtqio49flrrs7tso6g4jete491b3gzqrv2kosceic1i5djdruhp0vx30k0n3amn6fr4jlqm07dv0pok0jlrhuwztqptj65bzwupj130tlw7hqvsrwzvucyjptrtbg6y0dgwb9zqjxysp6yob64p4pe1w3cesql2exxoijepn3slxu3x4vfyeug2mha0icmjmhen95pfufbz5uswqz4svz7hywuq4fta66qq8yqihnnw4t1n2lfw50pq23i2uo4n02zemjc50ax326i911v0529obiton175twkkwueevr4frd4bqfzkss1z4lpasvxgmyimks4p5dgvkh9yxsfun4dreiu0aqjhc3mn28fyecgnywocbzlpw82c2e3bppkclltaccmqy501dywrse0ptjrqgatcae55tm64572phl1jjmzsh1ywq7mjfah90ku61m06op86lrdfkbf43pnufj613vfkshxf0jzbvk4smf5mkj8nh3ykkqdwy20jhe4fsevio9tp59ijurumpjhgyd4q9xincjxmh0nyybtdhvbvqo3w7smnv9q8e2tsqafdw19goggfspps7szej1jw3g0sbif8w9ijtl7mi0d7f8f2gx9r5c8mdbdxt18u0eslridix7zbxekr3gekqofqy3u4t4opbc16q1yxt8l3qokdmhu1c80vrgqbqmyxpsylxpo3ch0eueinwho93wbqlshuqcz58olmxfzdwq6jl7hlzugj14495bjruh28exa0gqh879p0abutfb7etur4ej83642o8frtx6ifh1gctmnefrhfsrasmoewnlrk80el43jqtgdoiallu9gnk4lz3puhebk2of6otxgh1z52xm2lxn3cy7qwrivenddjusmgaex20lydl0vijl3s2we2lot4eram1wd5yfweb8w9rmjtrz42cri6hdchmzus1tast8pjfnxsjwuzu3tgzhs6r31zey2pjen5neubhzj9dibhtmp2bcks7rvkuwtbb7d6h57dym87t9cgqpi40pvyrkxt5ec1x0oxl7fzyvxvad21gq4unv1k9q3smb0rhi8wmaao5gk6ksvxu1c2ktb6digipkpa65r18l7y99k07b2uur6i98nryldyx77mceetbagzyflxv46ug7jofp666yfi6q4di5if9qi12lfox18cdnx2ea26zfua4g6jrgjb8cxnzmfg1d1qprtzjbjx1pst2l9mxr9agacfgh3pbfpux4lckyfmn1ppjym8xkjpk9glf92of3359q2zcz262p5jt4so6c3k96t0252jwjwyx07o2nj21oras86pwxn8wkx47r7y2db56tdd92ulq85o1pzzqb7drwifckk11am8uu7o0hmgpcbrbxr3r9i19r1mi95edal4k63e2nbse7frsy64fck5oum5ij5zlvfa1dyqhqa0hoz1wz5hnhcc73bqi19cdus6kheoqmlssftwnmo346ebt7j307z7wsegt0cs0d73k8qhvtdrc4qh5opiq9vnyqal3idf1z4key68lz54c5pxvaokvrffhrort3fgd51fti3qqjcoky8lx7rre7ntdkmnvk8yddfae4u56wwzc8xkkmhxby5vsh4isppwq8mjlrr2r4pfxbm22zbvoo344k6pmsfqu262xr0al5ys82el8k3wcv9smawn66u7orphr492us88uqfig4whgdmgux3fic5vvrf03omtgf2sv8ywintb97trcoponlcjxxurnjk5e9evs9jd7bgw8b3p30hb2pntnv9onfaelx8ida8n0iuvvdejxjdcki0gzp5k3izvokvyiwhj30m2icr23mlclzlp853panw92kzmymgmswxc08c4osaaagwjqzaqf01c0ecvzq0jhvna33rfs584d2yrlcn2bk8lyyxiqocfgwn7cdk9f24sasanu1h5lw3b69no1lcekz',
                redirect: 'm1jqvqje8eflkkhrw5zzalby2mbed7pqymp9iy1vacmejqy985bnimlml59ityxex362jazaf40bb9xsxkg4jhv9k3sx7c7v4935fz0lz8ei6a7aobyoz9v6b80xpgkc6qok0r8wbscz2ajnibyaf2wmlls6y894o8dj8p2mk1ne01plgnehrefafrbawpd98pwfofarvzscad5i8n9hikruvxgzvdpkofhp235blv6g7tbga1iynjx4j4y47tqd2knfeyb0ens7u0a6ginwa7sm6lc0q0ryn4fvjidu6x58swtm7hu8riti908kmzvo6svshx6p9lpwu0n8m6llrktj69j5szhv25i3wp9twgzz3zjd2r2dj0oppipufsk17jkcjxofksnitssznz8gkq6h3bxmdz91kbvsnrc1oag8um6rjdpfqcqin82wlymrnc0r8ycmwnsscas2ev8jxk03derliisrh5aq2rkm3ncx771ljz8gp9r5efhby3cotwvmwczgl5eq4qtlay34y0dm7seg8dj6o88hkso8leaftylqmcfowsytw7574cvvj4xy563n9eeb5eqt4rff3hd818bgidd70huwuynk2byqdrt02aus3vvd586i7lc63b4ll95i42ntuyvk9l4uw9o89ca1zn7ifcyahpmfqjzthe60ghhxmb2ltg2xkk0f3knykqlxtcys2y0m9ysggo35yhevps132nvmbvvoyaqv23qsp41ggwz8pwps29027r9dma460btqneiwcrckophf5ekhsjh5dyutv0kyis3ltyg2jys3nmhq0j8iau471cgtxy0infeycl7s2lrtuznu6ky3m2onvstifzzlbhntq1u4htgkqmqsu0fdtkaq98akwpy154py4ghvsjelrtzuv4unv8xu0310fwnzdhd14fsxkgd04v1vkiv3wfio1hlgoigho45neob15xjzft3vnpr8xx1sjsw2666n53n3y5dyw1fdmvmrr1cgedkxiozl3f5n9ej43njfreuccgtle9c3sgx63vwqx8ahwuvi9lrkcxtj7x1fr07eyvc9tjqnp0yjdrptclyz2qy66ubaifxo9rybwqp8pqg71k9wkdsy9ytpkdvhyiq1e18xszr4fons8umuq5hzh4v6qcyg5nuyo1t5hahm4gseajueqqqclj5v437u0bjk5q4p7mlvcf2zhlmcx3v2swm4utdyvq0gp7b5c23as5v3siq2z4u84b0p225ncxnejdc22qvnloc6h4qsscyf9cpyxgry4eyfnsn39vgx70i42ry52lgvvojzeyxixpb7onr9c6lllkjy6qladbxhs373mejit21cfia3dr9zdnpcxmlq6p11x2u2401110g9dtea486kos9t1ssqxzoi4xgvuf99c55tyg0sea7u1asq3t4h90fhpd9uwrss97vt3t6fgwgtup9nzr0ndknrwkmmpcp3di9c8e0qd910946dmunjm3csezhvc0rcne3xg9q3y9p6b7skn2h126breqlcxbka7goko575t9js9nhoieq4w08rpkhtpgltkiy949ejgsjwtym7w3i0j1chhdm1ye04fz92iucyrmcqen497krmlrwdi8iybvo9khmnxpdvorjzfphto2g3f3au7rzlcubitk7vw1tii8f9vpzv96wz0zfex74cfd83gqw8rnqz89199gxfffxjv9sfsi3xxznnmq5pnvkbsyk4jcmloo13226mvzjqz3fyvvk89fl7q8jdox7jcsebu5dakqkwtrc6lmua54au9fv79doo9g3mr2jzsascn05ghbqf1s1qpofzb2u5hw4dc6okxms8w3egcaje5c8wddjhhkq07kp2nf0z8sx2wamwboufpt0zan2x9gspte42c91axszkez6gmt0g2a7udl3n2ivkcsvljgl5o0hwcn5zbgg633l9enwlkkthn3d18gfmll6jooye932pqg0oy9371xmam9r36cb2i1l0s22w4r1qgtnv',
                expiredAccessToken: 3329314332,
                expiredRefreshToken: 4094684713,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'wjh5qdpoiet0uwyikhuaseozf8ew0mhk3x5et2o6wnwq0imz0i0qen4p81vd8ss2c565oinuyd4qfmkqcta26uxgmgt9ldfhmi3kix5dzmlvk35nv01h5631dwn421qfrph9ahhs4ytr8hxuvk8rexmo50lltcdq5q0do5f7hjhmp7atgcytnawz4q0o4el979xvbofpbhxknsg35zjo0apjjlkugftqm2hb69797kkvpr96lv3b1miqb5yy1u9',
                secret: 'gk1gmbvg6vd4tv16d518ed8z45rgj392j3oobptzvkfs7qu3u0vda2lu0q3c6h4xzxqrxk9thy31puqn9ey8e4ne73v',
                authUrl: 'mwfnlwiq2une0qwwv0ppnm8v5pmxdjzkxbkqco1kslrzd0pzkc3m6hetz6ggade8z8drymv4ilkzyu1hptszuy2sq8bvtqtjoo5rxoezw3u8lyvxikxrap28bvkpe7hfnt7wl3rwti0jkruubxmzry2oxf3w38y8ba1rdsi2sq7bj5b8e93k1axfmre5xifv6k8k83a3f9glqx09sy1qpkuiltzh61rqlukif4no86pwtb5oh1r84864kbx4n1p9chcl31qm06qjnhyuefnlhghiqytfb6csno82w2dpdstj686nfb7k9rgxopaeik2totktr4x1v1azk7058z5okkiggbjsn4asgakhoh7gyhbn332xe5zg5naznmo3gz3rx1kb51ntjc0fz9jio9kstrc1lfl914gqw35gcq17wj1i2ksfgoyrm6yot2hdrn1elt34bom3zuqj4c5cs1738ut5tfyomwjfj8jacxo7cnryrvpwpptnk28p38firfuuipirs97gaehmjpusfd94k38n4kaud0oi6z4gj9rdwhzmj2ksaplp53g4efxq8rauiuxzvjjx3ox0rx58o5e77rwtkkdsbni3z0stdlkdu4mwhghvtx31ningz1uj28k4vt8cgxqpnurm33yxwrvuceietqrgilgg39c7d10arhsr0nb5p3d56j7vpm3k9ggrilm6btpirtzszrlvj4m6pp0pdnl4561c82m2ulfmoa3uhnuiphh9lauvi2e1umbswr6bv53dek2g86821pjrbhg60cu54tx1g3cz40h1apm3hore9maxhsozxt4yejir9xmx2mnvakowy6l4n74gbygqbqfka7hykfdw526ok4g1z9isd9armyn3unzxa0g093hya8fl4sadog9daj0twgh73fnj3uwjxpnunrg848vjuxny3kgaonzsstc7m1d9hvs5k6yha3ytjoh8ysy8tr9u37wsaqh8dk0xf43bndvxx9z2hybnm8597bahrpwsdppxghoqfzolasimexe7e3xkpcnxz5d72shbzd9oils91tmq4735tf4ch73mfegsmzsjwptd5hy3op6x6tvx5e9xmnty3ldtw61zzl0qtflx7erxg5p8i7voi1i1ug27y66ixthzh3feojfmx6iacqjbem8rg96fo3ybj6w4m6sruq90h9nybxqkfh4ff58yro64xzy528nwtbkbc8oqu9miq2jnmk8o7bo9zdr60hwirg38j9efrdrprnvsji9464mm8tc7l22tj58duws8lknu8vv7zenp1dk5wa59nq2msrc5zvstmzh7s74q0sk4uvq4xl94yq9po4pizg1yx2my78lderf2v6iwlpholp84e4xmbbhoclekspownmjdugd1audepkdecrzv7pu5b6q8covdt6tc5cll746nc3j0865osk2tzirejnahk5gzmuo0emriwwzeep8cg7454fngr9d7uqmwz3dmiq530axalj5ue7u5zycxui8xcugxsunkwdswl04erewwlntgafau0c5wawycfycryf3e9vkfxuknfykvt71cyph7ztwawk65m5axlzckqis1gaqskvliaabi5t462cnioro5o5rw1pk61vb3ba58jw31rrjg9uul173eqouw6g65cgex04ruszkanm28s6j6wrhfdbzexongyr5vyruebtjv0d2zkmisnojci0xo9rm21ndvxw52dcqlcwhsf4824nmoesontdo2lxo26kdugmitzopngetwzsbe5r4b3jnlmm3cx0zcw042vn7luu2b6jqbnyaqy5avnilpklodpg7xktwqhd429floa950fa453ytwf9oolriy0hydku6pxufy0xjz50ha01ppl46l6xnot83tt0t9ducsqrx7ez7g8b1qadmspaeus4ij7cvwfc0zbmbhhj7arz10qj1rdvkx61h3dfa9o3ld7k2n0brraej7zcnlnqnja9n078h7ydpxz57365b6t1jrh8pbztzp4w7q',
                redirect: 'cbl48k41g870xw678cp1et6wzsmj2em0056apxm2oiirvc060ggwvo089trq5jjn3sa00cvxfkdevqhekfa9dg6y0l7gean4ppud9s97frwvgdhfyjwmh6uqk493wj4vg7m11lppr68pphpidi4aopkf1prjlkh4zfwvbkkcd6q5f3qns1gt3v9mccfaushr552v1fng131m4qo8l3wnql7qtzk1m6fwqowc24u4j9v2ycs7ia2i4k257665bczygr4bqq3ur25zsxvuj01ermmjkd9jabt71rmkueyvhx877w8ocx0lzwoxqn6rsn1hac2clgkzndtgu9k3hgpo0xr62ix69l43rivwtv2k1nnd7ohhod33x5o3hq8irdnm98h1896lety73xmjt60pp78amiwyp1tk9mtr7yj96qfvknwtgytyrx26yk5bvtuvzib5z8dimcyqownjbo1u36f0ih4cr6gihrxleftrwmugbvhzvtv5fj5y1ql5pbp8iz2ng7tvu3ykh4psqwe19eaprhc93rli9vka6oiogalixl0r662w6fym59do84dx6mj34fazlaj79xhm8b8fl6sin45hcbu3zqrhp0bg2xtzvfwd73c8yiales49fiyex4s5racvhz4wjczjxa3qu3g6b882fyhwdkk6n0vo7q3skbc5xzql1qiuon1xw5yxpanvhg0uv5n76lkkbpaf50huitq4mni9aj2hr44w3dzf9ve9nuzsa8dvzmmkgdp6soskzwpspyrgxg4znubyhymumfb4lbnceo8vq26jvvqulphcllxfkc229negvzirjgclarzhbe0qcpl8wmgyek48o4pjo2y50cc1lbddqqbzwbjjkk1nnktig8qc9s0fnulwcncbtitemtgmk118pc9xlhonrxpyicjxeiybon1fwjiikcg5kclitlrd24jlxdjkh0ghl1fnia3d9i92gmnoskqm2ypuwwln04r3g9buo8szi7mn0f3igss05bh9ejpas2q5r1avbt4hnmbxwkbkrk3lab1tsdzlqpoalhbep3j4gj9dbarejormmu6tbw0kl8x2zhh0hmslf151jw8to4q9g737ijwhqfde00trdurw9nca7pj8bcowxrf0eq2113p4o620z9neqi9nuz0xv3z30g27xfqf4w966f2no9hvgq6fcs6uz474b7tm5nrbbozau1hrcfy1xiv9dg5tity050ao4p3t36tqi18tc2m93ct2lubjty0sjeq24bgyjs4v1nj96l2cjnzihkfnh1i3xj8j0ok7ri8gvgcg749tva4divycl1gbf88lro1s5m8psxuh2w3ab1gzug1xir7u42ep838kab9q6k0zil7qjqjq3vilpfyhlwxmfipm0a25h6xjl1kowx3mijsp9j6ah7t36dxgv5413xftn2zv1lk3n27epayo26z19b3exgv5urbc83btzanzle98h27y9z7yp626q1nolk5buzjrctvfdwkruqgllmwviwr78q5i19yg0g04v1cc1ruy337v3l02d8kmhnq6ul3o1rnc56hcw40agvyvenwoaupu9d5ytfxzkr4mtvz58b701wtnfjt9r6zck8y8h51pechy0g67nh21pg7ibbyhte4yy7oxq2nwrd7i7n74nxncwwzi1z13ubgd4ik4oddjp7oschmkt9x02cf0w0w93zajlvr334ojj685d05izspfgs73kj20d2rsdoudg64fcf3b54ixpw43lw0hw6m79wtun2mnil6lj8uzq6l2iwd93tsattwlmdz4lb8hqikkwye8n2tr9r7n15l4x4dhpk8fnvudpd9rsj7m5kbxp857f2ho0j7xgh9zqs3li2cf8ukesu1bm9jcj8x787tewp6h0dv5zlqs4a5iwct2zp8hf757pcyzssu6o2ceahwrhpl0i2oxfecfrlaj8kqgezovxqnt2vqaqw9njm4h64ytb0n4du5y0izp910vomog0x58632ifkwb0mm5fj42',
                expiredAccessToken: 5015891732,
                expiredRefreshToken: 6178880237,
                isActive: true,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'CLIENT_CREDENTIALS',
                name: '5faekhtz0xdiduvwt475fx10kl6cbyvph5fenphm5v1ckyapauqb7s3a4c4hazxyv5sbiy5etx1nr9wm10ty3zpcjiz7qm0hnmkxbvrzot64xgxsiqey2e0nf1j76fwwo76rjo7b8624bkz10aqrleok9swtdxub4r4pkb3osx0phmfm6ghvcmz395r8smlpqanjcjllygvl1k3hzowy0tu0j4ynfnvqixijf8yxp35py4xdtodfgilhf6xl55k',
                secret: 'ux0g6nppm82rfftq7l58mpjokbf9kdnv8hziwxgmazv100wjfzsz0ulnyf4iox7z3dzwoh3e375pdt2t1eoj2p0cmk',
                authUrl: '874h9neggs0gs22ccysh636i8xftfkc7pggmtbb18vglltl81of5846b0r09w21uzggcf2yrdcombphhbo88f7wb5b3fqswno1s1iyo85ok1zwjeuhanspnme4f0rmr98k31x3j5pnjlxr3yfxzjdvniniuw5l828enq6cy5at3b7p1j0rs13g1j03eiqktn6bll3pganuip6lpsi0v98q9gbh7dtxnp6yw16gtdew1bsx4bf0a65safka1d89wtuvjd2ax07z6kji4prkf3dd898kg17aqhposodo1zye0b4tmlehifl6mh6b1odo87qvxzqgiilfclz9uhbimw6g2sbqurukf1ttrfmj9soxiua4q0g781gpimdw71byvhdv9nf0jt8t942qiqn9ntqber8clwuayf57sx7b47i1kp0ksy094pzb2nbftjh08a0acsl3vkminp4t9fajuq05zi9xxsv57tve4t0p1xslnis9ral1sglcw57k0w1n77a00599zmkxql5nlcg9fg6mmuhhqlqyyxct7j26brw70ibgxr02qmvwoko2m4soxkwiq8wn9u27nlzcvoullvltbof9npe6cbrca6f9oocgmd0qe44e5ww2c2rcdmwo6d6c6pdtv0ssjft766twxcv9nqzolkmprbdsoftz8fl69izx6a6dggz2p1is2qq9vfsdfjsc3wzt50jkaa8l2w7mwn22bn8tfeqqhazbye9icro46zbswk5szfxbiot24f4l42owiebfuszr8ppumx77yt49yurw3xaexd7kaw5w4bjs5z6ko753drqqpvuazscs8i769lussqx53bnh9atv0u6red065vb2j8emxjmopralebdhgyxw4q13yuzmcqg05ltd95mdnjwvx1vd5cm9408prlbj6be3p1464gr51ksfzits48w4278z4l9pdanpzle47cfgrny5icw3ehecx5fwphsvmfa5xr5pzdvnlmovegkp0po805ohbf0ei4axymj6uchmtf39xmnfycb6xpb4h75rh4xxtud0bltxdj88f1zwyhy5stwva7csnf61oj7nurr690fsq1qp24428jtg7yz89eitwei2kz9lyxpw67d1n8ltdj82mm46fekytl3zvy8bl9rhahqd3zyfvs2x7g23ymsbfsv2xnfralam61ot7xtzcswy8cs7vywwb3cijqs27baidv9o1lljlmbs8x7riyqwp7a0yj48sdf0i1aais69kdc34l88bh3jh7uotvwvn5proqonsy3ao9w2j868e6tdlk4zr132hv3l87eit7kmut6jt5yg0kaneu1764iemkfpkm4sz28ik73xpv2ezw98hcqipiot99xq01udckj1goz4swra5dm9ts7w73i5o5vnn94ptrsr1eau56qmcckd7rk31wjd9yannnx6lb6zylybqml0x67kkz721rwsct5tw6wf8urtlah0k57v8v7qso41vzr3k7r4uhel6rnes9b5n06vutsyr851g1sjjczlzyk0p3zzyrp6dokbvl8encziedgkg96vgy4axbpxxae3flkdd3t9k3j6olaj0efc3c1x9m4707kk6kbg2ykpzqjz8vnbase789iqqad9rkvrtf5a3gkw9jk3sk7g0tqfqtv95i3gv3ob1slcr1oxkygno7nfn0qolt65gwcur4ok4jc3royhr77zklu2jbtqxffg1bndwlnabykohotrxzochiacqjekkwj01j0cz58ol9dwysmirweft3hxnlai20i2cyyh4a6i5bo3p53m8z8bch5spsxgxxco4rhsl1drtdfkqo61imi92d3atlodt3kzaoxsf9kl1q4yfb36t4f7iwzkxivtitj18z4fh56eg4c1q1w7vk9ocsigu092pgqwhvjq124lm4cjfs56pifihxvqv5bvcugiyxfzgtjwdnn1coar77qi5og58h9j0t57ozll9tsvogpj1tp64tp3cdviptq99cyds367dkx4da4ihzg',
                redirect: 'bvsduh7dpgbqrefjupu8ow8vhpxkny096mcfqfr9r7u9t3hn9nb5n3dx85ruofyw9p8yd96fx0khi9vxvv9olchu390ercbiialeftij8sn0q4xb8fydyw8rvlqmqty699ogveac10xkgghvusgk8ism5511v0mhs1y4lzwspz343iaqj5iynrsdtf0i3y3g1f3bfx7hlmw3gr1591igfvmsjfwxza71vx8ffgi8ugvvx8c0x18nnbrykm9t0gixjxsawukkdb1o4w6g9e7q3cpv4scbnbmxjlp5su5pjaahy4ttm40f91ic4yytggx3mwdrnm1o00pveskgebhm85gnx1aeahztl6innoan568qyz5v1j5y58txlqlp30kujwbrkbm58gli6vq8jpo24z7vnlumt0tdjipsx018a4t7l93j7tjvswmlojkhjuvossibvy7lqwhnkmhi2be5wul9kpg4zpp589hjvmn2wtj2swom9dj2gzeyvbhn6hf8wfsbbt1egpbk8c3z3bliu1h1y0rmydftt8rdlzedhq9b0vv8cckm4nx71eaust3d0j7sure90tsqope23ikvcmmcgffbxbffdlmaj9zu29196355bb19x39udhipyl7pn4k8tp5hu1bq8bw15stc0vvjx0upom9ygoed7tiyg3tbfb3y3lqu3td4ijg9rrmgh7j5npwlhbmplm4uy73xfwjv4fopf7llebcky0896ou0s47am9t0lhzv1jru9h76fzs3e2akcjpr0uu60ns9yrknpfwt1yu6okcu8hzp6t1oc84rvh0lkk0t8b76xxchp5jzbbpii8sph28vvvoip0d6budfg4ggz5qhaj1t0st170iiqmmulqfq3grv6ywtqugn736b70q9ko3wn7vb3ao2cz6uz2mmw04fnfyh3qhh2lib27boorog8g5isqkglrxrdolu5lmd0xhdptzifnwhsxrm1ryjh02lpg7if6d1kkp7aaxjqpn4vkw9l9axmdg9docvnhljhtls6qewtzs2wqzsnmg3l2q6ls13g3doereugp2us8yac0ja7qxr6ff8bxi7qbslxoq3oq4x3ecsb0q6luz5xnbksm1xgg2v1gsox3f0j08i1q1hn8xkjrabverqvbhmpcos3hx2ts74mf3pp5y316i8vxmunazks4za6n727wic9rr4mzvj02nhcib24fb002ouj6dickzgj1bly47mduzdp35g061hs45kw0jl9nbar5tyb6am1zxiuy7b6eehyeotva2ii02vzuttyk72o44yrnvtahwnv1v8tmmaq1g4rolmqypftdii6zcw706cdvj6gvysm8ttrcpx478anpuce389mhrp3as3stl911dvtu9td96htv2gtx8faldih1rznld5af719h53ml6tcas6mmdfi7gsvk7c3i2q154oy4zx4og0uny6xedot38qbvv4313lfmz30qpzt4or3xd0f9yk9ddwj4t6gm41yq760hr1wnmqqzwvpm8qzpsclru3vim3175efqvchwy1as9bkg7p5g8cz99vkxv5gs3bhp07rjk27th2x247iniz8zfhwmlr2ku0bi2r5lxthwy3feytyer9mkk6bl5bmup8gmilwv440q1olem6pwyst7io8656p8cgw6a73byw1q85bmdpnd9pglrel0qixg4svopkddpkwnx0cf26unhd46zkhze31fcdx1f46cr3opbep0himgvjvq8cgwt3v4fxhuwbs4btrs8vu5ilw1og1clskejkf5cxkkm9ai7kyzrz99nht08dm8ix7t4hxum5v3e16whk8j4zb81mmc2f8jmiv6pyu0pbcdsb0sylbsoq1e2q5xk69mr1b20ohsh1f1vnjcwqtszwt1nq1924cng91zi71o3cflblcmnmn54q5k1v3gui40t3gbt1n6z15shtw7pse4r6ejcb4wrej0f8nulqkoq8k7sgozjz266hbev74p0gh21lxxnjex83a59g45it',
                expiredAccessToken: 5535128414,
                expiredRefreshToken: 2256589536,
                isActive: true,
                isMaster: false,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'lnqp0v6yz8i87so0nm4zxujnm432vy1i0pdw48bqwasw691c26ryonl5gnrikrc30od388lql7dzz31op69nnk5zjq3xk1abl0pqka3j55ucodldvrvmxzpf2ln5a1rc6d60f7hox27g8fpshuzu5deo59cq16k7ndzv8grj3yx3icpoiezy99z98zjq36hzntt14baw06xavg2snnsmgem5yrd8vafm5vr3oalx93cmjqrm2n3nx10df72d2xh',
                secret: '3ha82k2peyfbp3xzrr5g88hff4c9pxjdfjlbt4kf2e6maimitciznb8qihbgf95ssdsxgf9euwj6tanmza3c8v7phu',
                authUrl: 'o2p628htsclpxbjag20pmtt4dvsqjxaelp9mhylp7hnmvqju1irn4byf7ft4wi7vmr88klhttaxucl3tt4pdf84tpqkst71r923ularaxqxhbbdvrtnrwef7hp6mhloas7og52do6q3d1mv18ueho5ny6zcdsnckma641nyquljtn1ho7wqcpzu153yv3l65b266v3u8xf443me76qiv2oapz3u1gz0kvhvx2l6l5qlcpgja7kzpys6v94z4w2vk6la1dwd3rbc3gn3gz8g0fs785dgg135kvf1yt4jl0is609aowobf3e23t70gyhgbvhy7buc8sw8jgb3lj8w3l9j5p6de1k6yzu49jgxf7u95c7b0rfmstfctx2etf7dqklhdqe10fmbzh42vvqkge5u9qzz8xsolr47fp31qumr2pp1ty8ysuhxfgujrlx27l2nvhq3vjq8tjjqpdh1eplkxghuco0y3sj05mzpby5rvjf9z9p9ja3cyfyu852i5x4ildf7kvzfrttiy2bmsi6etxkoxfx79yb0ek2jf2ruzptcrtzgjjvzog6lfkc1opnue5tgikh9pzzyswof580hgubc7qvzpe5uktx51zjhodj5yuhnp89kog8g8cl2p6mhwzesrbkfpvxoxom1j39ecflmry1s7yi62bamxcv9xcx6dvwlqob8iga2xs1dxm7jsh9jmkwvnylsed2dbd65a8nxren7tqu7grpx56haq1ws2hp0dtirm7zu7hwlku21tkvydd0zfr6nqxudo5jldbiqnfg2lsjtsky2q2eq9rxbzwikjd8qzaj6cj05gw4p3gyao9lrgnpz80i56h61urvthlbvpelsi2wwtz9yipo1g72g426ul6cw4n1a8bvhpoy6vssk7au9y030t1kveh8p8h9ljq7acx93kgs3rqy278hoieu07elhlte8sxgl808qn677hz1lxsvkh2g190kocg8yga3y55808tb539f0hfcp3w8f164yn8as4nrogqwqrkrjtwtmgsokn8ukdobp9kmz5lnuhw5xht5eqd9ea04tsasewxccadxo9i5vqfloma9rrwaqvpqnp0o80nh3eep01vx57s1tfqzg5tcd1cr557vaqknltbqz8824evwp9p1grwg9264p78b67hkoihhevl8xjwdkbdpzphaxia0icyhk87mhdonvqhm99p6k4pcs0rtk6ci0l0ymgxog5hod4vhtudhgu38mysrhnntwyjxuiojdce46zra6a5y67ikzxv8ku4ntw1tvydebvd6lcvl78hf29rvwwwg5lwc7r2cjaeyat7t3rbozl9rzc73t0ulu9lnvardsxkuhogfbfipoubxluehyggzetzmkh467yt29ln9hmvq2z04uoxz1p4xcb2jrjo2m7dpnu64jp32v6q3xnjp9t9fjx7u2ct0664r7xjc8ytr8lrew54mggqrzgc8bd5o6ux5y3pwkwmq18d880yjgj21an8r48v6kcznita3e93fxlm9olwhquo268ytfjbbwjfgg4uynykja0xn2qv45ajlchi4a5ormu7tvle3vzbb65innrpqdlhoknlk0i5z2o484cp38028c0ls1j7vonu79m6fjkliwj6mu2vvu5jtge4i8h3b0142ty1lymjevjg6akfk81nog82lwpj9c33jvzlkmblzkl1y0pu4k1ng7rxuywc0cqq30dex2b5l6gc9pxfetn4rzul27faafpeacgfcl2ivgj02p7t37llwlkhhhnwtjt4kyrdm54258b06qefmvbjxpqubszzo2ini4e129c7hapb2h0r2mhlr0q0p7t69mya2fq6s3xe2baolye085c20dafvghfkudaja5215ui3hndw1tfeswv7ymkis3ke45dgvevmxcaujla7dgsf30hk34p22kpys79jiowc1sxh7ega7t0m45t534kw21c91vevlszq6ome3uuud0w8bsmr9z9cx7z5qxeci72bcycebht7546rov',
                redirect: 'k3ubesu0h9caqb36sw5zahltbyy8ikh09h9919mmah48ty0nrg79n1pdjlg9wisvjujkaxvirt0hso9a670p2myp6fem69afh3ro01854wxmx8j97vjufp9ixc25ca5c235x0umjd21zrzzsetm9n3ublybkq7t4eo4j3t5x3z20epzfzv2tj5qedo5gdgq8hvkn50hqiyp6jyvijut7pdsd2brupljf240uvnwtgc6t0nxdqyj3kdr5f71qsrxp1l20l9s3me8lgvl9s39332c4bgb1iwdk17uxd2e4oqpqxm3kzw6b6bz6jig8sog2f90rq6pko83orqg3ehf9lame6x11qievlyo0inwcp9fx4x1bviw5hgmm9ybklw599t7ul1dfvtb1hd3tqmjfpad9poa6i8okstvna8g3hu3qmzffz71tzia2fbg44buj2zlcj3khr0difjd084q9hu6eta9zo6gdrjs8xk2he1ur8z5j3u0z6dmy25xfl1xmxzayecfipjt588k3w1siteinfocp8fnzmk1kp82xbtxulwavfgatelyhoti96jlyuk10ms79ilgs9xysxxhnvlgfo3s1hkoqm2llw41f5kl33hdamxgdamebdkul1sx9ykwcvxoweovxmx5yuladiboy9xmdldw8yl2zmyh37ms2223v9taz7m6p7zom8jz6p43vdiaxklcxxbkr9zjn86vhv8ekmppkmpsmavlfmkix11df4nzpract02ue6272bblz8298j42jwcibzn27fo417a9yb7ut7h3sreykih1tycy5jlvc02lxmpejf81uw6ck12vc1ix675mh3tvrvtowg2ptklgm3oq52m18jjsgna9wb3onjtucy2xn7wi13k0kzfg07ll2xph79ast7wtl01eltnoxi4wwmzju7nokovcftw9a0obtvsictob0bdy0ex4u6769znhd81tnvabljjpkpxpbpl06jvtmhwdfuahokhigkdzfttqpijh4mb7w4x6tp54abvpw6lf0qdm9e5m3w8nizxpxhkb3smf6xp66q30rdf9aeobbq7nq7h8e7e5p317ht8t5rlkksqfl94eja7czo6u537smv3nkp9rewx8311smbzz1c5ucpldn761moj3qed2ydmabckrpgiv52otsi4fkp4x1lhgc5z9mccdlezirgcimsnivie9qihs5s636qcgiqvm6rklzcazlmdewntaywk09cob8tfdthj4a9ty5o6yobtlb8q4qk8pi6lgoog7mqlhzovxx6wmcn8ao5s44ngxvrdupgn2k4yepwcpek4l70nja4s9ft9x5j1j07b6n6vafknck4o66qpfh21qurzz2260xz035dlj2ddssahgry0irw37e88rchn66c85s65nism1fffgurse80uvpbuv0zkx2nujks1hzo0e9n2ob2f1ia1n4qckf7xgbgdbf8o3p9j87i5exyz7p8ah639puxh3695t9ugdzrdyfb90anyoupwwarnq4zun2rlwaxta34u43cuwapis0os9iekd9zj4b4ivsxasx7apunyq6zfdrhtot0ipjkz3paaqvts5f94kt1s6hfxu2dwut7h6kavueyf1gz125c68967m6akowdljj9d841z3sljrvlwar138fn4r3fuo9548pev4hdg5d8087wbbc083ewxrd9vsko4c23ppckvw71bcpfc5cyuxhwhb4nd0dwenbhf6jiv5m54iutnb79mynhunhi5wi1czdlzswtb4tkl4w80wwfam1qxprmsnmd12y3zb537yizwxl7rxa6a6fvu9bq71vtcsyzuz4xjwaun23t2c5dgclc0gih986hh8nur3q1gumefnbzzaouu151pwv3z90xmj3nwdwaf7blfl6h8y32ijc06x8battex9i0vhqi9bdos29x8785921eojn9a3ckwxp463r2t6rac3h0ebkyibg0gdn8lnxsh6fviv5wqnfh2mnkyhx473cl139nzeaz',
                expiredAccessToken: 1972945256,
                expiredRefreshToken: 4776935750,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'u10mudnsrdcuv7htvbtdho2vpgcxvy3jboyv0evuy5oa05n0yqfn9qccrjbskh0f36pb3chblgcmbrh0kzupklvi4lrd3x9toey69fay2sui4gnguqsdbj9659he7g5kg2xi2e80ieaaym3izd0na6148qkfjpcr9t4gtjibh6uskhiu9nf3als7wlfuk1tpmenal8xjpxx7ix9s2swti53jbwlwbygw157ilup6n57g9q8du062xebs80dlddd',
                secret: 'j9y6djo562ujrad1nwd8870pkau94ktskbafh5635refiyff1kz6xk1p7jxhpqxg6tssv98xu55iuujfzips5ux34t',
                authUrl: 'tqj8vaj3fnto4f52bozljqpwsz7vs8zye0jgg4zupiraos6q2b9f4ttm4d92atlepg4x1cg9e1nyeosvfdd102d4phsi2k80hedy5q2e1ml1g8se5a2ky1sq12te8ikxtcok0o3r77xi1ske41r29ovzmz6kxapeav3845pr9fhrh5436l297ml6b35lt40fudcqac4amb1bh12owugujtcjoc55clhf81w4g63adoz0b5556pc9a34xt5acc61i8chasba28dath8mmi12h9t4egmiqakafpk5yrt3uxrqmcrkj685pnhqj8enk9l58njwqvb0lxwn9xxazfg2ynd9jvh688igq7ini9ahnxzgawkz2zp0t5u0ymr4iahaods0yatfo4lc1za1ogog7kzeq40yfurm1ztz3z36d70to79c8ekeqdm5xey6oe34grbmfjxbl42wno38lf0ky70xr0xoezuwiuputtj9ikx9sr1mkgory3pp9ndglqc653bqejpctfuuuch3bbem6p87oylsvn9jq9xzzrkpiz4g2ynw71aqhusw5tlky3q8xt6cy1yymaz9112tkcglrk33sbvc8tc6r6qn81s76oanlm8p4xa9jfiwroprb1afr23hfjra1cztew73ux2wmyhlro613mlti5uku6e3d8xq7lumz44l5r4smlfa8jc44xjsxp6liqm8fwi0bmlnszsm192ywd6wtuoiln7i87s8hxblfz3y4yh9nvpnslpx1kwcg0pacpb815owyc7ynbtvy81qm9i0s4mn005qsyz4wzj4kgdmvif4f68hfyui18f48s2gay4b4uq5sif533uniwn0i9l94d7kc5ov6vwq40nzrzfd0pde8ahs7jq2cnayaukfvo1qvg9mvh9e95l3om4sk9iooe15lmc4f78f7vzqiphobiwf2pbu040k48lk3v4sg1er2hlmggvkn1pv55ndshp4tpnwy0q6muuk996eod57xdl9vyj951xt3q3a6a5fvz3tvgkweqcwcfbxr4k9cc23pc0mczim4fb9o7um0uca0btjplf5ulz0gcn1svt13mzhoq0racf7mwgphhlgagd12rdbwt58htkm5fxtvvn4pe15r0km9ru7w80r6m223xyxhr7xns41h8zu21gh2vu70fd6zp53el36fxwid4uyt77umhqswlr4dvw6ad59cjr2c4iqsgcxklmuopfhgqvnerqtp6emqndn71le4k8nurqlt04f1wiahav6c483hfxg58yivryle90uu50j9my14g4xulu1gu59z5mv1r07zkdf167c47ls1qbgeja7jt40j9hlo9dao9ctacls8pbfuvzv7zw3jettf4ij5n54u7s0wj6g3eq22nzb0xp3b97zcdtwyo1gu6gog0k69eby8y7pzzcvk0ohzdc7ft3482a9ci6th0ywnxj46najdeuxlr9l1rxl7we0atsm2lt4wpsb7ttxybpuz71s73t3ndkvficoz82i2y5wlaygpifbq9nirdsqxeg4klrvwvrsklobknkznmasud29bce9kdzujv6xw089a4kqcpkfa18uqr52ff56icu80pfkidowtkl0p1yxy2ezuak5nat9080j2ehc38o0hyfdszvq15nmhhav440nz3dojhqhuuf02rosfn6fnfmevgpq7lisftvqldaxa00y5aefzvxisbb9xoiclxpt1zccjvvxrc8oblfp37fi7nktf6i0mk72h3v5ece35ccy3cfd8xamzuzrenql133gvuhdytz0cddak3h3p0hzl0df5qkaya75thqf5j8up8wmkvckzrpy82561f1toykta7b6jvss2gswvbgl6gaz7p1mupiajfcr85k0sfjjmxyccwlxcq3i696hlqv69mbzu01hiema7ye1dblhb4j1rhxp2gvuuur95fsbnefirq7qydr6tv9go02uec5f232j4hzzq81rb2qjf9l8tvlzt034n5q5qtcz4jolm49ugy2xo',
                redirect: 'nv0xs9w7k2zchwl89nkdgxug2ejgvq93uy0psk9ii6x2udjqwyykrratxt5k2oc6usnghslq2y1opu2nn7glx8druutzu140ucxnfgm2xj7g4c318nnu644bvaucsh4zzvjjftz61l02bm8v7aifyje7bte43kpcw8i7xxoa8id6mfpkfe9f5f9x61ecgt10sbd751c6h9k8cl3ycvorljr8bnc22urqp4zhtpi57kzcqt1l90rke6jrlm4qxf9brbwpz1plg8q1i5884ngod3yps694xonyxxevbs5fz34kabwrr24shc3ppnugd19i8tjgr9lcqdhfth7psg3q3fgbhcp721rioslxbdxa9p20nrh2opa54vm6qx8c6g740j3lguxlucvqnj8q9e19ubdkv1bmjrbsbz9ujqatrtk96ty3xf8uhixs51da685wdfx80dx1qp9qn02ehlwqu45o5u26m3m1tziq7lbl8xe18wg5lxviqz3e35dywv9dlkiycjduga0rnzqqmqopal9dp00i72uakbe8vybsicwkrn5unciky6laydjp4txswr2941zbzjkjbo04l7ftv6gezn234tnigmamts86oa070vpzhybe92kwkh0dby135ocxen3g2o9i3fckkvcmgdcsizt18kbqwwyj1mprms2x6zcuvaie40y5meoy3qa5nxisy2yx2lxgkupee1uee4ev7b62bq7d8aova8ji97kgmqhqmg3bjcbw58vgjklz0ctejhutel4zi0miqahdr6z9hkvziyldq47g3vzf0ok86s9e9opdl6ynqkhf8duc4u449lj60lra9wh0iek2ey3ysg1gsdtoj5bgjfhp6mlqnwjpw8sru8f8w3rxyaiy2iu61p9pzxawdlx4oubufoe5ypaz0f1nkshp45ka8h9w6uyophan7uztmcu0imnxw9mdb3j9bv8ukxvrt19s9o6h88a57jyrnsopyqvunbbcxu0rivpynw6nuamfsfdk11b3zd379bxsfmqqwjvg6p4r1m4mrmsalhbnqihskeg93nb2gw9q2d58wy028u3njnr68us077mwb8xubdzyu8k10cypcnxxeme8r8kxncj452qw5nl9scy39g8vfo0nwnb5492bu2lrwq9md6kwmhdc883i9ljps3ullgtnn1is7ou46hqvcgjm8szfxquc42jn46r5edyf1hi5mjirb1rfxk489su61qxuaqogqwuzm231q2htny62jtry6ukr387hv1vapgrhe3l0m6zn1oh6b6hgstmud0rcsqfmmst7jehbd8c33p3p4g46hazawiwxhu6sfy86ya0su2iknqi60a5pnd2e53xda46kfy2scktijcnrosm3qb44rfmkuzsq50jmxwyhknpphr7txhvqu8jvzhc4uswer464r88av4515j1jeky6g9kaqbe7p0rrlxbo9vcvprndarsq7znpu6glfyy5bv29bic7sb3m21tll0oiahwlw9nhy193re3x7t9wmay3tzd09omhy19j4f4nfqw7f3o9rc3l3sh4bzff84wrazt096tvc0xu8n6subhfp2fpnelsb9168yaalvvswdanpoe269ernlbs3rck1xpefdbxgba3ngbtdedc0k461tg2zpoq2a1r4sqrzskbuyv1jz3fy19cmr9niy0m9jo0hl1g2ia7t0spzmrtkh492rukj11496bxyxt8ddyuggtaxot7ox7b5nxvrm1zeb36w3kww0ayfdofoc96gbgxsk6p6sg3ntgkmq5lk7mtkkyd5q7ze0qn8f3ipqvm9hca6x7m3nvhfebdd8ha3l8np42nysy8a2rh7hmjbdhfqkrtfyltmza0b1aulqn61h1qmiwsyte3sn06ccyq70qt7ca8n20wgt2n1rdvq3hfmfnfe8js7lsjwimiu0ch04xpu3dq96tcd1eccfdtz0p6ddvzcd5kgtro9w8ufw4biqwbhf3t9hfqy4i6syzf6y4eyn823wiuunhd',
                expiredAccessToken: 75286424657,
                expiredRefreshToken: 9685017126,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'btt693b25looq7713m3sou5udywypqkao3u8u0e29z7nubyyqvl3eai0myvhmh6ntjiadt2rt0y1l9vwze5230jtq9fwqe0wuhum9grefp6b94m0qii8og0qtu6oxk62zhl2um0k4cn43iywq2a72dj84vx1fr5g4ymec5t5257pkrgnvtoyb16e5pw2nf7cny7lmqsirj6zrgh9qjnj4cwd6g63dhop1kxos84ufesqexnthqyzmr2d40dbfvp',
                secret: 'zgky2wd0t99jbf5rsjzna8utc6jjxqzm57cw8dgwo95ic4949ixbso7edsqggafq0beqy3qxnxmdepg2kuu5i1jsxy',
                authUrl: 'xx9gjls64ee1t148nqcmv2go1646vpwcucfz6jkgtn63gteg254nxkrzf5fb8lhmiho5d0ckek12pf3fabqyk1opwynvvk6l1id58kphil7mgk6stnjcua4kvrvx0r07d60se0c97yjygmdjqopzddmvr2s8c6regdxzfhiexm63glrewim77od4xyyxr3krlrpf1uzwgi24xglg1ecgat1jbqjiia18h2ol91dlypo9in3ikzi3dqanvplr7apvlv3tnp1bxnmeivsvrcpx0tzusd4srhjzdfi9p6jhflj9oi31nn5t98d3qytw4e8jojio6s2cza8ziq2i8wvv6uomvkzckht4e09vjerx9h4vwu2lnkiilwpzoq4ow7v3njbnra1oa5w0vz7kglwk143jx0yuc1vn0hwkvfq80w04ajr3assi4ohp1fyfl7hz9wgd8pz0jx6q8y0cxwibttq4ot3j0vzufyckf6fg1eu94yx70lpz1yycjvwhpwor4hg70zlx9s73gw2kuvhyfckgfsatgrvaq6brcx6cwb58pnocavz1ahcs64orea01y3i3y06pmt2ijr6jry0lh5av7x3mslq47pgmxj9i72ckngr44vckdy0fzg1mjxr8w54fk3778efonq96l5t80fxbq5hx9cs7o57yjmn62mvzurw6lpxrm5tvm0z52905h9vzrnuipvmq84i1etgc9g2bbose739ippdmbwx43qqfsuvbod5s3g592ffv7gd9klppwip62fkbhm9cileq2zbvupicdxvlx8lo2x6xtbaxhgvx3slg0w0vvcel4hiokj5yofxaaf5bo6erc62p4ldbxu87unmy6a9b14joyihlkdjclgk3qmeb82qbbwadoz4m5ati6jtumzd9ull1p1vmpnnoduoz0eiiiwbux634ek8nvgs5p030o6u9s787qbtuc23zxs4tk92m9p72tn3h1jfjfl22pnu038t9e2kjeu6rwx1esujxxg4oxgbplbah9phyxxp5x8th02b0480aoug67ieviz234q0li2jvogec4q6fghbgptyz99piuw0h72tmgxp5cwme06ha82x74omt017lb6qi7uhm82m3a3vqijoge239ri4uzsbmcd3b459oe68m0vktrjef4qmjigunrkr09lzt6r6honj702w6ws4xi5yckxxjhu7o1hx7s87zerg1mb86mhcn005lfctkfzdqjis4woksxehee8bd8eu97b8gudo81kvkpgrldhgfkvdx5lpk1n7yuh9v4evff63pdk77apsrd0h6gi6y73b7ojd1mx1vygxmejwc5lb1e48kf4mitu89426obrdadv6dcc3lls48os7jrc2wum05sir793m8n12w3npgcwe3dg9tng0ld3498t876g1knmq8dplyq3vfhp1xomifxh854slnymqfh69xuya2m5j3g74neggqwneue95l7jvpwq6kxsuvqplhepjkoq2n3h0imq0q57xf1znrlq8dulgqr89fxzlvtdazelm53546rmc5dvri47fquv1v1n3cqjh2fan53n8k7jxnuf4dtb00o4q5e5dyye3i45pb6dkh8tby9ou3xzcyn3k5qfg1aj6gteokuvb14bd557q5u67lr0vzustmudq9titww8srqlobbyk0evyxz9vdmn7egjmf4ej2cngm8jtofno3tpdv6uicrzi9hzq6f8pqudkdw32smw4143pmiict4kx8hgdcof1j6bf9n0i5euc7msg5jcoaw210r9enjaoru529jtsrm0n9ooplpdf9666ak71nzyzg2oy0lwfv6bcekfpyqsu0x7j3ay6ikj8a6mfn6syzssnn9l3t8626j9u23yo35kbobuvpqui3h6nnbfcgrv2dn1xcbkwf4t04gnmtfpdvkqhq4yismwv357z94r2mod0qyt8f0wtduy409ku98zvw38sa6fwnytlmv9snwjjvcbzh4l9p175k7q16b8r9mhzs277blwh1',
                redirect: 'wccedxjpcqgu8pqvt5syteccaj79n7jh9xcs0wgz1l6n652kykiwcxp59adfwj2e9hv0mbazqx4tdd6ng62timeqqc9wxege6a51jxcrtg3rx66h1lazhonhub041ahcapw7lo4cch25a8njar5fninhs8f3lbbegfn8cwa1pjmca9s1fwx82a34r92bb9mt0jw4fadiznpvcb6rjomywxv3n2r93edkomjyijw39mher8gu1anowudcf31bhc4wnrme4ks0d0tdzh7cwrajkrcoa6vvxjnsyqb3pe6r23ccyt6ipfnhhudn44s32xlqf8ud7vlfugls0utnqowtutbgrpwvsn9fzd8z1wyh5s5iumwldo0gofjl1pl10wrq90ao9hfpl0bikep48lcvo9gl7qpe0k6khzqa62xl6emwgxl1xh5oo2jc8352ruzzkylksa0gkn7dmpz0kp9zq92n223o2l7orbwbci2otuxki7341bjyzicj810ocmjzq715r3o3t0r09aloyorggv8u5okyzf0ih7yvn9kng9a7gd65imm34pwmvv6gl52skasex50whql0etfd4f9rxoqkevxdkqo6u0ckjzufvcd8fdtdynp0vuxhgi621c8vqfsvpdywrhsycj4xjwshoq91szvc09kty1eirne4q66bcy60fqdik4lq8upoi0wvaegahmomuaaeutn3kelyhcau1ld39sdbe40e2qzc2k82y4t3c9lbe3fxchqhp20s0ioyt5yme8pfmfq5ruo78a7ae8po5z8qehqcmeh8a21hvprpxtvey6we32edxwrtdneapsavw4j53nu5zd6ynfjejn0vex6y57f8v9wv2en56yd1qo4ghag43uqgsfjokcfk2g3d16x2gvtsc4moxmy6jm3jd5gb10b8br3e5qkhpof3fcp1x3k664kizgni5qmvklg95payprv7911gmiju72oqwptmzq8avb2cevfj49yzw9v5gruqwg3qku479ntd5k3fgcbbvxoyw2kt9w7agltytcn5koirnmw8cz4ia3x7cmuxqlyg7dh2yxtk3gpszrmiwt33q0qf6s3nikq9rh2y8kzpe9rbun94z05w69drksgtw4mvftdsxifyv24c2db3k05yjlooh6qa2n240ifqc83wn9badnyfyh0gt9rcj5l78cpifqovgslucdlm8nj32tjcfhnd79j3gx5b11nha1r45z8aqs02ebes8n2pmhhh6z25xg63zke20xksy2x3q5c5jgl8byce7akl5simtueaob61l1ji008e918zdjycu37ysakq0182p429arqhwoa4u3gg0ft0tgchx21qlkr5sfe4bd112h3f02wi0gl95f38cf405at8zfqdzhwdvle60jx84wkls41eiysknfrjg4zgl71ytmrgaitxcs1i1inm8hi4zcpcrrhyxuodmn6k6q1nxq8ox5hdv5z0hwvy2bxu0xn506oixgl2n3lnp4lcwygnwrq3rzkw0zk1pw9yjonoedm3p7v0rqlw2kwtrk2sxzbw7rds9kg9ngyywhg87x4y9ft4i8b8mznog6s45klelt75ticui7r2dtd83cfnamlnarflk71ve630693614tqvb4ab9ub5wp1mqpphcwdja78zukjh6s4rk9pfkh6h5ft7df87pkruagbs13qrnq9hfnrabw7ezzjt2q0vwvckvfr9q4v5r2lxxcqadpqrl6284de28trjkq7mwdpbpz3cl7xoyjrtfrrr4z93o9el8jezif6zqqfurn1dmr5obwvf7d7whzllngxzkcao3ctxtccecpfjufnnmsyuzw9arkawxiuvpqv74xr4udstqsinhr0e0psen0x4qfns0abthg9qepnaaqp2ma3jr8gv1vi22momxstw6dg8xvraunjf9bc7oi7rbcwgd0l0gj2s710v7mab282j3p794taormjhhea9k4gdj6xdtzh9l5vlwwf0zt0yr5kvwrlddu4yj4j',
                expiredAccessToken: 5699420139,
                expiredRefreshToken: 74709074971,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'PASSWORD',
                name: 'lnwpat57121jztzx40zttgrf1lzhypsd296euq2mtlrhifwy0kz2mooqxd4601qvcskrzx39iag1j5mybomqcezg4lbpvcq0x7dq8ehudx0xyvpe1knr34wmakuj0d46yks9rv6397vg45rswftdkui9zq2dyun7xkjx2awm0wa9vkvigkakuu2kte61kig2adcv8x5yciinxg2wehck681mc2bh7h1ztd5ddoxiqevopqw27ep671hiajsj4ws',
                secret: 'zny0jfva6ab9vz8wu75o8iylrghml2zpk2ssx5a62rp2nmxhzfi2vq8hffqn6ts3ovbfnr5jg874phz1cc1ea3lgx7',
                authUrl: 'n29mnn1mx4rb331tei7aueok29v02m2dukjq9l6t4pul77q34kaersjrcirj8xory2m9i1vqsisj4n948ux73sdls7rllgw6gw7wwzzt91oie3g072oe2nk056yf7rms88lbcf3nb14u952ae6trmz2hki02zkwvz8bsbopm7bf7px5cdtt0izks7f9u03yxedncjf9x5cb23t2c2xv4hu90edv6m75259moakuu9fu5vl0fkt8917i87zet4zlbd0dt1lnubnr1u86c6mxkeiydghppirlpg3svcjwvgh51aiwltsc96432mhfd2f7k0leh283rmyywc5lgadoeirh5ll1ms6zb0qgpxsiay7nxr8gd7h9le7kxvdbnme3p4dpwiionlzxic1zllnvhx6gq6q7pjon5sg962ve5h4qc4k2roy24i52382t5usjj34jfwiol0c9du3rxbjueib0tfqcory2lgow4p6l287y3ebo8eqxxs6rnc75nsh0moirvi42lp08bb853h9qivomz9ae59i7f39kj6ko0v9xb1xpr7xl9obdg5skaxgi0vyx5lp3lehw9p6s24idnv1ebcncnlpfjfkxbh52y7uenar9ttx7anfxo5w87la7kd3yriwald4b8a2aqygtqp3qsq4symyplxrjj4mfk0kggd246re200ls7v11gom3y9uye80g0hdqnycjnfljadkrslkuur3rbal17wjpiullh1v3hss8kl2fo866ulzkixcldgwwfry3falat2gvazuixa2bincyasmr49w15wv7cqllu6j62lxs1d7htz7n1b6pnsmk65bk6agwgbyqhjboo3peqzsvmdmacsxrtoxwui12w2h0312n1h8pp3q1u6k1u03189olph1u81tfupemad0nbbr6od6i26szh443452zcwhlp7jrjs6nkqo90qdnnqzjmbv6g2d4mzjr3zoahxc0q5xi569r3mjsm3vqep58cybgdpnmjdpdfnpqwfmk7jume0pbl0t0xd5rcp9vc6d40lv9uujgsvamtovy8d6pamsxy9hdp6i2i75l2qj9306g7kdy59tsohqd0680rzrofjxm772t5bkifleunjibfw0ynkym5bslhu1fzsbldqmhwj5291anrvsvfzw3cnvrtl8u9eucpelfhypfq15tx5qnghrnbnlxw69hk8hebq08sckc7kkkk3rsh8w2plt8gyyjnzn2hhay5nj6pzwuv7d8uhxu6kcbudphdd00gwb1fkdgz2ia594bzo8q0yo2kivi0wbc2e6tnmb8c5w6ubgbsom7ekwimujhb251jl8lr42yzjt20y2k9l9yege6gqhh9h71269rp8v2q17g6x4l19eq5uqtrhf2da5p1dfq7trzuz56sj9hmg7espyxrl992ailn3wk4o86w1ejy3l4jjjhasc5fzut3nx70tkk7pu8eq9ne0mkb3ibz04g52qe8ihpex1852mraf18da9c55h8ckf6h569q0zqya0nbh2y41hztohs9guprjiofnflv7wncp2sdbdthht6k4st5ti407lh1lke7cla6nbicmsdsbsibr5dvpp5pc4818lzi37eb6iovuelxoi9vm35tncvagt47gauwehkixbqbmj78iz09wxkugilxzk9f3nr88tpyeahkwxn21wykzfj8uvds421fdvl99m15zyikc5nzm9ab4ryhos6qm0btjijobpbfqov97hj92jhr5dwtkiomsfk85e5tlvrv1o78sh1flexyie6kyk2jxb28o9ibat3x1sqa6681sw40qgq5oab9brc163okqansjslm2ggkj6qtjos88t4sxzciq2kr41pv4i9kd4k8vfuampg8903wz79iuu7q0e3vc0q12w992dq6uq6wxwc5mel9k3an93j1xww29hx39i8h0k2sttrf3xgxe9s9ozu5vhh92cim8cc00crw8zdw7e75wkrhm3nv1hm9piwk9zn0caw626rmbl3xgmf6',
                redirect: 'tlb35k3o1d0tjqnt90t36nhaj86mnkuktv5znx3kiy9yqefjnddiyy2y6o4wdoo6b7k3vkk3jk39zgsce4mrf8mvpfwx2g5wlaq5313bmoyy9vvzxxcfp2d88si2sruz7fedo0yqal9zql78hoymtiteuwshl63vdem9g7yg60t717gsgzrxl0dutevl4wg2uvy529ap6fjailtj4l93y0kot52xjqk8iq1b9glc5ozqv1tuxnfqlgjhhmqgotz0x4of5akjwj05q21b2lg4xnjpygc529n9q7v9mvyaoyjg0xuhi2egxkkh5d1wk3sylv4ahp6ukib09pnuyuw249fnu6o4fx14bhjno5t4af1z7rhwm9ihzx092mdyh53ab5bs95wtsoqp4k1hxxdzh40ermah37bv4h1euww7halla4hfucwmji08vglone0f1c17zp8ls0apnmlncbdjysudkuxgh1rfbei3eghr23y4d5nzlq5jm879j7x8zmf0yna0ket0w0e8ofeg77zxtrsrmoqh6vmjrsw03m7n8gqnazj8oz51u0zev0xpdsxhlbxhlxihsm6wyzsllkhyyjet37ezz3pu8xlote4v8g0crntc7sfr020ovqgnnnpwmjcatdoqyxnr0t2a2bvpiiaah6jogegwv53dg0hxaif27aa4g5tn6s26np2eblg7gm911x1obc4ctb2np6bzjg2ixmrkfadsiya5ge3ebg4fpifzbzdgwbd40qqt78bvzu5nr2gey0de33e1oc3on0cy1585ri5dwe7yoqb9c91252m4uqtivu9kmtiocllgttpisfq18txp2657yz63bv80ouzseg25pvilaedwai897sfi8nr6odqy3m89icmv252p67u9o3iifgdk7b10cp6hgmek0zlargj0u251bbw4yz44gambx97y9bl75p8x87hgphslsc9at069n4yclx922iack8saexo7on58xx18i8ref8lliy91k417nc1l7kz35e3dlhjkq84c6mekv82sjaqaflz6qpfilaq2bovsqo94m2aa0qvp8s8ivabqntg9le3t4fs54kiu0u2e0gqwfuga1l0fe7fz2zlxzbmtmukosgnl9hoxzvrrro37hgffsm45s94z3w7dkd1u8fj9lmppkjew82wm6rye6991cwz3ock2x4i66ce2z1xyedbb3k4ie2wdu6q4bzinbcp6t7q951u4albzmoectiz81noc4pzxss2d61zsinr8baagipqnpeeuc152bbyzi50oqwbz7l9g01qhviq6znxw5r9yt6kqtdzpy2z0c26zrw5odezl744ikwgv4rujl1wt3yzefyr4u08l18x1p37p21dfmpmcxyy9t59q7jzqyfcobix3vnrd2xu2nyzgm44a9l98g8hh5947kqzgtzs1jmo8haoukiebzpc9a8tm10hwcd6eeetktud0c60f3kd1mx6y2kc2vgtt23tqaz4y1t5qvqjsq46qc014wu7cvg68ws390959embj1ef5tb4ad8e1s5g6qabariulfm7a3xlxm4l21e0mj1qc5kjjntyigw6hh1045uanm1865pc8fevubvnyb6nvojusrzocf5eiqhbyvh3ah542cmauategcit3lrquhax3edmhkucgsueokgn8euox6ti0mq3z0bfjes5g43obm3m6ewwbwbk03ki4km6c7i07bh8bfz52iujhdyeykt98p6p8n8hm485l2k00mm0r32sdn2lrnbqj56qbn2rxefngoleicsbotrvqcpsz6k6tspyijzi377egcba0rr4fyusy6apcezbl315xlxs5wo7pr6uoqkhruanlrnw9hah2fizu2t9sw2h45xcdo0lv6f7yh13psfacxjvc6nrad19uk38syri2f2gfvnz0djx8bfjadmj2jp435p197n4tdt3ws25py5h04o6dxuvk8ge20doz6gngf9qbperzb6r71772js8yphbbc50lfpxldkej92e4',
                expiredAccessToken: -9,
                expiredRefreshToken: 8570418051,
                isActive: true,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'AUTHORIZATION_CODE',
                name: '3ey0w1k8zv6owhw2p49l744nss5tqv23hb304tf9680spr09o9o9852kcxrjr495nqjiwpn1744xz4ls6w1g8t23vd6gxepuw0tfsh5iycjlum2d7f4ywb7vmyojyppnbhxhm598p3ugya6lu45q0q380ioaksr951yk22ioa3xiw9kjnrrq84nxdvrykilvo8feksc102ps160ptlg8axhbkwcczjkq1j64nqa0zg7az98va5u59z0lyr2l39p',
                secret: '7q0lh3tk8qgtd4u2esf482corn4xustapta3q0nrnqs62iqg80ii0ffgf70lyxtdzcurovn23boa2hivpr9qzseah9',
                authUrl: 'egt368myfjy1w1iwbn9692libe3ogzl5gjpbdjvew7jb1lvkqw162uaw6egn6yxkcs8k83epaxnzbqnk48mp585nq00p1zqediflrq09c6tgakp9d4tzeohwos74tkobs3v6afr00hkj96dryvgez1bj37dxkj8owunov2bwcrr467xdqikdzooi7cws09crwrpo0myqelrrusfzp410nqvuy9nugw7al8bdke073pqm9ehqbxq3lb0cigwk3eka86ojaa71djafr8p0jl1d0tloxop0axpmuxoo9vzhk4n67qp92y4q1nlerswcmlhss3rgns4km7d7vh5mrfzc2p2teom9b3ci887agr7rhdfkzdcf6u8ns3fw9df0n2e1v0yo0np7ic45a3jbp29svdar5cyfvrzmek4ha8hialfqlkfmf9j5xbvxo6dw4auuhfidpad2fmhdb452bj09hzlttz7ma7uo4rewfjrhs8os936jf98hplrk2ls7ouj3lffu9zia52s6vnylyuyyvywssg96newhlz6e5k898wyuqy24n5b2213w2coi2aaum1yr8k1dkqsz6rzs1p3ryqazm46ajhkm1g7o2v9anhs073nwhh8fz8d20tcbokpyiwwhxtsd4c7p8i1k1mm46mv9uhf6fdlfz1el6n85mv1ztkukuo06yebvbfqnfkzfrcx0umeeee3upe6zwuzldbezb7i1cs9k93pwguoi8thcc1nes4knwtphbi47hft0fa446hojpuf09dav5dp3wh67viuqqm56p6mtcs6ytt1u8xbf8lyq26m7zw5yzusdres927s5i17g0n87gmzue9ld9gw9gfn1tzhy2cptmhnkgvl3o0gayq3dxlwgdjkgw4o29hi9f1wh330erz4ssbeqa6gruaczzukxk6phveycyzip8fj77u1as4l6vntlfd9k465bzop5ci9dwi610xjffb2csf8afvr3um0elhqgxuzbdgws28fqpx3i2wurk1c3l7892ja90eevoqq96kl41rj3nf9yu4hvnhc8sxanwyoaq3y9qxyb4f0yea087zica66mcz0bn2a0pypdmo04p7ye3h41vwoxyeekjplj2j6l3tinswjycg5ztm7zvsgf2lsp636w3thy4aosvq1i9al1fruwexk4aabf97li98uh35bxkxeijysrlz313whwoo4uatejo42p97s46eirdi2ii2g5wj2oh0do59oqkxtt0tctxtqre6ye4ma9zvns4yr1qa9geuf13dxf83ydnt59brs52jz4aevdma062kdplpx3kn8wu4k74056auvast4pjmb01xr6yg1bqqdal2mmbmqztlnvirilsydtphisi5h09ibtor96qgpmzns1wqx0q7c5k9ka9hl1c3jramig5ziopgx1dnu7fy07pgwlaer00ed68g3r6nxb5z0zj722qjajox2qrtdr76ualaud5gc52jti3vm8ayh82n1dgtchdxpn2ycgwedy1n2t5zjha54phyq3p1779cpuhpxvlu68ni0c0bplfwdh4p1en13y8zce0zbqdu0igrbfhvhpmei4a0ps4njg9oz9ohmnr7ki53o1hnk4mfes6me9pd3hdkrvftegojm0aizhx3e0ag7snp3b6hisu1wx2rv7zaq5sjtvn4q43l4zaamxzyjau2l5fsmuzmckdenj7um5dg74qml6t3jb9p80qv2s0xam05kvyiyv28v8srb791j8gb4veza8bk9wvgpx6vbn4r5caeuvib4l3gowj1dmk5fek408p5qyq70lp8i9ln80ys93a9o0kfe9zmh967x5e6wq3voutud95r3mp2vk40evbvdy2e9i8pvaa3w3lucv8jdbutdx9t8p8n0lkuned0z46c9tqef5p2rg5wothy6yapkv8uudhcw3emnx5174wyywyckh6c3w4lt0ngoq82fw78ny0uecl5kal4g9gephscnx0mi63chrp4ka3cbyinmepoxx449k',
                redirect: 'lx70nxxlby9v4u3xu41zmfptoumelwkafdhmtdux7wfg410vkvuntpsi86u159bs6qw5rgqe1r97z8a42hdl1o16ipkstqjd6h6roxg2iegwzmdmwq2hqtch8z0ih7eoichodu56oro3fb9va396rnzooxa9dmikhiy65fd2j2mir3mis1259g83nkvkdan4ubyugnl1l8g4mikw1msi7i6raxa94zg6eb1px2zumo3u99ze3ls4aicyecjjvd0mcqvai6kbpo4v88ing9ruf500i29a0b1qwrcemdn5bdqnbfm0avn1dss8zeaovgr4l1jvaq8en8b44shp9ts451me3x1t8qzf5vgbr8hxm7jo1h2eho5lqqn92r60bjiweyz5wvge0kjf4fnusoy8iptgivl53yu8kkz84jj8s9ofotef36c9izwdy7vmltdmnpcssorofjyt6iyy3qveffyskmwdn6wxrpmyyf96mwaor2jenp93bcowu3cutv47dvs7rhc970pb8e50uzjv3h2ezdslp73qwxeu1i828e75unv4yljoopjecrcrtbg1c46v29tk6w9ihmoe34d6riq75ykqpqpvxbs9nxn46cn9ayeyg7p98ciy68eezeh35extffc3vpvl9j80w89u1w3h6raxmoctpghdipk19kgv3hf0kt3k6mhe69tsscgzzm0xjjgak9c1mwca09eqltwgtij7t2gawvk4haiek7pkrgb4lwwoemcfjowfs1j8pzmjlc43tk90s4n8upxkpczaxp82j7y8xmrecsfj1zmdh3slq9ben7baydgss8hi04t3c9ojhy7jpyy20zj6y9v25scfrnyqq32n6hzqgae4lv6inuckrppeb3mwgxi8025uyptyf8y50l7fqg7v4sk2vrcdzup85gezpzkd0c4yc35wkyh5sikn8o3i7yr00gj66u9r9r2pe4xol249f8trddfv2bu5xrezublmf1f9i40v49jswd0nn88e9cewsl73phpcwvnv14tqhwuqt9t4czks7n5j5olko92r4rlhsg30bqbi3tnsc87hgo1zhoojgkdieqzlduty55d4zw9urhn2bm68rw9s3n0edvjaw93gobmj7rvitpnh45m238rg7maaocmejjekpt8wldr9o7fxd4xbw5iidrg47er4odebrto71w23cu0ju2c8yf4y2o5y64i6yq9u6auckjf3035vhf0tg9flhfacggsbnnxkuya3xxvj3temyrtu2ho2fugggvxjo0gazj5lu43e66xjdppp3xuyw3w2zinr3bik1if1pm1ws0m5bhiguq1ah9mn7mg31v3mgv4tnq6dczl6l94twc2g48swsil5tihdr9mxc2vhb2yw9haqkaawunibawemgqlq4eguvkdnx6wqvnwb1fi6cn7pm1rgjmdnr1jqsctx0p1u1rr36dvbf73ywmhcx8d6wjcqocuozzmykg2iup2tjwi2068roe0cnb1w67fjn1zrfbys77pm5mc5whhk8nvknnqvcarz209vts4wz1n4unzvv14d14alyl24g6n0y2ze0z3qj19o8ng6q3rgrte5oasso6ypi0roqotjxsbrd8q71d2nhourlj84srqr0ro9345v5dwtxpsg8kfdnlz5voz4uau1nc8mzoh8t8gc8yad2y8gancbldu769hkrd21d6g6yfxfeh5ik4l4d8kqtuojbfe4lyub86m1yderay6i22rdviivsth7m7sdhh14qw47qwjiqzr72mvq01749hkvz0i9e0lftpsz1gw8ruuqf179eswbenw027lvjherhm5g2h587rgkmsglunmsq6y95vlur8y3vzfj7ja0l7os8u8m3xj6izacuh8mk5cb6ojml49lnwbhn2y8y8c7vbicch65w4yzklqhowh7n4uay62puaeu12cey2ubydnf6el4zwddg5iu5kcbu2yq36l9dcsm2ljec2hu2t9epscv5jmilq3t3ffo3i2ymtu2svk4',
                expiredAccessToken: 7177266746,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'PASSWORD',
                name: '3ma1hwdqqs75uve7ltyx5xtm9tokp49lo5yzhwwcgzspizue7u7a4x5skvab5gcftz9jtwat8l1vf30vtftobs19ckz7lnaxxk35syj6ms3ek0gyyl87l1guzribaqqcf4ap0yivuasr84ug9u1i05p948k5uekkda6ndoqx9lhn0vcakvdzouq4gz8h6hlcrmztog37bdzxa0rjbxmmb0xjqe35wwhcbb65lv96dlr6by6wtfh34w18gs0lyn2',
                secret: 'e2qr476bapjlbbrgclqm473gjxlcna0f2yk18pd7nwedltpx0gynorjfvmjnlqzfc427z2w5pn3yyklu4w06gazdmb',
                authUrl: 'lhh3q09vekewnv4xff25a2vvkaridgezxiu4yl1c35gvbs4vanc21s9wf25pbt6y5n75tyznbq5ruano6z70bjezbbmi26lkytxk8v5k2quwjgtm3njbdb3iheet6hb71koku3cxh06twmsgwaafbpdtp5v3c602p9h3he93u6zaiaspewhr9ihoj10tt71nt1o9mshv117955exlhenp9wjt3eyaivpe1oznftx2xf500m8orfczwflx1muo6bvw4j167pzzkryxulvoqjt1nxb4pd1cvyro4prn6zd2qqqemypop5pat8f8f6bnw0gdusspdwbgkubjfj3a5hdoctqwqw6ir47gmmnpub5x1ov41wmz1t5e5awfc662w5osgdirjkcfruk15c4ojl10aa3q1ty56jzpz4zqmcbm56twzdcssg3gzxi8umqrfnmi8wbj466n7p0ksm6zo4tzysy62vmrib9bya0pg615x6xlcjmui6ge13sj965gxwro67vgvrkmc7vu6c1dg8hs6ktl63o76rft9nmeikugw4qqingj3vrneqqp2goavosg4hf1amgkmu86ih2e2khmg6scl6rc13aw7t8jsoofewveiuhhdsclypvgc1klnz1g328khcgybcq7vlmxizmn6djnkm1w6u21oxf8hrlq6h5wz7h3l457ku45v40f04965b4ph965q274193ougs5dq5l4k70xoflg9rd9u44d0yai6ugwot2rpvu9su7c5wdjbcpe4bislkwlo416ksqu02oywhjccsrpt77txypghqnv0lb0nm7mcn7o0nh3bv4zeqlbtqs1u4pqvu46uqsgrwe8addqjkhbuxvgjvbdkgxb5z4lp5j1hd74l44rduhrl6ekxvg7ycxd3h4d1nes2zbrg96qrp9tlg7affhbzg921lbmgjcpeh2982xdrecwzoxayuvtxn4n4efq7edanid16m3dudpnqf4btwndyxcgbgk2ew2m7b4ecottqoyyd0o2dz7d575lstn0qhvbh5x4rknuh59i809g4jana75tv0v9drn6m2ay5ef6fr0cuvoibw80g9lrr0nnd8nuwr77lumntwg4dwql19gewq9q4jq3ftgdak9bd6dfj4pueexi9uoatyhsdxpb6tmqo4iq8avq7n7zoztbhvz0i1kr5216vvnriplcce3em4yrygvh5luycpbtpso3o6dqz8jgutczpemmr60fvelanp38che056wlrj4ph03ckhex9fb3c8rreuw1omkh5p5ymgna4h4y6jqhrd88zcixs9v4neqdfpwxbavm8r3wuq5ri2fdklk1ildd6wbeq6pdpkqdtysk0rwt4dhvwxn9frlfgwcmbdl24ua62uzsyvotaczmcglculr1pfyyzf4fpfdvefuev517oof7rqix2snyal6r9tvvael5q3phkad23mfddmy2ci7x36j39vm3m8lnl7gqukhon381o74yiytwp1acuintq2b9f31ffvfbbccz2zfjqgl8oyff64sfljej4yzedrnb8ew9ua7vds27ge2j4a03rvosizuy7dgj5qjr1bk4ksgbuhd9dv6icmiy1kkig23c0digrzuldualyfywzxm86vmqex22wa90k4xk8f8zhei2lit2u4916zc5wbmslficraqw4e0dp8838gntmqoj412mu727ja9v46rn31txu4mnhs95wc2o7tp3e779mqp7esnu8v84316a62cp7ydilc4a4o9l5s5vxotfmops5ty9afsozoveum8tu5jklifvj2x1dlsdyf8umxx1x4t9f1yqjapocl1kt47baoemh0pxk1yw3rujtseq15nj2z2nwhkubb7dkgpaxycc4dtpygcnsvszrbgr5oeapxze5o55fxmvr435vr92z1wwvrs83atmpw3cm50j3fri72pevxkuhkezluc406vk7s4vprvqupss8h5ubcjkvspgqvpncjcc5fx8z5mylomjbp2ja8gp5mspn2',
                redirect: '2tjs30h799l8v0k2w6g21krsm6o2q9x45tmh979r55xan0gcr1oqwdp2jyymtpjkw586hj3s87ycfpws9fwrwwkbp226ska9ehv5b4j0wq8zmlrr81ph0xn5ffsk87l0hjk2xdmxrwcp6xpkw2f3umr985q9rczdb9uueoodj6rr2248vykpv5s2az5vx29qrfr3u6um71ze9n95q6vhv8o4tjw6xanbs5n6fylyp0mq45bi1q03n030ag1fk0pmxzbjl8nljra9y7xh9s470huktmsnatftfs6s52333gtlboqyuzqneuo3rwe1wvlykiys6a23bnte9kwfh7u9c3yglieb84qt684ms5vsfz1pgwjkb4tanm8j1q28wvur5t475s59phayadutypuypanqx0i4xilg2okf3s5ybstybom3bq9v7d1l778cguu1m22jtvkgntnjcjpqrw8ergn2rhwqbd22cuynoysmj5fjea7rud85un7mnzh5dqgtdef9991xcde4251l7fv1n4fgmrdz816wb9jos85v1wo99lvnzdf1q9rb3gdzdcw1t7iryrxv0tl6t1vkk53s5s2d44885c816kdre5q10cuky7mcvs4dhao7qykp8x251e7yuou36asp73lppgjhh5103z6u14qx02i29onx836zrswh63f2dy3oh8dfda5lnhfsv1yh1t1wyleiwlqi6uo9aq1vr7b78vtl24eg34pm1dz9fs8g2z7zwollrs4140uvt3tmycfitfwzd77e7wj3lefr193h1otmp6vi9uvbxn39141npb1lj8mqxiehg5607559twfbypnxshkh1i4ote1lt9zf5dw25o4ptd8gz2fjgldnshupgxj7zlxtag5wmo21g6i0dwj8i9bsjny1puan3a2ap7746lwplkzod27e2mwkod9xfsuue9hf9a4i8volcq5rc55b0adbkletczqwhlqi11qkrep8k6y7pbyedvsynsw0i3hbimox6mqgwnnd08uh1rwh1vavdx8a1lb11j9x2fa4gbchdr2133wy54fb1t4pv086k6h32r0vhr58quc08k4epo5dt0c52mlfmf3qapmjgs89nkrolmtpke7ws11os4ti8wv7t6h6tad5fld1rftjulc4stusmz48wh5249v9cqsprejc57ld8q66nreayxt301vb0tiecjyf79f85hgke5m0nbcj7dpg56cy0zbe1vcjvnf0wim2apo29cnoco7xogbdyijuuve02m9v6bar7dg4u9r985s31v71oswg6ff1wm5p8mq951mb335r9d1i9pr9cyotci5zume722cpxip5khgvd5n1v262pneacs0k9ve34ym4sxrajht4y0pdchej2b5ny5d1ligs2aw3dvrhyub8n3exvbi3629csgo41wm8guudlo9h8139s9ypba8xdyvwoyh1nq3f7ovqro1xlz0g18l1zkubwuakyozkuezi0sl23hufsxuipb3y1ex6cer1vdpl9cbzbkl98ztvlzdakldb6j4ih6espswgglow7nss93x8zy35v5p8s57yzkck56dpif6q3t96kwjr66dlgmq778jhp6uynqnix08owajzqpq9j6xfvrfidwqwna8y39jryouhw4lrpiati0iw8etl0266a7hgizznkc4vjj0v3v0zw1sqo4ghlb4yeo43lzjrh4pzyw5296obho3ohp8uguv8q6f4h5aprwqbmuuheyvm9pajpvbcu1pdwyu4fkbj5zysu7qwckbf6qcg2pq1lt8mpmqcitw9wllp0y3qpvdd5id9bkx4xnq7dat2vzz4uyq2xscqzrlfinwtuq3n8tx045noyv5nqlbom0kl2psewhb29dv6wse2nik7304qjgigds1nj4flfqvurwy3btchczr6cph5qvsydwzf1cjz1w40dud64vv1d4mb6vua2xxovsbp8msg3n6vsijuky56fh68tkvhli9hqzq05kp15sbnhy7ewpdp',
                expiredAccessToken: 8449906699,
                expiredRefreshToken: 9709252499,
                isActive: 'true',
                isMaster: false,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 's08wdjs8jz44hai8q1neg4c0wqkebhe2wr5nu25igz0m90seh2izrtitx8b917flqjabakb6iu94vvnrtoxino7qekvq9pfrjv2063f0sg5togwxqctwz5xzg1gcwd0gr8ebhy22sc2mebxhzqjo13v3hqoc7a6fly2hmkjgwkd7i4uyw4ctsslw6lf65xbqiq7pc5fw2rq6sgsicg11h35hou3zb75pnfmy3yqvobj86y2s2bk5yznrdxdoxd8',
                secret: 'ldyp8605c4g1203sbgprg6rh2lftgsejhh8j9m33828o2uhaaw4jbu117j9or8mv6yup1lteyslbfj95y2q5tqkag7',
                authUrl: 'k7si6ng4zamuclgdpoourrmww21illri6fwzpag1vixltkuz1scagwra9dmuucbfj30jlflf6lfux1c43295ii5l8scwu1jevf2gnrnouropafcz78r0126mravllcjeg3y1wwon7nrik3jn0i0tis6bzbj2la1i657ohu2lef14tc79mjuzh5c2lpj6yf6ivkemjp19kldyc7rcwuvfpr98h5lm5oo41z3tjy3vsgtlrgfefzbjnb3ldut8toyjxg394fossxeewte0acpatathrprwasq8pbtt7xbfidtegndpcdiqppocz7ff2tctwjf6ggrh0wjjo5yhdcx1l2dx2xtlh4d3jnto53bfg0cs5i2ysffnryzn2c22ne9mojlbs0sueh94gk07qaqcq6vdp02i71jjemjndw082dcrozg5f2jcmi7goc8tmhgp7fa136ngxt3ccjsg869n8b0sv5z1m5pvy8mntacbxckgds8k3jxv4n5756gdc5c17wuwsxhbf11961g1ogm1f42pk7nfbe1otomlb16z8zeq92kko1hibhtjqdgkcbjonlh5dam2vpb3b09s4ssfdw6e56vhi7rzsgtgp2w7neuke05cudoqflu5q2aabpagytnkn0m80i6kh8ftizbxdsjm8h9m1gdv4j9iwdgc5re0f0j8qk7lqnd0t79udijwt8kpyuyagfiho621t7uzzog2e32gufsosigjz8066jxwi9xemn452if04kev1adi4bxnbe8ns3e7h4jkgemxy6zx37xmgdg3c7lh5fx6feovm8m75owaog8c38ks3psd04kkdle8bqbaju4z81wdo4xhqarjf8k4de8bnf62c5qw9qbklcatbw6wn5cw4zje3qnhfimv7d3nx42zbv48r7486h3j5d6c5dlxs25zswdbgwfjpt31ie4v8dq9jkoy0xhkd5gguo56pl6bblwvlxq19e1hy118i9lq7i9u9roo2uogq5d9h071txoeutq6362tk617lgq0nio0kw7w2hzqlklo0pmbq9f6z9mtq7h6hvny6lnaa0w7t2mdytvus536xsqgqrtvg66cwjuk3lcd9cfe32by0unobfgthcbnher87bskjni90b6ufak9gar13hig1isfz3kkfbeuvmqsdnz98g5t8cxftp8mazv3pnyv02in4ddpgi0yidwbsixtvekigmm3wbupvzubhtt3gvajj4joaxjxnu9etmvwrum4syouh28tkfks90w2klzeplcbu667skko4jddxwur9pwx0ggdxfmsmt1xo1iwoero0702svxh1zv0kcuxix58ot794q4hs5vzbig5qn5p8z0iqgiws6fr7vely932tfpgligqp360jgnrik3r2nt1vih9y72w78qbhm4yr8ochzagndf0fjmx78otolq6kxx2w7r6b22npcmxx54zzn2bxf7456uk94xpikurk2tyo2qarz5pgt9a87yxuo8dh8imenpkoy2s4o0q6eoizxzr4d9jx61618i86mbk2zx85d04uuwpv00frgpxpndidats7f8wylkl3j4bjgn19y7vh6afkutmxzwg7fupnfib1ploeaz1lyytutsgzv8jrooc0ureoe150vorc011yf3cdzvp9pmz1zyrdxpc8sjym0eg47eqlgbeazm5md6c6p8mo290c4zsenlmmtg299ppj80gq7wvgdh04jyt15819vooeewza9g7xde19ep6hel04u5h5matq7i3c1qf8xgqpbtvv7rbz2rkg3jw9fx16hzd310zdwkxlqgeyel6uldlcrgk1dhns0nyz2czrlcm1zi5kmy6h70gj8z817v99dnj8k8jyl263c3j3gsrjqa3ir4n0aqtec78u4nb8d9bi10qs2pgm7gbyzwhsrunf0d0dwuhve9e0m0lwmo8qad8sibd7czwjftee1gsyfgfpr2qd8ke1ohrpc07vm29wyadl2w6b9hvkzeyy3cv897rbz2drbo4tmwnqwzc',
                redirect: 'ngl2utmawvpflto9jvn8i390zbcrkrsoq4d46yrroen6fbh9ler63bj90epll6tutpvh89ql1kxmdatraqcb3t2u2btgh2eljqy29riv70wn7l3d9mkhjs4umgwizq78dqopryhvc7szv0zjz8b97tmk0p7r93hy9tm7whml5rb12w0wzupo8qybtvgwn5jvz34rbgsjiiij46b7corxgnpar85cs3aetwzutv7kmkyyutkrngewi5amb6e47x53agtihjr57ozzm4dl11wa4phluau4j2ze7tzo5ug4a37io5qhue21jyn692ubhvrajqksct91xyfv18pwzp7dcelxms398h5whmlgmgvcadv4ya9l79ib3zrnncoux4ehzns7sv0btbbijf43bne8v9g10ogav0vnfkmr2hquy797ok0d49nh83d0via2ds4k5s7ay8zswl64pxclui7aoyml1s8d909go6g07kr7a1wb9rnyxbz8iz9fk5piqfkbva9oc3orq22gma534jpbohcqkfcskfe47mx82po8goljrq1a4sqm4lh93pb1fit22ow4i2j5tmx6swjetxnkto8pmhqx50w07rreghajcabi5oqejuy4stirnozucbaqied09w8bgm1n90zlf5lmwhp2na49xayba5e368gz8g1vjip33nlvuklzy6kmbiyn5lswlvyy5ua33yu251bdozc256kmbh2hdpans0ltil0jkcuoooty2v6t52j9fityqpm4izo25ft3g23xk7wcpchr11z2n7se54kvwn2h4y9axux76f8qyyuntzh5f9cp9sr7en8c37cduti2xc61im1td3hqjbmw35todntw5v8kw5mmsmxw3zi1xs0stgymffi8whshqws1h9vqdisub4zm6owcgt5bmbgdt7fp95s62qnj5aolt2uhprqyh9bb5scrvxdc2ffykyvs4rtfd64amahciaf8k70herdx9tis3515djofqzt53wr8jitdde8yfmgcro9q4n672sig7ngnukj78c1m4876atiygutyob8spr7770wyd0quhjqdrhx3vad5u4d9fav82pmhjilew5gseelct6vdneu6qwc8ksnyam4sjdk08gt2cbk1guyl1snsjo4ve3gsrasec0madrw6ftbig5nopdgtiit5csytcvw7dadwlekxfv74jzhmks1t20gttvgzitybhocettc7cy2ojwkecpuw5ji6lhnlriquue0w06mhew2uqzoa70kt33j37u7iu0l9jha1rb0iruha6uz4nw47bg221eieacpbgjsi9w8nm9p03h2pq1no3c0xz7axvl2xvu70vk2yjixeg12yl1lxnpc05qw1dhqgrwlfwwnhy9jpajqj4cqkvpwrlxc9wabx17yrtgv9y5bcjd1vmqa5psnh737mt05htsvmgprf6d57x7fv3xzj0hjf3genexqzxlabfzu4ztbmpl3lxw5ysrlg3perzlqaeyp0koia8a5zj83o0qpn8bqz73zqq6u1h3qlru9hpqb31tq08i42r76nj8r8c836ph1wrkuvwl6q0tn6cc5vu48yu0xpkh791xtrslbqli8rhh5azttn5ghv0ek7fg60kn5ode5hezs0di9gq7chb2r2b1r3cordy99jkddfqt5hnwd7e6t927kt8e2jzn37bb9351oxpwenrcb4iw106lbfd3lko6lxnvysep9ty9xfpeau53du32di46hmp4zzbrz6pxz7whj9kkwzrmlbwjf7quemlz4s9ilmznt73xv3ba1jckjt32hx7q2kqupnym462rk3zecxx59fxmqk8fzipyvvz9gm40ldb1q1twwxlax3sig314kqe99x9z8azu2r5neqisd6m02gskg6ldpmti61oid211e8iwdsc0jclldzat1ip0yqojh10442x08cq6fjnrad9krobh1a8v1ljulpfbd075gl4tl3npwwy6hhi6xix1x5gmv2qdyz7shy57am1lk2',
                expiredAccessToken: 7628249670,
                expiredRefreshToken: 5940131679,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'XXXX',
                name: 'svg6hi36ih3aoelu4qa4le59mqsy4ho0q1g5sk071ap0z34aaj0u7oaklm4k6dzqo8iqm7qlwjffnu2dqehljegdwejy9f19o3nst6bnpjj6yn7u36rjakydhncqujv4gnjikkt9pf8fuk3wyl0l5x4d00x6sy8guiejm7j12shzjmr1fwncajh1xcvpcudj1gocj34r2i3z2dt3m3udvltbnheln4z19vd76e2ufsbx269gwks97h5ilgu2awp',
                secret: 'dln8abto45tragr68vazg35zhlp2bkjy19d4hmnb1tucq5rthsoaqpi09rg61ifngasf42kofhl9uwmikp4xsgk3v1',
                authUrl: 'iq1ol51zd6crgyefv3n0x8zzgg2f9c6dowjml3hjdz6r73hyu7697ngxf8lgizokp1749k1i8oy28sj9c4vfeuu7g148lm11gixz2pjaygudm3ze54o271i6c4rcq8rqj15if7mn6lo5dk7cfupz6wy44pcewr6mm72fhklvsgmuwtfnzqqitxmskdg7nqp9sg1ze1s0xa8q02xy8qzudsyfvdvhqi4cndagzglcarimktb1p5up74d92nz1scrgzbvpgf0v6re9qzzx7ujhwdfl5uk6aenxe5xqcgas0rh69kimwr2mvfv7ff2h5eh4whx5h2yb7w3kcscnlsesj0iv3jaf98hmlwoyy395lbx11k2zr6pgrvco96g68isi7tu8ewicjzk2ijasuz7aemtp6jkg8gs3l7qusnow39lvnl9zsuyzoj8fuyn51bvz4fts8l25yp89euj86cp490fd9f45khydy9agtj1assayi5phkdtghadp1oeprktqguuenuowxxzyr7q28z63hkammipxm9gt9lyxqpqjb34e68lnm3ja121a3vkj48zzo80v8ob0ckgwei57x3y5y40fv1wu72l0yz0eqnkom6f9527b15vkvaiwcb4k6dnu49lj3lycfbogwoop17h28abvpexkqs1eyqtlbje72mq3vz1531rf9czs5n8hw8v29alq5r0ynt2782gk28z7fk3gt5qw6uob4tjb1pqgreskb9ny4ym55s2fy0g9fqho1toxfaqo93xxeva9efp4ot8qngv18ngemqhuj119cy3ynobw8wt24di424vrtdfcqkg9tywztwzayuuqeqp75q1zy2s23rg6658t036qfnrxed3gsotsmq4kdb5bspaqlu3gbnle66hpdsgczhy55a7h9dz83ni3s9795teliayjgsp7fxp8r10xlb6fzb8v5lwzjpxxzm8g7ugvy0a32unb3g6b3vgahsl96364fvxvsxi6gbzfpuzka4mka0lkv4s0z808uinx6dea5o6otxq01is4hvcq2svqpqrd3y9qrod189j3cf6g08o1xq2k2h3qva5jjfdlxc8ycwz2vfnyoyawucu2a2vsygckai808vdy6twypw0zuoza4hxz8dxiqfl7tjh61pnnfo5zt35e4g36afk6e1rq3avpmelglzxe47pkaar70ojmxg6j69g8swu5kfsfc65ezqmpbqix2un0jgmmwx19fgn1b8a4099pxdagxa987typuqhkyxfqgs67fk4kfys75sqv7z70i4we8h1i9ke7e886xuf1zinynbiukb441e794cgwlvo22bhpmxhskxo1vrpj6tldphwy0kyh6jjsn6ev4fi4wlvk5fewhkme2orx42tspqafz2wb1slwth2kd012e6vobhuy31ser306sudebzr6qfwd99fywbr31jt649suhn7nvtq952gfe7qz946lsbvi347d9n88tnzuwy1ix22015ij9pn5chiyurlaij48jldc74fse3kzhxzu3ieohpnexbc75646zmb8jw5fmbm916d8n4f2za9donibqc1klu8tb0oow22gr97c2abjzj6x0emreceaj4t6giz9pxqkw430uxnrnnwnl6j1p52qoughbxxyxn9ipju2x5fs8ul0t80z2tpkyt24c897jcu5ht5if98aew41d851wzt1pe7j44fd9qaeiww4ec34tlzhprl0jk094d88m2tff4tb97x2s18eucjfzlkq04l2y0ereg64ygdhshx08pygaztctkzpdx92tvnimrghj9takqy3axa3borjgxcwmhh8y0sccmmy2oikfcwn5dn35gg6pebjoenxekbfaocndv5iarzkbu1drqrixmqpbo6pg6gsi2reztvvd8rewykjbx25sp8143i19nn867c5lrrcrz0wrfikegb73u0cw3531f69bu5pag5y15nwgt7hzytf81dxz9oiwjw1qkdjob8usxcxelzexnrhrukx0yds',
                redirect: 'pt2nipapzqba4nh2fpid6fy5xecwg4td7emu9ena5d37kijuz7l9r85z9nxn07bcq3c38v1dkkvnpaykjm7jm9cp0wlv57z0jiliadg9gve4wpa7e08zgfyu04thxh7umqejzrsm1gogllssbfr697lcyxppkmkqa2mi5i28wl5f34xjo9rtx88c8brel8aqi5z73wbh2gjcy99tthx4ku7y79o7cvjgczsr6p0cth2cbcz4f8ojc9uv8u38ziufpku27qlpknwq9mr0bn4io43gn2jbkaazi8s8ytlyhc0a4nlubtqldp8ya6qih9zruxfumlzi1uzbmu4n8wr39vf6hwn838x84o5rimzfqw44jsa7shcg2too9civf7z0jnaiayxs8b3goz1gfa39nafkxacr9yv53kjqdunx354as14y3uy0h0nwfy8acmwqggezztavqjb31pi0naffp2925b4be32zv8lw7q2jdhtgcmf9w0s07v8crh5o4zv4ns77ylzfrh18lucd360y2ttgbz83klt5ii7s5eusdr1szpu7g9jbku87np20hurukddbbhamzhqqluxm41wyray6efex3cc9cwal2imc6w4il3kmehf03h1c8u35k8t3pc6ctuegxqc9xd6io5qkbbxhxin4deqph22udz1dw97dzoe807876yd2grbu3898k3nqriw8zwvvkkj5xijloshkc3bnmc1xaxgflafqhvmb91nuepk1rz3dx8kftrgiigu8gbyjqamcvawklq67javcjjdk3phlmv99l824zx4aezt3o9ioe7xerj8cbb6b31iiv53pue9p5yhg74bj0vejq9f5zxsmah7x2yuineid1d3iklbhx0zqen3v76prmdaiak2adf77w0y4ob9at7g8numf58e2vk8won6rruqxtmh6wy4nk35bxrurrul2kfu4y9gd7h461qmdwuv7ln7dd12f3ot794fpq4r0ajs7h1r4kuxn6xxwzzkw69wvgzuyeipjvy32ci0qi2akhi45jkjiv7g2dkz98clogb0apz471qr0r8awq8g9fbxzj6gjuy8kkfoqq2847px28nt9bk7il74znr7qaxnikxnze4o2iv6r7k68t4rleh9mh4vx34meb3n9hitcd9h1a1164pdw4zx246uugpvn5dxxjjlb1v3hzen2bjm7fy0ml67clhko7s3g77i8psx21d0z1odretyw3a16htxwak91e6efvx2tatc4zy7lp5rtl0o4l6bcdxjim292m4j6edo7oquxquek0afwz9tjp6zqg3io90z451rnymyhsza0opy2wf0p2qky1b4vcjngxmobyc9esmpik9f67zqfgypjlh57ttnatj6a2ra9dp61so2scbb7ufskl6uzwe0n86kso0qbb6owj5kxcqwoxap2xf4552qb2o82733u71k8p3sr65bz31hk2mkgd3kzbvtyod739crnyragydvunj6w4lo3bhew9affptw2do04szip7y59sfrcybifmsxu3enyo2hfz1gu4095paha80s664ofjp600i95fabo3j6w76z1asdzhr8xn4rcn2mtp78wufvnin46hjs5awwba1hty14ayp1igcls7loo2r2eugi2j6aru7c02nk0u9q1u70bf9v9061k19ween0wwamsuzd09k7nlfb41feteyb4amqgcimgf35bo8s8g7m5epk4f3du4n9yurycbhgqnyqdbgtlbhkn59963vovxa0748r5a6yfuk3igpexp2ixqtgezv7c6vcacebpk70m6pj526wi08v6s9iuy8j5mr5dokb9cgtly1wwcebjc5di3h3qk48yw68o6chx1mrxindsem9j3nx3k3puagwa5bthr6gnthvbd1awabtd835hdvyaeafx5c1ku497tcuohgl64muqrbgji6x5haeybei189civkkmlz965lplqpzeld54tt05ejdvf08a6wcqsgxofsub03lrsvbn3srk5vyj',
                expiredAccessToken: 1124447204,
                expiredRefreshToken: 4563343553,
                isActive: true,
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
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'n91scx32mmmiouhrwxdbc80855c1ix3yr4enhax0ckl41vkxei6v3l0983qn813c5vrcd150mc60a1dnph17j5rkgfa37d56n1ravc4ljuapm5uyxaewhst6un38o2kfgajy4zqmqndinhj78r79wewhvj5jpdtgk973mcuf7zd9z6c3ps9azmp84qu67thn5k209t8yzc5oj4tao0blzpghxjaok1gwvdtio9rggawzvmqtt81hixwbtnhncv4',
                secret: '5wrz1lmlgna7yoxitqn38pn3bec5w6dhcup73p76kw42yrfa0sf2yv2iqyv3yxucdtw5zbj4h5i2g9a1ububt54oci',
                authUrl: 'tpw5ovz7rwwha8yvedio08zw8kqrm7jbcyhpq01gki9zuwtyyf31ibr7euf4hrkvot54mbnsmti5144wcaoy4qjerbowvg68zc40s2cddsif8iojjjbehhqsjm3a3e7q6k9q9hnewlm4q1fc75f7tkb5yqo0ephc6tv7fj1n56484hx6eqqtqbflr4pqk5qfsx342rckrdwavxhojbd4zbus8ycyuf6nrbnf7nz907jnxqxjyhfb4q79ex2m6hxlop6u6xp5wwenk8521qqr4os47ko7x1w6gtdu5d2mcnah8vflzeq5wtxus9e5x3scpe9heq3wfmzfmviqh5svz0ttv8z9ma04lu76u07a88esddgorrriayopbkbnrwpf6mfkreqeur9gh7ch5yztz7la1qcrx1flr0oni3we1f97rvlaklajo11l990j44zwg9cpct6s5r8yobbfn7vzqs3gjym44uhn6o75sl36ekvql0vei0cvwznnvc4we7pl3cf2uiexq51l35g99w5e3cgph66876j0v7xfkjekjcttmrypid6kbs9jcbsfvgaoze9fvaa24q2f639yvnugplon99l2567m3lr1luphnm7h26gi2z09idmz4bqhnxfaimhnszdq68rcbq9yca6yradvv57wyrcghv2iqir8cvbpdmu6znobzffccztgh8w43jrlezwo6zwz74b32tt6wekx7elgjfb8ahce1ftmu1imd45qlip9262ok0sbeu5qlzxfvr00os4pbpyl4z5r9cs38knquolbe49lqu14ychsqxjcp1esp0p8c1nwnv6zgcclpl8bs9qkyrw6cta00ic9xnyeg6sgfuopcshl5zq1e8yuzpkfro53j983wshv5eumao96wl9bkj3orq1opl412sqg1855kagcj6he9oeh658ptlpyg5c3dwdp0k9nva4yq74fxg1v6dr9wkzlkmvqnfnklwyl6umnbjysys2ok2o8c2votg1n11ciz140m9tpa7m3zjy4ntuk7bqvadcpv1zwz94vydaq6q1g9anm079zn570k9mbu4360nl73uyohn8mulz9lhct6w5orl2hw71b9da6p3itcnpbu3692bmwnpsjb20lxrabtwk79ultdobflnm4xtkffvl52o1m3fl0aeknomymamw78rav72cj3om5s6fgf10v5ldblet9vhpt88935cbinvu2ax6uem318xu9fwnzo55kywsx2js754fxswp7jbijgrqloy009pt4mkzlo67f18zi03l6djvsk4agv2j2bqiebw81fsdzj1wsn61bicyj71jo38y7by12wpfbdm808bddrs233fwoctcf45ulkn0mtr28aacpcet7sb97igz7kl4qa98d71cl7k4we1suie2u3xraltd01aklldslkukgqg538tg88kreas6sjiel0zxs7bha4vby3kpfmofij0gwghood8jc3bd9pg552xgs6dhctja18vu40ocx8ardxyse14z3t9eykkk08ltljwpqxxtd498jkzlbc7h9px27p83ebmzb981b73ue7t3vknpw09l5mlxt94zo3275cbrfevofowya1kwoeqqdvv4buuw6l0x2nbhs6bw0i8uvg53z6l2lg1bugum08p95yak1jctzdrzgkvv85qsf356onwh3xk5vko28xvotibr93t4u5npeidhoyydifsfch8wiltjsklsaup6rlj2po8h7kg6ambtcc3276efibog33w7qo6cv6gzj1e3ior0492mdo6q86bloxbde2e3uy1aa556wed168an8zq186nyea72p8xymjdyiqxj9fshkc38d3exugajr8ubun1odlrll5pbz7lxx628wuxkyg0nfw6dtmcfnjgc91w67zow3f6lf93tis10uunxqiwl72n36rfq5gu9u7bn06lj0gg6kvtjwvih4bjrunriqxu710l7ikm7ppv6aipxknuhqy2uw1qm5ylguhi0hkdluchm8z2ba',
                redirect: 'dw1g1g6ic83w5fasrxa9og1ao5jyi6b696wsbbqwgv97zsyjb2c2gecon6tzw530mjrsxz5h39kubdej7pgkmu33cifwuod3noqk69k895njtfz5w82s2ofnvpxhbtuh57iofpvad43vu82v5xzu2vh74trdtvw0wq77578c6ysjgj9eke9plffotwryb2wr7votekaqnq3y0d7hd351jajcjqe19crnlgciixe6gdmjqzcu1nksdnrrhwzicmf1l56xdmkzztf45vxt97ho2wv7d5yv1s8t6zuycaeaczujstuavh0hyxdl2pb22nfoa29v8jdosn0la5veq5khwe0irx6tvvtwtdvvrclf746y83eiq5zr5bt1d1r4sk0u06sw1uslmnn1vh0fldnj162aeogx82tvjj6zslv17t9j569dv1zeg09i70q8oqiop0zbzb775vb7hw8ksaaq7yea1orwarbmf4z4ocommuk1cgc02517n6l2du3rg90fdv3cxnhfwbkx8wjg4psm51vkmykowtt2mxdx1qn5cc3rgea52t40waovf2kbkc1cmjzv8pn8gyipblmhpnplavw64qghjjvpazepchit0ax7fvl6a5cy6ld63dpwit36llxbqcz66mmtf7xsbaqqztbnnbsnmi0rpc55gbosfj7dua90l2dc9ywim793e2zr4s23xku5udvylui8voxf5e1qk6yppoiwmva8aoxso5sltv4fj5uzzwiygpjq7gk2lrwae2qydup376ufvylk62aw18l1p474ag74uxkehzhm7cmqo0rjnaeghucwfy444ypvh3yshezagup68x9cug3whk8chp477t9eywrk94r495kkyb1qzfhxx9bkhhxlmyu7er64vo60o9yaipwj59r1z5my7j0poubq7pxfz2fhuvjri9byu1xxpkp7094x0n1i1dbnk9zngvcbo50vzfxt1d4m8dlxl81u0q270rexhubo26t5p7i19ey01gu6rpupeae7tkp76k0bxw9crokpbx8bzy88yb4rr60shntge6yr6lujecoqdtwucko52v7gc93p1miz4csa8wgnu1ggrxykaqrqzxdn6dpf0x2xdko0i2cs8o4bocwofj4chxgxssx9twucsvsq5ed4r2ac344xwfneebfmms93ettxyar81hhds75hta20zuts6u398y46t76hg0oppcecz455jp84n8izy0zyh172nfk8olst8i98zro7mqmwukoj1n9p71zq7mjztu9suaymf6ugu8m6z7eai84a7vyh8otk7ep4uwnv1vmj7zjbpvprtmucbckg1flqaiqj77pn73ayxcynf9kqwpt2fwxz3fmem9eak6q4666izvdolmtf5vs8ba9sprzrdlsd37gxh07k9uj8rdiwcigfb6elxidp5s0zc8fx5855gfgvbygt8y53smp2n09q3jwfojnp7ge0yl2n8s4c39bnf4krw4oj4e94l4cxao1htz98f6b1g0677nfumoqwsf0ajnoxbue2vz2dnprcmnlorjg2r3fq0o0sa5rh52ikgkkaemzzzzpq8c6dhapisy74li785s8o5pab98wuutxveoot35r6rupd20mhbp2092nrlelpji4ldfzjyrzrz976chxiut1esruf6rc1ectjuekt6ins1nrpv7jqwrjzgzephahe0fzf86kcl0w11q0sl9dly2wymdfiuxsynvmsigm4gt9b87b543mcg0agygfro88l4quu9s7oodkofc94jwqxmwayhetywwhq6f196oqagj783yi08jjlgt81o2h9qxmpg0vup7qsezwrucguv6zqaxu4n7cou5c9k98mndoai57kyqpgjklkuo703wn0pwcu19yycm7e4l2zj28qeimp6oqxgczi4bnljegdn7nl5gz7lzjvhazla5aysz0qefzviwexb9z6dgts1586bxfdkveu57hwp4vvw233vllpozz5lfd45tkjfs33xt7h47gk',
                expiredAccessToken: 8842422268,
                expiredRefreshToken: 3312591558,
                isActive: false,
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
                        id: '57b3ebf3-ddce-4552-96de-1e172299c2d2'
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
                        id: 'a58ae587-9f3c-4104-88d3-53a89a47784d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a58ae587-9f3c-4104-88d3-53a89a47784d'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/38d15e45-354d-4585-8280-752adc3cb45d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/a58ae587-9f3c-4104-88d3-53a89a47784d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a58ae587-9f3c-4104-88d3-53a89a47784d'));
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
                
                id: '54210b2e-091c-4e14-b4ab-fc3ea268ff51',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'vsok1la9yeaxq7xl5eu7b3duj7ppcjjbfzbi8j1ycago770psvnty8v1fwtorq1bgyd84fzm6w5o48gnyszdoso3ql1xvgzzuplvvqvixj6lz8vwg88k6mu4tsdb6thmbwx95u6n24176zxs1c3g9uaahew2dk1etuptnf0kx702xfe39i645ememgugs6o839951dpmqpw8icss87qvj0gylthk5h3hrnr3lcu8y5b55ncseuwfd1h7zwzj2a5',
                secret: '5v1wkf8jzhtw0mb1vw4wqaa97t3cd2vu5u0q4h0f7scs8ht8wpeht7e940oi55o1rm6cyjvtloicr4fo16lrlh4gap',
                authUrl: 'arydf6wuu1ev7zhb3s2rym0r9dci1p0e1yfb6zhi3fj4yv9tzvf6xgrfpcwlt47ei82kiz22679lc6kf0cealzgyi10wsujmaytgg6lyiqsh74yjxsdukhl2r95iun4595su43h4wf5wcqbfx1tfk2f20rorwqmz9z6lsbly9s1xqn9ij9kgwhuk4632lc3mvjq851xozybmfo24705zkej6dhwambgwmj1vj6hsvnof2ridqjacpy9oh22sh0cm6ircyy6uwufl1ztjh6fo44f26wcjgedi2zcot2dpwini5sqajyjvn0itdj5fnshm33hv76uyborkz2y7znqbvtfbjjo78f5bqtw3w82x9p7u9a6td2ueyfv1u0g6kg5azodgu4x0pvwfn761m9mc7dqotdg11ik856150imsk1r7wfzwzfk5sahwnmi2fyncy9w5yq5saq02p9jjkchxoqx36f99adn93stktoy5ew0lhn647xzcww6xpym1py1blcoix14qe4fnsp533ajpugouk4allatat1xl2xruudkiisuq2f4kll8avo60c65r4iinsnaryprt13k988oz7rzjeeqfp4j4h7hnhlbzbihp07knew14w2lumbi34kjftpslqo29vueuyyfy240wyhkilde2twt559bipqbiuutx8ploihajko4aa1por7su5zl7lb7ae7o03y6mef229mocgwd3p4r5i510uebckj7rb1fx2qcslgoqydjsj7wny836fe7ozgysmt8w2uzbqcgmbg0pif5s9l17oes044f4ikz760gmfwsa5t5kfje52o8iasmn0y4wwtrbpgqiz9zhyzkei6znof10pknnlqmwz0m34f4o3lbo8b70mtug439ywhoj51enu3l9nn5rnyx5oh13i5htsz9t246jf981jlk0byijalo3v7m2jrivlp0ca6tpqd9w2aniy8cye5cwawm3bjav6nz6aeavlp4y86h95kjr2d5qevuxqbeevwkurfxe4uf0av2y8agi0fec6hrqyys8fqjhqcpfewj76ikodsx2a7g00hbpxy44r6ywjdf94pdzksrrm3ubvyjz7a37l6m0tuvsvdwcr8h4073fw6sg30q873kakxo1szkqymabaunr8lnjdzxy5ubzjnhmjzfgv014s9su048r64tngwy82t7fu7f0juelhst3wndoubqk7ima7i69sdapt3rkxz8rcq5kqie4a0ycc4h35av3r16h6fojsim1oeg6t216l77bfzux5nmubycp7w24x6zvao41okp656ii8z7wfv6szn968wz88313gfy8qpcnlb4lt9bvr0o6ejynfmg27ih39vde68wkkcxcl6jtch2c295ydutekzj49kavfeb2d1cx1zkl19cjmw7slzbjy7vbjo0ls4jzf0x72e1lk9pjgxu1gdvqt0mcnedhq2lplt6x1r8fa0fvjk5g2lpczffdyexwanhzatqsg88g4bnk2dr8p7ckxmgz91kbp0tnl9bf1egyv4739ybse8gnwbzlylxqhlvhluemmqef30uzufly15rdbhjr3mempfk29w9jk0u3v4b4x3a18o5clj4xy91xfty1i8jvp9wxf1kk8w06w874hv7q5e1rwebkrhjwtg6ka58cehof3t9op90t3ltuzm3q9fur7dz8t00x2g6puo4n089hol34w2w4uoql2g6v5iuu5aqrnhrea770fu21dmgrwruqygjtu079og4nmm43vt4wwkb1ehixu3q8biusjjqpjpw1t9getvewm5v3vbs8e5laxi0ddubxn217184vzi3ymrw71jtntjw9902avx7e7lkwgih30vck2xb2fj37wipizki4whm0s8stmmx6xj2e18jsmpklliqq5gjmu82168p4mbv4ae8idb1nbqexfgq1opg24esjvx2mialqlymq6y5o0i8dch3981lumfy7dxewzr5zc5n994eqil0vitbh6g1jc15sqfjdmvorkb6a',
                redirect: 'ry1tmfbrk1v4e8fr5pdg4y5hhnzuphma7mpp0zzdngi65rm999q99ddkk00bghhl6qnch0zxg4f6eut3b9yvk96ox5jyse802oumnpgq3uyi4r4opi1x5qaoblw7khk41t8tno9u2995d6n14da37e4311n4d1mx5wew472dz7tf4w5xje9hqwoptw38mszhc1bmexpxaiolj0okzceouhkag3484d74pq4l5edwyyegfr3b287l8zeenlvbpvyv83v5zn3u26louakfknj3mggip7apgvn2h30ocuhryn8bvy3kenzmxl9yppnsgwoktexdegaorq4l3ja10kh913p9nr1gmex8pg6nyiwuqc4yxp13a7qyo5pgzcilzw4i7qspvhjve9vucefxaxbmzhslh2ixreqsglb3biami98vn6fggm0e823y78hin3cggvhj06mrh0pss6j2r6ixb4z9czrb542x97y7twmgf7ru4dgy0mdhoyjyjshb8yloj6g46icesc3m262t1aidhwfpo5ukmxxy8rpdz14j2h901gomqeupo2eq9w5jwyz95rctzmhm2bzcdavrvecri3yw4uawd7q6qb9wgenn0cs7awq6dmc1q4eg2oh4654atd8gmtfliw3gmp2nr9vg920lfvmz67uvk0xkqomqbi3c7rgio6531z60lk5m8jkik03b379xbtojvqq58fhbz3j65s1p9d3ftcfkj6a7b5nahp17bm2ollegiqwj7ra7lsonf61lw6hudvr60j2ozordclp0ubb0fc602w57xnv9xyqwt4fvsgc6gc9hkrhwdaj4630fes1opmesbrnq482rj3ikohvzq53odzzwr20u29m29y63q7261qcn36helbbizt6i0rif66rj879vgazrpxcvdlxjdhz03nenaq71xcca7ud32ab463od1a2lciebdk3wp273pnboz3vymp9jhajg68datrajtww5lbz49ku98fw4qidjnuyb0yddcgr0gtxfiaiezg85s7smd6q9vy22v8bqrv55ocxtyh8qhbvphrj13j7b6j3wsp8m128ojqkhiw7jv01ee0q9g2j9ve1totxd65n2n6tqmvjooiekibe4bn9g04df1yq7vxknk27tya3f3uih1qqjnaq5vqn951ouwjbvh6nfg4o6y4xbj8anu7h5z1r583pm5zaqflpasbm5xjqp7ffu4ru9w3fl15ycee9yth6g4u03jm6asuwyosor4fz05c2dcoahymu5czocgy8obn1qbc0q2scghpesx982rpirhmo99c59tlb4fx6zoqmax4ghisxusta1m4jbcqhrqim2eo8sc3c1a8eyors1561v062mmhgjjhem2y7094k32u879c486cbm0ei8qy3koxr4re67o1lsjpbkx0cgab3z2cv6vmye3byr8otfqiyxih19t2z1csbxa25fwv6jz4hgggmzl207jd6n4vw7jpbdc4l52654pjql0k2dx85frkjubhnnfdb08y6357l4ey4mh2vfsfltahrum8mtab2oiknka0afvfyr810nhev1fmpehcihlmnud156vv5ffsosmb6lq3869eywtjnqxolf4iihx8csl1y5uub2tlrcan8d7dpm1bs6uj2q4vxd074iesmb681v8dqe3lb8utw5vcz32kh6jf57pwdta8knnlsria269krxac9mwfdu5r9d2w29gbfd870roewttj69ueo1tvqws57zwe73df88wttmah98225j7lb1kyqh9ozg81ipjf4jdsm511td64xc982l4ifrqvnf1lhez13jbaxxpir09wjq5ps1krav1az7wqqx31bnrrwlpltb2tfox5llfga9kmrtzm83f2oms6ofmnrro7ib8c9nuxa10a89ab8s2p1uxgdvlnp194i729lcarnzx998fo6hbb29890s5fbvgddwpnlytmbhypfkehqy2unruq19oj17bmrjirec0ndywd6u6fqxcavq7tdd',
                expiredAccessToken: 6995519793,
                expiredRefreshToken: 2915941281,
                isActive: true,
                isMaster: true,
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
                
                id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'rqziydta7xsekaw4lyj4lyp9z3478y6tate92rwjgqf8axj2qiuwel602s79dzf8yrk5ci8cjl6oderm7lkn1187psne9wu79ovacdos4l49f2e19b995oc909iidpanqiyp24fh77um47xppzzw2se1ntubptki97jgbtpxupyio1zuu8put1kwr4tuvn2ebsp3xu9lu29vjh44xuapiid97kj8ov3oytxwnm0xto1dt1k8d7mkp80ovzn3g47',
                secret: 'hcmsci1o2lslo8j7rpdb5auebindb3l5ubwebgoqig1t1ah9m22w6l73zyi6tq4xev5h3hreu4e6egtj43qtza6yet',
                authUrl: 'dp517ox7pu7nhoh03fn7p4xxvul9kl9pkkubhesl1n84w154pj5rn49ks0nxakpadhcigfht9hnxml0zgh712icnk5unkdejoogio9x15mrjirce1w27o0pq1pkzsen7g26ncpuuhjqmk5fbf4xoqxqik2e50yafj59uy8d143utq72m6awr6cfhkq7wal707gtw2q3bprdreo7ne7zsn2rvsh73fg91wj2ncik3t5jelq3e2pt8p6yo93fndsidlrjatcmq8mir6lc9pue33xj9p0xa5fzjd455058pca2qna6x956djblnmce6yskshacnu5cruc0q33akki1bixvr0pqv0k794zfrjq2mt0h1krw6oickjc0io0s815oquwoftzb6gudum3rexrdlncj4rgw923wl8g2fdijevjto8h0uo0tf0zz8qa24iftkubb7tabrdefo9igzmzefze9p50bowc39oc93mn5zt0756lrxf6z1t6kc58bi3x3adzkr2dscum7enn1q1rawcd3ycqd3aktifoex0u428u5zdxnbjyn5p8lcxpd7718zg14rmgmmubkrl6oqd0f82uvdcqfct0muxv228l23gf7yl839nhp7fgr7m1hchc4h3mblzidn5ppfv1a2wytsdha1y5pgbvgg4z0tvsk4skabd4nc4mcg4j3vycg80xjake6xlytsbkxbn71ow6cg7zatljbjzaixcw8ybjuirz3r3h31fc75c8mv75rcpte8luz34veux91orpvtyxsdga66esoxf20pk2dkgbptnu55dwx594kiuayqr650puj3jsjwzm1uklhl23iucit72f3nv7vbeek5rezshi1z4puoa1n4zmwznnvzpk32bk9d43w8fptyhhzwiho5z1n8amtbak7ysid9zsisnieh8ibgfagj22fu3x5kg0s8y3qli5514p8e0ux6eny2qjrqegi30rx4ljgf89ht0fgqaf3b59dbcyuj6xguase3wsp65g6wgythkxoevdy88w8p86rhoohiehzlcfr216s2akj79lpadqcnv1t32bl1i4ea1vruz16sfe6ogq39o93wio9hx81dd7z2s5wzeo263iw5fx106v3q769i7iynfqsnd4rvhrxzomlc9p8bonb2n9a6rutfa7cbeb8xdsobua5g9qp7cdka30t8m5cbvur7a471nkvpntcjyimnddghzvkbeza5feifriex9t7cak2wcrdxasfk5tnewgnyjymeu0dcisxbs8pejieuokmikmxmunvqph08ed2s738l8b7kocjpyc3t7rtvnrntl98kj5jaemmf7e84zpu36d65pe44604uwp0en3vl149x3wpoct655ev868236u5wozl4zhrpo2m2mxc9kzq2fvfjxgog1efmjr47x8l5emsuqr6sec9tghupiy41pbad00djiyj0o0majsyone8u3yjcetd2mlg6n83n0l3e2fgcclj6o1k91tlm14oini8vdierzlvkflqzf4z6dvaeksc3zdjydprpjvax9vuqfp6gci0pizfavvib26ehvarzc3c70rwp74giya8b8oro9perltjj7xrvkqg0bjrzvtbvj2hpps08111h4yzaeq5ni36ef0c9s1a4yx50wvx9rm0oliuqsf9is9jf6o9sxkv55g3q4nqwkhb3zfvm91u18lkgul9bhnbevd4peviut983hbxqdpdmmgl9luxr6t51v2mnwxknak2e986pq9zfsrhg2aydh34s2k2cfu5gpva80abq9aef3oxcy38su0t15aemgavundm04lpi40bjs0jnfo9mliy4ejuwy4orou94fbeqt5ji05swirxkq0kg23yvr12kb3yrro8j7flxt0bjez2vdgwni7mw8vimwrarx4rvpgnuo8fnncsfxl8uyronzbm9150454napi772s8xt9l3pqp4vtbdp7sray6tzln4ggtew0jz9f3fyij9tjgkjj3tq1wjy3zyq7e9a6mw',
                redirect: '1itkm0ofzmk6j876c0uejr9u7nl9ug2yat07ltonhquwtrpckmlap93s638jknrrghyardgt6dkmwcht6mkp97xc870qgrc37ikk6ghxpebf59c7tr16p8ydkvttpicy7tp04qtolxrnnm7f5p4e42pnk8o02ih7758mjivc06o4i0rtzgcr493tkxa971z1lwazpsnhxatxsj4tasjqa5hd6rdndlahng769wzmoso7p9lrcg7c3dfeopwn1y5wzjvxzf3mog6a4ivbfx2sdruaizajyln4c7cdsqc64g3wjs22z2d2pgwqcflj20wm476q7ngggcjhskakvpjme4dtzeod9r9hx1ok05m2j1djb3vzzw1w6bw7bp0y4eeirf4gu7veakk1vkk6vfczrgpff55idn96aek5tbcnf8sl9b4pu7y371xsbf6cxx1zg0y18f0ylkejd8ayqo3s52tx78yxidtmbfsnfn8cw96kp3j90gay372s4gujznxy1tmcly9w61y6v8huu8t988tdg3xu57ndtkv0i76s1pk3zdzzopzjmrco6g7ah4fn7fgvz4k9xogy1em52ms9qm7mat2kddmvupo56gv1p02ga4etup7uq492tqynjf4ir1ixttri032exefcrm2mp1182n4lnliq6hun0g2umgmuwekow5ek1e1lyfx9gn09p5vj9gkfijjjb4b1xhsne42jqisknib9xiaepmtwkbhw2z19ptabszq7hh4hjuypq92o5biqyhj3hp772w4chaerp4qpqfyewlk7csm846x7uvgeqpqofhi5pjfvytjdfkxsy3zzeykovdeckgpqrbvitzkxk93in4r4032lq7oczamdyq4syg6f57co34mt4z24ft2uaicsvba1ec6ydxd16l2guv5k36siyj7dc5pl02k4tge8anv5vmuc5vclua2w6xeheth5ffhmzg8fxm7xf164tx6xbedch626aw4r8tuspxdkqrdklhae62uihzr8zp812vf5nx12ozm3pwiom01ygzvc7q22iy0fb51b0mvxj6qatjgix5gp1tj7p0rwi94ba9yw1jbrn0o346zusg9mksjqdecsaclsbnd61e8ktci35t48p3a69eqmq6zt37vm8f8pw4cjrw8frrv3oz367l1gnrm4gcvdea3o1kwc5jqllcvb8k6rohe6rmbbbx08u424x6pc1nx2mkjpl2pr9xonnb6ndwv1i95ewu6ib8pspss1mnpx2fyehxoqrl9ualtbhjqglh9oxf6tmobufuxdhlijem1avor2djci37nm2p06zj08gs8z98eabsei3lb6gcoxpigojzavt42rezds1mnl2dqvmrq0pxqlsw2i888xjmxn0dgnkzw8ojz0kmxsmp5jrxuzzfol61zk06b4605kuy4id54u5k9iqgrblkcripz9e5x6eqh70v7qhz0qxcohedi9qdp5jgu7stymsp9ur98tx10xyc217j55291tzjn0fedt413z00y0ax9u45uh5xqtey2unrpxmqr8pbca4itr4wp9g9dhua6af2bh7etx38le2uhnp5befjq1mxc4pqfi2xgn7wfv23lkxyjolesl81weya2ed72o053bzxbeuru4yk5bywfwavp3z2cldx036cvf45zqookprrluzhpjn3jk8z9g5g22zp9luszqqnlrrxiw9ntcszpmgn63rp0rz6t207r5ncz67dk63h6i3uulpy5s74bi5zli05qeoszabd1n2kl2yz4cldcqrb5olj2wqyqb3at9zyo37lzkxj822hgsdtzqxaxqkjp3cog042rcqc2flvpspcne0z4s9ibsmhjpzo9o3iy0ud0p7o9sxzbhltlj0601jr02k3rs7hkpts555t08g3ms1fqshc49l0vgr1b5noobhq6wmtnyef3qzdcxkztgm57xlii28a4232llvlnfohh42irwtiio22j8ejptv43emyuydda4sf6ty9cui7ru95tgiixg',
                expiredAccessToken: 9557745553,
                expiredRefreshToken: 9492450014,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a58ae587-9f3c-4104-88d3-53a89a47784d'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/5ceb67f3-43c0-4274-b30f-8c4d060801e1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/a58ae587-9f3c-4104-88d3-53a89a47784d')
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
                        id: '4a1c5ae4-1d7a-42b5-972f-a64d3304516d',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'syvesl87y6qow4tk5zyqofxnj52vfmcndd6adpvjem3mfr7ku960qvk76pmk0libut78lyr4bupc5h068z86j6r0ejj5rd4v8t65n4gc6dzfoekz31g5rvccxc7oqpocvepobi9ripy5egoiyq5cj86ix9a50rd2nb90j913my3w0xqzsebogmlt03oqzzwaxunjwfpur7osgm2f525dw7y03dp5y8iefsmxkt4db78nd6lribr4c4y4srkhun7',
                        secret: 'ks6qzgr10wv5eav1r9tajsh56csbz6wfodkf9axkqrgictroy2jswwz7ynn6ggqigsd7vcmwo0c1859noknz9tn2fa',
                        authUrl: 'awud3yt3p2vudx50v8ret016fz0sqlyvsrl5duot1nfjj65b6g7y2lhs8sooliebjyufq4piluru2o0mk9umnfvizsxmda6876tmd9n1y4jw1ljww3f2qry1y7348pdvy8l2uh7lcuw9uslojueq2dbey6qezntbzmar4sy9qbf934ka5e70l97qjdrqo5r4o5cz5uszcv0fcqv57o3uzfzr4sd4ydq57mh1dxv32tpme89zyh0u2m8tr3s7a7frltlbofa42vrvk8p0gf46yefch3t5gmhgsy4qmxfbxxk1hnmd4er3xu3e8439erqjg8srnr8lq3anyktq5z3efr4918h0asw7gxyvspi7guhglqvekqelee8b9jdspdta5xv400jhh18ldvuwl08vxtfbd1j4yp6dg3qbxbxpy9jhjqn41ec3pfuff1ia0pncsp37zf8en3fj6wgkqsmzpbl7j7kq622ck3d5aplb6m1gleen4hgdj09zqbst9439zd1w3rnuivfc1fgtbgo7gk00ziqk4zoapo0ynl9xzqx11sqfu45ly4t8wfjo92189py03s2rqe5xbrh8he8xwcp4kagoq31w59c137boz1p3fm8c7zn1wri2jvukcyovy8ac6h8zc18k5obvu57cvf3s87tnu8as54ma31snnftkxd4yu8o4sqq52dtybgyebpbc9w158mctqj7xuukjl89o3y4dnnnzu2lvkonugogldpm85ayu70syi0apss8wfwsuxue35tmfu1kumnrcbidrxuezdhxw6oi3niwmvbgvmv7pq5w740txc1rwxq00luo4mc85q4j7e4dd8wsmo2jjvriq7smde9h5ei5onp9fc490meikdrzr9exgxb2aawksoch38gt7238ip118k1k3gm7e4g49jhvf3005plxgtqrw6n72ovmo8jang7k0eac62gemcca4l0yrger7whuowsl77ur1y4wtce8hhkiaeewgcagc4ny7rrecnk2g4f62k0dow5im0iz84vlo9rorr1l60dattroshjbwmb5y1txf69uw5w8w001wbz1r8fg2oj2c6hasacbo2ntm232fjc07jjhx4cmvu4g27bde20gcpk9j554zaulzkzmpigl6ncp9qvamd5jvyq4bgu0q8h4pmx0rycc37burblrnau152barc31c1v2j258e58jcktadmnt9tdf2ze8v27v9zackgy53kemssscyom9cfuihvnxu2vqnu38ze1jymiip1mfhowlxh6755c0igxhce07mkucdzy26eyqmxa2p00y5ps1h5hchb6s1w9o9b9rcd83r54ll2430c5et2itoirapq8dvn4uz3095t7ukfxm9pp90w0pyablmyy9h8ykcgryquyvzw3pgnzcf1seda7t3hrcngsqb7whl82h2tyy96b4uxbb4z2x9fmuecdwllgtmbf2eprv9d6kf46gv7jw48thrb4mivvhb0o6jvikbq124mrsb4r2gz85gdyfyoxs7kwgrhntdi943wvfmlnq54wo16tp03nc6dj22b6yg751z5qb9f63ek6xfkba1rczx8s6ta4zdfhb9y23p8okc1ufzh9p7t3pdhwqslckxrninneorz0dbumt2319jd6nm9otvutv1volbqiageim8p8c7tks96zb7wxwu1hgfr1trtc1kf8b77ze2h1chpr3jj9y6rcnkbiozyx9wen5k8xdsijpb6w9m4vpp544v4getsok3y7lel9uu1y9wgxm30vy76lcg6qwzflsd6on4xw5kaxzodkf0oykeftt3yimtzg4zowvdy1wsj5dqs7op7g6dd70ifhrov2hnhwauko5xqr44t2w8qeiqdt989n07v2wwmzy6mnv3h7vtomnrdq82p65lnlk88drkg1t225lc25j3gvjmrab14peyr7clmfp3vczh8z6nqtobj7ut1f3h71qabxmzgy5i18qs7mk9aoeixd3fyjvq97lfni3oi9f0m99hu1at',
                        redirect: 'wtx19o6mgr2gwx41ds6mm5xw6hn7hkmbpo1q3349ek0yns1coy79eetldgiat3br0831fg5sryv3aw95a5ukyt59u41gbgn0hhg0bjitkgpeabi6p2kyvr41tycf7jiwja2jot4vn7lddpgmtokskryrndwajefnh9chnohcgiiu1286uug1at554g3ij8ptw4az7f0suxip8clukb4nqmsnfus8sy041dwsjfkmh4k2nouawieha5vq235watrc49uanvg1p2a8jlneb0e3b6dagfnyr8ia0urcaltcxaowtrv2exehsuipepj9vykyejaqhn431f8bsf9ywl8s3dzxpyenvm2fotxa3c0irzfh4p4vaptqpg0opo9kj3tnozk0g0o8ijmy9x36ltfxvxhywa9jv15ypzqmf4ixap6e778h30xiq0ryopwdvphr8ew4qbxord27rbhynrenj6arb3j4bpjbyogyt7759gsyrau2wjriywy90f1afo5a3a60llisujoj22j86786aelpy0lfshssr7tw9dx5rwtw2nhk354qg2vo89anit9u1ii4y7vy0epe2lfv5wixu28jjbqn2a2vr3iamz7lr5u62cbku8w3x6o9goa86jgsdt3dvzk37r9pwe17vlvurgaemlonctcnqz45glrn4bata0060ocn5cf580szqitnnoxchsfy6gwwf3pik65xyzz4mlbb8y5en8yucb8lb7eby7nbaom1v34cfcvkki1ppbkyhjrxx02e2t2wzvmv0xsa0gq9y1negd4abjrlei77y8e3dn9w7c43p8k2386ftmvs4whmtgs3obotejsppxzns122j4ow94ol83myfbko528pcxnv5kfilrd88fkvojntenqju0x9jtxb9y7k8o3ojveb6pmz0evych7uaklmbo53afsq6hp5ciwo8n0cshy6t4b760zs7ynrwo794bc5gnrfwalq13gc7u2zzxylgfjymeh0w4kaeebf9ujb5bbm5f25ot63khhudfwwvcvdeiewiy0clffl7qmjbpmz3v339iwr6y9owqtl0qjcaxtv85k9615xxf56uw8qtxdv6dvtrbd3irblbe1ymdjtm400ngx6qkkr1nzi286jlr1tx2q62rw9xyo2c1jutwgr4be1ccvom6vd54iqpm8p80oemeq405wtznla88w1tzjpjtxlk1se0hxae9xqe0f5s21uwsl834mx0a78pku670fimhcei8tqqhdjexpmda236y0fi51p1w5rjxjuzmfhrvpvrwqioexl0x5y4y1u6swolb4xxrian3w8vpqr60vt88b6srzka88zx3312wtwwgf4csrirtv0qrpw4ey035a54vbsxuo0bek6ajrumyw0sz5ombpb2gli3ova446mxfyivscpv9laxakzi0w9hp44f3ybxp7s57ks5pgurun8o7mrgt202fqiq5n73g2naoirr5w859tsbynvcjx7dxf9cs2729davo4ukd0dxoxqvimp5np7bjkce01fb5rnxqbywrhiso6jodtq6tylxle3gyj3e26bo9auzxohzj26yws69v3imuyz3abqepmk0k2p1z1hzty3wkv2uemqttbq0zxeqtfdbftohku9nnp8r3wfr9cigqj1dmcueh1qc3oyikgng6r6ozdutej5lglj6jc55fb5dyznebmqbbgpuhr8kb8mzvv3wlfgx7zq1cf4uap52oi1hd6ia7t164pp6calzlyjohtb21ikq27ntsh5m5i3twec0giny11ajjen80976ztbmaquunecf1ttx2m9kjj4lez4iifyw4xe52pi2s0oyt08pn3ua985vxpyq5sau9egjzr4et8j81iyxw53d4yeh7b19viy5nsw11i2nc0l5gsvkwmesrbukpigdmxvrf2dprz4vv501zscb40somd43w2gzaqymka9nnwsdo0agn43gfaabgtkei9a3suat9kyc8bkl8zwp0u4hx2cpj553rxq191r',
                        expiredAccessToken: 1402500752,
                        expiredRefreshToken: 8282858085,
                        isActive: false,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '4a1c5ae4-1d7a-42b5-972f-a64d3304516d');
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
                            id: 'b8e42355-a0f5-479d-848b-6dbc3fd30d62'
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
                            id: 'a58ae587-9f3c-4104-88d3-53a89a47784d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('a58ae587-9f3c-4104-88d3-53a89a47784d');
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
                    id: 'b5c88cba-a8b5-40ce-9481-7c59eb79c180'
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
                    id: 'a58ae587-9f3c-4104-88d3-53a89a47784d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('a58ae587-9f3c-4104-88d3-53a89a47784d');
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
                        
                        id: 'fdc0b3c3-401b-4e7a-b4c1-3015aa0b8bec',
                        grantType: 'PASSWORD',
                        name: '137kk2t8369diy4ohnkiio5k9gakv9ogqxc70wv86afjukvzbel68ceh2cpgx7xc1wmosz9ol59axyw0jl8q5p4tdw7ccdhu7ljvdmv8bwdyjverjg451053fcfbeb8phlc10avqk907uetjv4sznyhee492rsyfhod5dnu3v89x9vavwms34kedw5gr6kljeaojg9urwibxblel7tj52hjrx1irkbzh5io61f5uspio5pjz9hvvysgxjs4la7n',
                        secret: 'pst6zk76tz6y4puhlryki75fsv9jv1jxhp2zznka6c778kevobvcynuz0pxejoa34c7mjasrrfwtr4pvaq071gcync',
                        authUrl: 'lc7z2tebikl7411y384s9yboidqy7gbjvht681844qnpaqy05zze1f1b0ofirtc7amo10r3ymrh6kptf3kyqxh8iood4vbruru3ttvi9jhozwelvu3iicj7hjeqezx8tb68j4s5w92as7a6ywri3jpoju9pmpa72kgi4mbd9vln1lvmzjefidupmugdmwq5qt3irly9o4kz5esivnf2bf23euk3esmjso6f9q8chaz92fjthh6kqjp8va4g5g0v7cdbseaqwybpkamw4331njpxyy98i1pm2vc9i7ed30wtn6iux483q2q5rl4zep210qkc8i7850dsn4jw7ggiithg07izq2fym91lrpsll1iap841cdsbwj2om55a2m7ri90amn2brmv72mecw2tm1i2jui6w7vbumvrqtuxz2jzuf04pci1qhf9gjfk7lfg915ytjen47730qnb64gp4cxh85gq85mbl5ss6vxpao9ckayuxck0a3h6vucihvkav8snpnoyfnb6qnlg0psglpkiws11ukj4p9kuzc9knugvpiyp3xact5m1y5vvls8209209wzy1ontomjvjenuripqg7dopsp1c52oouv7nn7dv00rpmvyn64urk7wolvquq1b38foqhdf1lgiqo01epennc7cp46m518fugrny1byinx0699rrest1lwi4tkiyp932pn0qm9gh6o4sao1mw1g5l54y5ln31t0yqdr7xxpuukmu4e8pdyks76jmhux30eu60zmi7hfo0gyjv6lts66l1ak7qob3brjvjebokf7l8bfv0ztzhb0y924l3f93c43h8w6xltszp2l0jzrgphhc0vnn4bbtfmg5qo2lxa3u0jty59qwd5g58b3z73tedb4g42r90n9nrozc2v6myps267cls7vplszqrr5jeu9gz02lshiwyyc909nni7kniu60fxs5ic1ampnwbw27vj65r9mn0o1soickvmlhhsajcwwn5y9z0rcld9p5pmgib5i7jpsa0tsgj95oxi8pp0vus1r20mkkeiauusb3401mkriberz3kp5n93zj3fxqjdyr7htoehtxpomgxcz1c2f1czmt5zs00oel2v8bagocci7kljsgkc3z8js4lfuijnmo7n4daf8s4kmorpqz4g7t7uwxsievmzuyzkw70hk96f26tyg8d42c94acsqh0zj828147luen8oxgg92kyml4snd035pbdo6v650v2pf31i68uiy3gkyzgecoaz3nbfwz87yom1sf9yy2gywteddj9utii7irdw6lzjyri3wb0mtxll1cp9bympdk900yzltabwid84focxutsl71bplh7nv0gweqsp4fbpab8ibda1qp52d5b7grk936bbh45qjzvxqsu0zlhxu5onuu1igl8mwuhsxxf5ntn3eaxojayq3z58mj6dij5hmtb94631puo45n1pjivptt1ghx1k23sxu10yt22febma6ppi99yutce4g71ryea7z2cj10tbcreiuqeqmdrnzgia02kxovjzpbir07x8q6rucmtlx1asq6lr6440c60x8uc9j9zzi7tgw7ppie949bns9ia09nbm1ix21gs24szy6jtsteutim5us1jegawo69gm880ahmqn7j5hqn33cngsbwmnmq5jahybcsl2c47ht6yfiag8mmppofwupo3xmx0414xihcpqfbvzgiq143yhs5qwn2x1t7miavya8hweudizxcprz6z8hekxs0e5osv55u9214e5tepogtwstpmkc6spotiuyyq9j7t7a60tjobmel3wzaymjeu5cywgb4uyq4ftnrycaz03vl4kq0aovrqcorxsnjrxo6ngy68y0jmdombbnxf89w79c8e0elqjjf94b8psn0jilp5flnj4x8wceo2tmrenxlpp960mbo0xkeectxn7phmgayti8rvw33go40g1f31btcvvcq70kj2lvxojn2lw8jm6i7l987i16p8e6qlpl90mzb6naxzdfrx',
                        redirect: 'm1695u05olv7t342zdf42i3eitu782ke4c7x6qabuzcibdgpztsxjtenbsfmva3qoy3xyzbfnj388k8axt8fu2hgu5u5xgtewfgju2v0lk2bwiqt1jlcuheab9xk95u42cdvqrvkq5ec36aqjqworrbgg4w5ilwld47yalxf1ujazh1rt09lqwn8cgjsjbn4u8r8vvtkzg6j0ptrdgq4bu89fi59zbi70jxcjyy4rdzwlikimut5nrld7gokqdey3pbtjkjy2t4lunkqhh6yk53gfw4vcnpa9wayn4m4ac0ykcf9i9lspfpo8laeu5vq4jp7fdyeh1ybb7acnam0ty7r0k0bqmlxfvwu7c0gxwlctx7ol84ttqbl3ucuzst3vdfgn34dpp0ai3ybb101zxhj3mctwrfe3zjp8fc32p27wson3e1cyiw3yjn8vtde40uzndwn5uwr689ng9r2swopxw1squfwpjmccf6hk89sh3j32968k24czuf1y32qka1y0tal7ui96ix932x9gq2xz6z35qyuavfkcu1zor1flmdehc3xz9qtzky66optys22ocennf2d7ta4dpmxycs415ook3g4gjfcoqxzsky4m9qjvunhylcbqftqwwyqigp1ffzmcyjfk9ih10tkit36ro8ppfzmywdywzqj8mbzecr6ldoqm1qwv7y8fjjfgmnqnvo4mq4222jjnyq1zkdkvjsvxjz5k9ayvww4bs7w92csj66rj2tp4myf9w8hkakcaut8924eq7jzhuyclk6kgu2cfywye5chjnh9htd12dlp7jky1y256vyoyalncfwykkffajqq2wj4tpvdkbfi6xk6eqho2y6uawc08zwjr2bt8rbqkhd04rizhvqxqpqjuqm663elekwuxcs6g6mdaktdb960821hre3r4zl66yewzlyk6gltm18u9h1hru9z8xeezxemthn1x5r0mqfdwl5w6svweaeljh95mqpq62p94ohku78vugm7qgqucvn27bunvyr5et4jbaxqnnz6hdg7s5pbwmbh6qp3t7hapc6odske0rw3f9ruclv0avqeilrk9rdqe4uuihoq0swclfqs1mthg2f2k6ma8gsqvapr0evg985wleuk86ih71iydmbtyszf91rfy1uyc2xb1x3lt6m1tyl8fihlqnhcwc3jqruk68dru4vxu4ciy0wkqdj4mijfdg73g4uu6p96chrgywdc1l0sqy27vq08jjqpm7orxambr3egwg5so1x6ixz60aym0sh90qbtqtqkn6ixp91eiwmjzsfas3rn1hokcussbdnilhraeiqu4thqt99stblvytzwl8o3eabbhndf1ark02hhejiootnleuqu2v5ul717p04fgrtvtwtporcf6j50nv26oq4ur0tgr34cxgrdtgg4amdg4sl98eth7dgaoi3rl7e6xpfed6gvwzvvvjh6m7dg7u2kqlp0c8yodzykvwr0pxltx4f60qrl4nu57vbanzhbfua8o6c0ik067v1aydt5qxvex8o9kmhk8gaw8devbvhkdjyv7ndaydc52sxnautnkalam1ra5qmqikh2tt3pghjbfx3wxj8kwz5pssv4qfni6ar2zpn204ultlwelwzsi1zcyb9cerctuk9cazzx61bptmtknsybo3x1w3epy6jighy7bizw7vcj5rysbx34l0byzut3q0mzvok93f7cgnzikezaa6oxrd0u5o5y9k6gvucp08tj87cykbpx4clrmhuiddu7aeakbuymexdvavbh2juw6lvclcsmp8ezezz7bhqilyq4577mbiqm1t4s5ncjt042d7a9384ucvrj744rs7ft2ia8w4xk3tgt912ko2r24lhe5mtjmfjrku8s5oemp4fyd4ioel8thjzigajbu35h3gxd6wridscqaq7flbu8u68s9lsci0p3h1gt2evncgtscsjivv6xx7nsn16gtczo3xm9xpc2rqz6a8zwokootngt6ry9cb00asmotdjw',
                        expiredAccessToken: 1857967831,
                        expiredRefreshToken: 2609204688,
                        isActive: true,
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
                        
                        id: 'a58ae587-9f3c-4104-88d3-53a89a47784d',
                        grantType: 'PASSWORD',
                        name: '35heztsr6hdetsrvdw28g9we6876hh4fq7h849krll3ddi2tgciemlmicnmg0jpduei16ax6yv1m5puj2fos7adxnunuhnjlz2vqpv3oh5q52e27bv1i174repzq9mz7ral1rd5sx39z7fmu3xq3s92w1gqoysyxb51s5lhq1601w25slffkclgem9y3r6weotboz0c1qiwywpnwpv8a8bi39b30dg0fsvb1ayvhg0lmq0la6jh75e0gwym0go5',
                        secret: 'igvro3xi1axuao5jgeq1vxriicjxgs6l5nibxgrmml73pj0k4b2pgsmtb2xch4kdou1744l3mqboddppbvvflkfzfh',
                        authUrl: 'ekml211j98dh3d2g71y612uct3v1zmlbit8a18fnnpdh8qkwtw3oxjsit7wav84cxdsjz5yem3zzc7lpjwx192vm5qbfznrwguuvruvlq2pq5r90ctiu59glx56am2cegx6uu00dz1z05vh5uq85bu542w2p0v1nwyt2hrp1scy4vs7zaxpnn0mlyoa4wrssij6bg2pobod10y18vad1dxmzmfne6oy3qzzibvh7bod8gvpvly006qi42j854ug9wgrxmx628t0s97f7qn20iq5avu7p5wttpv2hb77g8g9fyx7knw6lvsu8skfx1prdtfv2546532bwjk5bn4cm6gkj6lw4g78d9lq26d4gl9azzlk2korbr9dpd5x2bfuyfp7v3cskthxrph5q5htmesb62y94w8bft8xobcc4tap4wrd6b9nsxu71zlo3ufawp4tbmpu19ceb8v8hx53lku3qx0fqqm6utjmkmjc2c79cw2exgnq1r8jhn5z8ok0ds2tvbfqpxcjlh5e8m08cfbi2s6beunxm1qm0xfdspbkm7ukvcv2g1ely8jy86elmrleg8tjvlwwcgiu6gbciweg1488xwdv5l5k2y9zbavhjbw8v3t6b66yj38xysyzhgasc8v28o10p0mgntgcrydqzu49fjsudyxxzgnpamawgtb29ivnrfc09f0ns5xjh2sv5nxw1tfy96w5wsbe9ogme3p4zaekioag2kndgj8e6p5uplcqffmmnbg5qii7lkuspopiu887b2t3jf7ccptat3v96t5l47oimie05vzto9xnz10958wgffxga2wihzbm1y7ybhnhizlrk671olqv2di8siz870rgysee1r1wgm98rofuky212hpa0mysua1edlm05gbm42co3m1gwct36e1h6f1w21a4m2np5hxlnenska1pjsc0iyauhp5e1ms4jmborxkpbrepu88oi0sfzgj49pyhyvnozu5b4k38beorcl5qtvqpxwsty2yqx9t9cpsy9f5n3wl5v58x5ilgvymd5qp590xp6d025evyg7ubw3vrtun1nrvggl4seqgqpbt37whr9rzuh3edjbq0nbi9iktmhx0m5yj301wefnqu50qi2d257jft08hr0uhvqqidpsi4hddde174shpf94rf2mz2lt7uitua44texf1gvw6k4xhwrwr8o6otnmy3zrrzcrla0hf229tt3yc9smjz56dysoh9ijzd1k8iiizv54g6fqq6gol35htbiwv17xoogfp8neuj4dm95g8hvc2nmfep7zqt8gwd8ljm0ob3y7cteirjl4yt0hpwst2of9ezgqyhrmtbqo187iw5dlkt0se2i2yvya37g3kaifsplkkwp9fvm3nslhk65meh48v95k9tcgfxyuabdrlmidvunivzjn1rqstuvo8fob2zc4tck24qo7sziznn1giczkphnvfd4e54y8ntu9e0hippd386lwzcbxgyud3w56mxr29wv7iy6mgsotej2gl4rk9af8qm7l1p64o5ju000ilizyhu4k8at8ryax979xhftdviw7jem21ey7fi31e5jeumoqp8zxkc8c72m1f0btpb7oe0j6hi1wbg20vvzw1y39kf5pg598duxd8l0r874w4mpgxe2r662721n7xfrcl8cdczpljrz286e1jiuxda8w2gnq39ayjp8nr5qnbls60mzf8nr6e21ao9xizrahfb0ya9zuodd8odsrgg3zlmile6cfba6ml49q0cd1vuemzxpmsayqs9723t9oiovm2tx33a4sj4vtrh18ry1wtuy7ac74rpigder16hb5qsnfzsu0pift2qq3lny6egrcn1iljiyi2dgev6530frdqt2a1mw4wowhs3ykpu2fk5nd9pzm4l9djmexqs94coinqo7084emfieyjlf5a555p4iokwgglx8vwc7gimxxika4w8ksyh3cdmai4f29sqco8dtq31r2c76zaebdftixam0qpdobxr2eeclt0vl',
                        redirect: 'dpe8hwe8xs4vrrks5pmytjzitolrb5gfwy2t9aat7hvcxte7jbtt840axv9mhlefrz7dkuh1leffzifkwmb5y6wlmsn4315ci036am7nzoaw3f5sdwlnxi3ye0yhwex6r8qokf25jpsucg5rgi35a70ubazqu0ybo0zfyh9lgehvh3tnhmn61ymyrb0k57q17k1et532rb6hvp8p9g9a6imdst1ogij0xjk300tca68m36799sat0wh1jk8fdo9gh7iw6ip6hixn552gwbe4bjh0gwttpzwetbyl71ct4tkcmhk6us5u3yj4tymlssslxi8xki6s8sd703ycyu121iqqm3yfahmwq13y06wbqqk9ug4n2m1w0fc800rmwnvfbc937jtygqjerpi2kjbv85d54mua87d59zug0q5a13tgq7yo3xjjpz8ymdjnxe56mt0r6r9qn2i55p2exwe5wzo40sfr4sdc7oy1loyngz4myqc3rnrhysdkewxjepew6fvryewz16beegqd41y1hsxx4oz1eq78zs9uejwxjad7cwifkxrd6p61p9dc97p4p3mfjgv4emgulni38buvhgy1tjp4k95nxsz20ivzmb3phvnprj1usj1n8t611n3mrrsvborlnodbuaiavdp3865xlx8mn9c0d5d8tl8m5zy31a0ho5ml824u516e1966as3j7f1mtlo7nqq6kp7n60wo8bqftrsep2vqg4injjy0ojfl171gid8nw52pet876hmh3xrj32bvbhpqgvrt98sxe1d2drv11r3v5opbciqff48zbbhltcbfaaoyio6gz2ilhglwmktgs5mzbq4dz5fswfzan4h19zn9g2o18nvsle5jpconj8s8fqyf0udngoi5o0on0yr0aa24jbma0vi4prnoz5da58jjjh9xetmjvezs60ftpbr7b2jpsyx44eu02nj0l5lhos97ig63nekcx4omz1i7zepwv6h48fwx83i4x8gm6bpx00zcscadymda5tu6q7kp3seun5gotf7hh5wlqsax6c5cmqffag0zoshg0vhjhtafxgp28wc5k79kl8yf4vrmyhl4z0x3kf6a8ks2sqvntitkuwefcq6x5k42du797sc20przjm0okx5b616tvtu9pzo0mhue3z0b7epbzbe8szdqv93pfjnh56jkmp4mq9ie3xznfka3lj5lb1qd2yv517681p6i05w8775gkuqb1xw4c16rskte1h89u8oovk52y123ns1271emfkf4x6dn3l03yg82fs8fisv9gqrb2wichadgaboyoslr17dxs7xe2b40sows681duk9j26jgl85zkk6mcgaz4k570d72j2armofje9j1ka102kksu8iiian2rr6bq27zsw6s7bhene2dj7ln1myhs91i90jbzw9dbsqbgn8em6fjdy96zndlcnxwi6yz3j9rhzuwyjxe99sgyecpmoqbw455lo6lz33gnwpegekbzyir38975cm21hqn6dprzqvwtir9pzvfw0sva6whgziecmfwfb9c1p5n858zbhl4iuhs067l73o8zwlzdhf13qd0ewtvv3i3xtmyj8za7i66yk461blict9gyuple7b6vqyyt8g7vbat5gf41t4159kst897vgtmd92ijojad2pomc82ht0xz04fqbtdvfi6229xku5lnpcfwd1gela15k0q997g0mjv57h8kcgb0i28jij9jp0gji526mq4b0q8j9aeeti5tzcp21phy361lu1l6vfxoyia1j7ngee7au8e42hkfvlc1dr2tesqalbs7zhve8v25a4bq04tfm7xzc4hsvcw1xzu1mdl9900gv6zwbvcyhmt1yq64sw60ftv02iut6arev31kb4z1dhe86qzbovwy761mlj3g3gzsd5ege6c3d3da3mtbhunp39g8dvg6j59fwvkkqco5vrqm9471gr4m0hi2mnzhj3yfwhogf3ltqv4xt9y9lt4zncdy4nbi9gutgomx282uc7w',
                        expiredAccessToken: 4566893113,
                        expiredRefreshToken: 9400812762,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('a58ae587-9f3c-4104-88d3-53a89a47784d');
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
                    id: '59711159-f945-40c6-ac6a-9dd6d95f6b76'
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
                    id: 'a58ae587-9f3c-4104-88d3-53a89a47784d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('a58ae587-9f3c-4104-88d3-53a89a47784d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});