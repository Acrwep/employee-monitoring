// ─── Dashboard Users ───────────────────────────────────────────────
export const dashboardUsers = [
    {
        id: 1,
        name: "vignesh",
        mobile: "+91 98765 43210",
        email: "arjun.sharma@example.com",
        device: "Samsung Galaxy S23",
        status: "Active",
        lastActive: "2026-02-25 13:45:00",
        avatar: "AS",
    },
    {
        id: 2,
        name: "Priya Mehta",
        mobile: "+91 87654 32109",
        email: "priya.mehta@example.com",
        device: "iPhone 15 Pro",
        status: "Active",
        lastActive: "2026-02-25 12:30:00",
        avatar: "PM",
    },
    {
        id: 3,
        name: "Rahul Verma",
        mobile: "+91 76543 21098",
        email: "rahul.verma@example.com",
        device: "OnePlus 12",
        status: "Offline",
        lastActive: "2026-02-24 18:00:00",
        avatar: "RV",
    },
    {
        id: 4,
        name: "Sneha Kapoor",
        mobile: "+91 65432 10987",
        email: "sneha.kapoor@example.com",
        device: "Xiaomi 14",
        status: "Active",
        lastActive: "2026-02-25 14:00:00",
        avatar: "SK",
    },
    {
        id: 5,
        name: "Vikram Nair",
        mobile: "+91 54321 09876",
        email: "vikram.nair@example.com",
        device: "Google Pixel 8",
        status: "Offline",
        lastActive: "2026-02-23 09:15:00",
        avatar: "VN",
    },
];

// ─── Call Recording ────────────────────────────────────────────────
export const callRecordingData = [
    { id: 1, caller: "vignesh", number: "+91 98765 43210", duration: "5:32", date: "2026-02-25", time: "09:15 AM", size: "2.1 MB", type: "Outgoing" },
    { id: 2, caller: "Priya Mehta", number: "+91 87654 32109", duration: "3:18", date: "2026-02-25", time: "10:30 AM", size: "1.4 MB", type: "Incoming" },
    { id: 3, caller: "Rahul Verma", number: "+91 76543 21098", duration: "8:45", date: "2026-02-24", time: "02:00 PM", size: "3.5 MB", type: "Outgoing" },
    { id: 4, caller: "Sneha Kapoor", number: "+91 65432 10987", duration: "2:10", date: "2026-02-24", time: "04:20 PM", size: "0.9 MB", type: "Incoming" },
    { id: 5, caller: "Vikram Nair", number: "+91 54321 09876", duration: "6:05", date: "2026-02-23", time: "11:00 AM", size: "2.5 MB", type: "Outgoing" },
    { id: 6, caller: "Anita Rao", number: "+91 43210 98765", duration: "4:22", date: "2026-02-23", time: "01:45 PM", size: "1.8 MB", type: "Incoming" },
];

// ─── Call History ──────────────────────────────────────────────────
export const callHistoryData = [
    { id: 1, name: "vignesh", number: "+91 98765 43210", type: "Outgoing", duration: "5:32", date: "2026-02-25", status: "Connected" },
    { id: 2, name: "Priya Mehta", number: "+91 87654 32109", type: "Incoming", duration: "3:18", date: "2026-02-25", status: "Connected" },
    { id: 3, name: "Unknown", number: "+91 11111 22222", type: "Incoming", duration: "0:00", date: "2026-02-25", status: "Missed" },
    { id: 4, name: "Rahul Verma", number: "+91 76543 21098", type: "Outgoing", duration: "8:45", date: "2026-02-24", status: "Connected" },
    { id: 5, name: "Sneha Kapoor", number: "+91 65432 10987", type: "Incoming", duration: "2:10", date: "2026-02-24", status: "Connected" },
    { id: 6, name: "Vikram Nair", number: "+91 54321 09876", type: "Outgoing", duration: "0:00", date: "2026-02-23", status: "Rejected" },
    { id: 7, name: "Anita Rao", number: "+91 43210 98765", type: "Incoming", duration: "4:22", date: "2026-02-23", status: "Connected" },
];

// ─── Usage Tracking ────────────────────────────────────────────────
export const usageData = [
    { id: 1, app_name: "CallTracker", package_name: "com.example.calltracker", usage_duration: 43, date_periode: "2026-06-28", },
    { id: 2, app_name: "CallTracker2", package_name: "com.example.calltracker", usage_duration: 23, date_periode: "2026-06-29", },
    { id: 3, app_name: "CallTracker3", package_name: "com.example.calltracker", usage_duration: 35, date_periode: "2026-05-10", },
    { id: 4, app_name: "CallTracker4", package_name: "com.example.calltracker", usage_duration: 15, date_periode: "2026-05-22", }
]

