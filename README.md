<h1 align="center">Hi 👋, I'm Eduardo Form TlalTec</h1>
<h3 align="center">A Passionate Software Developer From Mexico</h3>

## 📱 TlalTec App

### Description
Mobile application powered by a powerful SE and efficient artificial vision model that allows preventing, detecting and treating diseases and pests in avocado crops.

### 🚀 Features
- Expert system capable of detecting more than 20 pests and diseases
- Artificial Vision capable of detecting different pests and diseases with 80% accuracy
- History of diseases managed by orchard

### 📋 Prerequisites
- Node.js (version 20.10.0 or higher)
- Expo CLI
- iOS/Android simulator or physical device

### 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/Joseveji96/TlalTecApp.git
```

2. Install dependencies
```bash
cd TlalTecApp
npm install
```

3. **Configure Environment Variables**

Create a new file `src/services/constants.ts` with the following content:

```typescript
// src/services/constants.ts

// Replace YourIP with your local IP address (e.g., 192.168.1.100)
export const base_url = "http://YourIP:3000/api/v1/";
export const cameraIP = "http://YourIP:5000/detect_plagas";

// OpenWeather API endpoints
export const forecast_url = "https://api.openweathermap.org/data/2.5/forecast?";
export const current_url = "https://api.openweathermap.org/data/2.5/weather?";
```

Example with actual IP and Random API_KEY:
```typescript
// Example with actual IP & APIKEY = 33333
export const base_url = "http://192.168.1.100:3000/api/v1/";
export const cameraIP = "http://192.168.1.100:5000/detect_plagas";
export const forecast_url = "https://api.openweathermap.org/data/2.5/forecast?";
export const current_url = "https://api.openweathermap.org/data/2.5/weather?";
export const API_KEY = "zzzzzz"
```

> ⚠️ **Important Configuration Notes:**
> 
> - To find your IP address:
>   - **Windows**: Open CMD and type `ipconfig`
>   - **MacOS/Linux**: Open terminal and type `ifconfig` or `ip addr`
> - Make sure both your development machine and mobile device are on the same network
> - The ports (3000 and 5000) must match your backend services configuration
> - Do not use 'localhost' or '127.0.0.1' as these won't work with physical devices
> - The OpenWeather API endpoints are standard and don't necesitan modificación
> - Make sure you have an OpenWeather API key to use the weather services
> - Get your API key by registering at [OpenWeather](https://openweathermap.org/api)
> - Replace "zzzzzz" with your actual OpenWeather API key
> - The API key shown above is just an example and won't work

4. Start the development server
```bash
npx expo start
```

### 🔍 Troubleshooting
If you have connection issues:
- Check that your device and computer are on the same network
- Confirm that ports 3000 and 5000 are not blocked by your firewall
- Try pinging your IP from the mobile device
- If you use antivirus, check that it is not blocking connections
- Make sure that the backend services are running correctly

### 📱 Running the app

#### Using Expo Go
1. Download Expo Go app on your mobile device from:
   - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
   - [Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code from the terminal with:
   - iOS: Camera app
   - Android: Expo Go app

#### Using Simulators
- iOS: `npx expo run:ios`
- Android: `npx expo run:android`

### 🛠️ Built With
- React Native
- Expo
- TypeScript
- JavaScript

### 👥 Contributors
<table>
<tr>
    <td align="center">
        <a href="https://github.com/Angel66-dev">
            <img src="https://avatars.githubusercontent.com/u/146392781?v=4" width="100px;" alt="Angel Antonio"/><br />
            <sub><b>Angel Antonio</b></sub>
        </a><br />
       <a href="https://github.com/Luisel12">
            <img src="https://avatars.githubusercontent.com/u/101441032?v=4" width="100px;" alt="Luis Angel"/><br />
            <sub><b>Luis Angel</b></sub>
        </a><br />
        <sub></sub>
    </td>

</tr>
</table>


### 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### 📫 Contact
- 🔭 I'm currently working on **TlalTec Design**
- 📧 Email: joseveji96@gmail.com
- 💼 LinkedIn: www.linkedin.com/in/eduardovelazco96
- 🌐 Portfolio: on Development

### 🔧 Languages and Tools
<p align="left">
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
</a>
<a href="https://reactnative.dev/" target="_blank" rel="noreferrer">
<img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/>
</a>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
</a>
</p>

### 📝 License
This project is licensed under the [MIT License](LICENSE)