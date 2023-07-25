import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Button from "../components/Button";
import { ContentCopy, ContentPasteGo } from "@mui/icons-material";
import Bard from "bard-ai";

function Home({ bardKey }) {
  const [question, setQuestion] = useState();
  const [template, setTemplate] = useState();
  const [solution, setSolution] = useState();

  const [bardError, setBardError] = useState(false);
  const [generateError, setGenerateError] = useState(false);

  useEffect(() => {
    if (!question || !template) {
      return;
    }

    // Prompting Bard for the solution
    Bard.init(bardKey)
      .then(() => chrome?.storage?.local?.get('bardConversationIds'))
      .then((result) => new Bard.Chat(result.bardConversationIds))
      .then((conversation) => {
        // TODO: Figure out why conversations are erroring
        // chrome?.storage?.local?.set({bardConversationIds: conversation.export()});
        
        return conversation.ask(
        `Write a program for the following question with comments: "${question}".\n\n` +
        `Use the following template program:\n` +
        `\`\`\`\n` +
        `${template}\n` +
        `\`\`\`\n\n` +
        `Use the same language from the template above.`
        );
      })
      .catch(() => setBardError(true))
      .then((response) => {
        const snippets = response.match(/```(.|\n)*```/g);
        const program = snippets[0].split(/\n*```.*\n*/g)[1];

        if (!program) {
          throw new Error('Could not find a solution');
        }

        setSolution(program);
      })
      .catch(() => setGenerateError(true));
  }, [bardKey, question, template]);

  chrome?.tabs?.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs.length === 0) {
      return;
    }

    const tab = tabs[0];

    // Extracting the question from the page
    chrome?.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const QUESTION_PANEL_CLASS_NAME = 'editor-preview-full editor-preview editor-preview-active';
        const questionPanel = document.getElementsByClassName(QUESTION_PANEL_CLASS_NAME)[0];
        return questionPanel?.innerText?.trim();
      },
    }, (results) => setQuestion(results[0].result));

    // Extracting the initial code from the page
    chrome?.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Get the current code from the Ace Editor
        return window.editor?.getValue()?.trim();
      },
      world: 'MAIN',
    }, (results) => setTemplate(results[0].result));
  });

  const AnswerGeneratedBanner = () => <Banner variant="success" message="A solution has been generated for this question." />
  const GeneratingAnswerBanner = () => <Banner variant="loading" message="Please wait while we generate a solution." />
  const QuestionNotFoundBanner = () => <Banner variant="warning" message="No Litcode question was found on this page." />;
  const AnswerGenerateErrorBanner = () => <Banner variant="error" message="An error occurred while generating a solution." />;
  const BardConnectErrorBanner = () => <Banner variant="error" message="Could not connect to Bard, try opening bard.google.com in a new tab." />;

  const insertSolution = () => {
    chrome?.tabs?.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0];
      chrome?.scripting.executeScript({
        target: { tabId: tab.id },
        func: (solution) => {
          // Insert the solution into the Ace Editor
          window.editor?.setValue(solution);
        },
        args: [solution],
        world: 'MAIN',
      });
    });
  };

  return (
    <>
      {
        Boolean(bardError)
        ? <BardConnectErrorBanner />
        : Boolean(generateError)
          ? <AnswerGenerateErrorBanner />
          : Boolean(question)
            ? Boolean(solution)
              ? <AnswerGeneratedBanner />
              : <GeneratingAnswerBanner />
            : <QuestionNotFoundBanner />
      }
      <Box sx={{display: 'flex', mt: 1.5}}>
        <Button startIcon={<ContentCopy />} onClick={() => navigator.clipboard.writeText(solution)} disabled={!Boolean(solution)}>Copy Solution</Button>
        <Button startIcon={<ContentPasteGo />} onClick={insertSolution} disabled={!Boolean(solution)}>Insert Solution</Button>
      </Box>
    </>
  );
}

export default Home;
