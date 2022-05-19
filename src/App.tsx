import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
const TranslationEditor = lazy(() => import('./pages/translationEditor'));

function App() {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          <Route path={`/`} children={<TranslationEditor />} />
          {/* <Route path={`/c-translation-editor/:id`} children={<TranslationEditor />} /> */}
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
