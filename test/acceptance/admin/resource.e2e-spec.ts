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
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: '17a0f1d0elio1d58j3fav46ks23c8q4fqmqr2v4e7dh5zkud8bn5e2l20e0dyy4nywvd6gcx75e7kwzarn46759me3f2dp0ikknevmakzuatk3gvf5nqb8767egs7si28y6f9kbmd1pf5hfs1xrx6azyksfd5lj4fecb5ab31e2z5r30iq3962ag4jbb7horrw1vucvwne4y0x88x5i6ogamdmewdb11gdwcupk9at7n6t1tfgbus284dqj8f1k',
                hasCustomFields: true,
                hasAttachments: true,
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
                
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: 'nkqf0psebn4qqos40wnml05cbr4vog1mu0s9flxperqm5bhxvsnfvybxd7pwrilenvt5dflnc7p4evxnii3vm1zmyqsqktza2i46to418vjpngziu7i09ethnrfjcjoyfaapdwquskputaox4b0p5sbaw5hctk4al1d0yyhf16umse61ki50ltpdm3kmoldnd29j462tysevy8kio7kc06cqs21b1qjig8p4jueihlnfmrcf1vv6gq848q7uewz',
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: null,
                name: 'bdhjbusnmg0auq3jz45a52rtxjbadp7jnxfgnim2hggxxzqs6rgejpk2ugw089htgmhdtc4xkqwjfgwtgkixnblhmxifg05ntb675hjou2y0u9lmp0p5s6xhcy5ixfhivmhimog75yhzxlj0ovgiofqj3qr2gd5p93mi99j6yq2fxuc9w2yuk41288yvkvyyt9kf00qsq6iz89fx8gmi07jhlfas4qbx41rnhmw4q1w7jnygcjxwbmcf6ngr4l9',
                hasCustomFields: false,
                hasAttachments: true,
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                
                name: 'm7llszqchhp6folhedyeto9n04h24kxx1kui3nrtlyuu5258hpaxjx6nlroslfmvspvls4j1b0a4rvhbw7ixipvc48bfou4redodzuo3n8n4r0kgl0b60m5kkp25lvk4wezstln9kibslsv636w721jahqaxc30n3tk4n2cdob47v1mze24sniijd958btzd97kcjxv5dqr7cx7suzllr762lpqmqh1p266c4os5j3xn7h9m7cs9ecl9jehjb4p',
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: null,
                hasCustomFields: true,
                hasAttachments: false,
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                
                hasCustomFields: true,
                hasAttachments: false,
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: '80l01bd78bmu0ceggm8cnh7xn6214r7tfu9puwgcjr11yjbvg1fkztty0d2ith8gkp2ndxa1ib5e49gijt19u7jmjtfvc5xggtfp8ygstk8mrvat4icukpfkh2hh6c64u577921kkenurkh1v0s9hsls2zd0kqtaom6unou3ls2en3dvxb889lidfwmj0ifpa60x7bqocok1sukqi3w34kt8x320u5wtzt5io8tk95tu3i12o0vamfseizm39fv',
                hasCustomFields: null,
                hasAttachments: true,
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: 'mnltrjoct3y8z7n6b92edosk6914mm7ornlou08q3dq0dbxr6s5sbry4j6bwdp7q8r9a07jhzdpq9uzsgk558rod1b6to8wt14v2qm1034v660v4pelsiys8ine06se49bsmlrlowj3tf8ynhdz8plq9bog8moe8mafcvmqfubmxuyr1owwv16gzfsgkg7ek0mav5tzxoe0ee64ylg0nmtonze92kgdeclgr1hltm4fkt5duueyjpshsivcz4g7',
                
                hasAttachments: true,
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: '8vr9fu0gnii9lpbex2s5irxjt0ad2yfohwukgv5p0sp48hfinj56jp8uxavl35uzim4qb7zdvtrl7391rzknxuy14filxtg2kbpar1h2y3ceekyac7vk95q21lwx0smt3wder1el7l6pgjwfjcscgxcf2o3b428c76fb7qqykfkm0ol9zqihmql1s2zodi57u6o915c3urhi7vzsrxql23shunqjh6x8jj9t8uenciu1k05ynyx810xnsin8fep',
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: 'v1q7jn63b4xhfyzmxrxmqo6mkrz5xyx0psmyle1woayp1ut1mm5wind2z4ssw8ennznxog2n2elky7tze0x27bqvykkekcaoy9jslnyf86fwhq33usopms91vq152wwy14obljfgzl2rpbam1kfd83vyah8chj0xcfdjofmamokubtzgrjm6uvsg2wm9heyn2uo5smwwo4qdubcg4cwmph35n31r9f5z8kwt9q283u92fyu0aj4w3gf72xqpmfa',
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
                id: 'kmea8xz1pfduf4kazgof2ssf0xnazay51fex0',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: '5p4lpolvdm30dc8jj1ap7kfc5bn1va6viuxapz8457qxlnj8rf8qtt6tlv4u3xkr19ef3uzpyoia662w2nxx25ssh5ns8tdo7ypgdralemkflmvkjjbwuwdmz2kk64b3fes4we4ft223kqgatzmssziyvho79j1ijzcvwzs6nf7ntfp3h01q9wsko3y0f6i42enkx3neo55iiue1640g6d1mx9w5301ja0vqujyq6q3l6tqf7ptq5dmnzdsmgf1',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: 'qfg0jf4kmz6hkgw4tufkrxx2t2pncawtp8m8e',
                name: 'b59xy04py5rlrui3v58k69jy5demnit9fgvv5lduea5xqx1g5c9b8z3qwpvfrgzchi1k0zuapstg4pe5fia3yo21b4miv4gp2m3ekqxvf4m3zuf52qkk630jr1jemoanvh1uw0wpv0fznwj9ymbe6xe65qwi6y3x9j1gu7ze45sehoqynxna2thczrjaf0vdf3913las1twxrusmvuye3o6xg63nful7cn2zpdv910kzlibn91tga9xsrjikp62',
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: 'rmd2vlod3t1j12x0yhe3z6llofhs6dr8aqy7z0aizmk3smzy9mjf0w0xprdqjmpsbp48zywq3wx2xospedip5eoi7jella9cl4kuoruwf685ny69s2685oyl0ltukj6t9rz37an4niqpnw3myjm94wmynz6vndeumek1sv0wqyj26j9begwn4io5h4hcxumbbnv8r5n6jq4uen6ztiqrgjyg0svr012r34onk87oi9v5k64j9pwab3ns7xy07m09',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: 'l6kvdsdk85oowjqlf66lpdjsva1283jj18i62by4dq9fgwmrgoduj0xs0l5myk696tkvbub6wchymrh8vav26nr6rvvg0lp1xi3tvprk2i6g2picl4fymtevid3fj6z55ljjr6vxz7z4cw9ggv9h45aaxscmcpqd5yk63nwpbh92kp3238b3wagauvtpuy9gm2ndflmgnbaenks6mnyw1wbfc8tvhg9aadm5asr49y93gxtl8t5yrwhhwv9mgbu',
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: '7rcvjshpmue21ln2snnhfto3iyrugwyv8r0sptry2a5xz2gns484a4ys8qeakexjfvzt2z8hz52mouvtfnjh7e82mp9w59rrtig1tw9l4cmdkdh3y6cazbiyoj2a6kvye1grgeo7r89img1gqdnc4pzop5gj2r0pbpk7xplwwwiaqrmvkrew0e4pkal7o5pixd47n65zpot43xyyxjodc3937hbrcip07mwwyorm3qoiaem3459nhiogmq3ym4e',
                hasCustomFields: true,
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
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: 'y5ol6ou8bhyvkozsq2ch6k3hbao7nmu5skrg29xg60nkg2k5dgaqmhfy5ozla2ouvqw8p2s5b87qkocse3paln58ni7qdgf3um5htgczock0sru7o8hnt2bjnnsfq9h8ijobod4rx2rt9x55zybfwy5wnuddzs2lvu3yjekcux7bftdfybxgd4m6619za7q0zcvgnlsv9us9l70pz9uvc3lwa8vogzy6lipcu0yrmj77dgigncf1w4sk21pcags',
                hasCustomFields: false,
                hasAttachments: true,
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
                        value   : '1bef28b7-2f28-41ea-a6b2-26d7c06f8bf0'
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
                        value   : 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/cd9ff19b-e9fb-4c88-b0d8-c915d9ea7971')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/f5c3a70e-8612-4d93-8db4-f7aff287d97c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'));
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
                
                id: '17b413d2-f943-4b7f-b866-feb2c42218f9',
                boundedContextId: '1c12c3a3-1299-4970-9c79-7a3b3d8e10aa',
                name: 'jjdfhcocqdtdvcnzofakeis5b1zln3cx4u5d7q80l4kdxtkaqaa90hhqrzk051xy4486aeyozou4bc4m2506s6rw0vj9im6e3yfnr8bo6b4g5vitu9o78ac7g8w301erbkxr05d8eoyvawo690e5ixt5oecvsfm8alzmvt655c2zlakayzc8umntlj6qz2mc3eyax6ig1zeatjtt0uxx7sjl10qb2y99tluclsbxa18z4xawq3pk0wgctjq29wq',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                name: '25niop88fjymys147cswjbbllsstw7wl47vueggavx0dquggzlnkkju1vaj542dwlq73x0p7ueneufs8126vus0drsvebz41mcaidy3c8y8dodlknrypupjci2ouvl479miksfmf7vw87qbsrynqyfjhjojba31rj0dlde14hcwdot8xnhyg11medyyycwxrgn364p8n1ukq1e23zueckw878ukklnnch8eq4wq00koqwqvh8fsy3czpo5e43d2',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/a0cc64df-4d8f-4731-b8c9-fa87827d00b3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/f5c3a70e-8612-4d93-8db4-f7aff287d97c')
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
                        id: 'edd6a1e9-cb50-41be-8289-6c8909d4381f',
                        boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                        name: 'ynaiyxpf0advfj8aarkx09y1l98ab47xeew9fu2o9enkrxjlz3g8ajberijs13q9wp6bx1lymm7grka3us38yir6y0zsu9beqlht3bkflmj3s4l1sxoua2ywzcf3t6j1poaj1zf96o3o7subdxbwlp9nnpq9p10m7z4m377xdgktz9hamzxkutg3af3ysomtx4n3rjctyemdd5ycufobklgpeofxptypptqphovglyvzdgcnjxgoa2qo5ie1qf2',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', 'edd6a1e9-cb50-41be-8289-6c8909d4381f');
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
                            value   : '054caa5a-cc38-4fbd-a44c-767653ec74d0'
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
                            value   : 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('f5c3a70e-8612-4d93-8db4-f7aff287d97c');
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
                    id: 'd7ca5151-625f-423b-95b3-4025f1752fe1'
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
                    id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('f5c3a70e-8612-4d93-8db4-f7aff287d97c');
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
                        
                        id: 'af9f7fd8-6095-4318-a058-68f5e66bec20',
                        boundedContextId: '94a0c400-aee2-4300-8574-0e53ea24f414',
                        name: 'c3o8w6nsufhmkmftrvryx288nl3mrogey5o2hfggok77xhvo1gyb26rqor4l5tr008fda59ngtq17bfwv539eqklrq2k5cc45gmly4gbve0ycet1ejtvnbk1h2mym8awz4p5w2fno93jhejzuu0bjr9pnob64lq3s28cgbyo1sxeqdrbsgc6ef8s26mvaxox2g78ok5p3j2vepyhi15rl3vrwdy20j5xwe6sj1h4qa8o2ecozsgjnm79ehbqg1n',
                        hasCustomFields: true,
                        hasAttachments: false,
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
                        
                        id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c',
                        boundedContextId: '1b503db2-81ee-4471-9ade-b9e1fd85a745',
                        name: 'i4z062r2l6988yo9rhpa586qa2xrdbi0fv80914kdzjw0lzhkpfykpwjf1387n933leby4ghl3bmcizoljzb4htfvn568rp8mn0par2fl74qfzixbb60i3707jwvpgve7y48jh4mhdfwtk9od4dz5yd5bbfs6ej49jjwkicf5m3rcdsezramont4f88qiiu58a8rkf03vekxggw11dkacx71h94w0zmz6kb79jk4dr89v1b57d9gtw1ajjngdg6',
                        hasCustomFields: false,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('f5c3a70e-8612-4d93-8db4-f7aff287d97c');
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
                    id: '0dcfaee5-9f81-4fa3-b6db-371f0e966fae'
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
                    id: 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('f5c3a70e-8612-4d93-8db4-f7aff287d97c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});