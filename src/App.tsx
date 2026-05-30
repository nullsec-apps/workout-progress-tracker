import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import AppSidebar from './components/AppSidebar'
import Dashboard from './components/Dashboard'
import ExerciseLibrary from './components/ExerciseLibrary'
import WorkoutBuilder from './components/WorkoutBuilder'
import ProgressCharts from './components/ProgressCharts'
import PersonalRecords from './components/PersonalRecords'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="flex min-h-screen bg-[#0a0e0d] text-[#e8f0ed] overflow-x-hidden">
          <AppSidebar />
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/exercises" element={<ExerciseLibrary />} />
              <Route path="/plan" element={<WorkoutBuilder />} />
              <Route path="/progress" element={<ProgressCharts />} />
              <Route path="/records" element={<PersonalRecords />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}