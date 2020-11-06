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
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'x9ukd1s26z84t27n9rv6y0y97q675u5l1xev77c7li76qnozbtp65l3hqri4ihlaeypoizx8e3lwsudax4nzl8ny8rmmhz54syloqtuynsbz7116e9xzivz0qcr40dctbdrgwp5vjsfmyk3dp1gvzocf2v2q44ll42k5blj1ohqfpcuyvbs46djq71zr0o4r2kp8w2jhi9lli1eqi0rvyzhzhe186rwg1kcbbub6gur3u3xlp8c00tpq3ok7we3',
                surname: 'g0pphpug6jh528nj35fmmpslkgkwi4nntlvwy49m8nfh05fmd53fkyfr77i294h30nc8mxblq20twc3knml99bcbm0oqvy32l1qj6fayau2zcg8gg37c5btk7rddarcp6kddac8nqgr3ed9bghqa4wmqjd6fe0g93vwmib2xy9qvvgoauiwsltqtd90e9gspg3aeqq48qogu22ww3o23hzzklet76tjvn2uxhbxh4hdf276k49zyv6c1n6pmxt8',
                avatar: 'wyksjmi2jag6opz4ljybx1e5p25z92kh8eb2ofe3ghing417b5hd2l2b39fp3nbyhitp46lzdh89e5l076d06beqhtwuafoyt1lutuptp789n6poa43dox8k6p15xpuw33crbqm1uqdposr6lsqe21xlc1xm85ojtae7dylsxpe7j823ltm5bocmw4qbu4iyzy3xu1n90giuaqan8lfxkxgvsj3adi0gk9v2yqo1zh55l2f5pui8d0m6ack5rtf',
                mobile: 'ugvxhjsrseil194icyj6ewyzk7cj2soihy7vaxy0bom8e37j64w31ee1hkpc',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: '52o2kljeqavywk5pyhzshz1l1oteyns0zfvhbnz6k5f0fnw9wmhd2w2rrelza6iixj5co1804uwcypgmry8tqn0qvswu04lap7l1rtr6l0u9nw8l8igcnox9',
                password: 'o2yj308t1c519peugyvbp1zmkfa9wpqtfyx4bm0b32ogu7ge9j9muqmcyxeqd3nvcwi7f49cpwb6wyu0ou96146a02j6kli86sy5ie27v5dtojydr7rk52pm6orp5dfwym4fpywk6l1laertxprk8ovevs3j4xwms5gx3cqjexjr3o4fd9nlheb62syqd5vxccq660nv0xencgbqpd6otvdsyke986mvxf5g2y7a4ckxy9jgog3dhf38c96d16o',
                rememberToken: 'zgfg72f4f5cdeqja51x8p7wpu99u6b44o65xi7nefr3t1yfimd70ryz6if1j3tnraefk83w53c9piqnp0efe6ff11lgqenta5xvsy8e3qe8szo90gb1wgpjtt8o1mk3p2qtnf3jf0e32weggq8luzqyznpuqezruuf51haxl3bebsl62jiphina1cc6yklxg3tex62kx4j8eanq178atwfjbzl7q0brl8d1xuj81lju2cj6qyq09udnb7238qkv',
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
                
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'k1mb1gi75f429yjuwzj74e88zw4jv7ug4htul3azt3dnzl5aebt71emyun1orfzjembp4sdrk3yodd08v5zgh1747w9bsazroe899rnfdjrts6tw28i4kkinvzhsqy3p1bvdrgb2zqmvsmpe8or421mxfi51lhrh0sdlzyyt1bxp0ao9efnxchfpn0qy1gi286j41u6s0tx6rn1pmlh8ykxb9mn66yy63h8rp36n95vr0bhe87ts4bs4jqmhf3h',
                surname: 'og2m4q7p6gjz77j94j4l1iqxe83zayxvt8cn8aj1888t08l3l8d2hz8i7670typd7slnakq5ba73s2w1ceu53gtxzh8ydugygxvilt7xounzw6s06l8r6qi0v1lcsshy6esjba1n2chn7mngf6dr3akyrurpdzkpvsm1fdm1b1gmsl169qytkrmhwog1icyuhyd06ayvs3s4sjkoehj23e55chqq3uv0qh74g9p4psg4rnp5pupn3lsh75vhi2o',
                avatar: 'tgabfmkh79awg99d51piwibq3qxrm0hfq8ke2o7lkhecxa4sc8ren6lx2oqz42uv9b7rmbtw4bnsw6glm36197h0pp9ml7bfpisjzwemkv2hq20nq94a4yyur30b0l1k6xtrzwz654389snkv6ko8t43rlvk1iugqp63gmo81eihwu83m0ybt2jkkxy9xecnyttji0jy4e7d1fb56a8iicin0qe4u6doxyscuxft701e22rjemfz7fh1ss4c7af',
                mobile: 'snc86ismqxbrtz48r7daf1la6pou3l7raxjk9b5edcjoydgf16xffcl9h2ol',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: '459j5ftb6fttj6wgsbif6qrp73tzmgljkv9rqgmauk5348mlxodrjgfusryc7c98vzkv0dl75eu7sctuem57jpsohstkrdaz5nvgzj98nt625hah45xv5id1',
                password: 'dnv8gt2uhcl1aft0bb3vi06s5j2kqayq9rm8p77nv4lhwgbfe178n5djvxmp2ju37aydinrzp9mgg37ge1787074i3iqa06bbw3n5y8knfkenqhx05vk98988a7t88ch1eoxrw44tgjbqnydui71jmnoiqrwzy5vpqkkyk6yzqun9z6syten7moweyrgowzpj95m5ay5q6lzkfukxcsbulsjclsc15c3huzxc7f487hdjpw2l4kj5hdb3bolcsp',
                rememberToken: 'jvfvvv386e434t86s5r513x05bsz9pjt67pz4lso1fcd2qcdzt4wkz4d7nn1ef83bz2qr5ajg9j4lotsll5vsolcxogtlreh8em2wjjc0hweffrh36b4khfc8ifj60n2kc279e8ordqusfb4vastp1g3cw0s37637z7nifm0k51jsttkhzwnlm5rluqv422l27ntvpuu3m515c3o3vj1ac9rueilmzzbbxif536gjrvtl337ucwkkwet9fmbbmx',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: null,
                name: 'edv9vdj6256to6b4bfy861rr8re9v81emxbqhevn7oyyvotnirm96bh1s0auny1bd7qrc4v8979hbfpbjsn07wg5a0i2hir8pwllvh4c8cvc6acql3kr5b7fcx9p1urd56i64ksd2qeu5eomsr62ktrcv6r4xy5mue8u6r17cyk1ivmzpkwt712zzajsj1qxf0j7za5u7c32xtj3yikksn9xuvszfq53yzu8byrm2kvsesidyrx2fakdfg2mvuk',
                surname: 'pvbt0m82xxoggflppo80qmrn6fhsxhfn7nnqzp4o8hgjgf7yl9p57ok7x14144uqe4ds6xn4ekkqrr4fdt0lkbmvfpwqwpv0lz1znsmz0ikjp8gukrj7rz92vljj26fbawv2agb3dwac1g39c7c6f5qy6tsimx87pltzwmi7w9xfnec37qpeujfgd010550z5ondd4cdrs3qkrdri6h7zfpx2oy5sbisrkgr8ljgleo72g4hwih1tlhhazme17h',
                avatar: 'f4pzepiv2s337u2l7yjmwfwgexf77jhiosb2ookav6hd4thh5bnydnfvvcfvlzz039lur287q7oklchymz0ke9wz9skxdx5hedenxwu03i0snfky81g5u56yizc33pk7itkovss9q6k2979nbs06zi8gr10x0ykcslct0nyzeb0fw79g2p577nafxhhza3gbzityohdkgeao1jmgggld9kkb763u4fkqo3913bnuawzci0ss4rkr245k8dk2sbk',
                mobile: '5pec4skg0svjgpzcqu596wq7ol5amdqms3l7i9ks832afh38ln752221jicn',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'efegtu2846lk2xdn78b13kyl2jcc7kzm05lki5ntpms5ghux65zop9yvn4kwgy0m5cnjz0agmokdkyusatf3nwy3d5ggtmszvqxhg5p31kgq0e8awtyxxa6v',
                password: 'nnyfrvlixji7xwio5ofv10ug46sfnrxmtzwxgsyaan6fvxyk9coculvjmkspmm98czjq5oq99x5dvi9t6at2iqxi8us2vpaalt2wu6g0bsfjnzv5aa237xkgiastowv0azndjleaj0g3zhtm0cp188zolw5dz2vforf9o06pi8quktr8hk7obewknyn9w7y9ps1qgl63z94bvkhenkhwg1dsotei7j8qse0qafpx9av7yp3qtqtiqcm2kg5evh0',
                rememberToken: 'oa4zb3lq0awgd2j65p18snxszicnsh6aglol9wy2yyzi4ct3na9deqmjddz5e1x73ktwmkgfkyeqfvn77pveizia0rav74tz8kw6vrbprgbynspjl3dkzdio5jxkgfnx89wm6wx0axu6ff4yhanuylbvc10smh83t1bs3e46yesr5xcc36av7fe2zvs32s961rverpsrr37upcuu3a57hn4txrd2q5nhrxhk9t54e4g3pw4fpmonz4j2y3ewm20',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                
                name: '1msztg9awxqtfkv5bdnx1c8ipozbp3eqb0z7bbm2dvp223v7pxaul3v4fp1gqcru2ehioa2pcgduf3vj27vpi23jfkqacln7ew4xwv0we4qzxzbpb3h7u59o9qlndph4rlal2ax6452vw5a9mwf5ujsadospnw1nesioqst41gwg3ntby3bspldybpc6uklc678qiy8vowu9vhlo8563gy8yvw7urikhpt53rqrc3w9vwsd0ts0n122pu6b20rl',
                surname: '6o1unb97d8w8tei8mbf80ju77dfwssfg8trzxnv69b33qz0v27am5kqr18t08c7cfwdiy9vg5teithf8zruevi63bxj99d89nxj46n2gler1xpr4ot6029zzd8wydyvsi278y1nkjz8qns0mvj0pft8fqkz2w2v3uhm0has5suukene3kuc18mw29aq968g27hgj0vhpe2357we0ufo2nj8odbnxwnjx07h3q8wcjiixghhrxbojgln3cizeffl',
                avatar: 'an4wyfe1jcvfeij86eq6p649k7emwhi7l7epzr8blt7vbzgf1lylxid4qaavzax6g6357tlzkkye6vy1y7gz87eranxwtcaueyvawbtg3m3ecw386cr1ec6h1h72uge0dvy0w79234gak5256byxqum62xrw4dz4cq5uxp8ue552re6ttkd6cq533dqh31b2xbklc1ssw7ytt3rh7gdohgvrqfnd4qmqz8f9a4tngiztkc29f03k03dscfxq1gi',
                mobile: 'tyb4xktzbb08gyuy6h4hfriesw6s9vx627a2spu7cp2qzmiq4hckh7vq6xqz',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'v0l3v6126pv2f99dsqqrle7tcre0453s1dwgky1u1iv43qz9w6hhtcr4fdvd66k1or5hrv1xfft90hb6tv3twr0ah2cphid87z7taeevn5kwf30srsiktj9d',
                password: 'os32d1qkk01ok5k8teku7ln8tdm2xz2cwrqcaqs497v2m59vbwah24e62ws83run3e7sc4pu2hcv0jdbifdpiswdiu0hxrtd5mu7zlzbj0fyqwtx3dhjrgr3egzdbb4hmwn1owzp7t74gab91pstadehz35z1w77fxo1m1ihrf5c7m7tuueq8ippsap9mt1v9pyy4uzqvvqkjajiworfchfbad49r1dxfgxw7q4hpuo6i4m3jdaqzzesd9ryt7s',
                rememberToken: 'zu9zjxtfl9sfbspklbidawbj2k7dlr368daaf2s8mc950a33bu0p2y13d9bahtdhna9xn1ofkjld8tigbvihhlgtzuozdswx5y2kgybcp2a1frdz4ri0jpmxanqo1e9r8pwcphvfbhlvvs9r14b0jps678ru69pxn5qvb3n3qrifr1zib2onssnuqwmc9c37tlh6we6glu7m5rhcnnyt5nquxcdn7sg23w7cc4qxv78su420j2j334i2wyyo50r',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: null,
                surname: 'a2bdb32nkbfp7muw42k0vtokykqbjtkkreuxgn7p46do8djyd9yuh0qom64blp72cm58opbmszfafp7h4idkjkkgv9d9dply1hii6jdlnfwhr5z92zd8iijmnpl2k3o8setvytbz8rlrigtqwwqsge88vlzx02uf0487mubaadaebg0ay6f8elkhgiss2qwbjeaa1zs2nba9wapzc757fvacqi8h3ii0s2ymj3g37ktfl65p6t90h922se0atil',
                avatar: '66k8fyesi6j4mjlqlgvple28asqkdouwpjaykof3y2cioh03ysslah4cxdkvcvufluwdw9v4pyuowi8k0ln2n8tevooj5aai6v7ke9ozxdgxk089enrb5sfc9at01fawxk230rritivaim6e106dwdrzjudjku14e0symqmb4kjpmovjcvbq6a0ym61vbpv8o5nhoxtz0xt7r6efwhln5t2sfklhghk2ihvqfyv5xn3fkk4hc4p5e57jvfpdvux',
                mobile: 'e76ramacbt9ygr75zhkivroyd90kkoz55yyu8qhkh9ngs6i7nsiul5mawrkj',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'lh4crb5yd20tf434fast89pybvwmn3300oz8o4t5gssuo7ngixo56jgx6nfvyfhkl8e2lakzy69occ3hbh31la0ed88l1lz3jupwhjjgqhiwjw744wf9mcrw',
                password: 'ez2e1ruse9j7z8axv0f8v1owd3juvb0f3pk0zg8kwzo9ah5xe1v9h3qono6khdwwz13cyf1vez553i7gh7nv70xxy2vym9ndjv3hh9tclwqsuj78z13i4rrkjgerlmj2x4cf3mvd297jyrbd6vl48bul6ptqeilftif3rc44jgr6hn79rryytdqafrx6gf6z89ksacr1fkjug1h479w3n03r1prwebc8s6fs5197b36iasaqkaj8ny3ntlxlfzu',
                rememberToken: 'qw318ipmjbakt3mdwxj9ttuoqhqzd1q4jh1v4023mpl8eedmxqc90soogjom1d5q3llm4o65rapwh2wzcy27xvn3k675bb1z65gh8u0c52hzeqqr3rohk32hqpkvcsu8pllfofk429a33uac3od1l2qu2c0ltb9nq2dawae8boa8ln7hxo7hvez0aq8vj03hk6qpzvmlm0crhb0k0t41fenqe8ykcfaoxb3vl6pjt8fp46w631rs34gicmnsexa',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                
                surname: 'zwqapw66n09euypioqcjgmyoii5mzooj1gzuute23y28xwxgl5c5gxi5wejksgab3l4knv14f1cwhejyta74kauc7osh8lqbw6cts3scv57f7or6sthjjza5cp1umws3hm8ovrohih3dvi12ohzuqcr7sia3ie2a4cdf8bz268y7k36tor7lwrmpj3w5q1odrm4lpa7f6h3r61nqthy3vtx654y6os236vbhl6x6n4psi5724toqvzm48i271f1',
                avatar: '6rccg5f1l71hbpz4uryjo15yj056c914ukpikjrufu36zddcqlp38l5cq79buc85q4bxmk9pqkym5yzyvo6fqhkh7ak55hx9ti79fw22h8p9jvxexs0v8trmw9l3nw93gxxpstpec8ks29fea9avp1dk7xfxmv7yq51h5xqtx9ha9nd3pjppd60czie94hntfrdiagsy7ebrkjfdrmjtf1m5i5mdn00tz13ksj82mfr282g0o408q5c6elq81j4',
                mobile: 'p3m6sgkpk6vzmazo9l8ucgg7cxrusnivxrg4nz61bkfi616sgb88xv3e8pu4',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'al8n50w519qoo31p2nvfyiwnkj3zj1py6w38ndvs01zuk2cp9p3y71q4g5f4rtkfug4q2aei38uc7frv5jeuae9zqkj3uwwhhoks75jqwwaykbwi2m5qlu0q',
                password: '1n3nry6w65phcjc8vw897vo6bkjxf23tyms1dkn0ejlqtcwtcpvkn8nxnll6gej6ocv8xsx41ci86jsl6iokq8dgbu0yl1ko3hqacdidu5p652w1muf51r00u5ml9vrysx0moz0xv2az0eacozde2vz0fsjm0gbahclhdoymqjfgys6uvx4ejqvavfhnedkkzxzt8nriswht404c3sri55l29jv1hoqfrbxtwqcwn82lxk84cd6pbnvqkcxk031',
                rememberToken: 'c0505okhexcb9edgcvsjzgty7o7xapmz4pl5sdreudb6no2wlfiubrkdb354w7zre175tluayg02gfgediwe8vllqkw9232rkt7u3pp33fjoksklwmz5eo9y02mp3e1a6nrjoyjtt8ah37jndnoemmcpfdg5hpl8s0kem8urzdsh3ep0w47m2tsi98ngyhsqxmy6eflh47n0hlanvj3ekokuof8ac21c3hwj2u88agrpoq3dfkjplzdr5cjbizf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: '6cchpqsnisusg7vjzyxdh7iho2rrtxbebhnelapvtuowx86qkqynu5kmzx4f1xcr30tyekv48xshpjgwukcegv0ate2397qezvg88bkj5ujuo582ft05rtz9a4bbxl1mdevton18bizmzr182kfxjgi1u0vb65j5w9mjgq2s6hr2hodc0zwfh9jddtsbd63p519kbt1s1g6kxssnbbwrqv5tvscoseiaqdcqhd9wxzf1jlr2hfjw7z67ham92a2',
                surname: '1bfvdxqpsyr34i6gmmi3dribdhk7bd7u0pyvlf9hwp3f8dzlxsuyc9n44ape6530ndmop2kjeky743cll8v5plc1t81zar6257mr3utndqidi2suxvnls441r3edqmpezo9y5eg8xruxmywuv2wbpyvebjxufke61lz8whm4lt6zzvtbncwwqs3zxtsbo6njz3tqh7ue87ctrkarovhbylul3dhi85wh4m5lli43lu8vl5sk5e15qpsr6uk6k1h',
                avatar: 'rc0ikj5flac7kf20l4pkh5kiaxi6b410keyq5m9z7ux94mz77s06qgkauqcascvokhl6qmz23g528yl8z3h6wrg1n63fqcndxcww0etfmd5cqrslnzq3ryf4u5qjvwet018ygfqeir2hqsu530c6aaftcserofdh1nip5q6mexrv7e1voemfjdvwwjwyf6e6uqtyspbu8z0q6cin8rmg2rizwlxs0mkcl1jy1462aua9sdjt1yzsvtj30hlw54d',
                mobile: '16ukvz2c4m8glqjaa8u0ags4dwz98ak6385g6uqsksz4gdtjlfypom3avrjv',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: null,
                password: '0k4ihc4x1qnw5ijcuwv4uvvx1uw65wyezp2n2srqtcx7heas9sp7e0m6fio67id5so9vs01xchr8d62qcbiqt27d8tb3yi908d7nk4jslxtdkidjawe5eqtrcnmpipbse1ytq8ssth98fzssfdgqdru7pgpj83hhxsedpql3q370je3cz9qfinae1pxh2m6tht8m6msasz7rar64kig26x6txvt9pyugazu9halbsd23ckgbk5mag8my0fpdfv0',
                rememberToken: '54j3xrh44acmk53bn69o6qdogggvpe3jqdc4pwue8bsj6lqc4ywqngxnnwdj2msylcp2ucafnqd1oufzbeuam2zahs3f4f30uogwa9q81yiryse720otolox63f3bvtxnmdvjsy6wtwlukljjwv706eutlgt0bnhyx89hxbv9brhdlvfvk1b40i9fnpgol01mhqji9j83rcswdeu6puste32nt2i6cb0x1gjypdatd8y5ixlvstv55k82v98xzc',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'd9ejzmig66mtzq1j93a7vuqky8culwmb674tq1723rcrg9wgeftpqmnd3gd03lkygofdd4oodwjz4ygdpgrkousp3vdevyhlahk06akmdatrbb18khwxampxtrulsgcnvukd56wn28jib0v32www4z0tfltxrnbvjijef2rnnv94cws726xzdqq2bkci245zwfwrc61mclbk0w61vu5hzh920qugys4e636cq19czoc4ahwd2um8bm4stt6q3ox',
                surname: 'fh78v7zg771ng405bh5153i12sythoiq2srn5klau0060z79lsovrutb7xbrlbl5bpg6wtoglpbqqibg6xtupr1nty6772wsv9v19y957kgexg1zrtt1ai2eyi63uogq3rtxn8uv99xjysf00u7wd3wvmnk5ehqgkrczqw5tgjy7i4o4vvbr9p5kw1cgf3b5m1yuvhg810dnzd7xxtkzw2lbnhnhoqkecstjc9l4ti3b5efoxnnblo3qxybdsme',
                avatar: '8uel89qe9a49pazdcyat785036jz9t7jhstyjvv0yb44on12oz6im32joxvp0ls6fdawz6gj0fa5pbve1jn6c0gytfsrl2cl14lozgcydv7c99pq7s8hmxxcnod3i7mdvsej77qh3tk7doeca7ys3k58gqrtzvfjigda0bdgyu0yiyhf9gwq485v6d2rw2e00azl1hsjwdcu9djp56sj2coo6nlguvvnhrordrit36bfv39emlan94rktoqu4ox',
                mobile: 'ad8ak0eveqlk4529aet8i5zr66k0m544p7xmnaedetkcdd2sa8iaj7w3w5k1',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                
                password: 'onengnnavu4pubvabexxwmp98gvihovs1hbsnvm4r4fm9s03aqvxm9p1k95fnf5x2hlh5ibhc4997zdeqh2llvk851s25tnzeqzgc5ca1enyjkxsoi1gz92uaxbijpbkc9iiy5oaebss99fjcbgga6rxckf6c79nsp76eonyoye5sy20mw0k1px5jalh9l931qbmqpx4p9lc323ueszn8pe3abt56ra1f2y6e4jakqa1viqrgrvlyqnlh17fq5c',
                rememberToken: 'nxs428whrh0nbbtjeewqpidfros14vx8rbgiw66nyfp3givgetyzgvut2jx692wyfnaup92mormkdvmqqyz8jh9s5gkzady0wkeqv8rma100ppu0y29vm6tompe2crvx6v92evmqfh5dxn3loh9jn70brio3jdt642srtpbce7c9kd31bjnptoaulq9svbzelmibq1t0ft9vjcu8l0xokaw41v5z0em8ws23054unfwu00gqj1ipt1rzd9in624',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'obn3gfdu255mf4hbmwtbzkwpz8ctz6zohk3e35l1cwulqpmbhdm33f1cst2jyekycgelgs5en2kn6zqm8004xzbu2qdfxidqmllh9zxds7966s6l6klb4097nwaeeeu93pwd7nnwfm740nw31c6omz3wgqzi8hka1ehfe832bnoh8prha99mo8zvvht6x23284pw3uf9exkjtkbtine4fpm8lirtuyu8e3kyqdfiettp00684v540paozng28kl',
                surname: 'xy1vqr43z3k5rdzpkk506zkjd0vshkyp0vvli8k21n7syu8v4djso0lmena34x0lonh1ut1exgicar86tujpq5tir60bcfkxhvxikx0mhvgfrt0ohcnlkpc1otzvo7r8wu44vnwejj9i36kicx4wvkurb60q4rvffg8suy2wd7rncmb8s4xxmv283sef87yq1dolriw3oqtq0amjp9ock0mgkypd16nb7dormtkcyiv9fz75xaky3cjtroooegy',
                avatar: 'fpppv0yo0rm2axb7x24i0xb6tsaxn8gz812080r09do7pc1zrc2y1m0kykd98n3gkhzceefiewobxl0kj1ew0tm7r9mka98fad8xmm1i37clo3dw06n9yvwlhdr8raaa65dakyfdiau2znv3wsrxkdbq7e739bwstlpruw4c0xk8nppuxmbltk4p2i23kdtjb0nknx79b6l3orrnpg9vkpbn1rwm5s4wgbdvkk2fzz04e5d8mkf54chjncbp8rz',
                mobile: 'ajowrcm8mo8qz26tyw3d7jt2bcup62xnf3czqmrznsr6ibsb8uv3vsyl0tet',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'o1l29mip9zkeyzdp9c4qkw587h55052ug31eu8ti2vzhzr30m19pfqbe151i03judm7cq2tfi7ybbnbl4pf7330q2kwnl9sxtpoe06qjxp87zwgmofsxcph5',
                password: null,
                rememberToken: 'ygq5gwkk9ln7phc3wdvv3oovva34fyl53w0uj52ovl4stejx2967b6h6kg856ccy9dy3q6zz1m9u7qqihfd0p9vitkjeg0jmuxkitiq3lh881q9vn4061qt93zr9gslfbb5qlg29wbs6gszcoiwyyo7dh6y5u4n5l46qehi0ukggw4s8td8inn9k73iymmviykzili0znwkkhfdmutgl0v196d4l23957tuy94p1xt1n4qqmhrxxkdsegid6w62',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: '91yw6y2rfov5gr3nympcprw6ujzyercac96v3wlt18mmyk7hzktuo6akayi8nsv3h5qsta8ej8e32x3g573erd16k5nqgh8uk0se2qfp4fxyxdj1tlccvnmbvrktic4lfx3epo978gh99vrxpcyhxq00vee3sr7l04yi9gtgzppaotgawsh2pqqwy05ovxhbycrrapx03wriyu1z6drmjk00xzrut1w2xlke2ribx7692ltgy1f5jf01zel1efr',
                surname: 'pcl7bqzjlo3dv16pi3xcoom1dt4k1e0fnxbf4cwvps1wusbti1qht1t6ugahaxr8wma6vqg7sk46edyjmgo5u6hqt8jgs8lozknhvtm40uifaywea8wy9pohdnw7ktnu7au151gr60iydiwvn2nkk6tx564wvrc8v72syoxaa2z5mpiunkozdhi6ll70hs7wdscgab1ylfmjbyttsp1yj8kb0drxq1c08jeegydoqapopfv1yn4a306bzri07uq',
                avatar: '4b4hp6tufdhf4qarqqwimu297mw611ptxh1q33ujs595lna8c97bdbdt5emuasi60vbi4x5ebtcv7lcm4nb1alhfe8q4n4xpwcmnqebtcof0yx1fjnmhlxi2ong03sgjowq0l4jt5sg5d56yhnes0156csdotk5taajc0m3lalvv2kzme3btrtirk518ghx6qwm6b5h4whtc84s5tx7vlaoanbbgbqfgy8m1b13euwuym4i0jba3n3aef0842ar',
                mobile: '6dy4zzhw554ovg7b8j69hsekswvl6eutflmnmjae6fbnpepcixaggl4bxkgx',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'n3mmwzt51qj6pml77naffr540cwz65gfqdkogi2r1nnq8xq6zflx5q44wrwpmun5jpdld4sb1gec4bp3n2yo69xdkwmovg3li9rrqvniqbsregk2bxfwtk12',
                
                rememberToken: '8wzt89d6pnm4dn2ckqrmocngh3mpi0ttc21bjo2p0lnxu6k4zfk51vfj3ku2x3tuiypzri3gh5u2p3iz8dc4cim1yo8mfmisy0m2eqhq2doffddrvygaykfzg5wsmbrvquf3c8bvw9yuj4kdwh8z0u7wb69jamhosncusqvvjo2f8zfwquntulmo7ztm3vkay8co0clj1vnl60a894etpzkuprco61ctxpzyvgosnaa2sdtsugfvrvdy5ui39yi',
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
                id: 'j4jdb2oymi9u9r1dnq2vdx5g0nz96p4k8a6x6',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'krdxecdc3i7lj2tfph4vhfgloy12m9mh3at2uwaibi466vfvuxng528f6re9tch6oq9szttx93eux88liw3gtv38jb0h0ze7k2ebedq6kbexaj28xif8zwzb1nz48i3wflvxhsbje73zb25gb7420ukrj4jptk0iubhoqshb8yjyd051u2j09kvpn4ra4iawk3dqbb3o78ymhv9swxl5fuxve5241a3qhi8pwr0au6ezk1rs3uarq7nzfakei57',
                surname: 'sczx4okuzag1ahp95qvdudkqv282zjvzoptd3ifhjfis2zirwvydrd5z6st6seauvz3un1umzwcaer5krmtgkgx5823uz0k3sy87ezwks0fbpty5ak7hlag65j920mz1jxz3emvvc64cdojjkwqpms3h586cc2ljvwmncxcff7e5rp0bgstzsi6emo1soavt8j1zmlcc8sqdpr8a1285wlw6kw9duwubreidz7ec8fy0xoibar2m1p1wfdn9ecy',
                avatar: 'hdym32ki285x0iorfpuo9u440luw518n1axbafq16ybib8v4vx64g8vbc7rezsf35yr73xrqfuv0txda0va451v4vydfj7d71u1d4d9cbm116eb8lqalupdog7vktsz5fy6q7u7gmq6x4l5ze5x3vjy9zrnz3huvuivur70xndc6f9ilq99zd3xqyw0e7zxadiu4q2zi6g4rwtd2jciqp7ict7056apx28mxayss5le77xanuck5h7c5h7n32gf',
                mobile: 'xrftcii0624i4p7kjq8o7oyoh69uvjziqd8lnni4kxf4nv54pkr1hjntzbuq',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'cx9bgwqam7nkedutirm5zyq225ze184rqli2vj788eewq96gdfwdpmflgkeo6pwp18fshbvze9xdfb84uo5ufnc288g2itzlfcgpm74vm8o5b7uiq4dnwei7',
                password: '6wfmq8ibf6mdza1dtg0aswarw5t85ac354xh4lnrrx7p3hp03puocqxqxe1i2svbydgscez3u4u4vhfskb6zftfmidrop61e2udovnceui2n6oj6acz0tk85rimgiv0gjfsv1b7xxzrfqop1yekr1iayebn6lbvmkokyhdwir2w65f2c960ruye6j30alpgwcrf1cd1im9ybdsi788sd7louo8u8l3mv0vbnyht497rls1o5sle6m2orzyfwrs5',
                rememberToken: 'wpwmcaehkd24ggy7s7i46oosnffhhanarr4t2g6q3dgcaqthcaaubgbn8ymsyuigonkkjtn806sgammhmc3uyjcgov0b4fektogsgayts2di7tuos7crcm1lfeqccpa0ev57ui46q4vir2c3k2ndctyt1vb5h8ltx55o4ee6qpwdss4lxvr61jlndi8y1d6n0j7pfvmtxl0p0g4w3kbad77jhzuzc60hd19s2aq78zvgx7myzb6b7rwhyg5s26o',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'xha3ys6cmfdotw2qcv9iyjkedchgkx788c507',
                name: 'fxmdaqo22p9vtgrzy5qm7j3s3kl4s7bxpgbl4jnlelo2amb35q4x96f8uxbmw93hgh0itip2moetnhtmxe8lcz30kmgo78d3oa4hhcejvnnt4wz3ahpr7dpl3t12oo7mm9dzof6gu26w6qwcgajt3ng56vtcodkzhxk8i87o1rrykaigz2n4090tkvvolb23y7b5wg8tg7m945ef15v1jkr5dkz1nhtvluxh1qhiotut0flwm7srq2yzmhfb9wo',
                surname: 'o36fn1uyknu4vwmo7sh8kt491ah1hv4s9wq572cigh3a5wbmsatm4m6w6yi2u9zyvtzrihx6tnazq8zdysixblsr2xj7y3hf5h6drruecubw4432apep0apywdilj2u4ncnr5f7rwj2n3ysexoejuivuvi77rw2p4mmvpjq3s3fxvdjmr4hekt36nk2t3wqmrwlrcpbu6mi4v5jmxb5nvo2doxa6o06j8089nfkmmxiwiu3stfuiygos9fn1y0f',
                avatar: 'hl82jifgkj6b1mwthlb4rx2epozwnvx9h5zzn53bhbtnecg8xjflar0lrrfg6g1p4wfb2tkjpwwu5ckbq9m5zn18v6f4dnckh2lzr7mqxtssyhksivfw1nlpt7t8n6ah9e7iakso5qi1cn8sf5fenyhbktml14sh9x5xjl1v0wuis5jcai3vsgq8mp37zqpewo16ky4j7uz1z893jeqfzly7c5ly2d5thcr9m1xykgppsajt3iq45vha6ba56e2',
                mobile: 'wwdqp32ia9u9y29dd2ir6lqnypi9p25nrhaybwss6bz7lafheok6d1uscrq1',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'qfq16qmeje0u4lpngh9h3djw8flbt104lsz73qans75uv6n0yoni079zw7wlospsrzt9aeg5x532xz1rgzufavaoqqt5esql1x7m96ipdiajctoks32nm929',
                password: 'tdght1mmbcpy9w77h5mtvjfrn3x0dxufsz7zzj8f5em7e25owwzctxh0wn89ldwyqj9bzk5orsmnz65qmw62i3xi22ttapnw3c2dqek0430xd6bv7vt5tn4y6v5vz460v204orokpgvvqwyydov5m8jdyp0xfnst9yuga0e8kul1bo0bwo7dcrb81dk1xws06eipkdksk1zcqafzoznqhotsle3e04j861glrxoxs08zw3u59h60k5ij3gts56b',
                rememberToken: 'mmgzagoo4ujdd6rwb9nmsk5679mbao64wptnzuedt0fl0erp6hii9e3asg0qj24ujz7xdh6mrvxj3iopewo5s2mc2w0uzx5oydh5gu9h4hqzq54il7ku1uujo5tjqf9yt3otv8gkamvgteydks6yj9e4g2gmv8wq4uxs19liz6why8ksho9zq39gxw1e0oufy9fb761m1sj22xccsbdkgtwst5cv2g60ujyqm21mwk4sf5pe2ujtzdnd037o211',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'y1ws8bl7i5b4ykl4t8oh5mvhrwaqembd8aj5q6ki4sd7p1nsmi2bww8c9g5kqnmkfsogkqk1juw7f8i59zyl9cghke3q1i5ai61inht40pqe7500dlb5o32vgjoe5j355eri6aytngdx31zfekykmfm9s8nbcsevqpvtm9fifhlmexv7gpvk7u012cz9isz5xhgyhgnn68vpi89oj1rqdiezqxo7awwo3esz7d46ks80ehx3feqpp75i24zeyex',
                surname: 'c5s35r834011nek5y8c99fc94uvuzst0pn6gnzcy4bgkmr5pxlq32l5vd4ja0p25cwg6re2cbmogbrgprtcbodrvyxqxzuuyuds8bhl0qab7ougjlpjuch2lrmhnzavbrrgpdmgtynelky5miz3r6y8vg1mxnc1ujl32de1autbwfwbf01ysvpdwf5yhxpta8rb6w17n508cug5ony3p3sbh5efi25adwlyh3445ci34gn4ya19j9zxj9w21c3l',
                avatar: 'hdehzyi22maciy8yxebqbqefqefxbd8e2v6ktbg9z6yrvaqc1yyzilpaizr1oibqwk9wa9nuchy34s3qww3dqsmc1to589vu34jxc2ckn9xnxr7uj514ycjvv8uppog7k13pxoivcq29afb6risanb0ewbb92bfemc8b89udq64sag21fgzbnbb1lh34szm32lqepxm8t59sb1mr3aoe1f2fepmm212pcpc5kdygbqtl6tgiyewi36qhkux4tzt',
                mobile: '89nerfbazzgnjft26h5dgclo3jo0raq4et61v8f38eqyxhzwxppgxhchrrjz',
                langId: 'tbcp3id45hp28q435lmgex3yxwyg8ko8028zj',
                username: 'xobsur7ve09xxeinyu857flogqtdhzf3l0l0vlh1f7xkl427lm8a2344s9h3xqv7kvk4ppdoonajovglb0ryisfyzzicqrsvsadokekrwsez1xqnv71qb5pf',
                password: 'ue0qjwejd2en77f4u72apnegdrsiy4itou7ztr2uujto4ihcyb6411k2yh6z7yumhad7vfzb69w4uctum03wqbf98ed6medfofhu1c946cv4kp2zx94ac82cxeix9pys0sdtd9w5bch2gs9qcm2j4qjmozffhoukae3m39ie4k8mo9oc0q1rh0qrm0bm23ok6ccv6d5603flo5jn7vrvc1vkvy20e13e1f6lkwxojjuom8e381tt8aq2kq1f9f4',
                rememberToken: 's4cztzyduzv1gfkfke8bi9qbdn2412jdbmnwvmzgm9ydulxkziku4ijw54qxflwcdpfzos5jwxj8ehguvbanmj80ff4iulr2xszz9k7y4hjadbizane8g40woe3ua070zchcc81j7w21tg1aq6x7etce385m2usfuq8dojqsu8yjhfv226t8tj7vu08phh4frqxwwtqrogdop2k2uhp941c98fonu95q30xqm12olm0476rnj8fyl4244ynmc9m',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: '2o2q1lisqyf6rewt3797g256j6p5kjaxfjenwhthzqlknwbrq89fnoudde57nc7xfhnr0mdoq5u2kpo8jy79um1rr2ttaxojwnes5s77j9lrbb08ht61iz2c2xfp9ai0rhozfte299z9cq3yjt5gfjpwt6f8g0pai2t194egolpwkyixmpana0uxmnpabydwlykg9sroeqyfy9qrr8fjs1apduip1no45lguklllxyff3bj1pfsolj7bj9f5g85f',
                surname: 'zk9xkogiqmi2o4fhu8124z9oh86vv90m9o28kj29cwak1w84re5aiqyrmdx2pkkgml5xv9f9udsjarqh76fwi5d2ueb6r2r8n6tds3pbq0u0n04b8820amzwo7jq82yl8hs43qwdvsdadtug1ima0yqofnms9p7b3kto9q1jz5qj5iqlnr6q4o1dgi86joa3ddosudtaisp5j3d8z4beq08kobdo0r6axznowkekpombihi5j4tq98lonehybv7',
                avatar: 'd1uad2sel4zhfmmk5xknxkggqe15az75xgkbwes2jt3rwws9dbt7ayp33jxmi1mwfi5imwaeyhljhrzv3dzkqz6ohgvgcusvvx545awbwffmh1hg4dtkajekux9k97dnphyl8zaoopkbyxlz4vtrd5gncq4kscqcxumetnz2juvkkhbritgc5nq03bsoso5lr1c0u1h99pn77v46y1pksxdqrxat8ck1nkru7jdjpnamakrwbn5grw503wnc645',
                mobile: 'v85tqzzn91iqiun3fm78cd2xpcvpngvwz6wnlddozvl0zqxjsm7ylusdlpng',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'opaqfk8k8qye9581s3xxl97hwqmd7zwmc06ymt1go0oelvyawrnv047fh18lwvriljlr0fdy8aq381wviwhrdntraxb4yn7hc1phlyul0ojgmtfk5m8wl96e',
                password: 'gkmtke61ts4c0uquxeew4vh0rhelhf0n9ayy33sekj504ilby6gvxeljc4utzxh17sdtrqy779a7b5rfx8et2wuo3nkxg0c7mb2atohtv4wpu3e9u71z4ju32mjdvebetaw0y59v0rq6xuq2vevzkipwn4m9jmmuxdpmtf6bslo9knwpr0x6u40ey48otvuwvrbtctpnlf1dyux2rykwpnlkf78e44ae6igp9bjzvcumblmokfplovmlijr5fdh',
                rememberToken: 'arjsv5356jsb83fultfmbgs60vo2oy4wpx95ihp5hk8wiw4ggs700lpurahmgju5kbst3hy7r8u7ws3oq13y3qzfpl4ufxbz9mi6oniztsmsjtxdqhz6k9fvez0iynka5hwqp1kl5vq077w80qwdsu5ecn2jsuibc035nxhgch561o7ta3f1bo5qxnghalvu294iwo5drj22lule70uw7agpcogmpnmhwrorwr5rnu9d61kmai25kgjalzhi2cd',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: '0v42n29xmbyg3a9ayeb84tupl4ufpdrdlubm43czkgor9t710955ym5nn5zwss43yk5yxhc1wxfho44bw0wir2bdvqm65zkjrgpyx45hh5i5aapm9rbdpekqs5er9xl2jumlqepu3w2euuqhe9wuotlygpruq4kpsr9wlp34j2u253xo2fl9e8281czqtrusebvbct7cm806hxrl06mtt6ogh223u3hxxw7eqybur60reh9ipu2hgbgvssuerpz',
                surname: 'jpuyt8t8ym11sy9qfprnydim7kd89ka9lfuoqus4bzs2mfdx13prfp3fmvvlu0wqsjkqoblsrpzis5hwogg68fplsvfv17sx4629gr0lydlomy5coyh8w7gsi0h8ro26d2i6a3rlxugyainzhqcmq7e5ssvpwhec196tck685pbour8yjq8xsq2ya1i0cvehjfinhmi7hp2flio7lh5xdu5hmdwg89lwdxem62gibjjihiyqrt5dc0cdzstljkym',
                avatar: 'qfm1b11h2umb7m3xprx0shpjcdu9gfxc3j88mx641idbs4meqx95p4mlyswwq40zz0rurcwh7pb4zbin3km5snk9qypa87n875a53cyhw6h3nckr38i6qqvfi6ic1tx66u7bhfwfib22dt5cjq1zckv1zlnl2szrhuncs9xy3667ldy702wxi68z7xfook7xur26a74jkn5lknnitc97ekzkijpmqkgunlmw1oscv4zrafxm1ikfjdx9pt8k9v9',
                mobile: 'jyysx8qo91nu8crgsqnuon5kdm0buig9zqpun5u40z7deuwpc7vt2y38n2en',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: '16wa1m9enj27lbv12ejpy5pvre3duyuzlaqfbkycgebepp0j28dcswbr8bk1vlnwwld09vaad9un7bidd8kdj7tks0k218smmacj1uhvmh4r8stwfe4nz0ei',
                password: 'h4eyaurceo5hj8y19ap9pfz9lkh6z9oj2b05qe7288lbxolzuvo4au8aazly12a24wuvgnnbkfvkjdeqz0p3hffv16hsr80hrpg70awemr77pesd59edrr9l9gwnjoqr6aymv5njhpv7j8s56h55be9mnxmyufd8z7lfkxrsahs41bt21dnu83q52mffscoekmhmrmkpjfqaymgsyuka8dnuvqymybgbhec4dxlnrzedtoao8wdt5gkx4mz5sbp',
                rememberToken: 'kjzbo4fggmwggjnu9wgdjlbcyhjtpoh3cw4sdhl4vs08mo56588cps0o959drmp1lob2jzr0sk25joemgyl937o7b9i37g0wmzp9ex2wt1p38vzi8drqf8jpziydevaa1az4jlvmcy8coec2zaew109t8w8n9tqppm6jt46suup6u0cw0atgj4o2tkaaazphs1i2k4ds5t1xfywcqhyrgxfvjz85s6f3o73oj4miv1u69tlhidfft9qzlxun9ps',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: '0p7uta9z7e1pzcg87bua27aa9oqxtg7kvxedixvfhzmiconf44sm2bc5e1ws32kctmvrrg2et97frigw01fsuh344vsgph8ww6hkzgjrr37zh4leobd3jy7kur09zu4e8t3piat89s7zzzi6iqjavwv5fnd5hwavibf6sd2k4v6v2ak6ix1ll9svovdyqly28uepbspmks7h1tiun7sjyk6l2ooq1cah2pwqk3sdx4hguw7tgcp8tl2e4my3ko6',
                surname: 'wjkya623jhl1mqpj5fw1xmzraya6fsdg6gl84hd95iznsbrafgjb8f7ah56q85b6cr7yhvyyo3he1wlb4mqhgecdnck3eicrlas9cwhjmm9f8tjr9tgma45cr5yvn9i6peney72wt6p9t7vsukscc68calsmxkq3d4za6uh1yyd1208nkkj7ahaxt5ijrpwposw1e8f02c0g708x1h6y1iiqwwcch48hirj8zrqlfdjmq7xxfypjb9k1lbdrvn9',
                avatar: 'hr253d4kivebnvvbvrjto24vvn9wc16m0li5jgmbpt5k5x9zpj9j0g9ejwwjcg7yslrix0dhppxas3qs8qsau99dgx9uq9mbtoaae2vlltxxi7e6onlfmx7v65n9j1pe4he9jl5yqjutoeprzxp01zv6lt2415gf9a9fi8jys1l40nbg05li6t02vhouxk09gheubdm1p36bumx2jf2mkvs07ap56qh8exirh2juqe0tgbv4ctmp060m1rqtjp40',
                mobile: 't5y3phx5fxkevq8ve0k6v0jkh1bj05fg8alp48ckx3y5w0pdlyxt0t37ufkg',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'mfp3qsxe52ywzayfhfyp83kkbr621xemb7ci6v0zu5cg8x3cx454q9zih8lcind1nf7m4zgeriilslgwgnwsy558kog16vt6b94xrmma9ig9evigtvp984q1',
                password: 'oj5hzxw8bqbahx2ik7h0o5wdpbq90nazakvoe739ktgm0w8z0gozpgeue8v3i82gwguv428daqkkdj9q521izmh3g6zm1s769hc4fep665safhuuuilclb6kr7tsag8gp5ade1i36jz6lszp9q1c0zl1kd5uopwy4jahx1lbvyyxx4z8o4s6s8q1a80c7aim1rfxxbov9x5pszj34geazvlen7iee4fgnqk78vf2rj1vhkpjig1p8w8qfbm0sr2',
                rememberToken: '0m5eeaqiaoqfk2b0j569502yq9ibb121eswskyfgds5dx38x9u7ivl7y2ds5rqmysq11nbmkzslw8rswx5xqec9xzoajubx07zo0sl1655z0t4s5eykzvq79kl0a1uwcqpx4v2ou0pr0lugfp69g4cca1cndtws2coj3360wsgz6x04cfvbpqx9fi0bzp4xi4qmaqufeo7dcmoj624cu6dyw25roxmc53dgyi1c41noxka6ojadt9zig73xukas',
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
            .send({
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'a61f3x2fo54wohxey4spi4fbuyej3lq2m3g39tdqz9o047v8xsh9g19l9k89jah29rn4b7mwtkym9syn98jya6ox8jlvfsf8xl2qsk00jyyfmyz8l02vuaema7dbzwll1utwql0cpb8h66le18iwo65ay6cwkk8el4sha7xuwp5809c1b7si1910u75aqp83hj7fztsw0eceylmkdrvp8vx9b4bqofdqdifuts10wn29wsg2p0mgxadwzplan0v',
                surname: '7cgjvmrydte7lhzx8fid885z1pfivg73ojqp93nnrfdinigguicfbdwgqanncdwwsnq2g4cly1eoobt5acgln68rapjfvifw5drjm6d4dx870ag04aont1p9gbtrbb79l42zr6qeqtzv2fa6fjmwctwac1me3u5xdrz7veba9ag8d6n1e6e2clzlmbbg1wacb0g8uezd9li53s1xgq32wp6jxv7wcmyaw8akncdaj2s4p19nuxkm9uan5jw6tft',
                avatar: '5tvnpc8o5bpq6wmhqq7atglok9av5rl5973yri8m318v1a67k1a8helz45ac4s9qruvr8zy7qdvn3b3tj126yiu4gdym49v343wspmpjeijr3jxvg1oyir5bxhsclhvw3d63om73s0qjqdjuzc6sc13lhr5c8qw8a93xu736ruzwk4572tk3qx1lmzfuna85rqg0fdgfsmy39ctoefs51j7t4r14ou78sg33ff0hbh520ddfahojfjixz8rsbxn',
                mobile: 'pk3lqh4n29fo7de9jxj7itvx3v76i2a8oz2knjeq1yrobru6al2wtypb215sb',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: '5qrbz0s7dc9y4dynrf0381qkc4s9eniyln3rg78vtweux4gvq23gbkuajk3enq5c5smao6enscqktd00c5je15dlcpn2pntdugd8mw5rk97glxnw3x33gi8w',
                password: 'hmfpbwpc68y00arq1x7ohhc4ikskdgrx24pfwfz1w92diu6zto5yjiqwv1ez7qdeejndqzrxqst0ic3lmm5qt8quo4c7xfhv9ashuwfplvif45oh9nvp4rsafghpe6tv759r5hy9b8wp2153xsd4csr5puhtrxgdmjjmi7qpcdzy3r887bsvhhsecbjtzux7bz91i8eo4ola2nidtpw7f9ztaouo90uwc2fr48k98fkdwu58ag2i3ph8mggbn2v',
                rememberToken: 'lr0zvtr77n313ey2wwy2ufwlqsh51p4pm8nqaeqe0gvym38536a9gjtjpz9gpr6lr92fc16hcduek06kh1wf9vd2rggshosvksp0tid0s68fg42rpfjcc0fge5uhdh1nbd7eu5asgmi1gvrzkhfjxxqkq5thfs6h72wlx79dplh7zfm1zo9ijxfjec9zff1pa76md1fuf5qibnvjdv4mjos0y185zwwz7741iaf75pwo50l73mrkhrb6m6jsvlg',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'j6aznpkxih3azlit41pcwug47bku1udj64xxckhiwuwbc5erom4vypsapq2tuzi32gm3v07jusyn4xrhfqzwaj76yuup80jjizql5ccdureptpqv92fqtcpcvlib0tuufrc5cvz902e946yfycse3nvs089o5124qod3uwf8jpan4hwpfyu706qmi818mwsmwwuraa5wg4tj4yp0rhn6tmqm9t7a4suto6bjt6ccqv1cq3nqsv3kp9r0vuh12cr',
                surname: 'dfoc9r8q7j88wavp162dsj41bxrudaw158paejgv794hctzv77dclsya6kohjc8lpiupj4nrd3bqsrzynryvnxiij9tvmnacikkec1ifc4herrbax2vewdru5k9iwr6odiunh1w05c4ctnfopphnpiuqbdgm7dlty3vo8zbbs2xqa7u9zmw2wpo3fvpyqpntf4e5ly0v9ait4xjtm2e2zie0botn937gvk7yt03i0khbjl3y6ohee1zs31lazac',
                avatar: '8d24l3trlg6dzbv2hkcyrhopq39bm682hrfa982jfrfqh7qivqvh8lnsls7zp83ijddtmfi0fn4yjhuzmt9v7xr2kld9ip3j7dmzosvltd889a2fvxv1ou4p2hu5hmis82nb6dgveaft9bd3acoa80gj6xvbbb5pqwrfn7nf1e19zc3d6uipvkvmzb2wjlccdr0stvep7iji4ag1uxbmagy4z5zb0ty7ogh7l2v364qkkamxwu636syvo69r3wk',
                mobile: '9ksm5w09uaag4bwqp1ybb3ht672wzm5ymq7sj5gun85mudjtnarmbnvr3clf',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'qu2ci05jtud5vnoply5ztwsy5m33cl1hav5kb1qbttffyc92jzwoyx7zdiwfn87m2lws36jflhiwpf2ay5hmb5gqsal3hn34urjim9ffk96rch6uezlmfizcq',
                password: 'h5l1buvsnypoh92xuzx2wcbz4vcl5xw4gqh5ylwr6xyxieuvrfx7eez39ak64dsy4imlilzuk5fi4pi42alec97lnndngi2j9qe82z07e8ofu2mddqlkoffq4jrxw14g2w73gq7v6gqbof7iiz1cn8yir16u7jz2ipw97pcbvgy1fhyr2ixjapk52dgnhqix1gu1xzib46tyr8qhpjhzsoawllhgd8sqoxknubmxm8kcin3rbtxg64uaid2auwf',
                rememberToken: 'a0xpfrgqki7g47n2zeyxgx4unkeavtkrv2fuyovpcb58k2bdmpirnp9fkzo971f99432oy8ez4ev4xzzgozwj1tk98wxqr678agy6cplga6isg2cnzui1b9ct01chgjj033nddu1tz4tqwzo7dou37741901ray2xox9no4hztsew5cybogtj5bh5gq8hogapw06gi9f219xslg9rogrv4df89od2ckji3v9b5m9skneee2iptu3rc1ilecj7oy',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'wdhbfwcglks9s2n807o68yvgswwzqf9mjpq8gbovdsi21qxznfmt654dz67vzzu2chwfaxwm46b0w9vn3aldlwdna9g96fxzkfbjw5v1n83boa9zfdxvcmlj5e8e71fcdobpdgc2y6vvvmg9m9e3dy8k00mn2owndwk7czrjl6jjawetf8n0af76hcvfkljdth6ztwg66vrz0txg1uwv7wr7po7c64hso56g0qe1j8k4u48lz76afb3j6c5udgn',
                surname: 'cxkp970mlysoi2qqwyo2m9gjty6plxcbziebc7s9vy51oj65yb91ncvtbmr6u0is3xwg8x2mxhz24zyyvd8gk6gc266525j9b9krhxpmqff2brx9krq0va4rzizz0mh85rw8c2wtto8li897cjfl5117wf532wm0nxe58vx77qezguqn74t23qhsqtgqbqehvmkjc71e11xgjt2ohrijsn953r5xups8v8y2iuuhazfrztoxskwbbuoicy85i61',
                avatar: 'fxzwvwancg3cwaxodc5z4ew6b3cocpof4rlavu4g2aoih02dhi6bqcgm3gauj0px5kjps61s22ry4xdawlhhe4e4i64fm0eg72pfcjechctvzdebnpy6jorg3n3h2e3worwlr903lhs8w22kc1yxjx8n5mib2em1nmrulbjgz8pbpd2ltl8uttx44nljlm0b5a5zjcaee8f05r00koc68vqanu2ynlgwebnn7gb16g9wuj05cmy6w135zycqyax',
                mobile: 'z55bi2566pqk7m87nkfpii77pg83g4ydd90nibci7d5yd5havwtzs0e0ciod',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'psarzl2fun4efi07m3pxmnskfbogt03wlg4bjlfvrfhq58u1drt1z5ny4baduzsawaalk9b28dxkijk2y4utjp38kqsw4vyygu0l6d1fl001nzw8622cp8jo',
                password: 'qzzirdzb52lnxeaddcm4gdwhtn60oemuftb585soudewyx77rf2r0pb75ooy5xxd8iivx528dvs8xa1j9dam9cy3wi6kvao9p3unfmvg3e62p8rs5g1mqf3xcvfvx20j4zm2gdn56eh475zmbvg8ia4wbkdbynf9wb24b1gw1nzykujdr48my1w5jwvxiycac04nwgj43dsi5q55d3dftluy8rfhej8c1lagpwpnkby4zn0xmo5tzrbo9kx0w99e',
                rememberToken: 'otwm9epcdmk57gjq1wondzdtjcpt7eempl3p1rtvt5z39o6nnnfffe3h9vodjhq848n7q9d2a9mzyexow9chn0v3va2jl4mddnas1gvnhx4arlft82672nkym53ixxkoy9xy35h5o9p8n4p7mfuc0hvsfal59t9r090gulaedku7m3bzd9n2f3vxhuv2v8zq5qrv4dhcnm7wzq1q4sysecw07v5pje4ifn59zbdh461xm3g3wx9jwc2r79x67ld',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'owt4cepdfo3bhcds5q71x18rwz4eryba76a70qy2de5o00kvlhlnfp2y72dg6ftl2x2b6l7k1n3uek00mdvhzetzlqrj1bruuaa22gpzqlakk16fn31xffk64gbxgzd2q02aepdlqs7ness5acxuyn6iaisgzaodesjbgrhmgsdz8407jh9c3z03vbgma0zsf88zx34pao6c0a3ev862rc0rsgm9lw0hl49hjwpip4z1auc4vrva2wlul4nt78w',
                surname: 'pfvbjl2nn2fvrfazjxmlz9rckfx6ali5nkguyvsdupwnjsqeq1vj1x9rtflhcwl43jaf0sttsqw6o476n7pnsow9ngnjl2jovrwdd8gnt0y0xpyjqvxbd8gwcyizvemh4xr85h1xat2wiyyrivmfducc655i9jnz2953zi7f5xmnqgc6i788iwf2x4ob774ymcttlnwflhf10ni7hbfdk55lbi3er4uh4xal8cexqhitwbrojl8bzx27y1trn4t',
                avatar: '8my7953lbmmzpbyvai9t8opr5ofeo4uzeh2ldf56byleuo5iv39ncwcnp6w22oipqbzoukcl1eliuqi0v6f0wu1ld1p90etjfjm1q6aofstsjm5tfyw99x0hvcvnxupqn4l3hwc2xloumwlqcdifvvb6wh5logonixe74h58kaxy6pfr9rm3qddgfrgtq9srh9uf3auzwprp7xalmrhkkpqink0upu46ew2orbd39lmuvmj58htyybc86l18w1k',
                mobile: 'nky7njnbha5v4t6kkiq2jll748g7m3zlzp5po20fkr7mmmq09rbpm00slmae',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: 'wq9rkoknjpl3t9w38bupb5jzfkms1ftaa7lif7069sg2l94ngnrje3pleu5thm81ltqi5pjlu64il629him77tirezezsiceisoja1xdsjn3161nx3osgsfk',
                password: '0tta7c6ofd7t8tftj4iob257eyyoo0zsnq1p7dagsxj5h8n84jzb82ded0ium499yzxpvhjln7dswouz4j8sdx2dw7so84p164drwy0ejfxt5f82tdgbeinwtkf6t30iyr8hwlnjdcjn9ehwjbqkna9it9m167dw0jcfzjjaj0b7ma6j5ohz5ubpjxvqia4ej25jnhbrfelo7vbhm9l85y5p6z1b0rpn70e8ddzfz2kvvkfe92mtr6r6bnm7sgy',
                rememberToken: 'k6165jh728k176ys9sijf9ph4ud23j3883w6dv8ickmafqgrgwcy4a8mhxzi794ulh01p6dgenq44vp6hcmbsfxue719at2hugxzjxkuazvi3txal1ip28rrjy3gfunzhgoj55xildarw1h72kcoz8rdripm24nu0a0jhul25wdwnjq76kbzdxcaze1dxjb31w9ccfffn8zk1ljdvha0b8uc792g5wiqsjam78kpthmjlqafu11z5r757ypaa9hu',
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
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'z475qymhk2oyh4uh772a5wqf09qvzws507zx06zr5iftjqtl00qipqk2bqcv9fisb78jd2504xsprezv9t2x235df7p0k3vv3jn7xhds453a9um2w0immeo3jm46strmefil8uxgerd31f9tyvqnxtt7nhhvuv5y9k279i6q30usbdvr61ydc4g96n5ex2jpea71vfrr1e7b0ozncvuziju4gcv16ft37sd19ntw3u0le7p9zzierild6loz99w',
                surname: 'kh6t5sl15tksc289yia0ld8135b1460xa0s1q2ty2her1nbmhk2g80fjnthdlys4hrx6zr96anoj7ufldheb2409q127xs2l1s9jvohg66oihf6vexm74be6cli9aoddakzd7tx4vy9juizoy6pd3b7vyztumflkaqx3a3q2yfc4hsnksbpo3arqowl86f6l8aebg4wd5si7zk9lmaho39i1kvxo39l3tenngz1xfdo78ohranpan8q1m52gixz',
                avatar: 'g509abtuw6g8qll6gy0nu56yfam73f83fn2nb87rzibv3zqf2npjjc9bitrjip9p5lru9ka8nrq56nxg0zzyfpik5ij3o4p0645tgljbjo02rsk6t29sgczf6yzib4w5v41q10vi5nk81c7uwpixdw1fg172c4ak3k838q3bbh5ukuqw6nqjmakcfqg6acbk74tkwhkl0nc2f745xtaq97wgq6o9t3eni1fft1m27f6xd8ydhir2fyf1fh7tmzt',
                mobile: 'gckc6moheni5s0w0szbxtad5e3ov3v5ss5e6s1zbosmxts7w47coenb8rfhp',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: '3uo67eratei2s1ulslcy97n2juhlrno5bhymj39gvzuoooqjzc2f2kndv6zrhiycq04vu6w72ax6oz4911ju6hm448xgx1l145bcatov6hc1mbu4na9xkx4g',
                password: 'rk36bsa9hkckkk8hi12ut5nvmswkkb1ydvct8uwqzrdmsxnaqpjmx2a9mhcoy83qosaht491c0qksyqij89uv1ohpiblexy7og108xhpd2mdyau32t4o6v1e669g9qvyg8ver8g8wsxe8q7pnb13g7n1jcruflndpamwm90q3gj20rp67iwniyau793j1ccuu2bftnxisyxepkhftftwnmi4vc75wnpqz06v6g9s4f0ikfbs2a84n5r9zwfnxo8',
                rememberToken: 'yxtpdvl44ygzwym9wp4wedv8cczb8if5mbbrf50sr9mxdq2s9efa9b1m5t3d08s4cos7e9w5xs55megdg4aqb28mf8v3ulenh37dghhlyocdlrl8fz4dwchh2jvgnyu3dl58z1nkxa39n0u1uop90f1yxrh90ca0pagibfkqrpi1lwkedod1v5bnw5jg3mt4c5te73q4nsqi1150z1my3fxgel14br5v9wbmlbk5srhi8zg4ueq9t0edipgra94',
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
                        id: '61281e98-2b00-4d4f-a497-7b1b121f6b9f'
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
                        id: '8643fee1-d7e3-4be8-a2a1-d6893d000727'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8643fee1-d7e3-4be8-a2a1-d6893d000727'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/391ca80a-a5a8-4432-aea7-c02229349b4c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/8643fee1-d7e3-4be8-a2a1-d6893d000727')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8643fee1-d7e3-4be8-a2a1-d6893d000727'));
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
                
                id: '45824d68-2f5f-4bf6-8bc3-bbcda39db29c',
                accountId: 'a9c30b00-5d36-41a1-994f-6e1c1d944bb4',
                name: '09coovh7jdbog4a20o4xs79959mcdtau3um1n61uhhbnkraczamjg11ly0f5yp105rgsh2rijwsysntsy3ej75b6rc3plntbtefrh29pog50x2nl79w1b4x2x1fzrb37bu4c7lj6zdpcrjbxvzrma44fnqd3w5gk3c1y0glqy6t5cdmr5nqcxzff2k4dkr4kj5tdd5hbcyzrl5g8i7ayjdkra5kfivtzyf9w150t76bssexrbj900w086cgy37f',
                surname: '3imzp9cd1jkyukm2wmzca8sd3d84a8vy98azdia71u7nouw265b7a24ezjz7gsb9oudietjfnijp1vtwudczqy69pi7hy9m3lpthh9h2tufrwqw532ibmpjkl01cf5p8ycsxkpedc6k98fmeq8785ldzfrgh2ngcoxfdu7l4q97kgtgr4z467xhk54pe24qnwcf6tqq844r38a9h9a55hleeapoyr0mrp9gnf2gy9zuu48sgt749zx6clww9g9q',
                avatar: 'orchs90b40fl1njfzn6l4nf3wg8nhgzj0fcs6xdi1d37p61rgahkx3j3w3klf97ficafmiykwsdrs9nptdnmeetknuqo1g9zqv4ci3teeyct2pi2u5947ozw6mwlvrg1hijzlkybxarzl68x2v77hwdlnonq5rr1sdov0k2hrob7hd5lmxp27upfdnsn0mkddkpowdatrwpq6215506z0ke5x3eu7v15ls3qse4j7qm9o4joypqzg541idc1pkv',
                mobile: '1xq3ed37ldp65uhx0p4k9vdf84cymngmg8lmkbjyapstbx9x9sdctgb8s8se',
                langId: 'a50f6c8a-d0f8-4c49-b5f7-8560b6369c48',
                username: 'q8fyojbz8mynx3a2tcc84n3x39h379buihehessenqxbuh4z5p22mhfm7q8sgeqkcz93wcp3o7k8r13hox4v72s57d8nf611kdy3z7hlqd04x4ham47sip26',
                password: 'pd4h20gth5kpzo3lmqe6xq48r9wvij5pxpvnpe2dixrrxap2h9zje31iwm41awxqyu6fwuq3x01pbng96iukbou5hjm2hr1xu6m6twdhbwrzcsiguku6bif6e38d8rc3gr3ubdb9oiezbterhcr1ou5p1nkpvg5p7kbkk0zvxht176lnms7smdnrp8jgm2svb4kfc6ho4acl9xlh8bx9ujpj30vqm9ox23lh9vm9wwb4b4bryc2hymzpqpn755b',
                rememberToken: '6yyo63iid3opfao64r2njc8pns4fk59qbrpafaj8kyp5kcyld0w6mmtdnzkvtpq9bzfr6zhvbygz6566o1mn9gb7mwty5sl46wc4zcgx0urrw07nu3u7sszf7nky69beynkxmrop343h9o2d0g0noejamgh17nubxf3kco4l5z2sdii64bhjyaoochet1f6vjxee00aa20q78giqxhc4hm21wfbxqp2xa1bwju8z31ii95yc3k1u2leuokv970z',
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
                
                id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                name: 'kg52bj8bj9e5x9137ynkv59vwozsb3uxxdpijcb6rw773m3b2nb6rghahmh0gtnjbgw3wlwtxbq9y5fvjqvmzemarbl3w5tfi85enmlemrirtr3qnfy7tqanqvxqy9gip9wa6l6kypvogdklfq000v35c1t8pxsmscq78jhaslknscnd4j9ste5cliz3n8bqt2tfmxljhkn3woy0zgepqghfb1r48pnnrgwqkt0a5ui9ts62xielzyuke9l02f5',
                surname: 'u1jen7nodidqlf5247r1j1dl2ffji6qdx7t2h8lmr8cvpa966i22dc4uelwjyic3hoi89n228hc6lgdyi9fog07h0kj3c6qo71p752b3hdef3ehiivqc73d3itx1zvoi9nqratni1fn0xb5n1mnf6vrezz4287fd83lm0h194pyus6g0i3kik3x0bgdrnj2gpixxhw73w7ofxt0ttxdidutux1vng3hr4pb0pt7tyk8tqmr2y46dowdiahs2tva',
                avatar: 'kpqfn8xd4wkipgghutaixhflxm0fhwt2ectzc4emknk7jodf0ipx4mxn2zddc8gq60t94dak0h00oukxpyrbvl69wzplo9jklqptlkxy2ghc0r878b6bq4tdev2jc2znima2czw8u45bwvc0vcnrupm3uolq92pi2y0i93ijhyxn9j7hd45oqokfqqgj1oip70uxh1ftrragkrix79gz4c9xvse8u2lht5dukkijrz6kii63p6h2cqaf6xlkve4',
                mobile: 'pwxzyl4zh7fd6fin716gdj7qjpouf5niciknp6m901a27nmooo6vkw4priv4',
                langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                username: '6fnxey15pkqtc7d0cux2ok3i1scpjffbrix2m28bwayhpvrh5xtwmqnwh8l44y8fnae497zv9pd7rpkvstd0zkjdi2qxinytdnn2n0p1xhn3fpyxciknn9bz',
                password: 'qvi008h836izxhi2rgw15ydvddmf2qmveb7h3iurciideaorvo9d49oklm0m9xvoo4fq5hgo0wxhee94neuga99cz3i8tcn79ai357cnrj5mm64ns1pdc69ywurjj67ka4xscc9vqmxxxikfh4qtc8ivvcfn7nandd9r6hiq4offaaln8xwqenksl664eodedrhzj5yisfxlm68zoebmems9hpu2i87v53838t5btinm5b3bx5ljk9jferkeoi3',
                rememberToken: 'u16merwa16ysi1jaadzrcri98ag2usxu09ikn40r9aoewcctkffxj0rln8ebuvl0da5bznpcziblpeb75kpbp3vesqldnoz3vz9krtvv115yq32e0bsorxe0z63bilhrutzr5rg548es1grvzj0sd3pjgjmpc3lamfxe4ygbydzevbmpa4jjkyzys53nu1ygkcz4wa5fpcg3x5v0veaw6513iyb63lxik5sfuvxhiaegz3f5nada0wvax6hx9ry',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8643fee1-d7e3-4be8-a2a1-d6893d000727'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/1475461b-1b87-4060-966a-0f40081d5562')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/8643fee1-d7e3-4be8-a2a1-d6893d000727')
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
                        id: 'dcb31385-365a-42ef-93df-dc8ad6fb5cfa',
                        accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                        name: '6zhazjnk6beok5f7vo5p9pyv54nhbclijs5m710otr51wyidu7pjifxwbxc7kmrq6jz63ok1m5x7lq20kfhe80ay59k8xugurhxom5tl5tqy8qur80bsotn29wgw098b1fb9zsfdtjlvwnxl25ukgyewq1m1nyermin8gexoir3emacu1h8leznhfvtbqvmk4c3mqwahluqqoofkfs6wku872ucpjp4f4m1okkyvdkfaxp2g3onv1gzqqmhh52m',
                        surname: '2vr4v5tmnb834qdohdlg6d9fhpwrl5qj10xtpyvzijzwky5c1pbnagb61ctvtcebt1vzcx5y12llzff1ylu8b603pw3lo8x23nfwaw97mcoosxxsol18lhjw2hzy4kwpneql7xuv2wvk8ty6qa0aqb4pz1sl74x1s5q01em0tg2nd0r74bf7s7i4xlsriyh4h86o6qb0837kv5e369n8osyhg6rk1ccdwjdmtpvevlf361laxcmmv2io1rdzcwe',
                        avatar: 'vex5jezkquxg686xrl2zx38n5jzigld3mo7oefq4rd3yj06ch9gqk6b63n4pr1qj3qvvo6yoocz748ah8senaw2h8y9r35g2lzh4tydtzz5627v4vijtv9ba8ee1l8typ9odojp6s3vtzupldvu365uwzvznsma226f8ivpo92apfsr544xogrd196idij6mysqbusaa3mvwdnc9eak1xrwp7wwkzivxw0hybn5i36rzhcovlk80rgraww88koz',
                        mobile: 'fknkbd97pmb3cshjv73j1yftl1m92lu8rzozzb2padb9g5bhijcgcngwiszu',
                        langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                        username: 'u3oh4tnuic8sayfkdwpspuxde154yo13j5dyxs8dgaw15aj3uv66j8738ls1ep3xw63l8pizbaug2i6o3we3ddurp5n2zg3eltkh7mawma0a63rur5wndfrg',
                        password: 'jg44q40k6vrv346tcomo9x0mj789nfmaw4b6ybq715gngfzsl0hoa2anpe3mxltii6bfx88jw4ucx1qt5myfc85krlai1q6b27rngnsl7rj5p5ja03st0ww15yopirise1crt83tv4tkp4m5etmfqzuxw6ev8zmuxy0ahj0qpqtkqnbzp18gcmf4kek7gad3v05kmx1861d78htiwcb2h7k3h56k8h6qtge7vhxq3716mvjhns2p4vfjgh19t5v',
                        rememberToken: '99ydbiu542kyk02gn9fe4ce7x3zflcqy7vh68307ptmcf32x9c1hd3b3wqwwt6ladq8zzh0908ce7hn2dxhg9f8tavmanbpx7x5tqfoeiv93197tb7bl593krc8g4yeao05rninphfhd3nkmm0uj16l7lbbzd9wykf4jzj3l082s6ubb6l01k13fvfra0vftf4q91tsxrnbecwjiygtv8t14kdlc8xsyrfg8o07wl04c79fdjaneffgnikoq119',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'dcb31385-365a-42ef-93df-dc8ad6fb5cfa');
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
                            id: '14b0f44f-9441-4c59-a23d-021dfcea4a53'
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
                            id: '8643fee1-d7e3-4be8-a2a1-d6893d000727'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('8643fee1-d7e3-4be8-a2a1-d6893d000727');
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
                    id: '69b05664-914e-4af7-b40c-da5fe839138f'
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
                    id: '8643fee1-d7e3-4be8-a2a1-d6893d000727'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('8643fee1-d7e3-4be8-a2a1-d6893d000727');
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
                        
                        id: 'e8b9660a-34d4-4594-a527-69b493e6b7e2',
                        accountId: '68d8d034-4fe2-4dd3-85a7-8b25da80da0a',
                        name: 'tded4vzspahh3g38qk2d0xjeu3j8ff8qp1zk2m7o699zr61zg0zewcnwqfumummzrc1vl9hqi09cd11kmfjn642gqljja548h2kh3seiyshzmpn9ddk0ridjc4tccs2eq3rshlvj3n8j2nd6x0tdaxkt80pn0xmigh8ldm6borg98okl38ghcdhk29n4he57lb734hut903s99keiapykwjyyimna23n34wxkdt5w8icsmzvq12vf5y792zksje',
                        surname: 'm4djkggkiao99y1jnh1hnm0oot21brgvqnb7yy6fl58mxrb8dsjqddzpfuxjfslpceaab89qpmaj1mav27sxms5682l0pxpw0qgec5ny5otn2wtw2aucflgqxy1f7jjt2hz10uaenzfceulqg77hxzq1tnhvxjr56jmxb6g47kyf9swnd8qze875lhf8lqug3ypcn2lid8f6qoo2f01qj5wjqxu3ukp4f59pgd3zm7mlavlfemom70f1ijyu047',
                        avatar: 'xkl074zyswbovhknispa3o63i8zz0qea61xwbmrkgjjgf1r4tlx77be0f8trz9xqn1wrcczynkxz5hijm3wsxuigujeems2ym28rpdxerji2d1bc84u181nosomormbc38xni9xgn93gb958zhrdldn3bwv9k95uw45mouxiphyc304qwnxcznqk1o3t5gyakbklgbi9gtlf9cgtilqtbndlft4d5pv5yawk7lg4m91fwfe8om7ibmw6ugv1bhu',
                        mobile: '89hidlaysuwmneiwwy2kfbswwr2sgvprd5re1zmljsy97zjw7mp6fanz4t8c',
                        langId: 'f12c0397-207f-4b38-800e-bb25eedd532b',
                        username: '9fu55euze4c1yagqpk1r9y7xksxg3rw4kq6toojan45ahh44abqusvd5b2v8pfyho74iiiepkxq4o8nua9nn873p4mju7tu3ya1mwydi7vrwag4a5z6gpr1g',
                        password: 'w2u97rhbjfinfkwkji3qmk19a8e1gcfjcvfec3l2p1vlep5ft0rz96megjgc6iw9wfa3fnfz3zwzkj1d0c8yxnh1qeqniiq0u3t7js9f0o4raq418yphauxa2rfvbc3nwny99rw1ihbf9qvosmsralfpxcxey3697w2rhrv8ab3p10nnqgwdatb5ehex4kmzlfwnscrdi5jozk84bfnnb0ii9itgvo1tns3xrgjwid4jfxzbtyiqn3sen3eehyv',
                        rememberToken: 'rizgsufm1hho266y0rd6zj82et0pfixoyqgxqmklimovn18m5ys5tysxze8ryur8o5bg13pzkv3e68jdp816s73lbi0yy7p2xj2bsm1ue3zrtj9bkhs2lox3foi4wi14v5dxl6im9qf9hpvcgnw4nnm6gscl0uupnpf3w8dx9amvsfszuvwxotc19zqcyogbrmsmmjk8rnjr0vqn36jk1jaaboma2gjbdey3qd082nhy6wwsc51uvk57dhliqz1',
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
                        
                        id: '8643fee1-d7e3-4be8-a2a1-d6893d000727',
                        accountId: 'cacc4d67-f628-4487-b8f6-634ef9249cd4',
                        name: 'k4om1z2g8o7whvqc916ft7xevpvwgfewtggmv1nsirsnad760f9y20blhzhrrzrrams95ytev55ltejknrd7olnjr7xerew2kajfjxatbd2x38hee1vwq18v3t8r9pwr614j4ngsmmuf5nyigjnv2a3vkmz3fpi9xzjke5fh1rltusz591gap2y2ytqyda1rczleb6onpu5vibrofgktaqfnn9zodtorlhph3fg1jo7ofmn05pmywjphmjd6ty7',
                        surname: 'v734aij1aiynehephxeqjlm8jylhidzkdcqbrfy5fchgg0nzg154fb2lq46clsd4tzcjz37vfkztfvpxrivb4tl2x58cnbkprgoj9f1aeymt70pi753ycodlryzgokbzapqxj2jjimi0y4j9i0hfrlfw1r0p51o4vhydtq6wz7qheqw8k7hxmhhisk7m8i6lyitdem2juhdd1kgbhonaty56pmj57okgwfqwicc0f0r3fnv4xfiluyfx462qyrm',
                        avatar: '7zc0vie5j1x4kev1id0tap1vhy9666qvpghf99m47hnsh6x4cyfkj4b3yndg4wz2tp23sk436801jdr2tore524ok14v5vs2xo2o1tvnlviu9ehvx3l8pxowbihko6z519ie92hwoksqsp5dvcjk55mi0qrgj7s9esbnjk14l4djq1c7jmh3yzxj54l3lyjcmgiphpd7cvy19nrkng4jkjev7plwi9y27e6kftpj1c1dtyknqbbicuoimcpjd57',
                        mobile: 'yol54ifjre0rfpnhsu73300qzgq75bp1cmze93nir7z8f62vnhmphm8uhh43',
                        langId: '470e65fa-90aa-45f9-a804-c8eec0b57570',
                        username: 'taytrigv1a1pmisxn74jyjttdkabfnzhaejiuehjfmuwih01jouoi803ll6393bp33mqhahdpnk8bon2aqgc7bw9qasdggkzqhktfqlitdw63o8hxmsk4svz',
                        password: 'uf0y0htvjblivxfhvddqemqnghdk2he95tqzl3p8p8xorkrahfqelaogzuhrzrtodzc23x1z6pua6xw8niv4jpdx1b1emlrpn2dgr2iynqogynn396l1l9zobmyne9rgij3qsf5kb6r6fl39vp1cl0vdphed3y7l2ansjf5donizcke88kobnule20u5arqpzxbldov231p0c5vc3v7o2wwc702pmzmpcbhk64oq8k9c3rirqrbv6w10tw37axx',
                        rememberToken: 'v1r23zogn56zymnifatd0yh84c2o2lz6b4ftarp1myrsa1877o482dwo6fndfcsqq4ug5xyticlce7iny1yyrxcvkcvz6y3ksulzwlml7p901su0uhbesywnqev8i39md3ff0u33takudf2wzen2xzob954hsn5bc76fj04129huv71dczjk28jz0jymw16rticggs09tr72yzsbgl61zw1ge7d76xpt5cdoegh4qlhnzrj5kqaka1j2hdbf46b',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('8643fee1-d7e3-4be8-a2a1-d6893d000727');
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
                    id: '42c607cd-c1ed-4cc1-8a57-bf8900e4b2e6'
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
                    id: '8643fee1-d7e3-4be8-a2a1-d6893d000727'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('8643fee1-d7e3-4be8-a2a1-d6893d000727');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});