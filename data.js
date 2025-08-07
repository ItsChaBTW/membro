/**
 * MEMBRO Portal - Central Data Management System
 * This file serves as a temporary backend/database using JavaScript
 */

// Current User Data
var currentUser = {
    id: 'user_001',
    firstName: 'Heriberto',
    lastName: 'Nathan',
    fullName: 'Heriberto Nathan',
    email: 'heriberto.nathan@email.com',
    phone: '+63 912 345 6789',
    unit: '802',
    building: 'Tower A',
    memberSince: '2020-03-15',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Heriberto+Nathan&background=3b82f6&color=ffffff&size=128',
    accountType: 'owner',
    emergencyContact: {
        name: 'Maria Nathan',
        relationship: 'Spouse',
        phone: '+63 912 345 6790'
    }
};

// Announcements Data
var announcementsData = [
    {
        id: 'ann_001',
        title: 'Pool Maintenance Schedule',
        content: 'The community pool will be closed for maintenance from March 15-17, 2024. Thank you for your understanding.',
        author: 'Building Management',
        authorAvatar: 'https://ui-avatars.com/api/?name=Building+Management&background=059669&color=ffffff&size=40',
        date: '2024-03-10',
        time: '09:00 AM',
        priority: 'high',
        category: 'maintenance',
        likes: 12,
        comments: 3,
        isLiked: false,
        isPinned: true
    },
    {
        id: 'ann_002',
        title: 'New Parking Guidelines',
        content: 'Please note the updated parking guidelines effective March 20, 2024. All vehicles must display proper stickers.',
        author: 'Security Department',
        authorAvatar: 'https://ui-avatars.com/api/?name=Security+Department&background=dc2626&color=ffffff&size=40',
        date: '2024-03-08',
        time: '02:30 PM',
        priority: 'medium',
        category: 'policy',
        likes: 8,
        comments: 5,
        isLiked: true,
        isPinned: false
    },
    {
        id: 'ann_003',
        title: 'Community Event - Spring Festival',
        content: 'Join us for our annual Spring Festival on March 25, 2024 at the community center. Food, games, and prizes!',
        author: 'Community Relations',
        authorAvatar: 'https://ui-avatars.com/api/?name=Community+Relations&background=7c3aed&color=ffffff&size=40',
        date: '2024-03-05',
        time: '11:15 AM',
        priority: 'low',
        category: 'event',
        likes: 25,
        comments: 12,
        isLiked: true,
        isPinned: false
    }
];

// Billing Data
var billingData = {
    currentBalance: 15000,
    dueDate: '2024-03-31',
    bills: [
        {
            id: 'bill_001',
            type: 'HOA Dues',
            amount: 12500,
            period: 'June 24 - June 30, 2025',
            status: 'pending',
            dueDate: '2024-03-31',
            recurring: true
        },
        {
            id: 'bill_002',
            type: 'Maintenance Fee',
            amount: 2500,
            period: 'July 1 - July 30, 2025',
            status: 'pending',
            dueDate: '2024-03-31',
            recurring: true
        }
    ],
    paymentHistory: [
        {
            id: 'pay_001',
            type: 'bills',
            description: 'May 2025 - HOA Dues & Maintenance',
            amount: 15000,
            date: '2024-05-30',
            method: 'GCash',
            status: 'completed',
            transactionId: 'TXN123456'
        },
        {
            id: 'pay_002',
            type: 'services',
            description: 'Facility Booking - Function Hall',
            amount: 2500,
            date: '2024-05-15',
            method: 'Credit Card',
            status: 'completed',
            transactionId: 'TXN123457'
        }
    ]
};

// Household Data
var householdData = {
    familyMembers: [
        {
            id: 'fam_001',
            name: 'Maria Nathan',
            relationship: 'Spouse',
            age: 35,
            contactNumber: '+63 912 345 6790',
            emergencyContact: true,
            avatar: 'https://ui-avatars.com/api/?name=Maria+Nathan&background=ec4899&color=ffffff&size=40'
        },
        {
            id: 'fam_002',
            name: 'Carlos Nathan',
            relationship: 'Son',
            age: 12,
            contactNumber: '',
            emergencyContact: false,
            avatar: 'https://ui-avatars.com/api/?name=Carlos+Nathan&background=3b82f6&color=ffffff&size=40'
        }
    ],
    tenantApplications: [
        {
            id: 'app_001',
            applicantName: 'John Cruz',
            applicantEmail: 'john.cruz@email.com',
            applicantPhone: '+63 912 111 2222',
            ownershipType: 'temporary',
            transferStartDate: '2024-04-01',
            transferEndDate: '2024-06-30',
            compensation: 25000,
            reason: 'Work relocation to another city',
            terms: 'Full responsibility for unit maintenance and HOA dues',
            status: 'pending',
            applicationDate: '2024-03-10',
            documents: ['valid_id.pdf', 'employment_cert.pdf']
        }
    ],
    expectedVisitors: [
        {
            id: 'vis_001',
            name: 'Robert Santos',
            purpose: 'Business Meeting',
            expectedDate: '2024-03-15',
            expectedTime: '2:00 PM',
            contactNumber: '+63 912 333 4444',
            qrCode: 'VIS001-2024-03-15',
            status: 'active'
        }
    ]
};

// Vehicles Data
var vehiclesData = [
    {
        id: 'veh_001',
        type: 'car',
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        plateNumber: 'ABC 1234',
        color: 'White',
        registrationDate: '2022-01-15',
        status: 'active',
        parkingSlot: 'A-15',
        insurance: {
            provider: 'PhilCare Insurance',
            policyNumber: 'POL123456',
            expiryDate: '2024-12-31'
        }
    },
    {
        id: 'veh_002',
        type: 'motorcycle',
        make: 'Honda',
        model: 'Click 150i',
        year: 2021,
        plateNumber: 'XYZ 5678',
        color: 'Black',
        registrationDate: '2021-06-10',
        status: 'active',
        parkingSlot: 'M-08',
        insurance: {
            provider: 'Stronghold Insurance',
            policyNumber: 'POL789012',
            expiryDate: '2024-06-30'
        }
    }
];

