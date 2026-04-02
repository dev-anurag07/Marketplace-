import express from "express"
import { acceptBooking, createBooking,completeBooking,getCustomerBookings,getproviderBookings,cancelBooking ,rejectBooking, addReview} from "../controllers/bookingcontroller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import authorizeroles from "../middleware/rolemiddleware.js"


const router = express.Router();
router.post("/create",authMiddleware,authorizeroles("customer"),createBooking);
router.put("/accept/:id",authMiddleware,authorizeroles("provider"),acceptBooking);
router.put("/complete/:id",authMiddleware,authorizeroles("provider"),completeBooking);
router.get("/customer",authMiddleware,authorizeroles("customer"),getCustomerBookings);
router.get("/provider",authMiddleware,authorizeroles("provider"),getproviderBookings);
router.put("/cancel/:id",authMiddleware,authorizeroles("customer"),cancelBooking);
router.put("/reject/:id",authMiddleware,authorizeroles("provider"),rejectBooking);
router.put('/review/:id',authMiddleware,authorizeroles('customer'),addReview);

export default router;