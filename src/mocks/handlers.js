import { rest } from 'msw'

import Acredations from "@assets/data/api/acredations/default.json"
import Semesters from "@assets/data/api/semesters/default.json"
import Topics from "@assets/data/api/topics/default.json"
import Versions from "@assets/data/api/versions/default.json"
import Map from "@assets/data/api/map/map.json"

import Entity_PDB from "@assets/data/api/entity/pdb.json"
import Entity_Valenta from "@assets/data/api/entity/valenta.json"
import Entity_GraphDB from "@assets/data/api/entity/grafdb.json"
import Entity_LA2 from "@assets/data/api/entity/la2.json"
import Entity_LA1 from "@assets/data/api/entity/la1.json"
import Entity_Empty from "@assets/data/api/entity/empty.json"
import Entity_KSI from "@assets/data/api/entity/ksi.json"
import Entity_KAM from "@assets/data/api/entity/kam.json"
import Entity_Plan from "@assets/data/api/entity/plan.json"
import Entity_LIN from "@assets/data/api/entity/lin.json"
import Entity_Dombedan from "@assets/data/api/entity/dombedan.json"

// Custom handlers setup for mocking data
export const handlers = [
    rest.get('/api/semesters', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(Semesters),
        )
    }),
    rest.get('/api/acredations', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(Acredations),
        )
    }),
    rest.get('/api/topics', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(Topics),
        )
    }),
    rest.get('/api/map/:semester', (req, res, ctx) => {
        const { semester } = req.params

        return res(
            ctx.status(200),
            ctx.json(Map),
        )
    }),
    rest.get('/api/entities/:semester/:id', (req, res, ctx) => {
        const { semester, id } = req.params
        var entity = undefined

        switch(Number(id)) {
            case 0: entity = Entity_PDB; break;
            case 1: entity = Entity_KAM; break;
            case 3: entity = Entity_Valenta; break;
            case 5: entity = Entity_KSI; break;
            case 8: entity = Entity_Plan; break;
            case 11: entity = Entity_GraphDB; break;
            case 19: entity = Entity_Dombedan; break;
            case 317: entity = Entity_LIN; break;
            case 319: entity = Entity_LA1; break;
            case 320: entity = Entity_LA2; break;
            default: entity = Entity_Empty; break;
        }
  
        return res(
            ctx.status(200),
            ctx.json(entity),
        )
    }),
    rest.get('/api/entities/:semester/:id/versions', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(Versions),
        )
    }),
]