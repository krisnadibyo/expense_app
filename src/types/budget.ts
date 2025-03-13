export interface Budget {
  id: string;
  name: string;
  amount: number;
  startDate: string;
  endDate?: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
