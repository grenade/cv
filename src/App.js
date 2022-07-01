import React from 'react';
import './App.css';
import {
  Container,
  Row,
  Col,
  Card,
  Image
} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import {
  Timeline,
  Event
} from "react-timeline-scribble";

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
var GIST_IMAGE_FILENAME = 'rob.png';
var GITHUB_USERNAME = 'grenade';

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
              this.state.config.sections.map((section) => {
                if (section.placement === 'body') {
                  return (
                    <div id={section.name}>
                      {(section.show_section_name) ? <h2>{section.name}</h2> : null}
                      {
                        ((section.sort && section.sort.direction[0] === 'd')
                          ? Object.keys(this.state.gist.files).filter(key => key.startsWith(section.filename_prefix)).reverse()
                          : Object.keys(this.state.gist.files).filter(key => key.startsWith(section.filename_prefix))).map(key => {
                          if (section.show_section_name) {
                            return (
                              <div id={section.name + '-' + this.state.gist.files[key].content.split('\n')[0].replace(/^[\s#]+|[\s#]+$/g, '').replace(/\s/g, '-')}>
                                <Card bg="light">
                                  <Card.Body>
                                    <ReactMarkdown source={this.state.gist.files[key].content.toLowerCase()} key={key} />
                                  </Card.Body>
                                </Card>
                              </div>
                            );
                          } else {
                            return (
                              <ReactMarkdown source={this.state.gist.files[key].content.toLowerCase()} key={key} />
                            )
                          }
                        })
                      }
                    </div>
                  );
                }
                return null;
              })
            }
          </Col>
          <Col sm={3}>
            <Image src={'https://gist.githubusercontent.com/' + GITHUB_USERNAME + '/' + GIST_ID + '/raw/' + GIST_IMAGE_FILENAME} rounded fluid />
            {
              this.state.config.sections.map((section) => {
                if (section.placement === 'nav') {
                  return (
                    <div id={section.name}>
                      {(section.show_section_name) ? <h2>{section.name}</h2> : null}
                      {
                        ((section.sort && section.sort.direction[0] === 'd')
                          ? Object.keys(this.state.gist.files).filter(key => key.startsWith(section.filename_prefix)).reverse()
                          : Object.keys(this.state.gist.files).filter(key => key.startsWith(section.filename_prefix))).map(key => {
                          if (section.show_section_name) {
                            return (
                              <Card bg="light">
                                <Card.Body>
                                  <ReactMarkdown source={this.state.gist.files[key].content.toLowerCase()} key={key} />
                                </Card.Body>
                              </Card>
                            );
                          } else {
                            return (
                              <ReactMarkdown source={this.state.gist.files[key].content.toLowerCase()} key={key} />
                            )
                          }
                        })
                      }
                    </div>
                  );
                }
                return null;
              })
            }
            <h2 style={{marginBottom: '20px'}}>timeline</h2>
            <Timeline>
            {
              this.state.config.sections.map((section) => {
                if (section.placement === 'body') {
                  return (
                    ((section.sort && section.sort.direction[0] === 'd')
                      ? Object.keys(this.state.gist.files).filter(key => key.startsWith(section.filename_prefix)).reverse()
                      : Object.keys(this.state.gist.files).filter(key => key.startsWith(section.filename_prefix))).map(key => {
                      if (section.show_section_name) {
                        const hasIcon = this.state.gist.files[key].content.split('\n')[0].includes('.png');
                        return (
                          <Event interval={
                            this.state.gist.files[key].content.split('\n')[(hasIcon) ? 3 : 2].replace(/^[\s#]+|[\s#]+$/g, '').toLowerCase().replace('january', 'jan').replace('february', 'feb').replace('march', 'mar').replace('april', 'apr').replace('june', 'jun').replace('july', 'jul').replace('august', 'aug').replace('september', 'sep').replace('october', 'oct').replace('november', 'nov').replace('december', 'dec')
                          }>
                            <a href={'#' + section.name + '-' + this.state.gist.files[key].content.split('\n')[0].replace(/^[\s#]+|[\s#]+$/g, '').replace(/\s/g, '-')}>
                              {
                                (hasIcon)
                                  ? (
                                      <Image fluid src={this.state.gist.files[key].content.split('\n')[0].match(/https:[^ ]+\.png/)[0]} />
                                    )
                                  : (
                                      this.state.gist.files[key].content.split('\n')[0].replace(/^[\s#]+|[\s#]+$/g, '').toLowerCase()
                                    )
                              }
                            </a><br />
                            {this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].split(' - ')[0].replace(/^[\s#]+|[\s#]+$/g, '').toLowerCase()}
                            {(this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].includes(' - ')) ? <br /> : null}
                            {(this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].includes(' - ')) ? this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].split(' - ')[1].split(' / ')[0].toLowerCase().replace('united kingdom', 'uk').trim() : null}
                            {(this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].includes(' - ') && this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].split(' - ')[1].includes(' / ')) ? <br /> : null}
                            {(this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].includes(' - ') && this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].split(' - ')[1].includes(' / ')) ? this.state.gist.files[key].content.split('\n')[(hasIcon) ? 2 : 1].split(' - ')[1].split(' / ')[1].trim().toLowerCase() : null}
                          </Event>
                        );
                      }
                      return null;
                    })
                  );
                }
                return null;
              })
            }
            </Timeline>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
