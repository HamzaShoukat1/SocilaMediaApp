import { Apierror } from "../utils/ApiError.js"
import { asynchandler } from "../utils/AsyncHandler.js"



export const onlyFoodPartner = asynchandler(async (req, _res, next) => {
    if (req.userRole !== "FOOD_PARTNER") {
        throw new Apierror(403, "Access denied")
    }
    next()

})
