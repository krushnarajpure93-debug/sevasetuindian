// =================================================================
// 🚀 SEVA SETU ENTERPRISE - UNIFIED SERVER (ALL MODULES COMBINED)
// =================================================================

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// 🛠️ Express Initialisation
const app = express();

// 🌐 Global Middlewares (CORS Allowed for all)
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =================================================================
// 📂 DATABASE CONNECTION (UNIFIED)
// =================================================================
const MONGO_URI = "mongodb://127.0.0.1:27017/sevasetu_enterprise_unified";
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(`✅ MongoDB Connected Successfully`);
        console.log(`>>> [DATABASE] MongoDB Cluster Node Synced Safely Vector!`);
    })
    .catch((err) => {
        console.log(`❌ [DATABASE ERROR] Connection Refused: ${err.message}`);
    });

// =================================================================
// ⚙️ PART 1: MAIN SYNC ENGINE (For Admin Dashboard & Cars/Hotels/Bus)
// =================================================================

const SyncUserSchema = new mongoose.Schema({ id: String, name: String, contact: String, district: String, joined: String });
const SyncBookingSchema = new mongoose.Schema({ id: String, module: String, userName: String, contact: String, district: String, amount: String, status: String, date: String });
const SyncRequestSchema = new mongoose.Schema({ id: String, module: String, name: String, owner: String, license: String, gst: String, district: String, contact: String, type: String });
const SyncListingSchema = new mongoose.Schema({ id: String, module: String, name: String, type: String, district: String, price: String, status: String, featured: Boolean, owner: String, contact: String, gst: String, license: String });

const SyncUser = mongoose.models.SyncUser || mongoose.model('SyncUser', SyncUserSchema);
const SyncBooking = mongoose.models.SyncBooking || mongoose.model('SyncBooking', SyncBookingSchema);
const SyncRequest = mongoose.models.SyncRequest || mongoose.model('SyncRequest', SyncRequestSchema);
const SyncListing = mongoose.models.SyncListing || mongoose.model('SyncListing', SyncListingSchema);

// 1. GET ALL DATA (Admin Dashboard needs this to show everything)
app.get('/api/data', async (req, res) => {
    try {
        const users = await SyncUser.find();
        const bookings = await SyncBooking.find();
        const requests = await SyncRequest.find();
        const listings = await SyncListing.find();

        let dbState = { users: users, bookings: bookings, requests: requests, listings: listings };
        res.status(200).json(dbState);
    } catch (error) {
        res.status(500).json({ error: "Database Sync Failed" });
    }
});

