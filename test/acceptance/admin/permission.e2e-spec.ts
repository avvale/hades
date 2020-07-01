import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IPermissionRepository } from '@hades/admin/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/admin/permission/infrastructure/mock/mock-permission.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { config } from 'process';

describe('permission', () => 
{
    let app: INestApplication;
    let repository: MockPermissionRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            })
            .overrideProvider(IPermissionRepository)
            .useClass(MockPermissionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);

        await app.init();
    });

    it(`/REST:POST admin/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                name: 'o6iwnmfvz1t5yepuptu6lk87yxznx845tmhsqs3135s5oyzqz5jkwz58j1f2ui5lnw1lu97tjatw7jodx13ywokofdovgm1sffuhib6miz7fwjom4rc0zbfqr7vctoqzp3eahbrfdko1891ucquau3so3b24fezj4eowgxuiqpemwvqxo5m9ppwlw31wn84rdx5ygmstuukgtkfq2hkjz9266oluo3ulrgw84en3apyqgv0h09gzs0ilwr9ut33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                name: 'q6z3utcahkhrqcxyxca8ie9q80rmxujc0lamahy0mpg5dj6pk0xwbl9b53himfzvcm76iz1w5mempb9vxccnarvnh881wrzniaj942xdifjppg3gx2u7f7bucccxkwemavs4u8dnwazfub3vb1cmzk7gp2t7cgszdoqdg9zntllp4vsbtswt3mhltwj6ht2vyg64euvn56s7blal0uih6jvl5e5vrmhjcwrm91r2uwbg3m0m9722ap9gc3bqecm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                moduleId: null,
                name: '23yb2yarbtylob0chmvhlcu7jhwi1ndq6rrmari021qv6g72fbbpgqakpdcthii5rdwyqlaurxf0z5pm8hbeq0k665vek7ny4zkrfds6nw6uf1ypp55ms2eeaiyaj2m9i5kakrr8zj7kfk0pkan1p7chbaqx1aizg2cypctpug24rg1o8tl6y8ow9dy6czo24geooljapp3vfcr8y8mj38gwnrflu2e3ltjk83f6iu8i7lqmh9g4finuldh38ts',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionModuleId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                
                name: '3kllde9zyl3yba6lhwf6v0bmmk8lum8edua4czqgtzoubw6vfwjmka0a8r47wg30hl5aubyzpme5yzr025q1of0a7dlvi4aoph2nvmh7stghqo9h5wx459wzjqe3lhtktta6xfyidld60k8jtd36w2vyu99ayefnuwfpz3mk2zpgbx4zro8vjod6xtfoelcupgeaetmrbkz97iigtds7o1n9j815669wqkk5n6qzuags4c9fyumytpeciqncbmd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionModuleId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'p9vcf3tujnbpmyppmgeoco67ccq5r6qsnh2yq',
                moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                name: '8ex3y6875t2m24qaa4xr43lzi6niik3baocnkqul028phavi0580o3lpn90842gx3g76vmyq5qem8zzy0vtd44ku8nnzah9jlpjd2yp5mg91ei51bzvzn0pitqy11lo63ykywtpxqkghhnkftd8423x3qyf5i7m4vnuzimjbdyrxqctjzyobeazf88chi4z57tcah3xcv5pjpzbm4hd9amctzg2jhpvc6sxqzt45305la238hu1sy1kz5akd37e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                moduleId: 'f4otc4tm3k61r34ee225sq5s5h52c27p74sh5',
                name: '8ws1hq5evn31xp96574unv7gq0hk3mefwgcrqe3j5xt3ug3hvy2eqa626i88hvv1ltu13wikbzhngybmasekyfrsw683ksl3sjfbzimw0rmjtmcpy64cr1mqtl7gwyi4ina35o3dhn7ihxqec6os4emwiz1qwuvmzrb127hh5p253n2xxwfx1tgtnwtlw66p60616h43ot6e68dgh2rikxc9p7qjs8hz3tdwg0cbywdh7wpshdkhjccgnq5e68f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionModuleId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                name: 'uxr0lswxtp6a31dfblem30kdnc4j417n1jvdiqsj7ss3gjl31dhxz97d1a7d8q19cmqssrar6bnxur79edmvs2aa3fek9hl9u80r619ndlgt98p4o07dtrvw00tqwaoog7tuoaihdljiytdyw5wp5wf7gyl9yn1k1ti5a76ns05hy4ouvc37m6qpxn0cq0rhe2fqgfclwsenepkr7zgk71j4o4krl8cejvkqk36sgkf45a64bk6x3urqajaigvak',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    it(`/REST:POST admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                name: '4e28fsbztx0rllg29le9a8934tqzh8tltf5eex20ok7ri3pv6ojy97s9y285h9gb2fw5z6pl08es59h7w2w9qkjnqyyalygjxeb72hs71a08wshlb3oyed9gd6pai3ygjhjha5jp6tc47ybo3rgumzlp2s4yewsls0orqf37h30v5vcahdfj1p8rhysfgehbazlceog6ab6irnxea4wbazedhu4l0uj0r808e83n3u2421gjgoqht4xfe91zz0d',
            })
            .expect(201);
    });

    it(`/REST:GET admin/permissions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions/paginate')
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

    it(`/REST:GET admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
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

    it(`/REST:GET admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'a3448654-e7db-42c8-840c-9c47ee589727'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a3448654-e7db-42c8-840c-9c47ee589727'));
    });

    it(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/a3448654-e7db-42c8-840c-9c47ee589727')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a3448654-e7db-42c8-840c-9c47ee589727'));
    });

    it(`/REST:GET admin/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '63392260-ae7a-4085-b06f-9c21af6c50e6',
                moduleId: 'cfacdb61-397b-4304-8ab6-ab8e4e692826',
                name: 'zmjwlatlz2vdpxy2p93asssf9xxnk70xir5vyn39irqv1dcpdslur71bwq1d398nn2613aulsviakb7j34ufxfqdsa3xg80m5lw3fz2bdvuu70rumr514w3a8pu18lfdoj8xg8nbrh9ip7iar9dxzk4ixltfjikiwbyikirtwlxnhsrr1d44fitj0hk2b12khpascp6n3zqd85ibztv51n07yeqxautai1v2rub2zx4odyyqr6adhzxkddsm5eq',
            })
            .expect(404);
    });

    it(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                name: '1hhxe110c4ew9qxrf9hqevc2jgqqs7qxynd4yu2mi7p16on1ieiw7feedvxxr0c6zn34k7g009qf59753hyoy75w9440ydyn5k8imfj7vvec0ldlvqm99ns7o5ojw308b711h3uowbu4h6c2jiuz8yk30pchy4fv1oqbs424w2dbtuosfnkgoddiji0253xzxab87xhv69puan3t2jsj43cgrtbe4ejdl1kva9p5unpzjlg2mmxh900ez4t6fd6',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a3448654-e7db-42c8-840c-9c47ee589727'));
    });

    it(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/a3448654-e7db-42c8-840c-9c47ee589727')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreatePermission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            moduleId
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

    it(`/GraphQL adminCreatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            moduleId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd79bd0a2-c7fe-4fb0-97f0-086a5431626a',
                        moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                        name: '69qv9zi2ig6j6w5g8masw3qqf7ejlmg3fejytjctyux5rwdul3ckake0n156m17k6z30y7sviliu64c9tmhsrainpwqyivdjdt129r5301hvt1m9jux6jp01r1zdd9klox2egms18615zg946czk5oba9boazd1lbaxmd1xtgcyyv8g5srpopdes0nfc58nbb1gne4bb2qxu6urevt7jlg600qibvctmbm3h878ffjfrrh6ur5d05gjj1ahk7iy',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', 'd79bd0a2-c7fe-4fb0-97f0-086a5431626a');
            });
    });

    it(`/GraphQL adminPaginatePermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginatePermissions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL adminFindPermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            moduleId
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

    it(`/GraphQL adminFindPermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            moduleId
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
                            value   : 'a3448654-e7db-42c8-840c-9c47ee589727'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('a3448654-e7db-42c8-840c-9c47ee589727');
            });
    });

    it(`/GraphQL adminFindPermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            moduleId
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

    it(`/GraphQL adminFindPermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            moduleId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a3448654-e7db-42c8-840c-9c47ee589727'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('a3448654-e7db-42c8-840c-9c47ee589727');
            });
    });

    it(`/GraphQL adminGetPermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetPermissions (query:$query)
                        {   
                            id
                            moduleId
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
                for (const [index, value] of res.body.data.adminGetPermissions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL adminUpdatePermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            moduleId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'df4d00fe-b74c-44b0-8b12-51bcf3a068fa',
                        moduleId: 'a63cbea1-45a6-478f-8d9c-adc2aeb291cf',
                        name: '7eyv129x678rmr2mm5dcnwywqi9ccwf73ea2jsj7o07vewz7rl4yzo7qsjb05ftzo7pwc8o0zaml76c9l5imqosbcpd7nzjg4gqz41rflejsjqbcd8mr9voqhshaffuzpljx4b2rdfgolxxhtdemfkev9s9bjjdo6tt9u26ty66e2xwls2cjf4w284rq49eq8hv1lbb07pz9on4a2rasinq5sd3popimvweos7dzdwa3b2i46affcprlu7xke2i',
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

    it(`/GraphQL adminUpdatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            moduleId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a3448654-e7db-42c8-840c-9c47ee589727',
                        moduleId: '6d5b02fb-7368-487b-9115-4b02ecb0f694',
                        name: 'upr7uuoarqa6mm055ffky2oqzude64igm2t48k2an9oxf1651837zjgxpy19kfo4b9jx39kwrztwq6pt5htgoaxc81o8m6lrazp4spia9kmfcyrhm5sjts154c3yftvzktv48p6iuthywa8cdt5dfllk222fj2juzeknun5hx2n3iqskdr4y7c1nmo57859dxg3h26hwc9aqei6tsui2s4e23f6sbzsfk67w96lamck6o1g9rgplugjvl9tntu0',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('a3448654-e7db-42c8-840c-9c47ee589727');
            });
    });

    it(`/GraphQL adminDeletePermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            moduleId
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

    it(`/GraphQL adminDeletePermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            moduleId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a3448654-e7db-42c8-840c-9c47ee589727'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('a3448654-e7db-42c8-840c-9c47ee589727');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});