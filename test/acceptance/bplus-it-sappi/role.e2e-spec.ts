import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/bplus-it-sappi/role/domain/role.repository';
import { MockRoleRepository } from '@hades/bplus-it-sappi/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: 'hn480iwbzbre0d0ozlrptrhzu2vpwj7odg0eq7ew6okogqp8w3',
                name: 'nzl0s8xn72kk3bnq6rm5iy5do7s8tkvw2g7oifsurf1pi9oh4e9aya99evh9xwe89uhbidxnpir7zya73x9mj9wmpnbz7ag1v1xu7i8stsr5of3ndhn8y0xajilb3o0in3ju2al2xm2ytii72s2alyzx93whmgv6xwleyf8koips8z03rj1ag1q2b1x099dkhsz5tzu7rc24iql23jtxssx40e33i1z3ibhmhboq93nsq4pc71uez5pmn53p0o9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: 'r9lgnfo9c09kyibhqguuut19atfdq9g74xq14h34tuymx5t9o7',
                name: '1putdqrfo3bojiy7u3ovugbxh9cxhjc8383qsa4lnjarskdwrlzy8vs9sidmcrobyolwdljuuzi4g2ypc2ifuajnuyfkdu19wicsm5xi67gezgnm4zttwexfhdrjz1k0j88ssnjwtkt4y7klphki979trn7mnvv511df2exl6iwb0wt149beqr68gobw07ux166zrsim5matlkbj594icmise3f9qw65hf5p1wkpe6zcvrm03vw6i3c0hfao8os',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: null,
                tenantCode: 'jf79oj8vsdtnsgpgghqujdkoa1aokrph5mo3ny5cg9xhjl1n3c',
                name: 'ta5xkdtkx3pedi51hmwfyj6jbtueeh1hg4jd32ywkvj1rfjpzoo1j2whlblxq9ma73rosyq4imgpltcbcjm5h3qxbim15nst7s0h65om2xqh69c1wtk7grywn8uffkhe8z4fwq5s2olhhock7gwobp6es0u6n3upbtl1xppcmxfijykuvu7hxjsx1kf16ysze4lwiv2eah3rusgw2lo98kj6j7cqf5i945w6e6qm290z4ht697xlppcusttsbn6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                
                tenantCode: 'xy07hoya5xkbcwwejza9s59fm7stwdu4o0ch03vlwaj5q558fu',
                name: 'aka3inafl4i1j1owu7bq7431ory9lqirp7cuf2a5txvm42i9vyog4vap6kvwpph2zo2t9civ0cyt6w456887oxkpv61p3zt9w3m8kevmd9d7zomymes5w70apxxgxx590y78qxu3uhkrs85b036qgnbegjx0ry38q5z4y5mryme9iw1u826y359uamzy3pmvrwfui20fchd14sfje5mwmjiuru2ck6kxsf1mkvclhldo7bsflsd05ijh08gj7jf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: null,
                name: 'b2xxqb0fr330av5yk7rjgbop6wqfj8zyax8u803f8avb2mg98byvp74naujishhqspmny9t1yy46215xzyxzfrzt39bjwvfeg8k2pa008pvdc56lqn5x007bf8iuiv1yfn30j8p57bae7klgjbxsjk6842874jirp1mt3t27bbkvrn4u1k8fuvr6i7p0d0i73h3u6aphlkb5mew5qwibba3s8lc6aa8xk9mg2om5lrhqgiilibqi90ocqbtn8jy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                
                name: 'vm1ielm788xl0mfwnbr29ukasu4cg97m1h8ybevyyec8kdwd1bv68chmfoofyw3vq56lt25854klfd83nm8fgrzq6b9ts20r2hrwwcnm1gjjwjebfxrm2jtiizo1e8rlk2did7cwn9rh42y96ily8xdwxl9s3rfc86fgs3o3zqp7d6cmtcsvwhnaamaix4y844wwrdoqqfhf648gm8fwlo5691bgo71246zbaga0fr8305kdzr37uz1fkt8kmq6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: 'e11p30kbwzk7m5h5iof7vig1jd37no4y7q8epxsqe4omoaub11',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: 'z6qr031hryfjy4kle1pzyf13l7ns1qkjip28dd8l5mxtermrzj',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'rhm5mhu5qopgqbm2azyctq0fziqomm4prs179',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: 'dpa3m553fkmc45vi4265qrazvslzg3wgbihkg11aai7v1m41dq',
                name: 'jwrwfpjute7f9d9cijn4kyyh6guyaonms6gadd11hexo7ofclqwj5m790z9acmtfaxdye7dlgkny5929k4o0c5ntkww3odqcqh1p3k3f993q2c80tkodwcs6d22gu0o2465ep27glfdb1sbjrgrj5yc0xtdg9pv00dem3fa33fizq46gzxl8xxb54by34doeu5ezxa2wgo661afq0qq8dhq2ow5b5n5vr8ofekz8f83rcnphz0tgsntolguq7re',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '0td9mgkyiw3kfptl75kzoenwz7do3jdmpsr3q',
                tenantCode: '9uaa00y1ptsnlbh06bhsodbgbfw275051gl25wkoocluv6lrjo',
                name: 'ulxqu1ji2pz2u7olv622286k9r21he9tqn9m4mc7yglmuf5z6uj5aecyn0nztd8rsisuu6hqi8fqnr5xybdnb3n9yw03lhty940cukxxrqp984cnum8oa9dkx16p0azvgfunc2znlg2jacfh013mdw5x9c3thrziy8mqphs3i4qwjfqis6bug6b6ahogwbp3cpabcabvedmybrcvj3q8w6ftvylwyeyojmgiswkd9nlkiaw10nnfgvvp37qi6e7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: 'yz5xigbg7edmp1bsexu9g1oberrsusjd1u3xpzr1dpa7zts3ssh',
                name: 'zdokz4dz26mdd6lnos7apzbr695yra86ry7359aaefbpztxla8ypeai0cei2vz62yvttxur1uz2csgv3isi4l9sddomqy60eqd8x3dxtikciaxqpnddazwg7bqtr7e1udcjq0emotp8xkugethyxbjh2wcljsa0wytd9n3g39z6guewqew52kvcy82dq1ic5vb4sfq9fh86lfcvgh118s0a3316yjmyzex76w4drebpek7fdn0kkrhe9tljibaz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: 'cyp6k30s1qflh044exuj0a1pl4cirufipalaz9aa67h0wemi62',
                name: '7wujmjfsc2np2omcx1cra5ll6sozuymw1gt7kbqj956pyb91dyssjpugney6sxuzcfuosytqf615ewysmuyft5cymooma7smzx6hvjbk68wl11uqqpbp3s8w2uxxqq6srhfmjjw40elwptif9jhf4eimcvwt9omu4hlfw54yowxonyg37v6ypo4uoe5r8qpdhkiz6cnk6py6aktpucx916j6cbb8d5gy2yssa8kyq8s5s7bb1nvcvx0vuks3vhnj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: 'ixal8qcwzxmntjkp6q1vemp89qvvgx8arc7kji5a67pi0pusxa',
                name: '1pvuk0cb383hd16qhji33xver2gta81yeve2584317pyra4xmxqpfvvovf702uw2algdskokm2b0wpwzpb46q3w0w097f7w66odpb51gffmvqlpuq3hvuobbr9fbjgbo3d3u30kyubyh3hxhy1x68n7m0u3sh9shfeomstey7fo11s8xhp18a9r1iqymqvccb4a1vl2hhed90x0f3qp4uhbj8aogdwiamq6543in7e0i0x9wazt1ksckdfpm99c',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles/paginate')
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

    test(`/REST:GET bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
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

    test(`/REST:GET bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/5349d89e-a5b6-4298-b54a-c3215cb9d5d6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'));
    });

    test(`/REST:GET bplus-it-sappi/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bcf622b4-707d-4654-b15f-37bb4f07cb7f',
                tenantId: '6db5ab2e-9c5f-40a8-a40f-b48d32f87971',
                tenantCode: 'v4zr2cl4oh1rpx323jwcyjccgydxujl33x6bxqdz1if1bcn2nh',
                name: 'fzt0f8fy1tpisyzlyjm9a465ri2rsamnx8hrtqgoejzr8n61mq918axdwmr17ctn839xrbpjr36ns0jgqvkb3nwqj9ypli4j7mjn98ihhyhfwtu079sag12xwfuy2y093se64lg9h76ng42wirlssoo6pezvp9wjywyj77g2xai3oyjyx3wt6zjdifwg0z0wm5j0cronmix27qo9ge8oillgkwl4nc7v7pcr3vdr7hdrz6bau98n4uv05j5lstt',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                tenantCode: '58ea57gqj9hm2krxsryy0zr04uzwlr1z6epdey2imfx7b7jrel',
                name: 'tgyeldmn25j73fxxromtl16mpqp767uy30uohoyi8agvx7q5lg9uj8xphc1qgpb8dgtokan4beshb7fwkffm4dz9oww5x6bey5k7d7g2n8lflx1p95r61vix8aey0ytk9ju3kcrwx16a28sz0cuy57vrw0921944pe6fio10m9o0i7ipst4sru0xm36xlqbl3h7jq0utfy9supi2agyzi13foxf54ywiofc5jyp3feor5d3ndudx3b79e13zg4o',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/5349d89e-a5b6-4298-b54a-c3215cb9d5d6')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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

    test(`/GraphQL bplusItSappiCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23e54113-2c46-4f07-a884-ad46d45bc95a',
                        tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                        tenantCode: 'rylveed8o7i5tosps00rrejkpptswl50d1ods1wcvh7b2ddqhe',
                        name: 'p7c520d6omvt83lswx4baw3t9gbvti3bd7iqa65khurr33bcr8d9ff4kvia2nvvv9eey6icab5sfla2kylo419jpqp93uin9o226p2n2gtmennldltg9k8kqapmiijh9y9wb7wvrtiryb94o3b1qswttbigxwr8vksdyuyq3prg6f05dq36yar1nzqmeejrel628gr243v6b1zrak9a9n94ppaow6elbbct8074bmbyn0u6rvvhbhglqybsgcij',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '23e54113-2c46-4f07-a884-ad46d45bc95a');
            });
    });

    test(`/GraphQL bplusItSappiPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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

    test(`/GraphQL bplusItSappiFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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
                            value   : '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('5349d89e-a5b6-4298-b54a-c3215cb9d5d6');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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

    test(`/GraphQL bplusItSappiFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('5349d89e-a5b6-4298-b54a-c3215cb9d5d6');
            });
    });

    test(`/GraphQL bplusItSappiGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetRoles (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '63297f98-8c38-4e25-a05f-03a1c2c00057',
                        tenantId: 'cf198898-a64e-47af-84c6-89dbebe23e2c',
                        tenantCode: 'zwr7pwf2s9ue32zex6rolbalbx80vdihajcbdfkr5rdq2emodb',
                        name: '8s8v7kmq3l88czsd4emlk9kporm3279ug9djsyxair1njaingbiiyql56kn959f002n64fj1unk1byutacmncswu4qng4yh68uxks8dt7iv4rn8296m9oy1qxn0m88xmkn1te2y0zif21ah02neg35l84v5uewxhc5w1mi3js3w4jvl4t8g3130t9auvpcldcoav3qti6xttbfz2snvmwwhv1m5fbgn4j74szbn0jkzkvvufurz8v4oe9wzkqfg',
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

    test(`/GraphQL bplusItSappiUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6',
                        tenantId: '56619e63-0df1-4d91-89fb-2066f64f1414',
                        tenantCode: '5gcctt992ouvly7vmgzpcczbfb9kjyq4rho9j8nx41a3g1faz6',
                        name: '49imzivq8rsmjbv3kawqg6iunnyfrpld9isvmbl5ya1b4jp4tpw48xhgkuz69vaes4vmjh4irq9sezo2sxuhj7na71hgr8z4coz07rocsq3yx3omol82sabshixfyx2m940ofzl9g55dz3o0lwfpfw1dgqeld8vcp87760thl0o6bt0ycg8wprwdt3935yx3qk9vstflqkgbjbt076257ttioek0fw0fc4xw3aa2f3pz3kfd9k75f3mxqmc47af',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('5349d89e-a5b6-4298-b54a-c3215cb9d5d6');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
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

    test(`/GraphQL bplusItSappiDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('5349d89e-a5b6-4298-b54a-c3215cb9d5d6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});