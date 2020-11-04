import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/cci/role/domain/role.repository';
import { MockRoleRepository } from '@hades/cci/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: 'lwu2zgqfsbo4xba6kr0rewg4xfdniypm3szwnn8x0ao4aesyfi',
                name: 'skf4ixvldz76iy7orjjcxhg147l76f6ucs58ww14uysbmicc5gqxe4qtxr841vkcvn271h8tj3v350ym1qvvm6kvccfi0qok79ij6fiy25hl7ykfwk9tzy4uc91mqc16lf3h59a5u1f4fmt9c3ghvfebu7v31kojfqu58aexy6k8kg216137dvzrfg59uz68kmrreoj617zvetue2uzss3d5ij3zaicvs1b3u0sry9mgy35v77317l5hdqtn8j3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: 'dbkqlrnegfgphghbuzomluwusufb0pjbw2e43pp1inq1l0mrfj',
                name: 'ybxa98h77kvgaha148n8e3ikk4a7j29u1ia230xp6mj8ddqzzjue53ywlolmm07b05zb703qbn61wac5vb8rpqb3donfxz3qgnlhx1123qg8f65hkqybu73hj9se96t1531ghf0fytfr6gtnr4ztsa9wpe0vyxop6onwbsmcmkgylq9ewxltpnsa3vqo82ws07j7673jl0f9ago5cm6yp5e8vdhc7hj4rwgl77o0tccs9u115w6lkljxrca9hab',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: null,
                tenantCode: 'cf11c5st6ytblfj89s8qiuxq6irbauk5ngzge7tgft33s4i0n3',
                name: '2nr39j1978dumdnke1clgmgqzvozb7myp5w6axg5dfgqn7ifh3da42dx4hf0twunj1oholhj01bznzokwansw05dt24uu254bifrhr6b7p8lqc1xljrlysuj83icbp0jkunvcgysf4391k35tmjsguofcc8qrxf266c4vioub3cack4kjmdiqtbf1pmup17xhsbtq3dzbue9vo183ke3aeilnv7rzi0grwlf2igo8xqz8280fjqv708gmm12ubi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                
                tenantCode: 'vbsgcv0vxsgwmkhue3lnzvpopjls7ocfmbj4zpnwb42e2ga9y6',
                name: '8juivdpc861j9hvt53pchp78yjpttnwc7nbek7o31fjfv3y5mppbeh8c2r6j2lb40qru4ze6fc6zsad07a2yein3z5bh4l6zovt4342wfew40mfxupu5pnnefj3hinvzkpzrefkkxhlnquxevwn1jgzr4scogj8nqswoqc5id0hb9fsjbbrkjm3yualgyo1o4ur811tg1iq85z1d00y9nrso60676q22tcv3lieaiphnfp6wy55eyayy1uo6mgz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: null,
                name: 'lc9eamni332cxjsvyd1tlmw9y6ohk8k6cr8nocyxdxhc5oji84pmdxmygpz8kus8ea9z4ewa6uups438eg5fta0yjmeogsyf80gu0o1dpaqtbjejasj58hec02sxuzubbj3dgmss9540pj5adjspd5eraj1kqah5wb64wmxupaec4q5qj3xyhta2gnwa0v5tlocb2t3ef6rj133jtft9x44zdew4x4bi5kg9tf7zz1eu0r0foho15v67wb1xih3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                
                name: 'yq4saozj592n78uf8xglxmpbfcobeq9lyezx4185eev4jzpxi1r0l6urvdi6nqyo3iu11p7ouq481mq2lqf4bqlfenq85u2gr1c9j1z4yetr0omk63naflazkugjgjk737bkqfvznb8oks9e08ulvupg476mcm3tcz32cfqqo0l94cty1kzy2vvwoyk1a32dpwicrpzgdapi6j4hwoaczxc28gn6amr5hrxiamxwj7easwa84f9n32jspn557a3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: '39emvwa1lr9ixazl5emxld940cbsrre5m07shkqsycnaws3rt0',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: 'riuhq1287gwn88kooa033p2wjc9axnq0a0kxsh2fxvjyz5tsrs',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'y7t87yh24gvmaflbryw73bcoamb45xmujgv7b',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: 'rspxqwwd5rnogpxx8wz7f5pm2pi6h3dshjh6siei6ekfdivy6g',
                name: 'cylfm7t9ck7fff46bq6zf2ygwfm6ixxvm3nefthhrkvktqbmpctbu080ja8yucv07c4gfzxk8n9r597beog3q7poucjow1bfvinfkrlrpqwtvcn4xn6dy3xlsqgt6ujvuaf9mqyb4lwi268rl45qhovy2o2hh1i0erldz1y4lohnnqq1cnkk0941sum6b9svi9bqqz4zm5uyyb11nu218ksdznm30bq6aisvdaldsu04l1drrg6v0xjoth3hr5x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: 'ipxu8o44get0cb6qtm8dazb4lsv4xra9prk6i',
                tenantCode: '5yh7yhy2nza8h6sp6qvebq7ytyqh698gv9okuqj46f9ror8je1',
                name: '3kxv4vvehxk21yi9r83ld550ayykv5t9j76fps22do4dh9bebfnsaf2k9d6agimggwaj8vccg62qcrw8xzdbjbflvxvbvccg3n9jysrg3jwdp37mj5yfwqydelgatmz4l7sep17i1jpocndqnggnrpqqd42a1vm1j4tml16rx8u6tim48uhx9hfvh1rt3h44hfvgnhhr91nuauq6np282h3omyw3t7unuopv7qf6tayvsajchlrvsbeozebhjp8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: '4wv1zxs1c3onofq4zd0m2s3stj6ubucjdrl4xho5z3agurssbyo',
                name: 'hiq2d1lrijc2qoxuriikbels47zw7zca78bc4dumch1ax73jtl04ink5d1h5nubc2ienlyxhb8y6e4gkd76i3q6ln8ldkmg8snj2ediuyx0e147ff17ibmg53dshpbmmt7riw7xvb5ws2lraw5j91rercdmzg47tkjwyf46024zihtp62e6so8zrxvtuugkchhuq25mia7uw46vvmjeiumpy8xaa3aluj8gixylqq4eydqtnszjivbcy8ihdio2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: 't3z85s7ivhfiilpa1lk5tb4ipris1fe6culcyfbjz4m1thsbkh',
                name: '8r6zkrc7d5huyj983jpd28egk5zq89rgygcnmakf2zamvdbtwm5kfeynqlf6lk9p1w1yc734qypl8t8nnbet6hk83wc4wj9ixsr6xqnrch676ma2dtswnt1wbwk5129rr7djr7funjluyc3g1rgv28oan0cq516b7ro48pi26oemnl8qh3zq1xo6arnocf21l1snuxe94eu0dbwj2fxcyajrgzkdjtlgspelk511ex31uj3hqogdby4gs7zikfe1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST cci/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: 'shmls5wicfypvozcln9tkzko08pg43wtv260o3jrwbnh8d91f5',
                name: '4tlvhalyy1qjww4da6lgj7edsgc0f25i1joy9d6sac5nuhi5tw6s54inksbci7l2kdfu9op0y2o8og81hnrrbrk6eo8lzmn6oyj1husr2gpuzuctsdud93j0wji0rbps2mnrn9ckq40paw40hyn0g65elsrmri4s7v72kdc02ollll175o3wdokr4jwh5x8i2gydi948wtqcz3t7sfsx38mhau6dwiwomkpl1v0gd0z239gakx9jz1qzmz6os4y',
            })
            .expect(201);
    });

    test(`/REST:GET cci/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/roles/paginate')
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

    test(`/REST:GET cci/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '33f49c45-663b-4dca-8409-c69e98eacb6b'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd1fe4c1d-0eff-4765-92fc-c773424039de'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd1fe4c1d-0eff-4765-92fc-c773424039de'));
    });

    test(`/REST:GET cci/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/592a98c1-674d-4e65-a449-287bc910cf88')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/d1fe4c1d-0eff-4765-92fc-c773424039de')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd1fe4c1d-0eff-4765-92fc-c773424039de'));
    });

    test(`/REST:GET cci/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '4db1d3c2-bd93-4328-81cc-31c374c99fd3',
                tenantId: 'efc6e404-73a5-469d-999e-2442f2aaf5d4',
                tenantCode: 'sd7js3x21k8vlno52w23ppi5ek720hymvljon002mumc08my6r',
                name: 'y12abn1ikxn8t14rxz37jn0pj50cawks7e6zb5kxz3itqlahsb9bwntgnrpvmeed3s5vl385maax9b6ly3wn77jdibo08qdc55huqaz1qqc1d2c77aiocgzgvcpupogyfuzdxp50cafsp886n710739d1uo2bv6uy135bvm68pzadx1txj26vg15sujvufq9wu35att7o85t2efj6id3wz6zlk85z6iy53pzdcsu8owwhy3qozpjwxx6jts5rf0',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                tenantCode: 'oqvip77zslr6utmksf211ercj2wvzbuq6a4xlgnezsfpy3aueg',
                name: '2ferqzs06jpgp4mxf3dn752xarwg2i3yn3odxyum7hd1cj7lvp18zbbq232knotdpjux85zzsqv4eisve6foejfn3grtt33e5z15n0j75659lebw93simvp72ikflohccfjr4aiock1vn5dvkmg3jb07kd0a3etx5c0lv6cigy6tuzl1c4zzx1ca0o68ef7iz7hnc6da6dlzuhrj94bcrgawjk1oiukj0v2a9uyy33dtd8lo45pv7de1icu4ock',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd1fe4c1d-0eff-4765-92fc-c773424039de'));
    });

    test(`/REST:DELETE cci/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/role/dd9cb5a5-419e-409e-a833-2341d125d4e0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/role/d1fe4c1d-0eff-4765-92fc-c773424039de')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateRoleInput!)
                    {
                        cciCreateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
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

    test(`/GraphQL cciCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateRoleInput!)
                    {
                        cciCreateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '448d2192-2eeb-4cfc-aa1f-1f8eb840d690',
                        tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                        tenantCode: 'qju7g85w110k430qwcs8rgorf1gwe9fwq3i9v24hhcak1v109n',
                        name: 'e1huvdzva5pzow9ycz7gn2q6cq66bsdyetcb9lmvsr251l4v0w6n85m3c073riec1y7x3yb5ru30fjnhodiwcbm2d5tn4ez0zwjfllt25evgpg2mpmwh2u8n5099yxpn92yhk6jt2xmuxki8jzadcd89hlq4mxcqdl0ezzubcdzbakohqkxc2gpighyo4vhv3xksi7t86gcb9kbqtcmy8zoo3m1qfpadec6kfqr6i8i1bfx7gvg4rbyyozoz4co',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateRole).toHaveProperty('id', '448d2192-2eeb-4cfc-aa1f-1f8eb840d690');
            });
    });

    test(`/GraphQL cciPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindRole (query:$query)
                        {   
                            id
                            tenantCode
                            name
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
                            id: '97736028-39f9-4230-bafd-6985be7ced94'
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

    test(`/GraphQL cciFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindRole (query:$query)
                        {   
                            id
                            tenantCode
                            name
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
                            id: 'd1fe4c1d-0eff-4765-92fc-c773424039de'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRole.id).toStrictEqual('d1fe4c1d-0eff-4765-92fc-c773424039de');
            });
    });

    test(`/GraphQL cciFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'aad1757d-c5f8-4527-b92a-e34276255105'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd1fe4c1d-0eff-4765-92fc-c773424039de'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRoleById.id).toStrictEqual('d1fe4c1d-0eff-4765-92fc-c773424039de');
            });
    });

    test(`/GraphQL cciGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetRoles (query:$query)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateRoleInput!)
                    {
                        cciUpdateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '540d4cd8-fd67-4e70-a578-6747808bdd72',
                        tenantId: '4f0d1701-27db-4f1f-940d-bd1807e03e64',
                        tenantCode: '865ihztvvjassffp8v0z8xzd7vnpqf9bsukf605jcqvze4s5jv',
                        name: 'hc4oowjlwlc9o1jpbylu65g2j3bfz19z33c3x67oxufuduh26z68p1ko8es83my9urrykhjiz8san1aq5jo4vbsne2kdwmfbszs03c2518pydiamv1ml1dk4nf8b7qadktq192mln4vdvmccv9ylwk9blhpyalb879unbfodfrfiq25dok0m60eextk1egycvb945pv122swnghr6uq0ypltfdnxhb3nzuyrt22wainlcsrcl2haqscngbuieed',
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

    test(`/GraphQL cciUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateRoleInput!)
                    {
                        cciUpdateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd1fe4c1d-0eff-4765-92fc-c773424039de',
                        tenantId: '9074f6f6-c9ef-430a-bd1a-ab8126b4200a',
                        tenantCode: 'mu88r6j1teh465fr7lfy2wynrqeo4hotfnwso3lev97zobkwu3',
                        name: 'oek5skq1x6fzueiv086jnlz3rh2vt9ddtmmlfxqa1sk7pwjzdjjsp4ej9018z040amesab5yiedwe1folbzvioj2qhd511ic1p1onnyk2axu7a0ldhmxd1z8jisteqsnbl07rwx6x2q5736cc561y0ip5yf7634c7te4gsephtr6m2thsaw1vqidirgu13qo1b14jdai08lrc9chyvjb6yqlj3j93an84yqmdnttvacm1y3cnblxgmnggc7o7mf',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateRole.id).toStrictEqual('d1fe4c1d-0eff-4765-92fc-c773424039de');
            });
    });

    test(`/GraphQL cciDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ac6cb790-879c-4dc0-beac-1be5bf77c4c0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd1fe4c1d-0eff-4765-92fc-c773424039de'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteRoleById.id).toStrictEqual('d1fe4c1d-0eff-4765-92fc-c773424039de');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});