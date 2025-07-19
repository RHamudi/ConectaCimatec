export interface RegisterInput {
    name: string,
    email: string,
    password: string,
    role: role,
    skills: string[],
    portifolioUrl: string[]
}

export interface RegisterDB {
    uid: string,
    name: string,
    email: string,
    role: role,
    skills: string[],
    portifolioUrl: string[]
}

export enum role {
  EMPRESA = 'empresa',
  ALUNO = 'aluno',
  ADM = 'adm'
}