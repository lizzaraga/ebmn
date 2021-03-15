

export interface IClerkDrug{
  medication_id?: number,
  rxnorm_code?: string,
  description?: string,
  drug_id?: number,
  manager_status?: string,
  ebase_status?: string
}

export interface IClerkVaccine{
  immunization_id?: number,
  cvx_code?: string,
  description?: string,
  vaccine_id?: number,
  manager_status?: string,
  ebase_status?: string
}

export interface IClerkDiagnosis{
  problem_id?: number,
  icd_code?: String,
  description?: String,
  diagnosis_id?: number,
  manager_status?: String,
  ebase_status?: String
}

export interface IClerkScreening{
  lab_id?: number,
  loinc_code?: String,
  description?: String,
  screening_id?: number,
  manager_status?: String,
  ebase_status?: String
}

export interface IClerkSurgery{
  cpt_id?: number,
  cpt_code?: string,
  description?: string,
  surgery_id?: number,
  manager_status?: string,
  ebase_status?: string
}

export interface IAdminClerk{
  user_is_clerk_id: number,
  user: string
}