import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


//TODO
// masquer filtre tag lorsque bootamp onglet actif OK
// filtres croisés avec tag (prochainement /précédent)
// date format
// fermer selector au click sur la page
// factoriser handleButtons dans navigation.tsx