// ─── Notification Tracking ────────────────────────────────────────────────
export const notificationData = [
    { notification_id: 1, app_name: 'CallTracker', package_name: 'com.example.calltracker', title: 'CallTracker is running', text_content: 'Monitoring in background...', post_time: '2026-06-09 12:18:05', created_at: '2026-06-09 12:18:08' },
    { notification_id: 2, app_name: 'CallTracker1', package_name: 'com.example.calltracker', title: 'CallTracker is running', text_content: 'Monitoring in background...', post_time: '2026-06-09 12:18:05', created_at: '2026-06-09 12:18:08' },
    { notification_id: 3, app_name: 'CallTracker2', package_name: 'com.example.calltracker', title: 'CallTracker is running', text_content: 'Monitoring in background...', post_time: '2026-06-09 12:18:05', created_at: '2026-06-09 12:18:08' },
    { notification_id: 4, app_name: 'CallTracker3', package_name: 'com.example.calltracker', title: 'CallTracker is running', text_content: 'Monitoring in background...', post_time: '2026-06-09 12:18:05', created_at: '2026-06-09 12:18:08' },
]

// ─── Incoming Calls ────────────────────────────────────────────────
export const incomingCallsData = [
    { id: 1, name: "Priya Mehta", number: "+91 87654 32109", duration: "3:18", date: "2026-02-25", time: "10:30 AM", status: "Answered" },
    { id: 2, name: "Unknown", number: "+91 11111 22222", duration: "0:00", date: "2026-02-25", time: "11:05 AM", status: "Missed" },
    { id: 3, name: "Sneha Kapoor", number: "+91 65432 10987", duration: "2:10", date: "2026-02-24", time: "04:20 PM", status: "Answered" },
    { id: 4, name: "Anita Rao", number: "+91 43210 98765", duration: "4:22", date: "2026-02-23", time: "01:45 PM", status: "Answered" },
    { id: 5, name: "Rajesh Iyer", number: "+91 33344 55566", duration: "0:00", date: "2026-02-22", time: "09:00 AM", status: "Missed" },
];

// ─── Outgoing Calls ────────────────────────────────────────────────
export const outgoingCallsData = [
    { id: 1, name: "vignesh", number: "+91 98765 43210", duration: "5:32", date: "2026-02-25", time: "09:15 AM", status: "Connected" },
    { id: 2, name: "Rahul Verma", number: "+91 76543 21098", duration: "8:45", date: "2026-02-24", time: "02:00 PM", status: "Connected" },
    { id: 3, name: "Vikram Nair", number: "+91 54321 09876", duration: "0:00", date: "2026-02-23", time: "11:00 AM", status: "Not Answered" },
    { id: 4, name: "Mohan Das", number: "+91 99988 77766", duration: "1:45", date: "2026-02-22", time: "03:30 PM", status: "Connected" },
    { id: 5, name: "Kavya Reddy", number: "+91 88877 66655", duration: "6:20", date: "2026-02-21", time: "10:00 AM", status: "Connected" },
];

// ─── SMS Monitoring ────────────────────────────────────────────────
export const smsMonitoringData = [
    { id: 1, contact: "Priya Mehta", number: "+91 87654 32109", message: "Hey, are you coming to the meeting?", type: "Incoming", date: "2026-02-25", time: "09:00 AM" },
    { id: 2, contact: "vignesh", number: "+91 98765 43210", message: "Please send the report by EOD.", type: "Outgoing", date: "2026-02-25", time: "09:30 AM" },
    { id: 3, contact: "Rahul Verma", number: "+91 76543 21098", message: "The package has been delivered.", type: "Incoming", date: "2026-02-24", time: "11:00 AM" },
    { id: 4, contact: "Bank Alert", number: "+91 22200 33300", message: "Your account has been debited ₹5000.", type: "Incoming", date: "2026-02-24", time: "02:15 PM" },
    { id: 5, contact: "Sneha Kapoor", number: "+91 65432 10987", message: "Can we reschedule tomorrow's call?", type: "Incoming", date: "2026-02-23", time: "05:00 PM" },
    { id: 6, contact: "vignesh", number: "+91 98765 43210", message: "Sure, let's meet at 4 PM.", type: "Outgoing", date: "2026-02-22", time: "08:45 AM" },
];

// ─── Keylogger Tracking ────────────────────────────────────────────
export const keyloggerData = [
    { keystrokes: "Hey how are you doing today?", date: "2026-02-25/09:10 AM", package: "com.whatsapp" },
    { keystrokes: "flight tickets mumbai to delhi", date: "2026-02-25/10:00 AM", package: "com.android.chrome" },
    { keystrokes: "Subject: Project Update - Please find...", date: "2026-02-24/01:30 PM", package: "com.instagram.android" },
    { keystrokes: "Great photo! Love the vibe 🔥", date: "2026-02-24/03:45 PM", package: "com.android.chrome" },
    { keystrokes: "Password: mySecret@123 | PIN: 4521", date: "2026-02-23/08:00 AM", package: "com.whatsapp" },
    { keystrokes: "The meeting is at 5 PM tomorrow.", date: "2026-02-22/06:15 PM", package: "com.whatsapp" },
];

