import type React from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export interface LiquidGlassProps {
    // Core effect options
    borderRadius?: number;
    blur?: number;
    contrast?: number;
    brightness?: number;
    saturation?: number;
    shadowIntensity?: number;
    displacementScale?: number;
    elasticity?: number;

    // Customization
    className?: string;
    style?: React.CSSProperties;           
    children?: React.ReactNode;

    // Advanced
    as?: React.ElementType;                
    filterId?: string;                    
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
    borderRadius = 20,
    blur = 0.25,
    contrast = 1.2,
    brightness = 1.05,
    saturation = 1.1,
    shadowIntensity = 0.25,
    displacementScale = 1,
    elasticity = 0.6,

    className = "",
    style = {},
    children,
    as: Component = "div",
    filterId,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const feImageRef = useRef<SVGFEImageElement>(null);
    const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

    const reactId = useId();
    const id = filterId || `liquid-glass-${reactId.replace(/:/g, "-")}`;

    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const canvasDPI = 1;

    // Utility functions (همان قبلی‌ها)
    const smoothStep = useCallback((a: number, b: number, t: number) => {
        t = Math.max(0, Math.min(1, (t - a) / (b - a)));
        return t * t * (3 - 2 * t);
    }, []);

    const length = useCallback((x: number, y: number) => Math.sqrt(x * x + y * y), []);

    const roundedRectSDF = useCallback(
        (x: number, y: number, w: number, h: number, radius: number) => {
            const qx = Math.abs(x) - w + radius;
            const qy = Math.abs(y) - h + radius;
            return (
                Math.min(Math.max(qx, qy), 0) +
                length(Math.max(qx, 0), Math.max(qy, 0)) -
                radius
            );
        },
        [length]
    );

    const updateShader = useCallback(() => {
        // ... (کد updateShader قبلی بدون تغییر نگه داشته میشه)
        const canvas = canvasRef.current;
        const feImage = feImageRef.current;
        const feDisplacementMap = feDisplacementMapRef.current;
        if (!canvas || !feImage || !feDisplacementMap) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const w = Math.max(1, Math.floor(width * canvasDPI));
        const h = Math.max(1, Math.floor(height * canvasDPI));

        if (w <= 0 || h <= 0) return;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }

        const data = new Uint8ClampedArray(w * h * 4);
        let maxScale = 0;
        const rawValues: number[] = [];

        for (let i = 0; i < data.length; i += 4) {
            const x = (i / 4) % w;
            const y = Math.floor(i / 4 / w);
            const uv = { x: x / w, y: y / h };

            const ix = uv.x - 0.5;
            const iy = uv.y - 0.5;
            const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, elasticity);
            const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
            const scaled = smoothStep(0, 1, displacement);

            const pos = {
                x: ix * scaled + 0.5,
                y: iy * scaled + 0.5,
            };

            const dx = pos.x * w - x;
            const dy = pos.y * h - y;

            maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
            rawValues.push(dx, dy);
        }

        maxScale *= 0.5 * displacementScale;

        let index = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = rawValues[index++] / maxScale + 0.5;
            const g = rawValues[index++] / maxScale + 0.5;
            data[i] = r * 255;
            data[i + 1] = g * 255;
            data[i + 2] = 0;
            data[i + 3] = 255;
        }

        context.putImageData(new ImageData(data, w, h), 0, 0);
        feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL());
        feDisplacementMap.setAttribute("scale", (maxScale / canvasDPI).toString());
    }, [width, height, displacementScale, elasticity, roundedRectSDF, smoothStep]);

    // Resize Observer
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width: newWidth, height: newHeight } = entry.contentRect;
                setWidth(Math.max(newWidth, 100));
                setHeight(Math.max(newHeight, 100));
            }
        });

        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, []);

    // Update shader when needed
    useEffect(() => {
        updateShader();
    }, [updateShader]);

    const filterStyle: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        backdropFilter: `url(#${id}_filter) blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`,
        boxShadow: shadowIntensity > 0
            ? `0 4px 8px rgba(0, 0, 0, ${shadowIntensity}), 0 -10px 25px inset rgba(0, 0, 0, 0.15)`
            : undefined,
    };

    return (
        <>
            {/* SVG Filter - Hidden */}
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                width="0"
                height="0"
                style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }}
            >
                <defs>
                    <filter
                        id={`${id}_filter`}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                        x="0"
                        y="0"
                        width={width.toString()}
                        height={height.toString()}
                    >
                        <feImage ref={feImageRef} id={`${id}_map`} width={width.toString()} height={height.toString()} />
                        <feDisplacementMap
                            ref={feDisplacementMapRef}
                            in="SourceGraphic"
                            in2={`${id}_map`}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Hidden Canvas */}
            <canvas
                ref={canvasRef}
                width={width * canvasDPI}
                height={height * canvasDPI}
                style={{ display: "none" }}
            />

            {/* Main Glass Container - Fully Customizable */}
            <Component
                ref={containerRef}
                className={`liquid-glass ${className}`}
                style={{
                    ...filterStyle,
                    ...style,         
                }}
            >
                {children}
            </Component>
        </>
    );
};

export default LiquidGlass;