import { StatusCodes } from 'http-status-codes'
import getEnv from '~/config/environment'
import ApiError from '~/utils/ApiError'
import { WHITELIST_DOMAINS } from '~/utils/constants'

// Cấu hình CORS Option
export const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép việc gọi API bằng POSTMAN trên môi trường dev,
    // Thông thường khi sử dụng postman thì cái origin sẽ có giá trị là undefined
    if (!origin && getEnv('BUILD_MODE') === 'dev') {
      return callback(null, true)
    }

    // Kiểm tra xem origin có phải là domain được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
    return callback(
      new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`)
    )
  },

  // Configures the Access-Control-Allow-Methods
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',

  //Configures the Access-Control-Allow-Headers
  allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization',

  //Configures the Access-Control-Expose-Headers
  exposedHeaders: 'Content-Range,X-Content-Range,Authorization',
  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // Configures the Access-Control-Allow-Credentials, CORS sẽ cho phép nhận cookies từ request
  credentials: true
}
