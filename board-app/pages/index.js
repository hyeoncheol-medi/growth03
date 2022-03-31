import Head from 'next/head'
import { server } from '../config'
import { useEffect, useRef } from 'react';

function ContentForm() {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      content: event.target.content.value,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = `${server}/articles/`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    await response.json()
    location.reload()
  }

  const inputRef = useRef(null)

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label htmlFor="content" class="form-label">암거나 쓰고 엔터</label>
        <input type="text" class="form-control" id="content" name="content" ref={inputRef}/>
      </div>
    </form>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`${server}/articles`, {headers: {'Content-Type': 'application/json'}})
  const data = await res.json()
  return { props: { data } }
}


export default function Home(props) {
  
  return (
    <div>
      <Head>
        <title>Growth03 Board</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='p-4 container-sm'>

        <h1>
          그로스데이 보드
        </h1>

        <ContentForm />

        <div className='flex-column'>
          {
            props.data.map(article => 
              <div class="card mb-2 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">{article.content}</h5>
                  <p class="card-text">{article.created_before}</p>
                </div>
              </div>
            )
          }
        </div>
      </main>
    </div>
  )
}