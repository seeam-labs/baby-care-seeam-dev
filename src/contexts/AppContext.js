import { createContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [profiles, setProfiles] = useLocalStorage('babyProfiles', [])
  const [activeProfileId, setActiveProfileId] = useLocalStorage('activeProfileId', null)
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  const [growthLogs, setGrowthLogs] = useLocalStorage('growthLogs', {})
  const [vaccineChecklist, setVaccineChecklist] = useLocalStorage('vaccineChecklist', {})
  const [milestonesChecklist, setMilestonesChecklist] = useLocalStorage('milestonesChecklist', {})
  const [diaryEntries, setDiaryEntries] = useLocalStorage('diaryEntries', {})
  const [favoriteTips, setFavoriteTips] = useLocalStorage('favoriteTips', [])
  const [checklists, setChecklists] = useLocalStorage('checklists', {})
  const [sleepLogs, setSleepLogs] = useLocalStorage('sleepLogs', {})
  const [feedingLogs, setFeedingLogs] = useLocalStorage('feedingLogs', {})

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const addProfile = (profile) => {
    const newProfile = {
      id: Date.now().toString(),
      ...profile,
      createdAt: new Date().toISOString(),
    }
    setProfiles([...profiles, newProfile])
    setActiveProfileId(newProfile.id)
    return newProfile
  }

  const updateProfile = (id, updates) => {
    setProfiles(profiles.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProfile = (id) => {
    setProfiles(profiles.filter(p => p.id !== id))
    if (activeProfileId === id) {
      setActiveProfileId(profiles[0]?.id || null)
    }
  }

  const getActiveProfile = () => {
    return profiles.find(p => p.id === activeProfileId)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <AppContext.Provider
      value={{
        profiles,
        activeProfileId,
        setActiveProfileId,
        addProfile,
        updateProfile,
        deleteProfile,
        getActiveProfile,
        darkMode,
        toggleDarkMode,
        growthLogs,
        setGrowthLogs,
        vaccineChecklist,
        setVaccineChecklist,
        milestonesChecklist,
        setMilestonesChecklist,
        diaryEntries,
        setDiaryEntries,
        favoriteTips,
        setFavoriteTips,
        checklists,
        setChecklists,
        sleepLogs,
        setSleepLogs,
        feedingLogs,
        setFeedingLogs,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}