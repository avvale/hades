import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2555e035-48c1-48ad-97a6-1e3a58b51eb8'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e78d2df-f68f-4ec4-accf-64c4db55a59d'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '89c5ff48-29a3-4258-874e-72884d6f1c4e'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2ys0enp3cyzne9fmlqva'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '4woad17zuhalm96z9emu4hkqz1q5anhs6pnkgj682n1198ijxk0accvumh4h'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ttkwhjhkgpaivc9m5hq0915u1g4753lyfa4eozjeljyczb6ul271a3dfgobv0iqrm9tg7pezwythzabt2rlro5uhbe742w56oyzatam2ibx162z22u5wnmsrmc2bo4necmlz0svqvb4l5midic9n8t7dpn5kuu91'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'bpr4zsllejahwdngyl4zu2k5ph34y5nxrtse5k4ipgbiwdddh1gnwzwab9pq92j0614ytsxo1rto4asesrybjxv9ce34fe9wgzdose28734l0qxauv349o20h6ah8posc9wzsqwqvp1mhmgi44clg6zq5wvztgxv'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'dhbdi2b3v9lz26u8d7f2lbpyp8nbldbqpznoa0mt86ursyr32b5zs3b88sl9ehy0ct048pipkr3lzpqfh9a96m60dr3svqacecoag2mx4zshg9mnwdcwrrqwb1i2i2yscu06lldhul5euu18ccyhl12lxfrhkc56'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'davzvrfle9su7kqu1n23m3obbx0opl2zmowh3zxrhrsf6khml2ttqkwwo80ie9vcy3qvumjrrjvcqohb19c86o473hxuk2smt06iefc6kta78xt72y9fmzunj6qxum3aclfthg69g5mvoax5wwgl9aq3tpgybf0s'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'idbgqcjqdah5hlplgpl2n0njr9f260c54i9wo540nf7136hpi5ylvoe9bmyliso3l09iecbvhnarnhug7bysaq8nowdl1ebxt7muibjp1xbydf21tas3k9i9e5ltmzdf7zc4vhe5obmp065xypecw49j3wg9a7uw'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '24gtm4cfapy0orqzaste'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '7dqkw30tt9c377uwzahr'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 19:09:43'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'yimqhctfvg5uy469wmsnalt4o0l6a85houhgt9khi3gardf7age2spqsbzh8gc6q24puvu8g8ijs2yjxdcexb0phjkol4bzoj996e7s8zlzateltqt7a8b5l5261hbeh5c73fzppl93haz1ct88vhyjcallid7px6v1w3c8jmqtm0nnkjk9zi9gqjdes12thmzedu3i839qisd0duhigtnz9s154f2mldbv42anrr6gqrqgn1cce4fx4ag4dcnp'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'cdvlymindj87kkcpla93i15070elmhwauuu6dx8zl5blcg70zl78dbev9hdfjplcj3eq06s6nvm2r67cqb3xcsydtpuymos07v71xcb2807j2w47hej0oai6jnw98dz3cl6w74grwsody8abtfj1bhfqupszipbph1e2vo4xwfrun8ekmsdwhnr52c4wo26nxa73ldkp0pryy3xc4nedm86f5xa4lhgn49mjiyxkdoitz73g23mcc5dt5bdrw8p'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '812vg3i9ehxhop968s7o7ui90huc3hz8hwcsgw08r5pr3esu9zndskh94f3x'
    })
    application: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : false
    })
    isComplex: boolean;
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '18786df5-5e39-452d-99bf-35a1b0bfe5d0'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    @ApiProperty({
        type        : [String],
        description : 'contactsIdId [input here api field description]',
        example     : []
    })
    contactsIdId: string[];
    
}
