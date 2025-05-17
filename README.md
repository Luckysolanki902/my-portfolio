# Lucky Solanki - Hacker-Themed Portfolio

A dynamic, hacker-themed portfolio website built with Next.js, Framer Motion, and GSAP animations.

## Features

- 🖥️ Terminal-style command interface with OpenAI integration
- 💻 Computer monitor display for showcasing projects
- 🔮 Glitch animations and scanlines for cyberpunk aesthetic
- 📱 Responsive design for all device sizes
- ⚡ Fast performance with Next.js App Router

## Technologies Used

- **Next.js**: React framework with App Router
- **Framer Motion**: For smooth animations and transitions
- **GSAP**: For timeline-driven animations and effects
- **OpenAI API**: For AI-powered terminal interactions
- **CSS Modules**: For component-scoped styling

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio.

## Project Structure

- `/src/app/components`: UI components organized by feature
  - `/Layout`: Header, Footer, and main layout components
  - `/Terminal`: Interactive terminal with command processing
  - `/ComputerMonitor`: Project showcase in a computer monitor UI
  - `/Hero`, `/About`, `/Projects`, `/Contact`: Main page sections
- `/public/projects`: Project preview images
- `/src/app/api`: API routes including OpenAI integration

## Terminal Commands

The interactive terminal supports the following commands:

- `help`: Show all available commands
- `about`: Display information about Lucky Solanki
- `skills`: List technical skills
- `projects`: Show project portfolio
- `contact`: Display contact information
- `ai`: Toggle AI-powered conversation mode
- `clear`: Clear the terminal screen

## Environment Setup

Create a `.env.local` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key
```

## License

MIT License
