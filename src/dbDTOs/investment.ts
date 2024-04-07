export interface InvestmentDTO {
  id: string;
  userId: string;
  goalName: string;
  goalValue: string;
  acquiredValue: string;
  months: string;
  riskLevel: string;
  goalTimeframe: string;
  investmentAmount: string;
  investmentValue: string;
  investmentType: string;
  investmentDuration: string;
  investmentGoal: string;
  investmentStyle: string;
  investmentStrategy: string;
  investmentAdvice: string;
  investmentRecommendation: string;
  investmentAllocation: object;
}

export interface InvestmentDefinedDTO {
  userId: string;
  goalName: string;
}