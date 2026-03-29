export type Role = 'admin' | 'clerk' | 'officer' | 'farmer'

export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Overdue'

export type LoanFlowStatus =
  | 'eligible'
  | 'pending'
  | 'active'
  | 'active_overdue'
  | 'completed'

export interface Farmer {
  id: string
  name: string
  phone: string
  memberNo: string
  factory: string
  zone: string
  cooperative: string
  creditScore: number
  creditTier: 'A' | 'B' | 'C'
  loanFlow: LoanFlowStatus
  gradeTrend: 'A' | 'B' | 'C'
  activeSince: string
  totalKg: number
  totalEarned: number
}

export interface Delivery {
  id: string
  farmerId: string
  date: string
  kg: number
  grade: 'A' | 'B' | 'C'
  rate: number
  gross: number
  deductions: number
  net: number
  status: PaymentStatus | 'Graded'
}

export interface PaymentRow {
  id: string
  farmerId: string
  farmer: string
  phone: string
  amount: number
  deductions: number
  net: number
  status: PaymentStatus
  time: string
  mpesaRef?: string
}

export interface Loan {
  id: string
  farmerId: string
  farmerName: string
  amount: number
  interestPct: number
  status: 'Eligible' | 'Active' | 'Overdue' | 'Completed'
  disbursedAt?: string
  repaidFraction: number
  nextDue?: string
  instalments: number
}

export interface MpesaTx {
  id: string
  type: 'B2C' | 'C2B' | 'Validation' | 'Callback'
  farmer?: string
  phone?: string
  amount: number
  direction: 'in' | 'out'
  code: string
  ts: string
  pending?: boolean
  raw: Record<string, unknown>
}

export interface Complaint {
  id: string
  farmer: string
  issue: string
  status: 'Open' | 'Under Review' | 'Resolved'
  date: string
}
