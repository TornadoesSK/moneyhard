export interface UserAfterRegistrationDTO {
  email: string;
  nickname: string;
}

export interface UserIsInDbDTO {
  email: string;
}

export interface UserContextFromRegFormsDTO {
  age: number;
  income: number;
  gender: 'Male' | 'Female';
  relationshipStatus: 'Married' | 'Single';
  occupation: string;
  hardExpenses: number;
}
