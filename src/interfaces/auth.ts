export interface ILogin {
  username?: string;
  password: string;
  remember?: boolean;
}

export interface IForgot {
  email: string;
  type?: string;
}

export interface IFanRegister {
  name?: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  email: string;
  password: string;
}

export interface IPerformerRegister {
  firstName: string;
  lastName: string;
  name?: string;
  username: string;
  email: string;
  password: string;
  gender: string;
}

export interface IVerifyEmail {
  source: any;
  sourceType: string;
}

export interface BodyInfo {
  value:string,
  text:string

}

export interface BodyInfoResponse{
ages: BodyInfo[]
bodyTypes: BodyInfo[]
butts: BodyInfo[]
ethnicities: BodyInfo[]
eyes:BodyInfo[]
genders: BodyInfo[]
hairs:BodyInfo[]
heights:BodyInfo[]
pubicHairs:BodyInfo[]
sexualOrientations:BodyInfo[]
weights:BodyInfo[]
}
export interface CountriesInfo{
  name:string,
  code:string,
  flag:string
}
export interface CountriesResponse{
  countries: CountriesInfo[]
}
export interface LanguageInfo{
  name:string,
  code:string,
}
export interface LanguageResponse{
  languages: LanguageInfo[]
}
