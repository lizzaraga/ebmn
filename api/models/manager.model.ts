export interface IHealthWorker{
  user_is_health_personnel_id?: number,
  user?: String
}

export interface IAdminManager{
  user_is_manager_id?: number,
  hospital_name?: string,
  user?: string
}

export interface IReferral{
  referral_id?: number,
  patient_name?: string,
  email?: string,
  type_referral?: string,
  order_instructions?: string, 
  ordered_at?: string,
  status?: string,
  description?: string
}