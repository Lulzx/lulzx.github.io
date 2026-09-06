import { createRoot } from 'react-dom/client'
import { App } from './App'
import { PaperTexture } from './PaperTexture'
import './theme.css'

createRoot(document.getElementById('gallery')!).render(<><PaperTexture /><App /></>)
