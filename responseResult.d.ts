declare namespace responseResult {
  interface CasesItem {
    title: string;
    count: number;
  }

  interface DataStructure {
    [key: string]: CasesItem[];
  }

  type isLogin = boolean;
  type login = boolean;
  type logout = boolean;
  type getData = boolean;
  type showData = DataStructure | boolean;
}
