import tinier from 'tinier'
import App from './components/App'

tinier.run(App, document.body, { verbose: false })

// OR

tinier.run(App(), document.body, { verbose: false })
