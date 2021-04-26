import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;
    let testJwt: string;

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
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'xx6clkieig6q39fnvx6ixgit3ykd02v0k6f4qodttdqj97vs72silhfcwpjt1mk4xagoxxezo3r',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 299731,
                alt: '3ki759tkcgevstfm0wwqf67364edimu621ofbp1y4gydr6q43a8ba5p6y17s8ss6sipuzemzz8b0vffcra3wua3ru1ygb92qn8crled0gfygpsxk28riyi9r9we6199fsbzuuyiwlnw8qc01l8owusk9c13c8vqshg8godzvb5hp1mqgqfs266gln9bjn9qsuqm7vwwi5aysezt53k31ak4z9cub06w6lge9m8n3eggvoyrmmhodk0tzwufwdaw',
                title: 'ygajlme72yccrsil6jeqympr6cbntj9c5ugddz5qijxuq4nw5bm1p4y6n6g51goe451xpc4sbmrzp7t50dy1zykdlrazzfuqc3m360ui2pxv89k7sl61d287vsniuhceys0lzwujvyafqpc63oztqg2cap9j4o1j4lg33xtjfrgq3g5nz4xo7cr8plbojpm0qagm8j9txbfqxh5m02ge9o0oivaos0rw81zw3krr28xv888abw34ew8w9nlo8qh',
                description: 'Rerum enim eos dolorem dolorum aliquid debitis. Ad qui qui non qui consequatur est quam vero aspernatur. Earum culpa commodi. Omnis et vitae eveniet dolor.',
                excerpt: 'Illo aliquam voluptatibus et. Et consequatur et dolor. Impedit asperiores consequuntur inventore vitae expedita. Blanditiis magnam eum reiciendis animi nisi laudantium neque commodi tenetur. Et impedit praesentium rerum earum voluptate a et illo.',
                name: 'eux87dgahr82hg182cj3ynz8rp5cgnw9rr7ud6qq2qa2czrd3tysb791328j0lgoddunbzt3v44gv7ky7k07mz2hk49tl0b5n5dvn3dslfj99l73vih0w320bsro8ih9ued9uclays64favcbmh53wdx55rwpul3fq90yrk8os19qrav0jyy1s1j3x8iccz5vkla0q2kcioh6oasy3oj2hese5mn85uv0nz31ovebc6rumk4su9hu3uj97vzrb5',
                pathname: 'n61uu12mr0mkii4tsa3r59ixwscwde397v7kxdc1ia1l9u8w3rl5zwvsdz7rdgt6d7hhon0eb9krli2wwzckr0e14unyjsbxtv0d2au2wkuvlzwjkmjpo8vcx81yrq24irmm966bx36cktwm1fqffennpfq500394l5kiby4hw8u2rctxjq7s3z0cmhp0l8mkpdo8a3ie7u38twhp2bx4vh1i4u9d9v8y0x59vv2jwuw3c4vv9k9fcr322isiob7vd6v10vdgo7pcbw7engiiggxlgivr4ty4yrn10hxe1rqvt7hhiqt4ma7ze4lx9svc692ilshv2yhezcnpoin1w7i37isp504e85234hb2faffo66k1u2ey24nynptjw3yol7t6awzm1yoci8aj8bvuq86sfmfdrtbg34py9kmwpkoii6657pqgz29ekt8cop85whi01ixb4rkxb5zks2yepzivizi6gpwloujzzoxs452ivu8usisnqfytot1ttyk4q4yxmp4drzxnahsfn542al0zle3pjazibo5s2hdfhxq12a5ue5jvugga1stgup1bd1m8ar8ar5tqllyxgt6k8md1vvbigai6t730o5ezb6sacnbxw7zrgrquus47eubbb93bu61vhbp3bam2j8lsoevzg38yklfysl4jynlpwihbam45lkpc6yhh1a6gzkbjhnahv5b4sqykbgc4g7td564nek6fh8dun8pl0giptvozkxkmn5t7we6zph5a3hjfyvo0t8xkcby001kzds9xn5zxkoe82a0p28q0fgdnwdxlgpj6jpgijpn12ilaskbhotbtbs60o8b7fc4he5thylkin8gz8ync7itolm7ps2cm16zzo9d1jp9mmm8d2sv7hve8qndmx3cdvayg3rsbblgrhuzqgrcmvi8gd9mz2lqpc3ixdtsp9l2891753a6tpcv29kwu4y3xus0siwwebbwlr85kvc6fbgd6s6fa2dh2xtrjytls0svjndylek',
                filename: 'pe9nv2o1nvo4djtg7fezriqnk6facluhj94e98o45br7ojnblylx8m780v2gqg8mk0jww9erxd0s7298daged7z9lxlvdste686045nfft0vsnz0f3e87e2gyhswkwyxbhg58hrj9u0psxmz7my14q8mmyp24um7l30j3ssotirnka0jjhh4b6n76xg32mnfeic35o4n51rqd68b7gaqhvgjzv7kjn1oea3txucw7feh77rdid043zg0d33kgc5',
                url: 'bj03tbgq8w71x63tb2egnt16zr3fjjgg9p0gdcl1zs7h5ss0rn53wd85gdg9193rqqul2hcuao27i88e0238g6ql6l86qbz060cprrzn8cyrs14iaawfm9kwu2jpyrvs9v6feuzhv68rawvv1v4rpunpepslc3u0iqfai2ns0bl5aiwvpq8e4mld0ntouxkxle3y459eaig9oxx5rrcwx0unbfga47elj9oeazif04uqv5a03fff0wdppspa2x77bbmpe56oj0zxazag5ffd1qafliha3evvnchrn8a5khjfpus4e0gm6d7uz59q6m0vi107axog3kxq7cbq9fzv20nwpguf2p7z4bgmph8o3g30ulcq6qph9vcrcpmter1wqko8xz18eakmqiqse25iqill4kozd3s9o2trh5kcebxp8yxr6tetbmphocx7utc134a3alo3zu0n94up05qv6ekcsqkoa9akdfqxugwrp36g0ywxq98ce7pstgq6gxgzezjset91lbnsm8r4bggbmgdnicrpql061rw25ue9wwqhw4518iombmdbm7rrbqh6odzpdcj7sqeepseid1p910un5jg0m9021fyb8ymn58avua5leuqjzmppo1uo6alp7twsuk1tdv543z5zl6i8po6039s9cqajb4treq5roi819sqgaizxw2zurqzqhks364uikxb4gc5q8nop7oqsagtuwj9k6t2gqb11axb0s8b3gv8pvz4akcfx4trxf0fl9w11hylantafz03h1wo5fnv96z0kmwc90b8uuy0mvot8161aokgzzha88mq2pbv2cpj8t60dsvjh5ttq3iskxz4qij5pbdxj8ai26ybenqqhmt60y7cskltf512zda6oafo4ye5m1jtvopq2yxz0kojy8o5iga805wznd9wa1cm3n8373pjmdo49outgucka4z783veacsk80qwcv9wl25k0f55s94y5r7jc6mgsg81f9t3jdt7jwdy38cg9ha4x',
                mime: '20hqakpbtg18fbfg7t3jxunznsftpgbaok4svm0kaalh1z0gz8',
                extension: 'twfm4z33gzg1mpct9fq1w1ug8d5cmdl4uzhudo4ewl4ulqfoj7',
                size: 1634363213,
                width: 165443,
                height: 481711,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'zjgtbnljl5rp9gl90ag6c9ybgqsar552v9gvclz8tw5mfpyymj2f9fsbncr1il45qb3vxsl39gzhydw7pq8iqye80yb6eh3kia49jwpg9hc7hlujlz6vss8xc22kyzl21wweow5k3iskfny6yo14y1sd18z0shsgqgws5vwmpgl83t0gxz27ehrdmql052y51ua8toqygb9uxio7w2m66q4ajbe7u15wp4v4hg2co2zebz06vmo72pitcny6m6u',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: null,
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'hxdki0yx56nc3y7ua02g7vj43mfju6sz2g0p4ynz39eieeaijcg62enkncsgjo0rh96ibnmf61w',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 498249,
                alt: '3t680ygt1qt6scs8df6euoxyw70srin01sbzftzy6sefisfre2zvy03pqh054dqchhim763ab8ai4uin9jnesbhljuptyfk2fr08gmg1a4wsjuasvtb1burmn5vcm3p0hhkdxunuw8lzx1vo53myvj10720hk5wwkoj25qj1jf130t3qb8xbjss4e9oqsosvsfwx06eyn1a7w3ifuycz7rrxwybe8jt520u0a67mvivzt8yrtcw2c28sxdyqgdw',
                title: '88c33euxavt7ml5oepuly1x2oi2jv1ymp5uiik6o4vcg1nmeddp79cxidtm91p65ubwkjhypi1wbpzm0kz6u015spzvjvyp057vdq0vq9t052ovw3sm5su600rs3fpe6rm7qyjwcsjin6eee9pxrd3543gsmb9tzjpwy354cth31l42wglwy8sd7wtavgg0wvi5katr9kpzjxm04pyd1gp1g3hd26f0t42buziy7tjqx8fi4a4abig7ymnk50ty',
                description: 'Eos ipsam itaque praesentium assumenda ab sed. Amet eligendi rem ut. Sed veritatis modi dolores accusantium reiciendis sint omnis. Harum aspernatur ea similique atque incidunt.',
                excerpt: 'Molestiae aut ea deleniti et. Eveniet ipsum voluptatem voluptatem similique repellat saepe temporibus fugit. Ipsam eos ut dignissimos pariatur non iusto quam maiores. Quas doloribus est at delectus voluptate doloremque reprehenderit.',
                name: 'hahx8n39jxfg428pjr5w267a9a9g54l0xwel7peaht496kdfsdlicvjohyd8b2cr534swvkubauxe0qmsjtrpy08efviffqb11q68o8y9kn7xyqb6k30rhd0pnupfqi0bert6ol6e15ew1hrbusc4gk5w352k66lqxi5xrais3m984n77jkdhuuujxjocmnwrfjouwvxy3mgsnfo4xm9o2epr2al8e0f0xx4yjoxknbv40b14youdo9hezl38dg',
                pathname: 'in8twozj4z747gkzq6ynn674ecpf74lcr6rqsencku9hutflzg56s7g5bvsmpxhy7z82129x5xe0f059gb6ullgyp0jqbrf9yd5jcew7cyl4ey4bed0gqqpis8epruav93r9ok51aca9t3kbw8vdg5vh8v22yq3wdoh63u0exwosvn4o900e2gdqaj0pwiiv5ecqtg3g5k33tjrps2542f0p68rhg5bng0daycf0bfv82qfvsvj86zqzc0zd7kc2lvrf3e1rjorw7c0ad78qqzwb0gs663qet0in0kk1blvzw64zu1p650xcxzhckyd544sm7pd374qrx4s8o89dunxe6qpi6m8wub6ctde770s22bg2crmpsy2p2vjcbhkrqlv6y0us8bhlrls2y2po5ac2k6ror72ej9laigyn6py2760lqu7fkeu8zy7m5olqzx047l56ssatuxpzgwez92goh263mjmor03y5j1n9c6f62eqz4xooe4frgahg96c6aqdr662d5a5xz8follbhqtyp1ert6or33vsxl6c6rxavholr9bl0yrzt5h6kbels0l6xeg2u76js9xbg21oe2d5j17wtk1g526k5ks0lq9wwfejgo1j4r47eig94nm8f7hxevoox8o9comnzn2as7eqrx9yh6sxwr3ydc5kb0ru3dnjygwbqyohb0o9wej7tb78defenhr77011fl6msehmkg6u5deyybvd79bal28jb0qmyp8icauibwgctz11l6hb6uwb297w0bqq5c0jab9zkxum24pgqk7rz9dr83inen6hf36cr7i0ad8c5gu18gqf4osyud117ogmfkjpsdsf47lgfwaxy7kl5yu06pvcgb4x3xa05bvpxbucdwkgqwu7aqq5f50o4m3wapv17gchnxyfa498ta0vwrkawfd9ch3cedlqc667qhbo8osl7x47ddy5x91fm1g4sdi78tfqzjfza324g4gryj3zp75qtjugmg4mcdubeens0dbb',
                filename: 'jyi9phmazyzodhcy1s7dgpejxb5weiutaevt809vs0vormvedrpwobrq8z9izujs47mh517nv1b516yfe944171c6nmqelutf5q1uq3c6kw5cyvrxptg9hb4ufw1yy2jee6u7oqx66pkbt2a2mwlq1jdx3wf54vzyawbi4ko5cbpjm0lii3y2d6k47tldoesc48kbacbyfyfw26a47ufetfpdxal7lxeyjxhxxbsmgdcwkz8dbhvfjsy0qo1esu',
                url: 'oeptnjbzy1ptld2nbjqnfcke6bnfxcqqge5h8w0a9d3txj5b55eyw3csfwzw35jqmm8lcxvx7z58b6dtd2lezcgghjh1o06ugjgbtyzze1s71fw65k9fqj6t18eq9c4574kk5wpn4clzf5xbnxch6kqmdv8u9o7aw6pg2kzyyeny3c3dqjpilr46vcpvpnj4i89t0tm52r9wkct0ntvm7h4s6wpwd0s5s76bvtlsqfnrubh9n6uout1r8xcdudb7zwushrgqistovjl6km2q29axwgdco5sxy27oaitpcvvc8vcmbd206ape7racrg7vcw5hc8guxq73ljczs1dfgb5xlm8ik4xxlt4cfolawly15q4ma2dhlqc9oudvdwzy3ofsrr1ma5qukss1hm70awy2r56j0cz98ra4redjslint3epw220w2wl8t7zsbgpsi3yrde4e2dtgm0759ga2n4pabefspmo3cd8qgr8k1ssso8w1adzlpclbdysgfe0xdazaic9tzuragw0g1apwmeij4wu2kktzxb5dsis0w5lt4rqwxsz97pbmzu6y44uj06m77uw44ob7ly8ahqmvo12qr7vlf1alw0wsj2ip222hfm4pd7yqi2tprlv4ykyl4qaaeaqey3b7tj29vku1yyonsz5937gfv3202iye3876dud4hl5hygv0ecsx3aj39gxmcxl82ud8nkppkehasmiiozhd1f3gvdxae7nq1titwizakxr0i6qygn5j9evkgucbrbusiqdhpcj5ljzbjp87zsons9e83ytpfj2epryw73rq9q7k3s1jub2ep7lpu8tvkjai91i9q0vu3ra27hpy4jxhffdzsxuts1tesfnycxexbp4rvi6wx4bb7ozrklrflv3hrgh51oe3lhk7zwu9labgowfc1wm61yo1lcgstu78weyndbcw4ycs59g36fivqrgi5x0fu05n2jymxeerlzdhl0pizinunio508tar8byuvwr2pmowi3g9s1',
                mime: 'r9m02reibsaj3xhjvcra496nufi38lty38pqy51g9tdui7wdfr',
                extension: 'dz8lw89bmhctefxa6ptwsxw8yukxznjjiz4ne8wh86ud0gytx4',
                size: 9222979019,
                width: 663265,
                height: 408595,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '28s8yhqo5xlg591xf421yxagfqcx9ztwykfe90sqqb5uz5ravfaegu52c44r1trfwz46776jtghzlifrd36zhoegxzhym59krse9kd0i5hrp05e6ei55u82uc57wx59p2g9rtpdi5w6tobnh9yg3djkpi3yyruo53r7j0o3lejblnpgbzql1gm3dt5z9nm3e4ro2o6bj9svgr46epdaotisg9flb1b1gxuz78649dejxcqzr8r6yrr6svtwfh4t',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: null,
                attachableModel: 'yx0i0twe0a7974p26ue3twqr3xnou4zvs4rmih8rfabr2kyj1s8teqwdi5by77221p31swjvj31',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 290973,
                alt: 'jbt6bfsg3jbvlvocezdcwnrwsolx9jw5sjqt1bhuj6ej3690auf96wwcnbtkyrk84vkg4vb51ljqmjgjo4829jo81p19jw6u6ymdk1biusapwwc15bjyvv21icmzr7gd6kvzuwnrjiu2ob7jl4qldyamvj0z8m77easdbnc3j1oqimjmai8dl39mldwbb6zew7wawz3kx0z5j1t0cy6qmbzc6hl466ixwapm41qmygjqfhxi9s4dkd0q3boi85j',
                title: 'derdp79qtx1c1tcwuia6vx71j38uqz6ghi5vz34tflsze36inonbqtzkhje4jfdfcurpswvf3hj4y96fjhj0ho54gqvt9ag42udmfin56nwwsjw4w5kwvnqzxcq5hl8cby3gcmp7rpya82pdansmbu2rum1y4wo74tqluj44x64duuf8vg4n6am6r3qimsduyf62gpfh65gjlttc7namx0vaao8i66xwxczs6mza8hx1citze4ngdoivv8c7r7t',
                description: 'Quia quia et blanditiis expedita similique. Quasi dicta debitis. Error maxime est placeat nesciunt ut dolore quos officiis sit. Mollitia tempore non. Quae est ullam eveniet praesentium debitis enim doloribus dolorum similique. Ipsum voluptatem repudiandae ut quis.',
                excerpt: 'Ex neque vel ut omnis et aliquid quis consequatur voluptates. Ipsum est reprehenderit non facilis magni quia porro. Necessitatibus minus nemo at corporis maiores eligendi odit est sint. Temporibus repellendus quo veniam amet. Dolor et eligendi aperiam omnis inventore et ut qui ab.',
                name: 'aapttm45pqz415fd0el65r4bx04h7fslx1k9yqzrbuwerotbl5nrzm1sw392mznj97ezlxpa0hfkz0g15lytgl3i21insj6usrasgqaqgybdv2a9xr8miu6ng60azxguaodjoe7fevadui4aizkuepcmywpv6em525lw6jshni63jt9w4nx8oomv4w09vljkh916xy3k9y2c86vo2qomlv5m1oi0beewt2o8qyvov2djs8x8588e1gzqwmgyz0h',
                pathname: '6ajb12ojjfjhlo3zgz46gsi6td9b8k9jw7n057gnxrtkvdzhebyzt1e2l9h5zl4jznrn3x3buholqj96iaugo68re27a86tufy8ev31jtwd214fsfc8alkkajwdfx95ntf750h3rzke2ap79li1dhpwliupvwmizx3fcprs7sp9fuk8m098kxyjh7i01saq8odu6iwbarhv1cr4x80rwmqttsc6r0tbp058q9titqrl0bvqkif63dn0u6ai8oefa1ipkwlaeq3bklj0bjngzuc3rlpj57sps0sfyx4tigj1iriuhkbri672n8jsgshjsuibxqdukxctkmkzt4zg6b1n1tb3krtvxyozi463zdbrq3xjfztp3q3t5syn6vsqr7m7b2buyif98b2jko3nxrvzcqgt6wt6unv3gxi7yyj8qdqo1b4stzvxqfqyssrxtpktz2j6217p5ywbkkmyhizf05k1s5qocot4dhkzw4lb4bwbg3d018g342h9ve8dw216vqjf6lfxahus0nnhckqdi1y3kycmcy4azgp3g5m2mv74w7hy7qqbkznohm236yjw3o57iuabbiliutwv7suspgo0fy7hfdyo5y0649i2rjhiwqr1efsfy43vt69de8k4iyx871twaiimi121kdvj9i66z9nq8po32d4rsc5j2cpzhrzwnq7fau4dcysqctnvr2k8jmb6xtqg8582esgb55sklapxfo5h2ia1oy807tk6nh3rnuq32lrfijued17af6w28o141wsaw5j6xdqy6pz9vx81lb43b1rvwl2cxbkgj6f6v5co43kk49lxwthqqx1g11cag9a4uf3h0ch4ibmdefjtp0efojj34s6vdb7g77aqy6x2tthmur409md2j66a0bblq94z071xmmbkoyxcc27qo1l63zvumpn8w72gzabakwd1zjz027ovt71bp3fjk9fxmgxn9hcvzi1i2mnt7zvgww5pcjj3zi3tvfbw5xhyc7sa54va6i9a0',
                filename: 'bl267dnokn3kk8vrquv3hjl5srpxn1e4rzpvh5a0vpqdtlvx2uiubslwbq64vxoh1vuh32d2yaqyqeudzkijn0msiz6nn5k9xd9ni5xdre6b9jrxuyafexdl9wgr0t8ytfg1hym1lbyf5udso0wq8v2j0wpimrqxop5khcwefvn22i0qut8sq5hinuxq7wwkp1e1dbf9jpua6ihlp25vqlubu79agttds6iicj8t24v57vu7020adr0dx1q9mwj',
                url: '8ao1hoo49zrniz9r5tqdndifdu5sksjag57fl38bhca9234clut26ehn84udyuwz28umcpwfb1pac8imzl5fzbs9ftlw3d323q784rxdvp7atkuzqi1fgpf1f56xf12qucjg4pvz0ogow50vmmkn5zsavej74y2k3bz2jjtzurzrk5z91lrifqcwuf6mvt36dvnolpn1oh6h4ce7m9pmtet171afaw5gmxwvf8ibotd34faabdluctyjkepaahyl9xoc2coyv2y5z4lpj1uge8oni148b87u65otbny9xekidhh6zqq83kzc1luetwamxv65naucca4zti3gd6na358f7jgyeiiykcubk52z4so8a2ybwml0kk38blz89r4jhz5mjhne6m65cfiolc9ut2fc4q47elf0zfp6gm81hhoegeetthc1nehekbwgoey8cycu8orllvzlcfeqe4xyqgxwoumzupu8hv4yzpspstxx8ws6zks6su6by004su77a48q2t4goldvkg7e23xyn5u5ja1kkx07ngl6xbruglsrasj2472p1eh2baqbb5xyabrsq8iuert8pm3hvbmsey372684gfo8n7lcm99a1k6tktt8i371fxpl1x21xa8n7i7z4tv9qzvf0shvmokpu9w2ubegqjypp7cjtyim22ya1wa9rvxdkvipy31wzbc1f5xlcfn3d55i4rbqgteuqv8dzdq5kgstwtv1nba6an5aa8g3m0o6lp1aotzylwmdfq0gnkb0i5wnd2e0ma8pjdmdodmpkwbyb4n45xrg7f4r5wodqvm15iald96g75tmpw7tb23ldxl501zvuuty2ady5qavg3dj8lnui2o8f6bpvisa99ip8hd8azqtfbtb4d76m6ma3mx4ijn08d40xw0tbc8l2lz4cb15yq5zt3y9u9psr187tgae1ooqwk8m6vftyeqrxnn1oropba5ysbxj9zz2jpt23bvduxsnmun94vljuhe3yg4eoyk3nep4',
                mime: '0qxfu3zlqbyo7z9wb6sswlyvlhcj7wfb66b9eddhhehdk7hmv9',
                extension: 'f6p4p472ezlzy146m6ckk54w9efbtyh95w9lixins8wwmbv4ij',
                size: 9260737645,
                width: 541423,
                height: 719976,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '7mgwiorpo6chlo1gu9q8g0sx3fmbyseo7nyz2yuvq81vk2bfbth9p5jfg7t4t0sce6d5idneqaj09m4vn7vube9fsv3ni3syaepqxiyhayuv1po2w0x607fltpc1m956bkst367g8p0ugm16brwks6bsabjnsaydfyfujb1n1ngv0uxld0mt27niq9ny0anpn37c2jhbnegy4htjflstegaqckshkrcw2bpu2dzd212kgg0vfog3wb9ku9lx2cv',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: null,
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 814974,
                alt: 'j238ct1hm8nz69u22n42vgt0s3xkag5t432wifeqscio8ls8f10a5kkst9v6ce31xwvvhyc56sws9mo1mlcvibmovxgh6p7vul5csi4ztpi0wj4mg79qe529cwbxoo0ku0gjegnn18htumi9trdujdr5hfqyjvvo0dx5v70rviwfy4gpdwvon7kmk015qr9qymll0rwualyex4zjhqnocbvu8p906y8ttl3vj4f33xgawb5xu04c7mxlagku21o',
                title: 'ezelialt6bm8cd49e36nbgvexw104vdv2dcen4re8ap459dkb1qilv301awrlcpf36u9jz72fvgut351ldqsqwd89f5fwwk4ooc7gi0j1b7yh45oge7tzukw812ec8o496epc7ltiq1gs3detkz7twp3zv5q3r306vdqn3ps2f3qi0m94516b7081d8agwz1yi1f1e4gsi4i5vuo9lkfrsiisz0zewsvbjmjxxoxsj20ybknhyc8ds39dfzzxgt',
                description: 'Omnis et et aliquid repellendus. Ut eveniet distinctio et fugit illo sapiente accusamus rerum nisi. Id non odit. Quia iure laboriosam ullam.',
                excerpt: 'Doloremque non ad veritatis quibusdam sunt. Quisquam aut omnis voluptas esse. Placeat quisquam amet. Quis quam voluptas et autem enim. Eaque blanditiis ut necessitatibus totam voluptatem rerum nemo quia.',
                name: 'zcj9ro82670xsl8wzygkezex9hutjh1o46ngcqaioe06yuilmkr8385vtsqd14y4sqmd8138cn5icw1m8kqfkhajkdgpfo8d73n5ttv9eh0qf1flvq47ny40tw978y196uc8uin6jj43dpqtvpwnx14xxm17deuacn1meb5al43tm5yzlcx7tbogfi41jplxknpr7j7j165kjn4qrbs9y0otgnw5fci7uacpb6z5i5rdvd777zg0ph3u897f4fp',
                pathname: 'bck0pwtsp68zwgzdva8pmxuur3iqyums3ckiwd4kyfw9k118trt0an7n46l6kqhpa7cft5jlqx0nvub9wekisgt7yhe4qc5omgziw1ni9nthw6e4tqnnuok86tcmv0w1r8giydkdyk4caf41pxfvmi98adc3i5cmoov189jabvditqpw0qxt846tjkowm7xvzddipl6csd443p6re1oq014puih8syij0dugxqssrv3rq7grijvimecilpgm8nfz17ypyzj2wbsij0gaycnbe7jvp3opnvcv2hkbng2gxr8825yoayxorhva68inj88gty44uofj47xfq1036oro7c6rbijwb5tuq38aiieyiz07vf56pbvg0fv5ngw60e62x05ffhgcxve8ir7i9u2t000rtw3s1wdr7p88bxseu9k5zfngsolz04mwcx3vdsj5kp8daqr9qeyfvk9dvterzmfvz6cbk0a9z6cvucax1v9pcw4gd15p31kh3apnpkmrljyatnlvr6jzb196tqwissq83wfps8ly37gm6602xyxfvaakycxrocjk9ab6lg1u5o8lqtylzjuet73rg5abbag7bog9n3ee1sfq0gx9tptstxek0c5c7p1rwc916wrojhzryetgd58lduc9k9oqf20awk989bjc3roodakckubaaot45cghll27zssoqp9sklrlgb46hflmv7b46o72nkwp2jimrus6dx8soadspu2wlb6butw3wcoou7evs4a2eh9r969z10j443359uid411bn3mn8xkuabi1fdrgqmdl5fpt6qjvmqd75p6jcfbu3t0lb3dz8fnnfdqlgah6ab5wktwarawwv4n7bz67y3v01pgu2hhrj86pbrqkk8sjwwmcfbd5p3iyt1xq2cenm4pixxrhtbgirqumx8si4rtxk528zmfsmcpmuz1mkoyv2ekzu3fh0d8kks799yu63vyworaa07d882sb04hij1eroqty0a49m6z8gmwpg1wq',
                filename: 'fndlyiuvfxkru5xab35bqzngobbai0lkuvtfhg1hdzgbqka9s4negky2kwl3h9t2lmh0qj91612l46eqwnxr44u7vtalgqvgomwc4lfq0m8z367f6ncxv8tlrafoaly7tuzhd7h29jhfvgrn566rswyneohsyeq3uevjkyzou1sbf8dt71yqshpvkgokamhsv4g4tv8d8cnnlhwoatfg0j70e7xeepfyno8oogfd6c4z8v3bp6fazmksaonqqit',
                url: 'vcs9pl804q9ii9d55mcf7arxz7a3pro5nkz5wetufmgwjpyuhr4hmz13x2dqxgeeuejql1r4qe3wpcx1msinod8a2cvtpkwnifrmssyj2xstb7fi0vid1m30vkdc8tysdr79ifsakigk6xbxj8qo0807okuo63vf7h1kdkqg3uryldnyx8mz4sd75qmj8hzrrv5xlklja02ns4ns334uxp382u8gwd5b48yqvhizsqdn6iw1h219184hmcmcxjd7hu0mztpf9l6qm388o05b6nseqqoz4sc712mba2eq05fgxwqorjt89kjg0ip07l31auwh7uz0qvyjzosxgmx8wxb3r1ov70g2xjkdxq4b3iumps1n76c7eauoq054pal91fqvzukbu6lb6w84q57pg2q90cxiz73kjuxt8xmxs5mj310qfykd3schbwzy2wujdsriin8rvyeab9bziv4d226njizaov69mvmob4606l0z0sskbyhh88l66nl7slta8ytyvh3w9v02k1uojes7qbaswfiwzocfvrv5qnxtw9tbc1yvdyp1iirf1r5ccr945gnrlxkrtbv8ws975zxxui2nm6sea6a105pd32auhvn8976p4ayryxyx0u1yrqciqeuj8iwihl84wobwkj8icmipenodj77rxlkidovrcr1xhldqaxsyw4nbh2e62gwwjlmrerrccchk0dql9h9rftmi367f9yi6lmhzpdbclaqq5blscbxwrqg03jvanamvykmhg9lh9aswk174nbcop4b8ozjp3sp74un300839ugv26ev5f21t4og8wzncfhbdpamsnw1wwewok83ikzs8ipp30h9tjp0isu1xh1a5jx87if9qiully0rrjxldcdgsg4cmdgl1cbkhfjmj2iounelnhuktfuumkslixwg957ioxh70xcqnnagmwhmmsqz87x0zvv7gyaohxoe7malfs6pzmx5byomkiyhhk6s2j2etria91ppfhco8t8sxdx5',
                mime: '26u6lakoppih5xem1l3nw7wlw72kof7uod71qx4k0edak4n6rg',
                extension: 'xfed0asyv3cps1vk1k8lzotqdumg7ytdcg2ge4517wmqxu4mw8',
                size: 9644551041,
                width: 784849,
                height: 669080,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'nn9e7rw39bopxj8wdc2jq5n6oo0mpbblfgraybe3wyjjvtg4yrivjj0gx7h5d25ssno2br9udtatpjfsu2bsroiczlbt9zpyy15poy7ozz19ljf69r5ywlqz9nwao4qnrasgvc6q2afe3jv7qcftnklt1hbuj477wv5fbudztei4mm3kf2ko6w7lr4dtz2uegqy9886vk3zsjcp8bzboj5aqxrkhf43vo2kamqty1rrph6fna8yljj1noyjytd7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '6b1ptpu9s4mj2cjtrx3l7n8zn4boujfyaglkrvmdf48ct1y24zxxpa1uvu2a618ds3fud06frxp',
                attachableId: null,
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 963207,
                alt: 'dy27vy9ey4qa8c35fit3pm2qaqv6wxlqgeqenhidbtv1kudqm2o68kwyco6frf40tx6o6pl56zw6tnmtcaxsonjqk100ws7y8gn1oy3sweavk9yahutphnffgkv1nr1xmsqbma7v9hvv7k6rlmixmjf9nqq9jm708bm75rdw617mwjr41mdvy847jdlmpnb6ypq93ct7jnafpqo16jx6pwf71o59yjfovyin8vf4rtuwa5ujy1e6qpomnrpgslb',
                title: 'kj31bs3rltpqigxzhtt7n9jqniy32d4mi0vzg3fsye51pwnjex1mo94ajr2pg32aake84y9vq66ong3zdtdosxk5u811zsc523sxfxojx7c49824lw4zb9oyeamnx5tmqd9229sdnogjirn7khc3yzk0kllmtk9ma6vx5klg13rr2gpnnvmv4bdgrqvdpbzl8zjtko55d1ya0lf6rsg2i1h0kqedfjr716arsdn1yqq5j12mpq6byedsmuqwdnl',
                description: 'Ut non assumenda et totam in pariatur dolor quod autem. Iste fuga est nobis consectetur sint eaque. Repellat dignissimos numquam est non quibusdam non. Ullam explicabo et nesciunt.',
                excerpt: 'Soluta recusandae voluptates. Quo explicabo sed explicabo voluptatem corporis. Est a sunt repellendus molestiae. Dolorum expedita id qui officiis ipsam deserunt. Quia repudiandae eum excepturi ipsam. Ab sed ut molestiae aut velit quis et ipsa cum.',
                name: 'hvxll17w08pcno4seas7xchxtg011b45yjnewbh7w9f6my0n0b19id2c6mzp75v4m8byvowuppvwu97egaloj3qklvt44qcvxtlqo9zvnte79ghdrjz9k0mutplrdiyvsjtp4ra3rfz8mcsvkajm6h0c8pxcsnvza78w9yl4ii30vwoewxfcohg5x8uyu0e5x99uvppc2cn4kedjif3ay97bghequ0di65wk85g7fnxgp20sir4kr4byelhhugj',
                pathname: '9c5sydmmh9fg23kjs1q7oorb7vh5y7s4sg4xgtto8gbj774e7s308pd86g83xnfzi99pz7540pq4ybw71a6kgvhul64s28r54v0c9s03wfeplo8gbyehfybp491w06wchb6qf51n0lvx58uky98fxllfo09x9v7nucju43zd1htnvr8m59o6avtpf3ozhagffhz5k4cmhgr83l4dwehhqk0ak79hpvgl4mnb8n9drcli7jaywvshi9mdggmg6xj73hzd5mom5nggyvgmugjj0ue217c7kl363ss39am23mslnqo99dx61fvachorziw8gaj4lnfd5au6qxwr7qkvvfaz5yjqdah6ic4241mjys24e3j8vfii5wz1x2bgndzg7nel7q1eacgdlzk5qrmaa2ampvygsd8arrazgf7qbfomsejepeptb2pnneqvjcq0snaumo6xnlblfzq5jyv5swjsoalksvmj5fu4d36lv6ekdjzua5q2o728sl36wo37hbw0ruvu3fbij1724zdom5v9h3ipfp681hnmpo926u6ks5zx9d4wt9s4vllnzy6gcxygn1zgqblj8i52rgd9h5py8z7hgvuy3ojac1jl9xwf1zg0v3yn8kwfhgbc67ndfmja7kzdf4s8uphqg6y70px42senqc4ly69qho2kxmczzn9vl0vftwfubker8vowsqn99xy39evrw4tcoc9sqi01jwqj7r3slvgkdj0flaovh9msy49e6gawekgefpy4zir6yd55qofrzetcgwm7h9zxd06a8yvjbx6qivdwpkpui5g41z6pwgbo0ihh60u8i2yflq6p0jzv9v99na98uk2gwaj5t7se1qhwsciuvrsl47msh625dg8xch95oras3ojfz2wzoomjueuxk18x5f0pu35ngelkws2i37oxatx3nf7oqtmnnu68onvlszemwxxl6wvqpjjnqc5954mr6wlam71xk0udh7jguo3xh10gfh947jrarq7iwy0sp4yt',
                filename: 'lawjhiys2zam4iuh7rysg03sugvqevcxj3nn6581obds9gb8p1om338va505n04dg0xo5ohzebn56ivu9faoxazu5r7bg14imtnrdccb8d2heqkpovhwmsz1q6khpxsxiv676pc4hspyvyagqpfivsdo1rema0dyggs8naxsy0icktrefmaih4fk43wfluwd43hdqot8h4itxzbpww4xqhmnez7qz4fc85slxbnahwbrhyg4rhkhlk46cxtat7k',
                url: 'yr09m9ouwfcm72cdr6ltv0vb7pskykpxd5rljuex2pbwlsykaxepffm130q9cis5tquq8lliv4sxwo86b0mqkyknxax70bpbh2esxecoh2pfp256wtycpk4oi4rky68im4qpcbpsukood1kmkgcg7zqm7vy0sapd7d5nbxjuutogkz8aqggl7kmhok0brg4b7gpjfwetcnxw3piso40i3qhlsfvahbjjnfa12f12fw6uj0lphkoa89wb9pog7fi17n834vha9dl1pzfhz69867wtwyz0zln7thulwmg61t63qvyk51tl4ckgawdjitg4avqwcrq3028bmydombp2qgu3yp8x0l8cx4d6om0zfylcl1uj0046qq7qtoxlpds83z11513bn685ls3y45tct5g99h90aggbfoos63uauov5l2f7d68x3a1934wt9jpygdzxeud0zfpl78722ukn6v20xnnd6et5j5fffz2r51f2a8000pj4kf2xwg4hyjlt63vwaof7nuagjq2wgmocdj9yk0zwxqlp0oz2vli4ai8ah9sblxlafp3cuwsjnvjlu99jvkt6s2u9wu42mojgndmwxffc27eg35good10tsmrhpsqbrcrmigid1ejh3qxelzr0jr5jbv6hsbwwj382pdz66i2sdxblbh3bmcul90s1i500a6oxjqfnydi004lm6k7tl1nr12cnxxcfqck6erdxwxfyve9k7jf4jktqduq1h21rm0v4mbfucp17mg0hxv0a14m3suip3g71cmhom0vg7eq4tzqjtrp8p18tbip958dn80ag8narnbtvlazirsk1y05mma1rnkltqol1fbzt27jf0dzg5p2fxhzpjtzqobqtqw0rha3zp0crqw9re3rdfas914n6ukxrcnkkojsc6sko6c311mr8kwmi3vblykobfhr32wvh0i2lgekxdkhaz0ffjsq423e0rbza33rvgca64dip0xdgkr6hwruq60o9xs8pzkoy3wnlrnv',
                mime: 'r645vzbzhmu4mtgs2oqldstjikg74tmn0fj3lsjuu5spmkolzj',
                extension: 'nebiwft7z8thuob2dod9wrs8sp26r8l2icilcde69wmzzc2u4t',
                size: 6552358042,
                width: 167490,
                height: 171876,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'e5qd4lzdih24amw61t3mm6g2expqgtk8gk6xc16c1h04w4fdubpusxbuk1swcbdy08w77tmqpt9idc0q1gqaazlyl0zylyko9vs4e3oapqpl1z5o8n22nw51bms6heqi8a7v69ddt85ck5acb6i30xqox3o4csguuzlw8ua068jzvv2130a7cndy5cgxxp4wsquqp9vzuocoemddn3nxeviw7ay1frp3xsp5ubof4rv9rl5hnjylkiv4hgcvroz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'zehhqgprfglwrc2fq5yvt5hmr1fzm4x7wh3xqxybwp9eonnwed8758gp2wo597bvuw0vb3p9tkf',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 211693,
                alt: '8kxzg7bdxui0vy85yywz4t9mmvvdctuhhsb19wtpunfywwp7pcfsz2goxpcgp63glokn8fenaji0pb82q2viammgixuowv83c5wzlki6g8tx6bm92qtlkegs4zn6ky30kecc9ltz2xw9bkvdiibpu05x7kher9wn0s5vb0f2a5fof6c6cbazq8cwzf4uiee655y3uy4kqboq3qao3daywcdwkz2avj8s94bxnhfvvw71b9cgypxeu802hh7mbjq',
                title: 'o4hq2q679ilhs122y2tzlc1ww0k26lh0uui4iuhoe8w564gbr11pf4zf44v60opmc5vc136berv7jgbe7hpr6cscmktngxzfu7q624hd25ij9a102icim6uc576hsal4clxf4a71a5hwlvmjzqqw8rq1sdopzbnn2b10f47rqwa9fp9hi6duzpnlyi79i0uizpwrl2vnl3pvokmq52829ra72aju9x3smodh7xvx8z7c88j47stw52uhbd0kj88',
                description: 'Provident voluptas rerum delectus perspiciatis in ducimus qui possimus maxime. Eum nisi explicabo voluptatem mollitia cupiditate. Corporis iste dolor provident est nobis non. Sed consectetur eos eos eum qui cumque. Optio quos itaque distinctio quia magnam aut accusantium qui rerum.',
                excerpt: 'Vero velit sequi qui ut sit maiores ducimus veniam quod. In eius eius labore. Ducimus amet voluptates qui corrupti repellendus et tempora recusandae cumque. Temporibus est molestiae architecto quod. Ducimus qui asperiores libero officia.',
                name: null,
                pathname: 'rkjm741opi8ss0501ch019yiri3qcopi4fo9ufhtct87wey67glhoc4c2jxsep9z5h5rwhv8nfkqsfv8prengrn0shhqn9ue1nn3kijn4mskyjthb3l0jkh992sag8bagzzwaldo00dldyy736hnoe02sh4a5gy1kym21867f5ydxka4km9ucs8za2259ctef4g46l410iofusykplbyjgnycdfm9gm59ieucwdnaykzd0t2f5hwvxex6c378xrbtd9ormzgzpq0k8utroumawfjva6syjcyoumd146diynad58ocgb18vjbe6rjulrcva7m4oetw599d6458qc9eaduz0hb5tar3jn7fg5azuec3r2upu2j61w5l3u4ppgoq4zte4slc7x5rwhp36frsqxrb71477zd4obaopyh7pws53sokiz5bhky75ph0d3gniakshrkao0fre4k4gmfj2y27ieo6wkrrnp3xa3n9x3old0vdhkmtzdum8vntw1s3gj4p5thtgbhzr3o7r6tvid8swt402k1xmfnvttr5lyicn1o4xc3z1yqzbnff9yntu56ke6s7h87ablf4twwr2uavu69z5ayhq3i1hfntpvsw532l8humfid4e2b6kkrlp8656lh1z6lil338cvyyapgxi7dinno67lpxlrbz4azvo4walz8jdq6eomjqhgkm4jnj6smkd6ygoglfjbrt44ptqa2qui3bk1eptwndcp10xpdo1kdww6erajt26nxydi4pnfnz9wphr1ojggiooch115litkgtuivshwp96w1buw9hrfyokdbjvg4menswqeqkpcuf4lyw3psqnyfzli8g6coyy0us6u6jer8tahfla2dinb8s6l0eg9q0gonbabru5nd52ohepfdvr4lrm34vk5jjk3642m25h10o34cgbseh8uy3gxb56srbfe64gkaph3332qbk8wvwbvy2mvn5xzpb5ka362hoq36mhmtiurqq3e5q1qm0c5gwsee',
                filename: '5atukxr8j0ndy6xualfqjuoijvh5sgapf6zeurva3t5fmcwtpe5bqkhgpol59ag4j85is1gmfs5hei8uqrtpqm2hu9cdjlyjpmdtoqh5qn44r22ddm2en7f4pj4qancohzgq9sfrb9srl1xak1b3zgm51438b7bgnh9t5hpg2cep0icuxkkhlg04wg8kir4c410f73a5lvp25tuqfi48x71opqjpvnl2t40nh0flolj6rv87zwxhrxeotmf2qk4',
                url: 'equwuakzkvaszs1hegfqx93i6c83ggj4cqb64jf81tasss9drxf610jgn64agz901frhcfz2tg4hqv2b32itrs975n90g3behkulk8oixvq6lf5w39lpgn77vryldcj6jsdpvua1hayf0jcv3902qxmmxoyw5ofjkaba8v9r530s1ofi9slp1656bipzi843nf6drziavp5bcd3m7zdkwofmr7qqfbdxn85n7o331aggnga50z0q3kouyh3t2eq95t70idxrzyslz7o8pe2sjwad8xun3ke3l0uaf2otfsf3laeauhjfh6dsjrwb8favipyhx1mmj010zgxqplj1se7er1tn2nheow5p2u1lfuygrkjqe8yrc5evt2yy2cus0h2w34lbncf7yw3acr17t7tr3nad9t86qmsxt3yqsh25u3kgvhz6zdvwox0789sn3o1dl8l1lk9vlvp68gwhvy8vmyhhskn8v1ed9iabz0cg3s7aj3flal577qtmg165ugvsoxh0k59ozgplnes58kq4t795vi5x7d0yiub6bsgxb1snch94feeqeskcj7uevs8bjvyl4rl0httippqr0dcmey4cb34i3s68kkq7zmuopru4k83kf6x9arkeuiqwdo51syn0g6z4ckef48mqgz6z6auy7lo5bu1wnhus0vacd970txdtcx581tcg9pivtyl0lcebzzb97r5u1w99zvxuclh1oocii1k8a6999spoan2ixnr21s55dmu8led5xpj7n1a0sght77x3fsh79xvmko7kjnvai152bvfa3c4q0i3btrt93ksam9zr4pkn7bmx5j3tq7gttrq5mj8c6u3hubyzyue5bqtln40a95x4gciwcsk7q42v97huzakmcjtqn4765z6fsmw4wxl87yt5lt97766n64sr1es8navdmx0yqab6gberg5ilf4b9tnzqt8ovzmbn50t2bhv5xvyr3t4cl72xhknlp2xyxg8o58cpo5p9vta6c2lg3cx0',
                mime: '4enjqwxfsbke50l1k3b3fy807z10qf61za6hm1bq4in9jyzun3',
                extension: 'p3dvrizzgfjbmikvti31pv9jahjnmxsrm1i2l32j1nubpbxw03',
                size: 2561011481,
                width: 132017,
                height: 583387,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'lf5u4tk3ig9fv3gv3p9o1debtdahr74tywika2cbrnumo17u4bx7yp33lzhv8pz5fi9uvzmoc4ynvkjaovbx46psnwelrff4wdeoawfwy8sejcjwvzmm38nif1thxl2q5bc2xd0ugwj5216esnxokau6efpgu5b1mczaee2fd41lo89g1ajrnht4vcdcnf03wv27eawfb02kajyw5hq7ew1zdazbp0c5uftplvp9hv943a370b1fjod4xojgc21',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'o8nkrxj4o76qqk2hvxbps6xz1xk4dbzocbs1ylqmjzt7h0f3d6sthw8spg1xv39a05uritshast',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 786794,
                alt: '47wrnexgq9vfwww11t65bzuvjy7occ56zxkkgz6l3qnp1dl7ojjzp0o6i4rpjieq5aauxtcezxvoe6yrpfle96r8cpi88uzuqpze6inz4miwxxz0kun9y28ivc492aum9tt0jir5vbepgoia77tsciolcyxuusdlnhytfmhdmungmi53ej74suovef8o6ahnbg7dm54mjlfsnaje5bzevhv99npp2dxrb3kjq0ipc8d0zvsybogtpczgnd7sum3',
                title: 'b6tqfn69tmrsmo1wj4n9p39vh3y1svl1o4rgdtzd0qjpn19xdx3395oenzxfbbsvl1s21mrlrtj0cbi95bfggum7q9iguxumojzzf2dng0v4mtmsu7ltlwmeia0gy6bgjgh3ipq3lj8rdp19z1fx1nl9i89bw6phslnvkgtnw8d6fy4n1t9jy1jpgbtywzccm2kb6k3il32re9f3cseec4012j6ivj7ziy4hbwx6ucfcp91ukfeqw86kiyuifgj',
                description: 'Explicabo quo maxime quibusdam non. Ipsam neque ab cupiditate omnis nisi dolor quae. Veniam velit aliquam praesentium possimus. Quidem voluptas nihil maiores rem ut autem.',
                excerpt: 'Dolorem adipisci et. Nostrum perspiciatis iste assumenda. Similique quis animi. Fugiat quam quos molestias quas officiis doloremque eaque ut. Totam minus nam temporibus ea sequi doloremque vel et.',
                name: 'f7kbvpkhm44r5i6zujihnilrmt2bnx08g56wy0g0co1cb16qyun3ls06rqm1wb3uoto3dmfkdb5y36vjdt29gu6mulsjsos7e648947mlkj7kus5u8193e04s542n7ld1mnly52k65or36defnk67f6d40790vxhstdzb5nzev9163x4zyauxbgct0w7ao6zdilhcxfmhtlhpnjz39x8plr1gv6w46pqbayagk4i5ekfpikl568dzksaf1s91kc',
                pathname: null,
                filename: '6w05rj9b5ybxffukqdvcguyvz1sxhk2n0emnw15332qial4qax3xmf3ui05vxypcpz1q9a38euxwl2gx8o1fap5gp4dvfu8f87eymv9kcl1xhklmc1oqe9kr02ffa4hdwoa6vlnvc36pahxcyanrwjatydf0gfcvurb9rd7oj67rpsj7oywe9ckijaim3pi0gixx9dtnden30bihj07o0h2wqtxewghd3ua97osy36woutjzv530f465u2xa6c9',
                url: 'qugukhw4uuszc7nryovk2aw93k1myj501neycecj3om0q4ztt4qqnccw48thjlm9zi17oi0ojkkqwovivilhm64sx2uw59y2wgsvwq8qndx0vx2cgy7l3jdfzlz2pzrzoi48azas80z1a8mwucopgaw27qa3wpvg602p1mavo23dk8qndyfb2u0o3yd0oi7pxr72jjs29cm86bbm1suiq94nocwoqqrprn2bda0fibsmkm14rdqj6uybw1x9f4peqbe0ujcj9mjyh3sxwp5cfi7s4l7waktlqz1lrkd7l5i3i8oqcg2arxss4lkrkzrj4o4n2nsuava6wwwunlfdnjegcbegz9dsmt7p8lcogwi6gtndmls91qps7vnzq8zzu81gt7l9vnqr2ua1d82vam3v9afgl92o34b576dq4imcvyyahndaw7p5zyu1z84czpjov9ladtrt2uqlxrl8l9i9flrwc58ydgcy75xw0o4p6wut15ygmfrysdz0azge2otfarhu2b8yw1np8pfmspx2gx60wk36y05aseh64hi0tkcg1b8t3b6vcug3okxiy1nvt6vm8e7gzpmb7wttbgyeh7th7f2xjrdwcpp4fc3ckww8qkc3hmrpgpeyw9hrgh88xm5rmzj39glbommm4qnxoazfwfpzoeatektbcfyg0uzzt0kopixluptfiv5sjyis5i74ar9eecns16bhk7sgwvvjwldyerhga3rmy1nv19psym86wmiy6a5a29seqzjzxegdkum7ypolf4f5zelgwmu9sgu7y2nv9h3bnae77pm0plsypl6cbrcbpbxezfrkitj4ketza667ilymke2j0ifm94ykzq63imebg1s25wqf6b9ppwzrrs4aso58w70f2f375mcdgdhdrexabfvuok5z4esp07e7bqn3j9pi0ubg7afo5fqsft7lvwi71q3iszo4s7tgz69tq34x9tt63j7kvfhmosffr9uueraieirwhki5keprt1x958xd',
                mime: '99za3bi5pacxu1ksmlbmjlbd9rbxwh22zcovxcej32flien7u5',
                extension: 'h9tb5iqjdmfghsg2j43ralfzht58r0miqpxog4guww9gpzdo1f',
                size: 5206944246,
                width: 345299,
                height: 910605,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'yj4gkarpf0qhyhhhnb59t7h51m9spbvxbcbelyovvdkzpfqbt2gpwasd3djjc4x9t2q3a7c4dwxtc5tu0x4ibxxtct1hh6e9l39cilp2ppcmm6rgi08u6xt83y5et6mtphyibcrsw6dg3h1opdzl5mhkuuqkovatchyukrdk7t5v5d7esfir1ly56m4zsj49oh8jlgdjndzcwrwyi76i74olibqwz2ibu2dqq0ya0uhblnfd9t2408ho9pqi8mu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '6xms75cwdov3ohm64e1xig7fkpgsjv2nwdjwqmha1vljm5e6tsjibx8bxsttzhjycf856qqygtz',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 579637,
                alt: 'hd9i90pbdxgh89gy12t5ocsxlo7t4rvgjs4h2e3zt5xc4vx9elsac71tymjjn9emf00pu8cnus19hah1izgkskyuoifu4pnf1s1tilj15kwwh8opek3l9ht7sgaj20e7kpohjzmu7jjtz1s2ixsrf03olq1edq8ynw8jhbgom8444s0iyjzf6947fpxloj90pq1xxtk31wjfp2vxxuwymlisy9a2ls3aikxgvc7blsr9ldooo5qy5ezthm0s21o',
                title: 'cpdof1nf4nmxfsw59irea59v2fsxo9rkymrzk956o5bewdcq2b1vodfthb1gqan3ai64eyqksme27o6rd4toy5zk1hdfy17zgxrxij7nqjq4p47h6t1bgjb6qi9ldg6r7h93vtmaw3affz87p5midqk6a15o2eag021bd2bcorjlygcm608kyjfnnmz68njm9ok2pk17cbxjygejxjxhlzsu24t970lacbji57ix4kkefwrlxi44ggjl8m1zzxr',
                description: 'Non aperiam atque pariatur. In tempore dolore mollitia quia sequi quam quo sit. Aliquid sit odio voluptatum iusto quae aut doloremque voluptas. Eaque nostrum pariatur vitae autem odio tempore vel ea magnam. Voluptas et dolor labore quis rerum nesciunt ipsum illo eaque.',
                excerpt: 'Qui laboriosam cumque quasi id unde qui ut non commodi. Nihil et debitis nesciunt ex eligendi velit culpa. Ea laudantium vel qui et quasi aspernatur illo.',
                name: 'edxlexahyi2c5lb5pl2qbwgw7g91938yt0dif89ibmwj92yfj1frfaahit9vpblmqa9dcxvl6lt71oo7qnyq4e1l5fgh4u3twsw09142hiuzwrsp018uyevjnn1tksp27awbix4si3c4zzg1b9kp6cwl0p1g1j91gvkck60lt4o6awmadxg26cnusp4mtian383u49vtx9xsok9fec8jzvy581qda1eiczo0awyluaip5cj2jpjbl6zklnl80r6',
                pathname: 'sgwwsxwn6rkckk9utddtwbf0n0prh9gnm44bxz9tvaum0770j5bqfp62021f48za6l9bvu1qkccc5tpnorks6inav7x071jamtnw4e83b812m71ao6uyf9ngffahnbwndh0we37b0p4xzebep4xrv2dy7tdxcqwfbi8cfenvyacx5iddz0a4oo9ibo0lpugxbxr4pr9lbehhvquvslgztt3zrycas2nd2u6721dmkgxs8fyjfkt7049wyoy42fhgfgp1ouhscksivdpg5y7gc2jch86ldftjnzgzre4w41r7osiaxmnyvp6z5wmlonxtmf7nawwn9hd0ave0b02v8ig4nbs09sls06f5snp0m34rb3q0yj0vopsggoi3o2pinb6fbvugagouycfya61htcpk7ugi3wt3u6odbxdsub29asm9ll967jk9klwv7ag6sne46jlznopf268kj9car8coihfkkehtyalbeq0u4lk98qy81nbu732l8ldqlic7necfz6k6gcc2mfd6q5my2i3k3x34q969951wawgp6es8utuqn9ej4j01r0ext7ymdm14dhe233wdwl98mkjsvpl9sn8u26xkf7d1ozd2nf0ea149mv5gu1rccr51y222p0o38ym94uuizn3m57mlenlqg23wkl21fomxi1ckjlgugnuhl6bb3wik6lg5x8p94mafspa22ynzn117gaeofqbnyjxf8jtv53ift54oepnqjo5dq746vjhhbalmdndkx75sh8nbq7elkc4yopefsvqknq1z662jlxhijj8i35rn9ficb5bw2g5wacxbwf7lbhgz9j0peypop98ff37ij5i6qe4bhvm6kki0cxzymguiqkpmz9t58bquamqk6rtmiib0oty81pl8386g06uypw840yegao64cknj9s47cfo1wiab63rc7rfky5fki99fbb8rcy2lw9dhziihr9xdb9me59lgv94v3ktqzcltfabfxdg6365fbvc9ouo6uthc',
                filename: null,
                url: 'mj5q133csjduyex954q28z46kr1nx12iyodm5aij1q824hg7k6pbx798i7pk2z33r4i91h7by57h93cghvc56cnt7v6a0cnbtfiy0d1hyggxu978s37dcn5m3e9eju6i0sqk3p5utgkx2vr0zyeyzknyxgvxf4kneslmf1w63lwozmcko5o442cpmzw1khz2455e5nqsohzjovfu2vhcs7zw44u7b43h3mywoo5huh35zvabic05hk3n0wqf8h5weienoi0zdqonpqko4m3salash3gxjfecr5qgsfzfjoerew61cltt30qq67zssmqo8n5x9uqjy9d2rtugu9i2jmqigus73frmg1gtniguswdhjizy37pjul1yjvt2a6eo747d1eevlnwp7upg8zoi9ug0gr1779uip2gbc3bnz657eb3l88h57gg54i9s72zk3btt5hxmb7snjqtkpjmdn1pcou8evd2yquigyy1qrs9yhxpgfl4jzkmpk39v9yd2b9md94gqehai0cyp5r7juoicw5sf9s1n9fggt963ilpv1z6weacuurb3puq6pf776czo88wd84d9kerkv1hs31dvyqbjrxxr05ege8qmoe8f27a54ur8cpqkfxcn5s9m97ica6bamqpmenlg2p5fqdfzsznhzzhpsnbxw13wxk44ynvuau40gl2ytjwcw4n6sngh4hgn2y6aee6oc4rshs55jiqu72araf19zbjtvjlyi2jvc45lek5bhf5hy3q1xolixtulplmo3pydot1718791kj3uvg4befy7x8cl3papvsdcvtupp7dk9ol8e1ei1mmb694t6cri8rx9dy43jifitjsoz8dax3s5eu1dac0nfaofqatrexjrgvezd9968jun3l5uonj97h8lvj683x18hui9nh4s6yfuyct2naw3uetzgc2k22jf8ys03a12f7aut1so56yb28iwe6tpxrymfk4mwgdlfmhae7u6bbckgsh4eajno9n2a5f6hyk',
                mime: 'n6ljmefrbbmphoylxvt21u2l48is7t76kulqze7qqe8fle85g4',
                extension: '28ux4m5zcmp5caj8k13mxxrcnyopcp09rfyg45hoc4yk06qjpk',
                size: 2225411495,
                width: 957101,
                height: 101269,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'r0v1jmen71n8l67uh4g56fp6gcqp0cnc1znnx8xrx3din6hz1pc84rgay3tzd28awdgnw0thlmrem9ke7zdmgn6von22lh1g75ejjvfrdxkmu61al3ci6phpszor0jnllbcwttclxsb4cmpoalsnep16ewrhxtm9lnsjc9f7lcglta7jw2z41u8vja6kn71z0escrnq9j2pv6c0syiur0r2fpzvw6qk5cbtsox8tphg5g1d48ld98h1syuwbekx',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'tu6nyio29u35wb53ma9s35jaf8oh81mr88xqh6qvlb27j2cgco12ee1sqs0q7096tld42h4c436',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 550043,
                alt: 'zbwhbd2go6n73vkan67526ac871i22ir9e6c6l0vocpv4bhwbfx5crtvb7fpsmyg23qrl5kpxvgmnrn8mpj2sw94pjd86m9dzwn1vagvafnrd2h2a835dm7b47f16txsmbyx4zzelyexckgd9za9ih8uua8d8dimzdkdqr7lpdlrmd2ajslyk9axw61nxuxokoqf334mj207w4agq35fksrz7gwho5h9cat1o21my6w75is37bl3skcma8kjkq0',
                title: '1frah47kgk7cpccefvcknv60nw2dtzidzdrfygmmhhixr2jpzk4a2ehej1myatnhibwb1g0bcndznu72itv95m2sgtqcqkb2zpgflkhol30lvme6wvrca8wwpvixeuriy8gy4nbyblg2i41gixfxrn9tckw437hkg2di4q3hhfb9894tcuowgzdg9didz9gnl1yzkyux65vukecbq1rfs912khomsrc5n88yj78m64fqjjy8ds47xhhs2jwgxj5',
                description: 'Ut est ut numquam accusamus ea impedit qui provident sunt. Quidem aut quod voluptatem dolore maxime iure ut vel. Et fugiat provident reiciendis.',
                excerpt: 'Velit distinctio quae repellendus ratione. Ut voluptate praesentium sit aut blanditiis. Quia nulla ad dolor ducimus ex repellat.',
                name: 'aklqu5kdthxnmk1xkll8t6vy2oqa4xh62vv6a8f5dbjzmorafzxpxdyar5q9ihuskmq451qpk2mny8i32w8gbwiptjqni7l6lqqdo8a7xisrfy63lfa4l97f0tqa2lzaig97ovydbl3ni3muptndk3iraouz1s4beyoqn37bnk2n7xy9p4c1ak6kxpdamismyafc2lqo0tieb8sqmwilrqkdha4u7y84eo1e7a1tuo4seoq45a4lvpwu3de97y9',
                pathname: 'n170133kdae76a3hd0m32j2zaowiaq1akmxi8h1qirxo2929yiwiwftqqyqe5q1in1n2dz8vvim8ev7qd9oreqxaj4pgh5303okdkw2sha8k66nycg66ebeslbe8ggahb6rzkekxr19sb06nskq7oxxpnyk1n0dun3nk8rj1d7io94kjxysuufuvlos6w2uzt4nnp3ry04o1arfvfd7uaa9ppqwp3cf9w006e11b7gbsk2gadpbkt1fjq6t906i0lw1mw7do5244xw2egn1mj2oobw04zx4gorwyfkb9prwtv1jtu100a4j68yx25kf2z33fnsr06drbkk6mwxizcz0cool1qq9dngz1q1bvs5folvvx7clq3hmsernbmse0au2e8mym9fzj5otgmbfgyxuotkn0akaz7m8xwbhyok57upxsilo3xy50c637wvrkb5lvu9ygv05613qoxyhyiea4kuzh11ve58tlbdlzp1f7rmlq6hrrib3trjjfrr0xmph13ccnshesk07ji7x5f0mgxnc1qs3ged4oclov38opk4g4f261ngk0ks35l1u65og11f35vowys284gmhe5440fhj68qxpryep9ie2aqvunqw6bpnqga9tn4wbvp4c6ad6t8n1o6301cq65a0rlzx5a8ngkp821uzr5h6mkytx42f3q8t7lhc2lya889qh10ft59aqd00t4amuw0hq0ry3xe4m09jmmm4q3l08zr1ha6r4ultvqktis78epezyy5r0bizae28arz94cnkx9ra7a6nkyjirxnxw7pclmbqrleffixnmyn8c3xrdb26ttyq5fzmfk27hu95nylkgang8njbujprp4nr9vmea33h4y49cdwz1nmrt7kunyj81tg929etuzzeqc9busahr3vi00e0df22unvia760ja5xp7uvhoo9pls7zye0ugkiue6r5v5uyjrs3n4g0g3xtp7f1aqyvn0bupd9epo1jgj9c3koolxhl80ohgwyxrbk7',
                filename: 'ut4xubswj6qxdvcsy0vlpv7v6usn1ao0d6zy2s3mkpxbteyhvu38o6b0o8wqx111f92m8ouaj35qltq948ro76rvoxs04o1vzlujd3zjo5ro9t89zmuwkoyusxfamb7t7a3a13ayvrybecs78fjj9k8i387eqi4wiiaoyoqjh0diyw2oe6ffa6qweqlouwjfnvkewj2cdchu35vztmjco32943rxpeth96hhws3xya54nbfr0qt4quv6nm2ddzv',
                url: null,
                mime: 'r9dz1c7dayyivcosvaxjp5gb5qulhc5nmb1zuxmfjgz6z4ldw4',
                extension: '6zxbv9xft6xbim4be7s06onau6y1zxe2i1h6ovu4l7gocmtrap',
                size: 7062115496,
                width: 189645,
                height: 964525,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'q6jv634wajhnr3hzhcvbfdbiz4f1gnl4j9m87eovgnn3d18vkfguoq9n9p5btlhe2o8576bzrarbzi1b9pfysgrcq4nv5uuct8i980el5vktrlfwikafhrv4tau8gjvsxvjk86s8xjb4h3dgn9rslpd4o8o416i6a1z0vyjr01i0bc6aswomfzupxvrkx4jjomry1s1g0gcqiv5pgaaiedzi67hltg8ih9y9yzprio1tzrhgugk6lioeyrc6ndo',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'ymo7mskksbsnndg11e425b85z7rwmzloue6snj6tip13vozbc38vyry0rmzl6g4d1jquv5eenl7',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 505239,
                alt: '3ed7c0xjruzsi7hcadankivdazmmcb5hiip5ahnxbkfrur3lxvl4qs8seaubl4yqpe1v916027kjvi10rb9kzaf0pdbhwmsmo5vdtboht301meewi61wzvufscl17lyjy291dnx0eju8x8hx4pmfc8gwxkut8s8wntyvi7c8cl4qtmfj2ap5pcdovm779g0dppxw7omjgs1v0ev1qzipfw0kwtpvr42c4065bm3fi94ny5130671w6p4gdhcomf',
                title: 'ab0btlw68k3wqu3ejfpx6u5uddiwiij7d6ow9mkif6v7l7ixanuelhm039odotz6qik4bbv5lxjoc3dmm7mnhetz64rbxfhucinclocl2y9zredbsmtzab4whqq0x18aa9w7kpffw9ehn39p0jgmpv79zgptg2qlgvnycsi9d97bliu7bqtxosc5ow7odg3l2d6g9s6iy08rlui70qou572lplhpoqhpxaet8dft5pqgt35pn1qdnw7sng3u9eu',
                description: 'Veniam eos nobis et voluptas voluptatem. Quibusdam aut necessitatibus quia et veritatis eius consequuntur quibusdam aut. Natus iste numquam. Sed velit et. Repellat voluptas quidem rerum sunt commodi est. Accusamus numquam labore molestiae praesentium amet beatae.',
                excerpt: 'Quo hic asperiores. Quaerat aut fugiat. Voluptatem delectus quisquam sunt nihil magni et et. Tenetur delectus aspernatur sit recusandae quasi. Vel voluptatem mollitia earum ab. Ipsam aut magni omnis perspiciatis cum et.',
                name: '6yty6xvlvyps9iwoa3dnc9my7qor1488eh30twxswrej3x0iwgxaxzitpgrvyi34e9a6x4qtqi8k0myghl8asj0z28hs4zchox697p4ti3id7uuj3vrldudq7tlfr9ardan8c7snlhqivq0j26m5f85w40u1w0tkcf5oo6lgx08k9l8x68f4x19fm7gu00feb2s3odoavybgf9duew291frx0pgr898tr70t7gta75urwxk44d6jd9pg1wcbzah',
                pathname: 'pw1q7v4co83fke6v6b8ssfgfgbtpbrmmydi8tsgyqiz6m3yrgbqtwfthdej3v0nvnp3s93935nvmkfwucprdxfk5v3w16ansevhqpp11qyzvzoalrpsbs1bnuna3isimeap575n3we9lpveof949rgb81l3u2tctp3s83bm43ittwkahz2fwam92glhcpadebsfchvuh2mberf9r6debyqhrl7sk7ebt717rwq8b4dsdn4rdu80ss79mcid740w9ktcoa6denuwfswkmm0ezp7xl7w82ioplbobo1w0ab649uy4ldpf3mmmm9n3p8ctmy735d8bynsr27irexb0046kin06ig3v4vnyv5gs26z6r38q0dyt1om352ane9rl9c7o3k2ne982dkblau9r80vinon0yvbvuywj6sds4cogstlt1tkmlpaawpz35z9tplvdfap0bxi88zd4m75jg6zworo5dcclkxax2y5t5s35t2c9z61zmyv5i8x0fupoucvpyyg73spw62i194ziymix14ztarijtrb05msk9ky7qltu9rhdijj8rq61fq7pb2sqskeecayouayrsqti2dvqh4obh3ycvfwv10rqdusavuf4h9iuzgmxiedkbt7tf9qqy5tp8mwcshnydvkh7b6g03p7isk6mzuxchynm49tf6eyl3bpgjbkv6dry0ao2ib5qjnrcslk5dh2hzuol6435fv0qbvgg3vvqi4r94euvawydl0dtt2zcungy0lwlirm4k65kvj8eu43tl91s22ft9hvos4k0ywz4qj6osxkwbi3p7i7341fi1sp797obloxmcc2zur8440omo6pcke466jnnxoxws2hqrbw594xqfgpeoyopshwr81rmmxn5eq2w7k6txfx4zamsc1g3jq5vcry15yxb7s9kdixpdvuf89rs4kvzmuogao3f9ay43sc9j14jy3dv6ckmo99hj9g1a0tgu8learopsarqj47df5pbu769lzrmfrv5c9lq',
                filename: '9tc3ljx9mhfapikeb3ncx55egkcuqcxbdbzbrmmu7xe9abvg7nzedyhx7d9mw7yeuaaeodqj8ywp23rnp2n794bx9n2qd3okq2c4xze83kng8puh2aqprxiikt05fd4zjixca4d67pn8nta84s6gm6axk6eojcb8c8ecc7m8cm9p45sfv76ajm3w701mtznd6ck7to7of09zor5ci9h8oaqfx6z1dnwhk1kopxz47byi0i9e08c1mj589liaruo',
                url: 'tv1pdvhve2lssget4enzwywcqudto63px7r7nvnf64ljwd0b4i27fumssxuo64ndbj3wrd9rq9zjlak1e6hnnvk541362xj9y19zh997298k2ymo6o62l15bc0q8l0l5v0tnyfq631sjwoslc8roe7mgpl7vixd8yrk9uqbx0ycibv1mughvo4uamqq2rplkmffr8hmrbh4fredwnzeszd7uwstwnpq6bamrm61riqzhcq3rdgvzq756482dtvse7mb80bx4g1k7208poe609hbi4x3p9p7ncuyn1vm1tv0pd3oq033ry1ktnclisivami15mdzeqx9k9q0zsu7j9sguxp0yam0ohsa71opxhyz9j639of3qfel6yjynzjdgbziwtuv2dajhyywg18g3nrpq5tfsdr7ig3u7ggvoevjet6m7auf98e9x502hl70wjldc3j6ouvnl79yjh4ddoyfefhy2ic728mybp88zc7874zteua1egmef3kaz0dwo7gbj1anc8h18ar1yciv05n5fpggsg7ydmvzpz968hp8ohvfvbbjv8wft9c9lz7566rqol1r0rreplf92ugv77nbok35uw10lionqawuuva3wtp65fd57kgwbpmnekt5j25ab4ib4gl5shqkmilzqzoh1x72prgrcy6vkcvjyv85w2n28vcva431ubqpkwyht5uxris6kow0epo87wi3ot0t69qgcnbuz9gpdnhozdqjtx9adstgcbagqukq2fd508ogjavd8ud99fhktke5ufjag41u2mm7lieltibh0quzsxxlhxfl5iwh8bapr5e04350u8j0qij952z0uwhshvn7oesgaev20l478t5d469ocrtbjw9pqacyyjbmpzemc4d929s30kj7nhe6h55ec81tmw0mpd35u944h0c8unfyhmbmv8nxz3j61b497zc2ktxnvmnch5e2nexgeohix33mpkspmtl3gpwathltg0x7oqou4krcv0e790hwxjcd0',
                mime: null,
                extension: '19r0fqtbi6wlihfv2ahe1dc8efcxcbdztx5i10547z7esk77t1',
                size: 9551610247,
                width: 844460,
                height: 647556,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'oomvv1i5zv6npx5ns2jzbhg41qh39fj2mp834qcmom3npyuqetq3z94kt2et6s6w4pob8jx30t8hostbx4m4dg2pqig1vp0mlqrg5z73z8npvuej62vn8mbx2m2f4x22o3kciv16ys5pg2ye61a81h00juulohvlfz698isgy23thent0bk1nds4e8bnee19huy8fix3pu37rpibmwssu68598a67gf399uyowfwnfdhoktyi5yaggea741rt21',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'o1obrqkihhob6ygj6g42c401dbou7v9dwl6hszx5w8hnkshjpeh35urqmaoguzkrqvmk6b4rduo',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 751669,
                alt: '2s5winqfkedw81graft4n4n9smxavjjg0190d2cvuhef5djm5msgakpow7im8yep1zmgjrlsq7dowqlfw6582ozh8l3ep4u9946dw9qdh0o0vfwx5l6ro1bh5mm2za0d1o96g5xcpmlwxm1kfl4s7v51412gq9wmlyp2ub2w1w3jwuulk6m9xu169ft0czctwvwzdtnggkvxjgxoujry4n5hstt1euw132607awykdylordzp5vdrsc93z24vg9',
                title: '51jgsvx54n97e5bsv7n1yq82sterqgza0sl6biupjohguc96koqoefdrwxnbmgtfcvsa3lj25wla4pi57p7bsqgxld82hzm5twyuty25tesrk0ebwhcstpgy1h2w9h3d04kdxv8c6rvqco9oi2ibh95pv2sf9wlu8czfipe9pbktzy0zd791sthin48oagzfas1rcauv6i3ibxxaikrcwwy24oxfnhtyi9ut6c289zhahcjw96qzvlopf8hiydm',
                description: 'Temporibus harum culpa voluptas. Quos ducimus ut labore. Ipsa reiciendis id suscipit. Iure ut quo. Ea quia ut sint aliquid ex autem ipsum aut aut.',
                excerpt: 'Voluptas eos fuga deserunt. Sint maxime dolores distinctio qui. Incidunt eaque saepe tempora aperiam architecto aliquid exercitationem asperiores. Voluptatem optio libero. Qui quibusdam voluptas dolores.',
                name: '1ygab059lrwp3z3wvvw7k5potm6hdow80ocb9du5oz6ffohors2jawg26b667o8c4lyuix1qpl3dwiz724cs0f3riy1me6czic3cup3bhch68q7gccn18lqa5t21ta3p9o0oxijlkbh8a3s6ced1fj8cae8kwhs5417scpm2csp1jyenemoczmyk5s29blflu628ldh6swt6rde5oqhnv5dmig4dzzgpaa3h66gs5ec42u0lbg55wt9bzwjdvdx',
                pathname: 'ji300hxle6c7ddob27spl9o3hhvao62egoel9gxvmldcb92m4odlvbl0nutfvogubo0py7bb0z2e57xl7k1mu4ollyawkgvj0fhwf6510gil4tz3uyw3uie4cncjizcbc9d3lv0h04dw86ely5tu8ctjgsfuyh9gbymxb8dho3q1jwda7slaoeguj9nhdl2j8v79xae0hzc4ibwvv1nkt7i4ci5jai460oq1wtzou5vgs016sgsxkg47zv4kalmuav4hnpxnqin3q33vntm8bdxybib7mnm4ot53aj2apfdsa41eq8jdh7p7zguhbt8hbfcmi9qsneof5snq3wj59p2dh7i5ifjcw9m0z6cgn9az5fy7529slmdznenabezprkpizqpti1171zzg5tmrapd7oe1eqx0vc8mjj5snwrqt31w2h0ugcar8urzfjydugtavw2a9lff1qrekzl4b54joey2agco6q088m7iz3fdi3kflm5qiq7p0f6iodhwz9n1sg9fwpyg8x1k26rj2vts74p00djimi8ixmqzqjtqr60deqpl4crtv30fpd47g25udvfxqtlftelnrcmdjajyh2o7rgqesxn963flq1crgfjp93j9ylqbe8vm2b560qwkxy94tx7x81bocr64tmu93cx8rupz7smuv170a8f4vem83nyeungwotbt2vrtcn4yrcqujdvlb5777bi0ix92mf0ysp9g7hvdxlqgw0xs5pfkaeilmx1y3fu9sf8hyd0vkxydpps8n0v01fvwlu8qmsw0s8042q395ne6cisdag9xg0qwmlonw035tcm9rdo1olue6k0pk6czmyk3l7cykyzik430goz59fs0y51s5yk57nx6ptqmt84q33lk6oc51ix5chpc35gpvy0m0f1iii2vlmccbtsk891wudf7w0sjbi5hr9tabiy9u3d2lvvk4un2bcy937jv1dvhdvc31ylqmaz1peldsihmuh9e04asbo21zbl22egr4nzzs',
                filename: 'ewr19uzsjblb4lnf9xlrhy949fza381x2tc7fhmku05ujxck1w5ubscyzw52f67abibfl54kx9bxmdbv06vsuiaqkpyei8faf61vw2ykzitk129pjx7ofq6q04ysb38ldcx6sfa0qorwcvjh1i9wfcqr5lpnmma57ea5304ubnx4mneaje26zfh94vh175jj8wdrddrun5siz1my5kkr4ewfbjc3895b1ovj6tdn1o2wyj8tqi8m8vlypbtfeg7',
                url: 'ise79jxwlii1j15pm5wxfa4g38u9rxj4ipspdhocvbvqbuhjrrl0a9zr8trd1qe6pro2lcfthgw14726vexeokcxuk6klg2ggfthpaizmtn2jq1tul8dmkdkjc23lgni1a6fsua5ckhm11it3oiskxub4bnhk5b6z27gnh6ce8pju3sh01esicuqtqm3kgiv09qc38nrbtwdcn5oubkfjtmdlx5dm9samg5yg4eg56oehta74xsyb2l2dbp4olrptg9ffnuz0zx91d2lgoz164678628k1zsq4k626hfnxkwbf2o01ti415ks9ps1n1035s7du0reuh4q0mvqnfo7lrwywydhqph60gcdcdqlmus57db0o7hib0gz85mijj6bxflgs5al0hukptiwjjn67m6kmkvaafsindbl1rqsxsph6ixp15qcit4s5uv3vvyp7l1yb88pmku9fs550l8yt4o9fbyql5kzcxvm1i8gvnowo7o07kowln6fxdrkb72i1q924v35pmg8m1ergzoy8hyvc7kyjr3zatb8xdq8vwauf822twhxi0rcgzkryzztt8qrph6s0axpv64vnv3p24mqx6szdme4884m4yutdlu3vrgh0n42lfbo31kr3tq99dywjm999nnqoorhmet6h4i0b7cqca3lczvb8ek8k100hogn2szqbnimosztkx5vf2ihem9j4l5bqvpquctddofid9vtntz6cryqjwpsanrbsq35lvn3p81s87951n0vsf9578f1eh9ymvr3ph1nvwb2b93ko5wa6qeh33zr118ojf1sq61jrjawnudm7uw4k4o78hq42gvdlm7rs5cbaxhdw3kwqiwj1vev4e8dcthy2zr9hmke24atuqa1x4e1vcoo552tq6ktt5kwej16cimzcbbppno6f12gtzvykgl3d4vax6xt3aqgkddp75z4dr5m9u9n5dasstob2zpizz0uf710c3dsnikpbok3lkuk7hhb95am06zo3y1h0jr',
                mime: 'xi61yhtq8iq30pmtogbe7m16attvme3lumrvm29ipb353406jk',
                extension: 'ghndesihy6wnxc3hzmovedz6k4i3nm2samtkx22ch3rsgnejsv',
                size: null,
                width: 467836,
                height: 164815,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'gb2arc4pom5ull5oi6okkc0y7twtd0re3japjhc5ulsahwjgy3hhbice5ejzqbz0fpcncz5q5nqe9x6ejozib44bv6vzemseeht4uki1xwubrn3pi0qc50qgsn6q8qex0z86byeewlls7utgt7z1y54xw046aaf4s2locqw0vtneo9wnosfxmc48c579fci9jm2yxf6l6289mzx4yxdevcaf5yv9s1ko99qnwlsjdkwjq0cvjey71xxc3kyd1ln',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '2ifv8zk7gqzm3gozm1ty6p76z8x9zedkv9gwllpb9ppxxcw8z2p04zoxpt0ffakpp50nimrvz8f',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 970498,
                alt: 'l8pz1m02y3ydly6q4auy5vy1kwzbgf9rihcy33b3yq8k6aqarpz0ms8eggktqq2iyw3xwg52ls2g2g4ny0mny9sxsi84bhtkknjgnrfr85w1iyse71gtstj6frtt1gwxlpwrz9anyh4bd6izegmzezt2kwijkqjp4d4o31odmuzlsp9fchqje1e9vf7zt99o9v2m8o11o6r4scu5myu68j732ff5u1zenfcxagusi556ll8g7ci383qrj0gkm25',
                title: 'iww0vzfvhq7aimi79scwau0j0zini01mf6vfdkdnvmmub6tkkzcr3mds3zecov4tavg93a6i0efn833or14ktsfeiktf32il28ym6y0wdtvukr322dfgltldmkfz1qyxzzqrneijo36hgaeorgk2pozp5yrnqhnkx2b4sag5cfpoojyqt3bj5yjoon6zx7v1cf5ua8dokt7g6ame0s4q64orqloyink4wxy4lpeejpfbwtf80omvbyxp81vsaer',
                description: 'Laborum quaerat ut totam aut esse ut ea sunt nihil. Alias itaque sequi hic fuga. Impedit quidem enim minima reprehenderit temporibus ducimus dolore. Cum officia ex sit necessitatibus perspiciatis ea dicta quis quisquam. Autem sit atque voluptatum dignissimos officia sint qui suscipit.',
                excerpt: 'Voluptas eaque magni et temporibus consequatur impedit corporis dolorum. Qui voluptate pariatur eos id omnis sed. Temporibus exercitationem fugit cupiditate numquam consequatur facere.',
                name: '7brkvkuu6ckiv5uqmwubci738ulnudp467yj20167rhu5ju1718psc6ht1k0x1uefd997ifmj7z2zq0921mmd3az3ezxmy18mmp9ioigswkdtaxh8omnkzi0valx8j3c7cuq9de97cj7i2ldcz6i9vw9ypwrdwuwzilabsa1owedo35z3ii7u7thsx7xwgsu4slzm5j5u13xh3ryraj6hy1fobg4trph2jtkz98yzvjop61iq13tqxdqekj4p08',
                pathname: 'f2qotazab4w99t2h77p7dwrntrwj253c3mpkg8lipd581tt1ky1ahsviekcmkujes8g5ayz96zv2jpbprdjdi26lxs9jogztr8wl45q03ili0b3yqii8ty9x7neown09ft9gqhte9zu6m9lmlmi2hvr7z3hdkd7c8d88pt59gwsbi8j025i75urvdxaz0b9qej1focxsf6t1v1h0qi40bzp3mmszbcd5jrcd6gpenbgiiw3a7pfudnv9pq1t58jk4g9mfwtyfwnrp4xeqbu0bw8ypixmff5fbjomlt1qmfwqnevug50j0zjet1gbojg12kjxjbdv8s7d6npyvdvkx09vh4so3wzi2ugufv9jx9i8w4ixrv7fkngtnu7xu18djo6i19q6ktfv6vrielr1inaaz2ycy0k3wlmullhir81u8nefke6hnhm6oxfvnn8w4n4n034ancjga0lq0x9g16yaly47hji0rvs7wkhlb6prap7j6n26ve4sg64lsw4su4hm8dh1yk9hutqb2rxub9xuydviuwssf45zglr3avd3fg9y5jptso4jq3m50sqb6bl2uy9vqqrhpg8u1zbaa2rjiqvl9vhh88ffrbkkff8yua6dlh4a6o2xrk1kakbigrveb0qa84vqg5sb1mve3wflle4t1miw8nsq59lawres2hs4wqto9r0vbgzhhq02to4rvisaqnr4z7nyzejfj6oflsq1od35bvo4zkb55ylna20h6m8v9e840fq3q1lp6pbr3hcphcqbgltl919lr4cpler5kapt6qy8jw03jmsae0hwcu89lvhkh7x1phnhczk9jd0uwacmehvp0s0y7djv42zpdvdzx00pyzdyeg66dct550q5ap25kazz6ki2oj9p7442vq5oc2ofpbh8crda488yvui7f3b0i6gn1ip2nxz4khnjxpc4gm3ru28quzvytfi81tipln05hig32v71d3gepess5zo3s5envufii2s7bdj2rxezwtckaokj',
                filename: 'h2mweqwhmbqxkz1r38fmvx7tbb4dfv0n3hr4zapncax95bteyvuqfatna1wu1402o28zlelamh0rw3ty95kwjru2ocxsrtzep3odkjgf3qr3d46lu2u55hxqjgbf2ct5yuqfcxn69fhqme0ggfyzm18bnfcex1cj1etg5qk7egn9c0iich0c116smowvl6bi4rm1t73eyc4qv5e2mhkz96dkyxjln4uio7fg1w6ajsrmkxezbiykresiptcal8f',
                url: 'vv5opnqyljnrf4vy2gqgtl5chtsad4jubnsfnxzn85loomp83oeya3033pl3f1y47xi1w89ipfq925cquqifb2jx4hxlkqp7hbjl3jn6436fk9wvwgv8ig8t5uscwtk0t87zlvglb6o81ixtz5yyfa1x1g04nyr0b79f7ig8ybeu0q90dhkjnutzdkeiet7iny83hblnj9e9f01d3zhdzkevo0w65sryya2ozudf26h7gixfruqvs112cejkza816yi6tej5vujgobco798ho16jkngpjp3zv1685gxhaxv2q6qd6switycwukb6yfkn2674mctw948agldiktlsxjzus1qeu82mynj45gmyefmq71l6n2fj9mew9h9ljmwmtppeowrthtn7b5fie4r0w0nf7j1w611ausz432h62f3pp53pls22n4ldiehowqoujdjjfunbpl05r05wcwkhjehs2lb96d5izc4o8lpcsmzrvvkoymiv10hex7wwmcfkgie5pnmp7ks7oxg0zw16ysoxu8j6nh4f1kodbxnsf3gnqmetn16k650x7dwcb6wulfpo7rakq24t61zhhr12t2lqsouqbdg4xn0nsmzu9dnw6goqmuu5ucvivx4hw7886nsvnvezimlakgn0n4o64zijckehey6ahuo1wros1hp9qx6ba7742hjkey2j5ksn4283ymtowpk7zjlfnhzil7fsx2xf9jsv2dxb6db6rc8quu6l4qqrfb07p3qn2mt1p8e1yimftkciv7bpqmn6nfwh02z5cww4i3gxljt9dvtk9uawjnct4c9yote0lvudq8n5evh6v6kw3fv66jtxkrynqcc5o3zlbpkh5yd0t9yke2rsjgr6qilvfzxi9ekr7lvqb5vmffvuaowg6gky9uqorlay33a58p64r6noijtw1rzcjzyo4mez7ffg7ijfj98tpjmdyveplg8ww9azrslghfurfe687m29ltubtmzyh7eeifnswur93jasw1yl',
                mime: 'vlhahkhtc0trdmbf19uenkbangw7x74eyiqloyvbntr04vfnir',
                extension: '3n9ify9xxa9s35bejagct1fc93d5f9cfer8stwtk4zbqmlfy8i',
                size: 8145559506,
                width: 204925,
                height: 955882,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'jt98kghuc9xzufw5f31g0kvww0z9w8l5rdtbc24bo2iobll5tk2fbuiwbh8wrnlttgam67dufwupmz0pajnoo8s6gqvuklz1vgd3requbyk6zjcqwceh7wjg8e1ak4wonqnghl18qav2l1q641wut3ebpo3yubwkxfc0abfu2ha8v8valeltt2uhrkl6smhtwh4wb82bos3iwtsc9qtz58qaovymlqi5pnogowgd277fi39zsok9baf383bzf1h',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'o0ub2c0eti3sg5yjgybkqbyf2xhczsj8m9ui5c77gktwfalljhvaib5y9csn3lsibpxwa3pq9kg',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 603800,
                alt: 'l1sfadlhfqkvasar4nocpy1s03m8a7h4hgpd411x7ldvs6upps84qqqhi190lhrplneui3f0trc2euu0y7oqnmwe0yr8ailsu6japdmnz0ikfhewueoc6wp9l0esp5fc1u2qs8nd6htifymkfitbe69utm065632c9o8lr7sikfvohgpde9vy2xp8qq6gtbvmtkmydfe4anntd6tyovw5qhh1uo1b6tslj7q7x3kwj1ok21dt4r5jzwsq0c1i7p',
                title: '5xdcuopq3el6e54gl2xeusolx06r792l2yw187m21d3oefjsn72hs4gdwphmf1epqfq25k5ijxlqn2oiocf4t83c994gscygfmbr3t2kv7ojmrrafiddlvsgiziqhlh7jitqc8km5srvz5x5zllsvi1uoj2im5hxso54ei6bcmhhgqevrbj6cbm99qsmlktybi7hwt4hbg1emw044dtcme60u58ijqto5nxnzqf3c88mmtxa4d4d95sbvci03zg',
                description: 'Illo perspiciatis porro consequatur reiciendis cum quidem qui omnis. Quidem eius qui et fugit aut laudantium a. Autem dolore minus consequatur pariatur. Eius culpa facilis. Voluptatum quaerat animi et qui eum praesentium.',
                excerpt: 'Tempore a consequuntur neque. Rerum nulla et magnam officiis odit voluptatem est. Sit consequuntur tempore eos enim. Dolor ea est similique vitae quia quam unde. Voluptatem aut fuga laudantium. Aut a autem qui maiores quisquam sint.',
                name: '8af6j7ukaxg8b5uyhmq3o39roxlyhlmo6y7vlnwolbjhhvuuoi1y5k83fykhvq5plzuxf7368cgofjy0gjp0hu398egg3r9x397vo4z602z9agu5uskb6qkmifs3ktd5iqjk83vg5glaxzu3q447v4mv53ke4ad9thu08ogr78sia1t3oabaz1ozfewyo7m5btsyiy9lcistftn3m3x1w3qk7946p89kxfdcpnhgj801g6im41chvaky8tm0lgx',
                pathname: 'vji1q02t4epbbk7riti8d6ivf1r44f349ak47dfp0ev4s847euz8ymd66q8pvzynatji8kwd14hh65nelulcnbo1fbp8tbb2nml9ajc9fvcj1mnl1vsk2rdh7x6o946c2lcmxd0jotaaukr2vdg1vfyrbrwjfwz82v8n0yc9neose4ps34vwzw5c9tsn0lkx0dz5fh40gsii8fnvol714hvxven1s9nyauj24aq6nnqo1nbooem9weoy7mg41jxxkk88eg7hbsx4wi6sp05e17rg2jei0ihv9het7ya0fp1i23oy9vbtfurjeaw0vlr6lt34tmx2nffuhvm47msfdayxf5gni1zlfasoz7wpakxn9b4rrz1lzgap19bl4syq05or9ecl4x9jwqy1ryxxw6glohtcb1nhf0bvqkfq212fnnd6oraknyn6gbsaxk9sva55glp4r81caglu75b3mm57qfi8gqbtb4pop07nytzjswjvau32tcl7m0dxq7kp3huuvwbi39bk993n18ts1qehxiq0prfywhur6a1uvfmfnz1aop2cj3tr6btv4jr8a6urlsmcr6fmfzzpckaoqs7gydc5w0p2fva3ezyfc1c1f594rz5m2v8wanm7hrkdhzzjxywrjz9kppxngqedk8tw8jhhxkxkx80leivzhxwv80kfvxkxgozg6wey5lbf9q7gimwsovdlw2jsnkjmvhk1wajk6x0psij0zj0bo212ezn3p9tu9pmzjl101ii16ketp814l8i88t2eo6sgit6gzjgwbpcdjp31gpgzche0dnyz3u7m28aqdfp82c75p1qvq1jsxka7ybzdu3be6km6o9bl2etnpkcu85xhbgdb5duugo2uyh4aooqm1twpy4g4nin8xgq7w83fqmgefbdo9t13s7r2j73l7zx37nauhsz5iqu4qfh9wj5xyyk6pe22sleguog4aud04yo01zmtf1qyxvhu7cshuf2ws8tx5fr15qfqphk0ddzywyaq',
                filename: '1qwks6x3zeml6zm5hui8eq073gxxii00muef24uwzn9b038gj0kv74rbue6h7vpanufog1798xl7xro094n882j7l2jtpdaf9aa9t8tosoxyxo24kz8olsayr77ytx3krq07fyrrq37nnxufc5nknqy9xtnhfalvu8601t2jpj302pix4jk370rjthalvckr2lnc3z5905o82w1v4hmvb9ha9y9eiehf2vys8xx4m8jyf7ver5lbby2ri6gzuu0',
                url: '2miloakq72tqkoro4fji619pjz7q0v6w7wrns62w5ppzed2plou4pejdhd9alqog8r5a41gn1zhhos4wrykxjipre9iu4hrtxob8my6ld8i7pzuxbj97rik6hinlx0j9vk3zh1yi9akv2xia3aw95v77ia5l4871xozsjjqkvw55bat66g8kqfiiikz3lwc6hy506i11ox64n0qutd1qxh246tn9v9e54tlh6jqkchmk5uo679shmg4q9lcn653beagaox36stfx1klzbmygqm8kqx84dvmhke0clsdazpts2eu2duvhdtizcg76ckdjdnf2ugb4weqqgoa0islxh56t7awqaep6n2vk61ibblfng05uc0d6lqmjmaxc17jw73sef8jsm9udhggh03ahh2hciaeu01y4qlw00f2658s078eyiim06dyh2tyjvxjvahsvdcyzod4fba1np936240whucinws12zxkypvkt8zt6jii2y7ya3hxbihx2q3xkie4w4fe8ac14ypkmmrapz8b32z8zo6jhux11t8i10jjsunldy1ceahjgl4xdrgp61z3tgtrzj4c6yv49s5caet2tzvl4m7dc3dq87emn77wtbajj5a19hh47pzcgf9c49oa6w3ls6ek6pmybpt31j08dwqreu5d1xku50b38jryqgms1pnoc48szjjluuyhv5js3dfqc8sxgdrncauhiot7h63kvj4q69vp84vco9btyz9wcqupe7cshvhv5g9b8bed5tdfcv3xavhonlt81wfzc50boqgg01xo3vhn92cs6lk31n42k514429t4k54b3o25qlt6iatd15jng0cgxpbf0cbmphi0qqwrcqy5ltcjjivw0uic5tpp9oe6kqpl3x36xdxoea4bdxsepah6hfbskw7r3gi46wexkr2ockmu8xeylsb2y6gh25v4jnlou3hrr4vv3a1pmsef8bzr9zb0b1ebfo9tlt80ugls2zp33j7uw8ju45dgau64l8n',
                mime: 'kbngkq26tmz1bmyau0hxszvq0zudrmf8ifwcf9kwpiyjzzoro2',
                extension: 'wlu9v1bbclnu2cui3p905l62qrjqunwk98j3q7zykqktw0o07q',
                size: 8981621694,
                width: 254031,
                height: 692431,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'oacy0zl94z9mfhj4jj6tw1y8h12vsj9j4tbslulc3a94geow7oaqjh6abo8dxczbvypynks2xujjwqchatzypmu6e0qfoz96waywvjoo3bezna8v6tqe7ib8ow8h04h30fui9fuoq1lwbkku68hurrb8k54dyvj3nqjy2sp7cr3sz48hdvggq2ykvtefah2f027pwkdq3m9q6oermyhl1a0vfi08rc36glecc57x5t435mxlldbmi5g5td42gzw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                attachableModel: 'wagrglcahxmuyib58bbxzfa4p3ifrig8bf8x2zep8f7g1lgv5aameyjhqfllp9au4ozrmbpm3pa',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 527370,
                alt: 'p5szr79ogwkswu5al0vzmg1brbdp18a82wg8lmhnngduglombrdf7fptdiohm0c4epk1p91d0729a3kx1uv2kxahejv1hqoyrkd2node4ql47s0xjnhl3hlmivicbjueupgp092q30pgkmalqt2pqhaocxryx7eu9ltvnzn2mkwda5l3tr9fuui6xrn2hfftb6gmcizb6f8fccgnnzlcsje0sk4jlokcov81z9t5lupxy56mrupgc39vc1j15of',
                title: '7a3uq905nhyk2e764gue2z84zrqki0cl7qq8k508jirvkg81x806oatwplaqyiou8x0fx0joa6fc42rx3gi28wnlzpjrqj7uog64qu5wtw60v3r36eagqomzbmwa08ux1t7o4br3g7fln5dpd7786chhbxjj4ep71rpoxg82gp0r8hs8scdkeexg6k59mdpdmi48d80yh7dw7lhk4k62uqvmnqv5l71du7fops1nbxofch0d9v7ol0cnj3x8y3z',
                description: 'Unde repellat dolores fuga eius nihil ut. Nesciunt est qui. Quia reprehenderit reprehenderit ut molestias sint adipisci. Enim non vitae sapiente quas sint beatae consequatur harum ipsam. Magnam incidunt ut minus rerum eius nobis et iure magni. Quia quis et explicabo aut dignissimos eligendi quo.',
                excerpt: 'Consectetur et ipsum sed quis non sequi dignissimos. Ut est nihil asperiores. Ea explicabo assumenda magnam ut qui nemo sint. Repellat voluptatem consequatur.',
                name: 'bcke7szbwo31eldltn1wwwco8ir17mm8uopzgq6d9lbvvv3utu13d1ntrugk92i4l7nrdq95xbrarglp0u8wh1y61ija334xrz90mpo5im1gr88fyxdg738ldju26i52izrsf8sabqjousumiz0tvz21yihus4x3w804vgagoocr4bvcuupez71sf7eubapufpel8kbhd2ol0bqfu3js0nkgqgkyipprdst5vxj9ao2wh2dy5w09sqf53cnx0jr',
                pathname: '3v0x2zbkgfs31ubmjpkice6j4xfn5nkm2srkcb8fp2frcxmiatg5nv1x8lbns9c3de4am4o0dljysw5wv71kegtb67w8nea9x3laa138nhmbhqdndcuro20jf5kgthmhnesji8digwm46i43j8q0e1e18svwamr34gglr2z0xutzb2oucjcxcvkvqnsh08x37er3ybydkzu2db8yivzc4guvs78d3fdg6qkq7pvdfzgapzmobp81sr2wert8oe8dh25z4qi9pmbds0udbqtgeq05am3nqn9h6ekaekymdjzxxzx7wprg32aqfmfjyxs347pwb5nnmyue7j5p70xstp2x06hzp1m4iim1e18oxvrxs6aqz78ykwrg04s64lgby829m9a4s7u8rb7w0fvqooqw8jrevscjutcharvcr5o4m9o4mbjclaagd3gvgxf9f6tcef0s7wx2am2qxnmu6msqdspubljx0u3h3gd6zgle8ixwt915tjx1aseubk0fzxc7gp8mu9d5fzf2wqrvq5atwrllzgkin1nvv6jfhunxm5fbyely8th8j5dhssk29ex598c8h9wawlamxp21bw51z5w0srmor74flwri1rzqezrunq5hyhdw75b80egsklny1tldvdohiu22u093u2mdcicf6emfxv4jm5g3iauguc0gg3lyjmlyeiqh7e9ry1l44l0m0hooprwiaju2yl53f642z065sodrys1098xdqla0q62dp3xgrw4p2s95pirpicg653vtd5onylwlbdv07v8mbfxzfhm3urlj7tx4es874yq1efrukx3cx33d040n2ryksfy6uoe8e9lr7dl8vbqf6zd7ihjn784e1qvkxuu4u1dyyodhzmwh0cbb2qrwj55hjf0q1jgmhh72ruzfo39amk6fksiipx4kt57ja81jwkftr6cjjta9hgtl8zcsjzatt19pg583zztu7oke0nbnxl6yqqumm33yhwr19idk4kelwgaovis2jwww',
                filename: 'fiit7ii28urksdr2x2ojkqngqrknmkt4w0jyjbsi4vld9r6wqc65q6p92qkp7dk8zzkiv6w0rkrse2qdf38zsq9afusoabfggom4jq669d5vy0s5uoi53ududcibpo4z6kx0qhuoqjvdcj2vbhz8yay58xtr0gr8ugpa1pgg2jraghvhse6vkys27b65q3fjhblnc7njg5rrp2kj69o3axmrhm1mp84r9en4s3ssjaxbxks6t0m1gzrke2sf7u3',
                url: 'gg7u8y9u70p1vqiqc4bjnf6iytd3bjwmp3y37l3tv6sztxgoyz5lkppthan4urljtcgm9iuentwzlgfq852lyat4017elttv34cvljvp4lvhmlmp15bq3ehwkr0l3h1penjphisqj312forowyeq5ulhoc6ziv2vk80nzhfzlhwscnftar758mzpskn2tmwdlje3phsx5gyzbjn5fiqg6n0g6wgiw0vgknis571kl0kv9gg0lg47fitx3e0e2siwaq5wqks9x5dd3cn5587ofzjjz3ue2u32g14ty6y1cb099lrql7c31jm0eo1l45u31nmc0if2kxshfbsfehs7541uknni35i6gl4tiusnp15krl6r5zls7lyt2gcmggut5io5bsf3pa6su6dd2ydf5cer4rtthi8bsyry2orvnlo65e3gkg7fnvmm3c0ykfrip0xfgfjprzagvh7r90ppgbxneblb1bsen4snsl822f5rn25fsg1plb68k6cpmuy4wrvnrwulr676e4lu9tyt18yud1p3kj10xbdjr66348e57aysjjxwkpkd69uinta469m6264apktb2la031l859jq5zpo3u7inhv9x8km54quj2vqhkqjkkwpxnjenn1z2e406vtmzwh6pch5ztst8i2unvekooe7chamohpr97s4g7nhmmjbarc4gc7c7kf0qtbv0iiego4can9gljn0ndv4699y06m2058xkw61sm1siteg413b4ywd7rtgeol4tg4jopmeavrxj95fjlzw84h1nwtbvtkl0ucufvzi45oa4tqgbhbpj1g782cuqt7cj66spakeecwx3hnxhjyz6tlg2gj5zds2u017eajb7edw8yckzgo4c9zgpdcffokc8xmop1ag8sn2rlfpsy7vqlayhawkjcmhqz6kvbbd3gkdolb1ky3lxveou09o0yptaiw01clihgsnxc24y3nmxgnv7ophfomfn0skxtufjr4zl1jczcj7ghe15xunlu04',
                mime: '7jbf9tfmnqeeg1m9dq4zjqb2mzn3pzgrn6nz36szr8eap4y9y2',
                extension: 'yn1um25q8tpnafauf7yxpiyyqt7o521khdrt846fydf0aq6rlu',
                size: 8870474638,
                width: 842158,
                height: 941708,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'b1qm126y113xls8g9v8nyc4bzj3vx39iu05ft384aa37i8lot41uv3ekpp6j7h8fmmrekgfpim42g75h8cy6chdnczwemabd4fccjv4644oxn9hlztbsl5hcx8y8goepyfx8t4td6c0srwkq9up2ftn0nb0dh9iqw5145yq6tfroer6fm4s9nhwnwg7vxs9jyjwr6lchama4hkcr2epkpn9ce6rz94xepthclnj0trtwwdia3woc0irjintcuy9',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 414759,
                alt: 'y3hed8dpjkc334nh1e3t7psx3caxug7erc068f9dqsn4goj30d2pxxbvvp7nodh3anw303gll4mddcx84qxfzhemmgniuznpm696g851qsoqc8t9xo7x41bgxk9asxwouc762u734apx0yajypc7af9zbdmxlh0m2e5yzvhnk53dw34rj20lzvglle06c3oybucg9hwbgztcqqecebog8vjco0ahoukhmvbuihmod9k2wjfqyqhtfii4sjf46e8',
                title: 'ujsq3w7f2k2vsmcglc5nms6yiwudqjavu7ri1trdmn9qr91c2zlm16yb88eqeh8crwht5v88otxa90cgse86atfhpo3gp2qekwog5oi6wn4prxv5r1iciap8igbyu3j6pmf80e7kvbo2t155srxfnks8eocw9senba5zekwpb1vlozftp1l2tcu6n1lydicr1508n926438a86cl8qjcqaptvnuzvvz1y1znpp3lk8lna4dh9msbfghwh9xsqab',
                description: 'Facilis quia atque voluptatem neque quisquam. Laudantium et molestias nesciunt provident amet blanditiis sequi ut. Quasi repellat nulla ducimus magni quos veniam omnis tenetur inventore. Vitae iure perspiciatis quae qui dolorem.',
                excerpt: 'Similique dolores ipsum enim. Sit excepturi enim ad omnis autem. Voluptatibus odio quidem explicabo consequuntur nihil temporibus necessitatibus odio ratione. Laborum aperiam non autem deleniti.',
                name: 'rk4quo4bg1fo53da6oiipexryfbgz0xq7c08wdsqylix60zw6bj9099uwpgyffe202g3m2am3xn9pymh5spkwppiy6i3ubkbjzxq68rolmypk8oxgt9qttbh2533x7krt3yik76rsa11wt8eil0itv5bd6byoe8hm3a4h4mbfao2plw2ng9oo4t8gmt14ksodhyrf0obfnrvnu3nwybpnf1d911dlse03xfad20g6a70b3nq56697k916g73lbr',
                pathname: 'u2e7r630rntoinc1ptjonrw88vc52zpegmcuubqm79nr7yuhzzvm54exj2jbfcu7g8vfare374pouyqfe2thtqng8jm6ub6uqsf3x0exnpjueejy9vl3wjjeri1ap9835nx4gd2yy50jrzfloiiibjikddu0s4x5kzyiqoi2prk67xyk0x1p6vot4nxx45cli6v0ge3ixfe1tin5vuql1h74gfpzdl2ydekg2lti1hn6zfz31d18lvi1sdv0frdvhaqcdoiiqfr68ex7hvfavkxenmmjjprejs2u4niwdzu6xex0y72nwva1ldx14nplwn3jdxyweplssryx20e48ands3zdxv1nkzv15po53l5qjjn74h9kb3bky572bh6v552dmncv8a5r53orvfxe2ok8c8lobsvlj8pbqkz3qlbn79ksldws13t24x9q17mwxafj1poqo3vlpqij736tfttf1gm1i9xbaoi5dr5iww9z47skvbtgw0q784d3ybl9h8wtvizkpebggns5hn07dk02ntzweezl02spvpzy1lwqx6vwxp192l9xhcj7wglah2uu3q2eaankptzkzwr97sbcfwhyik0091qrj1l7d7x6idten95iztu1407rxomknd2jhyel4sb0wddrufvsu05r07e7opw9mb0yazymakhpnkneosm9fwv297dmndybvw8j6k43zcg1tpr6wvkvarqwbgu0z9r9tb3ijwfvs5e91oy66a7v0fyiw1xzm9zub65s33z710578boxhs4qw78234vh2fmrklo73tp7g1g8tlj5dcqyit21mqu7oosdomwrc64g2vz0zsadpkg1f1gyaa9s27d2t8kxwoaz11mmphcbzjl9xfsv6isr5e69owsw6m9zunx8ujbiwacdlgk8wyy6h30zicg8eg6ytqm9cra7ni5y2mbrvegyubqv61bym9hvzb2njs4ktskgjrzrj8dowr1e05p4zktf3l2lgf0dcenz5d9pz49r1j20',
                filename: 'ds7jdpd8lhxo3xv46jaxn56hxl1zrqnzfgkgjf6jr8r4m6c28smb7afc4dxkx0prr0z36nivpdvaa5ptenfsiagrvomu7cq8amfz28xedjg70ha3rd1gtmbhvacmb3q773cc1mt5wk7ksfslpurqqnup0oamm5g6frqxbck0fq5di4s57korcwvox3ev4sqd95s621g01d79qefdqbfj6ynw49jqzj9jl7ku0t2eh5xh0959pb4eawsdk3e13so',
                url: 'zngebwhtx17mrz3otdctixpd2ov684a7r7xkj6pofja6i2d4usszso2b6ak7m4b268oyp492uessxzfl2zmfp36ru8tzxzkhfnq1d9pwahad2rr6bidefeduhpgl6ald0mnobv3aqo04slccfsvmnzsjhcmezacxa6285vxs9dih7ldww72jak148y7g8qz4oeer2px4hxmp24cvvf1rox82dopifxbuf92ggfrnl22wg2tk9p7vtsvdrevrwxynfy07sjb6vfr2jm81y8e4fc8em6u3pqaenpbk14g0mbsh5elre4oyjbycgq5akizg6ibbvxdy3def1w6u2fmmg9cggb4gksxf03y3las30n4x1emdwyslrwqlukl1m32uq38q9tgkq667i6gn90te8kolbwooh00wyl0pcbc86xg3yfqt09tz9ke2gs9ktmwava510ri5p000rruqsj58qvtothgsixpibs5hytu7xxhzgoipphc4va4mk8utcbpkl5wo8wabbofmdpxp3vdxfe8za0raoxwxtk6zgzywb4nbifk1y3qagnc6osvnfdj8zln987ccvrei10j9a6ejvu1fsbj1t942tgeoovq81crl95cplo55ixe1mepsgrqkxr8janvxgtnei965qzkqj53hynxwdemuiein79vzvftzkfi5663ywsojie3er4wqy6r5ybn78td8yrzgxr5gmaye4vk5vpv59jwzkaj9bj9a9k5qeu2vu21knfngd4bqj9pr0ufi7t1x6pu3s9z33ar8uogentpctbx9kpzkfqa0oe81jw05wg9u7x1hni33tlkjzvhzyu2ds2aqvn49myo64yf149w0pkvz4mlor3woqtd4zvtcmrb1tg3903n2cmz2hbm4p4xp0fqa9qqbzw4ptkf964ujtcbjou8e6yobc0u52wesrasatj9lic6r3q0mcfndcq8eih36kn1zmtlenh4o5xm9mkxezyrq24mhrlxfnfw5x61imds7bmo5',
                mime: 'jy5nxrdik5zuw1w096nbeunxdpwvleb2g4uhs8jjsxlqqpfyv7',
                extension: 't6mfg3nqs7jd3pfdrpo62jp77bmc6f6lp73ju69kyie7yf7tpr',
                size: 3498538792,
                width: 474403,
                height: 782750,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '2w2br8g1od32jp4agf4g2nqand27t2s9v6trdsgt8cssphmn2coymrpv3ppoks1h1lvy167hfzrizg5k3ogwirpkk5b7totjof08asnhle32tabzljb2l5k0d8gujihst8f46n0g0hr51r9kuz2kwggo4jlp5qdptebakag2qpp0912rmdb3vxzgkal2202yffav0ptgm4ugbvk0fyur1r51tjytgm7f37oqqxto6o57hri0n3yo3y1tbn9jumh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'bw1gijge9s0h3nhsnyonq943ejj5doil82ca52jllbhed2ep5hptlyv7kqe30zxb3snfginjr4a',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 646476,
                alt: '9yy8ydxuhpl2e9z6jn2qq404kwz0fmmeafqi31oa7plvg5iy3yg9dd1h0v8cf5n69p420x92tosuxz25w7bmrglpu6uglija1260cd8l0s90mf8c6ntruj3gi8b15gpunq5375xgngizq5usjwbxcuebnewmy37cft43g0309zl7z43g5ki7858urhpvq0xahu0bndzf0v2pzyob761np5qw3ffptg5mljhe1l385xtb4dicwe8nrr8cpc2prro',
                title: 'pwtlgnn9mbvfzrx5qe3o6d9jb9thzmtk42q3nnc10kw8ix5kzevhb11if2fkexc4k38qzgx5g7mwfzczx95b1803h5hag0y3okw2sgijj5pqrxl0st9tpbc46hzhsgdzkjhwahpauvpk9sv2ppne3prlt7687appi8l98by6ivmjjpskryx4bizju43cg5khrnmur30e7rguwvn1udri2ge1uxmsfqrk583p5of7s85s2hv3fn24hixhiv0n02y',
                description: 'Architecto sint aliquam et eveniet similique itaque et. Quia ut libero et molestiae vel beatae. Quo magni repellendus non odit voluptas minus esse amet. Ab accusantium quasi rerum quaerat molestiae saepe voluptas sed modi. Corporis nostrum inventore.',
                excerpt: 'Molestiae provident nostrum maxime itaque qui rerum. Est accusantium corrupti atque. Rerum sed illo voluptatem ab laudantium praesentium pariatur qui provident. Tempore et accusamus a consequuntur. Doloribus ut quis quos maxime temporibus asperiores.',
                name: '0k1dl9xkz8h8md8z71h7brhrhw5rom05xd87hxqqsz1f17mt2atbhf5jp3qujhca4oj8xz3v5b8x9t6n82dno2u0n08flal6u7ef9h6147seo72dd239bjpl00kp4sjbferwf5mcgudd5joun25q3abesl22f2gh3k7tdbqwc16x15rlhevqk8j01uqlhyldhz9gnpczs2qesb36ox1ttpe354euw2x80qbywm38nakrpo04hoyyegqebfi80he',
                pathname: 'x3j0nvgmkhjefj8dofaofh91hbxv0hl3l2xby96ebfkd2jpo35z9s05rsyxppxx9q9ayq5a9vuf1ot8hatxycl0krbi2gzrdcj1jxw7cgoogf80kxcr8rck7y7w4fqii86mv0ct1lybazq2rlqtwdht04dmbwz3kubtux1spj5m8rypm2owllxaqyutgh8t6q3x573r4db9jurzvpzl0jghivo9f67ebwdyly663u42xygie7zde8t7c0b757hpoadb7tflh7kinspwngljyw7jy2ih2q5vne7s4lajphqvwatsyhzlqqz1nazpdwn0bqxpgu636w4az46apjk22jg62hb8zwcsnly3zumz30qiqkagbzm5a05no7hj8mcmke9dtt18cy8vdi1n30jrw2n3wpmygwq03wy31441tdg6e01tn9oev0aw3kgfygvy20zwz7h8vavbq723t3vkp596atmhfcn1umbnmchbju9jgl6njloz9j8i7rxh2bzdvp7lmpguvxpquyx59hrctcp0bcwexing6z441zo60ra8xdoxtft3qw39r66mllf0977vt3zshwnkuzi7xslqftc3c6ntdter0ew1yxaz59gzuvfyw29ey5oe8uqiphb67bgdb3s0m9qa31o5ulid49e3daqfl3gk3rtspb3irklzekjgbp1qkwd9quzr5phu57744x3qsju3o3hry1pgow5atmzpwu3w1uw6nzrtbstqsxvmys8ujf1xcuu98h1y2p4hfkdinhjwssftjrippkqh1hpr4l09g10mwjjqk90zd2zxt1wkofphhioutgt8e1csrpwjoxrz2qb5fm20tr6ijt0opkzanc7dkcl4lmosz3b8svq9b0zff20qu28gfhpzsv7i82w0bfopy79s2eh679w1rhimlrn48shtujtkefdtfv751hk3dijbhbt82z37jj6ahd9iev7efugbkkq93cd5jvd3k307s56ky1my1qffowtcjrcv3u84rpxd9',
                filename: 'bckdhn1wbmnysdxidro6wf3jhll0mz949xmqf6py3nk31hz0c6hhwk03z4xfwecdpyz1bo66fx2h8cztn5fxplqedc8nqjghi9jyi7v8un9h7zrl7cprijeprhmvj92s65lipt8245qr2a9grrw77hs19kw2i7wfhimzm2wd6bah2k339tvo9srjm9idv32yshmqd152dn5bh8m967jl83xye9jy3po3cj64665a3f0pzdqd9trgxiyhepy4jpb',
                url: 'mdl5mvhxlvki1gyl618qhz9uvtujtord0a421qkspyhstbnws3dd1rcccjmck3h0zr7eeaahtmxqo21d0esw7mahykxjflfuymzv6wvg3df9ij0jdnt0kew1u30xdq049ko8kdrssl3t9bxvi093pcwafb57opifr7ipkm7i8a18akglfmzw3dqqvjfecuyl8oymd90fe89w2vjrdxa5m0ldlrqnn4inqghwn39s6bu38hdnropxj02ya6h2lgvlt1tlj9f8j2u3y66dsq2vt0gqjxtprwxqednba9jis7bew66vv8hmgnlnhs2hz7fc5s44shxa9kiokz20sr7keg69ao3yoro1zkuqfgvx0y9xt2imp97r7bjrqeofgp7191l1yvvmq4z1liuwejv6osg3ycgs92ap27trr5tkszquwvp4n5cc7uliny7luq2goqt2loygcvpkkn1csjqhu4rci6dsn9p593cbgskopa7rsby7kd6e43g5j9fh9s1bmmt5ltcglxlo7h7cukegwkalj2uabnsme1iyotkik2k64vwh4onwdg405zdxdwj2sa2auzejpkhmijh2nprs2xwzmucyn8nvxdm8ft0itj6ob3e8ovw23zjqk01k47ozfnhe4r34x6nviw4bw80byctsx6llsief4tn32jtso0s0j6lu4nb1kuaz5gk7z7q3e4zj4patj7ib1ktslkhkkiocos3vd94tgujfvs25953f9hm1q1963of95nbg5dgiut0b1peg5z1nebyixs20j1tpehkof8y9vhmt3cao66i2sxyyay6h2j7gz9n9g1a6pcb9vge72iox6mewjdr47g145xbxl55y6axmnzfdo87udlf8oa2efgnblk1syi3c8k3wvuaihzkvw2ewnvmy4d1m2g0xw0s352d2zx1dpccih4t3roy5kr9lo840e5a4nepnwuo0f3h7icp85shyem849z7r9yzvx207prwg2qqamro1mqzru8zqmtu21ek9',
                mime: 'f13xh2kfnn4vwco0783n895ilch6zsc6bfsmpqb1745asy8wsd',
                extension: 'ak0krwolztid0lbpkza6wdleqhy60ehr1gsiu4bwisfwjq87xv',
                size: 5798323673,
                width: 893973,
                height: 807356,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '869qrgx3z3c34qshc5vf16c2zws31smkcic3uz6d5wa8d3py1lgx53e3sn5z5uzvt9pxv96x2pfvooewcourfbbxdu5upgocq2uz3xe7537r5g14iui173e7um3si69i9hn9nrvmt8eerb1vnr0fw13owoafkw24j73l1scnnyb0aovycg6w46ez2dha86o6c86cbrts8nogbhvb5zk4i2ch2man6j7hsjbt1cg61v6h65h4wcfn2l9j6cefzd8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '4jr558olah75f8p9dnioluccmhctcja2ti33js24qbhqxufti1jy6we23aw6zy0yp3mmmn8b84m',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 402464,
                alt: 'vbkqaw24xgj6s8bxm3sav3hy0jdkeyzff7ej5nxxis065auud7m9gig9mjavtzxkkqgl35ycxe6ex9c62j42krq4pple6i0os1s4cx2li1jcze91rlsi6fe67ps8an4pftjw871fgkh0plzhz8nrs6ftw6rwi9i3gmcd5qw70tk5065rbtdnfqqte0m1u79jeyqmycqx72usbgrx4bbquic7exbulxldt8qvgttjbskpmgpgz9rejma2gtv36k4',
                title: '7xlknrdkzxm7s3jzn2pnllktkf1sbglslbt2qci1gp8r4pczwym5fmk2myyqex20dt77fu8spiarts1lxyo8bshlfvlv9462gbji6borg9xaapi1hatb497n60y1rxoa4agkiqvnq80zbky9rafydjf1x2bs116aywpk3d979g87fosz06m7l03gddtsgwt36pvg7d68rhdqhxahbnjdfbknpqnh0iheroiz5k05v8usbqpcakim5lvj4nbeep3',
                description: 'Sit sed porro vitae culpa suscipit et aut molestiae vel. Voluptatem corrupti ratione. Aut necessitatibus fugit pariatur aut.',
                excerpt: 'Quia vitae recusandae in dolorem adipisci quibusdam suscipit sit. Neque adipisci et. Minus suscipit deserunt et quia et molestias.',
                pathname: 'kfgukboywginch88ev4nd43ob4hvnelh9y23l62kovt7492vbl7a1dja4wvnzfk6lrjy0i8q2t2gseqk8qsvjdvueaa5ka1umibt7s5knga5spxctem1m5wnpxegnxck0o95s0d9df6r0wd483fr4d8nwqexcauk7id4v0froj6n8fakezjluyli5jdoehjnn0fkstv4xia6prze7ptffplu8t1qd4cmorkq5qa9qwusn6088lpzudcmst916qtqpddze8n3ejfk889kt70lwzpx77orep76nlnvkzcfgrd68cdz88gpbe6jmcker2j56yhlghz0e453ae0ijj03rrlv9217ax1qnorm2ekbe43pt2qih5z3nrmb1btqj2qsqx0kz90pxh336fiiv8gwcpsrl7mojbn6i1jjxt4239zliy941z41nhgv6rosn2p9ysulpbt9jf3dq4367zrtjnvkwna8siqrhwzq4dwejvof6973p7imljesu7i6enttk3prdbs0jhz3vesi0fkj4nk8ktpd0p1wvvbtktx24z4e7r791j7v3ajdj80sos5g03aw1lbd77gdhn8hc88wricxfex63tbq5u2d85sugidbi4r3jgej4a3kdelk7flgj46h7jl0g8sf9mxhsw8th4cpz3cpqwtlpycsm11xgr5ha3zrj6r8f0fm3jpdrcz45o4al0enrw7cub5tvko6y3lzrby514owbla9lqietrr30ezotyxg77tzr70rynugizmuq3d5t5ui1x1c6v392w9hdka210pdsn4p1wvp1nu5stk9ow2gvnqz49eimjd8ad9fp3tg9e9i1ycdjhz56z2bl52yirxooabo9evrixoxgqqgoi9vfwqopdzybaipmofkxltafsenlcsswq649ev02z03hd68ejozg1uij7mv3mzjxlq7jfswnt9ptbfb8ywec5hb10trnr2psda3xcoec1pvlxyshiigjec1nqo49vaynhdo3bvwfgsh9d5r',
                filename: 'zf4wu80ihutlim482ms1i2k2p5r2q88lxiz8p2q97pg0khw5hkjssi8xqgtpnezy7m4zeyrv8tmt4u7g5npr0xgrp5hhsmcop2s57chrmtowv0h2666xvxf1f65j4vjguimkkcdw8b2phyg4jr1yuqmm8dkeagdk6nfd0aaonhqzefnkj09vbd5j1fj2datw78ihcoh2jg4af0a1kvll2ilgbfo9xdadi123lv4rdb49thvoww15ab1311uo9nd',
                url: 'vctkar3qp8gy3bma4zhbzpaxjzy9awjqv0j33e0n7ylthr2ab4ewnrftevv5xpe46iusz8d0vfqs0fe9qtchm0sv26muxrxvm9fkhp7nmputk1j3sc3ooht2275mayjtn45v4muk6akturwhh0uv1x201ouru75gfy0ftv6rq27cev5dcfi9f7lddfwtpxgp8yo53lyg8n5zjpkdge7qqagby97kb0mm6pc0n2zjcvkp4pvpintyymmv8mm95j65rf6neoc4z3n8o6fvp04d37757ndlj64c7dig4iakd5iqye5e67h8j4wucmobfqjsg1a49ftrhdac0jsrg3wwgg91eoch5e7980n22thzkxxhlje2zqwrfbos7yhjm4cqm3f096pnm4apin0suwehvmqd75onahx7zy6d706bmykypxd0oj5r16b75h0fhmnzlp9ij27bzcuwand4v69t0oqoof9nah6v9np1hyefdbllf0lax33imbsmhsj32vmyg9ci1t8jyuxjr033527hb0v1lzt4fnctjj20vrvtk4p0fyy9g1xnrzitm2i02d0j12antt95mygrddjrnkkzv61decl3iseuda990yzjbjosoitiasclt7trub4swfok9xi9wy0eke617bcwkoukf0ftsgz0sw85chbjherpaxl2afpcexdkc2fy1de42oqm5hkx52w0eyvf1o8i5myyn7yn6l2bx0jvdkw8o9ic0lwla66ja3h4jnls5bw7jmp8yu0l9x0amfncjraxg9oeih97g3zmzijnrrj93jp8oduf785f0ezjo9jjp2v2cxeqlzlqgtaxt5khbgto4soou19jlhrzwv0b8blbmi7lz2zct120fovuxmoklrxqll1gqgzd4zbfmucryo7d8nzyamv89p7qst6hxgvyarnsymr6f1ba7isvoxuh8j6uvqw9ny83feh7enb8fg6kuejw8hsk426jpqsnudk40sg8r3pqvfji5z2betwzrpncbhz7',
                mime: '9ja5fuy4vu7l42wp4b7b62gm4ut3xbur1rv3j3v23cdig3jq65',
                extension: 'oum6fasm4xemmu7z5xgkzccowau8nbn8fnnjeb7xst23zpsnwk',
                size: 8582242554,
                width: 760664,
                height: 868334,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'jp2h9yezwl6dl7mqlhzhh9lw19c5ag0iulsvqbd7ojd4joxzb7x44n2ilnvg5lalq2qf12limwcus8tft58lq3djdhl6iqum0uvyz9j3mzjm4jg62s5swrjk71k4ibl10mo2r6dur6xqbv0ruujdsaw1noj10ezljlxmannm89pna3d0mbdou8o01ske23mh7fd17drnk666cpkahd0b1vs44i0zr0nkdi1kf7jh4rzeh6hy962imzp4fcedzsy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '9loyzt2tipl99woj86tamd5kb92h82nd8lhcz7e6ynxf8q725pn8j7g7ruriwsjtszjffpnegi5',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 513826,
                alt: 'wh9k7h342cpguecnllc0e4rvktjedt49aqg28p4135z11vlq0urjjkc57dwuyokbta6brxli4m8tp0xd2hz5e91qe3g00jr3y3jojogyalicrd7nadpxyr9p92nacq3vngzev0y299la20u88xoydpavvnv3l3jkem47ljkqm2rczh697x281skb0qg8ixsm09u7wpkf4rsq72yi29m8emtbabhnzqqifsifnsjk0hqf3i42l0bs28y2mvuuhbz',
                title: 'j61e95b8jej63ygofpl30xw7g1rbij6lag5um23kskoxg2z8n9owsx36gep04xorn21kpo4wrf853wfnp7g8daolzf7s75d5w34lw3vklin62o50medr5yc5my1833wg0yjryrrc6skgb1uwbwebjhcrlq4d79009oh92qmd4mq9gq4s4x9ld1uv1ewndhh2xo3bqxrjntdi8pf7sphorjee27j2jygvytqalgn3z75i46wuz2qsrpxa11f1tu6',
                description: 'Odit architecto beatae molestiae dicta eveniet. Quam esse saepe facilis omnis. Soluta laudantium quis est commodi eum soluta et occaecati mollitia. Non quasi nesciunt et perferendis cupiditate ea molestias.',
                excerpt: 'Placeat ea quis in corporis harum in nihil esse omnis. Labore eveniet pariatur unde libero debitis dolorum amet fugiat totam. Est qui aspernatur est sit amet nobis incidunt. Possimus possimus commodi facere velit temporibus odio ut.',
                name: 'l7k5uhd2sffcswfmvp1qm64xhcpmu91z6n05tucxsvaci61hgn743brirxn0gkw8ete8o8sq6mbxh5us2vhs29iidjoicwohadgwdl54zma3ysg547l1njqlxozwfequkfy2a65t63w4h9iydeqfxr3ioqanqgpyfbovb70hj5q3hjzl1gzl2tgzpruts6r3q3xwce7rh8hrlzbzikg38g55gwuvxpcqivqjzqhxbxil036xb6u8ieg7n9qbihr',
                filename: '1dmt2l27zw55jnsgmhrlor3q2izh9m2ns04kwt4pfj2yhbnuo4ddpiq3rrvb2pcxwu1oal10lono49byj0v9n79zcal6567l77pxri7a4nj841chc8r2r4uzs954abhbj6vpy5624ccj2gwxmm8vwvhrmcnbw74szckkqlop9yjo7z7uj4s2nda17m589olqn34o0vq9ibj3zru7pll1thpifzrqk29sf63gn9lyaz89x0uxh09ewmrgvyk2y1f',
                url: 'v5pvmqjcfn560saki97g5m0atm2mjdkj3wg9ao35idsii1iok2k9lcumui7fqusywn2xz63sjienkkmxdm5xl8lj5iw6gjsveocjf0n55xp2ujyuky2aplg4r3805ndqodqkzp9ihuftdta55sb3vc40gzw6snstujgt4gfp9uu3sydgobuab59rh70dela6c9hnqvk7it67gpc7j53tlir1re3m2jt3rqu35f0o6dy9nbs6o1f6ujyy3sca3d2hxz8qcj7dxfd83iotfi31mo6fp1rw9s9jotrm5uaq7zt0h0j653jobmm20q23hdqyd1vbt8v6t9995uy98xqi0z9lj0crboh30r1rmvehn33c7kvxuobc6qmagzpnmcrxpmz0fs3czotyn871704akcenpgosvsrh089p5ug6iiea1juxfuzn240p80p5k1fbq1i2fc49gkfev9ks4m5og27b91gf66ktgn15hu11lk4oppp1a7dqqgkgcz2jqixxdcjlh5pokvh5o7nnnve6nejhnhjldc96u2n5k4ah1k183z8bb5fgwmt6buk5g9l03nu43h7s4f7rxauqg5mj21pjc3geb02o4g62klico9fkdzfli8ek09jbwcyi4p618uxjrqevqu7facutmh0g3kk0uwm9m0n6i2dhsgpr3yurnbcxszolo6ia8spr5xbw885al7st7r45fc02264dyco3navraqb3bz613obp7i814ei3u5lz1yq2dz95fwrk884r3guo4fyudvxbhwzu45kpckrot8scs9szn2dnin6zsmy8kgcu2zp87iq7zs3ziado5xhifh8mzc22xcs3ju7of16ttjqbmn78rdbizd43yjq5fbogw983pw3d3djndqot7a90flygbt505gto50i38jrhvepczzhlrh7v7f9k4wd6xznaz0cemveilcsv31dny5dzmbjs59nktoxa82ydhzodkarpysrqchixf9bvs6hpetsv69lf8r01aq0r',
                mime: 'vyadv8g6cjqkr3gc4anrayo8205ts8zg7fqj36gkc6zlt5lk36',
                extension: 'luiitwrdkpieyilp2l7snxeyqv9xhqzwj3nr09950z6b8u9pa3',
                size: 4382005724,
                width: 511654,
                height: 490680,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '9um404iyp8qioirij3ws09a511b88vn60c1vv3wygdsm3085jlmtbol8dpyaegnmnqlrfz1rmzaq2wzugfvx7shp5s8wtp6bq5anxofkkvscixfxma2r8h5wm28jt1gyun21o9lg33a4668vb8wy2cxt8lxp5tpb9eyki1yhj09v5jh673703061jlumu9xq63ne5w2n8ld7e3b0p0xi5q8hqfpma67tqqitdzwp1g0b6iwn64593hz6l4l95kr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'mwmwbg70shwvxj3f3f34efml8c6lcmplpry0p9kpnvvyw9rj5z4thdvck9175wftjpeik2kelbq',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 590879,
                alt: 'r0d6bfhmedulj25zb93q9xoanhbjxn3yky3dt2j60oa4uflpp8c03vwlaczopiy9ifixi98pxl558zavfx0z7s2ivwidxc66r15p3juurydg74bnd1d5pscebzkt2q7xr1ycak9gw8syp7r3t42xhbfwopu3l3zo7z67gdm3329v8zmkdsbi3la0k2o4uydfj6sfwg33v5joh2in89p2dd215087y6mvnrqd597dxxqk7bmovit2gqdb372osal',
                title: 'gymsskau8kewco26w0v4d936y3yyp2jrc5a6ljg8exxchqpfrq8suhuclorfnd00f57djk9a0orb23d04apxerw533c7zge6aq3qwutswablcico5aum329q4ok7ly3d9adlibpzqnjeyp2zlbqk8ipc2kxxybcena5ntx4qjoglblz9b0pcuyswhzipgsynmc1ajgrgz0mbw2xrqcow20a5g8jwpcfvewj3wzcujkqsdu8ocitstblsgk25mdj',
                description: 'Et omnis sunt laboriosam optio non molestiae et. Omnis inventore exercitationem voluptatibus molestiae. Autem ut nulla qui quo.',
                excerpt: 'Accusantium quidem velit et voluptas non. Deleniti quos eaque consequuntur rerum aut. Nihil aliquam at illo impedit quasi animi at. Id atque voluptates dolore itaque officiis praesentium sapiente accusamus quod. Voluptates nihil asperiores doloremque.',
                name: '0idt5n4ud1nwt3amio1353koaah3n4l7u65hmflafiw7f0jaoktr1b970x2fyh23dhqq60162hwymyd5g7obq3we4swo6tusldo9f71o7i9um2citgv51zzfdq8uttf8s3zz0n92an2geeryzrh0wfjb81xx9ilst7qxxiczbj12fgyloz025mr5506wzscvc10z2xwxrhjfhoklds2gnlo23qqy64ws47kgjzpx3y9tt75sx0gq9743p2wbx7k',
                pathname: 'vixrk2fiewbukf7c0453tl0427gydsnwu0dai2lzhksc476sjpqgvhxleon0albtsltk0tl7nnvo1g5f4phwl6ecnobcujmspvda2q076oi1d9ay2clylwsws58t3c1frul48zti97yk55knkikfc4wfh2dtk1hlf1nq7k5h0ceqxjwo845ug2hoza54e5abzsh6wgk17mcf6xbyjmbq8auk73jzz53rqmxgqx8x7zs1uj0679yx05dmjqygnsv5nvvs5ijnnji9i5hour9nn5ptmsxzq9p7c1a3el7memuodt0uxq2w58our7yryoh5wcx3s33inhaqomdpi5duk8p8u4b5dpc46neaigp021roxyuwn17g8pz6nx50ik70nn3wrm0ku7jefe534bhu96dk22d5yzi2a149no0pjhpbqha3kc0uwem6lj4p0y2qky342t23n7frolvl7qdd6pw7z3cbzyr0swfkj3kodlfjh9cokiffx4n9d8009h6spmnsvozukmkhaifv803vmsj12fslb9x326an1hb3coeg3sshsqbn22mbjixyht2xmr80dal6f0m6bigk03vzpwh5cjobxr836ebuwpiqvivjxjmcx7hslgxb1b89ejwqq8fjc9o0c5s608nsiffjbf7hogeqt2gazc2q6abjjf4v9e7o5n08opcf4rgu2anwhq32bq7nykwb0xp37jgjxhzl5ku0xa90dqy4p7h6c7p6d75yevaf79fbn3s2voqbw1b3pzbzdsahtbu3pymu7mhqrrqzg6nyy8knv29vpdwznwpm8umzf0btfwjsly64q2ptutlh0o6e1b1jhr4bur51rz5ehn2m82jb9zdzdbhd21ajzv3x699on36hslp8sx2zgzfqvrwkyn9p892gkzrbev4zof312rsxfftwia31bzk6if7792fcqqra6b50aojnbfvas6xk433dcogjij0kaic8csghjvylb9ske6ppoxivx86xz8v85ekz67h6',
                url: '1gxb9wgzym7duot8q760i81iluo9f2ull3x4psogbsj6sz45qo2qqb6qos7qqwf0ixix9wo8w108rle3f9d72e5u2bj3pidozxqvpsyzpiyu5bapkgutkssrivkm7ho8n6an0ru76sw6g9sjt9g58jif7ei3hs11tszkx998fm0yidk723iokxfhaya2z58ypjc5lzmkm7twggeu6bn97jgeujvtyerigt3pwlom8moyd8qiholrech1gga3ozrafplum9gq1zi2jh3zc1vux7oimwxac9cch28crqtbuixiwi96qucjm0sbc0w7g9n3v82luftfdnt38xgcr7dj043q3e2j1678713gkpwdcuuy5lcafjckkegra7c3zohvxls6vsnstr8xhl70ng6qp50niahgodgajvlzmd4649qmhs11bjhgljka5tu76t3jfkoyx81ibnp7okwviac185k0zakmg9bq1eyqvoe0ms8pf99g6de1obu2q5l5nn9bjsvvkzo4paks82nm3vybbv4zthi6um9a9i8muedv6gt7pfcvvomxro8m0xaxyorwot5d42nx7wmfphf2koc2upi34xan6ea61b51xpdeb75ds4jeabmid3edpnqv0wrhf6d884ds3vyfhku46q4v585nnc0snxiba6042c8xxo0yjwq130m9e7ako8zjsivsg4fh8zaxksjmrr5yl07f2cjl0n5im60796hy7vnaabj15cen6t8wwf8edi01n11jm8amixhdz6r9aqze25l8g1fh494v6mywhkhmwq9pwg22arz25xmme79uehxirv8s0aduikx0aemlgqq8dhljnuuryi291tot90ziop4l27vsefmgksnbwtsl8fmgd8d5pr8v5nfu06m0akhgkza18a2u4m9i7dhr4lik61ou65uhufv1y0jgatg82isyimjekrhqbd1a6g83m3a5ad9smc3b949f0p377n7qneybk8z55qw3x8hyno8rfy69ju73',
                mime: '8m133us8hrxyc4e9ud49unj7cqcxas6an1fo5rop2vuw6oujdm',
                extension: 'vcbklo1upjjxi7bflijyd546mpgt4e4btgiyhrn2bsofaqlc7k',
                size: 1010882144,
                width: 335775,
                height: 544832,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 's4mvrjyjypar9yownnywnmhgvan3cs1zgl3h1ftt7erb7h1j12drm4vkubsjtb4vhorhhnsr4szjk6abpgceg4arp9f939npmie4houy98h4kc6bolvffucln86y82s7eb1ennp51lq9ev8irc48sx16kdb97l4vhkd3xoqbl7qdvi90dn1s1warrrlyrmoltue6fmuif0q7rm0fhj6gyit9unipc7ji0tspdekyufn0h05x4slgyff4ufuwauq',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'oe8woy74omsrp5u350qwqnf2s9cd2w03wn8hiy54ltjhpbsyy98l8vcovd0s9ljwa83gcchdaa2',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 440887,
                alt: 'h27wch79frk23xcz7vnjcxl6dvjo0vejwfrubdoftbad8molmd66jx6ymdtbn9pjfcm84zpygkfks9suv2wc8qihf7sw0a5c5ssmbx4zsz2s16dsy9ukb86ni45sfk391pqzxv7qtd8kn2tc4rhkncnmiue7j5u58jjnqtybdz9kfvlbyh8yizj3aaudzhfuxr68obou1u9vq8meni3ifoc4putnu2gncr9axrczbnbi9wr6xfmnvgze1as1wcg',
                title: 'fbonh7hvf75ht6ge2ce3rp47y0684ms8qnnfng93xbhqgojrojy24fc7qnxvnibfui1hc1etjqvk597mhy6mv2lvrkxwk0az6g8bkroq8gudxh628em0gifoukdeqddnhjjxt6s46i9bbazrndtchku3yhi5jkn2gbrzp54hqb8hj034czahpcp2hvscwhfcgx3bj1mobo1rpduwdv0i8ddobxfuyw302rol85ae7wbc6pj5imasysac8tltf7r',
                description: 'Quae enim magni eaque adipisci ducimus incidunt. Ea esse dicta quibusdam a deserunt consequatur est. Dolore sunt non totam magnam voluptas nihil illo. Earum eum voluptate eligendi doloribus voluptatibus dolorum ab laboriosam. Tenetur recusandae aliquam qui ut tempora optio ut quis molestiae.',
                excerpt: 'Velit et suscipit sed. Placeat dolorem nesciunt non. Est ea odio.',
                name: 'z6zpypmwolofn42h9iut81zv8boe6o4n0ixoev5legau8sboomapg73abfry6ke1wxohkfqnstfigh34xy3ngfptir2yo75bd1sgh0xncoa1sck21pmxi98l8mso3kqufo7in43exlc56kwb8yfityzy19xp75bank8cn8eo3qzkwwhixrwwdalrxgopbn6uhakgldlud0ps37hjhihmn6agterdiz3kmohfd9iyzgptjyiup7pkuwiykohivs3',
                pathname: 'q4yw6vwtwucj3mdtno9zmuioppyc2nvfjozlnud0oe17ghijtc3uwo5yrb29fznf1pmfxrpb5lqpsig51y2bz8jgcx7cwtrt673wxssy88tnlt7ehirknvd1p8vc9xw3d2t23tlguz16aqiloi67xceu0bwmbaxjlig7to8fv8oby4mgl7nkvbag89camwwp7tyn0exto80gdwsj06kz9tovjtn14169rhabkbhn23auu0cog1b828toqbinhb2y8rx0u462lc6ehja4ykq7j0hf65d616a6orze8f64h49muaa6lvvqrbgyo4b1egkcqozvjsvmosw63ek2yqlwn9ii2hhmrg9uzn567j7frfwmkjfzcgh6487hxcwfn7wib0i80yeglwu802p2imc92rnnixb2tbktrbheqrniknon8kx2ar8rewzu7c8ahdul8ayg79bvrvxssezpwrvghdssrcvo97obbgy02jybyp6ml0a9j195wwul9vkic58uto95evb3h12mw3uxghnnsc13l9e7iarh0a0sz0djsl66xq6v66cvvc24o4eht8or94sa58r9ynedav7zr9bq5zx5julekfw95xx5bx0z2h2a90l2svtqc4spb44gwghvqdb8f6czcseioofocj0lx9a8tj1szy4tdikh6ige3dy8s13w0mw4caaenzwnjhxckh2g0pm05pw04f58vns5r1kq967qryty0auyy8nufilyz2i6eybvc4z5irfwkiaul6zux0281vlrw5rrxveqenh2w94llutl2t2udu629cphxsex5awdr2pdx598efk50c8140i96inp0m95orsgpaclor0advfj5icvo1w5jwht82fzz8sgx9d2zgor2vfbzw371fqflynliya7vxuocexaucs35mfgq8x0bga8d5oht7mba0xv4c7f8c842y2wswnvt3fs27aoli5yj2bocn3pcdsodet4b4639t2bz39mdlb6geq3cwwufs0oe2zs',
                filename: '1spes4np57x4qqx731w0vtf4l52i6kyyauma2edjz2w13gdiyoa6t2k7n84hb65roc13afgm9oemvqg8il3chmeumva6dcofqinjtq98mlampchzx4jeutatbvmz7t2hhzb5ubifjtb5adrxpipytyew7y5tj8r1mjampsfkqixv18616pe1pvuvsh75q8s6jxs5hztbcfjiyb2adx2vksx8sgpmy6098f0go37p7kkbfj1j7dbvpoc2662n0s8',
                mime: 'er1gdkc0oww1hrjw6s2vl15768fked34mhxx3ugmrhuacnpjym',
                extension: 'oz0t3ndh70en642e9hmi0nto3i85i35ymfuswgerlvktcnyjiz',
                size: 7250959656,
                width: 802162,
                height: 455831,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'zkf6vmyl4hhmn1sxsyt0jv1rjxkph1udmo2wo0b2cbiktp1g741iyvkn3zgn9i1bensbvrk8wmdbioo3uh75jfex0r72vbco0u3fw1bau38gaeyda65mv7ifhnqt9yvdj3bvklcdwranmjl28ucrbaq9jh4pi8pfdmuosffv2b99895bfxuu690od6ax3h4429qcyvmqpav5wrg41z6d6lvp9s0n5yh5tlzezyqs6vdi1ee2tf6r1k1py5h5mzy',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'eu7ycvxk1laldh7klijctt0mcqv7hk40moabe6arvxivk2k0onpycq65uefiy8ngtuywkydkps9',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 855749,
                alt: 'fvfv4afkbhtbiff4z5vw0n2qpmug2t445iblz62imavxs39xls44zkzyul79u3qcwix2xypcgfq9qzrk9sjrnuy471lvlblms65mykpse76xl6fdu4od36742qphi0l57hpz06fcc2f2ilje5quwuzohvteg1u239tpnld14qjt1vw8gmvyfiexpqj8db9luu4fmvu5x42n5dy0lj5huug1xeu0mgsd0gks4xhjdaufrq4hpvbiwif6kbqyxhdp',
                title: 'qrjch6wlvfncay5l8ab5h8xn1ezwz0fmlt9dfbp9j8fufg9hquzs9j1lh1vzjwo9e1y2hko3uv1rj203if469r22tkqeqmh8ndnt98biouj81hcntu64r1abiyc2z838cyxl016msveo43ncv6pvq3a9ej97rjbiodh1ssbd1iekax2xrwzmanqqa0mlh69weheqrk1uv7w1otzp35p4y6d0u9zvbniolzq7c5l5c6jgo7vyxtvbncodchzjza2',
                description: 'Quasi hic nihil quasi. Autem omnis voluptates. Quidem eveniet sunt iste ad placeat. Repellendus explicabo molestiae eius quasi sint occaecati quaerat et esse. Cumque aut minus doloribus.',
                excerpt: 'Consequatur voluptatibus neque harum magnam beatae pariatur. Rerum alias ipsum sapiente. Nam qui provident beatae et consectetur qui. Dicta reiciendis voluptas quia molestias quia ad qui.',
                name: 'hqzwgpalul6811u951ywj2u92mtzamxvp8hkdaytj5v30otrjxago43rv6d0koqvevprvlpeqpg0gftn7ssfodl4j3a5nwu8xqvnj4fd1ft13s83o3w3vsanwzrbvtay202aqox3cisvuvfau2hlvagze7t07p37wpcodwetqr3v39engo1sawd8ys1k5irs9y0zm1nvvxvmn1dat6qyx0xlgsg6wwlfym5f4jez9z9gq3xkoz2ok29w9ttkh0l',
                pathname: 'va0vr9avvicbfwgdvf88fn3gi7lwl8y4rg7aw25t5zoqpo2q37ybt8464cqzvgj4u08nq7mvluo69vgrbihuo79rqmemdu2zv2sm6wwkh5f6nmdwqez4fe38wxz711tqdub8kxtgcps6w99bs9d5qzgat95z3mkdhieudid2n9cr553zsybs78byhuob33wancybxil3ohu8mgn13m3wdtnmtpxerj3b0mdlmou5uq4zn2qo0jf6nss45azlrocw7jw5n1i4vit8c0fkxpg867dji52h8vnnlnemoquawg0zr4auxyj5gtpbqd0oprvs21cewlujgn3nu2p99b78tp3fnlfk8r0zjujp1buo9k0dlbsvscenhrk419unnl5v6qmf1a01lrhca0v0ptmppl00pmo6yzxiq63ppqzmjty05lajsutpg7q82jd9wtg067tjp4gaipkamdhin8iuwuhs3yshrytk33fa9h5lw195zxly81afqibijvd6bwbydk7skgoua55zubp9rxfgpyk8ts3ntm7sofxh6wkpn3rqayzro4e7uf41l6pocig2bk243muco4753xif8xe28uhabd6lqxuwyt2eyeuu6hgo2ec3148qxn49131ohpk0egl0myguu2rkjeec50fo0cnmzclw6x67ptfkqzhvr8o2kh2inewob5erfn1ce4855lv8czcr0nwmtpa23r9zgicjq4p42aom6ll9svhg3zamxwtti4aigskszum97c7ckqn2afn2fnyp1hs25qfol15o5h76edhp3h65n6lu3xpacj973jhs123bxzjkygm8ul555bteodgiob24r8stc84mlljd3si3ylk9enim6lvrjpeztx26jv26wv239cwbq13ipg41qvht5qxz8jeqvml7wduk26n6rq09bqs3jgnl6zw9fiknoy87kta6mgomf233fng607ifbieppo5u9lzh1benkuiqwg6wmoqfllx8jzh37d8g5tuj4jt17wk4',
                filename: '678ab8h4sz3sfbe43foz51b8xlt93j3kcpbvs9uuwynv3yspce40jv8wtl6s58kdy2fu8s9vea8ikcl4zpl3nrzbhfm7qo3p3ozweapt3tlwfbeheuca4795vnlneb24ouurguifgfnmgzx88agdp1j5fkwwxciick2hvjj3t8vqt4mraqrh4ovgwpxnz76vp866ts7yfbmbv30t981pzi831rkjtobmd7343mxkst82q0zaz0okr9a9ziq40jg',
                url: 'qgepiimmwvrv07cv36ox22jz21v0k8wc05vqgb7h318ucbq7z71trxt95iy6zravdav0qj3l7awm58v5p4kdgem5n466tspyhh1s52b8dd15daeeg3akbv1ty8s222j9fmqrugkoq4zgs6d3wr7apm2gfcwckgu1rbfj3mrec1i9efx91w3ocm5oo2ttuyqkwkz5hdyfrrqgr8msnytuahpltxt8nwx7b01cz8atqp3fw78ep2qcxelr9h9re94x3pnmemp3x6mqjznr464bb12kt2m5jotuk9ngid3eznknaq5yfm7mx7r7b8ldigejuqwxgu5q7sfmrqyi9yy3xj0eyjodbwa3wsqfumvzj29fitmzupsuxwg7pqn4vue7q8oigfltbqe1lmos03484tjsf2xprx9u5c01ly3kjd8qvaj70slh4d5bzq7kuh7r8zlj08fobm32kpmtjvdfewbwbgji9tqiqhlpl4441qfp2smoovmopfcu4g8dd6t7dqixk1y8gknviwt0o7gjjbzzdsne15nw8vsn2mysqe4mak6qi44123ftkh5iul96r51878d861r04q3ga3wy4r739qkgd61290cmaursul4fujolvwwlplukmmbkq18789r387up1hhihqen094dqcgxq999daqjko7xg63d22nlg9rwnv1cg2828l80om0cojrxv3jeybolnah844rpnyxnw57xcuh4r0yce5us10i0bolnhioytw19zfsag128b8felicovtoyr8fc222q48rfr94e2m3qb5jpwwkga9sdlvzfpx56fsle17l5z00crtk9eguhkacaj5f7aat26zcq5jtuz5dyrbhly0oac09c9duje1tjhvzzn4p4ppcrsskws5467xpe02x3ym4ivriwjgz84clta56kosdwa9pa6dd59l23p3b9lere8dkiydkc9348k5u5zuhy3wg3f4nyzl0p0ds140hiikrcsi945p79jve91coo1efxcb87',
                extension: 'mp8d0egi12w6qxte5ctoi5789950ywppxg76ht720y08gzria0',
                size: 2721447660,
                width: 856546,
                height: 531904,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '3o2mxnm6hpvd4gjdpucjcuuz05w4789hdm9rzm8y78fmxb310t33e048t3j99iz8q9gxnslr5p4tfq5l3v4mg5w1tad6slblu30rck5u7t1rypf9hu438ue0jjuxvcle1ldb4uac7nh9hfkwmc2hb48zuesncppx9d5teyi1msd36lyxm65fqyqq9j1i6r78kwlqcjfcty7rfcq4xqqxq1oy6capkouwexfx5y86s9iirfyqptks1yqo3gt58z2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'aetbsfibrv4mj1bwf70wrjhhikwx3czwox1g27xhojefbf7oklpwnm64ayx99z3wc81h7lbv1gb',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 319705,
                alt: '9pl595nwxzckvj9coig6vfi10h32uygvzpzzyfklli1vgcrn8ba14txs3ypl2oc31qov80r948w3li4acj6n0m0ei275i31ke6voni0nbi5jj6dodpz4bn1w5eicpu4mvkzgbfzqipy4ixffgumb2f7c7kcquvfnobpvz3qgfttqifh6du5s0uhmv02skxev1qr510a0m9sdxsjl1vytk5cxytuads57ypgpddleot2khlxygfr22ij7wc6saqe',
                title: 'dlqmk8ort7oiriotsi0oesopx2o4zu57w2nqc3bd8ydgg92ydxhlx8haapybxsbbhtow39gv6pgz4t0gwso8tviz0kqrch3sgyn4jobfty8r19ffepyxqqlueuou5yr1xaspr15hj4y0ofgbjpvp3urttzldyoguta349gvhjxhmvape33oxu3opg1zxyg5n6fz42ozcivdb6si1ib2bwvv8sm88ge8mr1ahx9hc127e8zgtynsp27onud1q0j1',
                description: 'Dolorum sapiente alias et ex. Molestiae incidunt a veritatis omnis pariatur. Dolorem placeat expedita. Dolores at numquam quis itaque. Assumenda fugiat qui ratione est et excepturi beatae dignissimos.',
                excerpt: 'Architecto sapiente omnis voluptas et praesentium. Earum et omnis recusandae explicabo minus consectetur officiis. Suscipit aliquid ut autem quam et illo dicta aut.',
                name: 'fip9rpyc1f7neci2wd4a70okpt60k6uaxb1z6r51c3h1r3bnec2s6nnqnhodi42t3k6d4s0c7zubc806kn65099f0e05mts6i3ekonpyj91ogvigufwfwf1yea190cuykrvm951htt0cff1ewuj61fpbg4pskom915m59gu3t3ffd47zvreie480o32f9syowqhg3a7p93sl1h5squqh33sx29hhj7kleygwnukh69d838kxlov6je9l40z7a4e',
                pathname: 'za2sntsvuvoobsayrkjjj9exu4yti9j63w9c32yjixoyhud9k849wzik3ph2pwvx9oq5dvslw9e1ienzffpgpp8rsrc0zwwf06fjhzductbaklslbfzifoenlfh5xft8ju940jne1zbk4a8a4ekenre4cek8gvcmzck8jkd6ttg7s1e3krb494qk7ejvhqp34ivabs5650grntdfmcfl7v7yo7e1v158pwbncn1qpip4x01zzd2g8wvty44ujh50nj8il5ezqyfk6rjweri06slu4yxadkqd8u7ckq37jrb2qsm7dw0il80v8ymqdl82hlegmz4aivxogzghusipi6j1zc8t60ewj1r25lzwiarm0br7988ouf8h7nfsb2sq5sn22ecxbwni3qyxf6s2p049elrmbw5213in02tccrutu9f52jdt6ync2bnn9kfpzlh0ripmxoptmbt8ix2h2zn9v08x651d7339x2mt8luwgg8t46r2zwjkrxejzajvyqzl0n96w48nui5byqqlmyqo0bpy9lx0c5d4p7t1hin6boneoidngwxjm7ts9rhiw2slskubt6xi8lvf6bgcehm3a0v33j6tpcmthm0sylf6gzv4o6zwrg0oqswn7n45kylicymh507z2aa8tsy9mlkoq3ku2a3ak9ue53grmrmhd81zykrve8nyhi4pl9f00nsywiq4yfektw6i7rtnyeg6asculd1ixr7v7oghwhnbylpyycychj59jmc7rba642d5x32di4uj36a1sb6ac4pi64w2y2p6cuo187cwnmwbi79f2ob3yqu1g08dr6lbeq204ry9azxpis8h9ge2yn3vatemwto0nr6kb5kttnj2sc90ihoajqljdawdszz71p3cnfg1mmphzhfsfa676aeyrrtir48674fgdj7tmcb1dydh0rw6thprw7adt3x7got3ztnwsvr9t060ytspvo0du353woz4kbkkl49rfkuysqf6knv3fx22gxyrd5sa',
                filename: '1ce436xsy52rkqldhs2gk4fevuvzxkcsjl5rxikspd7ttpi3ivyiwss7bakbkf078827fmghw4a0b1zzm01wegmypl9zd5cf7n0gz89qnsgvouxavo7spro4zyesnwpggjf6uv9xasaoixbpdcbex4k9527s81rcg2iuymo7smn7hf5nlusexe2fif4qnjvo5id48yotglv0o60pnihp4f1wu7ark8easuhu5vfngdq1o8m4aiauzd9s7vbb3yc',
                url: 'h3sgf6dvzx1ou3f5q2mlj5lyvshcs0ssn1jslr7qg221mb4ngikaqzlnnfn393fc12v38ecnn15vbwdq4hr1nfjuqnel69bxcxecn9b0dk32vguuqcxfctc8iycqkdi2kyh1tkkxm2zb2zmlaelc817tjavv8569m5s3wsur79l8ry897ecz4h52cm8uqcjgidt7notru8fsq3rxq98uk5hsa6c2u6epptjkky5897z8p6mcfnqpmz4bganyuxx0pk0w9p9vhs4aj8vh5wqu0vlsbev4nsghgu1a3s3yy2fki7xiir3jw7dr84e4v7k29e1uv3p1g4cd5m7miru3pnzczhzhepinke1wqh8veq2wyua1haf4ehl3kmjsb0rlukzvmjooxl5gzdzeatu80ly2t6c3le6ruzdkkp8hfr7k09noa6sm7qcvid1x78iwexifh6cwjzyeso6ukl03s4s92ml2vjv91vjz8x56wdzvvsl24vnhl5yny9j6wezsikdq5gu6nafwg72l97c2snsdnmiim02rqbdpkkz20gillxi2om9pgreisrht06oc4ny8k9c4zszcxdcwh448ab7lx7pvwsq2ugirxmpuprenybbhi4p9ljlrpw44bs3kd0svvo0je516m1xswqbfnvnrscuhs3o3ynfez2wzwaltid5mt1gnuuluvn6x07tc3f32jff8882ylzfwqcqekn50aq83bu4e9vtzz9boyr59u0mrz6xnoqkd6191d8y1i1o5ttrqe0yuyxfoqlsct6j8nla9fm2f18beorzhsj597sn8vv1cn9eawbmterv12m322cia3dste8a2bs0h0ytsuy6ja5uu44x44v5p60sgr0woqseibwkanj5kx53bq7i0p08iu0nl4vtfeu8z9eqk4b9h7ziktt8landuzkypwqfgjfpqw78gs8rlufpf0wo71a36b4132ttd941cvcukzqiahtfv093vlvlb7y7spxg93t1t7coechi3r1x7',
                mime: 'nqkfapma1d30zc4kdhbl6lvi2i0ybvmvlu21bhvzswv15hh2zs',
                extension: 'bd8r3u8ts8r28qqnkwx2rq5svgenmrcv0bthcw7lne3ocapwmz',
                width: 470430,
                height: 681433,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'tugim3wv6dq653iwe8p67mlkvyziqg8ddj192rh2q2zhkkv3iyftpeviovp4orj8leb9hewccacuyxmdb0zl97flspt306lr7d14bytasis9qiryrylhejsdpt2hr6mq55g3mu949b9fk3mtv04mcv42jisq6339fvdd5e114xcmhldmf52vm0qwnvhkhhjva4wwlnii6ixciujut5lvdqt0jzx8lw4l4pe0gjvf1qerumqex0v5iav9qc6in85',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'xa7j39jrn8uu5aslwtr8bha5w3ii9g0a9elzx',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'l31ar0a3c2o5b4ji3f0ordxk3zdls7wvz3ksu8mrlp601shtt10mcdk1t6zkccn7fwmwe6nhatg',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 114690,
                alt: 'ntgr34xk1vzgy5bq2mkj58akkp18etpm53uj03dztxfulzxm8e0501rwd434tpatba103dmngzr5xsdbiwpd93rm4ady5rok6zglu2rb9u4hkyih4na75w2rvu72d5xv1440rwqeuq6cu89v09b0v3ral8b9di49c4x60mn2bg5zuq7godx2cn5cdd1d5tjexrayh89df7awmfffa2em33uvk1vnbur2j0x1bnwh61lsy5wu87vg2ykuxye2wem',
                title: 'wqkxnnq8fka4skxz5ua1sicqnhlw7q89jc9ncrkbvwh8nhdkbbl4ygdtwullugw2hzmv44ouzftmck7xtotc2w4x02pxrqa1sbyedjii87i7vdjviw272mdfg0mhltdzvp6orci4ltjenjenizdz29v3u635rxyldvpq41xqka4nq52eemj8ow9k1n1w1dosbt64w8fix54rugdajaqyao6n6h9xvq8e7spd32rosh4idubil3o1hgw5dt1fp6q',
                description: 'Quas voluptates ipsum quas nobis rerum officiis. Natus sed fugiat quod est dignissimos consequatur minima est voluptatum. Ullam voluptatum repudiandae mollitia et tempora aut aut ex.',
                excerpt: 'Earum natus omnis. Quas deleniti corporis culpa sapiente enim harum accusamus beatae exercitationem. Accusantium iure aut doloribus aliquid placeat consequuntur qui. Excepturi reprehenderit ex dolorem eos. Nihil officia enim doloremque dolorem consequatur hic.',
                name: 'zp04e4swy151szms94o3b131ipgo8kub0jndps51cgac49abktc1gyxgaixbrhma4afv2hdm8brgi5hu5s3f5t6iuv6omm0zilh978vzfryki6e4mjhquswda6b6s1ru92p15dfvt2ekq4jicfshv3vrmhgodhphmnqvbelz9bxpe2imywbu5idwc1w65t7fa48xo5b08al8riskja1wlgrxxw2j9mleilab8p4imksxqgxua99a9n9zkj2dpq3',
                pathname: 'r6a87qrks4xhemd9y6kmneghx9wmhafc7mwhjp88qzcuymcg2p2895tfozyrapvt2y8ccutt25gdttwuot0jpscaa5aw89x1itijqygy8yut6n9f4zizjhea3snu5mze6jdnc5dyqeqs1ra1d29bmqgojvkg2knaimtkmqqd1bygjzvwxd8bujdgjvyyplz60pi4fcd7akrjam1f6mbqkba6lepual1aa6exa7jqf5b4dbdc49t9lrbxbl11dyjr697y6ihxtynby3bcwt8lrf5m0q8d4y0qgv6dzcocdy9b6pzvj0fm9jojd84c4wittivc7fe3vqclbel61rocejlircagt7osft3islw6y1klvht440e2gloapdwe6ya8i6ozjkyxyfr75r53esu0ytgugws96lkx3fjwwpakfhpxs9cpidy8ft0awggljsekqq4b0p3xkt0eqvi7yhturgwwc54eq4a3i3ftmlfw4a9pqbmu0nahr2kk54vfwwx0epgdfhdt1ild2rg7n2w33s6097zj1tx24fdx395pnxiu6c96u7t8lcsrherpz9dt8oe8eqrsoki8ipoyit871tdihgh30alktbxprjqh8j8bxm2temmusorfn7okf1fwminjip9eodj7co112fudjow72l5ck9ahbysiwlldhpnf4vxjuvt191y94cmj3t7q26ls3g18gp9v3ds8czg25tykgow1on83qf0711g2p6cvi5wxhfjf51ruvnthvdyhbu7xy5j4mtja9o1hhz5ez0n9v9ocf3ubcmutv6v9wysr3fghkstscbzhw7shz4k82rlh3v8wjh16ohlwi0cbdp38298ng7rzk6epv2p3965yhgig1mbf98stfd0o1jm3kz1diywyd24rr4onna6qwdq9xtduaekccurf4iflu1n60xz3mkr11h7ob49ih6xwsl1x193lopl9cjb4rbxs4iauva5gl6147jy6kf3ebiglrpfw7jvhjr17n74ufl6i',
                filename: 'wq78jzl5sjkt504f2g5b288jfsp0lx1txozgouc1gffeh6wdsiqpxwvpfgx8xwovu4gm57d61bfj2mfx7odkxqt08fe737sciwh80a8748yvvgpwpfwtfr02vj0565dslav9jc32v7lc5phmkvvhmxlh3qn9bzq1yyor0a78rwv5coqfl9anpygr2l0gnqqsef5aq089lc84fp74d4luyt6xyatt47vpsnq1ilhibzovfpporolxadle5p7yain',
                url: '9v47m01p0obvznqzb50agcjzjqf9uskftwwf6i06v9alixwpyl9tam9com2wzvyrq0huy0la1ufcpz48k8kk1gcafaltb3l3uvwdvlywg199xndmrvxhio2bilnmr57ckuss6t6rky3sbbgvn65h7bcad3tkr5v9hljxx28yn36yfewhngw509j5lo9lzsnfz5rmkqtm96nc7aiepb7z8ya4qrlfqob4r2xybhjmerzo5l40csvogta0xbghocj7nbvct4ap64crcubujlk24gfyjbrsr5mkhzu9pjy4iatjknh6yjrrqtg1yro3fubbn2gaym0tb5hzz674yn99vbtb19kgzzj82ulg1v039ut72u4g5r2ayyaofd75phd3st60s2vzirp4ekxargmal5jlnd1eyapjx5ni85l7qhe8s5sl9k5t3xo4gfqb6spwlocewt94bim9znd0cl56gy8oers4diay3dxdb4n8yyg04ru0deyxp3tqkn7kocexq6yb2q9ipuy0bldbxhoy6h1x6lao3haalnyt9zr91hg59j0xcxxlj6bsa4bchnehvv7r8amfotyu2t1rgxciwv86m6mrg197n0oad6vva99iyveajvhmwoddrdpdwkcdsapdks6jv45dmucqk1pznxthw4enx181pqpn4pqfoki2ja59p53agan01v0g3g72xi937multbqb5e31eznon1juc72uce8oz206naxhk8u0p92fylv63e812qsg2y2jeb6a6n2kel1aqsuwyxgtlr10jq6gba5vqqpkg0jyduwhvcju04e2jtqn3vjoh8omks8jwhav8bwfbm7kgwdslbh5chmpbpwho6f8ruc0x8ma2uxdq771yeh2xrx1dk2wvoloax8q4bqfnn5jl40akqlg9rsvxnj3lvyl0zuyh7r2w06kxpybmmlpwjnntq13jkcgc870hftd8beukk7kkvcvdg9271c6b5o8znqmkr14svj5tlndx3q8dcpvgnm5',
                mime: 'g5xwregoweya03g0oeegm5xu74leono6y4s7bgsa1svt6944jl',
                extension: 'shm9c0nksoaqegwby6ubla7t62lw0ave2bplfszg736yg3ex1j',
                size: 5416021766,
                width: 107404,
                height: 120353,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'rf02ugs5hhlwihs9zq0vxx4x31p4gphcv2ubhsoeqnvg8tez90lw90a1k7qdkft89c073uwdl77qs6p8u10nueuv6bp539a3yta6csx0hwlxbf2mdenh9gncruuaxzuajbpfbkujg5iby3r2s7401i5u44eo06tq69g0z5n26fnwnps41jw3h1oi820finf8tkungr0ln9382lbawc4ntdn50huesmqjcj6fuzd9bpwgto6dktxxmg2q0b8fbnr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: '56lnsqqgz22h7meu91xjir2g9cs6w0dlw70b3',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'shuuqu5ffonq37fexrh1gjpn76cv5jebyduvawi7qa3fztd4e1in5t68wk0cocucexv7k6i0whb',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 606591,
                alt: 'p5yfz6lh6f266tmsuoadw51e8oat3ai7suxfn5pitj88xwdjprkdor74i7g53rfjqa5t53ud99dmemjn7sb0uusfv1n612qujwokh1prmyvwfzb9naeb2it1n0oh7suob642khlfstqcflvlaeoy2yiaq0b2yavzmz41829px44bd1yx7em34pmxo33f3isof6urv3ex57erfg1dilspjlgf20x7g0ew6fvm4i1p77f69ug7uih3f3d3ejcz3rw',
                title: 'wxrwz4a669orxdxs7ctbmmkp99hcqbacw654l706y6g62zxijxy8hr95vubckepe7wgbz4azcve5jv2r34felvq973jhw70qhxj7bmmdbx1hfaozlt522uetjqse9taaur144xm4s155jd3sm8tjk0ni3odt8q5y534q9kmz8gv0vrvviurkwp7hlpk2uccgg413vyo0742agkvf5i0hfxab1gv60im7ra7rkp48qtu4vkvn3bsjbwhjbp6o5bi',
                description: 'Quia quasi animi velit sunt aliquam sequi eligendi non. Nulla et expedita est veniam facere ullam quas animi architecto. Ratione eaque molestias officiis optio. Unde et nesciunt veritatis. Distinctio consequuntur autem mollitia.',
                excerpt: 'Est autem exercitationem laborum tempore debitis enim dolore esse consequatur. Itaque illum laborum voluptas. Adipisci fugiat iste hic magnam voluptas ad dolorem aspernatur. Hic qui sint suscipit. Labore quia tempore eum maxime nostrum adipisci aperiam temporibus voluptatum. Doloribus aut possimus error a nostrum sed quasi.',
                name: 'f5f0gfzbb5crfh7ezptvtpjw0qby4wrlsq98b6lpo6q4pbvsjjhv6sfkc95hw7upmj2srzaavy7c4awlp6m0yjqilaf8tqr91078nmx06nzifti4l56ajsdh2pu0n6fvew9b2i24g2sglr9dub7s9gi8z9tltw96pj0eaqrvbpssb116te8kl4v3xpaqw24b6taf4vnh9hbs1u1xa8vqgsxob0kzqmm1uzis43et0gt2ckr23ijknek3b4aaynp',
                pathname: '67t73ksh7ikqtesvs32nz0ayog1td7ns65j2m8308owf2ktfeexh2ny2cxxcw02oqzh3zjh0vrg7kfs9f85i7gsyfe19lwstpkrk5bjw21ay1w8q1mlhb386ucpxnvfkmvcrkbm0ixq937ncqwiv7rdxbwbst6izweaj45cxgpn9kxqu4h8uz2bw37tlj8ax613jxp0tp01qpoklrupa2g9jw4yabroh9ucbtfq0jri2h2uka5rhtzyqox0q9tufhnwtj7uzextsz1py2797v6zfxh7thwonp4tawuohkfxw8g37z0bdzfg2pr3hukm81h6bo76ufghsepol73eam6d2v2acwd7kt23eg6rkrl6lx43njl4eejh4nn3b7atq3pcl8bbeuegnbxxkwo63ahzwxwly1whcvnpcjk5ktjl3lzdvkvxbuh34ci0qo6d47351lb3j06n8c1mskcuxc0papet03f6b0vwev7j89vssw5ilmk107z5yaf5e3nrryrsp4wys4lzpzfq6myf23qai2mbppyubzzx9cip2oai0qwcakb4oxocit9qh8s1fieogy5we7tzfy2dhgcu1lrk64560agd7gbce3zc7flgj1fm4bvwel9a7274bcuymlwpmi6lb582r9xb56h1s53nucizpnsuza0ocq0kz6vlz146r77ppqlbjf05v46y8khwz8446a5tvbk1e0dm3i8307wn76nndhc3i461xuu4pw3swoc6fzuv504vfktn8zkwjqsq447q507dhe1gh38p4ua29bqaysufwjr86ynfa472psusgdh0uunvaflfnica94dwbm73mz2dpn5ptbr6nm94x2z2fpn9aa8kyonreh3qsdfkxex7ljvaji0jk43dgwvm4jb5swbtdfo1m15exiq2lldmfvh0zn8nln2opjjx6wnny2siszweo8eq866wjtnj3deyvx7mt5z0mja9bwdzy8s37vqas58ruc8xa5323dy2992mrrxhmh43e',
                filename: 'f2rfrsas5uzealkagspjkpzgjmcirkq0515srgz899ygkqd69kih2tf2u6mctcpdi338n56ei9c8tkctpsk07dr74q7fghf5zj26lrcanl4yoof55is5egs3rcvaywdwv0nw1g7pwosegf4jxpxv9vie044599kemyudhzd8h534j4rr8x69gzxokhbn9wtqyblnlgdmrjuviuidsop5kmisjt0zvqb9s6e643epislm9bf0aiawf2qaz15n8pb',
                url: '3hvoromxzza5q5oktk4ykak2o0m0gd59zv4e8r7mu91nzcf85s7bgdvhvyrom7a7ry519tfjuvhr5paguo2vw9bflzq5dmby0lcse0fcbjirsimxvpqfn5ynx6j0cgtcgdy9hefc2afdt34wu4ckk3m13l6h7ry2fi83vz7cxxsevn17wqdkj3ngd0vwvah7lxfg220gaciirkl9qgw7qsreq3aq98rp3nlhhahj3wxym79sky7u18n2sa5aw4rxn02vl6kn7tgtu1tlcuwyh1uf4fr9zt64r8xvequu7rjry785hx6th778ewtgyexblvlinr7ilt7l0qxqt7xcaw2d2117byem4rx7zlrhnqeppcld2usjy84jvdhviv49ppvflezjy9g0jd8hmebdduq6wal4etu14q3yz5s26gaibwf66i0kxp8md3vdvrms83wl55evwch4l8rbuz0zlelzwhb4lr12qe60miv5ru4ty7xhlifyh03bebwkhr1dwrg11hb2ryqq4dpajgg4xt22mpjx52f0jrdnpucz5h0s1kn05o5nenrecwqliglgook3zyryw1vrjjkjp9g1jxoubh4nsrzih6duvd5jmityrbhj3qokxdri4mfz37lhimppecr82wwh4o8bh22yg4afebth2f10x5qkxbmi3ozb3b102oqsqy58fclfkxhy8cigi4dhc5qyiscqwtvq7puj623frht8k5mh441h2djl3ozssskrv1mcik6i826q2i4ixy7ad4fbyew1pmwz1kvufgdadfzvn74gm1vywnosfzfv7wmrwdzealr74v8hegye1nxlgllswzs1lun00hdpj4ekd7oxg4t9trp4dy3jz89xoexu4awrbd6ck1c9vcnkerh9jteljy35d33bys6pwinue9htau9zs02repnw4q24dmvkd56m2didutqmkq6pkcpby5ej0cpzdxqs0b9ram3c17diph7v2okht3hyst4g2zccissvm8opyzj7',
                mime: 'ywuhl21vlalh8zpdzsra6r8qyhk6azbkawanat25jihw98tpp9',
                extension: 'vy83ee1vaci0mb19guhzjsmv0e6xf5g6dmb5rzo0kvlhc6c5ob',
                size: 7599423126,
                width: 662485,
                height: 188347,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'at617jrulycjbnjt9po7brzzj70k5qqn9uhv6sumrbbhvr2qva4ytfyw8627gtowuime4hx6ebjey9420rs7is3hkt0l7vx3xazsf7ll9qhea09wqa6j1b302l59bkah55ls94704tq14aseph491uq660pdtno2866gfioxzglj27l3lgrfxp9u9cikpx3zhaz7fn8wr5z9zeu3mxy3sumdrcmkd3ftz31ab9co2qmxzv4dgtv67zf5fnqag8x',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'gvzp2tbzz4ky2jzdoldgoc0inkorenlw92wia',
                attachableModel: 'q3aad0rnulh9pkpwwru4cralaf9n106kix75a20sikpgxo9eb0jj6q6tyfludewq3iqx9zpcwce',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 282298,
                alt: 'f5n769w5cvurxbdqghstgjvl3e96ljpb3xerjs4147860xvgbqmc4so2ao4dnaleoq42ritvyzfivsqz3arp29kych8rja4i58f3bxi6bwc1chrf0cxdwrwzi55m41vb90d9iimy1zxv4zcuzhq3ifix1rrwwgi7acklhjiashlv9kdklr1nwbj6alekro8jumcne2suftlpymhwbay8yolmxgnd0lrf47dxdhn15rwvlh802vbydr3qcg3nroo',
                title: 'x9b1p14j8vz3865cn1tfjjhlla4ny9jz9r7nabbkxj35v4anpjt9lbpco6dwtn6xjy8ierw4tbvhd15ucqflch48r0b3jhgku1oxeix3y9ryj6z290ji0sond9rrpi03lamezhhn81ydj0k7gm654p8c3aqg96bbhh0udmrkfniv150o0xrf09d01f24q6lsgq667im8hgj0nekdkdeimo6d5jjst4bemazejvd9ihfl7n8wlam4iq77riya4z3',
                description: 'Quos cupiditate nisi consequuntur. Accusantium sint ullam in nulla quia culpa. A est ipsum consequatur inventore mollitia rerum ut est.',
                excerpt: 'Assumenda dolorum quibusdam quia. Distinctio nam dolore provident ullam eum totam illum aut recusandae. Quisquam impedit quisquam molestiae asperiores. Omnis laudantium qui hic dicta amet quidem iusto tempore. Et et itaque assumenda inventore adipisci ut ratione ipsum maiores.',
                name: '4icc0edtdiyvqgbf22i19uzo1dvxjeq1sjqrr1314seimi4vlvz0a2a0hy7nvqwcmp3a4wj2uxzebb03l42flyh6718c8y859pfm6zogp23i6t4rypsgr16txjqwznqiq2iefxmq3ehsebgm62yv4nzmaes2dcw8npjuc1onglk0ho78dpp9iia91i0yl52aq525t1pjwki9g3nr1qxwr21itzvnjmp9pyr7wzzbhxjs8ubewk9ggz7jyi7upc6',
                pathname: 'dwti0ca7135c7pruil0hkb67ptqd35fxjgd1n1g1wnsf8kgc9if3hrcmvk3vz4nq9ms5j1oxqj0ng6nt7w5b92rk69vkrl560vv46492xusvlrruj6oa61sdmdyvk2agctnbfbr2mkqlma1n897odmb71l72pzis3ad10uv9eu66hz6tvtib4m6812k2tb6my0k6em212vc3hhk4r00i0r2byd4ekp1zx156bpmk5ji6q1c0t3iww241gpn266c5x33hrp73cx05phs69v8tw1qiqh4avvtdx4bfthhrvh8a5y5vye3lzsgiz4szpmtoq8rbjs4kqhdmw8kb3cz5sh6vwgqws5cthf6masrp1iliv43djgzbwh4sobtmyq5blab5jkjgwg9yjk9zlwamt6lrza5w4vtzc5losx8cbp9mte0mgpe8iodb2tmoc6zk681eithfnyiusq3qa2eglyxcs254qr7sro82m8dua6fianzvm2205i0sfr18kxmwhmpsfbfp7e05q4foxb3an7vgqubjwgk5v2yr6661tyxcjn6dbpcg2jqlcqjr9vjuw9s3s3tpumok80sewz0op6kwli5igekeluzakchx6pqs84b21inalsagnaj9hhqv9bbhohubj7q9vxn4lcghjmjzbr5aqlr8unahrs5s0slzfbwlmxdkbxt9hgv68n298fy9tkwredxfmmrtywlixixc8d5qbdsk4j31a1poy7keepxslqfmq5pyxzjgl10zojg6rkszjg47opjl2t7cd52k01rcy4p500bl1gxih5oj0hf37xorli57emxszk0d64w9fl7oy7dm22b35i0t7d9k5a0rsjr2msguwd5hygtz4eb3cbwsitt0udvpno7tfcgp3shnjz069yzjh1866hq1cu3glnb38o77k614ddgltpfauru2lu893jqxncy3uyx6qw5bf5zhum3qa2j0dfb99zv08y6ee3tknkrsk7vbhssvaldquughnin5utac',
                filename: 'p92se3fhd318by8msw9lcdfo3ggl0bqc9n8km7lerfg874qa97ip2d1b041ah5u3auufiuu6cpciob5nnptk1y1mp1mnbks2syk6xsaidyv9rehc3te38hirjsx0zeq0fbr6jd2ritqfmujd6lqzrbcu926sawjr2ov1o5rm4pxti2sb0jfrab2t3arkyf5ip2um6y2uxwgs6dkd1ke3sn4qak99y5a7th7kbvvvxlzeylot217ua9xns4kvy1t',
                url: 'moxiqe0n31jemcgjw3yo4ymxxan47n49vg9n1kxay23c0iul39v0v3yxs9dxx4eg4a3jle0cnfkfz3w2ic3kluhlfrfts6xmsuxulv16j3s7j5lz1llfbg42nydmzc30p2sfa3k4n041trr3vlqj6bu75m5aujflxs51vxblrhno563xk6podit2ckxbazuw3nviiayk9c2qvl3egmutwzmt1rsgqs9iz9449dwnwq6oy387492t3ch3h72not5l4fmzyw709u80tlcun2wskzgzx4thm4ffpmp82o0hjnm2fq4ok5mq2tme9xbotsuarl7j5808t60qvheqkgioq5b32qitq2ewqn13it1osd7ti51fld8ofhlslrj9kvynuj3hkqz09a5yep4yb9raipa6p36b98bf2fw0ttpvgnw8rtf3ndp0parte53h3o0f2lr6ebgft2htosuxikio3s3ft5f0q2emfs71sm7p5p6a806i82mtn9vwcfbzvthkz35c8zif8sybz8iomd5mutbu7mogvm775yjd8ffl1lyida9nji63is1fvlhkvvtgndh20sc8jxywu2ypyenyub122pbu8rtufzq5bi5ounlqqm5oezxirp9o1z0lttpflfcfrao45szuanj5hmyk680wmxjht9yiwszbfh6ozw7uiqo70h388b5l2nkfqckrglcx4zcdvtgkivf46jsjazamhbz6bnyv47edua6rlxedq6qbf7r0r3esf1m5fhrnqabtu4p4if5uj4ev1wgbemxe0ctec5u6czce0hp9p52ep6or9qxk9w3xj0jo8ekre1ts219e1tspm842dyhtsz11hbooux4wahfsby6y2rzb60bbf0snjwjx8ztb2d59k792w9f92ec4qgjms3ams0hxeegl73o06v2e5sz417vrxap86z2b5l2psz9f120wzwrygrsj76lnk2vk93o9ex3uoo4arnef78lppmkplq0qzbfc2qkd75ukruaj3ioj',
                mime: 'mjutcqfrtikv0z26hb9tqji7zojn9rm996gw8qhmic4v3xxoqr',
                extension: 'vcy5wub1t3t1riuinbs3wyymlis18dq47u3b18kojz61setie6',
                size: 4216941116,
                width: 830605,
                height: 107074,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'i4umcb5eyopxhk8vbnzk1f0zeijxkaw3efzzay971xjfadin8izkxoxjchmsnpmqczd7idgwsb1y4ewckgxekf1km1u900ub517uq45x9otwnlv89dhjcqrrbcr3hsscqy86bd69t0zz6zgnt9xbb2dhc26dch8698nr5u06tdrvij41uf81kyw6z51yczd00wex20lwaesaofk5798r1nhewhy4a9mxdtpstes5shzwemr97yr2pbru7wbvs0a',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'jd76orqm7oyntcope5hmubkwzrovaw9xa2wis97dw6qt6e6gx8gqsb8ujlxvjaaqzyesjg1fpi8',
                attachableId: 'gbba7q8ogc3v62z7klxyyqacqb72glo4kl2m3',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 928224,
                alt: 'v5set6uht2jk3921p8zpmhcuu8tvb8z2sm9p8kuck6o3312wllbapda4rqhgpq4y2719wuhur571llb408kj6k2j2kk1wikxmupm318hg3rtsbmr6j25jicrm2h109h57oucrzzmavne1e86wimyfojtewa1xzro2uh1t9ymn9luwhsmv18ye2n6b5eg7m6wbzrxh66qigqzoq8oilny1inpznbvc3681kuv8w9ibhoyic52yie8m3q8q9vniul',
                title: 'g8hcw3qldjqg54w72ybeyr4glsja8qpghuiz91owt3i06ngb88fgwfcz2e3buabm0i3c98lxmf4vqeimcbbgz5fkre49b9ivsre9rcg41dl00ftugg0jjachiyht8tjwbknuh7yuylfpg922vcm38rq8e4xee8fw7zikmlq656n3ztoj3xb340srhv4an76gf18xzwd0ko47n6i1qnijwsda8xurv64yflxewxfhuf0vjnkjwhobalgmw3uhzq3',
                description: 'Et eligendi quaerat id magnam nesciunt voluptatem quos sit expedita. Fugit itaque dignissimos nihil rerum tenetur nisi magni pariatur. Deserunt aut consequatur. Minus quae natus magnam porro.',
                excerpt: 'Omnis voluptatem id. Odio illum earum cumque vel distinctio et. Doloremque natus aspernatur explicabo omnis et impedit accusantium.',
                name: '8ydo1toxs1mjqcyzhij3qfp0ouma0hcq4u59uq30013jjy3cxa5oiu73t3kifd3ahmn88tmu6zesmo5d5vfj98ki07uk8ddech92jafzd6epcr1k9oh6horvgqwhxzqrrfzhangqwvn5m53my8ax8penwweqiotiykku85lbdjsitts2k4321zxqcv30jblnmcdx3hix9jvkhdjz6kxal3951pcyjh22x7i2ef05ylhfahfhkxzfu4j5t8p2e35',
                pathname: '40om87ok1it6vv4fdpwcy3jdjdkmhtqaki3q6hrehuc6g3xj1mdoh6quwefu2zxmmz4ifqcvgpm9l91vlejjba7ioyyb11nskbniem77uwc8h6o5b3uy0o0y8odyy4dtzrr4os529g2nzhefrcj4sctfhenr8i33nasny9v0o7i433pd58wfefiw484texdfelogl79vm5sqpujfsa2k9sgqk282xo28xddtcyhu5hxb7plibje9s2r3gz475l5sd74raeon6yf88ocav5vcz13c0qp0lwnd8cx0rbttpata9n3fesui1196o5pwqd9ziuv8lglcnik306zr9m10d0gsz49mnvdgwlry85etibqrbmxbnn4afnzl0rfmm3oqad73jknmsuo5t6xviflus7dagnhya9o4f5db9mr3xtw3bfva9h2i748vavzmyhs19y3lmkadmtrxql8kpywoj1ctk1zj0ec9tf6k7md72i9dzcxizh55peknd98xpe0qulwphtkbzfodomnq8lfc8cfdvy8v0ck90lb98fzy6ms56ebmw6ios961h8jsvvxbpq2f613xhqyd1djxlb7dbzgj51gdoq9ei65gdro8hvmcec6qggsihnrteepvc1gs7hqpd4jj1m92unts3x4rcy2lp6jn8awmccajxk4dgyt7ul4635ou0n2qfdotiauaxvmqnnq8tya7t0q1jd8oamwxkcnnqf9869k1w0hsbgupny47d9b7wpx69ofllr4isncp6vr9uj670cmot6tm1r0b1mr5ihog2l0eik1uox30b2zhwb8ll6lmyhmxcg2f3awruhgx4aeces2jvts16obetviykxnokbhasc0wmlfdeb0ne42yx3uj7k1taf3ajvsw72tsgvrobfmzculh39cli5iik0auguzp0af0bzphmytfp8bwtj5mnue4dm8r0oxi8o1ncqq8p4fdm33vdpc9w0h4h64n8s9i0jbsooljda5f71f8dtwln7gnczn8',
                filename: 'cw5mpqyb38oo2dps1hby4yh03xv213hciduxuhmog3sap4swwu24vsrzdqpfkydm8845kx4sh4cc280ald37qr5pgkg5cgblyrkwr04pkatsa5rvvy8n7tvbvjdnvxugszgs83o3w6dx2u5fqrb03pabaw0pc13dlgg5r5ym6htjq22idvgjmy665jjcg0ta66vw34del0o3mglgm056vxmm7zc0m4ya6urt792oov0f8f9mf3imxo7lfwafvz7',
                url: 'ws8navit7d98aiwmiqu8mfa081o0wcypbhrzjyh5ppqaywnvnhoipeo5yws91g2g0sfc57kg0ns834tmmaqrx12zdnc6sjxapcsn36cdcqm87mrwlq6hln7ul6ne0usrejtt6ow8cwy895qgdbv2tefco4pmvc7upmgj3j7ov201z91oxr5fww06j5bqo0da8px4kdh8ozkk7vr66yk2klx91prtc2ghar0c4f1dhh60dhbicqeaqnsvamyp966183fkynd6b61oih8cctb03uy8as4jok8bhjjbhd8g3p8uasf7us1zo0qo0kdsghzy89vxno1yf1ww15x0m8fb7xxl2roez63i00s37lx2m8h7peevmchc3urgvary4epev3j74fchtmptju07ccxgc8q3o912079t124dzw4wwhns3pdx3c8u9pjkzpqd794rc7c8yxt04455wc9swa41tzfc0th566zxsibi8ld9g07t1llgbzzjbv13s4wsjtxndmhqcbc42474m1px9ocdrh1qoh4bkepj2rbnzrwjn6o23xbznut3gikusdkml9vo3q4me1ybsvma8s5pf1qv4nacxa5llsr83hgmcfbuax1mj0748lxhbganjurx1dceijrbk5bept12hzzfnt3rn79vcdk2bothe5x4wk4cz7hd3v015p22g9ctex1dg34w7752z3txxpd31nj01i5sl7irws9cb1p5o6j95goywfr6ibcjvxplbibmbmc7kr3ra710jszr44lm5ry7kv7kb8ob60oz314fomrnobieqlop98b1ykrp19caq7ob2hiau0xcp8ii93xn76ijtveprr7cf6xcavqtm83kbe3pclee86akvrmq6gvwygkymb8vrhlg30aio9ul9enu4coa1zk7le3kg4qafylf9vqbdd6b3uh6e72zkqdxiip29166sqp50xn3h5p4nc95jkmwm9814b90hx00im0aerrp23vbnh88hz795ir4glanhrck',
                mime: 'fqs4uesrvyoutmi2nyqz2avwiyochfadjt3xgsbyg0es0im5o0',
                extension: 'q0tw3d8iwh84am4sjfcr7jfi8my1p9wfmmsi2eb9d2bthkytjm',
                size: 3226843780,
                width: 574921,
                height: 185708,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'ahqy7ogjill5f9gq2wzhhz1rg847l2gnxaca36d08zfy4k0cynyfz5zcmgxv8olf988k9my9uw29hbzxow2ve7rmuptflw5pmr1uvagv404z41lalc47sc70eqod2oufes5dywef7sbx2qhf89zy2z4rmkbv2lkcxtwyzhzjogi8ww8a44ro6baiwxoj4mveh1v7hlw4rhoy3il4z3pvddewzht4njyyubzwnpamsamv0mhsj5320cps5y4csxs',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'bot25lr4x2rp1v8pssq3u7zyeyriy8xjsc8o97rw3124xljhfooadmla8577nwd9bdeuoqxtmi7',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: 'gyrtlv9n1j1kpdpht6c9wdejrcxt2k731ba16',
                sort: 295926,
                alt: 'jjw5kfg6ck5jtac4lcwzh7cu9qldjyaof35uni7y8ja0vhj15njz4ddil8tp230nixcxnjb9hgafagmmbbbb9cbjgasrttba1ywlo8e0wrf1fmzqx47n1bmyiw020lwiyft1w3xkvdkoffrang6ku1h7tg6o5t0tssbzq169j6bpeu2vsk6z2llju1gou13ft97cgqu65co4hgy9poyp2afnon2yeizuwqk6vfuyt4xg5e5puwh8rjtkhrek865',
                title: 'm95wn36mdd4lt7ggbsjw9eai6sa1v27gs7y8v1r2jjji664b6blk98jlpi5uo5gxe92xl3g4jydkc089ezohd3hn462xza27x2m5ue6elcmy2v3xv2ue5huoa87q6oqo4c8fiuhjidojpandmyapn5spz21l0oz3pt9ph0x7wvly8w745g75jhy8ah0u0sp78vssc2koy9xr3h816z1jfndupz2qebmhfjf99x1iakus6b39ca87vcao5fke9ge',
                description: 'Optio similique odit ut sed illo omnis. Beatae id distinctio nobis voluptate et. Qui aut exercitationem tenetur dolorem eos consequatur repellat sit aut. Aut cumque officia consequatur beatae corporis est ea. Et laudantium ullam.',
                excerpt: 'Incidunt tenetur inventore nihil sed quo. Voluptatem enim voluptatibus vel impedit ea magnam ducimus magnam. Id nesciunt possimus aut. Repellat unde eveniet modi. Architecto quos quisquam alias. Quia qui ea omnis occaecati autem dolores inventore molestiae.',
                name: 'fixoapk15br8kjtx0793apwqwivczh5dczqt3d8phnbbe9fh7to1hw9uifb32wlf3bg75piorjg997dc3sd0l38pk5rva9ktunidbyck6x3lf5xxuns0l1e1bgba01xfpp0p1xll82129phf11cpv2v9aih5radvdxozx30e1r8bgfa62759p1npg2xgpjqdw2ks6sq8cv60bnk0jg5wg6ilep3jw65cphc1cxcmcsxlczfuu9gxgy0h428a4ub',
                pathname: '20fb83gn7iro4xp79d3bb1igo956rgn11k22k9b82c6vt9h2ize0t5zyjxy777itdf7h8jd0m2mo9klotcr1qozd82r6wl3r9ruozvwhx187pew4vx9ju33opf4j40g5esbhpn9offgfmle761x1p6kuhoa340ffimuw6r30dbdpfneqi6ay53yfz90xyif7vxnt5brtx26ptmpy2svkezvsoxeow0g3ihmz52rxpopcsbl3mcsky3uxh0for6vsmpe9odm5fq958ijlk6u9dlrgb2h56azzpk7hb0xg73znhweq6bx2d0usrjvi6idj14so2xuj3uhrsf6j47k2m5jnp3xzjncg4tqe5krslcth1e7p1v4gjzcyrtwopjxybzgot6d0q0lx782lp5s4ntc23b9rl2mbqg46sdlg834pd9c7913uvl2pjmem73zdtwyhwc63tvhi1urykf86uf4938r3vu712lfp9hf6ywv22vfu01451g732ipc2b1y6ayrx173wkpgrqrcuq0tl945xtlyfubuagq6twqx07z9jaehfef58zbh3j9rplp455eiue9h8nooppbmsztzhekclscuon7486h8clak43wiqikdkqb3nfxgrix06ylvcs2v1iktefadl110lf7837iojvnlsvql2zlaopg9ga70vikkukwp2hu0a4n55ojuxdcl3pb3q4zkci2dcai7zhzi3fowniqjx09natn4qnev98r9i8sm40mxk6pjxu3v1hzi2q01cvmfgrwsg3zff59xqn77e3j6ir8uroreqvoyuagwnlhz3p4ogczjju4htj7zb2opjfn01dlwu0oz5wxn8i6mkwk0cez1l5pbe9niwknoqomgnpow0ywt6uuz74lkfmzqwdcobk0lr9wbkdenyjpnxt8nkl7rw9eh9ndrpvcnadm4hso4eegbtbloywxh63uu1yyqvh0uo6zq3api6769z5gb4t9tuo91umgwnuat4vwzvvtyzyrtv51w',
                filename: 'tagewm1v4desa587zwzvbqhwr7gn132a4eaw8lcho0kwac601k3pnrk9b9gohfebafrifhrjipq7984th7cq50ub6t2d6wi6o2a9wz0qxomw9q5fsbfuygh2n9ox0px5hskohhu2rifp0ybfxusujg5wul5qza1uk50cd5j0en040b03cnarc941bggb7ufkh26lc3b7uzjpdxygd24aovciy36s99gyi622fkrch072z6tjat86onfsgmwpxtg',
                url: '7ycudm8jgel72j36eyp56pz9lunt1catr7aok6hwvrxqoxukd04jina00jc1qecbvy6z18jmsni7kb2oiacu8w0e1nqd6d00o0emurnmhm207q7gts5i6csa2gv4oljjz3n8b8a9kzphashei67fey4flrs0di9thqgq6vl6x4xfwe096m37iv4oqttok76pns0vvall04flau7vfloxpabxnbpd6ts880lxnc65rxzbdrycga9cckir9o39i0nxe6gx2zxqiik9flfl69392jvcnb6zij8m4fe6oco4ruqp72sa5fmven5c6b89uxwoggvofs21kn77oe4zjyci5y0nmuaiwbh4po593t73un03z7rnrhweuwq6mk7izk2dj8fyispw9906x177msyozuwdkpspghhlirh8ky67z78u21mie9mjmriwhue32t9qs40l32yikxl7l0jfztk86utnrvedcnuosegsmdji1u1pgt8d69hwa3fdt8ul2uwahsivkfq2wbao8e2mqmmohglwkdd62qrs2kkb7bnzvxssbqk6rnq4tjxksviwm9eob158i5h3j3xyc4dnjiba67gjd0mb7g9kg3ph8sxqyheu4vdght9nn3obbgvjkeoazn2xcvnm0elf5v1r0wnwdr5psw8mowufs9oqfdgmjkaipwjbeawc2hn727pr72nlr68n66vxctiuu2n3p4mtgqm0ggn6rt299plu84c85m46n3r1rzdon4r3ke66a6ugdr04wbw1sqjcm121od7a83i2q9b97g7v22n08gmwsga9gx4zwvsg6b4pn07fpi6jeoo2dnq2gfu4e0vq8uaajbi1e7stu5ka2fd8olhq08pyc2ognzltpxeluhzqx62y46oo69ffa8nhbmcn3mj7x26vy6sehj5xb8dbxg0xh8hy09n77az9dwhjc22h4fziop2op066s1fsum2cz8lb6pygwisvp2uhchsaujze2x949d7wx1zdafmga58asm3d',
                mime: 'i8s2e6s2o7ico8nfpmgzbwa9zojab561mtfpf8uheevamca4iz',
                extension: 'jjddptj8h0qy4tpapp7178zl5tev5esrmslp4vb4z33z0fyqjo',
                size: 4233216772,
                width: 654122,
                height: 544949,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '0mcrob17myktizgmowasfsvzsuq4sya1qwco70iedmf45yugphqqb8j1gz12sodxtjzmevkxcho9wy0thyyq6tgyca0dvq2sypnmog58qrz6tf892y7ihaa4sg3ozrooo0tvzgbx5lh8v0nni98yv0hb9hqqu8qd3nmilv3l3ghid8pq9bw9dsxlkbli5mg4ed1mh0120xx82ky5tcrtgcp708qs4e0kcc3kn2j12ttlsq6uvx6y0s19r4dmsk0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'tvf5vwu76yagbgnr92rxjjvf2vwhhyclql5unkic019bh9r54092vrydqy1vccvgrlkcw9016lc',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 400546,
                alt: 'es3dz7yrtk9ocx9enrxqhmzgag3q9ml1ogfvyh5vd942nuunb8llbo9y6quy0f3dmyvpx0w3c0bdu1j5t73k1xtrar1z3hqb22kg0eh8dc5bo810asbyac6n6fz4i239i8zbce4m6b6hum29mub0lhtdphq67wf8m64e8ah2gk47sxyrw52qap1sjx5hn44akggybfs86a626qodubg94ssq9d9686rl0cr7r1ez3yifoo9etuig16ipjy2qmn1',
                title: '8xqtsqpq3o24yuijasfjn31bek3tr4hw1c3h0cbbqw8r8o3sjztj5t6jbwuqdhml2ty1270vpbkvvinusmaa6nql5wu3vccnlnf44ti2otip7m9knr61nys63hl2jaff3o20dd3c0ghjoqzh4vlx8z2mhkhmxodwky43q0ihxk2zmxz49h1shhwl3y6yali27ck2hescct4xyndnlo2siyn7q9og2q4x2szxn2jxunltetqvskgggrcn4j9q40o',
                description: 'Nobis rerum quod et velit. Et praesentium fugiat. Nemo rerum incidunt odio accusantium ipsum a est. Et nostrum id saepe deleniti vel nihil omnis dicta. Aliquid temporibus nisi eos quisquam ad dolores esse fuga ut.',
                excerpt: 'Voluptates maxime est sequi iusto facilis nemo aut minima quaerat. Saepe ipsa et sint dolorum voluptatem. Dolorum libero ex corrupti qui et quod quos provident. Ea id eum facere consequuntur dolor. Fugit et eaque rem non ratione nihil provident.',
                name: '42nxq0yclc14oqkusjx53mcwt8a162icw2u6e1r9zr4xd3c33c2nosmrb45ug0slsnfk81me31v8f27wogzt3vxkvxtz0jtgji09srzeukq41dvzpm14vf35z57eyh56bw07nxcoo6ry27xzmfy5e2nbyspszg8025cibe11sx87ue4gkirvk91splw4rirs140rrsrtptvdi2f18mo3yf78wa26vxllu3oi1ytgame1gi76roimwlylphl8965',
                pathname: '6zotldc909alt66vl2c9wm7a8883vzfp4466nimcvce26hiisb8tcmhui19d0hkzq1okqm45uwcqritrbuj6jxynvtzopc86vrt8iwjeln22ukznqawgrdk6n94o1wzm13k0jydaelavpehpvlxjpc6a8869l2ysa4bjqiru87abqmou2yriof0inau1fam41oyqqqnfhr1y4zc27fqvjgarv6nllisp2d4248hgzk2r93rppsxe4rrea8d83k9x43n1tthtpkirvqqou2ib1hhb5zfaxe5mzsg7z45u2vj6yuz0fgqd8s3e96no0p14yuelywxn7qgalnrw0flh31obq4lgim4t07ogz0s0mzt46jeoj84dz82vnnu6ginqh0u191aot6k8toe0a2t2hhvwy5r6ux5be9hze9enrmjxg45nbszn2on0l2rsfgfms9tst290yjtzsz8lvejn3ev2otdkghfsuds05sg0dkdwknc9ynvvgpdgrer38mcdr28zg1hg80xzind4tn1h6u5oamdagti9dp8ote95gt22fjwttesyh5mxg94108v6ujkbx2dtb0v4lq8x6kirr63tca9nr4e1hboxrcbtpimezvvc2c70dzeigq28y4ju1klwjbxkj8dff4qi8tku7os5axpbdxgl7w97jxgk95k7g5wltyisv9t0tipfjfyyze9cyt05c6hh45yjtnu1eaijh1ssd60xa2kulnhtclmq00uw5pkujwfa0h97axnuzqs0wnkrrxh8dd2o5f9ulq9zwnqs5vmrk6sn4wvslpgelwu4nwnr3oabgu0zjg7mdofezy5w1zjmax1yazppu2caav34xhqsxs0cqbn2dle6tfuz93n0njckbzynqw9wypg655zrzsw2t0hrel4fhoow76nu4uclbzl9pfk9chwy8xtjtnucu2a7ko4w8nqed3akz9ntlozzn4gdz6jwxmi48mympjdfl89ojtejrzxtpxf4muqrko9gfmsa727s',
                filename: '67mli694s5wayyc3ytnjuvw30tbthwrallyjj75xgfb50c6z66448u9dtng2eujn72xkuzkra3pg4jfaiqvfea8grzzo81y8wa89u6rn0kuyhcg5vngxxzyhhiapqacbcdzzj5re8xbjbxinl5kcr7dgwfaq88a2xk1ss18g8p57fds1pwa4afd0xwr1ag5348oih3iaskr90d0uia17rhmolqeiogqt9e3lo38bsj1gr1jgdzhdzl594lh39fb',
                url: 'v7sehzo6clqqojnajp6b57nnmpxr4k3tmkyqrvemcqkbux6pm22iqonxgatbb8smq0nk4jlgdejuqb0h83kep8vzmbh1xwdy202k74linjyavv0bng44ciryfnmye91n1ajg3ayycl5dzqj1ioam626w8am5gecsox1n1f9p2lhpos0ty4m6n2zx7zio12dfyzfjvk70lgbrr4wve0knm5yit7y41my142351l3ab8u1v2repmk2ojy3sjtozmgovlbf22i3yd4p2lsiqe9c3udusuvfig3hxqd0rd54wlqe3fmjs6hz001j8jf96y73mij8wchjk75tm27fesywsfsyj08w169vgj3dz7fb9h7kx95uu8ir4y7jpn0o15tzjd3vlof1jjrvu7ld285wc7nk5jaacy3v9jahnjoalo5hwcq5ior4u4c8j56rm6clizev4r2sx2tuxca85helsow5h1ah1mcpu96p0nbnw9127u3vg970quwwr6v7zp2lgblrg81pvg8ymt5ggl53jy36xiskbqye6386fzmd305072wncyiz3c7t0w8a45tdv3vn4zl8ichmnkluwim8trx7wx5ebzaoesy60pn6mzsv96tlwfxnmvjbr20nnqr9xmnemoo81yx0l5cavhdd0uouqlerfx5e4tlz0yn8n0ziuh12bnwdb39wjh40ehm6ovxskt6kxlmk56plqusblagniec9p9t7gh9kyanru4dya2ugg3pnbqkl2vt1doxjhn0wth7k9b44h7td63w7e7h6d6j3cea5duw8trcwe84hedrx6s4dcf574fsan2sd31vt2vm2t5gxixn9t3xl5t4p8u6eu7po8l52sq21vzj87in7zxyfvf2cj5esnckwmnxst7htnks1m0yytg5dwutbx5oji21h0y6ekiz8ika9335um4msg8agql6zc2b8gapgxr2sjye40ndzhju7r3tjollqo4wkhpingop8bqgo67ewe5tq9an5vnm21lrc',
                mime: 'aw1jnp752c1bt0krx2qixlxo7rj6lzfftswewau1qq06bxhq3y',
                extension: 'o8xkwmbgo4tzt7eyo2o6cufjvf9hltjn4umxurnbhnzvz2gx5r',
                size: 7623786607,
                width: 182636,
                height: 791621,
                libraryId: 'bq20pn561aw4lek5zd6p9o9lgtsj3lfddcb2q',
                libraryFilename: '5daeebgkcoa7upd3tfeo2pb0pq7uutbiskn1bvpl9r8cbem1ac9kvb2wppzlpqu6nyorfi7xtmuldzzdz36pyqtqvzwmhz9prreuyxx4ipgb52oed2gbmj4v8qjhc6u5n47vv776lwwdo05p3gwjg9wss1hjb9hru7yw1zt2cpsb0344tpuojfhq4y49audn5p6ic8jmsjlywbpe781iqi0wnnvnxaawqwk9w7k9rxyl39t6roqxppr3m98qq9c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'qenifus0zutfhr3c6i82tr1jpm0gakyd9b81q8vdt7y5atmdvrb3yjzn06ysev859kxbxayuu8pg',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 814542,
                alt: 'l2dskozwx7aiclwardw82cpov5v6b1koe5vebdxd22uurs0jcjf9c2mskv385nsmlhgyytnwqus2j3slbp6ulj6h5v3035p5ww371l233qlp5hvhw5ksgl8mm12cptm90e0bfuu95fsa93g6j3w9cm9i7thpzvjkuxsmygr6k3n5rfuk1onq7d2lorwoz98qdl5ofxxvhq4hqikgwci5vg76pi14yym0w3jmwavremy8jaqsop9caivk5fcsved',
                title: 'o2sfnl3uh0v8p4r61dzbpf8f13s1uieej3bdp7n7e7nj5emq7hmqbz7mm4sfrjeo2lenpidbp70lpb5ahll77vapmvefwptz5hg725mml47x69v1vz485w1qfyygnsadgu9gyyj5bwtp8re3fgnen2ltik733efp1azwfre0wg07k8ut0flltgubhmbb1pkxqv2vzfyff7zykfg1iejp5ha5rtzh16mzt49zvbbl4tz4t6t2kx5je11clgrhg1e',
                description: 'Dolores asperiores sapiente nostrum. Sunt magni dolore omnis dolorum minima recusandae itaque vero. Officia dolorem doloremque dolor doloremque voluptatem. Laboriosam beatae quod enim.',
                excerpt: 'Et laborum quia ea odio aut eveniet excepturi quis laudantium. Sapiente optio corrupti dolorem dolor autem dignissimos impedit magnam ut. Voluptas dolorem laborum voluptate ipsa fuga laboriosam. Omnis vel sit esse aut voluptatibus at. Incidunt ea ut dolores ea doloremque quo esse dolores. Impedit sit odit voluptatem nulla voluptas animi.',
                name: '50scbq1kzd02tmbby0zblukkc21x2pc934sf37p5ff8ozd62s3n5vwlxoj3zwh9d8iptp253ibsdobhhcen7vpspbtfxxqns0r1gd2g5lhsa5b4mb883d7g026xlqhp8gnt8u6oryniyrs83qi7j7dodq69r26zbvuwccxxwuteak5mkyy6a0ai0vgwmptcv81cmwx58ykbjnrerhllehq59vbaxux4u1bsh4cu4a2hu0czb5gscysxviy6tri8',
                pathname: '6mx0ti2dzo6vhp9pn281bppqr3q3glckgmlpt1j7hfflzj9m74k8f9y9wff0ooebe4gro9wvbj3xpeod0vn4vkhikoxhpser2emw0hr9asmunc6zfpif5lxc2rqvcfqis96u1i8k8vwcef0l2r7wt13d94gxvphwfs0908gj0lv1zv171isjih61t61e046rfek8brorkskzi4czs2gl6wledr3mzk9l7mlryolzcvkb3332c11erkumwy3ngmxns0q4608k54fgqk36hqmtv9kv6s6vf17fbk9kv6i4cnn6yc5e87cvzd7bmznw6qzfvj0fqm6wce6u7bg8pnlvm1814qeldd12mvtgk2hmd2k6xwespqz82uw6o7idmt8hdmunornyr2gdflmbsb935dlljb8x32kf4nua4l7pzy03fayy3cz085dglsnnc0p54cp4z9l4vju6ji78r81m1574oaa23qlzz3u2ktoc31848vr0gzq5v71y877mmzni0xxo6hiw6f01wgowxpmdhi5bd0kasa7sr6qzrilj9eew12dg2oxwsgarxpxv94hto2en4vutwxgomu0y826i1zyfg9rjghl6mxsznpl265g1uhn7vjuwu2s211w0a1ezy3e5j05kvzbqg68w6ed5m0d5y8z5i9omowk05yrnaanccmvzf6ioqg4io88lmcq91nvwdm9n0hr0jlknmm1j806gs37ekhmim2j9fk6jtchas5cwtfgj300wxb3xzlojpyjaqr60ck0ifkuxsnf0l85mq2uiqhllrruc3nw22kjefalpafpynn2fbe2gqrhkoxi5o8inm34hbsd9wybzhe4ly0hh7w6xdqqt7eo5cpl6z40xxzgq6oklue3qrcqlyl27k9l8okmvd75v41o54h27tf3whekbz9g0whdoyub90wn3k10zc29omk307ffijm6tlyl7ys16j5iugcjkqa0eyowsdojaqmc08budbz7gupb20xn17xch4x07uoxe',
                filename: 'kupmbm1bvh8f3061nc7o8ckcja2t0vzt4vn4nvj6zwsuqodq9smts7o9td2afb8zddghfh6rgl9vo5nrb0aympjjwyhlzjhlmc3tkfvzty4syf5d65thpq2hjldan3c48vgdtytprx96l2vzkbzdqtfhtcwxwznam6iaytmrawipar6kt938umq647f5u1habdip3i5l37hlkfvdew9pctq2vejm6dxofduq9zb99bnd2umh6w6smwoil9guxl9',
                url: 'zwt94hyzzmuq39t505f1ik21ms9tq2bt4tzhyndquzir5cpiy3uwh2a6solysh7o9qzeb2l6gm6lisl9oaaldbbxjjrgpisuohwyrmjk7klr5gzk3retbuhwfvv56e9zgh103aw14q3zwddr07skpqykzytv0u8q2djiqk1zr0kxhwu06dduaix0y1nnzod2gobn5jonndh0hq6zfe784k15yixamt4wu89puxhisa8r6mw46awi42av2pqkoenpb4fk3q6dknzptrse956z7aw8vuxqbya7ic38y8pa24wgx7n7fnhhz19n63h4d419spgd26r4q443xj3wr29weu4zu9aisc2f13sezp6fspge4zqhj74zmbp7r83yzdcnrdi2ae257q9da48k9zosmssbwbs62ru73muu99b0lyfd958jha7h5wm9ffbhoy9o9etfykqcd6xxlwc7z3xbad5hubto81wnawcocq8mqsoiv5nt21ctc9d5wp1maqlhzjr6pl3h3dcf9t2b4cydyrnf53xa7ju3fnbl03uuzivkk3434zbrmtzj4yayd840q8busjwv1wm6fztwn1bx6gx33pmciscf3z5tymkw5uql9k97ezkj0k6bxsm5ql4eaq8oi6kqm7ldp28lr1j4ath1zyuwqndomz23hnaq4hzw9sy8ix1wybnyd2z34oos4n1nunga0f0i4j3zsnhe33yt2h4ynnzfgo1iuw4elra3uv2400vdw81j8mgrb5uco5bf8hqzsw2wjx07g0y9acd3feo2h8t0go0luwre6uyw53dgd5uqs5tyhr6gcy4augc6v6wly9tj4mp6pwx8vtssp9k0if94jvi6b335axz1gbk56ni8b3fgcda4u83otnm7cfy60smdxjk2b70a8rttr4grpuc6lpk9dhf1j4oa518awjh40tvp1civ39ynqjt9yr6t6ybojtc9bq331fxtmyjfvatfs8edbtf76z0an0ni2ldnydruzjg9wwr9',
                mime: '2hdcmfbeccy011mwpst5hp2jo9019daw3nq6opoqczopv3f97y',
                extension: '023pdipqed6e6fe6zgei9gr3kw9w07tuqf7b8ezc1vtbn3px9a',
                size: 7656683479,
                width: 803541,
                height: 244093,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'mgb4bnx4oiib6h0kszwe4we7t6juwxubea15hgo3tywqslt4mf7h6edmj31na1fd4lrt3xdjjsf6kcwtjgo6qhmknumz2lkbenf8z2807agml28gcr9t27f44nc6n8cspx4097vs2jimuh2j4hyqrtb7trj8csbilqc745uz07lpfndas0hxf45duvtjooikuz3uvxipu10wxvcvmyw1vs2d67b6h24hc8iroao99dm0ush7jd2k6mnu59kpjwq',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'tcxur7f9g58caiul6g3s99ilt9qtwjuxl1tfqz3gh7bw3gdvej5auqb0fb6x9t3k5mpzh8wru6t',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 9230459,
                alt: '1m7leu3y8si0n1b71srii6s6ommgr3n64lcf9jxn1cc0xig3wab9yvuxs4r3yzru9auop7s9ej3uv2wbdgnczox9ln9cfj2nj324ar99g5q8jg07lvjy9z2iq4x78uctojue7ihou77nc24vl3mgj5vdcik14xwfw25gn89u3brzajbkvtoazy96azjv8ku2x6h8uaygjjjnym18qonn6o5910t4es9yy30ckcofb3jr6co9w5qn5138pzw06iy',
                title: 'hvkvyyw9ohlc9egw91p2mwjyf4dknh8l62qpbttppmzsh7mkzr5mxcuwe8yl8tyyc60rcu0k0k6whnt3by5osthxchwxk0op60k1plfbidkr58wx9ok7d4901scm428fdtfnx0j14mo1u3ndqmsup0l3fdqqwojaah19jqzftwaqv5ivyn6q2w3hoon197uic38y0zbzy8k64gwxx1avp0c0vi6v6o7os1hv87lt124q9vxdfgh2udlglod7vbm',
                description: 'Aliquam harum eius sunt rerum. Et omnis facere harum fuga. Sint sint voluptate libero maxime mollitia doloribus. Ea quae quam consequatur iure necessitatibus exercitationem odit iusto. Incidunt omnis eos. Omnis cupiditate ut eos corrupti optio velit est rerum.',
                excerpt: 'Fuga quam similique. Ratione fugiat ipsa ab provident. Sint nulla dolorem aut id. Est consequuntur fuga enim amet harum quisquam est omnis magni.',
                name: 'z8tf7jm9qti31cz2eqtyitvzisxxx5c22p9jwe799341lzvcj8bz8rcncxrqhqrnejkus03e2hii2yf08ung59tdbr9ecar5hdnrkb8lcyueobn7irln1ri5gpflmr404ev3dy9nb6ch4wogdy5z0vmzrq8utcgynse3p9ih6wvae8jsghxjoauhlid4pbdle1qun6vg253xpcbnvsiz3837jz5a4mpdyh9pqfdcw1qf4awi9ap6eq5b7s8zl3e',
                pathname: '0xe9g2e83emhszqa1myvkkjg35dhgd0uzalxu9l4w6qw4vyhygty3qsmoldzbezvhzsjq7d3q6tv8yk055m4sdl8vcetzfkxhiwyk7kmd7n106k5t52f1zyo8tr37rh5czxczz6pti5cwz2qu3ium4yaa9ryq3jry8ecgcdefcw8kgwu97ruo15km7r9f0cgeklxrqavur35xv8loivjp64hrqv4m4wjqbmume5h8r2u9oihh29xw855pg1qrfqznja8ojlf3w5r9sotfryoj0d7gv3ihwk6nan15alm8mg64dkubmg3e7bad3e55w61kvygc2zfkb6gzj7fczqestjw7d5nf0xp5s76o3w1cvedipn5tjlz691cdnfqdojqiaperafvh4glngfecr4aroq91xjgc81i6wg9r85v14wur4sn0itm6hcjefjm523y2wqzvtg0mgqnghu0tppzkhvky1vzaez8hr12jma42uctsgwe7o0ydaenfng5wyoifuvf0ggc2kn1ynu6zzg2zja00w795sdjix4w10g484s1oul7hfu0wbkba26z8tt6fkfqkf47x2bpwbjjn5pz57h7h5kny5ptjsz829ae0sjxxoqva2v1dal8kle7qku0je4xc6stq0r12f018dqk62xrdu06uq2gharo3fiq92hngufzorsgs2no7802qjpnes3nrazbq8u07cshyesj1zhmw955osghoy1l5rncdcwbst3l7c2r7xab81plavdyk2958uyrjnz4a8ploe3cun2qe92yc6qlhese7ggvo1jbzcrqzk18xregg1ogchuamnaxigxd6heetzpxng6xl7na64rc9fk14vqq57kt6pi5d326ucnch990vnmnp7hp3bz2fqav0ao4vnczigfd637cync8usuhr2c65qvkds4iaufwd5ms1bsjt0zjl86nmk9eynb1uivj405pfe1uip76iaamr0ceyvk6s0ut1fwbrok2rnukmyfggjndr8iv',
                filename: 'rign4og4i6bwy76ws3gvyhntsqayz03omhb7i806hxqnygo73xll493hctpcc6oztzznrbx6o2wm8z80adytzqjmw3eulrvbbljzmfp00ia7yo73i0k8b890d6fd35n6lbnjocyw2p7bvxoro4b78ykp9uc3w5t9yplmj3y4clj6mu0lwpvb0h1u32ozscdzf98bwohfyl7yectf6k4njqsm081hgmw3q0obqox203xik2gr9uoqba0to03nwgz',
                url: 'by1a5n8ygrt5c9vfnpb95vv146da9aeu123kranm35fz2ymvvem51t3blx6puuxjmgqc0jzec4mmnumgbet5gf79d5q77c77ooc23lpc56571obfrwhiszlo2oiarzi8hpqkyeziro4kp37ck3e9pyw90th8bp4fgoeb18z78640dg5crjfar0z6el0ywnieeq27b0s95apfh1a8636feg6ywm3bm8vcbk9t02296oex07mg9jnyendtcr6zz5qbmvqpki50fu72b50coy1akxecn48hlhk5nbd8pyrtbe7nmyyrn4go5244ozykmx4q2qsfsm3su4bh916jug591qiflbv8hsxpacuvmdammbozhanpiqlvk8av6uwn6kfiu7ycu0axjratyl3ok4twglwbs5mmvzdlh4ln7xm8082756emyfwzne00t4xtizyk5vsnke6dx7pdycvqgoxl933jzxg8gh0dilev8hcg82ug3br8c4ete57dfbi5shoidavvo2vdptsavenptejlgax8j5vv8jytovaiuch6zvzkypu120ah7o1xut3iqe3tfikvv7xbtdhxg9ypyd6h06e2ic2m5y1yu2o1vpm4bgalvyuz22n0repusdie4soyzd1x3octvpac7wi1ezni7t8qvfv212t11rtc3fnux6imvog8d9jv091n9z42z1x2kkuz01m3okpwubkrm0886wsdmssdcdnv42lddn1o5536pskm4ab9sueuynbkvqdu10oyviz33sd0lqqvla84lq9s9hefjqoux4xnlteysxdiizpk3wf0ooa6vs4ht94mw8dwnh9qc0787dla82q40dnf0jaayv8wr4vsz0av69hcp3ixsrrh8x9didxwgw0arq97pr9vmyvf53tflp57mk8fae6zn8lx03qjskyhbwnwo5tzol1bv28yu9xgc68228z5nth1egubr3nr3d1ldpl8cpdxoa8cq35ypbee2kvvo5g9umrf2cf133frn6yd',
                mime: 'lourh7sral09b6foc4f04rb9wncz9glmn9937m150tsl6rpxsg',
                extension: 'n0ssmrifkulctdawqtswjn5d63ivcgwd6xtx9ag9v42i4aszub',
                size: 5135588341,
                width: 557729,
                height: 440287,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'w17rq555gvhu62km1i298jy17yq9yywbtox4ucv8rt4ytiuug66jcb4t331b02gjikxc365rnarzjjtrwu7qj9vqae5o8leqgz3pyysk97gufuutejibmafofzt0tttc8rfurizj6h08snnqoddeo3qzrc3qgewrlehadshu928tmhufqnvzvps2sqhal1jzby1z0c28sqds8bqnl6kc1sfnztakvomjygnx81rsonysc1h05augq6klfwp1pjs',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '3nuu7ko0wqvgu8qgmcgquqdfx92kkwjccx84i8zzbchcxwci6m1pigicdp5vksiljhuxluxask6',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 358515,
                alt: 'yd8osh6e7f1gzwuoxck7qo4lhrhpnxdz8jbb32k5xtdfw2clfscuj0z1owfkm7rus501z63k5w45f3lzhf0fw47uott2a9zccd1zyrcswmq11u3hiqh2vt0k36s2av4q0p33qjytvuhkouwr1opgpq3qzd9yfdsvchhgrcxc5z8pt306em8a3g3wjtwkjjcfqjjfo1ktu7cbnz6tbv9u3d0n1tgj2sfc35rdw9qep51rn38ea9dov5igvv43crue',
                title: 'o7ehey0vg8wyb0cc10al7wec8o2s9p9expzzb85z5xcwe7ghjon3adcsrjugftrign38par3xmvy9yabbczq78jzgqdqxlcq76feap1ofqd2y1c5afzymajvea8k5plff2l8z3ul1m4ruv41xv52dirgqn8jnsdfaqz9slcwh3jgeks5enxqrt2x4e5k2wy79zdyihqdcph8oa61688s8xqn008sikeecl7e1p4ikbf6xkx2hw06l06e7yqs0wz',
                description: 'Cum aspernatur rerum ut vitae excepturi aut quis a. Cupiditate rerum esse laudantium et commodi. Aut dolores doloribus delectus modi blanditiis eos. Delectus distinctio omnis sed et modi. Quis perspiciatis alias dignissimos quia et omnis.',
                excerpt: 'Est alias eum adipisci ut officia et consectetur. Non non molestias quia magni. Perspiciatis culpa non minus.',
                name: '5f2hlxnzyn3aazdohpqmd3n5pv82zqsf1to4ybrmwx6d47ctme2iz1ipeyin7gb7b1acrhkrgpxwr3mo4rp4c335xp7qaacyji5lnw26pyc7zyri8l82jgqpakdyp96wd34tg00j49mfgx9zgkolnzn3uleaf99it9f9g25ak6b2b9jylh4mngmy3ok7fipux24n7qrj89a76dtdojuvovp2r5tooazykbw65hn80g8npm2e4vdkye97wenwrj5',
                pathname: 'tjm35xpszrf096g27ewi70hucn5u5fdu5fv8ds8faagj5ledksf92d9vn41wlekm8erydjyi34hfbl5kdajk7ac0jt5ypoke2nw0crwqcrqw8i27hsdxq7m7l2rw2gyn85bmzpn9wwkxhz5hjkpnpym1qe3zvyhi81e75ah845ond0z2s0wc0zy97fn8ukge270uvic38i48q1wk25fdsbrhzj1xz63aw8uoc4837y3eib736owyp6umvuc97ptljjiujpqebjnll6q5pznm7enfs1b81hu4pt014vy73y6ltzz8bezof4cw7aviwrngdhdhiow8kndenlo9mmci35j5upu9eqkfanaz45aaihgvdqp3elnv6d8p8m7zkww8428wniyoce4ox4a9jfc4wqaivfgr35lzez06dnuy29jjymdpcwhtbndz24ts4chs11mh5a1qtabfk1u4ihmuqsr2rpzyxxe0sse89mig46588eg1a9xq2tqz5acpwirmsrtan5qjtehzdkybdj3ayz95n2gp1m44lh8309jgur2t8h54r8p5906fd0ah49zyb0uitdzbgg3dwfgo873wxhayr8sav4wkwiz3ah2br2ji5qn5b4v9uzmueh9mhw9xm3oyp8d9f5uzc7g3uh5tf9g3fv8682xxs20wou1rdbuiu22k5us8zqa64k4snwmnfnwinh603npleo45647klhwovlw3c0aiib66so1yo6w8kwd9aff5d5evrcc8vezkm6529p6i214ngl3llekh1c9qjan7uu7dqnkidv3ajft4bf8ct7xeo3vpchxfto8krfmbfsrb6ovnhwyqjtmhqarkliq8w182kx06gv5exr40x5tz8y4jbkof12f5yxsb5niwi2gki6fpe63o0zuf0xflrjvahhesdt7aknrnvtgjlznw0ouj02sk8s12brerdsgvjb4klifynp1joqpqmcfeqjhi8vcqpu1g6wamvzg2bishb2013h0nx75furkx',
                filename: 'wvl7f2tz37o1xbkxhmdlvhfmnwyd5g7ro9qw69rn9ws1q79qrer5q8vv8e3336xthu7od9g9iev8sizbdvsam9fraibc36sk3d3nlop9ha6l07km8zk0ay4tye303t0t7qm8tgr9yu9yydzyy0gc3hx1hoee9sz5838f504p3t05tyh3qb6cl6qcuu4a0iegje7e3cjq2ucm7rdcu3iwx4385fvlh0w26ljoe3gwt7m6wlrkqxbdxz3tfpzgt93',
                url: 'xiv981xl6w49k1uwci2w2oihxq4oy31mfc5zcbxx9rpyq48dn5jo6xbikjqpfr6yjlsxzkeujeeji8ot4ndoycnka59fnhebw85z85b66v2pwwq440dcpueqpgttryy8vb5s1v58vyzl414hbrjj4zlsvh1rviizjl47nr9rqhw16wcg976r598b59tzrl79hfljyfshvngd6go00oqrn3hqb6igimu1r39tt6ir2cumgrf8ccbonnn91k1k7lpikkhw7xqo5javsq2wtbb0e6ng0122v90actmssy950vhyuk7v2z6m0k26yplg2knkrs67zbq52ozftp0h11fkhu7fvw50yqaecen1pbw6vhplqu3k8arrn1uqbcfbsnp7apwwz37ec3y6pm1h015gbitgs9p61tt6egit33brphc18hci0w6mptgnlff3o3tjh5zn2of29lvg1tl7kmio5ov3r057f0qjw4cd4zkivk45vr549kpokkv1gs58htmahhoqs1w4ryz6q0fysa8xq0niwbhf313xay4dlu1hkvc6lkbj70zspgn0e3vegnik2rr1q7pok08um16k6tavx97wgr7np361phmx8h0ilb1cgvmmqr8vdsfpafqjpz3s6h501dix0kxrcd2asayw4yw15e99iqaq963od5hh2lnag0gz5xvoaor6g9va7bs2nc0mamoetd8l07gc7pk0tver8houwhzfyp2fbx1c9hal0kuvryxdfwtt5cd4b417lp2ykku0yq8gddg1h71n06ecxgtfm4g9l05e23zhpb29rmtn6513ju3jjz5ean8cnrmu5sv8qes9ha3llo8prr6p02cmfsnk6eyhmgh8c7j2b8klm0bo8uhs76k0bc8io81wxcnddhkhm67najy9iikee9qrjhlups005b55uo8xyp7sn4ax75lg575is3dl2ofira8egw292nxn1vfdtaqrsvp561gmsqofrl71dtmvyfkkwy1xlu0ojmby1c4q',
                mime: '1ival3kdcdce8d1ds91aktjikyo1t3h5t7ebs2bos9brn3fo9f',
                extension: 'iq8hx9od4fvu7u4ypkuivvkxcpwdkrkq1snsvzatxjil7e78zl',
                size: 6505155371,
                width: 536093,
                height: 457978,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'f7em0e9ny5wasfd0fy1rp4hbd11xoymnr4rtdqzgyzysbkluh3yooy7n711yucq2l4ar1sl9nnma4vdyndkwygcjw3rs22o7lvcqkbhsacxaiev4hxhwa4544hid5hcm15tjl7p1xk9fwl055pdyscce98eiqbevne2odegvby6w50mj86t3li3g6kmqiffw7tp23ay0wjtbug8sugc1pyhroqkp5g39bnn6qu8ixb7p63iq6ik8v7cncfs2hzd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'ys3iijkcct6izb65zwr22ctki0kkui238wfcyq6col3fmjwf2tm9tlqhp4xykt9889ozm390dn2',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 503157,
                alt: 'ziiu47uz99rqsa5g4rk9bfce9s5f5wtuxcn8sh0ble5rwt07unxf90wc91n4hsex5uc9gj1j8wuftag6frqblpsiv0ya8yja5jwgddj7yiwegt5ehxumqdy4pasx66tnx8eeb9prspn5zfmwfvtze698amyklm549r5t9jpabt78acderq6l1qoz1skd5lebs3mys6cv3jprcenrreafurip8hbjkovadmybl8ar79likiqbc1cx9dgtnrb6wz6',
                title: 'hnctz14w59b6gcb6g9uqc8cjlm9otyaehb5v3nbvd2i7arnjysr1id8q62g1jljrhzo567ymct0phbry5a5z31na7yqcbo18n22ea6xyj2dngik73patp06h3iqasazyit3xo0me5es18fja4t3lvmrefbeh4y02a6us58s7p7dbusizsvgcxy1ocfhnp8iheabyjvi268bb9akgigw3yek2rkqfamjya45lth4rn56zyfa6bccek966vwprk3vv',
                description: 'Nihil vero neque voluptatum sint quasi repellat quisquam vero iure. Iure debitis molestias atque reprehenderit. Qui recusandae quia. Eum sunt non eos voluptate dolor rerum numquam. Dolorem iure ullam mollitia assumenda id dolorum labore sunt rerum.',
                excerpt: 'Voluptatum aliquam consequuntur. Ipsum nisi libero natus. Fugiat consectetur impedit aspernatur molestiae dolores. Molestias esse laborum veniam quo quae rerum voluptatem deleniti. Impedit laborum delectus.',
                name: '73fbyk2ks03l06k9xn42j6hkndmzs4txumggqzfzadujvd0xzodx6s1ffwocy8tcrbpvqynjylxqqzmnsvac04lk7t9k6eyj1v1joac7d2t1awvaao58jhe7mt0j1n75aly3rqcyfqpbkv597dp8j9kkznj2a7ntqh936rdu5q4atlvzjsobzj0ytvo9w0p19mdhvrrzdr08n847x421im3qbj69clj8dq0hm7firh0xghcaco1pz9hfwed9eov',
                pathname: 'bagosxqq7adv9366qkkf0ofobrdeh3ulzm8e58yza6qlh10yipkfx8fl9nooftdp5hatf7nkjmo9hpqngjly9a5ja1xal1jcqcg2dq27ryv5ys5pzgqsogt60e5u6kvmb3wljf5b1mbqso78h3k37zqftr2l80on9whlvlwo6zbeb9z9f88jjanpb39g0jhfgnjkmopwxmf5m0zfnr8s979n5xx5xa82cybxj5a9i7m2uuntdwdoiopcgeexfenzu9gx5ubf3guame4py6ycd0jmb522wqgaoolbyzhuo53qf09yct1v13xp7vj5i1xwyr3yu7rxzcci3v3nihai38l1525kc205jfuouaz2h0jwzh8ict04k33xrfh83t34ejojn9bmaqdlhz2mt38t2h2bzg4dop2begc7kp98ehb937dza86z2cvio67wpni7sru4ot40ksqv5wx34oo0m4a4l75pz02qvoakxvbwqwvfycylqdw4pqp4j1rzpg37qtehge2xxn7nnq4txc4w0rlfaksay8p1itx0p4ssd1w6073xu39n4yaj244tc8gw2yy8v2pm3c4r85ptd5fc6znt41337eqdsrolz6f74l848hhvfs6may8zznuwmwjw1uogsm1swy8q6pc3wwnp1trzxcewl05abj1n1hcb6edvvu0tlah41xn9lb1tb6w2t7cj423obnpj1yyevefo4kdkmjhon5rx2g8zmo5sinfeqm2gmfrggh9akb1fbnd7lacmy8op0leer4n8g9g5q2p6qew6kdgvij6y64zwf96nnvs34av05dkae1tmeqksq36x6ebavze65nidj7n71lpzeqtzld1ua89e06yddn4js1ildbeam3c2csrjixq5m4c121o5ucu4x3njups8lth2aw5zgnoqfsq75xpsaj3wzuma1ilm8oqxaereqh9nv4si06pwyjbe0j5199assdbt4b5prkrdqeucvdursuu9mbnex4ycdr8ydup63v9v',
                filename: 'y20irb4jfmlo5yuipbxbpu2fpgh3gxbd5207lui9gctso3hbmfttvtlm33umuw6iy2wviiuofi21dbbrqg75lw4wnrv4mbrik1wfmufogamdzrs3tuq9jnukzyf8f5svx6pme1e91lgk7hc1ekmmtlm5w5vyxpt69eaq0t6wtbj42x4ojdm4y8okthw0dohpv9i3b6rxlf6khxkcda84xsbbic1vs4yrlm7hb4nv1cenayajo6wehfy19g7wnuj',
                url: '4ig4ovl34jsa4htqoa660upb2lzf1ujbmucrb2anjdaiyf3669wzdpb3z71wbwz32m363cl1sgn5py60zfcwiovbjpmntehljvcabwfiq4h5xihf3nld5lxmj0kji67dkbuya3gfghhqpkn652yf4dxs959xgpey4ku2lytdx562wrgrqhe9to8l41f2jmuoe1zpaxn8v7joil0n299qoor5ms31iy1l511guvon34v8j087u8v3q7ppa4jupoveupwkev85jbwynspl1hqbqy42diknomvq2790h994wov0pj3dmkdajbchflhz1pzs12jj7esd1xzwefsaljkxs6vty76p4h6d5477uk5nkejjlm8i62ld6wi821r7zoo5tuozb5is5n25kwc6h5zfdprr5ob20fcy8is1omxzskr8v2asjociy7vzrjrwgmu4b9ruclyye4ulyeg1y200wnxezqjbe5wuejvzvqnuozh45w65jxzel2mkzf4ax3ps0pxwy4bnfeea7thc1s810e9q0e5tt2mztvc4oo6prea1fjkpix9t0k9kqt4yzysozjxkfd8n3l8oujs5sdqf1n8zyg2fdavv0me8c8fepue1rc33syccp8vohqz4zhwoizxccqjn0do3o0phlifiw3hh5vxwkqmtcpysn5723ndf4wpgzc4e482mrmqk7syf77oxajb2vsg81y2s9elzmwa8wjto3c0b6bjv98ilgvjzl1lxnp21rwb5fpapcaxdbt9rlupkvsgan8rlicthftoq4hgnik6j1bl8xbosojrlwte60lfsyyvfdgh018qmrf7ytk7qetr9qrixvgjznr8nmfsky725ri7hsaf9bc9v4lcn7q2s6obs8pozu9e0nb2jcp90tpaw9dz17ok136ta6ojskungie59j0yxbe1ju95y5qoyh0addgqzmfmcwvkf7vunlg2kljwdgwbclrcoe5rb5ajcarnf0uzdettjneav4wuowrc75sg6eahm',
                mime: 'zswk3ktnicljiqhgpi5vpmo4chi7i0lwq6syn7dxhjoop27jdg',
                extension: 't65afdhyi9idyld1f3cx2imh17wedzfv6pdbenwyqu2tj221qm',
                size: 7188730226,
                width: 638626,
                height: 514311,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'm7ca5ensgw4axyqoa9v31o0k9sk32ifvzibztq5dvptuqxhnhg4706otl0cteaqlenm7nv4jzigj00bir3unsvex83h4kzvkxf5065ijwxo8d8pmdcfdbwmme0r3lkkx2e4h9h9se2a4kl0qqdbo1bgvjnpdihuvvfx1yjil72rsml2hr23slgu227nrzaugqtt559ocyb945p725qhok53dvj0zmr1epa1v3871d6bnueutesyfy12f3vhyebx',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'wheezriemsg3dmh2ve2oat9e1hp623s1uds1h1ocylcrz0g9i3e5en5t6mvk367j8e8jvou3j32',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 973964,
                alt: 'qaobsbf0sjczu2d9hp66jp318cybl36gnsam8z96wqzapyo06xfugxxs9lq1ej8hzqcjamjt37zq7npukps1s3v9hbt7dnsikk4mm1w0e0s8ni4zf4ezwvgovudatajnrd8kzm2x73kdw6cexfh10v55e155oyqizasg3e9vrvvv5klw57pb3jtmh7070gobff5se59hb9rnhown77y2y2vqfa6abjz2yq1ixsyu7pg2gtzmyzlgm1dj6q2w4su',
                title: 'wc08v29f2v76ab6scyacgf0iy1aal78nasvf5zelvzpj8yj4dbqtgbyoc2p1okfseamz181ablf9ktze5f2m8f81mm5khvoare3bjpwya2c75rxug97tyahedgfpfk5ephsc65t9lkj19jgftk0lc34jxfa33eblvbaoyb6kleke0fyk32b7rti06u5j8ibyadv3onnixkzf7ge9adxc5yqbg30cqff2lr7j6wefzynobp4axlgbeew4p3d5oei',
                description: 'Et in eum vero enim voluptatibus voluptatum. Sed ut accusantium officia harum alias sunt et nihil nihil. Nisi consequuntur cumque ipsam. Ipsum sit sit eveniet eligendi velit ratione nam expedita officia. Possimus deserunt temporibus corrupti odit quas.',
                excerpt: 'Veniam saepe distinctio quo facilis. Qui numquam dolorum nisi expedita. Voluptate libero illum dolorem aut quo voluptatem eos. Ut amet et corrupti magnam.',
                name: 'vyccggaqf47b14jb5o8w81yewqty2blxcd95ecr55kowtvmrjy6871lwv0v8hfnuu2x3mgu6pcgjjyncpds6g4fa16o5xugcmci6obcoix9ivybcxe1es6i54m3yv67dyuxhz7ncxaepht0cl7fqgn32nozdhhjsn4asa8wjliyymy5ce5ia2dd6fkd482982jlfl91va4058whwy25xl7oz94kzyhphw3larcxu4mpw9pkrh4hjq7kwc5ddlinn',
                pathname: '9r1qpvir1ehxa5ualz6i5zo2yy1bhazmqaa9xkq4ebt39ammf1bwuyrtbary032j77dsg3jpdzihdqxhsgy0f86k8lgnsnadrftwcdzdw7362ru7xvecniiil0k9q2g6w1tm50n0hx4c897kkfbdfcgnzp3tlmbxrk6hjz3x00d1hx9gd4q47ozwr1yy5tph3962zat4qsbi09r5hjfmauo1lhr8qqbdvc7e0bgncgpjuvxhwvvsbqo0xkkh1jaqtmbt7a08ctqeeo58e1rhvl85tfyn2i6xyxly7uu5m769f916mpq1m353og1nl8h7xacm6ji8a7592msrmoo36pl4llith3sob3e8h8vatyw97h7r3j781kgqimr1bscxbns3cczlghe5eqwajuv3wzy2bbs0fr08uflk98k9m14xtbjuvy9tmuoh8zd1eah2fud79b2qj4it5s9jpdim6bo6uq8ol49miae5xas6omkfb2y261zl0bdjqo5n1ch436do4c1hm6zywxzudxpvum1vc12shrzr0ihb8nntbmc6rzrsu2zvngkspk4wqo2ulo29u4iabz2grbwi7m3p9i9phq3pm6wm16rp1q0d39bw5vh391lltzofawkdxz11wlvc0yixgboz3c2fm4a2hpees7xusc14nj5oq2zcmedulntck8em8eqyg43pmupajcsqlh35dqkzqc78daahad8ocde714hj7k2tk7zpk0lelek22sf3bat5cmtjd6eqymrr9sces57r5bgp3rcszucjotujay5z7u4mwfzl7fxeuf974fmlo159kb35ch41mu1jkzpt30kimqouje4461v6fazg3cnp8amxollj2id52yo12u8n556ry3w7ypf58up9tsx05415jv0mmjyu7wkyxd67z9kwtihw9tt43ymb36exips7rj6nh43u3i1iyr42psjptl94s8166k2ay4yawhv7zojq7dbi8rgdq6ejjj7ddz7u2hgzzz1fiasm',
                filename: 'dsvv5hwnghg52zpi20h95v3ap9athswefw63vrrzersq8f1ug117jp1pmutwp6btv9jzqya2qlxh8lf19ot1f3lhdgcsfh7mdqeeqeqt3gxmemm08zho82kiwb7hiehh32nuivyj9862gauuzzxnyjzgvif4up769cdp8lna7t1q2l05cotohgoh628n8ifejfunb3o159poxarhfb4cs16p2sxxe9dj2esdedq83oekf7uiv1mnm7cc8z3tyvi',
                url: 'wobdd62bzr3nhzqj9yyianrcz8i5saji7aegxc0hyze1q89um1urhe05t8tmgf6pw14jeft47e4fkv01w1hn34muiec8mvk3miwcrbuvxq2hr66upw0b0aabearph2vssgnxzhmzqe04e4ofn9oit0mut5exkenmjvx2xksoo97l2v69lv3i6yupmcu74j8mgjy8jjm0owlh9easqv0hgkzsk8sbuch9tis6lhctto4k31eft7w5sei1pj94v0gkjhfhotlvyjn62ilw2ptu6uv9isfy0wkl0f8b44bjtny3kb6zrr1sfrb236fklspkb6yjym0aco0vcbhwxz31b95fzlce1jokk99vocs9hm9d2gmmoao78iqevqkyqnxp5amt7k8x7e37y857r1d944o46sgtp3co3pe0o37rw66e3fxkxv6gsf9n52l9utoc3mwrxkf2odi6hms219rb60moo4uc8n96ym3bozu0hbw8apmoyijrcabvu8gy8hom32ddzryjh0jt23olck65l6hqyog2vvz5mu7wn6kq4ssv2ehvcrhknmz9itk8ehmrvmq7bl7s7s9624vatsyaawdj14f67aenq5xsx0w9hf025i4smtz2sqc7d02nn2ubyaui0g9phvbvgeq11cfy8o9or8pnyxf4fo27x90b5ow5jjuzge3eymfad705udsus7y74udav5icp74kgd0wy5pgacz5inhykn1jlipklzr6sce5edn7lb6sptdtep2ipky9qmpw69p2y80zt7oezcxiivry0edk3j76oe488d4ca1rxui3qsiqnv9asuye44zvi7gkrhxdyl217v8jpz8m30qv5cp0tdxzpuhok7hs32nuknfl6fn35pgz6wmp2h3mdi4g929pl70t6n863wxvbvly8vf7b5nfjacust5kg4dl5wfgtmuf3blp27dkhx6fktubq9d9dni2e0pf20t72q96k6hzm2b8vuigrknzmxnacj7at3pmrpwndm1ze',
                mime: 'p02wwfirtbc3j7n74im7fkm34dtxn5tnh705h3zzddorxugi8a',
                extension: 'zhz4799i8rfn1wuydwjfqznsipyjqy0qzpg8fz1kl8a4b09ab6',
                size: 1018103359,
                width: 253551,
                height: 153902,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'wb5i7mmuunjidbg519scpombjspgayo9h18ep0k3fo25p9n0yiymk5eo9stuxncr17xkelae8ckn3x6o56ywklxb0k8jnk8mepwgy8s8jwe8b8n7jpbi1q2jyeix7bea246yzt1sq5ofgloskivfpaj9wsiey3hbze9lks0hl1n8f1yp13vsbptrvxd1emnmpyeca8gcsk9gwq736ua6fxqwiwryjnrtzk3bxtxc6gq6jprudm7la1wbeby765i',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'vk930ng1fl1da4ijnbmr9lfct36vjlwg28e94b6zm4guhfkvuc6zuw6a0wioethaikqbgqcl4lm',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 653481,
                alt: 'bzz8bxuekjnj8a9zk32sk7lgxd3zt53fnkmo5jpsq8ku4e8vp0hh6dy6i09x9474pky0u1tjlcdud88xiz5gy4xvka7sas8q2zyawkrx4031j0legn5jd75gv642mh1rp00vq6rjigg71vw287f70326j8f8jh907tshgkka6rfzfb4nf6l9kav5k5c53xechmabpetdtklpqzgskji0agjveiby9xeqk1og70lrvtywn15exqrbta1awdvtlaj',
                title: 'f9fm4424ho0j3gcuu0lhgibepklvuc5o8gj3wkck2xlodfgpwtc7xe7uqupiyadlbjal9i6e8ikji4dz5oe8qd95n8uh9n685tpcbyleqa52a78oeyo5y2npnb50ji3l8cqk2gb7s25xzkpknph2wiwj8wfs6n78rzybylzg92mj3wjjnm62evrto5tn7phg8bk4ynvily846vrh5gu9yy1ns5gxsx0557tcui1dudqiowbf79iud5bv7k1vapn',
                description: 'Ut error sequi nulla eveniet. Ea sunt sapiente sint rerum est ratione error voluptatem repellat. Adipisci sed quis aut perspiciatis quis molestiae quae. Aliquid omnis quidem et porro voluptatem fuga tempore. Iure deserunt nam placeat recusandae perspiciatis ut culpa.',
                excerpt: 'Voluptatem numquam dolore quo mollitia aut ab qui voluptas. Inventore et qui totam odit. Et beatae at possimus repellendus ut autem. Ipsam quod laudantium modi et vero enim laudantium.',
                name: 'ieunvmcvv2lq76yz2qu4nx89yodg8b07bj5izumfeevk6nk7b23ywrbx95ocieuqnscl4e205qbea32at361f84n69oshe83rbsnymhrrovdcc1p8xxjh1igs7wkfmv0eoicyrgqmr6hycgv71wspnz52pz0se3whtzqoqky8u3nr4uywfnbzcaj7qf6xucj1f5ie75x8srqf9r13xrms6vovukb71rhbcz6zebujle22ovsdvbo1dxnhhzrt5p',
                pathname: 'f051td2dx2gnjo8wv7x0ma7fhvsdxh0uzct293tv7ag6pwacau8jw8s2r3c8qont6igi8bxs88jljqnxsprct3jemqmfx64ktcxmlp1dz5l8i14qn845qv8agdeq5xya2alwu23pjy7by5mxhem4gjz37nvyu33a1514knpaoxi8bed3tb0vd4e6i8ovbpgydra5y2w7yz5tbz4qwkbjxr2qkqtm26tcitezi04zowyq2145cppdvlc132stq4q6lwzs5jm2dtjghptdxp4ivxijkzbfpcm1t3w4amddfvi2vazb1uw7xkaxwltnpqvqiy42imt0nqjbs58rru7dmyg409vxkfqwb1xt64iaftuohpkseys45wmmbbb7g8f1kp775ijnubmv926zwjososayvyod1x8lr2319cnl6uf85b9syxhnwdwcegnjtlw17u0lnxotzoqx95i057jd7fykfu8e597st8shr60qznv5duk0amlrly2n6ws6yzbtjgzhz1u5bqykt1tbayytdr5igxnu3yofqi953kljosem9h9d4tqk7o9utwuk7hvogda0dl4v97nyr0axwrivrnl1y88zgt878srv5ktj9zq14491i52ofsp2sfd68pcnnjtn4pmsc3s848ajdk9pkzds4moc6vh4mouf01ew0wbab39c8qhrnwripvx37t4kafxp2a0gxy5ilghsjljjtmkusutwd7ke9m9qej7lw4ttuuhis4y1fw0z5ua63nfi50b5xjiekpengaf4m3hr3j0ld9zd86qjjjnywdv3yqigwnx4kcslafown6n23tiww5wjnfq4owj4noris2w4z6tx90hsl7jpnzhm92znfs9i4f49pvy93v6yjhh58f8qinz99awwlr0ca73gp05z1cpa6fvy2odfru3limi0wheicktm3db8e062whx6bahfb8rdv6omtt0pts2vkrfexpz5dbx8voieaqwvz7p2xoq5m096oiu25755ix4ztd6bh',
                filename: 'ozbny4o07peix4wysnybhqs9pia01jjo5f6sdnpe6dtk6fius3fg55fcur722p9iwis7j2hxmu0kczqnvgfypm2nbrzcvtg1y06jhf8et4sx9lo9gc15dr7tg3vdmbfyo9f2tli5szsqsmenvvwa55ngqjuukwzsmtbp3jhip6qhhd0lggo6u2jx6duqbmmyqrpj7m52u4ckxyvkodmw6muvi7m739hsngk6w4a3x67puhtszlw49k59jdtxuuh',
                url: 'riozwquplind8i0s6y8mmbu0cn8pflelwcku40oyql5qhh3xb8nihcdtsv5hrw06r6vytqjs37py6j1b3jh2vzfgr6n4v5sqnplt3e3yvs1b9tilr3u0hu3gsietuaou0w8au459vedis1an6ov4ajnujiiwro3sntnjf8y4g5x0bog92463ilnawmdjsg509xyvt9zn771neuxlgl283zv5yujdosoo8y7wm6lozg8j6b7t6jo1hc61o36d45ibycmzptotr6p8ca9uzxnc87vhvbt4hr3ouh3tnrwxxqo88kn0znzdj0liha7pkvef0qc2ntg1ql1tiwgwdvr5hg8k1969sdt3ln9d7up2ced0q73cl8sao8r2r74vt7oq00c1usznwg5jggd1b71a9mvumdf9adxx6w9vhcnh5ry7dn62cjpfgbln6ka8b7icjq9kegmhsssapaxow1owpx5dmdkylumoaxb2bc71ehhdxdtpg2u6sqk3xicvnma5vb4oztas1zvmfu9gx0arskybkd9n8uzj2gxpkl2kb2czylwunoryhwvinu7dpxazlcbzkdyrbjwt31t9k9ve6qsa882qtkiigg7xahvrjdtj40argat739rdbxs1aab7xr5g1sfmqlr03hg4nf6dyjpqtv6pq69wscye6emlx27y4qqsacc3ivxtfdqsu74qxeu8ziqlegq64dtbkr68up80diwac8wybwh7ha7i15awybkwjjur6q80dpi0u14m4angzgj4b73ztgul8dsmptv023swdu8qikn4w1kixt9qfvkwmf69yycsy275oj0jcrhkf4ubt20xq2r96a0wr1vsqxgejulo10cx4g2qvpecuzzlbfuiesz36vzddguvfh76t53982qtjc6en9drlyimuedp3pei1k4xlpim9b6w3s691e7sg4t6tl913w82dgd0z2ooesg0v6n4dzsb3ahmrhnnlvc7jn1ruidgi2h62cqutdjmrem3jjkycfjd',
                mime: 'nv09wvcigotbnm2414exwqx7lm4rj4iy4u6ktti32dgmif2inf',
                extension: 'vfui9ae19ap3hh8en9wyrvcu6b3cxt87ntcr5us8a09obty508',
                size: 3840471965,
                width: 579478,
                height: 803941,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'zugrhhdloj9w0s49hru7cy8ilrl4oaob8n400896r8xun4qe6648hpywinw3vabnn17jsb9hv9iy8c5q28el2mn4ogxbnxbkbal354y6u8bn4fneh5mr3b53qk5t95gkx3thjgzxit061u029xk8ws6mp3he1m1adohq5qdp0jdebug4xjzc0lpzgjkuqq37gmika9pkruuujz6zhmiroaijl8pha17vrh8wudsxq94czbmsbxm6mk056uwegqm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'ac6lpivhrmp8m2vuz1w5c0qqntf1x2tvryvupxgkzet8rmguin8q1jxdh430mrx37ki0jfqb46d',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 892559,
                alt: '7gfov3kotp0pbkmevwuq7dnxfxityxaoimr8xvsf8wt20plld4fezanstufpefxcylzxrxubm5kwuid9rpzakuy63x7ldfrf2d3u5kdnljsc6rblwtmzh9corc7g0nwkqt1bfvrx6x3q7ie4yxi4yca06wd76ed4hggochedi19b2l9xam71nf7eb4jccdgzijgug8c1mcrfn52ws9gou6s183w80mvrxmsrb2p8sujkgs1ub023pwuah7qv1ex',
                title: 't1d0406fh8kt8pchh9m2rv5tlsh0ihchujwo0pstp1ky8wbw3g7l1962yug4wdp4khavefs83z524dwle9n8r6cbk65h9s2rq2w96ysrjnadn9eowtuwiw18kfpvi4x387n2asqpbrvgtqn8j7svqo81g90triqzq8swy1cg1w3pky0zt2t1dd9cy4ptlzkrhq5wt3lqu30yckflyxe1h7pq58f8ijz50eeztd52mqurz4brcvarm0bt5go0ddm',
                description: 'Illo eos dolor laboriosam nobis quis totam. Nisi maxime veniam et adipisci doloremque pariatur ut. Minima temporibus aliquam voluptatem aut. Molestiae quam sint eum odit culpa magni commodi qui quo. Facilis est ut qui ducimus.',
                excerpt: 'Veritatis totam eaque velit quia omnis quam aliquam id et. Laborum fugit molestias magnam est magni. Recusandae occaecati quos ipsum.',
                name: 'w3rugguqn0ww59fxgijb1yqbwthuxo36mu3wxsxg6kidjz5p9tic2gucoc1yqelmu7kbdvizog0t2cf3qz0548c05lh0ur2r13moypkj0davkoay8d20wrk9oa6sa9dvih0bnl7sfvwkkvz26x2o1805u0jh2r3v80e8koss24qz7pitd97079027ptpdyflv1z35rxa9q112swqoje6nwwls0wbxgq25igr7x6lg6wjpbvnch34r893cq6q3el',
                pathname: 'bkcvrdvwhx0zkysy30knemctdt0zdz6fkkckufej8ou7s7dr5k3pnhva58hfvl51pd8xitem0dfqlat3bvfvbnrt90l62i72p8xix1dbw7sszfr6r6q92nvd4u89d0n2whajtsonjk852wtf9jilfoyo5w30dz72tlgqcyykdyhdrnvmi3qi6t173hvinm89s1yu158htder7sxamgmmox6m4xbunoxqazu791h6h5x9qii2b9vexy8yvfcjozkg4sz2ivmdv276e5mtae6fgo60tgbbwn647bpk1h37ig38sd05uqdxas1w54kky2jts09pjjkbxqwtnp1jad7siee4xychs5t668qylyc671rvb8og5bjtce97p45jjw4ig0k2d3nh8e1kanwim2y14w0uqnqx5xgosm4eqk9sg5muhcpidkmlnblr5hzhfgj3160nhxvjjy3ix4x92lapu4jh0xrqhzx4ksexcukgguzsc65oam50qqyezwktz3u1nle9z4qyefe7n85jfnge56w0er8tcfys515hhnkbd93j5lrm4re8dt2jwfuas4swih5kxjjl8lkahuws3vywd4qvyzu3vmlr8qa0ongsw7edq91hym381i9wyzk53pf07cq8clpcvxic2ba6t7uxkuat6bhfrs653rmntqllj94ljj9t2l08l0o4hhf7qsqtjpwpbx3s0xidzy5es99agnh3iearpjlly8coojhdnqlwlhxtl7fym5sl5row8ijlcnxghqzousynmzy6xteo935d57w0kabae45sjbqbnoc9tuciep3rgu6fhoaotbsjzbbb76u9v4uv0tlmwm8qzrgtzopy5z15smfjsctvfqw6bklv6i587o8vc3t8h9g9vb89bya49pvrlp3tq33rzxhnyuv5t1fwlnjyl2cmk67sa6agqxo60n00ovb7d0ppokwrlqyaflz3iqak9xbrk1pmzgy02d60yvh73bgiuzrok4k3oapcshdtii1ye8ki',
                filename: 'scw0bie6jwihpn4vtl5wervipuomcf9qt2p4o2xpb3p9f60byk0bjrve8u19tukfav30yvpq3zp78r83sfn7oc2frs60yyuofemsn44i9vhh2h306dk0ahtdgy8gebsa4jfimo1pj9pnench8zr71r1nrn19pvyslvdp2f8asyogvnfptb99jyo34dg13zc16ndy37wziqonwmpf06en5ryvjnwuupnf5g24fhmbuja3s1sagm8z1q32rh5tjrgs',
                url: 'spfqpu6u02sgtokoakdp7859wnit9m4qoo3ubc8nszsxikpsyneijka64245gl0n8mram5px6j8906d416d700jz97knp9s8knioyd0jruj2i5j3nbupzf9wtwy8fy2l1r6bow4h29vtawo3qv9xwwei500n2r3f1arrqir6jc09gqlj3sv3ny3l2ascadno1qf2wqgo35cke1gvdv7vi1gqf8mgcdcs8lguraxzjs3rekc4cmi24r34l3r2aew189hivik34oeadnvu224fahanx0wzb1b31vy5qlnd7iv0kxmjekemhuogsbfyafpwp1f38d22xz7apao8qxttx5of60tb1broc184hj22d5mhx5kejhen6ej7w4vcqywx4qvsh1o2ao2ej3k3lkwwoluqhwrp5kayrek9yjj8ej6cjf7y60futep5erjrm4ae65fdi38vwdor4x8cjmdi4ocxbj2lhh2uqpsz0tljlqc5soc0yfhg3giapp9cswo05a7w8446gl6orzvga8scgt7wp88j6v6fyaryssp2e2mvwqalouu0bs01nv0ulesj7zyypczn2c23vvj7zb1v60be1rbe9zabkwgvmeo9eg1tfupt361uw26z4uioit4mavwrhpbxus7ozcsywhnwnd558nrsv8jgfzwydqce8zd0yaql4x8hju1xe8q4fpm08vhio9tec6lzv7wqc7rg9fmovln69ldvmnvsydfhut60t8u8llliyx1iwry18vj1tsib8vtxl53iyufwn83nn0v8kvd386u25q58klf1f1ojjsgjblapbuqyslxwlckvhzi5rrfuqg5wplntj7bdwuqirvcfx5851mse3slacxx0463slkqvpo9hinnkqbquxat0c67auijp2qlflfzd1sd3iyujsjgdhw5bnq3xxnyv1ywuqpg9ol6q2qjf75smf07r9n51dayorwmjd5ggsgu4cc6nq713io0qximwdjcy1xcsgnhzbvnnr7fhyc76',
                mime: 'fv1jylwhpk2vdte7su0kisy81uh2ma257596n3psrp1uuzeb07',
                extension: 'buzrpxt27kvsyg12pikf0iu6fr7bo21toksg655snryzq6mb07',
                size: 7783129479,
                width: 179611,
                height: 877484,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'x0cmnag6wpaeyufitqw25jjeanbfkejbmt5a62bl57syqklvdnqir3324r0dfbmkk7g2ls4uw4lcwo25wqqe4i025c25qwb7a0z3sct1ou9fiwpoxooiweof7pf3jvgc8uxa014u86f38p5mtvz62whr5uy96j85mdsfws115ei2hz0jgfu6ip1td7562vi13c3avxwgag8q310842jr5yjp6z424g0bcauuh6brfmxs9pinx1ei1548s268esz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'zp51vy0lg7n8cvr45gd4sfwc9djyl4gpajhnf9yv1q5g8s1cp52f0sw6i07wq4fur2843qg7igb',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 248904,
                alt: 'q0vy643757ot1slmnrivvzuffs20g61kx0bgig8r5fdhrac56lrx0wo6jg9i6oe8z1gf0zlfrkkt36rl2pgo6b8wnab54osnzlbhv8w38lmv7uaf4vk02ct104oopapamd02a9eaw96vie1rjvfss0230lgcfhlcpqc3y6swj0uo50wk45ly6kky9pb6gmed2mo8q9h74d8s652819y99dzt2030t71zbvy3iztpgtaej43zinzafwols97vsnc',
                title: 'wd9acopz1sq521s3lnlld5exg1a7tnm4w2ix4j8dpatxfapmsy5mo6jrr1zpst9zuiilyxrxm5idk2l3n3se9oiye1xelnzxh7fiwf2oqc74vc4flw6jnceqrp6sazdfbbuiqx32xshxjxcfjb4nafwuafvyy7h5se809a4cdfrmv3avk2perk0t43vw4flz9xcpsng0h4dmz6i8bsokpw7zawhvbihmhhugv3rjd890afn5ui6g8ixjramq36t',
                description: 'Est tempore exercitationem ab est. Quibusdam sed doloribus quae inventore. Corporis officiis non aliquid sit laudantium. Architecto et quos assumenda quis laboriosam sunt eaque. Et rem inventore.',
                excerpt: 'Voluptate dolor laborum consequatur provident maxime. Aut fugiat dolorem placeat exercitationem saepe facere voluptatem quia. Doloribus aspernatur rerum voluptas sapiente non dolorem et. Et distinctio ipsa et voluptatum qui delectus. Quos dolor aspernatur possimus itaque qui aperiam quas.',
                name: '2she8th8np8g979dvmfgkz2nnc3afqp2gejde6n2sxo6ztj571qakonw2hyra87r4s28xzujmxx3fq72xbbial9b0j9gmmwfe6mk9l75908ss99ul2mvxxcnic6xafcqdy4v45m6anucaea4pwywr8mmjqhdiy5rdkah4jw06usjnos90cqejh35kbvz5q3qpxywne7tyv1b95hu30ef4q2g1l2m0eruvz36xfkx0isla2vbqhb5snuuga8sqjb',
                pathname: 'tgv5hj62h9km2a2ex4nurmddr1t55doyz71vempt3rxakbi75h0sjgw4d88nzt3wpf9cpbqqverzeafktl5e5iv2xuwn9bqv0xx6lk0lp58d1gsieilhabpmrm8h5tzrmgsx4ll56z6iiz0mylw8vux83soxj7lvbmgxkwdqt42apkx2n7se5cxy4plx8paaq6d1k3gh8enbdcrpbw9dqnr0cjsnzof4y91skz1tr48sbl4prkzz8nmild2txjc7lua2m34n09t3bdnosdw8fafevj5hgmrtfbxw7o8sn06t4oeqv4dd1p1uugeto3431519jfg23z8fl3saspoglhfcaufv7ac5s881wdn7n858isv55dmxughy1nlvz223niyvktc0xe4qxxcwgjwt2ykgi7vq84kcki9f1sqyqsiww82kanj184p2nw7eku26z3w95jw8v90swt9ulkj3sp0nt61kgxq8q7m62zc72n94682xz53q5apqneuuqak7ytdxszsdou535d5j3mlza7kuvmu835bdzbmdndz38dukao9cwqtzib3s4hqn2xbks7gogjia6ab42q9ohtp2t7kpkprdj2d72q3g7qb8rdas54opwz1r0lz0dz9pyyc8jhgbgr563swb07jtedrmbc6bn5qrkk95drvwp4hw2wtxwburi0hmlty1nrk96l01b89yupkdvctik6rwydyin7adiotiqjdt26fozj57xtdi9gdrvcqfv4sb8gzspb2n8l1fzqxmz7coozjwauwfjimv3dq1bs7oc9xu5g3i48jmb658mtvh851sk3t93167kpnmzxbed9cdjuah2lwbqq2eyvexeog2yxgytc57xfroxe7io22o4cwxhm9g537qpanr83bv6zrn48ou9p5d5bnrmhkj6nav3hgvdn3wabwmsfsi8y2gz0757ymk74qw7abl80xlr311gpo9a1t18mzqhdg7x7b4atdna0lp8gwfxyzvdcmbkofzk1ur9gcq',
                filename: '9o82gfqti4dnoya4gtkdackl3s3jzpysi8cgsq0iqkyysi93bv2tcxlegolor4b9kk2wbjm8ujxs4m6cih4h8re7e2axpycsy1c8nxt3e0vlms3x2j7zai5irvpibtwfr89f6i4a2lgrqt46zxzemr861el9ikstlsp8d8ij4f254kesq3bq027rl11e14guowv5mrc89zarcb7smorkowzgi5l5dqk8c1fz6rmz6m01riat85m54o80q4xg1it',
                url: 'u2pejsitfoz4pol8dzfhetlyoziq7x1fmylq8onrv9a9syagetphmisa1d52xvhsuzhjhjrzzpexfy5dd5rmq23ck80z57d2bhl6bu63q13yf0cl2n86oy03qbgapuye6a50elblfaz8plr2uxs0q4xoai0b0so38qoe9sniczqymvs3fi2ef1qntqtnkjuliesw5x8u5pdsgl9k47p8gok3mgr0u6ifceboaotbz840907maxe81yg14fbtltjs57wojaqcm3q0vpktdefvhm2vaomchg71aypjuogpi2a21i0ixxb1l7axltxm6nea7iu0poer86gjfq6oy5p2l9irm8e3356h7k146y2zuuh89dviws73n4dit023cpshpz8socgzcnll6bghapzafucusdwa1454jq0p94n4p2y2yq5jjwpqx7e8595v8y1fcllac5s82m095v7lcgpplh389tloaug5c8r6jwrj64cczgjmo1wzsy4gquvbsecvsz04oe2j0p34fwj4k8ovqw9jqyi1t0n1uwjsmywfk19c0ji0u5y2u9g5i3s4lic4lytemmjqda2yofudj7oz5u78pkg9lmqg8erwxkhx2mx7nj2qmp3yhjh2otefog416mb0ytu2beivb7d838gy4wyymhdzazr0nkvg7olmu065nrd9uulseywx4ggtkq9ovakse2jjs3nu6448kxjlc51amy4je5tkgltljxe4aymmn9aqp9d8cglgr22mnws7z0amog4wk3pc6nv195wf035jk36zglwrctutx816txl61um8r5j4phmsnxatlc0yi49nfh6wkujculmi4ieblh95afj432qycfqv4u6num3o4ge2un9yi6csue4ppp8ijoh7xdti9t9dxxhqayxfmj6aaltts9gm3c3gqbxfcdmru6h3ds7fa6rg18g0zfdxr41x65um8t8fevqsa4kt80lxj90i2l8xtm14zzadzzw2kyyrrqpockcdil2yh2npd',
                mime: 'nsidkpg3fvghzw051b20ro9cs3p5ao2jef9uxld7rdy48kriwk',
                extension: 'uorddnw4bnkjqnycy5mizp1o8gfw5tbkhd5u9haorbp9dxvbwh',
                size: 5657537346,
                width: 219770,
                height: 941284,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'cm50hcs8rmohv3gxbed2d1rx895tv2s6pqcm9qmqix0j9jyuvpxx835rsvney7737kwsoni54rmx9zozhd3uesj6jdiu8vi96chdsqgg6ajw6h5i0se3ek98ualsrpygerbqe6mgac6gd6akm5yf88bf8i3cergosalzvw4lkoo12i1vovl7508vtwjrbiqx7z4q0spurseom77m5kex1o896dx54rf5e7p1sh267kkskkifpsgehdbl7mjk1gb',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '4qn2m4ceugb1fg2no0lstugfsedeuuqmrijt0xa2wq6waxzt5sssptar7smlf9od1yokxbgshe4',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 932758,
                alt: 'p02wh7kpcx2itrwrl6eqhjra3dxbna1dvclrp3o2sivuapmxsxev4btjrhpx3ierkcczobbs6vrbeogtv98dw1surm52c1qvecsrh0398m0c6ppuj0aw34h2gswi7697sxojj3r17lcolq8tvcvonn1esc71wr65nr6bvlj03wfr8tu1wouedm73oxxfw6xovaqna1cnku58l0hvfl34bviqwyyrbua0vgn9jb063g0wkm9jl9l5lrm9qmx4l1z',
                title: 't1diyusden6bhw8f81tje9afpj7n9ipiwnltoil0zwql4rsdzjz53k9f3ympa8dz5n2xyzymbtj5e3fd0zhm2a38df40qwa99bo5gdiyw5vvhziy8rr1wtgl82jvrrvw85smi8gzd7mjdz35y2zu0l4bhkry7tl0z40f8zxg3crfp13b6sxlyn6autjws1dfk2sf3n0thsp591i10ntv7t7k6f5pkmvo0sweg6uaaqymke8l59mna1b3yz86l9r',
                description: 'Quas praesentium cum. Nihil quis laboriosam aperiam eius. Molestiae suscipit dolor repudiandae eum sunt ut. Et cum fugit et iure ut deleniti commodi. Vitae nihil eos consequatur aut sunt rerum consequatur ea. Et nesciunt magnam.',
                excerpt: 'Assumenda dolorem nihil. Quia quia nihil non iusto molestiae nihil odit. Totam dignissimos ut omnis illum. Illum beatae iure eos et cumque iure ea aut.',
                name: 'l8n9tkym019a1o2zuqo90hq6cprzg8nw3gm9i8e801pn18iu772wndp4x745fasvwre061u0uohu7mhlf35ikwxxo4632tqutwzb6bq7akom1jhirk0a7h5qkkym10anytupn0mwdwh8egb6wxnialetq4hf36oqk6suzmcwzccpy7jjzvpah141h3ojwwdfrw7kwn9l6q86x7nyxaeg50v7po27vepjrgr28f3ar2lhfyj5rwrwh52n742fzp9',
                pathname: 'e0ens9kvnuq66j47m9xinn54ost41x5q2oqtpbdhdd7f8b372ah44xl8vt56puahpe620u9rmgp4s3pbxk23f3gnav1dksspedkejw4f08r81vk2hlt7w66rbqx5hrjnhxgamoxoqe5e4v7dxp9rcbb5u9zj15vysxq5smbk2ybyx3z5codzb19xpqt6mig22gpi36n1phui6ugr36giz9pkuoll9dohpzbfenmbilip8fz7nttdy400jlqrvalysxdrhusk8chj2g52x1vx8ykxp5y4ik2tz3aeg1nocpdyuqoqlvmj2jm390ohshjxauyn68kfr06l8p0oi36b7e8inki67j48vfduzqjbr0332eg9ibsg0917fql1iej00zt95iiyumvg4ueuavz4kdk15pytfoi2ahfsq7ywali7sieu5t0mkn5sh7r8j7vnvbtdgwqq3bmp10lwpanuzitax9bblxxhw7g57lll6636p5ta9igo2nn9fr6mhblt8qj559khymhcy89k0p3sfiqteshmqjphvrcbthogv240ifytmwdimqrcr3r8zivfc1hy49cu6zej53zvs5zuadvh40kztv05dy1b5eye3bvg5s1v23lbphrqdk4lo9izpac439misx2a8jjfuequa2f3utc133ye67rd67o5ss74beibtdqu10deggnh9n3y9phhzmv3bgblnc3icigun8b31ldd9hicvajw946fhitrvyds58hhu20w83usj5li1d7f7dfgleetsv98dorbr9cdh777vkka3bnr93qm95qyd0h4vh6nymuyc9wmbvjep1n1d1hjddkkxv849broexmggihykzpj4cj1gqcgp4qa7f680az5ftpj7gf2buprhenq5et3bf5llpv7u28r0ohphe3phgn4bxb30nw8nm76uq9wvmxgzg20yzaolehb6h7ruokjx3lek8twixo8t0jevx0dy075lp2rl2eeickopss00ayuoqvfqj2qr0f5',
                filename: 'kt15ij81gpqb74jder6r3oedvafavu7t3l9hkjfdwpatsw412cugxqmxiol5zpwkif550iaeg2vo3nrhmn6smvvc95k2bt54b4lzl98fkcsd3ws91ygsj7q76qof2f9cx09ucc55wlzhycmcun9pmlp7gwpt0xc9uztobzvp7w2g8e960nljg5yqq7qsw9mwjr8k7jqh01jmsky07czjmedlruz3uszofgrhlwd24q2roik5ezns6tyd437ff93',
                url: '9npdjkivegrteo3zx3upcfooz8zgq7zkgyguc76pi9jjs653hy1wvrrji1qsns1w70y1bcfy1a4fa5ewfpfvwh1vyckouqvsvzwzwppgah9cesukvtxonfu04h918c9xx3evi9lgc1uvoe0jkaq53kxv4m0ae8bvflat6hmqta63tca6s0j4gujbvfaijmodmzisut51awtptgejog1ybaozukhkc5akin5tfhpv5ybycm4uxknz0uv2izxo0ywuzj4lyetz3zvvnqyxwgz31oxvqvucnz8ug5qrwmtccc2dv3q6n0z8h68u5jm0qkcsv6ykmfrpw1505qztumo8efffdsqtr9zrjg1ew2xexm0v6q0l1v8w1dl5jw4jq9l27gjfdz3h4tzl2qihda1mz1zcrs0hmzebhaz4hck1rwdo1cds9ai746qpxcqoybc9fo7ith86howpmdje59v7bz6yooc9cvpuuu4g4bt3leri15ls78f9x8dfkhkmws4ixqu24eoxvaa4h5dxnfaqpngm4xvtwjyej3kug95gz9mr19be2aujjel0lpjmv9z5cht5uidfjjvfoz0kozvomju30ifa2jm2hj58rj8rx8ddyepzeff2857u1u7vnaz7or9y6hjysoghycg0khaw3dl0posocsx4cw5j4kpnmaqheb47uif9wlk0inv53u32fmfa0yixivxcll34nty512r6eptn2c9rcbqz6wolc3figc5ytzpj8dx5wnpi3xivms8mj75wlxezo72vzfo1r64sppojgfiv7ynevbt3lq0oc867iainh4manilk0jtmypl9gbv32dqgux4mhczgbnhgo5yrit95b872ljztdfazo0kpnfbto90i6pm67l02qjp9nykcdnmkac1z3a0zhk53t54eca2psq3gfz1du23hs27x3ttk35oocutmcdmom2ccnke5rce8rj3gapn4zaceg76qn86m8h6hibpk2d36y1ietsvcw68eiewkzutn',
                mime: '2n2t3bbhadxdkpruredjjg7rp19ojsmmksquf2002fl5dxwufv2',
                extension: 'ftgxvgo7gcq9rcaep3j9654f1pbd9o1d7aggspqenu16q60ub9',
                size: 4506527350,
                width: 203235,
                height: 181804,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '5voa1u4duj8ldyf750coiqoo8ol2ibhz7q7a6w2vrkyzqkz4pnwbx3h71bwjx2j0b52usuxtlwr4q988k9qnlf7g74okt9sh1dq1cbgpf8adnri6dvu237z9ujvfybhcmusaui5z79t3c76tzwqo8wygeq4ir1ehesc7ydsuah0ugrbfrie0ycrvs5n3helbrabofstd8iek9ivgocypbl02rfw5nijcdd5hx3fwrwpbj3zhbig5ygr5emycea5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '8suvex79oyx5vhuw1lbtpwh0r3q48l5rtzocdlp45r8d733yqv956e19rr3atg4bkit5oxv8prh',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 198168,
                alt: '9fx1s1u69rgmjktrg5unpjyllpdnzmzver2erbwut4qn93by3lx4w7ru3fswcon64cyo1f2q839wcp627uma8swh08tukcm6rgrnuvlcvqyr0ugpvawhda597gz5rx54nl0c3sqqbarmogrrtv4eyfoc8xwwqck61ve2hnb5ajrwr0yg301c4pr0fp36q7hpkqd0sr1ti42jkd34anfaya5cy2qqvzudebelhjrep0xjx6fyxmo3k7myn7pk6jp',
                title: 'icrksjtk1zde1asdjq961hn7r83zcvhu5baff4jb3k6unnlzf7bozuj0ovame9u95jm7fnqb5arzqlqo100qtxazj546z71d7c5vbjpfiydcnt7tf60ihiuyof64uuz2bm7s5ft5ewwm2wm7hrdjzjw6hcuykqt5223xm1vt8azqq2lvtbpkloy7bzrp7yjv031sf49r2r6pao9t8tfb4ljlxhchnlggxjeexacnf5bhlo3gp8lqx273g3kejpv',
                description: 'Hic sit vel non nobis quia illum quisquam voluptatum ex. Earum hic minima odit suscipit architecto blanditiis ab. Rerum debitis a a delectus eveniet aut ut dolorum libero. Ea in reiciendis aut nemo.',
                excerpt: 'Et et voluptas nihil et beatae. Temporibus ullam ea voluptatem natus adipisci voluptate doloremque qui iste. Maiores ut modi reprehenderit blanditiis quaerat qui. Fugit dolores rerum dolor deleniti ut. Voluptas ut delectus illo. Modi sed voluptatum.',
                name: '5o97msoxmh2r1hzzwrrsdm4gr5l1c1x1riikr3i3ww1a8wpp5v80ar74c0n6nqvaxfxzqkyo13m4xve9d3celzkl31ensayotkbk8vaa89ga3ay3mnn9wg4tdp9b70iayptxkv06ajoym7t20eono74j0i96q8721ezeehqkodsglny9suw4446soym02qbaqnjlkqj05p2ruemfstdfiuthvz3f31qrbs5l8s68nl51zcl6z5fy8zwi80ei1go',
                pathname: 'rftyl89gjpxo48ixojtl40ti0k6o3o0y8ywmc3x6mv5j85cnnjs6obreru0pgszqqyzsp6s1n1e11632e5yxc2xs2ou7zvxg77ibg3s8dot46w4qsa1smys0j7kn48mkuynynl0nj4r6nfu69hytig9lvptg0qx4s1oypf2bbo2k7dl79608prc1ybbxsfwoixkyjhia9ik0im56cur6g3kmfttiwdt3b6mybd3yylnky1weoazyqcqf6lyuwbxxpx6khm5fepewwokzr8iyoodzc73lbt9u0wo62rjeyxnuzn7picz49fsvv0pimpkbdblf9nic6n2gpum0k73fzbyqtncd5qlltgchzvhr0dbg1i283z01tw4jybhwm7f4p5r36brvx2rmoq1rrctpmd7jji4835tdfvnpz022haa3c0h2kclipe7q2lsad0o8yk4ljtjdhwr83rnjb54mgy1mdtcatwj6ddostyxlu9peob3dmlrdax3twqx5bd8iccjdfdwzjmmvp8gsqrbllkupxekw9jd2qf4hnem1exc7853ksjzu73iu48lcr2hd87o99ti3tw06rp5kzt8m06d0sxtsuxbt9ubqw62npqmzsk52y1y9xph3d4gka1butmuixpnufm95lrgu8bfmswldco5n4hni70iddyw433m4l0vf0hrghjqzut8yonks1sdy68jrs4vecokw4aek81iis8r5qug5jlivu8tac1z3rp159dg4lrd0vl051hibv0uyfu7h6qlwlauv2toe15p12v00gosqa1z63nv7n1uh7ouu4mo9g0d8gnnni86d13ybpncwkkhlyjxnuj4y77krb5b2ur37zfmbx4cwvbtwhtk1zelashvbqsqcmhccxbl3sfbszd89dd98bk0d5qvl5tig7urdvvk4712zev0dqq4f0pl5airxe8iqrg7bbh6leomxa85o4coeqvcrce8v2turdvclpc1yjj2xfpzzw871g48xfscncj1o4xu2',
                filename: 'vetx7pc0yd7s9d9m9149i7k360w091aiqemvia3l2xrsfl1le08gnacvcqo744tfvzvv1pjxg2sbdnt6v4ro4fbivrskpuitxyr5x4o8o1qrp3xhl5xrnr1ca0vveq8kftd5n2pg0vmi1kw1w2u9kwkiyn8fgfdz1f55mp1jqh7wnwfz24tatkkkbch8gzuph5aaev5tz2fs2bjjea7r0d0riwtv9mllt7ior6u6vavawol96tfe9xr9rkfnf0p',
                url: 'kfp3zt4ky8d1xqyqjnk3w8t84i3f2t9gqrrlvecus8pwgv6xn3okds2bb5ni9wie19krwaign192yeow4wbzbqf3s20268b3k3jjna2h6stcviw4oem6a8w1t190sqq3qdz54a5pquw2rysnh564dyvt9xticqww66io0yu8z4zxyhukwji2vhmn83tt6ad2qr3q08pw8r47sreuojq7644hopt4z2xldce8banpwt8cb7lqlzvtdl2tqzmngmlyn3pbup1c8bdl5lz9rihy0q4c2x0xgy5af1w46nxeplly18rpqirgavyb2v3ac4p3ekey366jnxybszhacywf4rkc08t11pxj8x0bc8ad02t1dykw6sn07zfm2t7xd0ilikmuwy9ldoqgxn1598cociipiy8j939yjf79p6d6z42hlgg1hilpm4rbw3d9zstn60svoa9kyk1vqd67r1uklosjjgsyjjgis7qxgyl9vb4c8pq0ieohzfhgju1oqyxdswjx7x4wwchzc8y6su85g3vkt8cxylwda4o9hkpnovnsqy7vkwk8eorgf2vcbho2e8uta44zvgwfemfx4y0gxhsdv3dktscfka13hmxsl6e5vwx1a14okaf7k66jrfrtuv3izcbvjee0wocqk4xynbh5how9mmwqkuwdqjcaszb0o9nanbf3jyocul4rs0x7eusens69iugfwgzsffp2igrpnz9e4elxrtpz643sq2gn2mi0toxufddbxoxhq2wdo81t3tgzqv7inw45h6pfobrm8iqn657jr3fr5rmah36oi14fpzn5syfmvmrpch6hcdojbkd9ytz18dbstlwgaixg29hvd1hmk29g5ucfbr7jtgt4tbzqjjhllgegzhchj2wqimjk8u7sir7tqqb29rx9xyhjgvkog94j7fjq4fqaoiicej1aorjxj9b9pb7cm8bh1ny7n59br02r7949ya3ltnf2ohb5ouc7kvxa29f3f4dr5f39o6o5ea2u60q8',
                mime: 'nqel6f2hf9fsaya95471d597hg46hkalyo0yucmc7weaznuylk',
                extension: 'gjprsg4ni80qmejkpeo9iqppwukf7fd73tbzuskiurr1twa4zgf',
                size: 4991642522,
                width: 115995,
                height: 584736,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '430dhrmd685kyyzinfi9pb9ltbr59plva7vxwn7xk05ztdd5ewd7a04i13d4m75imepadi7mx9xn37rbazaj59x88s9rvkb0vursj8qh87svwyea4uxf10v1zim27mqy0vz4qdpcohl7req8cqm9bh4jcfm76n9r4lm07s3awxfcx7mnmd5dtr5bg4z23l9uibcbd0936a3xswhnmmbuu2tyje52cnbaav8y3kmknhv0nok1hih7uyv7uv0akfk',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'ihju1ofmztoyff6ci85dyuqh5cgwngvl44m9p6wyr1we1s7ee79yn5ehwh24qu8u3hyfpjjp9wd',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 565203,
                alt: 'veiexykar8a80jhuk41kcnzj7utg8kqa2gatnq9gy90x2o85420ytmcqoauiqi8i56yxoypyti0tukeocvgsspzodfvenqcos681ag00pfr6q8r5if2t4vihhqm04j6s52bhiddstiofx0kwsuqe4cc1tbwb1ifx2bi3m4dvjbm01m11j2cv1uhq3p54s71ehdm16hrdyg53o31iemsvhlyrukita3dqha7ph2tsyae53x8vvvfwtnjivdbq8i7',
                title: 'qz2tlqa8zmakabm2zgo33gpzo57em2akxju6pj45xw83zq3nh7f4lf5wtv72hs75x8b9w2pz6qhae43ubwkoluydkjfam30la247sx63l7haifr9j75vysu55umk25s52e0fm0xx1tf3yvebpcvo7yd0x5ruiksq1keb027ad624xnxtzwp6uf0cvbbbnot5efj7wvip7ozvayh0x5u0kf064xkd37l9uqjjidl3zqmbuxujeq8b14xcevl9par',
                description: 'Perspiciatis incidunt libero ut magnam est est minima. Inventore natus corporis aperiam fuga est sint. Ratione in sit sit saepe repellendus suscipit. Exercitationem numquam est officiis nihil. Omnis quae recusandae sit. Libero possimus nobis repellat vitae quam.',
                excerpt: 'Eum labore aut molestiae ratione sit et sapiente hic doloribus. Non animi quibusdam quia. Vero quia sit qui omnis odio ut doloremque. Praesentium mollitia facere quos nihil est.',
                name: 's1b3eewn6sf6wbz3tb0x6s18yscll1d834yzj4lokab1utqs6bow888qugisu8opsjc1l4fg6bg0d0hnykzmsfvi7sh9wedxqytlcfmznmygopsavy9gn11dum76mn1t7o1b05x3jz4yaqfdpfhf1e12nto2wv1y8jupatme7hpmtciyxp4c7j7m43ihfiwfpcnfrch4k3s12yde8mx5wocv7m1ojz8e6i3t4j0qfda3tw2nmwvnabv12nsdty2',
                pathname: 'hzxgyg9sqixy5heglrlqj1b2nc9op1yyxt2ftafp8sschxaatjwshkavwo02gy8c7v9f1drsswcapb2actjdqwhxlhvlpaq4pj423a6udh0bp6evboqx8frpogtk60mupj4wj42m7x7wf91gl557rg9y2wi313gwtuhangg7mtzl0alq7xsym91r3xffx4ev3061n28saxaks4xymo9texf8aygk8rlmcohq5wz64ut17038ni8mblzc85on8mrqxpwah0nalze8zn7l0zwb0psuzgfoupldrhhsc1au9sepuv50bayoxqu6y2g3jpa8xwtm8844eslnwiuyg4bqcomd8x128rgxct45yejigvxc5248lo5hxgtidgp7d0yswsxgs6hsmuq7hsvwljk2z7qfrl1g1agyjxeucees9xr3xl9zpssdiolwxhaq2gr0jp0xsfrbpjvuznurmbhwwxvg2ujhn6643jr66ajj4vrrrzjih58rj089f1mkcnhh01wlzg14px52l4ecrtwfgt7cjfxkeyfvnaozc4t762l5jpx7xeyknpttjeu1o1fmios0vkgwzp8n3gqedzscw7d4nejh3ftcw95z7mlf9hi8h2rdwof6qrq6y3fx7ibcazbhfu1vefn8p6yr28b5hwrc208odr2itjhsyqwv1opbvbngboo01fchlkgspl6bonpovjcmdgozg3ka1sir8g0rlh7koes67el9inftszymqyi700081ag8hznu3w323esludwvdk129n8bt2jnccgdtjbeg1vaq7u87cybisweihpy5kfxg5sdvhdx5a4nallswzs5mdkkvzvygbijqi7rs6swclsakad9mscl9pa7y7bj7lz2m7cphkz6whzrapyinyz14mq6bhm7rgqu460af0pskychzzy7wyv692w3kpxjc2y5734djk86tkvtthsy8rxuu62o7qgvcn5742r88g7f0zhyh1wayg0kbie9nadoep11w4khfq84d5wh',
                filename: 'bghc69om6pci0zea28ne5pyrbstqmx682b0qt92rqiehhpp4y9l6z7eupb6wjw8jeklqq03ws1mmo79daqgm2e4dhp37bq3tlh0qo817yv0farknnx2lh2le22eyb9rvwkm0v1kh8z15f0gptjfvsjmjtssb3qxwhbepo4sk8hnfrkoz60c62585603ch7kt2f7py43ecrdueypmaivadk31mvylcj33ua664tzcicm1r4qfl2clcr45opuhqsd',
                url: 'bkywv4i1uuylpl3rtjd53rwxhsywbu15m2csgq9ly1i7uvdcj5twptnhjpp8h1636rte8sdqpacbhgjfsmcpv51ae5nncft98ukc2fshntwskgz4wlkvgriv8jdnj14wrivf9xxtdz7ongjkgzgd36r95a2x7k69gec5ipmhihunntovdogmj7qat9jxdslzfyw0dzaqkt201vdn163syi6ldj95js0ac3gavt7fbl842zse7vq4pgcmim8xszp7gw7q7wytht5ruaejycwb6eb7owns5w2w1apaxc106sqwaz2qie775lrnzaq1efd5td1896oeydb4rm1oewn1mix8bvovp08oao93leqhncp13vhjaee5aalgqctn3ldwsl5bhgm3eb4v89m5icxmeowrwxfxh9u6smmym6rqs5ilrfjmvprifj8j35o9bn01qcftoexr4nmxw2hk6eij52ce3k3ac4cajq9o5o99mqecvrfpbtngzlhgto50wh4plcqhpomp0v4kmbs75i6e2cl6m53gisy7b2flkra10kgx36buss4245wtlquesbzno92uo09mk126p1f6oprt0gtp13je837ppx4ljz9octj9c6b0jd7knvv7q695pj9lqy3q2sngdttlt6y1gndhme24calvxb7q3hj3vniruhk7fmjifly3ewcdyct1nn4se1kgpvzlcms2k35r4dca81ss4xm0zf0qi146gd652ekkmg57vptgsyhsb1j94zx4lkj1na85pum0t0ez9rb59w0zrkdr01tuyeq0cxhy6ky6s8jved5hnc185bynzt3o70qxwr6dc4zhgyun9l77gv8ymidvsb79zsvsq6ufo6ppit9zsxdt3mog3zlsc9jchs43szg65gzczmexsxwlsnj4otxrutj4zxjfp2e5iidu0qeenszyt1sbq4cwkyzu9qwenczr4v87iii5iv2qpytmgvl4jyrsw18gqgce4ihj4kkb00ytay700st9cnng',
                mime: 'lcxxzhtgysqk1aj0df52519dtuott4t0sgbadvt5mqtvlsapho',
                extension: 'qbyc8u5qp9eh0kllijet0srgx8lc5p8suougeols0md9mnqdz1',
                size: 97274587396,
                width: 297108,
                height: 921610,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'oomwupiljfwejst0evn769u4mn9hzciqdbc1pzw7tpfj3eu2mzb74p82gv9a78fwue2trw8wzc0wr99c0u5uk8fa3xwpmnku29li9fgb22q98b3tt4kve0qjbcjjwu04edt013wsykkw9yp9lonhg8gl8byu30ane94smhtawoogw53ubx2nq8pevp1c60gz6ifzaqo6qt5451p4tcymbng134b0ez793fo2luda1t6hhqr26al7wggs4yrt1kr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'vg90gl8wu8vuhvnbc20dh9g8huq8xz1rjcbmywe6fmvidjc9882pca4rhgo3y5jn76odcrsfj2l',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 812189,
                alt: 'adlvllzjgqwcj0snkzkjqfmmwxbv6je6g0x4upm61b7x45uz1o0ha8mq87biswrr08gx4bxefgtpov9bkxl1ctozprqh9llt7isqqf51idf6p5cgwgsohihnxyvpvtdjnt22ej1393s09b8f07gmk140jaid1kb326p0disvqjioma7sfrn82cnkrrdbjifzh2g46ijk4v2ok5ll72wcc8cdy99v8434kkk2fmnk29smgwi37rkjkfm2v6a1ave',
                title: 'swguqp98qlbhokwsdwmdmjc8gcgj2gaa7wftz7aryp2t14op2xxubn8nl6s2r8i34jp10hja780oxyq2rbcey473u2h8m2jrcgoyjvc0eh8mdcj0p5225lcnu8esedb6yckbcqzd4t5b2p53u70jeya727pabkjtanwar1xihofu057umvd9kw4g4arpynmgy4sn767q7gkmjpljsuakdmd23i8e0pm6kf2i5orshipm05vsnuo3ijce0n92ce5',
                description: 'Tempore quia dolor aut aliquam sed. Temporibus voluptates provident veniam mollitia architecto. Est aut libero omnis reiciendis velit omnis tempore. Officia officiis corporis explicabo blanditiis eius sit ut aut. Ut veritatis odio ad expedita omnis doloremque pariatur ex. Repellat voluptas qui sint sint praesentium est aut et ipsa.',
                excerpt: 'Odit molestiae quos unde quod reprehenderit eum quos eos. Dignissimos magni ut perferendis est recusandae consequatur. Eum fuga similique cupiditate dolores a vel quasi. Corrupti ut officiis corporis maxime. Enim mollitia iste quam sint. A assumenda voluptatum totam qui voluptatem pariatur et quod odit.',
                name: 'aqqfld93r90z4m8ihivyx0e8rma52sh5xkdxbcptf3oiiqnjfktva0d907sya27uln49hsekkdrs7n6cebejzi6wbdpxwfg1z0dl63kwabl8l6uvecnpolosjeu9ejp03537aatvp9pq59pq69ehbs8fk06m0fbwcx60kydeqpic5wunwpep0t6o8xmcx9rg0xzt35bktu47lfmvzv118yoo9stibx987916nnv8m4s5b7g00eeyvu48ghagrit',
                pathname: '056xd1aaemis0miq3zvz6mogj6ygk07jn04kwhpub98l4mqrdat9kl5v1ikt04hihouumpab237jbnz9zhr5ttimgon1nbc2k6t3pwjpn8he6c0v2epr4us7gevwv1mck7ovxy48di566seazciaqq3qb46ea0892uokcyb5nzd0eznyoug34t9z7txjz6kmbuy4xfpcohvof600lp51yrujxgge2nvzblrc73k3arhp83schls0lj7eke3952xabxmwk0vte4axcf3y6g6fa266l7ot6jeumcvq244lx716bfpuw3lqq3f2wy9dx1tyhraawh51upflun9gc6ro2czvmxiug2guwp059gzl6b2ktr907d9amqrrkk74gw7e3gx600f00hig4qrkenafwubco5ms0ctvii20fi7yafoe8xl9ri9kq84zm9byj7c6jhodb0tz55whzg8mg8kox71i5kevuyshb2o8w131jqeoie07sedeoi7q8c7e3gdzykw5jbe41ihsd9lkpqtwpd8usg03wjusqg785f16itsopiykt601xgmd7huzeitht1pjbt0tx1ngbfzf42sfsl1tnpti579uhe97ldywbc7sozt7bkwe0lfa7ayauqh9mcemax0qnwn2itzsf0kyrkyzfhcxye7e3pze77rq2nvr51ks1o4yg1oj2cw6v5n4hiegf9wv3dufhbxjqsybee5ziksvunvoookxacwapfe65tp2wdj761tnjqfuyot89trmq9u2g83e1nxewlt02s8rwbxdmzfq8lus57qfc1nhizd65i60usyqhydpqc36yk3vwcevxnhdc6085j0a8rxyltakvsfd84w5o7wvtyk6pyq9n3wjcg3blxfgvb92oet4oot9g8oh2863q88mny9xktmumandljdairn2anyqryeo0jfw0q90ioh404b43e3undrlcm4200col44ok5h97mkrqwbd3psobn0kn4w36j30cj9t01g5pn8cozri',
                filename: 'h7kz8vpa57wtu4hc1pe4unl17f7d6o6bqvk6t66wd28a9mbdo463va0r4q28zwb52ysmx1v9ngev0rfgm19w225dvmbqdgfo79haw3qh0yhlo5fczb1t5a4vz1zjukhavlcz9kitzcvt97rs8ut5kjdpkqi2csx3ijti3kqsl5d2l67mnzpzmx7rj9377s9f603eoenlaa380upqlbod9wxn3vl3drtkcmas2645lus24ze9s7vdrtbewfzzt75',
                url: 'mgdynq1rdwvwo5ywjirxmpnjm4wku1ncp1nxjnr0ryyxm91d13oapy42cs8knng5yswyiifp8dlzd1qd3jfpttya088276hvpd1xioera4p26qa0n4eogiedj62frfreb0vraqmz2lcnu790r84r933b326klcguy4uwkxe6t6feue8m63fls4pd5uqnfwnwrwtm2262ihozga0zbfnv0iazhv5c5e3dc049sdx601cghs2muk84kf5sr4vas98q6xx93ds2kpabw2894rb97tc05x4ttx4z8a4zz07c7jlbk9z2ljr0564qh8tcah5rxpevwcpf7d1bq3z7k6yz52wyi3l9ja75p1vld12qldzrv8cf7m8d8fmyhocmglw8wk43r3e301ecjbqs7tjwhrstix1spkuw91dh0i7lsfh703py0eh26o9rgj4h9lf8lj357k6dmcdwb1g947eoje2p4qzhzq1p6pxzutk67gnv63mg9yb9ykxwczkkwnfuvbogaisp8ru3u0catuakvdcbdl0ytxikgnfivr4m2s3n7l5efkvahj7ald3q8xhg4a8bisnk2xfo7d70glvlz707uedxsejpyi5ql1aytu2apqk28derpusrd0q04vvnh7qcgthp16ld6vymjtwtvwzpsvea2zdlretpa92ifivij302niczr4gsn15webpsz62nlyp6wezh8jbwp9yuxivhf2vq2cdvmpfhbe48gyt13hdunj2ohyj0u19h7ol4u4jn18ub74nf8ehtp2zhba9tsvgniredn1c1n5qzm8uzmv5rr3koqnzhfdpoabmo09o2kkb8tyteykn7dfh5z9u78s5r9u7x1w74xwd0ij9fld8yp8dpglamjqx50sg08xr944hk8e0ombu9nif1uwzwtu0mvxe5w0xly1ly4ehi4grb715f29cqwf23jeotnlarfe97ztq4aaeyk9bol5hurhrw1988ya2wcuzsfitrbwb4vchxifozirlbmunf',
                mime: 'nfx96qgvql4ibubtik34wf2a645ahbt8854q1zam51xsj26iet',
                extension: '5d38b524s9kj5koumztwoziznlufzoioe6ab2fwmwvg7qb2jqc',
                size: 3332587769,
                width: 7211786,
                height: 225426,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'g9n34g2xzjxacn8o4c3ceta8q86odo3avaismq63gohxhsreckwoj8znw9o8ywrg31h5sms7wu8p8zfslwf9fy9s4vag53ewiohdt5cwtitg5zoafx6gd3600yniv8yxpo87kdg18xi3tfu7nrxe1elkvzspybey2ikikv1kgjc95czn43wzz0r9c1tqzo2xjbf65m59b4hxhrro74hn20ll2pzn8jhmv7cx8ywggabajs8tx98090mzgrbfmmi',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '5l12nsnf3e8jrv612d9e09pcqd0s3jl3shfozmchh35lvdnefgay7fkox9to954z3y1vwugve50',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 721963,
                alt: 'g5v8obzalc0knblo5orbwhyflhg0hes5awwzqe1e2npa8aysigp7ef44gfbtynslaj3k8zo770chzyu7fesu40srj1o7syvi7ml8zu4h1g2ohg1jvvjc7voatp0ng6te00rwc8s7urwbzs2ljhlmx6f0p81wis2fdmld2nbtwg91wzadd841mi3n6sx4iqo2hdjf4hyx7yfxzq5126hp1wbh1xx71uozp5jhy3dad5wkeseig6wupmbsnnhkesd',
                title: 'prl073f0crsniwww5spoufbr8853wq6qtb8iid78zsds16ga8jc911gc96c7kb8yd29f0r304z9427j5i25kk1jbtecgfbay8mx0ak06wogzurxvqdlgypfiod513awrw2giosb47jlo5yb932c3phd73stbexuts3i79oxjizzwijq4hv0m8ww9h3f9esiw6a59j7w5im32928p0v6vjih0fjzt7893nfzv47r9i3c78xofdtjhv3a7ijamber',
                description: 'Debitis perspiciatis voluptas est. Tenetur aut labore commodi pariatur vel tenetur qui. Qui qui facilis provident et repellat fugit in asperiores.',
                excerpt: 'Consectetur ipsa in dolores aut. Quisquam sunt est est qui. In asperiores rerum eum delectus omnis. Voluptatem dolorem et et aut error cupiditate aliquam quis eveniet. Doloremque omnis et. Ea mollitia inventore similique recusandae voluptatum suscipit repellat.',
                name: '179yshnolhuh4cxqmx7icpdk12s8t1nhkh4wbmhx3wap1et9xfeazhgsql1x99r5azz3kgxj2lus1hafh8ump3ctozskopki8s8lk918mfofe7ro10tha0pe45wfbff2lt7nx6nasb52h33ayxnotm6ke5qfhvbn9k6auwopgiksgxl50v0oykdednbpzom6ehtbgoanzlersxqm3ar8opg3jncy0f1cbuo4q07a8sm0rek6d899pix0feggv38',
                pathname: 'cuy69sse4ufyswaofvl77s9d5u7f4kgf3lfou4kx3soufwkdp1b0ud8zi8a1ibdm2vsdvavb87fbkgg1p079hrf6l0kl5bwkqfs3xl51xbqxmzowq9v5lhyrkh3jg2u36x4pwtesn4aswe0l1lk6o330gibpjkaevrmx0l11azccr1mgufcidm19tr48gyw6jnzy4mkuvmt8cd89hfv27ra2hc57kqplvuxxxar00peflf99znpty566xzugjdvqr84pf3voboy7qo4i8dwu911uw9bv2zx9wb64lw45cupumzm5ffg9vqf4khampcqwz7yj2tiqfy73r7jxsd75mojeorziqnea2xcqkiw9srbi7pppf1efhxp22y8xugtqtmkzly26tcy97a2b8m1nywu2tjfzt8r7v0u5ystma4lfa57fapob0wiplbwz1nmzfo6iqbboyrvqewrwt07mjjhc580nhtxe2t19wq08l9smw2u4pc8bl02q51r1v8xbymu8q02wp1wqles491zzqd0wm7fta4helql2tgabatvcjfjb7ubs1muko163qh89r7vuyg5vqa40gg5tuhucmf1hlfmg5yp3uesias1s9poq91gdc3pcc2tyge3oeyk54exne0x1s4rioayewyjpcpcfjnfjsh61stu7mn5rxpuk4fwyan8suivcops6brpthz96i2jp43r9ucsqgov0azhqqjhmc5nipg0zfhwvwih9zhoqqap7eq49p8celjmqctlem0iopsrgmfznyibkc9t1naiw6hx5rn6nrmrrj15wb1t5zkvjvjs442jndyeoz3a4a8sp8bip1r15utn7ejcfvccd2j6vjll3dpud9u2de92hb4esi15dy4ir35erwvb4lmc2d2gl3w2hhbmi0e7lb1vsq1coqvoyhzmofn4rfgdmucvn8k5keiw5ih82o9p2bdnc6j6l8rux19fc2ytwr8k05r7pskr5xvrvvcwdtzb9a6pbafr3uamwj0j8',
                filename: 'y14dwxvv3j7zivh9m1zsecxi5n4uf5la36lw40g1acnzzc509k19eq0bzpgjgllgupnjy5k3mzlwtccot3wy0ztn9hphbdpg12kdzbs7pqbnblnr0lx0pebpot6e5gk2stixzxqnmgfopjh0jnoz2hv8suvieuzar1bf2jx7siu6vacyvssnjhtb7fiisayh5tpvz5582xob3gpja81qckzvamyvgo7pjtkkiow17k3ny1ifblz6kw4p7pvvvir',
                url: 'a1b1mxhjaoshv7z5iv5feig4d6attbazw7bmtz5rsioejvwhik17nivjtxky0h49w5cjabwc43u3ryjaiaamcpdewlrlvxdh2w7t749sr17qdjw0j0y0qmu5bl90siwjbqfvey9m0jly5c86d121g45v6rxc9yb524uvl8xy18qutjgjjphn4puha36qr0v1452vtlx4ppjtbcq5q6xb3ncwqks5jns7lj0ix0qd2vtily0bjr2alr0egzh520nxfddr4f8mc2ec9zyvxruwww94bl5qw2g5n0wtgqwszwc5zznteml3ndc6ug8za2mh64bi7dy4njjkdw2ialqhape07uw8fvfgpndk6b136amlyna1mj04tiusrdka4xr6leo9fv7t9mzq5v9jr39l55f6xalfvr8ysczenjklcs47hwfjzox02ujp3r7egp7xxinjqe0ge3f34y4pf26m0xb1l8jdvpoyav4ouoemixhlkoi46z73vdc5g95xkx7bpbvkcrlcivkjtb6e5smht2fpx0tjiayj3b0zcanmf8y3s6yxp37saq0udhu3xpsl7ueetjrrk8lh095av0bxjtnasgu381lglbdppzlhs658fe5zg0oumpbo6mpu9dokx2vrzkzi1rrn9yykq6g94e7nwc46nd456ruen0w47lhiqs8ltf8ris1mszc4qygj1aw8yjm6jp8tu5nbmh4t2yuhats230o3llif0kpcmu16bsq0flbg3jbs1bkwk28v2wm6eze90uqfyp71jz5c6ywxs1vhdaucnjmn6aoefmut8dtuuvso4ysuyebj2ibqqosdqcyapweaaq5b7q4hzwi9pdw6j9x4neqegzn8dyw1a720a4pi0q579oub09cmndbz9o9f5a75nnxuxcec5asqr5gtsqsjmuj6hrpjb6t89dgrtnama3hsm5qoakheuae5yd84y5r7d7nxqzb5vqd9fy2ddtfdjjgcicb1ia1co1l8g0oanp80kx50di7t',
                mime: 'l14n3pfg9bhyxm4nbubra0osyvq9xu2a9h75fx756ld0c2jbbz',
                extension: 're4hrdz16nm82v6xjecya37at4mw46mpzk48fypm10ujrplzhn',
                size: 6211062224,
                width: 448753,
                height: 9600651,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'ksub1pzvfto6aumadk49p0ftk6z4ezol0i1gmmyypmoxb6v47v9k447zdpmzrk7skg9ndrq8yo5rhg48fxe1guxsci6t8e52dgw2khusrz9c6zdfbgt8xicjqjoobzpykchowtrivj5x66di36ivz490yzcxd55kuh03i3vdzk17ejk4j4px51yi1kaxxzj9s2vp0xwgsvcjrhom79wk5s0y65dag7y7ttse156ct53mf9zce76q76jit43icwg',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'v5r1obyuydk4czy4jgqtek27owlk6vbi17bol3ma1t76rbnsxbkjjwwgkn1u30a66mcpwemrwnk',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 683223,
                alt: 'eh60a0mbzkb5qh62j9uj571681dhduyqmcjhv4ars6v4ydktrlaqe8x9didif7xg4totyld64tysry8jf6o30fzqcv769ip428aoxqbf9xlqnwk4x9ox5vjgbltvlg3yp992dbushdbd4ygidqbvjeo6zwq78b14ybomqsytedicme5njxzhyep904m6zftml4k9iyw8y629gbde6xox2ca1lvy0f47sa1jlzu6um6kakbofuu8c62zmddy99er',
                title: '8a3993wvqsk4q9ogvfp5eh2mvf2227yil32i1ber24b6wgui7ztqky3sqs4ed4pphbou1lwrdwbo1mbsqzkb5ohz6vlpp3mio9qhdmitasitud20kafmo5jln2korr2gv1eu2j44edm5il4z38gegyrr0f1enyb27cfy9oz5hkukiodrl4do9hjiom06vn6nwtxuahyh2z6gru4pah5rj1jgf6i6pr1y6ylf9cokgmf3i7nnk4hibk5mr587ivf',
                description: 'Perspiciatis quasi asperiores saepe delectus fugit. Quo voluptatem officia dolor culpa. Laborum rerum in modi dolores aliquam est voluptas.',
                excerpt: 'Odio libero nihil voluptas eum mollitia qui. Iure autem et eum totam dolores. Non voluptate quidem iusto quia. Amet repudiandae itaque perferendis vero est iste sit exercitationem dolorem. Ea qui molestias rerum et ex excepturi architecto excepturi qui.',
                name: 'ueugejhgypgyz73wr8mccd4cg10ri7bhgnqnrer5ycdchbssvpsfskgqtpqz2lzlp0p2hhea7zztwpbv1xfv9udrvy3b3mmcp9ufpl3atpr40ek2y055vx2ez58ihqn86op179zrzc57qiowqmtp1ksnczq97z95p4qjabz7w53ckrjus2rpphteuwwhj1azk7dfatanblf7lt68si69r7kohrjgbbdx5wxndj1jm9n0rxioxjaukifen7u94ks',
                pathname: '600ntc9qgof774txwbullq0j0a2u2r1knnjj5lnmqtocx3bvh2t9bil3hz0hmeg9q829l8pa0cz07dqlrkgwhlcv0bmoenvi71ssk444pkzyyyctqzs7thm6wjy1woy4kafy0ul0yoewdred3i8gqfry89e6rcfdtl42sr7n8iocf79h91sdaxwpr0pop4r9ucd83z54791elbsu5482xct5sp3b4az7f86ojoxdeabvwpv7emzwx9nxqddm0ebel7h648pthyk3jb1swy0b31fbnm2trkjflhqs75cq8bq5el2kjs0ntcdjro9sjqzxnqp3vch8clngzigqnpjqvho96ppcns2y0syod3w7wzysv2u5v3gugq5f56ccdpwfomw15r0836g7304bxr6p1b13j94q9evyv9q9in3a01hygexuc0q5bka5nekda0v0kfduscjlvmk0xftehjk876nygbg3kootwimrh13h8fyrs9wf082lvjld8daptv43oxytyrxnvwe2rppiptkhlwfsolptn11vw2od92ltvav4gh0r0m2t1p91j8p4ydf3ll3i5tnn0rz5dkb2bnoyfx8gtw4gird1skrl3ama9u2mddrtwruisb7bhxyl51qn6m7j2ar0cru903xab53w6uh6axajm0pwfjq0x4tetaq7t1sjyiy3jgmxv515netdqgvoptcjp87v2r5pmosggyrsge81ss4hyje7ezv5fh6l8xz8756yy81v1954qldgvyex01s3c47i7ew6og3rm6zajklklngrwfpi2snsnhv9ef5u9ru3ea5z9as59jnet6caxxfx2z7wlno8ffmt6ts6n45qf660h8nnady528j7mco40n7yekboj9r7zla7croc3vx6qakcqb564djcbs8r0nbx7c6ktfxkshlwhbncawsk0cffsc81of1nf6x6r0wlg68j3ckpdu4i9o7a2uoz6tmfgluqwzy97bkqgygeqkhgpvhhvj8swi1tb1gb',
                filename: 'nxwm2cy9cu2ww6qbk5362twd101j3bodxrz0ote246k5dg40i5ajo7yu2dzvoyxcsogm36io4shq8rwab76yepljx91230pn9jlxye58vtkgbhsp7ffcj8c332iq7vvjh5s97osr12s88wu5xa38tgzjlpitjhm3sii4reirwkeiieztu1gdgivfms7k6tkbojfd0v5eaunwswf8hp9li9kmqz6ikrgsjm4ulkijbyuj5hv28oq7tj92uefl6pe',
                url: '63f5p168gk7eu4kjlhpxcklvgzpai4699icvjlo9kscwgb3gf9wssiabv99wjbnrr20epju7512bt8pab4rxg0dkhwdfpsf1x8uhaw37b2pgjbn2qxmhratviw548ee23do7ppp7pgnrepwl72pfy4f83wp149onv4jhpdvudgid6z6ok18pxgjs2e36yyjlo6va2zo67bbdvkz5k2aavgl30hkuqibeokyvknveaeq61k08pr3ogw1cq8ku7ecoaxtzyd2uh8wjeped0u1072mu3r2wybs5cpyk6h5ob99fm7urpp6l2hm7irr8nm9n3qnoz83tg8kwipmwva5mxitw9mvp3n43xbkdnkrjrac9zfs0k22cb7io1wf9t62nr5kgxtywhvcyj9fon86dt0b2cjnrfvl8uqnzsdr09yb2r689wa7a5zo0mbev7ibv08lil8mnb2iza2xzz0nrcfxfn7h5gyq16acshwxz25ie4hbjxhj4bhk3zu9vfsxpinsd1ut78wi90kph2sgawozdnia51ghqhfr3x12rozruzd9yap1snnin8lzfpyvrc3ofz6ys99wxxgyuvsd2h35ni60bkvhbbgxkp2tjtg3xog7r1vi7dvxcy5n8kylqsch2fgrs5l6b0py9lr4zaw2g2qq1s2goprwco9358m7ccaumurnygkxls44349lasskir46126mowe2vk8yr1trz6ublnn2q1113j1l01hlnpguh1xct66uzlf3nqsq0iil7mcw2xrcw6z21t71wykn1gw5ovp2k7i1i9yaj9a0bs8z6oj15m886c8swkyzhqdk5dtjzlt8yeqn9wb2fd68l3aw1aemoi2oaert3s2czq9eksblbdmi9fsm1oedmy4wut3u2u41sx7mnnl5ififopv7pd3b7qzt8w0eu09srsh8nzfve51901cbnjj31vt03egp3upiy922tqbskr8fz8zp28wjksl9fikbwnfhz7m5kqaw5t5zjhk59r8yj',
                mime: 'zaar0kxtt8vtanypaymzff59242zh52qcikshx07lqymw3nhcn',
                extension: '1iuzrf34kt01yg35g2wmhc9shwkaoqcshwhy0cll7s27a730pr',
                size: 5794128731,
                width: 969066,
                height: 170975,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'wddz823ic2cii5ibh375tcxtxhqvrs9k0ds9gv64avkoyxvlcxij33hkf72aim0953u87beayjcvce6d57e5n83zt6kdl00c504dkp3zx0x2uns6e1cv5g9v8z4n1p66cktesbw4w257wtdpk7b37z2oa2qrb6kk535klwf4ev2ve4liwkijgmgakf28wm7knipup6fjyiwhoxvks5280d9zyz0xfhvylig5janw02ve9v88nmjybxzb00dyhho3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'lrm1vdvfm6beokomtfzpwgn26fnlsyci3750funn03b7dibno6pjskhkgxkv9dso9eaml6adh6z',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 770314,
                alt: 'o1fswn5cf0ptx0ngfx5ndprxktxpczgge59yjf594bttpjcshmc0sswn73b872pi6yfniuaodosq4dez8yxb4n0263vyx2smihi5fvo25azm9wzupylfsx6nlfkvxpt8c8hnhy7mxwyn0cpkftw3s8pxei8wk528f7tbxlwe192uunswmde17c7dn7gd6hgbhxy1u2vwdccgabrzmwj5hvegb5hhrfwr3e1sq4ec0hl7nxg8k7uvbq6u2pxuf5z',
                title: 'oikfrfjkcyur4385g01urfjdjr454ucegikkbnhgai5vmbg346upuqaqv29jggczpskr2ymhn9znde0aks3120z51ty8lapcrfhnlwrgvczi4jxkfcg5qi0q5ce6ice8buhcqbwipjt53peeiwazoj6zzomfnwv143p1gl6k2oyhcimnykz7z91564ixj1z6goyxcf1xem3tbn6wxqjdtlj9fiq04uiwawfnpgqlp27xn0goa1lnhqu77ds6s12',
                description: 'Ipsa vel magni expedita quae. Ut consequuntur consequatur voluptatem reiciendis. Enim voluptatem dignissimos unde dolores. Delectus illo ea doloribus. Voluptatem reiciendis et dolor accusantium alias doloribus modi.',
                excerpt: 'Occaecati et nihil enim. Occaecati ullam mollitia delectus labore ab quaerat eum sit. Molestias debitis quas quibusdam debitis sed voluptas accusantium. Delectus delectus rerum voluptas explicabo omnis culpa eum.',
                name: 'mg3gx5k7m6sd9doxplwj6s28026r8z5loo12h9k44sin7jjt980apntus1tt6t7kf9iohcfi4ock0ij3573ju944wpikwfgria6xoqzicm29ub9jy1cmre9yenf0f7scvla32criid1w5x5nv3917kdcz8eg5jr0ehmnkc52gwp3zb5fyjni3slvqpx0ko65w3e63ss2mlud531e3z5qnncueoa1wk3gnh0mac4tfstwos2b46b1l6cg11xlxta',
                pathname: 'mwyjigv0ynh3apukwaqrqwdymaeysavtgg72ezaw8o46jehv4synyqtg9c7x6bgqlxi5liu21ogjn2mgaddn0msvziknoyyu8lxno2ydr7detw8dsnskknvitxs6zcqjvp22se9yyrriqt2lsc2xaf04zpe2li0wnb3t27a8ud9tbyyeavyo9xykvmuoo0qg45x1tqwrnxnhptb1boodc0tjoidfqxf4qs63zibqi4q14c03xnnsgq1gt0f1175snpzsln4pde0mqgg40zdgm1904ovd5jev0me5dfafyhap9le2l5mqfmf64uejlnkxhkogrpyz0kb046vhbgk7pn5s7w0562ze3c45byd9qlnk7efpvoph7svzl4d9h62iku8ckx6yfaffne4s7ffboijfnem0bwlyufxjrrdmplarunvdx0mr55yldxxczjs72bhc7wgjmbmvoh8bveorjvlogkidbg86uzewxw57t707mvdqezekpwb5x0zh2czq3rtbl1mi4tq7sul2j09cjj873ozf8widmx61bn4zfuod8ekoiqohaesieqhvlfvztqhdlltf8150jl5aol6r7d2ffwtf1nd764sc5co6wszpuwet3kbn5lnb10vj90af3jtgkho36b7eivdsglsq6mqdra8vj30spq8n79kg2fegal4088b72wg0xf9vaojq7swfq04bon1d7tto04qgfah2dfvu3k6tnm1fy14p5av04cwxlzrey56ovvhzddwh2k2psbtqc0b36czuuz2t1a4dr8kpdktmz0mdn5heawfz0h914almv48rf718o5gh7j57twmxmnjk2ozk0cino6b8bjipqqrj2w1g5l747ms8i1gmg2rddvbptk6zj6i8xmnmu2mius84j9w621u9erv3qu0ihnllx56jo7dfdjf990c8yktmr1a9gydeteswlo9ayqhiloja4cnnn47es2rjmv3r476c7o6sxvj3b43fpjwon2clm47hiyyp7plf',
                filename: 'bfz9xba26sm7p5fsgl8mlrq49eld9gexyqw8t7qxp1r5ih7ord2wo40mh83rtsxmksxn81we45i23tghsh4472xbcrhzg3extwjexj1050nn84d5nzf829bj6c66scgmthfcutdkdoxs48ao10he46g8a360v9u6j9e6t0fdzufb7xkox8eyo9zejdoy6ibxussccuako7d4uaouglkax8gbzb6g6xfex53myi6qygrthh728x6vsthtupst7eo',
                url: 'ee83g7z0twd3l1q4hudebey6b88nngf26jx1j8t6g1rxfng2ni4bm8rj93cjka9aa7hodai2ftcoy62rcmacj5mnjcl60fhq2sta1e3yrnjf3pst19i2sqwocp87upwof08hb9xmgwgoi6cjemscwaz7w81pk2caf0dx0kk8aswtbfs1ml1uryglqloc1smzd9rlxu8hukqzkywu81op690h2wi5azt3v6uf9fmd93mk41y1kwb18muxyybt88n2yqi0y3b0yq0d2xnzd72omg1g0443v7lh8m7oao3ilwqlcd4p8kpi6n1rfkhwdkdxco99r58nqciyce6zwxw7sx6g4ddn5t9vf6r980yxdbboqvkvrl58l7fa9b23b43n9ldx77c521qruwzd49zl6p08x6nvbqqydr5lay52e85qtejwe4lb0c55yaffd6zo1v9nju3ykyiukea0kjpgprls8d17tem70qzkl4m2295icd902jnvase3nc3792r3osasqkvicyc3o7tfauh33xit1j381w4jfzqnj6z06si1lwc3qeihoy974yfer1f4iqx8cj9jssl11mycdl9ayxzq06ufby5ztyuh84r55yaizl6rem1g1lyt3u4yqcau0az9zkmlshax2quocwysntyqhknsaz3111z8muh7n5qelg37hitt263ifvf4xy5k779ck9rg617tep3drdijjiflxdposb2bx7awtzaky6k1i25ek8wtn30nnqe2jwutocu1d4wli3uh126ek85txa855a0rclcx043ipa43wik24jmxclwd3ga6l3qycze13lhvvti712enp1c1p7219r72ek8lazi73i90qkkoe0uhochwbxa2j9i3or021qpeictumx3q8vs266j43doctuggw5engls1586p8bczly8pfl8ubsrr4xbkioabtz5tyc50zighofkaac1nonna3fwrckqg19v22rw9q22ywwq9j3z0zko62cw3a9ekc3hu',
                mime: 'l0ttz6hfzdtk8ddqs10ibakad2x6swq1uimg1pfzcomcnpvu0o',
                extension: 'oqikd95tal7g30ezf5t25fx6mai9ffnxpiosqfauaggc8ye39q',
                size: -9,
                width: 779992,
                height: 569931,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: '8iq7hr4xz14zy8s9t046xctr42vkb30wte7hn9dpbyazazvj4yg7smxoino655vrtwyxcnghvvxghmo0zmj7koukaxbqya1evyt7rsfc7s6kdfr9587obzt7i4z284kmwq6adub0m2ihxav1g7c7n4hnjidl9srdqo7tl8u6i6pz9wlsbt6e8kiqwyrjtcxrjacs0j21k2dexr6gqccndrod1zqaz4dch9xr1ptti5zu9b9cqtr3mbtv3pdn8hf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: 'piewo8k867oma6dn2eolag9zipoiuuiwnbch9ft7yg5jh6pjyck6wggg3l9jiok50sl5b0xm9cb',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 343607,
                alt: 'ssyukt41jpx3wepxq7abxxu0pk51e7iuj87h2zxghdkn2c4ye4nnlnxnzxqrrcqmsmiolu0cc69z674v5ap577ayhx1mfrxen7y8w47bgdotha7y18z9daa8b3e46fxuma6pjmej8zmpg5kz62il5414i8cmp914vrtxsm95q9p07654akxu0asktr5lk9ni1dzshdzc526vtwl55v39v1ck6l2kk68p6vwa18fxjae5vgqf8rb2ln3whnzocu7',
                title: 'makmugwej22hxc1xkxpdv416kxwrjbtjfl7liqrs1cc3d47cacyrgm0zuyoprzii1v5giinhfwz0u064us32cjpz3es9vewak7oy4peb2did8ud1agdafh8ze1gt1pdz7ex2kmt6rjk5dqgazhcffpenzm0y975ttniep0ymkrbyv9g6fneduiwbwvsne4e463dmmrq4k97qhp89gxzdtnlby05jro60mih2echr5oz5kukjv3ngx7ylf39y20t',
                description: 'Excepturi quam molestias occaecati odio deleniti repellendus. Qui deserunt sit amet aspernatur explicabo corrupti. Sit accusantium quo ut ratione atque. Nesciunt ad eum repellendus provident rem voluptas quo.',
                excerpt: 'Maiores fugiat veritatis. Soluta occaecati cum quisquam quas nihil recusandae eos. Consequuntur nemo eligendi aut optio officia velit eius aliquid. Nobis nesciunt omnis eos rerum tenetur aut voluptate maxime.',
                name: 'mt6nwm8yyzqd1ndih3p93aa2ulztbvcsu2wh60qn9v8ea4efck9lk327ojvenvzlb876jqd3wllln2u15b8sj5s83uxr4u0zm1wjjl6sqgxm6qp5dcr9nebwjif9sko6r1dlvhjarpjwitqcg7hmjixzhpcdo6tk6wwuwa0rp5okz2otf8ryihozsjj5qc4wmzdr21yjav9cfh3k31nfdvvkze4qz6j54ypg5wg4ij1nf83m3mftun1yy9gsf7w',
                pathname: 'oxvw1xea8skwc8aljjm56q1sdqjj514feh3jy1a10zgys610jlh6qdk79a10i27ohq902lysialoszoc5y8n8cf5jmlhpiw2kdqlbqayzz7surmgqxr3j9jkm1kfk3l8g70d4l25dtqtk9bg4ujxevq880a1mik1wvz8f69mr0boq01x1yhtx284psfyue4ie48ecu5ms3yg9sd5jp51r9vpspx5ybg5hx44yy2n3cfxgyfi5c5jepvf950zjcay1e1idgywnviqei7ydlq3yvqyk7g7xcfwji72wimn29719cjbyu73os49xiq5ujdumtkrl0g3ntmuzgmdaszwgmzel1xgpank7cmsg0qjs2h2erngkf4ax5py664e7001wv03kar4lbr5xhqhhxz0z2ra1k6pwxb1h99bknhd91juyaroggeub56qx29wahn89p9mz0smmdgy5ue7vdyksrejge4p82pzfwp18cw266a7wtdws1tq2efv4mlh0xby0ynj13s7pg9za1944bkz2hch1pq7n1zbucnqaaxgjaipbdhphwdv81cfkgytuz53o2yhjsu17u3yd2ny4sk1t9c4c4bowt3b9r12r0tz78qab2mdmhj18wcyijs0azj94vlagryupkn2utmwzpj4i66tq5i3dyygu21rh6fw7xzc5s0925wg1u0z6fcoknbeosad1mdc1i4s6fx2trc0pt4tpb4nk3gp4mhe2ozpaiv9shhgx2yqe7a7s612spr73i0qfrpq0wrfiwlb0tkti35slob4zy1avzg4bbyl0qwuaf0s3x1p2mhqkj5ry7a85qws28gqlnw51qw14c1gg6nmuuvdo2z2cuq476rvrz73pot88stoecgn7klx43299p9qfxwtt66pz7sg4uruhsvq3yvuzyovtdaoyjdp4jramg4l76wg698j47bzu0wkpgo7ulp9s0ddiy2maagxxqcl2jvqtq8jjhz87axxaijs9w4kbbwesas6pnh6bh6b',
                filename: '17v2n91vqcwuowu4dwlym4lanalrahwu9acw1c0daj4qtnmsgruiyrtqmwptp7qev0slo8rpb35gcg5qpqyay7srhuvadbjzboc2qykd5dycea42tk1uh87woptt4oz8cxmeshg4c4gtp742qgdowuwqylyfsbcio9a485s4t4ol5l1fdllhuj8d6we6d2lqa6cj73o6wwe1ccxf472nj4k22u93xdrtb74t2l8gnn30pftbustponfwt24hzmi',
                url: '93g47pxy2rulmganrdxkvhr2p8fwnps8qw6yg3xnvy4gatlb24zy8m0pidybgpnxt5gkhbgzirff1vik5z5ory5lstantq7ajmgujcl2kql7bazhvyr732seyvj1iwijfzt3zthwh1nnwsfd9tzs23u69e4kjfz0m0xugzss3wis425vfln0y41kczbzn30ago2w9u6zjycgsg7xw9pqy79ot7grm2ov4w90vquc0k8n841gshzhwqlswfl26uyvcij397vz3dqd82dvmc1hhrh8p9rweafxy13yhf82g1ud4fti0qwg8uii3mhdt0fgausio338xb1yzz6thfzmzc6qn4eodfznraxlm4mmpx1bnx89oe3c6muzsjfau41kbgleea6z81zt6tm9vng0t92tu4ue4p3xp2z0miqv79l54j77e92cnc1u915t5fycluws2qtwwpbs6wqt640w1xlzubdcdyxiutdl80ul1empq94ftjt0j7tnh22atfrn0m8s61n79yjz0uxzovu6h9jqzli8hhsnq3m5ta6cegx69xxsztsmxb49apq9vi1076jsazx5y2luo9wo6uqxhwoe4fst7ni3qv2061ggqnlsr8n4ulst02yx1x2aixjxj3v9fep2cgszi1nfuhk1ctm9gf1j160ej68pwr0o57ia2xag0zlgim7yxo8g76vbzi5ck79q08uqf6svx9oq2t0lwxfrs5bpouj65v37dpu8sgzmb039w4y6h4qhesw3ajikajh6iaxe8h1okjwdsvmwcqn1oupssyaknilbf3is24b4cbl72k4j4z67lb84m4eopt9a2w7xddi3h9evqzzij6ujcse8bg9a45bjpuc1vjpt1tjr9gxza8qp5xmtxvegttw16oklwlns9ryf4rd2nsg11lob518ipw2max7m2jijfjavzlz46pj1ntdb9k8t5v9ch8b3o5w53mdgppva9rm8iyjia28ka32phcto4hs5p3eme6hjhpensm1s',
                mime: 'xi5n1e89m7xmqg0lcn6oghz979hs0kitaxq9p3dgxidkna58bg',
                extension: 'vvmvd9qdmz2x87o4llp71su8xn1u19r2icyfov6qf5u7f2mfvd',
                size: 8412061529,
                width: 380122,
                height: 544844,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'ig44dy9z5ji58x6pn3e6iitqe9jghbg7anert8x3rnfr9ix071420pyr9dqqt3tj77xfb8t3jpoqdmb0uiclcuren1d9juxspa2mu15ssezg5emttpeaj40ukey2v50tdmgg23fndj7smul3vgxru8jjvo0d0nlfgbumrb48msh2cfa7fm17m2opgzm7b90iod27mt9qo8oxylhjtmpm0jxh516tcjeckag95yz2zlsk9hsntdb5awcweeh3y8e',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
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

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'b5a77176-82bc-45dd-92e5-242ac9aa7979'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '78af718a-e5fe-4915-9224-885d4f6d5eca'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '78af718a-e5fe-4915-9224-885d4f6d5eca'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/59925e27-ddca-4287-9f13-3f449f42e533')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/78af718a-e5fe-4915-9224-885d4f6d5eca')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '78af718a-e5fe-4915-9224-885d4f6d5eca'));
    });

    test(`/REST:GET admin/attachments`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4ab61095-d85e-44ce-86fe-d53b4e93cb35',
                commonId: 'c2dcb2ec-e0bb-4ba8-a968-f8883ab4a440',
                langId: '31df1abb-1d17-4e05-bc12-ad48e88d028d',
                attachableModel: '8wc50kdqd6ycg7didyhkgabt3n0929h9bkgw3vu5ty3p79tuyz0tcjgjviilkmp8t2exq9h6eri',
                attachableId: '7e9e5488-ac45-4e9c-81e2-e4078d3bbe41',
                familyId: '42ee2060-72b2-402a-b5b0-15b7ad8f1173',
                sort: 691738,
                alt: 'hww9abnunrvqdohk69wli9k7eyf9wz0jmdil6c0lwprptbvyr9kwl6z1925a1lpuj8os8bplpe9m482y0dficr93znnkpkblp4ey2msai72wdocu6v27p8qnzq5u6lqf49zyojb6y7f62ca8fx4rn25ttm8uqhc1o8zqnmgbdr0t9l4sxdp1uhzgkfajyybtq77mav7em01s1000dihky7933rpfqjf38ogznhuj0qisv3057q3gbwc0g2pwijl',
                title: '6kt53d8ww8fah5jrkakfztwf4ym9hav4rpeotq6apaee33qla19hhul37t7q021zfwtc3pptfbnqxxa94mnvi801kw3es6ku0hvna7ki3b0gj2ee6uj27fdq9dzeosfwpbwiu6ghom3wi80xfrs7f36jujjdxmsg4eloo94r5tm6qgy0vivnpcz2rbj82u96s7rjjwot1pzsuy1w62kbrs20rywjoa545xduo28kci9g1cq8fkzn9diu6di8uqo',
                description: 'Et totam voluptates illo non ad a aperiam minima. Esse explicabo ratione est ratione non ipsam. Aut distinctio rerum. Explicabo qui tempore vel quia veniam.',
                excerpt: 'Commodi aliquid vero delectus similique doloribus maiores ullam ut dicta. Qui est perferendis et sed officia. Et in tempora esse sint. Et rerum eligendi et nesciunt et non itaque eius. Aut et praesentium quam aut quibusdam repellat.',
                name: '9o7dpxxnaltt3xnly5cykdo8232flk7kwed03rpc5pu0m9klzlb7729icwjdfc7f8b5wthxyz1uf6iotokhalkyw84qullhfkqhwughgb7or8ffpknzdn4etkm9y61huxlcqxlp0q1q69g08edcvys0o2hywls2cmhn7cd3vcgonw8chisbexm1pb0ng0a0tompaxirr5n2619a7ldawhhwjm2eazop7rvzlbijmdnou2uafe9bvlv9p2k9csh8',
                pathname: 'zbu4apn571qvhvv68502lhjfljh3z3ujlaulr1hdtasib3pzzvzp8w2bzpp1kkl7mt28oht6dppqcj8lm2794uv11ezxekga78e8cadhz3cocqh3bgu83jk0l0s0zf7bhkcg6e6vo0p0qcewqr24qkfbpqueld58gnnz4ds4mycdvxle6cgenjqyr6as01uredyrwzqfkd0wxoxbb29zrgk3zi5isvm8ztgsyh09eudv7w7aukhcs18rw96s9y0zfosre5pfjob53e6hpwagq7tb11jxk8aaaiidl7kn35lameh4yjsn8wysy8xyie2esbnevfh4sq6hl3m1tdpzpulavc8fenbkqwq2judkdei53pk7hpclxzqe4imrt1yfbm7jg8o8oh9qnnj95z59qp9crhy9o756o97qu3ws6g0v7qlx57504i2nlfd6sloh2vvlss90sy8pmbd4zg9qwn3lus3c9ffwslj8nchvpmrgazsobvs2oyb40arjsooirgem69i37fjjeygdi1jclc6ufo1lsti7oqeujfer7lz1ws78020x400tqh4xnafcwx62oe3ko0r1rzvv0x2dq8ztu8w9cwij9yx34hm6r9sxqds5kezp1y1xjsfltfc3nttbp2bsz38y5kxoudbme2ax6jadskli0cmr8fit4gz8xc5muvqafyx5g6uxixa664mzpc9q27h9ohr17p8lsca8i3bxvduj4y665pxexautjkhgawkgdyfb21p7qlja9ka6mjad4fvtdppuxmi9sw3efyvzjqn8tl8v0pgvgd1it3zycmcis61bjsc0dvlqq8ouzsh9qpv79ucvy7m771my9wvonlfihc20tfxsyfkphke6eaubr58u0vlzoj8ejwjy65f4t5kg8zahx8bxgz2doit6rdvazvih0abcuy29gp3osj3dnjr1qtcmtzzonhule2wcgupws3vpamqe7cjjr0bvguwhqj27obrklhfspvkqnmv2ja6qe19605yd',
                filename: 'kxswcxef5iq1iu0yoy86rhdm9v9leae7cm9kbiy5d1kl90gn8tl2g6kkyn33s9nxkmlw8tjkf94wub2mj6c4movgnxzcfmg1xcoxz7jts2e878bun1qkcicvotqtmu2lrg625zuad2xbai5xxpg4ddcczjds3zxjtko6atohlt1n3u47erlxbqz8ud9h0hqhw3nduf0gi6yk906efhltzih45tow0she05v22mdkwjlf4ycxi3srltg7cqs05n6',
                url: 'ovi9sxwpxq2pktf2zte5wkvcei3nd2gy2msect9bci0rael2u3jl373558f10l0lnw0pg01ple4t9w2x1m9lr7puqbhckd6d6hd4e3qvxwrhfnhahchjj35omd6svkaplu7fnyss6icn7g4xeiwwo16fwvfmfv6cg6figj0ni3c2xmltr0cul8dq9mutd9v8g5fioxyokpv8iws36ico59ft220p3nn0pk5xtyc0s3s323yayq0p38s9js0tqs7opytl5tln2s0yiej8vo2rghbl9opn1x0tuugrnj34l1bexphpxmkgq0qkihcsaoc1w4tbq57bx66y9bh1pf3n3pdlucsu60d68ub1ad43u8nfuh1syaeh7s1d912c0u3eocnrwl7uvmkfcw23axldntfhyr1jqat76rr0i42qw0kki8tg5q18y776xefonv5ladcjbw7gwa3vltpj2jfr8lhq7nsj51rlxai6juixvh4fqo0tz8z2di63z93vbuilbvk0u81ydc9h9al5gr800aq4z4vjvm30hwtvifwetfh22iykun489b5xdcitk8p2b4l5iemrgpplezuca2vtux3po5a763h0a9st6gzmsodn6vdxzy1hu8n7huoi9i9oxs0x8qn0tcz4j6i42uf8t8k4ugkefwqb2yybjnwrez4fsy17f5506mg8yhi3p7z6kcta4cfm7r88t39wufaig01rk8fwyr5f22tbtb7i28q9fjlv5o53vgi1cicbz06mst4mh83ltepn1fz4to7mfkrxvgb23lv49m0yzwsjfp50xu753dyafhcxamx2q5h8gr14etu2ify5yemldcyhhbjtlsdy25rgpsmexf9rjjhlod4nu4a04rihmu23u6qebdt3j84f6v6qhpewcngx2367c0c5psnk4q86ouby3gno3pja8gwje7vm4weuhsnnhswzh0n0x3ny61sz1tu583mo9s80n9wrecpij4gct0s15uy0pkuq1t6preynmzny',
                mime: 'wblxwvqcj7vw3e1kbmk8kaywo23361su1sl04fl0gqm8cuvz8x',
                extension: 'cujc2xuvgwphj22fxp6u4gfcy67uz1s5kix2cmu7limm8y1t8r',
                size: 7559421993,
                width: 841475,
                height: 770991,
                libraryId: '28d0aad9-0d12-44bd-9a76-7851101ddedf',
                libraryFilename: '2mamvxrn0mmqi0b2e6m341mv3l9i8vlnr8dsh0j0jxof6z8bmqd1tcel9vsph5o3wums4a6p2e91kgcb1nqasilj5mgi35hsugthcpgg53imjipf5mdcthqbi9ner5i218v65berx7hhxn5yl7ovrl9qpaf4whydn24f3xwoqs4aleqwb0009fg1xxm9io0poefg7bj467s5weaywjijabhwvc14jyoa00pjdejfcccq5020b7f04bzalctm3c9',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                attachableModel: '75cws7kxovcdhm49r9zd8jwamxc3am9c576bmsa5zh2l4bak2e83c6uddq5oc4plgl2b4k8tur8',
                attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                sort: 465649,
                alt: '77crxi7pnsihm1lv0ivrv2z740a5jcnj5jiot75avmb1m0114u8jcorwxevz8pxyhhhaj67svpht3zye7dhqaa73es07wn7nob1ij5wh9idh0uh1bn3nq2w9yv8jcpf0cifcn7u6hjyfokuj4u7luxww5r45lfqvvmkdpndvh70vk6c38cclprvnk9tube1i4uy9vwkljx8w6rzy1bvwjtte1qs3e2fcufirqs6uofct33184y7n2q2nrblbg6n',
                title: 'qg3vyrf47dzlqclf5g1l9wiyqm08ifwd6osylqhsp19oquv97n6x7wd9bzzgjb2h3w8nxg15f72u9rxt8o2rbw6foh7iw1ndwsr9ofou5bm6o9dmi6vnnri97kn6qgqscgapa81lje5finjst8znov7kb2zfkbvxjw4v48i1gepl1e6q182vt9t1cunugdybnaw8c1bmbtup48zma1c6sum41x9vn5mvh6ry1hy9mdfps8av352myzhlwzzqg91',
                description: 'Id accusamus voluptatibus debitis sed rerum explicabo dolor voluptas iure. Et dolorem autem rerum est quia pariatur aut. Qui consectetur omnis ullam veniam amet natus voluptas. Id sit totam quod quia ipsum et nulla deleniti rerum. Quam molestias non quo harum adipisci dolorem enim.',
                excerpt: 'Iste omnis enim facilis voluptas iste et et occaecati. Excepturi deleniti doloremque sint officia. Quas similique sint aspernatur perferendis tenetur iure ipsam odio commodi. Suscipit aut ipsa asperiores facere aut ea temporibus. Molestiae consequuntur minus ipsum aut. Ipsum impedit quae pariatur officiis nobis non.',
                name: 'h7groc2fktck2kch1hw4cvdfwscyi4gp461srftr5eujy4emwo0vmmhlleamc6595o3628ctio1x46t01gqxrpv1pzgz5bkz2hn7i3scypllre5e8ntk12kdkc1a3n8ohk4iiemf759eytnbpvuubu492bl8ih1sf8zes350y1id2zqqq5asbqzgx17lmgoij6ctq9f00auxxot6g0yrvmll78v9tv4bi377iqq6siad9zi7c64o3os3oqr829o',
                pathname: 'owwe22gj815n4y9rox6hrfega96wsbjw4kdx92hbi79sceed51dg1foy3t81xt5bnsddtqvs5lprdr0mlsqdo1avju1ekvn35t0br9n7tidwsjyv25ggmd2ot9ircvrucjywp9zca9lm9me4rksnc5uvfiwsky97hqrl566k68c8ub5jti94o2x1tjj52u724hspkskwpoykmriq4kdgel8zqg5wk4j84n6nk91lg6lsxtv0jg9xgaqryocig3vdowg67f0sgps3naenuearyap1su6xuywuqi58mzgnfzu91bnqpslcz5ug9bz47hrsgmim738x76g9kstmn6xwnhqtgwkrga0l59qreuw7jjvu0x2esm2aet099km7x4mzalzikzzdayot6m5j6j4zuyy86sb14pmkoz3n4ibt6196x7s67e35oqpow0ougip9pjbsx3r1enoek370gqbozicw1acwrgtprrlt57joudm5idimy779uqg8ichmqmzwm2cjukk00qp6tf0v3pm5ymbxo6u2nstcsma0520t2s6373cxeo81tu1rw93et3ok4y7hoc90srpy2y4dbdjgolhrppsyp4lgkf1uaopawawi4jd2tt0fdkp8nxjaweuz0wemeu6665iwuovjb6ui8dvvyli11dze4kpfnzncbo9k90wzpbo9y723uajjawv09u0rpu2u2r90j4fu9tgxaedpbmgow9fnfvuq0jrb30teo1bb5udmlo8g60saq0phm64j6l2x7ufh7wk8pansc20u2h545cgjmqboneqk5mvw28h6kd9auk9i5ki7mjy9mdlzur2xk4dh6u8znav2h1sxk6r55yqf28zecme1b1wakwog98ldiwxvv6snosj6nc73lp2ixz5s89j06q4bfbssl9mdmcg8vkzzgsxoqetlpfhbnnt1sbod3tvswcq0268v7ul6yeq9ca0304p4mgtydph66n9722fi6ldhxa59561yandfjrg354nr583n',
                filename: 'wstms1j886u36qp6d0yw6przxyk2hyys2tikjyv5mew03g0jua5ei4xm1kpph62n8iv01u5bibced5rdci4c5y6tif0s5mc6licvk9uvq8gq4xf8l5cxelxsjdrjeqgnpmuo637t2s53a5itpcyfvgan4gl24yv7mx0uoyvqp2s5ueimp8n4lc18ffh7p1jp8xw6yeefr1so3t2xwcwhl16lg3upziyi9e2oz73339pwbv908h91ey8eivdpt74',
                url: 'tmfn0iguvokip94vp66i7mkr3uj5lt5n34g2l3qs87wmghv2xzytbnmbrhax4is7u5ofnrns0jb92r073h25qngifx5jvcfhmg8g0ojvme796w4x862zimmekfgb8jpwtrnb51zpsmsm7su41jbfb3h253blpemfbjnu1mzj7cnb4qrh1simhsv4d5fkfck2s10lwxoqhw62wj0bm6jaimm58ci454pu0uctsftq4yyrxbaj1351az9p45lpnxhy8856cxct08frx838sp1fubbdfn4qumt0h5yrugy3hjo0rdg2zymssc4um7v3th3681hd6hfq88umdbxqnxvf3qt30w211thvpm8ea15r69vitkanv2chjnfx55galy01j4y8wsc7nl6bdsvufa0hd7qooza0dupe6h2v8n49v0wzq4wqpo0eb9ub8mnhyuukdssddqogkeprxegl276k90irmdljomblftdnj21vglwsixxk71mi1mt84qoh84iaab5z9ourj9rmry81g1mo1oik7coshgpfhy4moqsxaixk9p6hkhl98pv9daggkqnkc1886esj7d3a6n932yk0eetb1bsc3zfpnj9q5by6jt8avvmxs01xzv8i1iizjyha91rwknak8ccpljip1wphen72j47cjlzh4bzvzcf6vy9lfgki0kn1an5z4obazd9wrot8a4svsh7qa9c5l8hdqaicgzvxvyefygr6mbow5bfh45zokh7uvvyp1vgfa0f96i6st07oxr2b330fw2zk69i3otprou0na5dngp3sbxh8732f2h6870784nx2vfpoo0nxm9rm8or40k0uavsa7zu3bldfakvt6dxta8kcikvkoch5zvwkli3rp57x13srwvpwjbqfsststuptfexb7hktg21cy92xtgbo771x190o4g2ha04ynkxx181z8e6nbivzzmwz7m33l8fc5a9tmxgq7ztnqbwuvst061ygsngfmvknx76uqfs1jlb4485d',
                mime: 'kdwmtxnwhg4e61e1ecqpm6tcai8p0vfrepa2d1fyvlj8xz11we',
                extension: 'il0wiphemb3osv5ec3mtq333gwqdmr660bjobqwsnyhtg2ihbz',
                size: 4086262886,
                width: 491820,
                height: 305386,
                libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                libraryFilename: 'awne8qnjj89kmntuzqp3gsv1igko4nyswp71r1rhr7clkhinbmpmqxgiclxhotwzypawofzw4kpghrc45fj4m1f4cf6frxwk2rk1an4fr7b36yfdp6m6ct5vq0czbmefn52babeh8twh6maihufmpe4bdmfyum1t5pa92ksnpadz2ddtaz1cta7bzmp2q4922bzsyjzhewa0co4k3vbuvpn7uv6nlubbrn0xlczw2vuld56nyv9tyq5i6r57fs9',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '78af718a-e5fe-4915-9224-885d4f6d5eca'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/0283c8f5-3702-4a4e-8b17-bcc6c5372d82')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/78af718a-e5fe-4915-9224-885d4f6d5eca')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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

    test(`/GraphQL adminCreateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f382b25e-f284-4d93-ae97-d34b4bfdaafe',
                        commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                        langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                        attachableModel: 'x6u96lzs86smr0z12i5mg3fhcsawj5vz0imbxhush8nes1t5o3ysgn2b9f5954ckpg3ketarv26',
                        attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                        sort: 172521,
                        alt: 'p9ayas92etuvhy4a7wtry92sfwdzb57u73qha99ytp9pbju0okg6kcpnxwu9kokkm8hnjnglqiw78mknd1a49rdzmnpepk1pm69dbiekhhkxacz8o2x6or8gb045lno32wre626fatrnppuq3m7oldt0mwjbfndca5zh2am69g5y7ef95gs9htoc08tb3adlswxt1b8lltmla3qgbr4pku8gn3t2y2bblr1n4yw9ldkdzruxlndrpr7q1vj3dcc',
                        title: 'bhr7tmks2pj8u6m55ijfvj2mamvtdpps5pyznreuwai94hc6vfohet90r0a4yftk7gxubu8nhi0a8721sns39qxc80l2jollq2y3j87ksp0bmyuq8rp76emsq71zz60tu53bsn64u5htv4082fufotzmki0odwamukba92z7aws7kvsx6gekxr1tw9gfhme0kf26yjmaf7xac3d3jhguf7aqip6itf3hd60e3yv78q6t3yghr7k9r04pvg9u231',
                        description: 'Est aut ullam qui facere magnam itaque. Doloremque qui dolor sequi autem sit dicta odit dolor tempora. Vel facilis qui ut deleniti autem perferendis nihil. Unde commodi laudantium quo. Consectetur beatae nulla cum ea veniam ab qui magni illo. Vel aliquam aut quasi ut aut facilis quisquam accusamus.',
                        excerpt: 'Sunt est doloribus. Et consequuntur nobis nostrum rerum doloribus earum voluptatum ipsam doloremque. Ipsa consectetur qui omnis eius quae mollitia. Ut dolor odit porro.',
                        name: 'lp7d92jrzonnwb9jczyvh1bs5p1butrxgcsku69sw1emt2sjo7hx5x7oywfbmalvx5uy67e4fez081eu5pc1tyan59wnfegyq14aaiejeipqvmg464yr1k4qlc3tfzpmxn4i0nlirs6xvnhfmii0bivgzagkrvha4hs00m49w4ndzr9of27g1nsly063rhswue8x5thn80yxai131fjlvwls5mlych702gctldfr0ujl23ruvv4ynvdxxyq4etz',
                        pathname: '0vhdw8kjd7azkyisy4hul596twtj1jx0zqqoywnna2brqs7fsypq7bnka9lxwui473mfteivqqs31z8y8v4r6fncuos8cd9mrc13lv5a2umpzjpqinfepvvevskdkldwa5djl4hrrbq67e93fgt11himdk6mc2fyulok2jv5io062k3oex71f58ymmdw8z550royocmx6fdtyo8vwpv1hydgsvdpdw88kpbma01xntf0dp1zqec444l1awbqmthx2c6j0bjolzyswuqvrt0o009787a9810e2te1wgzbmjrrewoq5g8efhfzwbhqzwar2a7eqy4xgq84sxyzel4qd4nnhvmoosehsn25r8xolqhf311es7584av3tah8kjh71jivmy6kwa09c1ouomfsf32ovs8bm09deny5nukik0d7czde2k11z3r866asf37o4vsgjm3u7tjfajl9hoij8k8pblb8h3htw47herbf74a7o9c5ncr3l4bo663x1achwnfe5xnrr7wetrycoyk4fgy132d0gycy2oe8vw24nk8umz2xzdepyfs1wi7hwfmrzjut8wjktilqwkd2znwntjz4x73yk3g0fa187l2y6mrxojutrtus5ax2k0ufohkl9b22wx3ik0prrd7zb5l3ssg4s5zl5wz2hh0uevyrbhg5exy2sbo5aitsx2xwml619b3ozscajw4yi6fyg7lnp7pi4o0xwyizbk7qw5fnttc0dbspxmml54q2kjdhsjf40jsrnh1yliyei1ebwapf19rz94hcrs8a507rsty2ojvvzrityo08stko2l6c03n64ubnep5sbvj8elqhhtij2ur12fvanptj1lanyfx6abr3anh44ysfzcn99qvl1f8do2vjbfn4qh17iuc3252hereuwl5hgf79p711n1f4fxd9a00gtktmy340lj3xer0npuwp4d8toze7knzvgqrwau0gck7zsg28168anw6y1i7mt627tefvq5ppzg9bu1lk',
                        filename: 'sd79cqt4yo0dj01r0qosdwzbbc44i2z8cidi2p8gy9gakutft7i92oh8x1btf0bxaky38b64vl0zhyzv1hl13iieaf3cxfhm35xf7naensali00hxjyxa499ftg49y4ktze9s17d10fi82ar8lf3bo53mowlqnbt51x5eoimulbi3t1drxqb956mdhl24atnydm6p4j5r963ibpbx1kugffh9j44idqr7ssd8z42e7r2jy3eqzpjz4myf542pu0',
                        url: '4k34dteu2qt781chhglkrufy5rkola3b3qkcx05bql1knsavgbzm9pniu1yyuikmco4pxw9qejpotxkk8p8sv7oeodom7powphf7i44hm8ipm9mkxmbj5j1sl7rknfbn82eo85s4vrfn6wlow4nb97d0sakdagcrt4ekqoo5kg40tse35winucqt34xxxhsggauw66m7obezy2rnh9g2jqtsgoupnezzxzv65apcwru0gsv7xd2vlqp5corw9ae65ets1qrntg25ay0r4r2oyve5tkgh14rboxpf3rnc6juzo4awxh0hrxlbq9e40mak8wnttig664lqopn60l7tkyzttyjzr8ob0bhixxhj7pdnn94ldhvfjk7y5fapx66yruk6maebfuni17vkr0ap85694j0vp36nze2dt5o4uimslrm0a2j9avv0jc6w4xjhgiofw1woie0isdpuhd5itrh76wy4ddsq2ukswz54ew97nfdy41kx6q9g04zugv8q6gn9fk0h8uv5h7du8112lhdvk7b9pvl79wd2tdijfmcs3fqg344x97r1sgr14pqzym24kio0tk0rsrc98jkxsx8ccksq5sdz23n41sy5zp9j1gz2yccupgddtbvxc5xla7m0mwty10i2l7zjultpww74akgsi0daasaxo4kyxu3tqmkdx2bgn5atzl667c94063r6rskirvhr3gmahbkzk7g4ca03llwnb6dpvn1qiukn4e4h7aud3nrhi113bmwnggdt780i9ztr6y01ea88b7hwjnmgu7orc0n6s8u8h2d3hurvwz95jk5f9haveqgrqjl1be5cochmyz4g246cq3360qgb5jmrt0q94fb57rx5oyjwf74p3ehvdnuqanh2k8k1z5f5wfv6wji4syk9x7kx1l77nf9y0tzj18fxxwc8evpu833r90fx07vret5wryxif91iftq8k18ni02tm1cwmre8vmxep1c8aowgtknspgtgjzbqj3x4axfiv8v',
                        mime: 'y3s7daxnonpbfya7vegto3vaw30ps628r33qya0gxpc2vdrmat',
                        extension: 'kou3z5jmu3s7hz0veby4mvqo4ka5o0prqwgjv5kn4pwnte3gys',
                        size: 1864038456,
                        width: 267481,
                        height: 433900,
                        libraryFilename: 'w7qm7rskv5h7h2d6m5001iw50glhmzjldigympowom8i080z3fulueaj1d943xrbt17ei0wapklplq99m6p24w2aoufnf0f6ovvbekaq8hc8pls6x2e62rmvluwvqqcyntgf3asxpr35sk0nkohbjdc00cp7v5mynbrj96twvhawgovw2ujsoqlz1rkgoqhtuj0qstdctxof08k178ye6sj74f4dnreuyagns1llzvtd08aybwnj0yd0cj8znet',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', 'f382b25e-f284-4d93-ae97-d34b4bfdaafe');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: '85b82f48-16a3-4bd6-8dc3-3cece637d951'
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

    test(`/GraphQL adminFindAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: '78af718a-e5fe-4915-9224-885d4f6d5eca'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('78af718a-e5fe-4915-9224-885d4f6d5eca');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8f9f05e6-be21-4e19-b602-a80272aadbb4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '78af718a-e5fe-4915-9224-885d4f6d5eca'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('78af718a-e5fe-4915-9224-885d4f6d5eca');
            });
    });

    test(`/GraphQL adminGetAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'cb378843-de9e-4a42-8224-06e2c74ed80a',
                        commonId: '3cd63694-ac4b-4207-98ab-575ec8003ea8',
                        langId: 'c8d06ad4-4206-4f35-addd-6a130eb670f3',
                        attachableModel: '3kbwkmcc6b2pl1krzzi2zgglrorb30hcyc7swrt4fre81meusnnf38y2fwfbhsrqot2scdnnjgu',
                        attachableId: '2a780411-869f-48c3-a7fe-230c6712a848',
                        familyId: 'bfb004fd-e092-4ef1-9dd3-4c81d6021a41',
                        sort: 787547,
                        alt: 'u4uthitl027kumxjerstn442usju1aw73nkkifialhrmnqsbzg1kvepq5wq68v1acux98nm178f5wtn2in5cciekw1t69pat103yr71rz59c026mrlrzv5b56zvnmz3eu4fuey6c92exsqb46oo0jvkivom55l1mhjbzw2posj1u6hr7aqswa05h4ksd9exodw1khrulnvkgt0u8vo64btw72l9byw8f89wjk7q1n0fqn679h3m9k0eh9tr8cao',
                        title: 'xg74l5k49i16kigd59ea7ouazj0r1amm4hobheuzj8fdka3dhutto4jktpv6hyq1ua6j44bxl8gkcnwgi7o7di4j0l6ianz6d5hivyjlwye30j7pwrnf5fvn9gt2uwoy5bgojbk417p5kvnf4jp8x4sfgfpvbti11o7xgrgu6qaygilul1xo4u6kkty65hpr8s1x15yagll5dv3qsjcvr3120rzrd83393cjt9nhb0s4eo2cw4phurx3afpmdqh',
                        description: 'A fuga qui sed non eos consequuntur ut corporis. Soluta sit rerum voluptas animi aliquam cum. Qui consequatur et fugit cum.',
                        excerpt: 'Fugit dolor voluptatibus voluptas est qui aut vel modi. Et voluptatem assumenda dignissimos a facilis iure ratione voluptatibus quia. Optio perspiciatis debitis reiciendis ut saepe. Ut sunt aut laborum necessitatibus. Ratione distinctio qui officiis. Cum quia error veritatis ut reiciendis autem.',
                        name: 'a2hndqztfqhoboj1i44wx5y0dwt8bb6y4yf72ss2z9libz3e3nfq4gidpslv9a58t61c3aaafj423s2o5lqph0y9x7ihbwk9e2h2zcns1n3otvhf0sof37mszi1nvvyc2m9jn15i4scys8arwv3vuwnebkwfais7kbmvmcel8af0a7lw1pucdf4szdgxm5p0a5at1lhmwp5pmzkygo5o498pmnxpharcstz33dcbtsh1cwh4u1ntpe4l70cmajh',
                        pathname: 'ha1tepl1walmqq7p0djmjr8zi1g94bx646i93du935w6hvvdycp24w3sk09f0luufnq2y5bmsdx7657nqpyjv1phxjgr63ujl9qvy0axx8ad7el3ntzieh9v1aqqwj30riixvx6ts5y9o55e9bk4wf9wlwm307c569ci6g1cvkx7tk4xww04ob3psk3sgmo7il303eyrudgt48k76i1vd2rybab8gz83ofg80rndruvqb8van39bgqvmhhvhzl5ivb1upzpgj8mpvlb8w5xv1cg8qcp1e20tumjljneydiggc74c9hugiubzr4nhrcvv5504ofikmbun609s7gfn5fnzzpzx9xks0yygg6s6zlkfhst7e0nv3dal1661wumdypxbdnivgr6vodvbsoibf2c3dbip7w6hd4h1qrmikqsx7dvancxa1dnq0vpata06ojgfq5cke2kun22eoo94t4doez0jem46rggdf2x5dtyhm6y6l4i17lqb0lzj5dgudt3cdwiorf9g1td6wtpamvlyr0d6gpaabksxtw50x7dmw1uioe516w5cdi1vykbkx80eglx8zhzjuqv1s55txszgyvp8m0wuvujejbh8oz3s4haxtrf9iefp2yf88fkbxove9korm3d8colsfwhaiqijlkayt2cox51gi2626wwaoss7jlsz1xy1yaojhnfftptvfeli3u0hkrl40tw71wzfao0koqxw6itcc43aow220mvp38r4znnm55uhpj8ixebgli053z27kvy3go6x1tycroc08e73k228776yjtxnjkkata99wk9090mr5siuypmg31tazm7hs8087yopki2z4ulfu5ru9tgl1ci6h6ovpmvhaytjqhur4c16jk481ydjha4sfvy3ze13005rl2mnpf5aprp0ahkad1dt0tnoxlhs2v0uo526bnkrslkkstcw1fg48corugd00kob5p5a9rchcxupzmqj1uph5lm9t80fz2mc03xllug0fwod',
                        filename: 'bs0p1y30tm1lhnqyz7p56qtuc53yg8e2ph8vn40i6je65tky40jq3rol5ge9o521t9pf2y3ukr141mdw8hvqjab26s6yopk98bwmj6aqk27cepwjt3tvyiz1lqhiqr1e0djrr8crf79n0hqjufx4s4h7ftkxfaphhyd42l8w0vvi6tt1pcoxmirts39fphsj0fgeq54wgjagoktpzrxkiphgm3tvwuyoy2ipom46njedm95f00vz5g5bedyou3c',
                        url: 'xgwy393hz1e3t6k6ruah2etdb89jjn0fvzn9opzh7pm71jhlhjsddkzymrrf7xrn1iklsuy1g6byh5fptn41usp8d7abiddtw8ccirw0le15mi5usw06lqdkcsr8dlxse0e3m5aj013dlw3at18jrjb3w17fjlgyodx10zw5sgjhyb4at6mwvcu29k0te42qq9g70hampgogekygw62wbldb29er09x1cnex6vy8ck4dal1rvnejtuullgypbafrdbfbq410wdft7i3xdqcmshh4jim6wg2dbs9mhn74nr3xzzj67op9a0rfuabodpswtkqe6rvjnofutqzh0cwgtbvwyazyi6jeumzk6xzetncz52ubraeq4f0kuuigdo6pn8fkcioyh1g18hpsrkxdv0fan9yig1h87qmnb3liqisbagkd1cr33izsybrdpjulb7tweyjltso0vr64hrgn6i4lj7llmz98it4bck4151kk6vcm9hh5y6zdp1s1rud6vmj5rff4fo4fva7uy7554u825ii2fi7gj1d3ynu2k6klbxrr5avixbxeu9qi4e7ql73a3yl7n0syylnpyr2ud1flgckhuqy6gh53t6cjlipolefshkdbc65e02jh717ze5ncdqezt55ebwurgxghc3ev0smiwooxm9h7812g14no185gxoj95dglb6236xo9dj6nvgeytiun988fmw1xn62m2g92of37k5a5h4l6bwax7yd69wyn4p3sjyvci4zqg0zwzy93984e36mnfe84np19xz2yxc5924ufu4c6jnos92ol1bbnl37qzflzsfh2124n34xhky9ybek8tvxzppsmnygxmbmu87ei20j3nedxsdw5v1q2v3yig8zgkg11gtubbatzx8dc919ua24h1oqcbqjkfk5noreu1azo68d0pod68o8o30n8jx3c4040i9hmt2an1kar379gcab6ons4hzrj200gt2pe02wcpc7wgs7zlcq5npngmdcvy56d',
                        mime: '6qmj1z477hqlnogazp5cxb2u21tmu19ak0xkwe93rrlgfanc4t',
                        extension: 'wrehaqq03ulm476pm1v6fdgbd9awjbo26ys4fijw27sae8pof3',
                        size: 9954475821,
                        width: 137098,
                        height: 166172,
                        libraryId: '6a6f9204-6360-4c36-ab82-8d64060641f1',
                        libraryFilename: '7bmr4mc2itzzhk02rh3bn78623fi4ifmqyl9ze78cdyn800tpdtkaeib55he0mj3s4rnylov0ev09wa7gepcrvzc4r1mznfsof6jfjqpw0ei490ngx0cofr2qvxmgcwg138qt6ocf08gtm45tfamzbzdc0fxp5qhwdoilmu1mc8ikviadx01v7bmvtufnw1bse3n4a2r7hvcn8jioyfwh7asbueop4ty91hqphmb6wksj07fqr2u7n7n609ynwe',
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

    test(`/GraphQL adminUpdateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '78af718a-e5fe-4915-9224-885d4f6d5eca',
                        commonId: 'd9dd3add-d670-4f69-8b40-14bb4591ff1b',
                        langId: 'd9f854f1-38f9-4954-aa9e-e23574692620',
                        attachableModel: '8mxffemsitzye64u7srq66aesp0d17fwyymn6ojasia97fbab7247o8jo566pt1d13xx2y0c3zi',
                        attachableId: '709e8879-b295-4efd-9f42-bb3aa7a6c108',
                        familyId: '81a5f86b-e3be-4f9a-8a9d-c238ddd58573',
                        sort: 958962,
                        alt: 'yvfp7uks5ws8xu701n4v4z797h94dplksuj3rpciayzg43rq1c8fej2w249ll9qaxyzvzr0rtx5syruxuwj49kz6y2w0e4l2iz7pbr0l2szdb1rcx4ar2ov5544vif6rz4g1pb8u3n55itjg42g83tpm95u5jfkxpp57q9cs8t4dc0uslbdb9i5yysrc0dpv87czgl2w0c6bixusap24y86qvzogajatumcmm868vbc8t8fmtymrpgw1r4x1sao',
                        title: '1kn8jt5rv0d1ucxgh1i8y9c5wtkbt41ij0oco35uvenaec1qvm4rx3d0gaiuzsyqb3lcge6z5e1dj6ifbam0579rttaqzd4kfc0a0n3pxbv9xm5f14ystco6xfwdvcm1c7nepbx2fm9nn7ngzfgdtegsb4yxgq6h2733quw9kueosp9e56gvw4dhdh8fyx6ov02h8e35b4yhzz9u51p2x5l61cefqn1cg242pxhigt5ji4p7uarag15pyscoiuh',
                        description: 'Beatae id ut debitis consequatur qui. Qui aut quidem omnis accusamus sunt mollitia et provident. Placeat magni quis. Vitae veritatis ea molestias ipsa dicta facere.',
                        excerpt: 'Sit quo inventore voluptas est eum. Reprehenderit itaque perspiciatis quidem eaque. Consequatur totam saepe et suscipit. Quo blanditiis cumque qui aut et id quis sunt.',
                        name: 'xqu84rqljydm8htsqgv0qworchu1b7rx3rrdwbcvwiq1722x0b69einfa7q2ubx61fpye4xh9v02tgijk9xaj209b751wr9hkadvrj7ubls1rg5lkm9s8ceodt6vu1dzs0nt84ioi50plh1k0yox27kt6o535c0gsdn0j0kfdzl9xcnhisle819sf2onu4j1ea65glrbzm6tkyp59ljqqje8fghbc8w8zov5gnqvu9dt50vc8xltxqxsaiiuw1m',
                        pathname: 'itc8sx7scaa6dub1sjs7k007wkl7fqp8z709x3i4vpi7ttjo1xdq3apb8i7hyq3tutji5k4dl3memyoj8uwqpy10bhys7qyyydadhgyd2yodsvg8n0g9341yn8h0m6f4mkf37f9fyv0b3c9p9j2wbnsazpk1c0yhlliifo5mu5g9uo9otw4sayvh79lk4e5wiqktcckuaoxem68lcp2vvidzgaalvci9uveadw8cemovfl12k1nrrct01tghsyq2dxwsdci5x0rjlxc103lbm6t8qucwxc48zua7x5967w452nsm0nczkeox98h6icwhmf961c1cyi28oyd9qcvqrg08txafbwy3pbdt0fgnnq89v1uxgs8u74xgdjszp6nsbq9wfufch2fdhiqhj8ab3ud93wh34ehdxhfargjdacicbkyu5i0si7ehv3vipru8pjdekw1w7nky83y0i0ydcpwtqad6fqorkxlohjepq5haehn4io0dgzdv7nsa8gndr5pwgqiws23qobuczwiwnngk1ia9o6d19dbcmx6sptzze43hyf7lovpqv03hqtp0s7xvznu9rc0teintkcq17jwxva32wjvtzjiqwuo1qfex341joqbugx5p0ga53800wzviyqi0i000ctjsgmr93ps6s2639o2goo15gtj7yczig2ls9nlitwykprdxdbzazsoj2xcqre1hjh9n7aj7qbccsvvgtvxwccbjtaaggi0cvj0ktz5aynkchc565c7702bb9x4btuhy0zkgiw3cty0pwjgrt2kerhfyhjujzevx7yz3wctl73tr2rau2zwq4wjkk7s4l0le0uh9a691bew7rh3am4v9iy37ec3eez6k4fycf0qk41ngxzfscpjki6he3yqrg0p0wy7ztt786jisu1l9vb2nl7twtbuw31ezju8ov8124cxtfwz3gjc78dmv6ijfuarl3ugcot3asyxz66xo918ha5h2i1equwszfvcksll1f33r3p9ayvpf',
                        filename: '85ae061i121a5blw5d38txr8zst3r6wla07gsqxdojrgy8aaowegckvj4h9zz1j2bwyyr2631o9wrsc5mq4izzn3hc7rsjvrt25kd1jr1z3cndpfbbh0dxc3fkl1qhrfmyudjii3wmkcaetrgze5b9gu2nrire4ckq3ogotmbvwig9c7m3hb34l7wipc29k6e1ec1wpzse1agrk50st6o9d7xh4he89h5d1o5tklx3ujher3ryh3280zgarun5i',
                        url: 'zfhulhzm6r6v0zouqx7q06thvihmp19u7d2z427mwrffd1kvgydjz28ilao5w3zjzjzr5e0a1rxlleptp6kfkknf1wdjt1fb1ozaa6ru768x7tz1a9evtqra644hzn7jyvnx2k0w8n21jsdd9x1g2372e1eahw1szl7hy7062huym00hri1gh6yp5lxl18e6ztuq4l0wkkg8jc1r2491xfur60nk1gjp21kzuvwiejg6lv33mrym0c2yumcnpnlexxt86p32adb09h1c3jhugi6o2dy75eex8q0djlsmcv58yiep8lijszdpxm7bhobfjzyvjn65dzw6t43dk6727cd27fz0259uoht1932kxpj67v66eomsn0bq302qwn66enzer3b5sjqc19baxgp5df27b7lrvv7ln8a4eoodxtbfxc7mh62gr192k570m2par1d42a5kbmd71rtozkyizoghikmcya8y1euldu3z13igaxjj9w5cpvk514p5pgehok7p7uk0rvv8i0emjz0ohjdt4o3b505qw7pqyvbazvv24728vc9w6d6p7uznt79lf4e56ejn12pmjr0l3jcs1bjnbpt88ddjiqzzh9mlk9azl2j7pu65j46xf5d6wgggjnn7j9tz7kzy2wvt610yd9gaj7nwt602ecvxi5bp8qm9xdhlhpbd0snub3dt1gcnlq6ncgpabd9rla4fs9len78g2qn5dz5q8k2kf4nuyp8lsgc8s3hf5tvzw70qi8wdvs6oun5bx3nh0x8fmr36ullmdotfk16mjovw1s2gky2l2875jmjs9ku5wd0wanlrb45bpskm6jslnfd5ot4forc9hw36qvs6f7944whowbcoy09p2ofl9b54znjpd5kn0tz88752145dc6s5badx0ywmp5f0xc5phxi9vucgdirqfv0uprxhnx7gzj8pzqg9339a4d3l0e16hjc9r077aw1cs5enbc0ureriwjphj0vj8rq10fxwc16c6y4docl7',
                        mime: '8bvnslidmd9rtotw9d08kcx4s2qhpg2gy2mqy1qjog2xv8vru4',
                        extension: 'pxefdt9pz3y3k4kt462dz7jzm6o71m0yv7om2om13upv3txwxb',
                        size: 9512605157,
                        width: 320357,
                        height: 990995,
                        libraryId: '395aba86-a777-4493-876a-8f7a8679e011',
                        libraryFilename: 'd8meou05bvy29np1erewil33n55qgsjg1s4a6xvyeryhx5auxwgwu8i29hvhmd0n85ngcsjck1ae5o3jiloq4r1getyhefnyw99rpfexkkd7yg6e8e4pujtl12fkom6r0sh9krrqm1lo9m1nsml31gihbgoa3mrv47ew1tw6ga2ee5wxucfay67sfcrx1l62ci5qwb28enha08tz7b6gxxkjj9jkyros3rg6oy8o37k2xnjwa006jxzvejarvs1',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('78af718a-e5fe-4915-9224-885d4f6d5eca');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9cff219a-b9d9-44e8-b47b-515993ad29a6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '78af718a-e5fe-4915-9224-885d4f6d5eca'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('78af718a-e5fe-4915-9224-885d4f6d5eca');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});