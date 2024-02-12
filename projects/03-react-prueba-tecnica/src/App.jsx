import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [threeFirstWords, setThreFirstWords] = useState()

  // para recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
        if (!res.ok) throw new Error('Error fetching the cat fact')
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
      .catch((err) => {
        // tanto si hay un error con la respuesta
        // como si hay un error con la petición
        console.error(`There was an error with your request: ${err.message}`)
      })
  }, [])

  // para recuperar la imagen cada vez que tengamos una cita nueva
  useEffect(() => {
    if (!fact) return

    // const firstWord = fact.split(' ').slice(0, 3).join(' ')
    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)
    setThreFirstWords(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(response => response.json())
      .then(response => {
        const { url } = response // there is not a url field in the json response
        setImageUrl(url)
        console.log(response)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      <h2>Las tres palabras extraidas:</h2>
      {threeFirstWords && <p>{threeFirstWords}</p>}
      <h2>Imagen usando las tres primeras palabras</h2>
      {/* {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />} */}
      <img src={`${CAT_PREFIX_IMAGE_URL}`} alt={`Image extracted using the first three words for ${fact}`} />
    </main>
  )
}
