export const deposit = (amount) => {
    return {
      type: 'DEPOSIT',
      amount
    };
  };
  
  export const withdraw = (amount) => {
    return {
      type: 'WITHDRAW',
      amount
    };
  };

  export const change = (id) => {
      return {
        type: 'CHANGE',
        id
      };
  };