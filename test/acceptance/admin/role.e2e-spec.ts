import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/admin/role/domain/role.repository';
import { MockRoleRepository } from '@hades/admin/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST admin/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'b2zwk6r9on7wv5unqm0i6a38r1fpdp9ob65tlmcf8kaz2rzlvn2uvckrroldi1uqd351z4x0yq5rv4g46ls3x1z219stlyglhkt1uaimmvjvk5t7u10b0yzrx4kabrld0sq66ryyeyg8cm2it3a713kes8pb24isiax99bt9u9uyp0ptnz0sm79fwpvu5r3jze5bk02am0c5o0us21og6ufycqb1sscclnsvwoyiw37tqwwcth3017s1vqxgl36',
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                
                name: '0bl4w4z2zq78eo9lyvt21nrrg1bxy1qg8lkum12kgj24gokkd6n1c2v1d39yi18kyeo04h0kfctupw39i6fr48gu8fqw7fkj2z0nvi1mtcdfypow8xqxctoyjuwoz68wtnnevlfkh71t8vny102ebdoju0ufh0a1em0q2njpfyoiz2i5y7js3fibp3i15ci5b8lxmqiwqxuo7y23iqdfm7y61u4y2w3puk4nnighkfpxgsdgaetrvb42rfwdvgd',
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '40d09675-d86b-4634-a169-6156e4250d5f',
                name: null,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '40d09675-d86b-4634-a169-6156e4250d5f',
                
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '40d09675-d86b-4634-a169-6156e4250d5f',
                name: 'nt1djekrv8w62xzkt4f14i2b8madrweieud6a18xs4ge1s2mze7636vcvq4j207773gxrq91fgwbqjzdcrwmrt2s4a9laz5rqlqa0nsejzdx1jhfohql7msap4cced87j2arx5vam0rtt3ar8r2o2yyf2xafkk2dz42ts7pb795x8gqf4g80t12r17wr0vdyf1iudkbuj88djtnn4us4husx7gfj8a5nxznbzwgbznzloy905bpnabq7tulvf3v',
                isMaster: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/role - Got 400 Conflict, RoleIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '40d09675-d86b-4634-a169-6156e4250d5f',
                name: 'qnhg0lftvt15ikzmigx282s557e1ppvbaudhoyuggiiq6p26ahwo8btva4n5rf1ucaowwo9n3q5lcqnfzyaahdg4zwxc2v15ufsw38oai9jpikt6g8ka0kp7gyov3t5coy92stmj1wbguwb7fdargkk4g9kanp3ip61znhdjifbxko46q0s70xomefdz0ty8bjpedvhljapdqwddy5lb3811gno8qu2a41moqgais344349lk4u1dvszvjlk4p8',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '1226jwws7ia4g7uth4rfldp1adin081oyxbbv',
                name: 'n9bmfs8qo6yygp6dvpqr9xid9jsg9vj6gfmt4mxrsp8k5ucbvfwvpli9iz37okv24l5qa02rp6ldljgl6y9l1ypb9pe75qqntc5w0d5bf4y22k9eyed5g3uho62d09wwe9ug3mmruluwlf4hii5dmjt73wpqo5zyka3fcts6q7958t2bfig8ao4abv9a7pmxdt01jjzb88sgx0zany3slo29iptw4u0aj3cr7xv2gqjqsdcooeurdraqon0a8u5',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '40d09675-d86b-4634-a169-6156e4250d5f',
                name: 'mv02yw7sfo2p8uaw8nwvptwg8fgq5fo05qgru8uzoq93bid3et2fwy68ka6uutby7almbjjglh9cwzshiav4pxeapowk2xivlrocxxwecngfytjl0gl749thwad8946o9syvs32cvcmr40q4w0oenlkibmyk9pnrzk530pdyredovl530uz9fqkkyuhf63p5iw73nz3ro68w6euzf60hc8jusgb4myrf13inlz1sgsg65xxfabiuyjz2olxwnitw',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/role - Got 400 Conflict, RoleIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '40d09675-d86b-4634-a169-6156e4250d5f',
                name: 'fjqc0p5g4v346nk7p95jfaow8pjelqdm30h413k75qnq90mo8i24ny9d7kjfy8yfyv8zuoqtzaukofi51tfehkj2mnjotagc9p2tvx69qmktsleguboycdbyfcmdhj0y96j5qihzu0oyiy2f8kd6qe86b7kc6xz525gs0n4pglzgf4mt4j2lsg7qs8eqpvkbh2vyy4ngpkw01dmeg1ehii5ugmyu0acxtecyf31d47ky2q3ddcgm9rqwcgpmcl5',
                isMaster: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/role')
            .set('Accept', 'application/json')
            .send({
                id: '40d09675-d86b-4634-a169-6156e4250d5f',
                name: '2pcxa1k03djt00kncnv78wjscrxhg2z57jcljrbvws7i72uozcaohkurngvkq89m5kejjjkjlzgfob67ak09uovfkpys72juet60sii1egtolbpoliax0vr8bi3u5q8gk7idmh73xs07g5nbs7k2km074av27nwztpgxbxx2l4gratxikdwv4pleary6qxoswb64mmtynoloano1ncpfwj04sodjyuiz2afo22npn4i20v3a4q07fv694l2krfz',
                isMaster: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/roles/paginate')
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

    test(`/REST:GET admin/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'be9dccc7-28ab-406a-a2bf-2af0abb01481'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '40d09675-d86b-4634-a169-6156e4250d5f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '40d09675-d86b-4634-a169-6156e4250d5f'));
    });

    test(`/REST:GET admin/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/role/16c0902a-0281-43cf-84a7-a52356e4a6c8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/role/40d09675-d86b-4634-a169-6156e4250d5f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '40d09675-d86b-4634-a169-6156e4250d5f'));
    });

    test(`/REST:GET admin/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '2d2ffaf6-b447-41ac-a2ad-3edc9c9b9924',
                name: 'oco8yknvld90bxy0oozdnjzl6f4a6gq0yobmss7t1ab4cq9mq8ufq14ibfuylmfmqvfaboq768zp4uxsy811nclmflig24dzm46g6s144zj5i74e6fuumapbnll6f9izoxrdko06of47irvh49h1tftakoy5f73ox7bunq31u9dlt2klvq41g19if7lt2r5hajnjhgqi272a2lulafgz86lox1i6ewhf9xd24begmjkdhbmdbl7tdxe7dzaf3f6',
                isMaster: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '40d09675-d86b-4634-a169-6156e4250d5f',
                name: 'x5glgnavgjk62qfmxnfy6o1qqtzqvawlyff34dl06heebkegqmq80qasv2uej35qwp0lprmfooi9r7lzehrilopa5ox3sg1sw0u0c4183gg1oh9s84u7zefrpe91wcjst2fx2txvqngwy89sbv1u8g41wkw63ql5afecc9kqrm95bc9k8nykgokvzvfq87eyd5wnhlpl6d7zp8ass0c5to1t0u7787jo8uqdyeqz100nse4sdptx53ob6p99uva',
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '40d09675-d86b-4634-a169-6156e4250d5f'));
    });

    test(`/REST:DELETE admin/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/role/036736b4-c7ad-420c-8619-22d5501cc74f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/role/40d09675-d86b-4634-a169-6156e4250d5f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateRoleInput!)
                    {
                        adminCreateRole (payload:$payload)
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

    test(`/GraphQL adminCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateRoleInput!)
                    {
                        adminCreateRole (payload:$payload)
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
                        id: '8b1d9aa9-eebc-4db1-830a-92d5a328d3ee',
                        name: 'mgz0d1jv8sothzqlt1t0316adnnyekk81ro1uviayqngis1j2ilmbhwudufaiwl7t00cc3zemntmwiythpalim96qqvlj9a1xbgo8wj8xzv3ec8wgvg7dalg2d9zbsfulwuv9uah7bxw6da19n10lncz2pmkrp413jgtqvi4esat2owe3y7rsyxturj8zm1czllfcglz2dn3y152vk06axkgijibb99w29lc11fvzfcsfh35ai33sz3spp95b5y',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateRole).toHaveProperty('id', '8b1d9aa9-eebc-4db1-830a-92d5a328d3ee');
            });
    });

    test(`/GraphQL adminPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindRole (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '17f03f97-822b-4c72-96f6-1de3b705f761'
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

    test(`/GraphQL adminFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindRole (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '40d09675-d86b-4634-a169-6156e4250d5f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindRole.id).toStrictEqual('40d09675-d86b-4634-a169-6156e4250d5f');
            });
    });

    test(`/GraphQL adminFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindRoleById (id:$id)
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
                    id: '73fef8fb-0943-4a40-a946-446d821f7596'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindRoleById (id:$id)
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
                    id: '40d09675-d86b-4634-a169-6156e4250d5f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindRoleById.id).toStrictEqual('40d09675-d86b-4634-a169-6156e4250d5f');
            });
    });

    test(`/GraphQL adminGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetRoles (query:$query)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateRoleInput!)
                    {
                        adminUpdateRole (payload:$payload)
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
                        
                        id: 'e8d520f7-5a06-434d-b852-9c5b06781c27',
                        name: 'uuyopkpqqeap76nv9y0b0fuflq84uk1fxselz4chbcnbingemnv16yath6v0iif4o4rs5iwu86dhpnp49q5mx09abml9o78qisryam0583te6hgg1gc3a53e7wnhgrm58t0a7xj3zjgxlde732e0htxl091gib49a45wdh3m4gr2li55ocyjfv6kka554ylxq0ypc5d1limk1fr5fasmn832rwg8xc6276cw4zq87900wdswqnsuxug42ash8pc',
                        isMaster: false,
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

    test(`/GraphQL adminUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateRoleInput!)
                    {
                        adminUpdateRole (payload:$payload)
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
                        
                        id: '40d09675-d86b-4634-a169-6156e4250d5f',
                        name: '5380fb93uni3qkvs1b1vstwgri5u0mfxl10lqlydxp64xthwn85sf6kmqwecz9icb1hfa6vm8wirkpvbdvt1a8nbn3me8h2rrl3odnxi00je44kk9i5adubu3clgmv4o708s090a0acm7bn4dqnjocejko1v5tn7junq3yaasrzf851bnzeqj345mb5ljm4cm0mosy6hcv6ov6d3771gkmdtt73rdi59umfmi5cgecd0ecswxhhnvi3lspmfpbs',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateRole.id).toStrictEqual('40d09675-d86b-4634-a169-6156e4250d5f');
            });
    });

    test(`/GraphQL adminDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteRoleById (id:$id)
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
                    id: 'fa0ea332-b153-46c5-a61f-9963f266a7d0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteRoleById (id:$id)
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
                    id: '40d09675-d86b-4634-a169-6156e4250d5f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteRoleById.id).toStrictEqual('40d09675-d86b-4634-a169-6156e4250d5f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});