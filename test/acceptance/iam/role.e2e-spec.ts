import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/iam/role/domain/role.repository';
import { MockRoleRepository } from '@hades/iam/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('role', () =>
{
    let app: INestApplication;
    let repository: MockRoleRepository;

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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST iam/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'ydlw1antab5388xmkjyknhmvms6s5d0z329ddxz38fi7zyzj6ndhs9xrjixy0wxqwxiidv29n62m4bzdm4g40g8kiz2teilnhw5i8uhsg8fr5e69iomsp91yofd9ezylstdp6281t96rpblalckz2y88kgho7s658m7cxcreihma5iocl520bjnlt2zs9ixxs5axhy0sdwz5dcwwscgzxon0s1tott2lmwp2iar8lh0errv8d4pyq35necbrvpm',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                name: '9yovmn4hc3iracjiijp5pv14oeppab8yn1ak2cicyik11xf7vfihrq7eaqg7b88w2tar4aru7aagsmqjzyzwi4yjwlz8qrrauuc9cugfvtewnmnajo2nauutw94pt2wigcsogh8jy0suj847ha2brsperabr9twvjh4r5tc5sj8avm0h2dvajs2hsdvcgfan6wh0rjbz812ucts16mstcem7ntbk2l7uo0b09sub6hqxlxjhqjdnt693rkekhp6',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                name: null,
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                name: 'b3ctzbloxzz2zngkgloh6zaagek8unuuedds45mjthvb6o05pldad08w2xaw98n6dny65dsvv63pq3hvd7iwt5sqjyq3gzhv4p6dmut87hnzstf335p4l9anm666k3ezu59ygipwjtj1h0nqv6bfqcj9khen3hydlq4mdggvzob3w6bol6xk3u3xkx2aa0rg3izytdie1ms30uskqigrj2nhzgqtqqbmarf25tgm4ppehj94vmcn4qi2mflevy2',
                isMaster: null,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                name: '4wnfobbfwxhxhtijnyekk0lcn3cywxp2em4t4xbhy2n8143jqg4fn3cqq2drwa0puqdz35zf9tvgn03oy98cop7xyli78552n20ulwyadkzmmdwf64j01we9sqp1ktr2qd6rajensoxts1v4da0t0s13xzeaa2bxxmlmqsq6irekx92cunbikpvpxfc0res9zo5etmub8f67uvf5jbakjf9xan87bnlavbzo38qn762bm0ulqpl6qqju5nuh185',
                
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd89xn22vrg7mgwn6cpelvvkojxq9fmtl13tqn',
                name: '1t5yx7zddug97z8e3lfvss7flme30e2dg9m57kgeqhgzn6ceoge9qenav13nm7tlhogk5z318t3lk87zfdmcc744hv2a6w0ekgme2rjb7qelgqw9cbk62x358k87jyv9bekwifjglbrhk73xpw044sypvu2b28sdmrqzw6m9y7y1lpupz2mjbjw68idw9ju2dapjhbux3eeuhamx2c9lw8ql6810gr2liv6gsw40ddxytys6axn6w7uhp69emp1',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                name: '31ury3t3lqwiqa12dylhynxo0cxzi29532eqyblkbk0mrof88m9ihcvqyznjrfb4u7mi1bt792xxs4rekmjv8uyckzhz48ghpbl160s8r1vvm6swo1k1oal8h399if693s04jqhfs5b3wb0wclpboelzif3oiyssuzv9ei6v65vdx12g8v2g0ts4mor6ngiz7wdi4xalmau0ej9vdji26wjjsuxu87qtay1jjc61ukmy7tvu0j6xveqwuggn3l1g',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                name: 'z3vqy2bx4beo84wezlnrbml9rz98frcu0vsz8bfe7rft13b3q2jgq7jnxsibv8juapl5yj166qso4vv6l86ik9cax8m3jk2t85myn4kxonsf8brzygpklow2wv9qxyes80abce6xf76h1a9yuwgfby2wfcfivofy4i3fw8qlbbnfy4ewoy6q8c3vwvanpxar9eoaf70dcxzbu5eqv3tb6b5io96wsvlb3n9qbu38bf2jbo58ksaxg29dd8gkgfl',
                isMaster: 'true',
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                name: 'hnqo6ppaswf1prxq0jau7x7hiz1jwhu3r5e4j2s2vmi4orzbh3419i4a6dyuy2raoh1rqyckq8otlyjpg3dp2s8zz9dj4gkxprihinzkkm9cph8laf30vpcs6a4m2xo7fz6apwhjl96g3yhbd57qpbta5k65cpyyadcnatpprxknod7bzm2ich6dgoxev93jkkxlzn4tfsay89xxq0pfllup3pmyjwu2y5ccdtggpvq5dke6ib8r8bhqzgntgth',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles/paginate')
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

    test(`/REST:GET iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7bb6370c-b8a4-4743-99ac-6307866a0dc1'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/2c3be59b-dc99-40a8-856d-6287e401b8ad')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64'));
    });

    test(`/REST:GET iam/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b147c0ed-ae6d-4faa-a5c4-5f5db3ef8e0c',
                name: 'y8p1ktbm6w2ssm76uopy27f61oew445jivngnw9csuhlb8zuihug9enid90z3r13c66vfyjhrgmudvhlb4k1kcmvu4435ya3pf2c5yy588ki0vlz3ujxe4y28yinmpmrjfj98q0jkfzg6lty7au0kzqhls6pem7llhj2ynvkh522vbkbceyw9rzkv9q075knb8dx24tpgkqsbdrm8ctosx5m6560bfnlkxu7v2ih1oo8cr7bjsoy2kbczo43hh4',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                name: '142fluvv2zsfj1hcj8rx9a8xrmu5lhta6at6wuskz71vxcb0syy46fwwnlwggrkxsbddj3arscunhog849fj2euuwivwh72namk7yjali07jm1czz5jpw3w99xdaa75k0ar2xok0kl6ka4vnync3nhy1qpt246od9cfljci0ur79754wdcj671b235ee0w1xtm66m60zpphg05q12obqxyiziqagz2lhxtx84t8erktg173gf7ehoaqyt97g4qz',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/ecdbfa95-1092-4503-ae93-d9e59dea1bc3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
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

    test(`/GraphQL iamCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '280c7300-943f-4f88-9fa9-a04773682354',
                        name: '0xm4ktgwulrvcon6ki73f2hxvtbc1002gis93rg5yiwiq37h799mhwhia5ux0cziow4qaxoiltpivxihn33f334knlayylqrppo5obif6p1b8h3fgcwt2j8qvkt1pk03816quz15ojmce2m5z162m7c719gns2xzgjcruwymaqgbgren75ach7vt8y76w370tqoosyc1xg4by1olxvhkwa0miz253ra9qisi7j1j2psemys5yr3fxrt5zgiu075',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', '280c7300-943f-4f88-9fa9-a04773682354');
            });
    });

    test(`/GraphQL iamPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
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
                            id: '54596e23-f991-4a00-83ee-43f5742f95af'
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

    test(`/GraphQL iamFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
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
                            id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64');
            });
    });

    test(`/GraphQL iamFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '16d3f631-61f8-4917-aceb-b72bff5acff5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64');
            });
    });

    test(`/GraphQL iamGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetRoles (query:$query)
                        {   
                            id
                            name
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
                for (const [index, value] of res.body.data.iamGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5142a3be-05d9-409b-b05a-1aca81247ade',
                        name: 'e6ihbvuqx7tmlr62yqw7xqtrifcaets57nvjiabdxmg2nfw66ssoe9iqqcdcdvopbonhwjp47k2ug9cggkpmt5e4ejxpk8srd64vi72iq8vchn70dqu9wdxd6tqduyiexljeq9m1l84muhv14eysusd1qwfupht341gzur53r9ixn4xto0talzmtffwwt4mwc6nb3fqrfbtqbxyx2lvmrwvqo2pdxrm3wm0iqfs4ryr7okj2vb9kc5uzegn3f8d',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
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

    test(`/GraphQL iamUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64',
                        name: 'wluywt2bw0sew7g2t4gla5d7wfdsclojb50t5zeqs396pvrg9epuzk3x8wrcrgxiaw59sgo3udy4aiu3ddi7c4v8ohho1uxmblr7yjr6gt5ntsvp8nn9cw90ct4tl5rhho32f2r0coofqnomuif0w9j7078xv9bjqcn38smcsxygizehy6scuzughz1ysekms81rgqellfnzr7fu30m6ryiwvm40ci62ukdtefs19raz2s6d5u1s86341bzy9nz',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64');
            });
    });

    test(`/GraphQL iamDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '500005d2-9811-4f83-972a-50035678ca7b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('4e2d37c0-8e5b-4fc7-9813-b0f6dc375e64');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});