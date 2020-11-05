import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () =>
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;

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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST iam/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'fchfz4ve09htozwptalu8brwec5albmgy24gijpeg0mp8ihszsqidizan7mpcahnfrkkwjyupa91div3e0uo97k9ji4hwuu71yae1ety86p6drooegdioyjtmeokog650o2kw4a4ev1s2g4rdhv6q360nw7bgr8w5dt9o0qq1ufjm0t98em1vkk399x9kpi504lfflf38d83ykormz4vseigwtbqpir7ct5uy6zeqorvynsbib8157bfwfxam0k',
                root: '2y2dzhh6l83hjse2vrz9pe7f99nj0g',
                sort: 778013,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 't0l7uv5wpasn5lfaj1demt5wyl6tb5nvmyslvhlzkluk2mdsejepi8mqlqq6paigaaugbirjy1u21pwqjhtm9m7kadulwv6np5x7nimm40vcsdee48r8wl04ryv2e4twcs2h9ruaqrrnc011o0zu2friy6ql3vbh2r6429hpxo5w5fpafsdi2c2xd0zyuthtv6e0w3k442802dcbu1ik9hunhblsj4f0ixi79pqmfrnql21p3thkrwv75pu0958',
                root: '9zwyxy1u6h38imidwm4r8bka5jiboq',
                sort: 582379,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: null,
                root: 'stxbdj2qfqx5z3bafz2flmb7k9rkwx',
                sort: 803262,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                
                root: 'ou5fjk7wokh2q00qj9xr5wa0tddrom',
                sort: 503664,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: '88bj5g5hee1tcoxerlzxz55bqn9ci14fj7eqvzl149hatkhm7l7u7183zhltt1o9o5cpgwyit0m6k5dx3ww2b7u0ue7aycp2ajo94zin98rzo2705ip057oxjp4dm231f2ogugyxvfxlr61vh6mapzqgurgeworoqnqsrbe2ldyy3h2ct1i3n2dfdgrdffnit7w5aaqkxwqhumdcf5g7mhc2f34zxeki0rc0ea3s9chzvni5tn18ts64nowszlf',
                root: null,
                sort: 865024,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: 'ewcxkcsdm13h91ljtmcyv1luoudu9e20z5qhhms7q5yzorrff1aaz7j211ggnrs01kb27u84il9um8uatdqc0i3hpri3g7g4mkyzs8s9t3u11ripeihu4uvj6s2fvx6kwfy4d1sr0vvjodsew9z3u3x126eypwzn0jxy0jhh082zxxrtmc5luzg9b9fxqkaos8fgqqskor02oe73bf5fg7h9ha9yl8r5f0fucq4pttpo3q7v0hzujmqe45l59sw',
                
                sort: 977910,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: 'ht2bc791va10s30u7m02wsc0xsvhsrafe1yy824rkvkqgsjyh5skvkp8dyjvng92u6injyrl3augx52uvntcmxpoxjxmxgnwfo0xx9zhu8vrcum96dinel1p4d7ix55xphnxmsj2vs0ohc7kbo4yz4i471t55nknriudy1nxru9zqgp0wz99neyr65h2fxa4h37yb4wdpos4vmfmkmsp6b6hpqr0axo6d6kh5nxow4h4qw3qy5d0y232qhmcd87',
                root: 'a37qhwkwkqx09g0ynwo0rnvn39b552',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: 'fxga53hwbj749t494zbsyl1noegva7h5qbuakf1gsa3l0qmkfo1ex46xyy7df1cwurndpof93rvzfqu6wwnffm3uah6t16aspaxwczi9ubv1zg9czk4lx684v1grgm16x1t3ldlys4wwinr0c7vof2fhtkh7spngjbhynx1lbqeyji9e089y4xrk2uymvbfcis5kp6e5q4cvffc8qnub101hnn0kjxwhy8jd6jomqenhe95w7vdsurxpeio565z',
                root: 'nmd4m8f04x3rr66b7rwx0s9dcc1k2x',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: 'og6rqmbgbyx4cezhamw4m53dwo3hbu3zzo42zjhcw84z0t49akvgnphy1t1hz8a1lhfu5wm2y32m4tdxq35i3osxwip7lop1pt4bfzv0eakyapauldmv9moorjik2e46ozuxg10902yk0din3lq3mhvx8pk8xubfcjd30y2cj1oi7eavu7t9tiyroms4svwfzir2c5aydd3tjkmo373sww9ltfocz7zaodrtsybxbia3nilr4x9jcey5v5hc1av',
                root: 'g4peyre4ofbxbbty1laka3u72sagig',
                sort: 707151,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: '0304z8lle2n13lpiboxkved24uepevd5pgckrc2dqloygklt716ofwq7p2il8s4uclffg10jnkdu24sd1uwcqabqzmfdg102anouvmw60evdhx9b7xxc8n1hl9ja66j3c1ijo4oxnp26v54jg6xxjx1kaz7m6leeqv5tkvv05of3frxek5n7wgcbglmgupzcvg9aa454hqre4fkx0sdqv48s2k16qzhsrj7cyrlb9x7cjvmgada8rbsz84jjg4c',
                root: 'robe167d1poysdnfybtmzxc2bz3som',
                sort: 280942,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'vqur5mdkphha4jooahmory1747plyk3f6lhiw',
                name: 'jgemogstsxytjkwfa303g27zy8mz14n52tvh8qrgej6whdwxcz2xj9npc925vbwu8fs0bqgyobawhgqxyr342fmg1cp1wr2c1e5abg4hog4oznzcgbl6v9xfaumzuii5jgd5t8cnhywyj90yvvrs6nu1q4rimwa3ga7e8g1i8wt9pcd3i1s4733e29w572agnm7fs9jtbrbotgshfbub3y6doljq1w85ujvm1vgcdze9qp70o9q3b6bda35kgaq',
                root: '9zx4ezz1mvxe6vu2nzcyscg6cqur5c',
                sort: 341114,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: 'nw7xwhiqf7owa0bsvwfft8zz3aclylfbgpyuoxcxi993ucl5q7s9nwik718hz5tb34q00d4o4cyiitlmxfvy5dk38bw9bk3dmgq3bqffdb7q6tq60h2qcoqvjbjxw07b776cbsm47brjkf4etq439sa3kju215y14mkfwd6wkh2enu6rtc3c5pbo8pmizjue9bgbggq2fn2qmun82ls9w5g3p83ay8ohrlj0f3bvc2uvkk1w3wj7sxe98ivdy33u',
                root: '99lakrk80987px4v534errm9lx3vkf',
                sort: 713049,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: '8tlgmbcizp27eq5n2jouodlhg0pfwet3whzl0nptgmjt33ekfswpc12pydj7xa0tivtviyq85qsgp1v6zh0vkurjsu7aj299vl7w38ttzzxgtrwdcstm4kqdkhz2x3ksx52rad5b8w0gxbh1y0ztjc02ct29jd8pqte6f5oas4bf4rq0osg5i6doot3iuiskoxsom3v64lkeb2c77hgz1h1eybb7n75r9dntbd6n7vayek3qkfljtyiphbof0i1',
                root: 'sv46egrlldwv2m7wl7i9kq8n9ejnbuk',
                sort: 385923,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: 'iorp0rooo7hzwtvjuoh5bqfkblfmd89vyxt0o1mwc695rcibo1qw7asaj3176ack549dbbh1wncwbkwtzsek0sduhknu36k5zlvmpuqiwk5ndam17lrtd5m2z4dv1cyao2ktk78e05q09ru3tzyfctvdxys5nupu57soorx4d6i9swop7pssip2ibef1mk45e65vu4lrnh01vimjul8k3d7bx73vozjhr411lmhi2ovgm5h7yyjahzqo93317r5',
                root: 'scirvopcq1ag0h4rmyu2cvrqvakyl5',
                sort: 7962659,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: '0pdm9tejihf07pthx3fuynb9sjp0ru4s9h5tpx60e23tfregm6cilhrzoux72evraa7zrp8ee84i06oq9xa160fqgv56pw4ox71yfpyjmjj0kisbs7xdyzh9l240fdrss2zbqkw9ijrhnrxubbnb5ztobfojyv7q68wxefin0zuzr2cx3io0p7bc2kgckcgkqifexsvlzqiii6u916dburuhr07ikcc0ljsulsuk87whm0ybyuid2d3x5tuz52f',
                root: 'roo0wws7oueunj304qqc79uoep0k11',
                sort: 938799,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: 'cgzcpey5akq8klohzus80e4497rpiv51hfh9k9n4fb6lnqss705ap0d000h3bf1rm3t6vxe3w1xhh258qts6ffx1dn5cd3qisifoi67rzd8ycks7vq0s7gjho50a9wizsqyewdyh4epw01lyiooa2pfbed8fxu9xw4zwz6dgkua1yoc38rn9hsv7cog0k829pet9vbqp3kvcgcz0aiyf41evaex901ykbotlou1jvmy3qvpkd94ltuq8mt2yx89',
                root: 'j32x8s8bblgt32db4ukifypta16kpv',
                sort: 823216,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET iam/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts/paginate')
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

    test(`/REST:GET iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a0b720d7-10ab-492a-8016-ef6928500f55'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '3a725d75-9b63-4bb9-93eb-59adb3d51208'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3a725d75-9b63-4bb9-93eb-59adb3d51208'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/c937aab2-9e77-4e7a-a5a4-f72bf4bdff6a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/3a725d75-9b63-4bb9-93eb-59adb3d51208')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a725d75-9b63-4bb9-93eb-59adb3d51208'));
    });

    test(`/REST:GET iam/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '87d360af-b837-41de-9d05-931b6f1857cc',
                name: 'c4kzi60y4mg4ecdg3f15f0yfyquh2wsb9kpjsrmk6xayaaoiws1k5x83liplot9uieigm4wtdq8dldfhaol14zh6m14t8artxpoev7cuvo10bsm0t9u0znup3pq3r15bhtj4g07v316akv1y93fwsj3yxr85vm9uqu7vb3s23xov7ta2mzsrhimdxaqojqoqtnyn7f5mgibjahoczhi4hpjmrp583y2ifksj6afid82z1dyy9crkqay5jsxg707',
                root: '63zr11wphk5fuc8onl1qg6mtt371g7',
                sort: 232214,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                name: '7i38bdqgmx645uvh1lutc3avaenwss6jyyncas46w7lj4gqq7wmdkfqseb3ugnb0vpxqe0w3fh4r65o3wjcbky41z2ho89ynjjulx2x34p7tah4x2a342e3fh6ctefjeh97kvhkqhe6njgjk1np0hfem2keb4hpw9fb5hi30s571x0f0s650i70wbw75tokunixtlqt39mt2q9grefmdmwkd6daxozba5kd147vn80gl19ar7ez948kzqacc1r5',
                root: 'i4a9dfx9nf5h87mfy987og11xksxpu',
                sort: 852408,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a725d75-9b63-4bb9-93eb-59adb3d51208'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/7f29266f-10cf-4513-a946-f726d47dc446')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/3a725d75-9b63-4bb9-93eb-59adb3d51208')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL iamCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '19a439d0-84e3-409f-9cb1-c82df280d010',
                        name: 'b7mvimgfkuzdj1zhq3xnu72xn8nri5uvidb3ium7nsq341qwwgyvytv3fa6ql4ha9orfn192cgmmrwvj9bym7mgg8212fp7sv17k109vb8k97336du1or4nd4um8qalo7ewrko402p8vrn69a07te55a1n3pwscdae8roqfx4rr9i6sf3sct6p51zf0ghv3zi3k1zxu9iv23vcqsft3y20kehq2tpqxnkzwoldgufc204mq3h2mx50ad8qy1coi',
                        root: '77ptm2w65guux91xaccfp3tc2acm6u',
                        sort: 581753,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '19a439d0-84e3-409f-9cb1-c82df280d010');
            });
    });

    test(`/GraphQL iamPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            id: '3635afb7-77cf-4618-978a-66434fe58bf9'
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

    test(`/GraphQL iamFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            id: '3a725d75-9b63-4bb9-93eb-59adb3d51208'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('3a725d75-9b63-4bb9-93eb-59adb3d51208');
            });
    });

    test(`/GraphQL iamFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '968f8bb3-e911-4c58-92a0-801a1ae547db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3a725d75-9b63-4bb9-93eb-59adb3d51208'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('3a725d75-9b63-4bb9-93eb-59adb3d51208');
            });
    });

    test(`/GraphQL iamGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '88788e28-3f73-4ce4-bce7-0b6361ee83fb',
                        name: 'a85kmy5pgrbh9h5cyzad0i3z8u3e46bfc7pg2m73pmjwj4d1cx07zwrbag7snf2rcohi7n5ne3hx7ev4ha20u2c4a9lyp9nl909bftou0gid88kvqauqvzv9irete15lib6u6tv8obt6f0ostv3pr6spxs61jtgthfoddgi29ts7wmg2372w23cou9b4yf1stfv4dbhhrftpswrilgjeq60l9pdcle51kjoy5kjvhpiru80ppi1k9wy70ygz2pu',
                        root: '58ycrq4khvy3mqd4f36g269xu63sfu',
                        sort: 348515,
                        isActive: true,
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

    test(`/GraphQL iamUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3a725d75-9b63-4bb9-93eb-59adb3d51208',
                        name: 'ah6aes5wmv6mjd04z8jqh715dg4r6649jxddv3qe59u4yvbtykndeo343flhc7rmgyusp9mamkv6cqgcdtv2jm7oihc3zbsoo4dt0vuqoku0lqm90kew61c6niwquuyjeq4d6nb30ges07vts97ymh1sxhghk0q6bethqtdxp5jbwztfoh5butuekvo6mjk7mn4qii7socblx5uza1pwiuwkin3qzr1pgex5z3wcbkdm6h501hnlx1ota9oycmh',
                        root: 'agw2ihz2zt1cjgdaki8pd6ap655v3y',
                        sort: 121967,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('3a725d75-9b63-4bb9-93eb-59adb3d51208');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e88e867a-2263-4571-b1ca-cccdbdad6c1e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3a725d75-9b63-4bb9-93eb-59adb3d51208'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('3a725d75-9b63-4bb9-93eb-59adb3d51208');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});