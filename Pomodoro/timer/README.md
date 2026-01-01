# Pomodoro Timer App 🍅

A beautiful, desktop Pomodoro timer application built with React, TypeScript, and Electron. This project was created as a learning exercise to practice building desktop applications with modern web technologies.

## ✨ Features

- **Work & Break Modes**: Switch between 25-minute work sessions and 5-minute breaks
- **Visual Timer**: Large, easy-to-read countdown timer
- **Custom Images**: Beautiful pixel-art style UI with custom images for work/break modes
- **Animated Break GIF**: Fun animation during break sessions
- **Sound Notification**: Audio alert when timer completes
- **System Tray Integration**: Minimize to system tray and control from there
- **Frameless Window**: Clean, modern frameless design
- **Encouragement Messages**: Rotating motivational messages
- **Non-Resizable Window**: Fixed window size for consistent experience

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Electron** - Desktop application framework
- **CSS3** - Styling with custom animations

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Pomodoro/timer
```

2. Install dependencies:
```bash
npm install
```

3. Build the React app:
```bash
npm run build
```

4. Run the Electron app:
```bash
npm run electron
```

## 🚀 Development

To run in development mode:

1. Start the React development server:
```bash
npm start
```

2. In a separate terminal, run Electron:
```bash
npm run electron
```

## 📁 Project Structure

```
timer/
├── public/
│   ├── electron.js          # Electron main process
│   └── logo.png              # Tray icon
├── src/
│   ├── assets/               # Images, sounds, fonts
│   │   ├── bg.png           # Background image
│   │   ├── work.png         # Work mode button
│   │   ├── break-clicked.png # Break mode button
│   │   ├── break.gif        # Break animation
│   │   ├── play.png         # Play button
│   │   ├── restart.png      # Restart button
│   │   ├── closeBtn.png     # Close button
│   │   ├── ding.mp3         # Timer completion sound
│   │   └── Retrograde-Regular.otf # Custom font
│   ├── App.tsx              # Main React component
│   ├── App.css              # Styles
│   └── index.tsx            # React entry point
└── package.json
```

## 🎮 Usage

1. **Start a Work Session**: Click the "Work" button and press play
2. **Take a Break**: Click the "Break" button and press play
3. **Pause/Resume**: Click the play/restart button to pause or resume
4. **System Tray**: 
   - Right-click the tray icon for menu options
   - Double-click to show/hide the window
   - Use "Quit" to fully exit the application

## 🎨 Design Notes

- The UI features a pixel-art aesthetic with custom images
- Background image can be customized in `src/assets/bg.png`
- All button images can be replaced with your own designs
- Break animation GIF can be swapped in `src/assets/break.gif`

## 📝 Learning Notes

This project was built as a learning exercise following a YouTube tutorial, with custom design tweaks and additional features added:
- Custom image-based UI instead of text buttons
- System tray integration
- Sound notifications
- Frameless window design
- Custom styling and animations

## 🙏 Credits & Resources

- **Tutorial**: Based on a YouTube tutorial (add link if you have it)
- **Break Animation**: GIF from [Dribbble](https://dribbble.com) (add specific link if available)
- **Font**: Retrograde-Regular (custom font included in assets)

## 🔮 Future Improvements

- [ ] Add customizable timer durations
- [ ] Track daily Pomodoro sessions
- [ ] Add statistics/analytics
- [ ] Multiple timer presets
- [ ] Dark/light theme toggle
- [ ] Notification system for timer completion

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome!

---

**Note**: Remember to add your own custom images to the `src/assets/` folder to personalize the app!
