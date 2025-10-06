# Swaragama Training Center - Pure Frontend Guidelines

## 🎯 Aplikasi Overview
Website Swaragama Training Center adalah pure frontend application yang dibangun dengan:
- React 18 + TypeScript
- Tailwind CSS v4 
- Motion/React untuk animasi
- **TANPA dependency backend apapun**

## 🎨 Design System
- **Palet Warna**: Kuning (#ffc107), Hitam (#1a1a1a), Putih (#ffffff)
- **Brand Identity**: Logo modern dengan huruf "S" besar + text "SWARAGAMA TRAINING CENTER"
- **Style**: Fresh, modern, professional

## 🚀 Performance Guidelines
- Gunakan lazy loading untuk komponen besar
- Optimasi animasi dengan `will-change` dan `transform3d`
- Implementasi smooth scrolling dengan `scroll-behavior: smooth`

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navbar adaptif dengan logo switching berdasarkan scroll dan theme

## 🔧 Development Rules
- Tidak ada integrasi backend/database
- Semua data menggunakan mock/static data
- Fokus pada user experience dan performance
- Hindari dependency yang tidak perlu

## ⚡ Features
- Dark/Light mode toggle
- Smooth animations dengan Motion/React
- Interactive navigation dengan active section tracking
- Logo dinamis (logo baru untuk hero/dark mode, logo lama untuk scroll)
- Responsive hero section dengan gradient background
- Interactive tabs di About section
- Service filtering dengan kategori
- Professional trainer showcase
- Article showcase dengan modern layout