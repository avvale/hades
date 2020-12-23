import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment-family', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentFamilyRepository;

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
                    })
                ]
            })
            .overrideProvider(IAttachmentFamilyRepository)
            .useClass(MockAttachmentFamilyRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment-family - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'qzmup1gqj61xfwxshqj2451nmvc5des9l6kf722z0yd76isptv0i1zclvuca8zgcbigcw5q8pt992vrbvmfu7otyww6rlmzjfckucz5kl1jevzz43ud5urb46jw3zpr99m05489bu3i1thcgu33jv6ib3juqet6ap3d6h693hus0etvsuukkai1egc8djykcpswvs12jn67scr21e1khywwjnfs8swacykm1fdv2znksidzc02cs3phuo59h343',
                resourceIds: [],
                width: 393848,
                height: 554065,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 339,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                name: 'e03dbrxly69psd9eqzn2mo9wia73rgit94vyhew6jbcuk29jss3lbngmd2qbafsddg2scxrdm20aod1ltddezhgqtow8g484wsiu5teccefm1cwtus2kue54snp6yp1i70reojywvyymtsmpwcukjdtwqbr7t349ukg8ccez47c4tn4g0lookdd8veczzb9iz6thfj3f09w2a6e7xo9p3wcux8wnq4xpq9ucxjork9nubmkwgre4jedx9u3pqi4',
                resourceIds: [],
                width: 187388,
                height: 517013,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 613,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: null,
                resourceIds: [],
                width: 217661,
                height: 362098,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 355,
                format: 'PNG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                
                resourceIds: [],
                width: 336373,
                height: 553174,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 882,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'zgowrkx3qwnf7zskgzwa48c8b1r25fe85deun',
                name: 'b6821euyzdeq84fz8t6jtuimmlq0f4ovzq4c95hhm670df7k6alhwtwxnmnyweu3escgr2xxijcshn0kggxbn99nh1r10o9y612271jfh0ydh04k8b2chut9n3bm6v172v5ygbw9xstz47jteyayih68m8kc3m4wwb6mu99ssysxcsznmsbujgle546inybemxmf8eofs0c6g61wwhqw25a5u9sndzzwtyz57hv345216x58k0j67xdbn3xg2n1',
                resourceIds: [],
                width: 509501,
                height: 859334,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 288,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: 'y5sgkkwyrkhirtphqnrz6hpp4meehfin5wkshwop55to0fy1gryvyyyq4tuckx0fa3eizr49utoou0g5zh5iicpri5r6d99wkn8z82wmvl740f15lpxr0sfcchd01j2nm8mllhmd50u842qma7vkpgjwl51nr4zntehgilo4e5fi2bkmsfretp9xd68kyd599rrim2m8ohl64koeohkanoklpm9j4hjyagu1dnrl1owgy4javkjd62wfoala20d2',
                resourceIds: [],
                width: 284640,
                height: 269020,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 828,
                format: 'BMP',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: '4v2h7kdwbhsth2v7zc8hlfcs7ooz0so70w8wqf7vq6al23bab4z0d2b5cqwbkxm8yjs4115ni8fjvlbmsmj4le471ol4b6hirkta7bru19q0k422x1ose9sz85iq18xbsgmci3qif7xvvvugbte1dlpix7fkob6rjixdxs09gf9hnqgg7pij6i1f6nru5ncwx59upyysaghym1rwp8z6034hioiuhkbw895y6w57ryztgymyq9d7azch0q6jhie',
                resourceIds: [],
                width: 1821290,
                height: 300997,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 254,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: '2tq3dzz0501fzq5yjmjcbeozpjs0jfip12a1exv7dk73oxmedtsytkaxfrojjn4w8rtdbhecz8fnhatzuw7pemjh1valvxw2feyj1vek88fiozygwmbrp1iv0u5yjlrlhvhkhxqpugw78wpwwzn60fo3c9dcisgbu3e026eo9hm6kw1qh3lkhcpgiqb9nsag4di6yhcx642yt8nx2rghjjn6d2u8wmgzis0v7s5apfgb3kye98kp5fwap1rjlea',
                resourceIds: [],
                width: 461638,
                height: 2693013,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 477,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: '9t7mewuqay0med5stg809rh3oqbpxtxfv4nj0ihxwywtb87acqz077zigbsh4drn94qtxxhj9ue6ky6l8or4dzpv7hvkwzj1kojiody7p311qqu6lk7fr2jnf8atd4z8xk2v7w7qk7lxrowrwxqro40p5szch4dd0u0fg5noxl1v6plztc5nw50p6237u9uclnmihtx6bumo6wjcie2gl0mqasyd9ht9v9cn0yvpwaxe8hqzxkf2e7ehize9ww6',
                resourceIds: [],
                width: 200941,
                height: 178539,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 2882,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 3');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: 'otuytdma1n3slo8v3c7eqzxd7nbhl1wacnfxifxkgefn8d1e5opkdnnaf3x5szfwwzbehcuwpp9ufioj16qbhd9n3vb3p3ys6uglj0e8zu4k07aelqi87c4e30c8tq1pypdsy0qekjk0hib9eia8t0dx4dt97n5bicpu673g8w87v68dfypnax7tsvf33u5raapmv5bmu8qgzqqeu18dq9dswbb5mkjykpiux973xpq3hcf56rcp2h0q99g7h9y',
                resourceIds: [],
                width: 540011,
                height: 212409,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 655,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat has to be a enum option of JPG, PNG, GIF, TIF, BMP, DATA_URL`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: 'dht3dkslthpr4mw6zprd6kgn0dp7uztv7zh5zd1aipalpsc4glnz46i0aghqwurcwbep61zt9eddytj2otzpx5gpfce5l57obljc281kg27n8vq4gn9laycp3e6ofe8rgwjead8yw5oivxlhsxge9yyezbf0ykgvwrlb3yfpaf7orog51vxql8nc3firj8hmpdcyjiahxnjyirx305jii7ezc4wxif9x4q7atx5kfnjt6b1slx71j2u07spm05s',
                resourceIds: [],
                width: 213475,
                height: 268615,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 591,
                format: 'XXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat has to be any of this options: JPG, PNG, GIF, TIF, BMP, DATA_URL');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: 'oyhn8t1098y7sfxm49bmkowhtoskaaz9iufi4xk2vugunfe8a3byco7nscl4cpbls6ess4qrsdji720zugcumor064vbg5qlitmfxslcoa63iouloz7ihq1hr8161boju8xckhfup25k353nwcxjalh0ctaimsozgxee7b1i88rutrw50ayudxfjipe75cbt9nqkk4g9d5yb78tt0q4xq8yi3nvcg3ehjuviqcvfwzao8ashdqxwl36qi39nhl0',
                resourceIds: [],
                width: 781838,
                height: 895845,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 138,
                format: 'PNG',
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-families/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families/paginate')
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

    test(`/REST:GET admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '397e8276-8ee0-4af6-a6c5-3bdd545104e9'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/cd3eca21-5d95-4a1c-91f1-d2f4a193b369')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c'));
    });

    test(`/REST:GET admin/attachment-families`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b091ac27-a7c0-4809-9155-8093decc2ffd',
                name: 'q9w6dzz5ra97k4h8k83gd33md8otp00dh8xe7pd1yg00lucb4k8e5kxns050s83wxwg7tgtskhjyih78yb8w7orgog1j5vwmosha3ibkc6xfatpwguld4fhqgs5evif16sxh4799wvklqxqbgolus8l4n819myze69rwceiln7z6unjrav5ij2lp3uridvl70aqoa0mv94nmn8z6gma0xv36b0kne9c6g2ri267a3n95hyrx1fbbf3nsp1jdjag',
                resourceIds: [],
                width: 473125,
                height: 898197,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 967,
                format: 'BMP',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                name: 'puxgevavh61mywc4i9t7ic5x9vwmzucd83us2x7xeqhd0a17cq51knzgkb91z1x9yjjkqyz1sd0j05zw04n5exlf2vha47wvbzr8htdt1z82s20wo1a7svdy5j7l3kn9rdyx41hphlkx6ewfezap4bl6hftai2oslqe83di08fqjjggb80lggrngsid8i9r2o16fj1pd680aiqoadvw1gz3ss0c017t145luokvet3n4ccv7bsq2qlgttubip9b',
                resourceIds: [],
                width: 217283,
                height: 436930,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 378,
                format: 'BMP',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/8f16aa5f-d223-4d09-a824-e8e9bf3b67d8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentFamily - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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

    test(`/GraphQL adminCreateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '33231ccb-cc21-4a9c-954c-240bd1bb8dd6',
                        name: 'zto79kd1zapaxhndzr6xv3zrjwwc1ryn6ho38pbvpv0utzw43bkn51r09nf1mhp7kh84jn62t318119ipg17dgsi2cp8tb45ftxz782rfyje5a0p16xhb1u4rauuf6y0umj8hpaprp0m8tkq47qxx64wbspapdd02ghgqy0q8p9lnlhs4y189qnd480qryfpwzwuayis6csnlh1ibilo8djvogddj30w9jix0sblwplt5004xyi6hpp0xvbiozp',
                        resourceIds: [],
                        width: 302773,
                        height: 784224,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 443,
                        format: 'GIF',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '33231ccb-cc21-4a9c-954c-240bd1bb8dd6');
            });
    });

    test(`/GraphQL adminPaginateAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentFamilies (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentFamilies.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: 'd27d7cb8-da38-41ff-b27b-2ac772ef1246'
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

    test(`/GraphQL adminFindAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bd63d653-d58a-4466-bb62-b5327cf68123'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c');
            });
    });

    test(`/GraphQL adminGetAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentFamilies (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachmentFamilies.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5a0b69a2-f188-41e6-9432-5dbc29feb933',
                        name: 'ebyaf7fmzvs6kfos10w475nfqytupcmk4alqh2lqbtcg7n4oy66dzs849bap827215sv4ba0pw6lyg0nypjgkvuucprvlzmvlryiml3ywuhel53kmdbrfmj5rf9kd6g5eecbtvy17lt9oi773efbrucmm27zko9kbwv8p4375hannvgt7jqrdse9scvjw4brkb12bbp7qz1lyznl620eg1ml1szcrr6sooibu0m6auxbqzvwk5sbjr5oy46emt1',
                        resourceIds: [],
                        width: 555173,
                        height: 818619,
                        fit: 'WIDTH_FREE',
                        sizes: { "foo" : "bar" },
                        quality: 897,
                        format: 'JPG',
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

    test(`/GraphQL adminUpdateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c',
                        name: 'ro60ufadfp0g418xsa0i8roasloz6kaug7u9yq6xjrxy684vyfcfbpt7bf0eeocd12d39gyy15boc373y0u5ang9qi5oviblfl2rqoslm2d0ia2fc4tvc6qzptmnf4k2l5z2imvpqm6abmtzv74q4rsd6smj4g3o5myu01xcqtnxo0psyxmy7f7ar8xk2dimmyemmxu5vje3f2cl6qt660eicwwusp6tyvi0tocok1e3bt5gqtx2ce1g5z3pis6',
                        resourceIds: [],
                        width: 200576,
                        height: 777815,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 544,
                        format: 'DATA_URL',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86ba1ee9-8511-423b-9d41-2aeae89f51bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('bbdf5873-1952-4b63-9c1c-cbec5f2e8e5c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});