// Facilities Data
var facilitiesData = [
    {
        id: 'fac_001',
        name: 'Function Hall',
        capacity: 100,
        hourlyRate: 500,
        amenities: ['Sound System', 'Air Conditioning', 'Tables & Chairs', 'Kitchen Access'],
        description: 'Perfect for celebrations, meetings, and gatherings',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&h=200&fit=crop',
        status: 'available',
        bookings: [
            {
                id: 'book_001',
                date: '2024-03-20',
                startTime: '18:00',
                endTime: '22:00',
                bookedBy: currentUser.fullName,
                purpose: 'Birthday Party',
                status: 'confirmed',
                totalCost: 2000
            }
        ]
    },
    {
        id: 'fac_002',
        name: 'Swimming Pool',
        capacity: 50,
        hourlyRate: 0,
        amenities: ['Life Guard', 'Pool Equipment', 'Shower Rooms', 'Lockers'],
        description: 'Olympic-size swimming pool with professional lifeguard service',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
        status: 'maintenance',
        bookings: []
    },
    {
        id: 'fac_003',
        name: 'Gym',
        capacity: 20,
        hourlyRate: 0,
        amenities: ['Cardio Equipment', 'Weight Training', 'Yoga Mats', 'Sound System'],
        description: 'Fully equipped fitness center with modern equipment',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
        status: 'available',
        bookings: []
    }
];

// Services Data
var servicesData = [
    {
        id: 'ser_001',
        category: 'Maintenance',
        name: 'Plumbing Service',
        provider: 'QuickFix Solutions',
        rating: 4.8,
        price: '₱800/hour',
        description: 'Professional plumbing services for all your needs - leak repairs, drain cleaning, faucet installation, and emergency plumbing',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop',
        available: true,
        contact: '+63 912 777 8888'
    },
    {
        id: 'ser_002',
        category: 'Cleaning',
        name: 'Deep Cleaning Service',
        provider: 'SparkleClean Co.',
        rating: 4.9,
        price: '₱1,200/hour',
        description: 'Comprehensive cleaning service including kitchen, bathrooms, living areas, and bedrooms with eco-friendly products',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
        available: true,
        contact: '+63 912 999 0000'
    },
    {
        id: 'ser_003',
        category: 'Maintenance',
        name: 'Electrical Service',
        provider: 'PowerTech Electric',
        rating: 4.7,
        price: '₱1,000/hour',
        description: 'Licensed electricians for outlet installation, lighting repairs, circuit breaker fixes, and electrical inspections',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
        available: true,
        contact: '+63 912 333 4444'
    },
    {
        id: 'ser_004',
        category: 'Maintenance',
        name: 'HVAC Maintenance',
        provider: 'CoolComfort Systems',
        rating: 4.6,
        price: '₱1,500/hour',
        description: 'Air conditioning and heating system maintenance, filter replacement, and climate control optimization',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
        available: true,
        contact: '+63 912 555 6666'
    },
    {
        id: 'ser_005',
        category: 'Maintenance',
        name: 'Appliance Repair',
        provider: 'FixIt Pro',
        rating: 4.5,
        price: '₱900/hour',
        description: 'Repair and maintenance for refrigerators, washers, dryers, ovens, and other household appliances',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
        available: true,
        contact: '+63 912 777 9999'
    },
    {
        id: 'ser_006',
        category: 'Security',
        name: 'Pest Control',
        provider: 'SafeGuard Pest Control',
        rating: 4.8,
        price: '₱750/hour',
        description: 'Safe and effective pest control solutions for ants, roaches, termites, and other common household pests',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
        available: true,
        contact: '+63 912 888 1111'
    },
    {
        id: 'ser_007',
        category: 'Cleaning',
        name: 'Carpet Cleaning',
        provider: 'FreshCarpet Pro',
        rating: 4.7,
        price: '₱600/hour',
        description: 'Professional carpet and upholstery cleaning with deep stain removal and sanitization',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
        available: true,
        contact: '+63 912 222 3333'
    },
    {
        id: 'ser_008',
        category: 'Security',
        name: 'Additional Security',
        provider: 'SecureGuard Services',
        rating: 4.7,
        price: '₱500/hour',
        description: 'Extra security personnel for events, parties, or special occasions with professional uniformed guards',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
        available: true,
        contact: '+63 912 111 2222'
    }
];

// Complaints Data
var complaintsData = [
    {
        id: 'comp_001',
        title: 'Noise Complaint - Unit 803',
        category: 'Noise',
        description: 'Loud music playing past 10 PM for several nights',
        status: 'in_progress',
        priority: 'medium',
        dateSubmitted: '2024-03-08',
        assignedTo: 'Building Management',
        updates: [
            {
                date: '2024-03-08',
                time: '09:30 AM',
                update: 'Complaint received and logged',
                updatedBy: 'System'
            },
            {
                date: '2024-03-09',
                time: '02:15 PM',
                update: 'Notice sent to Unit 803',
                updatedBy: 'Building Management'
            }
        ]
    },
    {
        id: 'comp_002',
        title: 'Parking Issue - Visitor Slot',
        category: 'Parking',
        description: 'Resident parking in visitor slots regularly',
        status: 'resolved',
        priority: 'low',
        dateSubmitted: '2024-03-05',
        assignedTo: 'Security',
        resolution: 'Warning issued and parking guidelines sent to all residents',
        updates: [
            {
                date: '2024-03-05',
                time: '11:00 AM',
                update: 'Complaint received',
                updatedBy: 'System'
            },
            {
                date: '2024-03-06',
                time: '03:30 PM',
                update: 'Investigation completed - warning issued',
                updatedBy: 'Security'
            },
            {
                date: '2024-03-07',
                time: '10:00 AM',
                update: 'Case resolved',
                updatedBy: 'Building Management'
            }
        ]
    }
];

