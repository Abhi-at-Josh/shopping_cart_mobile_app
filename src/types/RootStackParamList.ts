export type RootStackParamList = {
  Home:{
    post?:string;
  };
  Details:{
    name:string;
    company:string;
    age:number;
  };
  Login: undefined;
  Main: undefined;
  LoginScreenProps:{
    setIsLoggedIn: (value: boolean) => void;
  };
  
}