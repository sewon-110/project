'use client'

import { useEffect } from "react"

// Hero ↔ Work Process(화이트) ↔ Work 를 한 제스처당 한 단계씩 점프.
// 잠금은 "스크롤이 잠깐 멈추면" 자동 해제 → 한 제스처=한 단계, 그러나 절대 갇히지 않음.
export default function FirstScrollToWork() {
  useEffect(() => {
    // 새로고침 시 항상 메인(최상단)에서 시작
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)

    let locked = false
    let canUnlock = false
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    let minTimer: ReturnType<typeof setTimeout> | undefined

    // 스크롤이 멈춘 뒤(150ms) + 최소 잠금시간(550ms) 지나면 해제
    const scheduleUnlock = () => {
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        if (canUnlock) locked = false
      }, 150)
    }

    const go = (top: number) => {
      locked = true
      canUnlock = false
      window.scrollTo({ top, behavior: "smooth" })
      if (minTimer) clearTimeout(minTimer)
      minTimer = setTimeout(() => {
        canUnlock = true
        scheduleUnlock()
      }, 550)
    }

    const onWheel = (e: WheelEvent) => {
      const h = window.innerHeight
      const y = window.scrollY

      if (locked) {
        e.preventDefault()
        scheduleUnlock() // 계속 스크롤하는 동안엔 잠금 유지, 멈추면 해제
        return
      }

      const down = e.deltaY > 0
      if (down) {
        if (y < h * 0.5) {
          e.preventDefault()
          go(h) // Hero → Process
        } else if (y < h * 1.5) {
          e.preventDefault()
          go(h * 2) // Process → Work
        }
        // Work 에서 아래로는 오른쪽 영역 스크롤(기본 동작) 유지
      } else {
        if (y > h * 1.5) {
          // Work → Process (오른쪽 영역 맨 위로 리셋)
          e.preventDefault()
          const d = document.getElementById("work-detail")
          if (d) d.scrollTop = 0
          go(h)
        } else if (y > h * 0.5) {
          e.preventDefault()
          go(0) // Process → Hero
        }
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", onWheel)
      if (idleTimer) clearTimeout(idleTimer)
      if (minTimer) clearTimeout(minTimer)
    }
  }, [])

  return null
}
