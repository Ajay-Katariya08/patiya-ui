"use client";

import React, { useState } from 'react';
import { Slider } from 'patiya';
import { CodeTabs } from '../../../../components/CodeTabs';
import { ExampleCard } from '../../../../components/ExampleCard';

export default function SliderPage() {
  const [basicValue, setBasicValue] = useState<number | number[]>(50);
  const [rangeValue, setRangeValue] = useState<number | number[]>([20, 80]);
  const [stepValue, setStepValue] = useState<number | number[]>(30);
  const [tooltipValue, setTooltipValue] = useState<number | number[]>(45);
  const [marksValue, setMarksValue] = useState<number | number[]>(50);
  const [colorValue, setColorValue] = useState<number | number[]>(75);
  const [verticalValue, setVerticalValue] = useState<number | number[]>(40);
  const [verticalRangeValue, setVerticalRangeValue] = useState<number | number[]>([10, 60]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Slider</h1>
        <p className="text-lg text-[var(--patiya-color-muted-foreground)]">
          An interactive, fully customizable thin range slider component for single or multiple values. Supports horizontal and vertical orientations.
        </p>
      </div>

      <div className="space-y-6">
        <h2 id="installation" className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">Installation</h2>
        <CodeTabs tabs={[{ name: 'import', code: `import { Slider } from 'patiya';` }]} />
      </div>

      <div className="grid gap-12">
        {/* 1. Basic Slider */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="basic-slider" className="text-2xl font-semibold">Basic Slider</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">A simple horizontal slider for selecting a single value.</p>
          </div>
          <ExampleCard code={`import { useState } from 'react';
import { Slider } from 'patiya';

export default function App() {
  const [value, setValue] = useState(50);
  return (
    <Slider value={value} onChange={setValue} min={0} max={100} />
  );
}`}>
            <div className="w-full max-w-md mx-auto space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Volume</span>
                <span>{basicValue as number}%</span>
              </div>
              <Slider value={basicValue} onChange={setBasicValue} min={0} max={100} />
            </div>
          </ExampleCard>
        </section>

        {/* 2. Range Slider */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="range-slider" className="text-2xl font-semibold">Range Slider</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">A slider with two thumbs for selecting a range of values.</p>
          </div>
          <ExampleCard code={`import { useState } from 'react';
import { Slider } from 'patiya';

export default function App() {
  const [value, setValue] = useState([20, 80]);
  return (
    <Slider value={value} onChange={setValue} min={0} max={200} />
  );
}`}>
            <div className="w-full max-w-md mx-auto space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Price Range</span>
                <span>${(rangeValue as number[])[0]} - ${(rangeValue as number[])[1]}</span>
              </div>
              <Slider value={rangeValue} onChange={setRangeValue} min={0} max={200} />
            </div>
          </ExampleCard>
        </section>

        {/* 3. Stepped Slider */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="stepped-slider" className="text-2xl font-semibold">Stepped Slider</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">A slider that snaps to specific increments (e.g., step=10).</p>
          </div>
          <ExampleCard code={`import { useState } from 'react';
import { Slider } from 'patiya';

export default function App() {
  const [value, setValue] = useState(30);
  return (
    <Slider value={value} onChange={setValue} min={0} max={100} step={10} />
  );
}`}>
            <div className="w-full max-w-md mx-auto space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Value: {stepValue as number}</span>
              </div>
              <Slider value={stepValue} onChange={setStepValue} min={0} max={100} step={10} />
            </div>
          </ExampleCard>
        </section>

        {/* 4. Tooltip Slider */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="tooltip-slider" className="text-2xl font-semibold">Slider with Tooltip</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">Displays a dynamic tooltip when interacting with the thumb.</p>
          </div>
          <ExampleCard code={`import { useState } from 'react';
import { Slider } from 'patiya';

export default function App() {
  const [value, setValue] = useState(45);
  return (
    <Slider value={value} onChange={setValue} min={0} max={100} showTooltip />
  );
}`}>
            <div className="w-full max-w-md mx-auto py-8">
              <Slider value={tooltipValue} onChange={setTooltipValue} min={0} max={100} showTooltip />
            </div>
          </ExampleCard>
        </section>

        {/* 5. Marks Slider */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="marks-slider" className="text-2xl font-semibold">Slider with Marks</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">Displays custom marks and labels along the track.</p>
          </div>
          <ExampleCard code={`import { useState } from 'react';
import { Slider } from 'patiya';

export default function App() {
  const [value, setValue] = useState(50);
  return (
    <Slider 
      value={value} 
      onChange={setValue} 
      min={0} 
      max={100} 
      marks={[
        { value: 0, label: '0°C' },
        { value: 50, label: '50°C' },
        { value: 100, label: '100°C' },
      ]}
    />
  );
}`}>
            <div className="w-full max-w-md mx-auto pb-12 pt-4">
              <Slider
                value={marksValue}
                onChange={setMarksValue}
                min={0}
                max={100}
                marks={[
                  { value: 0, label: '0°C' },
                  { value: 50, label: '50°C' },
                  { value: 100, label: '100°C' },
                ]}
              />
            </div>
          </ExampleCard>
        </section>

        {/* 6. Custom Colors Slider */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="custom-colors" className="text-2xl font-semibold">Custom Colors</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">Override default styling with custom track and thumb colors.</p>
          </div>
          <ExampleCard code={`import { useState } from 'react';
import { Slider } from 'patiya';

export default function App() {
  const [value, setValue] = useState(75);
  return (
    <div className="space-y-8">
      <Slider 
        value={value} 
        onChange={setValue} 
        trackColor="destructive" 
        thumbColor="destructive" 
      />
      <Slider 
        defaultValue={40} 
        trackColor="primary" 
        thumbColor="primary" 
      />
    </div>
  );
}`}>
            <div className="w-full max-w-md mx-auto space-y-8">
              <Slider
                value={colorValue}
                onChange={setColorValue}
                min={0}
                max={100}
                trackColor="destructive"
                thumbColor="destructive"
              />
              <Slider
                defaultValue={40}
                min={0}
                max={100}
                trackColor="primary"
                thumbColor="primary"
              />
            </div>
          </ExampleCard>
        </section>

        {/* 7. Vertical Slider */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="vertical-slider" className="text-2xl font-semibold">Vertical Slider</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">A single-value vertical orientation slider.</p>
          </div>
          <ExampleCard code={`import { useState } from 'react';
import { Slider } from 'patiya';

export default function App() {
  const [value, setValue] = useState(40);
  return (
    <div className="h-64 flex items-center justify-center space-x-12">
      <Slider 
        value={value} 
        onChange={setValue} 
        orientation="vertical" 
        showTooltip 
      />
      <div>Value: {value}</div>
    </div>
  );
}`}>
            <div className="h-64 flex items-center justify-center space-x-12">
              <Slider
                value={verticalValue}
                onChange={setVerticalValue}
                orientation="vertical"
                min={0}
                max={100}
                showTooltip
              />
              <div className="text-sm font-medium">Value: {verticalValue as number}</div>
            </div>
          </ExampleCard>
        </section>

        {/* 8. Vertical Range Slider with Marks */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="vertical-range-marks" className="text-2xl font-semibold">Vertical Range & Marks</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">A vertical range slider with marks for detailed selection.</p>
          </div>
          <ExampleCard code={`import { useState } from 'react';
import { Slider } from 'patiya';

export default function App() {
  const [value, setValue] = useState([10, 60]);
  return (
    <div className="h-80 flex items-center justify-center pr-12">
      <Slider 
        value={value} 
        onChange={setValue} 
        orientation="vertical" 
        showTooltip 
        marks={[
          { value: 0, label: 'Low' },
          { value: 50, label: 'Med' },
          { value: 100, label: 'High' }
        ]}
      />
    </div>
  );
}`}>
            <div className="h-80 flex items-center justify-center pr-12">
              <Slider
                value={verticalRangeValue}
                onChange={setVerticalRangeValue}
                orientation="vertical"
                min={0}
                max={100}
                showTooltip
                marks={[
                  { value: 0, label: 'Low' },
                  { value: 50, label: 'Med' },
                  { value: 100, label: 'High' }
                ]}
              />
            </div>
          </ExampleCard>
        </section>

        {/* Props API */}
        <section className="space-y-6">
          <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
            <h2 id="props-api" className="text-2xl font-semibold">Props API</h2>
            <p className="text-[var(--patiya-color-muted-foreground)]">Available properties for the Slider component.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-[var(--patiya-color-border)]">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]">
                <tr>
                  <th className="px-6 py-4 font-semibold border-b border-[var(--patiya-color-border)]">Prop</th>
                  <th className="px-6 py-4 font-semibold border-b border-[var(--patiya-color-border)]">Type</th>
                  <th className="px-6 py-4 font-semibold border-b border-[var(--patiya-color-border)]">Default</th>
                  <th className="px-6 py-4 font-semibold border-b border-[var(--patiya-color-border)]">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">value</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">number | number[]</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">The controlled value of the slider.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">defaultValue</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">number | number[]</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">0</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">The initial value when uncontrolled.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">min</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">number</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">0</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">The minimum value of the slider.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">max</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">number</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">100</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">The maximum value of the slider.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">step</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">number</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">1</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">The step increment for the slider value.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">orientation</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">'horizontal' | 'vertical'</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">'horizontal'</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">The visual orientation of the slider.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">disabled</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">boolean</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">false</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">If true, prevents user interaction.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">showTooltip</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">boolean</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">false</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">Whether to show a value tooltip when dragging.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">marks</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">{`{ value: number, label?: string }[]`}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">Array of marks to display along the track.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">trackColor</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">string</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">Custom background color for the active track.</td>
                </tr>
                <tr className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">thumbColor</td>
                  <td className="px-6 py-4 font-mono text-xs text-orange-500">string</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm leading-relaxed">Custom background color for the thumb.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
