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

export interface RegisterBusiness {
    companyName: string,
    CNPJ: string,
    email: string,
    location: string,
    publishedJobs: [],
    siteUrl: string,
    description: string,
    logoUrl: string,
    role: role
}

export interface RegisterBusinessInput {
    companyName: string,
    CNPJ: string,
    email: string,
    password: string,
    location: string
}

export enum role {
  EMPRESA = 'empresa',
  ALUNO = 'aluno',
  ADM = 'adm'
}