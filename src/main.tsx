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
// filtres croisés avec tag (prochainement /précédent) OK
// fermer selector et remettre a 0 au click sur autre onglet OK
// factoriser handleButtons dans navigation.tsx
// bouton tous pour les tags, qui décliquent es autres checkbox e qui se déclique si une autre checkbox est cliquée
// fetch pour récupérer json