// Properties/Units Data
var propertiesData = [
    {
        id: 'prop_001',
        unitNumber: '802',
        building: 'Tower A',
        floor: 8,
        type: '2BR',
        area: 85.5,
        owner: currentUser.fullName,
        occupancyStatus: 'owner_occupied',
        marketValue: 4500000,
        acquisitionDate: '2020-03-15',
        documents: [
            {
                type: 'Title',
                number: 'TCT-12345',
                dateIssued: '2020-03-15'
            },
            {
                type: 'Tax Declaration',
                number: 'TD-67890',
                dateIssued: '2020-03-20'
            }
        ]
    }
];

// Property Inventory for Sales (Seller Portal)
var propertyInventory = [
    {
        id: 'inv_001',
        propertyId: 'TGR_B1_L1',
        unitNumber: '1',
        block: '1',
        phase: '4A',
        project: 'Tandatangan Golf Residences',
        lotType: 'Fairway',
        area: 625,
        price: 20000000,
        reservationFee: 200000,
        status: 'available', // available, reserved, sold, not_available
        statusLastUpdated: new Date().toISOString(),
        reservation: null, // Will hold reservation details when reserved
        coordinates: { x: 50, y: 100 }, // For map positioning
        geoCoordinates: { lat: 14.2145, lng: 121.0405 }, // Real geographic coordinates
        address: 'Block 1, Lot 1, Tandatangan Golf Residences, Rizal',
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop'
        ],
        features: ['Corner Lot', 'Golf Course View', 'Premium Location'],
        description: 'Premium corner lot with excellent golf course views'
    },
    {
        id: 'inv_002',
        propertyId: 'TGR_B1_L22',
        unitNumber: '22',
        block: '1',
        phase: '4A',
        project: 'Tandatangan Golf Residences',
        lotType: 'Fairway',
        area: 500,
        price: 15000000,
        reservationFee: 150000,
        status: 'available',
        statusLastUpdated: new Date().toISOString(),
        reservation: null,
        coordinates: { x: 150, y: 120 },
        geoCoordinates: { lat: 14.2148, lng: 121.0410 },
        address: 'Block 1, Lot 22, Tandatangan Golf Residences, Rizal',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop'
        ],
        features: ['Regular Lot', 'Golf Course View', 'Good Location'],
        description: 'Well-positioned lot with golf course access'
    },
    {
        id: 'inv_003',
        propertyId: 'TGR_B1_L23',
        unitNumber: '23',
        block: '1',
        phase: '4A',
        project: 'Tandatangan Golf Residences',
        lotType: 'Fairway',
        area: 550,
        price: 16500000,
        reservationFee: 165000,
        status: 'reserved',
        statusLastUpdated: new Date().toISOString(),
        reservation: {
            reservationId: 'RES-2024-001',
            buyerName: 'Maria Santos',
            buyerEmail: 'maria.santos@email.com',
            buyerPhone: '+63 912 345 6789',
            reservationDate: new Date().toISOString(),
            expiryDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString(), // 3 days from now
            paymentMethod: 'reservation_fee',
            amountPaid: 165000,
            transactionId: 'TXN-2024-001',
            status: 'active' // active, expired, converted_to_sale, cancelled
        },
        coordinates: { x: 200, y: 140 },
        geoCoordinates: { lat: 14.2146, lng: 121.0412 },
        address: 'Block 1, Lot 23, Tandatangan Golf Residences, Rizal',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop'
        ],
        features: ['Regular Lot', 'Golf Course View', 'Good Location'],
        description: 'Well-positioned lot with golf course access'
    },
    {
        id: 'inv_004',
        propertyId: 'TGR_B2_L12',
        unitNumber: '12',
        block: '2',
        phase: '4A',
        project: 'Tandatangan Golf Residences',
        lotType: 'Garden',
        area: 480,
        price: 14000000,
        reservationFee: 140000,
        status: 'available',
        statusLastUpdated: new Date().toISOString(),
        reservation: null,
        coordinates: { x: 80, y: 220 },
        geoCoordinates: { lat: 14.2150, lng: 121.0408 },
        address: 'Block 2, Lot 12, Tandatangan Golf Residences, Rizal',
        images: [
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=250&fit=crop'
        ],
        features: ['Garden View', 'Quiet Location', 'Family-Friendly'],
        description: 'Peaceful lot with garden surroundings'
    },
    {
        id: 'inv_005',
        propertyId: 'TGR_B2_L16',
        unitNumber: '16',
        block: '2',
        phase: '4A',
        project: 'Tandatangan Golf Residences',
        lotType: 'Garden',
        area: 520,
        price: 15500000,
        reservationFee: 155000,
        status: 'sold',
        statusLastUpdated: new Date().toISOString(),
        reservation: null,
        coordinates: { x: 160, y: 240 },
        geoCoordinates: { lat: 14.2144, lng: 121.0415 },
        address: 'Block 2, Lot 16, Tandatangan Golf Residences, Rizal',
        images: [
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=250&fit=crop'
        ],
        features: ['Garden View', 'Premium Location', 'Corner Lot'],
        description: 'Premium corner lot with excellent garden views'
    },
    {
        id: 'inv_006',
        propertyId: 'TGR_B3_L5',
        unitNumber: '5',
        block: '3',
        phase: '4A',
        project: 'Tandatangan Golf Residences',
        lotType: 'Lakeside',
        area: 750,
        price: 25000000,
        reservationFee: 250000,
        status: 'available',
        statusLastUpdated: new Date().toISOString(),
        reservation: null,
        coordinates: { x: 250, y: 50 },
        geoCoordinates: { lat: 14.2142, lng: 121.0418 },
        address: 'Block 3, Lot 5, Tandatangan Golf Residences, Rizal',
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop'
        ],
        features: ['Lakeside View', 'Premium Location', 'Large Lot'],
        description: 'Exclusive lakeside lot with panoramic water views'
    },
    {
        id: 'inv_007',
        propertyId: 'TGR_B3_L15',
        unitNumber: '15',
        block: '3',
        phase: '4A',
        project: 'Tandatangan Golf Residences',
        lotType: 'Fairway',
        area: 580,
        price: 18000000,
        reservationFee: 180000,
        status: 'not_available',
        statusLastUpdated: new Date().toISOString(),
        reservation: null,
        coordinates: { x: 300, y: 180 },
        geoCoordinates: { lat: 14.2147, lng: 121.0420 },
        address: 'Block 3, Lot 15, Tandatangan Golf Residences, Rizal',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop'
        ],
        features: ['Golf Course View', 'Corner Lot', 'Premium Location'],
        description: 'Premium corner lot overlooking the 18th hole'
    },
    {
        id: 'inv_008',
        propertyId: 'TGR_B4_L3',
        unitNumber: '3',
        block: '4',
        phase: '4A',
        project: 'Tandatangan Golf Residences',
        lotType: 'Garden',
        area: 460,
        price: 13500000,
        reservationFee: 135000,
        status: 'available',
        statusLastUpdated: new Date().toISOString(),
        reservation: null,
        coordinates: { x: 100, y: 300 },
        geoCoordinates: { lat: 14.2149, lng: 121.0422 },
        address: 'Block 4, Lot 3, Tandatangan Golf Residences, Rizal',
        images: [
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=250&fit=crop'
        ],
        features: ['Garden View', 'Quiet Area', 'Family-Friendly'],
        description: 'Peaceful garden lot perfect for family homes'
    }
];

