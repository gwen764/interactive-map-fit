import { FORM_PRESENT, FORM_PART,
        LANG_EN, LANG_CS,
        LEVEL_BACHELOR, LEVEL_MASTER, LEVEL_DOCTORAL,
        INST_KTI, INST_KAM, INST_KCN, INST_KSI, INST_KIB, INST_KPS } from "@core/utils/constants/acredationConstants"

// Utilities to demonstrate the circle packing graph

const StudyLevels = {
    [LEVEL_BACHELOR]: "bakalářské",
    [LEVEL_MASTER]: "magisterské",
    [LEVEL_DOCTORAL]: "doktorské",
}

const Languages = {
    [LANG_CS]: "čeština",
    [LANG_EN]: "angličtina"
}

const Institutes = {
    [INST_KTI]: "Katedra teoretické informatiky",
    [INST_KAM]: "Katedra aplikované matematiky",
    [INST_KCN]: "Katedra číslicového návrhu",
    [INST_KSI]: "Katedra softwarového inženýrství",
    [INST_KIB]: "Katedra infomační bezpečnosti",
    [INST_KPS]: "Katedra počítačových systémů",
}

const Forms = {
    [FORM_PRESENT]: "prezenční plán",
    [FORM_PART]: "kombinovaný plán"
}

const HierarchyLevels = {
    0: "studium",
    1: "úroveň studia",
    2: "studijní program",
    3: "specializace",
    4: "studijní plán",
    5: "předmět"
}

const HierarchyGroups = {
    1: { name: "úroveň studia", groups: StudyLevels },
    2: { name: "jazyk studia", groups: Languages },
    3: { name: "katedra", groups: Institutes },
    4: { name: "forma výuky", groups: Forms },
}

export { HierarchyLevels, HierarchyGroups }
