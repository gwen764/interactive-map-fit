import { COURSE, TEACHER, PLAN, INSTITUTE, TOPIC } from "@core/utils/constants/entityConstants"
import { EMPLOYEE, CS, EN, PART, PRESENT, LECTURER, TUTORIAL, PLAN_PP, PLAN_PJ, PLAN_PO, PLAN_PS, PLAN_PT, PLAN_PV, PLAN_PZ, GARANT } from "@core/utils/constants/relationConstants"
import { COURSES, FITTABLE, WHITEBOOK, SURVEY, USERMAP, PROJECTS } from "@core/utils/constants/linkConstants"

import base from '@assets/stylesheets/base.scss';

// Utilities to demonstrate the knowledge map

const EntityTypes = {
    [COURSE]: "předmět",
    [INSTITUTE]: "katedra",
    [PLAN]: "studijní plán",
    [TEACHER]: "vyučující",
    [TOPIC]: "téma"
}

const RelationTypes = {
    [CS]: "česká v.",
    [EN]: "anglická v.",
    [PRESENT]: "prezenční v.",
    [PART]: "kombinovaná v.",
    [PLAN_PP]: "PP",
    [PLAN_PS]: "PS",
    [PLAN_PV]: "PV",
    [PLAN_PT]: "PT",
    [PLAN_PO]: "PO",
    [PLAN_PJ]: "PJ",
    [PLAN_PZ]: "PZ",
    [LECTURER]: "přednášející",
    [TUTORIAL]: "cvičící",
    [TOPIC]: "téma",
    [INSTITUTE]: "katedra",
    [GARANT]: "garant",
    [EMPLOYEE]: "zaměstnanec",
    [PLAN]: "zajišťuje plán"
}

const LinkTypes = {
    [COURSES]: "Courses FIT",
    [FITTABLE]: "Fittable",
    [WHITEBOOK]: "Bílá kniha",
    [SURVEY]: "Anketa ČVUT",
    [USERMAP]: "Usermap",
    [PROJECTS]: "Projekty FIT"
}

const EntityIcons = {
    [COURSE]: "\uf19d",
    [INSTITUTE]: "\uf549",
    [PLAN]: "\uf133",
    [TEACHER]: "\uf007",
    [TOPIC]: "\uf02e"
}

const EntityColors = {
    [COURSE]: { default: base.courseColor, dark: base.courseDarkenColor, light: base.courseLightenColor },
    [INSTITUTE]: { default: base.instituteColor, dark: base.instituteDarkenColor, light: base.instituteLightenColor },
    [PLAN]: { default: base.planColor, dark: base.planDarkenColor, light: base.planLightenColor },
    [TEACHER]: { default: base.teacherColor, dark: base.teacherDarkenColor, light: base.teacherLightenColor },
    [TOPIC]: { default: base.topicColor, dark: base.topicDarkenColor, light: base.topicLightenColor },
}

export { EntityTypes, RelationTypes, LinkTypes, EntityColors, EntityIcons }
