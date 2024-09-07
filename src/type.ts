export interface User {
  /**
   * 帳號
   */
  account: string
  /**
   * 生日
   */
  birthday: string
  /**
   * 是否為公民
   */
  citizen: boolean
  /**
   * 電子郵件
   */
  email: string
  /**
   * ID
   */
  id: string
  /**
   * 身分證字號
   */
  idNo: string
  /**
   * 會員類型
   */
  memberType: string
  /**
   * 是否為原住民
   */
  nativePeople: boolean
  /**
   * 電話號碼
   */
  phoneNo: string
  /**
   * 真實姓名
   */
  realName: string
  /**
   * 居住地址
   */
  residentAddress: string
  /**
   * 使用者名稱
   */
  username: string
  /**
   * 驗證等級
   */
  verifyLevel: number
}

/**
 * 產前檢查資訊
 */
export interface Prenatal {
  /**
   * 浮腫程度
   */
  edema: string
  /**
   * 檢查診所名稱
   */
  examination_clinic: string
  /**
   * 檢查醫生名稱
   */
  examination_doctor: string
  /**
   * 檢查結束日期
   */
  examination_end_date: string
  /**
   * 檢查開始日期
   */
  examination_start_date: string
  /**
   * 胎心音
   */
  fetal_heart_sound: string
  /**
   * ID
   */
  id: string
  /**
   * 血壓 kg
   */
  blood_pressure: string
  /**
   * 下次檢查日期
   */
  next_checkup_date: string
  /**
   * 付款進度
   */
  payment_schedule: string
  /**
   * 懷孕週數
   */
  pregnancy_week: string
  /**
   * 備註
   */
  remarks: string
  /**
   * 建議檢查週數
   */
  suggested_weeks: string
  /**
   * 尿蛋白
   */
  urine_protein: string
  /**
   * 尿糖
   */
  urine_sugar: string
  /**
   * 使用者 ID
   */
  user_id: string
  /**
   * 靜脈曲張程度
   */
  varicose_veins: string
  /**
   * 體重
   */
  weight: string
}

/**
 * 超音波紀錄。
 */
export interface Ultrasound {
  /**
   * 超音波的年齡
   */
  age: number
  /**
   * 羊水的水平
   */
  amniotic_fluid_level: string
  /**
   * 檢查日期
   */
  checkup_date: number
  /**
   * 預估胎兒週數
   */
  estimated_fetal_weeks: null | number
  /**
   * 預估胎兒體重
   */
  estimated_fetal_weight: null
  /**
   * 預計分娩日期
   */
  expected_delivery_date: string
  /**
   * 胎兒腹圍
   */
  fetal_abdominal_circumference: null
  /**
   * 胎兒腹圍週數
   */
  fetal_abdominal_weeks: null
  /**
   * 胎兒股骨長度
   */
  fetal_femur_length: null
  /**
   * 胎兒股骨長度週數
   */
  fetal_femur_weeks: null
  /**
   * 胎兒頭部頭頂直徑
   */
  fetal_head_biparietal_diameter: null
  /**
   * 胎兒頭部頭頂直徑週數
   */
  fetal_head_weeks: null
  /**
   * 表示是否有胎心跳動
   */
  fetal_heartbeat: string
  /**
   * 胎兒位置
   */
  fetal_position: string
  /**
   * 胎兒數量
   */
  fetus_count: number
  /**
   * 孕週
   */
  gestational_week: number
  /**
   * id
   */
  id: string
  /**
   * 上次月經日期
   */
  last_menstruation_date: string
  /**
   * 母親姓名
   */
  mother_name: string
  /**
   * 超音波照片
   */
  photo: null | string
  /**
   * 胎盤位置
   */
  placental_location: string
  /**
   * 報告超音波的醫生姓名
   */
  reporter: string
  /**
   * 筛查结果
   */
  screening_result: string
  /**
   * 使用者 id
   */
  user_id: string
}
