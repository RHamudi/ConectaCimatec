export interface Register {
    id?: number,
    name: string,
    email: string,
    password: string,
    role: role,
    skills: string[],
    portifolioUrl: string[]
}

enum role {
    EMPRESA = 1,
    ALUNO = 2,
    ADM = 3
}