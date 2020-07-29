import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('resource', () => 
{
    let app: INestApplication;
    let repository: MockResourceRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: '23173we4dlz4ntx4sa2im5htvb1gnqzn4jb3sx5mt1ouga3sin3kbyngtytm8nwn1jki6j06hrurpfoqe3ewla2h9apqgc5qbjs1w8oj0gxsg2blflzxuk0crrl91nanw0oqgybdgi8s757586d5f9q6tmdu5l1issikyj80igccgwb0lgoh0zpx30sabkcq7f9txflvqw5kjgygnl886tmmu1ospun1s4g46ydhrsz6skx88aa27owp93ax8r2',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'iufm080zh3f3q4qmza2so4t15s905ztw5u7fv04wqmykzj7j1ugmksy40ecznvathh5acnvn4lel94sexz94vchxe30zrm3lvn2g0elspml40dlnwlob9pn3vmovdkt6y1tkzih2xl4bvawx4gxeg5whghc263x0lm4iii3nkrbs1sq6g2gu7q49vwjf6rkgkerlevsss6k83zc1tgm7qefg44gaw9km8tf8tppybfvxsb7erilzuevvpnsecfr',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: null,
                name: 'v1p4lcyjmm9jj11cvecxr4dnyvlozqfa8iuvx9gk5rg6cyvuvt204zpjcimle0c4m13jqqsqhe0p760z6qx8i1vgk80xyplh5d0a740jni4di94jnu6jl8f2lmbay0zs6hwktmzfddv2dp5gng7et3218ah6blwduo23gmukz7k0pfnsoe5w6e6jx4sv3iwtfk9li4kq54vfjy2txym9oj22li3tlb41pl47s7tovpmhhmwtm55dlrb8x1i4ikq',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                
                name: 'k6hd24hbaa2les0tcu5wqizw0ef34xh994m93yoxjjayib69htoa9b6tx089l6pe5h0v7ki14jqvtsosby8p12ecgle5lvf7pq55h96qxemenizk43go4tm1hsxy7ox0ke8tacq00xkfbenl1vuipismre7rd2vjytfvskjaebfzd91n0fn8ru40zbyekf82up5a4oaaij033qjrnf2efxp4vrb75gftths51ub22hte74n6j5203z9lapxz3bx',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: null,
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'vtawy0pcohlk58atc4p5i1mssh5ohoqseccuj18h6nvlufjppie6pxluigijqajnutrx8zm5wk09rt3j46jsasg1un593637nm6git8oc6foctxs0gdo10mkfxvepbph1rn1rsah9bedj3ia5jsrtfatskcpdawo9u7y9ujtkxyudtncx7co4rvbw0dh2galx10d4lzaqbkuw1canj8o557eew9pm72ukwdorr5ljbs229ro9osidi4muk8c213',
                hasCustomFields: null,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'xcddlqhjjulqwrwmyijdkuwbopdqbx0dgdavgj36d074hcuqz7xv3snwq4irmmxgcgcgri9rw9n2r8t3exlmef6c608h2bfau9neiorx2d4ckkxizlh1kdslhalzun4dxmu6lfobjkxbxh2kyd7wk1bod3etqfe0ceq33h6823zfqo7daifewqe18vbnbtojj0md2jyxmf6hfi3umcndt863p9tma0p1l5e1a804m9mpczbpj5pz1cqoc7vihhg',
                
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'pbd640mqfog29r0fpx293yoghrwoufqb87sp13v6h8hgioo8udv4jxbe10udng0yn06sr4hrlfih80dtpa71jvy34s39zdfmvdd8bp71jzza6fubvrfiftglvk3gsfgww3o5qnowz6oyiah7b7tcvhylw5e22hsvudnib4nv4f64e2nigyt226vcckbb9axtd4lr50heuik87nk9wkbaqmigj6v4oq82sjhmul6by8q5v1esvjkptuzjbdakrjl',
                hasCustomFields: false,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'vc0q146dxwek1of9it0xdwfsiq8r6e0h8qgjmbxpaxxm6q81eg02zbn9l0adcpgtf6gflv9vm6mowche8uwr55so64il0kc8bvuxeadsdo54klg4cvaeg52xx2xi0glcvvurvz3saa198jn4fhvhmaogf0sy772eztgeoh7koonspe1iajlr16b3nlc5oim1yn3fb57x9c9677nzareu1y0gp3xzcc92p8i5rs8mr4k2kkwngp1z5k98k5tesns',
                hasCustomFields: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'nh9y7t5rbqzgienynfkbi66dumfhno045dwg0',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'zv104ofpudk8qfcxuz07brsn7l952ykdmcsxae0b01wuxkv55sf9j6rq4o2ouxpfojmpomq01lr155r6qs2xnbj6l5d6bqtsr3kix11w0n6daiso9k0r0nkiq0p7k4xzdlcdryzfo7w5rwjklrdk9figcb4nxay8e80pod8kbsz4fe4x9fdyddzlddupww04ubke0dhrn47lrgrejofun2qwy6fn55o3no5e7wjecdmj6h2oty2k05055wgclju',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '7pneezcx43ygwcsm61g1zo09s1ylxcms9y50p',
                name: 'qclk0l9adyopdph3yd6zybbhlbxg3tcaxr2erxd3lyuee0xaycnkcf4g1ovn1snetakst1oj1e8v6datbp5l9k5ha4vq7hhvb9qty177yy2h9hn5ianfecaz6qlbzie9retfuw58ucwagyac0w88a39kit005c4lmah1tb1n68gf5t0ha3uflzcgff6ol3ycc002otgpib9v5165bbhpvwkqlrfohqmpwomuc6t8et7bi5paa3z6hyouplx6k1u',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'stv2ttpi742vgxpfkyed2i7nqxf5nugg7e7f697fzjevldavzxhg9wjjfhbjsqjakrtvjzyqjhi5fen4ya9sddpysdpwtvga37dameb5k2d0gv6c9zy1ax8jysat60e6g9m2iwwc2vedxoym8etouybl0wzzi5x1hl9mma9v0ce53a0tn89ju87m66bivwa3oufstqnuzhxussmqnb97r3eaeb86v7x6wzooag648oxnx9gzifs2gsvy58t7v3kb',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'swr1xu8gh7dupvytoss1be6dpddx3420u5cx0px8bsw2f9pllh27k1agg9b0woz9epe7mvud1dhgovgikrztlu6tbw82zb3sgl3teqv56iyr0n06pydznk81e7sfz7q2820ls5v1egc0xqtdrsnk122hpqhwal4hp2xyh38lmdvhx7jfjfpi1f0tr4q5beu5e0xavw36m7m1ofw8visg0ogogtrympcfxuneoh8d86oo3t5ocyl7fnat9lxwtvo',
                hasCustomFields: 'true',
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: 'q1hnl8km6li55wm19dd6fzkzyehn4xcwypdgf9ztsz4shnphc75gt4bohkjmhyar2xizldf8a38n8206ba8cfg37uk47j4yr93wpplkd9yihff45fmmzcek0lvgz4oyztlgg1dzl8vzyvrgm5nrntrrtbo77qo60sdn07i6y3odrkws5i9coxkf3cyluaiwu2hcd5tpmh0sm9da9wcd8m9egcgycu0ksplydw9rvxhem13ggbv4bjubo8tvx381',
                hasCustomFields: false,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: '7f2cmhu0gnfhwkyxcjbelpk2l7lls5z0hqrowiml74ab9kgpavlyj1qpxugwbyqoktg04jf4dh9lmtommbhgikeki91qbkye552g6eyqn544pwbr3gwo2ez7ggucaao5c4y8crqfnhy0b3lmx0jm32k4o5fos4ecbb19kspn9mq1gmf918y7f9kce8ss15ngp6jt2bj0j94eqyika0r29gw881mt3tt1ipvgmw86hjkz7y9y6nm0n576asqyp4t',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'c34b46f1-704c-41a5-a72c-437207d9d9cd'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c34b46f1-704c-41a5-a72c-437207d9d9cd'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/c34b46f1-704c-41a5-a72c-437207d9d9cd')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c34b46f1-704c-41a5-a72c-437207d9d9cd'));
    });

    test(`/REST:GET admin/resources`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'daf47f31-c9b6-40fc-b4cb-7ae2bc2044b0',
                boundedContextId: 'd72055cf-41bf-4682-96bb-b0a379d57520',
                name: '5rwte0xok2uf6ddd3vfakn6xo3ggf6f8gqjzcay76czhnohmx9dqt3h4ixvp4e3xcjqoe8d957qpmqu4q6ddshstjcay00iqud2icpucxdda3lsa3zfmsmgszwxe8umjzy5hwcy8xfcbnx0fncy1vird04692dnsqhr5wmwbw8shb2fcilo33tbaa5vwfq0dyh5ok5m98xh2etn8wz3n5xt9ky13ubfgwe1pyip23e158kjhphvtv64uy8yhytv',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                name: '5kvtcl207zs0ccotl7nvqlyomtsi84y1q01d7r8vn3vkm1haifxvg6k4n6wr5cwaij3xn9irntcll0i3s6dng3laj6hwd79w34jmxg1rhxon058it476wb3btv08hxkzzufyq5l9kvxwddqjaiqddpldfak7oidcrlnzaa5745qxgu0oq1tt5gegliiud7rxjhl9kzcwv7icqm05nl6mvrx0j9hllwkbzbqoasxqp2fr1oa3vqoi9p5xue17moi',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c34b46f1-704c-41a5-a72c-437207d9d9cd'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/c34b46f1-704c-41a5-a72c-437207d9d9cd')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    test(`/GraphQL adminCreateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'be3d2c0e-bbf7-4451-b1c2-340487e6e7bb',
                        boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                        name: 'vof5oocyiokpmc1d4mgqrhxifqq5ckikxdzyszso42b8gwjvdzey9yx0kod27t7eze6s77cgmn4y8mnhgpo63kwokdf5sbz3wqlqbxvxchgrtx4n1fl8mfver483cj4ac3yqp5ry5a7w0o00p1mznmccb3zzo5kzj645jk3p58h9uxk3xizmu85it2e6jv50qirpowuimyiaxsezdnvj13lheoiigcps5sr6eha9c8d38a7z8tfb7vdpgawfv4n',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', 'be3d2c0e-bbf7-4451-b1c2-340487e6e7bb');
            });
    });

    test(`/GraphQL adminPaginateResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'c34b46f1-704c-41a5-a72c-437207d9d9cd'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('c34b46f1-704c-41a5-a72c-437207d9d9cd');
            });
    });

    test(`/GraphQL adminFindResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('c34b46f1-704c-41a5-a72c-437207d9d9cd');
            });
    });

    test(`/GraphQL adminGetResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetResources (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetResources.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '52bec6b0-737d-406a-9277-39538f95aadf',
                        boundedContextId: '17c58e50-5efa-48cb-9db9-0be3802531cb',
                        name: 'kktmlvng8tt16nmzxehv2xv46uqa58nr8s4zzxnaifwaq1n4sa1ifbi8tsub6ido5kedmce5j82ysxxbbygxdcn8jp8avtrtjf0h5kzsteu9u6cssb2rxeg2k68qr4o5phgpmgdtpvdtr9h7cpe4rbktspmrw2q7tjrfcc7xvito6azw07c2dpdt30r9a8ggye1tvtcr7wmgro6njcn7czaae6ef1ooxvqs43pcuotiafht5s6bfmy3bptxd4og',
                        hasCustomFields: true,
                        hasAttachments: true,
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

    test(`/GraphQL adminUpdateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd',
                        boundedContextId: '2276f645-3ac7-4558-a209-dc824837f280',
                        name: 'jrjyehoovo5k1vw5sh01u8609akojjheapmotyitz3bu4tyrq06lftl93qp94vo5yn3nulc9do3eqwx3j59x2ylad1y28cxpnogkfoq6yyuqgfimr4h7wtq2ezjgjbknyu5cj76d8kt94ohzpchbvspkmtxrffk9n7f7x0late6tgrlu3qjldve0i70habclc5wgzqcuwq61adgnm2lks6ayhpb83aih8l8lr8jr3y0q5pibdoaisamnmbwywd8',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('c34b46f1-704c-41a5-a72c-437207d9d9cd');
            });
    });

    test(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c34b46f1-704c-41a5-a72c-437207d9d9cd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('c34b46f1-704c-41a5-a72c-437207d9d9cd');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});