import React, { useState } from 'react';

// PGD UI Mockups
// Single-file React component with Tailwind classes.
// Use in Next.js or Vite + Tailwind project. Each component below represents one screen mockup.
// Instructions: paste into a React page (e.g. pages/index.js in Next.js app) and ensure Tailwind is enabled.

export default function PGDMockups() {
  const [screen, setScreen] = useState('dashboard');

  const nav = [
    { id: 'login', label: 'Login' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'weather', label: 'Weather Form' },
    { id: 'crop', label: 'Crop Form' },
    { id: 'results', label: 'Irrigation Results' },
    { id: 'settings', label: 'Settings' },
    { id: 'admin', label: 'Admin View' },
    { id: 'error', label: 'Error / Alerts' },
    { id: 'console', label: 'Backend Console' },
    { id: 'db', label: 'DB Diagram' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <header className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Irrigation DSS — UI Mockups</h1>
        <nav className="flex gap-2">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setScreen(n.id)}
              className={`px-3 py-1 rounded-md text-sm ${screen===n.id ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        {screen === 'login' && <LoginPage />}
        {screen === 'dashboard' && <Dashboard />}
        {screen === 'weather' && <WeatherForm />}
        {screen === 'crop' && <CropForm />}
        {screen === 'results' && <ResultsPage />}
        {screen === 'settings' && <SettingsPage />}
        {screen === 'admin' && <AdminView />}
        {screen === 'error' && <ErrorScreen />}
        {screen === 'console' && <BackendConsole />}
        {screen === 'db' && <DatabaseDiagram />}
      </main>

      <footer className="max-w-6xl mx-auto mt-8 text-xs text-slate-500">Mockups generated for PGD project — adapt styles & copy as needed.</footer>
    </div>
  );
}

function Card({title, children}){
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  )
}

function LoginPage(){
  return (
    <div className="grid grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-slate-600 mb-6">Sign in to access the Irrigation Decision Support Tool.</p>
        <div className="bg-white rounded-2xl shadow p-6 max-w-md">
          <label className="block text-sm text-slate-700">Email</label>
          <input className="w-full mt-1 p-2 border rounded" placeholder="you@example.com" />
          <label className="block text-sm text-slate-700 mt-4">Password</label>
          <input type="password" className="w-full mt-1 p-2 border rounded" placeholder="••••••" />
          <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded">Sign In</button>
          <div className="mt-3 text-sm text-slate-500">Forgot password? <a className="text-indigo-600">Reset</a></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-36 h-36 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">DSS</div>
          <p className="text-slate-600">A simple, mobile-first interface for farmers and extension officers to estimate irrigation needs.</p>
        </div>
      </div>
    </div>
  )
}

function Dashboard(){
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="flex gap-4 mb-4">
          <Card title="Current Site Summary">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 border rounded">ET₀<br/><strong>5.2 mm/day</strong></div>
              <div className="p-3 border rounded">Soil Moisture<br/><strong>23%</strong></div>
              <div className="p-3 border rounded">Next Irrigation<br/><strong>2025-11-30</strong></div>
            </div>
          </Card>
          <Card title="Quick Actions">
            <div className="flex flex-col gap-2">
              <button className="px-3 py-2 border rounded">New Estimation</button>
              <button className="px-3 py-2 border rounded">Upload Weather Data</button>
              <button className="px-3 py-2 border rounded">Export Report</button>
            </div>
          </Card>
        </div>

        <Card title="Recent Estimations">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr><th>Date</th><th>Crop</th><th>ET₀ (mm)</th><th>Water Need (L/m²)</th></tr>
            </thead>
            <tbody>
              <tr className="border-t"><td>2025-11-20</td><td>Maize</td><td>5.2</td><td>28</td></tr>
              <tr className="border-t"><td>2025-11-18</td><td>Sorghum</td><td>4.8</td><td>24</td></tr>
              <tr className="border-t"><td>2025-11-15</td><td>Tomato</td><td>6.1</td><td>32</td></tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div className="col-span-1">
        <Card title="Site Map / Weather Snapshot">
          <div className="p-3">
            <div className="text-sm">Location: <strong>Effurun</strong></div>
            <div className="text-sm">Temp: <strong>33°C</strong></div>
            <div className="text-sm">Humidity: <strong>28%</strong></div>
            <div className="mt-3 text-xs text-slate-500">Mini chart placeholder</div>
          </div>
        </Card>

        <Card title="Notifications">
          <ul className="text-sm">
            <li className="py-1">Soil moisture low for Field A</li>
            <li className="py-1">New weather data uploaded</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

function WeatherForm(){
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <Card title="Manual Weather Input">
          <form className="space-y-3">
            <label className="text-sm">Date</label>
            <input className="w-full p-2 border rounded" type="date" />
            <label className="text-sm">Temperature (°C)</label>
            <input className="w-full p-2 border rounded" placeholder="e.g. 33" />
            <label className="text-sm">Minimum Temp (°C)</label>
            <input className="w-full p-2 border rounded" placeholder="e.g. 21" />
            <label className="text-sm">Maximum Temp (°C)</label>
            <input className="w-full p-2 border rounded" placeholder="e.g. 38" />
            <label className="text-sm">Humidity (%)</label>
            <input className="w-full p-2 border rounded" placeholder="e.g. 28" />
            <label className="text-sm">Wind speed (m/s)</label>
            <input className="w-full p-2 border rounded" placeholder="e.g. 2.5" />
            <label className="text-sm">Solar Radiation (MJ/m²/day)</label>
            <input className="w-full p-2 border rounded" placeholder="e.g. 18" />
            <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
          </form>
        </Card>
      </div>
      <div>
        <Card title="Upload Weather CSV">
          <p className="text-sm text-slate-600">Upload a CSV with columns: date, tmin, tmax, temp, rh, wind, rad</p>
          <div className="mt-3">
            <input type="file" />
            <div className="mt-3 text-sm text-slate-500">Sample: 2025-11-20,21,33,28,2.5,18</div>
          </div>
        </Card>

        <Card title="Recent Weather Data">
          <ul className="text-sm">
            <li>2025-11-20 — 33°C / 21°C — 18 MJ/m²</li>
            <li>2025-11-19 — 32°C / 20°C — 17 MJ/m²</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

function CropForm(){
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <Card title="Select Crop & Growth Stage">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Crop</label>
              <select className="w-full p-2 border rounded">
                <option>Maize</option>
                <option>Tomato</option>
                <option>Sorghum</option>
                <option>Groundnut</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Growth Stage</label>
              <select className="w-full p-2 border rounded">
                <option>Initial</option>
                <option>Development</option>
                <option>Mid-season</option>
                <option>Late season</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm">Soil Texture</label>
            <select className="w-full p-2 border rounded">
              <option>Sandy</option>
              <option>Loam</option>
              <option>Clay</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="text-sm">Effective Root Depth (mm)</label>
            <input className="w-full p-2 border rounded" placeholder="e.g. 300" />
          </div>

          <div className="mt-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">Save Crop Profile</button>
          </div>
        </Card>

        <Card title="Crop Coefficients (Kc)">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500"><tr><th>Crop</th><th>Kc</th></tr></thead>
            <tbody>
              <tr className="border-t"><td>Maize</td><td>1.05</td></tr>
              <tr className="border-t"><td>Tomato</td><td>1.15</td></tr>
            </tbody>
          </table>
        </Card>
      </div>
      <div>
        <Card title="Saved Crop Profiles">
          <ul className="text-sm">
            <li>Maize — Mid-season — Loam</li>
            <li>Tomato — Mid-season — Sandy</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

function ResultsPage(){
  return (
    <div className="space-y-6">
      <Card title="Irrigation Estimation Result">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600">Reference ET (ET₀)</p>
            <h2 className="text-2xl font-bold">5.23 mm/day</h2>
            <p className="mt-2 text-sm">Crop coefficient (Kc): <strong>1.05</strong></p>
            <p className="text-sm mt-1">Adjusted ET (ETc): <strong>5.49 mm/day</strong></p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Irrigation Volume</p>
            <h2 className="text-2xl font-bold">27 L/m²</h2>
            <p className="mt-2 text-sm">Recommendation: Irrigate to refill root zone once every 3 days.</p>
          </div>
        </div>

        <div className="mt-4">
          <button className="px-3 py-2 border rounded mr-2">Download PDF</button>
          <button className="px-3 py-2 border rounded">Save to Reports</button>
        </div>
      </Card>

      <Card title="Computation Details">
        <pre className="text-xs bg-slate-100 p-3 rounded">// ET0 calculation
ET0 = 0.408 * delta * (Rn - G) + gamma * (900/(T+273)) * u2 * (es - ea) / (delta + gamma*(1+0.34*u2))
</pre>
      </Card>
    </div>
  )
}

function SettingsPage(){
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card title="User Preferences">
        <label className="text-sm">Default Location</label>
        <input className="w-full p-2 border rounded" placeholder="Effurun" />
        <label className="text-sm mt-3">Units</label>
        <select className="w-full p-2 border rounded"><option>Metric</option><option>Imperial</option></select>
      </Card>
      <Card title="Data & Integrations">
        <div className="text-sm">Weather API Key</div>
        <input className="w-full p-2 border rounded" placeholder="Enter API key" />
        <div className="mt-3 text-sm">CSV Upload Settings</div>
      </Card>
    </div>
  )
}

function AdminView(){
  return (
    <div>
      <Card title="Admin Dashboard">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="p-3 border rounded">Users<br/><strong>42</strong></div>
          <div className="p-3 border rounded">Reports<br/><strong>128</strong></div>
          <div className="p-3 border rounded">Data Files<br/><strong>16</strong></div>
        </div>
      </Card>

      <Card title="User Management">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500"><tr><th>Name</th><th>Role</th><th>Last Login</th></tr></thead>
          <tbody>
            <tr className="border-t"><td>Ade</td><td>Farmer</td><td>2025-11-20</td></tr>
            <tr className="border-t"><td>Sara</td><td>Officer</td><td>2025-11-19</td></tr>
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function ErrorScreen(){
  return (
    <div className="flex items-center justify-center h-64">
      <div className="bg-white p-6 rounded shadow text-center max-w-lg">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="mt-2 text-slate-600">Unable to fetch weather data. Check API key and network connectivity.</p>
        <div className="mt-4"><button className="px-3 py-2 bg-indigo-600 text-white rounded">Retry</button></div>
      </div>
    </div>
  )
}

function BackendConsole(){
  return (
    <div>
      <Card title="Console Output">
        <pre className="bg-black text-green-400 p-3 rounded text-xs h-48 overflow-auto">2025-11-20 10:05:12 INFO: Starting ET0 computation
2025-11-20 10:05:12 INFO: Loading crop coefficients
2025-11-20 10:05:12 INFO: Computation finished: ET0=5.23
2025-11-20 10:05:12 INFO: Saved result id=987</pre>
      </Card>

      <Card title="Background Jobs">
        <ul className="text-sm">
          <li>Daily weather sync — last run: 2025-11-20 04:00</li>
          <li>Report generation — queued: 2 jobs</li>
        </ul>
      </Card>
    </div>
  )
}

function DatabaseDiagram(){
  return (
    <div>
      <Card title="Database Schema (Simplified)">
        <div className="bg-white p-3 rounded">
          <img alt="db-diagram" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='700' height='300'><rect x='10' y='10' width='200' height='80' fill='%23ffffff' stroke='%23000' /><text x='20' y='35' font-size='14'>users (id, name, email, role)</text><rect x='10' y='110' width='200' height='80' fill='%23ffffff' stroke='%23000' /><text x='20' y='135' font-size='14'>crops (id, name, kc)</text><rect x='260' y='10' width='300' height='80' fill='%23ffffff' stroke='%23000' /><text x='270' y='35' font-size='14'>estimations (id, user_id, crop_id, weather_id, et0, irrigation)</text></svg>" />
        </div>
      </Card>
    </div>
  )
}
