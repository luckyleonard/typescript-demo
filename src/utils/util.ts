interface Result<T> {
  success: boolean;
  errMsg?: string;
  data: T; //根据泛型T来决定返回的数据类型
}

export const getResponseData = <T>(data: T, errMsg?: string): Result<T> => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data,
    };
  }
  return {
    success: true,
    data,
  };
};
