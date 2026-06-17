const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const Medicine = require("../models/MedicineMode.js");
const Order = require("../models/orderModel");

// Get All System Statistics (Realtime Dashboard Counter)
exports.getDashboardStats = async (req, res) => {
  try {
    // Sagle counts ekach veli parallelly count karne (High Performance)
    const [doctorCount, userCount, appointmentCount, medicineCount, orderCount] = await Promise.all([
      Doctor.countDocuments(),
      User.countDocuments(),
      Appointment.countDocuments(),
      Medicine.countDocuments(),
      Order.countDocuments()
    ]);

    // Order amounts run karun dynamic Total Revenue kadhne
    const orders = await Order.find({ status: { $ne: "Cancelled" } });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.json({
      success: true,
      stats: {
        totalDoctors: doctorCount,
        totalUsers: userCount,
        totalAppointments: appointmentCount,
        totalMedicines: medicineCount,
        totalOrders: orderCount,
        totalRevenue: totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};