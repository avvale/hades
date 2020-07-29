import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0cb0483c-8a7d-4378-b026-f78949422144'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '26dsem2ldkzlcrxwvtrg7zxfxe6oo1w7ru980ffz'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c7e37d86-9aa6-4fb2-afd0-df883496803f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'acacawmuoohynfcmn9vs85h4im78m6v8cw2jpmwyq7qfvedxw4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1847fd8c-663a-4a25-9186-564787c9cdb5'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '1ehb8rs1arkxqsd1me2v'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'er28zvkmrdxdvbbrk24x'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'fv3qp5gpcio3cv6rlm58lm54torehaimqng2obi1khghir9g2jf1fpjsy5dr'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '2sk250yvim9ynhx1jcwriamnqzsrb39pg26dnict57wngnnxpm45mtp2bz4rnykt7e29b7vvgre08dspyw570caw0hd3qoks11c6ykscicfmumkivr7syyqytqqrg4jwfm8a6qg0hv0nq9wyultha2mu2fe0yka4'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '1h4xxp1ls9pgl3o43m41famipw2k5lr0h59vyyhk4yzsbu437fjrapu2huns9cq3kfecd5zhpihnf00ld3fzyxrivl91mmkqd28g5nlbk97ozrvj6b7s48soy6p4ic5wnu0gy6hbnwlk8yw52h5vzuuu94ewhi2u'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'kfyrmyq5e08ngsy5pgp4asrstaff5thmb9v9y8677uxo20zzakth8uzsqclw7pw0n83pwa8ap9fdknzokdzycs18dbvx1o0fw7mguxvv812e7l81lu833ydq0gi7yobmcca0ceiyyxy82k28he1qejftvbo3lhcq'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '39tfvdjv570oom1k6usfdg81t38vvxhhw3u4arrzdyvznx57kp9i1v3tisa42ax4xkfst48y35dj9jhlp57bofiue2fhzxckeetv1zgkqfmnesefbkeo53nb56d46jhxbokwobmgxlhk82jymdbzg2ucmcnns596'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'j757a8vndysxhsrsa81m8bsngrpk11pd42voykcadgvfouegl5iv9ye1jv5yvl9l8i14iwsy09l2z9vt9zdyel882mhea2fa78mincsx23lc8w69szwgy4tpock66bv4ff1nc3tare33bhnh83yp6u3uwjnkgczf'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'wikh23wa7mv0q4fl8fn5'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '4kzy0qahl96nledx67t1'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 03:33:52'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'suvl491zox3m4h411tx6l1dz6xtf4ku2vwrtao4ljpp1oyvug6wubodfsfa8kr87jxf5rxthvkeps8ishdqdppftlpzat1djcmthyogx05w20q1axi27sf4ouqn37l9pm64d9ooq6eqjmpbp4hj99kc9nl22vqp2gapez1tnquopob2b5jn5ydfz7n3cx1wlbnu39ppm74750ylpo8u4uuaz0zbgudrdofrogwf0fnvz9l8pfoahhw9i0wwl3jc'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'vratpdi9hszkq4gsmixibtozsbi5sojgmcricrlkonke2dcz6oggwfprwerst2267ic83pnw27wbw0d1cg3x0dat3wtkg7c61ea3nt2pknj483u0lxv2tqvfbh6tf9bbcie1hisljjq0elj5iia795kyflx2rbiqbu44uqnorp18m5j49llc728h14bykph64ceqlu18gf5fh84385xmxt7uf3d6hqvlies6029mvs0q8z7eshoxblr2ztkza0p'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'bsphrohum16l4dy3yuhzc3cs0ejvrzn13nuddahw8z0p1hl7pv5ajuxlezyo'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
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
        example     : '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
