const sendSuccess = (res, arg1, arg2 = null, arg3 = 200) => {
  let message = 'Operation successful';
  let data = null;
  let statusCode = 200;

  if (typeof arg1 === 'string') {
    message = arg1;
    data = arg2;
    if (typeof arg3 === 'number') statusCode = arg3;
  } else {
    data = arg1;
    if (typeof arg2 === 'string') {
      message = arg2;
      if (typeof arg3 === 'number') statusCode = arg3;
    } else if (typeof arg2 === 'number') {
      statusCode = arg2;
    }
  }

  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, message = 'An error occurred', statusCode = 400, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
