import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let repository: MockClientRepository;
    let testJwt: string;

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
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                grantType: 'AUTHORIZATION_CODE',
                name: 'm404f3qmltyv2f7qyyxz0xzq92bsx05rbpvgbqvzwkdu1wy3shihsoy06vmf76kdszm4xu8plkh42qcwl53ocw8vyam1yyem8wkplxtb6luclpa0mfjfahru38kv8jdu5q1r40on0jpzggoos432ioxh01sel6nf277edaeldm1sd1a4p6f6wnwmjo1xe3jobcmfc71r6gt8e3abgtrvwqr4u297bcbdk7msrx8ktlt1wpilnplef9euapjzoy2',
                secret: '2ornpxt02mou2s923a7n04xsddarvi3ru60hrhztviba0ydttd2cs2r5wto5fxk220gu09rf12q1htozcgwsqo5mjf',
                authUrl: 'vktwdc4nsnq5mvvpkphq4121koshhib7wqksn4ggwawo5lgu8frmglorrwggex2seos49bxx89ehjynzw7476gzcne6ewucwndr2xsvo620xiknkpeyfilpyaz7ekqj39zbyvgf93jq50l5g5zcm1lbtsdjyf7uxm84377banhzy0aks0yclce7o621evxz0c6a5dx060w8ickmilhiubg76mq5619tqklyobxbn2td049vsuvtfoau9opo3k1hqa9zifxk4c7mmkqew1ix31bbalc7pa11nf3a9hn73jukni3cj7w8y4pgouurfwy3uxfzlxxr83wnvmemubjjac3q9jpq9ai3m6ri1paiadxp4ul7dlk6jflse6p0se2vq9arni5ozjq6chs7plkzkc1efywefvizr3icecdah2w66qroi377zpzpksqezu1wbazx8gtgh2jdi9xrzv84vrmk7qsepldo5swndyhldx4p442y69nl18xkze1m66dgnnus6438i9df6d7xb519i81ka0nfn9m1l6mu7xiwcghrfrmhhb28pd52943hh12xt5rsj3wwkwurg6xihcrlqhhwazuoybr5byeecdki4nly12pbdjs2hmvzw7sxm8s0ilc8407p2ze566wgtl4eklt2n7t9dka3mmdzfcb2zp42ecbemoy0q40k6z668p5m2c3x7p0d2hivx31148s50znqin7git0qkhqac0ztesjxya501vhsuqyy3osaoaarlq7nj38uidrd5vvtkkyiy19dcmpnz1ywmg9t32pdhhhtws0io2q86rz1s2o13c5tmjvfdoqroh9ynejip8cu17drhzahjgem9p5mwy38grn5yk7burkw9cpftco3ox23x9m0qm1uv14wv3jcnzj0cjl8l6ow3dwircaeb1stuln0y6ay5ya6vqdulc8mrcpoeo2gu4zzyw4t4g2ztbokg0e22ayq86exrx3kjdmtsx3z1cnnbulh2jb6uz09o65seo8hy1uofpvcanf1evlg3cpkwhgdg1tkln39za7o3xjtg7gxblb0de3zxtniqua7czywplvdc1nmc0i91az1vi83y2inqci1dt92bp5lozzlom5fcj3kdwf60wtrd060palfi5q32uo0f9zqboqfjkp77ursjcx98tu7flfhsmy0dz5wrb77s04wi5analw8iyk1m5oq8vxuhwjb8mo5rgemxjpga8w7o3adqzslxg5ligib1gyp5fteap4gyetsq4hpsmuoqqxvs91tralhics9q538sjad1fkz0be7xoc2m64hczgwgmddb310xetrnh08xqpaf037ibmawiqiepqv3z5jib453antqpkmmul9jns6m992546jmous50yu46rvonnr8q3h69whc247l6iwvcpz70jo45whip58fjnp1xafevifhaecj84tdfsbxzfbqzn5ruwptfv33g5f1qp7dwn3jm71ypsyduf3mp6uz0fl3o1lz8gux47vhmu3gtl465oq3s7ujywcpd9pysmolyv5zumaxlv2pqymvp1y7phvz5g646li6l9r0rqbyvsdxxw27xcbi72vjxuzfs8gp4l0et64s0xilt5h5n2qpp50rezplwtf9wk12mtiv0rjw0so6hpwcwnz6fzd44omfe579zoqstqcax3god4qnvosp4xs59biehov0z5u8ouuqhplio7mkpocgyt6l3123aamdsd76on0tp4s6fg4wob45eg5nqcorigbiy2jqc3ytvcecx4vez30v7nc1qgydcfyq8k352q3wtcrlzcg59wm8hj5r8b3cmag96e80z39zm1qtafgc4j764bstjw1ua508fxu4pyg79bjz7ncerz0l4jyn7oekemzx9kssjdzh88szlu0qjpp4qrk1drm0uiv1lw4t7sp5xv79f459yy2wp80rqucgwhard4zpr1mpijrvvvfi6fob0evyylu9t2uaenz7dttnv829r6e0fkqudtfczw3r82gh5bly',
                redirect: 'qonj9rw20ame4vlqrbifwlameryd69d00hg5wp27wnw3ds158jth0xw96xlh80vs6zeos8yg0dtl453j8rxqstpfltc6suorugre08gh8nvzrbnyl6i808muhrnndign50zvhvuixfvluaeqd3loqsjmcaoi01lup306pm5xvzoz5ejn5ltyh069i0vzoqee5d9xhjd9xw2drgkrobcp874upmuau2prdht5jpdywrwz0ykpkpoxksyqd4b1zza8frfn42az0yu4fdg9lmzbjg160qesy283hmvih7o5l5tllzqt15v1w4du01bqabfmyugb60wj1xcpltgq4ej5e5ez5aeydgj8bf1xxi5scodtc0bd5hjp19js9zegqt3n72nz2q2x5jnnmhs3b7l04os77c4vwh82qbizch88e7nsnqn7zz7es3excli4flwtmeck5u91v3lk307hoeoc2p05n0nxdgchqsjwa9tyxw3us5zfqgcn0xsw46axyh9gtgjb7s3dkggv4c8vusuqwd718x3h8mu68h5113zhlvs15opfhf4c9tjndqr91qxd59kvvjnjp30wf27u3dqs40i83g74hu7g4723185p8h3eghbho6g8wkvqqc1sjl8i9synsd7854rgxdgy6mn4z5ok8179qtdptkltvnetw08vaya9am0pp1ueajji4ehpn802qqcsltu600rdsq70dy9pscylcog7f1xj488wg92ka7wfb6aqecekmj52w1585fnp0cd4u8tppbjf4b70jm3jl4jzfcvj82a4ib7kqolojrozw707dywej7rhyvqd4udi2kfz61rp717drlvdw39f49dlt1zfx5yqs2ccczi5hpvgxtwosrbvr6p5c05mebpoav65yxjx8mesuysim5dn82qdlogc7crxos7knnhacxtttw8sdyab4z8z2an44cn526or1ovv4b1jrt3hw914plpsm6cq3o0y9r69yykh3yvsaz236j9rqy362v9lksd3lg39sv1asogkgjvgssn6k3lyyvspwzu9xi0b8mzes9j7ruzvl01gia75acqbdvws9tjwj08bawnavo0nzx5jjx6xb73rz3idiy2xyuorlwhicdrdjwnte5rm809dn7m2ramf4ka9m4m5aoshd8l9dkpy3f4vmayvp3fmi5zxfromxdmyo2voyo9pc35ox3oaxxm1ebmqd5rk6fd1q1idxqaklflj92n75er2eg86bwwjcsteh4nl96wei4uvzmlr8deyntb68x1k61b2980zj9b07ovqd8gj7tgap2acbdtdnbwldpqs3kp5xmj8ydxqvpgrmpmqsk3n6k1xovflggzmqnafphg4xi7up5ju8yt4sd0fek6ozipqh9af6cqoz4w4qvdb9z543k6jkl7bko9r8dejjd1lurvgdhiuxzpg837ownm3t2y6klab9uzjowf66b8p6jc4ys4cb09sgxp0kj2t2dbwjrjmrmtea8odgtf1fuadi6ltsnk4yasf7ab39bva2sy7v50pdcuku2m5trlygbnfw20l03hp2mx3u0e9ru098wgnaajndfmocgxfcn55a5ibprpayqarcoc99qotlawbt519fmdpnb0ue1jbg0kq38cb2qcjavvjim8pv9rv29oe3al56mx3g1f8shf0itx3dmnp10vip6bb4ykep6tig8zwivkttcm12wkjpik3j8gc81m0n4n0j229mstg4y1ii5m7ufzarhlrfj2ek6dawixjbaj1rfj1e8ciyows7gsh5ckha5xmqlz6hdc4y04gr64aob2txql8xunjzluv6yxpdqtix2b67xrwhwbxsu0szde27qf2l7h7nihy66jc0m0tucd9s4clkapy4sr4171b72y1amjm0eametchelg4173j5ize4l2yj4l82byl5yboh31cpvw0a9146esdezesmxptfww5d34zw9lyvzxwwjsg1gz4027a8jc30w3eb8xj1we6g71hglhdguwz0yx02wvb',
                expiredAccessToken: 6492322879,
                expiredRefreshToken: 3470661870,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: null,
                name: '86i5ezfg68m6ztilba9jytco0ggkfr9sz0xawsmzq40erb23vwcasgir2ezfc48sklsp4d22bs28ep65wmgzbm2z2joxhhs663fk3s8jw380cf3oo4tdm5rm5a0ndu76lo4t6vzv1s0kdtuq986dij091v4f5a0dev47265y2ml2z7bkloz9jxok8qzaemdk0go9x10gsqu7ma26ws5ymoc7ozuog8ewqy0k7z5xtvejhjdqggtqokefarxsemi',
                secret: 'xsfakts50sv57vo9rpf8lm2q94lpqzmftodc2fmc1mz1b7mug3zvs8hlx357fush7u52r9r7c4l2s63z93izajx04k',
                authUrl: '52mozsyofgn1y93yu2ykjr17rtx6im7t2memo5zvu981rbwap29jxsxci10b41jycsmky0t8akdy4efr0hv6ntvofmbqign8b89v7do7dxu2ue7redkfkyjq9f0747jgn0zgbfof49a8nq93v1u4usj7igwb0cu812gpvsmyfjp5bpaj07ppj8hvtzgbzmb90sik5a4b51sc6pfjlar10j6clg2et4x7hpk8kjvizbhzngff8x9ezt8irbi19x1kzyhjz5dm5p9rd50gh94tgm4jzcwasz7va1l1buyask1ap9cnl3sfwtznnqxctooywgrfyzeexun3mv7e9cdv6lrm1sak6rvvty1vwvql2r1yr8qygggci1g7x9sqzyrnfbjws4x3g0cy12fc25awzbi01o8y1vbfy0zznunsex526b5dh6u181n82q83zoq7jc4b88rqnzuuuc48eii6dpdm7d0sflpxakgm75g7ocroevici5u8bsbn847a5fwomarhmxxvbi8hnvbzd0vgsl6vnyk9lpxk6lj0rztswptfzmojnc3w5vyfdh1rbvn3o9x915bfr03a834nta8yuknxtvy2h7x3uzki9qmldxiiggl0a5ex05ub64einj1tu6m7z9oac0vmvhokagpsk515os4cdoqxlxllgm2glcguk90dq9gxm6haa4qufr8iwvg7miwjvaosfybsa37q98a1xm30n7svuil9ocabv4uv1zcpaxog8ogy7nx06zwe334zwni6tgb763ia38948xtz86q1qt1p83wgz75zt953yc58km45jgs2rbn6gkqqgxjv5ajqkzuuik1e5d3oq95bdq0ngipp4juwoxh5i0xje49m4esfob8qugw169os4uepn687vljddilfdr959t6t81aw5nx2q6l3cnpe1mfpyz1zor8lm5y71g3j5jsuyqrpfiq211uk3zrkt0weq72j4iqh31nohwnk01qqhruxxtvriqxruknrlqnku04rgj2ailtn2uggj8b1e2otr55kjopfm9aryxn2xijske2rvj222y96oh7ealvtkgbh0tl6wvrya1f70xs90p0qv2v5kj2sypklk5mw1pbvi36ep2f4mocimy8m3eng0pzfmlcmwkt1k6qnzrwxg7gcq58gfphknm5e3q1ahd4ta1q9n8uzj4zvig6qkaof4ngav8j0zignebn6se1xz1uqds1jhv7emrr7fhprdhrkumw4scde4l73udg41h5k77w45y8aqituu9nulcqqaojlvjy6dlho8p9hcxydjnaqgyik6lq5ljm4op519sk64hc3irii4b2diq67j5l0l3zzjawwhy6dfj2qp4rf1ow3mshscveht744z6fngh1csrxbpbqfvldp46qlzy90thb7l9qwc6bz7gno2l6k168y9hjf1ycn1qwxgy9a29g50gumndoa65k8m11zqbx87wo5gumokxxx6ntw6lp2u9jiagfijafcc7jwi4tswxxjzoatlnrcxrrtmsf8r4ca7x2w82l3uvvail43nvhknkzvnnnbgrkkk8bik38a5bjvv3bslqccfs36mhisvp0i8x6vwzpdpc0etqe45x7xubotumrcgaqg9fbt4b1lby4ijzyngw0alijarw0cij6auflobe1rxdr79m8pm2uo3nupombtb3ck0qddizdmzidfbem7pqq6mmcjj9mu89j1roq9hwnqqar01osmho4dw46y99hioukaz3bfqjkmel66ggk0pykn0mrcy46zw10yczwrkrbxagvwtdt5t6gi2b5i58hs5o704tu213amd5ovbmgc0w463i06vtby0fksopcb32s6r38y9uan47osogkun3megxlyk1ax3nejck0jgktbnvjxr3kfoz2a9ft0z8dw120rixzkd0ursuk3pg3epwq8zbkgc6aut6gqmceja56wxossq6tzaxr6qd3mtqlllsnq8kguby7jizsjdw3arsrx1oemwyocusj8gwb6fvem',
                redirect: '5gmzpyjqnqzcych72xpy7c1y5z3z19z9nzvs2cq8o3eowznrer2je9wcnok6tlgudzwsz5nybmhu4chcihj2uoly01kxfy2eyedppdz8s2k4azcmihksmjgndmqozgtj9fmghjjb6f98pg91odvhyslc5iqo5yxibuzcxrheflzqqz467wuijg3jylosp96u8vn6kzmzh47qq90rqyxu0ac1vky5z88pehafpcxe74i40l856i6h7ljipvb2tys7ddenlzigcvbrsh783ydyx6hc02hv4dmiii0zywwrk5fjsrquv795q8a4vy4hqhsa1wy6g7a76k44dytoujflamcubnli7gq88ggq6yi815brxsfs350e75jfwjgozzwkczqwfoik9eb6ajxq53v8dq12m50s1vrv9g9o8opd0cu2ppccbakmgy2ewjahb2gukt3dy8ta3lmd8pzkoimnv68s3bwbbewpplm6uw16a9znrnon6trhjafryfyj556yjiv0iseakspgv9rqbf5ppff6zfyitblbzkb8ug0kl4pq289fwxh3g4lxe1nxud0d31ew7dpbqgib7ql8cuopon6y371cbpzyv4ef1udmmhv0mdcayznixmloczbu72qxnnblbygbelak0g594kzsedqpjevm1d0gjkrufhyytjlb8nkfseafo6wp7th6ahwyto9jl00ybukqxrk38c6kvmiqhg633z78rlvsdj1oondx2lslirs9t900ul53wrym5thi17bxbe3uztwhek99mux6e9v4xt7r4dycgi2j431nxcxq61swky9arpksdf4yzd0s5gd6pajt0mn0nxfy03elpe1sqoax4xfi40mvi61ac7ltgfvwvofp7tqnc8s31f69rw6uzgv09zjxs4b0r0q3d0w8yqha4ltkyo7515z4hx5q0bsce9cjorlg7y7dmjbz8j3m3ho52nrsustcsoistwoqptu65c4e4ntkci81kzvbwk4hjd9t7kg8049f862iaqjh27oveisuj9k852fb94i2zkn5246fz5lz5fk66bo6wf6x7mtlxrjhpr60qheuemekne9esco82w2x7fhujlxdxbqqfds05ebbduyk3s0caubmo2pctlcmwylwr29qjrd26hx9gpky1rj5h6ex4stpepuen71zelw42xyavju9a6jmtuwksucbrilx0rlmp96sdlhltfmgrf37ubkvmznv0ahr568rgh89gtufqlubwhd8kpgcyanbym5sqp161cepe4ythpszkpaqjrgtjpbmi3l1likzk0l2tx1aqrp03y7mr309xaam00noeudkeq2m69ucz0qebk462iqzlevib1lo6h1zex33y9jtefi56k1qe568he6pypkw0kppuwst8y5gwypup2u6j0o1milf5frilc5lj2u1bar41dp1balau878mzn7sh3o59bjelx5rylj7fompzwxkgq5nx4vmvlnr3dhjk124zmbs44xk7qx3466ilvnc7p98t7fekjyzurb66rbduqyq8oqr2lv6ktm4gx3lzycvawb6bdhde331bw1h1v3o87r8ot4ecel1x30gymasrje9ck52qu0bx0u8ej3xn0ttogugo0xvll4pvc8yn4dye6hrjnpjkyk1pq8k2a7873lj4p2orpkiluyxk4kk3itii7yynwkackcbgaiqt6is6g0bxc4olph472c79njk97kd20xzn9cma6289jdwmbs1w4q2v5ukquqvpkj2pin9nmqas9rft70g6gacdiwtw8mod22kw80q0riprt7z2zu3muhb4udujd2zga7dx8y8axja1wman8c5772vyz7nfbxhplusnz2dz15whreek2zf1gp3c5s2bj4dplvhm21ydcy278kj81dtas41n527ro8im17ab7mm95bc6hgxe2tpewd2n5nqy0aw106luo8turjdnueaur2e2vkc9s32nm1ee5771ji7agpansbjejxh02be721a8wcgxvwlyx7mxv0',
                expiredAccessToken: 2117726677,
                expiredRefreshToken: 1215253038,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'CLIENT_CREDENTIALS',
                name: null,
                secret: 'v7tyfn8efoop47ebr7w2jzv798jt2lih3nn0vr8c8um2lhq1ds9xhc4zc8sqk13i30z9tnrv2lqg4l8duuez56j7zr',
                authUrl: 'okey8tm34vcgy0vgusx6ekgbtq9ie6oujtlb0efrjgx7gltxzupkiqtds3z9mrqdbcr37zcllabeuj0pxls5hsm8daadg5rk2xkdwmpestr2hvxdfhlwn7dqh8x5o9v08ehkiysx7ft9swsajn12zec4zcl3v15irw37mpdckw6zd77yugj38b8wfu59zdxzukitej7nmcyr83tpl43n6r18kymt12yspe3b7sm3iehe5h4t0d62zq254yreazd87ejmt7ki8y68wn5vy0bpz9sfylikv87j9ffi93nkefvf6s946ge9mtr8v4m7ryhwy1n7e43cj36g7y050lybz4hfoj7lmm5mr9y9t2utzqyxmr9o1eztj1cj8u5y6nucargnv892k4fxk0n9nyrisw7a2udgmcp1xn417dgfczo621tls6708f95vjqyk1z162ie2ktddv2h47i91zch42cicgc2qqijnibn6n8mszequsn5lez6jppky2lxofq7kwe5kxcs69j6yv51f23guyf48hja2odjdqy21oqzfqh68btyc7gk8avsekefpyduitwdormsbdjjcmxzedwy3l50f8g5llu6gl19rymerhg1dndr1o1tynzfd6kx3xbgxl7x02p4ekyx7t11qx3ad4or2yo42mbp0sg5di8cgqcknvop0yhk39i4s576v9st2hei93r7o7o8r7p40cuo3r43lccdif0wnwbfhukrovsoefs107jjcekrwwzmecuh0mw3pmxc6s12benvstayy26gyewkxiugumlhpa8ugz18nrs1o4ce6uij7kp6ii0h2i1hg1y9hi81vy4uko52r7oznm5wwx7iaf3emelo6dzhnsh4oqibozbez3ns1mdrqhxr738oh9le19wvsve54pdvcjd1wmyvewpng093smezj2wf0guuffv8suqzxiblnfa0m7h1pihoc3z0zqmxk7hvfpr3gjwkt194xcb8uq1ju80o8v1599xbvha0f29x66h9d6qcr1jq2amditmsuxns4wh43zjz5piwzkckam7xdh3dd2gz82byr25ngumzamhiprxzeivdd718wrm26365yvx0zouscmic2cm960wt93zzsfnjyksve2dofyu34uh8bwfkhk1ul3wxpvogibtoybkwzq3nttatdnij50v4m7qm12vr3ardzwgszmsn7kftggmcb1dqajqsfb2fb56e25iru9h1qmj3ko16i5rl8tn5nrs7jo7x7oih2etbwjd8seds4nybatgf6si2r3tunomy3pv7c3hosp65tojziuwyjvbcjnyq54fkvod3ia95k70p991f2px7i17an5mucwwhsliu0f000jjolw38wubkokrq2nixhpq4n09a541sjghjk9y18vimn6sfltmlx6psa928xi4jo2c7fzp8wuizk6u1jth0paco6477xsra2mmvka8fuptql8h1gmlf6ww9uw4k0mp5ztmrhrdhc4a7sf4eq4x9g8xxzvlu4v9y64pgoqy57x801wbes12bzdti9v9adp27j1f9jbcz7sspx65vqxq0i7l7bb4w3kfcwmoc6l8vpv91fe148zldsjkhprv08ueg4sgtldjxop7608pufi8jox59kc11pbw17j3l0jkfkiyihlsl628wk2is6z1kbg8nr6mvp4k162ayp5vtdw6i9899wj5inxpv1ry5u39snn0q605nlctft438imdre7hv3tk15r12t2o0i7abs4d8zvk3m8tjzwxcri3wt87jqslzijyinen5tmd01u0hczmk21fs8nqwvuvkw0o5g72xm8j9kcmhse48cnk0iupmlmhpz5h7umkgi79gvj9vtmzhbtcsykwog6jbm6w3w50xs3rz5ik23pvggg7n6adtncxwkpj1z32j70r1m0jr60kap8b3qa3oegysi3dl7067h61907kg31ql9w1s1eiko1iojvio9u0r5r7ea6omkpp4p86uj87ouofjsnl1owo6d4knzmsb',
                redirect: '871l1qlmn3e5j5ow62mvtbplgdxm8pow1r6zuck9lv9317jgitponlgm13yq986spzsh5x4v3mmlrsqrw6rgm7avqgkigg0wp15v7jju44c79z3ahrj3h4l8qjvvwhloam3em6qih4e8qblrug8grs8x62u8q1966cep7pcovtvg4l15fjsk2xgg0a75y35trco8of97fsgrczuhja61fwkw8shl2ena6nd7135nhx3wbsp5wu94rig3vbyftx2g5kizhh1dl8tbq0l1ex3odgolsfaoubq56m0sm2qnxe9n985lruegt8l59m33x069h7z35o6heqjld4gh6asgg1yxm0cubs59hnoyihidycmbymtkuby2qpxmtryjronjh3nkmkfk9dppiw4xqqxbdhv97mnh4mdl9s8xj98v771eca2lxg9kfjq9oiba8mvl9wbus4c4bu6h0l1offb77zw79g91zjxynklr8t2d8s28daebm1q8hhwfr6933fbc58di3jwnhnmim8357pz1p9zvy5vvo9otfcgmfoj5cntmlbarwqso60c8t1gsv7s60x4g2hy20aeipwrqmpwjaan3w8wh8c91ajp1m0b74txm8rr28k9nkrrdtb49k3t5w6uuwba4vpwenfzsi2v6jk45x3m1erxwypimqi81rziq03383rikds4xubhekblebvytrfe2sl5iyu9bmuz7efbqzvkqfnjerdquuouxn4ls8s7nhh8zrqgw7i8xt2hcxm8t4s7q2yjt0xisc2ob7b7787fm1qm9n67n0rsx5qxlswpku0uf1k2jt3m1d4o2970wuwwhaqdao68p7qntimucdjg9jalm6ks2a4ylb78arwav7ns5elt2zulnvidh7fgoades9v3gjhdvy5dn2ihhzoimb3qpvtg2aerdmgb27d15j62ospplrrj0mofshtz8qp06rl2zdjtjojevlmvgqsnd5wetkk571ps08d0rnmqctjjlm4wlnavf7zuwqub5ndiw6o3vu31nwq6g1zd1egqzmlllxuunvk6s6xyi2pqw685l58ohlkixhay5evkdgigea25wm7l46y4k1du0xyrnlw5e76fsv6hbb5bribmcpyas7ui48e4m0meug779rbd83yep58jvi0rrjf5scel5r3881rsb1nqczyukxdsau8ljsq6vj7dppz6sg4vj56hznqnvjh843hia3dp68dsobscwcuo5eynlqsh3yahqpt8p41x7k5dzygw2l5my20jeg3jlw4i099cotlvrf1r8rh8fnukdyaqr9v9ca28k4tczkef989fjwxem7u1ubqh8wvx4hracym6pkt3ex3jj43d29uvisk49nmagomtzsnt6h8q5o09hbchtkw5fjmlf07p31216rpyjbp3ts3nxdlod3d9kydj1xgbzixcgjo82m0q347uzbtwmm3a3nk7j7qszzlqcrxvilcz2rh1qom8nwpuvghdf1un3lft8c4xjgxkt31e7bma131qjfwwvy4gdop170jqm6jpq1sisyswlbnn1ozgyutmrq0jxjclcb807uf94fqju1q9ialvejorkk1sukc9jttcits8rlj9q6sj11uev0o8xkxk6u4x2s5mad3y4awjltk0los1uqci3rgze01yhj1jqsftxwxiif6he5yejgbyazb203dr26jw1u73bkf2f6y82oeid9un2lkx6xdxfmvpsmbmp9ic1je434m32mnfdgglaq363o23gwk5o1xm32xsxv6clnqz5kwa41bdiq4ihrsh53du9jfj2xgentk98uqbcnq7619vqdx6x0u9kyi8n7l1w81okslogbgtq42o5xffk5reuzf3bey76n5extglv8qzvskzqg9z6h12607r411dyz7375q038vh128r3isqckx7ophqgvmf67errw4cpo2j2x8ql5m51n7jpa11ck3p0a63pe02rn2rclt7fsvh5tabwnfrd5ses0o64ozrclv92mwxyr4n67q7l',
                expiredAccessToken: 4944511992,
                expiredRefreshToken: 4555781861,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'PASSWORD',
                name: 'vpheb8yxr47hfksad834pvaewu86z4pi0hss5k0us9t1djend8yi0i21rxmaqv025uzf0z1ohv6tqhoerx10i8uidweyseftosxjz17go9vx9zu3ml25y8um7bj4aedwpuxyts11m1q9ncgo5zw7aqtj61z5oorl64r6ca4lm6dorilnh1ab47qkdljsb4axl6ibd8kq9tu42wxt1fysc6ze8a1l42ob7qi7266uc5ups1nq1ducgs11by4tnld',
                secret: null,
                authUrl: '96nqaum23ejqkgg71slyet9bsigkkzyrl87bfsim602k947q6888p6ijvu1w1zo8i8vy6q0cjkzc69ee4vop0mn4tsstlqp93vuenbmwy0wj8ijpfwcn1o6nksrd6zjxspd889ncjlcwrabttp8jh3gos5vzaeue4vmiu3g2tuxebxnxlwzcj38sa9d7tv80h44mdcep3zo0a7z9j166zps71so3zccq4n865pgu21vnje9rp6jmx9bc06ou23perxgc710x5ck8c3wdykzomy1zjxz2unx6xmcn9o19caq7fqwr2sxmys41ryqsst8cdqqa3j8l8qccidw122b715sa4ws6pfeknz8nfhcnhxupvpz835qjg16q1unx9ttvaao4h2ucmbecmchw3pkgr28nkwkc7qxtzmbvvspihe1gf5bl4rhwejsgxnpqkzwaikw6i9gcgpc1ll4mm6raputukvzbc4wkw6hy8a0eojp95d7oskztfbbx7cjio8mhtd5szmk44vtznuu3mykbb28nl2fq7wcl584o5m6cyu2cu3guprgiv95ms8ex90qecb34x6nocee5p1y2igwvbfypqnn7k9chwzkdkquguns26oby20yzx1804eau050ddmi44clafz2a752wmqrh9uh5ufrt7mfi2skvxjvtfrnht1x995j5uw1cect2e0iv2imsw3pg17lur19p0pazvmygm14ycrbc741gel7v3x9c59bqqahs4je41ss1dj004om6cs9uoj0q291f7w98nqwhktmie6s8jdkk9rtlmhdlqr7owt4tcoeyutg9suftbza3x7b4ofwdmdlw60huf37iawwsvh4eetpvdlm1086ly6hfshyyg7xa8f12krbrkvq51i55feulvzrt1jv8zle7ea6l3elkxuu4k52hbfcic2ewqtld6cnlaape0027563vuqhzb50ll5uasf7jsepeelh4eg86ad7ech1aq28bsmoozs023nj2iz7em5ittdy6vu3fv04o4zklz0vt71rzyks9trwq1w561ylecrz5v7w1nflnktq18p8lvlgd9sdlvpac0hljyd7ahr8lfefusm3zb1kn45f9b17y25h7i906pp16fjptgih8tezx301rh1eplj90q82lnowqnnfw758uy7d6k5ict2hx4qhvoc859p62871jukoezwcizar9zqjsu808f2e4ap228d3k5mbugaz0wspk290i178xuveoobx568oy15jknw191r25i76eke6w3q8n2ixqc9n97quxj3p5dc4spno5aado18mg479ae8d3lfskw3urx5u0uflsmqhzly9p1yty1jms31u7ebebk5t6ygd22wijkcj56jfj4ai8r0nhgph5kyoxxf9929bunrfy7n8mruhwpx44tk0y10ophdow2ikw6pcmh698ghqky047s5ug0d4un3v8hrccqfrdrw1v3vzql2j9wcyb4u88ocsp44hiwh7s1jmurayfams98utnk2y5kp4un36ovd10bujy209hqv852hyx4qn8njnuyc93jss3xmeyaet6rlqm5lnedlzuner1jxa1l1q2ld0bx12ltlaebhh73mwl27jk7k63ck50rczdqfsl5wfv5l4gwuymohce9okl0tuknqi1dozes72ng7pchk2g88r12b0wjo48ohhlt2b5jgh7v28uw07f7jm25i1e87lseu1w98e2c78avqtl30fuzpnp52c9lsmchaslntsi3ayv208tm5bbcnd80w3dfwimq9q2z8mftwx3h2nkeatgh0hnklrkbzr6q5cy3eozh62w82ih1d63xvnc7abo0pia5vdsm5qa2kg7thk97ccqm78pm9iaw9otg7pau4w1br2namq53ue63zvke0su5hqm2alwmqivbx2epax3n34dpqchsgncxh1rhvvsvrff7k782b51az4bergkmihk6qvxlbgf68498bhw79c041zonckdxwiip8any32ng0k8yq3sbar6',
                redirect: '7e805g74mtobcig9rk3o8hicki3030hb1sjzs2wb2crsu2jn1p37m2ui7o79biyikf18yvgoh6678m5ioeuq156gm0b1n0v7jazb5nk0txhwh6o8ki9gujv8drr5g6mndezt5564oa5ndcln6deis9pb150mb81qdi5v6jgj1udhnrok1624gusj2ftcjkfue8unlujcn466uhya2m2vplqosf75icf87wl2kcnhp17vtnqv0w2k4gqbxmmddcde8725inhlstujj4d8ekfba6mtyqw0sfwab4gix7tgz4htpcy7lk0ba3ldrn01ir7ikuhrjaxrk19adh5ryxbczkxamcuefmc0jpl6i6e9mm8joiovkf4ru1eh9sb5qqgrm3unqfulma7yxh8a9lhje21yjw05avak5k4usy3p56e1tttpz9vhdwckr0jlnjn04l95wlfuuipvvaicws78way5rbkuxv4fbhnpera8zxo78woocg4k8u2xf25u2ytiegeqsae8j8tw7syx3h7z0nlt92hwky471ctuijpbcjoiws48hhzj67mt9uczwj02w3cbssasbx4dkdonrpjwfz4crvst60skodjivh2pnnmw0ueguwvwoiz78h7dxvll4n5gxtmidt1dv4d7estfnm7t2vm53p80jxq3ltxjjv20iqxclrwm24ye81fapujb6pe6x78jb0m4xnkpdbkt7657zmwvynedaqj8i6e2j7oybdhty2gp43vvahxllez18m5y2hf0khdi1h3wcsvabdcrsugar2ualnoyfkcggcz139egtdx4ecgh9ct0o2qlgy18fukzgiaji0gn2ujy4qp40uo2kaoiegcnlkf3nu0zo2nm57lbtzl7lgoeu9psm46ynm9lk5y06esikmk9ym7j0n70y7tbeaik3ynikx1qyy0kyv9fma66iwjxj7azox0uie0zs0an5cu1blg1vcxxpguscz9aj03l4yncmsog08qojo0g6sq9y6b9jpwg6m3m79nb5a687a0hgji7mnqta27zk2cvybu0e5egpky7l6ujiuio2566446sokigxbqpsj27escr7v4zokah8fyvfvg1u87oxzy0gsdb4xpb8a3ruypdofka73usjv8z8vvnwh5vr8ymfi7eeiclbe5w3g17083atcmtoj0cwiayap425mh2jb8c6qctsr3xam95hw20c12xm53tnf7r9s20gy6916zv9ek5v1wo6etz3r8bnngwlhm85q6gyr3defj3i3i31jyd6e0kkfaf7vlyrhq8nbcdxw0tz0o5oyl1yby8dw6t18br510ax3v0amsfro7jfgyh2k6t8fmzcxhhtfg7v65r7u5rkpf5rhorofnvv9utyr02qmrt8nuph9kpn6lkbdj6k2t5wo1vmbp3417qfgfdyt3uxgo0ewgg1eeog9lzdhoukczn0xfumuqbsg475v3oy4951u7c9k6421sybrgo052qhn7m5j3p6zl1n1mdg318xy46fye2sdy35e52pfyviugg8grohz6d1ur4uf6w4wvdjbfa2jgpm3zwj1vn4artjny8u7kskepeywfl4rvcud8irmcqnjs8x8ne2t8pnrj7oni074mxboj8zheo3ozuirt2uzhly8apdsoeq1icvgzqrvp3194qos687ddw5row2e21ye0ky20yr81cebhwzykajjv9rgy0ay137oczq3k61qyxk3hezb57gxuh7p5kzmkr102fn5jejfst465jud38c24f4dfp50k5jvdydblpnh0njkfvs61g3k3m3pxxayrsajeksjk2q3qq96d6u4pkzjj34npn7f7yv2rqcrikzdxf7he678t4mzd5r2nkjh65ojubk4m0nqbpry3dma2uam9lwf5x6lz9heh1tp4ritedmqnrmrnrnd8w20i3p9bbzboo3mqvw3bba7lnrlw8x3f4tb7mpomxi5wivsqaimxogmnoelza4fwwyagua1fs3quc5cmz2hxouhh2s3pvxhwu',
                expiredAccessToken: 6467502184,
                expiredRefreshToken: 6568580703,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'sldtb4khg96q1yu5mbh8uxv82n9b8xbly57v8nihv0sptidbnya8hb26qfqc03jmnyd1ry1p4rr2tksx3fympq4v3245kqf17dzdfe6ty00xy3tsyx7vertacc3di8gwpxdds918yxsuwfll5y34htozdpran70mceogirb4ueqwxwmkvtl7htaq3048zkk8s19s4zvmcchyfvebwvs6whcf7elmw4zgomdm4r3ubf7kyd40tpyl7lkk7xxrell',
                secret: 'gq3tkunkm0wa56532zz95b37lxw8mwnmk2umgbmfpufwsn287iahw782x6n9mb70ayoddloxt8q9dp05m50ol8wiqt',
                authUrl: '7lizv3x1k1w2bs0tmxmtp53evpweb66r28timau15fbxbcbsxavdlvsg9bflvke77d1hc3b8q7g6za5llcray7hrxgukw01kano2vb5k07kivbrlviq618q2sk1grn7n9xjl4ya80cg4g6roi5qbjeecorw3i7uq3uro8p627vafx8p8c822fgz5rwsqu20ehngxf3p45uz641ha2yqsed5j5x0x7u1z7kyqw26wad0p1rxienb1tppvwza0sjogfjjlfaehw9gbbjh6emy3hhp3j1ex66gq3nio9ug77k1jfq2ql372t9qt176612ilvqmveopbh746x3m216juomch0n3066xlo88kkl8v4zomduwd34x8lmlbf03pyh3lsntk97wdbubwcy5tv7xl0yhi5ekren5hn4qfdaq5muywbmifkkdzr87kgx1wjss62xdkms44v6exrt7g7gz6trtj0a9mlkjqmydjab5mqf6jpn3rjpeiywm8ffx24bxdyrh8s6zljgh770h89wa3hx106b9pn15yxpsxhx8okml6l3yea9fuvikbyvjruv9jh0lvbnvedt73dh78nvg2bec3rayiagnhxcu72obu2z7rzck9bgwmkmm914tdsy5vijpoy9abucda1y9r01xoggta0gc9t23euibksqib6wecrsroeksh19ldkszje7u4s6wakmgdtucku4kf4c1t4rnhywye38zwnaod1nq3te6lvn1ucjpttwlz6m43becadb2hp9fcx2pflie6rmusqlurmq4rdtv8au11ouqlo0gjuj5oyysuvyewq0vas33kajlmjvyzb71vrj6vz751m9xlr8cqi0mwy40638bb46nsvjiggcbrt0rbdap1bn1j3gsiu2s48f00qx59ph77juozvcccgkfxu6hz6d1llibkq1o5l15ls22k51sxpahyddksm41kj9kt546kqy1ka9syhcyekng1scf440g9r6mfub6hqlquibk2ph90waeiani8yi1dioe807p4181ely5go5nt48k0dwfojsavwqworemj267ggmsbrbwbun5kwqs4enuos7ohl5x0g705few99p0zh7tbspqhzq3exb3x62h16hzx7mp6s9lfdrdl596rpl5q6e7immncqehssj351i9byip26l36qhz9wjmjagufllr30vl5z81ny4cie687adi4zuswbnruzdtl7kma590h92r9b04ejvgdm01zp0prbeksxt27ria4a4622unnoao77jyps17jo1whsw49nvi3i9963wh96d1ifnihf752tzmqr4mb8wmrt3s1c22yz95e41anh5ka2ifyy9al3s5hm4vl7tfjvy65ffo1cdev0j8wxzdzxmc4zehvq4uk46f5m7muek248bm9ocr8fixt8qod2lwknydv2mq3xcy8hpob2s4mqxd17m5vxllfy44g5m21l6l0eksyqlsh83x0sfqvd4cwkp7boepk08q4c7m8igt3yqotmcwc38qjp5fs4t9afug2tua6e80sl3xuzpnz9bvbes2gird80l58wgi4i9z1752p12ctkgwzm9703hxxwjonidm09nsgs3xohshqc1lj77qnypsn5sup2ezz9rizaubri0xkod01jllj6da7x1s84zo4afvziw6kx4ekjxtyuy0te99nq0ddx2ltj0hnokdfcsa7e2p3c28qyo33j2021ksuinqav6ivqgsdy5vsgzlu1vrg6yrihsq98hkoei38bjhpy70nzfuam9399d7vsa3cwui4b9odcy0dhx1czuekycss1sj6vsh1p5mffvm8r6xpuusdqg4fnbll6r488u6irkrsrh5ik8kcrwanbo60w51cyd7i9yo310vey4q2n6pulwwt5qaxtsohi3n7kwde78d08r5mlimnifje7s29drrldoz3z4i5zhdmi3kd7h1nm195rka514essvijim75qubvqtoaaiehhzzyhmgr3t87ommoszq3fkean1qcs1ir',
                redirect: 'yoo1r9ycy0tysapvt2va6417k3ho7sje4zcpwzurrudd1z5h69rw7hypfgbwo4etgnrx6n65emn3nouq7fingn85ghqwvbnf10ll1gr030ps5fmn2d5v3fywozc9ovts3n3orp5pjl24bdf7ulzka781nnwc7h4ju7uk22egtp6fu5xkytij55osr6tmn6zcz1mn7d64zffccv2omug2icekaq35mnsdk5yw0qyvep03eafinmcwwhqgqeu68u9eljdzdeej7twy8rdodb9ym8clow9ce6fupkx3gu96l6wpgfjznfafrchwu2t0ktevdbxzzjqxi4vqlw4g4hl4edbh8jkx3sjsco521b03d8ojauloln76nxquwpdv4eucaqaw4wvlpqy1wb4f78j7wshvuezc70ro5xx0k5235afzhyurm5ucnj2y78xrmhmh2sgitzk9llvnfztfborbvbkhqf2oodgdt0capdx655ktx9j8ep1ymcmjhcyjl0vhp5aotf4dx0msanaamn2scgbs2p6tqoicqc333eb48gafn6ql8edcw0wd6x3hg9a8w8o03uoekxctt3iqf6lpznrmond1pdsji2z3u5nh7e120rfifmn8uolg7s5mtpvx070oqy6uvx5v6eytwcktv34ygih8imgq1mt0tf2b8f2oox5ym7dj78i0vmfrbetfgvvyk789kc12f3ocuufifw8vxrj68n1x8bt3nltpbk9dopxgxw9xvwc57bt6ta61oqbh5esuyx9fzs33lmo8hrvyur0umgjd8n1196k1v8ji5z7o5xjfpe03ya77atif6gzll43qh7hlel0jyavh1y1x8z2p1dm6jsak11z3qcok2p215fmaa80mexxzxh0q4tjzjsxwcfsmikf1ngn4d4nlj74a8ngav8qvirnnbwysys8tzg5m4uljgfdo91oim97m3y6hor5i4kszmh0m5h4wyzvac07k7e755hchwk6wn5r9bsk8p2an3rgtujlrhaxnjjdfnu6ksops9wi9iifetddayte3fqrdfge5mhtp91oa77izv7ipk1knvtp3d0e08hwg3npzngzz0zaewabyellofuadfrw1zohihbx0bmm8r90xkjd3tnfxmlee49y4skzb2jpcsi2zo93rv6pims5qz5a3zn22hb2s84r5nurztesln16os2diwzn2ripaqam9h98wurl7gc3987m39en36j4tx3adph5vwuun5tbqp8sg3996ywrk4bah30s0ma7n5arpfw7joppmo41xscqzmagyixfj4q6ncm0vird0t39acdmnb0jnfabp0kxtlzfsvj4x5xvgqq4azw4f174v0rdkka5zer156hdrl02xyej8mvv8gtbm88lx7m1mxmz5qh15vabfojfnwtcbvi80583zom3b873z0ncua077lfd4hfwa7zk3ofer3zgefwj126j2lf4jikit50y5su6ptm7fc4ufbtjx32n3kda0nz5pgti8h6kl4gw5w0qse5rrgl2n1wte8ed73x5ernmcjsbts10km00hra294pr6r6mpq9tnf8endxrvyms224l853g3zelplo8vaxtk7vsqqej85afkykdiklyqyjy6l3ucjq4os7km7p8k5kkof3q278iirha9yyu5iesnw16sy7oy66ah00olez70orlg12q8cd9l3afcjipl79gewkq3o5o7eeyx028wrv7a131yuyq8bovesglbjpfgli0hhmjxxw037w40qzxkgsci6675k63iev02sx9aj1jfz1x4whpa3n6w8dvuvj111ls0jnmrqneq67cdvql07sdi5q6kwekgyx0a6948u94ryyn1qpgl8mp0y7l8ojqc9bxsmrycav2rsx1a3t5myopgt4dpjijd5b08qps04gcmna0cf1n7zyzrfy8u0ej2fk9uaryurvqkpk61s72k7n8ehjlm4g6o100ahtu7o36fwtv73b7vp57jrwugo46wuzsujdu8c48nxvdft7f3',
                expiredAccessToken: 2158498020,
                expiredRefreshToken: 5664343367,
                isActive: null,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'lzazr7hbwl679bby0f4q9h0n2ugbl2ettp5kmxtvyqmhovl0ak1txrimqvz1qtrwtpwfceq7hak5n3xeyqrg1aqwe3sei5xehxobvn8bo6sz5oln0smcw7bl2t24h2qled15ebwwik859n8ynpj12skyd25eczupftr92w0us5w0wmk43visqkkjd3aaivvz9q1c4gu4gg3lmydn12ijcamd1qoyi2nndkll3u17n767jaj4pm2yrde2e4k6bfe',
                secret: '4i693chafv4l19j7gadji3dm6kzlixmkjrzrtgc2i50fsz9vejhvkosipuokexo56k2qd06ggq4ob0v1rnl2ova0u9',
                authUrl: 'p2lbrz620p3he4ro9ry2schfpybq9ycv4y63tkqlf9egopt62gr2pi6hsldgdtsi1rrvwcqd9pr2rf26nysbzlr03ahfjmdw9sn0yh3duvcikspgf3tyw8pb6krwp3idmv1wqzd7h8ukpb52qbuox08u05mh82r2t58oyhviq3vtcapvdz84uyey5dngb0byogy2gurgspaztynm6xd52khvpidj5dpeidl0lnsip15xocvgwjvlub5fsgiejdb1y7w4qcrf698lxngx3r539d6bj9csmk0gxoa1vtjayikvu04t7karecq1g1a168p7kjgtg2fapdgk5o797n6r0khkeye22bkhe3gnriifb9vs1l957pxh5im5tsfj4h3xn0d2w07se298vvqxrmb9bcdadg9aq8e20xg5fp1lzlqe6vvl5tcryvgm0s7tqa291jtrmckgil3f2y969mkfmet2b0jm14u71orug7dv9jqmegkjjjckca3ubwdxas0pyus7l02tnlwu6y1pd3erryxruk4xzbk6kbdctlqe0v921hwox64tgm5lyc3otof0fp33visnd7sosokfwz98srvkbotvvrskm1ofx6833vpistx6q3uxn7l6i4p6uiqn2yf3nxjfx2dnpl7yq4p05lv043stglwr461q9o8lqabcawcfu1mwbd4hn9haun489j0d48edgi4a2rnw4fnwn289v8voty0wdjon6nnosubc09i2dtdocnwcl7kfcxccd7zrv5s0y5bfd1bzq2z5fpni0y63jaaod5yfp478vmo7th28um60hod444eglophpbd3qxp2s81pol2z9z74hqan8hf4r3qzfntp3kt82545guv8mranbtkmww711r536momxbfbwxresdkdzfu965e2c9r6xkunzjq70b3feupdxl3fbhf3g5od958a7wwrskt1vetamgl29krx8ngj46i87uiedsivt3j7bnlkfk00gufnr1hnu9abwliwsn1whh3j3cp7lkyj31uh9f7ltzc2rj7f75i3u5xqqlrd172l23ttarppmixx82ps9zo0ii9jkbs7vtnrjk42nto2jdf3do6b4rwwxguz680hrza2d4c12yzrv88vb45znazirtv7v7a06qt62knq0ws6b2qtuvo7sk0v6qcp0x6ku3ys58b9r7i5qlooo2rs2gcb61b0s8ztqgfdj7utcbdxjsrr04b2g93s1m29ir6aukiqh7vpa7w3i0pu6c78kn3tk8zeks8o6eob2u4e2k6r1fmnpvot2m6m5gl7ocd1dv3i08tm85g5liskcibbe10ym1fksv008epl1dwu1gcevzj9xi8nqqvuq15k4fenlenlu7gwcswo12noangl6nj9rh6zoq1pkrwsos73vk0svtqdfenpsn1jvlh29rgjgmhrzqvamy3fimjfmz0thqpdmk22x7jtjhlir31hur4hgdkdqsar3mw0hoxzmk59kr0j9ah4mjenaaqu2e5mf3q7u0vut5kzg6tyguaxa9xidgktoqtm0ftcs50j6b48099bt9ocmlwj93v79rleh7gql4r4w9oa9hyno216epxee2pvp69gghv4zcq70j6xevzakfrbpwlctcbuw8yu2wpdw14f937qoozbkszzwmw7ii90zs8h8kfpn3mv0ta75wk1kmpf0icyqdkg4ql5gepmm54aoi0wdampze92cim8q8r3jifkoid6tfwq2y68id95ib86izfo2tp74fkiaykqgrp84p0rocunybfd7756fwneuh7moktov6zizjf1rzg0puo69adaalh03tmr0oc1ng61wlzv4ekq9hsuauyxbd4pvdg29zbnkc5pjvdr0kafstwc7m6l63dus396b5f11m9s942838olo547uyiqnkd211esbpdg3s91sw6skv00ns3e314hvwnbz01cedzuv0ei4bvz0desr43u8naqabbebr8u8bsr7avu3ewos87dl7cizmt2lyhxowno054i',
                redirect: 'bi6hdbwnuppjgcpt5g8yh71a41l210gq53ytqpxa4kkq2m886j1bvqhlks9bayi8ohz2wlqvgh303c0e3tsi172p5s7ok2belc9pw73tj3uj2su95e1t41fo1b5cxvk0zyjcaqpqzuw5dc1il76acmg8tj6u8qbz61o5cs8tjty5c3oum5inb2zjzjmanyi3u06uag5bmamztf5x0y8aqcv2fa8bqinrsxny11spzpj9mebvwyuguvoakttcfhf00o4g8lv1y2g4aj3xvxdno7adclu0xlr2aiwgpoab4w9ukwgogu14gfci5a5m2f8orldwis80gx1on7pxa84vp2l7t85e53q55vbhv2gawovqyuesxso3ky8sklgwi8p34exxdpd1hk4xhdxs211zcts5umaxnrecw8t3s9bnd2j3en4ztn4aey7lvtt962lndbhii74a9o5pqp3zaxckuscce5pb3o77e3r39tkr5k1hg6gkoqxs20rwdvjtj9arcq1vm6mpqj4wj33regu7ea7iahzobvh3964wt0omlo9kw0hmwihkbnxq2sf37tf1z4gbugk9az8zgc457kbpi8aexkuberm1gvfluuzhbxoaoctpj4de6z1uku5ysfgzx4vuyjppfrbb6dmgyycjxlaugol3xrosxlkbqi1wshw1iqbomergphqctb8wvtbjngj32it49n6r7uiecorlewobcpyax0242r5vdiab9hx58jloa2v222b1dl6ta0bkxg9r5inc6yln1u7cbubteksraitc40cu3s9ygz4q3v51umlkvnujevuo92kkd7ydi7ig32c4zw2irdpkk788q6ffaxtgj2pvb4vs3cksb3kpj2m2ip4r1fp71rir8diwdfr0hch1v2t99o7ks0tlzkvoihjlrbsn762mygs8qhw824gg3qfp1ji1fpe778aa9l8b5d0tkbsbob0insyyu9y8t9sc9mmjorpw1ip87ykm368esdao13lwd7dtjs900dn4yaho26uuhmoduwd7t0isgwz8mpndnzcphyvwnsou7kz72mpe6cpbhjrfigjzten54ka252b3pkngkn8tsp6h5r4gpmokbibqu1vc3h5y7l2uigkt8mcknses0krej2lw7dqlxrjstqw3j575z6yfa2hzcamfzk5s5ed190rrunwr6iw5xesgh6orzo5p33lzrvhmc0quimp6whlbdz1nkdf7evs5bb9uvk2q5ljamc2wzi3ioa327wfy8nbrlmtize0hh2te885g5w5v8jjppo6nupqga7hre7caijh7vwvt266bp8881c21kchhpwzkusq9jejldosduep9gk2eiqpp9l4x18im3umt40lntw9icr2wmv5gz3e567ngz9rjvxprjlhxq0m9iz4uabsi66a11yvmhvieexr7bva93bflbk26tsbhf65qnzy5x9i6plnj31peptzz66er4t6v9jfihcgkww7l70plsw8ogwoxe39oxr6acmd89zofckadwu1qnvdjrpkhwojpkomkf822i5lrn9mt4qahf9hbm9fr4picck4opv9qbna4vy94fe6u155wabdltoix9xyvqpxrry3uso2r4a44tgd5naxt4pd8xvxw9izm2hkdah1givdnz91zpua4sxelcav2jmaejbzdo54ofpkg9a3kwdanlc3jv96ahdqvjzdww3zvkxp09scfx03pol1djzf1jx4ukiuohm8xs25uxt6rxqkrvc2ly3byr496it0eoxz7p1enwmwarf4lyar2l4ppdco8aaugnhqp7u5857ius0781sckg6meyi2o9nnbscd1p44m5ysavwi762j1zwt78vuknrw240c4md5a9muehuupws5hi4buovqidlx4zmlby47j3dfu1qav2zsjjqg9xk4pnlu32hdx24tz186sqs2jf3jtmiuhr7u1id8ls0qr5dy7la6fqqwd4eui3c8kctr5yyxxkgagrg0g4478ghvcyj011c1dnc5nwv3k',
                expiredAccessToken: 6239688272,
                expiredRefreshToken: 9852017072,
                isActive: true,
                isMaster: null,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                grantType: 'CLIENT_CREDENTIALS',
                name: 'jmjk9ezc3h747kljuqph0chqp912ss8m3mwxjzeymz5lnowdajuzyyfwfg3f202l14o2a7hnsq2wh10zvnquritl424zy7lky4pvmrysejsd7mvbdgcdr8aovowm6f8xx5c0052xcozzovz3lm6870s7t27u60s9vw718w24rsz8h5qdo0ovut6oacw1yeaikf0bg1abll801gg50c4bv29vzntrxwx6i17ddou9pla9f32580j8knox6fvcd88',
                secret: 'dziw4h0tlet3k7ldyf43hjallmez6f7bhflxiwpmkb1jifbhq6mphjc5f3jtlxla442xw2wasxosdc62un4bn5e3cg',
                authUrl: 'kk7cshgzbu4acvm3nrlqsorg48dbmdbtkwrryqnicf5wd5m979f9sju994gwbc4f4uu751xr2cfg7rlemre8axwy5qmg0wd3lz0baqkcdg7nzl9ra6w6h7k8yjnj0aaj7f0a5qh5wq3gwmiqutmr4mgxh2xs8sra8il1e4ywd3oq6wmtjbtvipz4eci7k9vk5gjsw6vmo31o2706mmkz8454sgik01pfr8jkd31zs9ukv1bnvpgt1jobayo458obmjxkrorf6uc0th8nwsvs640j8qzux2ay5rqwc5utzowa0n8ksxz0m5x59dondcoh1bodhosqpyrn7mt6cngva4qib7in105w9jtl45dcmnxaat45l00spdzjhqlez3yrlnp8xcv8v0f3ayy0zlm7owfz2qhlb7193if4zth62xmrhldefbkmaph24208vssxw5qvsx7prqtq3ikdyiij1ggrf42uqed5xns9fiywiafbydvx6kb5som4ntyyzeh9j3fap2e5ff6iv80yg48aqbb2bxgusrbngged1yy7xhyi5lfp21lrawbbtbdma4k5ilow0j66buscqx0kgtokhpf36lepmn4d4ewv5rwsph1e88s8nfukva3odll7i9lhh4duolu22v43tpa7liir1kpfmo6922c7iv6snppdte2dohsg4x5h21n32zcrjxvxglyeaulpiqhj8goinrfit4peie8noyfgk9koiz9m5b59phiwb2lazgit7y7j86hfmi53yxwwu97z40ygr3o5r1h6r9ih9z1z9lyixuqtnbklgw8vynljf487jxmed9yvhw49j7ybdq9ts7pm2s0jl9ywrqq4dc9o571y815z0y3h0cgocgkcinm8iw9psseao01107j99rur3sophd4ucow7t8px20xr5xct8qnyydgojb68ey5q24kh02wa2wy3iww0p323hsqh4fdnfew4amfntes8kq9qe4g13ncswaj5r08yboivz5y6zlk27jgx0mg43dt5hg0715cio4pbjwsslx739h2bfjlfjkrvnavfvkyotpl7laut2s76johbi05sr1u5i01vtq4ca0q6cinlei8qoi9jvtd8py9zitjpwbp6b966bu6hs3ve3aawstnv5rtwyo2to89vi1arke2bcq5x5ckm4emx3uzkm0ydvf9jw79xqgitypdlxf4utxn0a874p2c692rqlb07x8cve1x30dt75udd35cn1uui7lvfui7thsijkdx6o65s2hev4iv843u7v9154oijx22rfz9mbk8i7ik0kpag6ugvy9jtpbj2ki1b1vurh8gwlq5agz7eywwytf98du68rn9idhxgv64ufiti1z6bfdfh9oy57thbkt5zsyy5zbwf3y43fh142gz7deteqffj6lxyi06ybkdwknwlrbkxagzvts1ou98kmimbf69sanwi0mfjz79c9iarc3krz5rfnm4qs2znhcr65wj7gzb0o63obnfvekybxu8lqnbfj37zjykttoatorgn9d1cg5jzvji8rtuyfo3nk5plpemiosnafx56j2j6rlncgl560g7ij7xf3lgf0atuze00yylmon85j1l1grkrmlx2q7sgjyg0osttok5te47ydug4vmo64r0jiqrvvvyorlpg01jcpfqmraroafflzlyibyhs1u0uatrr0zl3sl0wws86mn0admza4exjqpxusppnh7wxu9zv85zmrrdb7k86fwc4jwjzbagkhn6nz7ncfv6y5arquh9liy9ydt9ph235i2gsfhk92qr8z1aqzlugzs945f59hmjx20ma3mh0o6zks4157itm2dorqzcw4f3vqlucn21iou1i994hbaxqd2xij817zvn7kwp145rs4kgbpvb5ok813x9vkjcypmkb8a6bg6tbicsrxbldtvbi4be4iooklnxdntwsp5xhyl68ui1omg4v8e0j0p6tvb18j72j1nw7orm1n01x1876qchc84alebl4oiaphnew6sh8dt5q',
                redirect: 'w1x8sns7vp6xxypez1o9pdl2ysu8m8z1syylq9efrglfw3euyigwaa2xx4x14sg9h2xkpi9eamizwob6189nddfdc99a2hxm7qhkhkpdy5br9l11iy4lrbgnh33f482s534d41wfh0n79laow2fao3km1gu8r656uw1bqp8w0xyxgxqmg4j1vqcmf3rjddv9an0nicwdvbwq6cb6x2ag0mymm6oci7phgc05akl2yr0r6m3bft9sofbo1gw9oyvojlkyw3nm21j9ffdcikyg8qfopmjyekhwr1dfl29wmeb7awdkfzube9qicrs7f76pqzke2jp8gsg5y922jlifkpjchfof7q0p00hx122oi0dbwr4eb857h58zecq4oenxui9x2xapnx1hzxymkkxc8byz1k45fn9u6bkvj8jgvz56nhmbge141il49783jruwyi8rxauk4c3lhuqnxkc78auc4dbm441x6rkaoz30fbio1nn4vbmh45tj6l5ny02l790wr7ku7hr4l3b5i5f48xa5cfbkmict564o7dnksxuww5ofiu7svgknz8hb46knja6c8ldok87zhxvi5isla03gjawxh4jq7ax1mob4s6n2sztzu6o3lnsasw9xdntq71kjw4e4kp78l31npzvkq755qq5p4uinpi3ck3z9e7qp0xdpxbw3u4c9yl4m02d8hrik14ygu496dvmwnhjmxgm1arjbhi2tw3a3wqz60pc3tgiwelcu5x15hjrydf3txiu7okcltbuffsls0xhqmrf7txdqizgfhje1yl9glhycswzot4x1kno9fjk1gm941hyqslul2m1tto0qcecafy7wvxuw0fej8rlvd6undhfgb1aaj0b5st48jl553g8zv8zqg1wzzgroxnf91e8xe8t378kpa5z78mqlfdq4u65mnkvoxcg3yzrzslkyr7s0rzwz9lic7b9fscer43sriunn7u8o22jqjbgasksimoh8msz43u2hk3x0en25hwxupujez1c2o09rxknxhhc3b45vdgmplmmenlq7dg1vxt65ek5l7bgxc45h5srtnj49zqekewfitg9y8f3rcevhn90bg7rfp2bw3jtvytxp0gakfxx9azzma2xl4eqb9iknw2n0a6p7h44dkb4h3n6zho1fjfjx76zslijrmcocsnkjuu0jioag7jcnnwqk0wah092kiujpdmdw9gw1gb2hcvl65lxpysepxk4bpa7f2uhkd3344v3nxefl9p4me9rgyfi1bk6f7ute34znol0y212at3olrb2j1gf86kq79m2e5kcn7nmiyhv1qkmfcacjj2abms7f9324o2x9g0ec8pb5fh7epm87ai5ysg6594x7iewnylxselu9k54myormyklbv6ajsr8u633rg5h4tor3gps32frvk6wxdis6j1qjwp3mo00rx374xjwf6r8osyapk1m39wi9p1ljlv2dqxpu76yjc8jvphr8egh417quecr3zqb58tk6h93hdk2oebzrk55kv1wu96qx3i1qmrgqzo41dqrfj7xlifbqh1onigfzj4srn92k83bl9t0yzwif53e36qq924veaf6y44q22kbh9tsltkzt64qgzac4jhc4feh99s2yz2utqyc5qqev7tuvrpvaguevhm3yhdq74mtmeh97rto1knfbfqkzx6tc5uysv2qb08yulve83r03dw6isp8qgjslaoscekdzcg4hu248dvsllc4b9xkxbu30vv6jq4nbob1yjsxxahcutm8uxumz5hsei1je4e9t6s6f2suyiuhqyb6v68x8s3bbec75ilc3tvum06j6ad1vuehegp33ghnabmuwzzfhlcqz32qsro3nd0w0kqg32k4eykttgtjwaoha21ii8x6ir06e9naxjyg2tt73hd01bqczxcv8uzwkds0czimesbpzy37z1yjzp0d4c01u1dwrfkoc6dss1log5k8igs4l9ndp3qi8iphunjmhhg76l57tv1l37nwh5spbulrf',
                expiredAccessToken: 6152664447,
                expiredRefreshToken: 2884702730,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                name: 'qt13236o4q6p8obqck3kkved159rmp4izu6pfpx5c4nw8dmqaxu1av2bdfrnvx0rx73tzu45ktnae9k9qknvag7tn8yegkgfn0fbsy9t5mjqdxqxlpizun3wq18ipkbz8wecxopjf7apzdreicxjp3h65raibm4pl2zghwd8vmjog4uz6wbh5sa1inau2jxb101gz11jns4zcxtdinv4cf96u2foze7emorpdyirla87y35rl99jzd6vltfebgx',
                secret: '6jdygsnbognrxegbdpx8p86exnwpqxxr1emrxvpp35mvkgaq4jfe435uyoc325r0gk9l2ob4lu6o4oy8mc3adumhe4',
                authUrl: 'uygu49dg4j1dr9mov5jus59zlf6lpklcyvq76vimqx8ugezod84hfqth5ytu5a7ab09la3z0qk9w4y7mzh2rr6jwg60rqky8mkavxch17eyypw20soi9rbuyzvukos2b49csqxo2ly80jdjlr5q1ymnpohrock3j57vpar967kl62agwyy7z7vabjwxuomygx0xx0q76d0duapvjbafu2q51vcyskb0i8wql7dnpiz0jmi1clb7ibi9fwsemenv3j63j8jdz2egaf6vte4xmprbrk0ljpnglt37cc10wdx6eov0scf1iry01ci98d6gqtksmlhsdqc7l7lmd889psklzsacr7yj1fg17uiw2dom6b7s3p2ajxros2pk2hsezidkhfofvymtnxqjt516a8bbju13syyokdmficbwl1og05fvpj82xlvs3784bu4n38hi6nw8m3ashfel2nbe90ngxzyplr3i8hdmn15fk6y42e3mvetn0znsu72149q9m9t3h7tr3ja7d5nu75smcfu1hdgmtu8bpc159c7dnl1uzieaviskg92yqf50plpv70cwv9104fq4ww4nl1vcyn9usqmvkw5aeqoeosagnnt2uem2hfs1xnwt34awnlzpozknwtp2ulzkvyq0nqcsyhj2fshsuj455u3nb8o3ax9gxiy7vn6uutb3ev40vgpo4g01mkqv29s4xtct63yg8uxt6fr23rym817l6kor7jfbqyb8abstvhloq9ueiom43jdoa2z6ndutporrzmn3vaqdokdtg67csai9h1o876acneq2hwsgc9cd76nmu53ddryjdnrgw6jy262zbq9z0zj9iqbzk9rqpgppmyrksv9oihivj26t6726mgk4b8yqc91wkq44z3om1pcgxnxjyqvtf8p9sl2m7pqf1mr2u13x98j9h8dhnfavskwk252nmluxqvh2qc2jbwrvvppkgjkh92g01uh0yzvpaz3g34y00cvkn2iah5f2psadjl1rkng93h6e2afc6mneehniaryi9bmh013uv9ojq3f08tzv9l2u642z3579i099z9zs2qa99dxtjw85tcvm8nit1jlygasg48yew6bys45y85edvk6i5hpx2yaf3aakwg2y1qkgixv0hrx92mbqcg3xkjcc0noq7brs92j6vw3ezackgskpyrpspj73uv8woevz1s39mlzzqerr1il3k5ewwzs5xux7so14mr37srdqjpnqd77xuqbvigpxt7yoq6lwng5eie6sefsyf9txtmogsds6v4ub73hupw7sbs22izbc5wyb23astckpte9p826t5gz147qvhkeqvffulwkt6t49ippw2j26byrtvq41huazvzky4q4m44og3iv9o0kctnmwoauyhq3pd9x0zgxhzb8zxq7u8j9jdntq1tqklfhe7vrjv1172691g0e1epj24441hd2qkdz1txxm64pg4osxs7ggwfgica5yumn6d66uneffjm6wr6b5cfozmlnr0khyc4un9qc4ryvndgsvdwepzkw52hnaixxplnmahlwzsznzmxvz78x0026t9ixmgjrn9bsozeibjmf9y08h1j9xe48ueb07p1xmgcmbgl82io0gxbiz0pfan3zenphj4l67tidmalsiw8h3sguzuw41i54vk1zsavld7cc0novb84b69uwilc30fs4m4d4pn7mwofvmmn549g5iiovf185s6tuxj6wg1gvk4nj0ba4s5zypxg8g4gb3gsko48kxlrg1gew24mo39xhtglxu6x3nu3y7fn5fcq1kmw58319oo1337gaqmzzwruwcp619sdasy0q3l30tm6sghkflfu43abrlmabh9ntvrz4y9g20s57r37lx97launp6em4m6482ahnty891i9p6hc8wym09fm73642iazc7idprwkpc5wq8nxkrdnkht55xacp63odbhlukzafdj9wp93w176rxyoxczgrf3l6tltzo0ff77nzufptm9nehpwm4e18h3',
                redirect: 'isjxnnelpd36div6x1q527al9fbl51o2h1mkel90zvgjm2aafxr08fnk5mz03slaczrfiaxz6t9p0trb0d89h1qr17cdpaa05wjear44r1hvtrijcba7qeiee1hrlqg9ujv1rtouch1doqy1rm7ehka8ishtas5un88hsdgyn9c2eqrrs09rod86015a8bxmx0qcv763ddstaxub92kpp3jjk7s0pvtf5tmyxcc5qii0t7a205f5r2jw5vtzmtw96nkktk4rdjjqv997l34c8mwskjqo21jzvgk39ag0s72581rx7uq15sjeydhtjf4kc92z72bsnligg838unz1qqqm7u8oqchzl8z4wn9zoe3xkcw8itj2xdysbbjm3hyje3inmfp96so003bgbzny03ggxpzpm6xccewy23wog3v5k4446twdtd3j05x6djvr5uqbl04zwhepz0zpmgm535b644gbmciedlc27nzis4amzh05my2d2igwlc94e6xw595euhz5r1rzdixh1pzp7ji6ofsfhzuj0ojrzd4dzim72yop0naq57mv93ssxo9ls93t4q73z1qs9aey8935u89174bgmmo5h9evczx7i1b0pr5dm30gsmob7jx2qmljx4q2i8uhv3fho5ucwgnk7okoghe3zag1mo7djiz1f66z0wgvc5bq74ns0up7rftd9ind8l2f2kx02q8awawehngeupayzjd8ogetv5je66j66w09at2smyo48cj78wdxotlsjfs0aqi45x156agf9a311nzstjon7ux8xbnp3ijmhhpgtwx12de3qv55n7g3ret8y1cqhbgoangi2dt2it5skt4ye21sfd4k5ta3wqxfjps44rq8r0asa7q9ah6z3ll55rh0zbmpu35n9s9ldkm5rtt3cw2hvo1k4gpkn8eva1hadyzz9q1ws6ppua1qinl3wfgfjiifgtqd349xvfkkc3s3mq29fxmgckeraa2tuwig3n76rhg7q9h1wuiszdhnj5ojke7q22bpo5jrobsrmht6n1cojpmlhcxxdmb5fzdu745lx1kcobp2w0c8nsm5ehejsz5qw66n4z0b9o3li7ihg1iajurtf8o54azpji037oqpem893vgv8zllnmzvd3hxvgcp1ossxy96qn275n80kfohxafji7tymzbh0ody0v7m31uxrw2g6gsyw3gfn7wnwvg8qvscek2hihtqj2fdftq78jye5m2kvezz3517735b0lx9hfp7vmiizo28ewbyqspcfwvyhsmxnuz42jo5v9vtbwqtfyytd1b2n08fyherlkgo4tbpl85ks8yn2keoscdonro2qykm3cxupwnxe32yevfwt3a9sk4fmc2mc8jw8tnzzrkhvqw0j7fpfbm4rpisk1y48xj3tsk0stsvuofy4s0hwnbgoq94yeyz7284jrxhdfwe8jbsfwtmndjlv365vim16r3epsb3si6w4od1y4jqbllqvauyh3b7cfz4w160ecchlq7ofajo654ir9yb28y1xdl39fe62499k4lyzc5wigrs2vus4ghhfbbezh98blio9qxji6j2pfp9cqbqrr4ok7drzukqw72waxbq31czg7pcz1consjay4dj02qi4khk5c3nr0bhmwi62vkht5r1wh2466ndih9nbxgelcff171aw8evpj5t5prokzs47u8kg6i5d3kh9adgbcg82gh3gxfzvyjw2lllbb8s1osaltvtd6njdub5qr6e7m3mpj0fkcrlg38qqmnr3nwsdse7qbl98ia01go9cve3zin6l0ibjkcb5wui1gn7x5fn0qzi6ybdscj6arepzmxmw10f62wtad3hlvztrfskz2jpby4kaqd1cobyqxm2ytp0hl6ec3dtwneyud9dc1c6qviotr91iofmcu8lhcv57lhl8bnpo0bqycwcwljy2sh7j16byuu1f2issl9g8lf26i6jh4vg4i9sof0la9colx0bcsuajeh1rs2ox0t6hwkfcuac9g0s',
                expiredAccessToken: 4949376651,
                expiredRefreshToken: 7297400794,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'PASSWORD',
                secret: '9danqzdlgz0ea5ur9u9agv8rz3e8i4d2xrkgyldvbtm4vssfdtwhpy7l2ojcj0n075wq6l0535jqbtrdoo3z6uiy4n',
                authUrl: 'fx47wy8uxvtm20z1m5y4sqp7jl5wzh120bjasr1kdc2dy6i6f51ecd8jrcureabspkej56h3j73lg42quc3qdr753qa7shniqbdaql46xky3j1l9itscp0klhgr8190wqk1k4njpe6cd6jbtxo811ffiiw35webeeeumant7siscovebknn4s7h02bjegpgtvzj82bigptmqc28k4jgmhsc4gs653ny7rlr07c2p5v70vilihknecs6kftq634j92pxsqs6ms8tzqb6rymcml8sd6mlhl2kgvln9u8ge7gi1s6gik1u1ne44j3el6otbyob6w2puwmxvtpn7y9ehvk50b7hoehge4bmsse4fgtzojap8mt5nt1bnew434tkllkd8drud768fdn5v6uacuo695fko60ch10nftdtc7gtb2q7sahnrxktw0yak7osvm9ysjxxd6idkiwfnoxfos7p04cl6rjjd30z2cm6ukie1fn9sg8ikhycw8nj9xlhd9k0gnj6leh4vvjoxiihvo9ggpk9cknj71b95quul428361y9j196bwd83hj1gpcwjfkgbkvzdqlbr27gt787lv7koucphgw2ye1y3qnw2marx4h7mrhpbvih2qvvyln3vs02nz9fqj04tsb3u29s0f4nbhldlz9mq3y5zudswudx7tzfim48mtwcbp2ydnbq8v3zueasjwxuc8hmx5x9irggj16qi467bevvoulkjmr48ngve7z6tminy072mfjlnw7mbr2661gek7syrev6ks886ahzqyruwsnapqejbqnh25u099ahg8eo8yqxh9eqqbeikgf7nn3knxkhg7pmevweyguqbji82s63jg0ken5c1tznl56zfyjhnpz25ycf1t9b9rfmvi315v3yv068zlnfvuzrjlicrpnvxk3zq0cs33segyj3k6j9vze5uply9vywmthehkvdkt1vuingj15cb05oi7yfzck30yhqilgzilzw9hfb05od6v7hhfzw5mwhdt6yyn61iyglxoxjqjqhyqleqt1drtqnithzugnrzlgdiu8dgws9lqf5pmnoxq0qo38kx102a1xoosvxhcghriri156fo68prjb3laephsjms63ie7y3wqa5xuw0vkq6fkmodg0kpr4kvjfbj0lpn5u5z813gvev222tiw1a0nfnxvgrdxjzaa636y1bvcr6wcw4qcg2d8pdkd6wqnldt7t5rwhqd7qj9qzaqkvhwhdzlz3jm7jtza6v4uwj39armkrx7ew7jzwxb0abm872n11fsfc6flubh7nwnhl06pxy78fu56e4nebaw109dbuoj662kim5naoljl62qu51yh3ljqmj5xd3cx3nmwewa2eg2euhux2v22bvxi9o10404eazmxf34x3sq71wikkukx2kkskeez51wm6sycer8md8zkk1pf3emxrtsz6ldotvq6v6wsf7b2aax341jqvdibkpw93yqi08yohdawp8rph1iemcje2ckl167t7kycsedc9idin8svdkjcqq3kbqxsc2t71crab7xcponwdetpyot7xmphgo743cf5kecjf6odq1zpqcpdux6v543ngkkjnnf9bbknur364hbrdw1crhfwlvqa9z0x4mzl6yyf1sdnetxtlbgvoeqtjbenj9rx6eifd4h0li6w3pkikazurgqwpl0bz3maa03jurf1j1hkoiahmjlnfclylvsowbixt6omj8kjlr9349076c6npdg1jvzv29go1sg26sz9oeq9ykl39l9ws6nlqqa9g4q1uitlfsuyo7qqp85n7ne194zn8pduvsfrmgzezdlzwnktusb3ssl9casnn7v4k7ztax3rcmpc9v4pho01opf64a8jncxkbdpok6cjwo31zycmgcg13chnj3sk3ubelurfhedbla8helzlq2l4itgsj48gwlgocqfoc9kkxiqxnf5611w6zaakd50jij3he31cmf9rl6wvrgdktj3enwh41rjnhf2rvuukcbjmw8',
                redirect: 'yoise54y4b8mdg5v4s40o1bz0gllrrv8rtj8l3lselbrz9xh4gmqipkw9cxe03vzij3oh3cwtk6zs03ayzku3cfnw6md0xpsjkab8yi5cb29xyhrfgy8ojyy0y4lyf38n3fz34emmmggsvxubmabkt3bpr8zlg2gfbjyqj2sineki3ctyeg1m16f69z8o6cl9a5c3d9a8es9ppz8n2sa3ky3r31t11fg9idtmln42fn7nb6j838twyvbnmldvqhb11ludeo6edckrzee3ry00u1zkba47wqusm1gsl9c3lx3434i5gytvtgj1ox1yhs34pgk0catqh9dxw84fbvepgupm4e53issux6wcy30nqu0hxscjd2tkw404nqvjtksrkhqtt8ixrc8j7dnfou4psbgyqzzwkuem8bxgzis4po0jndl5nlcdiwh4x31u1nv5chzr0xep7md7k7amtbcc713fwso2r2k8vbubbkz5ka5liw4o86vmtcxgq7h4ufyxpxm7dzg7ejgxfxh8icxsik79fescxhxw80daegjnimozwgpi3tufaixe5s071tecso4jp94akxbrqm8oogdg25yk5bn91e2zxani1s66wb627o4xusu9q6lxeyhgmrygssby944u9vevp4fnk33mkpfx3e6luj35k9hgpzujdxmbueeytnypsgkd3g35yoo3zumn71mw8pvuikehnsjg55b41y94eqhl5c54uea7g4wg30uk1k5b3levlu3dy5ye26o0fnroys38htshyalqyrvntd76kuv2uo97kqo6vtfh6bsh6jx792j1l8r6t2386goduqma0gwuvj845fadupdqmb1vzdsv20x7jkgm337byv423tjoowrewo3j2q07t9gbby1ly6rtvbpff1ooy16me0j95awdfa97gd5dt1j9p0h1esf1vyeq3trgj3ljbxxd9yf6ajy28ctr44l72fp5i5nfg6i1lyygotjd0pqsiaxybgkcd18zw84y78hoy6exyntw90f04qlbi7edmj2qveie2fwqan8zpz88358ebvr831fuluvcu86rutpkdmnkcqar8k4d17m3ek684pl8hq01ibdjqv2ur6huogirfecq2eby704ek20rfu5r03myr262nznhhkvk51p9w7z4qbrlt430hdc72cb4qke9480xa04e3qvh2p1uvlnwi6opc4kr5v94pps1afgnibx4197rgipjiaby02459paa02cghmysreo54ur05eben3vjkes0130nafmh7ti4d08cf2cht79ayrowluaffm7dp9pag4c5troi3hce6x6bk2houcm2dvvhlpjvz2oc31czsrtzde3w4awoy9ujyk69jq01vfu0a59h5pf8spgjk85lnnxcm204570baigj19e260beo2sz8fw01bb3f8zy2m7rdjlv0gch8421rox72oo42bnd67kfbptu05lmimiur5dqohczh4gk473vankp0kfiv1d1g9aqoev9kl53ktbo6nrwwfqnwrnwe8aza1hia87jcswte84dqji5wjn15wonyspwurs5q5343exc9bhbdcyt4zt0xl7hozm1m7n5rgzktx5wslu3h6pfjvonrlp3h5gsvrxeg339qtkdv6olr2qdnay0h6snee8bkgpbg3uone43j3trl5cdovtlonhho6ciz0ei0tevbo21pv2y5dm420x9hl10l0fdqh5hxvnffvfwqy9ja3d5nm88ajl8nosuv30oyqmw1yhhm7yh202p7gfglcuo2p0hhr9u4wsljlu285edtjw69bqdi3t78fjutii9dspdptx9mf5923vw8v4za1x1gtr7gck0l1vtk4b6a7qbfrvb64od32sujm25kd50pz6zw8dkgy79ika6k3lkr85h7db2kfovb2mv1g1ckvtu5hgxexgifivwcujbqamgw15945fkzp4jvomk7imx8z6bw0yaa48f0pyzuq0z7fjtxu64ncm59qwgejpsy62afnktlg7',
                expiredAccessToken: 2964186971,
                expiredRefreshToken: 9365518389,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'kzqlqamq8xr1e2ujvq03gipbnluzl57vxs6585ddqqpuoer7klf8cml5d2mlnyvuxmtvb46cllwbsd4z83o7cbz288odhhjr3azmx3n9iegttmpefia9zmgt0s1a1s5q0fcnn3v19lsjpcpzn7yllv2vlnyl8e9dpqff3cnhfkagted9w1tnnnbdm9o7qu1i9kdlc0toaqf09hy3wd0dfdusg1kc5w66m64c43vbzupwrzneh1uza43lods4r11',
                authUrl: 'oc9wge156oe424e7ekbh6utgprg0x7v3ykvkdvzde6l5triin5wrvdkrfw45rdb61qqpoer4lk65tju1gobd1029fp9r2judf8wg6ibhqxtg8dps58z4cq51wv3m9qh1p48zvvucwobmt6w0qzahqvt2915x3xvrz96ode4m7ux37vnzqx9h9gjtqu7q9ipyud0yf63y8ug1gplzakg8nkwcbkvhjsdjkq7pdl6q5y6272hinssw6u9toh07ejesnnmi366kohqvr9avdl3kw9jxnxkrllwlswm2igvzt8n4o4kw8if7uxfvgu89fb873hqnt3u1dlluy8gxx6t8kkajxwl2s6qjadlzlmbhpgngkqaidgb3fzkk8tn1cqyj4sf0oq9ojbjm6oaxy5mri1lfysd4rm7a4cuh2l1i77391mjihm5rzd2yyg64t0rslptkj979lg3k1vaksewufzwze2xrj4mm7unq3y74fguaw32osxtjc9acvdoh167h0avri5g1vi1l4uks55dujapb02hzumn8obtf69wq49syjg5qvwa0lwyqeqiwff29ir101mlv7rdxxvxdj515nr0dt13hslku9ukra0qz2gpuxjt5u8uyuelrk90vk9zlmdibrqo98me3wsed2sucak9p9c8mj67r88nozyr4h2mraqu8ac4dvxoj1lyhf1zsew8nz33z1ppfixjtfs32f5ow8p0vsjbv8e4zqrwq1unmus4enp864wwvlq7ulckmk6y8j2ny6fqa0j51oe5fhj1ggagmdwrssl6z9dde90iz7ls0b9nqgbglg2hbdui6ks4y0yypxa1uzuyqfprribrlzp7uej38krqvgeny2o0foi3n275xhqms4ylzrt7l7msxk6flvzo8y9zfae98ikwxfj4kosv35wmdjo30uksoufnhzv23xoul45zw58xpjiyac5pow6f7k67z5cjwfywk8u3a0tqsj0j12uqbs3ux4n762i6khpmcz7xh33jnkd6kzbu6acyny2pb7g0ybx31unju0hh0slg6vs26zlkn1vwgc8bc8b2c86utdfuwe73iz3cl5lbl4j6f28dvomh5nidzv8ymx0ekwi2uepbntilkervyss6evvab23alv9uu8sxc3urfjdiilnve3whbsm6oehcs88uz704hrpwwudeyovjxmsyhn6hwbtdaub1xfivkh8uwcddz1kq67weinlzuvaefq6silt4z1c7fmassh0de7rno43aj6nps1jrv3ohl06ustngd1k1n2zpjy8k3dpilr1epf3wvle6uw793071cxx6ffwilf8914t3n3tomk8j6w0w3eedoofo0dzuwmg7xkz4yfvx6wbnd6tx5qixx97305omnmer8n1owwicrl37l4w2o1garjbksowsnbtfl659hthsecavmvxo3rsx0f4wdytucgtz3u5oqjjup5ndrbl5aex4d3xpe8ckes9h5l2ppbb1av9m9bb1gcubc2g5qcscnfq604hzcix0c0gkyccd38ajtqbhyupg0x5ij9jndwafxqffybulu2fvelp0fiatnvqgwj77filsggsjwh6qigf7cmune7o8l36p9wzdysdxnm1x0kzsxxo1wduukpyttadihid252f3btd1ij4o06l5hcsbygo2vdc1tryz444gkf1s0mgsh15hcrjb80cg5stdqy1rhptq3qprrbzefkxr0kv5h8r2um51ylfwg1t4lgsrffdttq12vwsv99cgm2jsjy1tvn90ovp9ufwiet5qwotqr2tvbin1dhxmpsjcxtl9i24ccld9ifxqt9mku6pxi3vpvrunozguc0r6aw9oo31mq0o3c13occevpunjvjoan8s3jq0wajsb7x45i6wolluv52ub5mjsuq1lnosxuigqil9jiox0jddysxwdon6jwwlgr2uh268rtfr6h8sy8obm2arxthomeknr89i12pvqbvabgrjwooklft2j2zwgmw0k51i3siiofhedc7fy3',
                redirect: 'mqu7iep7m2kq4qr3mpz3hjkl21zdgevzllzqexbzkl995cv9n93qvod72ohvmfn7ycgi0f2nyi8m50ahanz29gpdqwnw7asor7k20sy53t50dfd1lzqboepxs5jne2xfw7h676w57fz34h61ck8jc9amcwylgpzoyxpmjggcu2faowidxx4vn0hph7rm27r6uydgjnczdppa58mg08r1sgpl2mdqxsncgms9479mj6gkvlbudte6wxzfnzloxz2anwxeto7hwc5p0g78yettstqhgvwwy7uwclzoyhzkggbo2idt8unn6k0ethpea9w1doyl113e18w77rrj59vlpxnfsveozf3shdhhds07phphpe2irq8x56wn5bi6w0mob9ii8nggg1vyoflvfqlu1l7mjoqya8vd4t3njxiz5inwrrtn9hgmc7ydvj4qn9ts2okqbkbwn9qw5o47qlecy74ah68peg5basp2q2xcqrrczt8emq2261vh7cvxjfixj56ud34x2aatdexjo6v4325s7angjhb0s8ryduq1iuyshlsx3md5qgf236jc0dughpp8odto631e4zdtlbh64odhw1ppi2dud833z4yyvsv1plzj33q7tzluaebbo865loft7x0lezqr5177rdtg5pzbhpu97dikr8h3uwiogw34ddwe8u62e8lyda1m7dilxxiaklccwm7r3svt905kgzxhbc23qraefjnkcazv5uyu12s9cmcesot85cv0z3cm6dk2dtm6k5k2yea24unevw95wglfpykf0isf6fjrfd0anugh35dth0ymo0jbxqwdt2cguxn8qrvokixm0ywodj8gegd7qobfymq7la0x4q6wgoezw4h9jgbyx95bff3k95gklllqfwcu4kfjf6rz8vap0wnygh0xflqg14s2mifghrmcyu0lspwk3fjcqsl6pi2gy9ehoiqtnj5e24h4kthp33ii737j6smn39zhyd605f112yhg7ue9728sql4k7jt0syn8043obylx9r58jom009r30fr1sm3otlh7wlg0nkq2gynwm25cw395f9bbqhd7xe1318u5uh44kwr2tgng2izxdvshmj3eox8366qpskarkss83mmzbveqf2d0k14r4dtxh6prg9citl8vuekgfhja9lsndtv1kplvi4korz4zi8d1ggpjqwl2ybo9v2a5efoem4xqmxawcscd2nl2zdlt1e7vsdt39l8lfivfn5v6rukwnhoslwi5uxmc763nrthaiqt9dts6p2m003ky7xa0tnfn4tx9d6nzv2fz04v1ma1p6ypflvnjmckxrnqphutn55wirt3zg9e3o01mmno29vomc2hbato8bjvy5y5g0antmmatl0pg9kh7qfi13ahpu4yug99i2now9hbx0xsm3p60z79v3lml68lt1b8jujtn6flr8stitp9b7dxmyq8v1n55qmwaiy9e77apna3l67wbpzx1e5lbcd5vw01kb6jlqj8rwqqz845rzu83td9fzf9gvevnaghq68450m64q64nh3kngmwqnwnub3thhp1kuz3engb2mfvl2prrtgzahe1ar63jryk4kuqtmv4sb2j3bdqigk3tqbgxfe2wvnl2a11jwqldza5ke3j68vtypi0qk189v302arie8633cokoy7teh8e9i84kxj2d0mpb4vqxbi1u5ry3lt1neechwromo1hihh263oa793cn1b5gb0qtcx6as2avsq866eekjs05k1cwpohso6tmb0fulpwel6geyduw0m6gw8lo6fx4wkolqdr3e7dctlrh102a7mpmwlgnlyluypkealcl5yeux44ltq10l8943ke3y5bryocwhz94lw8opx3rxxxphu04n146qwa6gs4bl4sqyaprlianh479vxt5zfkcfjcvbk9heso3bd6s3pbwuutyqtcqfcphfmk4stchxopepvg4t5iq9yjl9ov7xpwi0rvxnu9a4vyhpejpwy91qqrho4hiqiloozof',
                expiredAccessToken: 2540533994,
                expiredRefreshToken: 3445045828,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'PASSWORD',
                name: 'gwuzj3ihq3r6x3zuu44dqp00fystw7f64ma16kwsv7wmnfr7dbchmxc86vzs241c9h0ra3iylwvjas46r70dtzjd3q9r24c1nq94727dif66d8lzk2itejbsogi7s2vedt5ai9e6zoao7jd1bs8u4q3vlc4eld11cyt18fjj4uasitm9phyonns7ag7mu5asusf04nwzmiayxd2rcy5dv8lc84l3mlsyljhebnsqgvxoih5ke9n5om6kd6bjgwl',
                secret: '0r3dcou5l3ysi3an21f9lp8cpfhqwavu5rdlny3dkbjgvjiqvtlo4m9n8yaeosy062brf8q965dp8zxpe3uyfdvdvt',
                authUrl: 'ktjij2pzodivppjzpjn90nm2sva8licdfy9f1o84m4x64jj08wpzesafc9njis67wk70a17uaqlv4mz9t9iku8y4yb7d2et6kpxh3oqasy0k3y45hy30d4ez3l6tmksnaaf3vpga6rbac8lam6jeycrlo18uh1o2xojkmwdzp3p63r7kk9y2j41e8kf9itqkcn2xlr35rcy7h9vvyec4pc8qsirhzqe8njv4hc8qdsy17p0us770di3qpsjy4a0p31pn7wxsd69f2e1zm8l09ih96u6o4z019on9nz7sablcqhj5a08upooeflrcq8c4ae7b8vrpcvfdxjo8if749xtac7rxvr08wmpz4z253xxo44gz9bem81gr06za4xznpsi6fve0z0iu4w9m25js9meqq0epuo4zpjc4g7k5p1azejqebhcz7c1zn3f8i02l2vjn0xed69u375gtcdsljnqo9ffd4dk0xcajjnz9bv7qr43sey5qsc6xhbj3acl4n2h308n7f1prxrbpak6e6bp48z7l10zxt0qsqycs41s3txi1qienxhzn4fnbs164xwo66inqr923gaky697sll0osxz6iucsrkxi8uptua82mdcg3yciiees8aoog71wfkcif15gspjnnn0sx7nhm9n96jy0fiehnw56ekl02mchv6qilffgsay15l6t80yms1ha9j48vk7beba6k9l2or9t12zaeug3s6qtegm2yddlsans1f9pv47q7urz7fhjiodjtnswlucozqlxrmomqacap056kmjabgmwwl9zh474t9d6l0edhr4f4o9yn62b97h06kbhbi0b0ddgh56rhjpydait7walgtfyzut9x8takmh65sxy71vbkuzex480yo677kq9oi89wrw8p9evqvfkvroqsji4j09cmyn7ti4xnb07ayueenkn0o3fpiel9xyu32w66ak6oy3rk5do44mraz1xr73o2x3g55qzfoleus1zmlho3cy0yzdu4fhavahfh4y8dbw6baj5utxpzl62lirs67p9jwfwv7xzwiz3gayltt3412qlg62j1qok857k9co3vu5m51qd72sydyhea2rz2quxl8uels2yghws3g1dq2yahohv618i1bxb1e8eal0z9oj7vgn8d1otcjddpfdx9d40zid5tlk9ar7yi56c5x8ovujyuh0spmzzquj0kd0e1wbzybyx7hv9imf8w22kic8r8oxhwhawhtywep8c7xdg68025ne3qyd0kvnjf2hruz12x3gjl32a5egkajshy12jh8n0466t2cbkm2fbbdgs5evcocilifahchrgstvbgtvojjq41ybs73ixu1kzflq1j2j3xu3dqutx03dzv8q713p82ndngahvluva3rau2s6ptozk6mwadq518qbp5be63suuwib95y2ns23hkwhtsb2dz58qqyo4ji05bz0dyha26yherjftey048dj7vrejv9r71lfbwjum685nm5tmw7cos9pkcq492ambeb6wukud4yes823lhfg0r3rbn620skpzaqw229ba94ld8hviqr1de1eg07jlv0xky0lojvez6hdyy005pb5vgch6n5fouoprievfhamhl4v4n7f9j0kcpc06vsf577ft9uqng31puul7annzbkoykr5u2z7507sk139ok0i64b8012jbsuwuutgu5hduyqyp52s5m15vwugrv7p1spdomqzcpta2oger80p5eckcdc2jd57vq0kcww35zbdd11ea6mha4xbefigjxp0qo9x0bn671fwaafxn8a17eylkfpi91mdud3rw0pxjknm28a4e0y0qawem0sw7w3zsv0ny7rzcfxqzin5di5kfx2www6bzp5e2wel7xzf3r4ozc1nbtb31whvezahsiwobuqw6nkmfb3ccyse1p0x7x8itykn66m6b2eqwlonlymixolra3duu4a80tiss59p2uskc7rrrbh8ie0xea2rdufbf5vcrxe6hhc6yvnup4c9f',
                redirect: 'xscgi980ipbvuqon9h5on3dyerlbm5ajz8eb5aftgphrbvfldspf1y4bxsiprgnm5od1rllrxi6h58iaetjsj1zun8m2dk9mbbhbtaelzr1qchrcguxtypmgexiib9xs6dhyqpnnjbuxr57mh5okt9o2uvyo3el3uigltawxruvnpu7v6t603uqfc7p5h3ajp2hu9grjl7847g0n3453leznn8jzdtamevw6l3v0ds6dno52vnepyf1w453s0w3uoodczyk3mhfzn68cr1l128l5nrao3mjrv74865xtcttdeu4ak0y6w6n4pgybem2yublc8nex9c5c60cao4i1b5y95twcknnkscr4agsbwz0dflzqxdwduspnffnk7rd0xtfg5zu6slcidzxzui7183sbg8vj2xopjhkn980g6hsziqk0chg5akhxkzph667txs68jnhw8sic07xqg3juciqqadd3qhh15xp2gi2dm7r46n3hwrb221r0eyevnt0zaw6qscobe4t5k8r49r8ihgtlcflm7l5nwgxu3z9hihpw2fsddo9nps8zpusbyd4d43729njk5wpq7uarjsbesacrx8918lc2x2pvu5iotvv4wvwt5vwvduat9k5j9z28ck10ngn86kqr5hlp8t874edbm6l8qj7yix5lssnowst68dhtn32cu3p8irejryj4b8eaxrvsm56ucszgmek4jskvamrxrfciiikypiit96kvbkkhyez36fit1zbu40ekb44kb8jd3lni9m2ruyp94km5ty1jta4e90z4vmaozdpy62zdxqutahec8u9e87s5nmh16j934ul258s8ugcnk98be7np50122xruwdk9qngajk4fb03ae825y1w4gd329cvbszpi65p0bnnxdvz1tv022c7ptngyb6i96dcz8vsyrxx43njxzro8xykhz0hlvtokx1znsa27wcao93sq80l32ji1fbu1jgh65yo1pvbqcqg5tef6kyso6em5b13151sbcrt31nc4w8w4znii6q7ienizhnmf5q496vlf7oe8f1gblnn3jrmxanw7st7lp7oind0w2cqyizanm87dfyy2vjkoec9ymij1mp8j9la4bnfvn4qwkwdeh0frgg70ldi6v4gr0rc2vjn1ghbdi98q5uo9dtlc02biqicn7g72c1ykjeoex1971w732tvdhydysv52zmtpv6np2ht4hza4egwi7tjv4okc3zbue4k2tfew2s66cu5jy3ex7ih7uks65gs65awb4dmw8zdi4ii2w6owrqzcicbx7xulwaumxn0asc6xz7qz5jmqzbxd8eeud8r8lzcudy59efypj6paszoa5bgfaq11b448cel13dn8lu0bw8b7jg7vb3wb58l99wdur5ijp3eoz482fvhs3otluiy5bu6u4xknz597fehndm66yozpts1iz72qs3ldhrphtujcw8ppec5pionwtaft68bpsltj0zpdf1w9espnyrlphs5hhvnpxmgswk9cvamoaza2oawfmxlm55kvymgwgubesw1k9d91c0sd8hrgx9rvj2vs2muq3bd68m3yqm3qcwqousrn719vil3yob94kdbli58hvnv41m0w8ee5k01slk3gz6ahpx6mxbyx4ly33855bu9c3aumiuqvp9xzkxhm2iejgt9scesuqepk4tjn6bh5ffcqgq1olbvd1a4a39fll75xkda3xfgi2ockdqpa0ukkjgzkoep26t2a4udv6i00upislk7r50vsrqmilpos8y8xmdwse904scjajet7l3ip7bc9g6lbqceouj6gkmaiz4wt2e2oovdzugtru0f4wqqw2zk271uf9gvh3dexnujalw0nnfqgaa69rtog97aos52wdtgpqb4fw8uqooyyfxjmwd8j8a5e3s6k9owxolmb438zsm90nqz3hmvkknhbfgp7cxuna0m8khs4s6jytqglc26fygklm6o5e9oxej6ss7xvpl9tf90h07rnhogp2jttpfu8',
                expiredAccessToken: 6204630521,
                expiredRefreshToken: 1131043312,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'PASSWORD',
                name: 'ioel6s71zhuevqblnq65szfutl2hv5uyau1b1zdhd4r0n9osy4lsr9x6s6itvot5d8m664lyv4ow7e0ql1hic1uvadmhzs32njbyq1va04o3ou2tjw6s1m1qyrojjsvsh6qa1gq28n98gnxg0w72772450q6z16xkm04fu23fd6ibq2rjrgajqlg0jmme2hnze93tlhz2cwmvbt1qsjnva6b70z8v47skglwk4yjv7t0vfc0pugyfjfektz5s1s',
                secret: 'k2obzyg43pi7k004qedodoa15g3qcq6nfnyyx9omv0gm2saooyjqzmauqys1xlid2j1wvvcgw54ognjy21iu3xejqa',
                authUrl: 'tde33w7p20iakfz5wen0h1s6e8p94cwb56dby7cg8e95urpecj5mo34kja4z6vto5x5m6516ede1zdpjhsqy5ucydfye1klbfiv75zs5u3pyk0u149c6v3oniyjpp547a28mrskf3u60r0o8n36uddh6bt0oc1fa2mzylqn96plkn4ejsjletdjkpajsroxdec9yon6h2pwaogxv1pun22ls306v5c8qbu0148v7nxw6ao4gwuzn0y17s0tpsxyeosx2e0fpjca9ger66ty5v7i913r2gx0dk2unn9i5qzwhrmaiq3pcj9v2chtpqjiiob15vqmj05h319yhbycojxmulnu34w4ua3fqah25lek23pxt9yyk93n4yc12sfi0hthtv3vnstvgwsykup98gdpbogg1un2mcuxzk8h2msj0p6h0ey3moegggr2882cy9gh4agz8iohawzuiytwnp7yj23es7amrdogs0sb4r9llmyz0qo5qw59ga2dwm5r8p0nk2khwtdbeydwisqy3d822hieyye1us89sdpwkn0zuik5ip6f432613nffdp0z3ny9yipds3okf06uqb5frnj568yjub7nd40kct6yypzmyao5bqi32i9fn9dr0vnzgrxjfwcl2bnldnvi6t28tm2vri1z8aj25dg0j2y9awzsrkcg7ucued9hg6i1049ntzznni322hutm5vvkjjtcnkgg2mswig4u7mrc1oimra12wlbb6oihag9vlp1mm6dkw1opimtk92iz42nuyom142yzrbbdp6rycpnmjq7h8scit6frtge8aerz7t90b0negwyt5cjjpyf7nh4gt7akqlrxgamq483hzjfnipw8ln1wg1zm6sr0m61ucqk0kijws2sh3yt2xnuptnp5r09wysb5di9kqbm3m9xixgrtuzfs5ysk1woamxjwumtluxzcd4ejxsos8641ih5fvkcluqm42dej8oqctb0fgg24qt4sat7euyl0gumgxv9goucj29kas8fhnx3buu71zps50sji6830spfi0nq7pjhu0o0n563ebjn296eeypgv00jwt1hg5ng6nbhq94865q30lh257fakppjnozcv8hl49i7j471aiqgvx2xwbaj1v633do16kil187w7ttmxj7bjilo8mj2lj9pm9g6agn9vyfh764z6n78br9d8318l94e18pdj37oslnwtbx6vfc02mle30wj2v6jqhix48x5u8hliak0f3ea0c3h84tkaszem7ut5tldyn2cq34mp0n0p1hqkpurfttzmpczgoiz34oilbn1b4w37yzofii4m14pe2ive4i98udl8jgaggqkd60g8okm3fzf17jsz68f59cnjg5hcbklyklfnihcjuc9yssxv3le2fszi2b5bw0j740gby7yrj1iqxwbc44c4u050687r913nu9yoebqqof5eznr9b3r88qhwfx2q5v3j6y08n2630xhvf92tj01xgmmh5yve1liq9xakwyb3cczzya02hqw2q2q2jiuycw9q69hyb1b1x9e3awfrw3e1u5204rh257gxozpo8j7ciwiketsbjmo71x4q20zkt4a0blxli9wbsojsl5wxosku850v2tforcg8pdwnyyblf0f9fzy269hnbhzz68gvugajje0pk25oq76883d8dc8i45ys9bukzkxtejwwtg30zmvz9pkqpltqta7zdaypt9f6jsq8ja128serzh9dca5bkwcgz4bsh4g86bpl0ra6eptyesy7p2jqj6nvra4x8kx9ug7ual6gjbqaulrscojb4ksemhzca7k3wkfo965k2gbfey44rhk4qm5kcu4k3i9o2ksk49ddjjaaxux21p29195e0eyvk0ggtn1ztd0j4x74ueyyn0rqmevpa46shnmv76z917br5a1xodkosurn7mdxvs0hda4366y9ydhkwyjpjfmqy7wj45trsuzp7n2liwabe38i6n94w40e2ogjze19z7adsq89c7emuiltwi0',
                redirect: 'v0zsomvb312gbhv81fnl0y19ggbh6cfh7lnm6gsu1nek7ii8urafkz6n0u0q4qq0tx6h7s686qe2ns3nw9i242ojve9ek1gaiho01bzrqulzde5ybr6w7zrn1c4x3i5h6jjxb13q8yoo4k4ty74svfd695si3nqtrjlf8cj5phupfg2bhv3igd0f5d7v1643xf309cy0fmij9xq5q91w5ka72ignkeodi838e3njjs2w74389pe16qr5y9w3w6ihftr6n2bmr85306rncw8gpnbafp4mf0dlxdh1xt9nwyq4750rq3flj87mgqwxym78b08f445gjxcrrk9utia1ci035nbpp1i1wn402hd1y2vtod2y7su4f6ot4j7w0p8t2esx715gwey4xqen4cc11kb47aaj57y66k04nrm2ujpfwu56mz0ud6y816deitx06hrdin1iagvtwz14yitt0buecegirktzu1bcy4ecjbimxfjwdp5ri5u8dv6505npszaylmb99bv2c6rybyfxczbk0lwui9umpw83dhwshr17uqjogm6w3oaw9jz3lqcvi4rpqxd8brwnk5d60trrp10w72gp8zxbwqq9mwiwpxdvrcjz9jkccqrpux1wbzwgnrcoxwlzsvk86bo5o9qszpn7iaw3sw7guzdeaxgxpazujec60myufei5z37pqjmcyejbwh1k5tzj9p1q0torh8iy6b1wqsso1ptqj9mtq5n85suztr996206ytop81w1k7d7co1e3org37drzidd99m09dllvyh609vaehovwd21ks4m3s60t2aa7hv8w6jj8vrx7q61nt9td912sqa7eoyysdyby3cjh70x501b8y71qedgktti4rvusrgy79cqe9qnf46ye1j6qcusv9i5lhq9v7b9sbci5lww4z2xfo2vru8o2ub0oszqvla9to5y0jbsp8zlxgig2sfr0thqu2e6j6ayu0rbrz4rfu1c6ksbnzprj3xwy02943hsjj9i3rieybng77o5mprg31s8lbwuq6x3drpyp1iap1ivzzybj48qqlv6f9lkk8o3hw2lqwwn18x5b5f3l6c4hq7gpg1nbb4cpmsex4dy9gpwwl7u5o80sv7jgjrrfspt8u0eodi1wk71al4v43hnfwz8iz7iykk2p5w83xtqy5m2b6t1lvhdetx90vl8lpnw8nnyw3zvpw3uu4up1w098qa18arnw9i0dlk4zjotcy8770q9df05nbhma9bz8dgpi1qhcanqmbwj6pt5yr0ahlapg45vbx7n70ak77kljbv14h5laitulc6juj1vj8x250mk0uzpm89a73fx72d3pux4po67wpd2a12uumh12cuss2j7udafphq6tq3sup30291e6nn2gear0uicgnz61rq639srq67t8w07g00xhpviiniti4uukld6rcclvb9uz2w2vn011nyrsajecava9r5mzcbc5mc7fq5iziuutr7apke5oetvvhmmuz1z3zui47v178mwm6s0e5qsjm9qh1mjrsyg4ekqwljgj1b27xjymvvipinnct9ezsj83ncfu5n5z7q85w0itjvql7eefssavwga5yqz0wxjgi5oqdkdqj6maju75eb9bl1ew0xuwyedjkp5pn9dzmgclrh4y0mk6w6pro2ydl2dxfwbwnde9fz8lpnh2pbpx7o56l2hdshvlt9f7vlcjgpw51jsggc766h9p3plbqdvrxyw4pw6qrapkp2j7gje0jd1dfgzn0pzcfz5w2ov0rwu86h04vjzqgyen3ck72dbes7l4pl2wm4oihso40xcmhty1wrso21m4wsj6mhafxapv1utlkttkrega90r3l389wzhl4soicnlsbfmrstxevlxyiul87ftdpdrbm4p6yxsuxx94k7kfchvylv0pb8rdkjp9fee9tdd0x7kns6gqlldb309l7s50lhu7i2kfnbkzo1sy7kl3qaojnthc5wmf4mz194zkxi5wrerpgis32sqyp1lqxos',
                expiredAccessToken: 1729502297,
                expiredRefreshToken: 4198613046,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'epzo1xizthkavrbch6snxkzwls50l10stmzkr',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'yflz17mz6i5mi2o6zyo6huyysnxmdxci9qthw72io5ul82mmfcekp48oxyvzozdejnsnnihnywxavyk2iynkqzlv001spso6bpf66dq28mn5ruerh4kgbie0e4pw59awl4e4zedecq6cw6rlz2rl3jvz76jkcr3yhxzygsmdl7nl6kmsfofryqmlzygxnla48iyqziwrgqgl2ednh1khbo2473c2v5mk3ikfrt3ziiuvi0ou0ouvr3rc5ahmdfx',
                secret: 'i5d6pff1hitfb9pfyy4fwgnhjuvgsk83l6aa92iira2rdpxoh6k8fyvxtz4i22r7bir3gmhs88g68s5o8iv1yx82yq',
                authUrl: 'gfgbikyw5qtvpsk0wuyjrqln3y3sorj6p6ifky74cu0oevfkrt8rano5ebvd64e3oyxe4mlwbcwf793jekd8gqx8tvrood10dr34pffgc5h1xjj7u75t3prwxyesx5nxyr5soyrttalxic7yy8k7zfz33ma8x1wh238pleegf2i8ppq2ge67708qedvgchb77pb9czgjb8egvk3cp7jpjsjuqqags8gb4huh1rrfx0vqkva66v9ua8xb3sykcrrn0p59kvs6nfa45d8ibgistc7s6sxdp0fz28g2cenkdfx8luox1luns77mgkg850u1hsd27i8bqip675gubgwr09cdke0hdmjco9tj7xgrxl1spr6dctvjb6iazgo8ft8zddfjkvofckf6ndb5gruw1mw54orv5d0uwamq12rka4ao4zfxjw6kbhi1s6w22v484nba3cdndimxmxs4fco5r6ovcv5dmknati0n3qn9h80vcads4qf2ekgjqqhwkml6d6l9oybtxbcro8u93yv6fldqx6s03pku66ki70cz1t5qh8zs7pqlf9r5u507phd1xwo37795qsjzzklwjgr1yurg5w3etuaxzqgv758oj106y1wt9a0gj03xu73wl6grsg769t9qsyoab04ro15meqg27knxly8h7iqkopazvjc9mjxp9rbn5tebfqz831edty9ujsvpti0og7rtgupufapkifod3zehad38ex4ha6ho2s22jgklonrln9m1m27n2iei5ep2220b2u7d4frin4ieipkpcq4b7xkblwij4a00bbe5lnpw8j52sqkm43pzu94cr8ptc91omvtnn6mn6dnyy1d04gutej90cr4u54jkhwoilrjrhb53a0l02ifkwsanxbvjwoi3elsdbr8brjputvjp0cxla6sz7f92jlpgllo64oe32z1dyi9v0blg60eoqdscgpq01e4v3ohj36dc902xzmzxlkk3hyghfqgoglqkr6sd4vomj7hk0aqtomy204g5ftgszneke9n22go9jyid1lr71kzeek7xflalavi3fy6yn93i7lqhm367ne4spmjua1l8fmgsc0rqt1h3e3bvjxse75uz315f9y4o342ugmhsfbsz6hvqjkzqw51c8s0x2ztawsb0po9am8equxfc4ppwaipmapnzqpts9nmevxwokeats8359xrifzw0bgtw2zxksw38bcxfru50srtn85wlmzndgdzix6jywp7fncjbx5o5eymr0cfcfuf0z3521xp7zil6n17o3sn7km2zzdjmn6qlp7lvzxeof5sxu38xwd5krj4tef6pwjmm0570e88pupnd26wybqih290einisogajaxa8uwz8npyl7hihiwqp3eznlvecragke7w0xlz2pbj74s8ydxtzxf6gcx4up35233j4yjbnazoycr01knw2x4pna4wk4bffc400yw3w8cwhp826ga6yq86tw00qh3l7i9vqb9nciifd0hqgdshhuony4qvuwsq6iadowqidhziuh1kwd88da780kvtior4xlweubk5ea8ox9214hev0p700nro84v98u8erk8wgahbrrhrznudb8yoh25dobnicgrkhvsvyy6seo39jx2bhamty9i5pa0zlpb7hcn9nc0chv820qslxrlbpzd1cqng2fwp7i8adfmupv8261ifp94z4dsv1ugep5d9lv1z6s4bqp2l1g05a9e1x5gx5hp8mnpscajzcvolpiuiy9r5rmz6rwyu1xhe09q920x15xyb8fq0hyr63yyia6lrkmvwz6h6avb7t14vzcz9xkffe4pkg2ffrk1htwsombk3tgjpa2rei0693nqhcpo7yoxzb21mftjz39k92p25jo7gnzmp4kl5rey8ncikaitibw9o87q89zl3qw9l5uk1qkmxa33mgo24zvh8qtp2h4hvc2i7g1lapdfewjkzfl8a1tuwj19sji0t8o7jeaxe7n27x8osliz3z75ivaow350a3wxm9joky',
                redirect: 'g10ye4krnti26xnvp38cs0la56hm7sbkjps6fq5qh4tyy2o6rvuqmwm8f9dyf5gxxjp22inx8bp8vvu2f089ry7287ylm8xjkwis94jd7yo461ea06qrylmgvqn8uhp9bqsih9nop1wl93f8nol450cofsxtr8083fbsbh8hc3kgtwkxgjy02pxccilfisexzkhhj550bec9hijqyzmhwr25mtjkh9mb3bkkfc1fv4jfbk4xp9vuz47m06lgoqalnybw6qy6yn3qbrzs5fg19gkuyjwsmtg4xzz6kenx5f3yn8piqztr0ksv1mac8yot9nwmtbz1pbcimfg5qzj6beyp5k5nnvyn7u50oub5wqro1ehavz4b3j6h2rxpup9kbk5gl31t2gxacie3jyfnlrese4ngyhaufwroyfyqb5wsd36i2kqfp7zekaqya4n5tsvzi2yw73n27y9af0ltdabljz8859f3si4ouuxa7so1mtmuccwuafknewf6pk8lzj6ymzcsj4r01k5g0nygl0p68bfg4aibtlc9yc3r0bvwqm2asf2le3e7oe191cvsqf7n7pswqarph1zqh1eq0h9qrvbeam9k3fpikq1zfwlvt5m5vlzhidxzk3u49s7cdloy22tpqokcr79gj4cl0eb539wdh1jutg22brq4ndkz4ubwm3zblgpts6pzu1scy5vsfd428002iq2sfmyaandhbfzsivlixng1yyv6zjex1r7x70duay25hhe2rv2jdnu5qm1g91f7ywtpaovaiagpw0bbrfevj6zrsn9wonc276389vxf7yda2xj2rr30df0ojh815x84g8knupmeh2ofdkuqjdpz0pijpnedwndrsqujmbyf2alq5cfnws2s5tf75515yl7psvp34z5l5fzm5217zn0njr7kb7ghoexv045w4x5n7b728noo7t8xd2lkafpub4p7soz4d525dx42u8j04z7bt61v1q0bxvhyw5nsutarteskjiq5eenxdiizba3txgazd008656x7mpu5oy3eei7iq180oy6wdg7g2mn5jndv10kljz6tai01r9x94gvalggp3ig9alz1ek807sut312m8w5hx2eyjkbdqi5cmkvu4w1x56kgzn9jiahjy7oajhx6h3qlxk7btim852eelnfbkpz51o2ve897pbw2h8vpi9makyo03iqji5w3d2l84g5i3ad7pslwnvwo3bwlvc0aniokhx1xbw4nyxhlkv1wx1j6k17ty8wrtbofxf22o32v7uz121xsuk5op0gpgj0aha520ixvb2zi402hzou26p544qcho0vp0zc8dy8c3dkhqlnppoxz91og6q2ygudjrdcnqc8hr6b5qjfospg4q6v0cos4d1lgr6agdoq6io563ewds00u72sb2ht3cipoespace1b3rk0tfrn5sj1wcwk4wx80mxpfb0a71gt47eqahgldnvweg2uzc0qojxfvw4rgco9tw4br9hu37wqon245jho78hr6chwtytgz1fmtmu0odmtyz6ymbqt7g8q6l5du6ib5pu53sg5o803hwzh18s0s0dfu35b0gh69lxhyx9vbxexvblyk51d5aggi0j4hjypziytkpggs35ph4vr0uhd6roa8vcsty0epqpo5k47kabss8renefjiflv9dg6bzzk1pz3ia7w6hltdgpcf2m999lqe5ni4l5jn19am72lnj712xmgzeu0fh1g741sfk7tqbz4qxepmucvff446vvuptfu88tyvdq77efdqzhe2cgb7qe1tbludttt3pc2ltdwr7oumtx4sdtnhv8sq5jgspjz0ob2wmsrn70pi3f9sevd6xwehb1eqw3ifleka0tfikaxt936w5xfe5ki2mlvshs8w657323rr0x3m9xwsh5kf88l65vk8orlcj4vn1ii6x0hj2sp6srwqoiacbv4qhqlb5qpicmrt43i028dp3ey4pmyk30k3gz2a86wwyzufi7alzce59msfh5cbp5u5cb',
                expiredAccessToken: 7411086898,
                expiredRefreshToken: 2845745893,
                isActive: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'dtihwuurgn78ja1b8vcu3ih7rbn52mov45329iwki1npnfldy10x4pk8t98he86yy9a6yx3lccxvtt1lauhqk752169yc38295lwxkz65ba34aa3hjhfyg7809vyxgarrh8i6gskiiueafaywxhqrd7tcmaiprqdr27unvemx5bvkcvv0g892p5m5vm2ff2422mb5amd5070t03mm2dstxve4sbreliqxljggq580348tc062e2tnr3o15mw4oys',
                secret: 'gk7t0trx1kfox7wdm91vn74v54t2sdwx9c6htuwqq5pq7ox0zb3fz77a0doc3pkgv1wsarh4r1vfxzzaxqg40yu98f',
                authUrl: 'p7npet99i19wi0hxcw22boi4au5mhzf28r76ytgp0h9rq5eofkkss3wdjat3mspy031n7p03jq4s72db3qi0rk76bxyf3f7fsxidwpavd70kstjorx4ijowfmd4ubmg9izhrd8genutdzp704j3abkpi95y2fltzzdvlk307rqv7dyyxra11mchnp0p6nob8unclxvbdsexxljlq6mn0kx4ufzmzxifcwyuy1kcudbt01trq6u8ibm3ry7ojerehsedv8wjwm3i9c5o7k3bts24lfcww8ln8ijfmipdbiqqju0za4enyplb57c92muh3w6ik82ps7qx775aaddywf9brlrmyqvccqogs8rhlm7vuvnma37y2sgr24fd5v83pmzchxfqkn9qljhspydu263fnrf8y1krtdapkfeaip6de5rl6l6k1ybs8wes1ylb0kplzmykzgjvpoo4etrh0e298v9f2lvc3awei08eh01l2z2z3c280tb2gaoqnvjfs88wg3pky1uzef695gxq9mfqkpc75pa0t1sbwwbtiatvta1itbc5d7pfza44juwyzpafiaamh6a22ee1lg0eneaiq6fkpkw7xvp3e5pr2w94ud1vdwaoq10wegh1l3u1i7eyob4jheq0ejxm4na4n5trce1wsprhxmn96e5y46ratct99nm9c3fs3h5rjit20zqbkkgv8fib0qk6b9ywwrto9y1pjgbb4qyxd64j9wslds0dhhu5uzlw9hreizssa4ztn74ehhfm8us8obdvkj1khz1t7mjs5pdzbab8zvt30p4i21p3p01nb1t5h157qhsp0gs1yqymgj42q2vkdky0zmjqvi7fbvfeiux56lkcnn3fqat2fmj02spx4vspzeq4r29z4b1n5dvhz7z80eabw4wo1uniad27ag5asl2i0ikbe9dch0thpnnt6401y6dyw3akvo3dixruh0cgrbvipfjz50ajdcads2pgdzxf1o1d03syywsympaw1oxbyw9uct33j4psp886ihtxxpqbzake9vu75ar0sdwait0ax44c3e9lro8yrrxrhyvm9op6s5fnyc8l9fjb5vgykiyv00dvqgjdpze7lpfmzd6x1d1l22tfs8mzvgzop074q0dqhb9y0h32bhyqyh5lx18vxxpxvu4owq4jl8lmcfza8495cya86m56p2g7o72is8g76ztc5kd4yr4vpp3rvkqaf9g3opvb214rcnswf0du1c3stu31ua8u78tpzc844qk16xqhyesj3warzgrzuj7wj60kbld9d6xfr5swi61hyvak89gccl3ks8kbtmwdy30m2m26u0h4ebi2rrxu0l3mk1crzhnfrrxzx7yb8pwhdme0yswan35x3ksoe5k35j4un0b62jeuh84vv196rttjjyiwqgrbvwqzyzqw3s9zu0edqdwfre5ordejnv9fsup8l0bo6ukg289c23ny91rwo5qes1emfci5ks2gqcsjege02hd7rgmq3akpiwnqut83dhaday9qbw73zeh6hjzb1afnedfvrizwmdg6dwjle7ck4cy2lga8ztr9x2pwfjrynshu01z7kuf2zieb5u7z5m6egsji5cyi12u5qn9xkfjbsp9jb4zbs8lcdjnl0fkf660x721wcf6nar5ginkr1318kpwxlk9o7i13565ezvh4r5rier3d250b5j7lg3f9k61o5pywjuhsy2t4od8c9vsphw7ks3vri8g2xnwsqcmnvb2iy7w1a0yvjln1ezl98czhq8yjp65rj8oup3vw69utfem3l13l9xbt1k2sccqkhikt6t5bqi2sqfpmawf36t8rl3q5ohkzt5mjd6o5q9rad3o262pj3nd73n065zm4p8h5jminc7h7375a2z1l3cuxfsy6zc1pymtq5cpzx3x5zgppbna829f9m0fc8ylc4nl52mzby13e8inqogzsacqr0mlsdit8dixc34oncbc04l99knyqy032jagrweiksf7zloe03kvuxipzz',
                redirect: '5l70srp6rf4176hbf3ggoy94ted76xz6rj3q8w64c5zd8wkwn110w0ya8degfg7j5fxsqvf9aiyzx0519olsjyfooquzpzm7txctvp6z3hg75i3uony2hnqkya1gwjzayaehq8xydqcqj0h5cfe4b1yy4he3mgufogzormjrrrp718mx4jxvv3pm4m8fxtnplhugby9nr9al4tng1odvrjbs2elzatblon5c6b0m79hcjoyrfqvvj7cm3a9q7lx7ufm34dhlkgxjjqdig0enbnrxz34aw2d6epz3nghxcq7oel4p9xadl5lbytj5w2kbmxxw1va9no1jcxk6gqigji849s463firwcktwdr2qkaelqexx5g3k0ybksf8nk27vk5fxa6p0km1meyaef0ps3u5kdkwch4te62g3jvee5kso3ur8sf9vx5ofh1y9qtby8vsmj8c48s0v4y9tmbqskxrzfqr4b4w4u4hpb418i9tns6wulnoph8lctz8c8wy4nlmcugsv3zghmj37mrzx424xu4781x22s4nbh8smqai5sizd3fl70l2bzxnnpjw6k88xu9dmk8anbr2ow9qht36gjnkbl5a5z0xx3n0c247dhjl1figw1na935jzv422rule4v0fh9xabng3qnggqoovjokvjz2b16bx0qsyj42i95eryz843erzpz8grxdm4kfgvm6exv655m7iqzi7oceasf4x3ehto7g9rm1ms85mwxhdnwghlpg9g7hf1w60jkd5ekyewo3xpwvsxxfrvrmal20s9uczxtgka1g4uebnzfzftwjkr17r12cwt6q8z1lnb1vrfb27ifvg10ys4glqy2upvugqym6zniijtqh9908bunhfvpdtirfldao29gzm9hpue6gox4pou79gi0x817p7moht6oj87wul7qqtggsfzlf63zpwqmbkvwqu68bbuy9mi44jobvum3n500p4tj6dfoxxl7gbxwl5wx8kwvr65xdzwpcxq8iv3ejycdj8n3320zsdsqqx6pzqbvd7dxb9rtl5mgr77ht3w8xbhci6qbed9gg987dfvbfpe208r37xu0gdhirr8x62qjncjvjchepxlyfgbjcguhgoatmpac1d58vr07ytg64pw0mr08t0cptf85fsdujp1e7zf1sn3x0he0xtckhurjam7h08bkwhbivoswlmgsl3h9mwcurah9jh0n7bp06rlg9ktn9ramirvb52fl7aqv30n8xr2tl34sdehn3k76fkobvjy9zjt9pvcszn5cgg1lc54ec8e449q8lhcsbli3krbm2y8gg8jfsjm6gjufdb0a87t40sgr70sepnucfpagzoos686gha96woczyosxcct9d1nsgeql2udk52wbv2jrpsi9glnh3uxfo27idm3f1fe14g53vg3kxvowyi7hxd0ip1s4nua9lauthy5zr2nyex6zfpru0xe8k5p2vjrh3eiu36uzrg1oaxtzl0rwd530j52me5zggfgqpix1id1hnipji7npln4yetz1fkyoo5l2nuwc51xkxatp3ap6crvf3ecabppxqtm6z102csw66qysabv6x207p5b69dt6bntxfi4hqgqklhor88jx33n2q4nsredb659vnwcppqoo38i8tlf3egmqwvi59z6tawg571o926yqwhc0llw8rrjqf1nmurd97f0kdf92d20kk79vcf2stnzcepib79gslzw0q4q0chr7nbnx3316rvn4rp9f3tjcdfass2976qhbif7lpxjeyyrrqgrrfojovd2k4m5sa63c1egocemdgwv3d2q0r95yxh3vc23nqjm89w34lq737l9gt86kp6qsmbjjjtpkfivejqi4pwktyy8cjyhhcg3baqea8n9c7a7wc8237bfdb091usjdox9vrtej1pu2rsa3sj8fnc32m52pmsb2780ujjrafwvppvbz21fg7y36hl7bxhpb6z5o2a5yii0bi8sxusy8xu20mkql7v2f3dg7s4f8lsxfq',
                expiredAccessToken: 6107749281,
                expiredRefreshToken: 6179450572,
                isActive: true,
                isMaster: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'PASSWORD',
                name: '59ls16n6wzhlsccy75bg2c4cidtmkrt54taw9a3u0hn15ym9o91c0kskdpgsefqp129o6s8q498456xf06lec2jx4gqde6x2gokqx489fat1y42v8vwsjvj9mgbqop7pw1fa6t47i2plzq7425ya861itp8ie28p74f7n0267snb14oabdqg8rvnjvz20aiq0si2w81hvpppfeyluosoe6xjuncaou44meljkqhd7wvch5txkk4rnjnleygqjk0',
                secret: 'ogcgssbdt7onwjz5mz1xoiu3gfv6qbbr59tv5agrtaxit7ax9fok7jauakkbut6ebzgnudt9tq4tcgryr7iawtmujso',
                authUrl: 'n0ieyrzqgzg58zht4qy3439dinny7omz0aq6532y2mmnjt4ni4a4meimf9aph047rrha0sbghysh65ajj0b59fpz67sugbqi5ofpxk1nze8zx2vm6yruwqwsrpiwg83bfi60drbrtyyqv8ya1p4anmgne8veq7fb5j4fww5gjpzexmzrg4nbz5xwpeh7qv16utogui984g1rl6m3cn20zho3rpqjt7zery0v4r74y2c2hczd77w1xbw7ap9cp7rrexhi7ih5nwiq809uh0a5h4shl0c1bbdjzxjmhcyicy8g85xsvw16fha93edpxy4u5h9bjvhu98sexk089fktslkv8y59bgwpz2hh045eg17pgkeluoxxdrl631ybuuxfr2o4n1ybjzms2llmn0yi26n1dexlkc9051ruog1vwvehu12hsa086bzwnr3g93kgzis0nn0aq2rgkghe0k27s0q6vt7sw8sxn32vtcuw1ttp5rmxrys2logpgqyg3g829kovnu6bamzp09pzidqeni1bkuwznmd7vuc3vdtn601khip3qxa8bw5qygrr94mjpozb5mwuyas438fkd4o3ndfp0ldr00n5ivxbfdk4peiecg5s8fwi9gcflx687co2et7x8t0ol3yuwhq8b64hrsa42cf9ahbqy6x2lh0ce5h7hcaqm47xtsmfjrx0aml4nvz1cy8mipdljqzg0lk2d5dbevco8dnwth5fcjwygdh209ymnyb2f73x7twaehdopsdu5hn1surpren2y9piz3mdct18pe7lg79x6ihqqlewsau7qonfs1n1rrtwim90ooo3j3xdpoeqf5hb1zi3taznxo3rzesekq9ycrhxz7jzhbjiqzjg8ej5l2c08l8d1zlum1d8zpox8m0om4qplfduyzz6m9f6cfhgguwoiydz70mvo1vseayfv7ctmbrhfsyaxdr01zdsfzfip08to1fdne53szxtsg3m8c2mces1psl8ky30xd67f7f680ikijzwnpm5ukri311o33x7jur5h3uwc5wuqyy1syviz88fmnaac8ukh0ff9opqt6uzbvxfa6n80pw496vmxtygvm34hujqw2wu7bt5ft5s7sdsoz6pvwtp81tje7fdlc5mij1s8cbkzof17t3fhv5uyvhpgdzevuu3tmcidqi05339ytutlfvvb4p767rvjh03awv3g1yoloztli9evub7qedy53n1clttddl2lhg7kf19oxy8ikqv0v0iu8dddmdu64jq8pyp1coyjmnguscf1keqv5i99s6ph9wlvnbcfyxufsi3i68j8pm3lnw6j0rgz82zeongqj97ghbwuwett5g6g8bw9yzwtbgl0pb4x60z4hdj6ub75kx0jxnh85r00f7abmz26gcs8nvrystc026cav1g9e5mt0s5fyhzbalzlarynvq6226x1ri3il8q4dr99n62lr2a0ep9ylkoj68u924mzsm760wg8ymmuv1bohc49jr7ywabivpb8pnymhj8qf8diu81tebznop4c6pettnghn0nqglb8ncg0z7omqy4ylcswp5qyjg7n29fc05ebkqqesskyczh9csn4b6vj1ow04gzx2qnmduqamfxbkz44qzn0odeshe6b4dg1wuilvc87d2v22xqjkukb7ko8zys29inagmdq7y81jaaxosqo0dva9n4su52mxqgjbg9dnxp0nlciglo63h5onsqaa51bt8rxmjg0s7htxk82f4cmuux13tqo4hmyz7t27dyu5ot9kou7aw7d2e5guxgx1f5404a1vrtsrh4pn8irjpyh3o1d792mue3lr2mt0m7erl50jxxnzlmjgkh3zng92mnswwegh00mohnvjhuzn8ope45sm5952awcc1fnuekf2skdzgp78fjhrs4nsu1j0a60htwepw2n3hlsyce61q49hbrbpcpyy4913qx5ke81sz8ptd53m0klbj314j38olbhpt520d9k3jhcihkft56r7j9nrjdn1g520ic',
                redirect: 'viqgmnq63uhqvoa3wa519bwozfwzkjw4hc2r54mwbbkwy48txc8aic1ishg6cug4pkqpzql35op4bqmjvdc5xybggupm9l375df0qvspj82w22aaq0f3wejmeefda4jfz87sgbdpg7ox8gz44zqrrhsugpule06vp8zqoqveasbh41lwkktvezfql77xlnfu3qjew4tdjjsm58rvvs5h9vv7qbz9scesw4v7xq3oqedbytqes3bf9x7xvvq1crv20aeh7lpfurtwuezn0p4uy65hlq4eapdbab9f7voke3d4hiwnmrhf1cjuo87xxw44qpo19zv3z9icj6ia7pic314jp127adf10fbt16r35bav41qh9v0c2aee6si9s04xm4wl0hv8l4pw4gtq84wgstkky08xotnguxbttc2bvltskk17w6yqpplp7cwroxpctglt3mlac09gjr7lpbvxn26c7r09tg0qaijxk5pljbidhz2plzws42u97b43s4jf1qxl98je2s0iy9d5zdyh2b0olwnye519jv2su8n4xrr38vio4bg2ra0j7fybt3f7o49lfets9kdm0cexgqzw5ldeueauf011axzulxjrqvkg966nx6k4rptkexwx2nz4lb0ginaxw0nt5x9uy52g86n5di9jhu71fgtcxmurt34hq1pafsyh5iwuakjv12wu6kit7f49u5d849xrqyn7omutmv6a5abqnp4qm04cqqioc5hegbzvndei3p8gjk6xldjeb7nz42crsuqr920j4kqlfd6liuidrx0ggfruj5qztbcfpdxgllaq8w8s5flgsjv1ea98ljnyqk2hv2e9sm2zq3xe2k8do30bcm1nm7axj7mtc0w9hjbdymcsxam2h9vkb4laeh6ytsr3tcgxzk1ujzglotdb1qt52ialeqfo1wzufcisn78u4w1korvmrzhxhswezldcb8e2p305cvxbcq6dyq0wdgxipplthsryns3gd51yulpbjhog9ux09u9qwtrc0jrrlbsuovaq72r2xuwt40tro0waol2t70x3xsns1ug1pladji2askbrtnf9esntmkqncxks6nfns0l03nu1oycmzzicm5eej6ozbb0re6d1es3v2cwg5gkwvmzon2fb8j5yj28hc110yd4gknfu5okspowpvgy5gdq7jilrtey9phw632x72adyytt1lbyrfd223zzvtdtjbouezwsfgglukli469ammoyggsxwlq8zjrgxtm7upcyzpqojj2xlvjjwakwnximfnlqjzm1arkjurwe8yosk0jiq5njneusdug1pms19n685jieka32023nrbeecrwtx3zan3wy6yywad8j45wcoaadjscr9kzze6wex1q2kj2isbki69lnqpt1l29di0ttub2rndhklclm0l9wjdywi0g6mbshk19pksd8iduuia1r50wdw3in50281211303qgznw4qyb1p1m27r33s95adh26g8jagtrhr5xbfqyjmpx78yjtomkhrzx3rmi3bc5nq7mcmb4chwrlxx6f1jvn1g29w7k1itvyyrh76kxfzpwer9b6i0vg0qc2gkf4o10iqebr91g0bbkvxaim86t28p8peyc78sj2uwtoh0qy5utnsqnff7g8pf2wz58jgaagrxtnknc6qg0zostymz9zc78wg3t3gz0fmpfb95tjscqlcv88m4xmmrdzglluiwqkts5z9uns3783no7657ipowthyqbngnkcmj7klr3rypezw86ocv9am35w62l1h8rtj9k8ozd0ei47yg7ostlpzqlqpy4cuk3gf5wes0ia30jjhfrdhfpb3vh7ycwk1b3l942cwgv562wq9tr3yge5il7its4zcqmjv3x8z5d70ny103u3l0up78fjhueliw0oup3qw73zt0b28byfwn8hmyrrnu22d3inxsrvma96d3pgn14p0nfjiuo6sgmfbiyt4u9r9yhdl1waq9p0nf4pfvhs9jqvulcam3ud3p0b1kou',
                expiredAccessToken: 3826929534,
                expiredRefreshToken: 8783600831,
                isActive: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'PASSWORD',
                name: 'exv3zlfmksqlwbeac3th5jae61jfxaua13dmxn0nfmpxmvja9muccmk92v6n0jtidbvu774itfwktqntz2p9l1tyedtnlsh7xieey6w2eygjm5f9iqo8zeqglqi7goqcarcerc95fbhwsg7lwojxkujhlbrcomjdmjvh1s26cozwwhj6onsa7m5wxdkv2b4xux3k8ewnoo9dcccrkvpkqcwt2d58m7fykprdxwz1x5tsv3s7mo7jcnvabvgu23l',
                secret: 'b3gqqnldaq2jjdo9gbydc3ct7awob8cp6oxfelw29b8ir8bu8pzb7dlss8iypfyum66fkvab7g5mwlpyj4qxm9wyt7',
                authUrl: 'stvyhgu05ft2avio6pwbn58dm3yvv0slddu70c5slb9tsh5miwi6u268gv3nicnraar43uabzgyx2m1h8bib2pvfh7r6r5vutbmvk0x6pzn9yt02abyjjwri59d6hk77vkttubhdq5msf1gttngg9vgf32clz0c7v648mr904mt5vdmln18444kiz9rdy9gza6zz7wqh0s2se17idzatuhj16aiszb6t5sld7rop6kgi5ic0vurh1ondmlt7hafhd27b5cgd4hxgbwbkqwbdtli1k40fghkkn0j68ns1mwtmn2wvianp1nl2it8k8v5vaui5bmndb3q3kvnc9d2rxpvrex9yabrlsxawlgxchuobm7pvm7dszp2hz3sm4xtpe77mc7k00lj7s0oseicl3y2tc0l6vnl2edj2px7jh0e7is85hf0pj5cy454ruyqbmwxs36meo2hxauono5bnbfpvnca7ve5g3ktyu2jjar70c66ku2xb2dryx0rcqww2f1ikj72gfkb400kq5cy73n4mp7dz2io6nz1r6adacgcymtdejr1myuyx6jeje0w7tyzi9da3ial3aa56qmt3iteqmqd68gy479ityqg20kogyooktdwup5ptlb2t7gsyonnke9cgkg44904x2taegiwz58y6rz26bxodlvb6cgw8vtlcyt2ycleweq1tix35xpg4eoa1mmpd45sciud3vjay9tahag8yog7i9ybzzel8jmowmkkwa08eezvah9frwi4c5avyhi07zcbx1wrbzl5s39o71cifqzm8joh0cniuddnkz2omg331fz6nhrh3jog2mhueig4948t0tyfy8kn4l80hyqs6t85h3x3ehhi3ywtiae7fw0r5mocblxi2626jjt22i52pvztczq8zwwlmrn70a0r1y40hpoabms8jv9g5l81vfcshqguj45je6sxnmj0iu89ozi4piyt5386bcmup4vq5qx2iba6i3g4xe752ewqfbkntuhqntuojvk48fia60my1cbbggqmf2k0gpxufsb5b2d5suaw56lvf4abd2jhxdanrkcnxeld9nde1hvkpgq7ucybunjf2nbc8n3rc61h81kcs1jhvlu3fk8lj7rds00pg93c0op7t0gefuokyoiomig334qaxrez39o68f26kkpgtft0yfa3u5veneu64707pf8w3ubq48f81zvuguu9lt9ai1v4kcrbxtrh00ki7119eh9a6xfdvn9qrluqm9o230aslc29qp1eqzibl9wysfilpui4zdyfvnvvgzglpnhty1vs52c9r35e8ts8byf0vxbxkr3zpsiqy5yitcjudetpqj406zlni63p8zjncywq2pn2k3318oh19tihhh1pbm1xtsz6vypm57r3o51hiwz4uiq8phf55r2md2t5d0e0x0wio7oovzwvkljbyee3c7tc72nvhlolvek97qycj6m8sj01b92kk0vbvd7f52hfseplde3yjpm68eo9t5m6hk581gkfu237pyv0iw3rztxk30lheau65e0jup4jjdlur5qiga1bfwvb9yh0fyepq6n9gcgwmzy76hmtp2r5q1fesw9h6m05ujnsim3v9r6ms1ww9vgfs87cpiy1s7wbumhpixpqrv6zrq4rsujci2j0uw4pglfgd0aynh82fvli558axqfgpxkwg4zg1gtt0irorxpb7bvfmy6lmp0buh7fm3zhwbz5atrmznmvrjt6wafun7hgr1skg9t66afduy8grsb6j5u1q2ik61ydad0fyf2eckyy9lfvc9cvi8dffwabndx1krsn3ryhj19xhdx1wca0hbkbe2gviyrgj2q1l4tvj2vh7af0ixgsrmq4capgyuenxgj97wp4skwkqjpl2kby66kvs8glrh9jy0vsvbdkhbadpzgn0gcr34uyqortam0aywz71b5ydlm7cqp7hnpsywxf7diy4f1s0k295005zomq02vzx7j6oxcu694v13hbjq75pi1p81dfqn8b5ppjf7',
                redirect: 'zie0jrgst8s30ney0kw25wd8zvrdnl6nalipvdy7z9pqrmi7md5yzvfm968q904itiayu4xtrqhrgbqtbk4apy7sq1crag84sfxltzw569p42yp3maqh067xek4bnyl4i4zntbuk8h98hhkdpwaunozaq94i8rox4udwpz419u4da5w0p257ru6duaie5eerjhw0wi71evwq3jm7fi2m4qi8pi03ktxytove7ejl5vi70w3we2oazzr2283f2o3w9jvhry8xczimksjo9mov4xr3i2dlretxhrt0ucj90du629o0mcr73ovssjyfgk714v5is5rqe1xf0c1gtyf4b3ri0omit5bi0uxky287kfa0s47m3ytnea0hzjyvwge4lko9hxdlv082lhbq6wpnyur8wu4gm4qnyy4wf744g2j3fvkkxo0xchtsqso9dabq10roeejrh8aooqgvklh28zg6tyb50f6kshfrv31imfwoxds9z5gdds4t9buq5obyrtyxrb92u6k42jei6i8zt18n6ga5hgdlnh9ndas7i8j4boyxqejkzcntx3ejexf7aemdv6d75jerc5yasp59zifjdurplbxs8dihrx1czovqoxcltw7cvzkse8kah0g98vhikh9w7nwgin9u0anxfceny52tisu9czfimjv7ol4zcd9q57lekdjx0zz6u01xa95kh44tcwf14okiq0cmefqk6k1c69b78r09d0amfvj06v6fw8jz92a0pdsea0czbkcpomtwauykmtg3keqwsd8kfvo5jo4vprnrnodu59j5ilqy2zqefu9z4ifzewa1xf0qdyp650uiv2re1mq6y3jh7tpfkvxnafuoggvwpdblab6e2b4zxjvcp1bcaal2d7f51ignin48z63ce4wbwm9uwdq03hy1abk3mgle436koddbkzaaxubu0wb7uw1e272ck4huedez3vh3t3yq01rdrbsxq082sxkyayln53qkx529t4opzojdmiddbtjihdu0ng07egflg8qrtjzgxkjh0qk7uk4r5dgfdx1btf5lwhmranhzgia1caawoa8irmezza5qba3pej7eo3vx1jiyuaq6rj93hc0352d6rm8kovqg50wwuwjq96xn795hby00tsqv0pa944vwaw3euwcjif2pz7npb21ftnbbxcnys1u3968yrovft4rjvq7pposbjamp11oj97232q8z8geuvjiv9ex2sqeg62hs3wrjzmp8ei7anybuk6oirfoyj1j5qt4j6vwvkfu3ms1xnaj7sj1soqgui3x6eohd0xv9xrab1e97odjg5y0u7u4gb3rna4prdfwrwns6i4ywoifc0g31phxx2ropyzmv4s20h0pk08c4195z43mhh6wlmfbakqybu6wzmobmfpnk9fj6mq4l1c6irrktgn5pkxj19q3bl9hkwbgfnbvk6l3fy6w9sdxxeoh1b5jkx0dazxcwh0jsav14q7gck7d251dtl8nd5uz71yabit18iycgee766k683idlyjfrfxzegyts5bob9l17491mg3hvjq3xp9nvhye15xrpng4rrqbzc313qu5iue4fj4xh9jj3eesyb3q3r75uw5235m7aza01aki8gs62vm9f4mg62wvq4c23k7p2jwcrncd0c2em1vb7fbt6nquqgp49mtgux8r5p6dq1lizp7mql768w18aaugdgdpw85jgyhfwnw8e0pbxcqnd1psarezrbolfd9cq1sa9s453ghkrsp8wxrpa7l27zndlensevo2s40e1hj4udjx5bk0h2rmu0eqwyxy8sp9nrlt74utzpiql7zk04td9kenwyex1shlkew198ggldz4oc1xl611gqch5e930mo0s17sy1koqeifzjm6guuv8ibgb0xuerg53a5mvov05xx18q1sggj83sg21lhngmzdgzy1p4u1az4amzrylw3klfozs6jr08njzljedq5211oe3m63vurusvhq5gmqcq1m8bsivvi7mkc7b6gzc',
                expiredAccessToken: 6537177444,
                expiredRefreshToken: 2652075357,
                isActive: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'l628r8byxk2toktsfbamfhytnq66bsnago3g74hy4ymnbcpc6ps3s5sdyscc4zycm01lxdpxjr8wbe8zsf96vuablxw2gehbvii9ukd48jvsi915y2cghbfo2g9bkqso6z2d2tot589ivycjrv8we2jyt9fbqe9ikdxegdvw86air78ry6bd466y4ve8rvr58z1z29cgkcz2d2ld3eygf5vy43979uc0md4w6u88o517y2rvx0lx1qq855ov33b',
                secret: 'vkh78yxzii36zfslmyrr8h5s7ergj3bc2f7n9be4epehovvfssy2wux9ao3ylimiyy0a4n9kfzmz13py9grenrq0pr',
                authUrl: 'kqdsf75rrd10zgef65nu8seqipsz5wb2smuav2sfctyj1kamplf4aahxpkur0d1mhmetqrik0j11pf0ovcnki4obd3ho9dvazb36c1vvkif9q2eui81b0r1uocj45be3t3ukf3dwkd109ah4q4ztxyi3xq88p3cu0dks8oiruph294s9qeskmgzl9t3mc3qsy0tnh0xdb9miqyw7zy7h5r5uwcbevqk6aqsgkr7alaxgdwf8ge2fxuntjt51nj5l2ao63gnhif8uuub2vk7trq61j5vycklrkx8q13whf8vcspdp4za69baeidlpiv3xlekqx9y46zah743dqqlwjn6fjtsjltorwbu5hv7x49ew4uqejeiqnhhude5j1ow2ayoa4qt3q5qlf0o8jgv2xhporjkbmcl6sfdx6vq7p0qsae9ehre103yu1514azn6dbe4wtxurf0ry5ihpplkuu0r0vnlike13fhpj0f2wgzjinlk61e7687v3y03ft23a5sus74o1zqj7iyp0k8vh95b9web4pesngh7lzx6rjx6ud7bxj2gksbz6ilbf4ub4wp9y1emaqjgw537y27qgnxrtrlqtod5vhxa4zm0qtwi6g63fnr3j92qwaly2f273xs9zlbkdgle2063vi1m8odrq660n6w5osfo2t5q0j8tc9g22zqnfbkwfcww3mx27e0nnzlys136h7745x8q4gxdwve601icccp5syg5lk6qya52rjol7nl3zyp8q3hoqwg4sr56mh2wwr3eghgf777v9x6bqndsaaq3iv7arj9r6v3z13ouegepjqnf8c6zy9kzri124zi3f9wuvpc4u84hryc0stvxtjng9twoisl0sj6g6ernl32ury124j9hllfqk51hilg8332g1eqzc8cf6zdockt96a33nk7e00gocasnhoa3blx1fq2y9j3y1ixo3neo03l05iar4h5uhd8rux6yaljwh9a4w2xbij9ye97n3mj2vks22q53q1g2szyxv1ierl1pkgndc25ff9xu70tja65hma61085pdiceatxnag7hohar6awwwprnag66pyh9ev8fywsmpmnvdwzka3au66aps6jraigbnc28thwxvyfukcx4akc68ty74wtyoyc8z9mnsnv4tr5rp2zpnhy24v9xmfhekyll69q0eorwl7eusaa1gwx4ztmbbxw5r4jqudvnkhxpkmxu75kmuadxomdve7dpo7rl8nggowida9j74f179sij1f1xfknvzlw6gq0fz7sgwqf73fx6c0lg9hoqkpv2k87k4eemp1dvqiv4aihqfxf4ajimid1f7xleetg6r0l77ts1kqpiouzcwe2zi7ir526aqzfrtzpzpl9ph8u6oiz0t1p5qrgit3k1hin0e9mdmc50t11tepy77fa551nvnhzs5p8ufc538u57kc6gtzny4wuzcxmcztju8mhhp0ea4tkqig55u0tqsahkczj4lvwl1vxcxrvdnnt9j6btscrmw2659fg29stafh4zu5po5xbcjykvc8bikn5al0oai1lx97ncnqfxj3i3o8dv2rbuau8lb89upldvaamiq4ebn94sefxh221yebv4dremxsjliynzhmhk7255zxsy3ktk8lrgopm0cd9b5wxrphlj99ju743eny0qblc41qhumgaj6wduwgbtr7zlsighv71pfni54hntx8txj0mcdkfvssl1ypihiklkv64fqq2m58l9oo2my7gp8pjvigpvy1yoi2a9nladatn6gblbu6ly613nlizh75c6ohlqpiv7c0376q6w1dkn4t21b8bv5966386lnewfscasf0g4guqcn1hiaxn3vyisltmszanrrqtvepem8odfettxxn41azkhmpapr0wbdl1eaga77fp2e5cot99glk5huyu7ohr8ycbda1t9hqbzsaczdub83w9k0ge2xth67sft9y0yebfum26bp29l4sg4kc14uj71tloeomzz0226r0t5xwkr0futvnk3',
                redirect: '06q7hpbyslguh8gs4d117g3d9u3dccygebch0s52ebv5swofobvjjz2v3se5ff04y50519rn20dvn4qkv5y5vx4u2yva03lh0ackfe7fxn7hh61at30a2xdcs64ah0d66g9plp1ezq7nry9eifoculn4jrkh9lr0fz0ea0ok71gap8j7eade77rbz5a68oy17lu65vh3cg0qcr32hvurksg4h1a9xdnvr6dojxsha4jumy6fbtw6u38gispmvzyhvuw7stp6591msmlbfyj0v6c0rznixmvnpsg553s92tw0kxci76jk0g2xx980s1cm3985lmakbyvaml4q2ylao6f0nodqa8503q1kvztugvc3chcxr9xi1engfi8n6nvzwritlokoruuuc0z7lw7otm6h0a3jcrskgmq1clgkeuti33d5i5fvc7c22r63cu1uzubguhm808ikuhjc7jbuwfk38p8t8f3jkk7fmny2mausc65vi3pbi31dfzisgvrvuzhycz65lp3c4knmyo9b7lss96pwzedw5u6z8ttumyb749hbj7rz6ffevddi48qlidqoswxa98r6jds86xrtzgcyxcze7qj33ra4vj80fidwvlyuzse80541kntsmvtb3lu6uxr7fzu3as5vk1i6kwv4utzn5711wfmhimye2g7i4ti2f5ajump9w91l1956bnsvzf3hcxd21pativxttkgclipxysn779ztpcv7x7se4f7ww0oy8ll5yhpgfc6j2ocw0528nu7x013bhxdjppdf1wkynppkv17zmctpx4km1g69hteli9nnx29uon9nxlwn93rq4maxw2f8hg0a31k75vo73kj5lmb3e3tbnshnno798hj60jklyoc2u6y0reb4e6w87t3x1c8qikw2xcwn3ijwt65bbnt5pfp5l1pwoo0h7u3dk7q4dm2irkokamasbi3gmnhwwz6n2olpba9g0zcbkl40a4uh22lml7yb9yx7ilcjcz789aifdxetd1mwjqitwijq58b7vyzr9z3f6n870r79qugyvdte7xma6ra6uzqw2ywkzmh5o5sr5w1qcwfsf222pubrdu539wt5im1c832wqxglyq1dwioe3ab6podkpq1yv86904l6w5ttf3ab3v5wuwcdnol49cvl1mpw703y4zt47y4zzvz8rgn3634lkoggkgogq3ivp4oy92w2lkomsgs4rx9c1ixddel4ktz8f4q8cre7jmxj2416319la1blids4qq1ab9znznaw5tvshq39z8syk6kdroikfgnf7wjsy92t7ygkg46k8ikh9eimfrh3svkvourlmz0f1qpo3seeu2vdvhiv7njbrq5a4orptyqlw2nl98uy50p1jsrvs3n3qbhfxqtsfvc89st1894f2t7b559r8lu67cwcs9i24532dfwfb02a7gqlmwgsgqg63pa8l9b7510wxjo7d5lpsl5fcdeci2j4cu151yynmhuoszyccunevnbo7k5wn7q4z0z9izaaxmeg0cy53zq173ooxdk56p23s9asxp1ulgjdt0rvoviybesv8i9c2ahkwm4jfmyghw4scaycbkuut058dl9ga14rn9crnimqw7h4xfpy1gdxts7zfjeqdzsvf56kj56m4k8makmv9cctbsupafdqgxg6kfxqn6a2uyk69v1s1ss5ffpve6use64p04nmfgnxcw6xvsgox4puf3ebhoijcm4nplnkrkcyznob0qzdf715h1xt0zbv3ronemnly5n6wiqs0h7or25hlup6rzpqblompbp0f52xvu6crjmxc2tqaripb7bhqd9wmbvtrpmk8qs2jjc4jjtey0381hy7g550jo16q8wz4bbf93cw6ho59pm1lhpk3b843rndjf0x6i759xx80kzmlmy5da1e6wc6f7q0me3h219n6h61giurb6601hvk1x3qanj4ghkm9yc7cnd8s52mlhnpj4nvyrcimvxqiox7x1vc5j4injvdlksulla6640hztqf7',
                expiredAccessToken: 5453872653,
                expiredRefreshToken: 1221860680,
                isActive: false,
                isMaster: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'r3orj2p3hbuys8q3y3k72i3eweijukz3pkfzth9smjfsqq6ugfd2b7vqvzvucqjtphaw55oh4mwwc66mwwoy2dfb3dbhugw1vip2v9a09c5ejsjxndmt61lcxdmxkg0cx0zd4plz3jlbe7ixth2h2j9063zply795w5ko7je5iqseu7hx4722mioyh0vh8k4jec32l7n04ewi20nzuh3u3rvaw9p22e2haqegwy9y4n6l8y4xa60iemojiai7ar',
                secret: 'oq4m9bgyy47rm0g4pv3dqzs42rzj5wqu9f9r1shmmq88r7vad8y8r38fxj26rcd0u03if3pk8fnamlg7khoc22joag',
                authUrl: 'tyn6ekq5199i4libm1uobfcltfaohrizj6nrgh7r3b3b5dxaq7qggova26inx72qlduwm8jgdcxz75ia61mj66u5un3hncyrthsg3i39g4fliq1uh44vbl0q60w6k70maktx52vbz2l05gp9abwv8d26jcmp7m9anffsl1tt57icv15j7kvtrkqfjr6z6q8a47rhgv5cp8z92yr4gthmy1sya17zftvg9jzdhihjkhunmi9d19cclk4kfl8otz6rhd792z3xdci5pzovijgrmmz9mf5cxwx42q2bfxd0jn978izphakk2ioptf4yd9dnr9wxx2zdlcdkjh5oqgey943kt9a8ddrh0x7a3wkwy0d62kcir0a474vyp6v4dzf39dor5w3hn3unbm5befi70hj48kn8ecsz6ovvng3ivbz2jk4m41z8q3olp8bojpmxuzvxvjdmb8v2w8ks0r9j33tc40ood679wjxl08i7acdgqaju4lrkvw50i4na1peaodg77iq5hrym75pzcv48qgq6ayiqskftbeguorj9ts8jga9fsj7c223fag88czukd8sckrr7mjrojmx9oq81bq1drtx6vjb4k4n8r4xjphvc1ih7qfiwbxpmlddnsh8quoqs5ntjryyuhxuo2g0i2q0fhcv5ol1h2qjkqu78fxl8l07mczlkhno5c7ia10m6amhkxs320mpstj90fzqnn62vkgzsmr1hjrh62x8sp3i0xscohg998jsnjc4k1mwn8ily2izbi1dwm2pcbnqqp8rx7267ng0amyzy3psj3otor5al3niqfptu5ruot3hrldlmabm20uts76d0bc2iy1yl0aq4pwp467g6n47kq0aim1g0yqywgx9nkldxl1danlkdomho2trjpk69dnklie7h9kw8bfpowbvyhpw7suv6typeve02a4asp6dnggg2tvfqpjjb20ubr85vh90pedk6qc3u8ayf5kfsppjnqkoircd1v620twxmimi1vwzs7ppbiwyoxebpm8jl6vwyqw4tlcluezepxhho3aqdzb5l0nlskqdxshspis6lisu36un7tpef96cno86cbqm3b509nd0ridq3pob7vifptw5gu8z2cgd5lp51atsonqo6mb1jjkwhcg5bvi5gqk64bvgq4hxq5jd6jsq02h6l3wjl9cvy4e5lss3dboc6euf4252e7ggjjt7qk8oi1v6u8o1u4ynlf0d8qgbi4ohlle4afngkpiysns1967e2dx1i7aw78inmvm42l8kuleyz1gmypt27cl5ytf4hwdupszqfnp86zje09a60sumr9k0pya32ullshbp0rn7si375951dq522aguq4zjt3b0ms61leyjdas1olzf6le2d0ep9w5sxs1vbosuyuwjk8v5v4nfuh4fq3lck89p24t8ppbkrg5p5e59q383voa0qks13djffpuixtovfnrleocb315f8eeh1t75n1ylfcrae8hk9ualfhka7o2bx556vwpbnmuprep9aaxkmw0oc6uxpnhj8t4vffl0wu94rfrb8fmwxf8p6cme6d6ethow54azz70kj8vrp47r0odnaw0ejire4zoi4gfna56kuorvv8plllz36rcgxq6cmsbwh0azi2obl4xqk231h4kvk71ysohdjdq5aydmr41h9jwko8e4exkd3xrxrmbncdkcpc9r65jetm9na8ht55vrgmrhkzxxe6wmf3lns5h22ttpcw8uuk8vl9wy1p71i3prdwjngaj1l9uyhhfc69baw2jnq57mqtogmnlobj2c0swrw77oybsg1gm6w89prkciclyiro8z1kj1je9tift3ko59mrpw2v2zu3wotouyks6an4o8u0u9r33294s3ohhirghoizvz5ft1e5wa88m9dihan1iw7uow62l276htk740kguoygd6z2ecs3gusaql7bgmvlu75mlnvxe9jvwyz4gw577hi5j6moxvzpujrne67vfl2w6manka4wy9j9wx434vv',
                redirect: 'kgexf3utqjxvoag34qhe15huk26l3pcfnoxv7zxbrgvs3rn7n7zc4lukinjat1wo7voek5zf4if8toq66kp2qhtrhalzlx2ubia3hnxaxd8qzel5r4tb4zazx8no0tf1vtclbm16ppsr4b8ievynm4rde92n43e1e1j1tfem8isslscmniwzqfkr9bce2hvw81ytlq6kpvvo6dogtm9d9g2obkophpdxq5klebp3l2q6rcbcyhjcwvuiamza5creoglwqdjfj2ioz2g189rsjeszrbnyzcuvscn7iae0t4rjik75b30izbr6pmewmuiwjmgz3bfv86tz96cvpxc6sc6ud9on5rqgvr6z28yaz68bx3lfcw47y1jx1qhje08ru04i1vmbbtpwmu1jalgxj5fn7cicpgcabpol8rc7xxqgy1tvxbdovng735k5m63fxpl0u1rlab0spx6uyuloydvjqtxzj4xatnum7t3adh3fj4o6962gbk2vouxe2vv5bradauz0uopgls4m8aqc10e8m3kjwc5c6sjlwtwkp2ykmj0erwirf1mrd2npxlapyemxsujd3iyr74g8fv3xi9jnoyi8zt24t5pe8d8xo3q6x3lh775wbftjriuke9jcoqfq69mjah9hv6cem5fmbhe3aq939otchlttyjv0kr8k7b6q869wd774fwso4450gkb4je1718p3ets6q2221zd081lv47pwofhtcududgtzlrqv40271wihimjkina9zjy0nhdt1dunpsjhjzmj42y7orbibkptw4xahczppfgphq0gzighr5d7qwd1trqj55dmqpqqaqfjcnl69znsp2xro0i415y24l3v7449wlm1zls6p95muachhfglvu5by33jeneq0km2eb6cybdd14rt671voikk5gh9co93vj9n0lnoxgiwb3eywhpxt9na1n23uv63ek9bi8si2jr1yjz0ccry06hxegmuqga6fxoulrntbvnwoisj0o6m2xz3qejjpy095gw8ij8pveztqgc4mh445fl1vjkbtrj9glltins0ko0monu99ps3e92rxq1rubfua6wcj18ilw0q0lvuxm4jxi2v8q67hn5tw6vxldx06cygvwy5bncoxnzddhb6t2l9el2kz2man261u89b5f568hixlejia6t57ojkal43edbgjjbzf56camfjv7bw4o2z5q91xtcfuq6267kvuhw4jxi4iaa09hgzz2dl476pfjakfqipzyyd18iv2yaac5uh2odbwzkow2khiwgguk74l16rb8n732y2z1to5gib9j2ua63coibic2vuz2quc9wsu0bdyl63ncshlv04ow3odjsbxae0402murrqaoo2h5vlhrden9ic9zsk9gbtlqedcmr2n3bfyqrg83t8f8j6annj9mrobrfhjbmdardggwga9f8sarw0g7pp72f97o0bwecxzaw8chi5e9p7325k2b0hib5xhl9xy9i8pwiws4le04rhncvq1d2ylvoidzzz572lxqey8xeuc8mx5r25cqi6r1ghipfueo4t8f1y4qekc1flnjtkhckhu0xslr2k1skp2ocu3d3wphou3su5tu7wn43odvoz71bazfh24cbz4q5tv66xu8gpd38q7w5h582gchhp6xw5bcazh03tjz40rlmzqkestvotetdwt076sjly7jtkaactxn3kza5y24wkc1fykx5fjyioqs1z12ayupyqdvsyui56hrhxtaoogho0wk8i8sr74dsc28tq5qhm898e8n5dhnjlvqe8o4v833j3kg1owowdqvge6u0flx6nk9g43yajpi2afe5mczbhl4r88rwam01ex306vpq2tnxvcpz4qgk667i5l3z4m89d56yyws23n5jo07t4hexx2cyruztbqgti1oeaqx0qr3zsbq8i4a5u9lazhseetk4xo975avruncelzkvjjprbs2bjg4e3wsadbwv7ql42rxmm1tlp6o3p2g9r8ifx6mo81fuk17ce',
                expiredAccessToken: 95943318594,
                expiredRefreshToken: 5485254451,
                isActive: true,
                isMaster: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'weyc4cr3ika4y07eibf72pol414gdblllpy0s6sn6vzwfgi5yleax1y5034mqzkfan8a88lp14jlipskm58gsdmr95v07a6jnjnnood52ywnldzi2zg0olkqh2sjkczz6252r3mnnel186smeb8u5pfjb5de9ap4hz9zpmw3ek25tbc2frnsx5dv55b55iv3o5dfp9hmg79vay0t13ur0np2d87usq4ooqgwehrp95ihbarfyylslf0hkgk74ef',
                secret: 'oz8sxyfujw4wholjpuwtlrqqonpotqanypwg994jx9r3i7h64kz9ckxrvp37mwsbwkdjm2iqs1vsoqhxt8mmwhtofy',
                authUrl: 'q8zjrg88ircysb16uubiy9ex14rf0ntt855uh8o0aydtf58svy8fxkow7023t3x15j2eglau6zxk5hckl9b0v4v4f9eh9btdf4v8psbrp6iilsv02c50zg35qne9i2fia2c746gwg1nxay47haheobnq3ee4qv1jr0w1d4b6uwdboh4mqz9fwyznbmh97pgj5q9jz1yrxysl35e35ib9o4g2c7zy85jkt0xq5fr64kf8cq59rxjzxtqq6uyulyz9j304ls2zyhnajruz3yvij02xago63mxpk8sjqexi8qz8mp1zpjads3ob0dbghjzwwzge615zr21bzf6dcj5948a4d1ybpjcqm202h452uani2ticy0br5u9fd4npl4w9k8vjnbvf1k03hecdfdl9942q651s20yg0wn2r0xhstp44uzcfm0q2rdgedinz6pe750nhbry4kn7278ojmnis6lkun4r0tttcwgyi306vrlpde1atik0zohivb5zlcryj4nexs6nukr6fcoue6ect20024s77a5ls6dkusdtbltpnyeu1z9zlahkku7ee16tltkmxem6hafdouknoy7h6ub7oxitple046r0l486ap61r2rpi6kgytyqrf1d0gwpx708xaz6jvbzcq710jt4xuhn8q2b1oxormtlvy0zq1z0nifqnr9zm54xhczbv7o59q6m85l3hj8eio3pw35ronhq25gi8r43v37s53cucwhzjorb2ks5ff6lrbb215ozyt2n2p99qxac2y0r1rt9sus77m8aytumcyw2rb16oryfocklc2il6lg9flpz68nc9q7sxuaaafq44mapux5jinvmqnefu6avptvbv97a4vvs2zofblazyarswk9gliopv6rrj5zhfs7l9x7cxjl5h1qkat66cg329j5svgb20qo439sp6e54dg6x39jpcpr6oovdyu8klrhi499ugqu0rbp97a82gaedak5ncg6ml0lez53lgf21r23r3tcbk1h3ejyo1bmigiawngvdw0f9x3012d1025uox6rxgfl80a54lg0xo5wfxuzr6zswoosc28q0sq6x2fyj4rniu2fdg46zw5xhfzgub9nkomrdfdbesh1k38nwb9998dwy3e79itg2y1d4wgrwvj643b6t2gd6gi9y68386q1scusv9ptaw2eydmx9n3i0m6y1wgdnsxk8zzjix5bngke1qxhlrnbedqy5aspv4udwq4xw918pt9bp0hbdzszu16p7t1fictq0dqd3vhbe0qc3d2tp98jruuxoee46jwlfin5i9ciurybcm9j075891ebsy56uttz5rcwnxeniy7tfizyg44s9t58r9e4vhmxtbp2zzgofcw38nq3pgch1z8i220cw3w86k4ebs6jn44d39zs4wfrxopvsplrxtrajp987lzikyktgq4jnaqg1zvsq817jbzzqqeemzbjpvojxwvotjy8v4xsvl7zmeugbzf88jeo2x22nsqb6m376l9orm3wo30sbnrqjtf2vtxk1kfsxx7frvcg2ga3l6ubl9daoogeqqp06wuyxyeyxog2sk3wt7nkiwdxe5u0g613f2uogam103quk2msvf69xvq182jftw3d79c13o3hri2t31zwzi7s192ydne5mbxvtwtpia3jb5zmzaicngjvs176f1s0q6qdmyspacgz3hd8by580y4p1wgn3xtehk79r1jv0zjf0a28spfe1d5j3j3qnqbyjvlskei9culdprvmuvwynhhkf9fctt8gc9r6asa66cp5fl1jikcino3bangu7cbtglgnob3osn1ltj6cc0zpnl4z37mlkru11bvv245047ug95nh92j0ya2jowuzfdbbrwrb5sigq3g1nq6ryp7gn3xgvccnlr9cr0qm4i8gwbsyr6ifr2h42nhj60c4z3j6bi08gqkrjga350x7bniht8uo4gx041dubhw4fkbg5qxmjzsn4ncerltwax4ukcri4e32majobx3e6j5ibrn65',
                redirect: 'wjg6exj7ximtu6ep9sxufo5waydq4wbaszalw2a1rm5953yy7obr71psu7ht7b2ruzioo3hu2rrqoy6aogape5mdew1p76zvstjc7z5xsb2agrb2j03kdjzb4okfeupz7z4gdcmzh3nc9jy1dl20az7rjkc197zhg7jt2v3w7s65gu3hgsvhp2krq6df0mvounen01bnkxhq0xpoq7rnhqzlrmgjzvspsm7axri9ky4rniqt4s3us4sz1asov554h8osdil9g43xtp3xvcyzn10n52mu77zmeonlqxtko9n4z7pabvg5ehhpxps7kux1912uci4fwks8e4uhkusja1hvzdmnd4h4gt07662g9fze6w69ft8yy6jhlc1iiweg9rgfin3eaq83nvb0rc8jibd3rk3mh7jjmvfvtz9s6fkimebmnmpdceo3si59el57648gni0wrp4r5h96dlzbdssw6t7h7o7mdtljzqzkroi2qj7yhc1d6l5w1e952ovkz8roy099nly9yq6ojmki8tsl00gl8ss2ynbrwzujrz51a9xypz7c6wxrykjf4zrix5fjlaly84q1prqir9n2ycequrgcgfr98gx95g9pzb91j1gu8mb5bz8hv7jdcudtgs0xht2b9j1cyvjm1xzpff6dqbtj0gda255bk80v8gunz409plm07lbqlv7hsgrbbnjypwjl9vsdqmxzi9lzrobcwi5nqpqhznc3wa9mijsfs8fd814kwwgjmhmphyqalo06u08662rizwq5pqw6vkkdmz7vqj2f5krja44be1sg5b55mz5nrkbzmc2kknpox536ec2sukkreatplcyhvg90zqj07raqy9od0fh5gnl12v9a54r18kvoof5ui2ga4wm50kjwpsv0txa46t8oyttfg6eladdvbbo30bzmaqpljz70pwksi4czp0hmikdy9hw6plo4nr2j6z7ybo80ag533o1x917valtgradmmglcac1ogvg2bx61324zujqemv4up1uotxmhsokajylgm0r77nunlntmue8o0n4oo1rprto7rfw8dftlmympmxf1kuavzrhjoysjfxuqay20dklpll00pvi15pwvbzbuqws3wk0yd2kp1f9eg389r81moftyasxed1qdd0gzvpzt4gmzyn3cr6md6ckjktbxr64bjfhlljmovpoas3z22tpjt432hrm9aix8td5321e8qprfdahgyq0vxgsjkc0wfjp22jd7mit1c6xhpt0yhz5zkfmzb24al0029l9qpfhaf6w2d087u56kjr3mfr26djvsymc9lxspzw6vh36ctxme2x4o33c5tx8lny83xoew3z23nvgqmsfuls9z7s3y8x5kwfl36h6uhgwps0gxhkrcnrwcr97vr2jbht58eb1zpm4a109d8cvakrf82kteyqpcb9jvfgg7bkc12wsfn4rw5s0zqinljf0nhtt59okggcpy5t3tj6tjx7tpz1pfxnox6nz60g1nly5cp9m5ri52m44ha8gih476os9o6eyavol7pl8et16phyq0g554qiytmbvhamnwsf3uj1864ahur1uzvxzvdjiyqlipko5mi3uxf6k3ag0cfe1ph918lf1amvmhsct2nckrog3oultlfs0ocih8ue7girl2as4i6rgq4im4kponucen84h8qczjwi0azvil1xbz1uqt1dtdswqccyhxybugqce0j8x62o8o8vil30z2918kv0zf30ojocclx5of5rbkbovyf5kivq8x4q82zjjw6ctbycxqegsqswsr5zvukluhbujawjstqwv54ren9pua2ssd0am3k5idlfgdtw6nu01a45f836jikajsn8y572xbfjgdvkps2pu01h0afijtgrk21jccwbyhinbl4i6lz40kk8gtghm2e4ukq6ssfe44im7ye1wseg5pwnfrrv3bvsya0hvr095cpefirskf56eykwjkcmdxihuw51vzr6qo24wfu2obnbji0t5mh99stiii9ta2',
                expiredAccessToken: 1215688677,
                expiredRefreshToken: 89353821397,
                isActive: false,
                isMaster: true,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'qon8f8640kch3tjpypodrrwbsonhgnd98ycg899fsgk3j1b8bmnkbm0414nun7dpwj1w2ym8qomy1vi867bqkvpl6qynf0iqjcfsaxe7c525oceiv9n4ndpryh6z8atcfx05tpg5sgkpvfww02e15trj23j8oir0ue5df650o6finn7hqeapnzrerod312skjh91c67nk0ivxubwqtrh33qxu5pjiz5fvwgi4fnyvnv1vpja73lidyinxekub29',
                secret: 'tpokj5r5rzq9f0z9xlj31c6dr78evqxzrucw38gr5weosmmk94ein6q95mkvnkc3yf5iz4drnukyogf4eun98h6qd6',
                authUrl: 'fwrcz22w066jokw9f2f0mzfy89oe2tcrs2a28rcfthycp25swjqh12tzezoyuk7c7ucno7kgc6tig8zlqgsf2zhp64r1hrmni38n2benwja532ucc78ljm4qas198dd9befdienedhsbvttuau6e49967v8z547n7g26v9eo7lk6ob89c4055btt5rjjulsz03p8d3zp2j3ij2bh5idxb9r6z7vdg8wxeca53zd9yc5lcxhkuc62aj6b0w4u2eaeilzy5ii17h53gwz4gs30vo4a0z4233uo12ccb2lcqmjxdml1rw7lwfo9bl7sx751fxo5c5hxydyx7f4926g9zbsojl6a2jv1v7ftjhsznnjwwllqpjjfhudysz98gbgqg17rf4eog718l42fxn4426k8s313v3a07nosjpwtumzly9i8gf887vn5ze0h6klye6hhylh1vepb9smg9w2m2t2zdgaialvl1e07b7hspnck3zd4zvfpx0qruz5pv3e1dg5qn2wh3u5xqr0korq9bsw8j9xx35emffyhld2revcuqbmg7oz7tm09j3hf6xpq8g8htb3yfoeayak953nlsvenknaxthgkdz0zxu4cm2rqp8yokxlxpz1toz0hqihneyqop6ezr9k09hn98fsy6pb2v9o56j1653hens6ogb7m7poll8ai1swhl0pi0ubfy4h7a993e9epb032wc3kv696a37vuzt7tjiphbtycbb04ww84oguv2kj4w9ugko1ihc7zrt1fge1pq1dvg10my975yp53joxha043enexd5rr2xmaknvxxkh48zcdllgbgtpxhohyhofkvqcidgibfgn7v0djfnzhcmlvb7e4l0spwa1wnqs3le50qhb55hymleba96qt1qf02r4n7cojyhlftjqsqzqpusqi6fl8kf9ft1o0bk6efy4es7iyik7dkrwvjiwrc2t2z8t8whibw1nagwfof73z5h5ovt4khrjoptgh0rt2egpazd61dj44qffzsnwr7jmkzrrxgt4b2rlpyl0l1h87dixjvowxsci97loore7em42git56mmdv36ag638m7cf8p04h3whvz53kl2w2szae4s18c3ov36stifjljz8lj2jmtbhqb9ish2motvriqlc89mqizp5wngaazl3tn5qqgmutzwf3xk8o8hreyfvrw88mcu5tb9zka817y63v3rd9wq1k73260sp5dt6f157xo4qobqa77pg072tbnetxt9a25266lunbswtk09tji74ueuyo33a8951t302kfyo17m9ni95az186e7r8kakt26ioqh19k08tr0mfwng6td7wofcn3w321ctny6kn2pt4fzj8xkri2gm0vch8g5wolnodljjzqd4i82wieplrtp5a1pmvm7tin5u0ktv6csktfgx6tut89py2ulxz7if31vvyiw3zqt7sktltfhzmjgzotjzxgkpca2hjl8mxwe6klzwnrgn59i016b29p1p1h8j4nrzzsboxeg39bbyyge7cxlsnbt62niopppc3cga16dvhr9d797hzv3ck17he6s3wacwkhv9pv3gpoyg2ljp9nuhzou4jymtk0obqfqf1718updpfe4bmdiso5abw3q0e5mwjshwsevsohf575dl6jm9n922odc6g6lesicw1idptt1iy26a2yyq0g3wn4dbrvx6i5nvrhydl49gnipu9wxy7y21yp9731uuac8juhdsbsz095zgmxluy6zy6s1rbq2f8ms5n55omba9md0y0ncqxeqbswei2q644zjphugpsx8xfl4z1gn89n3duqgqixs8f1oqwhgxfeq6vrm4ve199x58uqxfab6klucjuvgfzz697pbcupmv71lym2tnftgxy4pozfk42zo7co7vgaj5glhlqtgkzcf8shyu5m5ow2r9l5b64v5tltfjwqkqlo63apy8m8tbrdn5aapgeobbufscquyqrz1yrm7393nf87qlodawxlb0n08xutb55qr2kuj6',
                redirect: '5oycsss3usd4rkn5s2xn3773bnifj2d8jt2blge84vsmbzc9d27wihl0ntz0w061ad3ffguajhnfh9bb5syyjbs3mxnw9g03fzp9d6wg83dhk3vtcczuyr2g07u4dxzmwt3go443xnclwk7b3eo1y4xxl4u8c6rfloxgshfbkn5my5yrz04iumd2t351fyw236cuugjr0vuzbakrnekh2wjpzm0c7yrof5uzhvwu87wmku4qr8c8g2rzkdoryjpdb6czae8ra0rdc054r39rr2btk05m2k8vz9f3dq78e19ms7b9hwalinvxj29ad0ptw93s9p9wnbhogybmcng3t7rslthuwnghifqgf965l9veklewslm0kwrl3w3wfmixcuwnn45i6wjs6vvt1smwst53hgsz7igj8868h9mvv66y7h86lw7d7hl486oq44me9tr565uobs0fymyuy792cm4lrsxly4efs1dyod5win7sxwnzcjkz57i3q4cyioigitax6190wzfmrvsagwlkz0epaki8thvk72ihu6misi1jsaijtf3bcagpx1r6ou8us9b1bjc6xhok8nto5egtvm367ori917fjgzi9eamldu3g7c31vvsm21r9ca6y5l93m7muaxuzca15y76utgwtmiksxbt2qbjzvemfy44tbvnv962fle8yezj8nin3dxyurvfnrcorrnipr1ett5b6gbkwzi1ewkm2gsu6bm4c7idpor5ok6af4bcis84yblt6kg6jdg133lf1gi3vrab223xc66b9o7mo3kq8edpn5fbdprd854ziq01ts9bb2ymjhcp0jpv9ondzua2z2cohl5udj5matc4za0mg7jz9zbhlqfomig04idyx8nbfamnsxobbj1df7k2mvp1tofzsykb8qsvmpemwu5lqy6j9f9tld2791dia78zdukwvr69khc49fq6bx5q9m1rq10emb1gfzf8qb54oha0bt1sapkrrs21l3eo9n4q3e98dokhy2ccnffejkkr5v7lqvtfgt1mkadhf67aa73b2opuiuf0wzk9uw35uou1ffehrvgece63in8idw6fgj52ukgyzeuiu4iyy76n170umpf6w3afdrr6bcwv8orzc5fhonfccvnq7zz1697me1zj0i73idsg1gsj9iemakzd0z1502wwbot3917yn6yrsjhb8xdd3022mwzh03n0oxg781griukp8wuiorvvwtln15u4auiup5d21e5ugrch6eozv0bc1rgufy3npasya3btacuz8yetcombqm9okaz3ykcam1qgo1d75qwluk83xzbh5xogun17h2feezftedemevjf068w4sxdd9z5k5mt5ugrhphccaene9143xvw454segmg290v77gkhci4hx8ey2b20b8d22jwfeb9xnmcg5soqyd0l8lmga7j7c689cmmjd368z94v959ocrd5whnjxrz0z6fn36fjkk1uqf2loa7ljwt8kx7218zyl3anws2e7xaz67k9u6ojdv850n5nj018b0k0cbrucklygl4frsnrgfzmxrag2hz35f8tuh0qmb3trz32o84t4515smtl7yoigvfx80627jcke59hfjb1jrj7aojob2nba6dhv2cysbov4469g5tbp3bu5jj9dmyt75710ekzbjogp8ds24ogufgod7uypsi2bqtz6nmaxejg13mwq8in44pubculaet8e9rj16hdp80bfqewuv65nnytmmght8szwge807mnn3hdbiug2cznlm4qko2m6mc1peakp3uvsmah0wndvxsslr10dj681jpb6nynju5ez7cdti3xgu5xzedt6mgflbfkaqumq7drfidzh1m4zd2854dobubxiqkvqr17q0p40cz0veqnpimmcoknkqlqfvqc21d5bvopwtk27a9t5hje8xpa4ov337s09ef80ijzd8fuz7hymqbtefu5ocop8nc43tdf67o2fsmjujfg9qkzj3fyzur0joasox3kxj8rcel',
                expiredAccessToken: -9,
                expiredRefreshToken: 3924656539,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'iopknkashs14j8eir8d8d9z986viau56t031j0wx78bnny1eb2bgxquhtw9ez40136nrz97ds5c6u52gcj05qya68awwn5nem20bj83ggst24aua1oexn0e4cu4wnhkiglfkaiav21ggnrslu6g9k4p21mw8x1g4880xxmh6rkwlt5yib8e5253unvz2iectu08r7egipbfrsm0zdrcr7frwxqzfhio721fkkggkdnmtmvkeedckk9u7vnvckvs',
                secret: 'vmi0yutja4w8ywq7giqt8jgca6y3vuhqaxfefr6svxx9hg8tia77vkdkqu4zhsom1t8vd39ynvdhc71vqfn4d47uun',
                authUrl: '8qf6trlylr6g2fys9q1emf1chtrxj0tidjxh8ccw237v7cgcib66afdswif7qd80xkchev3sextwooflkic5d4xw4yt7ciqr9hgnr2mx0zk5ie1g3ymnbw46xigfnh34pmbcs5y18lzhjvdticbv6pnqkz99h5g2peq6mt45xaqh05a5oe5if06ddzj34sqzc9wxkpr7zla4awalnxunzsj8h50p2m4b45ui393fcwhjni1tjfff8lklcpnl7pj88vxis3pt5lvoeuxpd7ie0oc8h42aw83a7dnaflp3243qied2dwuh368eaxtggeam7t9q5dy2qrl2baukuzf35kyuhzhuslt9t1aqcb6pzrh5753xgkv88zc4r1ndo3n0hae6pkv4v71bsj9iajhh3w1dg7t92xmsth909n0yvk5k227umn3zag6usrwhf2ho0q9d44cyj04q1w2ocbrn6xy622o4ac2qgiffpg2mjdg0vy5r15t6yahb9ssxfel97y4cgzx0jyqw2z5o1639c0h4osc33w1znh0z5vquncdd53r2nqe4dszyoxgzzla917fn0zbtbgzlcf7tf9v8j989rb644021bnz8gkt8i5dzb56ca1qqex5a6xlwombya4j0dj2i1xvzdw49bwjr2vki960qoofpx1ovbf0dn9qbxp69na0o8zv6jxynzn5031b8i848lajgamswqppa94miaz2m2j9tbo2jodfpj2qkf41vd7svogb8ozktg2mlhy9l3y73j9gqidwwtlc1e08gqp1w3xpb9l8t856d9t5tbbyr3fm4ge9xqz55n9bw30vtda2lqtab9nstaug0usk72b8j6677wxwt66qamps0eogmym7jlrvontcyo47vjht6x4lnb5nafvax5vrsqul4fnnbu4rrc8uoh0znr8pio9oh038ni0zw4ss10ksoibtxn0vss0qwup0qbxtk9ha88hs5vhg1hkj7zumbsw8kje382pz96qalzg8v893ammh4m5vdlmtpv6yylstrh4wxiky911f1963x42n0ukvzja9ftzpgdemaokh1of8zuv49qlwm39jwvumovvwv2n2nxoflqgc5i72sredubsaadzaaykqqw04em8i97bbg9mdcjj359ddsbmssspu349f469g6gv94w9i8sab2dyx3emigowc5dl19ypqdyax36a27ijt3f88yqo7pxmzu491ip44x890r4dcpbzb8c36hx9apssm0vufbd8gi0y0qxgkpcdxodlf05rh9d6uwihj3zesukt3d90990xecnwdzs3cvbzt0n414o2950dmjapghjsh5v3e12zi1550i4r8agu9taw8c7ovnl266xbtu7jrq6xta34frseieajul6h486rs8f5jzs2aioo2je9f70xt3ek13vu9f7zg115wou43qy7fitd61s61mpds6vxiq1wa60a0ciu6gri3pj8phlcawmhy15bt3ezcui2vhcvdzl6k5y0yord3cs2oby8akcgqu3tukcw0typydrd7gkilsiw80g4rdpf515yew0dgb32ore14fwfb9ek539bolggo8r79v91vp2igwzjpndx14xugph6x25fa8pil5c9sombwa5qfhwvio5qaje0osjzhrpoobpdc6j7yo775qciba9ja0nb8cm45n3e3ca2uea7ww79acpl4lpi843nr3jp9gqtc33krt6f7ew4lp1wly20jo0hbo03sghn6urzsw67zhd1sxdqfopz3bmyhz1i0e5vl3ztwnnhoes70ws13zqn5oxyjuv3d4uc1mdt2xmj67hz5vxiqlcgbm4byhhyz8rvhygxwg8ocuuvy1ayhgohrumzl94zp0dv2mb5omtdrg69emq419h9zp1jhizm600nvaa8f3rn0hm9h6jsxecgy4tk8331jxwm91at5d7qsk9nrj8vwy9wblfefem6jjt7mm4aq51uii01dtynl90l7j0utsoo6ckngjixr3wqmdat109up71yyq',
                redirect: 'yp9yvwd1dp6zxedr41oik7rn78h73rhlqfib7dh07wbevku3h9l04hc4m5skq5u9nrrco2iqdgkm900ovw5o08zxrqx03zy4f2xnat697zkusm1akhnl4wgm9f84376hx8ufoyb1qrjm9id016a16v8jgtq3gvyqgu84vcerkvkb7r4s5m4hnuxgq4ffo76ze1p7p506y4svdltgf11s489yql8fdwfjopv6mptrp2rc3nfnrjdmemwuaewtv6p1rfy6ip7dcj3xe1abbzoh1i67zbx5adgsb5cu4usnolm9xf7n8xnuugt9zgiixfvcuup0e64bbj4cd2qssc5rzraj9prfbsfkhgeepvxnjyvx3vhngyeioy5rwqq1rtorbanrdtnlfc6shk3rsldcizpzuow00qioccah9f3y5rr4g4u1lqmsshwslbm58od4c6o5crlbkiy45az2mxx5ptvua8d9l7e05b44opmvq214hzibi3ua5oa6dbs8mco9qlojpqcravu6ev7xr3weqi7e5ew1164aguwty4qi7czfaywec8kfh38ar2c8mq29tikh1n13emzqx41orzun34pm1vzpd65qrxvi4yiqjahj99hv2dajz2prby3oa25vxhz8u56xix0z55lc4w9axycq4gar1724kgohw0qxd0mmvoskfjh77p3uww6k5bv5jxe5hs09nq59lqalv3hk09fpsofx0kybogxh8xovv1hck1m8v2oy4521bajxql8fi33v6pu4f2v6v5kfizksqbhkj5cghusxyfmjwpu7730n5pf3b2kxy1oihrx8da6s2d9zbfzy1xxv3sfn5w1da0tv8v3bhliwv24ppptrksh2pcp6lal0tl2nhh3j41vq8gf87ha7vxa0sbf4u9y3d1q1hrz6ijjbu33nxbh1nbjur4shdgy7kjdv906pszyfih6t50oorou24tuse5ymds7al1y2mr1ql2s21fllyi8np0kzqqs7b5cuo9lt18b25qpfp1uotrxur8xenzem4pbpl2anapth6b3jk54hg01isrttoaplgnvcy7pd840pe5pitp1s6xcfzw74lnem5fgz302b8zmurd9i6hvgmtwu1y68mfeawi35n7qtlieklmo3urq81nrqfsakdwwyuu80cacjerp1d2i5lxg3navs9phb5mcdwtivu746rvk2nh0t76exwcp02r1c6r9jcqmlcxainxjwuri9xlse0ajofk7tk4c8ty5lgwzshmd8o3wb797vces8b055zst3lgekql0uscf3ywckd4clrxe7pwxx0ow37b94i3hg9jzkqywcyjs4dis4pk3n0r6fd8kpr0o8479ci8yn9oc5zwk6s5x707zl3n9127z2emp3miteq754i9mjatk2cm8npxgn40i9kq7jxwluqgvwkfmajybs9njngpolad8rfd4eia1fbvdo80pjmn6vdkg3wxxca4blzo2wstcefaqh2wdyi2qt0l3d1svjv7do71645iz9gsd3sdlev26cgkiekiiglv6i8u6s4z2tvu8dbh0ytuzmgjmlzcry7bdbyndfoh77t1sfg4ywl2vnwkndie4aj3ndhkxvd3s2i7vkfnq766a0kmbsgak7ln87xxt6bvjvgxbpmnuq7mgossk1itjnsrk33ql52tetgz4pi9u0jvu5bdwgr4imwp40kae1cr8wv71w8gtd7so4b8c25u05p0wr5z5f1gy9dye3ksjmxcn1yh42fhmdpxxc7gzd1cqgop66f8npq0rpkgfn9e1k9fa15i7sfgry9n1h402nhp2r6imglfb4xl3ecfl7p48dpceriqh1kt6r3d8n4xpcyjfqznmzmlodi1uhxgranz4zfer57581skp3yjfz5a1ex4qpx5x9mihopozvftvbtfbit15t1adpvor2aks896p9as9glarl4ryrontr4b1syuf737knh0vnx0896g73es6xfu7ehgll151mfeq92jrkeindd1smfcfsksdj',
                expiredAccessToken: 2743417562,
                expiredRefreshToken: -9,
                isActive: true,
                isMaster: true,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: 'a40kw2jcwwa4e9p0oeynl9jew5czvkibfmzc9fymbdoxiai4mb2a3r0qctkrzb0phwf3n910do3q6tjn49wb0bzogy9nkiblgw485x67lguv3lughml8fcgqtdvs7sw8r391bd12tsu7drregdce73dwptt6pfth1yhjrcxx6jc0w4cgzplhebwnry9bphuhvzuxxdtx4ze0dgifgqm0uu1m5em38irjq4dfivdd22khenl3cn4bf0fkadh194q',
                secret: 'l8kl7jilcso42q1n6x7kpog1q4pss4z3b2kjnmvn35m24zr9grblrt8iqmqah6zb1gj1m4s7i46hy4z24ziqw12g5l',
                authUrl: 'ab1lee8muxm1k339c96fnet2ml1sp2703y9l81garsatclf4nref5ouk7w5z6d8ms4e51ehid3ocx3yd0ulpxs6zmr5wecvv51kz7zcqy6fk5oubrkqql1v3ug3mo3a8zjsipile1g4s7hm9b9rv66o3slklzeveda61usf233own95zljc4am1w457vu3fyy3k41pp3bm1elpjew9ybzi7pn7wy570b49v0pelbxt8b70g2m06123knin4liqkhcpfmnzgr8oyq58tv58himc34m9k4lmmsdzz8qmfbsequensz4g3mbyjst1kfcjocp2jzh8cdmm49mbrmzvv7pguae6m2p4z5vsoo1ceqr891ovfr5q8gxbwmjbx5c3aqlqtydvmqh1z6f28wz8h2u8pk0gzi96k1egraj806m520pcrc7277gorfhq3bhd0t8hfb9ld7ccs694hdqh1g31uhypi2zi35ntl5s8zg1sxkqsfgf51e00vbmynszriwrkle7eow6azzfbjqidyj69p6glnylxcu3sidqh36h370tn8xq8pqit0hai3y60iuzer2fwnsrsc3vanwxom3r52pxq4vzerzl02a75wh1vmuyodgad5bjeby5kmhlybm0x9ss82bpb89elbu7cenq1of2xkvt5zw4xm5aa0ilrrd5ymj0ahuo66g6ifrjpdmz096mlkil4b3ecq49bdieflbanan7dgv2w5p5t52e63qwtz78p8yknkbvu65rn2cn1e4diq8hyhsoj7owmmf4budarl611ddtm4nsrthe9khtsrf497zzp08yck3ajzd2dwrtb6xk7zbvsbgdpuejr4cv0c95xpnt4j50tt7j56n44zrx3f1wl976hfx60umgtmrg3469gtmg95xq760z57hpl2wvdiujmktoibgx9gbdee3f7ilhkucseiwsankzddf8ly9011g44cyqpapqram0y84at3pzltoeq6i40yqt0iz0z4ni6yqbpbdue3xgwkamhofdouj3y7h26o0u1nusjyd5cd2d3lzime51bbqxf63eqs5tk0xtmkwv9uflmb02fd7nv1s1fbdtavvtg0zwnexdadhykdn0g8vfk8oibgabzmszx22twaw6thdrezu1othj9wkwfqe4egsb55xy4k2hduw9zgzce33qf2vlihd2kgyyskud6w8nflwpy8nbkw12zbzujc6q0d4fgvtd5cohgszquopm23z48i76qjdh1p1s2r2f25w4w0wzlrivjlq86p4h0sti7xedsor96opw0m8qrsy5h531xr5fhg0dzy3dptzk10mzyg19jc8dvwlm6dseedpb9hbvdzoqds70mixsbugcegmn96f2k7demph32drw09v38tfmiew66f73f6w3mttnbuvmqt3dseni0ckpzouli7evfs32eazt1f2play6rgx4c50ijn3y0q2rbx15xrzrgeaw127jv41ph3mu2fvqtkhei4g0tydvstv6llkmmlkzzblhiu41zumsoqr3xopayo1mbiy59p928mwo11v3u9ene7ihnzb8cqd9o3vbsgnemm4s6gdv92ha8mtn6zwqiodnfamexyoidyrw8g2bh61jush3powfhaqunqp7drw1z0ntc1ny4a2zadekvgqw00o99rbwv0vyz0ytfg5j2d8gkcq2gmchw81yv14743w2x0iv7jkdvnl18ljkfftw5f5tk088qd4eogmd4uxx9yv2ejff47k0r02nf7jxnp45krurkt6pjrze0bzjas75zosbxz7lm2f8w93oqipme0zynmsxf1mvenj0isay3da9gabu3jtv0nu0l2k4po5mlw2dx23qa69bd8m67bxoh5grvk9l227wafdp2r4zwtl8j6bbicv1j5dm1xfmnnzye77w0f6bgfb4zd0rx78ihnq91x0a7hrmek9lxzwfzac3b3lkjy01vrnuk4dehvvwkdbt29uik1n5prg3yfw09a399avb8g3u5ke4avmf0kegkku',
                redirect: 'cdzugjpopz5og17cezq5cax6ehkkwdaghq3q6vvwq6b64tch4tajxq0fk45ayg4vx7gbfzzwz3d6mubdwuqe3zpuxs7qctfn6lpu45hxxel9qp3bv12zg1mfto27bxjobknwvldy3w4w0mkas6injoxlgwb7rifqq4vwiffg9k8ok7a4k1mrsencal7n6t3rbjqlabt9imotlap4b1x6223jxvhsqrdjai1hqj69coh2zpy9te89ch9qbkjaip5ksxemeohr0jzqx8sm44v7mlht1qew2rmmfcjxjeyauppdcff6t1o8fk8dxlvlcuck2c6yzmgcogw3e7cuubbigh4pkzogdxgd5d0ka03gen5hd1dgo3w94ny7185ej80bve7ezvx3v54metmjj3fzevdo48lc1gozuuvyq10p3gbl09goi5sipovvem1aorkb61bfjn9p0jgbaw3sqoa9okvkhw4f2pprbrqjypjqajpvihdk1ozan9zduasg4bcpndojef0e3gts6lqi41vifu7y5bc2htxzw2sz6t3u2ys4h4g6gvscxuzr6o94d7pbyjnt19i65as63ktxeqy8sp365hj9zm28st4mwa8kqeo760be3pf8wan5mzxhoigdy4jwm0fweaxjzgnvkeetolr13dohlymxw9ppbly4jovkzulxqely2mvgpgpf4hx9ovqir8mfdtvlvfc5cvst7egi58r5q193aec2tsjp8utbzt615ioypk3t12s0d1ujiqglvft9dvhplb1f6ulvzwir5pnvmkpxgd7jhxotwagohvpc0ypq7b90q7wnt6r3qu6cta97bpmea6bdteuqsdtz3pgjyscbg5tq3tj4ol4rpbm4g2rgwlbk81a0s10hpm7t09g35jrkarzz60jw76aevsuevovdczqfujlcehr3a44iov40ka5fs1omoiry03z378jqzd72nag5ej2atwhkgdv1uv9jl8e91rch1isszf9gt3e2urlmf3u9doquumu5x7l9oahdpsrodxu6oovj9m1yt3kqcg18bwnx5n99bohwk93jm535fhj4bwrrds41875dh1zo5805fjhhe3htauv6qe0e4605d6ds9pd8tbszarf0urm4a3pomelsht0azzh4xgjhjpwz5ejiibuhukw50mcv6h5dlp1k5ipiewl56a2nm03lfj7pfsj88q4mndd0j38suy109i03dztu4r7iaa1v26jy5q8wu6rdj7ko75pbd46zfs5yzfxzumo63jkuepwbgja477ckwzwius3ix8ezeslmq61t1x3ypuztmya5cqwhg5opposfdg767fqfev0a7hzra7tcdfa8rk1qvv5fgxtnvxc7e6v4xq7f6uyh6p1nz5oxrensva3u8uunu0b4a54h1qgaxhjvmroscfo91hhy7w9jmkegks7c4jpjknns573gqtfixsqdug87jous3mb8jrzieusq4zudow845bfswqrxfd4j4c6v81a2mbf8dbexu1r5i42iezaic041z4wf0t9w78rqrsk9m9id070eef6wzot80f00e7kd0v8ojh377afk6mlf3tsn0wf9mmlodtwnqkvgea7m4sraw5dmmeq41kj1a64oqya8iki79ton7jny2se8gtqlgxx6aqxmzceq84m1e1z3dzrjnh9esie0la1dcfic8r28v9p0r56utf975eg7cbpmssf0hx10sr66y2w1bc33ppn3a0pbggx7714706unhm8d9a48u1nph54phmeo300xkoqnooi99r3m6ulxzwfwinn14i9hw1rjhfvvovo3zxyb9u23742obubfo53g3zmpz1lhocr7ccfajlpc6epamr7dbwbgvsnw9j0mzbkuamldccmvno3hnd7mg7wqu3vgkbyfb9odccrdzarrfutbhip01rt1kp5if3t4y2kgjvcq19mwzy2cdl1yp47civ5dkldnopnnz5pskug3n11tiupr41v6yjm2jpdlw1q3bplni8z50earorc3',
                expiredAccessToken: 1424126707,
                expiredRefreshToken: 8662028296,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'PASSWORD',
                name: '3sxmb0fima3zbsiq5hlj8q9gd6mi2e2egohqatxftskm4rgn16d8xg0kzgt8pfygfz5nimggwtqf4vb6w42lgx1i7n0vyg1vlsqnwdycoi1vssk7ckjg2yd5u10j4aqvib06idmpjb491ky09da7a33qdfsiijne7lvv0hxn9kspfmzmczrmz0onwas56lvz75ytfj74hl0s3gz5wipzugj4lh8fwyt01bg5x9c8dzka4ks3qibbnzqohfnibw1',
                secret: 'i5zpq1gcuc4zv0vgxlu33chyi0omlpdu69d2j16yzfzkd0lflpn0c7vmvfkwejurv11agp0kyp22qxq4oim86nrkae',
                authUrl: '38m3ia3v2uvhpfo6j7lrplgboamr4yb3fgqysfaupaww0r2db7xbvvsw3o1sjtj084j5git63z1dl152222t91rzza2bq2arquo5iz9y945idrznlbpkne2mov0tadeys38o1f1t022xojqh39cvgwdokvzodac1h293ty6u9f7jwrxort281wflaoytyjp6cebpw569hh3t9won4ykn23ykmq1lkh1lp6xe93mkozpa46ukmihe79qep0kzfp2c10dyyf4pxkbw5eug58ebxldwdc8529jqxgqtleym83ajqolh3xwpnt13nb39onw34pf9br391eu1gt9g43iljofduxs1izpaf3xt1w3zwmvrj4k3neu1gf4o4mwrij94mtz7ejr4pdvxisobfsp44ue6yw3outzio1lzjqh7rg1x11zrwih7essg2jrry26rmt8w2ktn61bsxq07r5gbc4eu557f4b0ixnth85wqlesuwcuekympo3di66y1kylh3t2k9epcyfauxnour52so039u2j8wzchmfzhardzy2kbkff9oxxdr9s6kgh202p56jqm2tyq23xf8s29do80bknoy25agookpa768gx8mzanktirumvm6glhlvww4irpya4g0pr4zwdswbhkj6671xovp7a28lx4uynpe0cmsz9aede51d73u0kf1qcxgk7cjspv428udx5p3u7f0hjo3msz79psqw1bhgwk1hdr2xm0kwqhmtgrm8xcymo21vx1sj3x64frq51l0fnm2ye9ukctn1g6dm64hexkapup5ht6zubki52gq64q50298rnzygwpdo0adb5u7isvi8pnxelln8g8jj9j14g598hxftvw0lgb4zascezteup03vqjcq4w2w6vzttns849xu56nayhpdjmxlpxarfesn94dw74jvuhqxxz3j7kuq3xz23c2nu8orgmqrymap9i2vafdof1e3v4cyfqeazy3auv213k21p4d2cjdy5unh4exxhv2zf7g57tvudzgyqo67nc48pl3293q37zdmpo7a5q708lqbkudp3jj2dc2l7vmvs889mm1lt8wuvan01x3ldpofiqh6k1qw1qx721q41tio0vmucr6y58y6l8sf7bhak6eh5o1bndk8xk6shi8edm58f2py5ha6svqmv426zbtc6su2ema1auyebu2yg7q3dy8y8cyzqaumrsq7wxfm0nbun5jvx58waqaj0fjhug83nro04yrrt7pp6bcosb7e5a00fzaii7di1qi6b6fp2qxkyimve71ewbr60lkzv16dkutgs66hmzloby80nwibeh67akqldg3dcjbrxfecpp2snz7uuk81eyh0znlrzztp7mrw4bbrkrv6p1mvwirm4qne7laeei5lt7w1wqlof0zcuibknlao5lvcfqmfuhr0k0nn4lwbbxj4yagt0xscuyyu8o5yqeu5mg0soos0h9kit64f3dlzgph708qtlcq045an1qy2wjs4ijh1znv80mv2ciufhyzs4hxj4ns4qvcs4t6frzae5pnmurekwj8k4zs3whdy274ik6uwjqqzl27sxjfak0ukntakla3yavru6imd7uwz4rp17pr114br3iv8lsow4g563c2rlor99aze9941ecudko64e93hudl1040i6lrn8h5x8g48kz6xj2ivji8y46syt0owthfvbz7ceic7nsxz3vugkcmc8qzgd50v49k414e5zzgi50vacposoof8hpt663vnj2r3s838t0uo0wflefdk0kctzifkqquf5tnujfcqu26snrb3n4pkd0po4zh2hxvwuqjqzbxi3xg7htmwz7z5z41rifyl159vywz5k8ml8z2pzllyviza4tpjpn2q4hi3h9zy3q9mww3y5pttvo4v4talr904q7vit2d8y51ommu7lw6iaihikgo9cbwnuiil5r1mkgfjvpdaf1a88falupi9jlddyyqeayu0rockb6r1myq5y326gf17ryrnhkn4gl5ab8',
                redirect: '0v0o1hrycjefecuo22ssg0xs1ym7kidt5wblmtgpx4s86mj9u8sqtnxcszkarnerv69gidgsd55uu5kzn6z7ou1ierbl3f1ye31cmsjmcw6p8c4gey4issltkadz0c3rhzjs7o51ybovd2q26cibv475rmbhr28fpycoqr3iebi7511yygbktljksqctprbtsqtubfj99hw3nwpa8qsj9yzrpll6m45ku78uxf580hfbaukxkvvuleu3sa5eamx324w6d5pypzttrxl84xkqyr9eztotuysbvg7alwyhfmtcoucc2yiip4hk221w9j5vr4kz0w499c95ddn2fpfdmyzy6isgs8mfowqjufc03t3kvbfw618598ixlpdzfnu9cffbte6vtrlygrl0csdbvnvhxpcm8g8jayxwcqn1rsb8tavgk7ld2qhxe4kujqmtemuhplglcvp1fock0wux9ztifyloh7bzm6jwvkxcmma3ldrhckw50xvu4nye4yrj76tc3olcsp2y7egoe70t1g4p4g0gtrrip4gj5yt1yrt3rrfeymwuvdojd9blntxdz2bk82hou9p8xc6iiiwu8hqtu7d97b9zad32l41ic3hs2w48q0oq3coofilzagrfin00z2eolltsaai8w9hqcwhe4muv14g5g8a760oy5db3nfadb53ybhbzvpujdvt7aapshs4nod5vc9xl8l3qib6hj9xggd3xbt8agquclau3cnavgsvuopph5e95yh3b1jccoqaovpgexsi5wq8zybbwpsi602ricugtwretcc1hsuanjyzs9j75okvklg7uqvrrsg8i34bnz9hscx7lcrcxmwj0hydn0ut1ohibljpnqlqtayrihs90dn4dqe9r7462iwwqp9od2sdow0ws9rk1u60rvtzm0b0wcthi46e0g3qvagl3ty59ky6fe30ngmpvaypbbqi0p0akec4el42rrhgcadn8qzvm22f13anynlehnv1ctqufd6m4fzspgb3osg4bscci055t3p17vuttskv3irvzwmnyoof5oih5putwzhdsgjys1xhlixpodttq6t02hbtib8qolhjy1bv7h0aatxaopktjntmid96opdg8y6kegtyztj5tc0dzrw1n8481dwxrkzw7zoxq739dxjbp0erdrv6wuzzsqdn4upp7xlcbt3ta7zvqdgmjcvldxshcbu1mbdw93ht8885y5pygfqndp8bjashjkrpu37kfvp50ulozid1hc81yxpydfbq88cfkvplk8uzqovvgu5it730jjo8vy7sbcsuqa355qr2nfzl3e4g4c9s2cw02ohzdq38wisi89pqwfrgftiwoi20eo2v8bsnjib399tzmqq3kfsn89wpedag1phw18z3zp317lmg3e6idzasescdito6vuy9hlqe59g3kmj870u2a6x56rtlb3xsp1umujmepp7d57spjxdskskyi3b4ku6cq84sqf1l8k4t1ngmuiii7ekasip698o9yutlk0hrsist0mr9qzs73lqcfyuickxzoz8plakdbwirr6b79vfnu4hvoozmqclkxozw4uewekr2zwxyxcat5ucrjjqd8mqct9p588o05xzaq05rgrr1ol19xqa6r47rw23benhedsdw1t0s3sj64o5slzid1um6n3u1pvxkc5l1wuy6oa5yg6ujuncvgrevd1rwyrw7b203e9p3m4fv5deitzpz8okwo00y74pcv70yxv8uzvdzm909e3s40xifmjsw5sloibvp6pv6ehh2unbfyzg3ojtijldn1q7ab6uwe94ioj3sy3taa0jrap3zu6viszbtk2fpey2p5xylhap6913is7wqaz435dzuh0ucivdgrzojc6ujkzizq0ixic1hxqu5jtlpubdw1nmqyx8el0n6ia6vdn3p6bz4ja9g1dmdxrd9ztxz6e0o85h4g6s8tjbz0m3wi9sb5dweiqtqotic8bue7z7jjzo6pmrg51znlgdvnzn8end5efy9t',
                expiredAccessToken: 3887925222,
                expiredRefreshToken: 8119542171,
                isActive: false,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    test(`/REST:POST / - Got 400 Conflict, GrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () =>
    {
        return request(app.getHttpServer())
            .post('//')
            .set('Accept', 'application/json')
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'XXXX',
                name: 'zre37x9ae6tcfvaxag25nvpjei0o27fnrgdqq3luh6zh7we79rzdvwq7kuj1lfd0aknsdespplazix4zpzltaz8x5ku37uxgdy2510e6eh7rm05jvvk234wpjrarb2nomagewvypo9y8ags9ofvinpviu35ur4k3xahdtxjrenyd5f9uhtyd24mmm3fr2tz0p5ugvi2s0tglh5qmvawn3415873y3eg9pgctsdd1teye7cnzjmwb9h0vvle61pd',
                secret: '107o3zwqx1n9dm0no63rp85a36we0gy8jk2bvflew5isghviltf5h4ofj7kxt7mpnz9fqq9jmaplau18ryb8f7qmnd',
                authUrl: 'sopzt63cf7rx9d77ge41k6kaous20l0nhdepxp4cgl031zc99yrdlc5wsmbup1us6gzlg9qcr7bcviseawk5dq0a1t8l9xkhg2qjkwz6b5jdoueqafv4ox5h2y24ve076coyrrw6o06mkljbvurx68jihdereih67b1brz7hokxhkke10pqt7q9d6p03s8ev0691vohf2xlb7e7hh28fs15v6ulpxldwcm5cowzga5fadagr6ltqkp7jjnbo5ynck4vmfzxkq43v0o8qtoawerhyia5hv2agvgmmnjxbt1qsvajaq8vlx4bou53wgk1nx1t68ajoz1v3hymz31mjw4hix2ghw6mg4eopomex1fs6a6jz7kaghazg353pxajhfo6roccp2grbehn3bv7auzcbgr4vqjo2b3b9rtu3of1u2l7tchit578l4pnbp01887qrlh1ceck2432mg0qj53oar33qcr73pkxxotgdisisptn715z6hen73e9ufrd0xfi1g3eplczsrifhifovy5a2tkzjn492rhzdvts7ozgf1uj00zh5908chhw1f3asyee6699l77xubiqrgzzd8w35nzbkcia9qwmrnhbivdske3302jcfkiwgg5ypkmi6bmbxju2lhk101jki6igsai11b5i283pudhxe1czobitop7o7vqn2kz86srajrgadwrewv3gemve4vgc6a3axoheys2vucc13invfsww3iewc4oe5h52uk1ast7e1ahqzgf2wrre57nvechzg2uer5fe9id2plvnymcce2h893w43j5r88cbxqfttxc3jwvdj3lf4dghhvertnr47ooaznatdhiwoxgys5rcebmu7ua0defr5ksul0v14fafei1v1xv32mvbn8fawu01le25b909xrqfg9tx91c6r5avv4rzv0j3syvamqc0fgz03k9vxi6kfnqknk0a0mm3taugqrlk6lmcbz5lq1x31asxaiyqanjsa461izj0udefi2dzy1m9knk3odqrv670tafizyjtdkfj9al616t0k889mtd4pu0mo86v8fryjmjg6qvdnn1lcr7hs4r3fsxfops6atc4rbpcvipwboys1f22r9vruunftdw36za64dgf7yoj20wgsw68w7vh6ushahwcyaxxdcxf2nbk6cb8p96f5ztelsqu2h8edyz5nia3odoa96g2m9uzdslxjq52rbatm0r2ojv8nqail299v8w4bwgex91onkyieg2e2k5s986ohwmlzw99ux1eh9j2dlclyekpey7uxw65r1u0a0q9562vlsp54wpo6pda7piau4owqcu3tjhypm1hax30r4vwglx800xar64tzrub40p79m1psboy5t7g08ypvw3ukf3a3g9iy4kee6qtx8l6mb7hf7bf0gk316me76qgfk29974tp2rndebd4wlbyazibj2ohamcmwge6jpu1gb036hg7emllres9uq6d375grst825l8t9emsu1mlij26d7i68j7r5vzszxq4ze2hiio2conlydf6djz4ydi6rdh9kmpm8lzshh3aqfok9tugacml2x8evc0gcyd42nu5qawflqose0yeg1gdgxunl1n2brx4pf2dlm1hfpta7yv54pzyock3edu2bk5mwy983j6dumgutbgij75bsgdf700kdkhv6jqx3elfvo5z4dddvgw4pdzvs0z2w7c9zm522xjdpinc7hj2tkeqo28qmtun0vft92v5jfjnpzmpa9ccqwvmad5r2066w2wbjn0afl09sfa72kes7ufyruvoftcydau2zxx730hwfdgt4go3hu53j1pgctt4w023ep1xuzuiohj6ggzk4btq1g6hrw2z610kwzw6x1p92ufybiqtorf2v5hhps8nc17i1gspddttzlthow3dhy0u964wis9y6n75l1h94inpkegrpw8vi9wfuqmdp72mo9d7fqrcn0404plp5gffbuibqsex8fdqoxnio78ix5ouaw4wvhzsmcmfs4n',
                redirect: 'tyh4qosidn8aqb42nbgmhws37kwqrq3wp2ngr45pargtrmrmcnrgv89l0gdz2z4oktl4ye19ixwoqav99k4bzq7pl59vvzw5t5u9kq11eii6rmsbyt31y0hiopnpvx5rn5z580alm7jvej9is9wg484ma956sg51zlc99jq5mccm5njqoyy0i3hpjfj90b9x479xxngf45t40rxalh76k7c3mmxbmg0n4x3qamnjtuq5mb6bll67r7kkprj8hlca4y50njoxc6xconn3yximpim02mys2hhslhlke205ywrlsn9fqvckt01c4h2yrgkc0jd14kybyaouvzi2itvcig7w9wunobnv16z030cv509ew3ru6mznihhwx56k67f9gv97qfp3013go45gci0egjl3mpuyzbo6yrp66zhda9goh2vla6q5s3bkwuhtj1r9792g5o0906176bcs2922lqk47pk5mojkoi8l51lhodqvay493o7te1euh9n7kb6t4mgzo0t641y65fwithqh4yl4meutex1y9w9fsyrt8v80lgovfpkij8ojm3yc05xbl5bly54vw9fn6o8m05r1fo7n1469u5spgfh4hr8kac8pn8eb1s5lcxyqpyvlxq4afydh2hst4h3wmg2kfrx995t1jgqqw9zkxlpcu6jhasc6uodg17go87g9u15y63p7btpmqro5q6lrh6pbzrwz1r1z5job5jgfgehpixi6d2y7rvygafn2mpjsqie1lgjgd0nwt814x0gzju2gzrogfwxh0gq1un9edl7uamy99rze5mnghztdrnzglsug0e8trxz3gnxta8nnu2ohj970fnx6nltab6a38pqnxbi0bolnc9wr1e6c7b783vhtmx10c4h69ewjcjs7m8z5h7kz5h6otuuvk38lwxivzycbbjcfgoupiu6bxgt9xnda7myn089lcfnxe4e9m87ixp51r3sao9jn67fbnkt5d6sy1fnsgmg4f5wyq3e3mocisr28j0xlietsyyob4gkskqgnbnec1vtwi8fyy73ifs1h967k5df1a5xd1kmve1lglig44w8t0sd57zzjqpkupi43izkr57ypgno4ololg1uqmrm8ysbdxmiyp77g5ewc7j49aggbygsz9tqtx6yg7at659b7u5exz3y5b9gzde8c1njmk5t20pdhx0vfqdej865vjy08vuobi31zs578cfq8ae4qcn2jlhw1go2pwywhjqdhnygn0gfjmpdk5g8f4whljpxfpbh0kn59d869b38wnpqdpugs6ok4kk5lengq3407akt3bga9vta4ozyd48axc13nc18xr7d64a1gzkc89sw29r349xrfzrqeog89voqrgwstsdnlk8gaoni10rttvn4onr27k7sxno3ndvjwmpy7gzhzf0ss9edznsosby2p48a3r724oqarpawr9l6b9n5iq3xkczz1ykxkf1rjv7od85hho8ofr8xz8qnlrbhhzrx3oei45d326nmkuj8fblu0hnmnlz4hzumbwvev9mmxabrt2gdm0z4q6uoeivns63jlrybkylv02uhp5ulywf2kwteblflk9k95npemnsoey02kf2ngt8kwrozm6dzu00d04mhz1laifako6p7agyti96b1s58e0joodeqnc392fo3d61slj880xdyizew113ot5bempaltaof10voggsxzefpekl7x8tw0dphizmjzfbx1qa1y3iw1m9tvutpylsox5palqj6n2fwi7v6nlb4d5s77op6ipw60gvxn0ti4mf53twuir1qu44tvpgjkm6x20sv782h698gqhbyxafzg4vriorcs0j24v2rofoj4pwormqibm7xhz7m474g9l5enwsuueqhnr4o6wz7rzf8r1kzzsnhxbhl7n749xgrq11ark43hhhesuwxxpozeyibvreflm0qwypzziq2qd7fzb2zb2ipab9pp6ifoaq0nnfnw2mu2o00jb0038o4ta3hxvpe39vm02eredse6',
                expiredAccessToken: 8272468929,
                expiredRefreshToken: 1347385821,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for GrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });

    test(`/REST:POST o-auth/client`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'AUTHORIZATION_CODE',
                name: '0y7b9wwvq3k9yfd3q1diporo38xfu59v0sqiy03ic16hhjhf1w7iqmmwnltwp1tohsb8cizrd9h2cqkou4sdfmd40xkvp3t4ff42tph8djq681xmlpu04ldkwbbsrtxltznnxx4osjlxtiyj1qqjw4kj1t34b1bxqdih7fay68i5j58dqimnc43mlsd8bjg2vkxq98exvzem15pswwkuny4gi6ebw52j4wscnj5q8ylbg1fo0xuecdh4j54hzkk',
                secret: 'tr96apyppmcvb9djcdtsyywlihwa6v567nwryylhd8n61mvcx7hmp86eoqqtpr37poyzt9yd1zu05kurug15vmaap5',
                authUrl: '1n02s8zzbovfxr7n00jkdwei08tgy5kvpxqzo7gnf5npft981yarxun1kgtjl0fap8pfhtei0smu9yzd76ztk0vmipwlcsmha5rit3a7k0ihlnews5j9ygl4br03ge3qqdtp0p9to5vpsfn3sa3vgu8d9dzr6vrb2s6mym4cab7t50s0snylwkime9zy7w8awbo5dvmnng8qvon1ee1g7ilat9i8fcdrs94zgqoyvw75fl66awkwemc3clfdkycos1o7ae9j24m8rcxwraryoinul4eeql3gs97ccnm975ws1jty8l25vtogfpf0yrushrmvjmqjaxpg753ga6zrfe18kgp00pj49yyi41scwi0z2nvf9e6c4e8q6s3ybjwat2uek4o33hpe5pz53ugya7p9s380ssizk0cdxhnk9t7qt7p5mzx25kiwe47npmw65vihzxsmk0fbpea7is3aw587swsmmshoc9t1pd168brex06pudwq6h2cpr1zwvm7a9hw4t6wizbr7ri6x1v1cx4yiq7fvxldrd51cyw9fczjydtrw2o8iihptjrhil9poeqiie6syq8gi8s2lxlaf5yq7hxo7n1rmosd33v56btyj6s13yzx31whj1jgw3u7ggm7ci7yvmpbgleakhc12xvr7c1mikrfiv9h6oqry6kvmq0o5yzz1bahea0rswfvgmhgootighw25vf9pfdslhh9tikmsdq0tyf85rrdok95j1pt0pdcy8qsy6ha9bxfyg2m7z3v2tkbr6d1s0nqn44au2mpbe8n5n10e7ddbafckcl8soykwvl72bfw7d9m2jnqdy6arz7mg4alebh1m9r700lnsl1vg1ui40g9h88p9uso11a3lvgt0xl6sf8z3y44e9hkg3kdt1mmxo1n8i5ymwouz20ucz0uedujhzgqywxqz446t2lvgtyqbw1kufyuj89gyozkwfzis0alf4c1pvp04tkduxjvsqhk1ectcdgxzo4312bek9nw3cbjh95mehh3wrvlvw4czmrpijnijdmd1c5k6h1s4w82dwzj0a5yeu9epnuw68l9aemrvf58ysuy9g1f4njv69s2bv0lb559i5w43u15xinvea3i6wzhtaqaor66ekc8gqgg3bech213fmnxc1z5v03rev7i6e2yad9cv2p0aoc7vhi0lnsbrrqaej2t19vaj4lj58s57dec30dew0720efr2ur21g3mo6mv0xg52a5hhkv2mav5q97h1bbbsas91mb5yquama77gom9fq31jne097mjjqrevm9reynciohytkkqr1vj2c8anoykb1bnwde79g9lm992gufgkkmd0gtf7tb5up45zq15r7bsdwt6qni8dxpqd1grvhu4hmvcwwgj6ctq6i0mxdkeb8ew24iev7e0babft9k8twlxiru20o2cqr3g01ex7epjji02a4chqh8gojmvmfxd3uzpoa4kfy409gcmk3pea5cprk0cp2ggz5gh87y8ne1apoqpey59d3ckr8rpzfgj7w1nabeqhu46fcvhjacp5lm6tz3ykhq65z3h0dkrsp6odvh6ivlohm8a269bn9xvun53e7zhi8ttevu2hdd82vq1cjt542qoh0yf0yoi7b039zp2uq1mbpsp2y1y0pkzr4ovdmvi9j0kv2wdq7cf349qpolqvo6bvbw8cw4gtpt4jby8p3kw9ww3josojgo4p23m4ffdjyqtc037j1bfte5r8uyse9p9fop6ovlgui56wreqrjpobyujhxvkbr2imbf3mhqekyjfw744tfx1tydlacsqdck07ixpg4m6ocptrjfqjh7vzz3pnur8k5ly96t9rujx0m1prj49ghutj0rqfi668p69mc6js6yr7ot23qtyugp32qs4zyz6oau3pdfqrv2zq4jfsly6c6n2q0sld6za00lgi4i5yq0twf5td6rxl4318qjkpam6z6mbd656wtib8fm4putave26hru4w6d5fdehlnpvri4z1k861bmsedb0',
                redirect: '2454cucc4db93z8n1k88v0yalvk1rhi6vuw1jrfjja2xuuo8ioxx51qxl89ip02pzm31asb6ctel0hrpolb8p39nm5tx14fsyd74ftgwv7nvylt1lvb5suo3dk1zjm2t4gwsgwbs66k326g4d6og18x5hwl2olkqk2ajcti9nqd1tw24vrhk7l52l8s2vdpiolufyaht1gnbukuasaeja1gn8oimx7gl7oo7toao1944gtsky78gg8pofvvx49ezrik3i8qxm33oxugnftmrxeek7sbniup1506mz4i66adcl30nhrcg97rxdiw3z7b37d8s8c0pxdmlri1p9e1dly4dj716pzpmip1jouc1q5mgk1tfcex7f2uls075qd3o9s09g06c2tyg3k4x50xvvha73art8l1new4du4bz8wj8nnc2l6f8fo296hgg6se54pczfw6nsl4g3s12rjcrlen9tz2icga29bvos3hejg7bg7fhvc09hmig038s8isli55x0onxtklg10rmpqv2rg2ewvjkp9m5n68t3igb5a7eotnfb2q3gi6335p8n3z5stuqgpy28uobw1nbxeyg0a01lgbs6u8xhec9n054hhghy6iakkfd6vfju02l8tbl6doysm66u5drbihbknaoi1482iy4fys3950w51b13e6v17sx9tge2sqnvt8nuxbb405k1qr8rjv8lfcefbtpxizwxvs9h99payxbi4jg37hjoim50rd69le0u7bn4z99m8v9n0wbh76lu74hi0gfmtydj8cui4vgcb6d69qyk4ix5r1s1buqcs2unu59l6vxkqb0vwkexd6cxktu5eza3353xouenj0zeiv4ec1papwzbtqrtqwwgqxjm9isik9htyauw0i8l6tfdba14md6c08rkp1jigtoqy0j6ml1gsjt5plixd7hl2horqv5noeg6ab2mhh3il29f5ko4v1hqt46au2akasmzwkztlpq1852zm3z29n2jenlmcm8ppbkxakcyv0foedvsk0ksdo6ymlr03s1iyj3idoqht9mxdrsxjnbept2qdxw9ojp24l7aqn9tum6rtjlkyzljlvoostbfvtojkawa69113wq45vcwpk2fahs14h5ekew7hhu5eqywvw9v3p3wsw8zarvzwxcccoe5j1qae1e01uoip1khx7mtyd7gy23n4bc2eskdbx4rphfcjm7jinjvnyc70ezt86juty7gnxqek60b61flszod3zby814ekcszx82wub5qx80ynx5pt7kj81i9kdhgem7h9qkbodqps5ne5ghy61ooyp7nhypuzp7lgcqn8cdu3yr2uze2912sz10mkr0q34l54gp4rs6dc8nm4iekprzt6bixxjj0tqwsgjivgkbjioen52388zillgjdxr1f05rz98954mowlxwrahuzuuxgublu813zfk8fh1je5y8okzzw7fnboiywsbl41lp2qfzfzm54semrxc2ludybcjwwa8up3y0eb6amo1ucwgndb57dc07qxotyfmw1wfk5a19mtl63xj168x3cwmpmw5utzwnb2jwzjs704ozu06zykgw3hzver4dk407td7clb1l03eopbp1jp6ywzuxsueozaa2bcdt1nexep4vxcr9vwbxerxfwhbnpduqtn6zbyaziib0nhlvbz3zcq3ge6u56cti0ei9o8sarr8mmv9bg1w95fv3c4aj176it8i9vkuzuflxguzhgt01zypg0ab73j3taxjhlwpdy3y8866k9emshe4aopspmy4958166rvpbponapvve8lnnz6xr37clr45dlzsf3x04neqcpjsn4f6c41aig6trzqecr0d8ab6gsxn0cxilym3xx2afdphz9fsuixtqodfm9uspg6csg03p279384rzfc2i8l50ld8lnwp0p4mmtvek931jfoeevru4jl6wrhdgcrbv4fvwu7mbuf0kklht02nvqfx7slkgj9pfrbqxbx8a76m9s3078ua8l82fkvs5ad2',
                expiredAccessToken: 7111196496,
                expiredRefreshToken: 9615669453,
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
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'b051d1e1-f96f-4f08-a4ad-648bd0e82b80'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ef8344be-bce1-468a-a6b7-1a31177cfcd7'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/ed5b36df-69c2-4406-b225-e2f4aca58224')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/ef8344be-bce1-468a-a6b7-1a31177cfcd7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ef8344be-bce1-468a-a6b7-1a31177cfcd7'));
    });

    test(`/REST:GET o-auth/clients`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ed3f5d43-8e4f-4834-bbea-c2ceec344b46',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'atij108kve6pgic0vs4yse22h7hxk2z3mcrn1p9t2y3jh6a5kkdezym1lvdy97mn8ecjggoxwujf97t20n042sea294ebrneo2tzzfuvex079amq95h8lk3132jby8vru73chbun2x6jglzq2nsn53tmkwhwrxktpcd5tq0ob9rdw5rb6rwgmxjdxasiy7qchwaz2oo1jn50lhngvgcheygxwulln1qcz18rm1o9xm5to4olz52cdmtmppqsl3x',
                secret: 'w2cj13wfu0fayth0l1emff5bfyw6e381mipp2kgxw0crgqtpcsfl8vpi6as9n1oyv8bkigjrsf9i8cy7tjlvfrbr26',
                authUrl: 'fkunujad52w4y8qwr7037xswfsvvytcetjy96rt7kdpbz7ve5grxmqc4xq3rp5d8mxq6hp1jckj6r6nzu4y3jsfpo5y2b2r68ucc2v4zwjomn3f0hxaed3ozm8evvakwyixfp1k5zfxomlxj8t9i2pbzs25yirtk995vnwm2zzwidx7ekhbl1qs4b5ez2ie3y6qsu7mzhs1slwiem2o9r2n2cupgmupcx5bwb213xvn86lanm7by1nxfadjn2cvf0rpqictgrqzptlikc9sim3wowzo3ucxlagfv7zo6avi8mqm9cpho2qjzpybltualoo0nb4fd1uwxe6327w0vr5p3qg7d2d3isjkn17xdyap5nwob1k9tagmi2owjiilpgapwr2zjq9k2w28j0qi5brf6r2tj22lh2wnc3td3kwh8y37ubb6u38yh6s7b0iznfxqjgfv8y38douznhat0ub9rnizfsnkdxe1wqidtbzbqdwejpr9spnwsz6bkdko2yw976vxvee9vgwswp08srloo9gx2v7xceoe7c2d326pg18md3gedr50sbuomupmnwtru5fe5gh65ebejm2drs4f4ikjdqk3dgpzeyt4232jz38eglbulm1h3779zvn11iv2of76lcs8trmom4emmr5s4ubow7yguhwpohkn0aiwj23j2d526b3u0mqy27aoid1inhhnxp7k8tscrrvs34fzlpcavf3ddxzhkbofimd8zh8dhvx0la9cidigh8zfkhzl6kpskat5b8npcyo6xheg046m5hjvdxerj8ctusdt89nziy9nh5j7hay0t8ahx6pscpnosxt4nvpcmyumoaxuuvxbvyyk3aab2v5eijc59jps39ae8alkum3wxwpb54unp8z56ah0wnxmk4rt1hlkxo9ycv5w0ebguex9uycjn1uzsbsiyupqt7dcicu5f49f758ezfje0lomxqrmn35uxzhy6f9w7iwdqfr8jxf728gpq59msclxe0uir5ugaagb6eeig1qht5vyg7loz2imyysj59j1ro385b5e49zi1298lf0z2xcac6rpncqzhqoug306vzezv0s1g41tmrj202qgo7acfd11hrj8cb85z04hh1qiqdwdopmqlouyulbypdvcwfohp8zq9oa5dx2hihwjlpoeccarb9o1834bdev9bdpluub21ghgkioj8zxzmrtrie1tdalf9bc137v1gjc6zx2eoblks5goxjbkhpva68lf978vl675b5cl6nlco2xcpvmzz01eigt2moadv6luy27rwww0wz7owusapf6820xbu20p7b46ooka9nytq5byt2zv1slwgv0asr9li4beyjw1ci81cukla8t2k8h2951lbcqj7dzj4y0xs84rzv4dyan72nhy9tmo1ji2zk9f8tz15kdwlvitdefckfg6m040gnei17jr2i8ehvdi5lje1gdt8hmhh7tzgvyhy8egzil3zen4i297k6eayhhd48h5ywpm0guinn628pzds0s3mfcleowap2257cxo4ioh7020mblsk3rk9tfujzuovordf31bsrp3pw0i2aa68qgwmxtua1s28x9t9fjmhqyo98fu964pxtwy7fapvbcwueb8tw0mamewsm8y8hlaawh7uxgioc4dnmvfn4yoby2tryfrw0at2ht4y9cdwindj4p1ge25sngj610c5asbexhv1t8juane0u2p5idbobk26eohfzmkmeuw4dtggrecofwcdju435upwqfczo2m10nvrt7hjfw5kqbiq9j6f7zgr0oni6aqyrt15htqn6d2eplmrqta7ywh61zcat3mbptlfthmkw8jyd49wbunjiergg6o3auui0tkvq98uqxdwelgvq9cguw1rdidiiqjvbb3snuc76k0fomxho4ic9fok39sr76rmkju53sis1eqqguyil22ugh175nprj0m58dqonn8a7ncv6sxs29ytseurc0ipc14gxis539hmfz1o4n1jq2bl4jb2dbgf',
                redirect: '6mjupw0piolo2ict45nlnmfuphfk373xxolhp73fbevl43y9c6rmv6t8ooicym55clpldgtkmq03p4baloyfczfm4fblmpgkwq4hlk97j15gwhtubgjg3h8kin3qio9wotobdvimixw2p0tttboc4pmr83bg95pfft22kwua00mxsjem8g3w37dnu8j0svf5j83qc7lgig5lt2u0m9pl6uc1k6atcrz1jo1hn6f3vepifmqpvl0exczedtabj4ngrrb51xrbj366upn2i0ghh1uqmwsdk3mly4jverj56527c7akaxbkriugn3szqbjiy72uhxntqz2u8g2a22ydzt1hbci507e3jr2tpf7tfpbsaakf3a3hi6lm0g84mmnxmpo7t9vbne6ymv0omdyxk0yxkj3332vt5uc1sxsfcfreknrmjqhfc0c2d221xvw90sacjd9wkzi8iezo8q3b4o3yvur5b2kllihsye6czp20aq941uzpl5fotcqeqdfkbfszhh29zewsoamwn32q6eyxoonvx96shmvdy05zmudttyydbwa2yzlquu1eetouh9tbfioddi2jgz8pjcld438rguqky1dlhl9f1a1h4u8zezei33vlikpyjz1jv9vuqlxy5s3itn0ahyr4bbss7j8vnv4ui0g9hvg7vnqy9czqoscyupamc5id4lgk3r4rho4dgs9uy9a6c0wyh7gluokl07x85cbi0k9o4b262zg9o4wiumd2v48nvny1d1k8w3u9ynccgqs87tigtiq9etpmgeyxmvdvozz0xmzz5r6nxghkzpd1l22wzn1u4rffo99d92mrt6jl5857kj4of323lnhf3vhp2cw69vsaigxvy90mfiv79q3pi6g94zcu9xlrxjx7ik7kxahnwxjy2loz4uw7donh3vyart7codwbnjsmvg7pa4gqu0zb0ozrzfr0cqjmkg008swjqmyih8fqzca535nb4wsthz2b1cld3g1t1g5jdcwh2ew8vwby588h9f0oze1y13iw1ukfzz7kk7yqs4df4stsblfee8ywl15ouvldgva3bihvubbemwcpak5bw260iohmmb2jht1sdbbzyxp5bjos5ax9hqvu73cpjhd003s36w38y99xysjq28008jgy9ug09jifjfkzeqtkyi96gzavz65owvc8qgm6me6t92vy068442oje3lee2y6kdcfn51hajtznvohpr5da3kdwbwyi4tbjdtkh3vrysmzpmfrdobizgz4bwmwb8gcfgj74p4uaer0b91pjd7nn0u2tg2c99qus7rwmyfpga150upuwgh27a6g6xz9y3wr0n0tl733ew4ph9hxqkdzpupud78wu2kfjbgpadp9e5afzzdzn9l75v8asfi6uaexpzkzafwkfokj1hh9b01smkzqwsvd30f6rmjpjrd1n0idh33xz50wdk2rm08jpayomeb8r68jt9hf5b8z026ltjgsstjyzbr2efk8khbz7mf5n37qv65hssbp7t351atx8bnnmeejx6f0sc6ngil2yjki5oj4gkif5kcl52oigzxhigvfdey9febaqbqsnerljgdnfg1trkvc21j3pn4eyak44p6zvdcacrqgi22zon9it9raw3na8arg4ebxbxf1dczrk7f83rvcv5b9r4xxl87b6f1d50swsrlhow4bpqezimp7xgeewdgqdruw4yb3ixf58aitgofiajrgp3oa4oi9ri9abpzedc2xe95emdv5zbu8g4daigbht587g640hioxnkg9dxkj4evfo2h2kep7erb5iothvh0z08hlz31kxvhbbi55tzkpxp1no6iuahlfdr45ircgkctlppqrfm08p0f300im8quv9uhiln9ngdqqvqbgbc1719n1esvcjle0htq1yih18seszejrjt9go33ly8r46f1tmq5pejk3in0dlbf7t3gi1p9ppyejish9be1bdzbf2evslpprp3d0un6yy94288k3qw5pyng6mwdj92oqre28',
                expiredAccessToken: 8322872332,
                expiredRefreshToken: 4711848352,
                isActive: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                grantType: 'PASSWORD',
                name: 'p8sfoqw5j5t2ds0kv4z41er8v408yegezq0a8vdzdznhu6w6c1yoonkszlndsjmzoomq3d4khzn9j5wrbmgobbxfegv5vectan4xv504qm00y8j5g1wwh3ums7f288qxik9vamyy8wslwagp5cipgvh7kj79g7jpvgos1jisqwwkt0fl9hublakzbeq20blvjiehltmlrv64s7wzr86xzd7cj5hcqvyo3zkg0yymd2xxqzfcvjc71qg7j0b3zlz',
                secret: '8rril3wvs70631vghfxoh1rop69zv157vgjex8w6i74r8yjt0teq3k9wkrhq623q59vq2ksf3qa3n1sn4tk3p320wy',
                authUrl: 'bpvrfsa0y5bxzj10qk7qo1zetp370d63mtjjyh0obgx0xjb9vk8oshio0l1g8pqibn7ar9k4wrypvv6oomzsomfbem7f5r9yuxhi3oklbir9upm2gldrx3mtj4p03i6o3osz2ybe6hr44hbfngqk36bx0pnbbuw4iduirrdsz0f6brkkyo6wcco919dvve0fvtb0v7njg4yv2ik8n35k5v25dtli646nj8de3izv2fqt20p8epdtzi8m65yghm47adgv9as5yp1n3zyvxkhjsqgk1if7ovtj2baqjpa57cth48ikjsf0bp8dxph6x878q8qcwnjwwk1ziieqczml1kbgvk74ti30ig0e0znjbk0383m3mof2zrujyryy98rko7amw6j8jvt0f1g0j5gxa46fvby1tc86aghgl6l4gpo4fr8e53glr96f7hkoq658fvzlu4sa26dm9n9i3x0v93x2itkwqwp1v5xr1xmn1eb693152ubf6h3656tijqr8dtdn3qzrftuau1so8ujwo3lyzz1jwb82m7ph8ykbbb2tcngjy76vlp8vdlz57nvt9zsmoeb7e8dma47da60c7zny061b0r58kk93a42i8mxf2b8wpem9d598n4xekwxr3e2gr765bi29cvzb5dtys57vjn2jb97p2jg71gpvjgteqf792uofmdnucnervobijg72eta6roe3ymxtfsbhn1sz4alcf88hf1ct19w4dnr72rcj5xzxs5mjndpgadjrquhdzw7mng7p8d6qke3v3z07jl2ntgam09d4oirjc3yspkq01lr81crb9aozf2w8zeaphv4oua2h9etng85wtjfg9hcxt9fqeypvcx7lj552zhqmw3usujux8434zlcyaquu9jqi0fdagwnnkads49wazf6e6fywwu9jb51wqpqy3o9k4muf6062qd2xz6celdjfjhc8368kgwyz8cg03ycnrdbymb2rcqcqs4hq257zat3wh0azzvm7mdu535f9zbrxfkz16v2shqb0b3vxfnvcjbfk1ua0syx9vu9yyjc70fefxt8wildvpy2jnsva1wlkq9ljm8usgrwblcpmzl5nnt2y9b3d7arfs56jx8eskraqa91qb5hh8a9vd4bydmn13mdcy05jxmawazyew9cvwjnd6sn8oc11zmgqchs8bhayei01ux5agukpo0syoy08fgo4a8yh1t87bd2e4xxhzn8j8fv1opdbkhp0y0s76p5i1f1okcdd8s64159klt9mlia4zm7057atk9vmluqfrjxrfdti9g3jipzeanahqjtj2gn9l77rm7w5mlx5cqvc8scjjgb30rx44nj5tbsg2co2u67oaj0ryfskug1techmfbirkle9jgj4p0pekvnr09f40c3drdkiyxzoll97fve0zhhup4q1h9cro4c7tmmgt9qc9jue1fe9n18fruoq702q48js6wd3m1fz3g0mfkhfimzrcw2hvh5g12eh1mewupkhhcdizedkwmx1owvm8c6hmvb2np88suzgw91t701m07c37td3ai9yr7cxcu5ny7i2e09iiknos2w3bqhyonxjiyyal9ex1qmm2u5mpcy6tztd2xamml5pcw8rbcs2zunrtg7q8xr0iwas1j6pwt6eyrra5kukxokabitsxx68njvpqz0oh183huk8vhr8a5mmkln9ejzfrb9u1kjcybj7s7y217frce2xsu9aj77kpp3ni869t819nx7umzlot03wdmppfzp3hm0ruoqcoi3zacw2ekfx7imtvfvque6nsaxha1crcrmgfhg769alimlzyoadj5dl3vd175vmaw1mgbbw17w47fij1xuvmngpl8c2drckftwd6msehk1x6qdqvxdv5x1jj5em2hjqsvcqlhl5dm42csc92ny9v0hm5125t0wpbkqw6n4to4jvaqwlftqz1lw6zxpfdsn5a3drkppcx1usz9vwy7anxfe7l5w9268f0bh8n61jxgponuyui3qoil0rcis6',
                redirect: '27svqeahkn9e94e9mm8g5c2ofsfzg4kvs4pgyml4irrx9e18q4rnmyev4f2nnzcrxahdx6kpecj7o6xly3benwgvzvk0mmqtmebwcm4nz0ozrjh3fo22e6dwa855g01tujucemilo6m39u1flkzgxe7zbgc64pdpmvss6vxb9zfcfppklchsomh6q6rveyor8jy8c2i7ay2ufb9wlnatbk2b12pwvls3w5urih9pqe0wj14rnr6z3nm4decql62y9j2ux3z46v02n3dlxx1rxy3fivhf7ry0qm97eyhkmw3p8ei0m11nlpvdrjp41wv9wb9e2781l52o0r6snrfv4l50smuwoz4p4xhkeafplrmddilp7pvdf1olv48eg39wypzowgn05x45dh1lkxyzpphlii1h5f887k3ojco483ig8dcypqm50bzq164sil07c06c5h1ci2bkomx66zcrhe1ip6geaopm1s9gl89hqrfmbnzz02dt6f2my154yo1brp3nfec6lm81kztp6qme3bdu6h9o6lfcvqi065qo38uzxs3ovbm1rihemow64gqezjey4fsyu5dvd190zna56l9y97a9xclqjy4hqjabuvq54sgcr2rxgq77sedmkozczb0xq67lrt7346zv467a42l7fb3i1ou9cadakhxni5cb9acgpivtppdblwxbbwc8ywhvbr49l0j1wrycy47bo594wo9o9otvbe5443bb6y9phvsb384hcl8fuokc71sdniiflakguv9awr5cjcwubldmkh6bwi3p93d87991ukmilv1kyecvr4qa2c2qk6257oprwvfgwdqm5ldxf1w27bsumdpx7jtety425pxc2sfs4xx29amuzdjjkp0s8pxjmkf5pgeudyytyb63s4kxbf0l7p6jsitp25ohasw3eo2bys92erc0kxl3ckcte6ahnyyq7lwajipeyctjxc2gsdqkouf18573d9r9akblz93svt59bju16tocuwa0z8i86d2q9stckzc4vk0jh2gq4gd9hvl0b30f5wp1vr9rn2ldraqr26p044rcdopj1yj16gacyrv3onwpuicv2p12z80wrylfzh9tddl9ikqx9z95418lxat30wyh7zd8dceqcrfl8fj92kuu39deic6ca81p6u90dzx1m67l6ncbirfjgwnecktay5y70cxvubqvv5spnmop2vtb9d1jsesvaamm9jzmkrrfur4qgdxafcxp23fm2sd8mr5dp6o4xwfg6ld37imm97xwm3bxt7h1z7qa1yuxmw037e4s22rkj66wdj3c5r49us3woa9mg7d3tig0vfifkm3lrdlff45emyoqdebej7htzq18gqw8itw7qqkkirl95ttu2j50haqoskn5yebb9h5api5vaus71ue5arsx7b04wnt6z3bcx3yisrm5vniqnsvd8joz2ikyq47cqrl1lvdtor4c7av3xkdqh6hifgmadhou3hftvfkkk42xifons75qrkss03ichot254sm6ttvzgtw9mo5dmm7cjia7hsrgpnfmec8q1jfgyq3rgcvszxep0yoqeqgfzri71xiql9va9eq9hqdklv5c9g9zu0u74sdom22sbwt7uqdz8ewt4ke7329zbgxtj2fngk5impc40kuu68ss6z4dnqo3ivg6zno4js3skpnf8oyfba5a4pm57ay82zdnsxrdbbcsjpme6yl4atp91sr7x79arpnbyjq9aa0zfewmzdqq0gu5xadrhpmo8gobcpf413nyki0u554z50o9ifsnaef5wnspax8hs6pnlyg229xp7tgk04n4dtjo2kmrv9v6ax8lo5cbt7tpn58few8byjd7881l0l8keim0ytgz5hqnn6jtulk52lb1nakj315uzyxuzvxdp97y5zlf5ip30jr9n4zwkzadktkbswjc53oq2sodzm6z0ocvn2z18h508251dudrx5ibk3h76jsuw7l60fvcnl10k4oycz7flwkimwp2indtouqxd29',
                expiredAccessToken: 1361184816,
                expiredRefreshToken: 4822934906,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ef8344be-bce1-468a-a6b7-1a31177cfcd7'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/3e7c46ec-449c-4bb3-9dfe-10f0f07dcc5f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/ef8344be-bce1-468a-a6b7-1a31177cfcd7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '2b6ad6fd-f78e-4f0c-bac8-15dcb6b5fadd',
                        grantType: 'PASSWORD',
                        name: 'vst77opcgyxbfgs386hd2w8pgtqdze6cf4l5tdd58hy38giw3kxrn172sf5thhwmggmenydhyjgau1iw5w77p20za24egnfyb2bcfs763aism6h2vuek625vxzub958bhvrtjab0rjn0yybltf0la0tv8pva1pkjg1gz8e3theoqqiltfhbapc4z4jbn696gtxm2k3i0iql9o2vzyojrwugxxeritklho0nd6vswy7f11wm36qisaodj1bglfm7',
                        secret: 'fgpoggfwzuz6hfqsbrtzao2hwv8kpnkjad40a3idn6q5a4hnf03zsrpbx63brljej5un1hce34cx6zchj3rt8sqxbc',
                        authUrl: '5t3s5zwdf1gxinjzfjoqnkh0nr4qxwhjbjuk8gpmp1bar74mf96arlurvdcav293yerdemss4r9wh3f8r6nl4al903ke2lut6daq8xmhu4dgjq90c3azeixf5ak861vju36ujptovurazvgb76l52nohfz2bp6gd75z4x4sbrpsiqsajbtyztwbi5tud0s2n4h1rujczjx0olrbzju9h9hd6qq3ikzmu8t07ufv33l707027v4362vyeqf1u1ajqmpm1nkgkzmr9b6xmwtcln2113kvndqgtm0q7m86qahg4ii0kxovc6u8zrtcruka2wkuh18hocnozhtz7pzoyxgpg665t0io4r8urt1th7ekxo57tz5bgcm5qj9y1umkrie2tjys51aqnlmo3hzhwrjhph7x00vx6exxw13fc7xcepvaji4yk8crot18r9vur4uxisco5at3fzc7by76fvd2c74ucfmdvjgtg4sh95ofa77qgnjmiyzy3356u6q94re693wzd6rhim6nvnld1ez5hcahp1zea6arj2moz4lp1zta8dcvek6tc19fz10gfn8gdlup2eogxbhye4o9htn1uzbdhhnnrb0zauvk2a7q0tqu131u38rqwow34cini9rq8qgd1w9sr689kaxfgtxn8hk1y52nmzu4bdr3aa0zlpazba0h098enwkg57xp41vc9heqtpj7izwzxwkasoxt5rb9bc0zzglqpob2pmbniwcaxsd4pvxutfuyf2xrxj5xabubw1izzssfbhp8o009qqae23siyqy63gfik548abrcdomqzw2m9ujf9oblpn9ox2zhy7hk72hmg4yszbdpq8ssc1em2bq9ccjbnam5ffr7xut64j2ax3yylldi9gh1b70o87udzk0qsh6vresxp416ojqvlh5goyabbokc0286wlto20ir8hci3mj1i5yyfkpyweky6onhrpklro226xrppfpl336s40v863kocsch3hxtg22tb2zlfravo48g9omep75fjseplykxg9vo00sp70l7xxl70uevmmenqhuuiazwqbyl4kg36ivpe91t0xm1xdha567kx428psm82w38h7zfxnrlldghzzqogkyrfdyn7knf5dnk4amx5ozaclkjf6k75t39lwl42tlfvlsrytgn1qch72tvq46yc4jl6jxiy1967bj146l9t98taizpskq8d7vorjmvxdrpk7ynfttgaifw2q5i4tlnwxudpyxfg2i2k3mhv4b3zton8f3h09apgxmjd7b6atnkm2um7hm2j5gnco3f176c4ikpe6y2l5tckdkkbbay0586te4hcnqwfj09eunua15z6mrkzm2ezze5km1j5xhn0um1ejtvisalt75isk34vws6ltl2316936iy4ou2gelbo9r3yfbbo3k1hwvjogq7ter580mbwum0fc0kt7odhozh9t13l23tcvkrmqzm59s2f362imw4dea1gva2q252bk3xgkjhvb2499shb4cuwhjyo9278jl9h8b4s1s9rb00hhlmpctn9dgazywy8e41umjucj47s94qbmhcjmrs2sw2tmaxfqiug2xvqyu0booodlsbt1y91aqdqkxvqsfqnqso6jpp99w99p9e1fzvgok6qzyvptpwbsg6h3otj6cfjzogity1507l5cy959eg6xk5xh5rcxe9m2pubbe4y5taz9jrc64rkhsj9g1py8kuyts9ubqqa23tvte5xqtg7l18s74uvf1u69an2lmul3vkw87gtkxp5y4cpsqsfipaepv2fpmcx3cenmo131c2tldlybx7ug5ukl5xe2kej31akw7ut31bjm4nqo3lw9n5ia91mool6n4t9b7yubzb8caspi0vbcxu5qsbp16a7ghxljh5un9436w90l6hkfv8016xcao1jj46yfffbak2e0ikid2v94ys0de8rtcre084i6mc86tzd1rm59v3ryx9ge0mbs6g1u50z5hn8n5z21ynt77pbsizkrs2d7nnn',
                        redirect: 'qlrgplq5ut5fd7nv9uuz2v0y3kzg6nnopbrgpneihsewv4dbnc7k9ancubikg6zpjjwji9r996j7q0i53r7yfv3grphapcq6mivomou3dj67ph8pjax6ks7ql4cborarqnoorck3a0rk3623qhrrp1ll3krw5rfab6wguyntr2jyum68q7onqfe72jezsmur1docw9yrmx87pk9xtmms619zhiwdqj0ea0pmcm4wk1psqsz13zxgeykrl3m9p645g2jw7agg3fs1afxa8id1kte1ehl25132hhg3q75z504o8plty57cmo6ofrn2rglerrz1nvl0o91u40p3nasz8ajd288hkmkl47norvcnm7yw7ma9n1pg3c9y7oynu142jp068vky1aeiikhvnytrpbnf49xjg7a0xm4c9uc2pt72vnemw5h2d6j8128hnyb2vqnkyfd4heb4zb547cuieghvu80zulm1tczdewmgoshre6vhih65d48er2aha38jyeb08o8aoeke3p7tp4aky7ezco405d1gi3vyfmckotuanp8eo1zwmn1osjf3vnlmbfc4daa4aeki4k50xisot7ga47giwwi6ai9mjjjtsvtkqcyfw99n4q699fwm5k0kmufhb5v4lufyal97xo5ofzgi4wmezcq6u1k9h026mkm9nkoi2aes0rflto1cv7l5kavy4gnic2mgz3r0oyjcaoe38aoen4s8byohtehndbqci55yfbas15jv3dylr0g5gbobcq92yhgdp67oxrrf1l8y9hegy4y0gkrtadd5lq5gyyz40q4ryfhghyl4oyarg9vwpd85ei6rtmlifll85ksyyi2xqyi0r16kk68xb56b1x600y7homwedkc7e5u4ytfxiqf9n7xbrduqa05ckutls523xyrg840f1t17yo8fcmjuwnr2895w2fl00r1rhx83jxi3kxz6ewhxnk7jqb5rqqgviks8y845aieuow57cny0ndqt0h0pfyphh7hq6qkpokwq1mg4ikzjvanyk97snr6az91xz8ph83wkef5yeckrp0soyr2bcd129o2fq84xsv0lvebatpqf0i1yhliakofiwo2xthxjrooh3me0hhfyc4n7wayon3hm7dra18gvqq9ku7z4pcvov020tlfkz868b1mot2fbg1s2al4jekljvdwb5bux0nskqe7pts0zldz24tq0w84rujib29lor1wm8chw3jdgv5z5wb578xxflkqkzcyezuvgyeqevj3d14edak2wtnn4kogd98r5frt58p7f6lv80gonrs8a4hyfsqkd4ongiqaw94svixk4ck81k52fd64gck6n05lz2fzdjpijheuygvgcterjn6i8e3pn6xd09ldgpi3d1f0uugzcnz6ya63dq5jskdvahdvyb916n77v75snye0r6evhrz1qrtds4h79ytuh3bjt761gplvlets32008m9xcrawp5si13oaeljrrstxv6keasvekdjh4qr8l82qjb28ud3k2uycpki6i2j98keqlmowxovzkstxfzlas0rgo0px3lrninedmekjnscol1qc8gg1l3ig8m0c0ifypgqfudlszkicma8otets9hy7vvk227bajkdvt23j3aldu2iku5v2uhrp5bu23xysnu10ie2z6q8wuhpjw0v55qa1d4tmspme9o646t9ywaa50rkau5qygdei39wkb33pnq9yjduic89qnowyo7d5yfo6jn0dxozmnk7j9tkcr3gnrsea5lgn1l7uuw638e1m6aaphcdztts3ijw5poesnb0isx8lfagsml03lkwt9pi8nsqz4iexbou3a0991kt0ahfi69priaeur4owke1ymdw3v6iy3986o6lpom8av4q3p1py3h50plu9ame57hnkbgt0100ej1v8d1aqqiyuq0dfre3wo6nb4dol8znsjoww8qk2t9pkcq73dvvxn3ite7b9kek602iftyhqth2lyz1o95qzshzcfueqdjejrh1y7',
                        expiredAccessToken: 8420750736,
                        expiredRefreshToken: 9777260692,
                        isActive: false,
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '2b6ad6fd-f78e-4f0c-bac8-15dcb6b5fadd');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: 'acb4fc29-8cf1-47b7-962c-2973db67f9ac'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('ef8344be-bce1-468a-a6b7-1a31177cfcd7');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '12b972e5-390b-4fe5-9db6-274eeea53fed'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('ef8344be-bce1-468a-a6b7-1a31177cfcd7');
            });
    });

    test(`/GraphQL oAuthGetClients`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '7a92c489-85ea-4e77-97ba-bfd4b67d6662',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'uussdmrqoj0ttb7xd6wbj5ltbx0099agr8l9hotj3y0pc66g5fqzucu30131knp5bh1c611csjtnf6z41qqmx0eck01hocmz1pdhgrz4o6mwseokzpz03ce5ccq0omloa88r7yksze1xgjupt0w22io06yvnp5ujvs23a2cnu1xw4cbb2kibn5vo09ld4u5mit0srcft6ukr05wk0m3s9hqu0h1ljxj6f7cxcq4ki9fqbib8rh7txucjs30fcv2',
                        secret: 'ga77jsvi3xrxtluann6i6xdx4ddkbyxd0uxzxbbzouigutef81n5zjo774tojb9im7zclioiw3172vm0v7cy89l015',
                        authUrl: '378n8cpjbhixargaltrfkxd9o8g7ee8z0nms2wqv16t7vh9v7cywtgpkexzieoeazq78n85qcawxexedqtd5o6s3z5l5pknqtothowtgitnfoam4dykp5fjmhs95gm9hu2q7wqoy7jrplvpslriorpz1n2j08u2hi0sae1zyxbxzq7zgeqvkm37jty76fhwuptvzmi4rnxpviwrbjuic5qwo80xzlqlz79ws5uulaowmll13mpch121p9mnw4eliiab25e3wb7ouo2ia5cobi1932b48ovhrckouj7h16g5h9wlcuhq5tit56u4n3tta7up7mns7p2cn5d8rr7egetlrpy13n0ysqnyh8urvusshc3zxeussz73dsqjl0jrvosljci4ho9m0hxzmzcfm1cwf9xyav7ooee8bed0o96pu1b4uys47exi7tv7bcev59fxrpqfn82gfa8lmaan225zxqt30bw5vrlhdip7wvx8n5fegcolhs60b54jusjc6zn1a4p3llciz08j80r3lha43v7i82aidzf7s26anbgeb9enjuvyj3zkb13obve299cm03t34s4moruaw0qurix125yt4y3onl7z042xfjxd1csk8ugretanf46c8ka0716h55gx73g1x8whtwvlezkbkh9i7yxuiy5qfde7uwt7c19oc09euneqykn2e9jww74k62gmjfndsgmg2i12t5h3epyxb61shljnangxkftzetpx4z6igvwezb54x7ov3y22fuumq3sc3andy3gbrprysdt5yg8gyo5b5osrz5myvbxlyzvdfljugohc3t528n1n3s9fpcuru91beuv4lvxh47u6sbpttuc2rkf1n50vi7pxybuqb0pgz9wy4ssfyfwpgogfz92lqe7xi6i18oiv7rmpga3rfsf43g3zrljofqknrltvpwzc533uwvg60531tfll2liuqdj32axwpjmx336boi9ww49tjx9paj0mggpotvzrb1vjd86njrpcbj6ig4kmcdmvi8x51jsnvo78t3ecofrp2rjd0zngl9nr3tmswdikz66sjiuk70wse0i5hmk5rpv5nrfpo5ebxe9i7a0a42bdnjxadshdpzcwpdxyuji2y2a3lrny87d21ea44qgnwmnyokk5rahx0whsmftmv28a2wpfrvolhd14o4l9hnjcga5cfhoui2ll5gvp1zyoppszsdetn3obkfgz9wexe4mzl2y7rb4eyecggdslx13la0cgasblw7yo41o2pond8x3srjmk68py4yizq8b9gzrh42y7n5is89c4wwpcal9zyczb6dyonyaj8kt67iu16awea00xpw7i8n4fwwy3oxpg418y4br11gazx6x0wcs8k6dbda8i7md3f4p6gdbr0bfb9hmgrqegohesqkwjve0sbisfwvhb181kgin9utwa32kxookihtm1w7r79ix5jp0ulnirdkxzj8giz5fmqfs6epgycp5guaznq15w2n3ie52aaq1rbdog9kkiqxuu4zqgyvtennbjgb7frdw73a86ozon3ewu6o4bzukvzegxcs9rz2ysumb67cowxswh5blt7ykpv7ebvzz0r9ey9ooh45k1ksz5qos3iyfakdhli2e8b22jrcyjv62w1guc5gbl0ujk3ylw99d6voxsj0iyq3qc1uik1w9fta0t1lo7b7z0jbuaelykg2fx37xr868j9fzey5qxnvzj267h52b6cj4xsx8c45q9um230sfryo9yss60p691ithpvj8ixn87pml8auvjwlg65am9doch5i65b8a8572m8t4lw0q9msadvcwskho33bmvx0s1y7ayfikzu8rbjqj5cg7j8e6wrkdmodwiptgrb9livr3tk2cd908waxs9gf3sn1lbj3pfki75q1ez82z0wknnplotnp3rpal0iijdmgkc6ehbu5r1gvzmac2760mdyvz190so4cqvam488srcoib4f04m37ai6amkjt11rnxba1xlvwha45g1lmamt',
                        redirect: '3iman2h2p451kryndpyuj9fyjn7f8kaoaduo0hs1pbst288x01edef96r1zq3uhfkqfvb969vpr4a7zf1wj82nio2uvpu65ryrn2g8mv8pwqjsvtiut6fpeeq5ll9vtj89xe2mcpb5juqduk2mwxkruol2ecp2eern1o2aj3cklhxnjet5kfnxg70paa6v2i3h0jst9x0dnfvdzb2p4ykglvorsi7wv5gg9irrxbnhihvmodpy2016k1ogpdnq4l9na64d7zfzegl48wkd9permvdds2fxtuv7fxd4p8vs8w4q3aotn24cl3ms88bkqxfc2l2gbloi8v6ez8vxkmth9exe14ml1m0vb28mdp4kw2s59tkc37c7m443h22mqehbnfjpesix950pcnmgsp14o2ocjb0jyj172w6zz11tk2s59ea3re8r56ukgwbyc4nzsb0gz9c03jmat930m4tg5wtiiqyovbgh2sd5fybpghcun1osrfjrrqff88xz447m6zi1o3pt3p6pfo4rbskxxf3qlwh19msscq5jwju3etjdufgf2nagpqo15e1gw828z0tnp4mricnxbjo9r0o1pav4fwfyehki6g3fvm486c5ekxch9m8gfjbu0skg5g35nz0nucpfhbxmyae7086nz8syubgw7v953g6eee0r4djsb9jyyo3m137ink3jw1iv2put9e18trzs2cwws2zidb6xi07x76r8f5poczqqqaqntfu4fc0ppdd7x0upbnflhwo9osyu72ozozzboxluz14f5i5fwernzuj0tg9ktrqreaivndrajgc2h8bzs9jggv5xpctkjttk4s33t3rqnbwje401q5e4r1r9aver1iuhmfyl9k8yrviic75uek37abjc6tlplfkk8bj6lukht0r759s00bs9ae35pcirr59hu2aw3k56ms9v0b4b54t6k1u38az76abx0a2g26xz6jemwzeqq25km2emjvqv19eeyjvdin4wxhulec8kzhorjy8b1crykre12rl2t26g73uxt0l7ttzk8yqmyv3om2nupsrh121gmhj661rnz2afuua711if48rjaeqxb3am906l8fyhp2t7nmqgjm15ygddecei5ggnv9gbyrkg8tb2b1iq1giw4yfxgok1016n5vfl9wqu3214qfsv3f241se1x0b1o47recu6q4z4y5ray05jei0ivv9vdy1800rofq5ufi0reoesx7a0s6y3ynwxnyod8wwmqham6elaonvmgc8fatj2d8q62azcy4udm3drdne9uj9vtkjs3flo0egaz783nmqxhq0of2d2q2ur63nfg4k4d48h22gt298eq8q4r061c48rb3l83vj29ii5zizr231d3be7bdmhkq47cclla8kh2d4uoam8typ8geif7f9fh5hz8lxsk7s2efzbs7kiwjsloe8in5xp6rpjvhut7onlppouepb7p6cf260y6zxirbfep4uum76nxifh6nx4o7q75bovjc2uk2tdrqohj1qg71mf7c09advpld4zqvm2ampbo4epiwkqro163ukfa7ydehy5skziacftdza45opitm2x68oxnlf8qjzcg85eyk4vs8mm9roub5dfk4clmscbxktwc7b3z5wrn2n10i0067go6q7hh14xdl93esaw2p4vxdb5v3pziapcvrw38nnpczqou0oa5wiwjb58iq8rh7q61bmjs5hbjwst9zxu9kd6ufn0mms9rqq0c0cf8ejbjii6vpkg4ox63pmdk01qpzgy8gmqdlpsy8r4d2xsboq2n2cic61sdyg2fisof1rhkegnxms1hpedmhfe294bvm84pg9yq6wopolri90cm4jacivo8spmqcp9kvqir7obys2clldjk7vhhuer59mtta3qnq55isdldtvezgim4j6d57h1b8cf5vdex2lz6erh35vjwwhqx3dxtf1aybqqujlkdnnnpbkv9eejkjol4vwsru8dte2pec3tpewulz7rt2qaia0nw9',
                        expiredAccessToken: 5040072006,
                        expiredRefreshToken: 4276179176,
                        isActive: true,
                        isMaster: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7',
                        grantType: 'AUTHORIZATION_CODE',
                        name: '6bj6kk69hvgjfc83tz2o7esis9vsue1kdvwrlf9tbz7rr3apftxy3zohzkao7l0m31p7ft6md81g1jvo4s4t5i0l5txiy8co3vd2oj4kq2uhk1gea2s6qmc9lk8zsyx9su8dg4mde776ko1oehrkyn4e2il3k878l4myhq3hfy0gydj3koaukj7c0n37dcmd4bs1j8yxktm56ef6zl8c94y3v9bk4g0411duriwbe8e77w63sq5cpl10wvvhp6w',
                        secret: '17f2qzo3773769k5bxob868q8hqzaes4f8030xex6rar65zju7gavh6ib67x4e9vo0nj027yj9gmyrnlzhw2vvlun8',
                        authUrl: 'qflv3j8ldiqwch2x6jonosh8htt24zgub60s61fpzkdp220mtxbk0yyplz9s3mxoo3a1p5hdfk7hf6229nyb7qujcjtqavpb16e4vkpetpiwyejc9vrms1bwud4jvjnvoomda1bxb852uxfl3vvs6gib1qcaicmhhcwilhiwng6ptdtvtlyr0gci1mmqtwguf4vr5dgxi4m0rjdykhhtuiinpzkdoolb06wgqwj6ef6c8ead9p0dvlnvn278695hddn0awqiay775i69rpqacli7mrnl1ervc15iutxh07q2gd8auqqj5a55ms4668kx3nsfd84bbml877jbkswfc5l3vwzxogbpu9l6adt8bvmo4ndxd6f2ygryfi8s65x4ufxb786lhhr249h2dxc65qontxjmok89xapyrf5qas3p8i81msyghyhg026vufzzjnk5j22gkbmcl7j5ffadeux397nk0gjjyvpifvpc4l524adfnz638c41zjqbrdeghrm0prn0oyjsgyonq6u9i8oczhyrx2f1gut75oibqbx2ooeka02s1m9iv6yy1b5ig1njepju79e7nno4pp9025qetobkgou3322krks1rytjkmbozweh11xkdqvijfz7tpf6br8ukwnwb0ts7ml8qmnxka55rzu6ty35rhyvf8fdf6d4y0ym62536yih56mngafv2m4lrl07dqnflwukfx6oj6tjyawcs0nsulcydrnq065adhw8bdard32tg334h3bw4vj107trb6443pcgs9sw9b58j8dcdkd55yn7qcy27iyi3auludm22rtzw17gb1qmatjvjbke3nphv4lfrrmdnxqh2j6ow0g9z648ql4sdx8w89m29ztv0mu1275bufpcqo68jtsb0qobqr8yb3ix1ctl037s6cm05ze5vqur0xkbpvu0gheq69perv8oe17c0tokmxtw96mh7qp2c9tc98ha6oy054ulacb6nv4004lxwaepk5w1nuexwkq2u1aq6haj4hzhxho04rt7e3hq32e1ffykoecb58twfisuy8iyvwj0b4e8uhwbrcm4d06eub7vqzwltk67svesbxj4cs3ce5lrk9eu35c68kfjtz1v2q9ycq1hfdz9tw5e636wp04nxf6kl837qwwac5ddytqo9louknf14y13z6dccetwqz1ibji41poi123awl2viakq5jjryqug1nmtsfioyfqgqhjs1gvlwo8ajd0pd1fg45v3on9hwz5i8qfamovk9rr9zo5cejn70whck7vcf0qhp3m95jx0a5a4jtp2plnmvcx03onuq2h9ynphqurw19i0emim5eq7k05m3ktrwu3bp84e991dfhleexrnp9nqzj02r058wd556tzaxkcitgb2wjpjkeaxqchpferatnskln83w8bwnpxewqaljrf916powux9xlbk019rvgbxwbgy4hyjf4frzsgz944qgebr2bqyl3vpf3hrcjwy250n2ajiaw4ttdvdod09ma40bsoow5fquxc700pq0j038q4jwriz3aibul1cw3v5o94hoggzgx618y1b6kegeprbr3xtdmyus1grhpstif1xegg4ol9s523t2cddx7ibs786bfdb2mx7frop6f3cre57pbivjqtqhnfggjc1yqmyuaz4808jsj4my6imnpkj5is8t57x7s1v30h87y5rg8hypk680d2fdng5x96agme4dcoooq3nw7r2t2t1w7inae03z3e3ghydeyupfbb13hkmkz8bjzaa3dba2biqwu2wj3b6z1gb0rijaduptg5ewz2f4u2k5khuv2tqgjkj95yt4bw4n69i4l7itlkk13hfu1d1lkyzhh7chdvh3onea6ra7y1v4p8fpt48s013dpcly3wmgoivgsnfcblriumgn9b334a3ejqhrjkm0g27mk0cxv72w4lza2cce8iy0v1qwwc6oxydbbekovt2nfznms8z4jbyjmgvk217t78o3r0a917bcbl08dyf46mw',
                        redirect: 'edovrcg3xmchnnczrm6lvof01am7rqsbr3ujg71t2zzhw0aj3gbwswz4w6foqwvqkluv14tfr9lhryb53s0uczv1uvi8jblqnveghv2uuske0vi3ghs3y09or8fwe178x7extc3tdquzmv8p9268skit8zkpv06piwwni7rleifta2ll6czf1p3mjusmef5ihy93vckxuato20fga12nh6jp621pechpq3nzpcnpqx6i7i4guibdiq5v7fpy4p523syse8usxxuyl7f5p74af5lknc4t6aca7lybxm7it026gotx1i4zgfx2ti5rf8juzec4nd25kuvln52ymj99zt114fhy9ylzofcn6704fp4uomw8za2je1ijslf99yp251vkgslmqhoiytik4bohjrru38y490r79ge3bn1bwywkwvs2xsup7x49veckufu1gd506r820w1xrnq2q2ejff0dg4f2cvgm7awxo4ocobzxpjtnbldzpe46dmbqhc1vyd74rimi5kte7ribq6e47vzrfbrkaxxwtufd4i7p4hkwmsgteg51un5vpc42414s6sd1lzt4lcrghxslhuar3a5rm31s9nawwpjfv9b9775dj3n0so8qoxj470100uaqs8gf7r5ardx9iknscgl7xnj0wv6gkey6a4p3szyux0yj8kkytko97g8jpiaxf9ee3wk5zcemcaubtsvsz9pcpb06ykxgeqg3v8v742h4gti7bl9rol5qrjnrcza9onwqa1ct4zfn58ncfefvnrhinb5dvzt7a4qkw7n5pefoxout849899bzuuqgvo19p42dowi12c6y59tvi60vm7k1wtsyal3fr5adrrho8pd6brhnjw9z5ynd012s7flxrtuvpwjzexwu3vq1kxwqlbjwn6e6f0vhpgc3vzsu17le3p4a1qhspeq3ou7kpdnjrx6wv6j1vm41vhpi98difdpt4dcnmn6mvti20mh6hghij11xcue4cansd4vwpmoj6u8k9j6dlwrzxuv7etks6c8gn417br5xeh2yu0qu88mwm9aq7ie6qrytqkb4uz9gadt5ckxc5z5cruea4v1abzab2wvwaa1gxt2chuykgh1u4muyysjbz7wv8kpximuvwgarwy1kt4j3qp2lgtqwrszry8nl9e7dbcctt54ujj4fabews6g4ntw02jer6wyx7r4riiizeicz46i4oxsui9g12298bsgw7uq11ew48l86tvreimu7d8yxy3w7r93dnd6qgvcnlqorb0ut2l0yjvkenxduj7790ji0hb636gz26havhtn59sbgk97f3hkf7u9xiqur67j2bu1qp5xuv7fe659we5gvjf6r29dqwnvgt4a6zrwn0npx3hjfdpvsotefypybofh0tfo0fusnum1odv805wlrafjnkpwn3bqxturgdxu3cqx7ssz3yluq4qv4xqmz6uv7725s4zkv5bcb5834sn6ulwybvav7kfc4iryruct39cthvzu7ec8i722vkkj0dldausijh9h6l6tyygnfrmuewvyk6e5k3s0ibm0zft1y6l57z72g3px2is7hwb1tytlsgg33frhdrs7xu5fthgeisaq4bpoyyhgc8kfo9mhkjrtfsmjaqnqh7xyjde3skwk1ppw0k7c0od0cc75lvo3r91q52uh3ytb1l2ij83b78if5hv9qqlsilgkv3ofuoe6mlclj45mmxgbgw4y4g3mnknc4ewqrjlthwd0vxnb7p3zeiukegh5wwqpy9fr1ioepf8wsqp421b95pzhwrimkalbuiyjvqiy56wcay6fnxmbv501mszokoi3medgsq553lhv7ssl1jxc50509jm3vumxn5ly6cpc06miqzqrfuslcufq3gx5o0o501tfc7i66925otw5staraojbrwye35zm6jn1r3h4fwr2ynkbbw5j6p84xehtzclfb0rj66nf2n1y8ihp6rlbxhvsrx4bvk0r2zgdr2j7c8e9js7xs2n91en4sz400zlpm',
                        expiredAccessToken: 1408821815,
                        expiredRefreshToken: 1187069739,
                        isActive: false,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('ef8344be-bce1-468a-a6b7-1a31177cfcd7');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '6d2e9596-7807-4a86-8028-d9fd902dd920'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: 'ef8344be-bce1-468a-a6b7-1a31177cfcd7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('ef8344be-bce1-468a-a6b7-1a31177cfcd7');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});