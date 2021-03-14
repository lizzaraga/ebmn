export interface IEmergency{
  emergency_id?: number,
  specific_problem?: string,
  username?: string,
  emergency_status?: string
}

// I: Interface, P: Patient
export interface ICreateEmergency{
  specific_problem?: string,
  
}