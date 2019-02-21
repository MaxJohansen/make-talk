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
import createTheme from 'spectacle/lib/themes/default';
import Terminal from "spectacle-terminal";
import {mainc, helloc, helloh, dummy, first, second, third} from './code'
import 'prismjs/components/prism-makefile';

const CustomCode = styled(Code)`
  color: #5e81ac;
  fontSize: 2.66rem;
  margin: 0.25rem auto;
  background-color: rgba(0,0,0,0);
  padding: 0 10px;
  border-radius: 3;
`;

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
          <Text textColor="tertiary" margin="10px 0 0">
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
          <List ordered textAlign="center">
            <Appear>
              <ListItem>Simple</ListItem>
            </Appear>
            <Appear>
              <ListItem>Versatile</ListItem>
            </Appear>
            <Appear>
              <ListItem>Ubiquitous</ListItem>
            </Appear>
          </List>
          <Appear>
            <div>
              <Text textColor="secondary" bold>Common use case:</Text>
              <Text textColor="quaternary">creating artifacts (files) with the minimum amount of work</Text>
            </div>
          </Appear>
          <Notes>
            <ul>
              <li>Simple to understand, hard to master</li>
              <li>Can do pretty much anything except automatically download deps</li>
              <li>Other build tools use the same concepts: bake, cake, fake, rake, snaaake</li>
            </ul>
          </Notes>
        </Slide>
        <Slide>
          <Heading size={4} textColor="tertiary" bold>
            The anatomy of a Makefile
          </Heading>
          <List>
            <Appear>
              <ListItem>
                Rules
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Macros (also used as variables)
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Comments
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Directives (conditionals, including other Makefiles, etc)
              </ListItem>
            </Appear>
          </List>
          <Notes>
            <ul>
              <li>Indents must be tabs!</li>
              <li>Everything after # is ignored</li>
              <li>Empty lines ignored</li>
              <li>Every command is run in a separate shell</li>
            </ul>
          </Notes>
        </Slide>
        <CodeSlide
        transition={['slide']}
        lang="makefile"
        code={dummy}
        ranges={[
          { loc: [0, 16], title: "Makefile example" },
          { loc: [0, 1], title: "Variable" },
          { loc: [2, 3], title: "Comment"},
          { loc: [3, 8], title: "Rule"},
          { loc: [3, 4], title: "Target and dependencies" },
          { loc: [4, 8], title: "Commands" },
          { loc: [9, 16], title: "More targets" }
        ]}/>
        <Slide transition={[ "spin" ]} bgColor="primary">
          <Terminal isMaximized title="make tutorial" output={[
            ["$ ", "$ make"],
            <div>
              <div>>>> creating eggs...</div>
              <div>touch eggs</div>
              <div>>>> creating sugar...</div>
              <div>touch sugar</div>
              <div>>>> ready to create cake</div>
              <div>ls</div>
              <div>eggs Makefile sugar</div>
              <div>touch cake</div>
              <div>>>> have a chocolate bar!</div>
            </div>,
            ["$ ", "$ ls"],
            <div>
              <div>cake eggs Makefile sugar</div>
            </div>,
            <div>
              <div>$ make</div>
              <div>make: 'cake' is up to date.</div>
            </div>
            ]}
          />
          <Notes>
            <ul>
              <li>Uses timestamps</li>
              <li>Prerequisites first</li>
              <li>Echo was silenced, touch was not</li>
            </ul>
          </Notes>
        </Slide>
        <Slide>
          <Heading size={3} textColor="tertiary">
            Our case study
          </Heading>
          <Appear>
            <div>
              <Text textColor="quaternary">Hello function and accompanying header</Text>
              <div style={{display: "inline-flex", justifyContent: "space-evenly"}}>
                <CodePane lang="clike" source={helloc} theme="external" style={{margin: "10px", fontSize: "18px"}} />
                <CodePane lang="clike" source={helloh} theme="external" style={{fontSize: "18px"}}/>
              </div>
            </div>
          </Appear>
          <Appear>
            <div>
              <div style={{display: "inline-flex"}}>
                <Text textColor="quaternary">Main file</Text>
                <CodePane lang="clike" source={mainc} theme="external" style={{fontSize: "18px"}}/>
              </div>
            </div>
          </Appear>
          <Notes>
            <ul>
              <li>You all know C, right?</li>
              <li>Not important, just know that we will use these files to generate an executable binary</li>
              <li>Today you can just feed the C source files to gcc and it works</li>
              <li>make is overkill here, but imagine a larger application</li>
            </ul>
          </Notes>
        </Slide>
        <CodeSlide
          transition={['slide']}
          lang="makefile"
          code={first}
          ranges={[
            { loc: [0, 11], title: "Makefile v1.0" },
            { loc: [0, 1], title: "What we want" },
            { loc: [1, 2], title: "How to build it" },
            { loc: [9, 11], title: "What does this target create?" }
          ]}/>
        <CodeSlide
          transition={['slide']}
          lang="makefile"
          code={second}
          ranges={[
            { loc: [0, 17], title: "Makefile v2.0"},
            { loc: [0, 2], title: "Simple variables" },
            { loc: [4, 6] },
            { loc: [7, 12], title: "Reduced repetition" },
            { loc: [13, 15] },
            { loc: [13, 17], title: "A special PHONY target" }
          ]}/>
          <Slide>
            <Heading size={2} caps textColor="quaternary">
              Predefined variables
            </Heading>
            <List style={{listStyle: 'none'}}>
              <ListItem>
                <CustomCode>$@</CustomCode>
                - Name of target
              </ListItem>
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
                ... and more!
              </ListItem>
            </List>
            <List style={{listStyle: 'none'}}>
              <ListItem>
                <CustomCode>$(CC)</CustomCode>
                - The C compiler (defaults to cc)
              </ListItem>
              <ListItem>
                <CustomCode>$(CFLAGS)</CustomCode>
                - Flags for CC (empty by default)
              </ListItem>
              <ListItem>
                <CustomCode>$(RM)</CustomCode>
                - The command used to remove files
              </ListItem>
              <ListItem>
                ... and more, mostly outdated!
              </ListItem>
            </List>
            <Notes>
              <ul>
                <li>Most implicit rules were made 50 years ago, so they're outdated</li>
                <li>Automatic have context (the current rule)</li>
                <li>Built-in have default values (often outdated)</li>
              </ul>
            </Notes>
          </Slide>
          <CodeSlide
            transition={['slide']}
            lang="makefile"
            code={third}
            ranges={[
              { loc: [0, 16], title: "Makefile v3.0"},
              { loc: [4, 6], title: "Automatic variables" },
              { loc: [7, 11], title: "Pattern target" }
          ]}/>
          <Slide>
            <Heading textColor="quaternary" size={1} bold>
              NOW GO make A DIFFERENCE
            </Heading>
            <Text textColor="tertiary">You have the power</Text>
          </Slide>
      </Deck>
    );
  }
}
