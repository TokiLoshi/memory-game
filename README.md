# 3D Memory Game

A classic memory matching game reimagined in 3D using Three.js and React. Test your memory while enjoying an immersive, atmospheric experience.

![Game Screenshot Placeholder](https://github.com/TokiLoshi/memory-game/blob/main/start.png)

## Features ⭐️

- 3D card matching gameplay
- Atmospheric environment with custom skybox
- Animated card flips and transitions
- Score tracking and game state management
- Custom AI-generated card designs

![Game Session](https://github.com/TokiLoshi/memory-game/blob/main/flipped.png)

## Live Demo 📸

Try it out: [Demo Link](https://memory-game-toki-loshi.vercel.app/)

## Built With 🛠️

- [React](https://reactjs.org/) - UI Framework
- [Three.js](https://threejs.org/) - 3D Graphics
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Drei](https://github.com/pmndrs/drei) - Useful helpers for R3F
- [React Spring](https://www.react-spring.dev/) - Animation library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [R3F-Perf](https://www.npmjs.com/package/r3f-perf) - Performance monitor

## Getting Started ⚡️

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/3d-memory-game.git
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

## Current Status

### Working Features ✅

- Full 3D environment with custom lighting and shadows
- Card matching mechanics
- Score tracking
- Atmospheric skybox (optimized JPEG version)
- Desktop browser compatibility

### Known Issues ⚠️

- Performance optimization needed for weaker devices

## Roadmap 🛣️

1. Mobile Support

   - Optimize asset loading for mobile devices

2. Performance Optimization

   - Implement asset compression
   - Add progressive loading
   - Optimize render cycles

3. Environment Enhancement
   - Explore HDR skybox implementation
   - Add ambient sound effects
   - Implement particle effects

## Assets and Attribution 🎨

![Game Session](https://github.com/TokiLoshi/memory-game/blob/main/play.png)

### Models

- [Small Table by Quaternius](https://poly.pizza/m/rAEBvfb1FT) (CC0)
- [Candle by Kay Lousberg](https://market.pmnd.rs/model/candle) (CC0)

### Graphics

- Skybox: Generated using [BlockadeLabs](https://skybox.blockadelabs.com)
- Card Textures: Generated with [Canva AI](https://www.canva.com)
- [Matcaps Source](https://github.com/nidorx/matcaps/tree/master)

## Implementation Notes 📝

### Technical Challenges

- Implementing proper loading states with Suspense
- Managing texture flips during animations
- Optimizing skybox file size while maintaining quality
- Handling mobile device performance

### Solutions Implemented

- Custom asset loader for better resource management
- Debounced loading screen updates
- Optimized texture loading sequence
- Memoized component renders

## Acknowledgments

### Inspiration

1. [GFG: Flip Card Game Tutorial](https://www.geeksforgeeks.org/build-a-flip-the-card-match-done-game-using-react/)
2. [Memory Game Implementation](https://javascript.plainenglish.io/building-a-card-memory-game-in-react-e6400b226b8f)
3. [R3F Multiplayer Card Game](https://github.com/wass08/r3f-multiplayer-pirate-card-game)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

# Feedback 🤝

This project was built as a learning exercise in React Three Fiber and 3D web development. If you have any suggestions, tips, or feedback about performance, code quality, or user experience, I'd love to hear them! Feel free to:

- Open an issue to discuss potential improvements
- Share your thoughts on mobile performance
- Suggest better ways to handle asset loading
- Point out bugs or problems you encounter

Your insights will help me learn and improve!

Models from [poly.pizza](https://poly.pizza) and Pmnd.rs Market
[Small Table by Quaternius](https://poly.pizza/m/rAEBvfb1FT) CC0
[Candle by Kay Lousberg](https://market.pmnd.rs/model/candle) CC0
Skybox generated using [BlockadeLabs](https://skybox.blockadelabs.com)
[Matcaps](https://github.com/nidorx/matcaps/tree/master)
Images were generated with AI On [Canva]().

# Resources and Inspiration:

1. https://www.geeksforgeeks.org/build-a-flip-the-card-match-done-game-using-react/
2. https://codesandbox.io/p/sandbox/memory-game-using-react-uyv1d?file=%2Fsrc%2Fcomponents%2FGame.js%3A44%2C14-45%2C6
3. https://www.geeksforgeeks.org/memory-game-from-scratch-using-react/
4. https://javascript.plainenglish.io/building-a-card-memory-game-in-react-e6400b226b8f
5. https://dev.to/shubhamreacts/build-a-card-memory-game-with-react-23dj
6. https://github.com/wass08/r3f-multiplayer-pirate-card-game
