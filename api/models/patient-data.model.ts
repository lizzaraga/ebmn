/**
 * General info
 */
export interface IGeneralInfo{
  username?: string,
  email?: string,
  phone_number?: string,
  title?: string,
  first_name?: string,
  middle_name?: string,
  last_name?: string,
  suffix?: string,
  alternate_email?: string,
  office_phone?: string,
  patient_id?: string,
  place_of_birth?: string,
  sex?: string,
  race?: string,
  ethnicity?: string,
  language?: string,
  occupation?: string,
  religion?: string,
  marital_status?: string,
  interpreter_needed?: string,
  region_of_residence?: string,
  number_of_children?: string,
  employer_name?: string,
  blood_type?: string,
  gps_longitude?: string,
  gps_latitude?: string,
  residence_site?: string,
  preferred_communication_channel?: string,
  date_of_birth?: string,
  signature_file?: string,
  photo?: string,
  house_map?: string,
  emergency_contacts: object[]
}
export interface IPatient{
  patient_id?: number,
  patient_name?: string
}
export interface IUpdateGI{
  name: string;
  type: string;
  value: string;
}

export interface IUpdateGIFile{
  name: string;
  fileName: string;
  data: FormData;
}

/**
 * Legal Document
 */
export interface ILegalDocument{
  document_id?: number;
  document_category?: string;
  document_date_of_establishment?: string;
  document_decision_date?: string;
  document_reason_for_capacity?: string;
  document_reason_for_determination?: string;
  document_legal_document?: string;
}

/**
 * Lab
 */
export interface ILab{
  lab_id?: number;
  lab_loinc_code?: string;
  lab_description?: string;
  lab_date_issued?: string;
  lab_date_last_modified?: string;
  lab_order_instructions?: string;
  lab_ordered_at?: string;
  lab_done_at?: string;
  lab_results?: string;
  lab_units?: string;
  lab_results_instructions?: string;
  lab_abnormal_flag?: string;
  lab_document_upload_url?: string;
  lab_results_problems_list: String[];
}
export interface ILabInstitute{
  lab_id?: number;
  lab_loinc_code?: string;
  lab_description?: string;
}


/**
 * Problem
 */
export interface IProblem{
  problem_id?: number;
  problem_icd?: string;
  problem_name?: string;
  problem_organ_system?: string;
  problem_date_onset?: string;
  problem_current_status?: string;
  problem_priority?: string;
  problem_diagnosed_at?: string;
  problem_treatment_at?: string;
}

/**
 * Radiology
 */
export interface IRadiology{
  radiology_id?: number;
  radiology_loinc_code?: string;
  radiology_description?: string;
  radiology_date_issued?: string;
  radiology_date_last_modified?: string;
  radiology_order_instruction?: string;
  radiology_done_at?: string;
  radiology_ordered_at?: string;
  radiology_result_commentary?: string;
  radiology_result_instruction?: string;
  radiology_abnormal_flag?: string;
  radiology_results_problems_list: string[];
  radiology_document_upload_url?: string
}

/**
 * Ekg
 */
export interface IEkg{
  ekg_id?: number;
  ekg_loinc_code?: string;
  ekg_description?:string;
  ekg_date_issued?: string;
  ekg_date_last_modified?: string;
  ekg_order_instructions?: string;
  ekg_ordered_at?: string;
  ekg_done_at?: string;
  ekg_results?: string;
  ekg_units?: string;
  ekg_results_instructions?: string;
  ekg_abnormal_flag?: string;
  ekg_results_problems_list: [];
  ekg_document_upload_url?: string;
}

/**
 * Vital Sign
 */
export interface IVitalSigns{
  height?: string;
  weight?: string;
  body_mass_index?: string;
  waist_circumference?: string;
  head_circumference?: string;
  temperature?: string;
  pulse?: string;
  respiratory_rate?: string;
  pain_scale?: string;
  pregnancy_month?: string;
  muac?: string;
  oxygen_flow_rate?: string;
  systolic_bp?: string;
  diastolic_bp?: string;
  date_of_update?: string;
}

/**
 * Surgery
 */
export interface ISurgery{
  surgery_id?: number;
  surgery_cpt_code?: string;
  surgery_description?: string;
  surgery_anaestasia?: string;
  surgery_frozen_section_pathology?: string;
  surgery_date?: string;
  surgery_legal_document_approval?: string
  surgery_ordered_at?: string;
  surgery_health_institute_dispenser?: string;
  surgery_ordered_on?: string;
  surgery_before?: string;
  surgery_comments_after?: string;
  surgery_response?: string;
  surgery_result_problem_list: string[];
}

export interface ICptCodeSurgery{
  surgery_id: number;
  surgery_cpt_code: string;
  surgery_description: string;
}
/**
 * Medication
 */
 export interface IMedication{
  medication_id?: number;
  medication_rxnorm_label?:  string;
  medication_route?:  string;
  medication_date_ordered?:  string;
  medication_last_modified?:  string;
  medication_reception_status?: string;
  medication_ordered_by?: string;
  medication_dispenser_health_institute?:  string;
  medication_frequency?: string;
  medication_type_of_therapy?:  string;
  medication_duration?:  string;
  medication_instruction_on_prescription?:  string;
  medication_instructions_on_delivery?:  string;
  medication_dosage?: number;
  medication_dosage_unit?:  string;
  medication_volume_dosage?: number;
  medication_volume_dosage_unit?: string;
  medication_related_problems: string[];
}

/**
 * Allergy
 */
 export interface IAllergy{
  allergy_id?: number;
  substance?: string;
  category?: string;
  reaction_type?: string;
  severity?: string;
  allergy_status?: string;
  date_first_recorded?: string;
  comments?: string;
}
export interface IRxNormLabel{
  medication_id: number;
  medication_rxnorm_label: string;
}

/**
 * Abusive Substance
 */
 export interface IAbusiveSubstance{
  substance_id?: number,
  substance?: string,
  comments?: string,
  status?: string,
  substance_details?: string
}