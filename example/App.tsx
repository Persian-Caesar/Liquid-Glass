import { LiquidGlass } from '@persian-caesar/liquid-glass';

export default function App() {
    return (
        <LiquidGlass
            blur={0.8}
            displacementScale={0.5}
            elasticity={0.1}
            shadowIntensity={0.25}
            className="flex flex-col justify-center items-center p-8 fixed top-1/2 left-1/5 rounded-3xl max-w-full min-w-xl max-h-full min-h-50 text-black"
            style={{
                background: 'rgba(255, 255, 255, 0.5)'
            }}
        >
            <div className='text-center'>
                <h1 className="text-3xl font-bold">Hello Liquid Glass</h1>
                <p>Any content you want — fully stylable container.</p>
            </div>

            <div className='flex flex-wrap gap-2 justify-center items-center'>
                <div className='h-20 w-20 bg-amber-300 rounded-2xl flex flex-col justify-center items-center'>
                    <p>Item</p>
                </div>

                <div className='h-20 w-20 bg-amber-600 rounded-2xl flex flex-col justify-center items-center'>
                    <p>Item</p>
                </div>

                <LiquidGlass
                    displacementScale={3.5}
                    elasticity={2.75}
                    shadowIntensity={1.25}
                    className='h-20 w-20 bg-amber-600/30 rounded-2xl flex flex-col justify-center items-center'
                >
                    <p>Item</p>
                </LiquidGlass>

                <div className='h-20 w-20 bg-amber-900 rounded-2xl flex flex-col justify-center items-center'>
                    <p>Item</p>
                </div>
            </div>
        </LiquidGlass>
    );
}