// Lots Data
var lotsData = [
    {
        id: 'lot_001',
        lotNumber: 'L-15',
        area: 12.0,
        type: 'Parking',
        location: 'Basement Level 1',
        status: 'occupied',
        assignedTo: currentUser.fullName,
        monthlyFee: 1500,
        assignedVehicle: 'ABC 1234'
    },
    {
        id: 'lot_002',
        lotNumber: 'S-08',
        area: 2.5,
        type: 'Storage',
        location: 'Basement Level 2',
        status: 'occupied',
        assignedTo: currentUser.fullName,
        monthlyFee: 800,
        assignedVehicle: null
    }
];

// Notifications Data
var notificationsData = [
    {
        id: 'not_001',
        type: 'comment',
        title: 'Frankie Sullivan commented on your post',
        message: 'This is looking great! Let\'s get started on it.',
        avatar: 'https://ui-avatars.com/api/?name=Frankie+Sullivan&background=3b82f6&color=ffffff&size=40',
        date: '2024-03-10',
        time: '2:20 PM',
        isRead: false
    },
    {
        id: 'not_002',
        type: 'follow',
        title: 'Amelie Laurent followed you',
        message: '',
        avatar: 'https://ui-avatars.com/api/?name=Amelie+Laurent&background=10b981&color=ffffff&size=40',
        date: '2024-03-10',
        time: '10:04 AM',
        isRead: false
    },
    {
        id: 'not_003',
        type: 'upload',
        title: 'Mikah DiStefano uploaded 2 attachments',
        message: 'Prototype recording 02.mp4',
        avatar: 'https://ui-avatars.com/api/?name=Mikah+DiStefano&background=f59e0b&color=ffffff&size=40',
        date: '2024-03-09',
        time: '4:15 PM',
        isRead: false,
        attachments: [
            {
                name: 'Prototype recording 02.mp4',
                size: '16 MB',
                type: 'video'
            }
        ]
    }
];

// Dashboard Stats Data
var dashboardStats = {
    totalBills: 15000,
    pendingComplaints: 1,
    upcomingBookings: 1,
    unreadNotifications: 3
};

