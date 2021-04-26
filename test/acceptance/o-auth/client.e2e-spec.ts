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
                grantType: 'PASSWORD',
                name: 'wi3vzqomzznzm1l75etjq4wqpfa3vy5az2p2iq0gnbga7qpg59s0uqmyjx9ix27aoqrmprxair0x3ta9mypg57rro0dce84p1jn9ve156svlwfa7hlg0sc2a02jvhooimhbt0lllur7kz0siysn6s914o2oaimsr5akmyt2sktg9s11r7l8j1dnlrvyvgss2ni9o6phjccbajpicu3d8e2owrxrvdlbyavz4jn4cp59ltvrixb7z9p8iwr8b2ul',
                secret: 'hcfafovrvzuo48dvf1hoh3lygfg4sh5m25yj2arr1lgwqo014y0eyn8njs7ogwakfgkl48a94oy0pu1nrp5ezrudp8',
                authUrl: 'xwkcwgryat1i4iyaixaq64zo6553x3za0ef172yvgkz16qexpn0ewj85rg34tvl4ly4x5utowqnhmfr3yl6uwsypy47j943hvmufwtza75t5d4j44jqbdj8w2b81ph5uy89op2uj0wbrm42mtf1neiazho9x041ujg6pfesmfvnbrgbhjgbwdsiircg5jtgic9hf4axkeppeeuzoaequ9gzegtwnlb54t68x8hqmm43zfnfnyrtrhx8u06eif4aik2ie0st10cj1q1vi10lj77z04n6e46fi4d7ycy88fmiwe81he1a1bi580op7no5qt8g7701p57jnyatoidf9hpi7l4d7t7grv4k697t76v9ux2f648qxsdnu56qeidagm1mztp7lghuci11yau7hk7yhjp9e8nfph69tnkk5ta8ipdxnwnaf1093k2ha42soxo24thsprn4g9x6yz27tthua1t1zcn2qs1wiwz5r8nlpg983oilqizivefzh46dxc856ldz7s8y3vop7l9vtchyamx9433vca2do8fegbcy4t11ankeqs4mokhq69nhhhvi3vpvpifcb6pel0idb6q0q2dehhpmrwjw21iiwutzkb7uprron8j2x49o9p8ao4bhhhzdv03y1u4tyh02hp55wh58os0vk5lo9ry9zorzttksao2ecmefcnpdpmp4s70tjiyhadw6tusadgsr4fussprxs6ypwpgpxadtvfpzxaoh6adlp3x3uqv83833ui54780fo1z4b7qfk8kglnv0bts2ub9j45y7j6ifzvzhpwrvt943irbagauyoo1z3kqnchze1kyydayyxm2g447zpdr40tbr45jzkph8qnzists23xfcozbghw821vtk6gzkcxvjx2yjw63zwm12u08kerwjb0l3c1hk7q2lsizx1gp49gp57ktcun2f2yypixoq7rzgd9j59ovkyhveh5r4h5qr3lwgg0e6ov49i2alt7oqekk4tczaorm9up94qbhdlkwvijlq0s0ohd117gt73r7o4fw70j0o2bo0q11lh638zs8tfgmca4mfqbdbu28a9dm5q0s3rs854bvrn2qmvm3m9hbbc4zru6zwrwcosr6sm7szd0sfiehza99h7tjw2nn8vl15vc7c37b2vetuoqsdsniy5xvd41w575qs36lim2ou9m63wfwj6q4fw4hbbtdwzuj5qfzp7zl46158chr51xcbqht0vog5dt759nndtj29hcaipbklv7gl83oxxodms8oxm3xp06lbfsyt757yo9uluot5yx1fqs52hix5h7p4s3n5jvtk8x1c7g5cs5wqis8zep5s2grz5xgqzmhjmfbg2ydn7k9zbgdoj4auv2hulmk2n8ncfyf9szndevhwn6s06bgpxy14sazd4rd8dfq9gftzz4m5y1vyi31htppmh6cr41stdvyb019wkdvb61dll791o40pdfw173gqp80vetk7hvq7wmv4cu2ltqll1rypk5b0fmma1jh93o1tv3t9phc1t9ptkuu589v2fjynz6p8xc6exqjn3brbcmthf9k8lkftmawbzapcde84bg77e8b58feqsukovim1qf4lopcbjyysob7jcvnykuq94uxvaodomfcuuousicax902ev30vk48idulc9f5gh7uyxex90h1wk4l2gdl0h4kq5n3uza0fe0v0k7ql64x3dv0om3olyn7ndxu63ja7a3kokfjgy51suhe77menp0sukv7yze3lh31c27036kjnb710rb24g2t4pdpvucaclt0ls0okvdxkud2r8hyytjomju779gituv0rckdofb1szgdd62mxfrfmd7a1dksn2ccolmb9s1xeeydot67kqhcgoyuwok7iomg6qyziqg8dysy9d1zh51s7untd0twm94kpily7jz01hwibp7f5ug9k0sc6ctgyq4qunh7h2skk0u0mamsvkp1htlpf7559o3xx29iqshgipp53vw4l9znw7eyy5aiv1t1bn',
                redirect: 't2f0fc0d6rs3zp8ubod2pbypbio5wfwl2jo6ewrw50o7qdaj4jf2ozcdgp7w7cdgwarz3g552ua4nbqsme32mu3ksltzwxm37n7wc4jeeagw05pvq0dtfzfzymektv827pdigkhc409s91hlsxs2xvl10o6rjsey2leuq1rx6m0qa2bbqdsj3oz1xb7briov15npphk8uza8nfh6kcgj6ycnxcsdg226fsiel4eyrd2uune9283lmsvxa8uo0oxk32x2w1vq32lc7j22juzencfrpjo6387vhmgrq2zskj50pmwpemsp9gdf9cec43hzeq4srflw1mgpj6ejlyv9luvws53gv0v0grzmvbv7v6cyrxwgh65qnpq776a1yfspot6428ahl4uiwogiatah9vf2xylnxnx2flwehonpdfvah9gjd6ghl5lxzri6086193ffpidjry5ha4cvdm5m5r1jdiy66g8vsxg0x1mmv7awaw4251kc5p1nv6dk70gzwvobg1aciwp3vkn1le7yim70xpat0p95qfh7bxqy9adw31lbdvr3cxbk2oekyalb5tm47o6bkozexhevvtznozlnuvr6j1zgrzsbf2za7ivuepmaugldrr3unu30pusmdni3kav3xt100s5ruhcixapdc6lwhdu88jh1tjvtk9jxsz8vbm9g5te3l84eodbo2izld7svwbc938vfc5e195icoiuxitj0cb4xqvcjbos698iezcl1mcrt79ya4fj6kreckmgwjjtoadj49s7c14w2l7c6uoeg6ksiu5ggjqqi2tplili0gwdpgmrk1dt6tpbs33npr1p6l20tzrwzcde59iglfpp1auo7ghuxei00mxpz2axncjal2wnfft5stzhek4kx9fl004r0xckkjsy0ktp648t8cl6f6i7ndtl99iw3of5lxcuruzmlnita9b0o9ee6cwk9d6ng03rqnpqgo27506oejqjs5j0pwqicpuurdybzhc7i6wp94evupg4rtsuq4f9s2i4x41hgw5d1fa3h41snvl7b17zz8zt20kqqcrpnv1qn17eg6560v56ffuqwyvdpbrcepdevm4hhqhruru4ecbl6v2z8seckj1rkym25srygxm2u5l7wt4onfzrhk2jg5a6dj6ml1rd7nblxnv5019r5uisbptokm1py6fgpojtnavqre9ezp4fevkp6q9od3hlz0ulzw0r4ganntjglkgeqjesoywjun3ikn7fg09fgopz90r0yqribuoxk0kukeyxi94793hsz6c7ox113tp88xidg2g44whpq8hdd0wy33n9f6g090pry03pqhsb6tev5w0uvhosg2ph7rs0b36scl5a0ukol8duzdof1ub7m38wltk5rxojal0ei2ty0qvo2hjc1wdk50hqrt8rp5mzikoo6ilw2d1aotp5fannaea9nv5xqqquprvgxd8wo0f1ch184xzjoqu3zg7yzs8ixb0d98ke5jpp82r7wzirifthm5exddyck6maobbwkxycmarz6cvxppvztb6kamqzm8pcjvj8r44pjbcklrob8hm7rvehlrmdm556sa6e4d3g13pqd83pb4y23svb51q319mj6qukxmyjb905nq2ijzi10e61kjc53spvt3gyiu4yxfoh39yvel8isktwyniwh0lhcbenj4d1n8o5e43te34dlks6y0mz1ab8fbaacb85muxme8v6f582ze0p4o3yw8nkn2akkhq9e2mglgixbtwch04nicr6b4ml71oxyq0txswi4p9z9vnosqo156bzmlr5pwkwxmmruidt42oghbymbnv6l8ejhfl9t480tx98rr0ghtbsrj4zar9a66efadk7kzhu73fr4t96uz1czxfssxoanbzezacx1gzv1wo88em6388odrlcea6rgq71bcnba084wurydxuz2yr8nsboavqq68i5affzabz0o116xkx096zjne0lkq4oyghb08ai6oc34aol27rxdget2htgbzj1v',
                expiredAccessToken: 1024375155,
                expiredRefreshToken: 6528058576,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: null,
                name: 'xwf4vv4jq4jqcpzmu2sn9rhjg2dydctpuekm2zx27vssou7f55ubo797yqbi44xf0dfw0mmhnz5v1uzmdozn0mvf22phy73bo5foklomkii60kp7fzlkv7s8njfa66zqrgx3hyb213o0kqzmp670tgnplzt8amu3j1mxrd1smurylmfihs134pbmvg2h3oupcne2cho8nw29ornxu4nvb8kmgbbq3539z4fwkqtuofluir34h3olua93mw88wkn',
                secret: 'i75nhmmh5n6yd0aimwr5cd0pnub9tlg59hf7qt0s8p33r2gij8v6jo0hcw709pb87zski3v4z2ttczku2f4g81918m',
                authUrl: 'o4aslig2tvpxtxi989zg8p59eodvhojkyglsmzz2req7afqv6p4f95j8kthkpzoyi8tk9p52ys3tmlrxbxaxbbdpsvdle8i5fny6toxp2g9l5h1pje2rbk5kbw6dej5nyicyimfkr47937ektqb5fdo27ujm8g9amb4wqu40gmun4ouja7igi30hjw0a3qys6qqkkbzj4llqneae5sbi5ay2zf0ol39ic79399bkozzhecoaswbw5vwd1xjf40s36bdwasr8cxuvc039gn5ill3q6j17bn3lv14v5hlexi3eccb6lwm3771iyqa1wrquzvwsjauqmrol49smfvq7fn78epxrahqpqwmcnc2fhp6b5cjx4ij23tuyhnn259tegst3mqzgi1bgxb5hbi7chqje986wv4z4e2u9h147kpj33hn1afkbkt8vaqdpgp7xq2iwz38p78om5c1anjmjq4vy3nifxlc7pmkj527j0p4zly53vgbsg1hbi1ymkx4w8v4jr6tb43javc3if3hw1r1esky6k17am0iurp2nglqqdtxg8tj6ifoli9i1qexsznvuicvtir4vq298ansre73bia305o09dn69bb720zf7x0hu2lye8i3omgcs3ydtg4qx8bf38n9uy0b7edf6yuvruhakmwu90tlyowre1ls0pnmwlypopk7nxtcthf1jyimde6pkifb6h6zwn7gqtczou6o5slkky8fick090zfsi5zrgr0ghqiis612r9lmtxyu4kytmm7365drmf3xnjqk0nv6xwoy75mfay54c5iudu2fv0ynb32prb95tc22rjpweyfspw2v6ttq4es17dfhk81mzwff8ujt7fbv1u7ujftnd2nt1rtp9lr5zgljl8q304efrrzb4exq8bnr4p0r5cpdeqtc5kmbpnih5ysf7m5x0i6p9wq2lbghlz27e2vs2b2xtdht2xrznrkytfgqanfe4p43m55z0z9wvysw0f3uqfd53omw85kmhela7weizg4cgzs8soiuuomvsemjwt2z4ivwpe6pfsba4ncctsuzxaokt6bif1u0t8b0spje4crruyorndg1n21r0fxoum0wrm05oc7ih6w9rvyyr3m83p04n2uxz6zlgpupnckt8hfxotbh3gswa8yw0fnxrlw0mq84z6n7zmg0iwyq28esxu48t4etsfzek53qi3l5vw4q1gs32mju1irgl5j48e0xqj8tndv6pki29q3one0pm5m8l3hhko351jnt51cbnhnv35tw1d5ytd7w3khcmxzusztf19c4gey52dm5m2u2yse170fb0zhifn94850139zkypj0nmyv3sgkt3drnwpu3cnm3i1fkohn4caeh3ni0gwd0f1uvh3jb6xl5ixkam8xe32bses1nmzcp6c8j7s980yz2uyh7jwc852bt4ydu285ogvnvvrmtuefjit8g97em7umocd6lj2jhdhtfebz2xypa62ykj8ug95p2hndowg71ereua1cr3xpozdh2ss541v5qmmgkgerix3h84b81rxyztif5mo3o2u1exx90udq868fn3817mze132djctiis64qvfr397gedrgakbos4tqfk5bakt3ucbg3ojvdoia6wzdl9dqxlfpk83muw9ytbs3p9s7gi9aah0u4a2w4yjzeav5aqmjlup82hl7sp9wmsmthp8ce0t6tsdhbepsf6cvkuppyigr2hm7siwc8d7iz8d29p6a1aqa4dvhdzl3q6tz46r6w8qq1fa9i3ra7rpxgu3tqno6116ahgxoqmrm3cltejuoi0dt9nf3k9j3cfimrx8lxf8grzxnhdfppephpew0rprb26zymueo9cjz62c47wvuhairlxq51qdlx6kf28iowc3zrrogdoij6difocion5jtbjb0c6zsnetil1vg692stvxwcytvszi3fgavoa73y83zxniptrnugkueqm7hkkissitrayqrfin6nwtae54n5fkthocbsam0xcp34hfvh3xp',
                redirect: 'pqakfxrxaucxdg2e6j6nz42ha155x8wvqax7zd4pcle0licgtuw4iu9zc2drshbimfiqfela6vhgjv9i62gx9yj3rkavs2pnuzq5z6eatnh8xrsk1971nprtc9havrs39k4a86dqlyteckmzed0rkyv890ysk48qi0vsrfe0e2tpa0j662xzux2mz999qgavv8rbes33phrnbzjom6a9kr2qrhxgg29jh5n9qhkhayi2yutqbbrnsjqq01xjsqfyawd9je1fpi518zh6wwl8r8l5zwgpzxvbno654q4a7145agyvaoanu0bvdcpgdu8n1fka4ymnaffkzz3312ej14g6wg1w8h0glv95r8tz6z7jnx1lem86ju34avy2xm7yati092p9hhtrkbc3mpgvn008rb2akqxs16d9m8xqoa2ols9aaf4pgjk66ttz5kd3apb19fm3yml9b5izp9bzp096d8ub3eda06ipshlkjhmhnojs61xf6m20ibo2erq90lt5fy6jz9xyga2ki5ldf5nsizxjyslwz7loaaekik3no6nxk8bvpwkv7z7sdb7d2hheamtruv4dgu1qy1keg14wdkpqi3w46fs3g01hk4urf9gjh94roz9gl9mbyedatvhaogr9o0ej0a6s7rgnos64kwy2bahwhr9sk0sdqly19vbjj2hah4krr8zp8nrt2i85wsqgfadzhzc85iwfcdmqcmepfe548w3zcujvdq9i8iy0oo1wfe4tb8fgaol9orcghl7wh1e1doi1urw0zq15x6zvs64l1ipv2qlquf5imzzx5ivifkz9wcgslvd7z4gko6w3a3s0c7buzf71u15084dplao0ggs8b1ye3ympsvq4w3dw1lbdhhhz1ixm9yx65x24f511iexy3b8tsgzwog85azeeh3kyg422lhwz3zr0rm2yoe27ollaytv3l2ett3nosv773ss3ywejwpoz7pwryfyhmpcuqmormpqumss0ru3ahkkzl4xjdr0fupud3u028hpisrhejf7e0kue1y120exbww3j4tpya9omxf1qifnow9ejs42v35ze0fpi6td8jco8io35mpf1wo5yazl25oiocb4ctzazdlf3w8x0zne7xpa1mu4isg2gaj0ih05s0nwujyumna6eyszq4gwn7qvfercykpduqlhbcgprcftmltdkscnfioggbrxvf4ccqp6dtulnaoo2a25fuss18mjbthifn8e9ntfbgaks2w5rgd3a4g3v1vk2pe7b3zsmewesfth13tkpuywyxoxl501gaapbbsq3sir3onnydwn0lhk3u0envd2vldovns5esffypuqtdfo6a6qtlkvwuqo4hdwr1xktlhn7j35292884drlol4qpl32ljsfsojxiczrlp6h7492b2bj26qs781yabj9pe188awt3d7ynwnipyxgckq3vxba7kal7u3v7tf66vr7ci4xqkidh60thimkzc1w6bk2zp3kvaisl057aa0vcr4jla6tv1zklj11lubiarnc2wt2reb2nl0v17rj2iioqkxrtv7q30rfv06d8ttb0ft967xmwkxil30tnqky8kcmzi70ywyc6sc49j7m7tf00v0zk6oiywqzk1rnmvgve0k1dl6v2r95tl5l3b928kobeu8se8ggm6u4jmiiqqptirno6ocxzzvq8n3vuakhphso32vvefq0ivnh1kp20b4fj2emlduxqg0sz1kg73cc0zl4qab8xfo9r02fzs6ogn3dvx4rf5r73rp02l6wni4gu9crsheilak17l4to1dhryo8o9k0fwzix7txun2ael57um05tt1vmu41t3sm5vkgjfsppc8dnjddp62pwggk1zss9qmppjdzx1tiwsychqxfhtikte6j3rvotxdr8j0mhkazw29kofa86xswt63xfhanbwlbxcpwhehwng59sbx33je0gegltg9hm5xuxie5gewz4mo5prxppxvt77yp1ku82dfatbvxlrrstrr0hvf93doz',
                expiredAccessToken: 5703742844,
                expiredRefreshToken: 2579425434,
                isActive: true,
                isMaster: false,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'CLIENT_CREDENTIALS',
                name: null,
                secret: 'jw5xjke8a6j0ofqnt7usfk8fhal5w4gb9vwlfkukxcrwslz5qs1i7dclc2atteurvm636jum8dq89f75h45u31qigl',
                authUrl: '8xztamkx7tjxu9nfcxz5ecra6neskddn6xaxb0bh8xap8h30mzjocw0czp9vtsywd8cytciu26jsypdiqj7dpfqktpl0auv3sml9babmdjykmn2pjk2l4wn5m871ehrejuzduel4qxypsrj4ync2n3vloavifeh7gic1tkv2yvjs5u3d5zrn8i9qfq0omxbsqrshjitjolzupxt9dcn80ljmz1q7m9olyxmfscqmlr6ar4c2io9rwfk3m06xh808t6767jxufyh3t8h0lia2mle8ql5ti0r5td6r4jzc27f2fh38imp3sncnkppwkhkiabfdv72a2q4rrn2djke7ttfahb0fj4doeh6twic12qh1ls93ktv3aq5jb4dua4yi58razuh9s23zs0rgdi7meo0bqe3625mcei7otezzzjsforewgensg7or54dwp72ebpva07n3xl3fw6ykn2y1hm9nv26p7vs23j5olz10oi42lckuwctxhvzwz3p789gervu6w61vqjo6ep0mhukcivkum0uj6pnpzccc4exv5rdlpgspr2xbjy3dt7kb7bolalo6qjngdpbrtsfwyxci8k9ylmj76q06gezrnac409rieugqiimbvm7uieb6t4ew9852880y3ku1z1ex2zunxl938w69k95yw4lmx11pgtg43b7wds202feu20eib2i4gmhn59bk95ezln8pdo3bt6bev7tkeo7lkxbr05pu0uucuj704o5ihbzi57u9nryf55ehr2djcgahtc052art1di9butaeeay529palw4mkvlkm2dlwaxnzz7kfvdtk74749r32dbjscpig8acne75vrie18dhnj252lg85bw4swoci5fpwbud2zt9exwh682b1ybk881qfsfk9fepd9x35p29vxxe4rjsc8qxoin24yeydzlbdbf89fhxh7ns7gysovrwn90nm6comss2jboaf70qrqb4pvb5ak8e407qatnq2drdnhpy253fkccsellqcnmofvivd34kf4me0bnp0i828tilew3gmstjkzd0au72azdu1zu2gjlfvjunddfhqradwg57giqtl3su304u2hml2almzxpygssc667b2c27dvrypayj61ycoizc7e9qf85suy6w60ssfj0sh71lfky1xf5ey2y2d78wtb2metpdrql4l1fr4nutfequ7xhob5hco3i58y92lpzagtj2ap37l8c9sc8bk6tfyfddh64zdz5jh4joua3ybq7cd40uhvwyq2tarxcw59lv1tbl0rmladpuah1xmr25epaqdmn8yha73247kqx3lrq4h3swt1yru07v6q7j5l2e376iuf199k8eew2m1hbuplmei9lvse1jwqkrl5oi1s3rpc0ru13jvmmj9jfx1pdjk8r8jexoene0rae6lgn8qoofg6vekfieajnq58f0a3buyj5hkq02vbzijdtqhmgtohwqtpiearq7ntaowmh3eino2w5gaoop5oobqbyrj5eygmyp5vu889zeofv9a57m9n4vmsjpcdccfppm9gyer3dtwfdczbn8karfn4q40ncxrh14m6zei3qhgn053zti2kp2vl69dps3udgnkrzkxkm3bxr6mit1z3msn2iutchcxj40d6pqv6wh1t58rsr3ru7rh4t6l0rti5alyrv68g63rlarrahgvp6xm0i4rv7f5pel1y07xy2o8wfryhiigbgmcdz595wibz369uevp5rvhm1zyffsrf2gvldxk06acoo96l9k3v1rscsv5hjdo6f1lb45d7xo57pichjwkgj2xmuf6b7pok4cpbxe5bnn13ovte27ul641arofu4r2oh2b9yu6k7gaz813mbfzwo5ngaehqfb77v4nfdsxx8y4rz0ero5k8kf0lk9arjo5sneqolgujfkmj2yma6urmmtjtvydidn3s2uh7k9fdhucgl8lxtckp0hzrrv5wbrqtyk4yor3y4rkt40ht5dqallpoyrhun3k94dym2tkvk824r',
                redirect: '3y5g2jfuxpqcv3l6sfd205ke3nswjlc24uwthj1vuq6gpj6n1f2flz0o0axixcmrefmsdmiqav5nejo1r617cytml81ynlx66adn66u5e813v471we348xhfd5iny2enzl7746xs853e38s0odqb1mfcshq9p7npixilxxv0fu1dk4suyz32vx1hyxvazp67be1q5giw5srbjj47mynufexi53ldzavs25st3xry8jcjenne4wjlmlkc1rabkmjrwtjzqi60x0u37v8ndvs46ive7mk9muolxiea4ro20ogro0mn024oy5k1ou5kjvara06r4hvo6boy9kko06ie72m3237zp45v2kiubk4qujazxmm4zxb1xlopx4tbtumu1fekxn8045e0iqcl2m77lhj8xpfkjoe6b6x03fi678enkh91x9yp9rywpwi2l0rm5niktuzqjqmv0wfjicb7skfhzsq0alo9hs82x2zzij8xzfcnw5ppol1jw1sohsaigavhn0zvhzzq62qr8s1pl7rrj071509c9ebghrblgf4i0zysnetfgunxdiox8ye4b55gnfsifll2mvu6gg4o0dikm9qpzr3umoxtaz3v6fsystdxt4ouhmbjijbqtcg5k0a2ho68dox0yvoyuhbja6vlmcminh90jzdtek921ybhltrduva57egsek6a9svo0jtf1e2uvc4b4i2ny7k0ezbakqsj3600xlfqz0lffo66sfla5x4e3adivna1w56z79a69kalpdntqx86yarey24nyczzw0it41vdjoff8n33f70l1o2boxq0ujltgklu3pbye5om0g2xv1tzjudfz3xf0mdif47uqor3fl7v12zjrunf5ejzye97zgzq6g48ygz6pmid5mya6ubn5n6e6j87txus14ddyy5fksp4uipd2068nnhikz6sj7rs530kikpj05i7wazvp665vfoozxl0ie74nr5vv8sdx04bwsi14hbutppwl0nfey2sjfj4u3ucnjf5afrke1efxjcrih45dfcmpled6r45a0gnd3ie7od6rdgjht0uem9cym4dz0hz4e6j2v21hcyp7e5cdi54orfcc2xuodl30myq1uth8o0z8po2f7ukw0qdb679zp5t83t7857h9velqlevxdwxkjgyybrv7gic08mh84ds5ipkds2xo4o4f0do2sbzoqkns4ir0lobqnht10os9ft05gjeiasdoaw207629ktm2nmnqkb4bcuk7y4svmx8hc6m6tl00ljctuv1dn1jfxkzatw063jfo1qiiqlz2bw4o66t0lzp5eo12574gtu6ft27rrnw0nzs5mv3gk3gldoqkxyvm9yar5ascff1ov187k74r17pptmbbn782c2bg5mqqa6g1bdjcm1t1yd164jmmdv71uiupicl6o6xzj4vbuun5q4lk1f6qsn6uicqxib1epwn788wo6tbti21zggg6mbl1950t84fhd23ithcfnsc8q5jlub9n2nr5ourszsumb3fmgxzkh5h1gzwyuq21hzy5tn9mmkuw18clx410eidgqzwkmy5if3r180zxff92g4krmqup600r4upyyel3xoyptznq40pqq5e1l7x14tgp7zk4x5xpr7cc9lzwrn691xikijlrth2blvc81k9b51so2hl0y2cgss7e2mqr1j7t07ubjko32xt443wre50wbcaieq68meeo9l0vlkzrkx6oj0j4hyazv8tv8pmip6j7qqjqjvd1p50xlixfn9gne72t00fivgzt82994je89spcprqlhgoz82epjwglj3oy3fudfzv2s991s5qe5c2j24az808x4hyg9rw0qtnwddhb0t5kchs0c9mfgqlf1gshqppps3c247c43lwpzkulhyihxou5kqx2a9ktytxhelayge1616k0jy9qmup88uvy99zncumzkqdk5lz82n8q0lbj0sbmbvn1dl13mqur7oseii9dq01xau0abaqswtf66eedvsp2ybwmmqn',
                expiredAccessToken: 4573010252,
                expiredRefreshToken: 5109023933,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'v5tjhhs68egh2lx36ybx0aumx4a9h9cxycm247acqkqu5f6fwlt5greiq2vm35wp44tj5ndo1qjvih93lrqi4gxd8m4x0iio3hcdfn8u377783n2iyagm7ufu0eawflx1i51uk9u23n2vb2e8e2rsz6leu316gkevxyw686gfdc0dsmkqwnoolqkp015lkllylbsmakcph4dazhiqg95twg23p0r1w4ohgnrncjnifcxqzh7s5r7aawdr1zv5lz',
                secret: null,
                authUrl: '1bkd0w2su1o7xeaib2vequ6nlk3pau8zeo2lv3rffgwlv8kzjrzdt84qh7eman3rlr9ivmkgldrhqer3n5dbrwdsceuyujx5nr0cnfy4cnda4hzu6jtmpe4hkbfmck7mtxtf7wum8c4udsjtoevq5m2dxrmeykzgug9r25vkvdpduqguoqpd92hgahio8o4cmshp8vjp1kuchi4y42jucl3e6ct5skxpglll0vczvxk377q4vau51ixve9bukhelcw1ivviih2h0d92wnjgzab1314838i7a0b08zzfwkkka1igo4b89kdy1vdsb9x2e5i8z60n97ktfc1mo5aerrvd7l3m9krs7zut3cgy7vu9pvhzyu3562d7aas9fzmolnz45wqlscpp4fl8jgqzac1xmxedfui1s54iooe3uu3q2m9m7wg2ftzh2ultvygtmfxuigntt3yfdi34lby791a89b23y0lehexega3k1vnwid5pr8cme7iar5hr5o4tc0teiy4soaqq4lqafjxywmjeoo6nvogtmc828geccz0e76ce5ardrr52sqhq0kc5l87g8b7vi0mjyqh890l7bbxyd1x9c9ziui71e4fbec7fjx5xot43zc1nuek31ow0z05y0xc1ahm8ax1fdicq8yx4v76r7qrlb9hao6jionp4ad51rcs6u8y6q1pdtqrny1zx8bv754qtrg2r1tqkpthzwcfl7y7y95wfpu5pkzjzhrzvqs2o406d1g5l8aa9vagiaal0f21293mxmkhf4zfvn0a2lbtqycw132meok581v7nba6wm4qltvbiez7hb124paqig1a21h88wfk92w56vjozwral65288bxaeiz4urrwaphn380b8564y4yh9yus3nzo3o666jety6ni7yaru9a33ad2u90ej50l0nsitc0rcty79kuf17s4bv674g29itf8bfs81wwisb68bi7zhb37ncksh774gee3ispwmxi3s2ahucb1p95oyznsfohhcnnttc2k4x2kwyfm5s9hcuw1v7bp3hmvcy83wkg3c0lxp3lyjnwrbwemr8nm211scy7x6ydmgby2dgzfhup8glx22rus1ko0vbnat5n1gxvcuydrpf8lnve16wbm411bbaevl7zhr6uhibm7z2w54lgg1448l4eyt1nj2aw4b2jvome4micielclqoh5z0rrmdklhq3pczxz10wu66s378sr58d4f39nbi6l8akjxn186r7firwesmu9zwemrmh6e0czw4zjya29449ez1cmljihg9ipur1jgbpmaql5xsm9mp4aul4oz7bxhiiubwha6fdb84jgy107bdkv85b5lrk9rino1xoyeva8u6rnp1s8dqj7x0fd3tldiubwcygyzt6ilbbt9ckf4ntqncmnhd2zldmr24zw0j7klcy7gj1buholn1luvxbibkt4afsemc79z4x0vbab08louks0wipaqunqx13rk9legppn4k2alj9bedrq4kwsx953epycyysnunbndes1yf3vdgekywxar7jf39rl8rnqd6jgf8j7rgehmquno3hq11s5o3gke4x93tqx6sif0lefcdmcut17eru6cayx0o46a6tu4tfkaer8enrg07u5ofhbneyqv45ekquhjlbhk52hkozp6mxwr1vh161hmj98ure94juc9seme2zb8qbaxglvjeg8wu6z6knhkey8jyxmo2lw7bjws6w9btqn6o40v2n5hysz0f5acly1gpilx4hetj6elxyltzop6a2m8y4jdkj4rwnj9jg4mqmmpjfwvg4yqkagolakmf2cozy476d6l8tokoktqxaj1wzrvuu9eb3s9o63ieitikskun1wlx6e6699uvemn2e8ncon9ydd399vd783odl2t3dlm4oamczulzxu4nmjnqnzq6p1fzk3s7vcds76g40f63qoc246dlbltyw13c2dt9nthxbadxe5sg08nhpkib95xzaz6qkri7pz7ps67qnpn82pponms',
                redirect: 'lz14qgx2buk0mupn5coo0bju9kzux19xea2fienl2fbvhvaf3cb0sp27t28ogkcqd7t85poswjct3rqz3pd5vuj8fxvai4wjy5f204tyqybjq55fcar4nma03fkyr7oxo9dl5ims3uzgqz6x2gwx3mnaxa9kvu3oex971gcav5l9hh0g1exs4od79qolj5ll29605l0p5x2i4g5y552upy0bfxepjyvvu59zru25r8a09quyec2kxkvxx010bbfqskobeniap7gs13ptzaen37sdtaaueyb2c231i7n3x6m33cavfs0rto5vuwu0yep891ft89h1xf21ank7wrnpvmfx4chikzhdd347a8lqlv4t7pgrchh2yb093gnwshcun26l3d67hppxfx00hjv4lkhzwny78fob5dztzrdoyx8vaz0c6k5gxsdovr9sbe8gf0qpb9swy26j0ccid4ho6b2sbou98u7f5ku44umo733mgcqryn4tw0bwkhss2e5rfqme8cwa7qbi8hqq239l9x1woaer6796j1id8pum3ksgug4eal943xbkhc8wvug44ax9fqhpi6o6hucesay3wtu7mexg4a1zvo6opm79meuuy3inun70x2no3fgcofy9794ev6x5m7d3l29kwcyp3n2fknmug49xb64jb5adklpch74017zo94mqmkzgfbogj0mi4u64u9fqi645ho08bgm1p81mrxgubtve20x4dz0w5c0v79p1cgkg62egkwvmoc8x1god6wuiu55ibj8hgcsaa2p37w7yh3boij45ktd5brjgekftyhzthw4p9gxw13wep6qglw9qtxwwdy0a3apgc5slduqe2h3ssc3d7fdgmoguvbyjl4v8ghayenbgixmgma6ogrwrw1i0ipectowb68a3lmqdxei5wymbp4zx383125fm6q1hil2uxq5wiizkc9kq5snt4rf0bv4ktxf3xif58g45clc42tkgicebz723pdcocv7tkc0m7oloj81klg21nc4wsw75qca3pxtawe4rtnb03h1h8gcij96yv57o75jkyy9g6u3n9ap0imsafusdldw3ujmh8ebyr39j0zjwvqlqh6hq5eg9whtkgpjn4cv1mwkw8ugrepd2wr7fwb1hhotvhzrp5u10icaulrbe5sqmfy4unc23fj9jm6cd0aryuospf9ojtsxdh0d1odua7ff63uqb91i6ojsty67mf437n1hji75ivu0z26gc7k3tgp8cq8jn0hy1wqot1w6vsdtwtx788cmbtkzlpm8z337lboxa8ya3m0hle4s25vsibplwoizz5ygnsxkjfgvq9xz8rtuuptpidd14aq5vpz0ohm7cdl966npme23yyug2tdbnamz7lipfyguis4jsntxpkgf0yct2x2p0mf8f77wmly7wlae7aje74onvhij2auwqf89z0mdy2o6t0lvd6d9ypvl3tu4s02v69q9utbprq6vrmciqf01du1jckb71v9mg0hj85vxlxd2wlzlhc8gewev14wwbic1goi21dbom1pw8em1tuofb6mlzh7g0mmhci1i1uc4iyp7gawbcp3sg0iuzhtq29lkjkuuh9xlxgoxdzubx0hsxxaetk0yt6z9gelk0otcxgf1knrv7oi4axavboyal8c2yrwor88vdwz58kk30lxpnnvzd0sa9ke0zj42lolc48k5t03sq30vshc2ggsk65n126s80s3x5a7wwcy195e18mfy3v577y1c7shxjjdyqestytb94amdz0yscqxd6400s5f6xp6qls6gw8skyjyngdp9xxhw4gh1wzciwr7z7dvyep7ey4nsyl0t9of0abax7qee6765wjqq7d0sh7glj49y1y8qie4zpr1omvkbofcz5hwxds9qeg63ceaaxrnrvmd83jqskquglgs79evr0ykjv54f1s4w3ewjn4jitj4125jhvmcaoyntyvx88q6m74sb4m7as9asbi0tnu0kl17ohef7wcq0syo8r0wal',
                expiredAccessToken: 9573949867,
                expiredRefreshToken: 5976637311,
                isActive: false,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: 'xer8gskuyncgu9shz9x27i95erncicqrfru3p1e64k3v4tzxsqa9wkyi48b0lbnsuzlpuhfea7uotiezq0gsm02clpo1phwqeb7bxzip1wz4l818ki62twwue2c86dab53k0vcqp8r36xloix0bys75anc5bdj5qbbkhog5jbq53ygj7gpsqwex2flqtv4irpjb4fda868hcjori3mq7vu8pwwxcjgeuga4bnhhlim9gwkn2645c9j55jpg2dci',
                secret: '1u5ujidiojcmne4jxj0pd0ejizrhev3wvgeberkwzzcboya7rm18r268l0xcmby136dfv5pgh4fdjixivd9c4r1jvw',
                authUrl: '7wmj6v58iugkt53ogcax7j2b8ix8t7fqb0axu8ea79o1lyzwx48v9xmfij2ft0qm311jmgd3q9prqdm4t8ocnsr4gk46tfjov2gvju3lw34a4ihcudgxykbqm042csfb3404dyczexf2mvgriinrweqc1wyqp1ssjoki7m7ek06e9xk8fp9auy8dkv210qs8062yj3u4zb4brodqtbmmtze216p55ih8g8fygwp4hnqdpbq5navnh3hhmrprs4x2tmigha1vy8d5akyaeqe4jkuevmwbq73qmoqtri1dkn4evkhke80b57s9gzp15y7nl8qzoz771dsddby2emle69b0dc07s18gwtjr9jeqfuz4ber1qk9nyb7z12am5jikiy601sfujmg345d60cdweaffjs5m218a355prj7gr7xbc74marzf55ntyjudscfyyrxiavxmulglvl9k05kao5jgpyvbes1hnsu51wlgnnigzzby1si04cuuathrmhw9evh5w2g9nl36vfjgfgbab2qr1zykudww99rkh39i01dsfcetepbef8vtuoafu2cop6vt6wapcqeb8073igjx832mhz78u07420ku1cldmtkzzep8jepogqvbxibm0wxmvbzcyqli96qyje0w0vpwto04uqkghgkdznwbjb14dfnu71r5m9n495vuaq3l9brmuw5ty0yvca1sxzqui9871yeco2sqoi08ndp4hnaarmosw2e7d0haoblfb4mn7d8llhigtaxm49lvvswolbj78k4a1vlfgz8v3bf00sq46ao4yc7ib7e10kfk6f9gm4b5gvl0ei6b71i89s8d55jr99hksxff53bppbuvww8ra3e6en3aevoqmo005xq9w3avqvndr35g2pds3ut70uds2x92p54tthed9kztxn7ej1zi8z6aeyxfu5pbca8hgzydp8fwmpc2h16y0nyz98c0c7h7ntq9nz4hyomqk1j24dyc7qweh77b4ka9p2gpvx23uwsgi1ac2p5ndlfwayg3guq8q3vc233bhnkzpol5sk6mahbp83p7isl83tbptmidvhtri88fpfs1g8ek8mfiltz0efl4lpanzn9ey4izwfokyw9tfzeo9nk2avue44lbtw3g5zgq6f4u31nq9fm3ij31gedqfiyuhnbgkz9kye5r2tjgk9pa4ewjmv47ryjs65etceggw0bylejhhkpkdfw8ml7gf6cwyeutkfhli1t8pa4ba2nehk76x1gcungdk6kcpeesh0rur7ydbhuhvjhk6czvh6j3orodq53c83ay3jtdvtchvg6k6bn99be8129jtqs5zmuqeb8iklfaxuj3dsnprmqpp285ccafkc5kps4u7t8uulabbzsjv21iure5alwqd3yl1njwt5nf9rdv63iil6k7u8z9oiwnu0izlc5h9x4kfmp4t6v1bp37dsazxhtow3ma1395ng9eetbb3j385z3ptqp9h91qjsya25f2n3xv4hj1u7ks8fxo1yx4cy2bppqkwl27228fg329eyk6qfysi04ba7unufbdfzygue369thaisg9pb7ghedb4sz404f41sbvv8ex66obuijo1xfq444cayt54eeeb3rug2t37g99b09klmv1oyqoo9omxxu8g4xuj5wgo90a4nqs5s5108vzk7q1ui6y391imybt2c372m4t6lpyo4emuupme39r4fjl8wf06ghie8n6fve1b9sei8q21lgtvsexy0iuqiti1xlan0d77vccqzde8incrh9pfueds9dufcpfwdt47nklif5vn6nfoxkb0kkk12k71mymbza0bh61r87b1xh5j5zgmbm57xowmhsgalnkkxrm95dbred6rsf2gpo3ilg8bspjb3sdwcq2qzu9v7rb933kl3wfjwss5efwtxgfbf0ycruoo02e63wj942y5e5ouq9mfktlg365v2tu3pz9hi5vhk9nubguvq0im03n5avuo0a9ho69otusbxh0rs5us0nixehw',
                redirect: 'pxtn1ra9n1mzebgbtt9fyaooqtpjb0xsrsnhdh96a7impgz9gihnpwln7gp4cku4cpg9hiprundrzsbxee8gv0bzgar7ometwbabbrclwuoqr7fd0his4s7j9fmktuohtt70grwla3raygfhxqsewcvw1iqrkrebuj5o5t099i2e7gu5pkh43ygdursfqp5iluxlxo4thfp5ldd04u0ogcwo4z99kmffr7jo1pjgzc0sh1se44zb80lrzs76ya50gpzzgup7en2sq6mc87umyijpbandao5dtksm4glisjeygty8fw6kac1m0c7d0hb1kw5vbcddjneizerk0rvgz72277hbwg21apz5fgp2exosjcfk49i72mt5q1h0k4fhn3pxo3dj9gslje3qkmmwtr1n3f85d98hhci7lo36tmursbzcjhvas2bhjvk0txxpc6juzv22hdvwkeie26fv4yrwf01ox75uwonh33ex1gbgbf6poubkns35m56j6q66fh4l7uidwz8kze9kg0uywba894tma54cpwyjpm5io6b7x3mennui8on8plupayeedd8oc6pq1xof4lurjrba4kol1w863zn4eujrqq4dkmwvi7vl59pdh7wqb5hdf79fv589vl6joiksve622oe8eck344y8sxz51xgm7232116s3dxtaub9p9f1pzucefm75ndivx07ksbb5rgpxussz933ccgfq53a5sgb8rcykvkrzcig2o1vu69lz93zmos81j4o5n81silksa83e6apdzdvsauahwcm5qvjgbfwk1ircqacpxiytx1hov48ncz9flo1ougrqye6fsn8zr9l4j73xzuvfgvacz6i15zw8u3egwcfrtaihjt39th91j4sixr16du2hkv6b1xx88xjwst23a2th80qyv8brifm0veo1fgstgizh0qywknzn2o81l90yjp73t40oqfrqp8ud6gdhpssrenecyh4bmimberyd2973gychcbj27hbwela3nkt5iim8436snitjcjwvpv22kpp1gvihd54pj1g61cdbjzt4okv1tjhf2sd85jl6x3top5llrjrvoar05ggrlj3dxdr7qktzion6v4s94vmz5lmcf48q6vdabv9wjfb5uyrlvhpb1pnetpxpeu5v9n5ygops9al3mhftj7sg2eiq1gjkklxb034tifnmf3rdpgrxq2739zubojgvhsxs7d1v1n8hcsz95ot3opy82a38856gi5xxi4v0dd2yb9meyp7ghegn4jl5jp1y31k47quccjr376p90n9tretgdvxbub8mwxm8v5wck8oztug1nfiaciwvmsyr3vtett4y68ghb1dooq26mxc6jz5ws0p36kythv42wqexkasl2snga6f7j8sd3ui8hgm4n6qir23dci5luxomzfftdwcdymyqffnvvjgmp69hpc9q7d8pde303xcqwbv1vzf1gda2nob2yc45x7pa1k0pc6jcpq2s5wz1auh6fn9wcbdqen6k6ht9s6lcvfavb4yxe6av6cgeiputahplj9mjeugnep4h0dwexezlevcrkl9riunrbtoigbrkb7yai2pvchc31e39ee03ipscfcb9hnc4wld9wb83uzwbntrvq7afl7xehj1ooz63dbsllcl8vdrv3rgaurs0q2u0wpp3dfd9srbc2bwvks0x1xd88402yxhn08rxfav2he0luohukr8844vz18vx44ha5jl89hybhp0c707gp6ancdt4llbz5e7kyfd4gq8963vjp4i9dait1goqgyizhwdf8q0kuuw1u5979oo2tjnzfhtbrtdx1ekro18c3nezkk8g3ljp230pwfee6fgn2rsj8vrsejlldozdutwslc2ser0nvaldqaieti4kckn0mam7um4rngf3y0o2xvt55mf08uzu3j45yb4uqeon0qal840qhvgajyywydcwo5ojx7lyb9zcca3ukeak53m0gvk77b64vax150jk2axta354s22gj24wzwi',
                expiredAccessToken: 5103542346,
                expiredRefreshToken: 5773108416,
                isActive: null,
                isMaster: true,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: '2ci2ppgjs183mgg8w3k1j6vsfby0s6ry8y9chcpmx2hs67dn078dfpfhip9su07t8kanjx9yrzuvv5ufjqdng43h1izcvtv85v1ek9c82jk9h30tnkjx0554mtl3mbuyw4o6tdarz6gf5wrjzfx1pi46wrd6lmbxpag3tv7z39uafh6pomtek0k6l2uye3zvxtpdvkeymi7nj0y8nbv1qyzfgl22qprf3knofs2duej5274ce6nv6kdkhyndonl',
                secret: '77rnte01a5g0qz0ay1eylonglgsbfymjw90jg6723zba5ck6wy28u0j8fii8kld1hmdntx7m1xi8csdbvxvpujirx8',
                authUrl: 'bry8atnfxw0k2etddxfwlt5w4reuloe9e0xjda62oztm7hg4i1jwsspyanad608nhf9r8ahow20tc5syvykhsnj9yxdv0f6a2cgcfuerkd1go8hwe5ahcclox5klmicye15tcxkk3ukigy228b7jztf125fy373zlbzsfpbw3g18roxsfpvjr8bw67gky5b2tonjv82woumtmukgvnw5m7q6fdneceqfg3ubf4hr9nmlwzsei4j3myzzgy9mdvowzjqsx6mudlfpv9c6idpfcjdzi6dyolczskezfjnvij9vuaqfanap0xz3v3y3yepnzldpk2dp6xsi7n4u61v2o7xh7kxgtkhrnfiw5o3x55r53tiifsrbmla65o5q1pjkuamvo7w6mhjztm7fneler93k73np1gcjqnbqi9vamvqclvj02itwvaqg52dnksuede8fmru0unt6jbo34fbb4hddempl6gbqwnwho0bc8sm5hc1q2wbskm21jc7mrij5psmlgwlxlp53dmbpmryorxshnsxbmv9okltpzunbed3mp2m90s47jryynu6u6hkrqutgaufajwz7rfaob4cy52u8pl98i2zh7d4n18qrhcfj27cszkmyjshezxh4ihaw9ouzxuro81x9nnvk24rd2sojc4wauesh1bbg0zjq8a9eug7h2swxl4vs0c5nvj7c8u9yse72e0e59yyzzxy752mt3agi7ymhlb8ptsl3ac6rjyc3hwflj59o663kpqtdsyzn50j5ia0edjz3r719qorrqodq18u381cltyel2976dxcmgvaxcwevquz55cudo97njr8n23njz20vbpdiuf3ok8kvn9ltxy0oi30q8x12trxzbm6g842kso0i1xifra9cy3ge69iyzgdoo8zb0f1ieyucq61bhz1umtsfutdo81vvqzjm3sc6iqvb747j5eei7krzikrl7c55ezk90a5xu2nhuvc60lhg90myxxbyir9a5eu96uzplnwaliq3qfzbryh9ko1mo1yco8bmw5nly6s9gi2y1rkeal7cpl9tv2ishks26szxppsd0f7j5imnaw5o7pamjiamheffpw88atgo2rqhhkovxk9eh6zuutk8jbkzzs0fd8xsowd41hlcs4q4ytgu5kw4mp2e70299fcuq477ek8zxm6gsjw0gfmx2y818ryaguxcnw30fiqd9ub0j27cx7skhg2dx4rn63m0od6ksqdpvf3phk4f5qjvo25iqwlg1dq54qk39w06t4zge0g1dyqsiec6kc17p0y2sjygcbrm5txlo33sa66ykg585p818bk7y4my5aucezjw381lodfh03o0933ij9dvcc7r080u6sy9q81qtq2ihjksim3aupz3552ov4zixj2ui17kw2rvo60vqf357ul29fafyzxknvrh0lkeqdgd12cebiy07zvcl8cj58bk4lfhxnz91dfw63s6c27n2cnzmgew7k7eed7d5brskqd5lsdwvjp6exr37ucvspdegxbuhl121g2dd8r3lf6la9evnm9y0ehru16jyficqbkmivona0w0fri8io74c4056i0dc4zshkx5d43bo9ccp96shdi4up099vv345vl51l7yvf0gjryskxufrjx25e36h9hvv9jr55tseaz2ahiglovd77ngqtd733vgk70k0av5tbshv9gmo0dlinh8codnk9p13jtcyrc8qi0ymdrbtv7vlc6j2m1p8xtzbk2u05o7lhrlw37wzurclgqnbvzgi4fbie0lhmutgqudc2f14rpoaapklhjynwnbumtv15mh9ikk0z5fluk0xb43odah12vb317topa95wqtcz7viii3s7nsb41faqpbjwct6akvbaawtlgvr8xk6jghs86dtsl0pxlcnomk2b0aq25ajxqhc0vvoscnsmsbq2zp5glhu8xcezd1newa2rixpbhgzxnb5t5ds50fyayv4zj3iovkzi5dkxsu56f9897wdr9pa6sl3twan0oy2qo',
                redirect: 'imfkwi3t5luuml2lcmr9k5l1wpseunlzjyhcff6x371jz5kylvj30aw4pc3zqkbmv9n0mjm8styhp8zaqcbbvagamuihk00s3hz4alqwzo7cl8dqzq4dkn9ilzri662gx2oc8lsyfgfdevsmtrek0i8o6211t374iuvjh38tz8lnjy9aqtgtw5aycftc8nvtf35hf8dl86epn3aiy14mgl70swoth6g76c0dkd0iagqktc8ulljxp6m1ji0dm3t14pl4pvk1e50u4hhkc1lb2vncezczbpolnzy969ohbyens0a4xsz1ykx9wa95jzcbdpjpayihflojhiopm22nyfkknlw6y6s51b0o7hywstdc23ejgeqaw9o9yj8g3vds73jq0rc1jtxr5ypttogungj3tymm4meda9ssda62pis40094uu96f54t2w9agtyy4zm32s43hmqi9jxko5473h0i9wdfkgyv4vy2z3uusi7xj0j20k18txsj7rd1fljcua3mp6i0308vm0gpfzsp2l6wb4oz66j9bnavv71mfzp2tnnquo25ilx0tsl45kus3j0kds8bqb60f0pwuyc490mdgp6lrwmu22ydq1zu6oyz1ghiysyj6t9sfbpemmfu7783d515bihrakrqzrcyaxuh76v1k1cin49fojy0i6jzzlxl9wmlvzog065qlbjpa8ysehy40m9237xkwjl73lps60m8ty1n48l2dyjbb0s3j34rcat0jviu9qpz6x3at9g3yapmfsxvgk5q6gooouvkhynxwtjqibcdj7i41wertp2c4kwppd7zlk341h886ac3d0srtbxsicg4fktyg34gvg2nvgqewgti4nn250g4l5uqwdba5husn4pkpxdi2foj3bm8by7aj1h4n149c6kzrlgq6aayztm142102puqd88rb1scruxczs9nwlyub0ml5zq1t0y29lfqgv5et5lyucafffc25icweutrk13wh6wajow44s6t8wzcmbl6dfuzx8i3ina71380d5jzvynjr474lz0jn6vie5wlb952nc8rsdhtobb8yxcmmelf4azor70ops53kiw90p0sebx2iuoxxvr9i3pf7typ99ijg0y7nkjq7l5e776b099fmwkvmbp3sktktkczdaeux4de0noq7guuoxit4svmol76m1wtvx4cu1bjgp5zce0ihddujkdinatae28w7o02261nvqxu53wtabab35v2k5183gz11x2w9jp72ej3x0s2mpwk6oh3795msx0yrd46yj4xv9z46q30b97suhtfic5u1eo4mxd800vvs66xbyktousioq83vzig4i32esemzf6b74jjc4afdx82k4n1ea9hmh4vdahym6u18xxh4ip7lf37ucxr4d4vuh6lpettcvzjri86i69x3nflwsh5pv8o6bgzinz8eer7g5kry9htham8nqduyiu89wpopuzuonqm7qjebcbv59d7okjcx2x5eluwm58u4elvvpa0t2c1kl5ae12ozelc5rpx5ropcsjsnvk6socjn45z609mx7dfjm2r02sklb68jpkhfc3neisurtl4sst830jwaxt76imnt1qasypsesucqht4d20ozqzd8hngemkfagujhxiefzwia6b3e49hpz9up60ieol3ggisyi2j8bmhvyiqe1nqvfcd13nj45z5v4fqg3opzuqnteg6ztcrqimzwwm4gs14xzbxclrney8905888r4ht5zvxhjt64f3yxcgyvaw042s8vaafsr6cqji4gbzlz3lyml697dsx2d425r7lqxy920b280ezctth0kqknyjfrdqy9nmizte9vemkalqbmw50lx4xy4pooexvcb5kq08xp4xq2jaig7c4t2qj9zfah6ha0ba133pbzjgv4dc9moti2bqux2gmdj2mnzmyw0mp830jbgh8nv9tks9sahr6xcrme7ultkbqzkmlphj49vbnzgamo1rq8cbgy2bxri5aua106i88j8vnn9zz2on',
                expiredAccessToken: 3120476985,
                expiredRefreshToken: 6625623393,
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
                grantType: 'AUTHORIZATION_CODE',
                name: '5h35j7ltw3qs1sd9ypl4m17c1j5tq6qz0yulj9ltntzf84qrl665i74zfrzaykfvnekigpva9yc64bx6jv5z431jsx6zj1o573w76era9ixhfllu3cm6js635k88fesg5gwc8mmx49mr4nfqcvg4l88pjlu4e0mg5f1eb59lm7reoln9inn6bta8af3wckk8i50nmrozkftgrzmsf3kffz3bw8ljeht8gjy35mkuilihrivv4h9yt9pa9dmxoa2',
                secret: '67scdria0mztn9psd5v8floj6w3nx0pgipq5z5atzec35rg2rberui9vb0bcuy0y8zrjgrfkpcc8ltsuwtrl8odekm',
                authUrl: '4pzc3vre8s1u18lam4twy1vakbookqyzatv0juakcep0a0ymam150u1yan434lfygrw0ajzxzubfx55s5rgk3wc8xk3b5ngdepuwju6vn4cw3n3zh5mhkc0nzza6w5sw0otwwpow5py41kl8rv4zwj0fhak73ugpny0rd89cjudzlrnz5xqs8kldu0jfdoxrm0lagx0ou3kbj4qinwv05bu94pnojexc429aj2ler2kuuvtp8yoyyb81x00n2tcjcvxhdxk8x2e7trp396jeh2toi80s9wv6vwb1jeavwamvfe53ojwntgrythp8hwqq4o6sxwotm4wi6hipif2iflrrfyzz2m2jq0km3wrx9ewmkq0clyahtmssmv3u44yt9ykzr2uyuzh1tqvms35fjtdjwftxhm5qq4euthcvmrus78kmxsnseqyzlnn3p6zpmu8fwf4j6jn36e3mdvrgn5ljxbt9y5bg5xcx0gx0km9xbef6e9yw7epcgqlajb2mqmw59pc847bqpubp9yirgl642r86wrxl050xzn4xe9t8m6gohtui2h9qtzs33vwh22oaguo44sfd0ctxvfyg9c2gr86oqo1d94y7zfo8sbswurn74wbnrg4tdv5uniulij6fmpw4qlayfal6uzs81q7b5vfv9fih922hphoejlizpuwz99hpgx5vbdni1jb59ryobwba3y15tnuqrrqjbyiotefc5vko187jrs6u1id1v2em59w1dm44fao60d1zt96cwf07q0q9lp03b3xpkh1db8vb4kyykf49spi4pp1jcaf8vnid8z3xo6zxzq54gh5hi8l18ciwhe3c0vvelt2gsgrhmsjwj8gjlx4agt49cswbulb18tp0nfc18swcglr16zkq8gcye2tp8frg5nddssxwyd5vs0k4d5x1q5trkyctkbt836uma6tqrdh2vilj36t5lu19hicdfdsyy8ors5dlosnpb0pb2jigryimwsut8hhl85qt60nr11j6ipvj4rft5h081qpyji8140x3zxsanio4ag20lhefe6lqswnxi4j98gav13xthwl7xyw0e550ov6kyscezd2ztvdc3h497g0ufr8vm8bxtpc4w6tds2zz8328gbcppussfqwnh11rxav9r4omalsuxkxuwfgi7qi5s6pm2kbgq3akeh0b8kzu9nsl6x2tdfwm0n9xfryoixk112zii8ey8m1en8trx8epqcnaqrgdrunhxjjr9jtqmutlb77bp0tt47vdehssuwn1oag210ti95jd4ftvksjieapctvh8khx6syzcygs0t5te84dnos7lhtobtlcwu8ibeal6h4arjvthmte868k643ewcu4ajhxal55igzit154n9iig3l6wdgu6m92ue2wqvxi508gjss84cajr2lcsbar032a3phojlof1drcvyibizhnga7ju9orf8ys75kszxbvuo7v8h4w1lli1xzrefb730dbsqcgpdg0i66kb95tiwx4p2k6auhvidlz7pbll1ulodmo953v6d0pxo3gjknm1ifviov8zwtf0jn5xit2k087npgnwuc5f0cqdgh1e5stl1xhz5xdsl8tjheteq2yiiew0d63n8ffjojvykh54vvmsvck7wrl8n5k5xcxkl0omxsxnuuedbqep1tsvgr5jv437koh5la4e3oj4e1fgova4t20yp58zil0lb01y6ujerwv5jmpvdxpa9f8l51ztwbldbjuds6xgh0z7mxl49wy9hzvx0l6gziq6r7lwhz0e83mqkai671rbths7ngpu2sxjpbcnr71vvhu9j3kmozgo9s1ipyx7yqukff7rtu8l14h9hexyo9yjbg4mm1v33ytq3ao0dq88g68o9chjmj28dz77dqpgwjfqwy9mfq8rb72wx30krwhminxjhrel8ex4fnmt0y18yv280h9wdoluovlvm2s9nv1epu4cjyqatqrr31i7v9ja2itnmle6ep1x6k72ewzdcjqx73wg1croci5s',
                redirect: 'u6xb38wejwdoa491v3t8m19as6w0uww3gpqvxxe0xpp1xo5chr9i7fqvcbpa5zylvtbrzzvk9ik3d27bwpgukxk84wcmi5sj3buew86nd8tb91lqnz9okvd5su8eeh155289g5jlp0n5p4wdydp0w4inzq9263q7pyb2twkyve69k5zywa4kuwg1mba3uswdkkkfrkzal06s4f7p0hanrn64cgxmb0exymfr5lme9prltozmr52ttu3mhlwvh3cwesow0z6ilskm8b42k7q6d9p1gr8h9cbw5awce5hgql08xb46mofz5vwszox2s4d26enmzbl2ngyv7y0yeogbugnz4kao13mctnwrmgopcx0kx0ild9rqsrii7f9qmoqg6lmzzu1u6wo7bvfgz8x1owi9nzrw7b3ge4ddhutsuq1bgsnmg5x0h7almyea6lqpa2qxenwmyu48dwv3x1z37sjgk81dxc5kkzvjop3jvul5kicdrq9lx91ots2juyj2lqc2gr37ce1h4miz7aif6nmqq4edmffh3loelto8i5vi5oqjf0y364wbzs0mgxu0avnt8n8536bz3kbmntli6sb9bxi5koqkpe4ua5ev2e4icf4xcx7tzp3rbizjaaf4bwrrwmsvxc6ncf6bv2smu72gmbm7nu1pshww10g08tiri2193bywxw1miw4yjfrljxozgremoq3f67wp6bulggj8l8l9io1wehj050okfipnqrf3a1hupe7qhf726vzxm773oagoxjrbpp1ab7m9fbma2cjv4bcwg68v1kt4jmxnfqiozmm4s0qo5sxgihgmnhv1s53bgjuw6y2wtbrsd6bupftzc07iekpe88924y43xajl7hnjfizz4olim4c4trpte8sn8xeevp8r7kqbcycp7jnxfe9hcotexdge287ntnkrdpnl7rjd30s8pxwa8rsccsyhz7f67kgmnenxeqxjx2pg70097l5pkq0f14m1ms67rh3nm0grrwlxvwmevga6soadwogxqfaeme585h6t1ry218tml2o8jg62fk721g6jc2ml4pbombewshrjbqpa1h56je06oqqoosby9e9ed8lyjj3gb7qgcnu76r6jt20h1c04qlg301ocj4w2xinpbl6ncphchcbexq3oi9io0t8xeznet68zoug07vwqi575bgc3ktectxdie6ang5w9ifly3i1fg4xbzhbsnuopr9ssye725jnatmzdpjs2atf16xfu618cea2ay8ha23k4oilhx9qf21zrwbkw3i62e7vv7z7fuzmhbery4fc8qc0iag8rm46mfnh20zbrk2kr3j34ntrqe7kgsvyukuqlgr9g9zp84nw16shchhxuktro75lljiwnoun9i9o29oqv4w4bld8anryvomtlfsbilzoiho7feoex5hpwf33hcvn1n34g8nstv7vet7ao2s4dfb5slxr9qer44e4q60hwy3eu77gs92c2i3qo6fh5yhr5ikog2lbxeho3dgnsh5mktvlm7yy65w6rtf0ahr4u5vy6hzn6usxrft0mbxrl2y01re5rhsojsj393n4duml6lkvgjs91mlhv32xr0shygxx83ks7hoxo3hdy0g30pyq9jz8sdzwvixuqb97kvc5y7q6hzr4en5eh344ki7ts52pcsl05x6iz3d0y0j8zh05iem0xuwrjidqek049n8ayhqonk91bnmyav7ien5tf59anenmyyyfom8onfo03yom5pjsm2vpgfyd8h7mk2ygsev7cx9wqbl9o1zxfsxg4bsdkjdwahylxw1vuw7vgyt5ene352uzjgz55kwck8oirs4pxvar4tf7xflb34oriprmwkem11zed2tt7dfskl1ogti5mb7glp4zb1rnpkqltviydy6rft9w88iitcujry0t8wluulhbedk6wevbge8rtr3r2g7prvy89ue607rrm0edyqww8digjsv3zytgv6q38ouxjfkt77f1rca7j6gyhp9okvvqe7qwe6mzi',
                expiredAccessToken: 7735829114,
                expiredRefreshToken: 6052196809,
                isActive: false,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                name: 'y55dfs03aeozjelw3e8u5tadnhypx2ua0a02h7x93ilwmsuhlqfa6rs4id894j5sr7koq6477up09p50gn0qb9orts8952bi2y2gqupf3dvd91e3kpahngcml2ja1c5uddm0y6dwe4jgxvxhd7iv9nt4ao8qkugpta74qs7qwmljpyebez1ivgxypzy4e7hszeqvo0mmi6fyit4fjnluhg7mob8dv7tm3ss1gflbbatfjg0m1ctdn71uxond5wy',
                secret: 'jusuamp530czzki2q8dgoeug4apzuiups77p557gh28myv53ha8o85vmwr1fnbite0h39gpoqlxlua8epun6bbjndy',
                authUrl: 'w1hmkj8ua7ph97w7hw16x4d6n2k16po5kkkeeycrd61clh1yxye5f44c1quirkto9uri5gy0ebdqfklxirs1wgslkjtvia3fd3jnpkxf5rlgcsqpfwlmnvqdh9d2sk0syd6j7aqzz5qq4xwkmr8858oqfxz0lbhn5db60evlrcq8daz4uztp1uu5c28qqc59b66u1s9ulc28o6opuphaam5wpc46496wi1mcv6bzi8qfd7apng4oamphxfvsdbzmdna9sch4ykmpttjzll7dz4lgqqn5jzqdyetl5q3vs1iqub3e3kuid07cjiucgx8uxs5bu670lrnr6cspdwuibu40gh60q8nmia70kqz9lbt0oqp25657c2jbzr9h6az401sf2skg41u5s6mj5o57yx7s0scfyszh6iqzaz1j98fylzo329umw7fa4yhovlpdx6d64e0ug16hpw6j7od74sgq4q5n2s1wn7s4oo7gu82nhzyliqea09eat9q98zpz10oho8pamtqu4qwasl9z371b89jfwfrulrawc1zedsui4yq34ohcnzu6k9mj45qa8gn8qd5g9ptqb08yk162oqsprekzo2eqluwolffd8s6gsjh1vbn1ww30rhahutgtbcupak0i5cb0hgf240jibc1pmwa8cg42ygpc46qoto0r064n2xvok1pfhe3tvef6zni4k6f1hbtvloz9yxth69df0o9qfe0b8xbzevqmzmd86lmm6nkczsxmdjzn4ob4ss1f4pxs6uuvcegzfgjhqr2smfguqg76mz2hl6o9xq4fe1h2fymqx235eqxaeasq2744yduvppgvth3zsf9wh6aey6yq0vkz81i50i2bk43m5cu64gxf8svd34627zcx62c2guhrf4w9egshu701romeozog2pef13cfuwn3i8ml49a6shy60rdvw8m373sce8v5op16q48kk1azkp285a7ggx9cyd8w5bk31vkduji2ji2qyv8yiouhxir3nqfagx5bs48g3ox7seze9o74i6qdg4rpa62yt4un71we3yy2mi6xycybmw1f9mrmrmxmflhj4sfs48n8hh40s1nvjf4zzwokm38z6t7u8z4lz1w1wt31vwrqef3zsmojkka4s8ndeod9e0f3q1nhwbpy9606nlpfrkffosfrn1iiqjzj6rpw4uw13li6qtvhzv5l2zepka4wkjjrl9y7exn2dymcwrjuup1mk480sh7aczrw3ph4axgppioqsy5esw2cn71h0gg8zrhauq8chejl4m3x3h4cku2mwaolxpohyyzo4w9hezjqejobfdiff5uwb14mvpeb3ouokkz6hsuami537w89bnq3mxbdj5spot4nrznc536hkgw4dy00btdygtpx8y6g09qqxkuhmuzuwua5526py4nczfu66rgu51lnuqpqe0q01qqoo7hndyyjc18w863j1tg1ktdrwucdiz0k9vf4yrkvt0vo9rw23ktd1ruews5ozv16sy59pvzr1aim4lmqyiwplhdjlgcyqewrqv39zii49s2if1b6folci74vkvicnh4atztdk1nh1vrswkbu5jnep600r2fy41qgcwgj3uq2h5raj4ev3tslcs2dzixv8nq242f3yzupraldgoc630yg053glveeknkvdggze9a51bbo7r7rekebujon5f0kkcx1mplilgqksk00qe6ebfmr6ptw1u7iz0rniiio4uhjgwcmbb4b8xckdolk7952ofm4rdqxs83ka46nq02iiynu39mfwha7rocazkgwk3ncm9sje7u3se6as03hf5x2b6c9snhxhzsnowt22ebg3zmrxkjs2lai2xx8ln2q9jedyedw0m82w4dgqrtj406o61mvr3js7py338qklrhs6xvxe9d0c8mbgmms24ukafbrg3b8o9gx1vymf5ggramd480bisdeodoo09itbropti07465f1mqq20ouuceexwl63blclw08z3t4l6mp828yx2ylk5sfvkad',
                redirect: '4iehoz2d4pf5csmzqz01j4oy8uplj99g41j651ivwt6ihnqb8hayulggiq5c6xhlxd9y2yg6wyrs8z97e40c9jd3z272sk9nrexlloh6vs5ftpvwodqwhcl77vc99nv393dybvil044g9x9utwvpzvidm33qy0hzpuok5m5k3kwkapp2j1znr5fskedsoemeo1ybwz1luqe2m4iaz8qqq8o357y40e9ohl1575rh1j7j157yjqc93ez040nzcejcz21w7caxq9djztdui56t8tomcfuu86ygddd85268gdydxglfe1bryqy3tlptqbymf1l6r1ciepv8qscknku5c4wslp6g30xvjrm9i0mk1zia19gyafzu61n6ubxs0nxt3d085q89bqdmwysfniat8ne6kwqyua7rkhlg08otexbh1dmsmcxig71wbb29528ual2e8od1zb784da0xn7y4tm8ijltcc7zj5l1qv4pt5fvtnjsqgj3iotetcrv3xkxmn1q89zf6czotuyzm09cufzhfuvo5xnaw936g1tfvxzqpwlaqy2ce5fs0crmmcq0vsl8x1pl73ixhuk2j4eb7kw3kr2ad8gvyref99bi7l62s177i9b99t3igazntgoxmptxz8p9f3lc8wdxb6wtdx4ayxh14ehxkz4d8znddgdrs30f5qpzu2xhw7ghm0u5bwsdjy7okpytr5p1uastb4b9vyacml6bg4rgss5emmunm2mpqi4a49erkg7559hnxpbvlkjggvbb6drlo7akm8eg4h0mpsfs73pxuhqbtrnw8xnh8z6qka3dmiup1dr3k7xdtxxi8b9udc3q8brww9rpvrm61m74xmbjwgkwsx8wz3183ibpncnmv8ek6jra0qfz3wxmsuo7sgz0hizvro4po5kw7cqsonmke92foiomy60qk1n04ocvmov5zbx8j3xwoxuzo469htgf3aqwtfgoyybw6gplurwlf573mlonjhtg402uoyhot6vj8rqvbkjhierofei0cljig2rwuaoaf8okfdou7u7e5x2gcpbzcz9asi2o2gk56nhiymsosydt46xyh531dwb7cvv5w0jupcp55bktarj2uc0694ud9514l6cinaq89mkh50drasujfylc8i3swvnyq9gkvosz8zjkj8lb7k5dvcsy1y0e7y7oddh0bpwrsr5sc9ngd6rhk78lja3h5860g78f04xfqo9piyflzfafjx9ist9y41fk2ny5lmy1lcz7ywmknxywtdememi9jlwlwzfy6iakhu34g1bix9lg8tzhjzct2hdoywki8x6c0rsqui3kedwo4v86pl89l6ztrshbaljo60qutxpev3rq8r7phocyyx30e21lpyo5hndh5amhmud1190xqvpg74qm6s33e08nwvdh7ge9jtbqywkbnjl44miiwv3x1bkwniu44qva8d8ifgsxnddu1fuwdzkj31nmiwlk8wt9inlco8pvxjapeno2fxxqvqpmrstcwvg8so4ziceio4dn7tm1lo06x8r2u91d3plwz5738n5bwensilnfoz8e2pkdl5fzjs5ca2drs9dwtspkh4wufr4l96tm60tvcw3hq8xnlv8yj7fv5m20waot5qq7q6aojflb61ze1ij141n409n1gwicrw1dmxd5mbf1ib57cwsricpt2antuv03v8w3omk47rfz661c983c0h62yismlx72g4vvoi90j89lsunhso1aeswxngox4mfxgn2qc58stw2uv8hsr0zq69umgqglck9mcz5gam3mrnt972xkime1rike7difingar3crwjf65t5q0kug631ppeb3salm87h6o050wvwb4gkmakpqx4ci8v97vjequoj673ghpxwwjoiad9jeojfipo2lhsrjbzr3c1e4kmsdinslgcgcp7z3b2wani50a8qcwemitd6mq2wjy6t484y5rwaw9rpvqyy1t2innydqlk8oc6mnlx5he6fit87q1yd4gd46c5ycsrln',
                expiredAccessToken: 8530938993,
                expiredRefreshToken: 6730047087,
                isActive: false,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                secret: '8t2c13z2tzk717kp07ugy03cgnpqrui4na0zy0zbksgrezaux34dgfv2l1gye3d6ciewo1n0heddmfxayn7pv2dfl7',
                authUrl: '6o2n7r7b98x86kewsio8xvcirev83wsiyd6vdcr60jt55nk4u6ei97dmckzy0mo2n98harjjyxr76380i253jg4ofmtpxvkew6fqpyomlvq3g97lhrjgwzk31u5u29dma4km3cr2vtlglcpkpguh0v1jh54r3jute2rgrub52awyatomvhs1gwjps2givnsq14106z6zmkpz6p59kr0ewdb6qviayy8vjk8sou3wob61lr0p9n5t4n145ecpq3z8t0z3m86ztgbax2c8j2mwa94x4ubj2mfzk1ycp0536n4hfgh0nr4wlw0oukxynmg5rwtht1zk26papsxfkq01w4b9fs47du1rk25732lzb7ujppw9phbg64pyaw0t5a0uf4yiwylladz1c4od58c595lwi37l0ouxax03fl0s6eq281p8jj4dt03i15qnafjle254x210v86syyyyavsetcvxpmrbsfcxot43m2xc2lp21eakpk0jjl9yaujzno2pbt8ainrdc41mnx86amcmbrwbfwob68dzavuxys0u4qrez522ftxlexmehao3l6890rwcirpz421r5mq2i1lgl29firlof05z5e8cpkwhwgjg4zfcki79ml3hpp3tc57fdojod8rz8qllb1ywxpbnvsed8bjakly4wwmgza3lg4etq61fxda3ralc9hfa1xfp4vp2w3kps0jzaxiyzp6rvg64uvlzfi2yn9ni795loihpy6m2vscn1ct89g24jocm5zcrl71ond659oe5oljz87fkye3sulxyxegbs0w2uv884q15p7m1dxk5d1sci8hf8jzz9xygoid0oqdb86tpasuen6i7161qr9vncqp765ceodk827bakhpzrclcd3lfdxb8nbqnikur81u9clh6fyj58qvmnj89mjh72j02mtd3339e0efu0zvh9al1yuugna2uxfghfieopzw6wjv88i06xzphm0ou3phojlw1qqi0m83a23pecqblqvxcgymzv5grjk1h3hav6y0wa7h7qqs8gqutmagq5jzh705zyv0v3lvzphg022bnh7rchpe17bviu9bki2ce7tu902n72svnoxuxyqfy3xpn3xsz2iwby4p0op4je47xxt8k5e6mshs3yg67ovijm8r4foc7x7ibyhqcp48t51rtjof58gfegx1vfm6tg84hhvcoum3btlh22eywx9fqfxuiuw18ggq98aww32eb52lxx5jlgmjembdi0l4vdde3xia6krsyyeqvz757aw9g7rhwhc7uw5j9sddtn3etyg5enpvcpcm3lvw3uddf8os1nqrp9xa2b5celobrxlyw93examll9oc90hfymkhojcjlih1gz2a6hmkbiycaz9slo36l48prcuihz781v21lv6ga3c60pdrvfikv0ezqwkc6jcxxgy0geyywsr5v1rpmrl6u9uz4ypozhn0ngziz8qfdeqsyg2k01rj4k5p7hvvrao8kmz2214obe6firf2hvr7chljyvvgwecnsx8x0efi57v1wwgwap22ztaixvm6sc7yxy8lerr05lidvw7jqhn0zy2u5f7havo15pk9dp5ferp26o9y97fgbtgqej6r14n8h18nhy3fdjrfe4sjl3dz6vw41d39rz3v7h6qdb0679hv02cqyfmv8ijjaep5l0i6p4h2ve6v4owfbefwfr9z7t8fq2oa9asel0s6pa6s7w2v8mwsm9744k9iyl5vdk1j40j71qoysrgfemeyryg1mi6mqp7qmi4n9soh14t8bfyva5dqq009n0gbnvjgx5bro2i83gn7ew6oaqznh2dww438vm0p9rqih49qk8jpczzup116441zoy2hfxaxefmuwz4yan8hgrl312zvvtr9w90thfctx3iixfz9kjp6e29hmnroiu2hf49frwmwwy9shom4k6gpu8fl8ktzix2ffqk4u3acxxjfiggozjkeqtgo9z16b6x1mjrjt92y1d6k2kpofngjzt3fi88ciyhsk79e6',
                redirect: 't91kgv41pspeevxy89nhao6800ebmmms4u1vwx3qj1i36jlqm5en0lnr7oq14kygnvvkb4oiw8yxpslrprjt1hrp0vnh1b3ou5gyuvw9k3fdbp8xfsx4sdm48x24b2fenbya67kb4fo9o6ce9na67v7ocj49abl2bilwjwlsvr4nfxp7417ef6wxfm5ng63x6aa0a4y7gc750ed6y9kge219hr43tkxivxcaqswcnx4e1e74hd7c5rcbub2eivwsmzj5w09raag0qe398gxm2wyt10yqd2m3vdpenrdvr2bg2xq1to5ma7utdw7j8uiu7lea8xjtllc5qy41jodxaeh4rtxv20t7pv5onnno29bvthro1qwt31nnf1uq7a8qcxipgn8pbrlf4n4gnfn75vzl2osupc53dnx9g10mlikh81x9tfbajxwt73elekyuumzmstb8cmcagosvtmbwtl86crbdysrmo6kbv9vax52avpzbir5jj5uuokz8bq866sx95992uw2r38uvsybus0p1i7uucawrjgd307cb8flgygtzcwsx0t42txiqne2wsy186e7vbk3as94ehiepfmdfj0ruziaosp1zb45e1zg694632bv7of5talozj6lu0ktadjd2r1hs834txbdvtlap4ihy2nar03b6nm1firnzkn3njn8m7q5wsyqclhuzq59phqpcpzvf4g4zsahwxgebypmhujnucx20gvmtw625phmtsu17bgx9s2q9z540862p2puqulka6wpdebh9hcvop9r8sm6de6al7xofspzvf7foksr2pn8nxoiv7w0y4u33gjdjdoiuc8wn1z9dj2yomhfi19060d3sjbqjgcrxg6i0g7ejocuelhxxtgl21x5pmw59b5ykm9p1kgqc1lmi8atqucnbzhc7cbb24q7heg3w7q8p5zgh8eh4opph0mnixw2vvq50ttzfouq81t6deppqq3lj34knrlta8ucmu4vcqqp6mom9agzks5jin1m2cc478ntv39d79997o0ladeoeqz7x2w6v3s2yqq04prvjen67xvkwt69blhdbci9kjh5tvdl17me9015g83sc7qmx8hneas7q1z7tane5cgqby67j2nk8ihtphat1433lk3uu37prvn31hjvb4ikbmlszkluglgg4hkgggoqu4wogmzz7farvbwvej82oxi6ucwr7dynv5xs7ndb9arzrwpcqusf88sf36k6b6y5gc90mnb6ky0uwmjjwf4dbotdrrdp7n1ztqqxkv0nuwpk6whs31kytm0p3kemtbvg5v14g7ige0sz6rhpzi2icoln5fp6zkjk9ptz0i27vscdij71kyz6mb6z3ot43x5kqbwbevo452l2ichhrsvkxdwhsdm4ba520tv9bfiwy8id0jmufxavucuhpbztq5zus727fayjz7fev3u0dixyq8clzeu2j2clnczggmt0vf031olgqlr165z0blvvfei59dfn4yjk1ay6ff7vuak8vd6qoz16mexv5dg8cjgs4vign7r7iuetu27weg6s32xmpvb84bj57skgskwuf2100z689xtyzfoza2eq4djkutxdmjzemtwf51ocautspbd79qg12vv14whtbqfhjy5n56hwo1ybxciroqu85y98a566haq2hbh4iin057wgf2p17yercs72ziv4tcsetf0h0oj1krslq4azkoxkgnub3vunrg7g8g6j3azlhnbn86g9b6yxe4rnr16kj9ca2dasdzt21kfde4a9bi3mvp1z0pejz4de8bt9123gnulbmdh9wxta3w0onwwepy9wp1wp5xdypoat6etjygml5hjedjueli453mtqml67cedp5euw5bs3l9mep0i24ah8j5q0ekfqvsdox71a4zdyvqcurj3urbjdcpetbmjuqteygveyr4ku3sws7pbs3g8u5shlske8ktlspf8l38u5er27j06k4wt660vk2gti9uk4ycq1jxb48r2t9r3cngua7m0gr',
                expiredAccessToken: 4453536252,
                expiredRefreshToken: 6306619739,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'PASSWORD',
                name: '05dzvwqtup160h3fxo1au78cipbgqwxivarxrdnst1k22my26hzk0eycmaehqje5g7lbnd5rlzyd0bounb5x26loj1f2p41oiabgp8w6j2ugjmk7o5g326rsj2e1sf235cevsgemfcrdcmupv189b7vfmw9e7idqvxx3unr2hnsagocvgd19nqdo36dkukq90b2ojes12asr1vwubzhli6v6yxsq9kjm3c88hthwomniiknj8bk5ktpcrojsx8y',
                authUrl: 'nn4f4zibskpozv0xftrt2b22v5vlf8pmffvkf6iibxsyzhx984qcuph38102qjpsdce8sbpk8p2xyzx99lkhlmwvb355tnukme7cacerk29cizldfyqpz757sr44klth5kfi7p1mjqmf5n6h1dx1dgancw4mzgr6af1szm6p4g6hdm8qftyjm6uh0gdeontknro7p2e88w70u4m1ovlxj4ynopt0wgkqxmmga710c8pstq9lt46tcxvkpvuvpnrybjmw5mm0vu46m59w99afl2f462cra7brmm2yt3hky4i0niaxfc00714ocicqkde1u9wmospoqvejecv66jnr9n2ip9v851gpp3xxtfmvpkk95bw1eyqiie4b0q0zt06qz7w3vi89bzwnd69m4w2j4oigkltrcb8cqj2iq7vxljga5vejdq13h01n4pkrwa5msl051let340do1gdqi1ki1leejh678rjgpvvzenlchjgmnfl8pmzez7svp1bzfocjttn66e3pgbah13l9p2seq1cqnma84t99tm8dom853wejvyqweoc7i246v9svdwz75fsg8hlf24b0cc9xewe6ohgs1g9xsvvrbf1pjzwv3u6hwz24z6a0vkbe9mb6wcbu69e72v3s7xtylgkb075j4xamx5n6i19fth0hz6xwoyrlotpq9w54c01kx14xsg346jjiqgfpvenecx9rt6w01cfpalj4p6wuk2z37zh38y2l0ghe97jzokfvoylefx6jm6iy5n3eksrf689gscpsrs4v3to7qxgdxed29l9uzg1jlosec347zx2ndtfq16cvif1v4fkfqdt33q5rhqebby9xyolsvlbaxtem0nrvjj9obi29o6j8l52en9l1923rkpzyyoi7xp5i790wt94fu1pwl046947ku8r6we3aj2tvjv6db437j9uqha0p98zw20c435gi4t6iu486eimii1gdpze8w3f9pxeiblusn48168pls81bbvyqp1b849a7gcy8t0ahtms47bpfpkek19mgvm9bwdwoarkibxclm43zwoaalx6ozj5c5gn6ief8t93afisct7qfgz9mkzu1ibx0eitb2bpdt76elgmh0tsiqvy9vbih52st98hyde11g818i3cw4wysx961m3pskj3upwzpk1r7q8rave3f0e86y62su96i8v30vpxzp4mnkdkhy9vcyton9lmhreriqehx4n9xps0wntv28x79ofaxhznuluw8c5l1s82yaaflxzebib4vkzzu7d6ji6ndqtb8u4t7ykba4wtatmftoa4zi7t9temiyqwfjizuo1spz77tz6w5adfscuoo71thpqwe3huryj794d0ccv9fzfkol9jza9od0by2h8qach59dgk6o5ixtpvowoelz2rz52neyzfthasxu7kaucwfgkcqo6ck6x16a36rhk4m7wvzcdlpwap6414zclpp6cwml1jhbzvebhn1bqkj1l7t6hjp06dxf3gwocdlzmo5eojj47mo9tr8r5wz5zlfujo7x2dp7l9us9q60hjj3aq9jchxx2npnp05kjw0ijinxea3unbrly2ca3gmhkboo0l9n6242kzs9a6tt2zm7fxxrlu830jwrzai1wvz59ggvrtygps0ao01rpnqwf59cykob6wmbss6mnk2f715byukmmv8ofez4eoii0unyvo6uw4kct7y8ub9oghfnj8a0eta0ic6n0ri109aot6u3cl489a98zhoa3p88knyn3cyuyfyfshhzmfi1j7ikyy8x1wuy7hnmnjkl9xbqjh01xov2zl8zazq09f1hevbncjm3whp7t3pzaq8cys1bwhx71pwnogqf5epythhl2cprfoyqyu7pozgp1mc8leil489v9uxkpcank0fgf7t417h8v69oe2zctyqmcm19pdov4xuzr2ci7hdxir02xpf5su5jkzkkmm9b8vgq9nwxqrdxjxxgc0eg476iq4mg2tn3wd6keo4b7di97np7w9gpr119j5',
                redirect: 'izg5utwicy3e5lkdjtbb1alk34mi71ek1lai2u0y8cpl668p9r5vk1cs43wj0potk2ew9hpr13f50ms4aph5h83zkkmsd4aykbupswcydafbqvru033tamk4erkdsc9el19qlinnwuncpa33vh43vi627r8hs4fs7yojkp0cuvjhtmkjyrzcd7mn7eqzdw0hu5ouq5s9wx2yhu2g4ulgmwjl0ow24p5h8guklhu6hz0iaen8nz7edqy4as56rfkdqczjsq0b41tfj3xtkj4ufw26d4vl29lxy64ryovzn5hrtdvs3pefzbnwedhq8xp4fdmn3uwzqwz4a08ccskk9o0py3xgeivfhfzzbc9ffxlk5ewjh6ot9aletv59t61p9r2dlwofkgt0izicshft58wdjm1i2u2hgqm3mrnfih0jkndnbep19wykbutzneihxv8zbljscerr7xpf98rxyksneno7pnwebnx5lalri3i35odgts3v3nl6xmupmxq02v9iy6dvthp0o8a0onmmlx4jtlj4dojf2vmb5u8zyqnlxbfueepdmdwddlvnc7yk2ewzyab0lop5cjzil410htbaxmts4em0hilsw2vluvds1np5qzj3451yxuu3y818glto97zclox7xuyld2btfslpvpp1hqgogjgwaqw4sat5uv34cb924q6kikwmp4lujdoy5dkyprpbkdce459wpp6vlhak6chk3aut343px12042cv4im8sdf41j9tvm25pkf7mddcrgo6z89maw1o1rj8lghastafufx0p7z6ga51p2n75aodam586tw2f5x462rsc9zry2c5wdbg04150kzkv4oc10qz6w9svaes9hih8kldo9jbrc4s7xn7p0dllypjiqs7ui91pmqe16efvhu5lpnryjom9mxu3t9y3pi5xej27f7xn2cwpjwdhzlyt0qd2tl0n4qy88jqq0ydeq19zj02prnabh2rpuwhe01un14lav0vdzdczjks1cbqbhb4j98wa2e06lmvsh7od1ytlm3poel98syasnswj3d0i3492pq6olngbz6w8ub36oi9r5pd4nxcpli434z11q0yxohg7e02dy0yjdu0dpxyl3f3up1xtji91zhgjsflelt65g0x654onjqch2b7ndr23czip7ucsx7qrz6qouc6o5ayc2sd2nuapa40h6q1iprgpzsd4aq5eud5qfh74ar4yxcgjdld3v3jbj797zbv0zr3o183dinaky92pcij8abtp9z8eu9ycfmv3xi59rzrlezgv32ypya8hu4raamze7uzey2qxsab99itucd0lv3x5ruh3d8o43wtlb9x656swubix27do1nlulwbp5qmsz8xtgpaa776pwnmqw9r59kleqe73xrlckb1sx2xgyoo9grbbwgvvcsw40uas0a7w7a3uulu4xbsbyglky9sorcd0t6f8pjkclnwbp6fbsh3rer1xdkqzvyv4fve21noqjaj8aihcplvfnrk0dqdpfgcrfpmr2dhabiix4vfzn77h417mrkpt9turdpznoqps689jyatucmiux7zrmm1429xa2jfv4c43xd9xkpkpknzvrq6akpzrrjvyxi2oq26z9zp6arqjvq78fvmbt3ah7ohurogut0qidnwbp82nvol4mjzhi79e7x894y3r76rullk8ok61g015wy3btpxai9f0dh23q9d6urnky0e96ewjfpbwlk8t1x1kjovn3vs4k4gaekstyk0l1v81zj3jyr99mwgbqc9q5l307kyfx1qww75cs2d9w4rwmuea8fgnjkk024npmkuvr7xrzidmb377owdby9d6xjbcghmhqasx9fvotla5drof3zr6jgt4timkv52dg643eq6njoio8apvvv1pdljpp7oad4x41j6hj0dxugwaojyd1ghw6d8ihfhbv4mls6o6vl573lddeifnnuw25z9dkmj5evx9hj4cgqszlp6bpued9087qzrcbmlpqkxup3f9nxnvkwq',
                expiredAccessToken: 9036679138,
                expiredRefreshToken: 9539222662,
                isActive: false,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: '06iiejqzalmo5pl1n3898cqa8nbljsqmoo3bt5ok6sdi9v3mhk2fwl77wq76b6aejpy14cher6v96u0twe6hkxfrlvcs55fvq0xwbhf9mxmosi14dw3b1upjhm8b7htnq18fhher7xro9oklsbcp044w8nktzsh167skezljppsazy3i9k1dvvduqnfk82w6u0cwrw8qb2kv6pzybzgntal2vf55i23hx4vmzsgi5kudf3t0pvrbbeuivsxy3ty',
                secret: 'jy8wlduwukcxwqh7uq25ze183s1bma7msll7t9ais1n5x5m2mkklb879kshflwosj6hxtjtqf4m1sufs78s1whgyki',
                authUrl: 'z69ohnp6iepr74bkne3256hc7a7u1q2rlkm1yoks7ve9270ei2pez70de958qa9kevj43r86l8pjgbc4svpndeutuu7w0tyau3wd63wdvdg5uz97li637yevg88vtzpy33ce29n69yjnuvm8rkqjjx2ay8raf1wgaj2lqcpgxi2epcg4tndywikw3z1i6w7loahjb2b2y768f9543mudbjssver7tffojdjpd257odogarsooxnqwp8sfula3mff7sxd192q3ik8ixtc3743bjq5xzppx2rpug1s7qaa71511f28a5lnhk7cs38yr546tq8pusz4a3jihc27q80jd0nuz3dj6pcr2gtmi9e5ityjgkdfnirj3ukp6foe4yza8howwhfy1si1ty1chf5qoq2pt1go6jcs8cxup24uth2bl67lj3x8vzwaw2ww5euuj99xihrd92br7xndqo22qan34l9io2wqxjqanp5lk2mjznpuuk0sfh9pv1qltg7nsl1ri0vi0187cl0yhk22smojpdewhomi8y3minzywo1hrn821u26hehhwe48w9rwxtcrk3dep588k2s4okvqsex0ny0eqizbsviirgtxgb09rv8fis19gw8x71wlhfuupx03b7sbft17zxgyj2ppam4h73o4mciueogfdbfxo0jec2cvxyxkhqvrfo3gomugvpa2snphfiju1rg8ss4q6c3bd0xwq9q6otd8iq762f7y9z7idq09929m9lshe54rk9fxp794k602ao87i6mly2yg1tvlw5t99iy2dqgdcsg4flh6ch10sjaeak5t6byaob8trh90d7rg6gwxe4gx6e8mk80u2pujbmsi2h5lbraw8xat1mrq3uag4y6t7r7c16xuksesvgup5ygshq5n0abh4f5icb2k7k00u4yzroatwzarno8hcfe99czfso2jxtga93b3xlv752gr2ndi9dtkmftispoe636h2453q134d6h3tf121gndy3oa1adnfech4e1hlpibdl58rqrwc06hbvjktzh5htmwa5rt598g3ctwrc6e89s8fzske5muqecznrkxqpb27jq6ot9oxexw00iz07szxyut4ktvfmg5x513ftelkpn8bk4hw9z0mzvo2igkvthvvg2467oujczw7icppk1rlnaejg13h6mcwcz3i81auow8gq2604cqvjobgvh0cda517grnlfdxfemtd30prdg82p0k3j310n8heke6snzrbppkl42ju9blwh9wgalm61o4nbxjce0qzae8m3oqbc40v3zav16l5m01x7ueyoupj9qy109bhlxu34qyr95q9fws6r1qcrni6t2izhra1zx13nyy9j6tkpradvfvb1n8ak4685wl39p6y31l23r36pkfqd8gmytusdjkz1h973azg4ij1o3hsb1erv02tyh9juf7jbc6ulyf5fljqg3ktxqe87j98manlwy9x8ixowesuj3p7nriqtdikdjrkmkjgch1ykctfrwoqlvdxqwhszfzt3b8h0cx8bfxc0o7cu96y13n91qlqcduh3oa2m0fmbljqpmga9fz6gqt3v7rq0ygmr6tgj6g3vsxg7sijui78bv3avhubz27wk5z3e8c807o73miqkku57i9bl4b5ipn8hhd8ovxnkrwyqw5giq0f3xgm6cm0qr8pb52czz19ypa7blddgo0eti53eyqo8dx8ml6n8n4yt4wszmc7aarg2nqhvyjh259uke5v1zuq1beke2q0nnccx91dqy5vr2dobqgicz3pgmu7r125iqm7s0bvw59gh7me1k8qneo18x8xds7bc4ylnmb6a7f2cxu689gg8yl8go7f08dfq712kq5phsv62khvhn628vkytmf5fgi20ax30y3u135ilbeinjzei20qs41vimwc6gta9f18rclh4e5ijtx4x8vgzy242sk8qaa349tlm61znpb2iaqaruybxgjn3k9xmtjbotsjym8gf2m4xj6devnlr3vdyk80se',
                redirect: '8axc7miqv1mfol0gqeogrt1ioudmi09s96vlef95by3sutt3reo2lip2fftpj6mymlzzinjru9bql1oe2ztq706ablwh4kzantkh679milc525buucptjmg90iadtg4p1u8b6tk3jozs3huqug98zs3x4bna4f7yqozw6e9t11e8rc79stid1bv6t9djex13exd0bqlogx6qdehijbnh3jz3imq6427nq7nxfgmdsb42w0wc54ahh0g11ptw58upo1wtyyoxkwte99xqgkddrxgch5x1o3u221v0e67t9ya7qae59m28ow9r6o40s1ao88n16n4h9jgzcrrqfhhm8il76fgea7g8qyn91jvfj65tiq2d09000bjc542epuxw28f857xbhpsml5zjxj7at8q9pfesd23orltdroq42azrmn1p5hd8a6pm2dq9yga9nvv2nthaswqff16lzj5tgmvzqklvxhpb3zacey1wqefi02vujpspwgssqg9nwz8oe1a3qy7n41cbx6ibnmgs9o3acclhzjbs1of3vsltoewvddwqu0kgb47f8oj7ren5hpowfwxefqe6kpvgosnpoz7lr57bl3912y4h8zdft3z65ldgbm74wkdibl07i94fv90zxr7x5vmwd4ys5ljynl4c6hvlitgmw13f6k1wlzveintfkm6j0zypm9cuf5mbdisf0os0pcxka2htx6kn9g7l3p25vuyndv3ggifsg6v4p32q66oemijnt0xkrfmjy29x5i898eia9guamdfy511610flegaln3gpzd9jw2gig84jwucbx9dsc6q05htyjexcjciuzdk0iynzvp5mza85ny9ga75j2c45ii59q6z8jdfkydl6ly22s2wch2xcgfaazm0cty8xt6965xegfplhg50tdjkuq998let0qwtpcbvpwffufuer03siks9wwvwzlk0o5o1zkw7gedd4zxpsqssod563h7mfq1mof1n95zf8jpvr3xjn56623kq3yluu4wdq6odzivzfivkxd30o9d2r0kc8ycwo9kf35r9xreaun13pnk6atqavof5l436qci6d97m22dazw2epdjmhuaz6ltqsfbej66xlarr3vw9zzp81efgogerj5oiumsi9wynf9ltwdl1ep93zowv2lpncg5hlfigcttqcjaw20hyu48y39j2k4l7scgir33mfnsif5tvgz7t2q8l42oaqm6t1w1caitrbuet4f1p6mqklu3r9cfxhyu4308ob9mlfwv8o19nafiljammteouflxe9plphq3clmdtb8roega7084317o0izinid3kfx0u18gabpcz753bpf6kxz8b6mwgce0hrtc5z5f9uidz0gsbyirhzfeo0h1pu3ckuju378q0hsm5jxz6ugr6shqj8jux568q1gzbr4aaguizvg0ghp8wu3hzkz0329zlt8nv7a30grfohmb7gbsj7eytejx3xk56m915zocwe5kegzzsmdqjvt9h37pm7b0049brxjdki210flpnkru9u649a3v99bj1nahnrt4k5pcwx47gm5ayrixz2bef5125scl2qzh6zvaaaew10g1mpesj622n8u0w2qdagzc5sih9usr6by4aew3ai6vyt0pfh6qnija5t752wataxc2mh8gawm06st1u7iuoek0m6zx1ebb38ukvbd83ro2oh9lggerf2rbshudhxkkjhip3ihb5ro4ze5kt1nfpah0czf2zpaogkzpf1fw44spwhe7fjnibet5wb6pfvgbrr95dcks7wr8igt9ia5vctta478pbbwvuwoqrvgaxkkf9uj1mljyrrjj2psmj5b3u6ujhr2edcu3iahuen483kkpavto6rguwxv9hjmt3tjwuvit9g5eayisnkirbd11x3ei7mwyg9pld4yvbb4ei8ht0fzbntdmkgmukruwdta4swp5mls16u5ej298717nqmjlkrw2a8x8sslvd1yfzh4bf2s30eh649i7r65tzg2mva07j4',
                expiredAccessToken: 7117547202,
                expiredRefreshToken: 7405728762,
                isMaster: true,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: 'psleru4oeq5qxxwvomvmseyg6qea99sbpjjl8zq5cj0uamug4tvurv12njx0q3hm6okgj8ih2pea6c2ce1trq8imm6vayui6bwyil1d4hwp5t42dbvj4u61iv9hmra90bikvozplcnyj2nbj59iaitwhtjlskkdgo089zpkhhuy5tqsafhbkde07fnh10c47ko4sjm6qq67wh3p510e06ryxeb6odu17fpm9v3h24lz411dq239y2cnlf9qjjk7',
                secret: '18eng8eru5oc94yw2lyx6wisidmxg69fuoojc05plb0iuncgfzpxudkvghwpv6hbb8zgoyfoq5shefbnoxkywkr8q6',
                authUrl: 'f123qmhl87okdkcqqox5bzwcug9dvaf6ckggk9xbl0rjdnapjclb94adp9l5ip9yxl11tkvmui1gdqjkyios9sg5q06gbo3bejnb82glmkqf6o5q4y21xjon5crfvhfacaaujxwq91y7uxreaqa093t4e0o1d7hzu9n9zbgud6tasf21ks6k66mgkksvi2v08h3dxks2678qrx63xrbse641b3gqfk946hnbysgia8rqcx5fy7b4h50yfnfhckzen4nx480da1ud9v3qbsrkk9e3b3eepmki2gxuoosg8rz7tkwmde8fkd9gnsvsuuqruwccpg0c6ogqc54ry51cy1dcu4dz8y3rrd4ulff5h2q8kumezod7x5l614t3n4yys3yhk0vi5h5ad1fmq3umeat7czhrr5gmphdete11lxu0fjl2xecs05e6fkk5tyvefrvsk1pdutpf7x45fa3ccvr4un5mqroobxtikp7qg9bodlo2rp1uiy0gh7jthvutxohg7en3zvl6lkt57udg6etd0h702g5e3iab7emjd2uqwoihxl0ao1rd4mltstchlpjsacj42tj2oxp9183owtq5dpfgud59qpnf1jnxc5a21dp800o2bplbhfhm9t6n8qik1yu66bwmwfqf6y2c2vqu40d2s0u7az7i8ok2mgol0hn7duvmx7v929rzizdh714ypiv5e053jtypvpyyqjymgndgmyzsfac52x870hervpf6wmw3y6pilvokvtmza1p91e45oeyusp63ez078j5drtj5o9vc5t5eeigw0lfmqpa1t8082jok3mhfvyc95avltlc8t79gdvgok5z72l9q4wjpk8bqvyo7k6a9i3kzs4gjch3aabectwbnumka3bh7z22vd1t5ey4nswtgtm7254067ut321hzoilfu5j6djup43uufbjgwqjraekudwwcmd3sglm5y2nvztccd2jxsewjtqouxy7u0r4wijefqdo2hgvf0daplsz9boo78ecyatcvdfkpipi7c6x0plw7uwlkj9tq873xhxd0fqihviaseg8t5cjcpczbfyro5nj7gb3uxa83k76oix8n51wnvue51rw6yeinc7ois2wtpi7vuvnjltpp1wa1yi98u5jgt7k1ybkr2zonkrjritno4irkxfvgju0s389j1lshnaiyg85nm9ci6nmk9fdw9cnaufz9u1ate39sch31ngf0jio7r5n5h9tln26jzdr2ckj8cz2fwjhy0dklabirxje34tdv4f74smdih6e00wf0q443ru30v7ut5chktmpoxe29ha4djxv5j30ilhm78so15eanh7b3utjypo2ndmel93bs3w3rogquhwwg7ey80lfgezpxyz9a85s38we1yaul7cn0mm38jy1qxbb3f3xsa1sunh2khsh6czgu4isabskanxcoc3yr9ua6sdgzke3zu2tazeng5icwxo2ek1hsr5502xpzlgdmx9lpkumxovxum7umm3vubouaz2uokbbunl1e0691avcesim9exm1cc858lut9xudpr70d0xqzjhxoq37qcxuodiuiyahxws49iknhmidv85fjm9gol6wcgbs80k4zuqs31cx47oea40hckaqskbs55zohp9e4iqg87gqrhk8b8jmwuvwuah71ator1gy0v41gshhq5mpaw6cb112p6efi8eaxo3xcbon509n8bklj7u0fhycwo1roquie6dvj7ugbu2qzzcy4q0imnfnz2xjm2d80sort6vpj6jbtlysjjvgy3m1nmise3b9s6zssor62bd18huyrk451ytxyv8eb8s75humvh6wcpr6yhjw1337q346p9g2mhf8hrpwo9pfkp61axikrfquvq234ag64fl6fxsk8gipkw8vdslrewx2kh46w8pche6kpxbg26xtogzzsllckllk7278stlmkp5rx1qam9fh99pvecfiwof0dj1gai1ejp0v0e0di9ak96iy2yhgd00fu0mcceu31wdzh4xq',
                redirect: 'rkah3jsmnio23ot3668e8y6wagk6vwx2phgcx6t1q6s9brhw5v88s8lr8fhf2prtjhqyitqpnbbow648e6lt8mu4zb79vyh9z7233hudxviu946c20faowgzw3viieg3rgiakyv1mnymq0yfhwvxluix4eunli1xqjl5yjd5l0bdyvbmkyr9v45iluy67o7m7e4u4a7k0u811h7iqmhh1f47jqsf7w123zr2m54b9a1sax6hg9ak9zd5lwdvqaofgqbqz0qduudj8zu4eqy2iq84lieidi6t6637w1obsxlr6db5lz3erm3nqw4r6qhr3vdf2viz4ni7u7qkzs4nomzz2i4ovrp9wsha1zdcgh6x46041x0mehyd1x19za8b2p1ork79zny1w0v7fqchijo68u64k6avfpq8px29s2wj0emiqf2pbi0qh4krpaw6suh48g8c83d2thc6zoexu8wkdal15hi8zgdzdc9w3xn3taom5o82o2zzrzehjlvsd4hm8vy0jtu9fynsuwjay3xy0amtfbpdphbctmudye08uwj0a9vnkt3xqf6puxvqp985uli9b2ylfm481bcvyswi7k1zzg4t01b7irrzgx0cm6b41d2906wxyc15pk4r2krk8w0oguvpaayqj30t6k6bk5ghydqkf46nkz7k1kttjckz05m9ymve79qema2f6kqg33h43r5hmqsjlqd9rgm5k4ev3m3h3kbrm6mdu77bazfmdp7w693pczuc7up8q18fxw52mwehph0r9fguxicmfjo0iho233ctafxxsn8n2hrsqcsn5rxp5b08aet0a82dhoo6xysgsnh9co7vgh0mlks2ttiq3go9any794hf7jq91haqrblnb99csyv6t7o86snjv1v2d5jc8jlp5r50w2mtu1xdtvzhuy8se7w8d29q7v0sez36yike6h8n2it4vl31omif4tntluk16zawanburuagzj73cxe9nxfx8ghh3w5vpz5l351b9pkybyye62uuncpstfmbzyc48s9qbc0f4qlmzvl4srydeurqvncyhtgxi60h4swl93vkcu86i2dbra94m8hy65l2jkbkydyx6t2jj7rec4sgb003ffj2fbwqxry43r6q0efvi9c61o4kkuxqnoab18in3f2l5vo993l8xjkp2lurm9kwg4qyyamcls3mgs76lffhi03z0f68zfaurbkjzw77y5xps7mwrlxmwc2k4jswyja6fsnjz1nn798m690my1wz8i04ab7x2znbpcrienk5rxwi8nyab0r9blkbn1wiwp2l7raykhkm9rgpetm2whty2imke6e2w19fj2yrfq33x5prk3qy8wpznl3eyyb05yp1slh7rrzo0wsggvbaij1zkafb2g44u4cwfrg12dlv75s283er8xr2thl414mlne7tq01d89booh1ysp6hganyufi1j75nctnre387sf62y1d94jlc7i93jd9jbepw5y5i7vl56n7b0p7o8c9sxpi8hr6zm6f06g239kngtxmabivt12tgnezak2lckgd7zsuopbmpkxvbgdkph0oyzhqe2054tqi8zfms7upxu0qx61uyzpi5vafj6nz0vok14rko366wnxkej8auuwkbqstazm2d1stmsnj39luumf3198jtzouirp612tq3faca5pklek74pbewthfa4x8sktsvp5rpuvse8g0f3bod9igsw423sp21eeryimb25a3z71fgbcmqf5buap3cmmnq17cup8d4mer1l8hcliwrmwcp9kh7a7xt2uu7w7ony16vndniuzh1xts9q13n22779hx6w9cof9urjsyg01bkfdkwzmql8czu05c28j0rznwwvg24p4ivtmzldw0i2q55pkicyws8j7xi2segu4bav5xuec0pjpy45npxohase3ykavg05sr37o13fx9b5edviv9ojf0ljgvx2rzbqub3d1ybw8t4ycoy9is8v4wn84sbf1pb1zl51rym10c10ookp2pq',
                expiredAccessToken: 2636917721,
                expiredRefreshToken: 5958691166,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '765uc7qa28dvsfcnw7dlehixn285qfr0xq0wt',
                grantType: 'PASSWORD',
                name: '9y7dpaerfs89irymviylszzttyye6vx26dkk7s5lt2ym7vqfup8lcbpj5bwpzfxjf3e7mq2u5lwlvxl0s4yf6p6yiohmi3t1md78ltvo9z3st9sfz9zd542c7fpicnt56ys0t192n8etz2al1g6joxb1iuyj7nsaf6tlx0gd71muiuxu7emdeoxfvcabrvygdcbfj9knjpr7sih56ialmv9xvvbuqfjiogj7iyt763k8pym1h4djmzm2vvlffmd',
                secret: 'yd727as81yoya7nj457ft4bxbplpsqvpbo7epj0rseuagc4dj4v2j8ldb0sprh80ysc0phupc0gczvbg5c97ajv4v1',
                authUrl: 'ek77zu0l8my8s25xnhdaeejyiv84952l6tmwynv9bfy3cecb7t512bbvhmm7hwox1yiihgwu5pj4hxjh5ho8v1hpu2cx466jj3x19ja1xdl6ficwlkfpil3cvwn0fo2a64qj6rqh5bda5s0uxrkhjojrwq330tzer0pr3v46ftmf24bvtliealgsgqhmwfnk0fsxz0ueaft14f2sgajundosdp37nm8fimpg3od3n1eahnj85z5jq0k4ozzc898bul3oyg0xpyd8kr486ommm7lgeo63i21a7k35wsukdc9lazno136nd2e1ncbiobu9wxgzi0rjo4k9l9iuf40gzx5wm406z8y5yhfjc4dje7hj0i62qmdgyprl7cq1y6gn9f3eizvkdp7zzpiup7tutyha723musp906eotj1ohjt3nh8f4nd93p2rttm2422xml5psep7p0zqzwomj35bel0w55gf5yju9vs3q2e4hi8d8p5h1y090mf3px3rhwmdatjb9e7eij7ezwmnpgrn9iuxaxm5r3bs6dwbmo0r5koq4xdcixn4jx0demm2mcmtiwngv0v93lqmhywagydc8gxlupf5bhhsu5bcac5k9xqhw4ijjx7aa7scgwjis0z0z6g1e2j33dxuprelunuabn6zx848kpckebb6hk4cp326h5dd9mn75zxs8h19kp9wacpub7z4s03mt8ne0mx47ieal79vwsfw3bfatg1onxi7733hcrtuf8mu3zi2kcqjw54k7w774j9lqbk8a28f52cmzpguzyx8t9utfdycalm4s5k1nzxhz2dfh86euj7po8s6h67a2p54wt75ryi6zgqg85l3mziq13fcuawu352rq44snb51stdjruoybp5at63eskmk9nbgxs1zkzefneafpuksn15bxxrduqq9i4irsfoto8z3srr25q4zi7indngme7e7fz5h6axvpx58e5qwai7ubsfpm3eavakbnwr5ebqzr0gi3szwgdamlfst9pfp6zraztjzh20ryv3ne38x8znt0l1mglxtx1qq0f45ks9lz0np6a00abpzbcba8gj797e97q71pwplk6qq4wds5u6yqdqx1v3zbycohvixyw0wbg6wm2f1icvbub8bb1q5ciaj0z7z30afl5bhlxz5ug6tyiieshjvgeo18u2pkn4r4e950zqbsqymfapoowe865jklypvcryt4on8kxln2xpv6k4e3rm7u3sckq9jr7hcuyddpwaujdp9x8ooajnc3qfinfyt8t5x58c6dtuhuhxcpx650clswyrayakk25igicmgyr7h2wlx6u69xwmyxkzfen0q8w2bb84hpof15xswpb6u6pc1arq0mbl9fvyc7kppse1zftsy3alq0z95pysv8rqyjqz98v3kczxuadlk8i5gd67csbu6j8yo9ly8cqpbnwzino90y0m3zc2jin5kqlg79qmu3ibck813le2tc1a637v2kwcexqs0751v2c6ujquo7roon7sd86ngrksseep0cr3kmfmop32ggr6ge2ixi4brpqlnuiicsprkuestemkm5wydz5j8jw2vlurva56er0ksi1eiz6v212a5mmfzinj976qghj20kib010cwag1nntbnkmcgwx0q2lp99yxpzmz21tbyk9jq9b7ekldkn6xkjqpnzrg2t7rjb6g025nhimb7h7qe1fa32ey476ccw8axv55gr8r2velscrffhi76i2ztnvg3mq36hsaaf54pg6hfjbj1twdv27p93cv8uobo0taep11tje1h8jmx1bdd4y7kbcmjtee0qxts5drle58qc0g7d7yqzkcxwh679kdu7y33vqsibm7zoq9rx01vdjl88gqumcsjv5zatx08v59zvm7ka93w8uy1ga1mrs4wdhwcel4itvoc6gzumsbz4znkndzv0oo7jz8j7hluz8d50zp06fnccd02icm9lnylzhcifj3smjxc6e2i1d3vs0sp3h8edhl6od164ourh0vkedsg',
                redirect: 'kk4kt969grbjblyvl6ccmmqaowdey4tcfzfl6ku17ss31e8dpssdidfl5zfxye1uckjqtxbmminqlgvbny8g0394luaqd0r3lchqnvbz3ll14525ufx829orre71ibrap8mef70sz71p0chnjojxoo2m1hkudkhkphh6sqs0ee2uktehpyuzqlkbuils102thiwpdhk5eq2c65p00455md43fqqn59k6uuwfpnbzjoqgybi0p1jhbhorpqjwbcda2eo6yef70miwn14jsdxeb3xwf1v1lk5ovo3oj4o779gw93hqjxz8wdldct0creugj6d5c3kikj8wsq466gevtrn03zrt92i0on5filiktf733vtzeqpshuw7q2an604jfynj1kdh2wrakct4gsmfb6k9x5090riojvutel94wpibmyawoqkzv0cp4ahbn4snyz0hcc2ei83wylz9vwnuoqp1x5qi3xgolxwot9yi14ni1qqg8usu05fj7dt1hptlbzxen1l4eysx6qog882m70g8hr8zsc1ccvrednf040e8ty7he3mwd2mq3n0r8045q1ifdo4of14a82w8z8av07xd7rny16zhdviyivvvkjk97o63mxeypddkby1opheyo7kte7el3607383t21rkjabwalejqsbegw5wuk2b68th9u284o8cq4x5kkn9jknyxato139nr3to16kidd1iab35qq5qq4xj6q5kl14f4skalt19tzh1erpm3zacfmcz4ljgom3vx4n3r0pw0ubvhhxkvevqhn93zuimo15asr3btbuueexrb1kvxumu2ui8hdn12fbbtscqcwz0l2qnynnmgfpn7e9uov0a94lcfnsyqrquzakdsxco9ewqv96nl94zie5t61pt2cmk1hom83ouxy1x8nut0xr0z2rqamtakng0k57ckdf8iqhwf8g9me4nmsod7d3a6t8h0q914v3pcpr31vt53q1tosnz0yuk426ztksndsidxtsk4h6be7ms3hqm12atbkoel4s9emu53od27z234fgir13fqp5secz5juv11hsxbh9fgbys3y6nfqh7awc41z5un4t2d6sqf8xpnx15rh9ttagogpabmusnryzq45m9bd24tyk4a61y2s37t9aile9d9pjpk94de2n8vjbje2hire8a25i49kw7py1ze7hhkm8w12kow5zpsqntvlytx66n3du4wd59yc1org978ikaqh1x7kby2zzvipoyc3wuuvvr6j7z6fn14xqx4gnf0ksup7wx0r1933015m9w3kqizawq1v2as6nrwg1z8qcq00dpptv3gfpdypmiccijdbsr29mazzt4qtaskv7rr8m17ne9a1rsy4dq2sifdp0qnysnuro2dhlunhi4gle8wzzyd6wkcthhhsru0vrnpvvfxx53jl3xn91k1wjet2xqet6gi9tdkzw5erl0aq132hab1p5rzpngy0v5ccroz0ipppoiqxal5fb2mfusrz862po33fhsq8qr6o1dffdf7vboy4hc756a2dhuukimlanfvapqkas68srn7je7feev8lqqjeh2c4kryknrxw6fw0qpqdhvg6a10pu52np83xoosek6wpr9ofpts3ahkz65uyhfscoe1eif6u9rcfgysgjwndb95mtpc5fakzksxoqf6x9jq39mtcqerkfgsmtbwcyuefxj3iefcrosnvw7rik3mlba0fb4xrd4gnbkvfhx756k5n90y8x70bv3iuvuiflzjj6s897he26iasze0e49elil580s0gpocrft9bp9z2ct3cjq4m2f6o5bph4ly4jxui0acukukueqvbux9ixekhk54y3l4ijwhsi48tyryvn6fied35uutpicc2qqcyl54csp3jau6ljluiigy9uhtlxysxx7mbqsdajhrgagzn7us0mvcnlzp7j5dv1ob3c2hvr8ejenfir5lbepxyg6pz98yln288ye40hx1z35a6k6r6rty8b5sy4k1nva0f7m8hbx',
                expiredAccessToken: 7818026886,
                expiredRefreshToken: 9194397444,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'eutk039oqk3kme30x6mfcvalfdysfeyqrzy2y9eb1qurz83m658wbevay2lmxwne2np37or57o6lavf2puw7adwtf1y8m8h7srgqqpk0fijxfdprwgrn5xd91gvkpv3u6hqsj585yomlkmz6xh7fhzi5ut0pml54u07t0takfofn2r2aitc0gsoiuyvs7hqvvtbiz22zm2zquwv84f1mc3tl351n1o1hoqe7ilqs1a90tozxv96851eaclmgli6y',
                secret: 'hfxufrvote0lodiafpfskzkqo55zghxay65jvbeb1n1ux1klxi7vp55nupeoezrbvm2qb62gg8icwo7u245j5qprh1',
                authUrl: 'rnxdm5o4gpsijguxy7w5fv07gwiibmfnk1011gxj1ynh77gf8lwi7jwra72ius15zka7f4gwgcvsf6lt00itlup9gtymn0sm664v41hyj0wzp6megww46cjrsycs3no6q2hdvvrkimss6jm5ll1v15pp0qwpgos6zwxtsh2eub8ysg1u29ettjoa5x92f9j9yo49sabiwherj5dia9h99myfmf8hot3nehspofbb9actu72db9yukxohd7u7hb36d6gq9t73y1tbsumug5ldi502ote0ja10b2us80eyijjeqjiqx262tpiy56o569zcuqsnkmhvyh9d9xra399qo8x3losrxrpwvbaj0sfkdivhmj35uiterqxh47fp73v5p4qvnif8ripdvvweogmkdg2y9dhrcyzp9ivkvyikstdofkfbon7euaep2q45kd1rygjnemmic0fpclxrnuxpwpnsl3qrdjev69ua112xdsvqkimzmus75sdww6i9dpjqiik62ehrnrtjpd23qzdlmmjl9dndvz1442aeignx3y9obb12foan9586wlr04n87dcepepaj4s5lu7l5hswih3nqbwjxlhf98lt1afqdn67rdi01uok7bx8c3u31e4rls6t7s95kwyzf8pnhzw5oowpcwvwoe14ow0pwn6ebbhox2l4yrdpgglcb5dh5c7pks6cl84uqmmgtz7vg1xpccrbo5ampzghxud2ocmqyp72xkklnlaz6ymnwh9eox39up3bqlnb9bas72as8n5tr08r796s8joty3bxtkc71gfc0jo0qpls399u0n7qmprjvdtgzbohma63ch0nptevzk9spg3zbrj2x9hqf3l0yxnnbgya5n8zljhf4v7ksfw2qe2p2i0lo9qviakf4amt6il06w2vsd1hoaa031n2mt0tausbmgqs843e0d72mlky528q5gp2afdj3rber5yjp34tazu4uk3j02xh03t9rxbph9jk0gfvhainx5q8uzin0t5q6funex8qzdag1eqhbjfdsls8qemij2ta7w79ggxy5p4zpi6fswe3a08eyuj376bqpkum1ja9rjpgw56g7reig5sbgc1zl8k8zhycgtuxsllr1r06kll9rkqs9x6azvsnpz0cjmqdngjyzuqignn3v7c0xvls1fsktyj1ty1gfrb5gb6i6viagzr7git15egphqc0hq29whyrw9e8s2vk6tqyi5l6dao8etpzrox19orvomas629z70ij4200xmpsxmngq40xvd0ok7sjdgvpy87owsivqelytks270w9qyh2glyie4nzpnxwsh4b5vup7ejf30pw0nymtkxqzm3tb62cihnvznt9f9rh22e6fbeisifgi77mudxqh4flhvyjjp0p5tk1m1r0v3jpz1zp55uiwqnsjhanbotu9xhwksouib5cov0u1lz47ixpxwdggzmws3w5m9es4rnhakn3wh2cunymqwinqj02ti3rgu5qsd2t6tm8fzprtbb1432546xinwqh5rfpj2ab60xt0hoxzrm5sjp5n7wtou60dgnz632ttscnwd8n4djtn7jkzmli8ikfosq46vhwexs3b95kkp4pjot8dq0ypsbl6sv97unhplzqwxybogvxeixptey6cvta4e5itpxa98a2ysmblm86pm2w2487leetga7jpeg16dmsn5m9vn9obgy3gj5vycajru0rnd1t29s8jyb9ayca0165p4q3sjzxbzy7pgxl5r235mr9dk1ewow4kdeqxls6f3j48sw7ztg5i9h3mft3mkseosdugwxl62c8x7bzbnst85o3i763z56yw3pecp5e6qz1pd5gra35ew8c0rkiu8y2ns97i3cxyb2g74zlkmcj6vmccpktqpyuddjffiacbmxyv1uz9ilbnzzzy0f6mf7byzwnys63cfasrh1lssiz3teztwzo51322e0s53reoicl1scgflba0qya0s8ocbgfjhfb0o23p38ivwp9nsfcy21cl0q3n',
                redirect: 'r7bl7vu5mvtjq3ar03erpxspf0yolx8sjtito3izqb331t7qgpb9lfkad81asb8b272blb5ru386dlg6dp0bdnmmdft4e3ioy9v3td66oxaw9iytofs6fojgcug0u7819dotu9veengnpboc8lgcfsgw7egh2jn9cwr2vb89yol5k52mbablm9e5gncmlr1zchx9xyaqk7wpnpsdjx23ez9n27sxd36peia2y8ykz5v5b242itcak14rf4teonw0r0gphm7qeklvx7t906679rrdnaozz3pod4rlvcy97ipacbutxxaqx0baqg2kyjcgffc1viql7mpzol453yopt8kuvzc24myw1wt51ntcbg1nue57sv6pprawutwwiewvd3pw3sq8oqup5wxs49phk0bzwkim1vqamturddgw6rml90j9mrk48edfmyz3vrbfjdby64855ttgqtfpi82jns3nnz7t8truo52yh0ua8pv23gwpx8b24a8rxaimniu09upq5w6yuwr2b5ym36xrpqn7pjbrcuq9g3rv48px36xpbewv7qhzt2pt27flj37g2ybxhp5daxmaghj8pwmhl72cqhznfuyxdjb3uhrqsmlmgo823dxvefzwvnhegn5o9rp71rnzsugk3qxhcyhvoxk5asqlrpdiyi6hjrw35qh8tw4tmyp0qprpewgtqpp5qmmcnxzyy0mfj5k8z9f7mz8yq0gvsr89c26uk7uk54si2q1ymdqe1rw3xstg477b77j3ipu773rai6mk7fxfbf6gv61nfvpu4yo0v11kcgudkwy7k2ngocqe32437zvv7xiiciwj52m1huypqlap3k7oc3tzvuvxv4wgp1rtze445hbf69bnfl9fiwd15dpj90wlxy4hj8jqrhy2ayvyc1iy7xk70mvuadtxx2a2de6t1naipucwub6g1tr8p8ebkrzqdfledtyomp7o902reto0z6no50epvaes4kejqeu6y7quy0qr9litpdh88699zmk134fugbu7k3nd6ef6v02wzv68zp8qdnvr4dc72iku05oa9anvkeqmdo2nywqpme2vkf721pfxwogiu5p6pflo22mhy2vsktps2xq43pa0ahqwywmsgyytkwr3p3nrh24ok71nwjt8c7r1pu85c7gbm021p8v3ahde2gc6jnkyqfxazqsfata7pp9p1n77cb0jey0rqfago1j3wkl3f12m0bjuer8af14igh6mmux7amtegmg2ncbz6ml36rewdgz8kujn5xmdj3ieurr6avd71jav8ujr78m2s79ybaeg2oe23jyo4tiavgkhufrnznzfhpg02vifjfodsnmi4pwzjvf3tgywaso32te2a9beaf5z0qxauklib7kj08n1sr19q319d1227i71uosz7zn8y5ciorsogf891b1401s9mdhyv7prmv617sjmjbz0agivibryb6m09j58c33wbcrjyosyzxizq7pwb75lix4zuamikltiegtw9vljg4gurq9tk87snfzcnvfidx5babm599caireaxvwspaqj695m64hpwi5ropzfpqx34rhjbypm0llqhm1mhh95qjz6ut21h3mse8yrvrj8sfyj7qzw16doksr74u68x7kkji3a9nrla26d6z06v0fig0e0pxg77ah6ks8fjiguwd7jtifh56f106dlkms67n3pwc4owxp7fcgf6nbn96o3u2eni7dmpbz4fx3uedzl46qbzv0vfqay4g4hoatp4e375wbmqdne7bmbz7txil7gmqbieng8ftx4hmt2arotidldqzib09j5toopnq9oold9ccrwkgki8a53ewyckyuu0yzkdcjr93g8sjq6m5ar56sup607kdoxlrkwslimt9yzd52ya4wkm1klovn20w87djnpxm7vx1xvkfg11a94q7v7nq5xn6gjmeah45sbvj2kxtn1dwd2ke1o6c6l19cpisribpkmtxoeoz6yk6qkixfk3ip9top6rnz5dednep0zpvwa',
                expiredAccessToken: 7947828246,
                expiredRefreshToken: 9618350774,
                isActive: false,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'PASSWORD',
                name: 'xrbap2b81wwo6vl9x2h7dyukfnz583fitjjhdvv7b3kt7be0xdvu6yszv85xpvf8pu3xgx4otpad8gbcfwgzk976ir08at53snwqq97zjficfj97o3s06z1quwhy612mll24ii56sdchut0tfcllgkbm42hwzgmnxfy32gclvz0ng9oz686j2iekzvlao0ps5st6lf4pibzhyy79h3w9pk2kdq1ud21rfp3hhfp05gs1xxnurv03k698x3kyxk8',
                secret: '4zk29vlam3ty7uqoz7429wlxxjw9zb6nnlux0hwrnhinve657j7wcasy8883z8vvgvvwey2b3074vzw6yccot9e517x',
                authUrl: 'c5l2dmfp9m5nr3pp30hm0tuwxamyxt54g9sbw9s6x1jitqy04xnew7d5804nmd76qn47ijm23tkqclvqhpy7myvc9z2lm45ivfcaaowqaftbin4hgmvvqcrsy4j2nl9btkwfon8kklf7fa7l8v524r9hjxfsglf4a4vx0yi75c10yxcb0018zwxnrupwc2z3xvomq6e35xye3z48kebrh8wdgdcpl085jcdzk7fq0lggg8foarxclclvb56z0ztl31tvcfs2yy0rfz3nek7sx9cu17td0ucgdk21riz29dm3jxpi35xw7uvv8qxghlu6vexsazfdco7wmw1e5do5z4fk49bpwdheiv6zk8ntq6qom8c70s9yc37wz1r2hejbz09zi7zxl5sye6p31o2u7042910fkzdz9idvr62e2uqjhw796js9t61v5zxn82r06wguuikphoxskpa50sgt09bkibfuxfuh39qxsd42chisr1pcjealryqe9brz3i9yuitp2vmgv7lezkyxe1h2ei29r0x6n35w2hdlc3190bfjpsvouokbuky0cfi9jd5vy58xa7ipbkj9xcjw18nvr75uqx542gc95trqsh7ck5je15s305i82w3cjxdtde08yleduq9d7mxhywa6rkjewazpriggq5zxjyzyrk0fa2la212wxy99zgv9mti1lif21bn902hgykoipdhrmfilzpok25z15gp0hik5dk4in0ajvzdlkhnouy9qofeyho8p2j36qebu93aopg869t6q6z13nhvamouaf68gg1fy0crs3r6tew5n9l33upbcy62w1kprdwqr850dg5rvz12kyoh56vgbns27p68aswwzztj1y7wot3ed6u5qjq99vgoxhoz4qi24zyaj1kt321mxknzn9ug8weli5czm4ghrqyeh1yrzz6w0g5yb5y29idmzo6o62228193ni38lsqjbh71d60wig7ua7coyi2pg7699zcgg7qgoic9fyjzvz1brznmat2394pmtf9ri7j5ap9oi0ze29q0bu4rpqgttjgtxtkimlwqa7bucekxgjarqnuelc1wmie0fjvzllvd3yc7kchpleaszc7gb3s418vv89fk3ble6qko10o1r9n2gixeyyy4a3e1bwkb3kf5jtmkws4h4ol6bs180sggnx7i6r621f6id46xpixlefbl9tcfafm9l7n894kbumzp9mm9e5j5pd04d9x337cvh17xg0fe6q4nu1ovgvlr1cx5any8n047bxep7lh2wbvh15rvqieonm8aaosp3763sepzlqny3lnafq5dn6s5y60zgl04r4jtn3d07lej973gobvrt5rlkkwur0dlo6424k8sunfac7u29encd5bkmvaoqcmc6vzn0y3e3bsu305vqvc5ewr2gdenm5pgkdczf6prajyazki6fo46jfx6it76zs1syzgawuk4wsvjqrldqgr3egxu6kzgyvplbmylss5g3646u95l1oynin2i2w5jgjhcf1aalt2etwyu0d8pjt5bm1jbutbi6jd5wu0nyfrv86qtlft3ik876vjt6o5qf5uamp8yi7mb71v9fjiy9x3atenrejwazahp4e6d6q6twp0kk18h1pqfrit133iy2sddrf5fst7am8m94nnnz615moitcjkg4wvm3x2nszqjczdtdtlzo9wt8gwzo5wxzhsa7944kwrwiz2ozrpf78vej638isuqjinu48ctvoymuqljgmjix9fztlqz2f9wq8g3cn2lp3c7vncf54ij42jv8bn6enj8oatd1swinoqnxfrl5hj1tn179q9inyksa91f8ierloucvw8q28p2yax6qebvc8azbzzjm3hsih30mw6op5lavcaruxwh9cy73b56rhumf5ypetgux209pbczztgiepiam8pmoydud9y9et4hb2cdbohqdltepb5q3ettwx3r1a7j9l8rh6pn24r3ze7nmwasxt8s7knchxkzky9bw6bosyk2nkej74cqp',
                redirect: 'm8lf7jnh8i9ur80p307a34bbvjsf7tokfk0yhvb5rteobuciyycbebjb4ehnxs7sd7pi6n2ift67mppf1yijxs9dhz32xctqasa29ccjkg2d45jj4peyf1nxbvjgzvnwxcmgrcluar2m3asy0qfym9dpp8d7ep92qvndgds61pke9ocpkr3bj571bcaphits0n0i5s3jtt4roszfrslegbw4p4uj0twak3awdcqurhd25u6eetenwr328pkhzo4c4adbk35shyfxkz7uwsbqp3era0uiw66pokkeokx9nn1eryz0ng7q8axazpqxleu1r730ur0y643n7bv853fq99otq21lq0z9ngeo53i8fqn11m6fas85cjj7bxeqoddrpr20yj148tdu0exkpr2j0eg5szbzoacbla4v4t7uodtbeiv56zbo8m8v9u87pkniczr3diczicfyf3suxt201sgev891okvahtkk8netznz9p7hpetcbg5ujf9r8e4uxwwa865uldag2k0mhozvmns8c3fxosswuxe2br2s02xtwfogorlf9z6b6s150y9t04i4ohvm6xe6uvufq23ld5tisozqzb5n53r2tsql4nvonugkflrjvs0g5ashcpvtpacgs70s2uor8hibb5qx4ipavxqqaii697kq7bwpe4tsnegh39z938ceo4p2tb1smve0sue7ep6lvt7ahimr419ajpdqi6neonbry7kkh3ol2o3w89eupa6678afel1p9j87bdpny286pcyc0qfbd9xfkjzkpad1zmlrzbgdpfym5hfiunysu4e65ndvvhvsawl7jlpw0vyu64625t19c9vvj7unw0ravdlcfinyxzagprzf2084uppnp4u6qw7dxq82chxxr26hagai3z6flide0350alx0aqnevgj3c51uiy5c3sb3jzt0jo95qzvcyzjh331fax0trocywr3qo0zmikizmujage9xju97lm45o9cd3n8pilhzjr0hql1zciivwyvt9qo5mj24er13mvifd3dr747ijiojf82tfomzbym3wjczexsxqxrqjhgxxpdthfwkchtta39mvwuo7bsng99gw3sxc8of09dyqcmp8hy7kheleawukfrc1rgm0414kliypajs6qtf8xgvn5x3luqyxaoeomq5ho2a90tr2o23a34e57l10z2vdfhginlcuteidqfqc71ybznemw57drjtq5oa7tbt9xly9ej1k6bm241cshg6xwq0kwvw8qtm5ds0vvmx5wih0hywebkq33wcvhrdhrwst2tw1p8v0a5bksgbq3sz6zuwll8n22ntpi6rfm5wm994cckezcamkg7eo9jfs6c13qxei2cranwg23hsa7wybkofidywa1findvexbqov3p74fx9q8tcegiharrhld5jbpn6pvlhb6o300xqna7r0rbllcmi010dz4pg64ovt1dpp5wr456j1shysmeysk7sabi46swfzaimfk1nmzwu7glr05dizx6oin8o8ebphilfromfwzvthjhnunylgq45pup7l96obln77vn18v32jd2fprf0lsrhqhjg4ez3gx67rhs1qsiqzcajq9g67ww54hhi3zprquogemfps27ve3ixh0wbb2a15pckusujpeliy5jbts46dh1ytkacriwzxwqci2ryyf3h47tww4qmziwijciyabgm2bzcytyhfy7krzyjfqdrq6v6p43q3zi00y7zdmnd9punye3v1gulhb55kigvau5rq8zy7x0wlcd25rlwn32e26zeqdkccdrsbcpx5pnrqqg5wu23ymk7dv3ad1odqxcs65vdpzlfzwiuy174w9ojfwoqgt0fgtiihdijaaqfiycbmmtfifs2x3g6ag5q7m00gw0bg83q5usjgx7x4nptvv2mcgmcmwxbb2rm1gkmqgkk7pg6yuzs0zkcmoi56pxgg1i93k6mt85sngiwfnxw4s7kdlqch3dlap8r9zd5jjlxvawoi2qqizsd6h4ee',
                expiredAccessToken: 5469437956,
                expiredRefreshToken: 1718438167,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'PASSWORD',
                name: '8fjmx0inn1g7kbsbewd9ixxrlspc7c0ov2es86ndh0694rx9rcl1zm5rhghxcjwrs3e5wqvng9pqc453he048fer1s7wa4ecarfvqf2ghbtevao3oufe3o9kjheocv0n3b5nf2da8numhgc3h8pis5a02bm5iro8mug34vcpax9p9xnlhe2lnpc5ex1cjs2vrhg0uxqxhlz7mv9ib57sdgcphl3x5jzammczuf9v73reyg4ba959aqyuhovu2bx',
                secret: 'ljogtq8ub1o555ig3q6yuesui938ql3gi853kkqtncjp8mtedyuzfuit1cfw917le5tmyvgcqohr8xhh6ge1hn2p8y',
                authUrl: 'uuiwwo5a6jyn5v1z7l3evga1yuepjfh96m7uxw8kwpbfiftbzqvr50uxulzshcqbuxj27k4cb5zxqja4dn0owvg5v3256d29kjji2q6t9h7tslkf9nn3nynxcpg3a2bxltzrl581af2doak4ymuusiuoog38fjfonxi5pofn4w275tlmpgqspajkoe3v8dmio1lir3vphjay3zu5n3jlyxpeofo8slaxmbz8s1r2aml4p89p77n34pxuy4u6v8x6n1nfybewwrpc5tx0dpe7w7adezhclwu6yer4achytcjxvjuscv05peqy37a1fberj376gc85jz38dnemf9jeb33968n2yhfd98kh5trc5c2lo0j29yucfpb1en769udj29v4sceacb5bd1lz5lwb1c6cqawuqlliy7o851dosyx06qxk3rzf0w7cvb3g1broc4nonto6qmfows03e6ejx1ot8t27kwnlzhxcvi207ge5ar3lu3atwkmzbw1qwgsyi6g9wnprot58lfvxu6ozm9nc44ccq37h3gzt6euvtqz5zj68k7y6fitpeyndyjyi2193qk69zpwgtlnlels832wz6qh80e5dslw3h30rnam2a7erwwhav9f4bvpq9di74elxggt944xtnxprrlh2s9huxmb7akskerkzale4stoapxseo2pbnt72406kdjnrfga9koxhbxm5vrram2zqjunro49lpnopweq56j2wfi5lag4glp1nmae5w7wzxwpor4dro8ercq01u5xgyuzo5n7rz1199weopz8j4550iano5s9rov6hewrh1kmcnut573cgt5r22khxp98ntl0jks57adc08obtgadoims1a4im6r0pg7v6jzvuqq6cr9ythoyyk4r1jxf0zzpw72aip1zqk168tu1bcsw5u8aei323610tirrt60skhy1ybgib0e8s5wbc40813txfmmtyyqcutw9ale02mwpo8ahsxi78hxqc86we5dmh7bjoj7kunlaebb3mmxhs8ejiwqcj23xnqqdg0x8opjzt8xje6x0qgaych5uv0jm03sval58qu5shjc2cynzrl1nql963hml974u30j93dmbojk4kf7p4tbn5kn9f643qa7cx18d1d3p4ol3zjdvdv2rj7phgvtb3ug4pv6d5jxr4q9g1icce5euzik0v3zkexvx7cmyhrr111ei5o80dw0636fy4nwuzjbnyx6hh7k1ufrd5iqea7blq6r7k7zfaed2twuxuviltc1nivh07v5ra51qtesm3rctrgrggxpcgmg1d7f9uj3zdg9kkts4lt82nk4m9pgzjlltcuiymukxt51tqtvkiaribyirjh11yjrss7914w2td4lpc93lzunsy4cib8tn0xfgataenfoih5rl0cdz1y0x405gk7dysckzlv0jclurkmp4i8bgdwjm3ikrzhje6ayhf0w2aywm4fb9n1em3told7z433uhjq1iz0x0sq57q82kocsislddvqxkdpjvdcaso7p05oow3dkqfmulyjftf8bd15t6wu2va9txf6cl5aehapomicbihxycx39lfhr3n2wllolmgy2735aopycba2q7unbb9z95damno60tr033x597m699eoqpsqe0o3g8xe6vpa11p97up9ao1emqj0s0oncfemn6fosjmrze0jle4ytxz7z2urjvsu015jib0p3esknbyxk1aeofffjurcn3k3p47ef42xc1nlkvhysxfpcmn2nev0c0vqqevbgu7qb4qjjjamk3v5etu2k8ug3v8aqudi8doc2gai78mbsy7bjjf8492felbi7rgtsg1ofypkhtt99gzftd8valwold8914x8r84olqqt5p2ta3b2bhc9cm62n182ngwnji0qq5n4hibn4qki2fcdi3iq79ueaiuhj4ulf1q6ds4ujfa0zzzp27etnyif4bg7yu01hdazdkb952vqwpfvfjryzfy5go4c0tutkhp07sh93mavau2lbjymhyn3',
                redirect: 'm8xdgy3rhngd4ffk0fd7t148ch4ahussbu6rgblujqivmkj0iod322nw8ew6fyrplc3gkgkdnkwv056s7sj4fzs4pwxccljdsgo47qcsaetwk2lw57w8ettfldgunipox0gue1h1wmta9c7bahmlbwys8c9ys8ux0icefq08fhr249fq8oec7o4rmronkfo5imoklmw4au1gck9lgt40lg42ccj48333kib48gcgd7xptvgr4t3luh6kgws7ok9ze35d7hsb0mcpf5lzlpaxym4n2i5ad6myz2sxfno4t98kl1pg9jc34vufykgll42qotgcptyn0qval6hcte4zbkt0gjviokm7x78wcw3ffluwu8lekcvjpwnrp40l4fod85fp4lc5fhl7qoklbuydl6iwdz7m4yftdza6f4wf8zbfxl2mjr3p2881wq8ykw8ywqm2yey8v2hsi2eadwju7pv4a8wkxtf2eauokhywvixvj88ir12554yy4kj20m2hjugwlwyi76fat569b856iq1cf5z142jmnzmlfgx2fz2gvrrqdkrj2dohx4z7vsp4a01xes8zsv03fbd1690bc48zcrxfot3h2njwcit6q7leffl7v6z9v88xldnwbfey5olbshg7lt0ixnpday9tmjnl0h35guzwgeuu8upma007s75scjzresms9r07ckys5psczlctvaqds7nxihzbuu85d7bg5f6tgz6ncl2dehbcuyzsmjlg63pvo3ywppe7r6fao44l0pxkr9zk34kxmsm5phvrkh58n73z825tvuj77nd73zsjva63p5vdu85kodkb25skwn2d7sl9tpr0ys2yqsggmjd8erxvm9c7m5l5kxj87623knginy2g7gj8ewgmc40m9560s4obrs8lnge3a40tpfbbfl117wihmbz66uflaxfjobijbwp9wm9w14z51nszgi77lw4pgcodqgt874j961zk7xqtizifmp06bafv60it8h0mpe4qribyhgwdritifwbgyxfohg2hdiuh0cacyut4hlkx7dpnou8owkvinrezxnroqeutd2i01w56pqlnag7iit8nnj6tlx92tc7674hyd6cnzlnda3swryc1yt6539qevvr634gz6ocmfe6a78t5qohpyptg115nhgosvdyggblfdwq6wj04qbuqt444j9ex2kkkyczjsb7i7exyaesd8y5jdn0elmgrloj3iyirkbbodb9y5b4mzff92xpidao0ogyfan3d9xhhdcfz7jmn3mbgy6luvc2rms46xcbgh15xl59864z81w4pkdh56n2qs80xj9grzgxaz257zh18uyqb199dfznkv8kcj5dlcjds4brhjp7k3twt1g1e76xptfokbby18a0pigch1tdl002irufxd4fuqp9fw0bwd5mn0fhfoznmf0zsz4srm4y2oaczjnd9sm3lmpdzvzjjsv9036410ga3k8sp4f47s2vgthbcq49ed62lblebxugsv2pgh84ips44kq883kl75hh01we0j6wmx3vbsnmyo6ha8gok53i3lse00xnis3r41hg52es4xy58h0dl79czyp1se4tapz9c7hfct7l284m6zwrvihsz3a3gkusnz9gsmgv4ap3splyl7tfshcqkztd3y4e8fbp4q11o19599biz8msqzngv7mqnvsbc94x1arswhthk9tga33hwi1g4nk7uzry9t0espv9kn11hy42brz5ec844no3ljk866mfcdwi6561mhs06vfl0vhou4k3wzmakhwp8xviyvp1uh07voxyxlah48wuso8mfvewdduzgiaalvjexv64ti0531crzb4gc8erd6ynq2qmvyvigs0enkvg01hut4mtrj13v43d03ogzpjbrvjvaqo0qxvam982xa8nuu6oyuj2dh97i1urzpvvf50z8drj5zcxr8n5w142n6plgkcwc2lnhczmx9e37lw0j9fer9m0r0eggqnhy6h4d8h3o44fiay8kv2iiyzd9',
                expiredAccessToken: 9489764322,
                expiredRefreshToken: 5994822391,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'wh6ij740nkviiz0453zl1ky1ud6qja4yy200fmblvs5mlzd0l7uj00rtklxlfjvqznc9qgjd8u9n5zg5dh8i4um51udufeumhopaxfbiyfc7vubq6z4fvmjumc31gtclocty2qdjwi6k9h98zpombgkcwtud1pq7rb8sabegha72gwvawtsn3f2k5s86vglr5l16rk102qfp352hvhc44tgbumljxmidkspcdrqy7aavhaatthra5k5esxg0zs0',
                secret: 'q95sfgri143520ekc0ev4839y4lcd94nuh0qh3q6jxgjvn19onltoq995h2xjhzwz5t3ry1e6zx1tix5401rgm7awd',
                authUrl: 'pbt7mepha5p0hayukqyt1blnwaeivx5rfg8ig5hldrhk69xxa1lftoc8ppmxy2c0g5kdkdj466ad165zuvbmpog2ncvnqj9e83m6iro6qgkdx60ok1u2kzsf65c5qf8fjcwrnp0tgpncb529sznkn0vv447717fz4aycaig9la7rpkiq1vliwe2xlgb1pfm54b45tnhu9dc6uitn3dd9la3xq5dafl6kwzkz8m2eqo6ovwmhnsi3j72oyodlodxbzcvqz8nuqfyi5s9u3p771lmjosfd63ygmbtwfwzuam7vjv8h8bus6wix80voyc44lh5433x08fmw74wqgtnl7t4l3ztqf4h6cl4inz7h03r8dpp9oopcq072zn4lgjh1jo6l1f60kukriax2gtmq7tskayq2rsl6m05s05f26fl0fi7cfy3bg7pujkchv71b1u9gemul5q9dymsa375h8sg07m3kyyw43pgcjkt6hrkz92kghrxpdtsan9ixnv7wq4wzle4ejfi00vgzpunmvadb0vx73d99ryowwg9wo76ln36jsv02nvg3bjpx0v39gwklrdgw9vdeiyn0r2klitscr28co9dd09jo113ua86scl8qqmatuwn79kkdq5usa1fo3gzd2u1ze5zhimhlq8cmnig7v2ynd1sx2ucd9iqpu5w08j12uhu85unhxoybld7mn6cgj0uai66ja9oqhppjgnk9vcdb6t2t1pmy6d9bfm4wdtsqtt6tzibvhbmkn43obijgfkug9tlbuiymn6i0tze5gzkf5hypfsf6rmw3v8qj1vl3np248tpvef4usspncm0txu24tvfc1fqfjn5ju88cg5ebuobb5suqkk1i0rl1ormay2trchu2vllpgi2ci4ozx9wxnqzqe305fxlia63p5n04agdt86bu5dlosjr99etbcj2e68nr3cvlshckvnbuwh4u1s7glfhayma78p0gdk5wlsuohvi9zmst10gs9c0pdt5wwu1csyw1yvtsbwaqtvyiwzptlob52eixmu3c5c1nyf2om7m39tfmfa8blo1v8k5klpwd85nost8f4mf4bzxlpw3lkdrywjrgqjjeid0xm92hc6tdcwxlbzsvv960wtzwfmhs75b8rhozpauly71e0v5xgxf4o53vgu15kx90lq77ak5dfmaxkdvjxo07a8lixrocvo71z0nyx9880hctvrhnsft7yoeypgwxyhvf929bguc4uzbmv0ptu0uezmit8we8ppcc5ehm2xwd8q5mno3bb1763w6dkpwgk6vxirihad1ewe5ys75yuxt2ahkcyyprca7th93l2qfmcdwikrpb0nwm0lp11f53uk0nva7wp93tjehtpplzbqngv0wdhwicqudx4qy51th7p0sdy2g5m2p2nycofov5l0jmtgny3kb68jmejdos3szar5r3l4ygudfus5o8z88e9hyasd05vjhuhu5lu1gqxvshm7dzjnj7p8umv01ll6obmlu5yvcep2mcbfegnolj7ll9zrf7pk7kxv78670kknwc3hb12eojds6o98utmp8egemj4nar54fedtcr2fbiq0ksia4pq43bzbgyzrll2nskvam5tsjj8y29xktujydo37cdjvq2blcp8lo55qodstjs312tc0vdlpehhzkmhl79r2ldzc2540l6hguepi8xe3o8d6kof4t87fcrsatcn02g16ngjb12kqfg88h3a2dmri8ol5qo4b4fr9ycmxeefgpydzn78w7675w2vu13db3zy7toa6gqu0jn4mmzwnuiphzkc2oq32vx6mzfpb6740rbqpmuxyekmxvuznlrdcsj9hxc6jpsngtjodugh8ko00fi7u8l1t4othmsq6gapkzdskmx7oeaojfscmiy53y6goy7mx1uck933n0u2lusngtawdukcp1v1fmz5insctz42hqjmycv9rqv5t1xycijjwwgo669pjnd1s2eo144x9pfc10cq00jzy0z4dcvadzcygryldgp',
                redirect: '9e8y6anbac3xjq4dwze0shik8ygerokm131sb6k3wz3o7ogjf5wuo1pmbrl2m2jk23eiok116eszfd92uk7y8w5c7blz7v5txu0ueyps2g48ybbfwqvfl7o4fn6fyhauj42vl40z3hhd9z4mwdgm0lkbtyurlyv2hm3cxhjs709gqpzpwy4qld81q454t4zfie97nknuaxgepzapp5y16o5n84oz087q3m86j1t8zmwz2u9hzrxo0zothh9ajrujruhnwwb91iqkjrxbu3uxulwe21e3lq1nt5de6fpaaafei9avpydeoitozz0k62w752jp69kjj6qikfyt3pm6qzrgmbxga72ms78d100dt8rgt5yr2wjxj12ctepcp00eftivs2wzj8pqaw6g17db6og0bjnd0rnxutrwh54bdnawgf0dof81qlj1v1dfqjsdyt7zuxbp25u45v6kml8vd18u9hajtx57k4zqxwggy5jev74zk3qrgzro7vzy4o07crlswo8jmu6swlgrl3a82j9xggkmvqk85d9zktkjwyopsfk6ft86020r01ssii1d1a2ama8v9pyz0c9m3h62a8h0wkmkkxsn57h1ngowzehqk8z3aplau3zmimdtkmcolr1sqmsbjmre824e8w1qrtg0q8wwx6edfcc36ctx1y7mbcb86mhe2fpuokmv8nhkra39y1cqenb04fvc81mc9j6ls5t8f6fd15iqufqzhjc9qfzrl7vdpd5nvr4gocmlzp1rjpth4pm9i4tc2d60dffm1uzyccifv0kne14uhtr25ghlxof9thtauy4viwygygsdszz38jhqdji2avu66l6z219tzh8huk9dljuba03yyvq2ip0gbgldj9efug84ud26btod9hzysphd2fs77needutti5gp0kaa5i96wmolkvrjeellcixpt24s9frgjyag3snm5c4f2grdekhq8ilkbnpzxu40adpv2yma3p47brhxpoo36nqr315twt4kasy0w5vz68xkqfsktd0gvqeztbv47tkipyimhx8bg2wqpgue9gw06m7aqjjped5aseqmg45uskla0s73yhysjyus7vp504s0105fgyqcfhktzwup5kbnj7l7xjs103mo4tc6ov92c9dmvzow8p00qqyowps48oh7uscksj9z3kv37sifsbrkm890ne3uysuijsxciqszr9rq3ffaevaz1s68smopsrvvyiw7lmq2sc7o5gg4czdvw6bzvwrf1yju706gfl7rk4zf59jwjk2wpyyanz211tvplez4zww2hfmp2iknlda2z2v5e1dnlm56n7ykzqakhritrcdjppow881rhgpevjsxqebbyrwbsghy462nw3o9dgnkel9zkly5qe31zcru0v4sdzuum5p2zxm8d9ty2b5ks9wzoo9e4gkpgkwven28tf8rrmyhtoa0tklrwt04ilf03wymcqbq3bevfreu4oqqoz6cpdrt4l2iie20wqjkehszz7zyso4mivpm1nntyad9khdyaven527hfj9vmdsoah27hdh00e1esuz1qsehl0pqgc1tjpy8zr620oanzdk06x0mfxdhqnqs6x7szf085610dl9ck225taybntpl742twfb9n1f2rhfxk0g2vl3h88yrn6orsy394efi01wbaljvpp7zbsmmh9j0l8rv7gx68ophpzk8y90nxyczr8pwh3qjgyp9397qhlfc93entjj7d4rebchlfobm7en6g607j4sdyh3mljb6am2vnu54l63pvkhrgw8o44g9lg2el72hxw5i42h8vp0v3uegkrm4849ndcvth9clstr2kf64e0pubi0thwy4s1gihm8s9o8s3vjmoo5j2qpkwo7gw1axz93ioxmjzarnd4y71ecfmetix35eimdpi7edliclcnnftvf75qa47xnbwlhzcy3gkzidxyzquewi6ypr3bgjogoq10zwrsgdc3xmxiz79iau4i9tavyg3xy7x6rrq4r72zg60jeot',
                expiredAccessToken: 7000799361,
                expiredRefreshToken: 7049566238,
                isActive: true,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: 'uyccafgf9tjbvim8tq7ru5g8hl00pauhtu5c8yki3ab4ns4izodmc0ro4doksyonmd77xj8t8d208xai4xuzaycerf2nn83cdih4d1l79sy3t7c5za1atpa2ini6nwn3l554hjex7se45p8vje7igd3wciiopidmkrdcgtst7njkcml7pq9l9vpo6e23w6bexfp8hoizzgix9xc3ovhcios3kk5pkiom892sza8h5lj3v4z5i4jjhgsi2wkakxf',
                secret: '2fkdkoc50wgy653en8ky1bc09syxdw0cdj3qyhdcpivdlhertdrxrpgt6ubm14b90c8eyd3p73cj9x9m5qmvnule0c',
                authUrl: 'ydwufdvaa0hu32x0hqxm9acsrhb04fa7xae2ox21k53czkctvzu6e0bt42ieiioj5g27apfuqyddoifn0g2nhf6ta8zkps3qiympsh3m6peibtzn7mw66sgc183d77qmex3gfuv3j5z02mp392nctikexwhd0q0sw23zs7wt04pct6jt1vaimmelidf6vmkyrh55ipgnuhov1wik4p051vytxtq378zfggfgld2g27dk8ffzvhhg7cve5u2c1o64lqssdrbodzc7jyui1yur2awejv3yds2ovnxcglkzx8hfs08xsnxbknky43tuj77g27zffpeln9k6kgmd11ampo8b1gbvzfohhm5pmidt8mfqw6ww3v5axbour6b7ksemo2i5py1vm26jwo4wnk5atq8xawetn3ztexnmdtie7imzcvvd4wmj0vions7mw8x0eto12uhtg5g0soodbwartkqjpzd14fxeqeaajnqwqkuwnq63gq4y917opbi5po2ah24q7i60te9e0m8c37ik8l24orqdu4htl90l901u50atjovm84avml6k30m767rr4nlhu9zskbxw8yrkg6hwxxtf64067fv0wu8vwqqa0a37flivp5omrpcf313e834ub2h1uimj5bvjcjdqamv020ci0qyo6f3aufdda8k6fihgwx8mkl7djuf3s4ekzkaq8t11g7i85it1wovvr0k1hrzm9rsy739eharandm6qd05nmah99lxpm8lfpoxccriqby9496wtgjvyjhxugvoaxjd3aww729g2l0dil1vgmajffifaxpkf4q57af5qrjtzj04sixojohvxoqmnwbyuemf109vwn0mtnb96t3z12gq0jaz40v3rj8s9q5gxt5oj3nd51ja9nknebellwpashca704r3o5bnwjl70llr0lyfbzs6uv4kq4e4y5tjy2h5xzrjwocwo9324r15i9my9bwt5kf4r9hnrf93kcvcab6sjln3jxvadmoo911prxjqq3dbuok36xcikqnzhq4qpl1zawuk2tqr56x8i2ozdk02hsoifuydty7dyg1vhx8dx90vd0asauudztrvi1u90m0pivi54v4d7y8j43p2qo13jbddtci2c9gowcg0cuadjypnc0nht486geqvvmsclju5uzb7f7lp2qqx4wycwrq593mmahpz80ur4jnr15inktz0a4az1wjkpbfkgzphnj9tmhosoz86529w4oq452l2ji9al4iue3afh9rakai7mo7l90m22853w8osud0odeanvlyufso37qgatn2e0c09e31yco6lkbn4rkafd4u4cf3raooadc7h2pmli9ikpbpdp9rq4hsogai0d57a7d8y20pc0j3bgwlt7y5hoz4yutmnlte6z5pf6n7xbayx5l7ykfkgk7waupvj22belh4e7ums87ku01m8wxoaraiv6v3402r061l5q9c3l3icpw8tq7v8rjvrgah0q7kdrkbiiispf6muj6uwzjxtl8uylfni9ak82k35lry9j3mhq6g9cffr45ae181uf9ochtcquu141l3ikgjgx42s4iyq4tqkyjul2wvk27sokp2gsv6impqq3tb77mlv2zpmbdq8fmak3rmbjnjfdf3rta6absb1i0kz914zkgsliv7vrmedbjk2ccnub5rbta8c0upnk4zzsox8xgifhg26lv48px4mkahih5jy8dztel4mjvrb5b0i0g09k4n8vj43l3w9v5lgvypk5rujroepfa99eqc868fb9tu0saanhm5git60y2y3jxua8y0zg756l1o3dar8aviiwoznamvuevelbra01lffus2f22pnv8lj2zqbrz9pdwotw0394dija8ldr4z9ynt7hvpcr38oxmtvq2zi10p0qj1n7vrltx1cli1512anafzsw3sj0bgwn1qhfgfjfe8bt94v4kibnk5kqs3dxw102h3a7eekvanwa3qc38ah2faa88ce3bdtndrrz4ngriyi1iw9bl0ghxo',
                redirect: '0sjojzmnj1p6bvyat5nw2heli7ws60ubvo7ivmdbyis3tti59nbjozs7ueg35xlawf6bx5w16c4wonzsct9ww4tsx0fc5y9yzzoqbhn7gy5et43d5di4qg15s0whpb9oabwo1m7gzpw9bcsmcs2bth51hfhyqdlnh41x19oqo5ag3bkir07nukht2a0xe65pdzxq5kf326bn8tljmh47sn7ohcvt714bv40a8lwlfobadiw42cjnw15rkehf4q2yvxizd9cz56pjeqorngib7jk32vc8j0oet11d722u2xg774hfiqr1rk2nliwnedzgtvsqff2dhsmmb8jmffm65i7ywjpusz8ly6ees159bdwitn1ty737j92dez762i392vszcdj1p3dolgos3rj6f5ukqq2vya90wqihak9z54lta8atj5st00ejjx36at9u5jnty0w3e780sy5zq1tb7mfl014zps5c4n3fxtvjg7d80tqj9jqzjmw7dymaopfvt6c8gtr36bniibj2yah9ppy2nsnwgtquof2ltl14ed401gsx62csjfoejjy90b6w00dy9cd8xoz3ay9yk621edigczvc87vkr6730b88653e4iprn6fu83ie468sc0igkjztwjj14gnsepb3wrcv85u0aus0uenqim4loai5dpjxse5yrqggzt8x0za2ajqx0wlgszwfkk4d2yv6uyc7nuc4so8vzy3uyuyi6c9u98tck4m5qlx5h7uvicl8uxmboe5trpq8ubaqcncwh1zx2h31b2yuc06nefhpf5r04lv96go61c7keagzhcj3q9py46ioehqsff9e7hzvqy1t0rp6lf2xwnyooqe9jx3ffvukgp1hqbm1dt4cwdpd004ed1zd4jdsmwqishxa2q69xz58nrp9l7zs4n3iz3skpkd54z9birfgi962qbhxptl4j4igdo705j8n5ziqdknpk9168zkrcvccq116hhazgo8et9dssmc938ymvb3aat0fl9zvss596loha7j74v75lv8ss89tlq0ho0wobaf02lnni05x1ce6zhh6c6xrjtf0im8aflb4sv4jku2qtsgvb3qw99vny4rctd0l4wd78ujwgywf1pav6rsk74y83n3bfi5gq9jhszfgwstq8j4ivr871y9mzk5o2r5rjpmagckvxlbangnuaeiych0c254pmqx9a1dzckgap4olo48b3iswnacbzqepyco1vptib0ldxxyhj6gt0chci39ea9iyivjivhye7izr7f1ruy4dtcobi7yg4yzp8oyts67qr8pex9ityn0n74vpu7xa7sohtkh961u67ea64nrckpooyyqyxgxo4kkeqw3629di321a1r1q4xkt143zd524iz57ohh7jyni8me1f130n7xvj0vd5ek4l94svdbi10781yx5toa35cuvmwyqqufmng8knda7kcr4qxus8zoaoc6frd6uxcfopiz45r916svmzm5e2doyxy0xniq6aw5pexjcjg8u1f7ro7bykcved02nteop0tqqoyz764m9dywvd8x4ykk30rost6x8cbolm8lweylrec29hlc88vsyd510si8be2zyf2jrqq5c6fh7lycokjx2uapd95qz59bzx7dm70t0rb04duoezty3903zalx24b1jqmg67dppjfk02eniulowhb392njbag3988koaqh1vysr311wh391t4st63zfgbhdm5ymp0abdmzg71p4m3x3qd3ekjxxub4rl036dermc09j3zu4b42mdeiuidewbqb130493n1j8s99c1w7lvrbbfyaffl3awdknf8wux0h2pdgmk4z69co4vdah0ysekh6v6waogz06n4yieiw843m0hr6908cf1q9kpy049bfl5f2w2o4wsr4h8vftwpkxk8ms6mdgdnkwuzpamndg672xdnxxmi4exezz1v3v48hvn2y72vjnwwzw1dlexxau5fl8iufswmqjgpsdsx8vc160339vn4bhvh7dxyw',
                expiredAccessToken: 85386636500,
                expiredRefreshToken: 9814055260,
                isActive: false,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: 'gkhruovownqmx6mff072evo8csgjk5e1j6jcgi20x9eef1vgqxhe0s1las92h6g9mmyadvtivehk0xyjsohck0s68l29kzyhmm2exomgetb0tld8ok727iug3loeomq0cwk0v7cwrm62f8nu9qj0uowxdxbl4upa9lm3f3eleoe4dfc4c9njmus5s11yvb898u551jtvvf217ec1hbli8qnykqmdlo3o03dxn96g42pzz5xmxazwlldtugte6ru',
                secret: 'wh3rg1i984bxembqfaoc599zitrndyzhxj3sj6ymzlnmiivzk6pxl9cpbwlk8mkonr2x6t3watfvegfj3nw1miaw4n',
                authUrl: 'agrzvgpd964svh1mku9qqgv41f4wh49tqudh4crttfk1q2dk24uq152htc9qytmclafu8se86o67sysd7ptqibyeofofzynhnm9dydhsj6155uxvzhdjrht07xkbxf673wzoer1u161hasxpc43crdg0ghd5tzd9xe7ny8tqnvsa4ijl2exuka4l8ifr9ghxw6wnf1s0f1cx6s9dh02wmp7dnemyhn0wyjprvg3qhit16iq0sqzzw9jb5jqw13ugirthf7koec436xq9dz5gft9gagmze7da4q5nt6bryitt3obyunm2nbzg2o5e0dmt792zlr451y9ky05idfzh15nm4ck1o27gq38jbrpspc81mswil2a3ol9xfx3vznh3m1tffuv8qnorpz0gn9gdigkzx1s66rigaplek6xsn5mt5lwce7dav1nwkc3x4dne2kcv1hgn9hn0hzrhzid09lj9vvi85ef2aak3l1vb84fc2la749kcu3tkz7bmatzpv5cr85bmzrk6l5txmmd6afvsvdc9zzp1l0jpc7ssjw2j04undp1qna0nqpm7e9qwqou89d5ss6xmfui5d9y1dik61shezya46gqcshye7pymmlpw4zcvwk9myiernozshnx6tjcyip534y3q7ysxc61cy1rq5czvw8losudkxxq57kj062bail90bojrteie2djmzy1t6f3f4qd1ub8b1oafydk2dpmq85qo2sa3gddqszpw0ip6wfg7avyjbpyxsv004esrqkt8xt1o5mx653ro8tn6c3393qklg1mz219cj2fkgy5uk3bbn2qd25k41qnu1tza0pp0acnryndpq3mn162g1kramkabwf6aw70dulb1959c2z4p4fq03tzgmhoi9xhn4f7kfbx3e6vyq9cxxukpsepbcnlt5nej072q722aeke98f32zxwvx3ig3s4ooa5xupk5xwisalbszp9w3df70fw1xo3cz8okgtoi8cu0xv3hdi9twrjrt66olnuoqq1sj81cb8mpkd2zbxlmg7ca8ilrestlgo19nhf5bn30xa16mc8724zr4nvn0uq1tan1s94g9x4tml2abq6bznjp9on8sm40xl3tz3qjwe48wq0npf6dkksbd3c9u7pxma4z97v8ydtmzca0shunznsgnicxh09qpja5cax50ufe847oakh1gzxt61d6k9kzfruqd546tkb734a32j67hgg4wqwu44ydqv1iz9vdnjms8tvg90kzu39rdjkdgw8xneeyoneulrhbm7qu1c5vvop5d7miz9s394yme6gw1x02apaaurfxjjxaxhoxmn1v15af4681m305fupipwwgc29dnwjjixx8ud9o7shumh3u1b7lkz4813lc3hv0aa9kpyuqemz2idxzvpowq577oj8ef7f0nm3ykdi7xs6sfmr0f9vjidvm7shuxo3m1vd8r75fxpolhxk8vltr9wttwwmf6i0z7gwdayw46w4o96ndg4b1l217nxvlg1r4nzupyhk4rr4f7nns24svm713huvcgqbigrrzqax2dz67wb7j99uy1vmgb3ri8qyvz8fvofftoh4cjuctw48e68j1im7dx884hq45f58vjf0t6k21wqn5pmow4ydquqr3trfykqvz396l6chnm6m30xcp1p4mgbup25g3lvlc59kzct74p6s3setwvsavvxcv3am0uted3dz77gi8w5u91iytja3hizrl8tjf02bzfalh1ptf9q3o0w2sqxl5sldtcgxc5djo9a6zdknob1jazhyu2rmkcasrnrwbvb457bojf5phtw8eu3pm042z7cfa7aid05kxd13qqg8rxmvowp7rm184o62qcq9f9ev9uz5k0wbkvcmxijz43aqi206c0p85r22vngmupfzj2eosq1nuwlf1net3depftflqanbbt4c5uzln4y8x3z0jxqpkknonkg3p8o3us6yn16dx6pri4us997p88d6419ihfk5d0elvyb9drk1pbmok6n2d',
                redirect: 'b5lji3nl3dlmvm6bh77tg7w3lc6omhzsf01gv0nf8irb3x8xd4j2mp0sn0r2cec40frxvvi0nosob89g4exb0y4ee1jjz6w87ergxzy8d89ktmr20lh5eak6ay2fun3mkob3pgxnt1magzg1wb2rbk4mr4fhwri1qz51avn2iqapbm6a9fesfn8ejw8lrhfs4654n7igf7p1sai24yel2ju8e8v8edp9p1pyfkzmii509x2oessj06l3xgepnagiv5afv05dw614tnnqqsq28zbo0vlbp4q2xistg244nj1f99k14zkwx9rxzk7t6ojwksb0hsfwnmkt9t9tjliog3zxeo7cxumzj7fkbx45tmexiyxhhoitkllow5lmghzdf87lx57331mlw0lmx22j8eddl95a0apsl4q1o0fcidmn8chh0bk556korlg0pf1q4gc9piovthnfma0elo5873uosp6hy3if07st11ezb2hiqykhtmy72ysmblvzi1i1vt0vmqijgdv1fz8pjxcsbafv18kky8a9uo0gr8485ra906035jh6ck8ttbijakfwcia6ftgqovyjm97eyob78kvs72hrz5jwcup632bawfi0acl81y29pq449gj4307bcduwkq9mzb9agsd4hgoppwjr4jrvdlq54m9y3uahl7k2tonynlunyhfie5t8oms4k1ho8t7v3gqm4el26g1aryf8bxv6c7jwypec1knjsy63981l3e59kyxsk6x4oqgcen3p18vs7wh1p6roeo5bpl9ykzqjrt6narmv4ppls2ng5tkjbqf3p8kdz7kumqh0zcq81b9puldk88s8fv37dv4uupwb8nr1rx36r4a7c6zl6g8abwu18oeq1oputxzhmk60ig18445qf4yead5z0fl6xpg9eg9k4nqm3swkzx403j50bgqg1zxbx0up574j07z4nzt0lyj6aef2z52lypob1hadhyjnad4bz4ts2gvcvbr2d6ztkygiioqd3fkl5r4408jyt3mqvozks92ihb43zlpnh9409eh6xdwau3y5xwitngz6x88qzrxfg9j1b5zn0bn27d6x0o0u8i3hxyppp0orc47ji1uykyjizy5od0grdyljycshw0ujcw3szr7numqcuy3dmrit92qj3w3ahif84onkqzqxq7juk6lta353p0qt27ihujbmtdys1nkax4bsdftdw4ow4e4tevtohmatjawmd6rf6euqxv90jx7r632gd17c5lv0xpcojwrca0wn6lstlohzr569xb12hxg50cpkt33l8wmwpt7izgz175rrsp7yg5zjak26vjkcr49tgng4il8jnzar7gognj5a7ww5gbtxns8xfjp3kdr2iq335olf4jk671xqkq92qq7pwqkfu4nx0td71n3vyd6lcq3y3b0slt7cx43rrrph3maqyr7ndpndodup5po4150acqdacgqj9oth9cl1ckhus1oo9n0gds2107pxqub32n2rbur4q5mbthbeldpo966hv8t88326t76fpdr20l81xutg8ixb1w6zl39yzufxo4pf7eosbe7kgyvmsp2a1atpcf7o2wn6vcmv3ecj4t9b5bwuktdycl4q0agwmwvlf6zm7dj2a30bsq98qpls0stlzgdcy23sutjo4oo72vtiwtdu6vn6bqh6m16wfx3q7x8ff24etm4qysrgeo37ak8he30s8h8m8erppvvdcpl0b2n9xqhp4ve1pca0vfqlkal5xvjex2pa8ffqlawxeedl5kddrep414sz6yed8v0en6ur17jvkc5zb8b94h48ypmq7go996ntui7rn14wsmn45afb5and62liyj7phhul0p6ahialjqof52wjpe7d1kki3ieh5cib7xpnjw3ltgjycpp3s1qgtq8e6qdxmn36pwxnpwqadau8idpdgl23gxb1ih50w99yebp3aegjjxcvuzjgindudweirzu5oodw72mm1gehem7x8oixumlxph6hepyyh3ii6n7v',
                expiredAccessToken: 5460839018,
                expiredRefreshToken: 11148136096,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: 'mr1degvfon25fgqo3j7w7cai5yrh2c5zp9qc6b2qe0xl152wc23azmo65pogkyye44smqypg8tznia71mrzoqwtvlaondx4atsmjg923txi3vz9e4tmctkhpzz1mi56ydf6dt55yblr9m559752edj3of16xmt7xohh5bnzl70lg1h5s2cu0rbhrtv6uoc298y4xwft3j8129k8re6b8jpbld894cd3ju4y1a9a1zmvb7ltbsnuc91fq5t0ey9n',
                secret: 'pie9d9dw3bjtx9xwprgph8fb4n3g8f6he2ngnbgaxnl5fspzcizxuiuscmfk4e7w6qigk7xo0q68bx9rpb1argzkjg',
                authUrl: 'cbtmr6z6m54o02eo8vtr97zhbfemq7534hu28dc3yecak0pv4xy428l0yd8y29rhxras612dfkp7rniq9f3jqyymshgizbhmh17jnwq1g4y2iasw374e374qavk6s6v9hustmnu0aggeuqyhv7ix9642nauvqqygdd7y6kj9sfvc4qh0jj5brvwdxl063hisnvci8b419csiv4vhx6xktm3872rcvbape3ncjm701774zfkpwnouquu5dp5v2q5rac03rq9xhtmzwevl2auyq5vy902zhj556vf56jggx2oms9ew6j1r0894zxrc3z0pd58yedf7fgw2li5jh9v1v5e2zrkp9fjmjiiukobm3ac22zhiarif8dmugf0lod1yp54wydod931bz3excx5d15v8pr6mxids5gop4vhnbvwbkcicay25ui3709eza93t5wi2nzrb6a8hc1itmpy6k0nvqcuzpm8yrfn0aot181j8uuyho8worp3mt00g5p4wsjxne2dl4k4ef7f2b8fsiuzsgrmguk5vlqogr1b5fo3jnzos65uz96rx9gzo3eammwh6opaxnsjmsvht5kew3hkc3ur3jx5vyr5pidn0qiucmelbo0qlh7cb7na1m1iytudk5lpd78m79e1vhqsynmmtchkz7ok4g2ijtfpba4i6zkiek1xr889zcflekhh16pth7swlu9s3ase3d1thb6e9ebsijcs7rampl7cfj9jws8lp29xqri821xpsdi1l5wb7wuz4qyuy99gmmqntnmc3ds7ba6mjvdd4cuxxv89c6d4ngwzxnregh7w815o0n8pwu2ujyz28rskrabvu7o2p39r74n1k8x5j7ftbj42vzkv3rvqn3v7k1bmqijxrvyyhymscoy0hk14qwq2lu1t9mfzm37wojt503gnbbrr4cl96meadkvlkhybbt4g0ev79g9bjd8wowcmhb3bho20ljh6xkwkvd6a9dskd1pb2bszy9842gw44p9alphpjxz8trbj3ha23fhxk3b67exo6bcdrpe0pkflykrb3ug7vjq4yhgbgoc6a5iyq8cwgqo45ew1gbc835pw0jx22t8vmkzr6q8qiv9k9eyr8geoqt1tsu3qn0267ztffirmwpq0tcy0jelh3wrziwnt4715vlbax3lodkcydudytopzn1q5480jbfngt70f42pfpgnqwy1kvqtz3fbv3ysaea1lf1k3m1pvt54t5ezjvmnprgav3j2iebkdz5m31oq2k0h1llecx9cgdot4n6vg2q9vku134zyhd46io8otdk8lp26p0tfxoo68ze6ye64m6c3fcgm3b3983ov727864ue5ffx3gl4b4i0kb3gmp4332oo6wf7osy096qtd1fj48i04keintr6x2wtq0t11bc12jvjo8wju1sg6ucspod0u9p6g5d2n1pkjcflbxwy33gwp7q03gk8l4rtgdpcr8d6poelsl0fboi6a11kx7zrnsiazfzhj02ys7vdk0kydfi48otilbsdabyfcc50cxb4qdgh9ybqxjpwxcclpqrsri51puf711s3jmmj6dwwinm4j2gsjbym357stfz76wqsfkdvwo0rk2xmz5e6hy4c36cipku2tppi8vskrjtkir45dta3dortfhlru2y97tpos31im15zc0mka3uxmioismf8ljwmhfqvijl4dd86l75i95r0bi6jlpqydxaprk2mc83x37u1vxicm6lczzmz4kim3y6cznaor8gswsx64a9rwtjzl5lhadtmhbkkefa3d6b0qxz21moiz7vag4rjlte2ms7s43m2k9batewuegsibc2bzkdqsdntlf58cgxkkoskzmkrhizxnu70ljyi8cf8d1pw0sdcur1an8gdy6iaeiar3lvv4m73zqcmbre73xrl78dy5x5zufglkpa2ww4f0lejhsmy8r4n4pu19tvd8zw7kd52u8i3mqxy37im9nk77iislzcp6l46zzzyiipjtj70cp3mbuyh7ylo59',
                redirect: 'gi4ptk5e428wbqd8arx2wuh99cdiocpdb3jza2ni2f5tolar8e65tak8lryunelnyjq4anpds3bl9l5lp15q6azzrhnxn21xkkhrm42pspeucue0pszcadw2wv5ntb3ggkjb6qx7heq3m03j5retgtifjq3t1zpcvjfvoiunrt8d1sfnyjshncnui5me14d4be4m4b1c42uff1tx3yevsgk425p9m1g6mnareuq04uil8dunjt8tbleko6wppxnje0chvznz7fr4a3cpaan0a22tcxv0x4cps7irijvr71ehqpl5qpmfuyq29i5pgab4ommgdpbee1585a1azxmh3syjdfc7asdww7f5wifwdt2r1w2thyklfqb7ant6k95hexpcjft1k3d35lecc8bhepeangtypbborem3z2wzwletqesb39o1ohjk25lk6xaqisd85txf7lwu1y7y7q7lj5rfskbsin9rimuzb2x9k5rsx9sfqwhh0z694s6qzvm5wbiqf73dw1zkmsitro58s4ee3sfm5sq0skusbz4t31061dgg4weiti90nw1bxdih0onlp2xyvzi9tg1lj8oz9riysj42akyrxap2jj44byloyehe70hb6m5p9xzn2lbbin87jqx80j1mfceuu0wc79k4g8q34a81j05hzkugy6ambetyhuar0tf9tub20pcv4dav87ogbs0988ylz95duhcwiruszkprneaelz4pixwj45auicampu2u6aqgmgrj0z70ioclhb112te1v0vr8axj2dulq74yigs4km53zmmb6qqlqrr7ojimqkotofnbbx9rb34xhbnfs24af55a0i12gcemqzfwttbymzzec4eyxnta28l94456iidwnxaeqz0ihei83m7pxataba2nhlfr81kl3e61534uln5tztfffbf497qrq70p2o6qys8xtc1xll8dhfrbbao3fsfzldat8ab3dvpci9v3fsb2is5ztvfrihmmhrli3vp0cxmzaamzirzupf1lxqje3v9i3k6ls6fapm8smu69qpg86np44sbrlsixthhsjoy6ojt3g9hw3kjbfi6m8bmcpzv8z2380mwao0xz1jwv0hoz8jkuco230arxb0sz1zfw4oq6x53gk40m3hs2ljaonccxjaxex6ouulz8jqut094qoh0jyur4efmwvybh07485h0fbh9gti19y789lwc1apablkl74idkycw4uriy8k0q2vbcs9hq7stt288pby4en6e2ds5tvv3virv1txq7rw1co8sbi65kuww9ra5xl91iyov6qi73w1et9757n1nxt9qy89g4xpzhvquyg31padc8493lleenupo1cjmwru7a8okawa07hekv6fak8i7gae6fzv1t0gxhjfxodookp0qvpoo3by85eku94xnbwp5rs35269jxsayoz2lz18inkc2ql3m382d5jh292w6ik5n0xm4ukb2sr06qpqxnfas9hgz35dd84igpnlep0ptt3vcz9jeejrr4ucp4sw2bgpfdl9gprid6johmila9r4csulqfe2q37fvqrazz934q2k6413i4b3xky9ysoehjykelabpeyxlsxxit054ijouc5wbxxk1w4adp3y4nehilrv7vkrie15m6lvo4gzw381b1vduf08jfsbba7gf9rwtcgiy4dghl7t80yrvojxazyjc2m3sw7cjn0tb5rzt4skey3uzzb0wliqmtnf70hz6murxyvf8uk8b0tzpu95l9o887lotmnkv6acjrdavsnnnumjyp4nfkamlger6zm5e2vkd0j1s0gmye5mbtt3s30ivwbg4qwia37tb1rjxf8z0a70965abjx7gigfbnk1tbp4vs5hw1ugtw9uaznnft6k5ptyzkrvcg4t5emfdxlfysquucq6quvxz6isigtji5nh566vusejxlcikkz4nuam1qydy6wtlt6g6f5hwah7r08f4j9lgduvoe7wrfr7ixdyv5d2v7ub08nufg8i5uwjb5',
                expiredAccessToken: -9,
                expiredRefreshToken: 3965858673,
                isActive: true,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: '2hlv9fzq2ibicqbik8r17ho50mh9nwl5w2k3fpbeet1xh73dqbh5872rju171gemxbmtinn9xii9fsyd7u2zjv7u8khrz0mxj1pckhdkkpoc2ewdl88sb0ijno47g64vvwldbwchy58l7sdh5jekszabx28vh9k5evtv66s9adwz324k0559xzaauunl13x6v8uikfydt4upbzkmetz4wmxc04djrkj1ppftt7577k60tlmt1zldhs0kdlfy4vp',
                secret: 'l5q0im39fm1t1u1w03747rfm6p9marequ6sfn4866mb25m96rda609li62bwbshtg2722joogqr1rpl9z441jjcaf0',
                authUrl: 'rw8jkwsid7l0my2qozixlj0hithkntns8gjp96d4zrnqhrf8ttc6q09yu5zpj9eh70x32r238kqid7i35aqz4os5fvgd9nnyk4axy7l2yj7302fpgzdwi5tmje0d3c5h5t4spk87xhntbf3390qem73pf515l50g5z6jp5xvig7zytjeynqynznd8polovzd77al5kaodc2auhxe732cv2num4nwj4o7zkqge43buz6hwhwcco2cq36s6anu490uvatucu60bj45hbzo0g7hiidsblvoy65wuyz9zpy1g06aunrga994lsovs3vreg7xb9hpk1av213xc6a1uc8ftkr2el41dwapdk5zj4myyz47cjdcrnuiix4w9uig14a0zu820en2r5hlgnr4ec248azrygu86x27je4jumqhlkqspel5h07gavg5ik9i3pn8e4n6zdkfl7rcdjbmu9c1c0z2343sfb7cb0qd3zxc8f24r5qlxkujykxcgihn9e34gv783bt9g1trq9kx2rlijxocnp5i56s4950hoizy8866exa7sif8h3o2tk8pgv56bbno2pw2wux312gf5o0hovmznvnebawplk95jwm2a7ca3zsu8hy6ux6jf0qbhxavdi5ml95t2wf9s36hu46b6bqo9nqt0i25vrx9lobgt4asxk6kjhzqv5vhw9sz2jxohjzov5ytshvf94t47iaf55qpfpb1nu7e08bs0o23if9nis9b4gifen35tylk3k2232yqg6cqvl7h512n5ya13e9p53t4egp63s6wbrb18p3o1rkw39p9iywvq6wiaowlda8pkdun6o751v8v99mxo2fohjh0ousna49bcorbss954f124flzr9h0nk3sennynk6g4ko0w2o3j44xbnp372xc38nwfb0qkp2o38is48ywyj4trup6txroxq70huvf7rvke02yu4uf1068j8oe8qs4ey34xu4xjveyh2njw5omvvau5tirrdyh2sd5hupdv16y60mug8dw7apxgjg9ltvcbuuh25ijo36ooikixcryeay88n0uis457vz43zt152gojwxxwqey7trpftjdm6m9uanwzjxcn8gba5we7pkk6fbwjaqpp9l6opix3nwe73kaedxi8qvgj6qiw2tyr9a6spjkh3zsvvqc5uc0bak06ed79rwfyi4wuwdgekbezowxi8b7dycwm6wspt36wb1is0krun8r590l3tmfazzn4vw49fww9z2yqz4i0vorafejllstse3p6xny3her4kly4dbslsh3qpz5gbdcj0jxeifsfy60vm0lpf6lwey9lndy1qk8xu2f1z48zk356ddy5ll4litss0j3czdrau33ws5uxa2msljtecdubgpkhyol7mmlgc22dbotskv59o6jk6s7fl2iheopow0m47w7rabop4jch2gvt2clj0ndyrwtrwig18qb1iycja5dq58a89eimmf1myzwg911o073p54zw7sth4aqksvvqcxvwvzahft31bmhsmyyrajax5uv0u2ua7gou5mma6ww6ph9joekxofh5qezrfc0u229m0d3zemuv59kcrkpqwil8tmdrfuvevhjz1vg6or90n7jnlttx24p7moobeysfy4id3rw526nbymoinygxxpwac1ouhk6uh9hyp8oxzywc3tnq5e2lb2x4jdb8yb2y8qjno19gy64ky85m3biq68nci9g030il5z5ctzhj2q16bdlyise4cxbeswi6n4w1flkcjadkz8sbvbqhzzzpad2qaabmlnebq8ofx0m3g7if4v6dnumcub9gvm8q7scavicdatjboknt6jsglp0a68pcn4ooai9z761ivnce9hm1qhf3icg7rlh68n4sdd9thbnwlvy06po4k7sqrqnpb84ml0q9mh54wh3loywvo92csbxwn8vwm1922e30uf823rbd369r7fa2qngwgcno7jmyer616f8wmqpstkls0qihinuzz8751c8wluvpyobzsz9',
                redirect: 'or2kf143bn6pebgg0g6kpwzv6x26kkzto0ayfbd9xl0ru8up967d3pze69liuv29e1rlo2ntl8ejxu7p8qdrzs6b7lf2gl4yv9hjvxgtj7eghqxabnvcgxwijky9aulb62nu37rhknzx3n2vh421vt6iuebe0nzpnicvp2yu66vi1whky7nie1uxnds6vufdtwu5u3gzxel8jzbo7fcrzw1qtk6uvmfcpv5cirvenom0fjvsjv2x603fjnibzs9fkn40cyicvwc137r6obyr03n0qtlmh9vskl5v0eqr253nx8ys7zh5jkri8kvlq82e96xraw9hi00pq3iib0kuxideih4gnq7yyww10g4z05v3s79m2c9kr6s2q3tt65mrrh2ai4m9ajrsacs9prv65dpweigmua90kcd5wy3tl31esoaeuk2po3cct2s6wpuc11rzwxt6c0asrw7ftzuzabc2p1aemtssgc8czbsyz9ty3f6ygu81y7393x7mc9m919ej1w0ex9dqv8b0qvp41u2prrpsdnitr31vr8a3ca2fzznbmsp6zbqqaxv5z7cn9gwtueo8476p17mbdefyxq31p5ehao2dxqjwzdo3xo71tmqj4r5ns06cciu9kia1nqnhoqcwws2re16fxwyk3dspe2i896xn2paaic2sp4d3j3it3bgfc83h7tjybdo412fo7m2pgvkmv3q1q9nmnow0w44ytp5ll5528du7o5zc4lb9avp71qyv7rvg8oax8r1jfj6kxzkhx8xizkf9g5kv6loyeklu4i2r5jau15osmy099m1gvfsaucec826ld6039phtnaimresqxfmm5c455rcjectkwgjt2pzr4iofqi16l2nj7gz13thqhynr0pnuf9vmetwsymn0jthkcetycudzn9qd6tuxj45a5a0irfgkmdbx54wjh3hon4cpxby3tyqsxulsyut0bk0x27vfyefjdfweszjp4zqgtnmjhhgmoxofavic10r5domwm5tnl25w9tc64i46f6iwm8zxbb48hadc1smjfl2ui2det5kyodpn105irh05xq9krc6gz7h88xh7386izqv01ahjtodb2ml1zugcysnvtwcwle6dpr76p77mvio60sj7r7vfy3rejtb8vrya9tqvoaj28o0wk1bqfveduc7qq2r9vlw215wjnaexcy2ttzsvsbrnt9w5c5et8548l99gqcmbe2q4stcm4e280n413jhefk4omik9zqyerxo1lyhzhqjpgbjrb9oi3blajqvo7fsshnw4aasjebjroxpgjvxj3vikym75ec6rcf0sopzxonvqx23eabp6gdd8w8gdzref9g058ghtxfc9hlug2sxpxsled359b434jcr9a53sjtbgawknoh8fat0elckn6uj8zbp0o6bbcbz6ynytloccgy9vtumynx7k5qcfzshqghdpg1980nfjcxfi71kojuuigm2j7aula9lpcso0lfatv2zqbmaqes5skls46mvbi58pbfiyfj1iau1sno78lx48f09flks7vgp324ztbslm5b7k4nqctk02zied21w4p5mwb31jdrlj9satprkaf2m6aszst25uxmk3wjkrwtw3er7w57e7guuu47ju52oolfbyjtj6mcg15uhpfdqh5zk8n147eudszrj4qqkkvmstpze65mmm2gx2dsvu91cf0xoyuxlmjt6vfbyzt8rqlcyw3jfa74yfhaujystd71u4oxh5jmiab99rbbetv2awojdg24ov17r1f5jk6od8x8ushznqbcqgsbnoqu8pexsczvq5ce7m8936j9kravmnk9osk7bi6dpkhzdzfo3m5c0t545j5crvnos9fnme7qsxqxumg97ipv1472yc9ai9virnslxoumo95d335wleqqf1jgrsztcsx3k8xjtxe3hgqt2fllzj9peyednez9j0up4zp71k33pevxexp8sr1y80le7e7o7w4h1os3sd1hs2uqjb2nexwsnp90emnk7k',
                expiredAccessToken: 2926828295,
                expiredRefreshToken: -9,
                isActive: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: '7c95q5fvi36up0uaujp8muz536a75daenz8glguigjumdcr08i17w05xoipha6tsiv8w891qxjevgo9hhsjznjs9k5u56flts6d2w0dbor7h8f8cbin3l0h0t4qgz1z1rl3qtv0qko7xwqo9qlj2ynpz0r97ucjeingyx5xk3b709snb5f65fp86l7l8sqh6oyzxwwygvb63uo0wgns4q7e4v833isguv0uf0t19f2qh647ka5qjagbq0ero0pz',
                secret: '5zkcexiquzue6jcjtm2zigxrvbz07r64gj4dpl206czkant00un1ib4g92e9hdy4wbm4k59ienr8yozcyyamm7h6zw',
                authUrl: '1omwgj3nw1pyy8jznunegcl9s19xlmolz2fc4f298ku5rsd3h0lbvwho8xmb3bho5bh8nep98cijihm11ovfxw3c4b36czpm3uzerywt3eedt9hu2fo7aqvv7cusin0n2prs56k4dk3oi2mdu5cjfg7oh6lowcdttahux0ju48u7fxup29g84zo2g711w2r2rgs7capyzxht5ienq3lsf68w51xm4jovsstgjwr8opgs8elaw9zev1ry1tetly7y81x2nra5iuoklu0xpelym6d6rto49tx8zafhveig4tyui3rb4flsgjial4do5pxse3oadfu9zcyfqqwux0rkdqbf35zt5d30ncsnjlehsgabvo11b3fzfll3npo7dgqfw5jf2qv0uo5k03cmwsmvb3jekwajpqqo7eq1y4ebkpoiisev89jpxs1gg9pgf9oorh61oikz2k5gs9vjijvifbqtw4hdirza2cjhamawg64cym23pphalijr0eaw2j36zek3mcskaai590qfooe79qqbpfko9hcmg4sj1000ukp1njxsinoevon9wi1f47gi6ljrqw1mm1u0clgzrzmgo8fbrtzchn9prhumr56appwrpj0swpg70omsp8tw9925juf4gtyov8g4t44xy6er6xqw8ofgvsclp01182yiq1anraonaffzbf4vzu3uuhgag8799114171ax7lo9kbltki6ey3yqx0k70ol5d2fciyave9tiw5t3tmayfga9n9a8ycn7bo8wf8mlibnvzpiny3bmcxpk09b5wjzz7uspk99euh84i8c867wstz3pukrtabvu6rl7q2o000onzw52uv9fpwdl1t4n3l2vrpwu970asq7fkv6hvmj7la60zkvczqkl050qlu5058xkv37tvqs4q2o16ndgn9f94hjldvg3aukcefs94ifpxo8hj0qdq417lubj3mvx7ln35pkldvxitoasdb1ifrou55s7g268k80k20sclwsvomzf2kcha1pajrhqfd0s8idlg8nxpthgkb5wublplwlqeas2q601ci1ix442qwf395psb99bexy2xmt4ms8il0fhpbupynrat4gbsiykkj4wye8zylayj2e1v8ng6n1zh3rvg4nx3p1ul5ooh25pju1sc6kx75bghynnfh77k02qweea6p54zax59c2qe2rsxb9dyyh27947f7kdixn1h84ukowxj0c7ds3inhoymb8d0f8vxkqnqr8xuwouizuyx3qqahu38ks4qwdapji8cx2l8zbbdb9u0cdwh449lb0n7ov8j7kavk9ktxgxp8qdlhsrw6kxv99d5z881strhhgrp6lxobej4w1fecwu1u176cdqo6r22hji6cuywmorpqidan0jth57vqggc47yhi4sff8woymb0tp1p0zo1y64wl6fp8g2worbpz9nofjmmehqbmekt4oi80gk23og6lf3wchabhczx5p0a0jyj3d6nyrc1xo2tg7mj60ppyzojifbl0hfm50cnos4ktbiilwbuhvwnzfzp1zr1pve3lge3rk84gff0i661plvnghxw0wnr0doi1p68y07xv2uznbswk63pql0589r5466p5v7saaqrf2cmp865fmwakdryuu6f4ljfm5mgxx2q98ifx1xmtcml7vllpfcettpq5tj4vehpsjde6okjxgqpeceymj08aa9y1c68yizkxt98camfhzrm3cc5w0a5ic1j3gzid927ksuuncm3namwf7b26x2bs9ccp1h1ajtaivieo5bjwm5mdwytno1andpwhwa8rza80ukk5bbc984iju37u9w18mjbrkbdbtf2qmcm7sh9opuwi45fas4zqcsk0hmmnhq8dwsg7n69z9290lp8b3k7cmf7h9mc9mdux5twmxezgqbq2nm4079cx8plfpeed4oqm6f3fps6u8hgpah6zdfgxvcugpbrflf7qdaq6iad6bjmngiomo6qtqo4mjmbe65jyk2sutahkgttyi1c6mazcs',
                redirect: 'a6mlxhx7ev61oe4is0rcazl8z1n9baq41b8gt1j0jozw88hz2a0e7s42ufnbut5ze0s9crqzyi4qy2s64kskrrbql6vg48ai1ltbsx7hf4fmd50fgz6vxfobqohu4igix3l942h0j2jye9hg3n4f6w0cq21uyvuj6flg5z72dzkukingxd7cbufethn2c38g7dp7gytvi4fycp9apw0tqka3opm53o2zg5fdnujy2evfjcmf58xryi04rkjjhpb1k6cj6uwofwwep2t10e8t85bjon9jgvp8rftp4ooye48lh3tg7oe184vf99r4th9lxfhav83l7qty3idl6q7xq84t5bpjlole989bfly79o02bqvsy8z9grq4g20fvvvqwd4hh5rn7iuh7nrupq3m6kw35bst80u2r0hlgnlr3aw9s5vw2lbufwhlli42t98ufw3fftxxrqqhf84bzswlusy1r5s6meygrvgmemdtyfpj7gs1pewpvtq65qf7prfr5nihqlxv326raz3yekj103iucgtsukcaohmy1wrjqmi2acgj7dxs7h8id4mw2opqkkwgybcjggodev2ewdz899mvz9eqq2907x6b50d6743expfcirdekd5xsbmcbw7tz44qafmpzddr1g877b0fbijvicofebg5w65ctgxa2zvt076hbcfj1x14cri0jtmjz7wj4qgg9fbby6x797yn10xtspaus7rlef0rwmcdfb2xz739ckrtxbh8h0vs891agtlb9b8gzavx2gc2kgxq3oha3kn6t26tq0i8rwyimpy6s5n7v8otst1qyhdkkrjsa776yygizda0aogkwf2jjc5qv2k3cwkg4cefnooiwal58jv2syp7qridz9rwa7ow7u0miyy3gvvsg0c55pzti5adbih04d4bv7ojwv14dxtry9oijibke7m64mo5k4msti9rbk5s9ub83crdq9mm28zb96lsnwimxiguqxtncxolflligvgi289xftiqab4r98h60an71st6q3i5btr1qtu8kzxxq0m2sjijky7mxw7tdputdqwsatpwxq99ureprcpg6n1n3rfkciibus2elvkh9izr3n8bpp0r7eabc3jo9clyc53vysyu2qblxywve1gmi1khps39jd6s2sanz9aqfgbeosl1s8gmhmohqazaf7f1ou11p9204ug3pl8vqkd1dfyffmfic25phv7hd92tbwqttayk60s7ei5jpxm6c2s2jdiy3j79s92zx2wbss0y6otmux1sorybzcnabkjvayu71tvrdiz0a7tx6ne2ph2gtq817eevenimbc4b9gkf44bavb095o8ajt3ei8lswtgmxbgk9y2xtaav28gminbbzgdzx615lrglarkey4wlgbx3qg69wakeufz1zr7e8ds5kpg5jvv32k8s6umpxa8m6uuju53lh9ot027p126847o2epxl9ch2qy102g3ejnk6nocm15qmno3nst1493darl6dso2x1jcig9awa16aoyoso656qfigra9487piokbpv8fyacsh1usdkheoaff9g28cyqmi4v3kej7z9dhkib6dx0yk8q0v3snm64tdcpwqxj2bde3cwu6kn4ot5khwo7uzf6eb7kugkeunnfja1sjx9z2jhd1b8kjek83tndeyct9l9itb9ujpyggdx8z4uthxkler40dx09um1dnkgx593xz8c46pxh0t700vbtkgto2pqtj62ntx381yqi6odj1yc2seskwnhoa8uhh7bx227tc4boieqlx6g7m4xvbwrgbj8pkp0k7ien69xtgpdp1p5atjn09dypb6bzb5sdmcoe96vuy62b9disp1phr91kzidn99ylb0fim23bjqmcwefle9wump1e4x5qk7gs3hdluz2nprna5yfpwihichz95gxc08iwcefajy6r15mdtml006mgjyf6chc8vpwwu7d776a3q2e436tq01zj3cc5tfnox7v99njgqrtvhij7ly22aiavx9kt1o',
                expiredAccessToken: 3615329415,
                expiredRefreshToken: 2615996526,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'PASSWORD',
                name: 'y9p9bxwqus6sk3dme1dfddxkthfot4k4pmxicxg72bipe5we3f7qjxy4y2ol38utmd2qc6rbpehvv9kg57jarw439i3b72gcsp93v00drcgpvdzx2k0hbch23pqykcs08l7bt4mtfkca7xatikphp3xcaggea9g9h57eydlpinns5e2vsqm4zzy1bzzzhl5luub36fiibw9mkh75jb30ho3n8qp5lud5fp9vil58c903l7e82c74xsesrm6ttz3',
                secret: '4nad855h80ak1vj9djz50w7jzsh4ru88gijbwx5wc9q1pbgh3icwxmw2u2rzzczi716s329ob1oyp2huxezt1ndp13',
                authUrl: '8vl9seidf6gacsrjd4mpkggo42cngmps1n7hmv8qmmel22fd9gvnj5vvp8optdh2ckrlhiecsql7mdzx25zu138ce9lb0hy4mr19aj0azt3efc19vh7gh8m5crk89z3qxlwvfjjcloiv9qv5fp3l00ptcs2hfgxlhmdngq4dwa3zgen0zlk1ap539iip676a1nub26m4cvpo10rzcnwoc0y32mal1874axb61nhangh35h9l0a652nf3slhi3sw5oiv4khgalc5tb9rar886upjz1iopkllwzmbpyiwrtaogajmi7akba7jvs86nzyxzlj8vjab3xnpc6px7551o8aw5us52qjd8n8m0j5qznytl7ywus0ple5f23ta1rwqxedaioi32wwbzu89xg0wnfw16w9zv1exzbafswqvvnliuscm8d96qubfij2vd3p0plnzjnoeijuphqnunl5x59lg6y3c2g5gzk6ol9hswyf12padg3om4okw6tph4kze4j9uwzedlksrgy8kloqsg49d7p70fp2ghp62so3rhkwk4oimtr348tr27f0ipgyvphgfeq5d2ybawm2znspxo47idrwsnh18q8tni4xu4r5lhwk59a4pviy6qax1fg24kpc54wmbai33k0jm5giz1dd2x5tsv6x73ijca98pcfx9a90qnco4dcrnk5nhrgoln56g2iutg0cnw7ntztiarzy35lpkngwxyhy433dulicouk7003s2st2mns38u7g4wr7pvop4hbh04k8l8v9s485b7o4igvgp9ydy5htg8c7r7ecb8eoqit7ky9hwo9voaaryt2l6r88ky2joeqzmo7y12dut2ruex6qs6xi4gibpzn6dcybqvsiut8yzagdw7wsfj8yria585ux4ufbeqo5naxf1j0em701q011umyrkwb2axgh3u3ncc5xiwhlidwjm7d8ricv9tgsx1lyyfm24ccwn1vwafl3pp7702y3j6z0bzvb48sqb1wmba24h3jp41hqkxigvx4qnpgprohach20pheupq5x0ttpg2avh83y96xvmd8nbfgayiwgkjowu4jzxp87ncw4zu7nw81q867li65mdjin0kevgbsowx4tsfvh7e4q8tv9xbkqii7ihmacd4dez8m9bee8c9l59wvgbwhjmdft6jbpn240cm7vre68e44664ktzcpietp19qqz8m9cgarly1ttzx6fg4k5gsw620frzpteiuwmeiqcz721o3aaxcfq4c1eyq0la2dg3l41zg1ul9yar8geuh6xdfugq3rpdfpih4owwx8ujyurtgcz4ikzip7wvgvjli0ju2vsjml9ib2itr3emcd2pf9xpl8ydhto5jwhx8fmke7hpdakj8xaolcsnwtzbs3r0fbl8u7kxki8f7jz4w8lua1lbdhh9sndx3h6tzd7kmiuz9nui3upn0gmoer4jvly37ie4x03zzvuxvuey5k4iwxr7zign8yukrie41a87ykd0mzzg0wyf3hz7vueklks6l3xae8n442hvznq8ls1j49r7kwfurmlvn66vfofneub23iq9o6l665dbvx8o6fbxllwrxmo4ok0cmod34ewa8eei5zgdmtiqeefzvq68sg49zao491awb3im3qg9tmtvmqk50rl20o8f0msk8768hglbtvafx521jif39utp5gs74qa1qwuf04f0a3vjh0op1p9b0agsc6eah05vdnb3oakx8jqr99g3c9i58xybcky7ndg6mkt92x9lbikd56sf3a108tcrah90kzgr7o614ad83ua7v4yf2qeeswy2djw4saje450eh6lgevahnncznfi3xx2dk4lc59620riyo0zhbri410ewjx15brbsaco6ikm1k9pyr0l11xivmfqza3f4nsvz572fzl41f992novocc1teja8ykkn4vskm0p5qky8gfkrlmh4ds9e94agjs24w34l3fj7feu4tqs0c3q8kw39dpb568f8y0r86lnr6jy8m5sxt0d4i',
                redirect: '2kph41vxmlb4llgvrmgjg74dc8an62cstcsrn0uhyj1h743kf37ks86eqajps4ggebkfoz1tijjrbv1g7xbpoz0odn9yr2glp3zipg0h0sc9y6bvluga28movhxv3xwmnlizwnyz8v1qups5atg4zu4y3kuc5pt79kmi5c61lvgibdzgje3h55dkuem8f5qmz6fj0ngnqelz0afqxsky0q18zxrsxsyjg6yqsfg6euvcp08lpeqjs464601e8xe9bhjfgol2ggj4hak2eyh6k74sxl98vos40jeptuslvzx03ku3yzvm6lpt9rmu7zark6hunkkdyj7pocfhuqi2veyvxzxzx5ir2vrew4mxm388tmg0257r5otkkph6w6ymosqn2d9piuaf1dscpo6fwdk63orn9g2nea408kc4lx32jruml4jpm4z51m7qm9sdlwed6i1bijbm9mg4qbtczqs5j4nt32b837y2cpmnvzrtfpfykba5al7dj9931hqmw3ffvuo8yworixo2c6odw2qipr9ge4sc34pgxy8pyq188omzt201uuhbm4ih0xfc2rlsjtt1sy4770m4x5ohf1zevojq9tv7vif8dhiy99u2pnnlekct67lsojch6q59axdmwoahpgnx9o00yvbab2r7rphbpju0gx9n3fopcoiuk3ggn1g4271iwsp3y8q969rvk3voit4q48gh3nd90ftv2lk4bit44qcuqk88x1v9wbw1qpofpdefvpbvl9q400bnfk8v09b8641o6rm0964liksvvgdfw26nwdp62044bsxvjqzp3tunc5pdjsajuwyvobtfcgjtmqqv2d5z7qp84ml853e1mk38uyib6z25hm1uohcfm8n4o4iwkiivbhwre2nlbu7gcag2ouex43bj0v9nrmyf8wi19hhdi9s25yp09e3522l6jmgz0mtjswr7sin22z1dpjombfsw7ycjwcc0iwk4yeoj7ef01x7mvy6bve29sn0aawuq0edtfg9plzf0jrksktdt6gkor7wdsnudmn8ezaaq6fjjcqhs5jjho6aat1r41dnxd1hjeockd1kuevjzkv9e7pxr9m9k119h3d4e95iyim2khtu6bhquhcrfgn8d54zyu3sw67e4leaea8iak9wnbd0op31e0xmdsofv1i355x9f0559p13fqn2sokx10y1pn7aqoapav9ujjxa4jj2htiluunmcr672l081i5jepnfa8vr56t8hyvkgwz44emfen4vubtecyg9xyxgzk3vxg3y7jwj0cd9xakes4x9zcoougw1moz5akr737b5z4xjsaa48faw1kg3g7fkbjobu2sskhq8hcmce1juq72x1x9scsap67f5vm329swrmiouv278vwrjgu4ysmpjnji6hoojogqzb5fj22gx6makj3ay87lkbhy3m6vryw6xdh664xtxms1dke5ipnpossi1wfhostmfhhyg655tpw0dbvgn5sj6yfbghohr0i0bg5zhpz4zimdkkylumgt7vk9hh2tfyvaibuo1k7eljtvcv3g1bap6zsnypd7po2mf5oj16z4wigomtqd7jjl3x4lo5t6bzwyr5ibuv2ad7r49v5lg9t8uup8sinl0n5m0qp2ka98nh7rjkqunni0x5mbcal3w4xhwt1mn4ln45sui0bmlrssxuvo23lji2qpznumxrpn03q9rrt3t94kctgoy6hk9u0zetxm6iappysvh89co7m3vjg4yro73j7zk0omlwzi4niit892lj4l2reo37h1vdhdv2m07a4iot05byripa2937dm5tvi7hh9491zx1gdke2jzzftyuwcbvwqwky56f3i0j2xmh7gi2rypgkmnmm33gqrevjbayixcbsjje1vvi90wwpin61zbhm789kwhihnqqpaia7hxiekqup75r0feqbkw4htqithssu2zuvvdtp82mobsqcxzyht9c3n2qgyoguw7mfleaq2uld59efguubzjo48hg9j3h3wi6bdev',
                expiredAccessToken: 2668653159,
                expiredRefreshToken: 1682743796,
                isActive: true,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'XXXX',
                name: '8i7jinmh0o7mr066pd4qi64bj3iey19fof5a17rhvykzbuv2vehk670y7c69jxqt91op3vp7oyp6k474zbo2p4ej9gdtwor014oxqkj5m3nlo55fnaa2q9baiihxaudc7xvzmca8eudna1v0z2fmwe8t0i6egs7xu5lh9tnukvyr6udzystz5wjpqvqs3rtdjsh24zly5qaih3j58lkyi2jihmfa8ir1ojdwbupdlw0bsr2s5xc5nwb4od9ewn6',
                secret: 'ur1652f1rcdndf8ier6n9awgpc0k8hk7a10d8bg7xy994tbvjsxm9ghu3rptszyc1i9oqejfalknlpf3veokdymq88',
                authUrl: 'bgc7ecnspwo2yhr56ti67olt5v1bx2fv29rfzchmul3lm9oeqz3b05kyt1uwdpqs7jd90xp7wnyz1u4cgkqo4pkx33c78cm912r3yvfmvyjewl0b4hdaw8jffxxng18905qzqsp9h3ks28y3drey5y5ulie9pktxz60yjdxzw16z6mshufomnihaerhdvju386shd73zll5zbann85nc7oyakqim47qfc8lctgagt9o66hk0n5lvcu4f82uz31b2rgitwjwjmbejldaemfyvgyp2g37fkhrphm8qp1f75i08jtbr0uh2w148641fzthjr96fac5257mm9dzr9ppqzfeiz6chumkxcknhon6zhj2g3ln7uvn9bfoq46caw5y9qgcuekk8m4daqwr3jpof8ln1q1laaxrybp7gp0rfkqcu5sdcrrec3idvw1za5veifcjhvc4z7ejvh25m1145nqhxxp3ybyc0lg6jmknv9izg053ioegn5jo53qwkf0rxygqvm63lx93tr3u3zbzjlv919c8i0gyw95mfdtghr19lgzqukvsm5zrwfg5qhn9u4tyd07udns05gwthzww6lsl984vnfvppu13x7ovv3krnhwybdg7ucnqdd5dr6lswl8fmyt8gyv1m4554cmou0r4zzourjitn3hcjv7vsv81ef1kgalsxcotemgibp9ji3lxta7amncdlnuu8wshsub03xaxn2h20s1ktm1awgk2al5q2sbueg8xwyfyucrhwxha1ut2znlj32alrz9zur8y8rx4ukb0280eq90s4h4eddt93u6afn1fk1ukllty07lf4u455buzgwnxa8pfe917dgopvqqgmy7eeh0zh4iciyckir0yu3dqrsk26qde8mg4xi8gndl7537a3qxrdwnhswv8m5yv56ip5gxo8id7nghyydo166zcxp3wkq3nv7fiqz231a9izq3ouu86pzlfr8blx0ri6o8yhi4chjs773xszndz0zu1hhrdtecbswl5zlhoh1n194gtgrsovmhbh1xjafx89rlcrdexvcmn5pxwkwrwaee2fg4f2lb36jljipwow72j2nswkpsjj111nw2z9gtyxiu180slff97lipec9f3p61dv6lqbp5x1kyvi31pkbsg5l830rpyr14v9o2pmf3b7sjzbcnj9pawz1ejemkoqm3ivgj7add7uhbhh3j5gmn2b8sl6c30wq0w953d487lp4wmi9phhunl1hfuossq302z8820v6kq23eds0k5q6wkj6nwf96l8wgsyomwl7lh0jk51ens83rc8ssnz0qt1aq4byrzv06s1z3yewpjv74888mvxjotn81jy6nrwvouleuvyd2ac5aoiej8qala1h1azl0xynvw6c3k0jz1cas5lopuqjdk42jhugw8lqcju7mytkd04bj7x6s7j2poihssstwn3rbcmeuqinkhzi0196c15s16ky35rm2hknjcd85mu55j4nmxe4l7wd324tlkrwotk1flcb6vsps0di0adj96vku06j7298chp9ajcn5q1or0zvor76dtugiejz4tjjlpt7ht47dpdkg9buywjrmvp5aqcii83838ihn1ex69r05v9j5hovxipcrujp86nzlw78nj91iq3wk3q2bd9ee6qdderui2ht29diqkuz6rzsgcoqa6iy39kvdtlljeqnvz2qts70ttmnka5oqkwmyi2miqrq4s8qoh8pky1knekb1fscq74r8ud0v7588c4i7dph0uwik2x9h2tlueja06l1zmqvv3vferwrjon5k2ttfsll5xge0doty48dik79kv2hzd8ngealf4cohjo6h4xbt4ha979txx00vyxvnvpfrh0zuj95u6xo0i339zg7dkpm67wegeux5smz065hbrtsqj2k7lxdeg406b4smk67jddfn97vof0ctxjzxfo3yfkh7kln01tc16jgusvctatr3447jiw29c53k3pgsju2gs39ng730p9fqfy7j5xm1c6klqg',
                redirect: '0xodwb5sxndt1ycbycu89ed5co7lropfy6l2cl222hqjznwyebdz1n3oyuygl3e9vhjfcfegpvgdlwlo4ggsi6nbho02zc0t8dsqm79bstt67zg3xx8cv95h3f1qi9zkkka73227d0q92uzsoqfgkdyjtp0vauaykfwg3q07icpix8u42ugbw8alomizjaeiywa492gcotlzxvpypn0fuxi720ut5273qm2gfpjinz58eefu3cgw22sb0qvaa8pevwvc05boybojez9b6pqa1pf51nx2fzq5ewnaocpezpcm9zouc00doc83tc589u4aya1yzh8nzqjlvigq7yhm8i5pki76fygn3ni08l1mgxjzsn4bz0o97ogonkmcap5jsmho74sw5wjduphfeaxno2lsutygcwdg06zuwu3cvingh2tgpns92176wgm4jviejq90tsjspdbynx92lhh9ao466z2d4uyc73qdt97fxcczbutrluql5n91mi5u9bfbo1eb2pk0bf4i5oskhk4esyqa7631oe9d3mod11y635zv4ocej7m9gnc4jq3o0g2xq50i0n22re0j3svi0ntirh7ivz2632evhylgoouihqlc03g1ubrh4yf0tptyty1vxogguw9v7fb3m0owna4yj0yruecis09gkipamhz9yai0b6rw23eyxnwj6s1hms8qogiqjg6bjjucsl5mxd8u7zsjtd6pihq4u4pckjhm6dsl2i89bzekqbzxm0xkx4rht19z357e4vztlihhmk3hxsz4wy0wyuxyliquppzwfg6vuc4609egmoutbvygy9yqs2sx7pzo8r0s8j2ya9tpfmy7g0voggvxu0rwl21kiosw4x2r7m8ju2elxv3s4n6x8fcavf107g6bmuysquz6toczesd5yadqp54q7wg4pfb8dpinht9x1zpcbw3zq9u1bvdnu60d8ds1qbe3x4lwtk2zb9tlm6pw6gnf1h84iju7vwku6nngeev0rtawsxk8ulrik4avg8cm9gzzrqivarrq1i3codtr3jp5sxjhen4r40fehgsib8egi5oum35npamdjxe4dmsxrso1dicld4b8qf7bmiuz7v96os591woxmlpqjjx07p5uulww6raulhbxz7pl6e54sg6hq8lkhxste8msh983vnxzk49yrpzrd9v53d88pc02178mhhwbozp2fh6ln1fiklqm5ue30plb4seo20usfdvghl3ocanuoekryl6iw7wm9md9uwbuniuiahkq5jhs8rdftl4h1i6mpmbtpd6ahtnwn7ba5mb6ifw2fctju9suelgkv1isfqtfjbwua99o5m4u2tf30fu1ua0irlx2908i26oeioysosn9q4yp20kaqhro8dvm4b4bryirdohnqruddarq12bekhpdzea8idp36h99xszf54az0ne5hz71u270ocx2nxgw0huuusfgbth7o4pmv9ovlblmsrgal3x5qz11qstvoqarkh5u55xlohpcdplhxeouuougzbhyi3bbzlt1sl13h8t0f38qvqvskskagzszleg4jz7ffzaolt9emofylw8j2tw23yh7xyymwoo6f256gva92qoqe8y3nwg3rbtp1aropw6msa6qyffic68desuflj7szvs9svrkz4k87jfn33hlggm82m22wdsy3jtu7czch24iewe93gfmi462pyzyvsgr3z72va7wuobzbx89vyatfmpkaog25a3u1m1a6d4hy7mku7v8xtt147lpmk9whmclw1brlm3u4g77tf0vxgjltjhya1c8g4jy3npyglb3t3zthyqm18s9nz2o644fxlj3ofgi3vwsvbdo8q4bp09zfvp8aw7a0781ds5punl4kncmq8183gnvl9r8ou3duh5lvg5gq3mfxw9rkdig03wvu3n4nji7beetqkxnu3wlnx04b1wx2y2yk71p1agiwsczfj9ixrgv9v6foo93k59hgkmn89t141vg4nnib32vyns1l1pk741ogbsr',
                expiredAccessToken: 7137030023,
                expiredRefreshToken: 4594593373,
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
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'CLIENT_CREDENTIALS',
                name: '5kibrtaym410rcthz38fdhekekoy0pbc15z5ga694hkju986vs54f5kwtj3qb8otld9lfwrt0w2h3pxnbn4p0clmmcilbwd72pb4v9neujqsai2k4s76b0r2movhbsre6ssgbv7kcmb1lr2r7ho8vhcjehkkf6zut1nbrsdek0gofi6oo50yvvb8lkf6jjoxcu4y4o5aamgsngdkazjkfg6nsfxvn2v69i6iocog9gvgn3ih111aecalmss78h0',
                secret: 'q0qe7p4apyyc47o3iuzt48y7fw3ytildp8cnywvdwfq5yumk2f0473i4dc72s81lpq0jtkm0w86q2qjk8vtsfiwjtr',
                authUrl: '3c4gcm3smel3m84rwnwq5ybxoozaf58om03yt3v8m24umpf7gs72gxc1umffnmlfbjy2f5dhxmuuxqtgob0glch7zue4uua9lkzhcycvq0dvg6clapwpytxsm0n9igtu0gwjeflg67o3cy37wjxgbv687ephdbem545vn0baavidaho0v41tm3hjelxd7ajwf4cfvsenn1ul3thg0ja5hzxu7diycf18hsw6lqofc7pnrsif2myaepwo0h533j98rkne5z385p4whwajchcif1ce7emqehltxob3dvoxte4rruva1v3bo9pt0a35ejei6109eh5qapl9gzo2b0blkmfryx7g8jbrrdzv0jidgnk96zqassq4d1p2zivmjmsv704ar3vskm0h3t1gmvdnnqsgqhz7zhgahqv58159uz1t9pbs8ietim2p49kcizy1mc3zm5q7v8yt710fb66hh9bk30s5jibxf869tyx4bq4z8vqjjotf78f9xtsotk9sjlx08v0ds81a9zt4ln6fml3h4jev56zuoxvhmm9v0kyo131kn2j8wkkcvnl4hl2szzzpjgr5pvjz7gxs9cdg050rc07v8ypkgawcnqbl3n2mqacvo4waru6ry595a0hg00cwt7f3tls9o1krc97muqdl3oovcc65fwc7ttfxwx55vae9uexovfugwpt03u55qyi4mvrd6rs386zjcqjd7akwqwprlj6lcomxp18pxls3py1oqfhnm9lndoq3cu6ja41dt6bh49l6vjloiwo9awikhzmxryttulc0ub766l6tk3mg7tv2yc46m7m5ty1wtn16jou521w8m2txs2r2y80evu57qb0v9bu5qys2muzvni94gd8ntmeru8eoa9xp4fn9mcg6eohr0wmxlsqa71ta5gsulw98xulm6xiqpdgfpuy1mlcqjypkxultvfc2xegrpdwx1upicjv8pzb1ityxiwthg722lkkbxeqtrh0ssi51877emhfjubyb44kpovigffou60qocow6qlf7xtz59brjzyxx2xky5fyen91azvtko9dvf2fkizeusklsdwx7teu2qe2gnn466ibk9u9g9v9239yr2t0p5xg6dl0zf2vrwts7w4keb8w6bka700a9veymg19g5xnv16apu5nk1x8b3sg93vag521opyjpax9jlnmei3y1xn1wstfhx2x8d9wsae2i8it484zhpwekxo99nep6vrptazmk2vipcebufm6b96fabklyx0o0e1i39udc69rlgtmz14q5f3vwaem5oz9301v3cfmni2ftjpnx02u2n9o1ljxidufezbke8rsjz3jdo8r4w0422wlwl74civxsyrlggs8ot0l1ap4az8hosc31fozws89hhotlrisuaz1myku51o8btqsg8suiai30uqm8e1nbk22yky7x6lnypl6bwmcnylkn65qsy79a96bvjs2x4bynhapboffxc7c1sobbjct316nyl9t1inkt5mlohf0l8586r1cy2k1spnywadusj853n5tzi6lq8xqyzijv5bgm7sxoq2emnng3aam96o8y9qykbdd0nd7is2nx32nicwex2py3l2izmuaw2hcxhan6j5djkjp4zf68ynsg00wukqrxg1czh01ix3cf14qy7s9dhc9jf6128rgvmgym2qcxxdusajvwho1b8ylj914axo586h4vdzwjqiz5muaa6cojuesp0n3rmkvl9gwixyum2oo8dhos2t96nwy51ym0hmxu2eqkg6n10wklvjuml87dnuo2tk881gbvm8h2x2fuz1f26qufg4wskvl0qkbeg7d8ijpnriob6e5d39lp74gn9zc3l63m5d1sqfw8jr7x5qnj57yppfnzy2rscsa1481dioioaf1c601frn6flpbw7q6t2kz6e1tlkyqmahhzuhp0dspc9ul5k91qzdih3i64e07teejrhe797pzq1sbvyo6zxt10vrny9itizhhjafm6964xopkxzqnmhy9mht9d',
                redirect: '4kobk5r5m439fq1n727zu8ml8swbifp5hq6ycj4bvrzjbi776muu08stdaun3u5llcjkeflsqz2lrhmmjxtfrh795640z3stkks9tlfhwsvgjep7cng62zxyhnejzzvvhuu5hck9r2dzra5p9hc9inyhmo3hhwldeyj0ik3ux6hefs8xhdan0kqnac2e45gtio4huq6yix8gyj50n9h2qu0g7ojhcd46xnxp7709kw579z2paj8mixu96zxrmqxnsaweon9vu9cokk43g9o4cldcuq8wx6ine0o04m7ppxujqr57qlf8g46cy3yqxjshmx6h5hszzonslyimf13einskw37qipwc8mjer1s0c0lbhnwr5bg4xmk0yuj0cejr89itjokvbxm3yudcz528cy0lu0k7oiinov3d8vgvyy0ng1bl6iy8dr3w6wxuhwv2w2fj4sg1mdp3qikptpc3o8jryzn8qzwtkuvjk3z9rfypckytoh7y9o7xp3e7iadjntuuh3k19kdyhfqouvgh1siqn4lbifovf8m57llp0414shrh9wk6gn31t9bcodikkvx3jbwqet9evsy1oxzcv22m8j05w1goyf6v3nbi074on2c4zx4xlmypfz6vwoytw7up767483ue9a1jxal93rlvg6jdk67a4isp5ytqi14kcaanwpkqv2kncgdd9zatty9i8hwejns3u4umsz9o5zt98nszxl44jgqrpj7yyiznmu0a74imtu3i064wtnnmt5fbhmhgj5upw6seu5skurhimykcyl7phvzitq072uzup9g1zhmef3ghkajx9wuar6b23doouan49ohdhvwie5m72fg9igo3mi4l3npoqhqaj9gbxfzgq6k9gqnevet1m8gr1wwnmiguiy69wtzrh37sj9msxjjid09jhkiu0hlf3egyj1l4mlsrwp9xyponht0xbo4ureh4u5he636afg7vvnolk3jj0nw57c1g77283jmlmj1caike3k6prbtb68uguxd254eftm6142lonry03g35huhvw59or66iifeawjkmmotl4bu9wk7wzlv65s0dhbm9v2tpkmtwxvy170rq5eiqjaqokd4qiwxm8iakmnacj6h5hnrxkfla98wi2eai2gobskuq2j9seeijdx1p00ld4r8ozjfn0nuo9lsgjzoto1i9ckit9srxijvyipv0wsxxj6r8s4b9dvayz44vprncp4bk54sphzlhqffivu0lzxdjp8bq494jqv0r6eaezwv60ww7ixuwujziqhxzah97fv32v8j39xse4mp3b4w81ylsvsobgusbpeb6h2qb8tqloql0nttgtovtkdbsaa2ulxb7ylusi9i1j45ytew5pyzr96kew1y8kvnxi24mmdps5twrqtbj8do7de4pigxqt9lpqzyty5u4l0fjfp0ftlee95p40zt8sui6l05ugjf5juca5xza7il8im7jxng728hvn4eua9q38pg4yolrbtxu2cu8jelq4cwqa29yktzj4ew20ocite30tnd8b8buba1yupvl39i8hdb3gxia6b5xmdk7y9ys11xqmgxacwjkafokxuebbsldqq5o81mt5g2ww5cnd4gpav8b8om27o6ctpzeb9nh2ub79lxgrn0b71wc1fgvpxtt7b20xjbdxhhgi2a632my23icjwi0ycqvn2sr48s7kdmffalduzd6zca02u81rysji4mf68m2efg4aibwn5qu8klv6g9jilhpc6934dqpyawvabtvlyn1qw3xqs5fj66lsnzgpwqrxvvjgjwkeac62j4c2k7gqpl29p88i8zan6x0kgsg8jej84ph28yx0d318343pxzvl4y3um1no665jg7wkw5g26wy3fgbggwj7t7d4h7xu4ad8h1eenk5oj7dgbsj1bwvaw13bygalggkaxf9jfrx6t6sish90vbfwyri0j6znnjjl0lxpq8zvflgak6gy97sl1dnksap2c83zfyix31soyr9tahsrxxmy9or',
                expiredAccessToken: 2001609942,
                expiredRefreshToken: 7273503360,
                isActive: false,
                isMaster: true,
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
                        id: '5a21ec88-0908-42f6-8140-10249f27f78f'
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
                        id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/c891d9db-5937-4b98-b9b9-d881bd62f24f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/3a3ea27c-a41b-4a60-a0cb-40ee434dd52e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e'));
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
                id: 'd9e2c9ef-b15d-4b52-8bad-a880f2bdc9e7',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'cpczij9y48801ggtbwrfyuf0kpli8ybbzbuy637oukou2bz23xu37f0nuamg8qn48hk1xj08urizjyzryysuhvzqb8z0oardi5nict5wqw5jmc1juwbfijhko5rt48rv8xiw1q5e0odyfvbn7upzlw1tm41gxrmq0mbbljwmr2qp0ujeq31a9k44dwfpuv3rz8hhjvwq7yb7sd9ffdnngevim6f71ubvifd8nwc3a5ronj9yjjbexskp9nusit1',
                secret: '2oomoljbz3e3ca7g08jr5eiycnkdg9po34y677o4tuym8iphu3qloo6mz6o5apr16j2p1yecp4id3568n1o3iptoky',
                authUrl: 'b8ap9u1yr1btorpum4buka1sofdke29q52pfup9e9plhtq386s3c3hgw9w4lvzz3efi4wc4j4tq9cczj5qwyr3wdjpif0q0822cnoh4qro0um63bl93lcrzsomussyzzz8yviwvnke0l2fccy9hbae6o5u451gpz1diwo85xbp2pd0x704lqcgrm13nxxfpsgy2vakcwfacel5h6jjhiny2c1j39pkgjltcepsv1nnqr7q9foscvh0grrwgyh9fbndezfdju0v6xwmqqtk6ymot9n3yafzy0ptrggd754ew8pz5bsftdtdup4jv2wkgiu62or07ko7oxf6cfc19log7z2tv1qvpcom264rdlwu0ersf39f3t0vpc1s5f6uzldrta6c967av4hjs5s71jrdn927lomo6jgzwrdwpdswdg3bbueor34rboswawsu0qnja14r60qb0j2zzfad4sp4cn53n0lt8gpr10j8jucq4ofp5b3csiv8o5i7ft0t76vxhiudjczjkc3y10egj7f6i0swgdv41en9jhs3ton7r6wg6sl0t2zqequh3zxzqhwhrmroiz8gedeksbnkhceo7rvc7s104tmamece9bjoqg40s3h2v6q7nk9o2bcfl4ws0oaihvtebste1rjoh32enrds94a5ydg4j3gcvpwkisos8yqtnkabplba9j6z2sjgkbzlt4q76bofcs377emo0gkrlwnfm2pym4oga264q0sjulccnzspprqmejx59ws661iw15kkbg5yls67xgc2cmldmh898vyh7scx597byt9d44rv4bfxekylu9x4xa3185wsfyw7m1efivzat2tywmcygt7fuaf4gse0rqlo31cbqvnm3frcqlul1lwx8bi2nju24av8sjs30x3ac8mea2fojotv3pt6chqe7vfclvcttpq9yoq6vdswm89cm8k4nkwdf8caiwbb7qx9ltyf33xwgz6i7oneqoms138xdjqjfogeucaqthsnaqlpcvcqudp47wf0scs6baxkqddo76rahekn3ayw9p4srnyu98brcmlwwpp569rd71x0srqvy66895nnpf6hpmefcho9hjfxgooimk1k8yrv7byhw3v1qz6l1c4jqqb2jzjnq1iu5x5tv3h9q0n78b72pzxahagq9e23lvbux9c285i3ktdubyuz6f83eul32ynsj1qoyvnred1dsqby1d1ozyg1z8np7lake0p0qfgqddkc1h7sb26b2wd7ihx9ql1etcrmk4rnwt5csd3np6k9cxfoj1guwob8nf6c8ks7me9kvue2987gitorinfp1ruf6rr59t49l5nn2dn740v0dbnz1k0re6ii96umtj3ctbt43f3bhusxku01pd2s2j79ircp66zv20kss9peqxje7lrwl9fh3yxgii56dszwwab6cu7799p2et5v5t7anaoknfwexk3vtkjhkdgtgl35tkda1s5o75er1mo9d94j2xsgj797sdu4zus2kwf66yfz43ydfrhsg7nortis1g0qsauh9iecb00clgvguz41zhj3cj6w2trz4mpnv3xxb9oqdtzj8qtf7r71eumj3vaggbglxhfxbflssu5fhkahfneqbapsoo3xkwpxdn18a00ud7apzkpvnvbizixinn7sa4cyy4q8pkfbukg28g9r319lbypvv106kmwf6y00ei92nxe0jfuurij5qu7trvnfm0f1u92aq8qpzu04sjo8nktndtt5lzfrxj23calvxy57nxwqp1t27dqy18swvdntcx08hugqgq4q6jiju0kkq9vggjpos29wss7hgat7uzpox5j3okmp8oq5i978gsw5nmjs7we7d25e08dfxquzo7rwv8lw9nqbvjrpej7xz7z6jiunayi14ckmum4593g1l2xfq1ces908oeg6j6yzr4njoi3pkhi6k0n7mg2n47ddu1ddxxlkrjqlfkd17q9stisekvi12ofatiaqheaocp1fs9pays44ceyouv9a90h2it',
                redirect: 'lh1166ei9zczbt2ayvsx8bbbcmihssc9y182nfxi9e5g9p2dffwmbr3o8a3aphx9mm9b3d836lzp4h1fn8tuv8ka734i5lae2ve0righb94fnoe6vhb8k1zvdvd8sdykecqgcqrz9dr6zffc7v3gkzx1w3akoiqlxspgdohgwjda96kdydmqzxkkmgzre6yxr7r5y5q4j3gac6gipd7wfvgs5wx6rpl0o8m04i3u61vmw7u3epksqv7bjcv2iy5py7joqrh9kelx9dl3cjc669nypxxnz7ufrdu8gaofboiaaadyk4sgg68lhiwb2ia4yu6y1ul6hu6d3nfrj2qo3bghk0rl3rqqvkxkr7etbmhaezieyujhz3kn9viw5s3gdohcpqcyhzs884d5rcksed71nkfcdploocumrkdd0va3a8inj2dvzu44kr7gu1mlo3vmd3q2zg2grmd2esivzjs9cl4q3fx6zvg5d2k8iul80qmd5441dwbav8wxwsomatkvojh94hhxro2c4e3g5g93qrgzee0t2u5qcx3uplximgcmpkc91vh9ow9kc0mdn5gl5sdj7k2qersgztme28wwh0dakwh3ithth9xnhdhynnjqmca2sqdf7s9bd6wo5ybl2me4ux2wy5s2kqf9l40bwl2pu1whazcxs9f9xqwv0ikrxejlh9bgqopdz5h1vxen5qcxi4f4c8furp7tgg9460wnjh34j14gj81alaccfuryoevjaoj9g89vnaocfxrjek4wflg98k8jq3ycdlobvjzl3elwp6872u49302sl130banmy387x5whfbx6i3tlppmfcd823ubang5xekvrof8esr8eyzv94n2ti64wg8bavi3ofvns294x7chftkpdpr39g4j2b6egsz1jf7plfk4y8hxazf9r8mf49yn7gcvrvl9am4oco8djfqea48mnoqakw5obhfz5x5x03g5pe1eed4bzluipteqa6lndmvwy30r9n3jqbwrtlzkvv58po9bdca1lo0g68qmccdjdmvwewe7a0orv2fca3fcxykrwyjsxcnd6puto00b531642tqqw3rcu16appt5ayoqq6rpjd7n0e1ig8wn1v28md18iovqfwu4jgyayymbixzuictr451cy6yej3y1kpein6unwlzk4udzv42eztr5dzimee5j7ny2eteir7xw6nu8mwrxne2zezkk1uikzrkw9fp7mdvt0r2foh0ass92cu1vtrbxvx3q7v0q8xfay62w5uowfmo62zllji87yc7emm50gj06awg24kxhlk5qtux92h4767ate3jgqf6009xttw5q0hwpe7rd04h05qd8q05qfz5mh6vpc6kf60r6spgrghj3cxvto5oy164vg29rfivkxwtwfi2pm7z59beq2gzx98hb19tyakbnashubl53k0gmnjlwrzyjp8u0tksnecchl90b9go969vvqw12b7sek3683wa7630ojn479jh0nlnnwp7vdtvufslab6ymanzb1a7ilmlpxyivxa2hlgu9afr1rmd6lshry01n11s7qjixt7x2ovh2vsxm60chnvwybmyksoc8fe0862b9gnyxrxxw3qau8lhkp0lidpv7ekkg86lg2w9krijfgnc62p24dt20fqhknrbeybui65wkzj5jr7hb2tk5tftm6nat882uzff57u3eumiah32fl9qgs557jjjmjfh6sw9r7vvips85i7pkwp1nmwm6ft9p2vvrnd18ro58zc2745jolgcrj05bcjln7cs5v80y5vgrvtifuj5b98y8a6gyazaajp8ia9kg2ddtjmklv0wh1yavmxb1b2esrwypr2p31n2u8m1rl6fw36uh3bbpof55xbj5m98omtyo9s4gobojolw274p85oc7v87sqlokh116jwcmwwfzem9cv7k9y19yg78mrx4fkcb4avnptv2fpjb34jr26cdi6t8d9dxpx6n60z57u4zaf18wze65jnzremyrsfzl439p7vwx',
                expiredAccessToken: 9445719573,
                expiredRefreshToken: 7472065997,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                grantType: 'AUTHORIZATION_CODE',
                name: 'wr6osy7naxo5pt1lq06ecjr56xcmn786imau39maph9lmu2liqz4tyjsgyecd1y7y73tzbv4qlnupo4ast95ra1l3safcw7ph7llxgaea6ol34cgawh6f92pqga76kce4d3fn2fnzp5oqbh1pvqw90nw3e0xzzp4id47k8179ofcmtjinyauzkdrc0pntcoygh4p6of7emzpxletgkkxm8gtjub5rpbd48xqudo9n0qpoke9cx9vj4xr71jn5wa',
                secret: 'zg5raqjj26ennuf0q0tz57tmxr6a39b1adf7oj11awj0ceo1t3k3kisw9srccl4f1h13vldxls8p5bj23r48c0kkgi',
                authUrl: 'smp47vcn6ebqauuq3agk3mw9291vwox5kpcuoyp0ee6rbnznmo57ufsik9o25sos2v6rg7y4cab1jc40axc4l9u59wm8z0gx0i5z9molrnc026wbolfgxp012mnvdporvo49pong85sdaq3j6ha4ntflbygvzdbz5y33ka8og880f7laxgs1zlx9t9lshrrk94pypy098b6cau0ra7qy0amo3taa1sjmaq1i8ee8efte20bwuc7n7foluhrpmjxtw95im6v6e2dvz3a0dpcrmo19k4smcn9q09m1z06ixqf1ag3e4kic9xu3dvdjgrm1v8qj3l9hiwszt1wmj9psqatcv73sg8cbwurycg3vjprxhflg296zo7towx9cezk7rbotzuxhfbun5gjip8z6l3kth00d8lfxvsf95voru6shcgrphbdszdx6m0bf9wj7pixoa3znc4quxscyl0sh01h34cjutcbppassdnxn2bktbr67lf4y7u0qviehc8vd0zh3x15quci6emoajqnud1gx28avrgf3k1lq8dovefprflm98yyybpl8kem9qbcw27ox58qm2s3bymifokkv20gnps8ejogt3nm1d4ngcsdb2xjwfipv2m1fxlqok3ziru30lrnyvg27rn0n96iv9udo7d323gn2hv2hs6mw59cehpuvy94l5g72faqkt6cpkuawsx9z30zyc208yi2bo21q92vfhc8ba3ufixtjwlsjjtvqm08o64k9irr14itrwgjktkmnv7uf7uiittrdhtd9zra3827snbsbvcws6hqjiz6ku359vytgc3hjllauhdmp3mdw0xd5owhrzau1xvfa4k3t0f7l2fkcnq3iehrp35vd1m99c44lbjl67jwnpbwjbwd97cw7beqpuq5lt5i6z72ha9vazozan84hgp5tz7g5i2ekyfzdb7cy8mwjxlqiveiyju8p454nod6b5sysu5bif2swkdsv0a3qixeq6cv7mz1s2f09zvcqplid4i3ur8dihuiupszp7wuizmkrwr2amdr67xpl4xwgg3schdi4hii3cbxooeykmmaukvquz9ibq8axra1sv5amojr7c3jkucuqqwu5oeiym1mmljeid614mu53ypveiv8i7xducfjzg97zx98fdsjprkh4a2m6z79idrtoczme8pgrbpym2aitnrzxfl57zn2gjfvjf9o7inydl7kwd9i3bwvxtekl2abwtkmwsj144hnzzxjjqtt0fsfjp2hrnyz07u0wj7nky4y59rf3ag07uc1rt00ev4fx4eets027nfekoi3sfpy5tw1wjo1qnnq79ai3cp9gy0r3kt53jbjlxl3f8p0zwqylgy0qqdle1qd45i8cwnm6j129nki9ckak90vqkks2n8gfioqrfbz31iz4fba76ducas1le9j6v7nr0umccj5g2rtqg59rmvpzmrl5d9l230e8u10mw99al91eqkr42z67hb3bnwt92g3ix9ly00xjjupnewi9y7ydhxyb6tr9rmhpdt05zsobfvm1xio73xppl0qhueoc6i84xeq37cvoyiqcjt0armqv85sg5negb1nsmqs84ic4vuv9c7xt53gcu0zacawx3at2958o97nm6yorbtz3h68pqyeno4tbk8lirijmvkf0zndk2qj2q54nrxw6ieyvfxiu1nxs0nxghtxdsblijekb3jixkd6h2awvalshfhy9ftrnvydj7a2ryzp0vqocq2q6sjhieb0nes4m1ef7ne6uds7uhjvgb76ragxa24l8yxlc5om2r5zd1gx4e0ifzaf8tcncifo1sgp4an9y6nly6nst4wlu31hfc52ymycsf7lbf5jtycwpi0nu1675zl4tysytoqopdyf3g8s5o4z4l8if9ck6yyqziljykkmkoy0nv1csjldncaayl1uwrhtxv4qt3fua0m0rye6rn2tknyhq55fc8xftt2i9ikt41ls8lrnpaxgxmmfq1mal23206p0iuytpt2prasywp5f3',
                redirect: 'r6vxamct4ie7pyi31lqo6kxmm9gbupv1wdfxof4bm0qs75tfkhpah32ysatywsyhdaliq0nwai2p2xyu4654hs4htcrpuxoia0x167pd9qqlfsfu7ffr0kd1y1sbvb4lj55kepduxyxb3bab2xqbg8p690fpgels5yuxi1gr9he5m7jift70w5rhfpm1lx004q8hgp306qn238ayj2bz5d6bo088z1yki22mlxqe7q9qhirpwqb8vw11nm3hi4eebpivrsb8so4hfydp7nztmtr7k18gx1q6u84tiblookcw4x349r0tzuggot4dsao1oo1oo4z1z8gm3unlz0qotuv04ohe21l0rev2tsfmile8cpmkyfvoz347clj32p267idrlvvjzccc6eotn5srjmpqxetcwgnztgw2wccfd16j3ctzasp2urftsmxa97l7t1y441qvfuxxyzi0crw16z4gvbc9lkwcuu72ty6ldj8nr4kfzt4eg7bgqgjttk7lg8p1rzvsm0gwbpqw91dqrefddk5kdydyc5fe1exheyc8521u2tmr0yfhb1oghturlbslxip6kqfqsaa6x1znqcp9zmrqggz5pf8jramn3lt4skjmisrp19qdfnjx1o76kmvueqyqen975njkof7ibi4dd74it3pbp491gsv8b8qzdmoby6erlrd0wagy9lh60cz3v4g0tz1y0v0h99366cfblve25frei6l04d1oz1jmqoef1eiqfqevp9q4bilr9dtj9eyyurny9aydjoax6sbv9l56sc7cqhjtxrzvs0kv9vi1zniqujepx91i0k6aiktvj12d5wb47kiq6gqyoy1wam12l7x8wzkfgeikgoql0tmbo3vjvyi1j51t5b5wp67k8hvg86cj3k60cuc15bt0dmjl3ob1oes6v20kjkfiygvwbrxyly5bd3qtmnk8bg7ses9zykcl2j5g4v81p7aznaq5hjesgmb1u87iqkvbksfdqoydyi5u3ip53n3jbxrnewq3sxz633vvi01oq1in2dwcx829xniljgscq5xc2hu92xlj5k095nubs15m7uxrogmf3sfmn21h0r3aio9oero8uq51wk2w6e5mgdg00sbl704uhugh17v97pvb0sj8ujoff7zzwbvoh2eysu2hfm54f628d7sc5b00ms3y25b3ftk3f7j1qrqpmvoylt77hlsiqm26j45ivr020trsyzf2dyvxq0m0nz1e0zrngbpb48wr8qhaapxm6jbsbrss7vj28s0dm5amdxj28qzy3pq8jnrudxd169e2rrjshfplyylbpy0kg74g4fglqnlgg1dfpv1ktvs9jfqx7kxmovajr5bfhy6rf0hd84yj38rtdpf1o3akamod6dvtkdb43jzceamcthmyuo7c7xosq47gp02ts3nbxkvzbptwkp6n1vtxsw8vljmee96l8h42twg8gc4rqwe8eqh38pk8ksii1tghwlz9syr2d75oc6huhb0h3mk33gwqosglyjlh49actw51n2179he59gqj3qezi58jhbqg9jwjrs3cyvul51y04l4f5kewe7axy9qo9wm962kygx51dzl5t3lnb08fzppiqcniblpsmfbvy1s6n7dxmhup1ejh51kc1zx3ndymoyzpg18sxu26l5yrc3ozvyl8mhrrycab1jn9ourohfmw0w0by02aq2hgyvfd91pquny6qwhawxpa2cso7g3y2e71pnahhsis65h0puko0nbsy3af5b17aocmhes22c1q9s3uoe2m4v622v938s3qboo0ytlmu2ffflmgmuj35ejlnp6gkklhcmdb36cy75miub20n7b7ednsez9h4fo5iqxyz7cyjj47izvye0ud4gssw0gajgdlmtpqw4iuyi3fyt047sqngqsvju3lw17uuu86oommb112hsfda57o85pitux9lg2dasbz82j2692s3xju42d8buy86ykdzn9y25i06jrou1fia21zyg1esxkw53ncd1f8epxe',
                expiredAccessToken: 2918708321,
                expiredRefreshToken: 8037185627,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/b93f9284-b0fc-4273-b0a0-ef3258022c34')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/3a3ea27c-a41b-4a60-a0cb-40ee434dd52e')
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
                        id: '4e231cd7-97e7-4964-8aed-f3a481a432d1',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'c29ah9h9417yd55swyw2d1ft35rovee8ibxd7pnddqvf6d08k1tudvevq66tfaczuaioc8aj46kg8gqy0d5lh1xa025ew093hj6ny1dgj3u5zp30fuiuwsboky59eleqwp9dokrwbhvxmnu5rod89z8ydjzcu3so8v5poig730rtaq1vvs2l77h0d3vazds7v1xabw9ciidz7v6vpdyer71znk7o54xjaqmshj80i9s5q4q2cpawdr4cj5gcljm',
                        secret: 'talg732l1i12luwb1xqex671kuh983ssqcuekpfb9oc94y380eez22e5g5pkxcbxg6tguch4t2yf0lli1em13zeam2',
                        authUrl: 'gtb7datc4ucf83uec16h9ifefz9gt6t2gfbdlvvxxh94k3wr4otgmuo3ovkr2bahor3jgq9v2j1oaio1oxvlqw9kntgdcb3us901l1hoqtk77hi5ls5071yzk1gvj8xi7ugnjugxfktmux0h6l7b3u6uyi2r5xrevb8nb046c6c37wjourmuu7jblr2d9ur42xfs58tbxbzif371v0549yswjphwpskrist4cmp475msyyw7mkbimrdf752nlvh0xfvv7ave1bd7e7ex7mcpqeqz7h28i7t7sv9n5pwnyialdnwkludyijaenp56v07ciyx5nv1xrb9393mry902ggl743mrt9tlr6bahv4q5p4l82at1lphuvtd4b8f9y6vmruxlxar75kbuhvy7vnztlhkbw6gw1az2so0hztdj38etgkpk6bhj116rwzi2fe53sm0jtesdu8r6qexmzd9ek1kwu1qwv2pdemydqw8x8qfkdxi5ql60z4se6dg17nhqmykak2blddwm3vjndvjzrg9ofxq1koqrmffklc3pe9rhkzy4pm2536albroo11jgt2asdpzwy2t6kxvmma43oim1udg54x8j1ejnqlvl4ch5cz061sg8wbh2lxcjzny7ux2t18ascu1o0god3ys6aio7ok83mt591uw6iho2liady4xqwu8onwpo37kb3ocetirnvotjfuesu0zgr2w390kvrdiak2hfe4ox7vp4i21vgq2w6l5pa08vgu1sxbvk5h6f35k6xvs6j08bxb1awvau4wznvco8bz0r3xymy5kcgnnir39vnm4uhxnz5j1x0t8yd3nmwryod03kqt8lglcgszr28bxgk4dadc0egrua0yl8o8salr0jw3riqmvsj9co8tu63dhfyjxlkkte5z0ge38uhc6t52hl29243avxnqsech7cg3760tmvn0j3754sepuhq6cj6hw5ozyi0bza2izl7c2y04bru8m5tpkhqzedalob1y1bhe6dnp515nz8oeewfn6nolazh3xdg9xxvcb9g0j3lofrnntqq0x9n2zsdbsfzrfbpjtj6nkkax1hnryopno9dx3rq71wqxdaqqd80nca6lplqconassasnxysbyz7bk5fonv8nbgwybbw7qd9jy6w1v71p6w8zy2hssq4wfh5uw93fl4jtwoz38lna2cvgzos0rgt46zo3sudurk9vmzwzbbn8bohsi1qwdziw62t47dtotz1r4x0c4cn0xj13zucptcpqmhfypirhlosohbufrvlb3atuzvjn07wbz6tr8b1o9dxy3mdzi0wpb3kdzd30fojp82qtmhy1cepxi6ulglqdvj8ure2c3mgp0k0r5juiif6o3p6g6rk7aqjlf9b05accicm6wecsv2h2346yq8ynytbl7evu8udam8437wk36sgoi4jtkwo430nfh9l2hsq9pddrcnhbf7wf19avw601vjflfek07dtsknb4wo4lti5c7ww98omgksnzrkeukfr327a3kme6ruh93rn067ng9ywoz7s1xhxcy15swaf3a6b46mjz8af67ne9rzgi9jgk85nvbrhywbqrq2f1ul11cwpod2nj97xpcp6k22tevkhvw7i6smoyezkeyfkvloa9mj87ribnho5c7rxhi7bvaexv7vspnkfig8j88mvdefd7mn61so568iruh6dezqhpmrj7cpgtyb12xbbw71n5igf1uqpnc1nr79jckkqcl1pwej3uvn2ybnfqu12xm2k5nw5jzx64vysaczh263ywm6mgsfjwex2xg500x6zq1xrug6ds1i8pnegfa2pfzo3f4tmxajvd9kqsbbc7t2cdqvdkg481pnbhyvo66ytra371ll1dapzlhy6kkp07x4vadqw3klfc1lv110o8iwsdgarhc7shytc0to5jhknc1eypxshl5fjwne4m55v7nvfxilckp6e4kcl8gi31frtijbzrfic9fkg3tvai3eqk3n79sa1x6xdglxcz9eh89for3',
                        redirect: 'eegifcix2p7gft19qiy8xpvz92stnjqhcxcmlvoro0m2qik3i7subqxx913t1hjeqstq3p51ylkmyrhb4ac8oejrfwlggo188ez0273dym6c07v37tknzew914fwgr50w2j3kf6wskk8aips3aqrwb7ss7gev6yena1suonhxipeuz1zbmmez17rayd9z117atrv8wj104wgk23p1jhzh3rhcy5o659i5ur2pgizprks68deqonzwd65idz3ap1t08d83ibpvq5r9fh9m27aiz035oxdjzby8h2yr8q96bj4myvf57brkh2e8goiyq560ia7307p8f9jtlw7ndno0vz36kvuecrnow2qyh05dd4eutt9he3vukjw37smoiydpmqu103n8mm1gy1k8k3p204f26ctuoaf7p9z603pjv4lpcf827fnahygn98sjxctup8cosrei5w8du62xi239vzcxhocug49zs6v71nk1vv2pf0yplsk6tgijckpc181z4zqivugp9dikcsrbjhdtlwf3vhkowgte944ez5jrhkpfrqmkcobv7ugyxqqixmlyso8m2tn11qi4teocv7n7xvkmuizrxn1mjctcsulpodjurk8x2tq4uk0a3p1671yjfo6mdowwxe845y5ohmhl7uyegpwbi9tvtfkhmdhx6zs8w7kw0qmpjscf6upqy5a5h4b0z7w3wyke1kux448um2nm6vddn4o5cz7e1at08vegoetr84ohnqnmlexzcsb7o7usiex66ixq4iihcu7rifv0m3lyabtiw8c6pxsde6gba7659yx9olv2f0ad1t8w79psmpvd5css1wmbk87g89crssb02um510pz4jy2qj3d9ydthxwka3iclgznpexpqdiggztebnj7h93hpnriqvhw9lc4u8x78sp9vljsuereffdfdt8oap0p59r2cz15csgicadobvy0kd3ne4bejixt1s21buy8s9f2l4sa7ybvy415b1xkbcanj7xzk0zpw3fq4c5k4i9xzvfim393lvritbujlzagw335vp6gop4waxtwb888l57vzkv5l4lmsqrsuddof36xnnjcdk6t7yvnv8fa7odjnccwr1fewn2nerkv0rqsn0qgpg2he2uqun9inowx3mjuq1bg3jw43x6tsyo1235191nraoqk2lf2fsypfzbhy4o9lhu3dlmqdcyea9227rqtwdmgdv459nnjw9vkbmc3m1mzbeonzg47idti345ctik1jdjxjkviti3rgrodv5jas7k78gjf2y3nfgvi837f9yobfep3qe6q48cpskya7foeccpj3wh58guuosecv9n6g6ttucmzsrca65zydft8bueuilhngljwwwsdrt5xj489pqjddguwygtk0xrojw38yfh4p8x9ad2qnub72e28vvjasj8d1h8jkmdulw61o7r5qs6gwgx4ap3obj3msx2ur63vaww0ygtmzfozep4ionts3qd70xohlf7g32qkoo57i8ce2dmk1d5v602e5tfckh7aa9jy7yhrdlgxyw6p38w3y6dfdlczt6lp2otv8eia377ghmln3s6ciqtxtkhj4rbfz0od5myflwz8okfeux91aolww0nlex6plllnhalg1omzs713gjm0fz8ldfcb9tz6j7uh03n73fetsi0pvnnb3yx761vc6tnafcwsz96e3hautn2ftvu033hm8ystn922gasrvzqym9i8bz8d1dgnkdkfhz3t2i49nascv49m0y7i31i2t30ghi591j4yooxox1vy7dzfdtybut9qkzjd9kgn9suqsg21ne47dcc4h9xhc7zelwyxraai4frltqobhlivf1ca2su7at0udnb98velf0v3kj51er484kbbft7vyc2ab1cx90hguiop4crgblnt75ceeqw4tpfu5i6d51ctdx0e43ka11r60wucdmo21l7u662q2zyz9os34votplsk2vl33abhrpt3mv5b3cybyjf1zv4afzum6oqr9un1pxh',
                        expiredAccessToken: 9404539618,
                        expiredRefreshToken: 6692485240,
                        isActive: true,
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '4e231cd7-97e7-4964-8aed-f3a481a432d1');
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
                            id: '6c3bbeba-39b4-4bdc-b3a1-8b4dca40997c'
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
                            id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('3a3ea27c-a41b-4a60-a0cb-40ee434dd52e');
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
                    id: 'ed22c0e4-be27-448d-9d8d-f6975ec56c35'
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
                    id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('3a3ea27c-a41b-4a60-a0cb-40ee434dd52e');
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
                        id: '9a5daa6a-3855-4d20-964c-49f54ec4ebda',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: '9d0u4roblv7kzhk9krb7uuhxsb6czj41pmpoxzakv8oblo38zs7gzgflxt38gu00utaelzheahe2d58turiyjlgrbcid0ej7cthpwxpj27kglfkauq2rldj074gzlnpipo78vegkzvs051q8c64zgni2dra1zcodvf4mbrhgu8vpx1sh6kevlvgw777p33rq8ke2ckd7e9k89utcdh7a9uvp5a7ir8bj5jjyi3q6m27yfu9jte2tgsvgji2uyyd',
                        secret: '64j5aic2vnjwgopq4f4u5za454syd7bzob1wzlsma4l3et4kd3uq3p6icdjmtezszki457eo4mjcsvkqk9vmvpqnv3',
                        authUrl: 'h1t3dubalbae9dkdpg7ap698vvyth8blyjrkgo0lgjalyuff692j5hlcfaslz2wy9kfhgcwfmic0dz5mposxd1vpe7cnv5d6rf5lff67dof6u1oa9behy60z8ij4drq1rq1n8p23p3md4r1j3yt4ogaddlk41gmv5tk5s7qipp9df66kwv5dwpvvxxig2294t7m7ocncnhfisdrc9u8g1r4idpu0edyawjz86kqtxqi75ddvh9rhfw70lv1ohonxoydb4n1w9dkx3y36kv4q6sy261dqza116h8rbj6annpp7xboy9792xnfoprano0l0varwdxzg2mn9xjcg491kyhm6sgszvwb4bh1wrrz9105nz51cziwgrug7syqojkjvpsc2f6k559o7unfr5azt1ncsfn4wdp129uzzgb6c8d6oz4fday7vsdxvqa2uorvzjwd52prxkv8f57ygc3f9w3xzy0joumuzisuz0hdz0kc4hpqwwl4rxdqv39vdjov6a1gjowbxpq8on1uo0dhgq54hde84kzqzha97tqsl5xqpy4eaatqboo411iw4tyf6z250tg3oweotpkamdbcxvi7ctq88whzjmwvhiajk0qbsvr6kpvdtho136m0m0nw6vpcbjpkvxpo5n464xed9hd2x72h7xklhle3vdtya8xd6dwv3oy06xcsbfoc6pm3lemtqamxzosm2syon2sjsar6uzp2x1u9cjovltvdwokgysyxtb08xsdiq56fpgd8c67agohxjchg3jkquml1r48rzji6tyd93ojoai024xsoxngguyf1ctyxz8khdpd46v3ed7w63xikwq8ls4700ozs92m0hgd3w9d3n54wwot3d0z2kcvkcjb81la7mt4p605iswo6hqtuvogzzgnddncq2ei2s5upjca0cke7ac7dnxd68c49jbv5mt418ix7y17lbji4ullyfzv9bc5z7njfjc9xaugos4qbewaqhbspba960jfs8rdqf7li4je7ud4pnopoquvnjtmwtfj69aaae5vdeq8r5kit0y30ovc06filmcher1you05310556rw56p4q3yzrbxje1hmbf2yph8seuhbyhlxikfryarv1es13ct0q5dg9710mvd9bdcqmnamyc5njpuvj56jpcjux20g94lvizqbn52fhu9trtu4gqcuxuepq9o5aaxm3e9fccqrlyspyo0akspkpgvzvsecx3l5vb3do3qua11arw8fwzurod67m08popld78tda48v0hv28b0vc9lda0p44qf0y44is3p7suff0fkvvrxoix9adcsk04bcioh4nyk8hepk56zlns5llau6vde80ggeyap5b09vi6pgcc3x3zu6hz808ahtimaatt5ondpf8hab2bdxtjn07pmg53nxjx96y7kff0ka5s67dtzf0qv2371zacphfw21dbxd0i3nqkplrxcjwjxkwpnogjbmd1cnq6um0zpxqv3nenstdqbhvn1on0v4xb6f7qrs3kokdpsaez3rsptd6ad1jr6rj688v4pfs9zbj29vga38aigzsn0ni67ei5rsl8yg68rzy6j1hd6pekojii1oqffj2ezcqr6un8j0kdo3ots3hmtqe04eiihozl2rtprys6fnon1po15y8z4seywvikbrues42r127k3ext6qbxid5udto7j5u1z5ld1szbqwrojbruw4flmo36ra4d86gtm61nv4hvi7h7p2p717ppqg4e9c2zgox3875a2byqcrj2tjgi6a866hqbowwf68jo976r00ipp4f39pcc693460usfghoal6v4pxfcjltg7onz1knadg6weqr7jg6w5ztiu6mt08rpcdkqa8edxjdiao9m5vue2akskpyo48yjke4pfs4eogzt5js3w2qqxvdw659plnxsjy3h2nee1sn7ncemlrsg6su0qcfxirprfzle3hzp5yhyaa1afxqr3qjmk2mji7hw9op3fsrxipt2aq3q5jcvdfwvz659rrp6wb',
                        redirect: 'm5hywqe53il3c5qjoj38041fabhj5mxfjkx2g3bcaqxp1ummh4kb7k4nvc4xacgg6ecy84byaqwnu846dxr1wfb8y3o7zzseglh5ijgem5s30c2knf4qnygtjo1u5tsu71g1wneacez9wgk26decywqt3m8v5h4su8tqij1oyp8oba0fts4d6c2wuwygdvrjqu7n0t5zc982jwlx3hxz9aq6uh9bwc4hxcmmq2kdh18yxspzozz7n90iqlcvac5x2zartw2kl41tljmr94tfmfghgydca4npsa3p9jv1m59p1bmclq52oxxgggpsekrgorud6mnayo7m3cn4ft7ffow2a0yaqx5uymesmytvqam013fghna28kb3g5nuxxb1x92cf0qaop0wklwbvw1lhj4potx5ka7vpdk9omwc1z4qnhgd2cdgouilasy2mib2slnmgdt2ankiyclfuj0f5747ezadvs5gszhqkgzte56t5y470c0htvt9oxox10f5b3npvun5lp3t19ldyjl0p1f89ha7zbvxa9eesn68sk27be8aegu1l3ohdcnvzcergio6hnrklfpj70giavxvrjhulj3laymhidkipn9evmhaj3ol4vml0pihxygcuw7007bsn5ivufecaoxeeqcpveom6kjnqd7f67yhaomnsboft0rphwqxi680b985muc7uidd7ebkalhkzrp4koinbl9djkozl162qfjfcdeceb1qjzslv8qllk4uqxz1s7fk1ybtb2ah7fgystgod2by1xevllyzuzyuof99hx8myub1kixudbvl6bmtnn9qzq5fssjj43yjz10oeq7or74fmxvltjqbirf62n0imf51w6c64z78gdz1g6sinrlxjrz3n7d7arnfjw5dtl7f9py9fra10d5i2irjkhksbu94fsawffu178dqs7gfs5wfcz7tg58n3azxysup7353xx6f2u6rp1pgprtb527xlsjm04ui0hmt3q2wjktijoszdefjygnrg3xzj8p37rlh09ali2a4p68zo8y20aq7n7tidou2g33cycngepm7q1ew31osm6smwjsbr39kakawgpvmhc97vqok4cy462nkt7i5870frfbdn1fr8ol39tedcun8ci9z4lu3ca5sbgf18z8vaega237kshvhf8bph55dsi0n2t1is1m0enhxcmp1tde0ovkrqkoe9xtih1diq8l67fztxn7kr3yl7fqt8kyld9voodyzspsbiy06e8s0jxhje8lazhyxaym600eapnufmuxy86dpdr9ytcjn3lktnh672uriiuptsg8dt9v80ols5gvyl3pbuiix6k978h0ykwmg1dn6wynrx4czbqkl46ef8e602u6xsrozyt548wtejp0nxy0dwel3uea76tdwpfh6yly3riouo7yk7nz7mzgim4w2e8jagokbdd3mi8gil6onzahm0fj30sirovjj70zxag3vxn0ue0qxsvis2w5ktpr30nxhg8wcewama5rj8fo5y9yxgbq7xub81ojw89z3xulc4zgvfptbiorzgki3bu5tvm7thuqss7s52r7ielhts807duikl36yu7rr20yr7nxh8hp452gokqex4tqfwjzmmg1rv5ithiigbbwo60lq7kssf4dybjojyy6mrgh204o1gcc53ukzo2rl518e5mqfgcc01hpxt9fr9sotigrlyy3o5ts91x7zjtj7jjvwebzabjba3nfsqxqarxo2mwt21k2p6ht1ee08n4prmpa9wjeeaci0frimdsgo542pqwniuxk4ptadhfwy2oj7o12opeus5dc34u55z0ojl10yj1e4ctr7gt1es8vse3tfasqe0hjy8jz2uqfoq2tniwah5pslwyf5xhsynks1l15x3l886qnqdqvha79d3dmt90eaptbi9ztss0oqmtzubapjcyibnzn0noaxl1me9nwm23or9fbdobsnuk6bb30itfiojpq7nof7dh7qni0mby87c3s57rel935m6t3c',
                        expiredAccessToken: 2363251943,
                        expiredRefreshToken: 6326649477,
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
                        id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'hxr2r4lkoiw8m7f0j4jnej2k6hmwsqqbaqy5k6cge4lwqmfx8w6l2479kg9740mjj41d2z5o4q7tm5jyc5um312uqqp0x7u2x0im069mh3z8h1aynqnd85ujt61aet440zl8j4z8qaiybqw137nfp6awk69zitzbd4b6aqi1b0xkxkkrtb74g7bivak4lmh2m1z8a73jnmmwakl0ny30lnmc6rj26gbc8y6ex12hr1bnfbaroncj2zyf9bggx3c',
                        secret: 'llylcukcvhm3vtpvetxy85je22givobhlbht4sy2uxodin83839xpi8mmtbxjvi1mwxlqnn5em1aaikjzcol7x69sb',
                        authUrl: 'i6m8bwsppvt9foc8vslupm5x5ry14mpbxa6mgnc0uuhe2fw834km7mu7u87p06d7w2jwr4lk0j92gt70krofjmy7iaz2ecs0yoru05uclzmlhywid83r7do8agw1ftvmz45xz9oxha68dhokx1wn4xx7a2i78t6syrsax5siv3vvny2x3qif0noba0lmfqac5au5jr4zfe9zktt7pw1mf6ka9ohadewat1ofc5lgdfhae0gz1sb4mpg4pffbkd53u1xouvnpn7rq5b3twadwa33z692672uneburtc76gtn9w4935dlwvsoz8widl467jlb4qaxxmgn1f73m53dkmb8kb42o3nef4tayykklbwpsnyh15ftrs1rufkuucla1ej8i6n0g1f7aqq7ga1o59e1rtsmyzjlr4mdwtf8yr3lx8mj7sy0dulhwez2nbdibwty82o2rjp07ka0wmh9s8niehqttdt0fixyyhdp8e99gnukhkwk8hho192uhqemmy4rm9c6jtmogevq6puxn59fmagkajztz1gdv6igltptzuvajjwh6ahwmqtulw4p93zc5f2q396meworwi11rbbw2n7q8i7v85wql81ak15dn3l9bz6sj9kxtfrhjwc8uk0psk0xi6rk5g3rz65yina6xdnzxye9fww1bgrk0scqutn0c5u5hbk7swyc9amsxs98kf636j10gbb55u4w4uu2k3yf5b0ej71df1dvdecnibfvxm5tfk3dyn1zzwr01gawns4fo4m0vik54228aqfmsjsj0u8yif1d7cf9rlltsv2juekr5vi4uacmbl9w16mc3xm4s1z1itazg57m9m0ysl8xacpd1c183d30vubki2h7ybasoceqt29qaqxmuk7dpyluk5s284gqwcvbcn4xkhyumuuysfkeo8jdb7d0b6dep1xkevp64z93ypucd4861w9e5e02zoidvb0uhyttdyqplctx5cuwwbcb0qzolcuhszulze4ik3hr9ezjig7zuwreoxbdv47ljlb2zl8b0gjr0sd8lzix9satzf095i8jys2khnvq3qn3exydjfdufja89i7asv6tebrzj69xacpxhukeiubx97856272wx5i61f6fvp1xdv46lubikyhwwajufpzcddez2ngx8j6x022432n73j188vibtb74jucvrpopf67912f1esng98c45xpkw688p1fcshfoyc6uik2o2syqm8pcvtjdsin0oi0pheps1yyy7emirz0ubo2uhvqlfswdc1ua0kwxpgf7thcbjmdix37myiguy4xd6ctx80qbdh1vzr4noggpj3s4hhv8v99ksxsw1tnec7kqt1s1uj4awiesqnnu6e7aezkmprjtlctephlhao1iuhuvpu1mh0010stv5ge0m4knf2230gdjyf9860bdcuic1tc3j20200m300wi3wi0gntsqjvrk3qjafbsqidusj72y21ajra0m4ygsz81jky36yvl2pzvnp7f3iyobfyhvi088ul5a1kxqaycc2scvld06ub9n7do0p3g0cdjbe8fjupip2547ajrih7mw14fug66ckhxbl5kr3s29z6ok3ajtoblpxbf9yhwhryebfua4r77utp0jwq0t8h3lw5ela4kcuwspvjswkcmbu4miayty3vk7kju6605yqgw6u25zetcdxx8cjky9fvjkumqyq2bz75mzzw10ys3o199bmzbsvrar4ihjca8lg1gvxnt5osnf4gr8amjmjnrbm1y0xxql1j8njujqg1ikv312czvce2h1widxsih5tqv2znbwbarks3e3z7zrqdwfhh93p04jo0x6v4s20mrpkfn7ixhw8vhizlm4be68u4kp66kekaxqgeqsweqz2uqfzji4wjb9z3lriqi94ug6q3pwi5ntvbz1l1pjy7euhka7tvae5qgcxsq9bwikbfxi0hgwy8dxjqiwdhnsfh94ymwfydde8z6nd60ptpr4ui28ksq78tei1budzk4kw24hipc',
                        redirect: 'll9kqnzf8uco7gtlss6kd25xhbe2rp0kx8vbtbkosm4h508mfzjtwtcqp57c1tvzpnt9l5gn03porwzobbyo89v382rnp2bxb2fjb895u826wy8ssxk5nv13wkxfv6h7x1p0cnia9c02uab48bvxr35cx8igf5o3cdzolona7q08o90p23xqc31upmme98rwb5swz4o1u5h3dzn04xmo8lwvksouslc87hreh9fm74nlx4o1am5u679f5kmbr0s8cgdc3owft023q7jx5n55axx4kv0xoj77u9w0fk41tpzxqp5nyoaainkcx2aad3eravtjnffyo0ohjkgt1m9e6gskyd5wyuqt4cxvw5yl2zm1cfpvhcnegua278jx8u015kvm1t5lwbdpz8r56cx6a59ztgktpu4vr6xol482lzwgoigz0qrkdgna27umpy2cb0esbc8wfyks1135tzhlywcmgf6gvr6fxchgvghbsyscvzzidpb1dys2w65rche9r1hq12lav1f40mjfwiv0umni2scktdn6ut6ts10k7lzmauc4capqr6jb1ddtkd0dqxa4z0el6vxtl8f566qj6dmbegws11z81vbs3jwd4in9si9atuz928a7oicmyf5z8uwr8opb2gtoubmdl5zqc0h6xxzv0zf7yr7vlsotc02wq6h3aq32q5zyyssrgqqaasj9kaq26ui58vajrk7hu7mwe40jhjrfvo1qtcx5fkwmzfrfz62pyoeefy95rv1mn6afdom5cqp67a7pphu1xdfaty2zma9d5sh5em29z6i5pxiyn97q308iugo5oz94xjw3w3rdvpxixruc4din1tweeebemcbx124fvmlfhsglb3eeu5bs0mxcpu2ss13na0xrrf6jff2fdwkkbffyfsyle14w886u26hkoqqezbly090ivrdqzc8d4rofixv9coqgd650cormxiez6m01zhtj4xwip4duhaziuzw408hlo2eyqclxs4vnidab2qq4fhybqpshafyat6jf2nqu1m1yhjm71wib9ue6td0om59sd1kz6dw608cbebe0arl4ivws0wbzgfvrtyzp7wrqu1vnrzv4f884o0wyorcgck37if445vbsqs5nr0gb6nrmfjt5n8ew7tmxzix0x1li0px1tc0fhaa3qi0bsxpknpgt51ye7c0u6erzbaxmhi99e52exm86gjwtyqn5evpmjrhj2b9f5rnl3immq4ev1yj0ginqdlsop1nrokp8ggfqnf4iiw0gt2upw4ctib50q7rynd6b5xk7giojytm4y9mzw25zlf9s3apmjbt29obm8w99cs2pq6jadtedz9qz4u9aocb4ns5g6vg1rfram21pioluz5hvobc836sv3n2c6nhf41dois0a3tgo7vomy6g1pexjytzriz9gak3owfhwxvrbaa37hgfwkcwx2d6wja0fvhknwkh97w77t3f2pasfmyu920aydephsov3c5av7ibox2d718qdgk40y8h5tr2e9d7kcrp9ibecyybpnnk7pz8be28ssk4kyrfs3zxrw0nm7d7e282vngy3zeztyzcdvh7udln95xkb4odadum0ngqy3yfkhombbq2luhyhfbs2gs88xvvrngdv7gy5bvp5fcw2z32rl58q2ae7luwuyt2tksncidqriol7l14jmmg59gk0rvumdnllq7f833f9r8vsu6irqn34yrdos57mpuglscql9y4zsjwbwz0rwgvqedfmkfue8xf1pbzxdcwlv29wi7yj03hch7zfe96hhvul5dnagz4o1r84qh8t5ughbh1lpu14wu4ejwxkmewriun6hu0o4u30it9kv9xodcewdnok6b5hfo2zo6h1pnj0fvp1vz0wh0mtiz5b0crgav6x3lp8v8mr37910tezr0bsv5uivfk05fwr5k3os8xoz0gow2f9xokaqkd3kkgvzprzxcep8i2bap4hhiogowgknycu3sfegm3y7nz6uayn3tjar8b1ffubueyk',
                        expiredAccessToken: 6743322281,
                        expiredRefreshToken: 9211069377,
                        isActive: false,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('3a3ea27c-a41b-4a60-a0cb-40ee434dd52e');
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
                    id: 'fad912f0-4652-49b6-98ad-207207c21b1d'
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
                    id: '3a3ea27c-a41b-4a60-a0cb-40ee434dd52e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('3a3ea27c-a41b-4a60-a0cb-40ee434dd52e');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});