# 📱 NoProxy: Anti-Proxy Attendance Automation System

> **Mission:** Eliminate proxy attendance using Geolocation, Wi-Fi SSID verification, and Dynamic TOTP Codes, packaged in a Cross-Platform Mobile App.

---

## 🏗 High-Level Architecture

**Type:** Hybrid Mobile App (PWA wrapped in Native Shell)
- **Frontend:** React (Web) wrapped with Capacitor (Android/iOS).
- **Backend:** FastAPI (Python) for high-performance async logic.
- **Database:** PostgreSQL for persistent relational data.
- **Realtime:** WebSockets for instant code updates and session status.

---

## 🛠 Tech Stack

### Frontend & Mobile Wrapper
- **Framework:** React (Vite) + Tailwind CSS
- **Mobile Engine:** Capacitor.js
- **State Management:** React Context API
- **Key Plugins:**
  - `@capacitor/geolocation` (GPS Coordinates)
  - `@capacitor/network` (Wi-Fi SSID/BSSID reading)
  - `@capacitor/device` (Unique Device UUID)
  - `capacitor-detect-mock-location` (Anti-Spoofing)

### Backend (API)
- **Language:** Python 3.10+
- **Framework:** FastAPI
- **Server:** Uvicorn (ASGI)
- **Auth:** OAuth2 (Google Workspace - `@pccoepune.org` restriction)

### Database & Storage
- **Primary DB:** PostgreSQL
- **ORM:** SQLAlchemy (Async)
- **Realtime Store:** Redis (Optional, for Pub/Sub) or In-Memory (for MVP)

---

## 🔐 Security & Anti-Cheat Mechanisms

### 1. The "Device Lock" (1-to-1 Binding)
- **Mechanism:** On first login, the server records the `device_uuid`.
- **Enforcement:** Subsequent logins checks against this ID. If `current_device != registered_device`, login is blocked.
- **Emergency:** One "Emergency Reset" allowed per month via# 📱 NoProxy: Anti-Proxy Attendance Automation System

> **Mission:** Eliminate proxy attendance using Geolocation, Wi-Fi SSID verification, and Dynamic TOTP Codes, packaged in a Cross-Platform Mobile App.

---

## 🏗 High-Level Architecture

**Type:** Hybrid Mobile App (PWA wrapped in Native Shell)
- **Frontend:** React (Web) wrapped with Capacitor (Android/iOS).
- **Backend:** FastAPI (Python) for high-performance async logic.
- **Database:** PostgreSQL for persistent relational data.
- **Realtime:** WebSockets for instant code updates and session status.

---

## 🛠 Tech Stack

### Frontend & Mobile Wrapper
- **Framework:** React (Vite) + Tailwind CSS
- **Mobile Engine:** Capacitor.js
- **State Management:** React Context API
- **Key Plugins:**
  - `@capacitor/geolocation` (GPS Coordinates)
  - `@capacitor/network` (Wi-Fi SSID/BSSID reading)
  - `@capacitor/device` (Unique Device UUID)
  - `capacitor-detect-mock-location` (Anti-Spoofing)

### Backend (API)
- **Language:** Python 3.10+
- **Framework:** FastAPI
- **Server:** Uvicorn (ASGI)
- **Auth:** OAuth2 (Google Workspace - `@pccoepune.org` restriction)

### Database & Storage
- **Primary DB:** PostgreSQL
- **ORM:** SQLAlchemy (Async)
- **Realtime Store:** Redis (Optional, for Pub/Sub) or In-Memory (for MVP)

---

## 🔐 Security & Anti-Cheat Mechanisms

### 1. The "Device Lock" (1-to-1 Binding)
- **Mechanism:** On first login, the server records the `device_uuid`.
- **Enforcement:** Subsequent logins checks against this ID. If `current_device != registered_device`, login is blocked.
- **Emergency:** One "Emergency Reset" allowed per month via