// Data Management Functions
var MembroData = {
    // User Management
    getCurrentUser: function() {
        return currentUser;
    },
    
    updateUser: function(userData) {
        Object.assign(currentUser, userData);
        this.saveToStorage('currentUser', currentUser);
    },

    // Announcements Management
    getAnnouncements: function() {
        return announcementsData;
    },
    
    addAnnouncement: function(announcement) {
        announcement.id = 'ann_' + Date.now();
        announcementsData.unshift(announcement);
        this.saveToStorage('announcements', announcementsData);
    },
    
    likeAnnouncement: function(id) {
        var announcement = announcementsData.find(function(a) { return a.id === id; });
        if (announcement) {
            announcement.isLiked = !announcement.isLiked;
            announcement.likes += announcement.isLiked ? 1 : -1;
            this.saveToStorage('announcements', announcementsData);
        }
    },

    // Billing Management
    getBilling: function() {
        return billingData;
    },
    
    addPayment: function(payment) {
        payment.id = 'pay_' + Date.now();
        billingData.paymentHistory.unshift(payment);
        this.saveToStorage('billing', billingData);
    },

    // Household Management
    getHousehold: function() {
        return householdData;
    },
    
    addFamilyMember: function(member) {
        member.id = 'fam_' + Date.now();
        member.avatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=3b82f6&color=ffffff&size=40';
        householdData.familyMembers.push(member);
        this.saveToStorage('household', householdData);
    },
    
    addVisitor: function(visitor) {
        visitor.id = 'vis_' + Date.now();
        visitor.qrCode = 'VIS' + Date.now() + '-' + visitor.expectedDate;
        householdData.expectedVisitors.push(visitor);
        this.saveToStorage('household', householdData);
    },

    // Vehicles Management
    getVehicles: function() {
        return vehiclesData;
    },
    
    addVehicle: function(vehicle) {
        vehicle.id = 'veh_' + Date.now();
        vehiclesData.push(vehicle);
        this.saveToStorage('vehicles', vehiclesData);
    },

    // Complaints Management
    getComplaints: function() {
        return complaintsData;
    },
    
    addComplaint: function(complaint) {
        complaint.id = 'comp_' + Date.now();
        complaint.dateSubmitted = new Date().toISOString().split('T')[0];
        complaint.status = 'pending';
        complaint.updates = [{
            date: complaint.dateSubmitted,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            update: 'Complaint received and logged',
            updatedBy: 'System'
        }];
        complaintsData.unshift(complaint);
        this.saveToStorage('complaints', complaintsData);
    },

    // Facilities Management
    getFacilities: function() {
        return facilitiesData;
    },
    
    bookFacility: function(facilityId, booking) {
        var facility = facilitiesData.find(function(f) { return f.id === facilityId; });
        if (facility) {
            booking.id = 'book_' + Date.now();
            booking.bookedBy = currentUser.fullName;
            booking.status = 'confirmed';
            facility.bookings.push(booking);
            this.saveToStorage('facilities', facilitiesData);
        }
    },

    // Services Management
    getServices: function() {
        return servicesData;
    },

    // Properties Management
    getProperties: function() {
        return propertiesData;
    },

    // Lots Management
    getLots: function() {
        return lotsData;
    },

    // Property Inventory Management (Seller Portal)
    getPropertyInventory: function() {
        // Update reservation statuses before returning
        this.updateReservationStatuses();
        return propertyInventory;
    },

    // Get available properties only
    getAvailableProperties: function() {
        this.updateReservationStatuses();
        return propertyInventory.filter(function(property) {
            return property.status === 'available';
        });
    },

    // Get reserved properties
    getReservedProperties: function() {
        this.updateReservationStatuses();
        return propertyInventory.filter(function(property) {
            return property.status === 'reserved';
        });
    },

    // Reserve a property
    reserveProperty: function(propertyId, reservationData) {
        var property = propertyInventory.find(function(p) { return p.id === propertyId; });
        
        if (!property) {
            throw new Error('Property not found');
        }
        
        if (property.status !== 'available') {
            throw new Error('Property is not available for reservation');
        }

        // Create reservation object
        var reservationId = 'RES-' + new Date().getFullYear() + '-' + Date.now().toString().slice(-6);
        var expiryDate = new Date();
        
        // Set expiry based on reservation type (default 3 days, configurable)
        var reservationDays = reservationData.reservationDays || 3;
        expiryDate.setDate(expiryDate.getDate() + reservationDays);

        property.reservation = {
            reservationId: reservationId,
            buyerName: reservationData.buyerName,
            buyerEmail: reservationData.buyerEmail,
            buyerPhone: reservationData.buyerPhone,
            reservationDate: new Date().toISOString(),
            expiryDate: expiryDate.toISOString(),
            paymentMethod: reservationData.paymentMethod || 'reservation_fee',
            amountPaid: reservationData.amountPaid || property.reservationFee,
            transactionId: reservationData.transactionId,
            status: 'active',
            reservationDays: reservationDays
        };

        property.status = 'reserved';
        property.statusLastUpdated = new Date().toISOString();

        // Save to storage
        this.saveToStorage('propertyInventory', propertyInventory);
        
        // Create notification for seller
        this.addNotification({
            type: 'reservation',
            title: 'New Property Reservation',
            message: `Property ${property.unitNumber} in Block ${property.block} has been reserved by ${reservationData.buyerName}`,
            avatar: 'https://ui-avatars.com/api/?name=Reservation&background=f59e0b&color=ffffff&size=40'
        });

        return {
            success: true,
            reservationId: reservationId,
            property: property,
            expiryDate: expiryDate.toISOString()
        };
    },

    // Cancel a reservation
    cancelReservation: function(propertyId, reason) {
        var property = propertyInventory.find(function(p) { return p.id === propertyId; });
        
        if (!property || !property.reservation) {
            throw new Error('Property or reservation not found');
        }

        var reservationId = property.reservation.reservationId;
        var buyerName = property.reservation.buyerName;

        // Clear reservation
        property.reservation.status = 'cancelled';
        property.reservation.cancellationReason = reason;
        property.reservation.cancellationDate = new Date().toISOString();
        
        property.status = 'available';
        property.statusLastUpdated = new Date().toISOString();

        // Save to storage
        this.saveToStorage('propertyInventory', propertyInventory);
        
        // Create notification
        this.addNotification({
            type: 'cancellation',
            title: 'Reservation Cancelled',
            message: `Reservation ${reservationId} for Property ${property.unitNumber} by ${buyerName} has been cancelled. Reason: ${reason}`,
            avatar: 'https://ui-avatars.com/api/?name=Cancel&background=ef4444&color=ffffff&size=40'
        });

        return {
            success: true,
            reservationId: reservationId,
            property: property
        };
    },

    // Convert reservation to sale
    convertReservationToSale: function(propertyId, saleData) {
        var property = propertyInventory.find(function(p) { return p.id === propertyId; });
        
        if (!property || !property.reservation) {
            throw new Error('Property or reservation not found');
        }

        var reservationId = property.reservation.reservationId;
        var buyerName = property.reservation.buyerName;

        // Update reservation status
        property.reservation.status = 'converted_to_sale';
        property.reservation.conversionDate = new Date().toISOString();
        property.reservation.saleData = saleData;
        
        property.status = 'sold';
        property.statusLastUpdated = new Date().toISOString();

        // Save to storage
        this.saveToStorage('propertyInventory', propertyInventory);
        
        // Create notification
        this.addNotification({
            type: 'sale',
            title: 'Reservation Converted to Sale',
            message: `Congratulations! Reservation ${reservationId} for Property ${property.unitNumber} by ${buyerName} has been converted to a sale.`,
            avatar: 'https://ui-avatars.com/api/?name=Sale&background=10b981&color=ffffff&size=40'
        });

        return {
            success: true,
            reservationId: reservationId,
            property: property
        };
    },

    // Check and update expired reservations
    updateReservationStatuses: function() {
        var now = new Date();
        var hasUpdates = false;

        propertyInventory.forEach(function(property) {
            if (property.status === 'reserved' && property.reservation && property.reservation.status === 'active') {
                var expiryDate = new Date(property.reservation.expiryDate);
                
                if (now > expiryDate) {
                    // Reservation has expired
                    property.reservation.status = 'expired';
                    property.status = 'available';
                    property.statusLastUpdated = new Date().toISOString();
                    hasUpdates = true;

                    // Create notification for expired reservation
                    MembroData.addNotification({
                        type: 'expiry',
                        title: 'Reservation Expired',
                        message: `Reservation ${property.reservation.reservationId} for Property ${property.unitNumber} by ${property.reservation.buyerName} has expired.`,
                        avatar: 'https://ui-avatars.com/api/?name=Expired&background=6b7280&color=ffffff&size=40'
                    });
                }
            }
        });

        if (hasUpdates) {
            this.saveToStorage('propertyInventory', propertyInventory);
        }
    },

    // Get property by ID
    getPropertyById: function(propertyId) {
        this.updateReservationStatuses();
        return propertyInventory.find(function(p) { return p.id === propertyId; });
    },

    // Get properties by status
    getPropertiesByStatus: function(status) {
        this.updateReservationStatuses();
        return propertyInventory.filter(function(property) {
            return property.status === status;
        });
    },

    // Get reservation summary for dashboard
    getReservationSummary: function() {
        this.updateReservationStatuses();
        
        var summary = {
            totalProperties: propertyInventory.length,
            available: 0,
            reserved: 0,
            sold: 0,
            notAvailable: 0,
            activeReservations: [],
            expiringReservations: []
        };

        var oneDayFromNow = new Date();
        oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);

        propertyInventory.forEach(function(property) {
            summary[property.status]++;
            
            if (property.status === 'reserved' && property.reservation && property.reservation.status === 'active') {
                summary.activeReservations.push(property);
                
                var expiryDate = new Date(property.reservation.expiryDate);
                if (expiryDate <= oneDayFromNow) {
                    summary.expiringReservations.push(property);
                }
            }
        });

        return summary;
    },

    // Notifications Management
    getNotifications: function() {
        return notificationsData;
    },
    
    markNotificationRead: function(id) {
        var notification = notificationsData.find(function(n) { return n.id === id; });
        if (notification) {
            notification.isRead = true;
            this.saveToStorage('notifications', notificationsData);
        }
    },
    
    addNotification: function(notification) {
        notification.id = 'not_' + Date.now();
        notification.date = new Date().toISOString().split('T')[0];
        notification.time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        notification.isRead = false;
        notificationsData.unshift(notification);
        this.saveToStorage('notifications', notificationsData);
    },

    // Dashboard Stats
    getDashboardStats: function() {
        // Recalculate stats dynamically
        dashboardStats.totalBills = billingData.currentBalance;
        dashboardStats.pendingComplaints = complaintsData.filter(function(c) { return c.status !== 'resolved'; }).length;
        dashboardStats.upcomingBookings = facilitiesData.reduce(function(total, facility) {
            return total + facility.bookings.filter(function(booking) {
                return new Date(booking.date) >= new Date();
            }).length;
        }, 0);
        dashboardStats.unreadNotifications = notificationsData.filter(function(n) { return !n.isRead; }).length;
        return dashboardStats;
    },

    // Storage Management (LocalStorage simulation)
    saveToStorage: function(key, data) {
        try {
            localStorage.setItem('membro_' + key, JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
    },
    
    loadFromStorage: function(key) {
        try {
            var data = localStorage.getItem('membro_' + key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Could not load from localStorage:', e);
            return null;
        }
    },

    // Initialize data from storage
    init: function() {
        var savedData = {
            currentUser: this.loadFromStorage('currentUser'),
            announcements: this.loadFromStorage('announcements'),
            billing: this.loadFromStorage('billing'),
            household: this.loadFromStorage('household'),
            vehicles: this.loadFromStorage('vehicles'),
            complaints: this.loadFromStorage('complaints'),
            facilities: this.loadFromStorage('facilities'),
            notifications: this.loadFromStorage('notifications'),
            propertyInventory: this.loadFromStorage('propertyInventory')
        };

        // Update with saved data if available
        if (savedData.currentUser) currentUser = savedData.currentUser;
        if (savedData.announcements) announcementsData = savedData.announcements;
        if (savedData.billing) billingData = savedData.billing;
        if (savedData.household) householdData = savedData.household;
        if (savedData.vehicles) vehiclesData = savedData.vehicles;
        if (savedData.complaints) complaintsData = savedData.complaints;
        if (savedData.facilities) facilitiesData = savedData.facilities;
        if (savedData.notifications) notificationsData = savedData.notifications;
        if (savedData.propertyInventory) propertyInventory = savedData.propertyInventory;
        
        // Start automatic reservation status checking
        this.startReservationStatusChecker();
    },

    // Automatic reservation status checker (runs every 5 minutes)
    startReservationStatusChecker: function() {
        var self = this;
        setInterval(function() {
            self.updateReservationStatuses();
        }, 5 * 60 * 1000); // Check every 5 minutes
    }
};

// Initialize data when script loads
MembroData.init();

// Add comprehensive notification and email system
MembroData.createNotificationDemo = function() {
    // Add sample notifications for demonstration
    var demoNotifications = [
        {
            id: 'notif_' + Date.now() + '_1',
            type: 'booking',
            title: 'Service Booking Confirmed',
            message: 'Deep Cleaning Service scheduled for December 15, 2024 at 9:00 AM',
            avatar: 'https://ui-avatars.com/api/?name=Service+Team&background=10b981&color=ffffff&size=40',
            timestamp: new Date().toISOString(),
            isRead: false,
            hasAttachment: false,
            sendEmail: true
        },
        {
            id: 'notif_' + Date.now() + '_2',
            type: 'payment',
            title: 'Payment Processed',
            message: 'Monthly HOA dues payment of ₱12,500 has been successfully processed',
            avatar: 'https://ui-avatars.com/api/?name=Billing&background=3b82f6&color=ffffff&size=40',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            isRead: false,
            hasAttachment: true,
            sendEmail: true
        },
        {
            id: 'notif_' + Date.now() + '_3',
            type: 'announcement',
            title: 'New Community Announcement',
            message: 'Swimming pool will be closed for maintenance on December 20-22, 2024',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=f59e0b&color=ffffff&size=40',
            timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            isRead: true,
            hasAttachment: false,
            sendEmail: true
        },
        {
            id: 'notif_' + Date.now() + '_4',
            type: 'unsubscribe',
            title: 'Member Unsubscribed',
            message: 'John Doe (Unit 505) has unsubscribed from email notifications',
            avatar: 'https://ui-avatars.com/api/?name=System&background=ef4444&color=ffffff&size=40',
            timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
            isRead: false,
            hasAttachment: false,
            sendEmail: true,
            adminOnly: true
        }
    ];

    // Add notifications to the system
    demoNotifications.forEach(function(notification) {
        MembroData.addNotification(notification);
    });

    console.log('🔔 Demo notifications created and emails triggered!');
    return demoNotifications;
};

// Enhanced notification with email sending
MembroData.addNotificationWithEmail = function(notification) {
    // Add to notifications array
    notificationsData.unshift(notification);
    
    // Update dashboard stats
    dashboardStats.unreadNotifications = notificationsData.filter(function(n) { return !n.isRead; }).length;
    
    // Save to storage
    MembroData.saveToStorage('notifications', notificationsData);
    MembroData.saveToStorage('dashboardStats', dashboardStats);
    
    // Send email if enabled and email service is available
    if (notification.sendEmail !== false && typeof MembroEmailService !== 'undefined') {
        var user = MembroData.getCurrentUser();
        
        // Determine email type and data based on notification type
        var emailType = 'service_booking'; // default
        var emailData = {
            firstName: user.firstName,
            email: user.email,
            bookedBy: user.fullName,
            unit: user.unit,
            timestamp: new Date().toISOString()
        };

        // Customize based on notification type
        switch(notification.type) {
            case 'booking':
                emailType = 'service_booking';
                emailData.serviceName = notification.title;
                emailData.provider = 'MEMBRO Service Team';
                emailData.date = 'December 15, 2024';
                emailData.time = '9:00 AM';
                emailData.bookingId = 'SB-' + Date.now();
                break;
                
            case 'unsubscribe':
                emailType = 'unsubscribe_notification';
                emailData = {
                    memberName: 'John Doe',
                    email: 'john.doe@email.com',
                    unit: 'Unit 505',
                    unsubscribeDate: new Date().toLocaleDateString(),
                    reason: 'Too many emails'
                };
                // Send to admin email instead
                emailData.to = 'admin@membro.com';
                break;
        }

        // Send email
        MembroEmailService.sendEmail({
            type: emailType,
            to: emailData.to || user.email,
            data: emailData
        }).then(function(result) {
            console.log('📧 Email sent successfully:', result);
        }).catch(function(error) {
            console.error('📧 Email failed:', error);
        });
    }
    
    return notification;
};

// Function to simulate member unsubscribing
MembroData.simulateUnsubscribe = function(memberData) {
    // Create unsubscribe notification for admin
    var unsubscribeNotification = {
        id: 'notif_unsubscribe_' + Date.now(),
        type: 'unsubscribe',
        title: 'Member Unsubscribed from Notifications',
        message: memberData.name + ' (' + memberData.unit + ') has unsubscribed from email notifications',
        avatar: 'https://ui-avatars.com/api/?name=System&background=ef4444&color=ffffff&size=40',
        timestamp: new Date().toISOString(),
        isRead: false,
        sendEmail: true,
        adminOnly: true
    };
    
    // Add notification with email
    MembroData.addNotificationWithEmail(unsubscribeNotification);
    
    console.log('📬 Unsubscribe notification sent to admin');
    return unsubscribeNotification;
};

// Function to test email system
MembroData.testEmailSystem = function() {
    console.log('🧪 Testing MEMBRO Email System...');
    
    if (typeof MembroEmailService === 'undefined') {
        console.error('❌ Email service not loaded. Please include email-service.js');
        return;
    }
    
    var user = MembroData.getCurrentUser();
    
    // Test different email types
    var emailTests = [
        {
            type: 'service_booking',
            data: {
                bookedBy: user.fullName,
                serviceName: 'Deep Cleaning Service',
                provider: 'CleanPro Services',
                date: 'December 15, 2024',
                time: '9:00 AM',
                unit: user.unit,
                bookingId: 'SB-TEST-' + Date.now(),
                notes: 'Please focus on kitchen and bathrooms'
            }
        },
        {
            type: 'password_reset',
            data: {
                otp: '123456',
                email: user.email
            }
        },
        {
            type: 'email_verification',
            data: {
                firstName: user.firstName,
                verificationCode: '654321',
                email: user.email
            }
        },
        {
            type: 'unsubscribe_notification',
            data: {
                memberName: 'John Doe',
                email: 'john.doe@email.com',
                unit: 'Unit 505',
                unsubscribeDate: new Date().toLocaleDateString(),
                reason: 'Too many emails'
            }
        }
    ];
    
    // Send test emails
    emailTests.forEach(function(emailTest, index) {
        setTimeout(function() {
            MembroEmailService.sendEmail({
                type: emailTest.type,
                to: emailTest.data.email || user.email,
                data: emailTest.data
            }).then(function(result) {
                console.log('✅ Test email ' + (index + 1) + ' sent:', result);
            }).catch(function(error) {
                console.error('❌ Test email ' + (index + 1) + ' failed:', error);
            });
        }, index * 1000); // Stagger emails by 1 second
    });
    
    console.log('📧 Test emails queued. Check console for results.');
};

// Function to clear user session data
MembroData.clearUserSession = function() {
    console.log('🔐 Clearing user session data...');
    
    // Clear all localStorage data
    var keysToRemove = [
        'membroUserData',
        'membroNotifications',
        'membroBillingData',
        'membroHouseholdData',
        'membroVehiclesData',
        'membroFacilitiesData',
        'membroServicesData',
        'membroComplaintsData',
        'membroPropertiesData',
        'membroLotsData',
        'membroAnnouncementsData',
        'membroDashboardStats'
    ];
    
    keysToRemove.forEach(function(key) {
        localStorage.removeItem(key);
    });
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Reset current user to null
    currentUser = null;
    
    console.log('✅ User session cleared successfully');
};

// Function to register a new user
MembroData.registerUser = function(userData) {
    console.log('👤 Registering new user:', userData);
    
    // Generate unique user ID
    var userId = 'user_' + Date.now();
    
    // Create user object with pending status
    var newUser = {
        id: userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: userData.firstName + ' ' + userData.lastName,
        email: userData.email,
        phone: userData.phone,
        unit: userData.unit,
        building: 'Tower A', // Default building
        memberSince: new Date().toISOString().split('T')[0],
        status: 'pending', // New users start as pending approval
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.firstName + '+' + userData.lastName) + '&background=3b82f6&color=ffffff&size=128',
        accountType: 'owner',
        emergencyContact: {
            name: '',
            relationship: '',
            phone: ''
        },
        verifiedAt: new Date().toISOString(),
        registeredAt: new Date().toISOString(),
        approvalStatus: 'pending',
        approvedAt: null,
        approvedBy: null
    };
    
    // Set as current user (but with pending status)
    currentUser = newUser;
    
    // Save to localStorage
    localStorage.setItem('membroUserData', JSON.stringify(newUser));
    
    // Initialize completely empty user data collections
    MembroData.initializeEmptyUserData(userId);
    
    console.log('✅ User registered successfully with pending status:', newUser);
    return newUser;
};

// Function to initialize user data collections
MembroData.initializeUserData = function(userId) {
    console.log('📊 Initializing user data collections...');
    
    // Initialize empty collections for the new user
    var initialCollections = {
        notifications: [],
        billing: {
            currentBalance: 0,
            dueDate: null,
            bills: [],
            paymentHistory: []
        },
        household: {
            family: [],
            tenants: [],
            visitors: []
        },
        vehicles: [],
        facilities: [],
        services: [],
        complaints: [],
        properties: [],
        lots: []
    };
    
    // Save initial collections
    Object.keys(initialCollections).forEach(function(collection) {
        var storageKey = 'membro' + collection.charAt(0).toUpperCase() + collection.slice(1) + 'Data';
        localStorage.setItem(storageKey, JSON.stringify(initialCollections[collection]));
    });
    
    // Add welcome notification
    var welcomeNotification = {
        id: 'notif_welcome_' + Date.now(),
        type: 'welcome',
        title: 'Welcome to MEMBRO!',
        message: 'Your account has been successfully created. Explore all the features available to you.',
        avatar: 'https://ui-avatars.com/api/?name=MEMBRO&background=3b82f6&color=ffffff&size=40',
        timestamp: new Date().toISOString(),
        isRead: false
    };
    
    MembroData.addNotification(welcomeNotification);
    
    console.log('✅ User data collections initialized');
};

// Function to initialize empty user data collections
MembroData.initializeEmptyUserData = function(userId) {
    console.log('📊 Initializing empty user data collections for:', userId);
    
    // Initialize completely empty collections for new pending users
    var emptyCollections = {
        notifications: [], // No notifications for pending users
        billing: {
            currentBalance: 0,
            dueDate: null,
            bills: [],
            paymentHistory: []
        },
        household: {
            family: [],
            tenants: [],
            visitors: []
        },
        vehicles: [],
        facilities: [],
        services: [],
        complaints: [],
        properties: [],
        lots: [],
        announcements: [] // Empty announcements
    };
    
    // Save empty collections
    Object.keys(emptyCollections).forEach(function(collection) {
        var storageKey = 'membro' + collection.charAt(0).toUpperCase() + collection.slice(1) + 'Data';
        localStorage.setItem(storageKey, JSON.stringify(emptyCollections[collection]));
    });
    
    // Initialize empty dashboard stats
    var emptyStats = {
        totalBills: 0,
        paymentDue: null,
        unreadNotifications: 0,
        activeComplaints: 0,
        upcomingBookings: 0
    };
    localStorage.setItem('membroDashboardStats', JSON.stringify(emptyStats));
    
    console.log('✅ Empty user data collections initialized for pending user:', userId);
};

// Function to test signup functionality
MembroData.testSignup = function() {
    console.log('🧪 Testing signup functionality...');
    
    var testUserData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+63 912 345 6789',
        unit: '101'
    };
    
    try {
        var newUser = MembroData.registerUser(testUserData);
        console.log('✅ Signup test successful:', newUser);
        return newUser;
    } catch (error) {
        console.error('❌ Signup test failed:', error);
        return null; 
    }
};

