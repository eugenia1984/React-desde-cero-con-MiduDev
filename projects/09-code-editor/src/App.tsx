import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Stack, Row, Col, Button } from 'react-bootstrap'
import './App.css'
import { ArrowIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'


function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debounceFromText = useDebounce(fromText, 450)

  useEffect(() => {
    if (debounceFromText === '') return

    translate({ fromLanguage, toLanguage, text: debounceFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => setResult('Error'))
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <Row>
        <h2 className='text-center py-3'>Google translate</h2>
      </Row>
      <Row>
        <Col>
          <Stack gap={ 2 }>
            <LanguageSelector
              type={ SectionType.From }
              value={ fromLanguage }
              onChange={ setFromLanguage }
            />
            <TextArea
              loading={ loading }
              type={ SectionType.From }
              value={ fromText }
              onChange={ setFromText }
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link'
            disabled={ fromLanguage === AUTO_LANGUAGE }
            onClick={ interchangeLanguages }
          >
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={ 2 }>
            <LanguageSelector
              type={ SectionType.To }
              value={ toLanguage }
              onChange={ setToLanguage }
            />
            <div style={ { position: 'relative' } }>
              <TextArea
                loading={ loading }
                type={ SectionType.To }
                value={ result }
                onChange={ setResult }
              />
              <div style={ { position: 'absolute', left: 0, bottom: 0, display: 'flex' } }>
                <Button
                  variant='Link'
                  onClick={ handleClipboard }
                >
                  <ClipboardIcon />
                </Button>
                <Button
                  variant='Link'
                  onClick={ handleSpeak }
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
