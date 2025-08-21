import { useState, useEffect } from 'react'
import UserSection from './components/UserSection'
import Leaderboard from './components/Leaderboard'
import HistorySection from './components/HistorySection'
import { userAPI, pointsAPI, historyAPI } from './services/api'

function App() {
  const [users, setUsers] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersData, historyData] = await Promise.all([
        userAPI.getUsers(1, 100),
        historyAPI.getHistory(1, 100)
      ])
      setUsers(usersData.data)
      setHistory(
        historyData.data.map(h => ({
          ...h,
          date: new Date(h.createdAt).toLocaleString()
        }))
      )
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClaimPoints = async (userId) => {
    try {
      const result = await pointsAPI.claimPoints(userId)
      const pointsAwarded = result.pointsAwarded || 0

      // Update user points
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, points: result.user.points } : user
        )
      )

      // Add to history
      const now = new Date()
      const user = users.find(u => u._id === userId)
      setHistory(prev => [
        { ...result, date: now.toLocaleString() },
        ...prev
      ])

      return { userName: user.name, points: pointsAwarded, success: true }
    } catch (error) {
      console.error('Failed to claim points:', error)
      return { success: false, message: error.message }
    }
  }

  const handleAddUser = async (userName) => {
    try {
      const newUser = await userAPI.addUser(userName)
      setUsers(prev => [...prev, { ...newUser, points: 0 }])
      return newUser._id
    } catch (error) {
      console.error('Error adding user:', error)
      return null
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <UserSection
            users={users}
            onClaimPoints={handleClaimPoints}
            onAddUser={handleAddUser}
          />
          <Leaderboard users={users} />
        </div>
        <HistorySection history={history} />
      </div>
    </div>
  )
}

export default App
