class AppError extends Error{
      constructor(message,statusCode){
        super(message);

        this.statusCode=statusCode;

        // for capturing the error like browser
        
        Error.captureStackTrace(this, this.constructor)

      }
}
export default  AppError