// ─── WhatsApp Chats ────────────────────────────────────────────────
export const whatsappChatsData = [
    { id: 1, direction: "Incoming", name: "Priya Mehta", number: "Account Dept", text: "Are you coming today?", timestamp: "17/06/2026 08:55 AM" },
    { id: 2, direction: "Incoming", name: "Priya Mehta", number: "6758975648", text: "Yes, I'll be there by 10.", timestamp: "17/06/2026 09:00 AM" },
    { id: 3, direction: "Incoming", name: "Rahul Verma", number: "9085664765", text: "Check the new project docs.", timestamp: "17/06/2026 09:00 AM" },
    { id: 4, direction: "Outgoing", name: "vignesh", number: "Whatsapp", text: "Meeting postponed to 4 PM.", timestamp: "17/06/2026 04:00 PM" },
    { id: 5, direction: "Incoming", name: "vignesh", number: "7564898764", text: "Okay, noted. Thanks!", timestamp: "17/06/2026 04:05 PM" },
    { id: 6, direction: "Incoming", name: "Sneha Kapoor", number: "Reserve Bank of India", text: "Happy Birthday! 🎂🎉", timestamp: "17/06/2026 09:00 AM" },
    { id: 7, direction: "Outgoing", name: "Vikram Nair", number: "856748352", text: "Send me the invoice ASAP.", timestamp: "17/06/2026 09:00 AM" },
];

// ─── WhatsApp Incoming Calls ───────────────────────────────────────
export const whatsappIncomingCallsData = [
    { status: "Incomming", name: "Priya Mehta", number: "+91 98765 43210", duration: "12:30", size: "1201 kb", play: "Play", timestamp: "17/06/2026 11:00 AM" },
    { status: "Incomming", name: "Rahul Verma", number: "+91 76908 79456", duration: "0:00", size: "205 kb", play: "Play", timestamp: "17/06/2026 01:20 PM" },
    { status: "Incomming", name: "vignesh", number: "+91 90765 87465", duration: "5:45", size: "71 kb", play: "Play", timestamp: "17/06/2026 09:30 AM" },
    { status: "Incomming", name: "Sneha Kapoor", number: "+91 65789 64592", duration: "20:00", size: "2908 kb", play: "Play", timestamp: "17/06/2026 08:00 PM" },
    { status: "Incomming", name: "Vikram Nair", number: "+91 93648 67594", duration: "0:00", size: "3278 kb", play: "Play", timestamp: "17/06/2026 02:45 PM" },
];

// ─── WhatsApp Outgoing Calls ───────────────────────────────────────
export const whatsappOutgoingCallsData = [
    { id: 1, contact: "vignesh", type: "Video", duration: "8:15", date: "2026-02-25", time: "10:00 AM", status: "Connected" },
    { id: 2, contact: "Vikram Nair", type: "Voice", duration: "3:22", date: "2026-02-25", time: "12:30 PM", status: "Connected" },
    { id: 3, contact: "Sneha Kapoor", type: "Voice", duration: "0:00", date: "2026-02-24", time: "10:45 AM", status: "Not Answered" },
    { id: 4, contact: "Priya Mehta", type: "Video", duration: "15:00", date: "2026-02-23", time: "07:30 PM", status: "Connected" },
    { id: 5, contact: "Rahul Verma", type: "Voice", duration: "6:10", date: "2026-02-22", time: "11:00 AM", status: "Connected" },
];

// ─── WhatsApp Audio Call Records ───────────────────────────────────
export const whatsappAudioCallsData = [
    { id: 1, contact: "vignesh", direction: "Outgoing", duration: "8:15", date: "2026-02-25", time: "10:00 AM", size: "3.2 MB" },
    { id: 2, contact: "Vikram Nair", direction: "Outgoing", duration: "3:22", date: "2026-02-25", time: "12:30 PM", size: "1.3 MB" },
    { id: 3, contact: "Priya Mehta", direction: "Incoming", duration: "12:30", date: "2026-02-25", time: "11:00 AM", size: "4.8 MB" },
    { id: 4, contact: "vignesh", direction: "Incoming", duration: "5:45", date: "2026-02-24", time: "09:30 AM", size: "2.2 MB" },
    { id: 5, contact: "Priya Mehta", direction: "Outgoing", duration: "15:00", date: "2026-02-23", time: "07:30 PM", size: "5.8 MB" },
    { id: 6, contact: "Rahul Verma", direction: "Outgoing", duration: "6:10", date: "2026-02-22", time: "11:00 AM", size: "2.4 MB" },
];
