import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Stack, Row, Col, Button, Form } from 'react-bootstrap'

import './App.css'
import { ArrowIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

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
              loading={loading}
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
            <TextArea
              loading={ loading }
              type={ SectionType.To }
              value={ result }
              onChange={ setResult }
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
