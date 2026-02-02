import React, {useEffect, useState} from 'react'

export default function Home(){
  const [status, setStatus] = useState('loading')

  useEffect(()=>{
    fetch('http://localhost:8000/health')
      .then(r=>r.json())
      .then(j=>setStatus(j.status))
      .catch(()=>setStatus('offline'))
  }, [])

  return (
    <div>
      <h1>Provocatio</h1>
      <p>Backend health: <strong>{status}</strong></p>
      <section>
        <h2>Quick Links</h2>
        <ul>
          <li>의뢰 작성, 프로그램 등록 등의 기본 플로우를 설계합니다.</li>
        </ul>
      </section>
    </div>
  )
}
