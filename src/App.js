import { Component } from 'react';
import './App.css';

import { marked } from 'marked'
import DOMPurify from 'dompurify'

import { sampleText } from './sampleText'

class App extends Component {
  // Gérer le state pour prendre en compte l'entrée utilisateur
  // On utilise le cycle de vie d'un component pour le stockage local de la
  // dernière entrée utilisateur.
  state = {
    text: sampleText
  }

  // A chaque mise à jour du state du component, on met à jour le component lui même
  // dès qu'il est remonté.
  componentDidMount() {
    const text = localStorage.getItem('text')
    if (text) {
      this.setState({ text })
    } else {
      this.setState({text: sampleText})
    }
  }

  // A chaque modification du texte, notre clé texte dans le local storage
  // se met à jour.
  componentDidUpdate() {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = DOMPurify.sanitize(marked(text))
    return { __html }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              className="form-control"
              rows="35" />
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
