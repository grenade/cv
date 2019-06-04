import React from 'react';
import './App.css';
import {
  Container,
  Row,
  Col,
  Card
} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';

class App extends React.Component {
  render() {
    return (
      <GistCv />
    );
  }
}

var GIST_ID = '8e487477663c8e57c7bf31e8371f454a';
var GIST_API_URL = 'https://api.github.com/gists';
var GIST_CONFIG_FILENAME = 'cv-config.json';

class GistCv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gist: {
        files: {}
      },
      config: {
        sections: []
      }
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(GIST_API_URL + '/' + GIST_ID)
      .then(response => response.json())
      .then(gist => this.setState({ gist: gist, config: JSON.parse(gist.files[GIST_CONFIG_FILENAME].content) }));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={9}>
            {
              this.state.config.sections.map((section) =>

                <div id={section.name}>
                  {(section.show_section_name) ? <h2>{section.name}</h2> : null}
                  {
                    ((section.sort && section.sort.direction[0] === 'd')
                      ? Object.keys(this.state.gist.files).filter(key => key.startsWith(section.filename_prefix)).reverse()
                      : Object.keys(this.state.gist.files).filter(key => key.startsWith(section.filename_prefix))).map(key => {
                      if (section.show_section_name) {
                        return (
                          <Card body>
                            <ReactMarkdown source={this.state.gist.files[key].content} key={key} />
                          </Card>
                        );
                      } else {
                        return (
                          <ReactMarkdown source={this.state.gist.files[key].content} key={key} />
                        )
                      }
                    })
                  }
                </div>
              )
            }
          </Col>
          <Col sm={3}>
            <ul>
            {
              this.state.config.sections.map((section) =>
                <li><a href={'#' + section.name}>{section.name}</a></li>
              )
            }
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
