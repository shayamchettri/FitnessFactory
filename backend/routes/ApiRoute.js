import express from "express";
import {
  getUsers,
  getUsersCountWithRole2,
  Login,
} from "../controllers/Api/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/Api/RefreshToken.js";
import { CreateUser, createUsersMembership, deleteUsersById, getUserById, updateUserById } from "../controllers/Api/MemberController.js";
import { uploadUserImage } from "../multer/UserImage.js";
import { checkAdminRole } from "../middleware/AdminMiddleware.js";
import { getRoles } from "../controllers/Api/RoleController.js";
import { createMembership, deleteMembershipById, getMembershipById, getMemberships } from "../controllers/Api/MembershipController.js";
import { uploadMemberImage } from "../multer/MembershipImage.js";
import { createMembershipMember, deleteMembershipMemberById, getAllMembershipMembers, getMembershipByUserId, getMembershipMemberById, updateMembershipMemberById, updateMembershipMemberPayment } from "../controllers/Api/MemberMembershipController.js";
import { createNotification, deleteNotificationById, getAllNotifications, updateNotificationById } from "../controllers/Api/NotificationController.js";
import { checkUserRole } from "../middleware/UserMiddleware.js";
import { createContact, deleteContact, getAllContacts } from "../controllers/ContactController.js";
import { createAttendanceForCurrentDate, getAllAttendanceWithUsers, updateAttendanceStatus} from "../controllers/Api/AttendanceController.js";
import { createAppointment, deleteAppointmentById, getAllAppointments, getAllUserAppointments } from "../controllers/Api/PersonalTrainerAppointmentController.js";
import { createSurvey, deleteSurveyById, getAllSurveys } from "../controllers/Api/SurveyController.js";
import { getExpiredMembers, getExpiredMembersCount, getExpiringMembers, getExpiringMembersCount, getPaidMembers, getPendingMembers, getTotalEarnedAmount, getTotalPendingAmount } from "../controllers/Api/DahboardController.js";
import { uploadWorkOutImage } from "../multer/WorkoutImage.js";
import { createWorkout, deleteWorkoutById, getAllWorkouts, getWorkoutById, updateWorkoutById } from "../controllers/Api/WorkoutController.js";
const router = express.Router();
router.post("/login", Login);

router.get("/token", refreshToken);
//check token    /check role    /method name
router.get("/users", verifyToken, checkAdminRole, getUsers);
router.delete("/deleteUser/:id", verifyToken, checkAdminRole, deleteUsersById);
router.get("/getUser/:id", verifyToken, checkAdminRole, getUserById);
router.get('/roleLists', verifyToken, checkAdminRole, getRoles);
router.post("/createUser",uploadUserImage, verifyToken, checkAdminRole, CreateUser);
router.put("/updateUser/:id",uploadUserImage, verifyToken, checkAdminRole, updateUserById);
router.get('/users/count',verifyToken, checkAdminRole,  getUsersCountWithRole2);
router.get('/pendingAmount',verifyToken, checkAdminRole,  getTotalPendingAmount);
router.get('/totalEarnings',verifyToken, checkAdminRole,  getTotalEarnedAmount);
router.get('/expiredMembersCount',verifyToken, checkAdminRole, getExpiredMembersCount);
router.get('/expiringMembersCount', verifyToken, checkAdminRole, getExpiringMembersCount);
router.get('/expiredMembers',verifyToken, checkAdminRole, getExpiredMembers);
router.get('/expiringMembers', verifyToken, checkAdminRole, getExpiringMembers);


router.get("/workouts", verifyToken, checkAdminRole, getAllWorkouts);
router.post("/createWorkout",uploadWorkOutImage, verifyToken, checkAdminRole, createWorkout);
router.get("/getWorkout/:id", verifyToken, checkUserRole, getWorkoutById);
router.get("/userWorkouts", verifyToken, checkUserRole, getAllWorkouts);
router.delete('/deleteWorkout/:id',verifyToken, checkAdminRole, deleteWorkoutById);


router.put("/updateMember/:id",uploadUserImage, verifyToken, checkUserRole, updateUserById);
router.get("/getMember/:id", verifyToken, checkUserRole, getUserById);

router.post('/createMembership',uploadMemberImage, verifyToken, checkAdminRole, createMembership);
router.get('/memberships', verifyToken, checkAdminRole, getMemberships);
router.get('/allMemberships', getMemberships);
router.get('/memberships/:id',verifyToken, checkAdminRole, getMembershipById);
router.delete('/memberships/:id',verifyToken, checkAdminRole,deleteMembershipById);

router.get('/memberMembership/:user_id/memberships',verifyToken, checkUserRole,  getMembershipByUserId);

router.post('/createMemberMemberships', verifyToken, checkAdminRole, createMembershipMember);
router.post('/createUserMemberships/:user_id', verifyToken, checkAdminRole, createUsersMembership);
router.get('/memberMemberships', verifyToken, checkAdminRole, getAllMembershipMembers);
router.get('/pendingMemberMemberships', verifyToken, checkAdminRole, getPendingMembers);
router.get('/paidMemberMemberships', verifyToken, checkAdminRole, getPaidMembers);
router.get('/memberships/:id', getMembershipMemberById);
router.put('/memberships/:id', updateMembershipMemberById);
router.delete('/delMemberships/:id',verifyToken, checkAdminRole, deleteMembershipMemberById);

router.post("/notifications", verifyToken, checkAdminRole, createNotification);
router.get("/notifications", verifyToken, checkAdminRole, getAllNotifications);
router.get("/allNotifications", verifyToken, checkUserRole, getAllNotifications);
router.put("/notifications/:id", verifyToken, checkAdminRole, updateNotificationById);
router.delete("/notifications/:id", verifyToken, checkAdminRole, deleteNotificationById);

router.post("/contacts" , createContact);
router.get("/contacts", verifyToken, checkAdminRole, getAllContacts);
router.delete("/contacts/:id", verifyToken, checkAdminRole, deleteContact);
router.patch('/membershipMembers/:id/payment',verifyToken, checkAdminRole, updateMembershipMemberPayment)

router.get('/attendances', verifyToken, checkAdminRole, getAllAttendanceWithUsers);
router.post('/attendance',  verifyToken, checkAdminRole, createAttendanceForCurrentDate); 
router.patch('/attendance/:id/status', verifyToken, checkAdminRole, updateAttendanceStatus);
router.post('/appointments', verifyToken, checkUserRole,createAppointment);
router.get('/appointments', verifyToken, checkAdminRole, getAllAppointments);
router.get('/userAppointments/:userId', verifyToken, checkUserRole, getAllUserAppointments);

// router.get('/appointments/:id', getAppointmentById);
// router.put('/appointments/:id', updateAppointmentById);

router.delete('/appointments/:id',verifyToken, checkAdminRole,  deleteAppointmentById);

router.post('/surveys',verifyToken, checkAdminRole, createSurvey);
router.get('/surveys',verifyToken, checkAdminRole, getAllSurveys);
router.get('/survey',verifyToken, checkUserRole, getAllSurveys);
// router.get('/surveys/:id', getSurveyById);
// router.put('/surveys/:id', updateSurveyById);
router.delete('/surveys/:id',verifyToken, checkAdminRole,  deleteSurveyById);

export default router;