// 2. ADD NEW CAR/HOTEL/BUS (Admin Side)
app.post('/api/listings', async (req, res) => {
    try {
        const data = req.body;
        if(!data.id) data.id = `LST-${Math.floor(10000 + Math.random() * 90000)}`;
        const newListing = new SyncListing(data);
        await newListing.save();
        res.status(201).json({ success: true, message: "Published Live to Database" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. CREATE NEW BOOKING (User Side - cars.html, buses.html etc)
app.post('/api/bookings', async (req, res) => {
    try {
        const data = req.body;
        if(!data.id) data.id = `BKG-${data.module.substring(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newBooking = new SyncBooking(data);
        await newBooking.save();
        res.status(201).json({ success: true, message: "Booking Saved Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. APPROVE VENDOR REQUEST (Moves from Pending to Live)
app.post('/api/requests/:id/approve', async (req, res) => {
    try {
        const reqData = await SyncRequest.findOne({ id: req.params.id });
        if (reqData) {
            const newListing = new SyncListing({
                id: `LST-${reqData.module.substring(0,3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
                module: reqData.module,
                name: reqData.name,
                type: reqData.type || "Verified Framework Merchant",
                district: reqData.district,
                price: "1500",
                status: "active",
                featured: false
            });
            await newListing.save();
            await SyncRequest.deleteOne({ id: req.params.id });
            res.json({ success: true });
        } else {
            res.status(404).json({ error: "Request not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 5. UPDATE BOOKING/ORDER STATUS (Admin Accepts/Rejects)
app.put('/api/bookings/:id/status', async (req, res) => {
    try {
        await SyncBooking.updateOne({ id: req.params.id }, { status: req.body.status });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 6. TOGGLE LISTING FEATURE/STATUS
app.put('/api/listings/:id/toggle', async (req, res) => {
    try {
        await SyncListing.updateOne({ id: req.params.id }, req.body);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 7. DELETE ANY NODE (Admin Delete Action)
app.delete('/api/nodes/:path/:id', async (req, res) => {
    try {
        const { path, id } = req.params;
        if (path === 'users') await SyncUser.deleteOne({ id });
        else if (path === 'bookings') await SyncBooking.deleteOne({ id });
        else if (path === 'requests') await SyncRequest.deleteOne({ id });
        else await SyncListing.deleteOne({ id });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// =================================================================
// ⚙️ PART 2: OTHER INDIVIDUAL MODULES (EMAILS COMPLETELY REMOVED)
// =================================================================

// --- Users ---
const AppUserSchema = new mongoose.Schema({ name: String, email: String, phone: String, password: String, role: { type: String, default: 'user' } }, { timestamps: true });
const AppUser = mongoose.models.AppUser || mongoose.model("AppUser", AppUserSchema);

app.post("/api/users/register", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const userExists = await AppUser.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: "User already exists" });
        const newUser = new AppUser({ name, email, phone, password });
        await newUser.save();
        res.status(201).json({ success: true, message: "User Registered", data: newUser });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

app.get("/api/users/all", async (req, res) => {
    try { res.status(200).json({ success: true, users: await AppUser.find().sort({ createdAt: -1 }) });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// --- Healthcare ---
const DoctorAsset = mongoose.models.DoctorAsset || mongoose.model("DoctorAsset", new mongoose.Schema({ doctorName: String, specialization: String, clinicName: String, contact: String, fees: Number, timings: String }));
const MedicineAsset = mongoose.models.MedicineAsset || mongoose.model("MedicineAsset", new mongoose.Schema({ storeName: String, ownerDetails: String, medicineName: String, price: Number, stock: Number }));

app.post("/api/admin/doctors", async (req, res) => res.status(201).json(await new DoctorAsset(req.body).save()));
app.get("/api/admin/doctors", async (req, res) => res.json(await DoctorAsset.find()));
app.post("/api/admin/medicines", async (req, res) => res.status(201).json(await new MedicineAsset(req.body).save()));
app.get("/api/admin/medicines", async (req, res) => res.json(await MedicineAsset.find()));

app.post("/api/appointments", async (req, res) => {
    try {
        let Appointment = mongoose.models.Appointment || mongoose.model("Appointment", new mongoose.Schema({ patientName: String, doctorName: String, date: String, fare: String, seatNo: String }, { timestamps: true }));
        const newAppointment = new Appointment({ patientName: req.body.patientName || "Unknown", doctorName: req.body.doctorName || "Doctor", date: req.body.date || new Date().toISOString(), fare: req.body.fare?.toString() || "0", seatNo: req.body.seatNo || "Walk-in" });
        res.status(201).json(await newAppointment.save());
    } catch (error) { res.status(500).json({ success: false, error: error.message }); }
});

// --- Business Services ---
const BusinessService = mongoose.models.BusinessService || mongoose.model("BusinessService", new mongoose.Schema({ serviceName: String, category: String, ownerName: String, contact: String, price: Number }));
app.post("/api/admin/business-services", async (req, res) => res.status(201).json(await new BusinessService(req.body).save()));
app.get("/api/admin/business-services", async (req, res) => res.json(await BusinessService.find()));

const BusinessAppointment = mongoose.models.BusinessAppointment || mongoose.model("BusinessAppointment", new mongoose.Schema({ customerName: String, mobileNumber: String, customerEmail: String, preferredDate: Date, timeSlot: String, state: String, district: String, village: String, serviceName: String, applicationId: { type: String, unique: true, default: () => "ST-" + Math.floor(100000 + Math.random() * 900000).toString() }, status: { type: String, default: "In Processing" } }, { timestamps: true }));
app.post("/api/business-appointments", async (req, res) => {
    try { res.status(201).json({ success: true, data: await new BusinessAppointment(req.body).save() }); } 
    catch (error) { res.status(500).json({ success: false, error: error.message }); }
});
app.get("/api/business-appointments", async (req, res) => res.json(await BusinessAppointment.find().sort({ createdAt: -1 })));

// --- Hotel Bookings ---
const HotelBooking = mongoose.models.HotelBooking || mongoose.model("HotelBooking", new mongoose.Schema({ customerName: String, contact: String, email: String, hotelName: String, location: String, checkInDate: String, checkOutDate: String, totalAmount: Number, bookingId: { type: String, unique: true, default: () => "HTL-" + Math.floor(100000 + Math.random() * 900000).toString() }, status: { type: String, default: "Pending" } }, { timestamps: true }));
app.post("/api/hotel-bookings", async (req, res) => {
    try { res.status(201).json({ success: true, data: await new HotelBooking(req.body).save() }); } 
    catch (error) { res.status(500).json({ success: false, error: error.message }); }
});
app.get("/api/hotel-bookings", async (req, res) => res.json(await HotelBooking.find().sort({ createdAt: -1 })));

// --- Travel Bookings ---
const TravelBooking = mongoose.models.TravelBooking || mongoose.model("TravelBooking", new mongoose.Schema({ customerName: String, mobileNumber: String, customerEmail: String, travelType: String, source: String, destination: String, journeyDate: { type: String, default: () => new Date().toLocaleDateString() }, seatNumber: String, farePaid: String, bookingId: { type: String, unique: true, default: () => "TRV-" + Math.floor(100000 + Math.random() * 900000).toString() }, status: { type: String, default: "Confirmed" } }, { timestamps: true }));
app.post("/api/travel-bookings", async (req, res) => {
    try { res.status(201).json({ success: true, data: await new TravelBooking(req.body).save() }); } 
    catch (error) { res.status(500).json({ success: false, error: error.message }); }
});
app.get("/api/travel-bookings", async (req, res) => res.json(await TravelBooking.find().sort({ createdAt: -1 })));

// --- Telecom ---
// 1. Telecom Plans (Admin Adds these)
const telecomPlanSchema = new mongoose.Schema({ company: String, price: Number, data: String, validity: String, features: String });
const TelecomPlan = mongoose.models.TelecomPlan || mongoose.model('TelecomPlan', telecomPlanSchema);

app.get('/api/telecom/plans', async (req, res) => {
    try { res.json(await TelecomPlan.find()); }
    catch (error) { res.status(500).json({ error: "Server error" }); }
});

app.post('/api/telecom/plans', async (req, res) => {
    try { res.status(201).json({ message: "Plan added", data: await new TelecomPlan(req.body).save() }); }
    catch (error) { res.status(500).json({ error: "Failed to add plan" }); }
});

// 2. Telecom Orders (Recharge, Fiber Booking, Complaints)
const telecomOrderSchema = new mongoose.Schema({ type: String, mobile: String, company: String, plan: String, amount: Number, status: { type: String, default: 'Pending Validation' }, address: String, description: String, date: { type: Date, default: Date.now } });
const TelecomOrder = mongoose.models.TelecomOrder || mongoose.model('TelecomOrder', telecomOrderSchema);

app.get('/api/telecom/orders', async (req, res) => {
    try { res.json(await TelecomOrder.find().sort({ date: -1 })); }
    catch (error) { res.status(500).json({ error: "Server error" }); }
});

app.post('/api/telecom/orders', async (req, res) => {
    try { res.status(201).json({ message: "Order processed", order: await new TelecomOrder(req.body).save() }); }
    catch (error) { res.status(500).json({ error: "Failed to process order" }); }
});

// Server Status Check
app.get("/", (req, res) => { res.send("SevaSetu Enterprise Server (Port 3000 Unified) is Live and Connected!"); });

// =================================================================
// ⚡ SERVER START ENGINE
// =================================================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n==============================================`);
    console.log(`🚀 UNIFIED SEVA SETU SERVER RUNNING ON PORT: ${PORT}`);
    console.log(`==============================================\n`);
});