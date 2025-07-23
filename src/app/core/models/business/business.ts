export interface Business {
    title: string;
    skills: string[];
    description: string;
    deadline: Date;
    status: 'ativa' | 'encerrada';
    location: string;
    type: 'presencial' | 'remoto' | 'híbrido';
    shift: string;
    salary: number;
    Requirements: string;
    businessName: string;
}

export interface Vaga {
  deadline: string; // ou Date se preferir trabalhar com objetos Date
  description: string;
  empresaUid: string;
  skills: string[]; // assumindo que skills é um array de strings
  status: "ativa" | "encerrada"; // status com valores específicos
  title: string;
  uid: string;
  location: string;
  type: 'presencial' | 'remoto' | 'híbrido';
  shift: string;
  salary: number;
  Requirements: string;
  applications: [];
  businessName: string; // tipo de trabalho
};
