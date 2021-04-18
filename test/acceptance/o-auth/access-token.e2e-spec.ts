import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: MockAccessTokenRepository;

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
            .overrideProvider(IAccessTokenRepository)
            .useClass(MockAccessTokenRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/access-token - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: null,
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Voluptas consequatur consequatur et voluptatum reiciendis qui tempore. Inventore distinctio corporis et aspernatur quis minus totam natus consequatur. Dolor ad consectetur facere iste ex. Nulla cumque et facilis.',
                name: 'mqxo20ed6f4oy6ajvtkmw9krpxxf0uk8l5styzuqjwmcs18acb75sop9o29qlvydjrqofvlfrgxajxwmurgj2teefts7ab1lz0wb9iptoiem1ygy0jv98vkhjt459ghqkrp9cm400njwufybavgtiboxocn5g4rvitxp728jjwfdo854gl3h8ryvtb46khtwfmck4ye5q056srswzzdlba5pvg48tettzzj0fi0ipaz7auyssybnm05hzdv3lmq',
                isRevoked: false,
                expiresAt: '2021-04-18 13:46:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Non quod minima eos cupiditate beatae. Ducimus qui doloremque aut. Rem aut voluptas et et quia officia assumenda ea occaecati.',
                name: 'umdjx7gymvyx83k11r6aqkpyquyk89pye6qqj04swbv366rqhv8si50rs8oxqdtyttruayved5zpz33sowwgcx0yachsg56gujckg8uejy6bij9hroszokauyku5ovk8m7571lnpe5h8gsf1zyhec5795409vojcuz63fmzj2z6yt2y0o9gcjlqn0zkm4pbbpn5fj84kmgb4y3u154zl2u1jy1g7ihl4sahb3e8jlxy8x87vt626hiwxn3e1xsw',
                isRevoked: true,
                expiresAt: '2021-04-18 06:07:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: null,
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Doloremque nam recusandae velit ab laudantium soluta quod quo. Repudiandae totam qui non tenetur quos deserunt saepe commodi. Quis a sed quam. Qui officiis ipsam tempora in vel qui delectus voluptate. Quia aut ut modi et.',
                name: 'cv6xlxp681yezmjxphg8f9scbeyh3lc5vt33h6ejjdhuwy06sb2c70blucguuuk6bk6wbrscis1zgxncswpp9mffiebmi5597cdp5jii1wtdszaxr87h9wr9q3wgagh29li6qd4ixna570vn2xslekwdes9b8m6l7hq0eawk4bavmfiasn3sa3hdzi5cz63z1vek375f93x9c3r0tcz0gj0ps5ck57pvgtdtwzjksixljidq1r9cuaqqei0cpgy',
                isRevoked: false,
                expiresAt: '2021-04-18 23:42:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Possimus ex saepe est doloremque quis nihil. Facere vel aut illum illum officiis ratione voluptate eos ut. Dolores et officiis asperiores. Quidem beatae sed non quia. Iure perspiciatis autem ipsa adipisci eligendi vitae. Suscipit et iure.',
                name: 'hluy6va76d0didniwtfaliwmit58yl35eq5xpu5xnzvsmcg9ogkklslmzccz46uf2hkhna98kg3vhrvzzsgcs3wv66anx32lak6gdc6dca9zzbeigu169dqh39b9wrk9azx9hlzcwpvqmjuv9rj46g61wl4de87pr36mcy45ut8jxhc23pme7prl3mop7c9sw5e2kd9uw17dzuoeende32u8qontgjea6m9y2lf1556g8opld92lv567c9kj1uz',
                isRevoked: false,
                expiresAt: '2021-04-18 05:21:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: null,
                name: '0ouzi4tv22wcz6ixlvlj0xecex5k1kjwl8ovar0jveyfwwmxvjmrxfv5eewcikgdrus5y0s0g1t1nknbyjigdfyw3j7eyzgwpkfna5prs3n1ves1rj517fspib1u0u3fsy7crmvy0g732wpvzbrgf8dzqt8qxsq6iix9tvevos285fsci99orvklrvnhw6z2qdh42ugrm6wdpdd94wrxwb29w5f5dga0kjbkanbk65ywt31hznhurlla3fp7m90',
                isRevoked: true,
                expiresAt: '2021-04-18 02:56:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                
                name: 'kmet796t3z6iaym1kd08pbyap1tlgwlj3v0ngpp8ssywjl59ybwjzfofjxzyr71vq0smhogajfmhdh781w6slwn45o5spsky5mf757wih2zae5b8trd4ym8xqcilg1163wl3xyjmdb4m7zzrok0nl77fb0h7lqkunwmp98b9rjx89wowlhsije62g761i7c048gla9206k32omeud7kb4e1433xg5s4x6rh7qef9hzskop936yumi0or113e29v',
                isRevoked: false,
                expiresAt: '2021-04-18 15:20:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Iusto voluptatibus quo aspernatur adipisci mollitia. Et aut nemo dolorem nesciunt. Dolores quia tempore quos. Ut corrupti eos et. Nam id id odit quae et.',
                name: 'bkg3xklbqxzq4v30knjpdrx6rownkceg20hhvydri3t99zgzhh0z3h7z4zndezkuzvkezogaoyc0ukhjln5gzy49jrfolne81muoryexvhf4i4597k5whmk0uul029bgc8vo3g8qaqrym4qyopid9pubcng775wgj1gt31usygyymt0cfo2n3261a75ge52b3whcp78gq4vvfko623adje0wfbd77cyps0vtzsoliwlcdaltpf9cvfs2gmikllu',
                isRevoked: null,
                expiresAt: '2021-04-18 09:04:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Omnis et laborum incidunt totam consequuntur consequatur in cupiditate quas. Labore suscipit est odio debitis velit velit. Architecto dolor rerum omnis excepturi ut ipsa autem eos. Ut iure minus. Nulla quia omnis sequi repudiandae ad voluptas quo aut. Deserunt ipsam debitis consequuntur architecto aperiam.',
                name: 'imb9hyvqf7a2lxbzl7qkp3s9algjkmw9yrv4ebna8yoec17mcpt9wmol0zagh9w38ris3694yjqzthonah24yiim5fo4i1d93gzlnioac8giiftamu09tb1ej1j4coijwml4hebnu764bmwu5pr27gqtrla40jcgyi9k1t4ex1e3p6qwda0tn1y57bog1dm1vszo3vs9od3mdonvgll5wp3vbzkgbkpdtwh7k8czoo78ezwa05e6ibdo5ebg285',
                
                expiresAt: '2021-04-18 20:19:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'qg6u9imb9nlolvs7fcydw6g1o8fan9syvs2yt',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Aspernatur odio quia vitae. Eligendi eaque at distinctio tenetur itaque. Unde dolorem unde accusantium voluptatibus harum. Hic ratione recusandae delectus maiores molestias modi repellendus ut.',
                name: 'fslkl9b5fqqnkbdon633is78v2v3o1foyr98ltekg7udrjac4nx9q9ok2r2x2utuwyfcz5avncnaqkt7e0rb05iec4a5pnsu2mc8evy6ik0n7etyy60hf1bzsvaf2n4soid39g8klog6zxlz9t7ys0gx0jfcturb5fvp1n8r9exoi94ysh5oyg76vqr103h46o2rnne43pyn111ch8s95so7hgfcva1htr3w5kqp5f5ftcezwlk5nu5prteuo71',
                isRevoked: true,
                expiresAt: '2021-04-18 04:23:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: 'vlxjdg70boupfkaisyj30papqrqpu9z5xdfc3',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Fuga et accusamus quae nam ut est et. Nihil sed non odio vitae neque qui tenetur. Et repellendus ullam harum. Aut ad magni voluptas.',
                name: 'vnq17ute3o5m2hrp2cqg1q6cza2zzzsf4l91a2255c9rcavy99hnmm4azvfni2xpz8dn8mcqp4icb5xqlmm3d1qfh9pepu21hybhik4grbgh5wzpvonghucvhy0y0es2siyz4pgze011y4davioz52pqss0p543k7jdkj54zeh78c9g8ge5li410ji0v7862vx0tbm81n5qxq1u3a2b4u8hqutt95aegzvwexrrt9m02s7cbqira9qsygozpxv3',
                isRevoked: false,
                expiresAt: '2021-04-18 13:08:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenAccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: '5kf8j5jcnpgzowes7x22yq81a4npa8t5da3at',
                token: 'Dolor accusamus minus amet ipsa mollitia et ea. Voluptate non quisquam officiis voluptas expedita. Animi ipsum eos possimus. Eaque quasi temporibus amet earum sit aliquam. Facilis sequi rerum. Reiciendis debitis nihil ducimus nihil necessitatibus fuga itaque quasi unde.',
                name: '0oilcvnteznnmzh81oxw70tj5s45d1hzemxd12gtwp8nvhmdd958zkkugklmfktxacrnx4rv6yfefwvsr205dv1bzv4t2d4kot52vzobhjuokuefw2ylf5rojmg2cpyads5exudwuixaep6ynceo0us51ds945kwc53l4blkbzuw686n2gw35nkymwmw3zkd781di4t1baq53s2h5lt5n7l3c52puua014f03me0u41n7a6epd2ifg4hesfdom2',
                isRevoked: true,
                expiresAt: '2021-04-18 22:02:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenAccountId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Id excepturi et est est non veritatis. Ea suscipit ratione ipsa rem saepe deserunt alias et enim. Beatae consequatur velit aliquam pariatur perferendis quia quia velit.',
                name: 'qr2fqtw10f3m6r4lsxo2m4ehbtj1282km4xdf5cwdmmgbxfghkhhkdxtw8xud0jbe7nm470jx0j4djz9fxy5n9gq9qva05wug61ymp14c3k9x1kdcdpyk4dvw13zxcudmbb9u57iex3m95mb6rgyr1i6qzbaqqaj7igtkm766r1v9clgw1oqyw4mtiu3y4vb045432wnpxd3dq4t6xmbf60it5ucg11jvdxsvzj5i6w915ucsx7ygkakejhr6r0j',
                isRevoked: true,
                expiresAt: '2021-04-18 21:49:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Et nam et. Incidunt est aut. Quisquam ut quis.',
                name: 'qbrj4fm1vhozsxy6hw8b03wpkeyi7wq8tc56xm52h889q1xk9bc5zf2sok0f21gi56nbiptzysntg3file2k31q1sia9nn0hlsfcl7lzdu4xe0ml9rgr52mvoxz5mlnhrtcm7qbudobrgd3mi501p1h2y10gi1k09ub9q7avwy2fquzjg2jnfsjy5p7nhcztbapj3qx880du2agjyxpjhayn8o29gae0m0od7mc8ubqnv7wruox0cw7po6c07t9',
                isRevoked: 'true',
                expiresAt: '2021-04-18 06:31:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenExpiresAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Rerum eum soluta molestiae. Aut natus quasi est aliquam. Et quo fugiat deleniti sunt harum eligendi veniam. Officiis saepe qui sequi numquam.',
                name: 'v4zh0yqlph57txysaomobhn0fg1urozw06vowuh2ewpwgol5g7anc0wbnwswz3olnq5ksogtfsw5hwk7uxmu7anhr91mhspnpayjn0n5gh7xlknd51psveddch3fqnmmka4wug7xwer4qpqzim78txiodmyib74d3w4zoag1bsnzjhnent7gl2q1wjptd5h6rotb1rwwfyvm6shssqx81pw5af7ar3wds0ipnpmy5p1vy43uoe5fjv8a4qpn5wo',
                isRevoked: true,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenExpiresAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Quidem fuga officia numquam dolorem non eligendi. Facere quia qui. Eveniet reiciendis dolorum qui eaque enim voluptas recusandae quisquam. Omnis dolor autem consectetur excepturi ducimus.',
                name: 'plgt7di84p0pao9t072tlq5iskxzfi7noohpeez2kiwuh5rvohpszdyahadcw1g1cgl0yx76r92d6jtdghkxi0xzlb70xmbcy0vqshwiazsif22tkz8junnaxksteovikhzfnji3nogeghrs2opbcptgogtujsqytt8blb3ximfwhmpoz2p7mncow4zk049g9z3sxi70poxb695xutarnvlgdu5xd6nautga174rrn5uy2f4eloo3bxscuiudmm',
                isRevoked: false,
                expiresAt: '2021-04-18 11:33:52',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/access-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens/paginate')
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

    test(`/REST:GET o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5fd2d1aa-0621-4ceb-83f9-8f60a3aee9f2'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cc8ba8dc-283f-48ae-9307-c4741495ced8'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/5144f999-01c0-4435-97d9-ad8a2dd465a4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/cc8ba8dc-283f-48ae-9307-c4741495ced8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cc8ba8dc-283f-48ae-9307-c4741495ced8'));
    });

    test(`/REST:GET o-auth/access-tokens`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cafb5768-fc63-49c5-b623-9d33a715d9fa',
                clientId: '0c781faa-220b-4c92-a019-59245c8aae34',
                accountId: '115f8a5f-8a4f-4cae-a50f-b0dddca68698',
                token: 'Voluptas impedit beatae quas. Sint enim sed enim modi voluptates aliquam. In culpa voluptatem enim enim. Sit odio asperiores adipisci perferendis. Quibusdam quia doloribus voluptatem illo sapiente sed dolor est harum.',
                name: 'ih2thfm9sj5td2aite26r2lme7wg7t2xi2t4mn0e0i2fanipquocda157b1w9icbj6hyri6jdkvn8j09xixcmsefl0ztrim5ppx4blvwg6yj61p7n30cjfhbd3fixqt64o41fx1412q28n2x2nq4v9i69fpn7att64s3kcj2ph5r5mp2jbw1n7u4btnf002yn9ewx97ssh84dg9sey7ry970kxn2kfgmwwth6pwbptqtg1czlyh1gypi4123hkw',
                isRevoked: false,
                expiresAt: '2021-04-18 10:34:02',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                token: 'Sint quo eius. Quia debitis autem aliquid sit velit sapiente qui sunt accusamus. Impedit aspernatur neque et excepturi porro labore alias tempora. Molestiae cumque quisquam voluptas voluptatem ea ab odio qui ut. Facilis rerum voluptatum rerum ut esse reiciendis. A voluptatem odit mollitia aut.',
                name: 'i29bonioiiv8m90g9u1uran8pnsqxyihtwsgnimwjz38vcshno6qwkpkghycgdjjh5obsvvjwckk8xp67e122cj88u4lkr6tuapcoukgjtymhmjd6dgifprsde42xtg56bykxj7n1t176uygji6g0vysy88y8d8broasly1jcsspzoo42enuwbnniobocy98n4tkzhqwuja5e6a7boc7rit9srwgtmrzm58330vig1z9dx5qe50uscc9wzqvvtu',
                isRevoked: true,
                expiresAt: '2021-04-18 09:56:29',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cc8ba8dc-283f-48ae-9307-c4741495ced8'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/2e443b13-b3da-4c3d-a9c0-67c56e3d7d96')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/cc8ba8dc-283f-48ae-9307-c4741495ced8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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

    test(`/GraphQL oAuthCreateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '36cca6c1-094e-457e-bcbc-7fee9a2d979b',
                        clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                        accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                        token: 'Fugit ipsum inventore. Deserunt et quod ut. Impedit ea incidunt facere ipsam voluptates voluptatem quia iste asperiores. Ex distinctio reprehenderit qui suscipit a voluptatum adipisci velit.',
                        name: 'zg2s7v9n7ks3t57zgttpqxlvwoq00z8fnt6l4fmgsez9nj3q4ldw6yppag9o4f8xhfs7cxp3bbdko31wfm3bzt94cgo7hr94xwxvaogqblr2fg1hgv6sfp1pikfbymwfx21h1gstf52gly8o3z1lpkuewvlbmi8plh48h97bpsvhhvf3o7ocx2qmz9dy8qx9lp2374qr4z9j9vo6ktxo43tjq52lb3hcp914ko533d19akq08uuhgbk104rwhok',
                        isRevoked: false,
                        expiresAt: '2021-04-18 08:15:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '36cca6c1-094e-457e-bcbc-7fee9a2d979b');
            });
    });

    test(`/GraphQL oAuthPaginateAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateAccessTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: 'f560b79b-d40c-4feb-a831-59fe398cb3fb'
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

    test(`/GraphQL oAuthFindAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('cc8ba8dc-283f-48ae-9307-c4741495ced8');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '68d82010-da17-4d2f-9e56-f56b876a807f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('cc8ba8dc-283f-48ae-9307-c4741495ced8');
            });
    });

    test(`/GraphQL oAuthGetAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bb711fac-96be-4e8e-ab1d-823c1df5dcbe',
                        clientId: '95a2cb30-44c3-4174-aef3-cecd81cdceb5',
                        accountId: 'fa5b4302-ba8f-4e1d-a89f-a42e45b5951b',
                        token: 'Quos in tempora maiores non qui non ipsam. Est consequatur expedita ipsam iusto labore quis dignissimos quae. Aut qui sed laudantium modi suscipit. Ut dicta ea error veniam. Ut maiores nisi necessitatibus labore laudantium iste. Rerum natus in illo reiciendis sit aut.',
                        name: '1alvsmrefwr14l35y430fi5l00gx7vzviepnt0ubjoljcrl742qk61fo4e2t9h9qz3jf5yknbda0j60nzdn92n34vjm1reysgucznubs5znbzpwl95vnskvq02gc08srhcfxns980rp1kpvj7a8ht7cra9ojwfiv7oxjfotv8ka42fksnd6tbqbdgzsh1ei0ntybjtjri8kmwh3mjpfhpnyzan84bcp5j2p6vopw4gxcu7snj0m0vt18z0ybx0c',
                        isRevoked: true,
                        expiresAt: '2021-04-18 22:53:46',
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

    test(`/GraphQL oAuthUpdateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8',
                        clientId: '1ce273f8-fc88-4fbf-acd6-b198df5c9dc5',
                        accountId: 'ff894745-076e-4101-8a49-e11b9458d376',
                        token: 'Possimus perspiciatis nemo numquam. Optio quia autem error vitae. Rem dolor aperiam error voluptas earum.',
                        name: 'z212wkzy4mxuq5gfzmt93kqz1eja952onen1zd8mqmobl59zvd4z44oesyr6fi33769w2suf1bmah8xl11xsehpm2hzkwdcqgb12c0rjponk1mq7yx78w90pdt0a19f5d09nk1ludxeb6r3wboz1nosbgudte98bw0mygk1tbk6zu3g9tw7shefc5k8gt70wzd7mc57b9dkgxmf316ket6hhuycxpf9kll0u45zv9ozwb9uxo1mqejlx6jdnp99',
                        isRevoked: false,
                        expiresAt: '2021-04-18 03:37:08',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('cc8ba8dc-283f-48ae-9307-c4741495ced8');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b8cf7750-580c-4867-a09d-0b4dd7257352'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cc8ba8dc-283f-48ae-9307-c4741495ced8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('cc8ba8dc-283f-48ae-9307-c4741495ced8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});