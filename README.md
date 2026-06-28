# Liquid Glass

**Beautiful liquid-like glassmorphism effect for React** with real-time displacement distortion.

A lightweight, performant, and fully customizable React component that creates a stunning liquid glass / fluid glassmorphism effect using SVG filters and canvas-generated displacement maps.

![Liquid Glass Preview](https://github.com/user-attachments/assets/9307852d-d7db-48f8-9038-14458df97051) 

---

## Features

- ✨ Real-time liquid distortion effect
- 🎨 Highly customizable (blur, contrast, displacement, elasticity, etc.)
- 📏 Fully responsive with ResizeObserver
- ⚡ Lightweight & performant (uses SVG Filter + Canvas)
- 🔧 Full styling control — style the container however you want
- 📦 TypeScript support
- 🌳 Tree-shakable
- ⚛️ React 18 & 19 compatible

---

## Installation

```bash
npm install @persian-caesar/liquid-glass
# or
yarn add @persian-caesar/liquid-glass
# or
pnpm add @persian-caesar/liquid-glass
```

---

## Quick Usage

```tsx
import { LiquidGlass } from '@persian-caesar/liquid-glass';

function App() {
  return (
    <LiquidGlass
      borderRadius={24}
      blur={0.3}
      className="w-full max-w-md p-8 text-white"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'none', // will be overridden by component
      }}
    >
      <h1 className="text-3xl font-bold mb-4">Hello Liquid Glass</h1>
      <p>Any content you want — fully stylable container.</p>
    </LiquidGlass>
  );
}
```

---

## Props

| Prop                | Type                  | Default | Description                        |
| ------------------- | --------------------- | ------- | ---------------------------------- |
| `borderRadius`      | `number`              | `20`    | Border radius in pixels            |
| `blur`              | `number`              | `0.25`  | Backdrop blur intensity            |
| `contrast`          | `number`              | `1.2`   | Contrast adjustment                |
| `brightness`        | `number`              | `1.05`  | Brightness adjustment              |
| `saturation`        | `number`              | `1.1`   | Saturation adjustment              |
| `shadowIntensity`   | `number`              | `0.25`  | Shadow strength (0 = disabled)     |
| `displacementScale` | `number`              | `1`     | Strength of liquid distortion      |
| `elasticity`        | `number`              | `0.6`   | How "liquid" the edges feel        |
| `className`         | `string`              | `""`    | Additional CSS classes             |
| `style`             | `React.CSSProperties` | `{}`    | Custom styles (overrides internal) |
| `as`                | `React.ElementType`   | `"div"` | Render as different HTML element   |
| `children`          | `React.ReactNode`     | -       | Content inside the glass           |
| `filterId`          | `string`              | auto    | Custom filter ID (advanced)        |

---

## Advanced Example

```tsx
<LiquidGlass
  borderRadius={32}
  blur={0.4}
  contrast={1.3}
  displacementScale={1.4}
  elasticity={0.75}
  shadowIntensity={0.15}
  className="min-h-[400px] flex items-center justify-center"
  style={{
    background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
    color: 'white',
  }}
>
  {/* Your content */}
</LiquidGlass>
```

---

## Requirements

- **React**: `^18.0.0 || ^19.0.0`
- **React DOM**: `^18.0.0 || ^19.0.0`
- Modern browser with support for:
  - `ResizeObserver`
  - SVG Filters (`feDisplacementMap`)
  - `backdrop-filter`

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).  
Older browsers will gracefully degrade to a simple glassmorphism look.

---

## How It Works

The component uses a combination of:
- Canvas to generate a dynamic displacement map
- SVG `<filter>` with `<feDisplacementMap>`
- `backdrop-filter` for blur + color adjustments
- `ResizeObserver` to adapt to container size

This creates a unique **liquid / fluid** distortion effect that reacts to the shape of your container.

---

## Development

```bash
git clone https://github.com/Persian-Caesar/Liquid-Glass.git
cd Liquid-Glass
npm install
npm run dev     # watch mode
npm run build   # production build
```

---

## License

[MIT License](./LICENSE)

---

## Author

Made with ❤️ by **[Persian-Caesar](https://github.com/persian-caesar/)**
