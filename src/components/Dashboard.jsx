import { useEffect, useMemo, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const [stats, setStats] = useState({ total_engagement: 0, by_platform: {}, count: 0 })
  const [sentiment, setSentiment] = useState({ compound: 0, pos: 0, neu: 1, neg: 0 })

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchData = async () => {
    try {
      const [engRes, senRes] = await Promise.all([
        fetch(`${baseUrl}/metrics/engagement`).then(r => r.json()),
        fetch(`${baseUrl}/metrics/sentiment`).then(r => r.json()),
      ])
      setStats(engRes)
      setSentiment(senRes)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 10000)
    return () => clearInterval(id)
  }, [])

  const barData = useMemo(() => {
    const labels = Object.keys(stats.by_platform)
    return {
      labels,
      datasets: [
        {
          label: 'Engagement',
          data: labels.map(k => stats.by_platform[k] || 0),
          backgroundColor: 'rgba(59,130,246,0.6)'
        }
      ]
    }
  }, [stats])

  const sentimentData = useMemo(() => {
    return {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [
        {
          label: 'Sentiment',
          data: [sentiment.pos, sentiment.neu, sentiment.neg],
          backgroundColor: ['#22c55e', '#94a3b8', '#ef4444']
        }
      ]
    }
  }, [sentiment])

  return (
    <section id="dashboard" className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-white rounded-xl shadow p-6">
          <h3 className="text-sm text-gray-500">Total Engagement</h3>
          <p className="text-4xl font-bold mt-2">{stats.total_engagement}</p>
          <p className="text-xs text-gray-400 mt-2">Across {stats.count} posts</p>
        </div>
        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Engagement by Platform</h3>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Sentiment Breakdown</h3>
          <Bar data={sentimentData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex gap-3">
            <button onClick={() => fetch(`${baseUrl}/jobs/run-fetch`, { method: 'POST' })} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Run Fetch Job</button>
            <button onClick={fetchData} className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">Refresh</button>
          </div>
        </div>
      </div>
    </section>
  )
}
