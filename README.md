# 🎫ID Cardz.io - Professional ID Card Generator

A modern, feature-rich web application for creating customizable professional ID cards with live preview and export capabilities. Built with React, Vite, and Tailwind CSS.

![ID Card Generator](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality
- **📸 Photo Upload**: Add passport-style photos with professional borders
- **🎨 Multiple Templates**: 3 pre-designed gradient templates (Corporate Blue, Modern Green, Elegant Red)
- **🖼️ Custom Templates**: Upload your own background images
- **✍️ Complete ID Fields**: 
  - Organization Name
  - Full Name
  - Designation
  - Department
  - Employee ID
  - Email Address
  - Phone Number

### Advanced Customization
- **🎯 Interactive Positioning**: Drag-and-drop text elements anywhere on the card
- **🔤 Font Customization**: 8 font families to choose from
- **🎨 Color Palette**: 12 preset colors for text customization
- **📏 Font Sizing**: Adjustable font size (12-48px) with live preview
- **⚡ Text Styling**: Font weight (Normal, Bold, Light) and alignment (Left, Center, Right)
- **👁️ Live Preview**: Real-time updates as you make changes

### Export Options
- **PNG Export**: High-resolution image format
- **JPG Export**: Compressed image format
- **PDF Export**: Print-ready format (85.6mm × 54mm standard ID card size)

## 🚀 Technologies Used

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Styling**: Tailwind CSS 3.3.6
- **Drag & Drop**: react-draggable 4.4.6
- **Canvas Rendering**: HTML5 Canvas API
- **PDF Generation**: jsPDF 2.5.1
- **Image Processing**: html2canvas 1.4.1

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/id-card-generator.git
   cd id-card-generator
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Install required packages**
   ```
   npm install react-draggable html2canvas jspdf
   npm install -D tailwindcss postcss autoprefixer
   ```

4. **Initialize Tailwind CSS** (if not already configured)
   ```
   npx tailwindcss init -p
   ```

5. **Start development server**
   ```
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎯 Usage Guide

### Step 1: Select a Template
- Choose from 3 predefined templates or upload your custom background
- Each template has a unique gradient design and layout

### Step 2: Upload Photo
- Click on "Upload Photo" button in the Photo Upload section
- Select a passport-style photo (JPG/PNG)
- Photo appears in the left section of the ID card with professional borders

### Step 3: Edit Fields
- Select any text field by clicking the category buttons:
  - **Organization Details**: Company/Institution name
  - **Personal Information**: Name, Designation, Department
  - **Contact & ID**: Employee ID, Email, Phone

### Step 4: Customize Appearance
- **Edit Content**: Type new text in the content field
- **Adjust Position**: Use X/Y position controls or drag text directly on the card
- **Change Font**: Select from 8 font families
- **Set Color**: Choose from 12 preset colors
- **Resize Text**: Use the slider to adjust font size
- **Style Text**: Modify font weight and alignment

### Step 5: Export
- **PNG**: For digital use and sharing
- **JPG**: For smaller file sizes
- **PDF**: For professional printing (standard ID card dimensions)

## 📁 Project Structure

```
id-card-generator/
├── src/
│   ├── components/
│   │   ├── TemplateSelector.jsx    # Template selection component
│   │   ├── PhotoUpload.jsx         # Photo upload component
│   │   ├── TextEditor.jsx          # Text editing controls
│   │   ├── IDCardCanvas.jsx        # Live preview canvas
│   │   └── ExportControls.jsx      # Export functionality
│   ├── templates/
│   │   └── defaultTemplates.js     # Template configurations
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   ├── index.css                   # Global styles
│   └── App.css                     # Component styles
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Adding New Templates

Edit `src/templates/defaultTemplates.js`:

```
{
  id: 'template4',
  name: 'Your Template Name',
  width: 856,
  height: 540,
  background: 'linear-gradient(135deg, #color1 0%, #color2 100%)',
  hasPhoto: true,
  photoConfig: {
    x: 50,
    y: 120,
    width: 180,
    height: 220,
    borderRadius: 8,
    borderColor: '#ffffff',
    borderWidth: 4
  },
  defaultTexts: [
    // Add your text fields here
  ]
}
```

### Adding Custom Fonts

Edit `src/templates/defaultTemplates.js`:

```
export const fontFamilies = [
  'Arial',
  'Georgia',
  'Your Custom Font',
  // Add more fonts
];
```

### Adding Custom Colors

```
export const colors = [
  '#ffffff',
  '#000000',
  '#yourcolor',
  // Add more colors
];
```

## 🖥️ Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🐛 Known Issues

- Custom fonts may require additional configuration
- Large image uploads (>5MB) might slow down preview rendering
- PDF export works best in Chrome and Firefox

## 🔮 Future Enhancements

- [ ] Add QR code generation
- [ ] Bulk ID card generation from CSV
- [ ] More template options
- [ ] Barcode support
- [ ] Multiple card layouts (vertical/horizontal)
- [ ] Cloud storage integration
- [ ] Print multiple cards per page
- [ ] Template marketplace

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhishek Kumar**
- GitHub: [@Abhishekk3107](https://github.com/Abhishekk3107)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for blazing fast build tool
- Tailwind CSS for utility-first styling
- html2canvas and jsPDF for export functionality
- All contributors and users of this project

## 📞 Support

For support, email ak3012498@gmail.com or open an issue in the GitHub repository.

---

⭐ If you found this project helpful, please give it a star!

Made with ❤️ using React and Vite
```
