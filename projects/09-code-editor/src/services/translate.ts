import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { SUPPORTED_LANGUAGES } from '../constants'
import { FromLanguage, Language } from '../types'
// DO NOT PUBLIC THIS OR THE CLIENT WILL KNOW THE API KEY
// WE DO THIS BECAUSE WE ARE FOCUSING AT REACT AND TYPESCRIPT
// WE SHOULD CREATE AN API KEY FOR THIS
const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a AI that translate text. Yuo recieve a text from the user. Do not answer, just translate the text. The origial language is surrounded by `{{` and `}}`. You can also receive {{auto}} wich means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Hola mundo {{Spanish}} [[English]]`
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello wolrd'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `How are you? {{auto}} [[Deutsch]]`
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Bon dia, com estas? {{auto}} [[Español]]`
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos días, ¿cómo estás?'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${ text } {{${ fromLanguage }}} [[${ toLanguage }]]`
      }
    ]
  })

  return completion.data.choices[0]?.message?.content
}
