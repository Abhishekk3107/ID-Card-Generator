export const defaultTemplates = [
  {
    id: 'template1',
    name: 'Executive Sapphire',
    width: 856,
    height: 540,
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)',
    hasPhoto: true,
    hasPattern: true,
    pattern: {
      type: 'glassmorphic-geometric',
      elements: [
        // Glassmorphic header bar
        { type: 'rect', x: 0, y: 0, width: 856, height: 120, color: 'rgba(255,255,255,0.1)', blur: 20, borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1 },
        // Left sidebar glass panel
        { type: 'rect', x: 0, y: 0, width: 280, height: 540, color: 'rgba(0,0,0,0.25)', blur: 15 },
        // Decorative circles
        { type: 'circle', x: 780, y: 90, radius: 140, color: 'rgba(255,255,255,0.08)' },
        { type: 'circle', x: 820, y: 180, radius: 90, color: 'rgba(255,255,255,0.06)' },
        { type: 'circle', x: -60, y: 480, radius: 180, color: 'rgba(0,0,0,0.15)' },
        // Accent lines
        { type: 'line', x1: 290, y1: 140, x2: 290, y2: 420, width: 3, color: 'rgba(255,255,255,0.25)' },
        // Footer glass panel
        { type: 'rect', x: 0, y: 440, width: 856, height: 100, color: 'rgba(0,0,0,0.2)', blur: 10, borderColor: 'rgba(255,255,255,0.15)', borderWidth: 1 },
        // Decorative corner accent
        { type: 'rect', x: 756, y: 0, width: 100, height: 100, color: 'rgba(255,255,255,0.12)', rotation: 45 },
        // QR code placeholder area
        { type: 'rect', x: 720, y: 360, width: 100, height: 100, color: 'rgba(255,255,255,0.15)', borderRadius: 12, borderColor: 'rgba(255,255,255,0.3)', borderWidth: 2 },
        // Small accent dots
        { type: 'circle', x: 650, y: 280, radius: 8, color: 'rgba(255,255,255,0.4)' },
        { type: 'circle', x: 680, y: 300, radius: 6, color: 'rgba(255,255,255,0.35)' },
        { type: 'circle', x: 670, y: 260, radius: 5, color: 'rgba(255,255,255,0.3)' }
      ]
    },
    photoConfig: {
      x: 40,
      y: 145,
      width: 200,
      height: 240,
      borderRadius: 16,
      borderColor: 'rgba(255,255,255,0.8)',
      borderWidth: 4,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowBlur: 20,
      shadowOffsetX: 0,
      shadowOffsetY: 8
    },
    defaultTexts: [
      {
        id: 'organization',
        label: 'Organization',
        content: 'APEX INNOVATIONS',
        x: 428,
        y: 45,
        fontSize: 32,
        fontFamily: 'Inter',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2,
        textShadow: '0px 2px 8px rgba(0,0,0,0.3)'
      },
      {
        id: 'tagline',
        label: 'Tagline',
        content: 'TECHNOLOGY & INNOVATION',
        x: 428,
        y: 85,
        fontSize: 13,
        fontFamily: 'Inter',
        color: 'rgba(255,255,255,0.85)',
        fontWeight: 'normal',
        textAlign: 'center',
        letterSpacing: 3
      },
      {
        id: 'name',
        label: 'Full Name',
        content: 'ALEXANDER WRIGHT',
        x: 320,
        y: 165,
        fontSize: 40,
        fontFamily: 'Inter',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1,
        textShadow: '0px 2px 6px rgba(0,0,0,0.4)'
      },
      {
        id: 'designation',
        label: 'Designation',
        content: 'Senior Software Architect',
        x: 320,
        y: 215,
        fontSize: 22,
        fontFamily: 'Inter',
        color: '#E0E7FF',
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 0.5
      },
      {
        id: 'department',
        label: 'Department',
        content: 'Engineering & Development',
        x: 320,
        y: 250,
        fontSize: 18,
        fontFamily: 'Inter',
        color: '#C7D2FE',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'employeeId',
        label: 'Employee ID',
        content: 'EMP-A2024-8547',
        x: 320,
        y: 295,
        fontSize: 21,
        fontFamily: 'JetBrains Mono',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1
      },
      {
        id: 'email',
        label: 'Email',
        content: 'alexander.wright@apex.com',
        x: 320,
        y: 335,
        fontSize: 16,
        fontFamily: 'Inter',
        color: '#DDD6FE',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'phone',
        label: 'Phone',
        content: '+91 98765 43210',
        x: 320,
        y: 365,
        fontSize: 16,
        fontFamily: 'Inter',
        color: '#DDD6FE',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'validUntil',
        label: 'Valid Until',
        content: 'Valid Until: December 2026',
        x: 428,
        y: 485,
        fontSize: 15,
        fontFamily: 'Inter',
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.5
      }
    ]
  },
  {
    id: 'template2',
    name: 'Emerald Elite',
    width: 856,
    height: 540,
    background: 'linear-gradient(135deg, #059669 0%, #10B981 40%, #34D399 100%)',
    hasPhoto: true,
    hasPattern: true,
    pattern: {
      type: 'organic-waves',
      elements: [
        // Main sidebar with glass effect
        { type: 'rect', x: 0, y: 0, width: 300, height: 540, color: 'rgba(0,0,0,0.22)', blur: 18 },
        // Top accent bar
        { type: 'rect', x: 0, y: 0, width: 856, height: 100, color: 'rgba(255,255,255,0.12)', blur: 15, borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1 },
        // Organic circle decorations
        { type: 'circle', x: -80, y: 270, radius: 220, color: 'rgba(255,255,255,0.06)' },
        { type: 'circle', x: 150, y: -50, radius: 180, color: 'rgba(0,0,0,0.08)' },
        { type: 'circle', x: 800, y: 120, radius: 160, color: 'rgba(255,255,255,0.1)' },
        { type: 'circle', x: 750, y: 400, radius: 200, color: 'rgba(0,0,0,0.12)' },
        { type: 'circle', x: 900, y: 300, radius: 140, color: 'rgba(255,255,255,0.08)' },
        // Decorative wave line
        { type: 'rect', x: 310, y: 0, width: 4, height: 540, color: 'rgba(255,255,255,0.25)' },
        // Bottom bar with glass effect
        { type: 'rect', x: 0, y: 450, width: 856, height: 90, color: 'rgba(0,0,0,0.18)', blur: 12, borderColor: 'rgba(255,255,255,0.18)', borderWidth: 1 },
        // Company badge area
        { type: 'circle', x: 770, y: 380, radius: 55, color: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: 3 },
        // Decorative corner elements
        { type: 'rect', x: 800, y: -30, width: 120, height: 120, rotation: 30, color: 'rgba(255,255,255,0.1)' },
        // Small accent elements
        { type: 'circle', x: 640, y: 290, radius: 10, color: 'rgba(255,255,255,0.45)' },
        { type: 'circle', x: 675, y: 270, radius: 7, color: 'rgba(255,255,255,0.4)' },
        { type: 'circle', x: 660, y: 315, radius: 6, color: 'rgba(255,255,255,0.35)' }
      ]
    },
    photoConfig: {
      x: 40,
      y: 140,
      width: 220,
      height: 260,
      borderRadius: 20,
      borderColor: 'rgba(255,255,255,0.85)',
      borderWidth: 5,
      shadowColor: 'rgba(0,0,0,0.35)',
      shadowBlur: 24,
      shadowOffsetX: 0,
      shadowOffsetY: 10
    },
    defaultTexts: [
      {
        id: 'organization',
        label: 'Organization',
        content: 'VERDANT SOLUTIONS',
        x: 578,
        y: 38,
        fontSize: 34,
        fontFamily: 'Poppins',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2.5,
        textShadow: '0px 3px 10px rgba(0,0,0,0.35)'
      },
      {
        id: 'tagline',
        label: 'Tagline',
        content: 'SUSTAINABLE • INNOVATIVE • GLOBAL',
        x: 578,
        y: 75,
        fontSize: 12,
        fontFamily: 'Poppins',
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 2
      },
      {
        id: 'name',
        label: 'Full Name',
        content: 'SOPHIA MARTINEZ',
        x: 340,
        y: 165,
        fontSize: 42,
        fontFamily: 'Poppins',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.2,
        textShadow: '0px 2px 8px rgba(0,0,0,0.4)'
      },
      {
        id: 'designation',
        label: 'Designation',
        content: 'Chief Product Officer',
        x: 340,
        y: 220,
        fontSize: 24,
        fontFamily: 'Poppins',
        color: '#D1FAE5',
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 0.8
      },
      {
        id: 'department',
        label: 'Department',
        content: 'Product Strategy & Innovation',
        x: 340,
        y: 258,
        fontSize: 18,
        fontFamily: 'Poppins',
        color: '#A7F3D0',
        fontWeight: 'normal',
        textAlign: 'left',
        letterSpacing: 0.3
      },
      {
        id: 'employeeId',
        label: 'Employee ID',
        content: 'VS-2024-PRD-9182',
        x: 340,
        y: 305,
        fontSize: 20,
        fontFamily: 'JetBrains Mono',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.2
      },
      {
        id: 'email',
        label: 'Email',
        content: 'sophia.martinez@verdant.com',
        x: 340,
        y: 345,
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#D1FAE5',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'phone',
        label: 'Phone',
        content: '+91 87654 32109',
        x: 340,
        y: 375,
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#D1FAE5',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'location',
        label: 'Location',
        content: 'Mumbai Office',
        x: 340,
        y: 405,
        fontSize: 15,
        fontFamily: 'Poppins',
        color: '#A7F3D0',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'validUntil',
        label: 'Valid Until',
        content: 'Issued: Jan 2024 | Valid Through: Dec 2026',
        x: 528,
        y: 488,
        fontSize: 14,
        fontFamily: 'Poppins',
        color: 'rgba(255,255,255,0.95)',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.5
      }
    ]
  },
  {
    id: 'template3',
    name: 'Crimson Executive',
    width: 856,
    height: 540,
    background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 40%, #F97316 100%)',
    hasPhoto: true,
    hasPattern: true,
    pattern: {
      type: 'angular-modern',
      elements: [
        // Diagonal accent panels
        { type: 'rect', x: -100, y: -100, width: 450, height: 750, rotation: 12, color: 'rgba(0,0,0,0.18)' },
        { type: 'rect', x: -80, y: -80, width: 420, height: 720, rotation: 12, color: 'rgba(255,255,255,0.08)', blur: 10 },
        // Header glass panel
        { type: 'rect', x: 0, y: 0, width: 856, height: 110, color: 'rgba(255,255,255,0.12)', blur: 20, borderColor: 'rgba(255,255,255,0.25)', borderWidth: 1 },
        // Decorative circles
        { type: 'circle', x: 780, y: 80, radius: 130, color: 'rgba(255,255,255,0.12)' },
        { type: 'circle', x: 850, y: 480, radius: 150, color: 'rgba(0,0,0,0.15)' },
        { type: 'circle', x: 720, y: 460, radius: 100, color: 'rgba(255,255,255,0.08)' },
        { type: 'circle', x: 900, y: 200, radius: 90, color: 'rgba(255,255,255,0.1)' },
        // Vertical accent line
        { type: 'rect', x: 295, y: 120, width: 3, height: 320, color: 'rgba(255,255,255,0.3)' },
        // Footer panel with glass effect
        { type: 'rect', x: 0, y: 445, width: 856, height: 95, color: 'rgba(0,0,0,0.2)', blur: 15, borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1 },
        // Security badge area
        { type: 'rect', x: 690, y: 340, width: 130, height: 80, borderRadius: 16, color: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.35)', borderWidth: 2 },
        // Corner accent elements
        { type: 'rect', x: 750, y: -40, width: 150, height: 150, rotation: 45, color: 'rgba(255,255,255,0.12)' },
        { type: 'rect', x: -50, y: 440, width: 120, height: 120, rotation: 25, color: 'rgba(0,0,0,0.15)' },
        // Decorative dots pattern
        { type: 'circle', x: 620, y: 260, radius: 9, color: 'rgba(255,255,255,0.5)' },
        { type: 'circle', x: 655, y: 285, radius: 7, color: 'rgba(255,255,255,0.45)' },
        { type: 'circle', x: 640, y: 235, radius: 6, color: 'rgba(255,255,255,0.4)' },
        { type: 'circle', x: 670, y: 250, radius: 5, color: 'rgba(255,255,255,0.35)' }
      ]
    },
    photoConfig: {
      x: 35,
      y: 135,
      width: 220,
      height: 265,
      borderRadius: 18,
      borderColor: 'rgba(255,255,255,0.9)',
      borderWidth: 5,
      shadowColor: 'rgba(0,0,0,0.4)',
      shadowBlur: 28,
      shadowOffsetX: 0,
      shadowOffsetY: 12
    },
    defaultTexts: [
      {
        id: 'organization',
        label: 'Organization',
        content: 'PINNACLE ENTERPRISES',
        x: 428,
        y: 40,
        fontSize: 33,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 3,
        textShadow: '0px 3px 12px rgba(0,0,0,0.4)'
      },
      {
        id: 'tagline',
        label: 'Tagline',
        content: 'EXCELLENCE • INTEGRITY • LEADERSHIP',
        x: 428,
        y: 78,
        fontSize: 12,
        fontFamily: 'Montserrat',
        color: 'rgba(255,255,255,0.92)',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 2.5
      },
      {
        id: 'name',
        label: 'Full Name',
        content: 'MICHAEL ANDERSON',
        x: 325,
        y: 162,
        fontSize: 41,
        fontFamily: 'Montserrat',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.5,
        textShadow: '0px 2px 10px rgba(0,0,0,0.45)'
      },
      {
        id: 'designation',
        label: 'Designation',
        content: 'Executive Vice President',
        x: 325,
        y: 216,
        fontSize: 23,
        fontFamily: 'Montserrat',
        color: '#FEE2E2',
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 0.7
      },
      {
        id: 'department',
        label: 'Department',
        content: 'Operations & Strategy',
        x: 325,
        y: 253,
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: '#FECACA',
        fontWeight: '500',
        textAlign: 'left',
        letterSpacing: 0.5
      },
      {
        id: 'employeeId',
        label: 'Employee ID',
        content: 'PIN-EVP-2024-4756',
        x: 325,
        y: 300,
        fontSize: 20,
        fontFamily: 'JetBrains Mono',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.3
      },
      {
        id: 'email',
        label: 'Email',
        content: 'michael.anderson@pinnacle.com',
        x: 325,
        y: 342,
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#FEE2E2',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'phone',
        label: 'Phone',
        content: '+91 76543 21098',
        x: 325,
        y: 372,
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#FEE2E2',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'location',
        label: 'Location',
        content: 'Corporate HQ - Delhi',
        x: 325,
        y: 402,
        fontSize: 15,
        fontFamily: 'Montserrat',
        color: '#FECACA',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'validUntil',
        label: 'Valid Until',
        content: 'Authorization Valid: 2024-2026 | Level: Executive',
        x: 428,
        y: 488,
        fontSize: 13,
        fontFamily: 'Montserrat',
        color: 'rgba(255,255,255,0.95)',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.8
      }
    ]
  },
  {
    id: 'template4',
    name: 'Midnight Premium',
    width: 856,
    height: 540,
    background: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #475569 100%)',
    hasPhoto: true,
    hasPattern: true,
    pattern: {
      type: 'luxury-minimal',
      elements: [
        // Left glass panel
        { type: 'rect', x: 0, y: 0, width: 290, height: 540, color: 'rgba(0,0,0,0.3)', blur: 12 },
        // Gold accent top bar
        { type: 'rect', x: 0, y: 0, width: 856, height: 8, color: 'rgba(251,191,36,0.8)' },
        { type: 'rect', x: 0, y: 0, width: 856, height: 95, color: 'rgba(255,255,255,0.05)', blur: 15 },
        // Elegant circle decorations
        { type: 'circle', x: 800, y: 90, radius: 120, color: 'rgba(251,191,36,0.12)' },
        { type: 'circle', x: 850, y: 450, radius: 140, color: 'rgba(251,191,36,0.08)' },
        { type: 'circle', x: -70, y: 270, radius: 200, color: 'rgba(255,255,255,0.03)' },
        // Gold divider line
        { type: 'line', x1: 300, y1: 110, x2: 300, y2: 430, width: 2, color: 'rgba(251,191,36,0.5)' },
        // Bottom accent
        { type: 'rect', x: 0, y: 532, width: 856, height: 8, color: 'rgba(251,191,36,0.8)' },
        { type: 'rect', x: 0, y: 445, width: 856, height: 95, color: 'rgba(0,0,0,0.25)', blur: 10 },
        // Premium badge area
        { type: 'circle', x: 750, y: 370, radius: 60, color: 'rgba(251,191,36,0.15)', borderColor: 'rgba(251,191,36,0.6)', borderWidth: 3 },
        // Corner accents
        { type: 'rect', x: 780, y: -20, width: 100, height: 100, rotation: 45, color: 'rgba(251,191,36,0.1)' },
        // Subtle pattern elements
        { type: 'circle', x: 630, y: 280, radius: 8, color: 'rgba(251,191,36,0.4)' },
        { type: 'circle', x: 660, y: 300, radius: 6, color: 'rgba(251,191,36,0.35)' },
        { type: 'circle', x: 645, y: 260, radius: 5, color: 'rgba(251,191,36,0.3)' }
      ]
    },
    photoConfig: {
      x: 40,
      y: 140,
      width: 210,
      height: 255,
      borderRadius: 16,
      borderColor: 'rgba(251,191,36,0.9)',
      borderWidth: 4,
      shadowColor: 'rgba(251,191,36,0.3)',
      shadowBlur: 20,
      shadowOffsetX: 0,
      shadowOffsetY: 8
    },
    defaultTexts: [
      {
        id: 'organization',
        label: 'Organization',
        content: 'PRESTIGE CORPORATION',
        x: 578,
        y: 38,
        fontSize: 32,
        fontFamily: 'Playfair Display',
        color: '#FCD34D',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 3,
        textShadow: '0px 2px 10px rgba(251,191,36,0.4)'
      },
      {
        id: 'tagline',
        label: 'Tagline',
        content: 'PREMIUM • TRUSTED • DISTINGUISHED',
        x: 578,
        y: 72,
        fontSize: 11,
        fontFamily: 'Playfair Display',
        color: '#FDE68A',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 2.5
      },
      {
        id: 'name',
        label: 'Full Name',
        content: 'VICTORIA BLAKE',
        x: 330,
        y: 160,
        fontSize: 40,
        fontFamily: 'Playfair Display',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.8,
        textShadow: '0px 2px 8px rgba(0,0,0,0.5)'
      },
      {
        id: 'designation',
        label: 'Designation',
        content: 'Director of Operations',
        x: 330,
        y: 213,
        fontSize: 23,
        fontFamily: 'Playfair Display',
        color: '#FDE68A',
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 0.8
      },
      {
        id: 'department',
        label: 'Department',
        content: 'Corporate Management',
        x: 330,
        y: 250,
        fontSize: 18,
        fontFamily: 'Playfair Display',
        color: '#E2E8F0',
        fontWeight: 'normal',
        textAlign: 'left',
        letterSpacing: 0.5
      },
      {
        id: 'employeeId',
        label: 'Employee ID',
        content: 'PRS-DIR-2024-3892',
        x: 330,
        y: 295,
        fontSize: 20,
        fontFamily: 'JetBrains Mono',
        color: '#FCD34D',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.2
      },
      {
        id: 'email',
        label: 'Email',
        content: 'victoria.blake@prestige.com',
        x: 330,
        y: 335,
        fontSize: 16,
        fontFamily: 'Playfair Display',
        color: '#F1F5F9',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'phone',
        label: 'Phone',
        content: '+91 95432 10987',
        x: 330,
        y: 365,
        fontSize: 16,
        fontFamily: 'Playfair Display',
        color: '#F1F5F9',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'location',
        label: 'Location',
        content: 'Bangalore Executive Tower',
        x: 330,
        y: 395,
        fontSize: 15,
        fontFamily: 'Playfair Display',
        color: '#CBD5E1',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'validUntil',
        label: 'Valid Until',
        content: 'Premium Access | Valid: 2024-2027',
        x: 528,
        y: 488,
        fontSize: 14,
        fontFamily: 'Playfair Display',
        color: '#FDE68A',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 1
      }
    ]
  },
  {
    id: 'template5',
    name: 'Ocean Professional',
    width: 856,
    height: 540,
    background: 'linear-gradient(135deg, #0369A1 0%, #0284C7 40%, #06B6D4 100%)',
    hasPhoto: true,
    hasPattern: true,
    pattern: {
      type: 'fluid-waves',
      elements: [
        // Sidebar panel
        { type: 'rect', x: 0, y: 0, width: 285, height: 540, color: 'rgba(0,0,0,0.2)', blur: 15 },
        // Wave-like top section
        { type: 'rect', x: 0, y: 0, width: 856, height: 105, color: 'rgba(255,255,255,0.1)', blur: 18 },
        // Organic circles
        { type: 'circle', x: 780, y: 100, radius: 135, color: 'rgba(255,255,255,0.1)' },
        { type: 'circle', x: 850, y: 180, radius: 95, color: 'rgba(255,255,255,0.07)' },
        { type: 'circle', x: 800, y: 420, radius: 170, color: 'rgba(0,0,0,0.12)' },
        { type: 'circle', x: -90, y: 280, radius: 210, color: 'rgba(255,255,255,0.05)' },
        { type: 'circle', x: 120, y: -40, radius: 150, color: 'rgba(0,0,0,0.08)' },
        // Fluid divider
        { type: 'line', x1: 295, y1: 115, x2: 295, y2: 425, width: 3, color: 'rgba(255,255,255,0.28)' },
        // Bottom wave section
        { type: 'rect', x: 0, y: 448, width: 856, height: 92, color: 'rgba(0,0,0,0.2)', blur: 12 },
        // Badge area
        { type: 'rect', x: 710, y: 350, width: 115, height: 75, borderRadius: 14, color: 'rgba(255,255,255,0.18)', borderColor: 'rgba(255,255,255,0.35)', borderWidth: 2 },
        // Decorative elements
        { type: 'circle', x: 650, y: 275, radius: 9, color: 'rgba(255,255,255,0.45)' },
        { type: 'circle', x: 680, y: 295, radius: 7, color: 'rgba(255,255,255,0.4)' },
        { type: 'circle', x: 665, y: 250, radius: 6, color: 'rgba(255,255,255,0.35)' }
      ]
    },
    photoConfig: {
      x: 38,
      y: 138,
      width: 210,
      height: 255,
      borderRadius: 18,
      borderColor: 'rgba(255,255,255,0.88)',
      borderWidth: 5,
      shadowColor: 'rgba(0,0,0,0.35)',
      shadowBlur: 22,
      shadowOffsetX: 0,
      shadowOffsetY: 10
    },
    defaultTexts: [
      {
        id: 'organization',
        label: 'Organization',
        content: 'AQUA DYNAMICS INC',
        x: 570,
        y: 40,
        fontSize: 34,
        fontFamily: 'Roboto',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2.8,
        textShadow: '0px 3px 10px rgba(0,0,0,0.35)'
      },
      {
        id: 'tagline',
        label: 'Tagline',
        content: 'FLUID • DYNAMIC • PROGRESSIVE',
        x: 570,
        y: 76,
        fontSize: 12,
        fontFamily: 'Roboto',
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 2.2
      },
      {
        id: 'name',
        label: 'Full Name',
        content: 'DAVID CHEN',
        x: 325,
        y: 163,
        fontSize: 42,
        fontFamily: 'Roboto',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.5,
        textShadow: '0px 2px 8px rgba(0,0,0,0.4)'
      },
      {
        id: 'designation',
        label: 'Designation',
        content: 'Technology Lead',
        x: 325,
        y: 218,
        fontSize: 24,
        fontFamily: 'Roboto',
        color: '#CFFAFE',
        fontWeight: '600',
        textAlign: 'left',
        letterSpacing: 0.7
      },
      {
        id: 'department',
        label: 'Department',
        content: 'Research & Development',
        x: 325,
        y: 255,
        fontSize: 18,
        fontFamily: 'Roboto',
        color: '#A5F3FC',
        fontWeight: 'normal',
        textAlign: 'left',
        letterSpacing: 0.4
      },
      {
        id: 'employeeId',
        label: 'Employee ID',
        content: 'AQD-TL-2024-6573',
        x: 325,
        y: 300,
        fontSize: 20,
        fontFamily: 'JetBrains Mono',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 1.3
      },
      {
        id: 'email',
        label: 'Email',
        content: 'david.chen@aquadynamics.com',
        x: 325,
        y: 340,
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#E0F2FE',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'phone',
        label: 'Phone',
        content: '+91 89012 34567',
        x: 325,
        y: 370,
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#E0F2FE',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'location',
        label: 'Location',
        content: 'Hyderabad Tech Park',
        x: 325,
        y: 400,
        fontSize: 15,
        fontFamily: 'Roboto',
        color: '#CFFAFE',
        fontWeight: 'normal',
        textAlign: 'left'
      },
      {
        id: 'validUntil',
        label: 'Valid Until',
        content: 'Active Through: December 2026',
        x: 528,
        y: 488,
        fontSize: 14,
        fontFamily: 'Roboto',
        color: 'rgba(255,255,255,0.95)',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.7
      }
    ]
  }
];

export const fontFamilies = [
  'Inter',
  'Poppins',
  'Montserrat',
  'Roboto',
  'Playfair Display',
  'JetBrains Mono',
  'Space Grotesk',
  'DM Sans',
  'Sora',
  'Outfit'
];

export const colors = [
  '#ffffff',
  '#000000',
  '#4F46E5',
  '#7C3AED',
  '#EC4899',
  '#EF4444',
  '#F97316',
  '#10B981',
  '#06B6D4',
  '#0EA5E9',
  '#8B5CF6',
  '#F59E0B',
  '#FCD34D',
  '#A855F7',
  '#14B8A6',
  '#6366F1',
  '#E0E7FF',
  '#FEE2E2',
  '#D1FAE5',
  '#CFFAFE'
];
