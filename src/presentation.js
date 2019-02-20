// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  Appear,
  Deck,
  Code,
  Heading,
  List,
  ListItem,
  Notes,
  Slide,
  Text,
  CodePane,
} from 'spectacle';
import CodeSlide from 'spectacle-code-slide';
import styled from 'react-emotion';
import shiaLabeoufMagicGif from "./assets/shiaLabeoufMagic.gif"
import picard from "./assets/picard.png";
import preloader from "spectacle/lib/utils/preloader";
import createTheme from 'spectacle/lib/themes/default';
import Terminal from "spectacle-terminal";
import {mainc, helloc, helloh, first, second, third} from './code'

const CustomCode = styled(Code)`
  color: #5e81ac;
  fontSize: 2.66rem;
  margin: 0.25rem auto;
  background-color: rgba(0,0,0,0);
  padding: 0 10px;
  border-radius: 3;
`;

preloader({
  shiaLabeoufMagicGif, picard
});

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: '#2e3440',
    secondary: '#88c0d0',
    tertiary: '#81a1c1',
    quaternary: '#5e81ac'
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica'
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Make it so
          </Heading>
          <Text margin="10px 0 0">
            TD-talk by Mads Johansen
          </Text>
          <Text margin="10px 0 0" textColor="tertiary" fit bold>
            21. February 2019
          </Text>
          <Notes>
            Questions are welcome!
          </Notes>
        </Slide>
        <Slide transition={['fade']}>
          <Heading size={4} textColor="tertiary" caps>
            What is make?
          </Heading>
          A build tool that performs tasks according to rules in a Makefile.
          <List ordered textAlign="center" transition={['slide']}>
            <Appear transition={['zoom']}>
              <ListItem>Simple</ListItem>
            </Appear>
            <Appear>
              <ListItem>Versatile</ListItem>
            </Appear>
            <Appear>
              <ListItem>Ubiquitous</ListItem>
            </Appear>
          </List>
          <Notes>
            <p>Simple to understand, hard to master</p>
            <p>Can do pretty much anything except automatically download deps</p>
            <p>Older than all of us (even me)</p>
          </Notes>
          <Appear>
            <div>
              <Text textColor="secondary" bold>Common use case:</Text>
              <Text textColor="quaternary">creating artifacts while rebuilding the minimum amount of dependencies</Text> 
            </div>
          </Appear>
        </Slide>
        <Slide>
          <Heading size={3} textColor="tertiary">
            Our case study
          </Heading>
          <Appear>
            <div>
              <Text textColor="quaternary">Hello function and accompanying header</Text>
              <div style={{display: "inline-flex", justifyContent: "space-evenly"}}>
                <CodePane style={{margin: "10px"}}lang="c" source={helloc} theme="external" />
                <CodePane lang="c" source={helloh} theme="external"/>
              </div>
            </div>
          </Appear>
          <Appear>
            <div>
              <Text textColor="quaternary">Main file</Text>
              <div style={{display: "inline-flex"}}>
                <CodePane lang="c" source={mainc} theme="external"/>
              </div>
            </div>
          </Appear>
          <Notes>
            <p>
              You all know C, right?
            </p>
            <p>
              Not important, just know that we will use these files to generate an executable binary
            </p>
            <p>
              make is overkill here, but imagine a larger application
            </p>

          </Notes>
        </Slide>
        <Slide>
          <Heading size={4} textColor="quaternary" bold>
            The anatomy of a Makefile
          </Heading>
          <List>
            <Appear>
              <ListItem>
                Targets (rules)
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Prerequisites (dependencies)
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Macros (variables)
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Comments if you're a nerd
              </ListItem>
            </Appear>
          </List>
          <Notes>
            <ul>
              <li>Everything after # is ignored</li>
              <li>Empty lines ignored</li>
              <li>Indents must be tabs!</li>
            </ul>
          </Notes>
        </Slide>
        <CodeSlide
          transition={['slide']}
          lang="makefile"
          code={first}
          ranges={[
            { loc: [0, 11], title: "Makefile v1.0" },
            { loc: [0, 1], title: "Target" },
            { loc: [1, 2], title: "Commands" },
            { loc: [3, 8], title: "More targets" },
            { loc: [9, 11], note: "What does this target create?" }
          ]}/>
        <Slide transition={[ "spin" ]} bgColor="primary">
          <Terminal isMaximized title="make tutorial" output={[
            ["$ ", "$ make"],
            <div>
              <div>gcc -Wall main.c -c</div>
              <div>gcc -Wall hello.c -c</div>
              <div>gcc -Wall main.o hello.o -o hello</div>
            </div>,
            <div>
              <div style={{ color: "#DEC612"}}># now if we edit a file</div>
              <div>$ nano main.c</div>
            </div>,
            <div>
              <div style={{ color: "#33B969"}}># make sees that only main.c has changed</div>
              <div>$ make</div>
              <div>gcc -Wall main.c -c</div>
              <div>gcc -Wall main.o hello.o -o hello</div>
            </div>,
            <div>
              <div>$ ls</div>
              <div>hello*  hello.c  hello.h  hello.o  main.c  main.o  Makefile</div>
            </div>,
            <div>
              <div>$ make clean</div>
              <div>rm -f *.o hello</div>
              <div style={{ color: "#DEC612"}}># all of our generated files are gone</div>
            </div>,
            ]}
          />
        </Slide>
        <CodeSlide
          transition={['slide']}
          lang="makefile"
          code={`FOO = bar
BAZ := qux
BAZ += quux

test:
    @echo FOO is: $(FOO)
    @echo BAZ is: $(BAZ)`}
          ranges={[
            { loc: [0, 3], title: "Keep your Makefile DRY" },
            { lo1c: [0, 1], title: "Variables", note: "Recursive (expands when referenced)" },
            { loc: [1, 2], title: "Variables", note: "Simple (does not expand)" },
            { loc: [2, 3], title: "Variables", note: "Concatenation (adds to what's already there)" },
            { loc: [4, 7] },
            { loc: [5, 6], note: "FOO is: bar"},
            { loc: [6, 7], note: "BAZ is: qux quux"},
          ]}/>
        <CodeSlide
          transition={['slide']}
          lang="makefile"
          code={second}
          ranges={[
            { loc: [0, 14], title: "Makefile v2.0"},
            { loc: [0, 2] },
            { loc: [4, 6] }
          ]}/>
          <Slide>
            <Heading size={6} bold caps textColor="quaternary">
              Automatic variables
            </Heading>
            <List style={{listStyle: 'none'}}>
              <ListItem>
                <CustomCode>$&lt;</CustomCode>
                - The first prerequisite
              </ListItem>
              <ListItem>
                <CustomCode>$^</CustomCode>
                - All prerequisites
              </ListItem>
              <ListItem>
                <CustomCode>$?</CustomCode>
                - All newer prerequisites
              </ListItem>
              <ListItem>
                <CustomCode>$@</CustomCode>
                - Name of target
              </ListItem>
              <ListItem>
                ... and more!
              </ListItem>
            </List>
          </Slide>
          <CodeSlide
          transition={['slide']}
          lang="makefile"
          code={third}
          ranges={[
            { loc: [0, 14], title: "Makefile v3.0"},
            { loc: [0, 2] },
            { loc: [4, 5] }
          ]}/>
      </Deck>
    );
  }
}