// Function to approve a pending user (Admin function)
MembroData.approveUser = function(userId, adminName) {
    console.log('👨‍💼 Admin approving user:', userId);
    
    try {
        // Get current user data
        var userData = JSON.parse(localStorage.getItem('membroUserData') || '{}');
        
        if (userData.id === userId && userData.status === 'pending') {
            // Update user status to active
            userData.status = 'active';
            userData.approvalStatus = 'approved';
            userData.approvedAt = new Date().toISOString();
            userData.approvedBy = adminName || 'Admin';
            
            // Update current user
            currentUser = userData;
            
            // Save updated user data
            localStorage.setItem('membroUserData', JSON.stringify(userData));
            
            // Add welcome notification now that user is approved
            var welcomeNotification = {
                id: 'notif_welcome_' + Date.now(),
                type: 'welcome',
                title: 'Welcome to MEMBRO!',
                message: 'Your account has been approved! You now have full access to all MEMBRO features.',
                avatar: 'https://ui-avatars.com/api/?name=MEMBRO&background=10b981&color=ffffff&size=40',
                timestamp: new Date().toISOString(),
                isRead: false
            };
            
            MembroData.addNotification(welcomeNotification);
            
            console.log('✅ User approved successfully:', userData);
            return userData;
        } else {
            console.log('⚠️ User not found or not pending approval');
            return null;
        }
    } catch (error) {
        console.error('❌ User approval failed:', error);
        return null;
    }
};

// Function to simulate admin approval for testing
MembroData.simulateAdminApproval = function() {
    console.log('🧪 Simulating admin approval...');
    
    var currentUser = MembroData.getCurrentUser();
    if (currentUser && currentUser.status === 'pending') {
        return MembroData.approveUser(currentUser.id, 'System Admin');
    } else {
        console.log('⚠️ No pending user to approve');
        return null;
    }
};
