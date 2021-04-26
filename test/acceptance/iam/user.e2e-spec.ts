import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('user', () =>
{
    let app: INestApplication;
    let repository: MockUserRepository;
    let testJwt: string;

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
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'u3o58uy53vl5zjtor799xolotatscfe7mdeji46i85b8v36v6acg6j5crtryzmcjvdvq45huef7rkaze7gexcghwy4v0ppwacpgtveoinvawgzo4f5fcz8du14i80fjvd33swz3vhr70w5jkzno6mldm5im2cn0otat9d5pag7070avmhta9yz9do9t3q2ox6duhfzzhw15kxx20x510av5j32i0jsiu55lu11wrmgrumcuy171j0srcrnkbqtz',
                surname: 'nsod27i8r3ht2a4i5vxz90dp7lyfnrprxrbt7udeh3emanwrl5n82by1g5rptj2svuobpfjlvdqpc7d0ht6eckkwozbfzxoordufn8kxnilfldd2g3wl2my4ma8y8oblw7q0dnd5eoogdi5hen9iznxqdinei8gksf47u395qwvefa5ce7mo6ry1mtr40l4ojft7xn5to81w70o9rij3yixekn9lu91uq5r9mldp3ioykzogf1aij949wirh1e3',
                avatar: 'tmszs5lhs6m27l1vgunxwcs6nc3oakntubkr1fhg70xg42s6nf2mc6vtauuyhmkfybzwa0x4a19aqsr17pl8j4jeao570dx9yp76f2448qdl5t8mhbhzy43vq4h535pvibbkjtx970c000m4kdf6bcgsxn8hltzcni21ct20qrczugf6494nywxsb07hzhq5tcqc0p16o0yu4r1nj2l1qrjcwj6gkgk8vlhg3ph4xs03hbp2re11jn8yd9snjjx',
                mobile: '420sku8ogeefg1wlzmruc1xz3zp2z2xfd0t77ghub1b465t0xa6omyqzdfbi',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '4ehxmqc4vm4d4s49kofqanndhf7oej5dtf714n14ml42qfmfmchx840pgip1e82cj0cia61sxjyvftbnh4wyprq4uvtdy1m9xd3s8l6i6326pl3mq4eqqwhy',
                password: 'k7cfhlecrobd7877ansstfflywz0c84m37exa340fnankykd3lwb97j5frvn2u21f9hs1h8lvcaagrrila4t58xbd3y8k7jat0hoo566vt571ogmmgehb01nxqrhw5lxuar7grbbw5myll8sor6tony48vr3dskmpfgp4az7ej3awxt8j2mcujah9vaerpbgjy6pa32ng49r497kmotobsb1x764g49wmbhs78p6fztmmeyhyheagronovz4xrc',
                rememberToken: 'ugd1wn1e3l1jnc446tkf9fjfigy6tjcesuhmrjaekvrdbz7qf3a5vlxa1ylnjro9bw634ad42fh5zkr305yqjs6w19hhap0prp1cdjs5yui287lhvz7ar3pxlvsw1rantfimc6gq9temelchzd8myh5qnze77pn16q5zd4npiaq7pmgakiohk9akoetazzhyey0vehrlcsx0ag0wa3raqjsgr97ml4063504u5hehizvkqohniihl7fbjcthn34',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: null,
                name: 'sb0wylrsq8ii5nnepbiei6nfpp1gwksuysqwvxbhi44gd90v7pm9gj92ypouzsfs4pqxlz02gpddesg2womk8ikur4cpzncc5tqwawdvhd954xc1kc0dys50no4vfp8eexifmmjc5nunc9vn0zw4dp8peeh0i9uph7g9o3zg57715pi8az0x7gxu7jyljsv1clqq32lgjls25n2q8smuyi0ocgqtejtjbjl7bxhwpwb5xirvjmw44vnd43ww7lh',
                surname: '50wn6k0nyb3ur3wzuiofuhfsf2ljbe8vk856sv5vrj90csvmpjjlgwgo1wozfe4e7j1xu2lkhm5cw9fm8l7k3uly8patpzw9xevhfmdlgaj1fm0gdgfn97bsvmi87j3uxbutgf4tytz2gc88mf5ggowqq1kx03ohny5zbizpzszm0ynuylyxdx5snga6ua6mx76byz0umtsheyzg4n7x7kd77zm3dux6kxx3ew1asgsz887vytp513ew6skyvbn',
                avatar: 'kr1o7p1sdg3f2t1op7f6th4kgg1m3rfy4sc305acez1bsq614ybpqlprqn8x0av9k1gaaykbbzbrh3alyura4qotizfu3bkptg6072ctvkx66qzy7owegjrusnobisnaoyxudyaxlpsju4hmgj4uhb7smo0d0h3ihvjhgkzpsao2bf7t4wxop4unoaw7rfnjndrfyise9p2hpwkl154tu7a9pebqfex0ot5hp168d3w3zilbtbkhir20skbbavz',
                mobile: 'rjg5ks0a1c6kss3gqvp7wwuq8p3qs3to15wgwpf57kwwork030iujy20oaer',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'hyl5ng4dfwfqsarwcyuwz28i159uxoqpprri9djr9o81t2pv4hc9hv1ttk7fhz2j1y05rqdhbl558f43urgwk2vj4gxv8xjpsa0m67w615qmtjgrlanqnmmh',
                password: 'kminxb3c5un0hyhni6wo29xxtxvrb184tbay0h03dj54pezv45qothqst1xdm0wohpzb93dwd4bmg64tkrsw3523551fodo14czfd7cuqu7ry5xx6yu15rywrgvssr3gvs9i4d7e93zr47e8si2uu9w4b19eau53i3a2whi54f0w1y04w9sazune2ujlbo1e37umsp2khivspaqd9q9d0enikgkzxha9x7s69jlqow0g48q5kv56k77t14mg9i1',
                rememberToken: 'qq26y3bn2khxobpnnj4cianqejq2jn3phqs8zpkp17i5lrb8ibyppvnh97txyf7ps3jgj3yno89op030l0ygah7e6p4dafgp2mreyk20hfrw78z8ovlm413nic1kwvltxxnbi000cy7tfyobfmxtvqorehgs0lw0hf6tsztfqphezja8uo00lw5bx4ol2re9li9e0v2g08i7eewtpq3jtvpe1wb532xof1izs2z8xx3km4e1hzggpaew8i5dtf1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: null,
                surname: 'e19huhrri9xiesyh28eud27f2jtmmiqt3oh30e8zoojlh2qnxzltgounvil5qk6w2wen8yl07pp24gf6038xsfg11tdbwez3bldjqd4wd9fqc21k2dmcfiv9glt9ik1zthndhahvhil4rr187m8li56lghgk89pw7vcrike0wz8x6eltq4zv94m2g9ja9yu8x8wci4656eq3b1xqtt6thdetqw4ezxfp1tjmv3ligrvo4qrfxy65gmxwv8od2cs',
                avatar: '8veyl227lvd1fmlsjbb50awrecv5262xa9tioc1sge1ncpjc82vfijgv5zwtnosvzhh3l0c9fnlek5mjt5uaa5dx53q1yaibg55gz14352gcx2hcvz18v71tpeoe49flwn2zk9qtki2xo3t7mv7xdxrpyln1kzbxllo57qpvkcetn7gv2ck3t9eu15i83vsw5e7u8v8lq556hoimqr9h6yn4l7ssjkaydvm4255x945vvay8nt52jaqqlggkcac',
                mobile: 'i3mve7uqgn48nnzmcemk61te18pura4vucoazwluby4l31ld8tzay683teep',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'o38yl6dwhd4ys7kra8dun1qysg5rkza2tkpaqknedlcjukb8t2nedvevurog1iwc9b0aaxy38ggeg3oysy8srweo18dr2qld0x24bw9rtiiwbvrw3fz73smz',
                password: '7weylre1omglo3j5evhccz3qrr1q68di2rzgcvx6sffytcuuprkjykumycllr2i4wx9rwrhrnpkam1upk5uxf6g9gpsp08es9mol5kivcs1253j8g3ll5wa8plnk3wyhsc45gozaj38hypo954lavq75ybpdb4m9ga8gyim2xdpbsewf9qpn0ev9qw7dtzp1msjoydwztvll06bxkjvkem1v70tec0hl8lw6n5jzvuvx0qin8urm59najamjnzr',
                rememberToken: 'lpzem4t88jytdxox76712m0eoo4pev14x8d2b7njj4dwie0dg5a2mpxlrhk88m0kedgmv49p0iob6r17r1mpsqpusqh6w8p0gzsg9ta4rt2sdw2nidtth8j1vs4gueawn3uwc7goydlbah4mq5se6oo8j3vhikxhtujmpmy003h1jc9tskv1tdw98umgrcus3jupa3ce2yejkobe5sh83fs8nx0xtg021l2wzt29m4gd8sq9n048277m2jl1rm7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'zq15o7884gtfmhviek9smdgemx3lbwv24ihup0dkp4pzqcymzx9gjo7961ldu3xnw5xclcz3m3cdq3ni0q4rlaxzv5dowmo5spsg8d7q20kbar22hkpkp68ekl8kskwbk9co1fpv5ljn8pb7rr362j00qo8zr5d6z7ahh3seuai3t74nfdpcz33r0no05lz4z24djgtj7cz1rgaimry4mvz6i66cc8yo8jewury454de41wceuw7osmnhzg2ibb',
                surname: 'ttzegntvdxqvx85zdvbngevdo22gpvte4411gj7g8gitjgllposf31cvg41540pzt8u6te1a8bvkd8o6uny4zjwls7n9yit8nsl2u0bowuf41awe36lx059k1psxo0z9nyhganzs8hwcoaolbje5ek2iacqdgqne7izm73kai7wpxskw19h0rid8d2l4z199ogrn5mhm06wjo4znmh8awvt8iskly50mxazgu3tmxciyrfzxf2l8w0645cn2mk3',
                avatar: 'ei0mwvp1okc2msh7woi57scm2qkk4im7prjw4xryx53gwjuudmoq1in3rpuord7epguq66uqs298zq1iysfs7x4u1fin3mcl98spovrngc58nbja8h8eu07qg36zs7j81slekqavabn0upvkepvc5k1saukbp5vyeovdc1ovoeoi8w6nakefe4odzpwv0ew0hitfegh8msk7jn84i113vj0hzl5npfdr7xs8rnbky8u5ucb3mv0wyy1dq382ydz',
                mobile: 'p48ifxey3gggfrq4m873szesd2thju0ay919fzjyznxs4cf4b68jx45ge7w8',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: null,
                password: '032e7beolvkma10pz1874zrzfbrdoo2k6rehfnbdlwoypfdrrrlt3q33ned93s0vms0r0kp02d1dyt2rbs59skchqzrswd03r6oioo4ja613qs3klwxge93qj3urnymw8xnlq8wq25h7o9i7sj3hqgqy18nqurfwuann5pkdu87nqfyfsl97ptgxuzdrggrbdo8xhg1e8a9vlqmxw6lmsmzgooov82e2qtycyr6gdudlui66tl6x3mts2ghlzah',
                rememberToken: 'h4s6bybmsju41e2ay0p1jzloon0suj2f43jk11x83ohmjak83u9gzuw92dt5f8pljpe2yvx1zof38fgrdgf3apvnrboszjaesky0n1o65wc87i71epvzcspl2f0d9av0htxtwteej00dmliel1hi8qrs6p674xqj12zqm7hh5tnct3jf49craj0en0nse1n987vchtetshh2fity4f3s3q5ppg7s33uvs8g6n8ajlleze5fz9w35i06y1tmwemj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'frdjl4iicyghxapx8552dstzl2djlwz69k0z3bmb0dhyr5rt4bqf7z1r5laqa6kg5q5ist2x4a2t2o6wcq3l3urs3xagmmqq8mfh7tvxf8wq8qijkorba44tefnbqrfx2pg0123ceinr9a0ibvk1qvejzkgm1utth1s50yyrp8udqiuaijsobp6od3g9giykakhwqxcfk9nwinpd1kficg53gggvgz472xj5wognj2u13vbnvx23ygxh5wpnr9s',
                surname: 'ozijr3qsv7ot978ywozdorxhbem00uprs542pdi7b01fioltsqife7bia6ly954x3drkcf5eg9ijx873yowdbu3b9oc7m86t08ndkihagn7tx9d3uiiyjzxg8pyql9jrsw5kryd0by3z2y5mn4wb6yq86lneiixqrbdn8efzvg39fsc15w6vlh8dpsz37am9y8andvhgjkue24fnfwux11rsedht3qo5jksak4n6zr2tgeqtpbcefc811656m0v',
                avatar: '89zfdi5bozv0ibvfuvgu2b9dnwfszw2nyun2x7vrkye9aprvrf4l86dy4fvml7kwfntakgxjun7v3av4vkxz5rkubi193mkd1jnos8qh28csgx4nf4hav1z0iwmu503vmbhu4am296hznshh15ca2yq321vuhxkqk0xugbueo22zchq0lzm0hnargdbsykkykpg1ywb3we0ah1dyaalwa50yvo4oey0vost4ygzvro37yfa0odnhxy2mf4m264m',
                mobile: 'uc690edmzqows9a7drqh3eeeu52mpmo51jcgdm18sxt61gh155kve2blbcrx',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'klzr1ef5blezpkxu12i8g5mwixfy8nn6a3dqosidv85vfajg8ufly7bjow5v3bf1uexh5zruq8awfij579jbaur79ua0z6750a6r6bmewam0lkpkztsjaqaz',
                password: null,
                rememberToken: 'wb66bs3qr5jwhnbm849e5vrznin71c3mc5fost15ub6si196bcgnjyqmxds52qes5bczjkf0yf7w4q7e28skzw1cs0ngt8liuq2h6v6cs84znclyi3a5rgkoyflmei9cg8foi6hfziof6m4ywb4mzc3jhlaqm4zc5u2shlikt94corr7ddxv4ykwuih11bdq5hjhj5ptmu8gcav3wab8ipy615ohgy7j0ro517giyyqvqbem0bv6s9r864qx9xr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: '3sscbq11p5cwhdph18cegrfkwgseo03qe5bkdgnxvqqyb3dbsyevh4whc0x8r994prnz9hee26m7u8tzjcuhvu6ktipjg4muh2eio4luiivn8zty81hl5bjvmwvz78jgcwc2rcv9jwcr8ogxcsl9gdzje8jnspt3wspo1flpia4k5f65j05b1r0s7qslolese8bx247w8onap2ecvcbvvphz6jnlsw3cxddujlfsg8vow9na0xk9gy62e4dh4yg',
                surname: 'g8jjp8e21e2ziszklpqg4ql30w4amdh5cdnyz6n15xgivjrxqywrcecns577kt9ij3tn552j23nrlj6n1ksv3vct6oerz3adbde8o1ls63uhrdqrdr8yc1vosq3ky087eyavic9fki9ghvk2prpiu5uoyw7hkl21sjpukkel774p5kohnj1lfvmay5ys4dsrge45va72qk43xu7n74wxk4ir31rwyjlp5ttlyvkb40pbmwfek56vym6b3a89vbv',
                avatar: '95k4beatbmlm1aioksl2ojhtzi0aym8c1ex42fh47ng73elvz9cvbeyljcc9yjycqb659mb75j8bmeztr8vew792nxbzv3un61m32610d54kog17mp4ku1t1x4bj3pb0l800f6mau45qd0cjp9nbqmul9rqldptxh4i95mll40cip4qkt2zd8z97bjh6rwdrwyq050y656idvfmu073rw3be8ycq9bpkv6v5zzpo126tvstl8w1p4y8pmo1gxmz',
                mobile: 'uhj0ijl8mduazlxybumjoeu16l0jo21fd0qaaw4gb26b32vgeguhyb7x425q',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'q8rbjk3qyvu16fwig52eu0q1t0wpz9tv9noj3lqwzwr53q5puq2yb7j41x7wqmq4ojcsyta3gerbbsbnq6opvpd9tamysituen63m3mzna4urndtufipvrrn',
                password: 'yezeri6dqfxxa2yn5ofkyycailzs5k9svt4isiphvnjk6qjxfcn4co0hk1khz8vkarqukai2fcngg9is15u4gcins2dpt9n3h0qfqbyjo7lholnsjylgexm9utbeo5wvucqgk0hctnqtr90h1zw8sgtswef8aviheqjmjix5prlignlyg4m0z3xj54irj0nsc3uja44idh6lkevqjyogx2rriv1lhqlagzsogthgmjh3damga9anwudydy66zcr',
                rememberToken: 'os0vz21yxru63yt87hgzamz590t9zok4myvoa056ehapfplmmejobbbns0yhva4l0lns2obsd3p9gxmrlkkvdsdkrvnkpbovzjs3af4s8f122w0gcmmcgfe9y3cn213smbrpt7wuqzde4cg18s4vic0h8lvlr8w0oda3wy6uhxzduzd7zmlr7p1xqksdtv86exyd43fan5v6zshad655psbxblh90d3pap7yocwsagyy2ow8xi2imv04g27fon3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                name: 'ysjmpkmm3zrggm37gzfqcvxu3rajpuiyu8ihw62f0qhj5kr9cnf39i8veg0dmzq6uultfg9jdi9afajr1csojbz2tfgbozjwkfxgm6fjiwynscvy7yhey5lnd9i20uqeojrpyhsrr59y4nktmjzzqhz4yvvhl1dsabqsxjv5tsuryj0nq29wyjk5t9ydft2czbphrc8i0cbpxkfkkkiv6xz5dfb6y4ng7i3jjz9964t0lfqhjt7ildwhwc3to0d',
                surname: 'fgoxipshxdgngkksu0oli091tq5a6ke754cgx1exrxvz013p7rmax3oxzooruk8653j14c5ltwodayahpgk7wulzyo7406l1oqfl2lwey7rzp7urp14l3p0arikpihfm8t3efbskukhsw62wi4r5dfnuxmopzetionyxpquubwgps1ty3jr8eai9wgo54wz4fwqodknqbhrrjuyeof7abwa7osx2dxd3k44a0sr489i0i520k58optv21ynx1i4',
                avatar: 'lt7yhytf9eq03692wk8lnks729bu0pt0mwwzqfmcitg8sl4sushgv6507n8cy5en0cs72wserco2hjztytf2nur3ao3rx1ds0d0yqchrpdc0jiapovqc3bff98foa96gosk4k9ahw45nh1fqt0p5hklohpsi5vpqbo84ofwsa68u7b123fajp4q7hkq5qn3qgfomdppnuxxugdmobjle3pv0fodax4bv1yvlkfe4uku3q41vneehh5or4t1vn9x',
                mobile: 'k62fxbw324f37tu5qva8054ga9v9r73vhh5g8bjn4mt1e48k5r60w2bw6fvf',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '1bfhucss1hhwwzqdc1q6bgct0qlakn3sikqg82yddayvav5gbmf0g1f5eeuxqnub6e0ucj20hh46gebifuqmf6sxcpjfl8aggtqttghj9g9ix02bbxrffrme',
                password: 'di44gy3fg0lzknx5ije0wi0l5bkoqpsbvvyyop6e0dxqfucfkyl8bcecxxacyax3a8w9c9798jmj5fm0srhfao0fpc6mwwv4bkv3xhezqej65uc2ce9rf1v771yhal1tercdqb3rl4grgz9y2609ma56mtllabnwx6hl70pp5ewk1225rcm7vrzycbk55lvrdqmt0t6c34c4fjjj316vqyjh3olk1r8qdw810i9n465fk2yvap5jl685i9w7gly',
                rememberToken: 'ngkofw2wfhe21q6mpj5eepitl5pwsfwj8wbn9yzlhmvvwuc978jv4lq20tazjycfan8wbeq61wxko4u9xq0g2xka3kcpswnabjerhh6ap60skun5lk5qaqw736x9lz4o8b3s9z1hfdn41w09wylo6vxn4qanoa6jctgjb3kjewvbzmoiokwx3p1d79yd5dbetb5xeh561v2pahes2l5tken4uqyizjapc0sqxz62kmbxatitdoxb5g6e7gxq1s6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                surname: 'l28wuaf5z82mdd7jfqfq95djl7r4znrcpsgl92rtwvi4f4280d0t308czdst7yrwi9l0x5xtyj01e5jdn31gl9lprpsqwgtdpockigg9q9073twl89b1muj0l9u5c6waxqudozpjluyctn1iu1rau249ytq0e2rsdid35hvr84vb2db66oabeb4tbp7bahbrtyo1mqtf6qgr8saax77j0sozcg36cm5km6twsredjnm778yw79g5wii9k6jyupt',
                avatar: 'aw9xnceouu5pcxa1fjg3o1ohv4gimbh3q000hrzlpzurgm3400c6n06toyuen0wb720br3f81326ykbx2fghhinhf4zzsqviabyveggk0oyad3d6aof31kyplirktmkq2i9p1oo4xzi0da79ehnzvqeet7ilxbd8yu73o8opczcnz83ylffh9am3tndadjfb67n0eh1f9w839l44n4m6ezu7vd5i1kwszv8mcc84vpxu2w36qd21h26fxg6x0f3',
                mobile: 'ooskrs4ceylbn6qqir0wvsxyylq7s6x28t8qtpqaia41jhgxhttx9r51fdpp',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '4avoomij04hm88co6m9ptfkpw8hjabvbj7pgwbxcvfo0i8i797dpx8n4a07ce8gzcr48ulbzivpqaapeys3kmcjt3ugcrsk5tsf36tfre0jqxvfwb54pdgx8',
                password: '6zuhczjj378m40ggp7e60ys6xhjwgn0cjsyztpydn0txljipn4k8ahw9mae1sb62w237j2fxj3hanfxu4canzso1g3kn5sp82ifzl277ts9k5el2k7kme1y2b92txeyjlpq7o30fnh7zjg4r7pcvsljparoc1lesd5zvmd4p1u2nz4zyrh6hkbbgoy6oy237h2uikhivzs9sumlkvl6fkdmbwenpxpvc8l8mx4p1vkg76ybhgttslt3atyxtbso',
                rememberToken: 'not3rk8tvx2o0ajmh1xg6n7f5560diiarbf4zmqs5is39hu3ae341g5qyzzcyqwkr1cjc9s5ag4v2d70h01jknsajcv0n6yxf32ark3218mctekexfbl9pobqbcojlwpl1ugjspxb6tjyqas2bzm6c14a2k35adla1ewufai9q3y2b9pspfyqglaoqezsbgfrh4n6m5k3tzl6nv4u46l1xpyggt9i57ma6n8gqy93se3ahmqwmtbs5ld66nui6g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'triwlmj73j0knagah4copdtzn4vfsnawsh1svoliulc78qqg4uos7nsx6y4pajpgu4x6gtc51d3v39cw0ffi9yr0ww6zjol3r77l67ttv0b0igi0zehuenvlpjmsj3ylira4ervbkvfcodbi5ev9r6lnjj5c36rly56dw9icrmba6m6of18l6xj0c0glpa29ia46g6pk0ckvxd2pcmak7xz4s0i58lmfi55fsyxj4usmk8hnize2tiudx1mamn9',
                surname: 'ibxqk0mi3yqbtpw5du37936ryjcp1tg59xy2y08cakkyrfzcln78qqrqdcth1v7jmmwca4y2kkajddvt5ik0tbvly8s7bejdikgblbfjb4y5xbqiwyf8hqhl4pjq1c55ney7inflymcid88qml0xkwnaf07dvylfh8mqjapu1o09hazx4ra39morpgho5cv78x36prm9l3sndfusi6lnititfeycmth1fjc8sse1tfui05olapuxci1ty37ih3b',
                avatar: '00tr3i0ctmxkrmg8q35dgbj3hzl085b05oe2sdsp8xrvf01wtdqn2ti4j7hs5ltqlhtb9kzslnoehv4b3vc3py93rcakg6k35jgv37stg9ibg2nfgi2b02wvjeupywd302iewcfrmk1g8iyb9rnev4m82y58o7pi70dyk6xioqyvx22im7z399f1eiseteiyd7649xb7k1tgdi2lrk0mgbaedyxr0t1onu8opuaitmkhmjdp7aytqx9wrtjh746',
                mobile: 'jrjrp8dbycx1xgy0d1kwtzza0b019en6kx8zo3yxzrgz6whdb3338a65z8nk',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                password: 'tk14ivpgc4t7rodnb96y5cm9pn3i1wrwczl8u8zxpfulvnhdoj4laqr2doa7q2vs5ly1t3g1luvm5opvjphs77lf3o0k6nftgpt7brkwovknzltjmvc0h1sonhk5um3p7u147hyo4hw5eg55bllb2dldej1sr74ue1oazn7ksv3iyzhhy70sqop35unsofz92h8m3a0zlwvom3xe76vj13ymz010wr3s1225e5r7m1r5cs0aljfvo4utorrw6gn',
                rememberToken: '5dmsh1u3xoznlm6k25xbb8jxzo6tc2k418dxn13pmj7cbyri8lio7rc7lsll851pbzytfddynyox1zy73uz4x0zrbn694ot8nj0y88s6hi3hjxdb4rgcj0a5762zzcqqt7vmzfqhqy37smidmmyob9il6o13wt0o57dvu85i11immlyjjnc7mzext0z4nyigxpyhd7hxofbqcde0ua1vka1hhsg3mdoyj90dciagktu4gl92uj45n00wwurlcna',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: '2ohvxuwcpej94cqrwbv0cvjgmy7jqyrjitu2lil984dutyp1cmcvipb7bn59kuka39aviyamnlfhhpn2fqh857nmgzvszponjpde78ntyv5afj3egfiwa80eejxh0foek0je88itat510txmvdgn14a8ik4x7472p2bi07onoa4u03v3xmqr82cpv0ehxck2qhqerauoymuk6x4mmzjojecpbfqwy7mkz57i7yw976moj3upld6t37l8v034s21',
                surname: '2clfe52mavbj4nnq7he9u05ohbmkpwslmkjjtfjqg1ktbgrnkomnwocya7fawh0qq6hbqwbebc5ph75mlp486z0m86tg9uf8zgpmbjko1p1p9pjby6mrxqz5yv0sc7ugszk60tkjkf8kyu9llqq1g8x7xx6dyh82161z4i929zmuvrcviwy9ezy8ku4c58bx0s9wozq62p4txup1eq81yeb9hijdkfr9vxz5z0qpcirw7qvgykozckzfe5pqvsy',
                avatar: 'seyi0rnlfzv9w0x1hil4aajf7ar9lezc05m1k4cx90ukbfm7v3ov5j83hlu25u8ct1m5w82wfrshewqp80qbaf4w49j59axkn1z7wfubhrehcysot9bhazqe1z17jxjapthd9pnen12kwnizrnoximcdh1iu4urr0de37bxnso6p7nvnogr2v4cqp2ryr8lxvxs835w1sruzhdy0kqg1os0vbdffzm76gwm6uhm5kcf4ru2qcex3ti12433fxum',
                mobile: 'b6w71hvzwkpcl3jxoi8lyuxqm544gzldth572lv1k1flljuonj8dquawq7c0',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '5qrgkhph8wztdd0bq5fggbcg9rk7edikcqpegvbzozg722haegyzl0vmo1q6136sejiik5i1lw43wqb32eb8gazbd0yaa105kh32u1lr7olfqn5xvl41sttw',
                rememberToken: '6o7l9h2lg9ip0x59x2mdlexx5oynymn9m770pytg1gpojtosj4nnlwmk30ytyd64l5jkjwi7xk2r3rd9hgiuuexjxo8r7zylr2bzebq7q45xb90alxvh50gfntaf8edb3qgyvr17qn971z7467gtd83f4dqnx4btxc7hbfbpyrbla6ufao6xewwonbfxinukko17w7kj6zotun9bq8wfgqxkur75nnv9rqispv90fl82261tto8iw8r0y5gbdt7',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'nxidal70kt1x8n7sxnlae7kzh45etl0fe4nxp',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'rx3w64f44jq5tq3lbh801am3stsivvizbmtxz6a0612lxdalfo19k2o2be8d9gtlw6uesbf0ggjnvl7cbsn9k78hpeb6cmetl3wyxoh1add59p2wdsalt6s0fncshpvqj6ezpmbbgqugc56hd56vi4mynr25ywr6ve7wfchl47vpccfp5m2m8hmrfubxt01zh1xju8qct0iyzafcn9ra72h5wfmdh862ahdgx24121nox78u6jzzqg1deqa4tjo',
                surname: 'eda1x4fbwfngws8fcxp9252voh2unztncmqwujlf62moe9q818pps86za8a3fljzm1aixr6v7s3xmppad5qb1prxr71c3d8m1jdqbrkoanqrett2hakpnzjwygx3h3n59xte0t61e4agrwkbw60bogup0tpwagr57ixlu76ukv6ja9unh3so67rlla29vliotxs6h9uxuxc799ii25r4tlqk6bkgu248vvoy7cnfbxg7ldtuynjtred6rs6ii6j',
                avatar: '60zxsgtlqyrpy9ijpvmsrc5qajfl38hwld25zvxw097gsrbdip462nzoougufj4s5giofm4p5ndqghxtz2nwihhf5yanwzbyizxa8ve4cjqvtroo5bo63oz3oq40anllk1ts1itg0pzwpv8lm5tqmtrccpg97ulgjbdoujwhudmqma3vc5oqebdgd2w4av07xmvfrwb8j4pngiyeuqu57s762m3fy8z2o5nfvbuofoocj3vq6kqq4jjkn58765j',
                mobile: 'mktyb0fyp0iaoluby8zwq9zd585sfxnnuls5jalu2qwtc78n9qus83nqbhtg',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'q8rfxov50hfv3vnih4p6cvb70159kgtz8c46s8933uy91woj45qaf3kvjxupfoqbxwzjuc7kmxbwb8yz28k4v41gll0x0zndlkhjg7ioxxw6nk6oid9jecqm',
                password: 'ziq3rvyl94p8pjys1qgwfsybth6b05yrgyza6ufh2tkmmesy6dhn2xo6thorhzlz8fn2iewy932o1agcr20tbfrwe40lmi7fn6r0fixy9nx6ajiptmyf30cejeaqsnp49odyhe8achpfw8hcgdpoc9so4bhlqz1y8u5l5u5u0iwfa08eidf9av119dn8yi8cc94ljbezft0auqn8yd0ck1s73meuoxy88gd7jas2brm2hoxajxl7aj2pb6jlhqd',
                rememberToken: '2sajtto3dzovtkgl47zt5id2c8o7zte0li3ondp3ywtrm0e4ysuzw9ih16ci55td6ftj7m9am2yqxjppxuvdwriabf2qokdtun5ruwf5wcvc19o3diy5wwd5zatg9f3dxpo90q19uwexjbdr5kqk0r7xiq8rrwp22hyv17fk8qbphqlmoi3hm8rrgx53n6d5zcxc955duksldcgvxdy3dt3sko1g123ldyojxcuug9njkjks12syy4p6d7syp1z',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '9h338tzqt740p04e9zktmq4qb9r7351bvtrf3',
                name: '5djwr2ak47v5rxxndan0fqicjp33k4xxekh487lfk8w6qjo3n2dic3xhlqlbsj2nawee8pgx8opa5suef5nfopyazmbm4k92pluskyy3v7hgemfofheqnpkqu8jcox9ehc0u22q9f373ltwt87vz0vqsugfbeem8mjk1o7jx9pyxh9df3gjbfm3ys2f8dk33ipn74ygwa88qxg4vuklwl5oo0pnzphxyfwfd1q6hgqky3uv8lu65pvfa6j3uuhc',
                surname: '1v2byy14le734klf0ytu4qfgyy2nyu76z60vf4hkvhx1ds64e2hwz76t3qexflz2nirm4prre44hh5ieophndzf3a4caywjg857zi9csc0rr4it9tu2nla3l1ty49aam0ze2pempsbr38s1somyw97rasauadke3jfr3mr8vid9xxaahuyb0e211np2cfrvb033llfkia2ge76gniqen09ezcauwqs7ukvxqc5ogzbd6vxfw120bas1ewx15g1i',
                avatar: 'ndmmfq6o9z823sto4guiyjw5dmzoh89jcsbxgwrthkp5jiajm46kzv99413yi3jjlgggsin17ei2jhvckazh0aakmg07g4vs2jpz0oz9hhz4zwd4yyhww8nw80iy3xbqcbdyey3rqruelxsxjivj8nt7gkdq5varfa3uqhs0t9cn7vuowzs950zxb8gqngp1rqsj27a28e1cczk9pfus15o34hvbv291yfgpwljbpvbbkpnkf0wpfce5cm1751y',
                mobile: 'rq5sqcufm6m0esf1e7cj5wnpc7up6sutff6e57pjrdda9oamg2pq0oq8qn63',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '689nc4ce78dan5olwwsjhpit0fps4a6qmrfo8me5jvbsjvznydyw26n1yqv6w34wsvm1c02ju8tw5nmxtv6t9ds2b1h0qng5wlues6r3gqzcog4vancy5d9a',
                password: 'yxcgr47p5yro2f8zj4ioueh831wqxag11ho9r6qlisdk53bpu3ppkjwclswwgu4gm0aszlspp3i1iuyy68r3f5gjy118hdpezpy7xf5di0v8x86e27f4y1uuol1mkvsidicnvdljuwtc4amiy5dst8ipr7bdeib0sa06kjfa6h0u60n08z17cjj5ghh5ua4a6pcfzhm5jnzug311vbabkvbmyul0svb7mhdcmio0658cmo1rz5g1sera08l63nr',
                rememberToken: 'txuhcfbrxkcixer3mpg2u532xnj842ajl7mxwztv8byyf9hjqp3pkmg9dnwuo2x0r4zadvkw3b9p60i6o05zx0cijprx2aa354q2bnkcu732929vbrh6bfifdv1bf94pppmhajoy0u1f1yb6h13av8j9yu9fb4cnuikebztlhf2cy0ws0a94lzc3tgss48ww66yygdzi2kjcg4laml278xi1lgp3mmw1gp7ydf4mhwh7rnsh036434mu72ckxbf',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'i7h761tc5flfkkk17z8a5f1m4j6yhfxipvrwi6jbz76hpjg7558dq0ai85jzwim1dvoslb1693cfzlhemct83pb0slfg2arqydzk2lchvnepcn233btzwbdg3h2wldio8zxhydzkrf1zwg2sqz34wtync9wscytcehc99bqztnut4i89lw7o0a25341dt718h6r3awntcszyenthsnp232mnc6497c2559lvq28bqqo70470hhqem3isbr29wjv',
                surname: 't8f116h0q0u643qeezu3vg62of8l2rz5hzt2rdag97ds1wotne4b3u8p0q40wamdtxy0w89ic1tu898ghowll10e1yk4bnmf4e7sovf24q2gwhfvesspcgqrx37brv2u1qcv8du2rz2m4o0wr8awernvfiuxyzk7ptxx2ij2vo9756nwyc68s4ixykx8hdpkht76akm26xyy37kdg38fmt00jbsewkoy2facrgzgzf4br98vwsut9o5hkom0wvm',
                avatar: 'oeku1fm20ri7zpubrbu35v2kajkgg9f3wwpt692tfpah7fyuudkruzox3y4g6q6oia2jtqc4t5t35nbhli259ydg4032s35cjhx87rn18zhy7j11gc51h1a69us1h17hzmhtzmda22zkgsvhug3pvb0pvooqpsz9jq0iqrylz9f6ihnvk8rnx0jgio8ivpabkyf4s2yxim25zvvep5nlhx1yqgo7gm0gedn31b7rnrqfdk16sp9j4uhj4hvf91j',
                mobile: 'u96odiftna7g9vn92bxmbpu5mk552m76wuuvnv929m3kjmgxtk6w1xvyaazg',
                langId: 'zje2f2mydwe8q93u1pehkk4pycavlv1s32mna',
                username: '06idf66j2b0kx5b1y3dbbqnfz2s7t9d32t7jgc2aeuz1ayqbal5ipjcemoj9la73m00wma458rk11in6p3v5alxzz6390ovqg5z9u5msgzlt0hmpvilovv7s',
                password: '7bbparijx4nbckmvsjzegm3bqyc71lk3icvogrbbum9snpdfavy3b7sjuqqmhsv9qsu86ahr3her58d3thscmgwsj3fet2q004m6gavg9qq5g8zhqzlqt4ehxpdcbk721pc5lhgpg2l5u8msr5sm89iemczo9jn2lpct7ma8ge73rbdzthnw465d2uhljhl4z1kqrzy9cbqpq7xzfpem64a80t97bi4zxtn63orr2lcgtuv1brkhczaqnuc0uv7',
                rememberToken: 'kekbca0gb64dzcftvscwv1kx8haw1bo0n2n3i22tyqfgtym6ahjt8hmjg2d0yya3bm1sk7m1en6z6dlg07qyymg3hczhr901ehzteninu6dbwjpb7oml2is85bccyrjqgm4cmln4f6pn0h2u7bdnvrz44n2idtfm1310ypo56zmxtgo38kjwls47e62hh394lkif2yw5clrfpfns1bo7y8whwkfxvgr4eqsnvyb2xewu1to90ipv85dseshgctr',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'h86zax9rchaqsj486a1rnwhsf9grcwd9bwgirjpxgqgb4hylz327ysn1ua0307q4hjx66xmg2u6j7wnl1e599qpl4m8i021h32qzai2pxzbqseodfu3gr10lgqg94yru03pyqpbnnl4pnfd7crhqgughj95226k5gnwqbd67jpdn2iw89ji413e84hc4x23ovxk5bt5ebfhf4zmusgxuqx4vtmn82pvk9qkp5nftzg6isse8667jj9lox0fvmsk2',
                surname: 'qu8mr02odbqt037m6hvvbbu6viddvreyjmhue7higeq0iks566eztu21ntz8lgn3gf7edsbnzzwdh615z94mb267mo3v7f5knv12op4xcq5dqgsx2oojnmw6w0zchr8zk2glpbhae10h9fj3q60vm7bu0wvwujd90d8uonqy6ft3cufc43v9mavt6wh2i8151fggpqrzwv3d0op5153iv8gw7lp4fbn7hm3dgtxc1r46ties0wr3dksz7r73ken',
                avatar: 'rj9lku4c3n30me8rkn37351mga7xaqryas843tuk452s2xmjfcy823o5hwg6ostb5gdwxmnxw5n6s5t8qcb7dlifsa3laqcmum7y5hrce4d2x54xwvl1krxybjymh9jt1bms37hajri8hzt9yqwyhmzlf2ni26nzl3czqv1fsvsu6606mv2ab4kg73h1rq225wdrei4ksuzqu6d4p8v4gbrybku9rqhklqaysa683qtypebxz74424ezm24e9br',
                mobile: 'jw6r2pfzvtcnfxz0339id9wz25gu2quzka3arybqhyjzp90ow4dkz1rnvo3d',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'kt4noboyr8kqmj0a9m2tamr0zvdxzs1se8eupuhg2ks9stj4xsywqcismos6pmnl34w7jp00ckinnhf653y4180afyvyz9gtbs5km5h8g67x2cqu4dwmui9z',
                password: 'vkd9ud8v4tvxgxy8ds9ekvs4wvned2kulyh3lspw08plopz0nur75zi6al0y1ssvoc06519upoxgbuymgcjedvwfg8nt2p80zl1of01skuqz72xdbfa0pw2bk91zk3nwk73lv5v213hrtrb5lrwn2uhhcna98u8s8s3x7gputd4as70ilixyx8vcdbweuecv3mth7cxl2ebu7btdctre1bd7o40tyr7j2wq88jo8sxs2tw9n76n352bxxxg964n',
                rememberToken: '29hp9ht4xvrvc6xx244p70fro2k45svdc42j3a1lzxvgoz86dafy5vwhhipownkpdwzcms203758a60f5ej30601qlx491p3y8paak6taa5ztnap1zjtteh74jwr8ezhc52jp6kfdf4vogw5bqczxp08q45vfsh4bsv1ocnezx2bxx39qhss6tt6ga0unfb5d1w8q8lspusw6kecyiffynj6rn8po4a1ik8a3mgztwewguvjda2e1ei5kjlj487',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'u8azzz16swsv56bvsozzaf8om34abhqixxw2j2cywdspcsfcpt2v90n38rag0ugwu7b8wahie0g306gb6kxv8qy3ngqhgh762tthcm73750fvo61bhv4nrp3ruil1ol33oomd9t6i39w7q904cnrh3tgsv5b7dogczbladlec1ruo9ddffeegcuoj9o7461jwtmk089bhatyzlzcd5vlfhnm4jzqphz6fhwamdyvc5865bzqzk14o5q72owfxsl',
                surname: '9u7ume4i262hnaz39pc7aldqmzbizmvjdrbl9o901jod3z325mrxlsd869hos7ehzz5vd6de03dmx0hxm9y8aeecge281kayym0sgpqnod9lr2up52elhkt9xuoz6622o6oq4wfse3beap907w1z7j7mtnscz0crv3jk2ijanvk2s3e5grf6dwbkxbeyb2ao434v407xd217c0by0lgv8gsthnrvzwn9vffkj1emkertp1f7q4zqjb1jts6gf84v',
                avatar: '2u1d5d1zq79egl65yjauk3jk8qzkt585f23gjkrqx65h9f4a52mav5d9czb2myvijph8mkdlclxirmlm8eg4wcrl1uhx2a5pjq4bx4svmsoc0ka4a9zdsnymqshvezcje9olq85bwmucw1w7qs7ddo9b6y7y2npf1jnwm5ro6apqnzbtjggpz4z56xd1cf1bn2erc9bg49vz8t03s78otkn54txt6dxnpnjuljxer5sror6injy0qf07t68m00t',
                mobile: 'xuvf5y9hyuoekbxkjad746uz64yptwa2n8hendgpgzeja8k49rmtdh4jmsed',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'duns30j9w3l6xwotsujl78caflebg5wo6f7pl7llsyuv2x1bufxq3yny5z82hdq00wzvum108gxr8v9a9pnj1rzs18bl6jr3iuftrvd2u9puayobau9ibh9w',
                password: 'p9ci85661masityoek0vrm2r24pj8tre2jn4dm12mff5niu7ql1azitjlowgr593k041qhfo0un10nfpxjfnj0mbb71w2wey0y05nfa73j9rh6wu5l9jxo309kjduof0ngoqbya8ykd38wv96jllihdfkow9p91mfm75jp41n3zfnol0970es1xs57nr13iidqin4v5013bijzuyhbqb1i36txbfqug3ev1bni3oejmcnr3imsncnh1hvqs3vf7',
                rememberToken: 'a4nt02n5g4an8tnjdn7ogoj8sdibrsfsmlt3aobmtqhoo85eir9mt4e46cz7vp2rs0r8o2xv19vv8waxi0py3xwskuvz2rmk1u8f8w0ck9l671y3l3lgov70yzp2p24angnwipvfy41vq86v41bncvieqsg92v1jfy0vts4x6sbsjt5jbulds9m4xx3egcev11jnaqke6rcnrixqn9y3emxdkza8b40v1mrw6hd5sxvrs7euet1qcepmt8c0hw7',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'wbvh9uoz4ix0eee0ey6j9fj2ph1pngnd5xe4lvfnsnotzf3j2mynhh5k0goq73ic3x8uomn1t4gw0wg5ohgkc9exa6gtocf20oghcr971zy6u2p68y5u9sobnw0e40dfqpnfbxk8cs4a3mf328dp9r2026pp5h0k5upi71jwwbbxgf18h6ctexkbiq0qd3imdnti90buf1s76mq5txg02pl3526ou6lylnct0ravp8t1dbnitxspssfdna2i041',
                surname: '59uecjpaeso3bz59sbm59ptd3krhw4sikaqu1b9hbokwcdynb20p3p8ibdxyr8l6nzpoqy1x804k9c69o1o7smziult069jb76acs82s565i0ckmiij9r98wc5g7pxzdwy9469z0pw6pfm58nyxpoanxc3rmfvfzcg6bvbk2dqpg3kwfgeq2h7i5qft2shxbmxhapiwegidqayqz0ts6nvk13upxhz0b1sy1pdt85po9ylvkwup2g3ijhp9m6by',
                avatar: 'dwrg4pz5jw9dz15q90t4uryli43hyvbpq5mmymius3n8938ngpn07nwjzz9cz6na9n7mhjz0wb1ylsepw86zai2pjz5i5yx0gbz67qnrgc7wzq3ram2m2uziuevd9bo26wlnw9ngauzd76mrb47ghruj64g77uz9v1nia1q15wv9p9w0rjk9xzmgltc3oj7t43bwa5rzshcr4ddv1omvxqu4loqky8ojt2u0bysa8znuyokakmik4dskrxtka29z',
                mobile: 'j4u7w42ywbv72ovbuy308c4v6yxf4nq9hfdnyywx4hym3sskx5mbgt40jvkh',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'ro5ynqc84qbc3tcy6rljca3thnqh6xasodnrdlfe0ib1onr47vuq9wqjowarwv6twnsodvjuwz2xbg7hnmjnha057mtnvwm0cd65t9ja76xxbnigbjtvn67c',
                password: '1sh6tlgcrxk5t2z6x6gq9wnotbve7zv77i6dl7udmzqkbvuuwzr483nv12vz4xk9tl9hm75irofyp7o6wdbn1c4xgrnaftaida67hzdf9tr1fincx0m3gkazk6tnduonp3gcw1zxyul0mgn7xwpmwzhw2kut8yyakz6dr1du2b9fzkmjqxojzt1lrihi7m08wk7896mf6ekcla1f3rqnv2gk097u8g5pz96m0oyja9zlophmasoh4j33wr0itaz',
                rememberToken: 'ygwjx1jnwabrppb9gfmxxbje4ircfmcyrt2qcxud4ntne4s7izlzju2s4d7hk3ituawcvz0u9327dle5nqd9v2wf0nx8bpb9yq2b00ukmjotibh8irm3vbrt1n965hcir1skeqmngm17olymrruj60xhjxq7pe5vgvb32tc4urmw2q9c8xb1by7iwyvdyd4h05segf9drd0xepw4ppu55rkfzp18weo7c96o2jmjz22kvupyy5pxg3qukspi1ik',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: '27aeycyg186anjiuyo5gzr8c1817zm8g8taoc3fqs4ebk78vjflsdm6o7m3kabyt4yw6n7meob3b81bq7rf2qfiddv3hrd90acjp8z1ee78xvo187vu8aw69cd2j6bn8i68d3j91ukq9volbbfn05mox0r4odqrvg0036c5ly1gobcdrsu4siashny8zjxwt9dlza5c5a7kvyd4d8l1z6esdq646tedbum1ryzrv4loh1krt5gzqzc2pwcxfa3y',
                surname: 'xfzjk02mfls0jkyprzd2unf6cjz34xng69b0kdd1ud3f94rb7xs8xg19z6ht3jl4j0zkl23qwpro0wlynts6i3el0njatn1j5j5f7fvmmd5t6qc0yij3s43j4y59dv7kvga3aysydb13isvboietw9jnkb4zuzw6m24hcrqvszq3gjz87hqry39696et6sdzfr178wdns92goyq1g7thx1q5oaqx9qqexs0bbk3kl3ybbahrxqazmnuj5q3r4tn',
                avatar: 'tnjsfl8w1viaf1i5158nv1fv2o83lzjjj5q68bjtzjujgstqhs8d07wl6hcudv12cor8jixk3lud8rgssjm1hnsc55em0u5bqzk1in5qx92iu6z9r5s94wxjnxa36tq3m824jr5aguoi8b5wtnnvorzpy5x01ny62lk3oeo987kby7jqq4zty3mv8pa9rd3za1pz3otdn9w8ts5gbf4ogi4ue3qtc3s4rbc42xgk1ar1y747lfnxvid82rutp4x',
                mobile: 'a6zrs7p57becepmtyfmmdwu36ckz60z305t3nkzvlmz37zx82ty37nx99m0ur',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'tes7b67wuyjrv5g2wfb1dcfk91ldrjen6mkbeiowm1hpdc1i3jw7h28depjezhz0l20nco4mmj2sms1k8hjm9h86ql1n2n0ac91cgytilmh9fry8qa3u1opb',
                password: 'gksj4jnombclxjyw0kozg4z2fm3c2kgu21dc9yn81s9w120z2mnkiz1b6zdu79vca3q6mk9ghb98su97u6ji2swu78abt3swst53rezzi0s30l0os2kxx1ep69qbcjiqh2frvk5lfxcbphmw7ryuqvr0f50nk6kpie5m5cej76pxfshwfzgc9xlplu0j5swcgpyjs7rf86zyj1jyo3agigt5n6za9r5a0afhkxqy6cm35q37s18xyx9yvto30vg',
                rememberToken: 'i81je9zh2kzf0anlijpcb1gzld7rydhyzid3vwgl3kwtd2fqvwqgowj1r6o69kuotxofns7v5z0rse79yg51xsuif39uv7lnhkt7b76swa7w4tu5cx0vlknh0ybfv5ricw3i3gwds5rtil358l60v6ufqj7brqgh6a6iycxpmjftrztcv3tiv9y69w5dx4xmmbtp7k9eks3xz5iehjjjbfg0xr43xj17fvkjpo1jkdks63m40xn3pa926u0c6xu',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: '3lyms3jh2hnndrzr37c6yx1pns0oa6tcrawo2r7ya4x2tv3y8446vi49h7y55buxeggkvejx3patngd0l7sneg5oqy4fqh3h0d75pq7iuv3tlj9q0o1nrq4impw7d0ilj2ngcm2jbh5e0rdbc60fo0yf06xyr59zjoxkdcpcswjxx8divw4r24q6ibqhveyen7ap8i2u27eff6nf9xr4cqeyit401z19u3qt1karueqbahexx47vsinbksantdd',
                surname: 'j95wcuuko39u4rh10hj89xmid23nee57h3q0kw209nij2o5bn6j611kbrs2ve2rvb3ea6ynbgbcu3ek8w2in4zepaqmq1585xv8he288f1dokyanv03rkzeqo2vbp198p91pgrjxt3grvz7uocfd3wi4m3k2id0corpg7t0ej0b8ilrtbnm3q68qgffarw80d9ckw3guw4ba5bw2bogv0e4ymbzx7lf2txro03odds1sjpoy5b6pz2xvc5fx0wm',
                avatar: '8mkzhopk46obrjw3cxioji23nogyyaygvlo7gf2g33ajsp9v80kots1r6haegwtc8a1yh39pxym1dzz2is0awr5wvuvlb5cynqys364ppxuy5zgoq7rz8ggwa3du76og3h8k3lcro6ueuu69dmywqq1kkc4hrknmohv1qkerdwsxbmjuvxsgjx5ajhen90bpaev7jqqgkr3xfkubbiy0pqeqihzid5blj19raqxmq4wy9oq5udansdunzqdtn63',
                mobile: 'ui0v132r18ljp88ecvi8sq6gfhbplr4pmww3jtqgbgkjmqfy7irf4rxf23cx',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '5cf7zipfrpotn4px8h3u8uv9lr6elr5850bjt1pjv193fa97gkdiqa2tn3eht4is553x7z4t1hkgcvewx6dx7ay18vql7r611qdhphm0fa5dudqcmqebjwtsf',
                password: 'bfjzmkuyl9wzjlwc2a56vx7pfubtn30yojdzxj7evbk06jq1lx3wclzia1ihe6phkqwn16jv1ze5gzaybv5n2s8pciwyzb87b3qrwvcscoeey95rb1vj1oxtlkhns2858ylpigdsql51p0erquulwteifcrnxi7xipelici2kse99dz8d5goxuzyctho1w2w30jscxj2eanlfsth8xn1a001i254uxg041t71vouhuwmlh8rmeqihp1yrtvx6zs',
                rememberToken: 'nvj6u8pshqyqhhf2oakywfd4y3y9eg0uc4c8n1o0ijn9tgbsdibel8khjdmtr9ab09gs197xa663tkzfc2xk5ubwili17tl77bvh5wj5qql93fwqgbrl9ds2ehgfkblmbxxutf58uumooww1hm7i08k35ce0d9cvtrmwsu7secw13oio5laflzdpc5ho3pcmh6a7ysd6c6qsjng9xmypo7ebohdxmbcauza5bxbb23jghvkbt8nwbjth0jm2ly4',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'fsbdbyuz0ouuweyoaubn879gsqg4wf8me230wcvl45cq89tqdatdixgtmo70v7tqfv9ymjzahu1tlniovni1azs6kxng8uqb3s5avv2io5fks630p13ph02sbgaecrduuohimy0otes9txj4ahyzkfimtvf0uyg2zjgd5w2c08k3n6l8sn0bd6dnncbtwu3m7miomqgjpl9prt0pjdw0x157dhghpibhscdr63ph4sjsyrbp1da3qsc40lg6ksb',
                surname: '0zd4ryt3h1b16bm44i9ufkfe0trt7v0eatv63g6lmq0kwzohgxbkpw80h3plwf1zwym40izjplrjyjgcq4tdy83yv8e6fs864pwgs5srclfnyqivhw1x45sjvg6uhp376749uezddyi9kijkwuexyzzs3oxscqyd5avsdc1p9syvrwho1gbwpn22xkctn56y34z0wwrtvfbu4t451ca2iksmuc4tlxexg9kezp8xl517g143ec0c1k88m3btxc2',
                avatar: 'yji63hcvuhd4t8mi9haxoyqk2mhcjlg36dp5rpcrhf635bqe6rlyyt8flqi7dfi75yxqbivj5yeg9g77cqseqdfkpbl60rwu5vuqfkdrbj1gde11xl5i7vwd1xevqdx9u47dj9pu29lx0w0k3n5peuvqiu9rzo1sicg2iebh0bklytqvrvu4u87qvrj64umz4ebsrcj28au5iio0cb04rgsschd7hg0bk3cmm6ulcifd2jy0q9ymmxilcr7boyc',
                mobile: 'qe5e8xfu35b2m0kddwfzuihhqmtgrsc58f844hwxzz3mf6wrmvs9wsi6jfh9',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '1vnecqcrtnc37ssdpxibkpwh6kvp6o8g3rso458bu31og4bff50xaiozku3y6467nlni92ycnuibmm19tnudkppzp0q7xoej6ec31h081a6uqx7l8y9om3a4',
                password: 'd8dmnza9wmh1gwk7mmesksvwfxq4kyyl3ksxjnckxa79661xmu7miw8ymdrl8gq2quti5plpcle3ivsj8dhmitzc0spctda3g8lsm6i5ylkd4hso0lbht8mfgeiozr8wnwuv5f6ytix5uks160bgjs3fx8mombr1darwt58g4magwmy625eq21s0ptx2qjf3eiur34flzr0hhfwgfxr3kw0m0p4o8ia89cpe3ef25b4td8w58qx7a4cbphrnuw7j',
                rememberToken: 'ruf9bwu93amfsmmz7cskoyx0ksimojy0xzwrvx3qvwnkfu91qinorhmetw2toe3dorztau6qyq7apz62nu11298ymwx4oyjsahiavqee3dwd91d276ozbowid1cl9ajgs761p9t6c4iik5h30ve5wtlwv73wxc1162jhfo6t8vu5ts2pt21how89n6kys7vf5k6fy2rtbce9gg45ndciyeqb4g4m9rhol7svybbkv5fp10juld7zx2gmdjlgnjx',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'tx85i8ncvoqn6k9hki1rfucnmgvbfrlfle3lyfs0dnm2orst0k6b5i1ig7ra3z4idyz52wdveawjyknv6csx9zkt2drnxohbewptjexfocfl1h3ettpklehxwgy6kg6339slt4841h7w4tk4xjjqnbh2quion29ocwh309l5wmv4wjp81f0vyyt8guom8o5zsqu5540ri0axsob3johaods4zc8kb3p7pnyjrqpubop1agcke1rxd7w6traq6a8',
                surname: 'bs7td5qmv5o232up90u2j9xxowpyf6sk25hqhpllvgr9qbtjtbrhia9z7bviutw68u432hd77q166glu3jw206q908bri2bxo1z2704eutgo4a0jz6iv2ypjrmi1z9z9pp5xokxmftu22pvcwq6q0des3r9sj5kox4bvfie39ziqy93c6rjf9nytjqaox74tzegkl2hzxc6sh6aeaokvc0dtchc5r1rqlwfhe5cb6ssvjvbusfay9rb09kn0p1k',
                avatar: 'hapqhcxt2olr5t9uzeh6yui5q74dw3whb4qnqlvpbi2pzwvc7o9i7bmilhbeahp0vx4366y23sjh4u0cq6uvxz5k9q2wr74kp1ltbejc6izc9cgvk3sfpxmicdxo2xabpvhwcprfzlymh74br586hc93qvnadjutvksum3exyqvmqcmgr54v5jq7h94ix2cg10q204j8y5b0dp4hdfdx0pobtfu1v24uw57lrn6ukpgiql3waxknhuuyguhk3cg',
                mobile: '47nyuvx7fyvj3wwukk7kwfxz8ujhdysll2qrrm2u6ulratx5eu11ejcwzxyp',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: 'mt66vhp4oin97f53htfpsnpb4s2dtpqb78pxibtah1cwnczuil8n2z389ej5qucb8uv62556tgttiybifgoogdz9godh2rsjdbpne6o2z4mgcnmpgiqhsre9',
                password: 'lwpfepouj126jk4lwwfrl3837z03vjm6elx4ajb4ag7e88fgw9zk58blmwfgxmwh9lf4iy3vbkj5586prdaxg9qq1di0ciskiaau3qiwoevkww4cwnacb9mouuq0jq0l5f79fitxq82kwl0ltem0kjcz3pedjl18lo1iextid90jjssbhdn66e4h2nh0ct87ae6h74teb6om3gt37f7v9qixdi7elkopmqnj1dsyfspu6kqx9ir9g05y6njkm6k',
                rememberToken: '07mmz4sf1via0nkpkq3h5wqx5r9ul8qoba3sd67vyux1ydxtbe176l9j3n6evxesoajaeyiaiv5iwg7dqzjve4gtp9pf9hr0q2k7ce50b1kw4ewghga6opuderumizp7fkg8g9kzvjw11cqwcxhsbfncvr1an6ur8rn7qf6nmxyocrgm9tjus8x3yefi8sewwlu3oq6z58o65wqmf9h1d9mdymh95n1ik2572broc0uhph8pw2d4na4jduuw2308',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'i82ee9oj3c0ojtaft1n5hxfqrs1vdd6zitnyyv8id23fcdl58lkqdc86dbvy8gx2p7dsszd4bo8lut14x5o7emxud6fla7purxtet670amtjrmj5iw7agw1ymz6rcjfk5cogak7p3yhy67jnt33tqwwsholvnndfdd7nmohl3m3mmzjcply53ykc3ro244dpmelnza4acftq8vrkm78js7k56x7h3vni8gdvar8ajbsauj1p0huttmhdxcr29k9',
                surname: 'etijesvtbl8uowrtwxjkiegykd7wn4z9kyihinzdw84kkb5dk91rbvpgc0r01qvyvy54pq6oeq4ujwjicjkdtd53dk8fqf3x0mj6rb43h3pfew1iduqf5zsrs25aj33680ealsn2cuglyrd6h819xy3za8bazph6n7isnjvxq26g5hbqbalwj5rz0xks283j08cex8f6w7y52vuuzp23ke6z8307zvm69zkdurgp3wikyzwb1imxpauvrz1tcn4',
                avatar: 'fuo5btboggywf5tm4vscyonxm983jgh9ryldlgjiadpe892ykujuko2w7b9fwoz9q2u1xrow5y0lby31u99mxyeafv5gn7hdkz6mcf421lvwt8uy3j27qdesrgo5xmjdgbmg1zdvyetz4v6ieb1ajox8z97rqicmxp8i5irv7dxp0ac0092s5mvi8fzopofwhowe19ybnnc8l1navqg1x3frx75wevwtpm7pzz53szwqof35v5oblvkhin76og3',
                mobile: 'open38lgb9c6m2kem70uubg8nyagekwbfbbtcbd67ci7mboxgiigvvx8ki0a',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '2j5o7xh0apm5lkqnqk88khszr2ts9s3pl4i2umi0vd9vjis1owofeg48abnl9upns0auf6dnt9y97vj0m6n756qe5ruqzlh4u3mqqx192jedp9holx6jr0pu',
                password: 'vhuts7smmp14t1fwkebnaovjpcwlug9wm1ldwtmgwnw0ixwmo8q2r4p0qccvninx3uibidarjlg5uefluu27g0r6rxdgsst9k8wujowb5j677dtmg99te3f9smmrcdl9uiqwd2gp7ln0i64nfj1ozbgyueokrq6tvn88kz62knrsgoa9avz1pn6cq3djckhjcrqqakj3aw5hd5iwfmxtn3h0k0ahip94b4488fxtm29hg8butkfa24ocbh1ycl1',
                rememberToken: 'x7isi6wu3i2ulym1a8jjvhgc975ps4kqxsqs67sw2xh2qhxfmw6ar54s9n7647kmx4qzo3sop8s7xls9m50x13t27xpn4qmn25mm1ji40ztorne663km67fvfeuaoz0cs1fxbb1jiktg6zt2zhb3jcq18bf5q5ju2ar44j1dtx5yx034j9j2q7t0rry41rqer27urpz8ds6bo85ebj4mofbcukao8frunskw1r5uz969eo5lbdg14gwkmj67itd',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'c34dc49f-eb32-4c5b-8c69-93fc45d0a2bc'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '7b0eca9b-b674-43bd-84f9-82cb82de5305'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7b0eca9b-b674-43bd-84f9-82cb82de5305'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/0adc7434-d425-46c7-90f1-a04a81146543')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/7b0eca9b-b674-43bd-84f9-82cb82de5305')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7b0eca9b-b674-43bd-84f9-82cb82de5305'));
    });

    test(`/REST:GET iam/users`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8241e5ea-9ff0-45a7-8ddd-ac0860c7327a',
                accountId: 'a4768e2f-0244-4a05-995e-d2137f33df38',
                name: 'syeyyi86qcnckfhxzk4mcnxjuiizsmqqokfkf48c6er4spn39rfjlg7zl8du6rc6mze0s59oouqx9lt8ifnpxsncxb5ig4ib0dpjdxp2v4pfpbjxqah3vqr3moadxwdbvp6rl3aomb9hgk6khtfh1n0ezb19lkn6dp4w4zuhoyyd42tuhaj5i84znb16gjieev913lxphpuc4mz4g5js6ohxurddk2ihx3g9412a6kowpsb27g85rog3c2ohfu1',
                surname: '3zny4cv4cudw302gih6o8lh0pg5urgnjjxg089w4be0niwouck0izr2b2unzt1jnhcf1128ijpg6hjyzaaw1ye029lc91vgo1ygb78slxnu2agamaxvf37xw3z215sb61kyzn1hpiauisxszn0bkbp7ceyh1dyhibw7854f6pr8wwb284bb8nz31xlqtger9jrftxijsonyqr1bjq4nan1xoc7xc6ixx3g6ozee0vf8zehlwx9mnzj81ve0kw9k',
                avatar: '9q1d26ag3yhvahcaxeh9b2ydvtvthstj4mkrtq8eu9tto2wj1w4ld9m1wc7nznezw4hp732je26qk1qlupc0k2zd9o76opt8z59cisxn8igcs0rmgce6oqs8fd6auelgm3r51hnhia1wfx9ps0wk2cyhem9uyxef2xyeu2xtgfyhxymlp15uw90eee7kkdr9hq5fuoibggyq8gfczj6129jsuoo8bfic8tlo6ica48yt1nab9rplt9234q9g53o',
                mobile: '0gwkh4x14rb3rw4we9n15ggkggdro9ub4xcd1eiji03y042uivivoymsovkh',
                langId: 'a876d8cd-9aa4-47f8-96eb-f6d37b565454',
                username: '3p7ev5uoclnmjlcn5ihs5ha8nzurznc1hpi2b7e3otfdcdgltijfq33udbyapua7nyv4bxvk8t1vugml3f0t4uozrac8jjjmr0qgzs5tamt1iisvlvvblv8z',
                password: '2ba8d6erd034yjp6qjpbnx5a1aw09uqnd2c4qlerawilepfpvk5gpyafbtjw4xnucg2urx89dp8tah4qbw3khxfzpkg42ix4e730d25c6xnlnxnmkm1tzkid5gsh1or3dy0vmv12wqg0hy1u3qb4zmn0xdmbpnz70nptl0663p3ses7fyrf2wnbb7ciizi1kzu1kusos3ucrw8qvqdvwh0yyjuaipo2t3d8kwketgcch0oepdw5qdgl3uudpcbs',
                rememberToken: 'j5ix0mh30srq6i6eqqtwd1dzo5mdajbrcz1jd3dxrdm8uk1wtg73se1639ix2irojzms0q9ji6vbjehqjx4hsd0bhtahauey0bo1iafv30drtv0pahs4bdbidco2au0w9o0erpywbzsjwa62boun8wcw7wo0kl33gc9ybavq7174oi7jstv6irznk4rbdu0ygnh90q30etiig46ncqgqnqvrd514alqzw4njf5ddbii033t3pbin8grakf30rxx',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                name: 'gqtdgvhhgd5w4naaglfdgozj8kqdayf06kroe56fsqoz9asjl36cz8pevbm7n3jg28gmerrje8xdmikum2f8hapg389o5s46p8s5b131r795krk8v8tsxafiom4rr8r2u3gqyqbqr1c1vnwje5ajuj0j24knh11tlsl7cgw215w944f3bzn6aj85ublgouhg1hrwe12tlsrgxk00q9hhxovoz7l03ko9nyz13gh26p2r67vlhe22n8ak06ntcqf',
                surname: '460rlojiusipwb5jp0ek12v7qytf4pdva3e8udvkg3govptud9dk93h8yu2dvpu16a7wa4npz0yc753vz3t1h8eblkwixpye4joho40mqrdnbyxmsu32u2ddh2285uwtek7oyzj19w4hcnhe52nv78zujra7sq57raux9vnjr8g12r8sgwhjbbd0135t73fdlknx75d3isu3b03lmjzd4x7l8oltvbz5suzsh21m8mjf3x1nyr4pgv290br5d3b',
                avatar: 'wxrwhi7agwfrgwxeegvphf8031jhwgkkox0j2b8e5ixdfqj7cldvrbwmyxkms2sfmaxvdm7prachibhjj6h41fto8jxh5tl9vyyi7hr0w4oymx1njggqmagiswqxlj8cxyafln8e0dxdb0jkqpcunckzyh2jx27tvyl5emrs0umgo22zbjupu0uhdzxtw5unhsit8x3lobfk0re3jlfw132407hswud62vvartc3ofp0waod1nmm91b5o8u84r6',
                mobile: 'yt6lsiipllvavo77wqx4qea1t7ho1kguo0069okw83151w1jnv4pa8rm79pl',
                langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                username: '6vnke3y580gltnopx45sszkplwgm0aic9bvtzajajq073nrx0dmuuhe4s5xh7i1f7sz044thlrctuw52eo1yiha4px0iivfzpuc0akb1jjpmrsctypnrtqpb',
                password: 'q75bvmsp50a152l2rx6m66wguc9wyr89r07xvqrd7vlswiablo8y1uo99p4ya5611r8an7e7rk8tnnmw84t67gjwknahf7b2owm1d3ninrk5bt5mt7trmzayz81w6p7j49fm9jtzegbl21exch4hv364gob6qo4s9tspjhlfxa3gynvtlavrf8nvlcbgam3feg2qfjym6l2mx51ybssd7l9zk1zsu7ypy2frdyhwwoag6k5v12uh804ub5up3sl',
                rememberToken: 'e9g1f0gpsjjlwd8tyde438mnlrl81l02wlmm7sftnvi7f329vt8sp1fnc8y6j3csyc5ju4psj4b2gvca4uv97wxafluuckig508yguv9246g3ex4yzoc9fqrczfbvf7ftq12ghhhpkyh8flw2da7b59ivvs0lqxnyq2alxntyqxcljnp0yjnew7sp0x5dov3nyzdb6o4g8wwptzlgloj0xn1vsowapqcm57wtcegbzmrqyzc3gsroc0z89ajtfm',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7b0eca9b-b674-43bd-84f9-82cb82de5305'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/3c3d6078-608c-4492-a834-71f1c927b125')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/7b0eca9b-b674-43bd-84f9-82cb82de5305')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b39ce340-577f-4f88-92e7-52c893f0f587',
                        accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                        name: '8rf7s5vlfu5vz0as0jfqglhajolku54q9la1q513lyqt7uab5r8eymkd2tszffxvtogpuzcl1n4xvj4rn22mz8u2pncbautrd8o2lm540cqdk43z0wptek0lwey82s9q63xw6agya1n4vxtb21t1813zew1rysfyad6m9tvfbodaq6ck1093o5cck5vmkxw387kyy8otq2mrcsl7y2yq438a2xcnjxb26mqvrhy0tgv9teugojsc1r0yex9c310',
                        surname: '2svylxey1jlmf0ugvcvk8hdok7dmqr4o2bjh5v27bdk5mwxaighkt0075vsgwbxx2n3hyy6qvux1at7hw95sur3llzm1wondppdq4pavsm9l83om30rujje76ts6q2jyaqklk11a84sochuurp0rrhx2dm3cnkwic403x019of07igkslkvjk2e4enarw4b0s3x4wma3pj8hk02kkde1jecwoukz5c9cm5ci0m165pyntls6v14dktjn7y87eps',
                        avatar: 'vvktto1vkbpc3y95x97xambovz75d6hgqfbvymdal3xbu45yn07jytsbjd8rh1gtuzm3tdukx13ho9v88nrssxiu8w8tm7zxu7xz8a3if33y38oh0tqoilo5h4199vhgvqumztnp0o2mcmklnwyhmohlgzvmk89nuluv17rdeok2k7bxcmcatgvsonwv61g1q07a0beih60wws9y3f1jt7s3d12t78vemwqd92amlebrrqlkkyj1xk8bviw8yf2',
                        mobile: 'bp3tmkooaoerf4dipw8vdjkgi9vbv8vg5d9sxg6kx5vgp2thmajsbdoez5zc',
                        langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                        username: 'ar3mr089ocj7kj6aouu15498yzrvy4f3205wkwxevbdn0etcixz9weop1hre6vityprxduu7w4619j575aa9y1og3ys3bgqiq2qdwfzltpecvcqrufria8m6',
                        password: 'qthz6gz2kqcvon3uxceyetvq6a3k8whzsgf4bcxtibin2q89h5tjw18okoolxxqed8br3guoyl3ufhhzh7fkkzuo3tmlerwdy982vegg67nh7q4bu7nipn9elh5pkukuibedtardsqalgql3pyjl5gjzbga9hzlyylmag75cmhv71fdindaq2a5o4ibx432qhxfvnmv1qw6fykc1ens1glj26jndu039vyw8u6gs4pvgmh4b0jzagmqr1lnko6d',
                        rememberToken: '9bct8mjlofh6i281t2l2rwtl1t27g6rdhx0v7z51eme76gr737xt3d4xnhurvdw9dobzm24eu1eoskhekmfeqnco4wakv3dsp430v8pzofhfy7avip89lccfdp8ye01zvk5y1vi6nsvo70ez9cgpt3gkc31qf5qmo65l70qrgkg8us7f2ecbx6hd3813umhyfxj4qxpycas3d52nhfgtq40btsalohk24bwz08xq4ejqsiu32na2k9xb6jnrezo',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'b39ce340-577f-4f88-92e7-52c893f0f587');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '623f742b-f009-4265-a958-edeedcd60bbb'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '7b0eca9b-b674-43bd-84f9-82cb82de5305'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('7b0eca9b-b674-43bd-84f9-82cb82de5305');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: 'b0001be5-9047-40ca-a3b5-1e147e6995f3'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '7b0eca9b-b674-43bd-84f9-82cb82de5305'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('7b0eca9b-b674-43bd-84f9-82cb82de5305');
            });
    });

    test(`/GraphQL iamGetUsers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: 'b7f6ea08-8859-4cb4-a800-8cbde370d266',
                        accountId: '8ddb2016-cc37-47a6-aeaf-e23bf5cd3b0f',
                        name: '5ml87wtqqxwq8pja9mk6ckxipif5ml2yyzwkswew1wa5j19tdpturp4rofdbwlrfl3xvokr2a1by0maq1m9ai5mc3kxwdpwsjcyo9g6z0tad28h97i5bjww81k1jh80o5rbvu8dnx58xbm3lcakfcwjwfomxunkyhjj9he5xjmuh53qn459gelkgctebxc07kh2oy5bmqdn8cdxwiz9c7aj4ky84tlrxqbqvkqtg18w7adqjrg9yyfrxgb17b04',
                        surname: 'osdgqrqlkw1zlx7th7ul5n67zm0lmybc14nuhobwo4cvjr88pjvblswjdlhl5qzf3qs3odg2mf62b6z6gm11h1fsb1wq9bgqnwevf86oyv7p7c0jp5eweo8i26d44il2p5vtiobw0y804k63zh7muq1ju4r4pt1ydes25kobh88bkhs5h71aq0xupudoxr3duta0atbezh6ynilnq96km7jfpv35ygql1gczk3exwnbsv2kvpsdsgcgx4mnoacx',
                        avatar: '0lvshl46x14kbw4s9vq4w2wplq7qjqsn3dz8ejou0ya00zbdqqmbrhrhlxjanz2inzzggypwnzgqqaf3tpclb3avpa5zeo65il410hsp8hf2egyn74j5rw85ljv141kldsgl54z8cq2qrwi9aman01lgh5jm6qftqma0duhol23rlblrhgkkfrgs4l8q9eyl6w89qy0qv3pk7tty1f8vnm0gnc2wewhdarx6ua2i55dl7uiacz5n6qiod7lfh83',
                        mobile: 'oq1wkda35o64du2xn5ipi0p02v3dei6muv565astzgo83jsi0j3h6zwhcji5',
                        langId: '72e144cb-340b-4507-b035-20b4330c0d45',
                        username: '3lgclb30hnsesxd9vv84fu85jde3v95ehf8r0nz1fyh1oo6gs9vlutih0cbahdx9siz0f6ntpliwkhhl4k9e594hic6aulh7kikva8r0ppc5eg40iscqr8hi',
                        password: 'r2b0p2zdcd3603b6yfzz4z7eh15b2ru9skk22bblk09x0vtakxtzv7m807owi2ymv5w7x1frmrvvi4rjaclxv9z618fa9cl8jdq5zeao4w1bmwrh1s4pcnto5c4fiwso334swui4404chf2j2w0p1yulli5hykup2mo8av5sy71cc5vrezupmqgq4pkm0seonzpr8lsxotqszgrcoejqtzqfxaqpe8w9pquo8jqfvia427ztzqsqkchwxs63iwi',
                        rememberToken: '6mq8krsqxyp9nhsisq0ta5cqmfnpx6d3l6ib90lvbzttzhni16uunihl9spw98l7a49r88rvcjjbg6g9y802qgreygt65ffjnjh7b3rvdcj53bd9l5h0lbos00g675ut5gu32thbdr7ndsh392f2lgz1g4ryvx3ws7bz1514crsudntik3oy208hmzs1l9yqgtuwx0o4tqd6kuvbpmelt6olx4r6g1zj0t6x4fq74kzeea5q2datg5g1htvzdx4',
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '7b0eca9b-b674-43bd-84f9-82cb82de5305',
                        accountId: '4e307129-1151-4f90-820d-4c3cf065bb36',
                        name: 'zw2hat2p7fkl3kt2lehx47s6v1lglm9ri4wflo5gclrvif0w9ylshn7p6y9hoykm4tp1wgoniah742ssboq5ipk06pa750n32s5nv9o4jla7uk0abqidb8l4ymbl86t5gt4etoi4kxex1sgcc6spp6tpu1cz47cdum8p5a3s54k1ygvdwoc85chviy3ifk8t9edez3g0uzxw1777uyttopseyplhsktj00h44x1d5eu6e90pwwshkujkqva5qg4',
                        surname: 'o46pkcaiouoaxlst6fouao7fu3wd8na22z3obis4ld42n6apcu6uo8xu90iwdcd7l1x602js8s0rsxlpumct8ml94zo1qqohhidbzmdnse7te6730w6p2denrps0spea80l3mgv60vzfkx0sa9nf4cs2lh1nf08y2aresfcjy2re5u1mwl5839xdtfb2nww6u3mvx13ven0q2tieva703asdyy2ing4pj9xn91u7e1kpedg3b4ap0rs6xq83fzu',
                        avatar: 'bs768gv5kp86wiwtj6d8zq4yle0f3tpllmi4mi0k5er651w0cmuid3b6ercw0754dbxei8e4l7ghf997r1qenpljkevveh4r110udmbt6gss2oagpt1vta3dsj6xenqndlxtlu10ye22xy7qwekepugzd0hbxqe1t4p2ayemc07bthln5zvgneesjcolbpnp1avhvm9lah8gs49pdrivs5pdrqrglyq5incqmz9pvnoimb05xqwb7z8qz43cytc',
                        mobile: '1mfuf0utosb6m2788bl5de0cfcbvl2bxdl87d4skv11buvgcwbd4jrj29vuu',
                        langId: 'a2ec03be-c5df-43b3-a811-34cb468d2a34',
                        username: 'elvi7avflaj5bsyakewmepz3a3aliuzrckbc6myjelua10w5kr3pus4g2q0tdavxay3o6yrd4ypymjj955dscvl8sntihydeeoikoi8c5r88r4kcqm4ke9rx',
                        password: '3orvzb9k0dxr3497ovxm4w6hwc3rbiehn43y28moo464ohz2pafjrmi1a2slc8cp5emmgbpsklnkqz2pkpspjvp9yjuln57vffca77uq2oohs2enuid238yuja6ptbi2qu3vnbmu1jdy0e2csh8m0czusycqlkpvyahcccrfz655ndqa2p9tpe2f50f2ha4fdhmo3op2ob4wtuuibpthghn6r84snk78pq7ycc7cfdouohy6sb1u0gcpchy8x9o',
                        rememberToken: 'csh02imqtg2ytndd5q9nkttsq2w3ebndn8lxfv59zvfr5iapz7m4sict0rqxorla4vhd0i8m2dbe5tev3z9qcr74025gkrveqj86da1uvyd0zq8iiwsqsyu9m7bzs9kim0q9eoy1uqyj3fjnxexly9pv5u0z502a76isqw6wio4aoudtu3r5zmkln5u52az853df181e7v127luutj00huednk6z81u1r92j5is4f73hmvqx7w6wspwvkduhuqy',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('7b0eca9b-b674-43bd-84f9-82cb82de5305');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '5a7275a6-c713-4552-be1d-61a5f0b09e25'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '7b0eca9b-b674-43bd-84f9-82cb82de5305'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('7b0eca9b-b674-43bd-84f9-82cb82de5305');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});